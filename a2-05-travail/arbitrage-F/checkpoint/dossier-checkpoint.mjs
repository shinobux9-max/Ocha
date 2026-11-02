// A2-05 : dossier de checkpoint Git, EN LECTURE SEULE sur le dépôt réel : n'indexe, ne committe et ne pousse rien. Le distant n'est qu'interrogé (git ls-remote).
// La simulation (git add, commit, clones) n'a lieu que dans des clones temporaires, supprimés ensuite ; aucun objet n'est écrit dans le dépôt réel.
// Usage : node a2-05-travail/arbitrage-F/checkpoint/dossier-checkpoint.mjs <racine du dépôt>
// Écrit docs/rapports/etape2-A2-05-checkpoint-T9-dossier.md, et, dans ce dossier, chemins-inclus.txt et chemins-exclus.txt : un instantané, à régénérer juste avant tout commit.
import { readFileSync, writeFileSync, statSync, existsSync, mkdtempSync, mkdirSync, cpSync, rmSync, utimesSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
// --attributs=<chemin> : simulation seule, avec un `.gitattributes` proposé ; n'écrit ni le dossier, ni les listes
const SIMU = process.argv.find((a) => a.startsWith('--attributs='))?.slice('--attributs='.length);
const W ='a2-05-travail/', OUT = W + 'arbitrage-F/checkpoint/', RAP = 'docs/rapports/etape2-A2-05-checkpoint-T9-dossier.md', MAN = W + 'empreintes-rapports-arbitres.json';
const MESSAGE = "Docs: checkpoint A2-05, lot 3 jusqu'a T9 close, revision 4 d'E5, bloc F prepare, gitattributes cible, alternative Git installee, aucune correction appliquee";
const ALT = existsSync(join(root, W + 'references-git.json')); // alternative installée : relais à 30 sur 30 après commit, push et restauration ; seul --verifier constate la clôture
const GA = '.gitattributes',AVANT = '78031638c0f81dca1b167e3f57f5a891767fc4cb', REPRISE = 'docs/relecture/reprise-A2-05.md', CANDIDAT = W + 'reprise-A2-05-allegee-candidat.md', VF = W + 'versions-finales/', FINAL_REPRISE = 'a651cc84229efb893f11310209c1c05c4e810d53dffcb00fc5e2d3c859466e09';
const ZONES = /^(a2-05-travail|docs|reconstruction|data)\/|^[^/]+\.md$/; // celles du candidat ciblé : `-text`, ou `eol=crlf` pour les documents de tête
const MIXTES = [W + 'proposition-CLAUDE-md-section5.diff', W + 'correction-res/regeneration/sortie-preparation.txt', 'js/features/oral.js'];
const REGLES = [ // exclusions, dans l'ordre ; le reste des non suivis est proposé
  ['relectures', /^chatgpt-relecture\//, "`chatgpt-relecture/` : exports, 1,6 Go, jamais committés"],
  ['archives', /\.zip$/, '`*.zip` : artefacts de transfert, jamais committés'],
  ['notes', /(^|\/)note-export[^/]*$/, 'notes d\'export et leurs en-têtes : reproduites dans les exports'],
  ['aperçu', /(^|\/)sync-stable-apercu\.md$/, '`sync-stable-apercu.md` : se régénère à chaque aperçu'],
  ['sauvegardes', /\/depart\//, '`**/depart/` : sauvegardes de départ de chaque opération'],
  ['traces', /\/(sorties?|diffs|diffs-reels|apercu-B2)\//, 'sorties, diffs et aperçus de chaque opération'],
  ['versions', /^a2-05-travail\/arbitrage-[^/]+\/[^/]+\/.*(?<!\.mjs)$/,'versions proposées et documents de travail dans les sous-dossiers d\'`arbitrage-*/`, hors scripts'],
];
const sha = (b) => createHash('sha256').update(b).digest('hex');
const spawn = (cmd, a, cwd = root) => { const r = spawnSync(cmd, a, { cwd, encoding: 'utf8', maxBuffer: 1 << 30 }); return { code: r.status, out: r.stdout ?? '', err: r.stderr ?? '' }; };
const git = (...a) => spawn('git', ['-c', 'core.quotepath=false', ...a]).out;
const L = (t) => t.split('\n').filter(Boolean);
const taille = (p) => statSync(join(root, p)).size;
const mo = (n) => (n / 1048576).toFixed(1).replace('.', ',') + ' Mo';
const somme = (l) => l.reduce((n, p) => n + taille(p), 0);
let ko = 0; const C = []; const ok = (b, l, d) => { if (!b) ko++; const m = '| ' + l + ' | ' + (b ? 'conforme' : '**ÉCART**') + (d ? ' : ' + d : '') + ' |'; C.push(m); console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };

// État réel
const tete = git('rev-parse', 'HEAD').trim(), suivi = git('rev-parse', 'origin/ocha-v2').trim(), distant = (git('ls-remote', 'origin', 'refs/heads/ocha-v2').split(/\s/)[0] ?? '').trim(), branche = git('branch', '--show-current').trim();
const index = L(git('diff', '--cached', '--name-only')); const modifies = L(git('diff', '--name-only')); const numstat = new Map(L(git('diff', '--numstat')).map((l) => { const [a, b, p] = l.split('\t'); return [p, [a, b]]; }));
const nonSuivis = L(git('ls-files', '--others', '--exclude-standard')); const supprimes = L(git('ls-files', '--deleted'));
const GARDER = /^a2-05-travail\/versions-finales\//; // dépendance en service : le relais lit versions-finales/depart/ et ses diffs (mode --apres-application)
const classe = (p) => (GARDER.test(p) ? null : REGLES.find(([, re]) => re.test(p))?.[0] ?? null);
const exclus = nonSuivis.filter(classe), ajoutes = nonSuivis.filter((p) => !classe(p));
const inclus = [...modifies, ...ajoutes].sort();
const sensibles = inclus.filter((p) => /^(data|reconstruction|tools|tests|docs\/conception|src|js|css|public)\//.test(p));
ok(tete === distant && tete === suivi, 'HEAD, référence locale et distant réel identiques', tete.slice(0, 12) + '…');
ok(!index.length, 'index vide'); ok(!supprimes.length, 'aucun fichier suivi supprimé');
ok(!sensibles.length, 'aucun fichier inclus dans `data/`, `reconstruction/`, `tools/`, `tests/`, `docs/conception/` ou l\'application', sensibles.join(', '));
ok(!inclus.some((p) => /\.zip$|^chatgpt-relecture\//.test(p)), 'aucune archive ni export parmi les inclus');
const secrets = inclus.filter((p) => /(api[_-]?key|secret[_-]?key|password\s*=|BEGIN (RSA |OPENSSH )?PRIVATE KEY|ghp_[A-Za-z0-9]{20})/i.test(readFileSync(join(root, p), 'utf8')));
ok(!secrets.length, 'aucun motif de secret dans les fichiers inclus', secrets.join(', '));
const gros = inclus.filter((p) => taille(p) > 2097152); ok(!gros.length, 'aucun fichier inclus de plus de 2 Mo', gros.map((p) => p + ' ' + mo(taille(p))).join(', '));

// Simulation : clone temporaire, inclus seuls, puis commit, puis deux restaurations
const tmp = mkdtempSync(join(tmpdir(), 'ocha-checkpoint-')); const S = join(tmp, 'sim');
spawn('git', ['clone', '--quiet', '--shared', '--no-checkout', root, S]); spawn('git', ['read-tree', 'HEAD'], S);
for (const p of L(git('ls-files'))) { mkdirSync(dirname(join(S, p)), { recursive: true }); cpSync(join(root, p), join(S, p)); }
for (const p of ajoutes.filter((x) => x !== GA)) { mkdirSync(dirname(join(S, p)), { recursive: true }); cpSync(join(root, p), join(S, p)); }
// Index rafraîchi avant la pose du `.gitattributes`, comme sur le dépôt réel : sinon, Git relirait les fichiers copiés sous les nouveaux attributs
spawn('git', ['update-index', '-q', '--refresh'], S); cpSync(SIMU ? join(root, SIMU) : join(root, GA), join(S, GA));
const CTRL = { couverture: [W + 'couverture-lot3.mjs'], empreintes: [W + 'empreintes-lot3.mjs'], pilote: [W + 'controle-bilan-pilote.mjs'], ...Object.fromEntries([5, 6, 7, 8, 9].map((n) => ['T' + n, [W + 'recalcul-T' + n + '-perimetre.mjs']])), relais: [W + 'controle-relais-allege.mjs', '--apres-application'] };
const tous = (r) => Object.fromEntries(Object.entries(CTRL).map(([k, [s, ...a]]) => { const x = spawnSync(process.execPath, [join(r, s), r, ...a], { cwd: r, encoding: 'utf8', maxBuffer: 1 << 28 }); const o = ((x.stdout ?? '') + (x.stderr ?? '')).trim(); return [k, { code: x.status, fin: o.split('\n').pop().slice(0, 100), e: o.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim().slice(0, 120)) }]; }));
const bilan = (R) => Object.entries(R).filter(([, r]) => r.code !== 0).map(([k, r]) => k + ' (' + r.fin + ' ; ' + r.e.join(' | ') + ')').join(' ; ');
// Recalculs de T2 à T4 : hors du suivi depuis leurs tranches, déjà en écart sur le dépôt réel ; seule leur identité avec le réel est exigée
const hist = (r) => [2, 3, 4].map((n) => { const x = spawnSync(process.execPath, [join(r, W + 'recalcul-T' + n + '-perimetre.mjs'), r], { cwd: r, encoding: 'utf8', maxBuffer: 1 << 28 }); return [n, x.status, ((x.stdout ?? '') + (x.stderr ?? '')).split('\n').filter((l) => /^ÉCART/.test(l)).length]; });
const H0 = hist(root); ok(JSON.stringify(hist(S)) === JSON.stringify(H0), 'recalculs de T2 à T4, hors du suivi : mêmes écarts que sur le dépôt réel, aucune aggravation', H0.map(([n, c, e]) => 'T' + n + ' code ' + c + ', ' + e + ' écart(s)').join(' ; '));
const R1 = tous(S); ok(!bilan(R1), 'inclus seuls, avant commit : tous les contrôles à 0, aucun ne dépend d\'un fichier exclu', bilan(R1) || Object.keys(R1).length + ' contrôles ; ' + R1.relais.fin);
const T1 = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: S, encoding: 'utf8', maxBuffer: 1 << 28 }); const res = (x) => (((x.stdout ?? '') + (x.stderr ?? '')).match(/^(?:# |ℹ )(tests|pass|fail) (\d+)/gm) ?? []).join(' ').replace(/# |ℹ /g, '');
ok(T1.status === 0, 'suite de tests, inclus seuls', res(T1));
const avant = Object.fromEntries(inclus.map((p) => [p, sha(readFileSync(join(S, p)))]));
writeFileSync(join(tmp, 'liste.txt'), inclus.join('\n') + '\n');
const add = spawn('git', ['-c', 'core.safecrlf=false', 'add', '--pathspec-from-file=' + join(tmp, 'liste.txt')], S);
// Blobs : seuls les inclus changent ; aucune renormalisation d'un fichier suivi non inclus
const statuts = L(spawn('git', ['-c', 'core.quotepath=false', 'diff', '--cached', '--no-renames', '--name-status'], S).out).map((l) => l.split('\t'));
const parStatut = (s) => statuts.filter(([x]) => x === s).map(([, p]) => p).sort(); const memes = (a, b) => JSON.stringify(a) === JSON.stringify([...b].sort());
ok(memes(parStatut('M'), modifies) && memes(parStatut('A'), ajoutes) && statuts.length === inclus.length, 'blobs : seuls les inclus changent, aucune renormalisation, trace `.diff` suivie non touchée', parStatut('M').length + ' modifiés, ' + parStatut('A').length + ' ajoutés, ' + statuts.filter(([x]) => !'MA'.includes(x)).length + ' autre');
const setInclus = new Set(inclus); const eolIndex = new Map();
for (const l of L(spawn('git', ['-c', 'core.quotepath=false', 'ls-files', '--eol'], S).out)) { const [meta, p] = l.split('\t'); if (!setInclus.has(p)) continue; const k = meta.trim().split(/\s+/).join(' '); eolIndex.set(k, (eolIndex.get(k) ?? 0) + 1); }
const com =spawn('git', ['-c', 'user.name=simulation', '-c', 'user.email=simulation', 'commit', '--quiet', '--no-verify', '-m', MESSAGE], S);
const stat = spawn('git', ['show', '--stat', '--format=', 'HEAD'], S).out.trim().split('\n').pop().trim();
ok(add.code === 0 && com.code === 0, 'simulation : `git add` par liste explicite et commit, dans le clone temporaire seulement', stat);
ok(inclus.every((p) => sha(readFileSync(join(S, p))) === avant[p]), 'le commit ne réécrit aucun fichier de travail : octets identiques', inclus.length + ' fichiers');
ok(!spawn('git', ['status', '--porcelain'], S).out.trim(), 'après le commit simulé, arbre propre sur le clone');
const ids = (r) => r.e.map((l) => l.split(/\s+/)[1]).sort().join(', ');
const horsRelais = (X) => bilan(Object.fromEntries(Object.entries(X).filter(([k]) => k !== 'relais')));
const R2 = tous(S); ok(!horsRelais(R2) && ids(R2.relais) === (ALT ? '' : 'C5a'), ALT ? 'après le commit simulé : contrôles à 0, relais normal à 30 sur 30, sans valeur de clôture' : 'après le commit simulé : contrôles à 0, relais 29 sur 30, C5a seul, attendu : les documents citent encore `7803163`', horsRelais(R2) || R2.relais.fin + ' ; ' + ids(R2.relais));
const egales =(d) => { const m = JSON.parse(readFileSync(join(S, MAN), 'utf8')).empreintes; const e = Object.entries(m); return { n: e.length, ok: e.filter(([p, h]) => existsSync(join(d, p)) && sha(readFileSync(join(d, p))) === h).length }; };
const conf = spawn('git', ['config', '--get', 'core.autocrlf']).out.trim();
const finsDe = (b) => { const s = b.toString('latin1'); const crlf = (s.match(/\r\n/g) ?? []).length; return crlf + ' CRLF, ' + ((s.match(/\n/g) ?? []).length - crlf) + ' LF'; };
const lireOu = (d, p) => (existsSync(join(d, p)) ? finsDe(readFileSync(join(d, p))) : 'absent');
// Restauration : clone jetable réel, depuis le commit simulé, sous une valeur explicite de core.autocrlf ; référence de comparaison : l'état de travail
const restaurer = (val) => {
  const d = join(tmp, 'restauration-' + val); const cl = spawn('git', ['clone', '--quiet', '-c', 'core.autocrlf=' + val, S, d]); const e = egales(d); const X = tous(d);
  const T = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 });
  const fichiers = L(spawn('git', ['-c', 'core.quotepath=false', 'ls-files'], d).out); const differents = fichiers.filter((p) => !readFileSync(join(S, p)).equals(readFileSync(join(d, p))));
  const zone = differents.filter((p) => ZONES.test(p)); const propre = !spawn('git', ['status', '--porcelain'], d).out.trim();
  const v = { val, cl: cl.code, e, X, tests: res(T), code: T.status, n: fichiers.length, differents, zone, hors: differents.filter((p) => !ZONES.test(p)), propre, mixtes: MIXTES.map((p) => [p, lireOu(d, p)]) };
  ok(cl.code === 0 && propre, 'restauration `core.autocrlf=' + val + '` : clone complet, arbre propre', fichiers.length + ' fichiers suivis');
  ok(e.ok === e.n, 'restauration `core.autocrlf=' + val + '` : toutes les empreintes concordent', e.ok + ' sur ' + e.n);
  ok(!horsRelais(X), 'restauration `core.autocrlf=' + val + '` : couverture, empreintes, pilote et recalculs de T5 à T9 à 0', horsRelais(X) || Object.keys(X).length - 1 + ' contrôles');
  ok(ids(X.relais) === (ALT ? '' : 'C5a, C8'), 'restauration `core.autocrlf=' + val + '` : relais ' + (ALT ? '30 sur 30' : '28 sur 30, C5a et C8 seuls') + ', sans aucun écart de fins de ligne', X.relais.fin + ' ; ' + ids(X.relais));
  ok(T.status === 0, 'restauration `core.autocrlf=' + val + '` : suite de tests', res(T));
  // `REGLES-CONSTRUCTION.md`, en LF sur le disque, n'a pas de ligne dans le candidat : il revient en CRLF sous `true`, hors du manifeste ; écart à signaler, non à masquer
  const attendus = val === 'true' && !readFileSync(join(S, GA), 'utf8').includes('/REGLES-CONSTRUCTION.md -text') ? [W + 'proposition-CLAUDE-md-section5.diff', 'REGLES-CONSTRUCTION.md'] : [W + 'proposition-CLAUDE-md-section5.diff'];
  ok(memes(zone, attendus), 'restauration `core.autocrlf=' + val + '` : dans `a2-05-travail/`, `docs/`, `reconstruction/`, `data/` et les documents de tête, seuls les écarts résiduels connus', zone.length + ' fichier(s) : ' + (zone.join(', ') || 'aucun'));
  console.log('constat  autocrlf=' + val + ' : ' + differents.length + ' fichiers différents, dont ' + v.hors.length + ' hors zones ; fins de ligne : ' + v.mixtes.map(([p, f]) => p + ' = ' + f).join(' ; '));
  return v;
};
const RV = restaurer('true'), RF = restaurer('false');
const travailMixtes = MIXTES.map((p) => [p, finsDe(readFileSync(join(S, p))), spawn('git', ['cat-file', '-e', 'HEAD:' + p], S).code === 0 ? finsDe(Buffer.from(spawnSync('git', ['show', 'HEAD:' + p], { cwd: S, maxBuffer: 1 << 28 }).stdout)) : 'pas dans le commit', spawn('git', ['check-attr', 'text', 'eol', '--', p], S).out.trim().split('\n').map((l) => l.split(': ').slice(1).join('=')).join(', ')]);
// Risque d'horodatage : sous `-text`, Git compare les octets dès que l'horodatage change
utimesSync(join(S, MIXTES[0]), new Date(), new Date()); const touche = spawn('git', ['status', '--porcelain', '--', MIXTES[0]], S).out.trim();
console.log('constat  horodatage de la trace suivie changé : `git status` rend « ' + (touche || 'rien') + ' »');
// Procédure de référence : mesurée sur le clone, après un push simulé (la référence locale d'origine rejoint le commit)
spawn('git', ['update-ref', 'refs/remotes/origin/ocha-v2', 'HEAD'], S); const NOUV = spawn('git', ['rev-parse', 'HEAD'], S).out.trim();
const R5 = tous(S); ok(ids(R5.relais) === (ALT ? '' : 'C5a, C8'), 'après le push simulé : relais ' + (ALT ? '30 sur 30, sans valeur de clôture' : '28 sur 30, C5a et C8'), ids(R5.relais));
rmSync(tmp, { recursive: true, force: true });
ok(git('rev-parse', 'HEAD').trim() === tete && !L(git('diff', '--cached', '--name-only')).length, 'dépôt réel : HEAD inchangé, index vide');

if (SIMU) { console.log(ko ? ko + ' écart(s)' : 'simulation conforme, attributs ' + SIMU); process.exit(ko ? 1 : 0); }

// Sorties
const parClasse = REGLES.map(([k, , d]) => { const l = exclus.filter((p) => classe(p) === k); return { k, d, n: l.length, t: somme(l) }; });
writeFileSync(join(root, OUT, 'chemins-inclus.txt'), inclus.join('\n') + '\n'); writeFileSync(join(root, OUT, 'chemins-exclus.txt'), exclus.join('\n') + '\n');
const grp = (l) => { const g = new Map(); for (const p of l) { const k = p.startsWith('docs/') ? 'docs/rapports/' : /^a2-05-travail\/arbitrage-/.test(p) ? p.split('/').slice(0, 2).join('/') + '/' : /^a2-05-travail\/(correction-|versions|criblage|provenance)/.test(p) ? p.split('/').slice(0, 2).join('/') + '/' : 'a2-05-travail/ (racine)'; g.set(k, [...(g.get(k) ?? []), p]); } return [...g].sort(); };
const P = ['# Étape 2 · A2-05 — dossier de checkpoint Git, après T9', '', '**Date** : 2026-11-02', "**Statut** : **proposition, en lecture seule. Rien n'est indexé, committé ni poussé.** Écrit par `a2-05-travail/arbitrage-F/checkpoint/dossier-checkpoint.mjs`. Le `git add` et le commit de la simulation n'ont lieu que dans des clones temporaires, supprimés ensuite. Le dossier, les listes et les contrôles sont un **instantané** : ils se régénèrent juste avant tout commit.", '', "**Autorisation** : « Régénérer ensuite le dossier de checkpoint avec la nouvelle sélection et les deux corrections du préparateur. » ; « Ne pas encore appliquer la consignation ni effectuer de `git add`, commit ou push. »", ''];
P.push('## 1. État réel', '', '| Élément | Valeur |', '|---|---|', '| Branche | `' + branche + '` |', '| HEAD | `' + tete + '` |', '| `origin/ocha-v2` (référence locale) | `' + suivi + '` |', '| Distant réel (`git ls-remote`) | `' + distant + '` |', '| Index | ' + (index.length ? index.length + ' fichiers' : 'vide') + ' |', '| Fichiers suivis modifiés | ' + modifies.length + ' |', '| Fichiers suivis supprimés | ' + supprimes.length + ' |', '| Fichiers non suivis | ' + nonSuivis.length + ', ' + mo(somme(nonSuivis)) + ' |', '| `.gitignore` | ne couvre ni `a2-05-travail/`, ni `chatgpt-relecture/`, ni les archives |', '');
P.push('**L\'indexation doit se faire par liste explicite**, jamais par `git add .` ni `git add -A`.', '');
P.push('## 2. Fichiers suivis modifiés, tous inclus', '', '| Fichier | + | − |', '|---|---|---|', ...modifies.map((p) => '| `' + p + '` | ' + numstat.get(p)?.[0] + ' | ' + numstat.get(p)?.[1] + ' |'), '');
P.push('## 3. Fichiers non suivis proposés', '', '**' + ajoutes.length + ' fichiers, ' + mo(somme(ajoutes)) + '.** Total du commit : **' + inclus.length + ' fichiers**. Liste exacte : `a2-05-travail/arbitrage-F/checkpoint/chemins-inclus.txt`.', '', '| Groupe | Fichiers | Taille |', '|---|---|---|', ...grp(ajoutes).map(([k, l]) => '| `' + k + '` | ' + l.length + ' | ' + mo(somme(l)) + ' |'), '');
P.push('## 4. Fichiers exclus', '', '**' + exclus.length + ' fichiers, ' + mo(somme(exclus)) + '.** Liste exacte : `chemins-exclus.txt`. La règle reprend celle du checkpoint du 2026-10-18 : les 117 fichiers d\'`a2-05-travail/` suivis à `HEAD` ne comprennent ni note, ni sauvegarde, ni trace.', '', '| Classe | Fichiers | Taille | Règle |', '|---|---|---|---|', ...parClasse.map((c) => '| ' + c.k + ' | ' + c.n + ' | ' + mo(c.t) + ' | ' + c.d + ' |'), '');
P.push("**Exception, établie par la simulation** : `a2-05-travail/versions-finales/` est inclus en entier, `depart/` et diffs compris : le relais en service les lit, et il s'arrête en erreur sans eux. La règle du 2026-10-18 seule aurait donné un commit dont le relais ne fonctionne pas sur une restauration.", '');
P.push("**Ce que l'exclusion coûte** : les sauvegardes de départ, les traces et les notes de T1 à T9 restent sur ce poste seulement. Elles ne servent à aucun contrôle en service (§5), et l'essentiel figure dans les exports transmis. Variante non recommandée : les inclure, soit environ " + mo(parClasse.filter((c) => ['sauvegardes', 'traces', 'versions', 'notes'].includes(c.k)).reduce((n, c) => n + c.t, 0)) + ' de plus.', '');
P.push('## 5. Contrôles de non-régression', '', '| Contrôle | Résultat |', '|---|---|', ...C, '');
P.push("**Recalculs de T2 à T4** : ils sont en écart sur le dépôt réel, avant tout commit : ils décrivent l'état d'avant l'arbitrage de leur tranche et ne sont plus suivis. Le relais, les recalculs de T5 à T9 et le pilote sont les contrôles en service.", '');
P.push('**Après un commit, deux contrôles de trace décrivent un état passé** : `arbitrage-F/controle-perimetre-F.mjs` exige `HEAD` à `7803163`, et `arbitrage-T9/audit/controle-audit-T9.mjs` l\'état d\'avant l\'arbitrage. Ce ne sont pas des contrôles en service.', '');
const ligneR = (v) => '| `core.autocrlf=' + v.val + '` | ' + v.e.ok + ' sur ' + v.e.n + ' | ' + v.X.relais.fin.replace(/\|/g, '/') + ' (' + ids(v.X.relais) + ') | ' + v.tests + ' | ' + v.differents.length + ' sur ' + v.n + ' | ' + v.zone.length + ' | ' + v.hors.length + ' | ' + (v.propre ? 'oui' : '**non**') + ' |';
const LISTE = (l) => l.map((p) => '- `' + p + '`');
P.push('## 6. Modifications de blobs', '', "**Le commit simulé ne change que les fichiers de la liste** : " + parStatut('M').length + " blobs modifiés, " + parStatut('A').length + " ajoutés, aucun autre (`git diff --cached --no-renames --name-status`). **Aucune renormalisation** : aucun fichier suivi hors de la liste n'obtient un nouveau blob, ni la trace `.diff` suivie, ni `js/features/oral.js`.", '', "**Fins de ligne des " + inclus.length + " fichiers de la liste, dans l'index du clone** :", '', '| Index, travail, attribut | Fichiers |', '|---|---|', ...[...eolIndex].sort().map(([k, n]) => '| `' + k + '` | ' + n + ' |'), '');
P.push('## 7. Restauration depuis le commit simulé', '', "Deux clones jetables, depuis le commit simulé, `.gitattributes` compris, sous une valeur explicite de `core.autocrlf`. La référence de comparaison est l'état de travail. Ce poste a `core.autocrlf=" + conf + "` par défaut.", '', '| Restauration | Empreintes | Relais | Tests | Octets différents | dans les zones protégées | hors zones | Arbre propre |', '|---|---|---|---|---|---|---|---|', ligneR(RV), ligneR(RF), '');
P.push(ALT ? "**Le relais normal rend 30 sur 30 dans les deux cas ; cela ne prouve pas une clôture** (§9). Le défaut de fins de ligne est levé." : "**Le relais rend 28 sur 30 dans les deux cas, C5a et C8 seuls** : un commit ne peut pas citer sa propre empreinte (§9). Le défaut de fins de ligne est levé.", '', "**Écarts résiduels, `core.autocrlf=true`, hors zones** :", '', ...LISTE(RV.hors), '', "**Écarts résiduels, `core.autocrlf=false`, hors zones** :", '', ...LISTE(RF.hors), '', "**Dans les zones** : un seul fichier, `a2-05-travail/proposition-CLAUDE-md-section5.diff`, dans les deux configurations (ci-dessous). `REGLES-CONSTRUCTION.md` revient à l'identique depuis la règle complémentaire. Hors zones, ce sont des fichiers que le `.gitattributes` ne couvre pas, à dessein : le code, les styles et les fichiers de l'application restent gouvernés par `core.autocrlf`, comme avant. `.gitattributes` lui-même, en LF sur le disque, revient en CRLF sous `true`, sans effet mesuré : arbre propre, 45 empreintes sur 45.", '');
P.push('### Fichiers à fins de ligne mixtes', '', "**Ils restent inchangés, conformément à la décision.** Mesure :", '', '| Fichier | Attributs | Travail | Blob du commit | Restauré, `true` | Restauré, `false` |', '|---|---|---|---|---|---|', ...travailMixtes.map(([p, w, b, a], i) => '| `' + p + '` | ' + a + ' | ' + w + ' | ' + b + ' | ' + RV.mixtes[i][1] + ' | ' + RF.mixtes[i][1] + ' |'), '');
P.push("**Risque connu, non traité** : sous `-text`, Git compare les octets dès que l'horodatage d'un fichier change. Horodatage de `proposition-CLAUDE-md-section5.diff` changé sur le clone, sans toucher au contenu : `git status` rend « " + (touche || 'rien') + " ». Le blob reste correct ; l'effet est un faux « modifié » à ne pas indexer. C'est une raison de plus d'indexer **par liste explicite**.", '');
P.push('## 8. Message de commit proposé', '', '`' + MESSAGE + '`', '', '**Une seule ligne**, sans accent, comme les commits précédents. Indexation : `git add --pathspec-from-file=<liste régénérée>`, jamais `git add .` ni `git add -A`.', '');
P.push('## 9. Référence de commit', '', ALT ? "**L'alternative est installée.** Un relais normal à 30 sur 30 n'est jamais la preuve d'une clôture Git. Le checkpoint n'est complet qu'après ces six états : 1. commit N ; 2. push ; 3. `cloture-checkpoint.mjs --declarer` ; 4. commit de clôture ; 5. second push ; 6. `cloture-checkpoint.mjs --verifier`, qui lance le relais en `--strict`. **`CLAUDE.md`, ligne 128, n'est pas modifiée.**" : "**Le relais rend 29 sur 30 après le commit (C5a), puis 28 sur 30 après le push et sur toute restauration (C5a, C8) : c'est structurel, le commit ne pouvant pas se citer lui-même.** Le scénario C n'est pas retenu. L'alternative, renforcée, n'est pas installée : `docs/rapports/etape2-A2-05-preparation-avant-checkpoint.md`. Ce dossier simule l'état réel, sans elle. **`CLAUDE.md`, ligne 128, n'est pas modifiée.**", '');
P.push('## 10. Ordre recommandé', '', ALT ? "1. Accord de commit, sur cette liste. 2. Accord de push, distinct. 3. Déclaration, commit de clôture et second push, chacun sur autorisation. 4. `--verifier`. **Le tout avant toute installation normative.**" : "1. Décision sur l'alternative : installée avant le commit, elle est portée par lui, et ce dossier se régénère. 2. Accord de commit, sur la liste régénérée. 3. Accord de push, distinct. **Le tout avant toute installation normative.**", '');
writeFileSync(join(root, RAP), P.join('\n') + '\n');
const DIFF = spawn('git', ['-c', 'core.quotepath=false', 'diff', '--no-renames'], root).out; writeFileSync(join(root, OUT, 'diff-retenu.txt'), DIFF); console.log('diff retenu : ' + Buffer.byteLength(DIFF) + ' octets, ' + sha(Buffer.from(DIFF, 'utf8')).slice(0, 16));
console.log(ko ? ko + ' écart(s)' : 'dossier conforme'); console.log(JSON.stringify({ inclus: inclus.length, ajoutes: ajoutes.length, exclus: exclus.length, tailleInclus: mo(somme(ajoutes)), parClasse: parClasse.map((c) => c.k + ' ' + c.n + ' ' + mo(c.t)) }));
process.exit(ko ? 1 : 0);
