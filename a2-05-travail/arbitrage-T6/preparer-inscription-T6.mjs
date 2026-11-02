// A2-05 · volet 1 · lot 3 : préparation de l'inscription de l'arbitrage de T6 (décision du 2026-10-29), EN PROPOSITION : aucun fichier concerné
// n'est modifié (rapport de T6, configuration, bilan du volet 2, documents de pilotage, manifeste, contrôles en service).
// Usage : node a2-05-travail/arbitrage-T6/preparer-inscription-T6.mjs <racine du dépôt>
// (1) Préconditions sur le dépôt réel : rapport de T6 = proposition relue ; configuration sans ARBITRAGE ; §8.100 absent ; 38 empreintes ; fragments.
// (2) Dans un clone git jetable recouvert de l'arbre de travail, dans l'état de la livraison (rapport de T6 présent, en proposition) : régénération du
// rapport par le module v2 avec la constante ARBITRAGE ; le résultat doit être exactement la proposition relue, à deux différences près (ligne de
// statut ; §0 inséré avant le §1). Puis §8.100 du bilan et deux fragments chiffrés d'ETAT-ACTUEL.md et ROADMAP.md ; proposition sauvegardée.
// (3) Étape A (inscription seule, 38 entrées au manifeste, rapport de T6 hors du manifeste) : couverture, manifeste, contrôle du bilan du pilote,
// recalculs de T5 et de T6 en service, recalcul de T6 proposé, relais, aperçu de synchronisation ; résultats relevés. Puis tests de régression du
// recalcul proposé : témoin sain, sabotages (chacun vérifié comme modifiant réellement le fichier, puis restauré), témoin sain final.
// (4) Propositions et différences écrites dans arbitrage-T6/inscription/ (refus si le dossier existe). (5) Dépôt réel inchangé. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T6/inscription';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T6.md', CFG = 'a2-05-travail/audit-v1-lot3-T6.mjs', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const MAN = 'a2-05-travail/empreintes-rapports-arbitres.json', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md';
const REC = 'a2-05-travail/recalcul-T6-perimetre.mjs', PREC = 'a2-05-travail/arbitrage-T6/proposition-recalcul-T6-perimetre-arbitre.mjs';
const SAUV = 'a2-05-travail/arbitrage-T6/proposition-T6.md';
const RAP_SHA = '858bc41c252aa38e13fe15434fdd1f3a24381734eb5764c7598377d848fb6224';
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex'); const shaT = (t) => createHash('sha256').update(t).digest('hex');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l, d) => console.log('constat  ' + l + (d ? ' : ' + d : ''));
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const TEMOINS = [RAP, CFG, BIL, MAN, ETAT, ROAD, REC, PREC, 'a2-05-travail/controle-bilan-pilote.mjs', 'a2-05-travail/recalcul-T5-perimetre.mjs', 'a2-05-travail/registre-tranches.json', 'data/n5/vocab.json', 'reconstruction/a2-04/journal.json'];
const avant = Object.fromEntries(TEMOINS.map((p) => [p, sha(join(root, p))]));
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');
if (existsSync(join(root, SAUV))) arret(SAUV + ' existe déjà');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const LFs = (t) => t.replace(/\r\n/g, '\n');

// Fragments chiffrés, hors du bloc généré, à l'identique dans ETAT-ACTUEL.md et ROADMAP.md (texte normalisé en LF)
const FRAGMENTS = [
  ['(B6 à B8). **274\n  candidats arbitrés sur 377 ; 103 restent**', '(B6 à B8). **296\n  candidats arbitrés sur 377 ; 81 restent**'],
  ['Les 103 candidats restants du lot 3, dont les 17 du bloc F', 'Les 81 candidats restants du lot 3, dont les 17 du bloc F'],
];

