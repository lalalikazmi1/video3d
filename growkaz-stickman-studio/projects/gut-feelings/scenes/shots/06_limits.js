// shots/06_limits.js — p39..p63: where intuition fails, the twist, two questions, the outro.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, noise, shake, seg, circle, ring, rr, poly, glow, alpha, shade, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { stage, podium, school, bp, lowerThird } from '../sets/more.js';
import { voidStage } from '../sets/house.js';
import { LT, YOU, EXPERT, CON, PROPHET, STUDENT, KAHNEMAN, KLEIN, GENIUS, NURSE, CHESS } from '../cast.js';
import { wt, pop, check, cross, orb, gutAt, onStage } from './_h.js';
import { checklist } from './05_klein.js';

// p39 — stock market + world politics
registerShot('p39', { draw(g, t, info) {
  const { c, gold, acc, cream } = bp(g); const x0 = E.W * 0.08, x1 = E.W * 0.52, y0 = E.H * 0.5, ts = wt('stock', info, 0.9), tw = wt('world', info, 2.3);
  const k = ease.inOut(prog(t, ts - 0.2, ts + 1.8)); g.strokeStyle = acc; g.lineWidth = 5; g.beginPath();
  for (let i = 0; i <= 120 * k; i++) { const x = lerp(x0, x1, i / 120), y = y0 - noise(i * 0.12, 3) * 180 - noise(i * 0.5, 7) * 50; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  pop(g, t, 'STOCK MARKET', (x0 + x1) / 2, E.H * 0.8, ts, { size: 46, color: cream });
  const gx = E.W * 0.76, gy = E.H * 0.47, R = 190, kk = ease.outBack(prog(t, tw - 0.1, tw + 0.3)); if (kk > 0) { g.save(); g.translate(gx, gy); g.scale(kk, kk);
    ring(g, 0, 0, R, 5, c); for (let i = -2; i <= 2; i++) { g.beginPath(); g.ellipse(0, 0, R * Math.abs(Math.cos(t + i * 0.6)), R, 0, 0, 7); g.strokeStyle = alpha(c, 0.5); g.lineWidth = 3; g.stroke(); } for (const y of [-0.5, 0, 0.5]) seg(g, [[-R * Math.sqrt(1 - y * y), y * R], [R * Math.sqrt(1 - y * y), y * R]], 3, alpha(c, 0.5)); g.restore(); }
  pop(g, t, 'WORLD POLITICS', gx, E.H * 0.8, tw, { size: 46, color: cream });
  pop(g, t, '?', (x0 + x1) / 2, E.H * 0.2, ts + 1.4, { size: 110, color: gold });
} });
// p40 / p41 — the conditions fail
registerShot('p40', { draw(g, t, info) { const tw = wt('weak.', info, 0.9); checklist(g, t, info, { k1: 1, x: [ease.out(prog(t, tw - 0.1, tw + 0.35)), 0] }); pop(g, t, 'WEAK PATTERNS', E.W / 2, E.H * 0.82, tw, { size: 56, color: S().ui.accent }); } });
registerShot('p41', { draw(g, t, info) { const ts = wt('slow,', info, 0.7), tn = wt('never', info, 2.2); checklist(g, t, info, { k1: 1, k2: 1, x: [1, ease.out(prog(t, ts - 0.1, ts + 0.35))] });
  const ui = S().ui, cx = E.W * 0.5, cy = E.H * 0.8; ring(g, cx, cy, 70, 6, ui.cream); seg(g, [[cx, cy], [cx + Math.cos(t * 7) * 55, cy + Math.sin(t * 7) * 55]], 6, ui.gold); seg(g, [[cx, cy], [cx + Math.cos(t * 0.6) * 38, cy + Math.sin(t * 0.6) * 38]], 7, ui.cream);
  pop(g, t, 'SLOW…', cx - 260, cy, ts, { size: 46, color: ui.cream }); pop(g, t, '…OR NEVER', cx + 300, cy, tn, { size: 46, color: ui.accent }); } });

// p42 — Philip Tetlock, thousands of predictions
registerShot('p42', { draw(g, t, info) {
  const cam = { z: 1.04 + 0.05 * ease.inOut(t / info.dur) }; const { GY, M } = stage(g, t, cam); const s = V(1.25, 1.3), rim = { color: M.rim, dir: [0, -1], w: 4 }, ui = S().ui;
  layer(g, cam, 1, (g) => { [-500, 0, 500].forEach((dx, i) => { const x = E.W / 2 + dx; drawFigure(g, { x: x - 30, y: GY, s, facing: 1, outfit: EXPERT, pose: breathe(i === 1 ? POSES.point : POSES.explain, t, 1, i + 1), expr: 'smile', talk: (t * (2 + i)) % 1 < 0.5 ? 0.6 : 0, rim }); podium(g, x + 30, GY, M); }); });
  const tt = wt('thousands', info, 1.6); const n = Math.floor(80 * ease.inOut(prog(t, tt, info.dur - 0.5)));
  for (let i = 0; i < n; i++) { const x = E.W * 0.08 + (i % 20) * 88, y = E.H * 0.1 + Math.floor(i / 20) * 46; rr(g, x, y, 70, 36, 5); g.fillStyle = alpha('#f2ece4', 0.75); g.fill(); g.fillStyle = 'rgba(40,30,30,.5)'; g.fillRect(x + 8, y + 10, 50, 4); g.fillRect(x + 8, y + 20, 36, 4); }
  pop(g, t, 'THOUSANDS OF PREDICTIONS', E.W / 2, E.H * 0.33, tt, { size: 52, color: ui.gold });
  pop(g, t, 'NEARLY 2 DECADES', E.W / 2, E.H * 0.4, wt('decades.', info, 5.2), { size: 40, color: ui.cream });
  lowerThird(g, t, 'PHILIP TETLOCK', 'PSYCHOLOGIST · FORECASTING RESEARCH', 0.3);
} });

// p43 / p44 — scoreboard vs chance
function scoreboard(g, t, info, worse) {
  const { c, gold, acc, cream } = bp(g); const x0 = E.W * 0.2, base = E.H * 0.8, H = E.H * 0.55, chance = 0.5;
  const vals = [0.56, 0.52, 0.58, 0.5, 0.54]; const tb = worse ? wt('worse.', info, 2.6) : 0;
  vals.forEach((v, i) => { const x = x0 + i * 230; let vv = v * ease.out(prog(t, 0.2 + i * 0.12, 1.0 + i * 0.12)); let col = alpha(c, 0.85);
    if (worse && i === 2) { vv = lerp(v, 0.34, ease.inOut(prog(t, tb - 0.6, tb))); col = acc; }
    rr(g, x - 60, base - vv * H, 120, vv * H, 10); g.fillStyle = col; g.fill();
    if (worse && i === 2) { const bk = ease.outBack(prog(t, 0.6, 1.0)); if (bk > 0) { glow(g, x, base - vv * H - 70, 60, gold, 0.6 * bk); circle(g, x, base - vv * H - 70, 22 * bk, gold); } text(g, 'MOST SURE', x, base + 50, { size: 30, color: acc, font: FONTS.ui, weight: 900 }); }
    else text(g, 'EXPERT', x, base + 50, { size: 26, color: alpha(cream, 0.7), font: FONTS.ui, weight: 900 }); });
  g.setLineDash([16, 14]); seg(g, [[x0 - 120, base - chance * H], [x0 + 4 * 230 + 120, base - chance * H]], 4, gold); g.setLineDash([]);
  text(g, 'CHANCE', x0 + 4 * 230 + 140, base - chance * H, { size: 40, color: gold, font: FONTS.ui, weight: 900, align: 'left' });
}
registerShot('p43', { draw(g, t, info) { scoreboard(g, t, info, false); pop(g, t, 'LITTLE BETTER THAN CHANCE', E.W / 2, E.H * 0.13, wt('chance.', info, 1.6), { size: 54, color: S().ui.cream }); } });
registerShot('p44', { draw(g, t, info) { scoreboard(g, t, info, true); pop(g, t, 'MOST CONFIDENT → WORSE', E.W / 2, E.H * 0.13, wt('worse.', info, 2.6), { size: 54, color: S().ui.accent }); } });

// p45 — just as certain as the firefighter's
registerShot('p45', { draw(g, t, info) {
  const L = E.W / 2 - 360, R = E.W / 2 + 360, s = V(1.5, 1.6);
  onStage(g, t, info, [{ x: L, outfit: EXPERT, expr: 'smile', pose: POSES.crossArms }, { x: R, facing: -1, outfit: LT, expr: 'determined', pose: POSES.stand, seed: 3 }], { after: (g, GY) => {
    const a = ease.out(prog(t, 0.3, 0.8)); const [lx, ly] = gutAt(L, GY, s), [rx, ry] = gutAt(R, GY, s); orb(g, lx, ly, 22, t, a); orb(g, rx - 8 * s, ry, 22, t, a);
    pop(g, t, '=', E.W / 2, ly, wt('certain', info, 1.4), { size: 140, color: S().ui.gold }); } });
} });
// p46 — it just hadn't learned anything real
registerShot('p46', { draw(g, t, info) {
  const x = E.W / 2 - 200, s = V(1.5, 1.6), tr = wt('real.', info, 1.8);
  onStage(g, t, info, [{ x, outfit: EXPERT, expr: t > tr ? 'confused' : 'smile', pose: POSES.stand }], { after: (g, GY) => {
    const [gx, gy] = gutAt(x, GY, s); const flick = t > tr ? (Math.sin(t * 40) > 0 ? 0.3 : 0.9) * (1 - prog(t, tr + 0.3, tr + 0.9)) : 1; orb(g, gx, gy, 24, t, flick, true);
    pop(g, t, 'NOTHING LEARNED', E.W * 0.7, E.H * 0.42, wt('learned', info, 1.0), { size: 60, color: S().ui.cream }); } });
} });

// p47 — THE TWIST (flash)
registerShot('p47', { draw(g, t, info) { voidStage(g, t, { z: 1.1 - 0.05 * t }, {}); UI.bigLine(g, t, { str: 'THE TWIST', dur: info.dur + 0.4, y: E.H * 0.46, size: 130 }); } });
// p48 — freeze: two identical orbs, right vs wrong
registerShot('p48', { draw(g, t, info) {
  const cam = { z: 1.0 + 0.03 * t, r: -0.02 + 0.008 * t }; voidStage(g, 0, cam, { spots: [E.W * 0.3, E.W * 0.7] });
  FX.drops(g, t, { count: 50, color: '#ffd9b0', rMax: 8, drift: 2 });
  const ui = S().ui; orb(g, E.W * 0.3, E.H * 0.45, 80, 0, 1); orb(g, E.W * 0.7, E.H * 0.45, 80, 0, 1);
  pop(g, t, 'RIGHT', E.W * 0.3, E.H * 0.75, wt('right', info, 3.2), { size: 72, color: '#5fd17a' }); pop(g, t, 'WRONG', E.W * 0.7, E.H * 0.75, wt('wrong.', info, 4.0), { size: 72, color: ui.accent });
  pop(g, t, 'FEELS EXACTLY THE SAME', E.W / 2, E.H * 0.15, wt('same', info, 2.2), { size: 54, color: ui.cream });
  g.save(); g.globalCompositeOperation = 'soft-light'; g.fillStyle = 'rgba(80,120,255,.3)'; g.fillRect(0, 0, E.W, E.H); g.restore(); UI.badge(g, { str: 'FREEZE', a: ease.out(prog(t, 0.2, 0.6)) });
} });
// p49 — confidence is not evidence
registerShot('p49', { draw(g, t, info) { voidStage(g, t, { z: 1.03 + 0.03 * t }, {}); const ui = S().ui, tn = wt('not', info, 0.8);
  pop(g, t, 'CONFIDENCE', E.W * 0.27, E.H * 0.47, 0.05, { size: 92, color: ui.gold }); pop(g, t, '≠', E.W / 2, E.H * 0.47, tn, { size: 150, color: ui.accent }); pop(g, t, 'EVIDENCE', E.W * 0.74, E.H * 0.47, wt('evidence.', info, 1.2), { size: 92, color: ui.cream }); } });
// p50 — no warning label
registerShot('p50', { draw(g, t, info) { voidStage(g, t, { z: 1.05 }, {}); const ui = S().ui, cx = E.W / 2 - 150, cy = E.H * 0.47; orb(g, cx, cy, 90, t, 1);
  const sw = Math.sin(t * 2.4) * 0.15; g.save(); g.translate(cx + 90, cy - 40); g.rotate(0.4 + sw); seg(g, [[0, 0], [130, 0]], 3, ui.cream); rr(g, 130, -70, 260, 140, 14); g.fillStyle = '#f2ece4'; g.fill(); circle(g, 152, 0, 10, '#2a1e18');
  const tl = wt('label.', info, 1.6); text(g, '? ? ?', 260, 4, { size: 54, color: alpha('#3a2a2a', ease.out(prog(t, tl - 0.3, tl + 0.2))), font: FONTS.ui, weight: 900 }); g.restore();
  pop(g, t, 'NO WARNING LABEL', E.W / 2, E.H * 0.82, wt('warning', info, 1.2), { size: 56, color: ui.accent }); } });

// p51..p53 — two questions
function qCard(g, x, y, n, str, flip, t) { const k = ease.inOut(flip); const w = 560 * Math.abs(Math.cos(k * Math.PI)) + 1, front = k > 0.5; g.save(); g.translate(x, y);
  rr(g, -w / 2, -150, w, 300, 20); g.fillStyle = front ? '#f2ece4' : 'rgba(30,18,24,.95)'; g.fill(); g.strokeStyle = S().ui.gold; g.lineWidth = 5; g.stroke();
  if (w > 200) { if (front) { text(g, `Q${n}`, 0, -90, { size: 40, color: S().ui.accent, font: FONTS.ui, weight: 900 }); str.split('\n').forEach((l, i) => text(g, l, 0, -20 + i * 54, { size: 40, color: '#2a1e18', font: FONTS.ui, weight: 900 })); } else text(g, '?', 0, 0, { size: 140, color: S().ui.gold, font: FONTS.title, weight: 700 }); }
  g.restore(); }
const Q1 = 'HAVE I DONE THIS\nMANY TIMES BEFORE?', Q2 = 'DID I QUICKLY FIND\nOUT IF I WAS RIGHT?';
registerShot('p51', { draw(g, t, info) { const x = E.W * 0.17, tq = wt('questions.', info, 2.6);
  onStage(g, t, info, [{ x, outfit: YOU, expr: 'thinking', pose: POSES.think }], { spots: [x], after: () => { const k = ease.outBack(prog(t, tq - 0.2, tq + 0.3)); if (k > 0) { g.save(); g.translate(0, (1 - k) * 80); g.globalAlpha *= clamp(k); qCard(g, E.W * 0.47, E.H * 0.45, 1, Q1, 0, t); qCard(g, E.W * 0.8, E.H * 0.45, 2, Q2, 0, t); g.restore(); } } }); } });
registerShot('p52', { draw(g, t, info) { voidStage(g, t, { z: 1.02 }, {}); qCard(g, E.W * 0.32, E.H * 0.42, 1, Q1, prog(t, 0.05, 0.5), t); qCard(g, E.W * 0.72, E.H * 0.42, 2, Q2, 0, t);
  for (let i = 0; i < 10; i++) { const k = ease.out(prog(t, 0.8 + i * 0.1, 1.0 + i * 0.1)); circle(g, E.W * 0.13 + i * 44, E.H * 0.8, 12 * k, alpha(S().ui.gold, 0.85)); } text(g, 'MANY REPS', E.W * 0.32, E.H * 0.88, { size: 32, color: S().ui.cream, font: FONTS.ui, weight: 900, alpha: ease.out(prog(t, 1.2, 1.6)) }); } });
registerShot('p53', { draw(g, t, info) { voidStage(g, t, { z: 1.02 }, {}); qCard(g, E.W * 0.32, E.H * 0.42, 1, Q1, 1, t); qCard(g, E.W * 0.72, E.H * 0.42, 2, Q2, prog(t, 0.05, 0.5), t);
  const tq = wt('quickly', info, 0.6); if (t > tq) { const a = (t - tq) * 6, cx = E.W * 0.72, cy = E.H * 0.82; g.strokeStyle = S().ui.gold; g.lineWidth = 6; g.beginPath(); g.arc(cx, cy, 44, a, a + Math.PI * 1.5); g.stroke(); text(g, 'FAST FEEDBACK', cx + 80, cy, { size: 32, color: S().ui.cream, font: FONTS.ui, weight: 900, align: 'left' }); } } });

// p54 — yes: listen closely
registerShot('p54', { draw(g, t, info) { const x = E.W / 2 - 200, s = V(1.5, 1.6), ty = wt('yes,', info, 1.0), tl = wt('listen', info, 1.4);
  const lean = { ...POSES.think, hN: [6, -186] };
  onStage(g, t, info, [{ x, outfit: YOU, expr: t > tl ? 'smile' : 'thinking', pose: t > tl ? lean : POSES.stand }], { after: (g, GY) => { const [gx, gy] = gutAt(x, GY, s); orb(g, gx, gy, 22, t, 1);
    for (let i = 0; i < 3; i++) { const k = ((t * 1.2 + i / 3) % 1); ring(g, gx, gy, 30 + k * 160, 3, alpha(S().ui.gold, 0.5 * (1 - k))); }
    pop(g, t, 'YES', E.W * 0.7, E.H * 0.35, ty, { size: 100, color: '#5fd17a' }); check(g, E.W * 0.7, E.H * 0.55, 70, ease.outBack(prog(t, ty + 0.2, ty + 0.5))); pop(g, t, 'LISTEN CLOSELY', E.W * 0.7, E.H * 0.75, tl, { size: 46, color: S().ui.cream }); } }); } });
// p55 — no: slow down
registerShot('p55', { draw(g, t, info) { const tn = wt('no,', info, 0.5), ts = wt('slow', info, 1.0); const sp = 1 - ease.out(prog(t, ts - 0.2, ts + 0.8));
  const x = E.W * 0.2 + 260 * Math.min(t, ts + 0.8) * (0.5 + 0.5 * sp);
  onStage(g, t, info, [{ x, outfit: YOU, expr: 'worried', pose: sp > 0.05 ? walkPose(t * Math.PI * 2 * (0.4 + 1.2 * sp), { run: sp > 0.5 }) : POSES.stand }], { spots: [E.W * 0.45], after: () => {
    pop(g, t, 'NO', E.W * 0.75, E.H * 0.35, tn, { size: 100, color: S().ui.accent });
    const k = ease.outBack(prog(t, ts, ts + 0.3)); if (k > 0) { g.save(); g.translate(E.W * 0.75, E.H * 0.6); g.scale(k, k); const pts = []; for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; pts.push([Math.cos(a) * 90, Math.sin(a) * 90]); } poly(g, pts, S().ui.accent); text(g, 'SLOW', 0, 2, { size: 40, color: '#fff', font: FONTS.ui, weight: 900 }); g.restore(); } } }); } });
