// A2-05 · T7 : étape A de l'inscription de l'arbitrage (autorisée le 2026-10-31). Applique exclusivement les sept différences relues et sauvegarde la
// proposition initiale. Usage : node a2-05-travail/arbitrage-T7/application-A/appliquer-A.mjs <racine du dépôt>
// (1) Préconditions, avant toute écriture : empreintes de départ et des versions proposées, diffs régénérés identiques aux diffs relus, ancres uniques,
// sauvegardes absentes, index vide, état de départ des contrôles. (2) Originaux sauvegardés dans application-A/depart/. (3) Sept fichiers copiés,
// proposition sauvegardée. (4) Contrôles attendus. Arrêt au premier groupe en écart ; aucune réparation automatique. Code 0 seulement si tout est conforme.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T7 = W + 'arbitrage-T7/', OUT = T7 + 'inscription/', DEP = T7 + 'application-A/depart/', SOR = T7 + 'application-A/sorties/';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T7.md', SAUV = T7 + 'proposition-T7.md', MAN = W + 'empreintes-rapports-arbitres.json', SRC = 'proposition-T7.md';
const PROP_SHA = 'a5548994407057fd26c2c9812e83d39cf0f108aafbbe5d4c56f03b9e43b8d872';
// cible, version proposée, empreinte de départ, empreinte proposée, empreinte du diff relu
const C = [
  [W + 'audit-v1-lot3-T7.mjs', 'audit-v1-lot3-T7.mjs', 'd69be5c46ad63b0b54d88ec8488b99ca522e8639bbab3133b8b2c0ec09e91aba', '7b628fa1880aa6da12111604fb4c05ab0f35d9b2d3b397a76407f86c45924dae', '49c6ed19cb9da7b585c993d3446ef4734b9464a467840444d23a1f34e6b00cbb'],
  [RAP, 'etape2-A2-05-volet1-lot3-T7.md', PROP_SHA, '84bdbd3fbc217882b9324fbdc3add17d11e2e822b64156b6377d3ff54db7ba3e', '0de1545a2497b4abf40b4cb194be40ff8324f5907b26539dbd8e991a415a210e'],
  ['docs/rapports/etape2-A2-05-bilan-volet2.md', 'etape2-A2-05-bilan-volet2.md', '3e5bd3c783020c1ef374f875075bad8ef9f98de172101707051cdbf424e40972', '8e8190775108d24eb58cf9085e67970575c1773f30c82cb2d0653e27251e3b6c', '5afac0a6fa7a088b59afa2446ea7e39c51fd404dfa7c79a313605952643d197a'],
  ['ETAT-ACTUEL.md', 'ETAT-ACTUEL.md', '6b669222d3cf50ae48398d299264aa6342b6a1bbd8289c9041053a765b159a8b', '9e811058037c844af4c938ffef825b1d700f77fb1df2338d994ac76723eaf7a6', 'de0cd5c9dc0acdbb1aebd223db8946634fa3c4b945e571c1587c38bd1d7b7eb7'],
  ['ROADMAP.md', 'ROADMAP.md', '3b88e2c546ae134932edcb0371918b4309dbf52f890a334eb1ea486d99178cc0', 'eb0f3e53971e3314eb00140aed8f041e1a8f7c29b467e1ba376e9bf473cff426', '04e56ba3e59baad8a1df90d8379cf56d859c80cc7d59397bea3203d5f8df3b63'],
  [W + 'recalcul-T7-perimetre.mjs', 'proposition-recalcul-T7-perimetre-arbitre.mjs', 'c8877283e3864a7e9c9f542a08e74b189aef3c6f4b9e9bfc0abf01e7b75eb91c', '80e51286d1a77a74621daa3e52e76d257447967870fbb53226383528354e0dd7', '5903ede2d7012e216975c8a1732fbc45e08ff92740d3e4897a337189bd6d017c'],
  [W + 'controle-bilan-pilote.mjs', 'proposition-controle-bilan-pilote-T7.mjs', 'eee37a9e55cf85c99960fcaf32bd49fab4c3e51149128210e941c7b6f7f14bd9', 'beddc981ffcc00ed3a14d8b2307b22b795754c91e5d5e61bc98a30f486ecb3b2', 'a23ff954151644efcae7e06a0f117ddcafc9d5309360afbf36600e13cde6464a'],
];
const shaF = (p) => (existsSync(join(root, p)) ? createHash('sha256').update(readFileSync(join(root, p))).digest('hex') : 'absent');
const shaT = (t) => createHash('sha256').update(t).digest('hex');
const trace = []; let ko = 0;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const arretSi = (etape) => { if (ko) { dire('ARRÊT : ' + ko + ' écart(s), ' + etape + ' ; arrêt au premier groupe en écart'); process.exit(1); } };
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const fin = (r) => r.out.split('\n').pop();
const ecarts = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim());
const LFs = (t) => t.replace(/\r\n/g, '\n');
const lots = () => readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => 'reconstruction/a2-04/lots/' + f);
const man0 = JSON.parse(readFileSync(join(root, MAN), 'utf8')).empreintes;
const INCHANGES = [MAN, ...Object.keys(man0), ...lots(), 'reconstruction/a2-04/journal.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', W + 'registre-tranches.json', W + 'recalcul-T5-perimetre.mjs', W + 'recalcul-T6-perimetre.mjs', W + 'sync-stable.mjs', W + 'lot3-commun-v2.mjs', W + 'couverture-lot3.mjs', W + 'empreintes-lot3.mjs', W + 'controle-relais-allege.mjs'];
const temoin = Object.fromEntries(INCHANGES.map((p) => [p, shaF(p)]));

