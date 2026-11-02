// A2-05 : essais de sync-stable.mjs (étape 2 de la transition, en proposition). Toute écriture se fait dans un dossier temporaire du système ;
// les documents réels sont comparés par SHA-256 avant et après. Écrit seulement docs/rapports/etape2-A2-05-sync-stable-essais.md.
// Usage : node essais-sync-stable.mjs <racine> [<commit poussé à marquer>]
import { readFileSync, writeFileSync, mkdtempSync, rmSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import * as S from './sync-stable.mjs';
import { verifierEmpreintes } from './empreintes-lot3.mjs';

const root = process.argv[2]; const COMMIT = process.argv[3] ?? '78031638c0f81dca1b167e3f57f5a891767fc4cb';
if (!root) throw new Error('argument attendu : racine du dépôt');
const LF = '\n'; const sha = (s) => createHash('sha256').update(s).digest('hex');
const lire = (p) => readFileSync(join(root, p), 'utf8'); const sansCR = (t) => t.replace(/\r\n/g, LF);
const git = (...a) => spawnSync('git', a, { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
const REELS = [...S.PILOTAGE, 'docs/rapports/etape2-A2-05-bilan-volet2.md'];
const empreintesReelles = () => REELS.map((p) => sha(readFileSync(join(root, p))));
const avantReels = empreintesReelles();
const res = []; let echecs = 0;
const ok = (id, groupe, objet, cond, detail = '—') => { res.push('| ' + id + ' | ' + groupe + ' | ' + objet + ' | ' + (cond ? 'conforme' : '**NON CONFORME**') + ' | ' + detail.replace(/\|/g, '\\|') + ' |'); if (!cond) echecs++; };
const refus = (id, objet, f, attendu) => { let m = null; try { f(); } catch (x) { if (!(x instanceof S.Refus)) { ok(id, 'refus', objet, false, 'erreur inattendue : ' + x.message); return; } m = x.message; } ok(id, 'refus', objet, m !== null && m.includes(attendu), m === null ? 'aucun refus' : 'refus : « ' + m + ' »'); };

const v = S.calculerEtat(root); const bloc = S.blocEtat(v);
const E = lire('ETAT-ACTUEL.md'), R = lire('ROADMAP.md'), B = lire('docs/rapports/etape2-A2-05-bilan-volet2.md');
const auCommit = git('show', COMMIT + ':ETAT-ACTUEL.md').stdout; const court = COMMIT.slice(0, 7);
const lignesBloc = bloc.split(LF).length;
ok('V1', 'valeurs', 'valeurs calculées', v.arbitres === 148 && v.restants === 229 && v.blocBArbitres === 79 && v.blocB === 148 && v.corrections === 185 && v.entry === 165 && v.libre === 'V1-11' && v.empreintes === 27,
  v.arbitres + '/377, ' + v.restants + ' restants ; bloc B ' + v.blocBArbitres + '/' + v.blocB + ' ; ' + v.corrections + ' corrections, ' + v.entry + ' ENTRY ; ' + v.libre + ' ; ' + v.empreintes + ' empreintes');

// --- Non-régression : rien hors des marqueurs, rien hors des cellules visées ---
for (const [nom, t] of [['ETAT-ACTUEL.md', E], ['ROADMAP.md', R]]) {
  const ins = S.insererMarqueurs(t, bloc, S.ANCRE); const { debut, fin } = S.localiser(ins);
  const l = sansCR(ins).split(LF); const sans = [...l.slice(0, debut), ...l.slice(fin + 2)].join(LF);
  ok('N1', 'non-régression', 'insertion dans `' + nom + '` : texte hors bloc identique', sans === sansCR(t) && (ins.includes('\r\n') === t.includes('\r\n')), lignesBloc + ' lignes de bloc et 1 ligne vide insérées ; fins de ligne conservées');
}
const mc = S.marquerCommit(E, auCommit, court);
{ const a = sansCR(E).split(LF), b = sansCR(mc.texte).split(LF); const diff = a.map((x, i) => (x !== b[i] ? i : -1)).filter((i) => i >= 0);
  const seulesCellules = diff.every((i) => a[i].endsWith(' | non committé |') && b[i] === a[i].slice(0, -' | non committé |'.length) + ' | `' + court + '` |');
  const restants = b.filter((x) => x.endsWith(' | non committé |')).length;
  ok('N2', 'non-régression', 'marquage `' + court + '` : seules les dernières cellules visées changent', a.length === b.length && diff.length === mc.visees && seulesCellules, diff.length + ' lignes changées sur ' + a.length + ' ; ' + mc.visees + ' visées ; ' + restants + ' ligne(s) postérieure(s) au commit laissée(s) « non committé »'); }
const tmp = mkdtempSync(join(tmpdir(), 'essais-sync-stable-'));
const copie = () => { const d = mkdtempSync(join(tmp, 'd-')); for (const p of S.PILOTAGE) copyFileSync(join(root, p), join(d, p)); return d; };
try {
  const d = copie(); const plan = S.planifier(root, { commit: COMMIT, docs: d }); S.appliquer(plan, plan.empreinte);
  const e2 = readFileSync(join(d, 'ETAT-ACTUEL.md'), 'utf8'), r2 = readFileSync(join(d, 'ROADMAP.md'), 'utf8');
  { const { debut, fin } = S.localiser(e2); const l = sansCR(e2).split(LF); const sans = [...l.slice(0, debut), ...l.slice(fin + 2)].join(LF);
    ok('N3', 'non-régression', 'plan complet appliqué sur copie de `ETAT-ACTUEL.md` : bloc inséré + ' + mc.visees + ' cellules, rien d\'autre', sans === sansCR(mc.texte), 'texte hors bloc identique au seul marquage'); }
  { const { debut, fin } = S.localiser(r2); const l = sansCR(r2).split(LF); ok('N3', 'non-régression', 'plan complet appliqué sur copie de `ROADMAP.md` : bloc inséré, rien d\'autre', [...l.slice(0, debut), ...l.slice(fin + 2)].join(LF) === sansCR(R), 'aucune ligne de journal dans ROADMAP.md'); }
  // --- Idempotence ---
  const plan2 = S.planifier(root, { commit: COMMIT, docs: d });
  ok('I1', 'idempotence', 'second plan sur les copies synchronisées : aucune différence', S.PILOTAGE.every((p) => plan2.sorties[p].apres === plan2.sorties[p].avant), plan2.journal.join(' ; '));
  const avantSecond = S.PILOTAGE.map((p) => sha(readFileSync(join(d, p)))); S.appliquer(plan2, plan2.empreinte);
  ok('I1', 'idempotence', 'seconde application : aucun octet écrit', S.PILOTAGE.every((p, i) => sha(readFileSync(join(d, p))) === avantSecond[i]), 'empreintes inchangées');
  ok('I2', 'idempotence', 'remplacement par le même bloc : identique', S.remplacerBloc(e2, bloc) === e2);
  const vAutre = { ...v, proposes: 3 }; const e3 = S.remplacerBloc(e2, S.blocEtat(vAutre)); { const a = sansCR(e2).split(LF), b = sansCR(e3).split(LF); const { debut, fin } = S.localiser(e2);
    ok('I3', 'non-régression', 'valeurs changées : seules les lignes du bloc changent', a.length === b.length && a.every((x, i) => x === b[i] || (i >= debut && i <= fin)), a.filter((x, i) => x !== b[i]).length + ' lignes changées, toutes dans le bloc'); }
  const mc2 = S.marquerCommit(mc.texte, auCommit, court);
  ok('I4', 'idempotence', 'second marquage `' + court + '`', mc2.marquees === 0 && mc2.deja === mc.visees && mc2.texte === mc.texte, mc2.marquees + ' marquées, ' + mc2.deja + ' déjà marquées');
  const ligne = '| 2026-10-18 | 2 · A2-05 | essai | non committé |'; const j1 = S.ajouterLigneJournal(E, ligne);
  ok('I5', 'idempotence', 'ligne de journal ajoutée une fois, puis rien', S.ajouterLigneJournal(j1, ligne) === j1 && sansCR(j1).split(LF).length === sansCR(E).split(LF).length + 1);
  const n = Math.max(...[...sansCR(B).matchAll(/^### 8\.(\d+) /gm)].map((r) => +r[1])) + 1; const b1 = S.ajouterSectionBilan(B, n, 'Essai (2026-10-18)', 'Corps.');
  ok('I6', 'idempotence', 'sous-section §8.' + n + ' ajoutée une fois, puis rien', S.ajouterSectionBilan(b1, n, 'Essai (2026-10-18)', 'Corps.') === b1 && b1.startsWith(B.replace(/\s*$/, '')));

  // --- Refus ---
  const ins = S.insererMarqueurs(E, bloc, S.ANCRE); const l = sansCR(ins).split(LF); const { debut, fin } = S.localiser(ins);
  const sans = (i) => l.filter((_, k) => k !== i).join(LF); const avec = (i, x) => [...l.slice(0, i), x, ...l.slice(i)].join(LF);
  refus('R1', 'marqueur de début absent', () => S.localiser(sans(debut)), 'début absent');
  refus('R2', 'marqueur de fin absent', () => S.localiser(sans(fin)), 'fin absent');
  refus('R3', 'marqueur de début dupliqué', () => S.localiser(avec(0, l[debut])), 'début dupliqué');
  refus('R4', 'marqueur de fin dupliqué', () => S.localiser(avec(l.length, l[fin])), 'fin dupliqué');
  refus('R5', 'marqueurs inversés', () => { const x = [...l]; [x[debut], x[fin]] = [x[fin], x[debut]]; S.localiser(x.join(LF)); }, 'fin avant');
  refus('R6', 'bloc retouché à la main (148 → 149)', () => { const x = [...l]; x[debut + 1] = x[debut + 1].replace('148 sens', '149 sens'); S.localiser(x.join(LF)); }, 'modifié à la main');
  refus('R7', 'marqueur de début mal formé', () => { const x = [...l]; x[debut] = x[debut].replace(/empreinte=[0-9a-f]+/, 'empreinte=xyz'); S.localiser(x.join(LF)); }, 'mal formé');
  refus('R8', 'marqueur cité hors ligne', () => S.localiser(avec(0, 'texte <!-- a2-05:etat:debut cité --> texte')), 'mal formé ou hors ligne');
  refus('R9', 'insertion alors que les marqueurs existent', () => S.insererMarqueurs(ins, bloc, S.ANCRE), 'déjà présents');
  refus('R10', 'ligne d\'ancrage absente', () => S.insererMarqueurs(E.replace(S.ANCRE, '- **Fini.**'), bloc, S.ANCRE), '0 occurrence');
  refus('R11', 'ligne d\'ancrage dupliquée', () => S.insererMarqueurs(E + LF + S.ANCRE + ' copie', bloc, S.ANCRE), '2 occurrence');
  refus('R12', 'rubrique incohérente (148 → 149 dans le texte rédigé)', () => S.verifierCoherence(E.replace(/\*\*148(\s+)candidats arbitrés/, '**149$1candidats arbitrés'), v), 'incohérente');
  refus('R13', 'rubrique de corrections incohérente (185 → 186)', () => S.verifierCoherence(E.replace('**185 corrections, dans 165 ENTRY**', '**186 corrections, dans 165 ENTRY**'), v), 'incohérente');
  { const d2 = copie(); writeFileSync(join(d2, 'ETAT-ACTUEL.md'), S.insererMarqueurs(E, bloc, S.ANCRE)); refus('R14', 'marqueurs dans un seul des deux documents', () => S.planifier(root, { docs: d2 }), 'un seul'); }
  { const d2 = copie(); const autre = S.blocEtat({ ...v, proposes: 9 }); writeFileSync(join(d2, 'ETAT-ACTUEL.md'), S.insererMarqueurs(E, bloc, S.ANCRE)); writeFileSync(join(d2, 'ROADMAP.md'), S.insererMarqueurs(R, autre, S.ANCRE)); refus('R15', 'blocs divergents entre les deux documents', () => S.planifier(root, { docs: d2 }), 'blocs différents'); }
  { const d2 = copie(); const p = S.planifier(root, { commit: COMMIT, docs: d2 }); const av = S.PILOTAGE.map((x) => sha(readFileSync(join(d2, x))));
    refus('R16', 'application avec une empreinte qui n\'est pas celle de l\'aperçu', () => S.appliquer(p, '0000000000000000'), 'empreinte du plan');
    writeFileSync(join(d2, 'ROADMAP.md'), readFileSync(join(d2, 'ROADMAP.md'), 'utf8') + 'x');
    refus('R17', 'document modifié entre l\'aperçu et l\'application', () => S.appliquer(p, p.empreinte), 'modifié depuis');
    ok('R16-17', 'refus', 'aucune écriture après refus', sha(readFileSync(join(d2, 'ETAT-ACTUEL.md'))) === av[0], 'ETAT-ACTUEL.md inchangé'); }
  refus('R18', 'commit inconnu', () => S.planifier(root, { commit: 'deadbeefdeadbeef', docs: copie() }), 'commit inconnu');
  refus('R19', 'commit sans ligne « non committé » (`558f150`)', () => S.planifier(root, { commit: '558f150', docs: copie() }), 'aucune ligne');
  refus('R20', 'ligne du commit retouchée dans le journal courant', () => { const t = sansCR(E).split(LF); const i = t.findIndex((x) => x.endsWith(' | non committé |')); t[i] = t[i].replace('| 2 · A2-05 |', '| 2 · A2-05 (retouché) |'); S.marquerCommit(t.join(LF), auCommit, court); }, 'introuvable');
  refus('R21', 'ligne du commit dupliquée dans le journal courant', () => { const t = sansCR(E).split(LF); const i = t.findIndex((x) => x.endsWith(' | non committé |')); t.splice(i, 0, t[i]); S.marquerCommit(t.join(LF), auCommit, court); }, 'dupliquée');
  refus('R22', 'ligne de journal mal formée', () => S.ajouterLigneJournal(E, '| 18/10 | essai |'), 'mal formée');
  refus('R23', 'sous-section du bilan hors séquence', () => S.ajouterSectionBilan(B, n + 1, 'Essai', 'Corps.'), 'dernière sous-section');
  refus('R24', 'sous-section existante, contenu différent', () => S.ajouterSectionBilan(b1, n, 'Essai (2026-10-18)', 'Autre corps.'), 'existe déjà');
} finally { rmSync(tmp, { recursive: true, force: true }); }

// --- Protection du dépôt réel ---
ok('P1', 'protection', 'documents réels inchangés par les essais', empreintesReelles().every((h, i) => h === avantReels[i]), REELS.map((p) => '`' + p + '`').join(', '));
ok('P2', 'protection', 'rapports arbitrés', verifierEmpreintes(root).controles === 27, '27 empreintes identiques');
const sens = git('status', '--porcelain', '--', 'data', 'reconstruction', 'tools', 'tests', 'src', 'js', 'css', 'public', 'docs/conception').stdout.trim();
ok('P3', 'protection', 'données, normes, registres, snapshots, outils, tests, application', !sens, sens || 'aucun changement');

const P = ['# Étape 2 · A2-05 — essais de la synchronisation stable par marqueurs', '', '**Date** : 2026-10-18',
  "**Statut** : **essais d'une proposition, non activée.** Écrit par `a2-05-travail/essais-sync-stable.mjs` ; toute écriture a lieu dans un dossier temporaire du système, sur des copies de `ETAT-ACTUEL.md` et `ROADMAP.md` ; les documents réels sont comparés par SHA-256 avant et après. Commit marqué dans les essais : `" + COMMIT + "`.", '',
  '**Résultat** : ' + (echecs ? '**' + echecs + ' essai(s) non conforme(s).**' : '**' + res.length + ' essais, tous conformes.**'), '',
  '| N° | Groupe | Objet | Résultat | Détail |', '|---|---|---|---|---|', ...res];
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-sync-stable-essais.md'), P.join(LF) + LF);
console.log('essais sync-stable : ' + res.length + ' essais, ' + (echecs ? echecs + ' non conforme(s)' : 'tous conformes'));
if (echecs) process.exitCode = 1;
