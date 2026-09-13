import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { SectionCard, ChartFrame, ExpandableChart, ExpandToggle, Badge } from "./primitives";
import { toneColor } from "./tones";
import { cn } from "@/lib/utils";
import { weeklyTrends } from "@/data/pulse-data";

function formatValue(value: number, unit: (typeof weeklyTrends)[number]["unit"]) {
  switch (unit) {
    case "steps":
      return `${Math.round(value).toLocaleString("en-GB")} steps`;
    case "hours": {
      const h = Math.floor(value);
      const m = Math.round((value - h) * 60);
      return `${h}h${m.toString().padStart(2, "0")}m`;
    }
    case "kg":
      return `${value.toFixed(1)} kg`;
    case "bpm":
      return `${Math.round(value)} bpm`;
  }
}

function computeTrend(trend: (typeof weeklyTrends)[number]) {
  const first = trend.weeks[0]!;
  const last = trend.weeks[trend.weeks.length - 1]!;
  const diff = last - first;
  const pct = first !== 0 ? (diff / first) * 100 : 0;
  const flat = Math.abs(pct) < 0.5;
  const improved = trend.betterWhen === "up" ? diff > 0 : diff < 0;
  return { last, diff, pct, flat, improved };
}

export function TrendsSection({ delay = 0 }: { delay?: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SectionCard
      title="Trends"
      delay={delay}
      action={<Badge tone="mint">5 weeks</Badge>}
      className="md:col-span-2"
    >
      <div className="flex flex-wrap gap-2">
        {weeklyTrends.map((trend) => {
          const { pct, flat, improved } = computeTrend(trend);
          return (
            <div
              key={trend.key}
              className={cn(
                "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-extrabold",
                flat
                  ? "text-muted-foreground"
                  : improved
                    ? "text-[var(--mint)]"
                    : "text-[var(--amber)]",
              )}
              style={{ backgroundColor: "var(--muted)" }}
            >
              {trend.label}
              {flat ? (
                <Minus className="size-3" />
              ) : pct > 0 ? (
                <ArrowUpRight className="size-3" />
              ) : (
                <ArrowDownRight className="size-3" />
              )}
              {flat ? "flat" : `${pct > 0 ? "+" : ""}${Math.round(pct)}%`}
            </div>
          );
        })}
      </div>

      <ExpandableChart expanded={expanded}>
        <div className="mt-2 flex flex-col divide-y divide-[var(--track)]">
          {weeklyTrends.map((trend) => {
            const { last, diff, pct, flat, improved } = computeTrend(trend);
            const data = trend.weeks.map((v, i) => ({ week: i, value: v }));

            return (
              <div key={trend.key} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <div className="w-28 shrink-0">
                  <p className="text-sm font-bold">{trend.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatValue(last, trend.unit)} avg
                  </p>
                </div>
                <ChartFrame height={40}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={toneColor[trend.tone]}
                        strokeWidth={2.5}
                        dot={false}
                        animationDuration={900}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartFrame>
                <div
                  className={cn(
                    "flex w-16 shrink-0 items-center justify-end gap-0.5 text-xs font-extrabold",
                    flat
                      ? "text-muted-foreground"
                      : improved
                        ? "text-[var(--mint)]"
                        : "text-[var(--amber)]",
                  )}
                >
                  {flat ? (
                    <Minus className="size-3.5" />
                  ) : diff > 0 ? (
                    <ArrowUpRight className="size-3.5" />
                  ) : (
                    <ArrowDownRight className="size-3.5" />
                  )}
                  {flat ? "flat" : `${pct > 0 ? "+" : ""}${Math.round(pct)}%`}
                </div>
              </div>
            );
          })}
        </div>
      </ExpandableChart>

      <ExpandToggle
        expanded={expanded}
        onClick={() => setExpanded((e) => !e)}
        labelShow="Show details"
        labelHide="Hide details"
      />
    </SectionCard>
  );
}
