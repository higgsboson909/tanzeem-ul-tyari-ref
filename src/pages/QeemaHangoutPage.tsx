import { motion } from 'framer-motion';
import { Utensils, MapPin, Clock } from 'lucide-react';

const hangouts = [
  { place: "Bundu Khan", location: "Main Boulevard", rating: "⭐⭐⭐⭐⭐", specialty: "Qeema Naan" },
  { place: "Butt Karahi", location: "Lakshmi Chowk", rating: "⭐⭐⭐⭐", specialty: "Special Qeema" },
  { place: "Haveli", location: "Food Street", rating: "⭐⭐⭐⭐", specialty: "Qeema Paratha" },
  { place: "Andaaz", location: "MM Alam Road", rating: "⭐⭐⭐⭐⭐", specialty: "Desi Qeema" },
];

export default function QeemaHangoutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Utensils className="w-12 h-12 mx-auto mb-4 text-accent" />
        <h1 className="minecraft-text text-sm md:text-lg gradient-text mb-2">
          🍖 QEEMA HANGOUT SPOTS
        </h1>
        <p className="minecraft-text text-mc-pixel text-muted-foreground">
          BEST POST-EXAM QEEMA DESTINATIONS
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hangouts.map((spot, i) => (
          <motion.div
            key={spot.place}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="minecraft-border p-5 card-hover"
          >
            <div className="minecraft-text text-mc-small text-foreground mb-2">{spot.place}</div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-3 h-3 text-accent" />
              <span className="minecraft-text text-mc-pixel text-muted-foreground">{spot.location}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-3 h-3 text-primary" />
              <span className="minecraft-text text-mc-pixel text-muted-foreground">{spot.specialty}</span>
            </div>
            <div className="text-sm">{spot.rating}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
