// A2-05 · volet 1 · lot 3 : préparation de la consignation documentaire des états E2, E3 et E4 de la consolidation de T7 (E4 appliqué le
// 2026-10-30), EN PROPOSITION : aucun document réel n'est modifié (consigne du 2026-10-30 : « Après E4, préparer sans l'appliquer la
// consignation documentaire d'E2, E3 et E4 »). Dérivé de arbitrage-T6/consignation-T6/preparer-consignation-T6.mjs.
// Usage : node a2-05-travail/arbitrage-T7/consignation-E2-E4/preparer-consignation-E2-E4.mjs <racine du dépôt>
// (1) Versions proposées, par remplacements ciblés (chaque ancre présente exactement une fois) : ETAT-ACTUEL.md et ROADMAP.md (rubrique d'état
// courant : fin de la mention du périmètre de T7 ; début de « Prochaine action », à l'identique) ; journal (ETAT-ACTUEL.md seul, une ligne
// nouvelle à la fin ; les lignes déjà écrites ne sont pas modifiées) ; bilan du volet 2 (§8.103 ajouté à la fin ; §8.102 et texte antérieur
// inchangés) ; inventaire des scripts (fin de trois lignes complétée : perimetre-T7.mjs, recalcul-T7-perimetre.mjs,
// preparer-consolidation-T7.mjs ; sept lignes après celle de arbitrage-T7/proposition-T7-perimetre.md). Aucune ligne des blocs a2-05:etat.
// Fins de ligne conservées.
// (2) Écriture dans arbitrage-T7/consignation-E2-E4/ (refus si les versions existent), avec les différences exactes (document réel → proposé).
// (3) Essai dans un clone git jetable recouvert de l'arbre de travail : contrôles ; aperçu de synchronisation vide ; blocs identiques ;
// git diff --check. (4) Dépôt réel inchangé. Code 1 au premier écart ; chemins masqués.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T7/consignation-E2-E4', PLAN = 'd57d97c1e89f746e', MARQ = '32631bf599ee77a2';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = 'a2-05-travail/INVENTAIRE-SCRIPTS.md';
const DOCS = [ETAT, ROAD, BIL, INV];
// Documents de départ : état après E4 (ETAT-ACTUEL.md et ROADMAP.md synchronisés ; bilan et inventaire à leur état E1)
const DEPART = { [ETAT]: '82306cf263c05638', [ROAD]: 'b01d9d9bb68aef33', [BIL]: 'ee6f63e4afebf19d', [INV]: '1ee4d3950f601394' };
const tmp = mkdtempSync(join(tmpdir(), 'ocha-consignation-E2-E4-')); const C = join(tmp, 'essai');
const masquer = (l) => [[root, '<racine>'], [C, '<clone>'], [tmpdir(), '<temp>']].reduce((t, [p, n]) => [p, p.replace(/\\/g, '\\\\'), p.replace(/\\/g, '/')].reduce((u, v) => u.split(v).join(n), t), l);
const log = []; const dire = (l) => { l = masquer(l); console.log(l); log.push(l); };
const fin = (code) => { rmSync(tmp, { recursive: true, force: true }); if (existsSync(join(root, OUT))) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), log.join('\n') + '\n'); process.exit(code); };
const shaF = (p) => createHash('sha256').update(readFileSync(p)).digest('hex'); const shaT = (t) => createHash('sha256').update(t).digest('hex');
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) { dire('\narrêt au premier écart'); fin(1); } };
const arret = (m) => { dire('ARRÊT : ' + m); fin(1); };
const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT + '/') continue;
  if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = shaF(join(root, p)); } }; marcher(''); return h; };
const reel0 = instantane();
if (DOCS.some((p) => existsSync(join(root, OUT, p.split('/').pop())))) arret(OUT + ' : versions proposées déjà écrites');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const remplacer = (t, doc, ancre, nouveau) => { const n = t.split(ancre).length - 1; if (n !== 1) arret(doc + ' : ancre présente ' + n + ' fois : ' + ancre.slice(0, 80) + '…'); return t.replace(ancre, () => nouveau); };
for (const p of DOCS) ok(reel0[p].startsWith(DEPART[p]), 'départ : ' + p + ' à son empreinte après E4', DEPART[p] + '…');

