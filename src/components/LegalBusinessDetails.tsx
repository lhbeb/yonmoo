import { MapPin } from 'lucide-react';
import { BUSINESS_DETAILS } from '@/lib/business';

export default function LegalBusinessDetails() {
  return (
    <section
      aria-labelledby="legal-business-details"
      className="mt-10 border-t border-[#451e84]/10 pt-8"
    >
      <div className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#171717]/65" aria-hidden="true" />
        <div>
          <h2 id="legal-business-details" className="text-xl font-bold text-[#262626]">
            Warehouse location
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
            Yomnoo is a United States based business fulfilling orders from our main warehouse in Modesto, California.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
        {BUSINESS_DETAILS.warehouses.map((warehouse) => (
          <address key={warehouse.label} className="not-italic">
            <div className="flex items-center gap-2 font-semibold text-[#262626]">
              <MapPin className="h-4 w-4 text-[#171717]/55" aria-hidden="true" />
              {warehouse.label}
            </div>
            <div className="mt-2 leading-6 text-gray-600">
              {warehouse.street}<br />
              {warehouse.cityRegionPostal}<br />
              {warehouse.country}
            </div>
          </address>
        ))}
      </div>

      <p className="mt-5 text-xs leading-5 text-gray-500">
        Contact support before sending a return or other package to the warehouse.
      </p>
    </section>
  );
}
