import { site } from "@/data/site";
import { loyalty } from "@/data/loyalty";

function clockToMinutes(value: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

/** Hora actual en el huso del local (minutos desde medianoche). */
export function limaMinutesNow(date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: loyalty.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  return hour * 60 + minute;
}

export function isWithinServiceHours(date = new Date()): boolean {
  const open = clockToMinutes(site.opensAt);
  const close = clockToMinutes(site.closesAt);
  if (open === null || close === null) return true;
  const now = limaMinutesNow(date);
  return now >= open && now <= close;
}

export function formatLimaDateTime(iso: string): string {
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: loyalty.timezone,
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}
