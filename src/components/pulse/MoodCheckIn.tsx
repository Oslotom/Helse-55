import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pill } from "./primitives";
import { cn } from "@/lib/utils";
import { moodOptions, feelingTags } from "@/data/pulse-data";
import { todayKey, loadEntry, saveEntry, useLiveMoodEntry, type MoodKey } from "@/lib/mood-storage";

export function MoodCheckIn() {
  const [open, setOpen] = useState(false);
  const today = useLiveMoodEntry(todayKey);
  const [mood, setMood] = useState<MoodKey | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [note, setNote] = useState("");

  function openForm() {
    const existing = loadEntry(todayKey);
    setMood(existing?.mood ?? null);
    setTags(existing?.tags ?? []);
    setNote(existing?.note ?? "");
    setOpen(true);
  }

  function toggleTag(tag: string) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function handleSave() {
    if (!mood) return;
    saveEntry(todayKey, { mood, tags, note });
    setOpen(false);
  }

  const todayMoodOption = today ? moodOptions.find((m) => m.key === today.mood) : undefined;

  return (
    <>
      <button
        type="button"
        onClick={openForm}
        aria-label={today ? `Edit today's mood: ${todayMoodOption?.label}` : "Log how you feel today"}
        className="fixed right-4 bottom-24 z-30 flex size-14 items-center justify-center rounded-full text-2xl shadow-lg transition-transform duration-200 hover:scale-105"
        style={{ backgroundColor: "var(--mint)", boxShadow: "var(--shadow-soft)" }}
      >
        {todayMoodOption ? todayMoodOption.emoji : <Plus className="size-6 text-white" />}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How are you feeling today?</DialogTitle>
            <DialogDescription>Log your mood and anything that stands out.</DialogDescription>
          </DialogHeader>

          <div className="flex justify-between gap-1">
            {moodOptions.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setMood(m.key)}
                className={cn(
                  "flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-2xl transition-all duration-150",
                  mood === m.key ? "scale-105" : "opacity-60 hover:opacity-100",
                )}
                style={{ backgroundColor: mood === m.key ? "var(--mint-soft)" : "transparent" }}
              >
                <span>{m.emoji}</span>
                <span className="text-[10px] font-bold text-muted-foreground">{m.label}</span>
              </button>
            ))}
          </div>

          <div>
            <p className="mb-2 text-xs font-bold text-muted-foreground">What's going on?</p>
            <div className="flex flex-wrap gap-1.5">
              {feelingTags.map((tag) => (
                <Pill
                  key={tag}
                  tone="sky"
                  active={tags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </Pill>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold text-muted-foreground">Notes (optional)</p>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything else worth remembering about today..."
              className="rounded-xl"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave} disabled={!mood}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
