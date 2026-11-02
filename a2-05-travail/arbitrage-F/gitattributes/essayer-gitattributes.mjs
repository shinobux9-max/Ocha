// A2-05 : essai de la pose du `.gitattributes` sur une copie jetable, jamais sur le dépôt réel. Usage : node a2-05-travail/arbitrage-F/gitattributes/essayer-gitattributes.mjs <racine du dépôt>
// L'index de la copie est rafraîchi avant tout, pour qu'elle reproduise l'état réel : sans cela, les fichiers copiés auraient un horodatage différent, et Git relirait leur contenu.
// Refus avant écriture, chacun sur la précondition visée ; exécution nominale ; seconde exécution refusée ; dépôt réel inchangé. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', F = W + 'arbitrage-F/', A = F + 'gitattributes/', SCR = A + 'appliquer-gitattributes.mjs', SOR = A + 'sorties', CAND = F + 'diagnostic-eol/gitattributes-candidat-cible.txt', APERCU = W + 'sync-stable-apercu.md', MAN = W + 'empreintes-rapports-arbitres.json';
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e; if (!d && EXCLUS.includes(e)) continue; if (p.endsWith('.zip') || p === APERCU) continue; if (statSync(join(r, p)).isDirectory()) m(p); else h[p] = createHash('sha256').update(readFileSync(join(r, p))).digest('hex'); } }; m(''); return h; };
const diff = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const reel0 = instantane(root);
const tmp = mkdtempSync(join(tmpdir(), 'ocha-essai-gitattributes-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
spawnSync('git', ['update-index', '-q', '--refresh'], { cwd: C });
ok(cl.status === 0 && !diff(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel, index rafraîchi', Object.keys(reel0).length + ' fichiers');
const lancer = () => { const r = spawnSync(process.execPath, [f(SCR), C], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const premier = (r) => (r.out.split('\n').find((l) => /^ÉCART/.test(l)) ?? r.out.slice(0, 120)).slice(0, 125);
const refus = (nom, re) => { const av = instantane(C); const r = lancer(); const ch = diff(av, instantane(C)); ok(r.code === 1 && re.test(premier(r)) && /ARRÊT : premier écart, avant écriture/.test(r.out) && !ch.length && !existsSync(f('.gitattributes')), nom, premier(r) + ' ; modifiés : ' + (ch.join(', ') || 'aucun')); };
const altere = (nom, p, fn, re) => { const o = readFileSync(f(p)); const m = fn(o); if (m.equals(o)) ok(false, nom, 'altération sans effet'); writeFileSync(f(p), m); refus(nom, re); writeFileSync(f(p), o); };
const espace = (o) => Buffer.concat([o, Buffer.from(' ')]);
const etat0 = instantane(C);
writeFileSync(f(W + 'zz-index.txt'), 'x\n'); spawnSync('git', ['add', W + 'zz-index.txt'], { cwd: C });
refus('R1 index non vide', /P1 index vide/);
spawnSync('git', ['rm', '--cached', '--quiet', W + 'zz-index.txt'], { cwd: C }); rmSync(f(W + 'zz-index.txt'));
altere('R2 candidat modifié', CAND, espace, /P3 candidat relu/);
altere('R3 manifeste modifié', MAN, espace, /P7 manifeste/);
altere('R4 rapport protégé modifié', 'docs/rapports/etape2-A2-05-volet1-lot3-T9.md', espace, /P7 manifeste/);
altere('R5 document de la liste passé en LF : ligne eol=crlf fausse', 'CLAUDE.md', (o) => Buffer.from(o.toString('utf8').replace(/\r\n/g, '\n'), 'utf8'), /P5 chaque ligne eol=crlf/);
altere('R6 bloc d\'état altéré : aperçu non vide', 'ROADMAP.md', (o) => Buffer.from(o.toString('utf8').replace('empreinte=fe4967cf00896f07', 'empreinte=0000000000000000'), 'utf8'), /P8 aperçu/);
{ const o = readFileSync(f(CAND), 'utf8'); writeFileSync(f('.gitattributes'), '* -text\n'); const r = lancer(); ok(r.code === 1 && /P2 `\.gitattributes` absent/.test(premier(r)) && !existsSync(f(SOR)), 'R7 fichier déjà présent : refus, aucun écrasement', premier(r)); rmSync(f('.gitattributes')); void o; }
ok(!diff(etat0, instantane(C)).length, 'témoin : copie revenue à l\'état de départ');
const N = lancer();
console.log(N.out.split('\n').filter((l) => /^(ÉCART|ARRÊT|constat)|^conforme C/.test(l)).map((l) => '   ' + l.slice(0, 170)).join('\n'));
const chN = diff(etat0, instantane(C)).filter((p) => !p.startsWith(SOR + '/'));
ok(N.code === 0 && /`\.gitattributes` conforme$/.test(N.out), 'exécution nominale sur la copie', 'code ' + N.code + ' ; ' + N.out.split('\n').filter((l) => l.startsWith('conforme')).length + ' vérifications conformes');
ok(JSON.stringify(chN) === JSON.stringify(['.gitattributes']), '`.gitattributes` seul ajouté, hors traces', chN.join(', '));
const etatN = instantane(C); const r2 = lancer(); ok(r2.code === 1 && !diff(etatN, instantane(C)).length, 'seconde exécution refusée, sans modification', premier(r2));
rmSync(tmp, { recursive: true, force: true });
const ch = diff(reel0, instantane(root)); ok(!ch.length && !existsSync(join(root, '.gitattributes')), 'dépôt réel inchangé ; pas de `.gitattributes`', ch.join(', ') || Object.keys(reel0).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'index réel vide');
console.log(ko ? ko + ' écart(s)' : 'essai conforme');
process.exit(ko ? 1 : 0);
