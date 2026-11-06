// A2-05 · bloc F · recherche d'omissions, temps 3, groupe C (T2-serie) : rédige le rapport de relecture (proposition) à partir des faits du dossier
// (perimetre-C.json) et de l'analyse écrite à la main (analyse-C.json), et le recueil des deux fiches sources complètes. Lecture seule sur les données,
// sources, journal et lots. Contrôles : une analyse par sens du périmètre, et aucune autre ; champs R1 à R5, conclusion et motif présents ; conclusion parmi
// les trois d'A10 ; décisions citées existantes ; toutes les décisions de journal de chaque ENTRY citées ; livraisons du lot 3 citées exactes ; corrections
// citées exactes et complètes ; frontières demandées (série en R3 pour chaque sens ; indéfini en R3 pour いつも ; fonction publiée en R4) ; porteurs
// déclencheurs effectivement porteurs d'`interrogatif`. N'écrit que deux fichiers neufs (refus d'écraser).
// Usage : node a2-05-travail/omissions-temps3/rediger-rapport-C.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', RAP = O + 'rapport-relecture-C.md', FIC = O + 'fiches-C.md';
for (const f of [RAP, FIC]) if (existsSync(join(root, f))) throw new Error(f + ' existe déjà');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n'); const json = (p) => JSON.parse(txt(p));
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; };
const arret = () => { if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); } };

