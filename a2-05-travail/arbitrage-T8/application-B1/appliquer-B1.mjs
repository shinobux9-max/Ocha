// A2-05 · T8 : opération B1 (autorisée le 2026-10-31) : rapport arbitré de T8 ajouté comme 43e entrée du manifeste, par l'outil prévu, une seule fois ; puis
// aperçu de synchronisation B2 rétabli sur le dépôt réel, sans application. Usage : node a2-05-travail/arbitrage-T8/application-B1/appliquer-B1.mjs <racine du dépôt>
// (1) Préconditions, sans écriture, dont l'accord de la date de l'outil (UTC) et du jour local. (2) Prévisualisation sur une copie jetable du dépôt réel : ajout
// réel de l'outil, daté du jour. (3) Manifeste sauvegardé, ajout une fois ; le manifeste écrit doit égaler la prévisualisation, octet pour octet. (4) Contrôles.
// (5) Aperçu B2. Arrêt au premier groupe en écart ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, copyFileSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T = W + 'arbitrage-T8/', B = T + 'application-B1/', DEP = B + 'depart/', SOR = B + 'sorties/', AB2 = B + 'apercu-B2/';
const MAN = W + 'empreintes-rapports-arbitres.json', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md', SAUV = T + 'proposition-T8.md', APERCU = W + 'sync-stable-apercu.md';
const MAN_SHA = 'c4d49fa6fd5feaac4653d5079ec8eb5cedd71fab89dd975437c1d662d32e6b0f'; // manifeste à 42 entrées, relu à E2 : fixe valeurs et ordre
const RAP_SHA = 'dae4d0579d539e923183b88b0443560a2d79af7a2701144cac3cfea9584410e8', SAUV_SHA = '2a42fb8458502a1f41f37a2d0560e5016c186a803ad653edc96437bd1b559c9d';
const APRES_A = { // empreintes relues à l'étape A : aucune modification imprévue
  [W + 'audit-v1-lot3-T8.mjs']: 'cdb5ca0b64786027f333e0a33333ae5948721e8a1fbd3d0065dcb596449e08dd',
  'docs/rapports/etape2-A2-05-bilan-volet2.md': '93bbdaac174df0f49e23c9f353f3e67ae6a4618c37b601285049067a17460c16',
  'ETAT-ACTUEL.md': '368e1bf4f6093561271bc7ad10748176ef983a35058b7ffa01bfd316b21dc03a',
  'ROADMAP.md': 'f677083f11516470ffe6ac7e21516f36c9584ea3cb715d3f778ed78ebec4df63',
  [W + 'INVENTAIRE-SCRIPTS.md']: 'bc6ab2b97860b3b7c9052d996332be29c30027c026571fe75f2bc35cf7d4be99',
  [W + 'recalcul-T8-perimetre.mjs']: 'adb6bbdac1cdba9d9e823fc298bfece04f904065257df920d07728b96e8c5315',
};
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
const etat = () => { const r = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre}))"], { cwd: root, encoding: 'utf8' }); return (r.stdout ?? '').trim(); };
const ETAT_ATTENDU = '{"arbitres":336,"restants":41,"proposes":0,"corrections":197,"entry":172,"libre":"V1-25"}';
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || p.startsWith(B + 'depart') || p.startsWith(SOR) || p.startsWith(AB2)) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const jourLocal = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };

