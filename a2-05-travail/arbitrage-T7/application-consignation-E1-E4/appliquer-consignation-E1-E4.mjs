// A2-05 · volet 1 · lot 3 : application de la consignation documentaire d'E1 à E4 de la consolidation de T7 (autorisation du 2026-10-31 :
// « J'accepte la synchronisation E4 et autorise l'application ciblée des quatre diffs préparés dans a2-05-travail/arbitrage-T7/consignation-E2-E4/. »).
// Dérivé de arbitrage-T7/application-E1/appliquer-E1.mjs. Quatre documents : ETAT-ACTUEL.md, ROADMAP.md, bilan du volet 2 (§8.103),
// inventaire des scripts. Les textes relus sont appliqués tels quels (la ligne de journal et le §8.103 restent datés du 2026-10-30, jour de leur
// préparation). (1) Préconditions, sans écriture : documents de départ, versions proposées et diffs relus à leurs empreintes ; diffs régénérés
// identiques octet pour octet ; ajouts absents ; hunks à ancre unique, à leur place ; 40 empreintes ; relais 30 sur 30 ; blocs identiques au
// marqueur 32631bf599ee77a2 ; aperçu vide ; index vide. (2) Sauvegarde des originaux dans application-consignation-E1-E4/depart/. (3) Hunks
// relus appliqués par remplacements ciblés ; résultat égal à la version relue. (4) Contrôles. Arrêt au premier écart, sans réparation ; chemins masqués.
// Usage : node a2-05-travail/arbitrage-T7/application-consignation-E1-E4/appliquer-consignation-E1-E4.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', F = W + 'arbitrage-T7/consignation-E2-E4/', OUT = W + 'arbitrage-T7/application-consignation-E1-E4/', APERCU = W + 'sync-stable-apercu.md';
const MARQUEUR = '32631bf599ee77a2';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md';
const MAN = W + 'empreintes-rapports-arbitres.json', MAN_SHA = 'f5b5be5c3418ebd7f85973a3c43ea9f821c7081aee1685937b4dd62db8cb02d1';
const PREP = F + 'preparer-consignation-E2-E4.mjs';
// Document : [version proposée relue, empreinte du document de départ (après E4), empreinte de la version proposée, empreinte du diff relu]
const DOCS = {
  [ETAT]: ['ETAT-ACTUEL.md', '82306cf263c056388f9de7b35e77f8ca611bb958ea201d22ea0b1ff986aea37c', '6b669222d3cf50ae48398d299264aa6342b6a1bbd8289c9041053a765b159a8b', '9f74014eabf9ae9c6ad3c26e1f511fa6bdeeeb90e93beeaf13b4d77cd4b8cc5d'],
  [ROAD]: ['ROADMAP.md', 'b01d9d9bb68aef3383ac7f703318484583070f4462b4b97db0ff22f6e269561c', '3b88e2c546ae134932edcb0371918b4309dbf52f890a334eb1ea486d99178cc0', '808764028f012ab4ff7f96798627cfb8062d931524bf9a3e592ee9c09867287b'],
  [BIL]: ['etape2-A2-05-bilan-volet2.md', 'ee6f63e4afebf19d16d77f0dd30bfae883ef255d83d4afec6e1fda3f8279b3b9', '3e5bd3c783020c1ef374f875075bad8ef9f98de172101707051cdbf424e40972', 'a41e65c9685a4e914f07fd45693919df828830c35e0df2bfef1ed244b6a0bab7'],
  [INV]: ['INVENTAIRE-SCRIPTS.md', '1ee4d3950f6013946e275f255ed527f7565ddd897789d207a3e58b114dfc5724', '6a30f68a965058722f44acd4cbcd52a14c494b27c1d780736203fa70087e18f3', '1c77e126e76ad9dbacba58ebad5082054af3ca78875ef73fa4f874fdaba8b344'],
};
// Membre remplacé pour T7 seul (les mentions historiques des autres tranches restent) ; membres nouveaux
const A_RUB = '; hors du manifeste, ajout non autorisé) ; audit des 24 sens non autorisé (bilan du volet 2, §8.102)';
const N_RUB = '**protégé au manifeste le 2026-10-30 (40e entrée)**', N_PA = "- **Prochaine action.** L'audit individuel des 24 sens de T7";
const J_NOUV = '| 2026-10-30 | 2 · A2-05 | **Consolidation du périmètre de T7 appliquée en quatre états';
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
  ok(sha(p) === h0, p + ' : document actuel égal au document de départ relu (après E4)', h0.slice(0, 12) + '…');
  ok(sha(F + v) === hv, p + ' : version proposée relue à son empreinte', hv.slice(0, 12) + '…');
  ok(sha(F + 'diffs/' + v + '.diff') === hd, p + ' : diff approuvé à son empreinte', hd.slice(0, 12) + '…');
  ok(gitDiff(p, F + v) === lire(F + 'diffs/' + v + '.diff'), p + ' : diff régénéré (document actuel → version proposée) identique octet pour octet au diff approuvé');
}
ok(existsSync(join(root, PREP)), 'préparateur relu présent', PREP);
const t0 = Object.fromEntries(Object.keys(DOCS).map((p) => [p, lire(p)]));
ok(![ETAT, ROAD].some((p) => t0[p].includes(N_RUB) || t0[p].includes(N_PA)) && !t0[ETAT].includes(J_NOUV) && !/^### 8\.103 /m.test(t0[BIL]) && (t0[BIL].match(/^### 8\.102 /gm) ?? []).length === 1
  && !/application-E[1-4]\/appliquer|preparation-E3\/preparer|consignation-E2-E4\//.test(t0[INV]),
  'ajouts absents (rubrique, prochaine action, ligne de journal, §8.103, lignes de l\'inventaire) ; §8.102 présent une fois');
