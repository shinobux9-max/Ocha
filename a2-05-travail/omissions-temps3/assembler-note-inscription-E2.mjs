// A2-05 · recherche d'omissions : assemble la note d'export de la préparation documentaire de l'inscription de l'arbitrage de la livraison E2. Lecture seule hors
// de la note ; refuse d'écraser une note existante ; vérifie le manifeste de la proposition, les empreintes, la conservation du texte livré dans le document neuf et
// la conformité des sorties. Transposé de assembler-note-inscription-E1.mjs.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-inscription-E2.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', I = O + 'inscription-E2/', PROP = I + 'proposition/', SORTIE = 'a2-05-travail/note-export-omissions-inscription-E2.md';
const MANIF_SHA = 'ff439eca7866c74316e2bd77620248fd58889cfd4504b8c5c857bd00a048c086';
const NR = 'docs/rapports/etape2-A2-05-omissions-interrogatif-E2.md', SRC = O + 'rapport-relecture-E2.md', SRC_SHA = 'e50df7ba16a54827fd755f8ee22f22dbacdf06b226fa4f6416493f0eebd96964';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (sha(PROP + 'manifeste.json') !== MANIF_SHA) throw new Error('manifeste de la proposition inattendu');
if (sha(SRC) !== SRC_SHA) throw new Error('rapport relu modifié');
for (const [f, re] of [[I + 'sortie-preparation.txt', /préparation conforme$/], [I + 'application/sortie-essai.txt', /essai conforme$/]]) { const t = txt(f); if (!re.test(t) || /^ÉCART/m.test(t)) throw new Error(f + ' : sortie non conforme'); }
const M = JSON.parse(txt(PROP + 'manifeste.json')); const C = Object.keys(M);
if (C.length !== 4 || C.filter((p) => !M[p].depart).join() !== NR) throw new Error('manifeste : quatre fichiers attendus, dont un document neuf');
for (const p of C) if (sha(PROP + p) !== M[p].propose || (M[p].depart && sha(p) !== M[p].depart) || (!M[p].depart && existsSync(join(root, p)))) throw new Error('empreinte divergente ou document neuf déjà présent : ' + p);
{ const v = txt(PROP + NR), r = txt(SRC); const i0 = v.search(/^## 0\. /m), i1 = v.search(/^## 1\. /m), j1 = r.search(/^## 1\. /m);
  if (v.slice(i1) !== r.slice(j1)) throw new Error('la partie à partir du §1 diffère du rapport relu');
  const hs = (t) => t.split('\n').filter((l) => !l.startsWith('**Statut**')).join('\n'); if (hs(v.slice(0, i0)) !== hs(r.slice(0, j1))) throw new Error('l\'en-tête diffère du rapport relu, hors statut'); }
const titre = (p) => '### `' + p + '` — SHA-256 `' + sha(p) + '`';
const doc = ['# Note d\'export — A2-05 · recherche d\'omissions d\'`interrogatif` : inscription de l\'arbitrage de la livraison E2 (préparée, non appliquée)', '',
  '**Date** : 2026-11-05.', '',
  '**Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé.', '',
  '**État de départ** : les inscriptions des groupes A à D, du périmètre du groupe E et de la livraison E1 sont appliquées dans l\'arbre de travail : trois fichiers modifiés (`ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2) et onze documents neufs dans `docs/rapports/`, non committés. L\'arbitrage de E2 n\'est pas encore inscrit.', '',
  '**Rien n\'est appliqué** : les fichiers visés gardent leurs empreintes de départ, et le document neuf n\'existe pas dans `docs/rapports/`. **E3 n\'est pas commencée.** Aucune donnée lexicale, norme ou décision historique n\'est modifiée ; les 204 corrections restent non appliquées.', '',
  '**Demande** (relayée) : « Conformément à QE-4, je t\'autorise uniquement à préparer, sans appliquer, l\'inscription documentaire de l\'arbitrage E2. Fournis les cinq fichiers proposés, les diffs, le manifeste d\'empreintes, les simulations et les contrôles nécessaires à une relecture indépendante. Ne commence pas E3. […] »', '',
  '**Quatre fichiers, et non cinq.** L\'inscription de E2 touche les trois documents de pilotage et un seul document neuf, le rapport de E2 arbitré. Le cinquième fichier de l\'inscription de E1 était le document de périmètre du groupe E ; il est déjà inscrit (`docs/rapports/etape2-A2-05-omissions-interrogatif-E-perimetre.md`, SHA-256 `755b872f…`), et la préparation vérifie qu\'il est inchangé. Aucun fichier n\'est ajouté pour atteindre cinq.', '',
  '## 1. Ce qui est proposé', '',
  'Dossier : `' + I + '`. Manifeste de la proposition : SHA-256 `' + MANIF_SHA + '`. Quatre fichiers :', '', txt(PROP + 'table-diffs.md'), '',
  '**`ETAT-ACTUEL.md` et `ROADMAP.md`** reçoivent les mêmes remplacements ciblés, sur le modèle des inscriptions précédentes :',
  '- la rubrique « Reste à faire » : groupe D et livraisons E1 et E2 arbitrés le 2026-11-05 (182 sens : A 39, B 18, C 3, D 53, E1 39, E2 30) ; 52 candidats restants, dans E3 ; renvoi aux §8.122 à §8.127 ;',
  '- la « Prochaine action », identique dans les deux documents (C5f) : l\'ouverture de la relecture de E3, sur autorisation distincte après vérification de l\'inscription de E2, puis l\'inscription de son arbitrage ;',
  '- dans `ROADMAP.md`, l\'en-tête : la livraison E2 y est ajoutée ; la date reste au 2026-11-05 (vérifiée, non remplacée) ;',
  '- dans `ETAT-ACTUEL.md`, une ligne de journal datée du 2026-11-05.', '',
  '**Le bloc `a2-05:etat` ne change pas** : aucun des nombres qu\'il porte (377, 204, 177, V1-32, 47) ne bouge.', '',
  '**Bilan du volet 2, §8.127**, ajouté à la fin : la livraison E2 arbitrée, les décomptes séparés et ce qui n\'est pas modifié.', '',
  '**Le document neuf** `docs/rapports/etape2-A2-05-omissions-interrogatif-E2.md` est recopié du rapport relu. Il reçoit un statut et un §0 qui cite mot pour mot l\'arbitrage relayé, en sept points, et l\'inchangé ; le reste du texte est conservé tel qu\'il a été livré (vérifié par la préparation et par cet assembleur). Le fichier d\'origine, dans `a2-05-travail/`, n\'est pas modifié.', '',
  '**Simulation de l\'état final sur copie jetable** (partie 1) :',
  '- aperçu de synchronisation vide ;',
  '- relais 29 sur 30, C9b seul, en mode normal et strict ; C5f, C8 et C9a conformes ;',
  '- 47 empreintes ; contrôle du périmètre opérationnel 29 sur 29 ;',
  '- couverture, pilote, recalculs T5 à T9 ; `assemble`, `verify`, 510 tests ;',
  '- état calculé inchangé ; les onze documents inscrits avec A à D et E1 inchangés ;',
  '- deux sabotages de la prochaine action détectés (C5f).', '',
  '**Essai de l\'application sur copie jetable** (partie 1) :',
  '- neuf refus avant écriture : index, sauvegarde, manifeste, version proposée, diff relu, document neuf modifié, fichier de départ modifié, document neuf déjà présent, donnée modifiée ;',
  '- exécution nominale : 114 vérifications conformes ; les quatre fichiers visés seuls sont modifiés ;',
  '- seconde exécution refusée ; sabotages C5f détectés ; dépôt réel inchangé.', '',
  '**Points à noter.**',
  '1. Les scripts sont ceux de E1, transposés : chemins, manifeste, empreintes de départ (arrivée de l\'inscription E1), textes, sabotages ; un seul document neuf (P5 et C12 adaptés). La liste des fichiers préservés de l\'application s\'étend aux deux documents inscrits avec E1 et aux sources de E2.',
  '2. **Le document neuf ne serait pas protégé au manifeste d\'empreintes**, comme les onze inscrits avant lui : c\'est une limite documentaire, suivie séparément.', '',
  '## 2. Décisions attendues', '',
  '1. Accepter, ou non, la proposition d\'inscription telle qu\'elle est (quatre fichiers, manifeste `' + MANIF_SHA + '`).',
  '2. Puis autoriser distinctement l\'exécution unique de `' + I + 'application/appliquer-inscription-E2.mjs`.',
  '3. Après vérification de l\'application, autoriser distinctement, ou non, l\'ouverture de la relecture de E3.', '',
  'Les fichiers de l\'export à ignorer ou à lire autrement :',
  '- `01` à `04` recopient la gouvernance et la conception actuelles, dont les inscriptions de A à D et de E1, appliquées ;',
  '- `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ;',
  '- `10` donne le diff de l\'arbre de travail depuis `39cce13`, fichiers non suivis compris.', '',
  '# Partie 1 · Inscription', '',
  '## 1.1 Manifeste de la proposition', '', clot(txt(PROP + 'manifeste.json'), 'json'), '',
  '## 1.2 Diffs des trois fichiers modifiés', '', ...C.filter((p) => M[p].depart).flatMap((p) => [titre(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), '', clot(txt(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), 'diff'), '']),
  '## 1.3 Le document neuf', '',
  'Le rapport de E2 (' + txt(PROP + NR).split('\n').length + ' lignes) est recopié **de son en-tête jusqu\'à la fin de son §0**. Le reste est, mot pour mot, le rapport relu : `' + SRC + '`, SHA-256 `' + SRC_SHA + '`, livré en entier dans l\'export de la relecture de E2. L\'assembleur de cette note le vérifie avant d\'écrire :',
  '- la partie qui commence au §1 est identique au rapport relu ;',
  '- l\'en-tête est identique, hors de la ligne de statut.', '',
  titre(PROP + NR), '', clot(txt(PROP + NR).slice(0, txt(PROP + NR).search(/^## 1\. /m)).trimEnd() + '\n\n[… à partir du §1 : identique au rapport relu, SHA-256 ' + SRC_SHA + ' …]', 'markdown'), '',
  '## 1.4 Sortie de la préparation (code 0)', '', clot(txt(I + 'sortie-preparation.txt'), 'text'), '',
  '## 1.5 Sortie de l\'essai de l\'application sur copie jetable (code 0)', '', clot(txt(I + 'application/sortie-essai.txt'), 'text'), '',
  '## 1.6 Sources des scripts', '', ...['preparer-inscription-E2.mjs', 'application/appliquer-inscription-E2.mjs', 'application/essayer-inscription-E2.mjs'].flatMap((s) => [titre(I + s) + (s.includes('appliquer') ? ' — non lancé' : ''), '', clot(txt(I + s), 'js'), '']), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n') + '\n') + ' octets');
