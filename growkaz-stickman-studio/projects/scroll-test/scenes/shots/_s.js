// shots/_s.js — scrolling-video props (underscore: not auto-loaded).
import { E, S, ease, prog, clamp, lerp, seg, circle, ring, rr, poly, glow, alpha, shade, text, FONTS } from '/engine/core.js';
const ui = () => S().ui;
const PC = ['#f29ac0', '#3fb950', '#8a5ad6', '#3a6ea5', '#f2c21a', '#d64a33'];
// phone with a scrolling feed; speed = px/s, k = scale-in
export function phone(g, x, y, s, t, o = {}) { g.save(); g.translate(x, y); g.scale(s, s); glow(g, 0, 0, 420, '#7ab8ff', 0.35 * (o.glow ?? 1));
  rr(g, -170, -320, 340, 640, 40); g.fillStyle = '#121016'; g.fill(); rr(g, -152, -300, 304, 600, 28); g.fillStyle = '#1e1a24'; g.fill();
  g.save(); rr(g, -152, -300, 304, 600, 28); g.clip(); const sp = o.speed ?? 160, off = (t * sp) % 220;
  for (let i = -1; i < 5; i++) { const yy = -290 + i * 220 - off; rr(g, -136, yy, 272, 200, 16); g.fillStyle = '#2a2430'; g.fill(); const c = PC[(i + Math.floor(t * sp / 220) + 60) % PC.length];
    rr(g, -124, yy + 12, 248, 130, 10); g.fillStyle = alpha(c, 0.75); g.fill(); circle(g, -104, yy + 168, 14, c); rr(g, -80, yy + 160, 140, 14, 7); g.fillStyle = alpha('#fff', 0.35); g.fill();
    if (o.likes) text(g, '♥ ' + (((i + 9) * 37) % 900), 90, yy + 170, { size: 22, color: ui().accent, font: FONTS.ui, weight: 900 }); }
  g.restore(); if (o.refresh) { ring(g, 0, -250, 22, 6, alpha('#fff', 0.8)); } g.restore(); }
export function thumb(g, x, y, s, t, swipe) { const dy = -Math.abs(Math.sin(t * Math.PI * (swipe || 1.2))) * 90; g.save(); g.translate(x, y + dy); g.scale(s, s); g.rotate(-0.3);
  rr(g, -46, -40, 92, 220, 46); g.fillStyle = '#e8b48a'; g.fill(); g.lineWidth = 6; g.strokeStyle = '#8a5a3a'; g.stroke(); rr(g, -30, -28, 60, 70, 24); g.fillStyle = '#f4d4c0'; g.fill(); g.restore(); }
export function bedroom(g, t) { g.fillStyle = '#07060c'; g.fillRect(0, 0, E.W, E.H); rr(g, E.W * 0.7, E.H * 0.12, 300, 260, 6); g.fillStyle = '#121a2e'; g.fill(); circle(g, E.W * 0.78, E.H * 0.2, 40, '#e8e0c8');
  seg(g, [[E.W * 0.7 + 150, E.H * 0.12], [E.W * 0.7 + 150, E.H * 0.12 + 260]], 8, '#05040a'); seg(g, [[E.W * 0.7, E.H * 0.12 + 130], [E.W * 0.7 + 300, E.H * 0.12 + 130]], 8, '#05040a');
  rr(g, E.W * 0.08, E.H * 0.62, E.W * 0.84, E.H * 0.2, 20); g.fillStyle = '#1a1424'; g.fill(); rr(g, E.W * 0.08, E.H * 0.62, E.W * 0.84, 40, 14); g.fillStyle = '#2a2034'; g.fill(); rr(g, E.W * 0.12, E.H * 0.54, 260, 100, 40); g.fillStyle = '#d8d0e0'; g.fill(); }
