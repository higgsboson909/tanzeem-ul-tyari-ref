import { motion } from 'framer-motion';
import { Coffee, Trophy, Star } from 'lucide-react';

const chaiLeaders = [
  { name: "Ahmad", cups: 47, rank: 1, title: "Chai Master" },
  { name: "Bilal", cups: 42, rank: 2, title: "Tea Titan" },
  { name: "Fatima", cups: 38, rank: 3, title: "Chai Champion" },
  { name: "Hassan", cups: 35, rank: 4, title: "Brew Boss" },
  { name: "Zainab", cups: 31, rank: 5, title: "Sip Sensei" },
];

export default function ChaiLeaderPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Coffee className="w-12 h-12 mx-auto mb-4 text-accent" />
        <h1 className="minecraft-text text-sm md:text-lg gradient-text mb-2">
          ☕ CHAI LEADERBOARD
        </h1>
        <p className="minecraft-text text-mc-pixel text-muted-foreground">
          WHO DRINKS THE MOST CHAI DURING STUDY SESSIONS?
        </p>
      </motion.div>

      <div className="space-y-4">
        {chaiLeaders.map((leader, i) => (
          <motion.div
            key={leader.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="minecraft-border p-4 flex items-center gap-4 card-hover"
          >
            <div className="shrink-0 w-10 h-10 flex items-center justify-center">
              {leader.rank <= 3 ? (
                <Trophy className={`w-6 h-6 ${
                  leader.rank === 1 ? 'text-accent' :
                  leader.rank === 2 ? 'text-muted-foreground' :
                  'text-primary'
                }`} />
              ) : (
                <span className="minecraft-text text-xs text-muted-foreground">#{leader.rank}</span>
              )}
            </div>
            <div className="flex-1">
              <div className="minecraft-text text-mc-small text-foreground">{leader.name}</div>
              <div className="minecraft-text text-mc-pixel text-muted-foreground">{leader.title}</div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-accent" />
              <span className="minecraft-text text-xs text-accent">{leader.cups}</span>
              <span className="minecraft-text text-mc-pixel text-muted-foreground">cups</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
