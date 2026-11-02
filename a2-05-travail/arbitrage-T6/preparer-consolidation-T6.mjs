// A2-05 · volet 1 · lot 3 : préparation de la consolidation documentaire du périmètre accepté de T6 et de la clôture de T5, avec l'adaptation
// des trois contrôles qui exigent 37 empreintes, EN PROPOSITION : aucun fichier concerné n'est modifié (rapport de périmètre, configuration,
// documents de pilotage, bilan, contrôles, manifeste, registre).
// Usage : node a2-05-travail/arbitrage-T6/preparer-consolidation-T6.mjs <racine du dépôt>
// (1) Préconditions sur le dépôt réel : périmètre de T6 = proposition relue (empreinte), 37 empreintes identiques, T6 absent du manifeste,
// ARBITRAGE non renseigné, ancres présentes une fois, ajouts absents.
// (2) Versions proposées, par remplacements ciblés : configuration (ARBITRAGE), documents de pilotage (rubriques à l'identique, journal), bilan
// (§8.97), contrôle du bilan du pilote, recalcul de T5, recalcul de T6 ; proposition du périmètre sauvegardée (copie exacte).
// (3) Dans un clone git jetable (--shared, --no-checkout) recouvert de l'arbre de travail, cinq états successifs : E0 (départ) ; E1 (consolidation
// documentaire : périmètre régénéré par le générateur v2 avec ARBITRAGE, proposition sauvegardée, pilotage, bilan) ; E2 (trois contrôles
// remplacés, toujours 37 empreintes) ; E3 (38e entrée ajoutée par l'outil réel) ; E4 (bloc d'état synchronisé par l'outil réel). À chaque
// état : relais, couverture, manifeste, contrôle du bilan du pilote, recalculs de T5 et de T6, aperçu ; résultats attendus vérifiés. En E3,
// les trois contrôles d'origine sont aussi lancés, en constat. (4) Écriture dans arbitrage-T6/consolidation/ (refus si le dossier existe).
// (5) Dépôt réel inchangé. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T6/consolidation';
const W = 'a2-05-travail/';
const CFG = W + 'perimetre-T6.mjs', PER = 'docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md', MAN = W + 'empreintes-rapports-arbitres.json';
const PROP = W + 'arbitrage-T6/proposition-T6-perimetre.md';
const CBP = W + 'controle-bilan-pilote.mjs', REC5 = W + 'recalcul-T5-perimetre.mjs', REC6 = W + 'recalcul-T6-perimetre.mjs';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const PER_SHA = 'd0d4e113a85bb44e81532c7a951a7e74a27c60ea34deff2dcc53fd284e3a1ec4';
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex'); const shaT = (t) => createHash('sha256').update(t).digest('hex');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l, d) => console.log('constat  ' + l + (d ? ' : ' + d : ''));
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const TEMOINS = [CFG, PER, MAN, ETAT, ROAD, BIL, CBP, REC5, REC6, W + 'INVENTAIRE-SCRIPTS.md', W + 'registre-tranches.json', 'data/n5/vocab.json'];
const avant = Object.fromEntries(TEMOINS.map((p) => [p, sha(join(root, p))]));
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');
if (existsSync(join(root, PROP))) arret(PROP + ' existe déjà');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const remplacer = (t, doc, ancre, nouveau) => { const n = t.split(ancre).length - 1; if (n !== 1) arret(doc + ' : ancre présente ' + n + ' fois : ' + ancre.slice(0, 90) + '…'); return t.replace(ancre, () => nouveau); };

// (1) Préconditions
const man0 = JSON.parse(lire(MAN)).empreintes;
const diffE = Object.entries(man0).filter(([p, h]) => sha(join(root, p)) !== h).map(([p]) => p);
ok(avant[PER] === PER_SHA && /^\*\*Statut\*\* : \*\*proposition de périmètre opérationnel, non arbitrée\.\*\*/m.test(lire(PER)) && !lire(PER).includes('## 0. Arbitrage'), 'périmètre de T6 = proposition relue, au statut de proposition, sans §0', avant[PER].slice(0, 12) + '…');
ok(Object.keys(man0).length === 37 && !diffE.length && !Object.hasOwn(man0, PER), 'manifeste : 37 empreintes identiques ; périmètre de T6 absent', Object.keys(man0).length + ' entrées');
ok(/^const ARBITRAGE = null;$/m.test(lire(CFG)), 'configuration : ARBITRAGE non renseigné');

