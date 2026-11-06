// A2-05 · recherche d'omissions : assemble la note d'export de la préparation documentaire de l'inscription (1) du périmètre du groupe E accepté (QE-1 à QE-5)
// et (2) de l'arbitrage de la livraison E1. Lecture seule hors de la note ; refuse d'écraser une note existante ; vérifie le manifeste de la proposition, les empreintes,
// la conservation du texte livré dans les deux documents neufs et la conformité des sorties. Transposé de assembler-note-inscription-D-perimetre-E.mjs.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-inscription-E1.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', I = O + 'inscription-E1/', PROP = I + 'proposition/', SORTIE = 'a2-05-travail/note-export-omissions-inscription-E1.md';
const MANIF_SHA = '0be3ff06e30229f6defe7c3620380fd8bfe2a61690b9f224a999ff1ea4ab7e36';
const RN = 'docs/rapports/etape2-A2-05-omissions-interrogatif-', NP = RN + 'E-perimetre.md', NR = RN + 'E1.md';
const SRC = { [NP]: [O + 'proposition-perimetre-E.md', '9e5ad01276f377a2b0b61d699f0293ba9f9e764260a373ce2c54d4b41acf2b26'], [NR]: [O + 'rapport-relecture-E1.md', '8ff7352713317ed23f07e355c7a3691992bc54e8c1d7d7bf0391f4911859910e'] };
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (sha(PROP + 'manifeste.json') !== MANIF_SHA) throw new Error('manifeste de la proposition inattendu');
for (const [s, h] of Object.values(SRC)) if (sha(s) !== h) throw new Error('document relu modifié : ' + s);
for (const [f, re] of [[I + 'sortie-preparation.txt', /préparation conforme$/], [I + 'application/sortie-essai.txt', /essai conforme$/]]) { const t = txt(f); if (!re.test(t) || /^ÉCART/m.test(t)) throw new Error(f + ' : sortie non conforme'); }
const M = JSON.parse(txt(PROP + 'manifeste.json')); const C = Object.keys(M);
for (const p of C) if (sha(PROP + p) !== M[p].propose || (M[p].depart && sha(p) !== M[p].depart) || (!M[p].depart && existsSync(join(root, p)))) throw new Error('empreinte divergente ou document neuf déjà présent : ' + p);
// Chaque document neuf = document relu, statut remplacé et §0 inséré, rien d'autre : vérifié ici, pour justifier de ne recopier du rapport E1 que l'en-tête et le §0
for (const [p, [s]] of Object.entries(SRC)) {
  const v = txt(PROP + p), r = txt(s); const i0 = v.search(/^## 0\. /m), i1 = v.search(/^## 1\. /m), j1 = r.search(/^## 1\. /m);
  if (v.slice(i1) !== r.slice(j1)) throw new Error(p + ' : la partie à partir du §1 diffère du document relu');
  const hs = (t) => t.split('\n').filter((l) => !l.startsWith('**Statut**')).join('\n'); if (hs(v.slice(0, i0)) !== hs(r.slice(0, j1))) throw new Error(p + ' : l\'en-tête diffère du document relu, hors statut');
}
const titre = (p) => '### `' + p + '` — SHA-256 `' + sha(p) + '`';
const doc = ['# Note d\'export — A2-05 · recherche d\'omissions d\'`interrogatif` : inscription du périmètre du groupe E (QE-1 à QE-5) et de l\'arbitrage de la livraison E1 (préparée, non appliquée)', '',
  '**Date** : 2026-11-05.', '',
  '**Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé.', '',
  '**État de départ** : les inscriptions des arbitrages des groupes A, B, C et D sont appliquées dans l\'arbre de travail : trois fichiers modifiés (`ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2) et neuf documents neufs dans `docs/rapports/`, non committés. Le périmètre du groupe E (QE-1 à QE-4, puis QE-5) et l\'arbitrage de E1 ne sont pas encore inscrits.', '',
  '**Rien n\'est appliqué** : les fichiers visés gardent leurs empreintes de départ, et les deux documents neufs n\'existent pas dans `docs/rapports/`. **E2 et E3 ne sont pas commencées ; aucune correction lexicale n\'est préparée.** Aucune donnée lexicale, norme ou décision historique n\'est modifiée ; les 204 corrections restent non appliquées.', '',
  '**Demande** (relayée) : « Je t\'autorise uniquement à préparer, sans appliquer : l\'inscription documentaire de l\'arbitrage E1, avec les diffs, simulations et contrôles ; l\'actualisation documentaire nécessaire des arbitrages QE-1 à QE-4 sur l\'organisation de E1, E2 et E3, sans modifier leur portée. Le périmètre E2 est déjà accepté : 30 sens dans 27 ENTRY. Ne commence aucun verdict lexical sur E2 avant mon autorisation distincte, après vérification de l\'inscription E1. Ne commence pas E3. […] Fournis un export complet pour relecture de la préparation documentaire. »', '',
  '## 1. Ce qui est proposé', '',
  'Dossier : `' + I + '`. Manifeste de la proposition : SHA-256 `' + MANIF_SHA + '`. Cinq fichiers :', '', txt(PROP + 'table-diffs.md'), '',
  '**`ETAT-ACTUEL.md` et `ROADMAP.md`** reçoivent les mêmes remplacements ciblés, sur le modèle des inscriptions A à D :',
  '- la rubrique « Reste à faire » : groupe D et livraison E1 arbitrés le 2026-11-05 (152 sens : A 39, B 18, C 3, D 53, E1 39) ; périmètre du groupe E accepté, en trois livraisons par classe, chacune inscrite après son arbitrage ; 82 candidats restants (E2 30, E3 52) ; renvoi aux §8.122 à §8.126 ;',
  '- la « Prochaine action », identique dans les deux documents (C5f) : l\'ouverture de la relecture de E2, sur autorisation distincte après vérification de l\'inscription de E1, puis l\'inscription de son arbitrage ; puis, de même, E3 ;',
  '- dans `ROADMAP.md`, l\'en-tête : la livraison E1 y est ajoutée ; **la date reste au 2026-11-05** (vérifiée, non remplacée) ;',
  '- dans `ETAT-ACTUEL.md`, une ligne de journal datée du 2026-11-05.', '',
  '**Le bloc `a2-05:etat` ne change pas** : aucun des nombres qu\'il porte (377, 204, 177, V1-32, 47) ne bouge.', '',
  '**Bilan du volet 2, §8.126**, ajouté à la fin : le périmètre du groupe E et son organisation (QE-1 à QE-4), la livraison E1 arbitrée (QE-5 et l\'arbitrage en sept points), les décomptes séparés et ce qui n\'est pas modifié.', '',
  '**Deux documents neufs dans `docs/rapports/`**, recopiés des documents relus. Chacun reçoit un statut et un §0 qui citent mot pour mot les décisions relayées ; le reste du texte est conservé tel qu\'il a été livré (vérifié par la préparation et par cet assembleur) :',
  '- `etape2-A2-05-omissions-interrogatif-E-perimetre.md` : le périmètre de E accepté ; son §0 cite QE-1 à QE-4, puis QE-5 ;',
  '- `…-E1.md` : le rapport de E1 arbitré ; son §0 cite les sept points de l\'arbitrage et l\'inchangé.', '',
  'Leurs fichiers d\'origine, dans `a2-05-travail/`, ne sont pas modifiés.', '',
  '**L\'actualisation de QE-1 à QE-4, sans en modifier la portée.** Ces arbitrages n\'étaient inscrits nulle part. Ils le sont par trois moyens :',
  '- le §0 du document de périmètre, qui les cite mot pour mot ;',
  '- le premier paragraphe du §8.126 du bilan ;',
  '- la rubrique « Reste à faire » des deux documents de pilotage.',
  'Le seul point où l\'arbitrage diffère de la proposition est QE-4 : **une inscription après chaque livraison arbitrée**, et non l\'inscription unique après E3 proposée au §4 du périmètre. Le statut et le §0 du document de périmètre le disent, et précisent que le §0 fait foi ; le §4 est conservé tel qu\'il a été livré.', '',
  '**Simulation de l\'état final sur copie jetable** (partie 1) :',
  '- aperçu de synchronisation vide ;',
  '- relais 29 sur 30, C9b seul, en mode normal et strict ; C5f, C8 et C9a conformes ;',
  '- 47 empreintes ; contrôle du périmètre opérationnel 29 sur 29 ;',
  '- couverture, pilote, recalculs T5 à T9 ; `assemble`, `verify`, 510 tests ;',
  '- état calculé inchangé ; les neuf documents inscrits avec A à D inchangés ;',
  '- deux sabotages de la prochaine action détectés (C5f).', '',
  '**Essai de l\'application sur copie jetable** (partie 1) :',
  '- neuf refus avant écriture : index, sauvegarde, manifeste, version proposée, diff relu, document neuf modifié, fichier de départ modifié, document neuf déjà présent, donnée modifiée ;',
  '- exécution nominale : 113 vérifications conformes ; les cinq fichiers visés seuls sont modifiés ;',
  '- seconde exécution refusée ; sabotages C5f détectés ; dépôt réel inchangé.', '',
  '**Points à noter.**',
  '1. Les scripts sont ceux de D, transposés. Ce qui change :',
  '   - les chemins, le manifeste et les empreintes de départ (arrivée de l\'inscription D) ;',
  '   - les textes et les sabotages ;',
  '   - la date de `ROADMAP.md` n\'est pas remplacée : elle est déjà au 2026-11-05, et la préparation le vérifie ;',
  '   - un contrôle est ajouté à la préparation : le texte livré est conservé dans les deux documents neufs.',
  '   La liste des fichiers préservés de l\'application s\'étend aux deux documents inscrits avec D et aux sources de E1.',
  '2. **Citation de QE-4.** Dans le message relayé, le dernier « e » de « arbitrée » est la lettre cyrillique U+0435. Le §0 la cite avec la lettre latine et le signale.',
  '3. **Les deux documents neufs ne seraient pas protégés au manifeste d\'empreintes**, comme les neuf inscrits avec A à D : c\'est une limite documentaire, suivie séparément.',
  '4. **Le premier essai de l\'application a rendu un écart**, « dépôt réel inchangé ». La cause n\'était pas le script : sa sortie était redirigée dans le dépôt réel pendant l\'essai. Le contrôle l\'a détecté à juste titre. L\'essai a été relancé avec la sortie hors du dépôt, puis recopiée ; il est conforme.', '',
  '## 2. Décisions attendues', '',
  '1. Accepter, ou non, la proposition d\'inscription telle qu\'elle est (cinq fichiers, manifeste `' + MANIF_SHA + '`).',
  '2. Puis autoriser distinctement l\'exécution unique de `' + I + 'application/appliquer-inscription-E1.mjs`.',
  '3. Après vérification de l\'application, autoriser distinctement, ou non, l\'ouverture de la relecture de E2.', '',
  'Les fichiers de l\'export à ignorer ou à lire autrement :',
  '- `01` à `04` recopient la gouvernance et la conception actuelles, dont les inscriptions de A à D, appliquées ;',
  '- `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ;',
  '- `10` donne le diff de l\'arbre de travail depuis `39cce13`, fichiers non suivis compris.', '',
  '# Partie 1 · Inscription', '',
  '## 1.1 Manifeste de la proposition', '', clot(txt(PROP + 'manifeste.json'), 'json'), '',
  '## 1.2 Diffs des trois fichiers modifiés', '', ...C.filter((p) => M[p].depart).flatMap((p) => [titre(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), '', clot(txt(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), 'diff'), '']),
  '## 1.3 Les deux documents neufs', '',
  'Le document de périmètre de E est recopié **en entier**.', '',
  'Le rapport de E1 (' + txt(PROP + NR).split('\n').length + ' lignes) est recopié **de son en-tête jusqu\'à la fin de son §0**. Le reste est, mot pour mot, le rapport relu : `' + SRC[NR][0] + '`, SHA-256 `' + SRC[NR][1] + '`, livré en entier dans l\'export de la relecture de E1. L\'assembleur de cette note le vérifie avant d\'écrire :',
  '- la partie qui commence au §1 est identique au rapport relu ;',
  '- l\'en-tête est identique, hors de la ligne de statut.', '',
  ...C.filter((p) => !M[p].depart).flatMap((p) => { const t = txt(PROP + p); const coupe = p === NR ? t.slice(0, t.search(/^## 1\. /m)).trimEnd() + '\n\n[… à partir du §1 : identique au rapport relu, SHA-256 ' + SRC[NR][1] + ' …]' : t; return [titre(PROP + p), '', clot(coupe, 'markdown'), '']; }),
  '## 1.4 Sortie de la préparation (code 0)', '', clot(txt(I + 'sortie-preparation.txt'), 'text'), '',
  '## 1.5 Sortie de l\'essai de l\'application sur copie jetable (code 0)', '', clot(txt(I + 'application/sortie-essai.txt'), 'text'), '',
  '## 1.6 Sources des scripts', '', ...['preparer-inscription-E1.mjs', 'application/appliquer-inscription-E1.mjs', 'application/essayer-inscription-E1.mjs'].flatMap((s) => [titre(I + s) + (s.includes('appliquer') ? ' — non lancé' : ''), '', clot(txt(I + s), 'js'), '']), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n') + '\n') + ' octets');
