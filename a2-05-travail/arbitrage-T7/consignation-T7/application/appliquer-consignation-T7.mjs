// A2-05 · T7 : application de la consignation des opérations A, B1 et B2 (autorisée le 2026-10-31) : quatre diffs relus, appliqués par remplacements ciblés.
// T7 n'est pas close. Usage : node a2-05-travail/arbitrage-T7/consignation-T7/application/appliquer-consignation-T7.mjs <racine du dépôt>
// (1) Préconditions, sans écriture : empreintes de départ, versions proposées, diffs relus ; diffs régénérés identiques ; chaque hunk à ancre unique ; ajouts
// absents ; 41 empreintes ; aperçu vide ; relais 30 sur 30 ; index vide. (2) Quatre originaux sauvegardés. (3) Hunks appliqués par remplacements ciblés ;
// résultat égal à la version relue. (4) Contrôles. Arrêt au premier groupe en écart ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', C7 = W + 'arbitrage-T7/consignation-T7/', A = C7 + 'application/', DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md';
const MARQUEUR = '91a1ad1b112928af', PLAN_APRES = '2f62267214e92182', MAN_SHA = 'd109766350b91e103a1190ae559cf052352607677a323fb3535c925d91ba8981';
const D = [ // cible, départ, proposé, diff relu
  [BIL, '8e8190775108d24eb58cf9085e67970575c1773f30c82cb2d0653e27251e3b6c', 'cbebe703193b7a30c1cbb46551afbddd96667924c33682fb31f7db23fa7715cb', '6016aa8d6ef39c3cd24509cba988f3edb406fabc9eb2d4ec2f2aeed0b2d0eb90'],
  [ETAT, '065d5c2359848093a76c0001d947addc9ddaccbb8bb02eee943ca6e57d05911a', '2bdfdbffe1e5b0cfff52defa458c769b9e71f915f4d196a4d5086be2031f3f58', '307d0873e53e49ebb1153da7b494e07b5f6d749334b134e6533549a6839b871b'],
  [ROAD, '7e2b81a75bb851759f49172ac25b20bf57a286c4ccd3209582a660f0f6d9eae4', 'ab42d53222d7ffd0d7114e06b45a142afc5a1c827a20a7073454ce0aa31badb3', '327ea959953bf8381b009ed38650efeae5a189d37dfcf77fda9d7c4bf554580e'],
  [INV, '6a30f68a965058722f44acd4cbcd52a14c494b27c1d780736203fa70087e18f3', '4287a70d46c096a128ad370d9dff780b76d0021954d5e4bbe8a36ab3f481227a', '957174dca86c17d9dca185670a641bf2eabdbb4e27d0c93b423751f25e499725'],
];
const nom = (p) => p.split('/').pop();
const BLOC = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const trace = []; let ko = 0;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const arretSi = (e) => { if (ko) { dire('ARRÊT : ' + ko + ' écart(s), ' + e); process.exit(1); } };
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const fin = (r) => r.out.split('\n').pop();
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
const apercuVide = () => { const r = lancer(W + 'sync-stable.mjs', '--apercu'); return { r, vide: r.code === 0 && !changees(lire(APERCU)).length, plan: (r.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] }; };
// Hunks d'un diff : ancien et nouveau blocs, lignes de contexte comprises, fins de ligne conservées
const hunks = (diff) => { const H = []; let h = null; for (const l of diff.split('\n')) { if (l.startsWith('@@')) { h = { a: [], b: [] }; H.push(h); continue; } if (!h || l.startsWith('\\')) continue; if (l[0] === ' ' || l === '') { if (l === '') continue; h.a.push(l.slice(1)); h.b.push(l.slice(1)); } else if (l[0] === '-') h.a.push(l.slice(1)); else if (l[0] === '+') h.b.push(l.slice(1)); } return H.map((x) => ({ a: x.a.join('\n'), b: x.b.join('\n') })); };
// Les diffs sont normalisés en LF par git (core.autocrlf) : ancres cherchées sur le texte en LF, fins de ligne du document rétablies ensuite
const LFs = (t) => t.replace(/\r\n/g, '\n');
const appliquerHunks = (t0, H) => { const crlf = t0.includes('\r\n'); let t = LFs(t0); for (const { a, b } of H) { if (!a) throw new Error('hunk sans ancre'); if (t.split(a).length !== 2) throw new Error('ancre non unique'); t = t.replace(a, () => b); } return crlf ? t.replace(/\n/g, '\r\n') : t; };
const man = JSON.parse(lire(MAN)).empreintes; const cles = Object.keys(man);
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => 'reconstruction/a2-04/lots/' + f);
const PROTEGES = [MAN, ...cles, ...lots, 'reconstruction/a2-04/journal.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', W + 'registre-tranches.json', W + 'recalcul-T7-perimetre.mjs', W + 'controle-bilan-pilote.mjs', W + 'sync-stable.mjs', W + 'lot3-commun-v2.mjs'];
const temoin = Object.fromEntries(PROTEGES.map((p) => [p, shaF(p)]));
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim();

