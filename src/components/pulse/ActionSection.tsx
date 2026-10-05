import { Link } from "@tanstack/react-router";
import { Dumbbell, BrainCircuit, Bot, Scale } from "lucide-react";

export function ActionSection() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Link
        to="/workout"
        className="flex items-center gap-4 rounded-xl bg-card p-4 text-left transition-colors hover:bg-card/70"
      >
        <Dumbbell className="size-6 text-sky-500" />
        <div>
          <p className="font-bold">Start workout</p>
          <p className="text-sm text-muted-foreground">Track a new activity</p>
        </div>
      </Link>
      <button className="flex items-center gap-4 rounded-xl bg-card p-4 text-left transition-colors hover:bg-card/70">
        <BrainCircuit className="size-6 text-rose-500" />
        <div>
          <p className="font-bold">Log mood</p>
          <p className="text-sm text-muted-foreground">Check in with your feelings</p>
        </div>
      </button>
      <button className="flex items-center gap-4 rounded-xl bg-card p-4 text-left transition-colors hover:bg-card/70">
        <Bot className="size-6 text-teal-500" />
        <div>
          <p className="font-bold">AI summary</p>
          <p className="text-sm text-muted-foreground">Get a weekly overview</p>
        </div>
      </button>
      <button className="flex items-center gap-4 rounded-xl bg-card p-4 text-left transition-colors hover:bg-card/70">
        <Scale className="size-6 text-violet-500" />
        <div>
          <p className="font-bold">Add weight</p>
          <p className="text-sm text-muted-foreground">Log a new measurement</p>
        </div>
      </button>
    </div>
  );
}