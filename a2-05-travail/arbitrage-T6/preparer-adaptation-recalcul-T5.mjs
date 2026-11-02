// A2-05 · volet 1 · lot 3 : préparation de l'adaptation du recalcul de T5 à la progression des tranches (décision du 2026-10-29 : recalcul
// maintenu, comptes globaux non figés), EN PROPOSITION : aucun fichier en service n'est modifié.
// Usage : node a2-05-travail/arbitrage-T6/preparer-adaptation-recalcul-T5.mjs <racine du dépôt>
// (1) Préconditions : recalculs en service ; propositions d'inscription de T6 relues, à leurs empreintes ; 38 empreintes intactes.
// (2) Proposition du recalcul de T5 par remplacements ciblés du fichier en service (chacun présent une fois).
// (3) Dans un clone git jetable recouvert de l'arbre de travail, application simulée dans l'ordre proposé : E0 (état réel), E1 (recalcul de T5
// adapté), E2 (inscription de T6 : configuration, régénération du rapport par le module v2, proposition sauvegardée, recalcul de T6 adapté),
// E3 (§8.100 et fragments). À chaque état : couverture, manifeste, bilan du pilote, recalculs de T5 et de T6 (en service et proposés), relais.
// Sur E3 : sabotages du recalcul de T5 adapté (chacun vérifié comme modifiant réellement les données, puis restauré), progressions simulées
// (39e entrée, tranche suivante) qui doivent rester conformes, témoins sains. Puis, à titre prospectif seulement, E4 (ajout au manifeste) et
// E5 (synchronisation), opérations non autorisées, simulées dans le clone pour expliquer les écarts intermédiaires.
// (4) Proposition et différence écrites dans arbitrage-T6/adaptation-T5/ (refus si le dossier existe). (5) Dépôt réel inchangé.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T6/adaptation-T5', INS = 'a2-05-travail/arbitrage-T6/inscription';
const REC5 = 'a2-05-travail/recalcul-T5-perimetre.mjs', REC6 = 'a2-05-travail/recalcul-T6-perimetre.mjs';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T6.md', RAPT5 = 'docs/rapports/etape2-A2-05-volet1-lot3-T5.md', RAPT3 = 'docs/rapports/etape2-A2-05-volet1-lot3-T3.md';
const CFG = 'a2-05-travail/audit-v1-lot3-T6.mjs', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', MAN = 'a2-05-travail/empreintes-rapports-arbitres.json';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', SAUV = 'a2-05-travail/arbitrage-T6/proposition-T6.md';
const SHA = {
  [REC5]: '44b49ef9b65874abd6acd878ff51e2d2165a74b9e062436883fb51473be4f4cc', [REC6]: '614f6b64b71ea43f52bcca64b6cfe60fdb1e822e98b4143bb74967b49f1b2cd9',
  [RAP]: '858bc41c252aa38e13fe15434fdd1f3a24381734eb5764c7598377d848fb6224',
  [INS + '/etape2-A2-05-volet1-lot3-T6.md']: '7e3bfd8ecc1221100a22e35e89bebc81ebfb43f673dc1f1a8d31c701ea4016df',
  [INS + '/audit-v1-lot3-T6.mjs']: '7aba8e2a45a38639aad3015e83d8d430f3cf926bae2f882ca86a714023515c96',
  [INS + '/proposition-recalcul-T6-perimetre-arbitre.mjs']: 'a0e149abbad026bb86c536f0f9bcd52c5748d1f6450ebd28c2085e3868c2ac3c',
  [INS + '/proposition-T6.md']: '858bc41c252aa38e13fe15434fdd1f3a24381734eb5764c7598377d848fb6224',
  [INS + '/etape2-A2-05-bilan-volet2.md']: '295fa2d395944ce312a6f5dccc4e0bb80ccd81c46602a03b9655a095fa45dd69',
  [INS + '/ETAT-ACTUEL.md']: 'ffa223837ab0e2b369a4631693bfc5b15c7941e43b04a114d701d9ba7c2803a7',
  [INS + '/ROADMAP.md']: 'bfe061292c491aa950d5dd0d2f8a5135bda3795b5405fa8512ef932bd3202658',
};
const HIST_SHA = 'd5a47033a3e9ddcb735559f9a09a0b3846edb973757dc0a02c9a5bf1248422e8';
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex'); const shaT = (t) => createHash('sha256').update(t).digest('hex');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l, d) => console.log('constat  ' + l + (d ? ' : ' + d : ''));
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const TEMOINS = [REC5, REC6, RAP, CFG, BIL, MAN, ETAT, ROAD, 'a2-05-travail/controle-bilan-pilote.mjs', 'a2-05-travail/registre-tranches.json', 'data/n5/vocab.json', 'reconstruction/a2-04/journal.json', ...Object.keys(SHA).filter((p) => p.startsWith(INS))];
const avant = Object.fromEntries(TEMOINS.map((p) => [p, sha(join(root, p))]));
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');
const lire = (p) => readFileSync(join(root, p), 'utf8');

