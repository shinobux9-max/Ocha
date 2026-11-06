// A2-05 : application de la consignation de l'installation d'A10 (§8.118), par les trois diffs relus. PRÉPARÉ, à ne lancer que sur autorisation distincte, jamais avant l'installation réelle.
// Date et empreinte d'A10 tirées de la trace et du fichier installés, jamais d'un argument : sans installation conforme, refus avant écriture. Moteur commun non utilisé : son C9 exige 30 sur 30, et l'état attendu ici est 29 sur 30, C9b seul.
// Blocs a2-05:etat, journal historique, bilan antérieur, `CLAUDE.md`, relais et normes inchangés. Arrêt au premier écart ; aucune réparation automatique ; n'indexe, ne committe et ne pousse rien.
// Usage : node a2-05-travail/arbitrage-F/consignation-installation-A10/application/appliquer-consignation-A10.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { diffBrut } from '../../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/consignation-installation-A10/', PR = OUT + 'proposition/', A = OUT + 'application/', DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/', VD = '<DATE-D-INSTALLATION>', VS = '<SHA-A10>';
const INST = W + 'arbitrage-F/installation-A10/', TRACE = INST + 'application/sorties/application.txt', GAB_A10 = INST + 'proposition/addendum-A10-interrogatif.md', CIBLE = 'docs/conception/addendum-A10-interrogatif.md', SOM = 'docs/conception/00-sommaire.md', REL = W + 'controle-relais-allege.mjs', GA = '.gitattributes';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', APERCU = W + 'sync-stable-apercu.md', MAN = W + 'empreintes-rapports-arbitres.json';
const GAB_SHA = '461589da8a09f67ad7cb625aaf2ced07ff801cdc5365564e4a092575ab1ec58b', MAN_SHA = '89716587f51f6359b567cf56b07437b69093d67583c3180268fc7467183e836e', CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', ETAT_ATTENDU = '{"arbitres":360,"restants":17,"proposes":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"]}';
const INSTALLES = { [SOM]: '2c9e2cfff2d7c5d175dcbc6cf99c853f771b993ef4e54ccd764be52b56b728fb', [REL]: 'b91ed6ddf43ef7e2aabc52ad14725a7c8b6359f76fa5e26f473be4806b72a4dc', [GA]: '5710749f06c7aff2d451c24c2847ec48a96567cc13dda68045f2b0da918e3c02' };
const PRESERVES = { 'CLAUDE.md': 'c5fa224bad1ea3ff042844ffdf6c5fc5898ae98e7f06a0b91f24d5ab30d78a04', 'docs/relecture/reprise-A2-05.md': 'd0586d42795b00fb5360de4f91585e3ea65dc91355cf92e9e9faca28b2061344', 'docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md': '984125877445b370ce4a1fc2a96b6d32a1ac1564c207906118dde852d9e1468e' };
// [cible, gabarit relu, départ, gabarit, diff relu]
const D = [
  [BIL, 'etape2-A2-05-bilan-volet2.md', '677e5589f1adeddd17d4e9629d477f1386c22ce9ab1afd90d3e528e0a20fd9a3', '5a2b810eff3af36e0cf9a899c3922929638c19e17a85e5836f986fe29f20e20c', 'aaf46ad7d8289c72b6cf1fc5135b729e6ae20c993d4f589f6eb62cfda8931bb4'],
  [ETAT, ETAT, '178f3e566b0241558eb591bf7fdedec3d3fa0f31fab94eadb750890530e82738', '14f802995551b1f6d816f0c3c05e975b6a31b0bbf21e835103491348e7c88a56', '5f44fc211514d49e4d4a3a19c3a506fcf5d6c97805813c1761495293ddff699d'],
  [ROAD, ROAD, 'ee1fd1a2e23f3bc5598fbae030f852155215cd4252ccfbe93a5598e1bf7f1840', '9b67804b47cfc0e4e9c5293738b6798151853a8302ed0bcdc07880274b997c2b', '31c3a20ae662dbc0b0a430f5abba1a7f40a5515afd149f96e7b893c07f191718'],
];

const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent'); const lire = (p) => readFileSync(join(root, p), 'utf8');
const trace = []; let ecrit = false; const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (b) return; dire('ARRÊT : premier écart, ' + (ecrit ? 'état atteint conservé, aucune réparation' : 'avant écriture')); if (ecrit) { mkdirSync(join(root, SOR), { recursive: true }); writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n'); } process.exit(1); };
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); const fin = (r) => r.out.split('\n').pop();
const LFs = (t) => t.replace(/\r\n/g, '\n'); const style = (t) => { const c = (t.match(/\r\n/g) ?? []).length, l = (t.match(/\n/g) ?? []).length; return c === l ? 'CRLF' : c === 0 ? 'LF' : 'mixte'; };
const hunks = (diff) => { const H = []; let h = null; for (const l of diff.split('\n')) { if (l.startsWith('@@')) { h = { a: [], b: [] }; H.push(h); continue; } if (!h || l.startsWith('\\') || l === '') continue; if (l[0] === ' ') { h.a.push(l.slice(1)); h.b.push(l.slice(1)); } else if (l[0] === '-') h.a.push(l.slice(1)); else if (l[0] === '+') h.b.push(l.slice(1)); } return H.map((x) => ({ a: x.a.join('\n'), b: x.b.join('\n') })); };
const poser = (t0, H) => { const crlf = t0.includes('\r\n'); let t = LFs(t0); for (const { a, b } of H) t = t.replace(a, () => b); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const corps = (d) => d.slice(d.indexOf('@@')); const remplir = (t) => t.replaceAll(VD, () => date).replaceAll(VS, () => shaA10);
const relais = (...o) => { const r = lancer(REL, '--apres-application', ...o); return { code: r.code, fin: fin(r), ids: r.out.split('\n').map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
const apercu = () => { const r = lancer(W + 'sync-stable.mjs', '--apercu'); const vide = r.code === 0 && !lire(APERCU).split('\n').some((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)); return { r, vide }; };
const blocs = () => [ETAT, ROAD].map((p) => lire(p).match(/<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/)[0]);
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools').stdout.trim();
const instantane = () => { const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || [DEP, SOR, REELS].some((x) => (p + '/').startsWith(x))) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } }; m(''); return h; };
const RECS = [5, 6, 7, 8, 9].map((n) => ['recalcul de T' + n, W + 'recalcul-T' + n + '-perimetre.mjs']).concat([['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]);
const etat = () => (spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }).stdout ?? '').trim();

dire('--- Installation réelle');
const m = existsSync(join(root, TRACE)) ? LFs(lire(TRACE)).trimEnd().split('\n').pop().match(/^installation d'A10 conforme, date effective (\d{4}-\d{2}-\d{2}) ; relais à 29 sur 30, C9b seul, jusqu'au prochain commit$/) : null;
ok(!!m, 'I1 trace d\'une installation conforme', TRACE); const date = m[1];
ok(shaF(GAB_A10) === GAB_SHA, 'I2 texte relu d\'A10', GAB_SHA);
const shaA10 = sha(Buffer.from(lire(GAB_A10).replace('<DATE-D-ADOPTION>', () => date), 'utf8')); ok(shaF(CIBLE) === shaA10, 'I2 bis A10 installé = texte relu, à la date de la trace', date + ' ; ' + shaA10);
for (const [p, h] of Object.entries(INSTALLES)) ok(shaF(p) === h, 'I3 fichier installé : ' + p, h);
ok(git('rev-parse', 'HEAD').stdout.trim() === CLOTURE, 'I4 HEAD au commit de clôture : installation non committée', CLOTURE.slice(0, 7));

dire('--- Préconditions');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P2 index vide');
ok(!existsSync(join(root, DEP)), 'P3 sauvegarde absente, opération jamais lancée');
for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'P4 préservé : ' + p, h.slice(0, 12) + '…');
ok(!zones(), 'P5 données, lots, journal, registres, tests et outils sans modification');
const man = JSON.parse(lire(MAN)).empreintes; ok(shaF(MAN) === MAN_SHA && Object.keys(man).length === 45 && Object.entries(man).every(([p, h]) => shaF(p) === h), 'P6 manifeste : 45 empreintes conformes', MAN_SHA);
ok(!/^### 8\.118 /m.test(lire(BIL)) && (lire(BIL).match(/^### 8\.117 /gm) ?? []).length === 1, 'P7 ajout absent : §8.118 ; §8.117 présent');
const sorties = {}; const relus = {};
for (const [p, v, dep, gab, h] of D) {
  ok(shaF(p) === dep, 'P8 empreinte de départ : ' + p, dep); ok(shaF(PR + v) === gab, 'P9 gabarit relu : ' + v, gab);
  const r = diffBrut(root, p, PR + v); relus[p] = lire(PR + 'diffs/' + v + '.diff'); ok(r.status === 1 && sha(r.stdout) === h && shaF(PR + 'diffs/' + v + '.diff') === h, 'P10 diff relu et diff régénéré identiques, octet pour octet : ' + v, h);
  const s = style(lire(p)); ok(s !== 'mixte' && s === style(lire(PR + v)), 'P11 fins de ligne homogènes et égales à celles du gabarit : ' + v, s);
  const H = hunks(relus[p]); const t = LFs(lire(p)); ok(H.length > 0 && H.every(({ a, b }) => a && t.split(a).length === 2 && t.split(b).length === 1), 'P12 ancres uniques, ajouts absents du texte : ' + v, H.length + ' hunk(s)');
  const g = poser(lire(p), H); ok(sha(Buffer.from(g, 'utf8')) === gab, 'P13 résultat des hunks = gabarit relu : ' + v, gab);
  sorties[p] = remplir(g); ok(!sorties[p].includes(VD) && !sorties[p].includes(VS), 'P14 variables toutes remplies : ' + v);
}
const ap0 = apercu(); ok(ap0.vide, 'P15 aperçu de synchronisation vide', fin(ap0.r));
const rel0 = relais(); ok(rel0.code === 1 && rel0.fin === '29 conformes sur 30' && rel0.ids === 'C9b', 'P16 relais de départ : 29 sur 30, C9b seul', rel0.fin + ' ; écarts : ' + rel0.ids);
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'P17 ' + n + ' conforme', 'code ' + r.code); }
const blocs0 = blocs(); const avant = Object.fromEntries(D.map(([p]) => [p, lire(p)])); const arbre0 = instantane();

