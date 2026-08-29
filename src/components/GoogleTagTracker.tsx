"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GOOGLE_ADS_ID } from "@/lib/googleAds";

const PAGE_VIEW_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_PAGE_VIEW_CONVERSION_LABEL ||
  "_Gw1CMjEy-QcEM_p58NE";

export default function GoogleTagTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (typeof window === "undefined" || !window.gtag) return;

    const pagePath = pathname + window.location.search;
    const pageLocation = window.location.href;

    // Standard page_view — picked up by Google Ads and Google Merchant Center / Google Tag
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_location: pageLocation,
    });

    // Explicit conversion event for the "Page view" conversion action
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${PAGE_VIEW_CONVERSION_LABEL}`,
      value: 1.0,
      currency: "USD",
    });
  }, [pathname]);

  return null;
}
