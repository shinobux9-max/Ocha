// A2-05 · recherche d'omissions : assemble la note d'export de deux propositions, (1) inscription documentaire de l'arbitrage du groupe C, (2) périmètre du groupe D.
// Lecture seule hors de la note ; refuse d'écraser une note existante ; vérifie le manifeste de la proposition d'inscription et la conformité des sorties.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-inscription-C-perimetre-D.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', I = O + 'inscription-C/', PROP = I + 'proposition/', SORTIE = 'a2-05-travail/note-export-omissions-inscription-C-perimetre-D.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (sha(PROP + 'manifeste.json') !== '6f87e80ac5bc2c8983489b5bce11a6f37a7324415aa0220e3da3cbc65575b33f') throw new Error('manifeste de la proposition inattendu');
for (const [f, re] of [[I + 'sortie-preparation.txt', /préparation conforme$/], [I + 'application/sortie-essai.txt', /essai conforme$/], [O + 'sortie-preparation-D.txt', /préparation conforme ; aucun verdict$/]]) if (!re.test(txt(f))) throw new Error(f + ' : sortie non conforme');
const M = JSON.parse(txt(PROP + 'manifeste.json')); const C = Object.keys(M);
for (const p of C) if (sha(PROP + p) !== M[p].propose || (M[p].depart && sha(p) !== M[p].depart)) throw new Error('empreinte divergente : ' + p);
const titre = (p) => '### `' + p + '` — SHA-256 `' + sha(p) + '`';
const doc = ['# Note d\'export — A2-05 · recherche d\'omissions d\'`interrogatif` : inscription de l\'arbitrage du groupe C (préparée, non appliquée) et périmètre du groupe D (proposé, non arbitré)', '',
  '**Date** : 2026-11-04. **Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé. Les inscriptions des arbitrages des groupes A et B sont appliquées dans l\'arbre de travail (onze fichiers, non committés) : c\'est l\'état de départ de la présente proposition. **Rien n\'est appliqué** : les fichiers visés gardent leurs empreintes de départ, les deux documents neufs n\'existent pas dans `docs/rapports/`. **Aucun verdict n\'est pris sur le groupe D.** Aucune donnée lexicale, norme ou décision historique n\'est modifiée ; les 204 corrections restent non appliquées ; le groupe E n\'est pas commencé.', '',
  '**Demande** (relayée) : « Je t\'autorise uniquement à préparer, sans appliquer : l\'inscription documentaire de l\'arbitrage C, avec les diffs, simulations et contrôles nécessaires ; le périmètre du groupe D, conformément au découpage accepté : 53 sens dans 40 ENTRY, avec les identifiants, les filtres d\'origine, les sources disponibles et les décisions historiques pertinentes. […] Fournis un export de relecture de ces deux préparations. »', '',
  '## 1. Inscription de l\'arbitrage du groupe C : ce qui est proposé', '',
  'Dossier : `' + I + '`. Manifeste de la proposition : SHA-256 `' + sha(PROP + 'manifeste.json') + '`. Cinq fichiers :', '', txt(PROP + 'table-diffs.md'), '',
  '- **`ETAT-ACTUEL.md` et `ROADMAP.md`**, mêmes remplacements ciblés, sur le modèle des inscriptions A et B :',
  '  - la rubrique « Reste à faire » : groupes A, B et C arbitrés (60 sens), 174 candidats restants dans les groupes D et E, renvoi aux §8.122 à §8.124 ;',
  '  - la « Prochaine action », identique dans les deux documents (C5f) : la décision sur le périmètre du groupe D, puis sa relecture, puis le groupe E, chacun sur autorisation distincte ;',
  '  - dans `ROADMAP.md`, l\'en-tête (la date reste au 2026-11-04) ; dans `ETAT-ACTUEL.md`, une ligne de journal datée du 2026-11-04.',
  '  **Le bloc `a2-05:etat` ne change pas** : aucun des nombres qu\'il porte (377, 204, 177, V1-32, 47) ne bouge.',
  '- **Bilan du volet 2, §8.124**, ajouté à la fin : périmètre de C, groupe C arbitré, emploi d\'incertitude de どうも, remarque « De rien / Merci ! », décomptes séparés, ce qui n\'est pas modifié.',
  '- **Deux documents neufs dans `docs/rapports/`**, recopiés des documents relus, avec un statut et un §0 qui citent mot pour mot les décisions relayées ; le reste du texte est conservé tel qu\'il a été livré : `etape2-A2-05-omissions-interrogatif-C-perimetre.md` (périmètre de C accepté ; §0 : QC-1 à QC-3 et QC-4) et `…-C.md` (rapport de C arbitré ; §0 : les trois conclusions, l\'absence d\'omission, la lecture de l\'emploi d\'incertitude, la remarque conservée, l\'inchangé). Leurs fichiers d\'origine, dans `a2-05-travail/`, ne sont pas modifiés.', '',
  '**Simulation de l\'état final sur copie jetable** (sortie complète en partie 1) : aperçu de synchronisation vide ; relais 29 sur 30, C9b seul, en mode normal et strict ; C5f, C8 et C9a conformes ; 47 empreintes ; contrôle du périmètre opérationnel 29 sur 29 ; couverture, pilote, recalculs T5 à T9 ; `assemble`, `verify`, 510 tests ; état calculé inchangé ; les cinq documents inscrits avec A et B inchangés ; deux sabotages de la prochaine action détectés (C5f).', '',
  '**Essai de l\'application sur copie jetable** (partie 1) :',
  '- neuf refus avant écriture : index, sauvegarde, manifeste, version proposée, diff relu, document neuf modifié, fichier de départ modifié, document neuf déjà présent, donnée modifiée ;',
  '- exécution nominale : 100 vérifications conformes, les cinq fichiers visés seuls modifiés ;',
  '- seconde exécution refusée ; sabotages C5f détectés ; dépôt réel inchangé.', '',
  '**Points à noter.**',
  '1. Les scripts de C sont ceux de B, transposés : chemins, manifeste, empreintes de départ (arrivée de l\'inscription B), textes, sabotages ; la liste des fichiers préservés est étendue aux deux documents inscrits avec B, aux sources de C et aux fichiers du périmètre D. Dans le préparateur, la variable `INSCRITS_A` garde son nom, mais couvre désormais les cinq documents inscrits avec A et B (un commentaire le dit).',
  '2. **Les deux documents neufs ne seraient pas protégés au manifeste d\'empreintes**, comme les cinq inscrits avec A et B : limite documentaire suivie séparément.', '',
  '## 2. Périmètre du groupe D : proposition (partie 2)', '',
  '53 sens, 40 ENTRY, 41 fiches (dont une fusionnée, ゆっくり) ; thème T2-classe (11 sens portent aussi T2-nuls) ; 148 décisions, dont 46 sur les fonctions, citées en entier ; 123 anciens exemples ; 40 sens communs au lot 3 (cités, non rouverts), 13 hors des 377 ; 12 corrections retenues dans 9 ENTRY, dont une sur les fonctions (また, sens 2, `connecteur`), lues et non appliquées. Trois familles selon la fonction publiée : a `deictique` (15), b fonctions d\'A9 (10), c aucune (28). Huit points sensibles nommés, sans conclusion. **QD-2** porte sur la forme de la livraison : un rapport unique en trois sections (proposé) ou trois livraisons successives.', '',
  '## 3. Décisions attendues', '',
  '1. Accepter, ou non, la proposition d\'inscription de l\'arbitrage du groupe C telle qu\'elle est, puis autoriser distinctement l\'exécution unique de `' + I + 'application/appliquer-inscription-C.mjs`.',
  '2. **QD-1 à QD-4** (partie 2, §8) : le périmètre du groupe D, la forme de la livraison, la méthode, puis, distinctement, l\'ouverture de sa relecture.', '',
  'Les fichiers `01` à `04` de l\'export recopient la gouvernance et la conception actuelles, dont les inscriptions de A et B, appliquées ; `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ; `10` donne le diff de l\'arbre de travail depuis `39cce13`, fichiers non suivis compris.', '',
  '# Partie 1 · Inscription de l\'arbitrage du groupe C', '',
  '## 1.1 Manifeste de la proposition', '', clot(txt(PROP + 'manifeste.json'), 'json'), '',
  '## 1.2 Diffs des trois fichiers modifiés', '', ...C.filter((p) => M[p].depart).flatMap((p) => [titre(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), '', clot(txt(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), 'diff'), '']),
  '## 1.3 Les deux documents neufs, en entier', '', ...C.filter((p) => !M[p].depart).flatMap((p) => [titre(PROP + p), '', clot(txt(PROP + p), 'markdown'), '']),
  '## 1.4 Sortie de la préparation (code 0)', '', clot(txt(I + 'sortie-preparation.txt'), 'text'), '',
  '## 1.5 Sortie de l\'essai de l\'application sur copie jetable (code 0)', '', clot(txt(I + 'application/sortie-essai.txt'), 'text'), '',
  '## 1.6 Sources des scripts', '', ...['preparer-inscription-C.mjs', 'application/appliquer-inscription-C.mjs', 'application/essayer-inscription-C.mjs'].flatMap((s) => [titre(I + s) + (s.includes('appliquer') ? ' — non lancé' : ''), '', clot(txt(I + s), 'js'), '']),
  '# Partie 2 · Périmètre du groupe D', '', txt(O + 'proposition-perimetre-D.md').replace(/^# /, '## '), '',
  '## Annexe · Dossier factuel du groupe D (généré)', '', txt(O + 'dossier-D.md').replace(/^# .*\n/, '').replace(/^## /gm, '### '), '',
  '## Sortie de la préparation du dossier D (code 0)', '', clot(txt(O + 'sortie-preparation-D.txt'), 'text'), '',
  '## Source du script', '', titre(O + 'preparer-perimetre-D.mjs'), '', clot(txt(O + 'preparer-perimetre-D.mjs'), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets');
