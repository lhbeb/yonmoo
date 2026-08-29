'use client';

import Script from 'next/script';

export default function GoogleMerchantBadge() {
  return (
    <Script
      id="merchantWidgetScript"
      src="https://www.gstatic.com/shopping/merchant/merchantwidget.js"
      strategy="lazyOnload"
      onLoad={() => {
        try {
          if (typeof window !== 'undefined' && (window as any).merchantwidget) {
            (window as any).merchantwidget.start({
              merchant_id: 324580843,
              position: 'BOTTOM_LEFT',
            });
          }
        } catch (e) {
          console.error('Google Merchant Widget load error:', e);
        }
      }}
    />
  );
}
