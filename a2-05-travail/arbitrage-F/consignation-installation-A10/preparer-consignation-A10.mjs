// A2-05 : préparation, sans application, de la consignation de l'installation d'A10 : §8.118 du bilan, `ETAT-ACTUEL.md`, `ROADMAP.md`. Sorties dans proposition/ seulement, seulement sans écart ; refus si le dossier existe.
// Gabarits : `<DATE-D-INSTALLATION>` et `<SHA-A10>` ne sont remplis qu'à l'application, depuis la trace d'une installation réelle. Tant qu'A10 n'est pas installé, ce texte n'affirme rien : il n'est écrit nulle part ailleurs.
// Blocs a2-05:etat, décisions historiques et lignes de journal antérieures inchangés ; `CLAUDE.md`, relais et normes non touchés. La mention « ni adoptée ni normative », lue par C5e et Q7, reste, datée.
// Usage : node a2-05-travail/arbitrage-F/consignation-installation-A10/preparer-consignation-A10.mjs <racine du dépôt>. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { diffBrut } from '../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/consignation-installation-A10/', PROP = OUT + 'proposition/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', D = '<DATE-D-INSTALLATION>', S = '<SHA-A10>', BLOC = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
const DEPART = { [ETAT]: '178f3e566b0241558eb591bf7fdedec3d3fa0f31fab94eadb750890530e82738', [ROAD]: 'ee1fd1a2e23f3bc5598fbae030f852155215cd4252ccfbe93a5598e1bf7f1840', [BIL]: '677e5589f1adeddd17d4e9629d477f1386c22ce9ab1afd90d3e528e0a20fd9a3' };
const sha = (b) => createHash('sha256').update(b).digest('hex'); const lire = (p) => readFileSync(join(root, p), 'utf8'); const LFs = (t) => t.replace(/\r\n/g, '\n');
const lignes = []; const ok = (b, l, d) => { const m = (b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : ''); console.log(m); lignes.push(m); if (!b) { console.log('ARRÊT avant écriture'); process.exit(1); } };
const style = (t) => { const c = (t.match(/\r\n/g) ?? []).length, l = (t.match(/\n/g) ?? []).length; return c === l ? 'CRLF' : c === 0 ? 'LF' : 'mixte'; };
const rendre = (p, t) => (style(lire(p)) === 'CRLF' ? t.replace(/\n/g, '\r\n') : t);

