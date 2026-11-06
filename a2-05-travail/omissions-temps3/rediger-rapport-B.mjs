// A2-05 · bloc F · recherche d'omissions, temps 3, groupe B (T2-journal) : rédige le rapport de relecture (proposition) à partir des faits du dossier
// (perimetre-B.json) et de l'analyse écrite à la main (analyse-B.json), et le recueil des 15 fiches sources complètes. Lecture seule sur les données,
// sources, journal et lots. Contrôles (ceux du groupe A, plus deux propres à B) : une analyse par sens du périmètre, et aucune autre ; champs R1 à R5,
// conclusion et motif présents ; conclusion parmi les trois d'A10 ; décisions citées existantes ; toutes les décisions de journal de chaque ENTRY citées,
// dont les 17 qui ont déclenché le filtre, chacune dans le R5 d'un sens de son ENTRY ; D0637, D0672 et D0677 confrontées (QB-4) ; livraisons du lot 3
// citées exactes ; corrections citées exactes et complètes. N'écrit que deux fichiers neufs (refus d'écraser).
// Usage : node a2-05-travail/omissions-temps3/rediger-rapport-B.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', RAP = O + 'rapport-relecture-B.md', FIC = O + 'fiches-B.md';
for (const f of [RAP, FIC]) if (existsSync(join(root, f))) throw new Error(f + ' existe déjà');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n'); const json = (p) => JSON.parse(txt(p));
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; };

const PB_SHA = sha(O + 'perimetre-B.json');
const P = json(O + 'perimetre-B.json'), AN = json(O + 'analyse-B.json');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const src = [...json('reconstruction/a2-04/sources/vocab.json'), ...json('reconstruction/a2-04/sources/vocab-hors-jlpt.json')];
const ex = json('reconstruction/a2-04/sources/exemples.json').vocab ?? {}; const J = json('reconstruction/a2-04/journal.json');
const CONCL = ['ne relève pas de la fonction', 'relève de la fonction', 'à arbitrer'];
const QB4 = ['D0637', 'D0672', 'D0677'];
const ids = P.sens.map((s) => s.id); const court = (d) => d.replace('A2-04-', '');
ok(P.sens.length === 18 && P.entrees.length === 15, 'périmètre : 18 sens, 15 ENTRY');
ok(JSON.stringify(Object.keys(AN).sort()) === JSON.stringify([...ids].sort()), 'une analyse par sens du périmètre, et aucune autre', Object.keys(AN).length + ' analyses');
let declencheurs = 0;
for (const e of P.entrees) {
  const sensE = e.sensPublies.map((s) => s.id).filter((i) => AN[i]); const texteE = sensE.map((i) => Object.values(AN[i]).join(' ')).join(' ');
  for (const d of e.decisions) if (!new RegExp('\\b' + court(d.id) + '\\b').test(texteE)) ok(false, e.entry + ' : décision de journal de l\'ENTRY non citée', court(d.id));
  for (const d of e.decisions.filter((x) => x.vocabulaireQuestion)) { declencheurs++; if (!sensE.some((i) => new RegExp('\\b' + court(d.id) + '\\b').test(AN[i].r5))) ok(false, e.entry + ' : décision du filtre non confrontée en R5', court(d.id)); }
  for (const sp of e.sensPublies) {
    const id = sp.id; const a = AN[id] ?? {};
    const manque = ['indice', 'r1', 'r2', 'r3', 'r4', 'r5', 'conclusion', 'motif'].filter((k) => !String(a[k] ?? '').trim());
    if (manque.length) ok(false, id + ' : champs manquants', manque.join(', '));
    if (!CONCL.includes(a.conclusion)) ok(false, id + ' : conclusion hors des trois d\'A10', a.conclusion);
    const texte = Object.values(a).join(' ');
    for (const d of texte.match(/\bD\d{4}\b/g) ?? []) if (!J.some((x) => x.id === 'A2-04-' + d)) ok(false, id + ' : décision citée inexistante', d);
    const l3 = [...texte.matchAll(/lot 3 \(([A-FT]\d+)/g)].map((m) => m[1]); if (l3.some((x) => x !== sp.lot3) || (sp.lot3 && !l3.length)) ok(false, id + ' : livraison du lot 3 citée inexacte ou absente', l3.join() + ' / ' + sp.lot3);
    for (const c of texte.match(/\bV[12]-\d+\b/g) ?? []) if (!e.corrections.some((x) => x.startsWith(c + ' '))) ok(false, id + ' : correction citée étrangère à l\'ENTRY', c);
  }
  for (const c of e.corrections) { const cid = c.split(' (')[0]; if (!new RegExp('\\b' + cid + '\\b').test(texteE)) ok(false, e.entry + ' : correction retenue non citée', cid); }
}
ok(declencheurs === 17, 'les 17 décisions du filtre T2-journal, chacune confrontée dans le R5 d\'un sens de son ENTRY', declencheurs + ' décisions');
for (const d of QB4) { const s = ids.filter((i) => new RegExp('\\b' + d + '\\b').test(AN[i].r5)); if (!s.length) ok(false, 'QB-4 : ' + d + ' non confrontée en R5'); }
ok(!ko, 'analyses complètes, conclusions admises ; décisions, livraisons et corrections citées exactes et complètes ; QB-4 traité');
if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); }

