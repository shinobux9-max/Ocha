// A2-05 : préparation, sans application, de la consignation de la clôture du checkpoint : §8.117 du bilan, `ETAT-ACTUEL.md`, `ROADMAP.md`.
// Blocs a2-05:etat, décisions historiques et lignes de journal antérieures inchangés ; `CLAUDE.md` et le relais signalés, jamais modifiés ; essai sur clone jetable ; dépôt réel inchangé hors du dossier de sortie.
// Usage : node a2-05-travail/arbitrage-F/consignation-cloture-checkpoint/preparer-consignation.mjs <racine du dépôt>. Sorties dans proposition/, seulement sans écart ; refus si le dossier existe. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { diffBrut } from '../moteur-application.mjs';
import { cloner, controler, EXCLUS } from '../essai-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/consignation-cloture-checkpoint/', PROP = OUT + 'proposition/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', REF = W + 'references-git.json', CL = W + 'cloture-checkpoint.mjs';
const DEPART = { [ETAT]: 'f697311b7e6756c9', [ROAD]: 'c455d511d197f238', [BIL]: 'c8abe093f4ccb02e' };
const N = '27b27ce0f0b6e62e0686a97194231fe23865b7a9', C = '39cce138f12c50d32675cc4acff5237883eec0b1', BLOC = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
const sha = (b) => createHash('sha256').update(b).digest('hex');
let ko = 0; const lignes = []; const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); lignes.push(m); }; const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const lire = (p) => readFileSync(join(root, p), 'utf8'); const LFs = (t) => t.replace(/\r\n/g, '\n'); const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout.trim();
if (existsSync(join(root, PROP))) { console.log('ARRÊT : ' + PROP + ' existe déjà'); process.exit(1); }

