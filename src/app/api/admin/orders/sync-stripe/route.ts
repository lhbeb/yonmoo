import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripeConfig } from '@/lib/supabase/payment-settings';
import { supabaseAdmin } from '@/lib/supabase/server';
import { updateOrderStripeStatus } from '@/lib/supabase/orders';
import { sendStripePaymentSuccessEmail } from '@/lib/email/sender';

export async function POST(request: NextRequest) {
  try {
    const stripeConfig = await getStripeConfig();
    if (!stripeConfig.secretKey) {
      return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 400 });
    }

    const stripe = new Stripe(stripeConfig.secretKey, {
      apiVersion: '2026-01-28.clover' as any,
    });

    // Fetch all pending / unpaid orders from DB
    const { data: pendingOrders, error: fetchErr } = await supabaseAdmin
      .from('orders')
      .select('*')
      .neq('status', 'paid')
      .order('created_at', { ascending: false });

    if (fetchErr) {
      return NextResponse.json({ error: fetchErr.message }, { status: 500 });
    }

    // List recent completed checkout sessions from Stripe
    const recentSessions = await stripe.checkout.sessions.list({
      limit: 100,
    });

    let syncedCount = 0;
    const syncedOrders: string[] = [];

    for (const session of recentSessions.data) {
      if (session.payment_status === 'paid' && session.metadata?.order_id) {
        const matchingOrder = (pendingOrders || []).find((o) => o.id === session.metadata?.order_id);

        if (matchingOrder) {
          console.log(`[Sync Stripe] Found paid Stripe session for pending order ${matchingOrder.id}`);

          const paymentIntentId = typeof session.payment_intent === 'string'
            ? session.payment_intent
            : session.payment_intent?.id;

          await updateOrderStripeStatus(matchingOrder.id, {
            status: 'paid',
            stripe_payment_intent_id: paymentIntentId,
            stripe_payment_status: session.payment_status,
            paid_at: new Date().toISOString(),
          });

          // Fetch refreshed order
          const { data: refreshedOrder } = await supabaseAdmin
            .from('orders')
            .select('*')
            .eq('id', matchingOrder.id)
            .single();

          if (refreshedOrder && !refreshedOrder.stripe_email_sent) {
            try {
              await sendStripePaymentSuccessEmail(refreshedOrder, {
                paymentIntentId,
                amount: session.amount_total ?? undefined,
                currency: session.currency ?? undefined,
              });
            } catch (emailErr) {
              console.error(`[Sync Stripe] Email error for order ${matchingOrder.id}:`, emailErr);
            }
          }

          syncedCount++;
          syncedOrders.push(matchingOrder.id);
        }
      }
    }

    return NextResponse.json({
      success: true,
      syncedCount,
      syncedOrders,
    });
  } catch (error: any) {
    console.error('[Sync Stripe] Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to sync Stripe orders' }, { status: 500 });
  }
}
