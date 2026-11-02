// A2-05 · volet 1 · lot 3 : opération A, inscription de l'arbitrage de T6 (décision du 2026-10-29), EN PROPOSITION : à n'exécuter que sur une
// autorisation explicite. Quatre étapes, dans l'ordre simulé : (1) recalcul de T5 adapté ; (2) configuration de T6 (ARBITRAGE), rapport régénéré
// par le module v2, proposition sauvegardée, recalcul de T6 évolutif ; (3) §8.100 du bilan et fragments de pilotage ; (4) contrôle du bilan du
// pilote évolutif. Préconditions, sans écriture : chaque fichier remplacé à son empreinte de départ, chaque version installée à son empreinte
// relue, outils lus inchangés, manifeste inchangé (38 entrées). Sauvegarde de départ dans arbitrage-T6/operation-A/depart/ (refus s'il existe).
// Après chaque étape : empreintes écrites, résultats attendus de chaque contrôle, arbre de travail comparé à l'état de départ (seuls les
// fichiers prévus diffèrent). État final attendu : relais 28 sur 30 (C8 et C9a), état intermédiaire prévu, non final. Arrêt au premier écart,
// sans réparation : l'état atteint et la trace (operation-A/sorties/operation-A.txt) sont conservés. Le manifeste n'est pas touché.
// Usage : node a2-05-travail/arbitrage-T6/sequence-application/appliquer-operation-A.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T6 = W + 'arbitrage-T6/', OUT = T6 + 'operation-A/', INS = T6 + 'inscription/';
const REC5 = W + 'recalcul-T5-perimetre.mjs', REC6 = W + 'recalcul-T6-perimetre.mjs', CBP = W + 'controle-bilan-pilote.mjs', CFG = W + 'audit-v1-lot3-T6.mjs';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T6.md', SAUV = T6 + 'proposition-T6.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', MAN = W + 'empreintes-rapports-arbitres.json';
// Versions à installer (propositions relues et retenues) et empreintes complètes
const P5A = T6 + 'adaptation-T5/proposition-recalcul-T5-perimetre-arbitre-T6.mjs', P6E = T6 + 'versions-finales/proposition-recalcul-T6-perimetre-evolutif.mjs';
const PCB = T6 + 'versions-finales-2/proposition-controle-bilan-pilote-evolutif.mjs';
const SOURCES = {
  [P5A]: '25b82c3287e35bd70843930cab455510b0aedee4836f849d2109f61c9a58bf30', [P6E]: '4fbbdaa3000600872b7d1eb09911281a49935c637e6943e4c5f3e6da9fc341fa',
  [PCB]: 'eee37a9e55cf85c99960fcaf32bd49fab4c3e51149128210e941c7b6f7f14bd9',
  [INS + 'audit-v1-lot3-T6.mjs']: '7aba8e2a45a38639aad3015e83d8d430f3cf926bae2f882ca86a714023515c96',
  [INS + 'etape2-A2-05-volet1-lot3-T6.md']: '7e3bfd8ecc1221100a22e35e89bebc81ebfb43f673dc1f1a8d31c701ea4016df',
  [INS + 'proposition-T6.md']: '858bc41c252aa38e13fe15434fdd1f3a24381734eb5764c7598377d848fb6224',
  [INS + 'etape2-A2-05-bilan-volet2.md']: '295fa2d395944ce312a6f5dccc4e0bb80ccd81c46602a03b9655a095fa45dd69',
  [INS + 'ETAT-ACTUEL.md']: 'ffa223837ab0e2b369a4631693bfc5b15c7941e43b04a114d701d9ba7c2803a7',
  [INS + 'ROADMAP.md']: 'bfe061292c491aa950d5dd0d2f8a5135bda3795b5405fa8512ef932bd3202658',
};
// Fichiers du dépôt à leur empreinte de départ (ceux que l'opération remplace, et le manifeste, qu'elle ne touche pas)
const DEPART = {
  [REC5]: '44b49ef9b65874abd6acd878ff51e2d2165a74b9e062436883fb51473be4f4cc', [REC6]: '614f6b64b71ea43f52bcca64b6cfe60fdb1e822e98b4143bb74967b49f1b2cd9',
  [CBP]: '5a4c6624e8d5c1564f04b7e141f7e55f3c4afe6a253c19608d99e086b84facf7', [CFG]: '3a94949fb69788b551be6645df04b7e1808880b1f2187d04323a1a06c6f46624',
  [RAP]: '858bc41c252aa38e13fe15434fdd1f3a24381734eb5764c7598377d848fb6224', [BIL]: '7ed05ba769f8659074c3d964b7d13393b5e53b600d2c581eee249706912dcb79',
  [ETAT]: '425d85880d232dc0da34f58f08cfba7a4d87884994e8ca27429eadd2e92d374c', [ROAD]: 'dc93c396cb6fc8f16680fc0c712c51052e1cadf1ba53827c2ace506d893adda9',
  [MAN]: '8ba0603d0bcc8d1b7629f952f21467f242bc45a438b939899e9762a1236779b2',
};
// Outils lus pendant l'opération, non modifiés
const OUTILS = {
  [W + 'lot3-commun-v2.mjs']: 'cbd42c6c874c6c71c84d560010787e3f82187ed963a350f6e387b9d9c45efbde', [W + 'empreintes-lot3.mjs']: 'bac08d6c39622fea53bbbbde5609599103acea894f43312635fea329aec77e9e',
  [W + 'sync-stable.mjs']: '75b686d2a1458507ebb4af99a560caa2769a2a4bb227b06d7d5b0ef7fb4264a1', [W + 'controle-relais-allege.mjs']: 'cd8e307e5664355ace8419cb05c27c95c801fed0f3f6f9e5a8874ece782bde24',
  [W + 'couverture-lot3.mjs']: '3de20300a501e5d161c5305ef47f7172701a1d5b29112ec1bd7233eb878b8bdb', [W + 'registre-tranches.json']: '60178e1f1a0233f049c0da4498a6d1a7df1d82fccc00ccb333f2ba798cc77a07',
};
// Chemins de machine (racine, dossier temporaire, sous leurs formes Windows, POSIX, échappée et URL) masqués : la trace reste exportable
const masquer = (l) => [[root, '<racine>'], [tmpdir(), '<temp>']].reduce((t, [p, n]) => [p, p.replace(/\\/g, '\\\\'), p.replace(/\\/g, '/'), p.replace(/\\/g, '/').replace(/ /g, '%20')].reduce((u, v) => u.split(v).join(n), t), l);
const log = []; const dire = (l) => { l = masquer(l); console.log(l); log.push(l); };
const fin = (code) => { mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'operation-A.txt'), log.join('\n') + '\n'); process.exit(code); };
let etapeEnCours = 'préconditions (aucune écriture)';
const ok = (c, quoi, detail) => {
  dire((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : ''));
  if (!c) { dire('\narrêt au premier écart, pendant : ' + etapeEnCours + ' ; état atteint conservé, sans réparation ; sauvegarde de départ : ' + (existsSync(join(root, OUT, 'depart')) ? OUT + 'depart/' : 'aucune')); fin(1); }
};
// Une interruption (exception, écriture refusée) est tracée comme un écart : même arrêt, même conservation de l'état atteint
process.on('uncaughtException', (e) => { dire('EXCEPTION ' + masquer(String(e?.message ?? e)).slice(0, 200)); ok(false, 'interruption'); });
const shaB = (b) => createHash('sha256').update(b).digest('hex'); const sha = (p) => (existsSync(join(root, p)) ? shaB(readFileSync(join(root, p))) : null);
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim(), exc: /^\s+at |^[A-Za-z]*Error: /m.test(r.stderr ?? '') }; };
const ecarts = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim());
const titres = (r) => ecarts(r).map((l) => l.replace(/^ÉCART\s+/, '').split(' : ')[0]);
const montrer = (nom, r) => { dire('   ' + nom + ' (code ' + r.code + (r.exc ? ', EXCEPTION' : '') + ') : ' + (r.out.split('\n').filter((l) => !/^\s+at /.test(l)).pop() ?? '')); for (const e of ecarts(r)) dire('      ' + e.slice(0, 260)); };
const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
  if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = sha(p); } }; marcher(''); return h; };