// (2a) Configuration proposée : la constante ARBITRAGE et son commentaire
const ARBITRAGE = `const ARBITRAGE = { date: '2026-10-27', texte: [
  "Arbitrage du 2026-10-27 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **J'accepte le périmètre opérationnel de T6 : D6 et D7, 22 sens dans 13 ENTRY, soit l'intégralité du lot 23.** » « Aucun ajout, retrait ou déplacement n'est retenu. » Lignes 304 à 325 du découpage arbitré, conservées ; thème : liaison, échange et formules sociales (lot 23 entier).",
  '',
  "**Frontières du futur audit** : (1) examiner les 22 sens individuellement, avec leurs fiches complètes et les décisions applicables ; (2) porter une attention particulière aux fonctions \`connecteur\`, \`discours\`, \`politesse\` et \`intensifieur\`, ainsi qu'aux catégories et types nuls ; (3) préserver les 90 décisions validées, les 18 choix du lot 23 et les relations déjà arbitrées du lot 26 ; (4) ne pas rouvrir la réserve normative de T5 ; (5) ne pas élargir l'audit à T8, T9 ou au bloc F.",
  '',
  "**L'audit lexical des 22 sens n'est pas autorisé** : il le sera distinctement. La protection du périmètre (38e entrée du manifeste) se fera sur autorisation distincte, avec le remplacement préalable des contrôles qui exigent 37 empreintes. Aucune décision lexicale n'est prise sur les 22 sens.",
  '',
  "**Comptes maintenus** : 274/377, 103 restants ; 196 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 libre ; 37 empreintes jusqu'à l'intégration autorisée du périmètre.",
] };`;
let cfgProp = remplacer(lire(CFG), CFG, "// L'arbitrage du périmètre se renseignera ici, après la relecture ; la proposition sera conservée telle qu'elle a été livrée", "// L'arbitrage du périmètre se renseigne ici, après la relecture ; la proposition est conservée telle qu'elle a été livrée");
cfgProp = cfgProp.replace(/^const ARBITRAGE = null;$/m, () => ARBITRAGE);
const N0 = 2 + (ARBITRAGE.match(/^  (?:".*",|'',)$/gm) ?? []).length + 1; // lignes insérées par le générateur : titre, ligne vide, texte, ligne vide

