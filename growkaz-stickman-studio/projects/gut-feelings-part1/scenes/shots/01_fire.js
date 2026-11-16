// shots/01_fire.js — s01..s09: the burning house, the feeling, the shout, the collapse.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, shake, talkAmount, wordTime, seg, circle, ring, rr, poly, glow, alpha, shade, mix, noise, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { houseExt, kitchen, flames, fireCols, houseGround } from '../sets/house.js';
import { LT, CREW } from '../cast.js';

const wt = (w, info, fb) => (wordTime(w, info.shot.start - 0.05) ?? info.shot.start + fb) - info.shot.start;
export const gutGlow = (g, x, y, r, a, t) => { const M = mood('night'), c = S().ui.gold; glow(g, x, y, r * (1 + 0.12 * Math.sin(t * 6)), c, a); circle(g, x, y, r * 0.12, alpha('#fff6d8', a)); };
// hose from a firefighter's hands to a target, with a water arc
function hose(g, x0, y0, x1, y1, t, s, a = 1) {
  seg(g, [[x0 - 120 * s, y0 + 90 * s], [x0, y0]], 12 * s, '#0e0b12');
  for (let i = 0; i < 26; i++) { const k = ((i / 26) + t * 1.8) % 1; const px = lerp(x0, x1, k), py = lerp(y0, y1, k) - Math.sin(k * Math.PI) * 120 * s;
    circle(g, px + noise(i + t * 9, 4) * 6, py, (5 + (i % 3) * 2) * s, alpha('#bfe4ff', 0.7 * a)); }
}

// s01 — wide exterior, the crew walks toward the house
registerShot('s01', { draw(g, t, info) {
  const cam = { z: 1 + 0.07 * ease.inOut(t / info.dur), x: 30 * ease.inOut(t / info.dur) };
  const { GY, M, hx } = houseExt(g, t, cam, {});
  const C = fireCols(M), s = V(1.0, 1.1), rim = { color: C.mid, dir: [1, -0.3], w: 4 };
  layer(g, cam, 1, (g) => {
    const base = E.W / 2 - V(520, 300) + t * 150 * s;
    [[0, LT, 0], [-130, CREW, 1.1], [-250, CREW, 2.3]].forEach(([dx, o, ph]) => {
      drawFigure(g, { x: base + dx * s, y: GY, s, facing: 1, outfit: o, pose: walkPose(t * Math.PI * 2 * 0.9 + ph), expr: o === LT ? 'determined' : 'neutral', rim, blink: (t % 3.1) > 3.0 });
    });
  });
  FX.dust(g, t, { count: 30, color: C.mid, a: 0.35 });
} });

// s02 — kitchen: the crew sprays the stove
registerShot('s02', { draw(g, t, info) {
  const cam = { z: 1.04, x: -40 + 50 * ease.inOut(t / info.dur) };
  const { GY, M, fx, C } = kitchen(g, t, cam, { fire: 1 });
  const s = V(1.45, 1.5), rim = { color: C.mid, dir: [1, -0.2], w: 5 };
  layer(g, cam, 1, (g) => {
    const xs = [E.W / 2 - 260, E.W / 2 - 420];
    xs.forEach((x, i) => { drawFigure(g, { x, y: GY, s, facing: 1, outfit: CREW, pose: breathe(POSES.holdFront, t, 1, i + 2), expr: 'determined', rim });
      hose(g, x + 50 * s, GY - 118 * s, fx - 20, GY - 240, t + i * 0.3, s * 0.8, ease.out(prog(t, 0.2, 0.6))); });
    drawFigure(g, { x: E.W / 2 - 600, y: GY, s, facing: 1, outfit: LT, pose: breathe(POSES.point, t, 1, 7), expr: 'determined', rim });
  });
  FX.drops(g, t, { count: 20, color: '#bfe4ff', rMax: 5, drift: 6 });
  blurLayer(g, 12, (g) => { g.fillStyle = shade(M.dark, -0.3); rr(g, -60, E.H - 260, 360, 320, 40); g.fill(); }, cam, 1.6);
} });

// s03 — insert: flames knocked down, then roar back
registerShot('s03', { draw(g, t, info) {
  const cam = { z: 1.9 + 0.12 * ease.inOut(t / info.dur), x: 470, y: -150 };
  const k = key(t, [[0, 0.9], [0.6, 0.35], [1.0, 0.3], [1.4, 1.25], [info.dur, 1.15]]);
  const { M, C } = kitchen(g, t, cam, { fire: k });
  if (t < 1.2) FX.drops(g, t, { count: 40, color: '#bfe4ff', rMax: 7, drift: 10 });
  if (t > 1.2) { const [sx, sy] = shake(t, 8 * (1 - prog(t, 1.2, 1.9)), 20); g.translate(sx, sy); FX.rings(g, E.W / 2, E.H * 0.5, t - 1.2, { count: 2, r0: 80, r1: 600, speed: 1.4, color: C.core, a: 0.4 }); }
  FX.dust(g, t, { count: 50, color: C.core, a: 0.5 });
} });

