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

// ---- Memory video ----
const JEN = { top: 'tshirt', color: '#3f9e9a', head: 'ponytail', headColor: '#c99a5a' };
const RON = { top: 'jersey', color: '#d6a03a', head: 'cap', headColor: '#2a2a30' };
function brainT(g, x, y, r, col) { glow(g, x, y, r * 2.2, col, 0.5); g.strokeStyle = col; g.lineWidth = r * 0.09; g.lineCap = 'round'; g.beginPath();
  for (let i = 0; i <= 160; i++) { const th = i / 160 * Math.PI * 2, k = 1 + 0.07 * Math.sin(th * 9), px = x + Math.cos(th) * r * 1.15 * k, py = y + Math.sin(th) * r * 0.82 * k; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.closePath(); g.stroke();
  g.beginPath(); g.moveTo(x, y - r * 0.75); g.bezierCurveTo(x + r * 0.15, y - r * 0.3, x - r * 0.2, y, x, y + r * 0.35); g.stroke(); }
// J — shocked YOU, brain with a crack, YOUR MEMORY IS LYING
registerShot('J', { draw(g) {
  const ui = S().ui; g.fillStyle = radGrad(g, E.W * 0.7, E.H * 0.45, 0, 1100, ['#3a1418', '#140a0e', '#050305']); g.fillRect(0, 0, E.W, E.H);
  FX.stars(g, 0, { count: 60, area: [0, 0, E.W, E.H] });
  brainT(g, E.W * 0.74, E.H * 0.56, 230, ui.gold);
  seg(g, [[E.W * 0.70, E.H * 0.3], [E.W * 0.76, E.H * 0.45], [E.W * 0.71, E.H * 0.55], [E.W * 0.78, E.H * 0.68], [E.W * 0.74, E.H * 0.8]], 18, ui.accent); glow(g, E.W * 0.74, E.H * 0.55, 300, ui.accent, 0.35);
  bigFace(g, E.W * 0.24, E.H * 0.8, 330, { outfit: YOU, expr: 'shocked', look: [0.8, -0.3], rimColor: ui.gold, rimSide: 1 });
  bigText(g, 'YOUR MEMORY', E.W / 2, E.H * 0.13, 150, '#fff4d6', { align: 'center' });
  bigText(g, 'IS LYING', E.W * 0.74, E.H * 0.92, 140, ui.accent, { align: 'center' });
} });
// K — lineup: the wrong man circled, 100% SURE / WRONG
function mugT(g, x, y, s, o, expr) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -110, -140, 220, 280, 10); g.fillStyle = '#d8d0c0'; g.fill(); rr(g, -96, -126, 192, 220, 6); g.fillStyle = '#3a3238'; g.fill();
  g.save(); g.beginPath(); g.rect(-96, -126, 192, 220); g.clip(); bigFace(g, 0, 40, 80, { outfit: o, expr, rimColor: S().ui.gold }); g.restore(); g.restore(); }
registerShot('K', { draw(g) {
  const ui = S().ui; g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#1a0c10', '#0a0508']); g.fillRect(0, 0, E.W, E.H);
  for (let i = 0; i < 6; i++) seg(g, [[0, E.H * (0.25 + i * 0.1)], [E.W, E.H * (0.25 + i * 0.1)]], 3, alpha(ui.cream, 0.15));
  const os = [{ top: 'tshirt', color: '#3a6ea5', head: 'spiky' }, RON, { top: 'suit', color: '#2e3a4a', color2: '#c99a5a', head: 'curly' }];
  os.forEach((o, i) => mugT(g, E.W * (0.2 + i * 0.3), E.H * 0.58, 1.5, o, o === RON ? 'scared' : 'neutral'));
  ring(g, E.W * 0.5, E.H * 0.56, 290, 16, ui.accent); glow(g, E.W * 0.5, E.H * 0.56, 400, ui.accent, 0.3);
  bigText(g, '100% SURE', E.W / 2, E.H * 0.13, 170, '#fff4d6', { align: 'center' });
  bigText(g, '...AND WRONG', E.W / 2, E.H * 0.92, 130, ui.accent, { align: 'center' });
} });

