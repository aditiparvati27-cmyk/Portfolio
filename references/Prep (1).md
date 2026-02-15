### **Tell me about a time when your team or company was undergoing change. How did that impact you, and how did you adapt?**

At my previous company, we went through a major organizational shift. After the unfortunate passing of one of the co-founders, the company had to rebuild leadership and restructure how teams were distributed globally.

For several years, the U.S. team was largely sales-focused, with no dedicated product or technology team. That changed when the company decided to build a new engineering and product hub in India. I joined with the expectation that my role would be primarily product-focused—working on feature development, managing developers, and contributing to product roadmaps.However, as the company continued to evolve, leadership decided to move not just engineering and product, but also **key operations functions** to India. That shift significantly expanded my scope and required me to adapt quickly beyond my original role.

Instead of treating the change as a distraction from my product responsibilities, I leaned into it. Because I had already been working closely on payment flows and renewal logic from a product perspective, leadership asked me to shadow the renewals and customer support teams.

I took this as an opportunity to deeply understand the operational side of the business. I learned how renewals, payments, and customer escalations actually worked end-to-end—not just how they were designed on paper.

As I ramped up, I began documenting workflows and drafting SOPs to clearly define processes that previously lived only in people’s heads. This helped standardize operations and made it easier to onboard new team members as the India team grew.

The documentation and process clarity reduced confusion across teams and made renewals and payment handling more consistent.This experience taught me how important adaptability and ownership are, especially in fast-growing or changing organizations.

### Describe a time when you failed

In my previous role, I worked closely with enterprise customers to understand their needs and translate them into product improvements. During a sales enablement session, we identified a customer with nearly 800 licenses who needed different products assigned to different users.

At the time, license assignment was a highly manual process. While there was an internal workaround where developers could bulk-assign licenses using organization credentials, it wasn’t scalable or customer-facing.

I identified this as a potential product opportunity and took ownership of proposing a bulk license assignment tool. The goal was to reduce operational effort and support anticipated growth in enterprise customers with complex licensing needs.

I drafted a product proposal outlining why a bulk licensing feature could be valuable and aligned with future customer growth. The idea received buy-in from the product team and leadership, including the CTO, and I led the initiative through development.

However, I made two critical mistakes:

* I **underestimated development complexity**, assuming it could be delivered in two weeks.

* I **did not validate the business impact rigorously enough** — I relied on anecdotal customer cases rather than concrete data around frequency, revenue impact, or time savings.

As development progressed, edge cases and technical dependencies surfaced, extending the project to over a month. Testing and bug fixes further delayed release.

he feature did not meaningfully increase revenue, reduce time spent, or unlock new sales, and it introduced ongoing maintenance overhead due to bugs.

In retrospect, this represented a poor return on engineering investment and a missed opportunity to allocate resources to higher-impact initiatives

I took full responsibility for this outcome. While the idea had leadership support, the failure was in my judgment and planning.

This experience fundamentally changed how I evaluate product ideas. I now pressure-test every initiative against three questions:

1. Will this drive revenue?

2. Will it meaningfully reduce time or operational effort?

3. Will it unlock new customer adoption or sales?

If the answer is no to all three, it doesn’t justify the build. Since then, I’ve been much more disciplined about validating impact before advocating for development work.

### **Tell me about a problem that you solved in a unique or creative way. What was the outcome?**

When our customer success and technical support operations were being built out in India, we noticed a major bottleneck. Most of our application was built on Salesforce, but many support team members didn’t yet have deep Salesforce or database knowledge.

As a result, even simple customer queries—like reporting errors—were taking over an hour to resolve, which impacted response times and customer satisfaction.

Leadership initially suggested Salesforce certifications and deeper product training, which made sense long term but wasn’t a short-term fix. Training would take weeks or months, while customers needed faster responses immediately.

Instead of waiting for formal training, I reframed the problem: the issue wasn’t effort, it was **access to the right knowledge at the right moment**.