const PA_NOUVELLE = "- **Prochaine action.** L'installation éventuelle de l'addendum sur `interrogatif` (`docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md`, partie I) : orientation arbitrée le 2026-11-02, texte exact préparé dans `a2-05-travail/arbitrage-F/installation-A10/`, A10 non installé, contrôle d'unicité à refaire le jour de l'installation (bilan du volet 2, §8.117). Après une adoption éventuelle, chacun sur autorisation distincte : le périmètre opérationnel de F, à partir du périmètre préparatoire accepté (17 sens, 15 ENTRY, une seule tranche) ; l'essai des filtres sur les 807 sens non porteurs ; l'audit individuel des 17 sens et de leurs 17 décisions `type-nul` ; la recherche d'omissions, distincte des 377 sens du lot 3. Puis, chacun sur autorisation distincte : le statut de T1 et de T2 dans `registre-tranches.json`, sur arbitrage distinct ; la correction retenue en principe de `tools/export-relecture.mjs` (A2-GLOBAL-v1). Aucune correction lexicale n'est appliquée. Aucun `git add`, commit ni push sans autorisations distinctes.";
const BULLE = "- **Checkpoint Git clos le 2026-11-02, à l'état 6 sur 6.** Référence `27b27ce` ; commit de clôture `39cce13` ; `ocha-v2`, `origin/ocha-v2` et le distant réel à `39cce13` ; `a2-05-travail/cloture-checkpoint.mjs --verifier` : code 0, clôture conforme (bilan du volet 2, §8.117). Aucune correction lexicale n'y est appliquée, et E5 n'y est pas adopté.";
// Fragments communs aux deux documents de pilotage : [texte exact, remplacement]
const COMMUNS = [
  ['; bilan du volet 2, §8.106 à §8.116) (relais', '; bilan du volet 2, §8.106 à §8.117) (relais'],
  ["  pressenti. Aucune norme n'est modifiée.\n", "  pressenti. **Arbitrage normatif ouvert le 2026-11-02** : orientation retenue, texte d'installation\n  préparé, adoption non prononcée. Aucune norme n'est modifiée.\n"],
  ['- **Corrections retenues, non appliquées.** **204 corrections', BULLE + '\n- **Corrections retenues, non appliquées.** **204 corrections'],
  ["Puis l'arbitrage global et l'application des corrections, sur\n  autorisations distinctes.\n", "Puis l'arbitrage global et l'application des corrections, sur\n  autorisations distinctes. **La vérification des 120 avertissements `categorie-nulle` reste exigée\n  avant toute déclaration de fin d'étape 2.**\n"],
  ["Les travaux postérieurs au checkpoint B `7803163` (committé et poussé le 2026-10-18) sont\ndocumentaires et **ne sont ni committés ni poussés**. Relais : `docs/relecture/reprise-A2-05.md`.\n", "Le checkpoint clos le 2026-11-02 porte les travaux jusqu'à la clôture de T9 et à la révision 4 d'E5\n(référence `27b27ce`, commit de clôture `39cce13`). Les travaux postérieurs sont documentaires et\n**ne sont ni committés ni poussés**. Relais : `docs/relecture/reprise-A2-05.md`.\n"],
];
const PROPRES = {
  [ETAT]: [['**Tâche en cours (au 2026-10-23) : A2-05', '**Tâche en cours (au 2026-11-02) : A2-05']],
  [ROAD]: [
    ["**Dernière mise à jour :** 2026-10-18 (A2-05 en cours : volet 2 arbitré ; volet 1 : lots 1 et 2 arbitrés, lot 3 en cours, bloc A clos, 148 candidats arbitrés sur 377 ; volet 3 non commencé ; 185 corrections retenues, aucune appliquée)", "**Dernière mise à jour :** 2026-11-02 (A2-05 en cours : volet 2 arbitré ; volet 1 : lots 1 et 2 arbitrés, lot 3 en cours, 360 candidats arbitrés sur 377, 17 restants, tous du bloc F ; volet 3 non commencé ; 204 corrections retenues, aucune appliquée ; checkpoint Git clos, référence `27b27ce`)"],
    ['**Avancement (au 2026-10-16).** **A2-05 est en cours', '**Avancement (au 2026-11-02).** **A2-05 est en cours'],
    ["-   phrases/exemples nécessaires disponibles ;\n-   validations et tests de l'Étape 2 verts.\n", "-   phrases/exemples nécessaires disponibles ;\n-   vérification des 120 avertissements `categorie-nulle`, avant toute déclaration de fin d'étape 2 ;\n-   validations et tests de l'Étape 2 verts.\n"],
  ],
};
const LIGNE_J = "| 2026-11-02 | 2 · A2-05 | **Checkpoint Git clos, à l'état 6 sur 6**, chaque étape sur autorisation distincte : commit N `27b27ce` (351 fichiers), push, déclaration, commit de clôture `39cce13` (`references-git.json` seul), second push, `cloture-checkpoint.mjs --verifier` : code 0, « clôture conforme ». **Arbitrage normatif d'E5 ouvert** : orientation retenue, A10 non installé, `docs/conception/` inchangé. Périmètre préparatoire de F conservé ; audit et filtres non lancés. **La vérification des 120 avertissements `categorie-nulle` reste exigée avant toute déclaration de fin d'étape 2.** Les lignes antérieures marquées « non committé » ne sont pas réécrites ; §8.117. **360/377, 17 restants, tous du bloc F ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 45 empreintes.** | non committé |";
const S8117 = [
  "### 8.117 Volet 1, lot 3 : checkpoint Git clos à l'état 6 sur 6 ; arbitrage normatif d'E5 ouvert, A10 non installé (2026-11-02)",
  '',
  "Décisions du 2026-11-02 (ChatGPT, par délégation ; relayées par l'utilisateur), chacune distincte : « J'autorise exclusivement le premier commit local du checkpoint, sur les 351 fichiers proposés. » ; « J'autorise exclusivement le premier push de ce commit vers la branche `ocha-v2`. » ; « J'autorise exclusivement l'étape 3 sur 6 : la déclaration de la référence Git par `cloture-checkpoint.mjs --declarer`. » ; « J'autorise exclusivement l'étape 4 sur 6 : créer le commit local de clôture contenant uniquement `a2-05-travail/references-git.json`. » ; « J'autorise exclusivement l'étape 5 sur 6 : le second push de ce commit vers `origin/ocha-v2`. » ; « J'autorise exclusivement l'étape 6 sur 6 : l'exécution de `cloture-checkpoint.mjs --verifier`, en lecture seule. » ; « J'accepte la clôture du checkpoint Git à l'état 6 sur 6. »",
  '',
  "**Checkpoint clos.** Référence : `" + N + "`, de parent `78031638c0f81dca1b167e3f57f5a891767fc4cb`, 351 fichiers, +51 209 / −710. Commit de clôture : `" + C + "`, de parent `" + N + "`, le seul fichier `a2-05-travail/references-git.json`, la seule clé `checkpoint`. Sceau : `23391df72644ce3a41dccdeaf5b676838119891ebb5e431a58c9add1fe1643a0`. `ocha-v2`, `origin/ocha-v2` et le distant réel sont à `39cce13`, sans force ni tag.",
  '',
  "**Verdict** : `cloture-checkpoint.mjs --verifier`, exécuté une fois, code 0 : « clôture conforme : référence 27b27ce ; HEAD et distant réel 39cce13 ; relais --strict 30 conformes sur 30 ». `git status` identique avant et après. **La séquence Git est terminée ; elle ne se rouvre pas sans nécessité.** Le relais `--strict` retombera à 29 sur 30, C5a seul, dès le premier commit de contenu après la référence, jusqu'au checkpoint suivant : cet écart ne remet pas en cause la présente clôture.",
  '',
  "**Preuves historiques** : le §8.116 et les lignes antérieures du journal, dont la marque « non committé », décrivent l'état à leur rédaction ; ils ne sont pas réécrits. Le contenu committé est celui du dossier `docs/rapports/etape2-A2-05-checkpoint-T9-dossier.md`, et les fichiers exclus de cette sélection restent non suivis.",
  '',
  "**Arbitrage normatif d'E5, ouvert.** Orientation retenue : « Partie I de la révision 4. » ; « Numéro A10, sous réserve d'un nouveau contrôle d'unicité. » ; « Fichier `docs/conception/addendum-A10-interrogatif.md`. » ; « Statut normatif autonome, distinct d'A2-LING et d'A9. » ; « Partie II maintenue dans le rapport, non installée. » ; « Une entrée ajoutée à `docs/conception/00-sommaire.md`. » **Cette orientation n'est pas une adoption.** Le texte exact et son diff sont préparés dans `a2-05-travail/arbitrage-F/installation-A10/` ; `docs/conception/` n'est pas modifié, et A10 reste un numéro pressenti tant que l'installation n'est pas autorisée.",
  '',
  "**Bloc F** : périmètre préparatoire conservé, 17 sens dans 15 ENTRY, une seule tranche F. Audit non ouvert, filtres non lancés. Après une adoption éventuelle, chacun sur autorisation distincte : le périmètre opérationnel, l'essai des filtres sur les 807 sens non porteurs, l'audit individuel des 17 sens et de leurs 17 décisions `type-nul`, la recherche d'omissions, distincte des 377.",
  '',
  "**Clôture future de l'étape 2** : « Maintenir explicitement la vérification des 120 avertissements `categorie-nulle` avant toute déclaration de fin d'étape 2. » Le compte est celui de la référence technique `reconstruction/a2-04/avertissements-connus.json` ; l'audit individuel est arbitré depuis le 2026-10-08, ses corrections ne sont pas appliquées.",
  '',
  "**Références périmées, signalées, non modifiées** : `CLAUDE.md`, §5, ligne 128, annonce `ocha-v2` et `origin/ocha-v2` à `7803163`, et la ligne 129 dit les travaux postérieurs non committés ; `docs/relecture/reprise-A2-05.md`, ligne 18, présente T1 à T9 comme planifiées et non mises en œuvre, et la ligne 51 dit « Aucun périmètre de T1 n'est accepté. » Le relais en service ne peut différer de sa version figée que par sa ligne « Git » : sa correction demandera une procédure propre, sur autorisation distincte.",
  '',
  "**Restes signalés, non ouverts** : le statut « planifiée » des tranches dans `registre-tranches.json` ; le défaut de date de `empreintes-lot3.mjs` ; `sync-stable.mjs` ; S21 de `sabotages-recalcul-T9.mjs` et `correction-comparables/essais.mjs --apres-application` ; `arbitrage-F/controle-perimetre-F.mjs`, lié à `7803163` et à l'absence d'A10, à ne pas relancer tel quel ; les scripts de la présente préparation, hors de l'inventaire.",
  '',
  "Le bloc F n'est pas ouvert ; aucun filtre de recherche d'omissions n'est exécuté ; E5 n'est pas adopté ; A10 n'est pas installé. Décomptes : 360/377, 17 restants, tous du bloc F ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 45 empreintes ; bloc d'état inchangé. Aucun `git add`, commit ni push.",
];

