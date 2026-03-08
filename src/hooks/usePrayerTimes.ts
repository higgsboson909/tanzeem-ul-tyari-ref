import { useState, useEffect, useCallback } from 'react';
import { CITY_NAMES, DEFAULT_CITY, findNearestCity, type CityName } from '@/data/pakistanCities';
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
  const [detecting, setDetecting] = useState(false);

  const loadTimetable = useCallback((cityName: CityName, f: Fiqh) => {
    const tt = getRamadanTimetable(cityName, f);
    setTimetable(tt);
    return tt;
  }, []);

  const applyCity = useCallback((c: CityName, f: Fiqh) => {
    setCity(c);
    saveCity(c);
    loadTimetable(c, f);
  }, [loadTimetable]);

  // Load on mount — try geolocation if no saved city
  useEffect(() => {
    const savedCityName = getSavedCity();
    const savedFiqh = getSavedFiqh();

    if (savedCityName && CITY_NAMES.includes(savedCityName as CityName)) {
      const c = savedCityName as CityName;
      setCity(c);
      setFiqh(savedFiqh);
      loadTimetable(c, savedFiqh);
    } else {
      // Try geolocation
      loadTimetable(DEFAULT_CITY, savedFiqh);
      if ('geolocation' in navigator) {
        setDetecting(true);
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const nearest = findNearestCity(pos.coords.latitude, pos.coords.longitude);
            applyCity(nearest, savedFiqh);
            setDetecting(false);
          },
          () => {
            setDetecting(false);
          },
          { timeout: 5000 }
        );
      }
    }
  }, [loadTimetable, applyCity]);

  const changeCity = useCallback(
    (cityName: string) => {
      if (CITY_NAMES.includes(cityName as CityName)) {
        applyCity(cityName as CityName, fiqh);
      }
    },
    [applyCity, fiqh]
  );

  const changeFiqh = useCallback(
    (newFiqh: Fiqh) => {
      setFiqh(newFiqh);
      saveFiqh(newFiqh);
      loadTimetable(city, newFiqh);
    },
    [loadTimetable, city]
  );

  const detectLocation = useCallback(() => {
    if (!('geolocation' in navigator)) return;
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = findNearestCity(pos.coords.latitude, pos.coords.longitude);
        applyCity(nearest, fiqh);
        setDetecting(false);
      },
      () => setDetecting(false),
      { timeout: 5000 }
    );
  }, [applyCity, fiqh]);

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
    detecting,
    todayTiming,
    changeCity,
    changeFiqh,
    detectLocation,
    cities: CITY_NAMES,
  };
}