// (2b) Documents de pilotage
const A_RUB = '**consolidation technique de T5 achevée**, en attente de relecture avant sa clôture définitive (bilan du volet 2, §8.96)';
const N_RUB = A_RUB + ' ; **formalisation de l\'arbitrage et de la protection de T5 appliquée le 2026-10-27**, sur autorisation (quatre diffs relus appliqués sur les documents synchronisés ; blocs d\'état préservés ; relais 30 sur 30 ; 37 empreintes) ; **T5 close le 2026-10-27** (clôture documentaire définitive ; décisions non rouvertes ; réserve normative sur D0668, D0679, D0687 et D0691 conservée, non résolue) ; **périmètre opérationnel de T6 (D6, D7 ; 22 sens, 13 ENTRY, le lot 23 entier) accepté le 2026-10-27**, sans ajout, retrait ni déplacement (`docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md`, §0 inscrit par le générateur v2, proposition conservée ; liaison, échange et formules sociales ; recalcul indépendant conforme, inventaire des 103 restants vérifié ; frontières de l\'audit retenues ; hors du manifeste, ajout non autorisé) ; audit des 22 sens non autorisé (bilan du volet 2, §8.97)';
const A_PA = /^- \*\*Prochaine action\.\*\* La relecture de la consolidation technique de T5 [^\r\n]*/m;
const N_PA = '- **Prochaine action.** L\'intégration du périmètre accepté de T6 au manifeste (38e entrée ; `docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md`), sur autorisation distincte, avec le remplacement préalable des trois contrôles qui exigent 37 empreintes (contrôle du bilan du pilote, recalculs de T5 et de T6 ; préparés le 2026-10-27) ; puis la synchronisation du bloc d\'état ; puis l\'audit individuel des 22 sens de T6, sur autorisation distincte, dans les frontières du §0 du périmètre ; puis, chacun sur autorisation distincte : le statut de T1 et de T2 dans `registre-tranches.json`, sur arbitrage distinct ; la décision sur le défaut « RES » de T9, à part ; la correction retenue en principe de `tools/export-relecture.mjs` (A2-GLOBAL-v1) ; l\'arbitrage normatif distinct de la proposition d\'addendum. Aucune correction lexicale n\'est appliquée. Aucun `git add`, commit ni push sans autorisations distinctes.';
const rubriques = (t, doc) => { t = remplacer(t, doc, A_RUB, N_RUB); const m = t.match(new RegExp(A_PA.source, 'gm')) ?? []; if (m.length !== 1) arret(doc + ' : « Prochaine action » présente ' + m.length + ' fois'); return t.replace(A_PA, () => N_PA); };
const J3 = '| 2026-10-27 | 2 · A2-05 | **Synchronisation à 37 empreintes et formalisation de T5 appliquées**, chacune sur autorisation : plan `a6378961662fa21f` (six lignes, blocs `a2-05:etat` seulement) ; puis quatre diffs relus appliqués sur les documents synchronisés (rubriques à l\'identique, journal, §8.96, inventaire ; blocs préservés) ; relais 30 sur 30 ; 37 empreintes ; contrôle du bilan du pilote 37 sur 37 ; recalcul de T5 16 sur 16. **T5 close** (clôture documentaire définitive ; décisions non rouvertes ; réserve normative conservée). **Périmètre opérationnel de T6 préparé puis accepté**, sans ajout, retrait ni déplacement : D6 et D7, 22 sens, 13 ENTRY, lignes 304 à 325, le lot 23 entier ; liaison, échange et formules sociales (`a2-05-travail/perimetre-T6.mjs`, générateur v2 ; recalcul indépendant `a2-05-travail/recalcul-T6-perimetre.mjs`, conforme, 8 sabotages sur 8 ; inventaire des 103 restants vérifié) ; §0 inscrit par le générateur v2, proposition conservée ; frontières de l\'audit retenues. Hors du manifeste, ajout non autorisé ; relais 29 sur 30 (C9a attendu) ; trois contrôles adaptés à la 38e entrée, préparés, non appliqués. Audit des 22 sens non autorisé. Bilan du volet 2, §8.97. **274/377 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-24 libre ; 37 empreintes.** | non committé |';
const journal = (t) => { const eol = t.includes('\r\n') ? '\r\n' : '\n'; const L = t.split(eol); let k = L.length - 1; while (k >= 0 && L[k] === '') k--; if (!/^\| 2026-10-27 \| 2 · A2-05 \| \*\*Protection du rapport arbitré de T5\*\*/.test(L[k])) arret(ETAT + ' : dernière ligne du journal inattendue'); L.splice(k + 1, 0, J3); return L.join(eol); };
const S897 = [
  '### 8.97 Volet 1, lot 3 : synchronisation et formalisation de T5 appliquées ; T5 close ; périmètre de T6 accepté (D6, D7 ; 22 sens, 13 ENTRY, lot 23 entier) (2026-10-27)',
  '',
  'Décisions du 2026-10-27 (ChatGPT, par délégation ; relayées par l\'utilisateur) : « **J\'autorise l\'application du plan de synchronisation `a6378961662fa21f`, et uniquement de ce plan.** » ; « **J\'accepte la synchronisation à 37 empreintes et autorise l\'application ciblée de la formalisation prévue dans la Partie 2 de la note précédente.** » ; « **J\'autorise la clôture documentaire définitive de T5.** » ; « **Je demande explicitement de lancer la préparation du périmètre de T6, en proposition uniquement.** » ; puis « **J\'accepte le périmètre opérationnel de T6 : D6 et D7, 22 sens dans 13 ENTRY, soit l\'intégralité du lot 23.** » et « **J\'autorise la préparation, sans application, de la consolidation du périmètre T6.** » La protection du périmètre, le remplacement des contrôles et la synchronisation sont autorisés séparément.',
  '',
  '**Synchronisation et formalisation de T5, appliquées** : plan `a6378961662fa21f` appliqué après un aperçu identique à l\'aperçu relu (six lignes modifiées, toutes dans les blocs `a2-05:etat` ; 274/377, 103 restants ; 37 rapports) ; puis les quatre diffs relus de la formalisation appliqués sur les documents synchronisés, sans recopier les versions complètes préparées avant la synchronisation (rubriques identiques dans les deux documents, deux lignes de journal, §8.96, inventaire ; blocs préservés ; versions obtenues égales aux empreintes prévues). Après chaque opération : aperçu vide ; relais `--apres-application` 30 sur 30 ; 37 empreintes identiques ; contrôle du bilan du pilote 37 sur 37 ; recalcul de T5 16 sur 16 ; 196 corrections dans 172 ENTRY, aucune appliquée ; V1-22 et V1-23 réservés, V1-24 libre.',
  '',
  '**T5 close** : clôture documentaire définitive autorisée ; 22 sens, 22 conformes, aucun écart, aucune correction nouvelle ; décisions non rouvertes. La réserve normative sur D0668, D0679, D0687 et D0691 (§8.95) est conservée, non résolue.',
  '',
  '**Périmètre opérationnel de T6** (`docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md`) : livraisons D6 et D7, retenues pour T6 par l\'étude de méthode arbitrée le 2026-10-18 ; 22 sens, 13 ENTRY ; lignes 304 à 325 du découpage, contiguës ; le lot 23 entier (« Liaison, échange et formules sociales »), c\'est-à-dire ses 13 ENTRY et tous leurs sens publiés. Les 22 sens ont `category: null` et `semantic_type: null`, chacun avec une fonction d\'A9 (`connecteur` 8, `discours` 10, `politesse` 5, `intensifieur` 1) ; tous les sens publiés `connecteur` et `discours` sont dans T6. Généré par `a2-05-travail/perimetre-T6.mjs` avec le générateur v2, non modifié ; recalcul indépendant `a2-05-travail/recalcul-T6-perimetre.mjs` conforme (20 contrôles ; 8 sabotages sur 8 ; inventaire des 103 restants par livraison et par tranche : T6 22, T7 24, T8 16, T9 24, F 17). Exclusions : 結構 sens 2 et les intensifieurs du lot 24 (D8, T8) ; また sens 2 (volet 2 ; modification n°1 retenue, non appliquée) ; 大変, 痛い et 嫌 (bloc E, T9) ; les interrogatifs (bloc F, suspendu au préalable E5) ; les formules de `data/expressions.json` et le registre de politesse de l\'application.',
  '',
  '**Acceptation inscrite** : §0 inscrit par le générateur v2 (constante `ARBITRAGE` de `a2-05-travail/perimetre-T6.mjs`) ; seuls le statut et le §0 changent ; la proposition livrée est sauvegardée à l\'identique (`a2-05-travail/arbitrage-T6/proposition-T6-perimetre.md`, `d0d4e113a85b…`). **Frontières de l\'audit retenues** : les 22 sens examinés individuellement, avec leurs fiches complètes et les décisions applicables ; attention particulière à `connecteur`, `discours`, `politesse` et `intensifieur`, et aux catégories et types nuls ; les 90 décisions validées, les 18 choix du lot 23 et les relations arbitrées du lot 26 préservés ; la réserve normative de T5 non rouverte ; aucun élargissement à T8, T9 ou au bloc F.',
  '',
  '**Protection** : le périmètre accepté n\'est pas ajouté au manifeste (37 empreintes) ; relais 29 sur 30, C9a attendu (périmètre accepté hors du manifeste). L\'ajout de la 38e entrée mettrait en écart trois contrôles qui exigent 37 empreintes : le contrôle du bilan du pilote, le recalcul de T5 et le recalcul de T6. Leur remplacement a été préparé le 2026-10-27 et simulé dans un clone jetable, état par état ; il doit précéder l\'ajout, sur autorisation distincte ; la synchronisation du bloc d\'état suivrait.',
  '',
  'Audit des 22 sens non autorisé ; registre des tranches non modifié. Décomptes : 274/377, 103 restants ; bloc B 148/148 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 libre ; 37 empreintes. Aucun `git add`, commit ni push.',
];
const bilan = (t) => { if (!/^### 8\.96 /m.test(t) || /^### 8\.97 /m.test(t)) arret(BIL + ' : §8.96 absent ou §8.97 déjà présent'); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S897.join(eol) + eol; };
const prop = { [ETAT]: journal(rubriques(lire(ETAT), ETAT)), [ROAD]: rubriques(lire(ROAD), ROAD), [BIL]: bilan(lire(BIL)) };
const pa = (t) => (t.match(/^- \*\*Prochaine action\.\*\*[^\r\n]*/m) ?? [''])[0];
const rub = (t) => (t.match(/[^\r\n]*consolidation technique de T5 achevée[^\r\n]*/) ?? [''])[0];
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]) === N_PA && rub(prop[ETAT]) === rub(prop[ROAD]) && rub(prop[ETAT]).includes(N_RUB), 'rubriques « Proposé, non validé » et « Prochaine action » identiques dans les deux documents proposés');
ok(!S897.some((l) => /^\| /.test(l)), '§8.97 : aucune ligne de tableau (comptage des corrections et des réservations inchangé)');

