import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workout")({
  component: Workout,
});

function Workout() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Active Workout</h1>
      <div className="mt-4 h-64 rounded-md bg-muted"></div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Distance</p>
          <p className="text-2xl font-bold">0.0</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Time</p>
          <p className="text-2xl font-bold">00:00</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Pace</p>
          <p className="text-2xl font-bold">0'00''</p>
        </div>
      </div>
    </div>
  );
}