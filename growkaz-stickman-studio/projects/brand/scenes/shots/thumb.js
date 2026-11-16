// YouTube thumbnails (1920x1080 render, exported 1280x720).
import { E, S, registerShot, mood, glow, circle, ring, seg, rr, poly, alpha, shade, mix, text, FONTS, radGrad, linGrad, blurLayer, veil } from '/engine/core.js';
import { bigFace, drawFigure, POSES } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { flames, kitchen, fireCols } from '../sets/house.js';

const LT = { top: 'turnout', legs: '#b8903a', head: 'firehelmet', headColor: '#f2c21a', color2: '#f2ece4' };
const YOU = { top: 'hoodie', color: '#d64a33', head: 'none' };
function bigText(g, str, x, y, size, col, o = {}) { text(g, str, x, y, { size, color: col, font: FONTS.title, weight: 700, stroke: size * 0.16, strokeColor: '#0a0508', align: o.align || 'left', glow: 26, glowColor: alpha(col, 0.55), spacing: 2 }); }
function orb(g, x, y, r, c) { glow(g, x, y, r * 3, c, 0.7); circle(g, x, y, r, c); circle(g, x - r * 0.3, y - r * 0.3, r * 0.3, 'rgba(255,255,255,.75)'); }

// D — the firefighter's shocked face, fire erupting, TRUST YOUR GUT?
registerShot('D', { draw(g) {
  const M = mood('night'), C = fireCols(M), ui = S().ui;
  blurLayer(g, 10, (g) => kitchen(g, 1.3, { z: 1.4, x: -380, y: -60 }, { fire: 1.3 })); veil(g, '#0a0508', 0.25);
  flames(g, E.W * 0.33, E.H + 40, 1300, 620, 2.1, M, 1.3, 31);
  glow(g, E.W * 0.3, E.H * 0.55, 700, C.mid, 0.35);
  bigFace(g, E.W * 0.3, E.H * 0.6, 360, { outfit: LT, expr: 'shocked', look: [0.5, 0], rimColor: C.core, rimSide: 1 });
  for (let i = 0; i < 3; i++) ring(g, E.W * 0.3, E.H * 0.6, 420 + i * 70, 7, alpha(ui.accent, 0.5 - i * 0.15));
  bigText(g, 'TRUST', E.W * 0.6, E.H * 0.27, 190, '#fff4d6');
  bigText(g, 'YOUR', E.W * 0.6, E.H * 0.5, 190, '#fff4d6');
  bigText(g, 'GUT?', E.W * 0.6, E.H * 0.74, 230, ui.gold);
} });

// E — split: right vs wrong orbs, worried YOU face, IS YOUR GUT LYING?
registerShot('E', { draw(g) {
  const M = mood('night'), ui = S().ui;
  g.fillStyle = linGrad(g, 0, 0, E.W, 0, ['#0e2a1a', '#120a10', '#3a0a0a']); g.fillRect(0, 0, E.W, E.H);
  glow(g, E.W * 0.2, E.H * 0.45, 600, '#3fd17a', 0.25); glow(g, E.W * 0.8, E.H * 0.45, 600, ui.accent, 0.3);
  FX.stars(g, 0, { count: 80, area: [0, 0, E.W, E.H] });
  orb(g, E.W * 0.13, E.H * 0.3, 80, ui.gold); orb(g, E.W * 0.87, E.H * 0.3, 80, ui.gold);
  bigText(g, '✓', E.W * 0.13, E.H * 0.56, 150, '#5fd17a', { align: 'center' }); bigText(g, '✗', E.W * 0.87, E.H * 0.56, 150, ui.accent, { align: 'center' });
  bigFace(g, E.W / 2, E.H * 0.78, 330, { outfit: YOU, expr: 'shocked', look: [0.6, -0.3], rimColor: ui.gold, rimSide: 1 });
  bigText(g, 'IS YOUR GUT', E.W / 2, E.H * 0.13, 150, '#fff4d6', { align: 'center' });
  bigText(g, 'LYING?', E.W / 2, E.H * 0.33, 170, ui.accent, { align: 'center' });
} });

