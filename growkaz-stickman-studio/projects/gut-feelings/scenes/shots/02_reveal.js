// shots/02_reveal.js — s10..s12: the cut-away to the basement fire, and the crew safe outside.
import { E, V, S, registerShot, mood, layer, ease, prog, clamp, lerp, wordTime, seg, circle, glow, alpha, shade, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { section, houseExt, fireCols } from '../sets/house.js';
import { LT, CREW } from '../cast.js';
import { gutGlow } from './01_fire.js';

const wt = (w, info, fb) => (wordTime(w, info.shot.start - 0.05) ?? info.shot.start + fb) - info.shot.start;

// ghost silhouettes of the crew standing on the floor slab (where they were)
function ghosts(g, GY, a) {
  const s = V(0.85, 0.9);
  [[-180, LT], [-40, CREW], [90, CREW]].forEach(([dx, o]) => drawFigure(g, { x: E.W / 2 + dx, y: GY, s, facing: 1, outfit: o, pose: POSES.holdFront, expr: 'neutral', alpha: a, shadow: false }));
}

// s10 — pull down through the floor into the cross-section
registerShot('s10', { draw(g, t, info) {
  const p = ease.inOut(prog(t, 0, info.dur));
  const cam = { z: lerp(1.6, 1.0, p), y: lerp(-220, 0, p) };
  const tk = wt('kitchen.', info, 1.4), b = 0.25 + 0.75 * ease.out(prog(t, tk - 0.3, tk + 0.4));
  const { GY } = section(g, t, cam, { basement: b });
  layer(g, cam, 1, (g) => ghosts(g, GY, 0.9));
  const ui = S().ui;
  text(g, 'KITCHEN', E.W / 2 - V(560, 300), GY - V(360, 330), { size: V(34, 38), color: alpha(ui.cream, 0.8), font: FONTS.ui, weight: 900, spacing: 4, alpha: ease.out(prog(t, 0.4, 0.8)) });
  FX.dust(g, t, { count: 40, color: fireCols(mood('night')).core, a: 0.4 });
} });

// s11 — the basement fire, right under their feet
registerShot('s11', { draw(g, t, info) {
  const cam = { z: 1.0 + 0.05 * ease.inOut(t / info.dur), x: -20 * t };
  const { GY, C } = section(g, t, cam, { basement: 1.1 });
  layer(g, cam, 1, (g) => ghosts(g, GY, 0.9));
  const tb = wt('basement,', info, 0.9), tf = wt('feet.', info, 2.4), ui = S().ui;
  UI.callout(g, t, { at: [E.W / 2 + 80, GY + V(260, 300)], to: [E.W / 2 + V(520, 280), GY + V(170, 220)], str: 'BASEMENT FIRE', color: ui.accent, size: V(46, 50), start: tb - 0.1 });
  // dotted arrow from the fire up to their feet
  const k = ease.inOut(prog(t, tf - 0.7, tf));
  if (k > 0) { g.setLineDash([10, 12]); seg(g, [[E.W / 2 - 40, GY + 230], [E.W / 2 - 40, lerp(GY + 230, GY + 10, k)]], 4, ui.gold); g.setLineDash([]);
    glow(g, E.W / 2 - 40, lerp(GY + 230, GY + 10, k), 50, ui.gold, 0.8); }
  UI.badge(g, { str: 'UNDER THEIR FEET', a: ease.out(prog(t, tf - 0.2, tf + 0.3)), color: ui.gold, size: V(52, 56) });
} });

// s12 — exterior: everyone safe; the lieutenant's gut glows
registerShot('s12', { draw(g, t, info) {
  const cam = { z: 1.12 + 0.08 * ease.inOut(t / info.dur), x: -200 };
  const { GY, M } = houseExt(g, t, cam, { houseX: 320 });
  const C = fireCols(M), s = V(1.3, 1.4), rim = { color: C.mid, dir: [1, -0.3], w: 5 };
  const lx = E.W / 2 - 160;
  layer(g, cam, 1, (g) => {
    [[-170, CREW, 2], [-310, CREW, 3]].forEach(([dx, o, sd]) => drawFigure(g, { x: lx + dx, y: GY, s, facing: 1, outfit: o, pose: breathe(POSES.relaxed, t, 1, sd), expr: 'awe', rim }));
    drawFigure(g, { x: lx, y: GY, s, facing: 1, outfit: LT, pose: breathe(POSES.stand, t, 1, 5), expr: t > 1.2 ? 'determined' : 'neutral', rim });
    const tg = wt('gut', info, 0.3);
    gutGlow(g, lx + 4 * s, GY - 110 * s, 150, 0.85 * ease.out(prog(t, tg - 0.1, tg + 0.5)), t);
  });
  FX.dust(g, t, { count: 30, color: C.core, a: 0.35 });
} });
