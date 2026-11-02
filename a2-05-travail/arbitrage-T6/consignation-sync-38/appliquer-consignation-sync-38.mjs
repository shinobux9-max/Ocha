// A2-05 · volet 1 · lot 3 : application de la consignation complémentaire de la synchronisation à 38 empreintes (rubrique d'état courant et
// « Prochaine action » d'ETAT-ACTUEL.md et de ROADMAP.md ; ligne de journal nouvelle ; §8.99 du bilan du volet 2 ; trois lignes de l'inventaire),
// autorisée le 2026-10-28. (1) Préconditions, sans écriture : documents de départ, versions proposées et diffs relus à leurs empreintes ; diffs
// régénérés (document actuel → version proposée) identiques octet pour octet aux diffs relus ; ajouts absents ; chaque hunk présent une seule fois,
// à sa place ; 38 empreintes ; relais 30 sur 30 ; aperçu de synchronisation vide. (2) Sauvegarde des quatre documents dans
// consignation-sync-38/application/depart/ (refus s'il existe). (3) Application des hunks relus, par remplacements ciblés (aucune copie de
// document complet) ; résultat égal, octet pour octet, à la version proposée relue. (4) Contrôles : diffs réels (original sauvegardé → document)
// de mêmes hunks que les diffs relus ; rubriques communes identiques ; bilan antérieur préfixe exact (§8.98 compris) ; lignes historiques du
// journal conservées ; blocs a2-05:etat intacts, au marqueur dea26959920c491d ; aperçu suivant vide ; relais, manifeste, contrôles, couverture,
// corrections, identifiants ; arbre de travail ; index vide ; git diff --check. Arrêt au premier écart, sans réparation.
// Usage : node a2-05-travail/arbitrage-T6/consignation-sync-38/appliquer-consignation-sync-38.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', F = W + 'arbitrage-T6/consignation-sync-38/', OUT = F + 'application/', APERCU = W + 'sync-stable-apercu.md';
const MARQUEUR = 'dea26959920c491d';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md';
// Document : [version proposée relue, diff relu, empreinte du document de départ, empreinte de la version proposée, empreinte du diff]
const DOCS = {
  [ETAT]: ['ETAT-ACTUEL.md', 'diffs/ETAT-ACTUEL.md.diff', '673b802f64c934f878f646a51a6501b611560c5bd8111f8a4fe78f4d19d01fcb', '425d85880d232dc0da34f58f08cfba7a4d87884994e8ca27429eadd2e92d374c', 'a99e1329397db1c1f59d2aa890e618d9e05c8e113c99a2ee0969f8cc09803399'],
  [ROAD]: ['ROADMAP.md', 'diffs/ROADMAP.md.diff', 'beec576d17069d5a54b3671e7d39f746cc47a67c53a5f04fc530a8633797ed81', 'dc93c396cb6fc8f16680fc0c712c51052e1cadf1ba53827c2ace506d893adda9', '05f894d34d5b43b7a32a40b5f673b9baa259d394d141b41f96cf87d5f3131d04'],
  [BIL]: ['etape2-A2-05-bilan-volet2.md', 'diffs/etape2-A2-05-bilan-volet2.md.diff', '55def34bcd57092c9101cf181029f7c4fc93db45d70d2faa8cb47fd94798fb92', '7ed05ba769f8659074c3d964b7d13393b5e53b600d2c581eee249706912dcb79', '55d8a99822cdef1982a0aa294cc12553daa716607581ee4ec11e1568449b3a62'],
  [INV]: ['INVENTAIRE-SCRIPTS.md', 'diffs/INVENTAIRE-SCRIPTS.md.diff', '3c1b5b16bafa4fee804ccb3d80c0cc3a7eb84e5d42aa4ef31ff6319e6d07261a', '27e7f8227e416171da5d42373f1d6727faf8df5ba06185ce7519782813bdba32', '2f0fed04a62f6238fead569b4833d66cbed8ffdf32e6a64e12714e2bbbf8004b'],
};
const log = []; const dire = (l) => { console.log(l); log.push(l); };
const fin = (code) => { mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'application.txt'), log.join('\n') + '\n'); process.exit(code); };
const ok = (c, quoi, detail) => { dire((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : '')); if (!c) { dire('\narrêt au premier écart, sans réparation'); fin(1); } };
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
ok(![ETAT, ROAD].some((p) => t0[p].includes('bloc d\'état synchronisé à 38 empreintes le 2026-10-28')) && !t0[ETAT].includes('**Formalisation de T6 appliquée, puis bloc d\'état synchronisé à 38 empreintes**') && !/^### 8\.99 /m.test(t0[BIL]) && !/appliquer-formalisation-38|synchronisation-38|consignation-sync-38/.test(t0[INV]),
  'ajouts absents (rubrique, ligne de journal, §8.99, lignes de l\'inventaire)');