const PA_NOUVELLE = "- **Prochaine action.** Le commit de l'installation d'A10 (`docs/conception/addendum-A10-interrogatif.md`, bilan du volet 2, §8.118), qui lève l'écart temporaire de C9b, sur autorisation distincte. Puis, chacun sur autorisation distincte : le périmètre opérationnel de F, à partir du périmètre préparatoire accepté (17 sens, 15 ENTRY, une seule tranche) ; l'essai des filtres sur les 807 sens non porteurs ; l'audit individuel des 17 sens et de leurs 17 décisions `type-nul` ; la recherche d'omissions, distincte des 377 sens du lot 3. Puis, chacun sur autorisation distincte : le statut de T1 et de T2 dans `registre-tranches.json`, sur arbitrage distinct ; la correction retenue en principe de `tools/export-relecture.mjs` (A2-GLOBAL-v1). Aucune correction lexicale n'est appliquée. Aucun `git add`, commit ni push sans autorisations distinctes.";
const BULLE = "- **Écart temporaire du relais.** Depuis l'installation d'A10, `a2-05-travail/controle-relais-allege.mjs` rend 29 sur 30, C9b seul : C9b refuse tout changement non committé dans `docs/conception`. Il reste inchangé, et l'écart se lève au prochain commit (bilan du volet 2, §8.118).";
const COMMUNS = [
  ['; bilan du volet 2, §8.106 à §8.117) (relais', '; bilan du volet 2, §8.106 à §8.118) (relais'],
  ["  Une **proposition d'addendum sur la fonction\n", "  Jusqu'au " + D + ", la **proposition d'addendum sur la fonction\n"],
  ['  arbitrage normatif distinct, **ni adoptée ni\n', "  arbitrage normatif distinct, n'était **ni adoptée ni\n"],
  ["  pressenti. **Arbitrage normatif ouvert le 2026-11-02** : orientation retenue, texte d'installation\n  préparé, adoption non prononcée. Aucune norme n'est modifiée.\n", "  pressenti. **Arbitrage normatif ouvert le 2026-11-02** : orientation retenue, puis principe et texte\n  approuvés. **Addendum A10 adopté et installé le " + D + "** (`docs/conception/addendum-A10-interrogatif.md`,\n  partie I de la révision 4 ; partie II maintenue dans le rapport, non installée) ; sommaire complété,\n  C6 adapté aux numéros A1 à A10, règle `.gitattributes` propre à A10 (bilan du volet 2, §8.118).\n  Aucune autre norme n'est modifiée.\n"],
  ['- **Corrections retenues, non appliquées.** **204 corrections', BULLE + '\n- **Corrections retenues, non appliquées.** **204 corrections'],
  ["  adoption explicite de l'addendum ; puis périmètre", "  adoption explicite de l'addendum, faite le " + D + " ; puis périmètre"],
  ["**La vérification des 120 avertissements `categorie-nulle` reste exigée\n  avant toute déclaration de fin d'étape 2.**\n", "**La vérification des 120 avertissements `categorie-nulle` reste exigée\n  avant toute déclaration de fin d'étape 2.** Elle se fera après l'application des corrections, sans\n  refaire automatiquement les 147 arbitrages documentés : décision historique, résultat appliqué et\n  justification finale vérifiés ; seuls les cas manquants, incohérents ou insuffisamment justifiés\n  sont réexaminés.\n"],
  ['(référence `27b27ce`, commit de clôture `39cce13`). Les travaux postérieurs sont documentaires et\n**ne sont ni committés ni poussés**.', "(référence `27b27ce`, commit de clôture `39cce13`). Les travaux postérieurs, dont l'installation\nd'A10, **ne sont ni committés ni poussés**."],
];
const PROPRES = {
  [ETAT]: [['**Tâche en cours (au 2026-11-02) : A2-05', '**Tâche en cours (au ' + D + ') : A2-05']],
  [ROAD]: [
    ['**Dernière mise à jour :** 2026-11-02 (A2-05 en cours :', '**Dernière mise à jour :** ' + D + ' (A2-05 en cours :'],
    ['checkpoint Git clos, référence `27b27ce`)', 'checkpoint Git clos, référence `27b27ce` ; addendum A10 installé, non committé)'],
    ['**Avancement (au 2026-11-02).** **A2-05 est en cours', '**Avancement (au ' + D + ').** **A2-05 est en cours'],
    ["-   vérification des 120 avertissements `categorie-nulle`, avant toute déclaration de fin d'étape 2 ;\n", "-   vérification des 120 avertissements `categorie-nulle`, après l'application des corrections et avant toute déclaration de fin d'étape 2 ;\n"],
  ],
};
const LIGNE_J = "| " + D + " | 2 · A2-05 | **Addendum A10 adopté et installé**, sur autorisation distincte, essayé sur copie jetable puis lancé une fois : `docs/conception/addendum-A10-interrogatif.md` (`" + S + "`), une ligne au sommaire, **C6 adapté** aux numéros A1 à A10, **règle `.gitattributes`** propre à A10 (option 2). **C9b inchangé, en écart temporaire** : relais à 29 sur 30, C9b seul, jusqu'au prochain commit. **Les 120 `categorie-nulle` seront vérifiés après l'application des corrections**, sans refaire automatiquement les 147 arbitrages. Bloc F toujours suspendu ; audit et filtres non lancés ; §8.118. **360/377, 17 restants, tous du bloc F ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 45 empreintes.** | non committé |";
const S8118 = [
  "### 8.118 Volet 1, lot 3 : addendum A10 adopté et installé ; C6 adapté ; règle `.gitattributes` posée ; C9b en écart temporaire (" + D + ")",
  '',
  "Décisions (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : « J'approuve le principe et le texte de l'addendum A10 proposé » ; « J'approuve l'adaptation ciblée de C6 vérifiant exactement les numéros A1 à A10 dans l'ordre numérique. » ; « Conserver C9b inchangé et documenter son écart temporaire jusqu'au prochain commit. » ; « Retenir une vérification après application des corrections pour les 120 avertissements `categorie-nulle`, sans refaire automatiquement les 147 arbitrages déjà documentés. » ; « J'accepte la consignation §8.117 appliquée. » ; sur les fins de ligne : « Je retiens l'option 2. » ; « Je ne retiens pas l'option consistant à accepter un code 2 de `git diff --check`. » L'installation réelle a fait l'objet d'une autorisation distincte de ces décisions.",
  '',
  "**A10 adopté et installé le " + D + ".** Une seule opération, sur quatre fichiers seulement, essayée sur copie jetable puis lancée une fois : `a2-05-travail/arbitrage-F/installation-A10/application/installer-A10.mjs`. `docs/conception/addendum-A10-interrogatif.md`, nouveau, SHA-256 `" + S + "` : partie I de la révision 4, texte relu, à la seule date près. `docs/conception/00-sommaire.md`, une ligne, `2c9e2cfff2d7c5d175dcbc6cf99c853f771b993ef4e54ccd764be52b56b728fb`. La partie II d'E5 reste dans le rapport, non installée. Le numéro A10 a été contrôlé le jour même de l'installation.",
  '',
  "**C6 adapté.** `a2-05-travail/controle-relais-allege.mjs`, `b91ed6ddf43ef7e2aabc52ad14725a7c8b6359f76fa5e26f473be4806b72a4dc` : C6 vérifie exactement les numéros A1 à A10, dans l'ordre numérique. Aucun autre contrôle n'est modifié.",
  '',
  "**Règle `.gitattributes`.** `/docs/conception/addendum-A10-interrogatif.md text eol=crlf`, une ligne, à sa place dans la liste triée, juste avant la règle d'A9 ; fichier `5710749f06c7aff2d451c24c2847ec48a96567cc13dda68045f2b0da918e3c02`. A10 est ainsi stocké en LF et restauré en CRLF, comme A9. Sans elle, il relevait de `/docs/** -text`, et `git diff --check` aurait signalé ses CR au commit. Les attributs de tous les autres fichiers suivis sont inchangés.",
  '',
  "**C9b, écart temporaire.** C9b refuse tout changement non committé dans `docs/conception` ; il reste inchangé. Le relais rend donc 29 sur 30, C9b seul, jusqu'au prochain commit, qui le lève. Cet écart est attendu et n'en excuse aucun autre. Après ce commit, le relais normal revient à 30 sur 30, et `--strict` rend 29 sur 30, C5a seul, jusqu'au checkpoint suivant.",
  '',
  "**Les 120 avertissements `categorie-nulle`.** La vérification reste exigée avant toute déclaration de fin d'étape 2. Elle se fera après l'application des corrections, sans refaire automatiquement les 147 arbitrages documentés : la décision historique, le résultat appliqué et la justification finale sont vérifiés ; seuls les cas manquants, incohérents ou insuffisamment justifiés sont réexaminés.",
  '',
  "**Bloc F.** Toujours suspendu au registre. Après l'acceptation d'un périmètre opérationnel, chacun sur autorisation distincte : l'essai des filtres sur les 807 sens non porteurs, l'audit individuel des 17 sens et de leurs 17 décisions `type-nul`, la recherche d'omissions, distincte des 377.",
  '',
  "**Preuves historiques** : le §8.117 et les lignes antérieures du journal, dont « adoption non prononcée », décrivent l'état à leur rédaction ; ils ne sont pas réécrits.",
  '',
  "**Références périmées, signalées, non modifiées** : `CLAUDE.md`, §5, ligne 119, dit la proposition « ni adoptée ni normative » et A10 « seulement pressenti » ; `docs/relecture/reprise-A2-05.md` dit, ligne 27, les addenda « A1 à A9 » et classe, ligne 29, E5 en non normatif ; C4, C5e et Q7 du relais lisent encore la formule « ni adoptée ni normative », conservée ici comme mention datée de l'état antérieur au " + D + " ; leur adaptation demandera un arbitrage distinct. `a2-05-travail/arbitrage-F/references-git/verifier-installation.mjs` fige l'ancienne empreinte du contrôle du relais : c'est la preuve d'une installation passée, non un contrôle en service.",
  '',
  "Aucune correction lexicale n'est appliquée ; les 204 corrections restent retenues, non appliquées ; aucun filtre n'est lancé ; le bloc F n'est pas ouvert. Décomptes : 360/377, 17 restants, tous du bloc F ; 204 corrections dans 177 ENTRY ; V1-32 libre ; 45 empreintes ; bloc d'état inchangé. Aucun `git add`, commit ni push.",
];

