// Static Ramadan 2026 timetable (Lahore, Pakistan)
// Ramadan 1447 AH: Feb 19 – Mar 20, 2026
// Method: University of Islamic Sciences, Karachi (18° Fajr)
// Sehri = Fajr end time, Iftar = Maghrib (sunset)

export interface RamadanDay {
  date: string;   // "DD Mon" format
  sehr: string;   // HH:mm (24h, AM)
  iftar: string;  // HH:mm (12h display, but stored as PM hour without +12)
}

export const ramadanTimings: RamadanDay[] = [
  { date: "19 Feb", sehr: "5:23", iftar: "5:58" },
  { date: "20 Feb", sehr: "5:22", iftar: "5:59" },
  { date: "21 Feb", sehr: "5:21", iftar: "6:00" },
  { date: "22 Feb", sehr: "5:20", iftar: "6:01" },
  { date: "23 Feb", sehr: "5:19", iftar: "6:02" },
  { date: "24 Feb", sehr: "5:18", iftar: "6:03" },
  { date: "25 Feb", sehr: "5:17", iftar: "6:04" },
  { date: "26 Feb", sehr: "5:16", iftar: "6:05" },
  { date: "27 Feb", sehr: "5:15", iftar: "6:06" },
  { date: "28 Feb", sehr: "5:14", iftar: "6:07" },
  { date: "01 Mar", sehr: "5:13", iftar: "6:08" },
  { date: "02 Mar", sehr: "5:12", iftar: "6:09" },
  { date: "03 Mar", sehr: "5:11", iftar: "6:10" },
  { date: "04 Mar", sehr: "5:10", iftar: "6:11" },
  { date: "05 Mar", sehr: "5:09", iftar: "6:12" },
  { date: "06 Mar", sehr: "5:08", iftar: "6:13" },
  { date: "07 Mar", sehr: "5:07", iftar: "6:14" },
  { date: "08 Mar", sehr: "5:05", iftar: "6:15" },
  { date: "09 Mar", sehr: "5:04", iftar: "6:16" },
  { date: "10 Mar", sehr: "5:03", iftar: "6:17" },
  { date: "11 Mar", sehr: "5:02", iftar: "6:18" },
  { date: "12 Mar", sehr: "5:00", iftar: "6:19" },
  { date: "13 Mar", sehr: "4:59", iftar: "6:20" },
  { date: "14 Mar", sehr: "4:58", iftar: "6:21" },
  { date: "15 Mar", sehr: "4:56", iftar: "6:22" },
  { date: "16 Mar", sehr: "4:55", iftar: "6:23" },
  { date: "17 Mar", sehr: "4:54", iftar: "6:24" },
  { date: "18 Mar", sehr: "4:52", iftar: "6:25" },
  { date: "19 Mar", sehr: "4:51", iftar: "6:26" },
  { date: "20 Mar", sehr: "4:50", iftar: "6:27" },
];