// p56 — let System Two check the math
registerShot('p56', { draw(g, t, info) { const { c, gold, cream } = bp(g); const tm = wt('math.', info, 1.4);
  UI.lineFigure(g, { x: E.W * 0.28, y: E.H * 0.75, s: 1.6, pose: POSES.holdFront, color: c }); rr(g, E.W * 0.28 + 50, E.H * 0.47, 70, 96, 10); g.strokeStyle = c; g.lineWidth = 5; g.stroke();
  text(g, 'SYSTEM 2', E.W * 0.28, E.H * 0.2, { size: 64, color: c, font: FONTS.title, weight: 700, spacing: 6 });
  ['$1.05', '+ $0.05', '= $1.10'].forEach((s, i) => pop(g, t, s, E.W * 0.68, E.H * (0.3 + i * 0.14), 0.3 + i * 0.4, { size: 70, color: i === 2 ? gold : cream, font: FONTS.ui, spacing: 2 }));
  check(g, E.W * 0.86, E.H * 0.58, 60, ease.outBack(prog(t, tm, tm + 0.35))); } });

// p57 / p58 — not a liar, not a prophet
function notThis(g, t, info, fig, word, at) { const x = E.W / 2 - 240; onStage(g, t, info, [{ x, ...fig }], { after: (g, GY) => {
  pop(g, t, word, E.W * 0.7, E.H * 0.45, 0.1, { size: 92, color: S().ui.cream }); cross(g, x, GY - 200, 200, ease.out(prog(t, at, at + 0.35))); } }); }
