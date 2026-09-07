export type Tone = "mint" | "sky" | "amber" | "lavender";

export const toneColor: Record<Tone, string> = {
  mint: "var(--mint)",
  sky: "var(--sky)",
  amber: "var(--amber)",
  lavender: "var(--lavender)",
};

export const toneSoft: Record<Tone, string> = {
  mint: "var(--mint-soft)",
  sky: "var(--sky-soft)",
  amber: "var(--amber-soft)",
  lavender: "var(--lavender-soft)",
};
