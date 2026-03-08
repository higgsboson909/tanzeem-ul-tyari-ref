import { useState, useEffect, useRef, useCallback } from 'react';
import type { DayTiming } from '@/lib/prayerTimes';

export interface RamadanState {
  countdown: { type: string; hours: number; minutes: number; seconds: number; totalMinutes: number };
  isSehriActive: boolean;
  isIftarActive: boolean;
  activeMinutesElapsed: number;
}

const ACTIVE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Provides azaan playback, 5-minute active windows, and countdown
 * based on city-specific timings from usePrayerTimes.
 */
export function useRamadanState(todayTiming: DayTiming | null): RamadanState {
  const [countdown, setCountdown] = useState({ type: '', hours: 0, minutes: 0, seconds: 0, totalMinutes: 0 });
  const [isSehriActive, setIsSehriActive] = useState(false);
  const [isIftarActive, setIsIftarActive] = useState(false);
  const [activeMinutesElapsed, setActiveMinutesElapsed] = useState(0);
  const azaanRef = useRef<HTMLAudioElement | null>(null);
  const sehriPlayedRef = useRef(false);
  const iftarPlayedRef = useRef(false);

  const playAzaan = useCallback(() => {
    try {
      if (!azaanRef.current) {
        azaanRef.current = new Audio('/azaan.mp3');
        azaanRef.current.volume = 0.7;
      }
      azaanRef.current.currentTime = 0;
      azaanRef.current.play().catch(() => {
        // Autoplay blocked — ignore silently
      });
    } catch {
      // Audio not available
    }
  }, []);

  // Reset played refs when timing changes (new day or new city)
  useEffect(() => {
    sehriPlayedRef.current = false;
    iftarPlayedRef.current = false;
  }, [todayTiming?.date, todayTiming?.sehri, todayTiming?.iftar]);

  useEffect(() => {
    if (!todayTiming) return;

    const timer = setInterval(() => {
      const now = new Date();
      const [sehrHour, sehrMin] = todayTiming.sehri.split(':').map(Number);
      const [iftarHour, iftarMin] = todayTiming.iftar.split(':').map(Number);

      const sehrTime = new Date(now);
      sehrTime.setHours(sehrHour, sehrMin, 0, 0);

      const iftarTime = new Date(now);
      iftarTime.setHours(iftarHour, iftarMin, 0, 0);

      const sehrEndTime = new Date(sehrTime.getTime() + ACTIVE_DURATION_MS);
      const iftarEndTime = new Date(iftarTime.getTime() + ACTIVE_DURATION_MS);

      // Sehri active mode (5 min window after sehri time)
      if (now >= sehrTime && now <= sehrEndTime) {
        if (!sehriPlayedRef.current) {
          sehriPlayedRef.current = true;
          playAzaan();
        }
        setIsSehriActive(true);
        setActiveMinutesElapsed(Math.floor((now.getTime() - sehrTime.getTime()) / 60000));
      } else {
        setIsSehriActive(false);
      }

      // Iftar active mode (5 min window after iftar time)
      if (now >= iftarTime && now <= iftarEndTime) {
        if (!iftarPlayedRef.current) {
          iftarPlayedRef.current = true;
          playAzaan();
        }
        setIsIftarActive(true);
        setActiveMinutesElapsed(Math.floor((now.getTime() - iftarTime.getTime()) / 60000));
      } else {
        setIsIftarActive(false);
      }

      // Countdown logic
      let target: Date, type: string;
      if (now < sehrTime) {
        target = sehrTime;
        type = 'SEHRI';
      } else if (now < iftarTime) {
        target = iftarTime;
        type = 'IFTAR';
      } else {
        // After iftar, count down to next day's sehri (approximate same time)
        target = new Date(now);
        target.setDate(target.getDate() + 1);
        target.setHours(sehrHour, sehrMin, 0, 0);
        type = 'SEHRI';
      }

      const diff = Math.max(0, target.getTime() - now.getTime());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const totalMinutes = Math.floor(diff / (1000 * 60));
      setCountdown({ type, hours, minutes, seconds, totalMinutes });
    }, 1000);

    return () => clearInterval(timer);
  }, [todayTiming, playAzaan]);

  return { countdown, isSehriActive, isIftarActive, activeMinutesElapsed };
}
