// shots/specs.js — reel: "What if MrBeast gave you $1,000,000… but you could never tell anyone?" (9:16)
import { E, S, ease, prog, clamp, lerp, seg, circle, ring, rr, poly, glow, alpha, shade, text, FONTS, shake } from '/engine/core.js';
import { bigFace, drawFigure, POSES } from '/engine/rig2d.js';
import { shot } from './_kit.js';
import { car, GRN } from './_m.js';
import * as CAST from '../cast.js';
const ui = () => S().ui;
const PW = '#3fb0ff';
// slammed impact caption (meme style: white, thick black stroke)
function slam(g, t, at, str, y, size = 130, col = '#ffffff') { const k = prog(t, at, at + 0.18); if (k <= 0) return; const sc = 1 + 0.6 * (1 - ease.out(k));
  const sz = Math.min(size, (E.W * 0.8) / Math.max(1, str.length * 0.62));
  g.save(); g.translate(E.W / 2, E.H * y); g.scale(sc, sc); text(g, str, 0, 0, { size: sz, color: col, font: FONTS.title, weight: 700, stroke: sz * 0.2, strokeColor: '#000', alpha: clamp(k * 1.5) }); g.restore(); }
// time card that slams in
function card(g, t, str) { const k = ease.outBack(prog(t, 0, 0.2)); g.save(); g.translate(E.W / 2, E.H * 0.13); g.scale(k, k); g.rotate(-0.04); rr(g, -300, -80, 600, 160, 24); g.fillStyle = ui().accent; g.fill(); g.lineWidth = 10; g.strokeStyle = '#000'; g.stroke();
  text(g, str, 0, 6, { size: 96, color: '#fff', font: FONTS.title, weight: 700, stroke: 14, strokeColor: '#000' }); g.restore(); }
// secret pressure meter (fills over the whole reel)
function meter(g, t, info, burst) { const T = info.shot.start + t, v = clamp(T / 37); const x = E.W * 0.92, y0 = E.H * 0.7, H = E.H * 0.22;
  rr(g, x - 26, y0 - H, 52, H, 26); g.fillStyle = 'rgba(0,0,0,.6)'; g.fill(); g.lineWidth = 6; g.strokeStyle = '#fff'; g.stroke();
  const col = v > 0.75 ? ui().accent : v > 0.4 ? ui().gold : GRN, h = (H - 16) * v, jit = v > 0.75 ? Math.sin(T * 40) * 4 : 0;
  rr(g, x - 18 + jit, y0 - 8 - h, 36, h, 18); g.fillStyle = col; g.fill(); glow(g, x, y0 - h, 90, col, 0.5);
  g.save(); g.translate(x, y0 + 60); text(g, 'SECRET', 0, 0, { size: 26, color: '#fff', font: FONTS.ui, weight: 900, stroke: 6, strokeColor: '#000' }); text(g, 'PRESSURE', 0, 30, { size: 26, color: '#fff', font: FONTS.ui, weight: 900, stroke: 6, strokeColor: '#000' }); g.restore(); }
function money(g, x, y, s, t) { g.save(); g.translate(x, y); g.scale(s, s); for (let i = 0; i < 6; i++) { g.save(); g.translate((i % 3 - 1) * 70, -Math.floor(i / 3) * 40); rr(g, -110, -50, 220, 100, 10); g.fillStyle = '#5fbf6a'; g.fill(); g.lineWidth = 5; g.strokeStyle = '#1e5a26'; g.stroke(); text(g, '$', 0, 4, { size: 70, color: '#1e5a26', font: FONTS.title, weight: 700 }); g.restore(); } g.restore(); }
function sandwich(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); poly(g, [[-160, 0], [160, 0], [0, -150]], '#e8c27a'); poly(g, [[-150, 14], [150, 14], [0, -126]], '#7cc24a'); poly(g, [[-150, 28], [150, 28], [0, -110]], '#8ad04a'); poly(g, [[-160, 44], [160, 44], [0, -100]], '#e8c27a'); g.restore(); }
function dog(g, x, y, s, t, o = {}) { g.save(); g.translate(x, y); g.scale(s * (o.flip || 1), s); const c = '#c98a4a', d = '#7a4a22';
  rr(g, -120, -120, 240, 110, 50); g.fillStyle = c; g.fill(); for (const lx of [-90, -40, 50, 95]) { rr(g, lx - 14, -30, 28, 70, 12); g.fill(); }
  g.save(); g.translate(130, -140); g.rotate(Math.sin(t * 3) * 0.08); circle(g, 0, 0, 70, c); poly(g, [[-55, -30], [-80, 50], [-30, 10]], d); poly(g, [[45, -30], [75, 50], [30, 10]], d); circle(g, -22, -10, 10, '#000'); circle(g, 26, -10, 10, '#000'); circle(g, 50, 20, 14, '#000');
  if (o.talk && Math.sin(t * 14) > 0) rr(g, 10, 34, 40, 18, 8), g.fillStyle = '#000', g.fill(); g.restore();
  g.save(); g.translate(-120, -90); g.rotate(-0.6 + Math.sin(t * 16) * 0.4); rr(g, -70, -10, 70, 20, 10); g.fillStyle = c; g.fill(); g.restore(); g.restore(); }
