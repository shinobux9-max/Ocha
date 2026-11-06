// A2-05 · bloc F : préparation de la protection du rapport arbitré de F au manifeste d'empreintes, EN PROPOSITION. Aucun fichier visé n'est modifié dans le dépôt réel.
// Usage : node a2-05-travail/arbitrage-F/protection-F/preparer-protection-F.mjs <racine du dépôt>
// (1) Préconditions sur le dépôt réel. (2) Versions proposées, en mémoire, par remplacements ciblés à ancre unique : outil d'empreintes (tranche F : rapport arbitré
// et périmètre opérationnel accepté, mêmes règles que les tranches T), contrôle du périmètre opérationnel (45 ou 47 entrées), ETAT-ACTUEL.md, ROADMAP.md, bilan
// (§8.121). (3) Clone jetable recouvert de l'arbre de travail : essais différentiels (ancien outil contre proposé), puis `empreintes-lot3.mjs --ajouter`, une fois
// (le manifeste proposé est celui qu'écrit l'outil), bloc a2-05:etat synchronisé par sync-stable. (4) Simulation de l'état final : contrôles, relais (C9b seul),
// sabotages. (5) Écriture dans proposition/, seulement si aucun écart ; refus si le dossier existe. (6) Dépôt réel inchangé hors de ce dossier. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', I = W + 'arbitrage-F/protection-F/', PROP = I + 'proposition/';
const { cloner, controler } = await import(pathToFileURL(join(root, W + 'arbitrage-F/essai-clone.mjs')));
const { diffBrut } = await import(pathToFileURL(join(root, W + 'arbitrage-F/moteur-application.mjs')));
const { ajouterLigneJournal } = await import(pathToFileURL(join(root, W + 'sync-stable.mjs')));
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1';
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-', RF = R + 'F.md', PF = R + 'F-perimetre-operationnel.md', PREP = R + 'F-perimetre.md';
const EMP = W + 'empreintes-lot3.mjs', MAN = W + 'empreintes-rapports-arbitres.json', CPO = W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const CIBLES = [EMP, MAN, CPO, 'ETAT-ACTUEL.md', 'ROADMAP.md', BIL];
const DEPART = { [EMP]: 'bac08d6c39622fea53bbbbde5609599103acea894f43312635fea329aec77e9e', [MAN]: '89716587f51f6359b567cf56b07437b69093d67583c3180268fc7467183e836e',
  [CPO]: '60ef1cdcdfb0752074b86bb117c2e582c00ece8f73c3cfaeffb3969df7c2ceb2', 'ETAT-ACTUEL.md': '45ae5e88ec78a9f27c63a1f368296c9de2f2026312ce93e327784d75913e4a54',
  'ROADMAP.md': '9845c81dea1836acba018007fb581be4d848678344027376270444e5f47e1349', [BIL]: 'b47bd3fd470b92ea37fbac9a3975b52032a4893550b00f1ae417df6039d3ff48' };
