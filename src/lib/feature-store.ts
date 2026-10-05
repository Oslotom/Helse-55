import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FeatureKey = "sleep" | "steps" | "weight" | "mood" | "heart";

export const featureList: { key: FeatureKey; label: string; description: string }[] = [
  { key: "sleep", label: "Sleep", description: "Sleep tracking, score and the Sleep tab" },
  { key: "steps", label: "Steps", description: "Daily steps, activity and the Activity tab" },
  { key: "weight", label: "Weight", description: "Weight tracking and the Body tab" },
  { key: "mood", label: "Mood", description: "Mood check-in and mood trends" },
  { key: "heart", label: "Heart rate", description: "Resting heart rate" },
];

type FeatureState = {
  enabled: Record<FeatureKey, boolean>;
  setFeature: (key: FeatureKey, value: boolean) => void;
};

export const useFeatureStore = create<FeatureState>()(
  persist(
    (set) => ({
      enabled: { sleep: true, steps: true, weight: true, mood: true, heart: true },
      setFeature: (key, value) => set((s) => ({ enabled: { ...s.enabled, [key]: value } })),
    }),
    { name: "pulse-features" },
  ),
);