const differents = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
// Contrôles lancés après chaque étape, et attentes (fixées avant l'exécution, d'après la simulation relue)
const controles = () => { const r = { cov: lancer(W + 'couverture-lot3.mjs'), emp: lancer(W + 'empreintes-lot3.mjs'), cbp: lancer(CBP), rec5: lancer(REC5), rec6: lancer(REC6), rel: lancer(W + 'controle-relais-allege.mjs', '--apres-application') };
  for (const [k, v] of Object.entries(r)) montrer(k, v); return r; };
const COV_AVANT = /^couverture : 274 arbitrés, 22 proposés, 81 restants, sur 377 ; bloc B : 148\/148/, COV_APRES = /^couverture : 296 arbitrés, 0 proposés, 81 restants, sur 377 ; bloc B : 148\/148/;
const EMP_AVANT = 'empreintes : 38 rapports contrôlés, identiques', EMP_APRES = EMP_AVANT + ' ; rapports arbitrés hors du manifeste : ' + RAP;
const conformeSansEcart = (r) => r.code === 0 && !r.exc && !ecarts(r).length;
const attendre = (n, r, { cov, emp, rec6Seul, relais }) => {
  ok(Object.values(r).every((v) => !v.exc), n + ' : aucune exception');
  ok(r.cov.code === 0 && cov.test(r.cov.out), n + ' : couverture attendue', r.cov.out.split('\n')[0].slice(0, 110));
  ok(r.emp.code === 0 && r.emp.out === emp, n + ' : outil du manifeste, sortie attendue', r.emp.out);
  ok(conformeSansEcart(r.cbp), n + ' : contrôle du bilan du pilote conforme');
  ok(conformeSansEcart(r.rec5), n + ' : recalcul de T5 conforme');
  if (rec6Seul) ok(r.rec6.code === 1 && eq(titres(r.rec6).map((t) => t.replace(/ \([0-9]+ rapports.*$/, '')), ['sens non encore examinés']), n + ' : recalcul de T6 en service, son seul écart connu (sens non encore examinés)');
  else ok(conformeSansEcart(r.rec6), n + ' : recalcul de T6 conforme');
  if (relais === 30) ok(r.rel.code === 0 && r.rel.out.split('\n').pop() === '30 conformes sur 30' && !ecarts(r.rel).length, n + ' : relais 30 sur 30');
  else ok(r.rel.code === 1 && r.rel.out.split('\n').pop() === '28 conformes sur 30' && eq(titres(r.rel).map((t) => t.split(/\s+/)[0]), ['C8', 'C9a', 'FAUX']) && /FAUX\s+Q2 .*→ 274\/377 \(attendu : 296\/377\)/.test(r.rel.out),
    n + ' : relais 28 sur 30, exactement C8 (Q2 : 274/377 au lieu de 296/377) et C9a ; état intermédiaire prévu');
};
const installer = (cible, source) => { copyFileSync(join(root, source), join(root, cible)); ok(sha(cible) === SOURCES[source], cible + ' ← ' + source, sha(cible)); };

dire('# Opération A : préconditions (aucune écriture dans le dépôt)');
for (const [p, h] of Object.entries(SOURCES)) ok(sha(p) === h, 'version à installer, empreinte relue : ' + p, h);
for (const [p, h] of Object.entries(DEPART)) ok(sha(p) === h, 'empreinte de départ : ' + p, h);
for (const [p, h] of Object.entries(OUTILS)) ok(sha(p) === h, 'outil lu, inchangé : ' + p, h);
ok(!existsSync(join(root, SAUV)), 'proposition sauvegardée de T6 absente (inscription non appliquée)', SAUV);
ok(/^const ARBITRAGE = null;$/m.test(readFileSync(join(root, CFG), 'utf8')), 'configuration de T6 : ARBITRAGE non renseigné');
for (const p of [P5A, P6E, PCB]) { const c = spawnSync(process.execPath, ['--check', join(root, p)], { encoding: 'utf8' }); ok(c.status === 0, 'node --check ' + p, 'code ' + c.status); }
const man0 = JSON.parse(readFileSync(join(root, MAN), 'utf8')).empreintes;
ok(Object.keys(man0).length === 38 && !Object.hasOwn(man0, RAP) && Object.entries(man0).every(([p, h]) => sha(p) === h), 'manifeste : 38 empreintes identiques ; rapport de T6 absent');
const idx0 = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx0.status === 0 && idx0.stdout.trim() === '', 'index vide');
dire('   état de départ (E0) :'); const r0 = controles();
attendre('E0', r0, { cov: COV_AVANT, emp: EMP_AVANT, rec6Seul: true, relais: 30 });
const initial = instantane();

