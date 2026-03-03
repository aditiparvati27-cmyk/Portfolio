// Script to generate profound.tsx from the original HTML file
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const html = readFileSync(resolve(root, 'profound-webmcp-v2.html'), 'utf-8');

// Extract CSS from <style> tag
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const css = cssMatch ? cssMatch[1].trim() : '';

// Extract body content (everything inside <body>)
const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
let body = bodyMatch ? bodyMatch[1].trim() : '';

// Remove the <script> tag - we'll handle navigation in React
body = body.replace(/<script>[\s\S]*?<\/script>/g, '');

// Convert HTML attributes for React
function reactifyHtml(h) {
    return h
        .replace(/class="/g, 'className="')
        .replace(/onclick="[^"]*"/g, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<br>/g, '<br />')
        // Fix self-closing tags
        .replace(/<(img|input|hr)([^>]*?)(?<!\/)>/g, '<$1$2 />')
        // Fix style attributes - convert inline styles to objects
        // Actually, let's use dangerouslySetInnerHTML instead to avoid all these conversions
        ;
}

// Add responsive CSS media queries
const responsiveCSS = `
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

// Build the full CSS with responsive additions
const fullCSS = css + responsiveCSS;

// Build the component
const component = `import { useEffect, useState, useCallback } from "react";

const css = \`
#profound-deck {
${fullCSS.replace(/`/g, '\\`').replace(/\$/g, '\\$')}
}
\`;

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
    \`slide \${i === current ? "active" : ""}\`;

  const pct = ((current + 1) / total) * 100;

  return (
    <div id="profound-deck">
      <div className="progress-bar" style={{ width: pct + "%" }} />
      <div className="logo-tag">Profound × WebMCP</div>
      <div className="key-hint">← → to navigate</div>

      <div className="deck">
${buildSlides()}
      </div>

      <div className="nav">
        <button className="nav-btn" onClick={() => navigate(-1)}>←</button>
        <span className="slide-counter">{current + 1} / {total}</span>
        <button className="nav-btn" onClick={() => navigate(1)}>→</button>
      </div>
    </div>
  );
}
`;

function buildSlides() {
    // Extract each slide div from body
    const slideRegex = /<div class="slide[^"]*" id="s(\d+)">([\s\S]*?)(?=<div class="slide|<\/div><!-- end \.deck -->)/g;

    // Actually let's just parse slide by slide manually
    // Split body by slide divs
    const slides = [];
    const parts = body.split(/<div class="slide/);

    for (let i = 1; i < parts.length; i++) {
        let part = '<div class="slide' + parts[i];
        // Find the slide number
        const idMatch = part.match(/id="s(\d+)"/);
        const slideNum = idMatch ? parseInt(idMatch[1]) : i;

        // Close the slide - find the matching closing div
        // Each slide ends before the next slide or before </div><!-- end .deck -->
        // We need to balance divs
        let depth = 0;
        let endIdx = 0;
        for (let j = 0; j < part.length; j++) {
            if (part.substring(j, j + 4) === '<div') depth++;
            if (part.substring(j, j + 6) === '</div>') {
                depth--;
                if (depth === 0) {
                    endIdx = j + 6;
                    break;
                }
            }
        }
        if (endIdx > 0) {
            part = part.substring(0, endIdx);
        }

        slides.push({ num: slideNum, html: part });
    }

    // Convert to JSX-compatible strings
    let result = '';
    for (const slide of slides) {
        const idx = slide.num - 1;
        // We'll use dangerouslySetInnerHTML for the inner content
        // But we need the outer div to use React className binding

        // Extract the inner HTML (everything after the opening div tag)
        const innerMatch = slide.html.match(/<div[^>]*>([\s\S]*)<\/div>$/);
        const inner = innerMatch ? innerMatch[1] : '';

        // Get the id and any extra classes/styles
        const styleMatch = slide.html.match(/style="([^"]*)"/);
        const styleAttr = styleMatch ? ` style="${styleMatch[1]}"` : '';

        result += `        {/* Slide ${slide.num} */}\n`;
        result += `        <div className={slideClass(${idx})} id="s${slide.num}"${styleAttr}\n`;
        result += `          dangerouslySetInnerHTML={{ __html: \`${inner.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }}\n`;
        result += `        />\n`;
    }

    return result;
}

writeFileSync(
    resolve(root, 'client/src/pages/profound.tsx'),
    component,
    'utf-8'
);

console.log('✅ Generated client/src/pages/profound.tsx');
