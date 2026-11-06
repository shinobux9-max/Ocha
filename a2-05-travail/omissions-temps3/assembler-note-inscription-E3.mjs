// A2-05 · recherche d'omissions : assemble la note d'export de la préparation documentaire de l'inscription de l'arbitrage de la livraison E3 et du bilan de
// clôture de la recherche d'omissions. Lecture seule hors de la note ; refuse d'écraser une note existante ; vérifie le manifeste de la proposition, les
// empreintes, la conservation du texte livré dans le rapport de E3 et la conformité des sorties. Transposé de assembler-note-inscription-E2.mjs.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-inscription-E3.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', I = O + 'inscription-E3/', PROP = I + 'proposition/', SORTIE = 'a2-05-travail/note-export-omissions-inscription-E3.md';
const MANIF_SHA = '0a7faa3bf7ec0cd2f03a7dad7f8705a718186e5f7d5b89311c7279608be86325';
const RN = 'docs/rapports/etape2-A2-05-omissions-interrogatif-', NR = RN + 'E3.md', NC = RN + 'cloture.md';
const SRC = O + 'rapport-relecture-E3.md', SRC_SHA = '0a1ef1b6d83ca31e70251deeeed28d7dae542c19e23220ff79b9ec1d4a31a341';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (sha(PROP + 'manifeste.json') !== MANIF_SHA) throw new Error('manifeste de la proposition inattendu');
if (sha(SRC) !== SRC_SHA) throw new Error('rapport relu modifié');
for (const [f, re] of [[I + 'sortie-preparation.txt', /préparation conforme$/], [I + 'application/sortie-essai.txt', /essai conforme$/]]) { const t = txt(f); if (!re.test(t) || /^ÉCART/m.test(t)) throw new Error(f + ' : sortie non conforme'); }
const M = JSON.parse(txt(PROP + 'manifeste.json')); const C = Object.keys(M);
if (C.length !== 5 || C.filter((p) => !M[p].depart).sort().join() !== [NR, NC].sort().join()) throw new Error('manifeste : cinq fichiers attendus, dont deux documents neufs');
for (const p of C) if (sha(PROP + p) !== M[p].propose || (M[p].depart && sha(p) !== M[p].depart) || (!M[p].depart && existsSync(join(root, p)))) throw new Error('empreinte divergente ou document neuf déjà présent : ' + p);
{ const v = txt(PROP + NR), r = txt(SRC); const i0 = v.search(/^## 0\. /m), i1 = v.search(/^## 1\. /m), j1 = r.search(/^## 1\. /m);
  if (v.slice(i1) !== r.slice(j1)) throw new Error('la partie à partir du §1 diffère du rapport relu');
  const hs = (t) => t.split('\n').filter((l) => !l.startsWith('**Statut**')).join('\n'); if (hs(v.slice(0, i0)) !== hs(r.slice(0, j1))) throw new Error('l\'en-tête diffère du rapport relu, hors statut'); }
const titre = (p) => '### `' + p + '` — SHA-256 `' + sha(p) + '`';
const doc = ['# Note d\'export — A2-05 · recherche d\'omissions d\'`interrogatif` : inscription de l\'arbitrage de la livraison E3 et bilan de clôture de la recherche (préparés, non appliqués)', '',
  '**Date** : 2026-11-05.', '',
  '**Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé.', '',
  '**État de départ** : les inscriptions des groupes A à D, du périmètre du groupe E et des livraisons E1 et E2 sont appliquées dans l\'arbre de travail : trois fichiers modifiés (`ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2) et douze documents neufs dans `docs/rapports/`, non committés. L\'arbitrage de E3 n\'est pas encore inscrit.', '',
  '**Rien n\'est appliqué** : les fichiers visés gardent leurs empreintes de départ, et les deux documents neufs n\'existent pas dans `docs/rapports/`. Aucune donnée lexicale, norme ou décision historique n\'est modifiée ; **les 204 corrections restent non appliquées** ; **l\'étape 2 n\'est pas terminée**. L\'application des corrections et la clôture de l\'étape 2 ne sont pas préparées.', '',
  '**Demande** (relayée) : « J\'autorise uniquement la préparation, sans application : de l\'inscription documentaire de l\'arbitrage E3, conformément à QE-4 ; du bilan de clôture de la recherche d\'omissions, distinguant clairement les 234 candidats examinés des 573 sens non détectés et non audités. Le bilan ne devra pas conclure que les 807 sens sont conformes. Il devra rappeler que les 204 corrections restent non appliquées et que l\'étape 2 n\'est pas terminée. Fournis les documents proposés, les diffs, le manifeste, les simulations et les contrôles pour relecture indépendante. […] »', '',
  '## 1. Ce qui est proposé', '',
  'Dossier : `' + I + '`. Manifeste de la proposition : SHA-256 `' + MANIF_SHA + '`. Cinq fichiers :', '', txt(PROP + 'table-diffs.md'), '',
  '**`ETAT-ACTUEL.md` et `ROADMAP.md`** reçoivent les mêmes remplacements ciblés :',
  '- la rubrique « Reste à faire » : la recherche d\'omissions passe de « ouverte » à **« close »** ; 234 candidats relus sur 234 (A 39, B 18, C 3, D 53, E1 39, E2 30, E3 52), aucune omission retenue ; **les 573 sens non relevés n\'ont pas été relus et ne sont pas vérifiés conformes** ; renvoi au bilan de clôture et aux §8.122 à §8.129 ;',
  '- la « Prochaine action », identique dans les deux documents (C5f) : le choix de la suite de l\'étape 2, sur arbitrage distinct (volet 3, cadre de HP-1 à HP-4, application des 204 corrections, chacun sur autorisation distincte) ; l\'étape 2 n\'est pas terminée ; la suite de la rubrique (commit de l\'installation d\'A10, T1 et T2, `tools/export-relecture.mjs`) est inchangée ;',
  '- dans `ROADMAP.md`, l\'en-tête : « recherche d\'omissions […] close », avec la livraison E3 et les décomptes 234 et 573 ; la date reste au 2026-11-05 ;',
  '- dans `ETAT-ACTUEL.md`, une ligne de journal datée du 2026-11-05.', '',
  '**Le bloc `a2-05:etat` ne change pas** : aucun des nombres qu\'il porte (377, 204, 177, V1-32, 47) ne bouge.', '',
  '**Bilan du volet 2** : §8.128 (livraison E3 arbitrée) et §8.129 (clôture de la recherche), ajoutés à la fin.', '',
  '**Premier document neuf** : `' + NR + '`, recopié du rapport relu ; il reçoit un statut et un §0 qui cite mot pour mot l\'arbitrage relayé, en sept points, et l\'inchangé ; le reste du texte est conservé tel qu\'il a été livré (vérifié par la préparation et par cet assembleur).', '',
  '**Second document neuf : le bilan de clôture** `' + NC + '`, rendu en entier au §1.4. Il est **produit et vérifié par le script de préparation** : les décomptes de couverture sont recalculés sur `mesure.json` ; l\'ensemble des sens arbitrés dans les sept analyses (A à E3) est vérifié **identique** aux 234 candidats de la mesure, chacun avec une conclusion et une seule ; les 234 conclusions sont « ne relève pas de la fonction » ; les 573 non relevés sont dits non relus et non vérifiés conformes ; le script vérifie qu\'aucune formule n\'affirme la conformité des 807 sens, que les 204 corrections sont dites non appliquées et l\'étape 2 non terminée. Il compte aussi les 30 sens non candidats des 195 ENTRY relues (E1 5, E2 9, E3 16), comptés parmi les 573.', '',
  '**Simulation de l\'état final sur copie jetable** (partie 1) : aperçu de synchronisation vide ; relais 29 sur 30, C9b seul, en mode normal et strict ; C5f, C8 et C9a conformes ; 47 empreintes ; contrôle du périmètre opérationnel 29 sur 29 ; recalculs de T5 à T9, `assemble`, `verify`, 510 tests ; état calculé inchangé ; les douze documents inscrits avant inchangés ; deux sabotages de la prochaine action détectés (C5f).', '',
  '**Essai de l\'application sur copie jetable** (partie 1) : dix refus avant écriture (index, sauvegarde, manifeste, version proposée, diff relu, document neuf modifié, fichier de départ modifié, rapport de E3 déjà présent, bilan de clôture déjà présent, donnée modifiée) ; exécution nominale : 122 vérifications conformes, les cinq fichiers visés seuls modifiés ; seconde exécution refusée ; sabotages C5f détectés ; dépôt réel inchangé.', '',
  '**Points à noter.**',
  '1. Les scripts d\'application et d\'essai sont ceux de E2, transposés (chemins, manifeste, deux documents neufs, textes, sabotages) ; l\'essai gagne un refus (R9, bilan de clôture déjà présent). La liste des fichiers préservés de l\'application s\'étend au rapport de E2 inscrit et aux sources de E3.',
  '2. **Un écart de la préparation et deux retouches, avant la proposition relue** : le contrôle « aucune formule de conformité des 807 sens » reconnaissait la citation niée de l\'autorisation ; il retire désormais les seules formules niées, puis refuse toute affirmation. Puis deux retouches de texte du bilan de clôture (la colonne « Temps » de X1, qui affichait « 0 » ; la liste des décisions confrontées, présentée comme exemples). La proposition relue est celle de la dernière exécution, code 0.',
  '3. **Les documents neufs ne seraient pas protégés au manifeste d\'empreintes**, comme les douze inscrits avant eux : limite documentaire, suivie séparément.', '',
  '## 2. Décisions attendues', '',
  '1. Accepter, ou non, la proposition d\'inscription telle qu\'elle est (cinq fichiers, manifeste `' + MANIF_SHA + '`), dont le bilan de clôture.',
  '2. Puis autoriser distinctement l\'exécution unique de `' + I + 'application/appliquer-inscription-E3.mjs`.',
  '3. Ensuite, séparément, la suite de l\'étape 2 ; l\'application des 204 corrections et la clôture de l\'étape 2 demandent des autorisations distinctes.', '',
  'Les fichiers de l\'export à ignorer ou à lire autrement :',
  '- `01` à `04` recopient la gouvernance et la conception actuelles, dont les inscriptions de A à D, de E1 et de E2, appliquées ;',
  '- `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ;',
  '- `10` donne le diff de l\'arbre de travail depuis `39cce13`, fichiers non suivis compris.', '',
  '# Partie 1 · Inscription', '',
  '## 1.1 Manifeste de la proposition', '', clot(txt(PROP + 'manifeste.json'), 'json'), '',
  '## 1.2 Diffs des trois fichiers modifiés', '', ...C.filter((p) => M[p].depart).flatMap((p) => [titre(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), '', clot(txt(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), 'diff'), '']),
  '## 1.3 Le rapport de E3 arbitré', '',
  'Le rapport (' + txt(PROP + NR).split('\n').length + ' lignes) est recopié **de son en-tête jusqu\'à la fin de son §0**. Le reste est, mot pour mot, le rapport relu : `' + SRC + '`, SHA-256 `' + SRC_SHA + '`, livré en entier dans l\'export de la relecture de E3. L\'assembleur de cette note le vérifie avant d\'écrire : la partie qui commence au §1 est identique au rapport relu ; l\'en-tête est identique, hors de la ligne de statut.', '',
  titre(PROP + NR), '', clot(txt(PROP + NR).slice(0, txt(PROP + NR).search(/^## 1\. /m)).trimEnd() + '\n\n[… à partir du §1 : identique au rapport relu, SHA-256 ' + SRC_SHA + ' …]', 'markdown'), '',
  '## 1.4 Le bilan de clôture, en entier', '', titre(PROP + NC), '', clot(txt(PROP + NC), 'markdown'), '',
  '## 1.5 Sortie de la préparation (code 0)', '', clot(txt(I + 'sortie-preparation.txt'), 'text'), '',
  '## 1.6 Sortie de l\'essai de l\'application sur copie jetable (code 0)', '', clot(txt(I + 'application/sortie-essai.txt'), 'text'), '',
  '## 1.7 Sources des scripts', '', ...['preparer-inscription-E3.mjs', 'application/appliquer-inscription-E3.mjs', 'application/essayer-inscription-E3.mjs'].flatMap((s) => [titre(I + s) + (s.includes('appliquer') ? ' — non lancé' : ''), '', clot(txt(I + s), 'js'), '']), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n') + '\n') + ' octets');
