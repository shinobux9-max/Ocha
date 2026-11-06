// A2-05 · bloc F : préparation, SANS APPLICATION, de l'inscription du périmètre opérationnel accepté le 2026-11-03 et de la consignation §8.119.
// Dix fichiers, versions proposées écrites dans proposition/ (chemins reproduits), avec diffs, table et manifeste ; rien n'est écrit ailleurs.
// Rapport de périmètre : statut et §0 ; registre : tranche F planifiée, une seule livraison F ; C5c du relais et recalculs de T7, T8 et T9 : la tranche F
// planifiée remplace « suspendue » ; contrôle du périmètre : état accepté ; pilotage : bloc a2-05:etat recalculé (sync-stable), textes, prochaine action,
// journal ; bilan : §8.119 (mise en service du relais révisé et inscription). Remplacements ciblés, ancres uniques ; arrêt au premier écart ; refus si le dossier existe.
// Usage : node a2-05-travail/arbitrage-F/inscription-F/preparer-inscription-F.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { diffBrut } from '../moteur-application.mjs';
import { calculerEtat, blocEtat, remplacerBloc, localiser, ajouterLigneJournal, ajouterSectionBilan } from '../../sync-stable.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/inscription-F/', PROP = OUT + 'proposition/';
const REP = 'docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md', REG = W + 'registre-tranches.json', CTRL = W + 'controle-relais-allege.mjs', CPO = W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs';
const R7 = W + 'recalcul-T7-perimetre.mjs', R8 = W + 'recalcul-T8-perimetre.mjs', R9 = W + 'recalcul-T9-perimetre.mjs', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const sha = (b) => createHash('sha256').update(b).digest('hex'); const lire = (p) => readFileSync(join(root, p), 'utf8'); const LFs = (t) => t.replace(/\r\n/g, '\n');
const lignes = []; const ok = (b, l, d) => { const m = (b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : ''); console.log(m); lignes.push(m); if (!b) { console.log('ARRÊT avant écriture'); process.exit(1); } };
const style = (t) => { const c = (t.match(/\r\n/g) ?? []).length, l = (t.match(/\n/g) ?? []).length; return c === l && c ? 'CRLF' : c === 0 ? 'LF' : 'mixte'; };
const rendre = (p, t) => (style(lire(p)) === 'CRLF' ? t.replace(/\n/g, '\r\n') : t);
const remplacer = (p, t, paires) => { for (const [a, b] of paires) { ok(t.split(a).length === 2 && !t.includes(b), p + ' : ancre unique, remplacement absent', a.slice(0, 60).replace(/\n/g, ' ')); t = t.replace(a, () => b); } return t; };

// 1. Rapport de périmètre : statut et §0, proposition conservée
const S0 = [
  '## 0. Arbitrage', '',
  "Arbitrage du 2026-11-03 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **J'accepte le périmètre opérationnel du bloc F : 17 sens dans 15 ENTRY, lignes 361 à 377, sans ajout ni retrait.** »", '',
  "Décisions de périmètre : « 1. Réunir F1 (11 sens) et F2 (6 sens) dans une seule livraison F et un seul rapport d'audit. » « 2. Retenir deux verdicts distincts par sens : conformité de `interrogatif` selon A10 et justification du `type-nul` selon A6. » « 3. Examiner les catégories selon les règles ordinaires, sans présumer d'erreur. » « 4. Accepter les sept filtres d'A10 et leurs modalités proposées, notamment la correction de T2-serie. » « 5. **Activer X1** comme filtre complémentaire, non normatif, lors de la future recherche d'omissions. » « 6. Retenir l'ordre : audit des 17 sens, puis recherche d'omissions distincte sur les 807 sens non porteurs. »", '',
  "Recherche d'omissions : « Conserver la population des 807 sens et les huit filtres, X1 inclus. » « Ne lancer aucun filtre sur les données réelles pour l'instant. » « Prévoir une première exécution de mesure de couverture uniquement, avec décompte par filtre, déduplication, candidats et limites, sans relecture ni verdict. Son autorisation sera demandée séparément après l'audit des 17 sens. »", '',
  "« **Ne prendre aucun verdict lexical avant autorisation distincte d'ouverture de l'audit F.** »", '',
  "**Effets** : les questions 1 à 6 du §10 sont tranchées ; le registre des tranches porte la tranche F planifiée en une seule livraison F (F1 et F2 restent les subdivisions du découpage arbitré, qui n'est pas modifié) ; X1 sera appliqué à l'exécution de mesure (`omissions.mjs --avec-X1`), le module restant inchangé ; l'audit n'est pas ouvert ; aucun filtre n'est lancé ; aucune décision lexicale n'est prise. Le texte qui suit (§1 à §10) est la proposition, conservée telle qu'elle a été livrée.", '',
];
const rep = remplacer(REP, LFs(lire(REP)), [
  ['**Statut** : **proposition de périmètre opérationnel, non arbitrée.** Aucune fiche', "**Statut** : **périmètre opérationnel accepté le 2026-11-03 (§0).** La proposition est conservée telle qu'elle a été livrée. Aucune fiche"],
  ['\n## 1. Base normative\n', '\n' + S0.join('\n') + '## 1. Base normative\n'],
]);

