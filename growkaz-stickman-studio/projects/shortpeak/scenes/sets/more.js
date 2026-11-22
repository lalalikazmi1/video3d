// sets/more.js — study, firehouse, debate stage, classroom, table-top, blueprint.
import { E, V, S, mood, layer, backdrop, rr, seg, circle, poly, linGrad, glow, alpha, shade, mix, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';

const GYf = () => E.H * V(0.8, 0.68);
function room(g, t, cam, M, o = {}) {
  const GY = GYf(), CX = E.W / 2, wall = shade(M.wall, -0.35);
  layer(g, cam, 0.5, (g) => {
    g.fillStyle = linGrad(g, 0, GY - 900, 0, GY, [shade(wall, -0.3), wall]); g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H);
    if (o.window !== false) { FX.windowFrame(g, { x: CX + (o.winX ?? 260), y: GY - V(640, 820), w: 420, h: 360, cols: 3, rows: 2, frame: shade(wall, -0.5), bar: 9 }, (g, x, y, w, h) => { backdrop(g, M.sky, [x, y, w, h]); FX.skyline(g, { x, y: y + h, w, minH: 40, maxH: h * 0.5, color: shade(M.wall, -0.6), windowColor: alpha(M.practical, 0.7), lit: 0.3, seed: 4 }); });
      FX.godRays(g, CX + (o.winX ?? 260) + 210, GY - V(460, 640), { angle: Math.PI * 0.75, spread: 0.5, len: 900, color: M.key, a: 0.06, t }); }
    o.back?.(g, GY, CX);
  });
  layer(g, cam, 0.85, (g) => { g.fillStyle = linGrad(g, 0, GY, 0, GY + 300, [shade(M.floor, -0.15), shade(M.dark, -0.4)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2); FX.floorLines(g, GY, GY + 500, 'rgba(0,0,0,.3)', 0.07); FX.pool(g, CX, GY + 30, 600, 60, M.key, 0.18); o.front?.(g, GY, CX); });
  return { GY, CX, M };
}
export function study(g, t, cam, o = {}) {
  const M = mood('interiorWarm');
  return room(g, t, cam, M, { winX: 340, back: (g, GY, CX) => {
    rr(g, CX - 620, GY - V(620, 800), 640, 360, 10); g.fillStyle = shade(M.dark, -0.4); g.fill(); g.strokeStyle = shade(M.wall, -0.2); g.lineWidth = 14; g.stroke();   // chalkboard
    o.board?.(g, CX - 300, GY - V(440, 620));
    for (let i = 0; i < 5; i++) { g.fillStyle = shade(M.wall, -0.55); g.fillRect(CX - 1100, GY - 160 - i * 90, 360, 14); for (let k = 0; k < 9; k++) { g.fillStyle = mix(['#8a3a2a', '#3a5a6a', '#6a5a2a'][(i + k) % 3], M.dark, 0.4); g.fillRect(CX - 1090 + k * 38, GY - 160 - i * 90 - 62, 28, 62); } }
    rr(g, CX + 420, GY - V(380, 460), 22, 200, 6); g.fillStyle = shade(M.dark, -0.3); g.fill(); circle(g, CX + 431, GY - V(390, 470), 40, alpha(M.practical, 0.9)); glow(g, CX + 431, GY - V(390, 470), 220, M.practical, 0.4);
  }, front: o.front });
}
export function firehouse(g, t, cam) {
  const M = mood('night');
  return room(g, t, cam, M, { window: false, back: (g, GY, CX) => {
    rr(g, CX - 520, GY - V(520, 640), 1040, V(520, 640), 8); g.fillStyle = shade(M.dark, -0.5); g.fill();                // big bay door
    for (let i = 1; i < 6; i++) seg(g, [[CX - 520, GY - i * V(90, 110)], [CX + 520, GY - i * V(90, 110)]], 4, shade(M.wall, -0.5));
    const red = mix(S().ui.accent, M.dark, 0.35); rr(g, CX - 420, GY - 230, 700, 190, 16); g.fillStyle = red; g.fill(); rr(g, CX + 280, GY - 210, 180, 170, 18); g.fill();
    g.fillStyle = alpha(M.practical, 0.5); g.fillRect(CX + 320, GY - 190, 100, 60); for (const x of [CX - 300, CX + 360]) { circle(g, x, GY - 40, 44, '#0d0a12'); circle(g, x, GY - 40, 16, shade(M.wall, -0.2)); }
    for (let i = 0; i < 3; i++) { const x = CX - 900 + i * 110; seg(g, [[x, GY - 300], [x, GY - 120]], 6, '#16121a'); g.fillStyle = '#b8903a'; rr(g, x - 30, GY - 290, 60, 150, 10); g.fill(); g.fillStyle = '#e8f04a'; g.fillRect(x - 30, GY - 200, 60, 6); }  // coats on hooks
    FX.lampPost(g, CX + 900, GY, V(420, 520), { color: '#16121a', light: M.practical });
  } });
}
export function stage(g, t, cam) {
  const M = mood('dusk'), GY = GYf(), CX = E.W / 2;
  layer(g, cam, 0.3, (g) => { backdrop(g, [shade(M.dark, -0.5), shade(M.wall, -0.4)]); for (let i = 0; i < 10; i++) { const x = CX - 1100 + i * 240; g.fillStyle = alpha(i % 2 ? '#3a6ea5' : S().ui.accent, 0.12); g.fillRect(x, -E.H, 120, E.H * 3); } });
  layer(g, cam, 0.85, (g) => { g.fillStyle = shade(M.floor, -0.4); g.fillRect(-E.W, GY, E.W * 3, E.H * 2); for (const x of [-500, 0, 500]) FX.pool(g, CX + x, GY + 10, 220, 30, M.key, 0.3); });
  return { GY, CX, M };
}
export function podium(g, x, GY, M) { poly(g, [[x - 80, GY], [x + 80, GY], [x + 64, GY - 170], [x - 64, GY - 170]], shade(M.wall, -0.4)); rr(g, x - 84, GY - 186, 168, 22, 6); g.fillStyle = shade(M.wall, -0.2); g.fill(); seg(g, [[x - 20, GY - 186], [x - 40, GY - 250]], 4, '#16121a'); circle(g, x - 42, GY - 254, 9, '#16121a'); }
export function school(g, t, cam, o = {}) {
  const M = mood('golden');
  return room(g, t, cam, M, { winX: 300, back: (g, GY, CX) => { rr(g, CX - 700, GY - V(640, 820), 820, 380, 10); g.fillStyle = '#1e3a2e'; g.fill(); g.strokeStyle = '#6a4a2a'; g.lineWidth = 16; g.stroke(); o.board?.(g, CX - 290, GY - V(450, 630)); }, front: o.front });
}
export function tableTop(g, t, cam) {
  const M = mood('interiorWarm'), GY = E.H * 0.7, CX = E.W / 2;
  layer(g, cam, 0.4, (g) => { backdrop(g, [shade(M.dark, -0.5), shade(M.wall, -0.45)]); glow(g, CX, GY - 300, 900, M.practical, 0.18); });
  layer(g, cam, 0.85, (g) => { g.fillStyle = linGrad(g, 0, GY, 0, E.H * 1.5, [shade(M.floor, 0.05), shade(M.dark, -0.4)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2); for (let i = 0; i < 8; i++) seg(g, [[-E.W, GY + 30 + i * 46], [E.W * 2, GY + 30 + i * 46]], 2, 'rgba(0,0,0,.18)'); FX.pool(g, CX, GY + 40, 700, 80, M.practical, 0.25); });
  return { GY, CX, M };
}
export const bp = (g) => { UI.blueprint(g); return { c: UI.bpStroke(), gold: S().ui.gold, acc: S().ui.accent, cream: S().ui.cream }; };
// lower-third name card
export function lowerThird(g, t, name, sub, a0 = 0.3) {
  const ui = S().ui, k = Math.min(1, Math.max(0, (t - a0) / 0.4)); if (k <= 0) return; const x = V(120, 80), y = E.H - V(190, 520);
  g.save(); g.globalAlpha *= k; rr(g, x - 20, y - 50, 560 * k, 110, 10); g.fillStyle = 'rgba(10,6,12,.7)'; g.fill(); g.fillStyle = ui.gold; g.fillRect(x - 20, y - 50, 8, 110);
  text(g, name, x + 10, y - 8, { size: 42, color: ui.cream, font: FONTS.ui, weight: 900, align: 'left' }); text(g, sub, x + 10, y + 34, { size: 24, color: ui.gold, font: FONTS.ui, weight: 800, align: 'left', spacing: 2 }); g.restore();
}
