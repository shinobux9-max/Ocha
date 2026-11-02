// A2-05 · volet 1 · lot 3 : préparation de l'inscription de l'arbitrage de T9 (décision du 2026-11-01), EN PROPOSITION : aucun fichier concerné n'est
// modifié (rapport de T9, configuration, bilan du volet 2, documents de pilotage, inventaire, manifeste, contrôles en service, données, journal, lots).
// Usage : node a2-05-travail/arbitrage-T9/preparer-inscription-T9.mjs <racine du dépôt>
// (1) Préconditions sur le dépôt réel. (2) Versions proposées, en mémoire : configuration (ARBITRAGE seul), §8.112 du bilan, fragments d'ETAT-ACTUEL.md et de
// ROADMAP.md, recalculs de T9 et de T8 adaptés par remplacements ciblés, complément de l'inventaire. (3) Clone jetable recouvert de l'arbre de travail : rapport
// présent (état de sa dernière génération), régénération par le module v2 ; seuls la ligne de statut et le §0 doivent changer. (4) Étape A (inscription, 44 entrées) :
// contrôles, comptes établis par les outils, 24 sens couverts, sept corrections, frontières, décisions inchangées ; sabotages des recalculs proposés, chacun vérifié
// comme modifiant le fichier. (5) Étape B, simulée seulement (45e entrée, bloc d'état synchronisé). (6) Écriture dans arbitrage-T9/inscription/, seulement si
// aucun écart ; refus si le dossier existe. (7) Dépôt réel inchangé. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T9 = W + 'arbitrage-T9/', OUT = T9 + 'inscription/';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9.md', CFG = W + 'audit-v1-lot3-T9.mjs', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const MAN = W + 'empreintes-rapports-arbitres.json', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', REC = W + 'recalcul-T9-perimetre.mjs', REC8 = W + 'recalcul-T8-perimetre.mjs', INV = W + 'INVENTAIRE-SCRIPTS.md';
const PREC = T9 + 'proposition-recalcul-T9-perimetre-arbitre.mjs', PREC8 = T9 + 'proposition-recalcul-T8-perimetre-apres-T9.mjs', SAUV = T9 + 'proposition-T9.md', APERCU = W + 'sync-stable-apercu.md', CAUD = T9 + 'audit/controle-audit-T9.mjs';
const RAP_SHA = '986c2439994a0bc100d314026c185257b34f5039da76f16bc7e819ea1d5e31eb', CFG_SHA = 'af5f861209bac7b926cb7c1588bfb5152d5a3f662dc9ddb1e7751e534c8950c3';
const JOURNAL = 'reconstruction/a2-04/journal.json', VOCAB = 'data/n5/vocab.json', REG = W + 'registre-tranches.json', CBP = W + 'controle-bilan-pilote.mjs';
const IDS = ['v_347_s1', 'v_347_s2', 'v_348_s1', 'v_348_s2', 'v_285_s1', 'v_704_s1', 'v_704_s2', 'v_659_s1', 'v_465_s1', 'v_183_s1', 'v_441_s1', 'v_468_s1', 'v_485_s1', 'v_495_s1', 'v_435_s1', 'v_443_s1', 'v_448_s1', 'v_463_s1', 'v_469_s1', 'v_477_s1', 'v_594_s1', 'v_91_s1', 'v_92_s1', 'v_459_s1'];
const N_ENTRY_ATTENDU = 177; // relevé par les règles de sync-stable.mjs ; vérifié par l'outil sur la copie (A3), jamais imposé
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex'); const shaT = (t) => createHash('sha256').update(t).digest('hex');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l, d) => console.log('constat  ' + l + (d ? ' : ' + d : ''));
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const lire = (p) => readFileSync(join(root, p), 'utf8');
const LFs = (t) => t.replace(/\r\n/g, '\n');
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');
if (existsSync(join(root, SAUV)) || existsSync(join(root, PREC)) || existsSync(join(root, PREC8))) arret('proposition déjà sauvegardée');
const TEMOINS = [RAP, CFG, BIL, MAN, ETAT, ROAD, REC, REC8, REG, VOCAB, JOURNAL, CBP, INV, W + 'recalcul-T5-perimetre.mjs', W + 'recalcul-T6-perimetre.mjs', W + 'recalcul-T7-perimetre.mjs', W + 'sync-stable.mjs', W + 'lot3-commun-v2.mjs', 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md'];
const avant = Object.fromEntries(TEMOINS.map((p) => [p, sha(join(root, p))]));
const lotsAvant = Object.fromEntries(readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => [f, sha(join(root, 'reconstruction/a2-04/lots', f))]));

// Les sept corrections : valeurs exactes, une seule source pour le §0, le bilan et le recalcul
const LIGNES_V1 = [
  "| V1-25 | `v_348_s2` | 前 « Avant (dans le temps) » | 10 | traduction | `meaning.alternatives` | `[\"Auparavant\"]` | `[]` ; aucune autre traduction ajoutée ; aucun autre champ modifié |",
  "| V1-26 | `v_285_s1` | おととし « Il y a deux ans » | 00 | fonction | `linguistic_functions.grammatical` | `[]` | `[\"deictique\"]`, A7, axe du temps ; aucun autre champ modifié |",
  "| V1-27 | `v_704_s2` | 近く « Prochainement » | 10 | fonction | `linguistic_functions.grammatical` | `[]` | `[\"deictique\"]`, A7, axe du temps ; aucun autre champ modifié |",
  "| V1-28 | `v_594` | 醤油 « Sauce soja » | 00 | tag de lieu | `tags` (ENTRY) | `[\"lieu_konbini\", \"lieu_restaurant\"]` | `[]` |",
  "| V1-29 | `v_91` | 晩ご飯 « Dîner » | 00 | tag de lieu | `tags` (ENTRY) | `[\"lieu_restaurant\"]` | `[]` |",
  "| V1-30 | `v_92` | 昼ご飯 « Déjeuner » | 00 | tag de lieu | `tags` (ENTRY) | `[\"lieu_restaurant\"]` | `[]` |",
  "| V1-31 | `v_459` | 朝ご飯 « Petit-déjeuner » | 00 | tag de lieu | `tags` (ENTRY) | `[\"lieu_restaurant\"]` | `[]` |",
];
const TETE_T = ['| N° | Sens | Mot | Lot | Écart | Champ | Avant | Après |', '|---|---|---|---|---|---|---|---|'];

