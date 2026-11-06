// A2-05 · bloc F · temps 3, livraison E1 : sabotages de rediger-rapport-E1.mjs sur copies jetables (hors du dépôt). Usage : node a2-05-travail/omissions-temps3/essayer-sabotages-E1.mjs <racine du dépôt> <dossier jetable>
import { mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path'; import { spawnSync } from 'node:child_process';
const [root, base] = process.argv.slice(2); const O = 'a2-05-travail/omissions-temps3/';
const FICH = [O + 'perimetre-E.json', O + 'analyse-E1.json', O + 'rediger-rapport-E1.mjs', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/vocab.json', 'reconstruction/a2-04/sources/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/exemples.json', 'reconstruction/a2-04/journal.json', 'docs/rapports/etape2-A2-05-audit-null.md'];
const out = ['Essais de sabotage de rediger-rapport-E1.mjs, sur copies jetables (scratchpad/e1/sab), 2026-11-05'];
const essai = (nom, desc, alt) => {
  const d = join(base, nom); if (existsSync(d)) rmSync(d, { recursive: true });
  for (const f of FICH) { mkdirSync(dirname(join(d, f)), { recursive: true }); copyFileSync(join(root, f), join(d, f)); }
  if (alt) { const p = join(d, O + 'analyse-E1.json'); const A = JSON.parse(readFileSync(p, 'utf8')); alt(A); writeFileSync(p, JSON.stringify(A, null, 1)); }
  const r = spawnSync(process.execPath, [join(d, O + 'rediger-rapport-E1.mjs'), d], { encoding: 'utf8' });
  const L = r.stdout.split('\n').filter(Boolean); const ecarts = L.filter((l) => l.startsWith('ÉCART') || l.startsWith('ARRÊT'));
  out.push('--- ' + nom, desc, ...(alt ? ecarts : [L.at(-1)]), 'code ' + r.status + (alt ? (existsSync(join(d, O + 'rapport-relecture-E1.md')) ? ' ; rapport écrit' : ' ; rien n\'est écrit') : ''));
  return r.status;
};
const s = [];
s.push(essai('T0', 'témoin sain', null) === 0);
s.push(essai('S1', 'D0096 retirée du R5 de v_633_s1', (A) => { A.v_633_s1.r5 = A.v_633_s1.r5.replace('D0096 (', '('); }) === 1);
s.push(essai('S2', 'verdict du volet 2 faux pour v_687_s1 (C -> L)', (A) => { A.v_687_s1.r5 = A.v_687_s1.r5.replace('Volet 2 : verdict C', 'Volet 2 : verdict L'); }) === 1);
s.push(essai('S3', 'frontière de la valeur nulle retirée du R3 de v_46_s1', (A) => { A.v_46_s1.r3 = A.v_46_s1.r3.replace(' ; §5, point 2', ''); }) === 1);
s.push(essai('S4', 'porteur cité faux dans le R2 de v_633_s1 (v_397 -> v_403)', (A) => { A.v_633_s1.r2 = A.v_633_s1.r2.replace('porteur `v_397`', 'porteur `v_403`'); }) === 1);
s.push(essai('S5', 'groupe faux pour v_686_s1 (b -> a)', (A) => { A.v_686_s1.groupe = 'a'; }) === 1);
s.push(essai('S6', 'question de 時計 retirée du R2 de v_671_s1', (A) => { A.v_671_s1.r2 = A.v_671_s1.r2.replace('「今、時計が何時を指していますか」', '« la question de l\'ancien exemple 2 »'); }) === 1);
s.push(essai('S7', 'frontière de l\'information désignée retirée du R3 de v_667_s1', (A) => { A.v_667_s1.r3 = A.v_667_s1.r3.replace('Information désignée et information demandée (§2)', 'Désignation (§2)'); }) === 1);
out.push('', 'bilan : ' + s.filter(Boolean).length + ' sur ' + s.length + ' conformes à l\'attendu (témoin à 0, chaque sabotage à 1 sans écriture)');
console.log(out.join('\n'));
