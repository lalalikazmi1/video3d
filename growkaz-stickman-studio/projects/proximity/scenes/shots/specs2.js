// shots/specs2.js — part 2: love, the alphabet, three forces, the twist, phones, advice, outro.
import { E, S, mood, ease, prog, clamp, lerp, noise, seg, circle, ring, rr, poly, glow, alpha, shade, mix, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES } from '/engine/rig2d.js';
import * as UI from '/engine/ui2d.js';
import { shot } from './_kit.js';
import { building, hall } from './specs.js';
import * as CAST from '../cast.js';

const ui = () => S().ui, GRN = '#5fd17a';
const F = (o) => ({ s: 1.05, ...o });
// city block map with a 5-block circle and couples
function blockMap(g, t, k) { const cx = E.W / 2, cy = E.H * 0.55; for (let i = -6; i <= 6; i++) { seg(g, [[cx + i * 110, cy - 380], [cx + i * 110, cy + 380]], 3, alpha(UI.bpStroke(), 0.35)); } for (let j = -3; j <= 3; j++) seg(g, [[cx - 700, cy + j * 110], [cx + 700, cy + j * 110]], 3, alpha(UI.bpStroke(), 0.35));
  ring(g, cx, cy, 330 * ease.out(k), 6, ui().gold); glow(g, cx, cy, 330, ui().gold, 0.12 * k);
  for (let i = 0; i < 30; i++) { const a = i * 2.39996, r = 60 + (i * 47) % 600, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.55; const inside = i % 3 === 0; const px = inside ? cx + Math.cos(a) * (40 + (i * 13) % 260) : x, py = inside ? cy + Math.sin(a) * (40 + (i * 13) % 260) * 0.8 : y;
    circle(g, px - 8, py, 9, inside && k > 0.5 ? '#f29ac0' : alpha(ui().cream, 0.6)); circle(g, px + 8, py, 9, inside && k > 0.5 ? ui().gold : alpha(ui().cream, 0.6)); } }
// row of letters with friendship links between neighbours
function letters(g, t, k, links) { const L = 'ABCDEFGHIJ'; for (let i = 0; i < 10; i++) { const x = E.W * (0.1 + i * 0.09), y = E.H * 0.25; text(g, L[i], x, y, { size: 64, color: ui().gold, font: FONTS.title, weight: 700 }); }
  if (links) for (let i = 0; i < 9; i += 2) { const x = E.W * (0.1 + i * 0.09), y = E.H * 0.33, kk = clamp(k * 5 - i * 0.4); if (kk > 0) { g.strokeStyle = GRN; g.lineWidth = 6; g.beginPath(); g.arc(x + E.W * 0.045, y, E.W * 0.045 * kk, Math.PI, Math.PI * 2, true); g.stroke(); } } }
function phoneUI(g, x, y, s, t, kind) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -150, -290, 300, 580, 36); g.fillStyle = '#16121a'; g.fill(); rr(g, -132, -270, 264, 540, 24); g.fillStyle = '#241a20'; g.fill();
  const c = ui();
  if (kind === 'dating') { for (let i = 0; i < 3; i++) { rr(g, -110, -240 + i * 170, 220, 150, 16); g.fillStyle = '#2e2228'; g.fill(); circle(g, -60, -165 + i * 170, 40, ['#f29ac0', '#8a5ad6', '#3fb950'][i]); text(g, `${[1, 2, 4][i]} km away`, 40, -165 + i * 170, { size: 26, color: c.cream, font: FONTS.ui, weight: 900 }); } }
  if (kind === 'chat') { for (let i = 0; i < 6; i++) { const me = i % 2; rr(g, me ? -20 : -110, -230 + i * 80, 130, 56, 22); g.fillStyle = me ? c.gold : '#3a2e34'; g.fill(); if (!me) circle(g, -128, -202 + i * 80, 16, ['#f29ac0', '#3fb950', '#8a5ad6'][i % 3]); } }
  if (kind === 'stories') { for (let i = 0; i < 4; i++) { ring(g, -90 + i * 60, -220, 24, 5, c.accent); circle(g, -90 + i * 60, -220, 18, ['#f29ac0', '#3fb950', '#8a5ad6', '#3a6ea5'][i]); } const n = Math.floor(t * 2.5) % 7; for (let i = 0; i < n; i++) text(g, '♥', -60 + (i % 3) * 60, -60 + Math.floor(i / 3) * 70, { size: 54, color: c.accent, font: FONTS.ui, weight: 900 }); }
  if (kind === 'feed') { for (let i = 0; i < 4; i++) { const yy = -230 + ((i * 140 - t * 120) % 560 + 560) % 560; rr(g, -110, yy, 220, 110, 12); g.fillStyle = '#2e2228'; g.fill(); circle(g, -70, yy + 30, 18, '#f29ac0'); } }
  g.restore(); }
