// A2-05 · T9 : préparation de la consolidation du périmètre accepté (décision du 2026-11-01), EN PROPOSITION : aucun fichier cible n'est modifié.
// Usage : node a2-05-travail/arbitrage-T9/preparer-consolidation-T9.mjs <racine du dépôt>
// (1) Préconditions. (2) Versions proposées : configuration (ARBITRAGE seul), rapport accepté régénéré sur un clone, proposition sauvegardée, bilan (§8.110),
// ETAT-ACTUEL.md, ROADMAP.md, inventaire, recalcul de T9 adapté. (3) Simulation sur le clone de trois états, nommés O1, O2, O3 pour ne pas les confondre avec les
// livraisons E1 à E3 : O1 (documents et recalcul), O2 (44e entrée), O3 (synchronisation) ; contrôles à chaque état ; sabotages du recalcul adapté.
// (4) Sorties dans arbitrage-T9/consolidation/, seulement sans écart ; refus si le dossier existe. (5) Dépôt réel inchangé.
// Les plans et le manifeste simulés n'autorisent rien : ils se rétablissent sur le dépôt réel. Le défaut « RES » et sa correction sont hors de cette consolidation.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T9 = W + 'arbitrage-T9/', OUT = T9 + 'consolidation/', SAUV = T9 + 'proposition-T9-perimetre.md';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md', CFG = W + 'perimetre-T9.mjs', REC = W + 'recalcul-T9-perimetre.mjs', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', INV = W + 'INVENTAIRE-SCRIPTS.md', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md', RAPT8 = 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md';
const DEPART = { [RAP]: '01b9bf833a66fd56a8183ee24fb4c47a11506be2d687dc09b3cabab604d84205', [CFG]: '037129c74bb6785b785da96ea3b2305d63db176d6127b370a1e85685da828bef', [REC]: 'dadfd65262ddb0de3d16e3ae443c7eb6b1f74a4205e680327f382c06b3f567b2', [BIL]: '9901317faad4e53f4361c229284ec200f36eb27d33768baeed8df1f6fc64bc2b', [ETAT]: 'c1439d2d07d2680bc0fbf9632ebb790000e62ff12a576008dedeaaecea6f0ea8', [ROAD]: '334c576a7ee320040141d475614c39756499f59fcda10e4fa8d8a25d5fa4ad34', [INV]: '636617479bfdf9463574ba89368ec4b383740d53b001f39eb8f3ae17efdd04fe', [MAN]: 'eeeda756c00d09ebeaed8ef1e70c816d4b7f1d697acf3984fadbe9fc1d1163e9' };
const FINC = W + 'arbitrage-T8/consignation-finale/application/';
const CITES = { [FINC + 'appliquer-consignation-finale-T8.mjs']: '51217b04', [FINC + 'essayer-consignation-finale-T8.mjs']: '6f0588cd', [T9 + 'sabotages-recalcul-T9.mjs']: '9d07fbd3' };
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const BLOC = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => sha(readFileSync(p));
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l, d) => dire('constat  ' + l + (d ? ' : ' + d : ''));
const lire = (p) => readFileSync(join(root, p), 'utf8');
const LFs = (t) => t.replace(/\r\n/g, '\n');
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || p.startsWith(OUT)) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
if (existsSync(join(root, OUT))) { console.log('ARRÊT : ' + OUT + ' existe déjà'); process.exit(1); }

