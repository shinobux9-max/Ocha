// A2-05 · volet 1 · lot 3 : préparation de la consolidation documentaire du périmètre accepté de T5 et de la clôture de T4, EN PROPOSITION :
// aucun fichier concerné n'est modifié (rapport de périmètre, configuration, documents de pilotage, bilan, manifeste).
// Usage : node a2-05-travail/arbitrage-T5/preparer-consolidation-T5.mjs <racine du dépôt>
// (1) Préconditions sur le dépôt réel : périmètre de T5 = proposition relue (empreinte), 35 empreintes identiques, T5 absent du manifeste, ancres.
// (2) Dans un clone git jetable (--shared, --no-checkout) recouvert de l'arbre de travail : la configuration perimetre-T5.mjs, constante ARBITRAGE
// renseignée, régénère le périmètre par le générateur v2 ; seuls le statut et le §0 doivent changer. Versions proposées d'ETAT-ACTUEL.md et de
// ROADMAP.md (rubrique « Proposé, non validé », « Prochaine action », à l'identique), du journal (ETAT-ACTUEL.md) et du bilan (§8.93).
// (3) Simulation, étape A (consolidation seule) : relais, couverture, manifeste, contrôle du bilan du pilote, aperçu, recalcul ; étape B (ajout
// du périmètre au manifeste par l'outil réel, dans le clone) : mêmes contrôles, résultats relevés comme constats. (4) Versions proposées,
// manifeste simulé et différences écrits dans arbitrage-T5/consolidation/ (refus si le dossier existe). (5) Dépôt réel inchangé. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T5/consolidation';
const CFG = 'a2-05-travail/perimetre-T5.mjs', PER = 'docs/rapports/etape2-A2-05-volet1-lot3-T5-perimetre.md', MAN = 'a2-05-travail/empreintes-rapports-arbitres.json';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const PER_SHA = 'ee014eb7d33e1bb5b0f09afeb1e0b6e51661e99c789a9ed7455e289bf0b098fb';
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex'); const shaT = (t) => createHash('sha256').update(t).digest('hex');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l, d) => console.log('constat  ' + l + (d ? ' : ' + d : ''));
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const TEMOINS = [CFG, PER, MAN, ETAT, ROAD, BIL, 'a2-05-travail/INVENTAIRE-SCRIPTS.md', 'a2-05-travail/registre-tranches.json', 'a2-05-travail/controle-bilan-pilote.mjs', 'data/n5/vocab.json'];
const avant = Object.fromEntries(TEMOINS.map((p) => [p, sha(join(root, p))]));
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');
const lire = (p) => readFileSync(join(root, p), 'utf8');

// (1) Préconditions
const man0 = JSON.parse(lire(MAN)).empreintes;
const diffE = Object.entries(man0).filter(([p, h]) => sha(join(root, p)) !== h).map(([p]) => p);
ok(avant[PER] === PER_SHA && /^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/m.test(lire(PER)), 'périmètre de T5 = proposition relue, au statut de proposition', avant[PER].slice(0, 12) + '…');
ok(Object.keys(man0).length === 35 && !diffE.length && !Object.hasOwn(man0, PER), 'manifeste : 35 empreintes identiques ; périmètre de T5 absent', Object.keys(man0).length + ' entrées');
ok(/^const ARBITRAGE = null;$/m.test(lire(CFG)), 'configuration : ARBITRAGE non renseigné');

// (2a) Configuration proposée : seule la constante ARBITRAGE change
const ARBITRAGE = `const ARBITRAGE = { date: '2026-10-25', texte: [
  "Arbitrage du 2026-10-25 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **J'accepte le périmètre opérationnel de T5 : livraisons D2 et D3, 22 sens dans 18 ENTRY, sans ajout, retrait ni déplacement.** » Lignes 267 à 288 du découpage arbitré ; thème : deixis de personne et d'espace, hors interrogatifs. Les 125 sens restants sont répartis entre T5 à T9 et le bloc F conformément au registre existant, qui n'est pas modifié. Les exclusions et les dépendances documentées au §6.4 sont confirmées.",
  '',
  "Les règles \`C2-0\` et \`C4-0\` désignent des **populations à examiner, non des écarts présumés**. Les dix corrections déjà retenues sur ces ENTRY (V2-124 à V2-132, V2-143) sont conservées comme éléments préparatoires, ni rouvertes ni appliquées.",
  '',
  "**Frontières du futur audit** : (1) examiner les \`category: null\` selon A5 et les \`semantic_type: null\` selon A6, sens par sens ; (2) respecter les décisions validées du lot 11, notamment les 20 décisions \`type-nul\` ; (3) examiner \`deictique\` selon A7 ; (4) n'envisager \`politesse\` selon A9 que lorsqu'elle est justifiée par la fiche et joue un rôle dans le sens ; (5) ne pas inventer de sens, de graphie, de lecture ni d'emploi ; (6) ne pas rouvrir les décisions antérieures ni examiner le bloc F ; (7) lire intégralement chaque fiche, exemples et anciens exemples compris.",
  '',
  "**L'audit lexical des 22 sens n'est pas autorisé** : il le sera distinctement, après la protection du périmètre (36e entrée du manifeste, sur autorisation distincte). **Comptes maintenus** : 252/377 ; bloc B 148/148 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-24 libre ; 35 empreintes jusqu'à l'intégration autorisée du périmètre.",
] };`;
const cfgProp = lire(CFG).replace(/^const ARBITRAGE = null;$/m, () => ARBITRAGE);