function bars4(g, t, vals, labels, k, col) { const x0 = E.W * 0.22, base = E.H * 0.82, H = E.H * 0.5; vals.forEach((v, i) => { const x = x0 + i * E.W * 0.18, h = H * v * ease.out(clamp(k * 1.3 - i * 0.15)); rr(g, x - 70, base - h, 140, h, 12); g.fillStyle = col || ui().gold; g.fill(); text(g, labels[i], x, base + 46, { size: 38, color: ui().cream, font: FONTS.ui, weight: 900 }); }); }
function dial(g, x, y, r, k) { ring(g, x, y, r, r * 0.1, alpha(ui().cream, 0.6)); for (let i = 0; i <= 10; i++) { const a = Math.PI * (0.75 + i * 0.15); seg(g, [[x + Math.cos(a) * r * 0.75, y + Math.sin(a) * r * 0.75], [x + Math.cos(a) * r * 0.9, y + Math.sin(a) * r * 0.9]], 5, i > 7 ? ui().accent : ui().cream); }
  const a = Math.PI * (0.75 + 1.5 * k); seg(g, [[x, y], [x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * 0.7]], r * 0.08, ui().gold); circle(g, x, y, r * 0.12, ui().gold); text(g, 'PROXIMITY', x, y + r * 1.25, { size: 40, color: ui().cream, font: FONTS.ui, weight: 900 }); }
function couplesChart(g, t, k) { const x0 = E.W * 0.15, x1 = E.W * 0.85, y0 = E.H * 0.8, y1 = E.H * 0.2; seg(g, [[x0, y0], [x1, y0]], 4, alpha(ui().cream, 0.6)); seg(g, [[x0, y0], [x0, y1]], 4, alpha(ui().cream, 0.6));
  const line = (f, col) => { g.strokeStyle = col; g.lineWidth = 8; g.beginPath(); for (let i = 0; i <= 80 * k; i++) { const u = i / 80; g.lineTo(lerp(x0, x1, u), lerp(y0, y1, f(u))); } g.stroke(); };
  line((u) => 0.55 - 0.25 * u * u, ui().cream); line((u) => 0.02 + 0.85 * Math.pow(u, 3), GRN);
  text(g, 'THROUGH FRIENDS', x1 - 140, y0 - (y0 - y1) * 0.25 - 30, { size: 30, color: ui().cream, font: FONTS.ui, weight: 900, alpha: k }); text(g, 'ONLINE', x1 - 60, y1 - 10, { size: 36, color: GRN, font: FONTS.ui, weight: 900, alpha: k });
  text(g, '2017', x1 - 20, y0 + 44, { size: 32, color: ui().gold, font: FONTS.ui, weight: 900 }); }

