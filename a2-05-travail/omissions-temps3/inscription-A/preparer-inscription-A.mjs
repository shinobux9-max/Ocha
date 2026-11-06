// A2-05 · recherche d'omissions d'`interrogatif` : préparation de l'inscription documentaire de l'arbitrage du groupe A, EN PROPOSITION. Rien n'est appliqué.
// (1) Préconditions sur le dépôt réel. (2) Versions proposées, en mémoire : ETAT-ACTUEL.md et ROADMAP.md (remplacements ciblés à ancre unique), bilan (§8.122 ajouté
// à la fin) ; trois documents neufs dans docs/rapports/ : mesure prise en acte, périmètre de A accepté, rapport de A arbitré (statut et §0 ajoutés ; texte livré
// conservé). (3) Clone jetable : état final simulé ; relais (C9b seul), contrôles, tests ; sabotages. (4) Écriture dans proposition/ seulement si aucun écart.
// Usage : node a2-05-travail/omissions-temps3/inscription-A/preparer-inscription-A.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', O = W + 'omissions-temps3/', I = O + 'inscription-A/', PROP = I + 'proposition/';
const { cloner, controler } = await import(pathToFileURL(join(root, W + 'arbitrage-F/essai-clone.mjs')));
const { diffBrut } = await import(pathToFileURL(join(root, W + 'arbitrage-F/moteur-application.mjs')));
const { ajouterLigneJournal } = await import(pathToFileURL(join(root, W + 'sync-stable.mjs')));
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const MES = W + 'arbitrage-F/mesure-couverture/mesure/';
const CIBLES = ['ETAT-ACTUEL.md', 'ROADMAP.md', BIL];
const RN = 'docs/rapports/etape2-A2-05-omissions-interrogatif-', NM = RN + 'mesure.md', NP = RN + 'A-perimetre.md', NR = RN + 'A.md', NOUVEAUX = [NM, NP, NR];
const DEPART = { 'ETAT-ACTUEL.md': '617eb8462dc262630e8d82f41d72086c5e192f61cbd120c0077143329c5f7c73', 'ROADMAP.md': 'b29ff1706a5ab4d2b891492b298c6be16db6c8f7b3caeb4e75b9807a3cce1176', [BIL]: 'c21e441db87c7634edf7862d49e302462d835864ef7aab552271068a58b34e1e' };
const SOURCES = { [MES + 'rapport-mesure.md']: '858a7f3710a2e42005f8e4316115e2966dc3cd46dd014c75c4eba39f64289694', [MES + 'mesure.json']: '7637157edd8a28b7330a77313d525517ee4c28022b3d302964fb2cf9aa0e1d44',
  [O + 'proposition-decoupage-perimetre-A.md']: '0dcfc218c9918da950fe72d530f550a758bfbe2d64209a2ed5d00f540879d3de', [O + 'rapport-relecture-A.md']: '479f606d84a4c067c21ef1de732221b2221da87806f5a2bb87f4e133e1afbc07',
  [O + 'analyse-A.json']: 'c9c68bfde7f230d6c4aaab015501155dd3d2f59251b4c2579f20d0a3fc184d67', [O + 'decoupage.json']: '56da6952d14259325eefee43cbfe0f2bb7cc6a5060a85e72f2df6c1ad97acc46', [O + 'perimetre-A.json']: '292318e668a54131b3808a6ec47f3ca14ccdad4c3f9211a669e60ec5cb20f409' };
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (r, p) => sha(readFileSync(join(r, p)));
const lire = (p) => readFileSync(join(root, p), 'utf8');
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const trace = []; let ko = 0;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; return b; };
const arret = () => { if (ko) { dire('ARRÊT : ' + ko + ' écart(s), rien n\'est écrit'); process.exit(1); } };
const LFs = (t) => t.replace(/\r\n/g, '\n'); const eolDe = (t) => (t.includes('\r\n') ? '\r\n' : '\n'); const avecEol = (t, e) => (e === '\r\n' ? t.replace(/\n/g, '\r\n') : t);
const remplacer = (nom, t, a, b) => { const n = t.split(a).length - 1; ok(n === 1 && !t.includes(b), 'ancre unique, remplacement absent : ' + nom, n + ' occurrence(s)'); return t.replace(a, () => b); };

