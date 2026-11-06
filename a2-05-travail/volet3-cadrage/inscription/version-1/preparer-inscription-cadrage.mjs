// A2-05 · volet 3 : préparation de l'inscription documentaire du cadrage arbitré des contrôles globaux G1 à G7, EN PROPOSITION (autorisation de préparation du
// 2026-11-05). Rien n'est appliqué. (1) Préconditions sur le dépôt réel (état d'arrivée de l'inscription E3). (2) Versions proposées, en mémoire : ETAT-ACTUEL.md et
// ROADMAP.md (remplacements ciblés à ancre unique ; une ligne de journal), bilan (§8.130 ajouté à la fin) ; un document neuf dans docs/rapports/ : la proposition
// de cadrage, conservée telle qu'elle a été livrée, avec son statut et un §0 d'arbitrage. (3) Clone jetable : état final simulé ; relais (C9b seul), contrôles,
// tests ; sabotages. (4) Écriture dans proposition/ si aucun écart. Transposé de omissions-temps3/inscription-E3/preparer-inscription-E3.mjs.
// Usage : node a2-05-travail/volet3-cadrage/inscription/preparer-inscription-cadrage.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', V3 = W + 'volet3-cadrage/', I = V3 + 'inscription/', PROP = I + 'proposition/';
const { cloner, controler } = await import(pathToFileURL(join(root, W + 'arbitrage-F/essai-clone.mjs')));
const { diffBrut } = await import(pathToFileURL(join(root, W + 'arbitrage-F/moteur-application.mjs')));
const { ajouterLigneJournal } = await import(pathToFileURL(join(root, W + 'sync-stable.mjs')));
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const CIBLES = ['ETAT-ACTUEL.md', 'ROADMAP.md', BIL];
const NR = 'docs/rapports/etape2-A2-05-volet3-cadrage.md', NOUVEAUX = [NR];
const SRC = V3 + 'proposition-cadrage-volet3.md', SRC_SHA = '6922ce7273ae2574c03a8b3eedec4798fbd01f5c9724e963d009943207210f2f';
const RN = 'docs/rapports/etape2-A2-05-omissions-interrogatif-';
// Documents déjà inscrits, vérifiés inchangés (le périmètre du volet 3 compris : Q1, en-têtes historiques non modifiés)
const INSCRITS = { [RN + 'mesure.md']: '03d5198e9df16ca92fac46c57fde70d9fc4bc9f841b95541fbe3560ed9d19ab1', [RN + 'A-perimetre.md']: 'dedd75d90a5cfe8cfc64f72ec00274f49262d1a8290211b51844a1ff208e9afd', [RN + 'A.md']: 'e5e168e3c4cacf8ee8b77b8978965ec3cda7ef5a81acebb3089653d6d50c2b6b',
  [RN + 'B-perimetre.md']: 'db3f97e46a474e2cde425702aa38aae93e6dea5ade910b3007c535ead4e05b93', [RN + 'B.md']: '8eb0180a7e078e392ef4da678f345d4e9efef6f37e21ec3deb1f3eda8223a2fc',
  [RN + 'C-perimetre.md']: '3f472e572c0cbf0ff4c252fc89293e34379129412ce2af96e140de05a474b5e8', [RN + 'C.md']: '726c4a3e711a065328f42a5659123c1ce0bf4bf94d01b17da14b8be651ad5e23',
  [RN + 'D-perimetre.md']: 'e057ddda41e0ed076b6e8c4d49d27477e210064484ca3942aa01bb402ecee790', [RN + 'D.md']: '65764bb97d892a9e4731aab0f7ec70f42e7a00e6794f18c1d3690f1e146c1993',
  [RN + 'E-perimetre.md']: '755b872f9489dd97976b04a73666c14893349628ae4e7668515d4b107d9b3e5b', [RN + 'E1.md']: 'c5d51e50ab8be700d3b573fe154ddb1bec5e6284988a5f4833b5bcfb67ac0b05',
  [RN + 'E2.md']: 'c1ab72ff55ef25626cd2d39f2d4e2d35255d84b98fe1b6aa306d24a13a248f93', [RN + 'E3.md']: '40ba32b22aced419c13da667470183c0123fd32c81be7830b4907e5a549ac256',
  [RN + 'cloture.md']: '35de1a5888ae63f720604abe93537713317703e9a82614bbb4552531fc6349bd',
  'docs/rapports/etape2-A2-05-perimetre-controles-globaux.md': '29023cf8ca0362c71fd50e09e2a12de3ae335f9eef02cdf2511e307cb14d8312' };
