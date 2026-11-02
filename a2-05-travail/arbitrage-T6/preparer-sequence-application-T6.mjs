// A2-05 · volet 1 · lot 3 : simulation, sur clone, de la séquence d'application finale de T6 (décision du 2026-10-29 : protections finales
// acceptées sur le fond), EN PROPOSITION. Les deux scripts d'opération proposés (sequence-application/appliquer-operation-A.mjs et
// appliquer-operation-B.mjs) sont exécutés tels quels dans un clone jetable recouvert de l'arbre de travail ; jamais dans le dépôt réel.
// Usage : node a2-05-travail/arbitrage-T6/preparer-sequence-application-T6.mjs <racine du dépôt>
// (1) Préconditions : node --check des deux scripts ; instantané complet du dépôt réel. (2) Opération A : refus avant écriture (pilotage modifié,
// proposition modifiée, sauvegarde existante, index non vide) ; interruption à l'étape 3 (écriture refusée) : arrêt tracé, état atteint conservé ;
// exécution nominale ; seconde exécution refusée. (3) Opération B : application sans valeurs relues valides refusée avant écriture ; établissement ;
// établissement répété refusé ; aperçu relu faux, pilotage modifié après l'établissement : refus avant écriture ; reprise après interruption entre
// l'ajout et la synchronisation refusée ; interruption pendant la synchronisation (écriture refusée) : arrêt tracé, manifeste à 39 conservé ;
// exécution nominale ; seconde exécution refusée ; retours à 38 sur l'état final. (4) Diffs exacts de l'opération A, diff des blocs d'état et du
// manifeste de l'opération B, empreintes intégrales. (5) Dépôt réel inchangé (instantané complet), index vide.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync, chmodSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T6 = W + 'arbitrage-T6/', SEQ = T6 + 'sequence-application/', OUT = SEQ + 'simulation/';
const OPA = SEQ + 'appliquer-operation-A.mjs', OPB = SEQ + 'appliquer-operation-B.mjs', DA = T6 + 'operation-A/', DB = T6 + 'operation-B/';
const REC5 = W + 'recalcul-T5-perimetre.mjs', REC6 = W + 'recalcul-T6-perimetre.mjs', CBP = W + 'controle-bilan-pilote.mjs', CFG = W + 'audit-v1-lot3-T6.mjs';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T6.md', SAUV = T6 + 'proposition-T6.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', MAN = W + 'empreintes-rapports-arbitres.json', APERCU = W + 'sync-stable-apercu.md', INS = T6 + 'inscription/';
const P6E = T6 + 'versions-finales/proposition-recalcul-T6-perimetre-evolutif.mjs';
const shaB = (b) => createHash('sha256').update(b).digest('hex'); const shaIn = (r, p) => (existsSync(join(r, p)) ? shaB(readFileSync(join(r, p))) : null);
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const instantaneIn = (r, exclus = []) => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || exclus.some((x) => p + '/' === x)) continue;
  if (statSync(join(r, p)).isDirectory()) marcher(p); else h[p] = shaIn(r, p); } }; marcher(''); return h; };
const differents = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');

// (1) Préconditions
for (const p of [OPA, OPB]) { const c = spawnSync(process.execPath, ['--check', join(root, p)], { encoding: 'utf8' }); ok(c.status === 0, 'node --check ' + p, 'code ' + c.status + ' ; ' + shaIn(root, p)); }
ok(!existsSync(join(root, DA)) && !existsSync(join(root, DB)), 'dépôt réel : aucune trace d\'opération A ou B');
const reel0 = instantaneIn(root, [OUT]);

