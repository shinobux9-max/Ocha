// A2-05 · T9 : préparation de la consignation documentaire d'O1, d'O2, d'O3 et de la correction RES, EN PROPOSITION : versions proposées d'ETAT-ACTUEL.md, de ROADMAP.md, du bilan du
// volet 2 (§8.111) et de l'inventaire, par remplacements ciblés ; essai dans un clone jetable ; dépôt réel inchangé. L'audit de T9 n'est ouvert par aucun de ces textes.
// Usage : node a2-05-travail/arbitrage-T9/consignation-O1-O3-RES/preparer-consignation.mjs <racine du dépôt>
// Sorties dans consignation-O1-O3-RES/, seulement sans écart ; refus si diffs/ existe. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T = W + 'arbitrage-T9/', OUT = T + 'consignation-O1-O3-RES/', X = W + 'correction-res/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', APERCU = W + 'sync-stable-apercu.md', REG = W + 'registre-tranches.json', MAN = W + 'empreintes-rapports-arbitres.json', REC = W + 'recalcul-T9-perimetre.mjs';
const DEPART = { [ETAT]: '5d5e718e801c20ef649a4754fee05c660886c9ea9484463552e9d3a1f6d934c1', [ROAD]: 'fd56f0c571f093cf3ceb619841fbf67a79fa9053392b0202a7c9c6e3c8b9f8ca', [BIL]: '40193ee0faab8058e7fc45d235fd1662206201ba77e292c7dfa18ec5055054f8', [INV]: 'c716a1ef9a742a7674a1a721e3293c6e898d222a89aa8f4fccfc824b2401026b' };
const CITES = { // empreintes citées par le §8.111 et l'inventaire, vérifiées sur le dépôt réel
  [T + 'application-O1/appliquer-O1.mjs']: '77ae8067', [T + 'application-O1/essayer-O1.mjs']: 'f249ccad', [T + 'preparation-O2/preparer-O2.mjs']: '164fbf1b', [T + 'application-O2/appliquer-O2.mjs']: '79d6190c', [T + 'application-O2/essayer-O2.mjs']: 'e7826fbd',
  [T + 'application-O3/appliquer-O3.mjs']: 'b5a4a0ee', [T + 'application-O3/essayer-O3.mjs']: '73f4aa40', [X + 'preparer.mjs']: '0e54df03', [X + 'regeneration/preparer.mjs']: 'd09a6088', [X + 'application/appliquer-RES.mjs']: 'd334ac4f', [X + 'application/essayer-RES.mjs']: 'd5ab1aab',
  [W + 'perimetre-v2.mjs']: '6537c0ee', [REC]: 'af733154', [MAN]: '2c74018e',
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
  ["hors du manifeste, ajout non autorisé) ; audit des 24 sens non autorisé ; défaut « RES » non corrigé, contournement accepté pour la seule préparation du périmètre, voie A recommandée, proposition technique séparée ; bilan du volet 2, §8.106 à §8.110) (relais", "**protégé au manifeste le 2026-11-01 (44e entrée)**, bloc d'état synchronisé ; opérations O1, O2 et O3, chacune sur autorisation distincte) ; audit des 24 sens non autorisé ; **défaut « RES » corrigé le 2026-11-01**, sur autorisation technique distincte (voie A : motif de lecture de `perimetre-v2.mjs` étendu à RES, littéralement, une ligne ; empreinte du générateur adaptée dans `recalcul-T9-perimetre.mjs` ; 46 groupes historiques identiques ; marques non définies refusées ; aucune règle linguistique nouvelle, découpage arbitré non modifié) ; bilan du volet 2, §8.106 à §8.111) (relais"],
  ["La protection du périmètre accepté de T9 (`docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md`) au manifeste (44e entrée) et la synchronisation du bloc d'état, puis l'audit individuel des 24 sens de T9, chacun sur autorisation distincte (bilan du volet 2, §8.110) ; puis, chacun sur autorisation distincte :", "L'audit individuel des 24 sens de T9 (E1, E2, E3), sur autorisation distincte, le périmètre accepté (`docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md`) étant protégé au manifeste (44e entrée), le bloc d'état synchronisé et le défaut « RES » corrigé (bilan du volet 2, §8.111) ; puis, chacun sur autorisation distincte :"],
  [" la correction technique du défaut « RES » de T9, voie A recommandée, proposition séparée, non appliquée ;", ""],
];
const ANCRE_J = "| 2026-11-01 | 2 · A2-05 | **Consignation finale de T8 appliquée**, sur autorisation";
const LIGNE_J = "| 2026-11-01 | 2 · A2-05 | **Consolidation technique de T9 achevée en trois opérations, chacune sur autorisation distincte** (ChatGPT, par délégation), chaque script essayé sur une copie jetable avant son lancement unique sur le dépôt réel : O1, sept diffs relus et copie de la proposition (112 vérifications conformes ; relais 29 sur 30, C9a seul) ; O2, 44e entrée du manifeste (43 ; manifeste `2c74018e…` ; relais 30 sur 30) ; O3, bloc d'état synchronisé (40 ; plan `7d25ea8442b9dd06` ; marqueur `0e9d7a7423b2ef14`). **Défaut « RES » corrigé**, sur autorisation technique distincte (voie A ; 57 vérifications conformes ; générateur `6537c0ee…` ; 46 groupes historiques identiques). Audit des 24 sens non autorisé. **336/377, 41 restants ; 197 corrections dans 172 ENTRY, non appliquées ; V1-25 libre ; 44 empreintes.** | non committé |";
const S8111 = [
  "### 8.111 Volet 1, lot 3 : consolidation technique de T9 achevée (O1, O2, O3) ; défaut « RES » corrigé (2026-11-01)",
  '',
  "Décisions du 2026-11-01 (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : « **J'accepte les textes de consolidation de T9 et autorise exclusivement l'application ciblée de O1.** » ; « **J'accepte O1 et autorise exclusivement O2 : l'ajout du rapport de périmètre T9 accepté comme 44e entrée du manifeste.** » ; « **J'accepte O2 et autorise exclusivement l'application d'O3**, au plan `7d25ea8442b9dd06`. » ; « **J'accepte O3 et autorise exclusivement l'application technique des deux diffs RES régénérés après O3.** »",
  '',
  "**O1** (`a2-05-travail/arbitrage-T9/application-O1/appliquer-O1.mjs`, `77ae8067…`, essayé sur une copie jetable par `essayer-O1.mjs`, `f249ccad…`, seize refus sur seize, puis lancé une fois sur le dépôt réel, code 0, 112 vérifications conformes, dont 46 avant écriture) : sept diffs relus appliqués par remplacements ciblés ; proposition initiale copiée à l'identique (`a2-05-travail/arbitrage-T9/proposition-T9-perimetre.md`, `01b9bf83…`) ; rapport de périmètre accepté `85faf16c…` ; recalcul de T9 adapté, 33 contrôles ; relais 29 sur 30, C9a seul, état intermédiaire attendu. Originaux dans `…/application-O1/depart/`, diffs réels dans `…/diffs-reels/`.",
  '',
  "**O2** (préparée par `…/preparation-O2/preparer-O2.mjs`, `164fbf1b…` ; `…/application-O2/appliquer-O2.mjs`, `79d6190c…`, essayé par `essayer-O2.mjs`, `e7826fbd…`, treize refus sur treize, dont le refus de date, obtenu en lançant le script sous un fuseau où le jour local différait du jour UTC ; lancé une fois sur le dépôt réel, code 0, 43 vérifications conformes) : prévisualisation par l'outil réel sur une copie du dépôt ; manifeste sauvegardé (`eeeda756…`) ; `empreintes-lot3.mjs --ajouter` une fois, ajout daté du 2026-11-01, date UTC et jour local identiques ; manifeste écrit identique à la prévisualisation (`2c74018e…`) ; 44 entrées, les 43 précédentes inchangées dans leur ordre, le périmètre accepté de T9 en 44e ; relais 30 sur 30 ; aperçu de synchronisation rétabli sur le dépôt réel, le plan y étant recalculé et non repris de la simulation.",
  '',
  "**O3** (`…/application-O3/appliquer-O3.mjs`, `b5a4a0ee…`, essayé par `essayer-O3.mjs`, `73f4aa40…`, onze refus sur onze, puis lancé une fois sur le dépôt réel, code 0, 40 vérifications conformes) : aperçu relancé à l'empreinte complète exigée (`f12f3cc5…`), identique octet pour octet à l'aperçu relu ; `ETAT-ACTUEL.md` et `ROADMAP.md` sauvegardés ; `sync-stable.mjs --appliquer --plan 7d25ea8442b9dd06` une fois. Marqueur `5018d82d05d382aa` → `0e9d7a7423b2ef14`, 43 → 44 rapports arbitrés identiques ; chaque document égale sa sauvegarde augmentée de ces deux seuls remplacements, octet pour octet ; blocs identiques ; aperçu suivant vide ; relais 30 sur 30.",
  '',
  "**Défaut « RES » corrigé** (voie A, acceptée sur le fond ; `a2-05-travail/correction-res/application/appliquer-RES.mjs`, `d334ac4f…`, essayé par `essayer-RES.mjs`, `d5ab1aab…`, douze refus sur douze, puis lancé une fois sur le dépôt réel, code 0, 57 vérifications conformes) : `perimetre-v2.mjs`, une ligne, `C\\d+-[a-z0]` → `C\\d+-[a-z0]|RES`, RES étant reconnu littéralement (`d40aea3c…` → `6537c0ee…`) ; `recalcul-T9-perimetre.mjs`, deux lignes, constante d'empreinte du générateur et libellé de son contrôle (`63aaa07c…` → `af733154…`). Proposition d'origine et régénération d'après O3 : `a2-05-travail/correction-res/preparer.mjs` (`0e54df03…`) et `…/regeneration/preparer.mjs` (`d09a6088…`) ; premier lancement de la proposition d'origine en code 1, deux défauts des essais eux-mêmes, aucun contrôle assoupli ; diff et empreinte de recalcul d'origine caducs après O1. **Contrôles** : 46 groupes historiques identiques octet pour octet, ancien et corrigé ; génération de T9, 24 sens, 21 ENTRY, RES reconnu ; marques non définies (`QQQ`, `C99-z`, `RES2`, `res`, `RESERVE`, `XRES`, `C1`) refusées ; rapports protégés de T8 et de T9, régénération refusée. Aucune règle linguistique nouvelle ; découpage arbitré et criblage inchangés. **Le rapport accepté de T9 n'est pas régénéré** : RES y reste rendu à part (§6.4). Le module d'audit `lot3-commun-v2.mjs` ne lit pas ce motif.",
  '',
  "**Portée** : le §8.110 (« le périmètre accepté n'est pas ajouté au manifeste (43 empreintes) », « non appliquée ») et les lignes antérieures du journal décrivent l'état à la date de leur rédaction ; ils ne sont pas modifiés. Les rubriques d'état courant et la « Prochaine action » d'`ETAT-ACTUEL.md` et de `ROADMAP.md` sont actualisées à l'identique. L'inventaire reçoit les sept scripts d'O1 à O3, les deux préparateurs de la correction, ses deux scripts d'application et le script de cette consignation. Traces : `…/application-O1/`, `…/application-O2/`, `…/application-O3/` et `a2-05-travail/correction-res/application/` (`sorties/`).",
  '',
  "**Effets connus de la correction, sans action** : `perimetre-T9.mjs` refuse désormais de se relancer, le périmètre étant protégé ; le sabotage S21 de `sabotages-recalcul-T9.mjs` vise l'ancien motif ; `correction-comparables/essais.mjs --apres-application` fixe l'ancienne empreinte ; les générateurs v1 gardent le même motif, archives de livraisons closes.",
  '',
  "**Restes signalés, non ouverts** : le statut « planifiée » de T7, de T8 et de T9 dans `registre-tranches.json` ; l'état daté de `CLAUDE.md`, §5 ; le défaut de date de `empreintes-lot3.mjs` ; l'arrêt en erreur de `sync-stable.mjs` sur certains états.",
  '',
  "Audit des 24 sens non autorisé ; aucune décision lexicale ; registre des tranches non modifié ; bloc F et préalable E5 non ouverts. Décomptes : 336/377, 41 restants ; bloc B 148/148 ; 197 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 retenue, V1-25 libre ; 44 empreintes ; bloc d'état synchronisé. Aucun `git add`, commit ni push.",
];
const ANCRE_I = '| `arbitrage-T9/preparer-consolidation-T9.mjs` |';
const LIGNES_I = [
  "| `arbitrage-T9/application-O1/appliquer-O1.mjs` | O1 : préconditions, ancres et fins de ligne, diffs régénérés identiques, sauvegarde, sept diffs relus par remplacements ciblés, copie de la proposition, contrôles, arbre entier comparé ; arrêt au premier écart (`77ae8067…`) ; `essayer-O1.mjs` (`f249ccad…`) : essai sur copie jetable, seize refus | sept documents, `arbitrage-T9/proposition-T9-perimetre.md`, `…/depart/`, `…/diffs-reels/`, `…/sorties/` | lancé une fois le 2026-11-01, code 0 |",
  "| `arbitrage-T9/preparation-O2/preparer-O2.mjs` | préparation d'O2, sans application : prévisualisation par l'outil réel sur copie jetable, ordre des empreintes, contrôles attendus, trois altérations, règle de date (`164fbf1b…`) | `arbitrage-T9/preparation-O2/` | lancé le 2026-11-01, code 0 |",
  "| `arbitrage-T9/application-O2/appliquer-O2.mjs` | O2 : préconditions, dont l'accord de la date UTC et du jour local, prévisualisation, sauvegarde, 44e entrée une fois, contrôles, aperçu O3 sur le dépôt réel ; arrêt au premier écart (`79d6190c…`) ; `essayer-O2.mjs` (`e7826fbd…`) : essai sur copie jetable, treize refus, dont le refus de date sous fuseau décalé | manifeste, `…/depart/`, `…/sorties/`, `…/apercu-O3/` | lancé une fois le 2026-11-01, code 0 |",
  "| `arbitrage-T9/application-O3/appliquer-O3.mjs` | O3 : préconditions, aperçu à l'empreinte relue et identique au fichier relu, sauvegarde, `sync-stable.mjs --appliquer` une fois, contrôles, deux remplacements seuls ; arrêt au premier écart (`b5a4a0ee…`) ; `essayer-O3.mjs` (`73f4aa40…`) : essai sur copie jetable, onze refus | blocs `a2-05:etat`, `…/depart/`, `…/sorties/` | lancé une fois le 2026-11-01, code 0 |",
  "| `correction-res/preparer.mjs` | proposition d'origine de la correction RES, sans application : versions proposées, 46 groupes comparés, T9 hors RES, refus, état actuel et état consolidé simulé (`0e54df03…`) | `correction-res/` | lancé le 2026-11-01, code 1 au premier lancement (deux défauts des essais, aucun contrôle assoupli), code 0 au second |",
  "| `correction-res/regeneration/preparer.mjs` | régénération de la correction sur l'état d'après O3 : même correctif, recalcul actuel, marques non définies, verrou d'empreinte (`d09a6088…`) | `correction-res/regeneration/` | lancé le 2026-11-01, code 0 |",
  "| `correction-res/application/appliquer-RES.mjs` | application de la correction RES : préconditions, diffs régénérés identiques, sauvegarde, deux diffs relus par remplacements ciblés, contrôles, 46 groupes, T9, marques non définies et rapports protégés sur clone de l'état corrigé ; arrêt au premier écart (`d334ac4f…`) ; `essayer-RES.mjs` (`d5ab1aab…`) : essai sur clone jetable, douze refus | `perimetre-v2.mjs`, `recalcul-T9-perimetre.mjs`, `…/depart/`, `…/diffs-reels/`, `…/sorties/` | lancé une fois le 2026-11-01, code 0 |",
  "| `arbitrage-T9/consignation-O1-O3-RES/preparer-consignation.mjs` | préparation de cette consignation, sans application : versions proposées d'`ETAT-ACTUEL.md`, de `ROADMAP.md`, du bilan du volet 2 (§8.111) et de cet inventaire ; essai dans un clone jetable | `arbitrage-T9/consignation-O1-O3-RES/` | lancé le 2026-11-01 |",
];

