// shots/04_systems.js — p01..p17: Kahneman's two systems and the bat-and-ball problem.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, shake, seg, circle, ring, rr, poly, glow, alpha, shade, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { study, tableTop, bp, lowerThird } from '../sets/more.js';
import { voidStage } from '../sets/house.js';
import { KAHNEMAN, YOU, CON } from '../cast.js';
import { wt, pop, check, cross, orb, gutAt, onStage } from './_h.js';

const chalk = (g, str, x, y, k, size = 120) => { if (k > 0) text(g, str, x, y, { size, color: alpha('#efe8da', 0.85 * k), font: FONTS.title, weight: 700 }); };

// p01 — Kahneman at the chalkboard
registerShot('p01', { draw(g, t, info) {
  const cam = { z: 1.02 + 0.06 * ease.inOut(t / info.dur), x: -60 + 40 * ease.inOut(t / info.dur) };
  const tTwo = wt('two', info, 2.0);
  const { GY, M } = study(g, t, cam, { board: (g, x, y) => { chalk(g, '1', x - 150, y, ease.out(prog(t, tTwo - 0.2, tTwo + 0.3))); chalk(g, '2', x + 150, y, ease.out(prog(t, tTwo + 0.3, tTwo + 0.8)));
    if (t > tTwo + 0.8) seg(g, [[x, y - 90], [x, y + 90]], 6, alpha('#efe8da', 0.5)); } });
  layer(g, cam, 1, (g) => drawFigure(g, { x: E.W / 2 + 60, y: GY, s: V(1.45, 1.5), facing: -1, outfit: KAHNEMAN, pose: breathe(posesAt(t, [[0, POSES.stand], [tTwo - 0.4, POSES.point], [tTwo + 1.6, POSES.explain]]), t), expr: 'thinking', rim: { color: M.rim, dir: [1, -0.4], w: 5 } }));
  FX.dust(g, t, { count: 40, a: 0.35 });
  lowerThird(g, t, 'DANIEL KAHNEMAN', 'PSYCHOLOGIST · NOBEL LAUREATE', 0.6);
} });

// System 1 / System 2 board (shared by p02, p04)
function systems(g, t, info, which) {
  const { c, gold, cream } = bp(g); const L = E.W * 0.28, R = E.W * 0.72, y = E.H * 0.5;
  seg(g, [[E.W / 2, E.H * 0.15], [E.W / 2, E.H * 0.85]], 3, alpha(c, 0.4));
  const on1 = which === 1, a1 = on1 ? 1 : 0.35, a2 = on1 ? 0.25 : 1;
  // system 1: sprinting figure
  UI.lineFigure(g, { x: L, y: y + 120, s: 1.2, pose: walkPose(t * Math.PI * 2 * 1.6, { run: true }), color: alpha(gold, a1) });
  if (on1) FX.speedLines(g, t, { cx: L, cy: y, count: 24, a: 0.25 });
  text(g, 'SYSTEM 1', L, E.H * 0.2, { size: 64, color: alpha(gold, a1), font: FONTS.title, weight: 700, spacing: 6 });
  // system 2: slow walker with calculator
  UI.lineFigure(g, { x: R + (on1 ? 0 : -40 + t * 18), y: y + 120, s: 1.2, pose: walkPose(t * Math.PI * 2 * 0.35), color: alpha(c, a2) });
  rr(g, R + 30, y - 40, 54, 74, 8); g.strokeStyle = alpha(c, a2); g.lineWidth = 4; g.stroke(); for (let i = 0; i < 6; i++) circle(g, R + 44 + (i % 3) * 13, y - 4 + Math.floor(i / 3) * 18, 4, alpha(c, a2));
  text(g, 'SYSTEM 2', R, E.H * 0.2, { size: 64, color: alpha(c, a2 < 1 ? 0.35 : 1), font: FONTS.title, weight: 700, spacing: 6 });
  const words = which === 1 ? [['fast,', 'FAST'], ['automatic,', 'AUTOMATIC'], ['effortless.', 'EFFORTLESS']] : [['slow', 'SLOW'], ['deliberate.', 'DELIBERATE']];
  words.forEach(([w, s], i) => pop(g, t, s, which === 1 ? L : R, E.H * 0.74 + i * 62, wt(w, info, 0.6 + i * 0.7), { size: 46, color: which === 1 ? gold : cream }));
}
registerShot('p02', { draw(g, t, info) { systems(g, t, info, 1); } });
registerShot('p04', { draw(g, t, info) { systems(g, t, info, 2); } });

