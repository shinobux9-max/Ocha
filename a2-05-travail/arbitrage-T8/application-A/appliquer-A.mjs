// A2-05 · T8 : étape A de l'inscription de l'arbitrage (autorisée le 2026-10-31). Applique exclusivement les sept diffs relus, par remplacements ciblés, et
// sauvegarde la proposition initiale. Usage : node a2-05-travail/arbitrage-T8/application-A/appliquer-A.mjs <racine du dépôt>
// (1) Préconditions, avant toute écriture : empreintes de départ et des versions proposées, diffs régénérés identiques aux diffs relus, ancres uniques,
// ajouts absents, fins de ligne, 42 empreintes, index vide, état de départ des contrôles. (2) Sept résultats calculés en mémoire, égaux aux versions relues,
// avant toute écriture. (3) Sept originaux sauvegardés, écritures, proposition sauvegardée. (4) Contrôles attendus. Arrêt au premier groupe en écart ; aucune
// réparation automatique. Code 0 seulement si tout est conforme.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T8 = W + 'arbitrage-T8/', OUT = T8 + 'inscription/', A8 = T8 + 'application-A/', DEP = A8 + 'depart/', SOR = A8 + 'sorties/', REELS = A8 + 'diffs-reels/';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', INV = W + 'INVENTAIRE-SCRIPTS.md', CFG = W + 'audit-v1-lot3-T8.mjs', REC = W + 'recalcul-T8-perimetre.mjs';
const SAUV = T8 + 'proposition-T8.md', MAN = W + 'empreintes-rapports-arbitres.json', SRC = 'proposition-T8.md', APERCU = W + 'sync-stable-apercu.md';
const PROP_SHA = '2a42fb8458502a1f41f37a2d0560e5016c186a803ad653edc96437bd1b559c9d', MAN_SHA = 'c4d49fa6fd5feaac4653d5079ec8eb5cedd71fab89dd975437c1d662d32e6b0f';
// cible, version proposée, empreinte de départ, empreinte proposée, empreinte du diff relu
const D = [
  [CFG, 'audit-v1-lot3-T8.mjs', 'fd6deeea0841e9a2fd84d2ed4825b81f52a88162b49ce20c4d92c8600a20dbba', 'cdb5ca0b64786027f333e0a33333ae5948721e8a1fbd3d0065dcb596449e08dd', 'c7f9da05ff195e15f89a16a941a616cd40ac8c6ecf686707e1c4398958f008b7'],
  [RAP, 'etape2-A2-05-volet1-lot3-T8.md', PROP_SHA, 'dae4d0579d539e923183b88b0443560a2d79af7a2701144cac3cfea9584410e8', '92fed98e5d12650865ee4b0343c6be58aa7253833225f95f980c0f3fe36d824b'],
  [BIL, 'etape2-A2-05-bilan-volet2.md', '0c43ee77eb1e0e2e429415e1468acd649877d13002ab8a6c2b1776da0ebecb53', '93bbdaac174df0f49e23c9f353f3e67ae6a4618c37b601285049067a17460c16', '300f9128091d659533c1adaad74b6cd4d76663ee9537b536e8c6dfca3f237a9d'],
  [ETAT, 'ETAT-ACTUEL.md', 'eca0572e019d68556859f162dfed12c150253cc606433c4388f37c2cee005c68', '368e1bf4f6093561271bc7ad10748176ef983a35058b7ffa01bfd316b21dc03a', 'c08afa7479f7577ce6a37c2c07323e815f790b59bd7ff9c667e9efc32fd6e192'],
  [ROAD, 'ROADMAP.md', 'd60ab2fff069fc61996e39929ce7c8479fdb63dcef73bd808bfb84e23cb3fd0d', 'f677083f11516470ffe6ac7e21516f36c9584ea3cb715d3f778ed78ebec4df63', '81d45e83a599c4d0ba8c39b023990f5cad66e6e3e58aa28fc68d1580c9df93c3'],
  [INV, 'INVENTAIRE-SCRIPTS.md', '511b338761e12a03d914bac1ac279d0b0d433667c45d0835928b722bbee0bc60', 'bc6ab2b97860b3b7c9052d996332be29c30027c026571fe75f2bc35cf7d4be99', '95559533b90693c65ca27b30c9aa2fd3a136dc8067bde842bd6a9e172a2f234c'],
  [REC, 'proposition-recalcul-T8-perimetre-arbitre.mjs', '3b23634c9f892d68b18f1280728d6773a0ebee8ec8529196efceb6e4a2d92606', 'adb6bbdac1cdba9d9e823fc298bfece04f904065257df920d07728b96e8c5315', 'ba2897040f69af02a9200ba2892592063600dc62476d762a3d67e04cd1e1691d'],
];
const nom = (p) => p.split('/').pop();
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const trace = []; let ko = 0;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const arretSi = (e) => { if (ko) { dire('ARRÊT : ' + ko + ' écart(s), ' + e + ' ; arrêt au premier groupe en écart'); process.exit(1); } };
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const fin = (r) => r.out.split('\n').pop();
const ecarts = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim());
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
const LFs = (t) => t.replace(/\r\n/g, '\n');
// Hunks d'un diff : ancien et nouveau blocs, lignes de contexte comprises. Les diffs sont en LF : ancres cherchées sur le texte en LF, fins de ligne rétablies ensuite
const hunks = (diff) => { const H = []; let h = null; for (const l of diff.split('\n')) { if (l.startsWith('@@')) { h = { a: [], b: [] }; H.push(h); continue; } if (!h || l.startsWith('\\') || l === '') continue; if (l[0] === ' ') { h.a.push(l.slice(1)); h.b.push(l.slice(1)); } else if (l[0] === '-') h.a.push(l.slice(1)); else if (l[0] === '+') h.b.push(l.slice(1)); } return H.map((x) => ({ a: x.a.join('\n'), b: x.b.join('\n') })); };
const appliquerHunks = (t0, H) => { const crlf = t0.includes('\r\n'); let t = LFs(t0); for (const { a, b } of H) { if (!a) throw new Error('hunk sans ancre'); if (t.split(a).length !== 2) throw new Error('ancre non unique'); t = t.replace(a, () => b); } return crlf ? t.replace(/\n/g, '\r\n') : t; };
const finsDeLigne = (t) => { const crlf = (t.match(/\r\n/g) ?? []).length, lf = (t.match(/\n/g) ?? []).length; return crlf === 0 ? 'LF' : crlf === lf ? 'CRLF' : 'mixte'; };
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => 'reconstruction/a2-04/lots/' + f);
const man0 = JSON.parse(lire(MAN)).empreintes;
const INCHANGES = [MAN, ...Object.keys(man0), ...lots, 'reconstruction/a2-04/journal.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', W + 'registre-tranches.json', W + 'recalcul-T5-perimetre.mjs', W + 'recalcul-T6-perimetre.mjs', W + 'recalcul-T7-perimetre.mjs', W + 'controle-bilan-pilote.mjs', W + 'sync-stable.mjs', W + 'lot3-commun-v2.mjs', W + 'couverture-lot3.mjs', W + 'empreintes-lot3.mjs', W + 'controle-relais-allege.mjs'];
const temoin = Object.fromEntries(INCHANGES.map((p) => [p, shaF(p)]));
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim();

