import { useState, useEffect, useCallback } from 'react';
import { CITY_NAMES, DEFAULT_CITY, type CityName } from '@/data/pakistanCities';
import { getRamadanTimetable, getSavedCity, saveCity, type RamadanTimetable, type DayTiming } from '@/lib/prayerTimes';

export function usePrayerTimes() {
  const [city, setCity] = useState<CityName>(DEFAULT_CITY);
  const [timetable, setTimetable] = useState<RamadanTimetable | null>(null);
  const [todayTiming, setTodayTiming] = useState<DayTiming | null>(null);

  const loadTimetable = useCallback((cityName: CityName) => {
    const tt = getRamadanTimetable(cityName);
    setTimetable(tt);
    return tt;
  }, []);

  // Load on mount
  useEffect(() => {
    const savedCityName = getSavedCity();
    if (savedCityName && CITY_NAMES.includes(savedCityName as CityName)) {
      const c = savedCityName as CityName;
      setCity(c);
      loadTimetable(c);
    } else {
      setCity(DEFAULT_CITY);
      loadTimetable(DEFAULT_CITY);
    }
  }, [loadTimetable]);

  // Change city handler
  const changeCity = useCallback(
    (cityName: string) => {
      if (CITY_NAMES.includes(cityName as CityName)) {
        const c = cityName as CityName;
        setCity(c);
        saveCity(c);
        loadTimetable(c);
      }
    },
    [loadTimetable]
  );

  // Update today's timing
  useEffect(() => {
    if (!timetable) return;
    const update = () => {
      const todayStr = new Date().toISOString().slice(0, 10);
      const today = timetable.timings.find((t) => t.date === todayStr) || null;
      setTodayTiming(today);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [timetable]);

  return {
    city,
    timetable,
    detecting: false,
    todayTiming,
    changeCity,
    cities: CITY_NAMES,
  };
}
