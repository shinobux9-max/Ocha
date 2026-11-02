// A2-05 · volet 1 · lot 3 : préparation de la consolidation documentaire du périmètre accepté de T7 et de la clôture de T6, avec l'adaptation
// du recalcul de T7 à la 40e entrée du manifeste, EN PROPOSITION : aucun fichier concerné n'est modifié (rapport de périmètre, configuration,
// documents de pilotage, bilan, inventaire, recalcul, manifeste, registre). Dérivé de arbitrage-T6/preparer-consolidation-T6.mjs.
// Usage : node a2-05-travail/arbitrage-T7/preparer-consolidation-T7.mjs <racine du dépôt>
// (1) Préconditions sur le dépôt réel : périmètre de T7 = proposition relue (empreinte), sans §0 ; 39 empreintes identiques, rapport de T6 en
// 39e, T7 absent du manifeste ; ARBITRAGE non renseigné ; configuration, recalcul et inventaire à leurs empreintes ; ancres présentes une fois ;
// ajouts absents ; proposition sauvegardée et dossier de sortie absents.
// (2) Dans un clone git jetable (--shared, --no-checkout) recouvert de l'arbre de travail, cinq états successifs : E0 (départ) ; E1 (consolidation
// documentaire : proposition sauvegardée, périmètre régénéré par le générateur v2 avec ARBITRAGE, pilotage, bilan, inventaire) ; E2 (recalcul de
// T7 remplacé, toujours 39 empreintes) ; E3 (40e entrée ajoutée par l'outil réel) ; E4 (bloc d'état synchronisé par l'outil réel). À chaque
// état : relais, couverture, manifeste, contrôle du bilan du pilote, recalculs de T5, de T6 et de T7, aperçu ; résultats attendus vérifiés. En E3,
// le recalcul de T7 d'origine est aussi lancé, en constat. En E4, six sabotages du recalcul adapté, chacun restauré et vérifié.
// (3) Écriture des versions proposées, des diffs et des états intermédiaires dans arbitrage-T7/consolidation/ (refus si le dossier existe).
// (4) Dépôt réel inchangé. Code 1 au premier écart ; chemins de machine masqués dans la trace.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync, unlinkSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-T7/consolidation';
const CFG = W + 'perimetre-T7.mjs', PER = 'docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md', MAN = W + 'empreintes-rapports-arbitres.json';
const PROP = W + 'arbitrage-T7/proposition-T7-perimetre.md', REC7 = W + 'recalcul-T7-perimetre.mjs', INV = W + 'INVENTAIRE-SCRIPTS.md';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', RT6 = 'docs/rapports/etape2-A2-05-volet1-lot3-T6.md';
const PER_SHA = '046c68e4c9822ec3c84db47167f7e31d3ec84ae18b5b7f216029e309206bdd45', CFG_SHA = 'dfc3ca71403e7eb2cfee999228350ae9dee50b9b7eb0a4fe1dc77c74543f54c0';
const REC7_SHA = '4c990f0272a323c127e5507aabd00d915af7752d1723cb3c81194f595655faa0', INV_SHA = '30e18df2ab1e7707cd7c60de080b6798a9bfbc82f717fc063fe1ec842358218b';
const shaT = (t) => createHash('sha256').update(t).digest('hex'); const sha = (p) => shaT(readFileSync(p));
const tmp = mkdtempSync(join(tmpdir(), 'ocha-consolidation-t7-')); const C = join(tmp, 'arbre');
const masquer = (l) => [[root, '<racine>'], [C, '<clone>'], [tmpdir(), '<temp>']].reduce((t, [p, n]) => [p, p.replace(/\\/g, '\\\\'), p.replace(/\\/g, '/'), p.replace(/\\/g, '/').replace(/ /g, '%20')].reduce((u, v) => u.split(v).join(n), t), l);
const log = []; const dire = (l) => { l = masquer(l); console.log(l); log.push(l); };
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l, d) => dire('constat  ' + l + (d ? ' : ' + d : ''));
const arret = (m) => { dire('ARRÊT : ' + m); rmSync(tmp, { recursive: true, force: true }); process.exit(1); };
const lire = (p) => readFileSync(join(root, p), 'utf8');
const remplacer = (t, doc, ancre, nouveau) => { const n = t.split(ancre).length - 1; if (n !== 1) arret(doc + ' : ancre présente ' + n + ' fois : ' + ancre.slice(0, 90) + '…'); return t.replace(ancre, () => nouveau); };
const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p === OUT) continue;
  if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = sha(join(root, p)); } }; marcher(''); return h; };
const reel0 = instantane();

// (1) Préconditions
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');
if (existsSync(join(root, PROP))) arret(PROP + ' existe déjà');
const man0 = JSON.parse(lire(MAN)).empreintes; const cles0 = Object.keys(man0);
const diffE = Object.entries(man0).filter(([p, h]) => !existsSync(join(root, p)) || sha(join(root, p)) !== h).map(([p]) => p);
ok(reel0[PER] === PER_SHA && /^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/m.test(lire(PER)) && !lire(PER).includes('## 0. Arbitrage'), 'périmètre de T7 = proposition relue, au statut de proposition, sans §0', PER_SHA.slice(0, 12) + '…');
ok(cles0.length === 39 && !diffE.length && cles0[38] === RT6 && !Object.hasOwn(man0, PER), 'manifeste : 39 empreintes identiques ; rapport arbitré de T6 en 39e ; périmètre de T7 absent', cles0.length + ' entrées');
ok(reel0[CFG] === CFG_SHA && /^const ARBITRAGE = null;$/m.test(lire(CFG)), 'configuration de T7 à son empreinte relue ; ARBITRAGE non renseigné', CFG_SHA.slice(0, 12) + '…');
ok(reel0[REC7] === REC7_SHA, 'recalcul de T7 à son empreinte relue (version initiale)', REC7_SHA.slice(0, 12) + '…');
ok(reel0[INV] === INV_SHA, 'inventaire à son empreinte (après l\'inscription ciblée du 2026-10-29)', INV_SHA.slice(0, 12) + '…');
const K39 = shaT(cles0.join('\n'));
if (ko) arret('préconditions');