const FRAGMENTS = [
  ["; bilan du volet 2, §8.106 à §8.109) (relais", "; **consignation finale de T8 appliquée le 2026-11-01**, sur autorisation ; **T8 close le 2026-11-01** (clôture documentaire définitive, autorisée après la relecture de la consignation appliquée ; 16 sens, 16 conformes, aucun écart ni suspendu ; 43 empreintes ; relais 30 sur 30) ; **périmètre opérationnel de T9 (E1, E2, E3 ; 24 sens, 21 ENTRY) accepté le 2026-11-01**, sans ajout, retrait, déplacement ni report, une seule tranche, les trois livraisons restant des subdivisions de travail (`docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md`, §0 inscrit par le générateur v2, proposition conservée ; lignes 337 à 360 ; 先 s1, 前 s1 et 近く s1 maintenus, sans préjuger de `deictique` ni des réservations temporelles ; recalcul indépendant conforme, 29 sabotages sur 29, inventaire des 41 restants vérifié ; hors du manifeste, ajout non autorisé) ; audit des 24 sens non autorisé ; défaut « RES » non corrigé, contournement accepté pour la seule préparation du périmètre, voie A recommandée, proposition technique séparée ; bilan du volet 2, §8.106 à §8.110) (relais"],
  ["La clôture documentaire de T8, sur autorisation distincte, le rapport arbitré (`docs/rapports/etape2-A2-05-volet1-lot3-T8.md`) étant protégé au manifeste (43e entrée) et le bloc d'état synchronisé, T9 n'étant pas préparée (bilan du volet 2, §8.109) ; puis, chacun sur autorisation distincte :", "La protection du périmètre accepté de T9 (`docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md`) au manifeste (44e entrée) et la synchronisation du bloc d'état, puis l'audit individuel des 24 sens de T9, chacun sur autorisation distincte (bilan du volet 2, §8.110) ; puis, chacun sur autorisation distincte :"],
  ["la décision sur le défaut « RES » de T9, à part ;", "la correction technique du défaut « RES » de T9, voie A recommandée, proposition séparée, non appliquée ;"],
];
const ANCRE_J = "| 2026-11-01 | 2 · A2-05 | **Consolidation technique de T8 achevée en trois opérations";
const LIGNE_J = "| 2026-11-01 | 2 · A2-05 | **Consignation finale de T8 appliquée**, sur autorisation (quatre diffs relus ; 72 vérifications conformes ; premier essai sur copie en code 1, attente d'essai fausse, script d'application non modifié) ; **T8 close** (16 sens, 16 conformes, aucun écart ni suspendu ; décisions non rouvertes ; 43 empreintes). **Périmètre opérationnel de T9 (E1, E2, E3 ; 24 sens, 21 ENTRY) accepté**, sans ajout, retrait, déplacement ni report ; une seule tranche ; 先 s1, 前 s1 et 近く s1 maintenus ; hors du manifeste, ajout non autorisé. **Défaut « RES »** : contournement accepté pour la seule préparation du périmètre, voie A recommandée, non appliquée. Audit des 24 sens non autorisé. **336/377, 41 restants ; 197 corrections dans 172 ENTRY, non appliquées ; V1-25 libre ; 43 empreintes.** | non committé |";
const S8110 = [
  "### 8.110 Volet 1, lot 3 : consignation finale de T8 appliquée ; T8 close ; périmètre de T9 accepté (E1, E2, E3 ; 24 sens, 21 ENTRY) ; défaut « RES » identifié (2026-11-01)",
  '',
  "Décisions du 2026-11-01 (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : « **J'accepte B2 et autorise exclusivement l'application ciblée des quatre diffs préparés dans `arbitrage-T8/consignation-finale/`.** » ; « **J'accepte la consignation finale et autorise la clôture documentaire définitive de T8.** » ; « **Je demande explicitement de lancer la préparation du périmètre T9, en proposition uniquement.** » ; « **J'accepte le périmètre opérationnel de T9 : E1 + E2 + E3, soit 24 sens dans 21 ENTRY, lignes 337 à 360.** » ; « **J'autorise la préparation, sans application, de la consolidation documentaire du périmètre T9.** »",
  '',
  "**Consignation finale de T8 appliquée** (`a2-05-travail/arbitrage-T8/consignation-finale/application/appliquer-consignation-finale-T8.mjs`, `51217b04…`, essayé sur une copie jetable par `essayer-consignation-finale-T8.mjs`, `6f0588cd…`, puis lancé une fois sur le dépôt réel, code 0, 72 vérifications conformes, dont 28 avant écriture) : quatre documents identiques octet pour octet aux versions approuvées ; quatre diffs réels identiques aux diffs relus, à partir du premier `@@` ; originaux dans `…/application/depart/`, diffs réels dans `…/application/diffs-reels/`. Le premier essai sur copie a rendu code 1 : R9 attendait un refus à P9, alors que P7 refuse d'abord, le plan se déduisant du contenu des documents de pilotage ; seule cette attente a été corrigée, le script d'application n'a pas été modifié ; second essai conforme, douze refus sur douze. Les textes de cette consignation lui étaient antérieurs : ses deux scripts n'y figuraient pas, d'où leur inscription ici.",
  '',
  "**T8 close** : clôture documentaire définitive autorisée après la relecture de la consignation appliquée ; 16 sens, 16 conformes, aucun écart ni suspendu ; 336/377, 41 restants ; 197 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 retenue, V1-25 libre ; 43 empreintes ; relais 30 sur 30. La clôture n'autorise aucune modification lexicale ni aucune application de correction. Le §8.109 et les lignes antérieures du journal décrivent l'état à la date de leur rédaction ; ils ne sont pas modifiés.",
  '',
  "**Périmètre opérationnel de T9** (`docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md`) : livraisons E1, E2 et E3, retenues pour T9 par l'étude de méthode arbitrée le 2026-10-18 ; 24 sens, 21 ENTRY ; un seul segment contigu, lignes 337 à 360 (E1 : 9 sens, 6 ENTRY ; E2 : 12 sens, 12 ENTRY ; E3 : 3 sens, 3 ENTRY), le bloc E entier, entre D8 et F1. Thème : les points qu'un lot ou un addendum a explicitement renvoyés à A2-05, neuf motifs ; unité procédurale, non thématique. **Une seule tranche**, les trois livraisons restant des subdivisions de travail. **先 s1, 前 s1 et 近く s1 sont maintenus** : leur présence ne préjuge ni de leur fonction `deictique` ni du résultat des réservations temporelles. Généré par `a2-05-travail/perimetre-T9.mjs` avec le générateur v2, non modifié ; recalcul indépendant `a2-05-travail/recalcul-T9-perimetre.mjs` conforme (31 contrôles ; 29 sabotages sur 29 ; inventaire des 41 restants vérifié).",
  '',
  "**Acceptation inscrite** : §0 inscrit par le générateur v2 (constante `ARBITRAGE` de `a2-05-travail/perimetre-T9.mjs`) ; seuls le statut et le §0 changent ; la proposition livrée est sauvegardée à l'identique (`a2-05-travail/arbitrage-T9/proposition-T9-perimetre.md`, `01b9bf83…`).",
  '',
  "**Défaut « RES », à part** : le générateur s'arrête sur T9 (« règle RES : définition introuvable »). **Rectification factuelle** : la proposition de correction hors JLPT disait que le tableau des règles ne définit pas RES ; la ligne existe au découpage arbitré, et le défaut est dans le motif de lecture du générateur, `C\\d+-[a-z0]`. Ce document proposé n'est pas modifié. Le contournement sur copie jetable, dont seul le criblage perd les marques RES, est accepté **pour la préparation du périmètre uniquement** ; les 24 marques restent visibles séparément (§6.4 du périmètre). **Voie A recommandée pour la correction durable** : étendre de façon minimale le motif de lecture ; proposition technique séparée, non appliquée, sans nouvelle règle linguistique ni modification du découpage arbitré.",
  '',
  "**Protection** : le périmètre accepté n'est pas ajouté au manifeste (43 empreintes) ; l'ajout de la 44e entrée, puis la synchronisation du bloc d'état, relèvent chacun d'une autorisation distincte. L'inventaire reçoit les deux scripts finaux de la consignation de T8, les trois scripts de préparation de T9 et le script de cette consolidation.",
  '',
  "**Restes signalés, non ouverts** : le statut « planifiée » de T7, de T8 et de T9 dans `registre-tranches.json` ; l'état daté de `CLAUDE.md`, §5 ; le défaut de date de `empreintes-lot3.mjs` ; l'arrêt en erreur de `sync-stable.mjs` sur certains états.",
  '',
  "Audit des 24 sens non autorisé ; aucune décision lexicale ; registre des tranches non modifié ; bloc F et préalable E5 non ouverts. Décomptes : 336/377, 41 restants ; bloc B 148/148 ; 197 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 retenue, V1-25 libre ; 43 empreintes ; bloc d'état synchronisé. Aucun `git add`, commit ni push.",
];
const ANCRE_I = '| `arbitrage-T8/consignation-finale/preparer-consignation-finale-T8.mjs` |';
const LIGNES_I = [
  "| `arbitrage-T8/consignation-finale/application/appliquer-consignation-finale-T8.mjs` | application de la consignation finale de T8 : préconditions, ancres et fins de ligne, diffs régénérés identiques, sauvegarde, hunks relus par remplacements ciblés, contrôles, arbre entier comparé ; arrêt au premier écart (`51217b04…`) | quatre documents, `…/depart/`, `…/diffs-reels/`, `…/sorties/` | lancé une fois le 2026-11-01, code 0 |",
  "| `arbitrage-T8/consignation-finale/application/essayer-consignation-finale-T8.mjs` | essai du script précédent sur copie jetable : douze refus avant écriture, exécution nominale, seconde exécution refusée (`6f0588cd…`) | `…/sorties/` | lancé le 2026-11-01, code 1 au premier lancement (attente de R9 fausse, corrigée, script d'application inchangé), code 0 au second |",
  "| `perimetre-T9.mjs` | périmètre opérationnel de T9 (E1, E2, E3) : configuration (autorisation, 16 risques rédigés, sans verdict) ; exige l'arrêt du générateur sur « RES », puis lance le générateur v2, non modifié, sur une copie jetable dont seul le criblage perd les marques RES ; constante `ARBITRAGE` renseignée à l'acceptation du 2026-11-01 ; version initiale `037129c7…` | `docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md` | lancé le 2026-11-01, code 0 |",
  "| `recalcul-T9-perimetre.mjs` | recalcul indépendant du périmètre de T9 (n'importe aucun module v2) : découpage, segment contigu bordé par D8 et F1, doublons, sens non encore examinés, inventaire des 41, 336 sens de la clôture de T8, marques RES et motifs, fonctions, types, catégories, tags, relations, décisions, corrections, frontière F, manifeste, générateur et criblage ; version initiale `dadfd652…` | — (sortie standard) | code 0 |",
  "| `arbitrage-T9/sabotages-recalcul-T9.mjs` | tests de résistance de la version initiale du recalcul de T9, dans un clone jetable ; 29 sabotages (`9d07fbd3…`) | `arbitrage-T9/sorties/` | lancé le 2026-11-01, code 0 |",
  "| `arbitrage-T9/preparer-consolidation-T9.mjs` | préparation de la consolidation du périmètre de T9, sans application : versions proposées, simulation de trois états (O1, O2, O3), sabotages du recalcul adapté | `arbitrage-T9/consolidation/` | lancé le 2026-11-01 |",
];
const ARB = { date: '2026-11-01', texte: [
  "Arbitrage du 2026-11-01 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **J'accepte le périmètre opérationnel de T9 : E1 + E2 + E3, soit 24 sens dans 21 ENTRY, lignes 337 à 360.** » « Aucun ajout, retrait, déplacement ou report. » « Conserver une seule tranche T9, avec les trois livraisons comme subdivisions de travail. »",
  '',
  "« Je confirme le maintien de 先 s1, 前 s1 et 近く s1. Leur présence dans T9 ne préjuge ni de leur fonction `deictique` ni du résultat des réservations temporelles. »",
  '',
  "**Défaut « RES »** : « J'accepte, pour la préparation du périmètre uniquement, le contournement documenté sur copie jetable. Les 24 marques RES doivent rester visibles séparément. » « Je recommande la **voie A** pour la correction durable : étendre de façon minimale le motif de lecture du générateur pour reconnaître RES. » Cette correction est préparée séparément et ne s'applique pas sans autorisation distincte : « Ne créer aucune nouvelle règle linguistique ni modifier le découpage arbitré. »",
  '',
  "**L'audit lexical des 24 sens n'est pas autorisé** : « Ne pas examiner les 24 sens pour prononcer des verdicts avant la consolidation et une autorisation distincte. » Le bloc F et son préalable E5 restent fermés. La protection du périmètre (44e entrée du manifeste) se fera sur autorisation distincte.",
  '',
  "**Comptes maintenus** : 336/377, 41 restants ; 197 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 retenue, V1-25 libre ; 43 empreintes jusqu'à l'intégration autorisée du périmètre.",
] };