// Départ : état d'arrivée de l'inscription E3 (proposition E3, manifeste 0a7faa3b…, appliquée sur autorisation)
const DEPART = { 'ETAT-ACTUEL.md': '64f9dd8cc6ff68d3821c95fdd9e6136c099e8b1850b2f59da0cc4ca643760058', 'ROADMAP.md': 'c807602e72fa72550b38dc6a433ebcc898627eefd3671e884ac57007960e0875', [BIL]: '39c9b652a3ef2387080358209f0cd15ea2978c73ac6496fa9d1c8070008a9e32' };
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
for (const p of CIBLES) ok(shaF(root, p) === DEPART[p], 'empreinte de départ (arrivée de l\'inscription E3) : ' + p, shaF(root, p).slice(0, 16));
for (const [p, h] of Object.entries(INSCRITS)) ok(existsSync(join(root, p)) && shaF(root, p) === h, 'document déjà inscrit, inchangé : ' + p, h.slice(0, 16));
ok(shaF(root, SRC) === SRC_SHA, 'proposition de cadrage relue, inchangée : ' + SRC, SRC_SHA.slice(0, 16));
for (const p of NOUVEAUX) ok(!existsSync(join(root, p)), 'document neuf absent : ' + p);
ok(lire(BIL).includes('### 8.129 ') && !lire(BIL).includes('### 8.130 '), 'bilan : §8.129 présent, sans §8.130');
arret();

