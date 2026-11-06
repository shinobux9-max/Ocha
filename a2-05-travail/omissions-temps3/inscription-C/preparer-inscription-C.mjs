// A2-05 · recherche d'omissions d'`interrogatif` : préparation de l'inscription documentaire de l'arbitrage du groupe C, EN PROPOSITION. Rien n'est appliqué.
// (1) Préconditions sur le dépôt réel (état d'arrivée de l'inscription B). (2) Versions proposées, en mémoire : ETAT-ACTUEL.md et ROADMAP.md (remplacements ciblés
// à ancre unique), bilan (§8.124 ajouté à la fin) ; deux documents neufs dans docs/rapports/ : périmètre de C accepté, rapport de C arbitré (statut et §0 ajoutés ;
// texte livré conservé). (3) Clone jetable : état final simulé ; relais (C9b seul), contrôles, tests ; sabotages. (4) Écriture dans proposition/ seulement si aucun écart.
// Usage : node a2-05-travail/omissions-temps3/inscription-C/preparer-inscription-C.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', O = W + 'omissions-temps3/', I = O + 'inscription-C/', PROP = I + 'proposition/';
const { cloner, controler } = await import(pathToFileURL(join(root, W + 'arbitrage-F/essai-clone.mjs')));
const { diffBrut } = await import(pathToFileURL(join(root, W + 'arbitrage-F/moteur-application.mjs')));
const { ajouterLigneJournal } = await import(pathToFileURL(join(root, W + 'sync-stable.mjs')));
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const CIBLES = ['ETAT-ACTUEL.md', 'ROADMAP.md', BIL];
const RN = 'docs/rapports/etape2-A2-05-omissions-interrogatif-', NP = RN + 'C-perimetre.md', NR = RN + 'C.md', NOUVEAUX = [NP, NR];
// Documents inscrits avec A et B : vérifiés inchangés (la variable garde son nom d'origine)
const INSCRITS_A = { [RN + 'mesure.md']: '03d5198e9df16ca92fac46c57fde70d9fc4bc9f841b95541fbe3560ed9d19ab1', [RN + 'A-perimetre.md']: 'dedd75d90a5cfe8cfc64f72ec00274f49262d1a8290211b51844a1ff208e9afd', [RN + 'A.md']: 'e5e168e3c4cacf8ee8b77b8978965ec3cda7ef5a81acebb3089653d6d50c2b6b',
  [RN + 'B-perimetre.md']: 'db3f97e46a474e2cde425702aa38aae93e6dea5ade910b3007c535ead4e05b93', [RN + 'B.md']: '8eb0180a7e078e392ef4da678f345d4e9efef6f37e21ec3deb1f3eda8223a2fc' };
// Départ : état d'arrivée de l'inscription B (proposition B, manifeste 68716251…, appliquée sur autorisation)
const DEPART = { 'ETAT-ACTUEL.md': 'c5e88720f788648b05463bd611a257fb1a2b998718cfdc67c9f8c7ac7b0cbd6b', 'ROADMAP.md': '66bd57ec154e9e4162c7fe555f361225fe6bd832356d410af114d666fe963c7e', [BIL]: '3c5d92e27f046f443c3b9ded29061b2a325322a8c917888f9cd14e89d96f1891' };
const SOURCES = { [O + 'proposition-perimetre-C.md']: '4e19434989fa53aa52671c581926d2dc1186ccc2dc105a03f90058dd5c7f2411', [O + 'perimetre-C.json']: '8eaa24be3aca9b953b9fa7eb64f33a96e66eeb36f712bc33b06f1d5a587c8561',
  [O + 'dossier-C.md']: '4093a1014b8e19aa9cffa74475e3129266769d3d8020ffdf84d9c1e79dc1937b', [O + 'rapport-relecture-C.md']: '659709f09a424be9115a294059fece1ff0ad0344e876a601054d7c43b58e54bc',
  [O + 'analyse-C.json']: 'c68939612eb47eaf30772d07ec3120ed77f0a48a3507b29700a608b291c6aa1d', [O + 'fiches-C.md']: '227da0d60ba71490937ce022c01e2571dcdfaa541177293341290c11d861f922', [O + 'decoupage.json']: '56da6952d14259325eefee43cbfe0f2bb7cc6a5060a85e72f2df6c1ad97acc46' };
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
for (const p of CIBLES) ok(shaF(root, p) === DEPART[p], 'empreinte de départ (arrivée de l\'inscription B) : ' + p, shaF(root, p).slice(0, 16));
for (const [p, h] of Object.entries(INSCRITS_A)) ok(existsSync(join(root, p)) && shaF(root, p) === h, 'document inscrit avec A ou B, inchangé : ' + p, h.slice(0, 16));
for (const [p, h] of Object.entries(SOURCES)) ok(shaF(root, p) === h, 'source relue et arbitrée, inchangée : ' + p, h.slice(0, 16));
for (const p of NOUVEAUX) ok(!existsSync(join(root, p)), 'document neuf absent : ' + p);
ok(lire(BIL).includes('### 8.123 ') && !lire(BIL).includes('### 8.124 '), 'bilan : §8.123 présent, sans §8.124');
arret();

