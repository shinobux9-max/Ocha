// A2-05 · bloc F : application de l'inscription du périmètre opérationnel accepté et de la consignation §8.119. PRÉPARÉ, à ne lancer que sur autorisation distincte.
// Dix écritures, chacune égale à la version proposée relue (proposition/manifeste.json) ; rien d'autre. Arrêt au premier écart ; aucune réparation automatique ;
// n'indexe, ne committe et ne pousse rien. C9b reste le seul écart attendu du relais tant que l'installation d'A10 n'est pas committée.
// Usage : node a2-05-travail/arbitrage-F/inscription-F/application/appliquer-inscription-F.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { diffBrut } from '../../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', I = W + 'arbitrage-F/inscription-F/', PROP = I + 'proposition/', A = I + 'application/', DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/';
const MANIF = PROP + 'manifeste.json', MANIF_SHA = 'd10f544a1dfcab6ed59b7c8e4fe7ec038f06383145183fbf8ebda23de0c63030', APERCU = W + 'sync-stable-apercu.md';
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', ETAT_ATTENDU = '{"arbitres":360,"restants":17,"proposes":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"]}';
const CTRL = W + 'controle-relais-allege.mjs', CPO = W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs';
const PRESERVES = { 'CLAUDE.md': 'c5fa224bad1ea3ff042844ffdf6c5fc5898ae98e7f06a0b91f24d5ab30d78a04', 'docs/conception/addendum-A10-interrogatif.md': '5c62ac323364c855e112fb1452050b5cb84563a4086cd15e25ea6de26ccbd041',
  'docs/conception/00-sommaire.md': '2c9e2cfff2d7c5d175dcbc6cf99c853f771b993ef4e54ccd764be52b56b728fb', '.gitattributes': '5710749f06c7aff2d451c24c2847ec48a96567cc13dda68045f2b0da918e3c02',
  'docs/relecture/reprise-A2-05.md': 'c3bdc60ae05398bafa783ef4931a295be79d0defb4798a9f370d87f2c36b0b55', 'a2-05-travail/versions-finales-2/manifeste.json': '2a36c47dfe94fae615b7202ebe9682a2520566841df521c06dcc2bd5c0a228d3' };

const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent'); const lire = (p) => readFileSync(join(root, p), 'utf8');
const trace = []; let ecrit = false; const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (b) return; dire('ARRÊT : premier écart, ' + (ecrit ? 'état atteint conservé, aucune réparation' : 'avant écriture')); if (ecrit) { mkdirSync(join(root, SOR), { recursive: true }); writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n'); } process.exit(1); };
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const relais = (...o) => { const r = lancer(CTRL, '--apres-application', ...o); const L = r.out.split('\n'); return { code: r.code, fin: L.at(-1), ids: L.map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join(), c5c: L.some((l) => /^conforme C5c /.test(l)), q7: (L.find((l) => / Q7 /.test(l)) ?? '').trim() }; };
// Zones protégées : seuls le sommaire et A10 (installation non committée) y sont modifiés
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.split('\n').filter((l) => l.trim() && !/docs\/conception\/(00-sommaire|addendum-A10-interrogatif)\.md$/.test(l)).join(', ');
const instantane = () => { const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || [DEP, SOR, REELS].some((x) => (p + '/').startsWith(x))) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } }; m(''); return h; };
const RECS = [5, 6, 7, 8, 9].map((n) => ['recalcul de T' + n, W + 'recalcul-T' + n + '-perimetre.mjs']).concat([['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]);
const etat = () => (spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }).stdout ?? '').trim();
const apercuVide = () => (spawnSync(process.execPath, ['--input-type=module', '-e', "import {planifier} from './a2-05-travail/sync-stable.mjs'; const p=planifier('.'); console.log(Object.values(p.sorties).every((s)=>s.apres===s.avant)?'vide':'non vide')"], { cwd: root, encoding: 'utf8' }).stdout ?? '').trim();

dire('--- Préconditions');
ok(git('merge-base', '--is-ancestor', CLOTURE, 'HEAD').status === 0, 'P1 HEAD descend du commit de clôture', CLOTURE.slice(0, 7));
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P2 index vide');
ok(!existsSync(join(root, DEP)), 'P3 sauvegarde absente, opération jamais lancée');
ok(shaF(MANIF) === MANIF_SHA, 'P4 manifeste de la proposition relue', MANIF_SHA.slice(0, 16));
const M = JSON.parse(lire(MANIF)); const CIBLES = Object.keys(M).sort(); ok(CIBLES.length === 10, 'P5 dix fichiers visés', String(CIBLES.length));
for (const p of CIBLES) {
  ok(shaF(p) === M[p].depart, 'P6 empreinte de départ : ' + p, M[p].depart.slice(0, 16));
  ok(shaF(PROP + p) === M[p].propose, 'P7 version proposée relue : ' + p, M[p].propose.slice(0, 16));
  const d = diffBrut(root, p, PROP + p); ok(d.status === 1 && sha(d.stdout) === M[p].diff && shaF(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff') === M[p].diff, 'P8 diff régénéré = diff relu : ' + p);
}
for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'P9 préservé : ' + p);
ok(existsSync(join(root, W + 'audit-F/dossier-F.md')), 'P10 dossier d\'audit présent');
ok(!zones(), 'P11 données, lots, journal, tests, outils et normes sans modification, hors sommaire et A10', zones());
const r0 = relais(); ok(r0.code === 1 && r0.fin === '29 conformes sur 30' && r0.ids === 'C9b' && r0.c5c, 'P12 relais de départ : 29 sur 30, C9b seul, C5c conforme (F suspendue)', r0.fin + ' ; écarts : ' + r0.ids);
const emp0 = lancer(W + 'empreintes-lot3.mjs'); ok(emp0.code === 0 && /^empreintes : 45 rapports contrôlés, identiques/.test(emp0.out), 'P13 45 empreintes conformes');
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'P14 ' + n, 'code ' + r.code); }
const arbre0 = instantane();

