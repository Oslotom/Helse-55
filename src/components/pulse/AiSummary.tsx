
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', value: 7.5 },
  { name: 'Tue', value: 8 },
  { name: 'Wed', value: 6 },
  { name: 'Thu', value: 7 },
  { name: 'Fri', value: 8.5 },
  { name: 'Sat', value: 9 },
  { name: 'Sun', value: 7 },
];

export function AiSummary() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <motion.div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold">Your Week in a Nutshell</div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="pt-4">
          <p className="text-muted-foreground">
            This week, you've been sleeping pretty well, with an average of 7.5 hours per night. You've also been quite active, with an average of 10,000 steps per day. Keep up the good work!
          </p>
          <div className="mt-4 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}