// shots/_e.js — embarrassing-moments props (underscore: not auto-loaded).
import { E, S, ease, prog, clamp, lerp, seg, circle, ring, rr, poly, glow, alpha, shade, text, FONTS } from '/engine/core.js';
const ui = () => S().ui;
// big yellow T-shirt with a cheesy singer face printed on it
export function shirt(g, x, y, s, t = 0) { g.save(); g.translate(x, y); g.scale(s, s);
  poly(g, [[-150, -200], [-60, -230], [-30, -205], [30, -205], [60, -230], [150, -200], [230, -110], [170, -60], [140, -100], [140, 210], [-140, 210], [-140, -100], [-170, -60], [-230, -110]], '#f2c21a');
  g.lineWidth = 8; g.strokeStyle = '#0a0508'; g.stroke();
  circle(g, 0, -10, 95, '#f0c8a0'); g.beginPath(); g.ellipse(0, -80, 120, 70, 0, Math.PI, 0); g.fillStyle = '#c98a3a'; g.fill(); for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(sx * 95, -20, 35, 80, 0, 0, Math.PI * 2); g.fill(); }
  for (const sx of [-1, 1]) { circle(g, sx * 32, -20, 10, '#2a1e18'); seg(g, [[sx * 50, -48], [sx * 16, -42]], 6, '#6a4a2a'); }
  g.beginPath(); g.arc(0, 15, 40, 0.15 * Math.PI, 0.85 * Math.PI); g.lineWidth = 9; g.strokeStyle = '#2a1e18'; g.stroke(); rr(g, -28, 22, 56, 16, 6); g.fillStyle = '#fff'; g.fill();
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + t; circle(g, Math.cos(a) * 125, -10 + Math.sin(a) * 125, 9, '#d64a33'); }
  text(g, 'MANILOW', 0, 150, { size: 52, color: '#d64a33', font: FONTS.title, weight: 700 }); g.restore(); }
// spotlight cone from above onto (x, y)
export function spotlight(g, x, y, w, a = 1, col = '#fff3d6') { g.save(); g.globalAlpha = a; const gr = g.createLinearGradient(x, 0, x, y); gr.addColorStop(0, alpha(col, 0.05)); gr.addColorStop(1, alpha(col, 0.32));
  g.fillStyle = gr; g.beginPath(); g.moveTo(x - w * 0.15, 0); g.lineTo(x + w * 0.15, 0); g.lineTo(x + w / 2, y); g.lineTo(x - w / 2, y); g.closePath(); g.fill(); g.beginPath(); g.ellipse(x, y, w / 2, w * 0.1, 0, 0, Math.PI * 2); g.fillStyle = alpha(col, 0.35); g.fill(); g.restore(); }
// Cyberball screen: three avatars, ball tossed; after `out` seconds the player (bottom) is ignored
export function cyber(g, x, y, s, t, out = 1e9) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -420, -280, 840, 560, 24); g.fillStyle = '#0e1622'; g.fill(); g.lineWidth = 10; g.strokeStyle = '#2a3a52'; g.stroke();
  text(g, 'CYBERBALL', 0, -232, { size: 34, color: '#7ab8ff', font: FONTS.ui, weight: 900 });
  const P = [[-260, -60, '#3a8fd6'], [260, -60, '#5fd17a'], [0, 180, '#d64a33']];
  P.forEach(([px, py, c], i) => { circle(g, px, py - 50, 34, c); rr(g, px - 34, py - 10, 68, 70, 20); g.fillStyle = c; g.fill(); text(g, i === 2 ? 'YOU' : 'P' + (i + 1), px, py + 100, { size: 30, color: '#e8e8f0', font: FONTS.ui, weight: 900 }); });
  const seq = t < out ? [0, 2, 1, 2, 0, 1] : [0, 1]; const T = 0.8, n = Math.floor(t / T), f = (t % T) / T; const a = seq[n % seq.length], b = seq[(n + 1) % seq.length];
  const bx = lerp(P[a][0], P[b][0], f), by = lerp(P[a][1] - 60, P[b][1] - 60, f) - Math.sin(f * Math.PI) * 120; circle(g, bx, by, 18, '#f4efe6'); g.restore(); }
