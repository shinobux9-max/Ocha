// A2-05 : préparation, sans application, de la consignation avant checkpoint : révision 4 d'E5, clôture de T9, mentions et `.gitattributes` appliqués ; « Prochaine action » ; inventaire.
// Versions proposées d'ETAT-ACTUEL.md, de ROADMAP.md, du bilan du volet 2 (§8.115) et de l'inventaire, par remplacements ciblés ; essai dans un clone jetable ; dépôt réel inchangé.
// Le §8.114, le journal historique et les blocs d'état ne changent pas. Usage : node a2-05-travail/arbitrage-F/consignation-avant-checkpoint/preparer-consignation.mjs <racine du dépôt>
// Sorties dans ce dossier, seulement sans écart ; refus si diffs/ existe. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { diffBrut } from '../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', AF = W + 'arbitrage-F/', OUT = AF + 'consignation-avant-checkpoint/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', APERCU = W + 'sync-stable-apercu.md', REG = W + 'registre-tranches.json', PROP = 'docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md';
const DEPART = { [ETAT]: '0d2da75966ea5b7b6f3e61ff5f86e540b97b7ddb93668b0da3ea1b011eb8559b', [ROAD]: '9861dc97a40db6cb6c0370d840edaa5ef4f245605695563161184d40c0ce5d33', [BIL]: 'fb2045d393e81bdb7633215952be8ab8ed1ab735b62e6ad7e8012a2d7c8d9a7f', [INV]: '42456677d17b726728e85323b9e51db3ba2a24e11512b5d5cbdcdd5ab022421d' };
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'], BLOC = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
const sha = (b) => createHash('sha256').update(b).digest('hex');
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); }; const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const lire = (p) => readFileSync(join(root, p), 'utf8'); const LFs = (t) => t.replace(/\r\n/g, '\n');
const h8 = (p) => sha(readFileSync(join(root, p))).slice(0, 8) + '…';
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || p.startsWith(OUT)) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
if (existsSync(join(root, OUT, 'diffs'))) { console.log('ARRÊT : ' + OUT + 'diffs existe déjà'); process.exit(1); }

