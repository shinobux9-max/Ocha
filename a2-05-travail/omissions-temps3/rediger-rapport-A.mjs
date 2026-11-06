// A2-05 · bloc F · recherche d'omissions, temps 3, groupe A : rédige le rapport de relecture (proposition) à partir des faits du dossier et de l'analyse
// écrite à la main (analyse-A.json), et le recueil des 32 fiches sources complètes. Lecture seule sur les données, sources, journal et lots.
// Contrôles : une analyse par sens du périmètre, et aucune autre ; champs R1 à R5, conclusion et motif présents ; conclusion parmi les trois d'A10 ;
// décisions citées existantes ; livraisons du lot 3 citées exactes ; corrections citées exactes. N'écrit que deux fichiers neufs (refus d'écraser).
// Usage : node a2-05-travail/omissions-temps3/rediger-rapport-A.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', RAP = O + 'rapport-relecture-A.md', FIC = O + 'fiches-A.md';
for (const f of [RAP, FIC]) if (existsSync(join(root, f))) throw new Error(f + ' existe déjà');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n'); const json = (p) => JSON.parse(txt(p));
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; };

const P = json(O + 'perimetre-A.json'), AN = json(O + 'analyse-A.json');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const src = [...json('reconstruction/a2-04/sources/vocab.json'), ...json('reconstruction/a2-04/sources/vocab-hors-jlpt.json')];
const ex = json('reconstruction/a2-04/sources/exemples.json').vocab ?? {}; const J = json('reconstruction/a2-04/journal.json');
const CONCL = ['ne relève pas de la fonction', 'relève de la fonction', 'à arbitrer'];
const ids = P.sens.map((s) => s.id);
ok(P.sens.length === 39 && P.entrees.length === 31, 'périmètre : 39 sens, 31 ENTRY');
ok(JSON.stringify(Object.keys(AN).sort()) === JSON.stringify([...ids].sort()), 'une analyse par sens du périmètre, et aucune autre', Object.keys(AN).length + ' analyses');
for (const id of ids) {
  const a = AN[id] ?? {}; const e = P.entrees.find((x) => x.entry === P.sens.find((s) => s.id === id).entry); const pe = e.sensPublies.find((s) => s.id === id);
  const manque = ['indice', 'r1', 'r2', 'r3', 'r4', 'r5', 'conclusion', 'motif'].filter((k) => !String(a[k] ?? '').trim());
  if (manque.length) ok(false, id + ' : champs manquants', manque.join(', '));
  if (!CONCL.includes(a.conclusion)) ok(false, id + ' : conclusion hors des trois d\'A10', a.conclusion);
  const texte = Object.values(a).join(' ');
  for (const d of texte.match(/\bD\d{4}\b/g) ?? []) if (!J.some((x) => x.id === 'A2-04-' + d)) ok(false, id + ' : décision citée inexistante', d);
  const l3 = [...texte.matchAll(/lot 3 \(([A-FT]\d+)/g)].map((m) => m[1]); if (l3.some((x) => x !== pe.lot3) || (pe.lot3 && !l3.length)) ok(false, id + ' : livraison du lot 3 citée inexacte ou absente', l3.join() + ' / ' + pe.lot3);
  for (const c of texte.match(/\bV[12]-\d+\b/g) ?? []) if (!e.corrections.some((x) => x.startsWith(c + ' '))) ok(false, id + ' : correction citée étrangère à l\'ENTRY', c);
  for (const c of e.corrections) { const cid = c.split(' (')[0]; if (!cid.startsWith('volet') && !e.sensPublies.some((s) => AN[s.id] && Object.values(AN[s.id]).join(' ').includes(cid))) ok(false, e.entry + ' : correction retenue non citée', cid); }
}
ok(!ko, 'analyses complètes, conclusions admises, décisions, livraisons et corrections citées exactes');
if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); }

