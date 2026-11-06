// A2-05 · bloc F : assemble la note d'export de la première mesure de couverture, exécutée (non arbitrée). Lecture seule hors de la note ; refuse d'écraser
// une note existante ; vérifie les empreintes des deux fichiers de mesure. En-tête ; rapport ; combinaisons de filtres ; sortie de l'exécution ; mesure.json.
// Usage : node a2-05-travail/arbitrage-F/mesure-couverture/assembler-note-mesure.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const I = 'a2-05-travail/arbitrage-F/mesure-couverture/', M = I + 'mesure/', SORTIE = 'a2-05-travail/note-export-lot3-F-mesure-reelle.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
const ATT = { 'mesure.json': '7637157edd8a28b7330a77313d525517ee4c28022b3d302964fb2cf9aa0e1d44', 'rapport-mesure.md': '858a7f3710a2e42005f8e4316115e2966dc3cd46dd014c75c4eba39f64289694' };
for (const [f, h] of Object.entries(ATT)) if (sha(M + f) !== h) throw new Error(M + f + ' : empreinte inattendue');
if (!/aucune conclusion lexicale$/.test(txt(I + 'traces/sortie-mesure-reelle.txt'))) throw new Error('sortie de l\'exécution inattendue');
const m = JSON.parse(txt(M + 'mesure.json')); const comb = {};
for (const c of m.candidats) (comb[c.filtres.join(' + ')] ??= []).push(c.id);
const lignes = Object.entries(comb).sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0])).map(([k, v]) => '| ' + k.split(' + ').map((f) => '`' + f + '`').join(' + ') + ' | ' + v.length + ' |');
const total = Object.values(comb).reduce((s, v) => s + v.length, 0); if (total !== m.couverture.releves) throw new Error('combinaisons incohérentes');
const titre = (p) => '### `' + p + '` — SHA-256 `' + sha(p) + '`';
const doc = [txt(I + 'note-export-mesure-entete.md'), '',
  '# Partie 1 · Rapport de mesure (proposition, non arbitrée)', '', titre(M + 'rapport-mesure.md'), '', clot(txt(M + 'rapport-mesure.md'), 'markdown'), '',
  '# Partie 2 · Combinaisons de filtres (calculées depuis `mesure.json`)', '', '| Combinaison de filtres d\'origine | Sens |', '|---|---|', ...lignes, '| **Total** | **' + total + '** |', '',
  '# Partie 3 · Sortie complète de l\'exécution (code 0)', '', titre(I + 'traces/sortie-mesure-reelle.txt'), '', clot(txt(I + 'traces/sortie-mesure-reelle.txt'), 'text'), '',
  '# Partie 4 · `mesure.json`, en entier', '', titre(M + 'mesure.json'), '', clot(txt(M + 'mesure.json'), 'json'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets ; ' + lignes.length + ' combinaisons, ' + total + ' sens');
