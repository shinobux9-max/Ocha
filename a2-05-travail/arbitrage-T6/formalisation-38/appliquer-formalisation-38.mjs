// A2-05 · volet 1 · lot 3 : application de la formalisation de T6 (installation des trois contrôles et incident ; 38e entrée ; synchronisation
// restant à effectuer ; inventaire), autorisée le 2026-10-28, avant la synchronisation. (1) Préconditions, sans écriture : diffs relus et versions
// proposées à leurs empreintes ; diffs régénérés (document actuel → version proposée) identiques octet pour octet aux diffs relus ; ajouts absents ;
// chaque hunk présent une seule fois, à sa place ; 38 empreintes ; relais 30 sur 30. (2) Sauvegarde des quatre documents dans
// formalisation-38/application/depart/ (refus s'il existe). (3) Application des hunks relus, par remplacements ciblés (aucune copie de document
// complet) ; résultat égal, octet pour octet, à la version proposée relue. (4) Contrôles : blocs a2-05:etat intacts ; rubriques communes
// identiques ; bilan antérieur préfixe exact ; relais, manifeste, contrôles, couverture, corrections ; arbre de travail (seuls les quatre
// documents changent) ; index vide ; git diff --check. (5) Aperçu de synchronisation, non appliqué : plan attendu, seules les lignes du marqueur et
// « Contrôles » des deux blocs ; copie et empreinte dans application/sorties/. Arrêt au premier écart, sans réparation.
// Usage : node a2-05-travail/arbitrage-T6/formalisation-38/appliquer-formalisation-38.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', F = W + 'arbitrage-T6/formalisation-38/', OUT = F + 'application/', APERCU = W + 'sync-stable-apercu.md';
const PLAN = 'c8f22606c3c690bb';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = W + 'INVENTAIRE-SCRIPTS.md';
// Document : [version proposée relue, diff relu, empreinte de la version proposée, empreinte du diff]
const DOCS = {
  [ETAT]: ['ETAT-ACTUEL.md', 'diffs/ETAT-ACTUEL.md.diff', '678646c84e712d68d9475afe1477e80922f0296a273726652c65373014a27737', 'd6960ba2b50252b4fec5209cd97048902bd5f9c735c1081780184dbef03d2655'],
  [ROAD]: ['ROADMAP.md', 'diffs/ROADMAP.md.diff', '11ea749e7dce4b00bfab68d482e174bdbbdb18c9d6a584a71f881a80ebc1a6e4', 'c398b1d81939b8e101e6fb28739aead27767751ead4e6f22111a406c21352772'],
  [BIL]: ['etape2-A2-05-bilan-volet2.md', 'diffs/etape2-A2-05-bilan-volet2.md.diff', '55def34bcd57092c9101cf181029f7c4fc93db45d70d2faa8cb47fd94798fb92', '7bd5554afd18987547155ce81a134e70b9f2177df34461d85627bd441bca486e'],
  [INV]: ['INVENTAIRE-SCRIPTS.md', 'diffs/INVENTAIRE-SCRIPTS.md.diff', '3c1b5b16bafa4fee804ccb3d80c0cc3a7eb84e5d42aa4ef31ff6319e6d07261a', '45292d1afe0e99bd54fe18d7018dccd49e7937af937a79f62c0509b4645a8597'],
};
const log = []; const dire = (l) => { console.log(l); log.push(l); };
const fin = (code) => { mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'application.txt'), log.join('\n') + '\n'); process.exit(code); };
const ok = (c, quoi, detail) => { dire((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : '')); if (!c) { dire('\narrêt au premier écart, sans réparation'); fin(1); } };
const shaB = (b) => createHash('sha256').update(b).digest('hex'); const sha = (p) => shaB(readFileSync(join(root, p)));
const lire = (p) => readFileSync(join(root, p), 'utf8');
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecarts = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim());
const montrer = (nom, r) => { dire('   ' + nom + ' (code ' + r.code + ') : ' + (r.out.split('\n').filter((l) => !/^\s+at /.test(l)).pop() ?? '')); for (const e of ecarts(r)) dire('      ' + e.slice(0, 260)); };
const q = (r, n) => (r.out.match(new RegExp('^\\s+juste Q' + n + ' .*→ (.*)$', 'm')) ?? [])[1];
const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
  if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = sha(p); } }; marcher(''); return h; };