// (2c) Contrôles proposés, par remplacements ciblés
let cbp = lire(CBP);
cbp = remplacer(cbp, CBP, "// entrée, 37 empreintes), et que le registre porte toujours la condition du pilote. Code 1 au premier écart.\n",
  "// entrée), que le périmètre de T6 est accepté (§0), ne diffère de sa proposition sauvegardée (22 sens, D6 et D7) que par la ligne de statut et\n// le §0 inséré et est protégé au manifeste (38e entrée, 38 empreintes), et que le registre porte toujours la condition du pilote.\n// Code 1 au premier écart.\n");
cbp = remplacer(cbp, CBP, "// PROPOSITION (2026-10-26), non appliquée : adaptation à l'arbitrage de T5 et à l'ajout de son rapport au manifeste (37e entrée).\n",
  "// Historique : adaptation à l'arbitrage de T5 et à la 37e entrée, appliquée le 2026-10-27 ; adaptation au périmètre accepté de T6 et à la\n// 38e entrée (38 empreintes), préparée le 2026-10-27, appliquée seulement sur autorisation distincte.\n");
const ANCRE_P5 = "ctl(man[P5] === sha(P5), 'T5 : périmètre accepté protégé au manifeste, empreinte identique', man[P5] ? sha(P5).slice(0, 12) + '…' : 'absent du manifeste');\n";
cbp = remplacer(cbp, CBP, ANCRE_P5, ANCRE_P5 + [
  "// Périmètre de T6, accepté le 2026-10-27 : proposition sauvegardée conservée (22 sens, D6 et D7, sans §0), seuls changent le statut et le §0 ;",
  "// protégé au manifeste.",
  "const P6 = R + 'T6-perimetre.md', p6 = txt(P6), PROP6 = 'a2-05-travail/arbitrage-T6/proposition-T6-perimetre.md', prop6 = txt(PROP6);",
  "const liv6 = (t) => [...t.slice(t.indexOf('## 2. '), t.indexOf('## 3. ')).matchAll(/^\\| [0-9]+ \\| `(?:hj_)?v_[0-9]+_s[0-9]+` \\|[^|]+\\|[^|]+\\|[^|]+\\| (D[67]) \\|/gm)].map((m) => m[1]);",
  "const d6 = liv6(prop6);",
  "ctl(/^\\*\\*Statut\\*\\* : \\*\\*proposition de périmètre opérationnel, non arbitrée\\.\\*\\*/m.test(prop6) && !prop6.includes('## 0. Arbitrage') && n4(prop6) === 22 && d6.filter((x) => x === 'D6').length === 12 && d6.filter((x) => x === 'D7').length === 10, 'T6 : proposition sauvegardée en proposition, sans §0, 22 sens, D6 12 et D7 10 (fait historique)', n4(prop6) + ' sens ; D6 ' + d6.filter((x) => x === 'D6').length + ', D7 ' + d6.filter((x) => x === 'D7').length);",
  "const i6 = inscrit(P6, PROP6, '" + PER_SHA.slice(0, 12) + "', /^\\*\\*Statut\\*\\* : \\*\\*périmètre accepté le 2026-10-27 \\(§0\\)\\.\\*\\*/, " + N0 + ");",
  "ctl(i6.ok && p6.includes('« **J\\'accepte le périmètre opérationnel de T6 : D6 et D7, 22 sens dans 13 ENTRY, soit l\\'intégralité du lot 23.** »') && n4(p6) === 22 && p6.includes('**22 sens, 13 ENTRY**'), 'T6 : périmètre accepté (§0), 22 sens dans 13 ENTRY ; seuls changent le statut et le §0', i6.detail);",
  "ctl(man[P6] === sha(P6), 'T6 : périmètre accepté protégé au manifeste, empreinte identique', man[P6] ? sha(P6).slice(0, 12) + '…' : 'absent du manifeste');",
  '',
].join('\n'));
cbp = remplacer(cbp, CBP, "ctl(Object.keys(man).length === 37 && !diffM.length && Object.keys(man)[35] === P5 && Object.keys(man)[36] === T5R, 'manifeste : 37 empreintes recalculées, identiques ; périmètre de T5 (36e entrée) et rapport arbitré de T5 (37e entrée)',",
  "ctl(Object.keys(man).length === 38 && !diffM.length && Object.keys(man)[35] === P5 && Object.keys(man)[36] === T5R && Object.keys(man)[37] === P6, 'manifeste : 38 empreintes recalculées, identiques ; périmètre de T5 (36e entrée), rapport arbitré de T5 (37e entrée), périmètre de T6 (38e entrée)',");
