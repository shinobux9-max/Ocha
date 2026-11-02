// A2-05 · T7 : préparation de la consignation des opérations A, B1 et B2, EN PROPOSITION : versions proposées d'ETAT-ACTUEL.md, de ROADMAP.md, du bilan du
// volet 2 (§8.105) et de l'inventaire, par remplacements ciblés ; essai dans un clone jetable ; dépôt réel inchangé. T7 n'est pas close par ces textes.
// Usage : node a2-05-travail/arbitrage-T7/consignation-T7/preparer-consignation-T7.mjs <racine du dépôt>
// Sorties dans consignation-T7/, seulement sans écart ; refus si diffs/ existe. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T = W + 'arbitrage-T7/', OUT = T + 'consignation-T7/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md';
const DEPART = { [ETAT]: '065d5c2359848093a76c0001d947addc9ddaccbb8bb02eee943ca6e57d05911a', [ROAD]: '7e2b81a75bb851759f49172ac25b20bf57a286c4ccd3209582a660f0f6d9eae4', [BIL]: '8e8190775108d24eb58cf9085e67970575c1773f30c82cb2d0653e27251e3b6c', [INV]: '6a30f68a965058722f44acd4cbcd52a14c494b27c1d780736203fa70087e18f3' };
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
  ['; bilan du volet 2, §8.102 à §8.104) (relais', "; bilan du volet 2, §8.102 à §8.104) ; **inscription de T7 appliquée (étape A), rapport arbitré au manifeste (B1, 41e entrée) et bloc d'état synchronisé (B2, plan `9a8a65f735b1859f`) le 2026-10-31**, chacun sur autorisation distincte ; **relais 30 sur 30** ; **consolidation technique de T7 achevée**, en attente de relecture avant sa clôture définitive (bilan du volet 2, §8.105) (relais"],
  ["La protection du rapport arbitré de T7 (`docs/rapports/etape2-A2-05-volet1-lot3-T7.md`) au manifeste (41e entrée), la synchronisation du bloc d'état et la clôture documentaire de T7, chacune sur autorisation distincte, T8 n'étant pas préparée (bilan du volet 2, §8.104) ; puis, chacun sur autorisation distincte :", "La clôture documentaire de T7 (`docs/rapports/etape2-A2-05-volet1-lot3-T7.md`), sur autorisation distincte, T8 n'étant pas préparée (bilan du volet 2, §8.105) ; puis, chacun sur autorisation distincte :"],
];
const ANCRE_J = '| 2026-10-31 | 2 · A2-05 | **Audit des 24 sens de T7 livré en proposition, puis T7 arbitrée**';
const LIGNE_J = "| 2026-10-31 | 2 · A2-05 | **Inscription de T7 appliquée (étape A), rapport arbitré au manifeste (B1, 41e entrée) et bloc d'état synchronisé (B2, plan `9a8a65f735b1859f`)**, chacun sur autorisation distincte, chaque script essayé sur une copie jetable avant son lancement unique sur le dépôt réel (66, 37 et 29 vérifications conformes). Relais 28 sur 30, puis 29, puis **30 sur 30**. **Consolidation technique de T7 achevée**, T7 non close. **320/377, 57 restants ; 197 corrections dans 172 ENTRY, non appliquées ; V1-25 libre ; 41 empreintes.** | non committé |";
const S8105 = [
  "### 8.105 Volet 1, lot 3 : inscription de T7 appliquée (étape A) ; rapport arbitré au manifeste (41e entrée, B1) ; bloc d'état synchronisé (B2) ; consolidation technique de T7 achevée (2026-10-31)",
  '',
  "Décisions du 2026-10-31 (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : trois points confirmés, « **197 corrections dans 172 ENTRY**, et non 173, car `v_427` possède déjà V2-67 et V2-68 » ; « **V1-24 est une correction retenue**, non une proposition réservée » ; « **L'adaptation du contrôle du bilan du pilote est acceptée**, telle que préparée et relue » ; puis « **J'accepte l'étape A et autorise exclusivement B1** » ; « **J'accepte B1 et autorise exclusivement B2, au plan `9a8a65f735b1859f`.** »",
  '',
  "**Étape A** (`a2-05-travail/arbitrage-T7/application-A/appliquer-A.mjs`, `fac4355d…`, essayé sur une copie jetable par `essayer-A.mjs`, puis lancé une fois sur le dépôt réel, code 0, 66 vérifications conformes, dont 32 avant écriture) : les sept différences relues appliquées, chaque diff régénéré étant identique au diff relu ; proposition initiale sauvegardée dans `a2-05-travail/arbitrage-T7/proposition-T7.md` (`a5548994…`) ; originaux dans `…/application-A/depart/`. Rapport de T7 `84bdbd3f…` ; recalcul de T7 `80e51286…` ; contrôle du pilote `beddc981…`. Après : 320/377, 57 restants ; 197 corrections dans 172 ENTRY, aucune appliquée ; V1-25 libre ; 40 empreintes ; relais 28 sur 30, C8 et C9a, état intermédiaire attendu.",
  '',
  "**Préparation de l'étape B** (`…/preparation-B/preparer-B.mjs`, `c2073dbc…`, sur une copie jetable, code 0, sept sabotages détectés sur sept). Premier lancement, code 1 : un écart dans le harnais seul, dont le filtre ignorait les lignes d'aperçu commençant par `+-` ; aucune sortie écrite, aucun outil modifié ; filtre corrigé, second lancement conforme.",
  '',
  "**B1** (`…/application-B1/appliquer-B1.mjs`, `33957a0b…`, essayé sur une copie jetable par `essayer-B1.mjs`, puis lancé une fois sur le dépôt réel, code 0, 37 vérifications conformes) : prévisualisation par l'outil sur une copie du dépôt réel, faute de mode d'aperçu de `--ajouter` ; manifeste de départ sauvegardé (`f5b5be5c…`) ; `empreintes-lot3.mjs --ajouter` une fois, ajout daté du 2026-10-31 ; manifeste écrit identique à la prévisualisation (`d1097663…`) ; 41 entrées, les 40 précédentes inchangées dans leur ordre, le rapport arbitré de T7 en 41e ; relais 29 sur 30, C8 seul, état intermédiaire attendu.",
  '',
  "**B2** (`…/application-B2/appliquer-B2.mjs`, `603bd5c1…`, essayé sur une copie jetable par `essayer-B2.mjs`, puis lancé une fois sur le dépôt réel, code 0, 29 vérifications conformes) : aperçu relancé identique à l'aperçu relu (`25c1bf4f…`) ; plan `9a8a65f735b1859f`, recalculé sur le dépôt réel, de même valeur que celui de la simulation parce que le plan se déduit du contenu ; `ETAT-ACTUEL.md` et `ROADMAP.md` sauvegardés ; `sync-stable.mjs --appliquer` une fois. Marqueur `32631bf599ee77a2` → `91a1ad1b112928af` ; hors des blocs, les deux documents sont identiques octet pour octet à leurs originaux ; blocs identiques ; aperçu suivant vide ; **relais 30 sur 30**.",
  '',
  "**Portée** : le §8.104 et les lignes antérieures du journal décrivent l'état à la date de leur rédaction ; ils ne sont pas modifiés. Les rubriques d'état courant et la « Prochaine action » d'`ETAT-ACTUEL.md` et de `ROADMAP.md` sont actualisées à l'identique. L'inventaire reçoit les scripts de T7, dont `appliquer-consignation-E1-E4.mjs`, resté en attente depuis la consignation d'E1 à E4. Les traces complètes sont dans `a2-05-travail/arbitrage-T7/application-A/`, `application-B1/` et `application-B2/` (`sorties/`).",
  '',
  "**Consolidation technique de T7 achevée** ; T7 n'est pas close : sa clôture documentaire définitive relève d'une autorisation distincte. T8 n'est pas préparée. Décomptes : 320/377, 57 restants ; bloc B 148/148 ; 197 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 retenue, V1-25 libre ; 41 empreintes ; bloc d'état synchronisé. Aucun `git add`, commit ni push.",
];
const ANCRE_I = '| `arbitrage-T7/consignation-E2-E4/preparer-consignation-E2-E4.mjs` |';
const LIGNES_I = [
  "| `arbitrage-T7/application-consignation-E1-E4/appliquer-consignation-E1-E4.mjs` | application de la consignation documentaire d'E1 à E4 : préconditions, versions relues, contrôles (`ed0e85ca…`) ; inscription à l'inventaire différée sur décision du 2026-10-31 | `ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2 (§8.103), cet inventaire ; `…/depart/`, `…/sorties/` | lancé une fois, code 0 |",
  "| `audit-v1-lot3-T7.mjs` | audit individuel des 24 sens de T7 (D1, D4), en proposition : configuration (fiches d'examen, verdicts) passée au module commun v2, mode bloquant | `docs/rapports/etape2-A2-05-volet1-lot3-T7.md` | lancé le 2026-10-31, code 0 : 22 conformes, 1 écart, 1 suspendu |",
  "| `audit-v1-lot3-T7.mjs`, arbitrage du 2026-10-31 | constante `ARBITRAGE` renseignée (23 conformes, 1 écart, 0 suspendu ; 向こう conforme, lecture A ; V1-24 retenue) ; installée par l'étape A (`7b628fa1…`) | même rapport (`84bdbd3f…`), statut et §0 seuls | régénération sur copie, code 0 ; jamais relancée sur le dépôt réel |",
  "| `arbitrage-T7/audit/controle-audit-T7.mjs` | contrôle indépendant de l'audit en proposition (n'importe aucun module v2) : §1 contre les données, traductions contre les fiches, exemples, décisions, manifeste ; `--sabotages` ; décrit l'état d'avant l'arbitrage | `arbitrage-T7/audit/sortie-controle-audit-T7.txt` | lancé le 2026-10-31, code 0 : 24 sur 24, 14 sabotages sur 14 |",
  "| `arbitrage-T7/preparer-inscription-T7.mjs` | préparation de l'inscription de l'arbitrage de T7, dans un clone jetable : versions proposées, étape A, sabotages, étape B simulée | `arbitrage-T7/inscription/` | lancé le 2026-10-31, code 0 (`42b286ce…`) |",
  "| `recalcul-T7-perimetre.mjs`, adaptation du 2026-10-31 | contrôles historiques conservés ; « examinés dans le seul rapport de T7, arbitré » ; 296 sens de la clôture de T6 fixés par leur empreinte ; V1-24 ; rapport arbitré contre sa proposition ; version `80e51286…`, installée par l'étape A | — (sortie standard) | code 0 |",
  "| `controle-bilan-pilote.mjs`, adaptation du 2026-10-31 | liste historique V1-1 à V1-21 exigée pour les numéros antérieurs à V1-24 ; version `beddc981…`, installée par l'étape A | — (sortie standard) | code 0 |",
  "| `arbitrage-T7/application-A/appliquer-A.mjs` | étape A : préconditions, diffs régénérés identiques aux diffs relus, sauvegarde, sept fichiers remplacés, proposition sauvegardée, contrôles (`fac4355d…`) ; `essayer-A.mjs` (`2fe1730a…`) : essai sur copie jetable | sept fichiers, `arbitrage-T7/proposition-T7.md`, `…/depart/`, `…/sorties/` | lancé une fois le 2026-10-31, code 0 |",
  "| `arbitrage-T7/preparation-B/preparer-B.mjs` | préparation de B1 et de B2 sur copie jetable, sept sabotages (`c2073dbc…`) | `…/preparation-B/sortie/` | lancé le 2026-10-31, code 1 au premier lancement (harnais), puis code 0 |",
  "| `arbitrage-T7/application-B1/appliquer-B1.mjs` | B1 : préconditions, prévisualisation, sauvegarde, ajout de la 41e entrée une fois, contrôles, aperçu B2 (`33957a0b…`) ; `essayer-B1.mjs` (`94e388a6…`) : essai sur copie jetable | manifeste, `…/depart/`, `…/sorties/`, `…/apercu-B2/` | lancé une fois le 2026-10-31, code 0 |",
  "| `arbitrage-T7/application-B2/appliquer-B2.mjs` | B2 : préconditions, aperçu identique à l'aperçu relu, sauvegarde, `sync-stable.mjs --appliquer` une fois, contrôles (`603bd5c1…`) ; `essayer-B2.mjs` (`749d0e59…`) : essai sur copie jetable | blocs `a2-05:etat`, `…/depart/`, `…/sorties/` | lancé une fois le 2026-10-31, code 0 |",
  "| `arbitrage-T7/consignation-T7/preparer-consignation-T7.mjs` | préparation de cette consignation, sans application : versions proposées d'`ETAT-ACTUEL.md`, de `ROADMAP.md`, du bilan du volet 2 (§8.105) et de cet inventaire ; essai dans un clone jetable | `arbitrage-T7/consignation-T7/` | lancé le 2026-10-31 |",
];

