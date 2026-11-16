// shots/05_klein.js — p18..p38: Gary Klein, stored patterns, the 2009 paper, the two conditions.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, noise, seg, circle, ring, rr, poly, glow, alpha, shade, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { study, firehouse, bp, lowerThird } from '../sets/more.js';
import { houseExt, kitchen, voidStage, fireCols, flames } from '../sets/house.js';
import { LT, KAHNEMAN, KLEIN, CHESS, NURSE, YOU } from '../cast.js';
import { wt, pop, check, cross, orb, gutAt, onStage } from './_h.js';
import { gutGlow } from './01_fire.js';

// p18 — so why was the firefighter's gut right?
registerShot('p18', { draw(g, t, info) {
  const cam = { z: 1.15 + 0.06 * ease.inOut(t / info.dur), x: -200 };
  const { GY, M } = houseExt(g, t, cam, { houseX: 320 }); const C = fireCols(M), s = V(1.3, 1.4), lx = E.W / 2 - 160;
  layer(g, cam, 1, (g) => { drawFigure(g, { x: lx, y: GY, s, facing: 1, outfit: LT, pose: breathe(POSES.stand, t), expr: 'thinking', rim: { color: C.mid, dir: [1, -0.3], w: 5 } });
    gutGlow(g, lx + 4 * s, GY - 110 * s, 150, 0.8, t); });
  pop(g, t, '?', lx + 60, E.H * 0.25, wt('right?', info, 1.6), { size: 160 });
} });

// p19 — Gary Klein interviews the lieutenant in the firehouse
registerShot('p19', { draw(g, t, info) {
  const cam = { z: 1.04 + 0.05 * ease.inOut(t / info.dur), x: 40 };
  const { GY, M } = firehouse(g, t, cam); const s = V(1.45, 1.5), rim = { color: M.rim, dir: [0, -1], w: 5 };
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: E.W / 2 - 260, y: GY, s, facing: 1, outfit: KLEIN, pose: breathe(POSES.holdFront, t), prop: 'paper', expr: 'thinking', rim });
    drawFigure(g, { x: E.W / 2 + 120, y: GY, s, facing: -1, outfit: LT, pose: breathe(posesAt(t, [[0, POSES.talk], [1.6, POSES.explain]]), t, 1, 3), expr: 'smile', talk: 0, rim, blink: (t % 2.8) > 2.7 });
  });
  FX.dust(g, t, { count: 40, a: 0.35 });
  lowerThird(g, t, 'GARY KLEIN', 'RESEARCH PSYCHOLOGIST', 0.4);
} });

// p20 — what he found was surprising
registerShot('p20', { draw(g, t, info) {
  blurLayer(g, 14, (g) => firehouse(g, t, { z: 1.5, x: 200, y: -140 })); veil(g, '#0a0610', 0.4);
  const M = mood('night'), ts = wt('surprising.', info, 1.4);
  bigFace(g, E.W / 2 - 120, E.H * 0.6, V(290, 320) * (1 + 0.03 * t), { outfit: KLEIN, expr: t > ts - 0.2 ? 'surprised' : 'thinking', rimColor: M.rim, rimSide: 1, blink: (t % 2.5) > 2.4 });
  if (t > ts) FX.sparkle(g, E.W / 2 + 220, E.H * 0.3, 40, S().ui.gold, 0.8 * (1 - prog(t, ts + 0.4, ts + 1.2)));
} });

// p21 — they weren't guessing (dice crossed out)
function die(g, x, y, s, n, rot) { g.save(); g.translate(x, y); g.rotate(rot); rr(g, -s, -s, s * 2, s * 2, s * 0.3); g.strokeStyle = UI.bpStroke(); g.lineWidth = 5; g.stroke(); const P = { 1: [[0, 0]], 3: [[-1, -1], [0, 0], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]] }[n]; P.forEach(([a, b]) => circle(g, a * s * 0.5, b * s * 0.5, s * 0.14, UI.bpStroke())); g.restore(); }
registerShot('p21', { draw(g, t, info) {
  const { cream } = bp(g), tg = wt('guessing.', info, 0.6);
  die(g, E.W / 2 - 110, E.H * 0.48, 80, 5, 0.3 + t * 0.6); die(g, E.W / 2 + 110, E.H * 0.52, 80, 3, -0.4 - t * 0.5);
  pop(g, t, 'GUESSING', E.W / 2, E.H * 0.22, 0.1, { size: 64, color: cream });
  cross(g, E.W / 2, E.H * 0.5, 220, ease.out(prog(t, tg - 0.1, tg + 0.35)));
} });