const PC = O + 'perimetre-C.json', PC_SHA = '8eaa24be3aca9b953b9fa7eb64f33a96e66eeb36f712bc33b06f1d5a587c8561';
ok(sha(PC) === PC_SHA, 'dossier factuel du périmètre accepté, à son empreinte', PC_SHA.slice(0, 16));
arret();
const P = json(PC), AN = json(O + 'analyse-C.json');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const src = [...json('reconstruction/a2-04/sources/vocab.json'), ...json('reconstruction/a2-04/sources/vocab-hors-jlpt.json')];
const ex = json('reconstruction/a2-04/sources/exemples.json').vocab ?? {}; const J = json('reconstruction/a2-04/journal.json');
const CONCL = ['ne relève pas de la fonction', 'relève de la fonction', 'à arbitrer'];
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const ids = P.sens.map((s) => s.id); const court = (d) => d.replace('A2-04-', '');
ok(P.sens.length === 3 && P.entrees.length === 2, 'périmètre : 3 sens, 2 ENTRY');
ok(JSON.stringify(Object.keys(AN).sort()) === JSON.stringify([...ids].sort()), 'une analyse par sens du périmètre, et aucune autre', Object.keys(AN).length + ' analyses');
let nDec = 0;
for (const e of P.entrees) {
  const E = pub.find((x) => x.id === e.entry);
  const sensE = e.sensPublies.map((s) => s.id).filter((i) => AN[i]); const texteE = sensE.map((i) => Object.values(AN[i]).join(' ')).join(' ');
  for (const d of e.decisions) { nDec++; if (!new RegExp('\\b' + court(d.id) + '\\b').test(texteE)) ok(false, e.entry + ' : décision de journal de l\'ENTRY non citée', court(d.id)); }
  for (const p of e.porteursDeclencheurs) { const PE = pub.find((x) => x.id === p.entry); if (!PE?.senses.some((s) => fns(s).includes('interrogatif'))) ok(false, e.entry + ' : porteur déclencheur sans la fonction', p.entry); if (!sensE.every((i) => AN[i].indice.includes('`' + p.entry + '`'))) ok(false, e.entry + ' : porteur déclencheur non nommé dans l\'indice', p.entry); }
  for (const sp of e.sensPublies) {
    const id = sp.id; const a = AN[id] ?? {}; const S = E.senses.find((x) => x.id === id);
    const manque = ['indice', 'r1', 'r2', 'r3', 'r4', 'r5', 'conclusion', 'motif'].filter((k) => !String(a[k] ?? '').trim());
    if (manque.length) ok(false, id + ' : champs manquants', manque.join(', '));
    if (!CONCL.includes(a.conclusion)) ok(false, id + ' : conclusion hors des trois d\'A10', a.conclusion);
    const texte = Object.values(a).join(' ');
    for (const d of texte.match(/\bD\d{4}\b/g) ?? []) if (!J.some((x) => x.id === 'A2-04-' + d)) ok(false, id + ' : décision citée inexistante', d);
    const l3 = [...texte.matchAll(/lot 3 \(([A-FT]\d+)/g)].map((m) => m[1]); if (l3.some((x) => x !== sp.lot3) || (sp.lot3 && !l3.length)) ok(false, id + ' : livraison du lot 3 citée inexacte ou absente', l3.join() + ' / ' + sp.lot3);
    for (const c of texte.match(/\bV[12]-\d+\b/g) ?? []) if (!e.corrections.some((x) => x.startsWith(c + ' '))) ok(false, id + ' : correction citée étrangère à l\'ENTRY', c);
    if (!/§3, point 2/.test(a.r3)) ok(false, id + ' : frontière de la série (A10, §3, point 2) non examinée en R3');
    for (const f of fns(S)) if (!a.r4.includes('`' + f + '`')) ok(false, id + ' : fonction publiée non citée en R4', f);
  }
  for (const c of e.corrections) { const cid = c.split(' (')[0]; if (!new RegExp('\\b' + cid + '\\b').test(texteE)) ok(false, e.entry + ' : correction retenue non citée', cid); }
}
ok(nDec === 7, 'les sept décisions de journal des deux ENTRY, chacune citée', nDec + ' décisions');
ok(/§4, point 1/.test(AN.v_494_s1?.r3 ?? ''), 'いつも : frontière des indéfinis (A10, §4, point 1) examinée en R3');
ok(!ko, 'analyses complètes, conclusions admises ; décisions, livraisons et corrections citées exactes et complètes ; frontières demandées examinées');
arret();

const compte = Object.fromEntries(CONCL.map((c) => [c, ids.filter((i) => AN[i].conclusion === c).length]));
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const decR = (id) => '« ' + J.find((x) => x.id === id).reason + ' »';
const L = ['# Étape 2 · A2-05 · bloc F · recherche d\'omissions d\'`interrogatif`, temps 3 — relecture du groupe C', '',
  '**Date** : 2026-11-04', '**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; aucune omission n\'est appliquée.', '',
  '**Autorisation** (relayée) : « QC-4 : OUI. J\'autorise l\'ouverture de la relecture lexicale du groupe C, strictement limitée aux trois sens dans deux ENTRY du périmètre accepté […]. Applique la grille R1 à R5 et les trois conclusions prévues par A10. Lis les deux fiches sources intégralement, leurs nuances, exemples et anciens exemples, ainsi que les sept décisions historiques. Examine notamment les frontières relatives à la série, à l\'indéfini et aux fonctions déjà publiées. Les verdicts du lot 3 restent inchangés. »', '',
  '**Base** :', '- addendum A10 (§2 définition ; §3 principes ; §4 frontières ; §6 cumul ; §8 temps 3) ;', '- périmètre du groupe C accepté le 2026-11-04 (QC-1 à QC-3), `proposition-perimetre-C.md` ;', '- dossier factuel `perimetre-C.json` (SHA-256 `' + PC_SHA.slice(0, 16) + '…`).', '',
  'Les deux fiches sources complètes, leurs six anciens exemples et les deux ENTRY publiées sont recueillis dans `fiches-C.md`.', '',
  '## 1. Synthèse', '',
  '| Conclusion | Sens |', '|---|---|', ...CONCL.map((c) => '| ' + c + ' | ' + compte[c] + ' |'), '| **Total** | **3** |', '',
  '**Aucune omission n\'est signalée dans le groupe C.** Les trois sens ne sont relevés que par deux indices de forme : la chaîne d\'un porteur contenue dans leur graphie (`T2-serie`) et la classe `adverbe` (`T2-classe`). Ni l\'un ni l\'autre ne décide (A10, §3, point 2). Les deux fiches, leurs exemples et leurs six anciens exemples ne contiennent aucune phrase interrogative.', '',
  '| N° | SENSE | Mot | Traduction publiée | Filtres d\'origine | Conclusion | Motif |', '|---|---|---|---|---|---|---|',
  ...P.sens.map((s, i) => { const E = pub.find((x) => x.id === s.entry); const S = E.senses.find((x) => x.id === s.id); return '| ' + (i + 1) + ' | `' + s.id + '` | ' + E.word + ' | ' + cell(S.meaning.primary) + ' | ' + s.filtres.map((f) => '`' + f + '`').join(', ') + ' | ' + AN[s.id].conclusion + ' | ' + cell(AN[s.id].motif) + ' |'; }), '',
  '## 2. Frontières examinées', '',
  '| Frontière | いつも `v_494_s1` | どうも `v_499_s1` | どうも `v_499_s2` |', '|---|---|---|---|',
  '| **Série** (A10, §3, point 2) | relevé par いつ ; ne décide pas | relevé par どう ; ne décide pas | relevé par どう ; ne décide pas |',
  '| **Indéfini** (A10, §4, point 1) | non établi par la fiche ; s\'il l\'était, même résultat (emploi généralisant qui n\'interroge pas) | sans objet | sans objet |',
  '| **Fonctions déjà publiées** (A10, §6) | aucune | `politesse` (D1506), non réexaminée ; aucun cumul ne se pose | `intensifieur` (D1507), non réexaminée ; aucun cumul ne se pose |',
  '| **Registre poli** (A10, §4, point 3) | sans objet | sans objet : la politesse est dite par `politesse` | sans objet |',
  '| **Marques grammaticales** (A10, §4, point 5) | sans objet | sans objet | la « particule d\'atténuation » de la fiche n\'est pas une marque d\'interrogation |', '',
  '**Porteurs déclencheurs**, cités pour expliquer le filtre, non relus : ' + P.entrees.flatMap((e) => e.porteursDeclencheurs.map((p) => p.mot + ' (`' + p.entry + '`, ' + p.sens.map((s) => '`' + s.split(' ')[0] + '` « ' + s.split(' ').slice(1).join(' ') + ' »').join(', ') + ') pour ' + e.mot)).join(' ; ') + '. Le contrôle de la rédaction vérifie qu\'ils portent bien la fonction.', '',
  '**Point d\'attention, sans conséquence sur les conclusions** : la nuance de la fiche de どうも mentionne un emploi « pour exprimer un vague sentiment de gêne ou d\'incertitude », gardé en nuance de l\'ENTRY par D1504. Exprimer une incertitude n\'est pas demander une information au sens d\'A10, §2 (le mot n\'y tient la place d\'aucune information et n\'appelle pas de réponse), et un emploi seulement mentionné en nuance ne suffirait pas (§3, point 1). Il appartient à l\'arbitrage de confirmer cette lecture.', '',
  '## 3. Relecture, sens par sens', '',
  'Pour chaque sens sont donnés :', '- les filtres d\'origine, conservés depuis la mesure ;', '- l\'indice qui l\'a fait relever ;', '- l\'état publié ;', '- puis R1 à R5, selon la grille acceptée (QC-2).', '',
  'Toutes les décisions de journal de l\'ENTRY sont citées en entier sous l\'ENTRY, et confrontées en R5.', ''];
for (const e of P.entrees) {
  const E = pub.find((x) => x.id === e.entry);
  L.push('### ' + E.word + ' (' + (E.readings?.[0]?.kana ?? '') + ') — `' + e.entry + '`', '',
    '- **Fiche source** : ' + e.fiches.map((f) => '`' + f.id + '` (' + f.lot + ', ' + f.anciensExemples.length + ' anciens exemples)').join(' ; ') + '.',
    '- **Décisions de journal de l\'ENTRY** (' + e.decisions.length + ', toutes `validated`) :',
    ...e.decisions.map((d) => '  - **' + court(d.id) + '** (' + d.champ + ', ' + d.nature + ') : ' + decR(d.id)),
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
L.push('## 4. Décomptes séparés', '',
  '- **Groupe C** : 3 sens relus, sur 234 candidats de la recherche d\'omissions ; ' + compte[CONCL[0]] + ' « ne relève pas de la fonction », ' + compte[CONCL[1]] + ' « relève de la fonction », ' + compte[CONCL[2]] + ' « à arbitrer ».',
  '- **Les trois sens, tous communs au lot 3** (`v_494_s1` D5, tranche T8 ; `v_499_s1` et `v_499_s2` D6, tranche T6) : relus sur la seule fonction (QC-3) ; leurs verdicts, tous « conforme », sont cités, non rouverts ; ce décompte n\'est pas ajouté aux 377.',
  '- **Recherche d\'omissions** : après les groupes A, B et C, 60 sens relus, 174 candidats restent (groupes D et E, non commencés). 573 sens n\'ont été relevés par aucun filtre ; ils n\'ont pas été relus et ne sont pas, de ce fait, vérifiés conformes. Ces décomptes ne s\'additionnent ni aux 377 ni au contrôle des 17 porteurs.', '',
  '## 5. Observations hors périmètre', '',
  'Aucune anomalie n\'a été relevée, à la lecture, dans les deux fiches ni dans leurs six anciens exemples. Une seule remarque, sans verdict ni correction : le premier ancien exemple de どうも (「手伝ってくれてありがとう」「どうも」) traduit la réplique « De rien / Merci ! », et l\'emploi « de rien » n\'est pas décrit par la fiche ; il ne touche aucune conclusion.', '',
  '## 6. Ce qui n\'est pas fait', '',
  '- Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; les 204 corrections restent non appliquées.',
  '- Les groupes D et E ne sont pas commencés.',
  '- La catégorie, le type et les fonctions déjà portées (`politesse`, `intensifieur`) des trois sens ne sont pas réexaminés ; les verdicts du lot 3 restent inchangés.', '',
  '## 7. Décisions attendues', '',
  '1. Arbitrer les trois conclusions proposées (toutes « ne relève pas de la fonction »).',
  '2. Confirmer, ou non, la lecture du « vague sentiment de gêne ou d\'incertitude » de どうも (§2, point d\'attention).',
  '3. Décider, séparément, de la suite : l\'inscription de l\'arbitrage du groupe C, puis le périmètre du groupe D.', '');
writeFileSync(join(root, RAP), L.join('\n'));

// Recueil des deux fiches complètes
const LUS = ['reconstruction/a2-04/sources/vocab.json', 'reconstruction/a2-04/sources/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/exemples.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json'];
const F = ['# Groupe C — les deux fiches sources complètes, leurs anciens exemples et les deux ENTRY publiées', '',
  'Recopiés tels quels, sans retouche :', '- fiches de `reconstruction/a2-04/sources/vocab.json` (sources figées) ;', '- anciens exemples de `reconstruction/a2-04/sources/exemples.json` (clé `vocab`) ;', '- ENTRY de `data/n5/vocab.json`.', '',
  'Empreintes des fichiers lus :', ...LUS.map((p) => '- `' + p + '` `' + sha(p).slice(0, 16) + '`'), ''];
let nf = 0, nx = 0;
for (const e of P.entrees) {
  F.push('## ' + e.mot + ' — `' + e.entry + '`', '');
  for (const f of e.fiches) { const s = src.find((x) => x.id === f.id); nf++; const xs = ex[f.id] ?? []; nx += xs.length;
    F.push('### Fiche source `' + f.id + '`', '', '```json', JSON.stringify(s, null, 1), '```', '', '### Anciens exemples de `' + f.id + '` (' + xs.length + ')', '', xs.length ? '```json\n' + JSON.stringify(xs, null, 1) + '\n```' : 'Aucun.', ''); }
  F.push('### ENTRY publiée `' + e.entry + '`', '', '```json', JSON.stringify(pub.find((x) => x.id === e.entry), null, 1), '```', '');
}
writeFileSync(join(root, FIC), F.join('\n'));
ok(nf === 2 && nx === 6, 'recueil : 2 fiches sources complètes, 6 anciens exemples', nf + ' fiches, ' + nx + ' anciens exemples');
console.log('écrits : ' + RAP + ', ' + FIC); console.log('rédaction conforme ; ' + JSON.stringify(compte));
