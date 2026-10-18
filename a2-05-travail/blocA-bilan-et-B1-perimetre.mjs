// A2-05 · volet 1 · lot 3 : bilan du bloc A (sept livraisons, 69 sens) et périmètre opérationnel de la livraison B1.
// Lecture seule sur les données ; n'ouvre aucune fiche source ; ne rejuge rien et ne décide rien.
// Usage : node blocA-bilan-et-B1-perimetre.mjs <racine du dépôt>
//   écrit docs/rapports/etape2-A2-05-volet1-lot3-blocA-bilan.md et docs/rapports/etape2-A2-05-volet1-lot3-B1-perimetre.md
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const LF = String.fromCharCode(10);
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, LF);
const read = (p) => JSON.parse(txt(p));
const DATE = '2026-10-13';
// Arbitrages, renseignés après la relecture : { date, texte: [...] } ; null tant qu'ils ne sont pas rendus
const ARB_A = { date: '2026-10-16', texte: [
  "Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur).",
  '',
  "**Les décomptes sont confirmés** : 69 sens arbitrés dans sept livraisons ; 66 conformes, 3 écarts, 0 suspendu ; V1-6, V1-7 et V1-8 retenues, non appliquées ; code E1 confirmé pour les trois ; 23 réserves et constats conservés. Les contrôles de couverture et de non-duplication sont cohérents avec les tableaux.",
  '',
  "**Une précision rédactionnelle, demandée au §4, est faite** : la notion « Période ou portion du temps » est renommée **« Périodes et repères temporels »**, et sa justification tient désormais compte de 今, qui désigne un instant présent et non une période étendue. Justification d'origine, conservée ici : « la fiche désigne une portion du temps (saison, partie de journée, jour, semaine, mois, année, vacances), non un fait qui survient ni une durée mesurée (A1 à A6) ». **Aucun verdict, aucune correction et aucune décision historique ne change** ; le reste du bilan est conservé tel qu'il a été livré, y compris la question 4 du §7, à laquelle cet arbitrage répond.",
  '',
  "**Le bilan du bloc A est arbitré, et le bloc A est clos documentairement.** Les trois corrections restent retenues et non appliquées ; les réserves et constats restent conservés ; HP-1 à HP-4 restent consignées, non commencées. **Lot 3 : 69 sens arbitrés sur 377 ; 308 restent.** **183 corrections retenues dans 164 ENTRY, toutes non appliquées.**"
] };
const ARB_B1 = { date: '2026-10-16', texte: [
  "Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur).",
  '',
  "**Le périmètre opérationnel de B1 est accepté : 12 sens dans 12 ENTRY, sans ajout ni retrait.** Les sept règles du criblage et les comparables recensés sont conservés. La proposition est conservée ci-dessous, telle qu'elle a été livrée ; elle décrivait le bloc A comme non clos, ce qui était exact à cette date : **le bloc A a depuis été clos documentairement**, par l'arbitrage de son bilan rendu le même jour.",
  '',
  "**Ce que les rapprochements de traduction ne prouvent pas.** Les règles C1-a et C3-b rapprochent des sens parce que leurs traductions principales françaises coïncident, une fois les précisions entre parenthèses retirées : « Café (boisson) » (コーヒー) et « Café (établissement) » (喫茶店) ; « Cuisine » (料理, l'activité) et « Cuisine (pièce) » (台所) ; « Prendre (une photo) » (撮る), « Prendre (un transport) » (乗る), « Prendre (du temps ou de l'argent) » (かかる), « Prendre » (取る) et « Prendre (une douche) » (浴びる) ; « Léger (goût) » (薄い) et « Léger » (軽い). **Une coïncidence de traduction ne prouve pas une identité de sens.** Chaque différence de catégorie ou de type entre ces sens sera examinée individuellement, sur la fiche entière et les décisions applicables ; elle n'est un écart que si la fiche et une norme l'établissent.",
  '',
  "**Ce qui reste hors de B1.** Les comparables ne sont pas arbitrés par l'examen de B1, et aucun verdict ne leur est attribué. Les autres sens des mêmes ENTRY (料理, sens 2 ; 魚, sens 1 ; 甘い, sens 2 ; 薄い, sens 1 et 2 ; 作る, sens 1 ; 昼, sens 1) restent hors du périmètre.",
  '',
  "**Suite** : l'audit de B1 seule est autorisé, après l'inscription de la clôture documentaire du bloc A ; B2 ne commence pas avant l'arbitrage de B1. À la clôture de B1, seul le périmètre de B2 sera préparé, sans décision lexicale avant l'accord sur ce périmètre."
] };
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
const tous = new Map(vocab.flatMap((e) => e.senses.map((s) => [s.id, { e, s }])));
const crib = read('a2-05-travail/criblage/resultat.json');
const candidats = new Map(crib.candidats.map((c) => [c.id, c]));
const perimetre = txt(R + 'perimetre.md');
const bilanV2 = txt('docs/rapports/etape2-A2-05-bilan-volet2.md');
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const lignesPerim = [...perimetre.matchAll(/^\| \d+ \| ([A-F]\d+) \| `((?:hj_)?v_\d+_s\d+)` \|.*$/gm)].map((m) => ({ l: m[1], id: m[2], cells: m[0].split('|').map((x) => x.trim()) }));
if (lignesPerim.length !== 377 || new Set(lignesPerim.map((x) => x.id)).size !== 377) throw new Error('périmètre : 377 candidats distincts attendus');
const livraison = new Map(lignesPerim.map((x) => [x.id, x.l]));
// Les 147 sens du volet 2 : lus dans le rapport d'audit (le criblage ne les liste pas tous)
// 147 fiches (une par avertissement), pour un nombre moindre de sens : un sens peut porter une catégorie nulle et un type nul
const fiches147 = [...txt('docs/rapports/etape2-A2-05-audit-null.md').matchAll(/^#### `((?:hj_)?v_\d+_s\d+)` /gm)].map((m) => m[1]);
const les147 = new Set(fiches147);
if (fiches147.length !== 147 || lignesPerim.some((x) => les147.has(x.id))) throw new Error('les 147 : ' + fiches147.length + ' fiches lues, ou un sens commun avec les 377');
const arbitre = (p) => (/^\*\*Statut\*\* : \*\*arbitré le (\d{4}-\d{2}-\d{2})\*\*/m.exec(txt(p)) ?? [])[1];
const ecrire = (p, lignes) => { const t = lignes.join(LF) + LF; if (/ +$/m.test(t)) throw new Error(p + ' : espace en fin de ligne'); writeFileSync(join(root, p), t); };

// ───────────────────────────── Bloc A ─────────────────────────────
const LIV = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'];
const ATTENDU = { A1: [10, 10, 0], A2: [9, 9, 0], A3: [9, 9, 0], A4: [8, 8, 0], A5: [11, 11, 0], A6: [11, 10, 1], A7: [11, 9, 2] };
const CORR = { v_321_s1: 'V1-6', v_497_s2: 'V1-7', v_509_s3: 'V1-8' };
const sensA = []; const parLiv = [];
for (const L of LIV) {
  const p = R + L + '.md'; const t = txt(p); const date = arbitre(p);
  if (!date) throw new Error(L + ' ne porte pas son arbitrage');
  const s0 = t.slice(t.indexOf('## 0. Arbitrage'), t.indexOf('## 1. Résultat proposé'));
  const dec = /(\d+) conformes, (\d+) écarts?/.exec(s0); if (!dec) throw new Error(L + ' : décompte d\'arbitrage introuvable');
  const rows = [...t.matchAll(/^\| (\d+) \| `(v_\d+_s\d+)` \| ([^|]+) \| ([^|]+) \| (\d+) \|.*\| \*\*(conforme|écart|suspendu)\*\* \| ([^|]+) \|$/gm)].map((m) => ({ L, id: m[2], mot: m[3].trim(), trad: m[4].trim(), lot: m[5], v: m[6], k: m[7].trim() }));
  const [n, c, e] = ATTENDU[L]; const nc = rows.filter((r) => r.v === 'conforme').length; const ne = rows.filter((r) => r.v === 'écart').length;
  if (rows.length !== n || nc !== c || ne !== e || rows.some((r) => r.v === 'suspendu')) throw new Error(L + ' : ' + rows.length + ' fiches, ' + nc + ' conformes, ' + ne + ' écarts');
  if (Number(dec[1]) !== c || Number(dec[2]) !== e) throw new Error(L + ' : l\'arbitrage (' + dec[0] + ') ne concorde pas avec le tableau des verdicts');
  const attendus = lignesPerim.filter((x) => x.l === L).map((x) => x.id);
  if (attendus.length !== n || attendus.some((id) => !rows.some((r) => r.id === id))) throw new Error(L + ' : les sens ne sont pas ceux du périmètre');
  parLiv.push({ L, n, c, e, date, corr: rows.filter((r) => r.v === 'écart').map((r) => r.k) });
  sensA.push(...rows);
}
const idsA = sensA.map((r) => r.id);
const blocA = lignesPerim.filter((x) => x.l[0] === 'A').map((x) => x.id);
if (idsA.length !== 69 || new Set(idsA).size !== 69 || blocA.length !== 69 || blocA.some((id) => !idsA.includes(id))) throw new Error('bloc A : 69 sens distincts attendus, identiques au périmètre');
for (const r of sensA) {
  const x = tous.get(r.id); const c = candidats.get(r.id);
  if (!x || !c) throw new Error(r.id + ' : sens publié ou candidat introuvable');
  if (c.dans147.length) throw new Error(r.id + ' : sens des 147');
  if (x.s.semantic_type !== 'concept_abstrait') throw new Error(r.id + ' : le type publié n\'est plus concept_abstrait (une correction aurait été appliquée)');
  if ((r.v === 'écart') !== (r.id in CORR) || (r.v === 'écart' && r.k !== CORR[r.id]) || (r.v === 'conforme' && r.k !== '—')) throw new Error(r.id + ' : verdict et correction ne concordent pas');
}
const lignesV = bilanV2.split(LF).filter((l) => /^\| V[12]-\d+ \|/.test(l)); const numV = lignesV.map((l) => l.split('|')[1].trim());
if (lignesV.length !== 173 || new Set(numV).size !== 173) throw new Error('liste des corrections : 173 lignes V1 et V2 distinctes attendues, lues ' + lignesV.length);
const corrLignes = Object.entries(CORR).map(([id, n]) => { const l = lignesV.filter((x) => x.split('|')[1].trim() === n); if (l.length !== 1 || !l[0].includes('`' + id + '`') || !l[0].includes('`quantite_valeur`') || !/\| E1 \|/.test(l[0])) throw new Error(n + ' : ligne absente, en double, ou non conforme'); return l[0]; });
const entryV = new Set(lignesV.map((l) => (l.match(/`((?:hj_)?v_\d+)/) ?? [])[1]));
const nConf = sensA.filter((r) => r.v === 'conforme').length; const nEc = sensA.filter((r) => r.v === 'écart').length;
if (nConf !== 66 || nEc !== 3) throw new Error('bloc A : 66 conformes et 3 écarts attendus');
const arbitresLot3 = lignesPerim.filter((x) => LIV.includes(x.l)).length;

// Regroupement descriptif par notion, calculé sur la catégorie publiée (aucun verdict n'en dépend)
const notion = (s) => { const c = s.category; if (!c) throw new Error(s.id + ' : sans catégorie');
  if (c.level_2 === 'langues') return 'Langue (système)';
  if (c.level_3 === 'directions_cardinales') return 'Direction cardinale';
  if (c.level_2 === 'moments_periodes' || c.level_3 === 'annees') return 'Périodes et repères temporels';
  if (c.level_2 === 'calendrier') return 'Repère du calendrier';
  if (c.level_2 === 'duree') return 'Durée quantitative';
  if (c.level_2 === 'frequence') return 'Fréquence';
  if (c.level_2 === 'relations_temporelles') return 'Rapport temporel';
  if (c.level_3 === 'succession' || c.level_3 === 'ordinaux' || c.level_3 === 'debut_fin') return 'Rang ou place dans un ordre';
  throw new Error(s.id + ' : notion non prévue pour ' + cat(c)); };
const ORDRE = ['Langue (système)', 'Direction cardinale', 'Périodes et repères temporels', 'Repère du calendrier', 'Rang ou place dans un ordre', 'Rapport temporel', 'Fréquence', 'Durée quantitative'];
const groupes = new Map(ORDRE.map((n) => [n, []])); for (const r of sensA) groupes.get(notion(tous.get(r.id).s)).push(r);
if ([...groupes.values()].reduce((n, g) => n + g.length, 0) !== 69) throw new Error('regroupement par notion incomplet');
const FONDE = {
  'Langue (système)': "la fiche désigne la langue comme système, non un contenu (A1, R1)",
  'Direction cardinale': "la fiche désigne une orientation, non un lieu (A1, R3 ; D0620)",
  'Périodes et repères temporels': "la fiche désigne une portion du temps (saison, partie de journée, jour, semaine, mois, année, vacances), repérée ou non par rapport au présent, ou, pour 今, l'instant présent, qui est un repère et non une période étendue (A2) ; ni un fait qui survient, ni une durée mesurée (A1 à A6)",
  'Repère du calendrier': "la fiche désigne un jour repéré par son rang dans le mois ou dans la semaine, ou une date propre à une personne ; un rang n'est pas une grandeur (A5, A6)",
  'Rang ou place dans un ordre': "la fiche désigne une place dans une suite ou dans un déroulement : le début, la première fois, la première position (A7)",
  'Rapport temporel': "la fiche situe un état ou une action par rapport à un moment de référence (A7)",
  'Fréquence': "la fiche dit le rythme auquel une action revient, illustré par des habitudes ; rien ne s'y possède, ne s'y prend ni ne s'y compte (A7)",
  'Durée quantitative': "la fiche désigne une durée, ou du temps dont on dispose, comme une quantité de temps ; A2-ST couvre les grandeurs quantitatives abstraites sans exiger une valeur chiffrée (A6, A7)"
};

const A = [];
A.push('# Étape 2 · A2-05 · Volet 1 · Lot 3 — bilan du bloc A : les 69 sens de type `concept_abstrait`', '');
A.push('**Date** : ' + DATE);
A.push(ARB_A ? "**Statut** : **arbitré le " + ARB_A.date + " (§0) ; le bloc A est clos documentairement.** Le bilan est conservé tel qu'il a été livré, à la précision rédactionnelle du §4 près, que le §0 décrit. Écrit par" : "**Statut** : **bilan proposé, soumis à relecture. Le bloc A n'est pas tenu pour clos avant cette relecture.** Écrit par `a2-05-travail/blocA-bilan-et-B1-perimetre.mjs`, qui relit les sept rapports de livraison arbitrés, le périmètre arbitré du lot 3, le résultat du criblage, l'état publié et la liste consolidée des corrections. **Il ne rejuge aucun sens, n'ouvre aucune fiche source et ne modifie rien** : aucune donnée publiée, aucune fiche source, aucun lot, aucun journal, aucun registre, aucun outil du dépôt, aucun test ni aucun snapshot ; aucune décision historique n'est réécrite ; **aucune des 183 corrections retenues n'est appliquée.**");
A.push('', "**Autorisation** : arbitrage d'A7, du " + DATE + " (ChatGPT, par délégation ; relayé par l'utilisateur) : « Préparer maintenant le bilan définitif du bloc A, couvrant les sept livraisons, les 69 sens, les trois corrections et toutes les réserves documentées. Inclure un contrôle exhaustif de couverture, de non-duplication et de cohérence des verdicts. Le bilan devra également décrire la distinction retenue entre période calendaire, durée quantitative, fréquence, repère et rôle fonctionnel, sans en faire une nouvelle norme. […] Ne pas considérer le bloc A comme clos avant la relecture de son bilan. »", '');
if (ARB_A) A.push('## 0. Arbitrage', '', ...ARB_A.texte, '');
A.push('## 1. Résultat', '');
A.push("**Les 69 sens du bloc A sont arbitrés : " + nConf + " conformes, " + nEc + " écarts, 0 suspendu.** Les trois écarts portent sur le type sémantique de trois sens de `temps › duree` ; les trois corrections (V1-6, V1-7, V1-8) sont **retenues et non appliquées**. Aucun verdict proposé n'a été modifié par un arbitrage : chaque livraison a été arbitrée telle qu'elle avait été proposée, avec des précisions de motivation (§4, §5).", '');
A.push('| Livraison | Objet | Sens | Conformes | Écarts | Corrections | Arbitrée le | Rapport |', '|---|---|---|---|---|---|---|---|');
const OBJET = { A1: 'langues, saisons, points cardinaux (lots 06, 07, 10)', A2: 'repères temporels (lots 00 et 12)', A3: 'repères temporels (lot 12, suite)', A4: 'parties de la journée et repères du futur (lot 12, fin)', A5: "vacances d'été et dix dates du mois (lot 13)", A6: 'jours de la semaine, 年, 時間, 誕生日, 休み (lot 13, fin)', A7: "初め et dix sens d'adverbes (lots 20, 21, 24)" };
for (const x of parLiv) A.push('| ' + x.L + ' | ' + OBJET[x.L] + ' | ' + x.n + ' | ' + x.c + ' | ' + x.e + ' | ' + (x.corr.length ? x.corr.join(', ') : '—') + ' | ' + x.date + ' | `etape2-A2-05-volet1-lot3-' + x.L + '.md` |');
A.push('| **Bloc A** | | **69** | **' + nConf + '** | **' + nEc + '** | **V1-6, V1-7, V1-8** | | |', '');
A.push("**Dans le lot 3** : " + arbitresLot3 + " sens arbitrés sur 377 ; " + (377 - arbitresLot3) + " restent (blocs B à F), dont les 17 du bloc F, suspendu au préalable E5. **Dans la liste globale** : 183 corrections retenues dans 164 ENTRY, toutes non appliquées ; V1-9 est le prochain numéro libre du volet 1.", '');
A.push("**Ce que « conforme » veut dire ici.** Que le type, la catégorie et les fonctions publiés sont décrits par leurs normes (A2-ST, A2-L3, A7, A9) quand on les confronte à la fiche entière, et que les types voisins sont écartés pour une raison tirée de la fiche. Il ne dit pas que la décision d'origine était motivée (constat R4), ni que les sens comparables hors du bloc sont eux-mêmes conformes.", '');
A.push('## 2. Les trois corrections retenues, non appliquées', '');
A.push('| # | SENSE | Mot | Lot | Code | Champ | Valeur publiée | Valeur retenue | Livraison |', '|---|---|---|---|---|---|---|---|---|');
for (const [i, l] of corrLignes.entries()) { const k = l.split('|').map((x) => x.trim()); A.push('| ' + k.slice(1, 9).join(' | ') + ' | ' + ['A6', 'A7', 'A7'][i] + ' |'); }
A.push('', "**Motif commun, tel que les arbitrages l'ont dit** : chaque fiche désigne une durée comme une quantité de temps (« une durée ou le temps global disponible » ; « un bref instant » ; « une courte durée ») ; A2-ST définit `quantite_valeur` comme « valeur quantitative, quantité ou grandeur conceptualisée abstraitement », sans exiger une valeur chiffrée, et réserve `concept_abstrait` à ce qui « ne relève pas plus précisément d'un autre Semantic Type ». **Chaque sens a été examiné sur sa propre fiche** ; le verdict de 時間 n'a pas été transposé.", '');
A.push("**Code d'écart.** La légende du volet 1 (`etape2-A2-05-coherence-retroactive.md`) donne : E1, contradiction avec une norme finale ; E2, justification devenue obsolète ; E3, application incohérente entre lots ; E4, compréhension incomplète de l'architecture ; E5, point non documenté. **E1 est confirmé pour les trois** : le type publié contredit la définition d'A2-ST-v1, norme finale. E2 ne convient pas : le critère de D0924 (« non une quantité déterminée ») n'a pas été rendu obsolète par une norme postérieure, il n'a jamais été un critère de la norme. E3 non plus : l'écart ne naît pas d'une divergence entre lots, les trois sens étant tranchés par la norme.", '');
A.push("**Décisions historiques.** D0924 (時間), D1535 (ちょっと) et D1528 (少し) ont posé `concept_abstrait` ; **aucune n'est modifiée**. La raison pour laquelle la justification de D0924 est révisée est écrite dans le rapport d'A6 (§0). L'application, le jour où elle sera autorisée, passera par des décisions nouvelles, journalisées, avec réouverture explicite des ENTRY.", '');
A.push("**Effets attendus, si les trois corrections sont appliquées un jour** : les quinze sens publiés de `temps › duree` porteront `quantite_valeur` ; aucun avertissement de l'inventaire n'est touché, le type restant renseigné ; la relation `similar_to` entre ちょっと (sens 2) et 少し (sens 3) n'est pas touchée ; trois ENTRY (`v_321`, `v_497`, `v_509`) qu'aucune autre correction ne visait.", '');
A.push('## 3. Liste exhaustive des 69 sens', '');
A.push('| N° | Livraison | Sens | Mot | Traduction | Lot | Catégorie publiée | Type publié | Verdict arbitré | Correction |', '|---|---|---|---|---|---|---|---|---|---|');
sensA.forEach((r, i) => { const { s } = tous.get(r.id); A.push('| ' + (i + 1) + ' | ' + r.L + ' | `' + r.id + '` | ' + r.mot + ' | ' + r.trad + ' | ' + r.lot + ' | `' + cat(s.category) + '` | `' + s.semantic_type + '` | **' + r.v + '** | ' + r.k + ' |'); });
A.push('', "Le type publié est `concept_abstrait` pour les 69 sens, y compris les trois écarts : leurs corrections ne sont pas appliquées (contrôle du script).", '');
A.push('## 4. Les distinctions retenues par les arbitrages', '');
A.push("**Cette section décrit ; elle ne pose aucune norme.** Elle rassemble les raisons que les arbitrages d'A1 à A7 ont retenues, sens par sens, pour dire si `concept_abstrait` décrit un sens. Elle ne vaut ni définition, ni règle générale, ni verdict pour un sens qui n'a pas été examiné : les normes restent A2-ST-v1, A2-L3-v1, A6, A7 et A9. Le regroupement ci-dessous est calculé sur la catégorie publiée, pour la lecture ; aucun verdict n'en dépend.", '');
A.push('| Notion décrite par la fiche | Sens | Mots | Type arbitré | Ce que les arbitrages ont retenu |', '|---|---|---|---|---|');
for (const n of ORDRE) { const g = groupes.get(n); A.push('| ' + n + ' | ' + g.length + ' | ' + g.map((r) => r.mot + (/_s[2-9]$/.test(r.id) || tous.get(r.id).e.senses.length > 1 ? ' (s' + r.id.slice(-1) + ')' : '')).join(', ') + ' | ' + (n === 'Durée quantitative' ? '`quantite_valeur` (corrections retenues)' : '`concept_abstrait`') + ' | ' + FONDE[n] + ' |'); }
A.push('');
A.push("**Période calendaire et repère.** Une portion du temps ou un repère dans le calendrier ne sont ni des entités, ni des occurrences, ni des quantités : A2-ST n'a aucun type de période ni de date, et `concept_abstrait` les décrit. Une période qui « commence » (夏休み) reste une période ; une date qui peut se fêter (誕生日) reste une date, la fête étant nommée par un autre mot ; un instant (今) est un repère, non une durée. Ces verdicts tiennent aux emplois que chaque fiche atteste.", '');
A.push("**Durée quantitative.** Quand la fiche désigne une durée comme une quantité de temps que l'on a, que l'on prend ou que l'on fixe, le sens relève de `quantite_valeur`, que la quantité soit chiffrée (les douze durées du type « Sept jours », hors des 377) ou non (時間, ちょっと, 少し). Ce qui sépare ces trois sens des périodes : la période est un cadre où autre chose a lieu, la durée une grandeur.", '');
A.push("**Fréquence.** La distinction avec la quantité de temps est maintenue : une fréquence dit le rythme auquel une action revient, que les fiches illustrent par des habitudes ; A2-L3 la range par degrés (« Fréquent ; Occasionnel ; Rare »). Les trois sens concernés gardent `concept_abstrait`.", '');
A.push("**Rapport temporel et rang.** まだ, もう (sens 1) et 初めて gardent `concept_abstrait` parce que leur fiche décrit une notion de temps : un rapport à un moment de référence, une place dans une succession.", '');
A.push("**Rôle fonctionnel.** A9, §4.2, reste pleinement applicable : un sens purement fonctionnel ne reçoit pas un type abstrait de secours. **Le type des sept sens d'adverbes temporels ne se déduit pas de l'absence d'une fonction grammaticale définie** : il tient à la notion temporelle que décrit chaque fiche. Aucun sens du bloc A n'a été jugé purement fonctionnel. **L'arbitrage n'est pas généralisé** aux autres adverbes, notamment もう (sens 2), すぐに, いつも et たいてい, qui relèvent d'autres livraisons.", '');
A.push("**Fonction `deictique` (A7).** Type, catégorie et fonction ont été examinés séparément. Une partie de journée repérée depuis le présent (今晩, 今朝, 昨夜) garde sa catégorie et porte la fonction ; une partie de journée prise en général ne la porte pas ; un jour de la semaine nommé seul ne la porte pas, le repérage du jour le plus proche dépendant du contexte, non du mot.", '');
A.push('## 5. Réserves et constats conservés', '');
A.push("Aucun n'est un écart ; aucun ne donne lieu à une correction. Ils sont repris ici pour ne pas être perdus.", '');
A.push('| Origine | Objet | Ce qui est conservé |', '|---|---|---|');
for (const [o, q, c] of [
  ['A1, R1', '英語, 言葉 (sens 2)', "`concept_abstrait` confirmé. ひらがな et 漢字 (`information_contenu`) sont consignés comme comparables à vérifier séparément : HP-1 et HP-2, non commencées."],
  ['A1, R2', 'les quatre saisons', "Le raisonnement « période désignée comme découpage de l'année » peut servir de base aux autres sens temporels ; chaque fiche est examinée intégralement, sans verdict automatique."],
  ['A1, R3', '北, 南, 東, 西', "`concept_abstrait` confirmé (D0620). 右 et 左 (`lieu`) sont consignés comme comparables à vérifier séparément : HP-3 et HP-4, non commencées ; leur type n'est ni validé ni infirmé."],
  ['A2', '今', "La fiche désigne l'instant présent, non une période étendue ; le type reste pertinent."],
  ['A2, R4', 'tout le bloc', "L'absence de décision historique sur le type ou la catégorie d'un sens est un constat documentaire, non un écart."],
  ['A2, R5 ; A3', '今晩, 今朝, 昨夜', "`parties_de_la_journee` et `deictique` conservées, justifiées séparément : la catégorie décrit la partie de journée, la fonction le repérage."],
  ['A3', '去年', "`deictique` confirmée : les traductions et les exemples établissent le repérage, la nuance seule n'y suffisant pas."],
  ['A4', '昼 (sens 1)', "Découpage de D0800 conservé (la période diurne et son milieu). Réserve sur la traduction principale « Midi », sans rouvrir le découpage ni les traductions."],
  ['A4', '午後', "La fiche dit « nom / adverbe temporel », la classe publiée est `nom` : constat, sans écart dans l'audit C3-0 ; classe non modifiée."],
  ['A5', '夏休み', "Catégorie arrêtée au niveau 2 ; D0845 justifie le refus de catégories plus étroites. Un ancien exemple dit que les vacances « commencent »."],
  ['A5', '七日, 二日, 十日, 四日', "Aucun exemple n'illustre la date ; constat conservé, sans créer d'exemple."],
  ['A5', '二十日', "Un ancien exemple porte sur はたち（二十歳） ; réserve conservée, sans modifier la source ni ouvrir de chantier."],
  ['A6', '休み', "Réserve sur la traduction principale « Repos », qui nomme l'état ou l'activité plutôt que la période."],
  ['A6', '誕生日', "Le sens désigne la date, non la célébration ; le verdict tient aux emplois que la fiche atteste."],
  ['A6', 'les sept jours de la semaine', "Absence de `deictique` confirmée pour un jour nommé seul."],
  ['A6', '年 (sens 1)', "Un ancien exemple quantifie des années (« 5 年 ») ; constat conservé, sans rouvrir les autres emplois."],
  ['A6', '水曜日', "Coquille présumée dans l'exemple source (« とずかん ») : signalée, non corrigée, la source étant figée."],
  ['A6', '時間 (sens 1)', "La traduction principale « Temps », seule, est ambiguë en français (le temps qu'il fait) ; l'alternative « Durée » la précise. Constat de la proposition, hors des champs examinés."],
  ['A7', 'まだ (sens 1), 少し (sens 3), 一番 (sens 2), 大体 (sens 2)', "Exemples absents ou ambigus : chaque sens est documenté par la nuance et par une traduction de la fiche ; réserves conservées."],
  ['A7', '大体 (sens 2)', "Réserve conservée sur le classement en `temps › frequence › frequent`, qui tient au rapprochement avec たいてい, non arbitré."],
  ['A7', '初め', "Aucune décision de journal sur les sens, le type, la catégorie ni la fonction ; constat (R4)."],
  ['A7', 'よく (sens 1), 時々, まだ (sens 2)', "Aucune décision de fonction propre à ces sens ; aucune fonction n'est publiée ; constat documentaire."],
  ['A7', 'adverbes hors du bloc', "L'arbitrage sur les adverbes temporels n'est pas généralisé : もう (sens 2), すぐに, いつも, たいてい restent à examiner sur leurs fiches."]
]) A.push('| ' + o + ' | ' + q + ' | ' + c + ' |');
A.push('', "**Vérifications hors périmètre** : HP-1 à HP-4 (ひらがな, 漢字, 右, 左) sont consignées, non commencées ; leur examen individuel n'est pas autorisé et leur cadre reste à proposer (bilan du volet 2, §8.35). Elles ne font pas partie du bloc A.", '');
A.push('## 6. Contrôles de couverture, de non-duplication et de cohérence', '');
A.push('Tous faits par le script, qui s\'arrête au premier écart.', '', '| Contrôle | Résultat |', '|---|---|');
A.push('| Le périmètre arbitré du lot 3 compte 377 candidats distincts | oui |');
A.push('| Le bloc A du périmètre compte 69 sens, répartis en sept livraisons | oui : ' + parLiv.map((x) => x.L + ' ' + x.n).join(', ') + ' |');
A.push('| Chaque livraison porte son arbitrage | oui : sept rapports au statut « arbitré » |');
A.push('| Les sens de chaque rapport sont exactement ceux de sa livraison au périmètre | oui, pour les sept |');
A.push('| Chaque sens du bloc a un verdict, et un seul | oui : 69 fiches, 69 identifiants distincts, aucun sens dans deux livraisons |');
A.push('| Aucun sens du bloc ne relève des 147 `null` du volet 2 | oui : 69 sur 69 hors des 147 |');
A.push('| Le décompte de chaque arbitrage concorde avec le tableau des verdicts de son rapport | oui, pour les sept |');
A.push('| Verdicts | ' + nConf + ' conformes, ' + nEc + ' écarts, 0 suspendu ; ' + nConf + ' + ' + nEc + ' = 69 |');
A.push('| Chaque écart a une correction, chaque correction un écart | oui : V1-6, V1-7, V1-8 ; aucun sens conforme ne porte de correction |');
A.push('| Chaque correction figure une fois, et une seule, dans la liste consolidée, sur le bon sens, avec `quantite_valeur` et le code E1 | oui, pour les trois |');
A.push('| Liste consolidée : lignes de corrections V1 et V2 | ' + lignesV.length + ' lignes, ' + new Set(numV).size + ' numéros distincts ; ' + entryV.size + ' ENTRY visées par ces lignes ; avec les dix modifications du volet 2 : 183 corrections dans 164 ENTRY |');
A.push('| Aucune correction n\'est appliquée | oui : les 69 sens portent encore `concept_abstrait` dans les données publiées |');
A.push('| Lot 3 : sens arbitrés | ' + arbitresLot3 + ' sur 377 ; ' + (377 - arbitresLot3) + ' restent |');
A.push('', "**Ce que ces contrôles ne prouvent pas** : ils vérifient que les rapports, le périmètre, la liste et les données concordent ; ils ne rejugent aucun verdict et ne relisent aucune fiche source.", '');
A.push('## 7. Ce qui est demandé à la relecture', '');
for (const [i, q] of ["Le bilan est-il exact et complet : décomptes, corrections, réserves ?", "La description des distinctions (§4) rend-elle fidèlement les arbitrages, sans rien y ajouter qui vaudrait norme ?", "Le code E1 est-il confirmé pour V1-6, V1-7 et V1-8, pour la raison donnée au §2 ?", "**Le bloc A peut-il être tenu pour clos ?** Il ne l'est pas tant que cette relecture n'a pas eu lieu."].entries()) A.push((i + 1) + '. ' + q);
ecrire(R + 'blocA-bilan.md', A);

// ───────────────────────────── Périmètre de B1 ─────────────────────────────
const B1 = lignesPerim.filter((x) => x.l === 'B1');
if (B1.length !== 12 || new Set(B1.map((x) => x.id.replace(/_s\d+$/, ''))).size !== 12) throw new Error('B1 : 12 sens dans 12 ENTRY attendus');
const blocB = lignesPerim.filter((x) => x.l[0] === 'B'); if (blocB.length !== 148) throw new Error('bloc B : 148 sens attendus');
const livB = [...new Set(blocB.map((x) => x.l))];
const etat = (id) => { const l = livraison.get(id); const c = candidats.get(id); if (l) return LIV.includes(l) ? l + ' (arbitrée)' : l === 'B1' ? '**B1**' : l + ' (non arbitrée)'; if (les147.has(id) || c?.dans147.length) return 'volet 2 (147, arbitré)'; return 'hors des 377 et des 147'; };
const regleDef = new Map([...perimetre.matchAll(/^\| (C\d+-[a-z0]) \| ([^|]+) \| \d+ \|$/gm)].map((m) => [m[1], m[2].trim()]));
const fiches = B1.map((x) => { const t = tous.get(x.id); const c = candidats.get(x.id); if (!t || !c || c.dans147.length) throw new Error(x.id + ' : hors des données, hors du criblage, ou dans les 147'); return { ...x, ...t, c }; });
const reglesB1 = [...new Set(fiches.flatMap((f) => f.c.regles.map((g) => g.regle)))].sort();
for (const g of reglesB1) if (!regleDef.has(g)) throw new Error('règle ' + g + ' : définition introuvable au périmètre');
const fonctions = (s) => { const f = [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])]; return f.length ? f.map((y) => '`' + y + '`').join(', ') : 'aucune'; };

const B = [];
B.push('# Étape 2 · A2-05 · Volet 1 · Lot 3 — périmètre opérationnel de la livraison B1 : `alimentation_cuisine` et `arts_creation`', '');
B.push('**Date** : ' + DATE);
B.push(ARB_B1 ? "**Statut** : **périmètre accepté le " + ARB_B1.date + " (§0).** La proposition est conservée telle qu'elle a été livrée. Écrit par" : "**Statut** : **proposition de périmètre opérationnel, non arbitrée.** Écrit par `a2-05-travail/blocA-bilan-et-B1-perimetre.mjs`, à partir du périmètre arbitré du lot 3, du résultat du criblage et de l'état publié. **Aucune fiche source n'est ouverte, aucun sens n'est jugé, aucune décision lexicale n'est prise** : ce document dit ce que B1 examinera et comment, rien de plus. Aucune donnée publiée, aucune fiche source, aucun lot, aucun journal, aucun registre, aucun outil du dépôt, aucun test ni aucun snapshot n'est modifié.");
B.push('', "**Autorisation** : arbitrage d'A7, du " + DATE + " (ChatGPT, par délégation ; relayé par l'utilisateur) : « En parallèle, préparer uniquement le périmètre opérationnel de la première livraison du bloc B : entrées restantes, thème, identifiants SENSE, axes à vérifier, comparables et limites. Ne prendre aucune décision lexicale dans B1 avant l'accord sur son périmètre. »", '');
if (ARB_B1) B.push('## 0. Arbitrage', '', ...ARB_B1.texte, '');
B.push('## 1. Où se place B1', '');
B.push("**Ce qui reste dans le lot 3** : " + (377 - arbitresLot3) + " sens, dans les blocs B à F. Le bloc B (« catégories et types posés ») compte " + blocB.length + " sens en " + livB.length + " livraisons (B1 à B" + livB.length + "), regroupées par catégorie de niveau 1 pour que les comparables soient lus ensemble. **Aucun sens du bloc B n'est examiné à ce jour.**", '');
B.push('| Bloc | Objet | Sens | État |', '|---|---|---|---|');
for (const [b, o] of [['A', '`concept_abstrait`'], ['B', 'catégories et types posés'], ['C', 'tags, dimensions, justifications datées'], ['D', 'fonctions, et `null` portés par une fonction'], ['E', 'points réservés'], ['F', 'interrogatifs']]) { const n = lignesPerim.filter((x) => x.l[0] === b).length; B.push('| ' + b + ' | ' + o + ' | ' + n + ' | ' + (b === 'A' ? '69 arbitrés ; bilan soumis à relecture, bloc non clos' : b === 'F' ? 'suspendu au préalable E5' : b === 'B' ? 'non commencé ; **B1 : périmètre proposé ici**' : 'non commencé') + ' |'); }
B.push('', "**Question que le bloc B pose à chaque sens** (périmètre du lot 3, §4) : la catégorie et le type publiés sont-ils cohérents avec ceux des sens comparables ? Les règles de l'axe C1 sont comparatives : elles désignent un sens par rapport à sa famille.", '');
B.push('## 2. Les douze sens de B1', '');
B.push("**Thème** : `alimentation_cuisine` (onze sens) et `arts_creation` (un sens, 撮る). **Douze sens, douze ENTRY**, des lots " + [...new Set(fiches.map((f) => String(f.c.lot).padStart(2, '0')))].sort().join(', ') + ". Ce sont exactement les lignes B1 du périmètre arbitré (contrôle du script).", '');
B.push('| N° | Sens | Mot | Traduction | Classe | Lot | Catégorie publiée | Type publié | Fonctions | Tags de l\'ENTRY | Règles du criblage |', '|---|---|---|---|---|---|---|---|---|---|---|');
fiches.forEach((f, i) => B.push('| ' + (i + 1) + ' | `' + f.id + '` | ' + f.e.word + ' | ' + f.s.meaning.primary + ' | ' + f.e.linguistic.grammatical_class + ' | ' + String(f.c.lot).padStart(2, '0') + ' | `' + cat(f.s.category) + '` | `' + f.s.semantic_type + '` | ' + fonctions(f.s) + ' | ' + (f.e.tags?.length ? f.e.tags.join(', ') : 'aucun') + ' | ' + f.c.regles.map((g) => g.regle).join(', ') + ' |'));
B.push('', '**Les autres sens des mêmes ENTRY, et où ils en sont** (ils ne font pas partie de B1) :', '', '| ENTRY | Mot | Autres sens | État |', '|---|---|---|---|');
for (const f of fiches) { const o = f.e.senses.filter((y) => y !== f.s); if (o.length) B.push('| `' + f.e.id + '` | ' + f.e.word + ' | ' + o.map((y) => '`' + y.id + '` « ' + y.meaning.primary + ' » (`' + cat(y.category) + '`, `' + y.semantic_type + '`)').join(' ; ') + ' | ' + o.map((y) => etat(y.id)).join(' ; ') + ' |'); }
B.push('');
B.push('## 3. Axes et règles à vérifier', '');
B.push("Chaque sens sera examiné une seule fois, sur toutes les règles qui le désignent. " + reglesB1.length + " règles désignent les douze sens :", '', '| Règle | Détection (résumé du périmètre du lot 3, §2) | Sens de B1 désignés |', '|---|---|---|');
for (const g of reglesB1) B.push('| ' + g + ' | ' + regleDef.get(g) + ' | ' + fiches.filter((f) => f.c.regles.some((y) => y.regle === g)).map((f) => f.e.word + (f.e.senses.length > 1 ? ' (s' + f.id.slice(-1) + ')' : '')).join(', ') + ' |');
B.push('', '**Ce que chaque règle a relevé, sens par sens** (texte du criblage, sans jugement) :', '');
for (const f of fiches) B.push('- **`' + f.id + '` ' + f.e.word + '** : ' + f.c.regles.map((g) => '`' + g.regle + '` — ' + g.detail).join(' ; ') + '.');
B.push('', "**Ce que l'examen contrôlera, au-delà des règles** : pour chaque sens, la catégorie (A2-L3) et le type (A2-ST), examinés séparément ; les fonctions (A7, A9), les dimensions (A2-DIM), les tags de lieu (critère du lot 02, pour la règle C8-c), les relations et les particules, relus. Une règle du criblage désigne un rapprochement ; elle ne dit pas qu'il y a un écart.", '');
B.push('## 4. Comparables', '');
B.push("**Un comparable sert de contrôle, non de source** : aucun verdict n'en sera déduit, et un comparable non arbitré ne vaut pas référence.", '');
const cites = new Map(); for (const f of fiches) for (const g of f.c.regles) for (const m of g.detail.matchAll(/(?:hj_)?v_\d+_s\d+/g)) if (m[0] !== f.id && tous.has(m[0])) { if (!cites.has(m[0])) cites.set(m[0], new Set()); cites.get(m[0]).add(f.e.word); }
B.push('**4.1 Les sens que les règles nomment** (' + cites.size + ') :', '', '| Sens | Mot | Traduction | Catégorie publiée | Type publié | Nommé à propos de | État |', '|---|---|---|---|---|---|---|');
for (const [id, par] of cites) { const { e, s } = tous.get(id); B.push('| `' + id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | `' + cat(s.category) + '` | `' + s.semantic_type + '` | ' + [...par].join(', ') + ' | ' + etat(id) + ' |'); }
const cles = [...new Set(fiches.map((f) => f.s.category.level_1 + ' › ' + f.s.category.level_2))];
const memes = [...tous.values()].filter(({ s }) => s.category && cles.includes(s.category.level_1 + ' › ' + s.category.level_2));
B.push('', '**4.2 Les sens publiés des mêmes catégories de niveau 2** (' + memes.length + ', les douze de B1 compris) :', '', '| Catégorie de niveau 2 | Sens publiés | Types publiés | Dont B1 | Autres, par état |', '|---|---|---|---|---|');
for (const k of cles) { const g = memes.filter(({ s }) => s.category.level_1 + ' › ' + s.category.level_2 === k); const types = {}; for (const { s } of g) types[s.semantic_type] = (types[s.semantic_type] ?? 0) + 1; const autres = {}; for (const { s } of g) if (livraison.get(s.id) !== 'B1') { const x = etat(s.id); autres[x] = (autres[x] ?? 0) + 1; }
  B.push('| `' + k + '` | ' + g.length + ' | ' + Object.entries(types).map(([t, n]) => '`' + t + '` ' + n).join(', ') + ' | ' + g.filter(({ s }) => livraison.get(s.id) === 'B1').map(({ e }) => e.word).join(', ') + ' | ' + (Object.entries(autres).map(([x, n]) => n + ' ' + x).join(' ; ') || '—') + ' |'); }
B.push('', '**4.3 Liste de ces ' + memes.length + ' sens** :', '', '| Sens | Mot | Traduction | Classe | Catégorie publiée | Type publié | État |', '|---|---|---|---|---|---|---|');
for (const { e, s } of memes) B.push('| `' + s.id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | ' + e.linguistic.grammatical_class + ' | `' + cat(s.category) + '` | `' + s.semantic_type + '` | ' + etat(s.id) + ' |');
B.push('', '## 5. Ce qui est déjà arbitré sur ces ENTRY, et ne sera pas rouvert', '');
B.push('| Sens | Mot | Provenance des nuances (lot 2, clos) | Corrections retenues, non appliquées |', '|---|---|---|---|');
for (const f of fiches) B.push('| `' + f.id + '` | ' + f.e.word + ' | ' + f.cells[11] + ' | ' + f.cells[12] + ' |');
B.push('', "Le contrôle de provenance des nuances est clos ; ses verdicts et ses corrections ne sont pas rouverts. 昼 (sens 1) a été arbitré en A4 ; son sens 2, « Déjeuner (repas) », relève de B1. Aucun des douze sens ne relève des 147 `null` du volet 2 (contrôle du script).", '');
B.push('## 6. Limites', '');
for (const l of [
  "**Douze sens, et eux seuls.** Aucun autre sens n'est jugé, même s'il est comparable, même s'il appartient à la même ENTRY.",
  "**La fiche source décide.** Chaque fiche sera lue en entier (traductions, particules, nuance, exemple, anciens exemples) avec toutes les décisions de journal de l'ENTRY ; rien n'est ajouté par connaissance externe.",
  "**Aucune symétrie n'est imposée** entre comparables ; une divergence entre deux sens n'est un écart que si une norme la tranche.",
  "**Une catégorie n'est pas cherchée pour réduire un compte** ; `category: null` (A5) et `semantic_type: null` (A6) restent légitimes.",
  "**Les arbitrages du bloc A servent de comparables**, jamais de verdicts automatiques ; aucun des douze sens ne porte `concept_abstrait`.",
  "**Hors de B1** : les découpages de sens, les traductions, les lectures et les classes ne sont pas rouverts ; un constat à leur sujet est signalé, sans correction proposée, sauf si une règle du criblage les désigne.",
  "**Rien n'est appliqué** : une correction proposée ne serait retenue que par l'arbitrage, et aucune des corrections retenues n'est appliquée aux données.",
  "**Ne sont pas ouverts** : les autres livraisons du bloc B, les blocs C à E, le bloc F et la recherche d'omissions (préalable E5, ni adopté ni appliqué), HP-1 à HP-4, G1 à G7."
]) B.push('- ' + l);
B.push('', '## 7. Méthode proposée, et questions', '');
B.push("**Méthode** : celle des livraisons du bloc A, adaptée à la question du bloc B. Pour chaque sens : la fiche source entière et ses anciens exemples ; l'état publié de l'ENTRY et de tous ses sens ; toutes les décisions de journal de l'ENTRY ; chaque règle du criblage qui désigne le sens, avec les sens qu'elle nomme ; les sens publiés de la même catégorie ; puis un verdict proposé (conforme, écart avec son code et sa correction, ou suspendu), motivé sur la fiche. Livraison en proposition, export, arbitrage.", '');
for (const [i, q] of ["Le périmètre de B1 (les douze sens du §2) est-il confirmé, sans ajout ni retrait ?", "Les axes (§3) et les comparables (§4) conviennent-ils ?", "Les limites (§6) sont-elles les bonnes ?", "L'autorisation d'examiner **B1, seule**."].entries()) B.push((i + 1) + '. ' + q);
ecrire(R + 'B1-perimetre.md', B);

console.log('bloc A : ' + sensA.length + ' sens, ' + nConf + ' conformes, ' + nEc + ' écarts ; corrections : ' + Object.values(CORR).join(', ') + ' ; lot 3 : ' + arbitresLot3 + ' arbitrés sur 377 ; lignes V1 et V2 : ' + lignesV.length + ' ; ENTRY visées : ' + entryV.size);
console.log('B1 : ' + fiches.length + ' sens, ' + reglesB1.length + ' règles (' + reglesB1.join(', ') + ') ; sens nommés par les règles : ' + cites.size + ' ; sens des mêmes catégories : ' + memes.length + ' ; bloc B : ' + blocB.length + ' sens, ' + livB.length + ' livraisons');
