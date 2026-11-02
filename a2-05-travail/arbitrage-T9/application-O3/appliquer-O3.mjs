// A2-05 · T9 : opération O3 (autorisée le 2026-11-01) : synchronisation des blocs a2-05:etat au plan relu, une seule fois. Ni la correction RES, ni l'audit de T9.
// Usage : node a2-05-travail/arbitrage-T9/application-O3/appliquer-O3.mjs <racine du dépôt>
// (1) Préconditions, sans écriture, dont l'aperçu relancé, identique octet pour octet à l'aperçu relu. (2) ETAT-ACTUEL.md et ROADMAP.md sauvegardés. (3) sync-stable --appliquer, une fois.
// (4) Contrôles, dont les deux remplacements autorisés et rien d'autre. Arrêt au premier écart, avant ou après écriture ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T9 = W + 'arbitrage-T9/', A = T9 + 'application-O3/', DEP = A + 'depart/', SOR = A + 'sorties/', RELU = T9 + 'application-O2/apercu-O3/apercu.md', MAN43 = T9 + 'application-O2/depart/empreintes-rapports-arbitres.json';
const MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md', REC = W + 'recalcul-T9-perimetre.mjs', GEN = W + 'perimetre-v2.mjs', CRB = W + 'criblage/resultat.json';
const PLAN = '7d25ea8442b9dd06', APERCU_SHA = 'f12f3cc5f8c80aba46aa94670f8aaedd06843e253e8328dc9bd52a1bb8815470', MARQUEUR = '0e9d7a7423b2ef14', MARQUEUR0 = '5018d82d05d382aa', PLAN_APRES = PLAN;
const MAN_SHA = '2c74018e3b04c06395298e2452d039de409353aae8a62d5d7d99cf43e01f78e3', RAP_SHA = '85faf16c39db3e262524bb98b6fa8e6f60afe97a37d694e8119d7a5138933e88', GEN_SHA = 'd40aea3cc3e7916d1194b143563292c8e0bb8cba95f7da02c18332beb5ecfaac', CRB_SHA = 'aef9e029f25c17d36200587d5f7cee01035444868f54c453f30d19b6bff0060d';
const ETAT0 = 'c3d5294ce301189aa72d59f97a884ad951d6ae99aa3d9c930a170c35f3aa924e', ROAD0 = 'ff396316ceb858c33a412d6e71f48a4628fb6c8d1f75a09cb2b0d953c86f43fe';
const REMPLACEMENTS = [ // les deux changements autorisés, chacun présent une fois par document
  ['a2-05:etat:debut empreinte=' + MARQUEUR0, 'a2-05:etat:debut empreinte=' + MARQUEUR],
  ['manifeste d\'empreintes, 43 rapports arbitrés identiques.', 'manifeste d\'empreintes, 44 rapports arbitrés identiques.'],
];
const BLOC = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const trace = []; let ecrit = false;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
// Arrêt au premier écart ; après écriture, la trace est conservée et l'état atteint n'est pas réparé
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (b) return; dire('ARRÊT : premier écart, ' + (ecrit ? 'état atteint conservé, aucune réparation' : 'avant écriture des documents')); if (ecrit) { mkdirSync(join(root, SOR), { recursive: true }); writeFileSync(join(root, SOR, 'application-O3.txt'), trace.join('\n') + '\n'); } process.exit(1); };
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const fin = (r) => r.out.split('\n').pop();
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
const etat = () => { const r = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }); return (r.stdout ?? '').trim(); };
const ETAT_ATTENDU = '{"arbitres":336,"restants":41,"proposes":0,"corrections":197,"entry":172,"libre":"V1-25","reserves":["V1-22","V1-23"]}';
const instantane = () => { const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || [DEP, SOR].some((x) => (p + '/').startsWith(x))) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } }; m(''); return h; };
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim();
const horsBloc = (t) => t.replace(BLOC, '');
const man = JSON.parse(lire(MAN)).empreintes; const cles = Object.keys(man);

