import { useEffect, useState, useCallback } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --black: #080807;
    --white: #f4f2ee;
    --mid: #161614;
    --grey: #242420;
    --muted: #888880;
    --border: rgba(244,242,238,0.10);
    --border-strong: rgba(244,242,238,0.22);
    --accent: #e8e4d8;
    --why-bg: rgba(244,242,238,0.04);
    --why-border: rgba(244,242,238,0.18);
  }

#profound-deck {

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }



  html, body { width:100%; height:100%; background:var(--black); color:var(--white); font-family:'DM Sans',sans-serif; overflow:hidden; cursor:default; }

  /* ── DECK ── */
  .deck { width:100vw; height:100vh; position:relative; overflow:hidden; }

  .slide {
    position:absolute; inset:0;
    display:flex; flex-direction:column; justify-content:center; align-items:flex-start;
    padding:56px 88px;
    opacity:0; pointer-events:none;
    transition:opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1);
    transform:translateY(24px);
  }
  .slide.active { opacity:1; pointer-events:all; transform:translateY(0); }
  .slide.exit { opacity:0; transform:translateY(-20px); transition:opacity 0.3s ease, transform 0.3s ease; }

  /* ── PROGRESS ── */
  .progress-bar { position:fixed; top:0; left:0; height:2px; background:var(--white); transition:width 0.5s ease; z-index:100; }

  /* ── LOGO TAG ── */
  .logo-tag { position:fixed; top:28px; left:56px; font-size:10px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:var(--muted); z-index:100; }

  /* ── NAV ── */
  .nav { position:fixed; bottom:32px; right:48px; display:flex; align-items:center; gap:18px; z-index:100; }
  .nav-btn { width:40px; height:40px; border:1px solid var(--border); border-radius:50%; background:transparent; color:var(--white); font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background 0.2s, border-color 0.2s; }
  .nav-btn:hover { background:rgba(244,242,238,0.07); border-color:var(--border-strong); }
  .slide-counter { font-size:10px; letter-spacing:0.14em; color:var(--muted); font-weight:500; text-transform:uppercase; min-width:48px; text-align:center; }
  .key-hint { position:fixed; bottom:32px; left:56px; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted); z-index:100; opacity:0.5; }

  /* ── TYPOGRAPHY SYSTEM ── */
  .eyebrow { font-size:9px; font-weight:600; letter-spacing:0.24em; text-transform:uppercase; color:var(--muted); margin-bottom:20px; }
  .section-label { font-size:9px; font-weight:600; letter-spacing:0.24em; text-transform:uppercase; color:var(--muted); margin-bottom:18px; }
  .headline { font-family:'Playfair Display',serif; font-size:clamp(36px,5vw,68px); font-weight:900; line-height:1.02; letter-spacing:-0.02em; color:var(--white); }
  .headline em { font-style:italic; color:transparent; -webkit-text-stroke:1px var(--white); }
  .headline-md { font-family:'Playfair Display',serif; font-size:clamp(26px,3.2vw,46px); font-weight:700; line-height:1.1; letter-spacing:-0.02em; color:var(--white); }
  .headline-sm { font-family:'Playfair Display',serif; font-size:clamp(20px,2.4vw,32px); font-weight:700; line-height:1.15; color:var(--white); }
  .body-text { font-size:14px; line-height:1.7; color:rgba(244,242,238,0.65); font-weight:300; }
  .body-strong { color:var(--white); font-weight:500; }

  /* ── "WHY ME" CALLOUT — appears on every slide ── */
  .why-me {
    position:absolute;
    bottom:28px; right:88px;
    max-width:300px;
    border-left:2px solid rgba(244,242,238,0.25);
    padding:10px 0 10px 14px;
    background:transparent;
  }
  .why-me-label { font-size:8px; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; color:var(--muted); margin-bottom:4px; }
  .why-me-text { font-size:11px; line-height:1.55; color:rgba(244,242,238,0.45); font-weight:300; }

  /* ── SLIDE 1: COVER ── */
  #s1 { background:var(--black); }
  .cover-title { font-family:'Playfair Display',serif; font-size:clamp(48px,6.5vw,90px); font-weight:900; line-height:1.0; letter-spacing:-0.025em; color:var(--white); margin-bottom:28px; }
  .cover-title span { color:transparent; -webkit-text-stroke:1.5px var(--white); }
  .cover-sub { font-size:15px; font-weight:300; color:var(--muted); max-width:480px; line-height:1.65; }
  .cover-divider { position:absolute; left:55%; top:0; bottom:0; width:1px; background:var(--border); }
  .cover-stats { position:absolute; right:88px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:40px; }
  .cstat-num { font-family:'Playfair Display',serif; font-size:40px; font-weight:700; line-height:1; color:var(--white); }
  .cstat-label { font-size:10px; font-weight:500; letter-spacing:0.1em; text-transform:uppercase; color:var(--muted); margin-top:4px; }

  /* ── SLIDE 2: BROKEN STATUS QUO ── */
  #s2 { background:var(--black); }
  .flow-diagram { display:flex; align-items:center; gap:0; margin:24px 0 20px; width:100%; max-width:880px; }
  .flow-node { flex:1; padding:16px 14px; border:1px solid var(--border); background:var(--mid); }
  .flow-node.bad { border-color:rgba(244,242,238,0.25); }
  .flow-node-label { font-size:9px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:var(--muted); margin-bottom:6px; }
  .flow-node-val { font-size:13px; font-weight:500; color:var(--white); line-height:1.35; }
  .flow-node-sub { font-size:11px; color:var(--muted); margin-top:4px; font-family:'DM Mono',monospace; }
  .flow-arrow { flex-shrink:0; width:32px; text-align:center; color:var(--muted); font-size:14px; display:flex; align-items:center; justify-content:center; }
  .flow-node.fail-node { border-color:rgba(244,242,238,0.5); background:rgba(244,242,238,0.05); }
  .fail-pct { font-family:'Playfair Display',serif; font-size:32px; font-weight:700; color:var(--white); }
  .fail-label { font-size:11px; color:var(--muted); margin-top:2px; }
  .stats-row { display:flex; gap:40px; max-width:880px; margin-top:16px; }
  .stat-chip { border-top:1px solid var(--border); padding-top:14px; flex:1; }
  .stat-chip-num { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; color:var(--white); }
  .stat-chip-label { font-size:10px; color:var(--muted); margin-top:3px; letter-spacing:0.06em; }

  /* ── SLIDE 3: WEBMCP HOW IT WORKS ── */
  #s3 { background:var(--black); }
  .two-track { display:grid; grid-template-columns:1fr 1px 1fr; gap:0; max-width:900px; width:100%; margin-top:20px; }
  .track { padding:0 32px 0 0; }
  .track:last-child { padding:0 0 0 32px; }
  .track-divider { background:var(--border); width:1px; }
  .track-era { font-size:9px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:var(--muted); margin-bottom:16px; }
  .track-steps { display:flex; flex-direction:column; gap:2px; }
  .tstep { display:flex; align-items:center; gap:12px; padding:11px 14px; border:1px solid var(--border); background:var(--mid); }
  .tstep.highlight { border-color:rgba(244,242,238,0.35); background:rgba(244,242,238,0.05); }
  .tstep-icon { font-size:14px; flex-shrink:0; width:20px; }
  .tstep-text { font-size:12px; color:rgba(244,242,238,0.75); line-height:1.35; }
  .tstep-text strong { color:var(--white); font-weight:600; }
  .track-result { margin-top:10px; padding:12px 14px; border:1px solid var(--border-strong); display:flex; justify-content:space-between; align-items:center; }
  .track-result.bad { border-color:rgba(244,242,238,0.15); }
  .tr-label { font-size:10px; color:var(--muted); }
  .tr-val { font-size:13px; font-weight:600; color:var(--white); font-family:'DM Mono',monospace; }
  .code-block { background:var(--grey); border:1px solid var(--border); padding:12px 16px; font-family:'DM Mono',monospace; font-size:10.5px; color:rgba(244,242,238,0.65); line-height:1.7; margin-top:10px; max-width:100%; }
  .code-key { color:rgba(244,242,238,0.4); }
  .code-fn { color:var(--white); }
  .code-str { color:rgba(244,242,238,0.65); }

  /* ── SLIDE 4: THE SHIFT ── */
  #s4 { background:var(--black); }
  .era-row { display:flex; align-items:stretch; gap:0; width:100%; max-width:820px; margin-top:20px; }
  .era-box { flex:1; padding:28px 30px; border:1px solid var(--border); }
  .era-box.bright { border-color:var(--white); background:rgba(244,242,238,0.03); }
  .era-tag { font-size:9px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:var(--muted); margin-bottom:10px; }
  .era-title { font-family:'Playfair Display',serif; font-size:24px; font-weight:700; margin-bottom:10px; color:var(--white); }
  .era-desc { font-size:12px; line-height:1.6; color:var(--muted); font-weight:300; }
  .era-examples { margin-top:12px; display:flex; flex-direction:column; gap:5px; }
  .era-ex { font-size:11px; font-family:'DM Mono',monospace; color:rgba(244,242,238,0.4); display:flex; align-items:center; gap:8px; }
  .era-ex::before { content:'—'; }
  .era-arrow-col { display:flex; align-items:center; justify-content:center; padding:0 20px; color:var(--muted); font-size:18px; flex-shrink:0; }
  .profound-bar { margin-top:20px; max-width:820px; border-top:1px solid var(--border); padding-top:16px; font-size:13px; color:rgba(244,242,238,0.55); line-height:1.6; }
  .profound-bar strong { color:var(--white); font-weight:500; }

  /* ── SLIDE 5: THE MARKET ── */
  #s5 { background:var(--black); }
  .market-grid { display:grid; grid-template-columns:1.2fr 1fr; gap:48px; max-width:900px; width:100%; margin-top:20px; align-items:start; }
  .market-bars { display:flex; flex-direction:column; gap:14px; }
  .mbar-row { display:flex; flex-direction:column; gap:5px; }
  .mbar-header { display:flex; justify-content:space-between; align-items:baseline; }
  .mbar-label { font-size:11px; color:rgba(244,242,238,0.65); }
  .mbar-val { font-size:12px; font-weight:600; color:var(--white); font-family:'DM Mono',monospace; }
  .mbar-track { height:6px; background:rgba(244,242,238,0.08); width:100%; }
  .mbar-fill { height:100%; background:var(--white); }
  .market-callouts { display:flex; flex-direction:column; gap:20px; }
  .mcallout { border-left:2px solid var(--border-strong); padding-left:18px; }
  .mcallout.hot { border-left-color:var(--white); }
  .mco-num { font-family:'Playfair Display',serif; font-size:32px; font-weight:700; color:var(--white); line-height:1; }
  .mco-label { font-size:11px; color:var(--muted); margin-top:3px; line-height:1.45; }
  .mco-source { font-size:9px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(244,242,238,0.25); margin-top:4px; }

  /* ── SLIDE 6: COMPETITIVE GAP ── */
  #s6 { background:var(--black); }
  .comp-table { width:100%; max-width:860px; margin-top:20px; border-collapse:collapse; }
  .comp-table th { font-size:9px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--muted); padding:0 16px 10px 0; text-align:left; border-bottom:1px solid var(--border); }
  .comp-table td { padding:10px 16px 10px 0; font-size:12px; color:rgba(244,242,238,0.7); border-bottom:1px solid rgba(244,242,238,0.05); vertical-align:middle; }
  .comp-table tr.profound-row td { color:var(--white); }
  .comp-table tr.profound-row td:first-child { font-weight:600; }
  .badge { display:inline-block; font-size:9px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; padding:3px 8px; }
  .badge.none { color:rgba(244,242,238,0.25); border:1px solid rgba(244,242,238,0.1); }
  .badge.partial { color:rgba(244,242,238,0.6); border:1px solid rgba(244,242,238,0.25); }
  .badge.open { background:var(--white); color:var(--black); }
  .gap-callout { margin-top:20px; max-width:860px; padding:16px 20px; border:1px dashed rgba(244,242,238,0.22); font-size:13px; color:rgba(244,242,238,0.6); line-height:1.6; }
  .gap-callout strong { color:var(--white); }

  /* ── SLIDE 7: OPPORTUNITY 1 — AXO SCORE ── */
  #s7 { background:var(--black); }
  .axo-layout { display:grid; grid-template-columns:1.1fr 0.9fr; gap:48px; max-width:900px; width:100%; margin-top:20px; align-items:start; }
  .axo-score-card { border:1px solid var(--border-strong); padding:24px 28px; }
  .axo-sc-title { font-size:10px; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color:var(--muted); margin-bottom:16px; }
  .axo-score-big { font-family:'Playfair Display',serif; font-size:72px; font-weight:900; line-height:1; color:var(--white); }
  .axo-score-sub { font-size:12px; color:var(--muted); margin-top:4px; }
  .axo-breakdown { margin-top:20px; display:flex; flex-direction:column; gap:10px; }
  .axo-metric { display:flex; align-items:center; gap:12px; }
  .axo-metric-label { font-size:11px; color:rgba(244,242,238,0.55); width:130px; flex-shrink:0; }
  .axo-bar-wrap { flex:1; height:4px; background:rgba(244,242,238,0.08); }
  .axo-bar { height:100%; background:var(--white); }
  .axo-metric-val { font-size:11px; font-family:'DM Mono',monospace; color:var(--white); width:36px; text-align:right; }
  .axo-points { display:flex; flex-direction:column; gap:18px; }
  .axo-pt { border-left:2px solid var(--border); padding-left:18px; }
  .axo-pt.lit { border-left-color:var(--white); }
  .axo-pt-title { font-size:13px; font-weight:600; color:var(--white); margin-bottom:4px; }
  .axo-pt-body { font-size:11px; line-height:1.55; color:var(--muted); }

  /* ── SLIDE 8: OPPORTUNITY 2 — AGENT ANALYTICS ── */
  #s8 { background:var(--black); }
  .infra-flow { display:flex; flex-direction:column; gap:2px; max-width:800px; width:100%; margin-top:20px; }
  .infra-row { display:flex; align-items:stretch; }
  .infra-label { width:180px; flex-shrink:0; padding:13px 18px; border:1px solid var(--border); font-size:10px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color:var(--muted); display:flex; align-items:center; border-right:none; }
  .infra-content { flex:1; padding:13px 20px; border:1px solid var(--border); font-size:12px; color:rgba(244,242,238,0.7); line-height:1.45; display:flex; align-items:center; justify-content:space-between; gap:16px; }
  .infra-row.today .infra-label { background:var(--mid); border-color:rgba(244,242,238,0.2); color:rgba(244,242,238,0.7); }
  .infra-row.today .infra-content { background:var(--mid); border-color:rgba(244,242,238,0.2); color:var(--white); font-weight:500; }
  .infra-row.extend .infra-label { border-style:dashed; border-color:rgba(244,242,238,0.25); color:rgba(244,242,238,0.5); }
  .infra-row.extend .infra-content { border-style:dashed; border-color:rgba(244,242,238,0.25); color:rgba(244,242,238,0.5); font-style:italic; }
  .infra-row.new-row .infra-label { border-color:var(--white); color:var(--white); }
  .infra-row.new-row .infra-content { border-color:var(--white); color:var(--white); font-weight:600; }
  .infra-tag { font-size:8px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; padding:2px 7px; border:1px solid; flex-shrink:0; }
  .infra-tag.exists { border-color:rgba(244,242,238,0.2); color:rgba(244,242,238,0.4); }
  .infra-tag.build { border-color:var(--white); color:var(--white); }
  .benefit-row { display:flex; gap:28px; margin-top:20px; max-width:800px; }
  .benefit-chip { flex:1; border-top:1px solid var(--border); padding-top:12px; }
  .bc-num { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:var(--white); }
  .bc-label { font-size:10px; color:var(--muted); margin-top:2px; line-height:1.4; }

  /* ── SLIDE 9: PROTOTYPE DASHBOARD ── */
  #s9 { background:var(--black); }
  .proto-wrap { display:grid; grid-template-columns:1.15fr 0.85fr; gap:40px; max-width:920px; width:100%; margin-top:20px; align-items:start; }
  .proto-screen { border:1px solid var(--border-strong); overflow:hidden; }
  .proto-header { background:var(--grey); padding:10px 14px; display:flex; align-items:center; gap:8px; border-bottom:1px solid rgba(255,255,255,0.05); }
  .proto-dot { width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,0.12); }
  .proto-bar-text { font-size:10px; color:var(--muted); letter-spacing:0.06em; }
  .proto-tabs { display:flex; gap:0; border-bottom:1px solid var(--border); }
  .proto-tab { padding:8px 14px; font-size:10px; font-weight:500; color:var(--muted); letter-spacing:0.06em; text-transform:uppercase; }
  .proto-tab.active { color:var(--white); border-bottom:1px solid var(--white); margin-bottom:-1px; }
  .proto-body { padding:16px 18px 18px; }
  .proto-brand-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
  .proto-brand { font-size:13px; font-weight:600; color:var(--white); }
  .proto-score-badge { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; color:var(--white); }
  .proto-score-label { font-size:9px; color:var(--muted); text-transform:uppercase; letter-spacing:0.1em; margin-top:2px; text-align:right; }
  .proto-metrics { display:flex; flex-direction:column; gap:9px; }
  .pm { display:flex; flex-direction:column; gap:4px; }
  .pm-header { display:flex; justify-content:space-between; align-items:baseline; }
  .pm-lbl { font-size:10px; color:var(--muted); }
  .pm-val { font-size:11px; font-weight:600; color:var(--white); font-family:'DM Mono',monospace; }
  .pm-track { height:3px; background:rgba(255,255,255,0.08); }
  .pm-fill { height:100%; background:var(--white); }
  .proto-insight { margin-top:12px; font-size:10px; color:rgba(244,242,238,0.4); line-height:1.5; border-top:1px solid var(--border); padding-top:10px; }
  .proto-action { display:inline-block; margin-top:8px; font-size:9px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:var(--white); border:1px solid var(--white); padding:4px 10px; }
  .proto-right { display:flex; flex-direction:column; gap:16px; }
  .pp { border-left:2px solid var(--border); padding-left:16px; }
  .pp.lit { border-left-color:var(--white); }
  .pp-title { font-size:12px; font-weight:600; color:var(--white); margin-bottom:4px; }
  .pp-body { font-size:11px; line-height:1.55; color:var(--muted); }

  /* ── SLIDE 10: WHY ME ── */
  #s10 { background:var(--white); color:var(--black); }
  #s10 .eyebrow { color:rgba(8,8,7,0.4); }
  #s10 .headline-md { color:var(--black); }
  .wm-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; max-width:840px; width:100%; margin-top:24px; background:rgba(8,8,7,0.1); }
  .wm-col { background:var(--white); padding:24px 24px 28px; }
  .wm-num { font-family:'Playfair Display',serif; font-size:40px; font-weight:900; color:rgba(8,8,7,0.07); line-height:1; margin-bottom:12px; }
  .wm-title { font-size:13px; font-weight:600; color:var(--black); margin-bottom:8px; letter-spacing:0.02em; }
  .wm-body { font-size:12px; line-height:1.6; color:rgba(8,8,7,0.55); font-weight:300; }
  .wm-body strong { color:var(--black); font-weight:600; }
  .wm-ask { margin-top:28px; max-width:840px; padding:18px 24px; border:1px solid rgba(8,8,7,0.12); display:flex; align-items:center; justify-content:space-between; }
  .wm-ask-text { font-size:14px; color:rgba(8,8,7,0.7); max-width:560px; line-height:1.5; }
  .wm-ask-text strong { color:var(--black); }
  .wm-ask-label { font-size:9px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:rgba(8,8,7,0.35); flex-shrink:0; }

  /* ── SLIDE 11: THE ASK ── */
  #s11 { background:var(--white); color:var(--black); }
  #s11 .eyebrow { color:rgba(8,8,7,0.35); }
  #s11 .headline { color:var(--black); }
  #s11 .headline span { -webkit-text-stroke-color:var(--black); }
  #s11 .headline em { -webkit-text-stroke-color:var(--black); }
  #s11 .why-me { border-left-color:rgba(8,8,7,0.18); }
  #s11 .why-me-label { color:rgba(8,8,7,0.35); }
  #s11 .why-me-text { color:rgba(8,8,7,0.4); }
  .cta-list { list-style:none; margin-top:32px; display:flex; flex-direction:column; gap:12px; max-width:560px; }
  .cta-item { display:flex; align-items:flex-start; gap:14px; font-size:14px; line-height:1.55; color:rgba(8,8,7,0.7); font-weight:300; }
  .cta-n { font-family:'Playfair Display',serif; font-size:13px; font-weight:700; flex-shrink:0; opacity:0.3; margin-top:1px; }
  .cta-item strong { color:var(--black); font-weight:500; }
  .cta-divider { width:40px; height:1px; background:rgba(8,8,7,0.12); margin:24px 0; }
  .cta-footer { font-size:12px; color:rgba(8,8,7,0.35); max-width:480px; line-height:1.6; }
  .cta-cover-right { position:absolute; right:88px; top:50%; transform:translateY(-50%); display:flex; flex-direction:column; gap:32px; max-width:220px; border-left:1px solid rgba(8,8,7,0.1); padding-left:32px; }
  .cta-cr-label { font-size:9px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:rgba(8,8,7,0.35); margin-bottom:4px; }
  .cta-cr-val { font-size:13px; font-weight:500; color:rgba(8,8,7,0.7); line-height:1.45; }
}
/* ── RESPONSIVE / MOBILE ── */
@media (max-width: 768px) {
  #profound-deck .slide {
    padding: 24px 20px !important;
    justify-content: flex-start !important;
    padding-top: 56px !important;
    overflow-y: auto !important;
  }
  #profound-deck .cover-title {
    font-size: clamp(32px, 8vw, 48px) !important;
  }
  #profound-deck .cover-divider { display: none !important; }
  #profound-deck .cover-stats {
    position: relative !important;
    right: auto !important;
    top: auto !important;
    transform: none !important;
    flex-direction: row !important;
    flex-wrap: wrap !important;
    gap: 20px !important;
    margin-top: 32px !important;
  }
  #profound-deck .cover-sub { font-size: 13px !important; }
  #profound-deck .headline-md {
    font-size: clamp(20px, 5vw, 28px) !important;
  }
  #profound-deck .headline {
    font-size: clamp(28px, 7vw, 40px) !important;
  }

  /* Flow diagram stacking */
  #profound-deck .flow-diagram {
    flex-direction: column !important;
    gap: 4px !important;
  }
  #profound-deck .flow-arrow {
    transform: rotate(90deg);
    width: auto !important;
    padding: 4px 0 !important;
  }
  #profound-deck .stats-row {
    flex-direction: column !important;
    gap: 16px !important;
  }

  /* Two-track stacking */
  #profound-deck .two-track {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }
  #profound-deck .track-divider { display: none !important; }
  #profound-deck .track:last-child { padding: 0 !important; }
  #profound-deck .track { padding: 0 !important; }

  /* Era row stacking */
  #profound-deck .era-row {
    flex-direction: column !important;
    gap: 12px !important;
  }
  #profound-deck .era-arrow-col {
    transform: rotate(90deg);
    padding: 4px 0 !important;
  }

  /* Market grid stacking */
  #profound-deck .market-grid {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }

  /* Comp table scrollable */
  #profound-deck .comp-table {
    display: block !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    font-size: 11px !important;
  }

  /* AXO layout stacking */
  #profound-deck .axo-layout {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }

  /* Infra flow */
  #profound-deck .infra-row {
    flex-direction: column !important;
  }
  #profound-deck .infra-label {
    width: 100% !important;
    border-right: 1px solid var(--border) !important;
    border-bottom: none !important;
  }
  #profound-deck .benefit-row {
    flex-direction: column !important;
    gap: 16px !important;
  }

  /* Prototype wrap stacking */
  #profound-deck .proto-wrap {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }

  /* Why-me grid stacking */
  #profound-deck .wm-grid {
    grid-template-columns: 1fr !important;
  }
  #profound-deck .wm-ask {
    flex-direction: column !important;
    gap: 12px !important;
    text-align: center !important;
  }

  /* CTA right column stacking */
  #profound-deck .cta-cover-right {
    position: relative !important;
    right: auto !important;
    top: auto !important;
    transform: none !important;
    border-left: none !important;
    padding-left: 0 !important;
    border-top: 1px solid rgba(8,8,7,0.1) !important;
    padding-top: 24px !important;
    margin-top: 24px !important;
    max-width: 100% !important;
  }

  /* Why-me callout repositioned */
  #profound-deck .why-me {
    position: relative !important;
    bottom: auto !important;
    right: auto !important;
    margin-top: 24px !important;
    max-width: 100% !important;
  }

  /* Nav touch targets */
  #profound-deck .nav-btn {
    width: 48px !important;
    height: 48px !important;
    font-size: 18px !important;
  }
  #profound-deck .key-hint { display: none !important; }
  #profound-deck .logo-tag {
    left: 20px !important;
    top: 16px !important;
  }
}

