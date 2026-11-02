// A2-05 · volet 1 · lot 3 : simulation complète, sur clone, de l'inscription de T6 avec les versions finales proposées (décision du 2026-10-29 :
// recalcul de T6 évolutif, contrôle du bilan du pilote adapté à la 39e entrée), EN PROPOSITION : aucun fichier en service n'est modifié.
// Usage : node a2-05-travail/arbitrage-T6/preparer-versions-finales-T6.mjs <racine du dépôt>
// (1) Préconditions : fichiers en service, propositions d'inscription relues, recalcul de T5 adapté accepté (25b82c32…), versions finales présentes.
// (2) Clone git jetable recouvert de l'arbre de travail. États : E0 réel ; E1 recalcul de T5 adapté ; E2 inscription de T6 (régénération par le
// module v2) et recalcul de T6 évolutif ; E3 §8.100 et fragments ; E4 contrôle du pilote adapté ; E5 ajout du rapport de T6 au manifeste
// (39e entrée) ; E6 synchronisation du bloc d'état. Chaque état : couverture, manifeste, contrôles du pilote, recalculs, relais.
// (3) Sabotages à 38 entrées (E4) et à 39 entrées (E6), chacun modifiant réellement les données puis restauré ; attente explicite par script
// (recalcul de T5 adapté, recalcul de T6 évolutif, contrôle du pilote adapté) ; une exception n'est jamais un résultat accepté, sauf constat
// déclaré. Progressions simulées (T7, T7 à T9, 40e entrée). Témoins sains. (4) Différences écrites dans versions-finales/simulation/.
// (5) Dépôt réel inchangé.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const VF = 'a2-05-travail/arbitrage-T6/versions-finales', OUT = VF + '/simulation', INS = 'a2-05-travail/arbitrage-T6/inscription';
const REC5 = 'a2-05-travail/recalcul-T5-perimetre.mjs', REC6 = 'a2-05-travail/recalcul-T6-perimetre.mjs', CBP = 'a2-05-travail/controle-bilan-pilote.mjs';
const P5A = 'a2-05-travail/arbitrage-T6/adaptation-T5/proposition-recalcul-T5-perimetre-arbitre-T6.mjs';
const P6R = INS + '/proposition-recalcul-T6-perimetre-arbitre.mjs', P6E = VF + '/proposition-recalcul-T6-perimetre-evolutif.mjs', PCB = VF + '/proposition-controle-bilan-pilote-39.mjs';
const CBPA = VF + '/controle-bilan-pilote-en-service.mjs'; // copie, dans le clone seulement, du contrôle en service (comparaison après E4)
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-', RAP = R + 'T6.md', RAPT5 = R + 'T5.md', RAPT3 = R + 'T3.md', P6 = R + 'T6-perimetre.md', RAPT7 = R + 'T7.md';
const CFG = 'a2-05-travail/audit-v1-lot3-T6.mjs', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', MAN = 'a2-05-travail/empreintes-rapports-arbitres.json';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', SAUV = 'a2-05-travail/arbitrage-T6/proposition-T6.md';
const SHA = {
  [REC5]: '44b49ef9b65874abd6acd878ff51e2d2165a74b9e062436883fb51473be4f4cc', [REC6]: '614f6b64b71ea43f52bcca64b6cfe60fdb1e822e98b4143bb74967b49f1b2cd9',
  [CBP]: '5a4c6624e8d5c1564f04b7e141f7e55f3c4afe6a253c19608d99e086b84facf7', [RAP]: '858bc41c252aa38e13fe15434fdd1f3a24381734eb5764c7598377d848fb6224',
  [P5A]: '25b82c3287e35bd70843930cab455510b0aedee4836f849d2109f61c9a58bf30', [P6R]: 'a0e149abbad026bb86c536f0f9bcd52c5748d1f6450ebd28c2085e3868c2ac3c',
  [INS + '/etape2-A2-05-volet1-lot3-T6.md']: '7e3bfd8ecc1221100a22e35e89bebc81ebfb43f673dc1f1a8d31c701ea4016df',
  [INS + '/audit-v1-lot3-T6.mjs']: '7aba8e2a45a38639aad3015e83d8d430f3cf926bae2f882ca86a714023515c96',
  [INS + '/proposition-T6.md']: '858bc41c252aa38e13fe15434fdd1f3a24381734eb5764c7598377d848fb6224',
  [INS + '/etape2-A2-05-bilan-volet2.md']: '295fa2d395944ce312a6f5dccc4e0bb80ccd81c46602a03b9655a095fa45dd69',
  [INS + '/ETAT-ACTUEL.md']: 'ffa223837ab0e2b369a4631693bfc5b15c7941e43b04a114d701d9ba7c2803a7',
  [INS + '/ROADMAP.md']: 'bfe061292c491aa950d5dd0d2f8a5135bda3795b5405fa8512ef932bd3202658',
};
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const TEMOINS = [...Object.keys(SHA), P6E, PCB, BIL, MAN, ETAT, ROAD, CFG, 'a2-05-travail/registre-tranches.json', 'data/n5/vocab.json', 'reconstruction/a2-04/journal.json'];
const avant = Object.fromEntries(TEMOINS.map((p) => [p, sha(join(root, p))]));
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');
const lire = (p) => readFileSync(join(root, p), 'utf8');

