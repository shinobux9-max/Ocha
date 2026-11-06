// A2-05 · bloc F · temps 3 : assemble la note d'export de la relecture de la livraison E3 du groupe E (proposition). Lecture seule hors de la note ; refuse
// d'écraser une note existante. En-tête ; rapport de relecture ; corrections retenues pertinentes (lignes du bilan du volet 2) et entrée d'audit du verdict C ;
// recueil des 45 fiches sources complètes, avec ENTRY et décisions ; analyses (JSON) ; sorties de la rédaction et des sabotages ; sources des scripts.
// Transposé de assembler-note-relecture-E2.mjs.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-relecture-E3.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', SORTIE = 'a2-05-travail/note-export-omissions-relecture-E3.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (!/rédaction conforme ; \{"ne relève pas de la fonction":52,"relève de la fonction":0,"à arbitrer":0\}$/.test(txt(O + 'sortie-redaction-E3.txt'))) throw new Error('sortie de la rédaction inattendue');
if (/ÉCART/.test(txt(O + 'sortie-redaction-E3.txt'))) throw new Error('écart dans la sortie de la rédaction');
const sab = txt(O + 'sortie-sabotages-E3.txt'); if ((sab.match(/ARRÊT : rien n'est écrit/g) ?? []).length !== 10 || !/--- T0\ntémoin sain\nrédaction conforme/.test(sab) || !/bilan : 11 sur 11 conformes/.test(sab)) throw new Error('sortie des sabotages inattendue');
// Corrections retenues des ENTRY de E3 : lignes de leurs tables dans le bilan du volet 2, et entrée d'audit du verdict C
const BIL = txt('docs/rapports/etape2-A2-05-bilan-volet2.md').split('\n');
const IDS = ['V1-2', 'V1-3', 'V1-4', 'V2-15', 'V2-32', 'V2-98', 'V2-99', 'V2-100', 'V2-163', 'V2-164'];
const lignes = IDS.map((id) => { const l = BIL.filter((x) => x.startsWith('| ' + id + ' |')); if (l.length !== 1) throw new Error('ligne du bilan introuvable ou ambiguë : ' + id); return l[0]; });
const mod6 = BIL.filter((x) => /^\| 6 \| `v_528_s1` \|/.test(x)); if (mod6.length !== 1) throw new Error('modification 6 du volet 2 introuvable');
// En-tête réel de la table d'une ligne : la ligne qui précède le séparateur |---| le plus proche au-dessus ; il doit être le même pour toute une série
const entete = (l) => { let i = BIL.indexOf(l); while (i > 0 && !/^\|(-+\|)+$/.test(BIL[i])) i--; if (i <= 0) throw new Error('en-tête introuvable : ' + l.slice(0, 20)); return [BIL[i - 1], BIL[i]]; };
const table = (ls) => { const h = [...new Set(ls.map((l) => entete(l).join('\n')))]; if (h.length !== 1) throw new Error('en-têtes différents dans une même série'); return [h[0], ...ls]; };
const AUD = txt('docs/rapports/etape2-A2-05-audit-null.md').split('\n'); const i0 = AUD.findIndex((l) => l.startsWith('#### `v_528_s1`'));
const i1 = AUD.findIndex((l, i) => i > i0 && /^#{2,4} /.test(l)); if (i0 < 0 || i1 < 0) throw new Error('entrée d\'audit de v_528_s1 introuvable');
const FICH = ['analyse-E3.json', 'rediger-rapport-E3.mjs', 'rapport-relecture-E3.md', 'fiches-E3.md', 'sortie-redaction-E3.txt', 'essayer-sabotages-E3.mjs', 'sortie-sabotages-E3.txt', 'perimetre-E.json', 'dossier-E.md'];
const doc = ['# Note d\'export — A2-05 · bloc F · recherche d\'omissions, temps 3 : relecture de la livraison E3 du groupe E (52 sens verbaux, 43 ENTRY), proposée, non arbitrée', '',
  '**Date** : 2026-11-05.', '',
  '**Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé. Les inscriptions des groupes A à D, du périmètre du groupe E (QE-1 à QE-5) et des livraisons E1 et E2 sont appliquées dans l\'arbre de travail : trois fichiers modifiés (`ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2) et douze documents neufs dans `docs/rapports/`, non committés. Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée. L\'inscription de E3 et le bilan de clôture de la recherche d\'omissions ne sont pas préparés. Le dossier de travail, non suivi, est `' + O + '`.', '',
  '**Résultat proposé** : 52 « ne relève pas de la fonction » (a lot 18 : 23 ; b lot 19 : 10 ; c lot 20 : 13 ; d autres lots : 6), 0 « relève de la fonction », 0 « à arbitrer ». Aucune omission n\'est signalée. Les dix phrases en forme de question sont relevées et analysées (rapport, §2.1 : cinq demandes de permission en 〜てもいいですか, deux questions fermées en か, trois questions ouvertes en どう et いくら) ; la distinction entre un verbe qui désigne une action et le porteur de l\'interrogation est au §3.2, avec いい dans les demandes de permission, renvoyé par E2 ; les huit sens qu\'aucune phrase n\'illustre ont leur limite dite en R2 (§3.4, point 2).', '',
  '**Méthode de production** :',
  '- L\'analyse de chaque sens (groupe de lecture, indice, R1 à R5, conclusion, motif) est écrite à la main dans `analyse-E3.json`, après lecture des 45 fiches entières (les fiches fusionnées de 無くす et de 出る comprises), de leurs 135 anciens exemples, des 43 ENTRY publiées, des 154 décisions de journal, des 11 corrections retenues et des 52 verdicts du volet 2.',
  '- `rediger-rapport-E3.mjs` assemble cette analyse avec les faits du dossier (`perimetre-E.json`, contrôlé à son empreinte), et contrôle :',
  '  - une analyse par sens de E3, et aucune autre ; des champs complets ; une conclusion parmi les trois d\'A10 ; un groupe de lecture conforme au lot de la fiche ; aucune fonction publiée sur les sens relus ;',
  '  - que les décisions citées existent et appartiennent à l\'ENTRY, et que **les 154 décisions de journal sont toutes citées** ;',
  '  - que **les 11 corrections retenues** sont citées, et qu\'aucune correction étrangère ne l\'est ;',
  '  - que **le verdict du volet 2** de chaque sens est cité exactement en R5 (L 51, C 1), et qu\'il est égal à l\'en-tête de l\'audit des `null` ; qu\'aucun sens n\'est commun au lot 3 ;',
  '  - que **la frontière de la classe et de la valeur nulle** est examinée en R3 pour chaque sens ; **celle de l\'information demandée et de l\'information désignée, et les marques grammaticales**, pour les neuf sens dont une phrase est en forme de question ; que, pour les cinq demandes de permission, le R2 cite la phrase, いい relu en E2, et distingue le contenu du porteur ; **le sens qui nomme une question** pour 違う (質問) ; **l\'emploi de réplique** pour 違う, avec D1327 ; **les dimensions** pour 違う et 要る ; la question de 無くす pour する ;',
  '  - que **la limite est dite** en R2 pour les huit sens qu\'aucune phrase n\'illustre, et pour eux seuls ; que les cinq décisions marquées par le dossier comme parlant des fonctions sont confrontées, D1184 étant dite faux positif du filtre ;',
  '  - que **chaque porteur cité** porte bien la fonction ;',
  '  - que **le relevé des phrases en forme de question** (§2.1) est égal au relevé calculé sur les 45 fiches, et que **chacune est citée dans l\'analyse de son ENTRY** ; que les mentions de 〜てもいい, de 質問, de どうぞ, les mots interrogatifs et les caractères latins des phrases sont exacts ; qu\'aucune phrase n\'a de furigana hors balise ruby ni de balise étrangère.',
  '- **Sabotages**, sur des copies jetables hors du dépôt (`essayer-sabotages-E3.mjs`, partie 5) : un témoin sain est conforme ; dix sabotages (une décision retirée d\'un R5, le verdict C changé, la frontière de la valeur nulle retirée, un porteur faux, un groupe faux, la distinction du contenu et du porteur retirée d\'une demande de permission, la frontière de l\'information demandée retirée d\'une question fermée, les marques grammaticales retirées, une limite retirée, une correction retirée) sont détectés chacun (code 1, rien n\'est écrit).',
  '- **Un essai sur copie avant l\'écriture dans le dépôt** a montré un seul écart, du contrôle et non de l\'analyse : l\'expression de 〜てもいい n\'acceptait pas l\'espace de « コピーしても いいですか » ; elle est corrigée (`て\\s*も\\s*いい`). L\'intitulé des groupes a été retouché ensuite, sans effet sur les contrôles.', '',
  'Fichiers :', ...FICH.map((f) => '- `' + O + f + '` `' + sha(O + f).slice(0, 16) + '`'), '',
  'Les fichiers de l\'export à ignorer ou à lire autrement :',
  '- `01` à `04` recopient la gouvernance et la conception actuelles ; `01` porte les inscriptions des groupes A à D, du périmètre de E, de E1 et de E2, appliquées ;',
  '- `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ;',
  '- `10` donne le diff de l\'arbre de travail depuis `39cce13`.', '',
  '## Contenu', '', '- **Partie 1** : le rapport de relecture de la livraison E3, en quatre groupes de lecture (a à d).', '- **Partie 2** : les corrections retenues pertinentes (11) et l\'entrée d\'audit du seul verdict C, recopiées du bilan du volet 2 et de l\'audit des `null`.', '- **Partie 3** : les 45 fiches sources complètes, leurs 135 anciens exemples, les 43 ENTRY publiées et leurs 154 décisions de journal, recopiés tels quels.', '- **Partie 4** : `analyse-E3.json`, les 52 analyses individuelles (R1 à R5).', '- **Partie 5** : les sorties de la rédaction et des sabotages, et la source des deux scripts.', '',
  '# Partie 1 · Rapport de relecture', '', txt(O + 'rapport-relecture-E3.md').replace(/^# /, '## '), '',
  '# Partie 2 · Corrections retenues des ENTRY de E3, et l\'entrée d\'audit du verdict C', '',
  'Recopiées telles quelles de `docs/rapports/etape2-A2-05-bilan-volet2.md` (SHA-256 `' + sha('docs/rapports/etape2-A2-05-bilan-volet2.md').slice(0, 16) + '…`), avec l\'en-tête réel de leur table (le même pour toute une série, vérifié) ; aucune n\'est appliquée.', '',
  '**Volet 1, lot 1** (provenance des sens) :', '', ...table(lignes.filter((l) => l.startsWith('| V1-'))), '',
  '**Volet 1, lot 2** (provenance des nuances et des particules) :', '', ...table(lignes.filter((l) => l.startsWith('| V2-'))), '',
  '**Volet 2, modification 6** :', '', ...table(mod6), '',
  '**Entrée de l\'audit des `null`** (`docs/rapports/etape2-A2-05-audit-null.md`), seul verdict C de E3 :', '', ...AUD.slice(i0, i1).map((l) => l.replace(/^#### /, '##### ')), '',
  '# Partie 3 · Les 45 fiches sources complètes, les ENTRY publiées et leurs décisions', '', txt(O + 'fiches-E3.md').replace(/^# .*\n/, ''), '',
  '# Partie 4 · `analyse-E3.json`', '', clot(txt(O + 'analyse-E3.json'), 'json'), '',
  '# Partie 5 · Sorties (rédaction, code 0 ; sabotages) et sources des scripts', '', clot(txt(O + 'sortie-redaction-E3.txt'), 'text'), '', clot(sab, 'text'), '', clot(txt(O + 'rediger-rapport-E3.mjs'), 'js'), '', clot(txt(O + 'essayer-sabotages-E3.mjs'), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n') + '\n') + ' octets');
