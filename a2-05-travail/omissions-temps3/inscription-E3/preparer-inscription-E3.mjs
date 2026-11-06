// A2-05 · recherche d'omissions d'`interrogatif` : préparation de l'inscription documentaire de l'arbitrage de la livraison E3 (verbes) du groupe E et du bilan
// de clôture de la recherche d'omissions, EN PROPOSITION (QE-4 ; autorisation de préparation du 2026-11-05). Rien n'est appliqué.
// (1) Préconditions sur le dépôt réel (état d'arrivée de l'inscription E2). (2) Rapprochement de la mesure de couverture et des conclusions arbitrées (234
// candidats, chacun avec une conclusion et une seule ; 573 non relevés). (3) Versions proposées, en mémoire : ETAT-ACTUEL.md et ROADMAP.md (remplacements
// ciblés à ancre unique, une ligne de journal), bilan (§8.128 et §8.129 ajoutés à la fin) ; deux documents neufs dans docs/rapports/ : le rapport de E3 arbitré
// (statut et §0 ajoutés ; texte livré conservé, vérifié) et le bilan de clôture de la recherche, dont les décomptes sont calculés. (4) Clone jetable : état final
// simulé ; relais (C9b seul), contrôles, tests ; sabotages. (5) Écriture dans proposition/ si aucun écart. Transposé de preparer-inscription-E2.mjs.
// Usage : node a2-05-travail/omissions-temps3/inscription-E3/preparer-inscription-E3.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', O = W + 'omissions-temps3/', I = O + 'inscription-E3/', PROP = I + 'proposition/';
const { cloner, controler } = await import(pathToFileURL(join(root, W + 'arbitrage-F/essai-clone.mjs')));
const { diffBrut } = await import(pathToFileURL(join(root, W + 'arbitrage-F/moteur-application.mjs')));
const { ajouterLigneJournal } = await import(pathToFileURL(join(root, W + 'sync-stable.mjs')));
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const CIBLES = ['ETAT-ACTUEL.md', 'ROADMAP.md', BIL];
const RN = 'docs/rapports/etape2-A2-05-omissions-interrogatif-', NR = RN + 'E3.md', NC = RN + 'cloture.md', NOUVEAUX = [NR, NC];
const MESURE = W + 'arbitrage-F/mesure-couverture/mesure/mesure.json';
// Documents inscrits avec A, B, C, D, E1 et E2 : vérifiés inchangés
const INSCRITS = { [RN + 'mesure.md']: '03d5198e9df16ca92fac46c57fde70d9fc4bc9f841b95541fbe3560ed9d19ab1', [RN + 'A-perimetre.md']: 'dedd75d90a5cfe8cfc64f72ec00274f49262d1a8290211b51844a1ff208e9afd', [RN + 'A.md']: 'e5e168e3c4cacf8ee8b77b8978965ec3cda7ef5a81acebb3089653d6d50c2b6b',
  [RN + 'B-perimetre.md']: 'db3f97e46a474e2cde425702aa38aae93e6dea5ade910b3007c535ead4e05b93', [RN + 'B.md']: '8eb0180a7e078e392ef4da678f345d4e9efef6f37e21ec3deb1f3eda8223a2fc',
  [RN + 'C-perimetre.md']: '3f472e572c0cbf0ff4c252fc89293e34379129412ce2af96e140de05a474b5e8', [RN + 'C.md']: '726c4a3e711a065328f42a5659123c1ce0bf4bf94d01b17da14b8be651ad5e23',
  [RN + 'D-perimetre.md']: 'e057ddda41e0ed076b6e8c4d49d27477e210064484ca3942aa01bb402ecee790', [RN + 'D.md']: '65764bb97d892a9e4731aab0f7ec70f42e7a00e6794f18c1d3690f1e146c1993',
  [RN + 'E-perimetre.md']: '755b872f9489dd97976b04a73666c14893349628ae4e7668515d4b107d9b3e5b', [RN + 'E1.md']: 'c5d51e50ab8be700d3b573fe154ddb1bec5e6284988a5f4833b5bcfb67ac0b05',
  [RN + 'E2.md']: 'c1ab72ff55ef25626cd2d39f2d4e2d35255d84b98fe1b6aa306d24a13a248f93' };
// Départ : état d'arrivée de l'inscription E2 (proposition E2, manifeste ff439eca…, appliquée sur autorisation)
const DEPART = { 'ETAT-ACTUEL.md': '6f9f00230439254a5c4f8355e49e95f67ae91fd76e57f987e4f078ecd1d084eb', 'ROADMAP.md': '55ac49c5510e0473edc40586f585fe752234cc15ff73cea1e80f2f895078f903', [BIL]: '52ecfed6ea700c5d8d800dbda17ef4d888cd7f4744c946050b8a5d9acfabf1b9' };
// Analyses arbitrées des sept livraisons, et sources de E3
const ANALYSES = { A: 'c9c68bfde7f230d6c4aaab015501155dd3d2f59251b4c2579f20d0a3fc184d67', B: 'ea7692cdc12be7a184087966daaef81020d86f7a4fd6b84af64bc527c1dc1f4c', C: 'c68939612eb47eaf30772d07ec3120ed77f0a48a3507b29700a608b291c6aa1d', D: 'c0810c0f677e9364e9c2f30aa037a2013e6d2bcd5a2c773c47ae7a9edea0cb97',
  E1: 'af7c714ad9ea2e9ef83ed556cd649b2952551de718b9f61d6ff187460d9be4d7', E2: '172d18c0243b5e3827f2b7f4d5fc2c4f6e85bfd9494fde6c17793bb14b942b41', E3: '44a2f87c1626cab5004ff16392bb1bd3f8869bae64d238e974333b07237bd644' };
