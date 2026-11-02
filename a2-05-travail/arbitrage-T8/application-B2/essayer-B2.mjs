// A2-05 · T8 : essai du script B2 sur une copie jetable, jamais sur le dépôt réel. Usage : node essayer-B2.mjs <racine du dépôt>
// Refus avant écriture (cinq cas), exécution nominale, seconde exécution refusée ; dépôt réel inchangé. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const B = 'a2-05-travail/arbitrage-T8/application-B2/', SCR = B + 'appliquer-B2.mjs', MAN = 'a2-05-travail/empreintes-rapports-arbitres.json', APERCU = 'a2-05-travail/sync-stable-apercu.md';
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e; if (!d && EXCLUS.includes(e)) continue; if (p.endsWith('.zip') || p === APERCU) continue; if (statSync(join(r, p)).isDirectory()) m(p); else h[p] = createHash('sha256').update(readFileSync(join(r, p))).digest('hex'); } }; m(''); return h; };
const diff = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-essai-b2-t8-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !diff(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
const lancer = () => { const r = spawnSync(process.execPath, [f(SCR), C], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const premier = (r) => (r.out.split('\n').find((l) => /^ÉCART/.test(l)) ?? '').slice(0, 120);
const refus = (nom, re) => { const av = instantane(C); const r = lancer(); const ch = diff(av, instantane(C)); ok(r.code === 1 && re.test(r.out) && /ARRÊT/.test(r.out) && !ch.length && !existsSync(f(B + 'depart')), nom, premier(r) + ' ; modifiés : ' + (ch.join(', ') || 'aucun')); };
const altere = (nom, p, re) => { const o = readFileSync(f(p)); writeFileSync(f(p), Buffer.concat([o, Buffer.from(' ')])); refus(nom, re); writeFileSync(f(p), o); };
const etat0 = instantane(C);
altere('R1 manifeste modifié : refus avant écriture', MAN, /manifeste à son empreinte relue/);
{ const p = 'docs/rapports/etape2-A2-05-bilan-volet2.md'; const o = readFileSync(f(p), 'utf8'); writeFileSync(f(p), o.replace(/^\| V1-24 \|.*\n/m, '')); refus('R2 état calculé différent (V1-24 retirée) : plan ou aperçu refusé avant écriture', /plan exigé|empreinte complète de l'aperçu/); writeFileSync(f(p), o); }
altere('R3 aperçu relu modifié : refus avant écriture', 'a2-05-travail/arbitrage-T8/application-B1/apercu-B2/apercu.md', /diff régénéré = diff relu/);
altere('R4 rapport protégé modifié : refus avant écriture', 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md', /43 empreintes recalculées/);
writeFileSync(f('a2-05-travail/zz-index.txt'), 'x\n'); spawnSync('git', ['add', 'a2-05-travail/zz-index.txt'], { cwd: C });
refus('R5 index non vide : refus avant écriture', /index vide/);
spawnSync('git', ['rm', '--cached', '--quiet', 'a2-05-travail/zz-index.txt'], { cwd: C }); rmSync(f('a2-05-travail/zz-index.txt'));
ok(!diff(etat0, instantane(C)).length, 'témoin : copie revenue à l\'état de départ');
const N = lancer();
console.log(N.out.split('\n').filter((l) => /^(ÉCART|ARRÊT)|^conforme C/.test(l)).map((l) => '   ' + l.slice(0, 150)).join('\n'));
const chN = diff(etat0, instantane(C)).filter((p) => !p.startsWith(B + 'depart/') && !p.startsWith(B + 'sorties/'));
ok(N.code === 0 && /B2 conforme$/.test(N.out), 'exécution nominale sur la copie', 'code ' + N.code + ' ; ' + N.out.split('\n').filter((l) => l.startsWith('conforme')).length + ' vérifications conformes');
ok(JSON.stringify(chN) === JSON.stringify(['ETAT-ACTUEL.md', 'ROADMAP.md']), 'seuls les deux documents de pilotage ont changé, hors traces', chN.join(', '));
const etatN = instantane(C); const r2 = lancer(); ok(r2.code === 1 && !diff(etatN, instantane(C)).length, 'seconde exécution refusée, sans modification', premier(r2));
rmSync(tmp, { recursive: true, force: true });
const ch = diff(reel0, instantane(root)); ok(!ch.length, 'dépôt réel inchangé', ch.join(', ') || Object.keys(reel0).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'index réel vide');
console.log(ko ? ko + ' écart(s)' : 'essai conforme');
process.exit(ko ? 1 : 0);
