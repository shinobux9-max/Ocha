// A2-05 : mise en service coordonnée de la version figée 2 du relais et du contrôle adapté. PRÉPARÉ, à ne lancer que sur autorisation distincte.
// Deux écritures : `docs/relecture/reprise-A2-05.md` (version finale 2) et `a2-05-travail/controle-relais-allege.mjs` (contrôle proposé). Rien d'autre :
// versions figées 1 et 2, candidat, `CLAUDE.md`, normes, données, pilotage et manifeste des rapports inchangés. Arrêt au premier écart ; aucune réparation
// automatique ; n'indexe, ne committe et ne pousse rien. C9b reste le seul écart attendu tant que l'installation d'A10 n'est pas committée.
// Usage : node a2-05-travail/versions-finales-2/application/appliquer.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { diffBrut } from '../../arbitrage-F/moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', V1 = W + 'versions-finales/', V2 = W + 'versions-finales-2/', A = V2 + 'application/', DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/';
const REL = 'docs/relecture/reprise-A2-05.md', CTRL = W + 'controle-relais-allege.mjs', PROP = V2 + 'proposition/controle-relais-allege.mjs', APERCU = W + 'sync-stable-apercu.md', MAN = W + 'empreintes-rapports-arbitres.json';
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', ETAT_ATTENDU = '{"arbitres":360,"restants":17,"proposes":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"]}';
// Empreintes relues : versions figées 1 et 2, générateur, proposition et diffs
const FIGES = {
  [V2 + 'manifeste.json']: '2a36c47dfe94fae615b7202ebe9682a2520566841df521c06dcc2bd5c0a228d3', [V2 + 'generer.mjs']: 'b4003e54f8b4cca29163fc6c4fd9b57f94b1379b3e58fb5314d69677ae16a0bd',
  [V2 + 'depart/' + REL]: 'd0586d42795b00fb5360de4f91585e3ea65dc91355cf92e9e9faca28b2061344', [V2 + REL]: 'c3bdc60ae05398bafa783ef4931a295be79d0defb4798a9f370d87f2c36b0b55',
  [V2 + 'diffs/docs__relecture__reprise-A2-05.md.diff']: 'a04c1bbf729f9895eaa503a06dbe1d1600413fce1e04046a648350068e2192b2',
  [PROP]: 'ba0714432d2ef03a0f002d2ab6271ca853c5857582d0bc91e020dcb6affb7ac3', [V2 + 'proposition/diffs/controle-relais-allege.mjs.diff']: '47cf572e05e5aba60863c7517a77ba1e5937df50aa1ae454e640115d323dee8f',
  [V1 + 'manifeste.json']: 'd67a0e2962955e924f15e4b4dc0a428ab08918e56223f33ba4af618d61265d21', [V1 + REL]: 'a651cc84229efb893f11310209c1c05c4e810d53dffcb00fc5e2d3c859466e09',
};
const DEPART = { [REL]: 'd0586d42795b00fb5360de4f91585e3ea65dc91355cf92e9e9faca28b2061344', [CTRL]: 'b91ed6ddf43ef7e2aabc52ad14725a7c8b6359f76fa5e26f473be4806b72a4dc' };
const FINAL = { [REL]: FIGES[V2 + REL], [CTRL]: FIGES[PROP] };
const PRESERVES = { 'CLAUDE.md': 'c5fa224bad1ea3ff042844ffdf6c5fc5898ae98e7f06a0b91f24d5ab30d78a04', 'docs/conception/addendum-A10-interrogatif.md': '5c62ac323364c855e112fb1452050b5cb84563a4086cd15e25ea6de26ccbd041',
  'docs/conception/00-sommaire.md': '2c9e2cfff2d7c5d175dcbc6cf99c853f771b993ef4e54ccd764be52b56b728fb', '.gitattributes': '5710749f06c7aff2d451c24c2847ec48a96567cc13dda68045f2b0da918e3c02',
  'ETAT-ACTUEL.md': '8b05e41309e51dc75ac40d1e00e7bb1d353427fd26269f94aa745300ccd0bc8c', 'ROADMAP.md': '058f9faa7578adaacd9aff9755f87bd8811fbdfe9c15b378107cc1f49968ea1d',
  'docs/rapports/etape2-A2-05-bilan-volet2.md': '58a2d44aaddd28c677d3d8a6e05f7938a1fc521d50d18d9cc2683323618abd18' };

const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent'); const lire = (p) => readFileSync(join(root, p), 'utf8');
const trace = []; let ecrit = false; const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (b) return; dire('ARRÊT : premier écart, ' + (ecrit ? 'état atteint conservé, aucune réparation' : 'avant écriture')); if (ecrit) { mkdirSync(join(root, SOR), { recursive: true }); writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n'); } process.exit(1); };
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); const fin = (r) => r.out.split('\n').pop();
const relais = (...o) => { const r = lancer(CTRL, '--apres-application', ...o); return { code: r.code, fin: fin(r), ids: r.out.split('\n').map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join(), q7: (r.out.split('\n').find((l) => / Q7 /.test(l)) ?? '').trim() }; };
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools').stdout.trim();
const instantane = () => { const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || [DEP, SOR, REELS].some((x) => (p + '/').startsWith(x))) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } }; m(''); return h; };
const RECS = [5, 6, 7, 8, 9].map((n) => ['recalcul de T' + n, W + 'recalcul-T' + n + '-perimetre.mjs']).concat([['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]);
const etat = () => (spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }).stdout ?? '').trim();

dire('--- Préconditions');
ok(git('merge-base', '--is-ancestor', CLOTURE, 'HEAD').status === 0, 'P1 HEAD descend du commit de clôture', CLOTURE.slice(0, 7));
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P2 index vide');
ok(!existsSync(join(root, DEP)), 'P3 sauvegarde absente, opération jamais lancée');
for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'P4 préservé : ' + p, h.slice(0, 12) + '…');
ok(lire('ETAT-ACTUEL.md').includes('**Addendum A10 adopté et installé le 2026-11-03**') && /^### 8\.118 /m.test(lire('docs/rapports/etape2-A2-05-bilan-volet2.md')), 'P5 installation et consignation d\'A10 faites');
ok(!zones(), 'P6 données, lots, journal, registres, tests et outils sans modification');
const man = JSON.parse(lire(MAN)).empreintes; ok(Object.keys(man).length === 45 && Object.entries(man).every(([p, h]) => shaF(p) === h), 'P7 manifeste des rapports : 45 empreintes conformes');
for (const [p, h] of Object.entries(FIGES)) ok(shaF(p) === h, 'P8 version figée ou proposition relue : ' + p, h.slice(0, 16));
const m2 = JSON.parse(lire(V2 + 'manifeste.json')); ok(m2.precede.sha256 === FIGES[V1 + 'manifeste.json'] && m2.documents[REL].depart_sha256 === DEPART[REL] && m2.documents[REL].final_sha256 === FINAL[REL], 'P9 manifeste 2 : chaîné au manifeste 1, départ et final attendus');
for (const [p, h] of Object.entries(DEPART)) ok(shaF(p) === h, 'P10 empreinte de départ : ' + p, h.slice(0, 16));
const dc = diffBrut(root, CTRL, PROP); ok(dc.status === 1 && sha(dc.stdout) === FIGES[V2 + 'proposition/diffs/controle-relais-allege.mjs.diff'], 'P11 diff du contrôle régénéré = diff relu, octet pour octet');
const r0 = relais(); ok(r0.code === 1 && r0.fin === '29 conformes sur 30' && r0.ids === 'C9b', 'P12 relais de départ (contrôle installé) : 29 sur 30, C9b seul', r0.fin + ' ; écarts : ' + r0.ids);
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'P13 ' + n, 'code ' + r.code); }
const arbre0 = instantane();

