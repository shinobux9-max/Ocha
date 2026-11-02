// A2-05 · volet 1 · lot 3 : préparation de la formalisation documentaire de la protection de T5 (deux contrôles adaptés à la 36e empreinte,
// périmètre accepté au manifeste, bloc d'état synchronisé), EN PROPOSITION : aucun document réel n'est modifié.
// Usage : node a2-05-travail/arbitrage-T5/preparer-formalisation-protection-T5.mjs <racine du dépôt>
// (1) Versions proposées, par remplacements ciblés (chaque ancre présente exactement une fois) : ETAT-ACTUEL.md et ROADMAP.md (rubrique
// « Proposé, non validé », « Prochaine action », à l'identique) ; journal (ETAT-ACTUEL.md seul) ; bilan du volet 2 (§8.94 ajouté à la fin, sans
// ligne de tableau) ; inventaire des scripts (ligne de controle-bilan-pilote.mjs ; lignes des scripts de T5). Fins de ligne conservées.
// (2) Écriture dans arbitrage-T5/formalisation-protection/ (refus si le dossier existe), avec les différences exactes. (3) Essai dans un clone
// git jetable recouvert de l'arbre de travail : relais 30 sur 30, aperçu vide, 36 empreintes, contrôle du bilan du pilote et recalcul de T5
// conformes, couverture inchangée. (4) Dépôt réel inchangé. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T5/formalisation-protection';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = 'a2-05-travail/INVENTAIRE-SCRIPTS.md';
const DOCS = [ETAT, ROAD, BIL, INV];
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex'); const shaT = (t) => createHash('sha256').update(t).digest('hex');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const avant = Object.fromEntries([...DOCS, 'a2-05-travail/empreintes-rapports-arbitres.json'].map((p) => [p, sha(join(root, p))]));
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const remplacer = (t, doc, ancre, nouveau) => { const n = t.split(ancre).length - 1; if (n !== 1) arret(doc + ' : ancre présente ' + n + ' fois : ' + ancre.slice(0, 80) + '…'); return t.replace(ancre, () => nouveau); };

// (a) Rubriques, à l'identique dans ETAT-ACTUEL.md et ROADMAP.md
const A_RUB = 'audit des 22 sens non autorisé (bilan du volet 2, §8.93)';
const N_RUB = A_RUB + ' ; **consolidation documentaire de T5 acceptée le 2026-10-25** ; **contrôle du bilan du pilote et recalcul de T5 adaptés à la 36e empreinte le 2026-10-25**, sur autorisations distinctes (`de5dfa89…` → `fd30fcaa…` ; `debe3373…` → `53ca95bb…` ; départs sauvegardés dans `a2-05-travail/arbitrage-T5/depart/` ; entrée vers un fichier absent rendue comme écart ; 29 sabotages sur 29) ; **périmètre accepté de T5 ajouté au manifeste le 2026-10-25**, sur autorisation (`--ajouter` une fois : 36 entrées, les 35 précédentes inchangées ; second `--ajouter` refusé) ; **bloc d\'état synchronisé le 2026-10-25**, sur autorisation (plan `27dd9e6477fd0306` ; aperçu suivant vide) ; **relais 30 sur 30** ; **consolidation technique de T5 achevée** ; audit des 22 sens non autorisé (bilan du volet 2, §8.94)';
const A_PA = /^- \*\*Prochaine action\.\*\* L'intégration du périmètre accepté de T5 au manifeste [^\r\n]*/m;
const N_PA = '- **Prochaine action.** L\'ouverture de l\'audit individuel des 22 sens de T5, sur autorisation distincte, dans les frontières du §0 du périmètre (`docs/rapports/etape2-A2-05-volet1-lot3-T5-perimetre.md`) ; puis, chacun sur autorisation distincte : le statut de T1 et de T2 dans `registre-tranches.json`, sur arbitrage distinct ; la décision sur le défaut « RES » de T9, à part ; la correction retenue en principe de `tools/export-relecture.mjs` (A2-GLOBAL-v1) ; l\'arbitrage normatif distinct de la proposition d\'addendum. Aucune correction lexicale n\'est appliquée. Aucun `git add`, commit ni push sans autorisations distinctes.';
const rubriques = (t, doc) => { t = remplacer(t, doc, A_RUB, N_RUB); const m = t.match(new RegExp(A_PA.source, 'gm')) ?? []; if (m.length !== 1) arret(doc + ' : « Prochaine action » présente ' + m.length + ' fois'); return t.replace(A_PA, () => N_PA); };

