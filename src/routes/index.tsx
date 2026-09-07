import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/pulse/Header";
import { AiSummaryCard, ScoreRow } from "@/components/pulse/SummaryCards";
import { SleepSection } from "@/components/pulse/SleepSection";
import { ActivitySection } from "@/components/pulse/ActivitySection";
import { BodySection } from "@/components/pulse/BodySection";
import { HeartSection } from "@/components/pulse/HeartSection";
import { BottomTabs, tabs, type TabKey } from "@/components/pulse/BottomTabs";
import { SectionCard } from "@/components/pulse/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pulse — Your daily health & activity dashboard" },
      {
        name: "description",
        content:
          "Pulse brings sleep, activity, weight and heart rate into one calm daily dashboard with an AI-style summary of your day.",
      },
      { property: "og:title", content: "Pulse — Your daily health & activity dashboard" },
      {
        property: "og:description",
        content: "Sleep, steps, weight and resting heart rate in one calm daily view.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function ComingSoon({ label }: { label: string }) {
  return (
    <SectionCard title={label}>
      <p className="text-sm font-semibold text-muted-foreground">
        Coming soon — this tab will unlock once your accounts are connected.
      </p>
    </SectionCard>
  );
}

function Dashboard() {
  const [tab, setTab] = useState<TabKey>("today");
  const activeLabel = tabs.find((t) => t.key === tab)?.label ?? "";

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pt-6 pb-28">
      <h1 className="sr-only">Pulse health and activity dashboard</h1>
      <div className="flex flex-col gap-4">
        <Header />
        {tab === "today" ? (
          <>
            <AiSummaryCard />
            <ScoreRow />
            <div className="grid gap-4 md:grid-cols-2">
              <SleepSection delay={180} />
              <ActivitySection delay={240} />
              <BodySection delay={300} />
              <HeartSection delay={360} />
            </div>
          </>
        ) : (
          <ComingSoon label={activeLabel} />
        )}
      </div>
      <BottomTabs active={tab} onChange={setTab} />
    </main>
  );
}
