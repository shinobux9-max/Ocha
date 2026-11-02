// A2-05 · T9 : préparation de B1 (installation des deux recalculs approuvés, 45e entrée du manifeste), EN PROPOSITION, sur une copie jetable : le dépôt réel
// n'est pas modifié. Usage : node a2-05-travail/arbitrage-T9/preparation-B1/preparer-B1.mjs <racine du dépôt>
// (1) Préconditions : étape A en place ; empreintes et diffs des recalculs sur l'état réel. (2) État de départ sur la copie ; installation ; ajout daté du jour :
// 45 entrées, les 44 premières dans leur ordre. (3) B2, simulée seulement, pour vérifier l'état final. (4) Protections : chaque sabotage est vérifié comme
// modifiant le fichier, puis restauré. (5) Sorties dans preparation-B1/sortie/, seulement sans écart. Les valeurs datées ou calculées ici ne valent pas
// autorisation d'application : la date de l'ajout sera celle de l'exécution réelle, et le plan de B2 se rétablit sur le dépôt réel.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T9 = W + 'arbitrage-T9/', INS = T9 + 'inscription/', OUT = T9 + 'preparation-B1/sortie/', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9.md', RAP_SHA = '73d4dee6568694cc4509d00a084b8f3b1581f8404d65f88b2a61be074c80df6a';
const SAUV = T9 + 'proposition-T9.md', SAUV_SHA = '986c2439994a0bc100d314026c185257b34f5039da76f16bc7e819ea1d5e31eb';
const MAN = W + 'empreintes-rapports-arbitres.json', MAN_SHA = '2c74018e3b04c06395298e2452d039de409353aae8a62d5d7d99cf43e01f78e3', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', APERCU = W + 'sync-stable-apercu.md', REC = W + 'recalcul-T9-perimetre.mjs', REC8 = W + 'recalcul-T8-perimetre.mjs';
// recalcul en service, version approuvée, empreinte en service, empreinte approuvée, empreinte du diff relu
const RECS = [
  [REC, 'proposition-recalcul-T9-perimetre-arbitre.mjs', 'af7331546832faf98d35f9e22687294b5505cbad4906633927cf2d028fc58929', '46c5134fdf7f4762751ed19e6f41810743117a86367f3db1d4df71001d392587', '8620e00ef15582786ab4a58161cc6ec689ede4ef661263cc087bad8e5f67ac0f'],
  [REC8, 'proposition-recalcul-T8-perimetre-apres-T9.mjs', 'adb6bbdac1cdba9d9e823fc298bfece04f904065257df920d07728b96e8c5315', 'c2d5301b06e816f3a6c98d2caa6a0daf36a6b19a824fbeb4a874fdb181b7f860', 'fa0972418809b66e2d8f188d7f80d025e066a23a0c894c5716009e9901a96fde'],
];
const TRANS_T9 = ['sens non encore examinés', 'restants par tranche du registre', 'corrections retenues sur les ENTRY de T9'], TRANS_T8 = ['restants par tranche du registre', 'inventaire des 57 du rapport'];
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => sha(readFileSync(p));
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l, d) => dire('constat  ' + l + (d ? ' : ' + d : ''));
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || p.startsWith(OUT)) continue; if (e.isDirectory()) m(p); else h[p] = shaF(join(r, p)); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
if (existsSync(join(root, OUT))) { console.log('ARRÊT : ' + OUT + ' existe déjà'); process.exit(1); }
const reel0 = instantane(root);
const man0 = readFileSync(join(root, MAN), 'utf8'); const m0 = JSON.parse(man0);
const cles0 = Object.keys(m0.empreintes);

