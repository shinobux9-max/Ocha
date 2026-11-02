// A2-05 · T8 : préparation de la consolidation du périmètre accepté (décision du 2026-10-31), EN PROPOSITION : aucun fichier cible n'est modifié.
// Usage : node a2-05-travail/arbitrage-T8/preparer-consolidation-T8.mjs <racine du dépôt>
// (1) Préconditions. (2) Versions proposées : configuration (ARBITRAGE seul), rapport accepté régénéré par le générateur v2 sur un clone, proposition sauvegardée,
// bilan (§8.106), ETAT-ACTUEL.md, ROADMAP.md, inventaire, recalcul de T8 adapté. (3) Simulation sur le clone de trois états : E1 (documents et recalcul),
// E2 (42e entrée), E3 (synchronisation) ; contrôles à chaque état ; sabotages du recalcul adapté. (4) Sorties dans arbitrage-T8/consolidation/, seulement sans
// écart ; refus si le dossier existe. (5) Dépôt réel inchangé. Les plans et le manifeste simulés n'autorisent rien : ils se rétablissent sur le dépôt réel.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T8 = W + 'arbitrage-T8/', OUT = T8 + 'consolidation/', SAUV = T8 + 'proposition-T8-perimetre.md';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md', CFG = W + 'perimetre-T8.mjs', REC = W + 'recalcul-T8-perimetre.mjs', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', INV = W + 'INVENTAIRE-SCRIPTS.md', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md', RAPT7 = 'docs/rapports/etape2-A2-05-volet1-lot3-T7.md';
const DEPART = { [RAP]: 'c087860fb89da40410a572fc48ea31d3f881713a0af24575f36e8540063d37b8', [CFG]: '0059961c04753c1eb2afc0fa9812864437eb20c68edab3b6693923b3e553c675', [REC]: '34b84c3176a00ae0e7ab7d928c4dc5e3a144cfd14653411d848c2654755bd6bf', [BIL]: 'cbebe703193b7a30c1cbb46551afbddd96667924c33682fb31f7db23fa7715cb', [ETAT]: '2bdfdbffe1e5b0cfff52defa458c769b9e71f915f4d196a4d5086be2031f3f58', [ROAD]: 'ab42d53222d7ffd0d7114e06b45a142afc5a1c827a20a7073454ce0aa31badb3', [INV]: '4287a70d46c096a128ad370d9dff780b76d0021954d5e4bbe8a36ab3f481227a', [MAN]: 'd109766350b91e103a1190ae559cf052352607677a323fb3535c925d91ba8981' };
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
  ["en attente de relecture avant sa clôture définitive (bilan du volet 2, §8.105) (relais", "en attente de relecture avant sa clôture définitive (bilan du volet 2, §8.105) ; **consignation de T7 appliquée le 2026-10-31**, sur autorisation ; **T7 close le 2026-10-31** (clôture documentaire définitive, autorisée après la relecture de la consignation appliquée ; 24 sens, 23 conformes, 1 écart ; V1-24 retenue, non appliquée ; décisions non rouvertes ; 41 empreintes) ; **périmètre opérationnel de T8 (D5, D8 ; 16 sens, 14 ENTRY) accepté le 2026-10-31**, sans ajout, retrait, déplacement ni report (`docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md`, §0 inscrit par le générateur v2, proposition conservée ; lignes 299 à 303 et 326 à 336, l'intervalle étant D6 et D7, soit T6 ; まっすぐ, sens 1, maintenu ; recalcul indépendant conforme, 23 sabotages sur 23, inventaire des 57 restants vérifié ; orientation et frontières de l'audit retenues ; hors du manifeste, ajout non autorisé) ; audit des 16 sens non autorisé (bilan du volet 2, §8.106) (relais"],
  ["La clôture documentaire de T7 (`docs/rapports/etape2-A2-05-volet1-lot3-T7.md`), sur autorisation distincte, T8 n'étant pas préparée (bilan du volet 2, §8.105) ; puis, chacun sur autorisation distincte :", "La protection du périmètre accepté de T8 (`docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md`) au manifeste (42e entrée) et la synchronisation du bloc d'état, puis l'audit individuel des 16 sens de T8, chacun sur autorisation distincte (bilan du volet 2, §8.106) ; puis, chacun sur autorisation distincte :"],
];
const ANCRE_J = "| 2026-10-31 | 2 · A2-05 | **Inscription de T7 appliquée (étape A), rapport arbitré au manifeste (B1, 41e entrée)";
const LIGNE_J = "| 2026-10-31 | 2 · A2-05 | **Consignation de T7 appliquée**, sur autorisation (quatre diffs relus ; 63 vérifications conformes ; premier essai sur copie en code 1, fins de ligne, script corrigé avant toute écriture réelle) ; **T7 close** (24 sens, 23 conformes, 1 écart ; décisions non rouvertes ; 41 empreintes). **Périmètre opérationnel de T8 (D5, D8 ; 16 sens, 14 ENTRY) accepté**, sans ajout, retrait, déplacement ni report ; まっすぐ, sens 1, maintenu ; hors du manifeste, ajout non autorisé. Audit des 16 sens non autorisé. **320/377, 57 restants ; 197 corrections dans 172 ENTRY, non appliquées ; V1-25 libre ; 41 empreintes.** | non committé |";
const S8106 = [
  "### 8.106 Volet 1, lot 3 : consignation de T7 appliquée ; T7 close ; périmètre de T8 accepté (D5, D8 ; 16 sens, 14 ENTRY) (2026-10-31)",
  '',
  "Décisions du 2026-10-31 (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : « **J'accepte B2 et autorise exclusivement l'application ciblée des quatre différences préparées dans `arbitrage-T7/consignation-T7/`.** » ; « **J'accepte la consignation finale de T7 et autorise sa clôture documentaire définitive.** » ; « **Je demande explicitement de lancer la préparation du périmètre T8, en proposition uniquement.** » ; « **J'accepte le périmètre opérationnel de T8 : D5 et D8, soit 16 sens dans 14 ENTRY.** »",
  '',
  "**Consignation de T7 appliquée** (`a2-05-travail/arbitrage-T7/consignation-T7/application/appliquer-consignation-T7.mjs`, `708ee74b…`, lancé une fois sur le dépôt réel, code 0, 63 vérifications conformes, dont 24 avant écriture) : quatre documents identiques octet pour octet aux versions approuvées ; originaux dans `…/application/depart/`, diffs réels dans `…/application/diffs-reels/`. Le premier essai sur copie a rendu code 1 : les ancres d'`ETAT-ACTUEL.md` et de `ROADMAP.md`, en CRLF, n'étaient pas retrouvées, les diffs étant normalisés en LF ; aucun fichier réel n'était touché ; script corrigé, puis essai conforme, six refus chacun sur sa précondition.",
  '',
  "**T7 close** : clôture documentaire définitive autorisée après la relecture de la consignation appliquée ; 24 sens, 23 conformes, 1 écart, 0 suspendu ; V1-24 retenue, non appliquée ; décisions non rouvertes ; 41 empreintes ; relais 30 sur 30. La clôture n'autorise aucune modification lexicale ni aucune application de correction.",
  '',
  "**Périmètre opérationnel de T8** (`docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md`) : livraisons D5 et D8, retenues pour T8 par l'étude de méthode arbitrée le 2026-10-18 ; 16 sens, 14 ENTRY ; deux segments contigus du découpage, lignes 299 à 303 (D5, 5 sens) et 326 à 336 (D8, 11 sens), l'intervalle étant exactement D6 et D7 (T6, close). Thème normatif, sous deux formes : absence de fonction en D5, décidée avant A9 ; fonctions présentes en D8, décidées après A9. **まっすぐ, sens 1, est maintenu** : sa nature spatiale constitue une limite thématique du regroupement, non une raison de modifier le périmètre. Généré par `a2-05-travail/perimetre-T8.mjs` avec le générateur v2, non modifié ; recalcul indépendant `a2-05-travail/recalcul-T8-perimetre.mjs` conforme (28 contrôles ; 23 sabotages sur 23 ; inventaire des 57 restants vérifié).",
  '',
  "**Acceptation inscrite** : §0 inscrit par le générateur v2 (constante `ARBITRAGE` de `a2-05-travail/perimetre-T8.mjs`) ; seuls le statut et le §0 changent ; la proposition livrée est sauvegardée à l'identique (`a2-05-travail/arbitrage-T8/proposition-T8-perimetre.md`, `c087860f…`). **Orientation de l'audit** : D5, conformité des absences de fonctions selon A9 ; D8, fonctions présentes, types nuls, catégories nulles et cumuls ; 16 sens examinés individuellement, fiches sources lues en entier ; corrections retenues sur また et もう一度 prises en compte, sans être appliquées ; les 56 décisions validées ne sont pas rouvertes sans motif explicitement identifié ; frontières avec T9 et le bloc F préservées.",
  '',
  "**Protection** : le périmètre accepté n'est pas ajouté au manifeste (41 empreintes) ; relais 29 sur 30, C9a attendu (périmètre accepté hors du manifeste). L'ajout de la 42e entrée, puis la synchronisation du bloc d'état, relèvent chacun d'une autorisation distincte.",
  '',
  "**Restes signalés, non ouverts** : le statut « planifiée » de T7 dans `registre-tranches.json` ; l'état daté de `CLAUDE.md`, §5.",
  '',
  "Audit des 16 sens non autorisé ; aucune décision lexicale ; registre des tranches non modifié ; T9 et bloc F non ouverts. Décomptes : 320/377, 57 restants ; bloc B 148/148 ; 197 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 retenue, V1-25 libre ; 41 empreintes. Aucun `git add`, commit ni push.",
];
const ANCRE_I = '| `arbitrage-T7/consignation-T7/preparer-consignation-T7.mjs` |';
const LIGNES_I = [
  "| `arbitrage-T7/consignation-T7/application/appliquer-consignation-T7.mjs` | application de la consignation de T7 : préconditions, diffs régénérés, hunks relus par remplacements ciblés, contrôles (`708ee74b…`) ; `essayer-consignation-T7.mjs` (`7a9621cb…`) : essai sur copie jetable | quatre documents, `…/depart/`, `…/diffs-reels/`, `…/sorties/` | lancé une fois le 2026-10-31, code 0 ; premier essai sur copie, code 1, avant correction |",
  "| `perimetre-T8.mjs` | périmètre opérationnel de T8 (D5, D8) : configuration (autorisation, 13 risques rédigés, sans verdict) passée au générateur v2, non modifié ; constante `ARBITRAGE` renseignée à l'acceptation du 2026-10-31 | `docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md` | lancé le 2026-10-31, code 0 |",
  "| `recalcul-T8-perimetre.mjs` | recalcul indépendant du périmètre de T8 (n'importe aucun module v2) : découpage, deux segments contigus et leur intervalle (D6 et D7), doublons, sens non encore examinés, inventaire des 57, 320 sens de la clôture de T7, fonctions, types nuls, décisions, corrections, provenance, relation, frontières, manifeste ; dérivé du recalcul de T7 d'avant son audit, par `arbitrage-T8/construire-recalcul-T8.mjs` | — (sortie standard) | code 0 |",
  "| `arbitrage-T8/sabotages-recalcul-T8.mjs` | tests de résistance de la version initiale du recalcul de T8, dans un clone jetable ; 23 sabotages | `arbitrage-T8/sorties/` | lancé le 2026-10-31, code 0 ; premier lancement arrêté (défaut de lenteur du harnais) |",
  "| `arbitrage-T8/preparer-consolidation-T8.mjs` | préparation de la consolidation du périmètre de T8, sans application : versions proposées, simulation de trois états, sabotages du recalcul adapté | `arbitrage-T8/consolidation/` | lancé le 2026-10-31 |",
];
const ARB = { date: '2026-10-31', texte: [
  "Arbitrage du 2026-10-31 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **J'accepte le périmètre opérationnel de T8 : D5 et D8, soit 16 sens dans 14 ENTRY.** » « D5 : lignes 299 à 303, cinq sens. » « D8 : lignes 326 à 336, onze sens. » « Intervalle D6 + D7 : T6 déjà arbitrée. » « Aucun ajout, retrait, déplacement ou report. »",
  '',
  "« **Je confirme le maintien de まっすぐ s1 dans T8.** Sa nature spatiale constitue une limite thématique du regroupement, mais pas une raison de modifier le périmètre. »",
  '',
  "**Orientation de l'audit** : (1) D5 : vérifier la conformité des absences de fonctions selon A9 ; (2) D8 : vérifier les fonctions présentes, les types nuls, les catégories nulles et les éventuels cumuls ; (3) examiner les 16 sens individuellement, en lisant les fiches sources complètes, nuances et exemples compris ; (4) prendre en compte les corrections historiques retenues sur また et もう一度, sans les appliquer ; (5) ne pas rouvrir les 56 décisions validées sans motif explicitement identifié ; (6) préserver les frontières avec T9 et le bloc F suspendu.",
  '',
  "**L'audit lexical des 16 sens n'est pas autorisé** : il le sera distinctement. Aucune décision lexicale n'est prise sur les 16 sens. La protection du périmètre (42e entrée du manifeste) se fera sur autorisation distincte.",
  '',
  "**Comptes maintenus** : 320/377, 57 restants ; 197 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 retenue, V1-25 libre ; 41 empreintes jusqu'à l'intégration autorisée du périmètre.",
] };

