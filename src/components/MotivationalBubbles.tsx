import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMessageBracket, getBubbleInterval, sehriMessages, iftarMessages } from '@/data/ramadanMessages';

interface FloatingBubble {
  id: number;
  message: string;
  x: number; // percentage from left
  side: 'left' | 'right';
}

interface MotivationalBubblesProps {
  totalMinutesLeft: number;
  countdownType: 'SEHRI' | 'IFTAR';
  isSehriActive: boolean;
  isIftarActive: boolean;
}

let bubbleId = 0;

export default function MotivationalBubbles({
  totalMinutesLeft,
  countdownType,
  isSehriActive,
  isIftarActive,
}: MotivationalBubblesProps) {
  const [bubbles, setBubbles] = useState<FloatingBubble[]>([]);

  const spawnBubble = useCallback(() => {
    let pool: string[];

    if (isSehriActive) {
      pool = sehriMessages;
    } else if (isIftarActive) {
      pool = iftarMessages;
    } else {
      pool = getMessageBracket(totalMinutesLeft);
    }

    const message = pool[Math.floor(Math.random() * pool.length)];
    const side = Math.random() > 0.5 ? 'right' : 'left';
    const x = side === 'left' ? Math.random() * 30 + 2 : Math.random() * 30 + 68;

    const newBubble: FloatingBubble = {
      id: ++bubbleId,
      message,
      x,
      side,
    };

    setBubbles((prev) => [...prev.slice(-4), newBubble]); // keep max 5
  }, [totalMinutesLeft, isSehriActive, isIftarActive]);

  // Remove bubble after animation
  const removeBubble = useCallback((id: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  }, []);

  useEffect(() => {
    // Spawn one immediately
    spawnBubble();

    const interval = getBubbleInterval(totalMinutesLeft);
    const timer = setInterval(spawnBubble, interval);
    return () => clearInterval(timer);
  }, [spawnBubble, totalMinutesLeft]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.7 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setTimeout(() => removeBubble(bubble.id), 5000);
            }}
            className="absolute bottom-24 max-w-[280px] sm:max-w-xs"
            style={{ left: `${bubble.x}%` }}
          >
            <div className="minecraft-border px-3 py-2 text-center">
              <p className="minecraft-text text-mc-pixel text-foreground leading-relaxed">
                {bubble.message}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
