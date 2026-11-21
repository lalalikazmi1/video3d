// shots/_kit.js — spec-driven shots: backgrounds, icons, figures, timed words.
// A spec: { bg, cam, figs:[{x,o,expr,pose,facing,prop,talk}], face:{o,expr,x,y,r,look},
//           icons:[[name, x, y, size, cue, opts]], pops:[[cue, text, x, y, size, color]], line, lower:[name, sub] }
// x / y are fractions of the frame; cue is a spoken word (string) or seconds (number).
import { E, V, S, registerShot, mood, layer, blurLayer, veil, backdrop, ease, prog, clamp, lerp, noise, shake, seg, circle, ring, rr, poly, glow, alpha, shade, mix, linGrad, radGrad, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { voidStage, flames } from '../sets/house.js';
import { study, school, stage, bp, lowerThird } from '../sets/more.js';
import * as CAST from '../cast.js';
import { wt, pop, check, cross, orb } from './_h.js';

const GRN = '#5fd17a';
const cueT = (c, info, fb = 0.3) => (typeof c === 'number' ? c : c == null ? fb : wt(c, info, fb));
const ui = () => S().ui;

// ---------- backgrounds ----------
const GY = () => E.H * 0.8;
function street(g, t, cam, o) {
  const M = mood('night');
  layer(g, cam, 0.1, (g) => { backdrop(g, M.sky); FX.stars(g, t, { count: 80, area: [-E.W, -E.H, E.W * 3, E.H * 1.2] }); FX.moon(g, E.W * 0.82, E.H * 0.16, 40); });
  layer(g, cam, 0.35, (g) => FX.skyline(g, { x: -E.W, y: GY() - 60, w: E.W * 3, minH: 120, maxH: 420, color: shade(M.wall, -0.55), windowColor: alpha(M.practical, 0.7), lit: 0.2, seed: 6 }));
  layer(g, cam, 0.85, (g) => { g.fillStyle = linGrad(g, 0, GY(), 0, E.H, [shade(M.road, -0.1), shade(M.dark, -0.4)]); g.fillRect(-E.W, GY(), E.W * 3, E.H); for (const x of [0.15, 0.85]) FX.lampPost(g, E.W * x, GY(), 420, { light: M.practical }); });
  if (o.rain) FX.rain(g, t, { count: 160 });
  return { GY: GY(), M };
}
function cave(g, t, cam, o) {
  const M = mood('night');
  layer(g, cam, 0.3, (g) => { backdrop(g, [shade(M.dark, -0.6), shade(M.wall, -0.5)]); g.fillStyle = shade(M.dark, -0.7); g.beginPath(); g.moveTo(-E.W, 0); g.lineTo(E.W * 2, 0); g.lineTo(E.W * 2, E.H * 0.15); g.quadraticCurveTo(E.W / 2, -E.H * 0.25, -E.W, E.H * 0.15); g.fill(); });
  layer(g, cam, 0.85, (g) => { g.fillStyle = shade(M.floor, -0.5); g.fillRect(-E.W, GY(), E.W * 3, E.H); if (!o.cold) { flames(g, E.W / 2, GY() + 10, 160, 200, t, mood('night'), 1, 3); FX.pool(g, E.W / 2, GY() + 20, 500, 60, M.practical, 0.35); } });
  if (o.cold) FX.snow(g, t, { count: 160 });
  return { GY: GY(), M };
}
function golf(g, t, cam) {
  const M = mood('golden');
  layer(g, cam, 0.1, (g) => { backdrop(g, M.sky); FX.sun(g, E.W * 0.78, E.H * 0.3, 70, '#fff3dc', M.key, 5); });
  layer(g, cam, 0.4, (g) => FX.hills(g, { y: GY() - 160, color: shade(M.grass, -0.35), seed: 4 }));
  layer(g, cam, 0.85, (g) => { g.fillStyle = linGrad(g, 0, GY() - 40, 0, E.H, [M.grass, shade(M.grass, -0.45)]); g.fillRect(-E.W, GY() - 40, E.W * 3, E.H);
    g.fillStyle = shade(M.grass, 0.12); g.beginPath(); g.ellipse(E.W * 0.6, GY() + 40, 700, 110, 0, 0, 7); g.fill(); circle(g, E.W * 0.78, GY() + 40, 14, '#0a0608');
    seg(g, [[E.W * 0.78, GY() + 40], [E.W * 0.78, GY() - 260]], 6, '#f2ece4'); poly(g, [[E.W * 0.78, GY() - 260], [E.W * 0.78 + 90, GY() - 230], [E.W * 0.78, GY() - 200]], S().ui.accent); });
  return { GY: GY(), M };
}
function office(g, t, cam) { const M = mood('interiorCool'); layer(g, cam, 0.5, (g) => { backdrop(g, [shade(M.wall, -0.4), shade(M.wall, -0.2)]); FX.windowFrame(g, { x: E.W * 0.6, y: E.H * 0.18, w: 520, h: 380, cols: 3, rows: 2, frame: shade(M.wall, -0.5) }, (g, x, y, w, h) => { backdrop(g, M.sky, [x, y, w, h]); FX.skyline(g, { x, y: y + h, w, maxH: h * 0.6, color: shade(M.wall, -0.6), windowColor: alpha(M.practical, 0.6), seed: 3 }); }); });
  layer(g, cam, 0.85, (g) => { g.fillStyle = shade(M.floor, -0.3); g.fillRect(-E.W, GY(), E.W * 3, E.H); }); return { GY: GY(), M }; }
function bg(g, t, info, sp) {
  const cam = sp.cam || { z: 1 + 0.05 * ease.inOut(t / info.dur), x: (sp.drift ?? 0) * ease.inOut(t / info.dur) };
  const k = sp.bg || 'stage';
  if (k === 'bp') { bp(g); return { GY: GY(), M: mood('night'), cam }; }
  if (k === 'stage') { const r = voidStage(g, t, cam, { spots: sp.spots || (sp.figs || []).map(f => E.W * (0.5 + f.x)) }); return { ...r, cam }; }
  if (k === 'study') { const r = study(g, t, cam, {}); return { ...r, cam }; }
  if (k === 'school') { const r = school(g, t, cam, {}); return { ...r, cam }; }
  if (k === 'debate') { const r = stage(g, t, cam); return { ...r, cam }; }
  if (k === 'street') return { ...street(g, t, cam, sp), cam };
  if (k === 'cave') return { ...cave(g, t, cam, sp), cam };
  if (k === 'golf') return { ...golf(g, t, cam), cam };
  if (k === 'office') return { ...office(g, t, cam), cam };
  if (k === 'blur') { blurLayer(g, 14, (g) => voidStage(g, t, { z: 1.4, y: -140 }, {})); veil(g, '#05030a', 0.4); return { GY: GY(), M: mood('night'), cam }; }
  backdrop(g, ['#0a0608', '#140a0e']); return { GY: GY(), M: mood('night'), cam };
}

// ---------- icons ----------
function coin(g, x, y, r, t, o = {}) { const sp = o.spin ? Math.abs(Math.cos(t * o.spin)) : 1; const c = ui().gold; glow(g, x, y, r * 2.4, c, 0.5); g.save(); g.translate(x, y); g.scale(Math.max(0.08, sp), 1);
  circle(g, 0, 0, r, shade(c, -0.15)); circle(g, 0, 0, r * 0.82, c); if (sp > 0.4) text(g, '$', 0, 4, { size: r * 1.1, color: shade(c, -0.45), font: FONTS.title, weight: 700 }); g.restore(); }
function tag(g, x, y, s, str, col) { g.save(); g.translate(x, y); g.scale(s, s); seg(g, [[0, -70], [0, -20]], 3, alpha(ui().cream, 0.6)); const w = Math.max(200, str.length * 42); rr(g, -w / 2, -20, w, 100, 16); g.fillStyle = 'rgba(14,8,12,.88)'; g.fill(); g.strokeStyle = col; g.lineWidth = 5; g.stroke(); text(g, str, 0, 32, { size: 60, color: col, font: FONTS.ui, weight: 900 }); g.restore(); }
function scale(g, x, y, s, tilt, o = {}) { const c = ui().cream; g.save(); g.translate(x, y); g.scale(s, s); seg(g, [[0, 0], [0, -300]], 10, c); rr(g, -90, -10, 180, 24, 8); g.fillStyle = c; g.fill(); g.save(); g.translate(0, -300); g.rotate(tilt);
  seg(g, [[-280, 0], [280, 0]], 10, c); circle(g, 0, 0, 16, ui().gold);
  for (const sd of [-1, 1]) { g.save(); g.translate(sd * 280, 0); g.rotate(-tilt); seg(g, [[-80, 120], [0, 0], [80, 120]], 4, alpha(c, 0.7)); rr(g, -110, 120, 220, 22, 10); g.fillStyle = sd < 0 ? (o.lc || GRN) : (o.rc || ui().accent); g.fill();
    if (o.labels) text(g, o.labels[sd < 0 ? 0 : 1], 0, 175, { size: 40, color: sd < 0 ? (o.lc || GRN) : (o.rc || ui().accent), font: FONTS.ui, weight: 900 }); g.restore(); }
  g.restore(); g.restore(); }
function meter(g, x, y, s, k, label, col) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -40, -360, 80, 360, 40); g.fillStyle = 'rgba(14,8,12,.8)'; g.fill(); g.strokeStyle = alpha(col, 0.6); g.lineWidth = 4; g.stroke();
  const h = 340 * k; rr(g, -30, -10 - h, 60, h, 30); g.fillStyle = col; g.fill(); glow(g, 0, -10 - h, 80, col, 0.6); text(g, label, 0, 50, { size: 40, color: col, font: FONTS.ui, weight: 900 }); g.restore(); }