// (b) Journal d'ETAT-ACTUEL.md
const J4 = '| 2026-10-25 | 2 · A2-05 | **Consolidation documentaire de T5 appliquée et acceptée** (périmètre accepté, §0 inscrit ; pilotage ; §8.93 ; relais 29 sur 30, C9a attendu). **Contrôle du bilan du pilote adapté**, sur autorisation (`de5dfa89…` → `fd30fcaa…` ; diff réel identique au diff relu ; départ `a2-05-travail/arbitrage-T5/depart/controle-bilan-pilote-avant-T5.mjs`) : deux écarts attendus avant l\'ajout. **Recalcul de T5 adapté**, sur autorisation (`debe3373…` → `53ca95bb…` ; départ `…/depart/recalcul-T5-perimetre-avant-T5.mjs`) : un écart attendu avant l\'ajout ; entrée vers un fichier absent rendue comme écart, non comme exception. **Périmètre accepté de T5 au manifeste**, sur autorisation : `--ajouter` une fois, **36 entrées**, les 35 précédentes inchangées ; second `--ajouter` refusé ; contrôle 29 sur 29, recalcul 16 sur 16 ; 29 sabotages sur 29 sur copie ; relais 30 sur 30. **Bloc d\'état synchronisé**, sur autorisation (plan `27dd9e6477fd0306`, identique à l\'aperçu relu ; marqueur `5f5f6cd5f9a5171e` → `be3d54d0c7265b98`, « 35 » → « 36 rapports » ; aperçu suivant vide). Assemblage 684, 35, 0 ; zones protégées, index et `git diff --check` conformes. **Consolidation technique de T5 achevée.** Audit des 22 sens non autorisé. Bilan du volet 2, §8.94. **252/377 ; bloc B 148/148 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-24 libre ; 36 empreintes.** | non committé |';
const journal = (t) => { const eol = t.includes('\r\n') ? '\r\n' : '\n'; const L = t.split(eol); let k = L.length - 1; while (k >= 0 && L[k] === '') k--; if (!/^\| 2026-10-25 \| 2 · A2-05 \| \*\*Formalisation de la consolidation de T4 appliquée\*\*/.test(L[k])) arret(ETAT + ' : dernière ligne du journal inattendue'); L.splice(k + 1, 0, J4); return L.join(eol); };

