// A2-05 · T9 : essai du script O2 sur une copie jetable, jamais sur le dépôt réel. Usage : node essayer-O2.mjs <racine du dépôt>
// Refus avant écriture, chacun sur la précondition visée, dont le refus de date, obtenu en lançant le script sous un fuseau décalé ; exécution nominale ; seconde exécution refusée ;
// dépôt réel inchangé. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, cpSync, readdirSync, rmSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T9 = W + 'arbitrage-T9/', A = T9 + 'application-O2/', SCR = A + 'appliquer-O2.mjs', APERCU = W + 'sync-stable-apercu.md', MAN = W + 'empreintes-rapports-arbitres.json', SAUV = T9 + 'proposition-T9-perimetre.md';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9-perimetre.md', ETAT = 'ETAT-ACTUEL.md', REC = W + 'recalcul-T9-perimetre.mjs', GEN = W + 'perimetre-v2.mjs', CRB = W + 'criblage/resultat.json', VOC = 'data/n5/vocab.json';
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e; if (!d && EXCLUS.includes(e)) continue; if (p.endsWith('.zip') || p === APERCU) continue; if (statSync(join(r, p)).isDirectory()) m(p); else h[p] = createHash('sha256').update(readFileSync(join(r, p))).digest('hex'); } }; m(''); return h; };
const diff = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-essai-o2-t9-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diff(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const lancer = (env = {}) => { const r = spawnSync(process.execPath, [f(SCR), C], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28, env: { ...process.env, ...env } }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const premier = (r) => (r.out.split('\n').find((l) => /^ÉCART/.test(l)) ?? r.out.slice(0, 120)).slice(0, 130);
const refus = (nom, re, env, sansDepart = true) => { const av = instantane(C); const r = lancer(env); const ch = diff(av, instantane(C)); ok(r.code === 1 && re.test(premier(r)) && /ARRÊT : premier écart, avant écriture/.test(r.out) && !ch.length && (!sansDepart || !existsSync(f(A + 'depart'))), nom, premier(r) + ' ; modifiés : ' + (ch.join(', ') || 'aucun')); };
// Altération de fichier le temps d'un refus, puis retour au contenu d'origine
const altere = (nom, p, fn, re) => { const o = readFileSync(f(p)); writeFileSync(f(p), fn(o)); refus(nom, re); writeFileSync(f(p), o); };
const espace = (o) => Buffer.concat([o, Buffer.from(' ')]);
const etat0 = instantane(C);
writeFileSync(f(W + 'zz-index.txt'), 'x\n'); spawnSync('git', ['add', W + 'zz-index.txt'], { cwd: C });
refus('R1 index non vide', /P1 index vide/);
spawnSync('git', ['rm', '--cached', '--quiet', W + 'zz-index.txt'], { cwd: C }); rmSync(f(W + 'zz-index.txt'));
mkdirSync(f(A + 'depart')); refus('R2 sauvegarde déjà présente', /P2 sauvegarde/, {}, false); rmSync(f(A + 'depart'), { recursive: true });
altere('R3 manifeste modifié', MAN, espace, /P3 manifeste/);
altere('R4 deux entrées du manifeste inversées', MAN, (o) => { const m = JSON.parse(o); const e = Object.entries(m.empreintes); [e[3], e[4]] = [e[4], e[3]]; m.empreintes = Object.fromEntries(e); return Buffer.from(JSON.stringify(m, null, 1) + '\n'); }, /P3 manifeste/);
altere('R5 rapport protégé modifié', 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md', espace, /P3 manifeste/);
altere('R6 périmètre de T9 modifié', RAP, espace, /P4 périmètre accepté/);
altere('R7 proposition sauvegardée modifiée', SAUV, espace, /P5 proposition originale/);
altere('R8 ETAT-ACTUEL.md modifié', ETAT, espace, /P6 documents/);
altere('R9 recalcul de T9 modifié', REC, espace, /P6 documents/);
altere('R10 générateur modifié (correctif RES appliqué par erreur)', GEN, espace, /P7 générateur et criblage/);
altere('R11 criblage modifié', CRB, espace, /P7 générateur et criblage/);
altere('R12 donnée publiée modifiée : recalcul de T9 en écart', VOC, (o) => { const v = JSON.parse(o); v.flatMap((e) => e.senses).find((s) => s.id === 'v_183_s1').category.level_3 = null; return Buffer.from(JSON.stringify(v, null, 2) + '\n'); }, /P8 recalcul de T9/);
// Refus de date : le jour local diffère réellement du jour UTC sous ce fuseau, à l'heure de l'essai
const h = new Date().getUTCHours(); const TZ = h >= 10 ? 'Pacific/Kiritimati' : 'Pacific/Niue';
refus('R13 date UTC différente du jour local (fuseau ' + TZ + ') : arrêt sans écrire', /P14 date de l'outil/, { TZ });
ok(!diff(etat0, instantane(C)).length, 'témoin : copie revenue à l\'état de départ');
const N = lancer();
console.log(N.out.split('\n').filter((l) => /^(ÉCART|ARRÊT)|^conforme (C|V|O3)/.test(l)).map((l) => '   ' + l.slice(0, 150)).join('\n'));
const chN = diff(etat0, instantane(C)).filter((p) => !p.startsWith(A + 'depart/') && !p.startsWith(A + 'sorties/') && !p.startsWith(A + 'apercu-O3/'));
ok(N.code === 0 && /O2 conforme ; O3 préparée, non appliquée$/.test(N.out), 'exécution nominale sur la copie', 'code ' + N.code + ' ; ' + N.out.split('\n').filter((l) => l.startsWith('conforme')).length + ' vérifications conformes');
ok(JSON.stringify(chN) === JSON.stringify([MAN]), 'seul le manifeste a changé, hors traces', chN.join(', '));
const etatN = instantane(C); const r2 = lancer(); ok(r2.code === 1 && !diff(etatN, instantane(C)).length, 'seconde exécution refusée, sans modification', premier(r2));
rmSync(tmp, { recursive: true, force: true });
const ch = diff(reel0, instantane(root)); ok(!ch.length, 'dépôt réel inchangé', ch.join(', ') || Object.keys(reel0).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'index réel vide');
console.log(ko ? ko + ' écart(s)' : 'essai conforme');
process.exit(ko ? 1 : 0);
