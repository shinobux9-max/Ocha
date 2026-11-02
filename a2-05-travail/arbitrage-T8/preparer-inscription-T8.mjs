// A2-05 · volet 1 · lot 3 : préparation de l'inscription de l'arbitrage de T8 (décision du 2026-10-31), EN PROPOSITION : aucun fichier concerné n'est
// modifié (rapport de T8, configuration, bilan du volet 2, documents de pilotage, inventaire, manifeste, contrôles en service, données, journal, lots).
// Usage : node a2-05-travail/arbitrage-T8/preparer-inscription-T8.mjs <racine du dépôt>
// (1) Préconditions sur le dépôt réel. (2) Versions proposées, en mémoire : configuration (ARBITRAGE seul), §8.108 du bilan, fragments d'ETAT-ACTUEL.md
// et de ROADMAP.md, recalcul de T8 adapté par remplacements ciblés, complément de l'inventaire. (3) Clone jetable recouvert de l'arbre de travail : rapport
// présent (état de sa dernière génération), régénération par le module v2 ; seuls la ligne de statut et le §0 doivent changer. (4) Étape A (inscription, 42 entrées) :
// contrôles, comptes établis par les outils, 16 sens couverts, frontières, décisions inchangées ; sabotages du recalcul proposé, chacun vérifié comme
// modifiant le fichier. (5) Étape B, simulée seulement (43e entrée, bloc d'état synchronisé). (6) Écriture dans arbitrage-T8/inscription/, seulement si
// aucun écart ; refus si le dossier existe. (7) Dépôt réel inchangé. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T8 = W + 'arbitrage-T8/', OUT = T8 + 'inscription/';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md', CFG = W + 'audit-v1-lot3-T8.mjs', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const MAN = W + 'empreintes-rapports-arbitres.json', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', REC = W + 'recalcul-T8-perimetre.mjs', INV = W + 'INVENTAIRE-SCRIPTS.md';
const PREC = T8 + 'proposition-recalcul-T8-perimetre-arbitre.mjs', SAUV = T8 + 'proposition-T8.md', APERCU = W + 'sync-stable-apercu.md', CAUD = T8 + 'audit/controle-audit-T8.mjs';
const RAP_SHA = '2a42fb8458502a1f41f37a2d0560e5016c186a803ad653edc96437bd1b559c9d', CFG_SHA = 'fd6deeea0841e9a2fd84d2ed4825b81f52a88162b49ce20c4d92c8600a20dbba';
const JOURNAL = 'reconstruction/a2-04/journal.json', VOCAB = 'data/n5/vocab.json', REG = W + 'registre-tranches.json', CBP = W + 'controle-bilan-pilote.mjs';
const IDS = ['v_494_s1', 'v_502_s2', 'v_518_s1', 'v_519_s1', 'v_525_s1', 'v_471_s1', 'v_471_s2', 'v_497_s1', 'v_498_s1', 'v_509_s1', 'v_509_s2', 'v_515_s1', 'v_517_s1', 'v_520_s1', 'v_607_s1', 'v_639_s1'];
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex'); const shaT = (t) => createHash('sha256').update(t).digest('hex');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l, d) => console.log('constat  ' + l + (d ? ' : ' + d : ''));
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const lire = (p) => readFileSync(join(root, p), 'utf8');
const LFs = (t) => t.replace(/\r\n/g, '\n');
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');
if (existsSync(join(root, SAUV)) || existsSync(join(root, PREC))) arret('proposition déjà sauvegardée');
const TEMOINS = [RAP, CFG, BIL, MAN, ETAT, ROAD, REC, REG, VOCAB, JOURNAL, CBP, INV, W + 'recalcul-T5-perimetre.mjs', W + 'recalcul-T6-perimetre.mjs', W + 'recalcul-T7-perimetre.mjs', W + 'sync-stable.mjs', W + 'lot3-commun-v2.mjs'];
const avant = Object.fromEntries(TEMOINS.map((p) => [p, sha(join(root, p))]));
const lotsAvant = Object.fromEntries(readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => [f, sha(join(root, 'reconstruction/a2-04/lots', f))]));

