// A2-05 · volet 1 · lot 3 : application de la consignation finale de T6 (rubrique d'état courant et « Prochaine action » d'ETAT-ACTUEL.md et de
// ROADMAP.md ; trois lignes de journal ; §8.101 du bilan du volet 2 ; trois compléments et douze lignes de l'inventaire), autorisée le 2026-10-29.
// Dérivé de arbitrage-T6/consignation-sync-38/appliquer-consignation-sync-38.mjs. (1) Préconditions, sans écriture : documents de départ, versions
// proposées et diffs relus à leurs empreintes ; diffs régénérés (document actuel → version proposée) identiques octet pour octet aux diffs relus ;
// ajouts absents ; chaque hunk présent une seule fois, à sa place ; 39 empreintes ; relais 30 sur 30 ; aperçu de synchronisation vide.
// (2) Sauvegarde des quatre documents dans consignation-T6/application/depart/ (refus s'il existe). (3) Application des hunks relus, par
// remplacements ciblés (aucune copie de document complet) ; résultat égal, octet pour octet, à la version proposée relue. (4) Contrôles : diffs
// réels (original sauvegardé → document) de mêmes hunks que les diffs relus ; rubriques communes identiques ; bilan antérieur préfixe exact (§8.100
// compris) ; lignes historiques du journal conservées ; blocs a2-05:etat intacts, au marqueur 7a79b16e4641f93f ; aperçu suivant vide ; relais,
// manifeste, contrôles, couverture, corrections, identifiants ; arbre de travail ; index vide ; git diff --check. Arrêt au premier écart, sans
// réparation ; chemins de machine masqués dans la trace.
// Usage : node a2-05-travail/arbitrage-T6/consignation-T6/appliquer-consignation-T6.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', F = W + 'arbitrage-T6/consignation-T6/', OUT = F + 'application/', APERCU = W + 'sync-stable-apercu.md';
const MARQUEUR = '7a79b16e4641f93f';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md';
// Document : [version proposée relue, diff relu, empreinte du document de départ, empreinte de la version proposée, empreinte du diff]
const DOCS = {
  [ETAT]: ['ETAT-ACTUEL.md', 'diffs/ETAT-ACTUEL.md.diff', '8f1fff6d157d2e0176f5f5ac2f86a01148ebec7a33c0249fa7a360fa1707568c', '68c0b6e38efbdfd9208d67c845a3c80a68962646cc2a6c0d605dbd2fe88ac05f', 'fee9bfa4817a032be435cb132fb0288bca9510b554911705a7ef42c27eb93c66'],
  [ROAD]: ['ROADMAP.md', 'diffs/ROADMAP.md.diff', 'debc4bee552ff0362d2efdb12ae0fe867ce61987c9452ecf588dd02d5768b114', '9c864339358eb5ad45606c8d706ae0622dd883d056d33fab006b71b96b7154b2', 'cee2b9047984e81091927d70ee6d2a9c833e0c7145ace68883ca82d7d8851c2f'],
  [BIL]: ['etape2-A2-05-bilan-volet2.md', 'diffs/etape2-A2-05-bilan-volet2.md.diff', '295fa2d395944ce312a6f5dccc4e0bb80ccd81c46602a03b9655a095fa45dd69', '24b1cbdb423836381447dc9dbb76cab7af408934c5f8763c8566ecd2cbce6868', 'aa9af934c2d47be2569ef59cf9b36154fba4cb82bc0371c8cc0e8a577f9a23a4'],
  [INV]: ['INVENTAIRE-SCRIPTS.md', 'diffs/INVENTAIRE-SCRIPTS.md.diff', '27e7f8227e416171da5d42373f1d6727faf8df5ba06185ce7519782813bdba32', '8ad6ae0c4210a7a823d5b7c49513ae13349577c1bd896f5960ef8ed324d64746', 'efbf037101772316043598e5addc114dce0f6b5bb8e21d4661ac25aa4d48331f'],
};
const masquer = (l) => [[root, '<racine>'], [tmpdir(), '<temp>']].reduce((t, [p, n]) => [p, p.replace(/\\/g, '\\\\'), p.replace(/\\/g, '/'), p.replace(/\\/g, '/').replace(/ /g, '%20')].reduce((u, v) => u.split(v).join(n), t), l);
const log = []; const dire = (l) => { l = masquer(l); console.log(l); log.push(l); };
const fin = (code) => { mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'application.txt'), log.join('\n') + '\n'); process.exit(code); };
const ok = (c, quoi, detail) => { dire((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : '')); if (!c) { dire('\narrêt au premier écart, sans réparation'); fin(1); } };
process.on('uncaughtException', (e) => { dire('EXCEPTION ' + masquer(String(e?.message ?? e)).slice(0, 200)); ok(false, 'interruption'); });
const shaB = (b) => createHash('sha256').update(b).digest('hex'); const sha = (p) => shaB(readFileSync(join(root, p)));
const lire = (p) => readFileSync(join(root, p), 'utf8');
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecarts = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim());
const montrer = (nom, r) => { dire('   ' + nom + ' (code ' + r.code + ') : ' + (r.out.split('\n').filter((l) => !/^\s+at /.test(l)).pop() ?? '')); for (const e of ecarts(r)) dire('      ' + e.slice(0, 260)); };
const conformes = (r) => r.out.split('\n').filter((l) => l.startsWith('conforme ')).length;
const q = (r, n) => (r.out.match(new RegExp('^\\s+juste Q' + n + ' .*→ (.*)$', 'm')) ?? [])[1];
const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
  if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = sha(p); } }; marcher(''); return h; };
