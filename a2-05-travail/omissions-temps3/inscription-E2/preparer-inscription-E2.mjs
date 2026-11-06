// A2-05 · recherche d'omissions d'`interrogatif` : préparation de l'inscription documentaire de l'arbitrage de la livraison E2 (adjectifs) du groupe E, EN PROPOSITION
// (QE-4 : une inscription après chaque livraison arbitrée). Rien n'est appliqué.
// (1) Préconditions sur le dépôt réel (état d'arrivée de l'inscription E1). (2) Versions proposées, en mémoire : ETAT-ACTUEL.md et ROADMAP.md (remplacements ciblés
// à ancre unique), bilan (§8.127 ajouté à la fin) ; un document neuf dans docs/rapports/ : rapport de E2 arbitré (statut et §0 ajoutés ; texte livré conservé, vérifié).
// Le périmètre du groupe E est déjà inscrit (inscription E1) : il n'y a pas de second document neuf. (3) Clone jetable : état final simulé ; relais (C9b seul),
// contrôles, tests ; sabotages. (4) Écriture dans proposition/ si aucun écart. Transposé de preparer-inscription-E1.mjs.
// Usage : node a2-05-travail/omissions-temps3/inscription-E2/preparer-inscription-E2.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', O = W + 'omissions-temps3/', I = O + 'inscription-E2/', PROP = I + 'proposition/';
const { cloner, controler } = await import(pathToFileURL(join(root, W + 'arbitrage-F/essai-clone.mjs')));
const { diffBrut } = await import(pathToFileURL(join(root, W + 'arbitrage-F/moteur-application.mjs')));
const { ajouterLigneJournal } = await import(pathToFileURL(join(root, W + 'sync-stable.mjs')));
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const CIBLES = ['ETAT-ACTUEL.md', 'ROADMAP.md', BIL];
const RN = 'docs/rapports/etape2-A2-05-omissions-interrogatif-', NR = RN + 'E2.md', NOUVEAUX = [NR];
// Documents inscrits avec A, B, C, D et E1 (dont le périmètre de E) : vérifiés inchangés
const INSCRITS = { [RN + 'mesure.md']: '03d5198e9df16ca92fac46c57fde70d9fc4bc9f841b95541fbe3560ed9d19ab1', [RN + 'A-perimetre.md']: 'dedd75d90a5cfe8cfc64f72ec00274f49262d1a8290211b51844a1ff208e9afd', [RN + 'A.md']: 'e5e168e3c4cacf8ee8b77b8978965ec3cda7ef5a81acebb3089653d6d50c2b6b',
  [RN + 'B-perimetre.md']: 'db3f97e46a474e2cde425702aa38aae93e6dea5ade910b3007c535ead4e05b93', [RN + 'B.md']: '8eb0180a7e078e392ef4da678f345d4e9efef6f37e21ec3deb1f3eda8223a2fc',
  [RN + 'C-perimetre.md']: '3f472e572c0cbf0ff4c252fc89293e34379129412ce2af96e140de05a474b5e8', [RN + 'C.md']: '726c4a3e711a065328f42a5659123c1ce0bf4bf94d01b17da14b8be651ad5e23',
  [RN + 'D-perimetre.md']: 'e057ddda41e0ed076b6e8c4d49d27477e210064484ca3942aa01bb402ecee790', [RN + 'D.md']: '65764bb97d892a9e4731aab0f7ec70f42e7a00e6794f18c1d3690f1e146c1993',
  [RN + 'E-perimetre.md']: '755b872f9489dd97976b04a73666c14893349628ae4e7668515d4b107d9b3e5b', [RN + 'E1.md']: 'c5d51e50ab8be700d3b573fe154ddb1bec5e6284988a5f4833b5bcfb67ac0b05' };