let rec5 = lire(REC5);
rec5 = remplacer(rec5, REC5, "// PROPOSITION (2026-10-25), non appliquée : état d'après l'arbitrage de T5 (rapport arbitré, §0) et l'ajout de son rapport au manifeste (37e entrée).\n",
  "// Historique : état d'après l'arbitrage de T5 (rapport arbitré, §0) et l'ajout de son rapport au manifeste (37e entrée), appliqué le 2026-10-27 ;\n// manifeste contrôlé sans en fixer la longueur au-delà de T5 (au moins 37 entrées ; 36e et 37e inchangées ; toutes identiques), préparé le\n// 2026-10-27, appliqué seulement sur autorisation distincte. Les entrées suivantes relèvent des contrôles de leurs propres tranches.\n");
rec5 = remplacer(rec5, REC5, "// 10. Manifeste : 37 entrées, empreintes recalculées ici (SHA-256 des octets), sans le module v2 ; périmètre de T5 (36e) et rapport de T5 (37e) protégés\n",
  "// 10. Manifeste : au moins 37 entrées, empreintes recalculées ici (SHA-256 des octets), sans le module v2, toutes identiques ; périmètre de T5 (36e)\n// et rapport de T5 (37e) protégés, à leur place\n");
rec5 = remplacer(rec5, REC5, "ctl(Object.keys(man).length === 37 && !diffE.length && Object.keys(man)[35] === P5 && Object.keys(man)[36] === 'docs/rapports/' + RT5, 'manifeste : 37 empreintes recalculées, identiques ;",
  "ctl(Object.keys(man).length >= 37 && !diffE.length && Object.keys(man)[35] === P5 && Object.keys(man)[36] === 'docs/rapports/' + RT5, 'manifeste : au moins 37 empreintes recalculées, toutes identiques ;");
