// A2-05 · volet 1 · lot 2 (provenance) : bilan exhaustif des 278 nuances du plan et des corrections retenues, en proposition.
// Lecture seule. Les verdicts sont relus dans les rapports arbitrés (titres et lignes « Verdict arbitré ») ; rien n'est rejugé.
// Usage : node bilan-provenance.mjs <racine>   (écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-bilan.md)
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

const root = process.argv[2];
const txt = (p) => readFileSync(join(root, p), 'utf8');
const plan = JSON.parse(txt('a2-05-travail/provenance/plan-tranches.json'));
const court = (s) => s.replace(" (nuance d'ENTRY)", '');
const chemin = (s) => `docs/rapports/etape2-A2-05-volet1-lot2-provenance${s ? `-${s}` : ''}.md`;
const suivis = new Set(execSync('git ls-files docs/rapports', { cwd: root, encoding: 'utf8' }).split('\n').filter(Boolean));
const VERDICTS = ['sourcé', 'assumé', 'écart'];

// Les 26 rapports de livraison du plan, dans l'ordre : suffixe du fichier, tranche du plan, libellé
const LIV = [
  ['1bis', '1 bis', '1 bis'], ['t2-lot00', '2', '2 · lot 00'], ['t2-lot01', '2', '2 · lot 01'], ['t3-lot02', '3', '3 · lot 02'], ['t3-lot03', '3', '3 · lot 03'],
  ['t4-lot05', '4', '4 · lot 05'], ['t4-lot06', '4', '4 · lot 06'], ['t5-5a', '5', '5a'], ['t5-5b', '5', '5b'], ['t5-5c', '5', '5c'],
  ['t6-6a', '6', '6a'], ['t6-6b', '6', '6b'], ['t6-6c', '6', '6c'], ['t6-6d', '6', '6d'], ['t6-6e', '6', '6e'],
  ['t7-7a', '7', '7a'], ['t7-7b', '7', '7b'], ['t7-7c', '7', '7c'], ['t7-7d', '7', '7d'], ['t7-7e', '7', '7e'],
  ['t8-8a', '8', '8a'], ['t8-8b', '8', '8b'], ['t8-8c', '8', '8c'], ['t8-8d', '8', '8d'], ['t8-8e', '8', '8e'], ['t8-8f', '8', '8f']
];

