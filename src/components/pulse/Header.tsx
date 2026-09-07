import { Bell, Search } from "lucide-react";
import { Badge } from "./primitives";
import { user } from "@/data/pulse-data";

export function Header() {
  return (
    <header className="rise-in flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className="flex size-11 items-center justify-center rounded-full text-sm font-extrabold"
          style={{ backgroundColor: "var(--mint-soft)" }}
          aria-hidden
        >
          {user.name.slice(0, 1)}
        </div>
        <div>
          <p className="text-lg font-extrabold tracking-tight">
            {user.greeting}, {user.name}!
          </p>
          <p className="text-xs text-muted-foreground">{user.today}</p>
          <p className="mt-1.5">
            <Badge tone="mint">Recoveddry22: {user.recovery}</Badge>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Search"
          className="card-soft flex size-10 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
        >
          <Search className="size-4 text-muted-foreground" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="card-soft relative flex size-10 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
        >
          <Bell className="size-4 text-muted-foreground" />
          <span
            className="absolute top-2 right-2.5 size-2 rounded-full"
            style={{ backgroundColor: "var(--amber)" }}
          />
        </button>
      </div>
    </header>
  );
}
