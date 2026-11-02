// A2-05 · T9 : étape A de l'inscription de l'arbitrage (autorisée le 2026-11-01). Applique exclusivement les six diffs relus, par remplacements ciblés, et
// sauvegarde la proposition initiale ; les deux recalculs ne sont pas installés (B1). Usage : node a2-05-travail/arbitrage-T9/application-A/appliquer-A.mjs <racine du dépôt>
// (1) Préconditions, avant toute écriture : empreintes de départ et des versions approuvées, diffs régénérés identiques aux diffs relus, ancres uniques,
// ajouts absents, fins de ligne, 44 empreintes, index vide, état de départ des contrôles. (2) Six résultats calculés en mémoire, égaux aux versions relues,
// avant toute écriture. (3) Six originaux sauvegardés, écritures, proposition sauvegardée. (4) Contrôles attendus. Arrêt au premier groupe en écart ; aucune
// réparation automatique. Code 0 seulement si tout est conforme.
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T9 = W + 'arbitrage-T9/', OUT = T9 + 'inscription/', A9 = T9 + 'application-A/', DEP = A9 + 'depart/', SOR = A9 + 'sorties/', REELS = A9 + 'diffs-reels/';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T9.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', INV = W + 'INVENTAIRE-SCRIPTS.md', CFG = W + 'audit-v1-lot3-T9.mjs', REC = W + 'recalcul-T9-perimetre.mjs', REC8 = W + 'recalcul-T8-perimetre.mjs';
const SAUV = T9 + 'proposition-T9.md', MAN = W + 'empreintes-rapports-arbitres.json', SRC = 'proposition-T9.md';
const PROP_SHA = '986c2439994a0bc100d314026c185257b34f5039da76f16bc7e819ea1d5e31eb', MAN_SHA = '2c74018e3b04c06395298e2452d039de409353aae8a62d5d7d99cf43e01f78e3';
// cible, version approuvée, empreinte de départ, empreinte approuvée, empreinte du diff relu
const D = [
  [CFG, 'audit-v1-lot3-T9.mjs', 'af5f861209bac7b926cb7c1588bfb5152d5a3f662dc9ddb1e7751e534c8950c3', '43700109048492a62695c36d2dd49ad9a57688a2f64b6c6810cc8a48baac69db', 'b67c68ac1cd1e7143ab8d6d1984ae28383e338a49d928f2192c93789acb8f81b'],
  [RAP, 'etape2-A2-05-volet1-lot3-T9.md', PROP_SHA, '73d4dee6568694cc4509d00a084b8f3b1581f8404d65f88b2a61be074c80df6a', '64fb06e4d98f4418a4791c0d3a7b2658fb76a8bb6bba4bb210b9e5c54ceb0a07'],
  [BIL, 'etape2-A2-05-bilan-volet2.md', '6114c0f1e1ab147ce49560e01c13fb43c2f89c86d9d40b1c8153a654af1aefc6', '03b107ad5d216003f91643480b430e79c7ec191c6b6135b84567b724874f4d1c', 'd0982cd8016a82e2faee6e1c29be9435546e55dfcfd2dc307423bdee0f22f22f'],
  [ETAT, 'ETAT-ACTUEL.md', '130e3c5c9eacd4bf9ea749a5c7961861c129475c4de7d5eadbbf18d9ac00b83a', '09ca5546e383daeeabed02bf47c1f481b55b64c4b780f2744a04e1538196ca23', '9541b2d720e2296c6598cd492d39a14f3448bfe5a1a2ba5c2db84ffe6245836f'],
  [ROAD, 'ROADMAP.md', '801688a7c82c88ec448ddb49eee9fe387eab3f3d5cb5efc942c2a59f477fd925', '92a30847df5beb742be6ea8f83b0b105d2f3f82af3185cb7363ec32e79850b04', 'f141f66c9c8a4946fb0bc3649a560b9e134cf8651d5c7a0b4235128642d81f10'],
  [INV, 'INVENTAIRE-SCRIPTS.md', 'e49ce9964d557ad98d50cd6f1f896d4638213bb3f55de6ca116c429be6f516bd', 'ee14749cbe6372dd3126e6957fce25b8c8cbaeac44b4643ef62a0a8eca30dfd1', 'dd3892373f2a81fe91ba837ac5e73cc3d291c1dec348a5513390281f8d1d83ec'],
];
const V1 = { V125: '["Auparavant"]', tags: { v_594: '["lieu_konbini","lieu_restaurant"]', v_91: '["lieu_restaurant"]', v_92: '["lieu_restaurant"]', v_459: '["lieu_restaurant"]' } };
const TRANS_T9 = ['sens non encore examinés', 'restants par tranche du registre', 'corrections retenues sur les ENTRY de T9'], TRANS_T8 = ['restants par tranche du registre', 'inventaire des 57 du rapport'];
const nom = (p) => p.split('/').pop();
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (p) => (existsSync(join(root, p)) ? sha(readFileSync(join(root, p))) : 'absent');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const trace = []; let ko = 0;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const arretSi = (e) => { if (ko) { dire('ARRÊT : ' + ko + ' écart(s), ' + e + ' ; arrêt au premier groupe en écart'); process.exit(1); } };
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(root, s), root, ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const fin = (r) => r.out.split('\n').pop();
const ecarts = (r) => r.out.split('\n').filter((l) => /^\s*ÉCART/.test(l)).map((l) => l.trim());
const seuls = (r, attendus) => { const e = ecarts(r); return r.code === 1 && e.length === attendus.length && attendus.every((a) => e.some((l) => l.includes(a))); };
const changees = (t) => t.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
const LFs = (t) => t.replace(/\r\n/g, '\n');
// Hunks d'un diff : ancien et nouveau blocs, lignes de contexte comprises. Les diffs sont en LF : ancres cherchées sur le texte en LF, fins de ligne rétablies ensuite
const hunks = (diff) => { const H = []; let h = null; for (const l of diff.split('\n')) { if (l.startsWith('@@')) { h = { a: [], b: [] }; H.push(h); continue; } if (!h || l.startsWith('\\') || l === '') continue; if (l[0] === ' ') { h.a.push(l.slice(1)); h.b.push(l.slice(1)); } else if (l[0] === '-') h.a.push(l.slice(1)); else if (l[0] === '+') h.b.push(l.slice(1)); } return H.map((x) => ({ a: x.a.join('\n'), b: x.b.join('\n') })); };
const appliquerHunks = (t0, H) => { const crlf = t0.includes('\r\n'); let t = LFs(t0); for (const { a, b } of H) { if (!a) throw new Error('hunk sans ancre'); if (t.split(a).length !== 2) throw new Error('ancre non unique'); t = t.replace(a, () => b); } return crlf ? t.replace(/\n/g, '\r\n') : t; };
const finsDeLigne = (t) => { const crlf = (t.match(/\r\n/g) ?? []).length, lf = (t.match(/\n/g) ?? []).length; return crlf === 0 ? 'LF' : crlf === lf ? 'CRLF' : 'mixte'; };
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => 'reconstruction/a2-04/lots/' + f);
const man0 = JSON.parse(lire(MAN)).empreintes;
const INCHANGES = [MAN, ...Object.keys(man0), ...lots, 'reconstruction/a2-04/journal.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', W + 'registre-tranches.json', REC, REC8, W + 'recalcul-T5-perimetre.mjs', W + 'recalcul-T6-perimetre.mjs', W + 'recalcul-T7-perimetre.mjs', W + 'controle-bilan-pilote.mjs', W + 'sync-stable.mjs', W + 'lot3-commun-v2.mjs', W + 'couverture-lot3.mjs', W + 'empreintes-lot3.mjs', W + 'controle-relais-allege.mjs'];
const temoin = Object.fromEntries(INCHANGES.map((p) => [p, shaF(p)]));
const zones = () => git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').stdout.trim();