// Fragments, hors du bloc généré, à l'identique dans ETAT-ACTUEL.md et ROADMAP.md (texte normalisé en LF)
const FRAGMENTS = [
  ['(B6 à B8). **320\n  candidats arbitrés sur 377 ; 57 restent**', '(B6 à B8). **336\n  candidats arbitrés sur 377 ; 41 restent**'],
  ['Les 57 candidats restants du lot 3, dont les 17 du bloc F', 'Les 41 candidats restants du lot 3, dont les 17 du bloc F'],
  ['; audit des 16 sens non autorisé (bilan du volet 2, §8.106 et §8.107) (relais', "; **audit des 16 sens de T8 autorisé le 2026-10-31, en proposition, et livré** (`docs/rapports/etape2-A2-05-volet1-lot3-T8.md` : 16 conformes, 0 écart, 0 suspendu) ; **T8 arbitrée le 2026-10-31** (§0 inscrit par le module v2, proposition conservée, `a2-05-travail/arbitrage-T8/proposition-T8.md` : **16 conformes, 0 écart, 0 suspendu**, aucune correction nouvelle ; すぐに : absence de `deictique` maintenue, réserve conservée ; あまり : `intensifieur` seul maintenu, réserve conservée ; もっと : cumul `comparatif` + `intensifieur` confirmé ; bilan du volet 2, §8.106 à §8.108) (relais"],
  ["L'audit individuel des 16 sens de T8, sur autorisation distincte, dans les frontières du §0 du périmètre (`docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md`), le périmètre accepté étant protégé au manifeste (42e entrée) et le bloc d'état synchronisé (bilan du volet 2, §8.107) ; puis, chacun sur autorisation distincte :", "La protection du rapport arbitré de T8 (`docs/rapports/etape2-A2-05-volet1-lot3-T8.md`) au manifeste (43e entrée), la synchronisation du bloc d'état et la clôture documentaire de T8, chacune sur autorisation distincte, T9 n'étant pas préparée (bilan du volet 2, §8.108) ; puis, chacun sur autorisation distincte :"],
];
const LIGNE_JOURNAL = "| 2026-10-31 | 2 · A2-05 | **Audit des 16 sens de T8 livré en proposition, puis T8 arbitrée** (ChatGPT, par délégation) : `a2-05-travail/audit-v1-lot3-T8.mjs`, module commun v2 non modifié, en mode bloquant ; proposés et arbitrés : **16 conformes, 0 écart, 0 suspendu** ; aucune correction nouvelle ; absence de `deictique` maintenue pour すぐに ; `intensifieur` seul maintenu pour あまり ; cumul de もっと confirmé. Inscription préparée sur copie, puis appliquée sur autorisation distincte. **336/377, 41 restants ; 197 corrections dans 172 ENTRY, non appliquées ; prochain identifiant V1-25.** | non committé |";
const ANCRE_JOURNAL = '| 2026-10-31 | 2 · A2-05 | **Consolidation du périmètre de T8 appliquée en trois états';

// (1) Préconditions
const man0 = JSON.parse(lire(MAN)).empreintes;
ok(avant[RAP] === RAP_SHA && /^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/m.test(lire(RAP)) && !lire(RAP).includes('## 0. Arbitrage'), 'P1 rapport de T8 = proposition relue, sans §0', avant[RAP].slice(0, 12) + '…');
ok(avant[CFG] === CFG_SHA && /^const ARBITRAGE = null;$/m.test(lire(CFG)), 'P2 configuration relue ; ARBITRAGE non renseigné');
ok(!/^### 8\.108 /m.test(lire(BIL)) && /^### 8\.107 /m.test(lire(BIL)), 'P3 bilan : §8.107 présent, §8.108 absent');
ok(Object.keys(man0).length === 42 && Object.entries(man0).every(([p, h]) => sha(join(root, p)) === h) && !Object.hasOwn(man0, RAP), 'P4 manifeste : 42 empreintes identiques ; rapport de T8 absent');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P5 ' + p + ' : quatre fragments présents une fois, remplacements absents'); }
ok(LFs(lire(ETAT)).split('\n').filter((l) => l.startsWith(ANCRE_JOURNAL)).length === 1, 'P6 ancre du journal présente une fois');

// (2a) Configuration proposée : seule la constante ARBITRAGE change
const ARB = {
  date: '2026-10-31',
  texte: [
    "Arbitrage du 2026-10-31 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **Je retiens les 16 sens de T8 comme conformes : 16 conformes, 0 écart, 0 suspendu, aucune correction nouvelle.** »",
    '',
    "**16 conformes, 0 écart, 0 suspendu**, comme proposé. La proposition est conservée ci-dessous, telle qu'elle a été livrée ; ses verdicts du §1 et ses 16 fiches d'examen ne sont pas modifiés.",
    '',
    '| Point | Arbitrage |',
    '|---|---|',
    "| **すぐに (point 1)** | **Absence de `deictique` maintenue**, « conformément à D1392 et à A7 ». « Conserver la réserve documentaire relative aux anciens exemples. » |",
    "| **あまり (point 2)** | **`intensifieur` seul maintenu**, sans `quantificateur` : « Les traductions quantitatives ne suffisent pas à démontrer un deuxième rôle intégral au sens modélisé. » « Conserver la réserve. » |",
    "| **もっと (point 3)** | **Cumul `comparatif` + `intensifieur` confirmé**, « conformément à A9 ». |",
    "| **Treize autres sens** | « Accepter les treize autres verdicts conformes. » |",
    '',
    "**Liste globale** : aucune correction nouvelle ; V1-22 et V1-23 restent réservés, V1-24 reste retenue, V1-25 reste libre. Comptes calculés par les outils, non imposés à la main : **336 sens arbitrés sur 377, 41 restants ; 197 corrections, zéro appliquée, dans 172 ENTRY.**",
  ],
};
const cfgProp = lire(CFG).replace(/^const ARBITRAGE = null;$/m, () => 'const ARBITRAGE = ' + JSON.stringify(ARB, null, 2) + ';');

// (2b) §8.108 du bilan : aucune ligne de tableau, aucune correction nouvelle
const S8108 = [
  '### 8.108 Volet 1, lot 3 : audit de T8 livré en proposition ; T8 arbitrée, 16 conformes, aucune correction nouvelle (2026-10-31)',
  '',
  "Décision du 2026-10-31 (ChatGPT, par délégation ; relayée par l'utilisateur) : « **J'accepte la consignation finale de la consolidation T8 et j'autorise l'ouverture de l'audit individuel des 16 sens, en proposition uniquement.** » Audit livré : `docs/rapports/etape2-A2-05-volet1-lot3-T8.md` (`2a42fb84…`), par `a2-05-travail/audit-v1-lot3-T8.mjs`, module v2 non modifié, en mode bloquant ; 16 conformes, 0 écart, 0 suspendu ; contrôle indépendant `a2-05-travail/arbitrage-T8/audit/controle-audit-T8.mjs`, 16 sur 16, 11 sabotages sur 11.",
  '',
  "Arbitrage du 2026-10-31 (ChatGPT, par délégation ; relayé par l'utilisateur) : « **Je retiens les 16 sens de T8 comme conformes : 16 conformes, 0 écart, 0 suspendu, aucune correction nouvelle.** » Détail au §0 du rapport, inscrit par le module v2 ; proposition relue conservée à l'identique hors du statut et du §0, et sauvegardée dans `a2-05-travail/arbitrage-T8/proposition-T8.md`.",
  '',
  "**すぐに** : absence de `deictique` maintenue, conformément à D1392 et à A7 ; réserve documentaire sur les anciens exemples conservée. **あまり** : `intensifieur` seul maintenu, sans `quantificateur` ; réserve conservée. **もっと** : cumul `comparatif` + `intensifieur` confirmé, conformément à A9. Les treize autres verdicts conformes sont acceptés. Aucune règle générale n'est déduite de T8.",
  '',
  "**Décomptes calculés par les outils**, non saisis à la main : **336 sens arbitrés sur 377, 41 restants ; 197 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 retenue, V1-25 libre.** Le rapport arbitré de T8 reste hors du manifeste (42 empreintes) ; son ajout relève d'une autorisation distincte. T8 n'est pas close ; T9 n'est pas préparée ; le bloc F n'est pas ouvert. Aucune correction lexicale n'est appliquée ; aucun `git add`, commit ni push.",
];
const bilanProp = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8108.join(eol) + eol; })();
const pilote = (p, journal) => {
  const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z);
  if (journal) t = t.split('\n').flatMap((l) => (l.startsWith(ANCRE_JOURNAL) ? [l, LIGNE_JOURNAL] : [l])).join('\n');
  return crlf ? t.replace(/\n/g, '\r\n') : t;
};
const prop = { [ETAT]: pilote(ETAT, true), [ROAD]: pilote(ROAD, false), [BIL]: bilanProp };