dire('--- Sauvegarde et application');
for (const p of [REL, CTRL]) { mkdirSync(dirname(join(root, DEP + p)), { recursive: true }); copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === shaF(p), 'original sauvegardé : ' + p); }
ecrit = true;
copyFileSync(join(root, V2 + REL), join(root, REL)); ok(shaF(REL) === FINAL[REL], 'écrit : ' + REL, FINAL[REL].slice(0, 16));
copyFileSync(join(root, PROP), join(root, CTRL)); ok(shaF(CTRL) === FINAL[CTRL], 'écrit : ' + CTRL, FINAL[CTRL].slice(0, 16));

dire('--- Contrôles après application');
mkdirSync(join(root, REELS), { recursive: true }); mkdirSync(join(root, SOR), { recursive: true });
for (const p of [REL, CTRL]) { const r = diffBrut(root, DEP + p, p); writeFileSync(join(root, REELS, p.split('/').pop() + '.diff'), r.stdout); ok(r.status === 1, 'C1 diff réel écrit : ' + p); }
const rel = relais(); ok(rel.code === 1 && rel.fin === '29 conformes sur 30' && rel.ids === 'C9b', 'C2 relais (contrôle adapté) : 29 sur 30, C9b seul, écart temporaire levé au prochain commit', rel.fin + ' ; écarts : ' + rel.ids);
ok(/juste Q7 E5 est-il normatif \? → oui/.test(rel.q7), 'C3 Q7 : le relais constate le statut normatif d\'A10', rel.q7);
const st = relais('--strict'); const attendu = git('rev-parse', 'HEAD').stdout.trim() === CLOTURE ? 'C9b' : 'C5a,C9b'; ok(st.ids === attendu, 'C4 relais --strict : écarts attendus seuls', st.fin + ' ; écarts : ' + st.ids);
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 45 rapports contrôlés, identiques/.test(emp.out), 'C5 manifeste des rapports : 45 empreintes conformes');
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'C6 ' + n, 'code ' + r.code); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(cov.out), 'C7 couverture : 360/377', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C8 204 corrections dans 177 ENTRY, aucune appliquée', etat());
for (const a of ['assemble', 'verify']) { const r = spawnSync(process.execPath, [join(root, 'tools/reconstruction/run.mjs'), a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(r.status === 0, 'C9 run.mjs ' + a, 'code ' + r.status); }
const t = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); const n = (k) => ((t.stdout ?? '').match(new RegExp('^. ' + k + ' (\\d+)$', 'm')) ?? [])[1]; ok(t.status === 0 && n('tests') === '510' && n('pass') === '510', 'C10 510 tests', 'code ' + t.status + ' ; ' + n('pass') + ' sur ' + n('tests'));
const arbre1 = instantane(); const mod = [...new Set([...Object.keys(arbre0), ...Object.keys(arbre1)])].filter((p) => arbre0[p] !== arbre1[p]).sort();
ok(JSON.stringify(mod) === JSON.stringify([CTRL, REL].sort()), 'C11 arbre entier comparé : les deux fichiers visés seuls ; versions figées 1 et 2, candidat et pilotage intacts', Object.keys(arbre1).length + ' fichiers');
for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'C12 préservé : ' + p);
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C13 index vide');
const dk = git('diff', '--check'); ok(dk.status === 0, 'C14 git diff --check', 'code ' + dk.status);
const FIN = 'mise en service de la version figée 2 du relais et du contrôle adapté conforme ; relais à 29 sur 30, C9b seul, jusqu\'au prochain commit';
writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n' + FIN + '\n'); console.log(FIN);
process.exit(0);
