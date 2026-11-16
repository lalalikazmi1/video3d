// shots/03_question.js — s13..s17: should YOU trust your gut? genius vs con artist.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, wordTime, seg, circle, ring, rr, poly, glow, alpha, shade, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { voidStage } from '../sets/house.js';
import { YOU, GENIUS, CON } from '../cast.js';
import { gutGlow } from './01_fire.js';

const wt = (w, info, fb) => (wordTime(w, info.shot.start - 0.05) ?? info.shot.start + fb) - info.shot.start;

// s13 — YOU under a spotlight, "TRUST YOUR GUT?"
registerShot('s13', { draw(g, t, info) {
  const cam = { z: 1.0 + 0.07 * ease.inOut(t / info.dur) };
  const { GY, M } = voidStage(g, t, cam, {});
  const s = V(1.5, 1.6), x = E.W / 2;
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x, y: GY, s, facing: 1, outfit: YOU, pose: breathe(posesAt(t, [[0, POSES.stand], [1.2, POSES.think]]), t), expr: 'thinking', rim: { color: M.rim, dir: [0, -1], w: 5 }, blink: (t % 3.1) > 3.0 });
    gutGlow(g, x + 4 * s, GY - 110 * s, 140, 0.8 * ease.out(prog(t, wt('trust', info, 1.6) - 0.1, wt('gut?', info, 2.1))), t);
  });
  UI.bigLine(g, t - 0.4, { str: 'TRUST YOUR GUT?', dur: info.dur - 0.3, y: E.H * V(0.2, 0.2) });
  FX.dust(g, t, { count: 30, a: 0.3 });
} });

// s14 — YOU, giant face: the uncomfortable truth
registerShot('s14', { draw(g, t, info) {
  blurLayer(g, 14, (g) => voidStage(g, t, { z: 1.4, y: -140 }, {})); veil(g, '#05030a', 0.45);
  const M = mood('night'), r = V(300, 330) * (1 + 0.05 * ease.inOut(t / info.dur));
  bigFace(g, E.W / 2 + V(110, 0), E.H * V(0.62, 0.56), r, { outfit: YOU, expr: t < 0.6 ? 'thinking' : 'worried', look: [-0.4, 0], rimColor: M.rim, rimSide: -1, blink: (t % 2.6) > 2.5 });
} });

// lightbulb icon
function bulb(g, x, y, r, a) { if (a <= 0) return; const gold = S().ui.gold; glow(g, x, y, r * 3.2, gold, 0.6 * a); circle(g, x, y, r, alpha('#fff4cf', a)); rr(g, x - r * 0.45, y + r * 0.8, r * 0.9, r * 0.6, 6); g.fillStyle = alpha('#b9b2a6', a); g.fill();
  for (let i = 0; i < 8; i++) { const an = i / 8 * Math.PI * 2; seg(g, [[x + Math.cos(an) * r * 1.5, y + Math.sin(an) * r * 1.5], [x + Math.cos(an) * r * 2.0, y + Math.sin(an) * r * 2.0]], 5, alpha(gold, a)); } }

// s15 — the genius
registerShot('s15', { draw(g, t, info) {
  const cam = { z: 1.08 + 0.06 * ease.inOut(t / info.dur), x: 30 - 30 * t };
  const { GY, M } = voidStage(g, t, cam, { spots: [E.W / 2 - 200] });
  const s = V(1.7, 1.75), x = E.W / 2 - 200, tg = wt('genius.', info, 1.8);
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x, y: GY, s, facing: 1, outfit: GENIUS, pose: breathe(posesAt(t, [[0, POSES.think], [tg - 0.1, POSES.pointUp]]), t), expr: t > tg ? 'joy' : 'thinking', rim: { color: M.key, dir: [0, -1], w: 5 } });
    bulb(g, x + 60 * s, GY - 290 * s, 34, ease.outBack(prog(t, tg - 0.1, tg + 0.3)));
  });
  if (t > tg) FX.sparkle(g, x + 60 * s, GY - 290 * s, 40, '#fff4cf', 0.8 * (1 - prog(t, tg + 0.4, tg + 1.2)));
  text(g, 'GENIUS', E.W / 2 + V(360, 0), E.H * V(0.42, 0.25), { size: V(80, 84), color: S().ui.gold, font: FONTS.title, weight: 700, spacing: 6, glow: 18, glowColor: alpha(S().ui.gold, 0.6), alpha: ease.out(prog(t, tg, tg + 0.35)) });
  FX.dust(g, t, { count: 30, a: 0.3 });
} });

