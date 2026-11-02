// A2-05 · T9 : opération B1 (autorisée le 2026-11-01) : installation des deux recalculs approuvés, contrôlés avant l'ajout ; puis rapport arbitré de T9 ajouté comme
// 45e entrée du manifeste, par l'outil prévu, une seule fois ; puis aperçu de synchronisation B2 rétabli sur le dépôt réel, sans application.
// Usage : node a2-05-travail/arbitrage-T9/application-B1/appliquer-B1.mjs <racine du dépôt>
// (1) Préconditions, sans écriture, dont l'accord de la date de l'outil (UTC) et du jour local : si elles diffèrent, arrêt sans écrire, jamais d'antidatation.
// (2) Prévisualisation sur une copie jetable du dépôt réel : installation, ajout réel de l'outil, daté du jour. (3) Sauvegarde des deux recalculs et du manifeste ;
// installation ; contrôle des recalculs avant l'ajout. (4) Dates revérifiées, ajout une fois ; le manifeste écrit doit égaler la prévisualisation, octet pour octet.
// (5) Contrôles. (6) Aperçu B2. Arrêt au premier groupe en écart ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, copyFileSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T = W + 'arbitrage-T9/', INS = T + 'inscription/', B = T + 'application-B1/', DEP = B + 'depart/', SOR = B + 'sorties/', AB2 = B + 'apercu-B2/';
const MAN = W + 'empreintes-rapports-arbitres.json', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9.md', SAUV = T + 'proposition-T9.md', APERCU = W + 'sync-stable-apercu.md', REC = W + 'recalcul-T9-perimetre.mjs', REC8 = W + 'recalcul-T8-perimetre.mjs';
const MAN_SHA = '2c74018e3b04c06395298e2452d039de409353aae8a62d5d7d99cf43e01f78e3'; // manifeste à 44 entrées, relu : fixe valeurs et ordre
const RAP_SHA = '73d4dee6568694cc4509d00a084b8f3b1581f8404d65f88b2a61be074c80df6a', SAUV_SHA = '986c2439994a0bc100d314026c185257b34f5039da76f16bc7e819ea1d5e31eb';
// recalcul en service, version approuvée, empreinte de départ, empreinte approuvée, empreinte du diff relu
const RECS = [
  [REC, 'proposition-recalcul-T9-perimetre-arbitre.mjs', 'af7331546832faf98d35f9e22687294b5505cbad4906633927cf2d028fc58929', '46c5134fdf7f4762751ed19e6f41810743117a86367f3db1d4df71001d392587', '8620e00ef15582786ab4a58161cc6ec689ede4ef661263cc087bad8e5f67ac0f'],
  [REC8, 'proposition-recalcul-T8-perimetre-apres-T9.mjs', 'adb6bbdac1cdba9d9e823fc298bfece04f904065257df920d07728b96e8c5315', 'c2d5301b06e816f3a6c98d2caa6a0daf36a6b19a824fbeb4a874fdb181b7f860', 'fa0972418809b66e2d8f188d7f80d025e066a23a0c894c5716009e9901a96fde'],
];
const APRES_A = { // empreintes relues à l'étape A : aucune modification imprévue
  [W + 'audit-v1-lot3-T9.mjs']: '43700109048492a62695c36d2dd49ad9a57688a2f64b6c6810cc8a48baac69db',
  'docs/rapports/etape2-A2-05-bilan-volet2.md': '03b107ad5d216003f91643480b430e79c7ec191c6b6135b84567b724874f4d1c',
  'ETAT-ACTUEL.md': '09ca5546e383daeeabed02bf47c1f481b55b64c4b780f2744a04e1538196ca23',
  'ROADMAP.md': '92a30847df5beb742be6ea8f83b0b105d2f3f82af3185cb7363ec32e79850b04',
  [W + 'INVENTAIRE-SCRIPTS.md']: 'ee14749cbe6372dd3126e6957fce25b8c8cbaeac44b4643ef62a0a8eca30dfd1',
};
const TRANS_T9 = ['sens non encore examinés', 'restants par tranche du registre', 'corrections retenues sur les ENTRY de T9'], TRANS_T8 = ['restants par tranche du registre', 'inventaire des 57 du rapport'];
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
const lignesE = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim());
const ecarts = (r) => lignesE(r).map((l) => l.split(/\s+/)[1]).sort().join(',');
const seuls = (r, att) => { const e = lignesE(r); return r.code === 1 && e.length === att.length && att.every((a) => e.some((l) => l.includes(a))); };
const etat = () => { const r = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }); return (r.stdout ?? '').trim(); };
const ETAT_ATTENDU = '{"arbitres":360,"restants":17,"proposes":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"]}';
const restantsF = () => spawnSync(process.execPath, ['--input-type=module', '-e', "import {couverture} from './a2-05-travail/couverture-lot3.mjs'; const s=couverture('.').sens.filter((x)=>x.etat!=='arbitré'); console.log(s.length, [...new Set(s.map((x)=>x.livraison))].sort().join())"], { cwd: root, encoding: 'utf8' }).stdout.trim();
const pasAppliquees = () => { const v = JSON.parse(readFileSync(join(root, 'data/n5/vocab.json'), 'utf8')); const e = (id) => v.find((x) => x.id === id); const fns = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse]; return JSON.stringify(e('v_348').senses[1].meaning.alternatives) === '["Auparavant"]' && !fns(e('v_285').senses[0]).length && !fns(e('v_704').senses[1]).length && JSON.stringify(e('v_594').tags) === '["lieu_konbini","lieu_restaurant"]' && ['v_91', 'v_92', 'v_459'].every((id) => JSON.stringify(e(id).tags) === '["lieu_restaurant"]') && JSON.stringify(e('v_427').senses[0].meaning.alternatives) === '["Pas bon"]'; };
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || p.startsWith(B + 'depart') || p.startsWith(SOR) || p.startsWith(AB2)) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const jourLocal = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const jourUTC = () => new Date().toISOString().slice(0, 10);

