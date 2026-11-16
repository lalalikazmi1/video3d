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
