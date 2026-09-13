import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { HeroBanner } from "@/components/pulse/HeroBanner";
import { Header } from "@/components/pulse/Header";
import { ScoreRow } from "@/components/pulse/SummaryCards";
import { SleepSection } from "@/components/pulse/SleepSection";
import { SleepPage } from "@/components/pulse/SleepPage";
import { ActivitySection } from "@/components/pulse/ActivitySection";
import { StepsPage } from "@/components/pulse/StepsPage";
import { BodySection } from "@/components/pulse/BodySection";
import { HeartSection } from "@/components/pulse/HeartSection";
import { TrendsSection } from "@/components/pulse/TrendsSection";
import { MoodSection } from "@/components/pulse/MoodSection";
import { MoodCheckIn } from "@/components/pulse/MoodCheckIn";
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
      <div className="flex flex-col gap-4">
        <HeroBanner />
        <Header />
        {tab === "today" ? (
          <>
            <ScoreRow />
            <div className="grid gap-4 md:grid-cols-2">
              <SleepSection delay={180} />
              <ActivitySection delay={240} />
              <BodySection delay={300} />
              <HeartSection delay={360} />
              <MoodSection delay={420} />
              <TrendsSection delay={480} />
            </div>
          </>
        ) : tab === "sleep" ? (
          <SleepPage />
        ) : tab === "activity" ? (
          <StepsPage />
        ) : (
          <ComingSoon label={activeLabel} />
        )}
      </div>
      <div className="mt-10 flex justify-center">
        <Link
          to="/landing"
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--track)] bg-card px-4 py-2 text-xs font-extrabold text-muted-foreground transition-colors hover:text-foreground"
        >
          About Pulse
          <Sparkles className="size-3.5" />
        </Link>
      </div>
      <BottomTabs active={tab} onChange={setTab} />
      <MoodCheckIn />
    </main>
  );
}
