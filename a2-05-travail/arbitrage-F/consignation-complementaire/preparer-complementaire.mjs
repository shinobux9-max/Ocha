// A2-05 : préparation, sans application, de la consignation complémentaire (§8.116), en deux variantes : « sans » (règle complémentaire, inventaire) et « avec » (la même, plus l'installation de l'alternative).
// La variante « avec » ne s'applique qu'après l'installation effective. Le §8.115, le journal historique et les blocs d'état ne changent pas ; essai dans un clone jetable ; dépôt réel inchangé.
// L'alternative étant installée, seule la variante « avec » se régénère ; « sans » reste en l'état, et la version relue précédente dans avec-version-relue-1/.
// Usage : node a2-05-travail/arbitrage-F/consignation-complementaire/preparer-complementaire.mjs <racine du dépôt>. Sorties dans avec/, seulement sans écart ; refus s'il existe. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { diffBrut } from '../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', AF = W + 'arbitrage-F/', OUT = AF + 'consignation-complementaire/', RG = AF + 'references-git/', VERIFS_INSTALLATION = 67, REFUS_INSTALLATION = 15;
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', APERCU = W + 'sync-stable-apercu.md', RAP = 'docs/rapports/etape2-A2-05-preparation-avant-checkpoint.md', DOS = 'docs/rapports/etape2-A2-05-checkpoint-T9-dossier.md';
const DEPART = { [ETAT]: '98571b28561da5651a7486876424a02caf1507a3dbfd40f68e979f7436b6fe21', [ROAD]: '2ed035cc43421e05b5ca70d6eb242ef1b67f6ba1e1579707e9235fe34ea3b794', [BIL]: '9702e17291b18c22f143b66ed24728ac1595efeeaeb0b8db228c3d3d4d77f40e', [INV]: '6fa8b33b9aeee4dae9cbd27d0a651b084895eb7837b571b918011e57721d0cbf' };
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'], BLOC = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
const sha = (b) => createHash('sha256').update(b).digest('hex');
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); }; const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const lire = (p) => readFileSync(join(root, p), 'utf8'); const LFs = (t) => t.replace(/\r\n/g, '\n');
const h8 = (p) => sha(readFileSync(join(root, p))).slice(0, 8) + '…';
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || p.startsWith(OUT) || p.startsWith(RG + 'application/depart') || p.startsWith(RG + 'application/sorties') || p.startsWith(RG + 'application/diffs-reels')) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
if (existsSync(join(root, OUT, 'avec'))) { console.log('ARRÊT : ' + OUT + 'avec existe déjà'); process.exit(1); }

