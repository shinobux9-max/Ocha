// A2-05 · volet 1 · lot 3 : préparation de la formalisation documentaire de la consolidation de T4, EN PROPOSITION : aucun document réel n'est modifié.
// Usage : node a2-05-travail/arbitrage-T4/preparer-formalisation-T4.mjs <racine du dépôt>
// (1) Construit en mémoire, par remplacements ciblés (chaque ancre présente exactement une fois), les versions proposées de ETAT-ACTUEL.md et de
// ROADMAP.md (rubrique « Proposé, non validé », « Prochaine action » ; journal, ETAT-ACTUEL.md seul), du bilan du volet 2 (§8.92 ajouté à la fin)
// et de l'inventaire des scripts (ligne de controle-bilan-pilote.mjs ; lignes des scripts de T4 non inventoriés) ; fins de ligne conservées.
// (2) Les écrit, avec les différences exactes, dans arbitrage-T4/formalisation/ (refus si le dossier existe). (3) Les essaie dans un clone git
// jetable (--shared, --no-checkout) recouvert d'une copie de l'arbre de travail : relais --apres-application 30 sur 30, aperçu de synchronisation
// vide, 35 empreintes identiques, contrôle du bilan du pilote conforme, couverture inchangée. (4) Vérifie que le dépôt réel est inchangé.
// Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T4/formalisation';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = 'a2-05-travail/INVENTAIRE-SCRIPTS.md';
const DOCS = [ETAT, ROAD, BIL, INV];
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const avant = Object.fromEntries([...DOCS, 'a2-05-travail/empreintes-rapports-arbitres.json'].map((p) => [p, sha(join(root, p))]));
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');

// Remplacement ciblé : l'ancre doit figurer exactement une fois
const remplacer = (t, doc, ancre, nouveau) => {
  const n = t.split(ancre).length - 1; if (n !== 1) arret(doc + ' : ancre présente ' + n + ' fois : ' + ancre.slice(0, 80) + '…');
  return t.replace(ancre, () => nouveau);
};

// (a) Rubriques d'ETAT-ACTUEL.md et de ROADMAP.md, à l'identique
const A_AUDIT = '**audit des 35 sens de T4 livré en proposition, non arbitré** (`docs/rapports/etape2-A2-05-volet1-lot3-T4.md` : 26 conformes, 9 écarts, tous sur des tags de lieu ; V1-15 à V1-23 proposées, non retenues ; bilan du volet 2, §8.90)';
const N_AUDIT = A_AUDIT + ' ; **module `sync-stable.mjs` remplacé le 2026-10-24**, sur autorisation, par la version qui lit et confronte les identifiants réservés (`f566510836aa…` → `75b686d2a145…` ; départ sauvegardé dans `a2-05-travail/arbitrage-T4/depart/`) ; **T4 arbitrée le 2026-10-24** (`docs/rapports/etape2-A2-05-volet1-lot3-T4.md`, §0, inscrit par le module v2 le 2026-10-25, proposition conservée : 28 conformes, 7 écarts ; **V1-15 à V1-21 retenues**, non appliquées : retraits de tags de lieu de 果物, 鍵, お茶, お酒, 紅茶, 飲み物 et 水, `lieu_restaurant` conservé pour お茶, 紅茶 et 水 ; お風呂 et ベッド conformes avec réserve documentaire, `lieu_hotel` conservé ; **V1-22 et V1-23 non retenues, identifiants définitivement réservés** ; prochain identifiant V1-24 ; bilan du volet 2, §8.91) ; **contrôle du bilan du pilote adapté à l\'arbitrage de T4 le 2026-10-25**, sur autorisation (`7cd28d5d…` → `de5dfa89…` ; §0 de T4 comparé champ par champ à sa référence approuvée, `a2-05-travail/arbitrage-T4/reference-s0-T4.json` ; 19 sabotages sur 19) ; **rapport arbitré de T4 ajouté au manifeste le 2026-10-25**, sur autorisation (`--ajouter` une fois : 35 entrées, les 34 précédentes inchangées) ; **bloc d\'état synchronisé le 2026-10-25**, sur autorisation (plan `2619cb6300ef2de9` ; aperçu suivant vide) ; **relais 30 sur 30** ; **consolidation technique de T4 achevée**, en attente de relecture avant sa clôture définitive (bilan du volet 2, §8.92)';
const A_PA = /^- \*\*Prochaine action\.\*\* La relecture de l'audit des 35 sens de T4 [^\r\n]*/m;
const N_PA = '- **Prochaine action.** La relecture de la consolidation technique de T4 (bilan du volet 2, §8.92 ; `docs/rapports/etape2-A2-05-volet1-lot3-T4.md`, arbitré) et sa clôture définitive ; puis, chacun sur autorisation distincte : le périmètre opérationnel de T5 (D2, D3), préparé seulement après la clôture de T4 ; le statut de T1 et de T2 dans `registre-tranches.json`, sur arbitrage distinct ; la décision sur le défaut « RES » de T9, à part ; la correction retenue en principe de `tools/export-relecture.mjs` (A2-GLOBAL-v1), sur autorisation distincte ; l\'arbitrage normatif distinct de la proposition d\'addendum. Aucune correction lexicale n\'est appliquée. Aucun `git add`, commit ni push sans autorisations distinctes.';
const rubriques = (t, doc) => {
  t = remplacer(t, doc, A_AUDIT, N_AUDIT);
  const m = t.match(new RegExp(A_PA.source, 'gm')) ?? []; if (m.length !== 1) arret(doc + ' : « Prochaine action » présente ' + m.length + ' fois');
  return t.replace(A_PA, () => N_PA);
};

