"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type SecurityEventPayload = {
  type: "page_view" | "page_leave" | "cta_click";
  path: string;
  search: string;
  referrer?: string;
  language?: string;
  timezone?: string;
  screen?: string;
  dwellMs?: number;
  scrolled?: boolean;
  whatsappClicks?: number;
  telClicks?: number;
  ctaType?: "whatsapp" | "tel" | "other";
  ctaHref?: string;
};

function sendSecurityEvent(payload: SecurityEventPayload) {
  const body = JSON.stringify(payload);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/security/ingest", blob);
      return;
    }
  } catch {
    // sendBeacon patlarsa fetch'e düş
  }

  fetch("/api/security/ingest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => {
    // sessiz geç
  });
}

export default function SecurityTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ? `?${searchParams.toString()}` : "";

  useEffect(() => {
    const startedAt = Date.now();
    let scrolled = false;
    let telClicks = 0;
    let whatsappClicks = 0;
    let leaveSent = false;

    sendSecurityEvent({
      type: "page_view",
      path: pathname,
      search,
      referrer: document.referrer || "",
      language: navigator.language || "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      screen: `${window.screen.width}x${window.screen.height}`,
    });

    const handleScroll = () => {
      scrolled = true;
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;

      if (!anchor?.href) return;

      const href = anchor.href;

      if (href.startsWith("tel:")) {
        telClicks += 1;

        sendSecurityEvent({
          type: "cta_click",
          path: pathname,
          search,
          ctaType: "tel",
          ctaHref: href,
        });

        return;
      }

      if (href.startsWith("https://wa.me") || href.startsWith("whatsapp://")) {
        whatsappClicks += 1;

        sendSecurityEvent({
          type: "cta_click",
          path: pathname,
          search,
          ctaType: "whatsapp",
          ctaHref: href,
        });

        return;
      }
    };

    const sendLeave = () => {
      if (leaveSent) return;
      leaveSent = true;

      sendSecurityEvent({
        type: "page_leave",
        path: pathname,
        search,
        dwellMs: Date.now() - startedAt,
        scrolled,
        telClicks,
        whatsappClicks,
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendLeave();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClick);
    window.addEventListener("pagehide", sendLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      sendLeave();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("pagehide", sendLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname, search]);

  return null;
}