import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';
import type { CityData } from '@/data/pakistanCities';

interface CitySelectorProps {
  currentCity: CityData;
  cities: CityData[];
  onCityChange: (cityName: string) => void;
  detecting: boolean;
}

export default function CitySelector({
  currentCity,
  cities,
  onCityChange,
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
        <span className="minecraft-text text-[10px] text-muted-foreground">
          {detecting ? 'DETECTING...' : 'YOUR CITY:'}
        </span>
      </div>

      <div className="relative">
        <select
          value={currentCity.name}
          onChange={(e) => onCityChange(e.target.value)}
          disabled={detecting}
          className="appearance-none minecraft-border px-4 py-2 pr-8 text-foreground text-[10px] minecraft-text cursor-pointer
            bg-card border-border focus:outline-none focus:border-primary
            disabled:opacity-50 min-w-[160px]"
        >
          {cities.map((c) => (
            <option key={c.name} value={c.name} className="bg-card text-foreground">
              {c.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-accent pointer-events-none" />
      </div>
    </motion.div>
  );
}
