import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoadmapItem {
  type: "work" | "education";
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  companyDescription?: string;
  skills?: string[];
}

interface RoadmapProps {
  items: RoadmapItem[];
}

export function Roadmap({ items }: RoadmapProps) {
  return (
    <div className="relative border-l border-border ml-3 md:ml-6 space-y-12 py-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative pl-8 md:pl-12"
        >
          {/* Timeline Dot */}
          <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
          
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
            <h3 className="text-xl font-serif font-semibold text-foreground">{item.title}</h3>
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 mt-1 sm:mt-0">
              <Calendar className="h-3.5 w-3.5" />
              {item.period}
            </span>
          </div>

          <div className="mb-4">
            <div className="text-base font-medium text-foreground/80 flex items-center gap-2">
              {item.type === 'work' ? <Briefcase className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
              {item.company}
              <span className="text-muted-foreground font-normal text-sm hidden sm:inline">• {item.location}</span>
            </div>
            <div className="text-sm text-muted-foreground sm:hidden mt-1">{item.location}</div>
            {item.companyDescription && (
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed italic">{item.companyDescription}</p>
            )}
          </div>

          <div className="text-muted-foreground leading-relaxed text-sm md:text-base space-y-2">
            {item.description.map((desc, i) => (
              <p key={i} className="flex gap-2">
                <span className="block mt-2 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                <span>{desc}</span>
              </p>
            ))}
          </div>
          
          {item.skills && (
            <div className="flex flex-wrap gap-2 mt-4">
               {item.skills.map(skill => (
                 <Badge key={skill} variant="secondary" className="text-xs font-normal">
                   {skill}
                 </Badge>
               ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