const plan = {};
for (const [p, [v]] of Object.entries(DOCS)) {
  const L = t0[p].split('\n'); const H = hunks(lire(F + 'diffs/' + v + '.diff'));
  for (const [k, h] of H.entries()) { const o = occurrences(L, h.avant); ok(o.length === 1 && o[0] === h.debut - 1, p + ', hunk ' + (k + 1) + '/' + H.length + ' : ancre unique, à sa place (ligne ' + h.debut + ')', o.length + ' occurrence(s)'); }
  plan[p] = H;
}
const emp0 = lancer(W + 'empreintes-lot3.mjs'); ok(sha(MAN) === MAN_SHA && emp0.code === 0 && emp0.out === 'empreintes : 40 rapports contrôlés, identiques', 'manifeste : 40 empreintes conformes, à son empreinte après E3', emp0.out);
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && rel0.out.split('\n').pop() === '30 conformes sur 30', 'relais 30 sur 30 avant la consignation');
ok([ETAT, ROAD].every((p) => bloc(t0[p]).includes('empreinte=' + MARQUEUR + ' ')) && bloc(t0[ETAT]) === bloc(t0[ROAD]), 'blocs a2-05:etat identiques, au marqueur ' + MARQUEUR);
const ap0 = lancer(W + 'sync-stable.mjs', '--apercu'); const texte0 = lire(APERCU);
mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'apercu-avant-consignation.md'), texte0);
ok(ap0.code === 0 && lignesPM(texte0).length === 0, 'aperçu de synchronisation vide avant la consignation', 'plan ' + (ap0.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]);
const idx0 = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx0.status === 0 && idx0.stdout.trim() === '', 'index vide avant l\'écriture');
const ch0 = differents(initial, instantane()); ok(ch0.every((p) => p === APERCU), 'préconditions sans écriture (au plus l\'aperçu régénéré)', ch0.join(', ') || 'aucun fichier changé');

dire('\n# Sauvegarde des originaux');
const DEP = OUT + 'depart/'; ok(!existsSync(join(root, DEP)), DEP + ' absent (aucune sauvegarde antérieure écrasée)');
mkdirSync(join(root, DEP), { recursive: true });
for (const [p, [v, h0]] of Object.entries(DOCS)) { copyFileSync(join(root, p), join(root, DEP + v)); ok(sha(DEP + v) === h0, 'sauvegarde ' + DEP + v, h0.slice(0, 12) + '…'); }

dire('\n# Application des remplacements ciblés (hunks relus, une seule fois)');
for (const [p, [v, , hv]] of Object.entries(DOCS)) {
  const L = t0[p].split('\n');
  for (const h of [...plan[p]].reverse()) L.splice(h.debut - 1, h.avant.length, ...h.apres);
  const t = L.join('\n'); ok(shaB(t) === hv && t === lire(F + v), p + ' : résultat égal, octet pour octet, à la version proposée relue', plan[p].length + ' hunk(s) ; ' + hv.slice(0, 12) + '…');
  writeFileSync(join(root, p), t); ok(sha(p) === hv, p + ' : écrit', hv.slice(0, 12) + '…');
}

dire('\n# Contrôles après la consignation');
const t1 = Object.fromEntries(Object.keys(DOCS).map((p) => [p, lire(p)]));
mkdirSync(join(root, OUT, 'diffs-reels'), { recursive: true });
for (const [p, [v]] of Object.entries(DOCS)) {
  const reel = gitDiff(DEP + v, p); writeFileSync(join(root, OUT, 'diffs-reels', v + '.diff'), reel);
  ok(corps(reel) === corps(lire(F + 'diffs/' + v + '.diff')) && corps(reel).length > 0, p + ' : diff réel (original sauvegardé → document) de hunks identiques au diff approuvé', 'diffs-reels/' + v + '.diff ; ' + shaB(reel).slice(0, 12) + '…');
}
const pa = (t) => (t.match(/^- \*\*Prochaine action\.\*\*[^\r\n]*/m) ?? [''])[0];
const seg = (t) => t.slice(t.indexOf('- **Terminé et arbitré.**'), t.indexOf('- **Prochaine action.**')).replace(/\r/g, '');
ok(pa(t1[ETAT]) === pa(t1[ROAD]) && seg(t1[ETAT]) === seg(t1[ROAD]) && seg(t1[ETAT]).includes(N_RUB) && !seg(t1[ETAT]).includes(A_RUB) && pa(t1[ETAT]).startsWith(N_PA),
  'rubriques communes identiques dans les deux documents ; périmètre de T7 protégé au manifeste ; « Prochaine action » : audit des 24 sens');