// (1) Préconditions
dire('--- Préconditions');
const m0 = JSON.parse(readFileSync(join(root, MAN), 'utf8')); const cles0 = Object.keys(m0.empreintes);
ok(shaF(MAN) === MAN_SHA, 'P1 manifeste à son empreinte relue : 42 entrées, dans leur ordre', MAN_SHA);
ok(cles0.length === 42 && cles0.every((p) => shaF(p) === m0.empreintes[p]) && !Object.hasOwn(m0.empreintes, RAP), 'P2 42 empreintes recalculées, toutes conformes ; rapport de T8 absent');
ok(shaF(RAP) === RAP_SHA, 'P3 rapport arbitré de T8, empreinte complète', RAP_SHA);
ok(shaF(SAUV) === SAUV_SHA, 'P4 proposition originale sauvegardée intacte', SAUV_SHA);
const cov0 = lancer(W + 'couverture-lot3.mjs'); ok(cov0.code === 0 && /336 arbitrés, 0 proposés, 41 restants, sur 377/.test(cov0.out), 'P5 couverture : 336/377, 41 restants');
ok(etat() === ETAT_ATTENDU, 'P6 corrections : 197 dans 172 ENTRY ; V1-25 libre', etat());
const pasBon = JSON.parse(readFileSync(join(root, 'data/n5/vocab.json'), 'utf8')).find((e) => e.id === 'v_427').senses[0].meaning.alternatives;
ok(JSON.stringify(pasBon) === '["Pas bon"]', 'P7 aucune correction appliquée : `v_427_s1` publie toujours « Pas bon »');
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 1 && fin(rel0) === '28 conformes sur 30' && ecarts(rel0) === 'C8,C9a', 'P8 relais : 28 sur 30, C8 et C9a seuls', fin(rel0) + ' ; ' + ecarts(rel0));
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P9 index vide');
ok(!existsSync(join(root, DEP)) && !existsSync(join(root, AB2)), 'P10 sauvegarde et aperçu B2 absents');
const imp = Object.entries(APRES_A).filter(([p, h]) => shaF(p) !== h).map(([p]) => p);
ok(!imp.length && !git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim(), 'P11 aucune modification imprévue : documents de l\'étape A à leurs empreintes, zones git sans modification', imp.join(', ') || Object.keys(APRES_A).length + ' fichiers');
const JOUR = new Date().toISOString().slice(0, 10);
ok(JOUR === jourLocal(), 'P12 date de l\'outil (UTC) = jour local : l\'ajout sera daté du jour effectif', 'UTC ' + JOUR + ' ; local ' + jourLocal());
arretSi('avant écriture : aucun fichier modifié');

// (2) Prévisualisation sur une copie jetable du dépôt réel, par l'outil prévu
dire('--- Prévisualisation');
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-b1-t8-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'V1 copie identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const av = lancerIn(C, W + 'empreintes-lot3.mjs', '--ajouter');
const prev = readFileSync(join(C, MAN)); const m1 = JSON.parse(prev); const cles1 = Object.keys(m1.empreintes);
ok(av.code === 0 && JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify([MAN]), 'V2 l\'ajout ne change que le manifeste', fin(av));
ok(cles1.length === 43 && cles1[42] === RAP && m1.empreintes[RAP] === RAP_SHA, 'V3 rapport arbitré de T8 en 43e position, à son empreinte');
ok(cles0.every((k, i) => cles1[i] === k && m1.empreintes[k] === m0.empreintes[k]), 'V4 les 42 entrées précédentes conservées en valeur et en ordre');
ok(m1.ajouts.length === m0.ajouts.length + 1 && JSON.stringify(m1.ajouts.slice(0, -1)) === JSON.stringify(m0.ajouts) && JSON.stringify(m1.ajouts.at(-1)) === JSON.stringify({ date: JOUR, chemins: [RAP] }), 'V5 un seul nouvel élément dans `ajouts`, daté du jour effectif', JOUR);
rmSync(tmp, { recursive: true, force: true });
arretSi('avant écriture : aucun fichier modifié');

// (3) Sauvegarde et ajout, une seule fois
dire('--- Ajout');
mkdirSync(join(root, DEP), { recursive: true }); mkdirSync(join(root, SOR), { recursive: true });
copyFileSync(join(root, MAN), join(root, DEP, 'empreintes-rapports-arbitres.json'));
ok(shaF(DEP + 'empreintes-rapports-arbitres.json') === MAN_SHA, 'manifeste sauvegardé');
arretSi('sauvegarde incomplète : manifeste non modifié');
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter');
ok(aj.code === 0, 'ajout, une fois', fin(aj));
ok(Buffer.compare(readFileSync(join(root, MAN)), prev) === 0, 'manifeste écrit = prévisualisation, octet pour octet', shaF(MAN));
arretSi('état atteint conservé, aucune réparation');

