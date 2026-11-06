// A2-05 : essai de la correction proposée de C5e et Q7 (contrôle du relais), sur copie jetable de l'état réel, jamais sur le dépôt réel. PROPOSITION, non appliquée.
// Compare, état par état, le contrôle installé et le contrôle proposé : écarts attendus seuls, ni plus ni moins. La consignation §8.118 est appliquée dans la copie seulement.
// Usage : node a2-05-travail/arbitrage-F/correction-C5e-Q7/essayer-correction-C5e-Q7.mjs <racine du dépôt>
import { readFileSync, writeFileSync, rmSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { cloner, EXCLUS } from '../essai-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', REL = W + 'controle-relais-allege.mjs', PROP = W + 'arbitrage-F/correction-C5e-Q7/proposition/controle-relais-allege.mjs', CONS = W + 'arbitrage-F/consignation-installation-A10/application/appliquer-consignation-A10.mjs';
const ETAT = 'ETAT-ACTUEL.md', SOM = 'docs/conception/00-sommaire.md', A10 = 'docs/conception/addendum-A10-interrogatif.md', CAND = W + 'reprise-A2-05-allegee-candidat.md', APERCU = W + 'sync-stable-apercu.md';
const INSTALLE = 'b91ed6ddf43ef7e2aabc52ad14725a7c8b6359f76fa5e26f473be4806b72a4dc';
const sha = (b) => createHash('sha256').update(b).digest('hex');
const instantane = (r) => { const h = {}; const m = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e; if (!d && EXCLUS.includes(e)) continue; if (p.endsWith('.zip') || p === APERCU) continue; if (statSync(join(r, p)).isDirectory()) m(p); else h[p] = sha(readFileSync(join(r, p))); } }; m(''); return h; };
const ecarts = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };

ok(sha(readFileSync(join(root, REL))) === INSTALLE, 'contrôle réel = contrôle installé', INSTALLE.slice(0, 16));
const reel0 = instantane(root); const cl = cloner(root); const { C, f } = cl;
const g = (...a) => spawnSync('git', ['-c', 'user.name=essai', '-c', 'user.email=essai', ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 });
// Artefact du clone seul, neutralisé comme dans `essai-refus-clone.mjs` : octets contrôlés identiques au dépôt réel
const modifies = (r) => spawnSync('git', ['-c', 'core.quotepath=false', 'diff', '--name-only'], { cwd: r, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout.trim().split('\n').filter(Boolean);
const artefacts = modifies(C).filter((p) => !modifies(root).includes(p));
ok(artefacts.every((p) => readFileSync(f(p)).equals(readFileSync(join(root, p)))), 'artefacts du clone : octets identiques au dépôt réel', artefacts.join(', ') || 'aucun');
if (artefacts.length) g('update-index', '--assume-unchanged', '--', ...artefacts);
const installe = readFileSync(f(REL)), propose = readFileSync(join(root, PROP));
// Le contrôle proposé n'est posé dans la copie que le temps d'un lancement ; la copie garde le contrôle installé, que la consignation exige (I3)
const relais = (version, ...o) => { writeFileSync(f(REL), version === 'proposé' ? propose : installe); const r = cl.lancer(REL, '--apres-application', ...o); writeFileSync(f(REL), installe);
  const L = r.out.split('\n'); const ids = L.map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join();
  return { ids, q7: (L.find((l) => / Q7 /.test(l)) ?? '').trim(), c5e: (L.find((l) => /^\S+\s+C5e /.test(l)) ?? '').trim(), fin: L.pop() }; };
const etat = (nom, version, attendus, o = []) => { const r = relais(version, ...o); ok(r.ids === attendus, nom + ' — contrôle ' + version + (o.length ? ' ' + o.join(' ') : '') + ' : écarts ' + (attendus || 'aucun'), r.fin + ' ; écarts : ' + (r.ids || 'aucun')); console.log('   ' + r.c5e.slice(0, 220)); console.log('   ' + r.q7); };
const sabote = (p, a, b, fn) => { const o = readFileSync(f(p)); const t = o.toString('utf8'); const m = t.replace(a, () => b); if (m === t) ok(false, 'sabotage sans effet : ' + p); writeFileSync(f(p), m); fn(); writeFileSync(f(p), o); };

console.log('--- E1 état réel : A10 installé, consignation non appliquée');
etat('E1', 'installé', 'C9b');
etat('E1', 'proposé', 'C5e,C8,C9b');

console.log('--- E2 consignation §8.118 appliquée, dans la copie seulement');
const rc = spawnSync(process.execPath, [f(CONS), C], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(rc.status === 0, 'consignation appliquée dans la copie', 'code ' + rc.status + (rc.status ? ' ; ' + (rc.stdout.split('\n').find((l) => /^ÉCART/.test(l)) ?? '').slice(0, 160) : ''));
const date = (readFileSync(f(ETAT), 'utf8').match(/\*\*Addendum A10 adopté et installé le (\d{4}-\d{2}-\d{2})\*\*/) ?? [])[1];
etat('E2', 'installé', 'C9b');
etat('E2', 'proposé', 'C8,C9b');

console.log('--- E3 sabotages, contrôle proposé');
const avantE3 = instantane(C);
sabote(ETAT, '**Addendum A10 adopté et installé le ' + date + '**', '**Addendum A10 adopté et installé le 2000-01-01**', () => etat('E3a date d\'adoption falsifiée dans « Étape en cours »', 'proposé', 'C5e,C8,C9b'));
sabote(ETAT, /\*\*Addendum A10 adopté et installé le \d{4}-\d{2}-\d{2}\*\*/g, 'Addendum A10', () => etat('E3b adoption retirée d\'« Étape en cours »', 'proposé', 'C5e,C8,C9b'));
sabote(SOM, /^\| A10 \|.*\r?\n/m, '', () => etat('E3c A10 retiré du sommaire', 'proposé', 'C5e,C8,C9b'));
sabote(A10, '🔒 validé le ' + date, '🔒 proposé le ' + date, () => etat('E3d statut d\'A10 non validé', 'proposé', 'C5e,C8,C9b'));
const a10 = readFileSync(f(A10)); rmSync(f(A10)); etat('E3e A10 absent', 'proposé', 'C5e,C6,C9b'); writeFileSync(f(A10), a10);
sabote(CAND, '**ni adoptée ni normative**', '**adoptée (A10)**', () => etat('E3f relais candidat corrigé à la main, sans révision des versions figées', 'proposé', 'C10b,C4,C9b'));
ok(!ecarts(avantE3, instantane(C)).length, 'témoin : sabotages défaits, copie revenue à l\'état E2');

console.log('--- E4 commit simulé de sept fichiers, dans la copie seulement');
g('add', '--', A10, SOM, REL, '.gitattributes', 'docs/rapports/etape2-A2-05-bilan-volet2.md', ETAT, 'ROADMAP.md'); ok(g('commit', '--quiet', '--no-verify', '-m', 'essai').status === 0, 'commit simulé');
etat('E4', 'installé', '');
etat('E4', 'proposé', 'C8');
etat('E4', 'proposé', 'C5a,C8', ['--strict']);

console.log('--- Vérifications de la proposition');
const chk = spawnSync(process.execPath, ['--check', join(root, PROP)], { encoding: 'utf8' }); ok(chk.status === 0, 'node --check du contrôle proposé', 'code ' + chk.status);
cl.nettoyer();
const ch = ecarts(reel0, instantane(root)); ok(!ch.length, 'dépôt réel inchangé', ch.join(', ') || Object.keys(reel0).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'index réel vide');
console.log(ko ? ko + ' écart(s)' : 'essai conforme');
process.exit(ko ? 1 : 0);