// fire icon for pattern diagrams
function fireIcon(g, x, y, s, col) { poly(g, [[x - s * 0.6, y + s * 0.6], [x - s * 0.7, y - s * 0.1], [x - s * 0.25, y + s * 0.1], [x - s * 0.1, y - s * 0.8], [x + s * 0.3, y - s * 0.1], [x + s * 0.5, y - s * 0.4], [x + s * 0.65, y + s * 0.6]], col); }
function brain(g, x, y, r, col) { g.strokeStyle = col; g.lineWidth = 6; for (const dx of [-0.36, 0.36]) { g.beginPath(); g.ellipse(x + dx * r, y, r * 0.48, r * 0.68, 0, 0, 7); g.stroke(); } seg(g, [[x - r * 0.6, y - r * 0.15], [x - r * 0.25, y + r * 0.1]], 5, col); seg(g, [[x + r * 0.6, y - r * 0.15], [x + r * 0.25, y + r * 0.1]], 5, col); }

// p22 — hundreds of fires stored as patterns
registerShot('p22', { draw(g, t, info) {
  const { c, gold, cream } = bp(g); const bx = E.W * 0.7, by = E.H * 0.5, R = 260;
  brain(g, bx, by, R, alpha(c, 0.9));
  const n = Math.floor(clamp(t / (info.dur - 1.2)) * 140);
  for (let i = 0; i < n; i++) { const a = i * 2.39996, rr2 = Math.sqrt(i / 140) * R * 0.95; const px = bx + Math.cos(a) * rr2 * 0.95, py = by + Math.sin(a) * rr2 * 0.68; fireIcon(g, px, py, 10, alpha(gold, 0.85)); }
  for (let i = 0; i < 6; i++) { const k = (t * 0.9 + i / 6) % 1; fireIcon(g, lerp(E.W * 0.12, bx - R, k), by + Math.sin(i * 2.1) * 160 * (1 - k), 22, alpha(gold, 1 - k * 0.6)); }
  pop(g, t, 'HUNDREDS', E.W * 0.2, E.H * 0.24, wt('hundreds', info, 2.2), { size: 96, color: gold });
  pop(g, t, 'OF FIRES', E.W * 0.2, E.H * 0.33, wt('fires,', info, 2.6), { size: 40, color: cream });
  pop(g, t, 'PATTERNS STORED', bx, E.H * 0.88, wt('patterns.', info, 5.0), { size: 46, color: cream });
  lowerThird(g, t, 'YEARS ON THE JOB', 'EXPERIENCE BUILDS PATTERNS', 0.4);
} });

// p23 — one icon doesn't fit: heat up, noise down
registerShot('p23', { draw(g, t, info) {
  const { c, gold, acc, cream } = bp(g); const th = wt('heat,', info, 1.4), tn = wt('noise,', info, 2.6);
  for (let i = 0; i < 24; i++) { const col = i % 6, row = Math.floor(i / 6), x = E.W * 0.18 + col * 120, y = E.H * 0.3 + row * 130; const odd = i === 14;
    const blink = odd && t > 0.5 && (t * 3) % 1 < 0.6; fireIcon(g, x, y, odd ? 30 : 24, odd ? (blink ? acc : alpha(acc, 0.4)) : alpha(gold, 0.6)); if (odd && t > 0.5) ring(g, x, y, 54, 4, alpha(acc, 0.8)); }
  const x0 = E.W * 0.72; pop(g, t, 'HEAT ▲', x0, E.H * 0.38, th, { size: 72, color: acc }); pop(g, t, 'NOISE ▼', x0, E.H * 0.58, tn, { size: 72, color: cream });
  if (t > tn + 0.3) { pop(g, t, "DOESN'T FIT", x0, E.H * 0.8, tn + 0.4, { size: 48, color: acc }); }
} });