// (1) Préconditions
dire('--- Préconditions');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P1 index vide');
ok(!existsSync(join(root, DEP)), 'P2 sauvegarde absente');
const H = {};
for (const [p, d, v, h] of D) {
  const prop = C7 + nom(p);
  ok(shaF(p) === d, 'P3 empreinte de départ : ' + p, shaF(p).slice(0, 12) + '…');
  ok(shaF(prop) === v, 'P4 version proposée : ' + nom(p), shaF(prop).slice(0, 12) + '…');
  const r = git('diff', '--no-index', '--no-color', '--', p, prop);
  ok(r.status === 1 && sha(r.stdout) === h && shaF(C7 + 'diffs/' + nom(p) + '.diff') === h, 'P5 diff relu et diff régénéré identiques : ' + nom(p), sha(r.stdout).slice(0, 12) + '…');
  H[p] = hunks(readFileSync(join(root, C7 + 'diffs/' + nom(p) + '.diff'), 'utf8'));
  const t = LFs(lire(p)); ok(H[p].length > 0 && H[p].every(({ a }) => a && t.split(a).length === 2), 'P6 ancres uniques, à leur place : ' + nom(p), H[p].length + ' hunk(s)');
}
ok(!/^### 8\.105 /m.test(lire(BIL)), 'P7 ajout absent : §8.105');
ok(!lire(INV).includes('audit-v1-lot3-T7.mjs') && !lire(INV).includes('appliquer-consignation-E1-E4.mjs'), 'P7 ajout absent : lignes de l\'inventaire');
ok(!lire(ETAT).includes('**Inscription de T7 appliquée (étape A), rapport arbitré au manifeste (B1, 41e entrée) et bloc d\'état synchronisé (B2, plan'), 'P7 ajout absent : ligne de journal');
ok(shaF(MAN) === MAN_SHA && cles.length === 41 && cles.every((p) => shaF(p) === man[p]), 'P8 manifeste : 41 empreintes conformes');
const ap0 = apercuVide(); ok(ap0.vide, 'P9 aperçu de synchronisation vide', fin(ap0.r));
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P10 relais de départ', fin(rel0));
const avant = Object.fromEntries(D.map(([p]) => [p, lire(p)]));
const blocs0 = [ETAT, ROAD].map((p) => lire(p).match(BLOC)[0]);
arretSi('avant écriture : aucun fichier modifié');

// (2) Sauvegarde, (3) application
dire('--- Sauvegarde et application');
for (const [p] of D) { mkdirSync(dirname(join(root, DEP + p)), { recursive: true }); copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === shaF(p), 'original sauvegardé : ' + nom(p)); }
arretSi('sauvegarde incomplète : aucun document modifié');
// Résultat calculé pour les quatre avant d'en écrire un seul
const sorties = {}; for (const [p, , v] of D) { const t = appliquerHunks(avant[p], H[p]); sorties[p] = t; ok(sha(Buffer.from(t, 'utf8')) === v, 'résultat des hunks = version relue : ' + nom(p), v.slice(0, 12) + '…'); }
arretSi('aucun document modifié');
for (const [p] of D) { writeFileSync(join(root, p), sorties[p]); ok(true, 'écrit : ' + p); }

