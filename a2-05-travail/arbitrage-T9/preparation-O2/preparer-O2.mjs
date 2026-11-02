// A2-05 · T9 : préparation de O2 (44e entrée du manifeste), EN PROPOSITION : le manifeste réel n'est pas modifié ; O2 et O3 ne sont pas appliquées.
// Usage : node a2-05-travail/arbitrage-T9/preparation-O2/preparer-O2.mjs <racine du dépôt>
// (1) Préconditions sur l'état réel après O1. (2) Prévisualisation par l'outil prévu sur une copie jetable : ajout daté du jour, diff du manifeste, ordre des empreintes. (3) Contrôles
// attendus après O2, et aperçu de O3 simulé. (4) Résistance : altérations détectées après l'ajout. (5) Règle de date : `empreintes-lot3.mjs` date en UTC ; hors de l'accord entre
// date UTC et jour local, l'opération devra être refusée ; démonstration par fuseaux. Sorties dans preparation-O2/, seulement sans écart ; refus si la sortie existe. Dépôt réel inchangé.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T9 = W + 'arbitrage-T9/', OUT = T9 + 'preparation-O2/', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md', REC = W + 'recalcul-T9-perimetre.mjs';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md', SAUV = T9 + 'proposition-T9-perimetre.md', RT8 = 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md';
const MAN_SHA = 'eeeda756c00d09ebeaed8ef1e70c816d4b7f1d697acf3984fadbe9fc1d1163e9', RAP_SHA = '85faf16c39db3e262524bb98b6fa8e6f60afe97a37d694e8119d7a5138933e88', SAUV_SHA = '01b9bf833a66fd56a8183ee24fb4c47a11506be2d687dc09b3cabab604d84205', PLAN_O3 = '7d25ea8442b9dd06';
const APRES_O1 = { 'ETAT-ACTUEL.md': 'c3d5294ce301189aa72d59f97a884ad951d6ae99aa3d9c930a170c35f3aa924e', 'ROADMAP.md': 'ff396316ceb858c33a412d6e71f48a4628fb6c8d1f75a09cb2b0d953c86f43fe', 'docs/rapports/etape2-A2-05-bilan-volet2.md': '40193ee0faab8058e7fc45d235fd1662206201ba77e292c7dfa18ec5055054f8', [W + 'INVENTAIRE-SCRIPTS.md']: 'c716a1ef9a742a7674a1a721e3293c6e898d222a89aa8f4fccfc824b2401026b', [REC]: '63aaa07c854fd6a79eba540f6b63c0bb5fbec8159b72a6eb74d035d7567f8a06', [W + 'perimetre-T9.mjs']: '5be53f3afb737ada4a8d11087f76bd6a923fee971addd146c2b80cd1782ad2d6' };
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l, d) => dire('constat  ' + l + (d ? ' : ' + d : ''));
const lancerIn = (r, s, ...a) => { const x = spawnSync(process.execPath, [join(r, s), r, ...a], { cwd: r, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const lancer = (s, ...a) => lancerIn(root, s, ...a);
const fin = (r) => r.out.split('\n').pop().slice(0, 130);
const ecarts = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim().split(/\s+/)[1]).sort().join(',');
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || p.startsWith(OUT)) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const jourLocal = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
if (existsSync(join(root, OUT, 'sortie-preparation.txt'))) { console.log('ARRÊT : ' + OUT + 'sortie-preparation.txt existe déjà'); process.exit(1); }

// (1) Préconditions, état réel après O1
const m0 = JSON.parse(readFileSync(join(root, MAN), 'utf8')); const c0 = Object.keys(m0.empreintes);
ok(shaF(MAN) === MAN_SHA && c0.length === 43 && c0.every((p) => shaF(p) === m0.empreintes[p]) && c0[42] === RT8 && !c0.includes(RAP), 'P1 manifeste réel : 43 empreintes conformes, rapport arbitré de T8 en 43e, périmètre de T9 absent', MAN_SHA);
ok(shaF(RAP) === RAP_SHA && /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-11-01 \(§0\)\.\*\*/m.test(readFileSync(join(root, RAP), 'utf8')), 'P2 périmètre accepté de T9, empreinte complète', RAP_SHA);
ok(shaF(SAUV) === SAUV_SHA, 'P3 proposition initiale sauvegardée intacte', SAUV_SHA);
const imp = Object.entries(APRES_O1).filter(([p, h]) => shaF(p) !== h).map(([p]) => p); ok(!imp.length, 'P4 documents à leur empreinte d\'après O1', imp.join(', ') || Object.keys(APRES_O1).length + ' fichiers');
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 1 && fin(rel0) === '29 conformes sur 30' && ecarts(rel0) === 'C9a', 'P5 relais réel : 29 sur 30, C9a seul', fin(rel0) + ' ; ' + ecarts(rel0));
const ap0 = lancer(W + 'sync-stable.mjs', '--apercu'); ok(ap0.code === 0 && !changees(readFileSync(join(root, APERCU), 'utf8')).length, 'P6 aperçu réel vide', fin(ap0));
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P7 index vide');
const JOUR = new Date().toISOString().slice(0, 10); ok(JOUR === jourLocal(), 'P8 date de l\'outil (UTC) = jour local', 'UTC ' + JOUR + ' ; local ' + jourLocal());
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }

