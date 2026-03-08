import { motion } from 'framer-motion';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import CitySelector from '@/components/CitySelector';
import CountdownTimer from '@/components/CountdownTimer';
import TodayTimingsCard from '@/components/TodayTimingsCard';
import RamadanCalendar from '@/components/RamadanCalendar';
import SehriIftarOverlay from '@/components/SehriIftarOverlay';

export default function HomePage() {
  const {
    city,
    timetable,
    detecting,
    countdownType,
    secondsLeft,
    todayTiming,
    changeCity,
    cities,
    showOverlay,
    dismissOverlay,
  } = usePrayerTimes();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Celebration Overlay */}
      {showOverlay && (
        <SehriIftarOverlay type={showOverlay} onDismiss={dismissOverlay} />
      )}

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <img
          src="/logo.png"
          alt="Tanzeem-ul-Tyari"
          className="w-24 h-24 md:w-32 md:h-32 mx-auto logo-glow animate-float"
        />
        <h1 className="minecraft-text text-sm md:text-xl gradient-text">
          TANZEEM-UL-TYARI
        </h1>
        <p className="islamic-text text-lg md:text-2xl text-accent">
          United by Panic
        </p>
        <p className="minecraft-text text-[8px] text-muted-foreground">
          RAMADAN 2026 · FINAL EXAMS PREPARATION PORTAL
        </p>
      </motion.div>

      {/* City Selector */}
      <CitySelector
        currentCity={city}
        cities={cities}
        onCityChange={changeCity}
        detecting={detecting}
      />

      {/* Countdown */}
      <CountdownTimer secondsLeft={secondsLeft} countdownType={countdownType} />

      {/* Today's Timings */}
      <TodayTimingsCard timing={todayTiming} cityName={city.name} />

      {/* Full Calendar */}
      <RamadanCalendar timetable={timetable} />

      {/* Motivational section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="islamic-border p-6 text-center"
      >
        <p className="islamic-text text-lg md:text-xl text-accent mb-2">
          ﷽
        </p>
        <p className="islamic-text text-sm md:text-base text-foreground">
          "O you who believe, fasting is prescribed for you as it was prescribed for those before you, that you may become righteous."
        </p>
        <p className="minecraft-text text-[8px] text-muted-foreground mt-3">
          — Surah Al-Baqarah 2:183
        </p>
      </motion.div>
    </div>
  );
}
