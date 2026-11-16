// shots/specs.js — "Why Your Memory Lies to You": M01–M80.
import { E, S, ease, prog, clamp, lerp, seg, circle, ring, rr, glow, alpha, text, FONTS, shake } from '/engine/core.js';
import { bigFace } from '/engine/rig2d.js';
import { shot } from './_kit.js';
import { camera, mug, prisonBars, dna, car, glass, puzzle, shuttle, page, book, cabinet, photo, lock, GRN } from './_m.js';
import { check, cross } from './_h.js';
const ui = () => S().ui;
const K = (t, c, d = 0.5) => ease.out(prog(t, c, c + d));
const big = (g, str, x, y, size, col, a = 1) => text(g, str, E.W * x, E.H * y, { size, color: col || ui().cream, font: FONTS.title, weight: 700, glow: 20, glowColor: alpha(col || ui().gold, 0.5), alpha: a, stroke: size * 0.1, strokeColor: '#0a0508' });
const CA = (g, t, x, y, s) => camera(g, E.W * x, E.H * y, s, t);

// ---------- the case ----------
shot('M01', { bg: 'street', figs: [{ x: 0, o: 'JEN', expr: 'worried', pose: 'stand' }], lower: ['NORTH CAROLINA', '1984'] });
shot('M02', { bg: 'blur', face: { o: 'JEN', expr: 'scared', expr2: 'determined', at: 'remarkable', r: 320 } });
shot('M03', { bg: 'black', draw(g, t, i, { cue }) { const ui0 = ui(); glow(g, E.W / 2, E.H * 0.55, 500, ui0.accent, 0.25);
  bigFace(g, E.W / 2, E.H * 0.62, 300, { outfit: { ...{ top: 'hoodie', color: '#1a1418', head: 'beanie', headColor: '#121014' } }, expr: 'angry', rimColor: ui0.accent });
  const y = E.H * (0.25 + 0.55 * ((t * 0.5) % 1)); seg(g, [[E.W * 0.3, y], [E.W * 0.7, y]], 6, alpha(GRN, 0.8)); glow(g, E.W / 2, y, 200, GRN, 0.2);
  for (const [c, s, x, y2] of [['detail', 'EYES', 0.24, 0.35], ['detail', 'NOSE', 0.76, 0.45], ['detail', 'HAIR', 0.24, 0.6]]) { const k = K(t, cue(c) + (y2 - 0.3), 0.3); if (k > 0) text(g, s, E.W * x, E.H * y2, { size: 50, color: GRN, font: FONTS.ui, weight: 900, alpha: k }); }
  const k = K(t, cue('detail'), 0.4); if (k > 0) big(g, 'EVERY DETAIL', 0.5, 0.13, 90, ui0.gold, k); } });
shot('M04', { bg: 'blur', face: { o: 'JEN', expr: 'determined', r: 300, x: -0.2 }, pops: [['caught', 'HE WILL BE', 0.7, 0.4, 80, 'cream'], ['caught', 'CAUGHT', 0.7, 0.55, 120, 'gold']] });
shot('M05', { bg: 'blur', draw(g, t, i, { cue }) { const os = ['STU1', 'RON', 'PALMER', 'SHADOW', 'ELDER', 'STU2'];
  os.forEach((o, j) => mug(g, E.W * (0.16 + (j % 3) * 0.34), E.H * (0.3 + Math.floor(j / 3) * 0.42), 0.85 * ease.outBack(prog(t, j * 0.12, j * 0.12 + 0.4)), o, o === 'RON' ? prog(t, cue('picked'), cue('picked') + 0.6) : 0));
  big(g, 'PHOTO LINEUP', 0.5, 0.08, 64, ui().gold); } });
shot('M06', { bg: 'stage', spots: [0.2, 0.35, 0.5, 0.65, 0.8].map(x => E.W * x), figs: [{ x: -0.3, o: 'STU1' }, { x: -0.15, o: 'RON' }, { x: 0, o: 'PALMER' }, { x: 0.15, o: 'ELDER' }, { x: 0.3, o: 'STU2' }],
  draw(g, t, i, { GY, cue }) { for (let h = 0; h < 5; h++) seg(g, [[E.W * 0.05, GY - 90 * (h + 1) * 1.5 * 1.1], [E.W * 0.95, GY - 90 * (h + 1) * 1.5 * 1.1]], 2, alpha(ui().cream, 0.25));
    const k = K(t, cue('live'), 0.5); if (k > 0) { ring(g, E.W * 0.35, GY - 340, 110 * k, 8, ui().accent); } big(g, 'LIVE LINEUP', 0.5, 0.1, 64, ui().gold); } });
