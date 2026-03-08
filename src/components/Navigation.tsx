import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Coffee, UserPlus, Moon } from 'lucide-react';
import { isRamadanActive } from '@/lib/ramadanDates';

export default function Navigation() {
  const location = useLocation();
  const ramadanActive = isRamadanActive();

  const navItems = [
    ...(ramadanActive
      ? [{ to: '/ramadan', icon: Moon, label: 'RAMADAN' }]
      : []),
    { to: ramadanActive ? '/home' : '/', icon: Home, label: 'HOME' },
    { to: '/chai-leader', icon: Coffee, label: 'CHAI' },
    
    { to: '/join-us', icon: UserPlus, label: 'JOIN US' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to={ramadanActive ? '/ramadan' : '/'} className="flex items-center gap-3 shrink-0">
            <img
              src="/logo.png"
              alt="Tanzeem-ul-Tyari Logo"
              className="w-10 h-10 md:w-12 md:h-12 logo-glow rounded"
            />
            <span className="minecraft-text text-mc-pixel md:text-mc-small gradient-text hidden sm:block">
              TANZEEM-UL-TYARI
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1 md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`nav-link flex items-center gap-1 md:gap-2 text-mc-pixel md:text-mc-small ${
                    isActive ? '!border-accent !bg-primary/30' : ''
                  }`}
                >
                  <Icon className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Scrolling ticker */}
        <div className="overflow-hidden mt-2">
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="whitespace-nowrap minecraft-text text-mc-pixel text-accent"
          >
            🌙 UNITED BY PANIC 🌙 Welcome to the Tanzeem-ul-Tyari Portal 🌙 Est.
            5th Semester Finals 🌙
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
