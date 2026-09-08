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
import { toneColor, toneSoft } from "./tones";
import {
  sleepWeek,
  sleepMonth,
  sleepYear,
  sleepPhases,
  sleepGoalHours,
  sleepInsights,
} from "@/data/pulse-data";

type Period = "day" | "week" | "month" | "year";

const periods: { key: Period; label: string; badge: string }[] = [
  { key: "day", label: "Day", badge: "Today" },
  { key: "week", label: "Week", badge: "7 days" },
  { key: "month", label: "Month", badge: "30 days" },
  { key: "year", label: "Year", badge: "12 months" },
];

function formatHours(hours: number) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h${m.toString().padStart(2, "0")}m`;
}

const totalPhaseMinutes = sleepPhases.reduce((sum, p) => sum + p.minutes, 0);
const lastNightHours = sleepWeek[sleepWeek.length - 1]!.hours;
const weekAvg = sleepWeek.reduce((s, d) => s + d.hours, 0) / sleepWeek.length;
const monthAvg = sleepMonth.reduce((s, d) => s + d.hours, 0) / sleepMonth.length;
const yearAvg = sleepYear.reduce((s, d) => s + d.hours, 0) / sleepYear.length;

export function SleepPage() {
  const [period, setPeriod] = useState<Period>("week");
  const activePeriod = periods.find((p) => p.key === period)!;

  const avg =
    period === "day"
      ? lastNightHours
      : period === "week"
        ? weekAvg
        : period === "month"
          ? monthAvg
          : yearAvg;
  const score = Math.max(0, Math.min(100, Math.round((avg / sleepGoalHours) * 100)));
  const insight = sleepInsights[periods.findIndex((p) => p.key === period) % sleepInsights.length]!;

  return (
    <div className="flex flex-col gap-4">
      <SectionCard
        title="Sleep"
        action={
          <div className="flex gap-1">
            {periods.map((p) => (
              <Pill key={p.key} tone="mint" active={period === p.key} onClick={() => setPeriod(p.key)}>
                {p.label}
              </Pill>
            ))}
          </div>
        }
      >
        <div className="flex items-center gap-6">
          <ProgressRing value={score} label="Sleep score" tone="mint" size={124} stroke={11} />
          <div>
            <p className="text-3xl font-extrabold tracking-tight">{formatHours(avg)}</p>
            <p className="text-xs text-muted-foreground">
              {period === "day" ? "last night" : `${period} average`} · goal {sleepGoalHours}h
            </p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Your sleep, summarised" action={<Badge tone="sky">{activePeriod.badge}</Badge>}>
        <p className="text-sm leading-relaxed font-semibold text-foreground/80">{insight}</p>
      </SectionCard>

      <SectionCard title="Sleep duration" action={<Badge tone="mint">{activePeriod.badge}</Badge>}>
        {period === "day" ? (
          <DayComparisonChart lastNight={lastNightHours} weekAvg={weekAvg} />
        ) : period === "week" ? (
          <WeekChart />
        ) : period === "month" ? (
          <MonthChart />
        ) : (
          <YearChart />
        )}
      </SectionCard>

      <SectionCard title="Sleep stages" action={<Badge tone="lavender">Last night</Badge>}>
        <div className="flex items-center gap-6">
          <ChartFrame height={140}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sleepPhases}
                  dataKey="minutes"
                  nameKey="name"
                  innerRadius={42}
                  outerRadius={64}
                  paddingAngle={3}
                  animationDuration={900}
                >
                  {sleepPhases.map((p) => (
                    <Cell key={p.name} fill={toneColor[p.tone]} stroke="none" />
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
          <div className="flex flex-1 flex-col gap-2">
            {sleepPhases.map((p) => (
              <div key={p.name} className="flex items-center gap-2 text-xs font-semibold">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: toneColor[p.tone] }} />
                <span className="w-12">{p.name}</span>
                <span className="text-muted-foreground">
                  {Math.floor(p.minutes / 60)}h {p.minutes % 60}m
                </span>
                <span className="ml-auto font-bold text-muted-foreground">
                  {Math.round((p.minutes / totalPhaseMinutes) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Analytics">
        <div className="grid grid-cols-3 gap-3 text-center">
          <StatTile label="Avg duration" value={formatHours(avg)} />
          <StatTile
            label="Deep sleep"
            value={`${Math.round(
              (sleepPhases.find((p) => p.name === "Deep")!.minutes / totalPhaseMinutes) * 100,
            )}%`}
          />
          <StatTile
            label="REM sleep"
            value={`${Math.round(
              (sleepPhases.find((p) => p.name === "REM")!.minutes / totalPhaseMinutes) * 100,
            )}%`}
          />
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
        <BarChart data={sleepWeek} margin={{ top: 12, right: 4, left: 4, bottom: 0 }}>
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
                    <p className="font-extrabold">{String(row["label"])}</p>
                    <p className="text-muted-foreground">
                      {String(row["day"])} · {String(row["date"])}
                    </p>
                  </div>
                )}
              />
            }
          />
          <Bar dataKey="hours" radius={10} animationDuration={900} maxBarSize={26}>
            {sleepWeek.map((d, i) => (
              <Cell key={d.day} fill={i === sleepWeek.length - 1 ? toneColor.mint : toneSoft.mint} />
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
        <AreaChart data={sleepMonth} margin={{ top: 12, right: 6, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="sleepMonthFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={toneColor.mint} stopOpacity={0.35} />
              <stop offset="100%" stopColor={toneColor.mint} stopOpacity={0} />
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
                    <p className="font-extrabold">{formatHours(Number(row["hours"]))}</p>
                    <p className="text-muted-foreground">{String(row["date"])}</p>
                  </div>
                )}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="hours"
            stroke={toneColor.mint}
            strokeWidth={3}
            fill="url(#sleepMonthFill)"
            animationDuration={1100}
            dot={false}
            activeDot={{ r: 5, fill: toneColor.mint, stroke: "var(--card)", strokeWidth: 3 }}
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
        <BarChart data={sleepYear} margin={{ top: 12, right: 4, left: 4, bottom: 0 }}>
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
                    <p className="font-extrabold">{formatHours(Number(row["hours"]))}</p>
                    <p className="text-muted-foreground">{String(row["month"])}</p>
                  </div>
                )}
              />
            }
          />
          <Bar dataKey="hours" radius={10} animationDuration={900} maxBarSize={22}>
            {sleepYear.map((d, i) => (
              <Cell key={d.month} fill={i === sleepYear.length - 1 ? toneColor.mint : toneSoft.mint} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

function DayComparisonChart({ lastNight, weekAvg }: { lastNight: number; weekAvg: number }) {
  const data = [
    { label: "7-day avg", hours: Math.round(weekAvg * 100) / 100 },
    { label: "Last night", hours: lastNight },
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
                    <p className="font-extrabold">{formatHours(Number(row["hours"]))}</p>
                    <p className="text-muted-foreground">{String(row["label"])}</p>
                  </div>
                )}
              />
            }
          />
          <Bar dataKey="hours" radius={10} animationDuration={900} maxBarSize={48}>
            {data.map((d, i) => (
              <Cell key={d.label} fill={i === 1 ? toneColor.mint : toneSoft.mint} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
