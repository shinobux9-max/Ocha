// A2-05 · T9 : préparation de la consignation des opérations A, B1 et B2 et du complément d'inventaire, EN PROPOSITION : versions proposées d'ETAT-ACTUEL.md, de
// ROADMAP.md, du bilan du volet 2 (§8.113) et de l'inventaire, par remplacements ciblés ; essai dans un clone jetable ; dépôt réel inchangé. T9 n'est clôturée par aucun de ces textes.
// Usage : node a2-05-travail/arbitrage-T9/consignation-T9/preparer-consignation-T9.mjs <racine du dépôt>
// Sorties dans consignation-T9/, seulement sans écart ; refus si diffs/ existe. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T = W + 'arbitrage-T9/', OUT = T + 'consignation-T9/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', APERCU = W + 'sync-stable-apercu.md', REG = W + 'registre-tranches.json';
const DEPART = { [ETAT]: 'f59837170b9b6d66e9489a7b53b09c2dd83bb10bef8a95939373ec1a49d04363', [ROAD]: '1c65f0e446ab23ea9e94ae9c1f132e4f31d35ef36eb47971f9e6618c5e147482', [BIL]: '03b107ad5d216003f91643480b430e79c7ec191c6b6135b84567b724874f4d1c', [INV]: 'ee14749cbe6372dd3126e6957fce25b8c8cbaeac44b4643ef62a0a8eca30dfd1' };
const CITES = { // empreintes citées par le §8.113 et l'inventaire, vérifiées sur le dépôt réel
  [T + 'application-A/appliquer-A.mjs']: 'fd21c588', [T + 'application-A/essayer-A.mjs']: 'd4901e74', [T + 'preparation-B1/preparer-B1.mjs']: 'ed105ca6',
  [T + 'application-B1/appliquer-B1.mjs']: 'a5187aa3', [T + 'application-B1/essayer-B1.mjs']: '41835dc8', [T + 'application-B2/appliquer-B2.mjs']: '1e9faae8', [T + 'application-B2/essayer-B2.mjs']: '0fc5fff3',
  'docs/rapports/etape2-A2-05-volet1-lot3-T9.md': '73d4dee6', [T + 'proposition-T9.md']: '986c2439', [W + 'audit-v1-lot3-T9.mjs']: '43700109', [W + 'recalcul-T9-perimetre.mjs']: '46c5134f', [W + 'recalcul-T8-perimetre.mjs']: 'c2d5301b', [W + 'empreintes-rapports-arbitres.json']: '89716587',
};
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const BLOC = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
const sha = (b) => createHash('sha256').update(b).digest('hex');
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const lire = (p) => readFileSync(join(root, p), 'utf8');
const LFs = (t) => t.replace(/\r\n/g, '\n');
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || p.startsWith(OUT)) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
if (existsSync(join(root, OUT, 'diffs'))) { console.log('ARRÊT : ' + OUT + 'diffs existe déjà'); process.exit(1); }

