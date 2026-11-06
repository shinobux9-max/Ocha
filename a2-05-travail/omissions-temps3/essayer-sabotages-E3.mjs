// A2-05 · bloc F · temps 3, livraison E3 : sabotages de rediger-rapport-E3.mjs sur copies jetables (hors du dépôt). Transposé de essayer-sabotages-E2.mjs.
// Usage : node a2-05-travail/omissions-temps3/essayer-sabotages-E3.mjs <racine du dépôt> <dossier jetable>
import { mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path'; import { spawnSync } from 'node:child_process';
const [root, base] = process.argv.slice(2); const O = 'a2-05-travail/omissions-temps3/';
if (!root || !base) throw new Error('arguments attendus : racine du dépôt, dossier jetable');
const FICH = [O + 'perimetre-E.json', O + 'analyse-E3.json', O + 'rediger-rapport-E3.mjs', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/vocab.json', 'reconstruction/a2-04/sources/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/exemples.json', 'reconstruction/a2-04/journal.json', 'docs/rapports/etape2-A2-05-audit-null.md'];
const out = ['Essais de sabotage de rediger-rapport-E3.mjs, sur copies jetables (scratchpad/e3/sab), 2026-11-05'];
const essai = (nom, desc, alt) => {
  const d = join(base, nom); if (existsSync(d)) rmSync(d, { recursive: true });
  for (const f of FICH) { mkdirSync(dirname(join(d, f)), { recursive: true }); copyFileSync(join(root, f), join(d, f)); }
  if (alt) { const p = join(d, O + 'analyse-E3.json'); const A = JSON.parse(readFileSync(p, 'utf8')); const avant = JSON.stringify(A); alt(A); if (JSON.stringify(A) === avant) throw new Error(nom + ' : sabotage sans effet'); writeFileSync(p, JSON.stringify(A, null, 1)); }
  const r = spawnSync(process.execPath, [join(d, O + 'rediger-rapport-E3.mjs'), d], { encoding: 'utf8' });
  const L = r.stdout.split('\n').filter(Boolean); const ecarts = L.filter((l) => l.startsWith('ÉCART') || l.startsWith('ARRÊT'));
  out.push('--- ' + nom, desc, ...(alt ? ecarts : [L.at(-1)]), 'code ' + r.status + (alt ? (existsSync(join(d, O + 'rapport-relecture-E3.md')) ? ' ; rapport écrit' : ' ; rien n\'est écrit') : ''));
  return r.status;
};
const s = [];
s.push(essai('T0', 'témoin sain', null) === 0);
s.push(essai('S1', 'D1219 retirée du R5 de v_50_s2, où elle est seule citée', (A) => { A.v_50_s2.r5 = A.v_50_s2.r5.replace('D1219 signale', 'une décision signale'); }) === 1);
s.push(essai('S2', 'verdict du volet 2 faux pour v_528_s1 (C -> L)', (A) => { A.v_528_s1.r5 = A.v_528_s1.r5.replace('Volet 2 : verdict C', 'Volet 2 : verdict L'); }) === 1);
s.push(essai('S3', 'frontière de la valeur nulle retirée du R3 de v_79_s1', (A) => { A.v_79_s1.r3 = A.v_79_s1.r3.replace(' ; §5, points 1 et 2', ''); }) === 1);
s.push(essai('S4', 'porteur cité faux dans le R2 de v_573_s1 (v_179 -> v_420)', (A) => { A.v_573_s1.r2 = A.v_573_s1.r2.replace('porteur `v_179`', 'porteur `v_420`'); }) === 1);
s.push(essai('S5', 'groupe faux pour v_533_s1 (b -> a)', (A) => { A.v_533_s1.groupe = 'a'; }) === 1);
s.push(essai('S6', 'distinction du contenu et du porteur retirée du R2 de v_637_s1 (demande de permission)', (A) => { A.v_637_s1.r2 = A.v_637_s1.r2.replace('il est le contenu de la question, non son porteur', 'il y figure'); }) === 1);
s.push(essai('S7', 'frontière de l\'information demandée retirée du R3 de v_665_s2 (question fermée)', (A) => { A.v_665_s2.r3 = A.v_665_s2.r3.replace('Information demandée et information désignée (§2)', 'Information (§2)'); }) === 1);
s.push(essai('S8', 'marques grammaticales retirées du R3 de v_580_s1 (demande de permission)', (A) => { A.v_580_s1.r3 = A.v_580_s1.r3.replace('(§4, point 5)', '(§4)'); }) === 1);
s.push(essai('S9', 'limite retirée du R2 de v_608_s2 (sens sans illustration)', (A) => { A.v_608_s2.r2 = A.v_608_s2.r2.replace('Limite :', 'Par ailleurs,'); }) === 1);
s.push(essai('S10', 'correction V2-15 retirée du R5 de v_266_s2, où elle est seule citée', (A) => { A.v_266_s2.r5 = A.v_266_s2.r5.replace('V2-15 (particules du sens 1)', 'une autre correction'); }) === 1);
out.push('', 'bilan : ' + s.filter(Boolean).length + ' sur ' + s.length + ' conformes à l\'attendu (témoin à 0, chaque sabotage à 1 sans écriture)');
console.log(out.join('\n'));
