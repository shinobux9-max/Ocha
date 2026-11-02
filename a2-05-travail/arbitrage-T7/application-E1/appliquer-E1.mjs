// A2-05 · volet 1 · lot 3 : application de l'état E1 de la consolidation de T7 (autorisation du 2026-10-29 : « J'accepte les propositions
// documentaires sans modification et autorise l'application de l'état E1 uniquement. »). Dérivé de arbitrage-T6/consignation-T6/appliquer-consignation-T6.mjs.
// Six documents : configuration de T7 (ARBITRAGE), rapport de périmètre (statut et §0), ETAT-ACTUEL.md, ROADMAP.md, bilan du volet 2 (§8.102),
// inventaire (sept lignes) ; plus la sauvegarde de la proposition de T7 (copie exacte). Ni recalcul adapté (E2), ni 40e entrée (E3), ni
// synchronisation (E4). (1) Préconditions, sans écriture : documents de départ, versions proposées et diffs relus à leurs empreintes ; diffs
// régénérés identiques octet pour octet ; ajouts absents ; hunks à ancre unique, à leur place ; 39 empreintes ; relais 30 sur 30 ; aperçu vide ;
// index vide. (2) Sauvegarde des originaux dans application-E1/depart/. (3) Hunks relus appliqués par remplacements ciblés ; résultat égal à la
// version relue ; proposition sauvegardée. (4) Contrôles attendus après E1. Arrêt au premier écart, sans réparation ; chemins masqués.
// Usage : node a2-05-travail/arbitrage-T7/application-E1/appliquer-E1.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', F = W + 'arbitrage-T7/consolidation/', OUT = W + 'arbitrage-T7/application-E1/', APERCU = W + 'sync-stable-apercu.md';
const MARQUEUR = '7a79b16e4641f93f';
const CFG = W + 'perimetre-T7.mjs', PER = 'docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md';
const BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md', PROP = W + 'arbitrage-T7/proposition-T7-perimetre.md';
const PER_SHA = '046c68e4c9822ec3c84db47167f7e31d3ec84ae18b5b7f216029e309206bdd45';
// Document : [version proposée relue, empreinte du document de départ, empreinte de la version proposée, empreinte du diff relu]
const DOCS = {
  [CFG]: ['perimetre-T7.mjs', 'dfc3ca71403e7eb2cfee999228350ae9dee50b9b7eb0a4fe1dc77c74543f54c0', '61fbb8a35286e66cd7dfdf68543187a75e321e3aaf1fcdcc5d658d8796b6c818', '58d04db3a98d0e15b699f000c8ad466bfbf0770ca48966ab09b70724f4beb6fb'],
  [PER]: ['etape2-A2-05-volet1-lot3-T7-perimetre.md', PER_SHA, 'a93a75cc4da86efeeea667aa357dcd457ac7583311d7fad6ce3a0a68f4cf77dc', '62475bc606c47c1c098c1ad1785bc8aa9b794fbb8c8f5cb3c2e050ea3ed4c24e'],
  [ETAT]: ['ETAT-ACTUEL.md', '68c0b6e38efbdfd9208d67c845a3c80a68962646cc2a6c0d605dbd2fe88ac05f', '51e410b7eaf1e5c5d950adcea8938d9f88c0ce75e8061cb158fca0b43a786737', 'b64fdf7b811e9463fe0fb171915191ce02513c8337cd3365a55c7177f72e2949'],
  [ROAD]: ['ROADMAP.md', '9c864339358eb5ad45606c8d706ae0622dd883d056d33fab006b71b96b7154b2', '0497e58a0cefdc67521b4ad3a03df0c5dc1f9a5dc3eb0471bca60ead736bae06', 'abe078ee05155260232f69808820df5d4bc1cfbd2ba1ce441894dc3ba6481caa'],
  [BIL]: ['etape2-A2-05-bilan-volet2.md', '24b1cbdb423836381447dc9dbb76cab7af408934c5f8763c8566ecd2cbce6868', 'ee6f63e4afebf19d16d77f0dd30bfae883ef255d83d4afec6e1fda3f8279b3b9', '62551979eda05784b6864fd70de302107872af2676de1541fae43e65e8f0b328'],
  [INV]: ['INVENTAIRE-SCRIPTS.md', '30e18df2ab1e7707cd7c60de080b6798a9bfbc82f717fc063fe1ec842358218b', '1ee4d3950f6013946e275f255ed527f7565ddd897789d207a3e58b114dfc5724', 'c766e665abc4992bbf9ec07845e1ef69f5b590d77f473a8cb337d26b9a98c179'],
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
const gitDiff = (a, b) => spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', a, b], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout;
const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
  if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = sha(p); } }; marcher(''); return h; };