// Préconditions
for (const [p, h] of Object.entries(DEPART)) ok(sha(readFileSync(join(root, p))).startsWith(h), 'P1 empreinte de départ : ' + p, h + '…');
ok(git('rev-parse', 'HEAD') === C && git('rev-parse', 'refs/remotes/origin/ocha-v2') === C, 'P2 HEAD et origin/ocha-v2 au commit de clôture', C.slice(0, 7));
ok(!git('diff', '--cached', '--name-only') && !git('diff', '--name-only'), 'P3 index vide ; aucun fichier suivi modifié');
ok(JSON.parse(lire(REF)).checkpoint?.commit === N, 'P4 référence déclarée', N.slice(0, 7));
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); for (const [a, b] of [...COMMUNS, ...PROPRES[p]]) ok(t.split(a).length === 2 && !t.includes(b), 'P5 ' + p + ' : ancre unique, remplacement absent', a.slice(0, 50).replace(/\n/g, ' ')); ok(t.split('\n').filter((l) => l.startsWith('- **Prochaine action.**')).length === 1, 'P6 ' + p + ' : « Prochaine action » unique'); }
ok(/^### 8\.116 /m.test(lire(BIL)) && !/^### 8\.117 /m.test(lire(BIL)) && !S8117.some((l) => l.startsWith('| ')), 'P7 bilan : §8.116 présent, §8.117 absent');
ok(!S8117.join('\n').includes(root) && !LIGNE_J.includes(root), 'P8 aucun chemin de machine');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// Fins de ligne de chaque fichier préservées : les documents de pilotage sont en CRLF, le bilan en LF
const style = (t) => { const c = (t.match(/\r\n/g) ?? []).length, l = (t.match(/\n/g) ?? []).length; return c === l ? 'CRLF' : c === 0 ? 'LF' : 'mixte'; };
const rendre = (p, t) => (style(lire(p)) === 'CRLF' ? t.replace(/\n/g, '\r\n') : t);
const pilote = (p) => { let t = LFs(lire(p)); for (const [a, b] of [...COMMUNS, ...PROPRES[p]]) t = t.replace(a, () => b); t = t.split('\n').map((l) => (l.startsWith('- **Prochaine action.**') ? PA_NOUVELLE : l)).join('\n'); if (p === ETAT) t = t.replace(/\n+$/, '') + '\n' + LIGNE_J + '\n'; return rendre(p, t); };
const bilan = () => rendre(BIL, LFs(lire(BIL)).replace(/\n+$/, '') + '\n\n' + S8117.join('\n') + '\n');
const P = { [BIL]: bilan(), [ETAT]: pilote(ETAT), [ROAD]: pilote(ROAD) };

// Vérifications de la proposition
for (const p of [ETAT, ROAD]) ok(P[p].match(BLOC)[0] === lire(p).match(BLOC)[0], 'V1 ' + p + ' : bloc a2-05:etat inchangé, marqueur fe4967cf00896f07');
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**')); ok(pa(P[ETAT]) === pa(P[ROAD]), 'V2 « Prochaine action » identique dans les deux documents');
const b0 = lire(BIL).replace(/(\r?\n)+$/, ''); ok(P[BIL].startsWith(b0) && P[BIL].slice(b0.length).split('### 8.').length === 2, 'V3 bilan : §8.116 et antérieur inchangés, §8.117 seul ajouté');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(lire(ETAT)), j1 = jr(P[ETAT]); ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'V4 journal antérieur conservé, une ligne ajoutée', j0.length + ' → ' + j1.length);
for (const p of [ETAT, ROAD]) { const a = lire(p).split('\r\n'), b = new Set(P[p].split('\r\n')); const perdues = a.filter((l) => !b.has(l)); ok(perdues.length <= 9, 'V5 ' + p + ' : seules les lignes visées sont remplacées', perdues.length + ' ligne(s)'); }
for (const p of [ETAT, ROAD, BIL]) ok(style(P[p]) !== 'mixte' && style(P[p]) === style(lire(p)), 'V6 ' + p + ' : fins de ligne homogènes et préservées', style(P[p]));

