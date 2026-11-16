// shots/specs.js — every shot of "Why Losing Hurts More Than Winning", as specs for _kit.shot().
import { registerShot, E, S, mood } from '/engine/core.js';
import * as UI from '/engine/ui2d.js';
import { shot } from './_kit.js';
import * as CAST from '../cast.js';

// --- hook: the coin-flip bet ---
shot('L01', { bg: 'stage', figs: [{ x: -0.22, o: 'YOU', expr: 'thinking', pose: 'think' }], icons: [['coin', 0.65, 0.42, 1, 'bet.', { spin: 3 }]], pops: [['bet.', 'A BET', 0.65, 0.18, 70]] });
shot('L02', { bg: 'blur', icons: [['coinFlip', 0.5, 0.62, 1.4, 0.1, { dur: 1.2, always: 0.01 }]], pops: [['coin.', 'FLIP!', 0.5, 0.15, 80]] });
shot('L03', { bg: 'stage', icons: [['coin', 0.3, 0.5, 1, 0, { always: 1 }], ['tag', 0.62, 0.35, 1.3, 'win', { str: '+$150', col: 'green' }]], pops: [['Heads,', 'HEADS', 0.3, 0.22, 64, 'cream']] });
shot('L04', { bg: 'stage', icons: [['coin', 0.3, 0.5, 1, 0, { always: 1 }], ['tag', 0.62, 0.35, 1.0, 0, { str: '+$150', col: 'green', always: 1 }], ['tag', 0.62, 0.62, 1.3, 'lose', { str: '−$100', col: 'red' }]], pops: [['Tails,', 'TAILS', 0.3, 0.22, 64, 'cream']] });
shot('L05', { bg: 'stage', icons: [['scale', 0.5, 0.86, 1.0, 0, { always: 1, labels: ['+$150', '−$100'] }]], pops: [['fair.', '50 / 50', 0.5, 0.15, 80], ['bigger', 'PRIZE > RISK', 0.5, 0.27, 52, 'cream']] });
shot('L06', { bg: 'bp', icons: [['total', 0.5, 0.48, 1.6, 'average,', { v: 25, dur: 1.2 }]], pops: [['average,', 'AVERAGE RESULT PER FLIP', 0.5, 0.3, 50, 'cream'], ['ahead.', 'YOU COME OUT AHEAD', 0.5, 0.7, 56, 'green']] });
shot('L07', { bg: 'stage', figs: [{ x: -0.15, o: 'YOU', expr: 'smile', pose: 'reach', at: 'no.', pose2: 'crossArms', expr2: 'worried' }], icons: [['coin', 0.15, 0.42, 0.7, 0, { always: 1 }]], pops: [['no.', 'NO.', 0.72, 0.35, 140, 'red'], ['Most', 'MOST PEOPLE', 0.72, 0.18, 52, 'cream']] });
shot('L08', { bg: 'blur', face: { o: 'YOU', expr: 'confused', x: 0, r: 320 }, pops: [['Why?', 'WHY?', 0.82, 0.3, 110]] });
shot('L09', { bg: 'bp', icons: [['brain', 0.25, 0.45, 1.2, 0.1], ['meter', 0.62, 0.85, 1.4, 'losing', { label: 'PAIN: −$100', col: 'red', v: 1, dur: 1.2 }]], pops: [['worse', 'FEELS WORSE', 0.82, 0.4, 56, 'red']] });
shot('L10', { bg: 'bp', icons: [['brain', 0.25, 0.45, 1.2, 0, { always: 1 }], ['meter', 0.55, 0.85, 1.4, 0, { label: 'PAIN', col: 'red', v: 1, always: 1 }], ['meter', 0.75, 0.85, 1.4, 'winning', { label: 'JOY: +$150', col: 'green', v: 0.55, dur: 1.2 }]] });
shot('L11', { bg: 'stage', icons: [['scale', 0.5, 0.9, 0.9, 0.2, { from: 0, to: 0.28, dur: 1.5, labels: ['GAIN', 'LOSS'], lc: '#5fd17a' }]], pops: [['money,', 'MONEY', 0.18, 0.25, 60], ['choices,', 'CHOICES', 0.5, 0.15, 60], ['relationships.', 'RELATIONSHIPS', 0.82, 0.25, 60]] });
shot('L12', { bg: 'stage', line: 'IT HAS A NAME', lineSize: 90 });
shot('L13', { bg: 'stage', line: 'LOSS AVERSION', lineSize: 160, icons: [['scale', 0.5, 1.02, 0.6, 0, { always: 1, from: 0.28, to: 0.28, labels: ['', ''] }]] });
shot('L14', { bg: 'street', drift: 40, figs: [{ x: -0.1, o: 'YOU', expr: 'surprised', pose: 'stand', at: 'nice,', expr2: 'happy', pose2: 'cheer' }], icons: [['bill', 0.6, 0.77, 1, 'finding', { dur: 0.8 }]], pops: [['nice,', '+$10  :)', 0.6, 0.35, 70, 'green']] });
shot('L15', { bg: 'street', rain: true, drift: -40, figs: [{ x: -0.1, o: 'YOU', expr: 'shocked', pose: 'handsOnHead', at: 'ruin', expr2: 'cry', pose2: 'sad' }], icons: [['wallet', 0.6, 0.7, 1, 'losing']], pops: [['ruin', '−$10  :(', 0.6, 0.35, 70, 'red']] });
shot('L16', { bg: 'stage', figs: [{ x: -0.25, o: 'YOU', expr: 'happy', pose: 'cheer' }, { x: 0.25, o: 'YOU', expr: 'cry', pose: 'sad', facing: -1 }], pops: [['Same', '$10 = $10', 0.5, 0.2, 80, 'cream'], ['different', 'FEELS DIFFERENT', 0.5, 0.33, 56, 'red']] });
// --- Kahneman & Tversky ---
shot('L17', { bg: 'study', drift: -40, figs: [{ x: -0.12, o: 'KAHNEMAN', expr: 'thinking', pose: 'explain' }, { x: 0.12, o: 'TVERSKY', expr: 'smile', pose: 'point', facing: -1 }], badge: ['1979,', '1979'], lower: ['KAHNEMAN & TVERSKY', 'PSYCHOLOGISTS'] });
shot('L18', { bg: 'blur', icons: [['card', 0.5, 0.48, 1.3, 'paper', { title: 'PROSPECT THEORY', body: 'Econometrica, 1979', col: 'gold' }]], pops: [['economics.', 'VS. ECONOMICS', 0.5, 0.86, 56, 'red']] });
shot('L19', { bg: 'debate', figs: [{ x: -0.25, o: 'EXPERT', expr: 'smile', pose: 'explain' }], icons: [['scale', 0.68, 0.86, 0.75, 0, { always: 1, labels: ['+$1', '−$1'] }]], pops: [['evenly.', 'GAINS = LOSSES', 0.68, 0.14, 56, 'cream'], ['dollar.', 'A DOLLAR IS A DOLLAR', 0.5, 0.3, 50]] });
shot('L20', { bg: 'stage', icons: [['scale', 0.5, 0.9, 0.85, 0.3, { from: 0, to: 0.3, dur: 1.2, labels: ['+$1', '−$1'] }]], pops: [["don't.", 'WE DON\'T', 0.5, 0.16, 90, 'red']] });
shot('L21', { bg: 'stage', line: 'PROSPECT THEORY', lineSize: 140 });
shot('L22', { bg: 'bp', icons: [['curve', 0.5, 0.52, 1.1, 0.2, { dur: 2.5 }]], pops: [['loom', 'LOSSES LOOM LARGER', 0.5, 0.1, 60, 'red']] });
shot('L23', { bg: 'bp', icons: [['curve', 0.5, 0.52, 1.1, 0, { always: 1 }]], pops: [['larger?', '?', 0.75, 0.3, 160]] });
shot('L24', { bg: 'bp', icons: [['curve', 0.5, 0.52, 1.1, 0, { always: 1, twice: 1 }]], pops: [['twice', 'ROUGHLY 2×', 0.5, 0.1, 72], ['weight', 'THE WEIGHT OF GAINS', 0.78, 0.9, 40, 'cream']] });
shot('L25', { bg: 'stage', icons: [['coin', 0.25, 0.5, 1, 0, { always: 1, spin: 2 }], ['tag', 0.62, 0.33, 1.2, 'two', { str: '+$200?', col: 'green' }], ['tag', 0.62, 0.62, 1.0, 0.2, { str: '−$100', col: 'red' }]], pops: [['want', 'WHAT MANY PEOPLE WANT', 0.5, 0.12, 50, 'cream']] });
shot('L26', { bg: 'bp', icons: [['curve', 0.35, 0.52, 0.8, 0, { always: 1, twice: 1 }]], pops: [['debated.', 'STILL DEBATED', 0.76, 0.35, 64, 'red'], ['smaller', 'SMALLER IN SOME', 0.76, 0.5, 44, 'cream'], ['situations.', 'SITUATIONS', 0.76, 0.58, 44, 'cream']] });
shot('L27', { bg: 'bp', icons: [['curve', 0.2, 0.5, 0.35, 0.2], ['curve', 0.5, 0.5, 0.35, 0.8], ['curve', 0.8, 0.5, 0.35, 1.4]], pops: [['again', 'AGAIN AND AGAIN', 0.5, 0.88, 60]] });
shot('L28', { bg: 'stage', figs: [{ x: 0, o: 'YOU', expr: 'surprised', pose: 'stand', at: 'everywhere.', expr2: 'awe' }], icons: [['mug', 0.2, 0.4, 0.6, 'everywhere.'], ['phone', 0.8, 0.4, 0.5, 'everywhere.', { str: 'SALE!' }], ['tag', 0.3, 0.15, 0.7, 'seeing', { str: '−$', col: 'red' }], ['coin', 0.72, 0.15, 0.5, 'seeing']] });
// --- the mug (endowment effect) ---
shot('L29', { bg: 'blur', icons: [['mug', 0.5, 0.72, 1.8, 0.1]], pops: [['mug.', 'A COFFEE MUG', 0.5, 0.15, 70, 'cream']] });
shot('L30', { bg: 'school', figs: [{ x: -0.3, o: 'YOU', expr: 'happy', pose: 'holdFront', prop: 'cup' }, { x: -0.12, o: 'CHESS', expr: 'happy', pose: 'holdFront', prop: 'cup' }, { x: 0.12, o: 'NURSE', expr: 'neutral', pose: 'stand' }, { x: 0.3, o: 'EXPERT', expr: 'neutral', pose: 'stand' }], lower: ['KAHNEMAN, KNETSCH & THALER', 'THE MUG EXPERIMENT'], pops: [['half', 'HALF GET MUGS', 0.5, 0.12, 56]] });
shot('L31', { bg: 'stage', figs: [{ x: -0.2, o: 'YOU', expr: 'smirk', pose: 'holdFront', prop: 'cup' }, { x: 0.2, o: 'CHESS', expr: 'smile', pose: 'reach', facing: -1 }], pops: [['trade.', '⇄  TRADE?', 0.5, 0.18, 70]] });
shot('L32', { bg: 'bp', icons: [['mug', 0.5, 0.3, 0.6, 0, { always: 1 }], ['meter', 0.38, 0.82, 1.3, 'sell', { label: 'OWNER ASKS', col: 'red', v: 1, dur: 1 }], ['meter', 0.62, 0.82, 1.3, 'buy', { label: 'BUYER PAYS', col: 'green', v: 0.4, dur: 1 }]], pops: [['twice', 'MORE THAN 2×', 0.82, 0.45, 64, 'red']] });
shot('L33', { bg: 'blur', icons: [['mug', 0.4, 0.75, 1.4, 0, { always: 1 }], ['clock', 0.72, 0.42, 1, 'Owned']], pops: [['Same', 'SAME MUG', 0.4, 0.15, 64, 'cream'], ['minutes.', 'A FEW MINUTES', 0.72, 0.72, 50]] });
shot('L34', { bg: 'stage', figs: [{ x: -0.1, o: 'YOU', expr: 'worried', pose: 'holdFront', prop: 'cup' }], pops: [['loss.', 'FEELS LIKE A LOSS', 0.68, 0.3, 64, 'red']] });
shot('L35', { bg: 'stage', line: 'THE ENDOWMENT EFFECT', lineSize: 110 });
shot('L36', { bg: 'stage', figs: [{ x: -0.2, o: 'YOU', expr: 'happy', pose: 'phone', prop: 'phone' }], icons: [['phone', 0.65, 0.48, 1.1, 'free', { str: 'FREE\nTRIAL' }]] });
shot('L37', { bg: 'stage', figs: [{ x: -0.2, o: 'YOU', expr: 'worried', pose: 'phone', prop: 'phone' }], icons: [['phone', 0.65, 0.48, 1.1, 0, { str: 'CANCEL?', col: 'red', always: 1 }]], pops: [['yours,', 'YOURS', 0.65, 0.15, 64], ['hurts.', 'HURTS', 0.65, 0.85, 64, 'red']] });
// --- framing ---
shot('L38', { bg: 'stage', pops: [['keep.', 'WHAT WE KEEP', 0.5, 0.35, 76, 'cream'], ['choose.', 'WHAT WE CHOOSE', 0.5, 0.55, 90]] });
shot('L39', { bg: 'bp', icons: [['people', 0.5, 0.36, 1.2, 'six', { n: 60, cols: 15, dur: 1.2 }], ['card', 0.3, 0.76, 0.75, 'plans', { title: 'PLAN A', body: 'certain', col: 'gold' }], ['card', 0.7, 0.76, 0.75, 'plans', { title: 'PLAN B', body: 'a gamble', col: 'gold' }]], pops: [['six', '600 PEOPLE AT RISK', 0.5, 0.1, 54, 'red']] });
shot('L40', { bg: 'bp', icons: [['people', 0.5, 0.36, 1.2, 0, { n: 60, cols: 15, always: 1, split: 0.7 }], ['card', 0.3, 0.76, 0.8, 'safe,', { title: 'PLAN A ✓', body: 'safe, certain', col: 'green' }], ['card', 0.7, 0.76, 0.7, 0, { title: 'PLAN B', body: 'a gamble', col: 'gold', always: 1 }]], pops: [['saved,', 'LIVES SAVED', 0.5, 0.1, 64, 'green'], ['safe,', 'MOST PICK SAFE', 0.5, 0.58, 40, 'cream']] });
shot('L41', { bg: 'bp', icons: [['people', 0.5, 0.36, 1.2, 0, { n: 60, cols: 15, always: 1, split: 0.3, lc: 'red' }], ['card', 0.3, 0.76, 0.7, 0, { title: 'PLAN A', body: 'certain', col: 'gold', always: 1 }], ['card', 0.7, 0.76, 0.8, 'gamble.', { title: 'PLAN B ✓', body: 'risky gamble', col: 'red' }]], pops: [['lost,', 'LIVES LOST', 0.5, 0.1, 64, 'red'], ['switched', 'MOST SWITCH', 0.5, 0.58, 40, 'cream']] });
shot('L42', { bg: 'stage', pops: [['words.', 'ONLY THE WORDS CHANGED', 0.5, 0.25, 56, 'cream'], ['Saved,', 'SAVED', 0.32, 0.55, 110, 'green'], ['lost.', 'LOST', 0.7, 0.55, 110, 'red']] });
shot('L43', { bg: 'stage', icons: [['card', 0.5, 0.5, 1.0, 0.1, { title: 'CHOICE', body: 'flipped', col: 'gold', dur: 1.2 }]] });
shot('L44', { bg: 'stage', icons: [['frame', 0.5, 0.48, 1.1, 0.05, { str: 'FRAMING' }]] });
shot('L45', { bg: 'stage', icons: [['bubble', 0.3, 0.4, 1, 'lose"', { str: '"You\'ll LOSE"', col: 'red' }], ['bubble', 0.72, 0.62, 0.8, 'gaining,"', { str: '"You\'ll miss out on gaining"' }]], pops: [['move.', 'PEOPLE MOVE', 0.5, 0.88, 56]] });
shot('L46', { bg: 'office', figs: [{ x: -0.1, o: 'MARKETER', expr: 'smirk', pose: 'point', facing: 1 }], pops: [['Marketers', 'MARKETERS KNOW', 0.6, 0.2, 64]] });
shot('L47', { bg: 'stage', icons: [['banner', 0.5, 0.45, 1.3, 0.05, { str: "DON'T MISS OUT!" }]] });
shot('L48', { bg: 'stage', icons: [['banner', 0.3, 0.3, 0.9, 0, { str: "DON'T MISS OUT!", always: 1 }], ['banner', 0.6, 0.58, 1.3, 0.05, { str: 'ONLY 3 LEFT!', col: 'gold' }]] });
shot('L49', { bg: 'stage', icons: [['banner', 0.3, 0.25, 0.8, 0, { str: "DON'T MISS OUT!", always: 1 }], ['banner', 0.7, 0.4, 0.8, 0, { str: 'ONLY 3 LEFT!', col: 'gold', always: 1 }], ['clock', 0.35, 0.68, 1.2, 0.05], ['banner', 0.66, 0.72, 1.0, 'expires', { str: 'ENDS TONIGHT!' }]] });
shot('L50', { bg: 'stage', pops: [['gain', 'GAIN', 0.3, 0.45, 120, 'green'], ['into', '→', 0.5, 0.45, 120, 'cream'], ['loss.', 'LOSS', 0.7, 0.45, 120, 'red']] });
// --- golf ---
shot('L51', { bg: 'golf', drift: 60, figs: [{ x: -0.15, o: 'GOLFER', expr: 'determined', pose: 'ready' }], pops: [['sports.', 'PRO SPORTS', 0.5, 0.15, 70, 'cream']] });
shot('L52', { bg: 'golf', figs: [{ x: -0.25, o: 'GOLFER', expr: 'thinking', pose: 'ready' }], lower: ['POPE & SCHWEITZER', 'ECONOMISTS'], pops: [['millions', 'MILLIONS OF PUTTS', 0.55, 0.15, 64]] });
shot('L53', { bg: 'golf', icons: [['golfball', 0.3, 0.86, 1, 'bogey,', { dx: 0.48 * 1920, dur: 1.5 }], ['golfball', 0.3, 0.93, 1, 'birdie,', { dx: 0.40 * 1920, dur: 1.5 }], ['check', 0.86, 0.6, 1, 'accurate']], pops: [['bogey,', 'AVOID A LOSS (PAR)', 0.3, 0.2, 48, 'red'], ['birdie,', 'GO FOR A GAIN (BIRDIE)', 0.3, 0.3, 48, 'green'], ['accurate', 'MORE ACCURATE: AVOIDING LOSS', 0.5, 0.45, 40, 'cream']] });
shot('L54', { bg: 'blur', face: { o: 'GOLFER', expr: 'determined', x: -0.1, r: 320 }, pops: [['lose', 'NOT TO LOSE', 0.78, 0.35, 70, 'red']] });
// --- why: evolution ---
shot('L55', { bg: 'stage', line: 'A FLAW?', lineSize: 150 });
shot('L56', { bg: 'stage', line: 'THE TWIST', lineSize: 150 });
shot('L57', { bg: 'cave', figs: [{ x: -0.22, o: 'CAVE', expr: 'neutral', pose: 'sit' }, { x: 0.22, o: 'CAVE', expr: 'neutral', pose: 'crouch', facing: -1 }], pops: [['alive.', 'SURVIVAL', 0.5, 0.15, 80], ['Many', 'A WIDELY HELD IDEA', 0.5, 0.26, 36, 'cream']] });
shot('L58', { bg: 'cave', figs: [{ x: -0.15, o: 'CAVE', expr: 'smile', pose: 'holdFront' }], icons: [['berry', 0.4, 0.62, 1, 'food,']], pops: [['better.', 'A LITTLE BETTER', 0.68, 0.3, 56, 'green']] });
shot('L59', { bg: 'cave', cold: true, figs: [{ x: -0.15, o: 'CAVE', expr: 'scared', pose: 'handsOnHead' }], icons: [['store', 0.65, 0.78, 1.2, 'lost', { empty: true, dur: 1.2 }]], pops: [['winter.', 'MAY NOT SURVIVE', 0.62, 0.3, 56, 'red']] });
shot('L60', { bg: 'bp', icons: [['brain', 0.35, 0.45, 1.3, 0.2], ['check', 0.72, 0.45, 1.4, 'chance']], pops: [['seriously', 'LOSSES FIRST', 0.35, 0.8, 56, 'red'], ['making', 'MADE IT', 0.72, 0.7, 56, 'green']] });
shot('L61', { bg: 'blur', face: { o: 'YOU', expr: 'shocked', x: -0.18, r: 280 }, icons: [['phone', 0.72, 0.5, 1, 'ten', { str: '−$10', col: 'red' }], ['store', 0.72, 0.95, 0.7, 'winter', { empty: true, dur: 1 }]], pops: [['like', '=  WINTER FOOD GONE', 0.68, 0.12, 48, 'red']] });
// --- real mistakes ---
shot('L62', { bg: 'stage', line: 'REAL MISTAKES', lineSize: 130 });
shot('L63', { bg: 'office', figs: [{ x: -0.25, o: 'YOU', expr: 'worried', pose: 'holdFront' }], icons: [['chart', 0.65, 0.65, 1, 0.1, { dur: 2.5 }]], pops: [['even.', 'HOPING TO BREAK EVEN', 0.62, 0.15, 50, 'cream']] });
shot('L64', { bg: 'office', figs: [{ x: -0.2, o: 'YOU', expr: 'sad', pose: 'sit' }], icons: [['door', 0.6, 0.8, 1, 0, { always: 0.15 }]], pops: [['job,', 'A JOB', 0.62, 0.15, 56, 'cream'], ['relationship,', 'A RELATIONSHIP', 0.62, 0.25, 56, 'cream'], ['loss.', 'FEELS LIKE A LOSS', 0.5, 0.88, 50, 'red']] });
shot('L65', { bg: 'stage', figs: [{ x: -0.25, o: 'YOU', expr: 'scared', pose: 'stand', facing: -1 }], icons: [['door', 0.35, 0.8, 1, 'opportunity,', { dur: 1 }]], pops: [['louder', 'FEAR > CHANCE', 0.62, 0.2, 64, 'red']] });
// --- what to do ---
shot('L66', { bg: 'stage', figs: [{ x: 0, o: 'YOU', expr: 'thinking', pose: 'think' }], pops: [['do?', 'WHAT CAN YOU DO?', 0.5, 0.15, 64]] });
shot('L67', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.2, 0.05, { title: '1', body: 'NOTICE THE FRAME', col: 'gold', dur: 0.5 }]] });
shot('L68', { bg: 'stage', icons: [['frame', 0.5, 0.45, 1.0, 0, { str: 'LOSS?  or  GAIN?', always: 1 }]], pops: [['urgent,', 'FEELS URGENT?', 0.5, 0.12, 56, 'red']] });
shot('L69', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.1, 'flip', { title: 'FLIP IT', body: 'loss  ⇄  gain', col: 'green', dur: 0.6 }]], pops: [['changes.', 'DOES YOUR ANSWER CHANGE?', 0.5, 0.86, 48, 'cream']] });
shot('L70', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.2, 0.05, { title: '2', body: 'ZOOM OUT', col: 'gold', dur: 0.5 }]] });
shot('L71', { bg: 'stage', figs: [{ x: -0.2, o: 'YOU', expr: 'scared', pose: 'stand' }], icons: [['coin', 0.6, 0.45, 1, 0.1, { spin: 4 }]], pops: [['scary.', 'ONE FLIP: SCARY', 0.6, 0.15, 56, 'red']] });
shot('L72', { bg: 'bp', icons: [['coins', 0.5, 0.45, 1, 'hundred', { n: 100, dur: 1.5 }], ['total', 0.5, 0.82, 1, 'ahead.', { v: 2500, dur: 1 }]], pops: [['hundred', '100 FAIR BETS', 0.5, 0.1, 60, 'cream'], ['ahead.', 'ALMOST ALWAYS AHEAD', 0.5, 0.93, 40, 'green']] });
shot('L73', { bg: 'stage', pops: [['series,', 'A SERIES', 0.32, 0.45, 100, 'green'], ['one', 'NOT ONE AT A TIME', 0.68, 0.6, 56, 'cream']] });
shot('L74', { bg: 'stage', icons: [['card', 0.5, 0.48, 1.2, 0.05, { title: '3', body: 'ASK ONE QUESTION', col: 'gold', dur: 0.5 }]] });
shot('L75', { bg: 'stage', serif: [['If', 'If I didn\'t already have this…', 0.4, 'cream'], ['choose', '…would I choose it today?', 0.55, 'gold']] });
shot('L76', { bg: 'bp', icons: [['brain', 0.5, 0.45, 1.6, 0.1]], pops: [['away.', "ISN'T GOING AWAY", 0.5, 0.12, 60, 'cream'], ['wired', 'WIRED DEEP', 0.5, 0.85, 60]] });
shot('L77', { bg: 'stage', figs: [{ x: -0.25, o: 'YOU', expr: 'smile', pose: 'crossArms' }], icons: [['scale', 0.62, 0.9, 0.8, 0, { from: 0.28, to: 0, dur: 2.0, labels: ['GAIN', 'LOSS'] }]], pops: [['see', 'ONCE YOU SEE IT…', 0.62, 0.12, 52, 'cream'], ['decision', 'YOU DECIDE', 0.62, 0.22, 64, 'green']] });
// --- outro ---
shot('L78', { bg: 'stage', serif: [[0.3, 'What loss are you holding on to…', 0.4, 'cream'], ['letting', '…just because letting go hurts?', 0.55, 'gold']] });
shot('L79', { bg: 'stage', icons: [['bubble', 0.5, 0.45, 2.0, 0.05, { str: '. . .' }]], pops: [[0.3, 'TELL ME IN THE COMMENTS', 0.5, 0.78, 64, 'cream']] });
registerShot('L80', { draw(g, t) { const M = mood('night'); UI.endScreen(g, t, { question: 'Losing hurts more. Now you know.', cast: [CAST.YOU, CAST.KAHNEMAN, CAST.TVERSKY, CAST.GOLFER, CAST.MARKETER, CAST.CAVE, CAST.CHESS], moodColors: ['#0a0608', '#1a0c10', '#2a1214'], rim: S().ui.gold }); } });