const differents = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
// Hunks d'un diff unifié : position d'origine, lignes d'origine (contexte et retraits), lignes nouvelles (contexte et ajouts) ; le \r éventuel reste
const hunks = (d) => { const H = []; let h = null; for (const l of d.split('\n')) { const m = l.match(/^@@ -(\d+)(?:,(\d+))? \+\d+(?:,\d+)? @@/); if (m) { h = { debut: +m[1], avant: [], apres: [] }; H.push(h); continue; }
  if (!h || l.startsWith('diff --git') || l.startsWith('index ') || l.startsWith('--- ') || l.startsWith('+++ ') || l.startsWith('\\ No newline')) continue;
  if (l.startsWith(' ')) { h.avant.push(l.slice(1)); h.apres.push(l.slice(1)); } else if (l.startsWith('-')) h.avant.push(l.slice(1)); else if (l.startsWith('+')) h.apres.push(l.slice(1)); } return H; };
const corps = (d) => d.slice(d.indexOf('\n@@') + 1);
const occurrences = (L, bloc) => { const r = []; for (let i = 0; i + bloc.length <= L.length; i++) if (bloc.every((x, k) => L[i + k] === x)) r.push(i); return r; };
const bloc = (t) => { const s = t.replace(/\r/g, ''); return s.slice(s.indexOf('<!-- a2-05:etat:debut'), s.indexOf('<!-- a2-05:etat:fin -->') + 24); };
const lignesPM = (t) => t.split('\n').filter((l) => /^[-+]/.test(l) && !/^(--- a\/|\+\+\+ b\/)/.test(l));
const journalJ = (L) => L.filter((l) => /^\| 20\d\d-\d\d-\d\d \| /.test(l));
const initial = instantane();

dire('# Préconditions (aucune écriture)');
for (const [p, [v, h0, hv, hd]] of Object.entries(DOCS)) {
  ok(sha(p) === h0, p + ' : document actuel égal au document de départ relu', h0.slice(0, 12) + '…');
  ok(sha(F + v) === hv, p + ' : version proposée relue à son empreinte', hv.slice(0, 12) + '…');
  ok(sha(F + 'diffs/' + v + '.diff') === hd, p + ' : diff approuvé à son empreinte', hd.slice(0, 12) + '…');
  ok(gitDiff(p, F + v) === lire(F + 'diffs/' + v + '.diff'), p + ' : diff régénéré (document actuel → version proposée) identique octet pour octet au diff approuvé');
}
ok(sha(F + 'proposition-T7-perimetre.md') === PER_SHA && !existsSync(join(root, PROP)), 'proposition de T7 : copie relue à l\'empreinte de la proposition livrée ; emplacement prévu libre', PROP);
const t0 = Object.fromEntries(Object.keys(DOCS).map((p) => [p, lire(p)]));
ok(/^const ARBITRAGE = null;$/m.test(t0[CFG]) && !t0[PER].includes('## 0. Arbitrage') && ![ETAT, ROAD].some((p) => t0[p].includes('**T6 close le 2026-10-29**')) && !t0[ETAT].includes('| 2026-10-29 | 2 · A2-05 | **T6 close**') && !/^### 8\.102 /m.test(t0[BIL]) && !t0[INV].includes('| `perimetre-T7.mjs` |') && !t0[INV].includes('preparer-consolidation-T7.mjs'),
  'ajouts absents (ARBITRAGE, §0, rubriques, ligne de journal, §8.102, lignes de l\'inventaire)');
const plan = {};
for (const [p, [v]] of Object.entries(DOCS)) {
  const L = t0[p].split('\n'); const H = hunks(lire(F + 'diffs/' + v + '.diff'));
  for (const [k, h] of H.entries()) { const o = occurrences(L, h.avant); ok(o.length === 1 && o[0] === h.debut - 1, p + ', hunk ' + (k + 1) + '/' + H.length + ' : ancre unique, à sa place (ligne ' + h.debut + ')', o.length + ' occurrence(s)'); }
  plan[p] = H;
}
const man = JSON.parse(lire(W + 'empreintes-rapports-arbitres.json')).empreintes;
const emp0 = lancer(W + 'empreintes-lot3.mjs'); ok(Object.keys(man).length === 39 && !Object.hasOwn(man, PER) && emp0.code === 0 && emp0.out === 'empreintes : 39 rapports contrôlés, identiques', 'manifeste : 39 empreintes conformes ; périmètre de T7 absent', emp0.out);
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && rel0.out.split('\n').pop() === '30 conformes sur 30', 'relais 30 sur 30 avant E1');
ok([ETAT, ROAD].every((p) => bloc(t0[p]).includes('empreinte=' + MARQUEUR + ' ')) && bloc(t0[ETAT]) === bloc(t0[ROAD]), 'blocs a2-05:etat identiques, au marqueur ' + MARQUEUR);
const ap0 = lancer(W + 'sync-stable.mjs', '--apercu'); const texte0 = lire(APERCU);
mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'apercu-avant-E1.md'), texte0);
ok(ap0.code === 0 && lignesPM(texte0).length === 0, 'aperçu de synchronisation vide avant E1', 'plan ' + (ap0.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]);
const idx0 = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx0.status === 0 && idx0.stdout.trim() === '', 'index vide avant l\'écriture');
const ch0 = differents(initial, instantane()); ok(ch0.every((p) => p === APERCU), 'préconditions sans écriture (au plus l\'aperçu régénéré)', ch0.join(', ') || 'aucun fichier changé');

