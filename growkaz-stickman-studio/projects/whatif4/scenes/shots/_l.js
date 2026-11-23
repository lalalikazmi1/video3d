// shots/_l.js — lock-in props (underscore: not auto-loaded).
import { E, S, clamp, seg, circle, ring, rr, poly, glow, alpha, text, FONTS } from '/engine/core.js';
const ui = () => S().ui;
// desk silhouette across the bottom
export function desk(g, y = 0.78) { rr(g, E.W * 0.08, E.H * y, E.W * 0.84, 30, 8); g.fillStyle = '#3a2418'; g.fill(); g.fillStyle = '#1a100c'; g.fillRect(E.W * 0.12, E.H * y + 30, 24, E.H); g.fillRect(E.W * 0.86, E.H * y + 30, 24, E.H); }
// open laptop; screen shows `str` (or a doc) — o.col screen colour
export function laptop(g, x, y, s, str = '', o = {}) { g.save(); g.translate(x, y); g.scale(s, s); glow(g, 0, -150, 320, o.glowCol || '#9fd8ff', 0.3);
  rr(g, -260, -330, 520, 330, 18); g.fillStyle = '#2a2a32'; g.fill(); rr(g, -240, -312, 480, 294, 8); g.fillStyle = o.col || '#f4efe6'; g.fill();
  if (!str) { for (let i = 0; i < 6; i++) rr(g, -200, -270 + i * 40, i === 0 ? 260 : 400 - (i % 3) * 60, 16, 6), g.fillStyle = i === 0 ? '#2a1e18' : alpha('#2a1e18', 0.3), g.fill(); }
  else text(g, str, 0, -150, { size: o.size || 60, color: o.tc || '#2a1e18', font: FONTS.title, weight: 700 });
  poly(g, [[-300, 0], [300, 0], [330, 30], [-330, 30]], '#3a3a44'); g.restore(); }
// browser tab strip with n tabs
export function tabs(g, x, y, s, n, t = 0) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -420, -40, 840, 280, 14); g.fillStyle = '#f4efe6'; g.fill();
  const w = Math.min(160, 820 / n); for (let i = 0; i < n; i++) { rr(g, -410 + i * w, -34, w - 6, 50, 10); g.fillStyle = i === n - 1 ? '#fff' : ['#d6a03a', '#3a8fd6', '#c84a3a', '#3a9e5a', '#8a5ad6'][i % 5]; g.fill(); }
  for (let i = 0; i < 4; i++) { rr(g, -380, 50 + i * 40, 600 - i * 90, 16, 6); g.fillStyle = alpha('#2a1e18', 0.25); g.fill(); } g.restore(); }
// pyramid with sun
export function pyramid(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); circle(g, 160, -260, 60, '#ffc45a');
  poly(g, [[-260, 0], [0, -280], [260, 0]], '#d6a03a'); poly(g, [[0, -280], [260, 0], [60, 0]], '#a87a2a');
  for (let i = 1; i < 6; i++) seg(g, [[-260 + i * 44, -i * 46], [260 - i * 44, -i * 46]], 3, alpha('#5a3a1a', 0.5)); g.restore(); }
// row of dominoes, k = 0..1 how many have fallen
export function dominos(g, x, y, s, k) { g.save(); g.translate(x, y); g.scale(s, s); const n = 8;
  for (let i = 0; i < n; i++) { const f = clamp(k * n - i); g.save(); g.translate(-420 + i * 120, 0); g.rotate(f * 1.15); rr(g, -22, -160, 44, 160, 6); g.fillStyle = i === 0 ? ui().accent : '#f4efe6'; g.fill();
    circle(g, 0, -120, 7, '#2a1e18'); circle(g, 0, -40, 7, '#2a1e18'); g.restore(); } g.restore(); }
// sticky residue blobs clinging to something at (x,y)
export function residue(g, x, y, s, n, t = 0, col = '#c84a3a') { for (let i = 0; i < n; i++) { const a = i * 2.4, r = 90 + (i % 4) * 45; const px = x + Math.cos(a) * r * s, py = y + Math.sin(a) * r * 0.7 * s;
  g.save(); g.globalAlpha = 0.75; circle(g, px, py + 3 * Math.sin(t * 2 + i), (22 + (i % 3) * 8) * s, col); g.restore(); } }
// flowing sine wave (flow state)
export function flowWave(g, y, amp, t, col, k = 1) { g.save(); g.strokeStyle = col; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath();
  for (let i = 0; i <= 120 * k; i++) { const x = E.W * 0.08 + i / 120 * E.W * 0.84; const yy = y + amp * Math.sin(i / 12 + t * 2); i ? g.lineTo(x, yy) : g.moveTo(x, yy); } g.stroke(); g.restore(); }
