// A2-05 · recherche d'omissions : application de l'inscription documentaire de l'arbitrage de la livraison E2 du groupe E. PRÉPARÉ, à ne lancer que sur autorisation distincte, une fois.
// Quatre fichiers (proposition/manifeste.json) : ETAT-ACTUEL.md, ROADMAP.md et le bilan, écrits égaux à leur version relue ; un document neuf dans docs/rapports/.
// Arrêt au premier écart ; aucune réparation automatique ; n'indexe, ne committe et ne pousse rien. État d'arrivée : relais 29 sur 30, C9b seul ; bloc d'état inchangé.
// Usage : node a2-05-travail/omissions-temps3/inscription-E2/application/appliquer-inscription-E2.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { diffBrut } from '../../../arbitrage-F/moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', O = W + 'omissions-temps3/', I = O + 'inscription-E2/', PROP = I + 'proposition/', A = I + 'application/', DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/';
const MANIF = PROP + 'manifeste.json', MANIF_SHA = 'ff439eca7866c74316e2bd77620248fd58889cfd4504b8c5c857bd00a048c086', CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1';
const APERCU = W + 'sync-stable-apercu.md', CTRL = W + 'controle-relais-allege.mjs', EMP = W + 'empreintes-lot3.mjs', CPO = W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs';
const ETAT_ATTENDU = '{"arbitres":377,"restants":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"],"empreintes":47}';
const PRESERVES = ['CLAUDE.md', 'docs/conception/addendum-A10-interrogatif.md', 'docs/conception/00-sommaire.md', '.gitattributes', 'docs/relecture/reprise-A2-05.md', W + 'registre-tranches.json', CTRL, W + 'sync-stable.mjs', W + 'couverture-lot3.mjs', EMP, W + 'empreintes-rapports-arbitres.json', CPO,
  'docs/rapports/etape2-A2-05-volet1-lot3-F.md', 'docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md', W + 'arbitrage-F/mesure-couverture/mesure/mesure.json', W + 'arbitrage-F/mesure-couverture/mesure/rapport-mesure.md',
  O + 'rapport-relecture-A.md', O + 'proposition-decoupage-perimetre-A.md', O + 'analyse-A.json', O + 'decoupage.json', O + 'perimetre-A.json', O + 'fiches-A.md',
  'docs/rapports/etape2-A2-05-omissions-interrogatif-mesure.md', 'docs/rapports/etape2-A2-05-omissions-interrogatif-A-perimetre.md', 'docs/rapports/etape2-A2-05-omissions-interrogatif-A.md',
  O + 'rapport-relecture-B.md', O + 'proposition-perimetre-B.md', O + 'analyse-B.json', O + 'perimetre-B.json', O + 'dossier-B.md', O + 'fiches-B.md',
  O + 'proposition-perimetre-C.md', O + 'perimetre-C.json', O + 'dossier-C.md',
  'docs/rapports/etape2-A2-05-omissions-interrogatif-B-perimetre.md', 'docs/rapports/etape2-A2-05-omissions-interrogatif-B.md',
  O + 'rapport-relecture-C.md', O + 'analyse-C.json', O + 'fiches-C.md', O + 'proposition-perimetre-D.md', O + 'perimetre-D.json', O + 'dossier-D.md',
  'docs/rapports/etape2-A2-05-omissions-interrogatif-C-perimetre.md', 'docs/rapports/etape2-A2-05-omissions-interrogatif-C.md',
  O + 'rapport-relecture-D.md', O + 'analyse-D.json', O + 'fiches-D.md', O + 'proposition-perimetre-E.md', O + 'perimetre-E.json', O + 'dossier-E.md',
  'docs/rapports/etape2-A2-05-omissions-interrogatif-D-perimetre.md', 'docs/rapports/etape2-A2-05-omissions-interrogatif-D.md',
  O + 'rapport-relecture-E1.md', O + 'analyse-E1.json', O + 'fiches-E1.md',
  'docs/rapports/etape2-A2-05-omissions-interrogatif-E-perimetre.md', 'docs/rapports/etape2-A2-05-omissions-interrogatif-E1.md',
  O + 'rapport-relecture-E2.md', O + 'analyse-E2.json', O + 'fiches-E2.md'];
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); const out = ((x.stdout ?? '') + (x.stderr ?? '')).trim(); return { code: x.status, out, fin: out.split('\n').pop(), L: out.split('\n'), ids: out.split('\n').map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
const instantane = () => { const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || [DEP, SOR, REELS].some((x) => (p + '/').startsWith(x))) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } }; m(''); return h; };
const zones = () => git('status', '--porcelain', '--untracked-files=all', '--', 'data', 'reconstruction', 'tests', 'tools').stdout.trim();
const apercuVide = () => { const r = lancer(W + 'sync-stable.mjs', '--apercu'); return r.code === 0 && !readFileSync(join(root, APERCU), 'utf8').split('\n').some((l) => /^[+-](?![+-])/.test(l)); };
const etat = () => spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves,empreintes:v.empreintes}))"], { cwd: root, encoding: 'utf8' }).stdout.trim();
const trace = []; let ecrit = false;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (b) return; dire('ARRÊT : premier écart, ' + (ecrit ? 'état atteint conservé, aucune réparation' : 'rien n\'est écrit')); if (ecrit) { mkdirSync(join(root, SOR), { recursive: true }); writeFileSync(join(root, SOR + 'application.txt'), trace.join('\n') + '\n'); } process.exit(1); };