// Fragments, hors du bloc généré, à l'identique dans ETAT-ACTUEL.md et ROADMAP.md (texte normalisé en LF)
const FRAGMENTS = [
  ['(B6 à B8). **336\n  candidats arbitrés sur 377 ; 41 restent**', '(B6 à B8). **360\n  candidats arbitrés sur 377 ; 17 restent**'],
  ['Les 41 candidats restants du lot 3, dont les 17 du bloc F', 'Les 17 candidats restants du lot 3, tous du bloc F'],
  ['**197 corrections, dans 172 ENTRY** :', '**204 corrections, dans ' + N_ENTRY_ATTENDU + ' ENTRY** :'],
  ['V1-24 (lot 3, T7 : traduction secondaire de まずい, sens 1 ; prochain identifiant V1-25), V2-1 à', 'V1-24 (lot 3, T7 : traduction secondaire de まずい, sens 1), V1-25 à V1-31 (lot 3, T9 : traduction secondaire de 前, sens 2 ; `deictique` de おととし et de 近く, sens 2 ; retraits de tags de lieu de 醤油, 晩ご飯, 昼ご飯 et 朝ご飯 ; prochain identifiant V1-32), V2-1 à'],
  ['; audit des 24 sens non autorisé ; **défaut « RES » corrigé le 2026-11-01**', "; **défaut « RES » corrigé le 2026-11-01**"],
  ['bilan du volet 2, §8.106 à §8.111) (relais', "**audit des 24 sens de T9 autorisé le 2026-11-01, en proposition, et livré** (`docs/rapports/etape2-A2-05-volet1-lot3-T9.md` : 17 conformes, 7 écarts, 0 suspendu) ; **T9 arbitrée le 2026-11-01** (§0 inscrit par le module v2, proposition conservée, `a2-05-travail/arbitrage-T9/proposition-T9.md` : **17 conformes, 7 écarts, 0 suspendu** ; V1-25 à V1-31 retenues, non appliquées ; absence de `deictique` confirmée pour 先, sens 2, et 前, sens 2 ; niveau 2 des six adjectifs de dimension confirmé, sans suspension ; aucun sens interjectif pour 痛い) ; bilan du volet 2, §8.106 à §8.112) (relais"],
  ["L'audit individuel des 24 sens de T9 (E1, E2, E3), sur autorisation distincte, le périmètre accepté (`docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md`) étant protégé au manifeste (44e entrée), le bloc d'état synchronisé et le défaut « RES » corrigé (bilan du volet 2, §8.111) ; puis, chacun sur autorisation distincte :", "La protection du rapport arbitré de T9 (`docs/rapports/etape2-A2-05-volet1-lot3-T9.md`) au manifeste (45e entrée), la synchronisation du bloc d'état et la clôture documentaire de T9, chacune sur autorisation distincte (bilan du volet 2, §8.112) ; puis, chacun sur autorisation distincte :"],
];
const LIGNE_JOURNAL = "| 2026-11-01 | 2 · A2-05 | **Audit des 24 sens de T9 livré en proposition, puis T9 arbitrée** (ChatGPT, par délégation) : `a2-05-travail/audit-v1-lot3-T9.mjs`, module commun v2 non modifié, en mode bloquant ; proposés et arbitrés : **17 conformes, 7 écarts, 0 suspendu** ; **V1-25 à V1-31 retenues, non appliquées** ; contrôle indépendant 41 sur 41, 15 sabotages sur 15. Inscription : §0 du rapport, §8.112 du bilan, proposition sauvegardée, recalculs de T9 et de T8 adaptés. **360/377, 17 restants, tous du bloc F ; 204 corrections dans " + N_ENTRY_ATTENDU + " ENTRY, non appliquées ; V1-32 libre.** Rapport arbitré hors du manifeste ; aucune correction lexicale appliquée. | non committé |";
const ANCRE_JOURNAL = '| 2026-11-01 | 2 · A2-05 | **Consolidation technique de T9 achevée';

// (1) Préconditions
const man0 = JSON.parse(lire(MAN)).empreintes;
ok(avant[RAP] === RAP_SHA && /^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/m.test(lire(RAP)) && !lire(RAP).includes('## 0. Arbitrage'), 'P1 rapport de T9 = proposition relue, sans §0', avant[RAP].slice(0, 12) + '…');
ok(avant[CFG] === CFG_SHA && /^const ARBITRAGE = null;$/m.test(lire(CFG)), 'P2 configuration relue ; ARBITRAGE non renseigné');
ok(!/^### 8\.112 /m.test(lire(BIL)) && /^### 8\.111 /m.test(lire(BIL)) && !/^\| V1-(2[5-9]|3[01]) \|/m.test(lire(BIL)), 'P3 bilan : §8.111 présent, §8.112 absent, V1-25 à V1-31 absentes');
ok(Object.keys(man0).length === 44 && Object.entries(man0).every(([p, h]) => sha(join(root, p)) === h) && !Object.hasOwn(man0, RAP), 'P4 manifeste : 44 empreintes identiques ; rapport de T9 absent');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && (a.includes(b) || !t.includes(b))), 'P5 ' + p + ' : ' + FRAGMENTS.length + ' fragments présents une fois, remplacements absents', FRAGMENTS.filter(([a]) => t.split(a).length !== 2).map(([a]) => a.slice(0, 40)).join(' | ')); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_JOURNAL)).length === 1, 'P6 ancre du journal présente une fois');

// (2a) Configuration proposée : seule la constante ARBITRAGE change
const ARB = {
  date: '2026-11-01',
  texte: [
    "Arbitrage du 2026-11-01 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **Je retiens les 24 verdicts proposés : 17 conformes, 7 écarts, 0 suspendu.** »",
    '',
    "**17 conformes, 7 écarts, 0 suspendu**, comme proposé. La proposition est conservée ci-dessous, telle qu'elle a été livrée ; ses verdicts du §1 et ses 24 fiches d'examen ne sont pas modifiés.",
    '',
    '| Point | Arbitrage |',
    '|---|---|',
    "| **Deixis (point 1)** | **`deictique` retenue pour おととし et pour 近く, sens 2** (V1-26, V1-27). **Absence de `deictique` confirmée pour 先, sens 2, et 前, sens 2.** |",
    "| **« Auparavant » (point 2)** | **Retirée de 前, sens 2** (V1-25). |",
    "| **Adjectifs de dimension (point 3)** | **Niveau 2 confirmé pour les six adjectifs, sans suspension.** « ne pas ajouter de catégories » |",
    "| **Extensions du lot 15 (point 4)** | Conformes, comme proposé. |",
    "| **嫌 et 痛い (point 5)** | Conformes. « Ne pas créer de sens interjectif pour 痛い » |",
    "| **Tags (point 6)** | **Retraits retenus séparément** pour 醤油, 晩ご飯, 昼ご飯 et 朝ご飯 (V1-28 à V1-31). |",
    "| **Autres sens** | « Confirmer [...] les 17 autres verdicts conformes », 大変 compris. « ne pas rouvrir les décisions historiques » |",
    '',
    "**Les sept corrections retenues, non appliquées :**",
    '',
    ...TETE_T, ...LIGNES_V1,
    '',
    "**Liste globale** : V1-25 à V1-31 s'ajoutent aux corrections retenues, non appliquées ; V1-22 et V1-23 restent réservés ; prochain identifiant : V1-32. Comptes calculés par les outils, non imposés à la main : **360 sens arbitrés sur 377, 17 restants, tous du bloc F ; 204 corrections, zéro appliquée, dans " + N_ENTRY_ATTENDU + " ENTRY.** Sept corrections n'ajoutent que cinq ENTRY : `v_348` et `v_704` en portent déjà une.",
  ],
};
const cfgProp = lire(CFG).replace(/^const ARBITRAGE = null;$/m, () => 'const ARBITRAGE = ' + JSON.stringify(ARB, null, 2) + ';');

