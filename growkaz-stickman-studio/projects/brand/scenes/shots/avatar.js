// Channel avatar designs for "Psychological Minds". Square crop = centre 1080x1080 of the 1920x1080 frame.
import { E, S, registerShot, mood, glow, circle, ring, seg, alpha, shade, mix, text, FONTS, radGrad } from '/engine/core.js';
import { bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';

const CX = () => E.W / 2, CY = () => E.H / 2;
function bg(g) {
  const M = mood('night'), ui = S().ui;
  g.fillStyle = '#000'; g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = radGrad(g, CX(), CY(), 0, 560, [mix(ui.accent, M.dark, 0.55), shade(M.dark, -0.2), shade(M.dark, -0.6)]); g.fillRect(CX() - 540, 0, 1080, 1080);
  FX.stars(g, 0, { count: 70, area: [CX() - 540, 0, 1080, 1080], seed: 9 });
}
// glowing line-art brain (side view: lobed outline, centre fissure, folds)
function brain(g, x, y, r, col) {
  glow(g, x, y, r * 2.4, col, 0.55);
  g.strokeStyle = col; g.lineWidth = r * 0.085; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath(); for (let i = 0; i <= 160; i++) { const th = i / 160 * Math.PI * 2, k = 1 + 0.07 * Math.sin(th * 9);
    const px = x + Math.cos(th) * r * 1.15 * k, py = y + Math.sin(th) * r * 0.82 * k * (Math.sin(th) > 0 ? 0.85 : 1); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.closePath(); g.stroke();
  g.beginPath(); g.moveTo(x - r * 0.05, y - r * 0.78); g.bezierCurveTo(x + r * 0.15, y - r * 0.4, x - r * 0.2, y - r * 0.1, x + r * 0.05, y + r * 0.3); g.stroke();
  const folds = [[-0.75, -0.3, -0.45, 0.0, -0.7, 0.3], [-0.35, -0.55, -0.15, -0.3, -0.4, -0.05], [0.4, -0.55, 0.2, -0.25, 0.5, -0.05], [0.8, -0.2, 0.5, 0.05, 0.75, 0.35], [-0.3, 0.25, -0.05, 0.45, 0.25, 0.3]];
  for (const [a, b, c, d, e, f] of folds) { g.beginPath(); g.moveTo(x + a * r, y + b * r); g.quadraticCurveTo(x + c * r, y + d * r, x + e * r, y + f * r); g.stroke(); }
  for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.3; seg(g, [[x + Math.cos(a) * r * 1.35, y + Math.sin(a) * r * 1.05], [x + Math.cos(a) * r * 1.65, y + Math.sin(a) * r * 1.3]], r * 0.06, alpha(col, 0.8)); }
}
function character(g, yOff = 0, scale = 1) {
  const M = mood('night'), ui = S().ui, x = CX(), y = CY() + 150 * scale + yOff, r = 250 * scale;
  bigFace(g, x, y, r, { outfit: { top: 'hoodie', color: '#d64a33', head: 'none' }, expr: 'smile', look: [0, -0.6], rimColor: ui.gold, rimSide: 1 });
  brain(g, x, y - r * 1.55, r * 0.5, ui.gold);
}
function arcText(g, str, r, startDeg, size, col, dir = 1) {
  g.save(); g.translate(CX(), CY()); g.font = `700 ${size}px ${FONTS.title}`; g.fillStyle = col; g.textAlign = 'center'; g.textBaseline = 'middle';
  const chars = [...str], w = chars.map(c => g.measureText(c).width + size * 0.12), total = w.reduce((a, b) => a + b, 0);
  let a = startDeg * Math.PI / 180 - dir * (total / r) / 2;
  chars.forEach((c, i) => { a += dir * w[i] / 2 / r; g.save(); g.rotate(a); g.translate(0, -dir * r); if (dir < 0) g.rotate(0); g.shadowColor = alpha(col, 0.6); g.shadowBlur = 16; g.fillText(c, 0, 0); g.restore(); a += dir * w[i] / 2 / r; });
  g.restore();
}

registerShot('A', { draw(g) { bg(g); character(g, 30, 1.05); } });
registerShot('B', { draw(g) { const ui = S().ui; bg(g); character(g, 40, 0.82);
  ring(g, CX(), CY(), 430, 4, alpha(ui.gold, 0.5));
  arcText(g, 'PSYCHOLOGICAL', 470, 0, 66, ui.gold, 1); arcText(g, 'MINDS', 470, 0, 66, ui.cream, -1); } });
registerShot('C', { draw(g) { const ui = S().ui; bg(g); brain(g, CX(), CY() - 30, 300, alpha(ui.gold, 0.35));
  text(g, 'PM', CX(), CY() - 10, { size: 330, color: ui.cream, font: FONTS.title, weight: 700, glow: 30, glowColor: alpha(ui.gold, 0.7) });
  text(g, 'PSYCHOLOGICAL MINDS', CX(), CY() + 230, { size: 50, color: ui.gold, font: FONTS.ui, weight: 900, spacing: 6 }); } });