// p24 — an alarm went off before they could put it into words
registerShot('p24', { draw(g, t, info) {
  blurLayer(g, 14, (g) => kitchen(g, t, { z: 1.5, x: 300, y: -120 }, {})); veil(g, '#0a0610', 0.45);
  const M = mood('night'), C = fireCols(M), cx = E.W / 2 - 80, cy = E.H * 0.58, r = V(290, 310) * (1 + 0.03 * t);
  const pulse = (t * 2.2) % 1; for (let i = 0; i < 3; i++) ring(g, cx, cy, r * (1.1 + ((pulse + i / 3) % 1) * 0.9), 8, alpha(S().ui.accent, 0.5 * (1 - ((pulse + i / 3) % 1))));
  bigFace(g, cx, cy, r, { outfit: LT, expr: 'shocked', rimColor: C.mid, rimSide: 1 });
  const on = (t * 4) % 1 < 0.5; circle(g, E.W * 0.82, E.H * 0.25, 46, on ? S().ui.accent : shade(S().ui.accent, -0.6)); glow(g, E.W * 0.82, E.H * 0.25, 220, S().ui.accent, on ? 0.6 : 0.1);
  pop(g, t, 'NO WORDS YET', E.W * 0.8, E.H * 0.8, wt('words.', info, 2.4), { size: 42, color: S().ui.cream });
} });

// p25 — that's not magic
registerShot('p25', { draw(g, t, info) {
  voidStage(g, t, { z: 1.05 }, {}); const ui = S().ui, tm = wt('magic.', info, 0.6);
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t; const fade = 1 - prog(t, tm, tm + 0.6); FX.sparkle(g, E.W / 2 + Math.cos(a) * 260, E.H * 0.45 + Math.sin(a) * 120, 24, ui.gold, 0.8 * fade); }
  pop(g, t, 'MAGIC', E.W / 2, E.H * 0.47, 0.05, { size: 120, color: ui.gold });
  cross(g, E.W / 2, E.H * 0.45, 200, ease.out(prog(t, tm, tm + 0.35)));
} });

// p26 — experience compressed into a feeling
registerShot('p26', { draw(g, t, info) {
  const { gold, cream } = bp(g); const cx = E.W / 2, cy = E.H * 0.48, k = ease.inOut(prog(t, 0.3, 1.8));
  for (let i = 0; i < 80; i++) { const a = i * 2.39996, d = (60 + Math.sqrt(i / 80) * 420) * (1 - k); fireIcon(g, cx + Math.cos(a) * d * 1.3, cy + Math.sin(a) * d * 0.7, 16 * (1 - k * 0.7), alpha(gold, 0.85)); }
  orb(g, cx, cy, 30 + 50 * k, t, k);
  pop(g, t, 'EXPERIENCE', cx, E.H * 0.18, wt('experience,', info, 0.2), { size: 64, color: cream });
  pop(g, t, '= A FEELING', cx, E.H * 0.82, wt('feeling.', info, 2.6), { size: 64, color: gold });
} });

// p27 — but here's where it gets strange
registerShot('p27', { draw(g, t, info) { voidStage(g, t, { z: 1.0 + 0.05 * t, r: 0.02 * Math.sin(t) }, {}); UI.bigLine(g, t - 0.2, { str: 'WHERE IT GETS STRANGE', dur: info.dur, y: E.H * 0.45, size: 92 }); } });

// p28 / p29 — skeptic vs believer
registerShot('p28', { draw(g, t, info) { const x = E.W / 2 - 300;
  onStage(g, t, info, [{ x, outfit: KAHNEMAN, expr: 'thinking', pose: POSES.crossArms }], { after: () => { pop(g, t, 'SKEPTIC', E.W * 0.68, E.H * 0.42, wt('skeptic', info, 1.0), { size: 96, color: S().ui.cream }); pop(g, t, 'OF INTUITION', E.W * 0.68, E.H * 0.54, wt('intuition.', info, 1.7), { size: 44, color: S().ui.gold }); } }); } });
registerShot('p29', { draw(g, t, info) { const x = E.W / 2 + 300;
  onStage(g, t, info, [{ x, facing: -1, outfit: KLEIN, expr: 'happy', pose: POSES.explain }], { after: () => pop(g, t, 'BELIEVER', E.W * 0.32, E.H * 0.45, wt('believer.', info, 0.6), { size: 96, color: S().ui.gold }) }); } });

