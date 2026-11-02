// A2-05 · T8 : préparation de la consignation des opérations E1, E2 et E3, EN PROPOSITION : versions proposées d'ETAT-ACTUEL.md, de ROADMAP.md, du bilan du volet 2
// (§8.107) et de l'inventaire, par remplacements ciblés ; essai dans un clone jetable ; dépôt réel inchangé. L'audit de T8 n'est ouvert par aucun de ces textes.
// Usage : node a2-05-travail/arbitrage-T8/consignation-T8/preparer-consignation-T8.mjs <racine du dépôt>
// Sorties dans consignation-T8/, seulement sans écart ; refus si diffs/ existe. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-T8/consignation-T8/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', APERCU = W + 'sync-stable-apercu.md';
const DEPART = { [ETAT]: '1a536449dcfc9015d93a9878d03b84d3cd3be27880b49abd84a290c429f627e9', [ROAD]: '4344d31e882f42146f5117ce395763ed48542e06db7617be383c9776e75e37d0', [BIL]: '02f39e124f9a923890cc167b2788b7ba5f4679204461978f0f4cf064d83ac349', [INV]: '5c7f3ac396108ec2221563bac5f6d3de353142929e899d9d1f6988ed352efea9' };
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
  ["hors du manifeste, ajout non autorisé) ; audit des 16 sens non autorisé (bilan du volet 2, §8.106) (relais", "**protégé au manifeste le 2026-10-31 (42e entrée)**, et bloc d'état synchronisé (consolidation appliquée en trois états, E1 à E3, chacun sur autorisation distincte)) ; audit des 16 sens non autorisé (bilan du volet 2, §8.106 et §8.107) (relais"],
  ["La protection du périmètre accepté de T8 (`docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md`) au manifeste (42e entrée) et la synchronisation du bloc d'état, puis l'audit individuel des 16 sens de T8, chacun sur autorisation distincte (bilan du volet 2, §8.106) ; puis, chacun sur autorisation distincte :", "L'audit individuel des 16 sens de T8, sur autorisation distincte, dans les frontières du §0 du périmètre (`docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md`), le périmètre accepté étant protégé au manifeste (42e entrée) et le bloc d'état synchronisé (bilan du volet 2, §8.107) ; puis, chacun sur autorisation distincte :"],
];
const ANCRE_J = "| 2026-10-31 | 2 · A2-05 | **Consignation de T7 appliquée**, sur autorisation (quatre diffs relus";
const LIGNE_J = "| 2026-10-31 | 2 · A2-05 | **Consolidation du périmètre de T8 appliquée en trois états, chacun sur autorisation distincte** (ChatGPT, par délégation), chaque script essayé sur une copie jetable avant son lancement unique sur le dépôt réel : E1, documents, recalcul adapté et proposition sauvegardée (90 vérifications conformes ; relais 29 sur 30, C9a seul) ; E2, 42e entrée (36 ; manifeste `c4d49fa6…` ; relais 30 sur 30) ; E3, bloc d'état synchronisé (32 ; plan `89f690215382c8a7` ; marqueur `43ab94fc376f9fa1`). Audit des 16 sens non autorisé. **320/377, 57 restants ; 197 corrections dans 172 ENTRY, non appliquées ; V1-25 libre ; 42 empreintes.** | non committé |";
const S8107 = [
  "### 8.107 Volet 1, lot 3 : consolidation du périmètre de T8 appliquée (E1 à E3) : recalcul de T8 adapté, périmètre accepté au manifeste (42e entrée), bloc d'état synchronisé (2026-10-31)",
  '',
  "Décisions du 2026-10-31 (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : « **J'accepte la consolidation proposée et autorise exclusivement l'application de l'étape E1.** » ; « **J'accepte E1 et autorise exclusivement E2 : l'ajout du rapport de périmètre T8 accepté comme 42e entrée du manifeste.** » ; « **J'accepte E2 et autorise exclusivement l'application d'E3, au plan `89f690215382c8a7`.** »",
  '',
  "**Préparation de la consolidation** (`a2-05-travail/arbitrage-T8/preparer-consolidation-T8.mjs`, sur un clone jetable, code 0, 40 vérifications conformes, cinq sabotages du recalcul adapté détectés). Premier lancement, code 1 : l'attendu du préparateur prévoyait le relais à 29 sur 30 après la 42e entrée, l'état simulé rendant 30 sur 30 ; l'attendu était faux, seul le compteur d'empreintes restant à synchroniser ; aucune sortie écrite.",
  '',
  "**E1 (2026-10-31)** (`a2-05-travail/arbitrage-T8/application-E1/appliquer-E1.mjs`, `d3d1f10e…`, essayé sur une copie jetable par `essayer-E1.mjs`, puis lancé une fois sur le dépôt réel, code 0, 90 vérifications conformes, dont 34 avant écriture) : sept diffs relus appliqués par remplacements ciblés ; proposition initiale sauvegardée (`a2-05-travail/arbitrage-T8/proposition-T8-perimetre.md`, `c087860f…`) ; rapport accepté `5b46f935…` ; recalcul de T8 adapté `3b23634c…` ; originaux dans `…/application-E1/depart/`. Après : relais 29 sur 30, C9a seul, état intermédiaire attendu.",
  '',
  "**Préparation d'E2** (`…/preparation-E2/preparer-E2.mjs`, `a21bb375…`, sur une copie jetable, code 0, sept sabotages détectés sur sept).",
  '',
  "**E2 (2026-10-31)** (`…/application-E2/appliquer-E2.mjs`, `7d9a3dfb…`, essayé sur une copie jetable par `essayer-E2.mjs`, puis lancé une fois sur le dépôt réel, code 0, 36 vérifications conformes) : prévisualisation du jour par l'outil sur une copie du dépôt réel ; manifeste de départ sauvegardé (`d1097663…`) ; `empreintes-lot3.mjs --ajouter` une fois, ajout daté du 2026-10-31 ; manifeste écrit identique à la prévisualisation (`c4d49fa6…`) ; 42 entrées, les 41 précédentes inchangées dans leur ordre, le périmètre accepté de T8 en 42e ; relais 30 sur 30.",
  '',
  "**E3 (2026-10-31)** (`…/application-E3/appliquer-E3.mjs`, `877f97bb…`, essayé sur une copie jetable par `essayer-E3.mjs`, puis lancé une fois sur le dépôt réel, code 0, 32 vérifications conformes) : aperçu relancé à l'empreinte relue (`8057ea52…`) ; plan `89f690215382c8a7`, recalculé sur le dépôt réel, de même valeur que celui de la simulation parce que le plan se déduit du contenu ; `ETAT-ACTUEL.md` et `ROADMAP.md` sauvegardés ; `sync-stable.mjs --appliquer` une fois. Marqueur `91a1ad1b112928af` → `43ab94fc376f9fa1`, « 41 » → « 42 rapports arbitrés identiques » ; hors de ces deux changements, les deux documents sont identiques octet pour octet à leurs originaux ; blocs identiques ; aperçu suivant vide ; relais 30 sur 30. Le renforcement prévu de P4 (comparaison au fichier d'aperçu relu) n'a pas été inscrit au script, le remplacement ayant été refusé ; P4 a comparé l'aperçu à l'empreinte complète relue, celle du fichier relu, vérifiée après coup.",
  '',
  "**Portée** : le §8.106 (« le périmètre accepté n'est pas ajouté au manifeste (41 empreintes) ») et les lignes antérieures du journal décrivent l'état à la date de leur rédaction ; ils ne sont pas modifiés. Les rubriques d'état courant et la « Prochaine action » d'`ETAT-ACTUEL.md` et de `ROADMAP.md` sont actualisées à l'identique. Les traces complètes sont dans `a2-05-travail/arbitrage-T8/application-E1/` à `application-E3/` (`sorties/`).",
  '',
  "Audit des 16 sens non autorisé ; aucune décision lexicale ; registre des tranches non modifié ; T9 et bloc F non ouverts. Décomptes : 320/377, 57 restants ; bloc B 148/148 ; 197 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 retenue, V1-25 libre ; 42 empreintes ; bloc d'état synchronisé. Aucun `git add`, commit ni push.",
];
const ANCRE_I = '| `arbitrage-T8/preparer-consolidation-T8.mjs` |';
const LIGNES_I = [
  "| `arbitrage-T8/application-E1/appliquer-E1.mjs` | état E1 : préconditions, diffs régénérés identiques aux diffs relus, sauvegarde, sept hunks relus par remplacements ciblés, proposition sauvegardée, contrôles (`d3d1f10e…`) ; `essayer-E1.mjs` (`a2709c2b…`) : essai sur copie jetable | sept fichiers, `arbitrage-T8/proposition-T8-perimetre.md`, `…/depart/`, `…/diffs-reels/`, `…/sorties/` | lancé une fois le 2026-10-31, code 0 |",
  "| `arbitrage-T8/preparation-E2/preparer-E2.mjs` | préparation d'E2 sur copie jetable, sept sabotages (`a21bb375…`) | `…/preparation-E2/sortie/` | lancé le 2026-10-31, code 0 |",
  "| `arbitrage-T8/application-E2/appliquer-E2.mjs` | état E2 : préconditions, prévisualisation du jour, sauvegarde, 42e entrée une fois, contrôles, aperçu E3 (`7d9a3dfb…`) ; `essayer-E2.mjs` (`8965206a…`) : essai sur copie jetable | manifeste, `…/depart/`, `…/sorties/`, `…/apercu-E3/` | lancé une fois le 2026-10-31, code 0 |",
  "| `arbitrage-T8/application-E3/appliquer-E3.mjs` | état E3 : préconditions, aperçu à l'empreinte relue, sauvegarde, `sync-stable.mjs --appliquer` une fois, contrôles, marqueur et compteur seuls (`877f97bb…`) ; `essayer-E3.mjs` (`470aeb48…`) : essai sur copie jetable | blocs `a2-05:etat`, `…/depart/`, `…/sorties/` | lancé une fois le 2026-10-31, code 0 |",
  "| `arbitrage-T8/consignation-T8/preparer-consignation-T8.mjs` | préparation de cette consignation, sans application : versions proposées d'`ETAT-ACTUEL.md`, de `ROADMAP.md`, du bilan du volet 2 (§8.107) et de cet inventaire ; essai dans un clone jetable | `arbitrage-T8/consignation-T8/` | lancé le 2026-10-31 |",
];