const PROTEGES_F = { [RF]: '3a2e3f242d701db611facf9a49cca16f75eb890595ec15ecbefdad569e09acfb', [PF]: 'e2a27bb6a049772056ad193b1b1b10ecf64a132552e6fcf859b0d3eb3a567561' };
const ORDRE_45 = '924e9f657f1ef376dd0b4821a5768a4cbfbd4075f7382308f99b3d95b66169db';
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
ok(git('merge-base', '--is-ancestor', CLOTURE, 'HEAD').status === 0, 'HEAD descend du commit de clôture', CLOTURE.slice(0, 7));
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'index vide');
ok(!existsSync(join(root, PROP)), 'dossier de proposition absent');
for (const p of CIBLES) ok(shaF(root, p) === DEPART[p], 'empreinte de départ : ' + p, shaF(root, p).slice(0, 16));
for (const [p, h] of Object.entries(PROTEGES_F)) ok(shaF(root, p) === h, 'document à protéger, à son empreinte relue : ' + p, h.slice(0, 16));
ok(git('diff', '--quiet', 'HEAD', '--', EMP, MAN).status === 0, 'outil d\'empreintes et manifeste identiques à HEAD');
{ const m = JSON.parse(lire(MAN)); const k = Object.keys(m.empreintes); ok(k.length === 45 && sha(k.join('\n')) === ORDRE_45 && !k.includes(RF) && !k.includes(PF), 'manifeste : 45 entrées, ordre attendu ; ni le rapport F ni son périmètre'); }
{ const r = spawnSync(process.execPath, [join(root, EMP), root], { cwd: root, encoding: 'utf8' }); ok(r.status === 0 && r.stdout.trim() === 'empreintes : 45 rapports contrôlés, identiques ; rapports arbitrés hors du manifeste : ' + RF, 'empreintes de départ : 45 identiques ; hors du manifeste : le seul rapport F', r.stdout.trim().slice(0, 140)); }
ok(/^\*\*Statut\*\* : \*\*périmètre opérationnel accepté le 2026-11-03 \(§0\)\.\*\*/m.test(lire(PF)) && /^\*\*Statut\*\* : \*\*arbitré le 2026-11-03\*\* \(§0\)\./m.test(lire(RF)), 'statuts : périmètre opérationnel accepté, rapport F arbitré');
ok(/^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/m.test(lire(PREP)), 'périmètre préparatoire de F : non arbitré (il ne sera pas protégé)');
ok(!lire(BIL).includes('### 8.121 '), 'bilan sans §8.121');
arret();