// (1) Préconditions
for (const [p, h] of Object.entries(DEPART)) ok(shaF(join(root, p)) === h, 'P1 empreinte de départ : ' + p, h.slice(0, 12) + '…');
ok(/^const ARBITRAGE = null;$/m.test(lire(CFG)) && /^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/m.test(lire(RAP)), 'P2 configuration et rapport en proposition');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P3 ' + p + ' : deux fragments présents une fois'); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_J)).length === 1, 'P4 ancre du journal, une fois');
ok(!/^### 8\.106 /m.test(lire(BIL)) && /^### 8\.105 /m.test(lire(BIL)) && !S8106.some((l) => /^\| /.test(l)), 'P5 bilan : §8.105 présent, §8.106 absent ; §8.106 sans ligne de tableau');
ok(lire(INV).split('\n').filter((l) => l.startsWith(ANCRE_I)).length === 1 && !lire(INV).includes('appliquer-consignation-T7.mjs') && !lire(INV).includes('perimetre-T8.mjs'), 'P6 inventaire : ancre présente, lignes absentes');
const man0 = JSON.parse(lire(MAN)); const c0 = Object.keys(man0.empreintes);
ok(c0.length === 41 && c0.every((p) => shaF(join(root, p)) === man0.empreintes[p]) && c0[40] === RAPT7, 'P7 manifeste : 41 empreintes conformes, rapport de T7 en 41e');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P8 index vide');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// (2) Versions proposées, hors rapport
const cfgProp = lire(CFG).replace(/^const ARBITRAGE = null;$/m, () => 'const ARBITRAGE = ' + JSON.stringify(ARB, null, 2) + ';');
const pilote = (p, j) => { const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z); if (j) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_J) ? [l, LIGNE_J] : [l])).join('\n'); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const bilan = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8106.join(eol) + eol; })();
const inventaire = (() => { const b = lire(INV); const eol = b.includes('\r\n') ? '\r\n' : '\n'; return b.split(eol).flatMap((l) => (l.startsWith(ANCRE_I) ? [l, ...LIGNES_I] : [l])).join(eol); })();

