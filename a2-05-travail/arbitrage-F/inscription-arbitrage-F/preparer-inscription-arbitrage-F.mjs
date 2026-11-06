// A2-05 · bloc F : préparation de l'inscription de l'arbitrage du 2026-11-03 (audit des 17 sens), EN PROPOSITION. Aucun fichier visé n'est modifié dans le dépôt réel.
// Usage : node a2-05-travail/arbitrage-F/inscription-arbitrage-F/preparer-inscription-arbitrage-F.mjs <racine du dépôt>
// (1) Préconditions sur le dépôt réel. (2) Versions proposées, en mémoire, par remplacements ciblés à ancre unique : rapport F (statut, §0), bilan (§8.120),
// ETAT-ACTUEL.md et ROADMAP.md (rubriques, prochaine action, une ligne de journal), contrôle du périmètre opérationnel (état d'après arbitrage). (3) Clone jetable
// recouvert de l'arbre de travail : versions écrites, bloc a2-05:etat synchronisé par sync-stable (aperçu, puis application au plan montré) ; seuls les blocs
// changent. (4) Simulation de l'état final dans le clone : contrôles, écarts attendus du relais (C9a, C9b), sabotages. (5) Écriture dans proposition/, seulement si
// aucun écart ; refus si le dossier existe. (6) Dépôt réel inchangé hors de ce dossier. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', I = W + 'arbitrage-F/inscription-arbitrage-F/', PROP = I + 'proposition/';
const { cloner, controler } = await import(pathToFileURL(join(root, W + 'arbitrage-F/essai-clone.mjs')));
const { diffBrut } = await import(pathToFileURL(join(root, W + 'arbitrage-F/moteur-application.mjs')));
const { ajouterLigneJournal } = await import(pathToFileURL(join(root, W + 'sync-stable.mjs')));
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1';
const RF = 'docs/rapports/etape2-A2-05-volet1-lot3-F.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', CPO = W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs';
const CIBLES = ['ETAT-ACTUEL.md', 'ROADMAP.md', BIL, RF, CPO];
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
ok(/^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/m.test(lire(RF)) && !/^## 0\. Arbitrage$/m.test(lire(RF)), 'rapport F en proposition, sans §0');
ok(!lire(BIL).includes('### 8.120 '), 'bilan sans §8.120');
const cov0 = spawnSync(process.execPath, [join(root, W + 'couverture-lot3.mjs'), root], { cwd: root, encoding: 'utf8' }).stdout;
ok(/360 arbitrés, 17 proposés, 0 restants, sur 377/.test(cov0), 'couverture de départ : 360 arbitrés, 17 proposés', cov0.split('\n')[0].slice(0, 80));
arret();

// --- 2. Versions proposées, en mémoire
dire('--- Versions proposées, en mémoire');
const V = {}; const eol = {};
for (const p of CIBLES) eol[p] = eolDe(lire(p));
// Correction de format : le rapport F a été livré en CRLF, sur une mesure erronée ; les rapports du lot 3 sont en LF (`/docs/** -text`). La version inscrite est en LF.
{ const b = lire(RF); const crlf = (b.match(/\r\n/g) ?? []).length, lf = (b.match(/\n/g) ?? []).length; ok(crlf === lf && lf === 297, 'rapport F livré entièrement en CRLF (297 lignes) : version inscrite ramenée en LF, convention des rapports du lot 3', crlf + ' CRLF sur ' + lf); eol[RF] = '\n'; }

// 2.1 Rapport F : statut et §0
{
  let t = LFs(lire(RF));
  t = remplacer('rapport F, statut', t, '**Statut** : **proposition, non arbitrée.** Aucune conclusion n\'est appliquée ; aucune décision de journal n\'est écrite ; aucune donnée, aucun lot, aucune norme n\'est modifié.',
    '**Statut** : **arbitré le 2026-11-03** (§0). La proposition est conservée telle qu\'elle a été livrée. Aucune décision de journal n\'est écrite ; aucune donnée, aucun lot, aucune norme n\'est modifié.');
  const S0 = ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-03 (ChatGPT, par délégation ; relayé par l\'utilisateur) : « J\'accepte les conclusions de la relecture du bloc F. »', '',
    '**17 verdicts `interrogatif` conformes et 17 verdicts `type-nul` conformes, aucun écart**, comme proposé. La proposition est conservée ci-dessous, telle qu\'elle a été livrée ; ses verdicts du §1 et ses fiches d\'examen ne sont pas modifiés.', '',
    '| Point | Arbitrage |', '|---|---|',
    '| **Verdicts `interrogatif` (17)** | « Les 17 verdicts `interrogatif` sont acceptés : 17 conformes, aucun écart. » Les 17 attributions, existantes et inchangées, sont justifiées par leur verdict individuel arbitré, traçable dans ce rapport, sans décision nouvelle (A10, §3, point 4). |',
    '| **Verdicts `type-nul` (17)** | « Les 17 verdicts `type-nul` sont acceptés : 17 conformes, aucun écart. » |',
    '| **P1** | « NON — maintien des types nuls pour les interrogatifs de personne. » |',
    '| **P2** | « NON — maintien des types nuls pour les interrogatifs de quantité et de prix. » |',
    '| **P3** | « NON — maintien des types nuls pour les interrogatifs de lieu et de direction. » |',
    '| **P4** | « OUI — le fondement A6 indépendant de la fonction interrogative constitue une justification traçable, sans modifier les décisions historiques. » Les 17 décisions `type-nul` (D0073, D0373, D0641, D0652, D0664, D0681, D0682, D0683, D0696, D0705, D0708, D0710, D0712, D0714, D0716, D0718, D0720) restent validées et ne sont pas réécrites ; leur fondement A6 est celui du §3. |',
    '| **Catégories** | « Les 17 catégories publiées sont confirmées, y compris les deux catégories au niveau 1. » |',
    '| **Corrections** | « Aucune correction nouvelle n\'est retenue. Les 204 corrections précédemment retenues restent inchangées et non appliquées. » |',
    '| **Recherche d\'omissions** | « La recherche d\'omissions sur les 807 sens reste fermée jusqu\'à autorisation distincte. » |', '',
    '**Liste globale inchangée : aucune correction nouvelle ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 reste libre.** Comptes attendus, calculés par les outils et non imposés à la main : 377 sens arbitrés sur 377, 0 restant ; bloc B, 148 sur 148.', '', ''].join('\n');
  t = remplacer('rapport F, §0', t, '## 1. Résultat proposé\n', S0 + '## 1. Résultat proposé\n');
  V[RF] = t;
  // Texte livré conservé : retirer le §0 et rétablir l'ancien statut redonne, hors fins de ligne, exactement le rapport livré et exporté
  const inverse = t.replace(S0, '').replace('**Statut** : **arbitré le 2026-11-03** (§0). La proposition est conservée telle qu\'elle a été livrée. Aucune décision de journal n\'est écrite ; aucune donnée, aucun lot, aucune norme n\'est modifié.',
    '**Statut** : **proposition, non arbitrée.** Aucune conclusion n\'est appliquée ; aucune décision de journal n\'est écrite ; aucune donnée, aucun lot, aucune norme n\'est modifié.');
  ok(inverse === LFs(lire(RF)), 'rapport F : hors statut, §0 et fins de ligne, texte identique au rapport livré et exporté');
}

// 2.2 Bilan : §8.120, ajouté à la fin, rien d'autre
{
  const t = LFs(lire(BIL)); ok(t.endsWith('\n') && !t.endsWith('\n\n'), 'bilan : fin de fichier attendue (un seul saut de ligne)');
  const P = ['### 8.120 Volet 1, lot 3 : audit du bloc F livré et arbitré ; lot 3 entièrement arbitré (2026-11-03)', '',
    'Décisions (ChatGPT, par délégation ; relayées par l\'utilisateur), chacune distincte : « L\'application unique des dix modifications préparées par `appliquer-inscription-F.mjs`, sans élargissement du périmètre » ; « L\'ouverture de l\'audit lexical des 17 sens du bloc F, dans une seule livraison » ; puis l\'arbitrage : « J\'accepte les conclusions de la relecture du bloc F. »', '',
    '**Inscription du périmètre F et consignation §8.119 appliquées le 2026-11-03.** `a2-05-travail/arbitrage-F/inscription-F/application/appliquer-inscription-F.mjs`, lancé une fois, code 0 : dix fichiers égaux aux versions relues ; dix diffs réels identiques, octet pour octet, aux diffs relus ; relais 29 sur 30, C9b seul ; 510 tests.', '',
    '**Audit livré en proposition le 2026-11-03** (`docs/rapports/etape2-A2-05-volet1-lot3-F.md`) : 17 sens, 15 ENTRY ; deux verdicts par sens, comptés séparément ; fondement A6 indépendant de la fonction (§3 du rapport) ; 211 citations retrouvées mot pour mot ; export de relecture `chatgpt-relecture-A2-05-volet1-lot3-F-audit.zip` (`ad2b1fb8e8d46d8d105b830348b43d07651cca17bed1c5c21262bea623f42095`).', '',
    '**Bloc F arbitré le 2026-11-03** (rapport, §0 ; proposition conservée) :', '',
    '| Verdict | Conformes | Écarts |', '|---|---|---|', '| `interrogatif` selon A10 | 17 | 0 |', '| `type-nul` selon A6 | 17 | 0 |', '',
    'P1 : « NON — maintien des types nuls pour les interrogatifs de personne. » P2 : « NON — maintien des types nuls pour les interrogatifs de quantité et de prix. » P3 : « NON — maintien des types nuls pour les interrogatifs de lieu et de direction. » P4 : « OUI — le fondement A6 indépendant de la fonction interrogative constitue une justification traçable, sans modifier les décisions historiques. » « Les 17 catégories publiées sont confirmées, y compris les deux catégories au niveau 1. »', '',
    '**Effets.** Les 17 attributions d\'`interrogatif`, existantes et inchangées, sont justifiées par leur verdict individuel arbitré, sans décision nouvelle (A10, §3, point 4) ; les 17 décisions `type-nul` restent validées et ne sont pas réécrites. « Aucune correction nouvelle n\'est retenue. » **Lot 3 : 377 sens arbitrés sur 377, 0 restant.** 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre.', '',
    '**Inscription.** Rapport F : statut et §0, la proposition étant conservée ; ce paragraphe ; `ETAT-ACTUEL.md` et `ROADMAP.md` : rubriques, prochaine action, une ligne de journal, bloc `a2-05:etat` synchronisé par `sync-stable` ; contrôle du périmètre opérationnel adapté à l\'état d\'après arbitrage (couverture : les 17 restants sont le bloc F, ou, après son arbitrage, aucun restant et ses 17 sens arbitrés ; sabotages inchangés). Registre des tranches non modifié.', '',
    '**Correction de format du rapport F.** Le rapport F avait été écrit en fins de ligne CRLF, sur une mesure erronée des rapports voisins ; les rapports du lot 3 sont en LF (`/docs/** -text`), et `git diff --check` aurait signalé ses 297 lignes dans un commit. La version inscrite est en LF ; hors statut, §0 et fins de ligne, son texte est identique à la version livrée et exportée (vérifié par la préparation).', '',
    '**Non fait, à décider à part.** Le rapport arbitré de F n\'est pas protégé au manifeste d\'empreintes (45 entrées) : le motif des entrées de tranche (`TRANCHE`, `a2-05-travail/empreintes-lot3.mjs`) ne reconnaît que `T` suivi d\'un numéro, et le périmètre opérationnel de F n\'est pas protégé ; son ajout demanderait une adaptation de l\'outillage d\'empreintes et de C9a. Jusqu\'à cette décision, le relais rend 28 sur 30 : C9a (rapport arbitré hors du manifeste) et C9b (installation d\'A10 non committée). Le diagnostic C9a (une exception au lieu d\'un écart quand un rapport protégé est modifié) reste au suivi technique, non corrigé. La recherche d\'omissions sur les 807 sens reste fermée.', '',
    'Aucune donnée lexicale, aucune norme, aucun lot ni journal modifié ; aucune correction appliquée. Aucun `git add`, commit ni push.', ''];
  V[BIL] = t + '\n' + P.join('\n');
}

// 2.3 Pilotage : mêmes remplacements dans ETAT-ACTUEL.md et ROADMAP.md
const R1 = ['**360\n  candidats arbitrés sur 377 ; 17 restent**, dont 17 dans le bloc F, au périmètre accepté le 2026-11-03 ;',
  '**377\n  candidats arbitrés sur 377 ; 0 restent** : **le bloc F est arbitré le 2026-11-03** (17 sens, 15 ENTRY : 17 conformes `interrogatif` selon A10, 17 conformes `type-nul` selon A6, aucun écart, aucune correction nouvelle ; `docs/rapports/etape2-A2-05-volet1-lot3-F.md`, §0) ;'];
const R2 = ['registre, C5c et recalculs de T7 à T9 adaptés ; audit non ouvert) ; bilan du volet 2, §8.106 à §8.119)',
  'registre, C5c et recalculs de T7 à T9 adaptés ; inscription appliquée le 2026-11-03, sur autorisation) ; **audit des 17 sens du bloc F autorisé le 2026-11-03, en proposition, et livré** (`docs/rapports/etape2-A2-05-volet1-lot3-F.md`) ; **bloc F arbitré le 2026-11-03** (§0, proposition conservée : 17 conformes `interrogatif`, 17 conformes `type-nul`, aucun écart ; P1 à P3 : types nuls maintenus pour les interrogatifs de personne, de quantité et de prix, de lieu et de direction ; P4 : fondement A6 indépendant de la fonction retenu comme justification traçable, décisions historiques non modifiées ; 17 catégories confirmées, dont deux au niveau 1 ; aucune correction nouvelle ; contrôle du périmètre opérationnel adapté à l\'état arbitré ; rapport arbitré de F hors du manifeste d\'empreintes, C9a en écart jusqu\'à une décision distincte) ; bilan du volet 2, §8.106 à §8.120)'];
const R3 = ['Les 17 candidats restants du lot 3, tous du bloc F, tranche par tranche, chacune sur\n  autorisation distincte. **Le bloc F (17 sens portant `interrogatif`) n\'est plus suspendu** : le\n  préalable E5 a suivi la séquence arbitrée : adoption explicite de l\'addendum, faite le 2026-11-03 ;\n  puis périmètre opérationnel de contrôle, accepté le 2026-11-03 (une seule livraison F) ; puis examen\n  des 17 sens et recherche d\'omissions, comptabilisés séparément.',
  '**Les 377 candidats du lot 3 sont arbitrés** ; le bloc F l\'est le 2026-11-03, selon la séquence\n  d\'A10 (adoption de l\'addendum, périmètre opérationnel accepté, examen des 17 sens). **La recherche\n  d\'omissions d\'A10 (§8) sur les 807 sens non porteurs reste fermée** jusqu\'à autorisation distincte ;\n  elle est comptabilisée à part, hors des 377. **Le rapport arbitré de F n\'est pas protégé au manifeste\n  d\'empreintes** : le motif des entrées de tranche ne reconnaît que `T` suivi d\'un numéro ; C9a reste en\n  écart jusqu\'à une décision distincte ; le diagnostic C9a (une exception au lieu d\'un écart) reste au\n  suivi technique, non corrigé.'];
const R4 = ['L\'audit des 17 sens du bloc F, en une seule livraison F (`docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md`, §0), deux verdicts par sens (`interrogatif` selon A10, `type-nul` selon A6), sur autorisation distincte d\'ouverture ; dossier de lecture préparé, sans verdict (`a2-05-travail/audit-F/dossier-F.md`). Puis, sur autorisation distincte, une exécution',
  'La décision sur la protection du rapport arbitré de F (`docs/rapports/etape2-A2-05-volet1-lot3-F.md`, §0) au manifeste d\'empreintes (adaptation de l\'outillage d\'empreintes et de C9a ; C9a en écart d\'ici là ; bilan du volet 2, §8.120), sur autorisation distincte. Puis, sur autorisation distincte, une exécution'];
const R5 = ['l\'écart se lève au prochain commit (bilan du volet 2, §8.118).',
  'l\'écart se lève au prochain commit (bilan du volet 2, §8.118). Depuis l\'inscription de l\'arbitrage du bloc F, il rend 28 sur 30 : C9a s\'y ajoute tant que le rapport arbitré de F est hors du manifeste d\'empreintes (bilan du volet 2, §8.120).'];
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) {
  let t = LFs(lire(p));
  for (const [k, [a, b]] of [R1, R2, R3, R4, R5].entries()) t = remplacer(p + ', R' + (k + 1), t, a, b);
  if (p === 'ROADMAP.md') t = remplacer(p + ', en-tête', t, 'lot 3 en cours, 360 candidats arbitrés sur 377, 17 restants, tous du bloc F ;', 'lot 3 entièrement arbitré, 377 candidats sur 377, bloc F arbitré le 2026-11-03 ;');
  else {
    const L = '| 2026-11-03 | 2 · A2-05 | **Inscription du périmètre F appliquée** (une exécution, code 0 ; dix diffs réels identiques aux diffs relus) ; **audit des 17 sens du bloc F livré en proposition**, puis **arbitré** (§0 : 17 conformes `interrogatif`, 17 conformes `type-nul`, aucun écart ; P1 à P3 non, types nuls maintenus ; P4 oui, fondement A6 indépendant de la fonction ; 17 catégories confirmées ; aucune correction nouvelle) ; contrôle du périmètre opérationnel adapté ; bloc d\'état synchronisé ; rapport arbitré de F hors du manifeste, C9a en écart ; recherche d\'omissions fermée ; §8.120. **377/377, 0 restant ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 45 empreintes.** | non committé |';
    const t2 = LFs(ajouterLigneJournal(t, L)); ok(t2 !== t && t2.split(L).length === 2 && t2.trimEnd().endsWith(L), 'ETAT-ACTUEL.md : une ligne de journal ajoutée à la fin du journal'); t = t2;
  }
  V[p] = t;
}