// highlighter pen sweeping a yellow stripe
export function highlighter(g, x, y, w, k, col = '#f2e21a') { const L = w * clamp(k); g.save(); g.globalAlpha = 0.55; rr(g, x - w / 2, y - 36, L, 72, 8); g.fillStyle = col; g.fill(); g.restore();
  g.save(); g.translate(x - w / 2 + L, y - 10); g.rotate(-0.6); rr(g, -20, -170, 60, 170, 10); g.fillStyle = '#2a2a30'; g.fill(); rr(g, -14, 0, 48, 34, 4); g.fillStyle = col; g.fill(); g.restore(); }
// film reel / replay icon
export function replay(g, x, y, r, t, col) { col = col || ui().accent; g.save(); g.translate(x, y); g.rotate(t * 2); ring(g, 0, 0, r, r * 0.1, col); for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; circle(g, Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55, r * 0.18, col); } circle(g, 0, 0, r * 0.12, col); g.restore();
  g.save(); g.translate(x, y); g.strokeStyle = col; g.lineWidth = r * 0.08; g.beginPath(); g.arc(0, 0, r * 1.3, -2.6, 1.6); g.stroke(); poly(g, [[Math.cos(1.6) * r * 1.3 - r * 0.25, Math.sin(1.6) * r * 1.3], [Math.cos(1.6) * r * 1.3 + r * 0.2, Math.sin(1.6) * r * 1.3 - r * 0.25], [Math.cos(1.6) * r * 1.3 + r * 0.15, Math.sin(1.6) * r * 1.3 + r * 0.25]], col); g.restore(); }
// coffee cup that tips over at k
export function coffee(g, x, y, s, k) { k = clamp(k); g.save(); g.translate(x, y); g.scale(s, s); if (k > 0.3) { g.beginPath(); g.ellipse(120 * k, 6, 180 * k, 24 * k, 0, 0, Math.PI * 2); g.fillStyle = '#5a3418'; g.fill(); }
  g.rotate(ease.inOut(k) * 1.4); rr(g, -60, -140, 120, 140, 14); g.fillStyle = '#f4efe6'; g.fill(); g.strokeStyle = '#f4efe6'; g.lineWidth = 16; g.beginPath(); g.arc(-64, -70, 28, Math.PI / 2, Math.PI * 1.5); g.stroke(); g.restore(); }
// bush with berries
export function bush(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); for (const [dx, dy, r] of [[-90, -60, 90], [60, -70, 100], [0, -130, 90], [-20, -40, 100]]) circle(g, dx, dy, r, '#2f5a2a');
  for (let i = 0; i < 14; i++) circle(g, -130 + (i * 53) % 260, -160 + (i * 71) % 150, 14, '#c0303a'); g.restore(); }
// tall grass with glowing predator eyes
export function grass(g, x, y, w, t, eyes = 1) { g.save(); for (let i = 0; i < 60; i++) { const gx = x - w / 2 + i * w / 60, h = 120 + (i * 37) % 90, sw = Math.sin(t * 1.5 + i) * 12; g.strokeStyle = i % 2 ? '#3a5a2a' : '#2a4a20'; g.lineWidth = 10; g.beginPath(); g.moveTo(gx, y); g.quadraticCurveTo(gx + sw / 2, y - h / 2, gx + sw, y - h); g.stroke(); }
  if (eyes > 0) for (const ex of [-40, 40]) { glow(g, x + ex, y - 90, 50, '#f2c21a', 0.6 * eyes); g.beginPath(); g.ellipse(x + ex, y - 90, 20, 12, 0, 0, Math.PI * 2); g.fillStyle = alpha('#f2e21a', eyes); g.fill(); g.fillStyle = '#000'; g.fillRect(x + ex - 3, y - 100, 6, 20); } g.restore(); }
// notebook with handwritten lines
export function note(g, x, y, s, str, k = 1) { g.save(); g.translate(x, y); g.scale(s * k, s * k); g.rotate(-0.05); rr(g, -200, -150, 400, 300, 10); g.fillStyle = '#f4efe6'; g.fill(); for (let i = 0; i < 5; i++) seg(g, [[-180, -90 + i * 50], [180, -90 + i * 50]], 2, '#9ab0d0');
  seg(g, [[-140, -150], [-140, 150]], 3, '#e08080'); text(g, str, 20, -20, { size: 38, color: '#2a3a8a', font: FONTS.serif, weight: 900, italic: true }); g.restore(); }
