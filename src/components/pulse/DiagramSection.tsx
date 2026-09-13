import { SectionCard } from "./primitives";

const data = [
  { day: "Mon", score: 75 },
  { day: "Tue", score: 82 },
  { day: "Wed", score: 78 },
  { day: "Thu", score: 85 },
  { day: "Fri", score: 88 },
  { day: "Sat", score: 92 },
  { day: "Sun", score: 90 },
];

export function DiagramSection() {
  return (
    <SectionCard title="Health Score">
      <div className="grid grid-cols-7 gap-2">
        {data.map((d) => (
          <div key={d.day} className="flex flex-col items-center">
            <div className="h-24 w-4 rounded-full bg-muted">
              <div
                className="w-full rounded-full bg-foreground"
                style={{ height: `${d.score}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-bold text-muted-foreground">{d.day}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}