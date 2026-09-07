import { useState } from "react";
import { Sparkles } from "lucide-react";
import { ProgressRing, Badge } from "./primitives";
import { toneSoft } from "./tones";
import { aiSummaries, scores } from "@/data/pulse-data";

export function AiSummaryCard() {
  const [index] = useState(() => Math.floor(Math.random() * aiSummaries.length));

  return (
    <section
      className="rise-in rounded-3xl p-5"
      style={{
        animationDelay: "60ms",
        background: `linear-gradient(135deg, ${toneSoft.mint}, ${toneSoft.sky})`,
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="size-4" />
        <span className="text-sm font-extrabold tracking-tight">Your ddday, summarised22</span>
        <span className="ml-auto">
          <Badge tone="amber">Today</Badge>
        </span>
      </div>
      <p className="text-sm leading-relaxed font-semibold text-foreground/80">
        {aiSummaries[index]}
      </p>
    </section>
  );
}

export function ScoreRow() {
  return (
    <section
      className="rise-in card-soft grid grid-cols-3 gap-2 p-5"
      style={{ animationDelay: "120ms" }}
    >
      {scores.map((s, i) => (
        <div key={s.key} className="flex justify-center">
          <ProgressRing
            value={s.value}
            label={s.label}
            tone={s.tone}
            size={i === 0 ? 104 : 104}
            stroke={10}
          />
        </div>
      ))}
    </section>
  );
}

export function HeroRing() {
  const sleep = scores[0]!;
  return (
    <div className="flex flex-col items-center">
      <ProgressRing value={sleep.value} label="Sleep score" tone="mint" />
    </div>
  );
}
