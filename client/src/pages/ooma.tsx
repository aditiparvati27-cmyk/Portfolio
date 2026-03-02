import { useEffect } from "react";

const css = `
:root{--bg:#0a0a0f;--surface:#111118;--s2:#1a1a24;--border:rgba(255,255,255,0.08);--ba:rgba(240,192,96,0.3);--text:#f0ede8;--muted:#7a7a8a;--dim:#4a4a5a;--gold:#f0c060;--gd:rgba(240,192,96,0.12);--red:#ff5c5c;--green:#50d890;--blue:#5ca8ff;--purple:#b088ff;--orange:#ff7c4a}
#ooma-page *,#ooma-page *::before,#ooma-page *::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text)}
#ooma-page{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;font-size:16px;line-height:1.7;overflow-x:hidden;min-height:100vh}
#ooma-page .tl{height:2px;background:linear-gradient(90deg,var(--gold),var(--orange),var(--blue),transparent)}
#ooma-page nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:16px 48px;background:rgba(10,10,15,0.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
#ooma-page .nl{font-family:'DM Mono',monospace;font-size:12px;color:var(--gold);letter-spacing:2px;text-transform:uppercase;text-decoration:none}
#ooma-page .na{display:flex;gap:28px;align-items:center}
#ooma-page .na a{font-size:12px;color:var(--muted);text-decoration:none;transition:color .2s}
#ooma-page .na a:hover{color:var(--text)}
#ooma-page .na a.back{color:var(--gold);border:1px solid rgba(240,192,96,0.3);padding:5px 14px;border-radius:99px;font-family:'DM Mono',monospace;letter-spacing:1px;font-size:11px;transition:background .2s}
#ooma-page .na a.back:hover{background:var(--gd);color:var(--gold)}
#ooma-page .hero{min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;padding:0 56px 72px;position:relative;overflow:hidden}
#ooma-page .hbg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 80% 20%,rgba(240,192,96,.05),transparent 70%),radial-gradient(ellipse 40% 60% at 10% 80%,rgba(255,124,74,.03),transparent 60%)}
#ooma-page .hgr{position:absolute;inset:0;opacity:.03;background-image:linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px);background-size:60px 60px}
#ooma-page .ey{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:24px;display:flex;align-items:center;gap:12px}
#ooma-page .ey::before{content:'';display:block;width:32px;height:1px;background:var(--gold)}
#ooma-page .ht{font-family:'Playfair Display',serif;font-size:clamp(48px,7vw,88px);font-weight:900;line-height:1;letter-spacing:-2px;margin-bottom:28px}
#ooma-page .ht em{color:var(--gold);font-style:italic}
#ooma-page .hs{color:var(--muted);font-size:17px;max-width:560px;line-height:1.65;margin-bottom:48px}
#ooma-page .hm{display:flex;gap:40px;align-items:flex-end;border-top:1px solid var(--border);padding-top:28px}
#ooma-page .ms .n{font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:var(--gold);line-height:1}
#ooma-page .ms .n.r{color:var(--red)}
#ooma-page .ms .l{font-size:11px;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase;margin-top:4px}
#ooma-page .hcta{margin-left:auto;padding:12px 28px;border:1px solid var(--gold);color:var(--gold);font-family:'DM Mono',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;transition:background .2s}
#ooma-page .hcta:hover{background:var(--gd)}
#ooma-page .w{max-width:1100px;margin:0 auto;padding:80px 56px}
#ooma-page .fb{background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
#ooma-page .eb{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);display:flex;align-items:center;gap:10px;margin-bottom:14px}
#ooma-page .eb::before{content:'';display:block;width:20px;height:1px;background:var(--gold)}
#ooma-page h2{font-family:'Playfair Display',serif;font-size:clamp(28px,3.5vw,44px);font-weight:700;line-height:1.15;margin-bottom:32px;letter-spacing:-.5px}
#ooma-page h3{font-family:'Playfair Display',serif;font-size:22px;font-weight:600;margin-bottom:14px}
#ooma-page p{color:var(--muted);font-size:15.5px;line-height:1.8;margin-bottom:16px}
#ooma-page p strong{color:var(--text)}
#ooma-page p:last-child{margin-bottom:0}
#ooma-page .co{background:var(--s2);border-left:2px solid var(--gold);padding:18px 22px;margin:24px 0;border-radius:0 6px 6px 0}
#ooma-page .co.gr{border-left-color:var(--green)}
#ooma-page .co p{margin:0;font-size:14.5px}
#ooma-page .tc{display:grid;grid-template-columns:1fr 1fr;gap:48px}
#ooma-page .thr{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
#ooma-page .card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:24px;transition:border-color .2s,transform .2s}
#ooma-page .card:hover{border-color:var(--ba);transform:translateY(-2px)}
#ooma-page .card h4{font-size:15px;font-weight:600;margin-bottom:8px;color:var(--text)}
#ooma-page .card p{font-size:13.5px;margin:0}
#ooma-page .ct{display:inline-block;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;padding:2px 9px;border-radius:99px;margin-bottom:10px}
#ooma-page .tb{background:rgba(92,168,255,.1);color:var(--blue)}
#ooma-page .tg{background:rgba(80,216,144,.1);color:var(--green)}
#ooma-page .tp{background:rgba(176,136,255,.1);color:var(--purple)}
#ooma-page .to{background:rgba(255,124,74,.1);color:var(--orange)}
#ooma-page table{width:100%;border-collapse:collapse;font-size:13.5px;margin:24px 0}
#ooma-page th{padding:11px 14px;text-align:left;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--border);font-weight:400}
#ooma-page th.oo{color:var(--gold)}
#ooma-page td{padding:13px 14px;border-bottom:1px solid rgba(255,255,255,.04);color:var(--muted)}
#ooma-page tr:hover td{background:rgba(255,255,255,.015)}
#ooma-page .f{color:var(--text);font-weight:500}
#ooma-page .y{color:var(--green)}
#ooma-page .no{color:var(--red)}
#ooma-page .pa{color:var(--gold)}
#ooma-page .oc{background:rgba(240,192,96,.03)}
#ooma-page .db{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:40px;margin:32px 0}
#ooma-page .pb{border:1px solid var(--ba);border-radius:14px;padding:48px;margin:32px 0;position:relative;overflow:hidden;background:linear-gradient(135deg,rgba(240,192,96,.03),transparent 60%)}
#ooma-page .pb::before{content:'"';position:absolute;top:-30px;left:30px;font-family:'Playfair Display',serif;font-size:160px;font-weight:900;color:rgba(240,192,96,.04);line-height:1}
#ooma-page .gr{display:flex;gap:12px;flex-wrap:wrap;margin:12px 0}
#ooma-page .gp{display:flex;align-items:center;gap:7px;padding:6px 14px;border-radius:99px;font-size:13px;font-family:'DM Mono',monospace}
#ooma-page .gp.mi{background:rgba(255,92,92,.08);border:1px solid rgba(255,92,92,.2);color:var(--red)}
#ooma-page .gp.ha{background:rgba(80,216,144,.08);border:1px solid rgba(80,216,144,.2);color:var(--green)}
#ooma-page .ir{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}
#ooma-page .ib{display:flex;align-items:center;gap:8px;background:var(--s2);border:1px solid var(--border);border-radius:99px;padding:7px 15px;font-size:13px;color:var(--muted)}
#ooma-page .ib.ac{border-color:var(--ba);color:var(--gold);background:var(--gd)}
#ooma-page .id{width:5px;height:5px;border-radius:50%}
#ooma-page .idg{background:var(--green)}
#ooma-page .idb{background:var(--blue)}
#ooma-page .idp{background:var(--purple)}
#ooma-page hr{border:none;border-top:1px solid var(--border);margin:0}
#ooma-page footer{text-align:center;padding:40px 24px;color:var(--dim);font-family:'DM Mono',monospace;font-size:11px;letter-spacing:1px}
#ooma-page footer a{color:var(--dim);text-decoration:none;margin:0 16px}
#ooma-page footer a:hover{color:var(--muted)}
#ooma-page .fade{opacity:0;transform:translateY(16px);transition:opacity .6s ease,transform .6s ease}
#ooma-page .fade.v{opacity:1;transform:translateY(0)}
#ooma-page .cta-section{text-align:center;padding:72px 56px;border-top:1px solid var(--border)}
#ooma-page .cta-eyebrow{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:20px;display:flex;align-items:center;justify-content:center;gap:12px}
#ooma-page .cta-eyebrow::before,#ooma-page .cta-eyebrow::after{content:'';display:block;width:32px;height:1px;background:var(--gold)}
#ooma-page .cta-title{font-family:'Playfair Display',serif;font-size:clamp(28px,3vw,42px);font-weight:700;margin-bottom:16px;letter-spacing:-.5px}
#ooma-page .cta-sub{color:var(--muted);font-size:15px;max-width:480px;margin:0 auto 40px}
#ooma-page .cta-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
#ooma-page .btn-primary{padding:14px 36px;background:var(--gd);border:1px solid var(--gold);color:var(--gold);font-family:'DM Mono',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;transition:background .2s;border-radius:2px}
#ooma-page .btn-primary:hover{background:rgba(240,192,96,.2)}
#ooma-page .btn-secondary{padding:14px 36px;background:transparent;border:1px solid var(--border);color:var(--text);font-family:'DM Mono',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;text-decoration:none;transition:border-color .2s,color .2s;border-radius:2px}
#ooma-page .btn-secondary:hover{border-color:var(--muted);color:var(--text)}
@media(max-width:768px){#ooma-page nav{padding:14px 20px}#ooma-page .na{display:none}#ooma-page .hero,#ooma-page .w{padding-left:24px;padding-right:24px}#ooma-page .hm{flex-wrap:wrap;gap:20px}#ooma-page .hcta{margin-left:0}#ooma-page .tc,#ooma-page .thr{grid-template-columns:1fr;gap:24px}#ooma-page .pb{padding:28px}#ooma-page .db{padding:20px}#ooma-page .cta-section{padding:48px 24px}}
`;