ok(!existsSync(join(root, PROP)), 'P1 dossier de proposition absent, préparation jamais lancée');
for (const [p, h] of Object.entries(DEPART)) ok(sha(readFileSync(join(root, p))) === h, 'P2 empreinte de départ : ' + p, h);
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); for (const [a, b] of [...COMMUNS, ...PROPRES[p]]) ok(t.split(a).length === 2 && !t.includes(b), 'P3 ' + p + ' : ancre unique, remplacement absent', a.slice(0, 50).replace(/\n/g, ' ')); ok(t.split('\n').filter((l) => l.startsWith('- **Prochaine action.**')).length === 1, 'P4 ' + p + ' : « Prochaine action » unique'); }
ok(/^### 8\.117 /m.test(lire(BIL)) && !/^### 8\.118 /m.test(lire(BIL)) && !S8118.some((l) => l.startsWith('| ')), 'P5 bilan : §8.117 présent, §8.118 absent');
ok(!S8118.join('\n').includes(root) && !LIGNE_J.includes(root), 'P6 aucun chemin de machine');

const pilote = (p) => { let t = LFs(lire(p)); for (const [a, b] of [...COMMUNS, ...PROPRES[p]]) t = t.replace(a, () => b); t = t.split('\n').map((l) => (l.startsWith('- **Prochaine action.**') ? PA_NOUVELLE : l)).join('\n'); if (p === ETAT) t = t.replace(/\n+$/, '') + '\n' + LIGNE_J + '\n'; return rendre(p, t); };
const bilan = () => rendre(BIL, LFs(lire(BIL)).replace(/\n+$/, '') + '\n\n' + S8118.join('\n') + '\n');
const P = { [BIL]: bilan(), [ETAT]: pilote(ETAT), [ROAD]: pilote(ROAD) };

for (const p of [ETAT, ROAD]) ok(P[p].match(BLOC)[0] === lire(p).match(BLOC)[0], 'V1 ' + p + ' : bloc a2-05:etat inchangé, marqueur fe4967cf00896f07');
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**')); ok(pa(P[ETAT]) === pa(P[ROAD]), 'V2 « Prochaine action » identique dans les deux documents');
ok(/\.md`/.test(PA_NOUVELLE) && /autorisation/.test(PA_NOUVELLE) && /Aucun `git add`, commit ni push/.test(PA_NOUVELLE), 'V3 « Prochaine action » : document, autorisation, interdits');
const b0 = lire(BIL).replace(/(\r?\n)+$/, ''); ok(P[BIL].startsWith(b0) && P[BIL].slice(b0.length).split('### 8.').length === 2, 'V4 bilan : §8.117 et antérieur inchangés, §8.118 seul ajouté');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2} \| /.test(l)); const j0 = jr(lire(ETAT)), j1 = jr(P[ETAT].replaceAll(D, '2000-01-01')); ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'V5 journal antérieur conservé, une ligne ajoutée', j0.length + ' → ' + j1.length);
for (const p of [ETAT, ROAD, BIL]) ok(style(P[p]) !== 'mixte' && style(P[p]) === style(lire(p)), 'V6 ' + p + ' : fins de ligne homogènes et préservées', style(P[p]));
ok(/ni adoptée ni\s+normative/.test(P[ETAT]) && /ni adoptée ni\s+normative/.test(P[ROAD]), 'V7 mention datée lue par C5e et Q7 conservée');
ok(P[ETAT].includes(D) && P[ROAD].includes(D) && P[BIL].includes(D) && P[BIL].includes(S), 'V8 gabarits : variables présentes, rien de daté avant l\'installation');

mkdirSync(join(root, PROP, 'diffs'), { recursive: true }); const tab = [];
for (const [p, t] of Object.entries(P)) { const nom = p.split('/').pop(); writeFileSync(join(root, PROP, nom), t); const r = diffBrut(root, p, PROP + nom); ok(r.status === 1 && !r.stdout.includes('\r'), 'diff ciblé, sans CR : ' + nom); writeFileSync(join(root, PROP, 'diffs', nom + '.diff'), r.stdout); const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; tab.push('| `' + p + '` | `' + sha(readFileSync(join(root, p))) + '` | `' + sha(Buffer.from(t, 'utf8')) + '` | `' + sha(r.stdout) + '` | +' + n('+') + ' / −' + n('-') + ' |'); }
writeFileSync(join(root, PROP, 'table-diffs.md'), '| Fichier | Départ | Gabarit | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n\nVariables : `' + D + '`, `' + S + '`, remplies à l\'application depuis la trace de l\'installation réelle.\n');
writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n'); console.log(tab.join('\n')); console.log('préparation de la consignation conforme, non appliquée');
