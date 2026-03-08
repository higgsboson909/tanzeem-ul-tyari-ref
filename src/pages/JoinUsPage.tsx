import { motion } from 'framer-motion';
import { UserPlus, MessageCircle, BookOpen, Users } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: "STUDY TOGETHER",
    desc: "Join group study sessions for finals prep",
  },
  {
    icon: MessageCircle,
    title: "PANIC TOGETHER",
    desc: "Share your exam anxiety with friends who get it",
  },
  {
    icon: Users,
    title: "SURVIVE TOGETHER",
    desc: "We're all in this 5th semester chaos — united by panic",
  },
];

export default function JoinUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <UserPlus className="w-12 h-12 mx-auto mb-4 text-accent" />
        <h1 className="minecraft-text text-sm md:text-lg gradient-text mb-2">
          🤝 JOIN THE TANZEEM
        </h1>
        <p className="minecraft-text text-mc-pixel text-muted-foreground">
          BECOME PART OF THE PANIC SQUAD
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="minecraft-border p-6 text-center card-hover"
            >
              <Icon className="w-8 h-8 mx-auto mb-4 text-accent" />
              <div className="minecraft-text text-[10px] text-foreground mb-2">{feat.title}</div>
              <div className="minecraft-text text-[8px] text-muted-foreground">{feat.desc}</div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="islamic-border p-8 text-center"
      >
        <p className="islamic-text text-lg text-accent mb-4">
          "We survived, somehow."
        </p>
        <p className="minecraft-text text-[8px] text-muted-foreground mb-6">
          — Every 5th Semester Student Ever
        </p>
        <a
          href="https://chat.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="minecraft-button inline-block text-[10px]"
        >
          JOIN WHATSAPP GROUP
        </a>
      </motion.div>
    </div>
  );
}