// (1) Préconditions, sans écriture
dire('--- Préconditions');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'P1 index vide');
ok(!existsSync(join(root, DEP)) && !existsSync(join(root, SAUV)), 'P2 sauvegarde de départ et proposition sauvegardée absentes');
const H = {};
for (const [c, v, d, p, h] of D) {
  ok(shaF(c) === d, 'P3 empreinte de départ : ' + c, shaF(c).slice(0, 12) + '…');
  ok(shaF(OUT + v) === p, 'P4 version approuvée, empreinte relue : ' + v, shaF(OUT + v).slice(0, 12) + '…');
  const r = git('diff', '--no-index', '--no-color', '--', c, OUT + v); const n = nom(c) + '.diff';
  ok(r.status === 1 && sha(r.stdout) === h && shaF(OUT + 'diffs/' + n) === h, 'P5 diff régénéré identique au diff relu, octet pour octet : ' + n, sha(r.stdout).slice(0, 12) + '…');
  H[c] = hunks(readFileSync(join(root, OUT + 'diffs/' + n), 'utf8'));
  const t = LFs(lire(c)); ok(H[c].length > 0 && H[c].every(({ a }) => a && t.split(a).length === 2), 'P6 ancres uniques, à leur place : ' + nom(c), H[c].length + ' hunk(s)');
}
ok(shaF(OUT + SRC) === PROP_SHA, 'P7 proposition à sauvegarder = proposition relue', shaF(OUT + SRC).slice(0, 12) + '…');
ok(/^const ARBITRAGE = null;$/m.test(lire(CFG)), 'P8 ajout absent : ARBITRAGE non renseigné');
ok(lire(RAP).split('**Statut** : **proposition, non arbitrée.**').length === 2 && !lire(RAP).includes('## 0. Arbitrage'), 'P8 ajout absent : rapport en proposition, sans §0');
ok(!/^### 8\.112 /m.test(lire(BIL)) && !/^\| V1-(2[5-9]|3[01]) \|/m.test(lire(BIL)), 'P8 ajout absent : §8.112 et V1-25 à V1-31');
ok(!lire(ETAT).includes('**Audit des 24 sens de T9 livré en proposition, puis T9 arbitrée**'), 'P8 ajout absent : ligne de journal');
ok(!lire(ROAD).includes('**T9 arbitrée le 2026-11-01**') && !lire(ETAT).includes('**T9 arbitrée le 2026-11-01**'), 'P8 ajout absent : fragments du pilotage');
ok(!lire(INV).includes('`audit-v1-lot3-T9.mjs`') && !lire(INV).includes('application/appliquer-consignation.mjs'), 'P8 ajout absent : lignes de l\'inventaire');
ok(shaF(MAN) === MAN_SHA && Object.keys(man0).length === 44 && Object.entries(man0).every(([p, h]) => shaF(p) === h) && !Object.hasOwn(man0, RAP), 'P9 manifeste : 44 empreintes conformes ; rapport de T9 absent');
const rel0 = lancer(W + 'controle-relais-allege.mjs', '--apres-application'), r90 = lancer(REC), r80 = lancer(REC8);
ok(rel0.code === 0 && fin(rel0) === '30 conformes sur 30', 'P10 relais de départ', fin(rel0));
ok(seuls(r90, ['sens non encore examinés']), 'P11 recalcul de T9 en service : seul l\'écart transitoire connu', fin(r90));
ok(r80.code === 0, 'P12 recalcul de T8 en service conforme', fin(r80));
arretSi('avant écriture : aucun fichier modifié');

// (2) Résultats calculés pour les six, avant d'en écrire un seul
dire('--- Résultats calculés en mémoire');
const avant = Object.fromEntries(D.map(([c]) => [c, lire(c)]));
const sorties = {};
for (const [c, , , p] of D) { const t = appliquerHunks(avant[c], H[c]); sorties[c] = t; ok(sha(Buffer.from(t, 'utf8')) === p, 'résultat des hunks = version approuvée : ' + nom(c), p.slice(0, 12) + '…'); ok(finsDeLigne(t) === finsDeLigne(avant[c]) && finsDeLigne(t) !== 'mixte', 'fins de ligne préservées : ' + nom(c), finsDeLigne(t)); }
arretSi('avant écriture : aucun fichier modifié');

// (3) Sauvegarde, écritures
dire('--- Sauvegarde et application');
mkdirSync(join(root, SOR), { recursive: true }); mkdirSync(join(root, REELS), { recursive: true });
for (const [c] of D) { mkdirSync(dirname(join(root, DEP + c)), { recursive: true }); copyFileSync(join(root, c), join(root, DEP + c)); ok(shaF(DEP + c) === shaF(c), 'original sauvegardé : ' + c); }
arretSi('sauvegarde incomplète : aucun fichier cible modifié');
copyFileSync(join(root, OUT + SRC), join(root, SAUV)); ok(shaF(SAUV) === PROP_SHA, 'proposition initiale sauvegardée à son empreinte relue', PROP_SHA);
for (const [c, , , p] of D) { writeFileSync(join(root, c), sorties[c]); ok(shaF(c) === p, 'appliqué : ' + c, p.slice(0, 12) + '…'); }
arretSi('état atteint conservé, aucune réparation');

// (4) Contrôles attendus après l'étape A
dire('--- Contrôles après l\'étape A');
ok(spawnSync(process.execPath, ['--check', join(root, CFG)], { encoding: 'utf8' }).status === 0, 'node --check ' + CFG);
for (const [c] of D) { const r = git('diff', '--no-index', '--no-color', '--', DEP + c, c); writeFileSync(join(root, REELS, nom(c) + '.diff'), r.stdout); const relu = readFileSync(join(root, OUT + 'diffs/' + nom(c) + '.diff'), 'utf8'); ok(r.status === 1 && JSON.stringify(changees(r.stdout)) === JSON.stringify(changees(relu)), 'A0 diff réel identique au diff relu (lignes +/−) : ' + nom(c), changees(r.stdout).length + ' lignes'); }
const rt = lire(RAP); const L = rt.split('\n'); const a = L.indexOf('## 0. Arbitrage'), b = L.indexOf('## 1. Résultat proposé'); const s0 = L.slice(a, b).join('\n');
const LP = lire(SAUV).split('\n'); const sans0 = [...L.slice(0, a), ...L.slice(b)]; const st = LP.findIndex((l) => l.startsWith('**Statut** : '));
ok(/^\*\*Statut\*\* : \*\*arbitré le 2026-11-01\*\* \(§0\)\./.test(L[st] ?? '') && s0.includes('**17 conformes, 7 écarts, 0 suspendu**') && /\*\*24 sens examinés : 17 conformes, 7 écart, aucun sens suspendu\.\*\*/.test(rt), 'A1 rapport de T9 arbitré : 17 conformes, 7 écarts, 0 suspendu');
ok(sans0.length === LP.length && sans0.every((l, k) => k === st || l === LP[k]) && (rt.match(/^#### `v_\d+_s\d+` · /gm) ?? []).length === 24, 'A2 §1 et 24 fiches identiques à la proposition sauvegardée : seuls le statut et le §0 diffèrent');
const cov = lancer(W + 'couverture-lot3.mjs'); ok(cov.code === 0 && /360 arbitrés, 0 proposés, 17 restants, sur 377/.test(cov.out), 'A3 couverture : 360/377, 17 restants', cov.out.slice(0, 70));
const rF = spawnSync(process.execPath, ['--input-type=module', '-e', "import {couverture} from './a2-05-travail/couverture-lot3.mjs'; const s=couverture('.').sens.filter((x)=>x.etat!=='arbitré'); console.log(s.length, [...new Set(s.map((x)=>x.livraison))].sort().join())"], { cwd: root, encoding: 'utf8' });
ok(rF.stdout.trim() === '17 F1,F2', 'A3 bis les 17 restants sont tous dans le bloc F', rF.stdout.trim());
const et = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(v.corrections,v.entry,v.libre,v.reserves.join())"], { cwd: root, encoding: 'utf8' });
ok(et.stdout.trim() === '204 177 V1-32 V1-22,V1-23', 'A4 corrections : 204 dans 177 ENTRY ; V1-22 et V1-23 réservés ; V1-32 libre', et.stdout.trim());
const vocab = JSON.parse(lire('data/n5/vocab.json')); const e = (id) => vocab.find((x) => x.id === id); const fns = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse];
ok(JSON.stringify(e('v_348').senses[1].meaning.alternatives) === V1.V125 && !fns(e('v_285').senses[0]).length && !fns(e('v_704').senses[1]).length && Object.entries(V1.tags).every(([id, t]) => JSON.stringify(e(id).tags) === t) && JSON.stringify(e('v_427').senses[0].meaning.alternatives) === '["Pas bon"]', 'A5 aucune correction appliquée : V1-25 à V1-31 aux valeurs « avant » ; `v_427_s1` publie toujours « Pas bon »');
const bil = lire(BIL); ok(['25', '26', '27', '28', '29', '30', '31'].every((n) => (bil.match(new RegExp('^\\| V1-' + n + ' \\|', 'gm')) ?? []).length === 1) && !/^\| V1-32 \|/m.test(bil) && (bil.match(/^\| réservé \| V1-2[23] \|/gm) ?? []).length === 2, 'A6 V1-25 à V1-31 retenues, une ligne chacune ; V1-22 et V1-23 réservés ; V1-32 non attribué');
for (const [n, s] of [['recalcul de T5', W + 'recalcul-T5-perimetre.mjs'], ['recalcul de T6', W + 'recalcul-T6-perimetre.mjs'], ['recalcul de T7', W + 'recalcul-T7-perimetre.mjs'], ['contrôle du pilote', W + 'controle-bilan-pilote.mjs']]) { const r = lancer(s); ok(r.code === 0, 'A7 ' + n, 'code ' + r.code + ' ; ' + fin(r)); }
const r9 = lancer(REC), r8 = lancer(REC8);
ok(seuls(r9, TRANS_T9), 'A7 bis recalcul de T9 en service : ses trois écarts transitoires, aucun autre', fin(r9) + ' ; ' + ecarts(r9).map((l) => l.replace(/^ÉCART\s+/, '').slice(0, 50)).join(' | '));
ok(seuls(r8, TRANS_T8), 'A7 ter recalcul de T8 en service : ses deux écarts transitoires, aucun autre', fin(r8) + ' ; ' + ecarts(r8).map((l) => l.replace(/^ÉCART\s+/, '').slice(0, 50)).join(' | '));
const emp = lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && /^empreintes : 44 rapports contrôlés, identiques/.test(emp.out), 'A8 manifeste inchangé : 44 empreintes conformes', emp.out.slice(0, 110));
const rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application'); const eR = ecarts(rel).map((l) => l.split(/\s+/)[1]).sort().join(',');
ok(rel.code === 1 && fin(rel) === '28 conformes sur 30' && eR === 'C8,C9a', 'A9 relais : 28 sur 30, C8 et C9a seuls', fin(rel) + ' ; ' + eR);
const ch = INCHANGES.filter((p) => shaF(p) !== temoin[p]);
ok(!ch.length && !zones(), 'A10 journal, ' + lots.length + ' lots, données, registre, manifeste, 44 documents protégés, recalculs de T8 et T9 et contrôles non visés intacts', ch.join(', ') || INCHANGES.length + ' fichiers ; zones git sans modification');
const jr = (t) => t.split(/\r?\n/).filter((l) => /^\| \d{4}-\d{2}-\d{2}/.test(l)); const j0 = jr(avant[ETAT]), j1 = jr(lire(ETAT));
ok(j1.length === j0.length + 1 && j0.every((l) => j1.includes(l)), 'A11 journal d\'ETAT-ACTUEL.md : antérieur conservé, une seule ligne ajoutée', j1.length + ' lignes');
const b0 = avant[BIL].replace(/(\r?\n)+$/, ''), b1 = lire(BIL); const reste = b1.slice(b0.length);
ok(b1.startsWith(b0) && /^\s*### 8\.112 /.test(reste) && reste.split('### 8.').length === 2 && /^### 8\.111 /m.test(b0), 'A12 bilan antérieur inchangé, §8.111 compris ; §8.112 seul ajouté');
const iA = avant[INV].split('\n'), iB = lire(INV).split('\n'); ok(iB.length === iA.length + 6 && iA.every((l) => iB.includes(l)), 'A13 inventaire : six lignes ajoutées, aucune ligne existante modifiée');
const asm = spawnSync(process.execPath, [join(root, 'tools/reconstruction/run.mjs'), 'assemble'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(asm.status === 0 && /684 ENTRY, 35 identifiant/.test(asm.stdout), 'A14 assemblage réel', 'code ' + asm.status);
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'A15 index vide');
const dc = git('diff', '--check'); ok(dc.status === 0, 'A16 git diff --check', 'code ' + dc.status);
writeFileSync(join(root, SOR, 'application-A.txt'), trace.join('\n') + '\n' + (ko ? ko + ' écart(s) après application : arrêt\n' : 'étape A conforme\n'));
console.log(ko ? ko + ' écart(s) après application : arrêt ; état atteint conservé, aucune réparation' : 'étape A conforme');
process.exit(ko ? 1 : 0);