function mug(g, x, y, s, glowA = 0.4) { g.save(); g.translate(x, y); g.scale(s, s); if (glowA) glow(g, 0, -60, 260, ui().gold, glowA); rr(g, -70, -150, 140, 150, 18); g.fillStyle = '#f2ece4'; g.fill(); g.strokeStyle = '#f2ece4'; g.lineWidth = 22; g.beginPath(); g.arc(78, -78, 38, -Math.PI / 2, Math.PI / 2); g.stroke(); g.fillStyle = '#3a2418'; g.fillRect(-60, -146, 120, 14); g.fillStyle = 'rgba(0,0,0,.15)'; g.fillRect(28, -134, 30, 130); g.restore(); }
function phone(g, x, y, s, str, col) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -110, -200, 220, 400, 30); g.fillStyle = '#16121a'; g.fill(); rr(g, -96, -180, 192, 360, 18); g.fillStyle = shade(col, -0.6); g.fill(); str.split('\n').forEach((l, i, a) => text(g, l, 0, -20 * (a.length - 1) + i * 46, { size: 34, color: col, font: FONTS.ui, weight: 900 })); g.restore(); }
function banner(g, x, y, s, str, col, t) { g.save(); g.translate(x, y); g.rotate(-0.04 + 0.02 * Math.sin(t * 3)); g.scale(s, s); const w = str.length * 40 + 80; rr(g, -w / 2, -60, w, 120, 14); g.fillStyle = col; g.fill(); text(g, str, 0, 4, { size: 62, color: '#fff', font: FONTS.title, weight: 700 }); g.restore(); }
function people(g, x, y, s, n, cols, rowsN, colFn) { g.save(); g.translate(x, y); g.scale(s, s); for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols), px = (c - (cols - 1) / 2) * 34, py = (r - (rowsN - 1) / 2) * 44; const col = colFn ? colFn(i) : alpha(ui().cream, 0.8); circle(g, px, py - 10, 9, col); rr(g, px - 8, py + 2, 16, 20, 6); g.fillStyle = col; g.fill(); } g.restore(); }
function card(g, x, y, s, title, body, col, flip = 1) { const k = clamp(flip); const w = 520 * Math.max(0.02, Math.abs(Math.cos((1 - k) * Math.PI / 2))); g.save(); g.translate(x, y); g.scale(s, s); rr(g, -w / 2, -170, w, 340, 22); g.fillStyle = 'rgba(16,10,14,.92)'; g.fill(); g.strokeStyle = col; g.lineWidth = 6; g.stroke();
  if (w > 260) { text(g, title, 0, -100, { size: 46, color: col, font: FONTS.title, weight: 700 }); (body || '').split('\n').forEach((l, i) => text(g, l, 0, -10 + i * 52, { size: 38, color: ui().cream, font: FONTS.ui, weight: 900 })); } g.restore(); }
