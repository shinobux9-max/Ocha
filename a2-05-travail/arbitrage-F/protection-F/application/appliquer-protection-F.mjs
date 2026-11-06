// A2-05 · bloc F : application de la protection du rapport arbitré de F et de son périmètre opérationnel au manifeste d'empreintes. PRÉPARÉ, à ne lancer que sur
// autorisation distincte. Six fichiers visés (proposition/manifeste.json) : cinq écrits égaux à leur version relue (outil d'empreintes, contrôle du périmètre
// opérationnel, ETAT-ACTUEL.md, ROADMAP.md, bilan) ; le manifeste d'empreintes écrit par l'outil lui-même (`empreintes-lot3.mjs --ajouter`, une fois), puis comparé
// à sa version relue (la date de l'ajout est celle du jour d'exécution). Arrêt au premier écart ; aucune réparation automatique ; n'indexe, ne committe et ne pousse rien.
// État d'arrivée attendu : manifeste à 47 entrées, les 45 précédentes inchangées ; C9a levé ; relais à 29 sur 30, C9b seul (A10 non committé).
// Usage : node a2-05-travail/arbitrage-F/protection-F/application/appliquer-protection-F.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { diffBrut } from '../../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', I = W + 'arbitrage-F/protection-F/', PROP = I + 'proposition/', A = I + 'application/', DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/';
const MANIF = PROP + 'manifeste.json', MANIF_SHA = '4803da8cd372f1e700e828a950def1c9307c38cb75c531b9c902a83cfa28c854', APERCU = W + 'sync-stable-apercu.md';
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', R = 'docs/rapports/etape2-A2-05-volet1-lot3-', RF = R + 'F.md', PF = R + 'F-perimetre-operationnel.md';
const EMP = W + 'empreintes-lot3.mjs', MAN = W + 'empreintes-rapports-arbitres.json', CPO = W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs', CTRL = W + 'controle-relais-allege.mjs';
const ORDRE_45 = '924e9f657f1ef376dd0b4821a5768a4cbfbd4075f7382308f99b3d95b66169db';
const ETAT_ATTENDU = '{"arbitres":377,"restants":0,"proposes":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"],"empreintes":47}';
const PRESERVES = { 'CLAUDE.md': 'c5fa224bad1ea3ff042844ffdf6c5fc5898ae98e7f06a0b91f24d5ab30d78a04', 'docs/conception/addendum-A10-interrogatif.md': '5c62ac323364c855e112fb1452050b5cb84563a4086cd15e25ea6de26ccbd041',
  'docs/conception/00-sommaire.md': '2c9e2cfff2d7c5d175dcbc6cf99c853f771b993ef4e54ccd764be52b56b728fb', '.gitattributes': '5710749f06c7aff2d451c24c2847ec48a96567cc13dda68045f2b0da918e3c02',
  'docs/relecture/reprise-A2-05.md': 'c3bdc60ae05398bafa783ef4931a295be79d0defb4798a9f370d87f2c36b0b55', 'a2-05-travail/versions-finales-2/manifeste.json': '2a36c47dfe94fae615b7202ebe9682a2520566841df521c06dcc2bd5c0a228d3',
  'a2-05-travail/registre-tranches.json': '04428f91c0782b8f7487c34455d3d6fd76059b0b55b562ea4c1223aef106ef68', 'a2-05-travail/controle-relais-allege.mjs': 'ba5f24c82f572dc7106fa512174ad0ae6d42873cb0f00ec51f9a412ab64d2f05',
  'a2-05-travail/sync-stable.mjs': '75b686d2a1458507ebb4af99a560caa2769a2a4bb227b06d7d5b0ef7fb4264a1', 'a2-05-travail/couverture-lot3.mjs': '3de20300a501e5d161c5305ef47f7172701a1d5b29112ec1bd7233eb878b8bdb',
  [RF]: '3a2e3f242d701db611facf9a49cca16f75eb890595ec15ecbefdad569e09acfb', [PF]: 'e2a27bb6a049772056ad193b1b1b10ecf64a132552e6fcf859b0d3eb3a567561',
  [R + 'F-perimetre.md']: 'ff46172405e29d188cc5085f1bddf34caf7964cd20aefe0f39a8f33c9b9c4dcf' };

