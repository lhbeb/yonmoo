import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans, Nunito } from "next/font/google";
import "./globals.css";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import InstagramSection from "@/components/InstagramSection";
import ErrorBoundaryWrapper from "@/components/ErrorBoundary";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";
import { Suspense } from "react";
import VisitNotifier from "@/components/VisitNotifier";
import FacebookPixel from "@/components/FacebookPixel";
import GoogleTagTracker from "@/components/GoogleTagTracker";
import { AdminRouteCheck, PublicRouteOnly, AdminRouteOnly, CheckoutRouteOnly } from "@/components/AdminRouteCheck";
import GlobalErrorReporter from "@/components/GlobalErrorReporter";
import TidioChat from "@/components/TidioChat";
import GoogleMerchantBadge from "@/components/GoogleMerchantBadge";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-rounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yomnoo - Curated Online Marketplace",
  description: "Shop curated products at Yomnoo marketplace: electronics, fashion, collectibles, gadgets, and more. Discover verified deals, fast shipping, and a secure shopping experience.",
  keywords: "Yomnoo, online marketplace, curated marketplace, electronics, fashion, collectibles, gadgets, deals, shopping, secure checkout, fast shipping",
  authors: [{ name: "Yomnoo" }],
  creator: "Yomnoo",
  publisher: "Yomnoo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://Yomnoo.com"),
  openGraph: {
    title: "Yomnoo - Curated Online Marketplace",
    description: "Shop curated products at Yomnoo marketplace: electronics, fashion, collectibles, gadgets, and more. Discover verified deals, fast shipping, and a secure shopping experience.",
    url: "https://Yomnoo.com",
    siteName: "Yomnoo",
    images: [
      {
        url: "/g7x.jpeg",
        width: 1200,
        height: 630,
        alt: "Yomnoo - Curated Online Marketplace",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yomnoo - Curated Online Marketplace",
    description: "Shop curated products at Yomnoo marketplace: electronics, fashion, collectibles, gadgets, and more. Discover verified deals, fast shipping, and a secure shopping experience.",
    images: ["/g7x.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "aGkqoI_eCG0h2qF377pXezPaxovx1V-MeOiyeYD5Ngg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5ZJXVQBL');`
          }}
        />
        {/* Google Ads & Google Merchant Center: inline stub MUST come before async gtag.js */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-18395821263');gtag('config','GT-MQJ5LNKG');window.googleAdsInitialized=true;`
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18395821263"
        />
        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="k3ytyf6hqaa462mz10uzwnmugj0d0o" />
        <meta name="msvalidate.01" content="75494FC1101908256EEEA046C47C3264" />
        {/* Hotjar Tracking Code for Site 6768327 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:6768327,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${dmSans.variable} ${nunito.variable} font-sans antialiased text-[#171717] bg-[#ECEEF2]`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5ZJXVQBL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <GlobalErrorReporter />
        <Suspense fallback={null}>
          <FacebookPixel />
          <GoogleTagTracker />
        </Suspense>
        <PublicRouteOnly>
          <VisitNotifier />
        </PublicRouteOnly>
        {/* Organization Schema */}
        <AdminRouteCheck>
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Yomnoo",
                "url": "https://Yomnoo.com",
                "logo": "https://Yomnoo.com/logosvg.svg",
                "description": "Yomnoo - A curated online marketplace for quality electronics, fashion, collectibles, and everyday essentials.",
                "sameAs": [
                  "https://twitter.com/Yomnoo",
                  "https://facebook.com/Yomnoo",
                  "https://instagram.com/helloyonmoo"
                ],
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "contactType": "customer service",
                    "email": "contact@yomnoo.com",
                    "areaServed": "US",
                    "availableLanguage": ["en"]
                  }
                ],
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "4205 W Glenrosa Ave",
                  "addressLocality": "Phoenix",
                  "addressRegion": "AZ",
                  "postalCode": "85019",
                  "addressCountry": "US"
                },
                "hasMerchantReturnPolicy": {
                  "@type": "MerchantReturnPolicy",
                  "applicableCountry": "US",
                  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
                  "merchantReturnDays": 30,
                  "returnMethod": "https://schema.org/ReturnByMail",
                  "returnFees": "https://schema.org/FreeReturn"
                }
              })
            }}
          />
        </AdminRouteCheck>

        {/* WebSite Schema */}
        <AdminRouteCheck>
          <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Yomnoo",
                "url": "https://Yomnoo.com",
                "description": "Yomnoo - Where Savings Make You Smile. Discover premium cameras and photography equipment at unbeatable prices.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://Yomnoo.com/api/products/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
        </AdminRouteCheck>

        <ErrorBoundaryWrapper>
          {/* Public website with header, footer, etc. */}
          <PublicRouteOnly>
            <div className="min-h-screen flex flex-col">
              <Suspense fallback={null}>
                <ClientHeader />
              </Suspense>
              <main className="flex-grow">
                {children}
              </main>
              <Suspense fallback={null}>
                <InstagramSection />
              </Suspense>
              <NewsletterSection />
              <Footer />
            </div>
            <CookieConsent />
            <GoogleMerchantBadge />
          </PublicRouteOnly>

          {/* Checkout page - navbar only, no distractions */}
          <CheckoutRouteOnly>
            <div className="min-h-screen flex flex-col">
              <Suspense fallback={null}>
                <ClientHeader />
              </Suspense>
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </CheckoutRouteOnly>

          {/* Admin dashboard - clean, no public UI */}
          <AdminRouteOnly>
            {children}
          </AdminRouteOnly>
        </ErrorBoundaryWrapper>

        <AdminRouteCheck>
          <Script
            src="https://analyticsapp-five.vercel.app/tracker.js"
            strategy="afterInteractive"
            async
          />
        </AdminRouteCheck>
        <TidioChat />
        <SpeedInsights />
      </body>
    </html>
  );
}
