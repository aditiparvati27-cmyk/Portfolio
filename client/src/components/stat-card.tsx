import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface StatCardProps {
  icon: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export function StatCard({ icon, value, suffix = "", prefix = "", label, decimals = 0 }: StatCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const isNumber = typeof value === "number";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center p-4 sm:p-6"
    >
      <span className="text-2xl sm:text-3xl mb-2">{icon}</span>
      <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight">
        {isNumber && inView ? (
          <CountUp
            start={0}
            end={value}
            duration={2.5}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            useEasing
          />
        ) : (
          <span>{prefix}{value}{suffix}</span>
        )}
      </div>
      <span className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">{label}</span>
    </motion.div>
  );
}