function chart(g, x, y, s, t, k, up) { g.save(); g.translate(x, y); g.scale(s, s); seg(g, [[-300, 0], [300, 0]], 4, alpha(ui().cream, 0.5)); seg(g, [[-300, 0], [-300, -300]], 4, alpha(ui().cream, 0.5)); g.strokeStyle = up ? GRN : ui().accent; g.lineWidth = 8; g.lineJoin = 'round'; g.beginPath();
  for (let i = 0; i <= 60 * k; i++) { const u = i / 60, px = -300 + u * 600, py = -150 + (up ? -1 : 1) * u * 120 - noise(i * 0.4, 5) * 60; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); g.restore(); }
function curve(g, x, y, s, k, o = {}) { const c = UI.bpStroke(), gold = ui().gold, acc = ui().accent; g.save(); g.translate(x, y); g.scale(s, s);
  seg(g, [[-420, 0], [420, 0]], 3, alpha(c, 0.7)); seg(g, [[0, -300], [0, 300]], 3, alpha(c, 0.7)); text(g, 'GAINS', 360, 34, { size: 30, color: c, font: FONTS.ui, weight: 900 }); text(g, 'LOSSES', -350, 34, { size: 30, color: c, font: FONTS.ui, weight: 900 }); text(g, 'FEELS GOOD', 0, -320, { size: 26, color: alpha(c, 0.8), font: FONTS.ui, weight: 900 }); text(g, 'FEELS BAD', 0, 330, { size: 26, color: alpha(c, 0.8), font: FONTS.ui, weight: 900 });
  g.lineWidth = 8; g.lineCap = 'round'; g.strokeStyle = GRN; g.beginPath(); for (let i = 0; i <= 50 * k; i++) { const u = i / 50 * 400; g.lineTo(u, -140 * Math.pow(u / 400, 0.6)); } g.stroke();
  g.strokeStyle = acc; g.beginPath(); for (let i = 0; i <= 50 * k; i++) { const u = i / 50 * 400; g.lineTo(-u, 280 * Math.pow(u / 400, 0.6)); } g.stroke();
  if (o.twice) { const a = clamp(o.twice); seg(g, [[300, 0], [300, -116]], 6, alpha(GRN, a)); seg(g, [[-300, 0], [-300, 232]], 6, alpha(acc, a)); text(g, '≈ 2×', -170, 180, { size: 64, color: alpha(gold, a), font: FONTS.title, weight: 700 }); }
  g.restore(); }
