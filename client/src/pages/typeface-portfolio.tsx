// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';

/* ─────────────────────────────────────────────────────
   TYPEFACE — BRAND VOICE INTELLIGENCE LOOP
   Executive Presentation + Live Prototype
   Portfolio Case Study Copy
   ───────────────────────────────────────────────────── */

// ── Responsive Hook ──

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

// ── Design Tokens ──

const C = {
  bgPage: '#FAFAF9',
  bgCard: '#FFFFFF',
  bgDark: '#0F0F0F',
  bgDarkCard: '#1A1A1A',
  bgMuted: '#F4F4F1',
  brandViolet: '#5B4FE8',
  brandVioletLight: '#EAE8FD',
  brandVioletDark: '#3D33B0',
  positive: '#16A34A',
  positiveBg: '#F0FDF4',
  negative: '#DC2626',
  negativeBg: '#FEF2F2',
  warning: '#D97706',
  warningBg: '#FFFBEB',
  textPrimary: '#0F0F0F',
  textSecondary: '#4B4B4B',
  textTertiary: '#6B7280',
  textInverse: '#FAFAF9',
  textInverseSecondary: '#D1D5DB',
  borderLight: '#E5E5E3',
  borderMedium: '#D1D1CE',
  borderDark: '#2A2A2A',
};