// (3) Clone jetable, régénération du rapport accepté
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-consolidation-t8-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 130);
const ecarts = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim());
const propT = lire(RAP); writeFileSync(f(CFG), cfgProp);
const g = lancer(CFG); const rapProp = readFileSync(f(RAP), 'utf8');
const L0 = propT.split('\n'), L1 = rapProp.split('\n'); const a = L1.indexOf('## 0. Arbitrage'), b = L1.indexOf('## 1. Où se place T8'); const sans0 = [...L1.slice(0, a), ...L1.slice(b)]; const st = L0.findIndex((l) => l.startsWith('**Statut** : '));
ok(g.code === 0 && a > 0 && b > a && sans0.length === L0.length && sans0.every((l, k) => (k === st ? /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-31 \(§0\)\.\*\*/.test(l) : l === L0[k])), 'E0 rapport régénéré : seuls changent la ligne de statut et le §0 inséré', 'code ' + g.code + ' ; §0 : ' + (b - a) + ' lignes ; ' + sha(rapProp).slice(0, 12) + '…');
const rapSha = sha(Buffer.from(rapProp, 'utf8'));

// Recalcul adapté, par remplacements ciblés
let recProp = lire(REC);
const une = (x, y) => { if (recProp.split(x).length !== 2) throw new Error('recalcul : ' + x.slice(0, 50)); recProp = recProp.replace(x, () => y); };
une('// Usage : node a2-05-travail/recalcul-T8-perimetre.mjs', "// Adaptation au périmètre accepté (§0 ; proposition sauvegardée, empreinte fixée ; empreinte de la version acceptée fixée, indépendante du manifeste) et à\n// sa protection (absent du manifeste ou en 42e entrée) : préparée le 2026-10-31, appliquée seulement sur autorisation distincte ; version initiale `34b84c31…`.\n// Usage : node a2-05-travail/recalcul-T8-perimetre.mjs");
une('// 14. Périmètre en proposition : statut, aucun §0 ; inventaire', "// 14. Périmètre accepté : statut et §0 ; hors du statut et du §0, identique à la proposition sauvegardée ; empreinte de la version acceptée fixée ; inventaire");
{ const L = recProp.split('\n'); const i = L.findIndex((l) => l.startsWith("ctl(/^\\*\\*Statut\\*\\* : \\*\\*proposition de périmètre opérationnel")); if (i < 0) throw new Error('ligne de statut'); L.splice(i, 1,
  "const PROP8 = 'a2-05-travail/arbitrage-T8/proposition-T8-perimetre.md';",
  "const PL = (existsSync(join(root, PROP8)) ? txt(PROP8) : '').split('\\n'), G = gen.split('\\n');",
  "const a0 = G.indexOf('## 0. Arbitrage'), b0 = G.indexOf('## 1. Où se place T8'); const sans0 = a0 > 0 && b0 > a0 ? [...G.slice(0, a0), ...G.slice(b0)] : G; const st = PL.findIndex((l) => l.startsWith('**Statut** : '));",
  "ctl(octets(PROP8) === '" + DEPART[RAP] + "' && /^\\*\\*Statut\\*\\* : \\*\\*proposition de périmètre opérationnel, non arbitrée\\.\\*\\*/.test(PL[st] ?? '') && /^\\*\\*Statut\\*\\* : \\*\\*périmètre accepté le 2026-10-31 \\(§0\\)\\.\\*\\*/.test(G[st] ?? '') && a0 > 0 && b0 > a0 && sans0.length === PL.length && sans0.every((l, k) => k === st || l === PL[k]), 'périmètre accepté (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', octets(PROP8).slice(0, 12) + '… ; §0 : ' + (b0 - a0) + ' lignes');",
  "ctl(octets(PER8) === '" + rapSha + "', 'périmètre accepté identique à sa version acceptée (empreinte fixée, indépendante du manifeste)', octets(PER8).slice(0, 12) + '…');"); recProp = L.join('\n'); }