// --- 2. Versions proposées, en mémoire
dire('--- Versions proposées, en mémoire');
const V = {}; const eol = Object.fromEntries(CIBLES.map((p) => [p, eolDe(lire(p))]));
const AVANT_1 = (t) => t.search(/^## 1\. /m);
const insererZero = (nom, t, statutAvant, statutApres, zero) => { let u = remplacer(nom + ', statut', t, statutAvant, statutApres); const i = AVANT_1(u); ok(i > 0 && !/^## 0\. /m.test(u), nom + ' : §0 inséré avant le §1'); return u.slice(0, i) + zero.join('\n') + '\n\n' + u.slice(i); };
// 2.1 Périmètre de C accepté
V[NP] = insererZero('périmètre C', LFs(lire(O + 'proposition-perimetre-C.md')),
  "**Statut** : **proposition, non arbitrée.** Aucun sens du groupe C n'est relu, aucun verdict lexical n'est pris, aucune donnée n'est modifiée.",
  "**Statut** : **périmètre accepté le 2026-11-04 (§0).** La proposition est conservée telle qu'elle a été livrée ; aucune donnée n'est modifiée.",
  ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-04 (ChatGPT, par délégation ; relayé par l\'utilisateur) : « QC-1 : OUI — périmètre accepté, 3 sens dans 2 ENTRY. » « QC-2 : OUI — grille R1 à R5, trois conclusions possibles, un rapport unique. » « QC-3 : OUI — les verdicts historiques D5 et D6 sont cités sans être rouverts. » L\'ouverture de la relecture (QC-4) a été réservée jusqu\'à la vérification de l\'application de l\'inscription du groupe B, puis autorisée distinctement : « QC-4 : OUI. J\'autorise l\'ouverture de la relecture lexicale du groupe C, strictement limitée aux trois sens dans deux ENTRY du périmètre accepté. »', '',
    '**Effets.** Le périmètre du groupe C (3 sens, 2 ENTRY, thème T2-serie) et sa méthode sont acceptés. Les annexes citées sont dans le dossier de travail `' + O + '` : `dossier-C.md` (SHA-256 `' + SOURCES[O + 'dossier-C.md'] + '`) et `perimetre-C.json` (SHA-256 `' + SOURCES[O + 'perimetre-C.json'] + '`). Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée.']);
// 2.2 Rapport de C arbitré
V[NR] = insererZero('rapport C', LFs(lire(O + 'rapport-relecture-C.md')),
  "**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est appliquée.",
  "**Statut** : **arbitré le 2026-11-04 (§0).** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est retenue.",
  ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-04 (ChatGPT, par délégation, après avis favorable ; relayé par l\'utilisateur) : « 1. `v_494_s1` — いつも : ne relève pas de la fonction `interrogatif`. » « 2. `v_499_s1` — どうも « Merci » : ne relève pas de la fonction. » « 3. `v_499_s2` — どうも « Vraiment » : ne relève pas de la fonction. » « Aucune omission n\'est retenue dans le groupe C. » « Je confirme également que le « vague sentiment de gêne ou d\'incertitude » de どうも n\'établit pas une demande d\'information selon A10. Cet emploi reste dans la nuance de l\'ENTRY, conformément à D1504. » « La remarque sur « De rien / Merci ! » est conservée hors périmètre, sans ajout de sens. » « Les sept décisions historiques, les fonctions déjà publiées et les verdicts du lot 3 restent inchangés. »', '',
    '**Effets.** 3 sens arbitrés « ne relève pas de la fonction » ; aucune omission retenue, aucune décision nouvelle, aucune donnée modifiée. L\'emploi d\'incertitude de どうも reste en nuance de l\'ENTRY (D1504) ; la remarque sur « De rien / Merci ! » (§5) est conservée hors périmètre, sans ajout de sens. Les fonctions publiées (`politesse`, `intensifieur`), les sept décisions (D1370, D1504 à D1509) et les verdicts du lot 3 (D5, D6) restent inchangés. La recherche d\'omissions compte 60 sens relus sur 234 candidats (A 39, B 18, C 3) ; 174 restent, dans les groupes D et E ; ce décompte reste séparé des 377 sens du lot 3 et du contrôle des 17 porteurs. Le recueil des deux fiches sources est dans `' + O + 'fiches-C.md` (SHA-256 `' + SOURCES[O + 'fiches-C.md'] + '`) ; l\'analyse, dans `' + O + 'analyse-C.json` (SHA-256 `' + SOURCES[O + 'analyse-C.json'] + '`). Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée.']);
// 2.3 Bilan : §8.124, à la fin
{
  const t = LFs(lire(BIL)); ok(t.endsWith('\n') && !t.endsWith('\n\n'), 'bilan : fin de fichier attendue');
  const P = ['### 8.124 Recherche d\'omissions d\'`interrogatif` (A10, §8) : groupe C arbitré (2026-11-04)', '',
    '**Périmètre.** 3 sens dans 2 ENTRY, thème T2-serie (une graphie de l\'ENTRY contient la graphie d\'un porteur : いつも ⊃ いつ, どうも ⊃ どう) ; accepté le 2026-11-04 avec sa méthode, les verdicts du lot 3 (D5, D6) cités sans être rouverts (`docs/rapports/etape2-A2-05-omissions-interrogatif-C-perimetre.md`, §0).', '',
    '**Groupe C arbitré le 2026-11-04** (`docs/rapports/etape2-A2-05-omissions-interrogatif-C.md`, §0) : いつも « Toujours », どうも « Merci » et どうも « Vraiment », relus sur leur fiche entière, leurs anciens exemples, leur ENTRY publiée et les sept décisions, selon la grille R1 à R5 ; **3 « ne relève pas de la fonction », aucune omission retenue, aucun sens à arbitrer**. La série ne décide pas (A10, §3, point 2) ; la frontière des indéfinis, examinée pour いつも, ne change pas la conclusion. **Le « vague sentiment de gêne ou d\'incertitude » de どうも n\'établit pas une demande d\'information** ; il reste en nuance de l\'ENTRY (D1504). La remarque sur « De rien / Merci ! » est conservée hors périmètre, sans ajout de sens. Les sept décisions historiques, les fonctions publiées (`politesse`, `intensifieur`) et les verdicts du lot 3 restent inchangés.', '',
    '**Décomptes séparés.** Recherche d\'omissions : 60 relus sur 234 candidats (A 39, B 18, C 3) ; 174 restent (groupes D et E) ; 573 non relevés, non relus. Ces décomptes ne s\'additionnent ni aux 377 sens du lot 3 ni au contrôle des 17 porteurs.', '',
    '**Non modifiés.** Données lexicales, normes, lots, journal, registre des tranches, relais, `sync-stable.mjs`, manifeste d\'empreintes (47 entrées) ; aucune correction appliquée. Les deux documents neufs de `docs/rapports/` ne sont pas protégés au manifeste d\'empreintes, comme les cinq inscrits avec les groupes A et B (limite documentaire suivie séparément). Aucun `git add`, commit ni push.', ''];
  V[BIL] = t + '\n' + P.join('\n');
}
// 2.4 Pilotage : mêmes remplacements dans ETAT-ACTUEL.md et ROADMAP.md
const Q = [
  ['**groupes A et B arbitrés le\n  2026-11-04** (57 sens : A 39, B 18 ; aucune omission retenue) ; 177 candidats restent, dans les groupes C à E ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122 et §8.123).',
    '**groupes A, B et C arbitrés le\n  2026-11-04** (60 sens : A 39, B 18, C 3 ; aucune omission retenue) ; 174 candidats restent, dans les groupes D et E ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122 à §8.124).'],
  ['La décision sur le périmètre du groupe C de la recherche d\'omissions d\'A10 (3 sens, 2 ENTRY ; groupe B arbitré, `docs/rapports/etape2-A2-05-omissions-interrogatif-B.md`, §0), puis, sur autorisation distincte, sa relecture ; puis les groupes D et E, chacun sur autorisation distincte ; la recherche reste distincte des 377.',
    'La décision sur le périmètre du groupe D de la recherche d\'omissions d\'A10 (53 sens, 40 ENTRY ; groupe C arbitré, `docs/rapports/etape2-A2-05-omissions-interrogatif-C.md`, §0), puis, sur autorisation distincte, sa relecture ; puis le groupe E, sur autorisation distincte ; la recherche reste distincte des 377.'],
];
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) {
  let t = LFs(lire(p));
  for (const [k, [a, b]] of Q.entries()) t = remplacer(p + ', Q' + (k + 1), t, a, b);
  if (p === 'ROADMAP.md') {
    ok(t.includes('**Dernière mise à jour :** 2026-11-04 ('), 'ROADMAP.md : date déjà au 2026-11-04, inchangée');
    t = remplacer(p + ', en-tête', t, 'recherche d\'omissions d\'`interrogatif` ouverte, groupes A et B arbitrés le 2026-11-04 ;', 'recherche d\'omissions d\'`interrogatif` ouverte, groupes A, B et C arbitrés le 2026-11-04 ;');
  } else {
    const L = '| 2026-11-04 | 2 · A2-05 | **Recherche d\'omissions d\'A10 : groupe C relu et arbitré** (3 sens, 2 ENTRY, thème T2-serie : いつも, どうも « Merci », どうも « Vraiment » ; 3 « ne relève pas de la fonction », aucune omission retenue, aucun à arbitrer) ; périmètre et méthode acceptés ; l\'emploi d\'incertitude de どうも n\'établit pas une demande d\'information et reste en nuance (D1504) ; remarque « De rien / Merci ! » conservée hors périmètre ; décisions historiques, fonctions publiées, verdicts du lot 3 et corrections retenues inchangés ; 60 relus sur 234, 174 restent (D et E) ; deux documents neufs dans `docs/rapports/` ; §8.124. **377/377 ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 47 empreintes.** | non committé |';
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
  for (const [p, h] of Object.entries(INSCRITS_A)) ok(shaF(cl.C, p) === h, 'clone : document inscrit avec A ou B, inchangé : ' + p);
  dire('--- Sabotages (chacun rétabli aussitôt)');
  const sabote = (nom, p, fn, attendu) => { const o = readFileSync(cl.f(p)); const m = Buffer.from(fn(o.toString('utf8'))); if (m.equals(o)) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(cl.f(p), m); try { const x = relais(); ok(x.ids.split(',').includes(attendu), nom, 'écarts : ' + x.ids); } finally { writeFileSync(cl.f(p), o); } };
  sabote('S1 prochaine action différente dans ROADMAP.md : C5f', 'ROADMAP.md', (t) => t.replace('puis le groupe E, sur autorisation distincte', 'puis les groupes E et F, sur autorisation distincte'), 'C5f');
  sabote('S2 renvoi .md retiré de la prochaine action d\'ETAT-ACTUEL.md : C5f', 'ETAT-ACTUEL.md', (t) => t.replace('`docs/rapports/etape2-A2-05-omissions-interrogatif-C.md`, §0', 'rapport du groupe C, §0'), 'C5f');
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