// p03 — the voice that just knows: the gut fires an instant check
registerShot('p03', { draw(g, t, info) {
  const x = E.W / 2 - 120, tk = wt('knows.', info, 1.0);
  onStage(g, t, info, [{ x, outfit: YOU, expr: t > tk ? 'smile' : 'neutral', pose: POSES.stand }], { after: (g, GY) => {
    const [gx, gy] = gutAt(x, GY, V(1.5, 1.6)); orb(g, gx, gy, 18, t, 1);
    const k = ease.out(prog(t, tk - 0.4, tk)); const px = lerp(gx, x + 330, k), py = lerp(gy, GY - 360, k);
    if (k > 0 && k < 1) { glow(g, px, py, 40, S().ui.gold, 0.8); }
    check(g, x + 330, GY - 360, 70, ease.outBack(prog(t, tk, tk + 0.35)));
  } });
} });

// p05 — the voice that does the math
registerShot('p05', { draw(g, t, info) {
  blurLayer(g, 14, (g) => voidStage(g, t, { z: 1.4, y: -140 }, {})); veil(g, '#05030a', 0.4);
  const M = mood('night'), r = V(290, 320) * (1 + 0.04 * t), cx = E.W / 2 + 140, cy = E.H * 0.6;
  ['2 + 2', '× 7', '÷ 3', '= ?', '√9', '1.10'].forEach((s, i) => { const a = t * 0.6 + i * 1.05; text(g, s, cx + Math.cos(a) * r * 1.6, cy - r * 0.2 + Math.sin(a) * r * 0.7, { size: 46, color: alpha(S().ui.cream, 0.6), font: FONTS.ui, weight: 900 }); });
  bigFace(g, cx, cy, r, { outfit: YOU, expr: 'thinking', look: [0.5, -0.5], rimColor: M.rim, rimSide: -1, blink: (t % 2.6) > 2.5 });
} });

// p06 — TRY THIS
registerShot('p06', { draw(g, t, info) { voidStage(g, t, { z: 1.05 + 0.05 * t }, {}); UI.bigLine(g, t, { str: 'TRY THIS', dur: info.dur + 0.4, y: E.H * 0.45, size: 120 }); } });

