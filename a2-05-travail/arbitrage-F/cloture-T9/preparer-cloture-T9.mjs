// A2-05 · T9 : préparation de la consignation de la clôture documentaire et de l'inscription des deux scripts finaux, EN PROPOSITION : versions proposées d'ETAT-ACTUEL.md, de
// ROADMAP.md, du bilan du volet 2 (§8.114) et de l'inventaire, par remplacements ciblés ; essai dans un clone jetable ; dépôt réel inchangé. Le §8.113 et le journal historique ne changent pas.
// Usage : node a2-05-travail/arbitrage-F/cloture-T9/preparer-cloture-T9.mjs <racine du dépôt>
// Sorties dans cloture-T9/, seulement sans écart ; refus si diffs/ existe. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/cloture-T9/', A = W + 'arbitrage-T9/consignation-T9/application/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', APERCU = W + 'sync-stable-apercu.md', REG = W + 'registre-tranches.json';
const DEPART = { [ETAT]: 'd9a2a2f7ae3fe2c9e17d20b08356b7e10883144e7182e335e13790645baade17', [ROAD]: 'fcdaa47173516322de767ad21df3c2e5b1b5ca95d0e79f6d672cede11ba62b03', [BIL]: 'fb60295d0076225896747bf61e3d489467038a26e012e48d6d7ffc0dcf718b7a', [INV]: '018b40bc87b6f257bebb69ac520b0951a7ee243f9fb17f3e79e4a97ed95dc3b6' };
const CITES = { [A + 'appliquer-consignation-T9.mjs']: 'adb55457', [A + 'essayer-consignation-T9.mjs']: '7a98881e', 'docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre.md': 'ff461724', 'docs/rapports/etape2-A2-05-bloc-F-analyse-E5.md': null };
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
  ["; bilan du volet 2, §8.106 à §8.113) (relais", "; **T9 close le 2026-11-01** (clôture documentaire définitive autorisée : 24 sens, 17 conformes, 7 écarts, 0 suspendu ; V1-25 à V1-31 retenues, non appliquées ; décisions historiques non rouvertes) ; bilan du volet 2, §8.106 à §8.114) (relais"],
  ["La clôture documentaire de T9, sur autorisation distincte, le rapport arbitré (`docs/rapports/etape2-A2-05-volet1-lot3-T9.md`) étant protégé au manifeste (45e entrée) et le bloc d'état synchronisé (bilan du volet 2, §8.113) ; puis, chacun sur autorisation distincte :", "La décision sur la révision 4 de la proposition d'addendum E5 (`docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md`) et celle sur le point de commit, chacune sur autorisation distincte, T9 étant close, le périmètre préparatoire de F accepté et le bloc F suspendu (bilan du volet 2, §8.114) ; puis, chacun sur autorisation distincte :"],
];
const ANCRE_J = '| 2026-11-01 | 2 · A2-05 | **Consolidation technique de T9 arbitrée achevée';
const LIGNE_J = "| 2026-11-01 | 2 · A2-05 | **Consignation de T9 appliquée**, sur autorisation (quatre diffs relus ; 80 vérifications conformes, dont 34 avant écriture ; essai sur copie, 12 refus sur 12) ; **T9 close** (clôture documentaire définitive autorisée ; 24 sens, 17 conformes, 7 écarts, 0 suspendu ; V1-25 à V1-31 retenues, non appliquées). **Périmètre de F accepté comme préparatoire** (17 sens, 15 ENTRY, lignes 361 à 377 ; une seule tranche F ; ni protégé au manifeste, ni périmètre opérationnel de contrôle). E5 n'est pas adopté. **360/377, 17 restants, tous du bloc F ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 45 empreintes.** | non committé |";
const S8114 = [
  "### 8.114 Volet 1, lot 3 : consignation de T9 appliquée ; T9 close ; périmètre préparatoire de F accepté (F1, F2 ; 17 sens, 15 ENTRY) (2026-11-01)",
  '',
  "Décisions du 2026-11-01 (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : « **J'accepte B2 et autorise exclusivement l'application ciblée des quatre diffs préparés dans `arbitrage-T9/consignation-T9/`.** » ; « **J'accepte la consignation finale et autorise la clôture documentaire définitive de T9.** » ; « **J'accepte le périmètre de F comme préparatoire : 17 sens dans 15 ENTRY, lignes 361 à 377, sans ajout, retrait ni déplacement.** »",
  '',
  "**Consignation de T9** (`a2-05-travail/arbitrage-T9/consignation-T9/application/appliquer-consignation-T9.mjs`, `adb55457…`, essayé sur une copie jetable par `essayer-consignation-T9.mjs`, `7a98881e…`, douze refus sur douze, puis lancé une fois sur le dépôt réel, code 0, 80 vérifications conformes, dont 34 avant écriture) : les quatre diffs relus appliqués par remplacements ciblés ; diffs réels identiques aux diffs relus à partir du premier `@@` ; aperçu suivant vide ; relais 30 sur 30.",
  '',
  "**T9 close** : clôture documentaire définitive autorisée ; 24 sens, 17 conformes, 7 écarts, 0 suspendu ; V1-25 à V1-31 retenues, non appliquées ; V1-22 et V1-23 réservés ; décisions historiques non rouvertes.",
  '',
  "**Périmètre de F** (`docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre.md`, analyse `docs/rapports/etape2-A2-05-bloc-F-analyse-E5.md`) : accepté **comme préparatoire**, sans ajout, retrait ni déplacement ; **une seule tranche F**, F1 (11 sens) et F2 (6 sens). « Ce périmètre n'est pas encore le périmètre opérationnel de contrôle. » Il n'est pas protégé au manifeste et sera régénéré après l'adoption éventuelle d'E5. L'audit du bloc F n'est pas ouvert ; aucun filtre de recherche d'omissions n'est exécuté.",
  '',
  "**E5** : préparation de l'arbitrage normatif autorisée, adoption non autorisée. A10 reste seulement un numéro pressenti. La proposition en service reste la révision 3 tant que la révision 4 n'est pas acceptée.",
  '',
  "**Portée** : le §8.113 et les lignes antérieures du journal décrivent l'état à la date de leur rédaction ; ils ne sont pas modifiés. L'inventaire reçoit `appliquer-consignation-T9.mjs` et `essayer-consignation-T9.mjs`, par leurs chemins complets.",
  '',
  "**Restes signalés, non ouverts** : le statut « planifiée » de T7, de T8 et de T9 dans `registre-tranches.json` ; l'état daté de `CLAUDE.md`, §5 ; le défaut de date de `empreintes-lot3.mjs` ; l'arrêt en erreur de `sync-stable.mjs` sur certains états et la date figée de son aperçu ; S21 de `sabotages-recalcul-T9.mjs` et `correction-comparables/essais.mjs --apres-application` ; les scripts d'`arbitrage-F/` et `perimetre-F.mjs`, hors de l'inventaire ; les empreintes du manifeste, calculées sur les octets, qui ne concordent pas avec un checkout propre sous `core.autocrlf=true`.",
  '',
  "Le bloc F et E5 ne sont pas ouverts ; aucune décision lexicale nouvelle ; registre des tranches non modifié. Décomptes : 360/377, 17 restants, tous du bloc F ; bloc B 148/148 ; 204 corrections dans 177 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-32 libre ; 45 empreintes ; bloc d'état synchronisé. Aucun `git add`, commit ni push.",
];
const ANCRE_I = '| `arbitrage-T9/consignation-T9/preparer-consignation-T9.mjs` |';
const LIGNES_I = [
  "| `arbitrage-T9/consignation-T9/application/appliquer-consignation-T9.mjs` | application de la consignation de T9 : préconditions, diffs régénérés identiques aux diffs relus, sauvegarde, quatre hunks relus par remplacements ciblés, contrôles (`adb55457…`) | bilan, `ETAT-ACTUEL.md`, `ROADMAP.md`, inventaire, `…/application/depart/`, `…/diffs-reels/`, `…/sorties/` | lancé une fois le 2026-11-01, code 0, 80 vérifications |",
  "| `arbitrage-T9/consignation-T9/application/essayer-consignation-T9.mjs` | essai de ce script sur une copie jetable : douze refus, exécution nominale, seconde exécution refusée (`7a98881e…`) | `…/application/sorties/essai.txt` | code 0 |",
];