// 2.4 Contrôle du périmètre opérationnel : couverture lue avant ou après l'arbitrage de F ; rien d'autre
{
  let t = LFs(lire(CPO));
  t = remplacer('contrôle du périmètre, couverture', t, 'ok(JSON.stringify([...D.restants].sort()) === JSON.stringify([...ids].sort()), \'couverture : les 17 restants du lot 3 sont exactement le bloc F\', D.restants.length + \' restants\');',
    'ok(JSON.stringify([...D.restants].sort()) === JSON.stringify([...ids].sort()) || (!D.restants.length && ids.every((i) => D.etats[i] === \'arbitré\')), \'couverture : les 17 restants du lot 3 sont exactement le bloc F, ou, après son arbitrage, aucun restant et ses 17 sens arbitrés\', D.restants.length + \' restants\');');
  t = remplacer('contrôle du périmètre, états', t, 'restants: couverture(root).sens.filter((s) => s.etat !== \'arbitré\').map((s) => s.id) };',
    'restants: couverture(root).sens.filter((s) => s.etat !== \'arbitré\').map((s) => s.id), etats: Object.fromEntries(couverture(root).sens.map((s) => [s.id, s.etat])) };');
  V[CPO] = t;
}
for (const p of CIBLES) V[p] = avecEol(V[p], eol[p]);
ok(!V[RF].includes('\r') && (V[RF].match(/\n/g) ?? []).length === 317, 'rapport F proposé : LF seul, 317 lignes (297 + 20 du §0)', (V[RF].match(/\n/g) ?? []).length + ' lignes');
for (const p of CIBLES.filter((x) => x !== RF)) { const crlf = (V[p].match(/\r\n/g) ?? []).length, lf = (V[p].match(/\n/g) ?? []).length; ok(eol[p] === '\r\n' ? crlf === lf : crlf === 0, 'fins de ligne préservées : ' + p, eol[p] === '\r\n' ? 'CRLF' : 'LF'); }
arret();