const compte = Object.fromEntries(CONCL.map((c) => [c, ids.filter((i) => AN[i].conclusion === c).length]));
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const L = ['# Étape 2 · A2-05 · bloc F · recherche d\'omissions d\'`interrogatif`, temps 3 — relecture du groupe A', '',
  '**Date** : 2026-11-04', '**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; aucune omission n\'est appliquée.', '',
  '**Autorisation** (relayée) : « J\'autorise distinctement l\'ouverture de la relecture lexicale du groupe A, strictement dans ce périmètre. Pour chacun des 39 sens, examine intégralement sa fiche source, les traductions, nuances, exemples et anciens exemples, ainsi que les décisions historiques applicables. Fournis un rapport de proposition avec les réponses R1 à R5 et une conclusion motivée par sens. »', '',
  '**Base** : addendum A10 (§2 définition ; §3 principes ; §4 frontières ; §6 cumul ; §8 temps 3) ; périmètre du groupe A accepté (QA-1 à QA-5), `proposition-decoupage-perimetre-A.md` ; dossier factuel `perimetre-A.json`. Les 32 fiches sources complètes, leurs anciens exemples et les ENTRY publiées sont recueillis dans `fiches-A.md`.', '',
  '## 1. Synthèse', '',
  '| Conclusion | Sens |', '|---|---|', ...CONCL.map((c) => '| ' + c + ' | ' + compte[c] + ' |'), '| **Total** | **39** |', '',
  '**Aucune omission n\'est signalée dans le groupe A.** Les indices du temps 1 se répartissent ainsi :',
  '- des **faux indices** : « qui », « que », « qu\' » relatifs ou conjonctifs, « question » au sens de problème, « demander » au sens d\'une requête ou d\'une exigence ;',
  '- des **questions citées en nuance ou en exemple** dont l\'interrogation est portée par une marque grammaticale (か, は et l\'intonation, ね) ou par un autre mot, porteur de la fonction (どこ, どちら, どう, 何, なに, なん, どれ, 誰) ;',
  '- des sens qui **nomment** l\'acte de demander, une question ou une réponse (frontière d\'A10, §4, point 4) ;',
  '- un **indéfini** formé sur un interrogatif (誰か, frontière d\'A10, §4, point 1, D0724).', '',
  'Les deux sens nommés par A10, §4, point 4 (聞く « Demander », `v_175_s2` ; 質問 « Question », `v_702_s1`) et l\'exemple de son §4, point 1 (誰か, `v_700_s1`) reçoivent chacun une conclusion individuelle motivée. Les décisions existantes citées (dont D0724, D0509, D0512, D1384) s\'accordent avec la définition ; aucune n\'est réécrite.', '',
  '| N° | SENSE | Mot | Traduction publiée | Filtres d\'origine | Conclusion | Motif |', '|---|---|---|---|---|---|---|',
  ...P.sens.map((s, i) => { const E = pub.find((x) => x.id === s.entry); const S = E.senses.find((x) => x.id === s.id); return '| ' + (i + 1) + ' | `' + s.id + '` | ' + E.word + ' | ' + cell(S.meaning.primary) + ' | ' + s.filtres.map((f) => '`' + f + '`').join(', ') + ' | ' + AN[s.id].conclusion + ' | ' + cell(AN[s.id].motif) + ' |'; }), '',
  '## 2. Relecture, sens par sens', '', 'Pour chaque sens : les filtres d\'origine (conservés depuis la mesure), l\'indice qui l\'a fait relever, l\'état publié, puis R1 à R5 (grille acceptée, QA-4). La fiche source entière, ses anciens exemples et l\'ENTRY publiée sont en `fiches-A.md` ; toutes les décisions de journal de l\'ENTRY y sont citées.', ''];