let rec6 = lire(REC6);
rec6 = remplacer(rec6, REC6, "// Code 1 au premier écart. Ne juge aucun sens.\n",
  "// Adaptation au périmètre accepté (§0, proposition sauvegardée) et à sa protection (38e entrée du manifeste) : préparée le 2026-10-27, appliquée\n// seulement sur autorisation distincte. Code 1 au premier écart. Ne juge aucun sens.\n");
const A12 = "// 12. Manifeste : 37 entrées, empreintes recalculées ici (SHA-256 des octets), sans le module v2 ; périmètre de T6 absent\n";
const i12 = rec6.indexOf(A12); const f12 = rec6.indexOf("console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');");
if (i12 < 0 || f12 < i12 || rec6.split(A12).length !== 2) arret(REC6 + ' : section 12 introuvable');
rec6 = rec6.slice(0, i12) + [
  "// 12. Périmètre accepté : statut et §0 ; hors du statut et du §0, identique à la proposition sauvegardée (elle-même égale à la proposition relue)",
  "const PROP = txt('a2-05-travail/arbitrage-T6/proposition-T6-perimetre.md'), PL = PROP.split('\\n'), G = gen.split('\\n');",
  "const a0 = G.indexOf('## 0. Arbitrage'), b0 = G.indexOf('## 1. Où se place T6'); const sans0 = [...G.slice(0, a0), ...G.slice(b0)];",
  "const st = PL.findIndex((l) => l.startsWith('**Statut** : '));",
  "const shaProp = createHash('sha256').update(readFileSync(join(root, 'a2-05-travail/arbitrage-T6/proposition-T6-perimetre.md'))).digest('hex');",
  "ctl(shaProp === '" + PER_SHA + "' && /^\\*\\*Statut\\*\\* : \\*\\*périmètre accepté le 2026-10-27 \\(§0\\)\\.\\*\\*/.test(G[st] ?? '') && a0 > 0 && b0 > a0 && sans0.length === PL.length && sans0.every((l, k) => k === st || l === PL[k]), 'périmètre accepté (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', 'proposition ' + shaProp.slice(0, 12) + '… ; §0 : ' + (b0 - a0) + ' lignes ; ' + G[st]?.slice(0, 50).replace(/\\*/g, ''));",
  '',
  "// 13. Manifeste : 38 entrées, empreintes recalculées ici (SHA-256 des octets), sans le module v2 ; périmètre accepté de T6 protégé (38e entrée)",
  "const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes; const P6 = 'docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md';",
  "const diffE = Object.entries(man).filter(([p, h]) => !existsSync(join(root, p)) || createHash('sha256').update(readFileSync(join(root, p))).digest('hex') !== h).map(([p]) => p);",
  "ctl(Object.keys(man).length === 38 && !diffE.length && Object.keys(man)[37] === P6, 'manifeste : 38 empreintes recalculées, identiques ; périmètre accepté de T6 protégé (38e entrée)', Object.keys(man).length + ' entrées ; différentes : ' + (diffE.join(', ') || 'aucune'));",
  '',
].join('\n') + rec6.slice(f12);
const controles = { [CBP]: cbp, [REC5]: rec5, [REC6]: rec6 };

