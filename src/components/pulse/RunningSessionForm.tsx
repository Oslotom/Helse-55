import { Link } from "@tanstack/react-router";

export function RunningSessionForm() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="distance" className="block text-sm font-medium text-muted-foreground">
            Distance
          </label>
          <input
            type="text"
            id="distance"
            className="mt-1 block w-full rounded-md border-input bg-transparent p-2"
            placeholder="0.0"
          />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-muted-foreground">
            Time
          </label>
          <input
            type="text"
            id="time"
            className="mt-1 block w-full rounded-md border-input bg-transparent p-2"
            placeholder="00:00"
          />
        </div>
        <div>
          <label htmlFor="pace" className="block text-sm font-medium text-muted-foreground">
            Pace
          </label>
          <input
            type="text"
            id="pace"
            className="mt-1 block w-full rounded-md border-input bg-transparent p-2"
            placeholder="0'00''"
          />
        </div>
      </div>
      <Link
        to="/workout"
        className="mt-6 block w-full rounded-md bg-foreground py-3 text-center font-bold text-background"
      >
        Start
      </Link>
    </div>
  );
}