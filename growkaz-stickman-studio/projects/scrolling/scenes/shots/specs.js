// shots/specs.js — "Why You Can't Stop Scrolling" (test part: opening to Skinner's first schedule)
import { E, S, ease, prog, clamp, lerp, seg, circle, ring, rr, glow, alpha, text, FONTS } from '/engine/core.js';
import { bigFace, drawFigure, POSES } from '/engine/rig2d.js';
import { shot } from './_kit.js';
import { cross } from './_h.js';
import { phone, thumb, bedroom, clockFace, pigeon, skinnerBox, gears } from './_s.js';
import * as CAST from '../cast.js';
const ui = () => S().ui;
const big = (g, str, x, y, size, col, a = 1) => text(g, str, E.W * x, E.H * y, { size, color: col || ui().cream, font: FONTS.title, weight: 700, glow: 20, glowColor: alpha(col || ui().gold, 0.5), alpha: a });

shot('S01', { bg: 'black', drawFirst(g, t) { bedroom(g, t); phone(g, E.W * 0.42, E.H * 0.5, 0.75, t, { speed: 90 }); bigFace(g, E.W * 0.42, E.H * 0.9, 230, { outfit: CAST.YOU, expr: 'sleepy', look: [0, -0.8], rimColor: '#7ab8ff' }); clockFace(g, E.W * 0.82, E.H * 0.55, 110, 1, 0); },
  badge: [0.2, '1:00 AM'], dust: false });
shot('S02', { bg: 'black', draw(g, t, i, { cue }) { const c = cue('hour'), m = t < c ? 5 * clamp(t / c) : 5 + 55 * ease.inOut(prog(t, c, c + 1.2)); clockFace(g, E.W * 0.3, E.H * 0.5, 230, 1, m);
  const k = ease.out(prog(t, 0.1, 0.5)); if (k > 0) big(g, '"5 MORE MINUTES"', 0.7, 0.4, 80, ui().cream, k); const k2 = ease.out(prog(t, c, c + 0.4)); if (k2 > 0) big(g, '+1 HOUR', 0.7, 0.6, 120, ui().accent, k2); }, dust: false });
shot('S03', { bg: 'black', drawFirst(g, t, i, { cue }) { bedroom(g, t); phone(g, E.W * 0.5, E.H * 0.48, 1.05, t, { speed: 260 }); thumb(g, E.W * 0.6, E.H * 0.72, 1.2, t, 1.1); },
  pops: [['Swipe', 'SWIPE', 0.18, 0.3, 90, 'cream'], [2.9, 'SWIPE', 0.82, 0.45, 90, 'cream'], [3.8, 'SWIPE', 0.18, 0.84, 90, 'gold']], dust: false });
shot('S04', { bg: 'blur', draw(g, t, i, { cue }) { const f = prog(t, cue('remember'), cue('remember') + 1.5); g.save(); g.globalAlpha = 1 - 0.65 * f; phone(g, E.W * 0.32, E.H * 0.5, 0.95, t, { speed: 220 }); g.restore(); },
  pops: [['tomorrow', 'FORGOTTEN BY TOMORROW', 0.68, 0.38, 64, 'cream'], ['enjoy', "DIDN'T EVEN ENJOY IT", 0.68, 0.58, 64, 'red']] });
shot('S05', { bg: 'blur', face: { o: 'YOU', expr: 'sleepy', expr2: 'sad', at: 'stop', r: 300, x: -0.2, look: [0, 0.4] }, draw(g, t) { phone(g, E.W * 0.72, E.H * 0.55, 0.7, t, { speed: 300 }); }, pops: [['stop', "BUT YOU CAN'T STOP", 0.5, 0.12, 90, 'red']] });
shot('S06', { bg: 'black', line: "HERE'S THE STRANGE PART" });
shot('S07', { bg: 'stage', figs: [{ x: 0, o: 'YOU', expr: 'worried', pose: 'phone', prop: 'phone' }], draw(g, t, i, { cue }) { for (const [w, s, x] of [['weak', 'WEAK', 0.22], ['lazy', 'LAZY', 0.78]]) { const c = cue(w), k = ease.out(prog(t, c, c + 0.3)); if (k <= 0) continue; big(g, s, x, 0.4, 110, ui().cream, k); cross(g, E.W * x, E.H * 0.4, 110, prog(t, c + 0.4, c + 0.9)); } } });
shot('S08', { bg: 'black', icons: [['brain', 0.3, 0.45, 1.3, 0.1]], draw(g, t, i, { cue }) { const k = ease.out(prog(t, cue('machine'), cue('machine') + 0.6)); if (k > 0) { g.save(); g.globalAlpha = k; gears(g, E.W * 0.74, E.H * 0.6, 110, t); phone(g, E.W * 0.74, E.H * 0.4, 0.5, t, { speed: 200 }); g.restore(); } },
  pops: [['built', 'BUILT TO CHASE', 0.3, 0.82, 60, 'gold'], ['designed', 'DESIGNED TO KEEP YOU', 0.74, 0.86, 56, 'red']] });