// (1) Préconditions
ok(sha(Buffer.from(man0, 'utf8')) === MAN_SHA && cles0.length === 44 && !Object.hasOwn(m0.empreintes, RAP), 'P1 manifeste réel : 44 entrées, à son empreinte ; rapport de T9 absent', MAN_SHA.slice(0, 12) + '…');
ok(shaF(join(root, RAP)) === RAP_SHA && /^\*\*Statut\*\* : \*\*arbitré le 2026-11-01\*\*/m.test(readFileSync(join(root, RAP), 'utf8')), 'P2 rapport de T9 arbitré, à l\'empreinte relue', RAP_SHA.slice(0, 12) + '…');
ok(shaF(join(root, SAUV)) === SAUV_SHA, 'P2 bis proposition sauvegardée à son empreinte', SAUV_SHA.slice(0, 12) + '…');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P3 index vide');
for (const [c, v, e, p, h] of RECS) {
  ok(shaF(join(root, c)) === e, 'P4 recalcul en service à son empreinte de départ : ' + c, e.slice(0, 12) + '…');
  ok(shaF(join(root, INS + v)) === p, 'P5 version approuvée à son empreinte : ' + v, p.slice(0, 12) + '…');
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', c, INS + v], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  ok(r.status === 1 && sha(r.stdout) === h && shaF(join(root, INS + 'diffs/' + c.split('/').pop() + '.diff')) === h, 'P6 diff régénéré sur l\'état réel, identique au diff relu, octet pour octet : ' + c.split('/').pop(), sha(r.stdout).slice(0, 12) + '…');
}

const tmp = mkdtempSync(join(tmpdir(), 'ocha-etape-b1-t9-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 150);
const CTRL = { couverture: [W + 'couverture-lot3.mjs'], empreintes: [W + 'empreintes-lot3.mjs'], pilote: [W + 'controle-bilan-pilote.mjs'], T5: [W + 'recalcul-T5-perimetre.mjs'], T6: [W + 'recalcul-T6-perimetre.mjs'], T7: [W + 'recalcul-T7-perimetre.mjs'], T8: [REC8], T9: [REC], relais: [W + 'controle-relais-allege.mjs', '--apres-application'] };
const tous = () => Object.fromEntries(Object.entries(CTRL).map(([k, a]) => [k, lancer(...a)]));
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim());
const idsE = (r) => ecartsDe(r).map((l) => l.split(/\s+/)[1]).sort().join();
const seuls = (r, att) => { const e = ecartsDe(r); return r.code === 1 && e.length === att.length && att.every((a) => e.some((l) => l.includes(a))); };
const zeros = (R, sauf) => Object.entries(R).filter(([k]) => !sauf.includes(k)).every(([, r]) => r.code === 0);

// (2) État de départ, installation, ajout, sur la copie
const R0 = tous();
ok(zeros(R0, ['relais', 'T8', 'T9']) && seuls(R0.T9, TRANS_T9) && seuls(R0.T8, TRANS_T8) && fin(R0.relais) === '28 conformes sur 30' && idsE(R0.relais) === 'C8,C9a', 'B0 état de départ, après A : T5, T6, T7, pilote, couverture et empreintes à 0 ; T8 et T9, écarts transitoires seuls ; relais 28 sur 30, C8 et C9a', fin(R0.relais));
const av0 = instantane(C);
for (const [c, v] of RECS) cpSync(f(INS + v), f(c));
ok(JSON.stringify(diffI(av0, instantane(C))) === JSON.stringify([REC8, REC].sort()) && RECS.every(([c, , , p]) => shaF(f(c)) === p), 'B1 installation : les deux recalculs, à leurs empreintes approuvées, aucun autre fichier');
const RJ = tous();
ok(zeros(RJ, ['relais']) && fin(RJ.relais) === '28 conformes sur 30' && idsE(RJ.relais) === 'C8,C9a', 'B2 après installation : recalculs de T8 et T9 à 0, sans autre écart ; relais 28 sur 30', 'T8 ' + fin(RJ.T8) + ' ; T9 ' + fin(RJ.T9));
const DATE = new Date().toISOString().slice(0, 10);
const avP = instantane(C);
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter');
const brut = readFileSync(f(MAN)); const m1 = JSON.parse(brut); const cles1 = Object.keys(m1.empreintes);
ok(aj.code === 0 && cles1.length === 45 && cles1[44] === RAP && m1.empreintes[RAP] === RAP_SHA, 'B3 45e entrée : rapport arbitré de T9, à son empreinte relue', fin(aj));
ok(cles0.every((k, i) => cles1[i] === k && m1.empreintes[k] === m0.empreintes[k]), 'B4 les 44 premières entrées inchangées, dans leur ordre, valeurs identiques', sha(cles0.join('\n')).slice(0, 12) + '…');
ok(JSON.stringify(m1.ajouts.slice(0, -1)) === JSON.stringify(m0.ajouts) && JSON.stringify(m1.ajouts.at(-1)) === JSON.stringify({ date: DATE, chemins: [RAP] }), 'B5 journal des ajouts : une ligne de plus, datée du jour de l\'exécution', DATE);
ok(JSON.stringify(diffI(avP, instantane(C))) === JSON.stringify([MAN]), 'B6 l\'ajout ne modifie que le manifeste');
const rj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); ok(rj.code !== 0 && shaF(f(MAN)) === sha(brut), 'B7 second ajout refusé, sans modification', 'code ' + rj.code);
const RI = tous();
ok(zeros(RI, ['relais']) && fin(RI.relais) === '29 conformes sur 30' && idsE(RI.relais) === 'C8', 'B8 état attendu après B1 : contrôles à 0 ; relais 29 sur 30, C8 seul', fin(RI.relais));

