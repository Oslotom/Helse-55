import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HealthChartProps {
  data: { date: string; value: number }[];
  type: "sleep" | "weight" | "steps";
}

const STEPS_GOAL = 10000;
const SLEEP_GOAL_HOURS = 8;

const colors = {
  steps: "#8884d8",
  sleep: "#82ca9d",
  weight: "#f59e0b",
};

function toPercent(data: HealthChartProps["data"], type: HealthChartProps["type"]) {
  const base = data[0]?.value ?? 1;
  return data.map((d) => ({
    date: d.date,
    value:
      type === "steps"
        ? (d.value / STEPS_GOAL) * 100
        : type === "sleep"
          ? (d.value / SLEEP_GOAL_HOURS) * 100
          : ((d.value - base) / base) * 100,
  }));
}

export function HealthChart({ data, type }: HealthChartProps) {
  const label = type === "steps" ? "% of goal" : type === "sleep" ? "Sleep score" : "% change";
  const formatter = (v: number) => [`${v.toFixed(1)}%`, label] as [string, string];
  const chartData = toPercent(data, type);

  return (
    <ResponsiveContainer width="100%" height={300}>
      {type === "steps" ? (
        <BarChart data={chartData}>
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip formatter={formatter} />
          <Bar dataKey="value" fill={colors.steps} radius={[6, 6, 0, 0]} />
        </BarChart>
      ) : (
        <LineChart data={chartData}>
          <XAxis dataKey="date" hide />
          <YAxis hide domain={["auto", "auto"]} />
          <Tooltip formatter={formatter} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={colors[type]}
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}
