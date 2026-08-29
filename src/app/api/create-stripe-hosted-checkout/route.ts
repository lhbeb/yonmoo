import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateOrderStripeStatus, getOrderById } from '@/lib/supabase/orders';
import { getProductBySlug } from '@/lib/supabase/products';
import { getStripeConfig } from '@/lib/supabase/payment-settings';

function getSafeStripeError(error: any): string {
    console.error('[Stripe Hosted Error]:', { type: error.type, code: error.code, message: error.message });
    const sensitiveErrors = ['api_key', 'authentication', 'invalid_request_error', 'expired', 'sk_live', 'sk_test', 'secret', 'token'];
    const errorMessage = error.message?.toLowerCase() || '';
    const isSensitive = sensitiveErrors.some((s: string) => errorMessage.includes(s));
    if (isSensitive) return 'Payment processing is temporarily unavailable. Please email contact@yomnoo.com';
    if (error.type === 'card_error') return 'There was an issue with your payment method. Please try a different card or email contact@yomnoo.com';
    return 'An error occurred during payment processing. Please email contact@yomnoo.com';
}

export async function POST(request: NextRequest) {
    try {
        const stripeConfig = await getStripeConfig();
        const stripe = new Stripe(stripeConfig.secretKey || 'sk_test_placeholder', {
            apiVersion: '2026-01-28.clover' as any,
        });

        const body = await request.json();
        const { orderId, product, shippingData } = body;

        if (!orderId || !product?.slug || !shippingData) {
            return NextResponse.json({ error: 'Missing required data: orderId, product or shippingData' }, { status: 400 });
        }

        // Always fetch price/title/stock from DB — never trust client payload
        const dbProduct = await getProductBySlug(product.slug);
        if (!dbProduct) {
            console.error('[Stripe Hosted] Product not found:', product.slug);
            return NextResponse.json({ error: 'This product is no longer available for purchase.' }, { status: 404 });
        }

        if (dbProduct.inStock === false) {
            return NextResponse.json({ error: 'Sorry, this item is currently sold out.' }, { status: 409 });
        }

        const order = await getOrderById(orderId);
        if (!order) {
            return NextResponse.json({ error: 'Order could not be found. Please start checkout again.' }, { status: 400 });
        }

        if (order.product_slug !== dbProduct.slug) {
            return NextResponse.json({ error: 'Order does not match this product. Please start checkout again.' }, { status: 400 });
        }

        if (order.status === 'paid') {
            return NextResponse.json({ error: 'This order has already been paid.' }, { status: 409 });
        }

        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        // Hosted Checkout Session — Stripe redirects customer to checkout.stripe.com
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: dbProduct.currency?.toLowerCase() || 'usd',
                        product_data: {
                            name: dbProduct.title,
                            description: `Product ID: ${dbProduct.slug}`,
                            images: dbProduct.images && dbProduct.images.length > 0 ? [dbProduct.images[0]] : undefined,
                        },
                        unit_amount: Math.round(dbProduct.price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            // Stripe appends ?session_id={CHECKOUT_SESSION_ID} to success_url automatically
            success_url: `${origin}/thankyou?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/checkout`,
            customer_email: shippingData.email,
            payment_intent_data: {
                shipping: {
                    name: shippingData.fullName || shippingData.email,
                    address: {
                        line1: shippingData.streetAddress,
                        city: shippingData.city,
                        state: shippingData.state,
                        postal_code: shippingData.zipCode,
                        country: shippingData.countryCode || 'US',
                    },
                },
            },
            expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutes
            metadata: {
                order_id: orderId,
                product_slug: dbProduct.slug,
                product_id: dbProduct.id,
                customer_email: shippingData.email,
                shipping_address: shippingData.streetAddress,
                shipping_city: shippingData.city,
                shipping_state: shippingData.state,
                shipping_zip: shippingData.zipCode,
            },
        });

        // Link session to our DB order before handing the URL to the client
        const linked = await updateOrderStripeStatus(orderId, {
            stripe_checkout_session_id: session.id,
            status: 'pending_payment',
            checkout_expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        });

        if (!linked) {
            throw new Error('Failed to link Stripe hosted session to order');
        }

        console.log('[Stripe Hosted] Session created:', session.id, '->', session.url);
        return NextResponse.json({ url: session.url, sessionId: session.id });
    } catch (error: any) {
        return NextResponse.json({ error: getSafeStripeError(error) }, { status: 500 });
    }
}