// (b) Journal d'ETAT-ACTUEL.md : deux lignes ajoutées après la dernière ligne du tableau
const J1 = '| 2026-10-24 | 2 · A2-05 | **T4 arbitrée** (ChatGPT, par délégation) : **28 conformes, 7 écarts**, contre 26 et 9 proposés ; **V1-15 à V1-21 retenues**, non appliquées (retraits de tags de lieu de 果物, 鍵, お茶, お酒, 紅茶, 飲み物, 水 ; `lieu_restaurant` conservé pour お茶, 紅茶, 水) ; お風呂 et ベッド : écarts proposés non retenus, `lieu_hotel` conservé avec réserve documentaire (D0258 et D0254, décisions d\'autres ENTRY, ni réattribuées ni comptées). **Numérotation, lecture B** : V1-22 et V1-23 définitivement réservés, prochain identifiant V1-24. **`sync-stable.mjs` remplacé**, sur autorisation, par la version qui lit et confronte les réservations (`f566510836aa…` → `75b686d2a145…`) : diff réel identique au diff relu, départ sauvegardé ; E0 corrigé dans le harnais seul ; 37 contrôles de la préparation conformes ; état réel inchangé (217/377, V1-15, aucune réservation) ; relais 30 sur 30. Bilan du volet 2, §8.91 et §8.92. **217/377 ; bloc B 148/148 ; 189 corrections dans 169 ENTRY, non appliquées ; V1-15 libre ; 34 empreintes.** | non committé |';
const J2 = '| 2026-10-25 | 2 · A2-05 | **Arbitrage de T4 inscrit**, sur autorisation (`a2-05-travail/arbitrage-T4/inscrire.mjs`) : statut et §0 (17 lignes) du rapport, §1 et 35 fiches inchangés, proposition conservée et sauvegardée (`2e3fcff61bef…`) ; §8.91 du bilan (V1-15 à V1-21 ; tableau des réservations V1-22, V1-23) ; fragments chiffrés d\'`ETAT-ACTUEL.md` et de `ROADMAP.md` ; relais 28 sur 30 (C9a, C8, attendus). **Contrôle du bilan du pilote adapté**, sur autorisation (`7cd28d5d…` → `de5dfa89…` ; diff réel identique au diff relu ; départ sauvegardé, `arbitrage-T4/depart/controle-bilan-pilote-avant-T4.mjs`) : deux écarts attendus avant l\'ajout. **Rapport arbitré de T4 au manifeste**, sur autorisation : `--ajouter` une fois, **35 entrées**, les 34 précédentes inchangées ; second `--ajouter` refusé ; contrôle adapté conforme ; 19 sabotages sur 19 ; relais 29 sur 30 (C8 seul). **Bloc d\'état synchronisé**, sur autorisation (plan `2619cb6300ef2de9`, identique à l\'aperçu relu ; 4 lignes par document ; aperçu suivant vide) ; relais **30 sur 30**. « Prochaine action » actualisée à l\'identique dans `ETAT-ACTUEL.md` et `ROADMAP.md` ; relais figé non réécrit. Assemblage 684, 35, 0 ; 510 tests ; zones protégées, index et `git diff --check` conformes. **Consolidation technique de T4 achevée**, en attente de relecture. T5 non préparée. Bilan du volet 2, §8.92. **252/377 ; bloc B 148/148 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-24 libre ; 35 empreintes.** | non committé |';
const journal = (t) => {
  const eol = t.includes('\r\n') ? '\r\n' : '\n'; const L = t.split(eol);
  let k = L.length - 1; while (k >= 0 && L[k] === '') k--;
  if (!/^\| 2026-10-24 \| 2 · A2-05 \| \*\*Formalisation du renforcement du §0 acceptée et close\*\*/.test(L[k])) arret(ETAT + ' : dernière ligne du journal inattendue');
  L.splice(k + 1, 0, J1, J2); return L.join(eol);
};