shot('S09', { bg: 'bp', badge: [0.2, '~100 YEARS AGO'], draw(g, t, i, { cue }) { const k = ease.outBack(prog(t, cue('box'), cue('box') + 0.4)); if (k > 0) skinnerBox(g, E.W * 0.42, E.H * 0.55, 0.9 * k, t, {});
  const k2 = ease.outBack(prog(t, cue('pigeon'), cue('pigeon') + 0.4)); if (k2 > 0) pigeon(g, E.W * 0.3, E.H * 0.6, 0.8 * k2, t); } });
shot('S10', { bg: 'study', face: { o: 'SKINNER', expr: 'thinking', r: 300 }, lower: ['B. F. SKINNER', 'PSYCHOLOGIST'] });
shot('S11', { bg: 'study', figs: [{ x: -0.3, o: 'SKINNER', pose: 'point' }], draw(g, t) { skinnerBox(g, E.W * 0.6, E.H * 0.62, 0.7, t, {}); }, badge: [0.2, '1930s'], pops: [['box', 'THE SKINNER BOX', 0.6, 0.15, 84, 'gold']] });
shot('S12', { bg: 'bp', draw(g, t, i, { cue }) { const lit = t > cue('peck') && Math.sin(t * 8) > 0; skinnerBox(g, E.W * 0.5, E.H * 0.6, 1.1, t, { lit }); pigeon(g, E.W * 0.68, E.H * 0.66, 0.6, t, { peck: t > cue('peck') ? 1.2 : 0 }); },
  pops: [['rat', 'RAT', 0.15, 0.2, 60, 'cream'], ['pigeon', 'OR PIGEON', 0.32, 0.2, 60, 'cream'], ['lever', 'PRESS', 0.75, 0.2, 60, 'gold'], ['peck', 'PECK', 0.88, 0.2, 60, 'gold']] });
shot('S13', { bg: 'bp', draw(g, t) { skinnerBox(g, E.W * 0.5, E.H * 0.6, 1.1, t, { drops: [0.8, 1.6], lit: true }); pigeon(g, E.W * 0.6, E.H * 0.66, 0.6, t, { flip: 1 }); }, pops: [['food', 'FOOD!', 0.82, 0.2, 90, 'green']] });
shot('S14', { bg: 'study', figs: [{ x: 0.25, o: 'SKINNER', pose: 'think', expr: 'thinking', facing: -1 }], pops: [['reward', 'WHAT KIND OF REWARD', 0.3, 0.3, 60, 'cream'], ['stick', 'MAKES BEHAVIOUR STICK?', 0.3, 0.42, 64, 'gold']] });
shot('S15', { bg: 'bp', draw(g, t) { const L = [['EVERY TIME', ui().cream], ['FIXED', ui().cream], ['RANDOM?', ui().accent]]; L.forEach(([s, c], j) => { const k = ease.outBack(prog(t, 0.3 + j * 0.4, 0.7 + j * 0.4)); if (k <= 0) return; g.save(); g.translate(E.W * (0.22 + j * 0.28), E.H * 0.5); g.scale(k, k);
  rr(g, -220, -110, 440, 220, 20); g.fillStyle = 'rgba(14,8,12,.9)'; g.fill(); g.lineWidth = 6; g.strokeStyle = c; g.stroke(); text(g, s, 0, 6, { size: 56, color: c, font: FONTS.title, weight: 700 }); g.restore(); }); }, pops: [[0.1, 'REWARD PATTERNS', 0.5, 0.15, 80, 'gold']] });
shot('S16', { bg: 'bp', draw(g, t) { const P = 0.9, n = Math.floor(t / P), drops = []; for (let j = 0; j <= n; j++) drops.push(j * P + 0.15); skinnerBox(g, E.W * 0.5, E.H * 0.6, 1.1, t, { lit: (t % P) < 0.15, drops }); pigeon(g, E.W * 0.68, E.H * 0.66, 0.6, t, { peck: 1 / P });
  text(g, `PECKS: ${n + 1}   FOOD: ${n + 1}`, E.W * 0.5, E.H * 0.9, { size: 56, color: '#5fd17a', font: FONTS.ui, weight: 900 }); }, pops: [['every', 'EVERY PECK = FOOD', 0.5, 0.15, 84, 'green']] });
