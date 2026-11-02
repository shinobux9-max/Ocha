// A2-05 : application de la correction hors JLPT aux deux modules v2 (autorisée le 2026-10-20), une seule opération logique.
// Usage : node a2-05-travail/correction-hj/appliquer.mjs <racine du dépôt>
// Avant toute écriture : la différence recalculée entre chaque module réel et sa version proposée doit être IDENTIQUE à la différence
// approuvée (correction-hj/diffs/) ; la différence approuvée, appliquée par `git apply` à une copie du module réel, doit redonner
// exactement la version proposée. Sinon : arrêt sans écriture. Sauvegarde de départ (correction-hj/depart/) et manifeste d'empreintes ;
// restauration des deux modules si une écriture ou une vérification d'après écriture échoue.
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); // absolu : `git apply` est lancé depuis un dossier temporaire
const W = join(root, 'a2-05-travail'), H = join(W, 'correction-hj');
const MODS = ['lot3-commun-v2.mjs', 'perimetre-v2.mjs'];
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const lire = (f) => readFileSync(f, 'utf8');
const arret = (m) => { console.log('ARRÊT SANS ÉCRITURE : ' + m); process.exit(2); };
const depart = {}, final = {};
for (const m of MODS) {
  depart[m] = lire(join(W, m)); final[m] = lire(join(H, 'proposition', m)); const approuve = lire(join(H, 'diffs', m + '.diff'));
  // a. différence recalculée = différence approuvée
  const d = mkdtempSync(join(tmpdir(), 'ap-hj-')); writeFileSync(join(d, 'a'), depart[m]); writeFileSync(join(d, 'b'), final[m]);
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U2', 'a', 'b'], { cwd: d, encoding: 'utf8' });
  const recalc = r.stdout.replace(/^diff --git a\/a b\/b\n(?:index [^\n]*\n)?--- a\/a\n\+\+\+ b\/b\n/, '--- a/a2-05-travail/' + m + '\n+++ b/a2-05-travail/' + m + '\n');
  if (r.status !== 1 || recalc !== approuve) arret(m + ' : la différence entre le module réel et la version proposée n\'est plus la différence approuvée');
  // b. la différence approuvée, appliquée à une copie du module réel, redonne exactement la version proposée
  const g = mkdtempSync(join(tmpdir(), 'ap-hj-git-')); mkdirSync(join(g, 'a2-05-travail')); writeFileSync(join(g, 'a2-05-travail', m), depart[m]);
  spawnSync('git', ['init', '-q'], { cwd: g }); const ap = spawnSync('git', ['-c', 'core.autocrlf=false', 'apply', '--whitespace=nowarn', join(H, 'diffs', m + '.diff')], { cwd: g, encoding: 'utf8' }); // sans conversion des fins de ligne (autocrlf de la machine)
  if (ap.status !== 0 || lire(join(g, 'a2-05-travail', m)) !== final[m]) arret(m + ' : `git apply` de la différence approuvée ne redonne pas la version proposée (code ' + ap.status + ' ' + (ap.stderr ?? '').trim() + ')');
}
console.log('vérifications d\'avant écriture : différences recalculées identiques aux différences approuvées ; `git apply` conforme pour les deux modules');
mkdirSync(join(H, 'depart'), { recursive: true });
for (const m of MODS) { writeFileSync(join(H, 'depart', m), depart[m]); if (lire(join(H, 'depart', m)) !== depart[m]) arret('sauvegarde de ' + m + ' non conforme'); }
const manifeste = { genere_par: 'a2-05-travail/correction-hj/appliquer.mjs', date: '2026-10-20', modules: Object.fromEntries(MODS.map((m) => [m, { depart_sha256: sha(depart[m]), final_sha256: sha(final[m]) }])) };
writeFileSync(join(H, 'manifeste.json'), JSON.stringify(manifeste, null, 1) + '\n');
console.log('sauvegarde de départ : a2-05-travail/correction-hj/depart/ ; manifeste : a2-05-travail/correction-hj/manifeste.json');
try {
  for (const m of MODS) writeFileSync(join(W, m), final[m]);
  for (const m of MODS) if (sha(lire(join(W, m))) !== manifeste.modules[m].final_sha256) throw new Error(m + ' : empreinte après écriture non conforme');
} catch (e) {
  for (const m of MODS) writeFileSync(join(W, m), depart[m]);
  console.log('ÉCHEC : ' + e.message + ' ; restauration : ' + (MODS.every((m) => sha(lire(join(W, m))) === manifeste.modules[m].depart_sha256) ? 'faite' : 'INCOMPLÈTE')); process.exit(1);
}
for (const m of MODS) console.log('appliqué : a2-05-travail/' + m + ' (' + manifeste.modules[m].depart_sha256.slice(0, 12) + '… → ' + manifeste.modules[m].final_sha256.slice(0, 12) + '…)');