@media (max-width: 480px) {
  #profound-deck .slide {
    padding: 16px 14px !important;
    padding-top: 48px !important;
  }
  #profound-deck .cover-stats {
    flex-direction: column !important;
    gap: 14px !important;
  }
  #profound-deck .cstat-num {
    font-size: 28px !important;
  }
  #profound-deck .axo-score-big {
    font-size: 48px !important;
  }
  #profound-deck .code-block {
    font-size: 9px !important;
    padding: 8px 10px !important;
  }
}

`;

export default function Profound() {
  const [current, setCurrent] = useState(0);
  const total = 11;

  const navigate = useCallback((dir: number) => {
    setCurrent(prev => {
      const next = prev + dir;
      if (next < 0 || next >= total) return prev;
      return next;
    });
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigate(-1);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [navigate]);

  useEffect(() => {
    let touchStartX = 0;
    const onStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
    };
    document.addEventListener("touchstart", onStart);
    document.addEventListener("touchend", onEnd);
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchend", onEnd);
    };
  }, [navigate]);

  const slideClass = (i: number) =>
    `slide ${i === current ? "active" : ""}`;

  const pct = ((current + 1) / total) * 100;

  return (
    <div id="profound-deck">
      <div className="progress-bar" style={{ width: pct + "%" }} />
      <div className="logo-tag">Profound × WebMCP</div>
      <div className="key-hint">← → to navigate</div>

      <div className="deck">
        {/* Slide 1 */}
        <div className={slideClass(0)} id="s1"
          dangerouslySetInnerHTML={{
            __html: `
  <div class="eyebrow">A Strategic Product Proposal — March 2026</div>
  <h1 class="cover-title">
    From what AI<br>
    <span>says</span> about<br>
    your brand, to<br>
    what it <em>does.</em>
  </h1>
  <p class="cover-sub">WebMCP is a new W3C browser standard backed by Google and Microsoft that turns every website into a structured tool for AI agents — and it changes everything Profound has been building toward.</p>
  <div class="cover-divider"></div>
  <div class="cover-stats">
    <div>
      <div class="cstat-num">Feb '26</div>
      <div class="cstat-label">WebMCP announced</div>
    </div>
    <div>
      <div class="cstat-num">\$107B</div>
      <div class="cstat-label">AI marketing by 2028</div>
    </div>
    <div>
      <div class="cstat-num">\$0</div>
      <div class="cstat-label">AEO tools built for WebMCP yet</div>
    </div>
  </div>
  <div class="why-me" style="right:88px;bottom:24px;">
    <div class="why-me-label">Why me</div>
    <div class="why-me-text">This deck is the pitch. Someone who spots a category-defining shift weeks after launch — and maps it to your roadmap before you've seen it — is the intern you want in the room.</div>
  </div>