const differents = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
// Hunks d'un diff unifié : position d'origine, lignes d'origine (contexte et retraits), lignes nouvelles (contexte et ajouts) ; le \r éventuel reste
const hunks = (d) => { const H = []; let h = null; for (const l of d.split('\n')) { const m = l.match(/^@@ -(\d+)(?:,(\d+))? \+\d+(?:,\d+)? @@/); if (m) { h = { debut: +m[1], avant: [], apres: [] }; H.push(h); continue; }
  if (!h || l.startsWith('diff --git') || l.startsWith('index ') || l.startsWith('--- ') || l.startsWith('+++ ')) continue;
  if (l.startsWith(' ')) { h.avant.push(l.slice(1)); h.apres.push(l.slice(1)); } else if (l.startsWith('-')) h.avant.push(l.slice(1)); else if (l.startsWith('+')) h.apres.push(l.slice(1)); } return H; };
const corps = (d) => d.slice(d.indexOf('\n@@') + 1);
const occurrences = (L, bloc) => { const r = []; for (let i = 0; i + bloc.length <= L.length; i++) if (bloc.every((x, k) => L[i + k] === x)) r.push(i); return r; };
const bloc = (t) => { const s = t.replace(/\r/g, ''); return s.slice(s.indexOf('<!-- a2-05:etat:debut'), s.indexOf('<!-- a2-05:etat:fin -->') + 24); };
// Lignes +/- d'un aperçu, en-têtes « --- a/ » et « +++ b/ » exclus (une puce supprimée commence par « -- »)
const lignesPM = (t) => t.split('\n').filter((l) => /^[-+]/.test(l) && !/^(--- a\/|\+\+\+ b\/)/.test(l));
const initial = instantane();

dire('# Préconditions (aucune écriture)');
for (const [p, [v, d, h0, hv, hd]] of Object.entries(DOCS)) {
  ok(sha(p) === h0, p + ' : document actuel égal au document de départ relu', h0.slice(0, 12) + '…');
  ok(sha(F + v) === hv, p + ' : version proposée relue à son empreinte', hv.slice(0, 12) + '…');
  ok(sha(F + d) === hd, p + ' : diff relu à son empreinte', hd.slice(0, 12) + '…');
  const reg = spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', p, F + v], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout;
  ok(reg === lire(F + d), p + ' : diff régénéré (document actuel → version proposée) identique octet pour octet au diff relu');
}
const t0 = Object.fromEntries(Object.keys(DOCS).map((p) => [p, lire(p)]));
ok(![ETAT, ROAD].some((p) => t0[p].includes('**opération B appliquée le 2026-10-29**')) && !t0[ETAT].includes('| 2026-10-29 | 2 · A2-05 | **Opération B appliquée**') && !/^### 8\.101 /m.test(t0[BIL]) && !/appliquer-operation-[AB]|consignation-T6\//.test(t0[INV]),
  'ajouts absents (rubrique, lignes de journal, §8.101, lignes de l\'inventaire)');
