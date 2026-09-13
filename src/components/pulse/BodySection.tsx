import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionCard, ChartTooltip, ChartFrame, ExpandableChart, ExpandToggle, Badge } from "./primitives";
import { toneColor } from "./tones";
import { weightMonth } from "@/data/pulse-data";

export function BodySection({ delay = 0 }: { delay?: number }) {
  const [expanded, setExpanded] = useState(false);
  const latest = weightMonth[weightMonth.length - 1]!;
  const first = weightMonth[0]!;
  const diff = Math.round((latest.kg - first.kg) * 10) / 10;

  return (
    <SectionCard title="Weight" delay={delay} action={<Badge tone="lavender">30 days</Badge>}>
      <div className="mb-1 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold tracking-tight">{latest.kg} kg</span>
        <span className="text-xs text-muted-foreground">
          {diff <= 0 ? diff : `+${diff}`} kg this month
        </span>
      </div>

      <ExpandableChart expanded={expanded}>
        <ChartFrame height={180}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightMonth} margin={{ top: 12, right: 6, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={toneColor.lavender} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={toneColor.lavender} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--track)" />
              <XAxis
                dataKey="date"
                interval={6}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontWeight: 700 }}
              />
              <YAxis
                domain={["dataMin - 0.6", "dataMax + 0.6"]}
                tickFormatter={(v: number) => v.toFixed(1)}
                width={42}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontWeight: 700 }}
              />
              <Tooltip
                content={
                  <ChartTooltip
                    render={(row) => (
                      <div>
                        <p className="font-extrabold">{String(row["kg"])} kg</p>
                        <p className="text-muted-foreground">{String(row["date"])}</p>
                      </div>
                    )}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="kg"
                stroke={toneColor.lavender}
                strokeWidth={3}
                fill="url(#weightFill)"
                animationDuration={1100}
                dot={false}
                activeDot={{ r: 5, fill: toneColor.lavender, stroke: "var(--card)", strokeWidth: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartFrame>
      </ExpandableChart>

      <ExpandToggle expanded={expanded} onClick={() => setExpanded((e) => !e)} />
    </SectionCard>
  );
}