// ---- Scrolling video ----
function phoneT(g, x, y, w, h, ang) { const ui = S().ui; g.save(); g.translate(x, y); g.rotate(ang || 0);
  glow(g, 0, 0, w * 1.6, '#9fd8ff', 0.45); rr(g, -w / 2, -h / 2, w, h, w * 0.14); g.fillStyle = '#0c0a10'; g.fill(); g.lineWidth = 10; g.strokeStyle = '#2a2630'; g.stroke();
  rr(g, -w / 2 + 16, -h / 2 + 30, w - 32, h - 60, w * 0.08); g.fillStyle = '#1b2433'; g.fill(); g.restore(); }
function feedT(g, x, y, w, h, ang) { const ui = S().ui; g.save(); g.translate(x, y); g.rotate(ang || 0);
  const cw = w - 60; for (let i = 0; i < 3; i++) { const cy = -h / 2 + 60 + i * (h - 100) / 3; rr(g, -cw / 2, cy, cw, (h - 140) / 3, 14); g.fillStyle = ['#c84a3a', '#d6a03a', '#3a8fd6'][i]; g.fill();
    heart(g, cw / 2 - 40, cy + (h - 140) / 3 - 34, 26, '#fff4d6'); }
  g.restore(); }
// L — exhausted YOU lit by a giant phone, 1:00 AM
registerShot('L', { draw(g) {
  const ui = S().ui; g.fillStyle = radGrad(g, E.W * 0.68, E.H * 0.5, 0, 1100, ['#1a2433', '#0a0c14', '#030305']); g.fillRect(0, 0, E.W, E.H);
  phoneT(g, E.W * 0.72, E.H * 0.56, 420, 760, 0.12); feedT(g, E.W * 0.72, E.H * 0.56, 388, 700, 0.12);
  seg(g, [[E.W * 0.9, E.H * 0.42], [E.W * 0.9, E.H * 0.72]], 12, ui.gold); seg(g, [[E.W * 0.88, E.H * 0.46], [E.W * 0.9, E.H * 0.42], [E.W * 0.92, E.H * 0.46]], 12, ui.gold);
  bigFace(g, E.W * 0.25, E.H * 0.82, 330, { outfit: YOU, expr: 'shocked', look: [1, 0.1], rimColor: '#9fd8ff', rimSide: 1 });
  text(g, '1:00 AM', E.W * 0.25, E.H * 0.33, { size: 96, color: ui.accent, font: FONTS.ui, weight: 900, stroke: 12, strokeColor: '#0a0508' });
  bigText(g, "YOU CAN'T STOP", E.W / 2, E.H * 0.13, 150, '#fff4d6', { align: 'center' });
} });
// M — phone as slot machine: three hearts, lever, IT'S A SLOT MACHINE
registerShot('M', { draw(g) {
  const ui = S().ui; g.fillStyle = radGrad(g, E.W / 2, E.H * 0.55, 0, 1100, ['#3a1418', '#140a0e', '#050305']); g.fillRect(0, 0, E.W, E.H);
  FX.stars(g, 0, { count: 60, area: [0, 0, E.W, E.H] });
  phoneT(g, E.W * 0.45, E.H * 0.6, 900, 470, 0);
  for (let i = 0; i < 3; i++) { const cx = E.W * 0.45 + (i - 1) * 270; rr(g, cx - 115, E.H * 0.6 - 160, 230, 320, 16); g.fillStyle = '#fff4d6'; g.fill();
    if (i < 2) heart(g, cx, E.H * 0.6 + 20, 110, ui.accent); else { text(g, '?', cx, E.H * 0.6 + 70, { size: 230, color: '#2a1a14', font: FONTS.ui, weight: 900 }); } }
  seg(g, [[E.W * 0.45 + 470, E.H * 0.62], [E.W * 0.45 + 560, E.H * 0.62], [E.W * 0.45 + 560, E.H * 0.34]], 22, '#8a8a92'); circle(g, E.W * 0.45 + 560, E.H * 0.32, 44, ui.accent);
  bigFace(g, E.W * 0.89, E.H * 0.93, 240, { outfit: YOU, expr: 'surprised', look: [-1, -0.3], rimColor: ui.gold, rimSide: -1 });
  bigText(g, 'YOUR PHONE IS A', E.W / 2, E.H * 0.11, 120, '#fff4d6', { align: 'center' });
  bigText(g, 'SLOT MACHINE', E.W * 0.45, E.H * 0.95, 140, ui.accent, { align: 'center' });
} });