// (2) Prévisualisation sur une copie jetable, par l'outil prévu
dire('--- Prévisualisation de O2, sur copie');
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-o2-t9-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'V1 copie identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const aj = lancerIn(C, W + 'empreintes-lot3.mjs', '--ajouter'); const prev = readFileSync(f(MAN)); const m1 = JSON.parse(prev); const c1 = Object.keys(m1.empreintes);
ok(aj.code === 0 && JSON.stringify(diffI(reel0, instantane(C))) === JSON.stringify([MAN]), 'V2 l\'ajout ne change que le manifeste', fin(aj));
ok(c1.length === 44 && c1[43] === RAP && m1.empreintes[RAP] === RAP_SHA, 'V3 périmètre accepté de T9 en 44e position, à son empreinte', RAP_SHA);
ok(c0.every((k, i) => c1[i] === k && m1.empreintes[k] === m0.empreintes[k]), 'V4 les 43 entrées précédentes conservées en valeur et en ordre');
ok(m1.ajouts.length === m0.ajouts.length + 1 && JSON.stringify(m1.ajouts.slice(0, -1)) === JSON.stringify(m0.ajouts) && JSON.stringify(m1.ajouts.at(-1)) === JSON.stringify({ date: JOUR, chemins: [RAP] }), 'V5 un seul nouvel élément dans `ajouts`, daté du jour', JOUR);
dire('   ordre, fin du manifeste :'); for (const k of [41, 42, 43]) dire('   ' + (k + 1) + 'e : ' + c1[k] + ' : ' + m1.empreintes[c1[k]].slice(0, 12) + '…');

// (3) Contrôles attendus après O2, sur la copie
dire('--- Contrôles attendus après O2');
const CTRL = { couverture: [W + 'couverture-lot3.mjs'], empreintes: [W + 'empreintes-lot3.mjs'], pilote: [W + 'controle-bilan-pilote.mjs'], T5: [W + 'recalcul-T5-perimetre.mjs'], T6: [W + 'recalcul-T6-perimetre.mjs'], T7: [W + 'recalcul-T7-perimetre.mjs'], T8: [W + 'recalcul-T8-perimetre.mjs'], T9: [REC] };
const R = Object.fromEntries(Object.entries(CTRL).map(([k, x]) => [k, lancerIn(C, ...x)])); for (const [k, r] of Object.entries(R)) dire('   ' + k + ' (code ' + r.code + ') : ' + fin(r));
ok(Object.values(R).every((r) => r.code === 0) && /^empreintes : 44 rapports contrôlés, identiques$/.test(R.empreintes.out) && R.T9.out.split('\n').filter((l) => l.startsWith('conforme ')).length === 33, 'C1 tous à 0 ; 44 empreintes ; recalcul de T9, 33 contrôles');
const rel = lancerIn(C, W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C2 relais : 30 sur 30', fin(rel));
const ap = lancerIn(C, W + 'sync-stable.mjs', '--apercu'); const apT = readFileSync(f(APERCU), 'utf8'); const ch = changees(apT); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
ok(ap.code === 0 && plan === PLAN_O3 && ch.length === 8 && ch.filter((l) => /44 rapports arbitrés identiques/.test(l)).length === 2 && ch.filter((l) => /a2-05:etat:debut/.test(l)).length === 4, 'C3 aperçu après O2 : huit lignes, marqueur et compteur, deux documents ; O3 reste à faire', 'plan ' + plan);
const et = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(v.arbitres,v.restants,v.corrections,v.entry,v.libre,v.reserves.join())"], { cwd: C, encoding: 'utf8' });
ok(et.stdout.trim() === '336 41 197 172 V1-25 V1-22,V1-23', 'C4 336/377, 41 restants ; 197 corrections dans 172 ENTRY ; V1-25 libre ; V1-22 et V1-23 réservés', et.stdout.trim());
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: C, encoding: 'utf8' }).stdout.trim() && spawnSync('git', ['diff', '--check'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }).status === 0, 'C5 copie : index vide ; git diff --check conforme');