const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent'); const lire = (p) => readFileSync(join(root, p), 'utf8');
const trace = []; let ecrit = false; const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (b) return; dire('ARRÊT : premier écart, ' + (ecrit ? 'état atteint conservé, aucune réparation' : 'avant écriture')); if (ecrit) { mkdirSync(join(root, SOR), { recursive: true }); writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n'); } process.exit(1); };
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const relais = (...o) => { const r = lancer(CTRL, '--apres-application', ...o); const L = r.out.split('\n'); return { code: r.code, fin: L.at(-1), L, ids: L.map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.split('\n').filter((l) => l.trim() && !/docs\/conception\/(00-sommaire|addendum-A10-interrogatif)\.md$/.test(l)).join(', ');
const instantane = () => { const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || [DEP, SOR, REELS].some((x) => (p + '/').startsWith(x))) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } }; m(''); return h; };
const RECS = [5, 6, 7, 8, 9].map((n) => ['recalcul de T' + n, W + 'recalcul-T' + n + '-perimetre.mjs']).concat([['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]);
const etat = () => (spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves,empreintes:v.empreintes}))"], { cwd: root, encoding: 'utf8' }).stdout ?? '').trim();
const apercuVide = () => (spawnSync(process.execPath, ['--input-type=module', '-e', "import {planifier} from './a2-05-travail/sync-stable.mjs'; const p=planifier('.'); console.log(Object.values(p.sorties).every((s)=>s.apres===s.avant)?'vide':'non vide')"], { cwd: root, encoding: 'utf8' }).stdout ?? '').trim();
const nomDiff = (p) => p.replaceAll('/', '__') + '.diff';

dire('--- Préconditions');
ok(git('merge-base', '--is-ancestor', CLOTURE, 'HEAD').status === 0, 'P1 HEAD descend du commit de clôture', CLOTURE.slice(0, 7));
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P2 index vide');
ok(!existsSync(join(root, DEP)), 'P3 sauvegarde absente, opération jamais lancée');
ok(shaF(MANIF) === MANIF_SHA, 'P4 manifeste de la proposition relue', MANIF_SHA.slice(0, 16));
const M = JSON.parse(lire(MANIF)); const CIBLES = Object.keys(M).sort(); ok(CIBLES.length === 6 && CIBLES.includes(MAN) && CIBLES.includes(EMP), 'P5 six fichiers visés, dont l\'outil et le manifeste d\'empreintes', String(CIBLES.length));
for (const p of CIBLES) {
  ok(shaF(p) === M[p].depart, 'P6 empreinte de départ : ' + p, M[p].depart.slice(0, 16));
  ok(shaF(PROP + p) === M[p].propose, 'P7 version proposée relue : ' + p, M[p].propose.slice(0, 16));
  const d = diffBrut(root, p, PROP + p); ok(d.status === 1 && sha(d.stdout) === M[p].diff && shaF(PROP + 'diffs/' + nomDiff(p)) === M[p].diff, 'P8 diff régénéré = diff relu : ' + p);
}
ok(git('diff', '--quiet', 'HEAD', '--', EMP, MAN).status === 0, 'P9 outil d\'empreintes et manifeste identiques à HEAD');
for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'P10 préservé : ' + p);
ok(!zones(), 'P11 données, lots, journal, tests, outils et normes sans modification, hors sommaire et A10', zones());
const r0 = relais(); ok(r0.code === 1 && r0.fin === '28 conformes sur 30' && r0.ids === 'C9a,C9b', 'P12 relais de départ : 28 sur 30, C9a et C9b seuls', r0.fin + ' ; écarts : ' + r0.ids);
const emp0 = lancer(EMP); ok(emp0.code === 0 && emp0.out === 'empreintes : 45 rapports contrôlés, identiques ; rapports arbitrés hors du manifeste : ' + RF, 'P13 45 empreintes identiques ; hors du manifeste : le seul rapport F', emp0.out.slice(0, 160));
const cov0 = lancer(W + 'couverture-lot3.mjs'); ok(cov0.code === 0 && /377 arbitrés, 0 proposés, 0 restants, sur 377/.test(cov0.out), 'P14 couverture de départ : 377/377', cov0.out.slice(0, 70));
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'P15 ' + n, 'code ' + r.code); }
const arbre0 = instantane();

