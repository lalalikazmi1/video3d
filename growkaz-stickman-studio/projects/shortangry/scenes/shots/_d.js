// shots/_d.js — Sunday-dread props (underscore: not auto-loaded).
import { E, S, clamp, seg, circle, ring, rr, poly, glow, alpha, text, FONTS } from '/engine/core.js';
const ui = () => S().ui;
// calendar page: red header, big day text
export function calendar(g, x, y, s, day, col = '#c84a3a', sub = '') { g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -170, -190, 340, 380, 18); g.fillStyle = '#f4efe6'; g.fill(); rr(g, -170, -190, 340, 110, 18); g.fillStyle = col; g.fill(); g.fillRect(-170, -110, 340, 30);
  for (const sx of [-1, 1]) { rr(g, sx * 90 - 12, -215, 24, 60, 10); g.fillStyle = '#2a1e18'; g.fill(); }
  text(g, day, 0, -118, { size: Math.min(64, 400 / day.length), color: '#fff4d6', font: FONTS.title, weight: 700 });
  if (!sub) for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { rr(g, -140 + c * 72, -40 + r * 70, 56, 52, 6); g.fillStyle = alpha('#2a1e18', 0.15); g.fill(); }
  if (sub) text(g, sub, 0, 80, { size: 150, color: '#2a1e18', font: FONTS.title, weight: 700 }); g.restore(); }
// envelope with red unread badge
export function inbox(g, x, y, s, n) { g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -150, -100, 300, 200, 14); g.fillStyle = '#f4efe6'; g.fill(); g.lineWidth = 8; g.strokeStyle = '#2a1e18'; g.stroke();
  seg(g, [[-140, -90], [0, 20], [140, -90]], 8, '#2a1e18');
  if (n) { circle(g, 140, -100, 62, '#d63a2a'); text(g, String(n), 140, -82, { size: 58, color: '#fff', font: FONTS.ui, weight: 900 }); } g.restore(); }
// shock machine: box, dial, lightning bolt
export function shockBox(g, x, y, s, t, live = 1) { g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -180, -130, 360, 260, 20); g.fillStyle = '#2a2a32'; g.fill(); g.lineWidth = 8; g.strokeStyle = '#4a4a56'; g.stroke();
  circle(g, -70, -10, 70, '#f4efe6'); const a = -2.4 + 1.6 * live + 0.15 * Math.sin(t * 9); seg(g, [[-70, -10], [-70 + Math.cos(a) * 55, -10 + Math.sin(a) * 55]], 8, '#d63a2a');
  for (let i = 0; i < 3; i++) circle(g, 80, -60 + i * 60, 18, i === 0 && Math.sin(t * 8) > 0 ? '#ff4a2a' : '#5a1a14');
  seg(g, [[180, 0], [260, 30], [300, -20]], 10, '#8a8a92'); g.restore(); }
// cartoon lion head
export function lion(g, x, y, s, t = 0) { g.save(); g.translate(x, y); g.scale(s, s);
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; circle(g, Math.cos(a) * 120, Math.sin(a) * 120 + 4 * Math.sin(t * 3 + i), 60, '#a85a1a'); }
  circle(g, 0, 0, 115, '#e8a040'); for (const sx of [-1, 1]) { circle(g, sx * 42, -25, 16, '#1a0e08'); seg(g, [[sx * 70, -55], [sx * 20, -45]], 10, '#6a3a10'); }
  poly(g, [[-26, 20], [26, 20], [0, 46]], '#3a1a10'); g.beginPath(); g.arc(0, 60, 40, 0.1 * Math.PI, 0.9 * Math.PI); g.lineWidth = 8; g.strokeStyle = '#3a1a10'; g.stroke();
  for (const sx of [-1, 1]) poly(g, [[sx * 16, 66], [sx * 26, 66], [sx * 21, 90]], '#fff'); g.restore(); }
