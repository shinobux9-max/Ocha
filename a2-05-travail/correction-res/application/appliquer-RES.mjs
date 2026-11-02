// A2-05 : application de la correction technique du défaut « RES » (voie A, autorisée le 2026-11-01) : deux diffs relus, par remplacements ciblés, une seule fois.
// Usage : node a2-05-travail/correction-res/application/appliquer-RES.mjs <racine du dépôt>
// (1) Préconditions, sans écriture : empreintes de départ et proposées, diffs régénérés identiques aux diffs relus, 44 empreintes, périmètre de T9 protégé, 24 sens inchangés, relais, aperçu, index.
// (2) Deux originaux sauvegardés. (3) Remplacements ciblés, résultat égal aux versions relues. (4) Contrôles, dont les 46 groupes historiques, T9, les marques non définies et les rapports
// protégés, sur un clone jetable de l'état corrigé, l'ancien générateur gardé à côté. Arrêt au premier écart, avant ou après écriture ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, copyFileSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'correction-res/regeneration/', A = W + 'correction-res/application/', DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/';
const GEN = W + 'perimetre-v2.mjs', REC = W + 'recalcul-T9-perimetre.mjs', CRB = W + 'criblage/resultat.json', REG = W + 'registre-tranches.json', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md', CFG = W + 'perimetre-T9.mjs', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const DEC = 'docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md', RT8 = 'docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md';
const D = [ // cible, départ, proposé, diff relu
  [GEN, 'd40aea3cc3e7916d1194b143563292c8e0bb8cba95f7da02c18332beb5ecfaac', '6537c0ee36816b0eea17269502dc8e9876fe1579fc1115fc31eebca7e3a496d1', '99c239385f52765e9e54be7536f3420839a498f1931205ac628bdaa89a346cf2'],
  [REC, '63aaa07c854fd6a79eba540f6b63c0bb5fbec8159b72a6eb74d035d7567f8a06', 'af7331546832faf98d35f9e22687294b5505cbad4906633927cf2d028fc58929', 'a945f68406c70bc1a9cc69ff452e0e4d45f7c761a0ed95e15b09ab74bf7981b5'],
];
const [, GEN0, GEN1] = D[0];
const MAN_SHA = '2c74018e3b04c06395298e2452d039de409353aae8a62d5d7d99cf43e01f78e3', RAP_SHA = '85faf16c39db3e262524bb98b6fa8e6f60afe97a37d694e8119d7a5138933e88', CRB_SHA = 'aef9e029f25c17d36200587d5f7cee01035444868f54c453f30d19b6bff0060d', PLAN = '7d25ea8442b9dd06';
const REMPL = { [GEN]: [["(C\\d+-[a-z0]) \\| ([^|]+) \\| \\d+ \\|$/gm)", "(C\\d+-[a-z0]|RES) \\| ([^|]+) \\| \\d+ \\|$/gm)"]], [REC]: [["GENERATEUR = '" + GEN0 + "'", "GENERATEUR = '" + GEN1 + "'"], ["'générateur et criblage inchangés (défaut non corrigé, marques conservées)'", "'générateur à sa version corrigée (voie A, sur autorisation) ; criblage inchangé, marques conservées'"]] };
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const nom = (p) => p.split('/').pop();
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const trace = []; let ecrit = false;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
// Arrêt au premier écart ; après écriture, la trace est conservée et l'état atteint n'est pas réparé
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (b) return; dire('ARRÊT : premier écart, ' + (ecrit ? 'état atteint conservé, aucune réparation' : 'avant écriture')); if (ecrit) { mkdirSync(join(root, SOR), { recursive: true }); writeFileSync(join(root, SOR, 'application-RES.txt'), trace.join('\n') + '\n'); } process.exit(1); };
const lancerIn = (r, s, ...a) => { const x = spawnSync(process.execPath, [join(r, s), r, ...a], { cwd: r, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const lancer = (s, ...a) => lancerIn(root, s, ...a);
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const fin = (r) => r.out.split('\n').pop();
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
const corps = (d) => d.slice(d.indexOf('@@')); // en-tête retiré : les chemins comparés diffèrent seuls
const etat = () => { const r = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }); return (r.stdout ?? '').trim(); };
const ETAT_ATTENDU = '{"arbitres":336,"restants":41,"proposes":0,"corrections":197,"entry":172,"libre":"V1-25","reserves":["V1-22","V1-23"]}';
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || [DEP, SOR, REELS].some((x) => (p + '/').startsWith(x))) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const diffI = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim();
const man = JSON.parse(lire(MAN)).empreintes; const cles = Object.keys(man);

