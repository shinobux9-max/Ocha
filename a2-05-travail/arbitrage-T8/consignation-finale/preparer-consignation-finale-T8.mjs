// A2-05 · T8 : préparation de la consignation des opérations A, B1 et B2 et du complément d'inventaire, EN PROPOSITION : versions proposées d'ETAT-ACTUEL.md, de
// ROADMAP.md, du bilan du volet 2 (§8.109) et de l'inventaire, par remplacements ciblés ; essai dans un clone jetable ; dépôt réel inchangé. T8 n'est clôturée par aucun de ces textes.
// Usage : node a2-05-travail/arbitrage-T8/consignation-finale/preparer-consignation-finale-T8.mjs <racine du dépôt>
// Sorties dans consignation-finale/, seulement sans écart ; refus si diffs/ existe. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T = W + 'arbitrage-T8/', OUT = T + 'consignation-finale/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', APERCU = W + 'sync-stable-apercu.md', REG = W + 'registre-tranches.json';
const DEPART = { [ETAT]: '7080fb42992f1944b8254fb21e76829da38c79406282d0ebf02af1b968d414d9', [ROAD]: '223f0f6983b955b7a775494f9fa09c316e2345c766cb0ba3df5086f36dd4a271', [BIL]: '93bbdaac174df0f49e23c9f353f3e67ae6a4618c37b601285049067a17460c16', [INV]: 'bc6ab2b97860b3b7c9052d996332be29c30027c026571fe75f2bc35cf7d4be99' };
const CITES = { // empreintes citées par le §8.109 et l'inventaire, vérifiées sur le dépôt réel
  [T + 'application-A/appliquer-A.mjs']: '0c8f5492', [T + 'application-A/essayer-A.mjs']: 'de2bb5a6', [T + 'preparation-B/preparer-B.mjs']: '076e4fd8',
  [T + 'application-B1/appliquer-B1.mjs']: '04bac5a6', [T + 'application-B1/essayer-B1.mjs']: 'cecc01d6', [T + 'application-B2/appliquer-B2.mjs']: 'c6211016', [T + 'application-B2/essayer-B2.mjs']: 'dd67f6dd',
  'docs/rapports/etape2-A2-05-volet1-lot3-T8.md': 'dae4d057', [T + 'proposition-T8.md']: '2a42fb84', [W + 'audit-v1-lot3-T8.mjs']: 'cdb5ca0b', [W + 'recalcul-T8-perimetre.mjs']: 'adb6bbda', [W + 'empreintes-rapports-arbitres.json']: 'eeeda756',
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
  ["; bilan du volet 2, §8.106 à §8.108) (relais", "; **rapport arbitré de T8 protégé au manifeste le 2026-11-01 (43e entrée)**, et bloc d'état synchronisé (étape A, puis B1 et B2, chacune sur autorisation distincte) ; bilan du volet 2, §8.106 à §8.109) (relais"],
  ["La protection du rapport arbitré de T8 (`docs/rapports/etape2-A2-05-volet1-lot3-T8.md`) au manifeste (43e entrée), la synchronisation du bloc d'état et la clôture documentaire de T8, chacune sur autorisation distincte, T9 n'étant pas préparée (bilan du volet 2, §8.108) ; puis, chacun sur autorisation distincte :", "La clôture documentaire de T8, sur autorisation distincte, le rapport arbitré (`docs/rapports/etape2-A2-05-volet1-lot3-T8.md`) étant protégé au manifeste (43e entrée) et le bloc d'état synchronisé, T9 n'étant pas préparée (bilan du volet 2, §8.109) ; puis, chacun sur autorisation distincte :"],
];
const ANCRE_J = "| 2026-10-31 | 2 · A2-05 | **Audit des 16 sens de T8 livré en proposition, puis T8 arbitrée**";
const LIGNE_J = "| 2026-11-01 | 2 · A2-05 | **Consolidation technique de T8 achevée en trois opérations, chacune sur autorisation distincte** (ChatGPT, par délégation), chaque script essayé sur une copie jetable avant son lancement unique sur le dépôt réel : étape A, le 2026-10-31, inscription de l'arbitrage (98 vérifications conformes ; relais 28 sur 30, C8 et C9a) ; B1, le 2026-11-01, 43e entrée (40 ; manifeste `eeeda756…` ; relais 29 sur 30, C8 seul) ; B2, le 2026-11-01, bloc d'état synchronisé (35 ; plan `15ed8a93b812fdbc` ; marqueur `5018d82d05d382aa` ; relais 30 sur 30). T8 n'est pas close ; T9 n'est pas préparée. **336/377, 41 restants ; 197 corrections dans 172 ENTRY, non appliquées ; V1-25 libre ; 43 empreintes.** | non committé |";
const S8109 = [
  "### 8.109 Volet 1, lot 3 : inscription de T8 appliquée (étape A) ; rapport arbitré au manifeste (43e entrée, B1) ; bloc d'état synchronisé (B2) ; consolidation technique de T8 achevée (2026-10-31 et 2026-11-01)",
  '',
  "Décisions (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : « **J'accepte les sept diffs proposés et autorise exclusivement leur application ciblée dans l'étape A.** » ; « **J'accepte l'étape A et autorise exclusivement B1 : l'ajout du rapport arbitré T8 comme 43e entrée du manifeste.** » ; « **J'accepte B1 et autorise exclusivement l'application de B2, au plan `15ed8a93b812fdbc`.** »",
  '',
  "**Préparation de l'inscription** (`a2-05-travail/arbitrage-T8/preparer-inscription-T8.mjs`, sur un clone jetable). Premier lancement, code 1 : le harnais retirait le rapport avant de le régénérer, ce qui donnait « 320 arbitrés, 0 proposés, 57 restants » au lieu de « 16 proposés, 41 restants » dans la version relue ; aucune sortie écrite ; régénération refaite rapport présent, contrôle non assoupli, puis lancement conforme.",
  '',
  "**Étape A (2026-10-31)** (`a2-05-travail/arbitrage-T8/application-A/appliquer-A.mjs`, `0c8f5492…`, essayé sur une copie jetable par `essayer-A.mjs`, `de2bb5a6…`, puis lancé une fois sur le dépôt réel, code 0, 98 vérifications conformes, dont 40 avant écriture) : les sept diffs relus appliqués par remplacements ciblés, chaque diff régénéré étant identique au diff relu ; proposition initiale sauvegardée (`a2-05-travail/arbitrage-T8/proposition-T8.md`, `2a42fb84…`) ; originaux dans `…/application-A/depart/`. Rapport de T8 `dae4d057…` ; configuration `cdb5ca0b…` ; recalcul de T8 `adb6bbda…`. Après : 336/377, 41 restants ; 197 corrections dans 172 ENTRY, aucune appliquée ; V1-25 libre ; 42 empreintes ; relais 28 sur 30, C8 et C9a, état intermédiaire attendu. Le premier essai sur copie a rendu code 1 : sa sortie, redirigée dans le dépôt, était vue par le contrôle « dépôt réel inchangé » ; relancé avec la sortie hors du dépôt, script inchangé, code 0.",
  '',
  "**Préparation de l'étape B** (`…/preparation-B/preparer-B.mjs`, `076e4fd8…`, sur une copie jetable, code 0, 27 vérifications conformes, sept sabotages détectés sur sept).",
  '',
  "**B1 (2026-11-01)** (`…/application-B1/appliquer-B1.mjs`, `04bac5a6…`, essayé sur une copie jetable par `essayer-B1.mjs`, `cecc01d6…`, puis lancé une fois sur le dépôt réel, code 0, 40 vérifications conformes, dont 12 avant écriture) : prévisualisation par l'outil sur une copie du dépôt réel ; manifeste de départ sauvegardé (`c4d49fa6…`) ; `empreintes-lot3.mjs --ajouter` une fois, ajout daté du 2026-11-01 ; manifeste écrit identique à la prévisualisation (`eeeda756…`) ; 43 entrées, les 42 précédentes inchangées dans leur ordre, le rapport arbitré de T8 en 43e ; relais 29 sur 30, C8 seul, état intermédiaire attendu. **Date** : `empreintes-lot3.mjs` date l'ajout en UTC ; l'opération, préparée juste après minuit à l'heure locale du 2026-11-01, a été différée à 00:00 UTC pour que l'ajout soit daté du jour effectif, et la précondition P12 refuse d'écrire si les deux dates diffèrent. L'outil n'est pas modifié : ce défaut reste latent pour toute opération lancée entre minuit et le passage à la date UTC. **Motif corrigé** : la note d'export de l'inscription disait qu'un plan se rétablit « l'ajout au manifeste étant daté » ; ce motif est faux, ni la date ni le manifeste n'entrant dans le plan, qui se déduit du contenu des documents de pilotage après synchronisation.",
  '',
  "**B2 (2026-11-01)** (`…/application-B2/appliquer-B2.mjs`, `c6211016…`, essayé sur une copie jetable par `essayer-B2.mjs`, `dd67f6dd…`, puis lancé une fois sur le dépôt réel, code 0, 35 vérifications conformes, dont 12 avant écriture) : aperçu relancé à l'empreinte complète exigée (`ce93d8b6…`) et identique octet pour octet au fichier d'aperçu relu ; plan `15ed8a93b812fdbc`, recalculé sur le dépôt réel, de même valeur que celui de la simulation parce que le plan se déduit du contenu ; `ETAT-ACTUEL.md` et `ROADMAP.md` sauvegardés ; `sync-stable.mjs --appliquer` une fois. Marqueur `43ab94fc376f9fa1` → `5018d82d05d382aa`, 320/377 et 57 restants → 336/377 et 41 restants, 42 → 43 rapports arbitrés identiques ; chaque document égale sa sauvegarde augmentée de ces trois seuls remplacements, octet pour octet ; blocs identiques ; aperçu suivant vide ; **relais 30 sur 30**. Dans l'essai sur copie, le refus R2 (ligne V1-24 retirée du bilan) vient de l'arrêt en erreur de `sync-stable.mjs`, qui ne rend alors aucun plan, et non d'un plan différent : la précondition refuse bien, sans écriture ; l'outil n'est pas modifié.",
  '',
  "**Portée** : le §8.108 (« le rapport arbitré de T8 reste hors du manifeste (42 empreintes) ») et les lignes antérieures du journal décrivent l'état à la date de leur rédaction ; ils ne sont pas modifiés. Les rubriques d'état courant et la « Prochaine action » d'`ETAT-ACTUEL.md` et de `ROADMAP.md` sont actualisées à l'identique. L'inventaire reçoit les scripts de l'étape A, de la préparation de B, de B1 et de B2. Les traces complètes sont dans `a2-05-travail/arbitrage-T8/application-A/`, `application-B1/` et `application-B2/` (`sorties/`).",
  '',
  "**Restes signalés, non ouverts** : le statut « planifiée » de T7 et de T8 dans `registre-tranches.json`, leurs recalculs l'exigeant ; l'état daté de `CLAUDE.md`, §5 ; le défaut de date de `empreintes-lot3.mjs`.",
  '',
  "**Consolidation technique de T8 achevée** ; T8 n'est pas close : sa clôture documentaire définitive relève d'une autorisation distincte. T9 n'est pas préparée ; le bloc F n'est pas ouvert ; aucune décision lexicale ; registre des tranches non modifié. Décomptes : 336/377, 41 restants ; bloc B 148/148 ; 197 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 retenue, V1-25 libre ; 43 empreintes ; bloc d'état synchronisé. Aucun `git add`, commit ni push.",
];
const ANCRE_I = '| `arbitrage-T8/preparer-inscription-T8.mjs` |';
const LIGNES_I = [
  "| `arbitrage-T8/application-A/appliquer-A.mjs` | étape A : préconditions, diffs régénérés identiques aux diffs relus, sauvegarde, sept hunks relus par remplacements ciblés, proposition sauvegardée, contrôles (`0c8f5492…`) ; `essayer-A.mjs` (`de2bb5a6…`) : essai sur copie jetable | sept fichiers, `arbitrage-T8/proposition-T8.md`, `…/depart/`, `…/diffs-reels/`, `…/sorties/` | lancé une fois le 2026-10-31, code 0 ; premier essai sur copie en code 1 (sortie redirigée dans le dépôt), relancé script inchangé |",
  "| `arbitrage-T8/preparation-B/preparer-B.mjs` | préparation de B1 et de B2 sur copie jetable, sept sabotages (`076e4fd8…`) | `…/preparation-B/sortie/` | lancé le 2026-10-31, code 0 |",
  "| `arbitrage-T8/application-B1/appliquer-B1.mjs` | B1 : préconditions, dont l'accord de la date UTC de l'outil et du jour local, prévisualisation, sauvegarde, 43e entrée une fois, contrôles, aperçu B2 (`04bac5a6…`) ; `essayer-B1.mjs` (`cecc01d6…`) : essai sur copie jetable | manifeste, `…/depart/`, `…/sorties/`, `…/apercu-B2/` | lancé une fois le 2026-11-01, code 0 |",
  "| `arbitrage-T8/application-B2/appliquer-B2.mjs` | B2 : préconditions, aperçu à l'empreinte relue et identique au fichier relu, sauvegarde, `sync-stable.mjs --appliquer` une fois, contrôles, trois remplacements seuls (`c6211016…`) ; `essayer-B2.mjs` (`dd67f6dd…`) : essai sur copie jetable | blocs `a2-05:etat`, `…/depart/`, `…/sorties/` | lancé une fois le 2026-11-01, code 0 |",
  "| `arbitrage-T8/consignation-finale/preparer-consignation-finale-T8.mjs` | préparation de cette consignation, sans application : versions proposées d'`ETAT-ACTUEL.md`, de `ROADMAP.md`, du bilan du volet 2 (§8.109) et de cet inventaire ; essai dans un clone jetable | `arbitrage-T8/consignation-finale/` | lancé le 2026-11-01 |",
];