const compte = Object.fromEntries(CONCL.map((c) => [c, ids.filter((i) => AN[i].conclusion === c).length]));
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const decQ = (id) => { const d = J.find((x) => x.id === 'A2-04-' + id); return '« ' + d.reason + ' »'; };
const E343 = pub.find((x) => x.id === 'v_343');
ok(J.find((x) => x.id === 'A2-04-D0700')?.reason === J.find((x) => x.id === 'A2-04-D0672')?.reason && E343?.senses.some((s) => fns(s).includes('interrogatif')), 'D0700 (どっち) : même phrase que D0672, ENTRY porteuse d\'interrogatif');
if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); }
const L = ['# Étape 2 · A2-05 · bloc F · recherche d\'omissions d\'`interrogatif`, temps 3 — relecture du groupe B', '',
  '**Date** : 2026-11-04', '**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; aucune omission n\'est appliquée.', '',
  '**Autorisation** (relayée) : « J\'autorise maintenant, distinctement, l\'ouverture de la relecture lexicale du groupe B, strictement limitée aux 18 sens dans 15 ENTRY du périmètre déjà accepté. Pour chaque sens, examine intégralement la fiche source, ses traductions, nuances et exemples, les anciens exemples, l\'ENTRY publiée et les décisions historiques applicables. Applique la grille R1 à R5 et produis une conclusion individuelle motivée selon A10. Les décisions de journal ayant déclenché les filtres ne constituent pas, à elles seules, des preuves de la fonction interrogative. Confronte D0637, D0672 et D0677 à A10 uniquement pour apprécier leur cohérence, sans les réécrire. »', '',
  '**Base** :', '- addendum A10 (§2 définition ; §3 principes ; §4 frontières ; §6 cumul ; §8 temps 3) ;', '- périmètre du groupe B accepté le 2026-11-04 (QB-1 à QB-4), `proposition-perimetre-B.md` ;', '- dossier factuel `perimetre-B.json` (SHA-256 `' + PB_SHA.slice(0, 16) + '…`).', '',
  'Les 15 fiches sources complètes, leurs anciens exemples et les ENTRY publiées sont recueillis dans `fiches-B.md`.', '',
  '## 1. Synthèse', '',
  '| Conclusion | Sens |', '|---|---|', ...CONCL.map((c) => '| ' + c + ' | ' + compte[c] + ' |'), '| **Total** | **18** |', '',
  '**Aucune omission n\'est signalée dans le groupe B.** Le filtre `T2-journal` ne porte que sur des décisions, et la relecture part de la fiche (QB-2). Les dix-sept décisions qui l\'ont déclenché emploient toutes le vocabulaire de la question au sens courant :',
  '- « demander » au sens d\'une **requête** (un couvert qu\'on demande au restaurant, une demande avec …ください), d\'une **exigence** (le temps qu\'une tâche demande, D1343) ou d\'une **prescription** (D1215) ;',
  '- « question » au sens d\'un **problème** ou d\'un **point laissé ouvert** (D0169, D0202, D1612) ;',
  '- « interrogatif » dans un **gabarit de décision de tags** commun à la série ko-so-a-do, appliqué à trois démonstratifs (D0637, D0672, D0677 ; §3).', '',
  'Quatre phrases interrogatives se trouvent dans les sources relues. Dans chacune, l\'interrogation est portée par un autre mot, porteur de la fonction, ou par une marque grammaticale :',
  '- l\'exemple de la fiche de それ, それはなんですか (なん) ;',
  '- l\'exemple de la fiche de そちら, そちらはいかがですか (いかが), et l\'un de ses anciens exemples (…落ちていませんか) ;',
  '- un ancien exemple de たばこ, ここでたばこを吸ってもいいですか (か) ;',
  '- un ancien exemple de どうぞ, où どうぞ répond à une question posée par l\'autre locuteur.', '',
  'Aucun mot relu n\'y tient la place de l\'information demandée. Les questions citées dans D0207 et D0209 (お箸おつけしますか, スプーンおつけしますか) sont formées par か.', '',
  '| N° | SENSE | Mot | Traduction publiée | Filtres d\'origine | Conclusion | Motif |', '|---|---|---|---|---|---|---|',
  ...P.sens.map((s, i) => { const E = pub.find((x) => x.id === s.entry); const S = E.senses.find((x) => x.id === s.id); return '| ' + (i + 1) + ' | `' + s.id + '` | ' + E.word + ' | ' + cell(S.meaning.primary) + ' | ' + s.filtres.map((f) => '`' + f + '`').join(', ') + ' | ' + AN[s.id].conclusion + ' | ' + cell(AN[s.id].motif) + ' |'; }), '',
  '## 2. Relecture, sens par sens', '',
  'Pour chaque sens sont donnés :', '- les filtres d\'origine, conservés depuis la mesure ;', '- l\'indice qui l\'a fait relever ;', '- l\'état publié ;', '- puis R1 à R5, selon la grille acceptée (QB-2).', '',
  'La fiche source entière, ses anciens exemples et l\'ENTRY publiée sont recueillis dans `fiches-B.md`. Toutes les décisions de journal de l\'ENTRY sont citées en R5, et les dix-sept décisions du filtre le sont en entier.', ''];
