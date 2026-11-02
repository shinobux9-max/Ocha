// A2-05 · T8 : préparation de l'étape B (43e entrée du manifeste, synchronisation des blocs a2-05:etat), EN PROPOSITION, sur une copie jetable : le dépôt
// réel n'est pas modifié. Usage : node a2-05-travail/arbitrage-T8/preparation-B/preparer-B.mjs <racine du dépôt>
// (1) Préconditions : étape A en place. (2) État de départ sur la copie, puis ajout daté du jour : 43 entrées, les 42 premières dans leur ordre. (3) Aperçu et
// synchronisation sur la copie : blocs seuls. (4) Contrôles de l'état final. (5) Protections : chaque sabotage est vérifié comme modifiant le fichier, puis
// restauré. (6) Sorties dans preparation-B/sortie/, seulement sans écart. Les valeurs datées ou calculées ici ne valent pas autorisation d'application : la
// date de l'ajout sera celle de l'exécution réelle, et le plan se rétablit sur le dépôt réel.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-T8/preparation-B/sortie/', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md', RAP_SHA = 'dae4d0579d539e923183b88b0443560a2d79af7a2701144cac3cfea9584410e8';
const MAN = W + 'empreintes-rapports-arbitres.json', MAN_SHA = 'c4d49fa6fd5feaac4653d5079ec8eb5cedd71fab89dd975437c1d662d32e6b0f', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', APERCU = W + 'sync-stable-apercu.md';
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
ok(sha(Buffer.from(man0, 'utf8')) === MAN_SHA && cles0.length === 42 && !Object.hasOwn(m0.empreintes, RAP), 'P1 manifeste réel : 42 entrées, à son empreinte ; rapport de T8 absent', MAN_SHA.slice(0, 12) + '…');
ok(shaF(join(root, RAP)) === RAP_SHA && /^\*\*Statut\*\* : \*\*arbitré le 2026-10-31\*\*/m.test(readFileSync(join(root, RAP), 'utf8')), 'P2 rapport de T8 arbitré, à l\'empreinte relue', RAP_SHA.slice(0, 12) + '…');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P3 index vide');

const tmp = mkdtempSync(join(tmpdir(), 'ocha-etape-b-t8-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 150);
const CTRL = { couverture: [W + 'couverture-lot3.mjs'], empreintes: [W + 'empreintes-lot3.mjs'], pilote: [W + 'controle-bilan-pilote.mjs'], T5: [W + 'recalcul-T5-perimetre.mjs'], T6: [W + 'recalcul-T6-perimetre.mjs'], T7: [W + 'recalcul-T7-perimetre.mjs'], T8: [W + 'recalcul-T8-perimetre.mjs'], relais: [W + 'controle-relais-allege.mjs', '--apres-application'] };
const tous = () => Object.fromEntries(Object.entries(CTRL).map(([k, a]) => [k, lancer(...a)]));
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim());
const idsE = (r) => ecartsDe(r).map((l) => l.split(/\s+/)[1]).sort().join();

// (2) État intermédiaire de départ, puis ajout, sur la copie, daté du jour
const R0 = tous(); const horsRelais0 = Object.entries(R0).filter(([k]) => k !== 'relais').every(([, r]) => r.code === 0);
ok(horsRelais0 && R0.relais.code === 1 && fin(R0.relais) === '28 conformes sur 30' && idsE(R0.relais) === 'C8,C9a', 'B0 état de départ, après A : contrôles à 0 ; relais 28 sur 30, C8 et C9a', fin(R0.relais));
const DATE = new Date().toISOString().slice(0, 10);
const avP = instantane(C);
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter');
const brut = readFileSync(f(MAN)); const m1 = JSON.parse(brut); const cles1 = Object.keys(m1.empreintes);
ok(aj.code === 0 && cles1.length === 43 && cles1[42] === RAP && m1.empreintes[RAP] === RAP_SHA, 'B1 43e entrée : rapport arbitré de T8, à son empreinte relue', fin(aj));
ok(cles0.every((k, i) => cles1[i] === k && m1.empreintes[k] === m0.empreintes[k]), 'B2 les 42 premières entrées inchangées, dans leur ordre, valeurs identiques', sha(cles0.join('\n')).slice(0, 12) + '…');
ok(JSON.stringify(m1.ajouts.slice(0, -1)) === JSON.stringify(m0.ajouts) && JSON.stringify(m1.ajouts.at(-1)) === JSON.stringify({ date: DATE, chemins: [RAP] }), 'B3 journal des ajouts : une ligne de plus, datée du jour de l\'exécution', DATE);
ok(JSON.stringify(diffI(avP, instantane(C))) === JSON.stringify([MAN]), 'B4 l\'ajout ne modifie que le manifeste');
const rj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); ok(rj.code !== 0 && shaF(f(MAN)) === sha(brut), 'B5 second ajout refusé, sans modification', 'code ' + rj.code);
const RI = tous(); const horsRelaisI = Object.entries(RI).filter(([k]) => k !== 'relais').every(([, r]) => r.code === 0);
ok(horsRelaisI && RI.relais.code === 1 && fin(RI.relais) === '29 conformes sur 30' && idsE(RI.relais) === 'C8', 'B6 état intermédiaire après l\'ajout : contrôles à 0 ; relais 29 sur 30, C8 seul', fin(RI.relais));