// (a) Rubrique d'état courant et « Prochaine action », à l'identique dans ETAT-ACTUEL.md et ROADMAP.md
const A_RUB = "; hors du manifeste, ajout non autorisé) ; audit des 24 sens non autorisé (bilan du volet 2, §8.102)";
const N_RUB = "; **protégé au manifeste le 2026-10-30 (40e entrée)**, après l'installation du recalcul de T7 adapté, et bloc d'état synchronisé (consolidation appliquée en quatre états, E1 à E4, chacun sur autorisation distincte)) ; audit des 24 sens non autorisé (bilan du volet 2, §8.102 et §8.103)";
const A_PA = "- **Prochaine action.** L'intégration du périmètre accepté de T7 au manifeste (40e entrée ; `docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md`), sur autorisation distincte, avec l'adaptation préalable du recalcul de T7, qui exige ce périmètre hors du manifeste (préparée le 2026-10-29) ; puis la synchronisation du bloc d'état ; puis l'audit individuel des 24 sens de T7, sur autorisation distincte, dans les frontières du §0 du périmètre ; puis, chacun sur autorisation distincte :";
const N_PA = "- **Prochaine action.** L'audit individuel des 24 sens de T7, sur autorisation distincte, dans les frontières du §0 du périmètre (`docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md`), le périmètre accepté étant protégé au manifeste (40e entrée) et le bloc d'état synchronisé (bilan du volet 2, §8.103) ; puis, chacun sur autorisation distincte :";
const rubriques = (t, doc) => remplacer(remplacer(t, doc, A_RUB, N_RUB), doc, A_PA, N_PA);

// (b) Journal d'ETAT-ACTUEL.md : une ligne nouvelle après la dernière ligne du tableau, qui reste inchangée
const J = [
  "| 2026-10-30 | 2 · A2-05 | **Consolidation du périmètre de T7 appliquée en quatre états, chacun sur autorisation distincte** (ChatGPT, par délégation), chaque script essayé sur une copie jetable avant son lancement unique sur le dépôt réel, sauf celui d'E2. **E1** (appliqué le 2026-10-29, accepté le 2026-10-30) : six documents de la consolidation et proposition sauvegardée (`a2-05-travail/arbitrage-T7/application-E1/appliquer-E1.mjs`, code 0). **E2** : recalcul de T7 adapté installé (`a2-05-travail/arbitrage-T7/application-E2/appliquer-E2.mjs`, code 0 ; `4c990f02…` → `c8877283…`, version initiale sauvegardée ; diff réel aux hunks du diff approuvé ; 25 conformes et un seul écart, attendu, la 40e entrée ; relais 29 sur 30, C9a seul). **E3** (`…/application-E3/appliquer-E3.mjs`, code 0, 56 vérifications) : ajout prévisualisé dans un clone jetable, puis `empreintes-lot3.mjs --ajouter` une fois : **40 entrées**, les 39 précédentes inchangées en valeur et en ordre, la 40e le périmètre accepté de T7 (`a93a75cc…`), un ajout daté du 2026-10-30 ; manifeste `f5b5be5c…`, identique octet pour octet au manifeste prévu relu ; recalcul de T7 26 sur 26 ; relais 30 sur 30. **E4** (`…/application-E4/appliquer-E4.mjs`, code 0) : aperçu identique octet pour octet à l'aperçu relu ; `sync-stable.mjs --appliquer --plan " + PLAN + "` une fois ; deux lignes changées par document, dans les seuls blocs `a2-05:etat` (marqueur `7a79b16e4641f93f` → `" + MARQ + "` ; « 39 » → « 40 rapports arbitrés identiques ») ; aperçu suivant vide ; blocs identiques. Après chaque état : contrôles conformes (pilote 46 sur 46 ; recalculs de T5 17 sur 17 et de T6 27 sur 27), arbre de travail limité aux fichiers prévus, index vide, `git diff --check` code 0. Audit des 24 sens non autorisé. Bilan du volet 2, §8.103. **296/377 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-24 libre ; 40 empreintes ; bloc d'état synchronisé.** | non committé |",
];
const journal = (t) => { const eol = t.includes('\r\n') ? '\r\n' : '\n'; const L = t.split(eol); let k = L.length - 1; while (k >= 0 && L[k] === '') k--; if (!/^\| 2026-10-29 \| 2 · A2-05 \| \*\*T6 close\*\*/.test(L[k])) arret(ETAT + ' : dernière ligne du journal inattendue'); L.splice(k + 1, 0, ...J); return L.join(eol); };

