import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Zap } from "lucide-react";
import { runningData, weightliftingData } from "@/data/session-data";
import { RunningSessionForm } from "./RunningSessionForm";

export function AddSession() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionType, setSessionType] = useState<"running" | "weightlifting" | null>(null);

  const handleSession = (type: "running" | "weightlifting") => {
    setSessionType(type);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSessionType(null);
  };

  return (
    <>
      <div className="fixed bottom-20 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center rounded-full bg-foreground p-4 text-background shadow-lg transition-transform duration-200 hover:scale-110"
          aria-label="Start a new session"
        >
          <Plus className="size-6" />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="card-glass slide-up fixed inset-x-0 bottom-0 z-50 rounded-t-3xl p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {sessionType ? `Running Session` : "Start a new session"}
              </h2>
              <button onClick={handleClose} className="p-2">
                <X className="size-5" />
              </button>
            </div>
            {sessionType === "running" ? (
              <RunningSessionForm />
            ) : (
              <div className="mt-6 grid gap-4">
                <button
                  onClick={() => handleSession("running")}
                  className="flex items-center gap-4 rounded-xl bg-background/50 p-4 text-left transition-colors hover:bg-background/70"
                >
                  <Zap className="size-6 text-sky-500" />
                  <div>
                    <p className="font-bold">Start running session</p>
                    <p className="text-sm text-muted-foreground">Track your pace, distance, and time.</p>
                  </div>
                </button>
                <button
                  onClick={() => handleSession("weightlifting")}
                  className="flex items-center gap-4 rounded-xl bg-background/50 p-4 text-left transition-colors hover:bg-background/70"
                >
                  <Zap className="size-6 text-amber-500" />
                  <div>
                    <p className="font-bold">Start weightlifting session</p>
                    <p className="text-sm text-muted-foreground">Log your exercises, sets, and reps.</p>
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}