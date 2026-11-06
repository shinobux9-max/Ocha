// A2-05 : essai sur clone jetable, commun aux préparations de la consignation du checkpoint et de l'installation d'A10. Aucun effet à l'import ; le dépôt réel n'est jamais écrit.
import { writeFileSync, mkdtempSync, cpSync, readdirSync, rmSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

export const EXCLUS = ['.git', 'node_modules', 'chatgpt-relecture'];
const W = 'a2-05-travail/';

// Clone sans extraction, puis copie de l'arbre réel (non suivis compris) : `.gitattributes` en dernier, pour que le rafraîchissement de l'index garde les fins de ligne de l'arbre
export function cloner(root) {
  const tmp = mkdtempSync(join(tmpdir(), 'ocha-essai-')); const C = join(tmp, 'arbre'); const f = (p) => join(C, p);
  spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
  const zipSuivis = spawnSync('git', ['ls-files', '*.zip'], { cwd: root, encoding: 'utf8' }).stdout.split('\n').filter(Boolean);
  for (const e of readdirSync(root)) if (!EXCLUS.includes(e) && (!e.endsWith('.zip') || zipSuivis.includes(e)) && e !== '.gitattributes') cpSync(join(root, e), join(C, e), { recursive: true });
  spawnSync('git', ['update-index', '-q', '--refresh'], { cwd: C }); cpSync(join(root, '.gitattributes'), f('.gitattributes'));
  const ecrire = (p, t) => { mkdirSync(dirname(f(p)), { recursive: true }); writeFileSync(f(p), t); };
  const lancer = (s, ...a) => { const x = spawnSync(process.execPath, [f(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
  const nettoyer = () => rmSync(tmp, { recursive: true, force: true });
  return { C, f, ecrire, lancer, nettoyer };
}

// Contrôles communs, relancés dans le clone ; `rapporter(ok, libellé, détail)` reçoit chaque résultat
// `chemins` : fichiers visés par l'essai, seuls soumis à `git diff --check` (dans le clone, d'autres fichiers suivis paraissent modifiés par la seule différence d'attributs)
// `attendus` : écarts du relais annoncés pour cet état ; tout autre écart, ou l'absence de l'un d'eux, est un échec
export function controler(cl, nom, rapporter, { tests = false, chemins = [], attendus = [] } = {}) {
  const fin = (r) => r.out.split('\n').pop().slice(0, 120); const ecarts = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim().slice(0, 240)).join(' | ');
  const ids = (r) => r.out.split('\n').map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join();
  const juge = (r) => (attendus.length ? r.code === 1 && ids(r) === [...attendus].sort().join() && fin(r) === (30 - attendus.length) + ' conformes sur 30' : r.code === 0 && fin(r) === '30 conformes sur 30');
  const titre = attendus.length ? (30 - attendus.length) + ' sur 30, écarts attendus ' + attendus.join(', ') + ' seuls' : '30 sur 30';
  const rel = cl.lancer(W + 'controle-relais-allege.mjs', '--apres-application'); rapporter(juge(rel), nom + ' : relais normal, ' + titre, fin(rel) + ' ; écarts : ' + (ids(rel) || 'aucun'));
  const st = cl.lancer(W + 'controle-relais-allege.mjs', '--apres-application', '--strict'); rapporter(juge(st), nom + ' : relais --strict, ' + titre, fin(st) + ' ; écarts : ' + (ids(st) || 'aucun'));
  for (const [n, s] of [['empreintes', W + 'empreintes-lot3.mjs'], ['couverture', W + 'couverture-lot3.mjs'], ['pilote', W + 'controle-bilan-pilote.mjs'], ...[5, 6, 7, 8, 9].map((x) => ['recalcul de T' + x, W + 'recalcul-T' + x + '-perimetre.mjs'])]) { const r = cl.lancer(s); rapporter(r.code === 0, nom + ' : ' + n, 'code ' + r.code); }
  const ap = cl.lancer(W + 'sync-stable.mjs', '--apercu'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; rapporter(ap.code === 0, nom + ' : aperçu', 'plan ' + plan);
  rapporter(spawnSync('git', ['diff', '--check', '--', ...chemins], { cwd: cl.C, encoding: 'utf8', maxBuffer: 1 << 28 }).status === 0, nom + ' : git diff --check, fichiers visés', chemins.length + ' fichier(s)');
  if (tests) {
    for (const a of ['assemble', 'verify']) { const r = spawnSync(process.execPath, [cl.f('tools/reconstruction/run.mjs'), a], { cwd: cl.C, encoding: 'utf8', maxBuffer: 1 << 28 }); rapporter(r.status === 0, nom + ' : run.mjs ' + a, 'code ' + r.status); }
    const t = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: cl.C, encoding: 'utf8', maxBuffer: 1 << 28 }); const n = (k) => ((t.stdout ?? '').match(new RegExp('^. ' + k + ' (\\d+)$', 'm')) ?? [])[1]; rapporter(t.status === 0 && n('tests') === '510' && n('pass') === '510', nom + ' : 510 tests', 'code ' + t.status + ' ; ' + n('pass') + ' sur ' + n('tests'));
  }
  return plan;
}