// (2b) Documents de pilotage
const remplacer = (t, doc, ancre, nouveau) => { const n = t.split(ancre).length - 1; if (n !== 1) arret(doc + ' : ancre présente ' + n + ' fois : ' + ancre.slice(0, 80) + '…'); return t.replace(ancre, () => nouveau); };
const A_RUB = '**consolidation technique de T4 achevée**, en attente de relecture avant sa clôture définitive (bilan du volet 2, §8.92)';
const N_RUB = A_RUB + ' ; **formalisation de la consolidation de T4 appliquée le 2026-10-25**, sur autorisation (versions identiques aux versions relues ; relais 30 sur 30) ; **consolidation de T4 acceptée et T4 close le 2026-10-25** (clôture documentaire définitive ; décisions non rouvertes) ; **périmètre opérationnel de T5 (D2, D3 ; 22 sens, 18 ENTRY) accepté le 2026-10-25**, sans ajout, retrait ni déplacement (`docs/rapports/etape2-A2-05-volet1-lot3-T5-perimetre.md`, §0 inscrit par le générateur v2, proposition conservée ; deixis de personne et d\'espace, hors interrogatifs ; recalcul indépendant conforme, inventaire des 125 restants vérifié ; frontières de l\'audit retenues ; hors du manifeste, ajout non autorisé) ; audit des 22 sens non autorisé (bilan du volet 2, §8.93)';
const A_PA = /^- \*\*Prochaine action\.\*\* La relecture de la consolidation technique de T4 [^\r\n]*/m;
const N_PA = '- **Prochaine action.** L\'intégration du périmètre accepté de T5 au manifeste (36e entrée ; `docs/rapports/etape2-A2-05-volet1-lot3-T5-perimetre.md`), sur autorisation distincte, avec l\'adaptation préalable du contrôle du bilan du pilote, qui exige 35 empreintes ; puis la synchronisation du bloc d\'état ; puis l\'audit individuel des 22 sens de T5, sur autorisation distincte, dans les frontières du §0 du périmètre ; puis, chacun sur autorisation distincte : le statut de T1 et de T2 dans `registre-tranches.json`, sur arbitrage distinct ; la décision sur le défaut « RES » de T9, à part ; la correction retenue en principe de `tools/export-relecture.mjs` (A2-GLOBAL-v1) ; l\'arbitrage normatif distinct de la proposition d\'addendum. Aucune correction lexicale n\'est appliquée. Aucun `git add`, commit ni push sans autorisations distinctes.';
const rubriques = (t, doc) => { t = remplacer(t, doc, A_RUB, N_RUB); const m = t.match(new RegExp(A_PA.source, 'gm')) ?? []; if (m.length !== 1) arret(doc + ' : « Prochaine action » présente ' + m.length + ' fois'); return t.replace(A_PA, () => N_PA); };
const J3 = '| 2026-10-25 | 2 · A2-05 | **Formalisation de la consolidation de T4 appliquée**, sur autorisation : quatre diffs régénérés identiques aux diffs relus, versions copiées identiques aux versions autorisées (rubriques à l\'identique dans `ETAT-ACTUEL.md` et `ROADMAP.md`, journal, §8.92, inventaire) ; relais 30 sur 30 ; aperçu vide ; 35 empreintes ; contrôle du bilan du pilote conforme. **T4 close** (clôture documentaire définitive autorisée ; décisions non rouvertes). **Périmètre opérationnel de T5 préparé puis accepté**, sans ajout, retrait ni déplacement : D2 et D3, 22 sens, 18 ENTRY, lignes 267 à 288 ; deixis de personne et d\'espace, hors interrogatifs (`a2-05-travail/perimetre-T5.mjs`, générateur v2 ; recalcul indépendant `a2-05-travail/recalcul-T5-perimetre.mjs`, conforme ; inventaire des 125 restants vérifié) ; §0 inscrit par le générateur v2, proposition conservée ; frontières de l\'audit retenues ; `C2-0` et `C4-0`, populations à examiner. Hors du manifeste, ajout non autorisé ; relais 29 sur 30 (C9a attendu). Audit des 22 sens non autorisé ; T6 non préparée. Bilan du volet 2, §8.93. **252/377 ; bloc B 148/148 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-24 libre ; 35 empreintes.** | non committé |';
const journal = (t) => { const eol = t.includes('\r\n') ? '\r\n' : '\n'; const L = t.split(eol); let k = L.length - 1; while (k >= 0 && L[k] === '') k--; if (!/^\| 2026-10-25 \| 2 · A2-05 \| \*\*Arbitrage de T4 inscrit\*\*/.test(L[k])) arret(ETAT + ' : dernière ligne du journal inattendue'); L.splice(k + 1, 0, J3); return L.join(eol); };
const S893 = [
  '### 8.93 Volet 1, lot 3 : formalisation de la consolidation de T4 appliquée ; T4 close ; périmètre de T5 accepté (D2, D3 ; 22 sens, 18 ENTRY) (2026-10-25)',
  '',
  'Décisions du 2026-10-25 (ChatGPT, par délégation ; relayées par l\'utilisateur) : « **J\'autorise l\'application exacte de la formalisation préparée dans la partie 4 de la note d\'export.** » ; « **J\'autorise la clôture documentaire définitive de T4.** » ; « **Je demande explicitement de lancer la préparation du périmètre de T5, en proposition uniquement.** » ; puis « **J\'accepte le périmètre opérationnel de T5 : livraisons D2 et D3, 22 sens dans 18 ENTRY, sans ajout, retrait ni déplacement.** » La protection du périmètre et les changements de pilotage sont autorisés séparément.',
  '',
  '**Formalisation de la consolidation de T4, appliquée** : préconditions vérifiées avant écriture (les quatre diffs régénérés, document réel → version proposée, identiques octet pour octet aux diffs relus ; ancres présentes une fois ; ajouts absents) ; versions proposées copiées, chacune identique à sa version autorisée (`ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2, inventaire des scripts) ; relais `--apres-application` 30 sur 30 ; aperçu de synchronisation vide ; 35 empreintes identiques ; contrôle du bilan du pilote conforme ; couverture 252/377, 125 restants ; 196 corrections dans 172 ENTRY, V1-24 libre ; bloc `a2-05:etat` non modifié ; zones protégées, index et `git diff --check` conformes.',
  '',
  '**T4 close** : clôture documentaire définitive autorisée ; 35 sens, 28 conformes, 7 écarts ; V1-15 à V1-21 retenues, non appliquées ; V1-22 et V1-23 réservés ; décisions non rouvertes.',
  '',
  '**Périmètre opérationnel de T5** (`docs/rapports/etape2-A2-05-volet1-lot3-T5-perimetre.md`) : livraisons D2 et D3, retenues pour T5 par l\'étude de méthode arbitrée le 2026-10-18 ; 22 sens, 18 ENTRY ; lignes 267 à 288 du découpage, contiguës ; deixis de personne et d\'espace du lot 11, hors interrogatifs (série こ・そ・あ telle que les données la portent ; あなた, 私) ; les 22 sens portent `deictique` et sont toute la deixis de personne et d\'espace restante (les deux autres sens `deictique` restants, 近々 et 後 sens 1, sont temporels, en D4). Généré par `a2-05-travail/perimetre-T5.mjs` avec le générateur v2, non modifié ; recalcul indépendant `a2-05-travail/recalcul-T5-perimetre.mjs` conforme (12 contrôles ; inventaire des 125 restants par livraison et par tranche : T5 22, T6 22, T7 24, T8 16, T9 24, F 17). Exclusions confirmées : série ど (bloc F, suspendu au préalable E5) ; 皆, 自分, 誰か et 皆さん (volet 2) ; deixis temporelle (A2 à A4 arbitrées ; D4 ; E1) ; mots absents des données N5. `C2-0` et `C4-0` : populations à examiner, non des écarts présumés.',
  '',
  '**Acceptation inscrite** : §0 inscrit par le générateur v2 (constante `ARBITRAGE` de `a2-05-travail/perimetre-T5.mjs`) ; seuls le statut et le §0 changent, la proposition est conservée. **Frontières de l\'audit retenues** : `category: null` selon A5 et `semantic_type: null` selon A6, sens par sens ; décisions validées du lot 11 respectées, notamment les 20 décisions `type-nul` ; `deictique` selon A7 ; `politesse` selon A9 seulement si la fiche la justifie et qu\'elle joue un rôle dans le sens ; aucun sens, graphie, lecture ni emploi inventé ; ni décision antérieure rouverte, ni bloc F examiné ; chaque fiche lue intégralement, exemples et anciens exemples compris.',
  '',
  '**Protection** : le périmètre accepté n\'est pas ajouté au manifeste (35 empreintes) ; relais 29 sur 30, C9a attendu (périmètre accepté hors du manifeste). L\'ajout, simulé dans un clone jetable par l\'outil réel (36 entrées, les 35 précédentes inchangées), mettrait le contrôle du bilan du pilote en écart, celui-ci exigeant 35 empreintes : son adaptation doit précéder ou accompagner l\'ajout, sur autorisation distincte ; la synchronisation du bloc d\'état suivrait.',
  '',
  '**Références** : l\'export de relecture ne contient pas `A2-GLOBAL-v1` (décision D5 du 2026-10-20) ; il est joint en entier aux notes d\'export qui en dépendent. A5, A6, A7, A9, A2-L3, A2-ST, A2-LING, A2-DIM et A2-REL figurent dans l\'export.',
  '',
  'Audit des 22 sens non autorisé ; T6 non préparée ; registre des tranches non modifié. Décomptes : 252/377 ; bloc B 148/148 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-24 libre ; 35 empreintes. Aucun `git add`, commit ni push.',
];
const bilan = (t) => { if (!/^### 8\.92 /m.test(t) || /^### 8\.93 /m.test(t)) arret(BIL + ' : §8.92 absent ou §8.93 déjà présent'); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S893.join(eol) + eol; };
const prop = { [ETAT]: journal(rubriques(lire(ETAT), ETAT)), [ROAD]: rubriques(lire(ROAD), ROAD), [BIL]: bilan(lire(BIL)) };
const pa = (t) => (t.match(/^- \*\*Prochaine action\.\*\*[^\r\n]*/m) ?? [''])[0];
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]) === N_PA, '« Prochaine action » identique dans les deux documents proposés');
ok(!S893.some((l) => /^\| /.test(l)), '§8.93 : aucune ligne de tableau (comptage des corrections et des réservations inchangé)');