const FRAGMENTS = [
  ["; bilan du volet 2, §8.106 à §8.112) (relais", "; **rapport arbitré de T9 protégé au manifeste le 2026-11-01 (45e entrée)**, recalculs de T8 et de T9 adaptés et installés, bloc d'état synchronisé (étape A, puis B1 et B2, chacune sur autorisation distincte) ; bilan du volet 2, §8.106 à §8.113) (relais"],
  ["La protection du rapport arbitré de T9 (`docs/rapports/etape2-A2-05-volet1-lot3-T9.md`) au manifeste (45e entrée), la synchronisation du bloc d'état et la clôture documentaire de T9, chacune sur autorisation distincte (bilan du volet 2, §8.112) ; puis, chacun sur autorisation distincte :", "La clôture documentaire de T9, sur autorisation distincte, le rapport arbitré (`docs/rapports/etape2-A2-05-volet1-lot3-T9.md`) étant protégé au manifeste (45e entrée) et le bloc d'état synchronisé (bilan du volet 2, §8.113) ; puis, chacun sur autorisation distincte :"],
];
const ANCRE_J = '| 2026-11-01 | 2 · A2-05 | **Audit des 24 sens de T9 livré en proposition, puis T9 arbitrée**';
const LIGNE_J = "| 2026-11-01 | 2 · A2-05 | **Consolidation technique de T9 arbitrée achevée en trois opérations, chacune sur autorisation distincte** (ChatGPT, par délégation), chaque script essayé sur une copie jetable avant son lancement unique sur le dépôt réel : étape A, inscription de l'arbitrage (91 vérifications conformes ; relais 28 sur 30, C8 et C9a ; écarts transitoires des recalculs de T8 et T9) ; B1, recalculs de T8 et T9 installés, 45e entrée (63 ; manifeste `89716587…` ; relais 29 sur 30, C8 seul) ; B2, bloc d'état synchronisé (35 ; plan `c6001f09d6a4672c` ; marqueur `fe4967cf00896f07` ; relais 30 sur 30). T9 n'est pas close ; le bloc F et E5 ne sont pas ouverts. **360/377, 17 restants, tous du bloc F ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 45 empreintes.** | non committé |";
const S8113 = [
  "### 8.113 Volet 1, lot 3 : inscription de T9 appliquée (étape A) ; recalculs installés et rapport arbitré au manifeste (45e entrée, B1) ; bloc d'état synchronisé (B2) ; consolidation technique de T9 arbitrée achevée (2026-11-01)",
  '',
  "Décisions du 2026-11-01 (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : « **J'accepte les huit versions proposées, y compris l'adaptation du recalcul T8, et autorise exclusivement l'application de l'étape A.** » ; « **J'accepte l'étape A et autorise exclusivement l'application de B1 : installation des deux recalculs approuvés et ajout du rapport arbitré T9 comme 45e entrée du manifeste.** » ; « **J'accepte B1 et autorise exclusivement l'application de B2**, au plan `c6001f09d6a4672c`. »",
  '',
  "**Audit** (`a2-05-travail/audit-v1-lot3-T9.mjs`, contrôle indépendant `a2-05-travail/arbitrage-T9/audit/controle-audit-T9.mjs`). Au premier passage, le contrôle indépendant a trouvé une lacune du rapport : « Bientôt » (近く, sens 2) était publié sans figurer aux traductions de la fiche, et le rapport ne le disait pas ; il a été complété avant livraison. Les trois autres écarts de ce passage venaient du contrôle, corrigé, et son exception par mots-clés a été retirée.",
  '',
  "**Préparation de l'inscription** (`a2-05-travail/arbitrage-T9/preparer-inscription-T9.mjs`, sur un clone jetable, 55 contrôles conformes, 22 sabotages sur 22). Premier lancement, code 1 : la précondition P5 ne pouvait pas réussir sur un fragment dont le remplacement est inclus dans le texte d'origine ; aucune sortie écrite ; seul ce test est corrigé, et il reste bloquant. **La simulation a établi que le recalcul de T8 échouait une fois T9 arbitrée**, deux de ses contrôles figeant 41 restants ; son adaptation, +3 / −3, sans contrôle retiré, a été proposée à part et acceptée. Les restants du recalcul de T9 adapté se contrôlent sans compte figé.",
  '',
  "**Étape A** (`a2-05-travail/arbitrage-T9/application-A/appliquer-A.mjs`, `fd21c588…`, essayé sur une copie jetable par `essayer-A.mjs`, `d4901e74…`, sept refus sur sept, puis lancé une fois sur le dépôt réel, code 0, 91 vérifications conformes, dont 49 avant écriture) : les six diffs relus appliqués par remplacements ciblés, chaque diff régénéré étant identique au diff relu ; proposition initiale sauvegardée (`a2-05-travail/arbitrage-T9/proposition-T9.md`, `986c2439…`) ; originaux dans `…/application-A/depart/`. Rapport de T9 `73d4dee6…` ; configuration `43700109…`. Après : 360/377, 17 restants, tous du bloc F ; 204 corrections dans 177 ENTRY, aucune appliquée ; V1-32 libre ; 44 empreintes ; relais 28 sur 30, C8 et C9a ; recalcul de T8 à deux écarts et recalcul de T9 à trois écarts, transitoires, attendus.",
  '',
  "**Préparation de B1** (`…/preparation-B1/preparer-B1.mjs`, `ed105ca6…`, sur une copie jetable, code 0, 39 vérifications conformes, dix sabotages sur dix).",
  '',
  "**B1** (`…/application-B1/appliquer-B1.mjs`, `a5187aa3…`, essayé sur une copie jetable par `essayer-B1.mjs`, `41835dc8…`, dix refus sur dix, dont les dates UTC et locale différentes par un fuseau forcé, puis lancé une fois sur le dépôt réel, code 0, 63 vérifications conformes, dont 27 avant écriture) : prévisualisation sur une copie du dépôt réel ; deux recalculs et manifeste de départ sauvegardés ; `recalcul-T9-perimetre.mjs` `af733154…` → `46c5134f…` et `recalcul-T8-perimetre.mjs` `adb6bbda…` → `c2d5301b…`, chacun contrôlé en code 0 avant l'ajout ; dates UTC et locale concordantes, vérifiées avant toute écriture, puis juste avant l'ajout ; `empreintes-lot3.mjs --ajouter` une fois, ajout daté du 2026-11-01 ; manifeste écrit identique à la prévisualisation (`2c74018e…` → `89716587…`) ; 45 entrées, les 44 précédentes inchangées dans leur ordre, le rapport arbitré de T9 en 45e ; relais 29 sur 30, C8 seul, état intermédiaire attendu.",
  '',
  "**B2** (`…/application-B2/appliquer-B2.mjs`, `1e9faae8…`, essayé sur une copie jetable par `essayer-B2.mjs`, `0fc5fff3…`, six refus sur six, puis lancé une fois sur le dépôt réel, code 0, 35 vérifications conformes, dont 12 avant écriture) : aperçu relancé à l'empreinte complète exigée (`68e5d01b…`) et identique octet pour octet au fichier d'aperçu relu ; plan `c6001f09d6a4672c` ; `ETAT-ACTUEL.md` et `ROADMAP.md` sauvegardés ; `sync-stable.mjs --appliquer` une fois. Marqueur `0e9d7a7423b2ef14` → `fe4967cf00896f07`, 336/377 et 41 restants → 360/377 et 17 restants, 197 corrections dans 172 ENTRY et V1-25 → 204 dans 177 ENTRY et V1-32, 44 → 45 rapports arbitrés identiques ; chaque document égale sa sauvegarde augmentée de ces quatre seuls remplacements, octet pour octet ; blocs identiques ; aperçu suivant vide ; **relais 30 sur 30**.",
  '',
  "**Portée** : le §8.112 (« le rapport arbitré de T9 reste hors du manifeste (44 empreintes) ») et les lignes antérieures du journal décrivent l'état à la date de leur rédaction ; ils ne sont pas modifiés. **Précision sur la ligne de journal de l'inscription** : elle dit « recalculs de T9 et de T8 adaptés » ; à l'étape A, ces recalculs étaient approuvés, non installés : leur installation date de B1. Les rubriques d'état courant et la « Prochaine action » d'`ETAT-ACTUEL.md` et de `ROADMAP.md` sont actualisées à l'identique. L'inventaire reçoit les scripts de l'étape A, de la préparation de B1, de B1, de B2 et de cette préparation, ainsi que l'arbitrage de la configuration et l'adaptation des deux recalculs. `controle-audit-T9.mjs` décrit l'état d'avant l'arbitrage et reste une trace. Les traces complètes sont dans `a2-05-travail/arbitrage-T9/application-A/`, `application-B1/` et `application-B2/` (`sorties/`).",
  '',
  "**Restes signalés, non ouverts** : le statut « planifiée » de T7, de T8 et de T9 dans `registre-tranches.json`, leurs recalculs l'exigeant ; l'état daté de `CLAUDE.md`, §5 ; le défaut de date de `empreintes-lot3.mjs` ; l'arrêt en erreur de `sync-stable.mjs` sur certains états et la date figée de l'en-tête de son aperçu ; S21 de `sabotages-recalcul-T9.mjs` et `correction-comparables/essais.mjs --apres-application`, qui visent l'état d'avant RES.",
  '',
  "**Consolidation technique de T9 arbitrée achevée** ; T9 n'est pas close : sa clôture documentaire définitive relève d'une autorisation distincte. Le bloc F et E5 ne sont pas ouverts ; aucune décision lexicale nouvelle ; registre des tranches non modifié. Décomptes : 360/377, 17 restants, tous du bloc F ; bloc B 148/148 ; 204 corrections dans 177 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-32 libre ; 45 empreintes ; bloc d'état synchronisé. Aucun `git add`, commit ni push.",
];
const ANCRE_I = '| `arbitrage-T9/preparer-inscription-T9.mjs` |';
const LIGNES_I = [
  "| `audit-v1-lot3-T9.mjs`, arbitrage du 2026-11-01 | constante `ARBITRAGE` renseignée (17 conformes, 7 écarts, 0 suspendu ; V1-25 à V1-31 retenues), `43700109…` | statut et §0 du rapport de T9 | appliqué à l'étape A, code 0 |",
  "| `recalcul-T9-perimetre.mjs`, adaptation à l'arbitrage de T9 | sens examinés dans le seul rapport de T9, restants tous du bloc F, sans compte figé ; V1-25 à V1-31 exactes et non appliquées ; rapport arbitré contre sa proposition sauvegardée ; rapport absent du manifeste ou en 45e entrée (`af733154…` → `46c5134f…`) | sortie standard | installé à B1, code 0 |",
  "| `recalcul-T8-perimetre.mjs`, adaptation après T9 | deux contrôles rendus compatibles avec T9 arbitrée, aucun retiré (`adb6bbda…` → `c2d5301b…`) | sortie standard | installé à B1, code 0 |",
  "| `arbitrage-T9/application-A/appliquer-A.mjs` | étape A : préconditions, diffs régénérés identiques aux diffs relus, sauvegarde, six hunks relus par remplacements ciblés, proposition sauvegardée, contrôles (`fd21c588…`) ; `arbitrage-T9/application-A/essayer-A.mjs` (`d4901e74…`) : essai sur copie jetable | six fichiers, `arbitrage-T9/proposition-T9.md`, `…/depart/`, `…/diffs-reels/`, `…/sorties/` | lancé une fois le 2026-11-01, code 0 |",
  "| `arbitrage-T9/preparation-B1/preparer-B1.mjs` | préparation de B1 sur copie jetable, B2 simulée, dix sabotages (`ed105ca6…`) | `…/preparation-B1/sortie/` | lancé le 2026-11-01, code 0 |",
  "| `arbitrage-T9/application-B1/appliquer-B1.mjs` | B1 : préconditions, dont l'accord de la date UTC de l'outil et du jour local, prévisualisation, sauvegarde, installation des deux recalculs, contrôle avant l'ajout, 45e entrée une fois, contrôles, aperçu B2 (`a5187aa3…`) ; `arbitrage-T9/application-B1/essayer-B1.mjs` (`41835dc8…`) : essai sur copie jetable, dates forcées comprises | manifeste, deux recalculs, `…/depart/`, `…/sorties/`, `…/apercu-B2/` | lancé une fois le 2026-11-01, code 0 |",
  "| `arbitrage-T9/application-B2/appliquer-B2.mjs` | B2 : préconditions, aperçu à l'empreinte relue et identique au fichier relu, sauvegarde, `sync-stable.mjs --appliquer` une fois, contrôles, quatre remplacements seuls (`1e9faae8…`) ; `arbitrage-T9/application-B2/essayer-B2.mjs` (`0fc5fff3…`) : essai sur copie jetable | blocs `a2-05:etat`, `…/depart/`, `…/sorties/` | lancé une fois le 2026-11-01, code 0 |",
  "| `arbitrage-T9/consignation-T9/preparer-consignation-T9.mjs` | préparation de cette consignation, sans application : versions proposées d'`ETAT-ACTUEL.md`, de `ROADMAP.md`, du bilan du volet 2 (§8.113) et de cet inventaire ; essai dans un clone jetable | `arbitrage-T9/consignation-T9/` | lancé le 2026-11-01 |",
];
const NOUVEAUX = ['arbitrage-T9/application-A/appliquer-A.mjs', 'arbitrage-T9/application-A/essayer-A.mjs', 'arbitrage-T9/preparation-B1/preparer-B1.mjs', 'arbitrage-T9/application-B1/appliquer-B1.mjs', 'arbitrage-T9/application-B1/essayer-B1.mjs', 'arbitrage-T9/application-B2/appliquer-B2.mjs', 'arbitrage-T9/application-B2/essayer-B2.mjs', 'arbitrage-T9/consignation-T9/preparer-consignation-T9.mjs'];