// suitcase
export function suitcase(g, x, y, s, col = '#c84a3a', label = '') { g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -50, -170, 100, 60, 20); g.lineWidth = 16; g.strokeStyle = '#2a1e18'; g.stroke();
  rr(g, -160, -130, 320, 230, 22); g.fillStyle = col; g.fill(); g.lineWidth = 8; g.stroke();
  seg(g, [[-90, -130], [-90, 100]], 8, '#2a1e18'); seg(g, [[90, -130], [90, 100]], 8, '#2a1e18');
  if (label) text(g, label, 0, 0, { size: 50, color: '#fff4d6', font: FONTS.title, weight: 700 }); g.restore(); }
// shield
export function shield(g, x, y, s, col, k = 1) { g.save(); g.translate(x, y); g.scale(s * k, s * k); glow(g, 0, 0, 260, col, 0.4);
  g.beginPath(); g.moveTo(0, -170); g.lineTo(140, -120); g.quadraticCurveTo(140, 80, 0, 170); g.quadraticCurveTo(-140, 80, -140, -120); g.closePath(); g.fillStyle = col; g.fill(); g.lineWidth = 12; g.strokeStyle = '#fff4d6'; g.stroke();
  seg(g, [[-50, 0], [-10, 45], [60, -45]], 20, '#fff4d6'); g.restore(); }
// shadowy monster with glowing eyes
export function monster(g, x, y, s, t, a = 1) { g.save(); g.globalAlpha = a; g.translate(x, y); g.scale(s, s);
  g.beginPath(); g.moveTo(-220, 200); for (let i = 0; i <= 10; i++) { const px = -220 + i * 44, py = -150 - 60 * Math.sin(i / 10 * Math.PI) + 15 * Math.sin(t * 3 + i); g.lineTo(px, py); } g.lineTo(220, 200); g.closePath(); g.fillStyle = '#2a1222'; g.fill(); g.lineWidth = 10; g.strokeStyle = alpha('#ff5a3a', 0.55); g.stroke();
  for (const sx of [-1, 1]) { glow(g, sx * 60, -80, 60, '#ff3a2a', 0.6); circle(g, sx * 60, -80, 18, '#ff4a2a'); }
  for (let i = 0; i < 6; i++) poly(g, [[-100 + i * 40, -20], [-80 + i * 40, -20], [-90 + i * 40, 10]], '#f4efe6'); g.restore(); }
// to-do list
export function todo(g, x, y, s, items, done = 0) { g.save(); g.translate(x, y); g.scale(s, s); g.rotate(-0.04);
  rr(g, -200, -230, 400, 460, 12); g.fillStyle = '#f4efe6'; g.fill(); text(g, 'TO DO', 0, -170, { size: 54, color: '#c84a3a', font: FONTS.title, weight: 700 });
  items.forEach((it, i) => { const yy = -90 + i * 80; rr(g, -170, yy - 26, 40, 40, 6); g.lineWidth = 6; g.strokeStyle = '#2a1e18'; g.stroke();
    if (i < done) seg(g, [[-162, yy - 8], [-150, yy + 6], [-128, yy - 22]], 8, '#3a9e5a');
    text(g, it, 20, yy + 4, { size: 36, color: '#2a1e18', font: FONTS.ui, weight: 800 }); }); g.restore(); }
// sky that sinks from sunset to night with k (0..1)
export function sunsetSky(g, k) { const top = k < 0.5 ? '#3a1a3a' : '#0a0a1a', bot = k < 0.5 ? '#e8743a' : '#1a1a3a';
  const gr = g.createLinearGradient(0, 0, 0, E.H); gr.addColorStop(0, top); gr.addColorStop(1, bot); g.fillStyle = gr; g.fillRect(0, 0, E.W, E.H);
  const sy = E.H * (0.4 + 0.5 * k); glow(g, E.W * 0.8, sy, 400, '#ffb04a', 0.6 * (1 - k)); circle(g, E.W * 0.8, sy, 130, alpha('#ffc45a', 1 - k));
  g.fillStyle = '#1a0a10'; g.beginPath(); g.moveTo(0, E.H * 0.84); g.quadraticCurveTo(E.W * 0.5, E.H * 0.8, E.W, E.H * 0.85); g.lineTo(E.W, E.H); g.lineTo(0, E.H); g.closePath(); g.fill(); }
