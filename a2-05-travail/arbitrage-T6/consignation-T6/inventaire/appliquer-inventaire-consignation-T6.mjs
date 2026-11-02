// A2-05 · volet 1 · lot 3 : application de l'unique ligne d'inventaire relue pour appliquer-consignation-T6.mjs (autorisation du 2026-10-29,
// distincte de la consolidation de T7 ; journal et bilan non modifiés pour cette seule inscription). Dérivé de appliquer-consignation-T6.mjs.
// (1) Préconditions, sans écriture : inventaire à l'empreinte relue, version proposée et diff relus à leurs empreintes, diff régénéré identique
// octet pour octet au diff relu, ligne absente, ancre unique, contrôles en service conformes, index vide. (2) Sauvegarde de l'original dans
// inventaire/application/depart/. (3) Insertion de la seule ligne relue après l'ancre, par remplacement ciblé ; résultat égal à la version
// relue. (4) Contrôles : diff réel +1/−0, contrôles en service, seul l'inventaire change dans l'arbre de travail, index vide, git diff --check.
// Arrêt au premier écart, sans réparation ; chemins de machine masqués dans la trace.
// Usage : node a2-05-travail/arbitrage-T6/consignation-T6/inventaire/appliquer-inventaire-consignation-T6.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', F = W + 'arbitrage-T6/consignation-T6/inventaire/', OUT = F + 'application/', INV = W + 'INVENTAIRE-SCRIPTS.md';
const H_DEPART = '8ad6ae0c4210a7a823d5b7c49513ae13349577c1bd896f5960ef8ed324d64746';
const H_PROPOSE = '30e18df2ab1e7707cd7c60de080b6798a9bfbc82f717fc063fe1ec842358218b';
const H_DIFF = '7ea71c823e03e48dd76a2c14689fb7d6b24a56a79e6f0b812efeec0859ae24eb';
const ANCRE = '| `arbitrage-T6/consignation-T6/preparer-consignation-T6.mjs` |';
const NOM = 'appliquer-consignation-T6.mjs';
const masquer = (l) => [[root, '<racine>'], [tmpdir(), '<temp>']].reduce((t, [p, n]) => [p, p.replace(/\\/g, '\\\\'), p.replace(/\\/g, '/'), p.replace(/\\/g, '/').replace(/ /g, '%20')].reduce((u, v) => u.split(v).join(n), t), l);
const log = []; const dire = (l) => { l = masquer(l); console.log(l); log.push(l); };
const fin = (code) => { mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'application.txt'), log.join('\n') + '\n'); process.exit(code); };
const ok = (c, quoi, detail) => { dire((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : '')); if (!c) { dire('\narrêt au premier écart, sans réparation'); fin(1); } };
process.on('uncaughtException', (e) => { dire('EXCEPTION ' + masquer(String(e?.message ?? e)).slice(0, 200)); ok(false, 'interruption'); });
const shaB = (b) => createHash('sha256').update(b).digest('hex'); const sha = (p) => shaB(readFileSync(join(root, p)));
const lire = (p) => readFileSync(join(root, p), 'utf8');
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecarts = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim());
const conformes = (r) => r.out.split('\n').filter((l) => l.startsWith('conforme ')).length;
const q = (r, n) => (r.out.match(new RegExp('^\\s+juste Q' + n + ' .*→ (.*)$', 'm')) ?? [])[1];
const diffNoIndex = (a, b) => spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', a, b], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const corps = (d) => d.slice(d.indexOf('\n@@') + 1);
const plusMoins = (d) => [d.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++ ')), d.split('\n').filter((l) => l.startsWith('-') && !l.startsWith('--- '))];
const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
  if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = sha(p); } }; marcher(''); return h; };
