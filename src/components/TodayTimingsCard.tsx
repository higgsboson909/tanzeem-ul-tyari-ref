import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import type { DayTiming } from '@/lib/prayerTimes';

interface TodayTimingsCardProps {
  timing: DayTiming | null;
  cityName: string;
}

function formatTimeAMPM(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
}

export default function TodayTimingsCard({ timing, cityName }: TodayTimingsCardProps) {
  if (!timing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="minecraft-border p-6 text-center"
      >
        <p className="minecraft-text text-mc-small text-muted-foreground">
          ⏳ Ramadan 2026 starts Feb 19
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="minecraft-border p-6 md:p-8"
    >
      <div className="minecraft-text text-[10px] text-muted-foreground text-center mb-6">
        📅 TODAY&apos;S TIMINGS — {cityName.toUpperCase()}
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8">
        {/* Sehri */}
        <motion.div
          className="islamic-border p-4 md:p-6 text-center card-hover"
          whileHover={{ scale: 1.03 }}
        >
          <Moon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3 text-accent" />
          <div className="minecraft-text text-[9px] text-muted-foreground mb-2">SEHRI ENDS</div>
          <div className="gradient-text minecraft-text text-sm md:text-lg">
            {formatTimeAMPM(timing.sehri)}
          </div>
        </motion.div>

        {/* Iftar */}
        <motion.div
          className="islamic-border p-4 md:p-6 text-center card-hover"
          whileHover={{ scale: 1.03 }}
        >
          <Sun className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3 text-accent" />
          <div className="minecraft-text text-[9px] text-muted-foreground mb-2">IFTAR TIME</div>
          <div className="gradient-text minecraft-text text-sm md:text-lg">
            {formatTimeAMPM(timing.iftar)}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