function bill(g, x, y, s, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); rr(g, -110, -55, 220, 110, 10); g.fillStyle = '#7fbf7a'; g.fill(); ring(g, 0, 0, 34, 4, '#3e6e3a'); text(g, '10', 0, 2, { size: 40, color: '#2e5a2a', font: FONTS.ui, weight: 900 }); g.restore(); }
function wallet(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -120, -80, 240, 160, 18); g.fillStyle = '#5a3a24'; g.fill(); rr(g, -120, -80, 240, 60, 18); g.fillStyle = '#6a4a2e'; g.fill(); text(g, 'EMPTY', 0, 30, { size: 34, color: alpha('#f2ece4', 0.7), font: FONTS.ui, weight: 900 }); g.restore(); }
function berry(g, x, y, s) { for (const [dx, dy] of [[0, 0], [22, -10], [-18, -14], [6, -30]]) circle(g, x + dx * s, y + dy * s, 14 * s, '#b0303a'); seg(g, [[x, y - 30 * s], [x + 10 * s, y - 60 * s]], 4 * s, '#3a5a2a'); }
function store(g, x, y, s, k) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -160, -140, 320, 140, 12); g.strokeStyle = alpha(ui().cream, 0.6); g.lineWidth = 6; g.stroke(); const n = Math.round(10 * k); for (let i = 0; i < n; i++) berry(g, -120 + (i % 5) * 60, -30 - Math.floor(i / 5) * 50, 1.1); g.restore(); }
function brainI(g, x, y, r, col) { g.strokeStyle = col; g.lineWidth = r * 0.08; g.lineCap = 'round'; g.beginPath(); for (let i = 0; i <= 120; i++) { const th = i / 120 * Math.PI * 2, k = 1 + 0.07 * Math.sin(th * 9); g.lineTo(x + Math.cos(th) * r * 1.15 * k, y + Math.sin(th) * r * 0.8 * k); } g.closePath(); g.stroke();
  g.beginPath(); g.moveTo(x, y - r * 0.75); g.bezierCurveTo(x + r * 0.15, y - r * 0.3, x - r * 0.2, y, x, y + r * 0.35); g.stroke(); glow(g, x, y, r * 2, col, 0.3); }