// (1) Préconditions
dire('--- Préconditions');
const m0 = JSON.parse(readFileSync(join(root, MAN), 'utf8')); const cles0 = Object.keys(m0.empreintes);
ok(shaF(MAN) === MAN_SHA, 'P1 manifeste à son empreinte relue : 44 entrées, dans leur ordre', MAN_SHA);
ok(cles0.length === 44 && cles0.every((p) => shaF(p) === m0.empreintes[p]) && !Object.hasOwn(m0.empreintes, RAP), 'P2 44 empreintes recalculées, toutes conformes ; rapport de T9 absent');
ok(shaF(RAP) === RAP_SHA, 'P3 rapport arbitré de T9, empreinte complète', RAP_SHA);
ok(shaF(SAUV) === SAUV_SHA, 'P4 proposition originale sauvegardée intacte', SAUV_SHA);
for (const [c, v, e, p, h] of RECS) {
  ok(shaF(c) === e, 'P5 recalcul en service à son empreinte de départ : ' + c, e);
  ok(shaF(INS + v) === p, 'P6 version approuvée à son empreinte complète : ' + v, p);
  const r = git('diff', '--no-index', '--no-color', '--', c, INS + v); const n = c.split('/').pop() + '.diff';
  ok(r.status === 1 && sha(r.stdout) === h && shaF(INS + 'diffs/' + n) === h, 'P7 diff régénéré identique au diff relu, octet pour octet : ' + n, sha(r.stdout));
}
const cov0 = lancer(W + 'couverture-lot3.mjs'); ok(cov0.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(cov0.out), 'P8 couverture : 360/377, 17 restants', cov0.out.slice(0, 70));
ok(restantsF() === '17 F1,F2', 'P8 bis les 17 restants sont tous dans le bloc F', restantsF());
ok(etat() === ETAT_ATTENDU, 'P9 corrections : 204 dans 177 ENTRY ; V1-22 et V1-23 réservés ; V1-32 libre', etat());
ok(pasAppliquees(), 'P10 aucune correction appliquée : V1-25 à V1-31 aux valeurs « avant » ; `v_427_s1` publie toujours « Pas bon »');
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 1 && fin(rel0) === '28 conformes sur 30' && ecarts(rel0) === 'C8,C9a', 'P11 relais : 28 sur 30, C8 et C9a seuls', fin(rel0) + ' ; ' + ecarts(rel0));
const r90 = lancer(REC), r80 = lancer(REC8);
ok(seuls(r90, TRANS_T9), 'P12 recalcul de T9 en service : ses trois écarts transitoires seuls', fin(r90));
ok(seuls(r80, TRANS_T8), 'P13 recalcul de T8 en service : ses deux écarts transitoires seuls', fin(r80));
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P14 index vide');
ok(!existsSync(join(root, DEP)) && !existsSync(join(root, AB2)), 'P15 sauvegarde et aperçu B2 absents');
const imp = Object.entries(APRES_A).filter(([p, h]) => shaF(p) !== h).map(([p]) => p);
ok(!imp.length && !git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim(), 'P16 aucune modification imprévue : documents de l\'étape A à leurs empreintes, zones git sans modification', imp.join(', ') || Object.keys(APRES_A).length + ' fichiers');
const JOUR = jourUTC();
ok(JOUR === jourLocal(), 'P17 date de l\'outil (UTC) = jour local : l\'ajout sera daté du jour effectif ; sinon arrêt sans écrire', 'UTC ' + JOUR + ' ; local ' + jourLocal());
arretSi('avant écriture : aucun fichier modifié');