// ---- the bat and the ball (p07..p13) ----
function bat(g, x, y, s) { g.save(); g.translate(x, y); g.rotate(-0.12); g.scale(s, s); g.fillStyle = '#c99a5a'; g.beginPath(); g.moveTo(-260, -9); g.quadraticCurveTo(80, -14, 250, -26); g.arc(250, 0, 26, -Math.PI / 2, Math.PI / 2); g.quadraticCurveTo(80, 14, -260, 9); g.closePath(); g.fill(); rr(g, -290, -14, 60, 28, 10); g.fillStyle = '#2a1e18'; g.fill(); g.fillStyle = 'rgba(255,240,210,.3)'; g.fillRect(-220, -8, 420, 4); g.restore(); }
function ball(g, x, y, r) { circle(g, x, y, r, '#f2ece4'); g.strokeStyle = '#d64a33'; g.lineWidth = r * 0.07; g.beginPath(); g.arc(x - r * 1.25, y, r, -0.7, 0.7); g.stroke(); g.beginPath(); g.arc(x + r * 1.25, y, r, Math.PI - 0.7, Math.PI + 0.7); g.stroke(); circle(g, x - r * 0.35, y - r * 0.4, r * 0.25, 'rgba(255,255,255,.6)'); }
function tag(g, x, y, str, k, col, w = 230) { if (k <= 0) return; g.save(); g.translate(x, y); g.scale(k, k); seg(g, [[0, 0], [0, 50]], 3, alpha(S().ui.cream, 0.6)); rr(g, -w / 2, 50, w, 90, 14); g.fillStyle = 'rgba(16,10,14,.85)'; g.fill(); g.strokeStyle = col; g.lineWidth = 4; g.stroke(); text(g, str, 0, 97, { size: 52, color: col, font: FONTS.ui, weight: 900 }); g.restore(); }
function batBall(g, t, info, o = {}) {
  const cam = { z: (o.z ?? 1.0) + 0.05 * ease.inOut(t / info.dur), x: o.x ?? 0, y: o.y ?? 0 };
  const { GY } = tableTop(g, t, cam); const ui = S().ui;
  layer(g, cam, 1, (g) => { bat(g, E.W / 2 - 260, GY + 40, 1.1); ball(g, E.W / 2 + 330, GY + 20, 62); o.extra?.(g, GY, ui); });
  FX.dust(g, t, { count: 30, a: 0.3 });
  return { GY, ui };
}
const BX = E => E.W / 2 + 330;
registerShot('p07', { draw(g, t, info) { batBall(g, t, info, { extra: (g, GY, ui) => {
  pop(g, t, 'BAT + BALL', E.W / 2, E.H * 0.2, wt('bat', info, 0.3), { size: 60, color: ui.cream });
  tag(g, E.W / 2, E.H * 0.26, '$1.10 TOTAL', ease.outBack(prog(t, wt('dollar', info, 1.5) - 0.1, wt('dollar', info, 1.5) + 0.3)), ui.gold, 380); } }); } });
registerShot('p08', { draw(g, t, info) { batBall(g, t, info, { z: 1.08, x: 120, extra: (g, GY, ui) => {
  tag(g, E.W / 2 - 300, GY - 150, '$1.00 MORE', ease.outBack(prog(t, wt('more', info, 1.6) - 0.3, wt('more', info, 1.6) + 0.1)), ui.accent, 360); } }); } });
registerShot('p09', { draw(g, t, info) { batBall(g, t, info, { z: 1.5 + 0.2 * t, x: 330, y: 120, extra: (g, GY, ui) => tag(g, E.W / 2 + 330, GY - 210, '?', ease.outBack(prog(t, 0.1, 0.4)), ui.cream, 140) }); } });
registerShot('p10', { draw(g, t, info) { const tc = wt('cents,', info, 0.4); batBall(g, t, info, { z: 1.5, x: 330, y: 120, extra: (g, GY, ui) => {
  const k = ease.outBack(prog(t, tc - 0.1, tc + 0.25)); const [sx, sy] = t > tc ? shake(t, 6 * (1 - prog(t, tc, tc + 0.4)), 20) : [0, 0]; g.translate(sx, sy);
  tag(g, E.W / 2 + 330, GY - 210, '$0.10', k, ui.gold, 220); orb(g, E.W / 2 + 120, GY - 330, 16, t, ease.out(prog(t, 0.2, 0.6))); } }); } });
registerShot('p11', { draw(g, t, info) {
  blurLayer(g, 14, (g) => voidStage(g, t, { z: 1.4, y: -140 }, {})); veil(g, '#05030a', 0.35);
  const M = mood('night'); bigFace(g, E.W / 2 - 120, E.H * 0.6, V(300, 320) * (1 + 0.03 * t), { outfit: YOU, expr: 'smirk', look: [0.4, -0.1], rimColor: M.rim, rimSide: 1 });
  pop(g, t, 'OBVIOUS.', E.W * 0.74, E.H * 0.42, wt('obvious.', info, 0.5), { size: 70, color: S().ui.cream });
} });
registerShot('p12', { draw(g, t, info) { const tw = wt('wrong.', info, 0.3); const [sx, sy] = t > tw ? shake(t, 14 * (1 - prog(t, tw, tw + 0.7)), 24) : [0, 0];
  batBall(g, t, info, { z: 1.5, x: 330 + sx, y: 120 + sy, extra: (g, GY, ui) => { tag(g, E.W / 2 + 330, GY - 210, '$0.10', 1, ui.gold, 220);
    if (t > tw) { seg(g, [[E.W / 2 + 250, GY - 150], [E.W / 2 + 320, GY - 110], [E.W / 2 + 300, GY - 80], [E.W / 2 + 410, GY - 30]], 5, '#0a0608'); }
    cross(g, E.W / 2 + 330, GY - 115, 120, ease.out(prog(t, tw, tw + 0.35))); } }); } });