// (1) Préconditions, sans écriture
dire('--- Préconditions');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P1 index vide');
ok(!existsSync(join(root, DEP)) && !existsSync(join(root, SAUV)), 'P2 sauvegarde de départ et proposition sauvegardée absentes');
for (const [c, v, d, p, h] of C) {
  ok(shaF(c) === d, 'P3 empreinte de départ : ' + c, shaF(c).slice(0, 12) + '…');
  ok(shaF(OUT + v) === p, 'P4 version proposée, empreinte relue : ' + v, shaF(OUT + v).slice(0, 12) + '…');
  const r = git('diff', '--no-index', '--no-color', '--', c, OUT + v); const n = c.split('/').pop() + '.diff';
  ok(r.status === 1 && shaT(r.stdout) === h && shaF(OUT + 'diffs/' + n) === h, 'P5 diff régénéré identique au diff relu : ' + n, shaT(r.stdout).slice(0, 12) + '…');
}
ok(shaF(OUT + SRC) === PROP_SHA, 'P6 proposition à sauvegarder = proposition relue', shaF(OUT + SRC).slice(0, 12) + '…');
const anc = (p, s) => LFs(readFileSync(join(root, p), 'utf8')).split(s).length === 2;
ok(/^const ARBITRAGE = null;$/m.test(readFileSync(join(root, C[0][0]), 'utf8')), 'P7 ancre : ARBITRAGE non renseigné, une fois');
ok(readFileSync(join(root, RAP), 'utf8').split('**Statut** : **proposition, non arbitrée.**').length === 2 && !readFileSync(join(root, RAP), 'utf8').includes('## 0. Arbitrage'), 'P8 ancre : rapport en proposition, sans §0');
ok(!/^### 8\.104 /m.test(readFileSync(join(root, C[2][0]), 'utf8')) && !/^\| V1-24 \|/m.test(readFileSync(join(root, C[2][0]), 'utf8')), 'P9 ancre : §8.104 et V1-24 absents du bilan');
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) ok(anc(p, '**196 corrections, dans 172 ENTRY** :') && anc(p, 'Les 81 candidats restants du lot 3') && anc(p, '; audit des 24 sens non autorisé (bilan du volet 2, §8.102 et §8.103) (relais'), 'P10 ancres uniques : ' + p);
ok(Object.keys(man0).length === 40 && Object.entries(man0).every(([p, h]) => shaF(p) === h) && !Object.hasOwn(man0, RAP), 'P11 manifeste : 40 empreintes identiques ; rapport de T7 absent');
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'), r70 = lancer(W + 'recalcul-T7-perimetre.mjs');
ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P12 relais de départ', fin(rel0));
ok(r70.code === 1 && ecarts(r70).length === 1 && /sens non encore examinés/.test(ecarts(r70)[0]), 'P13 recalcul de T7 en service : seul l\'écart connu', fin(r70));
arretSi('avant écriture : aucun fichier modifié');

// (2) Originaux, (3) application
dire('--- Sauvegarde et application');
mkdirSync(join(root, SOR), { recursive: true });
for (const [c] of C) { mkdirSync(dirname(join(root, DEP + c)), { recursive: true }); copyFileSync(join(root, c), join(root, DEP + c)); ok(shaF(DEP + c) === shaF(c), 'original sauvegardé : ' + c); }
arretSi('sauvegarde incomplète : aucun fichier cible modifié');
copyFileSync(join(root, OUT + SRC), join(root, SAUV)); ok(shaF(SAUV) === PROP_SHA, 'proposition initiale sauvegardée à son empreinte relue', PROP_SHA.slice(0, 12) + '…');
for (const [c, v, , p] of C) { copyFileSync(join(root, OUT + v), join(root, c)); ok(shaF(c) === p, 'appliqué : ' + c, p.slice(0, 12) + '…'); }
arretSi('état atteint conservé, aucune réparation');

