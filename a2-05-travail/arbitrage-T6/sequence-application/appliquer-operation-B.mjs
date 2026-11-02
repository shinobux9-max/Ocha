// A2-05 · volet 1 · lot 3 : opération B, protection du rapport arbitré de T6 (39e entrée du manifeste) et synchronisation du bloc d'état,
// enchaînées, EN PROPOSITION : à n'exécuter qu'après l'opération A et sur une autorisation explicite portant sur le plan établi et relu.
// Deux modes, mêmes préconditions (état final de l'opération A, sans écriture) :
//   --etablir : sur une copie jetable du dépôt (identité vérifiée fichier par fichier), ajout et aperçu ; écrit seulement, dans
//               arbitrage-T6/operation-B/etablissement/, l'aperçu prévu, le manifeste prévu et la trace ; donne le plan et l'empreinte de l'aperçu.
//   --appliquer --plan <16 hex> --apercu <sha256> : rétablit d'abord le plan sur une copie neuve et le compare aux valeurs relues (arrêt avant
//               toute écriture s'il diffère) ; sauvegarde de départ (operation-B/depart/, refus s'il existe) ; (1) ajout unique par
//               empreintes-lot3.mjs --ajouter, manifeste = prévisualisation et copie ; (2) aperçu recalculé sur le dépôt réel ; (3) plan et aperçu
//               identiques aux valeurs relues, diff limité aux trois lignes prévues de chaque bloc ; (4) sync-stable.mjs --appliquer --plan, une fois ;
//               (5) contrôles complets. L'empreinte établie sur la copie n'est jamais appliquée sans être recalculée et vérifiée sur le dépôt réel.
// Arrêt au premier écart, sans réparation : état atteint et traces conservés (operation-B/sorties/operation-B-<mode>.txt).
// Usage : node a2-05-travail/arbitrage-T6/sequence-application/appliquer-operation-B.mjs <racine du dépôt> --etablir
//         node a2-05-travail/arbitrage-T6/sequence-application/appliquer-operation-B.mjs <racine du dépôt> --appliquer --plan <p> --apercu <a>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync, mkdtempSync, rmSync, cpSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const args = process.argv.slice(3); const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const MODE = args.includes('--appliquer') ? 'appliquer' : args.includes('--etablir') ? 'etablir' : null;
const W = 'a2-05-travail/', T6 = W + 'arbitrage-T6/', OUT = T6 + 'operation-B/', LOG_A = T6 + 'operation-A/sorties/operation-A.txt';
const REC5 = W + 'recalcul-T5-perimetre.mjs', REC6 = W + 'recalcul-T6-perimetre.mjs', CBP = W + 'controle-bilan-pilote.mjs', CFG = W + 'audit-v1-lot3-T6.mjs';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T6.md', SAUV = T6 + 'proposition-T6.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', DOCS = [ETAT, ROAD], MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md';
const PREVISU = W + 'arbitrage-T5/application-protection/previsualiser-ajout.mjs';
// État final de l'opération A (versions installées) ; manifeste inchangé par elle
const INSTALLES = {
  [REC5]: '25b82c3287e35bd70843930cab455510b0aedee4836f849d2109f61c9a58bf30', [REC6]: '4fbbdaa3000600872b7d1eb09911281a49935c637e6943e4c5f3e6da9fc341fa',
  [CBP]: 'eee37a9e55cf85c99960fcaf32bd49fab4c3e51149128210e941c7b6f7f14bd9', [CFG]: '7aba8e2a45a38639aad3015e83d8d430f3cf926bae2f882ca86a714023515c96',
  [RAP]: '7e3bfd8ecc1221100a22e35e89bebc81ebfb43f673dc1f1a8d31c701ea4016df', [SAUV]: '858bc41c252aa38e13fe15434fdd1f3a24381734eb5764c7598377d848fb6224',
  [BIL]: '295fa2d395944ce312a6f5dccc4e0bb80ccd81c46602a03b9655a095fa45dd69', [ETAT]: 'ffa223837ab0e2b369a4631693bfc5b15c7941e43b04a114d701d9ba7c2803a7',
  [ROAD]: 'bfe061292c491aa950d5dd0d2f8a5135bda3795b5405fa8512ef932bd3202658', [MAN]: '8ba0603d0bcc8d1b7629f952f21467f242bc45a438b939899e9762a1236779b2',
};
const OUTILS = {
  [W + 'empreintes-lot3.mjs']: 'bac08d6c39622fea53bbbbde5609599103acea894f43312635fea329aec77e9e', [W + 'sync-stable.mjs']: '75b686d2a1458507ebb4af99a560caa2769a2a4bb227b06d7d5b0ef7fb4264a1',
  [PREVISU]: '257feb036ef899cfc1b966a46c5a3ca97c9dd4f342b5cd1bf27ae6ad674d7d81', [W + 'controle-relais-allege.mjs']: 'cd8e307e5664355ace8419cb05c27c95c801fed0f3f6f9e5a8874ece782bde24',
  [W + 'couverture-lot3.mjs']: '3de20300a501e5d161c5305ef47f7172701a1d5b29112ec1bd7233eb878b8bdb', [W + 'registre-tranches.json']: '60178e1f1a0233f049c0da4498a6d1a7df1d82fccc00ccb333f2ba798cc77a07',
};
// Diff attendu de chaque bloc d'état : trois lignes changent (marqueur ; Lot 3 ; Contrôles), les lignes Corrections et Tranches ne changent pas
const LOT3_AVANT = '- **Lot 3** : 274 sens arbitrés sur 377 ; 103 restent (0 proposés). **Bloc B** : 148 sur 148.';
const LOT3_APRES = '- **Lot 3** : 296 sens arbitrés sur 377 ; 81 restent (0 proposés). **Bloc B** : 148 sur 148.';
const CTL = (n) => '- **Contrôles** : registre de couverture sans omission ni doublon ; manifeste d\'empreintes, ' + n + ' rapports arbitrés identiques.';
// Chemins de machine (racine, dossier temporaire, sous leurs formes Windows, POSIX, échappée et URL) masqués : la trace reste exportable
const masquer = (l) => [[root, '<racine>'], [tmpdir(), '<temp>']].reduce((t, [p, n]) => [p, p.replace(/\\/g, '\\\\'), p.replace(/\\/g, '/'), p.replace(/\\/g, '/').replace(/ /g, '%20')].reduce((u, v) => u.split(v).join(n), t), l);
const log = []; const dire = (l) => { l = masquer(l); console.log(l); log.push(l); };
const fin = (code) => { mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'operation-B-' + (MODE ?? 'sans-mode') + '.txt'), log.join('\n') + '\n'); process.exit(code); };
let etat = 'préconditions (aucune écriture dans le dépôt)';
const ok = (c, quoi, detail) => {
  dire((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : ''));
  if (!c) { dire('\narrêt au premier écart ; état atteint : ' + etat + ' ; conservé, sans réparation'); fin(1); }
};
// Une interruption (exception, écriture refusée) est tracée comme un écart : même arrêt, même conservation de l'état atteint
process.on('uncaughtException', (e) => { dire('EXCEPTION ' + masquer(String(e?.message ?? e)).slice(0, 200)); ok(false, 'interruption'); });
const shaB = (b) => createHash('sha256').update(b).digest('hex'); const shaIn = (r, p) => (existsSync(join(r, p)) ? shaB(readFileSync(join(r, p))) : null); const sha = (p) => shaIn(root, p);
const lancerIn = (r, s, ...a) => { const x = spawnSync(process.execPath, [join(r, s), r, ...a], { cwd: r, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim(), exc: /^\s+at |^[A-Za-z]*Error: /m.test(x.stderr ?? '') }; };
const lancer = (s, ...a) => lancerIn(root, s, ...a);
const ecarts = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim());
const titres = (r) => ecarts(r).map((l) => l.replace(/^ÉCART\s+/, '').split(' : ')[0]);
const montrer = (nom, r) => { dire('   ' + nom + ' (code ' + r.code + (r.exc ? ', EXCEPTION' : '') + ') : ' + (r.out.split('\n').filter((l) => !/^\s+at /.test(l)).pop() ?? '')); for (const e of ecarts(r)) dire('      ' + e.slice(0, 260)); };
const q = (r, n) => (r.out.match(new RegExp('^\\s+juste Q' + n + ' .*→ (.*)$', 'm')) ?? [])[1];
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const instantaneIn = (r) => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
  if (statSync(join(r, p)).isDirectory()) marcher(p); else h[p] = shaIn(r, p); } }; marcher(''); return h; };
