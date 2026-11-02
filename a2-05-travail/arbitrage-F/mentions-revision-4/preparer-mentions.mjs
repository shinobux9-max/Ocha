// A2-05 : préparation, sans application, de l'actualisation des trois mentions « révision 3 » du pilotage, devenues inexactes depuis le remplacement par la révision 4.
// Rubriques d'état courant seulement ; les lignes de journal des 2026-10-12 et 2026-10-13 sont historiques et ne changent pas. Essai dans un clone jetable ; dépôt réel inchangé.
// Usage : node a2-05-travail/arbitrage-F/mentions-revision-4/preparer-mentions.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/mentions-revision-4/', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md';
const DEPART = { [ETAT]: '2f231a904a33d3c1108729cb9cea740025deb17fe710435dabb17aef54ccfdc5', [ROAD]: '05d46e7be98b18898867d052ec3514f872e1f48a020c98749c7e3d0b97f3d6d0' };
const F1 = ['(préalable normatif E5, révision 3), recevable', '(préalable normatif E5, révision 4), recevable'], F2 = ['`docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md`, révision 3),', '`docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md`, révision 4),'];
const FRAG = { [ETAT]: [F1, F2], [ROAD]: [F1] };
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const sha = (b) => createHash('sha256').update(b).digest('hex');
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
if (existsSync(join(root, OUT, 'diffs'))) { console.log('ARRÊT : ' + OUT + 'diffs existe déjà'); process.exit(1); }
const lire = (p) => readFileSync(join(root, p), 'utf8');
for (const [p, h] of Object.entries(DEPART)) ok(sha(readFileSync(join(root, p))) === h, 'P1 empreinte de départ : ' + p, h.slice(0, 12) + '…');
ok(/^\*\*Version courante : révision 4, du 2026-11-01\*\*/m.test(lire('docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md')), 'P2 la proposition en service est la révision 4');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P3 index vide');
const prop = {}; for (const [p, fr] of Object.entries(FRAG)) { let t = lire(p); for (const [a, z] of fr) { ok(t.split(a).length === 2, 'P4 ' + p + ' : fragment présent une fois : ' + a.slice(0, 44)); t = t.replace(a, () => z); } prop[p] = t; }
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l));
ok(JSON.stringify(jr(lire(ETAT))) === JSON.stringify(jr(prop[ETAT])), 'V1 journal historique inchangé, mentions datées comprises', jr(prop[ETAT]).filter((l) => l.includes('révision 3')).length + ' lignes de journal gardent « révision 3 »');
const BLOC = /<!-- a2-05:etat:debut[\s\S]*?<!-- a2-05:etat:fin -->/;
ok([ETAT, ROAD].every((p) => prop[p].match(BLOC)[0] === lire(p).match(BLOC)[0]), 'V2 blocs a2-05:etat inchangés');
ok(!/révision 3/.test(prop[ETAT].split(/\r?\n/).filter((l) => !/^\| \d{4}-\d{2}-\d{2}/.test(l)).join('\n')) && !/révision 3/.test(prop[ROAD]), 'V3 plus aucune mention « révision 3 » hors du journal historique');
if (ko) { dire('ARRÊT avant essai'); process.exit(1); }
const tmp = mkdtempSync(join(tmpdir(), 'ocha-mentions-')); const C = join(tmp, 'arbre');
spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
for (const [p, t] of Object.entries(prop)) writeFileSync(join(C, p), t);
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 120);
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'E1 relais : 30 sur 30', fin(rel));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0, 'E2 manifeste', fin(emp));
for (const n of [5, 6, 7, 8, 9]) { const r = lancer(W + 'recalcul-T' + n + '-perimetre.mjs'); ok(r.code === 0, 'E3 recalcul de T' + n, fin(r)); }
const pi = lancer(W + 'controle-bilan-pilote.mjs'); ok(pi.code === 0, 'E4 contrôle du pilote', fin(pi));
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const ch = readFileSync(join(C, W + 'sync-stable-apercu.md'), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)); ok(ap.code === 0 && !ch.length, 'E5 aperçu vide', fin(ap));
rmSync(tmp, { recursive: true, force: true });
if (!ko) { const d = join(root, OUT); mkdirSync(join(d, 'diffs'), { recursive: true }); const tab = []; for (const [p, t] of Object.entries(prop)) { writeFileSync(join(d, p), t); const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + p], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, 'diffs', p + '.diff'), r.stdout); tab.push('| `' + p + '` | `' + DEPART[p] + '` | `' + sha(Buffer.from(t, 'utf8')) + '` | `' + sha(r.stdout) + '` |'); } writeFileSync(join(d, 'table-diffs.md'), '| Fichier | Départ | Proposé | Diff |\n|---|---|---|---|\n' + tab.join('\n') + '\n'); }
ok(Object.entries(DEPART).every(([p, h]) => sha(readFileSync(join(root, p))) === h), 'documents en service inchangés');
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
