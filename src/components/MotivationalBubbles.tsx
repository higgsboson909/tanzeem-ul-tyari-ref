import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMessageBracket, getBubbleInterval, sehriMessages, iftarMessages } from '@/data/ramadanMessages';

interface FloatingBubble {
  id: number;
  message: string;
  side: 'left' | 'right';
  y: number; // random vertical offset %
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
  isSehriActive,
  isIftarActive,
}: MotivationalBubblesProps) {
  const [bubbles, setBubbles] = useState<FloatingBubble[]>([]);
  const lastSide = useRef<'left' | 'right'>('right');

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
    // Alternate sides
    const side: 'left' | 'right' = lastSide.current === 'left' ? 'right' : 'left';
    lastSide.current = side;

    const newBubble: FloatingBubble = {
      id: ++bubbleId,
      message,
      side,
      y: Math.random() * 30 + 55, // 55%–85% from top (bottom half)
    };

    setBubbles((prev) => [...prev.slice(-3), newBubble]);
  }, [totalMinutesLeft, isSehriActive, isIftarActive]);

  const removeBubble = useCallback((id: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => spawnBubble(), 1500);
    const interval = getBubbleInterval(totalMinutesLeft);
    const timer = setInterval(spawnBubble, interval);
    return () => { clearTimeout(t); clearInterval(timer); };
  }, [spawnBubble, totalMinutesLeft]);

  // Auto-dismiss each bubble after 6s
  useEffect(() => {
    if (bubbles.length === 0) return;
    const latest = bubbles[bubbles.length - 1];
    const timer = setTimeout(() => removeBubble(latest.id), 6000);
    return () => clearTimeout(timer);
  }, [bubbles, removeBubble]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {bubbles.map((bubble) => {
          const isLeft = bubble.side === 'left';
          return (
            <motion.div
              key={bubble.id}
              initial={{
                opacity: 0,
                x: isLeft ? -120 : 120,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                y: [0, -8, 0, -4, 0], // subtle bounce
              }}
              exit={{
                opacity: 0,
                x: isLeft ? -80 : 80,
                scale: 0.6,
              }}
              transition={{
                opacity: { duration: 0.4 },
                x: { type: 'spring', stiffness: 200, damping: 18 },
                scale: { type: 'spring', stiffness: 200, damping: 18 },
                y: { duration: 2, ease: 'easeInOut', repeat: Infinity },
              }}
              className="absolute max-w-[240px] sm:max-w-[280px] pointer-events-auto"
              style={{
                top: `${bubble.y}%`,
                ...(isLeft ? { left: '0.75rem' } : { right: '0.75rem' }),
              }}
            >
              <div
                className={`minecraft-border px-4 py-3 relative ${
                  isLeft ? 'rounded-tr-lg rounded-br-lg' : 'rounded-tl-lg rounded-bl-lg'
                }`}
                style={{ background: 'hsla(0,0%,5%,0.95)' }}
              >
                <button
                  onClick={() => removeBubble(bubble.id)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent/80 text-accent-foreground flex items-center justify-center text-xs hover:bg-accent transition-colors"
                  aria-label="Dismiss"
                >
                  ✕
                </button>
                <p className="minecraft-text text-mc-small text-accent leading-relaxed drop-shadow-[0_0_6px_hsla(var(--gold),0.5)]">
                  {bubble.message}
                </p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