const SOURCES = { [O + 'rapport-relecture-E3.md']: '0a1ef1b6d83ca31e70251deeeed28d7dae542c19e23220ff79b9ec1d4a31a341', [O + 'fiches-E3.md']: '766943845d604200ae4745ba6e837ac65aba07402058ed32f5d2593d5647faea',
  [O + 'perimetre-E.json']: '0f4682d8b00a2d3befb2581a0f74cbc0bfe3eacb9a5f8a2e3a578f032c0539b5', [O + 'dossier-E.md']: '1a141ac195c3c39dfe3435b7d94722175385b78e29a5faa7ebd35b4ee5b33d60',
  [O + 'decoupage.json']: '56da6952d14259325eefee43cbfe0f2bb7cc6a5060a85e72f2df6c1ad97acc46', [MESURE]: '7637157edd8a28b7330a77313d525517ee4c28022b3d302964fb2cf9aa0e1d44',
  ...Object.fromEntries(Object.entries(ANALYSES).map(([g, h]) => [O + 'analyse-' + g + '.json', h])) };
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (r, p) => sha(readFileSync(join(r, p)));
const lire = (p) => readFileSync(join(root, p), 'utf8'); const json = (p) => JSON.parse(lire(p));
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
for (const p of CIBLES) ok(shaF(root, p) === DEPART[p], 'empreinte de départ (arrivée de l\'inscription E2) : ' + p, shaF(root, p).slice(0, 16));
for (const [p, h] of Object.entries(INSCRITS)) ok(existsSync(join(root, p)) && shaF(root, p) === h, 'document inscrit avec A à D, E1 ou E2, inchangé : ' + p, h.slice(0, 16));
for (const [p, h] of Object.entries(SOURCES)) ok(shaF(root, p) === h, 'source relue et arbitrée, inchangée : ' + p, h.slice(0, 16));
for (const p of NOUVEAUX) ok(!existsSync(join(root, p)), 'document neuf absent : ' + p);
ok(lire(BIL).includes('### 8.127 ') && !lire(BIL).includes('### 8.128 '), 'bilan : §8.127 présent, sans §8.128');
ok(lire('ROADMAP.md').split('**Dernière mise à jour :** 2026-11-05 (').length === 2, 'ROADMAP.md : date de l\'en-tête déjà au 2026-11-05, non remplacée');
arret();

