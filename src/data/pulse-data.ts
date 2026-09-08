// Example data — replace with real integration later
// (Strava, Withings, Apple Health, Huawei Health)

export const user = {
  name: "Marius",
  greeting: "Good morning",
  today: "Monday, 7 September",
  recovery: "Good",
};

// Mood check-in options
export const moodOptions = [
  { key: "great", emoji: "😄", label: "Great", value: 5, color: "var(--mint)" },
  { key: "good", emoji: "🙂", label: "Good", value: 4, color: "var(--sky)" },
  { key: "okay", emoji: "😐", label: "Okay", value: 3, color: "var(--amber)" },
  { key: "low", emoji: "😔", label: "Low", value: 2, color: "var(--lavender)" },
  { key: "rough", emoji: "😣", label: "Rough", value: 1, color: "var(--destructive)" },
] as const;

export const feelingTags = [
  "Energetic",
  "Motivated",
  "Relaxed",
  "Happy",
  "Tired",
  "Sore",
  "Stressed",
  "Anxious",
  "Sick",
  "Focused",
];

// Mood check-ins for the past 7 days (last entry = today, overridden by a real
// check-in via the mood FAB if the user has logged one)
export const moodWeek = [
  { day: "Tue", mood: "good", tags: ["Motivated", "Energetic"] },
  { day: "Wed", mood: "okay", tags: ["Tired"] },
  { day: "Thu", mood: "great", tags: ["Energetic", "Happy"] },
  { day: "Fri", mood: "low", tags: ["Stressed", "Tired"] },
  { day: "Sat", mood: "good", tags: ["Relaxed"] },
  { day: "Sun", mood: "great", tags: ["Happy", "Relaxed"] },
  { day: "Mon", mood: "good", tags: ["Focused"] },
] satisfies Array<{ day: string; mood: (typeof moodOptions)[number]["key"]; tags: string[] }>;

const upliftingTags = ["Energetic", "Motivated", "Relaxed", "Happy", "Focused"];
const drainingTags = ["Tired", "Sore", "Stressed", "Anxious", "Sick"];

// Mood check-ins for the past 30 days
export const moodMonth = Array.from({ length: 30 }, (_, i) => {
  const wave = Math.sin(i / 3.2) * 1.6 + Math.cos(i / 5) * 0.6;
  const value = Math.min(5, Math.max(1, Math.round(3 + wave)));
  const mood = moodOptions.find((m) => m.value === value)!.key;
  const pool = value >= 4 ? upliftingTags : value <= 2 ? drainingTags : [upliftingTags[0]!, drainingTags[0]!];
  const tagCount = value === 3 ? 1 : i % 2 === 0 ? 2 : 1;
  const tags = Array.from({ length: tagCount }, (_, j) => pool[(i + j * 2) % pool.length]!);
  const d = new Date(2026, 7, 9 + i);
  return {
    date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    mood,
    tags,
  };
});

// Rotating AI-style day summaries — no real AI call
export const aiSummaries = [
  "You slept 7h20m with good deep sleep. Yesterday's run left moderate load, so today is a good day for an easy session or rest.",
  "Recovery is trending up: resting heart rate is 2 bpm below your 14-day average. A tempo workout would land well today.",
  "Sleep was a little short last night, but your training load is light this week. Keep it easy and aim for an earlier bedtime.",
];

export const scores = [
  { key: "sleep", label: "Sleep", value: 87, unit: "%", tone: "mint" as const },
  { key: "load", label: "Load", value: 62, unit: "%", tone: "sky" as const },
  { key: "recovery", label: "Recovery", value: 78, unit: "%", tone: "lavender" as const },
];

// Sleep duration (hours) last 7 days
export const sleepWeek = [
  { day: "Tue", date: "1 Sep", hours: 6.8, label: "6h48m" },
  { day: "Wed", date: "2 Sep", hours: 7.5, label: "7h30m" },
  { day: "Thu", date: "3 Sep", hours: 7.1, label: "7h06m" },
  { day: "Fri", date: "4 Sep", hours: 6.2, label: "6h12m" },
  { day: "Sat", date: "5 Sep", hours: 8.4, label: "8h24m" },
  { day: "Sun", date: "6 Sep", hours: 7.9, label: "7h54m" },
  { day: "Mon", date: "7 Sep", hours: 7.33, label: "7h20m" },
];

// Last night sleep phases (minutes)
export const sleepPhases = [
  { name: "Light", minutes: 232, tone: "sky" as const },
  { name: "Deep", minutes: 118, tone: "mint" as const },
  { name: "REM", minutes: 90, tone: "lavender" as const },
];

// Nightly sleep goal used to derive a 0-100 sleep score for any period
export const sleepGoalHours = 8;

