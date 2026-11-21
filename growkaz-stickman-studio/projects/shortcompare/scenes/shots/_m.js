// shots/_m.js — memory-video props (underscore: not auto-loaded).
import { E, S, ease, prog, clamp, lerp, seg, circle, ring, rr, poly, glow, alpha, shade, text, FONTS } from '/engine/core.js';
import { bigFace } from '/engine/rig2d.js';
import * as CAST from '../cast.js';
const ui = () => S().ui;
export const GRN = '#5fd17a';
// video camera with REC light
export function camera(g, x, y, s, t) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -220, -130, 340, 260, 30); g.fillStyle = '#2a2228'; g.fill(); g.strokeStyle = ui().cream; g.lineWidth = 8; g.stroke();
  poly(g, [[120, -60], [260, -130], [260, 130], [120, 60]], '#2a2228'); g.stroke(); circle(g, -60, 0, 80, '#120c10'); ring(g, -60, 0, 80, 10, ui().gold);
  if (Math.sin(t * 6) > 0) { circle(g, -170, -90, 18, ui().accent); glow(g, -170, -90, 50, ui().accent, 0.6); text(g, 'REC', -110, -88, { size: 34, color: ui().accent, font: FONTS.ui, weight: 900, align: 'left' }); } g.restore(); }
// framed mugshot of a cast member
export function mug(g, x, y, s, o, hl = 0, expr = 'neutral') { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -110, -140, 220, 280, 10); g.fillStyle = '#d8d0c0'; g.fill(); rr(g, -96, -126, 192, 220, 6); g.fillStyle = '#3a3238'; g.fill();
  g.save(); g.beginPath(); g.rect(-96, -126, 192, 220); g.clip(); bigFace(g, 0, 40, 80, { outfit: CAST[o], expr, rimColor: ui().gold }); g.restore();
  if (hl > 0) { ring(g, 0, -10, 175 * ease.outBack(clamp(hl)), 10, ui().accent); } g.restore(); }
export function prisonBars(g, k) { for (let i = 0; i < 9; i++) { const x = E.W * (0.06 + i * 0.11), y = lerp(-E.H, 0, ease.out(clamp(k))); rr(g, x - 16, y, 32, E.H, 12); g.fillStyle = '#3a3438'; g.fill(); rr(g, x - 6, y, 8, E.H, 4); g.fillStyle = '#6a6268'; g.fill(); } }
export function dna(g, x, y, h, t, k) { const n = 22; for (let i = 0; i < n * clamp(k); i++) { const yy = y - h / 2 + i * h / n, a = t * 2 + i * 0.5, dx = Math.sin(a) * 140;
  seg(g, [[x - dx, yy], [x + dx, yy]], 6, alpha(ui().cream, 0.5)); circle(g, x - dx, yy, 14, ui().gold); circle(g, x + dx, yy, 14, ui().accent); } }
export function car(g, x, y, s, col, flip = 1, dent = 0) { g.save(); g.translate(x, y); g.scale(s * flip, s); rr(g, -170, -70, 340, 80, 24); g.fillStyle = col; g.fill(); poly(g, [[-90, -70], [-50, -130], [70, -130], [110, -70]], col);
  poly(g, [[-70, -78], [-40, -120], [5, -120], [5, -78]], '#9ad0e8'); poly(g, [[20, -78], [20, -120], [62, -120], [92, -78]], '#9ad0e8');
  for (const wx of [-100, 100]) { circle(g, wx, 14, 38, '#121014'); circle(g, wx, 14, 16, '#8a8288'); }
  if (dent) { poly(g, [[170, -70], [170 - 50 * dent, -40], [170 - 20 * dent, -20], [170 - 60 * dent, 0], [170, 10]], '#120c10'); } g.restore(); }
export function glass(g, x, y, k, t) { for (let i = 0; i < 18; i++) { const a = i * 2.4, d = 260 * ease.out(clamp(k)) * (0.4 + (i % 5) / 6); g.save(); g.translate(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.6 + k * k * 120); g.rotate(a + t * 3);
  poly(g, [[0, -18], [14, 10], [-12, 8]], alpha('#bfe6f5', 0.85)); g.restore(); } }
export function puzzle(g, cx, cy, k, t) { const ps = 4, sz = 150; for (let i = 0; i < ps * 3; i++) { const c = i % ps, r = Math.floor(i / ps), tx = cx + (c - 1.5) * sz, ty = cy + (r - 1) * sz;
  const fill = i % 3 === 1, kk = clamp(k * 2.2 - i * 0.1), fx = lerp(tx + Math.cos(i * 2) * 700, tx, ease.out(kk)), fy = lerp(ty + Math.sin(i * 3) * 400, ty, ease.out(kk)); if (kk <= 0) continue;
  rr(g, fx - sz / 2 + 6, fy - sz / 2 + 6, sz - 12, sz - 12, 14); g.fillStyle = fill ? alpha(ui().gold, 0.85) : '#3a2a30'; g.fill(); g.strokeStyle = fill ? ui().gold : ui().cream; g.lineWidth = 4; g.stroke();
  if (fill) text(g, '?', fx, fy + 4, { size: 70, color: '#2a1810', font: FONTS.title, weight: 700 }); } }
