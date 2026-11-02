// A2-05 · T8 : application de la consignation finale des opérations A, B1 et B2 (autorisée le 2026-11-01) : quatre diffs relus, appliqués par remplacements ciblés.
// T8 n'est pas clôturée. Usage : node a2-05-travail/arbitrage-T8/consignation-finale/application/appliquer-consignation-finale-T8.mjs <racine du dépôt>
// (1) Préconditions, sans écriture : index vide ; 43 empreintes ; fins de ligne ; ancres uniques ; ajouts absents ; aperçu vide ; relais 30 sur 30 ; empreintes de départ,
// versions proposées et diffs relus ; diffs régénérés identiques. (2) Quatre originaux sauvegardés. (3) Hunks appliqués par remplacements ciblés ; résultat égal à la version relue.
// (4) Contrôles. Arrêt au premier écart, avant ou après écriture ; aucune réparation automatique.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-T8/consignation-finale/', A = OUT + 'application/', DEP = A + 'depart/', SOR = A + 'sorties/', REELS = A + 'diffs-reels/';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md';
const MARQUEUR = '5018d82d05d382aa', PLAN = '15ed8a93b812fdbc', PLAN_APRES = 'd4df4192c80e30fb', MAN_SHA = 'eeeda756c00d09ebeaed8ef1e70c816d4b7f1d697acf3984fadbe9fc1d1163e9';
const D = [ // cible, départ, proposé, diff relu
  [BIL, '93bbdaac174df0f49e23c9f353f3e67ae6a4618c37b601285049067a17460c16', '9901317faad4e53f4361c229284ec200f36eb27d33768baeed8df1f6fc64bc2b', '5fc9208191401b142b4d09abe12f069cf40e7bfcaf0cd163a7d554dbf2a806ac'],
  [ETAT, '7080fb42992f1944b8254fb21e76829da38c79406282d0ebf02af1b968d414d9', 'c1439d2d07d2680bc0fbf9632ebb790000e62ff12a576008dedeaaecea6f0ea8', 'e08078c212e779cef07204ff43336086b5ffdda3796d2669129312afe90e12f4'],
  [ROAD, '223f0f6983b955b7a775494f9fa09c316e2345c766cb0ba3df5086f36dd4a271', '334c576a7ee320040141d475614c39756499f59fcda10e4fa8d8a25d5fa4ad34', '341b43887615cb703049da5e4a0b22e00743e081fa1552210659884501dd2e66'],
  [INV, 'bc6ab2b97860b3b7c9052d996332be29c30027c026571fe75f2bc35cf7d4be99', '636617479bfdf9463574ba89368ec4b383740d53b001f39eb8f3ae17efdd04fe', 'f55ba4b644cc2194be19822f901444fe786d5293c14a75593171384c743e889d'],
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
const ETAT_ATTENDU = '{"arbitres":336,"restants":41,"proposes":0,"corrections":197,"entry":172,"libre":"V1-25","reserves":["V1-22","V1-23"]}';
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
ok(shaF(MAN) === MAN_SHA && cles.length === 43 && cles.every((p) => shaF(p) === man[p]), 'P3 manifeste : 43 empreintes conformes', MAN_SHA);
const H = {};
for (const [p] of D) {
  const prop = OUT + nom(p), s = style(lire(p));
  ok(s !== 'mixte' && s === style(lire(prop)), 'P4 fins de ligne homogènes et égales à celles de la version proposée : ' + nom(p), s);
  H[p] = hunks(readFileSync(join(root, OUT + 'diffs/' + nom(p) + '.diff'), 'utf8'));
  const t = LFs(lire(p)); ok(H[p].length > 0 && H[p].every(({ a, b }) => a && t.split(a).length === 2 && t.split(b).length === 1), 'P5 ancres uniques, ajouts absents du texte : ' + nom(p), H[p].length + ' hunk(s)');
}
ok(!/^### 8\.109 /m.test(lire(BIL)) && (lire(BIL).match(/^### 8\.108 /gm) ?? []).length === 1, 'P6 ajout absent : §8.109 ; §8.108 présent');
ok(!lire(INV).includes('| `arbitrage-T8/application-B2/appliquer-B2.mjs` |'), 'P6 ajout absent : lignes de l\'inventaire');
ok(!lire(ETAT).includes('**Consolidation technique de T8 achevée en trois opérations'), 'P6 ajout absent : ligne de journal');
const ap0 = apercu(); ok(ap0.vide && ap0.plan === PLAN, 'P7 aperçu de synchronisation vide', fin(ap0.r));
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P8 relais de départ', fin(rel0));
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
ok(pa(lire(ETAT)) === pa(lire(ROAD)) && pa(lire(ETAT)).startsWith('- **Prochaine action.** La clôture documentaire de T8, sur autorisation distincte'), 'C3 « Prochaine action » identique dans les deux documents : clôture de T8, à autoriser');
const plusE = changees(readFileSync(join(root, REELS, nom(ETAT) + '.diff'), 'utf8')).filter((l) => l.startsWith('+')), plusR = changees(readFileSync(join(root, REELS, nom(ROAD) + '.diff'), 'utf8')).filter((l) => l.startsWith('+'));
ok(plusR.length === 2 && plusR.every((l) => plusE.includes(l)) && plusE.length === 3, 'C3 rubriques communes identiques ; ETAT-ACTUEL.md n\'ajoute que la ligne de journal');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(avant[ETAT]), j1 = jr(lire(ETAT));
ok(j1.length === j0.length + 1 && j0.every((l, i) => j1[i] === l), 'C4 journal historique intact, une ligne ajoutée', j1.length + ' lignes');
const b0 = avant[BIL].replace(/(\r?\n)+$/, ''), b1 = lire(BIL); const reste = b1.slice(b0.length);
ok(b1.startsWith(b0) && /^\s*### 8\.109 /.test(reste) && reste.split('### 8.').length === 2, 'C5 §8.108 et bilan antérieur inchangés, §8.109 seul ajouté');
ok([ETAT, ROAD].every((p, i) => lire(p).match(BLOC)[0] === blocs0[i] && blocs0[i].includes('empreinte=' + MARQUEUR)), 'C6 blocs a2-05:etat intacts, au marqueur attendu', MARQUEUR);
const ap1 = apercu(); ok(ap1.vide && ap1.plan === PLAN_APRES, 'C7 aperçu suivant vide, sans nouvelle synchronisation', fin(ap1.r));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 43 rapports contrôlés, identiques/.test(emp.out), 'C8 manifeste : 43 empreintes conformes', emp.out.slice(0, 80));
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'C9 relais : 30 sur 30', fin(rel));
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['recalcul de T8', W + 'recalcul-T8-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'C10 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /336 arbitrés, 0 proposés, 41 restants, sur 377/.test(cov.out), 'C11 couverture : 336/377, 41 restants', cov.out.slice(0, 70));
ok(etat() === ETAT_ATTENDU, 'C12 197 corrections dans 172 ENTRY ; V1-22 et V1-23 réservés ; V1-25 libre', etat());
ok((lire(BIL).match(/^\| V1-24 \|/gm) ?? []).length === 1, 'C13 V1-24 retenue, une ligne de correction');
const pasBon = JSON.parse(lire('data/n5/vocab.json')).find((e) => e.id === 'v_427').senses[0].meaning.alternatives; ok(JSON.stringify(pasBon) === '["Pas bon"]', 'C14 aucune correction appliquée : `v_427_s1` publie toujours « Pas bon »');
const arbre1 = instantane(); const mod = [...new Set([...Object.keys(arbre0), ...Object.keys(arbre1)])].filter((p) => arbre0[p] !== arbre1[p]).sort();
ok(JSON.stringify(mod) === JSON.stringify(D.map(([p]) => p).sort()) && !zones(), 'C15 arbre entier comparé : les quatre documents seuls modifiés ; documents protégés, normes, données, journal, lots et registre intacts', Object.keys(arbre1).length + ' fichiers ; zones git sans modification');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'C16 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'C17 git diff --check', 'code ' + dc.status);
writeFileSync(join(root, SOR, 'application.txt'), trace.join('\n') + '\nconsignation finale de T8 conforme\n');
console.log('consignation finale de T8 conforme');
process.exit(0);
