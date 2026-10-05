import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SleepComponent } from "./SleepComponent";
import { WeightComponent } from "./WeightComponent";

const components = [SleepComponent, WeightComponent];

export function AnimatedHealthCards() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % components.length);
    }, 5000); // Change card every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const CurrentComponent = components[index];

  return (
    <div className="relative h-96 w-full max-w-xs">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <CurrentComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}