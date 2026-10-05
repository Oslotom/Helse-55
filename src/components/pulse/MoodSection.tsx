import { useState } from "react";
import { SectionCard, Badge } from "./primitives";
import { MoodTrendChart } from "./MoodTrendChart";
import { moodOptions } from "@/data/pulse-data";
import { useMoodWeek } from "@/lib/mood-storage";

export function MoodSection({ delay = 0 }: { delay?: number }) {
  const data = useMoodWeek();
  const latest = data[data.length - 1]!;
  const latestOption = moodOptions.find((m) => m.key === latest.mood)!;

  return (
    <SectionCard
      title="Mood"
      delay={delay}
      action={
        <Badge tone="lavender">
          {latestOption.emoji} {latestOption.label} today
        </Badge>
      }
    >
      <MoodTrendChart data={data} height={150} />
    </SectionCard>
  );
}