// (3) B2, simulée seulement : l'état final est atteignable ; rien de B2 n'est préparé pour application
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const apercu = readFileSync(f(APERCU), 'utf8');
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
const plus = changees(apercu);
dire(plus.map((l) => '   ' + l.slice(0, 150)).join('\n'));
ok(ap.code === 0 && plan && plus.some((l) => /^\+- \*\*Lot 3\*\* : 360 sens arbitrés sur 377 ; 17 restent \(0 proposés\)/.test(l)) && plus.some((l) => /45 rapports arbitrés identiques/.test(l)) && plus.some((l) => /^\+- \*\*Corrections retenues, non appliquées\*\* : 204, dans 177 ENTRY ; prochain numéro libre : V1-32\./.test(l)), 'B9 aperçu simulé : 360/377, 17 restent, 45 rapports ; 204 corrections dans 177 ENTRY, V1-32 libre', 'plan de simulation ' + plan);
const avS = instantane(C); const app = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', plan);
ok(app.code === 0 && JSON.stringify(diffI(avS, instantane(C))) === JSON.stringify([ETAT, ROAD].sort()), 'B10 synchronisation sur la copie : deux documents, aucun autre', fin(app));
for (const p of [ETAT, ROAD]) { const hors = (t) => t.replace(/<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/, ''); ok(hors(readFileSync(f(p), 'utf8')) === hors(readFileSync(join(root, p), 'utf8')), 'B11 ' + p + ' : seul le bloc a2-05:etat change'); }
const R = tous();
for (const [k, r] of Object.entries(R)) dire('   ' + k + ' (code ' + r.code + ') : ' + fin(r));
ok(Object.values(R).every((r) => r.code === 0) && /^empreintes : 45 rapports contrôlés, identiques/.test(R.empreintes.out) && fin(R.relais) === '30 conformes sur 30' && /360 arbitrés, 0 proposés, 17 restants/.test(R.couverture.out), 'B12 état final simulé : tous les contrôles à 0 ; 45 empreintes ; relais 30 sur 30 ; 360/377');
const asm = spawnSync(process.execPath, [f('tools/reconstruction/run.mjs'), 'assemble'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(asm.status === 0, 'B13 assemblage réel sur la copie', 'code ' + asm.status);
const vide = lancer(W + 'sync-stable.mjs', '--apercu'); ok(vide.code === 0 && !changees(readFileSync(f(APERCU), 'utf8')).length, 'B14 aperçu suivant vide');

// (4) Protections : chaque sabotage doit être vu par au moins un contrôle, puis tout est restauré
const manT = (g) => (t) => { const o = JSON.parse(t); g(o); return JSON.stringify(o, null, 1) + '\n'; };
const echange = (o) => { const e = Object.entries(o.empreintes); [e[3], e[4]] = [e[4], e[3]]; o.empreintes = Object.fromEntries(e); };
const sabote = (nom, p, g) => {
  const orig = readFileSync(f(p)); const mod = g(orig.toString('utf8'));
  if (mod === orig.toString('utf8')) { ok(false, nom, 'sabotage sans effet'); return; }
  writeFileSync(f(p), mod); const r = tous(); writeFileSync(f(p), orig);
  const vus = Object.entries(r).filter(([, x]) => x.code !== 0).map(([k]) => k);
  ok(vus.length > 0 && shaF(f(p)) === sha(orig), nom, 'vu par : ' + vus.join(', '));
};
sabote('S1 ordre de deux des 44 premières entrées inversé', MAN, manT(echange));
sabote('S2 retour à 44 entrées, journal des ajouts laissé', MAN, manT((o) => { delete o.empreintes[RAP]; }));
sabote('S3 retour à 44 entrées, dernier ajout retiré aussi', MAN, manT((o) => { delete o.empreintes[RAP]; o.ajouts.pop(); }));
sabote('S4 empreinte d\'une ancienne entrée altérée', MAN, manT((o) => { const k = Object.keys(o.empreintes)[0]; o.empreintes[k] = '0'.repeat(64); }));
sabote('S5 rapport arbitré de T9 modifié après l\'ajout', RAP, (t) => t + ' ');
sabote('S6 rapport de T9 placé avant la 44e entrée', MAN, manT((o) => { const e = Object.entries(o.empreintes); const d = e.pop(); e.splice(43, 0, d); o.empreintes = Object.fromEntries(e); }));
sabote('S7 ajout daté hors d\'ordre', MAN, manT((o) => { o.ajouts.at(-1).date = '2026-01-01'; }));
sabote('S8 proposition sauvegardée modifiée', SAUV, (t) => t + ' ');
sabote('S9 recalcul de T9 revenu à la version d\'avant', REC, () => readFileSync(join(root, REC), 'utf8'));
sabote('S10 recalcul de T8 revenu à la version d\'avant', REC8, () => readFileSync(join(root, REC8), 'utf8'));
const temoin = tous(); ok(Object.values(temoin).every((r) => r.code === 0), 'S11 témoin sain après les sabotages');

// (5) Sorties, seulement sans écart
const ciblesFinales = { etat: readFileSync(f(ETAT)), road: readFileSync(f(ROAD)) };
if (!ko) {
  const d = join(root, OUT); mkdirSync(d, { recursive: true });
  writeFileSync(join(d, 'manifeste-simule-' + DATE + '.json'), brut); writeFileSync(join(d, 'apercu-B2-simule.md'), apercu);
  const dT = join(tmp, 'd'); mkdirSync(dT);
  const diff = (a, b, nom) => { writeFileSync(join(dT, 'avant'), a); writeFileSync(join(dT, 'apres'), b); const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', 'avant', 'apres'], { cwd: dT, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, nom), r.stdout); };
  diff(man0, brut, 'manifeste.diff'); diff(readFileSync(join(root, ETAT)), ciblesFinales.etat, 'B2-simule-ETAT-ACTUEL.md.diff'); diff(readFileSync(join(root, ROAD)), ciblesFinales.road, 'B2-simule-ROADMAP.md.diff');
}
rmSync(tmp, { recursive: true, force: true });
const ch = diffI(reel0, instantane(root)); ok(!ch.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', ch.join(', ') || Object.keys(reel0).length + ' fichiers');
constat('valeurs de simulation, non réutilisables pour une application', 'date ' + DATE + ' ; plan ' + plan);
dire(ko ? ko + ' écart(s) ; aucune sortie écrite' : 'préparation de B1 conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