// s04 — giant face: something feels wrong
registerShot('s04', { draw(g, t, info) {
  blurLayer(g, 14, (g) => kitchen(g, t, { z: 1.5, x: 300, y: -120 }, {})); veil(g, '#0a0610', 0.4);
  const M = mood('night'), C = fireCols(M), r = V(300, 330) * (1 + 0.04 * t);
  const look = [Math.sin(t * 2.4) * 0.7, -0.1];
  bigFace(g, E.W / 2 - V(140, 0), E.H * V(0.62, 0.55), r, { outfit: LT, expr: t < 0.4 ? 'determined' : 'worried', look, rimColor: C.mid, rimSide: 1, blink: (t % 2.7) > 2.6 });
} });

// s05 — too hot: heat shimmer + gauge
function gauge(g, x, y, h, k, t) {
  const ui = S().ui; rr(g, x - 26, y - h, 52, h, 26); g.fillStyle = 'rgba(10,8,16,.75)'; g.fill(); ring(g, x, y + 20, 46, 4, alpha(ui.cream, 0.6));
  const col = mix(ui.gold, ui.accent, clamp(k)); circle(g, x, y + 20, 38, col); rr(g, x - 14, y - (h - 30) * k, 28, (h - 30) * k + 20, 14); g.fillStyle = col; g.fill(); glow(g, x, y - (h - 30) * k, 90, col, 0.6);
  for (let i = 1; i < 6; i++) seg(g, [[x + 30, y - i * h / 6], [x + 48, y - i * h / 6]], 3, alpha(ui.cream, 0.5));
}
registerShot('s05', { draw(g, t, info) {
  const cam = { z: 1.25 + 0.06 * ease.inOut(t / info.dur), x: -120, y: -80 };
  const { GY, M, C } = kitchen(g, t, cam, { fire: 1.1 });
  const s = V(1.7, 1.8), wipe = { ...POSES.stand, eF: [30, -160], hF: [6, -200] };
  layer(g, cam, 1, (g) => drawFigure(g, { x: E.W / 2 - 160, y: GY, s, facing: 1, outfit: LT, pose: breathe(posesAt(t, [[0, POSES.stand], [0.4, wipe]]), t), expr: 'worried', rim: { color: C.mid, dir: [1, -0.2], w: 5 } }));
  for (let i = 0; i < 6; i++) { const y = E.H * (0.2 + i * 0.12); g.strokeStyle = alpha(C.core, 0.12); g.lineWidth = 3; g.beginPath(); for (let x = 0; x <= E.W; x += 40) g.lineTo(x, y + Math.sin(x * 0.01 + t * 5 + i) * 12); g.stroke(); }
  const k = ease.inOut(prog(t, wt('hot', info, 0.9) - 0.6, wt('hot', info, 0.9) + 0.3));
  gauge(g, E.W - V(220, 160), E.H * V(0.72, 0.6), V(420, 520), 0.35 + 0.63 * k, t);
  UI.readout(g, { label: 'HEAT', value: k > 0.9 ? 'TOO HOT' : 'RISING', x: E.W - V(420, 330), y: E.H * V(0.22, 0.2), color: S().ui.accent, a: ease.out(prog(t, 0.3, 0.6)), align: 'right' });
} });

// s06 — too quiet: low flames, flat line
registerShot('s06', { draw(g, t, info) {
  const cam = { z: 1.0 + 0.03 * t, x: 20 };
  const { GY, M, C } = kitchen(g, t * 0.3, cam, { fire: 0.45 });
  const s = V(1.25, 1.3), rim = { color: C.mid, dir: [1, -0.2], w: 4 };
  layer(g, cam, 1, (g) => { [[-560, LT], [-360, CREW], [-200, CREW]].forEach(([dx, o], i) => drawFigure(g, { x: E.W / 2 + dx, y: GY, s, facing: 1, outfit: o, pose: POSES.stand, expr: o === LT ? 'worried' : 'neutral', rim, blink: false })); });
  veil(g, '#05030a', 0.25);
  const ui = S().ui, y = E.H * V(0.2, 0.25), x0 = E.W * 0.3, x1 = E.W * 0.7, p = ease.out(prog(t, 0.1, 0.7));
  g.strokeStyle = alpha(ui.cream, 0.8); g.lineWidth = 4; g.beginPath();
  for (let x = x0; x <= lerp(x0, x1, p); x += 6) { const amp = 34 * (1 - clamp((x - x0) / ((x1 - x0) * 0.35))); g.lineTo(x, y + Math.sin(x * 0.12) * amp); } g.stroke();
  text(g, 'SILENCE', E.W / 2, y + 70, { size: V(34, 40), color: alpha(ui.cream, 0.8), font: FONTS.ui, weight: 900, spacing: 6, alpha: ease.out(prog(t, 0.5, 0.9)) });
} });

