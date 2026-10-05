import { useState } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { SectionCard } from "./primitives";
import { Switch } from "@/components/ui/switch";
import { featureList, useFeatureStore } from "@/lib/feature-store";
import { user } from "@/data/pulse-data";

function FeaturesPage({ onBack }: { onBack: () => void }) {
  const { enabled, setFeature } = useFeatureStore();

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 self-start text-sm font-extrabold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        Profile
      </button>
      <SectionCard title="Features">
        <p className="mb-4 text-sm font-semibold text-muted-foreground">
          Turn a feature off to hide it everywhere in the app.
        </p>
        <ul className="flex flex-col divide-y divide-[var(--track)]">
          {featureList.map((f) => (
            <li key={f.key} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
              <label htmlFor={`feature-${f.key}`} className="min-w-0 flex-1 cursor-pointer">
                <p className="text-sm font-bold">{f.label}</p>
                <p className="text-xs text-muted-foreground">{f.description}</p>
              </label>
              <Switch
                id={`feature-${f.key}`}
                checked={enabled[f.key]}
                onCheckedChange={(v) => setFeature(f.key, v)}
              />
            </li>
          ))}
        </ul>
      </SectionCard>
    </>
  );
}

export function ProfilePage() {
  const [page, setPage] = useState<"main" | "features">("main");

  if (page === "features") return <FeaturesPage onBack={() => setPage("main")} />;

  return (
    <>
      <div className="flex items-center gap-3 px-1">
        <div
          className="flex size-14 items-center justify-center rounded-full text-lg font-extrabold"
          style={{ backgroundColor: "var(--mint-soft)" }}
          aria-hidden
        >
          {user.name.slice(0, 1)}
        </div>
        <p className="text-xl font-extrabold tracking-tight">{user.name}</p>
      </div>
      <SectionCard>
        <button
          type="button"
          onClick={() => setPage("features")}
          className="flex w-full items-center gap-3 text-left"
        >
          <span
            className="flex size-9 items-center justify-center rounded-2xl"
            style={{ backgroundColor: "var(--lavender-soft)", color: "var(--lavender)" }}
          >
            <SlidersHorizontal className="size-4" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-bold">Features</span>
            <span className="block text-xs text-muted-foreground">Choose what Pulse tracks</span>
          </span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>
      </SectionCard>
    </>
  );
}
