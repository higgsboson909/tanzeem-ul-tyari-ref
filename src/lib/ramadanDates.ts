/** Ramadan 2026 date range based on the JSON timetable */
export const RAMADAN_START = '2026-02-19';
export const RAMADAN_END = '2026-03-20';

export function isRamadanActive(): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return today >= RAMADAN_START && today <= RAMADAN_END;
}
