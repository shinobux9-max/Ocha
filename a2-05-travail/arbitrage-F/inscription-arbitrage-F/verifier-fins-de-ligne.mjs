// A2-05 · bloc F : preuve, pour relecture, que la conversion CRLF → LF du rapport F ne change aucun contenu. Lecture seule ; n'écrit que sa sortie.
// (1) Octets du rapport livré (départ) et de la version proposée : fins de ligne, empreintes contre le manifeste de la proposition. (2) Comparaison ligne à ligne,
// fins de ligne retirées : seules la ligne de statut et les 20 lignes du §0 diffèrent. (3) Le texte livré est celui de l'archive de relecture déjà transmise
// (chatgpt-relecture-A2-05-volet1-lot3-F-audit.zip, partie 2 de 05-relais.md). (4) Comparaison stricte, sans normalisation : nombre de lignes qui ne diffèrent que
// par le CR. (5) Aucune donnée lexicale, aucun lot, aucun journal, aucune norme modifiés.
// Usage : node a2-05-travail/arbitrage-F/inscription-arbitrage-F/verifier-fins-de-ligne.mjs <racine du dépôt>
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const I = 'a2-05-travail/arbitrage-F/inscription-arbitrage-F/', PROP = I + 'proposition/', RF = 'docs/rapports/etape2-A2-05-volet1-lot3-F.md';
const ZIP = 'chatgpt-relecture-A2-05-volet1-lot3-F-audit.zip', ZIP_SHA = 'ad2b1fb8e8d46d8d105b830348b43d07651cca17bed1c5c21262bea623f42095';
const sha = (b) => createHash('sha256').update(b).digest('hex');
const trace = []; let ko = 0; const ok = (b, l, d) => { const m = (b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : ''); console.log(m); trace.push(m); if (!b) ko++; };
const dire = (l) => { console.log(l); trace.push(l); };
const M = JSON.parse(readFileSync(join(root, PROP + 'manifeste.json'), 'utf8'))[RF];
const dep = readFileSync(join(root, RF)), pro = readFileSync(join(root, PROP + RF));
const fins = (b) => { const t = b.toString('latin1'); return { crlf: (t.match(/\r\n/g) ?? []).length, lf: (t.match(/\n/g) ?? []).length, cr: (t.match(/\r/g) ?? []).length }; };

dire('--- 1. Octets et empreintes');
const fd = fins(dep), fp = fins(pro);
ok(sha(dep) === M.depart, 'rapport livré (départ) : empreinte = manifeste', sha(dep));
ok(fd.crlf === 297 && fd.lf === 297 && fd.cr === 297, 'rapport livré : 297 lignes, toutes en CRLF, aucun CR isolé', JSON.stringify(fd));
ok(sha(pro) === M.propose, 'version proposée : empreinte = manifeste', sha(pro));
ok(fp.cr === 0 && fp.lf === 317, 'version proposée : 317 lignes, toutes en LF, aucun CR', JSON.stringify(fp));
ok(!pro.toString('utf8').includes('﻿') && !dep.toString('utf8').includes('﻿'), 'aucune marque d\'ordre des octets, ni avant ni après');

