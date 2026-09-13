import { toneColor } from "@/components/pulse/tones";

/**
 * A CSS-built iPhone mockup, tilted, showing a miniature screenshot
 * of the Pulse dashboard inside the screen.
 */
export function IphoneMockup() {
  return (
    <div className="iphone-tilt" aria-hidden>
      <div className="relative w-[220px] rounded-[2.6rem] bg-neutral-900 p-[10px] shadow-2xl shadow-black/30 ring-1 ring-white/20">
        {/* side buttons */}
        <span className="absolute top-24 -left-[2px] h-10 w-[3px] rounded-l bg-neutral-700" />
        <span className="absolute top-36 -left-[2px] h-14 w-[3px] rounded-l bg-neutral-700" />
        <span className="absolute top-28 -right-[2px] h-16 w-[3px] rounded-r bg-neutral-700" />

        {/* screen */}
        <div className="relative h-[440px] overflow-hidden rounded-[2.1rem] bg-white">
          {/* dynamic island */}
          <span className="absolute top-2 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-neutral-900" />

          {/* mini screenshot content */}
          <div className="flex h-full flex-col gap-2 px-3 pt-9 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[8px] font-extrabold tracking-[0.18em] text-neutral-400 uppercase">
                  Pulse
                </p>
                <p className="text-[11px] font-extrabold text-neutral-900">Good morning, Tom</p>
              </div>
              <span
                className="flex size-6 items-center justify-center rounded-full text-[10px]"
                style={{ backgroundColor: "var(--mint-soft)" }}
              >
                ☀️
              </span>
            </div>

            {/* hero mini card */}
            <div
              className="rounded-2xl p-3"
              style={{
                background:
                  "radial-gradient(120% 140% at 0% 0%, var(--mint-soft), transparent 60%), " +
                  "radial-gradient(120% 140% at 100% 0%, var(--sky-soft), transparent 60%), var(--card)",
              }}
            >
              <p className="text-[9px] font-extrabold text-neutral-500">Sleep score</p>
              <p className="text-lg font-extrabold text-neutral-900">
                92<span className="text-[10px] text-neutral-400">/100</span>
              </p>
              <div className="mt-1.5 flex items-end gap-1">
                {[38, 55, 42, 70, 60, 88, 74].map((h, i) => (
                  <span
                    key={i}
                    className="w-3 rounded-t"
                    style={{
                      height: h * 0.28,
                      backgroundColor: i === 6 ? toneColor.mint : toneColor.sky,
                      opacity: i === 6 ? 1 : 0.55,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* stat tiles */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Steps", value: "8,412", color: "var(--amber-soft)" },
                { label: "Heart", value: "62 bpm", color: "var(--lavender-soft)" },
                { label: "Weight", value: "74.2 kg", color: "var(--sky-soft)" },
                { label: "Mood", value: "Great", color: "var(--mint-soft)" },
              ].map((t) => (
                <div key={t.label} className="rounded-xl p-2" style={{ backgroundColor: t.color }}>
                  <p className="text-[7px] font-bold text-neutral-500">{t.label}</p>
                  <p className="text-[10px] font-extrabold text-neutral-900">{t.value}</p>
                </div>
              ))}
            </div>

            {/* activity row */}
            <div className="mt-auto rounded-2xl border-neutral-100 bg-neutral-50 p-2">
              <div className="flex items-center justify-between text-[8px] font-extrabold text-neutral-600">
                <span>Activity</span>
                <span className="text-neutral-400">This week</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full w-[72%] rounded-full"
                  style={{ backgroundColor: toneColor.mint }}
                />
              </div>
            </div>

            {/* bottom tabs */}
            <div className="flex items-center justify-around rounded-full bg-neutral-100 py-1.5">
              {["☀️", "🏃", "🌙", "⚖️", "👤"].map((e, i) => (
                <span key={i} className="text-[9px]" style={{ opacity: i === 0 ? 1 : 0.4 }}>
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* home indicator */}
          <span className="absolute bottom-1 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-neutral-900/80" />
        </div>
      </div>
    </div>
  );
}
