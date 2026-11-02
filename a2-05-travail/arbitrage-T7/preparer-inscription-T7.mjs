// A2-05 · volet 1 · lot 3 : préparation de l'inscription de l'arbitrage de T7 (décision du 2026-10-31), EN PROPOSITION : aucun fichier concerné n'est
// modifié (rapport de T7, configuration, bilan du volet 2, documents de pilotage, manifeste, contrôles en service, données, journal, lots).
// Usage : node a2-05-travail/arbitrage-T7/preparer-inscription-T7.mjs <racine du dépôt>
// (1) Préconditions sur le dépôt réel. (2) Versions proposées, en mémoire : configuration (ARBITRAGE seul), §8.104 du bilan, fragments d'ETAT-ACTUEL.md
// et de ROADMAP.md, recalcul de T7 adapté par remplacements ciblés. (3) Clone jetable recouvert de l'arbre de travail : rapport retiré (état de sa
// génération), régénération par le module v2 ; seuls la ligne de statut et le §0 doivent changer. (4) Étape A (inscription, 40 entrées) : contrôles,
// comptes établis par les outils, 24 sens couverts, décisions inchangées ; sabotages du recalcul proposé, chacun vérifié comme modifiant le fichier.
// (5) Étape B, simulée seulement (recalcul installé, 41e entrée, bloc d'état synchronisé). (6) Écriture dans arbitrage-T7/inscription/, seulement si
// aucun écart ; refus si le dossier existe. (7) Dépôt réel inchangé. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T7 = W + 'arbitrage-T7/', OUT = T7 + 'inscription/';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T7.md', CFG = W + 'audit-v1-lot3-T7.mjs', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const MAN = W + 'empreintes-rapports-arbitres.json', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', REC = W + 'recalcul-T7-perimetre.mjs';
const CBP = W + 'controle-bilan-pilote.mjs', PCBP = T7 + 'proposition-controle-bilan-pilote-T7.mjs';
const PREC = T7 + 'proposition-recalcul-T7-perimetre-arbitre.mjs', SAUV = T7 + 'proposition-T7.md', APERCU = W + 'sync-stable-apercu.md';
const RAP_SHA = 'a5548994407057fd26c2c9812e83d39cf0f108aafbbe5d4c56f03b9e43b8d872', CFG_SHA = 'd69be5c46ad63b0b54d88ec8488b99ca522e8639bbab3133b8b2c0ec09e91aba';
const JOURNAL = 'reconstruction/a2-04/journal.json', VOCAB = 'data/n5/vocab.json', REG = W + 'registre-tranches.json';
const IDS = ['v_329_s1', 'v_332_s1', 'v_474_s1', 'v_12_s2', 'v_14_s2', 'v_20_s1', 'v_31_s2', 'v_638_s1', 'v_656_s1', 'v_427_s1', 'v_185_s1', 'v_269_s1', 'v_192_s1', 'v_419_s1', 'v_330_s1', 'v_331_s1', 'v_333_s1', 'v_334_s1', 'v_359_s1', 'v_311_s2', 'v_663_s1', 'v_631_s1', 'v_2_s1', 'v_429_s1'];
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex'); const shaT = (t) => createHash('sha256').update(t).digest('hex');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l, d) => console.log('constat  ' + l + (d ? ' : ' + d : ''));
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const lire = (p) => readFileSync(join(root, p), 'utf8');
const LFs = (t) => t.replace(/\r\n/g, '\n');
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');
if (existsSync(join(root, SAUV)) || existsSync(join(root, PREC))) arret('proposition déjà sauvegardée');
const TEMOINS = [RAP, CFG, BIL, MAN, ETAT, ROAD, REC, REG, VOCAB, JOURNAL, CBP, W + 'recalcul-T5-perimetre.mjs', W + 'recalcul-T6-perimetre.mjs', W + 'sync-stable.mjs', W + 'lot3-commun-v2.mjs'];
const avant = Object.fromEntries(TEMOINS.map((p) => [p, sha(join(root, p))]));
const lotsAvant = Object.fromEntries(readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => [f, sha(join(root, 'reconstruction/a2-04/lots', f))]));