une("// son empreinte) ; périmètre de T8 hors du manifeste", "// son empreinte) ; périmètre accepté de T8 absent ou en 42e entrée");
une("&& !Object.hasOwn(man, PER8), 'manifeste : au moins 41 empreintes recalculées, toutes identiques ; les 41 premières dans leur ordre ; périmètre de T8 hors du manifeste'", "&& (cles.indexOf(PER8) === -1 || cles.indexOf(PER8) === 41), 'manifeste : au moins 41 empreintes recalculées, toutes identiques ; les 41 premières dans leur ordre ; périmètre de T8 absent ou en 42e entrée'");
const prop = { [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [BIL]: bilan, [INV]: inventaire, [REC]: recProp };

// État E1 : documents, recalcul adapté, proposition sauvegardée (rapport et configuration déjà en place sur le clone)
dire('--- E1 : documents, recalcul adapté, proposition sauvegardée');
for (const [p, t] of Object.entries(prop)) writeFileSync(f(p), t); mkdirSync(f(T8), { recursive: true }); writeFileSync(f(SAUV), propT);
ok(JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify([...Object.keys(prop), CFG, RAP, SAUV].sort()), 'E1-1 huit fichiers, aucun autre', diffI(reel0, instantane(C)).length + ' fichiers');
ok(spawnSync(process.execPath, ['--check', f(REC)], { encoding: 'utf8' }).status === 0 && spawnSync(process.execPath, ['--check', f(CFG)], { encoding: 'utf8' }).status === 0, 'E1-2 node --check du recalcul et de la configuration');
const CTRL = { couverture: [W + 'couverture-lot3.mjs'], empreintes: [W + 'empreintes-lot3.mjs'], pilote: [W + 'controle-bilan-pilote.mjs'], T5: [W + 'recalcul-T5-perimetre.mjs'], T6: [W + 'recalcul-T6-perimetre.mjs'], T7: [W + 'recalcul-T7-perimetre.mjs'], T8: [REC] };
const tous = (nom) => { const R = Object.fromEntries(Object.entries(CTRL).map(([k, x]) => [k, lancer(...x)])); for (const [k, r] of Object.entries(R)) dire('   ' + nom + ' ' + k + ' (code ' + r.code + ') : ' + fin(r)); return R; };
const relais = () => { const r = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); return { r, e: ecarts(r).map((l) => l.split(/\s+/)[1]).sort().join(',') }; };
const R1 = tous('E1'); ok(Object.values(R1).every((r) => r.code === 0), 'E1-3 contrôles en service, recalcul adapté compris, à 0');
const rel1 = relais(); ok(rel1.r.code === 1 && rel1.e === 'C9a', 'E1-4 relais : 29 sur 30, C9a seul (périmètre accepté hors du manifeste)', fin(rel1.r) + ' ; ' + rel1.e);
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); const ch1 = readFileSync(f(APERCU), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)); ok(ap1.code === 0 && !ch1.length, 'E1-5 aperçu vide : comptes inchangés', fin(ap1));
for (const p of [ETAT, ROAD]) ok(prop[p].match(BLOC)[0] === lire(p).match(BLOC)[0], 'E1-6 ' + p + ' : bloc a2-05:etat inchangé');
// Sabotages du recalcul adapté
const sabote = (nom, p, g2, attendu) => { const o = readFileSync(f(p)); const t = o.toString('utf8'); const m = g2(t); if (m === t) { ok(false, nom, 'sans effet'); return; } writeFileSync(f(p), m); const r = lancer(REC); writeFileSync(f(p), o); ok(r.code === 1 && ecarts(r).some((l) => l.includes(attendu)), nom, ecarts(r).length + ' écart(s)'); };
sabote('R1 rapport de T8 revenu à la proposition', RAP, () => propT, 'périmètre accepté (§0)');
sabote('R2 proposition sauvegardée modifiée', SAUV, (t) => t + ' ', 'périmètre accepté (§0)');
sabote('R3 §0 du rapport modifié', RAP, (t) => t.replace('**Je confirme le maintien de まっすぐ s1 dans T8.**', '**Je retire まっすぐ s1.**'), 'périmètre accepté identique');
sabote('R4 fiche de risque modifiée dans le rapport', RAP, (t) => t.replace('**Bornes** (découpage', '**Bornes** (découpages'), 'périmètre accepté (§0)');
sabote('R5 périmètre de T8 inséré avant la 42e position', MAN, (t) => { const o = JSON.parse(t); const e = Object.entries(o.empreintes); e.splice(40, 0, [RAP, rapSha]); o.empreintes = Object.fromEntries(e); return JSON.stringify(o, null, 1) + '\n'; }, 'manifeste');