const differents = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
// Hunks d'un diff unifié : position d'origine, lignes d'origine (contexte et retraits), lignes nouvelles (contexte et ajouts) ; le \r éventuel reste
const hunks = (d) => { const H = []; let h = null; for (const l of d.split('\n')) { const m = l.match(/^@@ -(\d+)(?:,(\d+))? \+\d+(?:,\d+)? @@/); if (m) { h = { debut: +m[1], avant: [], apres: [] }; H.push(h); continue; }
  if (!h || l.startsWith('diff --git') || l.startsWith('index ') || l.startsWith('--- ') || l.startsWith('+++ ')) continue;
  if (l.startsWith(' ')) { h.avant.push(l.slice(1)); h.apres.push(l.slice(1)); } else if (l.startsWith('-')) h.avant.push(l.slice(1)); else if (l.startsWith('+')) h.apres.push(l.slice(1)); } return H; };
const occurrences = (L, bloc) => { const r = []; for (let i = 0; i + bloc.length <= L.length; i++) if (bloc.every((x, k) => L[i + k] === x)) r.push(i); return r; };
const bloc = (t) => { const s = t.replace(/\r/g, ''); return s.slice(s.indexOf('<!-- a2-05:etat:debut'), s.indexOf('<!-- a2-05:etat:fin -->') + 24); };

dire('# Préconditions (aucune écriture)');
const actuels = {};
for (const [p, [v, d, hv, hd]] of Object.entries(DOCS)) {
  ok(sha(F + v) === hv, p + ' : version proposée relue à son empreinte', hv.slice(0, 12) + '…');
  ok(sha(F + d) === hd, p + ' : diff relu à son empreinte', hd.slice(0, 12) + '…');
  const reg = spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', p, F + v], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout;
  ok(reg === lire(F + d), p + ' : diff régénéré (document actuel → version proposée) identique octet pour octet au diff relu', 'document actuel ' + sha(p).slice(0, 12) + '…');
  actuels[p] = sha(p);
}
const t0 = Object.fromEntries(Object.keys(DOCS).map((p) => [p, lire(p)]));
ok(![ETAT, ROAD].some((p) => t0[p].includes('trois contrôles adaptés à la 38e entrée installés le 2026-10-28')) && !/^\| 2026-10-28 \|/m.test(t0[ETAT]) && !/^### 8\.98 /m.test(t0[BIL]) && !/perimetre-T6|recalcul-T6|arbitrage-T6/.test(t0[INV]),
  'ajouts absents (rubrique, ligne de journal du 2026-10-28, §8.98, lignes de T6 de l\'inventaire)');
const plan = {};
for (const [p, [, d]] of Object.entries(DOCS)) {
  const L = t0[p].split('\n'); const H = hunks(lire(F + d));
  for (const [k, h] of H.entries()) { const o = occurrences(L, h.avant); ok(o.length === 1 && o[0] === h.debut - 1, p + ', hunk ' + (k + 1) + '/' + H.length + ' : ancre unique, à sa place (ligne ' + h.debut + ')', o.length + ' occurrence(s)'); }
  plan[p] = H;
}
const man = JSON.parse(lire(W + 'empreintes-rapports-arbitres.json')).empreintes;
const emp0 = lancer(W + 'empreintes-lot3.mjs'); ok(Object.keys(man).length === 38 && emp0.code === 0 && emp0.out === 'empreintes : 38 rapports contrôlés, identiques', 'manifeste : 38 empreintes conformes', emp0.out);
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); ok(rel0.code === 0 && rel0.out.split('\n').pop() === '30 conformes sur 30', 'relais 30 sur 30 avant la formalisation');
const initial = instantane();

dire('\n# Sauvegarde des originaux');
const DEP = OUT + 'depart/'; ok(!existsSync(join(root, DEP)), DEP + ' absent (aucune sauvegarde antérieure écrasée)');
mkdirSync(join(root, DEP), { recursive: true });
for (const [p, [v]] of Object.entries(DOCS)) { copyFileSync(join(root, p), join(root, DEP + v)); ok(sha(DEP + v) === actuels[p], 'sauvegarde ' + DEP + v, actuels[p].slice(0, 12) + '…'); }

dire('\n# Application des remplacements ciblés (hunks relus)');
for (const [p, [v, , hv]] of Object.entries(DOCS)) {
  const L = t0[p].split('\n');
  for (const h of [...plan[p]].reverse()) L.splice(h.debut - 1, h.avant.length, ...h.apres);
  const t = L.join('\n'); ok(shaB(t) === hv && t === lire(F + v), p + ' : résultat égal, octet pour octet, à la version proposée relue', plan[p].length + ' hunk(s) ; ' + hv.slice(0, 12) + '…');
  writeFileSync(join(root, p), t); ok(sha(p) === hv, p + ' : écrit', hv.slice(0, 12) + '…');
}