// (2c) Recalcul de T8 adapté, par remplacements ciblés : les contrôles historiques sont conservés, seul change ce qui décrivait l'état d'avant l'audit
const ligne = (t, debut, ...nouvelles) => { const L = t.split('\n'); const i = L.flatMap((l, k) => (l.startsWith(debut) ? [k] : [])); if (i.length !== 1) arret('recalcul : « ' + debut.slice(0, 50) + ' » : ' + i.length + ' occurrence(s)'); L.splice(i[0], 1, ...nouvelles); return L.join('\n'); };
let recProp = lire(REC);
if (recProp.includes('\r\n')) arret('recalcul en CRLF : cas non prévu');
recProp = ligne(recProp, '// Usage : node a2-05-travail/recalcul-T8-perimetre.mjs',
  "// Adaptation à l'arbitrage de T8 (rapport arbitré, §0), préparée le 2026-10-31, appliquée seulement sur autorisation distincte : le contrôle « sens non",
  "// encore examinés » devient « examinés dans le seul rapport de T8, arbitré » ; les 320 sens de la clôture de T7 restent contrôlés par leur empreinte ; les",
  "// 41 restants sont T9 et F ; l'inventaire des 57 du périmètre égale les 41 restants et les 16 de T8 ; rapport arbitré contre sa proposition sauvegardée.",
  '// Usage : node a2-05-travail/recalcul-T8-perimetre.mjs <racine du dépôt> [--inventaire]   (--inventaire : liste les sens restants, sens par sens)');
