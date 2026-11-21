// shots/_h.js — shared helpers for part 2 (underscore: not auto-loaded as shots).
import { E, V, S, mood, layer, ease, prog, clamp, lerp, wordTime, seg, circle, ring, rr, poly, glow, alpha, shade, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { voidStage } from '../sets/house.js';

// seconds into the shot when `w` is spoken (fallback: fb seconds)
export const wt = (w, info, fb = 0.3) => { const v = wordTime(w, info.shot.start - 0.1); return (v != null && v < info.shot.end + 0.2 ? v : info.shot.start + fb) - info.shot.start; };
// a word that pops in on cue
export function pop(g, t, str, x, y, at, o = {}) {
  const k = ease.outBack(prog(t, at - 0.05, at + 0.3)); if (k <= 0) return;
  const col = o.color || S().ui.gold, size = (o.size || V(72, 76)) * (0.6 + 0.4 * k);
  text(g, str, x, y, { size, color: col, font: o.font || FONTS.title, weight: 700, spacing: o.spacing ?? 4, glow: 18, glowColor: alpha(col, 0.55), alpha: clamp(k), align: o.align || 'center' });
}
export function check(g, x, y, r, k, col) { if (k <= 0) return; col = col || '#5fd17a'; ring(g, x, y, r, r * 0.12, alpha(col, k)); g.save(); g.globalAlpha *= k; seg(g, [[x - r * 0.45, y], [x - r * 0.1, y + r * 0.35], [x + r * 0.5, y - r * 0.35]].map((p, i) => i < 2 ? p : [lerp(x - r * 0.1, p[0], clamp(k * 1.5 - 0.3)), lerp(y + r * 0.35, p[1], clamp(k * 1.5 - 0.3))]), r * 0.16, col); g.restore(); glow(g, x, y, r * 2, col, 0.3 * k); }
export function cross(g, x, y, r, k, col) { if (k <= 0) return; col = col || S().ui.accent; const a = clamp(k * 2), b = clamp(k * 2 - 1);
  seg(g, [[x - r, y - r], [lerp(x - r, x + r, a), lerp(y - r, y + r, a)]], r * 0.22, col); if (b > 0) seg(g, [[x + r, y - r], [lerp(x + r, x - r, b), lerp(y - r, y + r, b)]], r * 0.22, col); glow(g, x, y, r * 2.2, col, 0.25 * k); }
// the gut-feeling orb
export function orb(g, x, y, r, t, a = 1, hollow = false) { const c = S().ui.gold; glow(g, x, y, r * 3 * (1 + 0.08 * Math.sin(t * 5)), c, 0.5 * a);
  if (hollow) { ring(g, x, y, r, r * 0.12, alpha(c, a)); } else { circle(g, x, y, r, alpha(c, a)); circle(g, x - r * 0.3, y - r * 0.3, r * 0.3, alpha('#fff8e0', 0.8 * a)); } }
export const gutAt = (x, GY, s) => [x + 4 * s, GY - 110 * s];
// a figure on the dark spotlit stage
export function onStage(g, t, info, figs, o = {}) {
  const cam = o.cam || { z: 1 + 0.06 * ease.inOut(t / info.dur), x: o.dx ? o.dx * ease.inOut(t / info.dur) : 0 };
  const { GY, M } = voidStage(g, t, cam, { spots: o.spots || figs.map(f => f.x) });
  layer(g, cam, 1, (g) => figs.forEach(f => drawFigure(g, { y: GY, s: V(1.5, 1.6), facing: 1, rim: { color: M.rim, dir: [0, -1], w: 5 }, blink: (t % 3.1) > 3.0, ...f, pose: f.pose ? breathe(f.pose, t, 1, f.seed || 1) : breathe(POSES.stand, t, 1, f.seed || 1) })));
  o.after?.(g, GY, M, cam);
  FX.dust(g, t, { count: 30, a: 0.3 });
  return { GY, M, cam };
}
