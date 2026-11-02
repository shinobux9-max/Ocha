// A2-05 · T9 : opération O2 (autorisée le 2026-11-01) : périmètre accepté de T9 ajouté comme 44e entrée du manifeste, par l'outil prévu, une seule fois ; puis aperçu de
// synchronisation O3 rétabli sur le dépôt réel, sans application. Usage : node a2-05-travail/arbitrage-T9/application-O2/appliquer-O2.mjs <racine du dépôt>
// (1) Préconditions, sans écriture, dont l'accord de la date de l'outil (UTC) et du jour local : si elles diffèrent, arrêt sans écrire, jamais d'antidatation. (2) Prévisualisation
// sur une copie jetable du dépôt réel. (3) Manifeste sauvegardé, ajout une fois ; le manifeste écrit doit égaler la prévisualisation, octet pour octet. (4) Contrôles. (5) Aperçu O3.
// Arrêt au premier écart, avant ou après écriture ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, copyFileSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T9 = W + 'arbitrage-T9/', A = T9 + 'application-O2/', DEP = A + 'depart/', SOR = A + 'sorties/', AO3 = A + 'apercu-O3/';
const MAN = W + 'empreintes-rapports-arbitres.json', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md', SAUV = T9 + 'proposition-T9-perimetre.md', RT8 = 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md', APERCU = W + 'sync-stable-apercu.md', REC = W + 'recalcul-T9-perimetre.mjs', GEN = W + 'perimetre-v2.mjs', CRB = W + 'criblage/resultat.json';
const MAN_SHA = 'eeeda756c00d09ebeaed8ef1e70c816d4b7f1d697acf3984fadbe9fc1d1163e9', ORDRE_43 = 'cd85be623e87b1a3d50c82180472cab375f128af44d9dad8d616c6034a653bad';
const RAP_SHA = '85faf16c39db3e262524bb98b6fa8e6f60afe97a37d694e8119d7a5138933e88', SAUV_SHA = '01b9bf833a66fd56a8183ee24fb4c47a11506be2d687dc09b3cabab604d84205', GEN_SHA = 'd40aea3cc3e7916d1194b143563292c8e0bb8cba95f7da02c18332beb5ecfaac', CRB_SHA = 'aef9e029f25c17d36200587d5f7cee01035444868f54c453f30d19b6bff0060d';
const APRES_O1 = { 'ETAT-ACTUEL.md': 'c3d5294ce301189aa72d59f97a884ad951d6ae99aa3d9c930a170c35f3aa924e', 'ROADMAP.md': 'ff396316ceb858c33a412d6e71f48a4628fb6c8d1f75a09cb2b0d953c86f43fe', 'docs/rapports/etape2-A2-05-bilan-volet2.md': '40193ee0faab8058e7fc45d235fd1662206201ba77e292c7dfa18ec5055054f8', [W + 'INVENTAIRE-SCRIPTS.md']: 'c716a1ef9a742a7674a1a721e3293c6e898d222a89aa8f4fccfc824b2401026b', [REC]: '63aaa07c854fd6a79eba540f6b63c0bb5fbec8159b72a6eb74d035d7567f8a06', [W + 'perimetre-T9.mjs']: '5be53f3afb737ada4a8d11087f76bd6a923fee971addd146c2b80cd1782ad2d6' };
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const trace = []; let ecrit = false;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
// Arrêt au premier écart ; après écriture, la trace est conservée et l'état atteint n'est pas réparé
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (b) return; dire('ARRÊT : premier écart, ' + (ecrit ? 'état atteint conservé, aucune réparation' : 'avant écriture du manifeste')); if (ecrit) { mkdirSync(join(root, SOR), { recursive: true }); writeFileSync(join(root, SOR, 'application-O2.txt'), trace.join('\n') + '\n'); } process.exit(1); };
const lancerIn = (r, s, ...a) => { const x = spawnSync(process.execPath, [join(r, s), r, ...a], { cwd: r, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const lancer = (s, ...a) => lancerIn(root, s, ...a);
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const fin = (r) => r.out.split('\n').pop();
const ecarts = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim().split(/\s+/)[1]).sort().join(',');
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
const etat = () => { const r = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }); return (r.stdout ?? '').trim(); };
const ETAT_ATTENDU = '{"arbitres":336,"restants":41,"proposes":0,"corrections":197,"entry":172,"libre":"V1-25","reserves":["V1-22","V1-23"]}';
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || [DEP, SOR, AO3].some((x) => (p + '/').startsWith(x))) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const jourLocal = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim();
const pasBon = () => JSON.stringify(JSON.parse(readFileSync(join(root, 'data/n5/vocab.json'), 'utf8')).find((e) => e.id === 'v_427').senses[0].meaning.alternatives) === '["Pas bon"]';
const AUTRES = [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']];
const m0 = JSON.parse(readFileSync(join(root, MAN), 'utf8')); const c0 = Object.keys(m0.empreintes);

// (1) Préconditions
dire('--- Préconditions');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P1 index vide');
ok(!existsSync(join(root, DEP)) && !existsSync(join(root, AO3)), 'P2 sauvegarde et aperçu O3 absents');
ok(shaF(MAN) === MAN_SHA && c0.length === 43 && c0.every((p) => shaF(p) === m0.empreintes[p]) && sha(c0.join('\n')) === ORDRE_43 && c0[42] === RT8 && !c0.includes(RAP), 'P3 manifeste : 43 empreintes conformes, dans leur ordre historique ; périmètre de T9 absent', MAN_SHA);
ok(shaF(RAP) === RAP_SHA && /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-11-01 \(§0\)\.\*\*/m.test(readFileSync(join(root, RAP), 'utf8')), 'P4 périmètre accepté de T9, empreinte complète', RAP_SHA);
ok(shaF(SAUV) === SAUV_SHA, 'P5 proposition originale sauvegardée, empreinte complète', SAUV_SHA);
const imp = Object.entries(APRES_O1).filter(([p, h]) => shaF(p) !== h).map(([p]) => p); ok(!imp.length, 'P6 documents à leur empreinte d\'après O1', imp.join(', ') || Object.keys(APRES_O1).length + ' fichiers');
ok(shaF(GEN) === GEN_SHA && shaF(CRB) === CRB_SHA, 'P7 générateur et criblage inchangés ; correctif RES non appliqué', GEN_SHA.slice(0, 12) + '… ; ' + CRB_SHA.slice(0, 12) + '…');
const r9 = lancer(REC); const n9 = r9.out.split('\n').filter((l) => l.startsWith('conforme ')).length; ok(r9.code === 0 && n9 === 33, 'P8 recalcul de T9 : 33 contrôles conformes', n9 + ' ; code ' + r9.code);
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 1 && fin(rel0) === '29 conformes sur 30' && ecarts(rel0) === 'C9a', 'P9 relais : 29 sur 30, C9a seul', fin(rel0) + ' ; ' + ecarts(rel0));
const cov0 = lancer(W + 'couverture-lot3.mjs'); ok(cov0.code === 0 && /336 arbitrés, 0 proposés, 41 restants, sur 377/.test(cov0.out), 'P10 couverture : 336/377, 41 restants');
ok(etat() === ETAT_ATTENDU, 'P11 197 corrections dans 172 ENTRY ; V1-22 et V1-23 réservés ; V1-25 libre', etat());
ok(pasBon(), 'P12 aucune correction appliquée : `v_427_s1` publie toujours « Pas bon »');
ok(!zones(), 'P13 zones data, reconstruction, tests, tools, docs/conception sans modification');
const JOUR = new Date().toISOString().slice(0, 10);
ok(JOUR === jourLocal(), 'P14 date de l\'outil (UTC) = jour local : l\'ajout sera daté du jour effectif ; sinon arrêt sans écrire', 'UTC ' + JOUR + ' ; local ' + jourLocal());