for (const e of P.entrees) {
  const E = pub.find((x) => x.id === e.entry);
  L.push('### ' + E.word + ' (' + (E.readings?.[0]?.kana ?? '') + ') — `' + e.entry + '`', '',
    '- **Fiche source** : ' + e.fiches.map((f) => '`' + f.id + '` (' + f.lot + ', ' + f.anciensExemples + ' anciens exemples)').join(' ; ') + '.',
    '- **Décisions de journal de l\'ENTRY** : ' + e.decisions.map((d) => (d.vocabulaireQuestion ? '**' + court(d.id) + '**' : court(d.id))).join(', ') + ' ; toutes `validated` ; en gras, celles du filtre.',
    ...e.decisions.filter((d) => d.vocabulaireQuestion).map((d) => '  - **' + court(d.id) + '** (' + d.champ + ', ' + d.nature + ') : ' + decQ(court(d.id))),
    '- **Corrections retenues, non appliquées** : ' + (e.corrections.join(' ; ') || 'aucune') + '.', '');
  for (const sp of e.sensPublies) {
    const s = P.sens.find((x) => x.id === sp.id); const a = AN[sp.id]; const S = E.senses.find((x) => x.id === sp.id);
    L.push('#### `' + sp.id + '` · « ' + S.meaning.primary + ' » — proposé : **' + a.conclusion + '**', '',
      '- **Filtres d\'origine** : ' + s.filtres.map((f) => '`' + f + '`').join(', ') + '.',
      '- **Indice relevé** : ' + a.indice,
      '- **État publié** :', '  - traductions « ' + [S.meaning.primary, ...(S.meaning.alternatives ?? [])].join(' ; ') + ' » ;', '  - catégorie `' + cat(S.category) + '` ; type `' + S.semantic_type + '` ;', '  - fonctions ' + (fns(S).map((f) => '`' + f + '`').join(', ') || 'aucune') + ' ;', '  - nuance du sens : ' + (S.nuance ? '« ' + S.nuance + ' »' : 'aucune') + ' ;', '  - lot 3 : ' + (sp.lot3 ? 'livraison ' + sp.lot3 + ' (verdict arbitré, non rouvert)' : 'hors des 377') + '.',
      '- **R1** (rôle de demander une information non spécifiée) : ' + a.r1, '- **R2** (attestation par la fiche) : ' + a.r2, '- **R3** (frontières) : ' + a.r3, '- **R4** (cumul) : ' + a.r4, '- **R5** (décisions existantes) : ' + a.r5,
      '- **Conclusion proposée** : **' + a.conclusion + '**. **Motif** : ' + a.motif, '');
  }
}
L.push('## 3. D0637, D0672 et D0677 confrontées à A10 (QB-4)', '',
  'Les trois décisions, des décisions de **tags** du lot 11, écartent `lieu_gare` par la même phrase :', '', '> ' + decQ('D0672').slice(2, -2), '',
  'La même phrase se retrouve, mot pour mot, dans une quatrième décision du même gabarit, **D0700**, pour どっち (`' + E343.id + '`), dont le sens porte `interrogatif`. Elle n\'est pas du groupe B ; elle est citée ici seulement pour éclairer le gabarit. Ce gabarit sert aux mots de la série ko-so-a-do, qui sont démonstratifs ou interrogatifs selon le mot.', '',
  '**Appréciation de cohérence, sans réécriture** :',
  '1. **Objet.** Les trois décisions portent sur un tag de lieu. Elles n\'attribuent ni ne refusent la fonction `interrogatif` : la fonction de ces sens est posée par d\'autres décisions (D0636, D0670, D0676), qui posent `deictique` (A7). A10, §8, demande de dire si une décision existante s\'accorde avec la définition ; ici, aucune ne statue sur la fonction.',
  '2. **Lecture de la formule.** « Démonstratif ou interrogatif » est une alternative propre au gabarit. Appliquée à それ, こちら et そちら, seule la branche « démonstratif » vaut : leurs fiches les disent toutes trois « pronom démonstratif », et aucune ne décrit un emploi interrogatif (§2). La formule ne leur attribue donc aucun rôle interrogatif.',
  '3. **Rapport à A10, §3, point 2.** La qualification vient de l\'appartenance à la série. Elle aurait été contraire à A10 si elle avait servi à attribuer la fonction ; elle sert seulement à dire que le mot s\'emploie partout, pour écarter un tag de lieu.', '',
  '**Conclusion** : **aucune discordance** avec A10. Les trois décisions s\'accordent avec la définition et ne sont pas réécrites.', '',
  '**Observation de rédaction**, sans verdict ni correction : prise isolément, la formule peut laisser croire que それ, こちら et そちら seraient interrogatifs. L\'écart tient à la rédaction, non au fond. Les données publiées n\'en portent aucune trace : ces quatre sens ne portent que `deictique`. Il appartient à l\'arbitrage de dire s\'il faut le consigner ailleurs ; aucune décision nouvelle n\'est proposée.', '',
  '## 4. Décomptes séparés', '',
  '- **Groupe B** : 18 sens relus, sur 234 candidats de la recherche d\'omissions ; ' + compte[CONCL[0]] + ' « ne relève pas de la fonction », ' + compte[CONCL[1]] + ' « relève de la fonction », ' + compte[CONCL[2]] + ' « à arbitrer ».',
  '- **Les huit sens communs au lot 3** (`v_82_s1` B12 ; `v_84_s1`, `v_88_s1` C1 ; `v_339_s1`, `v_339_s2`, `v_340_s1`, `v_342_s1` D2 ; `v_600_s1` D7) : relus sur la seule fonction (QB-3) ; leurs verdicts du lot 3, tous « conforme », sont cités, non rouverts ; ce décompte n\'est pas ajouté aux 377.',
  '- **Recherche d\'omissions** : après les groupes A et B, 57 sens relus, 177 candidats restent (groupes C à E, non commencés). 573 sens n\'ont été relevés par aucun filtre ; ils n\'ont pas été relus et ne sont pas, de ce fait, vérifiés conformes. Ces décomptes ne s\'additionnent ni aux 377 ni au contrôle des 17 porteurs.', '',
  '## 5. Observations hors périmètre (sans verdict ni correction)', '',
  'Ces observations portent sur des sources figées et ne touchent aucune conclusion :',
  '- `n5_v_82` (締める) : deux anciens exemples emploient 締める pour « fermer » (ドアの鍵を締めてください ; カーテンを締めてください, « fermer les rideaux »), alors que la fiche met en garde contre la confusion avec 閉める ; le romaji du troisième porte « shっかり ». Le rapport T1 cite ces exemples sans les relever.',
  '- `n5_v_231` (スプーン) : le deuxième ancien exemple porte une balise vide (« <> ») avant 小さい ; le troisième écrit 食える (« たえる » en furigana) là où le romaji dit taberu.',
  '- `n5_v_339` (こちら) : dans le premier ancien exemple, le romaji (« koreirimasu ») et les furigana de 恐れ入ります (きょう sur 恐, soit きょうれいります) ne concordent pas.',
  '- `n5_v_163` (かかる) : le romaji de l\'exemple de la fiche (« maden ») et du premier ancien exemple (« mede ») est fautif pour まで.', '',
  'Aucune n\'a été retrouvée, par recherche textuelle, dans un rapport antérieur, sinon la citation des exemples de 締める par le rapport T1.', '',
  '## 6. Ce qui n\'est pas fait', '',
  '- Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; les 204 corrections restent non appliquées.',
  '- Les groupes C à E ne sont pas commencés.',
  '- La catégorie, le type et les fonctions déjà portées (`deictique`, `politesse`) des 18 sens ne sont pas réexaminés.', '',
  '## 7. Décisions attendues', '',
  '1. Arbitrer les 18 conclusions proposées (toutes « ne relève pas de la fonction »).',
  '2. Prendre position sur l\'appréciation de QB-4 (§3) : aucune discordance, une observation de rédaction.',
  '3. Décider, séparément, de la suite : l\'inscription de l\'arbitrage du groupe B, puis le périmètre du groupe C.', '');
