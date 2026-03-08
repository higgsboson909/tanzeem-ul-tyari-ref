import { motion } from 'framer-motion';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { useRamadanState } from '@/hooks/useRamadanState';
import CitySelector from '@/components/CitySelector';
import CountdownTimer from '@/components/CountdownTimer';
import TodayTimingsCard from '@/components/TodayTimingsCard';
import RamadanCalendar from '@/components/RamadanCalendar';
import BigCountdownOverlay from '@/components/BigCountdownOverlay';
import SehriIftarOverlay from '@/components/SehriIftarOverlay';
import DailyDuaCard from '@/components/DailyDuaCard';
import { useState } from 'react';

export default function RamadanPage() {
  const {
    city,
    fiqh,
    timetable,
    detecting,
    todayTiming,
    changeCity,
    changeFiqh,
    cities,
  } = usePrayerTimes();

  const {
    countdown,
    isSehriActive,
    isIftarActive,
  } = useRamadanState(todayTiming);

  const [overlayDismissed, setOverlayDismissed] = useState<string | null>(null);

  const todayDate = todayTiming?.date ?? '';
  const sehriKey = `${todayDate}-sehri`;
  const iftarKey = `${todayDate}-iftar`;

  let showOverlay: 'sehri' | 'iftar' | null = null;
  if (isSehriActive && overlayDismissed !== sehriKey) showOverlay = 'sehri';
  if (isIftarActive && overlayDismissed !== iftarKey) showOverlay = 'iftar';

  const dismissOverlay = () => {
    if (isSehriActive) setOverlayDismissed(sehriKey);
    if (isIftarActive) setOverlayDismissed(iftarKey);
  };

  const secondsLeft = countdown.hours * 3600 + countdown.minutes * 60 + countdown.seconds;
  const countdownType = countdown.type === 'IFTAR' ? 'IFTAR' as const : 'SEHRI' as const;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <BigCountdownOverlay seconds={secondsLeft} type={countdownType} />

      {showOverlay && (
        <SehriIftarOverlay type={showOverlay} onDismiss={dismissOverlay} />
      )}

      {/* Daily Dua */}
      {todayTiming && <DailyDuaCard rozaNumber={todayTiming.day} />}

      {/* City Selector */}
      <CitySelector
        currentCity={city}
        cities={cities}
        onCityChange={changeCity}
        currentFiqh={fiqh}
        onFiqhChange={changeFiqh}
        detecting={detecting}
      />
      {/* Countdown */}
      <CountdownTimer secondsLeft={secondsLeft} countdownType={countdownType} />

      {/* Today's Timings */}
      <TodayTimingsCard timing={todayTiming} cityName={city} />

      {/* Full Calendar */}
      <RamadanCalendar timetable={timetable} />

    </div>
  );
}