dire('\n# Contrôles après formalisation');
const t1 = Object.fromEntries(Object.keys(DOCS).map((p) => [p, lire(p)]));
ok([ETAT, ROAD].every((p) => bloc(t1[p]) === bloc(t0[p]) && bloc(t1[p]).length > 100), 'blocs a2-05:etat intacts dans les deux documents de pilotage');
const pa = (t) => (t.match(/^- \*\*Prochaine action\.\*\*[^\r\n]*/m) ?? [''])[0];
const seg = (t) => t.slice(t.indexOf('- **Terminé et arbitré.**'), t.indexOf('- **Prochaine action.**')).replace(/\r/g, '');
ok(pa(t1[ETAT]) === pa(t1[ROAD]) && seg(t1[ETAT]) === seg(t1[ROAD]) && seg(t1[ETAT]).length > 1000, 'rubriques communes identiques (« Terminé et arbitré » à « Reste à faire » ; « Prochaine action »)');
ok(t1[BIL].startsWith(t0[BIL].replace(/(\r?\n)+$/, '')) && /^### 8\.98 /m.test(t1[BIL]), 'bilan : §8.97 et texte antérieur inchangés (préfixe exact) ; §8.98 ajouté');
const A = { cbp: lancer(W + 'controle-bilan-pilote.mjs'), rec5: lancer(W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(W + 'recalcul-T6-perimetre.mjs'), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application'), cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs') };
for (const [k, r] of Object.entries(A)) montrer('après ' + k, r);
ok(A.rel.code === 0 && A.rel.out.split('\n').pop() === '30 conformes sur 30' && !ecarts(A.rel).length, 'relais --apres-application : 30 sur 30');
ok(A.emp.code === 0 && A.emp.out === 'empreintes : 38 rapports contrôlés, identiques', '38 empreintes conformes');
ok(A.cbp.code === 0 && !ecarts(A.cbp).length, 'contrôle du bilan du pilote conforme');
ok(A.rec5.code === 0 && A.rec6.code === 0 && !ecarts(A.rec5).length && !ecarts(A.rec6).length, 'recalculs de T5 et de T6 conformes');
ok(A.cov.code === 0 && /^couverture : 274 arbitrés, 0 proposés, 103 restants, sur 377/.test(A.cov.out) && q(A.rel, 2) === '274/377', 'couverture 274/377, 103 restants');
ok(q(A.rel, 4) === '196/172/0' && q(A.rel, 5) === 'V1-24' && q(A.rel, 11) === '38', 'corrections 196 dans 172 ENTRY, aucune appliquée ; V1-24 libre ; 38 rapports protégés');
const apres = instantane(); const ch1 = differents(initial, apres);
ok(JSON.stringify(ch1) === JSON.stringify(Object.keys(DOCS).sort()), 'arbre de travail : seuls les quatre documents changent (normes, données, registre, rapports protégés, manifeste inchangés)', ch1.join(', ') + ' ; ' + Object.keys(apres).length + ' fichiers comparés');
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide');
const chk = spawnSync('git', ['diff', '--check'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'git diff --check (commande de référence)', 'code ' + chk.status);

dire('\n# Aperçu de synchronisation (non appliqué)');
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); dire('   sync-stable.mjs --apercu (code ' + ap.code + ') : ' + ap.out.split('\n').pop());
const texte = lire(APERCU); const p1 = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'apercu-apres-formalisation.md'), texte);
// Lignes +/- des diffs, en-têtes « --- a/ » et « +++ b/ » exclus (une puce supprimée commence par « -- »)
const lignes = texte.split('\n').filter((l) => /^[-+]/.test(l) && !/^(--- a\/|\+\+\+ b\/)/.test(l));
const hors = lignes.filter((l) => !/^[-+](<!-- a2-05:etat:debut empreinte=[0-9a-f]{16} |- \*\*Contrôles\*\* : )/.test(l));
ok(ap.code === 0 && p1 === PLAN, 'plan de l\'aperçu = ' + PLAN, p1);
ok(hors.length === 0 && lignes.length === 8 && lignes.filter((l) => l.startsWith('+- **Contrôles**') && l.includes('38 rapports arbitrés identiques')).length === 2 && lignes.filter((l) => l.startsWith('-- **Contrôles**') && l.includes('37 rapports arbitrés identiques')).length === 2,
  'aperçu : seuls le marqueur généré et le passage de 37 à 38 empreintes, dans chaque bloc ; aucun autre chiffre', lignes.length + ' lignes +/- ; autres : ' + hors.length);
dire('   aperçu conservé : ' + OUT + 'sorties/apercu-apres-formalisation.md ; empreinte ' + shaB(texte));
const final = instantane(); const ch2 = differents(initial, final);
ok(JSON.stringify(ch2) === JSON.stringify([...Object.keys(DOCS), APERCU].sort()), 'arbre de travail : seuls les quatre documents et l\'aperçu de synchronisation diffèrent ; plan non appliqué', ch2.join(', '));
dire('\nformalisation appliquée : contrôles conformes ; nouveau plan présenté, non appliqué');
fin(0);
