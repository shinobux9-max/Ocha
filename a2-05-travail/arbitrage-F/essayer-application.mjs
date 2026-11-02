// A2-05 : essai d'une application ciblée sur une copie jetable, jamais sur le dépôt réel. Usage : node a2-05-travail/arbitrage-F/essayer-application.mjs <racine du dépôt> <revision|cloture>
// Refus avant écriture, chacun sur la précondition visée ; exécution nominale ; seconde exécution refusée ; dépôt réel inchangé. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); const mode = process.argv[3]; if (!process.argv[2] || !['revision', 'cloture', 'mentions', 'consignation', 'complement', 'installation', 'consignation2'].includes(mode)) throw new Error('arguments attendus : racine du dépôt, puis revision, cloture, mentions, consignation, complement, installation, ou consignation2 avec|sans');
const W = 'a2-05-travail/', F = W + 'arbitrage-F/', APERCU = W + 'sync-stable-apercu.md', MAN = W + 'empreintes-rapports-arbitres.json';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', PROP = 'docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md';
const CONS = F + 'consignation-avant-checkpoint/', GA = '.gitattributes', INST = F + 'references-git/', COMP = F + 'consignation-complementaire/', RELC = W + 'controle-relais-allege.mjs', REP = 'docs/relecture/reprise-A2-05.md', VFIG = W + 'versions-finales/', variante = process.argv[4];
const CAS = mode === 'installation' ? { OUT: INST, SCR: 'appliquer-installation.mjs', fin: /installation conforme$/, cibles: [RELC, REP, W + 'references-git.json', W + 'cloture-checkpoint.mjs'] } : mode === 'consignation2' ? { OUT: COMP, SRC: COMP + variante + '/', SCR: 'appliquer-complementaire.mjs', fin: /consignation complémentaire conforme$/, cibles: [ETAT, ROAD, INV, BIL] } : mode === 'complement' ? { OUT: F + 'complement-gitattributes/', SCR: 'appliquer-complement.mjs', fin: /règle complémentaire conforme$/, cibles: [GA] } : mode === 'consignation' ? { OUT: CONS, SCR: 'appliquer-consignation.mjs', fin: /consignation conforme$/, cibles: [ETAT, ROAD, INV, BIL] } : mode === 'mentions' ? { OUT: F + 'mentions-revision-4/', SCR: 'appliquer-mentions.mjs', fin: /mentions conformes$/, cibles: [ETAT, ROAD] } : mode === 'revision' ? { OUT: F + 'revision-4-E5/', SCR: 'appliquer-revision-4.mjs', fin: /révision 4 conforme$/, cibles: [PROP] } : { OUT: F + 'cloture-T9/', SCR: 'appliquer-cloture-T9.mjs', fin: /clôture de T9 conforme$/, cibles: [ETAT, ROAD, INV, BIL] };
const A = CAS.OUT + 'application/', SCR = A + CAS.SCR, EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e; if (!d && EXCLUS.includes(e)) continue; if (p.endsWith('.zip') || p === APERCU) continue; if (statSync(join(r, p)).isDirectory()) m(p); else h[p] = createHash('sha256').update(readFileSync(join(r, p))).digest('hex'); } }; m(''); return h; };
const diff = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-essai-' + mode + '-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
// Index rafraîchi avant la pose du `.gitattributes`, comme sur le dépôt réel : sinon, Git relirait les fichiers à fins de ligne mixtes sous `-text`
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip') && e !== '.gitattributes') cpSync(join(root, e), join(C, e), { recursive: true });
spawnSync('git', ['update-index', '-q', '--refresh'], { cwd: C }); cpSync(join(root, '.gitattributes'), f('.gitattributes'));
ok(cl.status === 0 && !diff(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const lancer = () => { const r = spawnSync(process.execPath, [f(SCR), C, ...(variante ? [variante] : [])], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const premier = (r) => (r.out.split('\n').find((l) => /^ÉCART/.test(l)) ?? r.out.slice(0, 120)).slice(0, 125);
const refus = (nom, re) => { const av = instantane(C); const r = lancer(); const ch = diff(av, instantane(C)); ok(r.code === 1 && re.test(premier(r)) && /ARRÊT : premier écart, avant écriture/.test(r.out) && !ch.length && !existsSync(f(A + 'depart')), nom, premier(r) + ' ; modifiés : ' + (ch.join(', ') || 'aucun')); };
const altere = (nom, p, fn, re) => { const o = readFileSync(f(p)); const m = fn(o); if (m.equals(o)) ok(false, nom, 'altération sans effet'); writeFileSync(f(p), m); refus(nom, re); writeFileSync(f(p), o); };
const espace = (o) => Buffer.concat([o, Buffer.from(' ')]);
const inverse = (o) => { const t = o.toString('utf8'); return Buffer.from(t.includes('\r\n') ? t.replace(/\r\n/g, '\n') : t.replace(/\n/g, '\r\n'), 'utf8'); };
// La règle complémentaire suit la consignation : son plan attendu est celui d'après la consignation
if (mode === 'complement' && !existsSync(f(CONS + 'application/depart'))) { const r = spawnSync(process.execPath, [f(CONS + 'application/appliquer-consignation.mjs'), C], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(r.status === 0, 'consignation appliquée d\'abord, sur la copie seulement', 'code ' + r.status); }
// La variante « avec » de la consignation complémentaire suit l'installation de l'alternative
if (mode === 'consignation2' && variante === 'avec') {
  const r0 = lancer(); ok(r0.code === 1 && /P6 .*alternative/.test(premier(r0)), 'R0 alternative non installée : variante « avec » refusée', premier(r0));
  const r = spawnSync(process.execPath, [f(INST + 'application/appliquer-installation.mjs'), C], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(r.status === 0, 'installation appliquée d\'abord, sur la copie seulement', 'code ' + r.status);
}
if (mode === 'consignation2' && variante === 'sans') { writeFileSync(f(W + 'references-git.json'), '{}\n'); const r0 = lancer(); ok(r0.code === 1 && /P6 .*alternative/.test(premier(r0)), 'R0 alternative présente : variante « sans » refusée', premier(r0)); rmSync(f(W + 'references-git.json')); }
const etat0 = instantane(C);
writeFileSync(f(W + 'zz-index.txt'), 'x\n'); spawnSync('git', ['add', W + 'zz-index.txt'], { cwd: C });
refus('R1 index non vide', /P1 index vide/);
spawnSync('git', ['rm', '--cached', '--quiet', W + 'zz-index.txt'], { cwd: C }); rmSync(f(W + 'zz-index.txt'));
altere('R2 manifeste modifié', MAN, espace, /P3 manifeste/);
altere('R3 rapport protégé modifié', 'docs/rapports/etape2-A2-05-volet1-lot3-T9.md', espace, /P3 manifeste/);
if (mode === 'installation') {
  altere('R4 fins de ligne du contrôle inversées', RELC, inverse, /P4 fins de ligne/);
  altere('R5 ancre dédoublée dans le relais', REP, (o) => Buffer.concat([o, o]), /P5 ancres uniques/);
  writeFileSync(f(W + 'references-git.json'), '{}\n'); refus('R6 fichier de références déjà présent', /P6 fichier nouveau absent/); rmSync(f(W + 'references-git.json'));
  altere('R7 bloc d\'état altéré : aperçu non vide', ETAT, (o) => Buffer.from(o.toString('utf8').replace('empreinte=fe4967cf00896f07', 'empreinte=0000000000000000'), 'utf8'), /P7 aperçu/);
  altere('R8 relais modifié : empreinte de départ', REP, espace, /P9 empreinte de départ|P8 relais/);
  altere('R9 version approuvée du contrôle modifiée', CAS.OUT + 'controle-relais-propose.txt', espace, /P10 version approuvée/);
  altere('R10 diff relu modifié', CAS.OUT + 'controle-relais.diff', (o) => Buffer.concat([Buffer.from('\n'), o]), /P11 diff relu/);
  altere('R11 script de clôture relu modifié', CAS.OUT + 'cloture-checkpoint-propose.txt', espace, /P10 fichier nouveau/);
  altere('R12 fichier de références relu modifié', CAS.OUT + 'references-git-propose.json', espace, /P10 fichier nouveau/);
  altere('R13 version figée du relais modifiée', VFIG + 'docs/relecture/reprise-A2-05.md', espace, /P6 préservé|P8 relais/);
  altere('R14 manifeste figé modifié', VFIG + 'manifeste.json', espace, /P6 préservé|P8 relais/);
  altere('R15 `CLAUDE.md` modifié', 'CLAUDE.md', espace, /P6 préservé|P8 relais/);
} else if (mode === 'consignation2') {
  altere('R4 fins de ligne de ROADMAP.md inversées', ROAD, inverse, /P4 fins de ligne.*ROADMAP/);
  altere('R5 ancre dédoublée dans ROADMAP.md', ROAD, (o) => Buffer.concat([o, o]), /P5 ancres uniques.*ROADMAP/);
  altere('R6 §8.116 déjà présent dans le bilan', BIL, (o) => Buffer.concat([o, Buffer.from('### 8.116 déjà là\n', 'utf8')]), /P6 ajout absent : §8\.116/);
  altere('R7 bloc d\'état altéré : aperçu non vide', ETAT, (o) => Buffer.from(o.toString('utf8').replace('empreinte=fe4967cf00896f07', 'empreinte=0000000000000000'), 'utf8'), /P7 aperçu/);
  altere('R8 bilan modifié : empreinte de départ', BIL, espace, /P9 empreinte de départ : docs\/rapports/);
  altere('R9 inventaire modifié : empreinte de départ', INV, espace, /P9 empreinte de départ : a2-05-travail\/INVENTAIRE/);
  altere('R10 version approuvée modifiée', CAS.SRC + 'INVENTAIRE-SCRIPTS.md', espace, /P10 version approuvée : INVENTAIRE-SCRIPTS\.md/);
  altere('R11 diff relu modifié', CAS.SRC + 'diffs/ROADMAP.md.diff', (o) => Buffer.concat([Buffer.from('\n'), o]), /P11 diff relu.*ROADMAP\.md/);
} else if (mode === 'complement') {
  altere('R4 fins de ligne du `.gitattributes` inversées', GA, inverse, /P4 fins de ligne/);
  altere('R5 ancre dédoublée', GA, (o) => Buffer.concat([o, o]), /P5 ancres uniques/);
  altere('R6 règle déjà présente', GA, (o) => Buffer.concat([o, Buffer.from('/REGLES-CONSTRUCTION.md -text\n')]), /P5 ancres uniques|P6 ajout absent/);
  altere('R7 bloc d\'état altéré : aperçu non vide', ETAT, (o) => Buffer.from(o.toString('utf8').replace('empreinte=fe4967cf00896f07', 'empreinte=0000000000000000'), 'utf8'), /P7 aperçu/);
  altere('R8 `.gitattributes` modifié : empreinte de départ', GA, (o) => Buffer.concat([o, Buffer.from('# x\n')]), /P9 empreinte de départ/);
  altere('R9 version approuvée modifiée', CAS.OUT + 'gitattributes-propose.txt', espace, /P10 version approuvée/);
  altere('R10 diff relu modifié', CAS.OUT + 'diffs/gitattributes.diff', (o) => Buffer.concat([Buffer.from('\n'), o]), /P11 diff relu/);
} else if (mode === 'consignation') {
  altere('R4 fins de ligne de ROADMAP.md inversées', ROAD, inverse, /P4 fins de ligne.*ROADMAP/);
  altere('R5 ancre dédoublée dans ROADMAP.md', ROAD, (o) => Buffer.concat([o, o]), /P5 ancres uniques.*ROADMAP/);
  altere('R6 §8.115 déjà présent dans le bilan', BIL, (o) => Buffer.concat([o, Buffer.from('### 8.115 déjà là\n', 'utf8')]), /P6 ajout absent : §8\.115/);
  altere('R7 bloc d\'état altéré : aperçu non vide', ETAT, (o) => Buffer.from(o.toString('utf8').replace('empreinte=fe4967cf00896f07', 'empreinte=0000000000000000'), 'utf8'), /P7 aperçu/);
  altere('R8 bilan modifié : empreinte de départ', BIL, espace, /P9 empreinte de départ : docs\/rapports/);
  altere('R9 ETAT-ACTUEL.md modifié : plan différent', ETAT, espace, /P7 aperçu/);
  altere('R10 inventaire modifié : empreinte de départ', INV, espace, /P9 empreinte de départ : a2-05-travail\/INVENTAIRE/);
  altere('R11 version approuvée modifiée', CAS.OUT + 'INVENTAIRE-SCRIPTS.md', espace, /P10 version approuvée : INVENTAIRE-SCRIPTS\.md/);
  altere('R12 diff relu modifié', CAS.OUT + 'diffs/ROADMAP.md.diff', (o) => Buffer.concat([Buffer.from('\n'), o]), /P11 diff relu.*ROADMAP\.md/);
} else if (mode === 'mentions') {
  altere('R4 fins de ligne de ROADMAP.md inversées', ROAD, inverse, /P4 fins de ligne.*ROADMAP/);
  altere('R5 ancre dédoublée dans ROADMAP.md', ROAD, (o) => Buffer.concat([o, o]), /P5 ancres uniques.*ROADMAP/);
  altere('R6 révision 4 déjà mentionnée dans ROADMAP.md', ROAD, (o) => Buffer.concat([o, Buffer.from('(préalable normatif E5, révision 4)\r\n', 'utf8')]), /P6 ajout absent/);
  altere('R7 bloc d\'état altéré : aperçu non vide', ETAT, (o) => Buffer.from(o.toString('utf8').replace('empreinte=fe4967cf00896f07', 'empreinte=0000000000000000'), 'utf8'), /P7 aperçu/);
  altere('R8 version approuvée modifiée', CAS.OUT + 'ROADMAP.md', espace, /P10 version approuvée : ROADMAP\.md/);
  altere('R9 diff relu modifié', CAS.OUT + 'diffs/ETAT-ACTUEL.md.diff', (o) => Buffer.concat([Buffer.from('\n'), o]), /P11 diff relu.*ETAT-ACTUEL\.md/);
} else if (mode === 'revision') {
  altere('R4 fins de ligne de la proposition inversées', PROP, inverse, /P4 fins de ligne/);
  altere('R5 ancre dédoublée dans la proposition', PROP, (o) => Buffer.concat([o, o]), /P5 ancres uniques/);
  altere('R6 révision 4 déjà mentionnée', PROP, (o) => Buffer.concat([o, Buffer.from('\nrévision 4\n')]), /P6 ajout absent : révision 4/);
  altere('R7 proposition modifiée : empreinte de départ', PROP, espace, /P9 empreinte de départ/);
  altere('R8 version approuvée modifiée', CAS.OUT + 'proposition-addendum-revision-4.md', espace, /P10 version approuvée/);
  altere('R9 diff relu modifié', CAS.OUT + 'proposition-addendum.diff', (o) => Buffer.concat([Buffer.from('\n'), o]), /P11 diff relu/);
} else {
  altere('R4 fins de ligne de ROADMAP.md inversées', ROAD, inverse, /P4 fins de ligne.*ROADMAP/);
  altere('R5 ancre dédoublée dans ROADMAP.md', ROAD, (o) => Buffer.concat([o, o]), /P5 ancres uniques.*ROADMAP/);
  altere('R6 §8.114 déjà présent dans le bilan', BIL, (o) => Buffer.concat([o, Buffer.from('### 8.114 déjà là\n', 'utf8')]), /P6 ajout absent : §8\.114/);
  altere('R7 bloc d\'état altéré : aperçu non vide', ETAT, (o) => Buffer.from(o.toString('utf8').replace('empreinte=fe4967cf00896f07', 'empreinte=0000000000000000'), 'utf8'), /P7 aperçu/);
  altere('R8 bilan modifié : empreinte de départ', BIL, espace, /P9 empreinte de départ : docs\/rapports/);
  altere('R9 ETAT-ACTUEL.md modifié : plan différent', ETAT, espace, /P7 aperçu/);
  altere('R10 inventaire modifié : empreinte de départ', INV, espace, /P9 empreinte de départ : a2-05-travail\/INVENTAIRE/);
  altere('R11 version approuvée modifiée', CAS.OUT + 'INVENTAIRE-SCRIPTS.md', espace, /P10 version approuvée : INVENTAIRE-SCRIPTS\.md/);
  altere('R12 diff relu modifié', CAS.OUT + 'diffs/ROADMAP.md.diff', (o) => Buffer.concat([Buffer.from('\n'), o]), /P11 diff relu.*ROADMAP\.md/);
}
ok(!diff(etat0, instantane(C)).length, 'témoin : copie revenue à l\'état de départ');
const N = lancer();
console.log(N.out.split('\n').filter((l) => /^(ÉCART|ARRÊT)|^conforme C/.test(l)).map((l) => '   ' + l.slice(0, 170)).join('\n'));
const chN = diff(etat0, instantane(C)).filter((p) => !p.startsWith(A + 'depart/') && !p.startsWith(A + 'sorties/') && !p.startsWith(A + 'diffs-reels/'));
ok(N.code === 0 && CAS.fin.test(N.out), 'exécution nominale sur la copie', 'code ' + N.code + ' ; ' + N.out.split('\n').filter((l) => l.startsWith('conforme')).length + ' vérifications conformes');
ok(JSON.stringify(chN) === JSON.stringify([...CAS.cibles].sort()), 'fichiers visés seuls modifiés, hors traces', chN.length + ' fichier(s)');
const etatN = instantane(C); const r2 = lancer(); ok(r2.code === 1 && !diff(etatN, instantane(C)).length, 'seconde exécution refusée, sans modification', premier(r2));
rmSync(tmp, { recursive: true, force: true });
const ch = diff(reel0, instantane(root)); ok(!ch.length, 'dépôt réel inchangé', ch.join(', ') || Object.keys(reel0).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'index réel vide');
console.log(ko ? ko + ' écart(s)' : 'essai conforme');
process.exit(ko ? 1 : 0);