// (2a) Configuration proposée : la constante ARBITRAGE
const ART = [
  "Arbitrage du 2026-10-29 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **J'accepte le périmètre opérationnel de T7 : D1 et D4, soit 24 sens dans 24 ENTRY.** » « D1 couvre les lignes 253 à 266 et D4 les lignes 289 à 298. L'intervalle D2 + D3 appartient à T5, déjà arbitrée. » « Aucun ajout, retrait, déplacement ou report n'est retenu. »",
  '',
  "**Orientation de l'audit** : thème normatif validé, examiner, sens par sens, la présence ou l'absence des fonctions linguistiques selon A7 et A9 ; (1) conserver les 24 sens issus du criblage C7 ; (2) ne pas présumer qu'un déclencheur de traduction implique une fonction linguistique ; (3) examiner particulièrement la fonction `deictique` existante de 近々 et de 後 (sens 1) ; (4) préserver les 43 décisions validées et les six corrections V2 déjà retenues (V2-17, V2-34, V2-38, V2-56, V2-67, V2-68), sans les rouvrir ; (5) maintenir les frontières avec T8, T9 et le bloc F suspendu.",
  '',
  "**L'audit lexical des 24 sens n'est pas autorisé** : il le sera distinctement. Aucune décision lexicale n'est prise sur les 24 sens. La protection du périmètre (40e entrée du manifeste) se fera sur autorisation distincte, avec l'adaptation préalable du recalcul de T7, qui exige ce périmètre hors du manifeste.",
  '',
  "**Comptes maintenus** : 296/377, 81 restants ; 196 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 libre ; 39 empreintes jusqu'à l'intégration autorisée du périmètre.",
];
const ARBITRAGE = "const ARBITRAGE = { date: '2026-10-29', texte: [\n" + ART.map((s) => '  ' + (s === '' ? "''" : JSON.stringify(s)) + ',').join('\n') + '\n] };';
const cfgProp = lire(CFG).replace(/^const ARBITRAGE = null;$/m, () => ARBITRAGE);
const N0 = ART.length + 3; // lignes insérées par le générateur : titre, ligne vide, texte, ligne vide

