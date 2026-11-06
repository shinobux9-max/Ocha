// A2-05 : harnais d'essai d'une application sur clone jetable : refus avant écriture, exécution nominale, seconde exécution refusée, dépôt réel inchangé. Aucun effet à l'import.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { cloner, EXCLUS } from './essai-clone.mjs';

const APERCU = 'a2-05-travail/sync-stable-apercu.md';
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e; if (!d && EXCLUS.includes(e)) continue; if (p.endsWith('.zip') || p === APERCU) continue; if (statSync(join(r, p)).isDirectory()) m(p); else h[p] = createHash('sha256').update(readFileSync(join(r, p))).digest('hex'); } }; m(''); return h; };
const ecarts = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
export const espace = (o) => Buffer.concat([o, Buffer.from(' ')]);
export const inverse = (o) => { const t = o.toString('utf8'); return Buffer.from(t.includes('\r\n') ? t.replace(/\r\n/g, '\n') : t.replace(/\n/g, '\r\n'), 'utf8'); };

// `prealable(h)`, facultatif, amène le clone à l'état de départ de l'opération essayée ; `scenario(h)` joue les refus sur le clone ; `apres(h, r)`, facultatif, poursuit sur le clone après l'exécution nominale
export function essayer({ root, SCR, A, args = [], fin, cibles, prealable, scenario, apres }) {
  let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
  const reel0 = instantane(root); const cl = cloner(root); const { C, f } = cl;
  ok(!ecarts(reel0, instantane(C)).length, 'copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
  const lancer = (a = args) => { const r = spawnSync(process.execPath, [f(SCR), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
  const premier = (r) => (r.out.split('\n').find((l) => /^ÉCART/.test(l)) ?? r.out.slice(0, 125)).slice(0, 125);
  const refus = (nom, re, a) => { const av = instantane(C); const r = lancer(a); const ch = ecarts(av, instantane(C)); ok(r.code === 1 && re.test(premier(r)) && /ARRÊT/.test(r.out) && !/état atteint/.test(r.out) && !ch.length && !existsSync(f(A + 'depart')), nom, premier(r) + ' ; modifiés : ' + (ch.join(', ') || 'aucun')); };
  const altere = (nom, p, fn, re) => { const o = readFileSync(f(p)); const m = fn(o); if (m.equals(o)) ok(false, nom, 'altération sans effet'); writeFileSync(f(p), m); refus(nom, re); writeFileSync(f(p), o); };
  const g = (...a) => spawnSync('git', ['-c', 'user.name=essai', '-c', 'user.email=essai', ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 });
  // Artefact du clone seul (fichier à fins de ligne mixtes, relu sous ses attributs) : neutralisé dans l'index du clone, octets contrôlés, pour que `git diff --check` y juge comme sur le dépôt réel
  const modifies = (r) => spawnSync('git', ['-c', 'core.quotepath=false', 'diff', '--name-only'], { cwd: r, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout.trim().split('\n').filter(Boolean);
  const reels = modifies(root); const artefacts = modifies(C).filter((p) => !reels.includes(p));
  ok(artefacts.every((p) => readFileSync(f(p)).equals(readFileSync(join(root, p)))), 'artefacts du clone : octets identiques au dépôt réel, non modifiés sur lui', artefacts.join(', ') || 'aucun');
  if (artefacts.length) g('update-index', '--assume-unchanged', '--', ...artefacts);
  const h = { cl, C, f, ok, lancer, refus, altere, g, premier };
  if (prealable) prealable(h);
  const etat0 = instantane(C);
  scenario(h);
  ok(!ecarts(etat0, instantane(C)).length, 'témoin : copie revenue à l\'état de départ');
  const N = lancer();
  console.log(N.out.split('\n').filter((l) => /^(ÉCART|ARRÊT)|^conforme C/.test(l)).map((l) => '   ' + l.slice(0, 170)).join('\n'));
  const chN = ecarts(etat0, instantane(C)).filter((p) => !['depart/', 'sorties/', 'diffs-reels/'].some((x) => p.startsWith(A + x)));
  ok(N.code === 0 && fin.test(N.out), 'exécution nominale sur la copie', 'code ' + N.code + ' ; ' + N.out.split('\n').filter((l) => l.startsWith('conforme')).length + ' vérifications conformes');
  ok(JSON.stringify(chN) === JSON.stringify([...cibles].sort()), 'fichiers visés seuls modifiés, hors traces', chN.join(', '));
  const etatN = instantane(C); const r2 = lancer(); ok(r2.code === 1 && !ecarts(etatN, instantane(C)).length, 'seconde exécution refusée, sans modification', premier(r2));
  if (apres) apres(h, N);
  cl.nettoyer();
  const ch = ecarts(reel0, instantane(root)); ok(!ch.length, 'dépôt réel inchangé', ch.join(', ') || Object.keys(reel0).length + ' fichiers');
  ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'index réel vide');
  console.log(ko ? ko + ' écart(s)' : 'essai conforme');
  process.exit(ko ? 1 : 0);
}
