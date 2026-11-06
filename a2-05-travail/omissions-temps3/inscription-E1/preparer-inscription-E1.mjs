// A2-05 · recherche d'omissions d'`interrogatif` : préparation de l'inscription documentaire (1) du périmètre du groupe E accepté (QE-1 à QE-5 : organisation en
// trois livraisons E1, E2, E3, une inscription après chaque livraison arbitrée) et (2) de l'arbitrage de la livraison E1, EN PROPOSITION. Rien n'est appliqué.
// (1) Préconditions sur le dépôt réel (état d'arrivée de l'inscription D). (2) Versions proposées, en mémoire : ETAT-ACTUEL.md et ROADMAP.md (remplacements ciblés
// à ancre unique), bilan (§8.126 ajouté à la fin) ; deux documents neufs dans docs/rapports/ : périmètre de E accepté, rapport de E1 arbitré (statut et §0 ajoutés ;
// texte livré conservé, vérifié). (3) Clone jetable : état final simulé ; relais (C9b seul), contrôles, tests ; sabotages. (4) Écriture dans proposition/ si aucun écart.
// Transposé de preparer-inscription-D.mjs : chemins, empreintes de départ (arrivée de l'inscription D), sources de E et E1, textes, sabotages ; la date de ROADMAP.md
// est déjà au 2026-11-05 (vérifiée, non remplacée) ; contrôle ajouté : le texte livré est conservé dans les deux documents neufs, hors statut et §0.
// Usage : node a2-05-travail/omissions-temps3/inscription-E1/preparer-inscription-E1.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', O = W + 'omissions-temps3/', I = O + 'inscription-E1/', PROP = I + 'proposition/';
const { cloner, controler } = await import(pathToFileURL(join(root, W + 'arbitrage-F/essai-clone.mjs')));
const { diffBrut } = await import(pathToFileURL(join(root, W + 'arbitrage-F/moteur-application.mjs')));
const { ajouterLigneJournal } = await import(pathToFileURL(join(root, W + 'sync-stable.mjs')));
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const CIBLES = ['ETAT-ACTUEL.md', 'ROADMAP.md', BIL];
const RN = 'docs/rapports/etape2-A2-05-omissions-interrogatif-', NP = RN + 'E-perimetre.md', NR = RN + 'E1.md', NOUVEAUX = [NP, NR];
// Documents inscrits avec A, B, C et D : vérifiés inchangés
const INSCRITS = { [RN + 'mesure.md']: '03d5198e9df16ca92fac46c57fde70d9fc4bc9f841b95541fbe3560ed9d19ab1', [RN + 'A-perimetre.md']: 'dedd75d90a5cfe8cfc64f72ec00274f49262d1a8290211b51844a1ff208e9afd', [RN + 'A.md']: 'e5e168e3c4cacf8ee8b77b8978965ec3cda7ef5a81acebb3089653d6d50c2b6b',
  [RN + 'B-perimetre.md']: 'db3f97e46a474e2cde425702aa38aae93e6dea5ade910b3007c535ead4e05b93', [RN + 'B.md']: '8eb0180a7e078e392ef4da678f345d4e9efef6f37e21ec3deb1f3eda8223a2fc',
  [RN + 'C-perimetre.md']: '3f472e572c0cbf0ff4c252fc89293e34379129412ce2af96e140de05a474b5e8', [RN + 'C.md']: '726c4a3e711a065328f42a5659123c1ce0bf4bf94d01b17da14b8be651ad5e23',
  [RN + 'D-perimetre.md']: 'e057ddda41e0ed076b6e8c4d49d27477e210064484ca3942aa01bb402ecee790', [RN + 'D.md']: '65764bb97d892a9e4731aab0f7ec70f42e7a00e6794f18c1d3690f1e146c1993' };
