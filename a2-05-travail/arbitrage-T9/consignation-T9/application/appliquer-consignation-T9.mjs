// A2-05 · T9 : application de la consignation des opérations A, B1 et B2 (autorisée le 2026-11-01) : quatre diffs relus, appliqués par remplacements ciblés.
// T9 n'est pas clôturée. Usage : node a2-05-travail/arbitrage-T9/consignation-T9/application/appliquer-consignation-T9.mjs <racine du dépôt>
// (1) Préconditions, sans écriture : index vide ; 45 empreintes ; fins de ligne ; ancres uniques ; ajouts absents ; aperçu vide ; relais 30 sur 30 ; recalculs de T5 à T9 conformes ;
// empreintes de départ, versions proposées et diffs relus ; diffs régénérés identiques. (2) Quatre originaux sauvegardés. (3) Hunks appliqués par remplacements ciblés ; résultat
// égal à la version relue. (4) Contrôles. Arrêt au premier écart, avant ou après écriture ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-T9/consignation-T9/', A = OUT + 'application/', DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md';
const MARQUEUR = 'fe4967cf00896f07', PLAN = 'c6001f09d6a4672c', PLAN_APRES = '02704a905a7b7b2c', MAN_SHA = '89716587f51f6359b567cf56b07437b69093d67583c3180268fc7467183e836e';
const RECS = [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['recalcul de T9', W + 'recalcul-T9-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']];
const D = [ // cible, départ, proposé, diff relu
  [BIL, '03b107ad5d216003f91643480b430e79c7ec191c6b6135b84567b724874f4d1c', 'fb60295d0076225896747bf61e3d489467038a26e012e48d6d7ffc0dcf718b7a', '10aeb9cdc8a4aa9c076a5e6704a0add7111f55dd1452aec8e9920dbe11bbd0f0'],
  [ETAT, 'f59837170b9b6d66e9489a7b53b09c2dd83bb10bef8a95939373ec1a49d04363', 'd9a2a2f7ae3fe2c9e17d20b08356b7e10883144e7182e335e13790645baade17', 'aa983f00e0b6d93df5d2ff97b066b27a602c4d900d8a2a8b0a07771d1e92cf3a'],
  [ROAD, '1c65f0e446ab23ea9e94ae9c1f132e4f31d35ef36eb47971f9e6618c5e147482', 'fcdaa47173516322de767ad21df3c2e5b1b5ca95d0e79f6d672cede11ba62b03', '203179608dfdf5adbc1b8f77832f18679de0a7313e094c4b0f8756058203997a'],
  [INV, 'ee14749cbe6372dd3126e6957fce25b8c8cbaeac44b4643ef62a0a8eca30dfd1', '018b40bc87b6f257bebb69ac520b0951a7ee243f9fb17f3e79e4a97ed95dc3b6', '61652c297a52ae43915ee85b1af6ab238966a3a4bfc40e404dddf6ad1418d582'],
];
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const nom = (p) => p.split('/').pop();
const BLOC = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const trace = []; let ecrit = false;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
// Arrêt au premier écart ; après écriture, la trace est conservée et l'état atteint n'est pas réparé
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (b) return; dire('ARRÊT : premier écart, ' + (ecrit ? 'état atteint conservé, aucune réparation' : 'avant écriture des documents')); if (ecrit) { mkdirSync(join(root, SOR), { recursive: true }); writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\n'); } process.exit(1); };
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const fin = (r) => r.out.split('\n').pop();
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
const apercu = () => { const r = lancer(W + 'sync-stable.mjs', '--apercu'); return { r, vide: r.code === 0 && !changees(lire(APERCU)).length, plan: (r.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] }; };
const etat = () => { const r = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,proposes:v.proposes,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves}))"], { cwd: root, encoding: 'utf8' }); return (r.stdout ?? '').trim(); };
const ETAT_ATTENDU = '{"arbitres":360,"restants":17,"proposes":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"]}';
const restantsF = () => spawnSync(process.execPath, ['--input-type=module', '-e', "import {couverture} from './a2-05-travail/couverture-lot3.mjs'; const s=couverture('.').sens.filter((x)=>x.etat!=='arbitré'); console.log(s.length, [...new Set(s.map((x)=>x.livraison))].sort().join())"], { cwd: root, encoding: 'utf8' }).stdout.trim();
const pasAppliquees = () => { const v = JSON.parse(lire('data/n5/vocab.json')); const e = (id) => v.find((x) => x.id === id); const fns = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse]; return JSON.stringify(e('v_348').senses[1].meaning.alternatives) === '["Auparavant"]' && !fns(e('v_285').senses[0]).length && !fns(e('v_704').senses[1]).length && JSON.stringify(e('v_594').tags) === '["lieu_konbini","lieu_restaurant"]' && ['v_91', 'v_92', 'v_459'].every((id) => JSON.stringify(e(id).tags) === '["lieu_restaurant"]') && JSON.stringify(e('v_427').senses[0].meaning.alternatives) === '["Pas bon"]'; };
// Fins de ligne : un fichier est tout CRLF ou tout LF ; un fichier mixte n'est pas préservable par le remplacement sur texte LF
const style = (b) => { const crlf = (b.match(/\r\n/g) ?? []).length, lf = (b.match(/\n/g) ?? []).length; return crlf === lf ? 'CRLF' : crlf === 0 ? 'LF' : 'mixte'; };
// Hunks d'un diff : ancien et nouveau blocs, lignes de contexte comprises
const hunks = (diff) => { const H = []; let h = null; for (const l of diff.split('\n')) { if (l.startsWith('@@')) { h = { a: [], b: [] }; H.push(h); continue; } if (!h || l.startsWith('\\')) continue; if (l[0] === ' ' || l === '') { if (l === '') continue; h.a.push(l.slice(1)); h.b.push(l.slice(1)); } else if (l[0] === '-') h.a.push(l.slice(1)); else if (l[0] === '+') h.b.push(l.slice(1)); } return H.map((x) => ({ a: x.a.join('\n'), b: x.b.join('\n') })); };
// Les diffs sont normalisés en LF par git (core.autocrlf) : ancres cherchées sur le texte en LF, fins de ligne du document rétablies ensuite
const LFs = (t) => t.replace(/\r\n/g, '\n');
const appliquerHunks = (t0, H) => { const crlf = t0.includes('\r\n'); let t = LFs(t0); for (const { a, b } of H) { if (!a) throw new Error('hunk sans ancre'); if (t.split(a).length !== 2) throw new Error('ancre non unique'); t = t.replace(a, () => b); } return crlf ? t.replace(/\n/g, '\r\n') : t; };
const corps = (d) => d.slice(d.indexOf('@@')); // en-tête retiré : les chemins comparés diffèrent seuls
const instantane = () => { const h = {}; const m = (d) => { for (const e of readdirSync(join(root, d), { withFileTypes: true })) { const p = d ? d + '/' + e.name : e.name; if (!d && EXCLUS.includes(e.name)) continue; if (p.endsWith('.zip') || p === APERCU || [DEP, SOR, REELS].some((x) => (p + '/').startsWith(x))) continue; if (e.isDirectory()) m(p); else h[p] = sha(readFileSync(join(root, p))); } }; m(''); return h; };
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim();
const man = JSON.parse(lire(MAN)).empreintes; const cles = Object.keys(man);