// Fragments, hors du bloc généré, à l'identique dans ETAT-ACTUEL.md et ROADMAP.md (texte normalisé en LF)
const FRAGMENTS = [
  ['(B6 à B8). **296\n  candidats arbitrés sur 377 ; 81 restent**', '(B6 à B8). **320\n  candidats arbitrés sur 377 ; 57 restent**'],
  ['Les 81 candidats restants du lot 3, dont les 17 du bloc F', 'Les 57 candidats restants du lot 3, dont les 17 du bloc F'],
  ['**196 corrections, dans 172 ENTRY** :', '**197 corrections, dans 172 ENTRY** :'],
  ['jamais réattribués ; prochain identifiant V1-24), V2-1 à', 'jamais réattribués), V1-24 (lot 3, T7 : traduction secondaire de まずい, sens 1 ; prochain identifiant V1-25), V2-1 à'],
  ['; audit des 24 sens non autorisé (bilan du volet 2, §8.102 et §8.103) (relais', "; **audit des 24 sens de T7 autorisé le 2026-10-31, en proposition, et livré** (`docs/rapports/etape2-A2-05-volet1-lot3-T7.md` : 22 conformes, 1 écart, 1 suspendu) ; **T7 arbitrée le 2026-10-31** (§0 inscrit par le module v2, proposition conservée, `a2-05-travail/arbitrage-T7/proposition-T7.md` : **23 conformes, 1 écart, 0 suspendu** ; 向こう conforme, lecture A, absence de `deictique` maintenue ; 後, sens 1, `deictique` maintenue selon D0952, réserve conservée ; « Madame » conservée pour おばさん, sens 2, en raison de D0078 ; **V1-24 retenue**, non appliquée : retrait de « Pas bon », まずい, sens 1 ; prochain identifiant V1-25 ; bilan du volet 2, §8.102 à §8.104) (relais"],
  ["L'audit individuel des 24 sens de T7, sur autorisation distincte, dans les frontières du §0 du périmètre (`docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md`), le périmètre accepté étant protégé au manifeste (40e entrée) et le bloc d'état synchronisé (bilan du volet 2, §8.103) ; puis, chacun sur autorisation distincte :", "La protection du rapport arbitré de T7 (`docs/rapports/etape2-A2-05-volet1-lot3-T7.md`) au manifeste (41e entrée), la synchronisation du bloc d'état et la clôture documentaire de T7, chacune sur autorisation distincte, T8 n'étant pas préparée (bilan du volet 2, §8.104) ; puis, chacun sur autorisation distincte :"],
];
const LIGNE_JOURNAL = "| 2026-10-31 | 2 · A2-05 | **Audit des 24 sens de T7 livré en proposition, puis T7 arbitrée** (ChatGPT, par délégation) : `a2-05-travail/audit-v1-lot3-T7.mjs`, module commun v2 non modifié, en mode bloquant ; proposés : 22 conformes, 1 écart, 1 suspendu ; arbitrés : **23 conformes, 1 écart, 0 suspendu** ; 向こう conforme, lecture A ; **V1-24 retenue**, non appliquée (まずい, sens 1 : retrait de « Pas bon »). Inscription préparée sur copie, puis appliquée sur autorisation distincte. **320/377, 57 restants ; 197 corrections dans 172 ENTRY, non appliquées ; prochain identifiant V1-25.** | non committé |";
const ANCRE_JOURNAL = '| 2026-10-30 | 2 · A2-05 | **Consolidation du périmètre de T7 appliquée en quatre états';