` }}
        />
        {/* Slide 2 */}
        <div className={slideClass(1)} id="s2"
          dangerouslySetInnerHTML={{
            __html: `
  <div class="section-label">01 — The Problem</div>
  <h2 class="headline-md" style="margin-bottom:6px;">AI agents interact with the web like<br>a blindfolded person trying to drive.</h2>
  <p class="body-text" style="margin-bottom:0;max-width:680px;">Current approaches are slow, expensive, and breaking at scale — just as agents are becoming the primary way users interact with brands.</p>

  <div class="flow-diagram" style="margin-top:22px;">
    <div class="flow-node">
      <div class="flow-node-label">User query</div>
      <div class="flow-node-val">Find me running shoes under \$150</div>
      <div class="flow-node-sub">→ agent triggered</div>
    </div>
    <div class="flow-arrow">→</div>
    <div class="flow-node bad">
      <div class="flow-node-label">Approach A</div>
      <div class="flow-node-val">Screenshot → Vision Model</div>
      <div class="flow-node-sub">\$0.05–0.10 per action</div>
    </div>
    <div class="flow-arrow">→</div>
    <div class="flow-node bad">
      <div class="flow-node-label">Approach B</div>
      <div class="flow-node-val">DOM Parse → Synthesize Clicks</div>
      <div class="flow-node-sub">Breaks on every UI change</div>
    </div>
    <div class="flow-arrow">→</div>
    <div class="flow-node fail-node">
      <div class="fail-pct">75%</div>
      <div class="fail-label">Task failure rate<br><span style="font-size:10px;color:rgba(244,242,238,0.3);">Superface.ai, 2025</span></div>
    </div>
  </div>

  <div class="stats-row">
    <div class="stat-chip">
      <div class="stat-chip-num">5.2%</div>
      <div class="stat-chip-label">Click accuracy — GPT-4V on UI tasks<br><span style="opacity:0.5;font-size:9px;">Stanford CS231N</span></div>
    </div>
    <div class="stat-chip">
      <div class="stat-chip-num">97%</div>
      <div class="stat-chip-label">Websites that render client-side<br>(invisible to raw HTML fetchers)</div>
    </div>
    <div class="stat-chip">
      <div class="stat-chip-num">\$15T</div>
      <div class="stat-chip-label">B2B purchases AI-intermediated by 2028<br><span style="opacity:0.5;font-size:9px;">Gartner</span></div>
    </div>
    <div class="stat-chip">
      <div class="stat-chip-num">60%</div>
      <div class="stat-chip-label">Google searches now end<br>without a click to any website</div>
    </div>
  </div>

  <div class="why-me">
    <div class="why-me-label">Why me</div>
    <div class="why-me-text">I mapped this failure mode before finding WebMCP — the research into agent task accuracy rates is what led me to the spec. I understand the problem technically, not just conceptually.</div>
  </div>
