import { ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { ChartFrame } from "./primitives";

type ChartType = "area" | "bar";

export function MiniChart({
  data,
  dataKey,
  chartType = "area",
  color,
  height = 48,
  width = 80,
}: {
  data: Array<Record<string, unknown>>;
  dataKey: string;
  chartType?: ChartType;
  color: string;
  height?: number;
  width?: number;
}) {
  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "area" ? (
          <AreaChart data={data} margin={{ top: 2, right: 2, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`miniGrad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={1.5}
              fill={`url(#miniGrad-${dataKey})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        ) : (
          <BarChart data={data} margin={{ top: 4, right: 2, left: 2, bottom: 0 }}>
            <Bar dataKey={dataKey} fill={color} radius={2} isAnimationActive={false} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
