export type Course = {
  slug: string;
  code: string;
  title: string;
  level: "Foundations" | "Intermediate" | "Captain Track";
  duration: string;
  summary: string;
  modules: string[];
};

export const courses: Course[] = [
  {
    slug: "reading-the-wind",
    code: "WH-101",
    title: "Reading the Wind",
    level: "Foundations",
    duration: "4 weeks · self-paced",
    summary:
      "Where wind comes from, how it bends around coastlines, and how a sailor turns invisible pressure into forward motion.",
    modules: [
      "Global circulation & local sea breeze",
      "Apparent vs. true wind, the polar diagram",
      "Trim, twist, and the slot effect",
      "Field log — 5 wind days, journaled",
    ],
  },
  {
    slug: "weather-and-routing",
    code: "WH-204",
    title: "Weather & Routing",
    level: "Intermediate",
    duration: "6 weeks · live + self-paced",
    summary:
      "Read GRIBs like a captain. Plan a passage that respects the front, the swell, and the tide gate you cannot miss.",
    modules: [
      "Pressure systems and frontal anatomy",
      "GRIB, ECMWF, GFS — what to trust, when",
      "Routing across a 500 nm window",
      "Bail-out ports and a sober plan B",
    ],
  },
  {
    slug: "seamanship-and-safety",
    code: "WH-212",
    title: "Seamanship & Safety",
    level: "Intermediate",
    duration: "5 weeks · live",
    summary:
      "Heavy weather tactics, MOB drills, fire and flooding response, and the discipline of a watch system that actually holds.",
    modules: [
      "Storm sail plan & heaving-to",
      "MOB recovery under sail and power",
      "Engine, electrical, and rig triage",
      "Watch systems on long passages",
    ],
  },
  {
    slug: "celestial-and-pilotage",
    code: "WH-228",
    title: "Pilotage & Celestial",
    level: "Intermediate",
    duration: "6 weeks · self-paced",
    summary:
      "Plot a fix without GPS. Approach an unfamiliar harbour at dawn. The quiet, ancient half of modern navigation.",
    modules: [
      "Coastal piloting, transits, danger bearings",
      "Sun sights, noon latitude, time and Greenwich",
      "Chart, plotter, paper — used in concert",
      "Approach plans for 6 real harbours",
    ],
  },
  {
    slug: "captains-mind",
    code: "WH-301",
    title: "The Captain's Mind",
    level: "Captain Track",
    duration: "8 weeks · cohort",
    summary:
      "Decision-making under uncertainty. Crew leadership. Knowing when to turn back. The skill that separates a sailor from a captain.",
    modules: [
      "Risk frames at sea: red, amber, green",
      "Crew briefings, watch handovers, after-action",
      "Pre-mortems and the courage to abort",
      "Capstone — solo passage plan, defended",
    ],
  },
  {
    slug: "offshore-passage",
    code: "WH-401",
    title: "Offshore Passage Lab",
    level: "Captain Track",
    duration: "10 days · onboard",
    summary:
      "Onboard, blue water, real watches, real weather. Cross an ocean leg with mentors who have done the miles.",
    modules: [
      "Pre-departure inspection & provisioning",
      "Live weather routing, daily roll call",
      "Night watches and standing orders",
      "Landfall pilotage in unfamiliar waters",
    ],
  },
];

export type Voyage = {
  slug: string;
  name: string;
  region: string;
  distance: string;
  season: string;
  difficulty: "Coastal" | "Open Water" | "Offshore";
  brief: string;
};

export const voyages: Voyage[] = [
  {
    slug: "hong-kong-to-okinawa",
    name: "Hong Kong → Okinawa",
    region: "Northwest Pacific",
    distance: "780 nm",
    season: "April – May",
    difficulty: "Offshore",
    brief:
      "Spring transition winds, Kuroshio current shoulder, landfall in the Ryukyu arc.",
  },
  {
    slug: "phuket-to-langkawi",
    name: "Phuket → Langkawi",
    region: "Andaman Sea",
    distance: "165 nm",
    season: "November – March",
    difficulty: "Coastal",
    brief:
      "Northeast monsoon, limestone karst islands, shallow approaches and steady trades.",
  },
  {
    slug: "palma-to-corsica",
    name: "Palma → Corsica",
    region: "Western Mediterranean",
    distance: "320 nm",
    season: "May – September",
    difficulty: "Open Water",
    brief:
      "Mistral windows, Bonifacio Strait timing, classic summer Med routing.",
  },
  {
    slug: "auckland-to-fiji",
    name: "Auckland → Fiji",
    region: "South Pacific",
    distance: "1,150 nm",
    season: "May – June",
    difficulty: "Offshore",
    brief:
      "The classic Pacific milk run, weather windows between high pressure cells.",
  },
];

export type Journal = {
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
};

export const journal: Journal[] = [
  {
    slug: "what-the-wind-actually-is",
    title: "What the wind actually is",
    kicker: "Field notes",
    excerpt:
      "We say we sail with the wind. Most of the time we sail with the difference between two winds — and only one of them is real.",
    author: "Wei Lin",
    readTime: "7 min",
    date: "Apr 12",
  },
  {
    slug: "the-fourth-night",
    title: "The fourth night",
    kicker: "Captain's log",
    excerpt:
      "Day one is adrenaline. Day two is competence. Day four is the night you learn whether you and your crew can actually do this.",
    author: "Marisol Ortega",
    readTime: "11 min",
    date: "Mar 28",
  },
  {
    slug: "why-we-still-teach-celestial",
    title: "Why we still teach celestial",
    kicker: "Curriculum",
    excerpt:
      "The sextant doesn't run out of battery, but that's not why. The sextant teaches you that the world is older than your plotter.",
    author: "Toshi Aragaki",
    readTime: "5 min",
    date: "Mar 06",
  },
];