` }}
        />
        {/* Slide 3 */}
        <div className={slideClass(2)} id="s3"
          dangerouslySetInnerHTML={{
            __html: `
  <div class="section-label">02 — The Standard</div>
  <h2 class="headline-md" style="margin-bottom:4px;">WebMCP: websites declare what<br>they can do. Agents call it directly.</h2>
  <p class="body-text" style="max-width:600px;margin-bottom:0;">Proposed W3C standard, co-authored by Google Chrome + Microsoft Edge. Available in Chrome 146 behind a flag right now.</p>

  <div class="two-track" style="margin-top:18px;">
    <div class="track">
      <div class="track-era">Before WebMCP — Old approach</div>
      <div class="track-steps">
        <div class="tstep"><div class="tstep-icon">📸</div><div class="tstep-text">Agent captures full-page screenshot</div></div>
        <div class="tstep"><div class="tstep-icon">🧠</div><div class="tstep-text">Vision model interprets pixels → guesses intent</div></div>
        <div class="tstep"><div class="tstep-icon">🖱️</div><div class="tstep-text">Synthesizes DOM click events, hopes UI matches</div></div>
        <div class="tstep"><div class="tstep-icon">🔄</div><div class="tstep-text">Re-authenticates on every session (OAuth pain)</div></div>
        <div class="tstep"><div class="tstep-icon">💥</div><div class="tstep-text">UI update → entire flow breaks, must restart</div></div>
      </div>
      <div class="track-result bad">
        <span class="tr-label">Accuracy</span><span class="tr-val">~45%</span>
        <span class="tr-label">Compute</span><span class="tr-val">High</span>
        <span class="tr-label">Latency</span><span class="tr-val">30–60s</span>
      </div>
    </div>
    <div class="track-divider"></div>
    <div class="track" style="padding:0 0 0 32px;">
      <div class="track-era">After WebMCP — New approach</div>
      <div class="track-steps">
        <div class="tstep highlight"><div class="tstep-icon">📋</div><div class="tstep-text">Website registers <strong>search_products()</strong>, <strong>book_appointment()</strong> with natural language descriptions + JSON schema</div></div>
        <div class="tstep highlight"><div class="tstep-icon">🔍</div><div class="tstep-text">Agent calls <strong>navigator.modelContext.getTools()</strong> — discovers what the site can do</div></div>
        <div class="tstep highlight"><div class="tstep-icon">⚡</div><div class="tstep-text">Structured function call — no pixel guessing, no DOM fragility</div></div>
        <div class="tstep highlight"><div class="tstep-icon">🔑</div><div class="tstep-text">Inherits user's existing cookies + session — zero extra auth</div></div>
      </div>
      <div class="code-block">
