import { motion } from "framer-motion";
import { Roadmap } from "@/components/roadmap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, Linkedin, FileText, Download, ArrowRight, BookOpen, ExternalLink, TrendingUp, Users } from "lucide-react";
import heroBg from "@assets/generated_images/minimalist_abstract_architectural_shapes_in_soft_white_and_light_gray.png";
import profilePhoto from "@assets/WhatsApp_Image_2025-12-26_at_7.27.54_PM_1766757495634.jpeg";

export default function Home() {
  const experiences = [
    {
      type: "work" as const,
      title: "Associate Product Manager",
      company: "Apsona Inc. (B2B SaaS)",
      location: "Bengaluru, India",
      period: "Sep 2024 - Aug 2025",
      description: [
        "Improved Technical Sales and Revenue Operations efficiency by reducing invoice processing time by 80% through redesign of Salesforce-based workflows.",
        "Generated $1.5M in upsell revenue and reduced delayed payments by 67% by designing end-to-end renewal lifecycle workflows.",
        "Drove 60% increase in AppExchange inbound leads by optimizing listing based on platform algorithm research.",
        "Led implementation of ACH payments (via Stripe), cutting manual case handling by 30% and improving user experience for 1,800+ customers.",
        "Enabled Renewals team to proactively identify at-risk accounts by building KPI dashboards."
      ],
      skills: ["B2B SaaS", "Revenue Ops", "Salesforce", "Stripe Integration"]
    },
    {
      type: "work" as const,
      title: "Product Development Intern",
      company: "Kinara Capital",
      location: "Bengaluru, India",
      period: "May 2024 - Jul 2024",
      description: [
        "Reduced CRM platform costs by 80% through vendor cost analysis and leading stakeholder interviews.",
        "Coordinated cross-functional workshops and prepared BRDs for a new Loan Management System."
      ],
      skills: ["CRM Analysis", "BRD", "Loan Management"]
    },
    {
      type: "work" as const,
      title: "Product Manager Intern",
      company: "The Media Ant",
      location: "Bengaluru, India",
      period: "Feb 2024 - May 2024",
      description: [
        "Accelerated time-to-market by ~25% for features representing $2.2M in ARR using RICE prioritization.",
        "Reduced manual campaign setup effort by 70% by translating user research into UX wireframes."
      ],
      skills: ["RICE Prioritization", "UX Wireframing", "Roadmapping"]
    },
    {
      type: "work" as const,
      title: "Backend Developer Intern",
      company: "BlackBerry India Pvt. Ltd.",
      location: "Bengaluru, India",
      period: "Jul 2023 - Aug 2023",
      description: [
        "Developed a proof-of-concept and designed an MVP for passwordless authentication using secure REST APIs."
      ],
      skills: ["Authentication", "REST APIs", "MVP"]
    }
  ];

  const education = [
    {
      type: "education" as const,
      title: "Master's Degree, Engineering Management",
      company: "Dartmouth College",
      location: "Hanover, NH",
      period: "Expected Dec 2026",
      description: [
        "Coursework: Marketing, Product Management, Operations Management, Strategy, Technology Assessment, Negotiations",
        "Teaching Assistant for Technology Assessment",
        "Focus Areas: Product Management and New Product Development"
      ]
    },
    {
      type: "education" as const,
      title: "Bachelor of Engineering, Electronics & Communication",
      company: "Dayananda Sagar College of Engineering",
      location: "Bengaluru, India",
      period: "Jun 2024",
      description: [
        "Core Member of the Finance Club",
        "Active in Entrepreneurship and Innovation Club and Public Relations and Operations"
      ]
    }
  ];

  const skills = [
    "Product Management", "Stakeholder Communication", "Agile & Scrum", "Data Analytics", 
    "Pricing Strategy", "Market Research", "Wireframing", "UI/UX Design", "Go-to-Market (GTM)",
    "Tableau", "SQL", "Salesforce", "Figma", "Jira", "Google Analytics 4"
  ];

  const projects = [
     {
      title: "Dartmouth College - LLM Marketing Strategy",
      role: "Project Manager",
      period: "Sept 2025 - Nov 2025",
      desc: "Influenced $800K AI marketing technology investment for Fortune 500 client by leading strategic assessment of 10+ AI/LLM marketing platforms."
     },
     {
      title: "AI Guided Echocardiography",
      role: "Team Lead",
      period: "Aug 2022 - Mar 2024",
      desc: "Led a cross-functional team to design an AI-guided ultrasound solution; secured provisional patent and achieved 'Most Innovative Project' award."
     }
  ];

  const caseStudies = [
    {
      title: "The Renewal Machine",
      subtitle: "How I generated $1.5M in upsell revenue and gave teams their time back",
      company: "Apsona Inc.",
      situation: "When I joined Apsona's Renewals team, I noticed something: we were losing revenue not because customers didn't want to renew, but because our procurement process was clunky. Payment delays meant late renewals. Manual outreach meant missed opportunities. A 3-person team was drowning in administrative work instead of strategic customer conversations.",
      approach: [
        "Shadowed the renewals team for about a month, understanding the key pain points—broken workflows and technical bugs.",
        "Analyzed how our backend payment system and automation worked to identify leverage points.",
        "Built Salesforce workflows and revisited our quote-to-cash workflow first on Sandbox, then Production.",
        "Rolled out the automation in Developer Console, followed by full Production rollout."
      ],
      impact: "$1.5M in upsell revenue | 67% reduction in delayed payments | 3-person team freed up for strategic work",
      outcome: "The Renewal Machine transformed our revenue operations from reactive to proactive, empowering the team to focus on customer relationships instead of admin work."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif font-bold text-xl tracking-tight">AP.</span>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
            <a href="#case-studies" className="hover:text-primary transition-colors">Case Studies</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#blogs" className="hover:text-primary transition-colors">Blogs</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
        
        {/* Hero Section */}
        <section className="mb-32 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 relative z-10"
            >
              <div className="inline-block">
                <Badge variant="outline" className="px-3 py-1 text-sm font-normal rounded-full border-primary/20 bg-primary/5 text-primary">
                  Product Manager
                </Badge>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-primary">
                Aditi Parvati
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                Designing scalable solutions and driving product growth through data-driven strategies and empathetic user experiences.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="rounded-full px-8 py-6 text-base" asChild>
                  <a href="mailto:aditiparvati27@gmail.com">
                    <Mail className="mr-2 h-4 w-4" /> Get in Touch
                  </a>
                </Button>
                <Button variant="outline" className="rounded-full px-8 py-6 text-base" asChild>
                  <a href="/attached_assets/Aditi-Parvati_Resume_(26)_1766756461117.pdf" target="_blank" download>
                    <Download className="mr-2 h-4 w-4" /> Download Resume
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:flex justify-end items-start"
            >
              <img 
                src={profilePhoto} 
                alt="Aditi Parvati" 
                className="w-80 h-80 object-cover border border-border shadow-sm"
              />
            </motion.div>
          </div>

           {/* Abstract Background Element */}
           <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1.5 }}
            className="absolute top-0 right-0 -z-10 w-full md:w-1/2 h-full opacity-50 pointer-events-none"
          >
            <div className="w-full h-full bg-gradient-to-bl from-background via-transparent to-transparent absolute inset-0 z-10" />
            <img 
              src={heroBg} 
              alt="Abstract Minimalist Background" 
              className="w-full h-full object-cover mix-blend-multiply opacity-40 grayscale"
            />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-32">
          <h2 className="font-serif text-3xl mb-8">About Me</h2>
          <div className="prose prose-lg text-muted-foreground leading-relaxed">
            <p className="mb-4">
              I am currently pursuing a Master's in Engineering Management at Dartmouth College, building on a strong technical foundation in Electronics and Communication Engineering.
            </p>
            <p>
              My professional journey spans across B2B SaaS, FinTech, and Marketing Tech, where I've successfully led product initiatives that reduced costs, optimized revenue operations, and enhanced user experiences. I thrive at the intersection of technology, business strategy, and user-centric design.
            </p>
          </div>
          
          <div className="mt-12">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">Key Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="bg-secondary/50 hover:bg-secondary text-sm py-1.5 px-3 font-normal">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-3xl">Professional Roadmap</h2>
            <span className="text-sm text-muted-foreground hidden sm:block">2023 — Present</span>
          </div>
          <Roadmap items={experiences} />
        </section>

        {/* Education Section */}
        <section className="mb-32">
          <h2 className="font-serif text-3xl mb-12">Education</h2>
          <Roadmap items={education} />
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className="mb-32">
          <h2 className="font-serif text-3xl mb-12">Case Studies</h2>
          {caseStudies.map((caseStudy, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <h3 className="font-serif text-3xl font-semibold text-foreground">{caseStudy.title}</h3>
                <p className="text-lg text-muted-foreground font-light">{caseStudy.subtitle}</p>
                <Badge variant="secondary" className="text-sm py-1.5 px-3 font-normal">{caseStudy.company}</Badge>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary" />
                    The Situation
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {caseStudy.situation}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span className="inline-block w-1 h-1 rounded-full bg-primary" />
                    My Approach
                  </h4>
                  <ul className="space-y-2">
                    {caseStudy.approach.map((item, idx) => (
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
                      <p className="text-foreground font-semibold">{caseStudy.impact}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border/50 rounded-lg p-6">
                  <p className="text-foreground leading-relaxed">
                    <span className="font-semibold">Outcome: </span>
                    <span className="text-muted-foreground">{caseStudy.outcome}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <h2 className="font-serif text-3xl mb-12">Featured Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-6 bg-card border border-border/50 hover:border-border transition-colors rounded-lg hover:shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                     <h3 className="font-serif text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                     <p className="text-sm text-muted-foreground mt-1">{project.role} • {project.period}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Blogs Section */}
        <section id="blogs" className="mb-32">
          <h2 className="font-serif text-3xl mb-12">Latest Articles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.a
              href="https://medium.com/@aditiparvati2/password-less-authentication-85cef1b67181"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative p-6 bg-card border border-border/50 hover:border-border transition-colors rounded-lg hover:shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Medium</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold group-hover:text-primary transition-colors">Passwordless Authentication</h3>
                </div>
                <ExternalLink className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all text-muted-foreground shrink-0 ml-2" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Exploring the future of authentication and how passwordless systems are transforming security.
              </p>
            </motion.a>

            <motion.a
              href="https://medium.com/@aditiparvati2/the-new-era-of-brand-discovery-why-enterprises-need-visibility-inside-ai-models-45ab91388a92"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative p-6 bg-card border border-border/50 hover:border-border transition-colors rounded-lg hover:shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Medium</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold group-hover:text-primary transition-colors">Brand Discovery in AI Models</h3>
                </div>
                <ExternalLink className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all text-muted-foreground shrink-0 ml-2" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The new era of brand discovery: Why enterprises need visibility inside AI models.
              </p>
            </motion.a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 border-t border-border">
          <div className="text-center space-y-8">
            <h2 className="font-serif text-4xl mb-4">Let's Connect</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              I'm always open to discussing new opportunities, product strategies, or just chatting about the latest in tech.
            </p>
            <div className="flex justify-center gap-6">
              <a 
                href="mailto:aditiparvati27@gmail.com"
                className="flex items-center gap-2 text-foreground hover:text-primary/70 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>Email</span>
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary/70 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="/attached_assets/Aditi-Parvati_Resume_(26)_1766756461117.pdf"
                target="_blank"
                className="flex items-center gap-2 text-foreground hover:text-primary/70 transition-colors"
              >
                <FileText className="h-5 w-5" />
                <span>Resume</span>
              </a>
            </div>
            <p className="text-sm text-muted-foreground pt-12">
              © 2025 Aditi Parvati. Built with modern web technologies.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
