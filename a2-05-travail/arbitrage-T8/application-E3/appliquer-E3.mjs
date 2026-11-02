// A2-05 · T8 : état E3 (autorisée le 2026-10-31) : synchronisation des blocs a2-05:etat au plan relu, une seule fois.
// Usage : node a2-05-travail/arbitrage-T8/application-E3/appliquer-E3.mjs <racine du dépôt>
// (1) Préconditions, sans écriture, dont l'aperçu relancé, identique octet pour octet à l'aperçu relu. (2) ETAT-ACTUEL.md et ROADMAP.md sauvegardés.
// (3) sync-stable --appliquer, une fois. (4) Contrôles. Arrêt au premier groupe en écart ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T = W + 'arbitrage-T8/', B = T + 'application-E3/', DEP = B + 'depart/', SOR = B + 'sorties/';
const MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md';
const PLAN = '89f690215382c8a7', APERCU_SHA = '8057ea52a70a9c4325f768454ed40e86b6567fe64308d8a24f351b2d926c363a', MARQUEUR = '43ab94fc376f9fa1', MARQUEUR0 = '91a1ad1b112928af';
const MAN_SHA = 'c4d49fa6fd5feaac4653d5079ec8eb5cedd71fab89dd975437c1d662d32e6b0f', MAN41 = T + 'application-E2/depart/empreintes-rapports-arbitres.json', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md';
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
const etat = () => { const r = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }); return (r.stdout ?? '').trim(); };
const ETAT_ATTENDU = '{"arbitres":320,"restants":57,"proposes":0,"corrections":197,"entry":172,"libre":"V1-25","reserves":["V1-22","V1-23"]}';
const man = JSON.parse(lire(MAN)).empreintes; const cles = Object.keys(man);
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => 'reconstruction/a2-04/lots/' + f);
const PROTEGES = [MAN, ...cles, ...lots, 'reconstruction/a2-04/journal.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', W + 'registre-tranches.json', 'docs/rapports/etape2-A2-05-bilan-volet2.md', T + 'proposition-T8-perimetre.md', W + 'INVENTAIRE-SCRIPTS.md'];
const temoin = Object.fromEntries(PROTEGES.map((p) => [p, shaF(p)]));
const horsBloc = (t) => t.replace(BLOC, '');

// (1) Préconditions
dire('--- Préconditions');
const m41 = JSON.parse(readFileSync(join(root, MAN41), 'utf8')).empreintes; const c41 = Object.keys(m41);
ok(shaF(MAN) === MAN_SHA && cles.length === 42 && cles.every((p) => shaF(p) === man[p]), 'P1 manifeste à son empreinte relue ; 42 empreintes recalculées, conformes', MAN_SHA.slice(0, 12) + '…');
ok(c41.length === 41 && c41.every((k, i) => cles[i] === k && man[k] === m41[k]) && cles[41] === RAP, 'P2 les 41 premières intactes, dans leur ordre ; périmètre de T8 en 42e');
const ap0 = lancer(W + 'sync-stable.mjs', '--apercu'); const plan0 = (ap0.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
ok(ap0.code === 0 && plan0 === PLAN, 'P3 aperçu relancé sur le dépôt réel : plan relu', plan0 + ' ; ' + fin(ap0));
ok(shaF(APERCU) === APERCU_SHA, 'P4 aperçu identique, octet pour octet, à l\'aperçu relu', shaF(APERCU).slice(0, 12) + '…');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P5 index vide');
ok(!existsSync(join(root, DEP)), 'P6 sauvegarde absente');
for (const p of [ETAT, ROAD]) ok(lire(p).includes('a2-05:etat:debut empreinte=' + MARQUEUR0), 'P7 ' + p + ' : marqueur de départ', MARQUEUR0);
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P8 relais de départ : 30 sur 30', fin(rel0));
arretSi('avant écriture : aucun fichier modifié');

// (2) et (3)
dire('--- Sauvegarde et synchronisation');
mkdirSync(join(root, DEP), { recursive: true }); mkdirSync(join(root, SOR), { recursive: true });
for (const p of [ETAT, ROAD]) { copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === shaF(p), 'sauvegardé : ' + p); }
arretSi('sauvegarde incomplète : aucun document modifié');
const app = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', PLAN);
ok(app.code === 0, 'synchronisation, une fois', 'code ' + app.code + ' ; ' + fin(app));
arretSi('état atteint conservé, aucune réparation');

// (4) Contrôles
dire('--- Contrôles après E3');
const bE = lire(ETAT).match(BLOC)?.[0].replace(/\r\n/g, '\n'), bR = lire(ROAD).match(BLOC)?.[0].replace(/\r\n/g, '\n');
ok(bE && bE === bR && bE.includes('empreinte=' + MARQUEUR) && lire(ETAT).split('a2-05:etat:debut').length === 2 && lire(ROAD).split('a2-05:etat:debut').length === 2, 'C1 les deux blocs identiques, marqueur attendu', MARQUEUR);
for (const p of [ETAT, ROAD]) ok(horsBloc(lire(p)) === horsBloc(readFileSync(join(root, DEP + p), 'utf8')), 'C2 ' + p + ' : hors du bloc, identique octet pour octet');
for (const p of [ETAT, ROAD]) { const avantB = readFileSync(join(root, DEP + p), 'utf8').match(BLOC)[0]; const attendu = avantB.replace('empreinte=' + MARQUEUR0, 'empreinte=' + MARQUEUR).replace('41 rapports arbitrés identiques', '42 rapports arbitrés identiques'); ok(lire(p).match(BLOC)[0] === attendu && attendu !== avantB, 'C2 bis ' + p + ' : dans le bloc, marqueur et compteur seuls'); }
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); const ch = readFileSync(join(root, APERCU), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
ok(ap1.code === 0 && !ch.length, 'C3 aperçu suivant vide', fin(ap1));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 42 rapports contrôlés, identiques$/.test(emp.out), 'C4 manifeste : 42 empreintes conformes', emp.out);
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C5 relais : 30 sur 30', fin(rel));
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'C6 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /320 arbitrés, 0 proposés, 57 restants, sur 377/.test(cov.out), 'C7 couverture : 320/377, 57 restants', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C8 197 corrections dans 172 ENTRY ; V1-22 et V1-23 réservés ; V1-25 libre', etat());
const bil = lire('docs/rapports/etape2-A2-05-bilan-volet2.md'); ok((bil.match(/^\| V1-24 \|/gm) ?? []).length === 1, 'C9 V1-24 retenue, une ligne de correction');
const pasBon = JSON.parse(lire('data/n5/vocab.json')).find((e) => e.id === 'v_427').senses[0].meaning.alternatives; ok(JSON.stringify(pasBon) === '["Pas bon"]', 'C10 zéro correction appliquée : `v_427_s1` publie toujours « Pas bon »');
const mod = PROTEGES.filter((p) => shaF(p) !== temoin[p]); ok(!mod.length, 'C11 zones protégées et historique documentaire intacts', mod.join(', ') || PROTEGES.length + ' fichiers');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C12 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C13 git diff --check', 'code ' + dc.status);
writeFileSync(join(root, SOR, 'application-E3.txt'), trace.join('\n') + '\n' + (ko ? ko + ' écart(s)\n' : 'E3 conforme\n'));
console.log(ko ? ko + ' écart(s) : arrêt, état atteint conservé' : 'E3 conforme');
process.exit(ko ? 1 : 0);