// (1) Préconditions
for (const [p, h] of Object.entries(DEPART)) ok(shaF(join(root, p)) === h, 'P1 empreinte de départ : ' + p, h.slice(0, 12) + '…');
ok(/^const ARBITRAGE = null;$/m.test(lire(CFG)) && /^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/m.test(lire(RAP)), 'P2 configuration et rapport en proposition');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P3 ' + p + ' : trois fragments présents une fois'); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_J)).length === 1, 'P4 ancre du journal, une fois');
ok(!/^### 8\.110 /m.test(lire(BIL)) && /^### 8\.109 /m.test(lire(BIL)) && !S8110.some((l) => /^\| /.test(l)), 'P5 bilan : §8.109 présent, §8.110 absent ; §8.110 sans ligne de tableau');
ok(lire(INV).split('\n').filter((l) => l.startsWith(ANCRE_I)).length === 1 && !lire(INV).includes('appliquer-consignation-finale-T8.mjs') && !lire(INV).includes('perimetre-T9.mjs'), 'P6 inventaire : ancre présente, lignes absentes');
const man0 = JSON.parse(lire(MAN)); const c0 = Object.keys(man0.empreintes);
ok(c0.length === 43 && c0.every((p) => shaF(join(root, p)) === man0.empreintes[p]) && c0[42] === RAPT8 && !c0.includes(RAP), 'P7 manifeste : 43 empreintes conformes, rapport arbitré de T8 en 43e, périmètre de T9 absent');
const cit = Object.entries(CITES).filter(([p, h]) => !shaF(join(root, p)).startsWith(h)).map(([p]) => p); ok(!cit.length, 'P8 empreintes citées conformes au dépôt réel', cit.join(', ') || Object.keys(CITES).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P9 index vide');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// (2) Versions proposées, hors rapport
const cfgProp = lire(CFG).replace(/^const ARBITRAGE = null;$/m, () => 'const ARBITRAGE = ' + JSON.stringify(ARB, null, 2) + ';');
const pilote = (p, j) => { const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z); if (j) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_J) ? [l, LIGNE_J] : [l])).join('\n'); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const bilan = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8110.join(eol) + eol; })();
const inventaire = (() => { const b = lire(INV); const eol = b.includes('\r\n') ? '\r\n' : '\n'; return b.split(eol).flatMap((l) => (l.startsWith(ANCRE_I) ? [l, ...LIGNES_I] : [l])).join(eol); })();