dire('\n# Sauvegarde des originaux');
const DEP = OUT + 'depart/'; ok(!existsSync(join(root, DEP)), DEP + ' absent (aucune sauvegarde antérieure écrasée)');
mkdirSync(join(root, DEP), { recursive: true });
for (const [p, [v, h0]] of Object.entries(DOCS)) { copyFileSync(join(root, p), join(root, DEP + v)); ok(sha(DEP + v) === h0, 'sauvegarde ' + DEP + v, h0.slice(0, 12) + '…'); }

dire('\n# Proposition de T7 sauvegardée à l\'emplacement prévu');
copyFileSync(join(root, PER), join(root, PROP)); ok(sha(PROP) === PER_SHA, PROP + ' : copie exacte de la proposition livrée', PER_SHA.slice(0, 12) + '…');

dire('\n# Application des remplacements ciblés (hunks relus)');
for (const [p, [v, , hv]] of Object.entries(DOCS)) {
  const L = t0[p].split('\n');
  for (const h of [...plan[p]].reverse()) L.splice(h.debut - 1, h.avant.length, ...h.apres);
  const t = L.join('\n'); ok(shaB(t) === hv && t === lire(F + v), p + ' : résultat égal, octet pour octet, à la version proposée relue', plan[p].length + ' hunk(s) ; ' + hv.slice(0, 12) + '…');
  writeFileSync(join(root, p), t); ok(sha(p) === hv, p + ' : écrit', hv.slice(0, 12) + '…');
}

