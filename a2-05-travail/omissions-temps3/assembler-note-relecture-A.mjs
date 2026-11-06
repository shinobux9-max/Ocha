// A2-05 · bloc F · temps 3 : assemble la note d'export de la relecture du groupe A (proposition). Lecture seule hors de la note ; refuse d'écraser une note
// existante. En-tête ; rapport de relecture ; recueil des 32 fiches sources complètes ; analyse (JSON) ; sortie de la rédaction ; source du script.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-relecture-A.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', SORTIE = 'a2-05-travail/note-export-omissions-relecture-A.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (!/rédaction conforme ; \{"ne relève pas de la fonction":39,"relève de la fonction":0,"à arbitrer":0\}$/.test(txt(O + 'sortie-redaction.txt'))) throw new Error('sortie de la rédaction inattendue');
const FICH = ['analyse-A.json', 'rediger-rapport-A.mjs', 'rapport-relecture-A.md', 'fiches-A.md', 'sortie-redaction.txt', 'perimetre-A.json', 'proposition-decoupage-perimetre-A.md'];
const doc = ['# Note d\'export — A2-05 · bloc F · recherche d\'omissions, temps 3 : relecture du groupe A (39 sens, 31 ENTRY), proposée, non arbitrée', '',
  '**Date** : 2026-11-04. **Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé. **Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; les groupes B à E ne sont pas commencés.** Dossier de travail, non suivi : `' + O + '`.', '',
  '**Résultat proposé** : 39 « ne relève pas de la fonction », 0 « relève de la fonction », 0 « à arbitrer ». Aucune omission signalée.', '',
  '**Méthode de production** : l\'analyse de chaque sens (indice, R1 à R5, conclusion, motif) est écrite à la main dans `analyse-A.json`, après lecture de la fiche entière, des anciens exemples, de l\'ENTRY publiée, des décisions et de l\'entrée de lot ; `rediger-rapport-A.mjs` l\'assemble avec les faits du dossier et contrôle : une analyse par sens et aucune autre, champs complets, conclusion parmi les trois d\'A10, décisions citées existantes, livraisons du lot 3 et corrections retenues citées exactes et complètes. Au premier passage, ce contrôle a relevé quatre verdicts du lot 3 et une correction (V1-20) non cités : l\'analyse a été complétée avant toute écriture du rapport.', '',
  'Fichiers : ' + FICH.map((f) => '`' + O + f + '` `' + sha(O + f).slice(0, 16) + '`').join(' ; ') + '.', '',
  'Les fichiers `01` à `04` de l\'export recopient la gouvernance et la conception actuelles ; `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ; `10` donne le diff de l\'arbre de travail depuis `39cce13`.', '',
  '## Contenu', '', '- **Partie 1** : le rapport de relecture du groupe A.', '- **Partie 2** : les 32 fiches sources complètes, leurs 91 anciens exemples et les 31 ENTRY publiées, recopiées telles quelles.', '- **Partie 3** : `analyse-A.json`.', '- **Partie 4** : la sortie de la rédaction et la source du script.', '',
  '# Partie 1 · Rapport de relecture', '', txt(O + 'rapport-relecture-A.md').replace(/^# /, '## '), '',
  '# Partie 2 · Les 32 fiches sources complètes', '', txt(O + 'fiches-A.md').replace(/^# .*\n/, ''), '',
  '# Partie 3 · `analyse-A.json`', '', clot(txt(O + 'analyse-A.json'), 'json'), '',
  '# Partie 4 · Sortie de la rédaction (code 0) et source du script', '', clot(txt(O + 'sortie-redaction.txt'), 'text'), '', clot(txt(O + 'rediger-rapport-A.mjs'), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets');
