/** One motivational message / dua per Roza (1–30) */
export const dailyDuas: { roza: number; dua: string; reference?: string }[] = [
  { roza: 1, dua: "اللهم اجعل صيامي فيه صيام الصائمين — O Allah, make my fast the fast of the truly fasting.", reference: "Ramadan Dua Day 1" },
  { roza: 2, dua: "اللهم قربني فيه إلى مرضاتك — O Allah, draw me closer to Your pleasure today.", reference: "Ramadan Dua Day 2" },
  { roza: 3, dua: "اللهم ارزقني فيه الذهن والتنبيه — O Allah, grant me awareness and alertness today.", reference: "Ramadan Dua Day 3" },
  { roza: 4, dua: "اللهم قوني فيه على إقامة أمرك — O Allah, strengthen me to follow Your commands.", reference: "Ramadan Dua Day 4" },
  { roza: 5, dua: "اللهم اجعلني فيه من المستغفرين — O Allah, make me among those who seek forgiveness.", reference: "Ramadan Dua Day 5" },
  { roza: 6, dua: "اللهم لا تخذلني فيه لتعرض معصيتك — O Allah, do not let me be disgraced by disobedience.", reference: "Ramadan Dua Day 6" },
  { roza: 7, dua: "اللهم أعني فيه على صيامه وقيامه — O Allah, help me with fasting and prayer today.", reference: "Ramadan Dua Day 7" },
  { roza: 8, dua: "اللهم ارزقني فيه رحمة الأيتام — O Allah, grant me compassion for orphans today.", reference: "Ramadan Dua Day 8" },
  { roza: 9, dua: "اللهم اجعل لي فيه نصيبا من رحمتك — O Allah, give me a share of Your mercy.", reference: "Ramadan Dua Day 9" },
  { roza: 10, dua: "اللهم اجعلني فيه من المتوكلين عليك — O Allah, make me among those who trust in You.", reference: "Ramadan Dua Day 10" },
  { roza: 11, dua: "اللهم حبب إلي فيه الإحسان — O Allah, make me love goodness today.", reference: "Ramadan Dua Day 11" },
  { roza: 12, dua: "اللهم زيني فيه بالستر والعفاف — O Allah, adorn me with modesty and dignity.", reference: "Ramadan Dua Day 12" },
  { roza: 13, dua: "اللهم طهرني فيه من الدنس والأقذار — O Allah, purify me from impurities today.", reference: "Ramadan Dua Day 13" },
  { roza: 14, dua: "اللهم لا تؤاخذني فيه بالعثرات — O Allah, do not punish me for my slips.", reference: "Ramadan Dua Day 14" },
  { roza: 15, dua: "اللهم ارزقني فيه طاعة الخاشعين — O Allah, grant me the devotion of the humble.", reference: "Ramadan Dua Day 15" },
  { roza: 16, dua: "اللهم وفقني فيه لموافقة الأبرار — O Allah, help me follow the path of the righteous.", reference: "Ramadan Dua Day 16" },
  { roza: 17, dua: "اللهم اهدني فيه لصالح الأعمال — O Allah, guide me to righteous deeds today.", reference: "Ramadan Dua Day 17" },
  { roza: 18, dua: "اللهم نبهني فيه لبركات أسحاره — O Allah, awaken me to the blessings of Suhoor.", reference: "Ramadan Dua Day 18" },
  { roza: 19, dua: "اللهم وفر حظي فيه من بركاته — O Allah, increase my share of Ramadan's blessings.", reference: "Ramadan Dua Day 19" },
  { roza: 20, dua: "اللهم افتح لي فيه أبواب الجنان — O Allah, open for me the gates of Paradise.", reference: "Ramadan Dua Day 20" },
  { roza: 21, dua: "اللهم اجعل لي فيه إلى مرضاتك دليلا — O Allah, guide me to what pleases You.", reference: "Ramadan Dua Day 21" },
  { roza: 22, dua: "اللهم افتح لي فيه أبواب فضلك — O Allah, open for me the doors of Your grace.", reference: "Ramadan Dua Day 22" },
  { roza: 23, dua: "اللهم اغسلني فيه من الذنوب — O Allah, wash away my sins today.", reference: "Ramadan Dua Day 23" },
  { roza: 24, dua: "اللهم إني أسألك فيه ما يرضيك — O Allah, I ask You for what pleases You.", reference: "Ramadan Dua Day 24" },
  { roza: 25, dua: "اللهم اجعلني فيه محبا لأوليائك — O Allah, make me love Your friends.", reference: "Ramadan Dua Day 25" },
  { roza: 26, dua: "اللهم اجعل سعيي فيه مشكورا — O Allah, make my efforts accepted today.", reference: "Ramadan Dua Day 26" },
  { roza: 27, dua: "اللهم ارزقني فيه فضل ليلة القدر — O Allah, grant me the virtue of Laylatul Qadr.", reference: "Ramadan Dua Day 27" },
  { roza: 28, dua: "اللهم وفر حظي فيه من النوافل — O Allah, increase my voluntary worship today.", reference: "Ramadan Dua Day 28" },
  { roza: 29, dua: "اللهم غشني فيه بالرحمة — O Allah, envelop me in Your mercy.", reference: "Ramadan Dua Day 29" },
  { roza: 30, dua: "اللهم اجعل صيامي فيه بالشكر والقبول — O Allah, make my fast one of gratitude and acceptance.", reference: "Ramadan Dua Day 30" },
];

export function getDailyDua(rozaNumber: number) {
  return dailyDuas.find((d) => d.roza === rozaNumber) ?? dailyDuas[0];
}