dire('--- Préconditions');
ok(git('rev-parse', 'HEAD').stdout.trim() === CLOTURE, 'P1 HEAD à 39cce13');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P2 index vide');
ok(!existsSync(join(root, DEP)), 'P3 sauvegarde absente, opération jamais lancée');
ok(shaF(MANIF) === MANIF_SHA, 'P4 manifeste de la proposition relue', MANIF_SHA.slice(0, 16));
const M = JSON.parse(readFileSync(join(root, MANIF), 'utf8')); const CIBLES = Object.keys(M).filter((p) => M[p].depart), NOUVEAUX = Object.keys(M).filter((p) => !M[p].depart);
ok(CIBLES.length === 3 && NOUVEAUX.length === 1, 'P5 trois fichiers modifiés, un document neuf');
for (const p of CIBLES) {
  ok(shaF(p) === M[p].depart, 'P6 empreinte de départ : ' + p, shaF(p).slice(0, 16));
  ok(shaF(PROP + p) === M[p].propose, 'P7 version proposée relue : ' + p, M[p].propose.slice(0, 16));
  const d = diffBrut(root, p, PROP + p); ok(d.status === 1 && sha(d.stdout) === M[p].diff && shaF(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff') === M[p].diff, 'P8 diff régénéré = diff relu : ' + p);
}
for (const p of NOUVEAUX) { ok(!existsSync(join(root, p)), 'P6 document neuf absent : ' + p); ok(shaF(PROP + p) === M[p].propose, 'P7 version proposée relue : ' + p, M[p].propose.slice(0, 16)); }
const pres0 = Object.fromEntries(PRESERVES.map((p) => [p, shaF(p)])); ok(PRESERVES.every((p) => pres0[p] !== 'absent'), 'P9 fichiers préservés présents', PRESERVES.length + ' fichiers');
ok(!zones(), 'P10 données, lots, journal, tests et outils identiques à HEAD (les normes, dont A10 et le sommaire, sont parmi les fichiers préservés)');
{ const r = lancer(CTRL, '--apres-application'); ok(r.ids === 'C9b' && r.fin === '29 conformes sur 30', 'P11 relais de départ : 29 sur 30, C9b seul', r.fin + ' ; écarts : ' + r.ids); }
{ const e = lancer(EMP); ok(e.code === 0 && e.out === 'empreintes : 47 rapports contrôlés, identiques', 'P12 empreintes : 47 identiques', e.out); }
{ const c = lancer(CPO); ok(c.code === 0 && c.fin === '29 conformes sur 29', 'P13 contrôle du périmètre opérationnel : 29 sur 29'); }
ok(apercuVide(), 'P14 aperçu de synchronisation vide');
ok(etat() === ETAT_ATTENDU, 'P15 état calculé de départ', etat());
const arbre0 = instantane();

dire('--- Sauvegarde et application');
for (const p of CIBLES) { mkdirSync(dirname(join(root, DEP + p)), { recursive: true }); copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === M[p].depart, 'original sauvegardé : ' + p); }
ecrit = true;
for (const p of [...CIBLES, ...NOUVEAUX]) { mkdirSync(dirname(join(root, p)), { recursive: true }); copyFileSync(join(root, PROP + p), join(root, p)); ok(shaF(p) === M[p].propose, 'écrit : ' + p, M[p].propose.slice(0, 16)); }

dire('--- Contrôles après application');
mkdirSync(join(root, SOR), { recursive: true }); mkdirSync(join(root, REELS), { recursive: true });
for (const p of CIBLES) { const d = diffBrut(root, DEP + p, p); writeFileSync(join(root, REELS + p.replaceAll('/', '__') + '.diff'), d.stdout); const relu = readFileSync(join(root, PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), 'utf8'); ok(d.status === 1 && d.stdout.slice(d.stdout.indexOf('@@')) === relu.slice(relu.indexOf('@@')), 'C1 diff réel identique au diff relu : ' + p); }
for (const p of NOUVEAUX) { const t = readFileSync(join(root, p), 'utf8'); ok(!t.includes('\r') && t.split(/^## 0\. /m).length === 2, 'C2 document neuf : LF, un seul §0 : ' + p); }
{ const r = lancer(CTRL, '--apres-application'); ok(r.ids === 'C9b' && r.fin === '29 conformes sur 30' && ['C5f', 'C8', 'C9a'].every((c) => r.L.some((l) => new RegExp('^conforme\\s+' + c + ' ').test(l))), 'C3 relais : 29 sur 30, C9b seul ; C5f, C8 et C9a conformes', r.fin + ' ; écarts : ' + r.ids); }
{ const r = lancer(CTRL, '--apres-application', '--strict'); ok(r.ids === 'C9b', 'C4 relais --strict : C9b seul', r.fin + ' ; écarts : ' + r.ids); }
{ const e = lancer(EMP); ok(e.code === 0 && e.out === 'empreintes : 47 rapports contrôlés, identiques', 'C5 empreintes : 47 identiques', e.out); }
{ const c = lancer(CPO); ok(c.code === 0 && c.fin === '29 conformes sur 29', 'C6 contrôle du périmètre opérationnel : 29 sur 29'); }
ok(apercuVide(), 'C7 aperçu de synchronisation vide : bloc a2-05:etat inchangé');
for (const [n, s] of [...[5, 6, 7, 8, 9].map((x) => ['recalcul de T' + x, W + 'recalcul-T' + x + '-perimetre.mjs']), ['contrôle du pilote', W + 'controle-bilan-pilote.mjs'], ['couverture', W + 'couverture-lot3.mjs']]) { const r = lancer(s); ok(r.code === 0, 'C8 ' + n, 'code ' + r.code); }
ok(etat() === ETAT_ATTENDU, 'C9 état calculé inchangé : 377/377 ; 204 corrections dans 177 ENTRY ; V1-32 ; 47 empreintes', etat());
for (const a of ['assemble', 'verify']) { const r = spawnSync(process.execPath, [join(root, 'tools/reconstruction/run.mjs'), a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(r.status === 0, 'C10 run.mjs ' + a, 'code ' + r.status); }
{ const t = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); const n = (k) => ((t.stdout ?? '').match(new RegExp('^. ' + k + ' (\\d+)$', 'm')) ?? [])[1]; ok(t.status === 0 && n('tests') === '510' && n('pass') === '510', 'C11 510 tests', 'code ' + t.status + ' ; ' + n('pass') + ' sur ' + n('tests')); }
{ const arbre1 = instantane(); const mod = [...new Set([...Object.keys(arbre0), ...Object.keys(arbre1)])].filter((p) => arbre0[p] !== arbre1[p]).sort(); ok(JSON.stringify(mod) === JSON.stringify([...CIBLES, ...NOUVEAUX].sort()), 'C12 arbre entier comparé : les quatre fichiers visés seuls', mod.length + ' modifiés ; ' + Object.keys(arbre1).length + ' fichiers'); }
for (const p of PRESERVES) ok(shaF(p) === pres0[p], 'C13 préservé : ' + p);
ok(!zones(), 'C14 zones protégées inchangées');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C15 index vide');
{ const dc = git('diff', '--check', '--', ...CIBLES); ok(dc.status === 0, 'C16 git diff --check, fichiers suivis visés', 'code ' + dc.status); }
const FIN = 'inscription de l\'arbitrage de la livraison E2 appliquée ; relais à 29 sur 30, C9b seul ; un document neuf dans docs/rapports/';
writeFileSync(join(root, SOR + 'application.txt'), trace.join('\n') + '\n' + FIN + '\n');
console.log(FIN);
