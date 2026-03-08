import { motion } from 'framer-motion';
import { Clock, Sun, Star } from 'lucide-react';

interface CountdownTimerProps {
  secondsLeft: number;
  countdownType: 'SEHRI' | 'IFTAR';
}

export default function CountdownTimer({ secondsLeft, countdownType }: CountdownTimerProps) {
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  const isSehri = countdownType === 'SEHRI';
  const label = isSehri ? 'Time Until SEHRI' : 'Time Until IFTAR';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="gold-bracket-card corner-brackets-bottom p-6 md:p-8 text-center"
    >
      {/* Title */}
      <div className="minecraft-text text-mc-small md:text-xs text-accent chaos-text mb-2">
        🌙 RAMADAN 2026 🌙
      </div>
      <div className="minecraft-text text-mc-small md:text-xs text-muted-foreground mb-6">
        {label}
      </div>

      {/* Boxed countdown digits */}
      <div className="flex items-center justify-center gap-3 md:gap-4">
        <TimeBox value={pad(hours)} label="HOURS" icon={<Clock className="w-3 h-3 text-muted-foreground" />} />
        <TimeBox value={pad(minutes)} label="MINUTES" icon={<Sun className="w-3 h-3 text-muted-foreground" />} />
        <TimeBox value={pad(seconds)} label="SECONDS" icon={<Star className="w-3 h-3 text-muted-foreground" />} />
      </div>

      {/* Progress bar */}
      <motion.div
        className="mt-6 h-1.5 rounded-full overflow-hidden"
        style={{ background: 'hsla(var(--mc-dark-green), 0.5)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, hsl(var(--mc-green)), hsl(var(--gold)))`,
          }}
          animate={{
            width: secondsLeft <= 0 ? '100%' : `${Math.max(5, 100 - (secondsLeft / 86400) * 100)}%`,
          }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </motion.div>
  );
}

function TimeBox({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="countdown-box flex flex-col items-center">
        <div className="mb-1">{icon}</div>
        <span className="countdown-digit">{value}</span>
      </div>
      <span className="minecraft-text text-mc-pixel text-muted-foreground">{label}</span>
    </div>
  );
}