// 2. Registre ; 3. C5c ; 4. recalculs ; 5. contrôle du périmètre
const reg = remplacer(REG, lire(REG), [['{ "id": "F", "livraisons": ["F1", "F2"], "statut": "suspendue", "condition": "suspendue au préalable E5" }', '{ "id": "F", "livraisons": ["F1", "F2"], "livraison": "F", "statut": "planifiée", "condition": "périmètre opérationnel accepté le 2026-11-03 : une seule livraison F, un seul rapport d\'audit ; audit ouvert sur autorisation distincte" }']]);
const C5C_AVANT = "ok('C5c', 'aucune tranche acceptée ni ouverte (« aucun périmètre de T1 »)', reg.tranches.every((t) => ['planifiée', 'suspendue'].includes(t.statut)) && reg.tranches.find((t) => t.id === 'F').statut === 'suspendue', reg.tranches.map((t) => t.id + ' ' + t.statut).join(', '));";
const C5C_APRES = [
  "// C5c : tranche F suspendue tant que son périmètre opérationnel n'est pas accepté ; ensuite planifiée en une seule livraison F, A10 étant adopté (inscription du 2026-11-03)",
  "const PERF = 'docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md', trF = reg.tranches.find((t) => t.id === 'F'), tPerF = existsSync(join(root, PERF)) ? lire(PERF) : '';",
  "const accF = /^\\*\\*Statut\\*\\* : \\*\\*périmètre opérationnel accepté le \\d{4}-\\d{2}-\\d{2} \\(§0\\)\\.\\*\\*/m.test(tPerF) && /^## 0\\. Arbitrage$/m.test(tPerF);",
  "ok('C5c', 'aucune tranche ouverte ; tranche F suspendue avant l\\'acceptation de son périmètre opérationnel, planifiée en une seule livraison F après (A10 adopté)', reg.tranches.every((t) => ['planifiée', 'suspendue'].includes(t.statut)) && (trF?.statut === 'suspendue' ? !accF : trF?.statut === 'planifiée' && accF && trF.livraison === 'F' && trF.livraisons.join() === 'F1,F2' && /^\\d{4}-/.test(dateA10)), reg.tranches.map((t) => t.id + ' ' + t.statut).join(', ') + ' ; périmètre de F ' + (accF ? 'accepté' : 'non accepté'));",
].join('\n');
const ctrl = remplacer(CTRL, lire(CTRL), [[C5C_AVANT, C5C_APRES]]);
const NOUV7 = "tr('F')?.statut === 'planifiée' && tr('F')?.livraison === 'F'";
const r7 = remplacer(R7, lire(R7), [['F = F1, F2, suspendue\n', 'F = F1, F2, une seule livraison F, planifiée (périmètre accepté le 2026-11-03)\n'], ["tr('F')?.statut === 'suspendue'", NOUV7], ['F (F1, F2, suspendue), disjointes de T7', 'F (F1, F2, livraison unique F, planifiée), disjointes de T7']]);
const r8 = remplacer(R8, lire(R8), [['F = F1, F2, suspendue ; aucun comparable du bloc F\n', 'F = F1, F2, une seule livraison F, planifiée (périmètre accepté le 2026-11-03) ; aucun comparable du bloc F\n'], ["tr('F')?.statut === 'suspendue'", NOUV7], ['F (F1, F2, suspendue), disjointes de T8', 'F (F1, F2, livraison unique F, planifiée), disjointes de T8']]);
const r9 = remplacer(R9, lire(R9), [["reg.find((t) => t.id === 'F')?.statut === 'suspendue'", "reg.find((t) => t.id === 'F')?.statut === 'planifiée' && reg.find((t) => t.id === 'F')?.livraison === 'F'"], ['; F suspendue ;', '; F planifiée, livraison unique ;']]);
const cpo = remplacer(CPO, lire(CPO), [
  ["ok(/\\*\\*proposition de périmètre opérationnel, non arbitrée\\.\\*\\*/.test(D.rep) && !/^## 0\\. Arbitrage/m.test(D.rep), 'rapport en proposition, sans §0');",
    "ok(/^\\*\\*Statut\\*\\* : \\*\\*périmètre opérationnel accepté le 2026-11-03 \\(§0\\)\\.\\*\\* La proposition est conservée telle qu'elle a été livrée\\./m.test(D.rep) && /^## 0\\. Arbitrage$/m.test(D.rep) && [\"J'accepte le périmètre opérationnel du bloc F : 17 sens dans 15 ENTRY, lignes 361 à 377, sans ajout ni retrait.\", '**Activer X1**', \"Ne prendre aucun verdict lexical avant autorisation distincte d'ouverture de l'audit F.\"].every((q) => D.rep.includes(q)), 'rapport accepté le 2026-11-03, §0 d\\'arbitrage présent, proposition conservée');"],
  ["ok(t?.statut === 'suspendue' && JSON.stringify(t.livraisons) === '[\"F1\",\"F2\"]', 'registre des tranches inchangé : F (F1, F2), suspendue');",
    "ok(t?.statut === 'planifiée' && t.livraison === 'F' && JSON.stringify(t.livraisons) === '[\"F1\",\"F2\"]', 'registre des tranches : F planifiée, une seule livraison F (F1, F2)');"],
  ["'statut arbitré': (d) => { d.rep = d.rep.replace('**proposition de périmètre opérationnel, non arbitrée.**', '**périmètre accepté.**'); },",
    "'statut ramené à la proposition': (d) => { d.rep = d.rep.replace(/^\\*\\*Statut\\*\\* : [^\\n]*$/m, '**Statut** : **proposition de périmètre opérationnel, non arbitrée.**'); },"],
  ["'registre modifié': (d) => { d.registre.find((x) => x.id === 'F').statut = 'planifiée'; },", "'registre revenu à « suspendue »': (d) => { d.registre.find((x) => x.id === 'F').statut = 'suspendue'; },"],
]);