// (1) Préconditions
const diffSha = Object.entries(SHA).filter(([p, h]) => avant[p] !== h).map(([p]) => p);
ok(!diffSha.length, 'P1 recalculs en service, rapport de T6 et propositions d\'inscription relues à leurs empreintes', diffSha.join(', ') || Object.keys(SHA).length + ' fichiers');
const man0 = JSON.parse(lire(MAN)).empreintes;
ok(Object.keys(man0).length === 38 && Object.entries(man0).every(([p, h]) => sha(join(root, p)) === h) && !Object.hasOwn(man0, RAP), 'P2 manifeste : 38 empreintes identiques ; rapport de T6 absent');
ok(!existsSync(join(root, SAUV)) && /^const ARBITRAGE = null;$/m.test(lire(CFG)), 'P3 inscription non appliquée : proposition sauvegardée absente ; ARBITRAGE non renseigné');

// (2) Proposition : remplacements ciblés du recalcul de T5 en service, chacun présent une fois
const R = [
  ['(--inventaire : liste les 125 restants, sens par sens)', '(--inventaire : liste les sens restants, sens par sens)'],
  ["// 2026-10-27, appliqué seulement sur autorisation distincte. Les entrées suivantes relèvent des contrôles de leurs propres tranches.\n",
   "// 2026-10-27, appliqué seulement sur autorisation distincte. Les entrées suivantes relèvent des contrôles de leurs propres tranches.\n" +
   "// PROPOSITION (2026-10-29), non appliquée : recalcul maintenu (décision du 2026-10-29), comptes globaux non figés ; il accepte la progression\n" +
   "// des tranches suivantes et vérifie que les 274 sens arbitrés à la date de T5 restent arbitrés (ensemble fixé par son empreinte).\n"],
  ['// 3. Inventaire des 125 restants : liste globale moins les sens examinés dans les rapports arbitrés ; égal au registre des tranches\n',
   '// 3. Inventaire des restants : liste globale moins les sens examinés dans les rapports arbitrés ; égal au registre des tranches ; sans compte\n' +
   '// global figé (chaque sens arbitré appartient à la liste globale)\n'],
  ["ctl(arbitres.size === 274 && restants.length === 103 && !parTr['(hors registre)'], 'inventaire des restants (liste globale moins les sens des rapports arbitrés)', arbitres.size + ' arbitrés, ' + restants.length + ' restants ; par livraison : ' + Object.entries(parLiv).map(([k, v]) => k + ' ' + v).join(', '));\n",
   "const horsListe = [...arbitres].filter((id) => !liste.some((l) => l.id === id));\n" +
   "ctl(!horsListe.length && !parTr['(hors registre)'], 'inventaire des restants (liste globale moins les sens des rapports arbitrés)', arbitres.size + ' arbitrés, ' + restants.length + ' restants ; hors de la liste globale : ' + (horsListe.join(', ') || 'aucun') + ' ; par livraison : ' + Object.entries(parLiv).map(([k, v]) => k + ' ' + v).join(', '));\n" +
   "// Protection historique : les sens examinés dans les rapports arbitrés des 37 premières entrées du manifeste (état de T5 ; octets protégés au\n" +
   "// contrôle 10) sont 274, toujours arbitrés ; leur ensemble trié est fixé par son empreinte (aucun retrait, aucune substitution)\n" +
   "const hRap = Object.keys(json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes).slice(0, 37).map((p) => p.replace(/^docs\\/rapports\\//, '')).filter((f) => rapports.includes(f) && arbitre(f));\n" +
   "const hist = [...new Set(hRap.flatMap((f) => [...txt('docs/rapports/' + f).matchAll(new RegExp('^#### `(' + ID + ')` ', 'gm'))].map((m) => m[1])))].sort();\n" +
   "const shaH = createHash('sha256').update(hist.join('\\n')).digest('hex');\n" +
   "ctl(hRap.length === 21 && hist.length === 274 && hist.every((id) => arbitres.has(id)) && shaH === '" + HIST_SHA + "', 'les 274 sens arbitrés à la date de T5 restent arbitrés (rapports arbitrés des 37 premières entrées du manifeste)', hRap.length + ' rapports, ' + hist.length + ' sens, ' + shaH.slice(0, 12) + '…');\n"],
];
const src5 = lire(REC5); const eol5 = src5.includes('\r\n') ? '\r\n' : '\n';
let prop5 = src5.replace(/\r\n/g, '\n');
for (const [a, b] of R) { const n = prop5.split(a).length - 1; ok(n === 1, 'remplacement présent une fois', a.slice(0, 70).replace(/\n/g, '⏎') + '… (' + n + ')'); prop5 = prop5.replace(a, () => b); }
if (eol5 === '\r\n') prop5 = prop5.replace(/\n/g, '\r\n');

