// shots/specs.js — "Why We Fall for People Who Live Nearby", part 1 (test).
import { E, S, ease, prog, clamp, lerp, seg, circle, ring, rr, poly, glow, alpha, shade, mix, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, walkPose } from '/engine/rig2d.js';
import { shot } from './_kit.js';
import * as CAST from '../cast.js';

const ui = () => S().ui;
// ---- apartment block cross-section: 2 floors × 6 doors, stairs + mailboxes at the left ----
const DOORS = [], BW = 1500, BX = () => E.W / 2 - BW / 2;
for (let f = 0; f < 2; f++) for (let i = 0; i < 6; i++) DOORS.push([f, i]);
const doorXY = (f, i) => [BX() + 300 + i * 200, E.H * (f ? 0.42 : 0.78)];
function building(g, t, o = {}) {
  const M = { wall: '#3a2226', dark: '#140a0e' }, x0 = BX(), top = E.H * 0.1;
  rr(g, x0, top, BW, E.H * 0.72, 8); g.fillStyle = shade(M.wall, -0.2); g.fill();
  for (const y of [E.H * 0.44, E.H * 0.8]) { g.fillStyle = shade(M.wall, -0.5); g.fillRect(x0, y, BW, 14); }
  // stairs
  g.strokeStyle = alpha(ui().cream, 0.6); g.lineWidth = 6; g.beginPath(); for (let k = 0; k <= 8; k++) { const sx = x0 + 40 + k * 22, sy = E.H * 0.8 - k * 38; g.lineTo(sx, sy); g.lineTo(sx + 22, sy); } g.stroke();
  if (o.stairs) glow(g, x0 + 130, E.H * 0.6, 220, ui().gold, 0.35 * o.stairs);
  text(g, 'STAIRS', x0 + 130, E.H * 0.86, { size: 26, color: alpha(ui().cream, 0.7), font: FONTS.ui, weight: 900 });
  for (let k = 0; k < 3; k++) { rr(g, x0 + 230, E.H * 0.6 + k * 34, 46, 28, 4); g.fillStyle = '#6a5a4a'; g.fill(); }
  if (o.mail) glow(g, x0 + 253, E.H * 0.65, 120, ui().gold, 0.4 * o.mail);
  DOORS.forEach(([f, i], n) => { const [dx, dy] = doorXY(f, i); const lit = o.lit ? o.lit(f, i) : 0.5;
    rr(g, dx - 50, dy - 150, 100, 150, 6); g.fillStyle = mix('#2a1a16', '#ffd28a', lit * 0.7); g.fill(); circle(g, dx + 30, dy - 70, 5, '#c99a5a');
    if (o.fam) { const k = clamp(o.fam * 12 - n); if (k > 0) { circle(g, dx, dy - 200, 16 * k, ui().cream); } } });
  (o.links || []).forEach(([a, b, w, k]) => { if (k <= 0) return; const [ax, ay] = doorXY(...a), [bx, by] = doorXY(...b), mx = (ax + bx) / 2; g.strokeStyle = alpha(ui().gold, 0.9); g.lineWidth = w; g.beginPath(); g.moveTo(ax, ay - 170); g.quadraticCurveTo(mx, ay - 170 - 80 - Math.abs(bx - ax) * 0.15, lerp(ax, bx, k), lerp(ay, by, k) - 170); g.stroke(); });
}
function hall(g, t, o = {}) { const y = E.H * 0.8; g.fillStyle = '#2a1a1c'; g.fillRect(0, E.H * 0.15, E.W, y - E.H * 0.15); g.fillStyle = '#1a0e10'; g.fillRect(0, y, E.W, E.H - y);
  for (let i = 0; i < 6; i++) { const dx = E.W * (0.1 + i * 0.16); rr(g, dx - 60, y - 280, 120, 280, 6); g.fillStyle = mix('#3a2420', '#ffd28a', o.lit?.(i) ?? 0.15); g.fill(); circle(g, dx + 36, y - 140, 6, '#c99a5a'); text(g, String(101 + i), dx, y - 300, { size: 30, color: alpha(ui().cream, 0.6), font: FONTS.ui, weight: 900 }); } return y; }