dire('--- Sauvegarde et application');
for (const p of CIBLES) { mkdirSync(dirname(join(root, DEP + p)), { recursive: true }); copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === M[p].depart, 'original sauvegardé : ' + p); }
ecrit = true;
for (const p of CIBLES.filter((x) => x !== MAN)) { copyFileSync(join(root, PROP + p), join(root, p)); ok(shaF(p) === M[p].propose, 'écrit : ' + p, M[p].propose.slice(0, 16)); }
const jour0 = new Date().toISOString().slice(0, 10);
const aj = lancer(EMP, '--ajouter'); const jour1 = new Date().toISOString().slice(0, 10);
ok(aj.code === 0 && aj.out === 'manifeste : 2 rapport(s) ajouté(s) : ' + RF + ', ' + PF, 'écrit par l\'outil : `empreintes-lot3.mjs --ajouter`, une fois', aj.out.slice(0, 160));
const relu = JSON.parse(readFileSync(join(root, PROP + MAN), 'utf8')), dateRelue = relu.ajouts.at(-1).date, reel = JSON.parse(lire(MAN)), date = reel.ajouts?.at(-1)?.date;
ok([jour0, jour1].includes(date), 'date de l\'ajout : celle du jour d\'exécution', date + (date === dateRelue ? ', identique à la proposition' : ', proposition datée du ' + dateRelue));
relu.ajouts.at(-1).date = date;
ok(lire(MAN) === JSON.stringify(relu, null, 1) + '\n', 'manifeste écrit par l\'outil = version relue, octet pour octet' + (date === dateRelue ? '' : ', date d\'ajout exceptée'), shaF(MAN).slice(0, 16));