function bush(g, x, y, s, t) { g.save(); g.translate(x, y); g.scale(s, s); for (const [dx, dy, r] of [[-120, -60, 110], [0, -110, 130], [120, -60, 110], [-60, -10, 100], [70, -10, 100]]) circle(g, dx + Math.sin(t * 9 + dx) * 4, dy, r, '#2f6a32'); for (const [dx, dy] of [[-80, -90], [40, -150], [100, -40]]) circle(g, dx, dy, 30, '#3f8a42'); g.restore(); }
function blanketCar(g, x, y, s, t) { g.save(); g.translate(x, y); g.scale(s, s); car(g, 0, 0, 1.6, '#d64a33'); g.beginPath(); g.moveTo(-300, 40); g.bezierCurveTo(-310, -120, -200, -230, -40, -230); g.bezierCurveTo(140, -230, 200, -120, 300, -90); g.lineTo(320, 40);
  for (let i = 0; i < 8; i++) g.lineTo(320 - i * 88, 40 + (i % 2) * 22); g.closePath(); g.fillStyle = '#8a6ad6'; g.fill(); g.lineWidth = 8; g.strokeStyle = '#4a3a7a'; g.stroke();
  for (let i = 0; i < 5; i++) { g.strokeStyle = alpha('#4a3a7a', 0.6); g.lineWidth = 6; g.beginPath(); g.moveTo(-220 + i * 110, -150 + Math.abs(i - 2) * 30); g.quadraticCurveTo(-190 + i * 110, -40, -230 + i * 110, 30); g.stroke(); }
  circle(g, -230, 14, 50, '#121014'); circle(g, 230, 14, 50, '#121014'); g.restore(); }
// small shared extras
const M = (sp) => ({ ...sp, draw(g, t, info, o) { sp.draw0?.(g, t, info, o); if (sp.card) card(g, t, sp.card); (sp.slams || []).forEach(([c, s, y, z, col]) => slam(g, t, typeof c === 'number' ? c : o.cue(c), s, y, z, col)); if (!sp.noMeter) meter(g, t, info); } });

shot('R01', M({ bg: 'blur', noMeter: true, face: { o: 'BEAST', expr: 'joy', r: 340, y: 0.42 }, draw0(g, t, i, { cue }) { const k = ease.outBack(prog(t, cue('million'), cue('million') + 0.3)); if (k > 0) money(g, E.W / 2, E.H * 0.8, 1.4 * k, t); },
  slams: [[0.05, 'WHAT IF MRBEAST', 0.1, 92], ['million', 'GAVE YOU $1,000,000', 0.17, 92, '#5fd17a']] }));
shot('R02', M({ bg: 'black', face: { o: 'YOU', expr: 'shocked', r: 330, y: 0.55 }, draw0(g, t, i, { cue }) { if (t > cue('never')) { const k = ease.out(prog(t, cue('never'), cue('never') + 0.25)); g.save(); g.translate(E.W / 2, E.H * 0.63); g.scale(k, k); rr(g, -260, -40, 520, 80, 20); g.fillStyle = '#000'; g.fill(); g.restore(); } },
  slams: [['never', 'BUT YOU CAN', 0.13, 110], ['tell', 'NEVER TELL ANYONE', 0.2, 100, '#ff4a3a']] }));