// s16 — the con artist
registerShot('s16', { draw(g, t, info) {
  const cam = { z: 1.08 + 0.06 * ease.inOut(t / info.dur), x: -30 + 30 * t, r: -0.015 };
  const { GY, M } = voidStage(g, t, cam, { spots: [E.W / 2 + 220] });
  const s = V(1.7, 1.75), x = E.W / 2 + 220, tc = wt('con', info, 1.45), ui = S().ui;
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x, y: GY, s, facing: -1, outfit: CON, pose: breathe(posesAt(t, [[0, POSES.crossArms], [tc - 0.2, POSES.holdFront]]), t), expr: 'smirk', rim: { color: M.rim, dir: [1, -0.4], w: 4 } });
    // a flicked playing card
    if (t > tc - 0.2) { const k = ease.out(prog(t, tc - 0.2, tc + 0.5)); g.save(); g.translate(x - 60 * s - k * 260, GY - 130 * s - k * 120); g.rotate(-0.6 + k * 2.4);
      rr(g, -34, -48, 68, 96, 8); g.fillStyle = '#f4efe6'; g.fill(); circle(g, 0, 0, 16, ui.accent); g.restore(); }
  });
  veil(g, '#05030a', 0.15);
  text(g, 'CON ARTIST', E.W / 2 - V(380, 0), E.H * V(0.42, 0.25), { size: V(80, 84), color: ui.accent, font: FONTS.title, weight: 700, spacing: 6, glow: 18, glowColor: alpha(ui.accent, 0.6), alpha: ease.out(prog(t, tc, tc + 0.35)) });
  FX.dust(g, t, { count: 30, a: 0.3 });
} });

// s17 — which one is talking?
registerShot('s17', { draw(g, t, info) {
  const cam = { z: 1.0 + 0.05 * ease.inOut(t / info.dur) };
  const L = E.W / 2 - V(480, 300), R = E.W / 2 + V(480, 300);
  const { GY, M } = voidStage(g, t, cam, { spots: [L, E.W / 2, R] });
  const s = V(1.35, 1.4), ui = S().ui, tw = wt('which', info, 1.1), tt = wt('talking.', info, 2.0);
  const look = Math.sin((t - tw) * 3.2) * (t > tw ? 1 : 0);
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: L, y: GY, s, facing: 1, outfit: GENIUS, pose: breathe(POSES.explain, t, 1, 3), expr: 'smile', talk: t > tw && look < 0 ? 0.5 + 0.5 * Math.sin(t * 18) : 0, rim: { color: M.key, dir: [0, -1], w: 4 } });
    drawFigure(g, { x: R, y: GY, s, facing: -1, outfit: CON, pose: breathe(POSES.explain, t, 1, 4), expr: 'smirk', talk: t > tw && look > 0 ? 0.5 + 0.5 * Math.sin(t * 18) : 0, rim: { color: M.rim, dir: [0, -1], w: 4 } });
    drawFigure(g, { x: E.W / 2, y: GY, s, facing: look >= 0 ? 1 : -1, outfit: YOU, pose: breathe(POSES.think, t, 1, 5), expr: 'confused', look: [0, 0], rim: { color: M.rim, dir: [0, -1], w: 5 } });
    gutGlow(g, E.W / 2, GY - 110 * s, 120, 0.6, t);
  });
  const q = ease.outBack(prog(t, tt - 0.2, tt + 0.3));
  if (q > 0) text(g, '?', E.W / 2, GY - 330 * s, { size: V(140, 150) * q, color: ui.gold, font: FONTS.title, weight: 700, glow: 20, glowColor: alpha(ui.gold, 0.6) });
  FX.dust(g, t, { count: 30, a: 0.3 });
} });
