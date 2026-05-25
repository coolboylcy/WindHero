/**
 * 每门 WindHero 课程 → RYA / ASA / IYT 大纲条目映射
 *
 * 用于课程详情页显示"这门课覆盖了三体系里的哪些考点"。
 *
 * 注：ASA 课号引用 ASA 官方 101–108 + 110+ 系列；
 *     IYT 引用其 Bareboat / Yachtmaster 系列大纲；
 *     RYA 引用 Day Skipper / Coastal / Yachtmaster Theory 大纲。
 */

export type CourseCertMap = {
  rya: string[];
  asa: string[];
  iyt: string[];
};

export const courseCertMappings: Record<string, CourseCertMap> = {
  "reading-the-wind": {
    rya: [
      "Day Skipper Theory · Meteorology · Global wind patterns",
      "Day Skipper Theory · Meteorology · Sea breeze and land breeze",
      "Day Skipper Theory · Meteorology · Beaufort scale",
      "Day Skipper Theory · Sailing Theory · Points of sail",
      "Day Skipper Theory · Sailing Theory · True wind vs apparent wind",
      "Coastal/Yachtmaster Theory · Meteorology · Monsoon systems",
    ],
    asa: [
      "ASA 101 · Sail trim & points of sail",
      "ASA 103 · Wind awareness for coastal cruising",
      "ASA 105 · Weather basics for coastal navigation",
    ],
    iyt: [
      "International Crew · Wind awareness",
      "International Bareboat Skipper · Local weather patterns",
      "International Yachtmaster Coastal · Synoptic meteorology basics",
    ],
  },

  "chartwork-and-tides": {
    rya: [
      "Day Skipper Theory · Chartwork · Chart symbols and abbreviations",
      "Day Skipper Theory · Chartwork · Latitude/longitude, distance, direction",
      "Day Skipper Theory · Chartwork · Variation, deviation, compass corrections",
      "Day Skipper Theory · Chartwork · Position fixing (DR, EP, fix)",
      "Day Skipper Theory · Chartwork · Course to steer (CTS)",
      "Day Skipper Theory · Tides · Standard port tides and tidal curves",
      "Day Skipper Theory · Tides · Secondary port calculations",
      "Day Skipper Theory · Tides · Rule of twelfths",
      "Day Skipper Theory · Tides · Tidal streams (Atlas, diamonds)",
      "Coastal/Yachtmaster Theory · Advanced tidal calculations",
    ],
    asa: [
      "ASA 105 · Coastal Navigation · Chart reading and symbols",
      "ASA 105 · Coastal Navigation · Compass corrections (variation/deviation)",
      "ASA 105 · Coastal Navigation · Position determination (DR, fix)",
      "ASA 105 · Coastal Navigation · Tides and tidal currents",
      "ASA 105 · Coastal Navigation · Set, drift, leeway",
      "ASA 106 · Advanced Coastal Cruising · Passage planning",
    ],
    iyt: [
      "International Bareboat Skipper · Chartwork and navigation",
      "International Yachtmaster Coastal · Tidal heights and streams",
      "International Yachtmaster Coastal · Position fixing techniques",
    ],
  },

  "lights-shapes-sounds": {
    rya: [
      "Day Skipper Theory · IRPCS Rule 21 — Definitions of lights",
      "Day Skipper Theory · IRPCS Rule 23 — Power-driven vessels underway",
      "Day Skipper Theory · IRPCS Rule 25 — Sailing vessels underway",
      "Day Skipper Theory · IRPCS Rules 27–30 — Special vessels (NUC, RAM, fishing, anchored)",
      "Day Skipper Theory · IRPCS Rules 34–35 — Maneuvering and sound signals",
      "Coastal/Yachtmaster Theory · Advanced IRPCS scenarios",
    ],
    asa: [
      "ASA 103 · Coastal cruising rules of the road",
      "ASA 105 · Navigation lights and shapes",
      "ASA 106 · Sound signals in restricted visibility",
    ],
    iyt: [
      "International Bareboat Skipper · IRPCS / COLREGS",
      "International Yachtmaster Coastal · Vessel lights & shapes recognition",
    ],
  },

  "vhf-and-comms": {
    rya: [
      "VHF/SRC · Module 1 — Basic operating procedures",
      "VHF/SRC · Module 2 — Channel selection and use",
      "VHF/SRC · Module 3 — Distress alerting (DSC)",
      "VHF/SRC · Module 4 — Phonetic alphabet & procedural words",
      "VHF/SRC · Module 5 — GMDSS overview",
      "Day Skipper Theory · Communications basics",
    ],
    asa: [
      "ASA 103 · VHF radio basic operation",
      "ASA 105 · Distress procedures (融入大纲)",
    ],
    iyt: [
      "IYT VHF SRC Certificate · Full syllabus",
      "International Bareboat Skipper · Communications",
    ],
  },

  "diesel-engine": {
    rya: [
      "RYA Diesel Engine · 4-stroke cycle",
      "RYA Diesel Engine · Fuel system and bleeding",
      "RYA Diesel Engine · Cooling and raw water systems",
      "RYA Diesel Engine · Troubleshooting common failures",
      "RYA Diesel Engine · Maintenance schedule",
      "Coastal/Yachtmaster Theory · Engine basics for skippers",
    ],
    asa: [
      "ASA 104 · Bareboat Cruising · Engine basics (融入大纲)",
      "ASA 118 · Docking endorsement (engine handling)",
    ],
    iyt: [
      "International Bareboat Skipper · Diesel engine basic operation",
      "International Yachtmaster · Engine troubleshooting",
    ],
  },

  "marine-first-aid": {
    rya: [
      "RYA First Aid · Primary survey DR.ABC",
      "RYA First Aid · CPR and rescue breaths",
      "RYA First Aid · Bleeding, burns, fractures",
      "RYA First Aid · Hypothermia and marine emergencies",
      "RYA First Aid · Casualty handover",
    ],
    asa: [
      "ASA 106 · Crew safety and emergency medical (推荐红十字会)",
      "ASA 108 · Offshore medical kit and protocols",
    ],
    iyt: [
      "IYT Medical Person In Charge · Basic level syllabus",
      "International Yachtmaster · Onboard first aid (融入大纲)",
    ],
  },

  "radar-and-electronics": {
    rya: [
      "RYA Radar · Principles and controls",
      "RYA Radar · Image interpretation and target identification",
      "RYA Radar · Use of radar for collision avoidance (Rule 19)",
      "RYA Radar · Radar pilotage in restricted visibility",
      "Day Skipper Theory · GPS and electronic chartplotters",
      "Coastal/Yachtmaster Theory · AIS and electronic navigation",
    ],
    asa: [
      "ASA 105 · Use of electronic navigation (GPS, chart plotter)",
      "ASA 106 · Advanced electronic navigation and radar basics",
      "ASA 108 · Offshore navigation aids",
    ],
    iyt: [
      "International Yachtmaster Coastal · Radar use and limitations",
      "International Yachtmaster · GPS, AIS, ECDIS",
    ],
  },

  "weather-and-routing": {
    rya: [
      "Coastal/Yachtmaster Theory · Meteorology · Low-pressure systems",
      "Coastal/Yachtmaster Theory · Meteorology · Fronts (cold/warm/occluded)",
      "Coastal/Yachtmaster Theory · Meteorology · Numerical weather prediction (GRIB)",
      "Yachtmaster Offshore Theory · Passage planning and weather routing",
      "Yachtmaster Offshore Theory · Weather windows and bolt holes",
    ],
    asa: [
      "ASA 105 · Weather forecasting basics",
      "ASA 106 · Advanced coastal weather",
      "ASA 108 · Offshore passage planning and routing",
    ],
    iyt: [
      "International Yachtmaster Coastal · Weather systems and forecasting",
      "International Yachtmaster Offshore · GRIB and passage routing",
    ],
  },

  "seamanship-and-safety": {
    rya: [
      "Day Skipper Theory · Safety equipment and procedures",
      "Coastal/Yachtmaster Theory · Heavy weather seamanship",
      "Coastal/Yachtmaster Theory · Reefing and storm sail configuration",
      "Coastal/Yachtmaster Theory · Man overboard (MOB) procedures",
      "Coastal/Yachtmaster Theory · IRPCS in practice",
      "Yachtmaster Offshore Theory · Watch system and fatigue management",
    ],
    asa: [
      "ASA 103 · Coastal cruising safety",
      "ASA 104 · Bareboat heavy weather basics",
      "ASA 106 · Advanced coastal seamanship",
      "ASA 108 · Offshore watch keeping",
    ],
    iyt: [
      "International Bareboat Skipper · Heavy weather and MOB",
      "International Yachtmaster Coastal · Watch routines",
      "International Yachtmaster Offshore · Crew management",
    ],
  },

  "sea-survival-theory": {
    rya: [
      "RYA Sea Survival · Lifejackets and harnesses",
      "RYA Sea Survival · Flares and emergency signals",
      "RYA Sea Survival · Liferaft deployment and abandoning ship",
      "RYA Sea Survival · Hypothermia and cold-water survival",
      "RYA Sea Survival · Onboard medical basics",
    ],
    asa: [
      "ASA 108 · Offshore safety and survival equipment",
      "ASA 108 · Emergency procedures",
    ],
    iyt: [
      "STCW Basic Safety · Sea Survival (理论部分)",
      "International Yachtmaster Offshore · Emergency procedures",
    ],
  },

  "celestial-and-pilotage": {
    rya: [
      "Coastal/Yachtmaster Theory · Pilotage techniques (transits, clearing bearings)",
      "Coastal/Yachtmaster Theory · Danger bearings and depth contours",
      "Yachtmaster Ocean Theory · Celestial navigation · Sextant use",
      "Yachtmaster Ocean Theory · Celestial navigation · Noon sight and latitude",
      "Yachtmaster Ocean Theory · Celestial navigation · Time, longitude, declination",
      "Yachtmaster Ocean Theory · Position by sun sights and LOP",
    ],
    asa: [
      "ASA 105 · Pilotage and chart use",
      "ASA 106 · Advanced pilotage",
      "ASA 107 · Celestial Navigation · Complete syllabus",
    ],
    iyt: [
      "International Yachtmaster Coastal · Pilotage",
      "International Yachtmaster Ocean · Celestial navigation",
    ],
  },

  "captains-mind": {
    rya: [
      "Yachtmaster Offshore Theory · Captain's decision-making",
      "Yachtmaster Offshore Theory · Risk assessment and management",
      "Yachtmaster Offshore Theory · Crew briefings and handovers",
      "Yachtmaster Offshore Theory · Emergency response coordination",
      "Yachtmaster Ocean Theory · Long-passage psychology",
    ],
    asa: [
      "ASA 108 · Captain's responsibilities offshore",
      "ASA 108 · Decision-making and risk management",
    ],
    iyt: [
      "International Yachtmaster Offshore · Captain's role and responsibilities",
      "International Yachtmaster Ocean · Long passage command",
    ],
  },

  "offshore-passage": {
    rya: [
      "Yachtmaster Offshore Practical · Sea miles and passages",
      "Yachtmaster Ocean Practical · 600 NM ocean passage requirement",
      "Pre-departure checks and brief",
      "Daily routine offshore",
      "Night watch protocols",
    ],
    asa: [
      "ASA 108 · Offshore Passagemaking (实操部分)",
    ],
    iyt: [
      "International Yachtmaster Offshore Practical · Sea time",
      "International Yachtmaster Ocean Practical · 600+ NM passage",
    ],
  },
};

export function getMapping(slug: string): CourseCertMap | undefined {
  return courseCertMappings[slug];
}