// (c) Bilan du volet 2 : §8.94
const S894 = [
  '### 8.94 Volet 1, lot 3 : contrôle du bilan du pilote et recalcul de T5 adaptés ; périmètre accepté de T5 au manifeste (36e entrée) ; bloc d\'état synchronisé ; consolidation technique de T5 achevée (2026-10-25)',
  '',
  'Décisions du 2026-10-25 (ChatGPT, par délégation ; relayées par l\'utilisateur) : « J\'accepte la consolidation documentaire de T5 déjà appliquée. » ; « **J\'autorise trois opérations distinctes et successives**, sous réserve de la conformité de chaque étape » (remplacement du contrôle du bilan du pilote ; remplacement du recalcul de T5 ; ajout du seul périmètre de T5 au manifeste) ; puis, après relecture, « Les trois opérations de protection de T5 sont acceptées » et la synchronisation du bloc d\'état, autorisée à part ; la formalisation est préparée sans application, sur autorisation distincte.',
  '',
  '**Contrôle du bilan du pilote** : empreintes vérifiées avant écriture (en service `de5dfa8980b4…`, proposition `fd30fcaa127d…`) ; diff réel identique octet pour octet au diff relu (40 lignes) ; départ sauvegardé (`a2-05-travail/arbitrage-T5/depart/controle-bilan-pilote-avant-T5.mjs`) ; script installé identique à la proposition ; `node --check` code 0 ; sur l\'état à 35 entrées, exactement les deux écarts attendus (périmètre de T5 hors du manifeste ; 35 entrées au lieu de 36). Contrôles historiques et de T4 conservés à l\'identique ; ajoutés : proposition sauvegardée de T5 (22 sens, D2 11, D3 11, sans §0) ; périmètre accepté ne différant de sa proposition que par le statut et le §0 ; périmètre protégé au manifeste ; registre vérifié jusqu\'à T5 ; 36 empreintes.',
  '',
  '**Recalcul de T5** : empreintes (`debe33734469…`, `53ca95bb61d0…`) ; diff réel identique au diff relu (33 lignes) ; départ sauvegardé (`a2-05-travail/arbitrage-T5/depart/recalcul-T5-perimetre-avant-T5.mjs`) ; script installé identique à la proposition ; `node --check` code 0 ; seul écart, la 36e empreinte absente. Ajoutés : périmètre accepté (§0), identique à la proposition hors du statut et du §0 ; manifeste à 36 entrées, T5 en 36e ; une entrée vers un fichier absent est rendue comme écart explicite, non comme exception (cas N8, vérifié sur copie). Le défaut avait été relevé au troisième des quatre lancements des essais de la proposition et corrigé dans la proposition, avant relecture.',
  '',
  '**Périmètre accepté de T5 au manifeste** : préalables conformes (35 empreintes identiques ; périmètre de T5 seul document accepté hors du manifeste ; périmètre identique à la version relue, `3f635e373ec2…`) ; `node a2-05-travail/empreintes-lot3.mjs . --ajouter` une fois, code 0 : **36 entrées**, les 35 précédentes identiques en valeur et en ordre, un ajout daté du 2026-10-25 ; second `--ajouter` refusé, manifeste inchangé. Après l\'ajout : contrôle du bilan du pilote 29 sur 29 ; recalcul de T5 16 sur 16 ; relais 30 sur 30 (C9a redevenu conforme) ; **29 sabotages sur copie**, tous détectés par les scripts installés (disparition du périmètre au manifeste et du fichier, empreinte, corps, §0, statut, proposition sauvegardée, entrée fictive, registre ; rapports antérieurs T1, T3, T4 et périmètre de T4 ; protections historiques et de T4 ; données publiées), témoins sains conformes.',
  '',
  '**Synchronisation** : aperçu relancé, plan `27dd9e6477fd0306`, identique octet pour octet à l\'aperçu relu ; lignes modifiées toutes dans les blocs `a2-05:etat` (`ETAT-ACTUEL.md`, 23 et 27 ; `ROADMAP.md`, 614 et 618) : marqueur `5f5f6cd5f9a5171e` → `be3d54d0c7265b98`, « 35 » → « 36 rapports arbitrés identiques » ; `--appliquer --plan 27dd9e6477fd0306`, code 0 ; aperçu suivant vide ; blocs identiques. **Vérifications** : relais 30 sur 30 ; 36 empreintes ; contrôle 29 sur 29 ; recalcul 16 sur 16 ; couverture 252/377, 125 restants ; 196 corrections dans 172 ENTRY, V1-22 et V1-23 réservés, V1-24 libre ; zones protégées sans modification ; `git diff --check` code 0 ; index vide.',
  '',
  '**Erratum** (relevé lors de la préparation de ce paragraphe) : le §8.93 et la note d\'export du périmètre de T5 disent du recalcul indépendant initial qu\'il est « conforme (12 contrôles) » ; sa sortie conservée en compte **15**, tous conformes. Le §8.93, validé, n\'est pas modifié ; la présente mention le corrige.',
  '',
  '**États du relais, conservés** : 29 sur 30 après la consolidation (C9a : périmètre accepté hors du manifeste) ; 30 sur 30 après l\'ajout ; 30 sur 30 après la synchronisation. Puis rubrique d\'état et « Prochaine action » actualisées par remplacements ciblés, hors du bloc, ligne de journal et inventaire des scripts ; relais figé non réécrit.',
  '',
  '**Consolidation technique de T5 achevée** (périmètre accepté, §0 inscrit, protégé au manifeste ; contrôles adaptés ; bloc synchronisé). L\'audit lexical des 22 sens n\'est pas autorisé. Aucune des 196 corrections retenues n\'est appliquée ; aucun `git add`, commit ni push.',
];
const bilan = (t) => { if (!/^### 8\.93 /m.test(t) || /^### 8\.94 /m.test(t)) arret(BIL + ' : §8.93 absent ou §8.94 déjà présent'); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S894.join(eol) + eol; };

// (d) Inventaire des scripts
const A_INV1 = 'protégé au manifeste ; condition du registre ; 35 empreintes |';
const N_INV1 = 'protégé au manifeste ; périmètre de T5 accepté : égal à sa proposition sauvegardée hors du statut et du §0, 22 sens (D2, D3), protégé au manifeste ; condition du registre (T1 à T5) ; 36 empreintes |';
const A_INV2 = 'puis conforme après l\'ajout de la 35e entrée ; 19 sabotages sur 19 |';
const N_INV2 = 'puis conforme après l\'ajout de la 35e entrée ; 19 sabotages sur 19 ; remplacée le 2026-10-25 par la version adaptée au périmètre accepté de T5 (`fd30fcaa…` ; version remplacée sauvegardée dans `arbitrage-T5/depart/controle-bilan-pilote-avant-T5.mjs`) : 2 écarts attendus sur l\'état à 35 entrées, puis 29 sur 29 après l\'ajout de la 36e entrée ; 29 sabotages sur 29 |';
const A_INV3 = /^\| `arbitrage-T4\/preparer-formalisation-T4\.mjs` \|[^\r\n]*/m;
const LIGNES_INV = [
  '| `perimetre-T5.mjs` | périmètre opérationnel de T5 (D2, D3) : configuration (autorisation, 11 risques rédigés, sans verdict) passée au générateur v2, non modifié ; constante `ARBITRAGE` renseignée le 2026-10-25 (périmètre accepté, frontières de l\'audit) | `docs/rapports/etape2-A2-05-volet1-lot3-T5-perimetre.md` | lancé le 2026-10-25, code 0 : 22 sens, 18 ENTRY ; essai préalable hors du dépôt, identique hors du §6.4 ; régénération avec `ARBITRAGE` dans un clone jetable : seuls le statut et le §0 changent |',
  '| `recalcul-T5-perimetre.mjs` | recalcul indépendant du périmètre de T5 (n\'importe aucun module v2) : découpage, contiguïté, doublons, sens non encore examinés, inventaire des 125 restants par livraison et par tranche (option `--inventaire`), catégories et types publiés, deixis restante, décisions par ENTRY, corrections, comparables du lot 1 ; version adaptée : périmètre accepté (§0), manifeste à 36 entrées | — (lecture seule) | version initiale (`debe33734469…`, sauvegardée dans `arbitrage-T5/depart/`) : 15 sur 15 le 2026-10-25 ; remplacée le 2026-10-25 par la version adaptée (`53ca95bb61d0…`) : 16 sur 16 après l\'ajout de la 36e entrée |',
  '| `arbitrage-T5/preparer-consolidation-T5.mjs` | préparation de la consolidation de T5 (§0 par `ARBITRAGE`, pilotage, §8.93), sans application ; simulation dans un clone jetable : étape A (consolidation seule), étape B (ajout simulé au manifeste) | `arbitrage-T5/consolidation/` (versions proposées, manifeste simulé, différences, aperçu de l\'étape B) | lancé le 2026-10-25, code 0 ; versions appliquées le même jour, sur autorisation, identiques aux versions relues |',
  '| `arbitrage-T5/proposition-controle-bilan-pilote-T5.mjs` | adaptation du contrôle du bilan du pilote au périmètre accepté de T5 et à la 36e entrée, **appliquée le 2026-10-25** (`fd30fcaa…`) | — (lecture seule) | 2 écarts attendus sur l\'état à 35 entrées ; conforme sur copie à 36 entrées ; 29 sabotages sur 29 (proposition, puis script installé) |',
  '| `arbitrage-T5/proposition-recalcul-T5-perimetre.mjs` | adaptation du recalcul de T5 au périmètre accepté et protégé, **appliquée le 2026-10-25** (`53ca95bb…`) | — (lecture seule) | 1 écart attendu sur l\'état à 35 entrées ; conforme sur copie à 36 entrées ; défaut N8 (arrêt par exception) relevé au troisième lancement des essais et corrigé avant relecture |',
  '| `arbitrage-T5/proposition-T5-perimetre.md`, `arbitrage-T5/depart/` | proposition livrée du périmètre de T5 (`ee014eb7d33e…`, lue par les deux contrôles) ; versions de départ sauvegardées avant la consolidation et avant le remplacement des deux contrôles | — (sauvegardes) | écrites le 2026-10-25, avant chaque écriture autorisée |',
  '| `arbitrage-T5/preparer-formalisation-protection-T5.mjs` | préparation de la formalisation de la protection de T5, sans application : versions proposées d\'`ETAT-ACTUEL.md`, de `ROADMAP.md`, du bilan du volet 2 et de cet inventaire, par remplacements ciblés ; essai dans un clone git jetable ; dépôt réel inchangé | `arbitrage-T5/formalisation-protection/` (versions proposées et différences) | lancé le 2026-10-25 (note d\'export de la synchronisation à 36 empreintes) |',
];
const inventaire = (t) => {
  t = remplacer(t, INV, A_INV1, N_INV1); t = remplacer(t, INV, A_INV2, N_INV2);
  const eol = t.includes('\r\n') ? '\r\n' : '\n'; const m = t.match(new RegExp(A_INV3.source, 'gm')) ?? [];
  if (m.length !== 1) arret(INV + ' : ligne de preparer-formalisation-T4.mjs présente ' + m.length + ' fois');
  return t.replace(A_INV3, (l) => [l, ...LIGNES_INV].join(eol));
};

// (1)-(2) Versions proposées et différences
const prop = { [ETAT]: journal(rubriques(lire(ETAT), ETAT)), [ROAD]: rubriques(lire(ROAD), ROAD), [BIL]: bilan(lire(BIL)), [INV]: inventaire(lire(INV)) };
mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
for (const p of DOCS) {
  const nom = p.split('/').pop(); writeFileSync(join(root, OUT, nom), prop[p]);
  const d = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + '/' + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  writeFileSync(join(root, OUT, 'diffs', nom + '.diff'), d.stdout);
  const n = (c) => d.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length;
  ok(d.status === 1 && prop[p].includes('\r\n') === lire(p).includes('\r\n'), 'proposé : ' + p, '+' + n('+') + ' / -' + n('-') + ' lignes ; fins de ligne ' + (lire(p).includes('\r\n') ? 'CRLF' : 'LF') + ' conservées ; ' + shaT(prop[p]).slice(0, 12) + '…');
}
const pa = (t) => (t.match(/^- \*\*Prochaine action\.\*\*[^\r\n]*/m) ?? [''])[0];
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]) === N_PA, '« Prochaine action » identique dans les deux documents proposés');
const seg = (t) => t.slice(t.indexOf('- **Terminé et arbitré.**'), t.indexOf('- **Prochaine action.**')).replace(/\r/g, '');
ok(seg(prop[ETAT]) === seg(prop[ROAD]), 'rubriques « Terminé et arbitré » à « Reste à faire » identiques dans les deux documents proposés');
ok(!S894.some((l) => /^\| /.test(l)), '§8.94 : aucune ligne de tableau (comptage des corrections et des réservations inchangé)');