// (2) Prévisualisation sur une copie jetable du dépôt réel, par l'outil prévu
dire('--- Prévisualisation');
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-b1-t9-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'V1 copie identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
for (const [c, v] of RECS) copyFileSync(join(C, INS + v), join(C, c));
const pr9 = lancerIn(C, REC), pr8 = lancerIn(C, REC8); ok(pr9.code === 0 && pr8.code === 0, 'V2 sur la copie : les deux recalculs installés conformes, avant l\'ajout', fin(pr9) + ' ; ' + fin(pr8));
const av = lancerIn(C, W + 'empreintes-lot3.mjs', '--ajouter');
const prev = readFileSync(join(C, MAN)); const m1 = JSON.parse(prev); const cles1 = Object.keys(m1.empreintes);
ok(av.code === 0 && JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify([REC8, REC, MAN].sort()), 'V3 seuls les deux recalculs et le manifeste changent', fin(av));
ok(cles1.length === 45 && cles1[44] === RAP && m1.empreintes[RAP] === RAP_SHA, 'V4 rapport arbitré de T9 en 45e position, à son empreinte');
ok(cles0.every((k, i) => cles1[i] === k && m1.empreintes[k] === m0.empreintes[k]), 'V5 les 44 entrées précédentes conservées en valeur et en ordre');
ok(m1.ajouts.length === m0.ajouts.length + 1 && JSON.stringify(m1.ajouts.slice(0, -1)) === JSON.stringify(m0.ajouts) && JSON.stringify(m1.ajouts.at(-1)) === JSON.stringify({ date: JOUR, chemins: [RAP] }), 'V6 un seul nouvel élément dans `ajouts`, daté du jour effectif', JOUR);
rmSync(tmp, { recursive: true, force: true });
arretSi('avant écriture : aucun fichier modifié');

// (3) Sauvegarde, installation, contrôle avant l'ajout
dire('--- Sauvegarde et installation');
mkdirSync(join(root, DEP), { recursive: true }); mkdirSync(join(root, SOR), { recursive: true });
for (const p of [REC, REC8, MAN]) { const n = p.split('/').pop(); const av2 = shaF(p); copyFileSync(join(root, p), join(root, DEP, n)); ok(shaF(DEP + n) === av2, 'sauvegardé : ' + n, av2.slice(0, 12) + '…'); }
arretSi('sauvegarde incomplète : aucun fichier cible modifié');
for (const [c, v, , p] of RECS) { copyFileSync(join(root, INS + v), join(root, c)); ok(shaF(c) === p, 'installé : ' + c, p); }
arretSi('état atteint conservé, aucune réparation ; manifeste non modifié');
for (const [n, s] of [['recalcul de T9 installé', REC], ['recalcul de T8 installé', REC8]]) { ok(spawnSync(process.execPath, ['--check', join(root, s)], { encoding: 'utf8' }).status === 0, 'node --check : ' + n); const r = lancer(s); ok(r.code === 0, 'I1 ' + n + ' conforme, avant l\'ajout', 'code ' + r.code + ' ; ' + fin(r)); }
arretSi('état atteint conservé, aucune réparation ; manifeste non modifié');

// (4) Ajout, une seule fois ; dates revérifiées juste avant l'écriture du manifeste
dire('--- Ajout');
ok(jourUTC() === JOUR && jourLocal() === JOUR, 'I2 dates inchangées depuis la prévisualisation ; UTC = jour local', jourUTC() + ' ; ' + jourLocal());
arretSi('recalculs installés, manifeste non modifié, aucune réparation');
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter');
ok(aj.code === 0, 'ajout, une fois', fin(aj));
ok(Buffer.compare(readFileSync(join(root, MAN)), prev) === 0, 'manifeste écrit = prévisualisation, octet pour octet', shaF(MAN));
arretSi('état atteint conservé, aucune réparation');

