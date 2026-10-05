import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { weeklyTrends } from "@/data/pulse-data";
import { toneColor, toneSoft } from "./tones";
import { SectionCard } from "./primitives";
import { useFeatureStore, type FeatureKey } from "@/lib/feature-store";

function formatValue(value: number, unit: (typeof weeklyTrends)[number]["unit"]) {
  switch (unit) {
    case "steps":
      return `${(value / 1000).toFixed(1)}k`;
    case "hours": {
      const h = Math.floor(value);
      return `${h}h ${Math.round((value - h) * 60).toString().padStart(2, "0")}m`;
    }
    case "kg":
      return value.toFixed(1);
    case "bpm":
      return `${Math.round(value)}`;
  }
}

function sparkPoints(values: number[], w = 100, h = 32) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v, i) => [
    (i / (values.length - 1)) * w,
    h - 3 - ((v - min) / span) * (h - 8),
  ]);
}

const metrics = weeklyTrends.map((t) => {
  const last = t.weeks[t.weeks.length - 1]!;
  const prev = t.weeks[t.weeks.length - 2]!;
  const pct = ((last - prev) / prev) * 100;
  const improved = t.betterWhen === "up" ? pct > 0 : pct < 0;
  return { ...t, last, pct, improved };
});

const metricFeature: Record<string, FeatureKey> = {
  sleep: "sleep",
  steps: "steps",
  weight: "weight",
  restingHr: "heart",
};

function useVisibleMetrics() {
  const enabled = useFeatureStore((s) => s.enabled);
  return metrics.filter((m) => enabled[metricFeature[m.key]!]);
}

function ScoreRing({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(value));
    return () => cancelAnimationFrame(id);
  }, [value]);
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative size-24 shrink-0">
      <svg viewBox="0 0 80 80" className="size-full -rotate-90">
        <defs>
          <linearGradient id="hero-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--mint)" />
            <stop offset="100%" stopColor="var(--sky)" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--track)" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="url(#hero-ring)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - shown / 100)}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1) 0.2s" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl leading-none font-black text-foreground">{value}</span>
        <span className="mt-0.5 text-[9px] font-extrabold tracking-widest text-muted-foreground uppercase">
          score
        </span>
      </div>
    </div>
  );
}

export function HeroBanner() {
  const visible = useVisibleMetrics();
  const improvedCount = visible.filter((m) => m.improved).length;
  const score = visible.length ? Math.round((improvedCount / visible.length) * 100) : 0;
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });

  return (
    <section className="rise-in relative p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold tracking-widest text-muted-foreground uppercase">{today}</p>
          <h1 className="mt-1.5 text-2xl leading-tight font-black tracking-tight text-foreground">
            {improvedCount} of {visible.length} metrics
            <br />
            <span className="bg-linear-to-r from-mint to-sky bg-clip-text text-transparent">
              improved this week
            </span>
          </h1>
          <button className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/60 px-3 py-1.5 text-xs font-extrabold text-foreground ring-1 ring-white/80 transition-colors hover:bg-white/90">
            See weekly report
            <ChevronRight className="size-3.5" />
          </button>
        </div>
        <ScoreRing value={score} />
      </div>
    </section>
  );
}

export function WeeklyStats() {
  const visible = useVisibleMetrics();
  if (visible.length === 0) return null;

  return (
    <SectionCard title="This week" delay={60}>
    <div className="grid grid-cols-3 gap-2">
      {visible.map((m, i) => {
        const pts = sparkPoints(m.weeks);
        const line = pts.map(([x, y], j) => `${j ? "L" : "M"}${x!.toFixed(1)} ${y!.toFixed(1)}`).join(" ");
        const gradId = `spark-${m.key}`;
        const suffix = m.unit === "kg" ? "kg" : m.unit === "bpm" ? "bpm" : "";
        return (
          <div
            key={m.key}
            className="rise-in overflow-hidden rounded-2xl p-2.5"
            style={{
              animationDelay: `${80 + i * 60}ms`,
              background: `linear-gradient(160deg, ${toneSoft[m.tone]} 0%, oklch(1 0 0 / 0.85) 70%)`,
            }}
          >
            <p className="truncate text-[10px] font-extrabold tracking-wider text-muted-foreground uppercase">
              {m.label}
            </p>
            <p className="mt-0.5 flex items-baseline gap-0.5">
              <span className="text-lg leading-none font-black tracking-tight text-foreground">
                {formatValue(m.last, m.unit)}
              </span>
              {suffix && <span className="text-[10px] font-bold text-muted-foreground">{suffix}</span>}
            </p>
            <p
              className="mt-0.5 flex items-center gap-0.5 text-[10px] font-extrabold"
              style={{ color: m.improved ? "oklch(0.5 0.1 178)" : "oklch(0.55 0.12 70)" }}
            >
              {m.pct > 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
              {Math.abs(m.pct).toFixed(1)}%
            </p>
            <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="mt-1.5 h-5 w-full overflow-visible">
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={toneColor[m.tone]} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={toneColor[m.tone]} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`${line} L100 32 L0 32 Z`} fill={`url(#${gradId})`} />
              <path
                d={line}
                pathLength={1}
                className="spark-draw"
                fill="none"
                stroke={toneColor[m.tone]}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        );
      })}
    </div>
    </SectionCard>
  );
}