// (3) Clone jetable, régénération du rapport accepté
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-consolidation-t9-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 130);
const ecarts = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim());
const propT = lire(RAP); writeFileSync(f(CFG), cfgProp);
const g = lancer(CFG); const rapProp = readFileSync(f(RAP), 'utf8');
const L0 = propT.split('\n'), L1 = rapProp.split('\n'); const a = L1.indexOf('## 0. Arbitrage'), b = L1.indexOf('## 1. Où se place T9'); const sans0 = [...L1.slice(0, a), ...L1.slice(b)]; const st = L0.findIndex((l) => l.startsWith('**Statut** : '));
ok(g.code === 0 && a > 0 && b > a && sans0.length === L0.length && sans0.every((l, k) => (k === st ? /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-11-01 \(§0\)\.\*\*/.test(l) : l === L0[k])), 'O0 rapport régénéré : seuls changent la ligne de statut et le §0 inséré ; proposition conservée intégralement', 'code ' + g.code + ' ; §0 : ' + (b - a) + ' lignes ; ' + sha(rapProp).slice(0, 12) + '…');
const rapSha = sha(Buffer.from(rapProp, 'utf8'));
ok(/\*\*Marques réelles\*\* : 30 au criblage, \*\*24 sur les sens de T9\*\*/.test(rapProp) && /\*\*Les neuf motifs de réservation\*\*/.test(rapProp), 'O0 les 24 marques RES restent visibles séparément (§6.4)');