function bus(g, x, y, s, t) { g.save(); g.translate(x + Math.sin(t * 8) * 2, y); g.scale(s, s); rr(g, -420, -260, 840, 230, 30); g.fillStyle = '#d8a020'; g.fill(); for (let i = 0; i < 6; i++) { rr(g, -380 + i * 130, -230, 100, 90, 10); g.fillStyle = '#ffe8b0'; g.fill(); if (i === 2 || i === 3) { circle(g, -330 + i * 130, -170, 22, '#140a0e'); } }
  for (const wx of [-260, 260]) { circle(g, wx, -30, 48, '#140a0e'); circle(g, wx, -30, 18, '#6a5a4a'); } g.restore(); }
function desks(g, n, y, pairs) { for (let i = 0; i < n; i++) { const x = E.W * (0.15 + i * 0.14); rr(g, x - 70, y - 120, 140, 16, 4); g.fillStyle = '#5a3a24'; g.fill(); seg(g, [[x - 60, y - 110], [x - 60, y]], 6, '#3a2618'); seg(g, [[x + 60, y - 110], [x + 60, y]], 6, '#3a2618'); } }

// --- hook ---
shot('P01', { bg: 'stage', figs: [{ x: -0.3, o: 'CHESS', expr: 'happy', pose: 'wave' }, { x: 0, o: 'YOU', expr: 'smile', pose: 'stand' }, { x: 0.3, o: 'LOVE', expr: 'happy', pose: 'wave', facing: -1 }], pops: [['important', 'YOUR PEOPLE', 0.5, 0.14, 70]] });
shot('P02', { bg: 'stage', figs: [{ x: -0.15, o: 'YOU', expr: 'joy', pose: 'cheer' }, { x: 0.15, o: 'CHESS', expr: 'joy', pose: 'cheer', facing: -1 }], pops: [['friend.', 'BEST FRIEND', 0.5, 0.18, 80]] });
shot('P03', { bg: 'stage', figs: [{ x: -0.15, o: 'YOU', expr: 'happy', pose: 'stand' }, { x: 0.15, o: 'LOVE', expr: 'happy', pose: 'stand', facing: -1 }], icons: [['orb', 0.5, 0.3, 1.2, 'love.']], pops: [['love.', 'FIRST LOVE', 0.5, 0.14, 80, 'red']] });
shot('P04', { bg: 'stage', figs: [{ x: -0.07, o: 'YOU', expr: 'smile', pose: 'relaxed' }, { x: 0.07, o: 'LOVE', expr: 'smile', pose: 'relaxed', facing: -1 }], icons: [['orb', 0.5, 0.32, 1.0, 0.1]], pops: [['now.', 'RIGHT NOW', 0.5, 0.14, 70, 'cream']] });
shot('P05', { bg: 'stage', figs: [{ x: 0, o: 'YOU', expr: 'thinking', pose: 'think' }], pops: [['strange', 'A STRANGE QUESTION', 0.5, 0.14, 64, 'cream']] });
shot('P06', { bg: 'blur', face: { o: 'YOU', expr: 'thinking', x: -0.15, r: 300, look: [0.5, -0.4] }, pops: [['meet', 'HOW DID YOU', 0.74, 0.32, 70, 'cream'], ['meet', 'MEET THEM?', 0.74, 0.44, 80]] });
shot('P07', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.2, 0.05, { title: 'FATE', body: 'written in the stars?', col: 'gold', dur: 0.4 }], ['cross', 0.5, 0.48, 1.6, 'fate.']] });
shot('P08', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.2, 0.05, { title: 'DESTINY', body: 'meant to be?', col: 'gold', dur: 0.3 }], ['cross', 0.5, 0.48, 1.6, 'destiny.']] });
shot('P09', { bg: 'stage', line: 'DISTANCE', lineSize: 190 });
shot('P10', { bg: 'school', figs: [{ x: -0.08, o: 'YOU', expr: 'smile', pose: 'sit' }, { x: 0.08, o: 'LOVE', expr: 'smile', pose: 'sit', facing: -1 }], pops: [['near', 'SAT NEAR THEM', 0.5, 0.12, 60, 'cream']] });
shot('P11', { bg: 'black', draw: (g, t) => { const y = hall(g, t, { lit: (i) => (i === 2 || i === 3 ? 0.8 : 0.15) }); drawFigure(g, { x: E.W * 0.42, y, s: 1.3, outfit: CAST.YOU, pose: POSES.wave, expr: 'happy', rim: { color: '#ffcf8f', dir: [0, -1] } }); drawFigure(g, { x: E.W * 0.6, y, s: 1.3, facing: -1, outfit: CAST.LOVE, pose: POSES.wave, expr: 'happy', rim: { color: '#ffcf8f', dir: [0, -1] } }); }, pops: [['hall.', 'DOWN THE HALL', 0.5, 0.08, 60]] });
shot('P12', { bg: 'street', draw: (g, t, info, c) => bus(g, E.W * 0.5, c.GY, 1.1, t), pops: [['bus,', 'SAME BUS', 0.5, 0.15, 70]] });
shot('P13', { bg: 'office', figs: [{ x: -0.15, o: 'YOU', expr: 'smile', pose: 'holdFront', prop: 'tablet' }, { x: 0.15, o: 'NURSE', expr: 'smile', pose: 'talk', facing: -1 }], pops: [['shift,', 'SAME SHIFT', 0.5, 0.12, 70]] });
shot('P14', { bg: 'study', figs: [{ x: -0.15, o: 'YOU', expr: 'surprised', pose: 'holdFront', prop: 'cup', at: 'shop.', expr2: 'happy' }, { x: 0.15, o: 'LOVE', expr: 'happy', pose: 'holdFront', prop: 'cup', facing: -1 }], pops: [['running', 'AGAIN…', 0.3, 0.12, 54, 'cream'], ['coffee', '…AND AGAIN', 0.7, 0.12, 54, 'cream']] });
shot('P15', { bg: 'stage', figs: [{ x: -0.2, o: 'YOU', expr: 'confused', pose: 'shrug' }], pops: [['simple', 'TOO SIMPLE?', 0.65, 0.35, 90, 'cream']] });
shot('P16', { bg: 'bp', icons: [['card', 0.3, 0.45, 0.7, 'decades', { title: '1950s', body: 'study', col: 'gold' }], ['card', 0.5, 0.5, 0.7, 'research', { title: '1970s', body: 'study', col: 'gold' }], ['card', 0.7, 0.55, 0.7, 'point', { title: '2010s', body: 'study', col: 'gold' }], ['orb', 0.5, 0.86, 1.2, 'force']], pops: [['decades', 'DECADES OF RESEARCH', 0.5, 0.1, 60, 'cream']] });
shot('P17', { bg: 'stage', pops: [['befriend,', 'FRIENDS', 0.2, 0.45, 80, 'cream'], ['date,', 'DATING', 0.5, 0.45, 80, 'red'], ['marry.', 'MARRIAGE', 0.8, 0.45, 80]] });
shot('P18', { bg: 'stage', line: 'THE PROXIMITY EFFECT', lineSize: 130 });
shot('P19', { bg: 'stage', figs: [{ x: -0.2, o: 'YOU', expr: 'surprised', pose: 'stand', at: 'never', expr2: 'awe' }], icons: [['orb', 0.62, 0.42, 1.6, 'one']], pops: [['one', '"THE ONE"?', 0.62, 0.16, 80]] });
// --- Westgate West ---
shot('P20', { bg: 'black', draw: (g, t) => building(g, t, {}), badge: ['1950', '1950'], lower: ['MIT · MARRIED STUDENT HOUSING', 'CAMBRIDGE, MASSACHUSETTS'] });
shot('P21', { bg: 'black', cam: { z: 1.1 }, draw: (g, t) => building(g, t, {}), pops: [['Westgate', 'WESTGATE WEST', 0.5, 0.06, 64]] });
shot('P22', { bg: 'black', draw: (g, t, info, c) => building(g, t, { fam: clamp((t - c.cue('random.', 1.0)) / 2) }), pops: [['random.', 'ASSIGNED AT RANDOM', 0.5, 0.06, 56, 'cream'], ['Nobody', 'NOBODY CHOSE THEIR NEIGHBOURS', 0.5, 0.93, 44, 'red']] });
shot('P23', { bg: 'bp', icons: [['check', 0.5, 0.42, 1.8, 'perfect']], pops: [['natural', 'A PERFECT NATURAL EXPERIMENT', 0.5, 0.75, 60]] });
shot('P24', { bg: 'study', figs: [{ x: -0.25, o: 'FESTINGER', expr: 'thinking', pose: 'holdFront', prop: 'paper' }, { x: 0, o: 'SCHACHTER', expr: 'smile', pose: 'explain' }, { x: 0.25, o: 'BACK', expr: 'thinking', pose: 'holdFront', prop: 'paper', facing: -1 }], lower: ['FESTINGER, SCHACHTER & BACK', 'PSYCHOLOGISTS'] });
shot('P25', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.3, 0.05, { title: 'QUESTION', body: 'Who are your closest\nfriends here?', col: 'gold', dur: 0.4 }]] });
shot('P26', { bg: 'blur', face: { o: 'FESTINGER', expr: 'surprised', x: -0.1, r: 300 }, pops: [['startling.', 'STARTLING', 0.78, 0.35, 80, 'red']] });
shot('P27', { bg: 'black', draw: (g, t, info, c) => { const a = c.cue('next', 1.0), b = c.cue('two', 3.5); building(g, t, { lit: (f, i) => (f === 0 && i === 2 ? 1 : 0.4), links: [[[0, 2], [0, 3], 14, prog(t, a, a + 0.6)], [[0, 2], [0, 4], 3, prog(t, b, b + 0.6)]] }); }, pops: [['next', 'NEXT DOOR: CLOSE FRIENDS', 0.5, 0.06, 48], ['two', 'TWO DOORS AWAY: FAR FEWER', 0.5, 0.93, 44, 'cream']] });
shot('P28', { bg: 'bp', draw: (g, t, info, c) => { const k = ease.inOut(prog(t, 0.3, 3.5)), x0 = E.W * 0.18, x1 = E.W * 0.82, y0 = E.H * 0.8, y1 = E.H * 0.22; seg(g, [[x0, y0], [x1, y0]], 4, alpha(ui().cream, 0.6)); seg(g, [[x0, y0], [x0, y1]], 4, alpha(ui().cream, 0.6));
  g.strokeStyle = ui().gold; g.lineWidth = 8; g.beginPath(); for (let i = 0; i <= 60 * k; i++) { const u = i / 60; g.lineTo(lerp(x0, x1, u), lerp(y0, y1, Math.exp(-u * 4))); } g.stroke();
  text(g, 'DISTANCE BETWEEN DOORS →', (x0 + x1) / 2, y0 + 50, { size: 34, color: ui().cream, font: FONTS.ui, weight: 900 }); text(g, 'FRIENDSHIP', x0, y1 - 30, { size: 34, color: ui().cream, font: FONTS.ui, weight: 900 }); }, pops: [['sharply', 'DROPS OFF SHARPLY', 0.62, 0.35, 56, 'red']] });
