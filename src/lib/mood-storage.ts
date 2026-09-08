import { useEffect, useState } from "react";
import { user, moodWeek, moodMonth } from "@/data/pulse-data";

export type MoodKey = "great" | "good" | "okay" | "low" | "rough";

export type MoodEntry = {
  mood: MoodKey;
  tags: string[];
  note: string;
};

export type MoodPoint = {
  label: string;
  mood: MoodKey;
  tags: string[];
};

const STORAGE_KEY = "pulse-mood-log";
const UPDATE_EVENT = "pulse-mood-updated";

export const todayKey = user.today;

export function loadMoodLog(): Record<string, MoodEntry> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, MoodEntry>) : {};
  } catch {
    return {};
  }
}

export function loadEntry(dateKey: string): MoodEntry | null {
  return loadMoodLog()[dateKey] ?? null;
}

export function saveEntry(dateKey: string, entry: MoodEntry) {
  try {
    const log = loadMoodLog();
    log[dateKey] = entry;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
    window.dispatchEvent(new Event(UPDATE_EVENT));
  } catch {
    // ignore storage failures (e.g. private browsing)
  }
}

export function useLiveMoodEntry(dateKey: string): MoodEntry | null {
  const [entry, setEntry] = useState<MoodEntry | null>(null);

  useEffect(() => {
    const read = () => setEntry(loadEntry(dateKey));
    read();
    window.addEventListener(UPDATE_EVENT, read);
    return () => window.removeEventListener(UPDATE_EVENT, read);
  }, [dateKey]);

  return entry;
}

// The last entry in each mock series stands for "today" — swap it for a real
// check-in (logged via the mood FAB) once one exists.
function withLiveToday<T extends { mood: MoodKey; tags: string[] }>(
  series: readonly T[],
  live: MoodEntry | null,
): T[] {
  return series.map((point, i) =>
    i === series.length - 1 && live ? { ...point, mood: live.mood, tags: live.tags } : point,
  );
}

export function useMoodWeek(): MoodPoint[] {
  const live = useLiveMoodEntry(todayKey);
  return withLiveToday(moodWeek, live).map((d) => ({ label: d.day, mood: d.mood, tags: d.tags }));
}

export function useMoodMonth(): MoodPoint[] {
  const live = useLiveMoodEntry(todayKey);
  return withLiveToday(moodMonth, live).map((d) => ({ label: d.date, mood: d.mood, tags: d.tags }));
}