const svgEcosystem = `<svg width="100%" viewBox="0 0 900 280" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="350" y="100" width="200" height="80" rx="8" fill="rgba(240,192,96,.05)" stroke="rgba(240,192,96,.35)" stroke-width="1.5"/>
  <text x="450" y="133" text-anchor="middle" fill="#f0c060" font-family="DM Mono, monospace" font-size="13" letter-spacing="2">OOMA</text>
  <text x="450" y="152" text-anchor="middle" fill="rgba(240,192,96,.5)" font-family="DM Sans, sans-serif" font-size="11">VoIP infrastructure · No native AI</text>
  <text x="450" y="170" text-anchor="middle" fill="rgba(240,192,96,.35)" font-family="DM Mono, monospace" font-size="10">1.2M+ users · $257M revenue</text>
  <rect x="20" y="10" width="155" height="62" rx="6" fill="rgba(92,168,255,.05)" stroke="rgba(92,168,255,.25)" stroke-width="1"/>
  <text x="97" y="35" text-anchor="middle" fill="#5ca8ff" font-family="DM Sans, sans-serif" font-size="13" font-weight="600">Goodcall</text>
  <text x="97" y="52" text-anchor="middle" fill="rgba(122,122,138,.8)" font-family="DM Mono, monospace" font-size="9.5">AI Phone Agent · $59/mo</text>
  <text x="97" y="65" text-anchor="middle" fill="rgba(122,122,138,.6)" font-family="DM Mono, monospace" font-size="9">10,000+ businesses</text>
  <line x1="175" y1="41" x2="350" y2="130" stroke="rgba(255,92,92,.25)" stroke-width="1" stroke-dasharray="5,4"/>
  <rect x="20" y="109" width="155" height="62" rx="6" fill="rgba(80,216,144,.05)" stroke="rgba(80,216,144,.25)" stroke-width="1"/>
  <text x="97" y="134" text-anchor="middle" fill="#50d890" font-family="DM Sans, sans-serif" font-size="13" font-weight="600">Smith.ai</text>
  <text x="97" y="151" text-anchor="middle" fill="rgba(122,122,138,.8)" font-family="DM Mono, monospace" font-size="9.5">AI + Human Receptionists</text>
  <text x="97" y="164" text-anchor="middle" fill="rgba(122,122,138,.6)" font-family="DM Mono, monospace" font-size="9">Ooma-specific setup guide</text>
  <line x1="175" y1="140" x2="350" y2="140" stroke="rgba(255,92,92,.25)" stroke-width="1" stroke-dasharray="5,4"/>
  <rect x="20" y="208" width="155" height="62" rx="6" fill="rgba(255,124,74,.05)" stroke="rgba(255,124,74,.25)" stroke-width="1"/>
  <text x="97" y="233" text-anchor="middle" fill="#ff7c4a" font-family="DM Sans, sans-serif" font-size="13" font-weight="600">NextPhone</text>
  <text x="97" y="250" text-anchor="middle" fill="rgba(122,122,138,.8)" font-family="DM Mono, monospace" font-size="9.5">AI for Ooma · $199/mo flat</text>
  <text x="97" y="263" text-anchor="middle" fill="rgba(122,122,138,.6)" font-family="DM Mono, monospace" font-size="9">Dedicated Ooma landing page</text>
  <line x1="175" y1="239" x2="350" y2="168" stroke="rgba(255,92,92,.25)" stroke-width="1" stroke-dasharray="5,4"/>
  <rect x="185" y="122" width="150" height="22" rx="4" fill="rgba(255,92,92,.07)" stroke="rgba(255,92,92,.18)" stroke-width="1"/>
  <text x="260" y="137" text-anchor="middle" fill="#ff5c5c" font-family="DM Mono, monospace" font-size="9.5">Revenue leaving Ooma</text>
  <rect x="725" y="10" width="160" height="78" rx="6" fill="rgba(176,136,255,.05)" stroke="rgba(176,136,255,.25)" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="805" y="34" text-anchor="middle" fill="#b088ff" font-family="DM Sans, sans-serif" font-size="12" font-weight="600">2600Hz AI Team</text>
  <text x="805" y="51" text-anchor="middle" fill="rgba(122,122,138,.8)" font-family="DM Mono, monospace" font-size="9.5">Voice bots · Transcription</text>
  <text x="805" y="65" text-anchor="middle" fill="rgba(122,122,138,.8)" font-family="DM Mono, monospace" font-size="9.5">Sentiment · AI summaries</text>
  <text x="805" y="79" text-anchor="middle" fill="rgba(176,136,255,.5)" font-family="DM Mono, monospace" font-size="9">Est. Feb 2023 · Internal only</text>
  <line x1="725" y1="49" x2="550" y2="130" stroke="rgba(176,136,255,.2)" stroke-width="1" stroke-dasharray="5,4"/>
  <rect x="725" y="125" width="160" height="62" rx="6" fill="rgba(240,192,96,.03)" stroke="rgba(240,192,96,.2)" stroke-width="1" stroke-dasharray="4,2"/>
  <text x="805" y="149" text-anchor="middle" fill="rgba(240,192,96,.7)" font-family="DM Sans, sans-serif" font-size="12" font-weight="600">Ooma Labs</text>
  <text x="805" y="166" text-anchor="middle" fill="rgba(122,122,138,.8)" font-family="DM Mono, monospace" font-size="9.5">New tech and capabilities</text>
  <text x="805" y="180" text-anchor="middle" fill="rgba(122,122,138,.6)" font-family="DM Mono, monospace" font-size="9">Dayton Turner, SVP</text>
  <line x1="725" y1="156" x2="550" y2="150" stroke="rgba(240,192,96,.12)" stroke-width="1" stroke-dasharray="5,4"/>
  <rect x="725" y="218" width="160" height="52" rx="6" fill="rgba(255,92,92,.04)" stroke="rgba(255,92,92,.18)" stroke-width="1"/>
  <text x="805" y="242" text-anchor="middle" fill="rgba(255,92,92,.7)" font-family="DM Sans, sans-serif" font-size="12" font-weight="600">TalkforceAI</text>
  <text x="805" y="259" text-anchor="middle" fill="rgba(122,122,138,.8)" font-family="DM Mono, monospace" font-size="9.5">AI Voice Workforce · Any VoIP</text>
  <line x1="725" y1="244" x2="550" y2="168" stroke="rgba(255,92,92,.15)" stroke-width="1" stroke-dasharray="5,4"/>
  <rect x="560" y="85" width="155" height="22" rx="4" fill="rgba(80,216,144,.07)" stroke="rgba(80,216,144,.18)" stroke-width="1"/>
  <text x="637" y="100" text-anchor="middle" fill="#50d890" font-family="DM Mono, monospace" font-size="9.5">Internal opportunity</text>
</svg>`;

