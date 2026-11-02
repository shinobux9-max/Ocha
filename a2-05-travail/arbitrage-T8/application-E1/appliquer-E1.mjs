// A2-05 · T8 : état E1 de la consolidation (autorisé le 2026-10-31) : sept diffs relus, appliqués par remplacements ciblés ; proposition initiale sauvegardée.
// Usage : node a2-05-travail/arbitrage-T8/application-E1/appliquer-E1.mjs <racine du dépôt>
// (1) Préconditions, sans écriture : empreintes complètes de départ, versions proposées, diffs relus ; diffs régénérés identiques ; ancres uniques ; ajouts
// absents ; 41 empreintes ; index vide. (2) Originaux sauvegardés. (3) Résultats calculés et vérifiés, puis écrits. (4) Contrôles. Arrêt au premier groupe en
// écart ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T8 = W + 'arbitrage-T8/', CO = T8 + 'consolidation/', A = T8 + 'application-E1/', DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', INV = W + 'INVENTAIRE-SCRIPTS.md', CFG = W + 'perimetre-T8.mjs', REC = W + 'recalcul-T8-perimetre.mjs';
const MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md', SAUV = T8 + 'proposition-T8-perimetre.md';
const MAN_SHA = 'd109766350b91e103a1190ae559cf052352607677a323fb3535c925d91ba8981', PROP_SHA = 'c087860fb89da40410a572fc48ea31d3f881713a0af24575f36e8540063d37b8', MARQUEUR = '91a1ad1b112928af';
const D = [ // cible, départ, proposé, diff relu
  [CFG, '0059961c04753c1eb2afc0fa9812864437eb20c68edab3b6693923b3e553c675', '4c2047de30df2e28e02b0a4982f9d7add0e86e2cc5b5c14dc20308284e96788f', 'c72472d43d8e7f4d1af0ca6f41967aaed1b3ffaf34d951b07685d435da0ee6c2'],
  [RAP, PROP_SHA, '5b46f9353e38fb9f4b522d4363fe2b843de52819e214847cfdb5e35f508e96bb', '0b985bdffd6df03bc042b29d11668d8d5d91ceb22b71d51a9f3430da2aa42375'],
  [BIL, 'cbebe703193b7a30c1cbb46551afbddd96667924c33682fb31f7db23fa7715cb', '02f39e124f9a923890cc167b2788b7ba5f4679204461978f0f4cf064d83ac349', '7c456b8a8e0119a5a57535db6bf0ee9b628814ea7440c441da0947e6b0217cda'],
  [ETAT, '2bdfdbffe1e5b0cfff52defa458c769b9e71f915f4d196a4d5086be2031f3f58', '70089fcafedd3ef0c251b79c9ca889f47f22496ed5141804a87e700d71bec254', 'cda78ccd7f2521fee3a16cc9acdf2c679d8c4326e1cb8804d22de84b0816103e'],
  [ROAD, 'ab42d53222d7ffd0d7114e06b45a142afc5a1c827a20a7073454ce0aa31badb3', '83f2fede560481f8a4965d6a8f05cde10678db2f72132da4369ba5892cc56337', 'bc003a04c3f93bea1bbc8962a610caae5f83636c79498f8894184f955805d9c2'],
  [INV, '4287a70d46c096a128ad370d9dff780b76d0021954d5e4bbe8a36ab3f481227a', '5c7f3ac396108ec2221563bac5f6d3de353142929e899d9d1f6988ed352efea9', '26a0be57cb430ab98274565008dc72799d03f77aca4b5ecc08872749b6ec4c94'],
  [REC, '34b84c3176a00ae0e7ab7d928c4dc5e3a144cfd14653411d848c2654755bd6bf', '3b23634c9f892d68b18f1280728d6773a0ebee8ec8529196efceb6e4a2d92606', '208aca8453fa5b435f93a048c38ad00f2c19aaf7b782dc0cb943af82e78a95e0'],
];
const nom = (p) => p.split('/').pop();
const BLOC = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const LFs = (t) => t.replace(/\r\n/g, '\n');
const trace = []; let ko = 0;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const arretSi = (e) => { if (ko) { dire('ARRÊT : ' + ko + ' écart(s), ' + e); process.exit(1); } };
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const fin = (r) => r.out.split('\n').pop();
const ecarts = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim().split(/\s+/)[1]).sort().join(',');
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
// Hunks d'un diff (normalisés en LF par git) : ancres cherchées sur le texte en LF, fins de ligne du document rétablies ensuite
const hunks = (diff) => { const H = []; let h = null; for (const l of diff.split('\n')) { if (l.startsWith('@@')) { h = { a: [], b: [] }; H.push(h); continue; } if (!h || l.startsWith('\\') || l === '') continue; if (l[0] === ' ') { h.a.push(l.slice(1)); h.b.push(l.slice(1)); } else if (l[0] === '-') h.a.push(l.slice(1)); else if (l[0] === '+') h.b.push(l.slice(1)); } return H.map((x) => ({ a: x.a.join('\n'), b: x.b.join('\n') })); };
const appliquerHunks = (t0, H) => { const crlf = t0.includes('\r\n'); let t = LFs(t0); for (const { a, b } of H) { if (!a || t.split(a).length !== 2) throw new Error('ancre non unique'); t = t.replace(a, () => b); } return crlf ? t.replace(/\n/g, '\r\n') : t; };
const man = JSON.parse(lire(MAN)).empreintes; const cles = Object.keys(man);
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => 'reconstruction/a2-04/lots/' + f);
const PROTEGES = [MAN, ...cles, ...lots, 'reconstruction/a2-04/journal.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', W + 'registre-tranches.json', W + 'recalcul-T7-perimetre.mjs', W + 'controle-bilan-pilote.mjs', W + 'sync-stable.mjs', W + 'lot3-commun-v2.mjs', W + 'perimetre-v2.mjs'];
const temoin = Object.fromEntries(PROTEGES.map((p) => [p, shaF(p)]));
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim();