// --- 2. Rapprochement : les 234 candidats de la mesure, et les conclusions arbitrées des sept livraisons
dire('--- Rapprochement de la mesure de couverture et des conclusions arbitrées');
const MS = json(MESURE); const CAND = MS.candidats; const POP = MS.population;
const GRP = [
  ['A', 'indices textuels du temps 1 (`T1-radicaux`, `T1-point`, `T1-mots`)', 39, 31, '2026-11-04', 'A.md', 'A-perimetre.md'],
  ['B', 'décisions du journal (`T2-journal`)', 18, 15, '2026-11-04', 'B.md', 'B-perimetre.md'],
  ['C', 'série (`T2-serie`)', 3, 2, '2026-11-04', 'C.md', 'C-perimetre.md'],
  ['D', 'classe (`T2-classe`)', 53, 40, '2026-11-05', 'D.md', 'D-perimetre.md'],
  ['E1', 'valeurs nulles (`T2-nuls`), noms', 39, 37, '2026-11-05', 'E1.md', 'E-perimetre.md'],
  ['E2', 'valeurs nulles (`T2-nuls`), adjectifs', 30, 27, '2026-11-05', 'E2.md', 'E-perimetre.md'],
  ['E3', 'valeurs nulles (`T2-nuls`), verbes', 52, 43, '2026-11-05', 'E3.md', 'E-perimetre.md'],
];
const CONCL = ['ne relève pas de la fonction', 'relève de la fonction', 'à arbitrer'];
const AN = Object.fromEntries(GRP.map(([g]) => [g, json(O + 'analyse-' + g + '.json')]));
const ou = {}; for (const [g] of GRP) for (const id of Object.keys(AN[g])) (ou[id] ??= []).push(g);
const idsC = CAND.map((c) => c.id);
ok(POP.sens === 807 && POP.porteursExclus === 17 && POP.entry === 669 && CAND.length === 234 && new Set(idsC).size === 234, 'mesure : 807 sens dans 669 ENTRY, 17 porteurs exclus, 234 candidats distincts', POP.sens + ' / ' + POP.entry + ' / ' + CAND.length);
ok(JSON.stringify(Object.keys(ou).sort()) === JSON.stringify([...idsC].sort()), 'les sens arbitrés des sept livraisons sont exactement les 234 candidats de la mesure', Object.keys(ou).length + ' sens arbitrés');
ok(Object.values(ou).every((v) => v.length === 1), 'chaque candidat a reçu une conclusion, et une seule, dans une seule livraison');
const entDe = Object.fromEntries(CAND.map((c) => [c.id, c.entry]));
const parG = GRP.map(([g, theme, ns, ne, date, rap, per]) => { const ids = Object.keys(AN[g]); const c = Object.fromEntries(CONCL.map((k) => [k, ids.filter((i) => AN[g][i].conclusion === k).length])); const nE = new Set(ids.map((i) => entDe[i])).size; ok(ids.length === ns && nE === ne && c[CONCL[0]] === ns, 'livraison ' + g + ' : ' + ns + ' sens dans ' + ne + ' ENTRY, tous « ne relève pas de la fonction »', ids.length + ' / ' + nE + ' / ' + JSON.stringify(c)); return { g, theme, ns, ne, date, rap: RN + rap, per: RN + per, c }; });
const tot = Object.fromEntries(CONCL.map((k) => [k, parG.reduce((n, x) => n + x.c[k], 0)]));
ok(tot[CONCL[0]] === 234 && tot[CONCL[1]] === 0 && tot[CONCL[2]] === 0, 'total : 234 « ne relève pas de la fonction », 0 « relève de la fonction », 0 « à arbitrer »', JSON.stringify(tot));
const ENTR = new Set(CAND.map((c) => c.entry)); ok(ENTR.size === 195, '195 ENTRY relues, chacune dans une seule livraison', ENTR.size + ' ENTRY');
const nonReleves = POP.sens - CAND.length; ok(nonReleves === 573, '573 sens non relevés par aucun filtre (807 − 234)', String(nonReleves));
const FIL = MS.filtres.map((f) => f.id); const parF = Object.fromEntries(FIL.map((f) => [f, CAND.filter((c) => c.filtres.includes(f)).length]));
ok(FIL.every((f) => parF[f] === MS.couverture.parFiltre[f]), 'relevés par filtre recalculés égaux à la mesure', JSON.stringify(parF));
const nbF = {}; for (const c of CAND) nbF[c.filtres.length] = (nbF[c.filtres.length] ?? 0) + 1;
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const setC = new Set(idsC); const sensER = pub.filter((e) => ENTR.has(e.id)).flatMap((e) => e.senses);
const porteursER = sensER.filter((s) => fns(s).includes('interrogatif')).length; const nonCandER = sensER.filter((s) => !setC.has(s.id) && !fns(s).includes('interrogatif')).length;
ok(sensER.length === 234 + nonCandER + porteursER, 'sens des 195 ENTRY relues : 234 candidats, ' + nonCandER + ' non candidats, ' + porteursER + ' porteurs', String(sensER.length));
const porteursTot = pub.flatMap((e) => e.senses).filter((s) => fns(s).includes('interrogatif')).length;
ok(porteursTot === 17 && pub.flatMap((e) => e.senses).length === 807 + 17, 'données publiées : 824 sens, dont 17 porteurs d\'`interrogatif`', String(pub.flatMap((e) => e.senses).length));
arret();

