import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Send, Quote } from 'lucide-react';

const philosophicalQuotes = [
  "The proletariat must rise against the oppression of... wait, what were we talking about? Oh yes, exams.",
  "In the dialectical materialism of academic struggle, the thesis is panic, the antithesis is more panic, and the synthesis is somehow passing.",
  "To quote Marx: 'The philosophers have only interpreted the syllabus; the point is to somehow memorize it.'",
  "Chai is the opiate of the stressed masses.",
  "From each according to their ability to cram, to each according to their caffeine needs.",
  "The history of all hitherto existing society is the history of class struggles... and semester finals.",
  "Workers of the world, unite! You have nothing to lose but your GPAs.",
  "I think, therefore I'm panicking about exams.",
  "The only thing we have to fear is fear itself... and the 5th semester finals.",
  "Cogito ergo sum caffeinated.",
  "In the grand tapestry of academic despair, we are but threads of controlled chaos.",
  "The bourgeoisie may have capital, but we have the capital letters of PANIC.",
  "One does not simply walk into the exam hall unprepared. But we did. Five times.",
  "The revolution will not be televised, but our panic attacks will be legendary.",
];

export default function ChaiLeaderPage() {
  const [currentQuote, setCurrentQuote] = useState("Click the chai tap to hear wisdom from the Leader!");
  const [bookingStatus, setBookingStatus] = useState("");
  const [chaiCount, setChaiCount] = useState(0);

  const tapChai = () => {
    const randomQuote = philosophicalQuotes[Math.floor(Math.random() * philosophicalQuotes.length)];
    setCurrentQuote(randomQuote);
    setChaiCount(prev => prev + 1);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus("Application processed... Leader is busy contemplating the proletariat. Please check back in 2-3 revolutionary cycles.");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring' }}
        className="text-center mb-8 minecraft-border p-6 md:p-8 glow"
      >
        <Coffee size={48} className="mx-auto mb-4 text-accent animate-pulse" />
        <h1 className="minecraft-text text-sm md:text-lg mb-4 gradient-text">
          ☕ CHAI WITH THE LEADER ☕
        </h1>
        <p className="minecraft-text text-mc-pixel md:text-mc-small text-muted-foreground">
          Ghulam Mustafa: Socialist Marxist Philosopher
        </p>
      </motion.div>

      {/* Chai Tap Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="minecraft-border p-6 md:p-8 mb-8"
      >
        <div className="text-center mb-6">
          <h2 className="minecraft-text text-xs md:text-sm mb-4 text-mc-light-green">
            VIRTUAL CHAI TAP
          </h2>
          <motion.p
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="minecraft-text text-mc-pixel text-accent mb-4"
          >
            Tap count: {chaiCount}
          </motion.p>
          <motion.button
            onClick={tapChai}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="minecraft-border px-8 py-4 card-hover minecraft-text text-mc-small md:text-xs flex items-center gap-3 mx-auto text-accent hover:border-accent transition-colors"
          >
            <Coffee size={24} /> TAP FOR CHAI <Coffee size={24} />
          </motion.button>
        </div>

        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="minecraft-border p-4 md:p-6 mt-6 bg-primary/20"
        >
          <Quote className="text-accent mb-2" size={24} />
          <p className="minecraft-text text-mc-pixel md:text-mc-small text-foreground text-center leading-relaxed">
            "{currentQuote}"
          </p>
          <p className="minecraft-text text-mc-pixel text-mc-light-green text-right mt-4">
            - The Leader
          </p>
        </motion.div>
      </motion.div>

      {/* Booking Form */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="minecraft-border p-6 md:p-8"
      >
        <h2 className="minecraft-text text-xs md:text-sm text-center mb-6 text-mc-light-green flex items-center justify-center gap-3">
          <Send size={16} /> BOOK A CHAI SESSION
        </h2>
        <form onSubmit={handleBooking} className="max-w-md mx-auto space-y-4">
          <div>
            <label className="minecraft-text text-mc-pixel text-accent block mb-2">Your Name:</label>
            <input
              type="text"
              required
              className="w-full p-3 minecraft-border bg-background text-foreground minecraft-text text-mc-pixel placeholder:text-muted-foreground focus:border-accent outline-none transition-colors"
              placeholder="Enter your name..."
            />
          </div>

          <div>
            <label className="minecraft-text text-mc-pixel text-accent block mb-2">Preferred Topic:</label>
            <select
              required
              className="w-full p-3 minecraft-border bg-background text-foreground minecraft-text text-mc-pixel outline-none focus:border-accent transition-colors"
            >
              <option>Marxist Theory</option>
              <option>Exam Survival Strategies</option>
              <option>The Philosophy of Panic</option>
              <option>Chai Brewing Techniques</option>
              <option>Revolutionary Academic Practices</option>
            </select>
          </div>

          <div>
            <label className="minecraft-text text-mc-pixel text-accent block mb-2">Preferred Date:</label>
            <input
              type="date"
              required
              className="w-full p-3 minecraft-border bg-background text-foreground minecraft-text text-mc-pixel outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label className="minecraft-text text-mc-pixel text-accent block mb-2">Why do you want chai with the Leader?</label>
            <textarea
              required
              rows={4}
              className="w-full p-3 minecraft-border bg-background text-foreground minecraft-text text-mc-pixel placeholder:text-muted-foreground outline-none focus:border-accent transition-colors"
              placeholder="Describe your reasons..."
            ></textarea>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="minecraft-border w-full py-4 minecraft-text text-mc-pixel md:text-mc-small text-accent card-hover flex items-center justify-center gap-2 hover:border-accent transition-colors"
          >
            <Send size={16} /> SUBMIT REQUEST
          </motion.button>
        </form>

        {bookingStatus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="minecraft-border bg-primary/20 p-4 mt-6 text-center"
          >
            <p className="minecraft-text text-mc-pixel md:text-mc-small text-foreground">{bookingStatus}</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