shot('M07', { bg: 'debate', figs: [{ x: -0.25, o: 'JEN', pose: 'point', expr: 'determined' }, { x: 0.25, o: 'RON', expr: 'scared', facing: -1 }], pops: [['certain', '100% CERTAIN', 0.5, 0.18, 96, 'gold']] });
shot('M08', { bg: 'blur', face: { o: 'RON', expr: 'worried', r: 320 }, lower: ['RONALD COTTON', 'ACCUSED'] });
shot('M09', { bg: 'blur', face: { o: 'RON', expr: 'sad', r: 300 }, draw(g, t, i, { cue }) { prisonBars(g, prog(t, cue('sentenced'), cue('sentenced') + 0.6)); const k = K(t, cue('life'), 0.3); if (k > 0) big(g, 'LIFE IN PRISON', 0.5, 0.15, 100, ui().accent, k); }, shake: 'sentenced' });
shot('M10', { bg: 'black', line: 'THERE WAS JUST ONE PROBLEM' });
shot('M11', { bg: 'blur', face: { o: 'RON', expr: 'sad', r: 300, x: -0.15 }, draw(g, t, i, { cue }) { const k = ease.outBack(prog(t, cue('innocent'), cue('innocent') + 0.35)); if (k <= 0) return;
  g.save(); g.translate(E.W * 0.68, E.H * 0.45); g.rotate(-0.15); g.scale(k, k); rr(g, -330, -80, 660, 160, 16); g.strokeStyle = GRN; g.lineWidth = 14; g.stroke(); text(g, 'INNOCENT', 0, 6, { size: 120, color: GRN, font: FONTS.title, weight: 700 }); g.restore(); } });
shot('M12', { bg: 'bp', draw(g, t, i, { cue }) { dna(g, E.W * 0.3, E.H * 0.5, E.H * 0.75, t, prog(t, 0, 1.5)); }, pops: [['years', '10+ YEARS LATER', 0.68, 0.32, 80, 'cream'], ['DNA', 'DNA EVIDENCE', 0.68, 0.5, 90, 'gold'], ['another', 'ANOTHER MAN', 0.68, 0.68, 90, 'red']] });
shot('M13', { bg: 'blur', face: { o: 'JEN', expr: 'sad', r: 300, x: -0.2 }, pops: [['lied', "SHE DIDN'T LIE", 0.7, 0.4, 84, 'cream'], ['truly', 'SHE REMEMBERED', 0.7, 0.58, 80, 'gold']] });
shot('M14', { bg: 'black', icons: [['brain', 0.5, 0.45, 1.6, 0.1]], draw(g, t, i, { cue }) { const k = K(t, cue('rewritten'), 0.8);
  text(g, 'MEMORY v1', E.W * 0.2, E.H * 0.8, { size: 54, color: ui().cream, font: FONTS.ui, weight: 900 }); if (k > 0) { seg(g, [[E.W * 0.1, E.H * 0.8], [lerp(E.W * 0.1, E.W * 0.3, k), E.H * 0.8]], 8, ui().accent); text(g, 'MEMORY v2', E.W * 0.8, E.H * 0.8, { size: 54, color: ui().gold, font: FONTS.ui, weight: 900, alpha: k }); } },
  pops: [['never', 'SHE NEVER FELT IT', 0.5, 0.12, 80, 'red']] });
shot('M15', { bg: 'blur', face: { o: 'YOU', expr: 'confused', expr2: 'worried', at: 'yours', r: 300, x: -0.22 }, pops: [['wrong', 'SO REAL...', 0.7, 0.35, 80, 'cream'], ['wrong', 'SO WRONG?', 0.7, 0.5, 100, 'red'], ['yours', 'YOURS TOO?', 0.7, 0.68, 90, 'gold']] });

