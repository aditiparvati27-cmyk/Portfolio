import { motion } from "framer-motion";

const specLines = [
  { label: "Current Build", value: "Dartmouth MEM '26" },
  { label: "Previous Build", value: "DSCE Bengaluru '24" },
  { label: "Base Location", value: "Hanover, NH (formerly Bengaluru)" },
  { label: "Primary Fuel", value: "Masala Chai" },
  { label: "Backup Fuel", value: "Iced Coffee (sad)" },
  { label: "AI Stack", value: "Claude Code + Replit + n8n" },
  { label: "Bad At", value: "Sports (NH is a sports town, ironic)" },
  { label: "Superpower", value: "Turning ambiguity into revenue" },
  { label: "Languages", value: "English, Kannada, Hindi, Product, Prompt" },
];

export function ProductSpecCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-foreground text-primary-foreground rounded-lg p-5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed shadow-lg"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="w-3 h-3 rounded-full bg-destructive inline-block" />
        <span className="w-3 h-3 rounded-full bg-gold inline-block" />
        <span className="w-3 h-3 rounded-full bg-primary inline-block" />
      </div>
      <div className="mt-3">
        <p className="text-gold font-bold mb-1">PRODUCT SPEC: Aditi Parvati v2.0</p>
        <p className="text-primary-foreground/40 mb-3">{'='/*.repeat(36)*/}====================================</p>
        {specLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:gap-2 mb-1.5"
          >
            <span className="text-primary-foreground/60 shrink-0 sm:w-36">{line.label}:</span>
            <span className="text-primary-foreground">{line.value}</span>
          </motion.div>
        ))}
        <div className="mt-3 pt-3 border-t border-primary-foreground/10">
          <span className="text-primary-foreground/60">Status: </span>
          <span className="text-gold font-bold animate-pulse">OPEN TO OPPORTUNITIES</span>
          <span className="text-primary-foreground/40"> [active]</span>
        </div>
      </div>
    </motion.div>
  );
}