// (3) Clone jetable
const tmp = mkdtempSync(join(tmpdir(), 'ocha-adaptation-t5-')); const C = join(tmp, 'arbre'); const fC = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const PROP5 = OUT + '/proposition-recalcul-T5-perimetre-arbitre-T6.mjs';
const PROP6 = INS + '/proposition-recalcul-T6-perimetre-arbitre.mjs';
mkdirSync(join(C, OUT), { recursive: true }); writeFileSync(fC(PROP5), prop5);
const chk = spawnSync(process.execPath, ['--check', fC(PROP5)], { encoding: 'utf8' });
ok(chk.status === 0, 'node --check sur la proposition du recalcul de T5', 'code ' + chk.status + (chk.stderr ? ' ' + chk.stderr.slice(0, 200) : ''));
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [fC(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim().slice(0, 200));
const titres = (r) => ecartsDe(r).map((l) => l.replace(/^ÉCART\s+/, '').split(' : ')[0]);
// À chaque état : les recalculs en service sont lancés à leur chemin ; les propositions, depuis leur emplacement de proposition
const etape = (nom) => {
  const r = { cov: lancer('a2-05-travail/couverture-lot3.mjs'), emp: lancer('a2-05-travail/empreintes-lot3.mjs'), cbp: lancer('a2-05-travail/controle-bilan-pilote.mjs'), rec5: lancer(REC5), prop5: lancer(PROP5), rec6: lancer(REC6), prop6: lancer(PROP6), rel: lancer('a2-05-travail/controle-relais-allege.mjs', '--apres-application') };
  for (const [k, v] of Object.entries(r)) console.log('   ' + nom + ' ' + k.padEnd(5) + ' code ' + v.code + ' : ' + v.out.split('\n').pop().slice(0, 150) + (ecartsDe(v).length ? ' | ' + ecartsDe(v).join(' | ') : ''));
  return r;
};
const codes = (r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v.code]));
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// E0 : état réel. Le recalcul de T6 en service rend, depuis la livraison de l'audit, un écart unique déjà consigné (note d'export de l'audit de
// T6 : « sens non encore examinés », état d'avant l'audit) ; il est exigé exactement, aucun autre écart n'est admis
const SEUL6 = (r) => eq(titres(r).map((t) => t.replace(/ \([0-9]+ rapports.*$/, '')), ['sens non encore examinés']);
const E0 = etape('E0');
ok(eq(codes(E0), { cov: 0, emp: 0, cbp: 0, rec5: 0, prop5: 0, rec6: 1, prop6: 1, rel: 0 }) && SEUL6(E0.rec6), 'E0 état réel : recalcul de T5 en service et adapté conformes ; recalcul de T6 en service : son seul écart consigné ; recalcul de T6 adapté non applicable avant l\'inscription', JSON.stringify(codes(E0)));
// E1 : recalcul de T5 adapté installé à sa place
writeFileSync(fC(REC5), prop5);
const E1 = etape('E1');
ok(eq(codes(E1), codes(E0)) && SEUL6(E1.rec6), 'E1 recalcul de T5 adapté installé, avant l\'inscription : mêmes résultats qu\'en E0', JSON.stringify(codes(E1)));
// E2 : inscription de T6 (configuration, régénération par le module v2, proposition sauvegardée) et recalcul de T6 adapté, ensemble
cpSync(join(root, INS, 'audit-v1-lot3-T6.mjs'), fC(CFG)); const g = lancer(CFG);
ok(g.code === 0 && sha(fC(RAP)) === SHA[INS + '/etape2-A2-05-volet1-lot3-T6.md'], 'E2 rapport de T6 régénéré par le module v2 = version arbitrée relue', 'code ' + g.code + ' ; ' + sha(fC(RAP)).slice(0, 12) + '…');
cpSync(join(root, INS, 'proposition-T6.md'), fC(SAUV)); cpSync(join(root, PROP6), fC(REC6));
const E2 = etape('E2');
ok(eq(codes(E2), { cov: 0, emp: 0, cbp: 0, rec5: 0, prop5: 0, rec6: 0, prop6: 0, rel: 1 }), 'E2 après l\'inscription et les deux recalculs adaptés : seul le relais rend des écarts', JSON.stringify(codes(E2)));
ok(eq(titres(E2.rel).map((t) => t.split(/\s+/)[0]), ['C8', 'C9a', 'FAUX']), 'E2 relais : exactement C8 (Q2, bloc d\'état non synchronisé) et C9a (rapport arbitré hors du manifeste)', titres(E2.rel).join(' | '));
// E3 : §8.100 et fragments de pilotage
for (const [p, n] of [[BIL, 'etape2-A2-05-bilan-volet2.md'], [ETAT, 'ETAT-ACTUEL.md'], [ROAD, 'ROADMAP.md']]) cpSync(join(root, INS, n), fC(p));
const E3 = etape('E3');
ok(eq(codes(E3), codes(E2)) && eq(titres(E3.rel), titres(E2.rel)), 'E3 après le §8.100 et les fragments : mêmes résultats qu\'en E2', JSON.stringify(codes(E3)));
// Recalcul de T5 non adapté, à l'état E3 : un seul écart, l'inventaire figé
writeFileSync(fC('a2-05-travail/recalcul-T5-ancien.mjs'), src5); const anc = lancer('a2-05-travail/recalcul-T5-ancien.mjs'); unlinkSync(fC('a2-05-travail/recalcul-T5-ancien.mjs'));
ok(anc.code === 1 && eq(titres(anc), ['inventaire des restants (liste globale moins les sens des rapports arbitrés)']), 'E3 recalcul de T5 non adapté : un seul écart, l\'inventaire figé à 274/103', 'code ' + anc.code + ' ; ' + titres(anc).join(' | '));

// Sabotages du recalcul de T5 adapté, à l'état E3 : chacun modifie réellement un fichier, puis le fichier est restauré et vérifié
const rec = () => lancer(REC5);
const t0 = rec(); ok(t0.code === 0, 'S0 témoin sain avant les sabotages', t0.out.split('\n').pop());
const manT = (f) => (t) => { const o = JSON.parse(t); f(o); return JSON.stringify(o, null, 1) + '\n'; };
const majMan = (p) => { const o = JSON.parse(readFileSync(fC(MAN), 'utf8')); o.empreintes[p] = sha(fC(p)); writeFileSync(fC(MAN), JSON.stringify(o, null, 1) + '\n'); };
// modifs : [[chemin, fonction (texte → texte, ou null pour supprimer)]…] ; apres : opération supplémentaire (mise à jour du manifeste)
const sabote = (nom, modifs, attendus, { apres, interdits = [] } = {}) => {
  const orig = Object.fromEntries([...modifs.map(([p]) => p), MAN].map((p) => [p, existsSync(fC(p)) ? readFileSync(fC(p)) : null]));
  for (const [p, f] of modifs) {
    const t = orig[p]?.toString('utf8') ?? ''; const m = f(t);
    if (m === t) { ok(false, nom, 'sabotage sans effet sur ' + p); return; }
    if (m === null) unlinkSync(fC(p)); else writeFileSync(fC(p), m);
  }
  apres?.();
  const r = rec(); const r6 = lancer(REC6);
  for (const [p, b] of Object.entries(orig)) if (b === null) { if (existsSync(fC(p))) unlinkSync(fC(p)); } else writeFileSync(fC(p), b);
  const restaure = Object.entries(orig).every(([p, b]) => b === null ? !existsSync(fC(p)) : readFileSync(fC(p)).equals(b));
  const e = titres(r); const manquants = attendus.filter((re) => !e.some((l) => re.test(l))); const presents = interdits.filter((re) => e.some((l) => re.test(l)));
  ok(r.code === 1 && !manquants.length && !presents.length && restaure, nom, 'code ' + r.code + ' ; ' + e.length + ' écart(s) : ' + e.join(' | ') + (manquants.length ? ' ; ATTENDU ABSENT : ' + manquants.join(', ') : '') + (presents.length ? ' ; INATTENDU : ' + presents.join(', ') : '') + ' [recalcul de T6 : code ' + r6.code + ']');
};
const HIST = /les 274 sens arbitrés à la date de T5/, MANI = /^manifeste/, S22 = /les 22 sens examinés dans le seul rapport de T5/, INV = /^inventaire des restants/, TR = /^restants par tranche/;
const statutProp = (t) => t.replace(/^\*\*Statut\*\* : \*\*arbitré le [^\n]*/m, '**Statut** : **proposition, non arbitrée.**');
const premierSens = (p) => readFileSync(fC(p), 'utf8').match(/^#### `((?:hj_)?v_[0-9]+_s[0-9]+)` /m)[1];
// Retrait réel : l'identifiant disparaît du titre de la fiche (le contrôle 2 cherche « #### `id` » comme sous-chaîne)
const retireSens = (id) => (t) => t.replace('#### `' + id + '` ', '#### (sens retiré) ');
const idT3 = premierSens(RAPT3), idT5 = premierSens(RAPT5);
sabote('S1 rapport arbitré de T5 revenu au statut de proposition', [[RAPT5, statutProp]], [S22, TR, HIST, MANI]);
sabote('S2 même sabotage, empreinte du manifeste mise à jour (manifeste contourné)', [[RAPT5, statutProp]], [S22, TR, HIST], { apres: () => majMan(RAPT5), interdits: [MANI] });
sabote('S3 un sens de T3 (' + idT3 + ') retiré de son rapport arbitré, empreinte du manifeste mise à jour', [[RAPT3, retireSens(idT3)]], [HIST], { apres: () => majMan(RAPT3), interdits: [MANI] });
sabote('S4 un sens de T5 (' + idT5 + ') retiré du rapport de T5, empreinte du manifeste mise à jour', [[RAPT5, retireSens(idT5)]], [S22, TR, HIST], { apres: () => majMan(RAPT5), interdits: [MANI] });
sabote('S5 rapport arbitré de T5 supprimé', [[RAPT5, () => null]], [S22, TR, HIST, MANI]);
sabote('S6 rapport arbitré de T5 retiré du manifeste', [[MAN, manT((o) => { delete o.empreintes[RAPT5]; })]], [HIST, MANI]);
sabote('S7 manifeste réordonné (périmètre et rapport de T5 permutés)', [[MAN, manT((o) => { const k = Object.keys(o.empreintes); [k[35], k[36]] = [k[36], k[35]]; o.empreintes = Object.fromEntries(k.map((x) => [x, o.empreintes[x]])); })]], [MANI]);
sabote('S8 sens hors de la liste globale examiné dans un rapport arbitré hors du manifeste (T6)', [[RAP, (t) => t + '\n#### `v_9999_s1` · fictif\n']], [INV], { interdits: [MANI, HIST] });
sabote('S9 registre : D8 retirée de T8 (restants hors registre)', [['a2-05-travail/registre-tranches.json', manT((o) => { const t = o.tranches.find((x) => x.id === 'T8'); t.livraisons = t.livraisons.filter((l) => l !== 'D8'); })]], [INV]);
sabote('S10 registre : statut de T5 modifié', [['a2-05-travail/registre-tranches.json', manT((o) => { o.tranches.find((x) => x.id === 'T5').statut = 'arbitrée'; })]], [TR]);
sabote('S11 type publié d\'un sens de T5 modifié (data/)', [['data/n5/vocab.json', (t) => { const o = JSON.parse(t); const s = o.flatMap((e) => e.senses).find((s) => s.id === idT5); s.semantic_type = s.semantic_type === 'objet' ? 'lieu' : 'objet'; return JSON.stringify(o, null, 2) + '\n'; }]], [/^catégories et types du §2/]);
sabote('S12 décision de journal d\'une ENTRY de T5 repassée en proposed', [['reconstruction/a2-04/journal.json', (t) => { const o = JSON.parse(t); o.find((d) => d.entry === 'n5_' + idT5.replace(/_s[0-9]+$/, '')).status = 'proposed'; return JSON.stringify(o, null, 2) + '\n'; }]], [/^décisions de journal par ENTRY/]);
sabote('S13 périmètre accepté de T5 modifié', [['docs/rapports/etape2-A2-05-volet1-lot3-T5-perimetre.md', (t) => t + ' ']], [MANI]);
sabote('S14 un sens de T5 examiné aussi dans le rapport de T6 (hors du manifeste)', [[RAP, (t) => t + '\n#### `' + idT5 + '` · doublon\n']], [S22], { interdits: [MANI] });
// Progressions qui doivent rester conformes pour le recalcul de T5 adapté (le recalcul de T6 adapté, figé à 38 entrées et 296/81, est relevé)
const progresse = (nom, modifs) => {
  const orig = Object.fromEntries([...modifs.map(([p]) => p), MAN].map((p) => [p, existsSync(fC(p)) ? readFileSync(fC(p)) : null]));
  for (const [p, f] of modifs) writeFileSync(fC(p), f(orig[p]?.toString('utf8') ?? ''));
  const r = rec(); const r6 = lancer(REC6); const cov = lancer('a2-05-travail/couverture-lot3.mjs');
  for (const [p, b] of Object.entries(orig)) if (b === null) unlinkSync(fC(p)); else writeFileSync(fC(p), b);
  ok(r.code === 0 && Object.entries(orig).every(([p, b]) => b === null ? !existsSync(fC(p)) : readFileSync(fC(p)).equals(b)), nom, 'recalcul de T5 code ' + r.code + ' (' + (ecartsDe(r).join(' | ') || r.out.match(/[0-9]+ arbitrés, [0-9]+ restants/)?.[0]) + ') ; recalcul de T6 code ' + r6.code + (titres(r6).length ? ' (' + titres(r6).join(' | ') + ')' : '') + ' ; couverture : ' + cov.out.match(/[0-9]+ arbitrés, [0-9]+ proposés, [0-9]+ restants/)?.[0]);
};
const decoupage = readFileSync(fC('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md'), 'utf8').replace(/\r\n/g, '\n');
const idsT7 = [...decoupage.matchAll(/^\| [0-9]+ \| (D1|D4) \| `((?:hj_)?v_[0-9]+_s[0-9]+)` \|/gm)].map((m) => m[2]);
const RAPT7 = 'docs/rapports/etape2-A2-05-volet1-lot3-T7.md';
const t7 = () => '# T7 fictive (simulation)\n\n**Statut** : **arbitré le 2099-01-01** (§0).\n\n' + idsT7.map((id) => '#### `' + id + '` · fictif — proposé : **conforme**\n').join('\n');
const ajout39 = [MAN, manT((o) => { o.empreintes[RAP] = sha(fC(RAP)); })];
constat('tranche suivante simulée (T7 : D1, D4)', idsT7.length + ' sens');
progresse('G1 39e entrée : rapport arbitré de T6 ajouté au manifeste', [ajout39]);
progresse('G2 tranche suivante simulée : rapport fictif de T7 arbitré (D1, D4), hors du manifeste', [[RAPT7, t7]]);
progresse('G3 les deux : 39e entrée et tranche T7 arbitrée', [ajout39, [RAPT7, t7]]);
const t1 = rec(); ok(t1.code === 0 && !existsSync(fC(RAPT7)), 'S15 témoin sain après les sabotages et les progressions (restaurations vérifiées)', t1.out.split('\n').pop());

// Prospectif, hors autorisation : E4 (ajout du rapport arbitré de T6 au manifeste, 39 entrées), puis E5 (synchronisation du bloc d'état)
const aj = lancer('a2-05-travail/empreintes-lot3.mjs', '--ajouter');
constat('E4 (prospectif) ajout au manifeste', 'code ' + aj.code + ' ; ' + aj.out.split('\n').pop().slice(0, 140));
const E4 = etape('E4'); constat('E4 codes', JSON.stringify(codes(E4)) + ' ; T6 : ' + (titres(E4.rec6).join(' | ') || 'aucun écart') + ' ; relais : ' + (titres(E4.rel).join(' | ') || 'aucun écart'));
const ap = lancer('a2-05-travail/sync-stable.mjs', '--apercu'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
const sy = plan ? lancer('a2-05-travail/sync-stable.mjs', '--appliquer', '--plan', plan) : { code: null, out: 'plan introuvable : ' + ap.out.slice(0, 120) };
constat('E5 (prospectif) synchronisation', 'aperçu code ' + ap.code + ', plan ' + plan + ' ; application code ' + sy.code + ' ; ' + sy.out.split('\n').pop().slice(0, 140));
const E5 = etape('E5'); constat('E5 codes', JSON.stringify(codes(E5)) + ' ; T6 : ' + (titres(E5.rec6).join(' | ') || 'aucun écart') + ' ; relais : ' + (titres(E5.rel).join(' | ') || 'aucun écart'));
ok(E4.rec5.code === 0 && E5.rec5.code === 0, 'E4 et E5 (prospectifs) : recalcul de T5 adapté conforme à 39 entrées et après synchronisation');
rmSync(tmp, { recursive: true, force: true });

// (4) Écriture de la proposition et de sa différence
mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
writeFileSync(join(root, PROP5), prop5);
const d = spawnSync('git', ['diff', '--no-index', '--no-color', '--', REC5, PROP5], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
writeFileSync(join(root, OUT, 'diffs', 'recalcul-T5-perimetre.mjs.diff'), d.stdout);
const n = (c) => d.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length;
ok(d.status === 1, 'proposé : ' + REC5, '+' + n('+') + ' / -' + n('-') + ' lignes ; ' + shaT(prop5).slice(0, 12) + '…');

// (5) Dépôt réel inchangé
const ch = TEMOINS.filter((p) => sha(join(root, p)) !== avant[p]);
ok(ch.length === 0 && !existsSync(join(root, SAUV)), 'dépôt réel inchangé (' + TEMOINS.length + ' fichiers témoins ; proposition sauvegardée de T6 non créée)', ch.join(', ') || 'aucune modification');
console.log(ko ? ko + ' écart(s)' : 'préparation conforme');
process.exit(ko ? 1 : 0);