// (1) Préconditions
dire('--- Préconditions');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P1 index vide');
ok(!existsSync(join(root, DEP)) && !existsSync(join(root, SAUV)), 'P2 sauvegarde et proposition sauvegardée absentes');
const H = {};
for (const [p, d, v, h] of D) {
  const prop = CO + nom(p);
  ok(shaF(p) === d, 'P3 empreinte de départ : ' + p, shaF(p));
  ok(shaF(prop) === v, 'P4 version proposée : ' + nom(p), shaF(prop));
  const r = git('diff', '--no-index', '--no-color', '--', p, prop);
  ok(r.status === 1 && sha(r.stdout) === h && shaF(CO + 'diffs/' + nom(p) + '.diff') === h, 'P5 diff relu et diff régénéré identiques : ' + nom(p), sha(r.stdout).slice(0, 12) + '…');
  H[p] = hunks(readFileSync(join(root, CO + 'diffs/' + nom(p) + '.diff'), 'utf8'));
  const t = LFs(lire(p)); ok(H[p].length > 0 && H[p].every(({ a }) => a && t.split(a).length === 2), 'P6 ancres uniques, à leur place : ' + nom(p), H[p].length + ' hunk(s)');
}
ok(shaF(CO + 'proposition-T8-perimetre.md') === PROP_SHA && shaF(RAP) === PROP_SHA, 'P7 proposition à sauvegarder = rapport en service = proposition relue', PROP_SHA.slice(0, 12) + '…');
ok(!/^### 8\.106 /m.test(lire(BIL)) && !lire(RAP).includes('## 0. Arbitrage') && /^const ARBITRAGE = null;$/m.test(lire(CFG)) && !lire(INV).includes('perimetre-T8.mjs') && !lire(ETAT).includes('**T7 close le 2026-10-31**'), 'P8 ajouts absents : §8.106, §0, ARBITRAGE, inventaire, pilotage');
ok(shaF(MAN) === MAN_SHA && cles.length === 41 && cles.every((p) => shaF(p) === man[p]) && !Object.hasOwn(man, RAP), 'P9 manifeste : 41 empreintes conformes ; rapport de T8 absent');
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P10 relais de départ', fin(rel0));
const avant = Object.fromEntries(D.map(([p]) => [p, lire(p)]));
const blocs0 = [ETAT, ROAD].map((p) => lire(p).match(BLOC)[0]);
arretSi('avant écriture : aucun fichier modifié');

// (2) Sauvegarde, (3) application
dire('--- Sauvegarde et application');
for (const [p] of D) { mkdirSync(dirname(join(root, DEP + p)), { recursive: true }); copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === shaF(p), 'original sauvegardé : ' + nom(p)); }
arretSi('sauvegarde incomplète : aucun document modifié');
const sorties = {}; for (const [p, , v] of D) { const t = appliquerHunks(avant[p], H[p]); sorties[p] = t; ok(sha(Buffer.from(t, 'utf8')) === v, 'résultat des hunks = version relue : ' + nom(p), v.slice(0, 12) + '…'); }
arretSi('aucun document modifié');
copyFileSync(join(root, CO + 'proposition-T8-perimetre.md'), join(root, SAUV)); ok(shaF(SAUV) === PROP_SHA, 'proposition initiale sauvegardée à son empreinte', PROP_SHA);
for (const [p] of D) { writeFileSync(join(root, p), sorties[p]); ok(true, 'écrit : ' + p); }