const plan = {};
for (const [p, [, d]] of Object.entries(DOCS)) {
  const L = t0[p].split('\n'); const H = hunks(lire(F + d));
  for (const [k, h] of H.entries()) { const o = occurrences(L, h.avant); ok(o.length === 1 && o[0] === h.debut - 1, p + ', hunk ' + (k + 1) + '/' + H.length + ' : ancre unique, à sa place (ligne ' + h.debut + ')', o.length + ' occurrence(s)'); }
  plan[p] = H;
}
const man = JSON.parse(lire(W + 'empreintes-rapports-arbitres.json')).empreintes;
const emp0 = lancer(W + 'empreintes-lot3.mjs'); ok(Object.keys(man).length === 38 && emp0.code === 0 && emp0.out === 'empreintes : 38 rapports contrôlés, identiques', 'manifeste : 38 empreintes conformes', emp0.out);
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
ok(pa(t1[ETAT]) === pa(t1[ROAD]) && seg(t1[ETAT]) === seg(t1[ROAD]) && seg(t1[ETAT]).length > 1000 && seg(t1[ETAT]).includes('**les 38 empreintes sont désormais synchronisées**'), 'rubriques communes identiques (« Terminé et arbitré » à « Reste à faire » ; « Prochaine action ») ; 38 empreintes dites synchronisées');
ok(t1[BIL].startsWith(t0[BIL].replace(/(\r?\n)+$/, '')) && /^### 8\.98 /m.test(t1[BIL]) && (t1[BIL].match(/^### 8\.99 /gm) ?? []).length === 1, 'bilan : §8.98 et texte antérieur inchangés (préfixe exact) ; seul le §8.99 ajouté');
const eol = t0[ETAT].includes('\r\n') ? '\r\n' : '\n'; const J0 = t0[ETAT].split(eol), J1 = t1[ETAT].split(eol);
const journalJ = (L) => L.filter((l) => /^\| 20\d\d-\d\d-\d\d \| /.test(l));
const j0 = journalJ(J0), j1 = journalJ(J1);
ok(j1.length === j0.length + 1 && j0.every((l, i) => l === j1[i]) && j1[j1.length - 1].includes('**Formalisation de T6 appliquée, puis bloc d\'état synchronisé à 38 empreintes**'), 'journal : lignes historiques conservées à l\'identique (la ligne précédente du 2026-10-28 comprise) ; une ligne nouvelle à la fin', j0.length + ' → ' + j1.length + ' lignes datées');
ok([ETAT, ROAD].every((p) => bloc(t1[p]) === bloc(t0[p])) && bloc(t1[ETAT]) === bloc(t1[ROAD]) && bloc(t1[ETAT]).includes('empreinte=' + MARQUEUR + ' ') && bloc(t1[ETAT]).includes('38 rapports arbitrés identiques'), 'blocs a2-05:etat intacts et identiques, au marqueur ' + MARQUEUR + ' (38 empreintes)');
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); const texte1 = lire(APERCU); writeFileSync(join(root, OUT, 'sorties', 'apercu-apres-consignation.md'), texte1);
ok(ap1.code === 0 && lignesPM(texte1).length === 0, 'aperçu suivant vide (aucune ligne +/-)', 'plan ' + (ap1.out.match(/plan ([0-9a-f]{16})/) ?? [])[1] + ' ; empreinte de l\'aperçu ' + shaB(texte1).slice(0, 12) + '…');
const A = { cbp: lancer(W + 'controle-bilan-pilote.mjs'), rec5: lancer(W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(W + 'recalcul-T6-perimetre.mjs'), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs') };
for (const [k, r] of Object.entries(A)) montrer('après ' + k, r);
ok(A.rel.code === 0 && A.rel.out.split('\n').pop() === '30 conformes sur 30' && !ecarts(A.rel).length, 'relais --apres-application : 30 sur 30');
ok(A.emp.code === 0 && A.emp.out === 'empreintes : 38 rapports contrôlés, identiques', 'manifeste : 38 empreintes conformes');
ok(A.cbp.code === 0 && !ecarts(A.cbp).length && conformes(A.cbp) === 42, 'contrôle du bilan du pilote : 42/42', conformes(A.cbp) + ' lignes conformes');
ok(A.rec5.code === 0 && !ecarts(A.rec5).length && conformes(A.rec5) === 16, 'recalcul de T5 : 16/16', conformes(A.rec5) + ' lignes conformes');
ok(A.rec6.code === 0 && !ecarts(A.rec6).length && conformes(A.rec6) === 24, 'recalcul de T6 : 24/24', conformes(A.rec6) + ' lignes conformes');
ok(A.cov.code === 0 && /^couverture : 274 arbitrés, 0 proposés, 103 restants, sur 377/.test(A.cov.out) && q(A.rel, 2) === '274/377', 'couverture 274/377, 103 restants');
ok(q(A.rel, 4) === '196/172/0' && q(A.rel, 11) === '38', 'corrections 196 dans 172 ENTRY, aucune appliquée ; 38 rapports protégés');
ok(q(A.rel, 5) === 'V1-24' && /^\| réservé \| V1-22 \|/m.test(t1[BIL]) && /^\| réservé \| V1-23 \|/m.test(t1[BIL]), 'V1-22 et V1-23 réservés ; V1-24 libre (prochain identifiant calculé)');
const apres = instantane(); const ch1 = differents(initial, apres);
const permis = [...Object.keys(DOCS), APERCU].sort();
ok(Object.keys(DOCS).every((p) => ch1.includes(p)) && ch1.every((p) => permis.includes(p)), 'arbre de travail : seuls les quatre documents (et l\'aperçu régénéré) changent ; zones protégées, normes, données, registre, manifeste inchangés', ch1.join(', ') + ' ; ' + Object.keys(apres).length + ' fichiers comparés');
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide');
const chk = spawnSync('git', ['diff', '--check'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'git diff --check (commande de référence)', 'code ' + chk.status);
dire('\nconsignation appliquée : contrôles conformes');
fin(0);