dire('--- Contrôles après application');
mkdirSync(join(root, REELS), { recursive: true }); mkdirSync(join(root, SOR), { recursive: true });
for (const p of CIBLES) {
  const r = diffBrut(root, DEP + p, p); writeFileSync(join(root, REELS, nomDiff(p)), r.stdout);
  // Diff relu ; pour le manifeste daté d'un autre jour que la proposition, la seule ligne de date de l'ajout nouveau est remplacée
  let attendu = readFileSync(join(root, PROP + 'diffs/' + nomDiff(p)), 'utf8');
  // (la ligne `index` porte les empreintes Git des deux versions ; elle change avec la date et n'est alors pas comparée)
  const sansIndex = (x) => (p === MAN && date !== dateRelue ? x.replace(/^index [0-9a-f]+\.\.[0-9a-f]+.*\n/m, '') : x);
  if (p === MAN && date !== dateRelue) { const a = '+   "date": "' + dateRelue + '",'; ok(attendu.split(a).length === 2, 'C1 diff relu du manifeste : une seule ligne de date ajoutée'); attendu = attendu.replace(a, '+   "date": "' + date + '",'); }
  ok(r.status === 1 && sansIndex(r.stdout) === sansIndex(attendu),'C1 diff réel écrit, identique au diff relu' + (p === MAN && date !== dateRelue ? ', date d\'ajout exceptée' : '') + ' : ' + p);
}
const k = Object.keys(reel.empreintes);
ok(k.length === 47 && sha(k.slice(0, 45).join('\n')) === ORDRE_45 && k[45] === RF && k[46] === PF && reel.empreintes[RF] === PRESERVES[RF] && reel.empreintes[PF] === PRESERVES[PF], 'C2 manifeste : 47 entrées ; les 45 précédentes dans leur ordre ; 46e le rapport F, 47e son périmètre opérationnel, à leurs empreintes relues');
const rel = relais(); const c9a = rel.L.find((l) => /^conforme\s+C9a/.test(l)) ?? '';
ok(rel.code === 1 && rel.fin === '29 conformes sur 30' && rel.ids === 'C9b' && /47 rapports arbitrés identiques sur 47 au manifeste ; HEAD : 45, inchangées ; nouvelles : F\.md, F-perimetre-operationnel\.md$/.test(c9a), 'C3 relais : 29 sur 30, C9b seul ; C9a conforme (47 identiques, les 45 de HEAD inchangées, nouvelles : rapport F et périmètre opérationnel)', rel.fin + ' ; écarts : ' + rel.ids);
ok(rel.L.some((l) => /^conforme\s+C8 /.test(l)) && rel.L.some((l) => /^conforme\s+C5f /.test(l)), 'C4 C8 (reprise simulée) et C5f (prochaine action identique) conformes');
const st = relais('--strict'); ok(st.ids === 'C9b' && st.fin === '29 conformes sur 30', 'C5 relais --strict : C9b seul ; C5a conforme', st.fin + ' ; écarts : ' + st.ids);
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'C6 ' + n, 'code ' + r.code); }
const cpo = lancer(CPO, '--sabotages'); ok(cpo.code === 0 && /\n29 conformes sur 29\n/.test(cpo.out) && /17 sabotages détectés sur 17/.test(cpo.out), 'C7 contrôle du périmètre opérationnel : 29 sur 29, 17 sabotages sur 17');
ok(apercuVide() === 'vide', 'C8 synchronisation stable : aperçu vide, blocs a2-05:etat à jour (47 rapports)');
const emp = lancer(EMP); ok(emp.code === 0 && emp.out === 'empreintes : 47 rapports contrôlés, identiques', 'C9 manifeste : 47 empreintes identiques, aucun rapport arbitré hors du manifeste', emp.out);
const avant2 = shaF(MAN); const aj2 = lancer(EMP, '--ajouter'); ok(aj2.code !== 0 && /aucun rapport arbitré à ajouter/.test(aj2.out) && shaF(MAN) === avant2, 'C10 seconde exécution de --ajouter refusée, sans écriture', 'code ' + aj2.code);
ok(etat() === ETAT_ATTENDU, 'C11 377 arbitrés ; 204 corrections dans 177 ENTRY, aucune appliquée ; V1-32 libre ; 47 empreintes', etat());
for (const a of ['assemble', 'verify']) { const r = spawnSync(process.execPath, [join(root, 'tools/reconstruction/run.mjs'), a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(r.status === 0, 'C12 run.mjs ' + a, 'code ' + r.status); }
const t = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); const n = (x) => ((t.stdout ?? '').match(new RegExp('^. ' + x + ' (\\d+)$', 'm')) ?? [])[1]; ok(t.status === 0 && n('tests') === '510' && n('pass') === '510', 'C13 510 tests', 'code ' + t.status + ' ; ' + n('pass') + ' sur ' + n('tests'));
const arbre1 = instantane(); const mod = [...new Set([...Object.keys(arbre0), ...Object.keys(arbre1)])].filter((p) => arbre0[p] !== arbre1[p]).sort();
ok(JSON.stringify(mod) === JSON.stringify(CIBLES), 'C14 arbre entier comparé : les six fichiers visés seuls', mod.length + ' modifiés ; ' + Object.keys(arbre1).length + ' fichiers');
for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'C15 préservé : ' + p);
ok(!zones(), 'C16 zones protégées inchangées', zones());
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C17 index vide');
const dk = git('diff', '--check'); ok(dk.status === 0, 'C18 git diff --check', 'code ' + dk.status);
const FIN = 'protection du rapport arbitré de F appliquée ; manifeste à 47 entrées ; C9a levé ; relais à 29 sur 30, C9b seul';
writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n' + FIN + '\n'); console.log(FIN);
process.exit(0);