dire('--- Sauvegarde et application');
for (const [p] of D) { mkdirSync(dirname(join(root, DEP + p)), { recursive: true }); copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === shaF(p), 'original sauvegardé : ' + p, shaF(p)); }
ecrit = true;
for (const [p] of D) { writeFileSync(join(root, p), sorties[p]); ok(true, 'écrit : ' + p); }

dire('--- Contrôles après application');
mkdirSync(join(root, REELS), { recursive: true }); mkdirSync(join(root, SOR), { recursive: true });
for (const [p, v] of D) { ok(style(lire(p)) === style(avant[p]), 'C1 fins de ligne préservées : ' + p, style(lire(p))); const r = diffBrut(root, DEP + p, p); writeFileSync(join(root, REELS, v + '.diff'), r.stdout); ok(r.status === 1 && corps(r.stdout) === remplir(corps(relus[p])), 'C2 diff réel = diff relu, variables remplies, à partir du premier @@ : ' + v); }
ok(blocs().every((b, i) => b === blocs0[i] && b.includes('empreinte=fe4967cf00896f07')), 'C3 blocs a2-05:etat intacts, marqueur fe4967cf00896f07');
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**')); ok(pa(lire(ETAT)) === pa(lire(ROAD)), 'C4 « Prochaine action » identique dans les deux documents');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2} \| /.test(l)); const j0 = jr(avant[ETAT]), j1 = jr(lire(ETAT)); ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'C5 journal historique intact, une ligne ajoutée', j1.length + ' lignes');
const b0 = avant[BIL].replace(/(\r?\n)+$/, ''), b1 = lire(BIL), reste = b1.slice(b0.length); ok(b1.startsWith(b0) && /^\s*### 8\.118 /.test(reste) && reste.split('### 8.').length === 2, 'C6 §8.117 et bilan antérieur inchangés, §8.118 seul ajouté');
ok(shaF(CIBLE) === shaA10 && Object.entries(INSTALLES).every(([p, h]) => shaF(p) === h), 'C7 A10, sommaire, contrôle et `.gitattributes` inchangés');
for (const [p, h] of Object.entries(PRESERVES)) ok(shaF(p) === h, 'C8 préservé : ' + p);
const ap1 = apercu(); ok(ap1.vide, 'C9 aperçu vide', fin(ap1.r));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 45 rapports contrôlés, identiques/.test(emp.out), 'C10 manifeste : 45 empreintes conformes', emp.out.slice(0, 80));
const rel = relais(); ok(rel.code === 1 && rel.fin === '29 conformes sur 30' && rel.ids === 'C9b', 'C11 relais : 29 sur 30, C9b seul', rel.fin + ' ; écarts : ' + rel.ids);
const st = relais('--strict'); ok(st.ids === 'C9b', 'C11 bis relais --strict : C9b seul', st.fin + ' ; écarts : ' + st.ids);
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'C12 ' + n, 'code ' + r.code); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(cov.out), 'C13 couverture : 360/377, 17 restants', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C14 204 corrections dans 177 ENTRY, aucune appliquée ; V1-32 libre', etat());
for (const a of ['assemble', 'verify']) { const r = spawnSync(process.execPath, [join(root, 'tools/reconstruction/run.mjs'), a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(r.status === 0, 'C15 run.mjs ' + a, 'code ' + r.status); }
const t = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); const n = (k) => ((t.stdout ?? '').match(new RegExp('^. ' + k + ' (\\d+)$', 'm')) ?? [])[1]; ok(t.status === 0 && n('tests') === '510' && n('pass') === '510', 'C16 510 tests', 'code ' + t.status + ' ; ' + n('pass') + ' sur ' + n('tests'));
const arbre1 = instantane(); const mod = [...new Set([...Object.keys(arbre0), ...Object.keys(arbre1)])].filter((p) => arbre0[p] !== arbre1[p]).sort(); ok(JSON.stringify(mod) === JSON.stringify(D.map(([p]) => p).sort()), 'C17 arbre entier comparé : les trois fichiers visés seuls', Object.keys(arbre1).length + ' fichiers');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C18 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C19 git diff --check', 'code ' + dc.status);
const FIN = 'consignation de l\'installation d\'A10 conforme, date effective ' + date;
writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n' + FIN + '\n'); console.log(FIN);
process.exit(0);
