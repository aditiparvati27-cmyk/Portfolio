import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "$1.5M UPSELL REVENUE",
  "$800K INVESTMENT INFLUENCED",
  "75% SUPPORT CASES RESOLVED BY AI",
  "60% MORE INBOUND LEADS",
  "700+ WONGA FINANCE MEMBERS",
  "130+ SESSIONS HOSTED",
  "PATENT HOLDER",
  "IEEE PUBLISHED",
  "SALESFORCE CERTIFIED AI ASSOCIATE",
  "VERCEL FAN",
  "CLAUDE CODE DAILY USER",
];

export function Ticker() {
  const tickerText = TICKER_ITEMS.join("  \u2022  ");
  // Duplicate for seamless loop
  const fullText = `${tickerText}  \u2022  ${tickerText}  \u2022  `;

  return (
    <div className="w-full overflow-hidden bg-primary py-3 sm:py-4">
      <motion.div
        className="whitespace-nowrap flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        <span className="text-gold font-mono text-xs sm:text-sm font-semibold tracking-wider">
          {fullText}
        </span>
      </motion.div>
    </div>
  );
}