// (2b) Clone jetable ; E0
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const lancerHors = (f, ...a) => { const r = spawnSync(process.execPath, [f, C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim().slice(0, 220));
const conformes = (r) => r.out.split('\n').filter((l) => l.startsWith('conforme ')).length;
const etape = (nom) => {
  const r = { rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs'), cbp: lancer(W + 'controle-bilan-pilote.mjs'), rec5: lancer(W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(W + 'recalcul-T6-perimetre.mjs'), rec7: lancer(REC7), ap: lancer(W + 'sync-stable.mjs', '--apercu') };
  r.apercu = readFileSync(join(C, W + 'sync-stable-apercu.md'), 'utf8'); r.hunks = (r.apercu.match(/^@@/gm) ?? []).length; r.plan = (r.ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
  for (const [k, v] of Object.entries(r)) if (v?.out !== undefined) dire('   ' + nom + ' ' + k + ' (code ' + v.code + ', ' + conformes(v) + ' conformes) : ' + v.out.split('\n').pop().slice(0, 170) + (ecartsDe(v).length ? ' | ' + ecartsDe(v).join(' | ') : ''));
  return r;
};
const rel = (r, n, ec) => r.rel.out.includes(n + ' conformes sur 30') && JSON.stringify(ecartsDe(r.rel).map((l) => (l.match(/^ÉCART\s+(C\w+)/) ?? [])[1])) === JSON.stringify(ec);
const cov0 = (r) => r.cov.code === 0 && /296 arbitrés, 0 proposés, 81 restants/.test(r.cov.out);
const autres = (r) => r.cbp.code === 0 && conformes(r.cbp) === 46 && r.rec5.code === 0 && conformes(r.rec5) === 17 && r.rec6.code === 0 && conformes(r.rec6) === 27;
// Libellés attendus des écarts, comparés au début de chaque ligne (un libellé peut lui-même contenir « : »)
const seuls = (r, libelles) => { const l = ecartsDe(r).map((x) => x.replace(/^ÉCART\s+/, '')); return l.length === libelles.length && libelles.every((b, k) => l[k].startsWith(b + ' : ')); };
dire('# E0 : départ');
const E0 = etape('E0');
ok(rel(E0, 30, []) && cov0(E0) && E0.emp.code === 0 && E0.emp.out === 'empreintes : 39 rapports contrôlés, identiques' && autres(E0) && E0.rec7.code === 0 && conformes(E0.rec7) === 24 && E0.hunks === 0, 'E0 (départ) : relais 30 sur 30 ; couverture 296/81 ; 39 empreintes ; contrôle du bilan du pilote 46, recalculs de T5 17, de T6 27, de T7 24 ; aperçu vide');

// (2c) Périmètre régénéré avec ARBITRAGE, dans le clone : seuls changent la ligne de statut et le §0 inséré
mkdirSync(join(C, dirname(PROP)), { recursive: true }); cpSync(join(root, PER), join(C, PROP));
writeFileSync(join(C, CFG), cfgProp);
const g = lancer(CFG); const perProp = readFileSync(join(C, PER), 'utf8'); const ACC = shaT(perProp);
const L0 = lire(PER).split('\n'), L1 = perProp.split('\n'); const i0 = L1.indexOf('## 0. Arbitrage'), i1 = L1.indexOf('## 1. Où se place T7');
const sans0 = [...L1.slice(0, i0), ...L1.slice(i1)]; const st = L0.findIndex((l) => l.startsWith('**Statut** : '));
const memes = sans0.length === L0.length && sans0.every((l, k) => k === st ? /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-29 \(§0\)\.\*\*/.test(l) : l === L0[k]);
ok(g.code === 0 && i0 > 0 && i1 - i0 === N0 && memes, 'périmètre régénéré avec ARBITRAGE : seuls changent la ligne de statut et le §0 inséré', 'génération code ' + g.code + ' ; §0 : ' + (i1 - i0) + ' lignes (attendu ' + N0 + ') ; version acceptée ' + ACC.slice(0, 12) + '…');
const g2 = lancer(CFG); ok(g2.code !== 0 && shaT(readFileSync(join(C, PER), 'utf8')) === ACC, 'seconde génération refusée par le générateur v2 (périmètre accepté) ; version acceptée intacte', 'code ' + g2.code + ' : ' + g2.out.split('\n').pop().slice(0, 140));

// (2d) Recalcul de T7 adapté : statut, §0 et proposition sauvegardée ; empreinte de la version acceptée ; 40e entrée
let rec7 = lire(REC7);
rec7 = remplacer(rec7, REC7, "// lecture (chaque contrôle est rendu). Ne juge aucun sens.\n",
  "// lecture (chaque contrôle est rendu). Ne juge aucun sens.\n// Adaptation au périmètre accepté (§0 ; proposition sauvegardée, empreinte fixée ; empreinte de la version acceptée fixée, indépendante du\n// manifeste) et à sa protection (40e entrée du manifeste ; les 39 premières entrées dans leur ordre, liste fixée par son empreinte) : préparée\n// le 2026-10-29, appliquée seulement sur autorisation distincte ; version initiale `" + REC7_SHA.slice(0, 8) + "…`.\n");
const A14 = "// 14. Manifeste : au moins 39 entrées, toutes identiques (SHA-256 des octets, sans le module v2) ; périmètre de T7 absent tant qu'il n'est pas protégé\n";
const i14 = rec7.indexOf(A14), f14 = rec7.indexOf("console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');");
if (i14 < 0 || f14 < i14 || rec7.split(A14).length !== 2) arret(REC7 + ' : section 14 introuvable');
rec7 = rec7.slice(0, i14) + [
  "// 14. Périmètre accepté : statut et §0 ; hors du statut et du §0, identique à la proposition sauvegardée, elle-même égale à la proposition relue",
  "// (empreinte fixée) ; la version acceptée garde son empreinte, indépendamment du manifeste. Un fichier absent se lit vide : écart, sans exception",
  "const octets = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');",
  "const PROP7 = 'a2-05-travail/arbitrage-T7/proposition-T7-perimetre.md', PER7 = 'docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md';",
  "const PL = (existsSync(join(root, PROP7)) ? txt(PROP7) : '').split('\\n'), G = gen.split('\\n');",
  "const a0 = G.indexOf('## 0. Arbitrage'), b0 = G.indexOf('## 1. Où se place T7'); const sans0 = a0 > 0 && b0 > a0 ? [...G.slice(0, a0), ...G.slice(b0)] : G;",
  "const st = PL.findIndex((l) => l.startsWith('**Statut** : '));",
  "ctl(octets(PROP7) === '" + PER_SHA + "' && /^\\*\\*Statut\\*\\* : \\*\\*proposition de périmètre opérationnel, non arbitrée\\.\\*\\*/.test(PL[st] ?? '') && /^\\*\\*Statut\\*\\* : \\*\\*périmètre accepté le 2026-10-29 \\(§0\\)\\.\\*\\*/.test(G[st] ?? '') && a0 > 0 && b0 > a0 && sans0.length === PL.length && sans0.every((l, k) => k === st || l === PL[k]), 'périmètre accepté (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', 'proposition ' + octets(PROP7).slice(0, 12) + '… ; §0 : ' + (a0 > 0 ? b0 - a0 : 0) + ' lignes ; ' + (G[st] ?? '').slice(0, 50).replace(/\\*/g, ''));",
  "ctl(octets(PER7) === '" + ACC + "', 'périmètre accepté identique à sa version acceptée (empreinte fixée, indépendante du manifeste)', octets(PER7).slice(0, 12) + '…');",
  '',
  "// 15. Manifeste : au moins 40 entrées, toutes identiques (SHA-256 des octets, sans le module v2) ; les 39 premières, celles d'avant T7, dans leur",
  "// ordre (liste fixée par son empreinte) ; périmètre accepté de T7 en 40e. Les entrées suivantes relèvent des contrôles de leurs propres tranches.",
  "const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes; const cles = Object.keys(man);",
  "const diffE = Object.entries(man).filter(([p, h]) => octets(p) !== h).map(([p]) => p);",
  "const k39 = sha(cles.slice(0, 39).join('\\n')); const pos7 = cles.indexOf(PER7);",
  "ctl(cles.length >= 40 && !diffE.length && k39 === '" + K39 + "' && pos7 === 39, 'manifeste : au moins 40 empreintes recalculées, toutes identiques ; les 39 premières entrées dans leur ordre ; périmètre accepté de T7 protégé (40e entrée)', cles.length + ' entrées ; 39 premières ' + k39.slice(0, 12) + '… ; périmètre de T7 : ' + (pos7 === -1 ? 'hors du manifeste' : (pos7 + 1) + 'e entrée') + ' ; différentes : ' + (diffE.join(', ') || 'aucune'));",
  '',
].join('\n') + rec7.slice(f14);
const REC7P = shaT(rec7);
{ const f = join(tmp, 'check-recalcul-T7-perimetre.mjs'); writeFileSync(f, rec7); const r = spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' }); ok(r.status === 0, 'node --check, version adaptée du recalcul de T7', 'code ' + r.status + ' ; ' + REC7P.slice(0, 12) + '…'); }

// (2e) Documents de pilotage, bilan, inventaire
const A_RUB = '**consolidation technique de T6 achevée**, en attente de relecture avant sa clôture définitive (bilan du volet 2, §8.101)';
const N_RUB = A_RUB + ' ; **T6 close le 2026-10-29** (clôture documentaire définitive, autorisée après la relecture de la consignation appliquée ; 22 sens, 22 conformes, aucun écart, aucune correction lexicale nouvelle ; décisions non rouvertes ; 39 empreintes) ; **inscription ciblée à l\'inventaire appliquée le 2026-10-29**, sur autorisation distincte (une ligne, pour `appliquer-consignation-T6.mjs` ; `a2-05-travail/arbitrage-T6/consignation-T6/inventaire/appliquer-inventaire-consignation-T6.mjs`, une fois, code 0) ; **périmètre opérationnel de T7 (D1, D4 ; 24 sens, 24 ENTRY) accepté le 2026-10-29**, sans ajout, retrait, déplacement ni report (`docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md`, §0 inscrit par le générateur v2, proposition conservée ; lignes 253 à 266 et 289 à 298, l\'intervalle étant D2 et D3, soit T5 ; thème normatif : présence ou absence des fonctions linguistiques selon A7 et A9, sens par sens ; recalcul indépendant conforme, 16 sabotages sur 16, inventaire des 81 restants vérifié ; orientation et frontières de l\'audit retenues ; hors du manifeste, ajout non autorisé) ; audit des 24 sens non autorisé (bilan du volet 2, §8.102)';
const A_PA = /^- \*\*Prochaine action\.\*\* La relecture de la consolidation technique de T6 [^\r\n]*/m;
const N_PA = '- **Prochaine action.** L\'intégration du périmètre accepté de T7 au manifeste (40e entrée ; `docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md`), sur autorisation distincte, avec l\'adaptation préalable du recalcul de T7, qui exige ce périmètre hors du manifeste (préparée le 2026-10-29) ; puis la synchronisation du bloc d\'état ; puis l\'audit individuel des 24 sens de T7, sur autorisation distincte, dans les frontières du §0 du périmètre ; puis, chacun sur autorisation distincte : le statut de T1 et de T2 dans `registre-tranches.json`, sur arbitrage distinct ; la décision sur le défaut « RES » de T9, à part ; la correction retenue en principe de `tools/export-relecture.mjs` (A2-GLOBAL-v1) ; l\'arbitrage normatif distinct de la proposition d\'addendum. Aucune correction lexicale n\'est appliquée. Aucun `git add`, commit ni push sans autorisations distinctes.';
const rubriques = (t, doc) => { t = remplacer(t, doc, A_RUB, N_RUB); const m = t.match(new RegExp(A_PA.source, 'gm')) ?? []; if (m.length !== 1) arret(doc + ' : « Prochaine action » présente ' + m.length + ' fois'); return t.replace(A_PA, () => N_PA); };
const J = '| 2026-10-29 | 2 · A2-05 | **T6 close** (clôture documentaire définitive, autorisée après la relecture de la consignation appliquée ; 22 conformes ; décisions non rouvertes ; 39 empreintes). **Inscription ciblée à l\'inventaire appliquée**, sur autorisation distincte : une ligne pour `appliquer-consignation-T6.mjs` (+1/−0 ; original sauvegardé ; contrôles conformes ; index vide). **Périmètre opérationnel de T7 préparé puis accepté**, sans ajout, retrait, déplacement ni report : D1 et D4, 24 sens, 24 ENTRY, lignes 253 à 266 et 289 à 298 (intervalle D2 et D3, T5) ; thème normatif, présence ou absence des fonctions linguistiques selon A7 et A9, sens par sens (`a2-05-travail/perimetre-T7.mjs`, générateur v2 ; recalcul indépendant `a2-05-travail/recalcul-T7-perimetre.mjs`, 24 contrôles conformes, 16 sabotages sur 16 ; inventaire des 81 restants vérifié) ; §0 inscrit par le générateur v2, proposition conservée ; orientation et frontières de l\'audit retenues. Hors du manifeste, ajout non autorisé ; relais 29 sur 30 (C9a attendu) ; recalcul de T7 adapté à la 40e entrée, préparé, non appliqué. Audit des 24 sens non autorisé. Bilan du volet 2, §8.102. **296/377 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-24 libre ; 39 empreintes.** | non committé |';
const journal = (t) => { const eol = t.includes('\r\n') ? '\r\n' : '\n'; const L = t.split(eol); let k = L.length - 1; while (k >= 0 && L[k] === '') k--; if (!/^\| 2026-10-29 \| 2 · A2-05 \| \*\*Opération B appliquée\*\*/.test(L[k])) arret(ETAT + ' : dernière ligne du journal inattendue'); L.splice(k + 1, 0, J); return L.join(eol); };
const S8102 = [
  '### 8.102 Volet 1, lot 3 : T6 close ; inscription ciblée à l\'inventaire ; périmètre de T7 accepté (D1, D4 ; 24 sens, 24 ENTRY) (2026-10-29)',
  '',
  'Décisions du 2026-10-29 (ChatGPT, par délégation ; relayées par l\'utilisateur), chacune distincte : « **J\'accepte la consignation et autorise la clôture documentaire définitive de T6.** » ; « **Je demande explicitement de lancer la préparation de T7, en proposition uniquement.** » ; puis « **J\'accepte le périmètre opérationnel de T7 : D1 et D4, soit 24 sens dans 24 ENTRY.** » ; « **J\'autorise la préparation, sans application, de la consolidation du périmètre T7.** » ; et, séparément, l\'application de l\'unique ligne d\'inventaire proposée pour `arbitrage-T6/consignation-T6/appliquer-consignation-T6.mjs`. La protection du périmètre, le remplacement du recalcul de T7 et la synchronisation relèvent d\'autorisations distinctes.',
  '',
  '**T6 close** : clôture documentaire définitive autorisée après la relecture de la consignation appliquée (§8.101) ; 22 sens, 22 conformes, aucun écart, aucun suspendu, aucune correction lexicale nouvelle ; décisions non rouvertes ; 39 empreintes. La réserve normative de T5 (§8.95) reste conservée, non résolue.',
  '',
  '**Inscription ciblée à l\'inventaire, appliquée** (`a2-05-travail/arbitrage-T6/consignation-T6/inventaire/appliquer-inventaire-consignation-T6.mjs`, essayé une fois sur une copie jetable, puis lancé une fois sur le dépôt réel, code 0) : inventaire à l\'empreinte relue (`8ad6ae0c…`), ancre unique, diff régénéré identique au diff relu (+1/−0) ; original sauvegardé (`…/inventaire/application/depart/`) ; une seule ligne ajoutée, aucune ligne existante modifiée (`30e18df2…`) ; contrôles en service conformes avant et après ; seul l\'inventaire changé ; index vide ; `git diff --check` code 0. Ni le journal ni le bilan n\'avaient été modifiés pour cette seule inscription : elle est consignée ici, avec la consolidation.',
  '',
  '**Périmètre opérationnel de T7** (`docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md`) : livraisons D1 et D4, retenues pour T7 par l\'étude de méthode arbitrée le 2026-10-18 ; 24 sens, 24 ENTRY ; deux segments contigus du découpage, lignes 253 à 266 (D1, 14 sens) et 289 à 298 (D4, 10 sens), l\'intervalle étant exactement D2 et D3 (T5, arbitrée). Thème normatif, non lexical : les 24 sens sont candidats sur C7 (22 `C7-c`, 2 `C7-b`, 天気 et 向こう, sans `deictique`) ; aucun ne porte de fonction d\'A9 ; 近々 et 後 (sens 1) portent `deictique`. Généré par `a2-05-travail/perimetre-T7.mjs` avec le générateur v2, non modifié ; recalcul indépendant `a2-05-travail/recalcul-T7-perimetre.mjs` conforme (24 contrôles ; 16 sabotages sur 16 ; inventaire des 81 restants par livraison et par tranche, sans compte global figé : T7 24, T8 16, T9 24, F 17 ; les 296 sens arbitrés à la clôture de T6 toujours arbitrés). Décisions applicables : 43, toutes validées, lues sans être rouvertes ; corrections retenues sur ces ENTRY : V2-17, V2-34, V2-38, V2-56, V2-67, V2-68, non appliquées. Aucun ajout, retrait, déplacement ni report.',
  '',
  '**Acceptation inscrite** : §0 inscrit par le générateur v2 (constante `ARBITRAGE` de `a2-05-travail/perimetre-T7.mjs`) ; seuls le statut et le §0 changent (version acceptée `' + ACC.slice(0, 12) + '…`) ; la proposition livrée est sauvegardée à l\'identique (`a2-05-travail/arbitrage-T7/proposition-T7-perimetre.md`, `' + PER_SHA.slice(0, 12) + '…`). **Orientation de l\'audit retenue** : présence ou absence des fonctions linguistiques selon A7 et A9, sens par sens ; les 24 sens du criblage C7 conservés ; aucun déclencheur de traduction présumé fonction ; examen particulier de la fonction `deictique` existante de 近々 et de 後 (sens 1) ; les 43 décisions validées et les six corrections V2 préservées, sans réouverture ; frontières avec T8, T9 et le bloc F suspendu maintenues.',
  '',
  '**Protection** : le périmètre accepté n\'est pas ajouté au manifeste (39 empreintes) ; relais 29 sur 30, C9a attendu (périmètre accepté hors du manifeste). L\'ajout de la 40e entrée mettrait en écart le seul recalcul de T7, qui exige ce périmètre hors du manifeste ; le contrôle du bilan du pilote et les recalculs de T5 et de T6 admettent déjà un manifeste plus long. L\'adaptation du recalcul de T7 a été préparée le 2026-10-29 (`' + REC7P.slice(0, 12) + '…`) et simulée dans un clone jetable, état par état, avec six sabotages ; elle doit précéder l\'ajout, sur autorisation distincte ; la synchronisation du bloc d\'état suivrait.',
  '',
  'Audit des 24 sens non autorisé ; aucune décision lexicale ; registre des tranches non modifié. Décomptes : 296/377, 81 restants ; bloc B 148/148 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 libre ; 39 empreintes. Aucun `git add`, commit ni push.',
];
const bilan = (t) => { if (!/^### 8\.101 /m.test(t) || /^### 8\.102 /m.test(t)) arret(BIL + ' : §8.101 absent ou §8.102 déjà présent'); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8102.join(eol) + eol; };
const ANCRE_INV = '| `arbitrage-T6/consignation-T6/appliquer-consignation-T6.mjs` |';
const LIGNES_INV = [
  "| `arbitrage-T6/consignation-T6/inventaire/preparer-inventaire-consignation-T6.mjs` | préparation de l'unique ligne d'inventaire pour `appliquer-consignation-T6.mjs`, sans application : ancre unique, version proposée et diff exact (+1/−0), aucune ligne existante modifiée, inventaire réel inchangé | `arbitrage-T6/consignation-T6/inventaire/` (version proposée, diff, sortie) | lancé le 2026-10-29, code 0 |",
  "| `arbitrage-T6/consignation-T6/inventaire/appliquer-inventaire-consignation-T6.mjs` | application de cette ligne : préconditions (inventaire, version proposée et diff relus à leurs empreintes ; diff régénéré identique octet pour octet ; ligne absente ; ancre unique ; contrôles en service ; index vide), sauvegarde, insertion ciblée, contrôles (diff réel +1/−0, aucune ligne existante modifiée, contrôles en service, seul l'inventaire changé, index vide, `git diff --check`) ; chemins de machine masqués dans la trace | cet inventaire ; `…/inventaire/application/depart/`, `…/sorties/` | essayé une fois sur une copie jetable, code 0 ; puis lancé une fois sur le dépôt réel le 2026-10-29, code 0 |",
  "| `perimetre-T7.mjs` | périmètre opérationnel de T7 (D1, D4) : configuration (autorisation, 13 risques rédigés, sans verdict) passée au générateur v2, non modifié ; constante `ARBITRAGE` renseignée le 2026-10-29 (périmètre accepté, orientation et frontières de l'audit) | `docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md` | lancé le 2026-10-29, code 0 (proposition, `" + PER_SHA.slice(0, 8) + "…`) ; version acceptée (`" + ACC.slice(0, 8) + "…`) préparée le 2026-10-29 par `arbitrage-T7/preparer-consolidation-T7.mjs`, appliquée seulement sur autorisation distincte |",
  "| `recalcul-T7-perimetre.mjs` | recalcul indépendant du périmètre de T7 (n'importe aucun module v2) : découpage, deux segments contigus et leur intervalle (D2 et D3), doublons, sens non encore examinés, inventaire des restants sans compte global figé (option `--inventaire`), protection historique des 296 sens arbitrés à la clôture de T6, criblage C7, fonctions (aucune d'A9 ; `deictique` sur 近々 et 後), lots d'origine, décisions du journal, corrections, provenance, relations, autres sens des mêmes ENTRY, frontières, comparables, manifeste ; version adaptée à la 40e entrée : périmètre accepté (§0, proposition sauvegardée, empreinte fixée `" + ACC.slice(0, 8) + "…`), les 39 premières entrées dans leur ordre, périmètre de T7 en 40e | — (lecture seule) | version initiale (`" + REC7_SHA.slice(0, 8) + "…`) : lancée le 2026-10-29, code 0, 24 contrôles ; version adaptée (`" + REC7P.slice(0, 8) + "…`) préparée le 2026-10-29, non installée : seul écart la 40e entrée sur l'état à 39 entrées, puis 26 sur 26 après l'ajout |",
  "| `arbitrage-T7/sabotages-recalcul-T7.mjs` | tests de résistance de la version initiale du recalcul de T7, dans un clone git jetable : témoins sains avant et après (24 contrôles), 16 sabotages (découpage, données, journal, lots, criblage, registre, bilan, rapports arbitrés, manifeste, périmètre généré), chacun restauré et vérifié ; dépôt réel comparé avant et après | `arbitrage-T7/sorties/sabotages.txt` | lancé le 2026-10-29 : premier lancement code 1 (attente du harnais : 25 contrôles au lieu de 24 ; sortie `arbitrage-T7/sorties/lancement-1-code1.txt`), second code 0, 16 sur 16 ; écrit pour la version initiale du recalcul |",
  "| `arbitrage-T7/preparer-consolidation-T7.mjs` | préparation de la consolidation du périmètre accepté de T7 et de la clôture de T6, avec l'adaptation du recalcul de T7 à la 40e entrée, sans application ; simulation dans un clone git jetable, états E0 à E4 (consolidation, recalcul remplacé, 40e entrée, synchronisation), puis six sabotages du recalcul adapté | `arbitrage-T7/consolidation/` (versions proposées, diffs, manifeste simulé, aperçu d'E3, documents d'E4, sortie) | lancé le 2026-10-29 ; consolidation appliquée seulement sur autorisation distincte |",
  "| `arbitrage-T7/proposition-T7-perimetre.md` | proposition livrée du périmètre de T7 (`" + PER_SHA.slice(0, 8) + "…`), lue par le recalcul adapté ; copie exacte, écrite à l'application de la consolidation | — | — |",
];
const inventaire = (t) => { const eol = t.includes('\r\n') ? '\r\n' : '\n'; const L = t.split(eol); const k = L.findIndex((l) => l.startsWith(ANCRE_INV)); if (k < 0 || L.filter((l) => l.startsWith(ANCRE_INV)).length !== 1) arret(INV + ' : ancre absente ou multiple'); if (LIGNES_INV.some((x) => t.includes(x.split(' | ')[0]))) arret(INV + ' : ligne déjà présente'); L.splice(k + 1, 0, ...LIGNES_INV); return L.join(eol); };
const prop = { [ETAT]: journal(rubriques(lire(ETAT), ETAT)), [ROAD]: rubriques(lire(ROAD), ROAD), [BIL]: bilan(lire(BIL)), [INV]: inventaire(lire(INV)) };
const pa = (t) => (t.match(/^- \*\*Prochaine action\.\*\*[^\r\n]*/m) ?? [''])[0];
const rub = (t) => (t.match(/[^\r\n]*consolidation technique de T6 achevée[^\r\n]*/) ?? [''])[0];
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]) === N_PA && rub(prop[ETAT]) === rub(prop[ROAD]) && rub(prop[ETAT]).includes(N_RUB), 'rubriques d\'état courant et « Prochaine action » identiques dans les deux documents proposés');
ok(!S8102.some((l) => /^\| /.test(l)), '§8.102 : aucune ligne de tableau (comptage des corrections et des réservations inchangé)');
ok(LIGNES_INV.every((l) => l.split('|').length === 6), 'inventaire : sept lignes de tableau à quatre colonnes');

// E1 : consolidation documentaire (proposition sauvegardée, périmètre régénéré, pilotage, bilan, inventaire)
for (const p of [ETAT, ROAD, BIL, INV]) writeFileSync(join(C, p), prop[p]);
dire('\n# E1 : consolidation documentaire, contrôles d\'origine');
const E1 = etape('E1');
ok(rel(E1, 29, ['C9a']) && cov0(E1) && E1.emp.code === 0 && E1.emp.out.endsWith('hors du manifeste : ' + PER) && autres(E1) && E1.rec7.code === 0 && conformes(E1.rec7) === 24 && E1.hunks === 0, 'E1 : relais 29 sur 30, seul écart C9a ; périmètre accepté signalé hors du manifeste ; contrôles conformes (recalcul de T7 d\'origine 24) ; aperçu vide', E1.emp.out.split('\n').pop());
// E2 : recalcul de T7 remplacé, toujours 39 empreintes
const orig7 = join(tmp, 'origine-recalcul-T7-perimetre.mjs'); cpSync(join(C, REC7), orig7); writeFileSync(join(C, REC7), rec7);
dire('\n# E2 : recalcul de T7 adapté, 39 empreintes');
const E2 = etape('E2');
ok(rel(E2, 29, ['C9a']) && cov0(E2) && autres(E2) && E2.rec7.code === 1 && conformes(E2.rec7) === 25 && seuls(E2.rec7, ['manifeste : au moins 40 empreintes recalculées, toutes identiques ; les 39 premières entrées dans leur ordre ; périmètre accepté de T7 protégé (40e entrée)']) && E2.hunks === 0,
  'E2 : recalcul de T7 adapté, 25 conformes et un seul écart, le manifeste (périmètre de T7 hors du manifeste) ; autres contrôles conformes ; relais 29 sur 30 (C9a) ; aperçu vide');
// E3 : 40e entrée ajoutée par l'outil réel
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); const manB = readFileSync(join(C, MAN), 'utf8'); const mB = JSON.parse(manB); const cles = Object.keys(mB.empreintes);
ok(aj.code === 0 && cles.length === 40 && cles[39] === PER && mB.empreintes[PER] === ACC && cles0.every((p, k) => cles[k] === p && mB.empreintes[p] === man0[p]), 'E3 : ajout par l\'outil réel, seul le périmètre accepté de T7 (40 entrées ; les 39 précédentes inchangées, en valeur et en ordre)', aj.out.split('\n').pop());
dire('\n# E3 : 40 empreintes');
const E3 = etape('E3');
ok(rel(E3, 30, []) && cov0(E3) && E3.emp.code === 0 && E3.emp.out === 'empreintes : 40 rapports contrôlés, identiques' && autres(E3) && E3.rec7.code === 0 && conformes(E3.rec7) === 26 && E3.hunks > 0, 'E3 : relais 30 sur 30 (C9a résolu) ; 40 empreintes ; contrôle du bilan du pilote 46, recalculs de T5 17, de T6 27, de T7 adapté 26 ; aperçu non vide (bloc d\'état resté à 39)', 'plan ' + E3.plan + ' ; ' + E3.hunks + ' hunk(s)');
const hors = E3.apercu.split('\n').filter((l) => /^[-+](?![-+])/.test(l) && !/^[-+](<!-- a2-05:etat|- \*\*Contrôles\*\*)/.test(l));
ok(hors.length === 0 && /40 rapports arbitrés identiques/.test(E3.apercu), 'E3 : l\'aperçu ne change que le marqueur et la ligne « Contrôles » des blocs (39 → 40 rapports)', hors.length ? hors.length + ' autre(s) ligne(s)' : 'aucune autre ligne');
{ const r = lancerHors(orig7); constat('E3, recalcul de T7 d\'origine (périmètre de T7 exigé hors du manifeste)', 'code ' + r.code + ' ; ' + conformes(r) + ' conformes ; ' + (ecartsDe(r).map((l) => l.replace(/^ÉCART\s+/, '').slice(0, 120)).join(' ; ') || 'aucun écart')); }
// E4 : bloc d'état synchronisé par l'outil réel
const sy = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', E3.plan ?? '');
dire('\n# E4 : bloc d\'état synchronisé');
const E4 = etape('E4');
ok(sy.code === 0 && rel(E4, 30, []) && cov0(E4) && E4.emp.code === 0 && autres(E4) && E4.rec7.code === 0 && conformes(E4.rec7) === 26 && E4.hunks === 0, 'E4 : relais 30 sur 30 ; tous les contrôles conformes ; aperçu vide', sy.out.split('\n').pop() + ' ; plan suivant ' + E4.plan);
const docsE4 = { [ETAT]: readFileSync(join(C, ETAT), 'utf8'), [ROAD]: readFileSync(join(C, ROAD), 'utf8') };
const bloc = (t) => { const s = t.replace(/\r/g, ''); return s.slice(s.indexOf('<!-- a2-05:etat:debut'), s.indexOf('<!-- a2-05:etat:fin -->') + 24); };
const lignesChangees = (a, b) => { const A = a.split(/\r?\n/), B = b.split(/\r?\n/); return A.length === B.length ? A.map((l, k) => (l === B[k] ? -1 : k + 1)).filter((k) => k > 0) : null; };
const chE4 = { [ETAT]: lignesChangees(prop[ETAT], docsE4[ETAT]), [ROAD]: lignesChangees(prop[ROAD], docsE4[ROAD]) };
ok(bloc(docsE4[ETAT]) === bloc(docsE4[ROAD]) && Object.values(chE4).every((c) => c && c.length > 0 && c.length <= 3), 'E4 : blocs d\'état identiques dans les deux documents ; seules quelques lignes des blocs changent par rapport à E1', ETAT + ' lignes ' + chE4[ETAT] + ' ; ' + ROAD + ' lignes ' + chE4[ROAD]);

// Sabotages du recalcul adapté, sur l'état E4 : chacun modifie réellement des fichiers, doit rendre le code 1 avec l'écart attendu, puis est restauré
dire('\n# Sabotages du recalcul de T7 adapté (état E4)');
const SJ = (o) => JSON.stringify(o, null, 2) + '\n';
const SAB = [
  ['R1', '§0 du périmètre accepté altéré, manifeste réaligné', [[PER, (t) => t.replace('**Comptes maintenus**', '**Comptes**')], [MAN, (t, cur) => { const m = JSON.parse(t); m.empreintes[PER] = shaT(cur[PER]); return SJ(m); }]], 'périmètre accepté identique à sa version acceptée'],
  ['R2', 'proposition sauvegardée supprimée', [[PROP, () => null]], 'périmètre accepté (§0)'],
  ['R3', 'proposition sauvegardée altérée (une ligne du §6)', [[PROP, (t) => t.replace('## 6. Risques', '## 6. Risque')]], 'périmètre accepté (§0)'],
  ['R4', 'statut du périmètre revenu en proposition, manifeste réaligné', [[PER, (t) => t.replace('**Statut** : **périmètre accepté le 2026-10-29 (§0).**', '**Statut** : **proposition de périmètre opérationnel, non arbitrée.**')], [MAN, (t, cur) => { const m = JSON.parse(t); m.empreintes[PER] = shaT(cur[PER]); return SJ(m); }]], 'périmètre accepté (§0)'],
  ['R5', '40e entrée retirée du manifeste', [[MAN, (t) => { const m = JSON.parse(t); delete m.empreintes[PER]; return SJ(m); }]], 'manifeste'],
  ['R6', 'deux entrées antérieures permutées dans le manifeste', [[MAN, (t) => { const m = JSON.parse(t); const e = Object.entries(m.empreintes); [e[36], e[37]] = [e[37], e[36]]; m.empreintes = Object.fromEntries(e); return SJ(m); }]], 'manifeste'],
];
const temoin = (quand) => { const r = lancer(REC7); ok(r.code === 0 && conformes(r) === 26 && !ecartsDe(r).length, 'témoin sain ' + quand + ' (recalcul adapté)', 'code ' + r.code + ', ' + conformes(r) + ' conformes'); };
temoin('avant');
for (const [n, quoi, mods, attendu] of SAB) {
  const orig = Object.fromEntries(mods.map(([p]) => [p, existsSync(join(C, p)) ? readFileSync(join(C, p)) : null])); const cur = {}; let effet = true;
  for (const [p, f] of mods) { const avant = readFileSync(join(C, p), 'utf8'); const apres = f(avant, cur); if (apres === avant) effet = false; if (apres === null) unlinkSync(join(C, p)); else { writeFileSync(join(C, p), apres); cur[p] = apres; } }
  const r = lancer(REC7);
  for (const [p, b] of Object.entries(orig)) writeFileSync(join(C, p), b);
  const ec = ecartsDe(r).map((l) => l.replace(/^ÉCART\s+/, '').split(' : ')[0]);
  ok(effet && r.code === 1 && ec.some((l) => l.startsWith(attendu)) && Object.entries(orig).every(([p, b]) => sha(join(C, p)) === shaT(b)), n + ' ' + quoi, 'code ' + r.code + ' ; ' + ec.length + ' écart(s) : ' + ec.join(' | ').slice(0, 260) + ' ; restauré');
}
temoin('après');
rmSync(tmp, { recursive: true, force: true });

// (3) Écriture des propositions, des différences et des états intermédiaires
mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
const sorties = [[CFG, 'perimetre-T7.mjs', cfgProp], [PER, 'etape2-A2-05-volet1-lot3-T7-perimetre.md', perProp], [ETAT, 'ETAT-ACTUEL.md', prop[ETAT]], [ROAD, 'ROADMAP.md', prop[ROAD]], [BIL, 'etape2-A2-05-bilan-volet2.md', prop[BIL]], [INV, 'INVENTAIRE-SCRIPTS.md', prop[INV]], [REC7, 'recalcul-T7-perimetre.mjs', rec7], [MAN, 'empreintes-rapports-arbitres-simule-E3.json', manB]];
dire('\n# Versions proposées');
for (const [p, nom, t] of sorties) {
  writeFileSync(join(root, OUT, nom), t);
  const d = spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', p, OUT + '/' + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  writeFileSync(join(root, OUT, 'diffs', nom + '.diff'), d.stdout);
  const n = (c) => d.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length;
  ok(d.status === 1 && t.includes('\r\n') === lire(p).includes('\r\n'), 'proposé : ' + p, '+' + n('+') + ' / -' + n('-') + ' lignes ; ' + shaT(t).slice(0, 12) + '… ; diff ' + shaT(d.stdout).slice(0, 12) + '…');
}
writeFileSync(join(root, OUT, 'proposition-T7-perimetre.md'), lire(PER));
ok(sha(join(root, OUT, 'proposition-T7-perimetre.md')) === PER_SHA, 'proposition à sauvegarder (' + PROP + ') : copie exacte du périmètre relu', PER_SHA.slice(0, 12) + '…');
writeFileSync(join(root, OUT, 'apercu-E3.md'), E3.apercu);
for (const [p, t] of Object.entries(docsE4)) writeFileSync(join(root, OUT, p.replace('.md', '-E4.md')), t);

// (4) Dépôt réel inchangé
const reel1 = instantane(); const ch = [...new Set([...Object.keys(reel0), ...Object.keys(reel1)])].filter((p) => reel0[p] !== reel1[p]);
ok(ch.length === 0 && !existsSync(join(root, PROP)), 'dépôt réel inchangé hors de ' + OUT + ' (' + Object.keys(reel1).length + ' fichiers comparés ; proposition non sauvegardée à sa place)', ch.join(', ') || 'aucune modification');
dire(ko ? ko + ' écart(s)' : 'préparation conforme');
writeFileSync(join(root, OUT, 'sortie.txt'), log.join('\n') + '\n');
process.exit(ko ? 1 : 0);
