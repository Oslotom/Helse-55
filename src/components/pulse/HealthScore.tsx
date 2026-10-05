import { useState } from "react";
import { SectionCard } from "./primitives";
import { HealthChart } from "./HealthChart";
import { sleepData, weightData, stepsData } from "@/data/health-data";

type FilterType = "sleep" | "weight" | "steps";

export function HealthScore() {
  const [filter, setFilter] = useState<FilterType>("steps");

  const dataMap = {
    sleep: sleepData,
    weight: weightData,
    steps: stepsData,
  };

  return (
    <SectionCard title="Health Score">
      <div className="flex justify-center gap-2">
        <button onClick={() => setFilter("steps")} className={`rounded-full px-3 py-1 text-xs font-bold ${filter === 'steps' ? 'bg-foreground text-background' : 'bg-background'}`}>Steps</button>
        <button onClick={() => setFilter("sleep")} className={`rounded-full px-3 py-1 text-xs font-bold ${filter === 'sleep' ? 'bg-foreground text-background' : 'bg-background'}`}>Sleep</button>
        <button onClick={() => setFilter("weight")} className={`rounded-full px-3 py-1 text-xs font-bold ${filter === 'weight' ? 'bg-foreground text-background' : 'bg-background'}`}>Weight</button>
      </div>
      <HealthChart data={dataMap[filter]} type={filter} />
    </SectionCard>
  );
}