// (2) Clone jetable
const tmp = mkdtempSync(join(tmpdir(), 'ocha-sequence-t6-')); const C = join(tmp, 'arbre'); const fC = (p) => join(C, p);
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && !differents(reel0, instantaneIn(C, [OUT])).length, 'clone jetable identique au dépôt réel, fichier par fichier', Object.keys(reel0).length + ' fichiers');
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [fC(s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); const out = ((r.stdout ?? '') + (r.stderr ?? '')).trim(); return { code: r.status, out, exc: /^\s+at |^[A-Za-z]*Error: /m.test(r.stderr ?? '') }; };
const premierEcart = (r) => (r.out.split('\n').find((l) => /^(ÉCART|EXCEPTION)/.test(l)) ?? '').slice(0, 170);
const derniere = (r) => r.out.split('\n').filter(Boolean).pop() ?? '';
const etatClone = () => instantaneIn(C, [OUT, DA, DB]);
const sauver = (...ps) => Object.fromEntries(ps.map((p) => [p, existsSync(fC(p)) ? readFileSync(fC(p)) : null]));
const restaurer = (o) => { for (const [p, b] of Object.entries(o)) { if (existsSync(fC(p))) chmodSync(fC(p), 0o666); if (b === null) rmSync(fC(p), { force: true }); else { mkdirSync(join(fC(p), '..'), { recursive: true }); writeFileSync(fC(p), b); } } };
const effacer = (d) => rmSync(fC(d), { recursive: true, force: true });
const idxVide = () => spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: C, encoding: 'utf8' }).stdout.trim() === '';
const traces = []; const garder = (nom, r) => traces.push('## ' + nom + ' (code ' + r.code + ')\n\n```text\n' + r.out + '\n```\n');
const etat0 = etatClone();
// Refus attendu avant toute écriture : code 1, sans exception non tracée, écart attendu, dépôt simulé inchangé hors sabotage, pas de sauvegarde
const refusAvant = (nom, script, args, attendu, { dossier, avant = etatClone() } = {}) => {
  const r = lancer(script, ...args); garder(nom, r); const ch = differents(avant, etatClone());
  ok(r.code === 1 && !r.exc && attendu.test(premierEcart(r)) && !ch.length && !existsSync(fC(dossier + 'depart')) && /arrêt au premier écart/.test(r.out), nom, premierEcart(r) + ' ; fichiers modifiés par le script : ' + (ch.join(', ') || 'aucun'));
  return r;
};

console.log('--- Opération A : refus avant écriture');
for (const [nom, p, f, re] of [
  ['A-R1 ETAT-ACTUEL.md modifié (une espace en fin de fichier) : refus avant écriture', ETAT, (t) => t + ' ', /empreinte de départ : ETAT-ACTUEL\.md/],
  ['A-R2 recalcul de T6 évolutif proposé modifié : refus avant écriture', P6E, (t) => t + '\n', /version à installer, empreinte relue : .*evolutif/],
  ['A-R3 registre des tranches modifié : refus avant écriture', W + 'registre-tranches.json', (t) => t + '\n', /outil lu, inchangé : .*registre-tranches/],
]) {
  const s = sauver(p); writeFileSync(fC(p), f(readFileSync(fC(p), 'utf8'))); const av = etatClone();
  refusAvant(nom, OPA, [], re, { dossier: DA, avant: av }); restaurer(s); effacer(DA);
}
mkdirSync(fC(DA + 'depart'), { recursive: true });
{ const r = lancer(OPA); garder('A-R4', r); ok(r.code === 1 && /depart\/ absent/.test(premierEcart(r)) && !differents(etat0, etatClone()).length, 'A-R4 sauvegarde de départ déjà présente : refus avant écriture', premierEcart(r)); }
effacer(DA);
writeFileSync(fC('a2-05-travail/zz-index.txt'), 'x\n'); spawnSync('git', ['add', 'a2-05-travail/zz-index.txt'], { cwd: C });
refusAvant('A-R5 index non vide : refus avant écriture', OPA, [], /index vide/, { dossier: DA });
spawnSync('git', ['rm', '--cached', '--quiet', 'a2-05-travail/zz-index.txt'], { cwd: C }); rmSync(fC('a2-05-travail/zz-index.txt')); effacer(DA);
ok(!differents(etat0, etatClone()).length && idxVide(), 'A-R témoin : clone revenu à l\'état de départ, index vide');

console.log('--- Opération A : interruption à l\'étape 3 (écriture refusée sur ETAT-ACTUEL.md)');
{ const s = sauver(REC5, REC6, CBP, CFG, RAP, SAUV, BIL, ETAT, ROAD); chmodSync(fC(ETAT), 0o444);
  const r = lancer(OPA); garder('A-I1', r); chmodSync(fC(ETAT), 0o666); const ch = differents(etat0, etatClone());
  ok(r.code === 1 && /^EXCEPTION /m.test(r.out) && /pendant : étape 3/.test(r.out) && eq(ch, [REC5, CFG, RAP, SAUV, REC6, BIL].sort()) && existsSync(fC(DA + 'depart/' + ETAT)) && existsSync(fC(DA + 'sorties/operation-A.txt')),
    'A-I1 interruption tracée : arrêt pendant l\'étape 3 ; état atteint conservé (étapes 1 et 2, bilan) ; sauvegarde et trace présentes', premierEcart(r) + ' ; état : ' + ch.join(', '));
  restaurer(s); effacer(DA); ok(!differents(etat0, etatClone()).length, 'A-I1 clone restauré par le harnais (le script ne répare rien)'); }

