// A2-05 · recherche d'omissions d'`interrogatif` : préparation de l'inscription documentaire de l'arbitrage du groupe D, EN PROPOSITION. Rien n'est appliqué.
// (1) Préconditions sur le dépôt réel (état d'arrivée de l'inscription C). (2) Versions proposées, en mémoire : ETAT-ACTUEL.md et ROADMAP.md (remplacements ciblés
// à ancre unique), bilan (§8.125 ajouté à la fin) ; deux documents neufs dans docs/rapports/ : périmètre de D accepté, rapport de D arbitré (statut et §0 ajoutés ;
// texte livré conservé). (3) Clone jetable : état final simulé ; relais (C9b seul), contrôles, tests ; sabotages. (4) Écriture dans proposition/ seulement si aucun écart.
// Transposé de preparer-inscription-C.mjs : chemins, empreintes de départ (arrivée de l'inscription C), sources de D, textes, sabotages, date du 2026-11-05.
// Usage : node a2-05-travail/omissions-temps3/inscription-D/preparer-inscription-D.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', O = W + 'omissions-temps3/', I = O + 'inscription-D/', PROP = I + 'proposition/';
const { cloner, controler } = await import(pathToFileURL(join(root, W + 'arbitrage-F/essai-clone.mjs')));
const { diffBrut } = await import(pathToFileURL(join(root, W + 'arbitrage-F/moteur-application.mjs')));
const { ajouterLigneJournal } = await import(pathToFileURL(join(root, W + 'sync-stable.mjs')));
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const CIBLES = ['ETAT-ACTUEL.md', 'ROADMAP.md', BIL];
const RN = 'docs/rapports/etape2-A2-05-omissions-interrogatif-', NP = RN + 'D-perimetre.md', NR = RN + 'D.md', NOUVEAUX = [NP, NR];
// Documents inscrits avec A, B et C : vérifiés inchangés
const INSCRITS = { [RN + 'mesure.md']: '03d5198e9df16ca92fac46c57fde70d9fc4bc9f841b95541fbe3560ed9d19ab1', [RN + 'A-perimetre.md']: 'dedd75d90a5cfe8cfc64f72ec00274f49262d1a8290211b51844a1ff208e9afd', [RN + 'A.md']: 'e5e168e3c4cacf8ee8b77b8978965ec3cda7ef5a81acebb3089653d6d50c2b6b',
  [RN + 'B-perimetre.md']: 'db3f97e46a474e2cde425702aa38aae93e6dea5ade910b3007c535ead4e05b93', [RN + 'B.md']: '8eb0180a7e078e392ef4da678f345d4e9efef6f37e21ec3deb1f3eda8223a2fc',
  [RN + 'C-perimetre.md']: '3f472e572c0cbf0ff4c252fc89293e34379129412ce2af96e140de05a474b5e8', [RN + 'C.md']: '726c4a3e711a065328f42a5659123c1ce0bf4bf94d01b17da14b8be651ad5e23' };
// Départ : état d'arrivée de l'inscription C (proposition C, manifeste 6f87e80a…, appliquée sur autorisation)
const DEPART = { 'ETAT-ACTUEL.md': 'd7e749358e9c8ccb40033ea1f215cd2b3a106fe03bda5abaf6072ea75fa262e3', 'ROADMAP.md': 'eff65b400a4bd7672eeb00f10085c3b6cd55f99581fe411fa06d811de9097f60', [BIL]: 'ca49aa55c2f312ab87ea06f1dacb6569f546ae483315721f26f207921e37911a' };
const SOURCES = { [O + 'proposition-perimetre-D.md']: 'c0c8e9bbffda9d0d01df7a2730218f375c6115cf76bb574b7b5aecc23ecbab16', [O + 'perimetre-D.json']: '7aa1d5915bdb8646048c34d99e1fe3932b9c7121cfdf933d3110f7659865d159',
  [O + 'dossier-D.md']: '37e9fd27c05971575bf56add0c352e5508078d5329297a6136d1ac3b7be76ea8', [O + 'rapport-relecture-D.md']: '7d8af0041278a187ecf763f4e7f82f9c65b262ca6c3f577830bd5d832e597434',
  [O + 'analyse-D.json']: 'c0810c0f677e9364e9c2f30aa037a2013e6d2bcd5a2c773c47ae7a9edea0cb97', [O + 'fiches-D.md']: '6321df20fdca0e764e59d6b50a7c2368be922457afce2deb4ce75f66de9aa379', [O + 'decoupage.json']: '56da6952d14259325eefee43cbfe0f2bb7cc6a5060a85e72f2df6c1ad97acc46' };
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
for (const p of CIBLES) ok(shaF(root, p) === DEPART[p], 'empreinte de départ (arrivée de l\'inscription C) : ' + p, shaF(root, p).slice(0, 16));
for (const [p, h] of Object.entries(INSCRITS)) ok(existsSync(join(root, p)) && shaF(root, p) === h, 'document inscrit avec A, B ou C, inchangé : ' + p, h.slice(0, 16));
for (const [p, h] of Object.entries(SOURCES)) ok(shaF(root, p) === h, 'source relue et arbitrée, inchangée : ' + p, h.slice(0, 16));
for (const p of NOUVEAUX) ok(!existsSync(join(root, p)), 'document neuf absent : ' + p);
ok(lire(BIL).includes('### 8.124 ') && !lire(BIL).includes('### 8.125 '), 'bilan : §8.124 présent, sans §8.125');
arret();

