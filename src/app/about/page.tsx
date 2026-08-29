import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNotifier from '@/components/AboutNotifier';
import LiveChatButton from '@/components/LiveChatButton';
import {
  Users,
  Shield,
  Heart,
  Zap,
  CheckCircle2,
  Award,
  Target,
  Sparkles,
  Package,
  Eye,
  DollarSign,
  Leaf,
  Headphones,
  MapPin,
  MessageSquare,
  Mail,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Yomnoo',
  description:
    'Learn about Yomnoo, a United States based ecommerce store located in Modesto, California. Smart sourcing, quality products, fair prices.',
};

export default function AboutPage() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://www.yomnoo.com/about#webpage',
        'url': 'https://www.yomnoo.com/about',
        'name': 'About Yomnoo',
        'description':
          'Yomnoo is a United States based e-commerce retailer operating in Modesto, California.',
        'mainEntity': {
          '@id': 'https://www.yomnoo.com/#organization',
        },
      },
      {
        '@type': 'OnlineStore',
        '@id': 'https://www.yomnoo.com/#organization',
        'name': 'Yomnoo',
        'url': 'https://www.yomnoo.com',
        'description':
          'United States ecommerce store offering electronics, fashion, photography gear, tools, and home equipment.',
        'email': 'contact@yomnoo.com',
        'address': [
          {
            '@type': 'PostalAddress',
            'streetAddress': '415 Codoni Ave',
            'addressLocality': 'Modesto',
            'addressRegion': 'CA',
            'postalCode': '95357',
            'addressCountry': 'US',
          },
        ],
        'contactPoint': [
          {
            '@type': 'ContactPoint',
            'contactType': 'customer service',
            'email': 'contact@yomnoo.com',
            'areaServed': 'US',
            'availableLanguage': ['en'],
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ECEEF2]">
      {/* Schema.org AboutPage & OnlineStore Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      <AboutNotifier />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#16033d] via-[#1a0548] to-[#16033d] text-white py-16 sm:py-20 shadow-sm">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#C4B5FD] mb-6">
            About Yomnoo
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight text-white">About Yomnoo</h1>
          <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-3xl mx-auto">
            Welcome to Yomnoo, a United States based ecommerce store with headquarters and fulfillment in Modesto, California. We help smart shoppers find quality products at fair and transparent prices across electronics, photography gear, fashion, electric mobility, tools, and home equipment.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        {/* US Presence & Fulfillment */}
        <section className="mb-12 rounded-2xl bg-white border border-gray-200 p-8 shadow-xs">
          <div className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] md:items-start">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4F0FB] text-[#451e84]">
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-[#262626]">US Warehouse &amp; Fulfillment</h2>
            </div>
            <div className="space-y-4 text-base leading-7 text-gray-700">
              <p>
                Yomnoo is proudly headquartered and operated in the United States. Our fulfillment center in Modesto, California allows us to support fast nationwide shipping, quality inspection, secure product handling, and convenient local pickup.
              </p>
              <p>
                Eligible products can also be collected locally from our warehouse in Modesto, California. Our team confirms the available pickup address and collection time for each order before you arrive.
              </p>
              <Link href="/local-pickup" className="inline-flex font-semibold text-[#451e84] hover:text-[#361668] hover:underline">
                View the local pickup guide →
              </Link>
            </div>
          </div>
        </section>

        {/* How We Keep Prices Low */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-8 mb-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#262626]">How We Keep Prices Low While Staying 100% Legit</h2>
          </div>
          <p className="text-gray-700 mb-8 text-lg leading-relaxed">
            Our business model is based on experience, smart sourcing, and efficiency. The reason our items are often 30 to 50 percent below retail is because we purchase differently from traditional stores.
          </p>

          <div className="space-y-6">
            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200 border-l-4 border-l-[#451e84]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#451e84] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#262626] mb-2">We win thousands of online auctions before items reach the public</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our sourcing team participates daily in high volume auctions across multiple platforms. By buying in bulk before products reach regular marketplaces, we secure lower costs and pass those savings directly to our customers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200 border-l-4 border-l-[#451e84]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#451e84] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#262626] mb-2">We negotiate deals across major online marketplaces</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our dedicated team searches online platforms and marketplaces daily. We negotiate directly with private sellers, compare prices, and secure the highest value possible, which allows us to keep prices low and inventory diverse.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200 border-l-4 border-l-[#451e84]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#451e84] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#262626] mb-2">We partner with the return and liquidation departments of major retailers</h3>
                  <p className="text-gray-700 mb-2 leading-relaxed">
                    When possible, we obtain bulk lots from major retail chains. These lots include overstock, open box items, shelf pulls, refurbished pieces, and customer returns.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Every product is carefully inspected, tested, cleaned, or refurbished before being listed.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200 border-l-4 border-l-[#451e84]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#451e84] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#262626] mb-2">We hunt for deals locally</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our team regularly visits community auctions, estate sales, local wholesalers, and liquidation centers. This allows us to discover unique finds and high value items that are often unavailable in traditional stores.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200 border-l-4 border-l-[#451e84]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#451e84] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#262626] mb-2">Fair pricing keeps our store competitive</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Instead of adding heavy markups, we focus on fair margins and fast turnover. This approach keeps our prices consistent, honest, and genuinely competitive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Private Sellers Section */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#F4F0FB] text-[#451e84] rounded-xl">
              <Users className="h-8 w-8 text-[#451e84]" />
            </div>
            <h2 className="text-3xl font-bold text-[#262626]">A New Addition to Our Model: Approved Private Sellers</h2>
          </div>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            Over the past three years, we have expanded our sourcing model by partnering with a network of private sellers who share the same dedication to quality and fairness as our in-house team.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            These private sellers find, source, and curate their own products, then ship their items to our warehouse. Once the items arrive, our inspection team performs a full evaluation, which includes:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#FAF8FC] rounded-xl p-5 border border-gray-200">
              <CheckCircle2 className="h-6 w-6 text-[#451e84] mb-2" />
              <p className="text-gray-800 font-semibold">Verifying authentic condition</p>
            </div>
            <div className="bg-[#FAF8FC] rounded-xl p-5 border border-gray-200">
              <Zap className="h-6 w-6 text-[#451e84] mb-2" />
              <p className="text-gray-800 font-semibold">Confirming that the product works perfectly</p>
            </div>
            <div className="bg-[#FAF8FC] rounded-xl p-5 border border-gray-200">
              <DollarSign className="h-6 w-6 text-[#451e84] mb-2" />
              <p className="text-gray-800 font-semibold">Validating fair market value</p>
            </div>
          </div>

          <p className="text-gray-800 font-medium mb-6 bg-[#FAF8FC] rounded-xl p-5 border border-gray-200">
            Only after the inspection is complete does the item become available for purchase.
          </p>

          <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-[#262626] mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#451e84]" />
              How it works for customers
            </h3>
            <p className="text-gray-700 mb-3 leading-relaxed">
              When you purchase from a private seller on our platform, it is clearly stated on the product page. The seller sends the item to us first, we inspect it, and only then do we ship it to you.
            </p>
            <p className="text-gray-700 mb-3 leading-relaxed">
              This process protects buyers and ensures that every product, whether sold by us or by a trusted partner, meets the same high standard.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Private sellers benefit by earning their own fair profits, while customers benefit from greater variety and consistent quality control.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-gradient-to-br from-[#16033d] via-[#1a0548] to-[#16033d] rounded-2xl shadow-sm p-10 mb-12 text-white text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 border border-white/20 rounded-full mb-6 text-[#C4B5FD]">
            <Target className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">Our Mission</h2>
          <p className="text-xl text-[#C4B5FD] font-medium mb-4 max-w-2xl mx-auto">
            To give everyday shoppers access to high quality products at honest prices.
          </p>
          <p className="text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            Whether you are looking for a laptop, camera, electric scooter, fashion piece, or home equipment, you should not have to pay more than necessary.
          </p>
        </div>

        {/* What Makes Us Different */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-8 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#F4F0FB] text-[#451e84] rounded-xl">
              <Sparkles className="h-8 w-8 text-[#451e84]" />
            </div>
            <h2 className="text-3xl font-bold text-[#262626]">What Makes Us Different</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Package className="h-6 w-6 text-[#451e84]" />
                <h3 className="text-xl font-bold text-[#262626]">Curated Inventory</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">Every product is carefully inspected and verified before it is shipped to the customer.</p>
            </div>

            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="h-6 w-6 text-[#451e84]" />
                <h3 className="text-xl font-bold text-[#262626]">Transparent Product Details</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">We clearly list whether an item is new, open box, refurbished, or pre owned. Customers always know what they are buying.</p>
            </div>

            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="h-6 w-6 text-[#451e84]" />
                <h3 className="text-xl font-bold text-[#262626]">Real Value</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">We constantly compare and track market prices to ensure every listing is a genuine deal.</p>
            </div>

            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Headphones className="h-6 w-6 text-[#451e84]" />
                <h3 className="text-xl font-bold text-[#262626]">Customer Focus</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">We offer fast and free shipping across the United States, a 30 day return policy, and reliable 24/7 support.</p>
            </div>

            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200 md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <Leaf className="h-6 w-6 text-[#451e84]" />
                <h3 className="text-xl font-bold text-[#262626]">Sustainable Shopping</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">By reselling returns, overstock, and refurbished goods, you help reduce waste and support a more sustainable buying cycle.</p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-8 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-[#F4F0FB] text-[#451e84] rounded-xl">
              <Heart className="h-8 w-8 text-[#451e84]" />
            </div>
            <h2 className="text-3xl font-bold text-[#262626]">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#FAF8FC] rounded-xl p-6 text-center border border-gray-200">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F0FB] text-[#451e84]">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-[#262626] text-lg">Integrity</h3>
            </div>
            <div className="bg-[#FAF8FC] rounded-xl p-6 text-center border border-gray-200">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F0FB] text-[#451e84]">
                <Award className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-[#262626] text-lg">Quality</h3>
            </div>
            <div className="bg-[#FAF8FC] rounded-xl p-6 text-center border border-gray-200">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F0FB] text-[#451e84]">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-[#262626] text-lg">Customer Trust</h3>
            </div>
            <div className="bg-[#FAF8FC] rounded-xl p-6 text-center border border-gray-200">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F0FB] text-[#451e84]">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-[#262626] text-lg">Innovation</h3>
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="bg-gradient-to-br from-[#16033d] via-[#1a0548] to-[#16033d] rounded-2xl shadow-sm p-10 mb-12 text-white">
          <h3 className="text-3xl font-bold mb-8 text-center text-white">Company Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15">
              <div className="text-4xl font-extrabold mb-2 text-[#C4B5FD]">5000+</div>
              <div className="text-white/85 text-sm font-medium">happy customers</div>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15">
              <div className="text-4xl font-extrabold mb-2 text-[#C4B5FD]">1000+</div>
              <div className="text-white/85 text-sm font-medium">products sold</div>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15">
              <div className="text-4xl font-extrabold mb-2 text-[#C4B5FD]">99%</div>
              <div className="text-white/85 text-sm font-medium">satisfaction rate</div>
            </div>
            <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15">
              <div className="text-4xl font-extrabold mb-2 text-[#C4B5FD]">24/7</div>
              <div className="text-white/85 text-sm font-medium">live chat support</div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-[#F4F0FB] text-[#451e84] rounded-xl">
              <MessageSquare className="h-8 w-8 text-[#451e84]" />
            </div>
            <h3 className="text-2xl font-bold text-[#262626]">Contact Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-[#451e84]" />
                <div className="font-bold text-[#262626]">Warehouse Location</div>
              </div>
              <div className="text-gray-600 ml-8">415 Codoni Ave, Modesto, CA 95357, USA</div>
            </div>
            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="h-5 w-5 text-[#451e84]" />
                <div className="font-bold text-[#262626]">Live Support</div>
              </div>
              <div className="ml-8 space-y-2 text-gray-600">
                <div className="font-medium text-[#262626]">Available 24/7</div>
                <LiveChatButton className="inline-flex items-center text-sm font-semibold text-[#451e84] hover:underline cursor-pointer">
                  Open Live Chat →
                </LiveChatButton>
              </div>
            </div>
            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-5 w-5 text-[#451e84]" />
                <div className="font-bold text-[#262626]">Email:</div>
              </div>
              <div className="text-gray-600 ml-8">contact@yomnoo.com</div>
            </div>
            <div className="bg-[#FAF8FC] rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-[#451e84]" />
                <div className="font-bold text-[#262626]">Business Hours:</div>
              </div>
              <div className="text-gray-600 ml-8 space-y-1">
                <div>Monday to Friday, 9:00 AM to 5:00 PM EST</div>
                <div>Saturday, 10:00 AM to 3:00 PM EST</div>
                <div>Sunday, Closed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