console.log('--- Opération A : exécution nominale');
const A = lancer(OPA); garder('A nominale', A);
for (const l of A.out.split('\n').filter((l) => /^conforme E[0-4] : relais/.test(l))) console.log('   ' + l);
const chA = differents(etat0, etatClone());
ok(A.code === 0 && !A.exc && derniere(A).startsWith('opération A conforme') && eq(chA, [REC5, CFG, RAP, SAUV, REC6, BIL, ETAT, ROAD, CBP].sort()) && idxVide(),
  'A exécution nominale : code 0 ; neuf fichiers prévus, aucun autre ; relais 28 sur 30 (C8, C9a)', A.out.split('\n').filter((l) => l.startsWith('conforme')).length + ' vérifications conformes ; ' + chA.join(', '));
const etatA = etatClone(); const traceA = readFileSync(fC(DA + 'sorties/operation-A.txt'));
{ const r = lancer(OPA); ok(r.code === 1 && !differents(etatA, etatClone()).length, 'A-R6 seconde exécution : refus avant écriture', premierEcart(r)); }
writeFileSync(fC(DA + 'sorties/operation-A.txt'), traceA); // trace de l'exécution nominale (la seconde exécution l'avait remplacée)

console.log('--- Opération B : refus avant écriture, établissement');
refusAvant('B-R1 application sans plan relu valide (plan et aperçu fictifs) : rétablissement sur copie, refus avant écriture', OPB, ['--appliquer', '--plan', '0000000000000000', '--apercu', '0'.repeat(64)], /plan et aperçu rétablis sur la copie = valeurs relues/, { dossier: DB }); effacer(DB);
const E = lancer(OPB, '--etablir'); garder('B établissement', E);
const plan = (E.out.match(/plan établi : ([0-9a-f]{16})/) ?? [])[1], apercu = (E.out.match(/empreinte de l'aperçu : ([0-9a-f]{64})/) ?? [])[1];
const apercuPrevu = existsSync(fC(DB + 'etablissement/apercu-prevu.md')) ? readFileSync(fC(DB + 'etablissement/apercu-prevu.md'), 'utf8') : '';
const manPrevu = existsSync(fC(DB + 'etablissement/manifeste-prevu.json')) ? readFileSync(fC(DB + 'etablissement/manifeste-prevu.json')) : Buffer.alloc(0);
ok(E.code === 0 && plan && apercu && shaB(apercuPrevu) === apercu && !differents(etatA, etatClone()).length, 'B-E établissement : code 0 ; plan et aperçu établis ; dépôt simulé inchangé hors du dossier de l\'opération', 'plan ' + plan + ' ; aperçu ' + apercu);
{ const r = lancer(OPB, '--etablir'); ok(r.code === 1 && /etablissement\/ absent/.test(premierEcart(r)) && !differents(etatA, etatClone()).length, 'B-R2 établissement répété : refus (aucun établissement écrasé)', premierEcart(r)); }
refusAvant('B-R3 aperçu relu faux (un caractère) : refus avant écriture', OPB, ['--appliquer', '--plan', plan, '--apercu', apercu.slice(0, -1) + (apercu.endsWith('0') ? '1' : '0')], /plan et aperçu rétablis/, { dossier: DB });
{ const s = sauver(ETAT); writeFileSync(fC(ETAT), readFileSync(fC(ETAT), 'utf8') + ' '); const av = etatClone();
  refusAvant('B-R4 ETAT-ACTUEL.md modifié après l\'établissement : refus avant écriture', OPB, ['--appliquer', '--plan', plan, '--apercu', apercu], /état après l'opération A : ETAT-ACTUEL\.md/, { dossier: DB, avant: av }); restaurer(s); }
{ const s = sauver(MAN); const aj = lancer(W + 'empreintes-lot3.mjs', '--ajouter'); const av = etatClone();
  refusAvant('B-R5 reprise après interruption entre l\'ajout et la synchronisation (manifeste déjà à 39) : refus, état conservé, aucune réparation', OPB, ['--appliquer', '--plan', plan, '--apercu', apercu], /état après l'opération A : a2-05-travail\/empreintes-rapports-arbitres\.json/, { dossier: DB, avant: av });
  ok(aj.code === 0 && Object.keys(JSON.parse(readFileSync(fC(MAN), 'utf8')).empreintes).length === 39, 'B-R5 manifeste laissé à 39 entrées par le script (aucune réparation automatique)'); restaurer(s); }
ok(!differents(etatA, etatClone()).length && idxVide(), 'B-R témoin : clone revenu à l\'état après l\'opération A');

console.log('--- Opération B : interruption pendant la synchronisation (écriture refusée sur ETAT-ACTUEL.md)');
{ const s = sauver(MAN, ETAT, ROAD, APERCU); const etab = sauver(DB + 'etablissement/apercu-prevu.md', DB + 'etablissement/manifeste-prevu.json'); chmodSync(fC(ETAT), 0o444);
  const r = lancer(OPB, '--appliquer', '--plan', plan, '--apercu', apercu); garder('B-I1', r); chmodSync(fC(ETAT), 0o666); const ch = differents(etatA, etatClone());
  const n = Object.keys(JSON.parse(readFileSync(fC(MAN), 'utf8')).empreintes).length;
  ok(r.code === 1 && /synchronisation appliquée au plan/.test(premierEcart(r)) && /état atteint : manifeste à 39 entrées ; synchronisation tentée/.test(r.out) && n === 39 && eq(ch, [APERCU, MAN].sort()) && existsSync(fC(DB + 'depart/' + MAN)),
    'B-I1 interruption tracée : synchronisation refusée ; manifeste à 39 conservé, pilotage inchangé ; sauvegarde et trace présentes', premierEcart(r) + ' ; état : ' + ch.join(', '));
  const cb = lancer(CBP), rel = lancer(W + 'controle-relais-allege.mjs', '--apres-application');
  ok(cb.code === 0 && rel.code === 1 && derniere(rel) === '29 conformes sur 30', 'B-I1 état laissé visible : contrôle du pilote conforme (39 ≥ 38 déclarées) ; relais 29 sur 30 (C8 : bloc non synchronisé)', 'pilote code ' + cb.code + ' ; relais : ' + derniere(rel));
  restaurer(s); effacer(DB); restaurer(etab); ok(!differents(etatA, etatClone()).length, 'B-I1 clone restauré par le harnais (le script ne répare rien)'); }

console.log('--- Opération B : exécution nominale');
const B = lancer(OPB, '--appliquer', '--plan', plan, '--apercu', apercu); garder('B nominale', B);
const chB = differents(etatA, etatClone());
ok(B.code === 0 && !B.exc && derniere(B).startsWith('opération B conforme') && eq(chB, [APERCU, ETAT, MAN, ROAD].sort()) && idxVide(),
  'B exécution nominale : code 0 ; manifeste, deux documents de pilotage et aperçu, aucun autre fichier ; relais 30 sur 30', B.out.split('\n').filter((l) => l.startsWith('conforme')).length + ' vérifications conformes ; ' + chB.join(', '));
ok(Buffer.compare(readFileSync(fC(MAN)), manPrevu) === 0, 'B manifeste écrit = manifeste prévu à l\'établissement, octet pour octet', shaIn(C, MAN));
const etatB = etatClone();
{ const r = lancer(OPB, '--appliquer', '--plan', plan, '--apercu', apercu); ok(r.code === 1 && /depart\/ absent/.test(premierEcart(r)) && !differents(etatB, etatClone()).length, 'B-R6 seconde exécution : refus avant écriture', premierEcart(r)); }
// Retours à 38 sur l'état final (protections retenues : journal des ajouts, bloc d'état)
const manT = (f) => { const o = JSON.parse(readFileSync(fC(MAN), 'utf8')); f(o); writeFileSync(fC(MAN), JSON.stringify(o, null, 1) + '\n'); };
for (const [nom, f, re] of [['F1 retour à 38, journal des ajouts laissé', (o) => { delete o.empreintes[RAP]; }, /entrées ajoutées = journal des ajouts/],
  ['F2 retour à 38, manifeste restant cohérent (empreinte et dernier ajout retirés)', (o) => { delete o.empreintes[RAP]; o.ajouts.pop(); }, /au moins autant d'empreintes que le bloc/]]) {
  const s = sauver(MAN); manT(f); const r = lancer(CBP); restaurer(s);
  ok(r.code === 1 && !r.exc && r.out.split('\n').some((l) => /^ÉCART/.test(l) && re.test(l)), nom + ' : détecté par le contrôle du pilote évolutif', premierEcart(r));
}
ok(!differents(etatB, etatClone()).length, 'témoin final : état après l\'opération B restauré');

// (4) Diffs et empreintes
mkdirSync(join(root, OUT, 'diffs'), { recursive: true }); mkdirSync(join(root, OUT, 'sorties'), { recursive: true });
const diffNoIndex = (a, b, nom, cwd = root) => { const d = spawnSync('git', ['diff', '--no-index', '--no-color', '--', a, b], { cwd, encoding: 'utf8', maxBuffer: 1 << 28 }); writeFileSync(join(root, OUT, 'diffs', nom), d.stdout);
  const n = (c) => d.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length; return { code: d.status, plus: n('+'), moins: n('-') }; };
const lignesA = [];
for (const [cible, source] of [[REC5, T6 + 'adaptation-T5/proposition-recalcul-T5-perimetre-arbitre-T6.mjs'], [CFG, INS + 'audit-v1-lot3-T6.mjs'], [RAP, INS + 'etape2-A2-05-volet1-lot3-T6.md'],
  [SAUV, INS + 'proposition-T6.md'], [REC6, P6E], [BIL, INS + 'etape2-A2-05-bilan-volet2.md'], [ETAT, INS + 'ETAT-ACTUEL.md'], [ROAD, INS + 'ROADMAP.md'], [CBP, T6 + 'versions-finales-2/proposition-controle-bilan-pilote-evolutif.mjs']]) {
  const nom = 'A-' + cible.split('/').pop() + '.diff'; const a = existsSync(join(root, cible)) ? cible : '/dev/null';
  const r = diffNoIndex(a, source, nom); const avant = shaIn(root, cible), apres = etatA[cible];
  ok(r.code === 1 && apres === shaIn(root, source), 'diff ' + nom, '+' + r.plus + ' / -' + r.moins + ' ; ' + (avant ?? 'absent') + ' → ' + apres); lignesA.push('| `' + cible + '` | `' + (avant ?? 'absent') + '` | `' + apres + '` | +' + r.plus + ' / −' + r.moins + ' |');
}
// Opération B : diffs du manifeste et des blocs, entre l'état après A (sauvegarde de départ de B) et l'état après B, sur le clone
const dB = mkdtempSync(join(tmpdir(), 'ocha-diffs-b-'));
for (const [p, nom] of [[MAN, 'B-manifeste.diff'], [ETAT, 'B-ETAT-ACTUEL.md.diff'], [ROAD, 'B-ROADMAP.md.diff']]) {
  const av = join(dB, 'avant'), ap = join(dB, 'apres'); writeFileSync(av, readFileSync(fC(DB + 'depart/' + p))); writeFileSync(ap, readFileSync(fC(p)));
  const r = diffNoIndex('avant', 'apres', nom, dB); ok(r.code === 1, 'diff ' + nom, '+' + r.plus + ' / -' + r.moins + ' ; ' + etatA[p] + ' → ' + etatB[p]);
}
rmSync(dB, { recursive: true, force: true });
// Les traces écrites par les scripts dans le clone (et rendues sur la sortie) ne contiennent aucun chemin de machine ; la trace de l'établissement
// a été effacée avec le dossier de B à la restauration de B-I1 : seules celles de A et de B --appliquer sont exigées
const tracesClone = [DA + 'sorties/operation-A.txt', DB + 'sorties/operation-B-appliquer.txt'].filter((p) => existsSync(fC(p))).map((p) => readFileSync(fC(p), 'utf8'));
ok(tracesClone.length === 2 && ![...tracesClone, ...traces].some((t) => /[A-Za-z]:[\\/]+Users|ocha-sequence-t6-|ocha-operation-b-/i.test(t)), 'traces des opérations sans chemin de machine (racine et dossier temporaire masqués)', tracesClone.length + ' traces finales ; ' + traces.length + ' sorties de cas');
writeFileSync(join(root, OUT, 'sorties', 'apercu-prevu.md'), apercuPrevu);
writeFileSync(join(root, OUT, 'sorties', 'traces-operations.md'), traces.join('\n'));
writeFileSync(join(root, OUT, 'sorties', 'table-A.md'), '| Fichier | Avant | Après | Lignes |\n|---|---|---|---|\n' + lignesA.join('\n') + '\n');
writeFileSync(join(root, OUT, 'sorties', 'etat-final-B.txt'), [MAN, ETAT, ROAD, APERCU].map((p) => p + ' ' + etatB[p]).join('\n') + '\nplan ' + plan + '\naperçu ' + apercu + '\n');
rmSync(tmp, { recursive: true, force: true });

// (5) Dépôt réel inchangé
const ch = differents(reel0, instantaneIn(root, [OUT]));
const idx = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' });
ok(!ch.length && !existsSync(join(root, DA)) && !existsSync(join(root, DB)) && idx.stdout.trim() === '', 'dépôt réel inchangé (instantané complet, ' + Object.keys(reel0).length + ' fichiers) ; index vide', ch.join(', ') || 'aucune modification');
console.log(ko ? ko + ' écart(s)' : 'simulation conforme');
process.exit(ko ? 1 : 0);