registerShot('p57', { draw(g, t, info) { notThis(g, t, info, { outfit: CON, expr: 'smirk', pose: POSES.crossArms }, 'LIAR', wt('liar.', info, 0.9)); } });
registerShot('p58', { draw(g, t, info) { notThis(g, t, info, { outfit: PROPHET, expr: 'smirk', pose: POSES.holdFront }, 'PROPHET', wt('prophet.', info, 0.7));
  glow(g, E.W / 2 - 160, E.H * 0.56, 90, '#9a7aff', 0.6); circle(g, E.W / 2 - 160, E.H * 0.56, 34, alpha('#c8b8ff', 0.85)); } });

// p59 / p60 — it's a student
function classroom(g, t, info, o) { const cam = { z: 1.05 + 0.05 * ease.inOut(t / info.dur), x: -20 };
  const { GY, M } = school(g, t, cam, { board: (g, x, y) => o.board?.(g, x, y) }); const x = E.W / 2 + 120, s = V(1.7, 1.8);
  layer(g, cam, 1, (g) => { rr(g, x + 20, GY - 120, 260, 18, 5); g.fillStyle = '#5a3a24'; g.fill(); seg(g, [[x + 40, GY - 110], [x + 40, GY]], 8, '#3a2618'); seg(g, [[x + 260, GY - 110], [x + 260, GY]], 8, '#3a2618');
    drawFigure(g, { x, y: GY, s, facing: 1, outfit: STUDENT, pose: breathe(POSES.sit, t), expr: o.expr || 'happy', rim: { color: M.rim, dir: [0, -1], w: 5 }, shadow: false });
    const [gx, gy] = gutAt(x, GY, s * 0.72); orb(g, gx, gy, 14, t, 0.9); o.desk?.(g, x, GY); });
  FX.dust(g, t, { count: 40, a: 0.35 }); }
