import { motion } from 'framer-motion';
import type { RamadanTimetable } from '@/lib/prayerTimes';

interface RamadanCalendarProps {
  timetable: RamadanTimetable | null;
}

function formatTimeAMPM(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-PK', { day: 'numeric', month: 'short' });
}

function getDayName(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-PK', { weekday: 'short' });
}

export default function RamadanCalendar({ timetable }: RamadanCalendarProps) {
  if (!timetable) return null;

  const todayStr = new Date().toISOString().slice(0, 10);

  // Filter: only show today and future days
  const filteredTimings = timetable.timings.filter((t) => t.date >= todayStr);

  // Calculate Roza number: day 1 = first day in timetable
  const firstDate = timetable.timings[0]?.date;
  const getRozaNumber = (dateStr: string) => {
    if (!firstDate) return 0;
    const start = new Date(firstDate + 'T00:00:00');
    const current = new Date(dateStr + 'T00:00:00');
    return Math.floor((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  if (filteredTimings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="minecraft-border p-6 text-center"
      >
        <p className="minecraft-text text-mc-small text-muted-foreground">
          🎉 Ramadan 2026 has ended. May Allah accept your fasts!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="minecraft-border p-4 md:p-6"
    >
      <div className="minecraft-text text-[10px] text-muted-foreground text-center mb-4">
        📋 REMAINING RAMADAN DAYS — {timetable.city.toUpperCase()}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="minecraft-text text-[8px] text-muted-foreground p-2 text-left border-b border-border">
                ROZA
              </th>
              <th className="minecraft-text text-[8px] text-muted-foreground p-2 text-left border-b border-border">
                DATE
              </th>
              <th className="minecraft-text text-[8px] text-muted-foreground p-2 text-left border-b border-border">
                DAY
              </th>
              <th className="minecraft-text text-[8px] text-muted-foreground p-2 text-center border-b border-border">
                SEHRI
              </th>
              <th className="minecraft-text text-[8px] text-muted-foreground p-2 text-center border-b border-border">
                IFTAR
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTimings.map((t) => {
              const isToday = t.date === todayStr;
              const rozaNum = getRozaNumber(t.date);
              return (
                <tr
                  key={t.date}
                  className={`border-b border-border/30 transition-colors ${
                    isToday
                      ? 'bg-primary/20 border-primary/50'
                      : 'hover:bg-muted/30'
                  }`}
                >
                  <td className={`minecraft-text text-[8px] p-2 ${isToday ? 'text-accent font-bold' : 'text-muted-foreground'}`}>
                    {rozaNum}
                    {isToday && ' ◄'}
                  </td>
                  <td className={`minecraft-text text-[8px] p-2 ${isToday ? 'text-accent' : 'text-foreground'}`}>
                    {formatDisplayDate(t.date)}
                  </td>
                  <td className="minecraft-text text-[8px] text-muted-foreground p-2">
                    {getDayName(t.date)}
                  </td>
                  <td className="minecraft-text text-[8px] text-foreground p-2 text-center">
                    {formatTimeAMPM(t.sehri)}
                  </td>
                  <td className="minecraft-text text-[8px] text-foreground p-2 text-center">
                    {formatTimeAMPM(t.iftar)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
