import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionCard } from "./primitives";
import { Expandable } from "./Expandable";
import { sessionLog } from "@/data/session-data";
import { cn } from "@/lib/utils";

const MONTHLY_GOAL = 20;
const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
const pad = (n: number) => String(n).padStart(2, "0");

const circle = {
  running: "bg-sky-500 text-white",
  weightlifting: "bg-amber-500 text-white",
};

export function SessionCalendar() {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const monthPrefix = `${year}-${pad(month + 1)}-`;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // Monday first
  const cells = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const monthSessions = sessionLog.filter((s) => s.date.startsWith(monthPrefix));
  const done = monthSessions.length;
  const runs = monthSessions.filter((s) => s.type === "running").length;
  const workouts = done - runs;
  const progress = Math.min(100, (done / MONTHLY_GOAL) * 100);
  const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();

  const typeOn = (day: number) => monthSessions.find((s) => s.date === `${monthPrefix}${pad(day)}`)?.type;
  const isToday = (day: number) => isCurrentMonth && day === today.getDate();
  const shift = (delta: number) => setCursor(new Date(year, month + delta, 1));

  return (
    <SectionCard>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="block w-full text-left"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-bold tracking-tight">Training calendar</h2>
          <ChevronDown
            className={cn("size-4 text-muted-foreground transition-transform duration-300", open && "rotate-180")}
          />
        </div>
        <p className="mt-2 flex items-baseline gap-1.5">
          <span className="text-2xl leading-none font-black tracking-tight">{done}</span>
          <span className="text-sm font-bold text-muted-foreground">
            of {MONTHLY_GOAL} sessions {isCurrentMonth ? "this month" : "in " + cursor.toLocaleString("en-US", { month: "long" })}
          </span>
        </p>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full" style={{ backgroundColor: "var(--track)" }}>
          <div
            className="h-full rounded-full bg-linear-to-r from-mint to-sky transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </button>

      <Expandable isExpanded={open}>
        <div className="pt-4">
          <div className="mb-3 flex items-center justify-between">
            <button onClick={() => shift(-1)} className="p-1" aria-label="Previous month">
              <ChevronLeft className="size-4" />
            </button>
            <p className="text-sm font-bold">
              {cursor.toLocaleString("en-US", { month: "long", year: "numeric" })}
            </p>
            <button onClick={() => shift(1)} className="p-1" aria-label="Next month">
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-y-1 text-center">
            {weekdays.map((w, i) => (
              <p key={i} className="text-xs font-bold text-muted-foreground">
                {w}
              </p>
            ))}
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />;
              const type = typeOn(day);
              return (
                <div key={i} className="flex justify-center">
                  <span
                    className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-transform duration-200 hover:scale-110 ${
                      type ? circle[type] : isToday(day) ? "border border-foreground" : ""
                    }`}
                  >
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex justify-center gap-4 text-xs font-bold text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-sky-500" /> {runs} {runs === 1 ? "run" : "runs"}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-amber-500" /> {workouts}{" "}
              {workouts === 1 ? "workout" : "workouts"}
            </span>
          </div>
        </div>
      </Expandable>
    </SectionCard>
  );
}