// Départ : état d'arrivée de l'inscription E1 (proposition E1, manifeste 0be3ff06…, appliquée sur autorisation)
const DEPART = { 'ETAT-ACTUEL.md': '9c2129588c152c7200ba6febb9e00bec6974e095a8a715720e069f7587e2e4e3', 'ROADMAP.md': '6a0bd195a8ad36dac42281015d9c14289ed7eedd49a1c2b7155e4cf1603faac4', [BIL]: '2724a3c930081dd39d80951ad37003b65b69bfa3e0b3c3b50d87e5eb319599be' };
const SOURCES = { [O + 'rapport-relecture-E2.md']: 'e50df7ba16a54827fd755f8ee22f22dbacdf06b226fa4f6416493f0eebd96964', [O + 'analyse-E2.json']: '172d18c0243b5e3827f2b7f4d5fc2c4f6e85bfd9494fde6c17793bb14b942b41',
  [O + 'fiches-E2.md']: '3498dd3acada3115c8ceea2d2319d28c5c9222453f42d0cb29bc5f65d92980de', [O + 'perimetre-E.json']: '0f4682d8b00a2d3befb2581a0f74cbc0bfe3eacb9a5f8a2e3a578f032c0539b5',
  [O + 'dossier-E.md']: '1a141ac195c3c39dfe3435b7d94722175385b78e29a5faa7ebd35b4ee5b33d60', [O + 'decoupage.json']: '56da6952d14259325eefee43cbfe0f2bb7cc6a5060a85e72f2df6c1ad97acc46' };
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
for (const p of CIBLES) ok(shaF(root, p) === DEPART[p], 'empreinte de départ (arrivée de l\'inscription E1) : ' + p, shaF(root, p).slice(0, 16));
for (const [p, h] of Object.entries(INSCRITS)) ok(existsSync(join(root, p)) && shaF(root, p) === h, 'document inscrit avec A, B, C, D ou E1, inchangé : ' + p, h.slice(0, 16));
for (const [p, h] of Object.entries(SOURCES)) ok(shaF(root, p) === h, 'source relue et arbitrée, inchangée : ' + p, h.slice(0, 16));
for (const p of NOUVEAUX) ok(!existsSync(join(root, p)), 'document neuf absent : ' + p);
ok(lire(BIL).includes('### 8.126 ') && !lire(BIL).includes('### 8.127 '), 'bilan : §8.126 présent, sans §8.127');
ok(lire('ROADMAP.md').split('**Dernière mise à jour :** 2026-11-05 (').length === 2, 'ROADMAP.md : date de l\'en-tête déjà au 2026-11-05, non remplacée');
arret();

