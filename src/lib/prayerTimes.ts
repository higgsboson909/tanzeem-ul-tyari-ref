import { Coordinates, PrayerTimes, CalculationMethod } from 'adhan';
import type { CityData } from '@/data/pakistanCities';

export interface DayTiming {
  date: string; // YYYY-MM-DD
  sehri: string; // HH:mm
  iftar: string; // HH:mm
  sehriDate: Date;
  iftarDate: Date;
}

export interface RamadanTimetable {
  city: string;
  timings: DayTiming[];
}

// Ramadan 2026: Feb 19 – Mar 20 (30 days)
const RAMADAN_START = new Date(2026, 1, 19); // Feb 19
const RAMADAN_END = new Date(2026, 2, 20); // Mar 20

function formatTime(date: Date): string {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Generate Ramadan timetable for a city using adhan-js
 * Uses Karachi method (Fajr 18°, Isha 18°) — standard for Pakistan
 * Sehri = Fajr - 1 minute (precaution)
 * Iftar = Maghrib (sunset)
 */
export function generateRamadanTimetable(city: CityData): RamadanTimetable {
  const coords = new Coordinates(city.lat, city.lng);
  const params = CalculationMethod.Karachi();

  const timings: DayTiming[] = [];
  const current = new Date(RAMADAN_START);

  while (current <= RAMADAN_END) {
    const pt = new PrayerTimes(coords, current, params);

    // Sehri = Fajr - 1 minute
    const sehriDate = new Date(pt.fajr.getTime() - 60 * 1000);
    const iftarDate = new Date(pt.maghrib);

    timings.push({
      date: formatDate(current),
      sehri: formatTime(sehriDate),
      iftar: formatTime(iftarDate),
      sehriDate,
      iftarDate,
    });

    current.setDate(current.getDate() + 1);
  }

  return { city: city.name, timings };
}

/**
 * Get today's timing from a timetable, or the closest date
 */
export function getTodayTiming(timetable: RamadanTimetable): DayTiming | null {
  const today = formatDate(new Date());
  return timetable.timings.find((t) => t.date === today) || null;
}

/**
 * Get next Sehri and Iftar times relative to now
 */
export function getNextTimings(timetable: RamadanTimetable): {
  nextSehri: DayTiming | null;
  nextIftar: DayTiming | null;
  countdownType: 'SEHRI' | 'IFTAR';
  secondsLeft: number;
} {
  const now = new Date();

  // Find today's and tomorrow's timings
  const todayStr = formatDate(now);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatDate(tomorrow);

  const todayTiming = timetable.timings.find((t) => t.date === todayStr);
  const tomorrowTiming = timetable.timings.find((t) => t.date === tomorrowStr);

  if (!todayTiming) {
    // Not in Ramadan range — find closest
    const first = timetable.timings[0];
    if (first) {
      const firstSehri = buildDateFromTiming(first.date, first.sehri);
      const diff = Math.floor((firstSehri.getTime() - now.getTime()) / 1000);
      return {
        nextSehri: first,
        nextIftar: first,
        countdownType: 'SEHRI',
        secondsLeft: Math.max(0, diff),
      };
    }
    return { nextSehri: null, nextIftar: null, countdownType: 'SEHRI', secondsLeft: 0 };
  }

  const todaySehri = buildDateFromTiming(todayTiming.date, todayTiming.sehri);
  const todayIftar = buildDateFromTiming(todayTiming.date, todayTiming.iftar);

  // Before Sehri → countdown to Sehri
  if (now < todaySehri) {
    const diff = Math.floor((todaySehri.getTime() - now.getTime()) / 1000);
    return {
      nextSehri: todayTiming,
      nextIftar: todayTiming,
      countdownType: 'SEHRI',
      secondsLeft: diff,
    };
  }

  // Between Sehri and Iftar → countdown to Iftar
  if (now < todayIftar) {
    const diff = Math.floor((todayIftar.getTime() - now.getTime()) / 1000);
    return {
      nextSehri: tomorrowTiming || null,
      nextIftar: todayTiming,
      countdownType: 'IFTAR',
      secondsLeft: diff,
    };
  }

  // After Iftar → countdown to tomorrow's Sehri
  if (tomorrowTiming) {
    const tomorrowSehri = buildDateFromTiming(tomorrowTiming.date, tomorrowTiming.sehri);
    const diff = Math.floor((tomorrowSehri.getTime() - now.getTime()) / 1000);
    return {
      nextSehri: tomorrowTiming,
      nextIftar: tomorrowTiming,
      countdownType: 'SEHRI',
      secondsLeft: diff,
    };
  }

  return { nextSehri: null, nextIftar: null, countdownType: 'SEHRI', secondsLeft: 0 };
}

function buildDateFromTiming(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, 0);
}

// Cache key
const CACHE_KEY = 'tanzeem_prayer_cache';
const CITY_PREF_KEY = 'tanzeem_selected_city';

export function getCachedTimetable(cityName: string): RamadanTimetable | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.city === cityName) return data;
    return null;
  } catch {
    return null;
  }
}

export function cacheTimetable(timetable: RamadanTimetable) {
  try {
    // Store without Date objects (they don't serialize)
    const toCache = {
      city: timetable.city,
      timings: timetable.timings.map((t) => ({
        date: t.date,
        sehri: t.sehri,
        iftar: t.iftar,
      })),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(toCache));
  } catch {
    // ignore
  }
}

export function getSavedCity(): string | null {
  return localStorage.getItem(CITY_PREF_KEY);
}

export function saveCity(cityName: string) {
  localStorage.setItem(CITY_PREF_KEY, cityName);
}