// p30 — 2009: the paper together
function paper(g, x, y, s, glowA = 0) { g.save(); g.translate(x, y); g.scale(s, s); if (glowA) glow(g, 0, 0, 260, S().ui.gold, glowA); rr(g, -90, -120, 180, 240, 8); g.fillStyle = '#f2ece4'; g.fill(); for (let i = 0; i < 8; i++) { g.fillStyle = 'rgba(40,30,30,.35)'; g.fillRect(-66, -80 + i * 24, i === 0 ? 132 : 110 - (i % 3) * 18, 7); } g.restore(); }
registerShot('p30', { draw(g, t, info) {
  const cam = { z: 1.06 + 0.04 * ease.inOut(t / info.dur) }; const { GY, M } = study(g, t, cam, {}); const s = V(1.4, 1.45), rim = { color: M.rim, dir: [0, -1], w: 5 };
  const tt = wt('together,', info, 2.6);
  layer(g, cam, 1, (g) => {
    const tx = E.W / 2; rr(g, tx - 260, GY - 150, 520, 18, 6); g.fillStyle = shade(M.dark, -0.2); g.fill(); seg(g, [[tx - 220, GY - 140], [tx - 220, GY]], 10, shade(M.dark, -0.2)); seg(g, [[tx + 220, GY - 140], [tx + 220, GY]], 10, shade(M.dark, -0.2));
    drawFigure(g, { x: tx - 380, y: GY, s, facing: 1, outfit: KAHNEMAN, pose: breathe(posesAt(t, [[0, POSES.stand], [tt - 0.4, POSES.reach]]), t), expr: t > tt ? 'smile' : 'thinking', rim });
    drawFigure(g, { x: tx + 380, y: GY, s, facing: -1, outfit: KLEIN, pose: breathe(posesAt(t, [[0, POSES.stand], [tt - 0.4, POSES.reach]]), t, 1, 4), expr: t > tt ? 'smile' : 'thinking', rim });
    const k = ease.inOut(prog(t, tt - 0.6, tt + 0.4)); paper(g, lerp(tx - 180, tx - 40, k), GY - 175, 0.35); paper(g, lerp(tx + 180, tx + 40, k), GY - 175, 0.35);
  });
  UI.badge(g, { str: '2009', a: ease.out(prog(t, wt('2009,', info, 0.5), wt('2009,', info, 0.5) + 0.4)), size: V(60, 64) });
  pop(g, t, 'SETTLE THE ARGUMENT', E.W / 2, E.H * 0.18, wt('settle', info, 4.4), { size: 48, color: S().ui.cream });
} });

// p31 — their conclusion?
registerShot('p31', { draw(g, t, info) {
  blurLayer(g, 12, (g) => study(g, t, { z: 1.5, y: -100 }, {})); veil(g, '#0a0610', 0.45);
  paper(g, E.W / 2, E.H * 0.5, 1.6 + 0.1 * t, 0.4 + 0.3 * Math.sin(t * 4));
  text(g, 'CONDITIONS FOR', E.W / 2, E.H * 0.39, { size: 26, color: '#3a2a2a', font: FONTS.ui, weight: 900 }); text(g, 'INTUITIVE EXPERTISE', E.W / 2, E.H * 0.43, { size: 26, color: '#3a2a2a', font: FONTS.ui, weight: 900 });
} });

// shared checklist (p32..p34, p40, p41)
export function checklist(g, t, info, o = {}) {
  const { c, gold, acc, cream } = bp(g); const x0 = E.W * 0.14;
  text(g, 'TRUST YOUR GUT IF…', x0, E.H * 0.17, { size: 64, color: gold, font: FONTS.title, weight: 700, align: 'left', spacing: 3 });
  const items = [['REAL, REPEATING PATTERNS', o.k1 ?? 0], ['PRACTICE + QUICK, CLEAR FEEDBACK', o.k2 ?? 0]];
  items.forEach(([s, k], i) => { const y = E.H * (0.36 + i * 0.2); rr(g, x0, y - 40, 80, 80, 12); g.strokeStyle = alpha(c, 0.8); g.lineWidth = 5; g.stroke();
    text(g, `${i + 1}.  ${s}`, x0 + 120, y + 2, { size: 46, color: alpha(cream, k > 0 ? 1 : 0.35), font: FONTS.ui, weight: 900, align: 'left' });
    if (o.x?.[i]) cross(g, x0 + 40, y, 34, o.x[i]); else check(g, x0 + 40, y, 34, k); });
}
registerShot('p32', { draw(g, t, info) { checklist(g, t, info, {}); pop(g, t, 'TWO CONDITIONS', E.W / 2, E.H * 0.82, wt('two', info, 1.6), { size: 60, color: S().ui.gold }); } });
registerShot('p33', { draw(g, t, info) { checklist(g, t, info, { k1: ease.out(prog(t, wt('patterns.', info, 3.2), wt('patterns.', info, 3.2) + 0.4)) });
  const { gold } = { gold: S().ui.gold }; for (let i = 0; i < 9; i++) { const k = ease.out(prog(t, 0.6 + i * 0.25, 0.9 + i * 0.25)); fireIcon(g, E.W * 0.22 + i * 130, E.H * 0.8, 26 * k, alpha(gold, 0.8)); } } });