const FRAGMENTS = [
  ['; bilan du volet 2, §8.106 à §8.114) (relais', '; bilan du volet 2, §8.106 à §8.115) (relais'],
  ["La décision sur la révision 4 de la proposition d'addendum E5 (`docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md`) et celle sur le point de commit, chacune sur autorisation distincte, T9 étant close, le périmètre préparatoire de F accepté et le bloc F suspendu (bilan du volet 2, §8.114) ; puis, chacun sur autorisation distincte :",
   "Le point de commit : les décisions et applications préalables, chacune sur autorisation distincte (`docs/rapports/etape2-A2-05-preparation-avant-checkpoint.md`), la régénération du dossier (`docs/rapports/etape2-A2-05-checkpoint-T9-dossier.md`), puis l'accord de commit et l'accord de push, chacun distinct ; T9 est close, le périmètre préparatoire de F accepté, le bloc F suspendu, et la révision 4 de la proposition d'addendum E5 en service, non adoptée (bilan du volet 2, §8.115) ; puis, chacun sur autorisation distincte :"],
];
const ANCRE_J = '| 2026-11-01 | 2 · A2-05 | **Consignation de T9 appliquée**';
const LIGNE_J = "| 2026-11-02 | 2 · A2-05 | **Révision 4 de la proposition d'addendum E5 appliquée**, clôture documentaire de T9 appliquée, **trois mentions « révision 3 » actualisées**, **`.gitattributes` ciblé posé**, chacun sur autorisation distincte, essayé sur copie jetable puis lancé une fois (42, 76, 52 et 41 vérifications conformes). E5 reste une proposition non normative ; A10 n'est pas installé. Inventaire complété (`perimetre-F.mjs`, scripts d'`arbitrage-F/`). **Règle complémentaire du `.gitattributes` et alternative sur les références Git préparées, non appliquées.** **360/377, 17 restants, tous du bloc F ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 45 empreintes.** | non committé |";
const S8115 = [
  "### 8.115 Volet 1, lot 3 : révision 4 d'E5, clôture de T9, mentions et `.gitattributes` appliqués ; consignation avant checkpoint (2026-11-02)",
  '',
  "Décisions du 2026-11-01 (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : « J'accepte les modifications ciblées de la proposition E5 et autorise le remplacement de la révision 3 par la révision 4. » ; « J'autorise l'application ciblée des quatre diffs de clôture » ; application des trois mentions et pose du `.gitattributes` ciblé ; puis, avant checkpoint : « Je retiens la consignation préalable. »",
  '',
  "**Révision 4 appliquée** (`a2-05-travail/arbitrage-F/revision-4-E5/application/appliquer-revision-4.mjs`, `" + h8(AF + 'revision-4-E5/application/appliquer-revision-4.mjs') + "`, essayé sur une copie jetable, neuf refus sur neuf, lancé une fois, code 0, 42 vérifications conformes) : la proposition d'addendum passe de `f1ca707a…` à `98412587…` ; définition, frontières et méthode inchangées, octet pour octet. **E5 reste une proposition non normative ; A10 reste un numéro pressenti.** La révision 4 remplace la révision 3 décrite comme en service au §8.114, qui ne se réécrit pas.",
  '',
  "**Clôture documentaire de T9 appliquée** (`a2-05-travail/arbitrage-F/cloture-T9/application/appliquer-cloture-T9.mjs`, `" + h8(AF + 'cloture-T9/application/appliquer-cloture-T9.mjs') + "`, douze refus sur douze, lancé une fois, code 0, 76 vérifications conformes) : les quatre diffs relus, dont le §8.114. Le §8.114 décrit l'état à sa rédaction.",
  '',
  "**Trois mentions actualisées** (`a2-05-travail/arbitrage-F/mentions-revision-4/application/appliquer-mentions.mjs`, `" + h8(AF + 'mentions-revision-4/application/appliquer-mentions.mjs') + "`, neuf refus sur neuf, lancé une fois, code 0, 52 vérifications conformes) : rubriques d'état d'`ETAT-ACTUEL.md` et de `ROADMAP.md`. Les lignes de journal datées gardent « révision 3 », à bon droit.",
  '',
  "**`.gitattributes` ciblé posé** (`a2-05-travail/arbitrage-F/gitattributes/appliquer-gitattributes.mjs`, `" + h8(AF + 'gitattributes/appliquer-gitattributes.mjs') + "`, sept refus sur sept, lancé une fois, code 0, 41 vérifications conformes ; fichier `8efbae1e…`, non committé) : `-text` sur `a2-05-travail/`, `docs/`, `reconstruction/` et `data/`, `eol=crlf` sur les fichiers qui en ont besoin ; aucun blob ni fin de ligne modifiés. Diagnostic : `docs/rapports/etape2-A2-05-diagnostic-restauration-git.md`. Le défaut de restauration est levé à partir du commit qui portera ce fichier ; il n'est pas rétroactif. Les deux fichiers de trace mixtes restent inchangés.",
  '',
  "**Inventaire** : `perimetre-F.mjs` et les scripts d'`arbitrage-F/` y entrent, par leurs chemins complets ; les lignes existantes ne changent pas.",
  '',
  "**Portée** : le §8.114 et les lignes antérieures du journal ne sont pas modifiés. La présente sous-section consigne des applications documentaires et techniques : aucune décision lexicale, aucune norme, aucun registre, aucun des 45 documents protégés n'est touché.",
  '',
  "**Préparé, non appliqué** : la règle complémentaire `/REGLES-CONSTRUCTION.md -text` et l'alternative sur les références Git (`docs/rapports/etape2-A2-05-preparation-avant-checkpoint.md`). Le scénario C, qui réécrivait une version figée, n'est pas retenu.",
  '',
  "**Restes signalés, non ouverts** : le statut « planifiée » des tranches dans `registre-tranches.json` ; `CLAUDE.md`, §5, dont la ligne 128 ne se touche pas ; le défaut de date de `empreintes-lot3.mjs` ; l'arrêt en erreur de `sync-stable.mjs` sur certains états et la date figée de son aperçu ; S21 de `sabotages-recalcul-T9.mjs` et `correction-comparables/essais.mjs --apres-application`.",
  '',
  "Le bloc F n'est pas ouvert ; aucun filtre de recherche d'omissions n'est exécuté ; E5 n'est pas adopté. Décomptes : 360/377, 17 restants, tous du bloc F ; bloc B 148/148 ; 204 corrections dans 177 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-32 libre ; 45 empreintes ; bloc d'état inchangé. Aucun `git add`, commit ni push.",
];
const ANCRE_I = '| `arbitrage-T9/consignation-T9/application/essayer-consignation-T9.mjs` |';
const avecH = (p) => '(`' + h8(W + p) + '`)';
const LIGNES_I = [
  ['perimetre-F.mjs', "configuration du périmètre préparatoire du bloc F (F1, F2), produit par `perimetre-v2.mjs`, non modifié ; aucun verdict " + avecH('perimetre-F.mjs'), '`docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre.md`', 'périmètre accepté comme préparatoire, non protégé au manifeste'],
  ['arbitrage-F/controle-perimetre-F.mjs', "contrôle indépendant du périmètre préparatoire et de l'analyse d'E5, avec sabotages ; n'exécute aucun filtre " + avecH('arbitrage-F/controle-perimetre-F.mjs'), '`arbitrage-F/sortie-controle-perimetre-F.txt`', 'trace : exige `HEAD` à `7803163`'],
  ['arbitrage-F/preparer-inscription-scripts-T9.mjs', "préparation de l'inscription des deux scripts finaux de la consignation de T9 " + avecH('arbitrage-F/preparer-inscription-scripts-T9.mjs'), '`arbitrage-F/inscription-scripts-T9/`', 'lancé le 2026-11-01'],
  ['arbitrage-F/moteur-application.mjs', 'moteur commun des applications ciblées : préconditions, sauvegarde, hunks relus, contrôles ; aucun effet à l\'import ' + avecH('arbitrage-F/moteur-application.mjs'), '`…/application/depart/`, `…/diffs-reels/`, `…/sorties/`', 'en service'],
  ['arbitrage-F/essayer-application.mjs', 'essai d\'une application ciblée sur une copie jetable : refus, exécution nominale, seconde exécution refusée ' + avecH('arbitrage-F/essayer-application.mjs'), 'aucun fichier du dépôt', 'en service'],
  ['arbitrage-F/revision-4-E5/preparer-revision-4.mjs', "préparation de la révision 4 de la proposition d'addendum E5 " + avecH('arbitrage-F/revision-4-E5/preparer-revision-4.mjs'), '`arbitrage-F/revision-4-E5/`', 'lancé le 2026-11-01'],
  ['arbitrage-F/revision-4-E5/application/appliquer-revision-4.mjs', 'application de la révision 4 ' + avecH('arbitrage-F/revision-4-E5/application/appliquer-revision-4.mjs'), '`docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md`', 'lancé une fois le 2026-11-01, code 0, 42 vérifications'],
  ['arbitrage-F/cloture-T9/preparer-cloture-T9.mjs', 'préparation de la clôture documentaire de T9 ' + avecH('arbitrage-F/cloture-T9/preparer-cloture-T9.mjs'), '`arbitrage-F/cloture-T9/`', 'lancé le 2026-11-01'],
  ['arbitrage-F/cloture-T9/application/appliquer-cloture-T9.mjs', 'application de la clôture de T9, quatre diffs relus ' + avecH('arbitrage-F/cloture-T9/application/appliquer-cloture-T9.mjs'), 'bilan, `ETAT-ACTUEL.md`, `ROADMAP.md`, inventaire', 'lancé une fois le 2026-11-01, code 0, 76 vérifications'],
  ['arbitrage-F/mentions-revision-4/preparer-mentions.mjs', 'préparation de l\'actualisation des trois mentions « révision 3 » ' + avecH('arbitrage-F/mentions-revision-4/preparer-mentions.mjs'), '`arbitrage-F/mentions-revision-4/`', 'lancé le 2026-11-01'],
  ['arbitrage-F/mentions-revision-4/application/appliquer-mentions.mjs', 'application des trois mentions ' + avecH('arbitrage-F/mentions-revision-4/application/appliquer-mentions.mjs'), '`ETAT-ACTUEL.md`, `ROADMAP.md`', 'lancé une fois le 2026-11-01, code 0, 52 vérifications'],
  ['arbitrage-F/diagnostic-eol/diagnostic-restauration.mjs', 'diagnostic du défaut de restauration, six restaurations sur clones temporaires ' + avecH('arbitrage-F/diagnostic-eol/diagnostic-restauration.mjs'), '`arbitrage-F/diagnostic-eol/`, `docs/rapports/etape2-A2-05-diagnostic-restauration-git.md`', 'lancé le 2026-11-01'],
  ['arbitrage-F/gitattributes/appliquer-gitattributes.mjs', 'pose du `.gitattributes` ciblé ' + avecH('arbitrage-F/gitattributes/appliquer-gitattributes.mjs'), '`.gitattributes`, `arbitrage-F/gitattributes/sorties/`', 'lancé une fois le 2026-11-01, code 0, 41 vérifications'],
  ['arbitrage-F/gitattributes/essayer-gitattributes.mjs', 'essai de cette pose sur une copie jetable ' + avecH('arbitrage-F/gitattributes/essayer-gitattributes.mjs'), 'aucun fichier du dépôt', 'code 0'],
  ['arbitrage-F/checkpoint/dossier-checkpoint.mjs', 'dossier de checkpoint, en lecture seule sur le dépôt réel : listes, simulation de commit et de restauration sous `core.autocrlf=true` et `false`, sur clones temporaires ; `--attributs=` pour une simulation seule', '`docs/rapports/etape2-A2-05-checkpoint-T9-dossier.md`, `arbitrage-F/checkpoint/`', 'instantané, à régénérer avant tout commit'],
  ['arbitrage-F/complement-gitattributes/preparer-complement.mjs', 'préparation de la règle `/REGLES-CONSTRUCTION.md -text` : vérifications, diff, mesures sur clones jetables', '`arbitrage-F/complement-gitattributes/`', 'lancé le 2026-11-02 ; règle non appliquée'],
  ['arbitrage-F/complement-gitattributes/application/appliquer-complement.mjs', 'application de cette règle', '`.gitattributes`', 'préparé, non lancé ; autorisation distincte'],
  ['arbitrage-F/references-git/evaluer-references.mjs', 'évaluation sur copie jetable de l\'alternative sur les références Git : étapes, restaurations, sabotages ; aucun contrôle réel modifié', '`arbitrage-F/references-git/`', 'lancé le 2026-11-02 ; alternative non appliquée'],
  ['arbitrage-F/consignation-avant-checkpoint/preparer-consignation.mjs', 'préparation de la présente consignation : versions proposées, essai sur clone jetable', '`arbitrage-F/consignation-avant-checkpoint/`', 'lancé le 2026-11-02'],
  ['arbitrage-F/consignation-avant-checkpoint/application/appliquer-consignation.mjs', 'application de la présente consignation, quatre diffs relus', 'bilan, `ETAT-ACTUEL.md`, `ROADMAP.md`, inventaire', 'préparé ; autorisation distincte'],
].map(([s, r, e, t]) => '| `' + s + '` | ' + r + ' | ' + e + ' | ' + t + ' |');
const CITES = ['docs/rapports/etape2-A2-05-preparation-avant-checkpoint.md', 'docs/rapports/etape2-A2-05-checkpoint-T9-dossier.md', 'docs/rapports/etape2-A2-05-diagnostic-restauration-git.md', W + 'perimetre-F.mjs', PROP];

