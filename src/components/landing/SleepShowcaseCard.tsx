import { toneColor, toneSoft } from "@/components/pulse/tones";

const days = [
  { day: "Tue", hours: 6.1 },
  { day: "Wed", hours: 7.0 },
  { day: "Thu", hours: 6.8 },
  { day: "Fri", hours: 6.4 },
  { day: "Sat", hours: 7.6 },
  { day: "Sun", hours: 7.3 },
  { day: "Mon", hours: 7.33 },
];

const maxHours = Math.max(...days.map((d) => d.hours));
const phases = [
  { key: "deep", width: 46, color: toneColor.mint },
  { key: "rem", width: 32, color: toneColor.sky },
  { key: "light", width: 22, color: toneColor.lavender },
];

/**
 * A floating, tilted "Sleep" summary card — the hero showcase piece,
 * styled like a real dashboard screenshot.
 */
export function SleepShowcaseCard() {
  return (
    <div className="sleep-card-tilt w-[290px] rounded-[1.75rem] bg-white p-5 shadow-[0_30px_60px_-15px_rgba(15,40,50,0.25)] ring-1 ring-black/5 sm:w-[330px]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-extrabold text-neutral-900">Sleep</p>
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-extrabold"
          style={{ backgroundColor: toneSoft.mint, color: "#0f766e" }}
        >
          Last 7 days
        </span>
      </div>

      <p className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900">
        7h20m
        <span className="ml-1.5 text-[11px] font-bold text-neutral-400">last night</span>
      </p>

      {/* week bars */}
      <div className="mt-5 flex h-24 items-end justify-between gap-2 px-1">
        {days.map((d, i) => (
          <div key={d.day} className="flex h-full flex-col items-center justify-end gap-1.5">
            <span
              className="w-4 rounded-full sm:w-[18px]"
              style={{
                height: `${(d.hours / maxHours) * 100}%`,
                backgroundColor: i === days.length - 1 ? toneColor.mint : toneSoft.mint,
              }}
            />
            <span className="text-[9px] font-extrabold text-neutral-400">{d.day}</span>
          </div>
        ))}
      </div>

      {/* phases */}
      <p className="mt-4 text-[10px] font-extrabold text-neutral-500">Last night's phases</p>
      <div className="mt-1.5 flex h-3.5 overflow-hidden rounded-full">
        {phases.map((p) => (
          <span key={p.key} style={{ width: `${p.width}%`, backgroundColor: p.color }} />
        ))}
      </div>
    </div>
  );
}