// Recalcul adapté, par remplacements ciblés
let recProp = lire(REC);
const une = (x, y) => { if (recProp.split(x).length !== 2) throw new Error('recalcul : ' + x.slice(0, 50)); recProp = recProp.replace(x, () => y); };
une('// Usage : node a2-05-travail/recalcul-T9-perimetre.mjs', "// Adaptation au périmètre accepté (§0 ; proposition sauvegardée, empreinte fixée ; empreinte de la version acceptée fixée, indépendante du manifeste) et à\n// sa protection (absent du manifeste ou en 44e entrée) : préparée le 2026-11-01, appliquée seulement sur autorisation distincte ; version initiale `dadfd652…`.\n// Usage : node a2-05-travail/recalcul-T9-perimetre.mjs");
une('// 11. Statut du rapport, inventaire des 41, proposition uniquement', "// 11. Périmètre accepté : statut et §0 ; hors du statut et du §0, identique à la proposition sauvegardée ; empreinte de la version acceptée fixée ; inventaire des 41");
une("'quatorze règles hors RES ; défaut signalé à part, aucune voie retenue'", "'quatorze règles hors RES ; défaut signalé à part, proposition conservée'");
{ const L = recProp.split('\n'); const i = L.findIndex((l) => l.startsWith("ctl(/^\\*\\*Statut\\*\\* : \\*\\*proposition de périmètre opérationnel")); if (i < 0) throw new Error('ligne de statut'); L.splice(i, 1,
  "const PROP9 = 'a2-05-travail/arbitrage-T9/proposition-T9-perimetre.md';",
  "const PL = (existsSync(join(root, PROP9)) ? txt(PROP9) : '').split('\\n'), G = gen.split('\\n');",
  "const a0 = G.indexOf('## 0. Arbitrage'), b0 = G.indexOf('## 1. Où se place T9'); const sans0 = a0 > 0 && b0 > a0 ? [...G.slice(0, a0), ...G.slice(b0)] : G; const st = PL.findIndex((l) => l.startsWith('**Statut** : '));",
  "ctl(octets(PROP9) === '" + DEPART[RAP] + "' && /^\\*\\*Statut\\*\\* : \\*\\*proposition de périmètre opérationnel, non arbitrée\\.\\*\\*/.test(PL[st] ?? '') && /^\\*\\*Statut\\*\\* : \\*\\*périmètre accepté le 2026-11-01 \\(§0\\)\\.\\*\\*/.test(G[st] ?? '') && a0 > 0 && b0 > a0 && sans0.length === PL.length && sans0.every((l, k) => k === st || l === PL[k]), 'périmètre accepté (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', octets(PROP9).slice(0, 12) + '… ; §0 : ' + (b0 - a0) + ' lignes');",
  "ctl(octets(GEN) === '" + rapSha + "', 'périmètre accepté identique à sa version acceptée (empreinte fixée, indépendante du manifeste)', octets(GEN).slice(0, 12) + '…');",
  "const s09 = a0 > 0 && b0 > a0 ? G.slice(a0, b0).join('\\n') : '';",
  "ctl(s09.includes(\"**J'accepte le périmètre opérationnel de T9 : E1 + E2 + E3, soit 24 sens dans 21 ENTRY, lignes 337 à 360.**\") && s09.includes('Je confirme le maintien de 先 s1, 前 s1 et 近く s1.') && s09.includes('**voie A**') && s09.includes(\"**L'audit lexical des 24 sens n'est pas autorisé**\"), '§0 de T9 : 24 sens, 21 ENTRY ; trois sens spatiaux maintenus ; voie A recommandée ; audit non autorisé', 'présents');"); recProp = L.join('\n'); }