export default function Ooma() {
  useEffect(() => {
    // Inject fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);

    // Inject styles
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    // Intersection observer for fade-in animations
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((i) => { if (i.isIntersecting) i.target.classList.add("v"); }),
      { threshold: 0.1 }
    );
    setTimeout(() => {
      document.querySelectorAll("#ooma-page .fade").forEach((el) => obs.observe(el));
    }, 100);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
      obs.disconnect();
    };
  }, []);

  return (
    <div id="ooma-page">
      {/* Top gradient line */}
      <div className="tl" />

      {/* Nav */}
      <nav>
        <a href="/" className="nl">Aditi Parvati</a>
        <div className="na">
          <a href="/" className="back">← Portfolio</a>
          <a href="#gap">AI Gap</a>
          <a href="#eco">Ecosystem</a>
          <a href="#prod">Products</a>
          <a href="#me">About Me</a>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div className="hbg" /><div className="hgr" />
        <div className="ey">Product Teardown · March 2026</div>
        <h1 className="ht">Ooma Inc.<br /><em>Where AI Should Live</em></h1>
        <p className="hs">A product teardown of Ooma's AI gap — and why I think I'm the right person to help close it.</p>
        <div className="hm">
          <div className="ms"><div className="n">$257M</div><div className="l">Annual Revenue</div></div>
          <div className="ms"><div className="n">1.2M+</div><div className="l">Core Users</div></div>
          <div className="ms"><div className="n r">1</div><div className="l">Native AI Feature*</div></div>
          <div className="ms"><div className="n">46.3%</div><div className="l">AI Agent CAGR to 2030</div></div>
          <a href="#gap" className="hcta">Read the Analysis</a>
        </div>
        <p style={{ color: "var(--dim)", fontSize: "11px", fontFamily: "'DM Mono', monospace", letterSpacing: "1px", marginTop: "14px" }}>
          *Voicemail transcription on Pro tier only. No live transcription, summaries, sentiment, or AI receptionist on any public plan — verified across 4 independent 2025/2026 reviews.
        </p>
      </div>

      <hr />

      {/* The Core Finding */}
      <div id="gap"><div className="w">
        <div className="eb">The Core Finding</div>
        <h2>Ooma has the infrastructure.<br />The AI layer is missing.</h2>
        <div className="tc">
          <div>
            <p>Every major VoIP competitor ships AI as a core feature. Dialpad builds real-time transcription into its entry plan. RingCentral's RingSense AI spans tiers. Microsoft Teams gets Copilot. Zoom ships AI Companion. <strong>Ooma ships voicemail transcription on Pro — and nothing else.</strong></p>
            <p>Verified independently via Quo, CloudTalk, Business.com, and Allo — all cite no AI transcription, no call summaries, no sentiment analysis as a key weakness. Management has flagged plans to boost ARPU 10–15% through AI. The gap widens quarterly while competitors ship.</p>
          </div>
          <div>
            <p style={{ fontSize: "13px", marginBottom: "10px", color: "var(--text)" }}>What Ooma has natively:</p>
            <div className="gr">
              <div className="gp ha">✓ Voicemail transcription</div>
              <div className="gp ha">✓ AI spam call blocking</div>
            </div>
            <p style={{ fontSize: "13px", margin: "16px 0 10px", color: "var(--text)" }}>What every competitor has that Ooma doesn't:</p>
            <div className="gr">
              <div className="gp mi">✕ Live call transcription</div>
              <div className="gp mi">✕ AI call summaries</div>
              <div className="gp mi">✕ Sentiment analysis</div>
              <div className="gp mi">✕ AI virtual receptionist</div>
              <div className="gp mi">✕ Auto CRM note sync</div>
              <div className="gp mi">✕ Coaching / whisper AI</div>
            </div>
            <div className="co" style={{ marginTop: "20px" }}>
              <p><strong>Why this matters now:</strong> AI agent market growing 46.3% CAGR toward $52.6B by 2030. For Ooma's SMB customers, AI features are rapidly shifting from differentiator to table stakes.</p>
            </div>
          </div>
        </div>
      </div></div>

      <hr />

      {/* Ecosystem */}
      <div className="fb" id="eco"><div className="w">
        <div className="eb">Market Intelligence</div>
        <h2>The third-party AI tax on Ooma's users</h2>
        <p>Companies are building <strong>profitable AI businesses by sitting on top of Ooma's infrastructure</strong> — charging Ooma customers an additional $59–$199/month for features Ooma doesn't offer natively. Their Ooma-specific landing pages and integrations are a clear signal: the demand is real, monetizable, and flowing to competitors.</p>

        <div className="db">
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: "28px" }}>Who is capturing Ooma's AI opportunity</p>
          <div dangerouslySetInnerHTML={{ __html: svgEcosystem }} />
        </div>

        <div className="thr" style={{ marginTop: "8px" }}>
          <div className="card fade">
            <span className="ct tb">Goodcall</span>
            <h4>AI Phone Agent for Ooma</h4>
            <p>Integrates via call forwarding. 24/7 AI call handling and lead capture — features Ooma's virtual receptionist lacks. 10,000+ businesses. $59/mo on top of Ooma.</p>
          </div>
          <div className="card fade">
            <span className="ct tg">Smith.ai</span>
            <h4>Written for Ooma Users</h4>
            <p>Their setup guide is written specifically for Ooma Office customers. Smith.ai identified Ooma's answer gap as a customer acquisition channel and built around it.</p>
          </div>
          <div className="card fade">
            <span className="ct to">NextPhone</span>
            <h4>Built Around Ooma's Gap</h4>
            <p>Dedicated Ooma integration page. Their research: 74.1% of Ooma SMB calls go unanswered. $199/mo flat — directly monetizing Ooma's product gap.</p>
          </div>
        </div>
      </div></div>

      <hr />

      {/* Product Deep Dives */}
      <div id="prod"><div className="w">
        <div className="eb">Product Deep Dives</div>
        <h2>Where the gaps live</h2>

        <div style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span className="ct tb" style={{ margin: 0 }}>Ooma Office</span>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>SMB phone system · 513K business users · Primary growth product</span>
          </div>
          <h3>The CRM gating problem</h3>
          <p>Ooma Office's Salesforce and HubSpot integrations are locked behind the highest tier at $29.95/user/month. RingCentral includes CRM integrations at $20/user on Core. Dialpad includes them on every plan. For an SMB already using Salesforce, this pricing decision is often the switching factor.</p>
          <p>There's a second gap: Ooma's Salesforce integration uses an XML call center adapter — not an AppExchange listing. That means it's <strong>invisible in Salesforce's marketplace</strong>, requires manual IT setup, and misses 150,000+ daily AppExchange visitors as a discovery channel entirely.</p>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th className="oo">Essentials $19.95</th>
                <th className="oo">Pro $24.95</th>
                <th className="oo">Pro Plus $29.95</th>
                <th>RingCentral $20</th>
                <th>Dialpad $27</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="f">Desktop App</td><td className="no oc">No</td><td className="y oc">Yes</td><td className="y oc">Yes</td><td className="y">Yes</td><td className="y">Yes</td></tr>
              <tr><td className="f">CRM Integration</td><td className="no oc">No</td><td className="no oc">No</td><td className="pa oc">Pro Plus only</td><td className="y">Core+</td><td className="y">All tiers</td></tr>
              <tr><td className="f">AI Transcription</td><td className="no oc">No</td><td className="no oc">No</td><td className="no oc">No</td><td className="y">RingSense AI</td><td className="y">All tiers</td></tr>
              <tr><td className="f">AI Call Summaries</td><td className="no oc">No</td><td className="no oc">No</td><td className="no oc">No</td><td className="y">Yes</td><td className="y">Yes</td></tr>
              <tr><td className="f">Sentiment Analysis</td><td className="no oc">No</td><td className="no oc">No</td><td className="no oc">No</td><td className="y">Yes</td><td className="y">Yes</td></tr>
            </tbody>
          </table>
        </div>

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span className="ct tp" style={{ margin: 0 }}>2600Hz Platform</span>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>White-label UCaaS/CCaaS/CPaaS · 300+ APIs · Acquired Oct 2023</span>
          </div>
          <h3>The AI engine Ooma hasn't surfaced yet</h3>
          <p>2600Hz's AI team was established February 2023. Post-acquisition, they announced an AI meeting recap, voice bots, chatbots, call transcription, and sentiment analysis — all in development. ServiceTitan has already used 2600Hz to ship Contact Center Pro, a commercial AI-driven contact center. The engineering capability is proven.</p>
          <p>The gap isn't technical — it's a product strategy problem. <strong>No one has defined how to surface these 2600Hz AI capabilities as features for Ooma Office's 500K+ SMB users.</strong> That translation work is exactly what a PM on the Ooma Labs or 2600Hz AI team would own.</p>
          <div className="co gr fade">
            <p>My interest in contributing to <strong>Ooma Labs and/or the 2600Hz AI team</strong> is genuine — this is where the company's next chapter will be written. The R&amp;D stage requires exactly the kind of thinking I've developed: customer discovery, build-vs-buy analysis, RICE prioritization, and the ability to translate engineering capabilities into features SMB users actually pay for.</p>
          </div>
        </div>
      </div></div>

      <hr />

      {/* About Me */}
      <div className="fb" id="me"><div className="w">
        <div className="eb">About Me</div>
        <h2>Why I want to be here</h2>

        <div className="pb fade">
          <p style={{ color: "var(--text)", fontSize: "16.5px", lineHeight: "1.75", marginBottom: "20px" }}>I'm a Master's student in Engineering Management at Dartmouth and a former APM at Apsona (a Salesforce ISV). I found Ooma by looking for companies where my exact experience could move a needle — and the AI opportunity mapped almost perfectly to what I've already done.</p>
          <p>At <strong>Apsona</strong>, I was sitting in the Salesforce ecosystem solving exactly the kind of problems Ooma needs to solve: CRM integrations, SMB pricing strategy, AppExchange positioning, and building AI tools that cut support overhead by 75%. I know what makes SMBs upgrade tiers. I know what makes them churn. And I know what it takes to move 1,800+ accounts to a new pricing model without losing them.</p>
          <p>At <strong>Capital One</strong> (as Dartmouth PM consultant), I led the AI marketing technology assessment that influenced an $800K investment decision — by doing exactly what this teardown does: mapping a market gap, evaluating the third-party landscape, and recommending a build-vs-buy path.</p>
        </div>

        <div className="thr" style={{ marginTop: "8px" }}>
          <div className="card fade">
            <h4>Where I want to contribute</h4>
            <p>Product Management — ideally on Ooma Office AI features, 2600Hz AI roadmap, or Ooma Labs. I'm excited about the discovery and 0 to 1 work of defining what "Ooma AI" looks like for SMBs.</p>
          </div>
          <div className="card fade">
            <h4>What I bring</h4>
            <p>Salesforce ISV experience · SMB pricing playbook · AppExchange GTM · RICE prioritization · Customer discovery · AI build-vs-buy analysis · Quote-to-cash redesign · Dartmouth MEM, Dec 2026.</p>
          </div>
          <div className="card fade">
            <h4>Happy to also help with</h4>
            <p>Integration strategy, GTM for new AI tiers, AirDial product analytics, or anywhere a PM with SMB SaaS and Salesforce ecosystem depth creates value.</p>
          </div>
        </div>

        <div className="ir">
          <div className="ib ac"><span className="id idg" />Ooma Office AI</div>
          <div className="ib ac"><span className="id idp" />2600Hz AI Roadmap</div>
          <div className="ib ac"><span className="id idg" />Ooma Labs R&amp;D</div>
          <div className="ib"><span className="id idb" />CRM Integration</div>
          <div className="ib"><span className="id idb" />AirDial Product</div>
          <div className="ib"><span className="id idg" />SMB Pricing</div>
        </div>
      </div></div>

      <hr />

      {/* Sources */}
      <div className="w" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
        <div className="eb">Research Sources</div>
        <div className="tc">
          <div><p><strong>AI feature verification:</strong> Confirmed via Ooma's G2 listing, official pricing pages, and four independent 2025/2026 reviews (Quo/OpenPhone, CloudTalk, Business.com, Allo). "No AI transcription, summaries, or sentiment" is consistent across all sources. Enterprise-tier AI virtual agents mentioned in one review but not publicly listed or priced.</p></div>
          <div><p><strong>Competitive intelligence:</strong> Goodcall, Smith.ai, NextPhone, TalkforceAI sourced from their own Ooma-specific pages. 2600Hz AI features from official Kazoocon blog post (2023). Ooma Labs details from ooma.com/company-team. Financial data from FY2025 10-K and Q3 FY2026 earnings call.</p></div>
        </div>
      </div>

      <hr />

      {/* CTA Section */}
      <div className="cta-section fade">
        <div className="cta-eyebrow">Let's talk</div>
        <h2 className="cta-title">Interested in working together?</h2>
        <p className="cta-sub">If the analysis resonated, I'd love to continue the conversation — about Ooma, product strategy, or anything in between.</p>
        <div className="cta-btns">
          <a href="/" className="btn-primary">Learn More About Me →</a>
          <a href="mailto:aditiparvati27@gmail.com" className="btn-secondary">Contact Me →</a>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p style={{ color: "var(--muted)", fontSize: "13px", marginBottom: "14px" }}>Aditi Parvati · Ooma Product Teardown · March 2026</p>
        <div>
          <a href="mailto:aditiparvati27@gmail.com">aditiparvati27@gmail.com</a>
          <a href="https://linkedin.com/in/aditi-parvati" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="/">Portfolio</a>
        </div>
      </footer>
    </div>
  );
}