// (3) Synchronisation, sur la copie
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const apercu = readFileSync(f(APERCU), 'utf8');
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
const plus = changees(apercu);
dire(plus.map((l) => '   ' + l.slice(0, 150)).join('\n'));
ok(ap.code === 0 && plan && plus.some((l) => /^\+- \*\*Lot 3\*\* : 336 sens arbitrés sur 377 ; 41 restent \(0 proposés\)/.test(l)) && plus.some((l) => /43 rapports arbitrés identiques/.test(l)) && !plus.some((l) => /Corrections retenues/.test(l)), 'B7 aperçu : 336/377, 41 restent, 43 rapports ; ligne des corrections inchangée (197 dans 172 ENTRY, V1-25)', 'plan de simulation ' + plan);
const avS = instantane(C); const app = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', plan);
ok(app.code === 0 && JSON.stringify(diffI(avS, instantane(C))) === JSON.stringify([ETAT, ROAD].sort()), 'B8 synchronisation sur la copie : deux documents, aucun autre', fin(app));
for (const p of [ETAT, ROAD]) { const hors = (t) => t.replace(/<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/, ''); ok(hors(readFileSync(f(p), 'utf8')) === hors(readFileSync(join(root, p), 'utf8')), 'B9 ' + p + ' : seul le bloc a2-05:etat change'); }

// (4) État final
const R = tous();
for (const [k, r] of Object.entries(R)) dire('   ' + k + ' (code ' + r.code + ') : ' + fin(r));
ok(Object.values(R).every((r) => r.code === 0) && /^empreintes : 43 rapports contrôlés, identiques/.test(R.empreintes.out) && fin(R.relais) === '30 conformes sur 30' && /336 arbitrés, 0 proposés, 41 restants/.test(R.couverture.out), 'B10 état final : tous les contrôles à 0 ; 43 empreintes ; relais 30 sur 30 ; 336/377');
const asm = spawnSync(process.execPath, [f('tools/reconstruction/run.mjs'), 'assemble'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(asm.status === 0, 'B11 assemblage réel sur la copie', 'code ' + asm.status);
const vide = lancer(W + 'sync-stable.mjs', '--apercu'); ok(vide.code === 0 && !changees(readFileSync(f(APERCU), 'utf8')).length, 'B12 aperçu suivant vide');

// (5) Protections : chaque sabotage doit être vu par au moins un contrôle, puis tout est restauré
const manT = (g) => (t) => { const o = JSON.parse(t); g(o); return JSON.stringify(o, null, 1) + '\n'; };
const echange = (o) => { const e = Object.entries(o.empreintes); [e[3], e[4]] = [e[4], e[3]]; o.empreintes = Object.fromEntries(e); };
const sabote = (nom, p, g) => {
  const orig = readFileSync(f(p)); const mod = g(orig.toString('utf8'));
  if (mod === orig.toString('utf8')) { ok(false, nom, 'sabotage sans effet'); return; }
  writeFileSync(f(p), mod); const r = tous(); writeFileSync(f(p), orig);
  const vus = Object.entries(r).filter(([, x]) => x.code !== 0).map(([k]) => k);
  ok(vus.length > 0 && shaF(f(p)) === sha(orig), nom, 'vu par : ' + vus.join(', '));
};
sabote('S1 ordre de deux des 42 premières entrées inversé', MAN, manT(echange));
sabote('S2 retour à 42 entrées, journal des ajouts laissé', MAN, manT((o) => { delete o.empreintes[RAP]; }));
sabote('S3 retour à 42 entrées, dernier ajout retiré aussi', MAN, manT((o) => { delete o.empreintes[RAP]; o.ajouts.pop(); }));
sabote('S4 empreinte d\'une ancienne entrée altérée', MAN, manT((o) => { const k = Object.keys(o.empreintes)[0]; o.empreintes[k] = '0'.repeat(64); }));
sabote('S5 rapport arbitré de T8 modifié après l\'ajout', RAP, (t) => t + ' ');
sabote('S6 rapport de T8 placé avant la 42e entrée', MAN, manT((o) => { const e = Object.entries(o.empreintes); const d = e.pop(); e.splice(41, 0, d); o.empreintes = Object.fromEntries(e); }));
sabote('S7 ajout daté hors d\'ordre', MAN, manT((o) => { o.ajouts.at(-1).date = '2026-01-01'; }));
const temoin = tous(); ok(Object.values(temoin).every((r) => r.code === 0), 'S8 témoin sain après les sabotages');

// (6) Sorties, seulement sans écart
const ciblesFinales = { etat: readFileSync(f(ETAT)), road: readFileSync(f(ROAD)) };
if (!ko) {
  const d = join(root, OUT); mkdirSync(d, { recursive: true });
  writeFileSync(join(d, 'manifeste-simule-' + DATE + '.json'), brut); writeFileSync(join(d, 'apercu-simule.md'), apercu);
  const dT = join(tmp, 'd'); mkdirSync(dT);
  const diff = (a, b, nom) => { writeFileSync(join(dT, 'avant'), a); writeFileSync(join(dT, 'apres'), b); const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', 'avant', 'apres'], { cwd: dT, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, nom), r.stdout); };
  diff(man0, brut, 'manifeste.diff'); diff(readFileSync(join(root, ETAT)), ciblesFinales.etat, 'ETAT-ACTUEL.md.diff'); diff(readFileSync(join(root, ROAD)), ciblesFinales.road, 'ROADMAP.md.diff');
}
rmSync(tmp, { recursive: true, force: true });
const ch = diffI(reel0, instantane(root)); ok(!ch.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', ch.join(', ') || Object.keys(reel0).length + ' fichiers');
constat('valeurs de simulation, non réutilisables pour une application', 'date ' + DATE + ' ; plan ' + plan);
dire(ko ? ko + ' écart(s) ; aucune sortie écrite' : 'préparation de l\'étape B conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
