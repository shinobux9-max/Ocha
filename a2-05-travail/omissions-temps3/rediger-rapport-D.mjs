// A2-05 · bloc F · recherche d'omissions, temps 3, groupe D (T2-classe) : rédige le rapport de relecture (proposition), en trois sections (familles a, b, c),
// à partir des faits du dossier (perimetre-D.json) et de l'analyse écrite à la main (analyse-D.json), et le recueil des 41 fiches sources complètes.
// Lecture seule sur les données, sources, journal et lots. Contrôles : une analyse par sens du périmètre, et aucune autre ; champs présents ; conclusion
// parmi les trois d'A10 ; famille conforme à la fonction publiée ; décisions citées existantes et propres à l'ENTRY ; toutes les décisions de journal de
// chaque ENTRY citées ; livraisons du lot 3 citées exactes ; corrections citées exactes et complètes ; frontières demandées (classe et série en R3 pour
// chaque sens ; `deictique` en R3 pour la famille a ; registre poli pour あちら et 結構, sens 2 ; fonctions publiées en R4) ; porteurs cités effectivement
// porteurs d'`interrogatif` ; relevé des phrases interrogatives des fiches identique au relevé calculé. N'écrit que deux fichiers neufs (refus d'écraser).
// Usage : node a2-05-travail/omissions-temps3/rediger-rapport-D.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', RAP = O + 'rapport-relecture-D.md', FIC = O + 'fiches-D.md';
for (const f of [RAP, FIC]) if (existsSync(join(root, f))) throw new Error(f + ' existe déjà');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n'); const json = (p) => JSON.parse(txt(p));
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; };
const arret = () => { if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); } };