function clock(g, x, y, r, t) { ring(g, x, y, r, r * 0.08, ui().cream); seg(g, [[x, y], [x + Math.cos(t * 3) * r * 0.7, y + Math.sin(t * 3) * r * 0.7]], r * 0.07, ui().gold); seg(g, [[x, y], [x + Math.cos(t * 0.3) * r * 0.45, y + Math.sin(t * 0.3) * r * 0.45]], r * 0.09, ui().cream); }
function door(g, x, y, s, open) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -110, -360, 220, 360, 6); g.fillStyle = '#fff3d6'; g.fill(); glow(g, 0, -180, 400, '#fff3d6', 0.35 * open); poly(g, [[-110, -360], [-110 + 220 * (1 - open), -360 + 20 * open], [-110 + 220 * (1 - open), -20 * open], [-110, 0]], '#2a1e18'); g.restore(); }
function bubble2(g, x, y, s, str, col) { g.save(); g.translate(x, y); g.scale(s, s); const w = str.length * 30 + 90; rr(g, -w / 2, -60, w, 120, 60); g.fillStyle = '#f4efe6'; g.fill(); poly(g, [[-w * 0.2, 56], [-w * 0.32, 100], [-w * 0.05, 56]], '#f4efe6'); text(g, str, 0, 4, { size: 48, color: col, font: FONTS.ui, weight: 900 }); g.restore(); }
function frameBox(g, x, y, s, str) { g.save(); g.translate(x, y); g.scale(s, s); for (const [o, c] of [[0, '#8a5a2a'], [16, '#c99a5a']]) { rr(g, -360 + o, -170 + o, 720 - o * 2, 340 - o * 2, 8); g.strokeStyle = c; g.lineWidth = 18; g.stroke(); } text(g, str, 0, 4, { size: 72, color: ui().gold, font: FONTS.title, weight: 700 }); g.restore(); }

