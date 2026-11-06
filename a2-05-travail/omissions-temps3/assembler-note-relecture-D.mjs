// A2-05 · bloc F · temps 3 : assemble la note d'export de la relecture du groupe D (proposition). Lecture seule hors de la note ; refuse d'écraser une note
// existante. En-tête ; rapport de relecture ; recueil des 41 fiches sources complètes ; analyses (JSON) ; sorties de la rédaction et des sabotages ; source du script.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-relecture-D.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', SORTIE = 'a2-05-travail/note-export-omissions-relecture-D.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (!/rédaction conforme ; \{"ne relève pas de la fonction":53,"relève de la fonction":0,"à arbitrer":0\}$/.test(txt(O + 'sortie-redaction-D.txt'))) throw new Error('sortie de la rédaction inattendue');
const sab = txt(O + 'sortie-sabotages-D.txt'); if ((sab.match(/ARRÊT : rien n'est écrit/g) ?? []).length !== 5 || !/--- T0\ntémoin sain\nrédaction conforme/.test(sab)) throw new Error('sortie des sabotages inattendue');
const FICH = ['analyse-D.json', 'rediger-rapport-D.mjs', 'rapport-relecture-D.md', 'fiches-D.md', 'sortie-redaction-D.txt', 'sortie-sabotages-D.txt', 'perimetre-D.json', 'dossier-D.md', 'proposition-perimetre-D.md'];
const doc = ['# Note d\'export — A2-05 · bloc F · recherche d\'omissions, temps 3 : relecture du groupe D (53 sens, 40 ENTRY), proposée, non arbitrée', '',
  '**Date** : 2026-11-04.', '',
  '**Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé. Les inscriptions des arbitrages des groupes A, B et C sont appliquées dans l\'arbre de travail : trois fichiers modifiés (`ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2) et sept documents neufs dans `docs/rapports/`, non committés. Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée, et le groupe E n\'est pas commencé. Le dossier de travail, non suivi, est `' + O + '`.', '',
  '**Résultat proposé** : 53 « ne relève pas de la fonction » (a 15, b 10, c 28), 0 « relève de la fonction », 0 « à arbitrer ». Aucune omission n\'est signalée. Dix-huit phrases des sources sont relevées et analysées (rapport, §2) ; les frontières, les deux ENTRY présentes dans deux familles et trois points signalés, sans contradiction avec A10, sont au §3.', '',
  '**Méthode de production** :',
  '- L\'analyse de chaque sens (famille, indice, R1 à R5, conclusion, motif) est écrite à la main dans `analyse-D.json`, après lecture des 41 fiches entières (la fiche fusionnée de ゆっくり comprise), de leurs 123 anciens exemples, des 40 ENTRY publiées, des 148 décisions de journal et des 12 corrections retenues.',
  '- `rediger-rapport-D.mjs` assemble cette analyse avec les faits du dossier (`perimetre-D.json`, contrôlé à son empreinte), et contrôle :',
  '  - une analyse par sens, et aucune autre ; des champs complets ; une conclusion parmi les trois d\'A10 ; une famille conforme à la fonction publiée ;',
  '  - que les décisions citées existent et appartiennent à l\'ENTRY, et que **les 148 décisions de journal sont toutes citées** ;',
  '  - que les livraisons du lot 3 sont citées exactement, et que les 13 sens hors des 377 le disent ;',
  '  - que **les 12 corrections retenues** sont citées, et qu\'aucune correction étrangère ne l\'est ;',
  '  - que **la frontière de la classe et de la série** (A10, §3, point 2) est examinée en R3 pour chaque sens, **celle de `deictique`** (§4, point 2) pour la famille a, **celle du registre poli** (§4, point 3) pour あちら et 結構 « Non merci », **celle des indéfinis** (§4, point 1) pour 小さな, **le cumul** (§6) avec la correction retenue pour また, sens 2, et que **chaque fonction publiée** est citée en R4 ;',
  '  - que **chaque porteur cité** porte bien la fonction ;',
  '  - que **le relevé des phrases interrogatives** (§2) est égal au relevé calculé sur les 41 fiches (toute traduction en forme de question), plus l\'interrogation indirecte de 自分.',
  '- **Sabotages**, sur des copies jetables (partie 4) : un témoin sain est conforme et produit le même rapport. Une décision retirée d\'un R5, une livraison du lot 3 fausse, la frontière de la classe retirée d\'un R3, un porteur faux et une famille fausse sont détectés chacun (code 1, rien n\'est écrit).', '',
  'Fichiers :', ...FICH.map((f) => '- `' + O + f + '` `' + sha(O + f).slice(0, 16) + '`'), '',
  'Les fichiers de l\'export à ignorer ou à lire autrement :',
  '- `01` à `04` recopient la gouvernance et la conception actuelles ; `01` porte les inscriptions des arbitrages des groupes A, B et C, appliquées ;',
  '- `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ;',
  '- `10` donne le diff de l\'arbre de travail depuis `39cce13`.', '',
  '## Contenu', '', '- **Partie 1** : le rapport de relecture du groupe D, en trois sections (a, b, c).', '- **Partie 2** : les 41 fiches sources complètes, leurs 123 anciens exemples et les 40 ENTRY publiées, recopiés tels quels.', '- **Partie 3** : `analyse-D.json`, les 53 analyses individuelles.', '- **Partie 4** : les sorties de la rédaction et des sabotages, et la source du script.', '',
  '# Partie 1 · Rapport de relecture', '', txt(O + 'rapport-relecture-D.md').replace(/^# /, '## '), '',
  '# Partie 2 · Les 41 fiches sources complètes', '', txt(O + 'fiches-D.md').replace(/^# .*\n/, ''), '',
  '# Partie 3 · `analyse-D.json`', '', clot(txt(O + 'analyse-D.json'), 'json'), '',
  '# Partie 4 · Sorties (rédaction, code 0 ; sabotages) et source du script', '', clot(txt(O + 'sortie-redaction-D.txt'), 'text'), '', clot(sab, 'text'), '', clot(txt(O + 'rediger-rapport-D.mjs'), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets');
