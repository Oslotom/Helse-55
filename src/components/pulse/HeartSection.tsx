import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionCard, ChartTooltip, ChartFrame, Badge } from "./primitives";
import { toneColor } from "./tones";
import { restingHr } from "@/data/pulse-data";

export function HeartSection({ delay = 0 }: { delay?: number }) {
  const latest = restingHr[restingHr.length - 1]!;
  const avg = Math.round(restingHr.reduce((s, d) => s + d.bpm, 0) / restingHr.length);

  return (
    <SectionCard
      title="Resting heart rate"
      delay={delay}
      action={<Badge tone="amber">14 days</Badge>}
    >
      <div className="mb-1 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold tracking-tight">{latest.bpm} bpm</span>
        <span className="text-xs text-muted-foreground">{avg} bpm average</span>
      </div>
      <ChartFrame height={170}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={restingHr} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="var(--track)" />
            <XAxis
              dataKey="day"
              interval={2}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontWeight: 700 }}
            />
            <YAxis
              domain={["dataMin - 3", "dataMax + 3"]}
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
                      <p className="font-extrabold">{String(row["bpm"])} bpm</p>
                      <p className="text-muted-foreground">{String(row["day"])}</p>
                    </div>
                  )}
                />
              }
            />
            <Line
              type="monotone"
              dataKey="bpm"
              stroke={toneColor.amber}
              strokeWidth={3}
              dot={false}
              animationDuration={1100}
              activeDot={{ r: 5, fill: toneColor.amber, stroke: "var(--card)", strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartFrame>
    </SectionCard>
  );
}