// --- 2. Versions proposées, en mémoire
dire('--- Versions proposées, en mémoire');
const V = {}; const eol = {}; for (const p of CIBLES) eol[p] = eolDe(lire(p));
// 2.1 Outil d'empreintes : la tranche F, sous les mêmes règles que les tranches T ; rien d'autre
{
  let t = LFs(lire(EMP));
  t = remplacer('outil, en-tête', t, '// Rapports couverts : les rapports de livraison arbitrés du lot 3, leurs périmètres arbitrés, le périmètre du lot 3 et le bilan du bloc A.\n',
    '// Rapports couverts : les rapports de livraison arbitrés du lot 3, leurs périmètres arbitrés, le périmètre du lot 3 et le bilan du bloc A.\n// Tranche F (protection préparée le 2026-11-03) : son rapport arbitré et son périmètre opérationnel accepté (statut « périmètre opérationnel accepté le »),\n// sous les mêmes règles que les tranches T ; le périmètre préparatoire de F, non arbitré, n\'est jamais une entrée admise.\n');
  t = remplacer('outil, statut arbitré', t, 'const arbitre = (root, p) => /^\\*\\*Statut\\*\\* : \\*\\*(arbitré le |périmètre accepté le )/m.test(',
    'const arbitre = (root, p) => /^\\*\\*Statut\\*\\* : \\*\\*(arbitré le |périmètre accepté le |périmètre opérationnel accepté le )/m.test(');
  t = remplacer('outil, périmètres listés', t, '.filter((f) => /^etape2-A2-05-volet1-lot3-([A-F]|T)\\d+-perimetre\\.md$/.test(f))',
    '.filter((f) => /^etape2-A2-05-volet1-lot3-(([A-F]|T)\\d+-perimetre|F-perimetre-operationnel)\\.md$/.test(f))');
  t = remplacer('outil, motif TRANCHE', t, 'export const TRANCHE = /^docs\\/rapports\\/etape2-A2-05-volet1-lot3-(T\\d+)(-perimetre)?\\.md$/;\n',
    'export const TRANCHE = /^docs\\/rapports\\/etape2-A2-05-volet1-lot3-(T\\d+(?=(?:-perimetre)?\\.md$)|F(?=(?:-perimetre-operationnel)?\\.md$))(-perimetre(?:-operationnel)?)?\\.md$/;\n// Périmètre d\'une tranche et statut qu\'il porte : T<n>-perimetre.md, « périmètre accepté le » ; F-perimetre-operationnel.md, « périmètre opérationnel accepté le »\nconst PER = (t) => R + t + (t === \'F\' ? \'-perimetre-operationnel\' : \'-perimetre\') + \'.md\', ACCEPTE = (t) => (t === \'F\' ? \'périmètre opérationnel accepté le \' : \'périmètre accepté le \');\n');
  t = remplacer('outil, statut lu par anomaliesTranches', t, ".match(/^\\*\\*Statut\\*\\* : \\*\\*(arbitré le |périmètre accepté le )/m) ?? [])[1] ?? 'autre'",
    ".match(/^\\*\\*Statut\\*\\* : \\*\\*(arbitré le |périmètre accepté le |périmètre opérationnel accepté le )/m) ?? [])[1] ?? 'autre'");
  t = remplacer('outil, périmètre de la tranche', t, "const rap = R + t[1] + '.md', per = R + t[1] + '-perimetre.md';", "const rap = R + t[1] + '.md', per = PER(t[1]);");
  t = remplacer('outil, statut du périmètre', t, "if (statut(p) !== 'périmètre accepté le ') a.push(p + ' : périmètre protégé sans le statut « périmètre accepté le » (' + statut(p) + ')');",
    "if (statut(p) !== ACCEPTE(t[1])) a.push(p + ' : périmètre protégé sans le statut « ' + ACCEPTE(t[1]).trim() + ' » (' + statut(p) + ')');");
  V[EMP] = t;
}
// 2.2 Contrôle du périmètre opérationnel : non-régression du manifeste, à 45 entrées (avant) ou 47 (rapport F et périmètre opérationnel en 46e et 47e)
{
  let t = LFs(lire(CPO));
  t = remplacer('contrôle du périmètre, manifeste', t, "R.push({ c: Object.keys(man).length === 45 && !diff.length && !Object.hasOwn(man, REP), nom: 'non-régression : 45 empreintes identiques ; périmètre opérationnel hors du manifeste', d: diff.join(', ') });",
    "const cles = Object.keys(man), ordre45 = createHash('sha256').update(cles.slice(0, 45).join('\\n')).digest('hex') === '" + ORDRE_45 + "';\n" +
    "R.push({ c: !diff.length && ordre45 && ((cles.length === 45 && !Object.hasOwn(man, REP)) || (cles.length === 47 && cles[45] === 'docs/rapports/etape2-A2-05-volet1-lot3-F.md' && cles[46] === REP)), nom: 'non-régression : empreintes identiques, les 45 premières entrées dans leur ordre ; 45 entrées, périmètre opérationnel hors du manifeste, ou 47, rapport arbitré de F et périmètre opérationnel en 46e et 47e', d: diff.join(', ') || cles.length + ' entrées' });");
  V[CPO] = t;
}
// 2.3 Bilan : §8.121, ajouté à la fin, rien d'autre
{
  const t = LFs(lire(BIL)); ok(t.endsWith('\n') && !t.endsWith('\n\n'), 'bilan : fin de fichier attendue (un seul saut de ligne)');
  const P = ['### 8.121 Volet 1, lot 3 : rapport arbitré de F et périmètre opérationnel protégés au manifeste d\'empreintes (2026-11-03)', '',
    'Décisions (ChatGPT, par délégation ; relayées par l\'utilisateur) : « J\'autorise une seule exécution de `a2-05-travail/arbitrage-F/inscription-arbitrage-F/application/appliquer-inscription-arbitrage-F.mjs`, strictement sur les cinq fichiers préparés et relus » ; puis « une proposition minimale de protection du rapport F arbitré dans le manifeste d\'empreintes », préparée, relue et appliquée sur autorisation distincte.', '',
    '**Inscription de l\'arbitrage F appliquée le 2026-11-03.** `appliquer-inscription-arbitrage-F.mjs`, lancé une fois, code 0 : cinq fichiers égaux aux versions relues, cinq diffs réels identiques aux diffs relus ; rapport F en LF ; relais 28 sur 30, C9a et C9b seuls ; C5a conforme en mode strict ; 510 tests.', '',
    '**Protection.** Le rapport arbitré de F (`docs/rapports/etape2-A2-05-volet1-lot3-F.md`) et son périmètre opérationnel accepté (`docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md`) sont ajoutés au manifeste d\'empreintes par `a2-05-travail/empreintes-lot3.mjs --ajouter`, lancé une fois : **47 entrées**, les 45 précédentes inchangées, valeurs et ordre ; un ajout daté, les deux chemins ensemble, comme pour T1. La règle « un rapport arbitré exige son périmètre protégé » est conservée telle quelle : protéger le rapport seul aurait demandé une exception propre à F.', '',
    '**Adaptation de l\'outillage d\'empreintes** (`a2-05-travail/empreintes-lot3.mjs`), limitée à la tranche F : le motif `TRANCHE` admet `F` et `F-perimetre-operationnel`, et seulement eux ; le périmètre d\'une tranche F est son périmètre opérationnel, au statut « périmètre opérationnel accepté le » ; ce statut compte comme arbitré. Le périmètre préparatoire de F (`…-F-perimetre.md`, non arbitré) n\'est jamais une entrée admise. Pour les tranches T1 à T9, les anomalies rendues sont identiques à celles de l\'ancien outil (essais différentiels). Le contrôle C9a du relais n\'est pas modifié : il lit l\'outil adapté.', '',
    '**Contrôle du périmètre opérationnel** adapté : il admet 45 entrées, périmètre opérationnel hors du manifeste, ou 47, rapport F et périmètre opérationnel en 46e et 47e ; les 45 premières entrées, dans leur ordre, sont fixées par une empreinte.', '',
    '**Effet.** C9a est levé : le relais rend 29 sur 30, C9b seul, jusqu\'au commit de l\'installation d\'A10. Le diagnostic C9a (une exception au lieu d\'un écart quand un rapport protégé est modifié) reste au suivi technique, non corrigé. Le bloc `a2-05:etat` est synchronisé (47 rapports arbitrés identiques).', '',
    'Relais, `sync-stable.mjs`, registre des tranches, `CLAUDE.md`, A10 et sommaire non modifiés. Aucune donnée lexicale, aucune norme, aucun lot ni journal modifié ; aucune correction appliquée ; la recherche d\'omissions sur les 807 sens reste fermée. Aucun `git add`, commit ni push.', ''];
  V[BIL] = t + '\n' + P.join('\n');
}
// 2.4 Pilotage : mêmes remplacements dans ETAT-ACTUEL.md et ROADMAP.md
const Q = [
  ['**Le rapport arbitré de F n\'est pas protégé au manifeste\n  d\'empreintes** : le motif des entrées de tranche ne reconnaît que `T` suivi d\'un numéro ; C9a reste en\n  écart jusqu\'à une décision distincte ; le diagnostic C9a (une exception au lieu d\'un écart) reste au\n  suivi technique, non corrigé.',
    '**Le rapport arbitré de F et son périmètre\n  opérationnel sont protégés au manifeste d\'empreintes** (47 entrées ; outillage d\'empreintes étendu à\n  la tranche F ; bilan du volet 2, §8.121) ; C9a est levé ; le diagnostic C9a (une exception au lieu\n  d\'un écart) reste au suivi technique, non corrigé.'],
  ['rapport arbitré de F hors du manifeste d\'empreintes, C9a en écart jusqu\'à une décision distincte) ; bilan du volet 2, §8.106 à §8.120)',
    'rapport arbitré de F et périmètre opérationnel protégés au manifeste d\'empreintes, 47 entrées, C9a levé) ; bilan du volet 2, §8.106 à §8.121)'],
  ['C9a s\'y ajoute tant que le rapport arbitré de F est hors du manifeste d\'empreintes (bilan du volet 2, §8.120).',
    'C9a s\'y ajoute tant que le rapport arbitré de F est hors du manifeste d\'empreintes (bilan du volet 2, §8.120). Depuis la protection du rapport arbitré de F et de son périmètre opérationnel au manifeste d\'empreintes (47 entrées), C9a est levé : il rend 29 sur 30, C9b seul (§8.121).'],
  ['La décision sur la protection du rapport arbitré de F (`docs/rapports/etape2-A2-05-volet1-lot3-F.md`, §0) au manifeste d\'empreintes (adaptation de l\'outillage d\'empreintes et de C9a ; C9a en écart d\'ici là ; bilan du volet 2, §8.120), sur autorisation distincte. Puis, sur autorisation distincte, une exécution de mesure de couverture des huit filtres, X1 compris,',
    'Sur autorisation distincte, une exécution de mesure de couverture des huit filtres d\'A10 (`docs/conception/addendum-A10-interrogatif.md`, §8), X1 compris,'],
];
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) {
  let t = LFs(lire(p));
  for (const [k, [a, b]] of Q.entries()) t = remplacer(p + ', Q' + (k + 1), t, a, b);
  if (p === 'ROADMAP.md') t = remplacer(p + ', en-tête', t, 'bloc F arbitré le 2026-11-03 ;', 'bloc F arbitré le 2026-11-03, son rapport et son périmètre opérationnel protégés au manifeste ;');
  else {
    const L = '| 2026-11-03 | 2 · A2-05 | **Inscription de l\'arbitrage F appliquée** (une exécution, code 0 ; cinq diffs réels identiques aux diffs relus ; rapport F en LF ; relais 28 sur 30, C9a et C9b) ; **rapport arbitré de F et périmètre opérationnel protégés au manifeste d\'empreintes**, sur autorisation distincte, une exécution : outillage d\'empreintes étendu à la seule tranche F (anomalies des tranches T identiques à l\'ancien outil) ; `empreintes-lot3.mjs --ajouter`, une fois : 47 entrées, les 45 précédentes inchangées ; contrôle du périmètre opérationnel adapté ; C9a levé, relais 29 sur 30, C9b seul ; relais et `sync-stable` non modifiés ; §8.121. **377/377, 0 restant ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 47 empreintes.** | non committé |';
    const t2 = LFs(ajouterLigneJournal(t, L)); ok(t2 !== t && t2.split(L).length === 2 && t2.trimEnd().endsWith(L), 'ETAT-ACTUEL.md : une ligne de journal ajoutée à la fin du journal'); t = t2;
  }
  V[p] = t;
}
for (const p of [EMP, CPO, 'ETAT-ACTUEL.md', 'ROADMAP.md', BIL]) V[p] = avecEol(V[p], eol[p]);
arret();

