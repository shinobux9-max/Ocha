// A2-05 · T8 : préparation de l'état E2 (42e entrée du manifeste), EN PROPOSITION, sur une copie jetable : le dépôt réel n'est pas modifié.
// Usage : node a2-05-travail/arbitrage-T8/preparation-E2/preparer-E2.mjs <racine du dépôt>
// (1) Préconditions : E1 en place. (2) Ajout sur la copie, par l'outil, daté du jour. (3) Contrôles attendus après E2. (4) Protections : chaque sabotage est vérifié
// comme modifiant le fichier, puis restauré. (5) Sorties dans preparation-E2/sortie/, seulement sans écart. La date et le manifeste simulés n'autorisent rien : la
// date de l'ajout sera celle de l'exécution réelle.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-T8/preparation-E2/sortie/', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md', RAP_SHA = '5b46f9353e38fb9f4b522d4363fe2b843de52819e214847cfdb5e35f508e96bb';
const MAN = W + 'empreintes-rapports-arbitres.json', MAN_SHA = 'd109766350b91e103a1190ae559cf052352607677a323fb3535c925d91ba8981', APERCU = W + 'sync-stable-apercu.md', SAUV = W + 'arbitrage-T8/proposition-T8-perimetre.md', PROP_SHA = 'c087860fb89da40410a572fc48ea31d3f881713a0af24575f36e8540063d37b8';
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => sha(readFileSync(p));
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || p.startsWith(OUT)) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
if (existsSync(join(root, OUT))) { console.log('ARRÊT : ' + OUT + ' existe déjà'); process.exit(1); }
const reel0 = instantane(root);
const man0 = readFileSync(join(root, MAN), 'utf8'); const m0 = JSON.parse(man0); const c0 = Object.keys(m0.empreintes);

// (1) Préconditions
ok(sha(man0) === MAN_SHA && c0.length === 41 && c0.every((p) => shaF(join(root, p)) === m0.empreintes[p]) && !Object.hasOwn(m0.empreintes, RAP), 'P1 manifeste réel : 41 empreintes conformes ; rapport de T8 absent', MAN_SHA.slice(0, 12) + '…');
ok(shaF(join(root, RAP)) === RAP_SHA && /^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-31 \(§0\)\.\*\*/m.test(readFileSync(join(root, RAP), 'utf8')), 'P2 rapport de T8 accepté, à l\'empreinte relue', RAP_SHA.slice(0, 12) + '…');
ok(shaF(join(root, SAUV)) === PROP_SHA, 'P3 proposition sauvegardée intacte', PROP_SHA.slice(0, 12) + '…');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P4 index vide');
const tmp = mkdtempSync(join(tmpdir(), 'ocha-e2-t8-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 130);
const CTRL = { couverture: [W + 'couverture-lot3.mjs'], empreintes: [W + 'empreintes-lot3.mjs'], pilote: [W + 'controle-bilan-pilote.mjs'], T5: [W + 'recalcul-T5-perimetre.mjs'], T6: [W + 'recalcul-T6-perimetre.mjs'], T7: [W + 'recalcul-T7-perimetre.mjs'], T8: [W + 'recalcul-T8-perimetre.mjs'], relais: [W + 'controle-relais-allege.mjs', '--apres-application'] };
const tous = () => Object.fromEntries(Object.entries(CTRL).map(([k, a]) => [k, lancer(...a)]));
const rel0 = lancer(...CTRL.relais); ok(rel0.code === 1 && fin(rel0) === '29 conformes sur 30', 'P5 état de départ : relais 29 sur 30, C9a', fin(rel0));

// (2) Ajout, sur la copie
const JOUR = new Date().toISOString().slice(0, 10); const av = instantane(C);
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); const brut = readFileSync(f(MAN)); const m1 = JSON.parse(brut); const c1 = Object.keys(m1.empreintes);
ok(aj.code === 0 && c1.length === 42 && c1[41] === RAP && m1.empreintes[RAP] === RAP_SHA, 'E2-1 42e entrée : rapport accepté de T8, à son empreinte relue', fin(aj));
ok(c0.every((k, i) => c1[i] === k && m1.empreintes[k] === m0.empreintes[k]), 'E2-2 les 41 premières entrées conservées, dans leur ordre', sha(c0.join('\n')).slice(0, 12) + '…');
ok(m1.ajouts.length === m0.ajouts.length + 1 && JSON.stringify(m1.ajouts.slice(0, -1)) === JSON.stringify(m0.ajouts) && JSON.stringify(m1.ajouts.at(-1)) === JSON.stringify({ date: JOUR, chemins: [RAP] }), 'E2-3 historique des ajouts : un seul élément nouveau, daté du jour de l\'exécution', m0.ajouts.length + ' → ' + m1.ajouts.length + ' ; ' + JOUR);
ok(JSON.stringify(diffI(av, instantane(C))) === JSON.stringify([MAN]), 'E2-4 l\'ajout ne modifie que le manifeste');
const rj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); ok(rj.code !== 0 && shaF(f(MAN)) === sha(brut), 'E2-5 second ajout refusé, sans modification', 'code ' + rj.code);