// --- 2. Versions proposées, en mémoire
dire('--- Versions proposées, en mémoire');
const V = {}; const eol = Object.fromEntries(CIBLES.map((p) => [p, eolDe(lire(p))]));
const ARB = '« J\'accepte le cadrage du volet 3 après relecture par ChatGPT, avec les arbitrages suivants. » « Q1 : OUI. Le périmètre du 2026-10-07 et les arbitrages V1 à V6 font foi. Ne modifie pas les en-têtes historiques à ce stade. » « Q2 : trois livraisons distinctes pour G5, G6 et G4, avec autorisations séparées. » « Q3 : un écart de G2 déjà couvert par une correction retenue est tracé comme « écart observé, déjà couvert par V… ». Il reste visible dans le rapport, mais ne crée pas une correction doublon. » « Q4 : OUI. Retenir G1-a avant les corrections et G1-b après, comme preuve comparative de sortie. » « Q5 : si G4 constate l\'absence de protection des identifiants de SENSE, réaliser le chantier d\'outillage séparé avant l\'application des corrections, sur autorisation distincte. » « Q6 : privilégier un état documentaire stabilisé après PT-1 avant l\'exécution du volet 3. Cela n\'autorise aucun commit ni push. » « Q7 : proposer le cadre de HP-1 à HP-4 avant l\'arbitrage global des corrections. Leur éventuel caractère bloquant pour la clôture devra être décidé explicitement ; ne le présente pas comme une obligation normative déjà existante. » « Q8 : accepter l\'ordre général proposé, avec intégration des cadrages HP-1 à HP-4, QC-1 et QC-2 avant la fixation définitive de la liste des corrections. » « Ces arbitrages ne créent aucune règle linguistique nouvelle. »';
const AUTO = '« Je t\'autorise uniquement à préparer l\'inscription documentaire de ce cadrage arbitré, en conservant la proposition historique et en ajoutant un §0 d\'arbitrage si c\'est cohérent avec la procédure existante. »';
// 2.1 Document neuf : la proposition conservée, statut et §0
{
  const s = LFs(lire(SRC));
  const A = '**Statut** : **proposition, non arbitrée.** Elle cadre l\'exécution du volet 3. Elle n\'exécute aucun contrôle et n\'ouvre ni HP-1 à HP-4, ni QC-1, ni QC-2. Elle ne prépare pas l\'application des 204 corrections retenues. Elle ne crée aucune règle.';
  const B = '**Statut** : **cadrage arbitré le 2026-11-05 (§0).** Il n\'exécute aucun contrôle et n\'ouvre ni HP-1 à HP-4, ni QC-1, ni QC-2. Il ne prépare pas l\'application des 204 corrections retenues. Il ne crée aucune règle, linguistique ou autre.';
  let u = remplacer('cadrage, statut', s, A, B);
  const i = u.search(/^## 1\. /m); ok(i > 0 && !/^## 0\. /m.test(u), 'cadrage : §0 inséré avant le §1');
  const Z = ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-05 (l\'utilisateur, après relecture par ChatGPT ; relayé par l\'utilisateur) : ' + ARB, '',
    'Autorisation d\'inscription (même date) : ' + AUTO, '',
    '**Effets, question par question.**', '',
    '- **Q1** : le périmètre du 2026-10-07 (`docs/rapports/etape2-A2-05-perimetre-controles-globaux.md`) et ses arbitrages V1 à V6 font foi pour l\'exécution du volet 3. Les en-têtes historiques des trois périmètres, qui portent encore « non validé », ne sont pas modifiés (§2.1).',
    '- **Q2** : G5, G6 et G4 sont trois livraisons distinctes, chacune sur une autorisation séparée.',
    '- **Q3** : un écart de G2 déjà couvert par une correction retenue est tracé comme « écart observé, déjà couvert par V… » ; il reste visible dans le rapport et ne crée aucune correction doublon.',
    '- **Q4** : G1-a, avant les corrections, et G1-b, après, sont retenus ; G1-b est une preuve comparative de sortie.',
    '- **Q5** : si G4 constate l\'absence de protection des identifiants de SENSE, le chantier d\'outillage séparé (PT-7) est réalisé **avant l\'application des corrections**, sur autorisation distincte.',
    '- **Q6** : un état documentaire stabilisé après PT-1 est privilégié avant l\'exécution du volet 3. **Cet arbitrage n\'autorise aucun commit ni push** ; PT-1 garde sa propre autorisation.',
    '- **Q7** : le cadre de HP-1 à HP-4 est proposé avant l\'arbitrage global des corrections. Leur éventuel caractère bloquant pour la clôture de l\'étape 2 **sera décidé explicitement** ; il **n\'est pas une obligation normative déjà existante**.',
    '- **Q8** : l\'ordre général du §6 est accepté ; les cadrages de HP-1 à HP-4, de QC-1 et de QC-2 s\'y intègrent **avant la fixation définitive de la liste des corrections**.', '',
    '**Portée.** Ces arbitrages ne créent aucune règle linguistique nouvelle ; aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; aucun contrôle G1 à G7 n\'est commencé ; HP-1 à HP-4, QC-1 et QC-2 ne sont pas examinés ; l\'application des 204 corrections n\'est pas préparée ; l\'étape 2 n\'est pas terminée. Là où ce §0 tranche une question que le texte livré laissait ouverte (§3, G2 et G4 ; §4 ; §6 ; §7 ; §8), c\'est le §0 qui s\'applique. Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée (`' + SRC + '`, SHA-256 `' + SRC_SHA + '`), ses marques [D], [P], [R] et ses questions comprises.'];
  V[NR] = u.slice(0, i) + Z.join('\n') + '\n\n' + u.slice(i);
  const v = V[NR]; const i0 = v.search(/^## 0\. /m), i1 = v.search(/^## 1\. /m), j1 = s.search(/^## 1\. /m); const hs = (x) => x.split('\n').filter((l) => !l.startsWith('**Statut**')).join('\n');
  ok(i0 > 0 && i1 > i0 && v.slice(i1) === s.slice(j1) && hs(v.slice(0, i0)) === hs(s.slice(0, j1)), 'cadrage : texte livré conservé (en-tête hors statut, et tout à partir du §1)');
  const z = v.slice(i0, i1); ok(['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'].every((q) => z.split('**' + q + '**').length === 2), 'cadrage : §0, un effet par question, Q1 à Q8');
  ok(/n'est pas une obligation normative déjà existante/.test(z) && /n'autorise aucun commit ni push/.test(z) && /aucune règle linguistique nouvelle/.test(z) && /l'étape 2 n'est pas terminée/.test(z), 'cadrage : §0, Q7 non normatif, Q6 sans commit ni push, aucune règle nouvelle, étape 2 ouverte');
  ok(v.split(/^## 0\. /m).length === 2 && !v.includes('\r'), 'cadrage : un seul §0, LF');
}
// 2.2 Bilan du volet 2 : §8.130, à la fin
{
  const t = LFs(lire(BIL)); ok(t.endsWith('\n') && !t.endsWith('\n\n'), 'bilan : fin de fichier attendue');
  const P = ['### 8.130 Volet 3 : cadrage des contrôles globaux G1 à G7 arbitré (2026-11-05)', '',
    '**Cadrage arbitré le 2026-11-05** (`' + NR + '`, §0 ; proposition conservée, `' + SRC + '`) : le périmètre du 2026-10-07 et les arbitrages V1 à V6 font foi, en-têtes historiques non modifiés (Q1) ; G5, G6 et G4 en trois livraisons distinctes, sur autorisations séparées (Q2) ; un écart de G2 déjà couvert par une correction retenue est tracé « écart observé, déjà couvert par V… », visible, sans correction doublon (Q3) ; G1-a avant les corrections et G1-b après, preuve comparative de sortie (Q4) ; si G4 constate l\'absence de protection des identifiants de SENSE, chantier d\'outillage séparé avant l\'application des corrections, sur autorisation distincte (Q5) ; état documentaire stabilisé après PT-1 privilégié avant l\'exécution, sans autorisation de commit ni de push (Q6) ; cadre de HP-1 à HP-4 proposé avant l\'arbitrage global des corrections, leur éventuel caractère bloquant pour la clôture à décider explicitement, non présenté comme une obligation normative existante (Q7) ; ordre général accepté, cadrages de HP-1 à HP-4, de QC-1 et de QC-2 intégrés avant la fixation définitive de la liste des corrections (Q8). Ces arbitrages ne créent aucune règle linguistique nouvelle.', '',
    '**Non modifiés.** Données lexicales, normes, lots, journal, registre des tranches, relais, `sync-stable.mjs`, manifeste d\'empreintes (47 entrées), en-têtes des périmètres ; **les 204 corrections retenues restent non appliquées**. **Aucun contrôle G1 à G7 n\'est commencé** ; HP-1 à HP-4, QC-1 et QC-2 ne sont pas examinés. **L\'étape 2 n\'est pas terminée.** Le document neuf de `docs/rapports/` n\'est pas protégé au manifeste d\'empreintes, comme les quatorze inscrits avant lui pour la recherche d\'omissions (limite documentaire suivie séparément). Aucun `git add`, commit ni push.', ''];
  V[BIL] = t + '\n' + P.join('\n');
}
// 2.3 Pilotage : mêmes remplacements dans ETAT-ACTUEL.md et ROADMAP.md
const PA_E3 = 'Le choix de la suite de l\'étape 2, sur arbitrage distinct, après la clôture de la recherche d\'omissions d\'A10 (234 candidats relus sur 234, aucune omission retenue ; 573 sens non relevés, non relus et non vérifiés conformes ; livraison E3 arbitrée, `docs/rapports/etape2-A2-05-omissions-interrogatif-E3.md`, §0 ; bilan de clôture, `docs/rapports/etape2-A2-05-omissions-interrogatif-cloture.md`) : notamment le volet 3 (contrôles globaux G1 à G7), le cadre des vérifications hors périmètre HP-1 à HP-4 et l\'application des 204 corrections retenues, chacun sur autorisation distincte ; l\'étape 2 n\'est pas terminée.';
const PA_V3 = 'Le volet 3 (contrôles globaux G1 à G7) est cadré, cadrage arbitré le 2026-11-05 (`' + NR + '`, §0), aucun contrôle commencé. Ordre retenu, chaque étape sur autorisation distincte : un état documentaire stabilisé après PT-1 (commit de l\'installation d\'A10, ci-après) avant toute exécution du volet 3 ; puis G5, G6 et G4, en trois livraisons distinctes ; puis G1-a (avant les corrections), G3, G2 et G7 ; les cadres de HP-1 à HP-4, de QC-1 et de QC-2, proposés avant l\'arbitrage global et la fixation définitive de la liste des corrections ; si G4 constate l\'absence de protection des identifiants de SENSE, le chantier d\'outillage séparé, avant l\'application des corrections ; puis l\'application des 204 corrections retenues, et G1-b après elle. L\'étape 2 n\'est pas terminée.';
const Q = [
  ['Le **volet 3** (contrôles globaux\n  G1 à G7), non commencé. Puis', 'Le **volet 3** (contrôles globaux\n  G1 à G7) : cadrage arbitré le 2026-11-05 (`' + NR + '`, §0), aucun contrôle commencé. Puis'],
  [PA_E3, PA_V3],
];
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) {
  let t = LFs(lire(p));
  for (const [k, [a, b]] of Q.entries()) t = remplacer(p + ', Q' + (k + 1), t, a, b);
  if (p === 'ROADMAP.md') {
    t = remplacer(p + ', en-tête', t, 'volet 3 non commencé ;', 'volet 3 cadré (cadrage arbitré le 2026-11-05), non commencé ;');
  } else {
    const L = '| 2026-11-05 | 2 · A2-05 | **Volet 3 : cadrage des contrôles globaux G1 à G7 arbitré** (proposition conservée, `' + SRC + '` ; document arbitré `' + NR + '`, §0) : périmètre du 2026-10-07 et V1 à V6 font foi, en-têtes historiques non modifiés (Q1) ; G5, G6, G4 en trois livraisons (Q2) ; écart de G2 déjà couvert tracé « déjà couvert par V… », sans doublon (Q3) ; G1-a et G1-b (Q4) ; protection des identifiants de SENSE, si absente, avant l\'application des corrections (Q5) ; état documentaire stabilisé après PT-1 avant l\'exécution, sans commit ni push (Q6) ; cadre de HP-1 à HP-4 avant l\'arbitrage global, caractère bloquant à décider explicitement, non normatif (Q7) ; ordre accepté, cadrages HP, QC-1 et QC-2 avant la fixation de la liste des corrections (Q8) ; aucune règle linguistique nouvelle ; un document neuf dans `docs/rapports/` ; §8.130. **Aucun contrôle commencé ; 377/377 ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 47 empreintes ; étape 2 non terminée.** | non committé |';
    const t2 = LFs(ajouterLigneJournal(t, L)); ok(t2 !== t && t2.split(L).length === 2 && t2.trimEnd().endsWith(L), 'ETAT-ACTUEL.md : une ligne de journal ajoutée à la fin du journal'); t = t2;
  }
  ok(!/HP-1 à HP-4[^.;]{0,60}(conditionnent|bloquent) la clôture/.test(t), p + ' : aucune formule présentant HP-1 à HP-4 comme bloquantes pour la clôture');
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
  const r = relais(); ok(['C5d', 'C5f', 'C8', 'C9a'].every((c) => r.L.some((l) => new RegExp('^conforme\\s+' + c + ' ').test(l))), 'C5d (chantiers fermés), C5f (prochaine action identique), C8 (reprise simulée) et C9a conformes');
  const emp = cl.lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && emp.out === 'empreintes : 47 rapports contrôlés, identiques', 'empreintes : 47 identiques ; le document neuf n\'est pas un rapport du lot 3', emp.out);
  const cpo = cl.lancer(W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs'); ok(cpo.code === 0 && cpo.out.trim().endsWith('29 conformes sur 29'), 'contrôle du périmètre opérationnel : 29 sur 29');
  const st = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves,empreintes:v.empreintes}))"], { cwd: cl.C, encoding: 'utf8' });
  ok(st.stdout.trim() === '{"arbitres":377,"restants":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"],"empreintes":47}', 'état calculé inchangé : 377/377 ; 204 corrections dans 177 ENTRY ; V1-32 ; réservés V1-22, V1-23 ; 47 empreintes', st.stdout.trim() || st.stderr.trim().slice(0, 200));
  for (const [p, h] of Object.entries(INSCRITS)) ok(shaF(cl.C, p) === h, 'clone : document déjà inscrit, inchangé : ' + p);
  dire('--- Sabotages (chacun rétabli aussitôt)');
  const sabote = (nom, p, fn, attendu) => { const o = readFileSync(cl.f(p)); const m = Buffer.from(fn(o.toString('utf8'))); if (m.equals(o)) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(cl.f(p), m); try { const x = relais(); ok(x.ids.split(',').includes(attendu), nom, 'écarts : ' + x.ids); } finally { writeFileSync(cl.f(p), o); } };
  sabote('S1 prochaine action différente dans ROADMAP.md : C5f', 'ROADMAP.md', (t) => t.replace('en trois livraisons distinctes', 'en une seule livraison'), 'C5f');
  sabote('S2 renvoi .md du cadrage retiré de la prochaine action d\'ETAT-ACTUEL.md : C5f', 'ETAT-ACTUEL.md', (t) => t.replace('cadrage arbitré le 2026-11-05 (`' + NR + '`, §0), aucun contrôle commencé. Ordre', 'cadrage arbitré le 2026-11-05, aucun contrôle commencé. Ordre'), 'C5f');
  sabote('S3 « G1 à G7 » retiré de l\'Étape en cours d\'ETAT-ACTUEL.md : C5d', 'ETAT-ACTUEL.md', (t) => { const a = t.indexOf('## Étape en cours'), b = t.indexOf('**Tâche précédente, terminée'); return t.slice(0, a) + t.slice(a, b).replace(/G1/g, 'Gx') + t.slice(b); }, 'C5d');
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
ok(CIBLES.every((p) => shaF(root, p) === DEPART[p]) && NOUVEAUX.every((p) => !existsSync(join(root, p))), 'dépôt réel : fichiers visés inchangés, document neuf absent');
dire('manifeste de la proposition : ' + shaF(root, PROP + 'manifeste.json'));
writeFileSync(join(root, I + 'sortie-preparation.txt'), trace.join('\n') + '\n' + (ko ? 'préparation NON conforme' : 'préparation conforme') + '\n');
console.log(ko ? 'préparation NON conforme' : 'préparation conforme'); process.exit(ko ? 1 : 0);