recProp = ligne(recProp, "// 2. Aucun de ces sens n'est déjà examiné", '// 2. Les 16 sens sont examinés dans le seul rapport de T8, arbitré, et dans aucun autre rapport de livraison ou de tranche (hors périmètres)');
recProp = ligne(recProp, 'const examines = new Set(rapports.flatMap(fichesDe));', "const RT8 = 'etape2-A2-05-volet1-lot3-T8.md';");
recProp = ligne(recProp, 'const deja = ids.filter(', 'const ailleurs = ids.filter((id) => JSON.stringify(rapports.filter((f) => fichesDe(f).includes(id))) !== JSON.stringify([RT8]));');
recProp = ligne(recProp, 'ctl(!deja.length, ', "ctl(!ailleurs.length && rapports.includes(RT8) && /^\\*\\*Statut\\*\\* : \\*\\*arbitré le /m.test(txt('docs/rapports/' + RT8)), 'les 16 sens examinés dans le seul rapport de T8, arbitré (' + rapports.length + ' rapports de livraison et de tranche lus)', ailleurs.join(', ') || 'aucun examiné ailleurs');");
recProp = ligne(recProp, '// arbitrés ; aucun restant hors du registre ; restants par livraison et par tranche ; T8 = D5 et D8', '// arbitrés ; aucun restant hors du registre ; restants par livraison et par tranche ; T8 = D5 et D8, statut du registre non modifié, ses 16 sens arbitrés');
recProp = ligne(recProp, "ctl(reg.find((t) => t.id === 'T8')?.livraisons.join() === LIVS.join()", "ctl(reg.find((t) => t.id === 'T8')?.livraisons.join() === LIVS.join() && reg.find((t) => t.id === 'T8')?.statut === 'planifiée' && ids.every((id) => arbitres.has(id)) && restants.length === 41 && !parTr.T8 && parTr.T9 === 24 && parTr.F === 17, 'restants par tranche du registre : T9 24, F 17 ; 41 en tout ; T8 = D5 et D8, entièrement arbitrée, statut du registre non modifié', Object.entries(parTr).map(([k, v]) => k + ' ' + v).join(', '));");
recProp = ligne(recProp, 'const manque = restants.filter(', "const vus57 = liste.filter((r) => !arbitres.has(r.id) || ids.includes(r.id)); const manque = vus57.filter((r) => !invL.includes(r.mot + ' `' + r.id + '`'));");
recProp = ligne(recProp, "ctl(invIds.length === 57 && new Set(invIds).size === 57 && !manque.length,", "ctl(invIds.length === 57 && new Set(invIds).size === 57 && vus57.length === 57 && !manque.length, 'inventaire des 57 du rapport = 41 restants recalculés et 16 sens de T8, chacun une fois', manque.map((r) => r.id).join(', ') || invIds.length + ' sens');");
recProp = ligne(recProp, 'ctl(octets(PER8) === ',
  ...lire(REC).split('\n').filter((l) => l.startsWith('ctl(octets(PER8) === ')),
  '',
  '// 14 bis. Rapport arbitré de T8 : statut et §0 ; hors du statut et du §0, identique à sa proposition sauvegardée, empreinte fixée. Un fichier absent se lit vide',
  "const RAP8 = 'docs/rapports/' + RT8, SAUV8 = 'a2-05-travail/arbitrage-T8/proposition-T8.md';",
  "const SL = (existsSync(join(root, SAUV8)) ? txt(SAUV8) : '').split('\\n'), RL = (existsSync(join(root, RAP8)) ? txt(RAP8) : '').split('\\n');",
  "const a1 = RL.indexOf('## 0. Arbitrage'), b1 = RL.indexOf('## 1. Résultat proposé'); const sans1 = a1 > 0 && b1 > a1 ? [...RL.slice(0, a1), ...RL.slice(b1)] : RL;",
  "const st1 = SL.findIndex((l) => l.startsWith('**Statut** : '));",
  "ctl(octets(SAUV8) === '" + RAP_SHA + "' && /^\\*\\*Statut\\*\\* : \\*\\*proposition, non arbitrée\\.\\*\\*/.test(SL[st1] ?? '') && /^\\*\\*Statut\\*\\* : \\*\\*arbitré le 2026-10-31\\*\\* \\(§0\\)\\./.test(RL[st1] ?? '') && a1 > 0 && b1 > a1 && sans1.length === SL.length && sans1.every((l, k) => k === st1 || l === SL[k]), 'rapport arbitré de T8 (§0) ; hors du statut et du §0, identique à la proposition sauvegardée', octets(SAUV8).slice(0, 12) + '… ; §0 : ' + (b1 - a1) + ' lignes');",
  "const s08 = a1 > 0 && b1 > a1 ? RL.slice(a1, b1).join('\\n') : '';",
  "ctl(s08.includes('**16 conformes, 0 écart, 0 suspendu**') && s08.includes('**Absence de `deictique` maintenue**') && s08.includes('**`intensifieur` seul maintenu**') && s08.includes('**Cumul `comparatif` + `intensifieur` confirmé**'), '§0 de T8 : 16 conformes, 0 écart, 0 suspendu ; すぐに, あまり et もっと tels qu\\'arbitrés', 'présents');");
recProp = ligne(recProp, "console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');",
  'const posR = cles.indexOf(RAP8);',
  "ctl(posR === -1 || posR === 42, 'rapport arbitré de T8 absent du manifeste ou en 43e entrée', posR === -1 ? 'hors du manifeste' : posR === 42 ? '43e entrée' : (posR + 1) + 'e entrée');",
  "console.log(ecarts ? ecarts + ' écart(s)' : 'recalcul conforme');");