shot('R03', M({ bg: 'stage', card: 'HOUR 1', figs: [{ x: 0, o: 'YOU', expr: 'smile', pose: 'relaxed' }], slams: [['fine', "YOU'RE FINE", 0.3, 110], ['Totally', 'TOTALLY NORMAL', 0.38, 90, '#ffd94a']] }));
shot('R04', M({ bg: 'blur', face: { o: 'YOU', expr: 'happy', r: 260, y: 0.4 }, draw0(g, t, i, { cue }) { const k = ease.outBack(prog(t, cue('sandwich'), cue('sandwich') + 0.3)); if (k > 0) sandwich(g, E.W / 2, E.H * 0.72, 1.6 * k);
  if (t > cue('guac')) { for (let j = 0; j < 14; j++) { const a = j * 0.45, r = 300 * ease.out(prog(t, cue('guac'), cue('guac') + 0.6)); circle(g, E.W / 2 + Math.cos(a) * r, E.H * 0.68 + Math.sin(a) * r * 0.7, 18, '#7cc24a'); } } },
  slams: [['guac', 'WITH GUAC', 0.88, 120, '#7cc24a']] }));
shot('R05', M({ bg: 'school', card: 'HOUR 3', figs: [{ x: -0.18, o: 'YOU', expr: 'joy' }, { x: 0.2, o: 'STU1', facing: -1, expr: 'confused', talk: true, pose: 'talk' }], slams: [['smiling', '"BRO WHY ARE YOU', 0.28, 80], ['smiling', 'SMILING LIKE THAT"', 0.34, 80, '#ffd94a']] }));
shot('R06', M({ bg: 'street', card: 'DAY 2', draw0(g, t, i, { cue }) { const k = ease.outBack(prog(t, cue('car'), cue('car') + 0.3)); if (k > 0) car(g, E.W / 2, E.H * 0.74, 1.6 * k, '#d64a33'); }, slams: [['brand', 'BRAND NEW CAR', 0.3, 110, '#ff4a3a']] }));
shot('R07', M({ bg: 'street', draw0(g, t) { blanketCar(g, E.W / 2, E.H * 0.74, 1, t); }, slams: [['blanket', 'UNDER A BLANKET', 0.3, 100]] }));
shot('R08', M({ bg: 'street', figs: [{ x: -0.25, o: 'MUM', pose: 'point', expr: 'confused', talk: true }], draw0(g, t) { blanketCar(g, E.W * 0.62, E.H * 0.74, 0.7, t); }, slams: [['asks', '"WHAT IS THAT?"', 0.3, 100, '#ffd94a']] }));
shot('R09', M({ bg: 'blur', face: { o: 'YOU', expr: 'nervous', r: 300, y: 0.5 }, slams: [['big', "IT'S A", 0.2, 110], ['cat', 'VERY BIG CAT', 0.27, 120, '#ffd94a']] }));
shot('R10', M({ bg: 'study', card: 'DAY 4', figs: [{ x: 0, o: 'YOU', pose: 'sit', expr: 'worried' }], draw0(g, t) { for (let j = 0; j < 3; j++) text(g, 'z', E.W * (0.55 + j * 0.06), E.H * (0.45 - j * 0.05) - (t * 40) % 60, { size: 60 + j * 10, color: alpha('#fff', 0.4), font: FONTS.title, weight: 700 }); }, slams: [['sleep', "YOU CAN'T SLEEP", 0.28, 100]] }));
shot('R11', M({ bg: 'bp', icons: [['brain', 0.5, 0.45, 2.2, 0.1]], draw0(g, t, i, { cue }) { const n = Math.floor(t * 3); for (let j = 0; j < Math.min(n, 12); j++) { const a = j * 2.4, r = 380 + (j % 3) * 60; text(g, '$1M', E.W / 2 + Math.cos(a) * r * 0.75, E.H * 0.45 + Math.sin(a) * r, { size: 54, color: '#5fd17a', font: FONTS.title, weight: 700, stroke: 8, strokeColor: '#000' }); } },
  slams: [[0.2, 'SCIENCE SAYS:', 0.12, 80, '#ffd94a'], ['secret', 'SECRETS LIVE', 0.76, 96], ['time', 'IN YOUR HEAD', 0.83, 96, '#ff4a3a']] }));
