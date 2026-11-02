// A2-05 · T9 : assemble la note d'export de l'audit : en-tête, valeurs des 41 décisions, rapport, contrôle indépendant. Refuse d'écraser une note existante.
// Usage : node assembler-note.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const A = 'a2-05-travail/arbitrage-T9/audit/', SORTIE = 'a2-05-travail/note-export-lot3-T9-audit.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n').trimEnd();
const ENTRY = [347, 348, 285, 704, 659, 465, 183, 441, 468, 485, 495, 435, 443, 448, 463, 469, 477, 594, 91, 92, 459].map((n) => 'n5_v_' + n);
const dec = JSON.parse(txt('reconstruction/a2-04/journal.json')).filter((d) => ENTRY.includes(d.entry));
if (dec.length !== 41) throw new Error('41 décisions attendues : ' + dec.length);
const cel = (v) => '`' + JSON.stringify(v ?? null).replaceAll('|', '\\|').replaceAll('`', "'") + '`';
const lignes = dec.map((d) => '| ' + d.id.replace('A2-04-', '') + ' | ' + d.lot + ' | `' + d.entry.replace('n5_', '') + '` | ' + d.field + ' | ' + d.kind + ' | ' + cel(d.before) + ' | ' + cel(d.after) + ' |');
const P = [txt(A + 'note-export-entete.md'), '', '# Partie 1 · Valeurs des 41 décisions', '', 'Valeurs brutes du journal, que le rapport ne reproduit pas.', '', '| Décision | Lot | ENTRY | Champ | Nature | Valeur « avant » | Valeur « après » |', '|---|---|---|---|---|---|---|', ...lignes, '',
  '# Partie 2 · Rapport de T9, reproduit en entier', '', txt('docs/rapports/etape2-A2-05-volet1-lot3-T9.md'), '',
  '# Partie 3 · Contrôle indépendant', '', '## 3.1 Sortie complète (code 0)', '', '```text', txt(A + 'sortie-controle-audit-T9.txt'), '```', '', '## 3.2 Code source', '', '```js', txt(A + 'controle-audit-T9.mjs'), '```', ''];
writeFileSync(join(root, SORTIE), P.join('\n'), 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(P.join('\n')) + ' octets ; ' + dec.length + ' décisions');