// (4) Résistance : une altération après l'ajout est détectée
const sabote = (nom, p, g, s, attendu) => { const o = readFileSync(f(p)); const t = o.toString('utf8'); const m = g(t); if (m === t) { ok(false, nom, 'sans effet'); return; } writeFileSync(f(p), m); const r = lancerIn(C, s); writeFileSync(f(p), o); ok(r.code !== 0 && attendu.test(r.out), nom, 'code ' + r.code); };
sabote('S1 périmètre de T9 modifié après l\'ajout', RAP, (t) => t + ' ', W + 'empreintes-lot3.mjs', /empreinte modifiée/);
sabote('S2 une des 43 entrées inversée avec sa voisine', MAN, (t) => { const o = JSON.parse(t); const e = Object.entries(o.empreintes); [e[3], e[4]] = [e[4], e[3]]; o.empreintes = Object.fromEntries(e); return JSON.stringify(o, null, 1) + '\n'; }, REC, /ÉCART\s+manifeste/);
sabote('S3 périmètre de T9 avancé en 43e position', MAN, (t) => { const o = JSON.parse(t); const e = Object.entries(o.empreintes); e.splice(42, 0, e.pop()); o.empreintes = Object.fromEntries(e); return JSON.stringify(o, null, 1) + '\n'; }, REC, /ÉCART\s+manifeste/);

// (5) Règle de date : même instant, fuseaux différents ; l'opération réelle exigera UTC = jour local
const jourSous = (tz) => spawnSync(process.execPath, ['-e', "const d=new Date();process.stdout.write(d.toISOString().slice(0,10)+' '+d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'))"], { encoding: 'utf8', env: { ...process.env, TZ: tz } }).stdout.split(' ');
const [uP, lP] = jourSous('Europe/Paris'); ok(uP === lP, 'D1 fuseau de Paris, maintenant : UTC = local, ajout autorisé par la règle', uP + ' ; ' + lP);
const [uK, lK] = jourSous('Pacific/Kiritimati'), [uN, lN] = jourSous('Pacific/Niue'); ok((uK !== lK) || (uN !== lN), 'D2 la règle refuse dès que les jours diffèrent : la comparaison distingue bien les deux dates', 'UTC+14 : ' + uK + ' ; ' + lK + ' ; UTC−11 : ' + uN + ' ; ' + lN);

// (6) Sorties
if (!ko) {
  const d = join(root, OUT); mkdirSync(d, { recursive: true }); const nomM = 'manifeste-simule-' + JOUR + '.json'; writeFileSync(join(d, nomM), prev); writeFileSync(join(d, 'apercu-O3-simule.md'), apT);
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', MAN, OUT + nomM], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, 'manifeste.diff'), r.stdout);
  constat('manifeste simulé', sha(prev)); constat('diff prévisualisé', sha(r.stdout) + ' ; +' + changees(r.stdout).filter((l) => l[0] === '+').length + ' / −' + changees(r.stdout).filter((l) => l[0] === '-').length);
}
rmSync(tmp, { recursive: true, force: true });
const reel1 = instantane(root); const chR = diffI(reel0, reel1); ok(!chR.length && shaF(MAN) === MAN_SHA && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé, manifeste réel à 43 entrées ; index vide', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
constat('valeurs de simulation : la date et le manifeste se rétablissent le jour de l\'opération ; le plan se déduit du contenu', 'date ' + JOUR + ' ; plan ' + plan);
dire(ko ? ko + ' écart(s) ; aucune sortie conservée' : 'préparation de O2 conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