// (1) Préconditions
const diffSha = Object.entries(SHA).filter(([p, h]) => avant[p] !== h).map(([p]) => p);
ok(!diffSha.length, 'P1 fichiers en service, propositions relues et recalcul de T5 adapté à leurs empreintes', diffSha.join(', ') || Object.keys(SHA).length + ' fichiers');
const man0 = JSON.parse(lire(MAN)).empreintes;
ok(Object.keys(man0).length === 38 && Object.entries(man0).every(([p, h]) => sha(join(root, p)) === h) && !Object.hasOwn(man0, RAP), 'P2 manifeste : 38 empreintes identiques ; rapport de T6 absent');
ok(!existsSync(join(root, SAUV)) && /^const ARBITRAGE = null;$/m.test(lire(CFG)), 'P3 inscription non appliquée');
for (const p of [P6E, PCB]) { const c = spawnSync(process.execPath, ['--check', join(root, p)], { encoding: 'utf8' }); ok(c.status === 0, 'P4 node --check ' + p, 'code ' + c.status + ' ; ' + avant[p].slice(0, 12) + '…'); }

// (2) Clone jetable
const tmp = mkdtempSync(join(tmpdir(), 'ocha-versions-finales-t6-')); const C = join(tmp, 'arbre'); const fC = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
cpSync(fC(CBP), fC(CBPA));
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [fC(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); const out = ((r.stdout ?? '') + (r.stderr ?? '')).trim(); return { code: r.status, out, exc: /^\s+at |^[A-Za-z]*Error: /m.test(r.stderr ?? '') }; };
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim().slice(0, 200));
const titres = (r) => ecartsDe(r).map((l) => l.replace(/^ÉCART\s+/, '').split(' : ')[0]);
const SCRIPTS = { cov: 'a2-05-travail/couverture-lot3.mjs', emp: 'a2-05-travail/empreintes-lot3.mjs', cbp: CBP, cbpA: CBPA, cb39: PCB, rec5: REC5, rec6: REC6, p6r: P6R, p6e: P6E };
const etape = (nom) => {
  const r = Object.fromEntries(Object.entries(SCRIPTS).map(([k, s]) => [k, lancer(s)]));
  r.rel = lancer('a2-05-travail/controle-relais-allege.mjs', '--apres-application');
  for (const [k, v] of Object.entries(r)) console.log('   ' + nom + ' ' + k.padEnd(5) + ' code ' + v.code + (v.exc ? ' EXCEPTION' : '') + ' : ' + v.out.split('\n').pop().slice(0, 140) + (ecartsDe(v).length ? ' | ' + ecartsDe(v).join(' | ') : ''));
  return r;
};
const codes = (r) => Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v.code]));
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const sansExc = (r, ...sauf) => !Object.entries(r).some(([k, v]) => v.exc && !sauf.includes(k));
// Constat : le recalcul de T6 relu (a0e149ab…) lit sans garde la proposition sauvegardée, absente avant l'inscription (exception) ; la version
// évolutive rend un écart à la place. L'exception n'est admise que pour lui, et seulement en E0 et E1.
const EXC_P6R = (r) => r.p6r.exc && /proposition-T6\.md/.test(r.p6r.out);
// Écart déjà connu, consigné à la livraison de l'audit : le recalcul de T6 en service (non adapté) avant l'inscription
const SEUL6 = (r) => eq(titres(r).map((t) => t.replace(/ \([0-9]+ rapports.*$/, '')), ['sens non encore examinés']);
const RELAIS_C8_C9a = (r) => eq(titres(r).map((t) => t.split(/\s+/)[0]), ['C8', 'C9a', 'FAUX']);
const RELAIS_C8 = (r) => eq(titres(r).map((t) => t.split(/\s+/)[0]), ['C8', 'FAUX']);

// E0 et E1
const E0 = etape('E0');
ok(eq(codes(E0), { cov: 0, emp: 0, cbp: 0, cbpA: 0, cb39: 0, rec5: 0, rec6: 1, p6r: 1, p6e: 1, rel: 0 }) && SEUL6(E0.rec6) && sansExc(E0, 'p6r') && EXC_P6R(E0) && !E0.p6e.exc, 'E0 état réel : contrôle du pilote adapté conforme à 38 ; recalcul de T6 en service : son seul écart connu ; recalculs de T6 proposés non applicables avant l\'inscription (relu : exception, proposition sauvegardée absente ; évolutif : écarts, sans exception)', JSON.stringify(codes(E0)));
writeFileSync(fC(REC5), readFileSync(fC(P5A)));
const E1 = etape('E1');
ok(eq(codes(E1), codes(E0)) && SEUL6(E1.rec6) && sansExc(E1, 'p6r') && EXC_P6R(E1),'E1 recalcul de T5 adapté installé : mêmes résultats qu\'en E0', JSON.stringify(codes(E1)));
// E2 : inscription (configuration, régénération par le module v2, proposition sauvegardée) et recalcul de T6 évolutif, ensemble
cpSync(join(root, INS, 'audit-v1-lot3-T6.mjs'), fC(CFG)); const g = lancer(CFG);
ok(g.code === 0 && sha(fC(RAP)) === SHA[INS + '/etape2-A2-05-volet1-lot3-T6.md'], 'E2 rapport de T6 régénéré par le module v2 = version arbitrée relue', 'code ' + g.code + ' ; ' + sha(fC(RAP)).slice(0, 12) + '…');
cpSync(join(root, INS, 'proposition-T6.md'), fC(SAUV)); writeFileSync(fC(REC6), readFileSync(fC(P6E)));
const E2 = etape('E2'); const att2 = { cov: 0, emp: 0, cbp: 0, cbpA: 0, cb39: 0, rec5: 0, rec6: 0, p6r: 0, p6e: 0, rel: 1 };
ok(eq(codes(E2), att2) && RELAIS_C8_C9a(E2.rel) && sansExc(E2), 'E2 inscription et recalcul de T6 évolutif : seul le relais rend des écarts, exactement C8 et C9a', JSON.stringify(codes(E2)) + ' ; relais : ' + titres(E2.rel).map((t) => t.slice(0, 40)).join(' | '));
// E3 : §8.100 et fragments
for (const [p, n] of [[BIL, 'etape2-A2-05-bilan-volet2.md'], [ETAT, 'ETAT-ACTUEL.md'], [ROAD, 'ROADMAP.md']]) cpSync(join(root, INS, n), fC(p));
const E3 = etape('E3');
ok(eq(codes(E3), att2) && RELAIS_C8_C9a(E3.rel) && sansExc(E3), 'E3 §8.100 et fragments : mêmes résultats qu\'en E2', JSON.stringify(codes(E3)));
// E4 : contrôle du pilote adapté installé (valable à 38 et à 39 entrées)
writeFileSync(fC(CBP), readFileSync(fC(PCB)));
const E4 = etape('E4');
ok(eq(codes(E4), att2) && RELAIS_C8_C9a(E4.rel) && sansExc(E4), 'E4 contrôle du pilote adapté installé, à 38 entrées : mêmes résultats', JSON.stringify(codes(E4)));

// (3) Sabotages : attente par script : tableau d'expressions (code 1, toutes présentes), 0 (conforme), 'exception' (constat déclaré), null (relevé)
const VUS = { rec5: REC5, p6e: REC6, cb39: CBP };
const manT = (f) => (t) => { const o = JSON.parse(t); f(o); return JSON.stringify(o, null, 1) + '\n'; };
const majMan = (...ps) => () => { const o = JSON.parse(readFileSync(fC(MAN), 'utf8')); for (const p of ps) o.empreintes[p] = sha(fC(p)); writeFileSync(fC(MAN), JSON.stringify(o, null, 1) + '\n'); };
const sabote = (nom, modifs, attendu, { apres } = {}) => {
  const chemins = [...new Set([...modifs.map(([p]) => p), MAN])];
  const orig = Object.fromEntries(chemins.map((p) => [p, existsSync(fC(p)) ? readFileSync(fC(p)) : null]));
  for (const [p, f] of modifs) {
    const t = existsSync(fC(p)) ? readFileSync(fC(p), 'utf8') : ''; const m = f(t);
    if (m === t) { ok(false, nom, 'sabotage sans effet sur ' + p); for (const [q, b] of Object.entries(orig)) if (b) writeFileSync(fC(q), b); return; }
    if (m === null) unlinkSync(fC(p)); else writeFileSync(fC(p), m);
  }
  apres?.();
  const r = Object.fromEntries(Object.entries(VUS).map(([k, s]) => [k, lancer(s)]));
  for (const [p, b] of Object.entries(orig)) if (b === null) { if (existsSync(fC(p))) unlinkSync(fC(p)); } else writeFileSync(fC(p), b);
  const restaure = Object.entries(orig).every(([p, b]) => (b === null ? !existsSync(fC(p)) : readFileSync(fC(p)).equals(b)));
  const pb = [];
  for (const [k, v] of Object.entries(r)) {
    const a = attendu[k];
    if (a === 'exception') { if (!v.exc) pb.push(k + ' : exception attendue (constat), absente'); continue; }
    if (v.exc) { pb.push(k + ' : EXCEPTION'); continue; }
    if (a === 0 && v.code !== 0) pb.push(k + ' : conforme attendu, code ' + v.code + ' (' + titres(v).join(' | ') + ')');
    // Comparaison sur la ligne d'écart entière (certains libellés contiennent eux-mêmes « : »)
    if (Array.isArray(a)) { const m = a.filter((re) => !ecartsDe(v).some((l) => re.test(l.replace(/^ÉCART\s+/, '')))); if (v.code !== 1 || m.length) pb.push(k + ' : code ' + v.code + (m.length ? ', attendu absent ' + m.join(', ') : '')); }
  }
  const det = Object.entries(r).map(([k, v]) => k + ' ' + (v.exc ? 'EXC' : v.code) + (titres(v).length ? ' (' + titres(v).map((t) => t.slice(0, 48)).join(' | ') + ')' : '')).join(' ; ');
  ok(!pb.length && restaure, nom, det + (pb.length ? ' ; PROBLÈME : ' + pb.join(' ; ') : '') + (restaure ? '' : ' ; RESTAURATION ÉCHOUÉE'));
};
const S22_5 = /^les 22 sens examinés dans le seul rapport de T5/, H274 = /^les 274 sens arbitrés/, MAN5 = /^manifeste/, TR5 = /^restants par tranche/;
const S22_6 = /^les 22 sens examinés dans le seul rapport de T6/, H296 = /^les 296 sens arbitrés/, C38 = /^contenu des 39 documents/, MAN6 = /^manifeste/, R14 = /^rapport arbitré de T6 \(§0\)/, TR6 = /^restants par tranche/;
const MANC = /^manifeste : 38 ou 39/, T6C = /^T6 : rapport arbitré, s'il est au manifeste/;
const premierSens = (p) => readFileSync(fC(p), 'utf8').match(/^#### `((?:hj_)?v_[0-9]+_s[0-9]+)` /m)[1];
const retireSens = (id) => (t) => t.replace('#### `' + id + '` ', '#### (sens retiré) ');
const idT3 = premierSens(RAPT3), idT5 = premierSens(RAPT5);
const decoupage = readFileSync(fC('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md'), 'utf8').replace(/\r\n/g, '\n');
const idsDe = (livs) => [...decoupage.matchAll(/^\| [0-9]+ \| ([A-F][0-9]+) \| `((?:hj_)?v_[0-9]+_s[0-9]+)` \|/gm)].filter((m) => livs.includes(m[1])).map((m) => m[2]);
const fictif = (t, livs) => () => '# ' + t + ' fictive (simulation)\n\n**Statut** : **arbitré le 2099-01-01** (§0).\n\n' + idsDe(livs).map((id) => '#### `' + id + '` · fictif — proposé : **conforme**\n').join('\n');
const sauvProp = lire(RAP);

console.log('--- Sabotages à 38 entrées (état E4)');
const t38 = Object.fromEntries(Object.entries(VUS).map(([k, s]) => [k, lancer(s).code])); ok(eq(t38, { rec5: 0, p6e: 0, cb39: 0 }), 'A0 témoin sain à 38 entrées', JSON.stringify(t38));
sabote('A1 rapport de T6 revenu à la proposition', [[RAP, () => sauvProp]], { p6e: [S22_6, H296, C38, R14, TR6], rec5: 0, cb39: 0 });
sabote('A2 verdict d\'une fiche modifié dans le rapport arbitré de T6 (hors du §0)', [[RAP, (t) => t.replace('— proposé : **suspendu**', '— proposé : **conforme**')]], { p6e: [R14, C38], rec5: 0, cb39: 0 });
sabote('A3 texte du §0 du rapport de T6 modifié (non lu par le contrôle 14)', [[RAP, (t) => t.replace('**22 conformes, aucun écart, aucun suspendu**', '**22 conformes, aucun écart**')]], { p6e: [C38], rec5: 0, cb39: 0 });
sabote('A4 §0 supprimé, statut arbitré conservé', [[RAP, (t) => { const L = t.split('\n'); const a = L.indexOf('## 0. Arbitrage'), b = L.indexOf('## 1. Résultat proposé'); return [...L.slice(0, a), ...L.slice(b)].join('\n'); }]], { p6e: [R14, C38], rec5: 0, cb39: 0 });
sabote('A5 proposition sauvegardée de T6 modifiée', [[SAUV, (t) => t + '\n']], { p6e: [R14], rec5: 0, cb39: 0 });
sabote('A6 proposition sauvegardée de T6 supprimée', [[SAUV, () => null]], { p6e: [R14], rec5: 0, cb39: 0 });
sabote('A7 rapport de T6 en 38e entrée, à la place du périmètre de T6', [[MAN, manT((o) => { o.empreintes = Object.fromEntries(Object.entries(o.empreintes).map(([p, h]) => (p === P6 ? [RAP, sha(fC(RAP))] : [p, h]))); })]], { p6e: [MAN6], rec5: 0, cb39: [MANC] });
sabote('A8 manifeste tronqué à 37 entrées (périmètre de T6 retiré)', [[MAN, manT((o) => { delete o.empreintes[P6]; })]], { p6e: [MAN6], rec5: 0, cb39: [MANC] });
sabote('A9 périmètre accepté de T6 modifié, manifeste recalculé', [[P6, (t) => t + ' ']], { p6e: [/^périmètre accepté identique à sa version acceptée/, C38], rec5: 0, cb39: [/^T6 : périmètre accepté identique/] }, { apres: majMan(P6) });
sabote('A10 un sens de T3 (' + idT3 + ') retiré, manifeste recalculé', [[RAPT3, retireSens(idT3)]], { p6e: [H296, C38], rec5: [H274], cb39: null }, { apres: majMan(RAPT3) });
sabote('A11 catégorie publiée de それから modifiée (data/)', [['data/n5/vocab.json', (t) => { const o = JSON.parse(t); o.find((e) => e.id === 'v_416').senses[0].category = { level_1: 'temps', level_2: 'chronologie', level_3: 'succession' }; return JSON.stringify(o, null, 2) + '\n'; }]], { p6e: [/^catégories, types et fonctions du §2/, /^`category: null`/], rec5: 0, cb39: 0 });
sabote('A12 statut de T6 modifié dans le registre', [['a2-05-travail/registre-tranches.json', manT((o) => { o.tranches.find((x) => x.id === 'T6').statut = 'arbitrée'; })]], { p6e: [TR6], rec5: 0, cb39: 0 });
sabote('A13 décision type-nul de それから repassée en proposed', [['reconstruction/a2-04/journal.json', (t) => { const o = JSON.parse(t); o.find((d) => d.kind === 'type-nul' && d.entry === 'n5_v_416').status = 'proposed'; return JSON.stringify(o, null, 2) + '\n'; }]], { p6e: [/^une décision type-nul validée par sens/, /^décisions de journal par ENTRY/], rec5: 0, cb39: 0 });

// E5 : ajout du rapport arbitré de T6 au manifeste (39e entrée), par l'outil ; E6 : synchronisation du bloc d'état
const aj = lancer('a2-05-travail/empreintes-lot3.mjs', '--ajouter');
ok(aj.code === 0 && Object.keys(JSON.parse(readFileSync(fC(MAN), 'utf8')).empreintes)[38] === RAP, 'E5 ajout au manifeste par l\'outil : rapport de T6 en 39e entrée', 'code ' + aj.code + ' ; ' + aj.out.split('\n').pop().slice(0, 120));
const E5 = etape('E5'); const att5 = { cov: 0, emp: 0, cbp: 0, cbpA: 1, cb39: 0, rec5: 0, rec6: 0, p6r: 1, p6e: 0, rel: 1 };
ok(eq(codes(E5), att5) && RELAIS_C8(E5.rel) && sansExc(E5), 'E5 39 entrées : contrôles installés conformes ; relais : C8 seul ; anciens contrôles (pilote en service, recalcul de T6 relu) en écart', JSON.stringify(codes(E5)) + ' ; pilote en service : ' + titres(E5.cbpA).join(' | ').slice(0, 90) + ' ; T6 relu : ' + titres(E5.p6r).join(' | ').slice(0, 90));
const ap = lancer('a2-05-travail/sync-stable.mjs', '--apercu'); const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1];
const sy = plan ? lancer('a2-05-travail/sync-stable.mjs', '--appliquer', '--plan', plan) : { code: null, out: 'plan introuvable' };
ok(sy.code === 0, 'E6 synchronisation dans le clone (plan propre au clone)', 'plan ' + plan + ' ; ' + sy.out.split('\n').pop().slice(0, 100));
const E6 = etape('E6'); const att6 = { ...att5, rel: 0 };
ok(eq(codes(E6), att6) && sansExc(E6), 'E6 après synchronisation : relais 30 sur 30 ; contrôles installés conformes', JSON.stringify(codes(E6)) + ' ; relais : ' + E6.rel.out.split('\n').pop());

console.log('--- Sabotages à 39 entrées (état E6)');
const t39 = Object.fromEntries(Object.entries(VUS).map(([k, s]) => [k, lancer(s).code])); ok(eq(t39, { rec5: 0, p6e: 0, cb39: 0 }), 'B0 témoin sain à 39 entrées', JSON.stringify(t39));
sabote('B1 un sens de T3 (' + idT3 + ') retiré, manifeste recalculé', [[RAPT3, retireSens(idT3)]], { p6e: [H296, C38], rec5: [H274], cb39: null }, { apres: majMan(RAPT3) });
sabote('B2 substitution : un sens de T3 remplacé par un sens de T7, manifeste recalculé', [[RAPT3, (t) => t.replace('#### `' + idT3 + '` ', '#### `' + idsDe(['D1'])[0] + '` ')]], { p6e: [H296, C38], rec5: [H274], cb39: null }, { apres: majMan(RAPT3) });
sabote('B3 texte d\'un rapport historique (T3) modifié hors des titres, manifeste recalculé', [[RAPT3, (t) => t + '\n']], { p6e: [C38], rec5: 0, cb39: null }, { apres: majMan(RAPT3) });
sabote('B4 §0 du rapport de T6 modifié, manifeste recalculé', [[RAP, (t) => t.replace('**22 conformes, aucun écart, aucun suspendu**', '**22 conformes, aucun écart**')]], { p6e: [C38], rec5: 0, cb39: [T6C] }, { apres: majMan(RAP) });
sabote('B5 verdict d\'une fiche du rapport de T6 modifié, manifeste recalculé', [[RAP, (t) => t.replace('— proposé : **suspendu**', '— proposé : **conforme**')]], { p6e: [R14, C38], rec5: 0, cb39: [T6C] }, { apres: majMan(RAP) });
sabote('B6 rapport arbitré de T6 supprimé', [[RAP, () => null]], { p6e: [S22_6, H296, C38, MAN6, R14, TR6], rec5: [MAN5], cb39: [MANC, T6C] });
sabote('B7 rapport arbitré de T5 supprimé', [[RAPT5, () => null]], { p6e: [H296, C38, MAN6], rec5: [S22_5, H274, MAN5, TR5], cb39: [/T5/] });
sabote('B8 rapport de T6 et périmètre de T6 permutés (38e et 39e entrées)', [[MAN, manT((o) => { const k = Object.keys(o.empreintes); [k[37], k[38]] = [k[38], k[37]]; o.empreintes = Object.fromEntries(k.map((x) => [x, o.empreintes[x]])); })]], { p6e: [MAN6], rec5: 0, cb39: [MANC] });
sabote('B9 39e entrée remplacée par un autre rapport (T7 fictif arbitré)', [[RAPT7, fictif('T7', ['D1', 'D4'])], [MAN, manT((o) => { delete o.empreintes[RAP]; })]], { p6e: [MAN6], rec5: 0, cb39: [MANC] }, { apres: majMan(RAPT7) });
sabote('B10 rapport de T6 retiré du manifeste (retour à 38 entrées)', [[MAN, manT((o) => { delete o.empreintes[RAP]; })]], { p6e: 0, rec5: 0, cb39: 0 });
sabote('B11 décision de journal d\'une ENTRY de T5 repassée en proposed', [['reconstruction/a2-04/journal.json', (t) => { const o = JSON.parse(t); o.find((d) => d.entry === 'n5_' + idT5.replace(/_s[0-9]+$/, '')).status = 'proposed'; return JSON.stringify(o, null, 2) + '\n'; }]], { p6e: 0, rec5: [/^décisions de journal par ENTRY/], cb39: null });
sabote('B12 décision type-nul de それから repassée en proposed', [['reconstruction/a2-04/journal.json', (t) => { const o = JSON.parse(t); o.find((d) => d.kind === 'type-nul' && d.entry === 'n5_v_416').status = 'proposed'; return JSON.stringify(o, null, 2) + '\n'; }]], { p6e: [/^une décision type-nul validée par sens/], rec5: 0, cb39: 0 });
sabote('B13 un sens de T6 examiné aussi dans le rapport de T5, manifeste recalculé', [[RAPT5, (t) => t + '\n#### `v_416_s1` · doublon\n']], { p6e: [S22_6, C38], rec5: [H274], cb39: null }, { apres: majMan(RAPT5) });
sabote('B14 proposition sauvegardée de T6 supprimée', [[SAUV, () => null]], { p6e: [R14], rec5: 0, cb39: 0 });
sabote('B15 périmètre de T6 supprimé (constat : le contrôle du pilote, en service comme adapté, le lit sans garde)', [[P6, () => null]], { p6e: [MAN6, C38, /^périmètre accepté/, /^sens du périmètre généré/], rec5: [MAN5], cb39: 'exception' });
sabote('B16 manifeste tronqué à 37 entrées (périmètre et rapport de T6 retirés)', [[MAN, manT((o) => { delete o.empreintes[P6]; delete o.empreintes[RAP]; })]], { p6e: [MAN6], rec5: 0, cb39: [MANC] });

console.log('--- Progressions (état E6, 39 entrées)');
const progresse = (nom, modifs, attendu) => {
  const chemins = [...new Set([...modifs.map(([p]) => p), MAN])];
  const orig = Object.fromEntries(chemins.map((p) => [p, existsSync(fC(p)) ? readFileSync(fC(p)) : null]));
  for (const [p, f] of modifs) writeFileSync(fC(p), f(existsSync(fC(p)) ? readFileSync(fC(p), 'utf8') : ''));
  const r = Object.fromEntries(Object.entries({ ...VUS, p6r: P6R, cov: SCRIPTS.cov }).map(([k, s]) => [k, lancer(s)]));
  for (const [p, b] of Object.entries(orig)) if (b === null) unlinkSync(fC(p)); else writeFileSync(fC(p), b);
  const restaure = Object.entries(orig).every(([p, b]) => (b === null ? !existsSync(fC(p)) : readFileSync(fC(p)).equals(b)));
  const c = { rec5: r.rec5.code, p6e: r.p6e.code, cb39: r.cb39.code };
  ok(eq(c, attendu) && sansExc(r) && restaure, nom, JSON.stringify(c) + ' ; couverture : ' + (r.cov.out.match(/[0-9]+ arbitrés, [0-9]+ proposés, [0-9]+ restants/) ?? [''])[0] + ' ; recalcul de T6 relu : code ' + r.p6r.code + ' (' + titres(r.p6r).map((t) => t.slice(0, 60)).join(' | ') + ')' + (r.cb39.code ? ' ; pilote : ' + titres(r.cb39).join(' | ').slice(0, 80) : ''));
};
const T7 = [RAPT7, fictif('T7', ['D1', 'D4'])], T8 = [R + 'T8.md', fictif('T8', ['D5', 'D8'])], T9 = [R + 'T9.md', fictif('T9', ['E1', 'E2', 'E3'])];
progresse('G1 tranche T7 simulée arbitrée (D1, D4), hors du manifeste', [T7], { rec5: 0, p6e: 0, cb39: 0 });
progresse('G2 tranches T7, T8 et T9 simulées arbitrées (hors du bloc F)', [T7, T8, T9], { rec5: 0, p6e: 0, cb39: 0 });
progresse('G3 T7 à T9 arbitrées et T7 en 40e entrée (le contrôle du pilote adapté n\'admet que 38 ou 39 entrées)', [T7, T8, T9, [MAN, manT((o) => { o.empreintes[RAPT7] = sha(fC(RAPT7)); })]], { rec5: 0, p6e: 0, cb39: 1 });
const tf = Object.fromEntries(Object.entries(VUS).map(([k, s]) => [k, lancer(s).code]));
ok(eq(tf, { rec5: 0, p6e: 0, cb39: 0 }) && !existsSync(fC(RAPT7)), 'Z témoin sain final (restaurations vérifiées)', JSON.stringify(tf));
rmSync(tmp, { recursive: true, force: true });

// (4) Différences
mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
for (const [a, b, nom] of [[P6R, P6E, 'recalcul-T6-relu-vers-evolutif.diff'], [REC6, P6E, 'recalcul-T6-en-service-vers-evolutif.diff'], [CBP, PCB, 'controle-bilan-pilote-en-service-vers-39.diff'], [REC5, P5A, 'recalcul-T5-en-service-vers-adapte.diff']]) {
  const d = spawnSync('git', ['diff', '--no-index', '--no-color', '--', a, b], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  writeFileSync(join(root, OUT, 'diffs', nom), d.stdout);
  const n = (c) => d.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length;
  ok(d.status === 1, 'diff ' + nom, '+' + n('+') + ' / -' + n('-') + ' lignes ; ' + avant[b].slice(0, 12) + '…');
}

// (5) Dépôt réel inchangé
const ch = TEMOINS.filter((p) => sha(join(root, p)) !== avant[p]);
ok(ch.length === 0 && !existsSync(join(root, SAUV)), 'dépôt réel inchangé (' + TEMOINS.length + ' fichiers témoins)', ch.join(', ') || 'aucune modification');
console.log(ko ? ko + ' écart(s)' : 'simulation conforme');
process.exit(ko ? 1 : 0);
