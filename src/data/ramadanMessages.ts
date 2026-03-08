// Sehri / Iftar celebration messages
export const sehriMessages = [
  "🍽️ SUHOOR.exe INITIATED — Fuel up, soldier!",
  "⚡ LOADING ENERGY... Please eat responsibly.",
  "🌙 Dawn approaches — eat like a king, fast like a warrior.",
  "🥣 Sehri mode: ON — Calories = HP points today.",
  "💧 Hydrate or diedrate. Your choice.",
  "🫡 The grind starts NOW. Fill the tank!",
  "🌟 Ya Allah, bless this Suhoor for us.",
  "🍳 Eggs, paratha, chai — the holy trinity of Sehri.",
  "⏰ Last call for food! Kitchen closing in 5...",
  "🔋 Battery charging... estimated time: until Iftar.",
  "🌙 Bismillah — time to fuel up for the day!",
  "🫧 Water check! Drink up before the sun rises.",
  "🤲 May this fast be easy and rewarding. Ameen.",
  "💪 Pre-loading patience.dll for today's fast...",
  "🌅 Another blessed Suhoor. Alhamdulillah!",
];

export const iftarMessages = [
  "🎉 IFTAR TIME — GG WP, you made it!",
  "🍉 fast.exe has STOPPED. Time to FEAST!",
  "🌙 Allahu Akbar! The wait is over, dig in!",
  "🥤 First sip hits different after 13 hours 😤",
  "🎊 Achievement Unlocked: Survived Another Fast!",
  "🍕 Buffering... FOOD LOADING... 100% COMPLETE!",
  "🤲 Alhamdulillah — another fast completed!",
  "✨ The dua at Iftar is never rejected. Ask away!",
  "🏆 VICTORY ROYALE — Fast completed successfully!",
  "😋 Your patience has been rewarded. EAT!",
  "🌟 SubhanAllah — you did it, champion!",
  "🍗 Ctrl+Z the hunger. It's over!",
  "🧃 Hydration incoming in 3... 2... 1... 🥤",
  "🎮 LEVEL COMPLETE — Reward: Unlimited food access",
  "🤝 Share your food, share the blessing!",
];

export const motivationalMessages = {
  longWait: [
    "☀️ It's a long day but your reward is longer. Sabar!",
    "💪 10+ hours? Easy. You've survived Monday mornings.",
    "🧊 Stay cool — literally and spiritually.",
    "📖 Perfect time to recite some Quran!",
    "🎯 Focus mode: ON. Hunger mode: IGNORED.",
    "🌿 Patience is the key to Jannah. Keep going!",
    "🫡 Soldier, you signed up for this. Lock in!",
    "⏳ Time is just a construct. You got this, king.",
    "🧠 Fun fact: Your body enters ketosis and heals during fasting!",
    "🕌 Use this time for dhikr — it makes time fly!",
  ],
  midDay: [
    "⚡ Halfway there! Don't give up now!",
    "🏃 The grind don't stop. Neither do you.",
    "🌤️ Afternoon vibes — you're past the hardest part!",
    "💭 Think about that first sip of water...",
    "🔥 You're COOKING (metaphorically, not literally rn).",
    "📊 Progress bar: ████████░░░░ 60% complete",
    "🎵 Hum some nasheeds to pass the time!",
    "💤 Power nap is halal. Just saying.",
    "🤲 Make dua — it's the fasting person's superpower!",
    "🌊 The ocean of patience leads to the beach of Iftar.",
  ],
  almostThere: [
    "🏁 THE FINISH LINE IS IN SIGHT!",
    "⏰ Just a few hours left — LOCK IN!",
    "🌅 Evening is coming... and so is food!",
    "💪 You didn't fast all day to give up now!",
    "🎮 Final boss battle: Last few hours of fasting!",
    "🕐 Clock is ticking in YOUR favor now!",
    "🌙 The moon is preparing to show up for you!",
    "🧃 Soon... very soon... water will touch your lips.",
    "📱 Stop scrolling and go make dua instead!",
    "🤝 Hang in there — every second counts!",
  ],
  soClose: [
    "🔥 LESS THAN AN HOUR! YOU CAN TASTE IT!",
    "⚡ FINAL COUNTDOWN ACTIVATED!",
    "🌙 The sun is setting... your reward approaches!",
    "🤲 Make dua NOW — it's the golden hour!",
    "😤 30 minutes? That's just one YouTube video!",
    "🏆 Champions are made in these last minutes!",
    "💪 Your willpower is LEGENDARY right now!",
    "🎉 Set the table — it's almost time!",
    "🍽️ Dates and water on standby!",
    "✨ The angels are cheering you on!",
  ],
  finalMinutes: [
    "🔥🔥🔥 MINUTES AWAY! LOCK IN!",
    "⏰ THE CLOCK IS YOUR FRIEND NOW!",
    "🌙 ALLAHU AKBAR — ALMOST THERE!",
    "🤲 MAKE YOUR DUA — NOW IS THE TIME!",
    "🎊 3... 2... 1... ALMOST!",
    "😭 YOU DID IT! (almost) HANG ON!",
    "🏁 FINISH LINE! KEEP GOING!",
    "💥 MAXIMUM EFFORT! LAST PUSH!",
  ],
};

export function getMessageBracket(totalMinutesLeft: number): string[] {
  if (totalMinutesLeft > 600) return motivationalMessages.longWait;
  if (totalMinutesLeft > 300) return motivationalMessages.midDay;
  if (totalMinutesLeft > 60) return motivationalMessages.almostThere;
  if (totalMinutesLeft > 10) return motivationalMessages.soClose;
  return motivationalMessages.finalMinutes;
}

export function getBubbleInterval(totalMinutesLeft: number): number {
  if (totalMinutesLeft > 600) return 120000;
  if (totalMinutesLeft > 300) return 90000;
  if (totalMinutesLeft > 60) return 60000;
  if (totalMinutesLeft > 10) return 30000;
  return 15000;
}
