import { useState, useEffect, useCallback } from 'react';
import { CITY_NAMES, DEFAULT_CITY, type CityName } from '@/data/pakistanCities';
import {
  getRamadanTimetable,
  getSavedCity,
  saveCity,
  getSavedFiqh,
  saveFiqh,
  type RamadanTimetable,
  type DayTiming,
  type Fiqh,
} from '@/lib/prayerTimes';

export function usePrayerTimes() {
  const [city, setCity] = useState<CityName>(DEFAULT_CITY);
  const [fiqh, setFiqh] = useState<Fiqh>(getSavedFiqh());
  const [timetable, setTimetable] = useState<RamadanTimetable | null>(null);
  const [todayTiming, setTodayTiming] = useState<DayTiming | null>(null);

  const loadTimetable = useCallback((cityName: CityName, f: Fiqh) => {
    const tt = getRamadanTimetable(cityName, f);
    setTimetable(tt);
    return tt;
  }, []);

  // Load on mount
  useEffect(() => {
    const savedCityName = getSavedCity();
    const savedFiqh = getSavedFiqh();
    if (savedCityName && CITY_NAMES.includes(savedCityName as CityName)) {
      const c = savedCityName as CityName;
      setCity(c);
      setFiqh(savedFiqh);
      loadTimetable(c, savedFiqh);
    } else {
      setCity(DEFAULT_CITY);
      loadTimetable(DEFAULT_CITY, savedFiqh);
    }
  }, [loadTimetable]);

  const changeCity = useCallback(
    (cityName: string) => {
      if (CITY_NAMES.includes(cityName as CityName)) {
        const c = cityName as CityName;
        setCity(c);
        saveCity(c);
        loadTimetable(c, fiqh);
      }
    },
    [loadTimetable, fiqh]
  );

  const changeFiqh = useCallback(
    (newFiqh: Fiqh) => {
      setFiqh(newFiqh);
      saveFiqh(newFiqh);
      loadTimetable(city, newFiqh);
    },
    [loadTimetable, city]
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
    fiqh,
    timetable,
    detecting: false,
    todayTiming,
    changeCity,
    changeFiqh,
    cities: CITY_NAMES,
  };
}