// Départ : état d'arrivée de l'inscription D (proposition D, manifeste 504ff445…, appliquée sur autorisation)
const DEPART = { 'ETAT-ACTUEL.md': '2c391690e59279fa6fc6d15a96b4e8cb0382f0e2c381c4260840c40813bc4799', 'ROADMAP.md': '96707f7c67d9202a489ec42966e4bc5c467ead7255f754f88e9e90e998a37597', [BIL]: '8b27875c38b86693c8810f66c0a6b7a9529697e8ac56ba760f9dd3cd23bb3184' };
const SOURCES = { [O + 'proposition-perimetre-E.md']: '9e5ad01276f377a2b0b61d699f0293ba9f9e764260a373ce2c54d4b41acf2b26', [O + 'perimetre-E.json']: '0f4682d8b00a2d3befb2581a0f74cbc0bfe3eacb9a5f8a2e3a578f032c0539b5',
  [O + 'dossier-E.md']: '1a141ac195c3c39dfe3435b7d94722175385b78e29a5faa7ebd35b4ee5b33d60', [O + 'rapport-relecture-E1.md']: '8ff7352713317ed23f07e355c7a3691992bc54e8c1d7d7bf0391f4911859910e',
  [O + 'analyse-E1.json']: 'af7c714ad9ea2e9ef83ed556cd649b2952551de718b9f61d6ff187460d9be4d7', [O + 'fiches-E1.md']: 'cea71235bfa7df480914ac0c7893307a94ffd43357a46fd5a27332ab6c4f8a3e', [O + 'decoupage.json']: '56da6952d14259325eefee43cbfe0f2bb7cc6a5060a85e72f2df6c1ad97acc46' };
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
for (const p of CIBLES) ok(shaF(root, p) === DEPART[p], 'empreinte de départ (arrivée de l\'inscription D) : ' + p, shaF(root, p).slice(0, 16));
for (const [p, h] of Object.entries(INSCRITS)) ok(existsSync(join(root, p)) && shaF(root, p) === h, 'document inscrit avec A, B, C ou D, inchangé : ' + p, h.slice(0, 16));
for (const [p, h] of Object.entries(SOURCES)) ok(shaF(root, p) === h, 'source relue et arbitrée, inchangée : ' + p, h.slice(0, 16));
for (const p of NOUVEAUX) ok(!existsSync(join(root, p)), 'document neuf absent : ' + p);
ok(lire(BIL).includes('### 8.125 ') && !lire(BIL).includes('### 8.126 '), 'bilan : §8.125 présent, sans §8.126');
ok(lire('ROADMAP.md').split('**Dernière mise à jour :** 2026-11-05 (').length === 2, 'ROADMAP.md : date de l\'en-tête déjà au 2026-11-05, non remplacée');
arret();

