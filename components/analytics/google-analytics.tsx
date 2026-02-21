"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type GoogleAnalyticsProps = {
  measurementId: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function GoogleAnalyticsPageView({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;

    const query = window.location.search;
    const pagePath = query ? `${pathname}${query}` : pathname;

    if (process.env.NODE_ENV !== "production") {
      console.info("[GA] page_view", { measurementId, pagePath });
    }

    window.gtag("config", measurementId, {
      page_path: pagePath,
    });
  }, [measurementId, pathname]);

  return null;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[GA] initialized", { measurementId });
    }
  }, [measurementId]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
      <GoogleAnalyticsPageView measurementId={measurementId} />
    </>
  );
}