// F — LOSING HURTS MORE: devastated face, scale crashing toward −$10
function scaleT(g, x, y, s, tilt) { const c = '#fff4d6'; g.save(); g.translate(x, y); g.scale(s, s); seg(g, [[0, 0], [0, -300]], 12, c); g.translate(0, -300); g.rotate(tilt); seg(g, [[-300, 0], [300, 0]], 12, c); circle(g, 0, 0, 18, S().ui.gold);
  for (const sd of [-1, 1]) { g.save(); g.translate(sd * 300, 0); g.rotate(-tilt); seg(g, [[-90, 120], [0, 0], [90, 120]], 5, c); rr(g, -120, 120, 240, 26, 12); g.fillStyle = sd < 0 ? '#5fd17a' : S().ui.accent; g.fill();
    text(g, sd < 0 ? '+$10' : '−$10', 0, sd < 0 ? 200 : 210, { size: sd < 0 ? 70 : 110, color: sd < 0 ? '#5fd17a' : S().ui.accent, font: FONTS.ui, weight: 900, stroke: 14, strokeColor: '#0a0508' }); g.restore(); }
  g.restore(); }
registerShot('F', { draw(g) {
  const ui = S().ui; g.fillStyle = linGrad(g, 0, 0, E.W, 0, ['#0c1a10', '#140a0e', '#4a0a0a']); g.fillRect(0, 0, E.W, E.H);
  glow(g, E.W * 0.72, E.H * 0.6, 700, ui.accent, 0.35); FX.stars(g, 0, { count: 60, area: [0, 0, E.W, E.H] });
  scaleT(g, E.W * 0.68, E.H * 0.84, 0.9, 0.38);
  bigFace(g, E.W * 0.22, E.H * 0.66, 330, { outfit: YOU, expr: 'cry', look: [0.6, 0.2], rimColor: ui.gold, rimSide: 1 });
  bigText(g, 'LOSING', E.W * 0.5, E.H * 0.14, 170, '#fff4d6', { align: 'center' });
  bigText(g, 'HURTS MORE', E.W * 0.5, E.H * 0.33, 150, ui.accent, { align: 'center' });
} });

// G — the bet: would you take it?
registerShot('G', { draw(g) {
  const ui = S().ui; g.fillStyle = radGrad(g, E.W * 0.5, E.H * 0.5, 0, 1100, ['#3a1a0a', '#120a0c', '#050305']); g.fillRect(0, 0, E.W, E.H);
  glow(g, E.W * 0.32, E.H * 0.52, 420, ui.gold, 0.6); circle(g, E.W * 0.32, E.H * 0.52, 230, shade(ui.gold, -0.15)); circle(g, E.W * 0.32, E.H * 0.52, 190, ui.gold); text(g, '$', E.W * 0.32, E.H * 0.53, { size: 260, color: shade(ui.gold, -0.45), font: FONTS.title, weight: 700 });
  bigText(g, '+$150', E.W * 0.6, E.H * 0.32, 170, '#5fd17a'); bigText(g, '−$100', E.W * 0.6, E.H * 0.6, 170, ui.accent);
  bigText(g, 'WOULD YOU TAKE IT?', E.W * 0.5, E.H * 0.88, 110, '#fff4d6', { align: 'center' });
} });

// ---- Proximity video ----
const HER = { top: 'dress', color: '#3a8fd6', head: 'bun' };
function heart(g, x, y, s, c) { glow(g, x, y, s * 2.2, c, 0.7); g.save(); g.translate(x, y); g.scale(s / 100, s / 100); g.beginPath();
  g.moveTo(0, 35); g.bezierCurveTo(-110, -40, -55, -120, 0, -60); g.bezierCurveTo(55, -120, 110, -40, 0, 35); g.closePath();
  g.fillStyle = c; g.fill(); g.lineWidth = 10; g.strokeStyle = '#0a0508'; g.stroke(); g.restore(); }