// --- 2. Versions proposées, en mémoire
dire('--- Versions proposées, en mémoire');
const V = {}; const eol = Object.fromEntries(CIBLES.map((p) => [p, eolDe(lire(p))]));
const AVANT_1 = (t) => t.search(/^## 1\. /m);
const insererZero = (nom, t, statutAvant, statutApres, zero) => { let u = remplacer(nom + ', statut', t, statutAvant, statutApres); const i = AVANT_1(u); ok(i > 0 && !/^## 0\. /m.test(u), nom + ' : §0 inséré avant le §1'); return u.slice(0, i) + zero.join('\n') + '\n\n' + u.slice(i); };
const conserve = (nom, v, src) => { const s = LFs(lire(src)); const i0 = v.search(/^## 0\. /m), i1 = v.search(/^## 1\. /m), j1 = s.search(/^## 1\. /m); const hs = (x) => x.split('\n').filter((l) => !l.startsWith('**Statut**')).join('\n');
  ok(i0 > 0 && i1 > i0 && v.slice(i1) === s.slice(j1) && hs(v.slice(0, i0)) === hs(s.slice(0, j1)), nom + ' : texte livré conservé (en-tête hors statut, et tout à partir du §1)', src); };
// 2.1 Rapport de E2 arbitré
V[NR] = insererZero('rapport E2', LFs(lire(O + 'rapport-relecture-E2.md')),
  "**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est appliquée. E3 n'est pas commencée.",
  "**Statut** : **arbitré le 2026-11-05 (§0).** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est retenue. E3 n'est pas commencée.",
  ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-05 (l\'utilisateur, qui accepte les recommandations de ChatGPT ; relayé par l\'utilisateur) : « J\'accepte les recommandations de ChatGPT concernant la relecture E2. » « 1. Je valide les 30 conclusions « ne relève pas de la fonction interrogatif » : 17 adjectifs en i et 13 adjectifs en na. » « 2. Aucune omission n\'est retenue et aucun sens ne reste à arbitrer dans E2. » « 3. Je confirme l\'analyse des douze phrases du §2.1 : les six énoncés en ね, les trois questions en どう et les trois questions fermées en か. » « 4. Je confirme la distinction entre le contenu vérifié et le porteur de la fonction, particulièrement pour いい et 大丈夫. » « 5. Je confirme les quatre points du §3.4, sans contradiction retenue avec A10 ni réouverture des décisions historiques. » « 6. Les neuf sens non candidats restent hors des conclusions de E2. » « 7. Les six observations éditoriales sont conservées sans correction à ce stade. » « Les 84 décisions historiques, les 30 verdicts du volet 2 et les dix corrections retenues concernant E2 restent inchangés. »', '',
    '**Effets.** 30 sens arbitrés « ne relève pas de la fonction » (a adjectifs en i 17, b adjectifs en na 13 ; les groupes de lecture n\'ont aucune valeur de décision) ; aucune omission retenue, aucune décision nouvelle, aucune donnée modifiée. L\'analyse des douze phrases du §2.1 est confirmée : six énoncés en ね, qui soumettent une assertion à l\'accord ; trois questions ouvertes, où どう tient la place de l\'appréciation et où l\'adjectif est dans la réponse ; trois questions fermées en か, où l\'adjectif est le contenu soumis à confirmation, ou la réponse. **La distinction entre le contenu vérifié et le porteur de la fonction** (§3.2) est confirmée, particulièrement pour いい et 大丈夫 : dans « 体は大丈夫ですか », 大丈夫 est le contenu vérifié, et か porte l\'interrogation. Les quatre points du §3.4 sont confirmés, sans contradiction avec A10 ni réouverture des décisions historiques. Les neuf sens non candidats des ENTRY relues (§3.3) restent hors des conclusions et ne sont pas vérifiés conformes. Les six observations éditoriales du §7 sont conservées sans correction à ce stade. Les 84 décisions historiques, les 30 verdicts du volet 2 et les 10 corrections retenues concernant E2 restent inchangés. La recherche d\'omissions compte 182 sens relus sur 234 candidats (A 39, B 18, C 3, D 53, E1 39, E2 30) ; 52 restent, dans la livraison E3 (verbes : 52 sens, 43 ENTRY), à ouvrir sur autorisation distincte ; ce décompte reste séparé des 377 sens du lot 3 et du contrôle des 17 porteurs. Le recueil des 31 fiches sources est dans `' + O + 'fiches-E2.md` (SHA-256 `' + SOURCES[O + 'fiches-E2.md'] + '`) ; les analyses, dans `' + O + 'analyse-E2.json` (SHA-256 `' + SOURCES[O + 'analyse-E2.json'] + '`). Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée.']);
conserve('rapport E2', V[NR], O + 'rapport-relecture-E2.md');
// 2.2 Bilan : §8.127, à la fin
{
  const t = LFs(lire(BIL)); ok(t.endsWith('\n') && !t.endsWith('\n\n'), 'bilan : fin de fichier attendue');
  const P = ['### 8.127 Recherche d\'omissions d\'`interrogatif` (A10, §8) : livraison E2 du groupe E arbitrée (2026-11-05)', '',
    '**Livraison E2 arbitrée le 2026-11-05** (`docs/rapports/etape2-A2-05-omissions-interrogatif-E2.md`, §0 ; périmètre du groupe E, `docs/rapports/etape2-A2-05-omissions-interrogatif-E-perimetre.md`, §0) : les 30 sens adjectivaux de 27 ENTRY, relus sur leurs 31 fiches entières (les fiches fusionnées de いい, きれい, 弱い et 大変 comprises), leurs 93 anciens exemples, leurs ENTRY publiées, les 84 décisions et les 10 corrections retenues, selon la grille R1 à R5 ; **30 « ne relève pas de la fonction » (adjectifs en i 17, adjectifs en na 13), aucune omission retenue, aucun sens à arbitrer**. La catégorie nulle ne décide pas (A10, §3, point 2 ; §5). **Les douze phrases du §2.1** : six énoncés en ね, trois questions ouvertes en どう, trois questions fermées en か. **La distinction entre le contenu vérifié et le porteur de la fonction** (§3.2) est confirmée, particulièrement pour いい et 大丈夫. Les quatre points du §3.4 sont confirmés, sans contradiction avec A10 ni réouverture des décisions historiques ; les neuf sens non candidats restent hors des conclusions ; les six observations éditoriales du §7 sont conservées sans correction. Les 84 décisions historiques, les 30 verdicts du volet 2 et les 10 corrections retenues concernant E2 restent inchangés.', '',
    '**Décomptes séparés.** Recherche d\'omissions : 182 relus sur 234 candidats (A 39, B 18, C 3, D 53, E1 39, E2 30) ; 52 restent (E3) ; 573 non relevés, non relus. Ces décomptes ne s\'additionnent ni aux 377 sens du lot 3 ni au contrôle des 17 porteurs.', '',
    '**Non modifiés.** Données lexicales, normes, lots, journal, registre des tranches, relais, `sync-stable.mjs`, manifeste d\'empreintes (47 entrées) ; aucune correction appliquée. Le document neuf de `docs/rapports/` n\'est pas protégé au manifeste d\'empreintes, comme les onze inscrits avec les groupes A à D et la livraison E1 (limite documentaire suivie séparément). E3 n\'est pas commencée. Aucun `git add`, commit ni push.', ''];
  V[BIL] = t + '\n' + P.join('\n');
}
// 2.3 Pilotage : mêmes remplacements dans ETAT-ACTUEL.md et ROADMAP.md
const PA_E2 = 'L\'ouverture de la relecture de la livraison E3 de la recherche d\'omissions d\'A10 (52 sens, 43 ENTRY, verbes ; périmètre du groupe E accepté, `docs/rapports/etape2-A2-05-omissions-interrogatif-E-perimetre.md`, §0 ; livraison E2 arbitrée, `docs/rapports/etape2-A2-05-omissions-interrogatif-E2.md`, §0), sur autorisation distincte après vérification de l\'inscription de E2, puis l\'inscription de son arbitrage ; la recherche reste distincte des 377.';
const Q = [
  ['**groupes A, B et C arbitrés le\n  2026-11-04, groupe D et livraison E1 du groupe E le 2026-11-05** (152 sens : A 39, B 18, C 3, D 53, E1 39 ; aucune omission retenue) ; périmètre du groupe E accepté, en trois livraisons par classe (E1 noms, E2 adjectifs, E3 verbes), chacune inscrite après son arbitrage ; 82 candidats restent, dans E2 (30) et E3 (52) ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122 à §8.126).',
    '**groupes A, B et C arbitrés le\n  2026-11-04, groupe D et livraisons E1 et E2 du groupe E le 2026-11-05** (182 sens : A 39, B 18, C 3, D 53, E1 39, E2 30 ; aucune omission retenue) ; périmètre du groupe E accepté, en trois livraisons par classe (E1 noms, E2 adjectifs, E3 verbes), chacune inscrite après son arbitrage ; 52 candidats restent, dans E3 ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122 à §8.127).'],
  ['L\'ouverture de la relecture de la livraison E2 de la recherche d\'omissions d\'A10 (30 sens, 27 ENTRY, adjectifs ; périmètre du groupe E accepté, `docs/rapports/etape2-A2-05-omissions-interrogatif-E-perimetre.md`, §0 ; livraison E1 arbitrée, `docs/rapports/etape2-A2-05-omissions-interrogatif-E1.md`, §0), sur autorisation distincte après vérification de l\'inscription de E1, puis l\'inscription de son arbitrage ; puis, de même, la livraison E3 (52 sens, 43 ENTRY, verbes) ; la recherche reste distincte des 377.', PA_E2],
];
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) {
  let t = LFs(lire(p));
  for (const [k, [a, b]] of Q.entries()) t = remplacer(p + ', Q' + (k + 1), t, a, b);
  if (p === 'ROADMAP.md') {
    t = remplacer(p + ', en-tête', t, 'groupes A, B et C arbitrés le 2026-11-04, groupe D et livraison E1 du groupe E le 2026-11-05 ;', 'groupes A, B et C arbitrés le 2026-11-04, groupe D et livraisons E1 et E2 du groupe E le 2026-11-05 ;');
  } else {
    const L = '| 2026-11-05 | 2 · A2-05 | **Recherche d\'omissions d\'A10 : livraison E2 du groupe E relue et arbitrée** (30 sens adjectivaux, 27 ENTRY, thème T2-nuls, toutes catégories nulles ; groupes de lecture a adjectifs en i 17, b adjectifs en na 13 ; 30 « ne relève pas de la fonction », aucune omission retenue, aucun à arbitrer) ; douze phrases en forme de question confirmées (six énoncés en ね, trois questions en どう, trois questions fermées en か) ; contenu vérifié et porteur de la fonction distingués, notamment pour いい et 大丈夫 ; quatre points du §3.4 confirmés sans contradiction avec A10 ; neuf sens non candidats hors des conclusions ; six observations éditoriales conservées sans correction ; décisions historiques, verdicts du volet 2 et corrections retenues inchangés ; 182 relus sur 234, 52 restent (E3) ; un document neuf dans `docs/rapports/` ; §8.127. **377/377 ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 47 empreintes.** | non committé |';
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
  const emp = cl.lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && emp.out === 'empreintes : 47 rapports contrôlés, identiques', 'empreintes : 47 identiques ; le document neuf n\'est pas un rapport du lot 3', emp.out);
  const cpo = cl.lancer(W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs'); ok(cpo.code === 0 && cpo.out.trim().endsWith('29 conformes sur 29'), 'contrôle du périmètre opérationnel : 29 sur 29');
  const st = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves,empreintes:v.empreintes}))"], { cwd: cl.C, encoding: 'utf8' });
  ok(st.stdout.trim() === '{"arbitres":377,"restants":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"],"empreintes":47}', 'état calculé inchangé : 377/377 ; 204 corrections dans 177 ENTRY ; V1-32 ; réservés V1-22, V1-23 ; 47 empreintes', st.stdout.trim() || st.stderr.trim().slice(0, 200));
  for (const p of NOUVEAUX) { const t = readFileSync(cl.f(p), 'utf8'); ok(!t.includes('\r') && /^## 0\. /m.test(t) && t.split(/^## 0\. /m).length === 2, 'document neuf : LF, un seul §0 : ' + p); }
  for (const [p, h] of Object.entries(INSCRITS)) ok(shaF(cl.C, p) === h, 'clone : document inscrit avec A, B, C, D ou E1, inchangé : ' + p);
  dire('--- Sabotages (chacun rétabli aussitôt)');
  const sabote = (nom, p, fn, attendu) => { const o = readFileSync(cl.f(p)); const m = Buffer.from(fn(o.toString('utf8'))); if (m.equals(o)) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(cl.f(p), m); try { const x = relais(); ok(x.ids.split(',').includes(attendu), nom, 'écarts : ' + x.ids); } finally { writeFileSync(cl.f(p), o); } };
  sabote('S1 prochaine action différente dans ROADMAP.md : C5f', 'ROADMAP.md', (t) => t.replace('puis l\'inscription de son arbitrage', 'puis la clôture de son arbitrage'), 'C5f');
  sabote('S2 renvoi .md retiré de la prochaine action d\'ETAT-ACTUEL.md : C5f', 'ETAT-ACTUEL.md', (t) => t.replace('`docs/rapports/etape2-A2-05-omissions-interrogatif-E2.md`, §0', 'rapport de la livraison E2, §0'), 'C5f');
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