// (c) Bilan du volet 2 : §8.103, ajouté à la fin, après §8.102, qui n'est pas modifié (aucune ligne de tableau)
const S8103 = [
  "### 8.103 Volet 1, lot 3 : consolidation du périmètre de T7 appliquée (E1 à E4) : recalcul de T7 adapté installé, périmètre accepté au manifeste (40e entrée), bloc d'état synchronisé (2026-10-29 et 2026-10-30)",
  "",
  "Décisions (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : « **J'accepte les propositions documentaires sans modification et autorise l'application de l'état E1 uniquement.** » (2026-10-29) ; « **J'accepte E1 et autorise uniquement E2 : l'installation du recalcul T7 adapté déjà relu.** » ; « **J'accepte E2 et autorise exclusivement E3 : l'ajout du périmètre accepté T7 comme 40e entrée du manifeste.** » ; « **J'accepte E3 et j'autorise exclusivement l'application du plan de synchronisation E4 `" + PLAN + "`.** » (2026-10-30) ; la préparation, sans application, de la présente consignation.",
  "",
  "**E1 (2026-10-29)** (`a2-05-travail/arbitrage-T7/application-E1/appliquer-E1.mjs`, `5ae5b372…`, lancé une fois, code 0, 86 vérifications conformes) : six documents de la consolidation relue (configuration de T7, rapport de périmètre, `ETAT-ACTUEL.md`, `ROADMAP.md`, §8.102, inventaire) et proposition de T7 sauvegardée ; originaux dans `…/application-E1/depart/`. Les textes alors installés décrivaient l'état après E1 : ils ne sont pas modifiés, la suite étant consignée ici.",
  "",
  "**E2 (2026-10-30)** (`…/application-E2/appliquer-E2.mjs`, `c20c5df8…`, lancé une fois, code 0, 39 vérifications conformes ; sans essai préalable sur une copie jetable, l'opération ne remplaçant qu'un fichier) : préconditions conformes (recalcul en service `4c990f02…` ; version relue `c8877283e3864a7e9c9f542a08e74b189aef3c6f4b9e9bfc0abf01e7b75eb91c` et diff approuvé `5f5091ab…` ; diff régénéré identique octet pour octet ; état E1 intact ; 39 empreintes ; relais 29 sur 30, C9a seul ; aperçu vide ; index vide) ; script de départ sauvegardé (`…/application-E2/depart/`) ; `a2-05-travail/recalcul-T7-perimetre.mjs` remplacé par la version relue, identique octet pour octet, `node --check` code 0 ; diff réel aux hunks identiques au diff approuvé. Après : recalcul de T7 à 25 conformes et un seul écart, attendu (40e entrée manquante) ; recalculs de T5 17 sur 17 et de T6 27 sur 27 ; pilote 46 sur 46 ; relais 29 sur 30, C9a seul ; 39 empreintes ; aperçu vide ; seul le recalcul changé.",
  "",
  "**Préparation d'E3 (2026-10-30)** (`…/preparation-E3/preparer-E3.mjs`, `1fc08d39…`, code 0, dans un clone jetable) : manifeste prévu `f5b5be5c…` (40 entrées ; valable pour un ajout daté du 2026-10-30 seulement), diff +8/−1, ordre des empreintes, contrôles prévus après E3, aperçu prévu (`726eb5d7…`, plan `" + PLAN + "`).",
  "",
  "**E3 (2026-10-30)** (`…/application-E3/appliquer-E3.mjs`, `5bcfe933…`, essayé sur une copie jetable, puis lancé une fois sur le dépôt réel, code 0, 56 vérifications conformes) : préconditions conformes (39 empreintes recalculées, dans leur ordre ; périmètre accepté `a93a75cc4da86efeeea667aa357dcd457ac7583311d7fad6ce3a0a68f4cf77dc` et proposition sauvegardée `046c68e4…` intacts ; recalcul installé ; préparation relue intacte ; relais 29 sur 30, C9a seul ; aucune modification non prévue ; index vide) ; ajout prévisualisé dans un clone jetable, daté du jour de l'exécution, le 2026-10-30, identique octet pour octet au manifeste prévu relu ; manifeste de départ sauvegardé (`…/application-E3/depart/`) ; `empreintes-lot3.mjs --ajouter` une fois : manifeste écrit identique à la prévisualisation (`f5b5be5c3418ebd7f85973a3c43ea9f821c7081aee1685937b4dd62db8cb02d1`) ; **40 entrées**, les 39 précédentes intactes en valeur et en ordre, la 40e le périmètre accepté de T7, un seul bloc nouveau dans `ajouts` ; diff réel +8/−1, aux hunks du diff relu. Après : 40 empreintes conformes ; recalcul de T7 26 sur 26 ; T5 17 sur 17 ; T6 27 sur 27 ; pilote 46 sur 46 ; relais 30 sur 30 (C9a résolu) ; seul le manifeste changé ; index vide ; `git diff --check` code 0. L'essai sur copie a révélé un défaut du script (dossier de sortie non créé avant une écriture postérieure à l'ajout), corrigé avant le lancement réel, sans effet sur le dépôt.",
  "",
  "**E4 (2026-10-30)** (`…/application-E4/appliquer-E4.mjs`, `c7b3e8da…`, essayé sur une copie jetable, puis lancé une fois sur le dépôt réel, code 0, 32 vérifications conformes) : préconditions conformes (40 empreintes, les 39 premières dans leur ordre, le périmètre de T7 en 40e ; plan `" + PLAN + "` ; aperçu identique octet pour octet à l'aperçu relu, `726eb5d7…` ; huit lignes +/-, marqueur et compteur seuls ; relais 30 sur 30 ; index vide) ; `ETAT-ACTUEL.md` et `ROADMAP.md` sauvegardés (`…/application-E4/depart/`) ; `node a2-05-travail/sync-stable.mjs . --appliquer --plan " + PLAN + "` une fois, code 0. Après : seules les deux lignes prévues changent dans chaque document (`ETAT-ACTUEL.md`, lignes 23 et 27 ; `ROADMAP.md`, lignes 614 et 618 : marqueur `7a79b16e4641f93f` → `" + MARQ + "` ; « 39 » → « 40 rapports arbitrés identiques »), fins de ligne conservées ; blocs générés identiques ; aperçu suivant vide ; 40 empreintes conformes ; relais 30 sur 30 ; recalcul de T7 26 sur 26 ; T5 17 sur 17 ; T6 27 sur 27 ; pilote 46 sur 46 ; 296/377, 81 restants ; 196 corrections dans 172 ENTRY, aucune appliquée ; V1-22 et V1-23 réservés, V1-24 libre ; 40 rapports protégés ; seuls les deux documents de pilotage et l'aperçu changés ; index vide ; `git diff --check` code 0.",
  "",
  "**Portée** : le §8.102 (« le périmètre accepté n'est pas ajouté au manifeste (39 empreintes) ») et les lignes du journal antérieures décrivent l'état à la date de leur rédaction ; ils ne sont pas modifiés. La rubrique d'état courant et la « Prochaine action » d'`ETAT-ACTUEL.md` et de `ROADMAP.md` sont actualisées à l'identique. Les traces complètes sont dans `a2-05-travail/arbitrage-T7/application-E1/` à `application-E4/` (`sorties/`).",
  "",
  "Audit des 24 sens de T7 non autorisé ; aucune décision lexicale ; registre des tranches non modifié ; T8 non préparée. Décomptes : 296/377, 81 restants ; bloc B 148/148 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 libre ; 40 empreintes ; bloc d'état synchronisé. Aucun `git add`, commit ni push.",
];
const bilan = (t) => { if (!/^### 8\.102 /m.test(t) || /^### 8\.103 /m.test(t)) arret(BIL + ' : §8.102 absent ou §8.103 déjà présent'); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8103.join(eol) + eol; };

// (d) Inventaire des scripts : fin de trois lignes complétée ; sept lignes après celle de arbitrage-T7/proposition-T7-perimetre.md
const FINS = [
  ["`arbitrage-T7/preparer-consolidation-T7.mjs`, appliquée seulement sur autorisation distincte |",
    " ; appliquée le 2026-10-29 (état E1, `arbitrage-T7/application-E1/appliquer-E1.mjs`) |"],
  ["puis 26 sur 26 après l'ajout |",
    " ; installée le 2026-10-30 (état E2, `arbitrage-T7/application-E2/appliquer-E2.mjs` ; version initiale sauvegardée dans `arbitrage-T7/application-E2/depart/`) : 25 conformes et un seul écart à 39 entrées, puis 26 sur 26 après l'ajout de la 40e entrée (E3) |"],
  ["lancé le 2026-10-29 ; consolidation appliquée seulement sur autorisation distincte |",
    " ; états E1 à E4 appliqués le 2026-10-29 (E1) et le 2026-10-30 (E2, E3, E4), chacun sur autorisation distincte (`arbitrage-T7/application-E1/` à `application-E4/`) |"],
];
const A_INV = '| `arbitrage-T7/proposition-T7-perimetre.md` |';
const LIGNES_INV = [
  "| `arbitrage-T7/application-E1/appliquer-E1.mjs` | état E1 de la consolidation de T7 : préconditions (documents de départ, versions proposées et diffs relus à leurs empreintes ; diffs régénérés identiques ; ajouts absents ; hunks à ancre unique ; 39 empreintes ; relais 30 sur 30 ; aperçu vide ; index vide), sauvegarde, hunks relus appliqués par remplacements ciblés, proposition de T7 sauvegardée, contrôles ; chemins de machine masqués | configuration de T7, rapport de périmètre (statut et §0), `ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2 (§8.102), cet inventaire, `arbitrage-T7/proposition-T7-perimetre.md` ; `…/application-E1/depart/`, `…/diffs-reels/`, `…/sorties/` | lancé une fois le 2026-10-29, code 0, 86 vérifications |",
  "| `arbitrage-T7/application-E2/appliquer-E2.mjs` | état E2 : installation du recalcul de T7 adapté relu (préconditions : empreintes complètes du recalcul en service, de la version relue et du diff approuvé ; diff régénéré identique ; état E1 intact ; 39 empreintes ; relais 29 sur 30, C9a ; index vide), sauvegarde, copie, identité octet pour octet, `node --check`, diff réel, contrôles ; arrêt au premier écart, sans réparation | `recalcul-T7-perimetre.mjs` ; `…/application-E2/depart/`, `…/diffs-reels/`, `…/sorties/` | lancé une fois le 2026-10-30, code 0, 39 vérifications ; sans essai préalable sur copie |",
  "| `arbitrage-T7/preparation-E3/preparer-E3.mjs` | préparation de l'ajout de la 40e entrée, sans application : ajout par l'outil réel dans un clone jetable ; manifeste prévu, diff, ordre des empreintes ; contrôles prévus après E3 ; aperçu prévu ; dépôt réel inchangé | `arbitrage-T7/preparation-E3/` (manifeste prévu `f5b5be5c…`, diff, ordre, aperçu prévu, sortie) | lancé une fois le 2026-10-30, code 0, 26 vérifications |",
  "| `arbitrage-T7/application-E3/appliquer-E3.mjs` | état E3 : ajout du périmètre accepté de T7 comme 40e entrée (préconditions : 39 empreintes dans leur ordre, périmètre et proposition intacts, recalcul installé, préparation relue intacte, relais 29 sur 30, aucune modification non prévue, index vide ; prévisualisation dans un clone jetable, datée du jour, comparée au manifeste prévu relu), sauvegarde, `empreintes-lot3.mjs --ajouter` une fois, contrôles, aperçu E4 sans application ; chemins de machine masqués | manifeste (40e entrée, par l'outil réel) ; `…/application-E3/depart/`, `…/diffs-reels/`, `…/sorties/`, `…/ordre-des-empreintes.md` | essayé sur une copie jetable (premier essai : défaut corrigé, sans effet sur le dépôt), puis lancé une fois sur le dépôt réel le 2026-10-30, code 0, 56 vérifications |",
  "| `arbitrage-T7/application-E4/appliquer-E4.mjs` | état E4 : synchronisation du bloc d'état au plan `" + PLAN + "` (préconditions : 40 empreintes, ordre, périmètre de T7 en 40e ; aperçu identique à l'aperçu relu ; huit lignes +/- ; relais 30 sur 30 ; index vide), sauvegarde, `sync-stable.mjs --appliquer` une fois, contrôles (deux lignes par document, aperçu suivant vide, blocs identiques, contrôles en service, identifiants, arbre de travail, index, `git diff --check`) | `ETAT-ACTUEL.md`, `ROADMAP.md` (blocs `a2-05:etat`), aperçu ; `…/application-E4/depart/`, `…/sorties/` | essayé sur une copie jetable, puis lancé une fois sur le dépôt réel le 2026-10-30, code 0, 32 vérifications |",
  "| `arbitrage-T7/application-E1/depart/` à `application-E4/depart/` | originaux sauvegardés avant chaque état (documents d'E1, recalcul initial, manifeste à 39 entrées, documents de pilotage avant E4) | — (sauvegardes) | écrites le 2026-10-29 et le 2026-10-30, avant chaque écriture autorisée |",
  "| `arbitrage-T7/consignation-E2-E4/preparer-consignation-E2-E4.mjs` | préparation de la consignation documentaire d'E2, d'E3 et d'E4, sans application : versions proposées d'`ETAT-ACTUEL.md`, de `ROADMAP.md`, du bilan du volet 2 (§8.103) et de cet inventaire, par remplacements ciblés ; essai dans un clone git jetable ; dépôt réel inchangé | `arbitrage-T7/consignation-E2-E4/` (versions proposées, différences, sortie) | lancé le 2026-10-30 |",
];
const inventaire = (t) => {
  if (/application-E[1-4]\/appliquer|preparation-E3\/preparer|consignation-E2-E4\//.test(t)) arret(INV + ' : lignes déjà présentes');
  if (LIGNES_INV.some((l) => l.split('|').length !== 6) || FINS.some(([, n]) => n.split('|').length !== 2)) arret('ligne de tableau à quatre colonnes attendue');
  for (const [a, n] of FINS) t = remplacer(t, INV, a, a.slice(0, -2) + n);
  const eol = t.includes('\r\n') ? '\r\n' : '\n'; const L = t.split(eol); const k = L.findIndex((l) => l.startsWith(A_INV));
  if (k < 0 || L.filter((l) => l.startsWith(A_INV)).length !== 1) arret(INV + ' : ancre de la ligne de arbitrage-T7/proposition-T7-perimetre.md absente ou multiple');
  L.splice(k + 1, 0, ...LIGNES_INV); return L.join(eol);
};
const consigner = (docs) => ({ [ETAT]: journal(rubriques(docs[ETAT], ETAT)), [ROAD]: rubriques(docs[ROAD], ROAD), [BIL]: bilan(docs[BIL]), [INV]: inventaire(docs[INV]) });

// (1)-(2) Versions proposées et différences
const reel = Object.fromEntries(DOCS.map((p) => [p, lire(p)])); const prop = consigner(reel);
mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
const bloc = (t) => { const s = t.replace(/\r/g, ''); return s.slice(s.indexOf('<!-- a2-05:etat:debut'), s.indexOf('<!-- a2-05:etat:fin -->') + 24); };
for (const p of DOCS) {
  const nom = p.split('/').pop(); writeFileSync(join(root, OUT, nom), prop[p]);
  const d = spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', p, OUT + '/' + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  writeFileSync(join(root, OUT, 'diffs', nom + '.diff'), d.stdout);
  const n = (c) => d.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c + ' ')).length;
  ok(d.status === 1 && prop[p].includes('\r\n') === reel[p].includes('\r\n'), 'proposé : ' + p, '+' + n('+') + ' / -' + n('-') + ' lignes ; fins de ligne ' + (reel[p].includes('\r\n') ? 'CRLF' : 'LF') + ' conservées ; ' + shaT(prop[p]).slice(0, 12) + '… ; diff ' + shaT(d.stdout).slice(0, 12) + '…');
}
ok([ETAT, ROAD].every((p) => bloc(prop[p]) === bloc(reel[p]) && bloc(prop[p]).includes('empreinte=' + MARQ + ' ')), 'blocs a2-05:etat non touchés par la consignation (marqueur ' + MARQ + ')');
const pa = (t) => (t.match(/^- \*\*Prochaine action\.\*\*[^\r\n]*/m) ?? [''])[0];
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]).startsWith(N_PA) && !/L'intégration du périmètre accepté de T7 au manifeste/.test(pa(prop[ETAT])), '« Prochaine action » identique dans les deux documents proposés ; l\'intégration au manifeste n\'y figure plus');
const seg = (t) => t.slice(t.indexOf('- **Terminé et arbitré.**'), t.indexOf('- **Prochaine action.**')).replace(/\r/g, '');
ok(seg(prop[ETAT]) === seg(prop[ROAD]) && seg(prop[ETAT]).includes(N_RUB), 'rubriques « Terminé et arbitré » à « Reste à faire » identiques dans les deux documents proposés, mention du périmètre de T7 actualisée');
ok(prop[ETAT].replace(/\r/g, '').startsWith(reel[ETAT].replace(/\r/g, '').replace(A_RUB, N_RUB).replace(A_PA, N_PA).replace(/\n+$/, '')), 'journal : lignes existantes inchangées ; une ligne ajoutée à la fin');
ok(!S8103.some((l) => /^\| /.test(l)), '§8.103 : aucune ligne de tableau (comptage des corrections et des réservations inchangé)');
ok(prop[BIL].startsWith(reel[BIL].replace(/(\r?\n)+$/, '')), 'bilan : texte existant préfixe exact (§8.102 et antérieurs inchangés)');
const lignesInv = (t) => t.split(/\r?\n/); const ri = lignesInv(reel[INV]), pi = lignesInv(prop[INV]);
ok(pi.length === ri.length + LIGNES_INV.length && ri.filter((l) => !pi.includes(l)).length === FINS.length, 'inventaire : trois lignes complétées à leur fin, sept ajoutées, aucune autre ligne changée');