// État E2 : 42e entrée
dire('--- E2 : 42e entrée, simulée');
const JOUR = new Date().toISOString().slice(0, 10);
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); const brut = readFileSync(f(MAN)); const m1 = JSON.parse(brut); const c1 = Object.keys(m1.empreintes);
ok(aj.code === 0 && c1.length === 42 && c1[41] === RAP && m1.empreintes[RAP] === rapSha && c0.every((k, i) => c1[i] === k && m1.empreintes[k] === man0.empreintes[k]) && JSON.stringify(m1.ajouts.slice(0, -1)) === JSON.stringify(man0.ajouts) && JSON.stringify(m1.ajouts.at(-1)) === JSON.stringify({ date: JOUR, chemins: [RAP] }), 'E2-1 42 entrées, les 41 premières inchangées dans leur ordre, un seul ajout daté du jour', fin(aj));
const R2 = tous('E2'); ok(Object.values(R2).every((r) => r.code === 0), 'E2-2 contrôles en service à 0');
const rel2 = relais(); ok(rel2.r.code === 0 && fin(rel2.r) === '30 conformes sur 30', 'E2-3 relais : 30 sur 30 (seul le compteur d\'empreintes du bloc reste à synchroniser, comme à l\'état E3 de T7)', fin(rel2.r));