// (5) Contrôles
dire('--- Contrôles après B1');
const m2 = JSON.parse(readFileSync(join(root, MAN), 'utf8')); const cles2 = Object.keys(m2.empreintes);
ok(cles2.length === 45 && cles2.every((p) => shaF(p) === m2.empreintes[p]), 'C1 45 empreintes recalculées, toutes conformes');
ok(cles0.every((k, i) => cles2[i] === k && m2.empreintes[k] === m0.empreintes[k]) && cles2[44] === RAP, 'C2 les 44 premières intactes, en valeur et en ordre ; rapport de T9 en 45e');
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 45 rapports contrôlés, identiques/.test(emp.out), 'C3 outil d\'empreintes', emp.out.slice(0, 80));
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', REC8], ['recalcul de T9', REC], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'C4 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 1 && fin(rel) === '29 conformes sur 30' && ecarts(rel) === 'C8', 'C5 relais : 29 sur 30, C8 seul', fin(rel) + ' ; ' + ecarts(rel));
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(cov.out) && restantsF() === '17 F1,F2', 'C6 couverture : 360/377, 17 restants, tous dans F', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C7 corrections : 204 dans 177 ENTRY ; V1-22 et V1-23 réservés ; V1-32 libre', etat());
ok(pasAppliquees(), 'C8 aucune correction appliquée');
const rt = readFileSync(join(root, RAP), 'utf8'); const L = rt.split('\n'), LP = readFileSync(join(root, SAUV), 'utf8').split('\n'); const a = L.indexOf('## 0. Arbitrage'), z = L.indexOf('## 1. Résultat proposé'); const sans0 = [...L.slice(0, a), ...L.slice(z)]; const st = LP.findIndex((l) => l.startsWith('**Statut** : '));
ok(shaF(RAP) === RAP_SHA && a > 0 && sans0.length === LP.length && sans0.every((l, k) => k === st || l === LP[k]) && (rt.match(/^#### `v_\d+_s\d+` · /gm) ?? []).length === 24, 'C9 §1 et 24 fiches de T9 inchangés');
const ch = diffI(reel0, instantane(root)); ok(JSON.stringify(ch) === JSON.stringify([REC8, REC, MAN].sort()), 'C10 seuls les deux recalculs et le manifeste ont changé ; normes, données, registre, décisions historiques intacts', ch.join(', '));
ok(!git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim(), 'C11 zones git sans modification');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C12 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C13 git diff --check', 'code ' + dc.status);
arretSi('état atteint conservé, aucune réparation ; aperçu B2 non généré');

// (6) Aperçu B2, sur le dépôt réel, sans application
dire('--- Aperçu B2, non appliqué');
const av0 = [shaF('ETAT-ACTUEL.md'), shaF('ROADMAP.md')];
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const texte = readFileSync(join(root, APERCU), 'utf8');
const ch2 = texte.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
ok(ap.code === 0 && plan && ch2.length === 16 && ch2.filter((l) => l.startsWith('+')).length === 8, 'B2-1 aperçu rétabli sur le dépôt réel : seize lignes, huit de chaque sens', 'plan ' + plan);
for (const re of [/^\+- \*\*Lot 3\*\* : 360 sens arbitrés sur 377 ; 17 restent \(0 proposés\)/, /^\+- \*\*Corrections retenues, non appliquées\*\* : 204, dans 177 ENTRY ; prochain numéro libre : V1-32\./, /^\+- \*\*Contrôles\*\* .* 45 rapports arbitrés identiques/, /^\+<!-- a2-05:etat:debut empreinte=/]) ok(ch2.filter((l) => re.test(l)).length === 2, 'B2-2 ligne prévue, deux fois : ' + re.source.slice(3, 44));
ok(shaF('ETAT-ACTUEL.md') === av0[0] && shaF('ROADMAP.md') === av0[1], 'B2-3 documents de pilotage non modifiés : B2 non appliquée');
mkdirSync(join(root, AB2), { recursive: true }); writeFileSync(join(root, AB2, 'apercu.md'), texte); writeFileSync(join(root, AB2, 'plan.txt'), 'plan ' + plan + '\nsha256 de l\'aperçu ' + sha(texte) + '\nmanifeste ' + shaF(MAN) + '\n');
dire('plan ' + plan + ' ; aperçu ' + sha(texte));
writeFileSync(join(root, SOR, 'application-B1.txt'), trace.join('\n') + '\n' + (ko ? ko + ' écart(s)\n' : 'B1 conforme ; B2 préparée, non appliquée\n'));
console.log(ko ? ko + ' écart(s)' : 'B1 conforme ; B2 préparée, non appliquée');
process.exit(ko ? 1 : 0);