dire('--- Sauvegarde et application');
for (const p of CIBLES) { mkdirSync(dirname(join(root, DEP + p)), { recursive: true }); copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === M[p].depart, 'original sauvegardé : ' + p); }
ecrit = true;
for (const p of CIBLES) { copyFileSync(join(root, PROP + p), join(root, p)); ok(shaF(p) === M[p].propose, 'écrit : ' + p, M[p].propose.slice(0, 16)); }

dire('--- Contrôles après application');
mkdirSync(join(root, REELS), { recursive: true }); mkdirSync(join(root, SOR), { recursive: true });
for (const p of CIBLES) { const r = diffBrut(root, DEP + p, p); writeFileSync(join(root, REELS, p.replaceAll('/', '__') + '.diff'), r.stdout); ok(r.status === 1, 'C1 diff réel écrit : ' + p); }
const rel = relais(); ok(rel.code === 1 && rel.fin === '29 conformes sur 30' && rel.ids === 'C9b' && rel.c5c, 'C2 relais : 29 sur 30, C9b seul ; C5c conforme (F planifiée, périmètre accepté)', rel.fin + ' ; écarts : ' + rel.ids);
ok(/juste Q7 E5 est-il normatif \? → oui/.test(rel.q7), 'C3 Q7 : statut normatif d\'A10 constaté', rel.q7);
const st = relais('--strict'); ok(st.ids === (git('rev-parse', 'HEAD').stdout.trim() === CLOTURE ? 'C9b' : 'C5a,C9b'), 'C4 relais --strict : écarts attendus seuls', st.fin + ' ; écarts : ' + st.ids);
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'C5 ' + n, 'code ' + r.code); }
const cpo = lancer(CPO, '--sabotages'); ok(cpo.code === 0 && /\n29 conformes sur 29\n/.test(cpo.out) && /17 sabotages détectés sur 17/.test(cpo.out), 'C6 contrôle du périmètre opérationnel (état accepté) : 29 sur 29, 17 sabotages sur 17');
ok(apercuVide() === 'vide', 'C7 synchronisation stable : aperçu vide, blocs a2-05:etat à jour');
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 45 rapports contrôlés, identiques/.test(emp.out), 'C8 manifeste des rapports : 45 empreintes, rapport accepté hors manifeste');
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(cov.out), 'C9 couverture : 360/377', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C10 204 corrections dans 177 ENTRY, aucune appliquée', etat());
for (const a of ['assemble', 'verify']) { const r = spawnSync(process.execPath, [join(root, 'tools/reconstruction/run.mjs'), a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(r.status === 0, 'C11 run.mjs ' + a, 'code ' + r.status); }
const t = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); const n = (k) => ((t.stdout ?? '').match(new RegExp('^. ' + k + ' (\\d+)$', 'm')) ?? [])[1]; ok(t.status === 0 && n('tests') === '510' && n('pass') === '510', 'C12 510 tests', 'code ' + t.status + ' ; ' + n('pass') + ' sur ' + n('tests'));
const arbre1 = instantane(); const mod = [...new Set([...Object.keys(arbre0), ...Object.keys(arbre1)])].filter((p) => arbre0[p] !== arbre1[p]).sort();
ok(JSON.stringify(mod) === JSON.stringify(CIBLES), 'C13 arbre entier comparé : les dix fichiers visés seuls', mod.length + ' modifiés ; ' + Object.keys(arbre1).length + ' fichiers');
for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'C14 préservé : ' + p);
ok(!zones(), 'C15 zones protégées inchangées', zones());
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C16 index vide');
const dk = git('diff', '--check'); ok(dk.status === 0, 'C17 git diff --check', 'code ' + dk.status);
const FIN = 'inscription du périmètre F et consignation §8.119 appliquées ; relais à 29 sur 30, C9b seul, jusqu\'au prochain commit';
writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n' + FIN + '\n'); console.log(FIN);
process.exit(0);