const ICONS = {
  coin: (g, x, y, s, t, k, o) => coin(g, x, y, 110 * s * k, t, o),
  coinFlip: (g, x, y, s, t, k) => coin(g, x, y - Math.sin(clamp(k) * Math.PI) * 300, 110 * s, t, { spin: 9 }),
  tag: (g, x, y, s, t, k, o) => tag(g, x, y, s * k, o.str, o.col === 'red' ? ui().accent : o.col === 'green' ? GRN : ui().gold),
  scale: (g, x, y, s, t, k, o) => scale(g, x, y, s, lerp(o.from ?? 0, o.to ?? 0, ease.inOut(k)), o),
  meter: (g, x, y, s, t, k, o) => meter(g, x, y, s, (o.v ?? 1) * ease.out(k), o.label, o.col === 'red' ? ui().accent : GRN),
  mug: (g, x, y, s, t, k) => mug(g, x, y, s * k),
  phone: (g, x, y, s, t, k, o) => phone(g, x, y, s * k, o.str, o.col === 'red' ? ui().accent : ui().gold),
  banner: (g, x, y, s, t, k, o) => banner(g, x, y, s * k, o.str, o.col === 'gold' ? shade(ui().gold, -0.2) : ui().accent, t),
  people: (g, x, y, s, t, k, o) => people(g, x, y, s, Math.round((o.n || 60) * k), o.cols || 15, Math.ceil((o.n || 60) / (o.cols || 15)), o.split ? (i) => (i % (o.cols || 15)) < (o.cols || 15) * (o.split ?? 0.5) ? alpha(o.lc === 'red' ? ui().accent : GRN, 0.9) : alpha(ui().cream, 0.5) : null),
  card: (g, x, y, s, t, k, o) => card(g, x, y, s, o.title, o.body, o.col === 'red' ? ui().accent : o.col === 'green' ? GRN : ui().gold, k),
  chart: (g, x, y, s, t, k, o) => chart(g, x, y, s, t, k, o.up),
  curve: (g, x, y, s, t, k, o) => curve(g, x, y, s, ease.inOut(k), o),
  bill: (g, x, y, s, t, k, o) => bill(g, x, y + (1 - k) * -200, s, (1 - k) * 2),
  wallet: (g, x, y, s, t, k) => wallet(g, x, y, s * k),
  berry: (g, x, y, s, t, k) => berry(g, x, y, s * k * 2),
  store: (g, x, y, s, t, k, o) => store(g, x, y, s, o.empty ? 1 - k : k),
  brain: (g, x, y, s, t, k) => brainI(g, x, y, 160 * s * k, ui().gold),
  orb: (g, x, y, s, t, k) => orb(g, x, y, 40 * s, t, k),
  clock: (g, x, y, s, t, k) => clock(g, x, y, 90 * s * k, t),
  door: (g, x, y, s, t, k) => door(g, x, y, s, k),
  bubble: (g, x, y, s, t, k, o) => bubble2(g, x, y, s * k, o.str, o.col === 'red' ? ui().accent : '#2a1e18'),
  frame: (g, x, y, s, t, k, o) => frameBox(g, x, y, s * k, o.str),
  check: (g, x, y, s, t, k) => check(g, x, y, 70 * s, k),
  cross: (g, x, y, s, t, k) => cross(g, x, y, 90 * s, k),
  coins: (g, x, y, s, t, k, o) => { const n = Math.round((o.n || 100) * k); for (let i = 0; i < n; i++) coin(g, x + ((i % 20) - 9.5) * 46 * s, y + (Math.floor(i / 20) - 2) * 46 * s, 18 * s, t, {}); },
  total: (g, x, y, s, t, k, o) => { const v = Math.round((o.v || 0) * ease.out(k)); text(g, (v >= 0 ? '+$' : '−$') + Math.abs(v), x, y, { size: 90 * s, color: v >= 0 ? GRN : ui().accent, font: FONTS.ui, weight: 900, glow: 20, glowColor: alpha(v >= 0 ? GRN : ui().accent, 0.5) }); },
  golfball: (g, x, y, s, t, k, o) => { const px = lerp(x, x + (o.dx || 0), ease.out(k)); g.setLineDash([12, 12]); seg(g, [[x, y], [x + (o.dx || 0), y]], 4, alpha('#f2ece4', 0.5)); g.setLineDash([]); circle(g, px, y, 16 * s, '#ffffff'); },
};