// (2) Prévisualisation sur une copie jetable du dépôt réel, par l'outil prévu
dire('--- Prévisualisation');
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-o2-t9-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'V1 copie identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const av = lancerIn(C, W + 'empreintes-lot3.mjs', '--ajouter'); const prev = readFileSync(join(C, MAN)); const m1 = JSON.parse(prev); const c1 = Object.keys(m1.empreintes);
ok(av.code === 0 && JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify([MAN]), 'V2 l\'ajout ne change que le manifeste', fin(av));
ok(c1.length === 44 && c1[43] === RAP && m1.empreintes[RAP] === RAP_SHA, 'V3 périmètre accepté de T9 en 44e position, à son empreinte');
ok(c0.every((k, i) => c1[i] === k && m1.empreintes[k] === m0.empreintes[k]), 'V4 les 43 entrées précédentes conservées en valeur et en ordre');
ok(m1.ajouts.length === m0.ajouts.length + 1 && JSON.stringify(m1.ajouts.slice(0, -1)) === JSON.stringify(m0.ajouts) && JSON.stringify(m1.ajouts.at(-1)) === JSON.stringify({ date: JOUR, chemins: [RAP] }), 'V5 un seul nouvel élément dans `ajouts`, daté du jour effectif', JOUR);
rmSync(tmp, { recursive: true, force: true });