// (1) Préconditions : les contrôles de structure passent avant ceux d'empreinte, pour que chacun soit atteignable à l'essai
dire('--- Préconditions');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P1 index vide');
ok(!existsSync(join(root, DEP)), 'P2 sauvegarde absente');
ok(shaF(MAN) === MAN_SHA && cles.length === 45 && cles.every((p) => shaF(p) === man[p]), 'P3 manifeste : 45 empreintes conformes', MAN_SHA);
const H = {};
for (const [p] of D) {
  const prop = OUT + nom(p), s = style(lire(p));
  ok(s !== 'mixte' && s === style(lire(prop)), 'P4 fins de ligne homogènes et égales à celles de la version proposée : ' + nom(p), s);
  H[p] = hunks(readFileSync(join(root, OUT + 'diffs/' + nom(p) + '.diff'), 'utf8'));
  const t = LFs(lire(p)); ok(H[p].length > 0 && H[p].every(({ a, b }) => a && t.split(a).length === 2 && t.split(b).length === 1), 'P5 ancres uniques, ajouts absents du texte : ' + nom(p), H[p].length + ' hunk(s)');
}
ok(!/^### 8\.113 /m.test(lire(BIL)) && (lire(BIL).match(/^### 8\.112 /gm) ?? []).length === 1, 'P6 ajout absent : §8.113 ; §8.112 présent');
ok(!lire(INV).includes('| `arbitrage-T9/application-B2/appliquer-B2.mjs` |'), 'P6 ajout absent : lignes de l\'inventaire');
ok(!lire(ETAT).includes('**Consolidation technique de T9 arbitrée achevée en trois opérations'), 'P6 ajout absent : ligne de journal');
const ap0 = apercu(); ok(ap0.vide && ap0.plan === PLAN, 'P7 aperçu de synchronisation vide', fin(ap0.r));
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P8 relais de départ : 30 sur 30', fin(rel0));
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'P8 bis ' + n + ' conforme', 'code ' + r.code + ' ; ' + fin(r)); }
for (const [p, d, v, h] of D) {
  const prop = OUT + nom(p);
  ok(shaF(p) === d, 'P9 empreinte de départ : ' + p, shaF(p));
  ok(shaF(prop) === v, 'P10 version proposée : ' + nom(p), shaF(prop));
  const r = git('diff', '--no-index', '--no-color', '--', p, prop);
  ok(r.status === 1 && sha(r.stdout) === h && shaF(OUT + 'diffs/' + nom(p) + '.diff') === h, 'P11 diff relu et diff régénéré identiques, octet pour octet : ' + nom(p), h);
}
const avant = Object.fromEntries(D.map(([p]) => [p, lire(p)]));
const blocs0 = [ETAT, ROAD].map((p) => lire(p).match(BLOC)[0]);
const arbre0 = instantane();