// Préconditions
for (const [p, h] of Object.entries(DEPART)) ok(sha(readFileSync(join(root, p))) === h, 'P1 empreinte de départ : ' + p, h.slice(0, 12) + '…');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P2 ' + p + ' : deux fragments présents une fois'); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_J)).length === 1, 'P3 ancre du journal, une fois');
ok(!/^### 8\.105 /m.test(lire(BIL)) && /^### 8\.104 /m.test(lire(BIL)), 'P4 bilan : §8.104 présent, §8.105 absent');
ok(lire(INV).split('\n').filter((l) => l.startsWith(ANCRE_I)).length === 1 && !lire(INV).includes('appliquer-consignation-E1-E4.mjs') && !lire(INV).includes('audit-v1-lot3-T7.mjs'), 'P5 inventaire : ancre présente, scripts de T7 absents');
ok(!S8105.some((l) => /^\| /.test(l)), 'P6 §8.105 : aucune ligne de tableau, les comptes ne changent pas');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P7 index vide');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// Versions proposées
const pilote = (p, journal) => { const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z); if (journal) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_J) ? [l, LIGNE_J] : [l])).join('\n'); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const bilan = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8105.join(eol) + eol; })();
const inventaire = (() => { const b = lire(INV); const eol = b.includes('\r\n') ? '\r\n' : '\n'; return b.split(eol).flatMap((l) => (l.startsWith(ANCRE_I) ? [l, ...LIGNES_I] : [l])).join(eol); })();
const prop = { [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [BIL]: bilan, [INV]: inventaire };
for (const p of [ETAT, ROAD]) ok(prop[p].match(BLOC)[0] === lire(p).match(BLOC)[0], 'V1 ' + p + ' : bloc a2-05:etat inchangé');

// Essai dans un clone jetable
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-consignation-t7-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
for (const [p, t] of Object.entries(prop)) writeFileSync(f(p), t);
ok(JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify(Object.keys(prop).sort()), 'E1 quatre fichiers modifiés, aucun autre');
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 140);
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'E2 relais : 30 sur 30', fin(rel));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 41 rapports contrôlés, identiques$/.test(emp.out), 'E3 manifeste : 41 empreintes', emp.out);
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'E4 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /320 arbitrés, 0 proposés, 57 restants, sur 377/.test(cov.out), 'E5 couverture : 320/377, 57 restants');
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const ch = readFileSync(f(APERCU), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
ok(ap.code === 0 && !ch.length, 'E6 aperçu de synchronisation vide après la consignation', fin(ap));
const et = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(v.corrections,v.entry,v.libre,v.reserves.join())"], { cwd: C, encoding: 'utf8' });
ok(et.stdout.trim() === '197 172 V1-25 V1-22,V1-23', 'E7 197 corrections dans 172 ENTRY ; V1-25 libre ; V1-22 et V1-23 réservés', et.stdout.trim());
const asm = spawnSync(process.execPath, [f('tools/reconstruction/run.mjs'), 'assemble'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(asm.status === 0, 'E8 assemblage réel', 'code ' + asm.status);
ok(!/T7 close|\bT8 préparée/.test(S8105.join(' ').replace(/T7 n'est pas close/g, '')), 'E9 les textes ne closent pas T7 et ne préparent pas T8');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: C, encoding: 'utf8' }).stdout.trim() && spawnSync('git', ['diff', '--check'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }).status === 0, 'E10 copie : index vide ; git diff --check conforme');

// Sorties
if (!ko) {
  const d = join(root, OUT); mkdirSync(join(d, 'diffs'), { recursive: true }); const tab = [];
  for (const [p, t] of Object.entries(prop)) { const nom = p.split('/').pop(); writeFileSync(join(d, nom), t); const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, 'diffs', nom + '.diff'), r.stdout); const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; tab.push('| `' + p + '` | `' + DEPART[p] + '` | `' + sha(Buffer.from(t)) + '` | `' + sha(r.stdout) + '` | +' + n('+') + ' / −' + n('-') + ' |'); }
  writeFileSync(join(d, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n');
}
rmSync(tmp, { recursive: true, force: true });
const chR = diffI(reel0, instantane(root)); ok(!chR.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation de la consignation conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