// Essai sur clone jetable
const instantane = () => { const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === W + 'sync-stable-apercu.md' || p.startsWith(OUT)) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } }; m(''); return h; };
const reel0 = instantane();
const cl = cloner(root); for (const [p, t] of Object.entries(P)) cl.ecrire(p, t);
const plan = controler(cl, 'E consignation', ok, { chemins: Object.keys(P) });
const octets = (b) => sha(readFileSync(b));
const mod = spawnSync('git', ['diff', '--name-only'], { cwd: cl.C, encoding: 'utf8' }).stdout.trim().split('\n').filter(Boolean).filter((p) => octets(cl.f(p)) !== octets(join(root, p))).sort();
ok(JSON.stringify(mod) === JSON.stringify(Object.keys(P).sort()), 'E fichiers suivis dont les octets diffèrent du dépôt réel : les trois visés seuls', mod.join(', '));
cl.nettoyer();
const reel1 = instantane(); const ch = [...new Set([...Object.keys(reel0), ...Object.keys(reel1)])].filter((p) => reel0[p] !== reel1[p]);
ok(!ch.length && !git('diff', '--cached', '--name-only') && !git('diff', '--name-only'), 'dépôt réel inchangé ; index vide', ch.join(', ') || Object.keys(reel1).length + ' fichiers');

// Sorties
if (!ko) {
  mkdirSync(join(root, PROP, 'diffs'), { recursive: true }); const tab = [];
  for (const [p, t] of Object.entries(P)) { const nom = p.split('/').pop(); writeFileSync(join(root, PROP, nom), t); const r = diffBrut(root, p, PROP + nom); ok(r.status === 1 && !r.stdout.includes('\r'), 'diff ciblé, sans CR : ' + nom); writeFileSync(join(root, PROP, 'diffs', nom + '.diff'), r.stdout); const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; tab.push('| `' + p + '` | `' + sha(readFileSync(join(root, p))) + '` | `' + sha(Buffer.from(t, 'utf8')) + '` | `' + sha(r.stdout) + '` | +' + n('+') + ' / −' + n('-') + ' |'); }
  writeFileSync(join(root, PROP, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff | Lignes |\n|---|---|---|---|---|\n' + tab.join('\n') + '\n\nPlan attendu après application : `' + plan + '`\n');
}
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation de la consignation conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