<span class="code-key">navigator.modelContext.</span><span class="code-fn">registerTool</span>({
  name: <span class="code-str">"search_products"</span>,
  description: <span class="code-str">"Search catalog by query and filters"</span>,
  inputSchema: { query, maxPrice, category }
})
      </div>
      <div class="track-result" style="margin-top:6px;">
        <span class="tr-label">Accuracy</span><span class="tr-val">~98%</span>
        <span class="tr-label">Compute</span><span class="tr-val">−67%</span>
        <span class="tr-label">Latency</span><span class="tr-val">~5s</span>
      </div>
    </div>
  </div>

  <div class="why-me">
    <div class="why-me-label">Why me</div>
    <div class="why-me-text">I read the W3C Community Group Draft, the Chrome 146 flag docs, and the MCP-B bridge spec. I can translate this technical shift into product strategy — which is exactly what this project needs.</div>
  </div>
` }}
        />
        {/* Slide 4 */}
        <div className={slideClass(3)} id="s4"
          dangerouslySetInnerHTML={{
            __html: `
  <div class="section-label">03 — The Shift</div>
  <h2 class="headline-md" style="margin-bottom:4px;">AI is evolving from reading<br>about brands to <em>using</em> them.</h2>
  <p class="body-text" style="max-width:640px;">Profound built the category for Era 1. WebMCP is the infrastructure of Era 2. The companies that own Era 2 will be defined in the next 18 months.</p>

  <div class="era-row">
    <div class="era-box">
      <div class="era-tag">Era 1 — Now</div>
      <div class="era-title">AI reads brands</div>
      <div class="era-desc">Answer engines cite, summarize, and rank brands in response to queries. The product is visibility — what does ChatGPT say about you?</div>
      <div class="era-examples">
        <div class="era-ex">Ramp cited in "best expense tools" query</div>
        <div class="era-ex">Target mentioned in AI product roundups</div>
        <div class="era-ex">MongoDB recommended for developer queries</div>
      </div>
    </div>
    <div class="era-arrow-col">→</div>
    <div class="era-box bright">
      <div class="era-tag">Era 2 — Incoming (Chrome 146+)</div>
      <div class="era-title">AI uses brands</div>
      <div class="era-desc">Agents search catalogs, book services, and complete transactions — autonomously, on behalf of users. The product is execution quality — can AI agents actually complete the task?</div>
      <div class="era-examples">
        <div class="era-ex">Agent calls search_products() on Target.com</div>
        <div class="era-ex">Agent books via schedule_meeting() on Calendly</div>
        <div class="era-ex">Agent completes checkout_cart() autonomously</div>
      </div>
    </div>
  </div>

  <div class="profound-bar">
    Profound's mission: "build the marketing platform for the age of superintelligence." <strong>That platform must optimize both what AI says AND what AI does.</strong> AEO without AXO is half the stack.
  </div>

  <div class="why-me">
    <div class="why-me-label">Why me</div>
    <div class="why-me-text">I've studied Profound's Series C announcement, the CEO's framing of "superintelligence as a customer," and how Agent Analytics already sits at the intersection of these eras. This proposal is built from that foundation.</div>
  </div>