const differents = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const conformeSansEcart = (r) => r.code === 0 && !r.exc && !ecarts(r).length;
const sansCR = (t) => t.replace(/\r/g, '');
const bloc = (t) => { const s = sansCR(t); return s.slice(s.indexOf('<!-- a2-05:etat:debut'), s.indexOf('<!-- a2-05:etat:fin -->') + 24); };
const marqueur = (t) => (sansCR(t).match(/<!-- a2-05:etat:debut empreinte=([0-9a-f]{16}) /) ?? [])[1];
// Lignes +/- de l'aperçu, en-têtes « --- a/ » et « +++ b/ » exclus (une puce supprimée commence par « -- »)
const lignesPM = (t) => t.split('\n').filter((l) => /^[-+]/.test(l) && !/^(--- a\/|\+\+\+ b\/)/.test(l));
// Aperçu attendu : dans chaque document, exactement marqueur, Lot 3 et Contrôles (38 → 39) ; le marqueur et la ligne Lot 3 se suivent, git les
// rend en un seul bloc (deux suppressions, puis deux ajouts) ; nouveau marqueur identique dans les deux documents
const verifierApercu = (texte, avant) => {
  const L = lignesPM(texte); const m0 = marqueur(avant);
  const un = (l, i) => [l.startsWith('-<!-- a2-05:etat:debut empreinte=' + m0 + ' '), l === '-' + LOT3_AVANT, /^\+<!-- a2-05:etat:debut empreinte=[0-9a-f]{16} /.test(l), l === '+' + LOT3_APRES, l === '-' + CTL(38), l === '+' + CTL(39)][i % 6];
  const mNouveaux = L.filter((l) => l.startsWith('+<!--')).map((l) => (l.match(/empreinte=([0-9a-f]{16})/) ?? [])[1]);
  return { bon: L.length === 12 && L.every(un) && mNouveaux[0] === mNouveaux[1], n: L.length, marqueurAvant: m0, marqueurApres: mNouveaux[0] };
};
const preparerCopie = () => {
  const tmp = mkdtempSync(join(tmpdir(), 'ocha-operation-b-')); const C = join(tmp, 'arbre');
  const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
  for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
  return { tmp, C, code: cl.status };
};