function lire(suffixe) {
  const t = txt(chemin(suffixe));
  const blocs = t.split(/^(?=### `)/m).filter((b) => b.startsWith('### `'));
  const unites = blocs.map((b) => {
    const ligne = b.split('\n')[0];
    // Le titre porte le verdict proposé ; dans le rapport de la tranche 1, il porte le verdict arbitré, suivi de « (proposé …) » s'il a changé.
    const m = ligne.match(/^### `((?:hj_)?v_\d+(?:_s\d+)?)` · (.+?) · .* — \*\*([^*]+)\*\*(?: \(proposé (sourcé|assumé|écart)\))?$/);
    if (!m || !VERDICTS.includes(m[3])) throw new Error(`titre illisible (${suffixe}) : ${ligne}`);
    const a = [...b.matchAll(/^- \*\*Verdict arbitré \(([^)]+)\)\*\* : \*\*(sourcé|assumé|écart)([^\n]*)/gm)];
    if (a.length !== 1) throw new Error(`verdict arbitré : ${a.length} ligne(s) pour ${m[1]} (${suffixe})`);
    if (m[4] && a[0][2] !== m[3]) throw new Error(`titre et verdict arbitré discordants : ${m[1]} (${suffixe})`);
    return { id: m[1], mot: m[2], propose: m[4] ?? m[3], arbitre: a[0][2], date: a[0][1], suite: a[0][3], v2: [...a[0][3].matchAll(/V2-(\d+)/g)].map((x) => Number(x[1])) };
  });
  if (!t.includes('**arbitré le') && !/arbitrée? le/.test(t.slice(0, 1500))) throw new Error(`rapport non marqué arbitré : ${suffixe}`);
  const lignes = [...new Set([...t.matchAll(/^\| V2-(\d+) \|/gm)].map((x) => Number(x[1])))];
  const dateArb = (t.match(/^## [A-Z0-9.]+ Arbitrage du (\S+)/m) ?? [])[1] ?? '?';
  return { t, unites, lignes, dateArb };
}

// 1. Lecture des 26 rapports et rapprochement avec le plan
const planIds = new Map(plan.toutes.map((u) => [court(u.sens), u]));
if (planIds.size !== 278) throw new Error('plan : 278 nuances distinctes attendues');
const R = LIV.map(([s, tranche, lib]) => ({ s, tranche, lib, ...lire(s) }));
const vues = new Map(); const horsPlan = [];
for (const r of R) for (const u of r.unites) {
  const p = planIds.get(u.id);
  if (!p) { horsPlan.push({ ...u, lib: r.lib }); continue; }
  if (vues.has(u.id)) throw new Error(`nuance du plan lue deux fois : ${u.id} (${vues.get(u.id).lib} et ${r.lib})`);
  if (p.tranche !== r.tranche) throw new Error(`tranche : ${u.id} est en tranche ${p.tranche} au plan, lue en ${r.lib}`);
  if (p.mot !== u.mot) throw new Error(`mot : ${u.id}, « ${p.mot} » au plan, « ${u.mot} » au rapport`);
  vues.set(u.id, { ...u, lib: r.lib, s: r.s, plan: p });
}
const oubliees = [...planIds.keys()].filter((k) => !vues.has(k));
if (oubliees.length) throw new Error(`nuances du plan sans verdict : ${oubliees.join(', ')}`);
if (vues.size !== 278) throw new Error(`couverture : ${vues.size}`);
if (horsPlan.length !== 2 || horsPlan.some((u) => !u.id.startsWith('hj_'))) throw new Error(`hors plan : ${horsPlan.map((u) => u.id).join(', ')}`);
const T1 = lire('');
if (T1.unites.length !== 34) throw new Error(`tranche 1 : ${T1.unites.length} unités`);

const compte = (l, k) => Object.fromEntries(VERDICTS.map((v) => [v, l.filter((u) => u[k] === v).length]));
const tot = compte([...vues.values()], 'arbitre');
if (tot['sourcé'] + tot['assumé'] + tot['écart'] !== 278) throw new Error('somme des verdicts');

// 2. Corrections : les lignes de la liste consolidée du bilan
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md');
const CORR = bilan.split('\n').filter((l) => /^\| (V[12]-\d+|\d+) \| `((?:hj_)?v_\d+)(_s\d+)?`/.test(l)).map((l) => {
  const c = l.replace(/^\| /, '').replace(/ \|$/, '').split(' | ');
  const m = c[1].match(/^`((?:hj_)?v_\d+)(_s\d+)?`$/);
  if (!m) throw new Error(`unité illisible : ${l.slice(0, 80)}`);
  const liste = /^\d+$/.test(c[0]) ? 'volet 2' : c[0].startsWith('V1-') ? 'volet 1, lot 1' : 'provenance';
  return { n: c[0], liste, unite: m[1] + (m[2] ?? ''), entree: m[1], mot: c[2], lot: c[3], champ: c.length === 6 ? c[4] : c[5] };
});
if (CORR.length !== 180 || new Set(CORR.map((c) => c.n)).size !== 180) throw new Error(`corrections : ${CORR.length} lignes, ${new Set(CORR.map((c) => c.n)).size} numéros`);
const parListe = compte2(CORR, (c) => c.liste);
function compte2(l, k) { const o = {}; for (const x of l) o[k(x)] = (o[k(x)] ?? 0) + 1; return o; }
if (parListe['volet 2'] !== 10 || parListe['volet 1, lot 1'] !== 5 || parListe.provenance !== 165) throw new Error(`listes : ${JSON.stringify(parListe)}`);
const V2 = CORR.filter((c) => c.liste === 'provenance');
const nums = V2.map((c) => Number(c.n.slice(3))).sort((a, b) => a - b);
if (nums.some((n, i) => n !== i + 1)) throw new Error('numéros V2 : suite 1 à 165 attendue');
const ENTREES = new Set(CORR.map((c) => c.entree));
if (ENTREES.size !== 161) throw new Error(`ENTRY corrigées : ${ENTREES.size}`);

// Origine de chaque correction de provenance : le rapport qui la porte (tableau, sinon ligne de verdict arbitré)
const SOURCES = [{ s: '', lib: 'tranche 1', ...T1 }, ...R];
const origine = new Map();
for (const r of SOURCES) for (const n of r.lignes) if (!origine.has(n)) origine.set(n, r.lib);
for (const r of SOURCES) for (const u of r.unites) for (const n of u.v2) if (!origine.has(n)) origine.set(n, r.lib);
const sansOrigine = nums.filter((n) => !origine.has(n));
if (sansOrigine.length) throw new Error(`corrections sans rapport d'origine : ${sansOrigine.join(', ')}`);
const parOrigine = compte2(nums, (n) => origine.get(n));

// Rapprochement écarts / corrections, unité par unité
const ecarts = [...vues.values(), ...horsPlan].filter((u) => u.arbitre === 'écart');
const ecartsSansCorr = ecarts.filter((u) => !V2.some((c) => c.unite === u.id));
const unitesT1 = new Map(T1.unites.map((u) => [u.id, u]));
const corrSansEcart = V2.filter((c) => {
  const o = origine.get(Number(c.n.slice(3)));
  const u = o === 'tranche 1' ? unitesT1.get(c.unite) : (vues.get(c.unite) ?? horsPlan.find((h) => h.id === c.unite));
  return !u || u.arbitre !== 'écart';
});
const corrDe = (id) => V2.filter((c) => c.unite === id).map((c) => c.n);

// 3. Rédaction
let md = '';
const P = (t = '') => { md += `${t}\n`; };
const pl = (n, s, p) => `${n} ${n > 1 ? p : s}`;
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : bilan exhaustif des 278 nuances et des corrections retenues');
P();
P('**Date** : 2026-10-12');
P('**Statut** : **arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **bilan accepté ; le contrôle de provenance (volet 1, lot 2) est clos documentairement.** Les 180 corrections restent retenues et non appliquées. **Ni A2-05 ni l\'étape 2 ne sont terminées.** La proposition est conservée ci-dessous, à une correction documentaire près, demandée par l\'arbitrage (§0).');
P();
P('## 0. Arbitrage du 2026-10-12');
P();
for (const l of [
  '**Décomptes confirmés** : 278 nuances du plan, toutes arbitrées ; 119 sourcées, 20 assumées, 139 écarts ; 34 unités de la tranche 1 et 2 hors JLPT, distinguées du plan ; 165 corrections de provenance ; 180 corrections retenues au total, dans 161 ENTRY ; aucune correction appliquée.',
  '**Rapprochements cohérents** entre les écarts du plan et les corrections associées. Les chevauchements avec les 377 candidats et les 147 arbitrages du volet 2 restent documentés et ne sont pas rouverts.',
  '**Le §5 est conservé**, notamment les réserves relatives aux décisions historiques, aux transcriptions de furigana, aux relations structurées et aux réductions d\'exemples.',
  '**Limites maintenues explicitement** : ce bilan prouve la couverture documentaire et la cohérence des décomptes ; **il ne constitue ni une nouvelle vérification lexicale de toutes les fiches, ni une preuve de reproductibilité complète.**',
  '**Correction documentaire demandée, faite** : la note d\'export qui accompagnait la proposition parlait de « dix-neuf rapports » non committés. Le décompte exact, établi sur git, est au §8.1 et au §8.3 : il distingue les rapports de provenance non suivis, les autres fichiers non suivis, et les fichiers suivis dont les modifications ne sont pas committées. **Aucun verdict ni aucune correction arbitrée n\'est modifié.**',
  '**Fichiers `06` et `07` des exports** : l\'explication de leur contenu historique est acceptée ; les exports suivants décrivent précisément les pièces utiles et leur emplacement ; l\'outil d\'export n\'est pas modifié.',
  '**Suite** : seule une proposition de périmètre est préparée pour l\'examen individuel des 377 candidats C1 à C10 ; aucune décision lexicale individuelle avant l\'accord sur ce périmètre ; G1 à G7 ne sont pas ouverts sans autorisation distincte.'
]) P(`- ${l}`);
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Bilan documentaire, demandé à l\'arbitrage de 8f. Il ne rejuge aucune nuance : les verdicts sont relus, par script, dans les rapports arbitrés (titre de chaque fiche et ligne « Verdict arbitré »), et rapprochés du plan arbitré et de la liste consolidée des corrections. **Aucune correction n\'est appliquée ; aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucun nouveau chantier lexical n\'est ouvert.** Calculé par `a2-05-travail/bilan-provenance.mjs`, qui s\'arrête au premier écart de contrôle.');
P();
P('## 1. Résultat');
P();
P(`**Les 278 nuances du plan de provenance sont toutes arbitrées : ${tot['sourcé']} sourcées, ${tot['assumé']} assumées, ${tot['écart']} écarts** (${tot['sourcé']} + ${tot['assumé']} + ${tot['écart']} = 278). Il ne reste aucune nuance de provenance à examiner.`);
P();
P(`**En dehors du plan des 278**, le contrôle de provenance a aussi arbitré : la **tranche 1** (34 unités des lots 04 et 07, nuances et particules, arbitrée le ${T1.dateArb} : ${compte(T1.unites, 'arbitre')['sourcé']} sourcées, ${compte(T1.unites, 'arbitre')['écart']} écarts), dont le plan des 278 est le reste recalculé ; et **2 nuances hors JLPT** (${horsPlan.map((u) => `\`${u.id}\` ${u.mot} : ${u.arbitre}`).join(' ; ')}), comptées à part dans le rapport du lot 05. Au total, ${278 + 34 + 2} unités ont reçu un verdict de provenance.`);
P();
P(`**Corrections retenues : 180, dans 161 ENTRY, toutes non appliquées** : 10 modifications du volet 2, 5 corrections du volet 1, lot 1 (V1-1 à V1-5), et **165 corrections de provenance (V2-1 à V2-165)**.`);
P();
P('## 2. Verdicts par tranche et par livraison');
P();
P('| Tranche | Livraison | Lots | Arbitrage | Nuances | Sourcées | Assumées | Écarts | Corrections de provenance | Rapport |');
P('|---|---|---|---|---|---|---|---|---|---|');
const plage = (l) => { if (!l.length) return 'aucune'; const s = [...l].sort((a, b) => a - b); const out = []; let d = s[0]; let p = s[0]; for (const n of s.slice(1)) { if (n === p + 1) { p = n; continue; } out.push(d === p ? `V2-${d}` : `V2-${d} à V2-${p}`); d = n; p = n; } out.push(d === p ? `V2-${d}` : `V2-${d} à V2-${p}`); return `${out.join(', ')} (${l.length})`; };
// Les corrections des nuances hors JLPT sont comptées à part : elles ne figurent pas dans la ligne de leur rapport
const horsJlpt = new Set(V2.filter((c) => c.unite.startsWith('hj_')).map((c) => Number(c.n.slice(3))));
const numsDe = (lib) => nums.filter((n) => origine.get(n) === lib && !horsJlpt.has(n));
const TR = ['1 bis', '2', '3', '4', '5', '6', '7', '8'];
for (const t of TR) {
  const rs = R.filter((r) => r.tranche === t);
  for (const r of rs) {
    const us = r.unites.filter((u) => planIds.has(u.id)); const c = compte(us, 'arbitre');
    P(`| ${t} | ${r.lib} | ${[...new Set(us.map((u) => planIds.get(u.id).lotN))].sort().join(', ')} | ${r.dateArb} | ${us.length} | ${c['sourcé']} | ${c['assumé']} | ${c['écart']} | ${plage(numsDe(r.lib))} | \`…-${r.s}.md\`${suivis.has(chemin(r.s)) ? '' : ' (non suivi)'} |`);
  }
  const us = [...vues.values()].filter((u) => u.plan.tranche === t); const c = compte(us, 'arbitre');
  if (us.length !== plan.toutes.filter((u) => u.tranche === t).length) throw new Error(`tranche ${t}`);
  P(`| **${t}** | **total** | | | **${us.length}** | **${c['sourcé']}** | **${c['assumé']}** | **${c['écart']}** | | |`);
}
P(`| **Plan** | **278 nuances** | | | **278** | **${tot['sourcé']}** | **${tot['assumé']}** | **${tot['écart']}** | | |`);
P();
const cT1 = compte(T1.unites, 'arbitre'); const cHJ = compte(horsPlan, 'arbitre');
P('Hors du plan des 278 :');
P();
P('| Ensemble | Unités | Sourcées | Assumées | Écarts | Corrections de provenance | Rapport |');
P('|---|---|---|---|---|---|---|');
P(`| Tranche 1 (lots 04 et 07 ; nuances et particules) | ${T1.unites.length} | ${cT1['sourcé']} | ${cT1['assumé']} | ${cT1['écart']} | ${plage(numsDe('tranche 1'))} | \`…-provenance.md\`${suivis.has(chemin('')) ? '' : ' (non suivi)'} |`);
P(`| Nuances hors JLPT (dans le rapport du lot 05) | ${horsPlan.length} | ${cHJ['sourcé']} | ${cHJ['assumé']} | ${cHJ['écart']} | ${plage(V2.filter((c) => c.unite.startsWith('hj_')).map((c) => Number(c.n.slice(3))))} | \`…-t4-lot05.md\` |`);
P();
const parNiveau = compte2([...vues.values()], (u) => u.plan.niveau);
P(`**Répartition des 278** : ${parNiveau.entree} nuances d'ENTRY et ${parNiveau.sens} nuances de sens, dans ${new Set([...vues.values()].map((u) => u.plan.entree)).size} ENTRY ; par statut du tri : ${Object.entries(compte2([...vues.values()], (u) => u.plan.statut)).map(([k, n]) => `${n} « ${k} »`).join(', ')}.`);
P();
const croise = {}; for (const u of vues.values()) { (croise[u.plan.statut] ??= { sourcé: 0, assumé: 0, écart: 0 })[u.arbitre] += 1; }
P('**Verdicts selon le classement du tri** (le classement orientait la lecture ; il ne valait pas verdict) :');
P();
P('| Statut du tri | Nuances | Sourcées | Assumées | Écarts |');
P('|---|---|---|---|---|');
for (const [k, c] of Object.entries(croise)) P(`| ${k} | ${c['sourcé'] + c['assumé'] + c['écart']} | ${c['sourcé']} | ${c['assumé']} | ${c['écart']} |`);
P();
P('## 3. Verdicts modifiés par l\'arbitrage');
P();
const modifies = [...[...vues.values()], ...horsPlan, ...T1.unites.map((u) => ({ ...u, lib: 'tranche 1' }))].filter((u) => u.propose !== u.arbitre);
P(`Le titre de chaque fiche porte le verdict proposé, et la ligne « Verdict arbitré » le verdict retenu (dans le rapport de la tranche 1, le titre porte le verdict arbitré et rappelle le verdict proposé lorsqu'il a changé). **${pl(modifies.length, 'verdict diffère', 'verdicts diffèrent')} entre la proposition et l'arbitrage**${modifies.length ? ' :' : '.'}`);
if (modifies.length) { P(); for (const u of modifies) P(`- \`${u.id}\` ${u.mot} (${u.lib}) : proposé **${u.propose}**, arbitré **${u.arbitre}**.`); }
P();
P('Les corrections dont le texte a été modifié, remplacé ou ajouté par l\'arbitrage, sans changement de verdict, sont rappelées au §6.');
P();
P('## 4. Couverture exhaustive des 278 identifiants');
P();
P('Chaque nuance du plan apparaît une fois, et une seule, avec le verdict relu dans son rapport. « Unité » est l\'identifiant de l\'ENTRY (nuance d\'ENTRY) ou du SENSE (nuance de sens). Les deux dernières colonnes rappellent les chevauchements relevés au plan, sans les rouvrir.');
P();
P('| # | Livraison | Unité | Mot | Lot | Niveau | Verdict arbitré | Corrections | Sens candidats (377) | Sens des 147 |');
P('|---|---|---|---|---|---|---|---|---|---|');
let i = 0;
for (const r of R) for (const u of r.unites) { if (!planIds.has(u.id)) continue; const p = planIds.get(u.id); i += 1; P(`| ${i} | ${r.lib} | \`${u.id}\` | ${u.mot} | ${p.lotN} | ${p.niveau === 'entree' ? 'ENTRY' : 'sens'} | ${u.arbitre}${u.propose !== u.arbitre ? ` (proposé : ${u.propose})` : ''} | ${corrDe(u.id).join(', ') || '—'} | ${p.candidats377.map((c) => `\`${c}\``).join(', ') || '—'} | ${p.dans147.map((c) => `\`${c}\``).join(', ') || '—'} |`); }
if (i !== 278) throw new Error('table de couverture');
P();
P('## 5. Réserves, exceptions et constats consignés');
P();
P('Cette section rassemble ce que les arbitrages ont demandé de consigner. **Aucun de ces points ne crée une règle normative** ; ce sont des constats propres au contrôle de provenance, tels que les rapports les portent. Les tranches 7 et 8 sont résumées ici d\'après leurs sections d\'arbitrage ; pour les tranches antérieures, les extraits du §5.3 sont cités mot pour mot.');
P();
P('### 5.1 Les nuances « assumées »');
P();
const assumes = [...vues.values()].filter((u) => u.arbitre === 'assumé');
P(`**${assumes.length} nuances sont assumées** : le renvoi ou l'élément publié n'est pas écrit par la fiche examinée, mais une décision validée l'assume expressément, et son fondement se vérifie. ${R.filter((r) => r.unites.some((u) => u.arbitre === 'assumé' && planIds.has(u.id))).map((r) => `${r.lib} : ${r.unites.filter((u) => u.arbitre === 'assumé' && planIds.has(u.id)).map((u) => `${u.mot} (\`${u.id}\`)`).join(', ')}`).join(' ; ')}. La décision qui fonde chaque « assumé » est citée dans la fiche de provenance correspondante.`);
P();
P('### 5.2 Réserves et constats des tranches 7 et 8');
P();
for (const l of [
  "**消す et 並ぶ (7e) : « assumés » avec réserve.** La fiche examinée ne nomme pas le correspondant (消える, 並べる) et n'est pas la source du renvoi ; l'affirmation « La fiche nomme elle-même son correspondant », dans D1192 et D1228, est inexacte pour ces deux ENTRY ; ces décisions validées assument néanmoins expressément le renvoi en nuance ; les fiches des partenaires attestent les couples. **D1192 et D1228 ne sont pas réécrites** ; l'inexactitude n'est consignée que dans les rapports.",
  "**Relations et champs structurés** : une relation structurée validée (`transitive_of`, `opposed_to`, `similar_to`, `equivalent_to`) ou un champ structuré validé (`suru_compatible: true`) ne fonde pas, à lui seul, un élément de nuance. D1577, D1579 (7e), D1337, D1587 (8d) et D1605 (8e) n'ont fondé aucun verdict.",
  "**Précédents « assumé » non généralisables** : 晩 (D0808, 7a), 色 (D1026, 7b), 短い (D1053, 7c), 強い et 弱い (D1134, D1137, 8b), 早い (D1402, 8b). Une décision qui assume expressément un élément de nuance se distingue d'une citation incidente d'un autre mot (下手 et D1090, 8a ; ある et D1305, 8d).",
  "**Graphie d'exemple assumée par une décision** : 閉まる (D1176, 7e), 出来る (D1315, 8d), 終わる (D1341, 8d). L'exemple source porte une graphie que la décision décrit comme défectueuse (閉りました, 出きる, 終りました) ; la nuance l'écrit avec la forme de l'entrée, attestée par les anciens exemples de la même fiche.",
  "**Verdict modifié par l'arbitrage : 低い (7c)**, reclassé de « sourcé » à « écart » ; le retrait de あまり retirait une information de degré de l'exemple source ; **V2-152 ajoutée par l'arbitrage**. À l'inverse, le retrait du thème de l'exemple (私は, かれは : 好き, 上手, 8a ; きょうは : 弱い, 8b) est une réduction de contexte acceptée.",
  "**Graphie non établie par la fiche examinée** : la transcription en kana est retenue sans attribuer de kanji, la fiche ne nommant le mot qu'en romaji et ce romaji ayant plusieurs graphies possibles dans les sources : atsui (薄い, V2-158), yasashii (難しい, V2-160), iru (ある, V2-163).",
  "**Exemples publiés avec le mot vedette en kana** : huit exemples (多い, 少ない, 大勢, 全部, 少し sens 1, en 8e ; 結構 sens 1, 一番 sens 1, 大体 sens 1, en 8f) sont acceptés comme transcriptions fidèles des furigana de leur propre fiche. **Ils ne sont pas graphiquement identiques aux exemples sources** ; le constat est individuel et ne crée aucune règle normative générale. L'harmonisation des exemples entre lots (d'autres lots publient le kanji de la fiche) n'est pas une question de provenance : elle est signalée, non traitée.",
  "**Défauts des sources signalés, non corrigés** (les sources figées restent intactes) : le terme « ventori » de la fiche de 近々 (7a) ; le texte parasite de l'exemple de 閉める (D1182) ; としばこ dans l'exemple de 静か (D1158) ; le verbe altéré de l'exemple de 他 (D1429) ; la traduction fautive de l'exemple de また (D1382) ; les furigana de 閉まる, 出来る, 終わる et 二十歳.",
  "**Lot 15 entièrement arbitré** (22 nuances : 9 sourcées, 2 assumées, 11 écarts)."
]) P(`- ${l}`);
P();
P('### 5.3 Extraits des arbitrages des tranches 1 à 6');
P();
P('Relevés par script dans la section d\'arbitrage de chaque rapport : les alinéas qui mentionnent une correction de repli, un reclassement, une variante, une généralisation écartée, une coquille ou un point « à noter ». Ils sont cités en entier, sans retouche.');
P();
const motsCles = /repli|reclass|variante|généralis|coquille|À noter|naît de l'arbitrage|n'est pas rouvert[e]? :|asymétrie/;
let nExtraits = 0;
for (const r of [{ s: '', lib: 'tranche 1', ...T1 }, ...R.filter((x) => ['1 bis', '2', '3', '4', '5', '6'].includes(x.tranche))]) {
  const sec = (r.t.split(/^## [A-Z0-9.]+ Arbitrage du [^\n]*\n/m)[1] ?? '').split(/^## /m)[0];
  const al = sec.split('\n').filter((l) => l.startsWith('- ') && motsCles.test(l) && !l.startsWith('- **Inchangés'));
  if (!al.length) continue;
  P(`**${r.lib}** (\`${chemin(r.s).split('/').pop()}\`) :`);
  P();
  for (const l of al) { P(l); nExtraits += 1; }
  P();
}
P(`${nExtraits} alinéas relevés. Les sections d'arbitrage complètes sont dans les rapports.`);
P();
P('## 6. Les 180 corrections retenues');
P();
P('**Toutes non appliquées.** Les textes des corrections sont dans la liste consolidée (`etape2-A2-05-bilan-volet2.md`, §2 et §8) ; ce tableau en donne l\'identité, la portée et l\'origine.');
P();
P('| # | Liste | Unité | Mot | Lot | Champ | Rapport d\'origine |');
P('|---|---|---|---|---|---|---|');
for (const c of CORR) P(`| ${c.n} | ${c.liste} | \`${c.unite}\` | ${c.mot} | ${c.lot} | ${c.champ} | ${c.liste === 'provenance' ? origine.get(Number(c.n.slice(3))) : c.liste === 'volet 2' ? 'audit des 147 `null`' : 'lot 1 (T1 à T8)'} |`);
P();
P('### 6.1 Unicité et décomptes');
P();
P(`- **180 lignes, 180 numéros distincts** : 10 (volet 2, n° 1 à 10) + 5 (V1-1 à V1-5) + 165 (V2-1 à V2-165, suite sans trou ni doublon).`);
P(`- **161 ENTRY distinctes** ; ${[...ENTREES].filter((e) => CORR.filter((c) => c.entree === e).length > 1).length} ENTRY portent plusieurs corrections (§6.3).`);
P(`- **Corrections de provenance par rapport d'origine** : ${['tranche 1', ...LIV.map((l) => l[2])].filter((k) => parOrigine[k]).map((k) => `${k} : ${parOrigine[k]}`).join(' ; ')} ; somme ${Object.values(parOrigine).reduce((a, b) => a + b, 0)}.`);
const champs = compte2(V2, (c) => (c.champ.includes('particles') ? 'particules' : c.champ.includes('ENTRY') ? 'nuance d\'ENTRY' : c.champ.includes('sens') ? 'nuance de sens' : c.champ));
P(`- **Portée des 165 corrections de provenance**, par champ : ${Object.entries(champs).map(([k, n]) => `${k} : ${n}`).join(' ; ')}. Aucune ne touche un sens, une lecture, une graphie d'ENTRY, une catégorie, un type ni une relation.`);
P();
P('### 6.2 Rapprochement des écarts et des corrections de provenance');
P();
P(`- **Écarts arbitrés** : ${tot['écart']} dans le plan des 278, ${cHJ['écart']} hors JLPT, ${cT1['écart']} en tranche 1 ; soit ${tot['écart'] + cHJ['écart'] + cT1['écart']}. **Corrections de provenance** : 165.`);
P(`- **Écarts du plan ou hors JLPT sans correction à leur identifiant** : ${ecartsSansCorr.length ? ecartsSansCorr.map((u) => `\`${u.id}\` ${u.mot} (${u.lib})`).join(' ; ') : 'aucun'}.`);
P(`- **Corrections de provenance dont l'unité n'est pas un écart arbitré du rapport d'origine** : ${corrSansEcart.length ? corrSansEcart.map((c) => `${c.n} \`${c.unite}\` ${c.mot} (${origine.get(Number(c.n.slice(3)))})`).join(' ; ') : 'aucune'}.`);
const multiU = [...new Set(V2.map((c) => c.unite))].filter((u) => V2.filter((c) => c.unite === u).length > 1);
P(`- **Unités portant plusieurs corrections de provenance** : ${multiU.length ? multiU.map((u) => `\`${u}\` (${V2.filter((c) => c.unite === u).map((c) => c.n).join(', ')})`).join(' ; ') : 'aucune'}.`);
P();
P('### 6.3 Rapprochement avec les autres corrections retenues');
P();
const autres = CORR.filter((c) => c.liste !== 'provenance');
const mixtes = [...new Set(autres.map((c) => c.entree))].filter((e) => V2.some((c) => c.entree === e));
P(`Les 15 autres corrections (volet 2 et volet 1, lot 1) portent sur ${new Set(autres.map((c) => c.entree)).size} ENTRY. **${mixtes.length} ENTRY portent à la fois une correction de provenance et une autre correction**, toujours sur des champs ou des unités différents :`);
P();
for (const e of mixtes) P(`- \`${e}\` ${CORR.find((c) => c.entree === e).mot.split(' «')[0]} : ${CORR.filter((c) => c.entree === e).map((c) => `${c.n} (\`${c.unite}\`, ${c.champ})`).join(' ; ')}.`);
P();
const multiE = [...ENTREES].filter((e) => CORR.filter((c) => c.entree === e).length > 1 && !mixtes.includes(e));
P(`ENTRY portant plusieurs corrections d'une même liste : ${multiE.map((e) => `\`${e}\` (${CORR.filter((c) => c.entree === e).map((c) => c.n).join(', ')})`).join(' ; ') || 'aucune'}. Le contrôle fait ici porte sur l'unicité des numéros et sur les couples (unité, champ) ; il ne compare pas le texte des corrections entre elles :${(() => { const k = CORR.map((c) => `${c.unite}|${c.champ}`); const d = [...new Set(k.filter((x, j) => k.indexOf(x) !== j))]; return d.length ? `couples répétés à relire : ${d.join(' ; ')}` : 'aucun couple (unité, champ) n\'est répété'; })()}.`);
P();
P('## 7. Chevauchements avec les 377 candidats et les 147 arbitrages du volet 2');
P();
const a377 = [...vues.values()].filter((u) => u.plan.candidats377.length); const s377 = new Set(a377.flatMap((u) => u.plan.candidats377));
const a147 = [...vues.values()].filter((u) => u.plan.dans147.length); const s147 = new Set(a147.flatMap((u) => u.plan.dans147));
const c377 = compte(a377, 'arbitre'); const c147 = compte(a147, 'arbitre');
P(`- **377 candidats du volet 1 (axes C1 à C10)** : ${a377.length} nuances du plan portent sur un sens candidat ou sur une ENTRY qui en a un ; elles touchent **${s377.size} sens candidats distincts sur 377**. Verdicts de provenance de ces nuances : ${c377['sourcé']} sourcées, ${c377['assumé']} assumées, ${c377['écart']} écarts. **Le décompte reste 377** : le contrôle de provenance n'a examiné que le champ \`nuance\` ; les sens, types, catégories et fonctions de ces candidats restent à examiner.`);
P(`- **147 arbitrages du volet 2** : ${a147.length} nuances du plan portent sur un sens arbitré au volet 2 ; elles touchent **${s147.size} sens distincts sur 147**. Verdicts de provenance : ${c147['sourcé']} sourcées, ${c147['assumé']} assumées, ${c147['écart']} écarts. **Aucun verdict du volet 2 n'est rouvert** (L 136, F 2, C 9, N 0).`);
const les2 = [...vues.values()].filter((u) => u.plan.candidats377.length && u.plan.dans147.length);
P(`- Nuances touchant à la fois un candidat et un sens des 147 : ${les2.length}${les2.length ? ` (${les2.map((u) => `\`${u.id}\` ${u.mot}`).join(', ')})` : ''}.`);
P('- Le détail, nuance par nuance, est dans les deux dernières colonnes du tableau du §4.');
P();
P('## 8. État des preuves, contrôles de cohérence et limites');
P();
P('### 8.1 Contrôles faits par ce script');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P('| Le plan compte 278 nuances distinctes | oui |');
P(`| Chaque nuance du plan a une fiche à verdict dans un rapport de livraison, et une seule | oui : 278 lues dans ${R.length} rapports, aucune oubliée, aucune lue deux fois |`);
P('| La tranche du plan est celle du rapport ; le mot du plan est celui de la fiche | oui, pour les 278 |');
P('| Chaque fiche porte un verdict proposé et exactement une ligne « Verdict arbitré » | oui, pour les 278, les 2 hors JLPT et les 34 de la tranche 1 |');
P(`| Somme des verdicts arbitrés | ${tot['sourcé']} + ${tot['assumé']} + ${tot['écart']} = 278 ; par tranche : ${TR.map((t) => `${t} : ${plan.toutes.filter((u) => u.tranche === t).length}`).join(' ; ')} |`);
P('| Liste consolidée des corrections | 180 lignes, 180 numéros distincts ; 10 + 5 + 165 ; V2-1 à V2-165 sans trou ; 161 ENTRY |');
P(`| Chaque correction de provenance a un rapport d'origine | oui : ${Object.values(parOrigine).reduce((a, b) => a + b, 0)} sur 165 |`);
P(`| Écarts sans correction ; corrections sans écart | ${ecartsSansCorr.length} ; ${corrSansEcart.length} (§6.2) |`);
const provSuivis = [{ s: '' }, ...R].filter((r) => suivis.has(chemin(r.s))).length;
const provNonSuivis = R.length + 1 - provSuivis;
const git = (cmd) => execSync(cmd, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).split('\n').filter(Boolean);
const nonSuivisDocs = git('git ls-files --others --exclude-standard docs');
const autresNonSuivis = nonSuivisDocs.filter((f) => !/provenance(-(1bis|t\d-[a-z0-9]+))?\.md$/.test(f));
const modifies2 = git('git diff --name-only');
const nom2 = (f) => `\`${f.split('/').pop()}\``;
P(`| Rapports de provenance suivis par git | ${provSuivis} sur ${R.length + 1} ; **${provNonSuivis} ne sont pas suivis** (tranches 6, 7 et 8) |`);
P(`| Autres fichiers non suivis sous \`docs/\` | ${autresNonSuivis.length} : ${autresNonSuivis.map(nom2).join(', ') || 'aucun'} |`);
P(`| Fichiers suivis dont les modifications ne sont pas committées | ${modifies2.length} : ${modifies2.map(nom2).join(', ') || 'aucun'} |`);
P();
P('### 8.2 Ce qui fonde chaque verdict');
P();
P('- **Une fiche de provenance par nuance**, dans le rapport de sa livraison : fiche source entière (traductions, particules, nuance, exemple, anciens exemples, fiche fusionnée le cas échéant), état publié, toutes les décisions de journal de l\'ENTRY, origine recherchée, verdict proposé, verdict arbitré, justification, correction, réserve.');
P('- **Un arbitrage explicite par livraison**, rendu par ChatGPT par délégation et relayé par l\'utilisateur, inscrit dans une section distincte du rapport, la proposition d\'origine étant conservée.');
P('- **Des recherches croisées par script** dans les sources figées, rapportées dans chaque rapport depuis la tranche 6.');
P();
P('### 8.3 Limites de vérification');
P();
for (const l of [
  "**Ce bilan relit les rapports ; il ne recalcule pas les verdicts à partir des sources.** Il prouve la couverture et la cohérence des décomptes, non le bien-fondé de chaque verdict, qui repose sur la fiche de provenance et sur son arbitrage.",
  "**Le plan des 278 nuances et les scripts d'audit sont dans `a2-05-travail/`, dossier hors dépôt.** La reproductibilité d'ensemble n'est pas prouvée : aucune relance complète, depuis un dépôt propre, n'a été tentée. Les rapports des livraisons 6d à 8f se régénèrent par leurs scripts (code 0 à leur dernier lancement) ; ceux des tranches antérieures n'ont pas été relancés pour ce bilan.",
  "**Le relecteur n'a pas accès au dépôt** : il a relu des exports. Les fiches sources y figuraient dans le texte de chaque rapport ; les fichiers `06` et `07` de l'export sont, par construction de l'outil, liés au préfixe « lot 27 » et contiennent des pièces historiques de la publication 5.17 (anomalie relevée à l'arbitrage de 8f, expliquée dans la note d'export).",
  "**Les nuances auditées sont celles de l'état publié au commit `3d67594`** : `data/`, les lots, le journal, les registres, les outils et les tests n'ont pas changé depuis (aucune différence git sur ces chemins). Une publication ultérieure imposerait de vérifier que les nuances corrigées sont bien celles qui ont été auditées.",
  "**Le texte français des nuances était hors périmètre**, sauf là où une correction devait en garder une partie. Quelques remarques sur le français ont été notées en réserve dans les rapports, sans audit.",
  "**Le tri initial ne valait pas verdict** (§2) : ses classes ont servi à orienter la lecture ; chaque nuance a été lue en entier.",
  `**Conservation des pièces** (§8.1) : ${provNonSuivis} des ${R.length + 1} rapports de provenance ne sont pas suivis par git, ainsi que ${autresNonSuivis.length} autres fichiers de \`docs/\` ; ${modifies2.length} fichiers suivis portent des modifications non committées. Un fichier non suivi n'a jamais été ajouté à git ; un fichier suivi et modifié l'a été, mais ses derniers changements ne sont pas enregistrés. Dans les deux cas, la conservation dépend de l'arbre de travail local tant qu'aucun commit n'est autorisé.`
]) P(`- ${l}`);
P();
P('## 9. Chantiers encore ouverts dans A2-05');
P();
for (const l of [
  "**Volet 1, examen individuel des 377 candidats restants** (axes C1 à C10) : non commencé au-delà du lot 1 (19 sens arbitrés : 14 conformes, 5 écarts). Il comprend les points réservés du criblage, l'audit rétroactif de la deixis temporelle (addendum A7) et les points transversaux ouverts par le volet 2 (relais, §6 bis).",
  "**Réserves non closes du lot 1 du volet 1** (bilan, §8.5), et le chantier normatif commun des 17 sens portant `interrogatif` (E5), à faire aboutir avant la clôture de l'étape 2.",
  "**Volet 3, contrôles globaux G1 à G7** : non commencé.",
  "**Application des 180 corrections retenues** : aucune n'est faite. Elle relève d'une phase distincte, sur autorisations explicites, par l'espace de reconstruction (réouverture journalisée des ENTRY, puis `publish --write`), jamais par une correction à la main de `data/`. Ce bilan ne la déclenche pas.",
  "**Questions signalées par le contrôle de provenance, hors de son périmètre** : l'harmonisation de la graphie des exemples cités en nuance (kana ou kanji, §5.2) ; les remarques sur le texte français des nuances ; les trois romaji dont la graphie n'est pas établie par la fiche (atsui, yasashii, iru).",
  "**Conservation des pièces** : les rapports des tranches 6 à 8, les périmètres des tranches 7 et 8 et ce bilan ne sont pas suivis par git ; les scripts d'audit sont hors dépôt, et leur conservation reste à arbitrer.",
  "**Gouvernance** : `CLAUDE.md` (§5) décrit encore l'état du checkpoint (130 nuances de provenance restantes, 124 corrections) ; `ETAT-ACTUEL.md` et `ROADMAP.md` sont à relire au même titre. Leur mise à jour relève d'un prochain checkpoint documentaire, sur accord.",
  "**Aucune clôture de l'étape 2 avant** l'examen des candidats du volet 1, les contrôles du volet 3 et l'arbitrage global."
]) P(`- ${l}`);
P();
P('## 10. Ce qui est demandé au relecteur');
P();
P('1. **Vérifier ce bilan** : la somme des verdicts (278), la couverture des identifiants, la liste des 180 corrections et leurs rapprochements.');
P('2. Dire si les **réserves et constats du §5** sont complets et fidèles aux arbitrages rendus.');
P('3. Dire si le **contrôle de provenance (volet 1, lot 2) peut être déclaré clos**, les 180 corrections restant non appliquées.');
P('4. Indiquer **le chantier suivant**, et demander son périmètre : aucun n\'est commencé.');
if (/ $/m.test(md)) throw new Error('rapport : espace en fin de ligne');
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-bilan.md'), md);
console.log(`bilan : 278 nuances (${tot['sourcé']} sourcées, ${tot['assumé']} assumées, ${tot['écart']} écarts) ; tranche 1 : ${T1.unites.length} (${cT1['sourcé']}, ${cT1['assumé']}, ${cT1['écart']}) ; hors JLPT : ${horsPlan.length} (${cHJ['sourcé']}, ${cHJ['assumé']}, ${cHJ['écart']}) ; verdicts modifiés : ${modifies.length} ; corrections : ${CORR.length} (${JSON.stringify(parListe)}), ${ENTREES.size} ENTRY ; origines : ${JSON.stringify(parOrigine)} ; écarts sans correction : ${ecartsSansCorr.length} ; corrections sans écart : ${corrSansEcart.length} ; 377 : ${a377.length} nuances, ${s377.size} sens ; 147 : ${a147.length} nuances, ${s147.size} sens ; extraits : ${nExtraits} ; lignes : ${md.split('\n').length}`);
