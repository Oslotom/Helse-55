import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionCard, Badge, Pill, ProgressRing, ChartFrame, ChartTooltip } from "./primitives";
import { toneColor, toneSoft, type Tone } from "./tones";
import {
  activityWeek,
  stepsMonth,
  stepsYear,
  stepsGoal,
  activityInsights,
} from "@/data/pulse-data";

type Period = "day" | "week" | "month" | "year";

const periods: { key: Period; label: string; badge: string }[] = [
  { key: "day", label: "Day", badge: "Today" },
  { key: "week", label: "Week", badge: "7 days" },
  { key: "month", label: "Month", badge: "30 days" },
  { key: "year", label: "Year", badge: "12 months" },
];

const workoutTones: Tone[] = ["sky", "mint", "lavender", "amber"];

function parseMinutes(duration: string): number {
  if (duration === "—") return 0;
  const h = duration.match(/(\d+)h/);
  const m = duration.match(/(\d+)m/);
  return (h ? Number(h[1]) * 60 : 0) + (m ? Number(m[1]) : 0);
}

function parseKm(distance: string): number {
  if (distance === "—") return 0;
  const match = distance.match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

function formatSteps(steps: number) {
  return Math.round(steps).toLocaleString("en-GB");
}

const todaySteps = activityWeek[activityWeek.length - 1]!.steps;
const weekAvg = activityWeek.reduce((s, d) => s + d.steps, 0) / activityWeek.length;
const monthAvg = stepsMonth.reduce((s, d) => s + d.steps, 0) / stepsMonth.length;
const yearAvg = stepsYear.reduce((s, d) => s + d.steps, 0) / stepsYear.length;

const totalDistanceKm = activityWeek.reduce((s, d) => s + parseKm(d.distance), 0);
const totalActiveMinutes = activityWeek.reduce((s, d) => s + parseMinutes(d.duration), 0);
const bestDay = activityWeek.reduce((best, d) => (d.steps > best.steps ? d : best), activityWeek[0]!);

const workoutMinutes = activityWeek
  .map((d, i) => ({ name: d.workout, minutes: parseMinutes(d.duration), tone: workoutTones[i % workoutTones.length]! }))
  .filter((d) => d.minutes > 0);
const totalWorkoutMinutes = workoutMinutes.reduce((s, d) => s + d.minutes, 0);

export function StepsPage() {
  const [period, setPeriod] = useState<Period>("week");
  const activePeriod = periods.find((p) => p.key === period)!;

  const avg =
    period === "day"
      ? todaySteps
      : period === "week"
        ? weekAvg
        : period === "month"
          ? monthAvg
          : yearAvg;
  const score = Math.max(0, Math.min(100, Math.round((avg / stepsGoal) * 100)));
  const insight = activityInsights[periods.findIndex((p) => p.key === period) % activityInsights.length]!;

  return (
    <div className="flex flex-col gap-4">
      <SectionCard
        title="Steps"
        action={
          <div className="flex gap-1">
            {periods.map((p) => (
              <Pill key={p.key} tone="sky" active={period === p.key} onClick={() => setPeriod(p.key)}>
                {p.label}
              </Pill>
            ))}
          </div>
        }
      >
        <div className="flex items-center gap-6">
          <ProgressRing value={score} label="Steps goal" tone="sky" size={124} stroke={11} />
          <div>
            <p className="text-3xl font-extrabold tracking-tight">{formatSteps(avg)}</p>
            <p className="text-xs text-muted-foreground">
              {period === "day" ? "so far today" : `${period} average`} · goal {formatSteps(stepsGoal)}
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Your activity, summarised" action={<Badge tone="sky">{activePeriod.badge}</Badge>}>
        <p className="text-sm leading-relaxed font-semibold text-foreground/80">{insight}</p>
      </SectionCard>

      <SectionCard title="Step count" action={<Badge tone="sky">{activePeriod.badge}</Badge>}>
        {period === "day" ? (
          <DayComparisonChart today={todaySteps} weekAvg={weekAvg} />
        ) : period === "week" ? (
          <WeekChart />
        ) : period === "month" ? (
          <MonthChart />
        ) : (
          <YearChart />
        )}
      </SectionCard>

      <SectionCard title="Time by workout" action={<Badge tone="lavender">Last 7 days</Badge>}>
        <div className="flex items-center gap-6">
          <div className="w-35 shrink-0">
            <ChartFrame height={140}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workoutMinutes}
                    dataKey="minutes"
                    nameKey="name"
                    innerRadius={42}
                    outerRadius={64}
                    paddingAngle={3}
                    animationDuration={900}
                  >
                    {workoutMinutes.map((w) => (
                      <Cell key={w.name} fill={toneColor[w.tone]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    content={
                      <ChartTooltip
                        render={(row) => (
                          <div>
                            <p className="font-extrabold">{String(row["name"])}</p>
                            <p className="text-muted-foreground">
                              {Math.floor(Number(row["minutes"]) / 60)}h {Number(row["minutes"]) % 60}m
                            </p>
                          </div>
                        )}
                      />
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartFrame>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            {workoutMinutes.map((w) => (
              <div key={w.name} className="flex items-center gap-2 text-xs font-semibold">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: toneColor[w.tone] }} />
                <span className="flex-1">{w.name}</span>
                <span className="text-muted-foreground">
                  {Math.floor(w.minutes / 60)}h {w.minutes % 60}m
                </span>
                <span className="font-bold text-muted-foreground">
                  {Math.round((w.minutes / totalWorkoutMinutes) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Analytics">
        <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
          <StatTile label="Avg steps" value={formatSteps(avg)} />
          <StatTile label="Distance (7d)" value={`${totalDistanceKm.toFixed(1)} km`} />
          <StatTile label="Active time (7d)" value={`${Math.floor(totalActiveMinutes / 60)}h ${totalActiveMinutes % 60}m`} />
          <StatTile label="Best day" value={`${bestDay.day} · ${formatSteps(bestDay.steps)}`} />
        </div>
      </SectionCard>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl p-3" style={{ backgroundColor: "var(--muted)" }}>
      <p className="text-lg font-extrabold tracking-tight">{value}</p>
      <p className="text-[11px] font-bold text-muted-foreground">{label}</p>
    </div>
  );
}

function WeekChart() {
  return (
    <ChartFrame height={168}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={activityWeek} margin={{ top: 12, right: 4, left: 4, bottom: 0 }}>
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
                      {formatSteps(Number(row["steps"]))} steps · {String(row["duration"])} ·{" "}
                      {String(row["distance"])}
                    </p>
                  </div>
                )}
              />
            }
          />
          <Bar dataKey="steps" radius={10} animationDuration={900} maxBarSize={26}>
            {activityWeek.map((d, i) => (
              <Cell key={d.day} fill={i === activityWeek.length - 1 ? toneColor.sky : toneSoft.sky} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

function MonthChart() {
  return (
    <ChartFrame height={168}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={stepsMonth} margin={{ top: 12, right: 6, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="stepsPageMonthFill" x1="0" y1="0" x2="0" y2="1">
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
          <YAxis
            domain={["dataMin - 1000", "dataMax + 1000"]}
            tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
            width={30}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontWeight: 700 }}
          />
          <Tooltip
            content={
              <ChartTooltip
                render={(row) => (
                  <div>
                    <p className="font-extrabold">{formatSteps(Number(row["steps"]))} steps</p>
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
            fill="url(#stepsPageMonthFill)"
            animationDuration={1100}
            dot={false}
            activeDot={{ r: 5, fill: toneColor.sky, stroke: "var(--card)", strokeWidth: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

function YearChart() {
  return (
    <ChartFrame height={168}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stepsYear} margin={{ top: 12, right: 4, left: 4, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--track)" />
          <XAxis
            dataKey="month"
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
                    <p className="font-extrabold">{formatSteps(Number(row["steps"]))} steps</p>
                    <p className="text-muted-foreground">{String(row["month"])}</p>
                  </div>
                )}
              />
            }
          />
          <Bar dataKey="steps" radius={10} animationDuration={900} maxBarSize={22}>
            {stepsYear.map((d, i) => (
              <Cell key={d.month} fill={i === stepsYear.length - 1 ? toneColor.sky : toneSoft.sky} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

function DayComparisonChart({ today, weekAvg }: { today: number; weekAvg: number }) {
  const data = [
    { label: "7-day avg", steps: Math.round(weekAvg) },
    { label: "Today", steps: today },
  ];
  return (
    <ChartFrame height={168}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 4, left: 4, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--track)" />
          <XAxis
            dataKey="label"
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
                    <p className="font-extrabold">{formatSteps(Number(row["steps"]))} steps</p>
                    <p className="text-muted-foreground">{String(row["label"])}</p>
                  </div>
                )}
              />
            }
          />
          <Bar dataKey="steps" radius={10} animationDuration={900} maxBarSize={48}>
            {data.map((d, i) => (
              <Cell key={d.label} fill={i === 1 ? toneColor.sky : toneSoft.sky} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