dire('\n# Contrôles après E1');
const t1 = Object.fromEntries(Object.keys(DOCS).map((p) => [p, lire(p)]));
mkdirSync(join(root, OUT, 'diffs-reels'), { recursive: true });
for (const [p, [v]] of Object.entries(DOCS)) {
  const reel = gitDiff(DEP + v, p); writeFileSync(join(root, OUT, 'diffs-reels', v + '.diff'), reel);
  ok(corps(reel) === corps(lire(F + 'diffs/' + v + '.diff')) && corps(reel).length > 0, p + ' : diff réel (original sauvegardé → document) de hunks identiques au diff approuvé', 'diffs-reels/' + v + '.diff ; ' + shaB(reel).slice(0, 12) + '…');
}
// Périmètre accepté : hors du statut et du §0, identique à la proposition sauvegardée ; D1 + D4, 24 sens dans 24 ENTRY
const PL = lire(PROP).split('\n'), G = t1[PER].split('\n'); const a0 = G.indexOf('## 0. Arbitrage'), b0 = G.indexOf('## 1. Où se place T7');
const sans0 = [...G.slice(0, a0), ...G.slice(b0)]; const st = PL.findIndex((l) => l.startsWith('**Statut** : '));
ok(/^\*\*Statut\*\* : \*\*périmètre accepté le 2026-10-29 \(§0\)\.\*\*/.test(G[st]) && a0 > 0 && b0 - a0 === 10 && sans0.length === PL.length && sans0.every((l, k) => k === st || l === PL[k]), 'périmètre accepté (§0, 10 lignes) ; corps de la proposition initiale inchangé (seule la ligne de statut diffère)');
ok(t1[PER].includes('« **J\'accepte le périmètre opérationnel de T7 : D1 et D4, soit 24 sens dans 24 ENTRY.** »') && t1[CFG].includes("const ARBITRAGE = { date: '2026-10-29', texte: ["), 'périmètre accepté : D1 + D4, 24 sens dans 24 ENTRY ; constante ARBITRAGE renseignée');
const pa = (t) => (t.match(/^- \*\*Prochaine action\.\*\*[^\r\n]*/m) ?? [''])[0];
const seg = (t) => t.slice(t.indexOf('- **Terminé et arbitré.**'), t.indexOf('- **Prochaine action.**')).replace(/\r/g, '');
ok(pa(t1[ETAT]) === pa(t1[ROAD]) && seg(t1[ETAT]) === seg(t1[ROAD]) && seg(t1[ETAT]).includes('**T6 close le 2026-10-29**') && pa(t1[ETAT]).startsWith('- **Prochaine action.** L\'intégration du périmètre accepté de T7 au manifeste'), 'rubriques communes identiques dans les deux documents ; « Prochaine action » réécrite');
const eol = t0[ETAT].includes('\r\n') ? '\r\n' : '\n'; const j0 = journalJ(t0[ETAT].split(eol)), j1 = journalJ(t1[ETAT].split(eol));
ok(j1.length === j0.length + 1 && j0.every((l, i) => l === j1[i]) && j1.at(-1).startsWith('| 2026-10-29 | 2 · A2-05 | **T6 close**'), 'journal : lignes historiques conservées à l\'identique ; une ligne nouvelle à la fin', j0.length + ' → ' + j1.length + ' lignes datées');
ok(t1[BIL].startsWith(t0[BIL].replace(/(\r?\n)+$/, '')) && (t1[BIL].match(/^### 8\.102 /gm) ?? []).length === 1, 'bilan : texte antérieur inchangé (préfixe exact) ; seul le §8.102 ajouté');
const i0 = t0[INV].split('\n'), i1 = t1[INV].split('\n'); const nouv = i1.filter((l) => !i0.includes(l));
ok(i1.length === i0.length + 7 && nouv.length === 7 && i0.every((l) => i1.includes(l)), 'inventaire : sept lignes ajoutées, aucune ligne existante modifiée', nouv.map((l) => l.split(' | ')[0].slice(2)).join(', '));
ok([ETAT, ROAD].every((p) => bloc(t1[p]) === bloc(t0[p])) && bloc(t1[ETAT]) === bloc(t1[ROAD]), 'blocs a2-05:etat intacts et identiques, au marqueur ' + MARQUEUR);
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); const texte1 = lire(APERCU); writeFileSync(join(root, OUT, 'sorties', 'apercu-apres-E1.md'), texte1);
ok(ap1.code === 0 && lignesPM(texte1).length === 0, 'aperçu de synchronisation vide', 'plan ' + (ap1.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]);
const A = { cbp: lancer(W + 'controle-bilan-pilote.mjs'), rec5: lancer(W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(W + 'recalcul-T6-perimetre.mjs'), rec7: lancer(W + 'recalcul-T7-perimetre.mjs'), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs') };
for (const [k, r] of Object.entries(A)) montrer('après ' + k, r);
const ecRel = ecarts(A.rel).map((l) => (l.match(/^ÉCART\s+(C\w+)/) ?? [])[1]);
ok(A.rel.out.split('\n').pop() === '29 conformes sur 30' && JSON.stringify(ecRel) === '["C9a"]', 'relais --apres-application : 29 sur 30, C9a seul (périmètre accepté hors du manifeste, état prévu)');
ok(A.emp.code === 0 && A.emp.out === 'empreintes : 39 rapports contrôlés, identiques ; rapports arbitrés hors du manifeste : ' + PER, 'manifeste : 39 empreintes conformes ; seul le périmètre accepté de T7 hors du manifeste');
ok(A.cbp.code === 0 && !ecarts(A.cbp).length && conformes(A.cbp) === 46, 'contrôle du bilan du pilote : 46/46');
ok(A.rec5.code === 0 && !ecarts(A.rec5).length && conformes(A.rec5) === 17, 'recalcul de T5 : 17/17');
ok(A.rec6.code === 0 && !ecarts(A.rec6).length && conformes(A.rec6) === 27, 'recalcul de T6 : 27/27');
ok(A.rec7.code === 0 && !ecarts(A.rec7).length && conformes(A.rec7) === 24, 'recalcul de T7 d\'origine : 24/24');
ok(A.cov.code === 0 && /^couverture : 296 arbitrés, 0 proposés, 81 restants, sur 377/.test(A.cov.out) && q(A.rel, 2) === '296/377', 'couverture 296/377, 81 restants');
ok(q(A.rel, 4) === '196/172/0' && q(A.rel, 5) === 'V1-24', 'corrections 196 dans 172 ENTRY, aucune appliquée ; V1-24 libre');
const ch1 = differents(initial, instantane()); const permis = [...Object.keys(DOCS), PROP, APERCU].sort();
ok(Object.keys(DOCS).every((p) => ch1.includes(p)) && ch1.includes(PROP) && ch1.every((p) => permis.includes(p)), 'arbre de travail : seuls les six documents, la proposition sauvegardée et l\'aperçu changent ; recalcul de T7, manifeste, rapports protégés, normes, données, registre inchangés', ch1.join(', '));
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide');
const chk = spawnSync('git', ['diff', '--check'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'git diff --check (commande de référence)', 'code ' + chk.status);
dire('\nE1 appliqué : contrôles conformes');
fin(0);
