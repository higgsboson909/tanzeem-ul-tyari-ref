import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import type { CityName } from '@/data/pakistanCities';
import type { Fiqh } from '@/lib/prayerTimes';

interface CitySelectorProps {
  currentCity: CityName;
  cities: readonly CityName[];
  onCityChange: (cityName: string) => void;
  currentFiqh: Fiqh;
  onFiqhChange: (fiqh: Fiqh) => void;
  detecting: boolean;
}

export default function CitySelector({
  currentCity,
  cities,
  onCityChange,
  currentFiqh,
  onFiqhChange,
  detecting,
}: CitySelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 flex-wrap justify-center"
    >
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-accent" />
        <span className="minecraft-text text-mc-small text-muted-foreground">
          {detecting ? 'DETECTING...' : 'YOUR CITY:'}
        </span>
      </div>

      <div className="relative">
        <select
          value={currentCity}
          onChange={(e) => onCityChange(e.target.value)}
          disabled={detecting}
          className="appearance-none minecraft-border px-4 py-2 pr-8 text-foreground text-mc-small minecraft-text cursor-pointer
            bg-card border-border focus:outline-none focus:border-primary
            disabled:opacity-50 min-w-[160px]"
        >
          {cities.map((c) => (
            <option key={c} value={c} className="bg-card text-foreground">
              {c}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-accent pointer-events-none" />
      </div>

      {/* Detect location button */}
      {onDetectLocation && (
        <button
          onClick={onDetectLocation}
          disabled={detecting}
          className="minecraft-border px-3 py-2 bg-card border-border text-accent hover:text-primary transition-colors disabled:opacity-50 flex items-center gap-1"
          title="Detect my location"
        >
          <Locate className={`w-4 h-4 ${detecting ? 'animate-spin' : ''}`} />
          <span className="minecraft-text text-mc-small hidden sm:inline">DETECT</span>
        </button>
      )}

      {/* Polished Fiqh Toggle with sliding indicator */}
      <div className="relative flex items-center minecraft-border overflow-hidden">
        <motion.div
          className="absolute top-0 bottom-0 w-1/2 bg-primary"
          animate={{ x: currentFiqh === 'hanafi' ? 0 : '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        />
        <button
          onClick={() => onFiqhChange('hanafi')}
          className={`relative z-10 minecraft-text text-mc-small px-4 py-2 transition-colors duration-200 ${
            currentFiqh === 'hanafi'
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          HANAFI
        </button>
        <button
          onClick={() => onFiqhChange('jafri')}
          className={`relative z-10 minecraft-text text-mc-small px-4 py-2 transition-colors duration-200 ${
            currentFiqh === 'jafri'
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          JAFRI
        </button>
      </div>
    </motion.div>
  );
}
