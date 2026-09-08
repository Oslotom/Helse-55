import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SectionCard, Badge, ProgressRing } from "@/components/pulse/primitives";
import { MoodTrendChart } from "@/components/pulse/MoodTrendChart";
import { moodOptions, feelingTags } from "@/data/pulse-data";
import { useMoodWeek, useMoodMonth } from "@/lib/mood-storage";

export const Route = createFileRoute("/feelings")({
  head: () => ({
    meta: [
      { title: "Feelings — Pulse" },
      {
        name: "description",
        content: "Your mood trends, distribution and check-ins over the past 30 days.",
      },
    ],
  }),
  component: FeelingsPage,
});

function FeelingsPage() {
  const week = useMoodWeek();
  const month = useMoodMonth();

  const avgValue = month.length
    ? month.reduce((s, d) => s + moodOptions.find((m) => m.key === d.mood)!.value, 0) /
      month.length
    : 3;
  const avgPct = Math.round(((avgValue - 1) / 4) * 100);

  const distribution = moodOptions.map((option) => {
    const count = month.filter((d) => d.mood === option.key).length;
    return {
      ...option,
      count,
      pct: month.length ? Math.round((count / month.length) * 100) : 0,
    };
  });

  const tagCounts = new Map<string, number>();
  for (const point of month) {
    for (const tag of point.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const topTags = feelingTags
    .map((tag) => ({ tag, count: tagCounts.get(tag) ?? 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
  const maxTagCount = Math.max(1, ...topTags.map((t) => t.count));

  const recent = [...week].reverse();

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pt-6 pb-16">
      <div className="mb-4 flex items-center gap-3">
        <Link
          to="/"
          aria-label="Back to dashboard"
          className="card-soft flex size-10 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
        >
          <ArrowLeft className="size-4 text-muted-foreground" />
        </Link>
        <h1 className="text-lg font-extrabold tracking-tight">Feelings</h1>
      </div>

      <div className="flex flex-col gap-4">
        <SectionCard>
          <div className="flex items-center gap-6">
            <ProgressRing value={avgPct} label="30-day mood" tone="lavender" size={132} stroke={11} />
            <div className="flex flex-col gap-1.5">
              {distribution
                .slice()
                .reverse()
                .map((d) => (
                  <div key={d.key} className="flex items-center gap-2 text-xs font-bold">
                    <span>{d.emoji}</span>
                    <span className="w-12 text-muted-foreground">{d.label}</span>
                    <span>{d.count}d</span>
                  </div>
                ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="30-day trend" action={<Badge tone="lavender">30 days</Badge>}>
          <MoodTrendChart data={month} height={180} interval={6} />
        </SectionCard>

        <SectionCard title="Mood distribution">
          <div className="flex flex-col gap-3">
            {distribution.map((d) => (
              <div key={d.key} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-xs font-bold">
                  {d.emoji} {d.label}
                </span>
                <div
                  className="h-2 flex-1 overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--track)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${d.pct}%`, backgroundColor: d.color }}
                  />
                </div>
                <span className="w-14 shrink-0 text-right text-xs font-bold text-muted-foreground">
                  {d.count}d · {d.pct}%
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Top feelings">
          <div className="flex flex-col gap-3">
            {topTags.map((t) => (
              <div key={t.tag} className="flex items-center gap-3">
                <span className="w-20 shrink-0 text-xs font-bold">{t.tag}</span>
                <div
                  className="h-2 flex-1 overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--track)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(t.count / maxTagCount) * 100}%`,
                      backgroundColor: "var(--sky)",
                    }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right text-xs font-bold text-muted-foreground">
                  {t.count}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recent check-ins">
          <div className="flex flex-col divide-y divide-[var(--track)]">
            {recent.map((entry, i) => {
              const option = moodOptions.find((m) => m.key === entry.mood)!;
              return (
                <div key={i} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <span className="text-2xl">{option.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold">
                      {entry.label} · <span className="text-muted-foreground">{option.label}</span>
                    </p>
                    {entry.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} tone="sky">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
