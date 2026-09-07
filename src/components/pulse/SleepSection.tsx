import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { SectionCard, ChartTooltip, ChartFrame, Badge } from "./primitives";
import { toneColor, toneSoft } from "./tones";
import { sleepPhases, sleepWeek } from "@/data/pulse-data";

const totalPhases = sleepPhases.reduce((sum, p) => sum + p.minutes, 0);

export function SleepSection({ delay = 0 }: { delay?: number }) {
  return (
    <SectionCard title="Sleep" delay={delay} action={<Badge tone="mint">Last 7 days</Badge>}>
      <div className="mb-1 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold tracking-tight">7h20m</span>
        <span className="text-xs text-muted-foreground">last night</span>
      </div>
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
                <Cell
                  key={d.day}
                  fill={i === sleepWeek.length - 1 ? toneColor.mint : toneSoft.mint}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>

      <p className="mt-4 mb-2 text-xs font-bold text-muted-foreground">Last night's phases</p>
      <div className="flex h-4 w-full overflow-hidden rounded-full">
        {sleepPhases.map((p) => (
          <div
            key={p.name}
            title={`${p.name} ${Math.round(p.minutes / 60)}h`}
            style={{
              width: `${(p.minutes / totalPhases) * 100}%`,
              backgroundColor: toneColor[p.tone],
              transition: "width 250ms ease-out",
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        {sleepPhases.map((p) => (
          <div key={p.name} className="flex items-center gap-2 text-xs font-semibold">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: toneColor[p.tone] }}
            />
            {p.name}
            <span className="text-muted-foreground">
              {Math.floor(p.minutes / 60)}h {p.minutes % 60}m
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
