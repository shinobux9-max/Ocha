// A2-05 · bloc F · temps 3 : assemble la note d'export de la relecture du groupe B (proposition). Lecture seule hors de la note ; refuse d'écraser une note
// existante. En-tête ; rapport de relecture ; recueil des 15 fiches sources complètes ; analyse (JSON) ; sortie de la rédaction ; source du script.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-relecture-B.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', SORTIE = 'a2-05-travail/note-export-omissions-relecture-B.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (!/rédaction conforme ; \{"ne relève pas de la fonction":18,"relève de la fonction":0,"à arbitrer":0\}$/.test(txt(O + 'sortie-redaction-B.txt'))) throw new Error('sortie de la rédaction inattendue');
const FICH = ['analyse-B.json', 'rediger-rapport-B.mjs', 'rapport-relecture-B.md', 'fiches-B.md', 'sortie-redaction-B.txt', 'perimetre-B.json', 'proposition-perimetre-B.md'];
const doc = ['# Note d\'export — A2-05 · bloc F · recherche d\'omissions, temps 3 : relecture du groupe B (18 sens, 15 ENTRY), proposée, non arbitrée', '',
  '**Date** : 2026-11-04.', '',
  '**Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé. L\'inscription de l\'arbitrage du groupe A est appliquée dans l\'arbre de travail (six fichiers, non committés). Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée, et les groupes C à E ne sont pas commencés. Le dossier de travail, non suivi, est `' + O + '`.', '',
  '**Résultat proposé** : 18 « ne relève pas de la fonction », 0 « relève de la fonction », 0 « à arbitrer ». Aucune omission n\'est signalée. Pour QB-4 (D0637, D0672, D0677), la relecture ne relève aucune discordance avec A10, mais fait une observation de rédaction (rapport, §3).', '',
  '**Méthode de production** :',
  '- L\'analyse de chaque sens (indice, R1 à R5, conclusion, motif) est écrite à la main dans `analyse-B.json`, après lecture de la fiche entière, de ses anciens exemples, de l\'ENTRY publiée, de toutes les décisions de journal de l\'ENTRY et de l\'entrée de lot.',
  '- `rediger-rapport-B.mjs` assemble cette analyse avec les faits du dossier, et contrôle :',
  '  - une analyse par sens, et aucune autre ; des champs complets ; une conclusion parmi les trois d\'A10 ;',
  '  - que les décisions citées existent ;',
  '  - que **toutes les décisions de journal de chaque ENTRY sont citées**, et que **chacune des 17 décisions du filtre est confrontée dans un R5** ;',
  '  - que D0637, D0672 et D0677 sont confrontées (QB-4), et que D0700 reprend mot pour mot la phrase de D0672, sur une ENTRY porteuse de la fonction ;',
  '  - que les livraisons du lot 3 et les corrections retenues sont citées exactement et complètement.',
  '- **Sabotages**, sur des copies jetables : un témoin sain est conforme. Une décision du filtre retirée d\'un R5, une livraison du lot 3 fausse et une correction retirée sont détectées chacune (code 1, rien n\'est écrit).', '',
  'Fichiers :', ...FICH.map((f) => '- `' + O + f + '` `' + sha(O + f).slice(0, 16) + '`'), '',
  'Les fichiers de l\'export à ignorer ou à lire autrement :',
  '- `01` à `04` recopient la gouvernance et la conception actuelles ; `01` porte l\'inscription de l\'arbitrage du groupe A, appliquée ;',
  '- `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ;',
  '- `10` donne le diff de l\'arbre de travail depuis `39cce13`.', '',
  '## Contenu', '', '- **Partie 1** : le rapport de relecture du groupe B.', '- **Partie 2** : les 15 fiches sources complètes, leurs 45 anciens exemples et les 15 ENTRY publiées, recopiées telles quelles.', '- **Partie 3** : `analyse-B.json`.', '- **Partie 4** : la sortie de la rédaction et la source du script.', '',
  '# Partie 1 · Rapport de relecture', '', txt(O + 'rapport-relecture-B.md').replace(/^# /, '## '), '',
  '# Partie 2 · Les 15 fiches sources complètes', '', txt(O + 'fiches-B.md').replace(/^# .*\n/, ''), '',
  '# Partie 3 · `analyse-B.json`', '', clot(txt(O + 'analyse-B.json'), 'json'), '',
  '# Partie 4 · Sortie de la rédaction (code 0) et source du script', '', clot(txt(O + 'sortie-redaction-B.txt'), 'text'), '', clot(txt(O + 'rediger-rapport-B.mjs'), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets');