une("// 12. Manifeste : 43 entrées, toutes identiques (SHA-256 des octets, sans le module v2), dans leur ordre ; périmètre de T9 absent", "// 12. Manifeste : au moins 43 entrées, toutes identiques (SHA-256 des octets, sans le module v2) ; les 43 premières dans leur ordre ; périmètre accepté de T9 absent ou en 44e entrée");
une("ctl(cles.length === 43 && !diffE.length && sha(cles.join('\\n')) === ORDRE_43 && !cles.includes(GEN), 'manifeste : 43 empreintes recalculées, toutes identiques, dans leur ordre ; périmètre de T9 absent'", "ctl(cles.length >= 43 && !diffE.length && sha(cles.slice(0, 43).join('\\n')) === ORDRE_43 && (cles.indexOf(GEN) === -1 || cles.indexOf(GEN) === 43), 'manifeste : au moins 43 empreintes recalculées, toutes identiques ; les 43 premières dans leur ordre ; périmètre de T9 absent ou en 44e entrée'");
const prop = { [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [BIL]: bilan, [INV]: inventaire, [REC]: recProp };

// État O1 : documents, recalcul adapté, proposition sauvegardée (rapport et configuration déjà en place sur le clone)
dire('--- O1 : documents, recalcul adapté, proposition sauvegardée');
for (const [p, t] of Object.entries(prop)) writeFileSync(f(p), t); mkdirSync(f(T9), { recursive: true }); writeFileSync(f(SAUV), propT);
ok(JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify([...Object.keys(prop), CFG, RAP, SAUV].sort()), 'O1-1 huit fichiers, aucun autre', diffI(reel0, instantane(C)).length + ' fichiers');
ok(spawnSync(process.execPath, ['--check', f(REC)], { encoding: 'utf8' }).status === 0 && spawnSync(process.execPath, ['--check', f(CFG)], { encoding: 'utf8' }).status === 0, 'O1-2 node --check du recalcul et de la configuration');
const CTRL = { couverture: [W + 'couverture-lot3.mjs'], empreintes: [W + 'empreintes-lot3.mjs'], pilote: [W + 'controle-bilan-pilote.mjs'], T5: [W + 'recalcul-T5-perimetre.mjs'], T6: [W + 'recalcul-T6-perimetre.mjs'], T7: [W + 'recalcul-T7-perimetre.mjs'], T8: [W + 'recalcul-T8-perimetre.mjs'], T9: [REC] };
const tous = (nom) => { const R = Object.fromEntries(Object.entries(CTRL).map(([k, x]) => [k, lancer(...x)])); for (const [k, r] of Object.entries(R)) dire('   ' + nom + ' ' + k + ' (code ' + r.code + ') : ' + fin(r)); return R; };
const relais = () => { const r = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); return { r, e: ecarts(r).map((l) => l.split(/\s+/)[1]).sort().join(',') }; };
const R1 = tous('O1'); ok(Object.values(R1).every((r) => r.code === 0), 'O1-3 contrôles en service, recalcul adapté compris, à 0');
const rel1 = relais(); ok(rel1.r.code === 1 && rel1.e === 'C9a', 'O1-4 relais : 29 sur 30, C9a seul (périmètre accepté hors du manifeste)', fin(rel1.r) + ' ; ' + rel1.e);
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); const ch1 = readFileSync(f(APERCU), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)); ok(ap1.code === 0 && !ch1.length, 'O1-5 aperçu vide : comptes inchangés', fin(ap1));
for (const p of [ETAT, ROAD]) ok(prop[p].match(BLOC)[0] === lire(p).match(BLOC)[0], 'O1-6 ' + p + ' : bloc a2-05:etat inchangé');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(lire(ETAT)), j1 = jr(prop[ETAT]);
ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'O1-7 journal historique conservé, une ligne ajoutée, en dernier', j1.length + ' lignes');
const b0t = lire(BIL).replace(/(\r?\n)+$/, ''); ok(bilan.startsWith(b0t) && bilan.slice(b0t.length).split('### 8.').length === 2, 'O1-8 §8.109 et bilan antérieur conservés, §8.110 seul ajouté');
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**'));
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]).startsWith('- **Prochaine action.** La protection du périmètre accepté de T9'), 'O1-9 « Prochaine action » identique dans les deux documents');
// Sabotages du recalcul adapté
const sabote = (nom, p, g2, attendu) => { const o = readFileSync(f(p)); const t = o.toString('utf8'); const m = g2(t); if (m === t) { ok(false, nom, 'sans effet'); return; } writeFileSync(f(p), m); const r = lancer(REC); writeFileSync(f(p), o); ok(r.code === 1 && ecarts(r).some((l) => l.includes(attendu)), nom, ecarts(r).length + ' écart(s)'); };
sabote('R1 rapport de T9 revenu à la proposition', RAP, () => propT, 'périmètre accepté (§0)');
sabote('R2 proposition sauvegardée modifiée', SAUV, (t) => t + ' ', 'périmètre accepté (§0)');
sabote('R3 §0 du rapport modifié', RAP, (t) => t.replace('Je confirme le maintien de 先 s1, 前 s1 et 近く s1.', 'Je retire 先 s1, 前 s1 et 近く s1.'), 'périmètre accepté identique');
sabote('R4 corps du rapport modifié', RAP, (t) => t.replace('**Bornes** (découpage', '**Bornes** (découpages'), 'périmètre accepté (§0)');
sabote('R5 périmètre de T9 inséré avant la 44e position', MAN, (t) => { const o = JSON.parse(t); const e = Object.entries(o.empreintes); e.splice(42, 0, [RAP, rapSha]); o.empreintes = Object.fromEntries(e); return JSON.stringify(o, null, 1) + '\n'; }, 'manifeste');
sabote('R6 voie A retirée du §0', RAP, (t) => t.replace('**voie A**', 'voie A'), '§0 de T9');

