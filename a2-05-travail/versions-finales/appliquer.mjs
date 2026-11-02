// A2-05 : application des versions finales de l'étape 3 (autorisée le 2026-10-20), une seule opération logique.
// Usage : node a2-05-travail/versions-finales/appliquer.mjs <racine du dépôt>
// Ne régénère rien : applique exclusivement les versions du manifeste. Avant toute écriture : empreintes de départ des
// quatre documents, empreintes des versions finales, différences identiques à celles approuvées, §8.66 absent et §8.65
// dernière sous-section du bilan, ancien relais lisible dans git. Sauvegarde de départ dans versions-finales/depart/
// (empreintes vérifiées) ; si une écriture ou un contrôle d'après écriture échoue, les quatre fichiers sont restaurés.
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const VF = join(root, 'a2-05-travail/versions-finales');
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const lire = (f) => readFileSync(f, 'utf8');
const man = JSON.parse(lire(join(VF, 'manifeste.json'))).documents;
const docs = Object.keys(man);
const refus = (m) => { console.log('ARRÊT SANS ÉCRITURE : ' + m); process.exit(2); };

// 1. Vérifications, aucune écriture
if (docs.length !== 4) refus('manifeste : ' + docs.length + ' documents, 4 attendus');
const depart = {}, final = {};
for (const p of docs) {
  depart[p] = lire(join(root, p)); final[p] = lire(join(VF, p));
  if (sha(depart[p]) !== man[p].depart_sha256) refus(p + ' : empreinte de départ différente du manifeste');
  if (sha(final[p]) !== man[p].final_sha256) refus(p + ' : version finale différente du manifeste');
  const fins = final[p].includes('\r\n') ? 'CRLF' : 'LF';
  if (fins !== man[p].fins_de_ligne || (fins === 'LF' && final[p].includes('\r'))) refus(p + ' : fins de ligne de la version finale');
  const d = mkdtempSync(join(tmpdir(), 'ap-'));
  try {
    writeFileSync(join(d, 'a'), depart[p].replace(/\r\n/g, '\n')); writeFileSync(join(d, 'b'), final[p].replace(/\r\n/g, '\n'));
    const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U2', 'a', 'b'], { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 });
    const diff = r.stdout.replace(/^diff --git a\/a b\/b\n(?:index [^\n]*\n)?--- a\/a\n\+\+\+ b\/b\n/, '--- a/' + p + '\n+++ b/' + p + '\n');
    if (r.status !== 1 || diff !== lire(join(root, man[p].diff))) refus(p + ' : différence différente de celle approuvée');
  } finally { rmSync(d, { recursive: true, force: true }); }
}
const B = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const nums = [...depart[B].matchAll(/^### 8\.(\d+) /gm)].map((m) => +m[1]);
if (nums.includes(66) || Math.max(...nums) !== 65) refus('bilan : §8.66 déjà présent ou dernière sous-section ≠ 8.65 (' + Math.max(...nums) + ')');
const anc = spawnSync('git', ['show', '78031638:docs/relecture/reprise-A2-05.md'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
if (anc.status !== 0 || anc.stdout.length < 200000) refus('ancien relais illisible au commit 78031638');
console.log('vérifications d\'avant écriture : 4 documents conformes au manifeste ; différences identiques ; §8.65 dernière ; ancien relais lisible');

// 2. Sauvegarde de départ, vérifiée
for (const p of docs) { mkdirSync(dirname(join(VF, 'depart', p)), { recursive: true }); writeFileSync(join(VF, 'depart', p), depart[p]); if (sha(lire(join(VF, 'depart', p))) !== man[p].depart_sha256) refus('sauvegarde de ' + p + ' non conforme'); }
console.log('sauvegarde de départ : a2-05-travail/versions-finales/depart/ (4 fichiers, empreintes vérifiées)');

// 3. Application ; restauration complète en cas d'échec
const ecrits = [];
try {
  for (const p of docs) { writeFileSync(join(root, p), final[p]); ecrits.push(p); }
  for (const p of docs) if (sha(lire(join(root, p))) !== man[p].final_sha256) throw new Error(p + ' : empreinte finale non conforme après écriture');
} catch (e) {
  for (const p of docs) writeFileSync(join(root, p), depart[p]);
  const ok = docs.every((p) => sha(lire(join(root, p))) === man[p].depart_sha256);
  console.log('ÉCHEC : ' + e.message + ' ; fichiers écrits : ' + ecrits.join(', ') + ' ; restauration des 4 : ' + (ok ? 'faite, empreintes de départ retrouvées' : 'INCOMPLÈTE'));
  process.exit(1);
}
for (const p of docs) console.log('appliqué : ' + p + ' (' + man[p].octets_depart + ' → ' + man[p].octets_final + ' octets, ' + man[p].fins_de_ligne + ')');
console.log('les 4 empreintes finales sont celles du manifeste');
