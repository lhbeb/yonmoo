import type { Metadata } from 'next';
import Link from 'next/link';
import LegalBusinessDetails from '@/components/LegalBusinessDetails';
import {
  RotateCcw,
  RefreshCw,
  Clock,
  CreditCard,
  Building2,
  Mail,
  MessageSquare,
  PackageCheck,
  FileText,
  HelpCircle,
  Banknote,
  Inbox,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Return & Exchange Policy | Yomnoo',
  description:
    'Yomnoo Return & Exchange Policy. We accept returns for both defective and non-defective products within 30 days. Free return label included, no restocking fee, 5-day refund processing.',
};

export default function ReturnPolicyPage() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'MerchantReturnPolicy',
    'name': 'Yomnoo Return & Exchange Policy',
    'url': 'https://www.yomnoo.com/return-policy',
    'merchantReturnLink': 'https://www.yomnoo.com/return-policy',
    'applicableCountry': ['US', 'GB'],
    'returnPolicyCountry': ['US', 'GB'],
    'returnPolicyCategory': 'https://schema.org/MerchantReturnFiniteReturn',
    'merchantReturnDays': 30,
    'returnMethod': 'https://schema.org/ReturnByMail',
    'returnFees': 'https://schema.org/FreeReturn',
    'returnLabelSource': 'https://schema.org/ReturnLabelInPackage',
    'customerRemorseReturnFees': 'https://schema.org/FreeReturn',
    'customerRemorseReturnLabelSource': 'https://schema.org/ReturnLabelInPackage',
    'customerRemorseReturnShippingFeesAmount': {
      '@type': 'MonetaryAmount',
      'value': 0,
      'currency': 'USD',
    },
    'itemDefectReturnFees': 'https://schema.org/FreeReturn',
    'itemDefectReturnLabelSource': 'https://schema.org/ReturnLabelInPackage',
    'itemDefectReturnShippingFeesAmount': {
      '@type': 'MonetaryAmount',
      'value': 0,
      'currency': 'USD',
    },
    'restockingFee': {
      '@type': 'MonetaryAmount',
      'value': 0,
      'currency': 'USD',
    },
    'refundType': 'https://schema.org/FullRefund',
    'itemCondition': [
      'https://schema.org/NewCondition',
      'https://schema.org/UsedCondition',
      'https://schema.org/RefurbishedCondition',
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
            Return & Exchange Policy
          </h1>
          <p className="text-gray-600 mt-3 text-base sm:text-lg max-w-2xl">
            We want you to be completely happy with your purchase. If something isn&apos;t right, our return and exchange process is simple and hassle-free.
          </p>
        </div>

        {/* Quick Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-10">
          <h2 className="text-lg font-bold text-[#171717] mb-5">Quick Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-gray-100 hover:border-[#451e84]/30 transition-colors">
              <RotateCcw className="w-5 h-5 text-[#451e84] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Returns</span>
                <span className="text-sm font-bold text-gray-900">Defective & Non-Defective</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-gray-100 hover:border-[#451e84]/30 transition-colors">
              <RefreshCw className="w-5 h-5 text-[#451e84] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Exchanges</span>
                <span className="text-sm font-bold text-gray-900">Yes, Accepted</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-gray-100 hover:border-[#451e84]/30 transition-colors">
              <Clock className="w-5 h-5 text-[#451e84] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Return Window</span>
                <span className="text-sm font-bold text-gray-900">30 Days</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-gray-100 hover:border-[#451e84]/30 transition-colors">
              <Inbox className="w-5 h-5 text-[#451e84] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Return Method</span>
                <span className="text-sm font-bold text-gray-900">By Mail</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-gray-100 hover:border-[#451e84]/30 transition-colors">
              <Banknote className="w-5 h-5 text-[#451e84] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Restocking Fee</span>
                <span className="text-sm font-bold text-gray-900">None (£0 / $0)</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-gray-100 hover:border-[#451e84]/30 transition-colors">
              <CreditCard className="w-5 h-5 text-[#451e84] flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Refund Time</span>
                <span className="text-sm font-bold text-gray-900">5 Business Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Policy Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 space-y-10 text-gray-700">

          {/* Introduction */}
          <p className="text-lg leading-relaxed text-gray-800">
            At <strong className="text-[#171717]">Yomnoo</strong>, your satisfaction is our top priority. We want you to shop with complete confidence. If your purchase isn&apos;t right for any reason, we&apos;re here to make it simple.
          </p>

          {/* 1. Returns */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <RotateCcw className="w-6 h-6 text-[#171717]" />
              <h2 className="text-2xl font-bold text-[#171717]">1. Returns</h2>
            </div>
            <p>We accept returns for <strong>both defective and non-defective products</strong>:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <h3 className="font-bold text-emerald-900 text-base mb-1">Defective & Damaged Items</h3>
                <p className="text-sm text-emerald-800">
                  If your order arrives damaged, defective, or incorrect, we provide a <strong>100% free return</strong> with a prepaid shipping label.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#451e84]/5/60 border border-[#451e84]/20">
                <h3 className="font-bold text-[#171717] text-base mb-1">Change of Mind</h3>
                <p className="text-sm text-[#171717]">
                  Changed your mind or ordered the wrong item? No problem. You can return it within 30 days for a full refund of the item price.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Exchanges */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-6 h-6 text-[#171717]" />
              <h2 className="text-2xl font-bold text-[#171717]">2. Exchanges</h2>
            </div>
            <p><strong>Yes, we accept exchanges.</strong> If you&apos;d like a different size, colour, or model:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact us within <strong>30 days</strong> of receiving your delivery.</li>
              <li>Use the return label included in your package to send the original item back.</li>
              <li>Once received, your replacement will be dispatched right away.</li>
            </ul>
          </div>

          {/* 3. Return Window & Conditions */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-[#171717]" />
              <h2 className="text-2xl font-bold text-[#171717]">3. 30-Day Return Window</h2>
            </div>
            <p>You have <strong>30 calendar days</strong> from the date of delivery to return or exchange your item.</p>
            <p className="font-semibold text-gray-900">Your item should be:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>In new, unused condition with original tags and packaging where possible.</li>
              <li>Accompanied by proof of purchase (order number or confirmation email).</li>
              <li>Free from post-delivery damage caused after receipt.</li>
            </ul>
          </div>

          {/* 4. How to Return by Mail */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <PackageCheck className="w-6 h-6 text-[#171717]" />
              <h2 className="text-2xl font-bold text-[#171717]">4. How to Return</h2>
            </div>
            <p>All returns are handled <strong>by mail</strong>. Here&apos;s how it works:</p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Contact us</strong> at <a href="mailto:contact@yomnoo.com" className="text-[#171717] hover:underline font-semibold">contact@yomnoo.com</a> or via <strong>Live Chat (Available 24/7)</strong> on our website.
              </li>
              <li>
                <strong>Use the return label</strong> included in your original package, or we&apos;ll email you a replacement if needed.
              </li>
              <li>
                <strong>Ship it back</strong> securely. For defective items, return postage is on us. For change-of-mind returns, return postage is your responsibility.
              </li>
              <li>
                <strong>Get your refund</strong>. Once inspected, your refund is processed within 5 business days.
              </li>
            </ol>
          </div>

          {/* 5. Restocking Fee */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Banknote className="w-6 h-6 text-[#171717]" />
              <h2 className="text-2xl font-bold text-[#171717]">5. No Restocking Fee</h2>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="font-medium text-gray-800">
                We do <strong>not</strong> charge any restocking, handling, or processing fees. You receive 100% of the purchased item price back.
              </p>
            </div>
          </div>

          {/* 6. Refund Processing */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-[#171717]" />
              <h2 className="text-2xl font-bold text-[#171717]">6. Refund Processing</h2>
            </div>
            <p>Refunds are credited to your original payment method (Visa, MasterCard, PayPal, Apple Pay, etc.).</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Inspection:</strong> 1–2 business days after we receive your return.</li>
              <li><strong>Refund issued:</strong> Within <strong>5 business days</strong> of approval.</li>
            </ul>
          </div>

          {/* 7. Marketplace Sellers */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#171717]" />
              <h2 className="text-2xl font-bold text-[#171717]">7. Marketplace Seller Items</h2>
            </div>
            <p>
              Products from our verified marketplace partners follow the exact same 30-day return policy. All returns are shipped to our central warehouse for inspection, so the experience is consistent regardless of the seller.
            </p>
          </div>

          {/* 8. Contact */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-[#171717]" />
              <h2 className="text-2xl font-bold text-[#171717]">8. Need Help?</h2>
            </div>
            <p>Our team is here to assist you with any return or exchange:</p>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#171717]">
                  <MessageSquare className="w-5 h-5 text-[#171717]" />
                  <span>Live Chat Support</span>
                </div>
                <div className="text-sm text-gray-600 pl-7 space-y-1">
                  <div>Available 24/7 on website</div>
                </div>

                <div className="flex items-center gap-2 font-bold text-[#171717] pt-2">
                  <Mail className="w-5 h-5 text-[#171717]" />
                  <span>Email</span>
                </div>
                <div className="text-sm text-gray-600 pl-7">
                  <a href="mailto:contact@yomnoo.com" className="text-[#171717] hover:underline font-semibold">contact@yomnoo.com</a>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 font-bold text-[#171717]">
                  <Building2 className="w-5 h-5 text-[#171717]" />
                  <span>Warehouse Address</span>
                </div>
                <div className="text-sm text-gray-600 pl-7 space-y-2">
                  <div>
                    <strong className="text-gray-900 block">US Warehouse:</strong>
                    415 Codoni Ave, Modesto, CA 95357, USA
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promise Footer */}
          <div className="bg-gradient-to-r from-[#171717] to-[#361668] text-white p-6 sm:p-8 rounded-xl shadow-md mt-8">
            <h3 className="text-xl font-bold mb-2">Our Promise</h3>
            <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
              We stand behind every product we sell. If something isn&apos;t right with your order, we&apos;ll listen, help, and make it right as quickly as possible.
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-gray-300">Have a question about your order?</span>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white text-[#171717] font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <LegalBusinessDetails />
        </div>
      </div>
    </div>
  );
}
