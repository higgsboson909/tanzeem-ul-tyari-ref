import { motion } from 'framer-motion';

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
  const label = isSehri ? '🌙 SEHRI IN' : '🌅 IFTAR IN';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="minecraft-border p-6 md:p-8 text-center"
    >
      <div className="minecraft-text text-mc-small md:text-xs text-muted-foreground mb-4">
        {label}
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-4">
        <TimeUnit value={pad(hours)} label="HRS" />
        <span className="countdown-digit">:</span>
        <TimeUnit value={pad(minutes)} label="MIN" />
        <span className="countdown-digit">:</span>
        <TimeUnit value={pad(seconds)} label="SEC" />
      </div>

      <motion.div
        className="mt-4 h-1 rounded-full overflow-hidden"
        style={{ background: 'hsla(var(--mc-dark-green), 0.5)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, hsl(var(--mc-green)), hsl(var(--accent)))`,
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

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="countdown-digit">{value}</span>
      <span className="minecraft-text text-mc-pixel text-muted-foreground mt-1">{label}</span>
    </div>
  );
}
