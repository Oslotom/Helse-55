import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { toneColor, toneSoft, type Tone } from "./tones";

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function SectionCard({
  title,
  action,
  children,
  delay = 0,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <section
      className={cn("card-soft rise-in p-5", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-base font-bold tracking-tight">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Pill({
  children,
  tone = "mint",
  active = true,
  className,
  ...rest
}: {
  children: ReactNode;
  tone?: Tone;
  active?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full px-3 py-1 text-xs font-bold transition-all duration-200",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
        className,
      )}
      style={{ backgroundColor: active ? toneSoft[tone] : "var(--muted)" }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Badge({ children, tone = "mint" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[11px] font-bold"
      style={{ backgroundColor: toneSoft[tone] }}
    >
      {children}
    </span>
  );
}

export function ProgressRing({
  value,
  label,
  tone = "mint",
  size = 168,
  stroke = 14,
  caption,
}: {
  value: number;
  label: string;
  tone?: Tone;
  size?: number;
  stroke?: number;
  caption?: string;
}) {
  const mounted = useMounted();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = mounted ? c - (Math.min(value, 100) / 100) * c : c;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--track)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={toneColor[tone]}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold tracking-tight">{value}%</span>
          <span className="text-xs font-semibold text-muted-foreground">{label}</span>
        </div>
      </div>
      {caption && <p className="text-xs text-muted-foreground">{caption}</p>}
    </div>
  );
}

export function ChartTooltip({
  active,
  payload,
  render,
}: {
  active?: boolean;
  payload?: Array<{ payload: Record<string, unknown> }>;
  render: (row: Record<string, unknown>) => ReactNode;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="card-soft animate-in fade-in-0 zoom-in-95 px-3 py-2 text-xs font-semibold duration-150">
      {render(payload[0]!.payload)}
    </div>
  );
}

export function ChartFrame({ children, height = 180 }: { children: ReactNode; height?: number }) {
  const mounted = useMounted();
  return (
    <div style={{ height }} className="w-full">
      {mounted ? children : null}
    </div>
  );
}