// Préconditions
for (const [p, h] of Object.entries(DEPART)) ok(sha(readFileSync(join(root, p))) === h, 'P1 empreinte de départ : ' + p, h.slice(0, 12) + '…');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P2 ' + p + ' : deux fragments présents une fois'); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_J)).length === 1, 'P3 ancre du journal, une fois');
ok(!/^### 8\.113 /m.test(lire(BIL)) && /^### 8\.112 /m.test(lire(BIL)) && !S8113.some((l) => /^\| /.test(l)), 'P4 bilan : §8.112 présent, §8.113 absent ; §8.113 sans ligne de tableau');
ok(lire(INV).split('\n').filter((l) => l.startsWith(ANCRE_I)).length === 1 && !NOUVEAUX.some((p) => lire(INV).includes(p)), 'P5 inventaire : ancre présente, huit scripts absents');
const cites = Object.entries(CITES).filter(([p, h]) => !sha(readFileSync(join(root, p))).startsWith(h)).map(([p]) => p); ok(!cites.length, 'P6 empreintes citées conformes au dépôt réel', cites.join(', ') || Object.keys(CITES).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P7 index vide');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// Versions proposées
const pilote = (p, j) => { const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z); if (j) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_J) ? [l, LIGNE_J] : [l])).join('\n'); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const bilan = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8113.join(eol) + eol; })();
const inventaire = (() => { const b = lire(INV); const eol = b.includes('\r\n') ? '\r\n' : '\n'; return b.split(eol).flatMap((l) => (l.startsWith(ANCRE_I) ? [l, ...LIGNES_I] : [l])).join(eol); })();
const prop = { [BIL]: bilan, [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [INV]: inventaire };
for (const p of [ETAT, ROAD]) ok(prop[p].match(BLOC)[0] === lire(p).match(BLOC)[0], 'V1 ' + p + ' : bloc a2-05:etat inchangé');
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**'));
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]).startsWith('- **Prochaine action.** La clôture documentaire de T9, sur autorisation distincte'), 'V2 « Prochaine action » identique dans les deux documents : clôture de T9, à autoriser');
ok(![...S8113, LIGNE_J].some((l) => /T9 (est )?close|T9 clôturée/.test(l.replace(/T9 n'est pas close/g, ''))), 'V3 aucun texte proposé ne clôt T9');
ok(NOUVEAUX.every((p) => inventaire.includes(p)) && inventaire.split('\n').length === lire(INV).split('\n').length + LIGNES_I.length && lire(INV).split('\n').every((l) => inventaire.split('\n').includes(l)), 'V4 inventaire : huit scripts inscrits par leur chemin ; ' + LIGNES_I.length + ' lignes ajoutées, aucune ligne existante modifiée');

// Essai dans un clone jetable
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-consignation-t9-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
for (const [p, t] of Object.entries(prop)) writeFileSync(f(p), t);
ok(JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify(Object.keys(prop).sort()), 'E1 quatre fichiers modifiés, aucun autre');
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 140);
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'E2 relais : 30 sur 30', fin(rel));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 45 rapports contrôlés, identiques/.test(emp.out), 'E3 manifeste : 45 empreintes', emp.out.slice(0, 80));
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['recalcul de T9', W + 'recalcul-T9-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'E4 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(cov.out), 'E5 couverture : 360/377, 17 restants');
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const ch = readFileSync(f(APERCU), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)); const planApres = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; ok(ap.code === 0 && !ch.length, 'E6 aperçu de synchronisation vide après la consignation', fin(ap));
const et = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(v.corrections,v.entry,v.libre,v.reserves.join())"], { cwd: C, encoding: 'utf8' });
ok(et.stdout.trim() === '204 177 V1-32 V1-22,V1-23', 'E7 204 corrections dans 177 ENTRY ; V1-32 libre ; V1-22 et V1-23 réservés', et.stdout.trim());
const asm = spawnSync(process.execPath, [f('tools/reconstruction/run.mjs'), 'assemble'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(asm.status === 0 && /684 ENTRY, 35 identifiant/.test(asm.stdout + asm.stderr), 'E8 assemblage réel : 684 ENTRY, 35 retraits', 'code ' + asm.status);
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: C, encoding: 'utf8' }).stdout.trim() && spawnSync('git', ['diff', '--check'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }).status === 0, 'E9 copie : index vide ; git diff --check conforme');
ok(sha(readFileSync(f(REG))) === sha(readFileSync(join(root, REG))), 'E10 registre des tranches inchangé');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(lire(ETAT)), j1 = jr(prop[ETAT]); ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'E11 journal antérieur conservé, une seule ligne ajoutée, en dernier', j1.length + ' lignes');
dire('constat  plan attendu après application de la consignation : ' + planApres);

// Sorties
if (!ko) {
  const d = join(root, OUT); mkdirSync(join(d, 'diffs'), { recursive: true }); const tab = [];
  for (const [p, t] of Object.entries(prop)) { const nom = p.split('/').pop(); writeFileSync(join(d, nom), t); const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, 'diffs', nom + '.diff'), r.stdout); const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; tab.push('| `' + p + '` | `' + DEPART[p] + '` | `' + sha(Buffer.from(t, 'utf8')) + '` | `' + sha(r.stdout) + '` | +' + n('+') + ' / −' + n('-') + ' |'); }
  writeFileSync(join(d, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n');
}
rmSync(tmp, { recursive: true, force: true });
const reel1 = instantane(root); const chR = diffI(reel0, reel1); ok(!chR.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation de la consignation conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