// (3) Essai dans un clone git jetable
const tmp = mkdtempSync(join(tmpdir(), 'ocha-formalisation-t5-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
for (const p of DOCS) writeFileSync(join(C, p), prop[p]);
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const rel = lancer('a2-05-travail/controle-relais-allege.mjs', '--apres-application');
ok(rel.code === 0 && /30 conformes sur 30/.test(rel.out), 'essai : relais --apres-application', rel.out.split('\n').pop() + ' ; ' + (rel.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).join(' | ') || 'aucun écart'));
const ap = lancer('a2-05-travail/sync-stable.mjs', '--apercu'); const apt = readFileSync(join(C, 'a2-05-travail/sync-stable-apercu.md'), 'utf8');
ok(ap.code === 0 && !/^@@/m.test(apt), 'essai : aperçu de synchronisation vide', ap.out);
const em = lancer('a2-05-travail/empreintes-lot3.mjs'); ok(em.code === 0 && /36 rapports contrôlés, identiques$/.test(em.out), 'essai : manifeste', em.out);
const cb = lancer('a2-05-travail/controle-bilan-pilote.mjs'); ok(cb.code === 0 && /contrôle conforme$/.test(cb.out), 'essai : contrôle du bilan du pilote', cb.out.split('\n').pop());
const rc = lancer('a2-05-travail/recalcul-T5-perimetre.mjs'); ok(rc.code === 0 && /recalcul conforme$/.test(rc.out), 'essai : recalcul de T5', rc.out.split('\n').pop());
const cv = lancer('a2-05-travail/couverture-lot3.mjs'); ok(cv.code === 0 && /252 arbitrés, 0 proposés, 125 restants, sur 377 ; bloc B : 148\/148/.test(cv.out), 'essai : couverture', cv.out.slice(0, 90));
rmSync(tmp, { recursive: true, force: true });

// (4) Dépôt réel inchangé
const ch = Object.keys(avant).filter((p) => sha(join(root, p)) !== avant[p]);
ok(ch.length === 0, 'dépôt réel inchangé (documents de pilotage, bilan, inventaire, manifeste)', ch.join(', ') || 'aucune modification');
console.log(ko ? ko + ' écart(s)' : 'préparation conforme');
process.exit(ko ? 1 : 0);