// ---------- memory is not a camera ----------
shot('M16', { bg: 'stage', draw(g, t, i, { cue }) { CA(g, t, 0.42, 0.45, 1.3); const k = K(t, cue('play'), 0.3); if (k > 0) { g.save(); g.translate(E.W * 0.78, E.H * 0.45); g.scale(k, k); g.beginPath(); g.moveTo(-60, -80); g.lineTo(90, 0); g.lineTo(-60, 80); g.closePath(); g.fillStyle = ui().gold; g.fill(); g.restore(); } }, pops: [['records', 'RECORD', 0.42, 0.15, 80, 'cream'], ['play', 'PRESS PLAY', 0.78, 0.75, 70, 'gold']] });
shot('M17', { bg: 'stage', draw(g, t) { CA(g, t, 0.5, 0.45, 1.3); cross(g, E.W * 0.5, E.H * 0.45, 260, prog(t, 0.6, 1.2)); }, pops: [[1.0, 'NOT HOW MEMORY WORKS', 0.5, 0.85, 80, 'red']] });
shot('M18', { bg: 'study', figs: [{ x: -0.1, o: 'BARTLETT', pose: 'holdFront', prop: 'paper', talk: true }], lower: ['FREDERIC BARTLETT', 'CAMBRIDGE, 1932'], icons: [['frame', 0.75, 0.3, 0.6, 'folk', { str: 'FOLK TALE' }]] });
shot('M19', { bg: 'black', draw(g, t, i, { cue }) { for (let j = 0; j < 4; j++) { const k = prog(t, j * 0.7, j * 0.7 + 0.4); if (k > 0) page(g, E.W * (0.16 + j * 0.23), E.H * 0.55, 0.62 * ease.outBack(k), 1 - j * 0.2, `RETELLING ${j + 1}`, j ? '#8a2a2a' : '#2a2a50'); } },
  pops: [['disappeared', 'DETAILS DISAPPEAR', 0.5, 0.1, 76, 'red']] });
shot('M20', { bg: 'school', figs: [{ x: -0.2, o: 'STU1', talk: true, pose: 'explain' }, { x: 0.2, o: 'STU2', facing: -1, expr: 'smile' }], pops: [['sense', 'MAKES MORE SENSE', 0.5, 0.15, 76, 'gold'], ['idea', 'NO IDEA', 0.5, 0.3, 90, 'red']] });
shot('M21', { bg: 'study', face: { o: 'BARTLETT', expr: 'thinking', expr2: 'awe', at: 'important', r: 300 } });
shot('M22', { bg: 'black', serif: [['replaying', "Remembering isn't replaying.", 0.4, 'cream'], ['rebuilding', "It's rebuilding.", 0.58, 'gold']] });
shot('M23', { bg: 'bp', draw(g, t, i, { cue }) { puzzle(g, E.W * 0.38, E.H * 0.55, prog(t, 0, 3), t); }, pops: [['expects', 'WHAT IT EXPECTS', 0.8, 0.35, 56, 'gold'], ['believes', 'WHAT IT BELIEVES', 0.8, 0.5, 56, 'gold'], ['since', 'WHAT IT HEARD SINCE', 0.8, 0.65, 56, 'gold']] });
shot('M24', { bg: 'black', icons: [['brain', 0.5, 0.5, 1.6, 0.1]], draw(g, t) { for (let j = 0; j < 6; j++) { const a = j * Math.PI / 3, k = prog(t, 0.8 + j * 0.15, 1.6 + j * 0.15); if (k <= 0) continue; const r0 = 650, r1 = lerp(650, 260, ease.out(k));
  seg(g, [[E.W / 2 + Math.cos(a) * r0, E.H / 2 + Math.sin(a) * r0 * 0.6], [E.W / 2 + Math.cos(a) * r1, E.H / 2 + Math.sin(a) * r1 * 0.6]], 10, ui().accent); circle(g, E.W / 2 + Math.cos(a) * r1, E.H / 2 + Math.sin(a) * r1 * 0.6, 16, ui().accent); } },
  pops: [['outside', 'CHANGED FROM OUTSIDE', 0.5, 0.1, 76, 'red']] });

// ---------- Loftus & Palmer ----------
shot('M25', { bg: 'school', figs: [{ x: -0.3, o: 'LOFTUS', pose: 'point' }, { x: -0.15, o: 'PALMER' }], lower: ['LOFTUS & PALMER', '1974'], draw(g, t) { rr(g, E.W * 0.52, E.H * 0.2, E.W * 0.4, E.H * 0.4, 12); g.fillStyle = '#1a1a22'; g.fill(); g.strokeStyle = ui().cream; g.lineWidth = 6; g.stroke();
  const p = (t * 0.4) % 1; car(g, E.W * (0.56 + 0.15 * p), E.H * 0.5, 0.45, '#3a6ea5'); car(g, E.W * (0.88 - 0.15 * p), E.H * 0.5, 0.45, '#d64a33', -1); text(g, 'FILM', E.W * 0.72, E.H * 0.25, { size: 36, color: ui().cream, font: FONTS.ui, weight: 900 }); } });
