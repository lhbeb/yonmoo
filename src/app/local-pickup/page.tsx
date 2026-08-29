import Link from 'next/link';
import { Clock3, MapPin, PackageCheck, ShieldCheck } from 'lucide-react';

const pickupSteps = [
  {
    title: 'Place your order first',
    body: 'Choose your item online and complete checkout before heading to either of our pickup locations.',
    icon: PackageCheck,
  },
  {
    title: 'Wait for pickup confirmation',
    body: 'We will contact you as soon as your order is packed, verified, and ready to be collected.',
    icon: ShieldCheck,
  },
  {
    title: 'Bring your order details',
    body: 'Have your order confirmation, a valid ID, and any collection message ready when you arrive.',
    icon: Clock3,
  },
];

export default function LocalPickupPage() {
  return (
    <div className="min-h-screen bg-[#ECEEF2] py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-white shadow-[0_24px_80px_rgba(0,48,153,0.10)]">
          <section className="bg-gradient-to-br from-[#171717] via-[#171717] to-[#171717] px-6 py-10 text-[#F8FAFC] sm:px-10 sm:py-12">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#451e84]">
              Local Pickup Guide
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Pick up your Yomnoo order with confidence
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#E5E7EB] sm:text-base">
              Eligible products can be collected from our location in Modesto, California. This page covers what to expect, what to bring, and how collection works once your order is ready.
            </p>
          </section>

          <div className="grid gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1.2fr)_360px]">
            <div className="space-y-8">
              <section className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 sm:p-7">
                <h2 className="text-2xl font-semibold text-[#262626]">How local pickup works</h2>
                <div className="mt-6 grid gap-4">
                  {pickupSteps.map((step) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.title} className="rounded-[20px] border border-[#F3F4F6] bg-[#F8FAFC] p-5">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#171717]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-[#262626]">{step.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-[#5B6785]">{step.body}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 sm:p-7">
                <h2 className="text-2xl font-semibold text-[#262626]">Before you arrive</h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[#5B6785]">
                  <li>Make sure you have received a pickup-ready confirmation from our team.</li>
                  <li>Bring a valid photo ID and your order number.</li>
                  <li>If someone else is collecting for you, contact us in advance so we can note it on the order.</li>
                  <li>For high-value items, we may ask for an extra confirmation step before release.</li>
                </ul>
              </section>

              <section className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 sm:p-7">
                <h2 className="text-2xl font-semibold text-[#262626]">Need help first?</h2>
                <p className="mt-3 text-sm leading-7 text-[#5B6785]">
                  If you are unsure whether a product is available for local pickup, please contact us before placing the order so we can confirm availability and timing.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="mailto:contact@yomnoo.com"
                    className="inline-flex items-center justify-center rounded-2xl bg-[#451e84] px-5 py-3 text-sm font-semibold text-[#F8FAFC] transition hover:bg-[#361668]"
                  >
                    Email Support
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl border border-[#451e84]/20 bg-white px-5 py-3 text-sm font-semibold text-[#171717] transition hover:bg-[#F8FAFC]"
                  >
                    Contact Page
                  </Link>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-[24px] border border-[#E5E7EB] bg-[#F8FAFC] p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#171717]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold text-[#262626]">Pickup location</h2>
                    <div className="mt-4 space-y-4 text-sm leading-7 text-[#5B6785]">
                      <address className="not-italic">
                        <span className="block font-semibold text-[#262626]">United States Warehouse</span>
                        415 Codoni Ave
                        <br />
                        Modesto, CA 95357
                        <br />
                        USA
                      </address>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[24px] border border-[#E5E7EB] bg-[#F8FAFC] p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#171717]">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#262626]">Collection timing</h2>
                    <p className="mt-3 text-sm leading-7 text-[#5B6785]">
                      Pickup timing is confirmed directly by our team after your order is prepared. Please do not travel before you receive the ready-for-pickup message.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[24px] border border-[#E5E7EB] bg-white p-6">
                <h2 className="text-lg font-semibold text-[#262626]">Important note</h2>
                <p className="mt-3 text-sm leading-7 text-[#5B6785]">
                  Local pickup availability and location vary by item. Some products remain shipping-only, and inventory cannot always be transferred between the US and UK locations. Wait for your confirmation message before travelling.
                </p>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
