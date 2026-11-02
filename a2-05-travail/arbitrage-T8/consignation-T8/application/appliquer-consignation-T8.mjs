// A2-05 · T8 : application de la consignation des opérations E1, E2 et E3 (autorisée le 2026-10-31) : quatre diffs relus, appliqués par remplacements ciblés.
// L'audit de T8 n'est pas ouvert. Usage : node a2-05-travail/arbitrage-T8/consignation-T8/application/appliquer-consignation-T8.mjs <racine du dépôt>
// (1) Préconditions, sans écriture : empreintes de départ, versions proposées, diffs relus ; diffs régénérés identiques ; chaque hunk à ancre unique ; ajouts
// absents ; 42 empreintes ; aperçu vide ; relais 30 sur 30 ; index vide. (2) Quatre originaux sauvegardés. (3) Hunks appliqués par remplacements ciblés ;
// résultat égal à la version relue. (4) Contrôles. Arrêt au premier groupe en écart ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', C8 = W +'arbitrage-T8/consignation-T8/', A = C8 + 'application/', DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md';
const MARQUEUR = '43ab94fc376f9fa1', PLAN_APRES = 'a861f4c6880caf38', MAN_SHA = 'c4d49fa6fd5feaac4653d5079ec8eb5cedd71fab89dd975437c1d662d32e6b0f';
const D = [ // cible, départ, proposé, diff relu
  [BIL, '02f39e124f9a923890cc167b2788b7ba5f4679204461978f0f4cf064d83ac349', '0c43ee77eb1e0e2e429415e1468acd649877d13002ab8a6c2b1776da0ebecb53', 'e67938f1064d1811b22a54c9ecdf45e4fcba8684d8d996e25ac8da6687898963'],
  [ETAT, '1a536449dcfc9015d93a9878d03b84d3cd3be27880b49abd84a290c429f627e9', 'eca0572e019d68556859f162dfed12c150253cc606433c4388f37c2cee005c68', '07b07c0d9db58e2acb7d900682b2c3f53f9131956ec620879937fa5b3169a68a'],
  [ROAD, '4344d31e882f42146f5117ce395763ed48542e06db7617be383c9776e75e37d0', 'd60ab2fff069fc61996e39929ce7c8479fdb63dcef73bd808bfb84e23cb3fd0d', '4891564bded7a6f1622790f736da610a936bf59a01523a6efbfc5e76c801998a'],
  [INV, '5c7f3ac396108ec2221563bac5f6d3de353142929e899d9d1f6988ed352efea9', '511b338761e12a03d914bac1ac279d0b0d433667c45d0835928b722bbee0bc60', 'd67801b9b3212721e41f260fb44412878a843aa651769d8dc9a1b3abbfca7e4b'],
];
const nom = (p) => p.split('/').pop();
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
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
const apercuVide = () => { const r = lancer(W + 'sync-stable.mjs', '--apercu'); return { r, vide: r.code === 0 && !changees(lire(APERCU)).length, plan: (r.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] }; };
// Hunks d'un diff : ancien et nouveau blocs, lignes de contexte comprises, fins de ligne conservées
const hunks = (diff) => { const H = []; let h = null; for (const l of diff.split('\n')) { if (l.startsWith('@@')) { h = { a: [], b: [] }; H.push(h); continue; } if (!h || l.startsWith('\\')) continue; if (l[0] === ' ' || l === '') { if (l === '') continue; h.a.push(l.slice(1)); h.b.push(l.slice(1)); } else if (l[0] === '-') h.a.push(l.slice(1)); else if (l[0] === '+') h.b.push(l.slice(1)); } return H.map((x) => ({ a: x.a.join('\n'), b: x.b.join('\n') })); };
// Les diffs sont normalisés en LF par git (core.autocrlf) : ancres cherchées sur le texte en LF, fins de ligne du document rétablies ensuite
const LFs = (t) => t.replace(/\r\n/g, '\n');
const appliquerHunks = (t0, H) => { const crlf = t0.includes('\r\n'); let t = LFs(t0); for (const { a, b } of H) { if (!a) throw new Error('hunk sans ancre'); if (t.split(a).length !== 2) throw new Error('ancre non unique'); t = t.replace(a, () => b); } return crlf ? t.replace(/\n/g, '\r\n') : t; };
const man = JSON.parse(lire(MAN)).empreintes; const cles = Object.keys(man);
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => 'reconstruction/a2-04/lots/' + f);
const PROTEGES = [MAN, ...cles, ...lots, 'reconstruction/a2-04/journal.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', W + 'registre-tranches.json', W + 'recalcul-T7-perimetre.mjs', W + 'recalcul-T8-perimetre.mjs', W + 'controle-bilan-pilote.mjs', W + 'sync-stable.mjs', W + 'lot3-commun-v2.mjs'];
const temoin = Object.fromEntries(PROTEGES.map((p) => [p, shaF(p)]));
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim();