// (3) Essai dans un clone git jetable
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
for (const p of DOCS) writeFileSync(join(C, p), prop[p]);
const r = { rel: lancer('a2-05-travail/controle-relais-allege.mjs', '--apres-application'), emp: lancer('a2-05-travail/empreintes-lot3.mjs'), cbp: lancer('a2-05-travail/controle-bilan-pilote.mjs'), rec5: lancer('a2-05-travail/recalcul-T5-perimetre.mjs'), rec6: lancer('a2-05-travail/recalcul-T6-perimetre.mjs'), rec7: lancer('a2-05-travail/recalcul-T7-perimetre.mjs'), cov: lancer('a2-05-travail/couverture-lot3.mjs') };
for (const [k, v] of Object.entries(r)) { dire('   essai ' + k + ' (code ' + v.code + ') : ' + v.out.split('\n').pop()); for (const l of v.out.split('\n').filter((x) => /^(ÉCART|\s*FAUX)/.test(x))) dire('      ' + l.trim().slice(0, 240)); }
const q = (n) => (r.rel.out.match(new RegExp('^\\s+juste Q' + n + ' .*→ (.*)$', 'm')) ?? [])[1];
const conformes = (v) => v.out.split('\n').filter((l) => l.startsWith('conforme ')).length;
ok(r.rel.code === 0 && r.rel.out.split('\n').pop() === '30 conformes sur 30', 'essai : relais --apres-application 30 sur 30');
ok(r.emp.code === 0 && r.emp.out === 'empreintes : 40 rapports contrôlés, identiques', 'essai : 40 empreintes conformes');
ok(r.cbp.code === 0 && conformes(r.cbp) === 46 && r.rec5.code === 0 && conformes(r.rec5) === 17 && r.rec6.code === 0 && conformes(r.rec6) === 27 && r.rec7.code === 0 && conformes(r.rec7) === 26, 'essai : contrôle du bilan du pilote 46/46 ; recalculs de T5 17/17, de T6 27/27 et de T7 26/26');
ok(r.cov.code === 0 && /^couverture : 296 arbitrés, 0 proposés, 81 restants, sur 377/.test(r.cov.out) && q(2) === '296/377' && q(4) === '196/172/0' && q(5) === 'V1-24' && q(11) === '40', 'essai : 296/377 ; 196 dans 172 ENTRY, aucune appliquée ; V1-24 libre ; 40 rapports protégés');
const ap = lancer('a2-05-travail/sync-stable.mjs', '--apercu'); const texte = readFileSync(join(C, 'a2-05-travail/sync-stable-apercu.md'), 'utf8');
const lignes = texte.split('\n').filter((l) => /^[-+]/.test(l) && !/^(--- a\/|\+\+\+ b\/)/.test(l));
ok(ap.code === 0 && lignes.length === 0, 'essai : aperçu de synchronisation vide après la consignation (blocs toujours à jour)', ap.out.split('\n').pop());
const chk = spawnSync('git', ['diff', '--check'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'essai : git diff --check (commande de référence)', 'code ' + chk.status);

// (4) Dépôt réel inchangé
const reel1 = instantane(); const ch = [...new Set([...Object.keys(reel0), ...Object.keys(reel1)])].filter((p) => reel0[p] !== reel1[p]);
ok(ch.length === 0, 'dépôt réel inchangé (arbre de travail entier, hors dossier de la consignation)', ch.join(', ') || Object.keys(reel1).length + ' fichiers identiques');
dire('\npréparation conforme');
fin(0);
