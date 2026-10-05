import { toneColor, toneSoft } from "@/components/pulse/tones";

export function WeightComponent() {
  return (
    <div className="w-full max-w-xs rounded-3xl bg-background/50 p-5 shadow-xl backdrop-blur-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">Weight</h3>
        <button
          className="rounded-full px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor: toneSoft.lavender,
            color: toneColor.lavender,
          }}
        >
          30 days
        </button>
      </div>
      <p className="mt-4 text-3xl font-bold text-foreground">
        78.6 <span className="text-lg font-semibold text-muted-foreground">kg</span>
      </p>
      <p className="text-xs font-semibold text-muted-foreground">-1.2 kg this month</p>
      <div className="mt-4 h-24">
        <svg viewBox="0 0 100 50" className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={toneColor.lavender} stopOpacity={0.4} />
              <stop offset="100%" stopColor={toneColor.lavender} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path
            d="M 0 10 C 20 20, 40 5, 60 25, 80 15, 100 40"
            stroke={toneColor.lavender}
            strokeWidth="2"
            fill="url(#weightGradient)"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-xs font-semibold text-muted-foreground">
        <span>9 Aug</span>
        <span>7 Sep</span>
      </div>
    </div>
  );
}