// --- 3 et 4. Clone : versions écrites, synchronisation, simulation
dire('--- Clone jetable : versions, synchronisation du bloc d\'état, simulation');
const cl = cloner(root); let finaux = {};
try {
  for (const p of CIBLES) cl.ecrire(p, V[p]);
  ok(spawnSync(process.execPath, ['--check', cl.f(CPO)], { encoding: 'utf8' }).status === 0, 'node --check du contrôle du périmètre proposé');
  const ap = cl.lancer(W + 'sync-stable.mjs', '--apercu'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
  ok(ap.code === 0 && !!plan, 'aperçu de synchronisation calculé sur les versions proposées', ap.out.split('\n').pop().slice(0, 120));
  const app = cl.lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', plan); ok(app.code === 0, 'synchronisation appliquée dans le clone, au plan montré', plan + ' ; code ' + app.code + ' ; ' + app.out.split('\n').pop().slice(0, 100));
  for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) {
    const s = readFileSync(cl.f(p), 'utf8'); const bloc = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
    ok(s.replace(bloc, '') === V[p].replace(bloc, '') && s.match(bloc)[0] !== V[p].match(bloc)[0], 'synchronisation : seul le bloc a2-05:etat change : ' + p);
    ok(/377 sens arbitrés sur 377 ; 0 restent \(0 proposés\)/.test(s.match(bloc)[0]) && /45 rapports arbitrés identiques/.test(s.match(bloc)[0]), 'bloc synchronisé : 377 sur 377, 0 restant, 0 proposé ; 45 empreintes : ' + p);
    V[p] = s;
  }
  const ap2 = cl.lancer(W + 'sync-stable.mjs', '--apercu'); const vide = !readFileSync(cl.f(W + 'sync-stable-apercu.md'), 'utf8').split('\n').some((l) => /^[+-](?![+-])/.test(l));
  ok(ap2.code === 0 && vide, 'aperçu suivant vide', ap2.out.split('\n').pop().slice(0, 100));
  dire('--- Simulation de l\'état final (contrôles relancés dans le clone)');
  controler(cl, 'état final', ok, { tests: true, chemins: CIBLES, attendus: ['C9a', 'C9b'] });
  const rel = cl.lancer(W + 'controle-relais-allege.mjs', '--apres-application'); const L = rel.out.split('\n'); const c9a = L.find((l) => /^ÉCART\s+C9a/.test(l)) ?? '';
  ok(/45 rapports arbitrés identiques sur 45/.test(c9a), 'C9a : 45 empreintes identiques ; seul motif, le rapport arbitré de F hors du manifeste', c9a.slice(0, 160));
  ok(L.some((l) => /^conforme C8 /.test(l)) && L.some((l) => /juste\s+Q2 .*377\/377/.test(l)), 'C8 conforme : Q2 lit 377/377 dans le bloc synchronisé');
  const emp = cl.lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && emp.out === 'empreintes : 45 rapports contrôlés, identiques ; rapports arbitrés hors du manifeste : ' + RF, 'empreintes : 45 identiques ; hors du manifeste : le seul rapport F', emp.out.slice(0, 160));
  const cov = cl.lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /377 arbitrés, 0 proposés, 0 restants, sur 377/.test(cov.out), 'couverture : 377 arbitrés, 0 proposés, 0 restants', cov.out.slice(0, 70));
  const cpo = cl.lancer(CPO, '--sabotages'); ok(cpo.code === 0 && /\n29 conformes sur 29\n/.test(cpo.out) && /17 sabotages détectés sur 17/.test(cpo.out) && /témoin sain : conforme/.test(cpo.out), 'contrôle du périmètre opérationnel, état arbitré : 29 sur 29, 17 sabotages sur 17, témoin sain');
  const etat = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre}))"], { cwd: cl.C, encoding: 'utf8' }).stdout.trim();
  ok(etat === '{"arbitres":377,"restants":0,"proposes":0,"corrections":204,"entry":177,"libre":"V1-32"}', 'état calculé : 377 arbitrés, 0 restant ; 204 corrections dans 177 ENTRY ; V1-32', etat);
  // La nouvelle branche du contrôle du périmètre : le retour en proposition reste lisible ; un sens du bloc F qui sort de la couverture est refusé
  const rf = readFileSync(cl.f(RF), 'utf8');
  writeFileSync(cl.f(RF), rf.replace(/^\*\*Statut\*\* : \*\*arbitré le 2026-11-03\*\* \(§0\)\./m, '**Statut** : **proposition, non arbitrée.**'));
  const s1 = cl.lancer(CPO); ok(s1.code === 0, 'rapport F remis en proposition : la branche « avant arbitrage » reste conforme (17 restants = bloc F)', s1.out.split('\n').pop());
  writeFileSync(cl.f(RF), rf.replace(/^#### `v_401_s1` /m, '#### `v_401_sX` '));
  const s2 = cl.lancer(CPO); ok(s2.code !== 0, 'sabotage : fiche d\'examen d\'un sens du bloc F retirée du rapport arbitré : refusé', 'code ' + s2.code + ' ; ' + s2.out.split('\n').filter((l) => /ÉCART|Error/.test(l))[0]?.slice(0, 140));
  writeFileSync(cl.f(RF), rf);
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
ok(CIBLES.every((p) => M[p].depart === shaF(root, p)), 'fichiers visés du dépôt réel inchangés');
dire('manifeste de la proposition : ' + shaF(root, PROP + 'manifeste.json'));
writeFileSync(join(root, I + 'sortie-preparation.txt'), trace.join('\n') + '\n' + (ko ? 'préparation NON conforme' : 'préparation conforme') + '\n');
console.log(ko ? 'préparation NON conforme' : 'préparation conforme'); process.exit(ko ? 1 : 0);