// ---------- the generic shot ----------
export function shot(id, sp) {
  registerShot(id, { draw(g, t, info) {
    let sh = [0, 0]; if (sp.shake) { const ts = cueT(sp.shake, info, 0.4); if (t > ts) sh = shake(t, 14 * (1 - prog(t, ts, ts + 0.8)), 24); }
    const { GY: gy, M, cam } = bg(g, t, info, sp); g.save(); g.translate(sh[0], sh[1]);
    const S0 = V(1.5, 1.6);
    if (sp.drawFirst) sp.drawFirst(g, t, info, { GY: gy, M, cam, cue: (c, fb) => cueT(c, info, fb) });
    if (sp.figs) layer(g, cam, 1, (g) => sp.figs.forEach((f, i) => { const tp = f.at != null ? cueT(f.at, info, 0.5) : 0; const pose = f.pose2 && t > tp ? POSES[f.pose2] : POSES[f.pose || 'stand'];
      const walk = f.walk ? walkPose(t * Math.PI * 2 * (f.walk > 1 ? 1.6 : 0.9), { run: f.walk > 1 }) : null;
      drawFigure(g, { x: E.W * (0.5 + f.x) + (f.walkDx || 0) * t, y: gy, s: (f.s || 1) * S0, facing: f.facing || 1, outfit: CAST[f.o], pose: walk || breathe(pose, t, 1, i + 1), expr: f.expr2 && t > tp ? f.expr2 : f.expr || 'neutral', prop: f.prop, rim: { color: M.rim, dir: [0, -1], w: 5 }, blink: (t % (2.7 + i * 0.4)) > 2.6 + i * 0.4, talk: f.talk ? (Math.sin(t * 16) > 0 ? 0.7 : 0.1) : 0 }); }));
    if (sp.face) { const f = sp.face, tp = f.at != null ? cueT(f.at, info, 0.5) : 0; bigFace(g, E.W * (0.5 + (f.x || 0)), E.H * (f.y || 0.6), (f.r || 300) * (1 + 0.04 * t / info.dur), { outfit: CAST[f.o], expr: f.expr2 && t > tp ? f.expr2 : f.expr, look: f.look || [0, 0], rimColor: M.rim, rimSide: f.side || 1, blink: (t % 2.6) > 2.5 }); }
    (sp.icons || []).forEach(([name, x, y, s, cue, o = {}]) => { const tc = cueT(cue, info, 0.2); const k = o.dur ? prog(t, tc, tc + o.dur) : ease.outBack(prog(t, tc - 0.05, tc + 0.3)); if (k <= 0 && !o.always) return; ICONS[name](g, E.W * x, E.H * y, s || 1, t, o.always ? Math.max(k, o.always) : k, o); });
    (sp.pops || []).forEach(([cue, str, x, y, size, col]) => pop(g, t, str, E.W * x, E.H * y, cueT(cue, info, 0.2), { size: size || 64, color: col === 'red' ? ui().accent : col === 'green' ? GRN : col === 'cream' ? ui().cream : ui().gold }));
    sp.draw?.(g, t, info, { GY: gy, M, cam, cue: (c, fb) => cueT(c, info, fb) });
    if (sp.line) UI.bigLine(g, t - 0.1, { str: sp.line, dur: info.dur + 0.4, y: E.H * (sp.lineY || 0.45), size: sp.lineSize || 110 });
    if (sp.serif) sp.serif.forEach(([cue, str, y, col]) => { const a = ease.out(prog(t, cueT(cue, info, 0.2) - 0.2, cueT(cue, info, 0.2) + 0.3)); text(g, str, E.W / 2, E.H * y, { size: 72, font: FONTS.serif, weight: 900, italic: true, color: col === 'gold' ? ui().gold : ui().cream, alpha: a, glow: 18, glowColor: alpha(ui().gold, 0.5) }); });
    g.restore();
    if (sp.lower) lowerThird(g, t, sp.lower[0], sp.lower[1], 0.4);
    if (sp.badge) UI.badge(g, { str: sp.badge[1], a: ease.out(prog(t, cueT(sp.badge[0], info, 0.3), cueT(sp.badge[0], info, 0.3) + 0.4)), size: 60 });
    if (sp.freeze) { g.save(); g.globalCompositeOperation = 'soft-light'; g.fillStyle = 'rgba(80,120,255,.3)'; g.fillRect(0, 0, E.W, E.H); g.restore(); }
    if (sp.bg !== 'bp' && sp.dust !== false) FX.dust(g, t, { count: 30, a: 0.3 });
  } });
}