// (3) Clone jetable
const tmp = mkdtempSync(join(tmpdir(), 'ocha-consolidation-t5-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim().slice(0, 200));
// Périmètre accepté : régénération par le générateur v2, configuration proposée
writeFileSync(join(C, CFG), cfgProp);
const g = lancer(CFG); const perProp = readFileSync(join(C, PER), 'utf8');
const L0 = lire(PER).split('\n'), L1 = perProp.split('\n'); const i0 = L1.indexOf('## 0. Arbitrage'), i1 = L1.indexOf('## 1. Où se place T5');
const sans0 = [...L1.slice(0, i0), ...L1.slice(i1)]; const st = L0.findIndex((l) => l.startsWith('**Statut** : '));
const memes = sans0.length === L0.length && sans0.every((l, k) => k === st ? /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-25 \(§0\)\.\*\*/.test(l) : l === L0[k]);
ok(g.code === 0 && i0 > 0 && i1 > i0 && memes, 'périmètre régénéré avec ARBITRAGE : seuls changent la ligne de statut et le §0 inséré', 'génération code ' + g.code + ' ; §0 : ' + (i1 - i0) + ' lignes ; ' + shaT(perProp).slice(0, 12) + '…');
for (const p of [ETAT, ROAD, BIL]) writeFileSync(join(C, p), prop[p]);
// Étape A : consolidation seule
const etape = (nom) => {
  const r = { rel: lancer('a2-05-travail/controle-relais-allege.mjs', '--apres-application'), cov: lancer('a2-05-travail/couverture-lot3.mjs'), emp: lancer('a2-05-travail/empreintes-lot3.mjs'), cbp: lancer('a2-05-travail/controle-bilan-pilote.mjs'), ap: lancer('a2-05-travail/sync-stable.mjs', '--apercu'), rec: lancer('a2-05-travail/recalcul-T5-perimetre.mjs') };
  r.hunks = (readFileSync(join(C, 'a2-05-travail/sync-stable-apercu.md'), 'utf8').match(/^@@/gm) ?? []).length; r.apercu = readFileSync(join(C, 'a2-05-travail/sync-stable-apercu.md'), 'utf8');
  for (const [k, v] of Object.entries(r)) if (v?.out !== undefined) console.log('   ' + nom + ' ' + k + ' (code ' + v.code + ') : ' + v.out.split('\n').pop().slice(0, 160) + (ecartsDe(v).length ? ' | ' + ecartsDe(v).join(' | ') : ''));
  return r;
};
const A = etape('A');
ok(A.rel.code === 1 && /29 conformes sur 30/.test(A.rel.out) && ecartsDe(A.rel).length === 1 && /C9a/.test(ecartsDe(A.rel)[0]), 'étape A : relais 29 sur 30, seul écart C9a (périmètre accepté hors du manifeste)');
ok(A.cov.code === 0 && /252 arbitrés, 0 proposés, 125 restants/.test(A.cov.out) && A.emp.code === 0 && A.emp.out.endsWith('hors du manifeste : ' + PER), 'étape A : couverture inchangée ; manifeste à 35, périmètre accepté signalé hors du manifeste', A.emp.out);
ok(A.cbp.code === 0 && A.hunks === 0 && A.rec.code === 0, 'étape A : contrôle du bilan du pilote conforme ; aperçu vide ; recalcul de T5 conforme');
// Étape B : ajout simulé du périmètre au manifeste (outil réel, dans le clone)
const aj = lancer('a2-05-travail/empreintes-lot3.mjs', '--ajouter'); const manB = readFileSync(join(C, MAN), 'utf8'); const mB = JSON.parse(manB);
const cles = Object.keys(mB.empreintes);
ok(aj.code === 0 && cles.length === 36 && cles[35] === PER && Object.entries(man0).every(([p, h]) => mB.empreintes[p] === h), 'étape B : ajout simulé, seul le périmètre de T5 (36 entrées, les 35 précédentes inchangées)', aj.out);
const B = etape('B');
constat('étape B, relais', B.rel.out.split('\n').pop() + (ecartsDe(B.rel).length ? ' ; ' + ecartsDe(B.rel).join(' ; ') : ''));
constat('étape B, contrôle du bilan du pilote', 'code ' + B.cbp.code + ' ; ' + (ecartsDe(B.cbp).join(' ; ') || 'aucun écart'));
constat('étape B, recalcul de T5 (état d\'avant la protection)', 'code ' + B.rec.code + ' ; ' + (ecartsDe(B.rec).join(' ; ') || 'aucun écart'));
constat('étape B, aperçu de synchronisation', B.hunks + ' hunk(s) ; ' + B.ap.out);
rmSync(tmp, { recursive: true, force: true });

// (4) Écriture des propositions et des différences
mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
const sorties = [[CFG, 'perimetre-T5.mjs', cfgProp], [PER, 'etape2-A2-05-volet1-lot3-T5-perimetre.md', perProp], [ETAT, 'ETAT-ACTUEL.md', prop[ETAT]], [ROAD, 'ROADMAP.md', prop[ROAD]], [BIL, 'etape2-A2-05-bilan-volet2.md', prop[BIL]], [MAN, 'empreintes-rapports-arbitres-simule.json', manB]];
for (const [p, nom, t] of sorties) {
  writeFileSync(join(root, OUT, nom), t);
  const d = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + '/' + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  writeFileSync(join(root, OUT, 'diffs', nom + '.diff'), d.stdout);
  const n = (c) => d.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length;
  ok(d.status === 1 && t.includes('\r\n') === lire(p).includes('\r\n'), 'proposé : ' + p, '+' + n('+') + ' / -' + n('-') + ' lignes ; ' + shaT(t).slice(0, 12) + '…');
}
writeFileSync(join(root, OUT, 'apercu-etape-B.md'), B.apercu);

// (5) Dépôt réel inchangé
const ch = TEMOINS.filter((p) => sha(join(root, p)) !== avant[p]);
ok(ch.length === 0, 'dépôt réel inchangé (' + TEMOINS.length + ' fichiers témoins)', ch.join(', ') || 'aucune modification');
console.log(ko ? ko + ' écart(s)' : 'préparation conforme');
process.exit(ko ? 1 : 0);
