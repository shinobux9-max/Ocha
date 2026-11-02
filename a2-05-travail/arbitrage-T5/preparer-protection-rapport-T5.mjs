// A2-05 · volet 1 · lot 3 : essais, sur copie, de l'adaptation du contrôle du bilan du pilote et du recalcul de T5 à l'arbitrage de T5 et à
// l'ajout de son rapport au manifeste (37e entrée), EN PROPOSITION : aucun fichier du dépôt réel n'est modifié.
// Usage : node a2-05-travail/arbitrage-T5/preparer-protection-rapport-T5.mjs <racine du dépôt> <dossier de travail jetable>
// (1) Préconditions sur le dépôt réel (scripts en service et propositions aux empreintes attendues ; 36 empreintes ; rapport de T5 hors du
// manifeste ; référence du §0 de T5 absente). (2) Clone git jetable recouvert de l'arbre de travail : référence écrite par le préparateur
// (second --ecrire refusé). Étape A (état actuel, 36 entrées) puis étape B (ajout du rapport par l'outil réel, 37 entrées ; second --ajouter
// refusé) : contrôles en service et proposés, empreintes, relais. (3) Sabotages sur l'état B, un à un : chacun modifie réellement les octets
// visés, doit être détecté par le script proposé désigné (code 1 et écart attendu), puis est annulé (octets restaurés, vérifiés) ; témoin sain
// avant et après. (4) Dépôt réel inchangé. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdtempSync, cpSync, readdirSync, rmSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''), base = process.argv[3]; if (!process.argv[2] || !base) throw new Error('arguments attendus : racine du dépôt, dossier de travail');
const W = 'a2-05-travail/', A5 = W + 'arbitrage-T5/', A4 = W + 'arbitrage-T4/', R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
const CBP = W + 'controle-bilan-pilote.mjs', REC = W + 'recalcul-T5-perimetre.mjs', MAN = W + 'empreintes-rapports-arbitres.json';
const PCBP = A5 + 'proposition-controle-bilan-pilote-T5-arbitre.mjs', PREC = A5 + 'proposition-recalcul-T5-perimetre-arbitre.mjs';
const PREF = A5 + 'preparer-reference-s0-T5.mjs', REF = A5 + 'reference-s0-T5.json', T5R = R + 'T5.md', P5 = R + 'T5-perimetre.md';
const BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const TEMOINS = [CBP, REC, MAN, PCBP, PREC, PREF, T5R, P5, R + 'T4.md', R + 'bilan-pilote.md', BIL, W + 'registre-tranches.json', 'data/n5/vocab.json', 'reconstruction/a2-04/journal.json', 'ETAT-ACTUEL.md', 'ROADMAP.md'];
const avant = Object.fromEntries(TEMOINS.map((p) => [p, sha(join(root, p))]));

// (1) Préconditions
const man0 = JSON.parse(readFileSync(join(root, MAN), 'utf8')).empreintes;
ok(avant[CBP].startsWith('fd30fcaa127d') && avant[REC].startsWith('53ca95bb61d0'), 'P1 scripts en service', 'contrôle ' + avant[CBP].slice(0, 12) + '… ; recalcul ' + avant[REC].slice(0, 12) + '…');
ok(avant[PREC].startsWith('7f23952def9a'), 'P2 proposition relue du recalcul inchangée', avant[PREC].slice(0, 12) + '…');
ok(Object.keys(man0).length === 36 && Object.entries(man0).every(([p, h]) => sha(join(root, p)) === h) && !Object.hasOwn(man0, T5R) && Object.keys(man0)[35] === P5, 'P3 manifeste : 36 empreintes identiques ; périmètre de T5 en 36e ; rapport de T5 absent');
ok(avant[T5R].startsWith('4121ed863c5f') && !existsSync(join(root, REF)), 'P4 rapport de T5 = version inscrite relue ; référence du §0 de T5 absente', avant[T5R].slice(0, 12) + '…');
if (ko) arret('préconditions non conformes');

