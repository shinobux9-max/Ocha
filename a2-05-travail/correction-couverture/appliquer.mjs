// A2-05 : application du correctif du registre de couverture (autorisée le 2026-10-20). Une seule opération logique.
// Usage : node a2-05-travail/correction-couverture/appliquer.mjs <racine du dépôt>
// Avant écriture : différence recalculée (module réel → version proposée) identique à la différence approuvée, et `git apply` de la
// différence approuvée redonnant exactement la version proposée ; sinon arrêt sans écriture. Sauvegarde de départ et manifeste ; restauration si échec.
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail'), H = join(W, 'correction-couverture');
const MODS = ['couverture-lot3.mjs', 'empreintes-lot3.mjs'];
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex'); const lire = (f) => readFileSync(f, 'utf8');
const arret = (m) => { console.log('ARRÊT SANS ÉCRITURE : ' + m); process.exit(2); };
const depart = {}, final = {};
for (const m of MODS) {
  depart[m] = lire(join(W, m)); final[m] = lire(join(H, 'proposition', m)); const approuve = lire(join(H, 'diffs', m + '.diff'));
  const d = mkdtempSync(join(tmpdir(), 'ap-cv-')); writeFileSync(join(d, 'a'), depart[m]); writeFileSync(join(d, 'b'), final[m]);
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U2', 'a', 'b'], { cwd: d, encoding: 'utf8' });
  const recalc = r.stdout.replace(/^diff --git a\/a b\/b\n(?:index [^\n]*\n)?--- a\/a\n\+\+\+ b\/b\n/, '--- a/a2-05-travail/' + m + '\n+++ b/a2-05-travail/' + m + '\n');
  if (r.status !== 1 || recalc !== approuve) arret(m + ' : la différence avec la version proposée n\'est plus la différence approuvée');
  const g = mkdtempSync(join(tmpdir(), 'ap-cv-git-')); mkdirSync(join(g, 'a2-05-travail')); writeFileSync(join(g, 'a2-05-travail', m), depart[m]);
  spawnSync('git', ['init', '-q'], { cwd: g }); const ap = spawnSync('git', ['-c', 'core.autocrlf=false', 'apply', '--whitespace=nowarn', join(H, 'diffs', m + '.diff')], { cwd: g, encoding: 'utf8' });
  if (ap.status !== 0 || lire(join(g, 'a2-05-travail', m)) !== final[m]) arret(m + ' : `git apply` ne redonne pas la version proposée (code ' + ap.status + ')');
}
console.log('vérifications d\'avant écriture : conformes pour les deux modules');
mkdirSync(join(H, 'depart'), { recursive: true }); for (const m of MODS) writeFileSync(join(H, 'depart', m), depart[m]);
const manifeste = { genere_par: 'a2-05-travail/correction-couverture/appliquer.mjs', date: '2026-10-20', modules: Object.fromEntries(MODS.map((m) => [m, { depart_sha256: sha(depart[m]), final_sha256: sha(final[m]) }])) };
writeFileSync(join(H, 'manifeste.json'), JSON.stringify(manifeste, null, 1) + '\n');
try { for (const m of MODS) writeFileSync(join(W, m), final[m]); for (const m of MODS) if (sha(lire(join(W, m))) !== manifeste.modules[m].final_sha256) throw new Error(m + ' : empreinte après écriture non conforme'); }
catch (e) { for (const m of MODS) writeFileSync(join(W, m), depart[m]); console.log('ÉCHEC : ' + e.message + ' ; restauration faite'); process.exit(1); }
for (const m of MODS) console.log('appliqué : a2-05-travail/' + m + ' (' + manifeste.modules[m].depart_sha256.slice(0, 12) + '… → ' + manifeste.modules[m].final_sha256.slice(0, 12) + '…)');
