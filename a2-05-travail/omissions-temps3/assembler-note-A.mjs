// A2-05 · bloc F · temps 3 : assemble la note d'export de la proposition de découpage et du périmètre du groupe A. Lecture seule hors de la note ; refuse
// d'écraser une note existante. Proposition ; annexe A (dossier factuel) ; annexe B (sortie de la préparation) ; annexe C (liste nominative des cinq groupes) ;
// annexe D (source du script). Usage : node a2-05-travail/omissions-temps3/assembler-note-A.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', SORTIE = 'a2-05-travail/note-export-omissions-decoupage-A.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (!/préparation conforme ; aucun verdict$/.test(txt(O + 'sortie-preparation.txt'))) throw new Error('sortie de la préparation non conforme');
const D = JSON.parse(txt(O + 'decoupage.json')).groupes;
const total = Object.values(D).reduce((n, g) => n + g.sens.length, 0); if (total !== 234) throw new Error('234 sens attendus');
const titre = (p) => '`' + p + '` — SHA-256 `' + sha(p) + '`';
const doc = ['# Note d\'export — A2-05 · bloc F · recherche d\'omissions, temps 3 : découpage des 234 candidats et périmètre du groupe A, proposés, non arbitrés', '',
  '**Date** : 2026-11-04. **Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé. **Aucun sens n\'est relu, aucun verdict n\'est pris ; aucune donnée, norme, décision ou document de pilotage n\'est modifié.** Dossier de travail, non suivi : `' + O + '`.', '',
  'Fichiers : ' + ['preparer-decoupage-A.mjs', 'decoupage.json', 'perimetre-A.json', 'dossier-A.md', 'proposition-decoupage-perimetre-A.md', 'sortie-preparation.txt'].map((f) => titre(O + f)).join(' ; ') + '.', '',
  'Les fichiers `01` à `04` de l\'export recopient la gouvernance et la conception actuelles ; les fichiers `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer. Le fichier `10` donne le diff de l\'arbre de travail depuis `39cce13`.', '',
  '---', '', txt(O + 'proposition-decoupage-perimetre-A.md').replace(/^# /, '## Proposition · '), '',
  '# Annexe A · Dossier factuel du groupe A (généré par le script)', '', txt(O + 'dossier-A.md').replace(/^# .*\n/, ''), '',
  '# Annexe B · Sortie complète de la préparation (code 0)', '', clot(txt(O + 'sortie-preparation.txt'), 'text'), '',
  '# Annexe C · Liste nominative des cinq groupes (depuis `decoupage.json`)', '',
  ...Object.entries(D).flatMap(([g, x]) => ['## Groupe ' + g + ' — ' + x.theme + ' : ' + x.sens.length + ' sens, ' + x.entry.length + ' ENTRY', '', '| SENSE | ENTRY | Filtres d\'origine | Entrée dans le groupe |', '|---|---|---|---|', ...x.sens.map((s) => '| `' + s.id + '` | `' + s.entry + '` | ' + s.filtres.map((f) => '`' + f + '`').join(', ') + ' | ' + s.motif + ' |'), '']),
  '# Annexe D · Source du script de préparation', '', clot(txt(O + 'preparer-decoupage-A.mjs'), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets');