// s07 — giant face: can't explain why — the gut glows
registerShot('s07', { draw(g, t, info) {
  blurLayer(g, 14, (g) => kitchen(g, t, { z: 1.5, x: 300, y: -120 }, {})); veil(g, '#0a0610', 0.45);
  const M = mood('night'), C = fireCols(M), r = V(280, 310) * (1 + 0.03 * t), cx = E.W / 2 + V(120, 0), cy = E.H * V(0.5, 0.45);
  const tYell = wt('yells', info, 1.7);
  gutGlow(g, cx, E.H * 1.05, V(380, 420), 0.45 * ease.out(prog(t, 0.4, 1.2)), t);
  bigFace(g, cx, cy, r, { outfit: LT, expr: t < tYell - 0.3 ? 'confused' : 'determined', look: [-0.3, 0.6 * (1 - prog(t, tYell - 0.6, tYell))], rimColor: C.mid, rimSide: 1, blink: (t % 2.4) > 2.3 });
} });

// s08 — "Everybody out!"
registerShot('s08', { draw(g, t, info) {
  const [sx, sy] = shake(t, 9 * (1 - prog(t, 0.1, 0.8)), 22);
  const cam = { z: 1.12 + 0.05 * ease.out(prog(t, 0, 0.5)), x: -260 + sx, y: -40 + sy };
  const { GY, M, C } = kitchen(g, t, cam, { fire: 1.15 });
  const s = V(1.6, 1.7), rim = { color: C.mid, dir: [1, -0.2], w: 5 };
  const s0 = info.shot.start, talk = talkAmount(info.globalT, wordTime('"Everybody', s0 - 0.3) ?? 14.52, 15.24);
  layer(g, cam, 1, (g) => {
    const lx = E.W / 2 - 120;
    drawFigure(g, { x: lx, y: GY, s, facing: -1, outfit: LT, pose: breathe(posesAt(t, [[0, POSES.stand], [0.15, POSES.point]]), t), expr: 'angry', talk, rim });
    FX.rings(g, lx - 10 * s, GY - 185 * s, t, { count: 3, r0: 40, r1: 260, speed: 1.6, color: '#fff3e0', a: 0.4 * clamp(talk * 3) });
    [[180, 0.4], [330, 0.65]].forEach(([dx, d], i) => { const run = t > d; const x = lx + dx * s - (run ? (t - d) * 420 : 0);
      drawFigure(g, { x, y: GY, s, facing: -1, outfit: CREW, pose: run ? walkPose((t - d) * Math.PI * 2 * 1.6, { run: true }) : POSES.holdFront, expr: run ? 'scared' : 'surprised', rim }); });
  });
  FX.dust(g, t, { count: 40, color: C.core, a: 0.45 });
} });

// s09 — the floor collapses behind them
registerShot('s09', { draw(g, t, info) {
  const tc = wt('collapses.', info, 2.3);
  const hit = prog(t, tc, tc + 0.15), [sx, sy] = t > tc ? shake(t, 16 * (1 - prog(t, tc, tc + 1.1)), 26) : [0, 0];
  const cam = { z: 1.0 + 0.04 * ease.inOut(t / info.dur), x: sx, y: sy };
  const { GY, M, C } = kitchen(g, t, cam, { fire: 1 });
  const s = V(1.15, 1.25), rim = { color: C.mid, dir: [1, -0.2], w: 4 };
  layer(g, cam, 0.85, (g) => {   // the door on the left, light from outside
    FX.door(g, { x: E.W / 2 - 860, y: GY, w: 150, h: 300, color: shade(M.wall, -0.6), open: 0.9, light: M.rim });
  });
  layer(g, cam, 1, (g) => {
    // collapse hole where they stood
    const hx = E.W / 2 - 100, hw = 560 * ease.out(hit);
    if (hw > 1) { g.fillStyle = '#05030a'; g.beginPath(); g.ellipse(hx, GY + 40, hw / 2, 60 * ease.out(hit), 0, 0, 7); g.fill();
      flames(g, hx, GY + 50, hw * 0.9, 420 * ease.out(prog(t, tc, tc + 0.5)), t, M, 1.2, 21);
      for (let i = 0; i < 10; i++) { const k2 = prog(t, tc, tc + 1.4), a = -1.2 - i * 0.12; const px = hx + Math.cos(a) * 300 * k2 * (i % 3 + 1) * 0.5, py = GY - Math.sin(-a) * 380 * k2 + 600 * k2 * k2; rr(g, px - 18, py - 7, 36, 14, 3); g.fillStyle = shade(M.floor, -0.2); g.fill(); } }
    [[0, LT], [-140, CREW], [-280, CREW]].forEach(([dx, o], i) => { const x = E.W / 2 - 160 + dx - t * 190 * s;
      drawFigure(g, { x, y: GY, s, facing: -1, outfit: o, pose: walkPose(t * Math.PI * 2 * 1.6 + i, { run: true }), expr: t > tc ? 'shocked' : 'scared', rim }); });
  });
  if (t > tc) FX.rings(g, E.W / 2 - 100, GY, t - tc, { count: 2, r0: 100, r1: 900, speed: 1.4, color: C.core, a: 0.4 * (1 - prog(t, tc, tc + 1)) });
  FX.dust(g, t, { count: 60, color: C.core, a: 0.4 });
} });
