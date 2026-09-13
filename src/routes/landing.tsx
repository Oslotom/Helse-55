import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowRight, Heart, Lock, Moon, Smartphone, Sparkles } from "lucide-react";
import { HeroGif, IphoneMockup, SleepComponent } from "@/components/landing";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Pulse — Your daily health, in view" },
      {
        name: "description",
        content:
          "Pulse brings sleep, activity, weight and heart rate into one calm daily dashboard. See the whole you, at a glance.",
      },
      { property: "og:title", content: "Pulse — Your daily health, in view" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: Moon,
    tone: "var(--mint)",
    soft: "var(--mint-soft)",
    title: "Sleep, decoded",
    body: "Sleep scores, stage breakdowns and 30-day trends — so you know what a good night actually looks like.",
  },
  {
    icon: Activity,
    tone: "var(--amber)",
    soft: "var(--amber-soft)",
    title: "Activity that adds up",
    body: "Steps, workouts and daily movement in one view, with weekly summaries that keep you honest.",
  },
  {
    icon: Heart,
    tone: "var(--lavender)",
    soft: "var(--lavender-soft)",
    title: "Heart & body signals",
    body: "Resting heart rate, weight and the quiet metrics that tell the long-term story of your health.",
  },
  {
    icon: Sparkles,
    tone: "var(--sky)",
    soft: "var(--sky-soft)",
    title: "Your day, summarised",
    body: "An AI-style daily summary pulls everything together — no digging through numbers required.",
  },
  {
    icon: Smartphone,
    tone: "var(--amber)",
    soft: "var(--amber-soft)",
    title: "Built mobile-first",
    body: "A pocket-sized dashboard designed for a quick glance with your morning coffee.",
  },
  {
    icon: Lock,
    tone: "var(--mint)",
    soft: "var(--mint-soft)",
    title: "Yours, privately",
    body: "Your mood check-ins and health data stay on your device. No accounts, no noise.",
  },
];

function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden px-4 pt-10 pb-20"
        style={{
          background:
            "radial-gradient(120% 140% at 0% 0%, var(--mint-soft), transparent 60%), " +
            "radial-gradient(120% 140% at 100% 0%, var(--sky-soft), transparent 60%), " +
            "radial-gradient(140% 160% at 50% 130%, var(--lavender-soft), transparent 65%), " +
            "var(--card)",
        }}
      >
        <div className="mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-2">
          <div className="rise-in">
            <p className="text-xs font-extrabold tracking-[0.2em] text-muted-foreground uppercase">
              Pulse
            </p>
            <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-foreground sm:text-5xl">
              Your daily health, in view.
            </h1>
            <p className="mt-4 max-w-md text-base font-semibold text-muted-foreground">
              Sleep, steps, weight and heart rate — one calm dashboard that makes sense of it all,
              every morning.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-extrabold text-background transition-transform duration-200 hover:scale-105"
              >
                Open the dashboard
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center rounded-full border-[var(--track)] px-6 py-3 text-sm font-extrabold text-foreground transition-colors hover:bg-accent"
              >
                Explore features
              </a>
            </div>
          </div>

                    <div className="relative flex justify-center md:justify-end">
            <IphoneMockup>
              <HeroGif />
            </IphoneMockup>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto w-full max-w-5xl px-4 py-20">
        <p className="text-xs font-extrabold tracking-[0.2em] text-muted-foreground uppercase">
          Features
        </p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
          Everything you need, nothing you don't
        </h2>
        <p className="mt-3 max-w-lg text-sm font-semibold text-muted-foreground">
          Pulse focuses on the handful of signals that matter, and presents them calmly.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, tone, soft, title, body }) => (
            <article
              key={title}
              className="card-soft rounded-3xl p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <span
                className="flex size-11 items-center justify-center rounded-2xl"
                style={{ backgroundColor: soft }}
              >
                <Icon className="size-5" style={{ color: tone }} />
              </span>
              <h3 className="mt-4 text-base font-extrabold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed font-semibold text-muted-foreground">
                {body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-20">
        <div
          className="rounded-3xl px-8 py-14 text-center"
          style={{
            background:
              "radial-gradient(120% 140% at 0% 0%, var(--sky-soft), transparent 60%), " +
              "radial-gradient(120% 140% at 100% 100%, var(--mint-soft), transparent 60%), " +
              "var(--card)",
          }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight">Ready to meet your Pulse?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm font-semibold text-muted-foreground">
            Jump into the dashboard and see your day at a glance.
          </p>
          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-extrabold text-background transition-transform duration-200 hover:scale-105"
          >
            Open the dashboard
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[var(--track)] px-4 py-8 text-center">
        <p className="text-xs font-bold text-muted-foreground">
          Pulse — your daily health, in view.
        </p>
      </footer>
    </main>
  );
}