shot('M26', { bg: 'school', figs: [{ x: -0.3, o: 'STU1', pose: 'sit' }, { x: -0.1, o: 'STU2', pose: 'sit' }, { x: 0.1, o: 'KID', pose: 'sit', s: 1.3 }, { x: 0.3, o: 'PALMER', pose: 'talk', facing: -1, talk: true }], pops: [['simple', 'ONE SIMPLE QUESTION', 0.5, 0.15, 76, 'gold']] });
const crash = (word, sm) => (g, t, i, { cue }) => { const c = cue(word), k = clamp((t - (c - 1.2)) / 1.2), x = lerp(0.12, 0.38, ease.in(k));
  car(g, E.W * x, E.H * 0.72, 1, '#3a6ea5', 1, sm && k >= 1 ? 1 : 0); car(g, E.W * (1 - x), E.H * 0.72, 1, '#d64a33', -1, sm && k >= 1 ? 1 : 0); if (sm && k >= 1) { glow(g, E.W / 2, E.H * 0.65, 400, ui().gold, 0.6 * (1 - prog(t, c, c + 1))); glass(g, E.W / 2, E.H * 0.6, prog(t, c, c + 1.2), t); } };
shot('M27', { bg: 'street', draw: crash('hit', false), pops: [['hit', 'HIT', 0.5, 0.25, 180, 'cream']] });
shot('M28', { bg: 'black', line: 'JUST ONE WORD' });
shot('M29', { bg: 'street', draw: crash('smashed', true), pops: [['smashed', 'SMASHED', 0.5, 0.25, 200, 'red']], shake: 'smashed' });
shot('M30', { bg: 'bp', icons: [['meter', 0.35, 0.8, 1.2, 'heard', { v: 0.5, label: 'HIT' }], ['meter', 0.65, 0.8, 1.2, 'higher', { v: 0.85, label: 'SMASHED', col: 'red' }]], pops: [['higher', 'HIGHER SPEEDS', 0.5, 0.12, 80, 'red']] });
shot('M31', { bg: 'school', figs: [{ x: 0.25, o: 'LOFTUS', pose: 'talk', talk: true, facing: -1 }, { x: -0.25, o: 'STU2', expr: 'thinking' }], badge: [0.3, '1 WEEK LATER'], icons: [['bubble', 0.5, 0.25, 1, 'glass', { str: 'BROKEN GLASS?' }]] });
shot('M32', { bg: 'black', draw(g, t, i, { cue }) { rr(g, E.W * 0.25, E.H * 0.2, E.W * 0.5, E.H * 0.55, 12); g.fillStyle = '#1a1a22'; g.fill(); g.strokeStyle = ui().cream; g.lineWidth = 6; g.stroke();
  car(g, E.W * 0.42, E.H * 0.6, 0.55, '#3a6ea5'); car(g, E.W * 0.58, E.H * 0.6, 0.55, '#d64a33', -1); cross(g, E.W * 0.5, E.H * 0.45, 140, prog(t, cue('no'), cue('no') + 0.6)); }, pops: [['glass', 'NO BROKEN GLASS', 0.5, 0.88, 76, 'red']] });
shot('M33', { bg: 'bp', draw(g, t, i, { cue }) { const k = ease.out(prog(t, 0.3, 1.8)), base = E.H * 0.8; [[0.35, 0.3, 'HIT', ui().cream], [0.65, 0.68, 'SMASHED', ui().accent]].forEach(([x, v, l, c]) => { const h = E.H * 0.55 * v * k; rr(g, E.W * x - 90, base - h, 180, h, 14); g.fillStyle = c; g.fill(); text(g, l, E.W * x, base + 50, { size: 46, color: c, font: FONTS.ui, weight: 900 }); }); },
  pops: [['twice', 'MORE THAN 2× AS LIKELY', 0.5, 0.12, 76, 'gold']] });