// (3) Sauvegarde et ajout, une seule fois
dire('--- Ajout');
mkdirSync(join(root, DEP), { recursive: true }); mkdirSync(join(root, SOR), { recursive: true });
copyFileSync(join(root, MAN), join(root, DEP, 'empreintes-rapports-arbitres.json'));
ok(shaF(DEP + 'empreintes-rapports-arbitres.json') === MAN_SHA, 'manifeste sauvegardé', MAN_SHA);
ecrit = true;
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter');
ok(aj.code === 0, 'ajout, une fois', fin(aj));
ok(Buffer.compare(readFileSync(join(root, MAN)), prev) === 0, 'manifeste écrit = prévisualisation, octet pour octet', shaF(MAN));

// (4) Contrôles
dire('--- Contrôles après O2');
const r = git('diff', '--no-index', '--no-color', '--', DEP + 'empreintes-rapports-arbitres.json', MAN); writeFileSync(join(root, SOR, 'manifeste.diff'), r.stdout);
const m2 = JSON.parse(readFileSync(join(root, MAN), 'utf8')); const c2 = Object.keys(m2.empreintes);
ok(c2.length === 44 && c2.every((p) => shaF(p) === m2.empreintes[p]) && c2[43] === RAP, 'C1 44 empreintes recalculées, toutes conformes ; périmètre de T9 en 44e');
ok(c0.every((k, i) => c2[i] === k && m2.empreintes[k] === m0.empreintes[k]), 'C2 les 43 premières intactes, en valeur et en ordre');
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 44 rapports contrôlés, identiques$/.test(emp.out), 'C3 outil d\'empreintes', emp.out.slice(0, 80));
const r9b = lancer(REC); const n9b = r9b.out.split('\n').filter((l) => l.startsWith('conforme ')).length; ok(r9b.code === 0 && n9b === 33, 'C4 recalcul de T9 : 33 contrôles conformes', n9b + ' ; code ' + r9b.code);
for (const [n, s] of AUTRES) { const x = lancer(s); ok(x.code === 0, 'C5 ' + n, 'code ' + x.code + ' ; ' + fin(x)); }
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C6 relais : 30 sur 30', fin(rel));
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && cov.out === cov0.out, 'C7 couverture inchangée : 336/377, 41 restants', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C8 197 corrections dans 172 ENTRY ; V1-22 et V1-23 réservés ; V1-25 libre', etat());
ok(pasBon(), 'C9 aucune correction appliquée : `v_427_s1` publie toujours « Pas bon »');
const ch = diffI(reel0, instantane(root)); ok(JSON.stringify(ch) === JSON.stringify([MAN]) && !zones(), 'C10 arbre entier comparé : seul le manifeste a changé', ch.join(', '));
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C11 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C12 git diff --check', 'code ' + dc.status);

// (5) Aperçu O3, sur le dépôt réel, sans application : plan calculé ici, jamais repris d'une simulation
dire('--- Aperçu O3, non appliqué');
const av0 = [shaF('ETAT-ACTUEL.md'), shaF('ROADMAP.md')];
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const texte = readFileSync(join(root, APERCU), 'utf8'); const ch2 = changees(texte);
ok(ap.code === 0 && plan && ch2.length === 8 && ch2.filter((l) => l.startsWith('+')).length === 4, 'O3-1 aperçu rétabli sur le dépôt réel : huit lignes, quatre de chaque sens', 'plan ' + plan);
for (const re of [/^\+- \*\*Contrôles\*\* .* 44 rapports arbitrés identiques/, /^\+<!-- a2-05:etat:debut empreinte=/]) ok(ch2.filter((l) => re.test(l)).length === 2, 'O3-2 ligne prévue, deux fois : ' + re.source.slice(3, 40));
ok(!ch2.some((l) => /Corrections retenues|\*\*Lot 3\*\*/.test(l)), 'O3-2 lignes des corrections et du lot 3 inchangées');
ok(shaF('ETAT-ACTUEL.md') === av0[0] && shaF('ROADMAP.md') === av0[1], 'O3-3 documents de pilotage non modifiés : O3 non appliquée');
mkdirSync(join(root, AO3), { recursive: true }); writeFileSync(join(root, AO3, 'apercu.md'), texte); writeFileSync(join(root, AO3, 'plan.txt'), 'plan ' + plan + '\nsha256 de l\'aperçu ' + sha(texte) + '\nmanifeste ' + shaF(MAN) + '\n');
dire('plan ' + plan + ' ; aperçu ' + sha(texte) + ' ; manifeste ' + shaF(MAN));
writeFileSync(join(root, SOR, 'application-O2.txt'), trace.join('\n') + '\nO2 conforme ; O3 préparée, non appliquée\n');
console.log('O2 conforme ; O3 préparée, non appliquée');
process.exit(0);