const eol = t0[ETAT].includes('\r\n') ? '\r\n' : '\n'; const j0 = journalJ(t0[ETAT].split(eol)), j1 = journalJ(t1[ETAT].split(eol));
ok(j1.length === j0.length + 1 && j0.every((l, i) => l === j1[i]) && j1.at(-1).startsWith(J_NOUV), 'journal : lignes historiques conservées à l\'identique ; une ligne nouvelle à la fin', j0.length + ' → ' + j1.length + ' lignes datées');
ok(t1[BIL].startsWith(t0[BIL].replace(/(\r?\n)+$/, '')) && (t1[BIL].match(/^### 8\.102 /gm) ?? []).length === 1 && (t1[BIL].match(/^### 8\.103 /gm) ?? []).length === 1, 'bilan : texte antérieur et §8.102 inchangés (préfixe exact) ; seul le §8.103 ajouté');
const i0 = t0[INV].split('\n'), i1 = t1[INV].split('\n'); const ote = i0.filter((l) => !i1.includes(l)), nouv = i1.filter((l) => !i0.includes(l));
ok(i1.length === i0.length + 7 && ote.length === 3 && nouv.length === 10 && ote.every((l) => nouv.some((n) => n.startsWith(l.replace(/ \|\r?$/, '')))), 'inventaire : trois lignes complétées à leur fin, sept ajoutées, aucune autre ligne changée');
ok([ETAT, ROAD].every((p) => bloc(t1[p]) === bloc(t0[p])) && bloc(t1[ETAT]) === bloc(t1[ROAD]), 'blocs a2-05:etat intacts et identiques, au marqueur ' + MARQUEUR);
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); const texte1 = lire(APERCU); writeFileSync(join(root, OUT, 'sorties', 'apercu-apres-consignation.md'), texte1);
ok(ap1.code === 0 && lignesPM(texte1).length === 0, 'aperçu de synchronisation vide', 'plan ' + (ap1.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]);
const A = { emp: lancer(W + 'empreintes-lot3.mjs'), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), rec5: lancer(W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(W + 'recalcul-T6-perimetre.mjs'), rec7: lancer(W + 'recalcul-T7-perimetre.mjs'), cbp: lancer(W + 'controle-bilan-pilote.mjs'), cov: lancer(W + 'couverture-lot3.mjs') };
for (const [k, r] of Object.entries(A)) montrer('après ' + k, r);
ok(A.emp.code === 0 && A.emp.out === 'empreintes : 40 rapports contrôlés, identiques' && sha(MAN) === MAN_SHA, 'manifeste : 40 empreintes conformes, inchangé');
ok(A.rel.code === 0 && A.rel.out.split('\n').pop() === '30 conformes sur 30' && !ecarts(A.rel).length, 'relais --apres-application : 30 sur 30');
ok(A.rec5.code === 0 && !ecarts(A.rec5).length && conformes(A.rec5) === 17, 'recalcul de T5 : 17/17');
ok(A.rec6.code === 0 && !ecarts(A.rec6).length && conformes(A.rec6) === 27, 'recalcul de T6 : 27/27');
ok(A.rec7.code === 0 && !ecarts(A.rec7).length && conformes(A.rec7) === 26, 'recalcul de T7 : 26/26');
ok(A.cbp.code === 0 && !ecarts(A.cbp).length && conformes(A.cbp) === 46, 'contrôle du bilan du pilote : 46/46');
ok(A.cov.code === 0 && /^couverture : 296 arbitrés, 0 proposés, 81 restants, sur 377/.test(A.cov.out) && q(A.rel, 2) === '296/377', 'couverture 296/377, 81 restants');
ok(q(A.rel, 4) === '196/172/0' && q(A.rel, 11) === '40', 'corrections 196 dans 172 ENTRY, aucune appliquée ; 40 rapports protégés');
ok(q(A.rel, 5) === 'V1-24' && /^\| réservé \| V1-22 \|/m.test(t1[BIL]) && /^\| réservé \| V1-23 \|/m.test(t1[BIL]), 'V1-22 et V1-23 réservés ; V1-24 libre (prochain identifiant calculé)');
const fin1 = instantane(); const ch1 = differents(initial, fin1); const permis = [...Object.keys(DOCS), APERCU].sort();
ok(Object.keys(DOCS).every((p) => ch1.includes(p)) && ch1.every((p) => permis.includes(p)), 'arbre de travail : seuls les quatre documents changent (au plus l\'aperçu régénéré) ; manifeste, recalculs, rapports protégés, normes, données, registre inchangés', ch1.join(', ') + ' ; ' + Object.keys(fin1).length + ' fichiers comparés');
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide');
const chk = spawnSync('git', ['diff', '--check'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'git diff --check (commande de référence)', 'code ' + chk.status);
dire('\nconsignation d\'E1 à E4 appliquée : contrôles conformes');
fin(0);