shot('M34', { bg: 'black', serif: [[0.1, 'One word.', 0.38, 'gold'], ['remembered', 'And people remembered something that never happened.', 0.56, 'cream']] });
shot('M35', { bg: 'study', figs: [{ x: 0.25, o: 'LOFTUS', expr: 'thinking', pose: 'think', facing: -1 }], pops: [['plant', 'PLANT A WHOLE', 0.32, 0.3, 70, 'cream'], ['plant', 'MEMORY?', 0.32, 0.45, 110, 'gold']] });
shot('M36', { bg: 'study', figs: [{ x: -0.25, o: 'LOFTUS', pose: 'explain', talk: true }, { x: 0.05, o: 'PICKRELL', facing: -1, expr: 'smile' }], lower: ['LOFTUS & PICKRELL', '1990s'] });
shot('M37', { bg: 'black', draw(g, t, i, { cue }) { const ss = ['BIRTHDAY', 'FIRST PET', 'BEACH TRIP', 'LOST IN A MALL']; ss.forEach((s, j) => { const k = ease.outBack(prog(t, j * 0.5, j * 0.5 + 0.4)); if (k <= 0) return; const x = E.W * (0.14 + j * 0.24), y = E.H * 0.48, bad = j === 3;
  g.save(); g.translate(x, y); g.scale(k, k); rr(g, -190, -150, 380, 300, 18); g.fillStyle = 'rgba(16,10,14,.92)'; g.fill(); g.strokeStyle = bad && t > cue('except') ? ui().accent : ui().gold; g.lineWidth = 6; g.stroke(); text(g, s, 0, -60, { size: 40, color: ui().cream, font: FONTS.ui, weight: 900 }); g.restore();
  if (!bad && t > cue('true')) check(g, x, y + 50, 50, prog(t, cue('true') + j * 0.15, cue('true') + j * 0.15 + 0.4)); if (bad && t > cue('except')) cross(g, x, y + 50, 60, prog(t, cue('except'), cue('except') + 0.5)); }); },
  pops: [['childhood', 'CHILDHOOD STORIES', 0.5, 0.12, 76, 'gold']] });
shot('M38', { bg: 'street', figs: [{ x: -0.1, o: 'KID', expr: 'cry', s: 1.1 }, { x: 0.2, o: 'ELDER', pose: 'reach', facing: -1, expr: 'smile', at: 'rescued' }], icons: [['store', 0.2, 0.35, 0.9, 0.1], ['store', 0.8, 0.35, 0.9, 0.2]], pops: [['mall', 'LOST IN THE MALL', 0.5, 0.12, 80, 'gold']] });
shot('M39', { bg: 'black', line: 'IT NEVER HAPPENED' });
shot('M40', { bg: 'bp', icons: [['people', 0.5, 0.55, 5, 0.1, { n: 4, cols: 4, split: 0.25, lc: 'red' }]], 
  pops: [['quarter', 'ABOUT 1 IN 4', 0.5, 0.15, 100, 'gold'], ['remember', 'REMEMBERED IT', 0.5, 0.88, 70, 'cream']] });
shot('M41', { bg: 'blur', face: { o: 'KID', expr: 'scared', r: 280, x: -0.2 }, icons: [['bubble', 0.68, 0.3, 1, 'stranger', { str: 'GREY COAT, A HAT…' }], ['bubble', 0.68, 0.62, 1, 'scared', { str: 'I WAS SO SCARED', col: 'red' }]] });
shot('M42', { bg: 'black', serif: [[0.2, 'A completely false childhood memory,', 0.42, 'cream'], ['built', 'built from a few sentences.', 0.58, 'gold']] });

// ---------- Challenger ----------
shot('M43', { bg: 'blur', face: { o: 'YOU', expr: 'smirk', r: 300, x: -0.2 }, icons: [['bubble', 0.68, 0.4, 1, 'never', { str: "I'D NEVER FORGET" }]] });
shot('M44', { bg: 'black', line: "LET'S TEST THAT" });
shot('M45', { bg: 'street', draw(g, t, i, { cue }) { const b = cue('exploded'); shuttle(g, E.W / 2, E.H * 0.85, prog(t, 0, b), t, t > b ? prog(t, b, b + 1.2) : 0); }, badge: [0.3, 'JANUARY 28, 1986'], pops: [['Challenger', 'CHALLENGER', 0.3, 0.12, 90, 'cream']] });
shot('M46', { bg: 'school', figs: [{ x: -0.35, o: 'NEISSER', pose: 'talk', talk: true }, { x: -0.18, o: 'HARSCH' }, { x: 0.1, o: 'STU1', pose: 'sit', prop: 'paper' }, { x: 0.3, o: 'STU2', pose: 'sit', prop: 'paper' }], lower: ['NEISSER & HARSCH', 'THE DAY AFTER'] });
shot('M47', { bg: 'school', figs: [{ x: -0.1, o: 'STU1', pose: 'sit', expr: 'thinking' }, { x: 0.15, o: 'STU2', pose: 'sit', expr: 'thinking' }], badge: [0.3, '~2.5 YEARS LATER'] });
shot('M48', { bg: 'black', draw(g, t, i, { cue }) { page(g, E.W * 0.25, E.H * 0.55, 0.85, 1, 'DAY AFTER', '#2a2a50'); const k = prog(t, 0.3, 1); if (k > 0) page(g, E.W * 0.75, E.H * 0.55, 0.85 * ease.outBack(k), prog(t, 0.3, 3), '2.5 YEARS LATER', '#8a2a2a'); text(g, '≠', E.W / 2, E.H * 0.55, { size: 200, color: ui().accent, font: FONTS.title, weight: 700 }); },
  pops: [['places', 'PLACES', 0.5, 0.15, 60, 'red'], ['people', 'PEOPLE', 0.5, 0.27, 60, 'red'], ['news', 'HOW THEY HEARD', 0.5, 0.92, 60, 'red']] });