export function clockFace(g, x, y, r, h, m) { circle(g, x, y, r, '#f4efe6'); ring(g, x, y, r, r * 0.08, '#2a1e18'); for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; seg(g, [[x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8], [x + Math.cos(a) * r * 0.9, y + Math.sin(a) * r * 0.9]], 6, '#2a1e18'); }
  const ah = (h % 12 + m / 60) / 12 * Math.PI * 2 - Math.PI / 2, am = m / 60 * Math.PI * 2 - Math.PI / 2; seg(g, [[x, y], [x + Math.cos(ah) * r * 0.5, y + Math.sin(ah) * r * 0.5]], r * 0.08, '#2a1e18'); seg(g, [[x, y], [x + Math.cos(am) * r * 0.75, y + Math.sin(am) * r * 0.75]], r * 0.05, ui().accent); circle(g, x, y, r * 0.06, '#2a1e18'); }
export function pigeon(g, x, y, s, t, o = {}) { const peck = o.peck ? Math.max(0, Math.sin(t * (o.peck * Math.PI * 2))) : 0; g.save(); g.translate(x, y); g.scale(s * (o.flip || 1), s);
  poly(g, [[-120, -40], [-200, -10], [-130, 10]], '#5a6070'); g.beginPath(); g.ellipse(0, 0, 130, 80, 0, 0, Math.PI * 2); g.fillStyle = '#8a92a4'; g.fill(); g.beginPath(); g.ellipse(-20, -10, 80, 45, -0.2, 0, Math.PI * 2); g.fillStyle = '#6a7284'; g.fill();
  seg(g, [[-20, 70], [-25, 120]], 8, '#d0705a'); seg(g, [[30, 70], [35, 120]], 8, '#d0705a');
  g.save(); g.translate(90, -60 + peck * 70); g.rotate(peck * 0.9); circle(g, 0, 0, 52, '#7a8294'); g.beginPath(); g.ellipse(0, 40, 40, 26, 0, 0, Math.PI * 2); g.fillStyle = alpha('#5fbf8a', 0.7); g.fill();
  circle(g, 16, -10, 12, '#f2a03a'); circle(g, 18, -10, 6, '#000'); poly(g, [[44, -4], [80, 6], [44, 14]], '#e8c08a'); g.restore(); g.restore(); }
// Skinner box: glass box with a key/button and food tray; pellets drop at given times
export function skinnerBox(g, x, y, s, t, o = {}) { g.save(); g.translate(x, y); g.scale(s, s); rr(g, -420, -340, 840, 460, 16); g.fillStyle = 'rgba(140,180,210,.10)'; g.fill(); g.lineWidth = 10; g.strokeStyle = alpha('#cfe4f0', 0.7); g.stroke();
  rr(g, 260, -300, 140, 400, 10); g.fillStyle = '#3a3438'; g.fill(); circle(g, 330, -150, 34, o.lit ? ui().accent : '#6a2a2a'); if (o.lit) glow(g, 330, -150, 80, ui().accent, 0.6); text(g, 'PECK', 330, -90, { size: 26, color: ui().cream, font: FONTS.ui, weight: 900 });
  rr(g, 290, 40, 80, 40, 6); g.fillStyle = '#1a1418'; g.fill(); rr(g, 300, -40, 60, 20, 4); g.fillStyle = '#5a5258'; g.fill();
  (o.drops || []).forEach((d) => { const k = clamp((t - d) / 0.5); if (k > 0) circle(g, 330 + Math.sin(d * 9) * 14, lerp(-30, 60, ease.in(k)), 10, '#e8c27a'); });
  rr(g, -420, 120, 840, 30, 6); g.fillStyle = '#2a2428'; g.fill(); g.restore(); }
export function gears(g, x, y, r, t) { for (const [dx, dy, rr0, sp] of [[0, 0, 1, 1], [1.7, 0.6, 0.7, -1.43], [-1.5, 0.9, 0.6, -1.66]]) { const cx = x + dx * r, cy = y + dy * r, R = r * rr0; g.save(); g.translate(cx, cy); g.rotate(t * sp * 0.6);
  for (let i = 0; i < 10; i++) { g.save(); g.rotate(i * Math.PI / 5); rr(g, -R * 0.12, -R * 1.18, R * 0.24, R * 0.3, 4); g.fillStyle = '#6a6268'; g.fill(); g.restore(); } circle(g, 0, 0, R, '#5a5258'); circle(g, 0, 0, R * 0.35, '#2a2428'); g.restore(); } }
