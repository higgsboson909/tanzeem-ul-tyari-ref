import { motion } from 'framer-motion';
import { getDailyDua } from '@/data/dailyDuas';

interface DailyDuaCardProps {
  rozaNumber: number;
}

export default function DailyDuaCard({ rozaNumber }: DailyDuaCardProps) {
  const { dua, reference } = getDailyDua(rozaNumber);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="islamic-border p-5 md:p-6 text-center space-y-3 animate-border-pulse relative overflow-hidden shine"
    >
      <div className="minecraft-text text-mc-pixel text-muted-foreground tracking-wider">
        🤲 DUA OF THE DAY — ROZA #{rozaNumber}
      </div>
      <p className="islamic-text text-base md:text-lg text-foreground leading-relaxed">
        {dua}
      </p>
    </motion.div>
  );
}