// (3) Contrôles attendus après E2
const R = tous(); for (const [k, r] of Object.entries(R)) dire('   ' + k + ' (code ' + r.code + ') : ' + fin(r));
ok(Object.values(R).every((r) => r.code === 0) && /^empreintes : 42 rapports contrôlés, identiques$/.test(R.empreintes.out) && fin(R.relais) === '30 conformes sur 30' && /320 arbitrés, 0 proposés, 57 restants/.test(R.couverture.out), 'E2-6 contrôles attendus : tous à 0 ; 42 empreintes ; relais 30 sur 30 ; 320/377');
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const apT = readFileSync(f(APERCU), 'utf8'); const ch = apT.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
ok(ap.code === 0 && ch.length === 8 && ch.filter((l) => /^\+.*42 rapports arbitrés identiques/.test(l)).length === 2 && !ch.some((l) => /Corrections retenues|Lot 3/.test(l)), 'E2-7 aperçu après E2 : marqueur et compteur seuls, huit lignes, pour E3, non appliquée', ch.length + ' lignes');

// (4) Protections
const manT = (g) => (t) => { const o = JSON.parse(t); g(o); return JSON.stringify(o, null, 1) + '\n'; };
const sabote = (nom, p, g) => { const orig = readFileSync(f(p)); const mod = g(orig.toString('utf8')); if (mod === orig.toString('utf8')) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(f(p), mod); const r = tous(); writeFileSync(f(p), orig); const vus = Object.entries(r).filter(([, x]) => x.code !== 0).map(([k]) => k); ok(vus.length > 0 && shaF(f(p)) === sha(orig), nom, 'vu par : ' + vus.join(', ')); };
sabote('S1 ordre de deux des 41 premières entrées inversé', MAN, manT((o) => { const e = Object.entries(o.empreintes); [e[3], e[4]] = [e[4], e[3]]; o.empreintes = Object.fromEntries(e); }));
sabote('S2 retour à 41 entrées, journal des ajouts laissé', MAN, manT((o) => { delete o.empreintes[RAP]; }));
sabote('S3 retour à 41 entrées, dernier ajout retiré aussi', MAN, manT((o) => { delete o.empreintes[RAP]; o.ajouts.pop(); }));
sabote('S4 empreinte d\'une ancienne entrée altérée', MAN, manT((o) => { o.empreintes[Object.keys(o.empreintes)[0]] = '0'.repeat(64); }));
sabote('S5 périmètre accepté modifié après l\'ajout', RAP, (t) => t + ' ');
sabote('S6 périmètre de T8 placé avant la 41e entrée', MAN, manT((o) => { const e = Object.entries(o.empreintes); const d = e.pop(); e.splice(40, 0, d); o.empreintes = Object.fromEntries(e); }));
sabote('S7 ajout daté hors d\'ordre', MAN, manT((o) => { o.ajouts.at(-1).date = '2026-01-01'; }));
const tem = tous(); ok(Object.values(tem).every((r) => r.code === 0), 'S8 témoin sain après les sabotages');

// (5) Sorties
if (!ko) {
  const d = join(root, OUT); mkdirSync(d, { recursive: true }); writeFileSync(join(d, 'manifeste-simule-' + JOUR + '.json'), brut); writeFileSync(join(d, 'apercu-apres-E2-simule.md'), apT);
  const dT = join(tmp, 'd'); mkdirSync(dT); writeFileSync(join(dT, 'avant'), man0); writeFileSync(join(dT, 'apres'), brut);
  writeFileSync(join(d, 'manifeste.diff'), spawnSync('git', ['diff', '--no-index', '--no-color', '--', 'avant', 'apres'], { cwd: dT, encoding: 'utf8' }).stdout);
}
rmSync(tmp, { recursive: true, force: true });
const reel1 = instantane(root); const chR = diffI(reel0, reel1); ok(!chR.length && !spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'dépôt réel inchangé ; index vide', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
dire('constat  valeur de simulation, non réutilisable : date ' + JOUR + ' ; manifeste simulé ' + sha(brut).slice(0, 12) + '…');
dire(ko ? ko + ' écart(s) ; aucune sortie écrite' : 'préparation de E2 conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