// (1) Préconditions
const man0 = JSON.parse(lire(MAN)).empreintes;
ok(avant[RAP] === RAP_SHA && /^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/m.test(lire(RAP)) && !lire(RAP).includes('## 0. Arbitrage'), 'P1 rapport de T7 = proposition relue, sans §0', avant[RAP].slice(0, 12) + '…');
ok(avant[CFG] === CFG_SHA && /^const ARBITRAGE = null;$/m.test(lire(CFG)), 'P2 configuration relue ; ARBITRAGE non renseigné');
ok(!/^### 8\.104 /m.test(lire(BIL)) && /^### 8\.103 /m.test(lire(BIL)), 'P3 bilan : §8.103 présent, §8.104 absent');
ok(Object.keys(man0).length === 40 && Object.entries(man0).every(([p, h]) => sha(join(root, p)) === h) && !Object.hasOwn(man0, RAP), 'P4 manifeste : 40 empreintes identiques ; rapport de T7 absent');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P5 ' + p + ' : six fragments présents une fois, remplacements absents'); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_JOURNAL)).length === 1, 'P6 ancre du journal présente une fois');

// (2a) Configuration proposée : seule la constante ARBITRAGE change
const ARB = {
  date: '2026-10-31',
  texte: [
    "Arbitrage du 2026-10-31 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Après relecture des 24 fiches et des normes A7/A9, je retiens les arbitrages suivants : **T7 : 23 conformes, 1 écart, 0 suspendu.** »",
    '',
    "**23 conformes, 1 écart, 0 suspendu**, contre 22 conformes, 1 écart et 1 suspendu proposés : le verdict suspendu de 向こう (`v_419_s1`) devient **conforme**. La proposition est conservée ci-dessous, telle qu'elle a été livrée ; ses verdicts du §1 et ses fiches d'examen ne sont pas modifiés.",
    '',
    '| Point | Arbitrage |',
    '|---|---|',
    "| **Verdicts conformes (22)** | Acceptés tels que proposés, « avec les réserves documentaires sur 後 s1 et おばさん s2 ». |",
    "| **向こう (point 1)** | **Conforme ; lecture A retenue : absence de `deictique` maintenue.** Motivation de l'arbitrage : « Les emplois attestés sont relationnels et la documentation ne suffit pas à établir un emploi directement déictique faisant partie intégrante du sens modélisé. » La lecture B n'est pas retenue : aucune correction n'est ouverte, D0601 n'est pas touchée. |",
    "| **後, sens 1 (point 2)** | **`deictique` maintenue selon D0952**, « sans rouvrir cette décision ». La réserve sur les exemples est conservée. |",
    "| **Noms en 毎 (point 3)** | Absence de `quantificateur` confirmée pour les six noms. |",
    "| **おばさん, sens 2, et 奥さん (point 4)** | Absence de `politesse` confirmée. « Madame » est conservée pour おばさん, sens 2, en raison de D0078. |",
    "| **まずい, sens 1 (point 5)** | **Écart retenu ; V1-24 retenue**, non appliquée : `meaning.alternatives` : `[\"Pas bon\"]` → `[]`. « Aucune autre traduction ajoutée ou rétablie. » « Aucun autre champ modifié. » |",
    '',
    "**Liste globale** : V1-24 s'ajoute aux corrections retenues, non appliquées ; prochain identifiant : V1-25. Comptes calculés par les outils, non imposés à la main : **320 sens arbitrés sur 377, 57 restants ; 197 corrections, zéro appliquée, dans 172 ENTRY.** L'arbitrage annonçait 173 ENTRY ; l'ENTRY まずい (`v_427`) portant déjà V2-67 et V2-68, V1-24 n'ajoute aucune ENTRY au calcul.",
  ],
};
const cfgProp = lire(CFG).replace(/^const ARBITRAGE = null;$/m, () => 'const ARBITRAGE = ' + JSON.stringify(ARB, null, 2) + ';');

// (2b) §8.104 du bilan : la seule ligne de tableau de corrections est V1-24
const S8104 = [
  '### 8.104 Volet 1, lot 3 : audit de T7 livré en proposition ; T7 arbitrée, 23 conformes, 1 écart ; V1-24 retenue (2026-10-31)',
  '',
  "Décision du 2026-10-31 (ChatGPT, par délégation ; relayée par l'utilisateur) : « **J'accepte la consignation E1 à E4 et autorise l'ouverture de l'audit lexical T7, en proposition uniquement.** » Audit livré : `docs/rapports/etape2-A2-05-volet1-lot3-T7.md` (`a5548994…`), par `a2-05-travail/audit-v1-lot3-T7.mjs`, module v2 non modifié, en mode bloquant ; 22 conformes, 1 écart, 1 suspendu ; contrôle indépendant `a2-05-travail/arbitrage-T7/audit/controle-audit-T7.mjs`, 24 sur 24, 14 sabotages sur 14.",
  '',
  "Arbitrage du 2026-10-31 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Après relecture des 24 fiches et des normes A7/A9, je retiens les arbitrages suivants : **T7 : 23 conformes, 1 écart, 0 suspendu.** » Détail au §0 du rapport, inscrit par le module v2 ; proposition relue conservée à l'identique hors du statut et du §0, et sauvegardée dans `a2-05-travail/arbitrage-T7/proposition-T7.md`.",
  '',
  "**T7 : 23 conformes, 1 écart, 0 suspendu**, contre 22 conformes, 1 écart et 1 suspendu proposés. **向こう** : lecture A retenue, absence de `deictique` maintenue. **後, sens 1** : `deictique` maintenue selon D0952, sans réouverture, réserve sur les exemples conservée. **Noms en 毎** : absence de `quantificateur` confirmée. **おばさん, sens 2, et 奥さん** : absence de `politesse` confirmée ; « Madame » conservée en raison de D0078. Aucune règle générale n'est déduite de T7.",
  '',
  '| N° | Sens | Mot | Lot | Écart | Champ | Avant | Après |',
  '|---|---|---|---|---|---|---|---|',
  "| V1-24 | `v_427_s1` | まずい « Mauvais (au goût) » | 02 | traduction | `meaning.alternatives` | `[\"Pas bon\"]` | `[]` ; aucune autre traduction ajoutée ou rétablie ; aucun autre champ modifié |",
  '',
  "**Décomptes calculés par les outils**, non saisis à la main : **320 sens arbitrés sur 377, 57 restants ; 197 corrections dans 172 ENTRY, non appliquées ; prochain identifiant disponible : V1-25.** L'arbitrage annonçait 173 ENTRY ; l'ENTRY `v_427` porte déjà V2-67 et V2-68. Le rapport arbitré de T7 reste hors du manifeste (40 empreintes) ; son ajout relève d'une autorisation distincte. T7 n'est pas close ; T8 n'est pas préparée. Aucune correction lexicale n'est appliquée ; aucun `git add`, commit ni push.",
];
const bilanProp = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8104.join(eol) + eol; })();
const pilote = (p, journal) => {
  const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z);
  if (journal) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_JOURNAL) ? [l, LIGNE_JOURNAL] : [l])).join('\n');
  return crlf ? t.replace(/\n/g, '\r\n') : t;
};
const prop = { [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [BIL]: bilanProp };

// (2c) Recalcul de T7 adapté, par remplacements ciblés : les contrôles historiques sont conservés, seul change ce qui décrivait l'état d'avant l'audit
const ligne = (t, debut, ...nouvelles) => { const L = t.split('\n'); const i = L.flatMap((l, k) => (l.startsWith(debut) ? [k] : [])); if (i.length !== 1) arret('recalcul : « ' + debut.slice(0, 50) + ' » : ' + i.length + ' occurrence(s)'); L.splice(i[0], 1, ...nouvelles); return L.join('\n'); };
let recProp = lire(REC);
if (recProp.includes('\r\n')) arret('recalcul en CRLF : cas non prévu');
recProp = ligne(recProp, "// Usage : node a2-05-travail/recalcul-T7-perimetre.mjs",
  "// Adaptation à l'arbitrage de T7 (rapport arbitré, §0), préparée le 2026-10-31, appliquée seulement sur autorisation distincte : le contrôle « sens non",
  "// encore examinés » devient « examinés dans le seul rapport de T7, arbitré » ; les 296 sens de la clôture de T6 restent contrôlés par leur empreinte, lus",
  "// dans les 39 premières entrées du manifeste ; V1-24 s'ajoute aux six corrections V2-n, inchangées ; rapport arbitré contre sa proposition sauvegardée.",
  "// Usage : node a2-05-travail/recalcul-T7-perimetre.mjs <racine du dépôt> [--inventaire]   (--inventaire : liste les sens restants, sens par sens)");
recProp = ligne(recProp, "// 2. Aucun de ces sens n'est déjà examiné", "// 2. Les 24 sens sont examinés dans le seul rapport de T7, arbitré, et dans aucun autre rapport de livraison ou de tranche (hors périmètres)");
recProp = ligne(recProp, 'const examines = new Set(rapports.flatMap(fichesDe));', "const RT7 = 'etape2-A2-05-volet1-lot3-T7.md';");
recProp = ligne(recProp, 'const deja = ids.filter(', 'const ailleurs = ids.filter((id) => JSON.stringify(rapports.filter((f) => fichesDe(f).includes(id))) !== JSON.stringify([RT7]));');
recProp = ligne(recProp, 'ctl(!deja.length, ', "ctl(!ailleurs.length && rapports.includes(RT7) && /^\\*\\*Statut\\*\\* : \\*\\*arbitré le /m.test(txt('docs/rapports/' + RT7)), 'les 24 sens examinés dans le seul rapport de T7, arbitré (' + rapports.length + ' rapports de livraison et de tranche lus)', ailleurs.join(', ') || 'aucun examiné ailleurs');");
recProp = ligne(recProp, 'const historiques = [...arbitres].sort();',
  "const H39 = new Set(Object.keys(json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes).slice(0, 39)); // les 296 : rapports arbitrés des 39 premières entrées",
  "const historiques = [...new Set(rapports.filter((f) => H39.has('docs/rapports/' + f) && arbitre(f)).flatMap(fichesDe))].sort();");
recProp = ligne(recProp, 'const sous296 = ', "const sous296 = sha(historiques.join('\\n')) === ARBITRES_T6;");
recProp = ligne(recProp, 'ctl(arbitres.size >= 296 && sous296 !== false,', "ctl(historiques.length === 296 && sous296 && historiques.every((id) => arbitres.has(id)), 'les 296 sens arbitrés à la clôture de T6 restent arbitrés (empreinte de leur liste triée, `' + ARBITRES_T6.slice(0, 8) + '…`)', historiques.length + ' lus, ' + arbitres.size + ' arbitrés en tout');");
recProp = ligne(recProp, "ctl(reg.find((t) => t.id === 'T7')?.livraisons.join() === LIVS.join()", "ctl(reg.find((t) => t.id === 'T7')?.livraisons.join() === LIVS.join() && reg.find((t) => t.id === 'T7')?.statut === 'planifiée' && !parTr.T7 && ids.every((id) => arbitres.has(id)), 'restants par tranche du registre ; T7 (D1, D4) entièrement arbitrée, statut du registre non modifié', Object.entries(parTr).map(([k, v]) => k + ' ' + v).join(', '));");
recProp = ligne(recProp, 'ctl(JSON.stringify(corr) === JSON.stringify(corrGen)',
  "const corrV2 = corr.filter((c) => c !== 'V1-24'); // V1-24, retenue par l'arbitrage de T7, s'ajoute : les six V2-n du périmètre restent contrôlées telles quelles",
  "ctl(JSON.stringify(corrV2) === JSON.stringify(corrGen) && JSON.stringify(corrV2) === JSON.stringify(['V2-17', 'V2-34', 'V2-38', 'V2-56', 'V2-67', 'V2-68']), 'corrections retenues sur les ENTRY de T7 au périmètre : six V2-n (provenance des nuances), égales au générateur', 'recalcul ' + corrV2.join(', ') + ' ; générateur ' + corrGen.join(', '));",
  "const v124 = bilan.split('\\n').filter((l) => /^\\| V1-24 \\|/.test(l));",
  "ctl(JSON.stringify(corr) === JSON.stringify(['V1-24', ...corrV2]) && v124.length === 1 && v124[0].startsWith('| V1-24 | `v_427_s1` | まずい') && v124[0].includes('| `meaning.alternatives` | `[\"Pas bon\"]` | `[]` ;'), 'V1-24 retenue une fois, sur `v_427_s1`, champ `meaning.alternatives` seul', v124.length + ' ligne(s)');");
recProp = ligne(recProp, 'ctl(octets(PER7) === ',
  ...lire(REC).split('\n').filter((l) => l.startsWith('ctl(octets(PER7) === ')),
  '',
  '// 14 bis. Rapport arbitré de T7 : statut et §0 ; hors du statut et du §0, identique à sa proposition sauvegardée, empreinte fixée. Un fichier absent se lit vide',
  "const RAP7 = 'docs/rapports/' + RT7, SAUV7 = 'a2-05-travail/arbitrage-T7/proposition-T7.md';",
  "const SL = (existsSync(join(root, SAUV7)) ? txt(SAUV7) : '').split('\\n'), RL = (existsSync(join(root, RAP7)) ? txt(RAP7) : '').split('\\n');",
  "const a1 = RL.indexOf('## 0. Arbitrage'), b1 = RL.indexOf('## 1. Résultat proposé'); const sans1 = a1 > 0 && b1 > a1 ? [...RL.slice(0, a1), ...RL.slice(b1)] : RL;",
  "const st1 = SL.findIndex((l) => l.startsWith('**Statut** : '));",
  "ctl(octets(SAUV7) === '" + RAP_SHA + "' && /^\\*\\*Statut\\*\\* : \\*\\*proposition, non arbitrée\\.\\*\\*/.test(SL[st1] ?? '') && /^\\*\\*Statut\\*\\* : \\*\\*arbitré le 2026-10-31\\*\\* \\(§0\\)\\./.test(RL[st1] ?? '') && a1 > 0 && b1 > a1 && sans1.length === SL.length && sans1.every((l, k) => k === st1 || l === SL[k]), 'rapport arbitré de T7 (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', octets(SAUV7).slice(0, 12) + '… ; §0 : ' + (b1 - a1) + ' lignes');",
  "const s07 = a1 > 0 && b1 > a1 ? RL.slice(a1, b1).join('\\n') : '';",
  "ctl(s07.includes('**23 conformes, 1 écart, 0 suspendu**') && s07.includes('lecture A retenue : absence de `deictique` maintenue') && s07.includes('**Écart retenu ; V1-24 retenue**') && s07.includes('`deictique` maintenue selon D0952'), '§0 de T7 : 23 conformes, 1 écart, 0 suspendu ; 向こう lecture A ; 後 maintenue ; V1-24 retenue', 'présents');");
recProp = ligne(recProp, "console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');",
  "const posR = cles.indexOf(RAP7);",
  "ctl(posR === -1 || posR === 40, 'rapport arbitré de T7 absent du manifeste ou en 41e entrée', posR === -1 ? 'hors du manifeste' : '41e entrée');",
  "console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');");

// (2d) Contrôle du bilan du pilote : la liste historique V1-1 à V1-21 reste exigée pour les numéros antérieurs à V1-24, seuls ceux-là valant pour T5
const CBP_A = "&& JSON.stringify(v1b) === JSON.stringify(V(1, 21)) && JSON.stringify(resB)";
const CBP_L = "bilan : V1-1 à V1-21 retenues, V1-22 et V1-23 réservées, V1-24 libre ;";
let cbpProp = lire(CBP);
if (cbpProp.split(CBP_A).length !== 2 || cbpProp.split(CBP_L).length !== 2) arret('contrôle du bilan du pilote : fragments introuvables');
cbpProp = cbpProp.replace(CBP_A, () => "&& JSON.stringify(v1b.filter((x) => +x.slice(3) < 24)) === JSON.stringify(V(1, 21)) && JSON.stringify(resB)").replace(CBP_L, () => "bilan : V1-1 à V1-21 retenues avant V1-24, V1-22 et V1-23 réservées ;");

// (3) Clone jetable : état de la génération du rapport (rapport absent), puis régénération avec ARBITRAGE
const tmp = mkdtempSync(join(tmpdir(), 'ocha-inscription-t7-')); const C = join(tmp, 'arbre'); const fC = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [fC(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim().slice(0, 240));
const sauvProp = lire(RAP);
writeFileSync(fC(CFG), cfgProp); rmSync(fC(RAP));
const g = lancer(CFG); const rapProp = existsSync(fC(RAP)) ? readFileSync(fC(RAP), 'utf8') : '';
const L0 = sauvProp.split('\n'), L1 = rapProp.split('\n'); const i0 = L1.indexOf('## 0. Arbitrage'), i1 = L1.indexOf('## 1. Résultat proposé');
const sans0 = [...L1.slice(0, i0), ...L1.slice(i1)]; const st = L0.findIndex((l) => l.startsWith('**Statut** : '));
const memes = sans0.length === L0.length && sans0.every((l, k) => (k === st ? /^\*\*Statut\*\* : \*\*arbitré le 2026-10-31\*\* \(§0\)\./.test(l) : l === L0[k]));
ok(g.code === 0 && i0 > 0 && i1 > i0 && memes, 'E1 rapport régénéré avec ARBITRAGE : seuls changent la ligne de statut et le §0 inséré', 'génération code ' + g.code + (g.out ? ' (' + g.out.slice(0, 160) + ')' : '') + ' ; §0 : ' + (i1 - i0) + ' lignes ; ' + shaT(rapProp).slice(0, 12) + '…');
ok((rapProp.match(/^#### `v_\d+_s\d+` · /gm) ?? []).length === 24 && /\*\*24 sens examinés : 22 conformes, 1 écart, 1 suspendu\.\*\*/.test(rapProp) && /^#### `v_419_s1` · .* — proposé : \*\*suspendu\*\*$/m.test(rapProp), 'E2 §1 et 24 fiches d\'examen d\'origine conservés, proposition lisible telle qu\'elle a été livrée');
for (const p of [ETAT, ROAD, BIL]) writeFileSync(fC(p), prop[p]);
writeFileSync(fC(SAUV), sauvProp); writeFileSync(fC(PREC), recProp); writeFileSync(fC(PCBP), cbpProp);
ok(spawnSync(process.execPath, ['--check', fC(PREC)], { encoding: 'utf8' }).status === 0 && spawnSync(process.execPath, ['--check', fC(CFG)], { encoding: 'utf8' }).status === 0, 'E3 node --check du recalcul et de la configuration proposés');

const etape = (nom, rec, cbp) => {
  const r = { cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs'), cbp: lancer(cbp), recT5: lancer(W + 'recalcul-T5-perimetre.mjs'), recT6: lancer(W + 'recalcul-T6-perimetre.mjs'), recT7: lancer(rec), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), ap: lancer(W + 'sync-stable.mjs', '--apercu') };
  r.apercu = readFileSync(fC(APERCU), 'utf8');
  for (const [k, v] of Object.entries(r)) if (v?.out !== undefined) console.log('   ' + nom + ' ' + k + ' (code ' + v.code + ') : ' + v.out.split('\n').pop().slice(0, 170) + (ecartsDe(v).length ? ' | ' + ecartsDe(v).join(' | ') : ''));
  return r;
};

// (4) Étape A
console.log('--- Étape A : inscription, 40 entrées au manifeste');
const A = etape('A', PREC, PCBP);
const planA = (A.ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
ok(A.cov.code === 0 && /320 arbitrés, 0 proposés, 57 restants, sur 377/.test(A.cov.out), 'A1 couverture : 320 arbitrés, 0 proposé, 57 restants', A.cov.out.slice(0, 70));
const plusA = A.apercu.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++'));
ok(plusA.some((l) => /320 sens arbitrés sur 377 ; 57 restent \(0 proposés\)/.test(l)), 'A2 sync-stable : 320/377, 57 restent, 0 proposé', planA);
ok(plusA.some((l) => /Corrections retenues, non appliquées\*\* : 197, dans 172 ENTRY ; prochain numéro libre : V1-25\./.test(l)), 'A3 sync-stable : **197 corrections, dans 172 ENTRY** (et non 173), prochain numéro libre V1-25', plusA.filter((l) => /Corrections retenues/.test(l)).join(' ').slice(0, 120));
ok(A.recT7.code === 0, 'A4 recalcul de T7 proposé conforme à l\'état d\'après l\'inscription', A.recT7.out.split('\n').pop());
ok(A.emp.code === 0 && A.cbp.code === 0 && A.recT5.code === 0 && A.recT6.code === 0, 'A5 empreintes, bilan du pilote, recalculs de T5 et de T6 conformes');
constat('A6 relais (état intermédiaire : rapport hors du manifeste, bloc non synchronisé)', A.rel.out.split('\n').pop() + ' ; ' + (A.rel.out.split('\n').filter((l) => /^\s*(ÉCART|écart|FAUX|faux)/.test(l)).map((l) => l.trim().slice(0, 130)).join(' | ') || 'aucun écart'));
const cbpEnService = lancer(CBP); constat('A7 bis contrôle du bilan du pilote en service, non adapté', 'code ' + cbpEnService.code + ' ; ' + (ecartsDe(cbpEnService).map((l) => l.slice(0, 120)).join(' | ') || 'aucun écart'));
const recEnService = lancer(REC); constat('A7 recalcul de T7 en service, non adapté', 'code ' + recEnService.code + ' ; ' + (ecartsDe(recEnService).map((l) => l.slice(0, 90)).join(' | ') || 'aucun écart'));
// Les 24 sens couverts, et rien d'antérieur modifié
const cou = spawnSync(process.execPath, ['--input-type=module', '-e', "import {couverture} from './a2-05-travail/couverture-lot3.mjs'; console.log(JSON.stringify(couverture('.').sens.filter((s)=>['D1','D4'].includes(s.livraison)).map((s)=>[s.id,s.etat])))"], { cwd: C, encoding: 'utf8' });
const couv = JSON.parse(cou.stdout || '[]');
ok(couv.length === 24 && IDS.every((id) => couv.some(([x, e]) => x === id && e === 'arbitré')), 'A8 les 24 sens de T7 couverts, chacun « arbitré » au registre', couv.length + ' sens');
ok(sha(fC(JOURNAL)) === avant[JOURNAL] && sha(fC(VOCAB)) === avant[VOCAB] && sha(fC(REG)) === avant[REG] && Object.entries(lotsAvant).every(([f, h]) => sha(fC('reconstruction/a2-04/lots/' + f)) === h), 'A9 journal, lots, données et registre des tranches identiques : aucune décision antérieure modifiée', Object.keys(lotsAvant).length + ' lots');
const pasBon = JSON.parse(readFileSync(fC(VOCAB), 'utf8')).find((e) => e.id === 'v_427').senses[0].meaning.alternatives;
ok(JSON.stringify(pasBon) === '["Pas bon"]', 'A10 V1-24 non appliquée : `v_427_s1` publie toujours « Pas bon »');
const ass = spawnSync(process.execPath, [fC('tools/reconstruction/run.mjs'), 'assemble'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 });
ok(ass.status === 0 && /684 ENTRY, 35 identifiant/.test(ass.stdout), 'A11 assemblage réel sur la copie', 'code ' + ass.status);
// « Réservation » de V1-24 : une ligne du tableau `| réservé |` est refusée par l'outil pour une correction retenue
{ const orig = readFileSync(fC(BIL), 'utf8'); writeFileSync(fC(BIL), orig.trimEnd() + '\n\n| réservé | V1-24 | `' + RAP + '` | `v_427_s1` (まずい) | essai |\n');
  const r = lancer(W + 'sync-stable.mjs', '--apercu'); writeFileSync(fC(BIL), orig);
  ok(r.code !== 0 && /réservé porté par une correction retenue|réservation non déclarée/.test(r.out), 'A12 ligne `| réservé |` pour V1-24 refusée par sync-stable : V1-24 retenue s\'inscrit comme correction, non au tableau des réservations', 'code ' + r.code + ' ; ' + r.out.split('\n').pop().slice(0, 120)); }

// Sabotages du recalcul proposé : chacun modifie réellement un fichier, puis il est restauré
const temoin0 = lancer(PREC); ok(temoin0.code === 0, 'R0 témoin sain avant les sabotages', temoin0.out.split('\n').pop());
const sabote = (nom, p, f, attendu) => {
  const orig = readFileSync(fC(p), 'utf8'); const mod = f(orig);
  if (mod === orig) { ok(false, nom, 'sabotage sans effet sur ' + p); return; }
  writeFileSync(fC(p), mod); const r = lancer(PREC); writeFileSync(fC(p), orig);
  const e = ecartsDe(r); ok(r.code === 1 && e.some((l) => attendu.test(l)) && readFileSync(fC(p), 'utf8') === orig, nom, 'code ' + r.code + ' ; ' + e.length + ' écart(s) : ' + e.map((l) => l.replace(/^ÉCART\s+/, '').split(' : ')[0].slice(0, 70)).join(' | '));
};
sabote('R1 rapport de T7 revenu à la proposition', RAP, () => sauvProp, /les 24 sens examinés dans le seul rapport/);
sabote('R2 proposition sauvegardée modifiée (un caractère)', SAUV, (t) => t + ' ', /rapport arbitré de T7 \(§0\)/);
sabote('R3 fiche d\'examen modifiée dans le rapport arbitré', RAP, (t) => t.replace('— proposé : **suspendu**', '— proposé : **conforme**'), /rapport arbitré de T7 \(§0\)/);
sabote('R4 §0 : V1-24 retirée', RAP, (t) => t.replace('**Écart retenu ; V1-24 retenue**', '**Écart non retenu**'), /§0 de T7/);
sabote('R5 §0 : lecture A remplacée', RAP, (t) => t.replace('lecture A retenue : absence de `deictique` maintenue', 'lecture B retenue'), /§0 de T7/);
sabote('R6 V1-24 retirée du bilan', BIL, (t) => t.replace(/^\| V1-24 \|.*\r?\n/m, ''), /V1-24 retenue une fois/);
sabote('R7 V1-24 : autre champ au bilan', BIL, (t) => t.replace('| traduction | `meaning.alternatives` | `["Pas bon"]`', '| traduction | `category` | `["Pas bon"]`'), /V1-24 retenue une fois/);
sabote('R8 une des six V2-n retirée du bilan', BIL, (t) => t.replace(/^\| V2-34 \|.*\r?\n/gm, ''), /six V2-n/);
sabote('R9 un sens de T7 examiné aussi dans un autre rapport', 'docs/rapports/etape2-A2-05-volet1-lot3-T6.md', (t) => t + '\n#### `v_329_s1` · 毎年\n', /les 24 sens examinés dans le seul rapport/);
sabote('R10 rapport arbitré antérieur retiré : les 296 ne sont plus entiers', 'docs/rapports/etape2-A2-05-volet1-lot3-T5.md', (t) => t.replace(/^\*\*Statut\*\* : \*\*arbitré le /m, '**Statut** : **proposition du '), /les 296 sens arbitrés/);
sabote('R11 statut de T7 changé au registre', REG, (t) => JSON.stringify((() => { const o = JSON.parse(t); o.tranches.find((x) => x.id === 'T7').statut = 'arbitrée'; return o; })(), null, 2) + '\n', /T7 \(D1, D4\) entièrement arbitrée/);
const temoin1 = lancer(PREC); ok(temoin1.code === 0, 'R12 témoin sain après les sabotages', temoin1.out.split('\n').pop());

// Sabotages du contrôle du bilan du pilote proposé : la liste historique reste protégée
const sabCbp = (nom, f) => { const orig = readFileSync(fC(BIL), 'utf8'); const mod = f(orig); if (mod === orig) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(fC(BIL), mod); const r = lancer(PCBP); writeFileSync(fC(BIL), orig); ok(r.code === 1 && ecartsDe(r).some((l) => /^ÉCART\s+T5 : 22 conformes/.test(l)), nom, 'code ' + r.code + ' ; ' + ecartsDe(r).length + ' écart(s)'); };
sabCbp('R13 V1-20 retirée du bilan : détectée par le contrôle du pilote proposé', (t) => t.replace(/^\| V1-20 \|.*\r?\n/m, ''));
sabCbp('R14 V1-22 inscrite comme retenue : détectée par le contrôle du pilote proposé', (t) => t.trimEnd() + '\n\n| V1-22 | `v_208_s1` | essai |\n');
const temoinC = lancer(PCBP); ok(temoinC.code === 0, 'R15 contrôle du pilote proposé : témoin sain', temoinC.out.split('\n').pop());

// (5) Étape B, simulée seulement
console.log('--- Étape B, simulée : recalcul installé, 41e entrée, bloc d\'état synchronisé');
cpSync(fC(PREC), fC(REC)); cpSync(fC(PCBP), fC(CBP));
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter');
const manB = JSON.parse(readFileSync(fC(MAN), 'utf8')).empreintes;
ok(aj.code === 0 && Object.keys(manB).length === 41 && Object.keys(manB).at(-1) === RAP && Object.keys(man0).every((k, n) => Object.keys(manB)[n] === k && manB[k] === man0[k]), 'B1 ajout au manifeste : 41 entrées, les 40 précédentes inchangées', aj.out.split('\n').pop().slice(0, 120));
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const planB = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const apercuB = readFileSync(fC(APERCU), 'utf8');
const app = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', planB);
ok(app.code === 0, 'B2 synchronisation simulée', 'plan ' + planB + ' ; code ' + app.code + ' ; ' + app.out.split('\n').pop().slice(0, 120));
const B = etape('B', REC, CBP);
const vide = lancer(W + 'sync-stable.mjs', '--apercu');
ok(B.cov.code === 0 && B.emp.code === 0 && B.cbp.code === 0 && B.recT5.code === 0 && B.recT6.code === 0 && B.recT7.code === 0 && B.rel.code === 0 && /30 conformes sur 30/.test(B.rel.out), 'B3 état final : tous les contrôles à 0 ; relais 30 sur 30', B.rel.out.split('\n').pop());
ok(/rien à synchroniser|aucune modification|aperçu vide|plan vide/i.test(vide.out + readFileSync(fC(APERCU), 'utf8')) || !/^[+-][^+-]/m.test(readFileSync(fC(APERCU), 'utf8')), 'B4 aperçu suivant vide', vide.out.split('\n').pop().slice(0, 120));
ok(spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: C, encoding: 'utf8' }).stdout.trim() === '', 'B5 index vide sur la copie');

// (6) Écriture des propositions, seulement sans écart
const avantEcriture = ko;
if (!avantEcriture) {
  const d = join(root, OUT); mkdirSync(join(d, 'diffs'), { recursive: true });
  const ecrire = (nom, t) => writeFileSync(join(d, nom), t);
  ecrire('audit-v1-lot3-T7.mjs', cfgProp); ecrire('etape2-A2-05-volet1-lot3-T7.md', rapProp); ecrire('proposition-T7.md', sauvProp);
  ecrire('etape2-A2-05-bilan-volet2.md', prop[BIL]); ecrire('ETAT-ACTUEL.md', prop[ETAT]); ecrire('ROADMAP.md', prop[ROAD]);
  ecrire('proposition-recalcul-T7-perimetre-arbitre.mjs', recProp); ecrire('proposition-controle-bilan-pilote-T7.mjs', cbpProp); ecrire('apercu-etape-A.md', A.apercu); ecrire('apercu-etape-B.md', apercuB);
  const lignesT = [];
  for (const [cible, nom] of [[CFG, 'audit-v1-lot3-T7.mjs'], [RAP, 'etape2-A2-05-volet1-lot3-T7.md'], [BIL, 'etape2-A2-05-bilan-volet2.md'], [ETAT, 'ETAT-ACTUEL.md'], [ROAD, 'ROADMAP.md'], [REC, 'proposition-recalcul-T7-perimetre-arbitre.mjs'], [CBP, 'proposition-controle-bilan-pilote-T7.mjs']]) {
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