const plan = {};
for (const [p, [, d]] of Object.entries(DOCS)) {
  const L = t0[p].split('\n'); const H = hunks(lire(F + d));
  for (const [k, h] of H.entries()) { const o = occurrences(L, h.avant); ok(o.length === 1 && o[0] === h.debut - 1, p + ', hunk ' + (k + 1) + '/' + H.length + ' : ancre unique, à sa place (ligne ' + h.debut + ')', o.length + ' occurrence(s)'); }
  plan[p] = H;
}
const man = JSON.parse(lire(W + 'empreintes-rapports-arbitres.json')).empreintes;
const emp0 = lancer(W + 'empreintes-lot3.mjs'); ok(Object.keys(man).length === 39 && emp0.code === 0 && emp0.out === 'empreintes : 39 rapports contrôlés, identiques', 'manifeste : 39 empreintes conformes', emp0.out);
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && rel0.out.split('\n').pop() === '30 conformes sur 30', 'relais 30 sur 30 avant la consignation');
ok([ETAT, ROAD].every((p) => bloc(t0[p]).includes('empreinte=' + MARQUEUR + ' ')) && bloc(t0[ETAT]) === bloc(t0[ROAD]), 'blocs a2-05:etat identiques, au marqueur ' + MARQUEUR);
const ap0 = lancer(W + 'sync-stable.mjs', '--apercu'); const texte0 = lire(APERCU);
mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'apercu-avant-consignation.md'), texte0);
ok(ap0.code === 0 && lignesPM(texte0).length === 0, 'aperçu de synchronisation vide avant la consignation', 'plan ' + (ap0.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] + ' ; ' + shaB(texte0).slice(0, 12) + '…');
const avant = instantane(); const ch0 = differents(initial, avant);
ok(ch0.every((p) => p === APERCU), 'préconditions sans écriture (au plus l\'aperçu régénéré)', ch0.join(', ') || 'aucun fichier changé');

dire('\n# Sauvegarde des originaux');
const DEP = OUT + 'depart/'; ok(!existsSync(join(root, DEP)), DEP + ' absent (aucune sauvegarde antérieure écrasée)');
mkdirSync(join(root, DEP), { recursive: true });
for (const [p, [v, , h0]] of Object.entries(DOCS)) { copyFileSync(join(root, p), join(root, DEP + v)); ok(sha(DEP + v) === h0, 'sauvegarde ' + DEP + v, h0.slice(0, 12) + '…'); }

dire('\n# Application des remplacements ciblés (hunks relus)');
for (const [p, [v, , , hv]] of Object.entries(DOCS)) {
  const L = t0[p].split('\n');
  for (const h of [...plan[p]].reverse()) L.splice(h.debut - 1, h.avant.length, ...h.apres);
  const t = L.join('\n'); ok(shaB(t) === hv && t === lire(F + v), p + ' : résultat égal, octet pour octet, à la version proposée relue', plan[p].length + ' hunk(s) ; ' + hv.slice(0, 12) + '…');
  writeFileSync(join(root, p), t); ok(sha(p) === hv, p + ' : écrit', hv.slice(0, 12) + '…');
}