// ---- Embarrassing-moments video ----
function shirtT(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s);
  poly(g, [[-150, -200], [-60, -230], [-30, -205], [30, -205], [60, -230], [150, -200], [230, -110], [170, -60], [140, -100], [140, 210], [-140, 210], [-140, -100], [-170, -60], [-230, -110]], '#f2c21a');
  g.lineWidth = 8; g.strokeStyle = '#0a0508'; g.stroke();
  circle(g, 0, -10, 95, '#f0c8a0'); g.beginPath(); g.ellipse(0, -80, 120, 70, 0, Math.PI, 0); g.fillStyle = '#c98a3a'; g.fill(); for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(sx * 95, -20, 35, 80, 0, 0, Math.PI * 2); g.fill(); }
  for (const sx of [-1, 1]) { circle(g, sx * 32, -20, 10, '#2a1e18'); seg(g, [[sx * 50, -48], [sx * 16, -42]], 6, '#6a4a2a'); }
  g.beginPath(); g.arc(0, 15, 40, 0.15 * Math.PI, 0.85 * Math.PI); g.lineWidth = 9; g.strokeStyle = '#2a1e18'; g.stroke();
  text(g, 'MANILOW', 0, 150, { size: 52, color: '#d64a33', font: FONTS.title, weight: 700 }); g.restore(); }
function spotT(g, x, y, w) { g.save(); const gr = g.createLinearGradient(x, 0, x, y); gr.addColorStop(0, alpha('#fff3d6', 0.05)); gr.addColorStop(1, alpha('#fff3d6', 0.35));
  g.fillStyle = gr; g.beginPath(); g.moveTo(x - w * 0.15, 0); g.lineTo(x + w * 0.15, 0); g.lineTo(x + w / 2, y); g.lineTo(x - w / 2, y); g.closePath(); g.fill();
  g.beginPath(); g.ellipse(x, y, w / 2, w * 0.1, 0, 0, Math.PI * 2); g.fillStyle = alpha('#fff3d6', 0.35); g.fill(); g.restore(); }
