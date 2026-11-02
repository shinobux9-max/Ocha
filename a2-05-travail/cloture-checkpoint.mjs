// A2-05 : clôture d'un checkpoint Git : seul chemin prévu pour déclarer une référence dans references-git.json. PROPOSITION.
// Usage : node a2-05-travail/cloture-checkpoint.mjs <racine du dépôt> --declarer <commit> --libelle "<texte>"
//         node a2-05-travail/cloture-checkpoint.mjs <racine du dépôt> --verifier
//         node a2-05-travail/cloture-checkpoint.mjs <racine du dépôt> --etat
// Toute clôture exige --verifier, qui lance le relais en --strict : un relais normal à 30 sur 30 n'en est jamais la preuve.
// États : 1 commit N non poussé ; 2 N poussé, référence non déclarée ; 3 référence déclarée, non committée ; 4 commit de clôture non poussé ; 5 clôture poussée, --verifier à lancer.
// --declarer exige HEAD = le commit = origin/ocha-v2 = le distant réel (git ls-remote), un index vide, une référence qui descend de la précédente et un relais à 30 sur 30,
// écrit la référence, lance le relais en --strict, et restaure le fichier si ce contrôle échoue. Il n'indexe, ne committe et ne pousse rien.
// --verifier, après le commit de clôture et son push, refuse tout état où le relais --strict n'est pas à 30 sur 30.
// Le sceau détecte un oubli ou une écriture à la main ; ce n'est pas une preuve cryptographique. Aucun mode ne contourne le contrôle strict. Code 1 à tout refus.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', REF = W + 'references-git.json', REL = W + 'controle-relais-allege.mjs', BRANCHE = 'ocha-v2', TOUT = '30 conformes sur 30';
const arg = (n) => { const i = process.argv.indexOf(n); return i < 0 ? null : process.argv[i + 1] ?? ''; };
const refuser = (m) => { console.log('REFUS : ' + m); process.exit(1); };
const git = (...a) => { const r = spawnSync('git', a, { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: (r.stdout ?? '').trim() }; };
const relais = (...o) => { const r = spawnSync(process.execPath, [join(root, REL), root, '--apres-application', ...o], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, fin: ((r.stdout ?? '') + (r.stderr ?? '')).trim().split('\n').pop() }; };
const ancetre = (a, b) => spawnSync('git', ['merge-base', '--is-ancestor', a, b], { cwd: root }).status === 0;
const sceau = (c, d) => createHash('sha256').update(['checkpoint', c, d, 'strict'].join('|')).digest('hex');
const distantReel = () => { const r = git('ls-remote', 'origin', 'refs/heads/' + BRANCHE); const h = r.out.split(/\s/)[0]; if (r.code !== 0 || !/^[0-9a-f]{40}$/.test(h ?? '')) refuser('distant réel injoignable ou branche absente'); return h; };
if (!existsSync(join(root, REF))) refuser('fichier de références absent');
const lireRefs = () => JSON.parse(readFileSync(join(root, REF), 'utf8'));
const etat = () => ({ branche: git('branch', '--show-current').out, head: git('rev-parse', 'HEAD').out, orig: git('rev-parse', 'origin/' + BRANCHE).out, index: git('diff', '--cached', '--name-only').out });

if (process.argv.includes('--declarer')) {
  const commit = arg('--declarer'), libelle = arg('--libelle');
  if (!/^[0-9a-f]{40}$/.test(commit ?? '')) refuser('commit attendu en toutes lettres, 40 caractères');
  if (!libelle) refuser('libellé attendu');
  const e = etat(); if (e.branche !== BRANCHE) refuser('branche ' + e.branche);
  if (e.index) refuser('index non vide');
  if (e.head !== commit) refuser('HEAD ' + e.head.slice(0, 7) + ' différent du commit déclaré');
  if (e.orig !== commit) refuser('origin/' + BRANCHE + ' ' + e.orig.slice(0, 7) + ' différent du commit déclaré : push à faire d\'abord');
  const d = distantReel(); if (d !== commit) refuser('distant réel ' + d.slice(0, 7) + ' différent du commit déclaré');
  const brut = readFileSync(join(root, REF)); const refs = JSON.parse(brut.toString('utf8')); const prec = refs.checkpoint?.commit ?? refs.historique?.commit;
  if (!prec || prec === commit || !ancetre(prec, commit)) refuser('le commit ne descend pas de la référence précédente');
  const r0 = relais(); if (r0.code !== 0) refuser('relais avant déclaration : ' + r0.fin);
  refs.checkpoint = { commit, date: new Date().toISOString().slice(0, 10), libelle, verification: { head: e.head, origin_local: e.orig, distant_reel: d, sceau: sceau(commit, d) } };
  writeFileSync(join(root, REF), JSON.stringify(refs, null, 1) + '\n');
  const r1 = relais('--strict'); if (r1.code !== 0 || r1.fin !== TOUT) { writeFileSync(join(root, REF), brut); refuser('relais --strict : ' + r1.fin + ' ; déclaration annulée, fichier restauré'); }
  console.log('déclaration conforme : ' + commit + ' ; commit de clôture à faire, sur autorisation, puis --verifier');
} else if (process.argv.includes('--verifier')) {
  const e = etat(); const refs = lireRefs(); const c = refs.checkpoint; if (!c) refuser('aucun checkpoint déclaré');
  if (c.verification?.head !== c.commit || c.verification?.distant_reel !== c.commit || c.verification?.sceau !== sceau(c.commit, c.commit)) refuser('déclaration sans contrôle strict : sceau absent ou faux');
  if (e.index) refuser('index non vide');
  if (git('status', '--porcelain', '--', REF).out) refuser('référence non committée');
  if (e.head !== e.orig) refuser('commits non poussés');
  const d = distantReel(); if (d !== e.head) refuser('distant réel ' + d.slice(0, 7) + ' différent de HEAD');
  const suite = git('diff', '--name-only', c.commit, e.head).out.split('\n').filter(Boolean); if (suite.some((p) => p !== REF)) refuser('commit non déclaré après la référence : ' + suite.filter((p) => p !== REF).join(', '));
  const r = relais('--strict'); if (r.code !== 0 || r.fin !== TOUT) refuser('relais --strict : ' + r.fin);
  console.log('clôture conforme : référence ' + c.commit.slice(0, 7) + ' ; HEAD et distant réel ' + d.slice(0, 7) + ' ; relais --strict ' + r.fin);
} else if (process.argv.includes('--etat')) {
  const e = etat(); const refs = lireRefs(); const c = refs.checkpoint?.commit ?? null, courante = c ?? refs.historique?.commit;
  const suite = git('diff', '--name-only', courante, e.head).out.split('\n').filter(Boolean), neuf = git('status', '--porcelain', '--', REF).out, seulRef = suite.length && suite.every((p) => p === REF);
  const texte = neuf && c === e.head ? '3. référence déclarée, non committée : commit de clôture à faire' : e.head !== e.orig ? (seulRef ? '4. commit de clôture non poussé : second push à faire' : '1. commit non poussé : push à faire') : seulRef ? '5. clôture poussée : --verifier à lancer' : suite.length ? '2. commit poussé, référence non déclarée : --declarer à lancer' : '0. aucun commit depuis la référence';
  console.log('état ' + texte + '\nle relais normal à 30 sur 30 ne prouve pas une clôture : seul --verifier la constate');
} else refuser('mode attendu : --declarer, --verifier ou --etat ; aucun mode ne contourne le contrôle strict');
