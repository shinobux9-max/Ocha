// A2-05 : diagnostic du défaut de restauration lié aux fins de ligne, EN LECTURE SEULE sur le dépôt réel : rien n'y est indexé, committé ni corrigé. Les commits et les fichiers `.gitattributes`
// candidats n'existent que dans des clones temporaires, supprimés ensuite. Six restaurations : sans attributs, attributs ciblés, attributs globaux ; chacune en core.autocrlf=true et false.
// Pour chacune : octets restaurés comparés à l'état de travail, fichier par fichier ; 45 empreintes ; contrôles en service ; verify ; assemblage ; suite de tests.
// Usage : node a2-05-travail/arbitrage-F/diagnostic-eol/diagnostic-restauration.mjs <racine du dépôt>   (écrit, dans ce dossier, resultats.json et les deux candidats)
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, cpSync, rmSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', OUT = W + 'arbitrage-F/diagnostic-eol/', LISTE = W + 'arbitrage-F/checkpoint/chemins-inclus.txt', MAN = W + 'empreintes-rapports-arbitres.json';
const sha = (b) => createHash('sha256').update(b).digest('hex');
const spawn = (cmd, a, cwd) => { const r = spawnSync(cmd, a, { cwd, encoding: 'utf8', maxBuffer: 1 << 30 }); return { code: r.status, out: r.stdout ?? '', err: r.stderr ?? '' }; };
const L = (t) => t.split('\n').filter(Boolean);
const git = (cwd, ...a) => spawn('git', ['-c', 'core.quotepath=false', ...a], cwd);
const groupe = (p) => (/^docs\/rapports\/etape2-A2-05/.test(p) ? 'docs/rapports (A2-05)' : p.startsWith('docs/') ? p.split('/').slice(0, 2).join('/') : p.includes('/') ? p.split('/')[0] : '(racine)');
const tete0 = git(root, 'rev-parse', 'HEAD').out.trim();

// Base : clone temporaire, fichiers proposés, commit simulé
const tmp = mkdtempSync(join(tmpdir(), 'ocha-eol-')); const S = join(tmp, 'sim');
spawn('git', ['clone', '--quiet', '--shared', '--no-checkout', root, S], root); git(S, 'read-tree', 'HEAD');
const inclus = [...new Set([...L(readFileSync(join(root, LISTE), 'utf8')).filter((p) => existsSync(join(root, p))), ...L(git(root, 'diff', '--name-only').out)])]; const tous = [...new Set([...L(git(root, 'ls-files').out), ...inclus])];
for (const p of tous) { mkdirSync(dirname(join(S, p)), { recursive: true }); cpSync(join(root, p), join(S, p)); }
writeFileSync(join(tmp, 'liste.txt'), inclus.join('\n') + '\n');
const add = git(S, '-c', 'core.safecrlf=false', 'add', '--pathspec-from-file=' + join(tmp, 'liste.txt'));
const com = git(S, '-c', 'user.name=simulation', '-c', 'user.email=simulation', 'commit', '--quiet', '--no-verify', '-m', 'simulation');
console.log('commit simulé : add ' + add.code + ', commit ' + com.code);
const verite = Object.fromEntries(tous.map((p) => [p, sha(readFileSync(join(S, p)))]));

// Inventaire des fins de ligne
const eol = L(git(S, 'ls-files', '--eol').out).map((l) => { const m = l.match(/^i\/(\S+)\s+w\/(\S+)\s+attr\/\S*\s+(?:\S+\s+)?\t?(.+)$/) ?? l.match(/^i\/(\S+)\s+w\/(\S+)\s+attr\/.*?\t(.+)$/); return m ? { i: m[1], w: m[2], p: m[3].trim() } : null; }).filter(Boolean);
const compte = {}; for (const e of eol) { const k = 'i/' + e.i + ' w/' + e.w; compte[k] = (compte[k] ?? 0) + 1; }
const crlf = eol.filter((e) => e.w === 'crlf').map((e) => e.p).sort(), mixtes = eol.filter((e) => e.w === 'mixed' || e.i === 'mixed').map((e) => e.p).sort(), stockeCrlf = eol.filter((e) => e.i === 'crlf').map((e) => e.p).sort();
const parG = {}; for (const e of eol) { const g = groupe(e.p); parG[g] = parG[g] ?? { lf: 0, crlf: 0, autre: 0 }; parG[g][e.w === 'lf' ? 'lf' : e.w === 'crlf' ? 'crlf' : 'autre']++; }
console.log(JSON.stringify(compte));

// Candidats, jamais posés dans le dépôt réel
const entete = '# Candidat de diagnostic, non appliqué : figer à la restauration les octets de l\'état de travail, quelle que soit la configuration du poste.\n';
// Chemins ancrés à la racine : sans barre initiale, un motif capturerait aussi un fichier de même nom plus bas (docs/legacy/ETAT-ACTUEL.md). Les fichiers stockés en CRLF
// (sources figées) et les fichiers mixtes restent sous -text : aucune conversion, aucun blob réécrit.
const lignesCrlf = crlf.filter((p) => !mixtes.includes(p) && !stockeCrlf.includes(p)).map((p) => '/' + p + ' text eol=crlf');
const ZONES = /^\/(a2-05-travail|docs|reconstruction|data)\/|^\/[^/]+\.md /;
const CIBLE = entete + ['/a2-05-travail/** -text', '/docs/** -text', '/reconstruction/** -text', '/data/** -text', ...lignesCrlf.filter((l) => ZONES.test(l))].join('\n') + '\n';
const GLOBAL = entete + ['* -text', ...lignesCrlf].join('\n') + '\n';
const branche = (nom, texte) => { git(S, 'checkout', '--quiet', '-B', nom, 'master'); writeFileSync(join(S, '.gitattributes'), texte); git(S, 'add', '.gitattributes'); const rn = git(S, '-c', 'core.safecrlf=false', 'add', '--renormalize', '.'); const touches = L(git(S, 'diff', '--cached', '--name-only').out); git(S, '-c', 'user.name=simulation', '-c', 'user.email=simulation', 'commit', '--quiet', '--no-verify', '-m', nom); const st = L(git(S, 'status', '--porcelain').out); return { renormalize: rn.code, fichiersDuCommit: touches, status: st.length }; };
const base = git(S, 'branch', '--show-current').out.trim(); git(S, 'branch', '-f', 'master', base);
const effets = { cible: branche('cible', CIBLE), global: branche('global', GLOBAL) }; git(S, 'checkout', '--quiet', 'master'); rmSync(join(S, '.gitattributes'), { force: true });
console.log(JSON.stringify(effets));