dire('\n# Sauvegarde de départ');
const DEP = OUT + 'depart/'; ok(!existsSync(join(root, DEP)), DEP + ' absent (aucune sauvegarde antérieure écrasée ; opération non déjà exécutée)');
for (const p of [REC5, REC6, CBP, CFG, RAP, BIL, ETAT, ROAD, MAN]) { mkdirSync(join(root, DEP, p, '..'), { recursive: true }); copyFileSync(join(root, p), join(root, DEP, p)); ok(sha(DEP + p) === DEPART[p], 'sauvegarde ' + DEP + p, DEPART[p].slice(0, 12) + '…'); }
const attenduesDiff = (liste) => { const ch = differents(initial, instantane()); ok(eq(ch, [...liste].sort()), 'arbre de travail : seuls les fichiers prévus diffèrent de l\'état de départ', ch.join(', ') || 'aucun'); };
attenduesDiff([]);

dire('\n# Étape 1 : recalcul de T5 adapté'); etapeEnCours = 'étape 1';
installer(REC5, P5A);
const r1 = controles(); attendre('E1', r1, { cov: COV_AVANT, emp: EMP_AVANT, rec6Seul: true, relais: 30 }); attenduesDiff([REC5]);

dire('\n# Étape 2 : inscription du §0 de T6 et recalcul de T6 évolutif'); etapeEnCours = 'étape 2';
installer(CFG, INS + 'audit-v1-lot3-T6.mjs');
const g = lancer(CFG); montrer('régénération du rapport de T6 (module v2)', g);
ok(g.code === 0 && !g.exc && sha(RAP) === SOURCES[INS + 'etape2-A2-05-volet1-lot3-T6.md'], 'rapport de T6 régénéré = version arbitrée relue, octet pour octet', sha(RAP));
installer(SAUV, INS + 'proposition-T6.md');
installer(REC6, P6E);
const r2 = controles(); attendre('E2', r2, { cov: COV_APRES, emp: EMP_APRES, rec6Seul: false, relais: 28 }); attenduesDiff([REC5, CFG, RAP, SAUV, REC6]);

