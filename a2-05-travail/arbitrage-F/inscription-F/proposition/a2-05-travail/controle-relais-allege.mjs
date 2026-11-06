// A2-05 : contrôles du relais allégé candidat (étape 3 du plan de transition ; EN PROPOSITION, non mis en service).
// Usage : node a2-05-travail/controle-relais-allege.mjs <racine du dépôt>
// Lecture seule : n'écrit aucun fichier ; imprime les résultats ; code 0 si tous les contrôles sont conformes, 1 sinon.
// Contrôles : C1 taille ; C2 chemins et références ; C3 aucun décompte calculé recopié ; C4 informations obligatoires ;
// C5 cohérence avec ETAT-ACTUEL.md, ROADMAP.md, git et le registre des tranches ; C6 normes listées ; C7 destination de
// chaque section de l'ancien relais ; C8 essai de reprise simulée ; C9 empreintes, couverture et zones protégées ;
// C10 versions finales des quatre documents (a2-05-travail/versions-finales/) ; C8b essai de reprise rejoué sur ces versions ;
// C11 (mode --apres-application) fins de ligne, §8.66 réel, références du relais en service.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash as hashRef } from 'node:crypto';
import { calculerEtat, localiser, PILOTAGE } from './sync-stable.mjs';
import { rapportsArbitres, MANIFESTE, TRANCHE, anomaliesTranches } from './empreintes-lot3.mjs';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const CAND = 'a2-05-travail/reprise-A2-05-allegee-candidat.md', ANCIEN = 'docs/relecture/reprise-A2-05.md';
const VF = 'a2-05-travail/versions-finales', BILAN = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const lire = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const git = (...a) => { const r = spawnSync('git', a, { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: (r.stdout ?? '').trim() }; };
// Mode --apres-application (état mis en service, explicite) : l'état de départ est lu dans la sauvegarde vérifiée versions-finales/depart/,
// et C9b, C9c et C10a exigent l'état écrit au lieu de l'état d'avant ; sans ce mode, le contrôle décrit l'état d'avant application.
const APRES = process.argv.includes('--apres-application');
// --strict : à la clôture d'un checkpoint, exige que tout soit poussé et que rien ne suive la référence déclarée, sinon le fichier de références lui-même
const STRICT = process.argv.includes('--strict'), REF = 'a2-05-travail/references-git.json';
const dep = (p) => lire(APRES ? VF + '/depart/' + p : p);
// Versions figées 2 (adoption d'A10) : le relais vérifié est la version finale 2 ; le candidat et la version 1 restent les preuves de l'étape 3, contrôlées en C10b
const VF2 = 'a2-05-travail/versions-finales-2';
const c = lire(VF2 + '/' + ANCIEN), c1 = lire(CAND), ancien = dep(ANCIEN), etat = lire('ETAT-ACTUEL.md');
// Statut d'E5 : la vérité vient de `docs/conception/` (A10 présent, au sommaire, validé à une date), jamais de la prose ; relais et « Étape en cours » doivent dire la même chose, à la même date
const A10 = 'docs/conception/addendum-A10-interrogatif.md';
const dateA10 = !existsSync(join(root, A10)) ? 'non' : /^\| A10 \| `addendum-A10-interrogatif\.md` \|/m.test(lire('docs/conception/00-sommaire.md')) ? (lire(A10).match(/^\*\*Statut\*\* : 🔒 validé le (\d{4}-\d{2}-\d{2}) /m) ?? [])[1] ?? '?' : '?';
const statutE5 = (t) => (t.match(/\*\*Addendum A10 adopté et installé le (\d{4}-\d{2}-\d{2})\*\*/) ?? [])[1] ?? (/ni adoptée ni\s+normative/.test(t) ? 'non' : '?');
// Un relais qui dirait à la fois « adopté » et « ni adoptée ni normative » se contredit : '?' (écart)
const statutRelais = (t) => { const d = (t.match(/\*\*Adopté\*\* : l'addendum A10 [^\n]*installé le (\d{4}-\d{2}-\d{2})/) ?? [])[1], non = /ni adoptée ni\s+normative/.test(t); return d ? (non ? '?' : d) : (/E5[^\n]*ni adoptée ni normative/.test(t) ? 'non' : '?'); };
const res = []; const ok = (id, nom, cond, detail = '') => res.push({ id, nom, ok: !!cond, detail });

// C1 · taille
const octets = Buffer.byteLength(c, 'utf8'), octetsAncien = Buffer.byteLength(ancien, 'utf8');
ok('C1', 'taille du candidat', octets < 12000, octets + ' octets (relais en service : ' + octetsAncien + ', soit ' + (100 * octets / octetsAncien).toFixed(1) + ' %)');

// C2 · chemins et références
const chemins = [...new Set([...c.matchAll(/`([A-Za-z0-9_.\-]+(?:\/[A-Za-z0-9_.\-…*]+)+\/?|[A-Z][A-Z\-]+\.md)`/g)].map((m) => m[1]))];
const absents = [];
for (const p of chemins) {
  if (p.includes('…')) { const [dir, pre] = [p.slice(0, p.lastIndexOf('/')), p.slice(p.lastIndexOf('/') + 1).split('…')[0]]; if (!readdirSync(join(root, dir)).some((f) => f.startsWith(pre))) absents.push(p); continue; }
  if (p.includes('*')) { const dir = p.slice(0, p.lastIndexOf('/')); if (!existsSync(join(root, dir))) absents.push(p); continue; }
  if (!existsSync(join(root, p))) absents.push(p);
}
ok('C2a', 'chemins cités présents dans le dépôt', !absents.length, chemins.length + ' chemins' + (absents.length ? ' ; absents : ' + absents.join(', ') : ''));
const snaps = ['A2-L3-v1', 'A2-ST-v1', 'A2-DIM-v1', 'A2-REL-v1.1', 'A2-LING-v1', 'A2-GLOBAL-v1'].filter((s) => !existsSync(join(root, 'docs/conception/a2', s + '.md')));
ok('C2b', 'snapshots cités présents', !snaps.length, snaps.join(', ') || 'six présents');
const anc = git('show', '7803163:' + ANCIEN);
ok('C2c', 'ancien relais retrouvable dans git (7803163)', anc.code === 0 && anc.out.length > 200000, 'code ' + anc.code + ', ' + Buffer.byteLength(anc.out) + ' octets');
const bilan = lire('docs/rapports/etape2-A2-05-bilan-volet2.md');
const sect = ['8.42', '8.60', '8.61'].filter((n) => !new RegExp('^### ' + n.replace('.', '\\.') + ' ', 'm').test(bilan));
const b9 = lire('docs/rapports/etape2-A2-05-volet1-lot3-B9.md'), per = lire('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md'), cl = lire('CLAUDE.md');
ok('C2d', 'sections citées présentes et pertinentes', !sect.length && /^## 2\. Méthode/m.test(b9) && /anciens exemples/.test(b9) && /^## 10\. Méthode/m.test(per) && /^## 6\. Liste exhaustive/m.test(per)
  && /rapprochements mécaniques/.test(bilan.slice(bilan.indexOf('### 8.42'), bilan.indexOf('### 8.43'))) && /Relecture intégrale maintenue/.test(bilan.slice(bilan.indexOf('### 8.60'), bilan.indexOf('### 8.61')))
  && /\*\*bloquant\*\*/.test(bilan.slice(bilan.indexOf('### 8.61'), bilan.indexOf('### 8.62'))) && /^## 5\. Où l'on en est/m.test(cl) && /la fiche source décide/.test(cl),
  'bilan §8.42, §8.60, §8.61 ; B9 §2 ; périmètre §6 et §10 ; CLAUDE.md §4 et §5');

// C3 · aucun décompte calculé recopié (le bloc a2-05:etat fait foi)
const v = calculerEtat(root);
const recopies = [v.arbitres + ' sens arbitrés', v.restants + ' rest', v.blocBArbitres + ' sur ' + v.blocB, v.corrections + ' corrections', v.entry + ' ENTRY', v.libre].filter((s) => c.includes(s));
ok('C3', 'aucun décompte calculé recopié', !recopies.length, recopies.join(', ') || 'renvoi au bloc a2-05:etat');

// C4 · informations obligatoires (liste de l'arbitrage du 2026-10-20, §2)
const exig = [
  ['1 · branche', /`ocha-v2`/], ['1 · dernier commit confirmé', /78031638c0f81dca1b167e3f57f5a891767fc4cb/], ['1 · étape', /A2-05/],
  ['1 · lots, blocs, tranches', /lot 3 en cours[\s\S]*bloc B ouvert[\s\S]*tranches/], ['1 · décomptes et numéro libre', /prochain numéro libre/],
  ['1 · corrections retenues / appliquées', /aucune appliquée/], ['2 · arbitrages et motivations', /Arbitrages et leurs motivations/],
  ['2 · proposé / validé / préparé ; statut d\'E5 celui de docs/conception/', { test: (t) => /\*\*Préparé ou retenu en principe, non mis en œuvre\*\*[^\n]*\*\*Proposé, non adopté\*\*/.test(t) && dateA10 !== '?' && statutRelais(t) === dateA10 }], ['3 · gouvernance', /`CLAUDE\.md`, `REGLES-CONSTRUCTION\.md`/],
  ['3 · A2-REL-v1.1', /A2-REL-v1\.1/], ['3 · addenda (A10 compris s\'il est adopté)', { test: (t) => /Addenda validés/.test(t) && (dateA10 === 'non' || /^\| Addenda validés \|[^\n]*`addendum-A10-…`/m.test(t)) }], ['3 · priorité des normes', /ne fait pas foi[\s\S]*l'emportent/],
  ['4 · chantiers fermés (E5 seulement tant qu\'A10 n\'est pas adopté)', { test: (t) => /QC-1, QC-2, HP-1 à HP-4, G1 à G7[\s\S]*bloc F[\s\S]*relations/.test(t) && (dateA10 === 'non' ? /bloc F et E5/.test(t) : !/Fermés jusqu'à décision explicite\*\*[^\n]*E5/.test(t)) }], ['4 · corrections non appliquées', /on n'applique aucune correction/],
  ['4 · aucune autorisation implicite', /Aucune autorisation implicite/], ['4 · séparation des opérations', /préparer ; auditer[^\n]*arbitrer ; indexer ; committer ; pousser/],
  ['5 · renvoi à la rubrique qui fait foi (D2)', /## 6\. Prochaine action\n\n\*\*Fait foi\*\* : la rubrique « Prochaine action » d'`ETAT-ACTUEL\.md`/], ['5 · aucune tâche datée (D2)', /aucune copie/],
  ['2 · quatre états (D2)', /\*\*proposé\*\*[^\n]*\*\*arbitré\*\*[^\n]*\*\*appliqué\*\*[^\n]*\*\*committé \/ poussé\*\*[^\n]*/], ['2 · aucun statut normatif nouveau (D2)', /ne crée aucun statut normatif nouveau/],
  ['3 · doctrines renvoyées au bilan (D4)', /bilan du volet 2, §8\.66/], ['3 · absence d\'A2-GLOBAL signalée (D5)', /L'export ne contient pas `A2-GLOBAL-v1`/], ['6 · fiche lue en entier', /en entier[^\n]*anciens exemples/], ['6 · connaissance externe', /connaissance externe/],
  ['6 · chaque champ', /chaque champ un par un/], ['6 · conformes motivés', /motiver un conforme comme un écart/], ['6 · comparables', /ne jugent pas/],
  ['6 · vérifié / rapporté', /vérifié\*\* sur un fichier lu/], ['6 · avis distinct des autorisations', /avis favorable n'en vaut aucun/],
];
const manq = exig.filter(([, re]) => !re.test(c)).map(([n]) => n);
ok('C4', 'informations obligatoires présentes', !manq.length, exig.length + ' exigences' + (manq.length ? ' ; manquent : ' + manq.join(' ; ') : ''));

// C5 · cohérence
const head = git('rev-parse', 'HEAD').out, orig = git('rev-parse', 'origin/ocha-v2').out;
const refs = existsSync(join(root, REF)) ? JSON.parse(lire(REF)) : {}; const refHist = refs.historique?.commit ?? '', courante = refs.checkpoint?.commit ?? refHist, ck = refs.checkpoint;
const ancetre = (a, b) => /^[0-9a-f]{40}$/.test(a) && spawnSync('git', ['merge-base', '--is-ancestor', a, b], { cwd: root }).status === 0;
// Une référence déclarée doit porter le sceau de cloture-checkpoint.mjs : une écriture à la main fait tomber C5a
const sceauOk = !ck || (ck.verification?.head === ck.commit && ck.verification?.distant_reel === ck.commit && ck.verification?.sceau === hashRef('sha256').update(['checkpoint', ck.commit, ck.commit, 'strict'].join('|')).digest('hex'));
const enAvance = git('rev-list', '--count', courante + '..HEAD').out, nonPousses = git('rev-list', '--count', orig + '..HEAD').out, suite = git('diff', '--name-only', courante, head).out.split('\n').filter(Boolean);
ok('C5a', 'référence historique citée par le candidat ; référence déclarée, scellée, ancêtre de HEAD et d\'origin/ocha-v2' + (STRICT ? ' ; tout est poussé, rien après la référence' : ' (ne prouve pas une clôture Git : seul cloture-checkpoint.mjs --verifier la constate)'), refHist && c.includes(refHist) && ancetre(refHist, courante) && ancetre(courante, head) && ancetre(courante, orig) && sceauOk && (!STRICT || (head === orig && suite.every((p) => p === REF))), 'déclarée ' + courante.slice(0, 7) + ' ; HEAD ' + head.slice(0, 7) + ', en avance de ' + enAvance + ' ; non poussés : ' + nonPousses);
const blocs = PILOTAGE.map((p) => localiser(lire(p)).corps);
ok('C5b', 'bloc a2-05:etat identique dans les deux documents', blocs[0] === blocs[1], 'empreinte ' + etat.match(/a2-05:etat:debut empreinte=([0-9a-f]+)/)[1]);
const reg = JSON.parse(lire('a2-05-travail/registre-tranches.json'));
// C5c : tranche F suspendue tant que son périmètre opérationnel n'est pas accepté ; ensuite planifiée en une seule livraison F, A10 étant adopté (inscription du 2026-11-03)
const PERF = 'docs/rapports/etape2-A2-05-volet1-lot3-F-perimetre-operationnel.md', trF = reg.tranches.find((t) => t.id === 'F'), tPerF = existsSync(join(root, PERF)) ? lire(PERF) : '';
const accF = /^\*\*Statut\*\* : \*\*périmètre opérationnel accepté le \d{4}-\d{2}-\d{2} \(§0\)\.\*\*/m.test(tPerF) && /^## 0\. Arbitrage$/m.test(tPerF);
ok('C5c', 'aucune tranche ouverte ; tranche F suspendue avant l\'acceptation de son périmètre opérationnel, planifiée en une seule livraison F après (A10 adopté)', reg.tranches.every((t) => ['planifiée', 'suspendue'].includes(t.statut)) && (trF?.statut === 'suspendue' ? !accF : trF?.statut === 'planifiée' && accF && trF.livraison === 'F' && trF.livraisons.join() === 'F1,F2' && /^\d{4}-/.test(dateA10)), reg.tranches.map((t) => t.id + ' ' + t.statut).join(', ') + ' ; périmètre de F ' + (accF ? 'accepté' : 'non accepté'));
const enCours = etat.slice(etat.indexOf('## Étape en cours'), etat.indexOf('**Tâche précédente, terminée'));
const fermes = ['QC-1', 'QC-2', 'HP-1 à HP-4', 'G1', 'bloc F', 'E5'].filter((s) => !enCours.includes(s));
ok('C5d', 'chantiers fermés du candidat présents dans « Étape en cours »', !fermes.length, fermes.join(', ') || 'six présents');
ok('C5e', 'état de la transition cohérent avec ETAT-ACTUEL.md ; statut d\'E5 cohérent avec `docs/conception/`', /checkpoint B est committé et poussé/.test(enCours) && /acceptée et appliquée le 2026-10-18/.test(enCours) && /3d67594/.test(enCours) && dateA10 !== '?' && statutE5(enCours) === dateA10, 'checkpoint B ; étape 2 ; 3d67594 ; E5 : ' + statutE5(enCours) + ' ; A10 : ' + dateA10);
const pa = (t) => (t.match(/^- \*\*Prochaine action\.\*\*[^\n]*/m) ?? [''])[0];
ok('C5f', 'rubrique « Prochaine action » (qui fait foi) identique dans les deux documents : documents, autorisation, interdits', pa(etat) === pa(lire('ROADMAP.md')) && /\.md`/.test(pa(etat)) && /autorisation/.test(pa(etat)) && /Aucun `git add`, commit ni push/.test(pa(etat)) && /T1/.test(pa(etat)), pa(etat).slice(0, 90) + '…');

// C6 · normes listées = normes du dépôt
const addenda = readdirSync(join(root, 'docs/conception')).filter((f) => /^addendum-A\d/.test(f)).map((f) => f.match(/^addendum-(A\d+)/)[1]);
const snapsDepot = readdirSync(join(root, 'docs/conception/a2')).filter((f) => f !== 'README.md').map((f) => f.replace(/\.md$/, ''));
const regs = readdirSync(join(root, 'data/registries')).length;
ok('C6', 'snapshots et addenda du dépôt tous couverts', snapsDepot.every((s) => c.includes('`' + s + '`')) && addenda.map((a) => +a.slice(1)).sort((x, y) => x - y).join() === '1,2,3,4,5,6,7,8,9,10' && regs === 8,
  'snapshots : ' + snapsDepot.join(', ') + ' ; addenda : ' + addenda.join(', ') + ' ; ' + regs + ' registres');

// C7 · chaque section de l'ancien relais a une destination qui existe et contient son repère
const audit = lire('docs/rapports/etape2-A2-05-audit-null.md'), inv = lire('a2-05-travail/INVENTAIRE-SCRIPTS.md');
const sections = [...ancien.matchAll(/^##+ (.+)$/gm)].map((m) => m[1]);
const DEST = [
  [/^A2-05 · Relais de reprise$/, 'titre : conservé', () => /^# A2-05 · Relais de reprise$/m.test(c)],
  [/^1\. État du dépôt$/, 'état courant : candidat §2', () => /## 2\. État courant/.test(c)],
  [/^1\.[012] /, 'constats datés : journal d\'ETAT-ACTUEL.md, bilan §8, git', () => /\| 2026-10-12 \| 2 · A2-05 \|/.test(etat) && anc.code === 0],
  [/^2\. Règles de contrôle/, 'candidat §1, §5 et §7', () => /## 1\. Rôles et accords/.test(c) && /## 7\. Produire un export/.test(c)],
  [/^3\. Structure validée/, 'candidat §2 ; détail : « Terminé et arbitré » d\'ETAT-ACTUEL.md, bilan §3 et §4', () => /Terminé et arbitré/.test(etat) && /^## 3\. Volet 1/m.test(bilan) && /^## 4\. Volet 3/m.test(bilan)],
  [/^4\. Volet 2 : cumul/, 'audit des null (tranches) et bilan §1', () => /^## 1\. Bilan du volet 2/m.test(bilan) && /^## T4\.1 /m.test(audit)],
  [/^5\. Corrections retenues/, 'bilan §2 (les dix) et §5 (procédure, D1614, lot véhicule)', () => /^## 2\. Liste fermée des dix/m.test(bilan) && /lot véhicule sans ENTRY propre/.test(bilan) && /D1614/.test(bilan)],
  [/^5 bis\. /, 'bilan §8 (V1-n, V2-n)', () => /^## 8\. Liste globale des corrections/m.test(bilan)],
  [/^6\. Arbitrages de fond/, 'candidat §4.8 (principes) ; bilan §8.66 de la version finale (liste mot pour mot, avec provenance) ; audit des null (fiches)', () => /Doctrines du volet 2/.test(c) && /§8\.66/.test(c) && existsSync(join(root, VF, BILAN)) && /^### 8\.66 /m.test(lire(VF + '/' + BILAN)) && /groupe_collectif/.test(audit)],
  [/^6 bis\. /, 'bilan §3.2 ; lot 1 du volet 1, arbitré (cohérence rétroactive)', () => /^### 3\.2 Les points de contrôle transversaux/m.test(bilan) && existsSync(join(root, 'docs/rapports/etape2-A2-05-coherence-retroactive.md'))],
  [/^7\. Les 94 /, 'audit des null, tranches 2 à 7 (closes)', () => /^## T2\.1 /m.test(audit)],
  [/^(action générale|propriété générale|aucune catégorie|autre formulation)/, 'audit des null, tranches correspondantes (closes)', () => /^## T3\.1 /m.test(audit)],
  [/^8( bis| ter| quater| quinquies)?\. Périmètre proposé/, 'audit des null, tranches 2 à 7 (périmètres arbitrés, clos)', () => /^## T2\.2 Composition/m.test(audit)],
  [/^9\. Scripts/, 'a2-05-travail/INVENTAIRE-SCRIPTS.md', () => /relais-reprise\.mjs/.test(inv)],
  [/^10\. Prochaine action/, 'obsolète (2026-10-08) ; candidat §6 et ETAT-ACTUEL.md', () => /## 6\. Prochaine action/.test(c)],
  [/^11\. Anomalie technique/, 'règle : candidat §5 ; constat détaillé : ancien relais dans git', () => /Commandes de contrôle/.test(c) && anc.out.includes('**Code de sortie** : 255.')],
];
const sansDest = [], detail7 = [];
for (const s of sections) { const d = DEST.find(([re]) => re.test(s)); if (!d || !d[2]()) sansDest.push(s); else detail7.push(s.slice(0, 40) + ' → ' + d[1]); }
ok('C7', 'sections de l\'ancien relais : destination vérifiée', !sansDest.length, sections.length + ' sections' + (sansDest.length ? ' ; sans destination : ' + sansDest.join(' | ') : ''));

// C8 · essai de reprise simulée : chaque réponse est tirée du candidat ou d'un document qu'il désigne, puis comparée à la vérité du dépôt
const corpsE = () => localiser(lire('ETAT-ACTUEL.md')).corps;
const Q = [
  ['Q1 Quel est le dernier checkpoint déclaré ?', () => courante, () => (ancetre(courante, orig) ? courante : orig)],
  ['Q2 Lot 3 : sens arbitrés / total (renvoi au bloc suivi)', () => (c.includes('a2-05:etat') ? corpsE().match(/\*\*Lot 3\*\* : (\d+) sens arbitrés sur (\d+)/).slice(1).join('/') : null), () => v.arbitres + '/' + v.total],
  ['Q3 Bloc B (ROADMAP.md)', () => localiser(lire('ROADMAP.md')).corps.match(/\*\*Bloc B\*\* : (\d+) sur (\d+)/).slice(1).join('/'), () => v.blocBArbitres + '/' + v.blocB],
  ['Q4 Corrections retenues / ENTRY / appliquées', () => corpsE().match(/: (\d+), dans (\d+) ENTRY/).slice(1).join('/') + (c.includes('aucune appliquée') ? '/0' : '/?'), () => v.corrections + '/' + v.entry + '/0'],
  ['Q5 Prochain numéro libre', () => corpsE().match(/prochain numéro libre : (V1-\d+)/)[1], () => v.libre],
  ['Q6 Version active des relations', () => c.match(/\*\*`(A2-REL-v[\d.]+)`\*\*/)?.[1], () => (lire('docs/conception/a2/README.md').match(/version active des\s+relations est `(A2-REL-v[\d.]+)`/) ?? [])[1]],
  ['Q7 E5 est-il normatif ?', () => { const s = statutRelais(c); return s === 'non' ? 'non' : s === '?' ? 'relais muet' : 'oui'; }, () => (dateA10 === 'non' ? 'non' : dateA10 === '?' ? 'A10 incohérent' : 'oui')],
  ['Q8 Un périmètre de T1 est-il accepté ?', () => (/Aucun périmètre de T1 n'est accepté/.test(c) ? 'non' : 'oui'), () => (reg.tranches[0].statut === 'planifiée' ? 'non' : 'oui')],
  ['Q9 Un avis favorable autorise-t-il un commit ?', () => (/avis favorable n'en vaut aucun/.test(c) ? 'non' : 'oui'), () => (/Un avis favorable n'en vaut aucun/.test(cl) ? 'non' : 'oui')],
  ['Q10 Où sont les motivations des arbitrages ?', () => (c.match(/`(docs\/rapports\/etape2-A2-05-bilan-volet2\.md)`, §8/) ?? [])[1], () => (/^### 8\.64 /m.test(bilan) ? 'docs/rapports/etape2-A2-05-bilan-volet2.md' : null)],
  ['Q11 Combien de rapports arbitrés protégés ?', () => (/empreintes-rapports-arbitres\.json/.test(c) ? Object.keys(JSON.parse(lire('a2-05-travail/empreintes-rapports-arbitres.json')).empreintes).length : 0), () => v.empreintes],
  ['Q12 Où est la prochaine action qui fait foi ?', () => (/Fait foi\*\* : la rubrique « Prochaine action » d'`ETAT-ACTUEL\.md`/.test(c) && pa(etat) ? 'ETAT-ACTUEL.md' : null), () => 'ETAT-ACTUEL.md'],
];
const rq = Q.map(([q, r, t]) => { let a; try { a = r(); } catch (e) { a = 'erreur : ' + e.message; } const b = t(); return { q, a: String(a), b: String(b), ok: String(a) === String(b) }; });
ok('C8', 'essai de reprise simulée', rq.every((x) => x.ok), rq.filter((x) => x.ok).length + ' réponses justes sur ' + rq.length);

// C9 · empreintes, couverture, zones protégées, relais en service
// C9a : manifeste réel entier vérifié (calculerEtat sans refus) ; entrées de HEAD présentes et inchangées ; entrées nouvelles = rapports de tranche
// arbitrés (rapport « arbitré le », périmètre « périmètre accepté le »), inscrits dans les ajouts ; aucun rapport arbitré hors manifeste ;
// option A (décision du 2026-10-22) : un périmètre accepté peut précéder le rapport de sa tranche, jamais l'inverse (anomaliesTranches)
const mReel = JSON.parse(lire(MANIFESTE)), mHeadR = git('show', 'HEAD:' + MANIFESTE), mHead = mHeadR.code === 0 ? JSON.parse(mHeadR.out).empreintes : null;
const hist = Object.entries(mHead ?? {}), histAltere = hist.filter(([p, h]) => mReel.empreintes[p] !== h).map(([p]) => p);
const nouv = Object.keys(mReel.empreintes).filter((p) => !Object.hasOwn(mHead ?? {}, p));
let arbR; try { arbR = rapportsArbitres(root); } catch (e) { arbR = null; }
const tr = (p) => p.match(TRANCHE);
const nouvHors = mHead ? anomaliesTranches(root, mReel, new Set(Object.keys(mHead)), lire(MANIFESTE)) : ['manifeste de HEAD illisible'];
const horsManifeste = (arbR ?? []).filter((p) => !Object.hasOwn(mReel.empreintes, p));
ok('C9a', 'couverture et empreintes du manifeste réel (calculerEtat sans refus) ; entrées de HEAD inchangées ; entrées nouvelles = rapports de tranche arbitrés et périmètres acceptés (un périmètre accepté peut précéder son rapport)',
  mHead && arbR && v.empreintes === Object.keys(mReel.empreintes).length && !histAltere.length && !nouvHors.length && !horsManifeste.length,
  v.empreintes + ' rapports arbitrés identiques sur ' + Object.keys(mReel.empreintes).length + ' au manifeste ; HEAD : ' + hist.length + ', ' + (histAltere.length ? 'altérées : ' + histAltere.join(', ') : 'inchangées') + ' ; nouvelles : ' + (nouv.map((p) => (tr(p) ? p.slice(p.lastIndexOf('lot3-') + 5) : p)).join(', ') || 'aucune') + (nouvHors.length ? ' ; anomalies : ' + nouvHors.join(' ; ') : '') + (horsManifeste.length ? ' ; arbitrés hors manifeste : ' + horsManifeste.join(', ') : '') + (mHead ? '' : ' ; manifeste de HEAD illisible') + (arbR ? '' : ' ; rapportsArbitres en refus'));
const protR = git('status', '--porcelain', '--', 'data', 'reconstruction', 'tools', 'tests', 'docs/conception', ...(APRES ? [] : ['CLAUDE.md'])); const prot = protR.code === 0 ? protR.out : 'git status : code ' + protR.code;
if (!APRES) ok('C9b', 'données, normes, registres, snapshots, outils, tests et CLAUDE.md non modifiés', prot === '', prot || 'aucune modification');
else ok('C9b', 'données, normes, registres, snapshots, outils et tests non modifiés (CLAUDE.md, modifié sur autorisation : C10a et C10c)', prot === '', prot || 'aucune modification');
if (!APRES) ok('C9c', 'relais en service non remplacé', /^# A2-05 · Relais de reprise$/m.test(ancien) && octetsAncien > 200000 && !ancien.includes('CANDIDAT, NON EN SERVICE'), octetsAncien + ' octets');
else { const live = lire(ANCIEN); const sansGit = (t) => t.split('\n').filter((l) => !l.startsWith('- **Git** :')).join('\n'); ok('C9c', 'relais mis en service : relais en service = version finale 2 ; ancien relais (départ) intact dans la sauvegarde et lisible dans git', sansGit(live) === sansGit(lire(VF2 + '/' + ANCIEN)) && live !== ancien && /^# A2-05 · Relais de reprise$/m.test(ancien) && octetsAncien > 200000 && anc.code === 0, Buffer.byteLength(live) + ' octets en service ; départ ' + octetsAncien); }

// C10 · versions finales (a2-05-travail/versions-finales/, générées par generer.mjs) : départ inchangé, différences limitées au périmètre arbitré
const { createHash } = await import('node:crypto');
const brut = (p) => readFileSync(join(root, p), 'utf8'); const h = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const man = JSON.parse(lire(VF + '/manifeste.json')).documents;
// Après la mise en service, le bilan peut recevoir de nouvelles sous-sections §8.67, §8.68…, ajoutées à la fin et numérotées à la suite,
// sans aucune autre modification : il doit alors commencer exactement par sa version finale (règle explicite, arbitrage du 2026-10-20).
const suiteBilan = (p, m) => { if (p !== BILAN) return false; const fin = brut(VF + '/' + p).replace(/\s+$/, ''), live = brut(p); if (!live.startsWith(fin)) return false;
  const extra = live.slice(fin.length); const t = [...extra.matchAll(/^#{1,6} .*$/gm)].map((x) => x[0]); const n = t.map((x) => (x.match(/^### 8\.(\d+) /) ?? [])[1]);
  return t.length > 0 && n.every((x, i) => +x === 67 + i) && h(brut(VF + '/' + p)) === m.final_sha256; };
// Le relais en service peut différer de sa version figée par sa seule ligne « Git », à la forme exacte ci-dessous ; la version figée et son empreinte ne changent pas
const LIGNE_GIT = /^- \*\*Git\*\* : branche `ocha-v2`\. Référence historique : `([0-9a-f]{40})` \(checkpoint B, 2026-10-18, 177 chemins\)\. Dernier checkpoint déclaré : `a2-05-travail\/references-git\.json`\. \*\*Les travaux postérieurs à ce checkpoint ne sont ni committés ni poussés, sauf mention contraire d'`ETAT-ACTUEL\.md`\.\*\* À vérifier par `git rev-parse HEAD origin\/ocha-v2` et `git ls-remote origin refs\/heads\/ocha-v2` avant de s'y fier\.$/;
const ligneGit = (texte, fige) => { const v = fige.split('\n'), l = texte.split('\n'), d = l.map((x, i) => (x !== v[i] ? i : -1)).filter((i) => i >= 0); return l.length === v.length && (!d.length || (d.length === 1 && v[d[0]].startsWith('- **Git** :') && LIGNE_GIT.exec(l[d[0]])?.[1] === refHist)); };
// Versions figées 2 : manifeste 1 intact (empreinte citée par le manifeste 2) ; départ 2 = version finale 1 à la ligne « Git » près ; final 2 conforme au manifeste 2 ; relais en service = final 2 à la ligne « Git » près
const man2 = JSON.parse(lire(VF2 + '/manifeste.json')), r2 = man2.documents?.[ANCIEN] ?? {};
const chaine2 = man2.version === 2 && Object.keys(man2.documents ?? {}).join() === ANCIEN && man2.precede?.manifeste === VF + '/manifeste.json' && h(brut(VF + '/manifeste.json')) === man2.precede.sha256
  && h(brut(VF + '/' + ANCIEN)) === man[ANCIEN].final_sha256 && h(brut(VF2 + '/depart/' + ANCIEN)) === r2.depart_sha256 && h(brut(VF2 + '/' + ANCIEN)) === r2.final_sha256 && ligneGit(brut(VF2 + '/depart/' + ANCIEN), brut(VF + '/' + ANCIEN));
const relaisV2 = chaine2 && ligneGit(brut(ANCIEN), brut(VF2 + '/' + ANCIEN));
const changes = Object.entries(man).filter(([p, m]) => (APRES ? (p === ANCIEN ? !relaisV2 : h(brut(p)) !== m.final_sha256 && !suiteBilan(p, m)) || h(brut(VF + '/depart/' + p)) !== m.depart_sha256 : h(brut(p)) !== m.depart_sha256) || h(brut(VF + '/' + p)) !== m.final_sha256).map(([p]) => p);
ok('C10a', APRES ? 'documents réels = versions finales du manifeste (bilan : version finale suivie seulement de sous-sections §8.67 et suivantes ; relais : version finale 2, chaînée à la version 1) ; sauvegarde de départ = empreintes de départ' : 'documents réels inchangés depuis la génération ; versions finales conformes au manifeste', Object.keys(man).length === 4 && !changes.length, Object.keys(man).length + ' documents' + (changes.length ? ' ; écart : ' + changes.join(', ') : ''));
const vRel = lire(VF + '/' + ANCIEN);
ok('C10b', 'relais final 1 = candidat sans sa première ligne (commentaire « CANDIDAT ») ; versions figées 2 chaînées à la version 1, manifeste 1 intact', vRel === c1.slice(c1.indexOf('\n') + 1) && !vRel.includes('CANDIDAT') && chaine2 && !c.includes('CANDIDAT'), Buffer.byteLength(vRel) + ' octets ; version 2 : ' + Buffer.byteLength(c) + ' octets');
const vCl = lire(VF + '/CLAUDE.md').split('\n'), aCl = dep('CLAUDE.md').split('\n'); const dCl = aCl.map((l, i) => (l !== vCl[i] ? i + 1 : 0)).filter(Boolean);
ok('C10c', 'CLAUDE.md final : seules les lignes de la mention d\'état du §5 changent', vCl.length === aCl.length && dCl.join(',') === '128,129' && !vCl.join('\n').includes('558f150') && vCl[127].includes('`7803163`') && /checkpoint B du 2026-10-18, committé et poussé/.test(vCl[128]), 'lignes ' + dCl.join(', '));
const nr = dep('docs/relecture/note-relais.md'), vNr = lire(VF + '/docs/relecture/note-relais.md');
ok('C10d', 'note-relais.md finale : un paragraphe de gel en tête, historique conservé à l\'identique', vNr.endsWith(nr) && vNr.slice(0, vNr.length - nr.length).split('\n').filter(Boolean).length === 1 && /^\*\*Note gelée\*\*/.test(vNr) && /docs\/relecture\/reprise-A2-05\.md/.test(vNr.slice(0, 600)), (vNr.length - nr.length) + ' caractères ajoutés');
const bi = dep(BILAN), vBi = lire(VF + '/' + BILAN); const ajout = vBi.slice(bi.replace(/\s+$/, '').length);
ok('C10e', 'bilan final : §8.66 ajouté à la fin, rien d\'autre ne change', vBi.startsWith(bi.replace(/\s+$/, '')) && (ajout.match(/^### /gm) ?? []).length === 1 && /^\s*### 8\.66 /.test(ajout) && !/^### 8\.67 /m.test(vBi), Buffer.byteLength(ajout) + ' octets ajoutés');
const anc6 = anc.out.replace(/\r\n/g, '\n'); const s6 = anc6.slice(anc6.indexOf('## 6. Arbitrages de fond'), anc6.indexOf('## 6 bis.'));
const cit = [...ajout.matchAll(/^\d\. « (.+?) » — Provenance : (.+)$/gm)];
const provOk = cit.every(([, , pv]) => [...pv.matchAll(/`(etape2-A2-05-[a-z0-9-]+\.md)`/g)].every(([, f]) => existsSync(join(root, 'docs/rapports', f))));
ok('C10f', '§8.66 : sept formulations mot pour mot de l\'ancien §6, chacune avec une provenance existante', cit.length === 7 && cit.every(([, q]) => s6.includes(q)) && provOk && /Elle ne crée aucune règle/.test(ajout), cit.length + ' formulations');
const per2 = lire('docs/rapports/etape2-A2-05-perimetre.md'), perC = lire('docs/rapports/etape2-A2-05-perimetre-coherence.md');
ok('C10g', 'sections de provenance citées présentes et pertinentes', /^## 5\. Méthode de revue individuelle/m.test(per2) && /éclairent, ils ne jugent pas/.test(per2) && /^## 6\. Critères de classement/m.test(per2) && /^### 6\.4 Statut provisoire N/m.test(per2) && /N n'est jamais un état final/.test(per2)
  && /^## 5\. Méthode/m.test(perC) && /les documents historiques éclairent/.test(perC) && /^## T2\.3 /m.test(audit) && /Elle ne contient ni « état général » ni « événement général »/.test(audit) && /^### 3\.1 Le corps/m.test(audit) && /^### 3\.2 Unités/m.test(audit) && /D1361/.test(audit)
  && /aucun identifiant de SENSE n'est renuméroté/.test(bi.slice(bi.indexOf('## 2. '), bi.indexOf('## 3. '))) && /ne sont pas normatifs/.test(lire('docs/conception/a2/README.md').replace(/\s+/g, ' ')), 'périmètre §5, §6, §6.4 ; cohérence §5 ; audit §T2.3, §3.1, §3.2, §5 ; bilan §2 ; README des snapshots');
// C8 bis · essai de reprise rejoué sur le relais FINAL et sur le bilan FINAL (les renvois au §8.66 doivent aboutir)
ok('C8b', 'essai de reprise sur la version finale 2 : renvois au §8.66 aboutis ; prochaine action lue dans ETAT-ACTUEL.md', /§8\.66/.test(c) && /^### 8\.66 Arbitrage du relais allégé/m.test(vBi) && /## 6\. Prochaine action\n\n\*\*Fait foi\*\*/.test(c) && !/Au 20\d\d-/.test(c.slice(c.indexOf('## 6.'), c.indexOf('## 7.'))) && pa(etat).length > 50, 'relais final 2 et bilan final');

// C11 · mode --apres-application seulement : fins de ligne prévues ; §8.66 unique dans le bilan réel ; références du relais en service
if (APRES) {
  const fins = Object.entries(man).filter(([p, m]) => { const t = brut(p); return (t.includes('\r\n') ? 'CRLF' : 'LF') !== m.fins_de_ligne || (m.fins_de_ligne === 'CRLF' && /(?<!\r)\n/.test(t)) || (m.fins_de_ligne === 'LF' && t.includes('\r')); }).map(([p]) => p);
  ok('C11a', 'fins de ligne prévues, sans mélange', !fins.length, fins.join(', ') || '4 documents');
  const bReel = lire(BILAN);
  ok('C11b', 'bilan réel : §8.66 présent une fois (dernière sous-section, ou suivie seulement de §8.67 et suivantes), sept formulations de l\'ancien §6', (bReel.match(/^### 8\.66 /gm) ?? []).length === 1 && (Math.max(...[...bReel.matchAll(/^### 8\.(\d+) /gm)].map((m) => +m[1])) === 66 || suiteBilan(BILAN, man[BILAN])) && [...bReel.matchAll(/^\d\. « (.+?) » — Provenance/gm)].filter(([, q]) => s6.includes(q)).length === 7, '§8.66');
  const rel = lire(ANCIEN); const ch = [...new Set([...rel.matchAll(/`([A-Za-z0-9_.\-]+(?:\/[A-Za-z0-9_.\-…*]+)+\/?|[A-Z][A-Z\-]+\.md)`/g)].map((m) => m[1]))].filter((q) => !q.includes('…') && !q.includes('*') && !existsSync(join(root, q)));
  ok('C11c', 'relais en service : chemins présents, renvois au §8.66 et à ETAT-ACTUEL.md', !ch.length && /§8\.66/.test(rel) && /\*\*Fait foi\*\* : la rubrique « Prochaine action » d'`ETAT-ACTUEL\.md`/.test(rel), ch.join(', ') || 'conformes');
}

for (const r of res) console.log((r.ok ? 'conforme ' : 'ÉCART    ') + r.id.padEnd(4) + ' ' + r.nom + ' : ' + r.detail);
console.log('\nC7, destinations :'); for (const l of detail7) console.log('  ' + l);
console.log('\nC8, essai de reprise :'); for (const x of rq) console.log('  ' + (x.ok ? 'juste ' : 'FAUX  ') + x.q + ' → ' + x.a + (x.ok ? '' : ' (attendu : ' + x.b + ')'));
const n = res.filter((r) => !r.ok).length; console.log('\n' + (res.length - n) + ' conformes sur ' + res.length); process.exitCode = n ? 1 : 0;