// État E3 : synchronisation
dire('--- E3 : synchronisation, simulée');
const ap2 = lancer(W + 'sync-stable.mjs', '--apercu'); const plan = (ap2.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const apercu = readFileSync(f(APERCU), 'utf8');
const ch2 = apercu.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
ok(ap2.code === 0 && plan && ch2.filter((l) => /42 rapports arbitrés identiques/.test(l)).length === 2 && ch2.length === 8, 'E3-1 aperçu : marqueur et compteur seuls, huit lignes', 'plan de simulation ' + plan);
const av3 = instantane(C); const app = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', plan); ok(app.code === 0 && JSON.stringify(diffI(av3, instantane(C))) === JSON.stringify([ETAT, ROAD].sort()), 'E3-2 deux documents, blocs seuls', fin(app));
const R3 = tous('E3'); const rel3 = relais(); const ap3 = lancer(W + 'sync-stable.mjs', '--apercu');
ok(Object.values(R3).every((r) => r.code === 0) && /^empreintes : 42 rapports contrôlés, identiques/.test(R3.empreintes.out) && rel3.r.code === 0 && fin(rel3.r) === '30 conformes sur 30' && !readFileSync(f(APERCU), 'utf8').split('\n').some((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)), 'E3-3 état final : tous les contrôles à 0 ; 42 empreintes ; relais 30 sur 30 ; aperçu suivant vide', fin(rel3.r));
const asm = spawnSync(process.execPath, [f('tools/reconstruction/run.mjs'), 'assemble'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(asm.status === 0, 'E3-4 assemblage réel', 'code ' + asm.status);
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: C, encoding: 'utf8' }).stdout.trim() && spawnSync('git', ['diff', '--check'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }).status === 0, 'E3-5 copie : index vide ; git diff --check conforme');
ok(diffI(reel0, instantane(C)).every((p) => [...Object.keys(prop), CFG, RAP, SAUV, MAN].includes(p)), 'E3-6 neuf fichiers au plus, aucun autre : données, journal, lots, registre, normes et documents protégés inchangés');

