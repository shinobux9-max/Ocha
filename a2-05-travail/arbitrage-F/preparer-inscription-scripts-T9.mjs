// A2-05 · préparation, sans application, de l'inscription factuelle des deux scripts finaux de consignation de T9 à l'inventaire : deux lignes ajoutées, aucune modifiée.
// Le §8.113 et le journal historique ne sont pas touchés. Usage : node a2-05-travail/arbitrage-F/preparer-inscription-scripts-T9.mjs <racine du dépôt>
// Essai dans un clone jetable ; écrit la version proposée et son diff dans arbitrage-F/inscription-scripts-T9/, seulement sans écart ; dépôt réel inchangé.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', INV = W + 'INVENTAIRE-SCRIPTS.md', OUT = W + 'arbitrage-F/inscription-scripts-T9/', A = W + 'arbitrage-T9/consignation-T9/application/';
const INV_SHA = '018b40bc87b6f257bebb69ac520b0951a7ee243f9fb17f3e79e4a97ed95dc3b6', ANCRE = '| `arbitrage-T9/consignation-T9/preparer-consignation-T9.mjs` |';
const CITES = { [A + 'appliquer-consignation-T9.mjs']: 'adb55457', [A + 'essayer-consignation-T9.mjs']: '7a98881e' };
const LIGNES = [
  "| `arbitrage-T9/consignation-T9/application/appliquer-consignation-T9.mjs` | application de la consignation de T9 : préconditions, diffs régénérés identiques aux diffs relus, sauvegarde, quatre hunks relus par remplacements ciblés, contrôles (`adb55457…`) | bilan, `ETAT-ACTUEL.md`, `ROADMAP.md`, inventaire, `…/application/depart/`, `…/diffs-reels/`, `…/sorties/` | lancé une fois le 2026-11-01, code 0, 80 vérifications |",
  "| `arbitrage-T9/consignation-T9/application/essayer-consignation-T9.mjs` | essai de ce script sur une copie jetable : douze refus, exécution nominale, seconde exécution refusée (`7a98881e…`) | `…/application/sorties/essai.txt` | code 0 |",
];
const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const sha = (b) => createHash('sha256').update(b).digest('hex');
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
if (existsSync(join(root, OUT))) { console.log('ARRÊT : ' + OUT + ' existe déjà'); process.exit(1); }
const t = readFileSync(join(root, INV), 'utf8'); const L = t.split('\n'); const i = L.flatMap((l, k) => (l.startsWith(ANCRE) ? [k] : []));
ok(sha(Buffer.from(t, 'utf8')) === INV_SHA && !t.includes('\r\n'), 'P1 inventaire à son empreinte de départ, en LF', INV_SHA.slice(0, 12) + '…');
ok(i.length === 1, 'P2 ancre présente une fois');
ok(!t.includes('appliquer-consignation-T9.mjs') && !t.includes('essayer-consignation-T9.mjs'), 'P3 ajouts absents');
ok(Object.entries(CITES).every(([p, h]) => sha(readFileSync(join(root, p))).startsWith(h)), 'P4 empreintes citées conformes au dépôt réel');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P5 index vide');
if (ko) { dire('ARRÊT avant préparation'); process.exit(1); }
const prop = [...L.slice(0, i[0] + 1), ...LIGNES, ...L.slice(i[0] + 1)].join('\n');
ok(prop.split('\n').length === L.length + 2 && L.every((l) => prop.split('\n').includes(l)), 'V1 deux lignes ajoutées, aucune ligne existante modifiée');

// Essai dans un clone jetable
const tmp = mkdtempSync(join(tmpdir(), 'ocha-inscription-scripts-t9-')); const C = join(tmp, 'arbre');
spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
writeFileSync(join(C, INV), prop);
const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
const fin = (r) => r.out.split('\n').pop().slice(0, 120);
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel.code === 0 && fin(rel) === '30 conformes sur 30', 'E1 relais : 30 sur 30', fin(rel));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0, 'E2 manifeste', fin(emp));
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const ch = readFileSync(join(C, W + 'sync-stable-apercu.md'), 'utf8').split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)); ok(ap.code === 0 && !ch.length, 'E3 aperçu vide', fin(ap));
rmSync(tmp, { recursive: true, force: true });

if (!ko) {
  const d = join(root, OUT); mkdirSync(d, { recursive: true }); writeFileSync(join(d, 'INVENTAIRE-SCRIPTS.md'), prop);
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', INV, OUT + 'INVENTAIRE-SCRIPTS.md'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(d, 'INVENTAIRE-SCRIPTS.md.diff'), r.stdout);
  dire('proposé ' + sha(Buffer.from(prop, 'utf8')) + ' ; diff ' + sha(r.stdout));
}
ok(sha(readFileSync(join(root, INV))) === INV_SHA, 'inventaire en service inchangé');
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