// Préconditions
for (const [p, h] of Object.entries(DEPART)) ok(sha(readFileSync(join(root, p))) === h, 'P1 empreinte de départ : ' + p, h.slice(0, 12) + '…');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P2 ' + p + ' : deux fragments présents une fois'); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_J)).length === 1, 'P3 ancre du journal, une fois');
ok(!/^### 8\.114 /m.test(lire(BIL)) && /^### 8\.113 /m.test(lire(BIL)) && !S8114.some((l) => /^\| /.test(l)), 'P4 bilan : §8.113 présent, §8.114 absent ; §8.114 sans ligne de tableau');
ok(lire(INV).split('\n').filter((l) => l.startsWith(ANCRE_I)).length === 1 && !lire(INV).includes('appliquer-consignation-T9.mjs') && !lire(INV).includes('essayer-consignation-T9.mjs'), 'P5 inventaire : ancre présente, deux scripts absents');
const cites = Object.entries(CITES).filter(([p, h]) => !existsSync(join(root, p)) || (h && !sha(readFileSync(join(root, p))).startsWith(h))).map(([p]) => p); ok(!cites.length, 'P6 fichiers et empreintes cités conformes au dépôt réel', cites.join(', ') || Object.keys(CITES).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P7 index vide');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// Versions proposées
const pilote = (p, j) => { const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z); if (j) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_J) ? [l, LIGNE_J] : [l])).join('\n'); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const bilan = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8114.join(eol) + eol; })();
const inventaire = (() => { const b = lire(INV); const eol = b.includes('\r\n') ? '\r\n' : '\n'; return b.split(eol).flatMap((l) => (l.startsWith(ANCRE_I) ? [l, ...LIGNES_I] : [l])).join(eol); })();
const prop = { [BIL]: bilan, [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [INV]: inventaire };
for (const p of [ETAT, ROAD]) ok(prop[p].match(BLOC)[0] === lire(p).match(BLOC)[0], 'V1 ' + p + ' : bloc a2-05:etat inchangé');
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**'));
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]).startsWith("- **Prochaine action.** La décision sur la révision 4 de la proposition d'addendum E5 (`docs/"), 'V2 « Prochaine action » identique dans les deux documents');
const b0 = lire(BIL).replace(/(\r?\n)+$/, ''); ok(bilan.startsWith(b0) && bilan.slice(b0.length).split('### 8.').length === 2, 'V3 §8.113 et bilan antérieur inchangés, §8.114 seul ajouté');
ok(inventaire.split('\n').length === lire(INV).split('\n').length + 2 && lire(INV).split('\n').every((l) => inventaire.split('\n').includes(l)), 'V4 inventaire : deux lignes ajoutées, aucune ligne existante modifiée');
ok(![...S8114, LIGNE_J].some((l) => /A10 (est )?adopt|E5 (est )?adopté/.test(l.replace(/E5 n'est pas adopté/g, ''))), 'V5 aucun texte proposé n\'adopte E5');

// Essai dans un clone jetable
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-cloture-t9-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
for (const [p, t] of Object.entries(prop)) writeFileSync(f(p), t);
ok(JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify(Object.keys(prop).sort()), 'E1 quatre fichiers modifiés, aucun autre');
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 140);
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'E2 relais : 30 sur 30', fin(rel) + ' ' + rel.out.split('\n').filter((l) => /^\s*(ÉCART|FAUX)/.test(l)).map((l) => l.trim().slice(0, 220)).join(' | '));
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
dire('constat  plan attendu après application de cette consignation : ' + planApres);

// Sorties
if (!ko) {
  const d = join(root, OUT); mkdirSync(join(d, 'diffs'), { recursive: true }); const tab = [];
  for (const [p, t] of Object.entries(prop)) { const nom = p.split('/').pop(); writeFileSync(join(d, nom), t); const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, 'diffs', nom + '.diff'), r.stdout); const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; tab.push('| `' + p + '` | `' + DEPART[p] + '` | `' + sha(Buffer.from(t, 'utf8')) + '` | `' + sha(r.stdout) + '` | +' + n('+') + ' / −' + n('-') + ' |'); }
  writeFileSync(join(d, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n');
}
rmSync(tmp, { recursive: true, force: true });
const chR = diffI(reel0, instantane(root)); ok(!chR.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation de la clôture de T9 conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