// 6. Pilotage : textes communs, prochaine action, bloc recalculé avec la tranche F planifiée, journal
const PA = "- **Prochaine action.** L'audit des 17 sens du bloc F, en une seule livraison F (`docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md`, §0), deux verdicts par sens (`interrogatif` selon A10, `type-nul` selon A6), sur autorisation distincte d'ouverture ; dossier de lecture préparé, sans verdict (`a2-05-travail/audit-F/dossier-F.md`). Puis, sur autorisation distincte, une exécution de mesure de couverture des huit filtres, X1 compris, sur les 807 sens non porteurs, sans relecture ni verdict ; puis la recherche d'omissions, distincte des 377. Le commit de l'installation d'A10, qui lève l'écart temporaire de C9b, sur autorisation distincte. Puis, chacun sur autorisation distincte : le statut de T1 et de T2 dans `registre-tranches.json`, sur arbitrage distinct ; la correction retenue en principe de `tools/export-relecture.mjs` (A2-GLOBAL-v1). Aucune correction lexicale n'est appliquée. Aucun `git add`, commit ni push sans autorisations distinctes.";
const COMMUNS = [
  ['; bilan du volet 2, §8.106 à §8.118) (relais', "; **relais révisé mis en service le 2026-11-03** (version figée 2, `a2-05-travail/versions-finales-2/manifeste.json`, et contrôle coordonné : Q7 constate le statut normatif d'A10) ; **périmètre opérationnel du bloc F accepté le 2026-11-03**, sans ajout ni retrait (`docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md`, §0 : 17 sens, 15 ENTRY, lignes 361 à 377 ; une seule livraison F ; deux verdicts par sens ; X1 activé pour la future recherche d'omissions ; registre, C5c et recalculs de T7 à T9 adaptés ; audit non ouvert) ; bilan du volet 2, §8.106 à §8.119) (relais"],
  ['dont 17 dans le bloc F, suspendu ;', 'dont 17 dans le bloc F, au périmètre accepté le 2026-11-03 ;'],
  ["**Blocage : le bloc F (17 sens portant `interrogatif`) est suspendu**\n  au préalable E5, qui doit aboutir avant la clôture de l'étape 2, selon une séquence arbitrée :\n  adoption explicite de l'addendum, faite le 2026-11-03 ; puis périmètre opérationnel de contrôle, validé ; puis examen",
    "**Le bloc F (17 sens portant `interrogatif`) n'est plus suspendu** : le\n  préalable E5 a suivi la séquence arbitrée : adoption explicite de l'addendum, faite le 2026-11-03 ;\n  puis périmètre opérationnel de contrôle, accepté le 2026-11-03 (une seule livraison F) ; puis examen"],
];
const PROPRES = { [ETAT]: [], [ROAD]: [['addendum A10 installé, non committé)', 'addendum A10 installé, non committé ; relais révisé ; périmètre du bloc F accepté)']] };
const LIGNE_J = "| 2026-11-03 | 2 · A2-05 | **Relais révisé mis en service** (version figée 2 et contrôle coordonné, sur autorisation, une exécution : Q7 « oui », 29 sur 30, C9b seul) ; **périmètre opérationnel du bloc F accepté** : 17 sens, 15 ENTRY, lignes 361 à 377, une seule livraison F, deux verdicts par sens, X1 activé pour la future recherche d'omissions ; registre, C5c du relais et recalculs de T7 à T9 adaptés ; dossier d'audit préparé, audit non ouvert, aucun filtre lancé ; §8.119. **360/377, 17 restants, tous du bloc F ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 45 empreintes.** | non committé |";
const v = calculerEtat(root); const tf = v.tranches.find((t) => t.id === 'F'); ok(tf?.statut === 'suspendue' && tf.sens === 17, 'bloc : tranche F calculée, 17 sens, suspendue avant inscription'); tf.statut = 'planifiée'; const BLOC = blocEtat(v);
const pilote = (p) => {
  let t = remplacer(p, LFs(lire(p)), [...COMMUNS, ...PROPRES[p]]);
  ok(t.split('\n').filter((l) => l.startsWith('- **Prochaine action.**')).length === 1, p + ' : « Prochaine action » unique');
  t = t.split('\n').map((l) => (l.startsWith('- **Prochaine action.**') ? PA : l)).join('\n');
  if (p === ETAT) t = LFs(ajouterLigneJournal(t, LIGNE_J));
  return remplacerBloc(rendre(p, t), BLOC);
};

