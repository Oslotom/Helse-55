import { Activity, Moon, Scale, Sun, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { toneSoft } from "./tones";

export const tabs = [
  { key: "today", label: "Today", Icon: Sun },
  { key: "activity", label: "Activity", Icon: Activity },
  { key: "sleep", label: "Sleep", Icon: Moon },
  { key: "body", label: "Body", Icon: Scale },
  { key: "profile", label: "Profile", Icon: User },
] as const;

export type TabKey = (typeof tabs)[number]["key"];

import { useTabStore } from "@/lib/tab-store";
import { useFeatureStore, type FeatureKey } from "@/lib/feature-store";

const tabFeature: Partial<Record<TabKey, FeatureKey>> = {
  activity: "steps",
  sleep: "sleep",
  body: "weight",
};

export function BottomTabs() {
  const { tab, setTab } = useTabStore();
  const enabled = useFeatureStore((s) => s.enabled);
  const visibleTabs = tabs.filter((t) => {
    const feature = tabFeature[t.key];
    return !feature || enabled[feature];
  });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-center px-3 pb-3">
      <div className="card-soft flex w-full max-w-md items-center justify-between gap-1 rounded-full p-2 backdrop-blur">
        {visibleTabs.map(({ key, label, Icon }) => {
          const isActive = key === tab;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 rounded-full px-2 py-2 text-[10px] font-bold transition-all duration-200",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              style={{ backgroundColor: isActive ? toneSoft.mint : "transparent" }}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon key={String(isActive)} className={cn("size-4", isActive && "tab-bounce")} />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}