// A2-05 : application de la résolution de C9a, option A (autorisée le 2026-10-22), aux deux modules. Une seule opération logique.
// Usage : node a2-05-travail/correction-c9a/appliquer.mjs <racine du dépôt>
// Avant écriture : empreintes de départ, des versions proposées et des différences = celles relues (archive du 2026-10-22, constantes) ;
// différences recalculées identiques ; `git apply` en bac à sable redonnant exactement les versions proposées ; sinon arrêt sans écriture.
// Sauvegarde de départ (modules et manifeste d'empreintes à 29 entrées, référence des essais d'après application) ; restauration si échec.
// N'ajoute rien au manifeste d'empreintes : l'ajout du périmètre de T2 est une opération distincte (empreintes-lot3.mjs --ajouter).
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail'), H = join(W, 'correction-c9a');
const RELU = {
  'empreintes-lot3.mjs': { depart: '34e0d5696ce90359f0ebcff2172ad8191033e12f93190940113d96881a94b3e7', final: 'bac08d6c39622fea53bbbbde5609599103acea894f43312635fea329aec77e9e', diff: '33b8055c132ae15406142ed9eb587c93530fdacfda6e89a4995ca9b0da8270f9' },
  'controle-relais-allege.mjs': { depart: '779ef8460dcb34982d8e14f12fb9386d29b4a5ac97932dd5e94b893d0df3d4fc', final: 'cd8e307e5664355ace8419cb05c27c95c801fed0f3f6f9e5a8874ece782bde24', diff: '6475cad02e3c38bfc5db7c55f95e54295192cc91cc1a3a8a9b48bcc5a0b26a3e' },
};
const MAN = 'empreintes-rapports-arbitres.json', MAN_DEPART = '826d6d164e9cf1d1749727fd6169f4263286b8af1cdf912818443659046f75e9';
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex'); const lire = (f) => readFileSync(f, 'utf8');
const arret = (m) => { console.log('ARRÊT SANS ÉCRITURE : ' + m); process.exit(2); };
if (existsSync(join(H, 'manifeste.json'))) arret('correction-c9a/manifeste.json existe déjà : la résolution a déjà été appliquée');
const man = lire(join(W, MAN)); if (sha(man) !== MAN_DEPART) arret(MAN + ' : empreinte ' + sha(man).slice(0, 12) + '…, attendue ' + MAN_DEPART.slice(0, 12) + '… (29 entrées)');
const depart = {}, final = {};
for (const [m, e] of Object.entries(RELU)) {
  depart[m] = lire(join(W, m)); final[m] = lire(join(H, 'proposition', m)); const approuve = lire(join(H, 'diffs', m + '.diff'));
  if (sha(depart[m]) !== e.depart) arret(m + ' : empreinte de départ ' + sha(depart[m]).slice(0, 12) + '…, relue ' + e.depart.slice(0, 12) + '…');
  if (sha(final[m]) !== e.final) arret(m + ' : version proposée ' + sha(final[m]).slice(0, 12) + '…, relue ' + e.final.slice(0, 12) + '…');
  if (sha(approuve) !== e.diff) arret(m + ' : différence ' + sha(approuve).slice(0, 12) + '…, relue ' + e.diff.slice(0, 12) + '…');
  const d = mkdtempSync(join(tmpdir(), 'ap-c9a-')); writeFileSync(join(d, 'a'), depart[m]); writeFileSync(join(d, 'b'), final[m]);
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U2', 'a', 'b'], { cwd: d, encoding: 'utf8' });
  const recalc = r.stdout.replace(/^diff --git a\/a b\/b\n(?:index [^\n]*\n)?--- a\/a\n\+\+\+ b\/b\n/, '--- a/a2-05-travail/' + m + '\n+++ b/a2-05-travail/' + m + '\n');
  if (r.status !== 1 || recalc !== approuve) arret(m + ' : la différence recalculée n\'est pas la différence relue');
  const g = mkdtempSync(join(tmpdir(), 'ap-c9a-git-')); mkdirSync(join(g, 'a2-05-travail')); writeFileSync(join(g, 'a2-05-travail', m), depart[m]);
  spawnSync('git', ['init', '-q'], { cwd: g }); const ap = spawnSync('git', ['-c', 'core.autocrlf=false', 'apply', '--whitespace=nowarn', join(H, 'diffs', m + '.diff')], { cwd: g, encoding: 'utf8' });
  if (ap.status !== 0 || lire(join(g, 'a2-05-travail', m)) !== final[m]) arret(m + ' : `git apply` ne redonne pas la version proposée (code ' + ap.status + ')');
}
console.log('vérifications d\'avant écriture : conformes pour les deux modules ; manifeste d\'empreintes à 29 entrées (' + MAN_DEPART.slice(0, 12) + '…)');
mkdirSync(join(H, 'depart'), { recursive: true }); for (const m of Object.keys(RELU)) writeFileSync(join(H, 'depart', m), depart[m]); writeFileSync(join(H, 'depart', MAN), man);
const manifeste = { genere_par: 'a2-05-travail/correction-c9a/appliquer.mjs', date: '2026-10-22', modules: Object.fromEntries(Object.entries(RELU).map(([m, e]) => [m, { depart_sha256: e.depart, final_sha256: e.final, diff_sha256: e.diff }])), manifeste_empreintes_depart_sha256: MAN_DEPART };
writeFileSync(join(H, 'manifeste.json'), JSON.stringify(manifeste, null, 1) + '\n');
try { for (const m of Object.keys(RELU)) writeFileSync(join(W, m), final[m]); for (const [m, e] of Object.entries(RELU)) if (sha(lire(join(W, m))) !== e.final) throw new Error(m + ' : empreinte après écriture non conforme'); }
catch (e) { for (const m of Object.keys(RELU)) writeFileSync(join(W, m), depart[m]); console.log('ÉCHEC : ' + e.message + ' ; restauration faite'); process.exit(1); }
for (const [m, e] of Object.entries(RELU)) console.log('appliqué : a2-05-travail/' + m + ' (' + e.depart.slice(0, 12) + '… → ' + e.final.slice(0, 12) + '…)');
