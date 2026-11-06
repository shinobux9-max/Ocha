// A2-05 · bloc F : assemble la note d'export de la proposition de protection du rapport arbitré de F au manifeste d'empreintes. Lecture seule hors de la note ;
// refuse d'écraser une note existante. En-tête ; table et manifeste ; six diffs relus ; six fichiers proposés en entier ; sorties de la préparation et de l'essai ; sources.
// Usage : node a2-05-travail/arbitrage-F/protection-F/assembler-note.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const I = 'a2-05-travail/arbitrage-F/protection-F/', PROP = I + 'proposition/', SORTIE = 'a2-05-travail/note-export-lot3-F-protection-manifeste.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (b) => createHash('sha256').update(b).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
const M = JSON.parse(txt(PROP + 'manifeste.json')); const C = Object.keys(M);
if (C.length !== 6 || sha(brut(PROP + 'manifeste.json')) !== '4803da8cd372f1e700e828a950def1c9307c38cb75c531b9c902a83cfa28c854') throw new Error('manifeste inattendu');
const nomDiff = (p) => PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff';
for (const p of C) { if (sha(brut(PROP + p)) !== M[p].propose || sha(brut(nomDiff(p))) !== M[p].diff || sha(brut(p)) !== M[p].depart) throw new Error('empreinte divergente : ' + p); }
for (const f of ['sortie-preparation.txt', 'application/sortie-essai.txt']) if (!/(préparation conforme|essai conforme)\s*$/.test(txt(I + f))) throw new Error(f + ' : sortie non conforme');
const langue = (p) => (p.endsWith('.md') ? 'markdown' : p.endsWith('.json') ? 'json' : 'js');
const doc = [txt(I + 'note-export-entete.md'), '',
  '# Partie 1 · Table des diffs et manifeste de la proposition', '', txt(PROP + 'table-diffs.md'), '', '### `' + PROP + 'manifeste.json`', '', clot(txt(PROP + 'manifeste.json'), 'json'), '',
  '# Partie 2 · Les six diffs relus', '', 'Produits par `diffBrut` (`git diff --no-index`, `core.autocrlf=true`) : les fins de ligne n\'y apparaissent pas ; elles sont préservées (CRLF pour `ETAT-ACTUEL.md` et `ROADMAP.md`, LF pour les autres), ce que vérifient la préparation et `git diff --check`.', '',
  ...C.flatMap((p) => ['### `' + nomDiff(p) + '`', '', clot(txt(nomDiff(p)), 'diff'), '']),
  '# Partie 3 · Les six fichiers proposés, en entier', '', 'Recopiés depuis `' + PROP + '` ; chaque bloc est encadré par une clôture plus longue que celles qu\'il contient.', '',
  ...C.flatMap((p) => ['### `' + PROP + p + '` — SHA-256 `' + M[p].propose + '`', '', clot(txt(PROP + p), langue(p)), '']),
  '# Partie 4 · Sortie complète de la préparation (code 0)', '', 'Essais différentiels (lignes en retrait), ajout au manifeste par l\'outil, synchronisation, simulation de l\'état final, sabotages.', '', clot(txt(I + 'sortie-preparation.txt'), 'text'), '',
  '# Partie 5 · Sortie complète de l\'essai de l\'application sur copie jetable (code 0)', '', clot(txt(I + 'application/sortie-essai.txt'), 'text'), '',
  '# Partie 6 · Code source des scripts', '', ...['essais-differentiels.mjs', 'preparer-protection-F.mjs', 'application/appliquer-protection-F.mjs', 'application/essayer-protection-F.mjs'].flatMap((s) => ['### `' + I + s + '`' + (s.includes('appliquer') ? ' — non lancé' : ''), '', clot(txt(I + s), 'js'), ''])];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets ; 6 fichiers, 6 diffs, sorties et sources');
