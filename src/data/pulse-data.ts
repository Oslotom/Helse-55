// Example data — replace with real integration later
// (Strava, Withings, Apple Health, Huawei Health)

export const user = {
  name: "Marius",
  greeting: "Good morning",
  today: "Monday, 7 September",
  recovery: "Good",
};

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
