// A2-05 · bloc F : assemble la note d'export de la proposition d'inscription de l'arbitrage F. Lecture seule hors de la note ; refuse d'écraser une note existante.
// En-tête ; table et manifeste ; cinq diffs relus ; cinq fichiers proposés en entier ; preuve des fins de ligne ; sorties de la préparation et de l'essai ; sources des scripts.
// Usage : node a2-05-travail/arbitrage-F/inscription-arbitrage-F/assembler-note.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const I = 'a2-05-travail/arbitrage-F/inscription-arbitrage-F/', PROP = I + 'proposition/', SORTIE = 'a2-05-travail/note-export-lot3-F-inscription-arbitrage.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (b) => createHash('sha256').update(b).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
const M = JSON.parse(txt(PROP + 'manifeste.json')); const C = Object.keys(M);
if (C.length !== 5 || sha(brut(PROP + 'manifeste.json')) !== '5e4789627ad8ddb272f7cba4f10a34daeeafd6dd335aa099e96880729b50f1a8') throw new Error('manifeste inattendu');
for (const p of C) { if (sha(brut(PROP + p)) !== M[p].propose || sha(brut(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff')) !== M[p].diff || sha(brut(p)) !== M[p].depart) throw new Error('empreinte divergente : ' + p); }
for (const f of ['verification/sortie-fins-de-ligne.txt', 'sortie-preparation.txt', 'application/sortie-essai.txt']) if (!/(vérification conforme|préparation conforme|essai conforme)\s*$/.test(txt(I + f))) throw new Error(f + ' : sortie non conforme');
const nomDiff = (p) => PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff';
const doc = [txt(I + 'note-export-entete.md'), '',
  '# Partie 1 · Table des diffs et manifeste de la proposition', '', txt(PROP + 'table-diffs.md'), '', '### `' + PROP + 'manifeste.json`', '', clot(txt(PROP + 'manifeste.json'), 'json'), '',
  '# Partie 2 · Les cinq diffs relus', '', 'Produits par `diffBrut` (`git diff --no-index`, `core.autocrlf=true`) : les fins de ligne n\'y apparaissent pas ; voir la partie 4 pour le rapport F.', '',
  ...C.flatMap((p) => ['### `' + nomDiff(p) + '`', '', clot(txt(nomDiff(p)), 'diff'), '']),
  '# Partie 3 · Les cinq fichiers proposés, en entier', '', 'Recopiés depuis `' + PROP + '` ; chaque bloc est encadré par une clôture plus longue que celles qu\'il contient. Fins de ligne des versions proposées : ' + C.map((p) => '`' + p.split('/').pop() + '` ' + (brut(PROP + p).includes(13) ? 'CRLF' : 'LF')).join(', ') + '.', '',
  ...C.flatMap((p) => ['### `' + PROP + p + '` — SHA-256 `' + M[p].propose + '`', '', clot(txt(PROP + p), p.endsWith('.md') ? 'markdown' : 'js'), '']),
  '# Partie 4 · Preuve de la correction des fins de ligne du rapport F', '', '## 4.1 Sortie complète (code 0)', '', clot(txt(I + 'verification/sortie-fins-de-ligne.txt'), 'text'), '', '## 4.2 Code source', '', clot(txt(I + 'verifier-fins-de-ligne.mjs'), 'js'), '',
  '# Partie 5 · Sorties de la préparation et de l\'essai', '', '## 5.1 Préparation (code 0)', '', clot(txt(I + 'sortie-preparation.txt'), 'text'), '', '## 5.2 Essai de l\'application sur copie jetable (code 0)', '', clot(txt(I + 'application/sortie-essai.txt'), 'text'), '',
  '# Partie 6 · Code source des scripts', '', ...['preparer-inscription-arbitrage-F.mjs', 'application/appliquer-inscription-arbitrage-F.mjs', 'application/essayer-inscription-arbitrage-F.mjs'].flatMap((s) => ['### `' + I + s + '`' + (s.includes('appliquer') ? ' — non lancé' : ''), '', clot(txt(I + s), 'js'), ''])];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets ; 5 fichiers, 5 diffs, preuve des fins de ligne, sorties et sources');
