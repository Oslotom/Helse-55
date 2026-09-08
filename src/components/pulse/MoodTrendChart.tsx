import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltip, ChartFrame } from "./primitives";
import { moodOptions } from "@/data/pulse-data";
import type { MoodPoint } from "@/lib/mood-storage";

function CustomDot(props: { cx?: number; cy?: number; payload?: { emoji: string } }) {
  const { cx, cy, payload } = props;
  if (cx === undefined || cy === undefined || !payload) return <g />;
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={16}>
      {payload.emoji}
    </text>
  );
}

export function MoodTrendChart({
  data,
  height = 150,
  interval = 0,
}: {
  data: MoodPoint[];
  height?: number;
  interval?: number;
}) {
  const chartData = data.map((d) => {
    const option = moodOptions.find((m) => m.key === d.mood)!;
    return { ...d, value: option.value, emoji: option.emoji, moodLabel: option.label };
  });

  return (
    <ChartFrame height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 12, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--track)" />
          <XAxis
            dataKey="label"
            interval={interval}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontWeight: 700 }}
          />
          <YAxis hide domain={[0.5, 5.5]} />
          <Tooltip
            cursor={{ stroke: "var(--track)" }}
            content={
              <ChartTooltip
                render={(row) => (
                  <div>
                    <p className="font-extrabold">
                      {String(row["emoji"])} {String(row["moodLabel"])}
                    </p>
                    <p className="text-muted-foreground">{String(row["label"])}</p>
                    {Array.isArray(row["tags"]) && (row["tags"] as string[]).length > 0 && (
                      <p className="mt-1 text-muted-foreground">
                        {(row["tags"] as string[]).join(", ")}
                      </p>
                    )}
                  </div>
                )}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--muted-foreground)"
            strokeOpacity={0.25}
            strokeWidth={2}
            dot={CustomDot}
            isAnimationActive
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
