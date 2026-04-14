import { useEffect, useState, useCallback } from "react";
import "./profound-deck.css";

const TOTAL = 12;
const MAIN = 8;

export default function ProfoundPortfolio() {
  const [cur, setCur] = useState(0);
  const [leaving, setLeaving] = useState<"left" | "right" | null>(null);

  const go = useCallback((n: number) => {
    if (n < 0 || n >= TOTAL || n === cur) return;
    const dir = n > cur ? "left" : "right";
    setLeaving(dir);
    setTimeout(() => {
      setCur(n);
      setLeaving(null);
    }, 300);
  }, [cur]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        go(cur + 1);
      }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        go(cur - 1);
      }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(TOTAL - 1);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [cur, go]);

  // Touch swipe
  useEffect(() => {
    let tx = 0;
    const onStart = (e: TouchEvent) => { tx = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) go(dx < 0 ? cur + 1 : cur - 1);
    };
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
    };
  }, [cur, go]);

  const pct = ((cur + 1) / TOTAL) * 100;
  const counterLabel = cur < MAIN
    ? `${String(cur + 1).padStart(2, "0")} / ${String(MAIN).padStart(2, "0")}`
    : `A${cur - MAIN} / A${TOTAL - MAIN}`;

  const slideClass = (i: number) => {
    if (i === cur) return "pd-slide active";
    if (leaving && i === cur) return `pd-slide leaving-${leaving}`;
    return "pd-slide";
  };

  // All slide content as array for cleaner rendering
  const slides = [
    // S1 — COVER
    <div className={slideClass(0)} id="ps1" key="s1">
      <div className="s1-grid" />
      <div className="s1-ghost">P</div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="s1-pill"><span className="s1-pill-dot" />Strategy Brief — March 2026</div>
        <h1 className="s1-title">Profound<br />has one<br /><em>blind spot.</em></h1>
        <div className="s1-rule" />
        <p className="s1-sub">
          Agent Analytics shows which AI bots visited your client's site.
          It cannot show whether an agent <strong>tried to transact — and failed.</strong><br /><br />
          WebMCP, live in Chrome 146 since March 10, makes that measurable.
          <strong> No competitor has built it. Adobe is one sprint away.</strong>
        </p>
        <a
          href="https://webmcp-demo-bay.vercel.app/#catalogue"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "20px",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "#EDE9E1",
            border: "1px solid rgba(255,255,255,.3)",
            padding: "7px 16px",
            textDecoration: "none",
            transition: "background .2s, border-color .2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,.08)";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,.55)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,.3)";
          }}
        >
          ↗ Live WebMCP Demo
        </a>
      </div>
      <div className="s1-stats">
        <div className="ss"><div className="ss-n">$262B</div><div className="ss-l">AI-influenced retail sales, holiday 2025</div></div>
        <div className="ss"><div className="ss-n">40%</div><div className="ss-l">Real-world agent task failure rate</div></div>
        <div className="ss"><div className="ss-n">~6 mo</div><div className="ss-l">Until Adobe connects their two products</div></div>
        <div className="ss"><div className="ss-n">$0</div><div className="ss-l">AEO tooling built for WebMCP today</div></div>
      </div>
    </div>,

    // S2 — THE GAP
    <div className={slideClass(1)} id="ps2" key="s2" dangerouslySetInnerHTML={{
      __html: `
<div class="eyebrow">01 — The Blind Spot</div>
<h2 class="pd-h2">The question Profound<br>can't answer <em>yet.</em></h2>
<table class="gap-table" style="margin-top:16px">
  <thead><tr><th style="width:150px">Capability</th><th>Agent Analytics — can see today</th><th>The gap — cannot see yet</th></tr></thead>
  <tbody>
    <tr><td>Bot ID</td><td class="good"><span class="sym">✓</span><strong>GPTBot, ClaudeBot, PerplexityBot</strong> — agent vs. human at CDN level</td><td style="color:var(--muted);font-style:italic">N/A</td></tr>
    <tr><td>Page access</td><td class="good"><span class="sym">✓</span><strong>Which pages, crawl depth,</strong> frequency, time-on-page</td><td style="color:var(--muted);font-style:italic">N/A</td></tr>
    <tr><td>Citation link</td><td class="good"><span class="sym">✓</span>"ChatGPT crawled this → <strong>cited you 3 days later</strong>"</td><td style="color:var(--muted);font-style:italic">N/A</td></tr>
    <tr class="gap"><td>Tool calls</td><td style="font-style:italic;opacity:.4">Not visible</td><td class="bad"><span class="sym">✗</span><strong>Agent called search_products() on your site.</strong> WebMCP tool invocations don't appear in current CDN logs.</td></tr>
    <tr class="gap"><td>Task outcome</td><td style="font-style:italic;opacity:.4">Not visible</td><td class="bad"><span class="sym">✗</span><strong>Agent failed on checkout_cart() and went to Walmart.</strong> This transaction loss is invisible.</td></tr>
    <tr class="gap"><td>Benchmarks</td><td style="font-style:italic;opacity:.4">Not visible</td><td class="bad"><span class="sym">✗</span><strong>Walmart now completes 23% more agent tasks.</strong> No platform can benchmark this.</td></tr>
  </tbody>
</table>
<div class="callout red" style="margin-top:18px"><p>A Fortune 500 CMO will ask: <strong>"How many agent transactions attempted on our site — and how many went to a competitor?"</strong> When that hits a renewal meeting, it's a churn risk on a $250K–$800K contract.</p></div>
`}} />,

    // S3 — WEBMCP
    <div className={slideClass(2)} id="ps3" key="s3" dangerouslySetInnerHTML={{
      __html: `
<div class="eyebrow">02 — The Fix</div>
<h2 class="pd-h2">Websites stop being pages.<br>They become <em>APIs agents call.</em></h2>
<div class="ba-wrap">
  <div class="ba-col">
    <div class="ba-header"><span class="ba-header-t">How agents browse today</span><span class="chip old">Current</span></div>
    <div class="ba-row"><div class="ba-ico">📸</div><div class="ba-text">Screenshots the page. Vision model burns <strong>2,000+ tokens</strong> guessing layout. $0.08 per action.</div></div>
    <div class="ba-row"><div class="ba-ico">🖱️</div><div class="ba-text">Parses DOM, synthesizes clicks. <strong>Breaks every UI update</strong> — typically weekly.</div></div>
    <div class="ba-row"><div class="ba-ico">🔐</div><div class="ba-text">Login doesn't transfer. OAuth wall. <strong>Agent redirects to a competitor.</strong></div></div>
    <div class="ba-stats"><div class="bstat"><div class="bstat-v">~45%</div><div class="bstat-l">Accuracy</div></div><div class="bstat"><div class="bstat-v">30–60s</div><div class="bstat-l">Latency</div></div><div class="bstat"><div class="bstat-v">$0.08</div><div class="bstat-l">Per action</div></div></div>
  </div>
  <div class="ba-arrow">→</div>
  <div class="ba-col new">
    <div class="ba-header"><span class="ba-header-t">After WebMCP — Chrome 146, March 10</span><span class="chip new">Live Now</span></div>
    <div class="ba-row"><div class="ba-ico">📋</div><div class="ba-text">Website declares <strong>search_products()</strong> with plain-English description. Agent discovers without scraping.</div></div>
    <div class="ba-row"><div class="ba-ico">⚡</div><div class="ba-text">Agent calls <strong>navigator.modelContext.getTools()</strong> — structured call, zero pixel guessing.</div></div>
    <div class="ba-row"><div class="ba-ico">🔑</div><div class="ba-text">Inherits user's browser session. <strong>Zero extra authentication.</strong></div></div>
    <div class="ba-code"><span class="fn">navigator.modelContext</span>.registerTool({<br>&nbsp;&nbsp;name: <span class="str">"search_products"</span>,<br>&nbsp;&nbsp;description: <span class="str">"Find items by query + filters"</span>,<br>&nbsp;&nbsp;inputSchema: { query, maxPrice, category }<br>})</div>
    <div class="ba-stats"><div class="bstat"><div class="bstat-v">~98%</div><div class="bstat-l">Accuracy</div></div><div class="bstat"><div class="bstat-v">~5s</div><div class="bstat-l">Latency</div></div><div class="bstat"><div class="bstat-v">−89%</div><div class="bstat-l">Token cost</div></div></div>
  </div>
</div>
<p style="font-size:14px;font-weight:300;color:var(--muted);margin-top:16px;line-height:1.6">Source: arXiv study, 1,890 live API calls — p&lt;.001. Brands will adopt WebMCP for cost + reliability reasons alone. <strong style="color:var(--muted)">The question is only whether Profound instruments it first.</strong></p>
`}} />,

    // S4 — THE MOAT
    <div className={slideClass(3)} id="ps4" key="s4" dangerouslySetInnerHTML={{
      __html: `
<div class="eyebrow">03 — The Hidden Moat</div>
<h2 class="pd-h2">The 400M prompt dataset isn't<br>research infra. It's <em>the optimizer.</em></h2>
<div class="moat-grid">
  <div class="mc lead"><div class="mc-num">01</div><div class="mc-title">The non-obvious insight</div><div class="mc-body">WebMCP tool descriptions must match how users phrase queries to agents. "search product catalog" ≠ "find running shoes under $150" — agents miss the tool.<br><br><strong>Profound has 400M+ real user AI conversations</strong> showing exactly how people phrase commerce queries. No competitor has this. It takes years to build.</div></div>
  <div class="mc"><div class="mc-num">02</div><div class="mc-title">Analytics → Optimization product</div><div class="mc-body">Profound doesn't just <em>measure</em> your AXO Score — it <em>improves</em> it. More prompt data → better tool descriptions → higher score → more clients → more data. <strong>Compounding moat.</strong></div></div>
  <div class="mc"><div class="mc-num">03</div><div class="mc-title">CDN infra is already right</div><div class="mc-body">Agent Analytics already ingests Cloudflare, Vercel, Fastly. <strong>WebMCP events flow through the same layer.</strong> New log parser = weeks of eng, not quarters.</div></div>
  <div class="mc"><div class="mc-num">04</div><div class="mc-title">Governance, not just analytics</div><div class="mc-body">Amazon sued Perplexity for agent purchases (Nov 2025). <strong>EU AI Act: Aug 2, 2026.</strong> Brands need audit trails. Profound's CDN position is the natural compliance layer — hard deadline.</div></div>
</div>
`}} />,

    // S5 — ATTRIBUTION
    <div className={slideClass(4)} id="ps5" key="s5" dangerouslySetInnerHTML={{
      __html: `
<div class="eyebrow">04 — The Strategic Frame</div>
<h2 class="pd-h2">The attribution loop marketing<br>has <em>never closed.</em></h2>
<div class="loop-wrap">
  <div class="lp dim-lp"><div class="lp-label">LAYER 01</div><div class="lp-big">AI sees<br>your brand</div><div class="lp-title">AI mentions you</div><div class="lp-body">ChatGPT cites Target for "best athletic retailers." Profound tracks this across 10+ engines — <strong>visibility, citations, sentiment.</strong></div><span class="lp-chip has">Profound owns this today</span></div>
  <div class="lp dim-lp" style="border-left:1px solid var(--line)"><div class="lp-label">LAYER 02</div><div class="lp-big">AI visits<br>your site</div><div class="lp-title">AI agent visits you</div><div class="lp-body">Agent navigates to Target.com. <strong>Agent Analytics tracks the crawl</strong> — which pages, which platform, frequency.</div><span class="lp-chip has">Profound owns this today</span></div>
  <div class="lp glow-lp"><div class="lp-label">LAYER 03 — BUILD NOW</div><div class="lp-big">AI buys<br>from you</div><div class="lp-title">AI agent transacts</div><div class="lp-body">Agent calls <strong>search_products()</strong> then <strong>checkout_cart().</strong> Did it succeed? Fail? Redirect to a competitor? What revenue was lost?</div><span class="lp-chip build">AXO Score</span></div>
</div>
<div class="callout" style="margin-top:18px"><p>A CMO who sees: <strong>"AI visibility drove 23% more agent visits → 18% more transactions → $4.2M"</strong> has the first complete AI-to-revenue attribution in history. No platform shows this chain. Profound can — if it builds Layer 03.</p></div>
`}} />,

    // S6 — ADOBE CLOCK
    <div className={slideClass(5)} id="ps6" key="s6" dangerouslySetInnerHTML={{
      __html: `
<div class="eyebrow">05 — The Competitive Clock</div>
<h2 class="pd-h2">Adobe is the real threat.<br><em>The timeline is documented.</em></h2>
<div class="timeline">
  <div class="tl-head">Adobe's documented trajectory toward Profound's product lane</div>
  <div class="tl-row"><div class="tl-date">Oct 2025</div><div class="tl-body"><div class="tl-title">Adobe ships LLM Optimizer — GA</div><div class="tl-desc">Direct AEO market entry. AI visibility across ChatGPT, Perplexity, Claude. 20 years of Fortune 500 relationships. Watching the same market.</div><span class="tl-chip past">Happened</span></div></div>
  <div class="tl-row"><div class="tl-date">Nov 2025</div><div class="tl-body"><div class="tl-title">Adobe Developers Live — AEM ships live MCP</div><div class="tl-desc">Adobe now has <strong>(1) AEM with live MCP agent interactions</strong> and <strong>(2) LLM Optimizer AEO analytics.</strong> Two products — one sprint from being one product.</div><span class="tl-chip past">Happened</span></div></div>
  <div class="tl-row"><div class="tl-date">Mar 10 '26</div><div class="tl-body"><div class="tl-title">Chrome 146 ships WebMCP — window opens today</div><div class="tl-desc">Live in production browsers. Every major tech company is evaluating their roadmap response right now.</div><span class="tl-chip now">Now — window is open</span></div></div>
  <div class="tl-row hot"><div class="tl-date">~Q3 2026</div><div class="tl-body"><div class="tl-title">Adobe connects AEM-MCP → LLM Optimizer analytics</div><div class="tl-desc">One sprint. 18B page views of distribution, 20 years of relationships, massive engineering org. <strong>The window to own the category name is Q2 2026.</strong></div><span class="tl-chip warn">Critical threat window</span></div></div>
  <div class="tl-row hot"><div class="tl-date">Aug 2 '26</div><div class="tl-body"><div class="tl-title">EU AI Act — full enforcement on agent interactions</div><div class="tl-desc">Enterprise brands need auditable agent logs. First platform with credible governance wins compliance-driven sales — independent of competition. <strong>Hard deadline.</strong></div><span class="tl-chip warn">Regulatory forcing function</span></div></div>
</div>
`}} />,

    // S7 — AXO DASHBOARD
    <div className={slideClass(6)} id="ps7" key="s7" dangerouslySetInnerHTML={{
      __html: `
<div class="eyebrow">06 — The Product</div>
<h2 class="pd-h2">AXO Score — the metric<br><em>nobody owns yet.</em></h2>
<div class="db">
  <div class="db-topbar"><div class="db-dot"></div><div class="db-dot"></div><div class="db-dot"></div><span class="db-url">profound.ai · agent experience · target.com</span></div>
  <div class="db-tabs"><div class="db-tab">Answer Engine</div><div class="db-tab on">Agent Readiness</div><div class="db-tab">Competitors</div></div>
  <div class="db-content">
    <div class="db-left">
      <div class="db-brand">Target — Retail Category</div>
      <div class="db-sub">vs. 7 competitors · refreshed 2h ago · 3 alerts</div>
      <div class="db-score-row"><div class="db-score-n">68</div><div><div class="db-score-label">AXO Score</div><div class="db-score-delta">↓4 pts this week — Walmart added 2 new tools</div></div></div>
      <div class="dbm"><div class="dbm-row"><span class="dbm-label">WebMCP tools registered</span><span class="dbm-val">7 / 12</span></div><div class="dbm-track"><div class="dbm-fill" style="width:58%"></div></div></div>
      <div class="dbm"><div class="dbm-row"><span class="dbm-label">Agent discovery rate</span><span class="dbm-val">88%</span></div><div class="dbm-track"><div class="dbm-fill" style="width:88%"></div></div></div>
      <div class="dbm"><div class="dbm-row"><span class="dbm-label">Tool execution success</span><span class="dbm-val">61%</span></div><div class="dbm-track"><div class="dbm-fill" style="width:61%"></div></div></div>
      <div class="dbm"><div class="dbm-row"><span class="dbm-label">Schema quality vs. Profound corpus</span><span class="dbm-val">74 / 100</span></div><div class="dbm-track"><div class="dbm-fill" style="width:74%"></div></div></div>
      <div class="db-alert">⚠ <strong>Estimated lost revenue this week:</strong> Agents attempted checkout_cart() 1,247 times. 38% failed at session handoff. Walmart's success rate: 89%. Estimated loss: $340K–$1.2M.</div>
      <div class="db-cta">View recommendations →</div>
    </div>
    <div class="db-right">
      <div class="db-ins-label">// insights this week</div>
      <div class="insight-item hl"><div class="insight-title">Register checkout_cart() — highest impact</div><div class="insight-body">38% success rate via DOM fallback. Registering it + Profound's prompt-optimized schema moves Target #4 → #2. Walmart did this Tuesday.</div></div>
      <div class="insight-item warn"><div class="insight-title">Schema mismatch on search_products()</div><div class="insight-body">Current: "search catalog." Profound corpus: users say "find X under $Y." One description change closes 22% of missed calls. Zero engineering.</div></div>
      <div class="insight-item"><div class="insight-title">Best Buy moved to #2 in electronics</div><div class="insight-body">Registered filter_by_specs(), check_availability(), schedule_pickup(). AXO: 79, up from 61 four weeks ago.</div></div>
      <div class="insight-item"><div class="insight-title">EU compliance: 11% audit gap</div><div class="insight-body">89% of interactions logged. 11% gap in checkout = compliance risk before Aug 2.</div></div>
    </div>
  </div>
</div>
`}} />,

    // S8 — EXECUTION ROADMAP
    <div className={slideClass(7)} id="ps8" key="s8" dangerouslySetInnerHTML={{
      __html: `
<div class="eyebrow">The Roadmap</div>
<h2 class="pd-h2">Three priorities.<br>One quarter.<br><em>Before Adobe.</em></h2>
<div class="ask-grid">
  <div>
    <ul class="ask-items">
      <li class="ask-item"><span class="ask-n">1</span><span class="ask-text">Extend Agent Analytics with a <strong>WebMCP log parser</strong> — Cloudflare + Vercel already capture the events. New parser extracts tool invocation metadata. Weeks, not quarters.</span></li>
      <li class="ask-item"><span class="ask-n">2</span><span class="ask-text">Launch <strong>AXO Score</strong> as Profound's second category metric. Use the 400M prompt corpus for schema optimization — the moat Adobe can't replicate.</span></li>
      <li class="ask-item"><span class="ask-n">3</span><span class="ask-text">Own the <strong>attribution layer</strong> — "AI mentioned you → AI visited you → AI bought from you." Not a feature. The product category.</span></li>
    </ul>
    <p class="ask-note">Recommended sequencing for a 12-week execution window: instrument first, launch scoring second, then ship optimization loops tied to revenue impact.</p>
  </div>
  <div>
    <div class="ask-cards">
      <div class="ask-card feat"><div class="card-l">Portfolio recommendation</div><div class="card-v">Ship an AXO MVP category product before competitive convergence</div></div>
      <div class="ask-card"><div class="card-l">Execution horizon</div><div class="card-v">One quarter for parser + scoring + benchmark dashboard</div></div>
      <div class="ask-card"><div class="card-l">Core deliverables</div><div class="card-v">AXO definition · WebMCP instrumentation · schema optimization loop from prompt corpus</div></div>
    </div>
    <div class="ask-proof"><strong>Research basis:</strong> W3C Community Group Draft, Chrome 146 flag docs, arXiv benchmark (1,890 live API calls), Profound product pages, Adobe Developers Live Nov 2025 notes, Amazon v. Perplexity filing, EU AI Act Article 13, 24 competitor platforms. The 400M prompt moat, attribution loop, and Adobe timeline are original synthesis.</div>
  </div>
</div>
`}} />,

    // APPENDIX COVER
    <div className={`${slideClass(8)} apx-cover`} id="psa0" key="sa0">
      <div className="apx-cover-inner">
        <div className="apx-label-t">Appendix</div>
        <div className="apx-rule" />
        <div className="apx-big">Supporting <em>Research</em></div>
        <div className="apx-sub">Market sizing · Infrastructure plan · About the author</div>
      </div>
    </div>,

    // APPENDIX A — MARKET
    <div className={slideClass(9)} id="psa1" key="sa1" dangerouslySetInnerHTML={{
      __html: `
<div class="eyebrow">Appendix A — Market Sizing</div>
<h2 class="pd-h2">The numbers behind<br><em>every claim.</em></h2>
<div class="mkt-grid">
  <div class="mkt-cell"><div class="mkt-n">$262B</div><div class="mkt-l">AI-influenced retail revenue, holiday 2025 — 20% of all retail</div><div class="mkt-src">Salesforce Research</div></div>
  <div class="mkt-cell"><div class="mkt-n">693%</div><div class="mkt-l">YoY growth in AI-driven retail traffic, holiday 2025</div><div class="mkt-src">Adobe Analytics</div></div>
  <div class="mkt-cell"><div class="mkt-n">40%</div><div class="mkt-l">Real-world agent task failure rate, best models on WebArena</div><div class="mkt-src">Stanford / IBM Research</div></div>
  <div class="mkt-cell"><div class="mkt-n">$1T</div><div class="mkt-l">US B2C agentic commerce by 2030 — $3–5T globally</div><div class="mkt-src">McKinsey</div></div>
  <div class="mkt-cell"><div class="mkt-n">$15T</div><div class="mkt-l">B2B purchases via AI agents by 2028</div><div class="mkt-src">Gartner</div></div>
  <div class="mkt-cell"><div class="mkt-n">81%</div><div class="mkt-l">Martech leaders piloting or implementing AI agents</div><div class="mkt-src">Gartner Survey, 2025</div></div>
  <div class="mkt-cell"><div class="mkt-n">15×</div><div class="mkt-l">Growth in AI agent crawling in 2025 alone</div><div class="mkt-src">Cloudflare Year in Review</div></div>
  <div class="mkt-cell"><div class="mkt-n">44%</div><div class="mkt-l">CAGR for agentic AI — fastest growing enterprise software</div><div class="mkt-src">MarketsandMarkets</div></div>
  <div class="mkt-cell"><div class="mkt-n">Aug 2</div><div class="mkt-l">EU AI Act full enforcement — agent audit trail deadline</div><div class="mkt-src">EU Reg. 2024/1689</div></div>
</div>
`}} />,

    // APPENDIX B — INFRA
    <div className={slideClass(10)} id="psa2" key="sa2" dangerouslySetInnerHTML={{
      __html: `
<div class="eyebrow">Appendix B — Infrastructure Plan</div>
<h2 class="pd-h2">Profound is 70% there.<br><em>It's a sprint, not a rebuild.</em></h2>
<p style="font-size:17px;font-weight:300;color:var(--muted);max-width:680px;line-height:1.7;margin-top:4px;margin-bottom:0">Based on Profound's job postings, Agent Analytics product pages, and Cloudflare/Vercel CDN log documentation.</p>
<table class="infra-table">
  <thead><tr><th style="width:220px">Component</th><th>Description</th><th style="width:110px">Status</th></tr></thead>
  <tbody>
    <tr class="e"><td>Headless browser fleet</td><td>6M+ daily prompts across 10+ AI engines — citation and visibility tracking</td><td><span class="ibadge e">Exists</span></td></tr>
    <tr class="e"><td>Agent Analytics CDN</td><td>Cloudflare, Vercel, Fastly log ingestion — AI bot ID and page-level tracking</td><td><span class="ibadge e">Exists</span></td></tr>
    <tr class="e"><td>400M+ prompt corpus</td><td>Real user AI conversations — unique training data for WebMCP schema optimization</td><td><span class="ibadge e">Exists</span></td></tr>
    <tr class="b"><td>WebMCP log parser</td><td>Chrome 146 WebMCP tool invocation events appear in CDN logs — parser extracts tool call metadata</td><td><span class="ibadge b">Build</span></td></tr>
    <tr class="b"><td>Schema optimizer</td><td>Match 400M+ prompts → optimized WebMCP tool descriptions per client vertical</td><td><span class="ibadge b">Build</span></td></tr>
    <tr class="z"><td>AXO Score engine</td><td>Tool registration + discovery + execution + competitor benchmark → single AXO Score</td><td><span class="ibadge b">Build</span></td></tr>
  </tbody>
</table>
`}} />,

    // APPENDIX C — RESEARCH METHOD
    <div className={slideClass(11)} id="psa3" key="sa3" dangerouslySetInnerHTML={{
      __html: `
<div class="eyebrow">Appendix C — Research Method</div>
<h2 class="pd-h2">How this brief was built,<br><em>end to end.</em></h2>
<div class="wm-grid2">
  <div class="wm-cell"><div class="wm-n">01</div><div class="wm-t">Found the gap before it was labeled</div><div class="wm-b">WebMCP was announced Feb 10, 2026. I mapped the spec to Profound's architecture and identified the missing capability rows before the category language had fully formed. <strong>This is the kind of early signal work that creates strategic lead time.</strong></div></div>
  <div class="wm-cell"><div class="wm-n">02</div><div class="wm-t">Technical depth, product output</div><div class="wm-b">Read the W3C Draft, Chrome 146 flag docs, arXiv benchmark (1,890 live API calls), MCP-B bridge repo, Profound's engineering blog. Translated it into the capability gap table, infra plan, schema optimizer concept, and attribution loop. <strong>Can work with engineers directly.</strong></div></div>
  <div class="wm-cell"><div class="wm-n">03</div><div class="wm-t">Original synthesis, not summaries</div><div class="wm-b">The 400M prompt moat, attribution loop, and Adobe timeline are <strong>not in analyst summaries.</strong> They come from connecting Profound's architecture with WebMCP implementation constraints and GTM timing pressure.</div></div>
</div>
`}} />,
  ];

  return (
    <div id="profound-scroll">
      <div className="pd-pbar" style={{ width: pct + "%" }} />
      <div className="pd-chrome-t">
        <span className="pd-logo">Profound × WebMCP</span>
        <span className="pd-counter">{counterLabel}</span>
      </div>

      {/* Deck area */}
      {slides}

      {/* ← LEFT ARROW */}
      <button
        className={`pd-nav-arrow pd-nav-left${cur === 0 ? " disabled" : ""}`}
        onClick={() => go(cur - 1)}
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24"><polyline points="15 6 9 12 15 18" /></svg>
      </button>

      {/* → RIGHT ARROW */}
      <button
        className={`pd-nav-arrow pd-nav-right${cur === TOTAL - 1 ? " disabled" : ""}`}
        onClick={() => go(cur + 1)}
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18" /></svg>
      </button>

      {/* BOTTOM CHROME */}
      <div className="pd-chrome-b">
        <span className="pd-hint">
          <svg viewBox="0 0 24 24"><polyline points="15 6 9 12 15 18" /></svg>
          <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18" /></svg>
          {" "}to navigate
        </span>
        <div className="pd-dots">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              className={`pd-dot${i >= MAIN ? " apx" : ""}${i === cur ? " active" : ""}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
