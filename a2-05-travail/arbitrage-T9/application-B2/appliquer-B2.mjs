// A2-05 · T9 : opération B2 (autorisée le 2026-11-01) : synchronisation des blocs a2-05:etat au plan relu, une seule fois.
// Usage : node a2-05-travail/arbitrage-T9/application-B2/appliquer-B2.mjs <racine du dépôt>
// (1) Préconditions, sans écriture, dont l'aperçu relancé, identique octet pour octet à l'aperçu relu. (2) ETAT-ACTUEL.md et ROADMAP.md sauvegardés.
// (3) sync-stable --appliquer, une fois. (4) Contrôles, dont les quatre remplacements autorisés et rien d'autre. Arrêt au premier groupe en écart ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T = W + 'arbitrage-T9/', B = T + 'application-B2/', DEP = B + 'depart/', SOR = B + 'sorties/', B1 = T + 'application-B1/';
const MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md', RELU = B1 + 'apercu-B2/apercu.md', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BILAN = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const PLAN = 'c6001f09d6a4672c', APERCU_SHA = '68e5d01b41f5b255ab113e45e56414c18914960ed0cf33cbafa258e48ec9565b', MARQUEUR = 'fe4967cf00896f07', MARQUEUR0 = '0e9d7a7423b2ef14';
const MAN_SHA = '89716587f51f6359b567cf56b07437b69093d67583c3180268fc7467183e836e', MAN44 = B1 + 'depart/empreintes-rapports-arbitres.json', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9.md', RAP_SHA = '73d4dee6568694cc4509d00a084b8f3b1581f8404d65f88b2a61be074c80df6a';
const REMPLACEMENTS = [ // les quatre changements autorisés, chacun présent une fois par document
  ['a2-05:etat:debut empreinte=' + MARQUEUR0, 'a2-05:etat:debut empreinte=' + MARQUEUR],
  ['- **Lot 3** : 336 sens arbitrés sur 377 ; 41 restent (0 proposés).', '- **Lot 3** : 360 sens arbitrés sur 377 ; 17 restent (0 proposés).'],
  ['- **Corrections retenues, non appliquées** : 197, dans 172 ENTRY ; prochain numéro libre : V1-25.', '- **Corrections retenues, non appliquées** : 204, dans 177 ENTRY ; prochain numéro libre : V1-32.'],
  ['manifeste d\'empreintes, 44 rapports arbitrés identiques.', 'manifeste d\'empreintes, 45 rapports arbitrés identiques.'],
];
const BLOC = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const trace = []; let ko = 0;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const arretSi = (e) => { if (ko) { dire('ARRÊT : ' + ko + ' écart(s), ' + e); process.exit(1); } };
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const fin = (r) => r.out.split('\n').pop();
const ecarts = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim().split(/\s+/)[1]).sort().join(',');
const etat = () => { const r = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }); return (r.stdout ?? '').trim(); };
const ETAT_ATTENDU = '{"arbitres":360,"restants":17,"proposes":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"]}';
const restantsF = () => spawnSync(process.execPath, ['--input-type=module', '-e', "import {couverture} from './a2-05-travail/couverture-lot3.mjs'; const s=couverture('.').sens.filter((x)=>x.etat!=='arbitré'); console.log(s.length, [...new Set(s.map((x)=>x.livraison))].sort().join())"], { cwd: root, encoding: 'utf8' }).stdout.trim();
const pasAppliquees = () => { const v = JSON.parse(lire('data/n5/vocab.json')); const e = (id) => v.find((x) => x.id === id); const fns = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse]; return JSON.stringify(e('v_348').senses[1].meaning.alternatives) === '["Auparavant"]' && !fns(e('v_285').senses[0]).length && !fns(e('v_704').senses[1]).length && JSON.stringify(e('v_594').tags) === '["lieu_konbini","lieu_restaurant"]' && ['v_91', 'v_92', 'v_459'].every((id) => JSON.stringify(e(id).tags) === '["lieu_restaurant"]') && JSON.stringify(e('v_427').senses[0].meaning.alternatives) === '["Pas bon"]'; };
const man = JSON.parse(lire(MAN)).empreintes; const cles = Object.keys(man);
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => 'reconstruction/a2-04/lots/' + f);
const PROTEGES = [MAN, ...cles, ...lots, 'reconstruction/a2-04/journal.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', W + 'registre-tranches.json', BILAN, T + 'proposition-T9.md', W + 'INVENTAIRE-SCRIPTS.md', W + 'recalcul-T8-perimetre.mjs', W + 'recalcul-T9-perimetre.mjs', W + 'audit-v1-lot3-T9.mjs'];
const temoin = Object.fromEntries(PROTEGES.map((p) => [p, shaF(p)]));
const horsBloc = (t) => t.replace(BLOC, '');
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim();

