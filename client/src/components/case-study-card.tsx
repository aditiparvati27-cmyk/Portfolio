import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface CaseStudyCardProps {
  title: string;
  subtitle: string;
  company: string;
  situation: string;
  approach: string[];
  impact: string;
  outcome: string;
  screenshot?: string;
  index: number;
}

export function CaseStudyCard({
  title,
  subtitle,
  company,
  situation,
  approach,
  impact,
  outcome,
  screenshot,
  index
}: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`case-${index}`} className="border border-border/50 rounded-lg bg-card hover:bg-card/80 transition-colors">
          <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-secondary/20 rounded-lg transition-colors">
            <div className="text-left flex-1">
              <h3 className="font-serif text-xl font-semibold text-foreground">{title}</h3>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant="secondary" className="text-xs py-1 px-2 font-normal">{company}</Badge>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          </AccordionTrigger>
          
          <AccordionContent className="px-6 py-6 space-y-6 border-t border-border/30">
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="inline-block w-1 h-1 rounded-full bg-primary" />
                The Situation
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {situation}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="inline-block w-1 h-1 rounded-full bg-primary" />
                My Approach
              </h4>
              <ul className="space-y-2">
                {approach.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <span className="block mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-secondary/30 border border-border/50 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <TrendingUp className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-1">Impact</p>
                  <p className="text-foreground font-semibold">{impact}</p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/10 border border-border/50 rounded-lg p-6">
              <p className="text-foreground leading-relaxed">
                <span className="font-semibold">Outcome: </span>
                <span className="text-muted-foreground">{outcome}</span>
              </p>
            </div>

            {screenshot && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <img 
                  src={screenshot} 
                  alt={`${title} screenshot`}
                  className="w-full rounded-lg border border-border/50 shadow-sm"
                />
              </motion.div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
}
