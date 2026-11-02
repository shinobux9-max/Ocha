// A2-05 : application du correctif des comparables du lot 1 au générateur de périmètres (autorisée le 2026-10-22, point 9 compris).
// Usage : node a2-05-travail/correction-comparables/appliquer.mjs <racine du dépôt>
// Avant écriture : empreinte du générateur réel = état de départ documenté (correction-hj/manifeste.json, final_sha256) ; version proposée =
// empreinte relue ; différence recalculée (générateur réel → version proposée) identique à la différence relue ; `git apply` de la différence
// relue redonnant exactement la version proposée ; sinon arrêt sans écriture. Sauvegarde de départ et manifeste ; restauration si échec.
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail'), H = join(W, 'correction-comparables');
const M = 'perimetre-v2.mjs';
const DEPART = JSON.parse(readFileSync(join(W, 'correction-hj', 'manifeste.json'), 'utf8')).modules[M].final_sha256; // bc8cdfb7540b…
const PROPOSE = 'd40aea3cc3e7916d1194b143563292c8e0bb8cba95f7da02c18332beb5ecfaac'; // version relue (export du 2026-10-21)
const DIFF = '96bf54536a41e6ff2d7a39e49fd9cea8725ebe02757b4f98536eaf90f3378b4c'; // différence relue (Partie 4 de l'export)
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex'); const lire = (f) => readFileSync(f, 'utf8');
const arret = (m) => { console.log('ARRÊT SANS ÉCRITURE : ' + m); process.exit(2); };
if (existsSync(join(H, 'manifeste.json'))) arret('manifeste.json existe déjà : le correctif a déjà été appliqué');
const depart = lire(join(W, M)), final = lire(join(H, 'proposition', M)), approuve = lire(join(H, 'diffs', M + '.diff'));
if (sha(depart) !== DEPART) arret(M + ' : empreinte réelle ' + sha(depart).slice(0, 12) + '…, état de départ documenté ' + DEPART.slice(0, 12) + '…');
if (sha(final) !== PROPOSE) arret('version proposée : empreinte ' + sha(final).slice(0, 12) + '…, version relue ' + PROPOSE.slice(0, 12) + '…');
if (sha(approuve) !== DIFF) arret('différence : empreinte ' + sha(approuve).slice(0, 12) + '…, différence relue ' + DIFF.slice(0, 12) + '…');
const d = mkdtempSync(join(tmpdir(), 'ap-cc-')); writeFileSync(join(d, 'a'), depart); writeFileSync(join(d, 'b'), final);
const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U2', 'a', 'b'], { cwd: d, encoding: 'utf8' });
const recalc = r.stdout.replace(/^diff --git a\/a b\/b\n(?:index [^\n]*\n)?--- a\/a\n\+\+\+ b\/b\n/, '--- a/a2-05-travail/' + M + '\n+++ b/a2-05-travail/' + M + '\n');
if (r.status !== 1 || recalc !== approuve) arret(M + ' : la différence avec la version proposée n\'est plus la différence relue');
const g = mkdtempSync(join(tmpdir(), 'ap-cc-git-')); mkdirSync(join(g, 'a2-05-travail')); writeFileSync(join(g, 'a2-05-travail', M), depart);
spawnSync('git', ['init', '-q'], { cwd: g }); const ap = spawnSync('git', ['-c', 'core.autocrlf=false', 'apply', '--whitespace=nowarn', join(H, 'diffs', M + '.diff')], { cwd: g, encoding: 'utf8' });
if (ap.status !== 0 || lire(join(g, 'a2-05-travail', M)) !== final) arret(M + ' : `git apply` ne redonne pas la version proposée (code ' + ap.status + ')');
console.log('vérifications d\'avant écriture : conformes (départ ' + DEPART.slice(0, 12) + '…, proposée ' + PROPOSE.slice(0, 12) + '…, différence ' + DIFF.slice(0, 12) + '…)');
mkdirSync(join(H, 'depart'), { recursive: true }); writeFileSync(join(H, 'depart', M), depart);
const manifeste = { genere_par: 'a2-05-travail/correction-comparables/appliquer.mjs', date: '2026-10-22', modules: { [M]: { depart_sha256: sha(depart), final_sha256: sha(final), diff_sha256: DIFF } } };
writeFileSync(join(H, 'manifeste.json'), JSON.stringify(manifeste, null, 1) + '\n');
try { writeFileSync(join(W, M), final); if (sha(lire(join(W, M))) !== PROPOSE) throw new Error(M + ' : empreinte après écriture non conforme'); }
catch (e) { writeFileSync(join(W, M), depart); console.log('ÉCHEC : ' + e.message + ' ; restauration faite'); process.exit(1); }
console.log('appliqué : a2-05-travail/' + M + ' (' + DEPART.slice(0, 12) + '… → ' + PROPOSE.slice(0, 12) + '…)');