// (1) Préconditions
dire('--- Préconditions');
const m44 = JSON.parse(readFileSync(join(root, MAN44), 'utf8')).empreintes; const c44 = Object.keys(m44);
ok(shaF(MAN) === MAN_SHA && cles.length === 45 && cles.every((p) => shaF(p) === man[p]), 'P1 manifeste à son empreinte relue ; 45 empreintes recalculées, toutes conformes', MAN_SHA);
ok(c44.length === 44 && c44.every((k, i) => cles[i] === k && man[k] === m44[k]), 'P2 les 44 premières entrées inchangées, en valeur et en ordre');
ok(cles[44] === RAP && man[RAP] === RAP_SHA, 'P3 rapport arbitré de T9 en 45e position', RAP);
const ap0 = lancer(W + 'sync-stable.mjs', '--apercu'); const plan0 = (ap0.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
ok(ap0.code === 0 && plan0 === PLAN, 'P4 aperçu relancé sur le dépôt réel : plan exigé', plan0 + ' ; ' + fin(ap0));
ok(shaF(APERCU) === APERCU_SHA, 'P5 empreinte complète de l\'aperçu exigée', shaF(APERCU));
ok(existsSync(join(root, RELU)) && Buffer.compare(readFileSync(join(root, APERCU)), readFileSync(join(root, RELU))) === 0, 'P6 diff régénéré = diff relu, octet pour octet', RELU);
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P7 index vide');
ok(!existsSync(join(root, DEP)), 'P8 sauvegarde absente');
for (const p of [ETAT, ROAD]) { const t = lire(p); ok(t.split('a2-05:etat:debut').length === 2 && REMPLACEMENTS.every(([a]) => t.split(a).length === 2), 'P9 ' + p + ' : bloc de départ, quatre textes à remplacer, chacun une fois', MARQUEUR0); }
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 1 && fin(rel0) === '29 conformes sur 30' && ecarts(rel0) === 'C8', 'P10 relais de départ : 29 sur 30, C8 seul', fin(rel0) + ' ; ' + ecarts(rel0));
ok(!zones(), 'P11 zones data, reconstruction, tests, tools, docs/conception sans modification');
arretSi('avant écriture : aucun document de pilotage modifié');

// (2) et (3)
dire('--- Sauvegarde et synchronisation');
mkdirSync(join(root, DEP), { recursive: true }); mkdirSync(join(root, SOR), { recursive: true });
for (const p of [ETAT, ROAD]) { copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === shaF(p), 'sauvegardé : ' + p, shaF(p)); }
arretSi('sauvegarde incomplète : aucun document modifié');
const app = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', PLAN);
ok(app.code === 0, 'synchronisation, une fois', 'code ' + app.code + ' ; ' + fin(app));
arretSi('état atteint conservé, aucune réparation');

// (4) Contrôles
dire('--- Contrôles après B2');
const bE = lire(ETAT).match(BLOC)?.[0].replace(/\r\n/g, '\n'), bR = lire(ROAD).match(BLOC)?.[0].replace(/\r\n/g, '\n');
ok(bE && bE === bR && bE.includes('empreinte=' + MARQUEUR) && lire(ETAT).split('a2-05:etat:debut').length === 2 && lire(ROAD).split('a2-05:etat:debut').length === 2, 'C1 les deux blocs identiques, marqueur attendu', MARQUEUR);
for (const p of [ETAT, ROAD]) { const d = readFileSync(join(root, DEP + p), 'utf8'); ok(lire(p) === REMPLACEMENTS.reduce((t, [a, n]) => t.replace(a, n), d), 'C2 ' + p + ' : sauvegarde + les quatre remplacements, octet pour octet'); ok(horsBloc(lire(p)) === horsBloc(d), 'C2 ' + p + ' : hors du bloc, identique octet pour octet', shaF(p)); }
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); const ch = readFileSync(join(root, APERCU), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
ok(ap1.code === 0 && !ch.length, 'C3 aperçu suivant vide', fin(ap1));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 45 rapports contrôlés, identiques/.test(emp.out), 'C4 manifeste : 45 empreintes conformes', emp.out.slice(0, 80));
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C5 relais : 30 sur 30', fin(rel));
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['recalcul de T9', W + 'recalcul-T9-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'C6 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(cov.out) && restantsF() === '17 F1,F2', 'C7 couverture : 360/377, 17 restants, tous dans F', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C8 204 corrections dans 177 ENTRY ; V1-22 et V1-23 réservés ; V1-32 libre', etat());
ok(pasAppliquees(), 'C9 aucune correction appliquée : V1-25 à V1-31 aux valeurs « avant » ; `v_427_s1` publie toujours « Pas bon »');
const mod = PROTEGES.filter((p) => shaF(p) !== temoin[p]); ok(!mod.length && !zones(), 'C10 rapport de T9, décisions historiques, normes, données publiées, registre et historique documentaire intacts', mod.join(', ') || PROTEGES.length + ' fichiers');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C11 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C12 git diff --check', 'code ' + dc.status);
writeFileSync(join(root, SOR, 'application-B2.txt'), trace.join('\n') + '\n' + (ko ? ko + ' écart(s)\n' : 'B2 conforme\n'));
console.log(ko ? ko + ' écart(s) : arrêt, état atteint conservé' : 'B2 conforme');
process.exit(ko ? 1 : 0);