dire('# Opération B (' + (MODE ?? 'mode absent') + ') : préconditions (aucune écriture dans le dépôt)');
ok(MODE !== null, 'mode : --etablir ou --appliquer');
if (MODE === 'appliquer') ok(/^[0-9a-f]{16}$/.test(opt('--plan') ?? '') && /^[0-9a-f]{64}$/.test(opt('--apercu') ?? ''), 'valeurs relues fournies : --plan (16 hex) et --apercu (sha256)', (opt('--plan') ?? '—') + ' ; ' + (opt('--apercu') ?? '—'));
ok(!existsSync(join(root, OUT, 'depart')), OUT + 'depart/ absent (opération B non déjà appliquée)');
if (MODE === 'etablir') ok(!existsSync(join(root, OUT, 'etablissement')), OUT + 'etablissement/ absent (aucun établissement antérieur écrasé)');
ok(existsSync(join(root, LOG_A)) && readFileSync(join(root, LOG_A), 'utf8').trimEnd().split('\n').pop().startsWith('opération A conforme'), 'opération A terminée conforme (dernière ligne de sa trace)', LOG_A);
for (const [p, h] of Object.entries(INSTALLES)) ok(sha(p) === h, 'état après l\'opération A : ' + p, h);
for (const [p, h] of Object.entries(OUTILS)) ok(sha(p) === h, 'outil lu, inchangé : ' + p, h);
const brut0 = readFileSync(join(root, MAN)); const m0 = JSON.parse(brut0.toString('utf8')); const cles0 = Object.keys(m0.empreintes);
ok(cles0.length === 38 && !Object.hasOwn(m0.empreintes, RAP) && cles0.every((p) => sha(p) === m0.empreintes[p]) && m0.ajouts.length === 10, 'manifeste : 38 empreintes identiques, 10 ajouts au journal ; rapport de T6 absent');
const A0 = { cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs'), cbp: lancer(CBP), rec5: lancer(REC5), rec6: lancer(REC6), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application') };
for (const [k, r] of Object.entries(A0)) montrer('avant ' + k, r);
ok(A0.emp.code === 0 && A0.emp.out === 'empreintes : 38 rapports contrôlés, identiques ; rapports arbitrés hors du manifeste : ' + RAP, 'rapport arbitré de T6 seul document arbitré hors du manifeste');
ok([A0.cbp, A0.rec5, A0.rec6].every(conformeSansEcart) && A0.cov.code === 0 && /^couverture : 296 arbitrés, 0 proposés, 81 restants, sur 377/.test(A0.cov.out), 'contrôle du pilote, recalculs de T5 et de T6 conformes ; couverture 296/377');
ok(A0.rel.code === 1 && A0.rel.out.split('\n').pop() === '28 conformes sur 30' && eq(titres(A0.rel).map((t) => t.split(/\s+/)[0]), ['C8', 'C9a', 'FAUX']), 'relais 28 sur 30 (C8 et C9a) : état intermédiaire laissé par l\'opération A');
const t0 = Object.fromEntries(DOCS.map((p) => [p, readFileSync(join(root, p), 'utf8')]));
ok(bloc(t0[ETAT]) === bloc(t0[ROAD]) && bloc(t0[ETAT]).includes(LOT3_AVANT + '\n') && bloc(t0[ETAT]).includes(CTL(38) + '\n'), 'blocs d\'état identiques dans les deux documents, à 274/377 et 38 empreintes', 'marqueur ' + marqueur(t0[ETAT]));
const idx0 = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx0.status === 0 && idx0.stdout.trim() === '', 'index vide');
const initial = instantaneIn(root);