const CTRL = { couverture: [W + 'couverture-lot3.mjs'], empreintes: [W + 'empreintes-lot3.mjs'], pilote: [W + 'controle-bilan-pilote.mjs'], ...Object.fromEntries([5, 6, 7, 8, 9].map((n) => ['T' + n, [W + 'recalcul-T' + n + '-perimetre.mjs']])), relais: [W + 'controle-relais-allege.mjs', '--apres-application'] };
const man = JSON.parse(readFileSync(join(root, MAN), 'utf8')).empreintes;
const sonder = (nom, br, autocrlf) => {
  const d = join(tmp, nom); const c = spawn('git', ['clone', '--quiet', '-c', 'core.autocrlf=' + autocrlf, '--branch', br, S, d], tmp);
  const diff = tous.filter((p) => !existsSync(join(d, p)) || sha(readFileSync(join(d, p))) !== verite[p]);
  const parGroupe = {}; for (const p of diff) { const g = groupe(p); parGroupe[g] = (parGroupe[g] ?? 0) + 1; }
  const emp = Object.entries(man).filter(([p, h]) => existsSync(join(d, p)) && sha(readFileSync(join(d, p))) === h).length;
  const R = Object.fromEntries(Object.entries(CTRL).map(([k, [s, ...a]]) => { const x = spawnSync(process.execPath, [join(d, s), d, ...a], { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 }); const o = ((x.stdout ?? '') + (x.stderr ?? '')).trim(); return [k, { code: x.status, fin: o.split('\n').pop().slice(0, 110), ecarts: o.split('\n').filter((l) => /^\s*(ÉCART|FAUX)/.test(l)).map((l) => l.trim().slice(0, 240)) }]; }));
  const run = (a) => { const x = spawnSync(process.execPath, [join(d, 'tools/reconstruction/run.mjs'), a], { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, fin: ((x.stdout ?? '') + (x.stderr ?? '')).trim().split('\n').pop().slice(0, 110) }; };
  const verify = run('verify'), assemble = run('assemble');
  const t = spawnSync(process.execPath, ['--test', 'tests/**/*.test.js'], { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 }); const m = (k) => +((((t.stdout ?? '') + (t.stderr ?? '')).match(new RegExp('^(?:# |ℹ )' + k + ' (\\d+)', 'm')) ?? [])[1] ?? -1);
  const eTests = ((t.stdout ?? '') + (t.stderr ?? '')).split('\n').filter((l) => /^(✖|not ok) /.test(l)).map((l) => l.slice(0, 110)).filter((l, k, a) => a.indexOf(l) === k).slice(0, 14);
  const st = L(git(d, 'status', '--porcelain').out).length;
  const res = { nom, branche: br, autocrlf, clone: c.code, octetsDifferents: diff.length, total: tous.length, parGroupe, exemples: diff.slice(0, 8), empreintes: emp, statusGit: st, controles: Object.fromEntries(Object.entries(R).map(([k, r]) => [k, r.code])), relais: R.relais, ecartsAutres: Object.fromEntries(Object.entries(R).filter(([k, r]) => k !== 'relais' && r.code).map(([k, r]) => [k, r.fin])), verify, assemble, tests: { total: m('tests'), pass: m('pass'), fail: m('fail'), echecs: eTests } };
  console.log(nom + ' : octets différents ' + diff.length + '/' + tous.length + ' ; empreintes ' + emp + '/45 ; relais ' + R.relais.fin + ' ; verify ' + verify.code + ' ; tests ' + res.tests.pass + '/' + res.tests.total + ' ; status ' + st);
  rmSync(d, { recursive: true, force: true }); return res;
};
const resultats = [sonder('sans-true', 'master', 'true'), sonder('sans-false', 'master', 'false'), sonder('cible-true', 'cible', 'true'), sonder('cible-false', 'cible', 'false'), sonder('global-true', 'global', 'true'), sonder('global-false', 'global', 'false')];
rmSync(tmp, { recursive: true, force: true });
const d = join(root, OUT);
writeFileSync(join(d, 'gitattributes-candidat-cible.txt'), CIBLE); writeFileSync(join(d, 'gitattributes-candidat-global.txt'), GLOBAL);
writeFileSync(join(d, 'resultats.json'), JSON.stringify({ date: '2026-11-01', head: tete0, fichiers: tous.length, configuration: { autocrlfSysteme: git(root, 'config', '--get', 'core.autocrlf').out.trim(), gitattributes: existsSync(join(root, '.gitattributes')) }, compte, parGroupe: parG, crlf, mixtes, stockeCrlf, effets, resultats }, null, 1) + '\n');
console.log('HEAD réel ' + git(root, 'rev-parse', 'HEAD').out.trim().slice(0, 12) + ' ; index ' + L(git(root, 'diff', '--cached', '--name-only').out).length + ' ; .gitattributes réel ' + existsSync(join(root, '.gitattributes')));