dire('\n# Étape 3 : §8.100 du bilan et fragments de pilotage'); etapeEnCours = 'étape 3';
installer(BIL, INS + 'etape2-A2-05-bilan-volet2.md'); installer(ETAT, INS + 'ETAT-ACTUEL.md'); installer(ROAD, INS + 'ROADMAP.md');
const r3 = controles(); attendre('E3', r3, { cov: COV_APRES, emp: EMP_APRES, rec6Seul: false, relais: 28 }); attenduesDiff([REC5, CFG, RAP, SAUV, REC6, BIL, ETAT, ROAD]);

dire('\n# Étape 4 : contrôle du bilan du pilote évolutif'); etapeEnCours = 'étape 4';
installer(CBP, PCB);
const r4 = controles(); attendre('E4', r4, { cov: COV_APRES, emp: EMP_APRES, rec6Seul: false, relais: 28 }); attenduesDiff([REC5, CFG, RAP, SAUV, REC6, BIL, ETAT, ROAD, CBP]);

dire('\n# Vérifications finales'); etapeEnCours = 'vérifications finales';
ok(sha(MAN) === DEPART[MAN], 'manifeste inchangé (38 entrées ; rapport de T6 non protégé)', sha(MAN));
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide');
const chk = spawnSync('git', ['diff', '--check'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'git diff --check (commande de référence)', 'code ' + chk.status);
dire('\nopération A conforme : arbitrage de T6 inscrit, recalculs et contrôle du pilote installés ; relais 28 sur 30 (C8, C9a), état intermédiaire prévu ; opération B à suivre');
fin(0);