// (2d) Complément de l'inventaire : lignes insérées après la dernière ligne de T8 ; aucune ligne existante ne change
const ANCRE_INV = '| `arbitrage-T8/consignation-T8/preparer-consignation-T8.mjs` |';
const c8 = (p) => sha(join(root, W + p)).slice(0, 8);
const LIGNES_INV = [
  "| `arbitrage-T8/consignation-T8/application/appliquer-consignation-T8.mjs` | application de la consignation de T8 : préconditions, diffs régénérés, hunks relus par remplacements ciblés, contrôles (`" + c8('arbitrage-T8/consignation-T8/application/appliquer-consignation-T8.mjs') + "…`) ; `essayer-consignation-T8.mjs` (`" + c8('arbitrage-T8/consignation-T8/application/essayer-consignation-T8.mjs') + "…`) : essai sur copie jetable | quatre documents, `…/application/depart/`, `…/application/sorties/` | lancé une fois le 2026-10-31, code 0 ; premier essai sur copie en code 1, corrigé avant toute écriture réelle |",
  "| `audit-v1-lot3-T8.mjs` | audit des 16 sens de T8 (D5, D8) : configuration passée au module commun v2, non modifié, en mode bloquant (`" + CFG_SHA.slice(0, 8) + "…`, constante `ARBITRAGE` non renseignée) | `docs/rapports/etape2-A2-05-volet1-lot3-T8.md` | lancé le 2026-10-31, code 0 |",
  "| `arbitrage-T8/audit/controle-audit-T8.mjs` | contrôle indépendant de l'audit de T8 en proposition (n'importe aucun module v2) ; `--sabotages` : 11 sabotages en mémoire et un témoin (`" + c8('arbitrage-T8/audit/controle-audit-T8.mjs') + "…`) ; il décrit l'état d'avant l'arbitrage | `…/audit/sortie-controle-audit-T8.txt`, par redirection | lancé le 2026-10-31, code 0 |",
  "| `arbitrage-T8/preparer-inscription-T8.mjs` | préparation de l'inscription de l'arbitrage de T8, sans application : versions proposées, simulation sur clone jetable, sabotages du recalcul adapté, étape B simulée | `arbitrage-T8/inscription/` | lancé le 2026-10-31 |",
  "| `arbitrage-T5/application-protection/sabotages-apres-application.mjs` | harnais de sabotages de l'adaptation à l'arbitrage de T5, dérivé pour l'état d'après application (`" + c8('arbitrage-T5/application-protection/sabotages-apres-application.mjs') + "…`) | `…/application-protection/sorties/` | historique, non relancé pour ce complément |",
  "| `arbitrage-T6/adaptation-T5/proposition-recalcul-T5-perimetre-arbitre-T6.mjs` | version proposée du recalcul de T5, adaptée à l'arbitrage de T6 (`" + c8('arbitrage-T6/adaptation-T5/proposition-recalcul-T5-perimetre-arbitre-T6.mjs') + "…`) | — (sortie standard) | historique, non relancé pour ce complément |",
  "| `arbitrage-T6/consignation-sync-38/appliquer-consignation-sync-38.mjs` | application de la consignation complémentaire de la synchronisation à 38 empreintes (`" + c8('arbitrage-T6/consignation-sync-38/appliquer-consignation-sync-38.mjs') + "…`) | documents de pilotage, bilan, inventaire | historique, non relancé pour ce complément |",
  "| `arbitrage-T6/inventaire/preparer-inventaire-T6.mjs` | complément proposé de l'inventaire pour T6 (`" + c8('arbitrage-T6/inventaire/preparer-inventaire-T6.mjs') + "…`) | `arbitrage-T6/inventaire/` | historique, non relancé pour ce complément |",
  "| `arbitrage-T6/versions-finales/proposition-controle-bilan-pilote-39.mjs` | version proposée du contrôle du bilan du pilote (`" + c8('arbitrage-T6/versions-finales/proposition-controle-bilan-pilote-39.mjs') + "…`) | — (sortie standard) | historique, non relancé pour ce complément |",
  "| `arbitrage-T6/versions-finales/proposition-recalcul-T6-perimetre-evolutif.mjs` | version proposée du recalcul de T6 (`" + c8('arbitrage-T6/versions-finales/proposition-recalcul-T6-perimetre-evolutif.mjs') + "…`) | — (sortie standard) | historique, non relancé pour ce complément |",
  "| `arbitrage-T6/versions-finales-2/proposition-controle-bilan-pilote-evolutif.mjs` | seconde version proposée du contrôle du bilan du pilote (`" + c8('arbitrage-T6/versions-finales-2/proposition-controle-bilan-pilote-evolutif.mjs') + "…`) | — (sortie standard) | historique, non relancé pour ce complément |",
];
const invB = lire(INV); if (invB.includes('\r\n')) arret('inventaire en CRLF : cas non prévu');
const invL = invB.split('\n'); const iInv = invL.flatMap((l, k) => (l.startsWith(ANCRE_INV) ? [k] : []));
ok(iInv.length === 1, 'P7 ancre de l\'inventaire présente une fois', iInv.length + ' occurrence(s)');
const invProp = [...invL.slice(0, iInv[0] + 1), ...LIGNES_INV, ...invL.slice(iInv[0] + 1)].join('\n');
const scripts = (d) => readdirSync(d).flatMap((e) => { const p = join(d, e); return statSync(p).isDirectory() ? scripts(p) : e.endsWith('.mjs') ? [p] : []; });
const copies = /[\\/](depart|inscription|consolidation|consignation-E2-E4|preparation-E3)[\\/][^\\/]*$/;
const nonListes = (t) => scripts(join(root, W)).filter((p) => !copies.test(p)).filter((p) => !t.includes(basename(p))).map((p) => p.slice(join(root, W).length).replace(/\\/g, '/'));
const manquants = nonListes(invB);
ok(manquants.length === 12, 'I1 relevé mécanique : 12 scripts absents de l\'inventaire avant complément, ce préparateur compris', manquants.length + '');
ok(!nonListes(invProp).length, 'I2 après complément : aucun script absent (hors copies de versions proposées)', nonListes(invProp).join(', ') || 'aucun');
ok(invProp.split('\n').length === invL.length + LIGNES_INV.length && invL.every((l) => invProp.split('\n').includes(l)), 'I3 complément : ' + LIGNES_INV.length + ' lignes ajoutées, aucune ligne existante modifiée');