writeFileSync(join(root, RAP), L.join('\n'));

// Recueil des 15 fiches complètes
const LUS = ['reconstruction/a2-04/sources/vocab.json', 'reconstruction/a2-04/sources/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/exemples.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json'];
const F = ['# Groupe B — les 15 fiches sources complètes, leurs anciens exemples et les 15 ENTRY publiées', '',
  'Recopiés tels quels, sans retouche :', '- fiches de `reconstruction/a2-04/sources/vocab.json` et `vocab-hors-jlpt.json` (sources figées) ;', '- anciens exemples de `reconstruction/a2-04/sources/exemples.json` (clé `vocab`) ;', '- ENTRY de `data/n5/vocab.json` et `data/vocab-hors-jlpt.json`.', '',
  'Empreintes des fichiers lus :', ...LUS.map((p) => '- `' + p + '` `' + sha(p).slice(0, 16) + '`'), ''];
let nf = 0, nx = 0;
for (const e of P.entrees) {
  F.push('## ' + e.mot + ' — `' + e.entry + '`', '');
  for (const f of e.fiches) { const s = src.find((x) => x.id === f.id); nf++; const xs = ex[f.id] ?? []; nx += xs.length;
    F.push('### Fiche source `' + f.id + '`' + (f.id !== e.fiches[0].id ? ' (fusionnée vers `' + e.entry + '`)' : ''), '', '```json', JSON.stringify(s, null, 1), '```', '', '### Anciens exemples de `' + f.id + '` (' + xs.length + ')', '', xs.length ? '```json\n' + JSON.stringify(xs, null, 1) + '\n```' : 'Aucun.', ''); }
  F.push('### ENTRY publiée `' + e.entry + '`', '', '```json', JSON.stringify(pub.find((x) => x.id === e.entry), null, 1), '```', '');
}
writeFileSync(join(root, FIC), F.join('\n'));
ok(nf === 15 && nx === 45, 'recueil : 15 fiches sources complètes, 45 anciens exemples', nf + ' fiches, ' + nx + ' anciens exemples');
console.log('écrits : ' + RAP + ', ' + FIC); console.log('rédaction conforme ; ' + JSON.stringify(compte));