const PA_AVANT = "Le point de commit : les décisions et applications préalables, chacune sur autorisation distincte (`" + RAP + "`), la régénération du dossier (`" + DOS + "`), puis l'accord de commit et l'accord de push, chacun distinct ; T9 est close, le périmètre préparatoire de F accepté, le bloc F suspendu, et la révision 4 de la proposition d'addendum E5 en service, non adoptée (bilan du volet 2, §8.115) ; puis, chacun sur autorisation distincte :";
const PA = {
  sans: PA_AVANT.replace('(bilan du volet 2, §8.115)', '(bilan du volet 2, §8.116)'),
  avec: "Le point de commit : la régénération du dossier (`" + DOS + "`), l'accord de commit et l'accord de push, chacun distinct, puis la déclaration de la référence, le commit de clôture, le second push et `a2-05-travail/cloture-checkpoint.mjs --verifier`, chacun sur autorisation distincte ; T9 est close, le périmètre préparatoire de F accepté, le bloc F suspendu, et la révision 4 de la proposition d'addendum E5 en service, non adoptée (bilan du volet 2, §8.116) ; puis, chacun sur autorisation distincte :",
};
const FRAGMENTS = (v) => [['; bilan du volet 2, §8.106 à §8.115) (relais', '; bilan du volet 2, §8.106 à §8.116) (relais'], [PA_AVANT, PA[v]]];
const ANCRE_J = "| 2026-11-02 | 2 · A2-05 | **Révision 4 de la proposition d'addendum E5 appliquée**";
const LIGNE_J = (v) => "| 2026-11-02 | 2 · A2-05 | **Règle complémentaire du `.gitattributes` appliquée**, sur autorisation (10 refus sur 10 à l'essai, 43 vérifications conformes), après la consignation du §8.115. **Sélection de checkpoint rectifiée**, 27 scripts rétablis, acceptée comme périmètre préparatoire." + (v === 'avec' ? " **Alternative sur les références Git installée**, sur autorisation (" + REFUS_INSTALLATION + " refus sur " + REFUS_INSTALLATION + " à l'essai, " + VERIFS_INSTALLATION + " vérifications conformes) : `references-git.json` et `cloture-checkpoint.mjs` posés ; aucune référence déclarée." : '') + " Le §8.115 et le journal antérieur ne sont pas réécrits. **360/377, 17 restants, tous du bloc F ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 45 empreintes.** | non committé |";
const S8116 = (v) => [
  "### 8.116 Volet 1, lot 3 : règle complémentaire du `.gitattributes` appliquée" + (v === 'avec' ? ' ; alternative sur les références Git installée' : '') + " ; inventaire actualisé (2026-11-02)",
  '',
  "Décisions du 2026-11-02 (ChatGPT, par délégation ; relayées par l'utilisateur) : « J'autorise exclusivement l'application ciblée des quatre diffs approuvés » ; « j'autorise l'ajout ciblé de : `/REGLES-CONSTRUCTION.md -text` » ; « J'accepte l'intégration des 27 scripts précédemment exclus par erreur. » ; « Préparer avec l'alternative, mais sans appliquer, une courte consignation »" + (v === 'avec' ? ", puis l'autorisation distincte d'installer l'alternative ; « J'accepte l'installation de l'alternative Git et ses contrôles. »" : '.'),
  '',
  "**Consignation du §8.115 appliquée** (`a2-05-travail/arbitrage-F/consignation-avant-checkpoint/application/appliquer-consignation.mjs`, `" + h8(AF + 'consignation-avant-checkpoint/application/appliquer-consignation.mjs') + "`, douze refus sur douze, lancé une fois, code 0, 76 vérifications conformes).",
  '',
  "**Règle complémentaire appliquée** (`a2-05-travail/arbitrage-F/complement-gitattributes/application/appliquer-complement.mjs`, `" + h8(AF + 'complement-gitattributes/application/appliquer-complement.mjs') + "`, dix refus sur dix, lancé une fois, code 0, 43 vérifications conformes) : `/REGLES-CONSTRUCTION.md -text` ; `.gitattributes` `da81234c…`, non committé ; `REGLES-CONSTRUCTION.md` inchangé, octet pour octet ; aucune renormalisation ; traces mixtes inchangées.",
  '',
  ...(v === 'avec' ? ["**Alternative sur les références Git installée** (`a2-05-travail/arbitrage-F/references-git/application/appliquer-installation.mjs`, `" + h8(RG + 'application/appliquer-installation.mjs') + "`, " + REFUS_INSTALLATION + " refus sur " + REFUS_INSTALLATION + ", lancé une fois, code 0, " + VERIFS_INSTALLATION + " vérifications conformes) : `a2-05-travail/references-git.json`, sans référence déclarée ; `a2-05-travail/cloture-checkpoint.mjs` ; C5a, C8, C9c et C10a modifiés ; ligne « Git » du relais en service. C10c, le candidat, les versions figées, leur manifeste et `CLAUDE.md` sont inchangés. **Règle, arbitrée** : le relais en service ne peut différer de sa version figée que par sa seule ligne « Git », à la forme exacte fixée par le contrôle. **Doctrine** : toute clôture de checkpoint exige `cloture-checkpoint.mjs --verifier`, qui lance le relais en `--strict` ; **un relais normal à 30 sur 30 n'est jamais la preuve d'une clôture Git**. Un checkpoint passe par six états : commit N, push, déclaration, commit de clôture, second push, vérification.", ''] : []),
  "**Inventaire** : les lignes du 2026-11-02 décrivaient comme « préparés » deux scripts lancés depuis ; elles ne sont pas modifiées, et de nouvelles lignes donnent l'état courant, ainsi que les empreintes actuelles de `moteur-application.mjs` et d'`essayer-application.mjs`, modifiés depuis.",
  '',
  "**Sélection de checkpoint** : la règle d'exclusion retirait à tort 27 scripts ; rétablie, la sélection initiale comptait 344 fichiers, acceptée comme périmètre préparatoire, non comme accord de commit. Elle a évolué depuis, avec les scripts et les fichiers créés par les préparations et l'installation ; aucun total n'est arrêté ici : il sera fixé par le dossier de checkpoint régénéré (`" + DOS + "`).",
  '',
  "**Preuves historiques** : le §8.115 et sa ligne de journal disent la règle complémentaire « préparée, non appliquée » : c'était exact à leur rédaction, et ils ne sont pas réécrits.",
  '',
  "**Restes signalés, non ouverts** : `CLAUDE.md`, §5, ligne 128, à arbitrer" + (v === 'avec' ? ", qui deviendra inexacte après le checkpoint" : '') + " ; le statut « planifiée » des tranches ; le défaut de date de `empreintes-lot3.mjs` ; `sync-stable.mjs` ; S21 de `sabotages-recalcul-T9.mjs` et `correction-comparables/essais.mjs --apres-application`.",
  '',
  "Le bloc F n'est pas ouvert ; aucun filtre de recherche d'omissions n'est exécuté ; E5 n'est pas adopté ; A10 n'est pas installé. Décomptes : 360/377, 17 restants, tous du bloc F ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 45 empreintes ; bloc d'état inchangé. Aucun `git add`, commit ni push.",
];
const ANCRE_I = '| `arbitrage-F/consignation-avant-checkpoint/application/appliquer-consignation.mjs` |';
const avecH = (p) => '(`' + h8(W + p) + '`)';
const LIGNES_I = (v) => [
  ['arbitrage-F/consignation-avant-checkpoint/application/appliquer-consignation.mjs', 'état courant ; ligne précédente : préparation', 'bilan, `ETAT-ACTUEL.md`, `ROADMAP.md`, inventaire', 'lancé une fois le 2026-11-02, code 0, 76 vérifications'],
  ['arbitrage-F/complement-gitattributes/application/appliquer-complement.mjs', 'état courant ; ligne précédente : préparation', '`.gitattributes`', 'lancé une fois le 2026-11-02, code 0, 43 vérifications'],
  ['arbitrage-F/moteur-application.mjs', 'empreinte actuelle, après l\'ajout de `diffBrut` et des fichiers nouveaux ' + avecH('arbitrage-F/moteur-application.mjs'), '`…/application/depart/`, `…/diffs-reels/`, `…/sorties/`', 'en service'],
  ['arbitrage-F/essayer-application.mjs', 'empreinte actuelle, après l\'ajout de deux modes ' + avecH('arbitrage-F/essayer-application.mjs'), 'aucun fichier du dépôt', 'en service'],
  ['arbitrage-F/checkpoint/verifier-selection.mjs', 'vérification de la sélection : scripts rétablis, artefacts, exhaustivité ; lecture seule sur git', '`arbitrage-F/checkpoint/`', 'lancé le 2026-11-02'],
  ['arbitrage-F/references-git/application/appliquer-installation.mjs', 'installation de l\'alternative sur les références Git, deux diffs relus et deux fichiers nouveaux', '`controle-relais-allege.mjs`, `docs/relecture/reprise-A2-05.md`, `references-git.json`, `cloture-checkpoint.mjs`', v === 'avec' ? 'lancé une fois, code 0, ' + VERIFS_INSTALLATION + ' vérifications' : 'préparé, non lancé ; autorisation distincte'],
  ['arbitrage-F/consignation-complementaire/preparer-complementaire.mjs', 'préparation de la présente consignation, deux variantes, essai sur clone jetable', '`arbitrage-F/consignation-complementaire/`', 'lancé le 2026-11-02'],
  ['arbitrage-F/consignation-complementaire/application/appliquer-complementaire.mjs', 'application de la présente consignation, variante `avec` ou `sans`', 'bilan, `ETAT-ACTUEL.md`, `ROADMAP.md`, inventaire', 'lancé une fois, sur autorisation'],
  ...(v === 'avec' ? [['cloture-checkpoint.mjs', 'seul chemin pour déclarer une référence ; `--declarer`, `--verifier`, `--etat` ; toute clôture exige `--verifier`, qui lance le relais en `--strict`', '`references-git.json`', 'installé ; aucune référence déclarée'],
    ['arbitrage-F/references-git/verifier-installation.mjs', 'vérification de l\'alternative installée, dérivée d\'`evaluer-references.mjs`, qui ne se relance pas après installation : contrôles du dépôt réel, clôture, sabotages et restaurations, sur copie jetable ' + avecH('arbitrage-F/references-git/verifier-installation.mjs'), '`arbitrage-F/references-git/sortie-verification-installee.txt`, `mesures-installees.json`', 'lancé le 2026-11-02, code 0, 86 vérifications']] : []),
].map(([s, r, e, t]) => '| `' + s + '` | ' + r + ' | ' + e + ' | ' + t + ' |');