// (3) Clone jetable
const tmp = mkdtempSync(join(tmpdir(), 'ocha-consolidation-t6-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
for (const [p, t] of Object.entries(controles)) { const f = join(tmp, 'check-' + p.split('/').pop()); writeFileSync(f, t); const r = spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' }); ok(r.status === 0, 'node --check, version proposée de ' + p, 'code ' + r.status); }
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const lancerHors = (f, ...a) => { const r = spawnSync(process.execPath, [f, C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim().slice(0, 220));
const etape = (nom) => {
  const r = { rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs'), cbp: lancer(CBP), rec5: lancer(REC5), rec6: lancer(REC6), ap: lancer(W + 'sync-stable.mjs', '--apercu') };
  r.apercu = readFileSync(join(C, W + 'sync-stable-apercu.md'), 'utf8'); r.hunks = (r.apercu.match(/^@@/gm) ?? []).length; r.plan = (r.ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
  for (const [k, v] of Object.entries(r)) if (v?.out !== undefined) console.log('   ' + nom + ' ' + k + ' (code ' + v.code + ') : ' + v.out.split('\n').pop().slice(0, 170) + (ecartsDe(v).length ? ' | ' + ecartsDe(v).join(' | ') : ''));
  return r;
};
const rel = (r, n, ec) => r.rel.out.includes(n + ' conformes sur 30') && JSON.stringify(ecartsDe(r.rel).map((l) => (l.match(/^ÉCART\s+(C\w+)/) ?? [])[1])) === JSON.stringify(ec);
const cov0 = (r) => r.cov.code === 0 && /274 arbitrés, 0 proposés, 103 restants/.test(r.cov.out);
// E0 : départ
const E0 = etape('E0');
ok(rel(E0, 30, []) && cov0(E0) && E0.emp.code === 0 && E0.cbp.code === 0 && E0.rec5.code === 0 && E0.rec6.code === 0 && E0.hunks === 0, 'E0 (départ) : relais 30 sur 30 ; couverture 274/103 ; manifeste, contrôle du bilan du pilote, recalculs de T5 et de T6 conformes ; aperçu vide');
// E1 : consolidation documentaire (périmètre régénéré avec ARBITRAGE, proposition sauvegardée, pilotage, bilan)
writeFileSync(join(C, CFG), cfgProp);
mkdirSync(join(C, dirname(PROP)), { recursive: true }); cpSync(join(root, PER), join(C, PROP));
const g = lancer(CFG); const perProp = readFileSync(join(C, PER), 'utf8');
const L0 = lire(PER).split('\n'), L1 = perProp.split('\n'); const i0 = L1.indexOf('## 0. Arbitrage'), i1 = L1.indexOf('## 1. Où se place T6');
const sans0 = [...L1.slice(0, i0), ...L1.slice(i1)]; const st = L0.findIndex((l) => l.startsWith('**Statut** : '));
const memes = sans0.length === L0.length && sans0.every((l, k) => k === st ? /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-27 \(§0\)\.\*\*/.test(l) : l === L0[k]);
ok(g.code === 0 && i0 > 0 && i1 - i0 === N0 && memes, 'périmètre régénéré avec ARBITRAGE : seuls changent la ligne de statut et le §0 inséré', 'génération code ' + g.code + ' ; §0 : ' + (i1 - i0) + ' lignes (attendu ' + N0 + ') ; ' + shaT(perProp).slice(0, 12) + '…');
for (const p of [ETAT, ROAD, BIL]) writeFileSync(join(C, p), prop[p]);
const E1 = etape('E1');
ok(rel(E1, 29, ['C9a']) && cov0(E1) && E1.emp.code === 0 && E1.emp.out.endsWith('hors du manifeste : ' + PER) && E1.cbp.code === 0 && E1.rec5.code === 0 && E1.rec6.code === 0 && E1.hunks === 0, 'E1 (consolidation documentaire, contrôles d\'origine) : relais 29 sur 30, seul écart C9a ; périmètre accepté signalé hors du manifeste ; contrôles conformes ; aperçu vide', E1.emp.out);
// E2 : trois contrôles remplacés, toujours 37 empreintes
const orig = {}; for (const [p, t] of Object.entries(controles)) { orig[p] = join(tmp, 'origine-' + p.split('/').pop()); cpSync(join(C, p), orig[p]); writeFileSync(join(C, p), t); }
const E2 = etape('E2');
// Libellés attendus des écarts, comparés au début de chaque ligne (un libellé peut lui-même contenir « : »)
const seuls = (r, libelles) => { const l = ecartsDe(r).map((x) => x.replace(/^ÉCART\s+/, '')); return l.length === libelles.length && libelles.every((b, k) => l[k].startsWith(b + ' : ')); };
ok(rel(E2, 29, ['C9a']) && E2.cbp.code === 1 && seuls(E2.cbp, ['T6 : périmètre accepté protégé au manifeste, empreinte identique', 'manifeste : 38 empreintes recalculées, identiques ; périmètre de T5 (36e entrée), rapport arbitré de T5 (37e entrée), périmètre de T6 (38e entrée)']) && E2.rec5.code === 0 && E2.rec6.code === 1 && seuls(E2.rec6, ['manifeste : 38 empreintes recalculées, identiques ; périmètre accepté de T6 protégé (38e entrée)']) && E2.hunks === 0,
  'E2 (contrôles remplacés, 37 empreintes) : contrôle du bilan du pilote, exactement deux écarts (T6 hors du manifeste ; 37 au lieu de 38) ; recalcul de T5 conforme ; recalcul de T6, seul écart le manifeste ; relais 29 sur 30 (C9a) ; aperçu vide');
// E3 : 38e entrée ajoutée par l'outil réel
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); const manB = readFileSync(join(C, MAN), 'utf8'); const mB = JSON.parse(manB); const cles = Object.keys(mB.empreintes);
ok(aj.code === 0 && cles.length === 38 && cles[37] === PER && mB.empreintes[PER] === shaT(perProp) && Object.entries(man0).every(([p, h]) => mB.empreintes[p] === h), 'E3 : ajout par l\'outil réel, seul le périmètre accepté de T6 (38 entrées, les 37 précédentes inchangées)', aj.out);
const E3 = etape('E3');
// Le relais lit le nombre d'empreintes dans le manifeste (C8, Q11), non dans le bloc d'état : le bloc resté à 37 n'est vu que par l'aperçu.
ok(rel(E3, 30, []) && cov0(E3) && E3.emp.code === 0 && E3.cbp.code === 0 && E3.rec5.code === 0 && E3.rec6.code === 0 && E3.hunks > 0, 'E3 (38 empreintes) : contrôle du bilan du pilote, recalculs de T5 et de T6 conformes ; relais 30 sur 30 (C9a résolu ; Q11 lit le manifeste) ; aperçu non vide (bloc d\'état resté à 37)', 'plan ' + E3.plan + ' ; ' + E3.hunks + ' hunk(s)');
const hors = E3.apercu.split('\n').filter((l) => /^[-+](?![-+])/.test(l) && !/^[-+](<!-- a2-05:etat|- \*\*Contrôles\*\*)/.test(l));
ok(hors.length === 0 && /38 rapports arbitrés identiques/.test(E3.apercu), 'E3 : l\'aperçu ne change que le marqueur et la ligne « Contrôles » des blocs (37 → 38 rapports)', hors.length ? hors.length + ' autre(s) ligne(s)' : 'aucune autre ligne');
for (const [p, f] of Object.entries(orig)) { const r = lancerHors(f); constat('E3, ' + p + ' d\'origine (37 empreintes exigées)', 'code ' + r.code + ' ; ' + (ecartsDe(r).map((l) => l.replace(/^ÉCART\s+/, '').slice(0, 120)).join(' ; ') || 'aucun écart')); }
// E4 : bloc d'état synchronisé par l'outil réel
const sy = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', E3.plan ?? '');
const E4 = etape('E4');
ok(sy.code === 0 && rel(E4, 30, []) && cov0(E4) && E4.emp.code === 0 && E4.cbp.code === 0 && E4.rec5.code === 0 && E4.rec6.code === 0 && E4.hunks === 0, 'E4 (bloc synchronisé) : relais 30 sur 30 ; tous les contrôles conformes ; aperçu vide', sy.out + ' ; plan suivant ' + E4.plan);
const docsE4 = { [ETAT]: readFileSync(join(C, ETAT), 'utf8'), [ROAD]: readFileSync(join(C, ROAD), 'utf8') };
rmSync(tmp, { recursive: true, force: true });

// (4) Écriture des propositions et des différences
mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
const sorties = [[CFG, 'perimetre-T6.mjs', cfgProp], [PER, 'etape2-A2-05-volet1-lot3-T6-perimetre.md', perProp], [ETAT, 'ETAT-ACTUEL.md', prop[ETAT]], [ROAD, 'ROADMAP.md', prop[ROAD]], [BIL, 'etape2-A2-05-bilan-volet2.md', prop[BIL]], [CBP, 'controle-bilan-pilote.mjs', cbp], [REC5, 'recalcul-T5-perimetre.mjs', rec5], [REC6, 'recalcul-T6-perimetre.mjs', rec6], [MAN, 'empreintes-rapports-arbitres-simule-E3.json', manB]];
for (const [p, nom, t] of sorties) {
  writeFileSync(join(root, OUT, nom), t);
  const d = spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', p, OUT + '/' + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  writeFileSync(join(root, OUT, 'diffs', nom + '.diff'), d.stdout);
  const n = (c) => d.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length;
  ok(d.status === 1 && t.includes('\r\n') === lire(p).includes('\r\n'), 'proposé : ' + p, '+' + n('+') + ' / -' + n('-') + ' lignes ; ' + shaT(t).slice(0, 12) + '…');
}
writeFileSync(join(root, OUT, 'proposition-T6-perimetre.md'), lire(PER));
ok(sha(join(root, OUT, 'proposition-T6-perimetre.md')) === PER_SHA, 'proposition à sauvegarder (' + PROP + ') : copie exacte du périmètre relu', PER_SHA.slice(0, 12) + '…');
writeFileSync(join(root, OUT, 'apercu-E3.md'), E3.apercu);
for (const [p, t] of Object.entries(docsE4)) writeFileSync(join(root, OUT, p.replace('.md', '-E4.md')), t);

// (5) Dépôt réel inchangé
const ch = TEMOINS.filter((p) => sha(join(root, p)) !== avant[p]);
ok(ch.length === 0 && !existsSync(join(root, PROP)), 'dépôt réel inchangé (' + TEMOINS.length + ' fichiers témoins ; proposition non sauvegardée à sa place)', ch.join(', ') || 'aucune modification');
console.log(ko ? ko + ' écart(s)' : 'préparation conforme');
process.exit(ko ? 1 : 0);