// (1) Préconditions
dire('--- Préconditions');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P1 index vide');
ok(!existsSync(join(root, DEP)), 'P2 sauvegarde absente');
ok(shaF(MAN) === MAN_SHA && cles.length === 44 && cles.every((p) => shaF(p) === man[p]), 'P3 manifeste à son empreinte relue ; 44 empreintes recalculées, toutes conformes', MAN_SHA);
const m43 = JSON.parse(readFileSync(join(root, MAN43), 'utf8')).empreintes; const c43 = Object.keys(m43);
ok(c43.length === 43 && c43.every((k, i) => cles[i] === k && man[k] === m43[k]), 'P4 les 43 entrées historiques inchangées, en valeur et en ordre');
ok(cles[43] === RAP && man[RAP] === RAP_SHA, 'P5 périmètre accepté de T9 en 44e position', RAP_SHA);
ok(shaF(GEN) === GEN_SHA && shaF(CRB) === CRB_SHA, 'P6 générateur et criblage inchangés ; correction RES non appliquée');
ok(shaF(ETAT) === ETAT0 && shaF(ROAD) === ROAD0, 'P7 documents de pilotage à leur empreinte d\'après O1', ETAT0.slice(0, 12) + '… ; ' + ROAD0.slice(0, 12) + '…');
const ap0 = lancer(W + 'sync-stable.mjs', '--apercu'); const plan0 = (ap0.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
ok(ap0.code === 0 && plan0 === PLAN, 'P8 aperçu relancé sur le dépôt réel : plan exigé', plan0 + ' ; ' + fin(ap0));
ok(shaF(APERCU) === APERCU_SHA, 'P9 empreinte complète de l\'aperçu exigée', shaF(APERCU));
ok(existsSync(join(root, RELU)) && Buffer.compare(readFileSync(join(root, APERCU)), readFileSync(join(root, RELU))) === 0, 'P10 diff régénéré = diff relu, octet pour octet', RELU);
for (const p of [ETAT, ROAD]) { const t = lire(p); ok(t.split('a2-05:etat:debut').length === 2 && REMPLACEMENTS.every(([a]) => t.split(a).length === 2), 'P11 ' + p + ' : bloc de départ, deux textes à remplacer, chacun une fois', MARQUEUR0); }
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P12 relais de départ : 30 sur 30', fin(rel0));
ok(!zones(), 'P13 zones data, reconstruction, tests, tools, docs/conception sans modification');
const arbre0 = instantane();

// (2) et (3)
dire('--- Sauvegarde et synchronisation');
mkdirSync(join(root, DEP), { recursive: true }); mkdirSync(join(root, SOR), { recursive: true });
for (const p of [ETAT, ROAD]) { copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === shaF(p), 'sauvegardé : ' + p, shaF(p)); }
ecrit = true;
const app = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', PLAN);
ok(app.code === 0, 'synchronisation, une fois', 'code ' + app.code + ' ; ' + fin(app));

// (4) Contrôles
dire('--- Contrôles après O3');
const bE = lire(ETAT).match(BLOC)?.[0].replace(/\r\n/g, '\n'), bR = lire(ROAD).match(BLOC)?.[0].replace(/\r\n/g, '\n');
ok(bE && bE === bR && bE.includes('empreinte=' + MARQUEUR) && lire(ETAT).split('a2-05:etat:debut').length === 2 && lire(ROAD).split('a2-05:etat:debut').length === 2, 'C1 les deux blocs identiques, marqueur attendu', MARQUEUR);
for (const p of [ETAT, ROAD]) { const d = readFileSync(join(root, DEP + p), 'utf8'); ok(lire(p) === REMPLACEMENTS.reduce((t, [a, n]) => t.replace(a, n), d), 'C2 ' + p + ' : sauvegarde + les deux remplacements, octet pour octet'); ok(horsBloc(lire(p)) === horsBloc(d), 'C2 ' + p + ' : hors du bloc, identique octet pour octet', shaF(p)); }
ok(/336 sens arbitrés sur 377 ; 41 restent \(0 proposés\)/.test(bE), 'C2 ligne de couverture inchangée : 336/377, 41 restants');
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); ok(ap1.code === 0 && !changees(lire(APERCU)).length && (ap1.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] === PLAN_APRES, 'C3 aperçu suivant vide', fin(ap1));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 44 rapports contrôlés, identiques$/.test(emp.out) && shaF(MAN) === MAN_SHA, 'C4 manifeste : 44 empreintes conformes, inchangé', emp.out.slice(0, 80));
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C5 relais : 30 sur 30', fin(rel));
const r9 = lancer(REC); const n9 = r9.out.split('\n').filter((l) => l.startsWith('conforme ')).length; ok(r9.code === 0 && n9 === 33, 'C6 recalcul de T9 : 33 contrôles conformes', n9 + ' ; code ' + r9.code);
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'C6 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /336 arbitrés, 0 proposés, 41 restants, sur 377/.test(cov.out), 'C7 couverture : 336/377, 41 restants', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C8 197 corrections dans 172 ENTRY ; V1-22 et V1-23 réservés ; V1-25 libre', etat());
ok((lire(BIL).match(/^\| V1-24 \|/gm) ?? []).length === 1, 'C9 V1-24 retenue, une ligne de correction');
const pasBon = JSON.parse(lire('data/n5/vocab.json')).find((e) => e.id === 'v_427').senses[0].meaning.alternatives; ok(JSON.stringify(pasBon) === '["Pas bon"]', 'C10 aucune correction appliquée : `v_427_s1` publie toujours « Pas bon »');
ok(shaF(GEN) === GEN_SHA && shaF(CRB) === CRB_SHA, 'C11 générateur et criblage inchangés ; correction RES non appliquée');
const arbre1 = instantane(); const mod = [...new Set([...Object.keys(arbre0), ...Object.keys(arbre1)])].filter((p) => arbre0[p] !== arbre1[p]).sort();
ok(JSON.stringify(mod) === JSON.stringify([ETAT, ROAD].sort()) && !zones(), 'C12 arbre entier comparé : les deux documents seuls ; zones protégées, normes, données publiées et registre intacts', Object.keys(arbre1).length + ' fichiers');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C13 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C14 git diff --check', 'code ' + dc.status);
writeFileSync(join(root, SOR, 'application-O3.txt'), trace.join('\n') + '\nO3 conforme\n');
console.log('O3 conforme');
process.exit(0);