` }}
        />
        {/* Slide 5 */}
        <div className={slideClass(4)} id="s5"
          dangerouslySetInnerHTML={{
            __html: `
  <div class="section-label">04 — Market Sizing</div>
  <h2 class="headline-md" style="margin-bottom:4px;">The agentic marketing opportunity<br>is larger than the AEO market itself.</h2>
  <p class="body-text" style="max-width:640px;">This isn't a feature addition — it's a category expansion into a market that doesn't exist yet but will be worth hundreds of billions.</p>

  <div class="market-grid">
    <div>
      <div style="font-size:9px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;">Market Size Projections</div>
      <div class="market-bars">
        <div class="mbar-row">
          <div class="mbar-header"><span class="mbar-label">AI in Marketing (2025)</span><span class="mbar-val">\$47B</span></div>
          <div class="mbar-track"><div class="mbar-fill" style="width:25%"></div></div>
        </div>
        <div class="mbar-row">
          <div class="mbar-header"><span class="mbar-label">AI in Marketing (2028)</span><span class="mbar-val">\$107B</span></div>
          <div class="mbar-track"><div class="mbar-fill" style="width:57%"></div></div>
        </div>
        <div class="mbar-row">
          <div class="mbar-header"><span class="mbar-label">Agentic AI Market (2025)</span><span class="mbar-val">\$7B</span></div>
          <div class="mbar-track"><div class="mbar-fill" style="width:4%"></div></div>
        </div>
        <div class="mbar-row">
          <div class="mbar-header"><span class="mbar-label">Agentic AI Market (2032)</span><span class="mbar-val">\$93B</span></div>
          <div class="mbar-track"><div class="mbar-fill" style="width:49%"></div></div>
        </div>
        <div class="mbar-row">
          <div class="mbar-header"><span class="mbar-label">AI Agent Enterprise Software (2035)</span><span class="mbar-val">\$450B</span></div>
          <div class="mbar-track"><div class="mbar-fill" style="width:100%"></div></div>
        </div>
        <div class="mbar-row">
          <div class="mbar-header"><span class="mbar-label">B2B Purchases via AI Agents (2028)</span><span class="mbar-val">\$15T</span></div>
          <div class="mbar-track"><div class="mbar-fill" style="width:88%"></div></div>
        </div>
      </div>
    </div>
    <div class="market-callouts">
      <div class="mcallout hot">
        <div class="mco-num">60%</div>
        <div class="mco-label">of value agentic AI creates in marketing comes from execution, not just answers</div>
        <div class="mco-source">McKinsey, 2026</div>
      </div>
      <div class="mcallout">
        <div class="mco-num">81%</div>
        <div class="mco-label">of marketing technology leaders already piloting AI agents</div>
        <div class="mco-source">Gartner, 2025</div>
      </div>
      <div class="mcallout">
        <div class="mco-num">44%</div>
        <div class="mco-label">CAGR for agentic AI market — among the fastest growing segments in all of tech</div>
        <div class="mco-source">MarketsandMarkets</div>
      </div>
    </div>
  </div>

  <div class="why-me">
    <div class="why-me-label">Why me</div>
    <div class="why-me-text">I synthesized market data from McKinsey, Gartner, IDC, Goldman Sachs, and Deloitte independently to build this sizing. This is original research work, not a summary of one analyst report.</div>
  </div>
` }}
        />
        {/* Slide 6 */}
        <div className={slideClass(5)} id="s6"
          dangerouslySetInnerHTML={{
            __html: `
  <div class="section-label">05 — Competitive Landscape</div>
  <h2 class="headline-md" style="margin-bottom:4px;">Every competitor is stuck in<br>the reading era. The doing era is open.</h2>
  <p class="body-text" style="max-width:640px;">After scanning 24 AEO/GEO platforms, zero have built WebMCP-specific tooling. Profound has a first-mover window — but it won't stay open.</p>

  <table class="comp-table" style="margin-top:18px;">
    <thead>
      <tr>
        <th style="width:160px;">Platform</th>
        <th>AEO / Monitoring</th>
        <th>Agent Analytics</th>
        <th>MCP/A2A</th>
        <th style="width:140px;">WebMCP Tooling</th>
      </tr>
    </thead>
    <tbody>
      <tr class="profound-row">
        <td>Profound ★</td>
        <td>Full suite, 10+ AI engines</td>
        <td>CDN-level bot tracking</td>
        <td><span class="badge partial">Conceptual</span></td>
        <td><span class="badge open">Open Whitespace</span></td>
      </tr>
      <tr>
        <td>Adobe LLM Optimizer</td>
        <td>Enterprise AEM integration</td>
        <td>Partial</td>
        <td><span class="badge partial">MCP + A2A</span></td>
        <td><span class="badge none">None</span></td>
      </tr>
      <tr>
        <td>Scrunch AI (AXP)</td>
        <td>Technical AEO</td>
        <td>Shadow site / CDN</td>
        <td><span class="badge none">None</span></td>
        <td><span class="badge none">None</span></td>
      </tr>
      <tr>
        <td>BrightEdge</td>
        <td>SEO + AI Overviews</td>
        <td>Generative Parser</td>
        <td><span class="badge none">Conceptual only</span></td>
        <td><span class="badge none">None</span></td>
      </tr>
      <tr>
        <td>Writesonic GEO</td>
        <td>Content + GEO scoring</td>
        <td>None</td>
        <td><span class="badge none">None</span></td>
        <td><span class="badge none">None</span></td>
      </tr>
      <tr>
        <td>Peec AI</td>
        <td>AI search analytics</td>
        <td>None</td>
        <td><span class="badge none">None</span></td>
        <td><span class="badge none">None</span></td>
      </tr>
      <tr>
        <td>Otterly.ai</td>
        <td>Brand monitoring</td>
        <td>None</td>
        <td><span class="badge none">None</span></td>
        <td><span class="badge none">None</span></td>
      </tr>
    </tbody>
  </table>

  <div class="gap-callout">
    The competitive moat is shifting from <strong>who tracks AI answers best</strong> → <strong>who owns the agent interaction layer</strong>. Adobe is the only player moving toward MCP, but they're not enterprise-AEO native. <strong>Profound has the infrastructure, the customer base, and the brand to win this.</strong>
  </div>

  <div class="why-me">
    <div class="why-me-label">Why me</div>
    <div class="why-me-text">I did a full competitive scan — 24 platforms, product docs, G2 reviews, and press releases — to build this table. I can run this kind of research sprint as a core part of the internship.</div>
  </div>