// --- love, Bossard ---
shot('Q01', { bg: 'black', draw: (g, t) => building(g, t, { lit: (f, i) => 0.5, links: [[[0, 1], [0, 2], 10, prog(t, 0.2, 0.8)], [[1, 3], [1, 4], 10, prog(t, 0.4, 1.0)], [[0, 4], [0, 5], 10, prog(t, 0.6, 1.2)]] }), pops: [['follows', 'FRIENDSHIP FOLLOWS PROXIMITY', 0.5, 0.06, 50]] });
shot('Q02', { bg: 'stage', figs: [{ x: -0.1, o: 'YOU', expr: 'smile', pose: 'stand' }, { x: 0.1, o: 'LOVE', expr: 'smile', pose: 'stand', facing: -1 }], icons: [['orb', 0.5, 0.3, 1.2, 'love?']], pops: [['love?', 'BUT LOVE?', 0.5, 0.12, 80, 'red']] });
shot('Q03', { bg: 'bp', icons: [['card', 0.35, 0.5, 0.8, 'marriage', { title: 'LICENCE', body: 'Philadelphia', col: 'gold' }], ['card', 0.5, 0.48, 0.8, 'licences', { title: 'LICENCE', body: 'Philadelphia', col: 'gold' }], ['card', 0.65, 0.46, 0.8, 'Philadelphia.', { title: 'LICENCE', body: 'Philadelphia', col: 'gold' }]], badge: ['1932,', '1932'], lower: ['JAMES BOSSARD', 'SOCIOLOGIST'], pops: [['thousand', '5,000 MARRIAGE LICENCES', 0.5, 0.12, 56]] });
shot('Q04', { bg: 'bp', draw: (g, t, i, c) => blockMap(g, t, prog(t, c.cue('five', 2.4) - 0.3, c.cue('five', 2.4) + 0.6)), pops: [['third', '≈ 1 IN 3 COUPLES', 0.5, 0.08, 60, 'red'], ['blocks', 'WITHIN 5 BLOCKS', 0.5, 0.94, 56]] });
shot('Q05', { bg: 'stage', line: 'FIVE BLOCKS', lineSize: 170 });
shot('Q06', { bg: 'street', drift: 60, pops: [['million', 'A CITY OF ALMOST 2 MILLION', 0.5, 0.15, 60, 'cream']] });
shot('Q07', { bg: 'street', drift: -60, figs: [{ x: -0.1, o: 'YOU', expr: 'neutral', pose: 'phone', prop: 'phone' }], pops: [['changed', 'CITIES HAVE CHANGED', 0.5, 0.15, 60, 'cream']] });
shot('Q08', { bg: 'bp', pops: [['pattern', 'BUT THE PATTERN…', 0.5, 0.4, 70, 'cream'], ['forms.', '…KEPT SHOWING UP', 0.5, 0.56, 70]] });
// --- Segal ---
shot('Q09', { bg: 'school', figs: [{ x: -0.3, o: 'COP', expr: 'determined', pose: 'stand' }, { x: -0.1, o: 'COP', expr: 'neutral', pose: 'stand' }, { x: 0.1, o: 'COP', expr: 'smile', pose: 'stand' }, { x: 0.3, o: 'COP', expr: 'neutral', pose: 'stand', facing: -1 }], badge: ['1974,', '1974'], lower: ['MADY SEGAL', 'POLICE ACADEMY, MARYLAND'] });
shot('Q10', { bg: 'school', draw: (g) => letters(g, 0, 0, false), figs: [{ x: -0.36, o: 'COP', expr: 'neutral', pose: 'sit' }, { x: -0.18, o: 'COP', expr: 'neutral', pose: 'sit' }, { x: 0, o: 'COP', expr: 'neutral', pose: 'sit' }, { x: 0.18, o: 'COP', expr: 'neutral', pose: 'sit' }, { x: 0.36, o: 'COP', expr: 'neutral', pose: 'sit' }], pops: [['alphabetical', 'SEATED A TO Z', 0.5, 0.1, 56, 'cream']] });
shot('Q11', { bg: 'bp', draw: (g, t, i, c) => letters(g, t, prog(t, c.cue('nearby', 6.5) - 1, c.cue('nearby', 6.5) + 0.5), true), pops: [['closest', 'CLOSEST FRIEND?', 0.5, 0.6, 64, 'cream'], ['letter.', 'A NEARBY LETTER', 0.5, 0.75, 70, 'green']] });
shot('Q12', { bg: 'blur', face: { o: 'YOU', expr: 'surprised', x: 0, r: 300 } });
shot('Q13', { bg: 'stage', line: 'THE ALPHABET PICKED FRIENDS', lineSize: 96 });
shot('Q14', { bg: 'stage', figs: [{ x: 0, o: 'YOU', expr: 'thinking', pose: 'think' }], pops: [['why', 'WHY?', 0.5, 0.15, 120]] });
shot('Q15', { bg: 'stage', pops: [['metres,', 'A FEW METRES', 0.3, 0.45, 76, 'cream'], ['letters,', 'A FEW LETTERS', 0.7, 0.45, 76, 'cream'], ['much?', 'SO MUCH?', 0.5, 0.65, 90]] });
// --- three forces ---
shot('Q16', { bg: 'stage', icons: [['card', 0.2, 0.5, 0.75, 'three', { title: '1', body: '?', col: 'gold' }], ['card', 0.5, 0.5, 0.75, 'forces', { title: '2', body: '?', col: 'gold' }], ['card', 0.8, 0.5, 0.75, 'together.', { title: '3', body: '?', col: 'gold' }]], pops: [['three', 'THREE FORCES', 0.5, 0.12, 70]] });
shot('Q17', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.2, 0.05, { title: '1', body: 'AVAILABILITY', col: 'gold', dur: 0.5 }]] });
shot('Q18', { bg: 'stage', figs: [{ x: -0.3, o: 'YOU', expr: 'sad', pose: 'stand' }, { x: 0.35, o: 'LOVE', expr: 'neutral', pose: 'stand', s: 0.6, facing: -1 }], icons: [['cross', 0.85, 0.6, 1, 'never']], pops: [['never', "CAN'T FALL FOR WHO YOU NEVER MEET", 0.5, 0.12, 46, 'cream']] });
shot('Q19', { bg: 'stage', figs: [{ x: -0.3, o: 'CHESS', expr: 'smile', pose: 'wave' }, { x: -0.1, o: 'NURSE', expr: 'smile', pose: 'stand' }, { x: 0.1, o: 'YOU', expr: 'happy', pose: 'stand' }, { x: 0.3, o: 'LOVE', expr: 'smile', pose: 'wave', facing: -1 }], pops: [['around', 'THE PEOPLE AROUND US', 0.5, 0.12, 56]] });
shot('Q20', { bg: 'study', figs: [{ x: -0.12, o: 'YOU', expr: 'smile', pose: 'talk', talk: true }, { x: 0.12, o: 'LOVE', expr: 'happy', pose: 'talk', facing: -1 }], icons: [['orb', 0.5, 0.3, 1, 'chance']], pops: [['conversation,', 'EVERY CONVERSATION', 0.5, 0.1, 50, 'cream'], ['chance', '= A CHANCE', 0.5, 0.18, 60]] });
shot('Q21', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.2, 0.05, { title: '2', body: 'FAMILIARITY', col: 'gold', dur: 0.5 }]] });
shot('Q22', { bg: 'stage', line: 'THE MERE EXPOSURE EFFECT', lineSize: 104 });
shot('Q23', { bg: 'bp', icons: [['meter', 0.75, 0.85, 1.4, 'more', { label: 'LIKING', col: 'green', v: 0.95, dur: 2.5 }]], draw: (g, t) => { const n = Math.min(8, Math.floor(t * 1.4)); for (let i = 0; i < n; i++) circle(g, E.W * (0.15 + i * 0.06), E.H * 0.5, 30, alpha(ui().cream, 0.4 + i * 0.07)); text(g, 'TIMES SEEN →', E.W * 0.35, E.H * 0.62, { size: 36, color: ui().cream, font: FONTS.ui, weight: 900 }); }, lower: ['ROBERT ZAJONC', 'PSYCHOLOGIST · 1960s'] });
shot('Q24', { bg: 'bp', pops: [['Shapes.', 'SHAPES', 0.25, 0.45, 80, 'cream'], ['Words.', 'WORDS', 0.5, 0.45, 80, 'cream'], ['Faces.', 'FACES', 0.75, 0.45, 80]] });
shot('Q25', { bg: 'bp', icons: [['brain', 0.5, 0.45, 1.4, 0.1]], pops: [['remember', "EVEN IF YOU DON'T REMEMBER", 0.5, 0.85, 52, 'cream']] });
// --- Moreland & Beach ---
shot('Q26', { bg: 'school', figs: [{ x: -0.3, o: 'CHESS', pose: 'sit' }, { x: -0.15, o: 'NURSE', pose: 'sit' }, { x: 0, o: 'YOU', pose: 'sit' }, { x: 0.15, o: 'EXPERT', pose: 'sit' }, { x: 0.3, o: 'GOLFER', pose: 'sit' }], badge: ['1992,', '1992'], lower: ['MORELAND & BEACH', 'A REAL CLASSROOM'] });
shot('Q27', { bg: 'stage', figs: [{ x: -0.3, o: 'LOVE', expr: 'neutral' }, { x: -0.1, o: 'W2', expr: 'neutral' }, { x: 0.1, o: 'W3', expr: 'neutral' }, { x: 0.3, o: 'W4', expr: 'neutral' }], pops: [['four', 'FOUR WOMEN', 0.5, 0.12, 70]] });
shot('Q28', { bg: 'stage', figs: [{ x: -0.3, o: 'LOVE', expr: 'neutral' }, { x: -0.1, o: 'W2', expr: 'neutral' }, { x: 0.1, o: 'W3', expr: 'neutral' }, { x: 0.3, o: 'W4', expr: 'neutral' }], pops: [['never', '0', 0.2, 0.3, 110, 'red'], ['five,', '5', 0.4, 0.3, 110, 'cream'], ['ten,', '10', 0.6, 0.3, 110, 'cream'], ['fifteen', '15', 0.8, 0.3, 110], ['times.', 'LECTURES ATTENDED', 0.5, 0.12, 50, 'cream']] });
shot('Q29', { bg: 'school', figs: [{ x: -0.2, o: 'W2', expr: 'neutral', pose: 'sit' }, { x: 0.05, o: 'W3', expr: 'neutral', pose: 'sit' }, { x: 0.3, o: 'W4', expr: 'neutral', pose: 'sit' }], pops: [['quietly.', 'SAT QUIETLY', 0.5, 0.1, 56, 'cream'], ['talk', 'NO TALKING', 0.5, 0.18, 56, 'red']] });
shot('Q30', { bg: 'stage', icons: [['card', 0.2, 0.5, 0.6, 'photos', { title: 'A', body: '0×', col: 'gold' }], ['card', 0.4, 0.5, 0.6, 'photos', { title: 'B', body: '5×', col: 'gold' }], ['card', 0.6, 0.5, 0.6, 'four', { title: 'C', body: '10×', col: 'gold' }], ['card', 0.8, 0.5, 0.6, 'women.', { title: 'D', body: '15×', col: 'gold' }]], pops: [['term,', 'END OF TERM: RATE THEM', 0.5, 0.12, 56, 'cream']] });
shot('Q31', { bg: 'bp', draw: (g, t) => bars4(g, t, [0.35, 0.5, 0.65, 0.85], ['0×', '5×', '10×', '15×'], prog(t, 0.5, 3.5), GRN), pops: [['attractive', 'MORE ATTRACTIVE & LIKABLE', 0.5, 0.12, 54]] });
shot('Q32', { bg: 'blur', face: { o: 'CHESS', expr: 'confused', x: -0.15, r: 280 }, pops: [['remember', '"I DON\'T REMEMBER HER"', 0.72, 0.35, 50, 'cream']] });
shot('Q33', { bg: 'bp', icons: [['brain', 0.5, 0.45, 1.5, 0, { always: 1 }], ['orb', 0.5, 0.45, 1.6, 'familiarity,']], pops: [['familiarity,', 'FALLING FOR FAMILIARITY', 0.5, 0.86, 56]] });
shot('Q34', { bg: 'stage', line: 'WHY?', lineSize: 170 });
shot('Q35', { bg: 'cave', figs: [{ x: -0.22, o: 'CAVE', expr: 'smile', pose: 'sit' }, { x: 0.22, o: 'CAVE', expr: 'smile', pose: 'sit', facing: -1 }], pops: [['safe.', 'FAMILIAR = SAFE', 0.5, 0.15, 76], ['idea', 'ONE IDEA', 0.5, 0.25, 36, 'cream']] });
shot('Q36', { bg: 'stage', figs: [{ x: -0.15, o: 'YOU', expr: 'nervous', pose: 'crossArms', at: 'relax', pose2: 'relaxed', expr2: 'smile' }, { x: 0.15, o: 'CHESS', expr: 'smile', pose: 'wave', facing: -1 }], icons: [['check', 0.82, 0.25, 0.7, 1.0], ['check', 0.88, 0.4, 0.7, 2.0], ['check', 0.82, 0.55, 0.7, 3.0]] });
shot('Q37', { bg: 'stage', figs: [{ x: -0.1, o: 'YOU', expr: 'happy', pose: 'relaxed' }, { x: 0.1, o: 'CHESS', expr: 'happy', pose: 'relaxed', facing: -1 }], icons: [['orb', 0.5, 0.3, 1.2, 'liking.']], pops: [['comfort', 'COMFORT → LIKING', 0.5, 0.12, 64]] });
shot('Q38', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.2, 0.05, { title: '3', body: 'EXPECTATION', col: 'gold', dur: 0.5 }]] });
shot('Q39', { bg: 'stage', icons: [['card', 0.3, 0.5, 0.8, 'two', { title: 'WOMAN A', body: 'info card', col: 'gold' }], ['card', 0.7, 0.5, 0.8, 'two', { title: 'WOMAN B', body: 'info card', col: 'gold' }]], pops: [['know', "YOU'LL MEET ONE OF THEM", 0.5, 0.85, 54]], badge: ['1967,', '1967'], lower: ['DARLEY & BERSCHEID', 'PSYCHOLOGISTS'] });
shot('Q40', { bg: 'bp', draw: (g, t) => { const k = prog(t, 0.5, 3); [[0.35, 0.5, 'OTHER'], [0.65, 0.85, 'WILL MEET']].forEach(([x, v, l]) => { const h = E.H * 0.5 * v * ease.out(k); rr(g, E.W * x - 90, E.H * 0.8 - h, 180, h, 14); g.fillStyle = l === 'OTHER' ? alpha(ui().cream, 0.6) : GRN; g.fill(); text(g, l, E.W * x, E.H * 0.86, { size: 40, color: ui().cream, font: FONTS.ui, weight: 900 }); }); }, pops: [['likable,', 'RATED MORE LIKABLE', 0.5, 0.12, 60, 'green'], ['before', 'BEFORE MEETING', 0.5, 0.2, 44, 'cream']] });
shot('Q41', { bg: 'stage', figs: [{ x: -0.15, o: 'YOU', expr: 'thinking', pose: 'think', at: 'reasons', expr2: 'smile' }, { x: 0.15, o: 'LOVE', expr: 'smile', pose: 'stand', facing: -1 }], pops: [['reasons', 'LOOKING FOR REASONS TO LIKE', 0.5, 0.12, 50]] });
shot('Q42', { bg: 'black', draw: (g, t) => { const y = hall(g, t, { lit: (i) => (i === 2 || i === 3 ? 0.8 : 0.15) }); drawFigure(g, { x: E.W * 0.42, y, s: 1.2, outfit: CAST.YOU, pose: POSES.wave, expr: 'happy', rim: { color: '#ffcf8f', dir: [0, -1] } }); drawFigure(g, { x: E.W * 0.58, y, s: 1.2, facing: -1, outfit: CAST.LOVE, pose: POSES.wave, expr: 'happy', rim: { color: '#ffcf8f', dir: [0, -1] } }); }, pops: [['easier', 'EASIER TO LIVE ALONGSIDE', 0.5, 0.08, 50]] });
// --- the twist ---
shot('Q43', { bg: 'stage', line: 'THE TWIST', lineSize: 160 });
shot('Q44', { bg: 'stage', icons: [['orb', 0.5, 0.45, 2, 0.1]], pops: [['only', 'NOT ONLY LOVE…', 0.5, 0.15, 70, 'cream']] });
shot('Q45', { bg: 'stage', draw: (g, t) => dial(g, E.W / 2, E.H * 0.48, 200, ease.inOut(prog(t, 0.3, 2.5))), pops: [['volume', 'VOLUME UP ON EVERYTHING', 0.5, 0.1, 56]] });
shot('Q46', { bg: 'black', draw: (g, t) => building(g, t, {}), badge: ['1976,', '1976'], lower: ['EBBESEN, KJOS & KONEČNI', 'CONDOMINIUMS, CALIFORNIA'] });
shot('Q47', { bg: 'black', draw: (g, t) => building(g, t, { links: [[[0, 2], [0, 3], 10, prog(t, 0.3, 1)], [[1, 1], [1, 2], 10, prog(t, 0.5, 1.2)]] }), pops: [['close', 'FRIENDS: CLOSE BY', 0.5, 0.06, 52, 'green']] });
shot('Q48', { bg: 'black', draw: (g, t, i, c) => { building(g, t, { links: [[[0, 2], [0, 3], 10, 1], [[1, 1], [1, 2], 10, 1]] }); const k = prog(t, c.cue('disliked.', 1.5) - 0.3, c.cue('disliked.', 1.5) + 0.4); for (const [a, b] of [[[0, 3], [0, 4]], [[1, 2], [1, 3]]]) { const ax = E.W / 2 - 750 + 300 + a[1] * 200, bx = E.W / 2 - 750 + 300 + b[1] * 200, y = E.H * (a[0] ? 0.42 : 0.78) - 170; if (k > 0) { g.setLineDash([12, 10]); seg(g, [[ax, y], [lerp(ax, bx, k), y - 40]], 8, ui().accent); g.setLineDash([]); } } }, pops: [['disliked.', 'DISLIKED: ALSO CLOSE BY', 0.5, 0.94, 52, 'red']] });
shot('Q49', { bg: 'black', draw: (g, t) => { const y = hall(g, t, { lit: (i) => (i === 1 || i === 2 || i === 3 ? 0.7 : 0.15) }); drawFigure(g, { x: E.W * 0.26, y, s: 1.1, outfit: CAST.CHESS, pose: POSES.wave, expr: 'happy', rim: { color: '#ffcf8f', dir: [0, -1] } }); drawFigure(g, { x: E.W * 0.42, y, s: 1.1, outfit: CAST.YOU, pose: POSES.stand, expr: 'smile', rim: { color: '#ffcf8f', dir: [0, -1] } }); drawFigure(g, { x: E.W * 0.58, y, s: 1.1, facing: -1, outfit: CAST.MARKETER, pose: POSES.crossArms, expr: 'angry', rim: { color: '#ffcf8f', dir: [0, -1] } });
  text(g, '♥', E.W * 0.34, y - 380, { size: 90, color: '#f29ac0', font: FONTS.ui, weight: 900 }); text(g, '⚡', E.W * 0.5, y - 380, { size: 90, color: ui().accent, font: FONTS.ui, weight: 900 }); }, pops: [['floor.', 'SAME FLOOR', 0.5, 0.08, 64]] });