// --- 1. Préconditions
dire('--- Préconditions sur le dépôt réel');
ok(git('rev-parse', 'HEAD').stdout.trim() === CLOTURE, 'HEAD à 39cce13');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'index vide');
ok(!existsSync(join(root, PROP)), 'dossier de proposition absent');
for (const p of CIBLES) ok(shaF(root, p) === DEPART[p], 'empreinte de départ : ' + p, shaF(root, p).slice(0, 16));
for (const [p, h] of Object.entries(SOURCES)) ok(shaF(root, p) === h, 'source relue et arbitrée, inchangée : ' + p, h.slice(0, 16));
for (const p of NOUVEAUX) ok(!existsSync(join(root, p)), 'document neuf absent : ' + p);
ok(!lire(BIL).includes('### 8.122 '), 'bilan sans §8.122');
arret();

// --- 2. Versions proposées, en mémoire
dire('--- Versions proposées, en mémoire');
const V = {}; const eol = Object.fromEntries(CIBLES.map((p) => [p, eolDe(lire(p))]));
const AVANT_1 = (t) => t.search(/^## 1\. /m);
const insererZero = (nom, t, statutAvant, statutApres, zero) => { let u = remplacer(nom + ', statut', t, statutAvant, statutApres); const i = AVANT_1(u); ok(i > 0 && !/^## 0\. /m.test(u), nom + ' : §0 inséré avant le §1'); return u.slice(0, i) + zero.join('\n') + '\n\n' + u.slice(i); };
// 2.1 Mesure prise en acte
V[NM] = insererZero('mesure', LFs(lire(MES + 'rapport-mesure.md')),
  "**Statut** : **mesure de couverture, proposition, non arbitrée.** Aucune relecture (temps 3), aucune conclusion lexicale, aucune modification de donnée, de lot, de journal ou de norme.",
  "**Statut** : **mesure de couverture prise en acte le 2026-11-04 (§0).** Aucune relecture (temps 3), aucune conclusion lexicale, aucune modification de donnée, de lot, de journal ou de norme.",
  ['## 0. Prise en acte', '',
    'Décision du 2026-11-04 (ChatGPT, par délégation ; relayée par l\'utilisateur) : « Je prends acte de la première mesure réelle de couverture : 807 sens, 234 candidats relevés, 573 non relevés, aucun sens relu et aucun candidat supplémentaire par X1. J\'accepte ces résultats comme mesure de couverture, sans en tirer de conclusion lexicale. »', '',
    '**Origine.** Recopié de `' + MES + 'rapport-mesure.md` (SHA-256 `' + SOURCES[MES + 'rapport-mesure.md'] + '`), écrit par `a2-05-travail/arbitrage-F/mesure-couverture/mesurer-couverture.mjs`, exécuté une fois sur autorisation ; seuls le statut et le présent §0 changent, le reste est conservé tel qu\'il a été produit. La mesure complète, avec tous les candidats et leurs filtres, est dans `' + MES + 'mesure.json` (SHA-256 `' + SOURCES[MES + 'mesure.json'] + '`). La date (2026-11-03) est la date UTC de l\'exécution, faite le 2026-11-04 à 00 h 02, heure locale.']);
// 2.2 Périmètre de A accepté
V[NP] = insererZero('périmètre A', LFs(lire(O + 'proposition-decoupage-perimetre-A.md')),
  "**Statut** : **proposition, non arbitrée.** Aucun sens n'est relu, aucun verdict lexical n'est pris, aucune donnée n'est modifiée.",
  "**Statut** : **périmètre accepté le 2026-11-04 (§0).** La proposition est conservée telle qu'elle a été livrée ; aucune donnée n'est modifiée.",
  ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-04 (ChatGPT, par délégation ; relayé par l\'utilisateur) : « QA-1 : OUI — découpage des 234 candidats en cinq groupes A à E, avec la règle de priorité par ENTRY. » « QA-2 : OUI — les quatre sens rattachés à leur ENTRY seront examinés dans A, avec leurs propres filtres. » « QA-3 : OUI — les 24 sens communs au lot 3 seront examinés uniquement sur la fonction interrogative. Les décisions historiques ne seront pas rouvertes. 聞く et 質問 recevront chacun une conclusion individuelle motivée. » « QA-4 : OUI — grille R1 à R5, trois conclusions selon A10 et un seul rapport pour A. » « QA-5 : OUI — périmètre A accepté : 39 sens dans 31 ENTRY. » « J\'autorise distinctement l\'ouverture de la relecture lexicale du groupe A, strictement dans ce périmètre. »', '',
    '**Effets.** Le découpage en cinq groupes (A 39 sens, B 18, C 3, D 53, E 121 ; 195 ENTRY) est accepté ; chaque groupe autre que A attend son propre périmètre. Les annexes citées sont dans le dossier de travail `' + O + '` : `dossier-A.md` (annexe A), `decoupage.json` (SHA-256 `' + SOURCES[O + 'decoupage.json'] + '`, annexe C), `perimetre-A.json`. Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée.']);
// 2.3 Rapport de A arbitré
V[NR] = insererZero('rapport A', LFs(lire(O + 'rapport-relecture-A.md')),
  "**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est appliquée.",
  "**Statut** : **arbitré le 2026-11-04 (§0).** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est retenue.",
  ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-04 (ChatGPT, par délégation, après avis favorable ; relayé par l\'utilisateur) : « Les 39 sens sont confirmés « ne relève pas de la fonction interrogatif ». » « Aucune omission n\'est retenue. » « Aucun sens ne reste à arbitrer dans le groupe A. » « Les décisions historiques, les verdicts du lot 3 et les 204 corrections retenues restent inchangés. » « Les trois observations hors périmètre sont conservées sans correction à ce stade. »', '',
    '**Effets.** 39 sens arbitrés « ne relève pas de la fonction » ; aucune omission retenue, aucune décision nouvelle, aucune donnée modifiée. La recherche d\'omissions compte 39 sens relus sur 234 candidats ; 195 restent, dans les groupes B à E ; ce décompte reste séparé des 377 sens du lot 3 et du contrôle des 17 porteurs. Les observations hors périmètre (§4) sont conservées sans correction. Le recueil des 32 fiches sources est dans `' + O + 'fiches-A.md` ; l\'analyse, dans `' + O + 'analyse-A.json` (SHA-256 `' + SOURCES[O + 'analyse-A.json'] + '`). Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée.']);
// 2.4 Bilan : §8.122, à la fin
{
  const t = LFs(lire(BIL)); ok(t.endsWith('\n') && !t.endsWith('\n\n'), 'bilan : fin de fichier attendue');
  const P = ['### 8.122 Recherche d\'omissions d\'`interrogatif` (A10, §8) : mesure de couverture prise en acte, découpage accepté, groupe A arbitré (2026-11-04)', '',
    '**Mesure de couverture.** Préparée, relue, puis exécutée une fois sur autorisation (`a2-05-travail/arbitrage-F/mesure-couverture/mesurer-couverture.mjs --execution-autorisee`, code 0) : 807 sens publiés non porteurs, 669 ENTRY, huit filtres, X1 compris ; **234 candidats relevés** (35 par le temps 1, 199 par le seul temps 2, **aucun par le seul X1**), **573 non relevés, 0 relu**. Prise en acte le 2026-11-04, comme mesure de couverture, sans conclusion lexicale (`docs/rapports/etape2-A2-05-omissions-interrogatif-mesure.md`, §0).', '',
    '**Découpage.** Cinq groupes, chaque ENTRY entière dans le premier groupe (A, B, C, D, E) dont un de ses sens porte un filtre du groupe, filtres d\'origine conservés : A, indices textuels du temps 1 (39 sens, 31 ENTRY) ; B, décisions du journal (18, 15) ; C, série (3, 2) ; D, classe (53, 40) ; E, valeurs nulles (121, 107). Accepté le 2026-11-04 avec le périmètre du groupe A (`docs/rapports/etape2-A2-05-omissions-interrogatif-A-perimetre.md`, §0).', '',
    '**Groupe A arbitré le 2026-11-04** (`docs/rapports/etape2-A2-05-omissions-interrogatif-A.md`, §0) : 39 sens relus sur leur fiche entière, leurs anciens exemples, leur ENTRY publiée et leurs décisions, selon la grille R1 à R5 ; **39 « ne relève pas de la fonction », aucune omission retenue, aucun sens à arbitrer**. 聞く « Demander » et 質問 « Question » (A10, §4, point 4) et 誰か (A10, §4, point 1 ; D0724 confirmée) ont reçu chacun une conclusion motivée. Les décisions historiques, les verdicts du lot 3 (24 sens communs, examinés sur la seule fonction) et les 204 corrections retenues restent inchangés. Trois observations hors périmètre (anciens exemples de 兄弟 et de 吸う ; exemple de そこ, déjà noté en T5) sont conservées sans correction.', '',
    '**Décomptes séparés.** Recherche d\'omissions : 39 relus sur 234 candidats ; 195 restent (groupes B à E) ; 573 non relevés, non relus. Ces décomptes ne s\'additionnent ni aux 377 sens du lot 3 ni au contrôle des 17 porteurs.', '',
    '**Non modifiés.** Données lexicales, normes, lots, journal, registre des tranches, relais, `sync-stable.mjs`, manifeste d\'empreintes (47 entrées) ; aucune correction appliquée. Les trois documents neufs de `docs/rapports/` ne sont pas protégés au manifeste d\'empreintes, dont l\'outillage ne couvre que le lot 3. Aucun `git add`, commit ni push.', ''];
  V[BIL] = t + '\n' + P.join('\n');
}
// 2.5 Pilotage : mêmes remplacements dans ETAT-ACTUEL.md et ROADMAP.md
const Q = [
  ['**La recherche\n  d\'omissions d\'A10 (§8) sur les 807 sens non porteurs reste fermée** jusqu\'à autorisation distincte ;\n  elle est comptabilisée à part, hors des 377.',
    '**La recherche\n  d\'omissions d\'A10 (§8) est ouverte** : mesure de couverture prise en acte (807 sens, 234 candidats,\n  573 non relevés, aucun par le seul X1) ; découpage en cinq groupes accepté ; **groupe A arbitré le\n  2026-11-04** (39 sens, aucune omission retenue) ; 195 candidats restent, dans les groupes B à E ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122).'],
  ['Sur autorisation distincte, une exécution de mesure de couverture des huit filtres d\'A10 (`docs/conception/addendum-A10-interrogatif.md`, §8), X1 compris, sur les 807 sens non porteurs, sans relecture ni verdict ; puis la recherche d\'omissions, distincte des 377.',
    'La décision sur le périmètre du groupe B de la recherche d\'omissions d\'A10 (18 sens, 15 ENTRY ; groupe A arbitré, `docs/rapports/etape2-A2-05-omissions-interrogatif-A.md`, §0), puis, sur autorisation distincte, sa relecture ; puis les groupes C à E, chacun sur autorisation distincte ; la recherche reste distincte des 377.'],
];
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) {
  let t = LFs(lire(p));
  for (const [k, [a, b]] of Q.entries()) t = remplacer(p + ', Q' + (k + 1), t, a, b);
  if (p === 'ROADMAP.md') {
    t = remplacer(p + ', date', t, '**Dernière mise à jour :** 2026-11-03 (', '**Dernière mise à jour :** 2026-11-04 (');
    t = remplacer(p + ', en-tête', t, 'son rapport et son périmètre opérationnel protégés au manifeste ;', 'son rapport et son périmètre opérationnel protégés au manifeste ; recherche d\'omissions d\'`interrogatif` ouverte, groupe A arbitré le 2026-11-04 ;');
  } else {
    const L = '| 2026-11-04 | 2 · A2-05 | **Recherche d\'omissions d\'A10 ouverte** : mesure de couverture exécutée une fois sur autorisation (807 sens, 669 ENTRY, huit filtres, X1 compris : 234 candidats, 573 non relevés, 0 relu, aucun par le seul X1), prise en acte ; découpage en cinq groupes A à E (règle de priorité par ENTRY) accepté ; **groupe A relu et arbitré** (39 sens, 31 ENTRY : 39 « ne relève pas de la fonction », aucune omission retenue, aucun à arbitrer) ; décisions historiques, verdicts du lot 3 et corrections retenues inchangés ; trois observations hors périmètre conservées ; trois documents neufs dans `docs/rapports/` ; §8.122. **377/377 ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 47 empreintes.** | non committé |';
    const t2 = LFs(ajouterLigneJournal(t, L)); ok(t2 !== t && t2.split(L).length === 2 && t2.trimEnd().endsWith(L), 'ETAT-ACTUEL.md : une ligne de journal ajoutée à la fin du journal'); t = t2;
  }
  V[p] = t;
}
for (const p of CIBLES) V[p] = avecEol(V[p], eol[p]);
arret();

// --- 3. Clone : état final simulé
dire('--- Clone jetable : état final simulé');
const cl = cloner(root); const TOUS = [...CIBLES, ...NOUVEAUX];
const relais = (...o) => { const r = cl.lancer(W + 'controle-relais-allege.mjs', '--apres-application', ...o); const L = r.out.split('\n'); return { code: r.code, fin: L.at(-1), L, ids: L.map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
try {
  for (const p of TOUS) cl.ecrire(p, V[p]);
  const ap = cl.lancer(W + 'sync-stable.mjs', '--apercu'); const vide = !readFileSync(cl.f(W + 'sync-stable-apercu.md'), 'utf8').split('\n').some((l) => /^[+-](?![+-])/.test(l));
  ok(ap.code === 0 && vide, 'aperçu de synchronisation vide : le bloc a2-05:etat ne change pas', ap.out.split('\n').pop().slice(0, 100));
  controler(cl, 'état final', ok, { tests: true, chemins: TOUS, attendus: ['C9b'] });
  const r = relais(); ok(r.L.some((l) => /^conforme\s+C8 /.test(l)) && r.L.some((l) => /^conforme\s+C5f /.test(l)) && r.L.some((l) => /^conforme\s+C9a /.test(l)), 'C5f (prochaine action identique), C8 (reprise simulée) et C9a conformes');
  const emp = cl.lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && emp.out === 'empreintes : 47 rapports contrôlés, identiques', 'empreintes : 47 identiques ; les documents neufs ne sont pas des rapports du lot 3', emp.out);
  const cpo = cl.lancer(W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs'); ok(cpo.code === 0 && cpo.out.trim().endsWith('29 conformes sur 29'), 'contrôle du périmètre opérationnel : 29 sur 29');
  const st = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves,empreintes:v.empreintes}))"], { cwd: cl.C, encoding: 'utf8' });
  ok(st.stdout.trim() === '{"arbitres":377,"restants":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"],"empreintes":47}', 'état calculé inchangé : 377/377 ; 204 corrections dans 177 ENTRY ; V1-32 ; réservés V1-22, V1-23 ; 47 empreintes', st.stdout.trim() || st.stderr.trim().slice(0, 200));
  for (const p of NOUVEAUX) { const t = readFileSync(cl.f(p), 'utf8'); ok(!t.includes('\r') && /^## 0\. /m.test(t) && t.split(/^## 0\. /m).length === 2, 'document neuf : LF, un seul §0 : ' + p); }
  dire('--- Sabotages (chacun rétabli aussitôt)');
  const sabote = (nom, p, fn, attendu) => { const o = readFileSync(cl.f(p)); const m = Buffer.from(fn(o.toString('utf8'))); if (m.equals(o)) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(cl.f(p), m); try { const x = relais(); ok(x.ids.split(',').includes(attendu), nom, 'écarts : ' + x.ids); } finally { writeFileSync(cl.f(p), o); } };
  sabote('S1 prochaine action différente dans ROADMAP.md : C5f', 'ROADMAP.md', (t) => t.replace('puis les groupes C à E, chacun', 'puis les groupes C et D, chacun'), 'C5f');
  sabote('S2 renvoi .md retiré de la prochaine action d\'ETAT-ACTUEL.md : C5f', 'ETAT-ACTUEL.md', (t) => t.replace('`docs/rapports/etape2-A2-05-omissions-interrogatif-A.md`, §0', 'rapport du groupe A, §0'), 'C5f');
  const tem = relais(); ok(tem.ids === 'C9b' && tem.fin === '29 conformes sur 30', 'témoin après sabotages : 29 sur 30, C9b seul', tem.fin);
  for (const p of TOUS) ok(shaF(cl.C, p) === sha(Buffer.from(V[p])), 'clone : version finale intacte : ' + p);
} finally { cl.nettoyer(); }
arret();

// --- 4. Écriture de la proposition
dire('--- Écriture de la proposition');
const M = {}; const table = ['| Fichier | Départ | Proposé | Lignes |', '|---|---|---|---|'];
for (const p of TOUS) { mkdirSync(dirname(join(root, PROP + p)), { recursive: true }); writeFileSync(join(root, PROP + p), V[p]); }
mkdirSync(join(root, PROP + 'diffs'), { recursive: true });
for (const p of CIBLES) {
  const d = diffBrut(root, p, PROP + p); ok(d.status === 1, 'diff produit : ' + p);
  writeFileSync(join(root, PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), d.stdout);
  const plus = d.stdout.split('\n').filter((l) => /^\+(?!\+\+)/.test(l)).length, moins = d.stdout.split('\n').filter((l) => /^-(?!--)/.test(l)).length;
  M[p] = { depart: shaF(root, p), propose: shaF(root, PROP + p), diff: sha(d.stdout) };
  table.push('| `' + p + '` | `' + M[p].depart.slice(0, 16) + '…` | `' + M[p].propose.slice(0, 16) + '…` | +' + plus + ' / −' + moins + ' |');
}
for (const p of NOUVEAUX) { M[p] = { depart: null, propose: shaF(root, PROP + p) }; table.push('| `' + p + '` (neuf) | — | `' + M[p].propose.slice(0, 16) + '…` | ' + V[p].split('\n').length + ' lignes |'); }
writeFileSync(join(root, PROP + 'manifeste.json'), JSON.stringify(M, null, 1) + '\n');
writeFileSync(join(root, PROP + 'table-diffs.md'), table.join('\n') + '\n');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'index réel toujours vide');
ok(CIBLES.every((p) => shaF(root, p) === DEPART[p]) && NOUVEAUX.every((p) => !existsSync(join(root, p))), 'dépôt réel : fichiers visés inchangés, documents neufs absents');
dire('manifeste de la proposition : ' + shaF(root, PROP + 'manifeste.json'));
writeFileSync(join(root, I + 'sortie-preparation.txt'), trace.join('\n') + '\n' + (ko ? 'préparation NON conforme' : 'préparation conforme') + '\n');
console.log(ko ? 'préparation NON conforme' : 'préparation conforme'); process.exit(ko ? 1 : 0);
