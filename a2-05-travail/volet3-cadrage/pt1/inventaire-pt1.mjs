// A2-05 · volet 3 · PT-1 : inventaire et simulation du commit documentaire de stabilisation (installation d'A10 et travail documentaire en attente).
// EN LECTURE SEULE sur le dépôt réel : n'indexe, ne committe et ne pousse rien ; le distant n'est qu'interrogé (git ls-remote).
// Les simulations (git add, commit, push, déclaration de la référence, commit de clôture, second push, --verifier, restaurations) ont lieu
// dans des clones et un dépôt nu temporaires, supprimés ensuite.
// Règles de sélection : celles du checkpoint du 2026-11-02 (`a2-05-travail/arbitrage-F/checkpoint/dossier-checkpoint.mjs`, REGLES et GARDER), citées
// sans modification ; variante « etendue » : la règle `versions` appliquée aussi aux sous-dossiers d'`omissions-temps3/` et de `volet3-cadrage/` (proposition, non arbitrée).
// Usage : node a2-05-travail/volet3-cadrage/pt1/inventaire-pt1.mjs <racine du dépôt> --variante=base|etendue
// Écrit seulement dans son dossier : chemins-inclus-<variante>.txt, chemins-exclus-<variante>.txt, inventaire-<variante>.json.
import { readFileSync, writeFileSync, statSync, existsSync, mkdtempSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const VAR = process.argv.find((a) => a.startsWith('--variante='))?.slice(11); if (!['base', 'etendue'].includes(VAR)) throw new Error('--variante=base|etendue attendu');
const W = 'a2-05-travail/', OUT = W + 'volet3-cadrage/pt1/', GA = '.gitattributes', AVANT = '39cce138f12c50d32675cc4acff5237883eec0b1';
const MESSAGE = "Docs: checkpoint A2-05, A10 installe, lot 3 arbitre, recherche d'omissions close, volet 3 cadre, aucune correction appliquee";
const LIBELLE = "Checkpoint documentaire A2-05 — A10 installé, lot 3 entièrement arbitré, recherche d'omissions d'interrogatif close, volet 3 cadré, aucune correction lexicale appliquée.";
// Règles du checkpoint du 2026-11-02, recopiées telles quelles (dossier-checkpoint.mjs, REGLES)
const REGLES = [
  ['relectures', /^chatgpt-relecture\//, "`chatgpt-relecture/` : exports, jamais committés"],
  ['archives', /\.zip$/, '`*.zip` : artefacts de transfert, jamais committés'],
  ['notes', /(^|\/)note-export[^/]*$/, 'notes d\'export et leurs en-têtes : reproduites dans les exports'],
  ['aperçu', /(^|\/)sync-stable-apercu\.md$/, '`sync-stable-apercu.md` : se régénère à chaque aperçu'],
  ['sauvegardes', /\/depart\//, '`**/depart/` : sauvegardes de départ de chaque opération'],
  ['traces', /\/(sorties?|diffs|diffs-reels|apercu-B2)\//, 'sorties, diffs et aperçus de chaque opération'],
  ['versions', /^a2-05-travail\/arbitrage-[^/]+\/[^/]+\/.*(?<!\.mjs)$/, 'versions proposées et documents de travail dans les sous-dossiers d\'`arbitrage-*/`, hors scripts'],
];
// Variante étendue (proposition) : même règle pour les deux dossiers de travail créés depuis
if (VAR === 'etendue') REGLES.push(['versions-ext', /^a2-05-travail\/(omissions-temps3|volet3-cadrage)\/[^/]+\/.*(?<!\.mjs)$/, '[proposition] même règle pour les sous-dossiers d\'`omissions-temps3/` et de `volet3-cadrage/`, hors scripts']);
// Dossier de cette préparation : scripts inclus, listes et documents de travail exclus, dans les deux variantes (stabilité de l'inventaire d'une exécution à l'autre)
REGLES.push(['preparation-PT-1', /^a2-05-travail\/volet3-cadrage\/pt1\/.*(?<!\.mjs)$/, 'listes, inventaires et proposition de la présente préparation (régénérés avant tout commit), hors scripts']);
// Dépendances en service (dossier-checkpoint.mjs, GARDER, étendu à versions-finales-2/ que lit le relais depuis l'installation d'A10) : jamais exclues
const GARDER = /^a2-05-travail\/versions-finales(-2)?\//;
const ZONES = /^(a2-05-travail|docs|reconstruction|data)\/|^[^/]+\.md$/;

const sha = (b) => createHash('sha256').update(b).digest('hex');
const spawn = (cmd, a, cwd = root) => { const r = spawnSync(cmd, a, { cwd, encoding: 'utf8', maxBuffer: 1 << 30 }); return { code: r.status, out: r.stdout ?? '', err: r.stderr ?? '' }; };
const git = (...a) => spawn('git', ['-c', 'core.quotepath=false', ...a]).out;
const L = (t) => t.split('\n').filter(Boolean);
const taille = (p) => statSync(join(root, p)).size; const mo = (n) => (n / 1048576).toFixed(2).replace('.', ',') + ' Mo'; const somme = (l) => l.reduce((n, p) => n + taille(p), 0);
let ko = 0; const C = []; const ok = (b, l, d) => { if (!b) ko++; C.push({ ok: !!b, l, d: d ?? '' }); console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l) => { C.push({ ok: null, l }); console.log('constat  ' + l); };

// 1. État réel
const tete = git('rev-parse', 'HEAD').trim(), suivi = git('rev-parse', 'origin/ocha-v2').trim(), distant = (git('ls-remote', 'origin', 'refs/heads/ocha-v2').split(/\s/)[0] ?? '').trim(), branche = git('branch', '--show-current').trim();
const index = L(git('diff', '--cached', '--name-only')), modifies = L(git('diff', '--name-only')), supprimes = L(git('ls-files', '--deleted'));
const numstat = Object.fromEntries(L(git('diff', '--numstat')).map((l) => { const [a, b, p] = l.split('\t'); return [p, [+a, +b]]; }));
const nonSuivis = L(git('ls-files', '--others', '--exclude-standard'));
ok(branche === 'ocha-v2', 'branche ocha-v2', branche);
ok(tete === AVANT && suivi === AVANT && distant === AVANT, 'HEAD, origin/ocha-v2 et distant réel (git ls-remote) identiques, à 39cce13', [tete, suivi, distant].map((x) => x.slice(0, 12)).join(' / '));
ok(!index.length, 'index vide', index.join(', '));
ok(!supprimes.length, 'aucun fichier suivi supprimé');
const classe = (p) => (GARDER.test(p) ? null : REGLES.find(([, re]) => re.test(p))?.[0] ?? null);
const exclus = nonSuivis.filter(classe).sort(), ajoutes = nonSuivis.filter((p) => !classe(p)).sort(), inclus = [...modifies, ...ajoutes].sort();
// Périmètre attendu de PT-1 : `docs/conception/` limité à l'installation d'A10 ; rien dans les données, la reconstruction, les outils, les tests, l'application
const concept = inclus.filter((p) => p.startsWith('docs/conception/'));
ok(JSON.stringify(concept) === JSON.stringify(['docs/conception/00-sommaire.md', 'docs/conception/addendum-A10-interrogatif.md']), '`docs/conception/` : seuls le sommaire et A10 (installation d\'A10)', concept.join(', '));
const sensibles = inclus.filter((p) => /^(data|reconstruction|tools|tests|src|js|css|public)\//.test(p) || /^(CLAUDE|REGLES-CONSTRUCTION|GUIDE-CONTENU)\.md$/.test(p));
ok(!sensibles.length, 'aucun fichier inclus dans `data/`, `reconstruction/`, `tools/`, `tests/`, l\'application, ni `CLAUDE.md`, `REGLES-CONSTRUCTION.md`', sensibles.join(', '));
ok(!inclus.some((p) => /\.zip$|^chatgpt-relecture\/|(^|\/)note-export/.test(p)), 'aucune archive, aucun export, aucune note d\'export parmi les inclus');
const secrets = inclus.filter((p) => /(api[_-]?key|secret[_-]?key|password\s*=|BEGIN (RSA |OPENSSH )?PRIVATE KEY|ghp_[A-Za-z0-9]{20})/i.test(readFileSync(join(root, p), 'utf8')));
ok(!secrets.length, 'aucun motif de secret dans les fichiers inclus', secrets.join(', '));
const gros = inclus.filter((p) => taille(p) > 2097152); ok(!gros.length, 'aucun fichier inclus de plus de 2 Mo', gros.map((p) => p + ' ' + mo(taille(p))).join(', '));
// Dépendances connues : les deux rapports non suivis protégés au manifeste d'empreintes, A10, versions-finales-2/, le contrôle du périmètre opérationnel
const MAN = W + 'empreintes-rapports-arbitres.json'; const manifeste = Object.keys(JSON.parse(readFileSync(join(root, MAN), 'utf8')).empreintes);
const suivis = new Set(L(git('ls-files'))); const manNonSuivis = manifeste.filter((p) => !suivis.has(p));
ok(manNonSuivis.every((p) => inclus.includes(p)), 'empreintes : les ' + manNonSuivis.length + ' rapports du manifeste non suivis à HEAD sont inclus', manNonSuivis.join(', ') + ' ; manifeste : ' + manifeste.length + ' entrées');
const DEP = ['docs/conception/addendum-A10-interrogatif.md', W + 'versions-finales-2/manifeste.json', W + 'versions-finales-2/depart/docs/relecture/reprise-A2-05.md', W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs'];
ok(DEP.every((p) => inclus.includes(p)), 'dépendances du relais et des contrôles en service incluses (A10, versions-finales-2/, contrôle du périmètre opérationnel)', DEP.filter((p) => !inclus.includes(p)).join(', ') || DEP.length + ' sur ' + DEP.length);

// 2. Simulation complète : dépôt nu (distant simulé), clone de travail (HEAD réel, puis les inclus seuls), six états, deux restaurations
const tmp = mkdtempSync(join(tmpdir(), 'ocha-pt1-')); const NU = join(tmp, 'distant.git'), S = join(tmp, 'sim');
spawn('git', ['clone', '--quiet', '--bare', root, NU]);
spawn('git', ['clone', '--quiet', '--no-checkout', '--branch', 'ocha-v2', NU, S]); spawn('git', ['read-tree', 'HEAD'], S);
for (const p of L(git('ls-files'))) { mkdirSync(dirname(join(S, p)), { recursive: true }); cpSync(join(root, p), join(S, p)); }
for (const p of ajoutes.filter((x) => x !== GA)) { mkdirSync(dirname(join(S, p)), { recursive: true }); cpSync(join(root, p), join(S, p)); }
spawn('git', ['update-index', '-q', '--refresh'], S); cpSync(join(root, GA), join(S, GA));
const node = (d, s, ...a) => { const x = spawnSync(process.execPath, [join(d, s), d, ...a], { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 }); const o = ((x.stdout ?? '') + (x.stderr ?? '')).trim(); return { code: x.status, fin: o.split('\n').pop().slice(0, 160), ids: o.split('\n').map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join(', '), o }; };
const CTRL = [['empreintes', W + 'empreintes-lot3.mjs'], ['couverture', W + 'couverture-lot3.mjs'], ['pilote', W + 'controle-bilan-pilote.mjs'], ...[5, 6, 7, 8, 9].map((n) => ['recalcul T' + n, W + 'recalcul-T' + n + '-perimetre.mjs']), ['périmètre opérationnel', W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs']];
const tests = (d) => { const t = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 }); const n = (k) => ((t.stdout ?? '').match(new RegExp('^. ' + k + ' (\\d+)$', 'm')) ?? [])[1]; return { ok: t.status === 0 && n('tests') === '510' && n('pass') === '510', d: (n('tests') ?? '?') + ' tests, ' + (n('pass') ?? '?') + ' réussis, ' + (n('fail') ?? '?') + ' en échec' }; };
// Le contrôle du périmètre opérationnel exige « HEAD à 39cce13 » (ligne 85) : après tout commit, cette seule vérification tombe, structurellement (contrôle de trace)
const PEROP = 'périmètre opérationnel', PEROP_HEAD = 'HEAD à 39cce13';
const batterie = (d, nom, rel, strict, avecTests) => {
  const apresCommit = spawn('git', ['rev-parse', 'HEAD'], d).out.trim() !== AVANT;
  for (const [k, s] of CTRL) {
    const r = node(d, s);
    if (k === PEROP && apresCommit) { const e = r.o.split('\n').filter((l) => /^ÉCART/.test(l)).map((l) => l.replace(/^ÉCART\s+/, '').trim()); ok(r.code === 1 && e.length === 1 && e[0] === PEROP_HEAD && r.fin === '28 conformes sur 29', nom + ' : ' + k + ', écart attendu « ' + PEROP_HEAD + ' » seul (contrôle de trace)', r.fin + ' ; écarts : ' + e.join(' | ')); }
    else ok(r.code === 0, nom + ' : ' + k, 'code ' + r.code + ' ; ' + r.fin);
  }
  const n = node(d, W + 'controle-relais-allege.mjs', '--apres-application'); ok(n.ids === rel, nom + ' : relais normal, écarts attendus : ' + (rel || 'aucun'), n.fin + ' ; écarts : ' + (n.ids || 'aucun'));
  const st = node(d, W + 'controle-relais-allege.mjs', '--apres-application', '--strict'); ok(st.ids === strict, nom + ' : relais --strict, écarts attendus : ' + (strict || 'aucun'), st.fin + ' ; écarts : ' + (st.ids || 'aucun'));
  const ap = node(d, W + 'sync-stable.mjs', '--apercu'); ok(ap.code === 0, nom + ' : aperçu de synchronisation', (ap.o.match(/plan [0-9a-f]{16}[^\n]*/) ?? [ap.fin])[0]);
  if (avecTests) { for (const a of ['assemble', 'verify']) { const r = spawnSync(process.execPath, [join(d, 'tools/reconstruction/run.mjs'), a], { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(r.status === 0, nom + ' : run.mjs ' + a, 'code ' + r.status); } const t = tests(d); ok(t.ok, nom + ' : suite de tests', t.d); }
};
// Recalculs de T2 à T4, hors du suivi : seule leur identité avec le dépôt réel est exigée (comme le 2026-11-02)
const hist = (d) => [2, 3, 4].map((n) => { const r = node(d, W + 'recalcul-T' + n + '-perimetre.mjs'); return 'T' + n + ' code ' + r.code + ', ' + r.o.split('\n').filter((l) => /^ÉCART/.test(l)).length + ' écart(s)'; }).join(' ; ');
const H0 = hist(root); ok(hist(S) === H0, 'recalculs de T2 à T4, hors du suivi : mêmes résultats que sur le dépôt réel', H0);
// État 0 : inclus seuls, avant commit (C9b attendu, comme sur le dépôt réel)
batterie(S, 'inclus seuls, avant commit', 'C9b', 'C9b', true);
// État 1 : commit N, par liste explicite
writeFileSync(join(tmp, 'liste.txt'), inclus.join('\n') + '\n'); const avantOctets = Object.fromEntries(inclus.map((p) => [p, sha(readFileSync(join(S, p)))]));
const add = spawn('git', ['-c', 'core.safecrlf=false', 'add', '--pathspec-from-file=' + join(tmp, 'liste.txt')], S);
const st = L(spawn('git', ['-c', 'core.quotepath=false', 'diff', '--cached', '--no-renames', '--name-status'], S).out).map((l) => l.split('\t'));
const par = (s) => st.filter(([x]) => x === s).map(([, p]) => p).sort(); const memes = (a, b) => JSON.stringify(a) === JSON.stringify([...b].sort());
ok(add.code === 0 && memes(par('M'), modifies) && memes(par('A'), ajoutes) && st.length === inclus.length, 'index simulé : seuls les inclus, aucune renormalisation d\'un fichier suivi hors liste', par('M').length + ' modifiés, ' + par('A').length + ' ajoutés, ' + st.filter(([x]) => !'MA'.includes(x)).length + ' autre(s)');
const id = ['-c', 'user.name=simulation', '-c', 'user.email=simulation'];
const c1 = spawn('git', [...id, 'commit', '--quiet', '--no-verify', '-m', MESSAGE], S); const N = spawn('git', ['rev-parse', 'HEAD'], S).out.trim();
const statN = spawn('git', ['show', '--shortstat', '--format=', 'HEAD'], S).out.trim();
ok(c1.code === 0 && spawn('git', ['rev-parse', 'HEAD~1'], S).out.trim() === AVANT, 'état 1 : commit N simulé, parent 39cce13', statN);
// Arbre « propre » aux restes connus près : la trace suivie `-text` à fins de ligne mixtes, faux « modifié » dès que son horodatage change (dossier du 2026-11-02, §7),
// et l'aperçu de synchronisation, non suivi, recréé par sync-stable.mjs ; tout autre chemin est un écart
const TRACE = W + 'proposition-CLAUDE-md-section5.diff', APERCU = W + 'sync-stable-apercu.md';
const reste = (d) => L(spawn('git', ['-c', 'core.quotepath=false', 'status', '--porcelain'], d).out).map((l) => l.slice(3)).filter((p) => p !== TRACE && p !== APERCU);
const traceIntacte = (d) => spawn('git', ['diff', '--quiet', AVANT, 'HEAD', '--', TRACE], d).code === 0;
ok(inclus.every((p) => sha(readFileSync(join(S, p))) === avantOctets[p]) && !reste(S).length && traceIntacte(S), 'état 1 : octets de travail inchangés ; arbre propre, hors faux « modifié » connu de la trace suivie, dont le blob n\'est pas dans le commit', inclus.length + ' fichiers' + (reste(S).length ? ' ; restes : ' + reste(S).join(', ') : ''));
batterie(S, 'état 1, commit N non poussé', '', 'C5a', false);
// État 2 : push vers le distant simulé
const p1 = spawn('git', ['push', '--quiet', 'origin', 'ocha-v2'], S); ok(p1.code === 0, 'état 2 : push simulé vers le dépôt nu', p1.err.trim().slice(0, 100));
batterie(S, 'état 2, N poussé, référence non déclarée', '', 'C5a', false);
// États 3 à 6 : déclaration, commit de clôture, second push, vérification (cloture-checkpoint.mjs, inchangé)
const decl = node(S, W + 'cloture-checkpoint.mjs', '--declarer', N, '--libelle', LIBELLE); ok(decl.code === 0, 'état 3 : déclaration de la référence (cloture-checkpoint.mjs --declarer)', decl.fin);
ok(memes(reste(S), [W + 'references-git.json']), 'état 3 : seul `references-git.json` modifié (hors trace et aperçu connus)', reste(S).join(', '));
const c2 = spawn('git', [...id, 'commit', '--quiet', '--no-verify', '-m', 'Docs: cloture du checkpoint A2-05, reference ' + N.slice(0, 7) + ' declaree', '--', W + 'references-git.json'], S);
ok(c2.code === 0 && spawn('git', ['show', '--name-only', '--format=', 'HEAD'], S).out.trim() === W + 'references-git.json' && traceIntacte(S), 'état 4 : commit de clôture simulé, le seul `references-git.json` ; blob de la trace suivie inchangé depuis 39cce13');
const p2 = spawn('git', ['push', '--quiet', 'origin', 'ocha-v2'], S); ok(p2.code === 0, 'état 5 : second push simulé');
const ver = node(S, W + 'cloture-checkpoint.mjs', '--verifier'); ok(ver.code === 0, 'état 6 : cloture-checkpoint.mjs --verifier', ver.fin);
batterie(S, 'état 6, clôture vérifiée', '', '', true);
// Restaurations depuis le distant simulé, sous les deux valeurs de core.autocrlf : octets comparés à l'état de travail
const fichiersS = L(spawn('git', ['-c', 'core.quotepath=false', 'ls-files'], S).out);
const restaurer = (val) => {
  const d = join(tmp, 'restauration-' + val); const cl = spawn('git', ['clone', '--quiet', '-c', 'core.autocrlf=' + val, '--branch', 'ocha-v2', NU, d]);
  const diff = fichiersS.filter((p) => !existsSync(join(d, p)) || !readFileSync(join(S, p)).equals(readFileSync(join(d, p)))); const zone = diff.filter((p) => ZONES.test(p));
  ok(cl.code === 0 && !spawn('git', ['status', '--porcelain'], d).out.trim(), 'restauration core.autocrlf=' + val + ' : clone complet, arbre propre', fichiersS.length + ' fichiers suivis');
  const e = JSON.parse(readFileSync(join(d, MAN), 'utf8')).empreintes; const bons = Object.entries(e).filter(([p, h]) => existsSync(join(d, p)) && sha(readFileSync(join(d, p))) === h).length;
  ok(bons === Object.keys(e).length, 'restauration core.autocrlf=' + val + ' : empreintes du manifeste', bons + ' sur ' + Object.keys(e).length);
  ok(['docs/conception/addendum-A10-interrogatif.md', 'docs/conception/00-sommaire.md', 'ETAT-ACTUEL.md', 'ROADMAP.md'].every((p) => !diff.includes(p)), 'restauration core.autocrlf=' + val + ' : A10, sommaire, ETAT-ACTUEL.md et ROADMAP.md identiques à l\'octet');
  constat('restauration core.autocrlf=' + val + ' : ' + diff.length + ' fichier(s) d\'octets différents, dont ' + zone.length + ' dans a2-05-travail/, docs/, reconstruction/, data/ et les documents de tête' + (zone.length ? ' : ' + zone.join(', ') : ''));
  batterie(d, 'restauration core.autocrlf=' + val, '', '', true);
  return { val, diff: diff.length, zone };
};
const RT = restaurer('true'), RF = restaurer('false');
rmSync(tmp, { recursive: true, force: true });
ok(git('rev-parse', 'HEAD').trim() === tete && !L(git('diff', '--cached', '--name-only')).length && JSON.stringify(L(git('diff', '--name-only'))) === JSON.stringify(modifies), 'dépôt réel : HEAD, index et fichiers suivis modifiés inchangés');

// 3. Sorties, dans le seul dossier de la préparation
const parClasse = REGLES.map(([k, , d]) => { const l = exclus.filter((p) => classe(p) === k); return { classe: k, regle: d, fichiers: l.length, octets: somme(l) }; });
const groupe = (p) => { const s = p.split('/'); if (s[0] === 'docs') return s.slice(0, 2).join('/') + '/'; if (s[0] === 'a2-05-travail' && s.length > 3 && ['arbitrage-F', 'omissions-temps3', 'volet3-cadrage'].includes(s[1])) return s.slice(0, 3).join('/') + '/'; if (s[0] === 'a2-05-travail' && s.length > 2) return s.slice(0, 2).join('/') + '/'; return s.length > 1 ? s[0] + '/ (racine)' : '(racine du dépôt)'; };
const grp = {}; for (const p of ajoutes) (grp[groupe(p)] ??= []).push(p);
writeFileSync(join(root, OUT, 'chemins-inclus-' + VAR + '.txt'), inclus.join('\n') + '\n'); writeFileSync(join(root, OUT, 'chemins-exclus-' + VAR + '.txt'), exclus.join('\n') + '\n');
writeFileSync(join(root, OUT, 'inventaire-' + VAR + '.json'), JSON.stringify({ variante: VAR, etat: { branche, head: tete, origin: suivi, distant }, modifies: modifies.map((p) => ({ chemin: p, plus: numstat[p]?.[0], moins: numstat[p]?.[1] })), nonSuivis: nonSuivis.length, ajoutes: ajoutes.length, octetsAjoutes: somme(ajoutes), inclus: inclus.length, exclus: exclus.length, groupesAjoutes: Object.fromEntries(Object.entries(grp).sort().map(([k, l]) => [k, { fichiers: l.length, octets: somme(l) }])), parClasse, manifesteNonSuivis: manNonSuivis, commitN: { message: MESSAGE, stat: statN }, libelle: LIBELLE, restaurations: [RT, RF], controles: C }, null, 1) + '\n');
console.log('inclus ' + inclus.length + ' (' + modifies.length + ' modifiés, ' + ajoutes.length + ' ajoutés, ' + mo(somme(ajoutes)) + ') ; exclus ' + exclus.length + ' ; ' + C.filter((c) => c.ok).length + ' conformes, ' + ko + ' écart(s)');
console.log(ko ? ko + ' écart(s)' : 'inventaire conforme, variante ' + VAR);
process.exit(ko ? 1 : 0);