// Établissement sur une copie jetable : identité vérifiée, ajout, aperçu ; rien n'est écrit dans le dépôt
dire('\n# Établissement du plan sur une copie jetable');
const cp = preparerCopie(); ok(cp.code === 0, 'copie jetable (clone et arbre de travail)', 'code ' + cp.code);
const dC = differents(initial, instantaneIn(cp.C)); ok(!dC.length, 'copie identique au dépôt, fichier par fichier', Object.keys(initial).length + ' fichiers ; différents : ' + (dC.join(', ') || 'aucun'));
const ajC = lancerIn(cp.C, W + 'empreintes-lot3.mjs', '--ajouter'); ok(ajC.code === 0 && ajC.out === 'manifeste : 1 rapport(s) ajouté(s) : ' + RAP, 'copie : ajout du seul rapport de T6', ajC.out);
const brutC = readFileSync(join(cp.C, MAN)); const apC = lancerIn(cp.C, W + 'sync-stable.mjs', '--apercu'); const texteC = readFileSync(join(cp.C, APERCU), 'utf8');
const planC = (apC.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const vC = verifierApercu(texteC, t0[ETAT]);
ok(apC.code === 0 && /^[0-9a-f]{16}$/.test(planC ?? ''), 'copie : aperçu calculé', 'plan ' + planC);
ok(vC.bon, 'copie : diff des blocs limité aux trois lignes prévues dans chaque document (marqueur ; Lot 3 274 → 296, 103 → 81 ; Contrôles 38 → 39)', vC.n + ' lignes +/- ; marqueur ' + vC.marqueurAvant + ' → ' + vC.marqueurApres);
rmSync(cp.tmp, { recursive: true, force: true });
const apercuC = shaB(texteC);
dire('   plan établi : ' + planC + ' ; empreinte de l\'aperçu : ' + apercuC + ' ; manifeste prévu : ' + shaB(brutC));

if (MODE === 'etablir') {
  const E = OUT + 'etablissement/'; mkdirSync(join(root, E), { recursive: true });
  writeFileSync(join(root, E, 'apercu-prevu.md'), texteC); writeFileSync(join(root, E, 'manifeste-prevu.json'), brutC);
  ok(sha(E + 'apercu-prevu.md') === apercuC, 'aperçu prévu conservé : ' + E + 'apercu-prevu.md', apercuC);
  const ch = differents(initial, instantaneIn(root)); ok(!ch.length, 'dépôt inchangé (hors du dossier de l\'opération)', ch.join(', ') || 'aucune modification');
  dire('\nplan établi, non appliqué. Après relecture et autorisation explicite :');
  dire('node a2-05-travail/arbitrage-T6/sequence-application/appliquer-operation-B.mjs <racine du dépôt> --appliquer --plan ' + planC + ' --apercu ' + apercuC);
  fin(0);
}

ok(planC === opt('--plan') && apercuC === opt('--apercu'), 'plan et aperçu rétablis sur la copie = valeurs relues (sinon : arrêt avant toute écriture)', planC + ' ; ' + apercuC);

dire('\n# Sauvegarde de départ');
const DEP = OUT + 'depart/';
for (const p of [MAN, ETAT, ROAD, APERCU]) { mkdirSync(join(root, DEP, p, '..'), { recursive: true }); copyFileSync(join(root, p), join(root, DEP, p)); ok(sha(DEP + p) === initial[p], 'sauvegarde ' + DEP + p, initial[p].slice(0, 12) + '…'); }

dire('\n# (1) Ajout unique du rapport arbitré de T6 (39e entrée)');
const tmpP = mkdtempSync(join(tmpdir(), 'ocha-previsu-39-')); const fPrev = join(tmpP, 'manifeste-previsualise.json');
const pv = spawnSync(process.execPath, [join(root, PREVISU), root, fPrev], { cwd: root, encoding: 'utf8' });
for (const l of ((pv.stdout ?? '') + (pv.stderr ?? '')).trim().split('\n')) dire('   prévisualisation : ' + l.split(fPrev).join('<aperçu hors dépôt>'));
const prevB = existsSync(fPrev) ? readFileSync(fPrev) : Buffer.alloc(0); rmSync(tmpP, { recursive: true, force: true });
ok(pv.status === 0 && pv.stdout.includes('rapports arbitrés hors du manifeste : ' + JSON.stringify([RAP])) && pv.stdout.includes('anomalies du manifeste existant : []') && pv.stdout.includes('anomalies après ajout simulé : []') && Buffer.compare(prevB, brutC) === 0,
  'prévisualisation : une seule entrée nouvelle, aucune anomalie ; identique au manifeste prévu sur la copie', shaB(prevB).slice(0, 12) + '…');
etat = 'sauvegarde faite ; manifeste non encore modifié';
const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); dire('   empreintes-lot3.mjs --ajouter (code ' + aj.code + ') : ' + aj.out);
etat = 'ajout tenté ; manifeste à vérifier ; synchronisation non appliquée';
const brut1 = readFileSync(join(root, MAN)); const m1 = JSON.parse(brut1.toString('utf8')); const cles1 = Object.keys(m1.empreintes);
ok(aj.code === 0 && aj.out === 'manifeste : 1 rapport(s) ajouté(s) : ' + RAP, 'ajout exécuté : le seul rapport arbitré de T6');
etat = 'manifeste à 39 entrées ; synchronisation non appliquée (bloc d\'état à 38)';
ok(Buffer.compare(brut1, prevB) === 0, 'manifeste écrit = prévisualisation = manifeste prévu sur la copie, octet pour octet', shaB(brut1));
ok(cles1.length === 39 && cles1[38] === RAP && m1.empreintes[RAP] === INSTALLES[RAP] && eq(cles1.slice(0, 38), cles0) && cles0.every((p) => m1.empreintes[p] === m0.empreintes[p])
  && m1.ajouts.length === 11 && eq(m1.ajouts.slice(0, 10), m0.ajouts) && eq(m1.ajouts[10].chemins, [RAP]), '39 entrées : 38 précédentes inchangées en valeur et en ordre ; 39e = rapport de T6 (7e3bfd8e…) ; un ajout au journal');