shot('M49', { bg: 'black', line: "HERE'S THE UNSETTLING PART" });
shot('M50', { bg: 'blur', face: { o: 'STU1', expr: 'smile', r: 280, x: -0.2 }, icons: [['meter', 0.72, 0.85, 1.3, 'confident', { v: 0.95, label: 'CONFIDENCE' }]] });
shot('M51', { bg: 'school', figs: [{ x: -0.25, o: 'STU2', pose: 'crossArms', expr: 'angry', at: 'insisted' }], draw(g, t) { page(g, E.W * 0.55, E.H * 0.5, 0.75, 1, 'IN YOUR OWN HANDWRITING', '#2a2a50'); }, icons: [['bubble', 0.25, 0.22, 1, 'insisted', { str: 'THAT’S NOT RIGHT', col: 'red' }]] });
shot('M52', { bg: 'black', draw(g, t, i, { cue }) { CA(g, t, 0.5, 0.5, 1); const c = cue('flashbulb'), f = 1 - prog(t, c, c + 0.6); if (t > c && f > 0) { g.fillStyle = alpha('#ffffff', f * 0.8); g.fillRect(0, 0, E.W, E.H); } }, pops: [['flashbulb', 'FLASHBULB MEMORIES', 0.5, 0.15, 90, 'gold'], ['photograph', 'VIVID · PERMANENT?', 0.5, 0.85, 70, 'cream']] });
shot('M53', { bg: 'blur', draw(g, t) { photo(g, E.W * 0.5, E.H * 0.5, 1.2, 'STU1', prog(t, 0.8, 3.5), -0.05); }, pops: [['fade', 'FADE', 0.2, 0.4, 100, 'red'], ['change', 'CHANGE', 0.8, 0.6, 100, 'red']] });
shot('M54', { bg: 'bp', icons: [['meter', 0.35, 0.8, 1.3, 0.2, { v: 0.95, label: 'CONFIDENCE' }]], draw(g, t, i, { cue }) { const v = lerp(0.95, 0.3, ease.inOut(prog(t, cue('accuracy'), cue('accuracy') + 1.5))); g.save(); g.translate(E.W * 0.65, E.H * 0.8); g.scale(1.3, 1.3);
  rr(g, -40, -360, 80, 360, 40); g.fillStyle = 'rgba(14,8,12,.8)'; g.fill(); rr(g, -30, -10 - 340 * v, 60, 340 * v, 30); g.fillStyle = ui().accent; g.fill(); text(g, 'ACCURACY', 0, 50, { size: 40, color: ui().accent, font: FONTS.ui, weight: 900 }); g.restore(); },
  pops: [['confidence', 'WHAT STAYS: CONFIDENCE', 0.5, 0.12, 70, 'gold']] });

// ---------- back to Jennifer ----------
shot('M55', { bg: 'blur', face: { o: 'JEN', expr: 'worried', r: 300 }, lower: ['JENNIFER THOMPSON', 'THE WITNESS'] });
shot('M56', { bg: 'black', draw(g, t, i, { cue }) { const st = [['photo', 'PHOTO'], ['lineup', 'LINEUP'], ['court', 'COURT']]; st.forEach(([w, l], j) => { const k = ease.outBack(prog(t, cue(w), cue(w) + 0.4)); if (k <= 0) return;
  mug(g, E.W * (0.2 + j * 0.3), E.H * 0.5, 1.1 * k, 'RON'); text(g, l, E.W * (0.2 + j * 0.3), E.H * 0.82, { size: 60, color: ui().gold, font: FONTS.ui, weight: 900 }); if (j) text(g, '→', E.W * (0.05 + j * 0.3), E.H * 0.5, { size: 90, color: ui().cream, font: FONTS.title, weight: 700 }); }); } });
shot('M57', { bg: 'black', draw(g, t, i, { cue }) { const k = ease.inOut(prog(t, cue('laid'), cue('laid') + 2.5)); g.save(); g.filter = `blur(${Math.round(18 * (1 - k))}px)`; g.globalAlpha = 1 - k;
  bigFace(g, E.W / 2, E.H * 0.6, 300, { outfit: { top: 'hoodie', color: '#1a1418', head: 'beanie', headColor: '#121014' }, expr: 'angry', rimColor: ui().accent }); g.restore(); g.save(); g.globalAlpha = k; bigFace(g, E.W / 2, E.H * 0.6, 300, { outfit: { top: 'jersey', color: '#d6a03a', head: 'cap', headColor: '#2a2a30' }, expr: 'neutral', rimColor: ui().gold }); g.restore(); },
  pops: [['blurry', 'THE BLURRY MEMORY', 0.5, 0.12, 70, 'cream']] });
