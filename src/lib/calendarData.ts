import january from "@/assets/months/january.jpg";
import february from "@/assets/months/february.jpg";
import march from "@/assets/months/march.jpg";
import april from "@/assets/months/april.jpg";
import may from "@/assets/months/may.jpg";
import june from "@/assets/months/june.jpg";
import july from "@/assets/months/july.jpg";
import august from "@/assets/months/august.jpg";
import september from "@/assets/months/september.jpg";
import october from "@/assets/months/october.jpg";
import november from "@/assets/months/november.jpg";
import december from "@/assets/months/december.jpg";

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const MONTH_IMAGES: Record<number, string> = {
  0: january, 1: february, 2: march, 3: april,
  4: may, 5: june, 6: july, 7: august,
  8: september, 9: october, 10: november, 11: december,
};

export const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const EMOJI_OPTIONS = [
  "🎉", "❤️", "⭐", "🔥", "✅", "📌", "🎂", "✈️", "💼", "🏋️",
  "📅", "💡", "🎯", "🌟", "🎁", "💰", "🏠", "🚗", "📚", "🎵",
];

export interface DateNote {
  text: string;
  emoji?: string;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t >= s && t <= e;
}

export function dateKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