// Préconditions
for (const [p, h] of Object.entries(DEPART)) ok(sha(readFileSync(join(root, p))) === h, 'P1 empreinte de départ : ' + p, h.slice(0, 12) + '…');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P2 ' + p + ' : deux fragments présents une fois'); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_J)).length === 1, 'P3 ancre du journal, une fois');
ok(!/^### 8\.115 /m.test(lire(BIL)) && /^### 8\.114 /m.test(lire(BIL)) && !S8115.some((l) => /^\| /.test(l)), 'P4 bilan : §8.114 présent, §8.115 absent ; §8.115 sans ligne de tableau');
ok(lire(INV).split('\n').filter((l) => l.startsWith(ANCRE_I)).length === 1 && !lire(INV).includes('arbitrage-F/'), 'P5 inventaire : ancre présente, aucun script d\'`arbitrage-F/`');
const cites = CITES.filter((p) => !existsSync(join(root, p))); ok(!cites.length, 'P6 documents et scripts cités présents', cites.join(', ') || CITES.length + ' fichiers');
const absents = LIGNES_I.map((l) => l.match(/^\| `([^`]+)`/)[1]).filter((s) => !existsSync(join(root, W + s)) && !s.endsWith('appliquer-consignation.mjs')); ok(!absents.length, 'P6 bis scripts inscrits présents', absents.join(', ') || LIGNES_I.length + ' lignes');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P7 index vide');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// Versions proposées
const pilote = (p, j) => { const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z); if (j) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_J) ? [l, LIGNE_J] : [l])).join('\n'); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const bilan = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8115.join(eol) + eol; })();
const inventaire = (() => { const b = lire(INV); const eol = b.includes('\r\n') ? '\r\n' : '\n'; return b.split(eol).flatMap((l) => (l.startsWith(ANCRE_I) ? [l, ...LIGNES_I] : [l])).join(eol); })();
const prop = { [BIL]: bilan, [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [INV]: inventaire };
for (const p of [ETAT, ROAD]) ok(prop[p].match(BLOC)[0] === lire(p).match(BLOC)[0], 'V1 ' + p + ' : bloc a2-05:etat inchangé');
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**'));
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]).startsWith('- **Prochaine action.** Le point de commit :'), 'V2 « Prochaine action » identique dans les deux documents');
const b0 = lire(BIL).replace(/(\r?\n)+$/, ''); ok(bilan.startsWith(b0) && bilan.slice(b0.length).split('### 8.').length === 2, 'V3 §8.114 et bilan antérieur inchangés, §8.115 seul ajouté');
ok(inventaire.split('\n').length === lire(INV).split('\n').length + LIGNES_I.length && lire(INV).split('\n').every((l) => inventaire.split('\n').includes(l)), 'V4 inventaire : ' + LIGNES_I.length + ' lignes ajoutées, aucune ligne existante modifiée');
ok(![...S8115, LIGNE_J, pa(prop[ETAT])].some((l) => /A10 (est )?adopt|E5 (est )?adopté/.test(l.replace(/E5 n'est pas adopté/g, ''))), 'V5 aucun texte proposé n\'adopte E5');

// Essai dans un clone jetable
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-consignation-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
// Index rafraîchi avant la pose du `.gitattributes`, comme sur le dépôt réel : sinon, Git relirait les fichiers à fins de ligne mixtes sous `-text`
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip') && e !== '.gitattributes') cpSync(join(root, e), join(C, e), { recursive: true });
spawnSync('git', ['update-index', '-q', '--refresh'], { cwd: C }); cpSync(join(root, '.gitattributes'), f('.gitattributes'));
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
for (const [p, t] of Object.entries(prop)) writeFileSync(f(p), t);
ok(JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify(Object.keys(prop).sort()), 'E1 quatre fichiers modifiés, aucun autre');
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 140);
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'E2 relais : 30 sur 30', fin(rel) + ' ' + rel.out.split('\n').filter((l) => /^\s*(ÉCART|FAUX)/.test(l)).map((l) => l.trim().slice(0, 220)).join(' | '));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 45 rapports contrôlés, identiques/.test(emp.out), 'E3 manifeste : 45 empreintes', emp.out.slice(0, 80));
for (const [n, s] of [5, 6, 7, 8, 9].map((x) => ['recalcul de T' + x, W + 'recalcul-T' + x + '-perimetre.mjs']).concat([['contrôle du pilote', W + 'controle-bilan-pilote.mjs']])) { const r = lancer(s); ok(r.code === 0, 'E4 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
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
  for (const [p, t] of Object.entries(prop)) { const nom = p.split('/').pop(); writeFileSync(join(d, nom), t); const r = diffBrut(root, p, OUT + nom); ok(r.status === 1 && !r.stdout.includes('\r'), 'diff ciblé, sans CR : ' + nom); writeFileSync(join(d, 'diffs', nom + '.diff'), r.stdout); const n =(c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; tab.push('| `' + p + '` | `' + DEPART[p] + '` | `' + sha(Buffer.from(t, 'utf8')) + '` | `' + sha(r.stdout) + '` | +' + n('+') + ' / −' + n('-') + ' |'); }
  writeFileSync(join(d, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n');
}
rmSync(tmp, { recursive: true, force: true });
const chR = diffI(reel0, instantane(root)); ok(!chR.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation de la consignation conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