// --- 3. Versions proposées, en mémoire
dire('--- Versions proposées, en mémoire');
const V = {}; const eol = Object.fromEntries(CIBLES.map((p) => [p, eolDe(lire(p))]));
const AVANT_1 = (t) => t.search(/^## 1\. /m);
const insererZero = (nom, t, statutAvant, statutApres, zero) => { let u = remplacer(nom + ', statut', t, statutAvant, statutApres); const i = AVANT_1(u); ok(i > 0 && !/^## 0\. /m.test(u), nom + ' : §0 inséré avant le §1'); return u.slice(0, i) + zero.join('\n') + '\n\n' + u.slice(i); };
const conserve = (nom, v, src) => { const s = LFs(lire(src)); const i0 = v.search(/^## 0\. /m), i1 = v.search(/^## 1\. /m), j1 = s.search(/^## 1\. /m); const hs = (x) => x.split('\n').filter((l) => !l.startsWith('**Statut**')).join('\n');
  ok(i0 > 0 && i1 > i0 && v.slice(i1) === s.slice(j1) && hs(v.slice(0, i0)) === hs(s.slice(0, j1)), nom + ' : texte livré conservé (en-tête hors statut, et tout à partir du §1)', src); };
const ARB = '« J\'accepte les recommandations de ChatGPT concernant la relecture E3. » « 1. Je valide les 52 conclusions « ne relève pas de la fonction interrogatif » : 23 dans le groupe a, 10 dans b, 13 dans c et 6 dans d. » « 2. Aucune omission n\'est retenue et aucun sens ne reste à arbitrer dans E3. » « 3. Je confirme l\'analyse des dix phrases du §2.1 : cinq demandes de permission, deux questions fermées et trois questions ouvertes. » « 4. Je confirme la distinction du §3.2 entre l\'action ou l\'état désigné par un verbe et le porteur de l\'interrogation, pour les emplois documentés dans E3, sans en faire une règle générale sur tous les verbes. » « 5. Je confirme les conclusions concernant les huit sens sans illustration, en conservant explicitement cette limite documentaire, ainsi que les deux illustrations incertaines. » « 6. Je confirme les observations du §3.4 : D1184 est un faux positif de repérage ; aucune contradiction avec A10 n\'est établie. » « 7. Les seize sens non candidats et les neuf observations éditoriales restent hors des conclusions. » « Les 154 décisions historiques, les 52 verdicts du volet 2 et les onze corrections retenues concernant E3 restent inchangés. »';
const AUTO = '« J\'autorise uniquement la préparation, sans application : de l\'inscription documentaire de l\'arbitrage E3, conformément à QE-4 ; du bilan de clôture de la recherche d\'omissions, distinguant clairement les 234 candidats examinés des 573 sens non détectés et non audités. Le bilan ne devra pas conclure que les 807 sens sont conformes. Il devra rappeler que les 204 corrections restent non appliquées et que l\'étape 2 n\'est pas terminée. […] Ne prépare pas encore l\'application des 204 corrections ni la clôture de l\'étape 2 : ces opérations nécessiteront des autorisations distinctes. »';
// 3.1 Rapport de E3 arbitré
V[NR] = insererZero('rapport E3', LFs(lire(O + 'rapport-relecture-E3.md')),
  "**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est appliquée. L'inscription de E3 et le bilan de clôture de la recherche d'omissions ne sont pas préparés.",
  "**Statut** : **arbitré le 2026-11-05 (§0).** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est retenue. La recherche d'omissions est close : bilan de clôture, `" + NC + "`.",
  ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-05 (l\'utilisateur, qui accepte les recommandations de ChatGPT ; relayé par l\'utilisateur) : ' + ARB, '',
    '**Effets.** 52 sens arbitrés « ne relève pas de la fonction » (a, fiches du lot 18 : 23 ; b, lot 19 : 10 ; c, lot 20 : 13 ; d, autres lots : 6 ; les groupes de lecture n\'ont aucune valeur de décision) ; aucune omission retenue, aucune décision nouvelle, aucune donnée modifiée. L\'analyse des dix phrases du §2.1 est confirmée : cinq demandes de permission en 〜てもいいですか, où le verbe nomme l\'action soumise à l\'accord ; deux questions fermées en か, où le verbe est le contenu soumis à confirmation ; trois questions ouvertes, où どう ou いくら tient la place de l\'inconnu. **La distinction du §3.2** entre l\'action ou l\'état désigné par un verbe et le porteur de l\'interrogation est confirmée **pour les emplois documentés dans E3, sans en faire une règle générale sur tous les verbes**. Les conclusions des huit sens qu\'aucune phrase n\'illustre sont confirmées, **leur limite documentaire étant explicitement conservée**, ainsi que les deux illustrations incertaines (ある, sens 2 ; 出来る, sens 2). Les observations du §3.4 sont confirmées : D1184 est un faux positif de repérage ; aucune contradiction avec A10 n\'est établie. Les seize sens non candidats des ENTRY relues (§3.3) et les neuf observations éditoriales (§9) restent hors des conclusions ; ces seize sens ne sont pas vérifiés conformes. Les 154 décisions historiques, les 52 verdicts du volet 2 et les 11 corrections retenues concernant E3 restent inchangés. Avec E3, les 234 candidats de la recherche d\'omissions sont relus et arbitrés (A 39, B 18, C 3, D 53, E1 39, E2 30, E3 52) ; le bilan de clôture est `' + NC + '` ; ce décompte reste séparé des 377 sens du lot 3 et du contrôle des 17 porteurs. Le recueil des 45 fiches sources est dans `' + O + 'fiches-E3.md` (SHA-256 `' + SOURCES[O + 'fiches-E3.md'] + '`) ; les analyses, dans `' + O + 'analyse-E3.json` (SHA-256 `' + ANALYSES.E3 + '`). Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée.']);
conserve('rapport E3', V[NR], O + 'rapport-relecture-E3.md');
// 3.2 Bilan de clôture de la recherche d'omissions (document neuf)
{
  const cell = (t) => String(t).replace(/\|/g, '\\|');
  const docs = [RN + 'mesure.md', ...parG.flatMap((x) => [x.per, x.rap])].filter((p, i, a) => a.indexOf(p) === i);
  const shaDoc = (p) => (p === NR ? sha(Buffer.from(V[NR])) : INSCRITS[p]);
  const L = ['# Étape 2 · A2-05 · bloc F · recherche d\'omissions d\'`interrogatif` (A10, §8) — bilan de clôture', '',
    '**Date** : 2026-11-05',
    '**Statut** : bilan de clôture de la recherche d\'omissions, établi le 2026-11-05 après l\'arbitrage de la livraison E3, et inscrit avec cet arbitrage, sur autorisation distincte (§0). Il ne contient **aucune conclusion lexicale nouvelle** : il rassemble la mesure de couverture et les arbitrages des groupes A à E. Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée.', '',
    '## 0. Autorisation et portée', '',
    'Autorisation de préparation du 2026-11-05 (l\'utilisateur, qui accepte les recommandations de ChatGPT ; relayée par l\'utilisateur) : ' + AUTO, '',
    '**Ce bilan clôt la recherche d\'omissions d\'A10, §8, et rien d\'autre.** Il ne conclut pas que les 807 sens de la population sont conformes : **234 candidats ont été relus et arbitrés ; les 573 autres n\'ont été relevés par aucun filtre, n\'ont pas été relus, et ne sont pas vérifiés conformes** (A10, §8, compte rendu). Il ne clôt ni le bloc F au-delà de la recherche, ni le lot 3, ni le volet 1, ni l\'étape 2, qui **n\'est pas terminée** ; les **204 corrections retenues restent non appliquées**.', '',
    '## 1. En bref', '',
    '| Décompte | Sens | Statut |', '|---|---|---|',
    '| Population de la recherche (sens publiés qui ne portent pas `interrogatif`) | ' + POP.sens + ' | dans ' + POP.entry + ' ENTRY ; les 17 porteurs sont exclus, et contrôlés à part |',
    '| **Candidats relevés par au moins un filtre, relus et arbitrés** | **' + CAND.length + '** | **' + tot[CONCL[0]] + ' « ne relève pas de la fonction », ' + tot[CONCL[1]] + ' « relève de la fonction », ' + tot[CONCL[2]] + ' « à arbitrer » ; aucune omission retenue** |',
    '| **Non relevés par aucun filtre** | **' + nonReleves + '** | **non relus ; non vérifiés conformes** |',
    '| dont sens non candidats des ' + ENTR.size + ' ENTRY relues | ' + nonCandER + ' | lus pour l\'ENTRY, sans conclusion ; non vérifiés conformes |', '',
    'Les deux décomptes d\'A10, §8, restent séparés et ne s\'additionnent jamais : le contrôle des 17 sens qui portent la fonction (bloc F, compté dans les 377 du lot 3, arbitré le 2026-11-03) et la présente recherche d\'omissions (hors des 377).', '',
    '## 2. Couverture (A10, §8, compte rendu)', '',
    'Mesure exécutée une fois sur autorisation et prise en acte le 2026-11-04 (`' + RN + 'mesure.md`, §0) ; détail dans `' + MESURE + '` (SHA-256 `' + SOURCES[MESURE] + '`), dont le présent bilan recalcule les décomptes.', '',
    '| Filtre | Temps | Ce qu\'il relève | Sens relevés | Relevés par ce seul filtre |', '|---|---|---|---|---|',
    ...MS.filtres.map((f) => '| `' + f.id + '` | ' + (f.temps || 'hors A10') + ' | ' + cell(f.libelle) + ' | ' + parF[f.id] + ' | ' + MS.couverture.seulParFiltre[f.id] + ' |'), '',
    '- Relevés, dédupliqués (un sens compté une fois, tous ses filtres conservés) : **' + CAND.length + '** ; par le temps 1 : ' + MS.couverture.parTemps1 + ' ; par le seul temps 2 : ' + (CAND.length - MS.couverture.parTemps1) + ' ; par le seul X1 (filtre complémentaire, hors A10) : 0.',
    '- Répartition par nombre de filtres : ' + Object.entries(nbF).sort((a, b) => a[0] - b[0]).map(([n, k]) => n + ' filtre' + (n > 1 ? 's' : '') + ' : ' + k).join(' ; ') + '.',
    '- Non relevés par aucun filtre : **' + nonReleves + '**.', '',
    '## 3. Relecture et arbitrages (temps 3)', '',
    'Chaque ENTRY a été placée tout entière dans le premier groupe dont un de ses sens porte un filtre (découpage accepté le 2026-11-04) ; chaque candidat a été relu sur sa fiche entière et les fiches fusionnées, ses anciens exemples, son ENTRY publiée et toutes ses décisions, selon la grille R1 à R5, et a reçu une conclusion motivée, arbitrée.', '',
    '| Livraison | Thème | Sens | ENTRY | Ne relève pas | Relève | À arbitrer | Arbitrée le | Rapport arbitré (§0) |', '|---|---|---|---|---|---|---|---|---|',
    ...parG.map((x) => '| ' + x.g + ' | ' + x.theme + ' | ' + x.ns + ' | ' + x.ne + ' | ' + x.c[CONCL[0]] + ' | ' + x.c[CONCL[1]] + ' | ' + x.c[CONCL[2]] + ' | ' + x.date + ' | `' + x.rap + '` |'),
    '| **Total** | | **' + CAND.length + '** | **' + ENTR.size + '** | **' + tot[CONCL[0]] + '** | **' + tot[CONCL[1]] + '** | **' + tot[CONCL[2]] + '** | | |', '',
    '**Traçabilité, vérifiée par le script de préparation** : l\'ensemble des sens arbitrés dans les sept analyses (`' + O + 'analyse-{A,B,C,D,E1,E2,E3}.json`) est **exactement** celui des 234 candidats de la mesure ; chaque candidat a reçu une conclusion et une seule, dans une seule livraison ; il garde son identifiant de SENSE et ses filtres d\'origine, de la mesure à la conclusion ; les relevés par filtre, recalculés, sont égaux à ceux de la mesure.', '',
    '## 4. Ce que ce bilan n\'établit pas : les limites', '',
    '1. **Les 573 sens non relevés ne sont pas vérifiés conformes.** Ils n\'ont pas été relus. Les filtres ne voient pas une fiche qui décrirait un emploi interrogatif sans aucune des marques recherchées, hors des classes et des séries du temps 2 ; `T2-serie` compare les graphies, non les lectures ; les phrases d\'exemple ne sont pas filtrées ; les données de grammaire sont hors de la population (mesure, §7).',
    '2. **Les ' + nonCandER + ' sens non candidats des ENTRY relues** ont été lus pour l\'ENTRY, sans recevoir de conclusion ; ils sont parmi les 573 et ne sont pas vérifiés conformes.',
    '3. **Aucune conclusion n\'est tirée pour les 807 sens pris ensemble** : la recherche n\'établit l\'absence d\'omission que pour les 234 candidats relus.',
    '4. **Limites documentaires conservées** : huit sens de E3 ne sont illustrés par aucune phrase de leur fiche, et deux illustrations y sont incertaines ; leurs conclusions reposent sur la description de la fiche, la limite étant explicitement conservée (arbitrage de E3, point 5).',
    '5. **Portée des lectures arbitrées** : la distinction entre l\'action ou l\'état désigné par un verbe et le porteur de l\'interrogation vaut pour les emplois documentés dans E3, **sans règle générale sur tous les verbes** (arbitrage de E3, point 4) ; de même, la distinction entre le contenu de la question et le porteur (E1, E2), et le principe que la présence du mot relu dans une question ne prouve pas qu\'il porte la fonction (arbitrage du groupe D, point 3), sont des lectures d\'arbitrage, non des normes nouvelles. Aucune norme n\'est modifiée ; A10 est appliqué tel qu\'il est.',
    '6. **Ce qui n\'a pas été examiné** : la catégorie, le type, les dimensions et les fonctions d\'A9 des sens relus ; les verdicts du lot 3 et du volet 2, cités sans être rouverts.',
    '7. **Observations éditoriales** relevées à la lecture (anciens exemples, romaji, traductions, champs hérités des fiches) : conservées sans correction dans chaque rapport ; aucune n\'est une correction retenue.',
    '8. **Protection** : les documents neufs de `docs/rapports/` de la recherche ne sont pas protégés au manifeste d\'empreintes, dont l\'outillage ne couvre que le lot 3 (limite documentaire suivie séparément).', '',
    '## 5. Décisions déjà existantes', '',
    'Dans chaque rapport, toutes les décisions de journal des ENTRY relues ont été citées, et celles qui attribuent, refusent ou évoquent une fonction ont été confrontées à A10, sans être réécrites ; notamment : D0724 (誰か, pas de fonction interrogative ; confirmée au groupe A), D0637, D0672 et D0677 (groupe B, formule conservée comme observation de rédaction), D1504 (groupe C), D0074, D1113 et D1424 (E2), D1305, D1319, D1323 et D1327 (E3) ; D1184 (E3) n\'était qu\'un faux positif du repérage. Aucune contradiction avec A10 n\'est établie.', '',
    '## 6. Ce qui reste, hors de ce bilan', '',
    '- **Les 204 corrections retenues restent non appliquées** (dont celles qui concernent les ENTRY relues ici) ; leur application demande une autorisation distincte.',
    '- **L\'étape 2 n\'est pas terminée** : le volet 3 (contrôles globaux G1 à G7) n\'est pas commencé ; les vérifications hors périmètre HP-1 à HP-4 et les questions de couverture QC-1 et QC-2 restent à cadrer ; la vérification des 120 avertissements `categorie-nulle` reste exigée avant toute déclaration de fin d\'étape 2 ; la clôture de l\'étape 2 demande une autorisation distincte.',
    '- Le décompte de la recherche ne s\'ajoute ni aux 377 sens du lot 3 ni au contrôle des 17 porteurs.', '',
    '## 7. Documents', '',
    '| Document | SHA-256 |', '|---|---|', ...docs.map((p) => '| `' + p + '` | `' + shaDoc(p).slice(0, 16) + '…` |'), '',
    'Les analyses individuelles et les recueils de fiches sont dans `' + O + '`, non suivi : analyses ' + GRP.map(([g]) => g + ' `' + ANALYSES[g].slice(0, 16) + '…`').join(', ') + '.', ''];
  V[NC] = L.join('\n');
  ok(/non vérifiés conformes/.test(V[NC]) && /234/.test(V[NC]) && /573/.test(V[NC]) && /Il ne conclut pas que les 807 sens/.test(V[NC]) && /204 corrections retenues restent non appliquées/.test(V[NC]) && /n'est pas terminée/.test(V[NC]), 'bilan de clôture : 234 et 573 distingués ; aucune conclusion sur les 807 ; 204 corrections non appliquées ; étape 2 non terminée');
  { const nie = V[NC].split('ne devra pas conclure que les 807 sens sont conformes').join('').split('ne conclut pas que les 807 sens').join(''); // formules niées retirées, puis aucune affirmation tolérée
    ok(!/807 sens[^.]{0,40}(sont|est) conformes|tous conformes|vérifiés conformes : 807/.test(nie), 'bilan de clôture : aucune formule affirmant la conformité des 807 sens (les seules mentions sont niées)'); }
  ok(V[NC].split(/^## 0\. /m).length === 2 && !V[NC].includes('\r'), 'bilan de clôture : un seul §0, LF');
}
// 3.3 Bilan du volet 2 : §8.128 (E3) et §8.129 (clôture), à la fin
{
  const t = LFs(lire(BIL)); ok(t.endsWith('\n') && !t.endsWith('\n\n'), 'bilan : fin de fichier attendue');
  const P = ['### 8.128 Recherche d\'omissions d\'`interrogatif` (A10, §8) : livraison E3 du groupe E arbitrée (2026-11-05)', '',
    '**Livraison E3 arbitrée le 2026-11-05** (`' + NR + '`, §0 ; périmètre du groupe E, `' + RN + 'E-perimetre.md`, §0) : les 52 sens verbaux de 43 ENTRY, relus sur leurs 45 fiches entières (les fiches fusionnées de 無くす et de 出る comprises), leurs 135 anciens exemples, leurs ENTRY publiées, les 154 décisions et les 11 corrections retenues, selon la grille R1 à R5 ; **52 « ne relève pas de la fonction » (a 23, b 10, c 13, d 6), aucune omission retenue, aucun sens à arbitrer**. **Les dix phrases du §2.1** : cinq demandes de permission en 〜てもいいですか, deux questions fermées en か, trois questions ouvertes (どう, いくら). **La distinction entre l\'action ou l\'état désigné par un verbe et le porteur de l\'interrogation** (§3.2) est confirmée pour les emplois documentés dans E3, sans règle générale sur tous les verbes. Les conclusions des huit sens sans illustration sont confirmées, leur limite documentaire conservée, ainsi que les deux illustrations incertaines ; D1184 est un faux positif de repérage ; aucune contradiction avec A10 n\'est établie. Les seize sens non candidats et les neuf observations éditoriales restent hors des conclusions. Les 154 décisions historiques, les 52 verdicts du volet 2 et les 11 corrections retenues concernant E3 restent inchangés.', '',
    '### 8.129 Recherche d\'omissions d\'`interrogatif` (A10, §8) : clôture (2026-11-05)', '',
    '**Bilan de clôture** (`' + NC + '`) : **234 candidats relevés sur 807, tous relus et arbitrés** (A 39, B 18, C 3, D 53, E1 39, E2 30, E3 52 ; 195 ENTRY) : 234 « ne relève pas de la fonction », 0 « relève de la fonction », 0 « à arbitrer » ; **aucune omission retenue**. **Les 573 sens non relevés par aucun filtre n\'ont pas été relus et ne sont pas vérifiés conformes** (dont ' + nonCandER + ' sens non candidats des ENTRY relues). Le bilan ne conclut pas que les 807 sens sont conformes. Traçabilité vérifiée : l\'ensemble des sens arbitrés est exactement celui des 234 candidats de la mesure, chacun avec une conclusion et une seule. Les lectures d\'arbitrage (contenu de la question et porteur ; présence dans une question ; verbe et porteur) ne sont pas des normes nouvelles.', '',
    '**Décomptes séparés.** Recherche d\'omissions close : 234 relus sur 234 candidats ; 573 non relevés, non relus. Ces décomptes ne s\'additionnent ni aux 377 sens du lot 3 ni au contrôle des 17 porteurs.', '',
    '**Non modifiés.** Données lexicales, normes, lots, journal, registre des tranches, relais, `sync-stable.mjs`, manifeste d\'empreintes (47 entrées) ; **les 204 corrections retenues restent non appliquées**. **L\'étape 2 n\'est pas terminée** : volet 3 non commencé, HP-1 à HP-4 non commencées, vérification des 120 avertissements `categorie-nulle` exigée avant toute fin d\'étape ; l\'application des corrections et la clôture de l\'étape 2 demandent des autorisations distinctes. Les deux documents neufs de `docs/rapports/` ne sont pas protégés au manifeste d\'empreintes, comme les douze inscrits avant eux (limite documentaire suivie séparément). Aucun `git add`, commit ni push.', ''];
  V[BIL] = t + '\n' + P.join('\n');
}
// 3.4 Pilotage : mêmes remplacements dans ETAT-ACTUEL.md et ROADMAP.md
const PA_E3 = 'Le choix de la suite de l\'étape 2, sur arbitrage distinct, après la clôture de la recherche d\'omissions d\'A10 (234 candidats relus sur 234, aucune omission retenue ; 573 sens non relevés, non relus et non vérifiés conformes ; livraison E3 arbitrée, `' + NR + '`, §0 ; bilan de clôture, `' + NC + '`) : notamment le volet 3 (contrôles globaux G1 à G7), le cadre des vérifications hors périmètre HP-1 à HP-4 et l\'application des 204 corrections retenues, chacun sur autorisation distincte ; l\'étape 2 n\'est pas terminée.';
const Q = [
  ['**La recherche\n  d\'omissions d\'A10 (§8) est ouverte** : mesure de couverture prise en acte (807 sens, 234 candidats,\n  573 non relevés, aucun par le seul X1) ; découpage en cinq groupes accepté ; **groupes A, B et C arbitrés le\n  2026-11-04, groupe D et livraisons E1 et E2 du groupe E le 2026-11-05** (182 sens : A 39, B 18, C 3, D 53, E1 39, E2 30 ; aucune omission retenue) ; périmètre du groupe E accepté, en trois livraisons par classe (E1 noms, E2 adjectifs, E3 verbes), chacune inscrite après son arbitrage ; 52 candidats restent, dans E3 ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122 à §8.127).',
    '**La recherche\n  d\'omissions d\'A10 (§8) est close** : mesure de couverture prise en acte (807 sens, 234 candidats,\n  573 non relevés, aucun par le seul X1) ; découpage en cinq groupes accepté ; **groupes A, B et C arbitrés le\n  2026-11-04, groupe D et livraisons E1, E2 et E3 du groupe E le 2026-11-05** (234 candidats relus sur 234 : A 39, B 18, C 3, D 53, E1 39, E2 30, E3 52 ; aucune omission retenue) ; **les 573 sens non relevés n\'ont pas été relus et ne sont pas vérifiés conformes** ; bilan de clôture : `' + NC + '` ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122 à §8.129).'],
  ['L\'ouverture de la relecture de la livraison E3 de la recherche d\'omissions d\'A10 (52 sens, 43 ENTRY, verbes ; périmètre du groupe E accepté, `docs/rapports/etape2-A2-05-omissions-interrogatif-E-perimetre.md`, §0 ; livraison E2 arbitrée, `docs/rapports/etape2-A2-05-omissions-interrogatif-E2.md`, §0), sur autorisation distincte après vérification de l\'inscription de E2, puis l\'inscription de son arbitrage ; la recherche reste distincte des 377.', PA_E3],
];
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) {
  let t = LFs(lire(p));
  for (const [k, [a, b]] of Q.entries()) t = remplacer(p + ', Q' + (k + 1), t, a, b);
  if (p === 'ROADMAP.md') {
    t = remplacer(p + ', en-tête', t, 'recherche d\'omissions d\'`interrogatif` ouverte, groupes A, B et C arbitrés le 2026-11-04, groupe D et livraisons E1 et E2 du groupe E le 2026-11-05 ;', 'recherche d\'omissions d\'`interrogatif` close, groupes A, B et C arbitrés le 2026-11-04, groupe D et livraisons E1, E2 et E3 du groupe E le 2026-11-05 (234 candidats sur 234, aucune omission retenue ; 573 sens non relevés, non vérifiés) ;');
  } else {
    const L = '| 2026-11-05 | 2 · A2-05 | **Recherche d\'omissions d\'A10 : livraison E3 du groupe E relue et arbitrée ; recherche close** (E3 : 52 sens verbaux, 43 ENTRY, thème T2-nuls ; groupes de lecture a 23, b 10, c 13, d 6 ; 52 « ne relève pas de la fonction », aucune omission retenue, aucun à arbitrer) ; dix phrases en forme de question confirmées (cinq demandes de permission, deux questions fermées, trois questions ouvertes) ; distinction entre l\'action ou l\'état désigné par un verbe et le porteur de l\'interrogation confirmée pour E3, sans règle générale ; huit sens sans illustration confirmés, limite documentaire conservée ; D1184 faux positif de repérage ; décisions historiques, verdicts du volet 2 et corrections retenues inchangés ; **bilan de clôture** : 234 candidats relus sur 234, aucune omission retenue ; **573 sens non relevés, non relus, non vérifiés conformes** ; aucune conclusion sur les 807 ; deux documents neufs dans `docs/rapports/` ; §8.128 et §8.129. **377/377 ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 47 empreintes ; étape 2 non terminée.** | non committé |';
    const t2 = LFs(ajouterLigneJournal(t, L)); ok(t2 !== t && t2.split(L).length === 2 && t2.trimEnd().endsWith(L), 'ETAT-ACTUEL.md : une ligne de journal ajoutée à la fin du journal'); t = t2;
  }
  V[p] = t;
}
for (const p of CIBLES) V[p] = avecEol(V[p], eol[p]);
arret();

// --- 4. Clone : état final simulé
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
  for (const [p, h] of Object.entries(INSCRITS)) ok(shaF(cl.C, p) === h, 'clone : document inscrit avec A à D, E1 ou E2, inchangé : ' + p);
  dire('--- Sabotages (chacun rétabli aussitôt)');
  const sabote = (nom, p, fn, attendu) => { const o = readFileSync(cl.f(p)); const m = Buffer.from(fn(o.toString('utf8'))); if (m.equals(o)) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(cl.f(p), m); try { const x = relais(); ok(x.ids.split(',').includes(attendu), nom, 'écarts : ' + x.ids); } finally { writeFileSync(cl.f(p), o); } };
  sabote('S1 prochaine action différente dans ROADMAP.md : C5f', 'ROADMAP.md', (t) => t.replace('le cadre des vérifications hors périmètre', 'l\'examen des vérifications hors périmètre'), 'C5f');
  sabote('S2 renvoi .md du bilan de clôture retiré de la prochaine action d\'ETAT-ACTUEL.md : C5f', 'ETAT-ACTUEL.md', (t) => t.replace('bilan de clôture, `' + NC + '`)', 'bilan de clôture)'), 'C5f');
  const tem = relais(); ok(tem.ids === 'C9b' && tem.fin === '29 conformes sur 30', 'témoin après sabotages : 29 sur 30, C9b seul', tem.fin);
  for (const p of TOUS) ok(shaF(cl.C, p) === sha(Buffer.from(V[p])), 'clone : version finale intacte : ' + p);
} finally { cl.nettoyer(); }
arret();

// --- 5. Écriture de la proposition
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