// (c) Bilan du volet 2 : §8.92 ajouté à la fin, après §8.91 (aucune ligne de tableau : le comptage des corrections et des réservations ne la lit pas)
const S892 = [
  '### 8.92 Volet 1, lot 3 : `sync-stable.mjs` adapté aux réservations ; arbitrage de T4 inscrit ; contrôle du bilan du pilote adapté ; rapport de T4 au manifeste (35e entrée) ; bloc d\'état synchronisé ; consolidation technique de T4 achevée (2026-10-24 et 2026-10-25)',
  '',
  'Autorisations (ChatGPT, par délégation ; relayées par l\'utilisateur), chacune distincte : le 2026-10-24, le remplacement de `a2-05-travail/sync-stable.mjs` par la version qui lit les réservations, puis l\'inscription de l\'arbitrage de T4 dans le périmètre de la proposition corrigée pour la numérotation ; le 2026-10-25, « **J\'autorise le remplacement ciblé de `a2-05-travail/controle-bilan-pilote.mjs` par `a2-05-travail/arbitrage-T4/proposition-controle-bilan-pilote-T4.mjs`** », puis, sous réserve de la conformité de cette opération, l\'ajout du seul rapport arbitré de T4 au manifeste avec l\'outil existant ; « **Je valide la clôture des deux opérations techniques : contrôle T4 adapté et rapport arbitré ajouté au manifeste.** » ; puis la synchronisation ciblée des blocs `a2-05:etat`, sans formalisation des mentions de pilotage, celle-ci soumise à une autorisation distincte.',
  '',
  '**Module `sync-stable.mjs` (2026-10-24)** : préconditions conformes (module en service `f566510836aa…` ; proposition `75b686d2a145…`, `a2-05-travail/arbitrage-T4/proposition-sync-stable.mjs` ; diff réel identique octet pour octet au diff relu ; exports inchangés, tous les appelants passant par `calculerEtat`) ; départ sauvegardé (`a2-05-travail/arbitrage-T4/depart/sync-stable.mjs`) ; module installé identique à la proposition ; `node --check` code 0. Premier passage : deux écarts, conservés (E0 comparait le module installé à lui-même ; aperçu non vide, « 0 → 35 proposés », reconnu attendu) ; E0 corrigé dans le harnais seul. Vérifications : 37 contrôles de la préparation conformes ; état réel inchangé (217/377, 189 dans 169 ENTRY, V1-15, aucune réservation) ; 34 empreintes ; relais 30 sur 30. Mécanisme : une réservation est déclarée au §0 d\'un rapport arbitré (« V1-n non retenue, identifiant réservé ») et inscrite au tableau des réservations du §8.91 ; `calculerEtat` refuse toute discordance et toute correction retenue qui reprendrait un identifiant réservé.',
  '',
  '**Inscription de l\'arbitrage (2026-10-25)** (`a2-05-travail/arbitrage-T4/inscrire.mjs`) : préconditions conformes (rapport = proposition relue `2e3fcff61bef…` ; module vérifié `75b686d2a145…` ; §8.91 absent ; 34 empreintes) ; préparation relancée, 37 conformes, cinq sorties identiques octet pour octet aux versions relues. Écrits : le rapport de T4 (statut « arbitré le 2026-10-24 » et §0 de 17 lignes ; §1 et 35 fiches d\'examen inchangés) ; sa configuration (constante `ARBITRAGE` d\'`a2-05-travail/audit-v1-lot3-T4.mjs`) ; le §8.91 ; quatre fragments chiffrés dans `ETAT-ACTUEL.md` et dans `ROADMAP.md`. Proposition sauvegardée (`a2-05-travail/arbitrage-T4/proposition-T4.md`). Comptes recalculés : 252/377, 0 proposé, 125 restants ; 196 corrections dans 172 ENTRY ; V1-22 et V1-23 réservés ; V1-24.',
  '',
  '**Contrôle du bilan du pilote adapté (2026-10-25)** : référence structurée du §0 arbitré de T4 tirée du §0 relu (`a2-05-travail/arbitrage-T4/preparer-reference-s0-T4.mjs` ; `a2-05-travail/arbitrage-T4/reference-s0-T4.json`, `d99cb150f924…`, écrite une fois, second `--ecrire` refusé). Empreintes vérifiées avant écriture (en service `7cd28d5d…`, proposition `de5dfa89…`, référence `d99cb150…`) ; diff réel identique octet pour octet au diff relu (68 lignes) ; départ sauvegardé (`a2-05-travail/arbitrage-T4/depart/controle-bilan-pilote-avant-T4.mjs`) ; script installé identique à la proposition ; `node --check` code 0 ; sur l\'état à 34 entrées, **exactement les deux écarts attendus** (rapport de T4 hors du manifeste ; 34 entrées au lieu de 35), code 1. Contrôles historiques conservés à l\'identique ; contrôles nouveaux : rapport de T4 égal à sa proposition hors du statut et du §0 ; §1 d\'origine (35 sens, 26 conformes, 9 écarts proposés, V1-15 à V1-23) et 35 fiches ; §0 identique champ par champ à sa référence ; faits arbitrés (28, 7) confrontés au §1, aux réservations déclarées et au §8.91 ; rapport protégé au manifeste ; 35 empreintes.',
  '',
  '**Rapport arbitré de T4 au manifeste (2026-10-25)** : préalables conformes (34 empreintes identiques ; T4 seul rapport arbitré hors du manifeste ; rapport toujours « 28 conformes, 7 écarts », réservations déclarées, 35 fiches) ; `node a2-05-travail/empreintes-lot3.mjs . --ajouter` une fois, code 0 : **35 entrées**, seul ajout `docs/rapports/etape2-A2-05-volet1-lot3-T4.md` (`e0022e0dd956…`), les 34 précédentes identiques, un ajout daté du 2026-10-25 ; second `--ajouter` refusé, manifeste inchangé ; contrôle adapté **conforme**, code 0 ; **19 sabotages sur 19** détectés sur copie (historiques, rapport de T4, manifeste, §8.91), témoins sains conformes, dépôt réel inchangé.',
  '',
  '**Synchronisation (2026-10-25)** : aperçu relancé sur le dépôt réel, plan `2619cb6300ef2de9`, identique octet pour octet à l\'aperçu relu ; lignes modifiées toutes dans les blocs `a2-05:etat` (`ETAT-ACTUEL.md`, 23 à 25 et 27 ; `ROADMAP.md`, 614 à 616 et 618) : marqueur `658a469b42be8dc2` → `5f5f6cd5f9a5171e` ; 217 → 252 sens arbitrés, 160 → 125 restants, 0 proposé ; 189 dans 169 ENTRY → 196 dans 172 ENTRY ; V1-15 → V1-24 ; 34 → 35 empreintes. `--appliquer --plan 2619cb6300ef2de9`, code 0 ; aperçu suivant vide ; blocs identiques. **Vérifications** : relais **30 sur 30**, code 0 ; 35 empreintes identiques ; contrôle du bilan du pilote conforme ; couverture 252 arbitrés, 0 proposé, 125 restants, bloc B 148/148 ; V1-22 et V1-23 réservés, V1-24 libre ; zones protégées sans modification ; `git diff --check` code 0 ; index vide.',
  '',
  '**États du relais, conservés** : 30 sur 30 après le remplacement du module ; 28 sur 30 après l\'inscription (C9a : rapport arbitré hors du manifeste ; C8 : bloc d\'état non synchronisé) ; 29 sur 30 après l\'ajout du rapport (C8 seul) ; 30 sur 30 après la synchronisation. Un lancement du relais sans `--apres-application`, mode d\'avant la mise en service, n\'a rien écrit et ne compte pas. Puis « Prochaine action » et rubrique d\'état actualisées par remplacements ciblés, hors du bloc, et lignes de journal ; relais figé non réécrit.',
  '',
  '**Limites** : (1) le contrôle installé porte encore, en tête, la mention « PROPOSITION (2026-10-25), non appliquée », le fichier devant rester identique à la proposition relue ; (2) les harnais de sabotage ne sont pas versionnés, leurs sources et sorties sont dans les notes d\'export ; (3) la confrontation au §8.91 lit ses lignes exactes ; (4) `registre-tranches.json` porte toujours T1 à T4 « planifiée », ce que le contrôle exige, leur statut relevant d\'un arbitrage distinct.',
  '',
  '**Consolidation technique de T4 achevée** (arbitrage inscrit, V1-15 à V1-21 retenues et non appliquées, V1-22 et V1-23 réservés, périmètre et rapport au manifeste, contrôle du bilan du pilote adapté, bloc synchronisé), **en attente de relecture avant sa clôture définitive** ; T5 n\'est pas préparée. Aucune des corrections retenues n\'est appliquée ; aucun `git add`, commit ni push.',
];
const bilan = (t) => {
  if (!/^### 8\.91 /m.test(t) || /^### 8\.92 /m.test(t)) arret(BIL + ' : §8.91 absent ou §8.92 déjà présent');
  const eol = t.includes('\r\n') ? '\r\n' : '\n'; const base = t.replace(/(\r?\n)+$/, '');
  return base + eol + eol + S892.join(eol) + eol;
};

// (d) Inventaire des scripts
const A_INV1 = 'périmètre de T4 accepté (fait historique sur la proposition sauvegardée), protégé au manifeste sans rapport d\'audit ; condition du registre ; 34 empreintes |';
const N_INV1 = 'périmètre de T4 accepté (fait historique sur la proposition sauvegardée), protégé au manifeste ; rapport de T4 arbitré : égal à sa proposition hors du statut et du §0, §1 et 35 fiches d\'origine, §0 identique champ par champ à sa référence approuvée (`arbitrage-T4/reference-s0-T4.json`), faits arbitrés confrontés au §1, aux réservations déclarées et au §8.91, protégé au manifeste ; condition du registre ; 35 empreintes |';
const A_INV2 = 'conforme, 17 sabotages sur 17 ; adaptée à l\'état d\'avant l\'audit de T4 |';
const N_INV2 = 'conforme, 17 sabotages sur 17 ; adaptée à l\'état d\'avant l\'audit de T4 ; remplacée le 2026-10-25 par la version adaptée à l\'arbitrage de T4 (`de5dfa89…` ; version remplacée sauvegardée dans `arbitrage-T4/depart/controle-bilan-pilote-avant-T4.mjs`) : 2 écarts attendus sur l\'état à 34 entrées, puis conforme après l\'ajout de la 35e entrée ; 19 sabotages sur 19 |';
const A_INV3 = /^\| `audit-v1-lot3-T4\.mjs` \|[^\r\n]*/m;
const LIGNES_INV = [
  '| `audit-v1-lot3-T4.mjs`, arbitrage du 2026-10-24 | constante `ARBITRAGE` renseignée (28 conformes, 7 écarts ; V1-15 à V1-21 retenues ; V1-22 et V1-23 non retenues, identifiants réservés) ; écrite par `arbitrage-T4/inscrire.mjs` | `docs/rapports/etape2-A2-05-volet1-lot3-T4.md` (statut et §0) | rapport arbitré `e0022e0dd956…` ; seuls le statut et le §0 diffèrent de `arbitrage-T4/proposition-T4.md` |',
  '| `arbitrage-T4/proposition-sync-stable.mjs` | `sync-stable.mjs` proposé : lecture du tableau des réservations du bilan et des déclarations du §0 des rapports arbitrés, refus de toute discordance et de toute réattribution ; **appliqué le 2026-10-24** (`75b686d2a145…` ; départ `arbitrage-T4/depart/sync-stable.mjs`, `f566510836aa…`) | — (proposition) | essais : 37 contrôles conformes (E0 corrigé dans le harnais seul) ; module installé : plan `2619cb6300ef2de9` appliqué le 2026-10-25, aperçu suivant vide |',
  '| `arbitrage-T4/preparer-inscription-T4.mjs` | préparation de l\'inscription de l\'arbitrage de T4, dans une copie temporaire : rapport régénéré par le module v2 (constante `ARBITRAGE`), identique à la proposition hors du statut et du §0 ; §8.91 ; fragments chiffrés ; comptes recalculés par les outils réels ; sabotages ; dépôt réel inchangé | aperçus dans un dossier de sortie hors du dépôt | plusieurs lancements, écarts et corrections consignés dans les notes d\'export du cycle de T4 ; avant l\'inscription : 37 conformes, code 0 |',
  '| `arbitrage-T4/inscrire.mjs` | inscription de l\'arbitrage de T4 : préconditions sur le dépôt réel ; `preparer-inscription-T4.mjs` relancé ; cinq sorties identiques aux versions relues ; sinon arrêt sans écriture ; proposition sauvegardée | rapport de T4 (statut et §0), `audit-v1-lot3-T4.mjs` (`ARBITRAGE`), bilan du volet 2 (§8.91), `ETAT-ACTUEL.md`, `ROADMAP.md` ; `arbitrage-T4/proposition-T4.md` | lancé le 2026-10-25, code 0 |',
  '| `arbitrage-T4/preparer-reference-s0-T4.mjs` | référence structurée du §0 arbitré de T4, tirée du §0 relu (note d\'export de la numérotation, Partie 2) ; sans option : comparaison au §0 réel, champ par champ ; `--ecrire` : écrit la seule référence (refus si elle existe) | `arbitrage-T4/reference-s0-T4.json` (sur option) | lancé le 2026-10-25 : conforme, code 0 ; `--ecrire` une fois (`d99cb150…`) ; second refusé, code 1 |',
  '| `arbitrage-T4/proposition-controle-bilan-pilote-T4.mjs` | adaptation du contrôle du bilan du pilote à l\'arbitrage de T4 et à la 35e entrée du manifeste, **appliquée le 2026-10-25** (`de5dfa89…`) | — (lecture seule) | lancé le 2026-10-25 : 2 écarts attendus sur l\'état à 34 entrées, conforme sur copie à 35 entrées ; 19 sabotages sur 19 (proposition, puis script installé) |',
  '| `arbitrage-T4/preparer-formalisation-T4.mjs` | préparation de la formalisation de la consolidation de T4, sans application : versions proposées d\'`ETAT-ACTUEL.md`, de `ROADMAP.md`, du bilan du volet 2 et de cet inventaire, par remplacements ciblés ; essai dans un clone git jetable ; dépôt réel inchangé | `arbitrage-T4/formalisation/` (versions proposées et différences) | lancé le 2026-10-25 (note d\'export de la synchronisation) |',
];
const inventaire = (t) => {
  t = remplacer(t, INV, A_INV1, N_INV1); t = remplacer(t, INV, A_INV2, N_INV2);
  const eol = t.includes('\r\n') ? '\r\n' : '\n'; const m = t.match(new RegExp(A_INV3.source, 'gm')) ?? [];
  if (m.length !== 1) arret(INV + ' : ligne de audit-v1-lot3-T4.mjs présente ' + m.length + ' fois');
  return t.replace(A_INV3, (l) => [l, ...LIGNES_INV].join(eol));
};

// (1)-(2) Versions proposées et différences
const lire = (p) => readFileSync(join(root, p), 'utf8');
const prop = { [ETAT]: journal(rubriques(lire(ETAT), ETAT)), [ROAD]: rubriques(lire(ROAD), ROAD), [BIL]: bilan(lire(BIL)), [INV]: inventaire(lire(INV)) };
mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
for (const p of DOCS) {
  const nom = p.split('/').pop(); writeFileSync(join(root, OUT, nom), prop[p]);
  const d = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + '/' + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  writeFileSync(join(root, OUT, 'diffs', nom + '.diff'), d.stdout);
  const plus = d.stdout.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++')).length, moins = d.stdout.split('\n').filter((l) => l.startsWith('-') && !l.startsWith('---')).length;
  ok(d.status === 1 && (prop[p].includes('\r\n') === lire(p).includes('\r\n')), 'proposé : ' + p, '+' + plus + ' / -' + moins + ' lignes ; fins de ligne ' + (lire(p).includes('\r\n') ? 'CRLF' : 'LF') + ' conservées ; ' + createHash('sha256').update(prop[p]).digest('hex').slice(0, 12) + '…');
}
const pa = (t) => (t.match(/^- \*\*Prochaine action\.\*\*[^\r\n]*/m) ?? [''])[0];
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]) === N_PA, '« Prochaine action » identique dans les deux documents proposés');
const seg = (t, a, b) => t.slice(t.indexOf(a), t.indexOf(b)).replace(/\r/g, '');
ok(seg(prop[ETAT], '- **Terminé et arbitré.**', '- **Prochaine action.**') === seg(prop[ROAD], '- **Terminé et arbitré.**', '- **Prochaine action.**'), 'rubriques « Terminé et arbitré » à « Reste à faire » identiques dans les deux documents proposés');
ok(!S892.some((l) => /^\| /.test(l)), '§8.92 : aucune ligne de tableau (comptage des corrections et des réservations inchangé)');

