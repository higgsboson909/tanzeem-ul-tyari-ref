import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, AlertTriangle, Flame } from 'lucide-react';

const questionableFoods = [
  { name: "Mystery Qeema", rating: "10/10 Chaos", desc: "No one knows what's in it, but everyone survived" },
  { name: "3 AM Instant Noodles", rating: "Desperation Level: Maximum", desc: "Cooked in the bathroom sink" },
  { name: "Cold Pizza from Yesterday", rating: "Still Better Than Nothing", desc: "Found behind the textbooks" },
  { name: "Expired Energy Drinks", rating: "Liquid Courage", desc: "Best before: Who cares?" },
  { name: "The Legendary Bathroom Qeema", rating: "ICONIC", desc: "You had to be there" },
  { name: "Samosas at 4 AM", rating: "Peak Panic Fuel", desc: "Cold but effective" },
];

export default function QeemaHangoutPage() {
  const [qeemaCount, setQeemaCount] = useState(42);
  const [easterEggActivated, setEasterEggActivated] = useState(false);

  const incrementQeema = () => {
    setQeemaCount(prev => prev + 1);
  };

  const triggerEasterEgg = () => {
    setEasterEggActivated(true);
    setTimeout(() => setEasterEggActivated(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8 space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring' }}
        className="minecraft-border p-6 md:p-8 text-center relative"
      >
        <Flame size={48} className="mx-auto mb-4 text-accent animate-pulse" />
        <h1 className="minecraft-text text-sm md:text-lg gradient-text mb-2">
          OPEN BATHROOM QEEMA HANGOUT
        </h1>
        <motion.p
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="minecraft-text text-mc-small text-muted-foreground"
        >
          Peak Chaotic Energy Zone
        </motion.p>

        {/* Easter Egg Trigger */}
        <motion.div
          onClick={triggerEasterEgg}
          whileHover={{ scale: 2 }}
          className="absolute bottom-2 right-2 w-3 h-3 bg-accent cursor-pointer"
          title="Click me!"
        />
      </motion.div>

      {/* Easter Egg Activation */}
      <AnimatePresence>
        {easterEggActivated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <AlertTriangle size={96} className="mx-auto mb-6 text-destructive" />
                <h2 className="minecraft-text text-lg md:text-xl gradient-text mb-4">
                  PANIC MODE ACTIVATED
                </h2>
              </motion.div>
              <p className="minecraft-text text-mc-small md:text-xs text-foreground mt-4">UNITED BY PANIC!</p>
              <motion.p
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="minecraft-text text-mc-pixel text-muted-foreground mt-2"
              >
                *Chaotic screaming sounds*
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Qeema Counter */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="minecraft-border p-6 md:p-8 text-center"
      >
        <h2 className="minecraft-text text-mc-small md:text-xs mb-4 text-accent flex items-center justify-center gap-2">
          <Sparkles size={16} /> QEEMA COUNTER <Sparkles size={16} />
        </h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="minecraft-border p-6 md:p-8 inline-block"
        >
          <motion.div
            key={qeemaCount}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="minecraft-text text-xl md:text-3xl gradient-text mb-2"
          >
            {qeemaCount}
          </motion.div>
          <p className="minecraft-text text-mc-tiny text-muted-foreground">Questionable meals consumed</p>
        </motion.div>
        <div className="mt-6">
          <motion.button
            onClick={incrementQeema}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="minecraft-button text-mc-pixel md:text-mc-small py-3 px-6 inline-flex items-center gap-2"
          >
            <Plus size={16} /> ADD ANOTHER QUESTIONABLE MEAL
          </motion.button>
        </div>
      </motion.div>

      {/* The Legend */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="minecraft-border p-6 md:p-8"
      >
        <h2 className="minecraft-text text-mc-small md:text-xs text-center mb-4 text-accent">THE LEGEND</h2>
        <div className="minecraft-border p-4 md:p-6 space-y-3">
          <p className="minecraft-text text-mc-pixel md:text-mc-small text-foreground">
            In the darkest hours of the 5th semester finals, when hope was lost and sanity was a distant memory...
          </p>
          <p className="minecraft-text text-mc-tiny md:text-mc-pixel text-muted-foreground">
            Five brave souls gathered in the most unlikely of places: The Open Bathroom.
          </p>
          <p className="minecraft-text text-mc-tiny md:text-mc-pixel text-muted-foreground">
            Armed with nothing but determination, instant noodles, and a suspicious batch of qeema...
          </p>
          <motion.p
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="minecraft-text text-mc-pixel md:text-mc-small text-accent"
          >
            They survived. Together. United by Panic.
          </motion.p>
        </div>
      </motion.div>

      {/* Hall of Fame */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="minecraft-border p-6 md:p-8"
      >
        <h2 className="minecraft-text text-mc-small md:text-xs text-center mb-2 text-accent">HALL OF FAME</h2>
        <p className="minecraft-text text-mc-tiny text-muted-foreground text-center mb-6">
          A tribute to the meals that fueled our chaos
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {questionableFoods.map((food, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="minecraft-border p-4 md:p-6 card-hover text-center group"
            >
              <motion.div
                className="text-3xl md:text-4xl mb-3"
                animate={{ rotate: idx === 4 ? [0, 10, -10, 0] : 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {idx === 4 ? '👑' : '🍽️'}
              </motion.div>
              <h3 className="minecraft-text text-mc-pixel md:text-mc-pixel-md text-accent mb-1">{food.name}</h3>
              <p className="minecraft-text text-mc-tiny text-muted-foreground italic mb-1">{food.rating}</p>
              <p className="minecraft-text text-mc-micro text-muted-foreground">{food.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Memorable Quotes */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="minecraft-border p-6 md:p-8"
      >
        <h2 className="minecraft-text text-mc-small md:text-xs text-center mb-4 text-accent">MEMORABLE QUOTES</h2>
        <div className="space-y-3">
          {[
            { quote: "Is this qeema or are we just hallucinating from sleep deprivation?", author: "Anonymous Member" },
            { quote: "The bathroom has better acoustics for our panic screams.", author: "The Big Dawg" },
            { quote: "I've calculated the probability of passing. It's... not good.", author: "The Genius" },
            { quote: "This is fine. Everything is fine. Nothing is fine.", author: "Kowalski" },
          ].map((quote, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="minecraft-border p-4"
            >
              <p className="minecraft-text text-mc-tiny md:text-mc-pixel text-muted-foreground italic">"{quote.quote}"</p>
              <p className="minecraft-text text-mc-micro text-accent text-right mt-2">— {quote.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