We already had extensive internal documentation—over a thousand pages—covering product behavior, edge cases, and known issues. I experimented with AI tools and created a lightweight internal knowledge assistant (NotebookLM) by uploading this documentation into structured AI notebooks, organized by product.

Because of platform limits, I created multiple notebooks and carefully curated the sources. It took me about two to three days to set up the full system.

Once the support team started using it, the results were immediate. They could quickly identify where to look for answers, understand the underlying Salesforce objects involved, and resolve issues without escalating or guessing.

This reduced average resolution time by roughly **75%**, helped the team close cases on time, and significantly improved confidence within the support team—even without deep Salesforce expertise.”

This experience reinforced for me that creative problem-solving isn’t always about building new systems—it’s often about **unlocking value from what already exists**. By focusing on speed, practicality, and user needs, we were able to deliver real impact without waiting on long-term solutions.

### **Describe a time when you had to balance competing priorities under pressure. How did you manage it?**

In my previous role, I was working across multiple functions at the same time. Along with my product responsibilities, I was also embedded with the billing and licensing customer support team to understand their workflows, since these operations were being transitioned to our India team.

At the same time, I was leading product-side initiatives that involved coordinating with developers, stakeholders, and integrating a third-party open-source tool into Salesforce.

Both responsibilities were customer-facing and high impact.

* On the support side, there were daily customer cases with a strict 24-hour response expectation.

* On the product side, there were ongoing deliverables that required deep focus and coordination.

The challenge was that both demanded time and attention, and trying to treat them as equally urgent was not sustainable.”

I stepped back and evaluated impact and urgency. Customer billing and licensing issues were time-sensitive and directly affected customer trust, while the product work, although important, could tolerate a short delay without long-term risk.

I consciously prioritized resolving customer cases to meet SLAs and maintain customer confidence. At the same time, I proactively communicated with my product manager, explained the situation, and aligned on pushing the product timeline by a few days.

This approach allowed us to maintain timely customer responses and avoid escalation on critical billing issues, while still moving product work forward with adjusted expectations. Because the tradeoff was communicated early, there was no surprise or downstream disruption.

This experience reinforced that prioritization isn’t about doing everything—it’s about protecting the most time-sensitive and high-impact outcomes. Also learned the importance of transparent communication

### **Describe a situation where you had to analyze information and make a recommendation. What was your thought process, and what was the outcome?**

Situation \- Capital One TA  
how the shift from traditional search to AI-powered search—tools like ChatGPT, Gemini, and Claude  
They had a very broad initial question: *Which LLMs are customers using, what are users actually asking inside these tools, and how can Capital One improve its visibility in what is essentially a black box?*  
The first thing I did was **narrow the scope**, because the original question was too broad to act on. Instead of trying to analyze every LLM or infer user prompts directly—which isn’t realistically observable—I reframed the problem to focus on *measurable outcomes*.  
What technologies can Capital One invest in to reliably measure and improve visibility on LLM platforms for small business credit cards?  
Based on the analysis, I recommended investing in an external LLM visibility platform—specifically **Profound**—rather than building in-house or relying on traditional SEO tools.  
The recommendation directly influenced an **$800K investment decision**. Leadership valued that the recommendation wasn’t just about adopting new technology, but about *reducing uncertainty* and enabling measurable experimentation in a rapidly changing search landscape.

### When was the last time you thought outside the box? What inspired you to do so?

I reframed the problem. Instead of asking *when* to upsell, I asked *when customers are most open to learning*.

I proposed giving existing customers a **free trial of the full product suite immediately after renewal**, rather than during renewal. This removed commercial pressure, aligned with a moment of goodwill, and allowed customers to experience the value organically.

In parallel, I recommended structured training sessions for customers and consultants. Many implementations were done by external Salesforce consultants who left after go-live, which meant customers didn’t fully understand the breadth of the product. Education became a lever for adoption rather than sales pressure

