import type { Metadata } from 'next';
import Link from 'next/link';
import LegalBusinessDetails from '@/components/LegalBusinessDetails';
import { Clock, Mail, MapPin, PackageCheck, ShieldCheck, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Policy | Yomnoo',
  description:
    'Official Yomnoo Shipping Policy. Free standard shipping across the United States. Same-day processing for orders placed before 2:00 PM EST.',
};

const timeline = [
  ['Same-day orders', 'Ships same day when placed before 2:00 PM EST'],
  ['Standard processing', '0-1 business day'],
  ['United States standard delivery', '4-7 business days'],
  ['United States express delivery', '2-3 business days (where available)'],
];

const policySections = [
  {
    title: 'Free Shipping',
    items: [
      'Free standard shipping on all orders across the United States',
      'No minimum purchase requirement',
      'USPS, FedEx, or UPS for all domestic US shipments',
      'Fully insured with signature confirmation on high-value orders',
    ],
  },
  {
    title: 'Order Tracking',
    items: [
      'Automatic shipping confirmation email upon dispatch',
      'Real-time package tracking link provided',
      'Estimated delivery date visibility',
      'Carrier milestone email & SMS updates',
    ],
  },
  {
    title: 'Shipping Destinations',
    items: [
      'We ship to all 50 states across the United States',
      'PO boxes supported for standard domestic deliveries',
      'APO/FPO/DPO military addresses fully supported',
      'Local pickup available at our Phoenix, Arizona warehouse and office',
    ],
  },
  {
    title: 'Package Protection & Safety',
    items: [
      '100% full shipping insurance on all packages',
      'Signature confirmation for high-value orders over £400 / $500',
      'Weather-resistant outer mailers',
      'Protective bubble/foam layering for fragile items',
    ],
  },
];

export default function ShippingPolicyPage() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.yomnoo.com/shipping-policy',
        'url': 'https://www.yomnoo.com/shipping-policy',
        'name': 'Shipping Policy | Yomnoo',
        'description':
          'Official Yomnoo Shipping Policy. Free standard shipping across the United States. Same-day processing for orders placed before 2:00 PM EST (Monday to Friday).',
      },
      {
        '@type': 'OfferShippingDetails',
        '@id': 'https://www.yomnoo.com/shipping-policy#shipping-us',
        'shippingDestination': {
          '@type': 'DefinedRegion',
          'addressCountry': 'US',
        },
        'shippingRate': {
          '@type': 'MonetaryAmount',
          'value': 0,
          'currency': 'USD',
        },
        'deliveryTime': {
          '@type': 'ShippingDeliveryTime',
          'handlingTime': {
            '@type': 'QuantitativeValue',
            'minValue': 0,
            'maxValue': 1,
            'unitCode': 'DAY',
          },
          'transitTime': {
            '@type': 'QuantitativeValue',
            'minValue': 4,
            'maxValue': 7,
            'unitCode': 'DAY',
          },
          'cutoffTime': '14:00:00-05:00',
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#ECEEF2] py-12 sm:py-16">
      {/* Schema.org OfferShippingDetails Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="container mx-auto max-w-5xl px-4">
        <section className="mb-10 rounded-2xl bg-gradient-to-br from-[#F4F0FB] via-white to-[#F4F0FB] border border-[#451e84]/15 px-6 py-8 sm:px-8 sm:py-10 shadow-sm">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#451e84]/20 bg-white px-3.5 py-1.5 text-sm font-semibold text-[#451e84] shadow-xs">
            <Truck className="h-4 w-4 text-[#451e84]" />
            Fast &amp; Free Shipping Across the United States
          </div>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl text-gray-900">
            Shipping Policy
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
            At Yomnoo, we focus on fast, reliable fulfillment with transparent delivery windows, free standard shipping, and real-time tracking from warehouse to door.
          </p>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:border-[#451e84]/30 transition-colors">
            <Clock className="mb-4 h-6 w-6 text-[#451e84]" />
            <h2 className="text-lg font-bold text-gray-900">Order by 2:00 PM EST</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Orders placed before the 2:00 PM EST cutoff are processed, packed, and shipped the same business day.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:border-[#451e84]/30 transition-colors">
            <PackageCheck className="mb-4 h-6 w-6 text-[#451e84]" />
            <h2 className="text-lg font-bold text-gray-900">Free Standard Shipping</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Free shipping on all orders across the United States with no minimum spend.
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:border-[#451e84]/30 transition-colors">
            <ShieldCheck className="mb-4 h-6 w-6 text-[#451e84]" />
            <h2 className="text-lg font-bold text-gray-900">Insured Deliveries</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              All shipments include full insurance, protective packaging, and end-to-end tracking updates.
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Delivery Timelines</h2>
              <p className="mt-2 text-sm text-gray-600">Same-day dispatch applies to orders placed before 2:00 PM EST on business days.</p>
            </div>
            <span className="inline-flex w-fit items-center rounded-full bg-[#F4F0FB] border border-[#451e84]/20 px-3.5 py-1 text-sm font-semibold text-[#451e84]">
              Same-day dispatch cutoff: 2:00 PM EST
            </span>
          </div>

          <div className="mt-6 divide-y divide-gray-100">
            {timeline.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-gray-900">{label}</span>
                <span className="text-sm font-medium text-gray-700 sm:text-right">{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {policySections.map((section) => (
            <div key={section.title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#451e84]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900">Need Help With Shipping?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
            If you have questions about your delivery or need assistance tracking a package, reach out to our support team:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] border border-gray-100 p-4">
              <MapPin className="h-5 w-5 text-[#451e84]" />
              <span className="text-sm font-medium text-gray-900">UK, US & Canada</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] border border-gray-100 p-4">
              <Mail className="h-5 w-5 text-[#451e84]" />
              <span className="text-sm font-medium text-gray-900">contact@yomnoo.com</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] border border-gray-100 p-4">
              <Clock className="h-5 w-5 text-[#451e84]" />
              <span className="text-sm font-medium text-gray-900">Mon-Fri, 9 AM-5 PM EST</span>
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#451e84] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#361668] shadow-sm"
          >
            Contact Support
          </Link>
        </section>
        <LegalBusinessDetails />
      </div>
    </main>
  );
}