shot('Q50', { bg: 'stage', figs: [{ x: -0.12, o: 'YOU', expr: 'happy', pose: 'talk' }, { x: 0.12, o: 'CHESS', expr: 'happy', pose: 'talk', facing: -1 }], pops: [['connect.', 'MORE CHANCES TO CONNECT', 0.5, 0.12, 56, 'green']] });
shot('Q51', { bg: 'stage', figs: [{ x: -0.12, o: 'YOU', expr: 'angry', pose: 'point' }, { x: 0.12, o: 'MARKETER', expr: 'angry', pose: 'crossArms', facing: -1 }], pops: [['annoy', 'MORE CHANCES TO ANNOY', 0.5, 0.12, 56, 'red']] });
shot('Q52', { bg: 'stage', icons: [['banner', 0.5, 0.45, 1.3, 0.05, { str: '♪ LOUD MUSIC ♪' }]] });
shot('Q53', { bg: 'stage', icons: [['banner', 0.5, 0.45, 1.3, 0.05, { str: 'BLOCKED PARKING', col: 'gold' }]] });
shot('Q54', { bg: 'stage', icons: [['banner', 0.5, 0.45, 1.3, 0.05, { str: 'WOOF! WOOF! WOOF!' }]] });
shot('Q55', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.1, 0.05, { title: 'LOVE POTION', body: '?', col: 'gold', dur: 0.3 }], ['cross', 0.5, 0.48, 1.6, 'potion.']] });
shot('Q56', { bg: 'stage', line: "IT'S AN AMPLIFIER", lineSize: 130 });
// --- online ---
shot('Q57', { bg: 'stage', line: 'AND TODAY?', lineSize: 140 });
shot('Q58', { bg: 'stage', figs: [{ x: -0.2, o: 'YOU', expr: 'smile', pose: 'phone', prop: 'phone' }], icons: [['phone', 0.65, 0.48, 1.1, 'phones.', { str: 'NEW\nMESSAGE' }]] });
shot('Q59', { bg: 'office', figs: [{ x: -0.1, o: 'ROSENFELD', expr: 'thinking', pose: 'holdFront', prop: 'tablet' }], lower: ['MICHAEL ROSENFELD', 'SOCIOLOGIST'], pops: [['couples', 'HOW COUPLES MEET', 0.6, 0.12, 56]] });
shot('Q60', { bg: 'bp', draw: (g, t) => couplesChart(g, t, ease.inOut(prog(t, 0.5, 5))), pops: [['online', 'ONLINE BECAME #1', 0.5, 0.1, 60, 'green']] });
shot('Q61', { bg: 'stage', pops: [['proximity', 'PROXIMITY ONLINE?', 0.5, 0.45, 80, 'cream']] });
shot('Q62', { bg: 'stage', pops: [['shape.', 'IT CHANGED SHAPE', 0.5, 0.45, 96]] });
shot('Q63', { bg: 'stage', draw: (g, t) => phoneUI(g, E.W / 2, E.H * 0.52, 1.4, t, 'dating'), pops: [['distance.', 'SORTED BY DISTANCE', 0.5, 0.06, 50]] });
shot('Q64', { bg: 'stage', draw: (g, t) => phoneUI(g, E.W / 2, E.H * 0.52, 1.4, t, 'chat'), pops: [['faces', 'THE SAME FACES, EVERY DAY', 0.5, 0.06, 50]] });
shot('Q65', { bg: 'stage', draw: (g, t) => phoneUI(g, E.W * 0.35, E.H * 0.52, 1.4, t, 'stories'), pops: [['again', 'AGAIN AND AGAIN…', 0.72, 0.4, 56, 'cream'], ['familiar.', '→ FAMILIAR', 0.72, 0.55, 70]] });
shot('Q66', { bg: 'stage', icons: [['orb', 0.5, 0.45, 2, 0.1]], pops: [['good.', 'FEELS GOOD', 0.5, 0.82, 70, 'green']] });
shot('Q67', { bg: 'black', draw: (g, t) => hall(g, t, { lit: (i) => 0.4 }), pops: [['hallway.', 'THEN: THE SAME HALLWAY', 0.5, 0.08, 56]] });
shot('Q68', { bg: 'stage', draw: (g, t) => phoneUI(g, E.W / 2, E.H * 0.55, 1.4, t, 'feed'), pops: [['feed.', 'NOW: THE SAME FEED', 0.5, 0.06, 56]] });
// --- advice ---
shot('Q69', { bg: 'stage', figs: [{ x: 0, o: 'YOU', expr: 'thinking', pose: 'think' }], pops: [['you?', 'WHAT DOES THIS MEAN FOR YOU?', 0.5, 0.14, 56]] });
shot('Q70', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.2, 0.05, { title: '1', body: 'DISTANCE MATTERS', col: 'gold', dur: 0.5 }]] });
shot('Q71', { bg: 'study', figs: [{ x: -0.15, o: 'YOU', expr: 'smile', pose: 'holdFront', prop: 'cup' }, { x: 0.18, o: 'LOVE', expr: 'smile', pose: 'holdFront', prop: 'cup', facing: -1 }], pops: [['class,', 'SAME CLASS', 0.2, 0.12, 48, 'cream'], ['gym', 'SAME GYM TIME', 0.5, 0.12, 48, 'cream'], ['café.', 'SAME CAFÉ', 0.8, 0.12, 48]] });
shot('Q72', { bg: 'study', figs: [{ x: -0.15, o: 'YOU', expr: 'happy', pose: 'wave', talk: true }, { x: 0.18, o: 'LOVE', expr: 'happy', pose: 'stand', facing: -1 }], icons: [['bubble', 0.32, 0.25, 1, 'hello.', { str: 'Hi!' }], ['bubble', 0.36, 0.42, 0.8, 'question.', { str: 'Is this seat free?' }]] });
shot('Q73', { bg: 'stage', figs: [{ x: -0.25, o: 'YOU', expr: 'determined', pose: 'reach' }], icons: [['door', 0.35, 0.8, 1, 'take', { dur: 1 }]], pops: [['chance,', 'PROXIMITY = A CHANCE', 0.65, 0.2, 56], ['take', 'YOU STILL TAKE IT', 0.65, 0.3, 56, 'green']] });
shot('Q74', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.2, 0.05, { title: '2', body: 'ASK HONESTLY', col: 'gold', dur: 0.5 }]] });
shot('Q75', { bg: 'stage', serif: [['like', 'Do I like this person…', 0.4, 'cream'], ['see', '…or do I just see them a lot?', 0.55, 'gold']] });
shot('Q76', { bg: 'stage', icons: [['door', 0.5, 0.82, 1.2, 0.2, { dur: 1.5 }]], pops: [['door.', 'OPENS THE DOOR', 0.5, 0.12, 64, 'green'], ['right', 'NOT WHO\'S RIGHT FOR YOU', 0.5, 0.2, 52, 'red']] });
shot('Q77', { bg: 'stage', pops: [['values,', 'SHARED VALUES', 0.5, 0.3, 76], ['kindness', 'KINDNESS', 0.5, 0.45, 76], ['respect', 'RESPECT', 0.5, 0.6, 76]] });
shot('Q78', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.2, 0.05, { title: '3', body: 'BE KIND NEARBY', col: 'gold', dur: 0.5 }]] });
shot('Q79', { bg: 'street', figs: [{ x: -0.25, o: 'CHESS', expr: 'smile', pose: 'wave' }, { x: 0, o: 'YOU', expr: 'happy', pose: 'wave' }, { x: 0.25, o: 'NURSE', expr: 'smile', pose: 'wave', facing: -1 }], pops: [['neighbours,', 'NEIGHBOURS', 0.2, 0.12, 48, 'cream'], ['coworkers,', 'COWORKERS', 0.5, 0.12, 48, 'cream'], ['train.', 'THE TRAIN', 0.8, 0.12, 48, 'cream']] });
shot('Q80', { bg: 'stage', figs: [{ x: -0.3, o: 'CHESS', expr: 'smile', pose: 'stand' }, { x: -0.12, o: 'LOVE', expr: 'smile', pose: 'stand' }, { x: 0.05, o: 'YOU', expr: 'happy', pose: 'stand' }, { x: 0.22, o: 'NURSE', expr: 'smile', pose: 'stand', facing: -1 }, { x: 0.38, o: 'GOLFER', expr: 'smile', pose: 'stand', facing: -1 }], pops: [['steps', 'A FEW STEPS AWAY', 0.5, 0.12, 64]] });
shot('Q81', { bg: 'stage', figs: [{ x: -0.2, o: 'YOU', expr: 'thinking', pose: 'think' }], pops: [['world.', 'ACROSS THE WORLD?', 0.62, 0.3, 70, 'cream']] });
shot('Q82', { bg: 'black', draw: (g, t) => { const y = hall(g, t, { lit: (i) => (i === 1 || i === 4 ? 0.85 : 0.15) }); drawFigure(g, { x: E.W * 0.26, y, s: 1.2, outfit: CAST.YOU, pose: POSES.wave, expr: 'happy', rim: { color: '#ffcf8f', dir: [0, -1] } }); drawFigure(g, { x: E.W * 0.74, y, s: 1.2, facing: -1, outfit: CAST.LOVE, pose: POSES.wave, expr: 'happy', rim: { color: '#ffcf8f', dir: [0, -1] } }); }, pops: [['hall.', 'JUST DOWN THE HALL', 0.5, 0.08, 64]] });
shot('Q83', { bg: 'stage', serif: [[0.2, 'Who did you meet…', 0.4, 'cream'], ['close', '…simply because they were close by?', 0.55, 'gold']] });
shot('Q84', { bg: 'stage', icons: [['bubble', 0.5, 0.45, 2.0, 0.05, { str: '. . .' }]], pops: [[0.3, 'TELL ME IN THE COMMENTS', 0.5, 0.78, 64, 'cream']] });
shot('Q85', { bg: 'black', draw: (g, t) => UI.endScreen(g, t, { question: 'Maybe the one is just down the hall.', cast: [CAST.YOU, CAST.LOVE, CAST.CHESS, CAST.NURSE, CAST.FESTINGER, CAST.COP, CAST.W2], moodColors: ['#0a0608', '#1a0c10', '#2a1214'], rim: ui().gold }), dust: false });