shot('M58', { bg: 'blur', face: { o: 'JEN', expr: 'determined', r: 280, x: -0.2 }, icons: [['meter', 0.72, 0.85, 1.3, 'certain', { v: 1, label: 'CERTAINTY', dur: 2 }]] });
shot('M59', { bg: 'black', serif: [['proof', 'Confidence is not proof.', 0.4, 'cream'], ['rewritten', 'It may be a sign of rewriting.', 0.58, 'gold']] });
shot('M60', { bg: 'bp', icons: [['people', 0.5, 0.52, 4, 1.5, { n: 10, cols: 10, split: 0.7, lc: 'red', dur: 0.01 }]], lower: ['THE INNOCENCE PROJECT', 'DNA EXONERATIONS'], pops: [['seven', 'ABOUT 7 IN 10', 0.5, 0.15, 100, 'red'], ['eyewitness', 'INVOLVED MISTAKEN EYEWITNESSES', 0.5, 0.68, 56, 'cream']] });

// ---------- why ----------
shot('M61', { bg: 'blur', face: { o: 'YOU', expr: 'thinking', r: 300, x: -0.2 }, pops: [['why', 'WHY?', 0.7, 0.35, 150, 'gold'], ['perfect', 'NO PERFECT RECORD?', 0.7, 0.6, 70, 'cream']] });
shot('M62', { bg: 'stage', draw(g, t, i, { cue }) { cabinet(g, E.W * 0.5, E.H * 0.5, 0.9); cross(g, E.W * 0.5, E.H * 0.5, 220, prog(t, cue('never'), cue('never') + 0.6)); }, pops: [['archive', 'NOT AN ARCHIVE', 0.5, 0.1, 80, 'red']] });
shot('M63', { bg: 'black', icons: [['brain', 0.3, 0.5, 1.3, 0.1]], draw(g, t, i, { cue }) { const k = ease.out(prog(t, cue('survive'), cue('survive') + 1)); seg(g, [[E.W * 0.45, E.H * 0.5], [lerp(E.W * 0.45, E.W * 0.75, k), E.H * 0.5]], 12, ui().gold); if (k > 0.9) text(g, 'THE FUTURE', E.W * 0.82, E.H * 0.5, { size: 70, color: ui().gold, font: FONTS.title, weight: 700 }); } });
shot('M64', { bg: 'bp', draw(g, t, i, { cue }) { const k = ease.inOut(prog(t, cue('blend'), cue('blend') + 2)); circle(g, lerp(E.W * 0.25, E.W * 0.45, k), E.H * 0.5, 120, alpha(ui().gold, 0.8)); circle(g, lerp(E.W * 0.75, E.W * 0.55, k), E.H * 0.5, 120, alpha(ui().accent, 0.8));
  text(g, 'OLD', lerp(E.W * 0.25, E.W * 0.45, k), E.H * 0.5, { size: 50, color: '#2a1810', font: FONTS.ui, weight: 900 }); text(g, 'NEW', lerp(E.W * 0.75, E.W * 0.55, k), E.H * 0.5, { size: 50, color: '#2a1810', font: FONTS.ui, weight: 900 }); },
  pops: [['predict', 'PREDICT WHAT HAPPENS NEXT', 0.5, 0.82, 64, 'gold']] });
shot('M65', { bg: 'black', pops: [['gist', 'THE GIST', 0.3, 0.5, 130, 'gold'], ['detail', '> EVERY DETAIL', 0.7, 0.5, 80, 'cream']] });
shot('M66', { bg: 'stage', draw(g, t, i, { cue }) { lock(g, E.W * 0.5, E.H * 0.6, 1.2, prog(t, cue('changeable'), cue('changeable') + 0.6)); }, pops: [['changeable', 'CHANGEABLE', 0.5, 0.15, 90, 'gold'], ['slip', 'SOMETHING NEW SLIPS IN', 0.5, 0.88, 64, 'red']] });
shot('M67', { bg: 'black', icons: [['check', 0.5, 0.45, 2.2, 0.1]], pops: [['helpful', 'MOSTLY HELPFUL', 0.5, 0.8, 90, 'green']] });
shot('M68', { bg: 'black', serif: [['recording', 'Less like a recording,', 0.35, 'cream'], ['story', 'more like a story you keep editing.', 0.5, 'gold']], icons: [['frame', 0.5, 0.72, 0.5, 'edits', { str: 'EDIT #47' }]] });

