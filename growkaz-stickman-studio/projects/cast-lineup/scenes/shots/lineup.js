// Character design lineup: full bodies (shot a) and face close-ups (shot b).
import { E, registerShot, mood, backdrop, glow, alpha, shade, text, FONTS, S, seg, circle, rr } from '/engine/core.js';
import { drawFigure, POSES, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';

export const DESIGNS = [
  { name: 'THE LIEUTENANT', role: 'Calm hero, acts on instinct', o: { top: 'jersey', color: '#2a2230', color2: '#f2c21a', number: '7', head: 'cap', headColor: '#f2c21a', gloves: '#f2c21a' }, pose: 'ready', expr: 'determined', prop: null, extra: 'stripes' },
  { name: 'THE SKEPTIC', role: 'Scientist who doubts gut calls', o: { top: 'labcoat', face: 'glasses', head: 'bun' }, pose: 'think', expr: 'thinking', prop: 'paper' },
  { name: 'THE CON ARTIST', role: 'Your gut when it lies', o: { top: 'suit', color: '#1c1822', color2: '#d64a33', head: 'fedora', headColor: '#1c1822', face: 'sunglasses' }, pose: 'crossArms', expr: 'smirk', prop: null, extra: 'cardFan' },
  { name: 'THE MENTOR', role: 'Old, wise narrator figure', o: { top: 'trench', color: '#3a6ea5', head: 'none', face: 'glasses' }, pose: 'explain', expr: 'smile', prop: 'pointer' },
  { name: 'YOU', role: 'The viewer, curious and unsure', o: { top: 'hoodie', color: '#d64a33', head: 'hood' }, pose: 'shrug', expr: 'confused', prop: 'phone' },
  { name: 'THE ROOKIE', role: 'Eager, over-confident learner', o: { top: 'tracksuit', color: '#8a5ad6', color2: '#ffffff', head: 'headband', headColor: '#3fb950' }, pose: 'cheer', expr: 'joy', prop: null },
  { name: 'THE GAMBLER', role: 'Trusts hunches, loses often', o: { top: 'tshirt', color: '#3fb950', head: 'visor', headColor: '#3fb950' }, pose: 'holdFront', expr: 'nervous', prop: null, extra: 'chips' },
  { name: 'THE KID', role: 'Pure instinct, no filter', o: { top: 'dress', color: '#f29ac0', head: 'ponytail', kid: true }, pose: 'wave', expr: 'happy', prop: null, extra: 'balloon' },
];

function extras(g, d, x, GY, s, f) {
  const hx = x + 3 * s * f, hy = GY - 180 * s;          // approx head centre
  if (d.extra === 'headphones') { g.strokeStyle = '#2b2b33'; g.lineWidth = 7 * s; g.beginPath(); g.arc(hx, hy, 30 * s, Math.PI * 1.05, Math.PI * 1.95); g.stroke(); rr(g, hx - 36 * s, hy - 8 * s, 14 * s, 24 * s, 6 * s); g.fillStyle = '#f2ece4'; g.fill(); }
  if (d.extra === 'beard') { g.fillStyle = '#d9d4cc'; g.beginPath(); g.ellipse(hx + 8 * s * f, hy + 22 * s, 18 * s, 14 * s, 0, 0, 7); g.fill(); }
  if (d.extra === 'stripes') { for (const dy of [-110, -80]) seg(g, [[x - 14 * s, GY + dy * s], [x + 16 * s, GY + dy * s]], 4 * s, '#f2c21a'); }
  if (d.extra === 'cardFan') { for (let i = 0; i < 3; i++) { g.save(); g.translate(x + 60 * s, GY - 220 * s); g.rotate(-0.4 + i * 0.35); rr(g, -12 * s, -36 * s, 24 * s, 34 * s, 4 * s); g.fillStyle = '#f4efe6'; g.fill(); circle(g, 0, -20 * s, 5 * s, '#d64a33'); g.restore(); } }
  if (d.extra === 'chips') { for (let i = 0; i < 4; i++) { g.fillStyle = i % 2 ? '#d64a33' : '#f2ece4'; g.beginPath(); g.ellipse(x - 40 * s, GY - 6 * s - i * 7 * s, 16 * s, 5 * s, 0, 0, 7); g.fill(); } }
  if (d.extra === 'balloon') { seg(g, [[x + 34 * s, GY - 150 * s], [x + 50 * s, GY - 290 * s]], 2, '#f2ece4'); circle(g, x + 50 * s, GY - 320 * s, 30 * s, '#f2c21a'); circle(g, x + 42 * s, GY - 330 * s, 8 * s, 'rgba(255,255,255,.5)'); }
}

registerShot('a', { draw(g, t) {
  const M = mood('night'), ui = S().ui, GY = E.H * 0.7, s = 1.05, n = DESIGNS.length, step = E.W / n;
  backdrop(g, [shade(M.dark, -0.4), shade(M.wall, -0.35)]); FX.stars(g, t, { count: 60 });
  g.fillStyle = shade(M.floor, -0.45); g.fillRect(0, GY, E.W, E.H);
  text(g, 'CHARACTER DESIGNS', E.W / 2, 80, { size: 54, color: ui.gold, font: FONTS.title, weight: 700, spacing: 6, glow: 14, glowColor: alpha(ui.gold, 0.5) });
  DESIGNS.forEach((d, i) => {
    const x = step * (i + 0.5);
    FX.lightCone(g, x, 120, { angle: Math.PI / 2, spread: 0.22, len: GY - 60, color: M.key, a: 0.1 }); FX.pool(g, x, GY + 6, 95, 16, M.key, 0.35);
    drawFigure(g, { x, y: GY, s, facing: 1, outfit: d.o, pose: POSES[d.pose], expr: d.expr, prop: d.prop ? (typeof d.prop === 'string' ? d.prop : d.prop) : undefined, rim: { color: M.rim, dir: [0, -1], w: 4 } });
    extras(g, d, x, GY, d.o.kid ? s * 0.72 : s, 1);
    text(g, String(i + 1), x, GY + 70, { size: 30, color: alpha(ui.cream, 0.6), font: FONTS.ui, weight: 900 });
    text(g, d.name, x, GY + 120, { size: 25, color: ui.cream, font: FONTS.ui, weight: 900, spacing: 1 });
    text(g, d.role, x, GY + 158, { size: 17, color: alpha(ui.cream, 0.7), font: FONTS.ui, weight: 700 });
  });
} });

registerShot('b', { draw(g, t) {
  const M = mood('night'), ui = S().ui;
  backdrop(g, [shade(M.dark, -0.4), shade(M.wall, -0.35)]);
  text(g, 'CLOSE-UP FACES', E.W / 2, 70, { size: 50, color: ui.gold, font: FONTS.title, weight: 700, spacing: 6 });
  DESIGNS.forEach((d, i) => {
    const cx = E.W / 4 * ((i % 4) + 0.5), cy = 290 + Math.floor(i / 4) * 450;
    glow(g, cx, cy, 260, M.rim, 0.12);
    bigFace(g, cx, cy, 120, { outfit: d.o, expr: d.expr, rimColor: M.rim, rimSide: 1 });
    text(g, `${i + 1}. ${d.name}`, cx, cy + 232, { size: 28, color: ui.cream, font: FONTS.ui, weight: 900 });
  });
} });

// ---- role characters: costume tells you who they are ----
export const ROLES = [
  { name: 'FIREFIGHTER', role: 'Helmet + shield, fire coat, air tank', o: { top: 'turnout', legs: '#b8903a', head: 'firehelmet', headColor: '#c8322a', color2: '#f2ece4', gloves: '#2a2a30' }, pose: 'ready', expr: 'determined' },
  { name: 'POLICE OFFICER', role: 'Peaked cap, badge, duty belt', o: { top: 'police', legs: '#1a2440', head: 'policecap', headColor: '#22304f', color2: '#f2c21a' }, pose: 'crossArms', expr: 'neutral' },
  { name: 'DOCTOR', role: 'Scrubs, surgical cap, stethoscope', o: { top: 'scrubs', legs: '#3f9e9a', head: 'surgeoncap', headColor: '#3f9e9a' }, pose: 'explain', expr: 'smile', prop: 'tablet' },
  { name: 'SOLDIER', role: 'Army helmet, camo fatigues', o: { top: 'military', legs: '#4f5a36', head: 'armyhelmet', headColor: '#4f5a36' }, pose: 'stand', expr: 'determined' },
  { name: 'CHEF', role: 'Tall white hat, chef coat, apron', o: { top: 'chefcoat', head: 'chefhat', color2: '#2c2a30' }, pose: 'holdFront', expr: 'happy', prop: 'cup' },
  { name: 'KING', role: 'Gold crown, royal robe', o: { top: 'robe', head: 'crown', headColor: '#f2c21a', color2: '#f2c21a' }, pose: 'point', expr: 'smirk' },
  { name: 'SCIENTIST', role: 'Lab coat, glasses, notes', o: { top: 'labcoat', face: 'glasses', head: 'bun' }, pose: 'think', expr: 'thinking', prop: 'paper' },
  { name: 'DETECTIVE', role: 'Trench coat, fedora, flashlight', o: { top: 'trench', color: '#8a6a44', head: 'fedora', headColor: '#4a3a2a' }, pose: 'holdFront', expr: 'thinking', prop: 'flashlight' },
];
function roleSheet(g, t, list, title) {
  const M = mood('night'), ui = S().ui, GY = E.H * 0.7, s = 1.05, step = E.W / list.length;
  backdrop(g, [shade(M.dark, -0.4), shade(M.wall, -0.35)]); FX.stars(g, t, { count: 60 });
  g.fillStyle = shade(M.floor, -0.45); g.fillRect(0, GY, E.W, E.H);
  text(g, title, E.W / 2, 80, { size: 54, color: ui.gold, font: FONTS.title, weight: 700, spacing: 6, glow: 14, glowColor: alpha(ui.gold, 0.5) });
  list.forEach((d, i) => { const x = step * (i + 0.5);
    FX.lightCone(g, x, 120, { angle: Math.PI / 2, spread: 0.22, len: GY - 60, color: M.key, a: 0.1 }); FX.pool(g, x, GY + 6, 95, 16, M.key, 0.35);
    drawFigure(g, { x, y: GY, s, facing: 1, outfit: d.o, pose: POSES[d.pose], expr: d.expr, prop: d.prop, rim: { color: M.rim, dir: [0, -1], w: 4 } });
    text(g, String(i + 1), x, GY + 70, { size: 30, color: alpha(ui.cream, 0.6), font: FONTS.ui, weight: 900 });
    text(g, d.name, x, GY + 120, { size: 25, color: ui.cream, font: FONTS.ui, weight: 900, spacing: 1 });
    text(g, d.role, x, GY + 158, { size: 16, color: alpha(ui.cream, 0.7), font: FONTS.ui, weight: 700 }); });
}
registerShot('c', { draw(g, t) { roleSheet(g, t, ROLES, 'ROLE CHARACTERS'); } });
registerShot('d', { draw(g, t) {
  const M = mood('night'), ui = S().ui; backdrop(g, [shade(M.dark, -0.4), shade(M.wall, -0.35)]);
  text(g, 'ROLE CHARACTERS: CLOSE-UPS', E.W / 2, 70, { size: 46, color: ui.gold, font: FONTS.title, weight: 700, spacing: 5 });
  ROLES.forEach((d, i) => { const cx = E.W / 4 * ((i % 4) + 0.5), cy = 300 + Math.floor(i / 4) * 500; const ly = cy + 205;
    glow(g, cx, cy, 260, M.rim, 0.12); bigFace(g, cx, cy, 100, { outfit: d.o, expr: d.expr, rimColor: M.rim, rimSide: 1 });
    text(g, `${i + 1}. ${d.name}`, cx, ly, { size: 28, color: ui.cream, font: FONTS.ui, weight: 900 }); });
} });