// (2) Clone jetable recouvert de l'arbre de travail
const tmp = mkdtempSync(join(resolve(base), 'ocha-protection-t5-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const run = (s, ...a) => { const r = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); const out = (r.stdout ?? '') + (r.stderr ?? ''); return { code: r.status, out, ecarts: out.split('\n').filter((l) => /^ÉCART|^FAUX|Error|^\s+at /.test(l)), fin: out.trim().split('\n').at(-1) }; };
const releve = (nom, r) => console.log('   ' + nom + ' (code ' + r.code + ') : ' + r.fin + (r.ecarts.length ? ' | ' + r.ecarts.join(' | ') : ''));
const lab = (r) => r.ecarts.filter((l) => l.startsWith('ÉCART')).map((l) => l.replace(/^ÉCART\s+/, ''));
const court = (v) => v.map((l) => l.slice(0, 110)).join(' | ');

const e1 = run(PREF, '--ecrire'); const e2 = run(PREF, '--ecrire');
ok(e1.code === 0 && existsSync(join(C, REF)) && sha(join(C, REF)).startsWith('757083e5ca9268c5'), 'référence écrite dans le clone par le préparateur', e1.fin + ' ; ' + sha(join(C, REF)).slice(0, 16) + '…');
ok(e2.code === 1 && /^refus/.test(e2.fin) && sha(join(C, REF)).startsWith('757083e5ca9268c5'), 'second --ecrire refusé, référence inchangée', e2.fin);

// Étape A : état actuel (36 entrées), référence présente
const A = { cbp: run(CBP), pcbp: run(PCBP), rec: run(REC), prec: run(PREC), emp: run(W + 'empreintes-lot3.mjs'), rel: run(W + 'controle-relais-allege.mjs', '--apres-application') };
for (const [k, r] of Object.entries(A)) releve('A ' + k, r);
ok(A.cbp.code === 0, 'A1 contrôle en service conforme (il ne porte pas sur le rapport de T5)', A.cbp.fin);
ok(A.pcbp.code === 1 && lab(A.pcbp).length === 2 && lab(A.pcbp)[0].startsWith('T5 : rapport arbitré protégé au manifeste, empreinte identique : absent') && lab(A.pcbp)[1].startsWith('manifeste : 37 empreintes recalculées, identiques ; périmètre de T5 (36e entrée) et rapport arbitré de T5 (37e entrée) : 36 entrées'), 'A2 contrôle proposé : exactement les deux écarts attendus (rapport de T5 hors du manifeste ; 36 entrées au lieu de 37)', court(lab(A.pcbp)));
ok(A.rec.code === 1 && lab(A.rec).length === 3, 'A3 recalcul en service : ses trois écarts connus', court(lab(A.rec)));
ok(A.prec.code === 1 && lab(A.prec).length === 1 && /^manifeste : 37 empreintes/.test(lab(A.prec)[0]), 'A4 recalcul proposé : seul écart, la 37e empreinte', court(lab(A.prec)));
ok(A.emp.code === 0 && A.emp.fin.includes('36 rapports contrôlés, identiques') && A.emp.fin.includes(T5R), 'A5 empreintes : 36 identiques ; rapport de T5 signalé hors du manifeste', A.emp.fin);
console.log('constat  A6 relais : ' + A.rel.fin);

// Étape B : ajout du rapport par l'outil réel (37 entrées)
const ajout = run(W + 'empreintes-lot3.mjs', '--ajouter'); const man1 = JSON.parse(readFileSync(join(C, MAN), 'utf8')).empreintes; const hB = sha(join(C, MAN));
const ajout2 = run(W + 'empreintes-lot3.mjs', '--ajouter');
ok(ajout.code === 0 && Object.keys(man1).length === 37 && Object.keys(man1)[36] === T5R && man1[T5R] === sha(join(C, T5R)) && Object.entries(man0).every(([p, h], k) => man1[p] === h && Object.keys(man1)[k] === p), 'B1 ajout : 37 entrées, seul le rapport de T5 ajouté (37e), les 36 précédentes identiques en valeur et en ordre', ajout.fin);
ok(ajout2.code !== 0 && sha(join(C, MAN)) === hB, 'B2 second --ajouter refusé, manifeste inchangé', 'code ' + ajout2.code + ' ; ' + ajout2.fin);
const B = { cbp: run(CBP), pcbp: run(PCBP), rec: run(REC), prec: run(PREC), emp: run(W + 'empreintes-lot3.mjs'), rel: run(W + 'controle-relais-allege.mjs', '--apres-application') };
for (const [k, r] of Object.entries(B)) releve('B ' + k, r);
ok(B.pcbp.code === 0 && B.pcbp.fin === 'contrôle conforme', 'B3 contrôle proposé conforme à 37 entrées', B.pcbp.fin + ' ; ' + (B.pcbp.out.match(/^conforme /gm) ?? []).length + ' contrôles conformes');
ok(B.prec.code === 0, 'B4 recalcul proposé conforme à 37 entrées', B.prec.fin + ' ; ' + (B.prec.out.match(/^conforme /gm) ?? []).length + ' contrôles conformes');
ok(B.cbp.code === 1 && lab(B.cbp).length === 1 && /^manifeste : 36 empreintes/.test(lab(B.cbp)[0]), 'B5 contrôle en service : seul écart, 37 entrées au lieu de 36 (son adaptation doit précéder ou accompagner l\'ajout)', court(lab(B.cbp)));
ok(B.rec.code === 1 && lab(B.rec).length === 4, 'B6 recalcul en service : quatre écarts (les trois connus et 37 entrées au lieu de 36)', court(lab(B.rec)));
ok(B.emp.code === 0 && B.emp.fin.includes('37 rapports contrôlés, identiques'), 'B7 empreintes : 37 identiques', B.emp.fin);
console.log('constat  B8 relais : ' + B.rel.fin);

// (3) Sabotages sur l'état B
const lireC = (p) => readFileSync(join(C, p), 'utf8');
const une = (a, b) => (t) => { if (t.split(a).length !== 2) throw new Error('motif absent ou multiple : ' + a.slice(0, 60)); return t.replace(a, () => b); };
const json = (f) => (t) => JSON.stringify(f(JSON.parse(t)), null, 2) + '\n';
const manif = (f) => json((m) => ({ ...m, empreintes: f(m.empreintes) }));
const sansCle = (o, k) => Object.fromEntries(Object.entries(o).filter(([x]) => x !== k));
const t5 = lireC(T5R), ligneS1 = (n) => t5.split('\n').find((l) => l.startsWith('| ' + n + ' | `'));
const p0 = t5.split('\n').filter((l) => l.startsWith('| **')); // points du §0, dans l'ordre
const SAB = [
  // §0 de T5 et sa référence
  ['S01', '§0 de T5 : décision altérée', [[T5R, une('**22 conformités, aucun écart', '**21 conformités, aucun écart')]], PCBP, 'T5, §0 : identique à la référence approuvée'],
  ['S02', '§0 de T5 : synthèse altérée', [[T5R, une('aucun suspendu**, comme proposé.', 'aucun suspendu**, contre la proposition.')]], PCBP, 'T5, §0 : identique à la référence approuvée'],
  ['S03', '§0 de T5 : points 2 et 3 permutés', [[T5R, une(p0[2] + '\n' + p0[3], p0[3] + '\n' + p0[2])]], PCBP, 'T5, §0 : identique à la référence approuvée'],
  ['S04', '§0 de T5 : point « Limites » supprimé', [[T5R, une(p0[5] + '\n', '')]], PCBP, 'T5, §0 : identique à la référence approuvée'],
  ['S05', '§0 de T5 : liste globale (V1-25 au lieu de V1-24)', [[T5R, une('; V1-24 reste libre.**', '; V1-25 reste libre.**')]], PCBP, 'T5, §0 : identique à la référence approuvée'],
  ['S06', 'référence : un point altéré', [[REF, une('ni à 私 et あなた', 'ni à 私')]], PCBP, 'T5, §0 : référence approuvée intacte'],
  ['S07', 'référence supprimée', [[REF, null]], PCBP, 'T5, §0 : référence approuvée intacte'],
  ['S08', 'référence et §0 altérés de concert', [[REF, une('la tension entre ces décisions et A9, §4.2, est documentée, non résolue', 'la tension entre ces décisions et A9, §4.2, est documentée, résolue')], [T5R, une('la tension entre ces décisions et A9, §4.2, est documentée, non résolue', 'la tension entre ces décisions et A9, §4.2, est documentée, résolue')]], PCBP, 'T5, §0 : référence approuvée intacte'],
  // Réserve normative
  ['S09', 'réserve (§0) : « conservées, sans modification » remplacé', [[T5R, une('sont **conservées, sans modification**', 'sont **rouvertes**')]], PCBP, 'T5, réserve normative : six fragments'],
  ['S10', 'réserve (§8.95) : « documentée, non résolue » retiré', [[BIL, une('La tension entre ces décisions et A9, §4.2, est documentée, non résolue.', 'La tension entre ces décisions et A9, §4.2, est résolue.')]], PCBP, 'T5, réserve normative : six fragments'],
  ['S11', 'réserve (journal) : D0668 modifiée (after)', [['reconstruction/a2-04/journal.json', json((j) => j.map((x) => (x.id === 'A2-04-D0668' ? { ...x, after: 'personne' } : x)))]], PCBP, 'T5, réserve normative : D0668'],
  ['S12', 'réserve (données) : type de こちら, sens 2, renseigné', [['data/n5/vocab.json', json((v) => v.map((e) => (e.id === 'v_339' ? { ...e, senses: e.senses.map((s) => (s.id === 'v_339_s2' ? { ...s, semantic_type: 'personne' } : s)) } : e)))]], PCBP, 'T5, réserve normative : D0668'],
  // §1 et les 22 fiches
  ['S13', '§1 : verdict du sens 2 changé', [[T5R, une(ligneS1(2), ligneS1(2).replace('**conforme**', '**écart**'))]], PCBP, 'T5 : §1 et fiches d\'examen d\'origine'],
  ['S14', '§1 : verdict changé de concert dans la proposition sauvegardée', [[T5R, une(ligneS1(2), ligneS1(2).replace('**conforme**', '**écart**'))], [A5 + 'proposition-T5.md', une(ligneS1(2), ligneS1(2).replace('**conforme**', '**écart**'))]], PCBP, 'T5 : rapport arbitré (§0) ; proposition conservée'],
  ['S15', 'fiche de 私 : un mot du corps altéré', [[T5R, (t) => { const i = t.indexOf('#### `v_688_s1`'), j = t.indexOf('\n', t.indexOf('\n', i) + 1) + 1; const l = t.slice(j, t.indexOf('\n', j)); if (!/[a-zé]{4,}/.test(l)) throw new Error('ligne sans mot'); return t.slice(0, j) + l.replace(/[a-zé]{4,}/, (w) => w.toUpperCase()) + t.slice(j + l.length); }]], PCBP, 'T5 : rapport arbitré (§0) ; proposition conservée'],
  ['S16', 'fiche de 私 : titre de fiche rétrogradé', [[T5R, une('#### `v_688_s1` · ', '### `v_688_s1` · ')]], PCBP, 'T5 : §1 et fiches d\'examen d\'origine'],
  ['S17', 'statut du rapport de T5 redaté', [[T5R, une('**Statut** : **arbitré le 2026-10-25** (§0).', '**Statut** : **arbitré le 2026-10-26** (§0).')]], PCBP, 'T5 : rapport arbitré (§0) ; proposition conservée'],
  ['S18', '§8.95 : ligne de correction V1-24 ajoutée', [[BIL, une('**Décomptes calculés par les outils**, non saisis à la main : **274', '| V1-24 | `v_339` | こちら | 11 | type | `semantic_type` | `null` | `personne` |\n\n**Décomptes calculés par les outils**, non saisis à la main : **274')]], PCBP, 'T5 : 22 conformes, aucun écart = §1 ; aucune correction nouvelle'],
  ['S19', 'bilan : ligne V1-24 ajoutée après V1-21', [[BIL, (t) => t.replace(/^(\| V1-21 \|[^\n]*\n)/m, (l) => l + l.replace('| V1-21 |', '| V1-24 |'))]], PCBP, 'T5 : 22 conformes, aucun écart = §1 ; aucune correction nouvelle'],
  // Manifeste : entrée de T5
  ['S20', 'manifeste : entrée du rapport de T5 retirée', [[MAN, manif((m) => sansCle(m, T5R))]], PCBP, 'T5 : rapport arbitré protégé au manifeste'],
  ['S21', 'manifeste : empreinte du rapport de T5 altérée', [[MAN, manif((m) => ({ ...m, [T5R]: '0'.repeat(64) }))]], PCBP, 'T5 : rapport arbitré protégé au manifeste'],
  ['S22', 'manifeste : rapport de T5 placé avant le périmètre', [[MAN, manif((m) => { const o = sansCle(sansCle(m, T5R), P5); return { ...o, [T5R]: m[T5R], [P5]: m[P5] }; })]], PCBP, 'manifeste : 37 empreintes'],
  ['S23', 'manifeste : 38e entrée fictive, empreinte juste', [[MAN, manif((m) => ({ ...m, 'ROADMAP.md': sha(join(C, 'ROADMAP.md')) }))]], PCBP, 'manifeste : 37 empreintes'],
  ['S24', 'manifeste : rapport de T5 remplacé par un fichier absent', [[MAN, manif((m) => { const o = sansCle(m, T5R); return { ...o, [R + 'T5-absent.md']: m[T5R] }; })]], PCBP, 'manifeste : 37 empreintes'],
  ['S25', 'rapport de T5 modifié après sa protection (une fiche)', [[T5R, une('#### `v_411_s1` · これ (これ) · « Ceci »', '#### `v_411_s1` · これ (これ) · « Ceci-ci »')]], PCBP, 'T5 : rapport arbitré protégé au manifeste'],
  ['S26', 'proposition sauvegardée de T5 altérée', [[A5 + 'proposition-T5.md', une('**22 sens examinés : 22 conformes, 0 écart', '**22 sens examinés : 22 conformes, 0 écarts')]], PCBP, 'T5 : rapport arbitré (§0) ; proposition conservée'],
  // Protections historiques T1 à T4 et périmètre de T5
  ['S27', 'T1 : rapport, un verdict du §1 changé', [[R + 'T1.md', (t) => t.replace(/^(\| 1 \| `[^`]+` \|.*\| )\*\*conforme\*\*/m, '$1**écart**')]], PCBP, 'T1 : taille et verdicts proposés'],
  ['S28', 'T3 : rapport modifié (une ligne)', [[R + 'T3.md', (t) => t.replace(/^(#### `[^`]+` · [^\n]*)$/m, '$1 ')]], PCBP, 'T3 : rapport et périmètre protégés'],
  ['S29', 'bilan du pilote : §0 altéré', [[R + 'bilan-pilote.md', une('## 0. Arbitrage\n\n', '## 0. Arbitrage\n\nAjout. ')]], PCBP, 'bilan du pilote, §0 : identique'],
  ['S30', 'bilan du pilote : référence altérée', [[A4 + 'reference-s0-bilan-pilote.json', une('"Faits retenus"', '"Faits arrêtés"')]], PCBP, 'bilan du pilote, §0 : référence approuvée intacte'],
  ['S31', 'T4 : §0 du rapport altéré', [[R + 'T4.md', une('**28 conformes, 7 écarts, aucun suspendu**', '**27 conformes, 8 écarts, aucun suspendu**')]], PCBP, 'T4, §0 : identique à la référence approuvée'],
  ['S32', 'T4 : référence altérée', [[A4 + 'reference-s0-T4.json', (t) => t.replace('"V1-22"', '"V1-24"')]], PCBP, 'T4, §0 : référence approuvée intacte'],
  ['S33', 'T4 : §8.91, ligne V1-21 retirée', [[BIL, (t) => t.replace(/^\| V1-21 \|[^\n]*\n/m, '')]], PCBP, 'T4 : 28 conformes et 7 écarts arbitrés'],
  ['S34', 'T4 : périmètre accepté modifié', [[R + 'T4-perimetre.md', (t) => t + '\n']], PCBP, 'T4 : périmètre accepté protégé au manifeste'],
  ['S35', 'T5 : §0 du périmètre accepté altéré', [[P5, une('sans ajout, retrait ni déplacement.** »', 'sans ajout ni retrait.** »')]], PCBP, 'T5 : périmètre accepté (§0)'],
  ['S36', 'registre : T5 passée « arbitrée »', [[W + 'registre-tranches.json', json((r) => ({ ...r, tranches: r.tranches.map((t) => (t.id === 'T5' ? { ...t, statut: 'arbitrée' } : t)) }))]], PCBP, 'registre : condition du pilote'],
  // Recalcul de T5 proposé
  ['R01', 'recalcul : rapport de T5 remis au statut de proposition', [[T5R, une('**Statut** : **arbitré le 2026-10-25** (§0).', '**Statut** : **proposition, non arbitrée.**')]], PREC, 'les 22 sens examinés dans le seul rapport de T5, arbitré'],
  ['R02', 'recalcul : fiche d\'un sens de T5 recopiée dans le rapport de T4', [[R + 'T4.md', (t) => t + '\n#### `v_688_s1` · 私 (わたし) · « Je » — proposé : **conforme**\n']], PREC, 'les 22 sens examinés dans le seul rapport de T5, arbitré'],
  ['R03', 'recalcul : entrée du rapport de T5 retirée du manifeste', [[MAN, manif((m) => sansCle(m, T5R))]], PREC, 'manifeste : 37 empreintes'],
  ['R04', 'recalcul : rapport de T5 remplacé au manifeste par un fichier absent', [[MAN, manif((m) => { const o = sansCle(m, T5R); return { ...o, [R + 'T5-absent.md']: m[T5R] }; })]], PREC, 'manifeste : 37 empreintes'],
];
const sain = (n) => { const a = run(PCBP), b = run(PREC); ok(a.code === 0 && b.code === 0, 'témoin sain ' + n + ' (contrôle et recalcul proposés)', a.fin + ' ; ' + b.fin); };
sain('avant');
let det = 0;
for (const [id, objet, cibles, script, attendu] of SAB) {
  const orig = cibles.map(([p]) => [p, readFileSync(join(C, p))]);
  let modifie = true;
  try { for (const [p, f] of cibles) { if (f === null) unlinkSync(join(C, p)); else writeFileSync(join(C, p), f(readFileSync(join(C, p), 'utf8'))); } } catch (e) { modifie = false; console.log('ÉCART    ' + id + ' sabotage non appliqué : ' + e.message); }
  modifie = modifie && orig.every(([p, o]) => !existsSync(join(C, p)) || !readFileSync(join(C, p)).equals(o));
  const r = run(script); const vus = lab(r); const touche = vus.some((l) => l.startsWith(attendu)); const exc = r.ecarts.some((l) => /Error|^\s+at /.test(l));
  ok(modifie && r.code === 1 && touche && !exc, id + ' ' + objet + ' → ' + (script === PCBP ? 'contrôle' : 'recalcul') + ' proposé', (modifie ? 'octets modifiés' : 'OCTETS INCHANGÉS') + ' ; code ' + r.code + (exc ? ' ; EXCEPTION' : '') + ' ; ' + vus.length + ' écart(s) : ' + court(vus));
  if (modifie && r.code === 1 && touche && !exc) det++;
  for (const [p, o] of orig) writeFileSync(join(C, p), o);
  ok(orig.every(([p, o]) => readFileSync(join(C, p)).equals(o)), id + ' annulé, octets restaurés');
}
console.log('constat  sabotages détectés : ' + det + ' sur ' + SAB.length);
sain('après');
rmSync(tmp, { recursive: true, force: true });

// (4) Dépôt réel inchangé
const change = TEMOINS.filter((p) => sha(join(root, p)) !== avant[p]);
ok(!change.length && !existsSync(join(root, REF)), 'dépôt réel inchangé (' + TEMOINS.length + ' fichiers témoins ; référence non écrite)', change.join(', ') || 'aucune modification');
console.log(ko ? ko + ' écart(s)' : 'essais conformes');
process.exit(ko ? 1 : 0);
