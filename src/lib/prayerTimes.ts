import ramadanData from '@/data/ramadanTimings.json';
import { cityToKey, type CityName } from '@/data/pakistanCities';

export interface DayTiming {
  day: number;
  date: string;   // YYYY-MM-DD
  sehri: string;  // HH:mm (24h)
  iftar: string;  // HH:mm (24h)
}

export interface RamadanTimetable {
  city: string;
  timings: DayTiming[];
}

/**
 * Parse "05:18 AM" or "6:29 PM" → "05:18" or "18:29" (24h HH:mm)
 */
function parseAmPm(timeStr: string): string {
  const cleaned = timeStr.trim().toUpperCase();
  const match = cleaned.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (!match) return '00:00';
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const period = match[3];
  if (period === 'AM' && h === 12) h = 0;
  if (period === 'PM' && h !== 12) h += 12;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/**
 * Parse date strings like "19 Feb 2026" or "19 February 2026" → "2026-02-19"
 */
function parseDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Get the Ramadan timetable for a city from hardcoded JSON (hanafi)
 */
export function getRamadanTimetable(city: CityName): RamadanTimetable {
  const key = cityToKey(city);
  const cityData = (ramadanData.cities as Record<string, { hanafi: Array<{ day: number; sehri: string; iftar: string; date: string }> }>)[key];

  if (!cityData) {
    return { city, timings: [] };
  }

  const timings: DayTiming[] = cityData.hanafi.map((entry) => ({
    day: entry.day,
    date: parseDate(entry.date),
    sehri: parseAmPm(entry.sehri),
    iftar: parseAmPm(entry.iftar),
  }));

  return { city, timings };
}

const CITY_PREF_KEY = 'tanzeem_selected_city';

export function getSavedCity(): string | null {
  return localStorage.getItem(CITY_PREF_KEY);
}

export function saveCity(cityName: string) {
  localStorage.setItem(CITY_PREF_KEY, cityName);
}