` }}
        />
        {/* Slide 7 */}
        <div className={slideClass(6)} id="s7"
          dangerouslySetInnerHTML={{
            __html: `
  <div class="section-label">06 — Opportunity 1</div>
  <h2 class="headline-md" style="margin-bottom:4px;">Define a new category before<br>any competitor can name it.</h2>
  <p class="body-text" style="max-width:640px;">Just as Profound coined "AEO," WebMCP creates <strong class="body-strong">Agent Experience Optimization (AXO)</strong> — and the AXO Score becomes as standard as domain authority or AI visibility score.</p>

  <div class="axo-layout">
    <div>
      <div class="axo-score-card">
        <div class="axo-sc-title">Profound · AXO Score · Target.com</div>
        <div style="display:flex;align-items:flex-end;gap:12px;">
          <div class="axo-score-big">68</div>
          <div style="margin-bottom:12px;">
            <div style="font-size:11px;color:var(--muted);">/ 100</div>
            <div style="font-size:9px;color:rgba(244,242,238,0.3);letter-spacing:0.08em;text-transform:uppercase;margin-top:2px;">AXO Score</div>
          </div>
        </div>
        <div class="axo-breakdown">
          <div class="axo-metric">
            <div class="axo-metric-label">Tools Registered</div>
            <div class="axo-bar-wrap"><div class="axo-bar" style="width:58%"></div></div>
            <div class="axo-metric-val">7/12</div>
          </div>
          <div class="axo-metric">
            <div class="axo-metric-label">Agent Discovery</div>
            <div class="axo-bar-wrap"><div class="axo-bar" style="width:88%"></div></div>
            <div class="axo-metric-val">88%</div>
          </div>
          <div class="axo-metric">
            <div class="axo-metric-label">Execution Success</div>
            <div class="axo-bar-wrap"><div class="axo-bar" style="width:61%"></div></div>
            <div class="axo-metric-val">61%</div>
          </div>
          <div class="axo-metric">
            <div class="axo-metric-label">Schema Quality</div>
            <div class="axo-bar-wrap"><div class="axo-bar" style="width:74%"></div></div>
            <div class="axo-metric-val">74%</div>
          </div>
          <div class="axo-metric">
            <div class="axo-metric-label">Competitor Rank</div>
            <div class="axo-bar-wrap"><div class="axo-bar" style="width:40%"></div></div>
            <div class="axo-metric-val">#4/8</div>
          </div>
        </div>
        <div style="margin-top:14px;padding:10px 14px;background:rgba(244,242,238,0.04);border:1px solid var(--border);font-size:11px;color:var(--muted);line-height:1.5;">
          💡 Register <code style="font-family:'DM Mono',monospace;color:var(--white);">checkout_cart</code> and <code style="font-family:'DM Mono',monospace;color:var(--white);">filter_by_price</code> tools to jump to AXO #2 in your category.
        </div>
      </div>
    </div>
    <div class="axo-points">
      <div class="axo-pt lit">
        <div class="axo-pt-title">A metric CMOs will report</div>
        <div class="axo-pt-body">AXO Score becomes a C-suite KPI — just like domain authority. Fortune 500 clients will benchmark it quarterly. \$250K–\$800K contracts renew around it.</div>
      </div>
      <div class="axo-pt">
        <div class="axo-pt-title">Built on existing infra</div>
        <div class="axo-pt-body">Profound's Agent Analytics already tracks how AI bots crawl sites. WebMCP tool tracking is an extension — Cloudflare/Vercel logs already capture the signals.</div>
      </div>
      <div class="axo-pt">
        <div class="axo-pt-title">Competitive intelligence layer</div>
        <div class="axo-pt-body">Benchmark your WebMCP readiness vs. category rivals. A built-in upsell for every existing contract. No competitor is positioned to offer this.</div>
      </div>
      <div class="axo-pt">
        <div class="axo-pt-title">The naming window is open — now</div>
        <div class="axo-pt-body">AEO became standard because Profound named it. The same opportunity exists for AXO. But only if you define it before Adobe does.</div>
      </div>
    </div>
  </div>

  <div class="why-me">
    <div class="why-me-label">Why me</div>
    <div class="why-me-text">I designed the AXO Score framework above as a prototype — defining which signals constitute a score, how they'd be weighted, and what makes it defensible as a Profound metric.</div>
  </div>
` }}
        />
        {/* Slide 8 */}
        <div className={slideClass(7)} id="s8"
          dangerouslySetInnerHTML={{
            __html: `
  <div class="section-label">07 — Opportunity 2</div>
  <h2 class="headline-md" style="margin-bottom:4px;">The engineering lift is incremental,<br>not architectural. Here's why.</h2>
  <p class="body-text" style="max-width:680px;">Profound's existing stack is closer to WebMCP readiness than any competitor. The path from Agent Analytics today → AXO platform tomorrow is a sprint, not a rebuild.</p>

  <div class="infra-flow">
    <div class="infra-row today">
      <div class="infra-label">Headless Browser Fleet</div>
      <div class="infra-content">12,000–112,000 daily prompts across ChatGPT, Perplexity, Gemini, Claude, Grok + 8 others → answer tracking <div><span class="infra-tag exists">Exists</span></div></div>
    </div>
    <div class="infra-row today">
      <div class="infra-label">Agent Analytics</div>
      <div class="infra-content">CDN-level tracking (Cloudflare, Vercel, Fastly) of AI bots crawling client websites — who visits, when, what they read <div><span class="infra-tag exists">Exists</span></div></div>
    </div>
    <div class="infra-row today">
      <div class="infra-label">400M+ Prompt Dataset</div>
      <div class="infra-content">Real user AI conversations — what people actually ask AI about brands. Foundation for tool description optimization <div><span class="infra-tag exists">Exists</span></div></div>
    </div>
    <div class="infra-row extend">
      <div class="infra-label">WebMCP Crawler</div>
      <div class="infra-content">Chrome 146 + flag → headless fleet discovers WebMCP tools on client sites + competitors. Structured data, not screenshots <div><span class="infra-tag build">Build</span></div></div>
    </div>
    <div class="infra-row extend">
      <div class="infra-label">Tool Schema Optimizer</div>
      <div class="infra-content">Match 400M+ prompt dataset → optimize tool descriptions so agents discover them more often. LLM + prompt data = instant advantage <div><span class="infra-tag build">Build</span></div></div>
    </div>
    <div class="infra-row new-row">
      <div class="infra-label">AXO Score Engine</div>
      <div class="infra-content">Synthesize tool registration, discovery rate, execution quality, and competitor benchmarks → AXO Score. New enterprise metric. <div><span class="infra-tag build">Build</span></div></div>
    </div>
  </div>

  <div class="benefit-row">
    <div class="benefit-chip">
      <div class="bc-num">−67%</div>
      <div class="bc-label">Profound's own data collection cost when AI platforms expose WebMCP tools — agents query directly vs. headless simulation</div>
    </div>
    <div class="benefit-chip">
      <div class="bc-num">\$250K+</div>
      <div class="bc-label">Average enterprise contract value. WebMCP module = expansion revenue on every renewal</div>
    </div>
    <div class="benefit-chip">
      <div class="bc-num">0</div>
      <div class="bc-label">Competitors with WebMCP tooling today. First product shipped owns the category definition</div>
    </div>
  </div>

  <div class="why-me">
    <div class="why-me-label">Why me</div>
    <div class="why-me-text">I scoped the "extend vs. rebuild" distinction by reading Profound's job posts, the Agent Analytics product page, and CDN integration docs. I can help the team scope the actual sprint, not just describe it abstractly.</div>
  </div>