// Sleep duration (hours) last 30 days
export const sleepMonth = Array.from({ length: 30 }, (_, i) => {
  const wave = Math.sin(i / 4) * 0.6 + Math.cos(i / 7) * 0.3;
  const hours = Math.round((7.2 + wave) * 10) / 10;
  const d = new Date(2026, 7, 9 + i);
  return {
    date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    hours,
  };
});

// Average sleep duration (hours) for the past 12 months
export const sleepYear = Array.from({ length: 12 }, (_, i) => {
  const d = new Date(2025, 9 + i, 1);
  const wave = Math.sin(i / 2) * 0.5;
  const hours = Math.round((7.0 + wave + i * 0.02) * 10) / 10;
  return {
    month: d.toLocaleDateString("en-GB", { month: "short" }),
    hours,
  };
});

// Rotating sleep-specific insights shown per period on the Sleep page
export const sleepInsights = [
  "Last night's deep sleep (1h58m) was above your 14-day average — a good sign your recovery is on track.",
  "You're averaging close to your 8h goal this week. Keep bedtime consistent to protect your deep sleep share.",
  "This month's sleep is trending slightly up. A few short nights mid-month were offset by strong weekends.",
  "Your sleep duration has been remarkably consistent over the past year, with a slight dip over the winter months.",
];

// Today's step goal
export const stepsGoal = 10000;

// Daily activity last 7 days
export const activityWeek = [
  { day: "Tue", steps: 8420, workout: "Easy run", duration: "42m", distance: "7.1 km" },
  { day: "Wed", steps: 5310, workout: "Rest", duration: "—", distance: "—" },
  { day: "Thu", steps: 12680, workout: "Intervals", duration: "58m", distance: "11.4 km" },
  { day: "Fri", steps: 7040, workout: "Walk", duration: "35m", distance: "3.2 km" },
  { day: "Sat", steps: 9860, workout: "Strength", duration: "50m", distance: "—" },
  { day: "Sun", steps: 15230, workout: "Long run", duration: "1h34m", distance: "18.2 km" },
  { day: "Mon", steps: 6120, workout: "Easy spin", duration: "30m", distance: "12.6 km" },
];

// Steps trend last 30 days
export const stepsMonth = Array.from({ length: 30 }, (_, i) => {
  const base = 7400 + i * 60;
  const wave = Math.sin(i / 2.3) * 2200;
  const steps = Math.max(2500, Math.round(base + wave));
  const d = new Date(2026, 7, 9 + i);
  return {
    date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    steps,
  };
});

// Weight trend last 30 days (kg, smoothed)
export const weightMonth = Array.from({ length: 30 }, (_, i) => {
  const start = 79.8;
  const kg = start - i * 0.045 + Math.sin(i / 4) * 0.12;
  const d = new Date(2026, 7, 9 + i);
  return {
    date: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    kg: Math.round(kg * 10) / 10,
  };
});

// Resting heart rate last 14 days (bpm)
export const restingHr = [
  { day: "25 Aug", bpm: 52 },
  { day: "26 Aug", bpm: 53 },
  { day: "27 Aug", bpm: 51 },
  { day: "28 Aug", bpm: 54 },
  { day: "29 Aug", bpm: 53 },
  { day: "30 Aug", bpm: 50 },
  { day: "31 Aug", bpm: 49 },
  { day: "1 Sep", bpm: 51 },
  { day: "2 Sep", bpm: 52 },
  { day: "3 Sep", bpm: 50 },
  { day: "4 Sep", bpm: 53 },
  { day: "5 Sep", bpm: 49 },
  { day: "6 Sep", bpm: 48 },
  { day: "7 Sep", bpm: 48 },
];

// Weekly averages for the past 5 weeks (oldest to newest)
export const weeklyTrends = [
  {
    key: "sleep",
    label: "Sleep",
    tone: "mint" as const,
    unit: "hours" as const,
    betterWhen: "up" as const,
    weeks: [6.9, 7.0, 7.2, 7.1, 7.4],
  },
  {
    key: "steps",
    label: "Steps",
    tone: "sky" as const,
    unit: "steps" as const,
    betterWhen: "up" as const,
    weeks: [7620, 7980, 8340, 8890, 9237],
  },
  {
    key: "weight",
    label: "Weight",
    tone: "lavender" as const,
    unit: "kg" as const,
    betterWhen: "down" as const,
    weeks: [79.4, 79.1, 78.9, 78.7, 78.6],
  },
  {
    key: "restingHr",
    label: "Resting HR",
    tone: "amber" as const,
    unit: "bpm" as const,
    betterWhen: "down" as const,
    weeks: [52, 51, 50, 49, 48],
  },
];