// (1) Préconditions
dire('--- Préconditions');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P1 index vide');
ok(!existsSync(join(root, DEP)), 'P2 sauvegarde absente');
const H = {};
for (const [p, d, v, h] of D) {
  const prop = C8 + nom(p);
  ok(shaF(p) === d, 'P3 empreinte de départ : ' + p, shaF(p).slice(0, 12) + '…');
  ok(shaF(prop) === v, 'P4 version proposée : ' + nom(p), shaF(prop).slice(0, 12) + '…');
  const r = git('diff', '--no-index', '--no-color', '--', p, prop);
  ok(r.status === 1 && sha(r.stdout) === h && shaF(C8 + 'diffs/' + nom(p) + '.diff') === h, 'P5 diff relu et diff régénéré identiques : ' + nom(p), sha(r.stdout).slice(0, 12) + '…');
  H[p] = hunks(readFileSync(join(root, C8 + 'diffs/' + nom(p) + '.diff'), 'utf8'));
  const t = LFs(lire(p)); ok(H[p].length > 0 && H[p].every(({ a }) => a && t.split(a).length === 2), 'P6 ancres uniques, à leur place : ' + nom(p), H[p].length + ' hunk(s)');
}
ok(!/^### 8\.107 /m.test(lire(BIL)), 'P7 ajout absent : §8.107');
ok(!lire(INV).includes('| `arbitrage-T8/application-E1/appliquer-E1.mjs` |'), 'P7 ajout absent : lignes de l\'inventaire');
ok(!lire(ETAT).includes('**Consolidation du périmètre de T8 appliquée en trois états'), 'P7 ajout absent : ligne de journal');
ok(shaF(MAN) === MAN_SHA && cles.length === 42 && cles.every((p) => shaF(p) === man[p]), 'P8 manifeste : 42 empreintes conformes');
const ap0 = apercuVide(); ok(ap0.vide, 'P9 aperçu de synchronisation vide', fin(ap0.r));
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P10 relais de départ', fin(rel0));
const avant = Object.fromEntries(D.map(([p]) => [p, lire(p)]));
const blocs0 = [ETAT, ROAD].map((p) => lire(p).match(BLOC)[0]);
arretSi('avant écriture : aucun fichier modifié');

// (2) Sauvegarde, (3) application
dire('--- Sauvegarde et application');
for (const [p] of D) { mkdirSync(dirname(join(root, DEP + p)), { recursive: true }); copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === shaF(p), 'original sauvegardé : ' + nom(p)); }
arretSi('sauvegarde incomplète : aucun document modifié');
// Résultat calculé pour les quatre avant d'en écrire un seul
const sorties = {}; for (const [p, , v] of D) { const t = appliquerHunks(avant[p], H[p]); sorties[p] = t; ok(sha(Buffer.from(t, 'utf8')) === v, 'résultat des hunks = version relue : ' + nom(p), v.slice(0, 12) + '…'); }
arretSi('aucun document modifié');
for (const [p] of D) { writeFileSync(join(root, p), sorties[p]); ok(true, 'écrit : ' + p); }

