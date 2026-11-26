"use client";

import { sendGAEvent } from "@next/third-parties/google";

export type AnalyticsEvent =
  | "click_whatsapp"
  | "click_como_llegar"
  | "click_llamar"
  | "click_google_review"
  | "add_to_cart"
  | "send_order";

export function track(event: AnalyticsEvent, params?: Record<string, string | number>): void {
  if (!process.env.NEXT_PUBLIC_GA_ID || typeof window === "undefined") return;
  sendGAEvent("event", event, params ?? {});
}