// Préconditions
for (const [p, h] of Object.entries(DEPART)) ok(sha(readFileSync(join(root, p))) === h, 'P1 empreinte de départ : ' + p, h.slice(0, 12) + '…');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P2 ' + p + ' : deux fragments présents une fois'); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_J)).length === 1, 'P3 ancre du journal, une fois');
ok(!/^### 8\.107 /m.test(lire(BIL)) && /^### 8\.106 /m.test(lire(BIL)) && !S8107.some((l) => /^\| /.test(l)), 'P4 bilan : §8.106 présent, §8.107 absent ; §8.107 sans ligne de tableau');
ok(lire(INV).split('\n').filter((l) => l.startsWith(ANCRE_I)).length === 1 && !lire(INV).includes('appliquer-E1.mjs` | état E1 : préconditions, diffs'), 'P5 inventaire : ancre présente, lignes absentes');
ok(sha(readFileSync(join(root, W + 'arbitrage-T8/application-E2/apercu-E3/apercu.md'))) === '8057ea52a70a9c4325f768454ed40e86b6567fe64308d8a24f351b2d926c363a', 'P6 fichier d\'aperçu relu à l\'empreinte complète exigée par E3 (vérification citée au §8.107)');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P7 index vide');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// Versions proposées
const pilote = (p, j) => { const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z); if (j) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_J) ? [l, LIGNE_J] : [l])).join('\n'); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const bilan = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8107.join(eol) + eol; })();
const inventaire = (() => { const b = lire(INV); const eol = b.includes('\r\n') ? '\r\n' : '\n'; return b.split(eol).flatMap((l) => (l.startsWith(ANCRE_I) ? [l, ...LIGNES_I] : [l])).join(eol); })();
const prop = { [BIL]: bilan, [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [INV]: inventaire };
for (const p of [ETAT, ROAD]) ok(prop[p].match(BLOC)[0] === lire(p).match(BLOC)[0], 'V1 ' + p + ' : bloc a2-05:etat inchangé');

// Essai dans un clone jetable
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-consignation-t8-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
for (const [p, t] of Object.entries(prop)) writeFileSync(f(p), t);
ok(JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify(Object.keys(prop).sort()), 'E1 quatre fichiers modifiés, aucun autre');
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 140);
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'E2 relais : 30 sur 30', fin(rel));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 42 rapports contrôlés, identiques$/.test(emp.out), 'E3 manifeste : 42 empreintes', emp.out);
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'E4 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /320 arbitrés, 0 proposés, 57 restants, sur 377/.test(cov.out), 'E5 couverture : 320/377, 57 restants');
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const ch = readFileSync(f(APERCU), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)); ok(ap.code === 0 && !ch.length, 'E6 aperçu de synchronisation vide après la consignation', fin(ap));
const et = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(v.corrections,v.entry,v.libre,v.reserves.join())"], { cwd: C, encoding: 'utf8' });
ok(et.stdout.trim() === '197 172 V1-25 V1-22,V1-23', 'E7 197 corrections dans 172 ENTRY ; V1-25 libre ; V1-22 et V1-23 réservés', et.stdout.trim());
const asm = spawnSync(process.execPath, [f('tools/reconstruction/run.mjs'), 'assemble'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(asm.status === 0, 'E8 assemblage réel', 'code ' + asm.status);
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: C, encoding: 'utf8' }).stdout.trim() && spawnSync('git', ['diff', '--check'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }).status === 0, 'E9 copie : index vide ; git diff --check conforme');

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