// État O2 : 44e entrée
dire('--- O2 : 44e entrée, simulée');
const JOUR = new Date().toISOString().slice(0, 10);
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); const brut = readFileSync(f(MAN)); const m1 = JSON.parse(brut); const c1 = Object.keys(m1.empreintes);
ok(aj.code === 0 && c1.length === 44 && c1[43] === RAP && m1.empreintes[RAP] === rapSha && c0.every((k, i) => c1[i] === k && m1.empreintes[k] === man0.empreintes[k]) && JSON.stringify(m1.ajouts.slice(0, -1)) === JSON.stringify(man0.ajouts) && JSON.stringify(m1.ajouts.at(-1)) === JSON.stringify({ date: JOUR, chemins: [RAP] }), 'O2-1 44 entrées, les 43 premières inchangées dans leur ordre, un seul ajout daté du jour', fin(aj));
const R2 = tous('O2'); ok(Object.values(R2).every((r) => r.code === 0), 'O2-2 contrôles en service à 0');
const rel2 = relais(); constat('O2-3 relais à cet état', fin(rel2.r) + ' ; écarts : ' + (rel2.e || 'aucun'));

// État O3 : synchronisation
dire('--- O3 : synchronisation, simulée');
const ap2 = lancer(W + 'sync-stable.mjs', '--apercu'); const plan = (ap2.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const apercu = readFileSync(f(APERCU), 'utf8');
const ch2 = apercu.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
ok(ap2.code === 0 && plan && ch2.filter((l) => /44 rapports arbitrés identiques/.test(l)).length === 2 && ch2.length === 8, 'O3-1 aperçu : marqueur et compteur seuls, huit lignes', 'plan de simulation ' + plan);
const av3 = instantane(C); const app = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', plan); ok(app.code === 0 && JSON.stringify(diffI(av3, instantane(C))) === JSON.stringify([ETAT, ROAD].sort()), 'O3-2 deux documents, blocs seuls', fin(app));
const R3 = tous('O3'); const rel3 = relais(); const ap3 = lancer(W + 'sync-stable.mjs', '--apercu');
ok(Object.values(R3).every((r) => r.code === 0) && /^empreintes : 44 rapports contrôlés, identiques/.test(R3.empreintes.out) && rel3.r.code === 0 && fin(rel3.r) === '30 conformes sur 30' && ap3.code === 0 && !readFileSync(f(APERCU), 'utf8').split('\n').some((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)), 'O3-3 état final : tous les contrôles à 0 ; 44 empreintes ; relais 30 sur 30 ; aperçu suivant vide', fin(rel3.r));
const asm = spawnSync(process.execPath, [f('tools/reconstruction/run.mjs'), 'assemble'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(asm.status === 0 && /684 ENTRY, 35 identifiant/.test(asm.stdout + asm.stderr), 'O3-4 assemblage réel : 684 ENTRY, 35 retraits', 'code ' + asm.status);
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: C, encoding: 'utf8' }).stdout.trim() && spawnSync('git', ['diff', '--check'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }).status === 0, 'O3-5 copie : index vide ; git diff --check conforme');
ok(diffI(reel0, instantane(C)).every((p) => [...Object.keys(prop), CFG, RAP, SAUV, MAN].includes(p)), 'O3-6 neuf fichiers au plus, aucun autre : données, journal, lots, registre, normes et documents protégés inchangés');
const et = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(v.arbitres,v.restants,v.corrections,v.entry,v.libre,v.reserves.join())"], { cwd: C, encoding: 'utf8' });
ok(et.stdout.trim() === '336 41 197 172 V1-25 V1-22,V1-23', 'O3-7 336/377, 41 restants ; 197 corrections dans 172 ENTRY ; V1-25 libre ; V1-22 et V1-23 réservés', et.stdout.trim());

