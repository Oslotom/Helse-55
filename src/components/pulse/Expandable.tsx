import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandableProps {
  isExpanded: boolean;
  children: ReactNode;
}

export function Expandable({ isExpanded, children }: ExpandableProps) {
  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          key="content"
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}