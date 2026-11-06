// A2-05 · recherche d'omissions : assemble la note d'export de deux propositions, (1) inscription documentaire de l'arbitrage du groupe B, (2) périmètre du groupe C.
// Lecture seule hors de la note ; refuse d'écraser une note existante ; vérifie le manifeste de la proposition d'inscription et la conformité des sorties.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-inscription-B-perimetre-C.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', I = O + 'inscription-B/', PROP = I + 'proposition/', SORTIE = 'a2-05-travail/note-export-omissions-inscription-B-perimetre-C.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (sha(PROP + 'manifeste.json') !== '68716251453c1d67980d77590f90b6c39b5af6f9b58846cf6f768e1c5aa19bb9') throw new Error('manifeste de la proposition inattendu');
for (const [f, re] of [[I + 'sortie-preparation.txt', /préparation conforme$/], [I + 'application/sortie-essai.txt', /essai conforme$/], [O + 'sortie-preparation-C.txt', /préparation conforme ; aucun verdict$/]]) if (!re.test(txt(f))) throw new Error(f + ' : sortie non conforme');
const M = JSON.parse(txt(PROP + 'manifeste.json')); const C = Object.keys(M);
for (const p of C) if (sha(PROP + p) !== M[p].propose || (M[p].depart && sha(p) !== M[p].depart)) throw new Error('empreinte divergente : ' + p);
const titre = (p) => '### `' + p + '` — SHA-256 `' + sha(p) + '`';
const doc = ['# Note d\'export — A2-05 · recherche d\'omissions d\'`interrogatif` : inscription de l\'arbitrage du groupe B (préparée, non appliquée) et périmètre du groupe C (proposé, non arbitré)', '',
  '**Date** : 2026-11-04. **Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé. L\'inscription de l\'arbitrage du groupe A est appliquée dans l\'arbre de travail (six fichiers, non committés) : c\'est l\'état de départ de la présente proposition. **Rien n\'est appliqué** : les fichiers visés gardent leurs empreintes de départ, les deux documents neufs n\'existent pas dans `docs/rapports/`. **Aucun verdict n\'est pris sur le groupe C.** Aucune donnée lexicale, norme ou décision historique n\'est modifiée ; les 204 corrections restent non appliquées ; les groupes D et E ne sont pas commencés.', '',
  '**Demande** (relayée) : « Je t\'autorise uniquement à préparer, sans appliquer : l\'inscription documentaire de l\'arbitrage B, avec les diffs, les simulations et les contrôles nécessaires ; le périmètre du groupe C, conformément au découpage accepté : 3 sens dans 2 ENTRY, avec les identifiants, les filtres d\'origine, les fiches sources et les décisions historiques pertinentes. »', '',
  '## 1. Inscription de l\'arbitrage du groupe B : ce qui est proposé', '',
  'Dossier : `' + I + '`. Manifeste de la proposition : SHA-256 `' + sha(PROP + 'manifeste.json') + '`. Cinq fichiers :', '', txt(PROP + 'table-diffs.md'), '',
  '- **`ETAT-ACTUEL.md` et `ROADMAP.md`**, mêmes remplacements ciblés, sur le modèle de l\'inscription A :',
  '  - la rubrique « Reste à faire » : groupes A et B arbitrés (57 sens), 177 candidats restants dans les groupes C à E, renvoi au §8.123 ;',
  '  - la « Prochaine action », identique dans les deux documents (C5f) : la décision sur le périmètre du groupe C, puis sa relecture, puis D et E, chacun sur autorisation distincte ;',
  '  - dans `ROADMAP.md`, l\'en-tête (la date reste au 2026-11-04) ; dans `ETAT-ACTUEL.md`, une ligne de journal datée du 2026-11-04.',
  '  **Le bloc `a2-05:etat` ne change pas** : aucun des nombres qu\'il porte (377, 204, 177, V1-32, 47) ne bouge.',
  '- **Bilan du volet 2, §8.123**, ajouté à la fin : périmètre de B, groupe B arbitré, QB-4, observations conservées, décomptes séparés, ce qui n\'est pas modifié.',
  '- **Deux documents neufs dans `docs/rapports/`**, recopiés des documents relus, avec un statut et un §0 qui citent mot pour mot les décisions relayées ; le reste du texte est conservé tel qu\'il a été livré : `etape2-A2-05-omissions-interrogatif-B-perimetre.md` (périmètre de B accepté ; §0 : QB-1 à QB-4 et l\'autorisation d\'ouvrir la relecture) et `…-B.md` (rapport de B arbitré ; §0 : les cinq points de l\'arbitrage). Leurs fichiers d\'origine, dans `a2-05-travail/`, ne sont pas modifiés. Comme pour A, aucune mesure n\'est réinscrite : B n\'a ni mesure ni découpage propres.', '',
  '**Simulation de l\'état final sur copie jetable** (sortie complète en partie 1) : aperçu de synchronisation vide ; relais 29 sur 30, C9b seul, en mode normal et strict ; C5f, C8 et C9a conformes ; 47 empreintes ; contrôle du périmètre opérationnel 29 sur 29 ; couverture, pilote, recalculs T5 à T9 ; `assemble`, `verify`, 510 tests ; état calculé inchangé ; les trois documents inscrits avec A inchangés ; deux sabotages de la prochaine action détectés (C5f).', '',
  '**Essai de l\'application sur copie jetable** (partie 1) :',
  '- neuf refus avant écriture : index, sauvegarde, manifeste, version proposée, diff relu, document neuf modifié, fichier de départ modifié, document neuf déjà présent, donnée modifiée ;',
  '- exécution nominale : 92 vérifications conformes, les cinq fichiers visés seuls modifiés ;',
  '- seconde exécution refusée ; sabotages C5f détectés ; dépôt réel inchangé.', '',
  '**Points à noter.**',
  '1. Les scripts d\'application et d\'essai de B sont ceux de A, transposés par substitutions (chemins, manifeste, cinq fichiers au lieu de six, regex et sabotages) ; la liste des fichiers préservés est étendue aux trois documents inscrits avec A, aux sources de B et aux fichiers du périmètre C.',
  '2. Un premier lancement de l\'essai a rendu un écart « dépôt réel inchangé » : la sortie de l\'essai était écrite dans le dépôt pendant l\'essai. Relancé avec la sortie écrite hors du dépôt, puis recopiée : conforme. Aucun script n\'a été modifié pour cela.',
  '3. **Les deux documents neufs ne seraient pas protégés au manifeste d\'empreintes**, comme les trois inscrits avec A : limite documentaire suivie séparément.', '',
  '## 2. Périmètre du groupe C : proposition (partie 2)', '',
  '3 sens, 2 ENTRY ; thème T2-serie : いつも (`v_494`) contient le porteur いつ, どうも (`v_499`) contient le porteur どう. Les trois sens sont communs au lot 3 (D5 en T8, D6 en T6, tous conformes) ; sept décisions de journal, aucune corrigée ni rouverte ; aucune correction retenue. Les deux fiches complètes, leurs six anciens exemples, les ENTRY publiées et les sept décisions sont recopiés en entier dans l\'annexe. Méthode de A et B.', '',
  '## 3. Décisions attendues', '',
  '1. Accepter, ou non, la proposition d\'inscription de l\'arbitrage du groupe B telle qu\'elle est, puis autoriser distinctement l\'exécution unique de `' + I + 'application/appliquer-inscription-B.mjs`.',
  '2. **QC-1 à QC-4** (partie 2, §8) : le périmètre du groupe C, puis, distinctement, l\'ouverture de sa relecture.', '',
  'Les fichiers `01` à `04` de l\'export recopient la gouvernance et la conception actuelles, dont l\'inscription de A, appliquée ; `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ; `10` donne le diff de l\'arbre de travail depuis `39cce13`, fichiers non suivis compris.', '',
  '# Partie 1 · Inscription de l\'arbitrage du groupe B', '',
  '## 1.1 Manifeste de la proposition', '', clot(txt(PROP + 'manifeste.json'), 'json'), '',
  '## 1.2 Diffs des trois fichiers modifiés', '', ...C.filter((p) => M[p].depart).flatMap((p) => [titre(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), '', clot(txt(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), 'diff'), '']),
  '## 1.3 Les deux documents neufs, en entier', '', ...C.filter((p) => !M[p].depart).flatMap((p) => [titre(PROP + p), '', clot(txt(PROP + p), 'markdown'), '']),
  '## 1.4 Sortie de la préparation (code 0)', '', clot(txt(I + 'sortie-preparation.txt'), 'text'), '',
  '## 1.5 Sortie de l\'essai de l\'application sur copie jetable (code 0)', '', clot(txt(I + 'application/sortie-essai.txt'), 'text'), '',
  '## 1.6 Sources des scripts', '', ...['preparer-inscription-B.mjs', 'application/appliquer-inscription-B.mjs', 'application/essayer-inscription-B.mjs'].flatMap((s) => [titre(I + s) + (s.includes('appliquer') ? ' — non lancé' : ''), '', clot(txt(I + s), 'js'), '']),
  '# Partie 2 · Périmètre du groupe C', '', txt(O + 'proposition-perimetre-C.md').replace(/^# /, '## '), '',
  '## Annexe · Dossier factuel du groupe C (généré)', '', txt(O + 'dossier-C.md').replace(/^# .*\n/, '').replace(/^## /gm, '### ').replace(/^### (Fiche|Anciens|ENTRY|Décisions)/gm, '#### $1'), '',
  '## Sortie de la préparation du dossier C (code 0)', '', clot(txt(O + 'sortie-preparation-C.txt'), 'text'), '',
  '## Source du script', '', titre(O + 'preparer-perimetre-C.mjs'), '', clot(txt(O + 'preparer-perimetre-C.mjs'), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets');
