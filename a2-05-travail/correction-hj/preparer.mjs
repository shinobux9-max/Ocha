// A2-05 : correction technique proposée du rapprochement des identifiants hors JLPT (proposition, NON appliquée).
// Usage : node a2-05-travail/correction-hj/preparer.mjs <racine du dépôt>
// Lit perimetre-v2.mjs et lot3-commun-v2.mjs SANS les modifier ; écrit leurs versions proposées dans correction-hj/proposition/
// et les différences exactes dans correction-hj/diffs/. Remplacements ciblés, chacun à occurrence unique ; aucune logique linguistique
// n'est touchée : seule change la liste des identifiants sous lesquels une ENTRY est cherchée dans les bilans.
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const W = join(root, 'a2-05-travail'), OUT = join(W, 'correction-hj');
const rep = (t, a, b, nom) => { const n = t.split(a).length - 1; if (n !== 1) throw new Error(nom + ' : ' + n + ' occurrence(s) de « ' + a.slice(0, 60) + ' »'); return t.replace(a, () => b); };

// 1. Module commun v2 : une fonction exportée, et son emploi pour les corrections et la provenance
let c = readFileSync(join(W, 'lot3-commun-v2.mjs'), 'utf8');
c = rep(c, "/** Correspondance canonique : identifiant publié → identifiant source, par la table de l'assemblage (entrées validées, non retirées). */",
  "/** Identifiants sous lesquels une ENTRY est citée dans les bilans : l'identifiant publié et, pour une ENTRY hors JLPT, son identifiant source\n" +
  " *  canonique (`v_718` → `hj_v_1`, `v_719` → `hj_v_2`). Pour une ENTRY N5, l'identifiant source est « n5_ » + l'identifiant publié : les deux\n" +
  " *  coïncident une fois le préfixe retiré, et la liste n'a qu'un élément (aucun doublon). */\n" +
  "export const identifiantsCites = (eid, sid) => [...new Set([eid, String(sid ?? '').replace(/^n5_/, '')].filter(Boolean))];\n\n" +
  "/** Correspondance canonique : identifiant publié → identifiant source, par la table de l'assemblage (entrées validées, non retirées). */", 'commun (fonction)');
c = rep(c, "  const tient = (l, eid) => l.includes('`' + eid + '`') || l.includes('`' + eid + '_');\n",
  "  const tient = (l, eid) => l.includes('`' + eid + '`') || l.includes('`' + eid + '_');\n  const tientE = (l, eid, sid) => identifiantsCites(eid, sid).some((x) => tient(l, x)); // identifiant publié et, hors JLPT, identifiant source\n", 'commun (tientE)');
c = rep(c, "/^\\| (V[12]-\\d+|\\d+) \\|/.test(l) && tient(l, eid))", "/^\\| (V[12]-\\d+|\\d+) \\|/.test(l) && tientE(l, eid, sid))", 'commun (corrections)');
c = rep(c, "/^\\| \\d+ \\|/.test(l) && tient(l, eid))", "/^\\| \\d+ \\|/.test(l) && tientE(l, eid, sid))", 'commun (provenance)');

// 2. Générateur de périmètres v2 : même fonction, pour la liste des corrections retenues
let p = readFileSync(join(W, 'perimetre-v2.mjs'), 'utf8');
p = rep(p, "import { correspondance, cat, LF } from './lot3-commun-v2.mjs';", "import { correspondance, cat, LF, identifiantsCites } from './lot3-commun-v2.mjs';", 'générateur (import)');
p = rep(p, "const correctionsDe = (eid) => bilanCorr.split(LF).filter((l) => /^\\| V[12]-\\d+ \\|/.test(l) && tient(l, eid))",
  "const correctionsDe = (eid, sid) => bilanCorr.split(LF).filter((l) => /^\\| V[12]-\\d+ \\|/.test(l) && identifiantsCites(eid, sid).some((x) => tient(l, x)))", 'générateur (correctionsDe)');
p = rep(p, "entrees.flatMap((f) => correctionsDe(f.e.id))", "entrees.flatMap((f) => correctionsDe(f.e.id, f.sid))", 'générateur (appel)');

mkdirSync(join(OUT, 'proposition'), { recursive: true }); mkdirSync(join(OUT, 'diffs'), { recursive: true });
for (const [nom, texte] of [['lot3-commun-v2.mjs', c], ['perimetre-v2.mjs', p]]) {
  writeFileSync(join(OUT, 'proposition', nom), texte);
  const d = mkdtempSync(join(tmpdir(), 'hj-')); writeFileSync(join(d, 'a'), readFileSync(join(W, nom), 'utf8')); writeFileSync(join(d, 'b'), texte);
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U2', 'a', 'b'], { cwd: d, encoding: 'utf8' });
  if (r.status !== 1) throw new Error(nom + ' : git diff code ' + r.status);
  writeFileSync(join(OUT, 'diffs', nom + '.diff'), r.stdout.replace(/^diff --git a\/a b\/b\n(?:index [^\n]*\n)?--- a\/a\n\+\+\+ b\/b\n/, '--- a/a2-05-travail/' + nom + '\n+++ b/a2-05-travail/' + nom + '\n'));
  console.log(nom + ' : version proposée et différence écrites');
}