// --- 3 et 4. Clone : essais différentiels, --ajouter, synchronisation, simulation
dire('--- Clone jetable : essais différentiels de l\'outillage');
const cl = cloner(root); let finaux = {};
const relais = (...o) => { const r = cl.lancer(W + 'controle-relais-allege.mjs', '--apres-application', ...o); const L = r.out.split('\n'); return { code: r.code, out: r.out, fin: L.at(-1), L, ids: L.map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
try {
  for (const p of [EMP, CPO]) { cl.ecrire(p, V[p]); ok(spawnSync(process.execPath, ['--check', cl.f(p)], { encoding: 'utf8' }).status === 0, 'node --check : ' + p); }
  cl.ecrire(W + 'empreintes-lot3-ancien.mjs', git('show', 'HEAD:' + EMP).stdout);
  const de = spawnSync(process.execPath, [join(root, I + 'essais-differentiels.mjs'), cl.C], { cwd: cl.C, encoding: 'utf8', maxBuffer: 1 << 28 });
  for (const l of (de.stdout ?? '').trim().split('\n')) dire('    ' + l);
  ok(de.status === 0 && /essais différentiels conformes$/.test((de.stdout ?? '').trim()), 'essais différentiels : ancien outil contre proposé', 'code ' + de.status + ((de.stderr ?? '').trim() ? ' ; ' + de.stderr.trim().slice(0, 200) : ''));
  rmSync(cl.f(W + 'empreintes-lot3-ancien.mjs'));
  for (const p of Object.keys(PROTEGES_F)) ok(shaF(cl.C, p) === PROTEGES_F[p], 'essais différentiels : statuts rétablis, ' + p.slice(p.lastIndexOf('lot3-') + 5));
  arret();

  dire('--- Clone jetable : ajout au manifeste par l\'outil, puis pilotage et synchronisation');
  const avant = JSON.parse(readFileSync(cl.f(MAN), 'utf8'));
  const aj = cl.lancer(EMP, '--ajouter'); ok(aj.code === 0 && aj.out === 'manifeste : 2 rapport(s) ajouté(s) : ' + RF + ', ' + PF, '`empreintes-lot3.mjs --ajouter`, une fois', aj.out.slice(0, 160));
  const aj2 = cl.lancer(EMP, '--ajouter'); ok(aj2.code !== 0 && /aucun rapport arbitré à ajouter/.test(aj2.out), 'seconde exécution de --ajouter refusée, sans écriture', 'code ' + aj2.code);
  const brutM = readFileSync(cl.f(MAN), 'utf8'), m = JSON.parse(brutM), k = Object.keys(m.empreintes), jour = new Date().toISOString().slice(0, 10);
  ok(k.length === 47 && sha(k.slice(0, 45).join('\n')) === ORDRE_45 && k.slice(0, 45).every((p) => m.empreintes[p] === avant.empreintes[p]), 'manifeste : 47 entrées ; les 45 premières inchangées, valeurs et ordre');
  ok(k[45] === RF && k[46] === PF && m.empreintes[RF] === PROTEGES_F[RF] && m.empreintes[PF] === PROTEGES_F[PF], 'manifeste : 46e le rapport arbitré de F, 47e son périmètre opérationnel, à leurs empreintes relues');
  ok(JSON.stringify(m.ajouts.slice(0, -1)) === JSON.stringify(avant.ajouts) && JSON.stringify(m.ajouts.at(-1)) === JSON.stringify({ date: jour, chemins: [RF, PF] }), 'ajouts : les 17 précédents inchangés ; un ajout nouveau, daté, les deux chemins ensemble', jour);
  ok(['genere_par', 'etabli_le', 'note'].every((x) => m[x] === avant[x]) && brutM === JSON.stringify(m, null, 1) + '\n' && !brutM.includes('\r'), 'manifeste : en-tête inchangé ; format de l\'outil, LF');
  V[MAN] = brutM;
  for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md', BIL]) cl.ecrire(p, V[p]);
  const ap = cl.lancer(W + 'sync-stable.mjs', '--apercu'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
  ok(ap.code === 0 && !!plan, 'aperçu de synchronisation calculé sur les versions proposées', ap.out.split('\n').pop().slice(0, 120));
  const app = cl.lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', plan); ok(app.code === 0, 'synchronisation appliquée dans le clone, au plan montré', plan + ' ; code ' + app.code);
  for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) {
    const s = readFileSync(cl.f(p), 'utf8'); const bloc = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
    ok(s.replace(bloc, '') === V[p].replace(bloc, '') && s.match(bloc)[0] !== V[p].match(bloc)[0], 'synchronisation : seul le bloc a2-05:etat change : ' + p);
    const b0 = V[p].match(bloc)[0], b1 = s.match(bloc)[0]; const dl = b1.split(/\r?\n/).filter((l, i) => l !== b0.split(/\r?\n/)[i]);
    ok(/47 rapports arbitrés identiques/.test(b1) && /377 sens arbitrés sur 377 ; 0 restent \(0 proposés\)/.test(b1) && dl.length === 2 && dl[0].startsWith('<!-- a2-05:etat:debut') && /47 rapports arbitrés identiques/.test(dl[1]), 'bloc synchronisé : seules changent l\'empreinte du bloc et la ligne des contrôles (45 → 47) : ' + p, dl.length + ' lignes');
    V[p] = s;
  }
  const ap2 = cl.lancer(W + 'sync-stable.mjs', '--apercu'); const vide = !readFileSync(cl.f(W + 'sync-stable-apercu.md'), 'utf8').split('\n').some((l) => /^[+-](?![+-])/.test(l));
  ok(ap2.code === 0 && vide, 'aperçu suivant vide', ap2.out.split('\n').pop().slice(0, 100));
  rmSync(cl.f(W + 'sync-stable-apercu.md'), { force: true });
  arret();

  dire('--- Simulation de l\'état final (contrôles relancés dans le clone)');
  controler(cl, 'état final', ok, { tests: true, chemins: CIBLES, attendus: ['C9b'] });
  const rel = relais(); const c9a = rel.L.find((l) => /^conforme\s+C9a/.test(l)) ?? '';
  ok(/47 rapports arbitrés identiques sur 47 au manifeste ; HEAD : 45, inchangées ; nouvelles : F\.md, F-perimetre-operationnel\.md$/.test(c9a), 'C9a conforme : 47 identiques ; les 45 de HEAD inchangées ; nouvelles : le rapport F et son périmètre opérationnel ; aucune anomalie', c9a.slice(c9a.indexOf(' : ') + 3, c9a.indexOf(' : ') + 160));
  ok(rel.L.some((l) => /^conforme\s+C8 /.test(l)) && rel.L.some((l) => /^conforme\s+C5f /.test(l)), 'C8 (reprise simulée) et C5f (prochaine action identique, citant un .md) conformes');
  const emp = cl.lancer(EMP); ok(emp.code === 0 && emp.out === 'empreintes : 47 rapports contrôlés, identiques', 'empreintes : 47 identiques, aucun rapport arbitré hors du manifeste', emp.out);
  const cpo = cl.lancer(CPO, '--sabotages'); ok(cpo.code === 0 && /\n29 conformes sur 29\n/.test(cpo.out) && /17 sabotages détectés sur 17/.test(cpo.out) && /témoin sain : conforme/.test(cpo.out), 'contrôle du périmètre opérationnel : 29 sur 29, 17 sabotages sur 17, témoin sain');
  const etat = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,empreintes:v.empreintes}))"], { cwd: cl.C, encoding: 'utf8' }).stdout.trim();
  ok(etat === '{"arbitres":377,"restants":0,"proposes":0,"corrections":204,"entry":177,"libre":"V1-32","empreintes":47}', 'état calculé : 377/377 ; 204 corrections dans 177 ENTRY ; V1-32 ; 47 empreintes', etat);

  dire('--- Sabotages sur l\'état final simulé (chacun rétabli aussitôt)');
  const sabote = (nom, p, fn, juge) => { const o = readFileSync(cl.f(p)); const mo = fn(o); if (Buffer.from(mo).equals(o)) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(cl.f(p), mo); try { juge(nom); } finally { writeFileSync(cl.f(p), o); } };
  const manif = (f) => (o) => { const x = JSON.parse(o.toString('utf8')); f(x); return Buffer.from(JSON.stringify(x, null, 1) + '\n'); };
  const retirer = (x, p) => { delete x.empreintes[p]; x.ajouts = x.ajouts.map((a) => ({ ...a, chemins: a.chemins.filter((c) => c !== p) })).filter((a) => a.chemins.length); };
  const parEmpreinte = (p) => (nom) => { const e = cl.lancer(EMP); const r = relais(); ok(e.code !== 0 && e.out.includes('empreinte modifiée : ' + p) && r.code !== 0, nom, 'empreintes : code ' + e.code + ' ; relais : code ' + r.code + ', ' + (r.ids ? 'écarts ' + r.ids : 'exception (diagnostic C9a connu, au suivi technique)')); };
  const parC9a = (nom) => { const r = relais(); ok(r.ids.split(',').includes('C9a'), nom, 'écarts : ' + r.ids + ' ; ' + ((r.L.find((l) => /^ÉCART\s+C9a/.test(l)) ?? '').match(/(anomalies|arbitrés hors manifeste|altérées) : [^;]*/) ?? [''])[0].replace(/docs\/rapports\/etape2-A2-05-volet1-lot3-/g, '…').slice(0, 150)); };
  sabote('S1 rapport arbitré de F modifié d\'un octet', RF, (o) => Buffer.concat([o, Buffer.from('\n')]), parEmpreinte(RF));
  sabote('S2 périmètre opérationnel de F modifié d\'un octet', PF, (o) => Buffer.concat([o, Buffer.from('\n')]), parEmpreinte(PF));
  sabote('S3 rapport F retiré du manifeste : C9a', MAN, manif((x) => retirer(x, RF)), parC9a);
  sabote('S4 périmètre opérationnel retiré du manifeste, rapport F gardé : C9a', MAN, manif((x) => retirer(x, PF)), parC9a);
  sabote('S5 entrée historique (T9) retirée du manifeste : C9a', MAN, manif((x) => retirer(x, R + 'T9.md')), parC9a);
  sabote('S6 périmètre préparatoire de F ajouté au manifeste : C9a', MAN, manif((x) => { x.empreintes[PREP] = shaF(cl.C, PREP); x.ajouts.at(-1).chemins.push(PREP); }), parC9a);
  sabote('S7 rapport F inscrit dans un ajout antérieur à son périmètre : C9a', MAN, manif((x) => { x.ajouts.at(-1).chemins = [PF]; x.ajouts.splice(-1, 0, { date: x.ajouts.at(-1).date, chemins: [RF] }); }), parC9a);
  sabote('S8 outil d\'empreintes ramené à sa version de HEAD : C9a', EMP, () => Buffer.from(git('show', 'HEAD:' + EMP).stdout), parC9a);
  sabote('S9 contrôle du périmètre opérationnel, manifeste à 46 entrées (rapport F seul retiré)', MAN, manif((x) => retirer(x, RF)), (nom) => { const r = cl.lancer(CPO); ok(r.code !== 0 && /ÉCART\s+non-régression : empreintes identiques/.test(r.out), nom, 'code ' + r.code); });
  sabote('S10 contrôle du périmètre opérationnel, entrées 46e et 47e permutées', MAN, manif((x) => { const e = x.empreintes; x.empreintes = Object.fromEntries([...Object.entries(e).slice(0, 45), [PF, e[PF]], [RF, e[RF]]]); }), (nom) => { const r = cl.lancer(CPO); ok(r.code !== 0 && /ÉCART\s+non-régression : empreintes identiques/.test(r.out), nom, 'code ' + r.code); });
  const tem = relais(); ok(tem.ids === 'C9b' && tem.fin === '29 conformes sur 30', 'témoin après sabotages : 29 sur 30, C9b seul', tem.fin);
  for (const p of CIBLES) ok(shaF(cl.C, p) === sha(Buffer.from(V[p])), 'clone : version finale intacte après sabotages : ' + p);
  finaux = Object.fromEntries(CIBLES.map((p) => [p, V[p]]));
} finally { cl.nettoyer(); }
arret();