// (4) Contrôles
dire('--- Contrôles après application');
mkdirSync(join(root, SOR), { recursive: true }); mkdirSync(join(root, REELS), { recursive: true });
for (const [p, , v] of D) {
  ok(shaF(p) === v, 'C1 document identique à la version approuvée : ' + nom(p), v.slice(0, 12) + '…');
  const r = git('diff', '--no-index', '--no-color', '--', DEP + p, p); writeFileSync(join(root, REELS, nom(p) + '.diff'), r.stdout);
  const relu = readFileSync(join(root, C7 + 'diffs/' + nom(p) + '.diff'), 'utf8');
  ok(r.status === 1 && JSON.stringify(changees(r.stdout)) === JSON.stringify(changees(relu)), 'C2 diff réel identique au diff relu (lignes +/−) : ' + nom(p), changees(r.stdout).length + ' lignes');
}
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**'));
ok(pa(lire(ETAT)) === pa(lire(ROAD)) && pa(lire(ETAT)).startsWith('- **Prochaine action.** La clôture documentaire de T7'), 'C3 « Prochaine action » identique dans les deux documents');
const plusE = changees(readFileSync(join(root, REELS, nom(ETAT) + '.diff'), 'utf8')).filter((l) => l.startsWith('+')), plusR = changees(readFileSync(join(root, REELS, nom(ROAD) + '.diff'), 'utf8')).filter((l) => l.startsWith('+'));
ok(plusR.length === 2 && plusR.every((l) => plusE.includes(l)) && plusE.length === 3, 'C3 rubriques communes identiques ; ETAT-ACTUEL.md n\'ajoute que la ligne de journal');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(avant[ETAT]), j1 = jr(lire(ETAT));
ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'C4 journal antérieur conservé, une seule ligne ajoutée', j1.length + ' lignes');
const b0 = avant[BIL].replace(/(\r?\n)+$/, ''), b1 = lire(BIL); const reste = b1.slice(b0.length);
ok(b1.startsWith(b0) && /^\s*### 8\.105 /.test(reste) && reste.split('### 8.').length === 2, 'C5 §8.104 et bilan antérieur inchangés, §8.105 seul ajouté');
ok([ETAT, ROAD].every((p, i) => lire(p).match(BLOC)[0] === blocs0[i] && blocs0[i].includes('empreinte=' + MARQUEUR)), 'C6 blocs a2-05:etat inchangés, au marqueur attendu', MARQUEUR);
const ap1 = apercuVide(); ok(ap1.vide && ap1.plan === PLAN_APRES, 'C7 aperçu suivant vide', fin(ap1.r));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 41 rapports contrôlés, identiques$/.test(emp.out), 'C8 manifeste : 41 empreintes conformes', emp.out);
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C9 relais : 30 sur 30', fin(rel));
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'C10 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /320 arbitrés, 0 proposés, 57 restants, sur 377/.test(cov.out), 'C11 couverture : 320/377, 57 restants', cov.out.slice(0, 70));
const et = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(v.corrections,v.entry,v.libre,v.reserves.join())"], { cwd: root, encoding: 'utf8' });
ok(et.stdout.trim() === '197 172 V1-25 V1-22,V1-23', 'C12 197 corrections dans 172 ENTRY ; V1-22 et V1-23 réservés ; V1-25 libre', et.stdout.trim());
ok((lire(BIL).match(/^\| V1-24 \|/gm) ?? []).length === 1, 'C13 V1-24 retenue, une ligne de correction');
const pasBon = JSON.parse(lire('data/n5/vocab.json')).find((e) => e.id === 'v_427').senses[0].meaning.alternatives; ok(JSON.stringify(pasBon) === '["Pas bon"]', 'C14 aucune correction appliquée : `v_427_s1` publie toujours « Pas bon »');
const mod = PROTEGES.filter((p) => shaF(p) !== temoin[p]); ok(!mod.length && !zones(), 'C15 documents protégés, normes, données, journal, lots et registre intacts', mod.join(', ') || PROTEGES.length + ' fichiers ; zones git sans modification');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C16 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C17 git diff --check', 'code ' + dc.status);
writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n' + (ko ? ko + ' écart(s)\n' : 'consignation de T7 conforme\n'));
console.log(ko ? ko + ' écart(s) : arrêt, état atteint conservé, aucune réparation' : 'consignation de T7 conforme');
process.exit(ko ? 1 : 0);