// (4) Contrôles
dire('--- Contrôles après E1');
mkdirSync(join(root, SOR), { recursive: true }); mkdirSync(join(root, REELS), { recursive: true });
for (const [p, , v] of D) {
  ok(shaF(p) === v, 'C1 identique à la version approuvée : ' + nom(p), v.slice(0, 12) + '…');
  const r = git('diff', '--no-index', '--no-color', '--', DEP + p, p); writeFileSync(join(root, REELS, nom(p) + '.diff'), r.stdout);
  ok(r.status === 1 && JSON.stringify(changees(r.stdout)) === JSON.stringify(changees(readFileSync(join(root, CO + 'diffs/' + nom(p) + '.diff'), 'utf8'))), 'C2 diff réel identique au diff relu (lignes +/−) : ' + nom(p), changees(r.stdout).length + ' lignes');
}
const G = lire(RAP).split('\n'), PL = lire(SAUV).split('\n'); const a0 = G.indexOf('## 0. Arbitrage'), b0 = G.indexOf('## 1. Où se place T8'); const sans0 = [...G.slice(0, a0), ...G.slice(b0)]; const st = PL.findIndex((l) => l.startsWith('**Statut** : '));
ok(a0 > 0 && b0 > a0 && sans0.length === PL.length && sans0.every((l, k) => k === st || l === PL[k]) && /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-31 \(§0\)\.\*\*/.test(G[st]), 'C3 périmètre accepté, D5 + D8 ; hors du statut et du §0, proposition originale conservée intégralement');
ok(/\*\*16 sens, 14 ENTRY\*\*/.test(lire(RAP)) && lire(RAP).includes("**J'accepte le périmètre opérationnel de T8 : D5 et D8, soit 16 sens dans 14 ENTRY.**"), 'C4 16 sens dans 14 ENTRY');
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**'));
ok(pa(lire(ETAT)) === pa(lire(ROAD)), 'C5 « Prochaine action » identique dans les deux documents');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(avant[ETAT]), j1 = jr(lire(ETAT));
ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'C6 journal historique conservé, une seule ligne ajoutée', j1.length + ' lignes');
const b00 = avant[BIL].replace(/(\r?\n)+$/, ''), b1 = lire(BIL); const reste = b1.slice(b00.length);
ok(b1.startsWith(b00) && /^\s*### 8\.106 /.test(reste) && reste.split('### 8.').length === 2, 'C7 bilan antérieur inchangé, §8.106 seul ajouté');
ok([ETAT, ROAD].every((p, i) => lire(p).match(BLOC)[0] === blocs0[i] && blocs0[i].includes('empreinte=' + MARQUEUR)), 'C8 blocs a2-05:etat inchangés', MARQUEUR);
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); ok(ap.code === 0 && !changees(lire(APERCU)).length, 'C9 aperçu de synchronisation vide', fin(ap));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 41 rapports contrôlés, identiques/.test(emp.out), 'C10 manifeste : 41 empreintes conformes', emp.out.slice(0, 100));
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 1 && fin(rel) === '29 conformes sur 30' && ecarts(rel) === 'C9a', 'C11 relais : 29 sur 30, C9a seul', fin(rel) + ' ; ' + ecarts(rel));
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8 adapté', REC], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'C12 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /320 arbitrés, 0 proposés, 57 restants, sur 377/.test(cov.out), 'C13 couverture : 320/377, 57 restants', cov.out.slice(0, 70));
const et = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(v.corrections,v.entry,v.libre,v.reserves.join())"], { cwd: root, encoding: 'utf8' });
ok(et.stdout.trim() === '197 172 V1-25 V1-22,V1-23', 'C14 197 corrections dans 172 ENTRY', et.stdout.trim());
const pasBon = JSON.parse(lire('data/n5/vocab.json')).find((e) => e.id === 'v_427').senses[0].meaning.alternatives; ok(JSON.stringify(pasBon) === '["Pas bon"]', 'C15 aucune correction appliquée');
const mod = PROTEGES.filter((p) => shaF(p) !== temoin[p]); ok(!mod.length && !zones(), 'C16 documents protégés, journal historique, lots, données, registre et normes intacts', mod.join(', ') || PROTEGES.length + ' fichiers');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C17 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C18 git diff --check', 'code ' + dc.status);
writeFileSync(join(root, SOR, 'application-E1.txt'), trace.join('\n') + '\n' + (ko ? ko + ' écart(s)\n' : 'E1 conforme\n'));
console.log(ko ? ko + ' écart(s) : arrêt, état atteint conservé, aucune réparation' : 'E1 conforme');
process.exit(ko ? 1 : 0);