// --- 5. Écriture de la proposition
dire('--- Écriture de la proposition');
const M = {}; const table = ['| Fichier | Départ | Proposé | Diff | Lignes |', '|---|---|---|---|---|'];
for (const p of CIBLES) { mkdirSync(dirname(join(root, PROP + p)), { recursive: true }); writeFileSync(join(root, PROP + p), finaux[p]); }
mkdirSync(join(root, PROP + 'diffs'), { recursive: true });
for (const p of CIBLES) {
  const d = diffBrut(root, p, PROP + p); ok(d.status === 1, 'diff produit : ' + p);
  writeFileSync(join(root, PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), d.stdout);
  const plus = d.stdout.split('\n').filter((l) => /^\+(?!\+\+)/.test(l)).length, moins = d.stdout.split('\n').filter((l) => /^-(?!--)/.test(l)).length;
  M[p] = { depart: shaF(root, p), propose: shaF(root, PROP + p), diff: sha(d.stdout) };
  table.push('| `' + p + '` | `' + M[p].depart.slice(0, 16) + '…` | `' + M[p].propose.slice(0, 16) + '…` | `' + M[p].diff.slice(0, 16) + '…` | +' + plus + ' / −' + moins + ' |');
}
writeFileSync(join(root, PROP + 'manifeste.json'), JSON.stringify(M, null, 1) + '\n');
writeFileSync(join(root, PROP + 'table-diffs.md'), table.join('\n') + '\n');
ok(git('diff', '--cached', '--name-only').stdout.trim() === '', 'index réel toujours vide');
ok(CIBLES.every((p) => M[p].depart === DEPART[p] && shaF(root, p) === DEPART[p]), 'fichiers visés du dépôt réel inchangés');
dire('manifeste de la proposition : ' + shaF(root, PROP + 'manifeste.json'));
writeFileSync(join(root, I + 'sortie-preparation.txt'), trace.join('\n') + '\n' + (ko ? 'préparation NON conforme' : 'préparation conforme') + '\n');
console.log(ko ? 'préparation NON conforme' : 'préparation conforme'); process.exit(ko ? 1 : 0);
