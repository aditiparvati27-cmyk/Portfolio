import { useState } from "react";

const ads = [
  {
    id: "AD-0847",
    name: "Serum Hook B + Avatar Mia + Shop Now",
    status: "fatiguing",
    daysLive: 16,
    cpcChange: +34,
    ctrChange: -22,
    roas: 2.1,
    roasChange: -38,
    fatiguedElement: "Hook",
    diagnosis: "3-second view rate dropped 28% while ThruPlay and CTR held steady for the first 10 days. The hook is losing initial attention. Avatar and CTA are still performing above baseline.",
    hook: "\"Dermatologists don't want you to know this...\"",
    avatar: "Mia (F, 28, warm tone)",
    cta: "Shop Now, 20% Off",
    sellingPoint: "Clinical results in 14 days",
    sparkline: [2.1, 2.0, 1.9, 2.1, 2.3, 2.2, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.2, 3.6, 3.8, 4.1],
  },
  {
    id: "AD-0851",
    name: "Price Drop Hook + Avatar James + Learn More",
    status: "fatiguing",
    daysLive: 12,
    cpcChange: +21,
    ctrChange: -15,
    roas: 1.8,
    roasChange: -25,
    fatiguedElement: "CTA",
    diagnosis: "View rates are stable through 75% completion, but click-through is declining. Users are watching but not clicking. This suggests the CTA copy or placement needs refreshing.",
    hook: "\"Price just dropped to $19.99\"",
    avatar: "James (M, 35, authoritative)",
    cta: "Learn More",
    sellingPoint: "Best value in category",
    sparkline: [1.8, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.5, 2.4, 2.6, 2.8],
  },
  {
    id: "AD-0839",
    name: "Before/After Hook + Avatar Sofia + Buy Now",
    status: "healthy",
    daysLive: 9,
    cpcChange: -5,
    ctrChange: +8,
    roas: 4.2,
    roasChange: +12,
    fatiguedElement: null,
    diagnosis: null,
    hook: "\"Watch my skin transform in 2 weeks\"",
    avatar: "Sofia (F, 32, enthusiastic)",
    cta: "Buy Now — Free Shipping",
    sellingPoint: "Before/after social proof",
    sparkline: [3.8, 3.6, 3.5, 3.7, 3.9, 4.0, 4.1, 4.2, 4.2],
  },
  {
    id: "AD-0862",
    name: "Question Hook + Avatar Mia + Shop Now",
    status: "healthy",
    daysLive: 5,
    cpcChange: -2,
    ctrChange: +3,
    roas: 3.6,
    roasChange: +5,
    fatiguedElement: null,
    diagnosis: null,
    hook: "\"Tired of serums that don't actually work?\"",
    avatar: "Mia (F, 28, warm tone)",
    cta: "Shop Now, 20% Off",
    sellingPoint: "Frustration with alternatives",
    sparkline: [3.4, 3.5, 3.5, 3.6, 3.6],
  },
  {
    id: "AD-0855",
    name: "Unboxing Hook + Avatar Priya + Get Yours",
    status: "watch",
    daysLive: 11,
    cpcChange: +12,
    ctrChange: -8,
    roas: 2.9,
    roasChange: -10,
    fatiguedElement: "Avatar",
    diagnosis: "Multiple ads featuring Avatar Priya are showing parallel decline across campaigns. Other elements vary — suggesting avatar overexposure is the common factor. Consider rotating to a fresh face.",
    hook: "\"OMG look what just arrived\"",
    avatar: "Priya (F, 25, excited)",
    cta: "Get Yours Today",
    sellingPoint: "Unboxing excitement",
    sparkline: [2.5, 2.4, 2.5, 2.6, 2.8, 2.9, 3.0, 2.9, 3.1, 3.2, 3.3],
  },
];

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const w = 120, h = 32, p = 2;
  const mn = Math.min(...data), mx = Math.max(...data);
  const rng = mx - mn || 1;
  const pts = data.map((v, i) => {
    const x = p + (i / (data.length - 1)) * (w - 2 * p);
    const y = h - p - ((v - mn) / rng) * (h - 2 * p);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const Badge = ({ status }: { status: string }) => {
  const cfg: Record<string, { bg: string; text: string; label: string }> = {
    fatiguing: { bg: "#FEE2E2", text: "#DC2626", label: "⚠ Fatiguing" },
    watch: { bg: "#FEF3C7", text: "#D97706", label: "👁 Watch" },
    healthy: { bg: "#D1FAE5", text: "#059669", label: "✓ Healthy" },
  };
  const c = cfg[status];
  return (
    <span style={{ background: c.bg, color: c.text, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
      {c.label}
    </span>
  );
};

const Metric = ({ label, value, change, unit = "" }: { label: string; value: string; change: number; unit?: string }) => {
  const col = change > 0 && label === "CPC" ? "#DC2626" : change < 0 && label !== "CPC" ? "#DC2626" : "#059669";
  const arrow = change > 0 ? "↑" : "↓";
  return (
    <div style={{ textAlign: "center", minWidth: 64 }}>
      <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{value}{unit}</div>
      <div style={{ fontSize: 11, color: col, fontWeight: 600 }}>{arrow} {Math.abs(change)}%</div>
    </div>
  );
};

export default function CreatifyAI() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState("all");
  const [showRemix, setShowRemix] = useState(false);

  const filtered = tab === "all" ? ads : ads.filter(a => a.status === tab);
  const sel = ads.find(a => a.id === selected);

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#F9FAFB", minHeight: "100vh", padding: 0 }}>
      {/* Header */}
      <div style={{ background: "#111827", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 14, fontWeight: 800 }}>C</span>
        </div>
        <span style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>AdMax</span>
        <span style={{ color: "#6B7280", fontSize: 13, marginLeft: 4 }}>/</span>
        <span style={{ color: "#D1D5DB", fontSize: 13 }}>Performance</span>
        <span style={{ color: "#6B7280", fontSize: 13 }}>/</span>
        <span style={{ color: "#A78BFA", fontSize: 13, fontWeight: 600 }}>Fatigue Radar</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ background: "#374151", padding: "5px 12px", borderRadius: 6, color: "#D1D5DB", fontSize: 12 }}>Last 30 days</div>
          <div style={{ background: "#374151", padding: "5px 12px", borderRadius: 6, color: "#D1D5DB", fontSize: 12 }}>Meta Ads ✓</div>
        </div>
      </div>

      <div style={{ padding: "20px 24px", maxWidth: 1100, margin: "0 auto" }}>
        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { label: "Active Ads", value: "47", sub: "across 6 campaigns" },
            { label: "Fatiguing", value: "2", sub: "action needed", color: "#DC2626" },
            { label: "Watch List", value: "1", sub: "early signals", color: "#D97706" },
            { label: "Avg. Days to Fatigue", value: "13.2", sub: "↑ 2.1 from last month", color: "#059669" },
          ].map((c, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: c.color || "#111827" }}>{c.value}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
          {[
            { key: "all", label: "All Ads (5)" },
            { key: "fatiguing", label: "Fatiguing (2)" },
            { key: "watch", label: "Watch (1)" },
            { key: "healthy", label: "Healthy (2)" },
          ].map(t => (
            <button key={t.key} onClick={() => { setTab(t.key); setSelected(null); setShowRemix(false); }}
              style={{ padding: "7px 16px", borderRadius: 6, border: tab === t.key ? "1.5px solid #6366F1" : "1px solid #E5E7EB", background: tab === t.key ? "#EEF2FF" : "#fff", color: tab === t.key ? "#4338CA" : "#374151", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {/* Ad List */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {filtered.map(ad => (
              <div key={ad.id} onClick={() => { setSelected(ad.id); setShowRemix(false); }}
                style={{ background: "#fff", border: selected === ad.id ? "1.5px solid #6366F1" : "1px solid #E5E7EB", borderRadius: 10, padding: "14px 16px", marginBottom: 8, cursor: "pointer", transition: "border-color 0.15s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <span style={{ fontSize: 11, color: "#9CA3AF", marginRight: 8 }}>{ad.id}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{ad.name}</span>
                  </div>
                  <Badge status={ad.status} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <Metric label="CPC" value={`$${(1.2 + ad.cpcChange * 0.01).toFixed(2)}`} change={ad.cpcChange} />
                  <Metric label="CTR" value={`${(2.8 + ad.ctrChange * 0.03).toFixed(1)}%`} change={ad.ctrChange} />
                  <Metric label="ROAS" value={`${ad.roas}x`} change={ad.roasChange} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 2 }}>CPC Trend</div>
                    <Sparkline data={ad.sparkline} color={ad.status === "fatiguing" ? "#DC2626" : ad.status === "watch" ? "#D97706" : "#059669"} />
                  </div>
                  <div style={{ textAlign: "center", minWidth: 56 }}>
                    <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 2 }}>Live</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{ad.daysLive}d</div>
                  </div>
                </div>
                {ad.fatiguedElement && (
                  <div style={{ marginTop: 8, padding: "6px 10px", background: ad.status === "fatiguing" ? "#FEF2F2" : "#FFFBEB", borderRadius: 6, fontSize: 12, color: ad.status === "fatiguing" ? "#991B1B" : "#92400E" }}>
                    Fatigued element: <strong>{ad.fatiguedElement}</strong> — {ad.fatiguedElement === "Hook" ? "3s view rate ↓28%" : ad.fatiguedElement === "CTA" ? "CTR declining with stable views" : "parallel decline across campaigns"}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Detail Panel */}
          {sel && (
            <div style={{ width: 340, flexShrink: 0 }}>
              <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, padding: 16, position: "sticky", top: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>Fatigue Diagnosis</span>
                  <Badge status={sel.status} />
                </div>

                {sel.diagnosis ? (
                  <div style={{ background: "#F9FAFB", borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 12, lineHeight: 1.6, color: "#374151", borderLeft: "3px solid #6366F1" }}>
                    {sel.diagnosis}
                  </div>
                ) : (
                  <div style={{ background: "#F0FDF4", borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 12, color: "#166534", borderLeft: "3px solid #059669" }}>
                    All elements performing within healthy ranges. No action needed.
                  </div>
                )}

                <div style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Element Breakdown</div>
                {[
                  { label: "Hook", val: sel.hook, fatigued: sel.fatiguedElement === "Hook" },
                  { label: "Avatar", val: sel.avatar, fatigued: sel.fatiguedElement === "Avatar" },
                  { label: "CTA", val: sel.cta, fatigued: sel.fatiguedElement === "CTA" },
                  { label: "Selling Point", val: sel.sellingPoint, fatigued: false },
                ].map((el, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, padding: "6px 8px", borderRadius: 6, background: el.fatigued ? "#FEF2F2" : "transparent", border: el.fatigued ? "1px solid #FECACA" : "1px solid transparent" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 4, flexShrink: 0, background: el.fatigued ? "#DC2626" : "#059669" }} />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: el.fatigued ? "#DC2626" : "#374151" }}>
                        {el.label} {el.fatigued && "— FATIGUING"}
                      </div>
                      <div style={{ fontSize: 11, color: "#6B7280" }}>{el.val}</div>
                    </div>
                  </div>
                ))}

                {sel.status !== "healthy" && !showRemix && (
                  <button onClick={() => setShowRemix(true)}
                    style={{ width: "100%", marginTop: 12, padding: "10px 0", background: "linear-gradient(135deg, #6366F1, #8B5CF6)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    🔄 Remix This Ad
                  </button>
                )}

                {showRemix && (
                  <div style={{ marginTop: 12, padding: 12, background: "#EEF2FF", borderRadius: 8, border: "1px solid #C7D2FE" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#4338CA", marginBottom: 8 }}>Surgical Regeneration</div>
                    <div style={{ fontSize: 11, color: "#4338CA", marginBottom: 10, lineHeight: 1.5 }}>
                      Generate 5 new <strong>{sel.fatiguedElement?.toLowerCase()}</strong> variations while keeping all other winning elements locked.
                    </div>
                    <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 6 }}>Elements to keep (locked):</div>
                    {["Hook", "Avatar", "CTA", "Selling Point"].filter(e => e !== sel.fatiguedElement).map((e, i) => (
                      <div key={i} style={{ fontSize: 11, color: "#374151", padding: "2px 0" }}>✓ {e}</div>
                    ))}
                    <div style={{ fontSize: 11, color: "#DC2626", marginTop: 6, marginBottom: 10 }}>
                      ↻ Regenerating: <strong>{sel.fatiguedElement}</strong>
                    </div>
                    <button style={{ width: "100%", padding: "9px 0", background: "#4338CA", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                      Generate 5 New {sel.fatiguedElement} Variants →
                    </button>
                    <div style={{ fontSize: 10, color: "#6B7280", marginTop: 6, textAlign: "center" }}>
                      Uses ~5 credits · Deploys to same campaign
                    </div>
                  </div>
                )}

                {sel.status === "healthy" && (
                  <div style={{ marginTop: 12, padding: "8px 12px", background: "#F0FDF4", borderRadius: 6, fontSize: 11, color: "#166534", textAlign: "center" }}>
                    This ad is performing well. Keep monitoring.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phase indicator */}
        <div style={{ marginTop: 24, padding: "12px 16px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 10, display: "flex", alignItems: "center", gap: 16, fontSize: 12 }}>
          <span style={{ fontWeight: 600, color: "#6366F1" }}>Roadmap</span>
          <span style={{ background: "#6366F1", color: "#fff", padding: "2px 10px", borderRadius: 4, fontWeight: 600 }}>Phase 1 — Alert</span>
          <span style={{ color: "#9CA3AF" }}>→</span>
          <span style={{ background: "#E5E7EB", color: "#6B7280", padding: "2px 10px", borderRadius: 4 }}>Phase 2 — Remix</span>
          <span style={{ color: "#9CA3AF" }}>→</span>
          <span style={{ background: "#E5E7EB", color: "#6B7280", padding: "2px 10px", borderRadius: 4 }}>Phase 3 — Predict</span>
          <span style={{ marginLeft: "auto", color: "#9CA3AF", fontSize: 11 }}>Mockup — Aditi Parvati · March 2026</span>
        </div>
      </div>
    </div>
  );
}
