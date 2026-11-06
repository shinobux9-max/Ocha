// A2-05 · bloc F · temps 3 : assemble la note d'export de la relecture du groupe C (proposition). Lecture seule hors de la note ; refuse d'écraser une note
// existante. En-tête ; rapport de relecture ; recueil des deux fiches sources complètes ; analyse (JSON) ; sortie de la rédaction ; source du script.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-relecture-C.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', SORTIE = 'a2-05-travail/note-export-omissions-relecture-C.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (!/rédaction conforme ; \{"ne relève pas de la fonction":3,"relève de la fonction":0,"à arbitrer":0\}$/.test(txt(O + 'sortie-redaction-C.txt'))) throw new Error('sortie de la rédaction inattendue');
const FICH = ['analyse-C.json', 'rediger-rapport-C.mjs', 'rapport-relecture-C.md', 'fiches-C.md', 'sortie-redaction-C.txt', 'perimetre-C.json', 'proposition-perimetre-C.md'];
const doc = ['# Note d\'export — A2-05 · bloc F · recherche d\'omissions, temps 3 : relecture du groupe C (3 sens, 2 ENTRY), proposée, non arbitrée', '',
  '**Date** : 2026-11-04.', '',
  '**Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé. Les inscriptions des arbitrages des groupes A et B sont appliquées dans l\'arbre de travail (onze fichiers, non committés). Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée, et les groupes D et E ne sont pas commencés. Le dossier de travail, non suivi, est `' + O + '`.', '',
  '**Résultat proposé** : 3 « ne relève pas de la fonction », 0 « relève de la fonction », 0 « à arbitrer ». Aucune omission n\'est signalée. Les frontières demandées (série, indéfini, fonctions déjà publiées) sont examinées sens par sens (rapport, §2).', '',
  '**Méthode de production** :',
  '- L\'analyse de chaque sens (indice, R1 à R5, conclusion, motif) est écrite à la main dans `analyse-C.json`, après lecture des deux fiches entières, de leurs six anciens exemples, des ENTRY publiées, des sept décisions de journal et des entrées de lot.',
  '- `rediger-rapport-C.mjs` assemble cette analyse avec les faits du dossier (`perimetre-C.json`, contrôlé à son empreinte), et contrôle :',
  '  - une analyse par sens, et aucune autre ; des champs complets ; une conclusion parmi les trois d\'A10 ;',
  '  - que les décisions citées existent, et que **les sept décisions de journal sont toutes citées** ;',
  '  - que les livraisons du lot 3 (D5, D6) sont citées exactement ;',
  '  - que **la frontière de la série** (A10, §3, point 2) est examinée en R3 pour chaque sens, **celle des indéfinis** (§4, point 1) pour いつも, et que **chaque fonction publiée** est citée en R4 ;',
  '  - que les porteurs déclencheurs (いつ `v_391`, どう `v_393`) portent bien la fonction et sont nommés dans l\'indice.',
  '- **Sabotages**, sur des copies jetables : un témoin sain est conforme. Une décision retirée d\'un R5 (D1505), une livraison du lot 3 fausse et la frontière de la série retirée d\'un R3 sont détectées chacune (code 1, rien n\'est écrit).', '',
  'Fichiers :', ...FICH.map((f) => '- `' + O + f + '` `' + sha(O + f).slice(0, 16) + '`'), '',
  'Les fichiers de l\'export à ignorer ou à lire autrement :',
  '- `01` à `04` recopient la gouvernance et la conception actuelles ; `01` porte les inscriptions des arbitrages des groupes A et B, appliquées ;',
  '- `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ;',
  '- `10` donne le diff de l\'arbre de travail depuis `39cce13`.', '',
  '## Contenu', '', '- **Partie 1** : le rapport de relecture du groupe C.', '- **Partie 2** : les deux fiches sources complètes, leurs six anciens exemples et les deux ENTRY publiées, recopiés tels quels.', '- **Partie 3** : `analyse-C.json`, les analyses individuelles.', '- **Partie 4** : la sortie de la rédaction et la source du script.', '',
  '# Partie 1 · Rapport de relecture', '', txt(O + 'rapport-relecture-C.md').replace(/^# /, '## '), '',
  '# Partie 2 · Les deux fiches sources complètes', '', txt(O + 'fiches-C.md').replace(/^# .*\n/, ''), '',
  '# Partie 3 · `analyse-C.json`', '', clot(txt(O + 'analyse-C.json'), 'json'), '',
  '# Partie 4 · Sortie de la rédaction (code 0) et source du script', '', clot(txt(O + 'sortie-redaction-C.txt'), 'text'), '', clot(txt(O + 'rediger-rapport-C.mjs'), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets');
