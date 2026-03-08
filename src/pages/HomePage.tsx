import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="minecraft-border p-6 md:p-10 lg:p-14 text-center space-y-4"
      >
        <h1 className="minecraft-text text-xl md:text-3xl lg:text-4xl gradient-text">
          TANZEEM-UL-TYARI
        </h1>
        <p className="minecraft-text text-mc-small md:text-xs text-accent tracking-widest">
          ⚔ UNITED BY PANIC ⚔
        </p>
        <p className="minecraft-text text-mc-tiny md:text-mc-pixel text-muted-foreground">
          EST. 5TH SEMESTER FINALS · PREPARATION PORTAL
        </p>
      </motion.div>

      {/* The Leadership Council */}
      <div className="minecraft-border p-4 sm:p-6 md:p-8">
        <h2 className="minecraft-text text-mc-small sm:text-xs md:text-sm text-center mb-4 sm:mb-6 md:mb-8 flex items-center justify-center gap-2 flex-wrap text-mc-light-green">
          🏆 THE LEADERSHIP COUNCIL 🏆
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Ghulam Mustafa', title: 'Leader & Founder', persona: 'Socialist Marxist Philosopher', icon: '👑' },
            { name: 'Mudassar Bhatti', title: 'The Big Dawg', persona: 'Masculine ex-leader; Red-pilled energy', icon: '💪' },
            { name: 'Ahsan Ilahi', title: 'The Genius', persona: 'The mind behind the madness', icon: '🧠' },
            { name: 'Jhangir Ahmed', title: 'Higgs Boson', persona: 'Group spokesperson', icon: '⚛️' },
            { name: 'Faizan Ali', title: 'The Manager', persona: 'Keeping the chaos organized', icon: '📋' },
          ].map((member) => (
            <div
              key={member.name}
              className="minecraft-border p-3 md:p-4 text-center space-y-1 card-hover group cursor-default transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_hsla(var(--gold),0.3)]"
            >
              <span className="text-2xl block transition-transform duration-300 group-hover:scale-125 group-hover:animate-bounce">{member.icon}</span>
              <p className="minecraft-text text-mc-pixel md:text-mc-pixel-md text-accent transition-colors group-hover:text-gold-light">{member.name}</p>
              <p className="minecraft-text text-mc-tiny text-mc-light-green">{member.title}</p>
              <p className="minecraft-text text-mc-micro text-muted-foreground opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-10 transition-all duration-300 overflow-hidden">{member.persona}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