shot('P29', { bg: 'stage', line: 'BUT HERE\'S THE SURPRISE', lineSize: 100 });
shot('P30', { bg: 'stage', pops: [['physical', 'NOT JUST DISTANCE…', 0.5, 0.45, 80, 'cream']] });
shot('P31', { bg: 'black', draw: (g, t) => { const y = hall(g, t, {}); for (let i = 0; i < 3; i++) { const x = ((t * 260 + i * 640) % (E.W + 200)) - 100; drawFigure(g, { x, y, s: 1.1, outfit: [CAST.CHESS, CAST.NURSE, CAST.EXPERT][i], pose: walkPose(t * Math.PI * 2 * 0.9 + i), expr: 'neutral', rim: { color: '#ffcf8f', dir: [0, -1] } }); }
  g.setLineDash([14, 14]); seg(g, [[0, y + 40], [E.W, y + 40]], 4, alpha(ui().gold, 0.7)); g.setLineDash([]); }, pops: [['paths', '…HOW OFTEN PATHS CROSS', 0.5, 0.08, 60]] });
shot('P32', { bg: 'black', draw: (g, t, info, c) => { const ts = c.cue('stairs', 0.8), tm = c.cue('mailboxes', 1.8), k = prog(t, tm + 0.5, tm + 1.5);
  building(g, t, { stairs: prog(t, ts, ts + 0.4), mail: prog(t, tm, tm + 0.4), lit: (f, i) => (i === 0 ? 0.4 + 0.6 * prog(t, ts, ts + 0.6) : 0.25), links: [[[0, 0], [0, 3], 6, k], [[0, 0], [1, 2], 6, k], [[0, 0], [0, 5], 6, k], [[1, 0], [1, 4], 6, k], [[1, 0], [0, 2], 6, k]] }); }, pops: [['friends', 'MOST FRIENDS', 0.5, 0.06, 56]] });
