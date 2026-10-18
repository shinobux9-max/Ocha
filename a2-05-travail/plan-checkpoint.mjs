// A2-05 : plan de checkpoint documentaire (en proposition). Lecture seule : n'indexe, ne committe et ne pousse rien.
// Établit, à partir de git, la liste exacte des fichiers proposés, les exclusions, les différences et les contrôles préalables.
// Usage : node plan-checkpoint.mjs <racine du dépôt>   (écrit docs/rapports/etape2-A2-05-plan-checkpoint.md et a2-05-travail/checkpoint-chemins-*.txt)
import { writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const LF = String.fromCharCode(10);
const git = (...a) => { const r = spawnSync('git', a, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); if (r.status !== 0) throw new Error('git ' + a.join(' ') + ' : code ' + r.status + ' ' + r.stderr); return r.stdout; };
const taille = (p) => statSync(join(root, p)).size;
const ko = (n) => (n / 1024).toFixed(1).replace('.', ',') + ' Ko';
const tete = git('rev-parse', 'HEAD').trim(); const distant = git('rev-parse', 'origin/ocha-v2').trim(); const branche = git('branch', '--show-current').trim();
const index = git('diff', '--cached', '--name-only').trim();
const modifies = git('diff', '--name-only').split(LF).filter(Boolean);
const numstat = git('diff', '--numstat').split(LF).filter(Boolean).map((l) => l.split('\t'));
const nonSuivis = git('ls-files', '--others', '--exclude-standard').split(LF).filter(Boolean);
// Garde-fous : aucun changement dans les données, la reconstruction, les outils, les tests, l'application
const SENSIBLES = /^(data|reconstruction|tools|tests|src|js|css|public)\//;
const sensibles = [...modifies, ...nonSuivis].filter((p) => SENSIBLES.test(p));
const docs = nonSuivis.filter((p) => p.startsWith('docs/'));
const travail = nonSuivis.filter((p) => p.startsWith('a2-05-travail/'));
const notes = travail.filter((p) => /\/note-export-/.test(p));
const travailUtile = travail.filter((p) => !notes.includes(p));
const exclus = nonSuivis.filter((p) => !p.startsWith('docs/') && !p.startsWith('a2-05-travail/'));
const optionA = [...modifies, ...docs].sort(); const optionB = [...optionA, ...travailUtile].sort();
const somme = (l) => l.reduce((n, p) => n + taille(p), 0);
writeFileSync(join(root, 'a2-05-travail/checkpoint-chemins-option-A.txt'), optionA.join(LF) + LF);
writeFileSync(join(root, 'a2-05-travail/checkpoint-chemins-option-B.txt'), optionB.join(LF) + LF);
const groupe = (l) => { const g = new Map(); for (const p of l) { const k = p.split('/').slice(0, 2).join('/') + (p.split('/').length > 2 ? '/' : ''); if (!g.has(k)) g.set(k, []); g.get(k).push(p); } return [...g].map(([k, v]) => '| `' + k + '` | ' + v.length + ' | ' + ko(somme(v)) + ' |'); };

const P = ['# Étape 2 · A2-05 — plan de checkpoint documentaire (proposition)', '', '**Date** : 2026-10-18',
  "**Statut** : **plan, sans exécution.** Écrit par `a2-05-travail/plan-checkpoint.mjs`, en lecture seule sur git : **rien n'est indexé, committé ni poussé.** La validation du plan, l'autorisation de commit et l'autorisation de push sont trois accords distincts, à donner séparément, après relecture. Modèle : le checkpoint du 2026-10-12 (`3756fe3`), documentaire, indexé par chemins explicites.", '',
  '## 1. État de git au moment du plan', '', '| Élément | Valeur |', '|---|---|', '| Branche | `' + branche + '` |', '| HEAD | `' + tete + '` |', '| `origin/ocha-v2` | `' + distant + '` (' + (tete === distant ? 'identique à HEAD' : '**différent de HEAD**') + ') |', '| Index | ' + (index ? '**non vide** : ' + index : 'vide') + ' |', '| Fichiers suivis modifiés | ' + modifies.length + ' |', '| Fichiers non suivis (hors `chatgpt-relecture/`) | ' + nonSuivis.length + ' |', '| Changements dans `data/`, `reconstruction/`, `tools/`, `tests/` ou l\'application | ' + (sensibles.length ? '**' + sensibles.join(', ') + '**' : 'aucun') + ' |', '',
  "**`.gitignore`** ne couvre ni `a2-05-travail/`, ni `chatgpt-relecture/`, ni les archives : l'indexation doit se faire **par chemins explicites**, jamais par `git add .` ni `git add -A`.", '',
  '## 2. Fichiers suivis modifiés (inclus dans les deux options)', '', '| Fichier | Lignes ajoutées | Lignes retirées |', '|---|---|---|', ...numstat.map(([a, d, p]) => '| `' + p + '` | ' + a + ' | ' + d + ' |'), '',
  '## 3. Fichiers non suivis, par groupe', '', '| Groupe | Fichiers | Taille |', '|---|---|---|', ...groupe(nonSuivis), '',
  '## 4. Deux options d\'inclusion', '',
  '| Option | Contenu | Fichiers | Taille | Liste exacte |', '|---|---|---|---|---|',
  '| **A** (comme le 2026-10-12) | les ' + modifies.length + ' fichiers suivis modifiés et les ' + docs.length + ' rapports et documents nouveaux sous `docs/` | ' + optionA.length + ' | ' + ko(somme(optionA)) + ' | `a2-05-travail/checkpoint-chemins-option-A.txt` |',
  '| **B** (recommandée) | l\'option A, plus les ' + travailUtile.length + ' fichiers de travail utiles à la traçabilité (scripts qui ont écrit les rapports, registres, inventaire des scripts, manifeste), sans les notes d\'export | ' + optionB.length + ' | ' + ko(somme(optionB)) + ' | `a2-05-travail/checkpoint-chemins-option-B.txt` |', '',
  "**Pourquoi B** : chaque rapport arbitré nomme le script qui l'a écrit ; sans ces scripts dans git, un rapport n'est plus reproductible depuis le dépôt. Les notes d'export (" + notes.length + ' fichiers, ' + ko(somme(notes)) + ') sont des copies assemblées de documents déjà inclus : elles restent hors du commit.', '',
  '## 5. Exclusions', '', '| Exclu | Fichiers | Taille | Motif |', '|---|---|---|---|',
  '| `chatgpt-relecture/` | — | — | dossier d\'export, jamais committé sans accord |',
  '| archives `chatgpt-relecture-*.zip` à la racine et autres fichiers hors `docs/` et `a2-05-travail/` | ' + exclus.length + ' | ' + ko(somme(exclus)) + ' | artefacts de transfert |',
  '| `a2-05-travail/note-export-*` | ' + notes.length + ' | ' + ko(somme(notes)) + ' | copies assemblées pour la relecture (option B) ; tout `a2-05-travail/` est exclu en option A |', '',
  '## 6. Contrôles préalables, à relancer juste avant un commit autorisé', '', '1. `git status --short`, index vide, HEAD = `origin/ocha-v2`.', '2. Aucun changement dans `data/`, `reconstruction/`, `tools/`, `tests/` ni dans l\'application.', '3. `node tools/reconstruction/run.mjs verify` puis `assemble` : sources conformes ; 684 ENTRY, 35 retraits, 0 entrée écartée.', '4. `node --test "tests/**/*.test.js"` : 510 tests verts.', '5. `node tools/validate-data.mjs` : 0 erreur, 149 avertissements.', '6. `git diff --check` propre.', '7. `node a2-05-travail/empreintes-lot3.mjs .` et `node a2-05-travail/couverture-lot3.mjs .` : codes 0.', '8. Recalcul de la liste globale : 185 corrections, 165 ENTRY.', '9. Indexation par la liste exacte de l\'option retenue, puis `git diff --cached --stat` comparé à cette liste, fichier par fichier, avant le commit.', '',
  '## 7. Commit proposé (non exécuté)', '', '- **Message, sur une ligne** : `Docs: checkpoint A2-05, lot 3 jusqu\'a B9 arbitree, etude de methode et outillage v2 en proposition, aucune correction appliquee` (sans accents, comme les commits précédents).', '- **Indexation** : `git add --pathspec-from-file=a2-05-travail/checkpoint-chemins-option-<A|B>.txt`, puis contrôle du point 9.', '- **Push** : séparé, sur autorisation distincte.', ''];
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-plan-checkpoint.md'), P.join(LF) + LF);
console.log('plan : HEAD ' + tete.slice(0, 7) + ' ; index ' + (index ? 'NON VIDE' : 'vide') + ' ; sensibles : ' + (sensibles.length || 'aucun') + ' ; option A ' + optionA.length + ' fichiers (' + ko(somme(optionA)) + ') ; option B ' + optionB.length + ' fichiers (' + ko(somme(optionB)) + ') ; exclus ' + exclus.length + ' et ' + notes.length + ' notes');