// 7. Bilan : §8.119
const S8119 = [
  "Décisions (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : « J'autorise exclusivement la mise en service de la version figée 2 du relais et du contrôle coordonné, sur les deux fichiers prévus » ; « J'accepte le périmètre opérationnel du bloc F : 17 sens dans 15 ENTRY, lignes 361 à 377, sans ajout ni retrait. » L'inscription et cette consignation ont été préparées sans application, puis appliquées sur autorisation distincte.",
  '',
  "**Relais révisé mis en service le 2026-11-03.** `a2-05-travail/versions-finales-2/application/appliquer.mjs`, essayé sur copie jetable, lancé une fois, code 0 : `docs/relecture/reprise-A2-05.md` = version figée 2 (`c3bdc60ae05398bafa783ef4931a295be79d0defb4798a9f370d87f2c36b0b55`), chaînée au manifeste de la version 1, qui reste intacte ; `a2-05-travail/controle-relais-allege.mjs` = contrôle coordonné (`ba0714432d2ef03a0f002d2ab6271ca853c5857582d0bc91e020dcb6affb7ac3`). Q7 constate le statut normatif d'A10 ; C4, C5e, C9c, C10a et C10b conformes ; relais à 29 sur 30, C9b seul ; seconde exécution refusée. L'ancienne correction isolée de C5e et Q7 n'est pas appliquée.",
  '',
  "**Périmètre opérationnel du bloc F accepté le 2026-11-03** (`docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md`, §0, proposition conservée) : 17 sens, 15 ENTRY, lignes 361 à 377, sans ajout ni retrait ; **une seule livraison F** et un seul rapport d'audit ; **deux verdicts par sens** : `interrogatif` selon A10, `type-nul` selon A6 ; catégories selon les règles ordinaires, sans présumer d'erreur ; sept filtres d'A10 acceptés, avec la correction de T2-serie ; **X1 activé** comme filtre complémentaire, non normatif, pour la future recherche d'omissions ; ordre : audit des 17, puis recherche d'omissions sur les 807 sens non porteurs ; une première exécution de mesure de couverture seulement, demandée après l'audit.",
  '',
  "**Inscription.** `a2-05-travail/registre-tranches.json` : tranche F « planifiée », livraison unique `F`, livraisons du découpage F1 et F2 conservées ; le découpage arbitré n'est pas modifié. C5c du relais : la tranche F est suspendue tant que son périmètre n'est pas accepté, planifiée en une seule livraison F ensuite. Recalculs de T7, T8 et T9 : leur frontière avec F lit le nouveau statut. Contrôle du périmètre opérationnel : état accepté. Bloc `a2-05:etat` recalculé, F « planifiée ». Le rapport accepté n'entre pas au manifeste d'empreintes : son nom ne relève pas du motif des périmètres de tranche (`([A-F]|T)\\d+-perimetre.md`), et C9a n'en dépend pas.",
  '',
  "**Dossier d'audit préparé, sans verdict** : `a2-05-travail/audit-F/dossier-F.md` (15 fiches sources complètes, 45 anciens exemples, 42 décisions historiques dont 17 `type-nul`, 9 corrections de nuance retenues ; grille vide).",
  '',
  "**Références conservées, non modifiées** : `CLAUDE.md`, §5, garde sa description périmée d'E5, comme reste documentaire ; les autres mentions datées du relais relèvent d'une maintenance séparée.",
  '',
  "Aucune correction lexicale n'est appliquée ; l'audit F n'est pas ouvert ; aucun filtre n'est lancé. Décomptes : 360/377, 17 restants, tous du bloc F ; 204 corrections dans 177 ENTRY ; V1-32 libre ; 45 empreintes. Aucun `git add`, commit ni push.",
].join('\n');
const bil = ajouterSectionBilan(lire(BIL), 119, 'Volet 1, lot 3 : relais révisé mis en service ; périmètre opérationnel du bloc F accepté et inscrit (2026-11-03)', S8119);