// (1) Préconditions
dire('--- Préconditions');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P1 index vide');
ok(!existsSync(join(root, DEP)), 'P2 sauvegarde absente');
ok(shaF(MAN) === MAN_SHA && cles.length === 44 && cles.every((p) => shaF(p) === man[p]), 'P3 manifeste : 44 empreintes conformes', MAN_SHA);
ok(cles[43] === RAP && man[RAP] === RAP_SHA, 'P4 périmètre accepté de T9 protégé, en 44e entrée', RAP_SHA);
ok(shaF(CRB) === CRB_SHA && !zones(), 'P5 criblage inchangé ; zones data, reconstruction, tests, tools, docs/conception sans modification : les 24 sens sont inchangés');
for (const [p, d, v, h] of D) {
  ok(shaF(p) === d, 'P6 empreinte intégrale de départ : ' + nom(p), d);
  ok(shaF(OUT + 'proposition/' + nom(p)) === v, 'P7 empreinte intégrale proposée : ' + nom(p), v);
  const r = git('diff', '--no-index', '--no-color', '--', p, OUT + 'proposition/' + nom(p));
  ok(r.status === 1 && sha(r.stdout) === h && shaF(OUT + 'diffs/' + nom(p) + '.diff') === h && corps(r.stdout) === corps(lire(OUT + 'diffs/' + nom(p) + '.diff')), 'P8 diff régénéré = diff approuvé, octet pour octet à partir du premier @@ : ' + nom(p), h);
  ok(REMPL[p].every(([a]) => lire(p).split(a).length === 2), 'P9 ancres uniques : ' + nom(p), REMPL[p].length + ' remplacement(s)');
}
const r90 = lancer(REC); const n90 = r90.out.split('\n').filter((l) => l.startsWith('conforme ')).length; ok(r90.code === 0 && n90 === 33, 'P10 recalcul de T9 : 33 contrôles conformes, 24 sens égaux au périmètre', n90 + ' ; code ' + r90.code);
const ap0 = lancer(W + 'sync-stable.mjs', '--apercu'); ok(ap0.code === 0 && !changees(lire(APERCU)).length && (ap0.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] === PLAN, 'P11 aperçu vide', fin(ap0));
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P12 relais : 30 sur 30', fin(rel0));
const arbre0 = instantane(root); const avant = Object.fromEntries(D.map(([p]) => [p, lire(p)]));
const sorties = {}; for (const [p, , v] of D) { const t = REMPL[p].reduce((x, [a, b]) => x.replace(a, () => b), avant[p]); sorties[p] = t; ok(sha(Buffer.from(t, 'utf8')) === v, 'P13 résultat des remplacements = version relue : ' + nom(p), v); }

// (2) Sauvegarde, (3) application
dire('--- Sauvegarde et application');
mkdirSync(join(root, DEP), { recursive: true }); mkdirSync(join(root, SOR), { recursive: true }); mkdirSync(join(root, REELS), { recursive: true });
for (const [p, d] of D) { copyFileSync(join(root, p), join(root, DEP + nom(p))); ok(shaF(DEP + nom(p)) === d, 'original sauvegardé : ' + nom(p), d); }
ecrit = true;
for (const [p] of D) { writeFileSync(join(root, p), sorties[p]); ok(true, 'écrit : ' + p); }

// (4) Contrôles sur le dépôt réel
dire('--- Contrôles après RES');
for (const [p, , v] of D) {
  ok(shaF(p) === v, 'C1 fichier identique à la version approuvée, octet pour octet : ' + nom(p), v);
  const r = git('diff', '--no-index', '--no-color', '--', DEP + nom(p), p); writeFileSync(join(root, REELS, nom(p) + '.diff'), r.stdout);
  ok(r.status === 1 && corps(r.stdout) === corps(lire(OUT + 'diffs/' + nom(p) + '.diff')), 'C2 diff réel = diff approuvé, à partir du premier @@ : ' + nom(p), sha(corps(r.stdout)));
}
const r9 = lancer(REC); const n9 = r9.out.split('\n').filter((l) => l.startsWith('conforme ')).length; ok(r9.code === 0 && n9 === 33, 'C3 recalcul de T9 : 33 contrôles conformes', n9 + ' ; code ' + r9.code);
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'C4 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /336 arbitrés, 0 proposés, 41 restants, sur 377/.test(cov.out), 'C5 couverture : 336/377, 41 restants', cov.out.slice(0, 70));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 44 rapports contrôlés, identiques$/.test(emp.out) && shaF(MAN) === MAN_SHA, 'C6 manifeste : 44 empreintes conformes, inchangé', emp.out.slice(0, 80));
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C7 relais : 30 sur 30', fin(rel));
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); ok(ap1.code === 0 && !changees(lire(APERCU)).length && (ap1.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] === PLAN, 'C8 aperçu vide', fin(ap1));
ok(etat() === ETAT_ATTENDU, 'C9 197 corrections dans 172 ENTRY ; V1-22 et V1-23 réservés ; V1-25 libre', etat());
ok((lire(BIL).match(/^\| V1-24 \|/gm) ?? []).length === 1, 'C9 V1-24 retenue, une ligne de correction');
const pasBon = JSON.parse(lire('data/n5/vocab.json')).find((e) => e.id === 'v_427').senses[0].meaning.alternatives; ok(JSON.stringify(pasBon) === '["Pas bon"]', 'C10 aucune correction appliquée : `v_427_s1` publie toujours « Pas bon »');
const arbre1 = instantane(root); const mod = diffI(arbre0, arbre1); ok(JSON.stringify(mod) === JSON.stringify([GEN, REC].sort()) && !zones(), 'C11 arbre entier comparé : deux fichiers exactement ; normes, données, registre et décisions historiques inchangés', Object.keys(arbre1).length + ' fichiers ; zones git sans modification');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C12 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C13 git diff --check', 'code ' + dc.status);