dire('\n# (2) et (3) Aperçu recalculé sur le dépôt réel, vérifié');
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); dire('   sync-stable.mjs --apercu (code ' + ap.code + ') : ' + ap.out.split('\n').pop());
const texte = readFileSync(join(root, APERCU), 'utf8'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'apercu-avant-application.md'), texte);
ok(ap.code === 0 && plan === opt('--plan'), 'plan recalculé sur le dépôt réel = plan relu', plan);
ok(shaB(texte) === opt('--apercu'), 'aperçu du dépôt réel identique, octet pour octet, à l\'aperçu relu', shaB(texte));
const v = verifierApercu(texte, t0[ETAT]); ok(v.bon, 'diff limité aux trois lignes prévues de chaque bloc', v.n + ' lignes +/- ; marqueur ' + v.marqueurAvant + ' → ' + v.marqueurApres);

dire('\n# (4) Application du plan (une seule fois)');
const app = lancer(W + 'sync-stable.mjs', '--appliquer', '--plan', plan); dire('   sync-stable.mjs --appliquer --plan ' + plan + ' (code ' + app.code + ') : ' + app.out);
etat = 'manifeste à 39 entrées ; synchronisation tentée, à vérifier';
ok(app.code === 0 && app.out === 'appliqué, plan ' + plan, 'synchronisation appliquée au plan ' + plan);
etat = 'manifeste à 39 entrées ; synchronisation appliquée ; contrôles finaux en cours';

