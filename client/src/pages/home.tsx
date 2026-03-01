import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Roadmap } from "@/components/roadmap";
import { CaseStudyCard } from "@/components/case-study-card";
import { Chatbot } from "@/components/chatbot";
import { Ticker } from "@/components/ticker";
import { StatCard } from "@/components/stat-card";
import { ProductSpecCard } from "@/components/product-spec-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Mail, Linkedin, FileText, Download, ArrowRight, ArrowDown, BookOpen,
  ExternalLink, TrendingUp, Users, Github, Globe, FileCode2, Menu, X, Phone
} from "lucide-react";
import profilePhoto from "@assets/professional-headshot.jpeg";
import jiraScreenshot from "@assets/image_1766854017021.png";
import libraryClaudePhoto from "@assets/library-claude-session.jpeg";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const experiences = [
    {
      type: "work" as const,
      title: "Associate Product Manager",
      company: "Apsona Inc. (B2B SaaS)",
      location: "Bengaluru, India",
      period: "Sep 2024 - Aug 2025",
      companyDescription: "Apsona simplifies data management on Salesforce. ~25-person team across US + India.",
      description: [
        "$6M in ARR and 4x ACV growth by redesigning the quote-to-cash workflow for bundled pricing.",
        "$1.5M in upsell revenue + 67% reduction in delayed payments via renewal lifecycle automation.",
        "60% increase in AppExchange inbound leads through algorithm research + listing optimization.",
        "75% of support cases resolved without escalation. Built AI knowledge base using NotebookLM in 3 days.",
        "30% reduction in manual case handling via ACH payments integration (Stripe).",
        "Built KPI dashboards from scratch for the 5-person renewals team."
      ],
      skills: ["B2B SaaS", "Revenue Ops", "Salesforce", "Stripe", "NotebookLM"]
    },
    {
      type: "work" as const,
      title: "Product Development Intern",
      company: "Kinara Capital",
      location: "Bengaluru, India",
      period: "May 2024 - Jul 2024",
      companyDescription: "Kinara Capital is a socially responsible fintech committed to driving last-mile financial inclusion for small business entrepreneurs in India.",
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
      companyDescription: "The Media Ant is an ad-tech platform for media discovery, planning, and execution of marketing campaigns. Served 3,500+ brands with 350,000+ advertising options.",
      description: [
        "Accelerated time-to-market by ~25% for features representing $2.2M in ARR using RICE prioritization.",
        "Reduced manual campaign setup effort by 70% via UX wireframes + 75+ user stories.",
        "Diagnosed a 33% post-add-to-cart drop-off using Google Analytics + Microsoft Clarity.",
        "Implemented A/B-tested UX improvements that increased conversion rates across the funnel."
      ],
      skills: ["RICE Prioritization", "UX Wireframing", "Roadmapping", "Analytics"]
    },
    {
      type: "work" as const,
      title: "Backend Developer Intern",
      company: "BlackBerry India Pvt. Ltd.",
      location: "Bengaluru, India",
      period: "Jul 2023 - Aug 2023",
      description: [
        "Built proof-of-concept for passwordless authentication using secure REST APIs.",
        "Presented MVP to BlackBerry's Cloud Security team."
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
        "Dartmouth Consulting Club: Pro-bono consultant for Accruely (a startup)",
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

  const skillsWithTooltips = [
    { name: "Salesforce", tooltip: "Built renewal workflows that generated $1.5M in upsell" },
    { name: "SQL", tooltip: "Diagnosed 33% conversion drop-off at The Media Ant" },
    { name: "Figma", tooltip: "Designed 70+ wireframes for campaign planning tool" },
    { name: "Jira", tooltip: "Managed 85+ feature backlog using RICE prioritization" },
    { name: "Agile & Scrum", tooltip: "Ran sprint cycles at Apsona across US + India teams" },
    { name: "Tableau", tooltip: "Built KPI dashboards for 5-person renewals team" },
    { name: "Google Analytics", tooltip: "Identified post-cart drop-off, improved conversion" },
    { name: "NotebookLM", tooltip: "Built AI knowledge base that resolved 75% of support cases" },
    { name: "Product Management", tooltip: "End-to-end product lifecycle across 4 companies" },
    { name: "Stakeholder Communication", tooltip: "Weekly reviews with C-suite at The Media Ant" },
    { name: "Pricing Strategy", tooltip: "Redesigned quote-to-cash for bundled pricing at Apsona" },
    { name: "Market Research", tooltip: "Evaluated 10+ vendors for CRM replacement at Kinara" },
    { name: "Wireframing", tooltip: "75+ user stories translated into UX flows" },
    { name: "Go-to-Market (GTM)", tooltip: "60% inbound lead increase via AppExchange optimization" },
    { name: "Claude Code", tooltip: "Built this portfolio and Kriyo AI using Claude Code" },
  ];

  const projects = [
    {
      title: "Enterprise AI Visibility Strategy: Capital One",
      role: "Project Manager",
      period: "Sep\u2013Nov 2025",
      desc: "Capital One watching traditional search die as AI tools (ChatGPT, Gemini, Claude) take over. Narrowed an impossibly broad question to one actionable one: What technology can Capital One invest in to reliably measure and improve LLM visibility for small business credit cards? Recommended Profound, an external LLM visibility platform.",
      insight: "The best product thinking isn't about adding. It's about narrowing.",
      pdfUrl: "/llm-marketing-presentation.pdf",
      tags: ["AI/LLM", "Strategy", "Market Research"],
      metric: "$800K investment influenced"
    },
    {
      title: "Kriyo AI: Salesforce Natural Language Query Tool",
      role: "Builder / PM",
      period: "2025",
      desc: "RevOps teams spend 90+ minutes/day manually retrieving Salesforce data. Designed an intent classification system and multi-step query pipeline that auto-generates SOQL from natural language inputs. Reduced manual retrieval from 90 min/day to near-zero.",
      insight: "I built this because I lived the pain. At Apsona, I watched teammates spend hours in Salesforce just getting data.",
      tags: ["AI", "Salesforce", "NLP", "SOQL"],
      metric: "90 min/day \u2192 near-zero"
    },
    {
      title: "AI-Guided Echocardiography",
      role: "Team Lead \u2014 12-person cross-functional team",
      period: "Aug 2022 \u2013 Mar 2024",
      desc: "Rural India has a severe shortage of echocardiography operators. Led 12 engineers across electronics, medical electronics, and CS to design an AI-guided ultrasound solution. 2+ years of research.",
      insight: "Engineering isn't just about circuits. It's about the person at the end of the wire.",
      tags: ["AI", "Healthcare", "IEEE"],
      metric: "IEEE published"
    },
    {
      title: "Sentiment Stream",
      role: "Builder \u00B7 Product & Platform Engineer",
      period: "2025",
      desc: "Real-time social media sentiment analysis pipeline built entirely on Cloudflare's edge infrastructure \u2014 no servers, no cold starts, zero ops overhead.",
      tags: ["Cloudflare Workers", "D1", "Workers AI", "NLP", "Edge Computing"],
      githubUrl: "https://github.com/aditiparvati27-cmyk/Sentiment_Stream",
      liveUrl: "https://f461a94c.product-insights-dashboard.pages.dev/"
    },
    {
      title: "Territory Slicer",
      role: "Builder \u00B7 Algorithm & Product Engineer",
      period: "2025",
      desc: "A browser-native sales territory optimizer that solves a classic NP-hard bin-packing problem in milliseconds. MinHeap-powered greedy algorithm with post-greedy swap refinement.",
      tags: ["TypeScript", "React", "MinHeap", "Sales Ops"],
      githubUrl: "https://github.com/aditiparvati27-cmyk/Territory_Slicer",
      liveUrl: "https://territory-slicer-two.vercel.app/",
      docsUrl: "https://gist.github.com/aditiparvati27-cmyk/f88397a180b790d6c3753b55e6781dee"
    },
    {
      title: "Wonga Finance",
      role: "Co-founder",
      period: "2020\u20132024",
      desc: "My dad showed me an options trade. Only 16.7% of Indian college students knew basic finance. Started with 3 friends. Grew to 700+ members, 130+ sessions. Still running under the next generation after I graduated.",
      insight: "The fact that it outlived my involvement is, honestly, the metric I'm most proud of.",
      tags: ["Finance", "Community", "Leadership", "Education"],
      metric: "700+ members, 130+ sessions"
    }
  ];

  const certifications = [
    { title: "Salesforce Certified AI Associate", issuer: "Salesforce", date: "January 2025", url: "https://sforce.co/verifycerts" },
    { title: "Agile With Atlassian Jira", issuer: "Coursera", date: "May 2024", url: "https://www.coursera.org/account/accomplishments/verify/MBRKMGFVJAD5" },
    { title: "Data Analysis and Visualization Foundations", issuer: "IBM / Coursera", date: "August 2022", url: "https://www.coursera.org/account/accomplishments/specialization/certificate/EMPK9JE67YTK" },
    { title: "Python for Data Science, AI & Development", issuer: "Coursera", date: "Completed", url: "https://www.coursera.org/account/accomplishments/verify/2YB5FJ26KFY9" },
    { title: "Salesforce Administrator Certification", issuer: "Salesforce", date: "Completed", url: "https://smartinternz.com/internships/salesforce_certificates/77fbfe9c9116dbd570174ed214e77d9c" },
  ];

  const caseStudies = [
    {
      title: "The Renewal Machine",
      subtitle: "How I generated $1.5M in upsell revenue and gave teams their time back",
      company: "Apsona Inc.",
      situation: "When I joined Apsona's Renewals team, I noticed something: we were losing revenue not because customers didn't want to renew, but because our procurement process was clunky. Payment delays meant late renewals. Manual outreach meant missed opportunities. A 3-person team was drowning in administrative work instead of strategic customer conversations.",
      situationDetails: "The Renewals team was handling 1,800+ accounts manually. Each renewal cycle meant countless back-and-forth emails, manual invoice generation, and payment chasing. Customers wanted to renew, but the friction in the process created delays that translated directly to revenue loss.",
      approachTitle: "My Approach",
      approachDetails: [
        { subtitle: "Shadow & Listen (Week 1)", description: "I shadowed the renewals team for about a month, understanding the key pain points\u2014broken workflows, technical bugs, and inefficiencies in our Salesforce setup." },
        { subtitle: "Analyze & Design (Week 2-3)", description: "I analyzed how our backend payment system and Salesforce automation worked to identify leverage points. I identified three critical bottlenecks: quote approval delays, manual invoice processing, and reactive payment follow-ups." },
        { subtitle: "Build & Test (Week 4-6)", description: "I built Salesforce workflows from scratch and revisited our quote-to-cash workflow. First on Sandbox to test edge cases, then refined based on team feedback." },
        { subtitle: "Implement & Rollout (Week 7-8)", description: "Rolled out the automation in Developer Console, followed by full Production rollout. Trained the team and established weekly KPI reviews." }
      ],
      impact: "$1.5M in upsell revenue | 67% reduction in delayed payments | 3-person team freed up for strategic work",
      outcome: "The Renewal Machine transformed our revenue operations from reactive to proactive. What took 3 people 40+ hours per week of manual work now runs on automation."
    },
    {
      title: "From Chaos to Clarity: Transforming a Product Backlog",
      subtitle: "How I built a system that accelerated delivery velocity by 25% using RICE prioritization",
      company: "The Media Ant",
      situation: "When I joined as a Product Manager Intern, the company had 85+ features scattered across different tracking systems. Some were months old, some were duplicates, and some were half-baked ideas from customer calls.",
      situationDetails: "I opened the backlog and found chaos: features in Google Sheets, Slack messages, and people's heads. Product, Engineering, Sales, and Business Units all had different opinions on what to build next, but no shared framework for making decisions.",
      approachTitle: "My Approach",
      approachDetails: [
        { subtitle: "Diagnose the Problem", description: "I spent Week 1 shadowing 8 stakeholder meetings across Product, Engineering, Business Units, R&D, Marketing, and Customer Success." },
        { subtitle: "Evaluate Solutions", description: "Evaluated five product management platforms (Aha!, Productboard, Jira Product Discovery, Linear, and Coda) against our specific needs." },
        { subtitle: "Recommend & Justify", description: "Recommended Jira Product Discovery: 60% cheaper than Aha!, native Jira integration, built-in RICE framework." },
        { subtitle: "Build the System", description: "Facilitated cross-functional scoring sessions with Product, Engineering, Sales, and Business Unit leads for RICE prioritization." },
        { subtitle: "Drive Adoption", description: "Established weekly roadmap review sessions with the CEO, CTO, COO, and leadership." }
      ],
      impact: "Sprint velocity increased by ~25% | Features representing $2.2M in ARR delivered faster | Emergency requests from Sales reduced by ~40%",
      outcome: "The prioritization system unlocked speed through structure. Faster delivery, less context switching, better team morale, and revenue that aligned with product strategy.",
      screenshot: jiraScreenshot,
      keyLearnings: [
        "Prioritization is as much about people as data. RICE provided objectivity, but the real work was facilitating conversations.",
        "Structure unlocks speed. Breaking the mess into a clear hierarchy gave everyone a shared mental model.",
        "A framework is worthless without buy-in. Involving stakeholders meant they owned the roadmap.",
        "Tools should fit your team\u2014not the other way around. Adoption beats perfection."
      ]
    }
  ];

  const storyChapters = [
    {
      number: "01",
      title: "The Nomadic Childhood",
      content: [
        "I grew up moving. By the time I graduated high school, I had attended more than 6 schools across India and the US.",
        "In 4th grade, we moved to California. In 7th grade, I was in Seattle, where I saw technology used as a learning tool for the first time. Back in India, it was considered a distraction. That perspective shift followed me everywhere.",
        "All that moving gave me something: I can walk into any room, any culture, any team, any country, and find common ground fast. Diversity isn't a checkbox for me. It's how I was built.",
        "(Now I'm in Hanover, NH, where the trees outnumber the people, the winters are genuinely alarming, and the community is extraordinary.)"
      ]
    },
    {
      number: "02",
      title: "Dad and the Click That Changed Everything",
      content: [
        "My father had his share of struggles, but he gave me something early that most people spend years figuring out: the idea that earning money matters, but knowing how to manage it matters more.",
        "He taught me what financial literacy actually meant. And then he showed me, practically: sitting me down, walking me through his investments, explaining his thinking out loud. Finance wasn't a classroom subject in our house. It was a live demonstration.",
        "The more I understood, the more I wanted to build things that gave other people that same leverage. That curiosity led to Wonga Finance, then to Kinara Capital, and eventually to product management, where I realized that the best products do exactly what my father did: take something complex and make it work for real people.",
        "He's the reason I care about impact that's actually measurable."
      ]
    },
    {
      number: "03",
      title: "The Flight to Hanover",
      content: [
        "I'd spent a year as a product manager. Shipped real products, driven real revenue, learned hard lessons. But I knew I had gaps: in strategy, in frameworks, in how truly great products are built at scale.",
        "So I packed up and moved from 30\u00B0C Bengaluru to -20\u00B0C Hanover, NH.",
        "Hanover has a population of about 11,000. There are more trees than people. (And zero chai shops.)",
        "But Dartmouth has something that makes up for all of it: people who are genuinely obsessed with building things that matter. And that is worth the cold."
      ]
    },
    {
      number: "04",
      title: "What I'm Building Toward",
      content: [
        "Short-term: I want to work at a technology company where I can move fast, take real ownership, and build products that change how people work or live. Fintech is one direction. AI products are another. Consumer tech, B2B SaaS, platforms that give people more leverage. All of it interests me.",
        "What I care about: Products at the intersection of AI and people. Not just products that make things faster, but products that give humans more capability.",
        "Long-term: Build something of my own. Take the lesson my dad taught me, that the right information, at the right moment, can change everything, and build a company around it.",
        "Wonga Finance was the proof of concept. The company I'll build one day is the full vision.",
        "Engineering solutions empower communities. The best products don't just solve technical problems. They help people make better decisions about their lives. That's what I'm building toward."
      ]
    }
  ];

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#case-studies", label: "Case Studies" },
    { href: "#projects", label: "Projects" },
    { href: "#story", label: "My Story" },
    { href: "#ai-tools", label: "AI & Tools" },
    { href: "#certifications", label: "Certs" },
    { href: "#blogs", label: "Blogs" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-primary">AP.</span>
          <div className="hidden md:flex gap-4 lg:gap-6 text-xs sm:text-sm font-medium items-center">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-primary transition-colors">{link.label}</a>
            ))}
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-2.5 py-0.5 font-normal">
              Available for opportunities
            </Badge>
          </div>
          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-background pt-16"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 text-lg font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Badge className="bg-primary/10 text-primary border-primary/20 text-sm px-3 py-1 font-normal mt-4">
                Available for opportunities
              </Badge>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-16 pb-0">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-5 relative z-10"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs sm:text-sm font-mono text-muted-foreground tracking-wider uppercase"
              >
                Bengaluru &rarr; Hanover, NH &#9992;&#65039;
              </motion.p>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight">
                <span className="text-primary">Hi, I'm Aditi.</span> <span className="inline-block">&#128075;</span>
              </h1>
              <p className="font-serif text-xl sm:text-2xl text-foreground/80 leading-snug">
                Product Manager. Dartmouth MEM '26.<br />
                <span className="text-muted-foreground text-lg sm:text-xl">(Yes, I survived the winter.)</span>
              </p>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                I moved from Bangalore's beautiful chaos to a town where the Appalachian Trail
                starts on the main street, the average age is 23, and people describe -20&deg;C
                winters as "brisk." I build products that drive real revenue and I've been doing
                it with AI before it was cool. Currently powered by Mochas, Claude Code, and a
                deeply questionable amount of optimism.
              </p>

              <div className="flex flex-wrap gap-3 pt-3">
                <Button className="rounded-full px-6 py-5 text-sm" asChild>
                  <a href="#contact">
                    Let's Talk <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="rounded-full px-6 py-5 text-sm" asChild>
                  <a href="#experience">
                    See My Work <ArrowDown className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <a
                  href="/attached_assets/Aditi-Parvati_Resume_(26)_1766756461117.pdf"
                  target="_blank"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors self-center ml-1"
                >
                  <Download className="h-3.5 w-3.5" /> Resume
                </a>
              </div>
            </motion.div>

            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:flex justify-center items-center relative"
            >
              <img
                src={profilePhoto}
                alt="Aditi Parvati"
                className="w-72 h-80 md:w-80 md:h-[22rem] object-cover rounded-2xl shadow-xl border-2 border-border/30"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-3 -left-3 bg-card border border-border rounded-full px-3 py-1.5 shadow-md"
              >
                <span className="text-sm">&#9749; Powered by Mochas</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 mt-16 sm:mt-20 border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm"
          >
            <StatCard icon="&#128176;" value={6} prefix="$" suffix="M" label="ARR Driven" />
            <StatCard icon="&#128200;" value={4} suffix="x" label="ACV Growth" />
            <StatCard icon="&#129302;" value="3+" suffix="" label="AI Tools Built" />
            <StatCard icon="&#127795;" value="1M+" label="Trees in Hanover" />
          </motion.div>
        </div>
      </section>

      {/* Scrolling Ticker */}
      <div className="mt-12 sm:mt-16">
        <Ticker />
      </div>

      <main className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 max-w-5xl">

        {/* About Section */}
        <section id="about" className="mb-20 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-2">The Person Behind the PRDs</h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-8 sm:mb-12 max-w-2xl">
              (And Behind the Claude Code Prompts)
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">
            {/* Product Spec Card */}
            <div className="md:col-span-2">
              <ProductSpecCard />
            </div>

            {/* Story Text */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-3 text-muted-foreground leading-relaxed text-sm sm:text-base space-y-4"
            >
              <p>
                Growing up, I attended 6+ schools across India and the US. California in 4th grade, Seattle in 7th, back to Bengaluru, and now Hanover, NH.
              </p>
              <p>
                Each move taught me something most PMs don't have: I can walk into any room, any culture, any team, and find common ground fast.
              </p>
              <p>
                I'm at Dartmouth now, studying Engineering Management, building things with Claude Code, drinking bad chai, and working as a pro-bono consultant for a startup called Accruely. The learning never really stops.
              </p>
            </motion.div>
          </div>

          {/* Skills with Tooltips */}
          <TooltipProvider delayDuration={200}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-10 sm:mt-14"
            >
              <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 sm:mb-6">Key Skills <span className="text-xs font-normal">(hover for context)</span></h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skillsWithTooltips.map((skill, i) => (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 + i * 0.03 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <Badge variant="secondary" className="bg-primary/5 hover:bg-primary/10 border border-primary/15 text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-3 font-normal cursor-pointer transition-all">
                          {skill.name}
                        </Badge>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-xs">
                      <p>{skill.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          </TooltipProvider>

          {/* Fun Facts Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 sm:mt-14"
          >
            {[
              { icon: "&#9992;&#65039;", value: "6+", label: "Schools growing up" },
              { icon: "&#127758;", value: "3", label: "Countries lived in" },
              { icon: "&#129302;", value: "Daily", label: "Claude Code user" },
              { icon: "&#127795;", value: "1M+", label: "Trees in Hanover" },
            ].map((fact, i) => (
              <div key={i} className="text-center p-4 bg-card border border-border/30 rounded-lg">
                <span className="text-xl sm:text-2xl" dangerouslySetInnerHTML={{ __html: fact.icon }} />
                <p className="font-mono font-bold text-primary text-lg mt-1">{fact.value}</p>
                <p className="text-xs text-muted-foreground">{fact.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-20 sm:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-3xl mb-8 sm:mb-12"
          >
            Education
          </motion.h2>
          <Roadmap items={education} />
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-20 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-2">I Don't Just Ship Features. I Ship Revenue.</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Here's what I've actually built, with the numbers that matter, the lessons that didn't come easy, and a couple things I'd do differently.
            </p>
          </motion.div>
          <Roadmap items={experiences} />
        </section>

        {/* Case Studies Section */}
        <section id="case-studies" className="mb-20 sm:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-3xl mb-4 sm:mb-8"
          >
            Case Studies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base"
          >
            Click on any case study to explore the details of my work
          </motion.p>
          <div className="space-y-4">
            {caseStudies.map((caseStudy, i) => (
              <CaseStudyCard
                key={i}
                title={caseStudy.title}
                subtitle={caseStudy.subtitle}
                company={caseStudy.company}
                situation={caseStudy.situation}
                situationDetails={(caseStudy as any).situationDetails}
                approachTitle={(caseStudy as any).approachTitle}
                approachDetails={(caseStudy as any).approachDetails}
                impact={caseStudy.impact}
                outcome={caseStudy.outcome}
                screenshot={(caseStudy as any).screenshot}
                keyLearnings={(caseStudy as any).keyLearnings}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-2">Projects That Actually Mattered</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Not homework assignments. Real problems, real stakeholders, real impact.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(45, 106, 79, 0.08)" }}
                className="group relative p-4 sm:p-6 bg-card border border-border/50 hover:border-primary/30 transition-all rounded-lg flex flex-col"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                  <div className="flex-1">
                    <h3 className="font-serif text-base sm:text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">{project.role} &bull; {project.period}</p>
                  </div>
                </div>
                {(project as any).metric && (
                  <div className="mb-3 inline-flex">
                    <Badge className="bg-gold/10 text-gold-foreground border-gold/20 text-xs font-mono">
                      {(project as any).metric}
                    </Badge>
                  </div>
                )}
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed flex-1">
                  {project.desc}
                </p>
                {(project as any).insight && (
                  <p className="text-xs text-primary/80 italic mt-3 border-l-2 border-gold/40 pl-3">
                    {(project as any).insight}
                  </p>
                )}
                {project.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.map((tag: string, ti: number) => (
                      <Badge key={ti} variant="secondary" className="text-xs py-0.5 px-2 font-normal bg-secondary/40">{tag}</Badge>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
                  {(project as any).githubUrl && (
                    <a href={(project as any).githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  )}
                  {(project as any).liveUrl && (
                    <a href={(project as any).liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
                      <Globe className="h-3.5 w-3.5" /> Live Demo
                    </a>
                  )}
                  {(project as any).docsUrl && (
                    <a href={(project as any).docsUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
                      <FileCode2 className="h-3.5 w-3.5" /> Algorithm Deep Dive
                    </a>
                  )}
                  {(project as any).pdfUrl && (
                    <a href={(project as any).pdfUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
                      <FileText className="h-3.5 w-3.5" /> View Presentation
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* My Story Section */}
        <section id="story" className="mb-20 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10 sm:mb-14"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-2">
              How a Kid from Bengaluru Ended Up in -20&deg; New Hampshire
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              (And Why Every Detour Was Worth It)
            </p>
          </motion.div>

          <div className="space-y-12 sm:space-y-16">
            {storyChapters.map((chapter, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="font-mono text-xs sm:text-sm font-bold text-primary">{chapter.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-4">{chapter.title}</h3>
                    <div className="space-y-3 text-muted-foreground leading-relaxed text-sm sm:text-base">
                      {chapter.content.map((paragraph, pi) => (
                        <p key={pi}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI & Tools Section */}
        <section id="ai-tools" className="mb-20 sm:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10 sm:mb-14"
          >
            <h2 className="font-serif text-3xl sm:text-4xl mb-2">
              I Don't Just Use AI. I Build With It.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
              Claude Code, n8n, NotebookLM, Replit. These aren't just buzzwords on my resume. They're how I work every day. From building Kriyo AI to automating support resolution with NotebookLM, I treat AI as a serious product tool, not a gimmick.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* AI Achievements */}
            <div className="space-y-4">
              {[
                {
                  icon: "\u{1F916}",
                  title: "AI Knowledge Base",
                  desc: "75% of support cases resolved without escalation using an AI knowledge base I built with NotebookLM in 3 days."
                },
                {
                  icon: "\u{1F50D}",
                  title: "Kriyo AI",
                  desc: "Built a Salesforce natural language query tool that reduced manual retrieval from 90 min/day to near-zero."
                },
                {
                  icon: "\u{1F4CA}",
                  title: "LLM Visibility Strategy",
                  desc: "Recommended Profound as an external visibility platform for Capital One. The team influenced $800K in investment."
                },
                {
                  icon: "\u{2728}",
                  title: "This Website",
                  desc: "Built with Claude Code. Because the best way to prove you can build with AI is to actually build with AI."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-4 sm:p-5 bg-card border border-border/50 hover:border-primary/20 rounded-lg transition-all"
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="font-serif font-semibold text-sm sm:text-base mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Photo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={libraryClaudePhoto}
                  alt="Working with Claude Code in the library"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm font-medium">A typical afternoon: coffee + Claude Code</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Claude Code", "NotebookLM", "n8n", "Replit", "Vercel"].map((tool, i) => (
                  <Badge key={i} variant="secondary" className="bg-primary/5 border border-primary/15 text-xs py-1 px-2.5 font-normal">
                    {tool}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="mb-20 sm:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-3xl mb-8 sm:mb-12"
          >
            Certifications
          </motion.h2>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {certifications.map((cert, i) => (
              <motion.a
                key={i}
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="group relative p-4 sm:p-5 bg-card border border-border/50 hover:border-primary/20 transition-all rounded-lg"
              >
                <div className="space-y-2">
                  <h3 className="font-serif text-base sm:text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">{cert.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                    <p className="text-xs sm:text-sm text-muted-foreground">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground">{cert.date}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Blogs Section */}
        <section id="blogs" className="mb-20 sm:mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-2xl sm:text-3xl mb-8 sm:mb-12"
          >
            Latest Articles
          </motion.h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            <motion.a
              href="https://medium.com/@aditiparvati2/password-less-authentication-85cef1b67181"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(45, 106, 79, 0.08)" }}
              className="group relative p-4 sm:p-6 bg-card border border-border/50 hover:border-primary/30 transition-all rounded-lg"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-3 sm:h-4 w-3 sm:w-4 text-muted-foreground shrink-0" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Medium</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-xl font-semibold group-hover:text-primary transition-colors">Passwordless Authentication</h3>
                </div>
                <ExternalLink className="h-4 sm:h-5 w-4 sm:w-5 opacity-0 group-hover:opacity-100 transition-all text-muted-foreground shrink-0 ml-2" />
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
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
              whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(45, 106, 79, 0.08)" }}
              className="group relative p-4 sm:p-6 bg-card border border-border/50 hover:border-primary/30 transition-all rounded-lg"
            >
              <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-3 sm:h-4 w-3 sm:w-4 text-muted-foreground shrink-0" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Medium</span>
                  </div>
                  <h3 className="font-serif text-base sm:text-xl font-semibold group-hover:text-primary transition-colors">Brand Discovery in AI Models</h3>
                </div>
                <ExternalLink className="h-4 sm:h-5 w-4 sm:w-5 opacity-0 group-hover:opacity-100 transition-all text-muted-foreground shrink-0 ml-2" />
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                The new era of brand discovery: Why enterprises need visibility inside AI models.
              </p>
            </motion.a>
          </div>
        </section>

        {/* Contact/Footer Section */}
        <section id="contact" className="py-12 sm:py-20 border-t border-border">
          <div className="text-center space-y-6 sm:space-y-8">
            <h2 className="font-serif text-3xl sm:text-4xl mb-2 sm:mb-4">Let's Build Something Together</h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base px-2">
              I'm always open to interesting conversations about product, AI tools, or the best mocha spots in Hanover (I've done the field research).
            </p>
            <div className="flex justify-center gap-5 sm:gap-8 flex-wrap">
              <a
                href="mailto:aditiparvati27@gmail.com"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm sm:text-base"
              >
                <Mail className="h-4 sm:h-5 w-4 sm:w-5" />
                <span>Email</span>
              </a>
              <a
                href="tel:+16033221700"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm sm:text-base"
              >
                <Phone className="h-4 sm:h-5 w-4 sm:w-5" />
                <span>(603) 322-1700</span>
              </a>
              <a
                href="https://www.linkedin.com/in/aditi-parvati/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm sm:text-base"
              >
                <Linkedin className="h-4 sm:h-5 w-4 sm:w-5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="/attached_assets/Aditi-Parvati_Resume_(26)_1766756461117.pdf"
                target="_blank"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm sm:text-base"
              >
                <FileText className="h-4 sm:h-5 w-4 sm:w-5" />
                <span>Resume</span>
              </a>
            </div>
            <div className="pt-8 sm:pt-12 space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Built with Claude Code (Opus 4.6). Deployed on Vercel. Powered by Mochas.
              </p>
              <p className="text-xs text-muted-foreground/60 italic">
                Yes, I built this myself. No, I did not write every line manually. Yes, that is kind of the point.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Chatbot />
    </div>
  );
}
