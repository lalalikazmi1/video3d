// sets/house.js — burning house: exterior (night), kitchen interior, and the basement cross-section.
import { E, V, S, mood, layer, backdrop, rr, seg, circle, poly, linGrad, radGrad, glow, alpha, shade, mix, noise } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const houseGround = () => E.H * V(0.8, 0.68);
// fire palette derived from the mood + style accent so style switching still works
export const fireCols = (M) => ({ core: mix(M.practical, '#ffffff', 0.55), mid: M.practical, edge: mix(M.practical, S().ui.accent, 0.6), smoke: shade(M.dark, -0.2) });

// flickering flames: base centre (x, y), width w, height h, t seconds, k = intensity 0..1
export function flames(g, x, y, w, h, t, M, k = 1, seed = 1) {
  if (k <= 0.01) return; const C = fireCols(M);
  glow(g, x, y - h * 0.4, Math.max(w, h) * 1.4, C.mid, 0.35 * k);
  const tongues = 7;
  for (const [col, sc] of [[C.edge, 1], [C.mid, 0.72], [C.core, 0.42]]) {
    for (let i = 0; i < tongues; i++) {
      const u = i / (tongues - 1) - 0.5, bx = x + u * w * sc;
      const hh = h * k * sc * (0.55 + 0.45 * (1 - Math.abs(u) * 1.6)) * (0.8 + 0.35 * noise(t * 3.2 + i * 1.7, seed + i));
      const sway = noise(t * 2.1 + i, seed + 40) * w * 0.12;
      const ww = (w * sc) / tongues * 1.5;
      poly(g, [[bx - ww, y], [bx - ww * 0.4 + sway * 0.5, y - hh * 0.55], [bx + sway, y - hh], [bx + ww * 0.4 + sway * 0.5, y - hh * 0.55], [bx + ww, y]], col);
    }
  }
}
export function smoke(g, x, y, t, M, s = 1, a = 0.5) {
  for (let i = 0; i < 9; i++) { const p = ((t * 0.18 + i / 9) % 1), r = (60 + p * 160) * s;
    g.fillStyle = alpha(mix(M.dark, M.ambient, 0.4), a * (1 - p)); g.beginPath(); g.arc(x + noise(i + t * 0.3, 7) * 80 * s + p * 120 * s, y - p * 520 * s, r, 0, 7); g.fill(); }
}

export function houseExt(g, t, cam, o = {}) {
  const M = mood('night'), GY = houseGround(), CX = E.W / 2, C = fireCols(M), hx = CX + (o.houseX ?? 160);
  layer(g, cam, 0.1, (g) => { backdrop(g, M.sky); FX.stars(g, t, { count: 120, area: [-E.W, -E.H, E.W * 3, E.H * 1.4] }); FX.moon(g, CX - V(650, 300), GY - V(760, 1300), 42); });
  layer(g, cam, 0.3, (g) => FX.skyline(g, { x: -E.W, y: GY - V(140, 300), w: E.W * 3, minH: 60, maxH: V(260, 420), color: shade(M.wall, -0.55), windowColor: alpha(M.practical, 0.5), lit: 0.1, seed: 12 }));
  layer(g, cam, 0.6, (g) => {
    const w = 760, h = V(520, 620), top = GY - h, left = hx - w / 2, wall = shade(M.wall, -0.35);
    smoke(g, hx + 60, top - 40, t, M, 1.2, 0.55);
    poly(g, [[left - 40, top], [hx, top - 230], [left + w + 40, top]], shade(wall, -0.3));
    g.fillStyle = linGrad(g, 0, top, 0, GY, [shade(wall, 0.05), wall]); g.fillRect(left, top, w, h);
    for (const [wx, wy] of [[-230, 0.2], [70, 0.2], [230, 0.2], [-230, 0.58], [230, 0.58]]) {
      const x = hx + wx - 70, y = top + h * wy, fl = 0.75 + 0.25 * noise(t * 4 + wx, 3);
      FX.windowFrame(g, { x, y, w: 140, h: 150, cols: 2, rows: 2, frame: shade(wall, -0.4), bar: 8 }, (g, x2, y2, w2, h2) => {
        g.fillStyle = linGrad(g, 0, y2, 0, y2 + h2, [alpha(C.core, fl), alpha(C.mid, fl), alpha(C.edge, fl)]); g.fillRect(x2, y2, w2, h2);
        flames(g, x2 + w2 / 2, y2 + h2, w2 * 0.8, h2 * 0.7, t, M, 0.8 * fl, wx);
      });
      glow(g, x + 70, y + 75, 260, C.mid, 0.25 * fl);
    }
    FX.door(g, { x: hx - 30 - 60, y: GY, w: 120, h: 230, color: shade(wall, -0.5), open: 0.6, light: C.mid });
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, GY, 0, GY + 400, [shade(M.road, -0.1), shade(M.dark, -0.3)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2);
    FX.pool(g, hx, GY + 30, 520, 50, C.mid, 0.22);
    // fire truck on the left
    const tx = CX - V(720, 520), ty = GY; const red = mix(S().ui.accent, M.dark, 0.35);
    rr(g, tx - 200, ty - 150, 300, 120, 12); g.fillStyle = red; g.fill(); rr(g, tx + 100, ty - 130, 130, 100, 14); g.fill();
    g.fillStyle = alpha(M.key, 0.5); g.fillRect(tx + 140, ty - 118, 70, 40);
    seg(g, [[tx - 190, ty - 165], [tx + 80, ty - 165]], 8, shade(red, -0.4));
    for (const wx of [tx - 130, tx + 150]) { circle(g, wx, ty - 28, 32, '#0d0a12'); circle(g, wx, ty - 28, 12, shade(M.wall, -0.2)); }
    const blink = (t * 2.5) % 1 < 0.5; circle(g, tx + 160, ty - 140, 10, blink ? S().ui.accent : '#6aa8ff'); glow(g, tx + 160, ty - 140, 120, blink ? S().ui.accent : '#6aa8ff', 0.5);
  });
  return { GY, CX, M, hx };
}

