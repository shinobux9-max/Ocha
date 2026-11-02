// A2-05 · préalable E5 : préparation de la révision 4 de la proposition d'addendum, EN PROPOSITION : la proposition en service, révision 3, n'est pas remplacée.
// Trois modifications ciblées, arbitrées le 2026-11-01 : justification d'une attribution existante ; portée sur A9, §6 ; en-tête de version. La définition, les frontières, les
// rapports avec les autres couches, le cumul et la méthode de recherche des omissions sont vérifiés identiques, octet pour octet. Aucun filtre de recherche n'est exécuté.
// Usage : node a2-05-travail/arbitrage-F/revision-4-E5/preparer-revision-4.mjs <racine du dépôt>
// Écrit, seulement sans écart, dans arbitrage-F/revision-4-E5/ : la version proposée, son diff et le relevé d'unicité. Dépôt réel inchangé.
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const P = 'docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md', OUT = 'a2-05-travail/arbitrage-F/revision-4-E5/', V = OUT + 'proposition-addendum-revision-4.md';
const sha = (b) => createHash('sha256').update(b).digest('hex');
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
if (existsSync(join(root, V))) { console.log('ARRÊT : ' + V + ' existe déjà'); process.exit(1); }
const t0 = readFileSync(join(root, P), 'utf8'); const sha0 = sha(Buffer.from(t0, 'utf8'));
ok(!t0.includes('\r\n'), 'P1 proposition en LF');
ok(!spawnSync('git', ['status', '--porcelain', '--', P], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'P2 proposition identique à HEAD : révision 3', sha0.slice(0, 12) + '…');
ok(/^\*\*Version\*\* : \*\*révision 2, du 2026-10-12\*\*/m.test(t0) && /^\*\*Révision 3, du 2026-10-12\*\*/m.test(t0) && !t0.includes('révision 4'), 'P3 révisions 2 et 3 présentes, révision 4 absente');

// Contrôle d'unicité du numéro pressenti : recherche de A10 à A19 ; aucun filtre sur le vocabulaire
const fichiers = (d) => (existsSync(join(root, d)) ? readdirSync(join(root, d)).flatMap((e) => { const p = d + '/' + e; return statSync(join(root, p)).isDirectory() ? fichiers(p) : /\.(md|mjs|js|json)$/.test(e) ? [p] : []; }) : []);
const cibles = ['CLAUDE.md', 'ROADMAP.md', 'ETAT-ACTUEL.md', 'REGLES-CONSTRUCTION.md', ...fichiers('docs'), ...fichiers('tools'), ...fichiers('tests')];
const hits = cibles.flatMap((p) => readFileSync(join(root, p), 'utf8').split(/\r?\n/).flatMap((l, k) => (/\bA1[0-9]\b/.test(l) ? [{ p, n: k + 1, l }] : [])));
const hors = hits.filter((h) => !/^docs\/rapports\/etape2-A2-05-(prealable-E5|bloc-F-analyse|volet1-lot3-F-perimetre)/.test(h.p));
const fichierA = readdirSync(join(root, 'docs/conception')).filter((f) => /^addendum-A/.test(f));
ok(fichierA.length === 9 && !fichierA.some((f) => /A1[0-9]/.test(f)), 'U1 `docs/conception/` : A1 à A9, aucun A10', fichierA.length + ' addenda');
ok(!hits.some((h) => /^(tools|tests)\//.test(h.p) || h.p.startsWith('docs/conception/')), 'U2 aucun emploi dans `tools/`, `tests/`, `docs/conception/`');
const autres = hits.filter((h) => /\bA1[1-9]\b/.test(h.l));
const projets = hors.filter((h) => /A10/.test(h.l)).map((h) => '`' + h.p + '`, ligne ' + h.n + ' : ' + (/など|classe|particule|lot 25/.test(h.l) || /lot25/.test(h.p) ? 'projet sur la classe de など, abandonné (« aucun addendum A10 »)' : /pressenti|numéro A10 seulement/.test(h.l) ? 'numéro pressenti pour E5' : 'autre : ' + h.l.slice(0, 90)));
dire('relevé A10 hors dossiers E5 :\n   ' + projets.join('\n   '));
ok(!projets.some((x) => x.includes('autre : ')), 'U3 hors dossiers E5, chaque mention est soit E5 (pressenti), soit le projet abandonné sur など', projets.length + ' mentions');
ok(!autres.length, 'U4 aucun autre numéro A11 à A19 employé', autres.map((h) => h.p + ':' + h.n).join(', ') || 'aucun');

// Sections qui ne doivent pas changer
const section = (t, a, b) => { const i = t.indexOf(a), j = t.indexOf(b, i + 1); if (i < 0 || j < 0) throw new Error('section introuvable : ' + a); return t.slice(i, j); };
const GARDEES = [['### 2. Définition', '### 3. Principes'], ['### 4. Frontières', '### 7. Application'], ['### 8. Recherche des omissions', '### Décisions de cet addendum']];
const REMPL = [
  ['**Version** : **révision 2, du 2026-10-12**, après', "**Version courante : révision 4, du 2026-11-01**, après la relecture de la révision 3 (ChatGPT, par délégation ; relayée par l'utilisateur) : « Conserver la définition de référence proposée » ; trois modifications ciblées, et elles seules : la justification d'une attribution existante (§3, point 4 ; §7), la portée sur A9, §6 (§7), et cet en-tête. **La définition, les frontières et la méthode de recherche des omissions ne changent pas.** **Le texte n'est ni adopté, ni normatif, ni déplacé dans `docs/conception/`.** Les révisions 2 et 3 sont conservées ci-dessous, à titre d'historique.\n\n**Historique, révision 2, du 2026-10-12**, après"],
  ['**Révision 3, du 2026-10-12**, après', '**Historique, révision 3, du 2026-10-12**, après'],
  ['4. **Chaque attribution est justifiée** par la décision qui la pose, et cette décision cite le présent addendum au lieu de poser elle-même une définition.', "4. **Chaque attribution nouvelle, chaque retrait et chaque modification sont justifiés par leur propre décision explicite**, et cette décision cite le présent addendum au lieu de poser elle-même une définition. **Une attribution existante et inchangée peut être justifiée par un verdict individuel arbitré, traçable dans le rapport d'audit** : elle n'exige alors pas de décision nouvelle."],
  ["aucun n'est tenu pour conforme ou fautif du seul fait de cet addendum |", "aucun n'est tenu pour conforme ou fautif du seul fait de cet addendum ; une attribution maintenue et inchangée est justifiée par son verdict individuel arbitré, traçable dans le rapport d'audit (§3, point 4) |"],
  ['| A7, A9 | **inchangés** |', "| A7, A9 | **inchangés** ; A9, §6, décrira l'état antérieur à l'adoption éventuelle de cet addendum, sans que le texte d'A9 soit modifié |"],
  ['| Recherche des omissions | recherche textuelle large,', "| Justification | décision explicite pour une attribution nouvelle, un retrait ou une modification ; verdict individuel arbitré, traçable dans le rapport d'audit, pour une attribution existante et inchangée |\n| A9, §6 | décrira l'état antérieur à l'adoption éventuelle, A9 restant inchangé |\n| Recherche des omissions | recherche textuelle large,"],
  ['## 4. Ce que cette proposition ne fait pas', "**Après la relecture de la révision 3 (2026-11-01)** : trois modifications ciblées, listées dans l'en-tête ; aucune autre. La relecture a précisé qu'« A10 reste seulement un numéro pressenti », et demandé de vérifier son unicité, « notamment par rapport aux autres projets d'addendum mentionnés dans les documents ».\n\n**Contrôle d'unicité du numéro A10, refait le 2026-11-01, à refaire avant toute adoption** : `docs/conception/` contient A1 à A9 et aucun fichier A10 ; `tools/`, `tests/` et `docs/conception/` n'emploient pas ce numéro ; aucun numéro A11 à A19 n'est employé. **Un seul autre projet porte ce numéro** : l'addendum envisagé pour une classe « particule », à propos de など, abandonné le 2026-10-07 (« aucune classe, aucun addendum A10 »). Les autres addenda évoqués dans les documents ne portent aucun numéro : ainsi une sous-catégorie de dimension, que le §5 de T9 dit relever d'un addendum, sans le proposer. **Le numéro reste libre, et seulement pressenti.**\n\n## 4. Ce que cette proposition ne fait pas"],
];
let t = t0; for (const [a, z] of REMPL) { ok(t.split(a).length === 2, 'R ancre unique : ' + a.slice(0, 48)); t = t.replace(a, () => z); }
for (const [a, b] of GARDEES) ok(section(t0, a, b) === section(t, a, b), 'G section inchangée, octet pour octet : ' + a + ' à ' + b, sha(section(t, a, b)).slice(0, 12) + '…');
const def = '> **`interrogatif`** — fonction grammaticale d\'un SENSE dont le rôle est de **demander une information non spécifiée**'; ok(t.includes(def), 'G définition de référence conservée');
ok(/^\*\*Statut\*\* : \*\*PROPOSITION, non validée, non normative\.\*\*/m.test(t), 'G statut : proposition, non normative');
ok(/révision 4, du 2026-11-01/.test(t) && /Historique, révision 2/.test(t) && /Historique, révision 3/.test(t) && t.includes('Elle est fournie pour une relecture normative distincte'), 'H version courante identifiée ; historique des révisions 2 et 3 conservé');
const L0 = t0.split('\n'), L1 = t.split('\n'); const perdues = L0.filter((l) => !L1.includes(l));
dire('lignes de la révision 3 remplacées : ' + perdues.length);
ok(perdues.length === 5, 'H cinq lignes remplacées (deux d\'en-tête, §3 point 4, deux lignes du §7), aucune autre ; le reste est ajouté', String(perdues.length));
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'index vide');
if (!ko) {
  writeFileSync(join(root, V), t);
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '--', P, V], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  writeFileSync(join(root, OUT + 'proposition-addendum.diff'), r.stdout);
  const n = (c) => r.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length;
  dire('départ ' + sha0 + ' ; proposé ' + sha(Buffer.from(t, 'utf8')) + ' ; diff ' + sha(r.stdout) + ' ; +' + n('+') + ' / −' + n('-'));
}
ok(sha(readFileSync(join(root, P))) === sha0, 'proposition en service inchangée');
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation de la révision 4 conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