// (3) Clone jetable : état de la génération du rapport relu (rapport présent), puis régénération avec ARBITRAGE
const tmp = mkdtempSync(join(tmpdir(), 'ocha-inscription-t8-')); const C = join(tmp, 'arbre'); const fC = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [fC(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim().slice(0, 240));
const sauvProp = lire(RAP);
writeFileSync(fC(CFG), cfgProp); // Rapport laissé en place : la version relue a été régénérée ainsi, et son §6 décrit cet état (320 arbitrés, 16 proposés, 41 restants)
const g = lancer(CFG); const rapProp = existsSync(fC(RAP)) ? readFileSync(fC(RAP), 'utf8') : '';
const L0 = sauvProp.split('\n'), L1 = rapProp.split('\n'); const i0 = L1.indexOf('## 0. Arbitrage'), i1 = L1.indexOf('## 1. Résultat proposé');
const sans0 = [...L1.slice(0, i0), ...L1.slice(i1)]; const st = L0.findIndex((l) => l.startsWith('**Statut** : '));
const memes = sans0.length === L0.length && sans0.every((l, k) => (k === st ? /^\*\*Statut\*\* : \*\*arbitré le 2026-10-31\*\* \(§0\)\./.test(l) : l === L0[k]));
ok(g.code === 0 && i0 > 0 && i1 > i0 && memes, 'E1 rapport régénéré avec ARBITRAGE : seuls changent la ligne de statut et le §0 inséré', 'génération code ' + g.code + (g.out ? ' (' + g.out.slice(0, 160) + ')' : '') + ' ; §0 : ' + (i1 - i0) + ' lignes ; ' + shaT(rapProp).slice(0, 12) + '…');
const fichesR = [...rapProp.matchAll(/^#### `(v_\d+_s\d+)` · /gm)].map((m) => m[1]);
ok(JSON.stringify([...fichesR].sort()) === JSON.stringify([...IDS].sort()) && /\*\*16 sens examinés : 16 conformes, 0 écart, aucun sens suspendu\.\*\*/.test(rapProp), 'E2 §1 et 16 fiches d\'examen d\'origine conservés, exactement les 16 sens du périmètre');
for (const p of [ETAT, ROAD, BIL]) writeFileSync(fC(p), prop[p]);
writeFileSync(fC(INV), invProp); writeFileSync(fC(SAUV), sauvProp); writeFileSync(fC(PREC), recProp);
ok(spawnSync(process.execPath, ['--check', fC(PREC)], { encoding: 'utf8' }).status === 0 && spawnSync(process.execPath, ['--check', fC(CFG)], { encoding: 'utf8' }).status === 0, 'E3 node --check du recalcul et de la configuration proposés');

const etape = (nom, rec) => {
  const r = { cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs'), cbp: lancer(CBP), recT5: lancer(W + 'recalcul-T5-perimetre.mjs'), recT6: lancer(W + 'recalcul-T6-perimetre.mjs'), recT7: lancer(W + 'recalcul-T7-perimetre.mjs'), recT8: lancer(rec), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), ap: lancer(W + 'sync-stable.mjs', '--apercu') };
  r.apercu = readFileSync(fC(APERCU), 'utf8');
  for (const [k, v] of Object.entries(r)) if (v?.out !== undefined) console.log('   ' + nom + ' ' + k + ' (code ' + v.code + ') : ' + v.out.split('\n').pop().slice(0, 170) + (ecartsDe(v).length ? ' | ' + ecartsDe(v).join(' | ') : ''));
  return r;
};
const etats = (cwd) => JSON.parse(spawnSync(process.execPath, ['--input-type=module', '-e', "import {couverture} from './a2-05-travail/couverture-lot3.mjs'; console.log(JSON.stringify(couverture('.').sens.map((s)=>[s.id,s.livraison,s.etat])))"], { cwd, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout || '[]');

// (4) Étape A
console.log('--- Étape A : inscription, 42 entrées au manifeste');
const A = etape('A', PREC);
const planA = (A.ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
ok(A.cov.code === 0 && /336 arbitrés, 0 proposés, 41 restants, sur 377/.test(A.cov.out), 'A1 couverture : 336 arbitrés, 0 proposé, 41 restants', A.cov.out.slice(0, 70));
const plusA = A.apercu.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++'));
ok(plusA.some((l) => /336 sens arbitrés sur 377 ; 41 restent \(0 proposés\)/.test(l)), 'A2 sync-stable : 336/377, 41 restent, 0 proposé', planA);
ok(LFs(readFileSync(fC(ETAT), 'utf8')).includes('**197 corrections, dans 172 ENTRY**') && !plusA.some((l) => /Corrections retenues/.test(l)), 'A3 corrections inchangées dans le bloc d\'état : 197, 172 ENTRY, V1-25 libre');
ok(A.recT8.code === 0, 'A4 recalcul de T8 proposé conforme à l\'état d\'après l\'inscription', A.recT8.out.split('\n').pop());
ok(A.emp.code === 0 && A.cbp.code === 0 && A.recT5.code === 0 && A.recT6.code === 0 && A.recT7.code === 0, 'A5 empreintes, bilan du pilote, recalculs de T5, T6 et T7 conformes, sans adaptation', [A.emp, A.cbp, A.recT5, A.recT6, A.recT7].map((r) => r.code).join(' '));
constat('A6 relais (état intermédiaire : rapport hors du manifeste, bloc non synchronisé)', A.rel.out.split('\n').pop() + ' ; ' + (A.rel.out.split('\n').filter((l) => /^\s*(ÉCART|écart|FAUX|faux)/.test(l)).map((l) => l.trim().slice(0, 130)).join(' | ') || 'aucun écart'));
const recEnService = lancer(REC); constat('A7 recalcul de T8 en service, non adapté', 'code ' + recEnService.code + ' ; ' + (ecartsDe(recEnService).map((l) => l.slice(0, 90)).join(' | ') || 'aucun écart'));
const caud = lancer(CAUD); constat('A7 bis contrôle de l\'audit en proposition, sur le rapport arbitré', 'code ' + caud.code + ' ; ' + (ecartsDe(caud).map((l) => l.slice(0, 90)).join(' | ') || 'aucun écart'));
// Les 16 sens couverts, les frontières, et rien d'antérieur modifié
const e0 = etats(root), e1 = etats(C); const arb = (e) => new Set(e.filter(([, , s]) => s === 'arbitré').map(([id]) => id));
const nouveaux = [...arb(e1)].filter((id) => !arb(e0).has(id)).sort(), perdus = [...arb(e0)].filter((id) => !arb(e1).has(id));
ok(JSON.stringify(nouveaux) === JSON.stringify([...IDS].sort()) && !perdus.length, 'A8 exhaustivité : les arbitrés nouveaux sont exactement les 16 sens de T8, aucun arbitré perdu', nouveaux.length + ' nouveaux, ' + perdus.length + ' perdus');
const rest = e1.filter(([, , s]) => s !== 'arbitré'); const parL = {}; for (const [, l] of rest) parL[l] = (parL[l] ?? 0) + 1;
ok(rest.length === 41 && Object.keys(parL).every((l) => ['E1', 'E2', 'E3', 'F1', 'F2'].includes(l)), 'A8 bis frontières : les 41 restants sont dans T9 et F seulement', Object.entries(parL).map(([k, v]) => k + ' ' + v).join(', '));
ok(sha(fC(JOURNAL)) === avant[JOURNAL] && sha(fC(VOCAB)) === avant[VOCAB] && sha(fC(REG)) === avant[REG] && Object.entries(lotsAvant).every(([f, h]) => sha(fC('reconstruction/a2-04/lots/' + f)) === h), 'A9 journal, lots, données et registre des tranches identiques : aucune décision antérieure modifiée', Object.keys(lotsAvant).length + ' lots');
ok(!/^\| V1-25 \|/m.test(prop[BIL]) && !/^\| V1-22 \|/m.test(prop[BIL]) && !/^\| V1-23 \|/m.test(prop[BIL]), 'A10 V1-25 non attribué ; V1-22 et V1-23 non retenus');
const ass = spawnSync(process.execPath, [fC('tools/reconstruction/run.mjs'), 'assemble'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 });
ok(ass.status === 0 && /684 ENTRY, 35 identifiant/.test(ass.stdout), 'A11 assemblage réel sur la copie', 'code ' + ass.status);

// Sabotages du recalcul proposé : chacun modifie réellement un fichier, puis il est restauré
const temoin0 = lancer(PREC); ok(temoin0.code === 0, 'R0 témoin sain avant les sabotages', temoin0.out.split('\n').pop());
const sabote = (nom, p, f, attendu) => {
  const orig = readFileSync(fC(p), 'utf8'); const mod = f(orig);
  if (mod === orig) { ok(false, nom, 'sabotage sans effet sur ' + p); return; }
  writeFileSync(fC(p), mod); const r = lancer(PREC); writeFileSync(fC(p), orig);
  const e = ecartsDe(r); ok(r.code === 1 && e.some((l) => attendu.test(l)) && readFileSync(fC(p), 'utf8') === orig, nom, 'code ' + r.code + ' ; ' + e.length + ' écart(s) : ' + e.map((l) => l.replace(/^ÉCART\s+/, '').split(' : ')[0].slice(0, 70)).join(' | '));
};
sabote('R1 rapport de T8 revenu à la proposition', RAP, () => sauvProp, /les 16 sens examinés dans le seul rapport/);
sabote('R2 proposition sauvegardée modifiée (un caractère)', SAUV, (t) => t + ' ', /rapport arbitré de T8 \(§0\)/);
sabote('R3 verdict modifié dans le rapport arbitré', RAP, (t) => t.replace('— proposé : **conforme**', '— proposé : **écart**'), /rapport arbitré de T8 \(§0\)/);
sabote('R4 une fiche retirée du rapport arbitré', RAP, (t) => t.replace('#### `v_518_s1` · ', '#### sans identifiant · '), /les 16 sens examinés dans le seul rapport/);
sabote('R5 §0 : すぐに altéré', RAP, (t) => t.replace('**Absence de `deictique` maintenue**', '**`deictique` ajoutée**'), /§0 de T8/);
sabote('R6 §0 : あまり altéré', RAP, (t) => t.replace('**`intensifieur` seul maintenu**', '**`quantificateur` ajouté**'), /§0 de T8/);
sabote('R7 §0 : もっと altéré', RAP, (t) => t.replace('**Cumul `comparatif` + `intensifieur` confirmé**', '**Cumul retiré**'), /§0 de T8/);
sabote('R8 §0 : décompte altéré', RAP, (t) => t.replace('**16 conformes, 0 écart, 0 suspendu**, comme proposé', '**15 conformes, 1 écart, 0 suspendu**, comme proposé'), /§0 de T8/);
sabote('R9 un sens de T8 examiné aussi dans un autre rapport', 'docs/rapports/etape2-A2-05-volet1-lot3-T7.md', (t) => t + '\n#### `v_494_s1` · いつも\n', /les 16 sens examinés dans le seul rapport/);
sabote('R10 rapport antérieur retiré : les 320 ne sont plus entiers', 'docs/rapports/etape2-A2-05-volet1-lot3-T5.md', (t) => t.replace(/^\*\*Statut\*\* : \*\*arbitré le /m, '**Statut** : **proposition du '), /les 320 sens arbitrés/);
sabote('R11 statut de T8 changé au registre', REG, (t) => JSON.stringify((() => { const o = JSON.parse(t); o.tranches.find((x) => x.id === 'T8').statut = 'arbitrée'; return o; })(), null, 2) + '\n', /entièrement arbitrée/);
sabote('R12 V1-7 retirée du bilan', BIL, (t) => t.replace(/^\| V1-7 \|.*\r?\n/gm, ''), /corrections/i);
sabote('R13 rapport arbitré mal placé au manifeste', MAN, (t) => { const o = JSON.parse(t); o.empreintes[ROAD] = sha(fC(ROAD)); o.empreintes[RAP] = sha(fC(RAP)); return JSON.stringify(o, null, 2) + '\n'; }, /absent du manifeste ou en 43e entrée/);
const temoin1 = lancer(PREC); ok(temoin1.code === 0, 'R14 témoin sain après les sabotages', temoin1.out.split('\n').pop());

// (5) Étape B, simulée seulement
console.log('--- Étape B, simulée : recalcul installé, 43e entrée, bloc d\'état synchronisé');
cpSync(fC(PREC), fC(REC));
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter');
const manB = JSON.parse(readFileSync(fC(MAN), 'utf8')).empreintes;
ok(aj.code === 0 && Object.keys(manB).length === 43 && Object.keys(manB).at(-1) === RAP && Object.keys(man0).every((k, n) => Object.keys(manB)[n] === k && manB[k] === man0[k]), 'B1 ajout au manifeste : 43 entrées, les 42 précédentes inchangées', aj.out.split('\n').pop().slice(0, 120));
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const planB = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const apercuB = readFileSync(fC(APERCU), 'utf8');
const app = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', planB);
ok(app.code === 0, 'B2 synchronisation simulée', 'plan ' + planB + ' ; code ' + app.code + ' ; ' + app.out.split('\n').pop().slice(0, 120));
const B = etape('B', REC);
lancer(W + 'sync-stable.mjs', '--apercu');
ok(B.cov.code === 0 && B.emp.code === 0 && B.cbp.code === 0 && B.recT5.code === 0 && B.recT6.code === 0 && B.recT7.code === 0 && B.recT8.code === 0 && B.rel.code === 0 && /30 conformes sur 30/.test(B.rel.out), 'B3 état final : tous les contrôles à 0 ; relais 30 sur 30', B.rel.out.split('\n').pop());
const dernier = readFileSync(fC(APERCU), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
ok(!dernier.length, 'B4 aperçu suivant vide', dernier.length + ' ligne(s) de différence');
ok(spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: C, encoding: 'utf8' }).stdout.trim() === '', 'B5 index vide sur la copie');

// (6) Écriture des propositions, seulement sans écart
if (!ko) {
  const d = join(root, OUT); mkdirSync(join(d, 'diffs'), { recursive: true });
  const ecrire = (nom, t) => writeFileSync(join(d, nom), t);
  ecrire('audit-v1-lot3-T8.mjs', cfgProp); ecrire('etape2-A2-05-volet1-lot3-T8.md', rapProp); ecrire('proposition-T8.md', sauvProp);
  ecrire('etape2-A2-05-bilan-volet2.md', prop[BIL]); ecrire('ETAT-ACTUEL.md', prop[ETAT]); ecrire('ROADMAP.md', prop[ROAD]); ecrire('INVENTAIRE-SCRIPTS.md', invProp);
  ecrire('proposition-recalcul-T8-perimetre-arbitre.mjs', recProp); ecrire('apercu-etape-A.md', A.apercu); ecrire('apercu-etape-B.md', apercuB);
  const lignesT = [];
  for (const [cible, nom] of [[CFG, 'audit-v1-lot3-T8.mjs'], [RAP, 'etape2-A2-05-volet1-lot3-T8.md'], [BIL, 'etape2-A2-05-bilan-volet2.md'], [ETAT, 'ETAT-ACTUEL.md'], [ROAD, 'ROADMAP.md'], [INV, 'INVENTAIRE-SCRIPTS.md'], [REC, 'proposition-recalcul-T8-perimetre-arbitre.mjs']]) {
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