dire('\n# Contrôles après consignation');
const t1 = Object.fromEntries(Object.keys(DOCS).map((p) => [p, lire(p)]));
mkdirSync(join(root, OUT, 'diffs-reels'), { recursive: true });
for (const [p, [v, d]] of Object.entries(DOCS)) {
  const reel = spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', DEP + v, p], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout;
  writeFileSync(join(root, OUT, 'diffs-reels', v + '.diff'), reel);
  ok(corps(reel) === corps(lire(F + d)) && corps(reel).length > 0, p + ' : diff réel (original sauvegardé → document) de hunks identiques au diff relu', 'diffs-reels/' + v + '.diff ; ' + shaB(reel).slice(0, 12) + '…');
}
const pa = (t) => (t.match(/^- \*\*Prochaine action\.\*\*[^\r\n]*/m) ?? [''])[0];
const seg = (t) => t.slice(t.indexOf('- **Terminé et arbitré.**'), t.indexOf('- **Prochaine action.**')).replace(/\r/g, '');
ok(pa(t1[ETAT]) === pa(t1[ROAD]) && seg(t1[ETAT]) === seg(t1[ROAD]) && seg(t1[ETAT]).length > 1000 && seg(t1[ETAT]).includes('**les 39 empreintes sont synchronisées**') && pa(t1[ETAT]).startsWith('- **Prochaine action.** La relecture de la consolidation technique de T6'), 'rubriques communes identiques (« Terminé et arbitré » à « Reste à faire » ; « Prochaine action ») ; 39 empreintes dites synchronisées');
ok(t1[BIL].startsWith(t0[BIL].replace(/(\r?\n)+$/, '')) && /^### 8\.100 /m.test(t1[BIL]) && (t1[BIL].match(/^### 8\.101 /gm) ?? []).length === 1, 'bilan : §8.100 et texte antérieur inchangés (préfixe exact) ; seul le §8.101 ajouté');
const eol = t0[ETAT].includes('\r\n') ? '\r\n' : '\n'; const J0 = t0[ETAT].split(eol), J1 = t1[ETAT].split(eol);
const journalJ = (L) => L.filter((l) => /^\| 20\d\d-\d\d-\d\d \| /.test(l));
const j0 = journalJ(J0), j1 = journalJ(J1);
ok(j1.length === j0.length + 3 && j0.every((l, i) => l === j1[i]) && j1[j1.length - 3].startsWith('| 2026-10-28 | 2 · A2-05 | **Audit des 22 sens de T6 livré en proposition**') && j1[j1.length - 2].startsWith('| 2026-10-29 | 2 · A2-05 | **T6 arbitrée**') && j1[j1.length - 1].startsWith('| 2026-10-29 | 2 · A2-05 | **Opération B appliquée**'), 'journal : lignes historiques conservées à l\'identique ; trois lignes nouvelles à la fin', j0.length + ' → ' + j1.length + ' lignes datées');
ok([ETAT, ROAD].every((p) => bloc(t1[p]) === bloc(t0[p])) && bloc(t1[ETAT]) === bloc(t1[ROAD]) && bloc(t1[ETAT]).includes('empreinte=' + MARQUEUR + ' ') && bloc(t1[ETAT]).includes('39 rapports arbitrés identiques'), 'blocs a2-05:etat intacts et identiques, au marqueur ' + MARQUEUR + ' (39 empreintes)');
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); const texte1 = lire(APERCU); writeFileSync(join(root, OUT, 'sorties', 'apercu-apres-consignation.md'), texte1);
ok(ap1.code === 0 && lignesPM(texte1).length === 0, 'aperçu suivant vide (aucune ligne +/-)', 'plan ' + (ap1.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] + ' ; empreinte de l\'aperçu ' + shaB(texte1).slice(0, 12) + '…');
const A = { cbp: lancer(W + 'controle-bilan-pilote.mjs'), rec5: lancer(W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(W + 'recalcul-T6-perimetre.mjs'), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs') };
for (const [k, r] of Object.entries(A)) montrer('après ' + k, r);
ok(A.rel.code === 0 && A.rel.out.split('\n').pop() === '30 conformes sur 30' && !ecarts(A.rel).length, 'relais --apres-application : 30 sur 30');
ok(A.emp.code === 0 && A.emp.out === 'empreintes : 39 rapports contrôlés, identiques', 'manifeste : 39 empreintes conformes');
ok(A.cbp.code === 0 && !ecarts(A.cbp).length && conformes(A.cbp) === 46, 'contrôle du bilan du pilote : 46/46', conformes(A.cbp) + ' lignes conformes');
ok(A.rec5.code === 0 && !ecarts(A.rec5).length && conformes(A.rec5) === 17, 'recalcul de T5 : 17/17', conformes(A.rec5) + ' lignes conformes');
ok(A.rec6.code === 0 && !ecarts(A.rec6).length && conformes(A.rec6) === 27, 'recalcul de T6 : 27/27', conformes(A.rec6) + ' lignes conformes');
ok(A.cov.code === 0 && /^couverture : 296 arbitrés, 0 proposés, 81 restants, sur 377/.test(A.cov.out) && q(A.rel, 2) === '296/377', 'couverture 296/377, 81 restants');
ok(q(A.rel, 4) === '196/172/0' && q(A.rel, 11) === '39', 'corrections 196 dans 172 ENTRY, aucune appliquée ; 39 rapports protégés');
ok(q(A.rel, 5) === 'V1-24' && /^\| réservé \| V1-22 \|/m.test(t1[BIL]) && /^\| réservé \| V1-23 \|/m.test(t1[BIL]), 'V1-22 et V1-23 réservés ; V1-24 libre (prochain identifiant calculé)');
const apres = instantane(); const ch1 = differents(initial, apres);
const permis = [...Object.keys(DOCS), APERCU].sort();
ok(Object.keys(DOCS).every((p) => ch1.includes(p)) && ch1.every((p) => permis.includes(p)), 'arbre de travail : seuls les quatre documents (et l\'aperçu régénéré) changent ; zones protégées, normes, données, registre, manifeste inchangés', ch1.join(', ') + ' ; ' + Object.keys(apres).length + ' fichiers comparés');
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide');
const chk = spawnSync('git', ['diff', '--check'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'git diff --check (commande de référence)', 'code ' + chk.status);
dire('\nconsignation appliquée : contrôles conformes');
fin(0);