` }}
        />
        {/* Slide 9 */}
        <div className={slideClass(8)} id="s9"
          dangerouslySetInnerHTML={{
            __html: `
  <div class="section-label">08 — Prototype</div>
  <h2 class="headline-md" style="margin-bottom:4px;">What an AXO dashboard inside<br>Profound could look like.</h2>
  <p class="body-text" style="max-width:640px;">Built this mockup to show what WebMCP readiness data surfaces look like inside Profound's existing Agent Analytics context.</p>

  <div class="proto-wrap">
    <div class="proto-screen">
      <div class="proto-header">
        <div class="proto-dot"></div>
        <div class="proto-dot"></div>
        <div class="proto-dot"></div>
        <span class="proto-bar-text">Profound · Agent Experience · target.com</span>
      </div>
      <div class="proto-tabs">
        <div class="proto-tab">Answer Engine</div>
        <div class="proto-tab active">Agent Readiness</div>
        <div class="proto-tab">Competitors</div>
      </div>
      <div class="proto-body">
        <div class="proto-brand-row">
          <div>
            <div class="proto-brand">Target — retail category</div>
            <div style="font-size:10px;color:var(--muted);margin-top:2px;">vs. 7 competitors · updated 2h ago</div>
          </div>
          <div style="text-align:right;">
            <div class="proto-score-badge">68</div>
            <div class="proto-score-label">AXO Score</div>
          </div>
        </div>
        <div class="proto-metrics">
          <div class="pm">
            <div class="pm-header"><span class="pm-lbl">WebMCP Tools Registered</span><span class="pm-val">7 / 12</span></div>
            <div class="pm-track"><div class="pm-fill" style="width:58%"></div></div>
          </div>
          <div class="pm">
            <div class="pm-header"><span class="pm-lbl">Agent Discovery Rate</span><span class="pm-val">88%</span></div>
            <div class="pm-track"><div class="pm-fill" style="width:88%"></div></div>
          </div>
          <div class="pm">
            <div class="pm-header"><span class="pm-lbl">Tool Execution Success</span><span class="pm-val">61%</span></div>
            <div class="pm-track"><div class="pm-fill" style="width:61%"></div></div>
          </div>
          <div class="pm">
            <div class="pm-header"><span class="pm-lbl">Schema Description Quality</span><span class="pm-val">74 / 100</span></div>
            <div class="pm-track"><div class="pm-fill" style="width:74%"></div></div>
          </div>
          <div class="pm">
            <div class="pm-header"><span class="pm-lbl">Category Rank (AXO)</span><span class="pm-val">#4 of 8</span></div>
            <div class="pm-track"><div class="pm-fill" style="width:40%"></div></div>
          </div>
        </div>
        <div class="proto-insight">⚠ Missing: <code style="font-family:'DM Mono',monospace;">checkout_cart</code>, <code style="font-family:'DM Mono',monospace;">filter_by_price</code>, <code style="font-family:'DM Mono',monospace;">get_recommendations</code> — registering these would move you from #4 to #2 in category.</div>
        <div class="proto-action">View full recommendations →</div>
      </div>
    </div>
    <div class="proto-right">
      <div class="pp lit">
        <div class="pp-title">New enterprise KPI</div>
        <div class="pp-body">AXO Score reported to CMO quarterly — just like AI Visibility Score is today. Built-in renewal anchor and upsell hook.</div>
      </div>
      <div class="pp">
        <div class="pp-title">Profound Agents automate fixes</div>
        <div class="pp-body">Profound's autonomous agents draft optimized tool descriptions and push WebMCP schemas to client CMS — one-click optimization.</div>
      </div>
      <div class="pp">
        <div class="pp-title">Competitor benchmarking</div>
        <div class="pp-body">How agent-ready is Walmart vs. Target? Best Buy vs. Amazon? Brands pay for this intelligence. Profound already has the crawl infra.</div>
      </div>
      <div class="pp">
        <div class="pp-title">Timing: now, not later</div>
        <div class="pp-body">Chrome 146 is stable. Enterprise clients will ask about WebMCP readiness before you've built the dashboard. Ship it first, define the category.</div>
      </div>
    </div>
  </div>

  <div class="why-me">
    <div class="why-me-label">Why me</div>
    <div class="why-me-text">I built this dashboard mockup in HTML/CSS to show I can design and think in product terms — not just write strategy decks. This is what a summer of shipping looks like.</div>
  </div>
` }}
        />
        {/* Slide 10 */}
        <div className={slideClass(9)} id="s10"
          dangerouslySetInnerHTML={{
            __html: `
  <div class="eyebrow">The Person Behind This Deck</div>
  <h2 class="headline-md" style="color:var(--black);margin-bottom:4px;">I didn't just read about WebMCP.<br>I mapped what it means for Profound.</h2>
  <div class="wm-grid">
    <div class="wm-col">
      <div class="wm-num">01</div>
      <div class="wm-title">Strategic Pattern Recognition</div>
      <div class="wm-body">I spotted WebMCP weeks after its announcement and immediately asked: <strong>what does this mean for a platform like Profound?</strong> This deck is the output. I find inflection points before they're obvious — which is what good product work requires.</div>
    </div>
    <div class="wm-col">
      <div class="wm-num">02</div>
      <div class="wm-title">Technical Fluency × Product Thinking</div>
      <div class="wm-body">I read the <strong>W3C spec, the Chrome 146 flag docs, and the MCP-B bridge repo</strong> — then translated them into a product framework (AXO Score), a competitive map, and an infra extension plan. I can work with engineers without needing translation.</div>
    </div>
    <div class="wm-col">
      <div class="wm-num">03</div>
      <div class="wm-title">I Ship, Not Just Strategize</div>
      <div class="wm-body">This entire deck — the diagrams, the dashboard prototype, the competitive table, the market sizing — I <strong>built it independently</strong>. I synthesized McKinsey, Gartner, IDC, Goldman research, read 24 competitor product pages, and coded the output. That's the work style I bring.</div>
    </div>
  </div>
  <div class="wm-ask">
    <div class="wm-ask-text">I'm looking for a <strong>summer 2026 internship</strong> at Profound — ideally on the product strategy, growth, or agent platform team. I want to help define and build the AXO category before anyone else does. This deck is the start of that conversation.</div>
    <div class="wm-ask-label">The Ask</div>
  </div>
` }}
        />
        {/* Slide 11 */}
        <div className={slideClass(10)} id="s11"
          dangerouslySetInnerHTML={{
            __html: `
  <div class="eyebrow">The Ask</div>
  <h1 class="headline" style="font-size:clamp(40px,5.5vw,72px);">The window<br>is <span>open</span>.<br>Not for long.</h1>
  <div class="cta-divider"></div>
  <ul class="cta-list">
    <li class="cta-item">
      <span class="cta-n">1.</span>
      <span>Add <strong>WebMCP tool-tracking to Agent Analytics</strong> — a lightweight extension of existing CDN infrastructure, not a rebuild.</span>
    </li>
    <li class="cta-item">
      <span class="cta-n">2.</span>
      <span>Define and ship the <strong>AXO Score</strong> as a new enterprise metric before any competitor can name the category.</span>
    </li>
    <li class="cta-item">
      <span class="cta-n">3.</span>
      <span>Position Profound as the only platform that optimizes the <strong>full AI stack</strong> — what AI says <em>and</em> what it does.</span>
    </li>
  </ul>
  <div class="cta-divider"></div>
  <div class="cta-footer">The \$96M Series C gives Profound the runway. Chrome 146 gives the urgency. No competitor is looking at this yet — and I want to help build it this summer.</div>

  <div class="cta-cover-right">
    <div>
      <div class="cta-cr-label">Proposed internship focus</div>
      <div class="cta-cr-val">Product strategy, AXO category definition, agent analytics research</div>
    </div>
    <div>
      <div class="cta-cr-label">Timeline</div>
      <div class="cta-cr-val">Summer 2026 — June through August</div>
    </div>
    <div>
      <div class="cta-cr-label">What I deliver</div>
      <div class="cta-cr-val">AXO Score framework, competitive intelligence, WebMCP readiness research sprint</div>
    </div>
  </div>

  <div class="why-me" style="border-left-color:rgba(8,8,7,0.2);">
    <div class="why-me-label" style="color:rgba(8,8,7,0.4);">Why me</div>
    <div class="why-me-text" style="color:rgba(8,8,7,0.45);">This deck is my work sample. If I can do this before I'm even in the building, imagine what I can do with Profound's data, team, and infrastructure behind me.</div>
  </div>
` }}
        />

      </div>

      <div className="nav">
        <button className="nav-btn" onClick={() => navigate(-1)}>←</button>
        <span className="slide-counter">{current + 1} / {total}</span>
        <button className="nav-btn" onClick={() => navigate(1)}>→</button>
      </div>
    </div>
  );
}
