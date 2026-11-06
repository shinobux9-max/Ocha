// A2-05 · recherche d'omissions : assemble la note d'export de deux propositions, (1) inscription documentaire de l'arbitrage du groupe A, (2) périmètre du groupe B.
// Lecture seule hors de la note ; refuse d'écraser une note existante ; vérifie le manifeste de la proposition d'inscription et la conformité des sorties.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-inscription-B.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', I = O + 'inscription-A/', PROP = I + 'proposition/', SORTIE = 'a2-05-travail/note-export-omissions-inscription-A-perimetre-B.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (sha(PROP + 'manifeste.json') !== 'f3b82a78a58bd2f030f6ae38d1ddf3ad582599568496233480a989f2e900536b') throw new Error('manifeste de la proposition inattendu');
for (const [f, re] of [[I + 'sortie-preparation.txt', /préparation conforme$/], [I + 'application/sortie-essai.txt', /essai conforme$/], [O + 'sortie-preparation-B.txt', /préparation conforme ; aucun verdict$/]]) if (!re.test(txt(f))) throw new Error(f + ' : sortie non conforme');
const M = JSON.parse(txt(PROP + 'manifeste.json')); const C = Object.keys(M);
for (const p of C) if (sha(PROP + p) !== M[p].propose || (M[p].depart && sha(p) !== M[p].depart)) throw new Error('empreinte divergente : ' + p);
const titre = (p) => '### `' + p + '` — SHA-256 `' + sha(p) + '`';
const doc = ['# Note d\'export — A2-05 · recherche d\'omissions d\'`interrogatif` : inscription de l\'arbitrage du groupe A (préparée, non appliquée) et périmètre du groupe B (proposé, non arbitré)', '',
  '**Date** : 2026-11-04. **Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé. **Rien n\'est appliqué** : les fichiers visés gardent leurs empreintes de départ, les trois documents neufs n\'existent pas dans `docs/rapports/`. **Aucun verdict n\'est pris sur le groupe B.** Aucune donnée lexicale, norme ou décision historique n\'est modifiée ; les 204 corrections restent non appliquées.', '',
  '**Demande** (relayée) : « Prépare maintenant, sans les appliquer, les modifications documentaires nécessaires pour inscrire cet arbitrage du groupe A. Prépare également le périmètre du groupe B : 18 sens dans 15 ENTRY, avec les identifiants, le thème, les sources disponibles, les décisions historiques pertinentes et la méthode de relecture selon A10. »', '',
  '## 1. Inscription de l\'arbitrage du groupe A : ce qui est proposé', '',
  'Dossier : `' + I + '`. Manifeste de la proposition : SHA-256 `' + sha(PROP + 'manifeste.json') + '`. Six fichiers :', '', txt(PROP + 'table-diffs.md'), '',
  '- **`ETAT-ACTUEL.md` et `ROADMAP.md`**, mêmes remplacements ciblés : la rubrique « Reste à faire » (la recherche d\'omissions n\'est plus « fermée » : mesure prise en acte, découpage accepté, groupe A arbitré, 195 candidats restants) ; la « Prochaine action » (la décision sur le périmètre du groupe B, puis sa relecture, puis C à E, chacun sur autorisation distincte), identique dans les deux documents (C5f) ; dans `ROADMAP.md`, la date et l\'en-tête ; dans `ETAT-ACTUEL.md`, une ligne de journal datée du 2026-11-04. **Le bloc `a2-05:etat` ne change pas** : aucun des nombres qu\'il porte (377, 204, 177, V1-32, 47) ne bouge.',
  '- **Bilan du volet 2, §8.122**, ajouté à la fin : mesure, découpage, groupe A arbitré, décomptes séparés, ce qui n\'est pas modifié.',
  '- **Trois documents neufs dans `docs/rapports/`**, recopiés des documents relus, avec un statut et un §0 qui citent mot pour mot les décisions relayées ; le reste du texte est conservé tel qu\'il a été livré : `etape2-A2-05-omissions-interrogatif-mesure.md` (mesure prise en acte), `…-A-perimetre.md` (découpage et périmètre de A acceptés), `…-A.md` (rapport de A arbitré). Leurs fichiers d\'origine, dans `a2-05-travail/`, ne sont pas modifiés.', '',
  '**Simulation de l\'état final sur copie jetable** (sortie complète en partie 1) : aperçu de synchronisation vide ; relais 29 sur 30, C9b seul, en mode normal et strict ; C5f, C8 et C9a conformes ; 47 empreintes ; contrôle du périmètre opérationnel 29 sur 29 ; couverture, pilote, recalculs T5 à T9 ; `assemble`, `verify`, 510 tests ; état calculé inchangé ; deux sabotages de la prochaine action détectés (C5f). **Essai de l\'application sur copie jetable** (partie 1) : neuf refus avant écriture (index, sauvegarde, manifeste, version proposée, diff relu, document neuf modifié, fichier de départ modifié, document neuf déjà présent, donnée modifiée) ; exécution nominale, 84 vérifications conformes, les six fichiers visés seuls modifiés ; seconde exécution refusée ; sabotages C5f détectés ; dépôt réel inchangé.', '',
  '**Points à noter.**',
  '1. **Choix proposé (QI-1)** : inscrire aussi la mesure et le périmètre de A dans `docs/rapports/`, pour que l\'arbitrage du groupe A repose sur des documents officiels ; l\'autre voie serait d\'inscrire le seul rapport de A, en citant la mesure et le périmètre dans le dossier de travail.',
  '2. **Ces trois documents ne seraient pas protégés au manifeste d\'empreintes** : l\'outillage d\'empreintes ne couvre que les rapports du lot 3, et la recherche d\'omissions en est distincte. Leur protection relèverait d\'une décision et d\'un outillage séparés ; aucun contrôle actuel ne détecte une modification de leur texte.',
  '3. **Une correction faite pendant l\'essai** : la première version du script d\'application vérifiait que `docs/conception/` était identique à `HEAD`, ce qui est faux depuis l\'installation non committée d\'A10 ; l\'essai l\'a révélé (refus à la précondition P10). Le script vérifie désormais `data/`, `reconstruction/`, `tools/` et `tests/` contre `HEAD`, et A10, le sommaire et `CLAUDE.md` restent parmi les fichiers préservés, comparés avant et après. L\'essai a ensuite été relancé, conforme.',
  '4. Le cas « `CLAUDE.md` modifié avant l\'exécution » n\'est pas un motif de refus : il n\'est contrôlé que pendant l\'exécution (préservé, comparé avant et après). Il a été retiré de l\'essai, d\'où la numérotation des refus qui saute R9.', '',
  '## 2. Périmètre du groupe B : proposition (partie 2)', '',
  '18 sens, 15 ENTRY ; thème T2-journal, en trois familles : (a) 13 sens dont une décision emploie « demander » ou « question » au sens courant ; (b) 4 sens de こちら, そちら et それ, dont une décision de tags dit « démonstratif ou interrogatif d\'usage général » (D0637, D0672, D0677) ; (c) どうぞ (D1500). 15 fiches, 45 anciens exemples, 53 décisions dont 17 citées en entier ; 7 corrections retenues ; 8 sens communs au lot 3 ; méthode de A.', '',
  '## 3. Décisions attendues', '',
  '1. **QI-1** : inscrire les trois documents (mesure, périmètre de A, rapport de A) ou le seul rapport de A.',
  '2. Accepter, ou non, la proposition d\'inscription telle qu\'elle est, puis autoriser distinctement l\'exécution unique de `' + I + 'application/appliquer-inscription-A.mjs`.',
  '3. **QB-1 à QB-5** (partie 2, §7) : le périmètre du groupe B, puis, distinctement, l\'ouverture de sa relecture.', '',
  'Les fichiers `01` à `04` de l\'export recopient la gouvernance et la conception actuelles (non modifiées) ; `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ; `10` donne le diff de l\'arbre de travail depuis `39cce13`, fichiers non suivis compris.', '',
  '# Partie 1 · Inscription de l\'arbitrage du groupe A', '',
  '## 1.1 Manifeste de la proposition', '', clot(txt(PROP + 'manifeste.json'), 'json'), '',
  '## 1.2 Diffs des trois fichiers modifiés', '', ...C.filter((p) => M[p].depart).flatMap((p) => [titre(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), '', clot(txt(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), 'diff'), '']),
  '## 1.3 Les trois documents neufs, en entier', '', ...C.filter((p) => !M[p].depart).flatMap((p) => [titre(PROP + p), '', clot(txt(PROP + p), 'markdown'), '']),
  '## 1.4 Sortie de la préparation (code 0)', '', clot(txt(I + 'sortie-preparation.txt'), 'text'), '',
  '## 1.5 Sortie de l\'essai de l\'application sur copie jetable (code 0)', '', clot(txt(I + 'application/sortie-essai.txt'), 'text'), '',
  '## 1.6 Sources des scripts', '', ...['preparer-inscription-A.mjs', 'application/appliquer-inscription-A.mjs', 'application/essayer-inscription-A.mjs'].flatMap((s) => [titre(I + s) + (s.includes('appliquer') ? ' — non lancé' : ''), '', clot(txt(I + s), 'js'), '']),
  '# Partie 2 · Périmètre du groupe B', '', txt(O + 'proposition-perimetre-B.md').replace(/^# /, '## '), '',
  '## Annexe · Dossier factuel du groupe B (généré)', '', txt(O + 'dossier-B.md').replace(/^# .*\n/, ''), '',
  '## Sortie de la préparation du dossier B (code 0)', '', clot(txt(O + 'sortie-preparation-B.txt'), 'text'), '',
  '## Source du script', '', titre(O + 'preparer-perimetre-B.mjs'), '', clot(txt(O + 'preparer-perimetre-B.mjs'), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets');