// (1) Préconditions
const man0 = JSON.parse(lire(MAN)).empreintes;
ok(avant[RAP] === RAP_SHA && /^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/m.test(lire(RAP)) && !lire(RAP).includes('## 0. Arbitrage'), 'P1 rapport de T6 = proposition relue, au statut de proposition, sans §0', avant[RAP].slice(0, 12) + '…');
ok(/^const ARBITRAGE = null;$/m.test(lire(CFG)), 'P2 configuration : ARBITRAGE non renseigné');
ok(!/^### 8\.100 /m.test(lire(BIL)) && /^### 8\.99 /m.test(lire(BIL)), 'P3 bilan : §8.99 présent, §8.100 absent');
ok(Object.keys(man0).length === 38 && Object.entries(man0).every(([p, h]) => sha(join(root, p)) === h) && !Object.hasOwn(man0, RAP), 'P4 manifeste : 38 empreintes identiques ; rapport de T6 absent');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P5 ' + p + ' : deux fragments présents une fois, remplacements absents'); }

// (2a) Configuration proposée : seule la constante ARBITRAGE change
const ARB = {
  date: '2026-10-29',
  texte: [
    "Arbitrage du 2026-10-29 (ChatGPT, par délégation ; relayé par l'utilisateur) : « La relecture du rapport `etape2-A2-05-volet1-lot3-T6.md` est favorable, sous réserve d'intégrer l'arbitrage suivant. **Je retiens les 21 verdicts conformes proposés et recommande de transformer le verdict suspendu de それから en conforme.** »",
    '',
    "**22 conformes, aucun écart, aucun suspendu**, contre 21 conformes et 1 suspendu proposés : le verdict suspendu de それから (`v_416_s1`) devient **conforme**. La proposition est conservée ci-dessous, telle qu'elle a été livrée ; ses verdicts du §1 et ses fiches d'examen ne sont pas modifiés. **La catégorie de それから n'est plus une contradiction normative non résolue** : la proposition la signalait comme telle (fiche de `v_416_s1` ; §5, point 1 ; §7, question 2) ; l'arbitrage ci-dessous la tranche.",
    '',
    '| Point | Arbitrage |',
    '|---|---|',
    '| **Verdicts conformes (21)** | Retenus tels que proposés. |',
    "| **それから, sens 1 (point 1)** | **Conforme ; lecture A retenue : `category: null` maintenu.** Motivation de l'arbitrage : « La fiche source décrit un connecteur servant à relier des actions consécutives dans le temps ou à énumérer des éléments. La succession temporelle est une nuance de son emploi, sans constituer nécessairement son domaine sémantique primaire. A9 §4.1 et A2-GLOBAL §10 permettent donc le maintien de `null`. » Sont conservés : `semantic_type: null` (D1448) ; la fonction `connecteur` ; les traductions, nuances, exemples et relations publiés ; le choix 17 du lot 23 et la frontière 3 du périmètre de T6. La lecture B n'est pas retenue : V1-24 n'est pas ouvert ; aucune décision historique n'est modifiée. |",
    '| **そうして, sens 1** | Verdict conforme confirmé. |',
    "| **« Conclure » (point 2)** | Confirmé tel que proposé : les sens 1 de じゃあ, では, それでは et じゃ restent `connecteur` (conséquence tirée de ce qui précède) ; l'ambiguïté de formulation d'A9, §3.2, reste signalée, sans contradiction normative. |",
    '| **Traductions communes (point 3)** | Confirmé tel que proposé : répartition des fonctions entre les sens qui partagent « Alors » ou « Bon » ; `politesse` posée là seulement où la fiche dit « de manière polie », non sur じゃ, sens 3, ni sur じゃあ. |',
    '| **どうも, sens 2 (point 4)** | Confirmé tel que proposé : `intensifieur` conforme dans les deux lectures de la fiche (« vraiment », « atténuation »). |',
    '',
    "**Liste globale inchangée : aucune correction nouvelle ; 196 corrections dans 172 ENTRY, non appliquées ; V1-24 reste libre.** Comptes attendus par l'arbitrage, calculés par les outils et non imposés à la main : 296 sens arbitrés sur 377, 81 restants.",
  ],
};
const cfgProp = lire(CFG).replace(/^const ARBITRAGE = null;$/m, () => 'const ARBITRAGE = ' + JSON.stringify(ARB, null, 2) + ';');

// (2b) §8.100 du bilan (aucune ligne de tableau : le comptage des corrections et des réservations ne la lit pas)
const S8100 = [
  '### 8.100 Volet 1, lot 3 : T6 arbitrée, 22 conformes, aucun écart ; それから conforme, `category: null` maintenu (2026-10-29)',
  '',
  'Arbitrage du 2026-10-29 (ChatGPT, par délégation ; relayé par l\'utilisateur) : « Je retiens les 21 verdicts conformes proposés et recommande de transformer le verdict suspendu de それから en conforme. » Détail dans `docs/rapports/etape2-A2-05-volet1-lot3-T6.md` (§0, inscrit par le module v2 ; proposition relue `858bc41c252a…` conservée à l\'identique hors du statut et du §0, et sauvegardée dans `a2-05-travail/arbitrage-T6/proposition-T6.md`).',
  '',
  '**T6 : 22 conformes, aucun écart, aucun suspendu**, contre 21 conformes et 1 suspendu proposés. **それから, sens 1** : lecture A retenue, `category: null` maintenu ; selon l\'arbitrage, la fiche décrit un connecteur qui relie des actions consécutives dans le temps ou énumère des éléments, la succession temporelle étant une nuance de son emploi, non nécessairement son domaine sémantique primaire (A9, §4.1 ; A2-GLOBAL, §10). Conservés : `semantic_type: null` (D1448), la fonction `connecteur`, les traductions, nuances, exemples et relations publiés, le choix 17 du lot 23 et la frontière 3 du périmètre de T6 ; la catégorie de それから n\'est plus présentée comme une contradiction normative non résolue. Confirmés, tels que proposés : le verdict conforme de そうして ; les points 2 (« conclure » : `connecteur`), 3 (traductions communes ; `politesse`) et 4 (どうも, sens 2 : `intensifieur`).',
  '',
  '**Décomptes calculés par les outils**, non saisis à la main : **296 sens arbitrés sur 377, 81 restants ; 196 corrections dans 172 ENTRY, non appliquées ; prochain identifiant disponible : V1-24.** Le rapport arbitré de T6 reste hors du manifeste (38 empreintes) ; son ajout éventuel relève d\'une autorisation distincte. Aucune correction lexicale n\'est appliquée ; aucun `git add`, commit ni push.',
];
const bilanProp = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S8100.join(eol) + eol; })();
ok(!S8100.some((l) => /^\| /.test(l)), '§8.100 : aucune ligne de tableau');
const pilote = (p) => { const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const prop = { [ETAT]: pilote(ETAT), [ROAD]: pilote(ROAD), [BIL]: bilanProp };
const sauvProp = lire(RAP);
ok(shaT(sauvProp) === RAP_SHA, 'proposition sauvegardée = proposition relue, octet pour octet', shaT(sauvProp).slice(0, 12) + '…');

// (3) Clone jetable, état de la livraison (rapport de T6 présent, en proposition), régénération avec ARBITRAGE
const tmp = mkdtempSync(join(tmpdir(), 'ocha-inscription-t6-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim().slice(0, 220));
// La proposition relue a été générée, la seconde fois, rapport présent en proposition (« 274 arbitrés, 22 proposés, 81 restants ») : le rapport
// en proposition reste donc en place pendant la régénération (à la différence de T5, où il était absent)
writeFileSync(join(C, CFG), cfgProp);
const g = lancer(CFG); const rapProp = existsSync(join(C, RAP)) ? readFileSync(join(C, RAP), 'utf8') : '';
const L0 = lire(RAP).split('\n'), L1 = rapProp.split('\n'); const i0 = L1.indexOf('## 0. Arbitrage'), i1 = L1.indexOf('## 1. Résultat proposé');
const sans0 = [...L1.slice(0, i0), ...L1.slice(i1)]; const st = L0.findIndex((l) => l.startsWith('**Statut** : '));
const memes = sans0.length === L0.length && sans0.every((l, k) => k === st ? /^\*\*Statut\*\* : \*\*arbitré le 2026-10-29\*\* \(§0\)\./.test(l) : l === L0[k]);
ok(g.code === 0 && i0 > 0 && i1 > i0 && memes, 'E1 rapport régénéré avec ARBITRAGE (état de la livraison) : seuls changent la ligne de statut et le §0 inséré', 'génération code ' + g.code + (g.out ? ' (' + g.out.slice(0, 120) + ')' : '') + ' ; §0 : ' + (i1 - i0) + ' lignes ; ' + shaT(rapProp).slice(0, 12) + '…');
ok((rapProp.match(/^#### `v_\d+_s\d+` · .* — proposé : \*\*conforme\*\*$/gm) ?? []).length === 21 && (rapProp.match(/^#### `v_416_s1` · .* — proposé : \*\*suspendu\*\*$/gm) ?? []).length === 1 && /\*\*22 sens examinés : 21 conformes, 0 écart, 1 suspendu\.\*\*/.test(rapProp), 'E2 §1 et 22 fiches d\'examen d\'origine conservés (21 conformes, 1 suspendu proposés)');
ok(rapProp.includes("**La catégorie de それから n'est plus une contradiction normative non résolue**") && rapProp.includes('**Conforme ; lecture A retenue : `category: null` maintenu.**'), 'E3 §0 : それから conforme, lecture A, cas présenté comme tranché');
for (const p of [ETAT, ROAD, BIL]) writeFileSync(join(C, p), prop[p]);
writeFileSync(join(C, SAUV), sauvProp);
cpSync(join(root, PREC), join(C, PREC));
const etape = (nom) => {
  const r = { cov: lancer('a2-05-travail/couverture-lot3.mjs'), emp: lancer('a2-05-travail/empreintes-lot3.mjs'), cbp: lancer('a2-05-travail/controle-bilan-pilote.mjs'), recT5: lancer('a2-05-travail/recalcul-T5-perimetre.mjs'), recS: lancer(REC), recP: lancer(PREC), rel: lancer('a2-05-travail/controle-relais-allege.mjs', '--apres-application'), ap: lancer('a2-05-travail/sync-stable.mjs', '--apercu') };
  r.apercu = readFileSync(join(C, 'a2-05-travail/sync-stable-apercu.md'), 'utf8'); r.hunks = (r.apercu.match(/^@@/gm) ?? []).length;
  for (const [k, v] of Object.entries(r)) if (v?.out !== undefined) console.log('   ' + nom + ' ' + k + ' (code ' + v.code + ') : ' + v.out.split('\n').pop().slice(0, 170) + (ecartsDe(v).length ? ' | ' + ecartsDe(v).join(' | ') : ''));
  return r;
};
const A = etape('A');
ok(A.cov.code === 0 && /296 arbitrés, 0 proposés, 81 restants, sur 377/.test(A.cov.out), 'A1 couverture après inscription : 296 arbitrés, 0 proposé, 81 restants', A.cov.out.slice(0, 80));
const plus = A.apercu.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++'));
ok(plus.some((l) => /296 sens arbitrés sur 377 ; 81 restent \(0 proposés\)/.test(l)) && !plus.some((l) => /Corrections retenues/.test(l)), 'A2 comptes de sync-stable (bloc proposé, non appliqué) : 296/377, 81 restent, 0 proposé ; ligne des corrections inchangée (196 dans 172 ENTRY, V1-24)', plus.filter((l) => /Lot 3|Corrections|Contrôles/.test(l)).map((l) => l.slice(0, 120)).join(' | '));
ok(A.emp.code === 0 && A.emp.out.endsWith('hors du manifeste : ' + RAP), 'A3 manifeste à 38 ; rapport arbitré de T6 signalé hors du manifeste', A.emp.out);
constat('A4 contrôle du bilan du pilote', 'code ' + A.cbp.code + ' ; ' + (ecartsDe(A.cbp).join(' ; ') || 'aucun écart'));
constat('A5 recalcul de T5 en service', 'code ' + A.recT5.code + ' ; ' + (ecartsDe(A.recT5).join(' ; ') || 'aucun écart'));
constat('A6 recalcul de T6 en service (non adapté)', 'code ' + A.recS.code + ' ; ' + (ecartsDe(A.recS).join(' ; ') || 'aucun écart'));
ok(A.recP.code === 0, 'A7 recalcul de T6 proposé conforme à l\'état d\'après l\'inscription', A.recP.out.split('\n').pop());
constat('A8 relais', A.rel.out.split('\n').pop() + ' ; ' + (ecartsDe(A.rel).join(' ; ') || 'aucun écart'));
constat('A9 aperçu de synchronisation', A.hunks + ' hunk(s) ; ' + A.ap.out.split('\n').pop());

// Tests de régression du recalcul proposé, dans le clone (état A) : chaque sabotage modifie réellement un fichier, puis il est restauré
const recP = () => lancer(PREC);
const temoin0 = recP(); ok(temoin0.code === 0, 'R0 témoin sain avant les sabotages', temoin0.out.split('\n').pop());
const fC = (p) => join(C, p);
const sabote = (nom, p, f, attendus) => {
  const orig = readFileSync(fC(p), 'utf8'); const mod = f(orig);
  if (mod === orig) { ok(false, nom, 'sabotage sans effet sur ' + p); return; }
  writeFileSync(fC(p), mod); const r = recP(); writeFileSync(fC(p), orig);
  const e = ecartsDe(r); const manquants = attendus.filter((re) => !e.some((l) => re.test(l)));
  ok(r.code === 1 && !manquants.length && readFileSync(fC(p), 'utf8') === orig, nom, 'code ' + r.code + ' ; ' + e.length + ' écart(s) : ' + e.map((l) => l.replace(/^ÉCART\s+/, '').split(' : ')[0]).join(' | ') + (manquants.length ? ' ; ATTENDU ABSENT : ' + manquants.join(', ') : ''));
};
const json2 = (t, f) => { const o = JSON.parse(t); f(o); return JSON.stringify(o, null, 2) + '\n'; };
const RAPT5 = 'docs/rapports/etape2-A2-05-volet1-lot3-T5.md';
sabote('R1 rapport de T6 revenu à la proposition (non arbitré)', RAP, () => sauvProp, [/les 22 sens examinés dans le seul rapport de T6/, /inventaire des restants/, /T6 \(D6, D7\) entièrement arbitrée/, /rapport arbitré de T6/]);
sabote('R2 verdict d\'une fiche modifié dans le rapport arbitré (suspendu → conforme)', RAP, (t) => t.replace('— proposé : **suspendu**', '— proposé : **conforme**'), [/rapport arbitré de T6/]);
sabote('R3 motivation d\'une fiche modifiée hors du §0', RAP, (t) => t.replace('**Point 1 · Catégorie de それから', '**Point 1 · Catégorie de それから (résolu)'), [/rapport arbitré de T6/]);
sabote('R4 §0 supprimé, statut arbitré conservé', RAP, (t) => { const L = t.split('\n'); const a = L.indexOf('## 0. Arbitrage'), b = L.indexOf('## 1. Résultat proposé'); return [...L.slice(0, a), ...L.slice(b)].join('\n'); }, [/rapport arbitré de T6/]);
sabote('R5 date du statut modifiée', RAP, (t) => t.replace('**arbitré le 2026-10-29**', '**arbitré le 2026-10-30**'), [/rapport arbitré de T6/]);
sabote('R6 proposition sauvegardée modifiée', SAUV, (t) => t + '\n', [/rapport arbitré de T6/]);
sabote('R7 rapport de T6 ajouté au manifeste (39 entrées)', MAN, (t) => json2(t, (o) => { o.empreintes[RAP] = shaT(readFileSync(fC(RAP))); }), [/manifeste/]);
sabote('R8 rapport protégé modifié (rapport arbitré de T5)', RAPT5, (t) => t + ' ', [/manifeste/]);
sabote('R9 un sens de T6 examiné aussi dans un autre rapport', RAPT5, (t) => t + '\n#### `v_416_s1` · それから\n', [/les 22 sens examinés dans le seul rapport de T6/]);
sabote('R10 catégorie publiée de それから modifiée (data/)', 'data/n5/vocab.json', (t) => json2(t, (o) => { o.find((e) => e.id === 'v_416').senses[0].category = { level_1: 'temps', level_2: 'chronologie', level_3: 'succession' }; }), [/catégories, types et fonctions du §2/, /`category: null` et `semantic_type: null`/]);
sabote('R11 statut de T6 modifié dans le registre des tranches', 'a2-05-travail/registre-tranches.json', (t) => json2(t, (o) => { o.tranches.find((x) => x.id === 'T6').statut = 'arbitrée'; }), [/T6 \(D6, D7\) entièrement arbitrée/]);
sabote('R12 décision type-nul de それから repassée en proposed (journal)', 'reconstruction/a2-04/journal.json', (t) => json2(t, (o) => { o.find((d) => d.kind === 'type-nul' && d.entry === 'n5_v_416').status = 'proposed'; }), [/une décision type-nul validée par sens/]);
sabote('R13 périmètre accepté de T6 modifié', 'docs/rapports/etape2-A2-05-volet1-lot3-T6-perimetre.md', (t) => t + ' ', [/périmètre accepté identique à sa version acceptée/, /manifeste/]);
const temoin1 = recP(); ok(temoin1.code === 0, 'R14 témoin sain après les sabotages (restaurations vérifiées)', temoin1.out.split('\n').pop());
// Le recalcul proposé, lancé sur l'état d'avant l'inscription (rapport de T6 en proposition), rend des écarts : il ne vaut que pour l'état arbitré
const etatAvant = (() => { const sv = { [RAP]: readFileSync(fC(RAP)), [SAUV]: readFileSync(fC(SAUV)) }; writeFileSync(fC(RAP), sauvProp); unlinkSync(fC(SAUV)); const r = recP(); for (const [p, b] of Object.entries(sv)) writeFileSync(fC(p), b); return r; })();
constat('R15 recalcul proposé sur l\'état d\'avant l\'inscription', 'code ' + etatAvant.code + ' ; ' + ecartsDe(etatAvant).map((l) => l.replace(/^ÉCART\s+/, '').split(' : ')[0]).join(' | '));
const sAp = createHash('sha256').update(readFileSync(join(C, 'a2-05-travail/sync-stable-apercu.md'))).digest('hex');
rmSync(tmp, { recursive: true, force: true });

// (4) Écriture des propositions et des différences
mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
const sorties = [[RAP, 'etape2-A2-05-volet1-lot3-T6.md', rapProp], [CFG, 'audit-v1-lot3-T6.mjs', cfgProp], [BIL, 'etape2-A2-05-bilan-volet2.md', prop[BIL]], [ETAT, 'ETAT-ACTUEL.md', prop[ETAT]], [ROAD, 'ROADMAP.md', prop[ROAD]], [REC, 'proposition-recalcul-T6-perimetre-arbitre.mjs', lire(PREC)]];
for (const [p, nom, t] of sorties) {
  writeFileSync(join(root, OUT, nom), t);
  const d = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + '/' + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  writeFileSync(join(root, OUT, 'diffs', nom + '.diff'), d.stdout);
  const n = (c) => d.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length;
  ok(d.status === 1, 'proposé : ' + p, '+' + n('+') + ' / -' + n('-') + ' lignes ; ' + shaT(t).slice(0, 12) + '…');
}
writeFileSync(join(root, OUT, 'proposition-T6.md'), sauvProp);
ok(sha(join(root, OUT, 'proposition-T6.md')) === RAP_SHA, 'proposé : ' + SAUV + ' (nouveau fichier, copie de la proposition relue)', RAP_SHA.slice(0, 12) + '…');
writeFileSync(join(root, OUT, 'apercu-etape-A.md'), A.apercu);
constat('aperçu de l\'étape A écrit', sAp.slice(0, 16));

// (5) Dépôt réel inchangé
const ch = TEMOINS.filter((p) => sha(join(root, p)) !== avant[p]);
ok(ch.length === 0 && !existsSync(join(root, SAUV)), 'dépôt réel inchangé (' + TEMOINS.length + ' fichiers témoins ; proposition sauvegardée non créée)', ch.join(', ') || 'aucune modification');
console.log(ko ? ko + ' écart(s)' : 'préparation conforme');
process.exit(ko ? 1 : 0);