ok(!existsSync(join(root, PROP)), 'dossier de proposition absent, préparation jamais lancée');
const P = { [REP]: rendre(REP, rep), [REG]: reg, [CTRL]: ctrl, [R7]: r7, [R8]: r8, [R9]: r9, [CPO]: cpo, [ETAT]: pilote(ETAT), [ROAD]: pilote(ROAD), [BIL]: bil };
// Vérifications avant écriture
const blocs = [ETAT, ROAD].map((p) => localiser(P[p]).corps); ok(blocs[0] === blocs[1] && blocs[0].includes('F (F1, F2 ; 17 sens ; planifiée)'), 'blocs a2-05:etat identiques, tranche F planifiée');
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**')); ok(pa(P[ETAT]) === pa(P[ROAD]) && /\.md`/.test(PA) && /autorisation/.test(PA) && /T1/.test(PA) && /Aucun `git add`, commit ni push/.test(PA), '« Prochaine action » identique, lisible par C5f');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2} \| /.test(l)); ok(jr(P[ETAT]).length === jr(lire(ETAT)).length + 1 && jr(lire(ETAT)).every((l) => jr(P[ETAT]).includes(l)), 'journal : lignes antérieures conservées, une ajoutée');
const b0 = lire(BIL).replace(/(\r?\n)+$/, ''); ok(P[BIL].startsWith(b0) && P[BIL].slice(b0.length).split('### 8.').length === 2, 'bilan : §8.118 et antérieur inchangés, §8.119 seul ajouté');
for (const p of [ETAT, ROAD]) { const e = LFs(P[p]); const enC = e.slice(e.indexOf('## Étape en cours'), e.indexOf('**Tâche précédente, terminée')); ok(p === ROAD || ['QC-1', 'QC-2', 'HP-1 à HP-4', 'G1', 'bloc F', 'E5'].every((s) => enC.includes(s)), p + ' : chantiers lus par C5d présents'); }
for (const p of Object.keys(P)) ok(style(P[p]) !== 'mixte' && style(P[p]) === style(lire(p)), 'fins de ligne préservées : ' + p, style(P[p]));
ok(!Object.values(P).some((t) => t.includes(root)), 'aucun chemin de machine');

mkdirSync(join(root, PROP, 'diffs'), { recursive: true }); const tab = [], man = {};
for (const [p, t] of Object.entries(P)) {
  mkdirSync(dirname(join(root, PROP + p)), { recursive: true }); writeFileSync(join(root, PROP + p), t);
  const r = diffBrut(root, p, PROP + p); const nom = p.replaceAll('/', '__') + '.diff'; ok(r.status === 1, 'diff écrit : ' + p); writeFileSync(join(root, PROP, 'diffs', nom), r.stdout);
  const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length;
  man[p] = { depart: sha(readFileSync(join(root, p))), propose: sha(Buffer.from(t, 'utf8')), diff: sha(r.stdout) };
  tab.push('| `' + p + '` | `' + man[p].depart.slice(0, 16) + '…` | `' + man[p].propose.slice(0, 16) + '…` | `' + man[p].diff.slice(0, 16) + '…` | +' + n('+') + ' / −' + n('-') + ' |');
}
writeFileSync(join(root, PROP, 'manifeste.json'), JSON.stringify(man, null, 1) + '\n');
writeFileSync(join(root, PROP, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n');
writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n'); console.log(tab.join('\n')); console.log('préparation de l\'inscription conforme, non appliquée ; manifeste ' + sha(readFileSync(join(root, PROP, 'manifeste.json'))));