export function kitchen(g, t, cam, o = {}) {
  const M = mood('night'), GY = houseGround(), CX = E.W / 2, C = fireCols(M), k = o.fire ?? 1;
  const fx = CX + (o.stoveX ?? 470), shake0 = o.dark ?? 0;
  layer(g, cam, 0.5, (g) => {
    const wall = shade(M.wall, -0.45);
    g.fillStyle = linGrad(g, 0, GY - 900, 0, GY, [shade(wall, -0.3), wall]); g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H);
    FX.windowFrame(g, { x: CX - 520, y: GY - V(560, 760), w: 300, h: 260, cols: 2, rows: 2, frame: shade(wall, -0.5), bar: 9 }, (g, x, y, w, h) => { backdrop(g, M.sky, [x, y, w, h]); });
    // upper cabinets
    for (let i = 0; i < 4; i++) { rr(g, CX - 120 + i * 190, GY - V(560, 760), 170, 150, 6); g.fillStyle = shade(wall, -0.35); g.fill(); }
    glow(g, fx, GY - 200, 700, C.mid, 0.35 * k);
  });
  layer(g, cam, 0.8, (g) => {
    g.fillStyle = linGrad(g, 0, GY, 0, GY + 300, [shade(M.floor, -0.2), shade(M.dark, -0.4)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2);
    FX.floorLines(g, GY, GY + 500, 'rgba(0,0,0,.3)', 0.07);
    FX.counter(g, { x: CX - 140, y: GY, w: 860, h: 190, color: shade(M.wall, -0.55) });
    rr(g, fx - 110, GY - 196, 220, 14, 4); g.fillStyle = '#0d0a12'; g.fill();
    flames(g, fx, GY - 196, 260, 320, t, M, k, 5);
    FX.pool(g, fx, GY + 30, 520, 60, C.mid, 0.3 * k);
  });
  return { GY, CX, M, fx, C };
}

// cross-section: kitchen slab at GY, basement below with the hidden fire
export function section(g, t, cam, o = {}) {
  const M = mood('night'), GY = E.H * V(0.46, 0.42), CX = E.W / 2, C = fireCols(M), bf = o.basement ?? 1;
  layer(g, cam, 0.5, (g) => {
    backdrop(g, [shade(M.dark, -0.3), M.dark]);
    const wall = shade(M.wall, -0.5);
    g.fillStyle = wall; g.fillRect(CX - 760, GY - 420, 1520, 420);                        // kitchen room
    g.fillStyle = shade(M.dark, -0.5); g.fillRect(-E.W, GY + 40, E.W * 3, E.H * 2);       // earth
    g.fillStyle = shade(M.wall, -0.65); g.fillRect(CX - 760, GY + 40, 1520, 380);         // basement room
    glow(g, CX + 80, GY + 300, 760, C.mid, 0.55 * bf);
    flames(g, CX + 80, GY + 410, 900, 330, t, M, bf, 9);
    flames(g, CX - 420, GY + 410, 300, 180, t + 1, M, bf * 0.8, 11);
    smoke(g, CX + 80, GY + 300, t, M, 0.4, 0.25 * bf);
    seg(g, [[CX - 760, GY - 420], [CX + 760, GY - 420]], 10, shade(M.wall, -0.7));
  });
  layer(g, cam, 0.8, (g) => {
    g.fillStyle = shade(M.floor, -0.3); g.fillRect(CX - 780, GY, 1560, 40);                 // the floor slab
    for (let x = CX - 760; x < CX + 760; x += 60) seg(g, [[x, GY + 4], [x, GY + 36]], 2, 'rgba(0,0,0,.4)');
    g.fillStyle = alpha(C.mid, 0.25 * bf); g.fillRect(CX - 780, GY + 30, 1560, 10);
  });
  return { GY, CX, M, C };
}

export function voidStage(g, t, cam, o = {}) {
  const M = mood('night'), GY = houseGround(), CX = E.W / 2;
  layer(g, cam, 0.3, (g) => { backdrop(g, [shade(M.dark, -0.5), shade(M.wall, -0.4), shade(M.dark, -0.3)]); FX.stars(g, t, { count: 40 }); });
  layer(g, cam, 0.8, (g) => {
    g.fillStyle = shade(M.floor, -0.5); g.fillRect(-E.W, GY, E.W * 3, E.H * 2);
    for (const sx of o.spots ?? [CX]) { FX.lightCone(g, sx, -40, { angle: Math.PI / 2, spread: 0.32, len: GY + 160, color: M.key, a: 0.16 }); FX.pool(g, sx, GY + 10, 300, 40, M.key, 0.3); }
  });
  return { GY, CX, M };
}