// --- 2. Versions proposées, en mémoire
dire('--- Versions proposées, en mémoire');
const V = {}; const eol = Object.fromEntries(CIBLES.map((p) => [p, eolDe(lire(p))]));
const AVANT_1 = (t) => t.search(/^## 1\. /m);
const insererZero = (nom, t, statutAvant, statutApres, zero) => { let u = remplacer(nom + ', statut', t, statutAvant, statutApres); const i = AVANT_1(u); ok(i > 0 && !/^## 0\. /m.test(u), nom + ' : §0 inséré avant le §1'); return u.slice(0, i) + zero.join('\n') + '\n\n' + u.slice(i); };
// 2.1 Périmètre de D accepté
V[NP] = insererZero('périmètre D', LFs(lire(O + 'proposition-perimetre-D.md')),
  "**Statut** : **proposition, non arbitrée.** Aucun sens du groupe D n'est relu, aucun verdict lexical n'est pris, aucune donnée n'est modifiée.",
  "**Statut** : **périmètre accepté le 2026-11-04 (§0).** La proposition est conservée telle qu'elle a été livrée ; aucune donnée n'est modifiée.",
  ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-04 (ChatGPT, par délégation ; relayé par l\'utilisateur) : « QD-1 : OUI — périmètre accepté, 53 sens dans 40 ENTRY. » « QD-2 : un seul rapport en trois sections (a, b, c), en conservant les analyses individuelles et la cohérence des ENTRY présentes dans plusieurs familles. » « QD-3 : OUI — méthode R1 à R5, conclusions individuelles selon A10, et lecture des 41 fiches sources intégrales. » L\'ouverture de la relecture (QD-4) a été réservée jusqu\'à la vérification de l\'application de l\'inscription du groupe C, puis autorisée distinctement : « QD-4 : OUI. J\'autorise maintenant l\'ouverture de la relecture lexicale du groupe D, strictement limitée aux 53 sens dans 40 ENTRY du périmètre accepté. »', '',
    '**Effets.** Le périmètre du groupe D (53 sens, 40 ENTRY, thème T2-classe), sa méthode et la forme de la livraison (un rapport unique en trois sections : a `deictique` publiée, b fonctions d\'A9 publiées, c aucune fonction publiée) sont acceptés ; les 40 verdicts du lot 3 sont cités sans être rouverts. Les annexes citées sont dans le dossier de travail `' + O + '` : `dossier-D.md` (SHA-256 `' + SOURCES[O + 'dossier-D.md'] + '`) et `perimetre-D.json` (SHA-256 `' + SOURCES[O + 'perimetre-D.json'] + '`). Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée.']);
// 2.2 Rapport de D arbitré
V[NR] = insererZero('rapport D', LFs(lire(O + 'rapport-relecture-D.md')),
  "**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est appliquée.",
  "**Statut** : **arbitré le 2026-11-05 (§0).** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est retenue.",
  ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-05 (ChatGPT, par délégation, après avis favorable ; relayé par l\'utilisateur) : « 1. Les 53 sens sont confirmés « ne relève pas de la fonction interrogatif » : 15 dans la section a, 10 dans b et 28 dans c. » « 2. Aucune omission n\'est retenue et aucun sens ne reste à arbitrer dans D. » « 3. Je confirme l\'analyse des phrases interrogatives du §2 : la présence du mot relu dans une question ne prouve pas qu\'il porte la fonction. » « 4. Je confirme que l\'incertitude de たぶん et l\'hésitation de ちょっと ne constituent pas des demandes d\'information. » « 5. Je confirme les trois observations historiques du §3.3, sans contradiction retenue avec A10 et sans réécriture des décisions. » « 6. Les dix observations hors périmètre sont conservées sans correction. » « Les 40 verdicts historiques du lot 3, les fonctions publiées et les douze corrections retenues concernant D restent inchangés. »', '',
    '**Effets.** 53 sens arbitrés « ne relève pas de la fonction » (a 15, b 10, c 28) ; aucune omission retenue, aucune décision nouvelle, aucune donnée modifiée. La lecture des 18 phrases du §2 est confirmée : la présence du mot relu dans une question ne prouve pas qu\'il porte la fonction. L\'incertitude de たぶん et l\'hésitation de ちょっと ne sont pas des demandes d\'information. Les trois observations historiques du §3.3 sont confirmées, sans contradiction avec A10 ni réécriture des décisions ; les dix observations hors périmètre (§8) sont conservées sans correction. Les fonctions publiées, les 148 décisions, les 40 verdicts du lot 3 et les 12 corrections retenues concernant D restent inchangés. La recherche d\'omissions compte 113 sens relus sur 234 candidats (A 39, B 18, C 3, D 53) ; 121 restent, dans le groupe E ; ce décompte reste séparé des 377 sens du lot 3 et du contrôle des 17 porteurs. Le recueil des 41 fiches sources est dans `' + O + 'fiches-D.md` (SHA-256 `' + SOURCES[O + 'fiches-D.md'] + '`) ; les analyses, dans `' + O + 'analyse-D.json` (SHA-256 `' + SOURCES[O + 'analyse-D.json'] + '`). Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée.']);
// 2.3 Bilan : §8.125, à la fin
{
  const t = LFs(lire(BIL)); ok(t.endsWith('\n') && !t.endsWith('\n\n'), 'bilan : fin de fichier attendue');
  const P = ['### 8.125 Recherche d\'omissions d\'`interrogatif` (A10, §8) : groupe D arbitré (2026-11-05)', '',
    '**Périmètre.** 53 sens dans 40 ENTRY, thème T2-classe (ENTRY de classe `pronom`, `determinant` ou `adverbe` ; 11 sens portent aussi T2-nuls) ; accepté le 2026-11-04 avec sa méthode et la forme d\'un rapport unique en trois sections (a `deictique` publiée, b fonctions d\'A9 publiées, c aucune fonction publiée), les 40 verdicts du lot 3 cités sans être rouverts (`docs/rapports/etape2-A2-05-omissions-interrogatif-D-perimetre.md`, §0).', '',
    '**Groupe D arbitré le 2026-11-05** (`docs/rapports/etape2-A2-05-omissions-interrogatif-D.md`, §0) : les 53 sens, relus sur leurs 41 fiches entières (la fiche fusionnée de ゆっくり comprise), leurs 123 anciens exemples, leurs ENTRY publiées, les 148 décisions et les 12 corrections retenues, selon la grille R1 à R5 ; **53 « ne relève pas de la fonction » (a 15, b 10, c 28), aucune omission retenue, aucun sens à arbitrer**. La classe et la série ne décident pas (A10, §3, point 2). **La présence du mot relu dans une question ne prouve pas qu\'il porte la fonction** (les 18 phrases du §2 du rapport). **L\'incertitude de たぶん et l\'hésitation de ちょっと ne sont pas des demandes d\'information.** Les trois observations historiques du §3.3 sont confirmées, sans contradiction avec A10 ni réécriture des décisions ; les dix observations hors périmètre (§8 du rapport) sont conservées sans correction. Les 40 verdicts du lot 3, les fonctions publiées et les 12 corrections retenues concernant D restent inchangés.', '',
    '**Décomptes séparés.** Recherche d\'omissions : 113 relus sur 234 candidats (A 39, B 18, C 3, D 53) ; 121 restent (groupe E) ; 573 non relevés, non relus. Ces décomptes ne s\'additionnent ni aux 377 sens du lot 3 ni au contrôle des 17 porteurs.', '',
    '**Non modifiés.** Données lexicales, normes, lots, journal, registre des tranches, relais, `sync-stable.mjs`, manifeste d\'empreintes (47 entrées) ; aucune correction appliquée. Les deux documents neufs de `docs/rapports/` ne sont pas protégés au manifeste d\'empreintes, comme les sept inscrits avec les groupes A, B et C (limite documentaire suivie séparément). Aucun `git add`, commit ni push.', ''];
  V[BIL] = t + '\n' + P.join('\n');
}
// 2.4 Pilotage : mêmes remplacements dans ETAT-ACTUEL.md et ROADMAP.md
const PA_D = 'La décision sur le périmètre du groupe E de la recherche d\'omissions d\'A10 (121 sens, 107 ENTRY, dernier groupe ; groupe D arbitré, `docs/rapports/etape2-A2-05-omissions-interrogatif-D.md`, §0) et sur l\'organisation de sa relecture, puis, sur autorisation distincte, cette relecture ; la recherche reste distincte des 377.';
const Q = [
  ['**groupes A, B et C arbitrés le\n  2026-11-04** (60 sens : A 39, B 18, C 3 ; aucune omission retenue) ; 174 candidats restent, dans les groupes D et E ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122 à §8.124).',
    '**groupes A, B et C arbitrés le\n  2026-11-04, groupe D le 2026-11-05** (113 sens : A 39, B 18, C 3, D 53 ; aucune omission retenue) ; 121 candidats restent, dans le groupe E ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122 à §8.125).'],
  ['La décision sur le périmètre du groupe D de la recherche d\'omissions d\'A10 (53 sens, 40 ENTRY ; groupe C arbitré, `docs/rapports/etape2-A2-05-omissions-interrogatif-C.md`, §0), puis, sur autorisation distincte, sa relecture ; puis le groupe E, sur autorisation distincte ; la recherche reste distincte des 377.', PA_D],
];
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) {
  let t = LFs(lire(p));
  for (const [k, [a, b]] of Q.entries()) t = remplacer(p + ', Q' + (k + 1), t, a, b);
  if (p === 'ROADMAP.md') {
    t = remplacer(p + ', date de l\'en-tête', t, '**Dernière mise à jour :** 2026-11-04 (', '**Dernière mise à jour :** 2026-11-05 (');
    t = remplacer(p + ', en-tête', t, 'recherche d\'omissions d\'`interrogatif` ouverte, groupes A, B et C arbitrés le 2026-11-04 ;', 'recherche d\'omissions d\'`interrogatif` ouverte, groupes A, B et C arbitrés le 2026-11-04, groupe D le 2026-11-05 ;');
  } else {
    const L = '| 2026-11-05 | 2 · A2-05 | **Recherche d\'omissions d\'A10 : groupe D relu et arbitré** (53 sens, 40 ENTRY, thème T2-classe, un rapport en trois sections : a `deictique` publiée 15, b fonctions d\'A9 publiées 10, c aucune fonction publiée 28 ; 53 « ne relève pas de la fonction », aucune omission retenue, aucun à arbitrer) ; périmètre, méthode et forme acceptés ; la présence du mot relu dans une question ne prouve pas qu\'il porte la fonction ; l\'incertitude de たぶん et l\'hésitation de ちょっと ne sont pas des demandes d\'information ; trois observations historiques confirmées sans contradiction avec A10 ; dix observations hors périmètre conservées sans correction ; décisions historiques, fonctions publiées, verdicts du lot 3 et corrections retenues inchangés ; 113 relus sur 234, 121 restent (E) ; deux documents neufs dans `docs/rapports/` ; §8.125. **377/377 ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 47 empreintes.** | non committé |';
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
  for (const [p, h] of Object.entries(INSCRITS)) ok(shaF(cl.C, p) === h, 'clone : document inscrit avec A, B ou C, inchangé : ' + p);
  dire('--- Sabotages (chacun rétabli aussitôt)');
  const sabote = (nom, p, fn, attendu) => { const o = readFileSync(cl.f(p)); const m = Buffer.from(fn(o.toString('utf8'))); if (m.equals(o)) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(cl.f(p), m); try { const x = relais(); ok(x.ids.split(',').includes(attendu), nom, 'écarts : ' + x.ids); } finally { writeFileSync(cl.f(p), o); } };
  sabote('S1 prochaine action différente dans ROADMAP.md : C5f', 'ROADMAP.md', (t) => t.replace('et sur l\'organisation de sa relecture', 'et sur la forme de sa relecture'), 'C5f');
  sabote('S2 renvoi .md retiré de la prochaine action d\'ETAT-ACTUEL.md : C5f', 'ETAT-ACTUEL.md', (t) => t.replace('`docs/rapports/etape2-A2-05-omissions-interrogatif-D.md`, §0', 'rapport du groupe D, §0'), 'C5f');
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