// Préconditions
for (const [p, h] of Object.entries(DEPART)) ok(sha(readFileSync(join(root, p))) === h, 'P1 empreinte de départ : ' + p, h.slice(0, 12) + '…');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && (!b || !t.includes(b))), 'P2 ' + p + ' : trois fragments présents une fois'); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_J)).length === 1, 'P3 ancre du journal, une fois');
ok(!/^### 8\.111 /m.test(lire(BIL)) && /^### 8\.110 /m.test(lire(BIL)) && !S8111.some((l) => /^\| /.test(l)), 'P4 bilan : §8.110 présent, §8.111 absent ; §8.111 sans ligne de tableau');
ok(lire(INV).split('\n').filter((l) => l.startsWith(ANCRE_I)).length === 1 && !lire(INV).includes('| `arbitrage-T9/application-O1/appliquer-O1.mjs` |'), 'P5 inventaire : ancre présente, lignes absentes');
const cites = Object.entries(CITES).filter(([p, h]) => !sha(readFileSync(join(root, p))).startsWith(h)).map(([p]) => p); ok(!cites.length, 'P6 empreintes citées conformes au dépôt réel', cites.join(', ') || Object.keys(CITES).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P7 index vide');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// Versions proposées
const pilote = (p, j) => { const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z); if (j) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_J) ? [l, LIGNE_J] : [l])).join('\n'); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const bilan = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8111.join(eol) + eol; })();
const inventaire = (() => { const b = lire(INV); const eol = b.includes('\r\n') ? '\r\n' : '\n'; return b.split(eol).flatMap((l) => (l.startsWith(ANCRE_I) ? [l, ...LIGNES_I] : [l])).join(eol); })();
const prop = { [BIL]: bilan, [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [INV]: inventaire };
for (const p of [ETAT, ROAD]) ok(prop[p].match(BLOC)[0] === lire(p).match(BLOC)[0], 'V1 ' + p + ' : bloc a2-05:etat inchangé');
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**'));
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]).startsWith("- **Prochaine action.** L'audit individuel des 24 sens de T9 (E1, E2, E3), sur autorisation distincte") && !/« RES » de T9, voie A/.test(pa(prop[ETAT])), 'V2 « Prochaine action » identique dans les deux documents : audit de T9, à autoriser ; mention de RES retirée');
ok([...S8111, LIGNE_J].some((l) => l.includes('Audit des 24 sens non autorisé')) && ![...S8111, LIGNE_J].some((l) => /audit de T9 (est )?ouvert|audit des 24 sens autorisé/i.test(l)), 'V3 aucun texte proposé n\'ouvre l\'audit de T9');

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
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 44 rapports contrôlés, identiques$/.test(emp.out), 'E3 manifeste : 44 empreintes', emp.out.slice(0, 80));
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'E4 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const r9 = lancer(REC); ok(r9.code === 0 && r9.out.split('\n').filter((l) => l.startsWith('conforme ')).length === 33, 'E4 recalcul de T9 : 33 contrôles conformes', fin(r9));
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /336 arbitrés, 0 proposés, 41 restants, sur 377/.test(cov.out), 'E5 couverture : 336/377, 41 restants');
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const ch = readFileSync(f(APERCU), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)); const planApres = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; ok(ap.code === 0 && !ch.length, 'E6 aperçu de synchronisation vide après la consignation', fin(ap));
const et = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(v.corrections,v.entry,v.libre,v.reserves.join())"], { cwd: C, encoding: 'utf8' });
ok(et.stdout.trim() === '197 172 V1-25 V1-22,V1-23', 'E7 197 corrections dans 172 ENTRY ; V1-25 libre ; V1-22 et V1-23 réservés', et.stdout.trim());
const asm = spawnSync(process.execPath, [f('tools/reconstruction/run.mjs'), 'assemble'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(asm.status === 0 && /684 ENTRY, 35 identifiant/.test(asm.stdout + asm.stderr), 'E8 assemblage réel : 684 ENTRY, 35 retraits', 'code ' + asm.status);
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: C, encoding: 'utf8' }).stdout.trim() && spawnSync('git', ['diff', '--check'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }).status === 0, 'E9 copie : index vide ; git diff --check conforme');
ok(sha(readFileSync(f(REG))) === sha(readFileSync(join(root, REG))), 'E10 registre des tranches inchangé');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(lire(ETAT)), j1 = jr(prop[ETAT]); ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'E11 journal historique conservé, une seule ligne ajoutée, en dernier', j1.length + ' lignes');
const b0t = lire(BIL).replace(/(\r?\n)+$/, ''); ok(bilan.startsWith(b0t) && bilan.slice(b0t.length).split('### 8.').length === 2, 'E12 §8.110 et bilan antérieur conservés, §8.111 seul ajouté');
dire('constat  plan attendu après application de la consignation : ' + planApres);

// Sorties
if (!ko) {
  const d = join(root, OUT); mkdirSync(join(d, 'diffs'), { recursive: true }); const tab = [];
  for (const [p, t] of Object.entries(prop)) { const nom = p.split('/').pop(); writeFileSync(join(d, nom), t); const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, 'diffs', nom + '.diff'), r.stdout); const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; tab.push('| `' + p + '` | `' + DEPART[p] + '` | `' + sha(Buffer.from(t, 'utf8')) + '` | `' + sha(r.stdout) + '` | +' + n('+') + ' / −' + n('-') + ' |'); }
  writeFileSync(join(d, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n');
}
rmSync(tmp, { recursive: true, force: true });
const reel1 = instantane(root); const chR = diffI(reel0, reel1); ok(!chR.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
dire(ko ? ko + ' écart(s) ; aucune proposition conservée' : 'préparation de la consignation conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
