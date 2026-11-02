// A2-05 : contrôle de la proposition d'erratum du périmètre arbitré de T1 (comparables du lot 1 mal étiquetés). Lecture seule sur le dépôt.
// Usage : node a2-05-travail/correction-comparables/erratum-T1-controle.mjs <racine du dépôt>
// Vérifie : empreinte du périmètre de T1 = celle du manifeste ; les cinq occurrences relevées (ligne, section, étiquette imprimée) ; le verdict
// arbitré de chaque sens dans le rapport du lot 1 ; l'étiquette exacte, telle que l'écrit le générateur corrigé (sortie dans un dossier
// temporaire du système, supprimé ensuite). Code 0 si tout est conforme.
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail');
const PER = 'docs/rapports/etape2-A2-05-volet1-lot3-T1-perimetre.md', LOT1 = 'docs/rapports/etape2-A2-05-coherence-retroactive.md';
const lire = (p) => readFileSync(join(root, p), 'utf8');
const res = []; const ok = (id, nom, cond, detail = '') => res.push({ id, nom, ok: !!cond, detail });
const h = createHash('sha256').update(readFileSync(join(root, PER))).digest('hex'), hm = JSON.parse(lire('a2-05-travail/empreintes-rapports-arbitres.json')).empreintes[PER];
ok('X1', 'périmètre arbitré de T1 inchangé (empreinte du manifeste)', h === hm, h.slice(0, 12) + '…');
// Les cinq occurrences : [ligne, section, sens, mot, étiquette imprimée]
const OCC = [[100, '§4.1', 'v_265_s2', '冷たい', 'volet 2 (147, arbitré)'], [132, '§4.2', 'v_1_s2', '爽やか', 'hors des 377 et des 147'], [135, '§4.2', 'v_4_s2', '暗い', 'hors des 377 et des 147'],
  [191, '§4.2', 'v_455_s2', '明るい', 'hors des 377 et des 147'], [255, '§6.3', 'v_265_s2', '冷たい', 'volet 2 (147, arbitré)']];
const lignes = lire(PER).replace(/\r\n/g, '\n').split('\n');
const imprime = (l, id) => (l.startsWith('| `' + id + '` |') ? l.split('|').at(-2).trim() : (l.match(/冷たい « Froid \(attitude\) » \(([^)]*\)[^)]*)\)/) ?? [])[1]);
ok('X2', 'cinq occurrences relevées, étiquettes imprimées exactes', OCC.every(([n, , id, , et]) => imprime(lignes[n - 1], id) === et), OCC.map(([n, s, id, , et]) => 'l. ' + n + ' (' + s + ') ' + id + ' : « ' + imprime(lignes[n - 1], id) + ' »').join(' ; '));
const autres = lignes.map((l, i) => [i + 1, l]).filter(([n, l]) => /v_(265|1|4|455)_s2\b|冷たい « Froid \(attitude\) »/.test(l) && !OCC.some(([m]) => m === n) && /hors des 377|volet 2 \(147/.test(l));
ok('X3', 'aucune autre étiquette de ces quatre sens dans le périmètre de T1', !autres.length, autres.map(([n]) => 'l. ' + n).join(', ') || 'aucune');
const v = new Map([...lire(LOT1).matchAll(/^#### `((?:hj_)?v_\d+_s\d+)` · [^\n]* — \*\*([^*]+)\*\*$/gm)].map((m) => [m[1], m[2]]));
const att = { v_265_s2: 'écart (E2)', v_1_s2: 'conforme', v_4_s2: 'conforme', v_455_s2: 'conforme' };
ok('X4', 'verdicts arbitrés du lot 1 (rapport arbitré le 2026-10-08)', /^\*\*Statut\*\* : \*\*arbitré le 2026-10-08/m.test(lire(LOT1)) && Object.entries(att).every(([id, x]) => v.get(id) === x), Object.keys(att).map((id) => id + ' : ' + v.get(id)).join(' ; '));
const tmp = mkdtempSync(join(tmpdir(), 'ocha-erratum-'));
try {
  const { produirePerimetre } = await import(pathToFileURL(join(W, 'perimetre-v2.mjs')).href);
  const r = produirePerimetre({ root, nom: 'T1', livraisons: ['B10', 'B11', 'B12'], date: '2026-10-20', sortie: join(tmp, 'T1.md'), autorisation: 'contrôle de l\'erratum', nonreg: true, risquesManuels: [] });
  const exact = Object.fromEntries(r.lot1Comparables);
  const EXACT = { v_265_s2: 'volet 2 (147, arbitré) ; volet 1, lot 1 (écart (E2), arbitré)', v_1_s2: 'volet 1, lot 1 (conforme, arbitré)', v_4_s2: 'volet 1, lot 1 (conforme, arbitré)', v_455_s2: 'volet 1, lot 1 (conforme, arbitré)' };
  const t = readFileSync(join(tmp, 'T1.md'), 'utf8').split('\n');
  ok('X5', 'étiquettes exactes, écrites par le générateur corrigé (dossier temporaire) : quatre sens du lot 1 parmi les comparables de T1', JSON.stringify(exact) === JSON.stringify(EXACT) && Object.entries(EXACT).every(([id, et]) => t.some((l) => l.startsWith('| `' + id + '` |') && l.split('|').at(-2).trim() === et)) && t.some((l) => l.includes('冷たい « Froid (attitude) » (' + EXACT.v_265_s2 + ')')),
    Object.entries(exact).map(([id, et]) => id + ' : « ' + et + ' »').join(' ; '));
} finally { rmSync(tmp, { recursive: true, force: true }); }
ok('X6', 'périmètre arbitré de T1 toujours inchangé après le contrôle', createHash('sha256').update(readFileSync(join(root, PER))).digest('hex') === hm, 'empreinte ' + hm.slice(0, 12) + '…');
for (const r of res) console.log((r.ok ? 'conforme ' : 'ÉCART    ') + r.id + ' ' + r.nom + ' : ' + r.detail);
const n = res.filter((r) => r.ok).length; console.log(n + ' conformes sur ' + res.length); process.exit(n === res.length ? 0 : 1);