// (2b) §8.112 du bilan : sept lignes de tableau de corrections
const S8112 = [
  '### 8.112 Volet 1, lot 3 : audit de T9 livré en proposition ; T9 arbitrée, 17 conformes, 7 écarts ; V1-25 à V1-31 retenues (2026-11-01)',
  '',
  "Décision du 2026-11-01 (ChatGPT, par délégation ; relayée par l'utilisateur) : « **J'accepte la consignation documentaire O1–O3–RES et autorise distinctement l'ouverture de l'audit individuel des 24 sens de T9, en proposition uniquement.** » Audit livré : `docs/rapports/etape2-A2-05-volet1-lot3-T9.md` (`986c2439…`), par `a2-05-travail/audit-v1-lot3-T9.mjs`, module v2 non modifié, en mode bloquant ; 17 conformes, 7 écarts, 0 suspendu ; contrôle indépendant `a2-05-travail/arbitrage-T9/audit/controle-audit-T9.mjs`, 41 sur 41, 15 sabotages sur 15.",
  '',
  "Arbitrage du 2026-11-01 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **Je retiens les 24 verdicts proposés : 17 conformes, 7 écarts, 0 suspendu.** » Détail au §0 du rapport, inscrit par le module v2 ; proposition relue conservée à l'identique hors du statut et du §0, et sauvegardée dans `a2-05-travail/arbitrage-T9/proposition-T9.md`.",
  '',
  "**Confirmés** : absence de `deictique` pour 先, sens 2, et 前, sens 2 ; niveau 2 des six adjectifs de dimension, sans suspension ; les 17 autres verdicts conformes. Aucun sens interjectif pour 痛い, aucune catégorie ajoutée, aucune décision historique rouverte. Aucune règle générale n'est déduite de T9.",
  '',
  ...TETE_T, ...LIGNES_V1,
  '',
  "**Décomptes calculés par les outils**, non saisis à la main : **360 sens arbitrés sur 377, 17 restants, tous du bloc F ; 204 corrections dans " + N_ENTRY_ATTENDU + " ENTRY, non appliquées ; V1-22 et V1-23 réservés ; prochain identifiant disponible : V1-32.** Sept corrections n'ajoutent que cinq ENTRY : `v_348` et `v_704` en portent déjà une. Le rapport arbitré de T9 reste hors du manifeste (44 empreintes) ; son ajout relève d'une autorisation distincte. T9 n'est pas close ; le bloc F et E5 ne sont pas ouverts. Aucune correction lexicale n'est appliquée ; aucun `git add`, commit ni push.",
];
const bilanProp = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8112.join(eol) + eol; })();
const pilote = (p, journal) => {
  const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z);
  if (journal) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_JOURNAL) ? [l, LIGNE_JOURNAL] : [l])).join('\n');
  return crlf ? t.replace(/\n/g, '\r\n') : t;
};
const prop = { [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [BIL]: bilanProp };

// (2c) Recalcul de T9 adapté, par remplacements ciblés : les contrôles historiques sont conservés, seul change ce qui décrivait l'état d'avant l'audit
const ligne = (t, debut, ...nouvelles) => { const L = t.split('\n'); const i = L.flatMap((l, k) => (l.startsWith(debut) ? [k] : [])); if (i.length !== 1) arret('recalcul : « ' + debut.slice(0, 50) + ' » : ' + i.length + ' occurrence(s)'); L.splice(i[0], 1, ...nouvelles); return L.join('\n'); };
let recProp = lire(REC);
if (recProp.includes('\r\n')) arret('recalcul de T9 en CRLF : cas non prévu');
recProp = ligne(recProp, '// Usage : node a2-05-travail/recalcul-T9-perimetre.mjs',
  "// Adaptation à l'arbitrage de T9 (rapport arbitré, §0), préparée le 2026-11-01, appliquée seulement sur autorisation distincte : le contrôle « sens non encore",
  "// examinés » devient « examinés dans le seul rapport de T9, arbitré » ; les 336 sens de la clôture de T8 restent contrôlés par leur empreinte ; les restants sont",
  "// tous du bloc F ; l'inventaire des 41 du périmètre égale les 24 de T9 et les 17 de F ; V1-25 à V1-31 s'ajoutent aux dix V2-n, inchangées, et restent non appliquées ;",
  "// rapport arbitré contre sa proposition sauvegardée. Les restants se contrôlent sans compte figé, pour survivre à l'arbitrage du bloc F.",
  '// Usage : node a2-05-travail/recalcul-T9-perimetre.mjs <racine du dépôt> [--inventaire]   (--inventaire : liste les sens restants, sens par sens)');
recProp = ligne(recProp, "// 2. Les 24 sens ne sont examinés dans aucun rapport", '// 2. Les 24 sens sont examinés dans le seul rapport de T9, arbitré, et dans aucun autre rapport de livraison ou de tranche (hors périmètres)');
recProp = ligne(recProp, 'const dejaVus = ids.filter(', "const RT9 = 'etape2-A2-05-volet1-lot3-T9.md'; const ailleurs = ids.filter((id) => JSON.stringify(rapports.filter((f) => fichesDe(f).includes(id))) !== JSON.stringify([RT9]));");
recProp = ligne(recProp, 'ctl(!dejaVus.length, ', "ctl(!ailleurs.length && rapports.includes(RT9) && /^\\*\\*Statut\\*\\* : \\*\\*arbitré le /m.test(txt('docs/rapports/' + RT9)), 'les 24 sens examinés dans le seul rapport de T9, arbitré (' + rapports.length + ' rapports de livraison et de tranche lus)', ailleurs.join(', ') || '24 sens');");
recProp = ligne(recProp, "ctl(reg.find((t) => t.id === 'T9')?.livraisons.join() === LIVS.join()", "ctl(reg.find((t) => t.id === 'T9')?.livraisons.join() === LIVS.join() && reg.find((t) => t.id === 'T9')?.statut === 'planifiée' && reg.find((t) => t.id === 'F')?.livraisons.join() === 'F1,F2' && reg.find((t) => t.id === 'F')?.statut === 'suspendue' && !parTr.T9 && restants.length <= 17 && restants.every((r) => trancheDe.get(r.liv) === 'F') && ids.every((id) => arbitres.has(id)), 'T9 = E1, E2 et E3, entièrement arbitrée, statut du registre non modifié ; F suspendue ; restants tous du bloc F', Object.entries(parTr).map(([k, v]) => k + ' ' + v).join(', '));");
const V1LIT = 'const V1T9 = ' + JSON.stringify(LIGNES_V1) + ';';
recProp = ligne(recProp, 'ctl(JSON.stringify(corr) === JSON.stringify(corrGen)',
  "const corrV2 = corr.filter((c) => c.startsWith('V2-')); // V1-25 à V1-31, retenues par l'arbitrage de T9, s'ajoutent : les dix V2-n du périmètre restent contrôlées telles quelles",
  "ctl(JSON.stringify(corrV2) === JSON.stringify(corrGen) && JSON.stringify(corrV2) === JSON.stringify(CORR) && lignesC.filter((l) => l.startsWith('| V2-')).every((l) => /^`nuance`/.test(l.split('|')[5]?.trim() ?? '')), 'corrections du périmètre sur les ENTRY de T9 : dix V2-n, toutes de nuance, égales au générateur', 'recalcul ' + corrV2.join(', ') + ' ; générateur ' + corrGen.join(', '));",
  V1LIT,
  "const lignesV1 = bilan.split('\\n').filter((l) => /^\\| V1-(2[5-9]|3[0-9]) \\|/.test(l));",
  "ctl(JSON.stringify(lignesV1) === JSON.stringify(V1T9) && corr.length === 17, 'V1-25 à V1-31 retenues, une ligne chacune, valeurs exactes de l\\'arbitrage ; aucune V1 au-delà', lignesV1.length + ' lignes ; ' + corr.length + ' corrections sur ces ENTRY');",
  "const pasAppliquee = JSON.stringify(sens.get('v_348_s2').s.meaning.alternatives) === '[\"Auparavant\"]' && !fn(sens.get('v_285_s1').s).length && !fn(sens.get('v_704_s2').s).length;",
  "ctl(pasAppliquee, 'V1-25 à V1-27 non appliquées (V1-28 à V1-31 : tags publiés, contrôle 7)', 'Auparavant publiée ; おととし et 近く s2 sans fonction');");
recProp = ligne(recProp, 'const invIds = [...invL.matchAll(', "const invIds = [...invL.matchAll(new RegExp('`(' + ID + ')`', 'g'))].map((m) => m[1]); const vus41 = liste.filter((r) => !arbitres.has(r.id) || ids.includes(r.id) || trancheDe.get(r.liv) === 'F'); const manque = vus41.filter((r) => !invL.includes(r.mot + ' `' + r.id + '`'));");
recProp = ligne(recProp, 'ctl(invIds.length === 41 && ',
  "ctl(invIds.length === 41 && new Set(invIds).size === 41 && vus41.length === 41 && !manque.length, 'inventaire des 41 du rapport = 24 sens de T9 et 17 de F, chacun une fois', manque.map((r) => r.id).join(', ') || invIds.length + ' sens');",
  '',
  '// 11 bis. Rapport arbitré de T9 : statut et §0 ; hors du statut et du §0, identique à sa proposition sauvegardée, empreinte fixée. Un fichier absent se lit vide',
  "const RAP9 = 'docs/rapports/' + RT9, SAUV9 = 'a2-05-travail/arbitrage-T9/proposition-T9.md';",
  "const SL = (existsSync(join(root, SAUV9)) ? txt(SAUV9) : '').split('\\n'), RL = (existsSync(join(root, RAP9)) ? txt(RAP9) : '').split('\\n');",
  "const a1 = RL.indexOf('## 0. Arbitrage'), b1 = RL.indexOf('## 1. Résultat proposé'); const sans1 = a1 > 0 && b1 > a1 ? [...RL.slice(0, a1), ...RL.slice(b1)] : RL;",
  "const st1 = SL.findIndex((l) => l.startsWith('**Statut** : '));",
  "ctl(octets(SAUV9) === '" + RAP_SHA + "' && /^\\*\\*Statut\\*\\* : \\*\\*proposition, non arbitrée\\.\\*\\*/.test(SL[st1] ?? '') && /^\\*\\*Statut\\*\\* : \\*\\*arbitré le 2026-11-01\\*\\* \\(§0\\)\\./.test(RL[st1] ?? '') && a1 > 0 && b1 > a1 && sans1.length === SL.length && sans1.every((l, k) => k === st1 || l === SL[k]), 'rapport arbitré de T9 (§0) : hors du statut et du §0, identique à sa proposition sauvegardée, §1 et 24 fiches compris', sans1.length + ' lignes comparées ; proposition ' + octets(SAUV9).slice(0, 12) + '…');",
  "const s0T9 = a1 > 0 && b1 > a1 ? RL.slice(a1, b1).join('\\n') : '';",
  "ctl(s0T9.includes('**17 conformes, 7 écarts, 0 suspendu**') && V1T9.every((l) => s0T9.includes(l)) && s0T9.includes('**Absence de `deictique` confirmée pour 先, sens 2, et 前, sens 2.**') && s0T9.includes('**Niveau 2 confirmé pour les six adjectifs, sans suspension.**') && s0T9.includes('Ne pas créer de sens interjectif pour 痛い'), '§0 de T9 : 17 conformes, 7 écarts, 0 suspendu ; sept corrections aux valeurs exactes ; 先 s2, 前 s2, six adjectifs et 痛い', s0T9.split('\\n').length + ' lignes');");
recProp = ligne(recProp, "console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');",
  'const posR = cles.indexOf(RAP9);',
  "ctl(posR === -1 || posR === 44, 'rapport arbitré de T9 absent du manifeste ou en 45e entrée', posR === -1 ? 'hors du manifeste' : posR === 44 ? '45e entrée' : (posR + 1) + 'e entrée');",
  "console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');");

// (2d) Recalcul de T8 : deux contrôles figeaient l'état d'avant l'arbitrage de T9 (T9 24 restants) ; seuls ces comptes deviennent compatibles avec T9 arbitrée
let rec8Prop = lire(REC8);
if (rec8Prop.includes('\r\n')) arret('recalcul de T8 en CRLF : cas non prévu');
const remplacerUne = (t, a, z) => { if (t.split(a).length !== 2) arret('recalcul de T8 : fragment introuvable ou multiple : ' + a.slice(0, 50)); return t.replace(a, () => z); };
rec8Prop = remplacerUne(rec8Prop, "restants.length === 41 && !parTr.T8 && parTr.T9 === 24 && parTr.F === 17, 'restants par tranche du registre : T9 24, F 17 ; 41 en tout ; T8 = D5 et D8", "!parTr.T8 && (parTr.T9 ?? 24) === 24 && parTr.F === 17 && restants.length === 17 + (parTr.T9 ?? 0), 'restants par tranche du registre : T9 24, ou aucun une fois arbitrée, F 17 ; T8 = D5 et D8");
rec8Prop = remplacerUne(rec8Prop, "const vus57 = liste.filter((r) => !arbitres.has(r.id) || ids.includes(r.id));", "const vus57 = liste.filter((r) => !arbitres.has(r.id) || ids.includes(r.id) || trancheDe.get(r.liv) === 'T9');");
rec8Prop = remplacerUne(rec8Prop, "'inventaire des 57 du rapport = 41 restants recalculés et 16 sens de T8, chacun une fois'", "'inventaire des 57 du rapport = 16 sens de T8, 24 de T9 et 17 de F, chacun une fois'");

// (2e) Complément de l'inventaire : lignes insérées après la dernière ligne de T9 ; aucune ligne existante ne change
const ANCRE_INV = '| `arbitrage-T9/consignation-O1-O3-RES/preparer-consignation.mjs` |';
const c8 = (p) => sha(join(root, W + p)).slice(0, 8);
const LIGNES_INV = [
  "| `arbitrage-T9/consignation-O1-O3-RES/application/appliquer-consignation.mjs` | application de la consignation O1–O3–RES : préconditions, diffs régénérés, hunks relus par remplacements ciblés, contrôles (`" + c8('arbitrage-T9/consignation-O1-O3-RES/application/appliquer-consignation.mjs') + "…`) | `ETAT-ACTUEL.md`, `ROADMAP.md`, bilan, inventaire | lancé une fois, code 0, 75 vérifications |",
  "| `arbitrage-T9/consignation-O1-O3-RES/application/essayer-consignation.mjs` | essai de ce script sur une copie jetable : 13 refus, exécution nominale, seconde exécution refusée (`" + c8('arbitrage-T9/consignation-O1-O3-RES/application/essayer-consignation.mjs') + "…`) | — (sortie standard) | code 0 |",
  "| `audit-v1-lot3-T9.mjs` | audit des 24 sens de T9 (E1, E2, E3) : configuration passée au module commun v2, non modifié, en mode bloquant (`" + CFG_SHA.slice(0, 8) + "…`, constante `ARBITRAGE` non renseignée) | `docs/rapports/etape2-A2-05-volet1-lot3-T9.md` | lancé le 2026-11-01, code 0 |",
  "| `arbitrage-T9/audit/controle-audit-T9.mjs` | contrôle indépendant de l'audit de T9 en proposition (n'importe aucun module v2) ; `--sabotages` : 15 sabotages en mémoire et un témoin (`" + c8('arbitrage-T9/audit/controle-audit-T9.mjs') + "…`) ; il décrit l'état d'avant l'arbitrage | `…/audit/sortie-controle-audit-T9.txt` | code 0, 41 sur 41 |",
  "| `arbitrage-T9/audit/assembler-note.mjs` | assemblage de la note d'export de l'audit de T9 (`" + c8('arbitrage-T9/audit/assembler-note.mjs') + "…`) | `note-export-lot3-T9-audit.md` | lancé une fois, code 0 |",
  "| `arbitrage-T9/preparer-inscription-T9.mjs` | préparation de l'inscription de l'arbitrage de T9, sans application : versions proposées, simulation sur clone jetable, sabotages des recalculs adaptés, étape B simulée | `arbitrage-T9/inscription/` | lancé le 2026-11-01 |",
];
const invB = lire(INV); if (invB.includes('\r\n')) arret('inventaire en CRLF : cas non prévu');
const invL = invB.split('\n'); const iInv = invL.flatMap((l, k) => (l.startsWith(ANCRE_INV) ? [k] : []));
ok(iInv.length === 1, 'P7 ancre de l\'inventaire présente une fois', iInv.length + ' occurrence(s)');
const invProp = [...invL.slice(0, iInv[0] + 1), ...LIGNES_INV, ...invL.slice(iInv[0] + 1)].join('\n');
const scripts = (d) => readdirSync(d).flatMap((e) => { const p = join(d, e); return statSync(p).isDirectory() ? scripts(p) : e.endsWith('.mjs') ? [p] : []; });
const copies = /[\\/](depart|inscription|consolidation|consignation-E2-E4|preparation-E3)[\\/][^\\/]*$/;
const nonListes = (t) => scripts(join(root, W)).filter((p) => !copies.test(p)).filter((p) => !t.includes(basename(p))).map((p) => p.slice(join(root, W).length).replace(/\\/g, '/'));
constat('I1 relevé mécanique : scripts absents de l\'inventaire avant complément', nonListes(invB).join(', ') || 'aucun');
ok(!nonListes(invProp).length, 'I2 après complément : aucun script absent (hors copies de versions proposées)', nonListes(invProp).join(', ') || 'aucun');
ok(invProp.split('\n').length === invL.length + LIGNES_INV.length && invL.every((l) => invProp.split('\n').includes(l)), 'I3 complément : ' + LIGNES_INV.length + ' lignes ajoutées, aucune ligne existante modifiée');

// (3) Clone jetable : état de la génération du rapport relu (rapport présent), puis régénération avec ARBITRAGE
const tmp = mkdtempSync(join(tmpdir(), 'ocha-inscription-t9-')); const C = join(tmp, 'arbre'); const fC = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [fC(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim().slice(0, 240));
const sauvProp = lire(RAP);
writeFileSync(fC(CFG), cfgProp); // Rapport laissé en place : la version relue a été régénérée ainsi, et son §6 décrit cet état (336 arbitrés, 24 proposés, 17 restants)
const g = lancer(CFG); const rapProp = existsSync(fC(RAP)) ? readFileSync(fC(RAP), 'utf8') : '';
const L0 = sauvProp.split('\n'), L1 = rapProp.split('\n'); const i0 = L1.indexOf('## 0. Arbitrage'), i1 = L1.indexOf('## 1. Résultat proposé');
const sans0 = i0 > 0 && i1 > i0 ? [...L1.slice(0, i0), ...L1.slice(i1)] : L1; const st = L0.findIndex((l) => l.startsWith('**Statut** : '));
const memes = sans0.length === L0.length && sans0.every((l, k) => (k === st ? /^\*\*Statut\*\* : \*\*arbitré le 2026-11-01\*\* \(§0\)\./.test(l) : l === L0[k]));
ok(g.code === 0 && i0 > 0 && i1 > i0 && memes, 'E1 rapport régénéré avec ARBITRAGE : seuls changent la ligne de statut et le §0 inséré', 'génération code ' + g.code + (g.out ? ' (' + g.out.slice(0, 200) + ')' : '') + ' ; §0 : ' + (i1 - i0) + ' lignes ; ' + shaT(rapProp).slice(0, 12) + '…');
const fichesR = [...rapProp.matchAll(/^#### `(v_\d+_s\d+)` · /gm)].map((m) => m[1]);
ok(JSON.stringify([...fichesR].sort()) === JSON.stringify([...IDS].sort()) && /\*\*24 sens examinés : 17 conformes, 7 écart, aucun sens suspendu\.\*\*/.test(rapProp), 'E2 §1 et 24 fiches d\'examen d\'origine conservés, exactement les 24 sens du périmètre');
for (const p of [ETAT, ROAD, BIL]) writeFileSync(fC(p), prop[p]);
writeFileSync(fC(INV), invProp); writeFileSync(fC(SAUV), sauvProp); writeFileSync(fC(PREC), recProp); writeFileSync(fC(PREC8), rec8Prop);
ok([PREC, PREC8, CFG].every((p) => spawnSync(process.execPath, ['--check', fC(p)], { encoding: 'utf8' }).status === 0), 'E3 node --check des deux recalculs et de la configuration proposés');

const etape = (nom, rec9, rec8) => {
  const r = { cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs'), cbp: lancer(CBP), recT5: lancer(W + 'recalcul-T5-perimetre.mjs'), recT6: lancer(W + 'recalcul-T6-perimetre.mjs'), recT7: lancer(W + 'recalcul-T7-perimetre.mjs'), recT8: lancer(rec8), recT9: lancer(rec9), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), ap: lancer(W + 'sync-stable.mjs', '--apercu') };
  r.apercu = readFileSync(fC(APERCU), 'utf8');
  for (const [k, v] of Object.entries(r)) if (v?.out !== undefined) console.log('   ' + nom + ' ' + k + ' (code ' + v.code + ') : ' + v.out.split('\n').pop().slice(0, 170) + (ecartsDe(v).length ? ' | ' + ecartsDe(v).join(' | ') : ''));
  return r;
};
const etats = (cwd) => JSON.parse(spawnSync(process.execPath, ['--input-type=module', '-e', "import {couverture} from './a2-05-travail/couverture-lot3.mjs'; console.log(JSON.stringify(couverture('.').sens.map((s)=>[s.id,s.livraison,s.etat])))"], { cwd, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout || '[]');

// (4) Étape A
console.log('--- Étape A : inscription, 44 entrées au manifeste');
const A = etape('A', PREC, PREC8);
const planA = (A.ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
ok(A.cov.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(A.cov.out), 'A1 couverture : 360 arbitrés, 0 proposé, 17 restants', A.cov.out.slice(0, 70));
const plusA = A.apercu.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++'));
ok(plusA.some((l) => /360 sens arbitrés sur 377 ; 17 restent \(0 proposés\)/.test(l)), 'A2 sync-stable : 360/377, 17 restent, 0 proposé', planA);
const lCorr = plusA.find((l) => /Corrections retenues/.test(l)) ?? '';
ok(/: 204, dans 177 ENTRY ; prochain numéro libre : V1-32\./.test(lCorr) && N_ENTRY_ATTENDU === 177, 'A3 corrections établies par l\'outil : 204, ENTRY distinctes et prochain numéro', lCorr.slice(0, 120));
ok(A.recT9.code === 0, 'A4 recalcul de T9 proposé conforme à l\'état d\'après l\'inscription', A.recT9.out.split('\n').pop());
ok(A.recT8.code === 0, 'A4 bis recalcul de T8 proposé conforme', A.recT8.out.split('\n').pop());
ok(A.emp.code === 0 && A.cbp.code === 0 && A.recT5.code === 0 && A.recT6.code === 0 && A.recT7.code === 0, 'A5 empreintes, bilan du pilote, recalculs de T5, T6 et T7 conformes, sans adaptation', [A.emp, A.cbp, A.recT5, A.recT6, A.recT7].map((r) => r.code).join(' '));
constat('A6 relais (état intermédiaire : rapport hors du manifeste, bloc non synchronisé)', A.rel.out.split('\n').pop() + ' ; ' + (A.rel.out.split('\n').filter((l) => /^\s*(ÉCART|écart|FAUX|faux)/.test(l)).map((l) => l.trim().slice(0, 130)).join(' | ') || 'aucun écart'));
const rec9Service = lancer(REC); constat('A7 recalcul de T9 en service, non adapté', 'code ' + rec9Service.code + ' ; ' + (ecartsDe(rec9Service).map((l) => l.slice(0, 90)).join(' | ') || 'aucun écart'));
const rec8Service = lancer(REC8); constat('A7 bis recalcul de T8 en service, non adapté', 'code ' + rec8Service.code + ' ; ' + (ecartsDe(rec8Service).map((l) => l.slice(0, 90)).join(' | ') || 'aucun écart'));
const caud = lancer(CAUD); constat('A7 ter contrôle de l\'audit en proposition, sur le rapport arbitré', 'code ' + caud.code + ' ; ' + (ecartsDe(caud).map((l) => l.slice(0, 90)).join(' | ') || 'aucun écart'));
// Les 24 sens couverts, les frontières, et rien d'antérieur modifié
const e0 = etats(root), e1 = etats(C); const arb = (e) => new Set(e.filter(([, , s]) => s === 'arbitré').map(([id]) => id));
const nouveaux = [...arb(e1)].filter((id) => !arb(e0).has(id)).sort(), perdus = [...arb(e0)].filter((id) => !arb(e1).has(id));
ok(JSON.stringify(nouveaux) === JSON.stringify([...IDS].sort()) && !perdus.length, 'A8 exhaustivité : les arbitrés nouveaux sont exactement les 24 sens de T9, aucun arbitré perdu', nouveaux.length + ' nouveaux, ' + perdus.length + ' perdus');
const rest = e1.filter(([, , s]) => s !== 'arbitré'); const parL = {}; for (const [, l] of rest) parL[l] = (parL[l] ?? 0) + 1;
ok(rest.length === 17 && Object.keys(parL).every((l) => ['F1', 'F2'].includes(l)), 'A8 bis frontières : les 17 restants sont dans le bloc F seulement', Object.entries(parL).map(([k, v]) => k + ' ' + v).join(', '));
ok(sha(fC(JOURNAL)) === avant[JOURNAL] && sha(fC(VOCAB)) === avant[VOCAB] && sha(fC(REG)) === avant[REG] && Object.entries(lotsAvant).every(([f, h]) => sha(fC('reconstruction/a2-04/lots/' + f)) === h), 'A9 journal, lots, données et registre des tranches identiques : aucune décision antérieure modifiée, aucune correction appliquée');
ok(LIGNES_V1.every((l) => prop[BIL].split(/\r?\n/).filter((x) => x === l).length === 1) && !/^\| V1-32 \|/m.test(prop[BIL]) && !/^\| V1-2[23] \|/m.test(prop[BIL]), 'A10 sept lignes de corrections, une fois chacune ; V1-22 et V1-23 non retenues ; V1-32 non attribué');
const ass = spawnSync(process.execPath, [fC('tools/reconstruction/run.mjs'), 'assemble'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 });
ok(ass.status === 0 && /684 ENTRY, 35 identifiant/.test(ass.stdout), 'A11 assemblage réel sur la copie', 'code ' + ass.status);

// Sabotages des recalculs proposés : chacun modifie réellement un fichier, puis il est restauré
const temoin0 = lancer(PREC); ok(temoin0.code === 0, 'R0 témoin sain avant les sabotages', temoin0.out.split('\n').pop());
const sabote = (nom, p, f, attendu, script = PREC) => {
  const orig = readFileSync(fC(p), 'utf8'); const mod = f(orig);
  if (mod === orig) { ok(false, nom, 'sabotage sans effet sur ' + p); return; }
  writeFileSync(fC(p), mod); const r = lancer(script); writeFileSync(fC(p), orig);
  const e = ecartsDe(r); ok(r.code === 1 && e.some((l) => attendu.test(l)) && readFileSync(fC(p), 'utf8') === orig, nom, 'code ' + r.code + ' ; ' + e.length + ' écart(s) : ' + e.map((l) => l.replace(/^ÉCART\s+/, '').split(' : ')[0].slice(0, 70)).join(' | '));
};
const vocabMod = (f) => (t) => { const o = JSON.parse(t); f(o); return JSON.stringify(o, null, 2) + '\n'; };
sabote('R1 rapport de T9 revenu à la proposition', RAP, () => sauvProp, /les 24 sens examinés dans le seul rapport/);
sabote('R2 proposition sauvegardée modifiée (un caractère)', SAUV, (t) => t + ' ', /rapport arbitré de T9 \(§0\)/);
sabote('R3 verdict modifié dans le rapport arbitré', RAP, (t) => t.replace('— proposé : **conforme**', '— proposé : **écart**'), /rapport arbitré de T9 \(§0\)/);
sabote('R4 une fiche retirée du rapport arbitré', RAP, (t) => t.replace('#### `v_495_s1` · ', '#### sans identifiant · '), /les 24 sens examinés dans le seul rapport/);
sabote('R5 §0 : valeur de V1-28 altérée', RAP, (t) => t.replace('| `[\"lieu_konbini\", \"lieu_restaurant\"]` | `[]` |', '| `[\"lieu_konbini\", \"lieu_restaurant\"]` | `[\"lieu_restaurant\"]` |'), /§0 de T9/);
sabote('R6 §0 : 先 et 前 altérés', RAP, (t) => t.replace('**Absence de `deictique` confirmée pour 先, sens 2, et 前, sens 2.**', '**`deictique` ajoutée.**'), /§0 de T9/);
sabote('R7 §0 : adjectifs altérés', RAP, (t) => t.replace('**Niveau 2 confirmé pour les six adjectifs, sans suspension.**', '**Six adjectifs suspendus.**'), /§0 de T9/);
sabote('R8 §0 : décompte altéré', RAP, (t) => t.replace('**17 conformes, 7 écarts, 0 suspendu**, comme proposé', '**16 conformes, 8 écarts, 0 suspendu**, comme proposé'), /§0 de T9/);
sabote('R9 un sens de T9 examiné aussi dans un autre rapport', 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md', (t) => t + '\n#### `v_347_s1` · 先\n', /les 24 sens examinés dans le seul rapport/);
sabote('R10 rapport antérieur retiré : les 336 ne sont plus entiers', 'docs/rapports/etape2-A2-05-volet1-lot3-T5.md', (t) => t.replace(/^\*\*Statut\*\* : \*\*arbitré le /m, '**Statut** : **proposition du '), /les 336 sens arbitrés/);
sabote('R11 statut de T9 changé au registre', REG, (t) => JSON.stringify((() => { const o = JSON.parse(t); o.tranches.find((x) => x.id === 'T9').statut = 'arbitrée'; return o; })(), null, 2) + '\n', /entièrement arbitrée/);
sabote('R12 V1-30 retirée du bilan', BIL, (t) => t.replace(/^\| V1-30 \|.*\r?\n/gm, ''), /V1-25 à V1-31 retenues/);
sabote('R13 V1-27 altérée au bilan', BIL, (t) => t.replace('| `[\"deictique\"]`, A7, axe du temps ; aucun autre champ modifié |\r\n| V1-28', '| `[\"discours\"]` |\r\n| V1-28').replace('| `[\"deictique\"]`, A7, axe du temps ; aucun autre champ modifié |\n| V1-28', '| `[\"discours\"]` |\n| V1-28'), /V1-25 à V1-31 retenues/);
sabote('R14 V1-32 inventée au bilan', BIL, (t) => t.replace(/(^\| V1-31 \|.*\r?\n)/m, '$1| V1-32 | `v_348_s1` | 前 | 10 | x | x | x | x |\n'), /V1-25 à V1-31 retenues/);
sabote('R15 V2-152 retirée du bilan', BIL, (t) => t.replace(/^\| V2-152 \|.*\r?\n/gm, ''), /dix V2-n/);
sabote('R16 rapport arbitré mal placé au manifeste', MAN, (t) => { const o = JSON.parse(t); o.empreintes[ROAD] = sha(fC(ROAD)); o.empreintes[RAP] = sha(fC(RAP)); return JSON.stringify(o, null, 2) + '\n'; }, /absent du manifeste ou en 45e entrée/);
sabote('R17 V1-30 appliquée en douce', VOCAB, vocabMod((o) => { o.find((e) => e.id === 'v_92').tags = []; }), /tags publiés/);
sabote('R18 V1-26 appliquée en douce', VOCAB, vocabMod((o) => { o.find((e) => e.id === 'v_285').senses[0].linguistic_functions.grammatical = ['deictique']; }), /V1-25 à V1-27 non appliquées/);
sabote('R19 V1-25 appliquée en douce', VOCAB, vocabMod((o) => { o.find((e) => e.id === 'v_348').senses[1].meaning.alternatives = []; }), /V1-25 à V1-27 non appliquées/);
sabote('R20 un sens de F compté arbitré', REG, (t) => JSON.stringify((() => { const o = JSON.parse(t); o.tranches.find((x) => x.id === 'F').statut = 'planifiée'; return o; })(), null, 2) + '\n', /F suspendue/);
sabote('R21 recalcul de T8 proposé : T8 changée au registre', REG, (t) => JSON.stringify((() => { const o = JSON.parse(t); o.tranches.find((x) => x.id === 'T8').statut = 'arbitrée'; return o; })(), null, 2) + '\n', /restants par tranche/, PREC8);
sabote('R22 recalcul de T8 proposé : rapport de T7 retiré', 'docs/rapports/etape2-A2-05-volet1-lot3-T7.md', (t) => t.replace(/^\*\*Statut\*\* : \*\*arbitré le /m, '**Statut** : **proposition du '), /320 sens arbitrés/, PREC8);
const temoin1 = lancer(PREC); ok(temoin1.code === 0 && lancer(PREC8).code === 0, 'R23 témoins sains après les sabotages', temoin1.out.split('\n').pop());

// (5) Étape B, simulée seulement
console.log('--- Étape B, simulée : recalculs installés, 45e entrée, bloc d\'état synchronisé');
cpSync(fC(PREC), fC(REC)); cpSync(fC(PREC8), fC(REC8));
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter');
const manB = JSON.parse(readFileSync(fC(MAN), 'utf8')).empreintes;
ok(aj.code === 0 && Object.keys(manB).length === 45 && Object.keys(manB).at(-1) === RAP && Object.keys(man0).every((k, n) => Object.keys(manB)[n] === k && manB[k] === man0[k]), 'B1 ajout au manifeste : 45 entrées, les 44 précédentes inchangées', aj.out.split('\n').pop().slice(0, 120));
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const planB = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const apercuB = readFileSync(fC(APERCU), 'utf8');
const app = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', planB);
ok(app.code === 0, 'B2 synchronisation simulée', 'plan ' + planB + ' ; code ' + app.code + ' ; ' + app.out.split('\n').pop().slice(0, 120));
const B = etape('B', REC, REC8);
lancer(W + 'sync-stable.mjs', '--apercu');
ok(B.cov.code === 0 && B.emp.code === 0 && B.cbp.code === 0 && B.recT5.code === 0 && B.recT6.code === 0 && B.recT7.code === 0 && B.recT8.code === 0 && B.recT9.code === 0 && B.rel.code === 0 && /30 conformes sur 30/.test(B.rel.out), 'B3 état final : tous les contrôles à 0 ; relais 30 sur 30', B.rel.out.split('\n').pop());
const dernier = readFileSync(fC(APERCU), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
ok(!dernier.length, 'B4 aperçu suivant vide', dernier.length + ' ligne(s) de différence');
ok(spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: C, encoding: 'utf8' }).stdout.trim() === '', 'B5 index vide sur la copie');

// (6) Écriture des propositions, seulement sans écart
if (!ko) {
  const d = join(root, OUT); mkdirSync(join(d, 'diffs'), { recursive: true });
  const ecrire = (nom, t) => writeFileSync(join(d, nom), t);
  ecrire('audit-v1-lot3-T9.mjs', cfgProp); ecrire('etape2-A2-05-volet1-lot3-T9.md', rapProp); ecrire('proposition-T9.md', sauvProp);
  ecrire('etape2-A2-05-bilan-volet2.md', prop[BIL]); ecrire('ETAT-ACTUEL.md', prop[ETAT]); ecrire('ROADMAP.md', prop[ROAD]); ecrire('INVENTAIRE-SCRIPTS.md', invProp);
  ecrire('proposition-recalcul-T9-perimetre-arbitre.mjs', recProp); ecrire('proposition-recalcul-T8-perimetre-apres-T9.mjs', rec8Prop); ecrire('apercu-etape-A.md', A.apercu); ecrire('apercu-etape-B.md', apercuB);
  const lignesT = [];
  for (const [cible, nom] of [[CFG, 'audit-v1-lot3-T9.mjs'], [RAP, 'etape2-A2-05-volet1-lot3-T9.md'], [BIL, 'etape2-A2-05-bilan-volet2.md'], [ETAT, 'ETAT-ACTUEL.md'], [ROAD, 'ROADMAP.md'], [INV, 'INVENTAIRE-SCRIPTS.md'], [REC, 'proposition-recalcul-T9-perimetre-arbitre.mjs'], [REC8, 'proposition-recalcul-T8-perimetre-apres-T9.mjs']]) {
    const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', cible, OUT + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ecrire('diffs/' + cible.split('/').pop() + '.diff', r.stdout);
    const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length;
    lignesT.push('| `' + cible + '` | `' + avant[cible] + '` | `' + sha(join(d, nom)) + '` | +' + n('+') + ' / −' + n('-') + ' |');
  }
  ecrire('table-diffs.md', '| Fichier | Avant | Proposé | Lignes |\n|---|---|---|---|\n' + lignesT.join('\n') + '\n');
}
rmSync(tmp, { recursive: true, force: true });

// (7) Dépôt réel inchangé
const change = TEMOINS.filter((p) => sha(join(root, p)) !== avant[p]);
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' });
ok(!change.length && idx.stdout.trim() === '', 'dépôt réel inchangé (' + TEMOINS.length + ' fichiers témoins) ; index vide', change.join(', ') || 'aucune modification');
console.log(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation conforme');
process.exit(ko ? 1 : 0);