// (4) Contrôles
dire('--- Contrôles après B1');
const m2 = JSON.parse(readFileSync(join(root, MAN), 'utf8')); const cles2 = Object.keys(m2.empreintes);
ok(cles2.length === 43 && cles2.every((p) => shaF(p) === m2.empreintes[p]), 'C1 43 empreintes recalculées, toutes conformes');
ok(cles0.every((k, i) => cles2[i] === k && m2.empreintes[k] === m0.empreintes[k]), 'C2 les 42 premières intactes, en valeur et en ordre');
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 43 rapports contrôlés, identiques/.test(emp.out), 'C3 outil d\'empreintes', emp.out.slice(0, 80));
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'C4 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 1 && fin(rel) === '29 conformes sur 30' && ecarts(rel) === 'C8', 'C5 relais : 29 sur 30, C8 seul', fin(rel) + ' ; ' + ecarts(rel));
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && cov.out === cov0.out, 'C6 couverture inchangée : 336/377, 41 restants', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C7 corrections inchangées : 197 dans 172 ENTRY ; V1-25 libre', etat());
const ch = diffI(reel0, instantane(root)); ok(JSON.stringify(ch) === JSON.stringify([MAN]), 'C8 seul le manifeste a changé', ch.join(', '));
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C9 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C10 git diff --check', 'code ' + dc.status);
arretSi('état atteint conservé, aucune réparation ; aperçu B2 non généré');

// (5) Aperçu B2, sur le dépôt réel, sans application
dire('--- Aperçu B2, non appliqué');
const av0 = [shaF('ETAT-ACTUEL.md'), shaF('ROADMAP.md')];
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const texte = readFileSync(join(root, APERCU), 'utf8');
const ch2 = texte.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
ok(ap.code === 0 && plan && ch2.length === 12 && ch2.filter((l) => l.startsWith('+')).length === 6, 'B2-1 aperçu rétabli sur le dépôt réel : douze lignes, six de chaque sens', 'plan ' + plan);
for (const re of [/^\+- \*\*Lot 3\*\* : 336 sens arbitrés sur 377 ; 41 restent \(0 proposés\)/, /^\+- \*\*Contrôles\*\* .* 43 rapports arbitrés identiques/, /^\+<!-- a2-05:etat:debut empreinte=/]) ok(ch2.filter((l) => re.test(l)).length === 2, 'B2-2 ligne prévue, deux fois : ' + re.source.slice(3, 40));
ok(!ch2.some((l) => /Corrections retenues/.test(l)), 'B2-2 ligne des corrections inchangée');
ok(shaF('ETAT-ACTUEL.md') === av0[0] && shaF('ROADMAP.md') === av0[1], 'B2-3 documents de pilotage non modifiés : B2 non appliquée');
mkdirSync(join(root, AB2), { recursive: true }); writeFileSync(join(root, AB2, 'apercu.md'), texte); writeFileSync(join(root, AB2, 'plan.txt'), 'plan ' + plan + '\nsha256 de l\'aperçu ' + sha(texte) + '\nmanifeste ' + shaF(MAN) + '\n');
dire('plan ' + plan + ' ; aperçu ' + sha(texte));
writeFileSync(join(root, SOR, 'application-B1.txt'), trace.join('\n') + '\n' + (ko ? ko + ' écart(s)\n' : 'B1 conforme ; B2 préparée, non appliquée\n'));
console.log(ko ? ko + ' écart(s)' : 'B1 conforme ; B2 préparée, non appliquée');
process.exit(ko ? 1 : 0);