dire('\n# (5) Contrôles après synchronisation');
const t1 = Object.fromEntries(DOCS.map((p) => [p, readFileSync(join(root, p), 'utf8')]));
for (const p of DOCS) {
  const a = t0[p].split('\n'), b = t1[p].split('\n'); const ch = a.map((l, i) => (l !== b[i] ? i : -1)).filter((i) => i >= 0); const cr = (l) => (l.endsWith('\r') ? '\r' : '');
  ok(a.length === b.length && ch.length === 3 && b[ch[0]] === a[ch[0]].replace('empreinte=' + v.marqueurAvant + ' ', 'empreinte=' + v.marqueurApres + ' ') && b[ch[1]] === LOT3_APRES + cr(a[ch[1]]) && a[ch[1]] === LOT3_AVANT + cr(a[ch[1]]) && b[ch[2]] === CTL(39) + cr(a[ch[2]]),
    p + ' : seules les trois lignes prévues changent (marqueur ; Lot 3 ; Contrôles), fins de ligne conservées', 'lignes ' + ch.map((i) => i + 1).join(', ') + ' ; ' + sha(p));
}
ok(bloc(t1[ETAT]) === bloc(t1[ROAD]) && marqueur(t1[ETAT]) === v.marqueurApres, 'blocs générés identiques dans les deux documents, au marqueur ' + v.marqueurApres);
const ap1 = lancer(W + 'sync-stable.mjs', '--apercu'); const texte1 = readFileSync(join(root, APERCU), 'utf8'); writeFileSync(join(root, OUT, 'sorties', 'apercu-apres-application.md'), texte1);
ok(ap1.code === 0 && lignesPM(texte1).length === 0, 'aperçu suivant vide (aucune ligne +/-)', 'plan ' + (ap1.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]);
const A = { cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs'), cbp: lancer(CBP), rec5: lancer(REC5), rec6: lancer(REC6), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application') };
for (const [k, r] of Object.entries(A)) montrer('après ' + k, r);
ok(Object.values(A).every((r) => !r.exc), 'aucune exception');
ok(A.rel.code === 0 && A.rel.out.split('\n').pop() === '30 conformes sur 30' && !ecarts(A.rel).length, 'relais --apres-application : 30 sur 30');
ok(A.emp.code === 0 && A.emp.out === 'empreintes : 39 rapports contrôlés, identiques', 'manifeste : 39 empreintes conformes, aucun rapport arbitré hors du manifeste');
ok([A.cbp, A.rec5, A.rec6].every(conformeSansEcart), 'contrôle du bilan du pilote évolutif, recalculs de T5 et de T6 conformes');
ok(A.cov.code === 0 && /^couverture : 296 arbitrés, 0 proposés, 81 restants, sur 377/.test(A.cov.out) && q(A.rel, 2) === '296/377', 'couverture 296/377, 81 restants');
ok(q(A.rel, 4) === '196/172/0' && q(A.rel, 5) === 'V1-24' && q(A.rel, 11) === '39', 'relais : 196 corrections dans 172 ENTRY, aucune appliquée ; V1-24 libre ; 39 rapports protégés', q(A.rel, 4) + ' ; ' + q(A.rel, 5) + ' ; ' + q(A.rel, 11));
const ch1 = differents(initial, instantaneIn(root));
ok(eq(ch1, [APERCU, ETAT, MAN, ROAD].sort()), 'arbre de travail : seuls le manifeste, les deux documents de pilotage et l\'aperçu changent (rapports protégés, normes, données, registre inchangés)', ch1.join(', '));
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide');
const chk = spawnSync('git', ['diff', '--check'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'git diff --check (commande de référence)', 'code ' + chk.status);
dire('\nopération B conforme : rapport arbitré de T6 protégé (39e entrée) ; bloc d\'état synchronisé au plan ' + plan + ' ; relais 30 sur 30');
fin(0);