shot('P33', { bg: 'black', draw: (g, t) => { const y = hall(g, t, { lit: (i) => (i === 0 ? 0.9 : 0.15) }); drawFigure(g, { x: E.W * 0.17, y, s: 1.2, outfit: CAST.YOU, pose: POSES.wave, expr: 'happy', rim: { color: '#ffcf8f', dir: [0, -1] } });
  for (let i = 0; i < 3; i++) { const x = E.W + 100 - ((t * 300 + i * 500) % (E.W + 200)); drawFigure(g, { x, y, s: 1.1, facing: -1, outfit: [CAST.CHESS, CAST.NURSE, CAST.LOVE][i], pose: walkPose(t * Math.PI * 2 * 0.9 + i), expr: 'smile', rim: { color: '#ffcf8f', dir: [0, -1] } }); } },
  pops: [['nicer,', 'NOT NICER', 0.5, 0.06, 44, 'cream'], ['interesting,', 'NOT MORE INTERESTING', 0.5, 0.13, 44, 'cream'], ['door.', 'JUST MORE FOOT TRAFFIC', 0.5, 0.2, 56]] });
shot('P34', { bg: 'stage', line: 'FUNCTIONAL DISTANCE', lineSize: 130 });
shot('P35', { bg: 'black', cam: { z: 1.4, x: -380 }, draw: (g, t) => building(g, t, { stairs: 1, lit: (f, i) => (i === 0 ? 0.9 : 0.2) }), pops: [['staircase', 'SHAPED BY THE STAIRCASE', 0.5, 0.94, 52]] });
shot('P36', { bg: 'stage', figs: [{ x: 0, o: 'YOU', expr: 'thinking', pose: 'think' }], pops: [['own', 'IN YOUR OWN LIFE?', 0.5, 0.14, 64, 'cream']] });
shot('P37', { bg: 'school', figs: [{ x: -0.07, o: 'YOU', expr: 'happy', pose: 'sit' }, { x: 0.07, o: 'CHESS', expr: 'happy', pose: 'sit', facing: -1 }], pops: [['closest', 'SAT CLOSEST', 0.5, 0.12, 60]] });
shot('P38', { bg: 'office', draw: (g, t, info, c) => desks(g, 6, c.GY, 0), figs: [{ x: -0.2, o: 'YOU', expr: 'smile', pose: 'talk' }, { x: -0.06, o: 'NURSE', expr: 'smile', pose: 'talk', facing: -1 }], pops: [['desks', 'A FEW DESKS AWAY', 0.6, 0.12, 60]] });
shot('P39', { bg: 'black', draw: (g, t) => { const y = hall(g, t, { lit: (i) => (i === 1 || i === 4 ? 0.8 : 0.15) }); drawFigure(g, { x: E.W * 0.26, y, s: 1.2, outfit: CAST.YOU, pose: POSES.wave, expr: 'happy', rim: { color: '#ffcf8f', dir: [0, -1] } }); drawFigure(g, { x: E.W * 0.74, y, s: 1.2, facing: -1, outfit: CAST.CHESS, pose: POSES.wave, expr: 'happy', rim: { color: '#ffcf8f', dir: [0, -1] } }); }, pops: [['wave', 'EVERY MORNING', 0.5, 0.08, 56]] });
shot('P40', { bg: 'stage', figs: [{ x: -0.3, o: 'CHESS', expr: 'smile', pose: 'stand' }, { x: -0.12, o: 'LOVE', expr: 'smile', pose: 'stand' }, { x: 0.06, o: 'YOU', expr: 'thinking', pose: 'think', at: 'nearby.', expr2: 'smile' }, { x: 0.24, o: 'NURSE', expr: 'smile', pose: 'stand', facing: -1 }], pops: [['carefully', 'WE CHOOSE CAREFULLY?', 0.5, 0.12, 56, 'cream'], ['nearby.', 'WE CHOOSE WHO\'S NEARBY', 0.5, 0.22, 64]] });