// ---------- what to do ----------
shot('M69', { bg: 'black', line: 'WHAT CAN YOU DO?' });
shot('M70', { bg: 'study', draw(g, t) { page(g, E.W * 0.7, E.H * 0.52, 0.9, prog(t, 0.8, 5), 'TODAY', '#2a2a50'); }, figs: [{ x: -0.25, o: 'YOU', pose: 'holdFront', prop: 'paper', expr: 'smile' }], pops: [[0.2, '1. WRITE IT DOWN', 0.3, 0.12, 80, 'gold'], ['reliable', 'MORE RELIABLE', 0.7, 0.92, 56, 'green']] });
shot('M71', { bg: 'blur', icons: [['meter', 0.3, 0.85, 1.3, 'careful', { v: 0.95, label: 'SURE' }], ['meter', 0.7, 0.85, 1.3, 'right', { v: 0.45, label: 'RIGHT', col: 'red' }]], pops: [[0.2, '2. DOUBT CONFIDENCE', 0.5, 0.12, 80, 'gold'], ['right', '≠', 0.5, 0.55, 160, 'red']] });
shot('M72', { bg: 'office', figs: [{ x: -0.2, o: 'STU1', pose: 'explain', talk: true }, { x: 0.2, o: 'STU2', pose: 'explain', facing: -1 }], icons: [['bubble', 0.3, 0.2, 1, 'differently', { str: 'IT WAS TUESDAY' }], ['bubble', 0.7, 0.32, 1, 'differently', { str: 'NO, FRIDAY!', col: 'red' }]], pops: [['drifted', 'NEITHER IS LYING', 0.5, 0.88, 64, 'gold']] });
shot('M73', { bg: 'black', pops: [[0.2, '3. WATCH THE WORDS', 0.5, 0.12, 80, 'gold'], ['Leading', 'LEADING QUESTIONS', 0.5, 0.35, 64, 'red'], ['retold', 'RETOLD STORIES', 0.5, 0.48, 64, 'red'], ['photos', 'OLD PHOTOS', 0.5, 0.61, 64, 'red'], ['open', 'ASK OPEN QUESTIONS', 0.5, 0.82, 72, 'green']] });

// ---------- ending ----------
shot('M74', { bg: 'stage', figs: [{ x: -0.18, o: 'JEN', expr: 'sad', pose: 'stand' }, { x: 0.18, o: 'RON', facing: -1, expr: 'neutral' }], icons: [['bubble', 0.35, 0.25, 1, 'apologised', { str: "I'M SORRY" }]] });
shot('M75', { bg: 'blur', face: { o: 'RON', expr: 'smile', r: 300 }, pops: [['forgave', 'HE FORGAVE HER', 0.5, 0.15, 90, 'gold']] });
shot('M76', { bg: 'stage', figs: [{ x: -0.3, o: 'JEN', expr: 'happy' }, { x: 0.3, o: 'RON', facing: -1, expr: 'happy' }], draw(g, t) { book(g, E.W * 0.5, E.H * 0.48, 0.9 * ease.outBack(prog(t, 1, 1.6)), 'PICKING COTTON'); }, pops: [['friends', 'FRIENDS', 0.5, 0.1, 80, 'green']] });
shot('M77', { bg: 'black', icons: [['brain', 0.5, 0.48, 1.8, 0.1]], pops: [['who', "IT'S WHO YOU ARE", 0.5, 0.85, 80, 'gold']] });
shot('M78', { bg: 'stage', draw(g, t) { CA(g, t, 0.5, 0.45, 1.2); cross(g, E.W * 0.5, E.H * 0.45, 240, prog(t, 0.3, 0.9)); }, pops: [['camera', "NOT A CAMERA", 0.5, 0.85, 80, 'red']] });
shot('M79', { bg: 'study', figs: [{ x: 0, o: 'YOU', pose: 'holdFront', prop: 'paper', expr: 'smile' }], serif: [[0.1, "It's a storyteller.", 0.2, 'gold']] });
shot('M80', { bg: 'blur', face: { o: 'YOU', expr: 'thinking', expr2: 'smile', at: 'comments', r: 280, x: -0.22 }, icons: [['bubble', 0.7, 0.3, 1, 'comments', { str: 'TELL ME BELOW' }]], pops: [['subscribe', 'SUBSCRIBE', 0.7, 0.62, 100, 'red']] });