// N — cringing YOU in bed at 2 AM, giant "2014" memory, WHY YOU STILL CRINGE
registerShot('N', { draw(g) {
  const ui = S().ui; g.fillStyle = radGrad(g, E.W * 0.7, E.H * 0.45, 0, 1100, ['#2a1420', '#100810', '#040305']); g.fillRect(0, 0, E.W, E.H);
  FX.stars(g, 0, { count: 60, area: [0, 0, E.W, E.H] });
  glow(g, E.W * 0.72, E.H * 0.52, 420, ui.accent, 0.45);
  text(g, '2014', E.W * 0.72, E.H * 0.66, { size: 380, color: ui.accent, font: FONTS.ui, weight: 900, stroke: 16, strokeColor: '#0a0508' });
  text(g, '"YOU TOO!"', E.W * 0.72, E.H * 0.82, { size: 90, color: '#fff4d6', font: FONTS.ui, weight: 900, stroke: 12, strokeColor: '#0a0508' });
  bigFace(g, E.W * 0.24, E.H * 0.84, 330, { outfit: YOU, expr: 'shocked', look: [1, -0.4], rimColor: ui.gold, rimSide: 1 });
  bigText(g, 'WHY YOU STILL CRINGE', E.W / 2, E.H * 0.13, 130, '#fff4d6', { align: 'center' });
} });
// O — Manilow shirt in a spotlight, tiny bored audience, NOBODY NOTICED
registerShot('O', { draw(g) {
  const ui = S().ui; g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#1a0c10', '#060406']); g.fillRect(0, 0, E.W, E.H);
  spotT(g, E.W * 0.36, E.H * 0.86, 820);
  shirtT(g, E.W * 0.36, E.H * 0.56, 1.45);
  for (let i = 0; i < 3; i++) bigFace(g, E.W * (0.69 + i * 0.12), E.H * 0.93, 150, { outfit: [JEN, RON, HER][i], expr: 'neutral', look: [1, 0], rimColor: ui.gold, rimSide: 1 });
  bigText(g, 'NOBODY', E.W * 0.81, E.H * 0.42, 150, '#fff4d6', { align: 'center' });
  bigText(g, 'NOTICED', E.W * 0.81, E.H * 0.62, 150, ui.accent, { align: 'center' });
} });
// P — huge cringing YOU in a spotlight, "EVERYONE SAW" crossed out, crowd looking away
registerShot('P', { draw(g) {
  const ui = S().ui; g.fillStyle = radGrad(g, E.W * 0.3, E.H * 0.6, 0, 1200, ['#3a1418', '#120609', '#030203']); g.fillRect(0, 0, E.W, E.H);
  spotT(g, E.W * 0.3, E.H * 0.98, 1000);
  bigFace(g, E.W * 0.28, E.H * 0.86, 400, { outfit: YOU, expr: 'shocked', look: [0.3, -0.2], rimColor: ui.gold, rimSide: 1 });
  glow(g, E.W * 0.28, E.H * 0.7, 380, '#ff3a2a', 0.35);
  for (let i = 0; i < 4; i++) bigFace(g, E.W * (0.63 + i * 0.105), E.H * 0.93, 115, { outfit: [JEN, RON, HER, YOU][i], expr: 'neutral', look: [1, 0.3], rimColor: ui.gold, rimSide: 1 });
  bigText(g, 'EVERYONE', E.W * 0.77, E.H * 0.2, 150, '#fff4d6', { align: 'center' });
  bigText(g, 'SAW IT', E.W * 0.77, E.H * 0.4, 150, '#fff4d6', { align: 'center' });
  seg(g, [[E.W * 0.56, E.H * 0.18], [E.W * 0.98, E.H * 0.18]], 22, ui.accent); seg(g, [[E.W * 0.63, E.H * 0.38], [E.W * 0.91, E.H * 0.38]], 22, ui.accent);
  g.save(); g.translate(E.W * 0.77, E.H * 0.6); g.rotate(-0.08); bigText(g, 'NOBODY DID', 0, 0, 120, ui.accent, { align: 'center' }); g.restore();
} });
const SHIRTY = { top: 'tshirt', color: '#f2c21a', head: 'spiky' };

// ---- Sunday dread video ----
function calT(g, x, y, s, day, col, sub) { g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -170, -190, 340, 380, 18); g.fillStyle = '#f4efe6'; g.fill(); rr(g, -170, -190, 340, 110, 18); g.fillStyle = col; g.fill(); g.fillRect(-170, -110, 340, 30);
  for (const sx of [-1, 1]) { rr(g, sx * 90 - 12, -215, 24, 60, 10); g.fillStyle = '#2a1e18'; g.fill(); }
  text(g, day, 0, -118, { size: Math.min(64, 400 / day.length), color: '#fff4d6', font: FONTS.title, weight: 700 });
  if (sub) text(g, sub, 0, 80, { size: 150, color: '#2a1e18', font: FONTS.title, weight: 700 }); g.restore(); }
