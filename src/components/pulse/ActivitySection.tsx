import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { SectionCard, ChartTooltip, ChartFrame, ExpandableChart, ExpandToggle, Pill } from "./primitives";
import { Progress } from "@/components/ui/progress";
import { toneColor, toneSoft } from "./tones";
import { activityWeek, stepsGoal, stepsMonth } from "@/data/pulse-data";

export function ActivitySection({ delay = 0 }: { delay?: number }) {
  const [range, setRange] = useState<"7d" | "5d">("7d");
  const [expanded, setExpanded] = useState(false);
  const data = range === "7d" ? activityWeek : activityWeek.slice(-5);
  const total = data.reduce((s, d) => s + d.steps, 0);
  const stepsToday = activityWeek[activityWeek.length - 1]!.steps;
  const stepsPct = Math.min(100, Math.round((stepsToday / stepsGoal) * 100));
  const monthAvg = stepsMonth.reduce((s, d) => s + d.steps, 0) / stepsMonth.length;

  return (
    <SectionCard
      title="Activity"
      delay={delay}
      action={
        <div className="flex gap-1.5">
          <Pill tone="sky" active={range === "7d"} onClick={() => setRange("7d")}>
            7 days
          </Pill>
          <Pill tone="sky" active={range === "5d"} onClick={() => setRange("5d")}>
            5 days
          </Pill>
        </div>
      }
    >
      <div className="mb-1 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold tracking-tight">
          {Math.round(total / data.length).toLocaleString("en-GB")}
        </span>
        <span className="text-xs text-muted-foreground">avg steps / day</span>
      </div>
      <div className="mb-4 flex items-center gap-3">
        <Progress value={stepsPct} className="h-2 flex-1" />
        <span className="shrink-0 text-xs font-bold text-muted-foreground">
          {stepsToday.toLocaleString("en-GB")} / {stepsGoal.toLocaleString("en-GB")} today
        </span>
      </div>
      <ExpandableChart expanded={expanded}>
        <ChartFrame height={180}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart key={range} data={data} margin={{ top: 12, right: 4, left: 4, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--track)" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontWeight: 700 }}
              />
              <Tooltip
                cursor={{ fill: "var(--muted)", radius: 12 }}
                content={
                  <ChartTooltip
                    render={(row) => (
                      <div>
                        <p className="font-extrabold">{String(row["workout"])}</p>
                        <p className="text-muted-foreground">
                          {Number(row["steps"]).toLocaleString("en-GB")} steps ·{" "}
                          {String(row["duration"])} · {String(row["distance"])}
                        </p>
                      </div>
                    )}
                  />
                }
              />
              <Bar dataKey="steps" radius={10} animationDuration={900} maxBarSize={26}>
                {data.map((d, i) => (
                  <Cell key={d.day} fill={i === data.length - 1 ? toneColor.sky : toneSoft.sky} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartFrame>

        <div className="mt-5 mb-2 flex items-baseline justify-between">
          <h3 className="text-xs font-bold text-muted-foreground">30-day trend</h3>
          <span className="text-xs font-bold text-muted-foreground">
            {Math.round(monthAvg).toLocaleString("en-GB")} avg steps / day
          </span>
        </div>
        <ChartFrame height={120}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stepsMonth} margin={{ top: 8, right: 6, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="stepsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={toneColor.sky} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={toneColor.sky} stopOpacity={0} />
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
              <Tooltip
                content={
                  <ChartTooltip
                    render={(row) => (
                      <div>
                        <p className="font-extrabold">
                          {Number(row["steps"]).toLocaleString("en-GB")} steps
                        </p>
                        <p className="text-muted-foreground">{String(row["date"])}</p>
                      </div>
                    )}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="steps"
                stroke={toneColor.sky}
                strokeWidth={3}
                fill="url(#stepsFill)"
                animationDuration={1100}
                dot={false}
                activeDot={{ r: 5, fill: toneColor.sky, stroke: "var(--card)", strokeWidth: 3 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartFrame>
      </ExpandableChart>

      <ExpandToggle expanded={expanded} onClick={() => setExpanded((e) => !e)} />
    </SectionCard>
  );
}
