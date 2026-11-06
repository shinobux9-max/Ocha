// A2-05 · recherche d'omissions : assemble la note d'export de deux propositions, (1) inscription documentaire de l'arbitrage du groupe D, (2) périmètre du groupe E
// et organisation de sa relecture. Lecture seule hors de la note ; refuse d'écraser une note existante ; vérifie le manifeste de la proposition et la conformité des sorties.
// Usage : node a2-05-travail/omissions-temps3/assembler-note-inscription-D-perimetre-E.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', I = O + 'inscription-D/', PROP = I + 'proposition/', SORTIE = 'a2-05-travail/note-export-omissions-inscription-D-perimetre-E.md';
const RAPPORT_RELU = O + 'rapport-relecture-D.md', RAPPORT_RELU_SHA = '7d8af0041278a187ecf763f4e7f82f9c65b262ca6c3f577830bd5d832e597434';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
if (sha(PROP + 'manifeste.json') !== '504ff4459d20333dd5571c077693c5adc339768004031e316e46885d63929a30') throw new Error('manifeste de la proposition inattendu');
if (sha(RAPPORT_RELU) !== RAPPORT_RELU_SHA) throw new Error('rapport de relecture de D modifié');
for (const [f, re] of [[I + 'sortie-preparation.txt', /préparation conforme$/], [I + 'application/sortie-essai.txt', /essai conforme$/], [O + 'sortie-preparation-E.txt', /préparation conforme ; aucun verdict$/]]) if (!re.test(txt(f))) throw new Error(f + ' : sortie non conforme');
const M = JSON.parse(txt(PROP + 'manifeste.json')); const C = Object.keys(M);
for (const p of C) if (sha(PROP + p) !== M[p].propose || (M[p].depart && sha(p) !== M[p].depart)) throw new Error('empreinte divergente : ' + p);
// Le rapport de D proposé = rapport relu, statut remplacé et §0 inséré, rien d'autre : vérifié ici, pour justifier de n'en recopier que l'en-tête et le §0
const NR = 'docs/rapports/etape2-A2-05-omissions-interrogatif-D.md'; {
  const p = txt(PROP + NR), r = txt(RAPPORT_RELU); const i0 = p.search(/^## 0\. /m), i1 = p.search(/^## 1\. /m), j1 = r.search(/^## 1\. /m);
  if (p.slice(i1) !== r.slice(j1)) throw new Error('rapport de D proposé : la partie à partir du §1 diffère du rapport relu');
  const avant = (t) => t.split('\n').filter((l) => !l.startsWith('**Statut**')).join('\n'); if (avant(p.slice(0, i0)) !== avant(r.slice(0, j1))) throw new Error('rapport de D proposé : l\'en-tête diffère du rapport relu, hors statut');
}
const titre = (p) => '### `' + p + '` — SHA-256 `' + sha(p) + '`';
const doc = ['# Note d\'export — A2-05 · recherche d\'omissions d\'`interrogatif` : inscription de l\'arbitrage du groupe D (préparée, non appliquée) et périmètre du groupe E (proposé, non arbitré)', '',
  '**Date** : 2026-11-05.', '',
  '**Référence** : `HEAD` et `origin/ocha-v2` à `39cce13` ; rien n\'est indexé, committé ni poussé.', '',
  '**État de départ** : les inscriptions des arbitrages des groupes A, B et C sont appliquées dans l\'arbre de travail : trois fichiers modifiés (`ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2) et sept documents neufs dans `docs/rapports/`, non committés.', '',
  '**Rien n\'est appliqué** : les fichiers visés gardent leurs empreintes de départ, et les deux documents neufs de D n\'existent pas dans `docs/rapports/`. **Aucun verdict n\'est pris sur le groupe E.** Aucune donnée lexicale, norme ou décision historique n\'est modifiée ; les 204 corrections restent non appliquées.', '',
  '**Demande** (relayée) : « Je t\'autorise uniquement à préparer, sans appliquer : l\'inscription documentaire de l\'arbitrage D, avec diffs, simulations et contrôles ; le périmètre du groupe E, dernier groupe : 121 sens dans 107 ENTRY, avec identifiants, thème, filtres d\'origine, sources disponibles, décisions historiques et corrections retenues pertinentes. Pour le groupe E, propose une organisation de relecture adaptée à sa taille, sans prendre de décision lexicale. […] Fournis un export complet pour relecture indépendante. »', '',
  '## 1. Inscription de l\'arbitrage du groupe D : ce qui est proposé', '',
  'Dossier : `' + I + '`. Manifeste de la proposition : SHA-256 `' + sha(PROP + 'manifeste.json') + '`. Cinq fichiers :', '', txt(PROP + 'table-diffs.md'), '',
  '**`ETAT-ACTUEL.md` et `ROADMAP.md`** reçoivent les mêmes remplacements ciblés, sur le modèle des inscriptions A, B et C :',
  '- la rubrique « Reste à faire » : groupes A, B et C arbitrés le 2026-11-04, groupe D le 2026-11-05 (113 sens), 121 candidats restants dans le groupe E, renvoi aux §8.122 à §8.125 ;',
  '- la « Prochaine action », identique dans les deux documents (C5f) : la décision sur le périmètre du groupe E et sur l\'organisation de sa relecture, puis, sur autorisation distincte, cette relecture ;',
  '- dans `ROADMAP.md`, l\'en-tête : **la date passe au 2026-11-05**, et le groupe D y est ajouté ;',
  '- dans `ETAT-ACTUEL.md`, une ligne de journal datée du 2026-11-05.', '',
  '**Le bloc `a2-05:etat` ne change pas** : aucun des nombres qu\'il porte (377, 204, 177, V1-32, 47) ne bouge.', '',
  '**Bilan du volet 2, §8.125**, ajouté à la fin. Il couvre le périmètre de D, le groupe D arbitré, la lecture des phrases interrogatives, たぶん et ちょっと, les observations du §3.3 et du §8, les décomptes séparés et ce qui n\'est pas modifié.', '',
  '**Deux documents neufs dans `docs/rapports/`**, recopiés des documents relus. Chacun reçoit un statut et un §0 qui citent mot pour mot les décisions relayées ; le reste du texte est conservé tel qu\'il a été livré :',
  '- `etape2-A2-05-omissions-interrogatif-D-perimetre.md` : le périmètre de D accepté ; son §0 cite QD-1 à QD-3, puis QD-4 ;',
  '- `…-D.md` : le rapport de D arbitré ; son §0 cite les six points de l\'arbitrage et l\'inchangé.', '',
  'Leurs fichiers d\'origine, dans `a2-05-travail/`, ne sont pas modifiés.', '',
  '**Simulation de l\'état final sur copie jetable** (sortie complète en partie 1) :',
  '- aperçu de synchronisation vide ;',
  '- relais 29 sur 30, C9b seul, en mode normal et strict ; C5f, C8 et C9a conformes ;',
  '- 47 empreintes ; contrôle du périmètre opérationnel 29 sur 29 ;',
  '- couverture, pilote, recalculs T5 à T9 ; `assemble`, `verify`, 510 tests ;',
  '- état calculé inchangé ; les sept documents inscrits avec A, B et C inchangés ;',
  '- deux sabotages de la prochaine action détectés (C5f).', '',
  '**Essai de l\'application sur copie jetable** (partie 1) :',
  '- neuf refus avant écriture : index, sauvegarde, manifeste, version proposée, diff relu, document neuf modifié, fichier de départ modifié, document neuf déjà présent, donnée modifiée ;',
  '- exécution nominale : 108 vérifications conformes ; les cinq fichiers visés seuls sont modifiés ;',
  '- seconde exécution refusée ; sabotages C5f détectés ; dépôt réel inchangé.', '',
  '**Points à noter.**',
  '1. Les scripts de D sont ceux de C, transposés. Ce qui change :',
  '   - les chemins, le manifeste et les empreintes de départ (arrivée de l\'inscription C) ;',
  '   - les textes, les sabotages et la date du 2026-11-05 ;',
  '   - la mise à jour de la date de `ROADMAP.md`, qui est nouvelle.',
  '   La liste des fichiers préservés de l\'application s\'étend aux deux documents inscrits avec C, aux sources de D et aux fichiers du périmètre E.',
  '2. **Les deux documents neufs ne seraient pas protégés au manifeste d\'empreintes**, comme les sept inscrits avec A, B et C : c\'est une limite documentaire, suivie séparément.', '',
  '## 2. Périmètre du groupe E et organisation de sa relecture : proposition (partie 2)', '',
  '**Le périmètre** : 121 sens, 107 ENTRY, 115 fiches (huit fusionnées), thème T2-nuls.',
  '- 96 sens sans catégorie, 24 sans type, un sans les deux.',
  '- 339 décisions, dont 14 sur les fonctions, citées en entier ; aucune ne parle de la question.',
  '- 345 anciens exemples ; 36 phrases en forme de question, décrites comme fait de surface.',
  '- Aucun sens commun au lot 3.',
  '- Un verdict arbitré du volet 2 pour chacun des 121 sens (L 114, L deux fois 1, C 6), cité et non rouvert.',
  '- 43 corrections retenues dans 31 ENTRY, aucune sur les fonctions, lues et non appliquées.', '',
  '**L\'organisation proposée** : trois livraisons par classe, chacune sur autorisation distincte, et une inscription unique après E3.',
  '- E1 : 39 noms ;',
  '- E2 : 30 adjectifs ;',
  '- E3 : 52 verbes.', '',
  'Dix points sensibles sont nommés, sans conclusion. **QE-1 à QE-5** sont au §8.', '',
  '## 3. Décisions attendues', '',
  '1. Accepter, ou non, la proposition d\'inscription de l\'arbitrage du groupe D telle qu\'elle est, puis autoriser distinctement l\'exécution unique de `' + I + 'application/appliquer-inscription-D.mjs`.',
  '2. **QE-1 à QE-5** (partie 2, §8) :',
  '   - le périmètre du groupe E ;',
  '   - la forme de la livraison ;',
  '   - la méthode ;',
  '   - l\'inscription ;',
  '   - puis, distinctement, l\'ouverture de la première relecture.', '',
  'Les fichiers de l\'export à ignorer ou à lire autrement :',
  '- `01` à `04` recopient la gouvernance et la conception actuelles, dont les inscriptions de A, B et C, appliquées ;',
  '- `06` à `09` portent le « lot courant » de l\'outil générique, sans rapport avec A2-05 : à ignorer ;',
  '- `10` donne le diff de l\'arbre de travail depuis `39cce13`, fichiers non suivis compris.', '',
  '# Partie 1 · Inscription de l\'arbitrage du groupe D', '',
  '## 1.1 Manifeste de la proposition', '', clot(txt(PROP + 'manifeste.json'), 'json'), '',
  '## 1.2 Diffs des trois fichiers modifiés', '', ...C.filter((p) => M[p].depart).flatMap((p) => [titre(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), '', clot(txt(PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), 'diff'), '']),
  '## 1.3 Les deux documents neufs', '',
  'Le document de périmètre de D est recopié **en entier**.', '',
  'Le rapport de D (1 488 lignes) est recopié **de son en-tête jusqu\'à la fin de son §0**. Le reste est, mot pour mot, le rapport relu : `' + RAPPORT_RELU + '`, SHA-256 `' + RAPPORT_RELU_SHA + '`, livré en entier dans l\'export de la relecture du groupe D. L\'assembleur de cette note le vérifie avant d\'écrire :',
  '- la partie qui commence au §1 est identique au rapport relu ;',
  '- l\'en-tête est identique, hors de la ligne de statut.', '',
  ...C.filter((p) => !M[p].depart).flatMap((p) => { const t = txt(PROP + p); const coupe = p === NR ? t.slice(0, t.search(/^## 1\. /m)).trimEnd() + '\n\n[… à partir du §1 : identique au rapport relu, SHA-256 ' + RAPPORT_RELU_SHA + ' …]' : t; return [titre(PROP + p), '', clot(coupe, 'markdown'), '']; }),
  '## 1.4 Sortie de la préparation (code 0)', '', clot(txt(I + 'sortie-preparation.txt'), 'text'), '',
  '## 1.5 Sortie de l\'essai de l\'application sur copie jetable (code 0)', '', clot(txt(I + 'application/sortie-essai.txt'), 'text'), '',
  '## 1.6 Sources des scripts', '', ...['preparer-inscription-D.mjs', 'application/appliquer-inscription-D.mjs', 'application/essayer-inscription-D.mjs'].flatMap((s) => [titre(I + s) + (s.includes('appliquer') ? ' — non lancé' : ''), '', clot(txt(I + s), 'js'), '']),
  '# Partie 2 · Périmètre du groupe E', '', txt(O + 'proposition-perimetre-E.md').replace(/^# /, '## '), '',
  '## Annexe · Dossier factuel du groupe E (généré)', '', txt(O + 'dossier-E.md').replace(/^# .*\n/, '').replace(/^## /gm, '### '), '',
  '## Sortie de la préparation du dossier E (code 0)', '', clot(txt(O + 'sortie-preparation-E.txt'), 'text'), '',
  '## Source du script', '', titre(O + 'preparer-perimetre-E.mjs'), '', clot(txt(O + 'preparer-perimetre-E.mjs'), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets');