const PD = O + 'perimetre-D.json', PD_SHA = '7aa1d5915bdb8646048c34d99e1fe3932b9c7121cfdf933d3110f7659865d159';
ok(sha(PD) === PD_SHA, 'dossier factuel du périmètre accepté, à son empreinte', PD_SHA.slice(0, 16));
arret();
const P = json(PD), AN = json(O + 'analyse-D.json');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const src = [...json('reconstruction/a2-04/sources/vocab.json'), ...json('reconstruction/a2-04/sources/vocab-hors-jlpt.json')];
const ex = json('reconstruction/a2-04/sources/exemples.json').vocab ?? {}; const J = json('reconstruction/a2-04/journal.json');
const CONCL = ['ne relève pas de la fonction', 'relève de la fonction', 'à arbitrer'];
const FAM = { a: '`deictique` publiée', b: 'fonctions d\'A9 publiées', c: 'aucune fonction publiée' };
const A9 = ['connecteur', 'discours', 'politesse', 'quantificateur', 'comparatif', 'intensifieur'];
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const famDe = (s) => fns(s).includes('deictique') ? 'a' : fns(s).some((f) => A9.includes(f)) ? 'b' : fns(s).length ? '?' : 'c';
const ids = P.sens.map((s) => s.id); const court = (d) => d.replace('A2-04-', '');
const porteurs = new Set(pub.filter((e) => e.senses.some((s) => fns(s).includes('interrogatif'))).map((e) => e.id));
ok(P.sens.length === 53 && P.entrees.length === 40, 'périmètre : 53 sens, 40 ENTRY');
ok(JSON.stringify(Object.keys(AN).sort()) === JSON.stringify([...ids].sort()), 'une analyse par sens du périmètre, et aucune autre', Object.keys(AN).length + ' analyses');
let nDec = 0, nCorr = 0;
for (const e of P.entrees) {
  const E = pub.find((x) => x.id === e.entry);
  const sensE = e.sensPublies.map((s) => s.id).filter((i) => AN[i]); const texteE = sensE.map((i) => Object.values(AN[i]).join(' ')).join(' ');
  for (const d of e.decisions) { nDec++; if (!new RegExp('\\b' + court(d.id) + '\\b').test(texteE)) ok(false, e.entry + ' : décision de journal de l\'ENTRY non citée', court(d.id)); }
  for (const sp of e.sensPublies) {
    const id = sp.id; const a = AN[id] ?? {}; const S = E.senses.find((x) => x.id === id);
    if (!sp.candidatD) ok(false, id + ' : sens de l\'ENTRY hors du groupe D');
    const manque = ['famille', 'indice', 'r1', 'r2', 'r3', 'r4', 'r5', 'conclusion', 'motif'].filter((k) => !String(a[k] ?? '').trim());
    if (manque.length) ok(false, id + ' : champs manquants', manque.join(', '));
    if (!CONCL.includes(a.conclusion)) ok(false, id + ' : conclusion hors des trois d\'A10', a.conclusion);
    if (a.famille !== famDe(S)) ok(false, id + ' : famille non conforme à la fonction publiée', a.famille + ' / ' + famDe(S));
    const texte = Object.values(a).join(' ');
    for (const d of texte.match(/\bD\d{4}\b/g) ?? []) if (!J.some((x) => x.id === 'A2-04-' + d)) ok(false, id + ' : décision citée inexistante', d);
    for (const d of texte.match(/\bD\d{4}\b/g) ?? []) if (!e.decisions.some((x) => court(x.id) === d)) ok(false, id + ' : décision citée étrangère à l\'ENTRY', d);
    const l3 = [...texte.matchAll(/lot 3 \(([A-FT]\d+)/g)].map((m) => m[1]); if (l3.some((x) => x !== sp.lot3) || (sp.lot3 && !l3.length) || (!sp.lot3 && !/hors des 377/.test(a.r5))) ok(false, id + ' : livraison du lot 3 citée inexacte ou absente', l3.join() + ' / ' + sp.lot3);
    for (const c of texte.match(/\bV[12]-\d+\b/g) ?? []) if (!e.corrections.some((x) => x.startsWith(c + ' '))) ok(false, id + ' : correction citée étrangère à l\'ENTRY', c);
    for (const m of texte.matchAll(/porteur `(v_\d+)`/g)) if (!porteurs.has(m[1])) ok(false, id + ' : porteur cité sans la fonction', m[1]);
    if (!/§3, point 2/.test(a.r3)) ok(false, id + ' : frontière de la classe et de la série (A10, §3, point 2) non examinée en R3');
    if (a.famille === 'a' && !/§4, point 2/.test(a.r3)) ok(false, id + ' : frontière `deictique` (A10, §4, point 2) non examinée en R3');
    for (const f of fns(S)) if (!a.r4.includes('`' + f + '`')) ok(false, id + ' : fonction publiée non citée en R4', f);
  }
  for (const c of e.corrections) { nCorr++; const cid = c.split(' (')[0]; if (!texteE.includes(cid)) ok(false, e.entry + ' : correction retenue non citée', cid); }
}
ok(nDec === 148, 'les 148 décisions de journal des 40 ENTRY, chacune citée', nDec + ' décisions');
ok(nCorr === 12, 'les 12 corrections retenues des 9 ENTRY, chacune citée', nCorr + ' corrections');
for (const id of ['v_404_s1', 'v_404_s2', 'v_471_s2']) ok(/§4, point 3/.test(AN[id]?.r3 ?? ''), id + ' : frontière du registre poli (A10, §4, point 3) examinée en R3');
ok(/§4, point 1/.test(AN.v_446_s1?.r3 ?? ''), '小さな : frontière des indéfinis (A10, §4, point 1) examinée en R3, pour 何か');
ok(/§6/.test(AN.v_500_s2?.r4 ?? '') && /modification 1/.test(AN.v_500_s2?.r4 ?? ''), 'また, sens 2 : cumul (A10, §6) apprécié avec la correction retenue, en R4');

// Relevé des phrases interrogatives des sources relues : tout exemple dont la traduction est une question, et l'interrogation indirecte de 自分
const nu = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const phrases = (fid) => { const s = src.find((x) => x.id === fid); return [['exemple', s.example], ...(ex[fid] ?? []).map((x, i) => ['ancien exemple ' + (i + 1), x])].map(([o, x]) => ({ fid, o, j: nu(x.japanese), f: nu(x.french) })); };
const toutes = P.entrees.flatMap((e) => e.fiches.flatMap((f) => phrases(f.id).map((p) => ({ ...p, mot: e.mot, entry: e.entry }))));
const Q = [
  ['n5_v_407', 'exemple', 'なん (porteur `v_401`) ; あれ, thème montré'], ['n5_v_407', 'ancien exemple 2', '何 (porteur `v_401`) ; あれ, thème montré'],
  ['n5_v_411', 'exemple', 'いくら (porteur `v_179`) ; これ, thème montré'], ['n5_v_411', 'ancien exemple 2', '何 (porteur `v_401`) ; これ, thème montré'],
  ['n5_v_415', 'ancien exemple 2', 'question fermée, marquée par か ; その montre le parapluie'],
  ['n5_v_438', 'ancien exemple 2', 'いくら (porteur `v_179`) ; 同じ, dans la réponse'],
  ['n5_v_471', 'ancien exemple 3', 'question fermée de l\'autre locuteur, か ; 結構, dans la réponse'],
  ['n5_v_497', 'ancien exemple 3', 'demande de permission, いいですか ; ちょっと dit la brièveté (sens 2)'],
  ['n5_v_501', 'ancien exemple 3', 'question fermée de l\'autre locuteur, か ; まだ, dans la réponse (sens 2) ; もう, dans la question'],
  ['n5_v_506', 'ancien exemple 2', 'question fermée de l\'autre locuteur, か ; よく, dans la réponse (sens 2)'],
  ['n5_v_518', 'ancien exemple 3', 'requête traduite par une question, sans marque d\'interrogation en japonais ; すぐに, dans la réponse'],
  ['n5_v_521', 'ancien exemple 3', 'question fermée de l\'autre locuteur, か ; たぶん, dans la réponse'],
  ['n5_v_581', 'exemple', 'どこ (porteur `v_395`) ; あなた, thème'], ['n5_v_581', 'ancien exemple 2', 'いつ (porteur `v_391`) ; あなた, thème'], ['n5_v_581', 'ancien exemple 3', 'どう (porteur `v_393`) ; あなた, thème'],
  ['n5_v_639', 'ancien exemple 1', 'question fermée de l\'autre locuteur, か ; 全部, dans la réponse ; もう, dans la question'],
  ['n5_v_639', 'ancien exemple 3', 'いくら (porteur `v_179`) ; 全部で dit l\'étendue du total'],
  ['n5_v_691', 'ancien exemple 3', 'interrogation indirecte, 何 (porteur `v_401`) et か ; 自分, agent de la réflexion'],
];
const calcule = toutes.filter((p) => /[?？]/.test(p.f)).map((p) => p.fid + ' · ' + p.o);
const releve = Q.filter(([f]) => f !== 'n5_v_691').map(([f, o]) => f + ' · ' + o);
ok(JSON.stringify([...calcule].sort()) === JSON.stringify([...releve].sort()), 'relevé des phrases traduites par une question identique au relevé calculé', calcule.length + ' phrases');
const p691 = toutes.find((p) => p.fid === 'n5_v_691' && p.o === 'ancien exemple 3'); ok(/何 を する か/.test(p691?.j ?? ''), '自分 : interrogation indirecte (何をするか) présente dans l\'ancien exemple 3');
for (const [, , porte] of Q) for (const m of porte.matchAll(/porteur `(v_\d+)`/g)) if (!porteurs.has(m[1])) ok(false, 'relevé : porteur cité sans la fonction', m[1]);
const nAE = P.entrees.reduce((n, e) => n + e.fiches.reduce((m, f) => m + (ex[f.id] ?? []).length, 0), 0); const nFi = P.entrees.reduce((n, e) => n + e.fiches.length, 0);
ok(nFi === 41 && nAE === 123, 'sources : 41 fiches, 123 anciens exemples', nFi + ' fiches, ' + nAE + ' anciens exemples');
const typeComme = P.entrees.flatMap((e) => e.decisions.filter((d) => /comme 何 et いくら/.test(J.find((x) => x.id === d.id).reason)).map((d) => court(d.id)));
ok(typeComme.length === 13, 'décisions de type rapprochées de 何 et いくら : 13, toutes citées en R5', typeComme.join(', '));
ok(!ko, 'analyses complètes, conclusions admises, familles conformes ; décisions, livraisons, corrections et porteurs cités exacts et complets ; frontières demandées examinées ; relevé des questions exact');
arret();

const compte = Object.fromEntries(CONCL.map((c) => [c, ids.filter((i) => AN[i].conclusion === c).length]));
const parFam = Object.fromEntries(Object.keys(FAM).map((f) => [f, ids.filter((i) => AN[i].famille === f)]));
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const decR = (id) => '« ' + J.find((x) => x.id === id).reason + ' »';
const lot3 = P.entrees.flatMap((e) => e.sensPublies).filter((s) => s.lot3); const ecarts = lot3.filter((s) => /\(A7, écart/.test(AN[s.id].r5)).map((s) => s.id);
const deuxFam = P.entrees.filter((e) => new Set(e.sensPublies.map((s) => AN[s.id].famille)).size > 1);
const L = ['# Étape 2 · A2-05 · bloc F · recherche d\'omissions d\'`interrogatif`, temps 3 — relecture du groupe D', '',
  '**Date** : 2026-11-04', '**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; aucune omission n\'est appliquée.', '',
  '**Autorisation** (relayée) : « QD-4 : OUI. J\'autorise maintenant l\'ouverture de la relecture lexicale du groupe D, strictement limitée aux 53 sens dans 40 ENTRY du périmètre accepté. Produis un seul rapport organisé en trois sections […]. Pour chacun des 53 sens, lis intégralement la fiche source, ses traductions, nuances et exemples, les anciens exemples, l\'ENTRY publiée et les décisions historiques applicables. Applique la grille R1 à R5 et propose une conclusion motivée selon A10, sans présumer du résultat à partir de la classe grammaticale ou des fonctions déjà publiées. Préserve les anciens arbitrages du lot 3 et les 12 corrections retenues concernant D. Signale les contradictions éventuelles sans modifier les décisions historiques. »', '',
  '**Base** :', '- addendum A10 (§2 définition ; §3 principes ; §4 frontières ; §6 cumul ; §8 temps 3) ;', '- périmètre du groupe D accepté le 2026-11-04 (QD-1 à QD-3 ; QD-4, ouverture), `proposition-perimetre-D.md` ;', '- dossier factuel `perimetre-D.json` (SHA-256 `' + PD_SHA.slice(0, 16) + '…`).', '',
  'Les 41 fiches sources complètes, leurs 123 anciens exemples et les 40 ENTRY publiées sont recueillis dans `fiches-D.md`. Les analyses individuelles sont dans `analyse-D.json`, et rendues en entier aux sections 4 à 6.', '',
  '## 1. Synthèse', '',
  '| Conclusion | a | b | c | Total |', '|---|---|---|---|---|',
  ...CONCL.map((c) => '| ' + c + ' | ' + ['a', 'b', 'c'].map((f) => parFam[f].filter((i) => AN[i].conclusion === c).length).join(' | ') + ' | ' + compte[c] + ' |'),
  '| **Total** | **' + parFam.a.length + '** | **' + parFam.b.length + '** | **' + parFam.c.length + '** | **53** |', '',
  '**Aucune omission n\'est signalée dans le groupe D.** Les 53 sens ne sont relevés que par leur classe (`T2-classe`), et onze aussi par l\'absence de catégorie ou de type (`T2-nuls`) ; aucun de ces indices ne décide (A10, §3, point 2 ; §8, temps 2). Aucune fiche ne décrit un emploi qui demande une information : les sens montrent ou désignent (famille a), quantifient, modifient un degré ou accomplissent un acte social (famille b), ou situent, qualifient et désignent (famille c).', '',
  '**Dix-huit phrases sont relevées dans les sources** (§2) : dix-sept interrogatives, dont une indirecte, et une requête traduite par une question. Dans chacune, l\'information demandée est tenue par un mot qui porte déjà la fonction (何, いくら, どこ, いつ, どう), ou la question est fermée et marquée par か, et le mot relu y est le thème, un élément de la réponse ou un complément. Aucun mot relu n\'y tient la place de l\'information demandée.', '',
  '| N° | Famille | SENSE | Mot | Traduction publiée | Filtres d\'origine | Lot 3 | Conclusion | Motif |', '|---|---|---|---|---|---|---|---|---|',
  ...P.sens.map((s, i) => { const E = pub.find((x) => x.id === s.entry); const S = E.senses.find((x) => x.id === s.id); const sp = P.entrees.find((e) => e.entry === s.entry).sensPublies.find((x) => x.id === s.id); return '| ' + (i + 1) + ' | ' + AN[s.id].famille + ' | `' + s.id + '` | ' + E.word + ' | ' + cell(S.meaning.primary) + ' | ' + s.filtres.map((f) => '`' + f + '`').join(', ') + ' | ' + (sp.lot3 ?? '—') + ' | ' + AN[s.id].conclusion + ' | ' + cell(AN[s.id].motif) + ' |'; }), '',
  '## 2. Les phrases interrogatives des sources relues', '',
  'Relevé complet, vérifié par le script : toute phrase des 41 fiches dont la traduction est une question (17), et l\'interrogation indirecte d\'un ancien exemple de 自分 (1). Une question d\'exemple n\'atteste pas la fonction du mot illustré (A10, §3, point 1 ; §8, temps 1) ; elle est lue en entier, et le rapport dit ce qui porte l\'interrogation.', '',
  '| N° | Fiche | Mot | Phrase | Traduction de la source | Ce qui porte l\'interrogation |', '|---|---|---|---|---|---|',
  ...Q.map(([fid, o, porte], i) => { const p = toutes.find((x) => x.fid === fid && x.o === o); return '| ' + (i + 1) + ' | `' + fid + '`, ' + o + ' | ' + p.mot + ' | ' + cell(p.j) + ' | ' + cell(p.f) + ' | ' + cell(porte) + ' |'; }), '',
  '## 3. Frontières, cohérence et points signalés', '',
  '### 3.1 Frontières examinées', '',
  '| Frontière | Où elle s\'applique | Résultat |', '|---|---|---|',
  '| **Classe et série** (A10, §3, point 2) | les 53 sens ; les 13 sens de démonstratifs de la série ko-so-a-do | ne décident jamais. Les membres en ど cités (どこ, どちら, どっち, どの, どれ) portent bien la fonction ; le pendant de こんな (どんな) n\'est pas une ENTRY publiée |',
  '| **`deictique`** (§4, point 2) | famille a (15 sens) | montrer un référent par la situation n\'est pas demander une information ; `deictique` n\'est pas réexaminée |',
  '| **Registre poli** (§4, point 3) | あちら (2 sens) ; 結構 « Non merci » | la politesse se dit en nuance ou par `politesse` ; elle ne fait pas un interrogatif |',
  '| **Indéfini** (§4, point 1) | 何か, dans un ancien exemple de 小さな | 何か n\'interroge pas, et ne concerne pas le mot relu |',
  '| **Marques grammaticales** (§4, point 5) | les questions fermées et l\'interrogation indirecte du §2 | か porte la question ; hors du périmètre d\'A10 |',
  '| **Cumul** (§6) | famille b ; また, sens 2, avec la correction retenue `connecteur` | `interrogatif` n\'étant établi pour aucun sens, aucun cumul ne se pose |',
  '| **Incertitude et hésitation** | たぶん ; ちょっと (formule atténuante, en nuance) | exprimer une incertitude ou hésiter n\'est pas demander une information (§2), lecture arbitrée pour どうも au groupe C, appliquée ici fiche par fiche |', '',
  '### 3.2 ENTRY présentes dans deux familles', '',
  ...deuxFam.map((e) => '- **' + e.mot + '** (`' + e.entry + '`) : ' + e.sensPublies.map((s) => '`' + s.id + '` « ' + pub.find((x) => x.id === e.entry).senses.find((x) => x.id === s.id).meaning.primary + ' » (famille ' + AN[s.id].famille + ')').join(', ') + '. Chaque sens est relu pour lui-même (A10, §3, point 3), sur la même fiche et les mêmes décisions ; les décisions sont citées en entier à la première section où l\'ENTRY apparaît. Conclusions : ' + [...new Set(e.sensPublies.map((s) => AN[s.id].conclusion))].join(', ') + ', pour chacun de ses sens. Les phrases interrogatives de la fiche sont rattachées au sens qu\'elles illustrent (§2).'), '',
  '### 3.3 Points signalés, sans contradiction avec A10', '',
  '1. **Treize décisions de type** (' + typeComme.join(', ') + ') justifient l\'absence de type d\'un démonstratif « comme 何 et いくら », deux porteurs de la fonction. Le rapprochement porte sur le type, non sur la fonction : il ne fait d\'aucun démonstratif un interrogatif, et A10, §5, point 2 (la fonction ne décide pas du type) n\'est pas en cause, puisque ces sens ne portent pas `interrogatif`. Le type est hors de la présente relecture ; aucune décision n\'est réécrite.',
  '2. **D1381 (また, sens 2) et D1421 (同じ)** refusent `connecteur` et `comparatif` faute de définition normative, au lot 21 et au lot 22, avant A9. Ce point est étranger à `interrogatif` ; pour また, sens 2, la modification 1 du volet 2 en tire déjà la conséquence (correction retenue, non appliquée).',
  '3. **Aucune décision ne contredit la définition d\'A10.** Aucune des 148 décisions ne parle de la question, n\'attribue ni ne refuse `interrogatif`.', '',
  '## 4 à 6. Relecture, sens par sens, en trois sections', '',
  'Pour chaque sens sont donnés :', '- les filtres d\'origine, conservés depuis la mesure ;', '- l\'indice qui l\'a fait relever ;', '- l\'état publié ;', '- puis R1 à R5, selon la grille acceptée (QD-3).', '',
  'Toutes les décisions de journal de l\'ENTRY sont citées en entier sous l\'ENTRY, à sa première apparition, et confrontées en R5.', ''];
const prem = new Map(); const NUM = { a: 4, b: 5, c: 6 };
for (const f of ['a', 'b', 'c']) {
  L.push('## ' + NUM[f] + '. Section ' + f + ' — ' + FAM[f] + ' (' + parFam[f].length + ' sens)', '');
  for (const e of P.entrees) {
    const sensF = e.sensPublies.filter((s) => AN[s.id].famille === f); if (!sensF.length) continue;
    const E = pub.find((x) => x.id === e.entry);
    L.push('### ' + E.word + ' (' + (E.readings?.[0]?.kana ?? '') + ') — `' + e.entry + '`, classe `' + e.classe + '`', '',
      '- **Fiche source** : ' + e.fiches.map((fi) => '`' + fi.id + '` (' + fi.lot + ', ' + fi.anciensExemples + ' anciens exemples)').join(' ; ') + (e.fiches.length > 1 ? ' — fiche fusionnée comprise' : '') + '.');
    if (prem.has(e.entry)) L.push('- **Décisions de journal de l\'ENTRY** (' + e.decisions.length + ') : citées en entier en section ' + prem.get(e.entry) + '.');
    else { L.push('- **Décisions de journal de l\'ENTRY** (' + e.decisions.length + ', toutes `validated`) :', ...e.decisions.map((d) => '  - **' + court(d.id) + '** (' + d.champ + ', ' + d.nature + ') : ' + decR(d.id))); prem.set(e.entry, f); }
    L.push('- **Corrections retenues, non appliquées** : ' + (e.corrections.join(' ; ') || 'aucune') + '.', '');
    for (const sp of sensF) {
      const s = P.sens.find((x) => x.id === sp.id); const a = AN[sp.id]; const S = E.senses.find((x) => x.id === sp.id);
      L.push('#### `' + sp.id + '` · « ' + S.meaning.primary + ' » — proposé : **' + a.conclusion + '**', '',
        '- **Filtres d\'origine** : ' + s.filtres.map((x) => '`' + x + '`').join(', ') + '.',
        '- **Indice relevé** : ' + a.indice,
        '- **État publié** :', '  - traductions « ' + [S.meaning.primary, ...(S.meaning.alternatives ?? [])].join(' ; ') + ' » ;', '  - catégorie `' + cat(S.category) + '` ; type `' + S.semantic_type + '` ;', '  - fonctions ' + (fns(S).map((x) => '`' + x + '`').join(', ') || 'aucune') + ' ;', '  - nuance du sens : ' + (S.nuance ? '« ' + S.nuance + ' »' : 'aucune') + ' ;', '  - lot 3 : ' + (sp.lot3 ? 'livraison ' + sp.lot3 + ' (verdict arbitré, non rouvert)' : 'hors des 377') + '.',
        '- **R1** (rôle de demander une information non spécifiée) : ' + a.r1, '- **R2** (attestation par la fiche) : ' + a.r2, '- **R3** (frontières) : ' + a.r3, '- **R4** (cumul) : ' + a.r4, '- **R5** (décisions existantes) : ' + a.r5,
        '- **Conclusion proposée** : **' + a.conclusion + '**. **Motif** : ' + a.motif, '');
    }
  }
}
L.push('## 7. Décomptes séparés', '',
  '- **Groupe D** : 53 sens relus (a ' + parFam.a.length + ', b ' + parFam.b.length + ', c ' + parFam.c.length + ') ; ' + compte[CONCL[0]] + ' « ne relève pas de la fonction », ' + compte[CONCL[1]] + ' « relève de la fonction », ' + compte[CONCL[2]] + ' « à arbitrer ».',
  '- **Lot 3** : ' + lot3.length + ' sens communs, relus sur la seule fonction (QD-3) ; leurs verdicts sont cités, non rouverts : ' + (lot3.length - ecarts.length) + ' « conforme », ' + ecarts.length + ' « écart » (' + ecarts.map((i) => '`' + i + '`').join(', ') + ', livraison A7 : le type, V1-7 et V1-8, non la fonction). ' + (53 - lot3.length) + ' sens hors des 377. Ce décompte n\'est pas ajouté aux 377.',
  '- **Recherche d\'omissions** : après les groupes A, B, C et D, 113 sens relus sur 234 candidats (A 39, B 18, C 3, D 53) ; 121 restent, dans le groupe E, non commencé. 573 sens n\'ont été relevés par aucun filtre ; ils n\'ont pas été relus et ne sont pas, de ce fait, vérifiés conformes. Ces décomptes ne s\'additionnent ni aux 377 ni au contrôle des 17 porteurs.', '',
  '## 8. Observations hors périmètre', '',
  'Relevées à la lecture, sans verdict ni correction ; aucune ne touche une conclusion. Les anomalies déjà journalisées (D1372, D1382, D1393, D1546) ne sont pas répétées.',
  '- あそこ, ancien exemple 3 : « あそことの建物 », forme altérée (sa traduction dit « le bâtiment là-bas »).',
  '- こっち : le romaji de la fiche est « kochi » pour こっち ; son ancien exemple 2 (こっちの方が味が良い) est traduit « le goût est meilleur par ici », là où la phrase compare deux choses.',
  '- 大きな, exemple : « はなまし た », forme verbale altérée.',
  '- ちょっと, ancien exemple 2 : traduction « Je n\'ai pas un peu de temps ».',
  '- まだ, ancien exemple 3 : traduction « Non, pas encore décidément ».',
  '- よく, ancien exemple 2 : traduction « je le connais bien / souvent », qui hésite entre les deux sens.',
  '- あまり, ancien exemple 1 : « 辛い ありません », forme négative altérée.',
  '- もっと, ancien exemple 3 : 時間がありません traduit « Il n\'y a plus de temps ».',
  '- あなた, ancien exemple 1 : « von nom » dans la traduction.',
  '- 自分, ancien exemple 1 : balise ruby mal formée (`全部<rt>ぜんぶ</rt></ruby>`).', '',
  '## 9. Ce qui n\'est pas fait', '',
  '- Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; les 204 corrections restent non appliquées, dont les 12 qui concernent le groupe D.',
  '- Le groupe E n\'est pas commencé.',
  '- La catégorie, le type et les fonctions déjà portées (`deictique`, fonctions d\'A9) des 53 sens ne sont pas réexaminés ; les verdicts du lot 3 restent inchangés.', '',
  '## 10. Décisions attendues', '',
  '1. Arbitrer les 53 conclusions proposées (toutes « ne relève pas de la fonction »), par section ou dans leur ensemble.',
  '2. Confirmer, ou non, les lectures du rapport : les phrases interrogatives des exemples (§2) ; l\'incertitude de たぶん et l\'hésitation de ちょっと (§3.1) ; les points signalés (§3.3).',
  '3. Décider, séparément, de la suite : l\'inscription de l\'arbitrage du groupe D, puis le périmètre du groupe E.', '');
writeFileSync(join(root, RAP), L.join('\n'));

// Recueil des 41 fiches complètes
const LUS = ['reconstruction/a2-04/sources/vocab.json', 'reconstruction/a2-04/sources/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/exemples.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json'];
const F = ['# Groupe D — les 41 fiches sources complètes, leurs anciens exemples et les 40 ENTRY publiées', '',
  'Recopiés tels quels, sans retouche, dans l\'ordre du périmètre :', '- fiches de `reconstruction/a2-04/sources/vocab.json` (sources figées) ;', '- anciens exemples de `reconstruction/a2-04/sources/exemples.json` (clé `vocab`) ;', '- ENTRY de `data/n5/vocab.json`.', '',
  'Empreintes des fichiers lus :', ...LUS.map((p) => '- `' + p + '` `' + sha(p).slice(0, 16) + '`'), ''];
let nf = 0, nx = 0;
for (const e of P.entrees) {
  F.push('## ' + e.mot + ' — `' + e.entry + '`', '');
  for (const f of e.fiches) { const s = src.find((x) => x.id === f.id); nf++; const xs = ex[f.id] ?? []; nx += xs.length;
    F.push('### Fiche source `' + f.id + '`', '', '```json', JSON.stringify(s, null, 1), '```', '', '### Anciens exemples de `' + f.id + '` (' + xs.length + ')', '', xs.length ? '```json\n' + JSON.stringify(xs, null, 1) + '\n```' : 'Aucun.', ''); }
  F.push('### ENTRY publiée `' + e.entry + '`', '', '```json', JSON.stringify(pub.find((x) => x.id === e.entry), null, 1), '```', '');
}
writeFileSync(join(root, FIC), F.join('\n'));
ok(nf === 41 && nx === 123, 'recueil : 41 fiches sources complètes, 123 anciens exemples', nf + ' fiches, ' + nx + ' anciens exemples');
console.log('écrits : ' + RAP + ', ' + FIC); console.log('rédaction conforme ; ' + JSON.stringify(compte));
