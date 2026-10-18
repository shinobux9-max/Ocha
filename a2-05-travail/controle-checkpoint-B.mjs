// A2-05 : contrôle préalable du checkpoint, option B (n'écrit que ses deux artefacts documentaires, ci-dessous ; ne modifie aucun autre fichier ; n'indexe, ne committe et ne pousse rien).
// Usage : node controle-checkpoint-B.mjs <racine>   (écrit docs/rapports/etape2-A2-05-checkpoint-B-controle.md et a2-05-travail/checkpoint-chemins-ajouts.txt)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { couverture } from './couverture-lot3.mjs';
import { verifierEmpreintes } from './empreintes-lot3.mjs';
const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const LF = '\n'; const res = []; let echecs = 0;
const run = (cmd, args) => { const r = spawnSync(cmd, args, { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }); return { code: r.status, out: (r.stdout ?? '') + (r.stderr ?? '') }; };
// Sortie standard seule : les avertissements de git (fins de ligne) passent par stderr et ne doivent pas se mêler aux chemins
const git = (...a) => { const r = spawnSync('git', a, { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }); if (r.status !== 0) throw new Error('git ' + a.join(' ') + ' : code ' + r.status); return r.stdout; };
const ctl = (nom, ok, detail) => { res.push('| ' + nom + ' | ' + (ok ? 'conforme' : '**NON CONFORME**') + ' | ' + detail + ' |'); if (!ok) echecs++; };
const B = readFileSync(join(root, 'a2-05-travail/checkpoint-chemins-option-B.txt'), 'utf8').split(/\r?\n/).filter(Boolean);
const modifies = git('diff', '--name-only').split(LF).filter(Boolean);
const nonSuivis = git('ls-files', '--others', '--exclude-standard').split(LF).filter(Boolean);
const candidats = [...modifies, ...nonSuivis.filter((p) => p.startsWith('docs/') || (p.startsWith('a2-05-travail/') && !/\/note-export-/.test(p)))];
const ajouts = candidats.filter((p) => !B.includes(p)).sort(); const absents = B.filter((p) => !candidats.includes(p));
writeFileSync(join(root, 'a2-05-travail/checkpoint-chemins-ajouts.txt'), ajouts.join(LF) + (ajouts.length ? LF : ''));
const tete = git('rev-parse', 'HEAD').trim(); const local = git('rev-parse', 'origin/ocha-v2').trim();
const distant = run('git', ['ls-remote', 'origin', 'refs/heads/ocha-v2']);
const distantSha = distant.code === 0 ? distant.out.split(/\s/)[0] : null;
ctl('Index vide', !git('diff', '--cached', '--name-only').trim(), 'aucun fichier indexé');
ctl('HEAD = origin/ocha-v2 (référence locale)', tete === local, tete);
ctl('Dépôt distant réel (`git ls-remote`)', distantSha === tete, distant.code === 0 ? 'origin refs/heads/ocha-v2 = ' + distantSha : 'non joignable (code ' + distant.code + ')');
const SENS = /^(data|reconstruction|tools|tests|src|js|css|public|docs\/conception)\//;
ctl('Aucun changement dans les données, l\'application, les normes ou les tests', ![...modifies, ...nonSuivis].some((p) => SENS.test(p)), 'chemins sensibles modifiés ou nouveaux : ' + ([...modifies, ...nonSuivis].filter((p) => SENS.test(p)).join(', ') || 'aucun'));
ctl('Aucun export ZIP, note d\'export ni `chatgpt-relecture/` dans la sélection', ![...B, ...ajouts].some((p) => /\.zip$|note-export-|^chatgpt-relecture\//.test(p)), B.length + ' chemins de l\'option B, ' + ajouts.length + ' ajouts');
ctl('Chaque chemin de l\'option B existe et est modifié ou non suivi', !absents.length && B.every((p) => existsSync(join(root, p))), absents.length ? 'absents : ' + absents.join(', ') : B.length + ' chemins vérifiés');
ctl('Aucun chemin de l\'option B ignoré par git', !run('git', ['check-ignore', ...B]).out.trim(), 'git check-ignore : aucun');
const e = verifierEmpreintes(root); ctl('Empreintes des rapports arbitrés', true, e.controles + ' rapports identiques');
const c = couverture(root); ctl('Couverture des 377', c.totaux.arbitres === 148 && c.totaux.restants === 229, c.totaux.arbitres + ' arbitrés, ' + c.totaux.restants + ' restants ; bloc B ' + c.totaux.blocBArbitres + '/' + c.totaux.blocB);
const b = readFileSync(join(root, 'docs/rapports/etape2-A2-05-bilan-volet2.md'), 'utf8').replace(/\r\n/g, LF); const m = new Map(); for (const l of b.slice(b.search(/^## 8\. /m)).split(LF)) { const r = l.match(/^\| (V[12]-\d+) \| (?:[a-z]+ \| )?`((?:hj_)?v_\d+)(?:_s\d+)?`/); if (r && !m.has(r[1])) m.set(r[1], r[2]); } const v2m = []; for (const l of b.slice(0, b.search(/^## 7\. /m)).split(LF)) { const r = l.match(/^\| (\d+) \| `((?:hj_)?v_\d+)_s\d+` \|/); if (r) v2m.push(r[2]); }
const tot = m.size + v2m.length, ent = new Set([...m.values(), ...v2m]).size; ctl('Corrections retenues, non appliquées', tot === 185 && ent === 165 && !modifies.some((p) => p.startsWith('data/')), tot + ' corrections, ' + ent + ' ENTRY ; `data/` inchangé');
const v = run('node', ['tools/reconstruction/run.mjs', 'verify']); ctl('Sources (`run.mjs verify`)', v.code === 0, v.out.trim().split(LF).at(-1) + ' (code ' + v.code + ')');
const a = run('node', ['tools/reconstruction/run.mjs', 'assemble']); ctl('Assemblage (`run.mjs assemble`)', a.code === 0 && /684 ENTRY, 35 identifiant\(s\) retiré\(s\), 0 entrée/.test(a.out), a.out.split(LF)[0] + ' (code ' + a.code + ')');
const t = run('node', ['--test', 'tests/**/*.test.js']); const tm = t.out.match(/(?:#|ℹ) pass (\d+)[\s\S]*?(?:#|ℹ) fail (\d+)/); ctl('Tests', t.code === 0 && tm && tm[2] === '0', (tm ? tm[1] + ' réussis, ' + tm[2] + ' en échec' : 'lecture impossible') + ' (code ' + t.code + ')');
const vd = run('node', ['tools/validate-data.mjs']); ctl('Validation des données', vd.code === 0 && /0 erreur/.test(vd.out), vd.out.trim().split(LF).at(-1) + ' (code ' + vd.code + ')');
const dc = run('git', ['diff', '--check']); ctl('`git diff --check`', dc.code === 0, dc.code === 0 ? 'propre' : 'code ' + dc.code);
const P = ['# Étape 2 · A2-05 — contrôle préalable du checkpoint, option B', '', '**Date** : 2026-10-18', "**Statut** : **contrôle, sans exécution.** Écrit par `a2-05-travail/controle-checkpoint-B.mjs`, qui n'écrit que deux artefacts documentaires (ce rapport et `a2-05-travail/checkpoint-chemins-ajouts.txt`) et ne modifie aucun autre fichier : **rien n'est indexé, committé ni poussé.** L'option B (173 chemins) a été retenue par l'arbitrage du 2026-10-18 ; les autorisations de commit et de push restent à donner séparément.", '',
  '**Résultat** : ' + (echecs ? '**' + echecs + ' contrôle(s) non conforme(s).**' : '**tous les contrôles sont conformes.**'), '', '| Contrôle | Résultat | Détail |', '|---|---|---|', ...res, '',
  '## Liste exacte des chemins', '', '- **Option B retenue** : `a2-05-travail/checkpoint-chemins-option-B.txt`, **' + B.length + ' chemins**, gelée à l\'arbitrage.', '- **Ajouts nés après le gel** (cycle de préparation du checkpoint), **à approuver séparément** : `a2-05-travail/checkpoint-chemins-ajouts.txt`, ' + ajouts.length + ' chemin(s) : ' + (ajouts.map((p) => '`' + p + '`').join(', ') || 'aucun') + '.', '- Les fichiers suivis modifiés de l\'option B le restent ; leur contenu au moment du commit sera celui de l\'arbre de travail, montré par `git diff --cached --stat` avant le commit.', '',
  '## Séquence proposée, après autorisation (non exécutée)', '', '1. Relancer ce contrôle : tout conforme.', '2. `git add --pathspec-from-file=a2-05-travail/checkpoint-chemins-option-B.txt`, et, si l\'ajout est approuvé, `--pathspec-from-file=a2-05-travail/checkpoint-chemins-ajouts.txt`.', '3. `git diff --cached --name-only` comparé à la liste, chemin par chemin ; `git diff --cached --stat` montré.', '4. Commit sur une ligne, après l\'autorisation de commit : `Docs: checkpoint A2-05, lot 3 jusqu\'a B9 arbitree, etude de methode et outillage v2, aucune correction appliquee`.', '5. Push séparé, après l\'autorisation de push.', ''];
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-checkpoint-B-controle.md'), P.join(LF) + LF);
console.log('contrôle checkpoint B : ' + (echecs ? echecs + ' non conforme(s)' : 'tous conformes') + ' ; B ' + B.length + ' ; ajouts ' + ajouts.length + ' ; distant ' + (distantSha ? distantSha.slice(0, 7) : 'non joignable'));
if (echecs) process.exitCode = 1;