// --- 2. Versions proposées, en mémoire
dire('--- Versions proposées, en mémoire');
const V = {}; const eol = Object.fromEntries(CIBLES.map((p) => [p, eolDe(lire(p))]));
const AVANT_1 = (t) => t.search(/^## 1\. /m);
const insererZero = (nom, t, statutAvant, statutApres, zero) => { let u = remplacer(nom + ', statut', t, statutAvant, statutApres); const i = AVANT_1(u); ok(i > 0 && !/^## 0\. /m.test(u), nom + ' : §0 inséré avant le §1'); return u.slice(0, i) + zero.join('\n') + '\n\n' + u.slice(i); };
// Le texte livré est conservé : à partir du §1, identique ; avant le §0, identique hors de la ligne de statut
const conserve = (nom, v, src) => { const s = LFs(lire(src)); const i0 = v.search(/^## 0\. /m), i1 = v.search(/^## 1\. /m), j1 = s.search(/^## 1\. /m); const hs = (x) => x.split('\n').filter((l) => !l.startsWith('**Statut**')).join('\n');
  ok(i0 > 0 && i1 > i0 && v.slice(i1) === s.slice(j1) && hs(v.slice(0, i0)) === hs(s.slice(0, j1)), nom + ' : texte livré conservé (en-tête hors statut, et tout à partir du §1)', src); };
// 2.1 Périmètre de E accepté (QE-1 à QE-4 ; QE-5)
V[NP] = insererZero('périmètre E', LFs(lire(O + 'proposition-perimetre-E.md')),
  "**Statut** : **proposition, non arbitrée.** Aucun sens du groupe E n'est relu, aucun verdict lexical n'est pris, aucune donnée n'est modifiée.",
  "**Statut** : **périmètre accepté le 2026-11-05 (§0).** La proposition est conservée telle qu'elle a été livrée ; aucune donnée n'est modifiée. L'organisation retenue pour l'inscription (QE-4) diffère de celle proposée au §4 : le §0 fait foi.",
  ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-05 (l\'utilisateur, qui accepte les recommandations de ChatGPT ; relayé par l\'utilisateur) : « QE-1 : OUI — périmètre accepté, 121 sens dans 107 ENTRY, thème T2-nuls. » « QE-2 : OUI — trois livraisons par classe : E1, 39 sens dans 37 ENTRY ; E2, 30 sens dans 27 ENTRY ; E3, 52 sens dans 43 ENTRY. » « QE-3 : OUI — méthode R1 à R5, trois conclusions possibles, sources intégrales et décisions historiques citées sans être rouvertes. » « QE-4 : je retiens une inscription documentaire après chaque livraison arbitrée, avec préparation, relecture et autorisation d\'application distinctes. » « Aucun verdict lexical sur E pour le moment. » L\'ouverture de la relecture de E1 (QE-5) a été réservée jusqu\'à la vérification de l\'application de l\'inscription du groupe D, puis autorisée distinctement : « QE-5 : OUI. J\'autorise l\'ouverture de la relecture lexicale de E1, strictement limitée aux 39 sens nominaux dans 37 ENTRY du périmètre E déjà accepté. » « Ne commence pas E2 ni E3. » (Citation de QE-4 normalisée sur un seul caractère : dans le message relayé, le dernier « e » de « arbitrée » est la lettre cyrillique U+0435.)', '',
    '**Effets.** Le périmètre du groupe E (121 sens, 107 ENTRY, thème T2-nuls) et sa méthode (grille R1 à R5, trois conclusions possibles, fiches sources intégrales, décisions historiques et verdicts du volet 2 cités sans être rouverts) sont acceptés. **Organisation** : trois livraisons par classe de l\'ENTRY, dans l\'ordre E1 (noms : 39 sens, 37 ENTRY), E2 (adjectifs en i et en na : 30 sens, 27 ENTRY), E3 (verbes : 52 sens, 43 ENTRY) ; aucune ENTRY n\'est partagée entre deux livraisons ; chaque livraison s\'ouvre sur une autorisation distincte (QE-5 pour E1 ; E2 et E3, chacune la sienne). **Inscription (QE-4)** : une inscription documentaire après chaque livraison arbitrée, chacune avec sa préparation, sa relecture et son autorisation d\'application distinctes ; c\'est l\'« autre voie possible » du §4, et non l\'inscription unique après E3 qui y est proposée. Ce §0 ne modifie pas la portée des arbitrages : il les enregistre. Les annexes citées sont dans le dossier de travail `' + O + '` : `dossier-E.md` (SHA-256 `' + SOURCES[O + 'dossier-E.md'] + '`) et `perimetre-E.json` (SHA-256 `' + SOURCES[O + 'perimetre-E.json'] + '`). Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée.']);
conserve('périmètre E', V[NP], O + 'proposition-perimetre-E.md');
// 2.2 Rapport de E1 arbitré
V[NR] = insererZero('rapport E1', LFs(lire(O + 'rapport-relecture-E1.md')),
  "**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est appliquée. E2 et E3 ne sont pas commencées.",
  "**Statut** : **arbitré le 2026-11-05 (§0).** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est retenue. E2 et E3 ne sont pas commencées.",
  ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-05 (l\'utilisateur, après avis favorable de ChatGPT ; relayé par l\'utilisateur) : « J\'accepte les conclusions de la relecture E1 après avis favorable de ChatGPT. » « 1. Les 39 sens de E1 sont confirmés « ne relève pas de la fonction interrogatif » : 15 dans le groupe a, 6 dans b, 7 dans c et 11 dans d. » « 2. Aucune omission n\'est retenue et aucun sens ne reste à arbitrer dans E1. » « 3. Je confirme le relevé et l\'analyse des 15 phrases du §2.1, dont l\'interrogation indirecte de 表. » « 4. Je confirme la distinction du §3.2 entre fonction interrogative, information désignée et information demandée, notamment pour les noms de personne et 意味. » « 5. Je confirme les constats du §3.4, sans contradiction retenue avec A10 et sans réécriture des décisions historiques. » « 6. Les cinq sens non candidats restent hors des conclusions. » « 7. Les sept observations éditoriales du §9 sont conservées sans correction à ce stade. » « Les 39 verdicts du volet 2, les 101 décisions historiques et les 22 corrections retenues concernant E1 restent inchangés. »', '',
    '**Effets.** 39 sens arbitrés « ne relève pas de la fonction » (a 15, b 6, c 7, d 11 ; les groupes de lecture n\'ont aucune valeur de décision) ; aucune omission retenue, aucune décision nouvelle, aucune donnée modifiée. Le relevé et l\'analyse des 15 phrases du §2.1 sont confirmés (les 14 phrases en forme de question et l\'interrogation indirecte de 表) : l\'inconnu y est tenu par un mot qui porte déjà la fonction ou par une marque grammaticale. La distinction du §3.2 entre fonction interrogative, information désignée et information demandée est confirmée, notamment pour les noms de personne et pour 意味. Les constats du §3.4 sont confirmés, sans contradiction avec A10 ni réécriture des décisions historiques. Les cinq sens non candidats des ENTRY relues (§3.3) restent hors des conclusions et ne sont pas vérifiés conformes. Les sept observations éditoriales du §9 sont conservées sans correction à ce stade. Les 39 verdicts du volet 2, les 101 décisions historiques et les 22 corrections retenues concernant E1 restent inchangés. La recherche d\'omissions compte 152 sens relus sur 234 candidats (A 39, B 18, C 3, D 53, E1 39) ; 82 restent, dans E2 (30 sens, 27 ENTRY) et E3 (52 sens, 43 ENTRY), chacune à ouvrir sur autorisation distincte ; ce décompte reste séparé des 377 sens du lot 3 et du contrôle des 17 porteurs. Le recueil des 39 fiches sources est dans `' + O + 'fiches-E1.md` (SHA-256 `' + SOURCES[O + 'fiches-E1.md'] + '`) ; les analyses, dans `' + O + 'analyse-E1.json` (SHA-256 `' + SOURCES[O + 'analyse-E1.json'] + '`). Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée.']);
conserve('rapport E1', V[NR], O + 'rapport-relecture-E1.md');
// 2.3 Bilan : §8.126, à la fin
{
  const t = LFs(lire(BIL)); ok(t.endsWith('\n') && !t.endsWith('\n\n'), 'bilan : fin de fichier attendue');
  const P = ['### 8.126 Recherche d\'omissions d\'`interrogatif` (A10, §8) : périmètre du groupe E accepté, livraison E1 arbitrée (2026-11-05)', '',
    '**Périmètre du groupe E.** 121 sens dans 107 ENTRY, thème T2-nuls (sens sans catégorie ou sans type, et sans aucune fonction ; le `null` ne présume rien de la fonction) ; accepté le 2026-11-05 avec sa méthode (grille R1 à R5, trois conclusions possibles, fiches sources intégrales, décisions historiques et verdicts du volet 2 cités sans être rouverts ; QE-1, QE-3). **Organisation (QE-2)** : trois livraisons par classe de l\'ENTRY, dans l\'ordre E1 (noms : 39 sens, 37 ENTRY), E2 (adjectifs : 30 sens, 27 ENTRY), E3 (verbes : 52 sens, 43 ENTRY), chacune ouverte sur une autorisation distincte. **Inscription (QE-4)** : une inscription documentaire après chaque livraison arbitrée, avec préparation, relecture et autorisation d\'application distinctes, et non l\'inscription unique après E3 proposée au §4 du périmètre (`docs/rapports/etape2-A2-05-omissions-interrogatif-E-perimetre.md`, §0).', '',
    '**Livraison E1 arbitrée le 2026-11-05** (`docs/rapports/etape2-A2-05-omissions-interrogatif-E1.md`, §0 ; ouverte par QE-5) : les 39 sens nominaux, relus sur leurs 39 fiches entières (les fiches fusionnées de お腹 et de キロ comprises), leurs 117 anciens exemples, leurs 37 ENTRY publiées, les 101 décisions et les 22 corrections retenues, selon la grille R1 à R5 ; **39 « ne relève pas de la fonction » (groupes de lecture a 15, b 6, c 7, d 11), aucune omission retenue, aucun sens à arbitrer**. La valeur nulle ne décide pas (A10, §3, point 2 ; §5). **Les 15 phrases du §2.1** (14 en forme de question, et l\'interrogation indirecte de 表) : l\'inconnu y est tenu par un mot qui porte déjà la fonction ou par une marque grammaticale. **La distinction entre fonction interrogative, information désignée et information demandée** (§3.2) est confirmée, notamment pour les noms de personne et pour 意味. Les constats du §3.4 sont confirmés, sans contradiction avec A10 ni réécriture des décisions historiques ; les cinq sens non candidats restent hors des conclusions ; les sept observations éditoriales du §9 sont conservées sans correction. Les 39 verdicts du volet 2, les 101 décisions et les 22 corrections retenues concernant E1 restent inchangés.', '',
    '**Décomptes séparés.** Recherche d\'omissions : 152 relus sur 234 candidats (A 39, B 18, C 3, D 53, E1 39) ; 82 restent (E2 30, E3 52) ; 573 non relevés, non relus. Ces décomptes ne s\'additionnent ni aux 377 sens du lot 3 ni au contrôle des 17 porteurs.', '',
    '**Non modifiés.** Données lexicales, normes, lots, journal, registre des tranches, relais, `sync-stable.mjs`, manifeste d\'empreintes (47 entrées) ; aucune correction appliquée. Les deux documents neufs de `docs/rapports/` ne sont pas protégés au manifeste d\'empreintes, comme les neuf inscrits avec les groupes A à D (limite documentaire suivie séparément). E2 et E3 ne sont pas commencées. Aucun `git add`, commit ni push.', ''];
  V[BIL] = t + '\n' + P.join('\n');
}
// 2.4 Pilotage : mêmes remplacements dans ETAT-ACTUEL.md et ROADMAP.md
const PA_E1 = 'L\'ouverture de la relecture de la livraison E2 de la recherche d\'omissions d\'A10 (30 sens, 27 ENTRY, adjectifs ; périmètre du groupe E accepté, `docs/rapports/etape2-A2-05-omissions-interrogatif-E-perimetre.md`, §0 ; livraison E1 arbitrée, `docs/rapports/etape2-A2-05-omissions-interrogatif-E1.md`, §0), sur autorisation distincte après vérification de l\'inscription de E1, puis l\'inscription de son arbitrage ; puis, de même, la livraison E3 (52 sens, 43 ENTRY, verbes) ; la recherche reste distincte des 377.';
const Q = [
  ['**groupes A, B et C arbitrés le\n  2026-11-04, groupe D le 2026-11-05** (113 sens : A 39, B 18, C 3, D 53 ; aucune omission retenue) ; 121 candidats restent, dans le groupe E ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122 à §8.125).',
    '**groupes A, B et C arbitrés le\n  2026-11-04, groupe D et livraison E1 du groupe E le 2026-11-05** (152 sens : A 39, B 18, C 3, D 53, E1 39 ; aucune omission retenue) ; périmètre du groupe E accepté, en trois livraisons par classe (E1 noms, E2 adjectifs, E3 verbes), chacune inscrite après son arbitrage ; 82 candidats restent, dans E2 (30) et E3 (52) ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122 à §8.126).'],
  ['La décision sur le périmètre du groupe E de la recherche d\'omissions d\'A10 (121 sens, 107 ENTRY, dernier groupe ; groupe D arbitré, `docs/rapports/etape2-A2-05-omissions-interrogatif-D.md`, §0) et sur l\'organisation de sa relecture, puis, sur autorisation distincte, cette relecture ; la recherche reste distincte des 377.', PA_E1],
];
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) {
  let t = LFs(lire(p));
  for (const [k, [a, b]] of Q.entries()) t = remplacer(p + ', Q' + (k + 1), t, a, b);
  if (p === 'ROADMAP.md') {
    t = remplacer(p + ', en-tête', t, 'recherche d\'omissions d\'`interrogatif` ouverte, groupes A, B et C arbitrés le 2026-11-04, groupe D le 2026-11-05 ;', 'recherche d\'omissions d\'`interrogatif` ouverte, groupes A, B et C arbitrés le 2026-11-04, groupe D et livraison E1 du groupe E le 2026-11-05 ;');
  } else {
    const L = '| 2026-11-05 | 2 · A2-05 | **Recherche d\'omissions d\'A10 : périmètre du groupe E accepté, livraison E1 relue et arbitrée** (périmètre : 121 sens, 107 ENTRY, thème T2-nuls, trois livraisons par classe, E1 noms 39, E2 adjectifs 30, E3 verbes 52, une inscription après chaque livraison arbitrée ; E1 : 39 sens, 37 ENTRY, groupes de lecture a 15, b 6, c 7, d 11 ; 39 « ne relève pas de la fonction », aucune omission retenue, aucun à arbitrer) ; méthode acceptée ; 15 phrases relevées et analysées, dont l\'interrogation indirecte de 表 ; fonction interrogative, information désignée et information demandée distinguées, notamment pour les noms de personne et 意味 ; constats du §3.4 confirmés sans contradiction avec A10 ; cinq sens non candidats hors des conclusions ; sept observations éditoriales conservées sans correction ; verdicts du volet 2, décisions historiques et corrections retenues inchangés ; 152 relus sur 234, 82 restent (E2, E3) ; deux documents neufs dans `docs/rapports/` ; §8.126. **377/377 ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 47 empreintes.** | non committé |';
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
  for (const [p, h] of Object.entries(INSCRITS)) ok(shaF(cl.C, p) === h, 'clone : document inscrit avec A, B, C ou D, inchangé : ' + p);
  dire('--- Sabotages (chacun rétabli aussitôt)');
  const sabote = (nom, p, fn, attendu) => { const o = readFileSync(cl.f(p)); const m = Buffer.from(fn(o.toString('utf8'))); if (m.equals(o)) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(cl.f(p), m); try { const x = relais(); ok(x.ids.split(',').includes(attendu), nom, 'écarts : ' + x.ids); } finally { writeFileSync(cl.f(p), o); } };
  sabote('S1 prochaine action différente dans ROADMAP.md : C5f', 'ROADMAP.md', (t) => t.replace('puis l\'inscription de son arbitrage', 'puis la clôture de son arbitrage'), 'C5f');
  sabote('S2 renvoi .md retiré de la prochaine action d\'ETAT-ACTUEL.md : C5f', 'ETAT-ACTUEL.md', (t) => t.replace('`docs/rapports/etape2-A2-05-omissions-interrogatif-E1.md`, §0', 'rapport de la livraison E1, §0'), 'C5f');
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