shot('R12', M({ bg: 'blur', face: { o: 'YOU', expr: 'cry', r: 300, y: 0.5 }, slams: [['yeah', 'SO YEAH', 0.18, 100], ['cooked', "YOU'RE COOKED", 0.82, 120, '#ff4a3a']], shake: 'cooked' }));
shot('R13', M({ bg: 'black', card: 'DAY 5', face: { o: 'YOU', expr: 'scared', r: 300, y: 0.55 }, shake: 'crack', draw0(g, t, i, { cue }) { if (t > cue('crack')) { const k = prog(t, cue('crack'), cue('crack') + 0.3); g.strokeStyle = '#fff'; g.lineWidth = 10; g.beginPath(); g.moveTo(E.W * 0.3, 0); g.lineTo(E.W * 0.45, E.H * 0.3 * k); g.lineTo(E.W * 0.38, E.H * 0.5 * k); g.lineTo(E.W * 0.55, E.H * 0.9 * k); g.stroke(); } },
  slams: [['crack', 'YOU CRACK', 0.85, 140, '#ff4a3a']] }));
shot('R14', M({ bg: 'study', figs: [{ x: -0.2, o: 'YOU', pose: 'crouch', expr: 'nervous' }], draw0(g, t, i, { cue }) { dog(g, E.W * 0.68, E.H * 0.8, 1.1, t, { flip: -1 }); if (t > cue('dog')) { const k = ease.outBack(prog(t, cue('dog'), cue('dog') + 0.3)); g.save(); g.translate(E.W * 0.5, E.H * 0.42); g.scale(k, k); rr(g, -260, -60, 520, 120, 60); g.fillStyle = '#f4efe6'; g.fill(); text(g, '"I GOT A MILLION"', 0, 4, { size: 44, color: '#2a1e18', font: FONTS.ui, weight: 900 }); g.restore(); } },
  slams: [['trust', 'THE ONLY ONE YOU TRUST', 0.2, 80], ['dog', 'YOUR DOG', 0.27, 120, '#ffd94a']] }));
shot('R15', M({ bg: 'school', card: 'DAY 6', draw0(g, t, i, { cue }) { const n = 7; for (let j = 0; j < n; j++) { const x = E.W * (0.12 + j * 0.13); drawFigure(g, { x, y: E.H * 0.8, s: 1.1, facing: j < 3 ? 1 : -1, outfit: CAST[['STU1', 'STU2', 'KID', 'PALMER', 'MUM', 'STU1', 'STU2'][j]], pose: POSES.phone, prop: 'phone', expr: 'shocked' }); }
  dog(g, E.W * 0.5, E.H * 0.93, 0.6, t, { talk: true }); }, slams: [['Somehow', 'SOMEHOW...', 0.28, 110], ['knows', 'THE WHOLE SCHOOL KNOWS', 0.36, 76, '#ff4a3a']] }));
shot('R16', M({ bg: 'street', draw0(g, t, i, { cue }) { const k = ease.outBack(prog(t, cue('steps'), cue('steps') + 0.4)); drawFigure(g, { x: E.W * 0.5, y: E.H * 0.7 + (1 - k) * 400, s: 1.5, facing: -1, outfit: CAST.BEAST, pose: POSES.crossArms, expr: 'smirk' }); bush(g, E.W * 0.5, E.H * 0.84, 1.6, t); },
  slams: [['MrBeast', 'MRBEAST...', 0.25, 110, '#3fb0ff'], ['bush', 'FROM BEHIND A BUSH', 0.32, 80]] }));
shot('R17', M({ bg: 'blur', noMeter: true, face: { o: 'BEAST', expr: 'smirk', r: 360, y: 0.5 }, shake: 'dog', slams: [['told', '"YOU TOLD', 0.15, 130], ['dog', 'THE DOG."', 0.23, 140, '#ffd94a']] }));