// (4) Sorties
if (!ko) {
  const d = join(root, OUT); mkdirSync(join(d, 'diffs'), { recursive: true }); const tab = [];
  const noms = { [CFG]: 'perimetre-T8.mjs', [RAP]: 'etape2-A2-05-volet1-lot3-T8-perimetre.md', [BIL]: 'etape2-A2-05-bilan-volet2.md', [ETAT]: 'ETAT-ACTUEL.md', [ROAD]: 'ROADMAP.md', [INV]: 'INVENTAIRE-SCRIPTS.md', [REC]: 'recalcul-T8-perimetre.mjs' };
  const contenus = { ...prop, [CFG]: cfgProp, [RAP]: rapProp };
  for (const [p, nom] of Object.entries(noms)) { writeFileSync(join(d, nom), contenus[p]); const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, 'diffs', nom + '.diff'), r.stdout); const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; tab.push('| `' + p + '` | `' + DEPART[p] + '` | `' + sha(Buffer.from(contenus[p], 'utf8')) + '` | `' + sha(r.stdout) + '` | +' + n('+') + ' / −' + n('-') + ' |'); }
  writeFileSync(join(d, 'proposition-T8-perimetre.md'), propT); writeFileSync(join(d, 'manifeste-simule-' + JOUR + '.json'), brut); writeFileSync(join(d, 'apercu-simule-E3.md'), apercu);
  writeFileSync(join(d, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n');
}
rmSync(tmp, { recursive: true, force: true });
const reel1 = instantane(root); const chR = diffI(reel0, reel1); ok(!chR.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
constat('valeurs de simulation, non réutilisables pour une application', 'date ' + JOUR + ' ; plan ' + plan);
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation de la consolidation conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