// (1) Préconditions, sans écriture
dire('--- Préconditions');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P1 index vide');
ok(!existsSync(join(root, DEP)) && !existsSync(join(root, SAUV)), 'P2 sauvegarde de départ et proposition sauvegardée absentes');
const H = {};
for (const [c, v, d, p, h] of D) {
  ok(shaF(c) === d, 'P3 empreinte de départ : ' + c, shaF(c).slice(0, 12) + '…');
  ok(shaF(OUT + v) === p, 'P4 version proposée, empreinte relue : ' + v, shaF(OUT + v).slice(0, 12) + '…');
  const r = git('diff', '--no-index', '--no-color', '--', c, OUT + v); const n = nom(c) + '.diff';
  ok(r.status === 1 && sha(r.stdout) === h && shaF(OUT + 'diffs/' + n) === h, 'P5 diff régénéré identique au diff relu, octet pour octet : ' + n, sha(r.stdout).slice(0, 12) + '…');
  H[c] = hunks(readFileSync(join(root, OUT + 'diffs/' + n), 'utf8'));
  const t = LFs(lire(c)); ok(H[c].length > 0 && H[c].every(({ a }) => a && t.split(a).length === 2), 'P6 ancres uniques, à leur place : ' + nom(c), H[c].length + ' hunk(s)');
}
ok(shaF(OUT + SRC) === PROP_SHA, 'P7 proposition à sauvegarder = proposition relue', shaF(OUT + SRC).slice(0, 12) + '…');
ok(/^const ARBITRAGE = null;$/m.test(lire(CFG)), 'P8 ajout absent : ARBITRAGE non renseigné');
ok(lire(RAP).split('**Statut** : **proposition, non arbitrée.**').length === 2 && !lire(RAP).includes('## 0. Arbitrage'), 'P8 ajout absent : rapport en proposition, sans §0');
ok(!/^### 8\.108 /m.test(lire(BIL)), 'P8 ajout absent : §8.108');
ok(!lire(ETAT).includes('**Audit des 16 sens de T8 livré en proposition, puis T8 arbitrée**'), 'P8 ajout absent : ligne de journal');
ok(!lire(INV).includes('`audit-v1-lot3-T8.mjs`') && !lire(INV).includes('appliquer-consignation-T8.mjs'), 'P8 ajout absent : lignes de l\'inventaire');
ok(!lire(REC).includes("const RT8 = 'etape2-A2-05-volet1-lot3-T8.md';"), 'P8 ajout absent : recalcul de T8 non adapté');
ok(shaF(MAN) === MAN_SHA && Object.keys(man0).length === 42 && Object.entries(man0).every(([p, h]) => shaF(p) === h) && !Object.hasOwn(man0, RAP), 'P9 manifeste : 42 empreintes conformes ; rapport de T8 absent');
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'), r80 = lancer(REC);
ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P10 relais de départ', fin(rel0));
ok(r80.code === 1 && ecarts(r80).length === 1 && /sens non encore examinés/.test(ecarts(r80)[0]), 'P11 recalcul de T8 en service : seul l\'écart transitoire connu', fin(r80));
arretSi('avant écriture : aucun fichier modifié');

// (2) Résultats calculés pour les sept, avant d'en écrire un seul
dire('--- Résultats calculés en mémoire');
const avant = Object.fromEntries(D.map(([c]) => [c, lire(c)]));
const sorties = {};
for (const [c, , , p] of D) { const t = appliquerHunks(avant[c], H[c]); sorties[c] = t; ok(sha(Buffer.from(t, 'utf8')) === p, 'résultat des hunks = version relue : ' + nom(c), p.slice(0, 12) + '…'); ok(finsDeLigne(t) === finsDeLigne(avant[c]) && finsDeLigne(t) !== 'mixte', 'fins de ligne préservées : ' + nom(c), finsDeLigne(t)); }
arretSi('avant écriture : aucun fichier modifié');

// (3) Sauvegarde, écritures
dire('--- Sauvegarde et application');
mkdirSync(join(root, SOR), { recursive: true }); mkdirSync(join(root, REELS), { recursive: true });
for (const [c] of D) { mkdirSync(dirname(join(root, DEP + c)), { recursive: true }); copyFileSync(join(root, c), join(root, DEP + c)); ok(shaF(DEP + c) === shaF(c), 'original sauvegardé : ' + c); }
arretSi('sauvegarde incomplète : aucun fichier cible modifié');
copyFileSync(join(root, OUT + SRC), join(root, SAUV)); ok(shaF(SAUV) === PROP_SHA, 'proposition initiale sauvegardée à son empreinte relue', PROP_SHA.slice(0, 12) + '…');
for (const [c, , , p] of D) { writeFileSync(join(root, c), sorties[c]); ok(shaF(c) === p, 'appliqué : ' + c, p.slice(0, 12) + '…'); }
arretSi('état atteint conservé, aucune réparation');

// (4) Contrôles attendus après l'étape A
dire('--- Contrôles après l\'étape A');
for (const c of [CFG, REC]) ok(spawnSync(process.execPath, ['--check', join(root, c)], { encoding: 'utf8' }).status === 0, 'node --check ' + c);
for (const [c] of D) { const r = git('diff', '--no-index', '--no-color', '--', DEP + c, c); writeFileSync(join(root, REELS, nom(c) + '.diff'), r.stdout); const relu = readFileSync(join(root, OUT + 'diffs/' + nom(c) + '.diff'), 'utf8'); ok(r.status === 1 && JSON.stringify(changees(r.stdout)) === JSON.stringify(changees(relu)), 'A0 diff réel identique au diff relu (lignes +/−) : ' + nom(c), changees(r.stdout).length + ' lignes'); }
const rt = lire(RAP); const L = rt.split('\n'); const a = L.indexOf('## 0. Arbitrage'), b = L.indexOf('## 1. Résultat proposé'); const s0 = L.slice(a, b).join('\n');
const LP = lire(SAUV).split('\n'); const sans0 = [...L.slice(0, a), ...L.slice(b)]; const st = LP.findIndex((l) => l.startsWith('**Statut** : '));
ok(s0.includes('**16 conformes, 0 écart, 0 suspendu**') && /\*\*16 sens examinés : 16 conformes, 0 écart, aucun sens suspendu\.\*\*/.test(rt), 'A1 rapport de T8 : 16 conformes, 0 écart, 0 suspendu');
ok(sans0.length === LP.length && sans0.every((l, k) => k === st || l === LP[k]) && (rt.match(/^#### `v_\d+_s\d+` · /gm) ?? []).length === 16, 'A2 §1 et 16 fiches identiques à la proposition sauvegardée : seuls le statut et le §0 diffèrent');
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /336 arbitrés, 0 proposés, 41 restants, sur 377/.test(cov.out), 'A3 couverture : 336/377, 41 restants', cov.out.slice(0, 70));
const et = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(v.corrections,v.entry,v.libre,v.reserves.join())"], { cwd: root, encoding: 'utf8' });
ok(et.stdout.trim() === '197 172 V1-25 V1-22,V1-23', 'A4 corrections : 197 dans 172 ENTRY ; V1-22 et V1-23 réservés ; V1-25 libre', et.stdout.trim());
const vocab = JSON.parse(lire('data/n5/vocab.json')); ok(JSON.stringify(vocab.find((e) => e.id === 'v_427').senses[0].meaning.alternatives) === '["Pas bon"]', 'A5 aucune correction appliquée : `v_427_s1` publie toujours « Pas bon »');
const bil = lire(BIL); ok((bil.match(/^\| V1-24 \|/gm) ?? []).length === 1 && !/^\| V1-25 \|/m.test(bil) && (bil.match(/^\| réservé \| V1-2[23] \|/gm) ?? []).length === 2, 'A6 V1-24 retenue ; V1-22 et V1-23 réservés ; V1-25 non attribué');
for (const [n, s] of [['recalcul de T8 adapté', REC], ['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'A7 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 42 rapports contrôlés, identiques/.test(emp.out), 'A8 manifeste inchangé : 42 empreintes conformes', emp.out.slice(0, 110));
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); const eR = ecarts(rel).map((l) => l.split(/\s+/)[1]).sort().join(',');
ok(rel.code === 1 && fin(rel) === '28 conformes sur 30' && eR === 'C8,C9a', 'A9 relais : 28 sur 30, C8 et C9a seuls', fin(rel) + ' ; ' + eR);
const ch = INCHANGES.filter((p) => shaF(p) !== temoin[p]);
ok(!ch.length && !zones(), 'A10 journal, ' + lots.length + ' lots, données, registre, manifeste, 42 documents protégés et contrôles non visés intacts', ch.join(', ') || INCHANGES.length + ' fichiers ; zones git sans modification');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(avant[ETAT]), j1 = jr(lire(ETAT));
ok(j1.length === j0.length + 1 && j0.every((l) => j1.includes(l)), 'A11 journal d\'ETAT-ACTUEL.md : antérieur conservé, une seule ligne ajoutée', j1.length + ' lignes');
const b0 = avant[BIL].replace(/(\r?\n)+$/, ''), b1 = lire(BIL); const reste = b1.slice(b0.length);
ok(b1.startsWith(b0) && /^\s*### 8\.108 /.test(reste) && reste.split('### 8.').length === 2, 'A12 bilan antérieur inchangé, §8.108 seul ajouté');
const iA = avant[INV].split('\n'), iB = lire(INV).split('\n'); ok(iB.length === iA.length + 11 && iA.every((l) => iB.includes(l)), 'A13 inventaire : onze lignes ajoutées, aucune ligne existante modifiée');
const asm = spawnSync(process.execPath, [join(root, 'tools/reconstruction/run.mjs'), 'assemble'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(asm.status === 0 && /684 ENTRY, 35 identifiant/.test(asm.stdout), 'A14 assemblage réel', 'code ' + asm.status);
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'A15 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'A16 git diff --check', 'code ' + dc.status);
writeFileSync(join(root, SOR, 'application-A.txt'), trace.join('\n') + '\n' + (ko ? ko + ' écart(s) après application : arrêt\n' : 'étape A conforme\n'));
console.log(ko ? ko + ' écart(s) après application : arrêt ; état atteint conservé, aucune réparation' : 'étape A conforme');
process.exit(ko ? 1 : 0);