registerShot('p13', { draw(g, t, info) { const tf = wt('five', info, 0.5);
  batBall(g, t, info, { z: 1.0, extra: (g, GY, ui) => {
    tag(g, E.W / 2 + 330, GY - 210, '$0.05', ease.outBack(prog(t, tf - 0.1, tf + 0.3)), ui.gold, 220);
    tag(g, E.W / 2 - 300, GY - 190, '$1.05', ease.outBack(prog(t, tf + 0.5, tf + 0.8)), ui.cream, 220);
    pop(g, t, '0.05 + 1.05 = 1.10', E.W / 2, E.H * 0.16, tf + 1.0, { size: 58, color: ui.gold, font: FONTS.ui, spacing: 2 }); } }); } });

// p14 — that instant answer was your gut
registerShot('p14', { draw(g, t, info) {
  const x = E.W / 2 - 300, tg = wt('gut.', info, 2.0);
  onStage(g, t, info, [{ x, outfit: YOU, expr: 'neutral', pose: POSES.stand }], { after: (g, GY) => {
    const [gx, gy] = gutAt(x, GY, V(1.5, 1.6)); orb(g, gx, gy, 20, t, ease.out(prog(t, tg - 0.4, tg)));
    const k = ease.inOut(prog(t, 0.3, 1.4)); seg(g, [[gx + 40, gy], [lerp(gx + 40, E.W / 2 + 330, k), lerp(gy, E.H * 0.33, k)]], 4, alpha(S().ui.gold, 0.7));
    tag(g, E.W / 2 + 330, E.H * 0.2, '$0.10', ease.outBack(prog(t, 1.2, 1.5)), S().ui.gold, 220);
    pop(g, t, 'INSTANT', E.W / 2 + 330, E.H * 0.62, wt('instant', info, 0.6), { size: 56, color: S().ui.cream });
  } });
} });

// p15..p17 — Confident. Fast. And mistaken.  (the con artist delivers each word)
function con3(g, t, info, n) {
  const x = E.W / 2 + 330, M = mood('night');
  onStage(g, t, info, [{ x, facing: -1, outfit: CON, expr: n === 3 ? 'smirk' : 'smile', pose: n === 1 ? POSES.crossArms : n === 2 ? POSES.point : POSES.shrug }], { cam: { z: 1.1, x: 0 }, after: (g) => {
    const ui = S().ui, words = ['CONFIDENT.', 'FAST.', 'MISTAKEN.'];
    for (let i = 0; i < n; i++) { const at = i === n - 1 ? wt(['Confident.', 'Fast.', 'mistaken.'][i], info, 0.2) : -1;
      pop(g, t, words[i], E.W * 0.3, E.H * (0.3 + i * 0.17), at, { size: 84, color: i === 2 ? ui.accent : ui.gold }); }
    if (n === 2) FX.speedLines(g, t, { cx: E.W * 0.3, cy: E.H * 0.47, count: 30, a: 0.3 });
    if (n === 3) { const k = ease.outBack(prog(t, wt('mistaken.', info, 0.5), wt('mistaken.', info, 0.5) + 0.3)); if (k > 0) { g.save(); g.translate(E.W * 0.3, E.H * 0.64); g.rotate(-0.12); g.scale(k, k); rr(g, -260, -60, 520, 120, 12); g.strokeStyle = ui.accent; g.lineWidth = 8; g.stroke(); g.restore(); } }
  } });
}
registerShot('p15', { draw(g, t, info) { con3(g, t, info, 1); } });
registerShot('p16', { draw(g, t, info) { con3(g, t, info, 2); } });
registerShot('p17', { draw(g, t, info) { con3(g, t, info, 3); } });