registerShot('p59', { draw(g, t, info) { const ts = wt('student.', info, 0.8);
  classroom(g, t, info, { expr: 'joy', board: (g, x, y) => text(g, 'THE GUT', x, y, { size: 80, color: alpha('#efe8da', 0.85), font: FONTS.title, weight: 700 }) });
  pop(g, t, 'A STUDENT', E.W / 2, E.H * 0.1, ts, { size: 80, color: S().ui.gold }); } });
registerShot('p60', { draw(g, t, info) { const tt = wt('taught', info, 2.2);
  classroom(g, t, info, { expr: 'thinking', board: (g, x, y) => { ['PATTERNS', 'PRACTICE', 'FEEDBACK'].forEach((s, i) => text(g, s, x, y - 90 + i * 90, { size: 56, color: alpha('#efe8da', 0.85 * ease.out(prog(t, 0.3 + i * 0.5, 0.7 + i * 0.5))), font: FONTS.title, weight: 700 })); },
    desk: (g, x, GY) => { const n = Math.floor(clamp(t / (info.dur - 0.5)) * 6); for (let i = 0; i < n; i++) { rr(g, x + 170, GY - 150 - i * 24, 110, 22, 4); g.fillStyle = ['#8a3a2a', '#3a5a6a', '#6a5a2a'][i % 3]; g.fill(); } } });
  pop(g, t, 'ONLY WHAT YOU TEACH IT', E.W / 2, E.H * 0.1, tt, { size: 50, color: S().ui.cream }); } });