// Préconditions
for (const [p, h] of Object.entries(DEPART)) ok(sha(readFileSync(join(root, p))) === h, 'P1 empreinte de départ : ' + p, h.slice(0, 12) + '…');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P2 ' + p + ' : deux fragments présents une fois'); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_J)).length === 1, 'P3 ancre du journal, une fois');
ok(!/^### 8\.109 /m.test(lire(BIL)) && /^### 8\.108 /m.test(lire(BIL)) && !S8109.some((l) => /^\| /.test(l)), 'P4 bilan : §8.108 présent, §8.109 absent ; §8.109 sans ligne de tableau');
ok(lire(INV).split('\n').filter((l) => l.startsWith(ANCRE_I)).length === 1 && !lire(INV).includes('| `arbitrage-T8/application-A/appliquer-A.mjs` |'), 'P5 inventaire : ancre présente, lignes absentes');
const cites = Object.entries(CITES).filter(([p, h]) => !sha(readFileSync(join(root, p))).startsWith(h)).map(([p]) => p); ok(!cites.length, 'P6 empreintes citées conformes au dépôt réel', cites.join(', ') || Object.keys(CITES).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P7 index vide');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// Versions proposées
const pilote = (p, j) => { const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z); if (j) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_J) ? [l, LIGNE_J] : [l])).join('\n'); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const bilan = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8109.join(eol) + eol; })();
const inventaire = (() => { const b = lire(INV); const eol = b.includes('\r\n') ? '\r\n' : '\n'; return b.split(eol).flatMap((l) => (l.startsWith(ANCRE_I) ? [l, ...LIGNES_I] : [l])).join(eol); })();
const prop = { [BIL]: bilan, [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [INV]: inventaire };
for (const p of [ETAT, ROAD]) ok(prop[p].match(BLOC)[0] === lire(p).match(BLOC)[0], 'V1 ' + p + ' : bloc a2-05:etat inchangé');
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**'));
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]).startsWith('- **Prochaine action.** La clôture documentaire de T8, sur autorisation distincte'), 'V2 « Prochaine action » identique dans les deux documents : clôture de T8, à autoriser');
ok(![...S8109, LIGNE_J].some((l) => /T8 (est )?close|T8 clôturée/.test(l.replace(/T8 n'est pas close/g, ''))), 'V3 aucun texte proposé ne clôt T8');

// Essai dans un clone jetable
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-consignation-finale-t8-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
for (const [p, t] of Object.entries(prop)) writeFileSync(f(p), t);
ok(JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify(Object.keys(prop).sort()), 'E1 quatre fichiers modifiés, aucun autre');
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 140);
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'E2 relais : 30 sur 30', fin(rel));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 43 rapports contrôlés, identiques/.test(emp.out), 'E3 manifeste : 43 empreintes', emp.out.slice(0, 80));
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'E4 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /336 arbitrés, 0 proposés, 41 restants, sur 377/.test(cov.out), 'E5 couverture : 336/377, 41 restants');
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const ch = readFileSync(f(APERCU), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)); const planApres = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; ok(ap.code === 0 && !ch.length, 'E6 aperçu de synchronisation vide après la consignation', fin(ap));
const et = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(v.corrections,v.entry,v.libre,v.reserves.join())"], { cwd: C, encoding: 'utf8' });
ok(et.stdout.trim() === '197 172 V1-25 V1-22,V1-23', 'E7 197 corrections dans 172 ENTRY ; V1-25 libre ; V1-22 et V1-23 réservés', et.stdout.trim());
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