// (4) Contrôles
dire('--- Contrôles après application');
mkdirSync(join(root, SOR), { recursive: true }); mkdirSync(join(root, REELS), { recursive: true });
for (const [p, , v] of D) {
  ok(shaF(p) === v, 'C1 document identique à la version approuvée : ' + nom(p), v.slice(0, 12) + '…');
  const r = git('diff', '--no-index', '--no-color', '--', DEP + p, p); writeFileSync(join(root, REELS, nom(p) + '.diff'), r.stdout);
  const relu = readFileSync(join(root, C8 + 'diffs/' + nom(p) + '.diff'), 'utf8');
  ok(r.status === 1 && JSON.stringify(changees(r.stdout)) === JSON.stringify(changees(relu)), 'C2 diff réel identique au diff relu (lignes +/−) : ' + nom(p), changees(r.stdout).length + ' lignes');
}
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**'));
ok(pa(lire(ETAT)) === pa(lire(ROAD)) && pa(lire(ETAT)).startsWith("- **Prochaine action.** L'audit individuel des 16 sens de T8"), 'C3 « Prochaine action » identique dans les deux documents');
const plusE = changees(readFileSync(join(root, REELS, nom(ETAT) + '.diff'), 'utf8')).filter((l) => l.startsWith('+')), plusR = changees(readFileSync(join(root, REELS, nom(ROAD) + '.diff'), 'utf8')).filter((l) => l.startsWith('+'));
ok(plusR.length === 2 && plusR.every((l) => plusE.includes(l)) && plusE.length === 3, 'C3 rubriques communes identiques ; ETAT-ACTUEL.md n\'ajoute que la ligne de journal');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(avant[ETAT]), j1 = jr(lire(ETAT));
ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'C4 journal antérieur conservé, une seule ligne ajoutée', j1.length + ' lignes');
const b0 = avant[BIL].replace(/(\r?\n)+$/, ''), b1 = lire(BIL); const reste = b1.slice(b0.length);
ok(b1.startsWith(b0) && /^\s*### 8\.107 /.test(reste) && reste.split('### 8.').length === 2, 'C5 §8.106 et bilan antérieur inchangés, §8.107 seul ajouté');
ok([ETAT, ROAD].every((p, i) => lire(p).match(BLOC)[0] === blocs0[i] && blocs0[i].includes('empreinte=' + MARQUEUR)), 'C6 blocs a2-05:etat inchangés, au marqueur attendu', MARQUEUR);
const ap1 = apercuVide(); ok(ap1.vide && ap1.plan === PLAN_APRES, 'C7 aperçu suivant vide', fin(ap1.r));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 42 rapports contrôlés, identiques$/.test(emp.out), 'C8 manifeste : 42 empreintes conformes', emp.out);
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C9 relais : 30 sur 30', fin(rel));
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'C10 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /320 arbitrés, 0 proposés, 57 restants, sur 377/.test(cov.out), 'C11 couverture : 320/377, 57 restants', cov.out.slice(0, 70));
const et = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(v.corrections,v.entry,v.libre,v.reserves.join())"], { cwd: root, encoding: 'utf8' });
ok(et.stdout.trim() === '197 172 V1-25 V1-22,V1-23', 'C12 197 corrections dans 172 ENTRY ; V1-22 et V1-23 réservés ; V1-25 libre', et.stdout.trim());
ok((lire(BIL).match(/^\| V1-24 \|/gm) ?? []).length === 1, 'C13 V1-24 retenue, une ligne de correction');
const pasBon = JSON.parse(lire('data/n5/vocab.json')).find((e) => e.id === 'v_427').senses[0].meaning.alternatives; ok(JSON.stringify(pasBon) === '["Pas bon"]', 'C14 aucune correction appliquée : `v_427_s1` publie toujours « Pas bon »');
const mod = PROTEGES.filter((p) => shaF(p) !== temoin[p]); ok(!mod.length && !zones(), 'C15 documents protégés, normes, données, journal, lots et registre intacts', mod.join(', ') || PROTEGES.length + ' fichiers ; zones git sans modification');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C16 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C17 git diff --check', 'code ' + dc.status);
writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n' + (ko ? ko + ' écart(s)\n' : 'consignation de T8 conforme\n'));
console.log(ko ? ko + ' écart(s) : arrêt, état atteint conservé, aucune réparation' : 'consignation de T8 conforme');
process.exit(ko ? 1 : 0);
