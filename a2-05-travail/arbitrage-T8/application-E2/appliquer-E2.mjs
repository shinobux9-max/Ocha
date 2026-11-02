// A2-05 · T8 : état E2 (autorisé le 2026-10-31) : périmètre accepté de T8 ajouté comme 42e entrée du manifeste, par l'outil prévu, une seule fois ; puis aperçu E3
// rétabli sur le dépôt réel, sans application. Usage : node a2-05-travail/arbitrage-T8/application-E2/appliquer-E2.mjs <racine du dépôt>
// (1) Préconditions, sans écriture. (2) Prévisualisation sur une copie jetable du dépôt réel, datée du jour. (3) Manifeste sauvegardé, ajout une fois ; le manifeste
// écrit doit égaler la prévisualisation, octet pour octet. (4) Contrôles. (5) Aperçu E3. Arrêt au premier groupe en écart ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, copyFileSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T = W + 'arbitrage-T8/', B = T + 'application-E2/', DEP = B + 'depart/', SOR = B + 'sorties/', AE3 = B + 'apercu-E3/';
const MAN = W + 'empreintes-rapports-arbitres.json', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md', SAUV = T + 'proposition-T8-perimetre.md', APERCU = W + 'sync-stable-apercu.md';
const MAN_SHA = 'd109766350b91e103a1190ae559cf052352607677a323fb3535c925d91ba8981'; // manifeste à 41 entrées, écrit par B1 : fixe valeurs et ordre
const RAP_SHA = '5b46f9353e38fb9f4b522d4363fe2b843de52819e214847cfdb5e35f508e96bb', SAUV_SHA = 'c087860fb89da40410a572fc48ea31d3f881713a0af24575f36e8540063d37b8';
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const trace = []; let ko = 0;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const arretSi = (e) => { if (ko) { dire('ARRÊT : ' + ko + ' écart(s), ' + e); process.exit(1); } };
const lancerIn = (r, s, ...a) => { const x = spawnSync(process.execPath, [join(r, s), r, ...a], { cwd: r, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const lancer = (s, ...a) => lancerIn(root, s, ...a);
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const fin = (r) => r.out.split('\n').pop();
const ecarts = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim().split(/\s+/)[1]).sort().join(',');
const etat = () => spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre}))"], { cwd: root, encoding: 'utf8' }).stdout.trim();
const ETAT_ATTENDU = '{"arbitres":320,"restants":57,"proposes":0,"corrections":197,"entry":172,"libre":"V1-25"}';
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || p.startsWith(DEP) || p.startsWith(SOR) || p.startsWith(AE3)) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const CTRL = [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']];

// (1) Préconditions
dire('--- Préconditions');
const m0 = JSON.parse(readFileSync(join(root, MAN), 'utf8')); const cles0 = Object.keys(m0.empreintes);
ok(shaF(MAN) === MAN_SHA, 'P1 manifeste à son empreinte : 41 entrées préservées en valeur et en ordre', MAN_SHA);
ok(cles0.length === 41 && cles0.every((p) => shaF(p) === m0.empreintes[p]) && !Object.hasOwn(m0.empreintes, RAP), 'P2 41 empreintes recalculées, toutes conformes ; rapport de T8 absent');
ok(shaF(RAP) === RAP_SHA, 'P3 rapport accepté de T8 inchangé', RAP_SHA);
ok(shaF(SAUV) === SAUV_SHA, 'P4 proposition originale sauvegardée intacte', SAUV_SHA);
const r80 = lancer(W + 'recalcul-T8-perimetre.mjs'); ok(r80.code === 0, 'P5 recalcul de T8 adapté conforme', fin(r80));
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 1 && fin(rel0) === '29 conformes sur 30' && ecarts(rel0) === 'C9a', 'P6 relais : 29 sur 30, C9a seul', fin(rel0) + ' ; ' + ecarts(rel0));
const cov0 = lancer(W + 'couverture-lot3.mjs'); ok(cov0.code === 0 && /320 arbitrés, 0 proposés, 57 restants, sur 377/.test(cov0.out), 'P7 couverture : 320/377, 57 restants');
ok(etat() === ETAT_ATTENDU, 'P8 197 corrections dans 172 ENTRY ; V1-25 libre', etat());
const pasBon = JSON.parse(readFileSync(join(root, 'data/n5/vocab.json'), 'utf8')).find((e) => e.id === 'v_427').senses[0].meaning.alternatives; ok(JSON.stringify(pasBon) === '["Pas bon"]', 'P9 aucune correction appliquée : `v_427_s1` publie toujours « Pas bon »');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P10 index vide');
ok(!existsSync(join(root, DEP)) && !existsSync(join(root, AE3)), 'P11 sauvegarde et aperçu E3 absents');
arretSi('avant écriture : aucun fichier modifié');