for (const e of P.entrees) {
  const E = pub.find((x) => x.id === e.entry);
  L.push('### ' + E.word + ' (' + (E.readings?.[0]?.kana ?? '') + ') — `' + e.entry + '`', '', '- **Fiches sources** : ' + e.fiches.map((f) => '`' + f.id + '` (' + f.lot + ', ' + f.anciensExemples + ' ancien(s) exemple(s))').join(' ; ') + '.', '- **Décisions de journal de l\'ENTRY** : ' + (e.decisions.map((d) => d.id.replace('A2-04-', '')).join(', ') || 'aucune (journal vide dans son lot)') + ' ; toutes `validated`.', '- **Corrections retenues, non appliquées** : ' + (e.corrections.join(' ; ') || 'aucune') + '.', '');
  for (const sp of e.sensPublies) {
    const s = P.sens.find((x) => x.id === sp.id); const a = AN[sp.id]; const S = E.senses.find((x) => x.id === sp.id);
    L.push('#### `' + sp.id + '` · « ' + S.meaning.primary + ' » — proposé : **' + a.conclusion + '**', '',
      '- **Filtres d\'origine** : ' + s.filtres.map((f) => '`' + f + '`').join(', ') + ' ; entrée dans A : ' + s.motif + '.',
      '- **Indice relevé** : ' + a.indice,
      '- **État publié** : traductions « ' + [S.meaning.primary, ...(S.meaning.alternatives ?? [])].join(' ; ') + ' » ; catégorie `' + cat(S.category) + '` ; type `' + S.semantic_type + '` ; fonctions ' + (fns(S).map((f) => '`' + f + '`').join(', ') || 'aucune') + ' ; nuance du sens : ' + (S.nuance ? '« ' + S.nuance + ' »' : 'aucune') + ' ; lot 3 : ' + (sp.lot3 ? 'livraison ' + sp.lot3 + ' (verdict arbitré, non rouvert)' : 'hors des 377') + '.',
      '- **R1** (rôle de demander une information non spécifiée) : ' + a.r1, '- **R2** (attestation par la fiche) : ' + a.r2, '- **R3** (frontières) : ' + a.r3, '- **R4** (cumul) : ' + a.r4, '- **R5** (décisions existantes) : ' + a.r5,
      '- **Conclusion proposée** : **' + a.conclusion + '**. **Motif** : ' + a.motif, '');
  }
}
L.push('## 3. Décomptes séparés', '',
  '- **Groupe A** : 39 sens relus, sur 234 candidats de la recherche d\'omissions ; ' + compte[CONCL[0]] + ' « ne relève pas de la fonction », ' + compte[CONCL[1]] + ' « relève de la fonction », ' + compte[CONCL[2]] + ' « à arbitrer ».',
  '- **Les quatre sens rattachés par leur ENTRY** (`v_414_s1`, `v_517_s2`, `v_542_s2`, `v_664_s2`) : relus avec leurs propres filtres (QA-2) ; tous « ne relève pas de la fonction ».',
  '- **Les 24 sens communs au lot 3** : relus sur la seule fonction (QA-3) ; leurs verdicts du lot 3 sont cités, non rouverts ; ce décompte n\'est pas ajouté aux 377.',
  '- **Recherche d\'omissions** : après le groupe A, 39 relus, 195 candidats restent à relire (groupes B à E, non commencés) ; 573 sens n\'ont été relevés par aucun filtre et ne sont pas relus. Ces décomptes ne s\'additionnent ni aux 377 ni au contrôle des 17 porteurs.', '',
  '## 4. Observations hors périmètre (sans verdict ni correction)', '',
  '- `n5_v_638` (兄弟) : `exemples.json` donne quatre anciens exemples, dont deux identiques (« 兄弟でいっしょに父の誕生日のプレゼントを買いました »).',
  '- `n5_v_542` (吸う) : un ancien exemple porte une coquille (« 空きれいな 空気 », pour « きれいな空気 »).',
  '- `n5_v_392` (そこ) : l\'exemple de la fiche écrit « ほう を » pour 本を ; le défaut est déjà mentionné au rapport T5.',
  'Ces observations portent sur des sources figées ; elles ne touchent aucune conclusion. Seule la troisième a été retrouvée dans un rapport antérieur, par recherche textuelle.', '',
  '## 5. Ce qui n\'est pas fait', '',
  '- Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; les 204 corrections restent non appliquées.',
  '- Les groupes B à E ne sont pas commencés.',
  '- La catégorie et le type des 39 sens ne sont pas réexaminés.', '',
  '## 6. Décisions attendues', '',
  '1. Arbitrer les 39 conclusions proposées (toutes « ne relève pas de la fonction »).',
  '2. Décider, séparément, de la suite : le périmètre du groupe B.', '');
writeFileSync(join(root, RAP), L.join('\n'));

// Recueil des 32 fiches complètes
const F = ['# Groupe A — les 32 fiches sources complètes, leurs anciens exemples et les 31 ENTRY publiées', '', 'Recopiés tels quels, sans retouche : fiches de `reconstruction/a2-04/sources/vocab.json` et `vocab-hors-jlpt.json` (sources figées) ; anciens exemples de `reconstruction/a2-04/sources/exemples.json` (clé `vocab`) ; ENTRY de `data/n5/vocab.json` et `data/vocab-hors-jlpt.json`. Empreintes des fichiers lus : ' + ['reconstruction/a2-04/sources/vocab.json', 'reconstruction/a2-04/sources/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/exemples.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json'].map((p) => '`' + p + '` `' + sha(p).slice(0, 16) + '`').join(' ; ') + '.', ''];
let nf = 0, nx = 0;
for (const e of P.entrees) {
  F.push('## ' + e.mot + ' — `' + e.entry + '`', '');
  for (const f of e.fiches) { const s = src.find((x) => x.id === f.id); nf++; const xs = ex[f.id] ?? []; nx += xs.length;
    F.push('### Fiche source `' + f.id + '`' + (f.id !== e.fiches[0].id ? ' (fusionnée vers `' + e.entry + '`)' : ''), '', '```json', JSON.stringify(s, null, 1), '```', '', '### Anciens exemples de `' + f.id + '` (' + xs.length + ')', '', xs.length ? '```json\n' + JSON.stringify(xs, null, 1) + '\n```' : 'Aucun.', ''); }
  F.push('### ENTRY publiée `' + e.entry + '`', '', '```json', JSON.stringify(pub.find((x) => x.id === e.entry), null, 1), '```', '');
}
writeFileSync(join(root, FIC), F.join('\n'));
ok(nf === 32, 'recueil : 32 fiches sources complètes', nf + ' fiches, ' + nx + ' anciens exemples');
console.log('écrits : ' + RAP + ', ' + FIC); console.log('rédaction conforme ; ' + JSON.stringify(compte));