// (4) Contrôles attendus après l'étape A
dire('--- Contrôles après l\'étape A');
for (const [c] of C) if (c.endsWith('.mjs')) ok(spawnSync(process.execPath, ['--check', join(root, c)], { encoding: 'utf8' }).status === 0, 'node --check ' + c);
const rt = readFileSync(join(root, RAP), 'utf8'); const L = rt.split('\n'); const a = L.indexOf('## 0. Arbitrage'), b = L.indexOf('## 1. Résultat proposé'); const s0 = L.slice(a, b).join('\n');
const LP = readFileSync(join(root, SAUV), 'utf8').split('\n'); const sans0 = [...L.slice(0, a), ...L.slice(b)]; const st = LP.findIndex((l) => l.startsWith('**Statut** : '));
ok(s0.includes('**23 conformes, 1 écart, 0 suspendu**') && s0.includes('**Écart retenu ; V1-24 retenue**'), 'A1 rapport de T7 : 23 conformes, 1 écart, 0 suspendu au §0');
ok(sans0.length === LP.length && sans0.every((l, k) => k === st || l === LP[k]) && (rt.match(/^#### `v_\d+_s\d+` · /gm) ?? []).length === 24, 'A2 §1 et 24 fiches d\'origine inchangés : seuls le statut et le §0 diffèrent de la proposition');
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /320 arbitrés, 0 proposés, 57 restants, sur 377/.test(cov.out), 'A3 couverture : 320/377, 57 restants', cov.out.slice(0, 70));
const ap = lancer(W + 'sync-stable.mjs', '--apercu'); const apT = readFileSync(join(root, W + 'sync-stable-apercu.md'), 'utf8').split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++'));
ok(ap.code === 0 && apT.some((l) => /Corrections retenues, non appliquées\*\* : 197, dans 172 ENTRY ; prochain numéro libre : V1-25\./.test(l)), 'A4 corrections : 197 dans 172 ENTRY ; V1-25 libre', fin(ap));
const vocab = JSON.parse(readFileSync(join(root, 'data/n5/vocab.json'), 'utf8'));
ok(JSON.stringify(vocab.find((e) => e.id === 'v_427').senses[0].meaning.alternatives) === '["Pas bon"]', 'A5 V1-24 retenue, non appliquée : `v_427_s1` publie toujours « Pas bon »');
const bil = readFileSync(join(root, C[2][0]), 'utf8');
ok((bil.match(/^\| V1-24 \|/gm) ?? []).length === 1 && !/^\| réservé \| V1-24 /m.test(bil) && (bil.match(/^\| réservé \| V1-2[23] \|/gm) ?? []).length === 2, 'A6 V1-24 correction retenue ; V1-22 et V1-23 restent réservées');
for (const [n, s] of [['recalcul de T7 adapté', W + 'recalcul-T7-perimetre.mjs'], ['contrôle du pilote adapté', W + 'controle-bilan-pilote.mjs'], ['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs']]) { const r = lancer(s); ok(r.code === 0, 'A7 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 40 rapports contrôlés, identiques/.test(emp.out), 'A8 manifeste toujours à 40 empreintes conformes', emp.out.slice(0, 110));
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); const eR = ecarts(rel).map((l) => l.split(/\s+/)[1]).sort().join(',');
ok(rel.code === 1 && fin(rel) === '28 conformes sur 30' && eR === 'C8,C9a', 'A9 relais : 28 sur 30, seuls C8 et C9a', fin(rel) + ' ; ' + eR);
const ch = INCHANGES.filter((p) => shaF(p) !== temoin[p]);
ok(!ch.length, 'A10 journal, ' + lots().length + ' lots, données, registre des tranches, manifeste, 40 documents protégés et contrôles non visés inchangés', ch.join(', ') || INCHANGES.length + ' fichiers');
const asm = spawnSync(process.execPath, [join(root, 'tools/reconstruction/run.mjs'), 'assemble'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(asm.status === 0 && /684 ENTRY, 35 identifiant/.test(asm.stdout), 'A11 assemblage réel', 'code ' + asm.status);
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'A12 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'A13 git diff --check', 'code ' + dc.status);
writeFileSync(join(root, SOR, 'application-A.txt'), trace.join('\n') + '\n' + (ko ? ko + ' écart(s) après application : arrêt\n' : 'étape A conforme\n'));
console.log(ko ? ko + ' écart(s) après application : arrêt ; état atteint conservé, aucune réparation' : 'étape A conforme');
process.exit(ko ? 1 : 0);
