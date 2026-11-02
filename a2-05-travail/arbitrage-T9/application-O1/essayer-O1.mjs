// A2-05 · T9 : essai du script O1 sur une copie jetable, jamais sur le dépôt réel. Usage : node essayer-O1.mjs <racine du dépôt>
// Refus avant écriture sur préconditions volontairement divergentes, chacun sur la précondition visée ; exécution nominale ; seconde exécution refusée ; dépôt réel inchangé.
// Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T9 = W + 'arbitrage-T9/', OUT = T9 + 'consolidation/', A = T9 + 'application-O1/', SCR = A + 'appliquer-O1.mjs', APERCU = W + 'sync-stable-apercu.md', MAN = W + 'empreintes-rapports-arbitres.json', SAUV = T9 + 'proposition-T9-perimetre.md';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md', CFG = W + 'perimetre-T9.mjs', REC = W + 'recalcul-T9-perimetre.mjs';
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e; if (!d && EXCLUS.includes(e)) continue; if (p.endsWith('.zip') || p === APERCU) continue; if (statSync(join(r, p)).isDirectory()) m(p); else h[p] = createHash('sha256').update(readFileSync(join(r, p))).digest('hex'); } }; m(''); return h; };
const diff = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-essai-o1-t9-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
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
writeFileSync(f(W + 'zz-index.txt'), 'x\n'); spawnSync('git', ['add', W + 'zz-index.txt'], { cwd: C });
refus('R1 index non vide', /P1 index vide/);
spawnSync('git', ['rm', '--cached', '--quiet', W + 'zz-index.txt'], { cwd: C }); rmSync(f(W + 'zz-index.txt'));
writeFileSync(f(SAUV), 'x\n'); refus('R2 copie de la proposition déjà présente', /P2 sauvegarde et copie/); rmSync(f(SAUV));
altere('R3 manifeste modifié', MAN, espace, /P3 manifeste/);
altere('R4 rapport protégé modifié', 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md', espace, /P3 manifeste/);
altere('R5 fins de ligne de ROADMAP.md inversées', ROAD, (o) => { const t = o.toString('utf8'); return Buffer.from(t.includes('\r\n') ? t.replace(/\r\n/g, '\n') : t.replace(/\n/g, '\r\n'), 'utf8'); }, /P4 fins de ligne.*ROADMAP/);
altere('R6 ancre dédoublée dans ROADMAP.md', ROAD, (o) => Buffer.concat([o, o]), /P5 ancres uniques.*ROADMAP/);
altere('R7 §8.110 déjà présent dans le bilan', BIL, (o) => { const e = o.includes('\r\n') ? '\r\n' : '\n'; return Buffer.concat([o, Buffer.from('### 8.110 déjà là' + e, 'utf8')]); }, /P6 ajout absent : §8\.110/);
altere('R8 bloc d\'état altéré : aperçu non vide', ETAT, (o) => Buffer.from(o.toString('utf8').replace('empreinte=5018d82d05d382aa', 'empreinte=0000000000000000'), 'utf8'), /P7 aperçu de synchronisation vide/);
altere('R9 bilan modifié : empreinte de départ', BIL, espace, /P9 empreinte de départ : docs\/rapports\/etape2-A2-05-bilan/);
altere('R10 rapport de T9 modifié : empreinte de départ', RAP, espace, /P9 empreinte de départ : docs\/rapports\/etape2-A2-05-volet1-lot3-T9/);
altere('R11 configuration modifiée : empreinte de départ', CFG, espace, /P9 empreinte de départ : a2-05-travail\/perimetre-T9/);
altere('R12 recalcul modifié : empreinte de départ', REC, espace, /P9 empreinte de départ : a2-05-travail\/recalcul-T9/);
altere('R13 inventaire modifié : empreinte de départ', INV, espace, /P9 empreinte de départ : a2-05-travail\/INVENTAIRE/);
altere('R14 version proposée modifiée', OUT + 'INVENTAIRE-SCRIPTS.md', espace, /P10 version proposée : INVENTAIRE-SCRIPTS\.md/);
altere('R15 diff relu modifié', OUT + 'diffs/ROADMAP.md.diff', (o) => Buffer.concat([Buffer.from('\n'), o]), /P11 diff relu et diff régénéré identiques.*ROADMAP\.md/);
altere('R16 proposition relue différente du rapport de départ', OUT + 'proposition-T9-perimetre.md', espace, /P12 proposition relue/);
ok(!diff(etat0, instantane(C)).length, 'témoin : copie revenue à l\'état de départ');
const N = lancer();
console.log(N.out.split('\n').filter((l) => /^(ÉCART|ARRÊT)|^conforme C/.test(l)).map((l) => '   ' + l.slice(0, 150)).join('\n'));
const attendus = [RAP, CFG, REC, BIL, ETAT, ROAD, INV, SAUV].sort();
const chN = diff(etat0, instantane(C)).filter((p) => !p.startsWith(A + 'depart/') && !p.startsWith(A + 'sorties/') && !p.startsWith(A + 'diffs-reels/'));
ok(N.code === 0 && /O1 conforme$/.test(N.out), 'exécution nominale sur la copie', 'code ' + N.code + ' ; ' + N.out.split('\n').filter((l) => l.startsWith('conforme')).length + ' vérifications conformes');
ok(JSON.stringify(chN) === JSON.stringify(attendus), 'sept documents et la copie, aucun autre, hors traces', chN.length + ' fichiers');
const etatN = instantane(C); const r2 = lancer(); ok(r2.code === 1 && !diff(etatN, instantane(C)).length, 'seconde exécution refusée, sans modification', premier(r2));
rmSync(tmp, { recursive: true, force: true });
const ch = diff(reel0, instantane(root)); ok(!ch.length, 'dépôt réel inchangé', ch.join(', ') || Object.keys(reel0).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'index réel vide');
console.log(ko ? ko + ' écart(s)' : 'essai conforme');
process.exit(ko ? 1 : 0);
