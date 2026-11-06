// A2-05 · bloc F · temps 3, livraison E2 : sabotages de rediger-rapport-E2.mjs sur copies jetables (hors du dépôt). Transposé de essayer-sabotages-E1.mjs.
// Usage : node a2-05-travail/omissions-temps3/essayer-sabotages-E2.mjs <racine du dépôt> <dossier jetable>
import { mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path'; import { spawnSync } from 'node:child_process';
const [root, base] = process.argv.slice(2); const O = 'a2-05-travail/omissions-temps3/';
const FICH = [O + 'perimetre-E.json', O + 'analyse-E2.json', O + 'rediger-rapport-E2.mjs', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/vocab.json', 'reconstruction/a2-04/sources/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/exemples.json', 'reconstruction/a2-04/journal.json', 'docs/rapports/etape2-A2-05-audit-null.md'];
const out = ['Essais de sabotage de rediger-rapport-E2.mjs, sur copies jetables (scratchpad/e2/sab), 2026-11-05'];
const essai = (nom, desc, alt) => {
  const d = join(base, nom); if (existsSync(d)) rmSync(d, { recursive: true });
  for (const f of FICH) { mkdirSync(dirname(join(d, f)), { recursive: true }); copyFileSync(join(root, f), join(d, f)); }
  if (alt) { const p = join(d, O + 'analyse-E2.json'); const A = JSON.parse(readFileSync(p, 'utf8')); const avant = JSON.stringify(A); alt(A); if (JSON.stringify(A) === avant) throw new Error(nom + ' : sabotage sans effet'); writeFileSync(p, JSON.stringify(A, null, 1)); }
  const r = spawnSync(process.execPath, [join(d, O + 'rediger-rapport-E2.mjs'), d], { encoding: 'utf8' });
  const L = r.stdout.split('\n').filter(Boolean); const ecarts = L.filter((l) => l.startsWith('ÉCART') || l.startsWith('ARRÊT'));
  out.push('--- ' + nom, desc, ...(alt ? ecarts : [L.at(-1)]), 'code ' + r.status + (alt ? (existsSync(join(d, O + 'rapport-relecture-E2.md')) ? ' ; rapport écrit' : ' ; rien n\'est écrit') : ''));
  return r.status;
};
const s = [];
s.push(essai('T0', 'témoin sain', null) === 0);
// S1 : D1126, citée dans le seul R5 (D1125, d'abord choisie, figure aussi dans l'indice : la retirer du R5 la laissait citée, et le premier essai, à juste titre, ne l'a pas détectée)
s.push(essai('S1', 'D1126 retirée du R5 de v_512_s1, où elle est seule citée', (A) => { A.v_512_s1.r5 = A.v_512_s1.r5.replace('D1126 écarte', 'une décision écarte'); }) === 1);
s.push(essai('S2', 'verdict du volet 2 faux pour v_457_s1 (L -> C)', (A) => { A.v_457_s1.r5 = A.v_457_s1.r5.replace('Volet 2 : verdict L', 'Volet 2 : verdict C'); }) === 1);
s.push(essai('S3', 'frontière de la valeur nulle retirée du R3 de v_62_s1', (A) => { A.v_62_s1.r3 = A.v_62_s1.r3.replace(' ; §5, points 1 et 2', ''); }) === 1);
s.push(essai('S4', 'porteur cité faux dans le R2 de v_420_s1 (v_393 -> v_403)', (A) => { A.v_420_s1.r2 = A.v_420_s1.r2.replace('porteur `v_393`', 'porteur `v_403`'); }) === 1);
s.push(essai('S5', 'groupe faux pour v_512_s1 (b -> a)', (A) => { A.v_512_s1.groupe = 'a'; }) === 1);
s.push(essai('S6', 'question de vérification de 大丈夫 retirée du R2 de v_512_s1', (A) => { A.v_512_s1.r2 = A.v_512_s1.r2.replace('「体は大丈夫ですか」「はい、大丈夫です」', '« la question de l\'ancien exemple 1 »'); }) === 1);
s.push(essai('S7', 'frontière de l\'information demandée retirée du R3 de v_512_s1', (A) => { A.v_512_s1.r3 = A.v_512_s1.r3.replace('Information demandée et information désignée (§2)', 'Information (§2)'); }) === 1);
s.push(essai('S8', 'marques grammaticales retirées du R3 de v_609_s1 (énoncé en ね)', (A) => { A.v_609_s1.r3 = A.v_609_s1.r3.replace('(§4, point 5)', '(§4)'); }) === 1);
out.push('', 'bilan : ' + s.filter(Boolean).length + ' sur ' + s.length + ' conformes à l\'attendu (témoin à 0, chaque sabotage à 1 sans écriture)');
console.log(out.join('\n'));
