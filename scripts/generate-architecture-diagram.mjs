/**
 * Procedural Animated SVG Dual-Domain Ecosystem Architecture Diagram
 * Pure SVG + SMIL animations (zero <script>, zero <foreignObject>, 100% GitHub Camo-safe).
 *
 * Usage: node scripts/generate-architecture-diagram.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.resolve(__dirname, '../assets/ecosystem-architecture.svg');

const W = 1200;
const H = 430;

const SAAS_NODES = [
  { id: 'os', title: 'TheSCI OS', sub: '~15MB Go Server Panel', badge: 'thesci.co/platform', color: '#38BDF8', bg: '#0C223B', y: 34, delay: '0s' },
  { id: 'coach', title: 'TheSCI Coach', sub: '0%-Cut ERP &amp; 304K CBT', badge: 'coach.thesci.co', color: '#34D399', bg: '#0B2926', y: 102, delay: '0.6s' },
  { id: 'deploy', title: 'TheSCI Deploymate', sub: 'Zero-SSH GitOps PaaS', badge: 'deploy.thesci.co', color: '#818CF8', bg: '#161C3D', y: 170, delay: '1.2s' },
  { id: 'social', title: 'TheSCI Social', sub: 'AI Publishing &amp; Growth', badge: 'social.thesci.co', color: '#C084FC', bg: '#25173D', y: 238, delay: '1.8s' },
];

const AGENCY_NODES = [
  { id: 'web', title: 'Custom Web &amp; Mobile Apps', sub: 'Next.js · Go · Android · iOS', color: '#FBBF24', bg: '#2A1D08', y: 316, delay: '0.4s' },
  { id: 'growth', title: '28 Modular Growth Packs', sub: 'Social Cap ₹5k–₹8k/mo · SEO · GEO', color: '#FB923C', bg: '#2B180B', y: 368, delay: '1.1s' },
];

// Bezier paths from Core -> Wing Hubs
const PATH_CORE_SAAS = 'M 310 198 C 365 198, 365 150, 420 150';
const PATH_CORE_AGENCY = 'M 310 232 C 365 232, 365 352, 420 352';

// Bezier paths from SaaS Wing -> 4 Product Cards
const SAAS_PATHS = SAAS_NODES.map((n) => {
  const cy = n.y + 28;
  return {
    ...n,
    d: `M 712 150 C 764 150, 764 ${cy}, 814 ${cy}`,
  };
});

// Bezier paths from Agency Wing -> 2 Service Cards (plus Cloud pill inside)
const AGENCY_PATHS = AGENCY_NODES.map((n) => {
  const cy = n.y + 22;
  return {
    ...n,
    d: `M 712 352 C 764 352, 764 ${cy}, 814 ${cy}`,
  };
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="TheSCI Dual-Domain Ecosystem Architecture — thesci.co and thesci.co.in">
  <defs>
    <clipPath id="clipOuter">
      <rect x="0" y="0" width="${W}" height="${H}" rx="18"/>
    </clipPath>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#070C18"/>
      <stop offset="55%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#141F38"/>
    </linearGradient>
    <pattern id="grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.05" fill="#94A3B8" fill-opacity="0.14"/>
    </pattern>
    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.6" result="b"/>
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <g clip-path="url(#clipOuter)">
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#bgGrad)"/>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#grid)"/>

    <!-- Column Headers -->
    <text x="172" y="24" text-anchor="middle" fill="#64748B" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="10.5" font-weight="700" letter-spacing="1.2">CORPORATE CORE</text>
    <text x="566" y="24" text-anchor="middle" fill="#64748B" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="10.5" font-weight="700" letter-spacing="1.2">DUAL-DOMAIN WINGS</text>
    <text x="984" y="24" text-anchor="middle" fill="#64748B" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="10.5" font-weight="700" letter-spacing="1.2">PRODUCTION PLATFORMS &amp; DELIVERY</text>

    <!-- Connector Lines: Core -> Wings -->
    <path d="${PATH_CORE_SAAS}" stroke="#38BDF8" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="5 4"/>
    <path d="${PATH_CORE_AGENCY}" stroke="#F59E0B" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="5 4"/>

    <!-- Travelling Signals: Core -> Wings -->
    <circle r="3.6" fill="#38BDF8" filter="url(#glow)">
      <animateMotion dur="2.8s" repeatCount="indefinite" path="${PATH_CORE_SAAS}"/>
    </circle>
    <circle r="3.6" fill="#FBBF24" filter="url(#glow)">
      <animateMotion dur="3.1s" begin="0.8s" repeatCount="indefinite" path="${PATH_CORE_AGENCY}"/>
    </circle>

    <!-- Connector Lines + Travelling Signals: SaaS Wing -> 4 Products -->
${SAAS_PATHS.map((p) => `    <path d="${p.d}" stroke="${p.color}" stroke-opacity="0.45" stroke-width="1.8"/>
    <circle r="3" fill="${p.color}" filter="url(#glow)">
      <animateMotion dur="2.6s" begin="${p.delay}" repeatCount="indefinite" path="${p.d}"/>
    </circle>`).join('\n')}

    <!-- Connector Lines + Travelling Signals: Agency Wing -> Services -->
${AGENCY_PATHS.map((p) => `    <path d="${p.d}" stroke="${p.color}" stroke-opacity="0.45" stroke-width="1.8"/>
    <circle r="3" fill="${p.color}" filter="url(#glow)">
      <animateMotion dur="2.7s" begin="${p.delay}" repeatCount="indefinite" path="${p.d}"/>
    </circle>`).join('\n')}

    <!-- COLUMN 1: Corporate Core Node -->
    <rect x="34" y="150" width="276" height="130" rx="16" fill="#0E172E" stroke="#475569" stroke-width="1.6"/>
    <rect x="34" y="150" width="276" height="5" rx="2.5" fill="#38BDF8"/>
    <circle cx="56" cy="178" r="4.5" fill="#10B981">
      <animate attributeName="opacity" values="0.35;1;0.35" dur="2.2s" repeatCount="indefinite"/>
    </circle>
    <text x="69" y="182" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="10.5" font-weight="700">MCA PVT LTD · EST. 2019</text>
    <text x="52" y="210" fill="#FFFFFF" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="17" font-weight="800">The SCI SolCielo</text>
    <text x="52" y="230" fill="#FFFFFF" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="17" font-weight="800">Innovacion Pvt. Ltd.™</text>
    <text x="52" y="255" fill="#CBD5E1" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="11">Ranchi, Jharkhand, India</text>
    <text x="52" y="271" fill="#64748B" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="9.8">CIN: U62011JH2025PTC025797</text>

    <!-- COLUMN 2A: SaaS Platforms Wing (thesci.co) -->
    <rect x="420" y="96" width="292" height="108" rx="16" fill="#0B1E38" stroke="#38BDF8" stroke-opacity="0.7" stroke-width="1.5">
      <animate attributeName="stroke-opacity" values="0.45;0.95;0.45" dur="4s" repeatCount="indefinite"/>
    </rect>
    <rect x="438" y="112" width="96" height="22" rx="11" fill="#0EA5E9" fill-opacity="0.18" stroke="#38BDF8" stroke-opacity="0.5"/>
    <text x="486" y="127" text-anchor="middle" fill="#7DD3FC" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="11.5" font-weight="800">thesci.co</text>
    <text x="438" y="158" fill="#F8FAFC" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="18" font-weight="800">SaaS Platforms Wing</text>
    <text x="438" y="180" fill="#94A3B8" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="12.5">4 Sovereign Compiled Products</text>

    <!-- COLUMN 2B: Agency & Growth Wing (thesci.co.in) -->
    <rect x="420" y="298" width="292" height="108" rx="16" fill="#261B0A" stroke="#F59E0B" stroke-opacity="0.7" stroke-width="1.5">
      <animate attributeName="stroke-opacity" values="0.45;0.95;0.45" dur="4s" begin="2s" repeatCount="indefinite"/>
    </rect>
    <rect x="438" y="314" width="114" height="22" rx="11" fill="#F59E0B" fill-opacity="0.18" stroke="#FBBF24" stroke-opacity="0.5"/>
    <text x="495" y="329" text-anchor="middle" fill="#FDE68A" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="11.5" font-weight="800">thesci.co.in</text>
    <text x="438" y="360" fill="#F8FAFC" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="18" font-weight="800">Engineering &amp; Growth</text>
    <text x="438" y="382" fill="#CBD5E1" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="12.5">Custom Dev · Cloud · Digital Growth</text>

    <!-- COLUMN 3A: 4 SaaS Products -->
${SAAS_NODES.map((n) => `    <rect x="814" y="${n.y}" width="352" height="56" rx="12" fill="${n.bg}" fill-opacity="0.82" stroke="${n.color}" stroke-opacity="0.55" stroke-width="1.3">
      <animate attributeName="stroke-opacity" values="0.35;0.9;0.35" dur="4.2s" begin="${n.delay}" repeatCount="indefinite"/>
    </rect>
    <circle cx="834" cy="${n.y + 28}" r="4" fill="${n.color}">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" begin="${n.delay}" repeatCount="indefinite"/>
    </circle>
    <text x="848" y="${n.y + 24}" fill="#FFFFFF" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="14.5" font-weight="800">${n.title}</text>
    <text x="848" y="${n.y + 42}" fill="#CBD5E1" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="11.5">${n.sub}</text>
    <rect x="1034" y="${n.y + 17}" width="120" height="22" rx="11" fill="${n.color}" fill-opacity="0.14" stroke="${n.color}" stroke-opacity="0.4"/>
    <text x="1094" y="${n.y + 31.5}" text-anchor="middle" fill="${n.color}" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="9.5" font-weight="700">${n.badge}</text>`).join('\n')}

    <!-- COLUMN 3B: Agency & Growth Deliverables -->
${AGENCY_NODES.map((n) => `    <rect x="814" y="${n.y}" width="352" height="44" rx="11" fill="${n.bg}" fill-opacity="0.85" stroke="${n.color}" stroke-opacity="0.55" stroke-width="1.2">
      <animate attributeName="stroke-opacity" values="0.35;0.9;0.35" dur="4.2s" begin="${n.delay}" repeatCount="indefinite"/>
    </rect>
    <circle cx="834" cy="${n.y + 22}" r="3.6" fill="${n.color}"/>
    <text x="848" y="${n.y + 19}" fill="#FFFFFF" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="13.5" font-weight="800">${n.title}</text>
    <text x="848" y="${n.y + 35}" fill="#FDE68A" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="10.5">${n.sub}</text>`).join('\n')}

    <!-- Outer Border -->
    <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="17" stroke="#334155" stroke-width="1.5"/>
  </g>
</svg>
`;

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, svg, 'utf8');
console.log(`Generated animated architecture SVG: ${OUT_PATH} (${Buffer.byteLength(svg, 'utf8')} bytes)`);