// (3) Essai dans un clone git jetable recouvert de l'arbre de travail
const tmp = mkdtempSync(join(tmpdir(), 'ocha-formalisation-t4-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' });
spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
for (const p of DOCS) writeFileSync(join(C, p), prop[p]);
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: (r.stdout ?? '') + (r.stderr ?? '') }; };
ok(cl.status === 0 && spawnSync('git', ['rev-parse', 'HEAD'], { cwd: C, encoding: 'utf8' }).stdout.trim() === spawnSync('git', ['rev-parse', 'origin/ocha-v2'], { cwd: C, encoding: 'utf8' }).stdout.trim(), 'clone jetable : HEAD = origin/ocha-v2', 'clone code ' + cl.status);
const rel = lancer('a2-05-travail/controle-relais-allege.mjs', '--apres-application');
ok(rel.code === 0 && /30 conformes sur 30/.test(rel.out), 'essai : relais --apres-application', rel.out.trim().split('\n').pop() + ' ; ' + (rel.out.split('\n').filter((l) => /^ÉCART|FAUX/.test(l.trim())).join(' | ') || 'aucun écart'));
const ap = lancer('a2-05-travail/sync-stable.mjs', '--apercu'); const apt = readFileSync(join(C, 'a2-05-travail/sync-stable-apercu.md'), 'utf8');
ok(ap.code === 0 && !/^@@/m.test(apt), 'essai : aperçu de synchronisation vide', ap.out.trim());
const em = lancer('a2-05-travail/empreintes-lot3.mjs'); ok(em.code === 0 && /35 rapports contrôlés, identiques$/.test(em.out.trim()), 'essai : manifeste', em.out.trim());
const cb = lancer('a2-05-travail/controle-bilan-pilote.mjs'); ok(cb.code === 0 && /contrôle conforme$/.test(cb.out.trim()), 'essai : contrôle du bilan du pilote', cb.out.trim().split('\n').pop());
const cv = lancer('a2-05-travail/couverture-lot3.mjs'); ok(cv.code === 0 && /252 arbitrés, 0 proposés, 125 restants, sur 377 ; bloc B : 148\/148/.test(cv.out), 'essai : couverture', cv.out.trim().slice(0, 90));
rmSync(tmp, { recursive: true, force: true });

// (4) Dépôt réel inchangé
const ch = Object.keys(avant).filter((p) => sha(join(root, p)) !== avant[p]);
ok(ch.length === 0, 'dépôt réel inchangé (documents de pilotage, bilan, inventaire, manifeste)', ch.join(', ') || 'aucune modification');
console.log(ko ? ko + ' écart(s)' : 'préparation conforme');
process.exit(ko ? 1 : 0);
