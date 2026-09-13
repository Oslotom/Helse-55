import { toneColor } from "./tones";

export function HeroBanner() {
  return (
    <section
      className="rise-in relative isolate min-h-47 overflow-hidden rounded-3xl px-6 pt-6 pb-4"
      style={{
        background:
          "radial-gradient(120% 140% at 0% 0%, var(--mint-soft), transparent 60%), " +
          "radial-gradient(120% 140% at 100% 0%, var(--sky-soft), transparent 60%), " +
          "radial-gradient(140% 160% at 50% 130%, var(--lavender-soft), transparent 65%), " +
          "var(--card)",
      }}
    >
      <span
        className="hero-orb"
        style={{
          width: 150,
          height: 150,
          top: -40,
          left: -30,
          backgroundColor: toneColor.mint,
          animationDelay: "0s",
        }}
        aria-hidden
      />
      <span
        className="hero-orb"
        style={{
          width: 120,
          height: 120,
          top: 0,
          right: -30,
          backgroundColor: toneColor.sky,
          animationDelay: "1.4s",
        }}
        aria-hidden
      />
      <span
        className="hero-orb"
        style={{
          width: 110,
          height: 110,
          bottom: -40,
          left: "42%",
          backgroundColor: toneColor.lavender,
          animationDelay: "2.8s",
        }}
        aria-hidden
      />

      <svg
        className="pointer-events-none absolute inset-x-0 bottom-3 h-14 w-full opacity-30"
        viewBox="0 0 400 60"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 34 L64 34 L80 12 L96 54 L112 24 L128 34 L400 34"
          stroke="var(--foreground)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={240}
          strokeDasharray={240}
          className="hero-pulse-path"
        />
      </svg>

      <div className="relative z-10">
        <p className="text-xs font-extrabold tracking-[0.2em] text-muted-foreground uppercase">Pulse</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground">
          Your daily health, in view
        </h1>
        <p className="mt-1 max-w-2xs text-sm font-semibold text-muted-foreground">
          Sleep, steps, weight and heart rate — one calm dashboard.
        </p>
      </div>
    </section>
  );
}