// p61..p63 — end screen
const CAST = [LT, KAHNEMAN, KLEIN, YOU, GENIUS, CON, NURSE, CHESS];
const endBg = () => { const M = mood('night'); return [shade(M.dark, -0.4), shade(M.wall, -0.4), shade(M.wall, -0.2)]; };
registerShot('p61', { draw(g, t, info) { const M = mood('night'), ui = S().ui; g.fillStyle = M.dark; g.fillRect(0, 0, E.W, E.H); voidStage(g, t, { z: 1.0 + 0.04 * t }, {});
  const a1 = ease.out(prog(t, 0.2, 0.8)), a2 = ease.out(prog(t, wt('fooled', info, 2.4) - 0.3, wt('fooled', info, 2.4) + 0.2));
  text(g, 'When has your gut been right…', E.W / 2, E.H * 0.38, { size: 76, font: FONTS.serif, weight: 900, italic: true, color: ui.cream, alpha: a1, glow: 18, glowColor: alpha(ui.gold, 0.5) });
  text(g, '…and when has it fooled you?', E.W / 2, E.H * 0.52, { size: 76, font: FONTS.serif, weight: 900, italic: true, color: ui.gold, alpha: a2, glow: 18, glowColor: alpha(ui.gold, 0.5) });
  orb(g, E.W / 2, E.H * 0.75, 30, t, a1); } });
registerShot('p62', { draw(g, t, info) { voidStage(g, t, { z: 1.0 }, {}); const ui = S().ui, k = ease.outBack(prog(t, 0.1, 0.45));
  g.save(); g.translate(E.W / 2, E.H * 0.45); g.scale(k * 2.4, k * 2.4); UI.bubble(g, 0, 0, { w: 160, h: 90 }); g.restore();
  pop(g, t, 'TELL ME IN THE COMMENTS', E.W / 2, E.H * 0.75, 0.3, { size: 64, color: ui.cream }); } });
registerShot('p63', { draw(g, t, info) { UI.endScreen(g, t, { question: 'Your gut is a student.', cast: CAST, moodColors: endBg(), rim: S().ui.gold }); } });