// (2) Prévisualisation sur une copie jetable du dépôt réel, par l'outil prévu
dire('--- Prévisualisation');
const reel0 = instantane(root); const JOUR = new Date().toISOString().slice(0, 10);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-e2-appl-t8-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'V1 copie identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const av = lancerIn(C, W + 'empreintes-lot3.mjs', '--ajouter');
const prev = readFileSync(join(C, MAN)); const m1 = JSON.parse(prev); const cles1 = Object.keys(m1.empreintes);
ok(av.code === 0 && JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify([MAN]), 'V2 différence portant exclusivement sur le manifeste', fin(av));
ok(cles1.length === 42 && cles1[41] === RAP && m1.empreintes[RAP] === RAP_SHA, 'V3 rapport accepté de T8 en 42e position, à son empreinte');
ok(cles0.every((k, i) => cles1[i] === k && m1.empreintes[k] === m0.empreintes[k]), 'V4 aucun changement des 41 entrées précédentes');
ok(m1.ajouts.length === m0.ajouts.length + 1 && JSON.stringify(m1.ajouts.slice(0, -1)) === JSON.stringify(m0.ajouts) && JSON.stringify(m1.ajouts.at(-1)) === JSON.stringify({ date: JOUR, chemins: [RAP] }), 'V5 un seul nouvel élément dans `ajouts`, daté du jour réel de l\'opération', JOUR);
rmSync(tmp, { recursive: true, force: true });
arretSi('avant écriture : aucun fichier modifié');

// (3) Sauvegarde et ajout, une seule fois
dire('--- Ajout');
mkdirSync(join(root, DEP), { recursive: true }); mkdirSync(join(root, SOR), { recursive: true });
copyFileSync(join(root, MAN), join(root, DEP, 'empreintes-rapports-arbitres.json'));
ok(shaF(DEP + 'empreintes-rapports-arbitres.json') === MAN_SHA, 'manifeste de départ sauvegardé');
arretSi('sauvegarde incomplète : manifeste non modifié');
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter');
ok(aj.code === 0, 'ajout, une fois', fin(aj));
ok(Buffer.compare(readFileSync(join(root, MAN)), prev) === 0, 'manifeste écrit = prévisualisation, octet pour octet', shaF(MAN));
arretSi('état atteint conservé, aucune réparation');

// (4) Contrôles
dire('--- Contrôles après E2');
const m2 = JSON.parse(readFileSync(join(root, MAN), 'utf8')); const cles2 = Object.keys(m2.empreintes);
ok(cles2.length === 42 && cles2.every((p) => shaF(p) === m2.empreintes[p]), 'C1 42 empreintes recalculées, toutes conformes');
ok(cles0.every((k, i) => cles2[i] === k && m2.empreintes[k] === m0.empreintes[k]), 'C2 les 41 premières intactes, dans leur ordre');
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 42 rapports contrôlés, identiques$/.test(emp.out), 'C3 outil d\'empreintes', emp.out);
for (const [n, s] of CTRL) { const r = lancer(s); ok(r.code === 0, 'C4 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C5 relais : 30 sur 30', fin(rel));
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && cov.out === cov0.out, 'C6 couverture inchangée', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C7 corrections inchangées : 197 dans 172 ENTRY ; V1-25 libre', etat());
const ch = diffI(reel0, instantane(root)); ok(JSON.stringify(ch) === JSON.stringify([MAN]), 'C8 seul le manifeste a changé', ch.join(', '));
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C9 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C10 git diff --check', 'code ' + dc.status);
arretSi('état atteint conservé, aucune réparation ; aperçu E3 non généré');

// (5) Aperçu E3, sur le dépôt réel, sans application
dire('--- Aperçu E3, non appliqué');
const av0 = [shaF('ETAT-ACTUEL.md'), shaF('ROADMAP.md')];
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const texte = readFileSync(join(root, APERCU), 'utf8');
const ch2 = texte.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
ok(ap.code === 0 && plan && ch2.length === 8 && ch2.filter((l) => l.startsWith('+')).length === 4, 'E3-1 aperçu rétabli sur le dépôt réel : huit lignes, quatre de chaque sens', 'plan ' + plan);
ok(ch2.filter((l) => /^\+.*42 rapports arbitrés identiques/.test(l)).length === 2 && ch2.filter((l) => /^\+<!-- a2-05:etat:debut empreinte=/.test(l)).length === 2 && !ch2.some((l) => /Corrections retenues|\*\*Lot 3\*\*/.test(l)), 'E3-2 marqueur et compteur seuls, dans les deux documents');
ok(shaF('ETAT-ACTUEL.md') === av0[0] && shaF('ROADMAP.md') === av0[1], 'E3-3 documents de pilotage non modifiés : E3 non appliquée');
mkdirSync(join(root, AE3), { recursive: true }); writeFileSync(join(root, AE3, 'apercu.md'), texte); writeFileSync(join(root, AE3, 'plan.txt'), 'plan ' + plan + '\nsha256 de l\'aperçu ' + sha(texte) + '\nmanifeste ' + shaF(MAN) + '\n');
dire('plan ' + plan + ' ; aperçu ' + sha(texte));
writeFileSync(join(root, SOR, 'application-E2.txt'), trace.join('\n') + '\n' + (ko ? ko + ' écart(s)\n' : 'E2 conforme ; E3 préparée, non appliquée\n'));
console.log(ko ? ko + ' écart(s)' : 'E2 conforme ; E3 préparée, non appliquée');
process.exit(ko ? 1 : 0);
