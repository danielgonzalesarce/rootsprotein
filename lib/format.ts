export function formatPrice(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  if (Number.isInteger(rounded)) return `S/ ${rounded}`;
  return `S/ ${rounded.toFixed(2)}`;
}

export function formatOrderMoney(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return `S/ ${rounded.toFixed(2)}`;
}

export function parseOrderMoney(value: string): number | null {
  const normalized = value.trim().replace(/\s/g, "").replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
  const amount = Number(normalized);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return Math.round(amount * 100) / 100;
}

function readClock(value: string): { hours: number; minutes: number } | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return { hours, minutes };
}

export function formatOrderTime(value: string): string {
  const clock = readClock(value);
  if (!clock) return value;
  const period = clock.hours >= 12 ? "pm" : "am";
  const hour12 = clock.hours % 12 || 12;
  return `${hour12}:${String(clock.minutes).padStart(2, "0")} ${period}`;
}

export function formatServiceClock(value: string): string {
  const clock = readClock(value);
  if (!clock) return value;
  const period = clock.hours >= 12 ? "p. m." : "a. m.";
  const hour12 = clock.hours % 12 || 12;
  return `${hour12}:${String(clock.minutes).padStart(2, "0")} ${period}`;
}

export function serviceTimeSlots(opensAt: string, closesAt: string, stepMinutes = 30): string[] {
  const open = readClock(opensAt);
  const close = readClock(closesAt);
  if (!open || !close) return [];
  const start = open.hours * 60 + open.minutes;
  const end = close.hours * 60 + close.minutes;
  if (end < start || stepMinutes < 1) return [];
  const slots: string[] = [];
  for (let minute = start; minute <= end; minute += stepMinutes) {
    const hours = Math.floor(minute / 60);
    const minutes = minute % 60;
    slots.push(`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`);
  }
  return slots;
}
