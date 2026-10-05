export const runningData = {
  type: "running",
  distance: 5.2, // in km
  time: "30:15", // in minutes and seconds
  pace: "5:49", // per km
};

export const weightliftingData = {
  type: "weightlifting",
  exercises: [
    {
      name: "Squat",
      sets: [
        { reps: 10, weight: 60 },
        { reps: 8, weight: 70 },
        { reps: 6, weight: 80 },
      ],
    },
    {
      name: "Bench Press",
      sets: [
        { reps: 10, weight: 50 },
        { reps: 8, weight: 60 },
        { reps: 6, weight: 70 },
      ],
    },
  ],
};
export type LoggedSession = { date: string; type: "running" | "weightlifting" };

const pad = (n: number) => String(n).padStart(2, "0");
const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Sample log (YYYY-MM-DD) spread over the current month until sessions are persisted.
const now = new Date();
export const sessionLog: LoggedSession[] = [
  { day: 2, type: "running" },
  { day: 4, type: "weightlifting" },
  { day: 7, type: "running" },
  { day: 9, type: "weightlifting" },
  { day: 12, type: "running" },
  { day: 15, type: "weightlifting" },
  { day: 18, type: "running" },
  { day: 21, type: "weightlifting" },
  { day: 24, type: "running" },
  { day: 27, type: "weightlifting" },
].map(({ day, type }) => ({
  date: isoDate(new Date(now.getFullYear(), now.getMonth(), day)),
  type: type as LoggedSession["type"],
}));