// (2) Sauvegarde, (3) application
dire('--- Sauvegarde et application');
for (const [p] of D) { mkdirSync(dirname(join(root, DEP + p)), { recursive: true }); copyFileSync(join(root, p), join(root, DEP + p)); ok(shaF(DEP + p) === shaF(p), 'original sauvegardé : ' + nom(p), shaF(p)); }
// Résultat calculé pour les quatre avant d'en écrire un seul
const sorties = {}; for (const [p, , v] of D) { const t = appliquerHunks(avant[p], H[p]); sorties[p] = t; ok(sha(Buffer.from(t, 'utf8')) === v, 'résultat des hunks = version relue : ' + nom(p), v); }
ecrit = true;
for (const [p] of D) { writeFileSync(join(root, p), sorties[p]); ok(true, 'écrit : ' + p); }

// (4) Contrôles
dire('--- Contrôles après application');
mkdirSync(join(root, SOR), { recursive: true }); mkdirSync(join(root, REELS), { recursive: true });
for (const [p, , v, h] of D) {
  ok(shaF(p) === v, 'C1 document identique à la version approuvée, octet pour octet : ' + nom(p), v);
  ok(Buffer.compare(readFileSync(join(root, p)), readFileSync(join(root, OUT + nom(p)))) === 0 && style(lire(p)) === style(avant[p]), 'C1 fins de ligne préservées : ' + nom(p), style(lire(p)));
  const r = git('diff', '--no-index', '--no-color', '--', DEP + p, p); writeFileSync(join(root, REELS, nom(p) + '.diff'), r.stdout);
  const relu = readFileSync(join(root, OUT + 'diffs/' + nom(p) + '.diff'), 'utf8');
  ok(r.status === 1 && sha(relu) === h && corps(r.stdout) === corps(relu), 'C2 diff réel identique au diff relu, octet pour octet à partir du premier @@ : ' + nom(p), sha(corps(r.stdout)));
}
const pa = (t) => t.split(/\r?\n/).find((l) => l.startsWith('- **Prochaine action.**'));
ok(pa(lire(ETAT)) === pa(lire(ROAD)) && pa(lire(ETAT)).startsWith('- **Prochaine action.** La clôture documentaire de T9, sur autorisation distincte'), 'C3 « Prochaine action » identique dans les deux documents : clôture de T9, à autoriser');
const plusE = changees(readFileSync(join(root, REELS, nom(ETAT) + '.diff'), 'utf8')).filter((l) => l.startsWith('+')), plusR = changees(readFileSync(join(root, REELS, nom(ROAD) + '.diff'), 'utf8')).filter((l) => l.startsWith('+'));
ok(plusR.length === 2 && plusR.every((l) => plusE.includes(l)) && plusE.length === 3, 'C3 rubriques communes identiques ; ETAT-ACTUEL.md n\'ajoute que la ligne de journal');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(avant[ETAT]), j1 = jr(lire(ETAT));
ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'C4 journal historique intact, une ligne ajoutée', j1.length + ' lignes');
const b0 = avant[BIL].replace(/(\r?\n)+$/, ''), b1 = lire(BIL); const reste = b1.slice(b0.length);
ok(b1.startsWith(b0) && /^\s*### 8\.113 /.test(reste) && reste.split('### 8.').length === 2 && /^### 8\.112 /m.test(b0), 'C5 §8.112 et bilan antérieur inchangés, §8.113 seul ajouté');
ok(reste.includes('à l\'étape A, ces recalculs étaient approuvés, non installés : leur installation date de B1'), 'C5 bis §8.113 : précision historique conservée, recalculs approuvés à l\'étape A, installés à B1');
const iA = avant[INV].split('\n'), iB = lire(INV).split('\n'); ok(iB.length === iA.length + 8 && iA.every((l) => iB.includes(l)), 'C5 ter inventaire : huit lignes ajoutées, aucune ancienne modifiée', iB.length - iA.length + ' lignes');
ok([ETAT, ROAD].every((p, i) => lire(p).match(BLOC)[0] === blocs0[i] && blocs0[i].includes('empreinte=' + MARQUEUR)), 'C6 blocs a2-05:etat intacts, au marqueur attendu', MARQUEUR);
const ap1 = apercu(); ok(ap1.vide && ap1.plan === PLAN_APRES, 'C7 aperçu suivant vide, sans nouvelle synchronisation', fin(ap1.r));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 45 rapports contrôlés, identiques/.test(emp.out), 'C8 manifeste : 45 empreintes conformes', emp.out.slice(0, 80));
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C9 relais : 30 sur 30', fin(rel));
for (const [n, s] of RECS) { const r = lancer(s); ok(r.code === 0, 'C10 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(cov.out) && restantsF() === '17 F1,F2', 'C11 couverture : 360/377, 17 restants, tous dans le bloc F', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C12 204 corrections dans 177 ENTRY ; V1-22 et V1-23 réservés ; V1-32 libre', etat());
ok(pasAppliquees(), 'C13 aucune correction appliquée : V1-25 à V1-31 aux valeurs « avant » ; `v_427_s1` publie toujours « Pas bon »');
const arbre1 = instantane(); const mod = [...new Set([...Object.keys(arbre0), ...Object.keys(arbre1)])].filter((p) => arbre0[p] !== arbre1[p]).sort();
ok(JSON.stringify(mod) === JSON.stringify(D.map(([p]) => p).sort()) && !zones(), 'C14 arbre entier comparé : les quatre documents seuls modifiés ; documents protégés, normes, données, journal, lots et registre intacts', Object.keys(arbre1).length + ' fichiers ; zones git sans modification');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C15 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C16 git diff --check', 'code ' + dc.status);
writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\nconsignation de T9 conforme\n');
console.log('consignation de T9 conforme');
process.exit(0);
