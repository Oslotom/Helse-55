import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { SectionCard, ChartTooltip, ChartFrame, Pill } from "./primitives";
import { toneColor, toneSoft } from "./tones";
import { activityWeek } from "@/data/pulse-data";

export function ActivitySection({ delay = 0 }: { delay?: number }) {
  const [range, setRange] = useState<"7d" | "5d">("7d");
  const data = range === "7d" ? activityWeek : activityWeek.slice(-5);
  const total = data.reduce((s, d) => s + d.steps, 0);

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
        <span className="text-xs text-muted-foreground">avg steps / day2</span>
      </div>
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
    </SectionCard>
  );
}
