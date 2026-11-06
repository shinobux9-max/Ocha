// A2-05 · bloc F · temps 3 : assemble la note d'export de la relecture de la livraison E1 du groupe E (proposition). Lecture seule hors de la note ; refuse
// d'écraser une note existante. En-tête ; rapport de relecture ; recueil des 39 fiches sources complètes, avec ENTRY et décisions ; analyses (JSON) ;
// sorties de la rédaction et des sabotages ; sources des scripts.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-relecture-E1.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', SORTIE = 'a2-05-travail/note-export-omissions-relecture-E1.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (!/rédaction conforme ; \{"ne relève pas de la fonction":39,"relève de la fonction":0,"à arbitrer":0\}$/.test(txt(O + 'sortie-redaction-E1.txt'))) throw new Error('sortie de la rédaction inattendue');
if (/ÉCART/.test(txt(O + 'sortie-redaction-E1.txt'))) throw new Error('écart dans la sortie de la rédaction');
const sab = txt(O + 'sortie-sabotages-E1.txt'); if ((sab.match(/ARRÊT : rien n'est écrit/g) ?? []).length !== 7 || !/--- T0\ntémoin sain\nrédaction conforme/.test(sab) || !/bilan : 8 sur 8 conformes/.test(sab)) throw new Error('sortie des sabotages inattendue');
const FICH = ['analyse-E1.json', 'rediger-rapport-E1.mjs', 'rapport-relecture-E1.md', 'fiches-E1.md', 'sortie-redaction-E1.txt', 'essayer-sabotages-E1.mjs', 'sortie-sabotages-E1.txt', 'perimetre-E.json', 'dossier-E.md', 'proposition-perimetre-E.md'];
const doc = ['# Note d\'export — A2-05 · bloc F · recherche d\'omissions, temps 3 : relecture de la livraison E1 du groupe E (39 sens nominaux, 37 ENTRY), proposée, non arbitrée', '',
  '**Date** : 2026-11-05.', '',
  '**Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé. Les inscriptions des arbitrages des groupes A, B, C et D sont appliquées dans l\'arbre de travail : trois fichiers modifiés (`ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2) et neuf documents neufs dans `docs/rapports/`, non committés. Le périmètre du groupe E est accepté (QE-1 à QE-4) ; son arbitrage n\'est pas encore inscrit dans les documents de pilotage. Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; E2 et E3 ne sont pas commencées. Le dossier de travail, non suivi, est `' + O + '`.', '',
  '**Résultat proposé** : 39 « ne relève pas de la fonction » (a 15, b 6, c 7, d 11), 0 « relève de la fonction », 0 « à arbitrer ». Aucune omission n\'est signalée. Quinze phrases des sources sont relevées et analysées (rapport, §2.1 : les quatorze phrases en forme de question, et une interrogation indirecte) ; la distinction entre information demandée, information désignée et fonction interrogative, pour les noms de personne et pour 意味, est au §3.2 ; les frontières, les sens non candidats et cinq points signalés, sans contradiction avec A10, sont au §3.', '',
  '**Méthode de production** :',
  '- L\'analyse de chaque sens (groupe de lecture, indice, R1 à R5, conclusion, motif) est écrite à la main dans `analyse-E1.json`, après lecture des 39 fiches entières (les fiches fusionnées de お腹 et de キロ comprises), de leurs 117 anciens exemples, des 37 ENTRY publiées, des 101 décisions de journal, des 22 corrections retenues et des 39 verdicts du volet 2.',
  '- `rediger-rapport-E1.mjs` assemble cette analyse avec les faits du dossier (`perimetre-E.json`, contrôlé à son empreinte), et contrôle :',
  '  - une analyse par sens de E1, et aucune autre ; des champs complets ; une conclusion parmi les trois d\'A10 ; un groupe de lecture constant par ENTRY ; aucune fonction publiée sur les sens relus ;',
  '  - que les décisions citées existent et appartiennent à l\'ENTRY, et que **les 101 décisions de journal sont toutes citées** ;',
  '  - que **les 22 corrections retenues** sont citées, et qu\'aucune correction étrangère ne l\'est ;',
  '  - que **le verdict du volet 2** de chaque sens est cité exactement en R5, et qu\'il est égal à l\'en-tête de l\'audit des `null` ; qu\'aucun sens n\'est commun au lot 3 ;',
  '  - que **la frontière de la classe et de la valeur nulle** (A10, §3, point 2 ; §5) est examinée en R3 pour chaque sens ; **celle de l\'information désignée et de l\'information demandée** (§2) pour les six noms de personne ; **celle du registre poli** (§4, point 3) pour 方 et 皆さん ; **celle du sens qui nomme une question** (§4, point 4) là où 質問 figure ; **celle des indéfinis** (§4, point 1) pour お腹 et 物 ; **les marques grammaticales** (§4, point 5) pour l\'alternative indirecte de 表 ; le rattachement au sens 1 pour 時間 et 意味 ;',
  '  - que **chaque porteur cité** porte bien la fonction ;',
  '  - que **le relevé des phrases en forme de question** (§2.1) est égal au relevé calculé sur les 39 fiches, plus l\'interrogation indirecte de 表, et que **chacune est citée dans l\'analyse de son ENTRY** ; que les mentions de 質問 sont exactes.',
  '- **Sabotages**, sur des copies jetables hors du dépôt (`essayer-sabotages-E1.mjs`, partie 4) : un témoin sain est conforme. Une décision retirée d\'un R5, un verdict du volet 2 faux, la frontière de la valeur nulle retirée d\'un R3, un porteur faux, un groupe faux, une question d\'exemple retirée de son R2 et la frontière de l\'information désignée retirée d\'un R3 sont détectés chacun (code 1, rien n\'est écrit).', '',
  'Fichiers :', ...FICH.map((f) => '- `' + O + f + '` `' + sha(O + f).slice(0, 16) + '`'), '',
  'Les fichiers de l\'export à ignorer ou à lire autrement :',
  '- `01` à `04` recopient la gouvernance et la conception actuelles ; `01` porte les inscriptions des arbitrages des groupes A à D, appliquées ;',
  '- `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ;',
  '- `10` donne le diff de l\'arbre de travail depuis `39cce13`.', '',
  '## Contenu', '', '- **Partie 1** : le rapport de relecture de la livraison E1, en quatre groupes de lecture (a, b, c, d).', '- **Partie 2** : les 39 fiches sources complètes, leurs 117 anciens exemples, les 37 ENTRY publiées et leurs 101 décisions de journal, recopiés tels quels.', '- **Partie 3** : `analyse-E1.json`, les 39 analyses individuelles (R1 à R5).', '- **Partie 4** : les sorties de la rédaction et des sabotages, et la source des deux scripts.', '',
  '# Partie 1 · Rapport de relecture', '', txt(O + 'rapport-relecture-E1.md').replace(/^# /, '## '), '',
  '# Partie 2 · Les 39 fiches sources complètes, les ENTRY publiées et leurs décisions', '', txt(O + 'fiches-E1.md').replace(/^# .*\n/, ''), '',
  '# Partie 3 · `analyse-E1.json`', '', clot(txt(O + 'analyse-E1.json'), 'json'), '',
  '# Partie 4 · Sorties (rédaction, code 0 ; sabotages) et sources des scripts', '', clot(txt(O + 'sortie-redaction-E1.txt'), 'text'), '', clot(sab, 'text'), '', clot(txt(O + 'rediger-rapport-E1.mjs'), 'js'), '', clot(txt(O + 'essayer-sabotages-E1.mjs'), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n') + '\n') + ' octets');