// (4) Sorties
if (!ko) {
  const d = join(root, OUT); mkdirSync(join(d, 'diffs'), { recursive: true }); const tab = [];
  const noms = { [CFG]: 'perimetre-T9.mjs', [RAP]: 'etape2-A2-05-volet1-lot3-T9-perimetre.md', [BIL]: 'etape2-A2-05-bilan-volet2.md', [ETAT]: 'ETAT-ACTUEL.md', [ROAD]: 'ROADMAP.md', [INV]: 'INVENTAIRE-SCRIPTS.md', [REC]: 'recalcul-T9-perimetre.mjs' };
  const contenus = { ...prop, [CFG]: cfgProp, [RAP]: rapProp };
  for (const [p, nom] of Object.entries(noms)) { writeFileSync(join(d, nom), contenus[p]); const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, 'diffs', nom + '.diff'), r.stdout); const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; tab.push('| `' + p + '` | `' + DEPART[p] + '` | `' + sha(Buffer.from(contenus[p], 'utf8')) + '` | `' + sha(r.stdout) + '` | +' + n('+') + ' / −' + n('-') + ' |'); }
  writeFileSync(join(d, 'proposition-T9-perimetre.md'), propT); writeFileSync(join(d, 'manifeste-simule-' + JOUR + '.json'), brut); writeFileSync(join(d, 'apercu-simule-O3.md'), apercu);
  writeFileSync(join(d, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n');
}
rmSync(tmp, { recursive: true, force: true });
const reel1 = instantane(root); const chR = diffI(reel0, reel1); ok(!chR.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
constat('valeurs de simulation, non réutilisables pour une application', 'date ' + JOUR + ' ; plan ' + plan);
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation de la consolidation conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
