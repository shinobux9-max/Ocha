// A2-05 · bloc F · temps 3 : assemble la note d'export de la relecture de la livraison E2 du groupe E (proposition). Lecture seule hors de la note ; refuse
// d'écraser une note existante. En-tête ; rapport de relecture ; recueil des 31 fiches sources complètes, avec ENTRY et décisions ; analyses (JSON) ;
// sorties de la rédaction et des sabotages ; sources des scripts. Transposé de assembler-note-relecture-E1.mjs.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-relecture-E2.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', SORTIE = 'a2-05-travail/note-export-omissions-relecture-E2.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (!/rédaction conforme ; \{"ne relève pas de la fonction":30,"relève de la fonction":0,"à arbitrer":0\}$/.test(txt(O + 'sortie-redaction-E2.txt'))) throw new Error('sortie de la rédaction inattendue');
if (/ÉCART/.test(txt(O + 'sortie-redaction-E2.txt'))) throw new Error('écart dans la sortie de la rédaction');
const sab = txt(O + 'sortie-sabotages-E2.txt'); if ((sab.match(/ARRÊT : rien n'est écrit/g) ?? []).length !== 8 || !/--- T0\ntémoin sain\nrédaction conforme/.test(sab) || !/bilan : 9 sur 9 conformes/.test(sab)) throw new Error('sortie des sabotages inattendue');
const FICH = ['analyse-E2.json', 'rediger-rapport-E2.mjs', 'rapport-relecture-E2.md', 'fiches-E2.md', 'sortie-redaction-E2.txt', 'essayer-sabotages-E2.mjs', 'sortie-sabotages-E2.txt', 'perimetre-E.json', 'dossier-E.md'];
const doc = ['# Note d\'export — A2-05 · bloc F · recherche d\'omissions, temps 3 : relecture de la livraison E2 du groupe E (30 sens adjectivaux, 27 ENTRY), proposée, non arbitrée', '',
  '**Date** : 2026-11-05.', '',
  '**Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé. Les inscriptions des groupes A à D, du périmètre du groupe E (QE-1 à QE-5) et de la livraison E1 sont appliquées dans l\'arbre de travail : trois fichiers modifiés (`ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2) et onze documents neufs dans `docs/rapports/`, non committés. Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; E3 n\'est pas commencée. Le dossier de travail, non suivi, est `' + O + '`.', '',
  '**Résultat proposé** : 30 « ne relève pas de la fonction » (a adjectifs en i 17, b adjectifs en na 13), 0 « relève de la fonction », 0 « à arbitrer ». Aucune omission n\'est signalée. Les douze phrases en forme de question sont relevées et analysées (rapport, §2.1 : six énoncés en ね, trois questions ouvertes en どう, trois questions fermées en か) ; la distinction entre le contenu de la question et le porteur de la fonction, pour いい et 大丈夫 notamment, est au §3.2 ; les frontières, les neuf sens non candidats et quatre points signalés, sans contradiction avec A10, sont au §3.', '',
  '**Méthode de production** :',
  '- L\'analyse de chaque sens (groupe de lecture, indice, R1 à R5, conclusion, motif) est écrite à la main dans `analyse-E2.json`, après lecture des 31 fiches entières (les fiches fusionnées de いい, きれい, 弱い et 大変 comprises), de leurs 93 anciens exemples, des 27 ENTRY publiées, des 84 décisions de journal, des 10 corrections retenues et des 30 verdicts du volet 2.',
  '- `rediger-rapport-E2.mjs` assemble cette analyse avec les faits du dossier (`perimetre-E.json`, contrôlé à son empreinte), et contrôle :',
  '  - une analyse par sens de E2, et aucune autre ; des champs complets ; une conclusion parmi les trois d\'A10 ; un groupe de lecture conforme à la classe de l\'ENTRY ; aucune fonction publiée sur les sens relus ;',
  '  - que les décisions citées existent et appartiennent à l\'ENTRY, et que **les 84 décisions de journal sont toutes citées** ;',
  '  - que **les 10 corrections retenues** sont citées, et qu\'aucune correction étrangère ne l\'est ;',
  '  - que **le verdict du volet 2** de chaque sens est cité exactement en R5, et qu\'il est égal à l\'en-tête de l\'audit des `null` ; qu\'aucun sens n\'est commun au lot 3 ;',
  '  - que **la frontière de la classe et de la valeur nulle** (A10, §3, point 2 ; §5) est examinée en R3 pour chaque sens ; **celle de l\'information demandée et de l\'information désignée** (§2) pour いい, まずい, 暇 et 大丈夫 ; **les marques grammaticales** (§4, point 5) pour les énoncés en ね et les questions en か ; **le sens qui nomme une question** (§4, point 4) pour 易しい ; **le registre poli** (§4, point 3) pour 悪い et 大丈夫 ; **les dimensions** (§5, point 3) pour 便利, 大切 et 易しい ; le rattachement au sens 1 pour la question de まずい ; le renvoi à E3 des demandes de permission ;',
  '  - que **chaque porteur cité** porte bien la fonction ;',
  '  - que **le relevé des phrases en forme de question** (§2.1) est égal au relevé calculé sur les 31 fiches, et que **chacune est citée dans l\'analyse de son ENTRY** ; que les mentions de 質問 et les mots interrogatifs des phrases sont exacts ; que les furigana hors balise ruby se réduisent à une phrase.',
  '- **Sabotages**, sur des copies jetables hors du dépôt (`essayer-sabotages-E2.mjs`, partie 4) : un témoin sain est conforme. Une décision retirée d\'un R5, un verdict du volet 2 faux, la frontière de la valeur nulle retirée d\'un R3, un porteur faux, un groupe faux, la question de vérification de 大丈夫 retirée de son R2, la frontière de l\'information demandée retirée d\'un R3 et les marques grammaticales retirées d\'un R3 sont détectés chacun (code 1, rien n\'est écrit). **Le premier essai de S1 n\'a pas été détecté**, à juste titre : la décision choisie (D1125) figurait aussi dans l\'indice du sens, et la retirer du R5 la laissait citée. S1 porte désormais sur D1126, citée dans le seul R5 ; le script le dit en commentaire.',
  '- **Deux jets corrigés avant livraison**, conservés dans le scratchpad : l\'observation sur 強い (§7) disait « 欲い » ; la phrase brute montre en fait un furigana ほしい sur 欲, suivi de い, et une balise `</gem>` ; l\'accord « 1 phrases » est corrigé. Seules ces lignes du rapport ont changé ; le recueil est identique.', '',
  'Fichiers :', ...FICH.map((f) => '- `' + O + f + '` `' + sha(O + f).slice(0, 16) + '`'), '',
  'Les fichiers de l\'export à ignorer ou à lire autrement :',
  '- `01` à `04` recopient la gouvernance et la conception actuelles ; `01` porte les inscriptions des groupes A à D, du périmètre de E et de E1, appliquées ;',
  '- `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ;',
  '- `10` donne le diff de l\'arbre de travail depuis `39cce13`.', '',
  '## Contenu', '', '- **Partie 1** : le rapport de relecture de la livraison E2, en deux groupes de lecture (a, b).', '- **Partie 2** : les 31 fiches sources complètes, leurs 93 anciens exemples, les 27 ENTRY publiées et leurs 84 décisions de journal, recopiés tels quels.', '- **Partie 3** : `analyse-E2.json`, les 30 analyses individuelles (R1 à R5).', '- **Partie 4** : les sorties de la rédaction et des sabotages, et la source des deux scripts.', '',
  '# Partie 1 · Rapport de relecture', '', txt(O + 'rapport-relecture-E2.md').replace(/^# /, '## '), '',
  '# Partie 2 · Les 31 fiches sources complètes, les ENTRY publiées et leurs décisions', '', txt(O + 'fiches-E2.md').replace(/^# .*\n/, ''), '',
  '# Partie 3 · `analyse-E2.json`', '', clot(txt(O + 'analyse-E2.json'), 'json'), '',
  '# Partie 4 · Sorties (rédaction, code 0 ; sabotages) et sources des scripts', '', clot(txt(O + 'sortie-redaction-E2.txt'), 'text'), '', clot(sab, 'text'), '', clot(txt(O + 'rediger-rapport-E2.mjs'), 'js'), '', clot(txt(O + 'essayer-sabotages-E2.mjs'), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n') + '\n') + ' octets');
