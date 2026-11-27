/**
 * Procedural Animated SVG Hero Banner Generator for The SCI SolCielo Innovacion Pvt. Ltd.
 * Generates a pure-SVG + CSS @keyframes + SMIL animated banner compatible with GitHub <img> Camo proxy
 * (no external fonts, no <script>, no <foreignObject>).
 *
 * Usage: node scripts/generate-hero-banner.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.resolve(__dirname, '../assets/hero-banner.svg');

const W = 1200;
const H = 330;

const PRODUCTS = [
  {
    idx: '01 · CLOUD OS',
    name: 'TheSCI OS',
    desc: '~15MB RAM Go Server Panel',
    accent: '#38BDF8',
    bgTint: '#0C223B',
    x: 48,
    w: 262,
    delay: '0s',
    metric: '15MB',
  },
  {
    idx: '02 · EDTECH ERP + CBT',
    name: 'TheSCI Coach',
    desc: '0%-Cut ERP &amp; 304K+ Q-Bank',
    accent: '#34D399',
    bgTint: '#0B2926',
    x: 328,
    w: 262,
    delay: '0.9s',
    metric: '304K+',
  },
  {
    idx: '03 · GITOPS PAAS',
    name: 'TheSCI Deploymate',
    desc: 'Zero-SSH Self-Hosted CI/CD',
    accent: '#818CF8',
    bgTint: '#161C3D',
    x: 608,
    w: 262,
    delay: '1.8s',
    metric: '0-SSH',
  },
  {
    idx: '04 · AI GROWTH HUB',
    name: 'TheSCI Social',
    desc: 'Omnichannel AI Publishing',
    accent: '#C084FC',
    bgTint: '#25173D',
    x: 888,
    w: 264,
    delay: '2.7s',
    metric: '28 MOD',
  },
];

// Generate subtle floating star/node particles procedurally
const PARTICLES = Array.from({ length: 22 }, (_, i) => {
  const px = 40 + ((i * 173) % (W - 80));
  const py = 28 + ((i * 89) % (H - 56));
  const r = (1.1 + (i % 3) * 0.55).toFixed(2);
  const dur = (3.4 + (i % 5) * 0.9).toFixed(1);
  const begin = ((i * 0.37) % 4).toFixed(2);
  const colors = ['#38BDF8', '#818CF8', '#C084FC', '#34D399', '#FBBF24'];
  const color = colors[i % colors.length];
  return `  <circle cx="${px}" cy="${py}" r="${r}" fill="${color}" opacity="0.18">
    <animate attributeName="opacity" values="0.10;0.75;0.10" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="${py};${py - 7};${py}" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/>
  </circle>`;
}).join('\n');

// Animated signal pulses flowing along horizontal circuit tracks above cards
const CIRCUIT_TRACKS = `
  <g opacity="0.65">
    <!-- Main bus line linking all 4 product engines -->
    <path id="bus-left" d="M 179 182 L 179 194" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.55"/>
    <path id="bus-mid1" d="M 459 182 L 459 194" stroke="#34D399" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.55"/>
    <path id="bus-mid2" d="M 739 182 L 739 194" stroke="#818CF8" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.55"/>
    <path id="bus-right" d="M 1020 182 L 1020 194" stroke="#C084FC" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.55"/>
    <path id="main-bus" d="M 48 182 L 1152 182" stroke="url(#busGrad)" stroke-width="1.4" opacity="0.65"/>

    <!-- Travelling glowing data packets on the bus -->
    <circle r="3.2" fill="#38BDF8" filter="url(#softGlow)">
      <animateMotion dur="4.8s" repeatCount="indefinite" path="M 48 182 L 1152 182"/>
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="4.8s" repeatCount="indefinite"/>
    </circle>
    <circle r="2.8" fill="#FBBF24" filter="url(#softGlow)">
      <animateMotion dur="5.6s" begin="2.1s" repeatCount="indefinite" path="M 1152 182 L 48 182"/>
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="5.6s" repeatCount="indefinite"/>
    </circle>
    <circle r="2.5" fill="#34D399" filter="url(#softGlow)">
      <animateMotion dur="4.2s" begin="1.1s" repeatCount="indefinite" path="M 48 182 L 1152 182"/>
      <animate attributeName="opacity" values="0;0.95;0.95;0" keyTimes="0;0.1;0.9;1" dur="4.2s" repeatCount="indefinite"/>
    </circle>
  </g>
`;

// Generate the 4 product engine cards with animated borders, live bars, and subtle float
const CARDS_SVG = PRODUCTS.map((p, i) => {
  const barY = 278;
  const barX = p.x + 18;
  const barW = p.w - 36;
  const fillW = Math.round(barW * (0.68 + (i % 3) * 0.1));
  return `  <g class="card card-${i}">
    <rect x="${p.x}" y="198" width="${p.w}" height="96" rx="14" fill="${p.bgTint}" fill-opacity="0.72" stroke="${p.accent}" stroke-opacity="0.45" stroke-width="1.3">
      <animate attributeName="stroke-opacity" values="0.32;0.92;0.32" dur="4.4s" begin="${p.delay}" repeatCount="indefinite"/>
    </rect>
    <!-- Live metric badge -->
    <rect x="${p.x + p.w - 72}" y="210" width="56" height="20" rx="10" fill="${p.accent}" fill-opacity="0.14" stroke="${p.accent}" stroke-opacity="0.45" stroke-width="0.9"/>
    <text x="${p.x + p.w - 44}" y="223.5" text-anchor="middle" fill="${p.accent}" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="10" font-weight="800">${p.metric}</text>

    <!-- Pulsing status dot -->
    <circle cx="${p.x + 22}" cy="220" r="3.4" fill="${p.accent}">
      <animate attributeName="opacity" values="0.35;1;0.35" dur="2.2s" begin="${p.delay}" repeatCount="indefinite"/>
    </circle>
    <text x="${p.x + 32}" y="223.5" fill="${p.accent}" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="10.5" font-weight="700" letter-spacing="0.4">${p.idx}</text>

    <!-- Title & Subtitle -->
    <text x="${p.x + 18}" y="248" fill="#F8FAFC" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16.5" font-weight="800">${p.name}</text>
    <text x="${p.x + 18}" y="266" fill="#CBD5E1" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500">${p.desc}</text>

    <!-- Animated telemetry progress bar -->
    <rect x="${barX}" y="${barY}" width="${barW}" height="4" rx="2" fill="#1E293B"/>
    <rect x="${barX}" y="${barY}" width="${fillW}" height="4" rx="2" fill="${p.accent}" opacity="0.9">
      <animate attributeName="width" values="${Math.round(barW * 0.48)};${Math.round(barW * 0.92)};${Math.round(barW * 0.62)};${Math.round(barW * 0.48)}" dur="${(4.5 + i * 0.6).toFixed(1)}s" begin="${p.delay}" repeatCount="indefinite"/>
    </rect>
  </g>`;
}).join('\n');

// Animated mini equalizer bars in top-right decorative telemetry module
const EQ_BARS = [0, 1, 2, 3, 4, 5].map((n) => {
  const bx = 790 + n * 8;
  const minH = 6 + (n % 2) * 3;
  const maxH = 18 + (n % 3) * 5;
  const dur = (1.1 + n * 0.22).toFixed(2);
  return `    <rect x="${bx}" y="44" width="4" height="${minH}" rx="2" fill="#38BDF8" opacity="0.85">
      <animate attributeName="height" values="${minH};${maxH};${minH}" dur="${dur}s" repeatCount="indefinite"/>
      <animate attributeName="y" values="${56 - minH};${56 - maxH};${56 - minH}" dur="${dur}s" repeatCount="indefinite"/>
    </rect>`;
}).join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none" role="img" aria-label="The SCI SolCielo Innovacion Private Limited — Animated Engineering Banner">
  <style><![CDATA[
    .card {
      transform-box: fill-box;
      transform-origin: center;
      animation: floatCard 5.2s ease-in-out infinite;
    }
    .card-0 { animation-delay: 0s; }
    .card-1 { animation-delay: 0.7s; }
    .card-2 { animation-delay: 1.4s; }
    .card-3 { animation-delay: 2.1s; }
    @keyframes floatCard {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-3.5px); }
    }
    .cursor-blink {
      animation: blink 1.05s steps(2, start) infinite;
    }
    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .ring-ping {
      transform-box: fill-box;
      transform-origin: center;
      animation: ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    @keyframes ping {
      0% { transform: scale(1); opacity: 0.85; }
      75%, 100% { transform: scale(2.8); opacity: 0; }
    }
  ]]></style>

  <defs>
    <clipPath id="outerClip">
      <rect x="0" y="0" width="${W}" height="${H}" rx="20"/>
    </clipPath>

    <linearGradient id="bg" x1="0" y1="0" x2="${W}" y2="${H}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#070B16"/>
      <stop offset="52%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#151E35"/>
    </linearGradient>

    <linearGradient id="spectrumFlow" x1="0%" y1="0%" x2="200%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="25%" stop-color="#6366F1"/>
      <stop offset="50%" stop-color="#C084FC"/>
      <stop offset="75%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#38BDF8"/>
      <animate attributeName="x1" values="0%;-100%;0%" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="200%;100%;200%" dur="8s" repeatCount="indefinite"/>
    </linearGradient>

    <linearGradient id="titleShimmer" x1="-20%" y1="0%" x2="120%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="42%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#7DD3FC"/>
      <stop offset="58%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
      <animate attributeName="x1" values="-120%;120%" dur="6.5s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="20%;260%" dur="6.5s" repeatCount="indefinite"/>
    </linearGradient>

    <linearGradient id="busGrad" x1="48" y1="182" x2="1152" y2="182" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.15"/>
      <stop offset="25%" stop-color="#38BDF8" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#34D399" stop-opacity="0.8"/>
      <stop offset="75%" stop-color="#818CF8" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#C084FC" stop-opacity="0.15"/>
    </linearGradient>

    <radialGradient id="orbCyan" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="orbAmber" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="orbViolet" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#A855F7" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#A855F7" stop-opacity="0"/>
    </radialGradient>

    <pattern id="dotGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="#94A3B8" fill-opacity="0.15"/>
    </pattern>

    <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <g clip-path="url(#outerClip)">
    <!-- Base & Dot Grid -->
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#bg)"/>
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#dotGrid)"/>

    <!-- Breathing Ambient Glow Orbs -->
    <ellipse cx="220" cy="70" rx="340" ry="175" fill="url(#orbCyan)">
      <animate attributeName="cx" values="180;280;180" dur="12s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="60;95;60" dur="9s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="990" cy="255" rx="360" ry="185" fill="url(#orbAmber)">
      <animate attributeName="cx" values="1020;920;1020" dur="14s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="265;225;265" dur="10s" repeatCount="indefinite"/>
    </ellipse>
    <ellipse cx="640" cy="140" rx="280" ry="150" fill="url(#orbViolet)">
      <animate attributeName="rx" values="250;310;250" dur="11s" repeatCount="indefinite"/>
    </ellipse>

    <!-- Procedurally Animated Ambient Particles -->
${PARTICLES}

    <!-- Flowing Top Spectrum Ribbon -->
    <rect x="0" y="0" width="${W}" height="6" fill="url(#spectrumFlow)"/>

    <!-- Top Status Pill with Radar Ping -->
    <rect x="48" y="28" width="466" height="32" rx="16" fill="#111C33" stroke="#334155" stroke-width="1"/>
    <circle cx="68" cy="44" r="4.5" fill="#10B981" class="ring-ping"/>
    <circle cx="68" cy="44" r="4.5" fill="#10B981"/>
    <text x="84" y="48" fill="#E2E8F0" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="11.5" font-weight="700" letter-spacing="0.6">
      LIVE SYSTEMS · MCA PVT LTD · EST. 2019 · RANCHI, INDIA
    </text>

    <!-- Live Animated Mini Equalizer Telemetry -->
${EQ_BARS}

    <!-- Dual-Domain Right Badges -->
    <rect x="862" y="28" width="138" height="32" rx="16" fill="#0EA5E9" fill-opacity="0.14" stroke="#38BDF8" stroke-opacity="0.65" stroke-width="1.1">
      <animate attributeName="stroke-opacity" values="0.45;0.95;0.45" dur="3.4s" repeatCount="indefinite"/>
    </rect>
    <text x="931" y="48" text-anchor="middle" fill="#7DD3FC" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="12.5" font-weight="800">thesci.co</text>

    <rect x="1012" y="28" width="140" height="32" rx="16" fill="#F59E0B" fill-opacity="0.14" stroke="#FBBF24" stroke-opacity="0.65" stroke-width="1.1">
      <animate attributeName="stroke-opacity" values="0.45;0.95;0.45" dur="3.4s" begin="1.7s" repeatCount="indefinite"/>
    </rect>
    <text x="1082" y="48" text-anchor="middle" fill="#FDE68A" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="12.5" font-weight="800">thesci.co.in</text>

    <!-- Main Shimmering Title -->
    <text x="48" y="118" fill="url(#titleShimmer)" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" letter-spacing="-0.9">
      The SCI SolCielo Innovacion™
    </text>

    <!-- Subtitle with Blinking Engineering Terminal Cursor -->
    <text x="48" y="152" fill="#CBD5E1" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="500">
      Autonomous Compiled Software Platforms  ·  Custom Engineering &amp; Digital Growth Studio
    </text>
    <rect x="786" y="136" width="10" height="19" rx="2" fill="#38BDF8" class="cursor-blink"/>

    <!-- Circuit Bus & Data Packets -->
${CIRCUIT_TRACKS}

    <!-- 4 Flagship Product Engine Cards -->
${CARDS_SVG}

    <!-- Crisp Outer Border -->
    <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="19" stroke="#334155" stroke-width="1.5"/>
  </g>
</svg>
`;

fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, svg, 'utf8');
console.log(`Generated animated SVG banner: ${OUT_PATH} (${Buffer.byteLength(svg, 'utf8')} bytes)`);