export function shuttle(g, x, y, k, t, boom) { const yy = y - 500 * ease.inOut(clamp(k)); g.strokeStyle = alpha('#f4efe6', 0.85); g.lineWidth = 30; g.lineCap = 'round';
  if (!boom) { g.beginPath(); g.moveTo(x, y + 200); g.lineTo(x, yy + 90); g.stroke(); poly(g, [[x - 26, yy + 80], [x - 26, yy - 80], [x, yy - 140], [x + 26, yy - 80], [x + 26, yy + 80]], '#f4efe6'); glow(g, x, yy + 100, 120, ui().gold, 0.8); }
  else { g.beginPath(); g.moveTo(x, y + 200); g.lineTo(x, y - 300); g.stroke(); const b = clamp(boom); for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(x, y - 300); g.quadraticCurveTo(x + sd * 200 * b, y - 450 * b, x + sd * 380 * b, y - 360 * b - 200 * b); g.stroke(); }
    glow(g, x, y - 320, 260 * b, ui().accent, 0.7); circle(g, x, y - 320, 90 * b, alpha('#f4efe6', 0.9)); } }
// a handwritten page; k = how much is written
export function page(g, x, y, s, k, title, col) { g.save(); g.translate(x, y); g.scale(s, s); g.rotate(-0.04); rr(g, -200, -260, 400, 520, 8); g.fillStyle = '#efe6d2'; g.fill();
  for (let i = 0; i < 9; i++) seg(g, [[-170, -170 + i * 50], [170, -170 + i * 50]], 2, alpha('#3a6ea5', 0.35));
  for (let i = 0; i < 8 * clamp(k); i++) { const w = 120 + ((i * 53) % 200); g.strokeStyle = col || '#2a2a50'; g.lineWidth = 5; g.beginPath(); for (let j = 0; j <= w; j += 12) g.lineTo(-165 + j, -180 + i * 50 + Math.sin(j * 0.3 + i) * 6); g.stroke(); }
  if (title) text(g, title, 0, -225, { size: 36, color: '#8a2a2a', font: FONTS.ui, weight: 900 }); g.restore(); }
export function book(g, x, y, s, title) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -170, -230, 340, 460, 14); g.fillStyle = '#7a2a22'; g.fill(); rr(g, -150, -230, 16, 460, 4); g.fillStyle = '#4a1612'; g.fill();
  text(g, title, 10, -40, { size: 50, color: ui().gold, font: FONTS.title, weight: 700 }); text(g, 'MEMORY · MISTAKES · FORGIVENESS', 10, 60, { size: 20, color: ui().cream, font: FONTS.ui, weight: 900 }); g.restore(); }
export function cabinet(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -150, -330, 300, 660, 10); g.fillStyle = '#5a5258'; g.fill(); for (let i = 0; i < 4; i++) { rr(g, -130, -310 + i * 160, 260, 140, 8); g.fillStyle = '#7a7278'; g.fill(); rr(g, -40, -250 + i * 160, 80, 18, 8); g.fillStyle = ui().cream; g.fill(); } g.restore(); }
export function photo(g, x, y, s, o, fade = 0, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); rr(g, -180, -200, 360, 400, 6); g.fillStyle = '#f4efe6'; g.fill(); rr(g, -160, -180, 320, 300, 4); g.fillStyle = '#3a4a5a'; g.fill();
  g.save(); g.beginPath(); g.rect(-160, -180, 320, 300); g.clip(); g.globalAlpha = 1 - fade; bigFace(g, 0, 60, 110, { outfit: CAST[o], expr: 'happy', rimColor: ui().gold }); g.restore();
  if (fade) { rr(g, -160, -180, 320, 300, 4); g.fillStyle = alpha('#c9b89a', fade * 0.85); g.fill(); } g.restore(); }
export function lock(g, x, y, s, open) { g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = ui().cream; g.lineWidth = 22; g.beginPath(); g.arc(0, -90 - 60 * clamp(open), 80, Math.PI, 0); g.lineTo(80, -90 + 0 - 60 * clamp(open)); g.stroke();
  rr(g, -120, -100, 240, 200, 24); g.fillStyle = ui().gold; g.fill(); circle(g, 0, -10, 22, '#2a1810'); g.restore(); }