// H — two neighbours' faces, glowing heart between, distance arrow
registerShot('H', { draw(g) {
  const ui = S().ui; g.fillStyle = radGrad(g, E.W / 2, E.H * 0.6, 0, 1100, ['#3a1418', '#140a0e', '#050305']); g.fillRect(0, 0, E.W, E.H);
  FX.stars(g, 0, { count: 60, area: [0, 0, E.W, E.H] });
  bigFace(g, E.W * 0.2, E.H * 0.78, 300, { outfit: YOU, expr: 'smile', look: [1, -0.2], rimColor: ui.gold, rimSide: 1 });
  bigFace(g, E.W * 0.8, E.H * 0.78, 300, { outfit: HER, expr: 'smile', look: [-1, -0.2], rimColor: ui.gold, rimSide: -1 });
  heart(g, E.W / 2, E.H * 0.6, 150, ui.accent);
  seg(g, [[E.W * 0.36, E.H * 0.86], [E.W * 0.64, E.H * 0.86]], 8, '#fff4d6'); for (const sd of [-1, 1]) seg(g, [[E.W / 2 + sd * E.W * 0.14 - sd * 30, E.H * 0.86 - 25], [E.W / 2 + sd * E.W * 0.14, E.H * 0.86], [E.W / 2 + sd * E.W * 0.14 - sd * 30, E.H * 0.86 + 25]], 8, '#fff4d6');
  text(g, 'A FEW STEPS', E.W / 2, E.H * 0.93, { size: 56, color: ui.gold, font: FONTS.ui, weight: 900, stroke: 10, strokeColor: '#0a0508' });
  bigText(g, 'LOVE IS', E.W / 2, E.H * 0.13, 150, '#fff4d6', { align: 'center' });
  bigText(g, 'JUST DISTANCE?', E.W / 2, E.H * 0.31, 150, ui.accent, { align: 'center' });
} });
// I — apartment hallway: two facing doors, heart over the gap
function door(g, x, y, w, h, n, lit) { const ui = S().ui; rr(g, x - w / 2 - 14, y - h - 14, w + 28, h + 14, 10); g.fillStyle = '#2a1a14'; g.fill();
  rr(g, x - w / 2, y - h, w, h, 6); g.fillStyle = lit ? '#7a3a22' : '#4a2a1c'; g.fill(); circle(g, x + w * 0.32, y - h * 0.45, 12, ui.gold);
  text(g, n, x, y - h * 0.8, { size: 54, color: ui.gold, font: FONTS.ui, weight: 900 }); }
registerShot('I', { draw(g) {
  const ui = S().ui; g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#1a0e0c', '#2a1610', '#0a0506']); g.fillRect(0, 0, E.W, E.H);
  glow(g, E.W / 2, E.H * 0.1, 500, ui.gold, 0.35);
  door(g, E.W * 0.13, E.H * 0.98, 300, 640, '4A', true); door(g, E.W * 0.87, E.H * 0.98, 300, 640, '4B', true);
  heart(g, E.W / 2, E.H * 0.72, 130, ui.accent);
  bigText(g, 'THE ONE', E.W / 2, E.H * 0.15, 170, '#fff4d6', { align: 'center' });
  bigText(g, 'LIVES NEXT DOOR?', E.W / 2, E.H * 0.36, 130, ui.gold, { align: 'center' });
  bigFace(g, E.W * 0.32, E.H * 0.9, 220, { outfit: YOU, expr: 'surprised', look: [1, -0.3], rimColor: ui.gold, rimSide: 1 });
  bigFace(g, E.W * 0.68, E.H * 0.9, 220, { outfit: HER, expr: 'happy', look: [-1, -0.3], rimColor: ui.gold, rimSide: -1 });
} });