function skyT(g) { const gr = g.createLinearGradient(0, 0, 0, E.H); gr.addColorStop(0, '#2a0e2a'); gr.addColorStop(0.6, '#a8341e'); gr.addColorStop(1, '#e8743a'); g.fillStyle = gr; g.fillRect(0, 0, E.W, E.H);
  glow(g, E.W * 0.25, E.H * 0.82, 400, '#ffb04a', 0.6); circle(g, E.W * 0.25, E.H * 0.82, 120, '#ffc45a');
  g.fillStyle = '#12060c'; g.beginPath(); g.moveTo(0, E.H * 0.86); g.quadraticCurveTo(E.W * 0.5, E.H * 0.8, E.W, E.H * 0.87); g.lineTo(E.W, E.H); g.lineTo(0, E.H); g.fill(); }
// Q — scared face, looming MONDAY calendar with glowing eyes, SUNDAY SCARIES
registerShot('Q', { draw(g) {
  const ui = S().ui; skyT(g);
  glow(g, E.W * 0.72, E.H * 0.55, 520, '#ff2a1a', 0.45);
  calT(g, E.W * 0.72, E.H * 0.58, 1.75, 'MONDAY', '#c8241a', '');
  for (const sx of [-1, 1]) { glow(g, E.W * 0.72 + sx * 90, E.H * 0.6, 70, '#ff3a2a', 0.8); circle(g, E.W * 0.72 + sx * 90, E.H * 0.6, 32, '#d01a10'); }
  for (let i = 0; i < 7; i++) poly(g, [[E.W * 0.72 - 150 + i * 43, E.H * 0.73], [E.W * 0.72 - 120 + i * 43, E.H * 0.73], [E.W * 0.72 - 135 + i * 43, E.H * 0.8]], '#2a1e18');
  bigFace(g, E.W * 0.22, E.H * 0.9, 330, { outfit: YOU, expr: 'shocked', look: [1, -0.3], rimColor: ui.gold, rimSide: 1 });
  bigText(g, 'THE SUNDAY SCARIES', E.W / 2, E.H * 0.12, 140, '#fff4d6', { align: 'center' });
} });
// R — tiny YOU on a sunset hill, giant shadow monster, IT'S NOT MONDAY
registerShot('R', { draw(g) {
  const ui = S().ui; skyT(g);
  g.save(); g.translate(E.W * 0.66, E.H * 0.86); g.scale(2.1, 2.1); g.beginPath(); g.moveTo(-220, 0);
  for (let i = 0; i <= 10; i++) g.lineTo(-220 + i * 44, -260 - 70 * Math.sin(i / 10 * Math.PI) + (i % 2) * 24); g.lineTo(220, 0); g.closePath(); g.fillStyle = '#1a0610'; g.fill();
  for (const sx of [-1, 1]) { glow(g, sx * 60, -180, 60, '#ff3a2a', 0.8); circle(g, sx * 60, -180, 18, '#ff4a2a'); }
  for (let i = 0; i < 6; i++) poly(g, [[-100 + i * 40, -120], [-80 + i * 40, -120], [-90 + i * 40, -90]], '#f4efe6'); g.restore();
  drawFigure(g, { x: E.W * 0.3, y: E.H * 0.86, s: 1.3, facing: 1, outfit: YOU, pose: POSES.handsOnHead, expr: 'scared', rim: { color: ui.gold, dir: [0, -1], w: 6 } });
  bigText(g, 'SUNDAY, 6 PM', E.W * 0.3, E.H * 0.14, 120, '#fff4d6', { align: 'center' });
  bigText(g, 'THE DREAD', E.W * 0.3, E.H * 0.3, 120, ui.accent, { align: 'center' });
} });