registerShot('p34', { draw(g, t, info) { const tr = wt('right.', info, 5.6); checklist(g, t, info, { k1: 1, k2: ease.out(prog(t, tr, tr + 0.4)) });
  const ui = S().ui, cx = E.W * 0.5, cy = E.H * 0.8; const tp = wt('practice,', info, 1.2), tf = wt('feedback', info, 3.4);
  for (let i = 0; i < 8; i++) { const k = ease.out(prog(t, tp + i * 0.12, tp + 0.3 + i * 0.12)); circle(g, E.W * 0.2 + i * 50, cy, 12 * k, alpha(ui.cream, 0.7)); }
  if (t > tf) { const a = (t - tf) * 4; g.strokeStyle = ui.gold; g.lineWidth = 6; g.beginPath(); g.arc(cx + 280, cy, 60, a, a + Math.PI * 1.5); g.stroke(); poly(g, [[cx + 280 + Math.cos(a + Math.PI * 1.5) * 60 - 14, cy + Math.sin(a + Math.PI * 1.5) * 60], [cx + 280 + Math.cos(a + Math.PI * 1.5) * 60 + 14, cy + Math.sin(a + Math.PI * 1.5) * 60], [cx + 280 + Math.cos(a + Math.PI * 1.6) * 60, cy + Math.sin(a + Math.PI * 1.6) * 60 + 18]], ui.gold); text(g, 'FEEDBACK', cx + 460, cy, { size: 40, color: ui.gold, font: FONTS.ui, weight: 900, align: 'left' }); }
} });

// p35..p37 — firefighters / chess players / nurses get both
function both(g, t, info, fig, extra) {
  const x = E.W / 2 - 200; onStage(g, t, info, [{ x, ...fig }], { after: (g, GY) => { extra?.(g, GY, x);
    const k1 = ease.outBack(prog(t, 0.4, 0.75)), k2 = ease.outBack(prog(t, 0.7, 1.05)); check(g, E.W * 0.68, E.H * 0.36, 60, k1); check(g, E.W * 0.8, E.H * 0.36, 60, k2);
    pop(g, t, 'PATTERNS', E.W * 0.68, E.H * 0.5, 0.5, { size: 30, color: S().ui.cream }); pop(g, t, 'FEEDBACK', E.W * 0.8, E.H * 0.5, 0.8, { size: 30, color: S().ui.cream }); } });
}
registerShot('p35', { draw(g, t, info) { both(g, t, info, { outfit: LT, expr: 'determined', pose: POSES.crossArms }); } });
registerShot('p36', { draw(g, t, info) { both(g, t, info, { outfit: CHESS, expr: 'thinking', pose: POSES.think }, (g, GY, x) => {
  const bx = x + 150, by = GY - 140; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { g.fillStyle = (i + j) % 2 ? '#f2ece4' : '#3a2a2a'; g.fillRect(bx + i * 30, by + j * 14, 30, 14); }
  seg(g, [[bx + 60, by + 56], [bx + 60, GY]], 8, '#16121a'); rr(g, bx + 40, by - 34, 20, 34, 6); g.fillStyle = '#f2ece4'; g.fill(); circle(g, bx + 50, by - 40, 10, '#f2ece4'); }); } });
registerShot('p37', { draw(g, t, info) { both(g, t, info, { outfit: NURSE, expr: 'smile', pose: POSES.holdFront, prop: 'tablet' }); } });

// p38 — but what about the rest of us?
registerShot('p38', { draw(g, t, info) { const x = E.W / 2;
  onStage(g, t, info, [{ x, outfit: YOU, expr: 'confused', pose: POSES.shrug }], { after: (g, GY) => pop(g, t, '?', x + 10, GY - 420, wt('us?', info, 1.2), { size: 160 }) }); } });