const F = {
  display: "'Instrument Serif', serif",
  ui: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

const SLIDE_LABELS = [
  '01 / PROBLEM',
  '02 / COMPETITIVE LANDSCAPE',
  '03 / USER RESEARCH',
  '04 / PROTOTYPE',
  '05 / SHIP & MEASURE',
];

const DEMO = {
  voiceDescription: "Trusted advisor in the enterprise tech space. We\u2019re authoritative, comprehensive, and deeply knowledgeable. We write long-form content that demonstrates expertise. Our tone is professional with occasional warmth.",
  audience: "VP and C-suite marketing leaders at enterprise retailers, 40-55. They have large teams, complex stacks, and are under pressure to show AI ROI to their boards. They\u2019ve seen a lot of vendor pitches.",
  avoidVoice: "Overpromising, jargon, passive voice. We don\u2019t want to sound like every other AI company claiming to \u201Crevolutionize\u201D marketing.",
  bestPerformers: "Short LinkedIn posts with a single specific data point drove 4x more engagement than long articles. One-pager case studies with concrete before/after metrics generated most demo requests. Email subject lines with a direct question outperformed statements by 60%.",
  underperformers: "Thought leadership articles over 1500 words had very low completion rates. Blog posts that opened with context and background before getting to the point got high bounce rates. Generic CTAs like \u201Clearn more\u201D and \u201Cdownload now\u201D had 0.8% CTR vs 3.2% for specific value-prop CTAs.",
  industryContext: "Two major retail AI platforms announced free tiers during our campaign window. Category conversation was dominated by competitor launches, not use cases.",
  culturalContext: "Campaign ran across Black Friday and Cyber Monday \u2014 audience was in deal-hunting mode, not thought-leadership mode. High content volume across all competitors.",
  platformContext: "LinkedIn reach dropped ~20% industry-wide during this period due to algorithm shift favoring native content over article links. Our content was primarily article-based.",
};

// ── Shared Styles ──

const card = (extra) => ({
  background: C.bgCard,
  border: `1px solid ${C.borderLight}`,
  borderRadius: 12,
  padding: 24,
  ...extra,
});

const darkCard = (extra) => ({
  background: C.bgDarkCard,
  border: `1px solid ${C.borderDark}`,
  borderRadius: 12,
  padding: 24,
  ...extra,
});

const sectionLabel = (color) => ({
  fontFamily: F.mono,
  fontSize: 11,
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: color || C.brandViolet,
  marginBottom: 8,
});

const slideTitle = (inverse) => ({
  fontFamily: F.display,
  fontStyle: 'italic',
  fontWeight: 400,
  fontSize: 52,
  lineHeight: 1.15,
  color: inverse ? C.textInverse : C.textPrimary,
  margin: '0 0 24px 0',
});

const bodyText = (inverse) => ({
  fontFamily: F.ui,
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.6,
  color: inverse ? C.textInverseSecondary : C.textSecondary,
});

const heading22 = {
  fontFamily: F.ui,
  fontSize: 22,
  fontWeight: 600,
  color: C.textPrimary,
  margin: '0 0 16px 0',
};

// ── SLIDE 0: INTRO — WHO I AM ──

// ── SLIDE 1: THE PROBLEM (Dark Hero) ──

function Slide1() {
  const mob = useIsMobile();
  return (
    <div style={{
      height: '100%',
      background: C.bgDark,
      borderRadius: 0,
      padding: mob ? '20px 20px' : '48px 64px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflowY: 'auto',
    }}>
      <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: mob ? 24 : 48, flex: 1, alignItems: 'flex-start' }}>
        {/* Left: Narrative */}
        <div style={{ flex: mob ? 'unset' : '0 0 55%', paddingTop: mob ? 24 : 16 }}>
          <div style={sectionLabel(C.brandViolet)}>THE PROBLEM</div>
          <h1 style={{ ...slideTitle(true), fontSize: mob ? 28 : 50, marginBottom: mob ? 20 : 32 }}>
            Brand Hub learns your guidelines.{' '}
            <span style={{ opacity: 0.6 }}>It doesn't learn from your results.</span>
          </h1>
          <div style={{ ...bodyText(true), maxWidth: 480, marginBottom: mob ? 14 : 20, fontSize: mob ? 14 : 16 }}>
            Typeface has built the most sophisticated brand governance system in
            enterprise AI content. Brand Hub knows your voice. Brand Agent enforces it.
            Arc Agents execute from it.
          </div>
          <div style={{ ...bodyText(true), maxWidth: 480, marginBottom: mob ? 14 : 20, fontSize: mob ? 14 : 16 }}>
            But the model that generates next week's campaign has no idea that
            "bold and direct" copy outperformed "warm and approachable" by 34%
            in your 18-24 segment last month. That signal lives in your analytics
            stack. It never makes it back.
          </div>
          <div style={{
            ...bodyText(true),
            maxWidth: 480,
            color: C.textInverse,
            fontWeight: 500,
            fontSize: mob ? 14 : 16,
          }}>
            Brand Hub evolves when a human rewrites the guidelines. Not when the market speaks.
          </div>
        </div>

        {/* Right: Stat cards */}
        <div style={{ flex: mob ? 'unset' : '0 0 42%', width: mob ? '100%' : 'auto', display: 'flex', flexDirection: 'column', gap: mob ? 12 : 16, paddingTop: mob ? 0 : 16 }}>
          {[
            {
              num: '95%',
              body: 'of enterprise AI initiatives fail to deliver measurable ROI \u2014 not because the AI underperforms, but because there\u2019s no feedback loop connecting outputs to outcomes.',
              src: 'MIT / MLQ.ai GenAI Divide Report, 2025',
            },
            {
              num: '83%',
              body: 'of retail marketers have adopted AI content tools \u2014 yet most report their benefits remain siloed, limited by disconnected systems that can\u2019t learn from each other.',
              src: 'Typeface Signal Report: Retail Edition, 2025',
            },
            {
              num: '0',
              body: 'of the major enterprise AI content platforms \u2014 Typeface, Writer, Jasper, Adobe GenStudio \u2014 natively connect content performance data back to brand voice calibration.',
              src: 'Competitive analysis, Feb 2025',
            },
          ].map((c, i) => (
            <div key={i} style={darkCard({ padding: mob ? 16 : 24 })}>
              <div style={{
                fontFamily: F.mono,
                fontSize: mob ? 28 : 42,
                fontWeight: 500,
                color: C.brandViolet,
                marginBottom: 8,
              }}>
                {c.num}
              </div>
              <div style={{
                fontFamily: F.ui,
                fontSize: mob ? 13 : 14,
                color: C.textInverseSecondary,
                lineHeight: 1.6,
                marginBottom: 8,
              }}>
                {c.body}
              </div>
              <div style={{
                fontFamily: F.ui,
                fontSize: 11,
                color: C.textTertiary,
                fontStyle: 'italic',
              }}>
                {c.src}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <div style={{
        borderTop: `1px solid ${C.borderDark}`,
        paddingTop: 12,
        marginTop: mob ? 20 : 'auto',
      }}>
        <div style={{
          fontFamily: F.ui,
          fontSize: mob ? 11 : 12,
          color: C.textTertiary,
          lineHeight: 1.5,
        }}>
          Note: This analysis is based on Typeface's public product documentation,
          competitive research, and industry reports. The prototype on slide 4
          demonstrates one way to close this gap.
        </div>
      </div>
    </div>
  );
}

// ── SLIDE 2: COMPETITIVE LANDSCAPE ──

function Slide2() {
  const mob = useIsMobile();
  const headers = ['', 'Typeface', 'Writer', 'Jasper', 'Adobe GenStudio'];
  const rows = [
    { dim: 'Brand governance depth', vals: ['\u2605\u2605\u2605\u2605\u2605', '\u2605\u2605\u2605\u2606\u2606', '\u2605\u2605\u2606\u2606\u2606', '\u2605\u2605\u2605\u2606\u2606'] },
    { dim: 'Multimodal (text+image+video)', vals: ['\u2713', 'Text only', 'Text only', 'Text + image'] },
    { dim: 'Enterprise data security', vals: ['\u2713', '\u2713', 'Partial', '\u2713'] },
    { dim: 'Agentic workflow orchestration', vals: ['\u2713 (Arc Agents)', '\u2713 (growing)', '\u2717', 'Partial'] },
    { dim: 'Performance \u2192 voice feedback loop', vals: ['\u2717', '\u2717', '\u2717', '\u2717'], highlight: true },
    { dim: 'AEO-readiness scoring', vals: ['\u2717', '\u2717', '\u2717', '\u2717'], highlight: true },
  ];

  return (
    <div style={{ height: '100%', padding: mob ? '20px 20px' : '48px 64px', overflowY: 'auto' }}>
      <div style={{ textAlign: 'center', marginBottom: mob ? 24 : 40 }}>
        <div style={sectionLabel()}>COMPETITIVE LANDSCAPE</div>
        <h1 style={{ ...slideTitle(), textAlign: 'center', margin: '0 auto 16px', fontSize: mob ? 26 : 52 }}>
          Everyone generates content. Nobody closes the loop.
        </h1>
        <p style={{ ...bodyText(), maxWidth: 600, margin: '0 auto', textAlign: 'center', fontSize: mob ? 14 : 16 }}>
          The enterprise AI content market has converged on the same architecture:
          feed in brand guidelines, generate content that conforms to them.
          The differentiation battle is being fought on modality, integrations,
          and governance. Nobody has moved to the next question: does the content
          work, and does the brand model improve because of it?
        </p>
      </div>

      {/* Comparison table */}
      <div style={{
        border: `1px solid ${C.borderLight}`,
        borderRadius: 12,
        overflow: mob ? 'auto' : 'hidden',
        marginBottom: mob ? 20 : 32,
        WebkitOverflowScrolling: 'touch',
      }}>
        <div style={{ minWidth: mob ? 640 : 'auto' }}>
          {/* Header row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '22% 19.5% 19.5% 19.5% 19.5%',
            background: C.brandViolet,
          }}>
            {headers.map((h, i) => (
              <div key={i} style={{
                fontFamily: F.ui,
                fontSize: mob ? 11 : 13,
                fontWeight: 600,
                color: C.textInverse,
                padding: mob ? '10px 10px' : '14px 16px',
                borderRight: i < headers.length - 1 ? `1px solid ${C.brandVioletDark}` : 'none',
              }}>
                {h}
              </div>
            ))}
          </div>
          {/* Data rows */}
          {rows.map((row, ri) => (
            <div key={ri} style={{
              display: 'grid',
              gridTemplateColumns: '22% 19.5% 19.5% 19.5% 19.5%',
              background: row.highlight ? C.brandVioletLight : (ri % 2 === 0 ? C.bgPage : C.bgCard),
              borderBottom: ri < rows.length - 1 ? `1px solid ${C.borderLight}` : 'none',
            }}>
              <div style={{
                fontFamily: F.ui,
                fontSize: mob ? 11 : 13,
                fontWeight: 500,
                color: C.textPrimary,
                padding: mob ? '10px 10px' : '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                {row.dim}
              </div>
              {row.vals.map((v, vi) => (
                <div key={vi} style={{
                  fontFamily: F.ui,
                  fontSize: mob ? 11 : 13,
                  color: v === '\u2717' ? C.textTertiary : (v === '\u2713' || v === '\u2713 (Arc Agents)') ? C.positive : C.textSecondary,
                  padding: mob ? '10px 10px' : '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontWeight: v === '\u2713' || v === '\u2713 (Arc Agents)' ? 600 : 400,
                }}>
                  {v}
                  {row.highlight && v === '\u2717' && (
                    <span style={{
                      fontFamily: F.mono,
                      fontSize: 9,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: C.brandViolet,
                      background: C.bgCard,
                      border: `1px solid ${C.brandViolet}40`,
                      borderRadius: 4,
                      padding: '2px 6px',
                      fontWeight: 500,
                    }}>
                      Opportunity
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {mob && (
        <div style={{ fontFamily: F.ui, fontSize: 11, color: C.textTertiary, textAlign: 'center', marginBottom: 16 }}>
          Swipe to scroll table
        </div>
      )}

      {/* Two callout boxes */}
      <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: mob ? 12 : 20 }}>
        <div style={{
          flex: 1,
          background: C.brandVioletLight,
          borderLeft: `3px solid ${C.brandViolet}`,
          borderRadius: '0 12px 12px 0',
          padding: mob ? 16 : 20,
        }}>
          <div style={{ fontFamily: F.ui, fontSize: mob ? 13 : 14, fontWeight: 600, color: C.textPrimary, marginBottom: 8 }}>
            TYPEFACE'S MOAT
          </div>
          <div style={{ fontFamily: F.ui, fontSize: mob ? 13 : 14, color: C.textSecondary, lineHeight: 1.6 }}>
            Multimodal brand governance is genuinely hard to replicate.
            The Brand Hub is the strongest competitive asset in the market.
            The question is what gets built on top of it.
          </div>
        </div>
        <div style={{
          flex: 1,
          background: C.warningBg,
          borderLeft: `3px solid ${C.warning}`,
          borderRadius: '0 12px 12px 0',
          padding: mob ? 16 : 20,
        }}>
          <div style={{ fontFamily: F.ui, fontSize: mob ? 13 : 14, fontWeight: 600, color: C.textPrimary, marginBottom: 8 }}>
            THE WHITE SPACE
          </div>
          <div style={{ fontFamily: F.ui, fontSize: mob ? 13 : 14, color: C.textSecondary, lineHeight: 1.6 }}>
            Connecting content performance back to brand voice is an
            architectural capability, not a feature. Whoever builds it
            first turns their brand model from a static ruleset into a
            living, learning system. That's a different category of product.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SLIDE 3: USER RESEARCH & PRODUCT THESIS ──

function PainDots({ level }) {
  return (
    <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: i <= level ? C.brandViolet : C.borderLight,
        }} />
      ))}
      <span style={{ fontFamily: F.ui, fontSize: 11, color: C.textTertiary, marginLeft: 4 }}>
        Pain level
      </span>
    </div>
  );
}

function Slide3() {
  const mob = useIsMobile();
  const personas = [
    {
      role: 'BRAND MANAGER \u2014 FORTUNE 500',
      headline: "I rewrite the brand guidelines based on gut, not data",
      body: "After a big campaign, I update Brand Hub manually based on what I think worked. I don\u2019t have a systematic way to know which voice decisions drove the results versus which ones the audience ignored.",
      pain: 4,
    },
    {
      role: 'CONTENT STRATEGY LEAD \u2014 AGENCY',
      headline: "I manage 12 brand accounts and review cycles kill my team",
      body: "Every account has a Brand Hub setup. But when content gets edited in review, nobody feeds that back. The next generation ignores what we learned. We correct the same problems every quarter.",
      pain: 5,
    },
    {
      role: 'VP MARKETING \u2014 RETAIL ENTERPRISE',
      headline: "I can tell you content volume. I can\u2019t tell you brand voice ROI.",
      body: "My CMO asks me to prove the value of Typeface. I can show outputs and speed. I can\u2019t show that the AI is getting better at sounding like us over time, or that it\u2019s learning what resonates with our customers.",
      pain: 4,
    },
  ];

  const steps = [
    { label: 'GENERATE', desc: 'Arc Agents create content from Brand Hub', arrow: 'content output' },
    { label: 'DISTRIBUTE', desc: 'Content goes live across channels', arrow: 'performance data' },
    { label: 'ANALYZE', desc: 'Performance Agent reads engagement, conversion, resonance by segment', arrow: 'voice signal' },
    { label: 'CALIBRATE', desc: 'Brand Hub receives performance-weighted voice insights \u2014 strongest signals surface for human review and approval', arrow: null, isNew: true },
  ];

  return (
    <div style={{ height: '100%', padding: mob ? '20px 20px' : '48px 64px', overflowY: 'auto' }}>
      <div style={sectionLabel()}>USER RESEARCH</div>

      <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: mob ? 24 : 40, marginBottom: mob ? 20 : 32 }}>
        {/* Left: Personas */}
        <div style={{ flex: mob ? 'unset' : '0 0 38%' }}>
          <h2 style={{ ...heading22, fontSize: mob ? 18 : 20, marginBottom: 16 }}>
            Who loses when the loop doesn't close
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {personas.map((p, i) => (
              <div key={i} style={card({ padding: 18 })}>
                <div style={{
                  fontFamily: F.mono,
                  fontSize: 10,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: C.brandViolet,
                  marginBottom: 8,
                }}>
                  {p.role}
                </div>
                <div style={{
                  fontFamily: F.ui,
                  fontSize: 15,
                  fontWeight: 600,
                  color: C.textPrimary,
                  lineHeight: 1.4,
                  marginBottom: 8,
                }}>
                  "{p.headline}"
                </div>
                <div style={{
                  fontFamily: F.ui,
                  fontSize: 13,
                  color: C.textSecondary,
                  lineHeight: 1.6,
                }}>
                  {p.body}
                </div>
                <PainDots level={p.pain} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product thesis + flow */}
        <div style={{ flex: 1 }}>
          <h2 style={{ ...heading22, fontSize: mob ? 18 : 22 }}>Product Thesis</h2>
          <div style={{ ...bodyText(), marginBottom: mob ? 16 : 24, maxWidth: 540, fontSize: mob ? 14 : 16 }}>
            If Brand Hub is Typeface's core moat, then the value
            of that moat compounds every time brand voice improves.
            Right now, improvement requires a human to manually
            update guidelines.
          </div>
          <div style={{ ...bodyText(), marginBottom: mob ? 20 : 32, maxWidth: 540, color: C.textPrimary, fontWeight: 500, fontSize: mob ? 14 : 16 }}>
            The thesis: performance signals should flow back
            into Brand Hub automatically &mdash; so the brand model
            gets smarter with every campaign, not just every
            guidelines update.
          </div>

          {/* Flow diagram */}
          <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: 0, alignItems: 'flex-start', marginBottom: mob ? 20 : 32 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ flex: mob ? 'unset' : 1, width: mob ? '100%' : 'auto', display: 'flex', flexDirection: mob ? 'column' : 'row', alignItems: mob ? 'center' : 'flex-start' }}>
                <div style={{
                  ...card({
                    padding: mob ? 12 : 14,
                    flex: mob ? 'unset' : 1,
                    width: mob ? '100%' : 'auto',
                    border: s.isNew ? `2px solid ${C.brandViolet}` : `1px solid ${C.borderLight}`,
                    background: s.isNew ? C.brandVioletLight : C.bgCard,
                    position: 'relative',
                  }),
                }}>
                  {s.isNew && (
                    <span style={{
                      position: 'absolute',
                      top: -10,
                      right: 10,
                      fontFamily: F.mono,
                      fontSize: 9,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      background: C.brandViolet,
                      color: '#fff',
                      padding: '2px 8px',
                      borderRadius: 4,
                    }}>
                      New
                    </span>
                  )}
                  <div style={{
                    fontFamily: F.ui,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: s.isNew ? C.brandViolet : C.textTertiary,
                    marginBottom: 6,
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontFamily: F.ui,
                    fontSize: 12,
                    color: C.textSecondary,
                    lineHeight: 1.5,
                  }}>
                    {s.desc}
                  </div>
                </div>
                {s.arrow && (
                  <div style={{
                    display: 'flex',
                    flexDirection: mob ? 'row' : 'column',
                    alignItems: 'center',
                    padding: mob ? '6px 0' : '18px 4px 0',
                    minWidth: mob ? 'auto' : 36,
                  }}>
                    <span style={{ fontFamily: F.ui, fontSize: 18, color: C.textTertiary, transform: mob ? 'rotate(90deg)' : 'none' }}>{'\u2192'}</span>
                    <span style={{
                      fontFamily: F.ui,
                      fontSize: 9,
                      color: C.textTertiary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                      marginTop: mob ? 0 : 2,
                      marginLeft: mob ? 6 : 0,
                    }}>
                      {s.arrow}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* JTBD */}
          <div style={{
            ...card({ padding: '18px 22px' }),
            borderLeft: `3px solid ${C.brandViolet}`,
          }}>
            <div style={sectionLabel()}>JOBS TO BE DONE</div>
            <div style={{
              fontFamily: F.ui,
              fontSize: 15,
              color: C.textSecondary,
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}>
              When I run a campaign on Typeface, I want to know not just that the
              content was on-brand &mdash; but that the brand voice model learned something
              from how the audience responded. So that next quarter's content is
              better calibrated than last quarter's.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SLIDE 4: THE LIVE PROTOTYPE ──

function ProtoInput({ label, placeholder, value, onChange, rows }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        fontFamily: F.ui,
        fontSize: 13,
        fontWeight: 500,
        color: C.textSecondary,
        display: 'block',
        marginBottom: 5,
      }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows || 2}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: C.bgMuted,
          border: `1px solid ${C.borderLight}`,
          borderRadius: 8,
          padding: '12px 14px',
          fontFamily: F.ui,
          fontSize: 14,
          fontWeight: 400,
          color: C.textPrimary,
          lineHeight: 1.5,
          resize: 'none',
          outline: 'none',
          transition: 'border-color 200ms ease',
        }}
        onFocus={e => { e.target.style.borderColor = C.brandViolet; e.target.style.borderWidth = '2px'; e.target.style.padding = '11px 13px'; }}
        onBlur={e => { e.target.style.borderColor = C.borderLight; e.target.style.borderWidth = '1px'; e.target.style.padding = '12px 14px'; }}
      />
    </div>
  );
}

function CalibrationBar({ leftLabel, rightLabel, current, recommended, animate }) {
  const [cW, setCW] = useState(0);
  const [rW, setRW] = useState(0);
  const delta = recommended - current;
  const showDelta = Math.abs(delta) > 10;

  useEffect(() => {
    if (animate) {
      const t1 = setTimeout(() => setCW(current), 50);
      const t2 = setTimeout(() => setRW(recommended), 200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [animate, current, recommended]);

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: F.ui, fontSize: 11, color: C.textTertiary }}>{leftLabel}</span>
        <span style={{ fontFamily: F.ui, fontSize: 11, color: C.textTertiary }}>{rightLabel}</span>
      </div>
      {/* Current bar */}
      <div style={{
        height: 8,
        borderRadius: 4,
        background: C.bgMuted,
        position: 'relative',
        marginBottom: 3,
      }}>
        <div style={{
          height: '100%',
          borderRadius: 4,
          background: C.borderMedium,
          width: `${cW}%`,
          transition: 'width 700ms ease-out',
        }} />
      </div>
      {/* Recommended bar */}
      <div style={{
        height: 8,
        borderRadius: 4,
        background: C.bgMuted,
        position: 'relative',
      }}>
        <div style={{
          height: '100%',
          borderRadius: 4,
          background: C.brandViolet,
          width: `${rW}%`,
          transition: 'width 700ms ease-out 150ms',
          opacity: 0.85,
        }} />
      </div>
      {/* Labels row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: C.borderMedium, display: 'inline-block' }} />
            <span style={{ fontFamily: F.ui, fontSize: 10, color: C.textTertiary }}>Current {current}</span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: C.brandViolet, display: 'inline-block' }} />
            <span style={{ fontFamily: F.ui, fontSize: 10, color: C.textTertiary }}>Rec. {recommended}</span>
          </span>
        </div>
        {showDelta && (
          <span style={{
            fontFamily: F.mono,
            fontSize: 10,
            color: C.brandViolet,
            background: C.brandVioletLight,
            padding: '2px 6px',
            borderRadius: 4,
          }}>
            {delta > 0 ? '\u2191' : '\u2193'}{Math.abs(delta)} toward {delta > 0 ? rightLabel : leftLabel}
          </span>
        )}
      </div>
    </div>
  );
}

function ScoreMini({ label, score, animate }) {
  const [w, setW] = useState(0);
  const needsAttention = score < 70;

  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setW(score), 80);
      return () => clearTimeout(t);
    }
  }, [animate, score]);

  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontFamily: F.ui, fontSize: 12, color: C.textSecondary }}>{label}</span>
        <span style={{
          fontFamily: F.mono,
          fontSize: 12,
          fontWeight: 500,
          color: needsAttention ? C.warning : C.textPrimary,
        }}>
          {score}
        </span>
      </div>
      <div style={{
        height: 4,
        borderRadius: 2,
        background: C.bgMuted,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          borderRadius: 2,
          background: needsAttention ? C.warning : C.brandViolet,
          width: `${w}%`,
          transition: 'width 600ms ease-out',
        }} />
      </div>
      {needsAttention && (
        <div style={{ fontFamily: F.ui, fontSize: 10, color: C.warning, marginTop: 2 }}>
          Needs attention
        </div>
      )}
    </div>
  );
}

function DiagnosisRow({ borderColor, label, verdict, verdictColor, verdictFilled, insight, confidence, animate, delay }) {
  return (
    <div style={{
      borderLeft: `3px solid ${borderColor}`,
      padding: '14px 16px',
      marginBottom: 10,
      borderRadius: '0 8px 8px 0',
      background: C.bgMuted,
      opacity: animate ? 1 : 0,
      transform: animate ? 'translateY(0)' : 'translateY(6px)',
      transition: `all 400ms ease ${delay}ms`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{
          fontFamily: F.mono, fontSize: 10, fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '0.06em', color: C.textTertiary,
        }}>{label}</span>
        <span style={{
          fontFamily: F.mono, fontSize: 9, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.06em',
          color: verdictFilled ? '#fff' : verdictColor,
          background: verdictFilled ? verdictColor : 'transparent',
          border: verdictFilled ? 'none' : `1px solid ${verdictColor}`,
          padding: '2px 8px', borderRadius: 4,
        }}>{verdict}</span>
        {confidence != null && (
          <span style={{ fontFamily: F.mono, fontSize: 9, color: C.textTertiary, marginLeft: 'auto' }}>
            {confidence}% confidence
          </span>
        )}
      </div>
      <div style={{ fontFamily: F.ui, fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>
        {insight}
      </div>
    </div>
  );
}

function Slide4() {
  const mob = useIsMobile();
  const [activeTab, setActiveTab] = useState('input');
  const [inputs, setInputs] = useState({
    voiceDescription: '',
    audience: '',
    avoidVoice: '',
    bestPerformers: '',
    underperformers: '',
    industryContext: '',
    culturalContext: '',
    platformContext: '',
  });
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [animPhase, setAnimPhase] = useState(0);
  const [copied, setCopied] = useState(false);

  const set = (k, v) => setInputs(p => ({ ...p, [k]: v }));

  const loadDemo = () => {
    setInputs({ ...DEMO });
    setStatus('idle');
    setResult(null);
    setAnimPhase(0);
  };

  const generate = async () => {
    setStatus('loading');
    setResult(null);
    setAnimPhase(0);

    const systemPrompt = `You are a brand strategist who has spent 15 years in the room when campaigns get post-mortem'd. You know that most "voice problems" aren't voice problems. They're timing problems or market problems that get misattributed because nobody separated the signals.

Your job: look at brand voice data, performance data, and external context. Then sort the signal from the noise. Three categories, no blending:
1. VOICE SIGNAL \u2014 the voice itself caused this outcome. Durable. Worth calibrating.
2. TIMING SIGNAL \u2014 when or where the content ran caused this outcome. Contextual. Don't overcorrect.
3. MARKET SIGNAL \u2014 what's happening externally right now that should shape the next campaign. Forward-looking.

Writing rules for all text fields:
- Be specific. Name the actual content types, metrics, and channels. No "various factors" or "multiple elements."
- Short sentences. Mix blunt with occasional longer ones.
- No filler: don't say "it is important to note," "this highlights," "this underscores," or "plays a pivotal role."
- No "not only... but also." No rule-of-three padding. No "from X to Y" flourishes.
- Write like a person who's done this work, not a person describing the concept of doing this work.
- If something is ambiguous, say so plainly. Don't hedge with five qualifiers.

Return ONLY a valid JSON object. No markdown, no explanation, no code fences.

{
  "diagnosis": {
    "voiceSignal": {
      "verdict": "CALIBRATE" | "MONITOR" | "HOLD",
      "insight": "<2-3 sentences>",
      "confidence": <0-100>
    },
    "timingSignal": {
      "verdict": "LIKELY_CONTEXT" | "UNCLEAR" | "CLEAN",
      "insight": "<2-3 sentences>",
      "confidence": <0-100>
    },
    "marketSignal": {
      "verdict": "OPPORTUNITY" | "HEADWIND" | "NEUTRAL",
      "insight": "<2-3 sentences>",
      "confidence": <0-100>
    }
  },
  "toneCalibration": {
    "shouldCalibrate": true | false,
    "reason": "<one sentence>",
    "current": { "formalToCasual": <0-100>, "comprehensiveToPrecise": <0-100>, "authoritativeToApproachable": <0-100>, "safeToBold": <0-100> },
    "recommended": { "formalToCasual": <0-100>, "comprehensiveToPrecise": <0-100>, "authoritativeToApproachable": <0-100>, "safeToBold": <0-100> }
  },
  "forwardRecommendations": [
    {
      "headline": "<specific, max 8 words>",
      "whyNow": "<one sentence grounded in current external context>",
      "watchFor": "<one sentence \u2014 what would change this recommendation>"
    }
  ],
  "actOn": ["<3 items confirmed as voice signals>"],
  "retest": [
    { "item": "<what to retest>", "reason": "<why external context makes this ambiguous>" }
  ],
  "scores": {
    "overall": <0-100>,
    "voiceClarity": <0-100>,
    "audienceAlignment": <0-100>,
    "signalClarity": <0-100>
  }
}`;

    const userMessage = `Brand voice inputs:
Current voice description: ${inputs.voiceDescription}
Target audience: ${inputs.audience}
Voice to avoid: ${inputs.avoidVoice}

Performance data:
What performed best: ${inputs.bestPerformers}
What underperformed or got edited most: ${inputs.underperformers}

External market context:
Industry/category conditions: ${inputs.industryContext}
Cultural/news moment: ${inputs.culturalContext}
Platform/channel changes: ${inputs.platformContext}

Analyze performance data alongside external context. Distinguish voice signals from timing and market signals. Generate contextually-aware calibration recommendations.`;

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: systemPrompt,
          messages: [{ role: 'user', content: userMessage }],
        }),
      });

      if (!res.ok) throw new Error(`API ${res.status}`);

      const data = await res.json();
      const text = (data.text || '').replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(text);
      setResult(parsed);
      setStatus('success');

      setTimeout(() => setAnimPhase(1), 0);
      setTimeout(() => setAnimPhase(2), 150);
      setTimeout(() => setAnimPhase(3), 300);
      setTimeout(() => setAnimPhase(4), 450);
      setTimeout(() => setAnimPhase(5), 600);
      setTimeout(() => setAnimPhase(6), 750);
      setTimeout(() => setAnimPhase(7), 900);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const verdictMap = {
    CALIBRATE: { color: C.brandViolet, filled: true },
    MONITOR: { color: C.brandViolet, filled: false },
    HOLD: { color: C.textTertiary, filled: false },
    LIKELY_CONTEXT: { color: C.warning, filled: true },
    UNCLEAR: { color: C.textTertiary, filled: false },
    CLEAN: { color: C.positive, filled: true },
    OPPORTUNITY: { color: C.positive, filled: true },
    HEADWIND: { color: C.negative, filled: true },
    NEUTRAL: { color: C.textTertiary, filled: false },
  };

  const copyReport = () => {
    if (!result) return;
    const ts = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const subScores = result.scores || {};
    const diag = result.diagnosis || {};
    const text = `BRAND VOICE INTELLIGENCE REPORT \u2014 ${ts}

THREE-SIGNAL DIAGNOSIS:
  Voice Signal: ${diag.voiceSignal?.verdict || 'N/A'} (${diag.voiceSignal?.confidence || 'N/A'}% confidence) \u2014 ${diag.voiceSignal?.insight || ''}
  Timing Signal: ${diag.timingSignal?.verdict || 'N/A'} (${diag.timingSignal?.confidence || 'N/A'}% confidence) \u2014 ${diag.timingSignal?.insight || ''}
  Market Signal: ${diag.marketSignal?.verdict || 'N/A'} (${diag.marketSignal?.confidence || 'N/A'}% confidence) \u2014 ${diag.marketSignal?.insight || ''}

Tone Calibration: ${result.toneCalibration?.shouldCalibrate ? 'RECOMMENDED' : 'NOT RECOMMENDED'}
  Reason: ${result.toneCalibration?.reason || ''}
${result.toneCalibration?.shouldCalibrate ? ['formalToCasual', 'comprehensiveToPrecise', 'authoritativeToApproachable', 'safeToBold'].map(k =>
  `  ${k}: Current ${result.toneCalibration.current[k]} \u2192 Recommended ${result.toneCalibration.recommended[k]}`
).join('\n') : '  Deferred until retest confirms signal is not contextual.'}

Forward Recommendations:
${(result.forwardRecommendations || []).map(r => `  ${r.headline}\n    Why now: ${r.whyNow}\n    Watch for: ${r.watchFor}`).join('\n')}

Act On This Cycle: ${(result.actOn || []).join('; ')}

Retest Before Changing:
${(result.retest || []).map(r => `  ${r.item} \u2014 ${r.reason}`).join('\n')}

Brand Voice Score: ${subScores.overall || 'N/A'}/100
  Voice Clarity: ${subScores.voiceClarity || 'N/A'}
  Audience Alignment: ${subScores.audienceAlignment || 'N/A'}
  Signal Clarity: ${subScores.signalClarity || 'N/A'}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ height: '100%', padding: mob ? '16px 16px' : '32px 48px', display: 'flex', flexDirection: 'column' }}>
      <div style={sectionLabel()}>PROTOTYPE \u2014 BRAND VOICE INTELLIGENCE LOOP</div>
      <h1 style={{ ...slideTitle(), fontSize: mob ? 24 : 36, marginBottom: 6 }}>
        See the concept in action
      </h1>
      {!mob && (
        <p style={{ ...bodyText(), fontSize: 14, marginBottom: 20, maxWidth: 640 }}>
          This prototype demonstrates three-layer signal analysis: isolating voice
          problems from timing problems from market shifts. The system that doesn't
          distinguish between these three will train brands to chase noise.
        </p>
      )}

      {/* Mobile tab switcher */}
      {mob && (
        <div style={{ display: 'flex', gap: 0, marginBottom: 12, borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.borderLight}` }}>
          <button onClick={() => setActiveTab('input')} style={{
            flex: 1, padding: '10px 0', border: 'none',
            background: activeTab === 'input' ? C.brandViolet : C.bgCard,
            color: activeTab === 'input' ? '#fff' : C.textSecondary,
            fontFamily: F.ui, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>Inputs</button>
          <button onClick={() => setActiveTab('output')} style={{
            flex: 1, padding: '10px 0', border: 'none',
            borderLeft: `1px solid ${C.borderLight}`,
            background: activeTab === 'output' ? C.brandViolet : C.bgCard,
            color: activeTab === 'output' ? '#fff' : C.textSecondary,
            fontFamily: F.ui, fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>Results</button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: mob ? 'column' : 'row', gap: mob ? 16 : 24, flex: 1, minHeight: 0 }}>
        {/* LEFT: Inputs */}
        <div style={{
          flex: mob ? (activeTab === 'input' ? 1 : 'unset') : '0 0 38%',
          display: mob && activeTab !== 'input' ? 'none' : 'flex',
          ...card({ padding: mob ? '16px' : '20px 22px' }),
          overflowY: 'auto',
          flexDirection: 'column',
        }}>
          <div style={{ fontFamily: F.ui, fontSize: 15, fontWeight: 600, color: C.textPrimary, marginBottom: 2 }}>
            Brand Context + Performance Signals
          </div>
          <div style={{ fontFamily: F.ui, fontSize: 13, color: C.textSecondary, marginBottom: 16 }}>
            Enter your brand voice inputs and last campaign's performance data.
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={sectionLabel(C.textTertiary)}>BRAND VOICE</div>
            <ProtoInput label="Current voice description" placeholder="e.g. Professional but approachable. We speak like a trusted advisor, not a vendor. Direct answers, no jargon." value={inputs.voiceDescription} onChange={v => set('voiceDescription', v)} />
            <ProtoInput label="Target audience" placeholder="e.g. Senior marketing leaders at mid-size retail companies, 35-50. Data-driven, skeptical of hype, short on time." value={inputs.audience} onChange={v => set('audience', v)} />
            <ProtoInput label="Voice you're trying to avoid" placeholder='e.g. Corporate speak, passive voice, inflated claims, anything that sounds like a press release.' value={inputs.avoidVoice} onChange={v => set('avoidVoice', v)} />

            <div style={{ ...sectionLabel(C.textTertiary), marginTop: 12 }}>PERFORMANCE DATA</div>
            <ProtoInput label="What content performed best last quarter" placeholder="e.g. Short-form social posts with direct questions got 3x engagement. Product explainers with concrete numbers drove most demo bookings." value={inputs.bestPerformers} onChange={v => set('bestPerformers', v)} />
            <ProtoInput label="What content underperformed or got edited most" placeholder='e.g. Long-form thought leadership felt too formal. Generic CTAs ("learn more") got very low click-through.' value={inputs.underperformers} onChange={v => set('underperformers', v)} />

            <div style={{ ...sectionLabel(C.textTertiary), marginTop: 12 }}>MARKET CONTEXT</div>
            <div style={{ fontFamily: F.ui, fontSize: 11, color: C.textTertiary, marginBottom: 10, lineHeight: 1.5 }}>
              External factors that may have influenced performance. This helps separate voice signals from noise.
            </div>
            <ProtoInput label="Industry or category conditions" placeholder="e.g. Two competitors launched free tiers during our campaign window. Category conversation shifted to competitor news." value={inputs.industryContext} onChange={v => set('industryContext', v)} />
            <ProtoInput label="Cultural or news moment" placeholder="e.g. Campaign ran during a major holiday period. Audience attention was elsewhere." value={inputs.culturalContext} onChange={v => set('culturalContext', v)} />
            <ProtoInput label="Platform or channel changes" placeholder="e.g. LinkedIn algorithm shifted to favor native content over article links during this period." value={inputs.platformContext} onChange={v => set('platformContext', v)} />
          </div>

          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button onClick={loadDemo} style={{
              padding: '10px 20px',
              border: `1px solid ${C.borderMedium}`,
              borderRadius: 8,
              background: C.bgCard,
              color: C.textSecondary,
              fontFamily: F.ui,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
              onMouseEnter={e => e.target.style.background = C.bgMuted}
              onMouseLeave={e => e.target.style.background = C.bgCard}
            >
              Load Demo Inputs
            </button>
            <button onClick={generate} disabled={status === 'loading'} style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: 8,
              background: status === 'loading' ? C.brandVioletDark : C.brandViolet,
              color: '#fff',
              fontFamily: F.ui,
              fontSize: 14,
              fontWeight: 600,
              cursor: status === 'loading' ? 'wait' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              transition: 'all 200ms',
              width: '100%',
            }}>
              {status === 'loading' ? 'Analyzing signals...' : 'Generate Voice Intelligence \u2192'}
            </button>
          </div>
        </div>

        {/* RIGHT: Output */}
        <div style={{
          flex: mob ? 1 : '1 1 62%',
          display: mob && activeTab !== 'output' ? 'none' : 'block',
          ...card({ padding: mob ? '16px' : '20px 24px' }),
          overflowY: 'auto',
        }}>
          {/* Empty state */}
          {status === 'idle' && (
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 16,
            }}>
              {/* Loop icon */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="18" stroke={C.borderMedium} strokeWidth="2" strokeDasharray="4 4" />
                <path d="M30 18l3-3-3-3" stroke={C.textTertiary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M33 15H22a7 7 0 00-7 7v2" stroke={C.textTertiary} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M18 30l-3 3 3 3" stroke={C.textTertiary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 33h11a7 7 0 007-7v-2" stroke={C.textTertiary} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div style={{
                fontFamily: F.ui,
                fontSize: 14,
                color: C.textTertiary,
                textAlign: 'center',
                maxWidth: 280,
                lineHeight: 1.6,
              }}>
                Complete all three input layers and click Generate to see your three-signal intelligence report.
              </div>
            </div>
          )}

          {/* Loading state */}
          {status === 'loading' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px 0' }}>
                <div style={{
                  width: 20,
                  height: 20,
                  border: `2px solid ${C.borderLight}`,
                  borderTopColor: C.brandViolet,
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
                <span style={{ fontFamily: F.ui, fontSize: 14, color: C.textSecondary }}>
                  Separating voice signals from market noise...
                </span>
              </div>
              {[80, 100, 60, 90, 70].map((h, i) => (
                <div key={i} style={{
                  height: h,
                  borderRadius: 8,
                  background: C.bgMuted,
                  animation: 'shimmer 1.5s ease-in-out infinite',
                  animationDelay: `${i * 100}ms`,
                }} />
              ))}
            </div>
          )}

          {/* Error state */}
          {status === 'error' && (
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                ...card({ borderLeft: `3px solid ${C.negative}` }),
                textAlign: 'center',
                padding: '28px 32px',
                maxWidth: 340,
              }}>
                <div style={{ fontFamily: F.ui, fontSize: 15, fontWeight: 600, color: C.negative, marginBottom: 8 }}>
                  Generation failed
                </div>
                <div style={{ fontFamily: F.ui, fontSize: 13, color: C.textSecondary, marginBottom: 16 }}>
                  Please check your inputs and try again.
                </div>
                <button onClick={generate} style={{
                  padding: '8px 24px',
                  border: `1px solid ${C.negative}`,
                  borderRadius: 8,
                  background: 'transparent',
                  color: C.negative,
                  fontFamily: F.ui,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}>
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Success state */}
          {status === 'success' && result && (
            <div>
              {/* A: Three-Signal Diagnosis */}
              <div style={{
                marginBottom: 20,
                opacity: animPhase >= 1 ? 1 : 0,
                transform: animPhase >= 1 ? 'translateY(0)' : 'translateY(8px)',
                transition: 'all 400ms ease',
              }}>
                <div style={sectionLabel()}>THREE-SIGNAL DIAGNOSIS</div>
                {result.diagnosis?.voiceSignal && (() => {
                  const v = result.diagnosis.voiceSignal.verdict;
                  const vm = verdictMap[v] || { color: C.textTertiary, filled: false };
                  return (
                    <DiagnosisRow
                      borderColor={C.brandViolet}
                      label="Voice Signal"
                      verdict={v}
                      verdictColor={vm.color}
                      verdictFilled={vm.filled}
                      insight={result.diagnosis.voiceSignal.insight}
                      confidence={result.diagnosis.voiceSignal.confidence}
                      animate={animPhase >= 1}
                      delay={0}
                    />
                  );
                })()}
                {result.diagnosis?.timingSignal && (() => {
                  const v = result.diagnosis.timingSignal.verdict;
                  const vm = verdictMap[v] || { color: C.textTertiary, filled: false };
                  return (
                    <DiagnosisRow
                      borderColor={C.warning}
                      label="Timing Signal"
                      verdict={v}
                      verdictColor={vm.color}
                      verdictFilled={vm.filled}
                      insight={result.diagnosis.timingSignal.insight}
                      confidence={result.diagnosis.timingSignal.confidence}
                      animate={animPhase >= 1}
                      delay={100}
                    />
                  );
                })()}
                {result.diagnosis?.marketSignal && (() => {
                  const v = result.diagnosis.marketSignal.verdict;
                  const vm = verdictMap[v] || { color: C.textTertiary, filled: false };
                  return (
                    <DiagnosisRow
                      borderColor={C.positive}
                      label="Market Signal"
                      verdict={v}
                      verdictColor={vm.color}
                      verdictFilled={vm.filled}
                      insight={result.diagnosis.marketSignal.insight}
                      confidence={result.diagnosis.marketSignal.confidence}
                      animate={animPhase >= 1}
                      delay={200}
                    />
                  );
                })()}
              </div>

              {/* B: Tone Calibration */}
              <div style={{
                marginBottom: 20,
                opacity: animPhase >= 2 ? 1 : 0,
                transition: 'opacity 400ms ease',
              }}>
                <div style={sectionLabel(C.textTertiary)}>TONE CALIBRATION \u2014 CURRENT vs RECOMMENDED</div>
                {result.toneCalibration?.shouldCalibrate ? (
                  <>
                    <CalibrationBar leftLabel="Formal" rightLabel="Casual" current={result.toneCalibration.current.formalToCasual} recommended={result.toneCalibration.recommended.formalToCasual} animate={animPhase >= 2} />
                    <CalibrationBar leftLabel="Comprehensive" rightLabel="Precise" current={result.toneCalibration.current.comprehensiveToPrecise} recommended={result.toneCalibration.recommended.comprehensiveToPrecise} animate={animPhase >= 2} />
                    <CalibrationBar leftLabel="Authoritative" rightLabel="Approachable" current={result.toneCalibration.current.authoritativeToApproachable} recommended={result.toneCalibration.recommended.authoritativeToApproachable} animate={animPhase >= 2} />
                    <CalibrationBar leftLabel="Safe" rightLabel="Bold" current={result.toneCalibration.current.safeToBold} recommended={result.toneCalibration.recommended.safeToBold} animate={animPhase >= 2} />
                    <div style={{ fontFamily: F.ui, fontSize: 11, color: C.textTertiary, fontStyle: 'italic', marginTop: 4 }}>
                      Based on durable signal &mdash; external context accounted for.
                    </div>
                  </>
                ) : (
                  <div style={{
                    background: C.bgMuted,
                    borderRadius: 8,
                    padding: '16px 20px',
                    fontFamily: F.ui,
                    fontSize: 13,
                    color: C.textTertiary,
                    lineHeight: 1.6,
                  }}>
                    Not recommended for calibration until retest confirms signal is not contextual.
                    {result.toneCalibration?.reason && (
                      <div style={{ marginTop: 6, fontStyle: 'italic', fontSize: 12 }}>
                        {result.toneCalibration.reason}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* C: Forward Recommendations */}
              <div style={{
                marginBottom: 20,
                opacity: animPhase >= 3 ? 1 : 0,
                transform: animPhase >= 3 ? 'translateY(0)' : 'translateY(6px)',
                transition: 'all 400ms ease',
              }}>
                <div style={sectionLabel(C.textTertiary)}>FORWARD RECOMMENDATIONS &mdash; FOR THIS CAMPAIGN, NOT LAST QUARTER'S</div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {(result.forwardRecommendations || []).map((r, i) => (
                    <div key={i} style={{
                      flex: '1 1 30%',
                      minWidth: 180,
                      background: C.bgMuted,
                      borderRadius: 8,
                      padding: 16,
                    }}>
                      <div style={{
                        fontFamily: F.ui,
                        fontSize: 14,
                        fontWeight: 600,
                        color: C.textPrimary,
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}>
                        {r.headline}
                      </div>
                      <div style={{
                        fontFamily: F.ui,
                        fontSize: 13,
                        color: C.textSecondary,
                        lineHeight: 1.5,
                        marginBottom: 6,
                      }}>
                        <span style={{ fontFamily: F.mono, fontSize: 10, color: C.brandViolet, fontWeight: 600 }}>Why now: </span>
                        {r.whyNow}
                      </div>
                      <div style={{
                        fontFamily: F.ui,
                        fontSize: 13,
                        color: C.textSecondary,
                        lineHeight: 1.5,
                      }}>
                        <span style={{ fontFamily: F.mono, fontSize: 10, color: C.warning, fontWeight: 600 }}>Watch for: </span>
                        {r.watchFor}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* D: Act On vs Retest */}
              <div style={{
                display: 'flex',
                flexDirection: mob ? 'column' : 'row',
                gap: mob ? 10 : 14,
                marginBottom: 20,
                opacity: animPhase >= 4 ? 1 : 0,
                transform: animPhase >= 4 ? 'translateY(0)' : 'translateY(6px)',
                transition: 'all 400ms ease',
              }}>
                <div style={{
                  flex: 1,
                  background: C.positiveBg,
                  borderRadius: 8,
                  padding: 16,
                }}>
                  <div style={{ ...sectionLabel(C.positive), marginBottom: 10 }}>ACT ON THIS CYCLE</div>
                  {(result.actOn || []).map((item, i) => (
                    <div key={i} style={{
                      fontFamily: F.ui,
                      fontSize: 13,
                      color: C.textSecondary,
                      lineHeight: 1.6,
                      marginBottom: 6,
                      paddingLeft: 18,
                      position: 'relative',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: C.positive, fontWeight: 600 }}>{'\u2713'}</span>
                      {item}
                    </div>
                  ))}
                </div>
                <div style={{
                  flex: 1,
                  background: C.warningBg,
                  borderRadius: 8,
                  padding: 16,
                }}>
                  <div style={{ ...sectionLabel(C.warning), marginBottom: 10 }}>RETEST BEFORE CHANGING</div>
                  {(result.retest || []).map((r, i) => (
                    <div key={i} style={{
                      fontFamily: F.ui,
                      fontSize: 13,
                      color: C.textSecondary,
                      lineHeight: 1.6,
                      marginBottom: 6,
                      paddingLeft: 18,
                      position: 'relative',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: C.warning, fontWeight: 500 }}>{'\u26A0'}</span>
                      {r.item}
                      <div style={{ fontFamily: F.ui, fontSize: 12, color: C.textTertiary, fontStyle: 'italic', marginTop: 2 }}>
                        {r.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* E: Brand Voice Score */}
              <div style={{
                marginBottom: 20,
                opacity: animPhase >= 5 ? 1 : 0,
                transition: 'opacity 400ms ease',
              }}>
                <div style={sectionLabel(C.textTertiary)}>BRAND VOICE HEALTH</div>
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: F.mono,
                      fontSize: 42,
                      fontWeight: 500,
                      color: C.brandViolet,
                      lineHeight: 1,
                    }}>
                      {result.scores?.overall || '\u2014'}
                    </div>
                    <div style={{ fontFamily: F.ui, fontSize: 14, color: C.textTertiary, marginTop: 2 }}>
                      / 100
                    </div>
                    <div style={{
                      fontFamily: F.ui,
                      fontSize: 11,
                      color: C.textTertiary,
                      marginTop: 6,
                      maxWidth: 140,
                      lineHeight: 1.4,
                    }}>
                      Alignment between current voice and audience resonance
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <ScoreMini label="Voice Clarity" score={result.scores?.voiceClarity || 0} animate={animPhase >= 5} />
                    <ScoreMini label="Audience Alignment" score={result.scores?.audienceAlignment || 0} animate={animPhase >= 5} />
                    <ScoreMini label="Signal Clarity" score={result.scores?.signalClarity || 0} animate={animPhase >= 5} />
                    <div style={{ fontFamily: F.ui, fontSize: 11, color: C.textTertiary, fontStyle: 'italic', marginTop: 8, lineHeight: 1.5 }}>
                      Signal Clarity: how cleanly voice signals separate from external noise in this dataset.
                      {(result.scores?.signalClarity || 0) < 70 && (
                        <span> Score is low. More context or cleaner test conditions needed before calibrating Brand Hub.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* F: Export */}
              <div style={{
                opacity: animPhase >= 6 ? 1 : 0,
                transition: 'opacity 400ms ease',
              }}>
                <button onClick={copyReport} style={{
                  width: '100%',
                  padding: '12px 24px',
                  border: `1px solid ${copied ? C.positive : C.borderMedium}`,
                  borderRadius: 8,
                  background: copied ? C.positiveBg : C.bgCard,
                  color: copied ? C.positive : C.textSecondary,
                  fontFamily: F.ui,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}>
                  {copied ? '\u2713 Copied to clipboard' : '\uD83D\uDCCB Export as Brand Hub Calibration Report'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SLIDE 5: METRICS & AEO ──

function Slide5() {
  const mob = useIsMobile();
  const metrics = [
    {
      label: 'ACTIVATION',
      items: [
        'Brand Hub update frequency (target: 3x increase vs manual-only baseline)',
        '% of campaigns that generate a calibration report',
      ],
    },
    {
      label: 'QUALITY',
      items: [
        'First-generation brand-alignment rate (% of content passing brand review without major edits)',
        'Edit distance between AI draft and final published content (lower = better)',
      ],
    },
    {
      label: 'RETENTION / EXPANSION',
      items: [
        'NPS delta between accounts using feedback loop vs not',
        'Seat expansion rate \u2014 does having a smarter brand model drive more team adoption?',
      ],
    },
    {
      label: 'BUSINESS MOAT',
      items: [
        'Brand Hub data richness per account over time. If every campaign makes Brand Hub smarter, switching costs compound.',
        'A customer who\u2019s run 50 campaigns on Typeface has a brand model competitors can\u2019t replicate. That\u2019s durable NRR.',
      ],
    },
  ];

  return (
    <div style={{ height: '100%', padding: mob ? '20px 20px' : '48px 64px', overflowY: 'auto' }}>
      <div style={sectionLabel()}>SHIP IT, MEASURE IT, WHAT'S NEXT</div>
      <h1 style={{ ...slideTitle(), fontSize: mob ? 26 : 46, marginBottom: mob ? 20 : 32 }}>
        How I'd validate this &mdash; and what Typeface should own next
      </h1>

      {/* Section A: Experiment */}
      <div style={{ marginBottom: mob ? 20 : 32 }}>
        <h2 style={{ ...heading22, fontSize: mob ? 18 : 22 }}>The A/B Test</h2>
        <div style={{
          ...card({ padding: 0, overflow: 'hidden' }),
          display: 'flex',
          flexDirection: mob ? 'column' : 'row',
        }}>
          {/* Control */}
          <div style={{ flex: 1, padding: mob ? 16 : 24, borderRight: mob ? 'none' : `1px solid ${C.borderLight}`, borderBottom: mob ? `1px solid ${C.borderLight}` : 'none' }}>
            <div style={{
              fontFamily: F.ui,
              fontSize: 14,
              fontWeight: 600,
              color: C.textSecondary,
              marginBottom: 12,
            }}>
              Control
            </div>
            <div style={{
              fontFamily: F.ui,
              fontSize: 14,
              color: C.textSecondary,
              lineHeight: 1.6,
              marginBottom: 12,
            }}>
              Brand Hub updated manually &mdash; brand team reviews campaign results and
              rewrites guidelines when they see patterns
            </div>
            <div style={{
              fontFamily: F.ui,
              fontSize: 12,
              color: C.textTertiary,
            }}>
              Metric tracked: First-generation brand-alignment rate on next campaign
            </div>
          </div>
          {/* Variant */}
          <div style={{ flex: 1, padding: mob ? 16 : 24, background: C.brandVioletLight }}>
            <div style={{
              fontFamily: F.ui,
              fontSize: 14,
              fontWeight: 600,
              color: C.brandViolet,
              marginBottom: 12,
            }}>
              Variant: Voice Intelligence Loop
            </div>
            <div style={{
              fontFamily: F.ui,
              fontSize: 14,
              color: C.textSecondary,
              lineHeight: 1.6,
              marginBottom: 12,
            }}>
              Post-campaign, Performance Agent feeds aggregated voice signals into a
              structured calibration report. Brand team reviews + approves recommended
              Brand Hub updates in 1 click
            </div>
            <div style={{
              fontFamily: F.ui,
              fontSize: 12,
              color: C.textTertiary,
            }}>
              Metric tracked: Same
            </div>
          </div>
        </div>
        {/* Hypothesis row */}
        <div style={{
          ...card({ padding: '16px 24px', borderRadius: '0 0 12px 12px', borderTop: 'none' }),
          background: C.bgMuted,
          marginTop: -1,
        }}>
          <span style={{ fontFamily: F.ui, fontSize: 13, fontWeight: 600, color: C.textPrimary }}>
            Hypothesis:{' '}
          </span>
          <span style={{ fontFamily: F.ui, fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>
            Brands that receive performance-driven calibration recommendations will update
            Brand Hub 3x more frequently, leading to measurable improvement in first-generation
            brand-alignment rates within 2 campaign cycles.
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${C.borderLight}`, margin: '0 0 28px' }} />

      {/* Section B: Metrics */}
      <div style={{ marginBottom: mob ? 20 : 32 }}>
        <h2 style={{ ...heading22, fontSize: mob ? 18 : 22 }}>How We Know It's Working</h2>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? 10 : 14 }}>
          {metrics.map((m, i) => (
            <div key={i} style={card({ padding: 20 })}>
              <div style={{
                fontFamily: F.mono,
                fontSize: 11,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: C.brandViolet,
                marginBottom: 10,
              }}>
                {m.label}
              </div>
              {m.items.map((item, j) => (
                <div key={j} style={{
                  fontFamily: F.ui,
                  fontSize: 13,
                  color: C.textSecondary,
                  lineHeight: 1.6,
                  marginBottom: j < m.items.length - 1 ? 8 : 0,
                  paddingLeft: 12,
                  borderLeft: `1px solid ${C.borderLight}`,
                }}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${C.borderLight}`, margin: '0 0 28px' }} />

      {/* Section C: AEO */}
      <div>
        <h2 style={{ ...heading22, fontSize: mob ? 18 : 22 }}>What Typeface Should Own Next</h2>
        <div style={{
          background: C.warningBg,
          borderLeft: `4px solid ${C.warning}`,
          borderRadius: '0 12px 12px 0',
          padding: mob ? 16 : 24,
        }}>
          <div style={{
            fontFamily: F.ui,
            fontSize: 18,
            fontWeight: 600,
            color: C.warning,
            marginBottom: 12,
          }}>
            Answer Engine Optimization &mdash; the next scoring layer
          </div>
          <div style={{
            fontFamily: F.ui,
            fontSize: mob ? 14 : 15,
            color: C.textSecondary,
            lineHeight: 1.7,
            marginBottom: 12,
          }}>
            Typeface already scores content for SEO. But the search landscape
            is shifting faster than most platforms have caught up to.
          </div>
          <div style={{
            fontFamily: F.ui,
            fontSize: mob ? 14 : 15,
            color: C.textSecondary,
            lineHeight: 1.7,
            marginBottom: 12,
          }}>
            As ChatGPT, Perplexity, and Google AI Overviews become primary
            discovery surfaces for B2B buyers, "ranking" is giving way to
            "being cited." Brands that write for AI citation &mdash; direct answers,
            authority signals, structured data, FAQ-ready formatting &mdash; will
            outperform brands optimizing for human scroll.
          </div>
          <div style={{
            fontFamily: F.ui,
            fontSize: mob ? 14 : 15,
            color: C.textSecondary,
            lineHeight: 1.7,
            marginBottom: 12,
          }}>
            No competitor has native AEO guidance yet. Typeface, as an AI-first
            company built by an ex-CTO who understands how AI models consume
            information, is the natural owner of this space. An AEO Readiness
            Score alongside the existing SEO score would be a defensible,
            first-mover feature that no content platform currently offers.
          </div>
          <div style={{
            fontFamily: F.ui,
            fontSize: 14,
            color: C.textTertiary,
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}>
            This is directional &mdash; a signal worth a dedicated research spike,
            not a fully scoped feature. Happy to dig deeper.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── NAVIGATION BAR ──

function NavigationBar({ current, total, onNav }) {
  const mob = useIsMobile();
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: mob ? 44 : 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: mob ? 12 : 16,
      zIndex: 20,
      background: 'transparent',
    }}>
      <button
        onClick={() => onNav(current - 1)}
        disabled={current === 0}
        style={{
          background: 'none',
          border: 'none',
          fontFamily: F.ui,
          fontSize: mob ? 22 : 18,
          color: current === 0 ? C.borderLight : C.textTertiary,
          cursor: current === 0 ? 'default' : 'pointer',
          padding: mob ? '8px 12px' : '4px 8px',
          transition: 'color 200ms',
          WebkitTapHighlightColor: 'transparent',
        }}
        onMouseEnter={e => { if (current > 0) e.target.style.color = C.textPrimary; }}
        onMouseLeave={e => { e.target.style.color = current === 0 ? C.borderLight : C.textTertiary; }}
      >
        {'\u2190'}
      </button>
      <div style={{ display: 'flex', gap: mob ? 10 : 8, alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} onClick={() => onNav(i)} style={{
            width: i === current ? (mob ? 10 : 8) : (mob ? 8 : 6),
            height: i === current ? (mob ? 10 : 8) : (mob ? 8 : 6),
            borderRadius: '50%',
            border: i === current ? 'none' : `1px solid ${C.borderMedium}`,
            background: i === current ? C.brandViolet : 'transparent',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 250ms',
            WebkitTapHighlightColor: 'transparent',
          }} />
        ))}
      </div>
      <button
        onClick={() => onNav(current + 1)}
        disabled={current === total - 1}
        style={{
          background: 'none',
          border: 'none',
          fontFamily: F.ui,
          fontSize: mob ? 22 : 18,
          color: current === total - 1 ? C.borderLight : C.textTertiary,
          cursor: current === total - 1 ? 'default' : 'pointer',
          padding: mob ? '8px 12px' : '4px 8px',
          transition: 'color 200ms',
          WebkitTapHighlightColor: 'transparent',
        }}
        onMouseEnter={e => { if (current < total - 1) e.target.style.color = C.textPrimary; }}
        onMouseLeave={e => { e.target.style.color = current === total - 1 ? C.borderLight : C.textTertiary; }}
      >
        {'\u2192'}
      </button>
    </div>
  );
}

// ── PRESENTATION SHELL ──

function PresentationShell() {
  const mob = useIsMobile();
  const [slide, setSlide] = useState(0);
  const [anim, setAnim] = useState(false);
  const [dir, setDir] = useState(0);
  const total = 5;

  const nav = useCallback((target) => {
    if (target < 0 || target >= total || target === slide || anim) return;
    setDir(target > slide ? 1 : -1);
    setAnim(true);
    setTimeout(() => {
      setSlide(target);
      setAnim(false);
    }, 400);
  }, [slide, anim]);

  useEffect(() => {
    const handler = (e) => {
      // Don't capture arrows when focused on a textarea
      if (e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); nav(slide + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); nav(slide - 1); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [slide, nav]);

  // Swipe support for mobile
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    const onTouchStart = (e) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) nav(slide + 1);
        else nav(slide - 1);
      }
    };
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [slide, nav]);

  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5];
  const Current = slides[slide];
  const isDarkSlide = slide === 0;

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: isDarkSlide ? C.bgDark : C.bgPage,
      overflow: 'hidden',
      position: 'relative',
      fontFamily: F.ui,
      transition: 'background 400ms ease',
    }}>
      {/* Header: slide label + counter */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: mob ? 36 : 44,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: mob ? '0 16px' : '0 64px',
        zIndex: 20,
      }}>
        <div style={{
          fontFamily: F.ui,
          fontSize: mob ? 9 : 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: isDarkSlide ? C.textInverseSecondary : C.textTertiary,
        }}>
          {SLIDE_LABELS[slide]}
        </div>
        <div style={{
          fontFamily: F.ui,
          fontSize: mob ? 9 : 11,
          fontWeight: 500,
          letterSpacing: '0.1em',
          color: isDarkSlide ? C.textInverseSecondary : C.textTertiary,
        }}>
          {String(slide + 1).padStart(2, '0')} &mdash; {String(total).padStart(2, '0')}
        </div>
      </div>

      {/* Slide viewport */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: mob ? 44 : 52,
        opacity: anim ? 0 : 1,
        transform: anim ? `translateX(${dir * -30}px)` : 'translateX(0)',
        transition: anim
          ? 'opacity 180ms ease, transform 180ms ease'
          : 'opacity 380ms ease 40ms, transform 380ms ease 40ms',
        overflow: 'hidden',
      }}>
        <Current />
      </div>

      <NavigationBar current={slide} total={total} onNav={nav} />
    </div>
  );
}

// ── APP ROOT ──

export default function TypefacePortfolio() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;450;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body, #root { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; -webkit-text-size-adjust: 100%; }
      body { background: #FAFAF9; }
      @media (max-width: 768px) {
        html, body, #root { overflow: hidden; }
      }

      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #D1D1CE; border-radius: 3px; }
      ::-webkit-scrollbar-thumb:hover { background: #6B7280; }

      textarea::placeholder { color: #6B7280; }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @keyframes shimmer {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return <PresentationShell />;
}
