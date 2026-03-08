import { useState, useEffect, useCallback } from 'react';
import { PAKISTAN_CITIES, DEFAULT_CITY, findNearestCity, type CityData } from '@/data/pakistanCities';
import {
  generateRamadanTimetable,
  getNextTimings,
  getCachedTimetable,
  cacheTimetable,
  getSavedCity,
  saveCity,
  type RamadanTimetable,
  type DayTiming,
} from '@/lib/prayerTimes';

export function usePrayerTimes() {
  const [city, setCity] = useState<CityData>(DEFAULT_CITY);
  const [timetable, setTimetable] = useState<RamadanTimetable | null>(null);
  const [detecting, setDetecting] = useState(true);
  const [countdownType, setCountdownType] = useState<'SEHRI' | 'IFTAR'>('SEHRI');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [todayTiming, setTodayTiming] = useState<DayTiming | null>(null);
  const [showOverlay, setShowOverlay] = useState<'sehri' | 'iftar' | null>(null);
  const [overlayDismissed, setOverlayDismissed] = useState<string | null>(null);

  // Load or generate timetable for a city
  const loadTimetable = useCallback((cityData: CityData) => {
    // Check cache first
    const cached = getCachedTimetable(cityData.name);
    if (cached) {
      // Rebuild Date objects
      const rebuilt: RamadanTimetable = {
        city: cached.city,
        timings: cached.timings.map((t) => {
          const [y, m, d] = t.date.split('-').map(Number);
          const [sh, sm] = t.sehri.split(':').map(Number);
          const [ih, im] = t.iftar.split(':').map(Number);
          return {
            ...t,
            sehriDate: new Date(y, m - 1, d, sh, sm),
            iftarDate: new Date(y, m - 1, d, ih, im),
          };
        }),
      };
      setTimetable(rebuilt);
      return rebuilt;
    }

    const generated = generateRamadanTimetable(cityData);
    cacheTimetable(generated);
    setTimetable(generated);
    return generated;
  }, []);

  // Detect city on mount
  useEffect(() => {
    const savedCityName = getSavedCity();
    if (savedCityName) {
      const found = PAKISTAN_CITIES.find((c) => c.name === savedCityName);
      if (found) {
        setCity(found);
        loadTimetable(found);
        setDetecting(false);
        return;
      }
    }

    // Try geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const nearest = findNearestCity(pos.coords.latitude, pos.coords.longitude);
          setCity(nearest);
          saveCity(nearest.name);
          loadTimetable(nearest);
          setDetecting(false);
        },
        () => {
          // Permission denied — use default
          setCity(DEFAULT_CITY);
          loadTimetable(DEFAULT_CITY);
          setDetecting(false);
        },
        { timeout: 5000 }
      );
    } else {
      setCity(DEFAULT_CITY);
      loadTimetable(DEFAULT_CITY);
      setDetecting(false);
    }
  }, [loadTimetable]);

  // Change city handler
  const changeCity = useCallback(
    (cityName: string) => {
      const found = PAKISTAN_CITIES.find((c) => c.name === cityName);
      if (found) {
        setCity(found);
        saveCity(found.name);
        loadTimetable(found);
      }
    },
    [loadTimetable]
  );

  // Update countdown every second
  useEffect(() => {
    if (!timetable) return;

    const update = () => {
      const next = getNextTimings(timetable);
      setCountdownType(next.countdownType);
      setSecondsLeft(next.secondsLeft);

      // Find today's timing
      const todayStr = new Date().toISOString().slice(0, 10);
      const today = timetable.timings.find((t) => t.date === todayStr) || null;
      setTodayTiming(today);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timetable]);

  return {
    city,
    timetable,
    detecting,
    countdownType,
    secondsLeft,
    todayTiming,
    changeCity,
    cities: PAKISTAN_CITIES,
  };
}