const differents = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const controles = () => ({ cbp: lancer(W + 'controle-bilan-pilote.mjs'), rec5: lancer(W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(W + 'recalcul-T6-perimetre.mjs'), rec7: lancer(W + 'recalcul-T7-perimetre.mjs'), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs') });
const verifier = (A, quand) => {
  for (const [k, r] of Object.entries(A)) dire('   ' + quand + ' ' + k + ' (code ' + r.code + ') : ' + (r.out.split('\n').filter((l) => !/^\s+at /.test(l)).pop() ?? ''));
  ok(A.rel.code === 0 && A.rel.out.split('\n').pop() === '30 conformes sur 30' && !ecarts(A.rel).length, quand + ' : relais --apres-application 30 sur 30');
  ok(A.emp.code === 0 && A.emp.out === 'empreintes : 39 rapports contrôlés, identiques', quand + ' : manifeste, 39 empreintes conformes');
  ok(A.cbp.code === 0 && !ecarts(A.cbp).length && conformes(A.cbp) === 46, quand + ' : contrôle du bilan du pilote 46/46');
  ok(A.rec5.code === 0 && !ecarts(A.rec5).length && conformes(A.rec5) === 17, quand + ' : recalcul de T5 17/17');
  ok(A.rec6.code === 0 && !ecarts(A.rec6).length && conformes(A.rec6) === 27, quand + ' : recalcul de T6 27/27');
  ok(A.rec7.code === 0 && !ecarts(A.rec7).length && conformes(A.rec7) === 24, quand + ' : recalcul du périmètre de T7 24/24');
  ok(A.cov.code === 0 && /^couverture : 296 arbitrés, 0 proposés, 81 restants, sur 377/.test(A.cov.out) && q(A.rel, 2) === '296/377', quand + ' : couverture 296/377, 81 restants');
  ok(q(A.rel, 4) === '196/172/0' && q(A.rel, 11) === '39', quand + ' : corrections 196 dans 172 ENTRY, aucune appliquée ; 39 rapports protégés');
};
const initial = instantane();

dire('# Préconditions (aucune écriture)');
const reel = lire(INV);
ok(sha(INV) === H_DEPART, 'inventaire actuel à l\'empreinte relue', H_DEPART.slice(0, 12) + '…');
ok(sha(F + 'INVENTAIRE-SCRIPTS.md') === H_PROPOSE, 'version proposée relue à son empreinte', H_PROPOSE.slice(0, 12) + '…');
ok(sha(F + 'INVENTAIRE-SCRIPTS.md.diff') === H_DIFF, 'diff relu à son empreinte', H_DIFF.slice(0, 12) + '…');
const reg = diffNoIndex(INV, F + 'INVENTAIRE-SCRIPTS.md');
ok(reg.status === 1 && reg.stdout === lire(F + 'INVENTAIRE-SCRIPTS.md.diff'), 'diff régénéré identique octet pour octet au diff relu');
const [p0, m0] = plusMoins(reg.stdout); ok(p0.length === 1 && !m0.length, 'diff relu : +1 / −0');
const LIGNE = p0[0].slice(1); ok(LIGNE.startsWith('| `arbitrage-T6/consignation-T6/' + NOM + '` |'), 'ligne relue : celle de ' + NOM);
ok(!reel.includes(NOM), 'ligne absente de l\'inventaire actuel');
const eol = reel.includes('\r\n') ? '\r\n' : '\n'; const L = reel.split(eol); const k = L.findIndex((l) => l.startsWith(ANCRE));
ok(k >= 0 && L.filter((l) => l.startsWith(ANCRE)).length === 1, 'ancre unique : ligne de preparer-consignation-T6.mjs', 'ligne ' + (k + 1));
ok(!existsSync(join(root, OUT, 'depart')), 'aucune application antérieure (dossier de sauvegarde absent)');
verifier(controles(), 'avant');
const idx0 = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx0.status === 0 && idx0.stdout.trim() === '', 'index vide avant l\'écriture');

dire('\n# Sauvegarde');
mkdirSync(join(root, OUT, 'depart'), { recursive: true }); copyFileSync(join(root, INV), join(root, OUT, 'depart', 'INVENTAIRE-SCRIPTS.md'));
ok(sha(OUT + 'depart/INVENTAIRE-SCRIPTS.md') === H_DEPART, 'original sauvegardé dans application/depart/');

dire('\n# Écriture');
L.splice(k + 1, 0, LIGNE); writeFileSync(join(root, INV), L.join(eol));
ok(sha(INV) === H_PROPOSE, 'inventaire égal à la version relue', H_PROPOSE.slice(0, 12) + '…');

dire('\n# Contrôles après écriture');
const d1 = diffNoIndex(OUT + 'depart/INVENTAIRE-SCRIPTS.md', INV); mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'INVENTAIRE-SCRIPTS.md.diff-reel'), d1.stdout);
const [p1, m1] = plusMoins(d1.stdout);
ok(d1.status === 1 && p1.length === 1 && p1[0] === '+' + LIGNE && !m1.length && corps(d1.stdout) === corps(reg.stdout), 'diff réel : la seule ligne relue ajoutée, aucune retirée ; hunk identique au hunk relu');
ok(lire(INV).split(eol).filter((l) => l !== LIGNE).join(eol) === reel, 'aucune ligne existante modifiée ; fins de ligne conservées', eol === '\r\n' ? 'CRLF' : 'LF');
verifier(controles(), 'après');
const ch = differents(initial, instantane());
ok(ch.length === 1 && ch[0] === INV, 'arbre de travail : seul l\'inventaire change ; journal, bilan, documents de pilotage, manifeste, rapports protégés, normes, données, registre inchangés', ch.join(', '));
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide');
const chk = spawnSync('git', ['diff', '--check'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'git diff --check (commande de référence)', 'code ' + chk.status);
dire('\ninscription appliquée : contrôles conformes');
fin(0);