// Préconditions
for (const [p, h] of Object.entries(DEPART)) ok(sha(readFileSync(join(root, p))) === h, 'P1 empreinte de départ : ' + p, h.slice(0, 12) + '…');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS('avec').every(([a]) => t.split(a).length === 2), 'P2 ' + p + ' : deux fragments présents une fois'); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_J)).length === 1, 'P3 ancre du journal, une fois');
ok(!/^### 8\.116 /m.test(lire(BIL)) && /^### 8\.115 /m.test(lire(BIL)) && !S8116('avec').some((l) => /^\| /.test(l)), 'P4 bilan : §8.115 présent, §8.116 absent');
ok(lire(INV).split('\n').filter((l) => l.startsWith(ANCRE_I)).length === 1, 'P5 inventaire : ancre présente, une fois');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P6 index vide');
ok(existsSync(join(root, W + 'references-git.json')) && existsSync(join(root, W + 'cloture-checkpoint.mjs')) && /installation conforme\s*$/.test(lire(RG + 'application/sorties/application.txt')), 'P7 alternative installée sur le dépôt réel, trace de l\'application');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

const proposer = (v) => {
  const pilote = (p, j) => { const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS(v)) t = t.replace(a, () => z); if (j) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_J) ? [l, LIGNE_J(v)] : [l])).join('\n'); return crlf ? t.replace(/\n/g, '\r\n') : t; };
  const bilan = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8116(v).join(eol) + eol; })();
  const inventaire = (() => { const b = lire(INV); const eol = b.includes('\r\n') ? '\r\n' : '\n'; return b.split(eol).flatMap((l) => (l.startsWith(ANCRE_I) ? [l, ...LIGNES_I(v)] : [l])).join(eol); })();
  return { [BIL]: bilan, [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [INV]: inventaire };
};
const reel0 = instantane(root); const plans = {};
const essayer = (v, prop) => {
  for (const p of [ETAT, ROAD]) ok(prop[p].match(BLOC)[0] === lire(p).match(BLOC)[0], 'V1 ' + v + ', ' + p + ' : bloc a2-05:etat inchangé');
  const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**')); ok(pa(prop[ETAT]) === pa(prop[ROAD]), 'V2 ' + v + ' : « Prochaine action » identique dans les deux documents');
  const b0 = lire(BIL).replace(/(\r?\n)+$/, ''); ok(prop[BIL].startsWith(b0) && prop[BIL].slice(b0.length).split('### 8.').length === 2, 'V3 ' + v + ' : §8.115 et bilan antérieur inchangés, §8.116 seul ajouté');
  ok(lire(INV).split('\n').every((l) => prop[INV].split('\n').includes(l)), 'V4 ' + v + ' : inventaire, aucune ligne existante modifiée', LIGNES_I(v).length + ' lignes ajoutées');
  const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(lire(ETAT)), j1 = jr(prop[ETAT]); ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'V5 ' + v + ' : journal antérieur conservé, une ligne ajoutée');
  ok((v === 'avec') === prop[BIL].slice(b0.length).includes('installée') && !prop[INV].split('\n').some((l) => l.startsWith('| `cloture-checkpoint.mjs` |')) === (v === 'sans'), 'V6 ' + v + ' : l\'installation n\'est consignée que dans la variante « avec »');
  const tmp = mkdtempSync(join(tmpdir(), 'ocha-complementaire-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
  spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
  for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip') && e !== '.gitattributes') cpSync(join(root, e), join(C, e), { recursive: true });
  spawnSync('git', ['update-index', '-q', '--refresh'], { cwd: C }); cpSync(join(root, '.gitattributes'), f('.gitattributes'));
  const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
  const fin = (r) => r.out.split('\n').pop().slice(0, 120);
  for (const [p, t] of Object.entries(prop)) writeFileSync(f(p), t);
  const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'E1 ' + v + ' : relais 30 sur 30', fin(rel) + ' ' + rel.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim().slice(0, 200)).join(' | '));
  for (const [n, s] of [['empreintes', W + 'empreintes-lot3.mjs'], ['couverture', W + 'couverture-lot3.mjs'], ['pilote', W + 'controle-bilan-pilote.mjs'], ...[5, 6, 7, 8, 9].map((x) => ['recalcul de T' + x, W + 'recalcul-T' + x + '-perimetre.mjs'])]) { const r = lancer(s); ok(r.code === 0, 'E2 ' + v + ' : ' + n, 'code ' + r.code); }
  const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const ch = readFileSync(f(APERCU), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)); plans[v] = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; ok(ap.code === 0 && !ch.length, 'E3 ' + v + ' : aperçu vide', fin(ap));
  ok(spawnSync('git', ['diff', '--check'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }).status === 0, 'E4 ' + v + ' : git diff --check');
  rmSync(tmp, { recursive: true, force: true });
};
const P = { avec: proposer('avec') }; essayer('avec', P.avec);

// Sorties
if (!ko) for (const v of ['avec']) {
  const d = join(root, OUT, v); mkdirSync(join(d, 'diffs'), { recursive: true }); const tab = [];
  for (const [p, t] of Object.entries(P[v])) { const nom = p.split('/').pop(); writeFileSync(join(d, nom), t); const r = diffBrut(root, p, OUT + v + '/' + nom); ok(r.status === 1 && !r.stdout.includes('\r'), 'diff ciblé, sans CR : ' + v + ', ' + nom); writeFileSync(join(d, 'diffs', nom + '.diff'), r.stdout); const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; tab.push('| `' + p + '` | `' + DEPART[p] + '` | `' + sha(Buffer.from(t, 'utf8')) + '` | `' + sha(r.stdout) + '` | +' + n('+') + ' / −' + n('-') + ' |'); }
  writeFileSync(join(d, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n\nPlan attendu après application : `' + plans[v] + '`\n');
}
const chR = diffI(reel0, instantane(root)); ok(!chR.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation complémentaire conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