dire('--- 2. Comparaison ligne à ligne, fins de ligne retirées');
const A = dep.toString('utf8').split('\r\n'), B = pro.toString('utf8').split('\n');
const i0 = B.indexOf('## 0. Arbitrage'), i1 = B.indexOf('## 1. Résultat proposé');
ok(i0 > 0 && i1 - i0 === 20, '§0 : un bloc contigu de 20 lignes, inséré juste avant « ## 1. Résultat proposé »', 'lignes ' + (i0 + 1) + ' à ' + i1);
const Bsans = [...B.slice(0, i0), ...B.slice(i1)];
ok(Bsans.length === A.length, 'hors §0 : même nombre de lignes', Bsans.length + ' et ' + A.length);
const diff = A.map((l, k) => (l === Bsans[k] ? null : k)).filter((k) => k !== null);
ok(diff.length === 1 && /^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/.test(A[diff[0]]) && /^\*\*Statut\*\* : \*\*arbitré le 2026-11-03\*\* \(§0\)\./.test(Bsans[diff[0]]), 'une seule ligne différente hors §0 : la ligne de statut', 'ligne ' + (diff[0] + 1));
dire('    avant : ' + A[diff[0]]); dire('    après : ' + Bsans[diff[0]]);
ok(A.slice(0, 297).filter((l, k) => k !== diff[0] && l === Bsans[k]).length === 296, 'les 296 autres lignes du rapport livré sont identiques au caractère près, fins de ligne retirées');
const ids = (L) => L.filter((l) => /^#### `v_\d+_s\d+` /.test(l));
ok(JSON.stringify(ids(A)) === JSON.stringify(ids(B)) && ids(B).length === 17, '17 fiches d\'examen : titres et verdicts identiques', ids(B).length + ' titres');
const tab = (L) => L.filter((l) => /^\| \d+ \| 3[67]\d \| `v_/.test(l));
ok(JSON.stringify(tab(A)) === JSON.stringify(tab(B)) && tab(B).length === 17, '§1 : les 17 lignes du tableau des verdicts identiques', tab(B).length + ' lignes');

dire('--- 3. Le texte livré est celui de l\'archive déjà transmise');
if (!existsSync(join(root, ZIP))) ok(false, 'archive ' + ZIP + ' présente à la racine');
else {
  ok(sha(readFileSync(join(root, ZIP))) === ZIP_SHA, 'archive transmise : empreinte', ZIP_SHA);
  const u = spawnSync('unzip', ['-p', join(root, ZIP), '05-relais.md'], { encoding: 'utf8', maxBuffer: 1 << 28 }); ok(u.status === 0, 'lecture de 05-relais.md dans l\'archive', 'code ' + u.status);
  const t = (u.stdout ?? '').replace(/\r\n/g, '\n'); const deb = t.indexOf('# Partie 2 · Rapport d\'audit F, en entier'), fin = t.indexOf('\n# Partie 3 · Les 15 fiches sources, exactes');
  const bloc = t.slice(deb, fin).split('\n'); const shaCite = ((bloc[2] ?? '').match(/SHA-256 `([0-9a-f]{64})`/) ?? [])[1];
  ok(deb > 0 && fin > deb && shaCite === M.depart, 'l\'archive cite, pour le rapport F, l\'empreinte du rapport livré', shaCite);
  const texte = bloc.slice(4).join('\n').replace(/\n+$/, '');
  ok(texte === dep.toString('utf8').replace(/\r\n/g, '\n').trimEnd(), 'texte du rapport F dans l\'archive = rapport livré, fins de ligne retirées, caractère pour caractère', texte.length + ' caractères');
}

dire('--- 4. Comparaison stricte (sans normalisation des fins de ligne)');
const seulCR = A.slice(0, 297).filter((l, k) => k !== diff[0] && (l + '\r') !== Bsans[k] && l === Bsans[k]).length;
ok(seulCR === 296, 'lignes qui ne diffèrent que par le CR final : 296 ; la 297e est la ligne de statut', String(seulCR));
dire('    l\'outil de diff de la proposition (`diffBrut`, `core.autocrlf=true`) ne montre pas ce changement : il est établi ici et par l\'empreinte de la version proposée.');

dire('--- 5. Aucun contenu lexical ni normatif modifié');
const g = spawnSync('git', ['-c', 'core.quotepath=false', 'status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception'], { cwd: root, encoding: 'utf8' }).stdout.split('\n').filter((l) => l.trim() && !/docs\/conception\/(00-sommaire|addendum-A10-interrogatif)\.md$/.test(l));
ok(!g.length, 'données, lots, journal, tests, outils et normes sans modification (hors sommaire et A10, installation antérieure)', g.join(', ') || 'aucune');
ok(!Object.keys(JSON.parse(readFileSync(join(root, PROP + 'manifeste.json'), 'utf8'))).some((p) => /^(data|reconstruction|tools|tests|docs\/conception)\//.test(p)), 'aucun des cinq fichiers proposés n\'est une donnée, un lot, un journal, un outil, un test ou une norme');

const out = trace.join('\n') + '\n' + (ko ? ko + ' écart(s)' : 'vérification conforme') + '\n';
mkdirSync(join(root, I + 'verification'), { recursive: true }); writeFileSync(join(root, I + 'verification/sortie-fins-de-ligne.txt'), out);
console.log(ko ? ko + ' écart(s)' : 'vérification conforme'); process.exit(ko ? 1 : 0);
