// A2-05 · T8 : essai du script de consignation finale sur une copie jetable, jamais sur le dépôt réel. Usage : node essayer-consignation-finale-T8.mjs <racine du dépôt>
// Refus avant écriture (douze cas, chacun sur la précondition visée), exécution nominale, seconde exécution refusée ; dépôt réel inchangé. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T8/consignation-finale/', A = OUT + 'application/', SCR = A + 'appliquer-consignation-finale-T8.mjs', APERCU = 'a2-05-travail/sync-stable-apercu.md', MAN = 'a2-05-travail/empreintes-rapports-arbitres.json';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = 'a2-05-travail/INVENTAIRE-SCRIPTS.md';
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e; if (!d && EXCLUS.includes(e)) continue; if (p.endsWith('.zip') || p === APERCU) continue; if (statSync(join(r, p)).isDirectory()) m(p); else h[p] = createHash('sha256').update(readFileSync(join(r, p))).digest('hex'); } }; m(''); return h; };
const diff = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-essai-consignation-finale-t8-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diff(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const lancer = () => { const r = spawnSync(process.execPath, [f(SCR), C], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const premier = (r) => (r.out.split('\n').find((l) => /^ÉCART/.test(l)) ?? r.out.slice(0, 120)).slice(0, 120);
const refus = (nom, re) => { const av = instantane(C); const r = lancer(); const ch = diff(av, instantane(C)); ok(r.code === 1 && re.test(premier(r)) && /ARRÊT : premier écart, avant écriture/.test(r.out) && !ch.length && !existsSync(f(A + 'depart')), nom, premier(r) + ' ; modifiés : ' + (ch.join(', ') || 'aucun')); };
// Altération de fichier le temps d'un refus, puis retour au contenu d'origine
const altere = (nom, p, fn, re) => { const o = readFileSync(f(p)); writeFileSync(f(p), fn(o)); refus(nom, re); writeFileSync(f(p), o); };
const espace = (o) => Buffer.concat([o, Buffer.from(' ')]);
const etat0 = instantane(C);
writeFileSync(f('a2-05-travail/zz-index.txt'), 'x\n'); spawnSync('git', ['add', 'a2-05-travail/zz-index.txt'], { cwd: C });
refus('R1 index non vide', /P1 index vide/);
spawnSync('git', ['rm', '--cached', '--quiet', 'a2-05-travail/zz-index.txt'], { cwd: C }); rmSync(f('a2-05-travail/zz-index.txt'));
altere('R2 manifeste modifié', MAN, espace, /P3 manifeste/);
altere('R3 rapport protégé modifié', 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md', espace, /P3 manifeste/);
altere('R4 fins de ligne de ROADMAP.md inversées', ROAD, (o) => { const t = o.toString('utf8'); return Buffer.from(t.includes('\r\n') ? t.replace(/\r\n/g, '\n') : t.replace(/\n/g, '\r\n'), 'utf8'); }, /P4 fins de ligne.*ROADMAP/);
altere('R5 ancre dédoublée dans ROADMAP.md', ROAD, (o) => Buffer.concat([o, o]), /P5 ancres uniques.*ROADMAP/);
altere('R6 §8.109 déjà présent dans le bilan', BIL, (o) => { const e = o.includes('\r\n') ? '\r\n' : '\n'; return Buffer.concat([o, Buffer.from('### 8.109 déjà là' + e, 'utf8')]); }, /P6 ajout absent : §8\.109/);
altere('R7 bloc d\'état altéré : aperçu non vide', ETAT, (o) => Buffer.from(o.toString('utf8').replace('empreinte=5018d82d05d382aa', 'empreinte=0000000000000000'), 'utf8'), /P7 aperçu de synchronisation vide/);
altere('R8 bilan modifié : empreinte de départ', BIL, espace, /P9 empreinte de départ : docs\/rapports/);
// Le plan se déduit du contenu des documents de pilotage : une altération d'ETAT-ACTUEL.md le change, et P7 refuse avant P9
altere('R9 ETAT-ACTUEL.md modifié : plan de l\'aperçu différent', ETAT, espace, /P7 aperçu de synchronisation vide/);
altere('R10 inventaire modifié : empreinte de départ', INV, espace, /P9 empreinte de départ : a2-05-travail\/INVENTAIRE/);
altere('R11 version proposée modifiée', OUT + 'INVENTAIRE-SCRIPTS.md', espace, /P10 version proposée : INVENTAIRE-SCRIPTS\.md/);
altere('R12 diff relu modifié', OUT + 'diffs/ROADMAP.md.diff', (o) => Buffer.concat([Buffer.from('\n'), o]), /P11 diff relu et diff régénéré identiques.*ROADMAP\.md/);
ok(!diff(etat0, instantane(C)).length, 'témoin : copie revenue à l\'état de départ');
const N = lancer();
console.log(N.out.split('\n').filter((l) => /^(ÉCART|ARRÊT)|^conforme C/.test(l)).map((l) => '   ' + l.slice(0, 170)).join('\n'));
const attendus = [ETAT, ROAD, INV, BIL].sort();
const chN = diff(etat0, instantane(C)).filter((p) => !p.startsWith(A + 'depart/') && !p.startsWith(A + 'sorties/') && !p.startsWith(A + 'diffs-reels/'));
ok(N.code === 0 && /consignation finale de T8 conforme$/.test(N.out), 'exécution nominale sur la copie', 'code ' + N.code + ' ; ' + N.out.split('\n').filter((l) => l.startsWith('conforme')).length + ' vérifications conformes');
ok(JSON.stringify(chN) === JSON.stringify(attendus), 'quatre documents modifiés, aucun autre, hors traces', chN.length + ' fichiers');
const etatN = instantane(C); const r2 = lancer(); ok(r2.code === 1 && !diff(etatN, instantane(C)).length, 'seconde exécution refusée, sans modification', premier(r2));
rmSync(tmp, { recursive: true, force: true });
const ch = diff(reel0, instantane(root)); ok(!ch.length, 'dépôt réel inchangé', ch.join(', ') || Object.keys(reel0).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'index réel vide');
console.log(ko ? ko + ' écart(s)' : 'essai conforme');
process.exit(ko ? 1 : 0);