// Contrôles du générateur corrigé, sur un clone jetable de l'état corrigé, l'ancien générateur à côté
dire('--- Générateur corrigé, sur clone jetable');
const tmp = mkdtempSync(join(tmpdir(), 'ocha-res-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p); const S = join(tmp, 'sorties'); mkdirSync(S);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diffI(arbre1, instantane(C)).length, 'G0 clone identique à l\'état corrigé', Object.keys(arbre1).length + ' fichiers');
writeFileSync(f(W + 'perimetre-v2-actuel.mjs'), readFileSync(join(root, DEP + nom(GEN))));
const { produirePerimetre: ancien } = await import(pathToFileURL(f(W + 'perimetre-v2-actuel.mjs')).href);
const { produirePerimetre: nouveau } = await import(pathToFileURL(f(GEN)).href);
const essai = (gen, n, livraisons) => { const sortie = join(S, n + '-' + (gen === ancien ? 'a' : 'n') + '.md'); try { const r = gen({ root: C, nom: n, livraisons, date: '2026-11-01', sortie, autorisation: 'essai', nonreg: true }); return { txt: readFileSync(sortie, 'utf8'), r }; } catch (e) { return { err: e.message }; } };
const E = ['E1', 'E2', 'E3'];
const dec = lire(DEC).replace(/\r\n/g, '\n');
const synth = [...dec.matchAll(/^\| ([A-F][0-9]+) \| [A-F] \| [^|]+ \| [0-9]+ \| [0-9]+ \| [^|]+ \|$/gm)].map((m) => m[1]);
const groupes = [...JSON.parse(lire(REG)).tranches.filter((t) => t.id !== 'T9').map((t) => [t.id, t.livraisons]), ...synth.filter((l) => !/^E/.test(l)).map((l) => [l, [l]])];
const diff = []; let produits = 0; for (const [n, l] of groupes) { const a = essai(ancien, n, l), b = essai(nouveau, n, l); if (a.txt) produits++; if (a.txt !== b.txt || a.err !== b.err) diff.push(n); }
ok(!diff.length && groupes.length === 46 && produits === 46, 'G1 46 groupes historiques inchangés, octet pour octet, ancien et corrigé', groupes.length + ' groupes ; différents : ' + (diff.join(', ') || 'aucun'));
const a9 = essai(ancien, 'T9', E); ok(a9.err === 'règle RES : définition introuvable', 'G2 ancien générateur sur T9 : arrêt exact', a9.err);
const n9b = essai(nouveau, 'T9', E); ok(n9b.txt && n9b.r.sens === 24 && n9b.r.entry === 21 && n9b.r.regles.includes('RES') && /^\| RES \| point déjà réservé à A2-05 par un lot \| /m.test(n9b.txt), 'G3 génération de T9 : 24 sens, 21 ENTRY, RES reconnu', n9b.err ?? n9b.r.regles.length + ' règles');
const crib0 = readFileSync(f(CRB));
for (const regle of ['QQQ', 'C99-z', 'RES2', 'res', 'RESERVE', 'XRES', 'C1']) { const o = JSON.parse(crib0); o.candidats.find((c) => c.id === 'v_465_s1').regles.push({ axe: 'C1', regle, detail: 'essai' }); writeFileSync(f(CRB), JSON.stringify(o)); const e = essai(nouveau, 'T9', E); writeFileSync(f(CRB), crib0); ok(e.err === 'règle ' + regle + ' : définition introuvable', 'G4 marque non définie refusée : ' + regle, e.err); }
for (const [p, n, l] of [[RT8, 'T8', ['D5', 'D8']], [RAP, 'T9', E]]) { let m = ''; try { nouveau({ root: C, nom: n, livraisons: l, date: '2026-11-01', sortie: p, autorisation: 'essai', nonreg: true }); } catch (e) { m = e.message; } ok(/protégé par le manifeste/.test(m), 'G5 rapport protégé de ' + n + ' : régénération refusée', m.slice(-60)); }
rmSync(f(W + 'perimetre-v2-actuel.mjs'));
const pT = lancerIn(C, CFG); ok(pT.code !== 0 && /protégé par le manifeste/.test(pT.out) && sha(readFileSync(f(RAP))) === RAP_SHA, 'G6 perimetre-T9.mjs : refus, rapport accepté inchangé');
rmSync(tmp, { recursive: true, force: true });
ok(JSON.stringify(diffI(arbre1, instantane(root))) === '[]', 'G7 dépôt réel inchangé par ces contrôles');
writeFileSync(join(root, SOR, 'application-RES.txt'), trace.join('\n') + '\nRES conforme\n');
console.log('RES conforme');
process.exit(0);
