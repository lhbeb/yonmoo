'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, Mail, Clock, Package, ArrowLeft, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { trackPixelEvent } from '@/lib/pixel';
import { clearCart } from '@/utils/cart';
import Script from 'next/script';
import { queueGoogleAdsPurchase } from '@/lib/googleAds';

const PURCHASE_TRACKED_KEY_PREFIX = 'purchase_tracked:';
const PENDING_CHECKOUT_KEY = 'pending_checkout';
const PENDING_CHECKOUT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

function currencySymbol(currency?: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'CA$',
    AUD: 'A$',
  };

  return symbols[currency?.toUpperCase() || 'USD'] || '';
}

interface PurchaseTrackingData {
  value: number;
  currency: string;
  transactionId: string;
  email?: string | null;
  contentId?: string;
  contentName?: string;
}

function trackPurchaseOnce(data: PurchaseTrackingData): boolean {
  if (!data.transactionId || !Number.isFinite(data.value) || data.value <= 0) return false;

  const trackingKey = `${PURCHASE_TRACKED_KEY_PREFIX}${data.transactionId}`;
  if (sessionStorage.getItem(trackingKey)) return true;

  trackPixelEvent('Purchase', {
    value: data.value,
    currency: data.currency,
    content_ids: data.contentId ? [data.contentId] : [],
    content_name: data.contentName || '',
    content_type: 'product',
    num_items: 1,
  }, data.transactionId);

  const googleQueued = queueGoogleAdsPurchase({
    value: data.value,
    currency: data.currency,
    transactionId: data.transactionId,
    email: data.email,
    contentId: data.contentId,
    contentName: data.contentName,
  });

  if (googleQueued) {
    sessionStorage.setItem(trackingKey, '1');
  }

  return googleQueued;
}

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const sessionId = searchParams.get('session_id');
  const isStaticSuccess = !sessionId;
  const isSuccessful = isStaticSuccess || orderDetails?.status === 'paid';

  useEffect(() => {
    // Support manual test conversion triggering via ?test_conversion=true
    const isTestConversion = searchParams.get('test_conversion') === 'true' || searchParams.get('test') === 'true';
    if (isTestConversion) {
      const testTxId = `TEST-GA-${Date.now()}`;
      trackPurchaseOnce({
        value: 10.0,
        currency: 'USD',
        transactionId: testTxId,
        email: 'test@yomnoo.com',
        contentId: 'test-product',
        contentName: 'Test Product',
      });
      console.log('✅ Fired test conversion event to Google Ads:', testTxId);
    }

    // Stripe conversions are recorded only after server-side payment verification.
    if (sessionId) {
      const verifyInBackground = async () => {
        try {
          const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId }),
          });

          if (!response.ok) {
            console.warn('⚠️ Payment verification failed, falling back to pending UI');
            setOrderDetails({ status: 'pending' });
            return;
          }

          const data = await response.json();
          setOrderDetails(data);

          if (data.status === 'paid') {
            trackPurchaseOnce({
              value: data.amount ? data.amount / 100 : 0,
              currency: data.currency ? data.currency.toUpperCase() : 'USD',
              transactionId: data.orderId || sessionId,
              email: data.email || data.customerEmail,
              contentId: data.productSlug || data.orderId,
            });
          }
        } catch (error) {
          console.error('❌ Background verification error:', error);
          setOrderDetails({ status: 'pending' });
        }
      };

      verifyInBackground();
      return;
    }

    // Redirect-based providers return without a Stripe session ID. Only record a
    // purchase when checkout created a recent, explicit pending-conversion record.
    try {
      const storedPending = localStorage.getItem(PENDING_CHECKOUT_KEY);
      if (storedPending) {
        const pending = JSON.parse(storedPending);
        const timestamp = Number(pending.timestamp);
        const age = Date.now() - timestamp;
        const isRecent = Number.isFinite(timestamp)
          && age >= 0
          && age <= PENDING_CHECKOUT_MAX_AGE_MS;

        if (isRecent) {
          const queued = trackPurchaseOnce({
            value: Number(pending.price),
            currency: pending.currency || 'USD',
            transactionId: pending.orderId || '',
            email: pending.email,
            contentId: pending.slug || '',
            contentName: pending.title || '',
          });

          if (queued) {
            localStorage.removeItem(PENDING_CHECKOUT_KEY);
          }
        } else {
          localStorage.removeItem(PENDING_CHECKOUT_KEY);
        }
      }
    } catch (error) {
      console.error('Purchase tracking error:', error);
      localStorage.removeItem(PENDING_CHECKOUT_KEY);
    }

    clearCart();
  }, [sessionId]);

  useEffect(() => {
    // Google Customer Reviews Opt-In Integration
    if (typeof window === 'undefined') return;

    (window as any).renderOptIn = function () {
      if ((window as any).gapi && (window as any).gapi.load) {
        (window as any).gapi.load('surveyoptin', function () {
          const deliveryDate = new Date();
          deliveryDate.setDate(deliveryDate.getDate() + 7);
          const estDelivery = deliveryDate.toISOString().slice(0, 10);

          const orderId = orderDetails?.orderId || sessionId || `CAS-${Date.now()}`;
          const customerEmail = orderDetails?.email || orderDetails?.customerEmail || 'customer@yomnoo.com';
          const countryCode = orderDetails?.country || 'US';

          (window as any).gapi.surveyoptin.render({
            merchant_id: 324580843,
            order_id: orderId,
            email: customerEmail,
            delivery_country: countryCode,
            estimated_delivery_date: estDelivery,
          });
        });
      }
    };
  }, [sessionId, orderDetails]);

  // Always show success (Stripe only redirects here if payment succeeded)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171717]/5 via-white to-green-50 flex items-center justify-center p-4">
      <Script
        src="https://apis.google.com/js/platform.js?onload=renderOptIn"
        strategy="afterInteractive"
      />
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Main Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#262626] mb-4">
            {isSuccessful ? 'Thank You for Your Order!' : 'Payment Verification Pending...'}
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {isSuccessful
              ? 'Your payment has been successfully recorded and your order is queued for manual processing. We will send you an email confirmation shortly once verified.' 
              : 'Your payment is still processing or awaiting backend verification. We will process your order and send a confirmation email once it is completely confirmed.'}
          </p>

          {/* Order Details */}
          {orderDetails && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="text-sm text-gray-500 mb-2">Order ID</p>
              <p className="text-lg font-mono font-semibold text-[#262626] mb-4">
                {orderDetails.orderId || orderDetails.sessionId}
              </p>
              {orderDetails.amount && (
                <p className="text-2xl font-bold text-green-600">
                  {currencySymbol(orderDetails.currency)}{(orderDetails.amount / 100).toFixed(2)} {orderDetails.currency?.toUpperCase()}
                </p>
              )}
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-[#262626] mb-4">
              What happens next?
            </h2>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[#451e84]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-[#171717]" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-[#262626]">Order Processing</h3>
                  <p className="text-sm text-gray-600">We&apos;ll process your order within 24-48 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-[#262626]">Email Confirmation</h3>
                  <p className="text-sm text-gray-600">You&apos;ll receive an email with your order details and tracking number</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Package className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-[#262626]">Shipping</h3>
                  <p className="text-sm text-gray-600">Your order will ship within 5-8 business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-[#451e84]/5 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-[#262626] mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              If you have any questions about your order, don&apos;t hesitate to reach out:
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700">
                📧 <a href="mailto:contact@yomnoo.com" className="text-[#171717] hover:text-[#171717] font-medium">
                  contact@yomnoo.com
                </a>
              </p>
              <p className="text-gray-700">
                💬 <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).tidioChatApi) {
                      (window as any).tidioChatApi.open();
                    }
                  }}
                  className="text-[#451e84] hover:underline font-semibold cursor-pointer"
                >
                  Live Chat Available 24/7
                </button>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#451e84] hover:bg-[#361668] text-white font-medium rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            {isSuccessful
              ? 'You will receive a confirmation email once our team reviews your order' 
              : 'We will notify you by email once your payment clears'}
          </p>
        </div>
      </div>
    </div>
  );
}

// Loading fallback component
function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171717]/5 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 text-center">
          <div className="mx-auto w-20 h-20 bg-[#451e84]/10 rounded-full flex items-center justify-center mb-6">
            <Loader2 className="w-12 h-12 text-[#171717] animate-spin" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#262626] mb-4">
            Loading...
          </h1>
          <p className="text-lg text-gray-600">
            Please wait a moment.
          </p>
        </div>
      </div>
    </div>
  );
}

// Main export with Suspense boundary
export default function ThankYouPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ThankYouContent />
    </Suspense>
  );
}
