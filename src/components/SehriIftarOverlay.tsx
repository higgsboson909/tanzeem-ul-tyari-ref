import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Coffee, Utensils, Star } from 'lucide-react';
import { sehriMessages, iftarMessages } from '@/data/ramadanMessages';

interface SehriIftarOverlayProps {
  type: 'sehri' | 'iftar';
  onDismiss: () => void;
}

export default function SehriIftarOverlay({ type, onDismiss }: SehriIftarOverlayProps) {
  const messages = type === 'sehri' ? sehriMessages : iftarMessages;
  const [currentMsgIdx, setCurrentMsgIdx] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMsgIdx((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        size: Math.random() * 8 + 4,
      }))
    );
  }, []);

  const isSehri = type === 'sehri';
  const title = isSehri ? 'SUHOOR TIME' : 'IFTAR TIME';
  const subtitle = isSehri
    ? 'Dawn is here — fuel up for the day!'
    : 'The wait is over — break your fast!';
  const Icon = isSehri ? Coffee : Utensils;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{
          background: isSehri
            ? 'radial-gradient(ellipse at center, hsla(220,60%,10%,0.95), hsla(220,80%,5%,0.98))'
            : 'radial-gradient(ellipse at center, hsla(30,60%,10%,0.95), hsla(0,0%,5%,0.98))',
        }}
      >
        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: `${p.x}%`, bottom: '-10%' }}
            animate={{ y: [0, -800], opacity: [0, 1, 0] }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: p.delay,
            }}
          >
            {isSehri ? (
              <Moon
                className="text-accent"
                style={{ width: p.size, height: p.size, opacity: 0.6 }}
              />
            ) : (
              <Star
                className="text-accent"
                style={{ width: p.size, height: p.size, opacity: 0.6 }}
              />
            )}
          </motion.div>
        ))}

        {/* Main Content */}
        <motion.div
          initial={{ scale: 0.8, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className="text-center px-6 max-w-lg relative z-10"
        >
          {/* Icon */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-6"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full flex items-center justify-center islamic-border">
              <Icon className="w-10 h-10 md:w-12 md:h-12 text-accent" />
            </div>
          </motion.div>

          {/* Stars */}
          <div className="flex justify-center gap-3 mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <Star className="w-4 h-4 text-accent" />
              </motion.div>
            ))}
          </div>

          {/* Title */}
          <motion.h1
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="minecraft-text text-xl md:text-3xl gradient-text mb-3"
          >
            {title}
          </motion.h1>

          <p className="islamic-text text-lg md:text-xl text-foreground mb-6">
            {subtitle}
          </p>

          {/* Rotating messages */}
          <div className="h-16 flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMsgIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="minecraft-text text-mc-small md:text-xs text-muted-foreground"
              >
                {messages[currentMsgIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Dismiss button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDismiss}
            className="minecraft-button text-[10px] md:text-xs"
          >
            ✕ DISMISS
          </motion.button>
        </motion.div>

        {/* Sun/Moon in background */}
        <motion.div
          className="absolute top-10 right-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {isSehri ? (
            <Moon className="w-16 h-16 text-accent opacity-20" />
          ) : (
            <Sun className="w-16 h-16 text-accent opacity-20" />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
