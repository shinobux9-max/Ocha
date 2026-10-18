// A2-05 · volet 1 · lot 3 : périmètre proposé pour l'examen individuel des 377 candidats du criblage (axes C1 à C10).
// Lecture seule ; ne juge aucun sens ; n'ouvre aucune fiche source.
// Usage : node perimetre-v1-lot3.mjs <racine>   (écrit docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const txt = (p) => readFileSync(join(root, p), 'utf8');
const J = (p) => JSON.parse(txt(p));
const crib = J('a2-05-travail/criblage/resultat.json');
// L'état publié : le vocabulaire N5 et les ENTRY hors JLPT (deux candidats en viennent)
const horsJlpt = J('data/vocab-hors-jlpt.json');
const vocab = [...J('data/n5/vocab.json'), ...horsJlpt];
const bilan = txt('docs/rapports/etape2-A2-05-bilan-volet2.md');
const auditNull = txt('docs/rapports/etape2-A2-05-audit-null.md');
const bilanProv = txt('docs/rapports/etape2-A2-05-volet1-lot2-provenance-bilan.md');
const entreeDe = (id) => id.replace(/_s\d+$/, '');
const compte = (l, k) => { const o = {}; for (const x of l) for (const v of [].concat(k(x))) o[v] = (o[v] ?? 0) + 1; return o; };
const titreLot = (n) => J(`reconstruction/a2-04/lots/lot-${String(n).padStart(2, '0')}.json`).title;

// 1. Préalables : le contrôle de provenance est clos
if (!bilanProv.includes('**arbitré le 2026-10-12**') || !bilanProv.includes('clos documentairement')) throw new Error('bilan de provenance non arbitré');

// 2. Les 377 : 443 candidats, moins les candidats déjà arbitrés au volet 2, moins ceux arbitrés au lot 1
const C = crib.candidats;
if (C.length !== 443 || new Set(C.map((x) => x.id)).size !== 443) throw new Error('criblage : 443 candidats distincts attendus');
const V147 = [...auditNull.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)].map((m) => ({ id: m[1], verdict: m[2] }));
const sens147 = new Set(V147.map((x) => x.id));
if (V147.length !== 147 || sens147.size !== 144) throw new Error(`volet 2 : ${V147.length} arbitrages, ${sens147.size} sens`);
const dejaVolet2 = C.filter((x) => x.dans147.length);
if (dejaVolet2.length !== 61 || dejaVolet2.some((x) => !sens147.has(x.id)) || C.some((x) => sens147.has(x.id) && !x.dans147.length)) throw new Error('candidats du volet 2');
const sec71 = bilan.split(/^### 7\.1 [^\n]*\n/m)[1].split(/^### /m)[0];
const LOT1 = [...sec71.matchAll(/^\| (\d+) \| (T\d) \| `(v_\d+_s\d+)` \| ([^|]+) \| ([^|]+) \|/gm)].map((m) => ({ n: Number(m[1]), point: m[2], id: m[3], mot: m[4].trim(), sens: m[5].trim() }));
if (LOT1.length !== 19 || new Set(LOT1.map((x) => x.id)).size !== 19) throw new Error(`lot 1 : ${LOT1.length} sens`);
const lot1 = new Set(LOT1.map((x) => x.id));
const cinq = C.filter((x) => lot1.has(x.id) && !x.dans147.length).map((x) => x.id).sort();
if (JSON.stringify(cinq) !== JSON.stringify(['v_221_s1', 'v_455_s2', 'v_504_s1', 'v_628_s1', 'v_663_s3'])) throw new Error(`candidats arbitrés au lot 1 : ${cinq.join(', ')}`);
const RESTE = C.filter((x) => !x.dans147.length && !lot1.has(x.id));
const ENTREES = [...new Set(RESTE.map((x) => entreeDe(x.id)))];
if (RESTE.length !== 377 || ENTREES.length !== 332) throw new Error(`reste : ${RESTE.length} sens, ${ENTREES.length} ENTRY`);
if (RESTE.some((x) => sens147.has(x.id) || lot1.has(x.id))) throw new Error('recouvrement avec un sens déjà arbitré');
for (const x of RESTE) {
  const e = vocab.find((v) => v.id === entreeDe(x.id)); const s = e?.senses.find((y) => y.id === x.id);
  if (!s) throw new Error(`sens absent de l'état publié : ${x.id}`);
  if (s.meaning.primary !== x.sens) throw new Error(`traduction principale différente de celle du criblage : ${x.id}`);
}

// 3. Blocs : chaque sens va dans un bloc, et un seul, selon la première condition qu'il remplit
const interrogatifs = new Set(crib.constats.interrogatif);
const axes = (x) => [...new Set(x.regles.map((g) => (g.regle === 'RES' ? 'RES' : g.axe)))].sort();
const regles = (x) => [...new Set(x.regles.map((g) => g.regle))];
const BLOCS = [
  ['F', 'interrogatifs (dépendance E5)', (x) => interrogatifs.has(x.id), 'le sens porte `interrogatif`, fonction sans définition normative'],
  ['E', 'points réservés par les lots (RES)', (x) => regles(x).includes('RES'), 'un lot a réservé le point à A2-05'],
  ['D', 'fonctions, et `null` portés par une fonction (C2, C4, C7)', (x) => axes(x).some((a) => ['C2', 'C4', 'C7'].includes(a)), 'le sens est candidat sur C2, C4 ou C7'],
  ['A', 'types `concept_abstrait` (C3-0)', (x) => regles(x).includes('C3-0'), 'le sens porte le type `concept_abstrait`, examen individuel imposé'],
  ['B', 'catégories et types posés (C1, C3)', (x) => axes(x).some((a) => ['C1', 'C3'].includes(a)), 'le sens est candidat sur C1 ou sur C3'],
  ['C', 'tags, dimensions et justifications datées (C8, C5, C10)', () => true, 'le sens n\'est candidat que sur C8, C5 ou C10']
];
const blocDe = (x) => BLOCS.find((b) => b[2](x))[0];
const parBloc = Object.fromEntries(['A', 'B', 'C', 'D', 'E', 'F'].map((k) => [k, RESTE.filter((x) => blocDe(x) === k)]));
if (Object.values(parBloc).reduce((a, l) => a + l.length, 0) !== 377) throw new Error('blocs : somme');

// 4. Livraisons : par clé de regroupement, 12 sens au plus, sans partager une ENTRY
const MAX = 12;
const n1 = (x) => x.categorie.split(' › ')[0];
const motifRes = (x) => x.regles.find((g) => g.regle === 'RES').detail.replace('point réservé à A2-05 : ', '');
const CLE = { A: (x) => `lot ${String(x.lot).padStart(2, '0')}`, B: (x) => (n1(x) === 'null' ? 'zz sans catégorie' : n1(x)), C: (x) => `lot ${String(x.lot).padStart(2, '0')}`, D: (x) => `lot ${String(x.lot).padStart(2, '0')}`, E: (x) => motifRes(x), F: (x) => `lot ${String(x.lot).padStart(2, '0')}` };
const numE = (x) => Number(entreeDe(x.id).slice(2));
const tri = (a, b) => numE(a) - numE(b) || a.id.localeCompare(b.id);
function livraisons(k) {
  const groupes = new Map();
  for (const x of parBloc[k]) { const c = CLE[k](x); groupes.set(c, [...(groupes.get(c) ?? []), x]); }
  const out = []; let cur = [];
  const clore = () => { if (cur.length) { out.push(cur); cur = []; } };
  for (const c of [...groupes.keys()].sort()) {
    const g = groupes.get(c).sort(tri);
    if (cur.length + g.length <= MAX) { cur.push(...g); continue; }
    clore();
    if (g.length <= MAX) { cur.push(...g); continue; }
    // groupe trop grand : parts à peu près égales, sans couper une ENTRY
    const parts = Math.ceil(g.length / MAX); const cible = Math.ceil(g.length / parts);
    for (const x of g) { if (cur.length >= cible && entreeDe(cur[cur.length - 1].id) !== entreeDe(x.id)) clore(); cur.push(x); }
    clore();
  }
  clore();
  // Une livraison de moins de 5 sens rejoint sa voisine du même bloc, si l'ensemble ne dépasse pas 14
  for (let j = 0; j < out.length; j += 1) {
    if (out[j].length >= 5 || out.length === 1) continue;
    const v = j > 0 && out[j - 1].length + out[j].length <= 14 ? j - 1 : j + 1 < out.length && out[j].length + out[j + 1].length <= 14 ? j + 1 : -1;
    if (v < 0) continue;
    const fusion = v < j ? [...out[v], ...out[j]] : [...out[j], ...out[v]];
    out.splice(Math.min(v, j), 2, fusion); j = -1;
  }
  return out.map((l, i) => ({ nom: `${k}${i + 1}`, bloc: k, sens: l, cles: [...new Set(l.map((x) => CLE[k](x).replace(/^zz /, '')))] }));
}
const LIV = ['A', 'B', 'C', 'D', 'E', 'F'].flatMap(livraisons);
const livDe = new Map(LIV.flatMap((l) => l.sens.map((x) => [x.id, l.nom])));
if (livDe.size !== 377 || LIV.reduce((a, l) => a + l.sens.length, 0) !== 377) throw new Error('livraisons : couverture');
const entreeLiv = new Map();
for (const l of LIV) for (const x of l.sens) { const e = entreeDe(x.id); (entreeLiv.get(e) ?? entreeLiv.set(e, new Set()).get(e)).add(l.nom); }
const entreesPartagees = [...entreeLiv].filter(([, s]) => s.size > 1);

// 5. Chevauchements
const CORR = bilan.split('\n').filter((l) => /^\| (V[12]-\d+|\d+) \| `((?:hj_)?v_\d+)(_s\d+)?`/.test(l)).map((l) => { const c = l.replace(/^\| /, '').replace(/ \|$/, '').split(' | '); const m = c[1].match(/^`((?:hj_)?v_\d+)(_s\d+)?`$/); return { n: c[0], unite: m[1] + (m[2] ?? ''), entree: m[1], champ: c.length === 6 ? c[4] : c[5] }; });
if (CORR.length !== 180) throw new Error(`corrections : ${CORR.length}`);
const PROV = new Map([...bilanProv.matchAll(/^\| \d+ \| ([^|]+) \| `([^`]+)` \| [^|]+ \| \d+ \| (?:ENTRY|sens) \| (sourcé|assumé|écart)[^|]*\| ([^|]+) \|/gm)].map((m) => [m[2], { liv: m[1].trim(), verdict: m[3], corr: m[4].trim() }]));
if (PROV.size !== 278) throw new Error(`bilan de provenance : ${PROV.size} nuances lues`);
// Les deux ENTRY hors JLPT : le contrôle de provenance les nomme hj_v_1 et hj_v_2 (identifiants des sources), l'état publié v_718 et v_719. Rapprochement par le mot.
const HJ = [...bilanProv.matchAll(/`(hj_v_\d+)` ([^ :]+) : (sourcé|assumé|écart)/g)].map((m) => ({ src: m[1], mot: m[2], verdict: m[3] }));
if (HJ.length !== 2) throw new Error(`hors JLPT : ${HJ.length} nuances relevées au bilan de provenance`);
const ALIAS = new Map();
for (const h of HJ) {
  const e = horsJlpt.filter((v) => v.word === h.mot);
  if (e.length !== 1) throw new Error(`hors JLPT : ${h.mot} introuvable ou ambigu dans l'état publié`);
  ALIAS.set(h.src, e[0].id); PROV.set(e[0].id, { liv: '4 · lot 05 (hors JLPT)', verdict: h.verdict, corr: '' });
}
for (const c of CORR) if (ALIAS.has(c.entree)) { c.unite = c.unite.replace(c.entree, ALIAS.get(c.entree)); c.entree = ALIAS.get(c.entree); }
if (CORR.some((c) => c.entree.startsWith('hj_'))) throw new Error('correction hors JLPT non rapprochée');
const corrSens = (x) => CORR.filter((c) => c.unite === x.id);
const corrEntree = (x) => CORR.filter((c) => c.entree === entreeDe(x.id) && c.unite !== x.id);
const provDe = (x) => [PROV.get(x.id) && { niveau: 'sens', ...PROV.get(x.id) }, PROV.get(entreeDe(x.id)) && { niveau: 'ENTRY', ...PROV.get(entreeDe(x.id)) }].filter(Boolean);
const voisins147 = (x) => V147.filter((v) => entreeDe(v.id) === entreeDe(x.id)).map((v) => v.id);
const voisinsLot1 = (x) => LOT1.filter((v) => entreeDe(v.id) === entreeDe(x.id)).map((v) => v.id);

// 6. Rédaction
let md = '';
const P = (t = '') => { md += `${t}\n`; };
const liste = (l) => l.join(', ') || 'aucun';
const RX = compte(RESTE, regles); const AX = compte(RESTE, axes);
P('# Étape 2 · A2-05 · Volet 1 · Lot 3 — périmètre proposé pour l\'examen individuel des 377 candidats (axes C1 à C10)');
P();
P('**Date** : 2026-10-12');
P('**Statut** : **arbitré le 2026-10-12 (ChatGPT, par délégation ; relayé par l\'utilisateur) : périmètre accepté.** **377 candidats dans 332 ENTRY, sans ajout ni retrait** ; six blocs (A 69, B 148, C 35, D 84, E 24, F 17) ; les 40 livraisons sont le plan accepté, ajustable « sur proposition explicite après le pilote, sans ajouter ni retirer de candidat et sans déplacer silencieusement des sens » ; ordre A, B, C, D, E, F ; chaque sens dans un bloc et un seul, examiné sur tous ses axes. **Méthode arbitrée** : deux verdicts définitifs, « conforme » et « écart » ; un statut provisoire, « suspendu — préalable normatif », réservé au cas où une décision est réellement impossible sans une définition normative manquante (un sens suspendu ne compte pas comme arbitré) ; aucune catégorie, aucun type, aucune fonction ni aucun sens absent de la fiche ou du registre n\'est inventé ; les corrections nouvelles sont numérotées à la suite, V1-6, V1-7… ; V1-1 à V1-5 ne sont ni modifiées ni appliquées. **E5** : la préparation d\'un dossier documentaire distinct est autorisée (périmètre et questions normatives sur `interrogatif`), sans décider la définition, sans addendum présenté comme validé, sans modifier les données ; **le bloc F reste suspendu jusqu\'à l\'adoption explicite d\'E5**. **C6 et C9** : un rapport séparé de conclusion du criblage, après les examens individuels et avant le bilan final du volet 1, distinct de G1 à G7. **Seule la livraison pilote A1 est autorisée** ; A2 ne commence pas avant l\'arbitrage d\'A1 ; les 377 examens ne sont pas autorisés en bloc ; G1 à G7 ne sont pas ouverts ; aucune des 180 corrections n\'est appliquée. *(Proposition d\'origine, conservée :)* **proposition de périmètre, non arbitrée. Aucun examen individuel n\'est commencé, et aucune décision lexicale n\'est prise : aucun sens n\'a été lu en vue d\'un verdict.** Calculé par `a2-05-travail/perimetre-v1-lot3.mjs`, en lecture seule, sur le résultat validé du criblage (`a2-05-travail/criblage/resultat.json`), l\'état publié, le rapport d\'audit des 147 `null`, la liste consolidée des corrections et le bilan arbitré du contrôle de provenance. **Aucune fiche source n\'a été ouverte pour ce rapport.** Rien n\'est modifié dans les données, le journal, les registres, les outils ni les snapshots. **G1 à G7 ne sont pas ouverts.**');
P();
P('**Désignation** : le volet 1 compte déjà un lot 1 (points T1 à T8, 19 sens) et un lot 2 (provenance des nuances, clos). L\'examen individuel des candidats restants est désigné ici **lot 3 du volet 1**.');
P();
P('## 1. Point de départ : d\'où viennent les 377');
P();
P(`Le criblage, validé, a retenu **443 sens candidats** parmi les ${crib.result.sens} sens publiés. « Candidat » veut dire : désigné pour un examen individuel. **Ce n'est pas un écart.**`);
P();
P('| Étape | Sens | Reste |');
P('|---|---|---|');
P('| Candidats du criblage | 443 | 443 |');
P(`| Candidats déjà arbitrés au volet 2 (parmi les 144 sens des 147 arbitrages) | − ${dejaVolet2.length} | ${443 - dejaVolet2.length} |`);
P(`| Candidats arbitrés au lot 1 du volet 1 (${cinq.map((s) => `\`${s}\``).join(', ')}) | − ${cinq.length} | **${RESTE.length}** |`);
P();
P(`**Les 377 candidats restants portent sur ${ENTREES.length} ENTRY.** Aucun d'eux n'est un sens des 147 arbitrages du volet 2, ni l'un des 19 sens du lot 1 : un même cas n'est audité individuellement qu'une fois.`);
P();
P('## 2. Les axes et les règles en cause');
P();
P('Un sens peut être candidat sur plusieurs axes ; il sera examiné une seule fois, sur tous ses axes à la fois.');
P();
const OBJET = { C1: 'catégories posées (contexte d\'usage, comparables, même traduction)', C2: '`category: null` porté par une fonction', C3: 'types posés, dont les `concept_abstrait`', C4: '`semantic_type: null` porté par une fonction', C5: 'dimensions', C7: 'fonctions linguistiques, dont les sens décidés avant A7 et A9', C8: 'tags de lieu', C10: 'justifications datées (raison de journal qui renvoie à une étape ultérieure)', RES: 'points réservés à A2-05 par un lot' };
P('| Axe | Objet | Sens parmi les 377 |');
P('|---|---|---|');
for (const a of ['C1', 'C2', 'C3', 'C4', 'C5', 'C7', 'C8', 'C10', 'RES']) P(`| ${a} | ${OBJET[a]} | ${AX[a] ?? 0} |`);
if (Object.keys(AX).some((a) => !OBJET[a])) throw new Error(`axe inattendu : ${Object.keys(AX)}`);
P();
P('**C6 (relations) et C9 (citations d\'A2-GLOBAL)** portent sur des liens et des décisions, non sur des sens : aucun des 377 n\'en relève. Ils restent à conclure à partir des constats du criblage (§7.4), hors de ce périmètre sauf décision contraire.');
P();
const DEF = { 'C1-a': 'même traduction principale dans deux ENTRY, catégories différentes', 'C1-b': 'famille source de 5 sens ou plus : sens d\'un autre niveau 1 que la majorité', 'C1-d': 'deux sens reliés par une relation, de niveaux 1 différents', 'C1-f': 'catégorie dont la moitié des sens est déjà candidate : ses autres sens', 'C1-g': 'sens seul à porter son niveau 1 dans sa famille source', 'C1-h': 'sens catégorisés côtoyant, dans leur famille, un sens sans catégorie ni fonction', 'C2-0': 'population imposée : `category: null` avec une fonction', 'C3-0': 'population imposée : type `concept_abstrait`', 'C3-b': 'même traduction principale dans deux ENTRY, types différents', 'C3-c': 'couple classe × type atypique', 'C3-d': 'catégorie de 5 sens ou plus : sens d\'un autre type que la majorité', 'C3-e': 'deux sens reliés par une relation, de types différents', 'C4-0': 'population imposée : `semantic_type: null` avec une fonction', 'C5-0': 'population imposée : sens portant une dimension', 'C5-b': 'sens sans dimension dont une traduction contient un terme de pôle d\'A2-DIM', 'C7-b': 'sens sans `deictique`, décidé avant A7, dont une traduction contient un terme déictique', 'C7-c': 'sens sans l\'une des six fonctions d\'A9, décidé avant A9, dont une traduction contient un terme de cette fonction', 'C7-d': 'même traduction principale dans deux ENTRY, fonctions différentes', 'C7-e': 'fonction posée avant l\'addendum qui la définit', 'C8-a': 'tag décidé au lot 0 ou 01, avant la formalisation du critère', 'C8-b': 'tag gardé pour un sens et écarté pour un autre de la même catégorie', 'C8-c': 'tag porté sans décision de journal sur le champ `tags`', 'C10-a': 'raison de journal invoquant l\'absence d\'une définition ou renvoyant à une étape ultérieure', RES: 'point déjà réservé à A2-05 par un lot' };
if (Object.keys(RX).some((r) => !DEF[r])) throw new Error(`règle inattendue : ${Object.keys(RX)}`);
P('| Règle | Détection (résumé ; définition complète au rapport de criblage, §3) | Sens parmi les 377 |');
P('|---|---|---|');
for (const r of Object.keys(DEF)) if (RX[r]) P(`| ${r} | ${DEF[r]} | ${RX[r]} |`);
P();
P(`**Par classe grammaticale** : ${Object.entries(compte(RESTE, (x) => x.classe)).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(' ; ')}. **Par lot d'origine** : ${Object.entries(compte(RESTE, (x) => String(x.lot).padStart(2, '0'))).sort().map(([k, n]) => `${k} : ${n}`).join(' ; ')}.`);
P();
P('## 3. Les 19 sens du lot 1, tenus distincts');
P();
P('Le lot 1 (points T1 à T8) est arbitré : 14 conformes, 5 écarts, V1-1 à V1-5 retenues. **Aucun de ses 19 sens n\'est dans les 377.**');
P();
P('| # | Point | SENSE | Mot | Sens publié | Situation au regard du criblage |');
P('|---|---|---|---|---|---|');
for (const x of LOT1) { const c = C.find((y) => y.id === x.id); P(`| ${x.n} | ${x.point} | \`${x.id}\` | ${x.mot} | ${x.sens} | ${!c ? 'non candidat' : c.dans147.length ? `candidat (${liste(regles(c))}), déjà retiré au titre du volet 2` : `candidat (${liste(regles(c))}), retiré des 377 après son arbitrage au lot 1`} |`); }
P();
const l1cand = LOT1.filter((x) => C.some((y) => y.id === x.id));
P(`Soit ${LOT1.length - l1cand.length} non candidats, ${l1cand.filter((x) => C.find((y) => y.id === x.id).dans147.length).length} candidats déjà retirés au titre du volet 2, et ${cinq.length} candidats retirés après le lot 1. Les **réserves non closes du lot 1** (bilan, §8.5 : 暗い sens 2, 爽やか sens 2, 後 sens 3, だんだん, 汚い sens 2, 所 sens 2, 切る sens 2) ne sont pas rouvertes ici ; elles restent attachées à leurs verdicts.`);
const memeEntreeL1 = RESTE.filter((x) => voisinsLot1(x).length);
P();
P(`**${memeEntreeL1.length} candidats partagent leur ENTRY avec un sens du lot 1** (${memeEntreeL1.map((x) => `\`${x.id}\` ${x.mot}`).join(', ') || 'aucun'}) : ce sont d'autres sens des mêmes mots ; le verdict du lot 1 ne les couvre pas, et il n'est pas rouvert.`);
P();
P('## 4. Blocs proposés');
P();
P('**Principe** : la question posée à un sens dépend de l\'axe sur lequel il est candidat. Les 377 sont donc regroupés par **question directrice**, de sorte qu\'une même livraison applique une même norme à des cas comparables. Chaque sens est rangé dans **un bloc, et un seul**, par la première des conditions suivantes qu\'il remplit ; il y est examiné sur **tous** ses axes.');
P();
P('| Ordre de la règle | Bloc | Condition | Sens | ENTRY | Livraisons |');
P('|---|---|---|---|---|---|');
BLOCS.forEach((b, i) => P(`| ${i + 1} | **${b[0]}** · ${b[1]} | ${b[3]} | ${parBloc[b[0]].length} | ${new Set(parBloc[b[0]].map((x) => entreeDe(x.id))).size} | ${LIV.filter((l) => l.bloc === b[0]).length} |`));
P(`| | **Total** | | **${RESTE.length}** | | **${LIV.length}** |`);
P();
P('La lettre du bloc suit l\'ordre de traitement proposé au §9, non l\'ordre de la règle d\'affectation.');
P();
P('**Ce que chaque bloc examine** :');
P();
for (const l of [
  `**A · \`concept_abstrait\`** (${parBloc.A.length}) : le type \`concept_abstrait\` est-il le bon type terminal d'A2-ST pour ce sens, ou sert-il de type de secours ? Population imposée par l'arbitrage du périmètre du volet 1. Regroupé par lot d'origine, c'est-à-dire par thème.`,
  `**B · catégories et types posés** (${parBloc.B.length}) : la catégorie et le type publiés sont-ils cohérents avec ceux des sens comparables ? Les règles de l'axe C1 sont comparatives : elles désignent un sens **par rapport à sa famille**. Le bloc est donc regroupé **par catégorie de niveau 1**, non par lot, pour que les comparables soient lus ensemble.`,
  `**C · tags, dimensions, justifications datées** (${parBloc.C.length}) : le tag de lieu répond-il au critère formalisé au lot 02 ; la dimension décrit-elle directement le sens ; la raison de journal qui renvoyait à plus tard est-elle soldée ? Regroupé par lot.`,
  `**D · fonctions, et \`null\` portés par une fonction** (${parBloc.D.length}) : la fonction posée, ou absente, est-elle conforme à A7 et à A9, appliqués sens par sens ; le \`null\` de catégorie ou de type est-il bien justifié par la fonction (A9, §4.1 et §4.2) ? Regroupé par lot.`,
  `**E · points réservés** (${parBloc.E.length}) : chaque point qu'un lot a explicitement renvoyé à A2-05. Regroupé par motif de réservation.`,
  `**F · interrogatifs** (${parBloc.F.length}) : les sens qui portent \`interrogatif\`. **Bloc suspendu à un préalable normatif (E5)** : cette fonction n'a pas de définition.`
]) P(`- ${l}`);
P();
P('## 5. Livraisons proposées');
P();
P(`**${LIV.length} livraisons de ${Math.min(...LIV.map((l) => l.sens.length))} à ${Math.max(...LIV.map((l) => l.sens.length))} sens**, ${MAX} en règle générale et 14 au plus quand une très petite livraison est jointe à sa voisine : la taille des livraisons du contrôle de provenance. Chaque sens n'est examiné qu'une fois. ${entreesPartagees.length ? `Les sens d'une même ENTRY peuvent se trouver dans deux livraisons, quand ils relèvent de blocs ou de catégories différents : c'est le cas de ${entreesPartagees.length} ENTRY (§8). Dans un même regroupement, une ENTRY n'est jamais coupée.` : 'Aucune ENTRY n\'a de sens dans deux livraisons.'}`);
P();
P('| Livraison | Bloc | Regroupement | Sens | ENTRY | Mots |');
P('|---|---|---|---|---|---|');
for (const l of LIV) P(`| ${l.nom} | ${l.bloc} | ${l.cles.map((c) => (/^lot \d+$/.test(c) ? `${c} (« ${titreLot(Number(c.slice(4)))} »)` : c)).join(' ; ')} | ${l.sens.length} | ${new Set(l.sens.map((x) => entreeDe(x.id))).size} | ${l.sens.map((x) => `${x.mot}${RESTE.filter((y) => entreeDe(y.id) === entreeDe(x.id)).length > 1 || /_s[2-9]$/.test(x.id) ? ` (s${x.id.split('_s').pop()})` : ''}`).join(', ')} |`);
P();
P('**Ce découpage est mécanique** : il applique la règle du §4 et une taille maximale. Il peut être réarrangé à l\'arbitrage (taille, ordre, fusion des petites livraisons de fin de bloc) sans changer le périmètre.');
P();
P('## 6. Liste exhaustive des 377 candidats');
P();
P('« Provenance » rappelle le verdict arbitré de la nuance du sens, ou de celle de son ENTRY, quand elle était au plan du lot 2 ; « Corrections » liste les corrections retenues, non appliquées, qui touchent le sens ou son ENTRY. Ces deux colonnes signalent un chevauchement ; elles ne rouvrent rien.');
P();
P('| # | Livraison | SENSE | Mot | Sens publié | Lot | Classe | Catégorie publiée | Type publié | Règles du criblage | Provenance | Corrections retenues |');
P('|---|---|---|---|---|---|---|---|---|---|---|---|');
let i = 0;
for (const l of LIV) for (const x of l.sens) { i += 1; P(`| ${i} | ${l.nom} | \`${x.id}\` | ${x.mot} | ${x.sens} | ${String(x.lot).padStart(2, '0')} | ${x.classe} | ${x.categorie === 'null' ? '—' : `\`${x.categorie}\``} | ${x.type === 'null' || x.type == null ? '—' : `\`${x.type}\``} | ${liste(regles(x))} | ${provDe(x).map((p) => `${p.niveau} : ${p.verdict}`).join(' ; ') || '—'} | ${[...corrSens(x).map((c) => `${c.n} (sens)`), ...corrEntree(x).map((c) => `${c.n} (\`${c.unite}\`)`)].join(', ') || '—'} |`); }
if (i !== 377) throw new Error('liste exhaustive');
P();
P('## 7. Chevauchements, points réservés, risques et dépendances normatives');
P();
P('### 7.1 Chevauchements avec les arbitrages déjà rendus');
P();
const v147 = RESTE.filter((x) => voisins147(x).length);
const cS = RESTE.filter((x) => corrSens(x).length); const cE = RESTE.filter((x) => corrSens(x).length || corrEntree(x).length);
const pv = RESTE.filter((x) => provDe(x).length); const pvE = pv.filter((x) => provDe(x).some((p) => p.verdict === 'écart'));
P(`- **147 arbitrages du volet 2** : aucun des 377 n'est un sens arbitré au volet 2. **${v147.length} candidats partagent leur ENTRY avec un sens arbitré au volet 2** (autre sens du même mot) ; ces verdicts ne sont pas rouverts, mais ils seront cités comme comparables.`);
P(`- **19 sens du lot 1** : aucun dans les 377 ; ${memeEntreeL1.length} candidats partagent leur ENTRY avec l'un d'eux (§3).`);
P(`- **180 corrections retenues, non appliquées** : ${cS.length} candidats sont **directement** visés par une correction (${compte(cS.flatMap(corrSens), (c) => c.champ.replace(/ \(.*$/, '')) ? Object.entries(compte(cS.flatMap(corrSens), (c) => c.champ.replace(/ \(.*$/, ''))).map(([k, n]) => `${k} : ${n}`).join(' ; ') : ''}) ; ${cE.length} le sont eux-mêmes ou par leur ENTRY. **Toutes ces corrections portent sur \`nuance\` ou \`particles\`**, champs que l'examen des axes C1 à C10 ne juge pas : ${CORR.filter((c) => RESTE.some((x) => c.unite === x.id) && !/nuance|particles/.test(c.champ)).length === 0 ? 'aucune correction retenue ne porte sur la catégorie, le type, une fonction, une dimension ou un tag d\'un candidat' : `**à relire** : ${CORR.filter((c) => RESTE.some((x) => c.unite === x.id) && !/nuance|particles/.test(c.champ)).map((c) => `${c.n} \`${c.unite}\` ${c.champ}`).join(' ; ')}`}.`);
P(`- **Contrôle de provenance (lot 2, clos)** : ${pv.length} candidats ont vu leur nuance, ou celle de leur ENTRY, arbitrée au lot 2 ; pour ${pvE.length} d'entre eux, le verdict est « écart » et une correction de nuance est retenue. **L'état publié que l'examen lira est celui d'avant ces corrections** : une nuance à corriger ne doit pas servir d'argument pour une catégorie, un type ou une fonction.`);
P('- **Conséquence pratique** : si l\'examen d\'un candidat conclut à un écart, sa correction s\'ajoute à la liste consolidée, à part des 180, sous une numérotation à arbitrer (§10).');
P();
P('### 7.2 Points réservés (bloc E)');
P();
const MR = {}; for (const x of parBloc.E) (MR[motifRes(x)] ??= []).push(x);
P('| Motif de réservation (libellé du criblage) | Sens | Mots |');
P('|---|---|---|');
for (const [k, l] of Object.entries(MR)) P(`| ${k} | ${l.length} | ${l.map((x) => `${x.mot} (\`${x.id}\`)`).join(', ')} |`);
const resAilleurs = RESTE.filter((x) => regles(x).includes('RES') && blocDe(x) !== 'E');
P();
P(`${resAilleurs.length ? `${resAilleurs.length} autres points réservés sont rangés dans un bloc de rang supérieur (${resAilleurs.map((x) => `${x.mot}, bloc ${blocDe(x)}`).join(' ; ')}).` : 'Tous les points réservés des 377 sont dans le bloc E.'} Les points réservés portant sur des sens déjà arbitrés (volet 2 ou lot 1) ne sont pas repris.`);
P();
P('### 7.3 Dépendances normatives');
P();
const c7b = RESTE.filter((x) => regles(x).includes('C7-b')); const c7c = RESTE.filter((x) => regles(x).includes('C7-c')); const deix = RESTE.filter((x) => regles(x).includes('RES') && /deixis/.test(motifRes(x)));
for (const l of [
  `**E5, la fonction \`interrogatif\`** : ${parBloc.F.length} sens la portent, tous parmi les 377 (${[...new Set(parBloc.F.map((x) => x.mot))].join(', ')}). Elle n'a **aucune définition normative**. Un verdict sur ces sens supposerait la définition qui manque : **le bloc F ne peut pas être audité avant qu'un addendum la fixe**, arbitré à part. Ce chantier normatif doit aboutir avant la clôture de l'étape 2 ; il n'est pas ouvert par ce périmètre.`,
  `**A7, la deixis** : ${deix.length} sens sont réservés pour la deixis temporelle (${deix.map((x) => x.mot).join(', ')}), et ${c7b.length} sens décidés avant A7 sont signalés par une traduction déictique (${c7b.map((x) => x.mot).join(', ')}). A7 est validé : l'examen peut se faire ; il applique sa définition (personne, espace, temps) sens par sens.`,
  `**A9, les six fonctions définies** : ${c7c.length} sens décidés avant A9 sont signalés par un terme d'une de ces fonctions ; ${RX['C2-0'] ?? 0} sens ont un \`category: null\` et ${RX['C4-0'] ?? 0} un \`semantic_type: null\` portés par une fonction. A9 est validé ; il s'applique quand le rôle fait partie intégrante du sens modélisé et que la fiche l'atteste, jamais par la classe.`,
  '**Fonctions sans définition** : `modalite`, `aspect` et `alternative` n\'ont pas de définition normative ; aucune n\'est posée, et l\'examen ne peut ni en poser ni en exiger. Un écart qui supposerait l\'une d\'elles sera signalé comme point normatif, non tranché.',
  '**A5 et A6, les absences justifiées** : `category: null` et `semantic_type: null` restent légitimes quand aucune valeur du registre ne convient ; une catégorie ou un type n\'est pas cherché pour réduire un compte.',
  `**Registre des catégories** : six sens sont réservés pour une sous-catégorie absente d'espace › dimensions (superficie, circonférence, épaisseur). L'examen peut constater que le registre ne nomme pas la notion ; **il ne peut pas créer de sous-catégorie**, ce qui relèverait d'un addendum.`,
  '**La conception est verrouillée** : toute évolution d\'une norme que l\'examen rendrait souhaitable passe par un addendum explicite, validé avant d\'être appliqué.'
]) P(`- ${l}`);
P();
P('### 7.4 Ce qui reste hors des 377');
P();
P(`- **C6, relations** : ${crib.constats.relations.length} liens publiés et ${crib.constats.relationsCandidates.length} décisions inscrivant une relation candidate ; le criblage n'y a détecté aucune anomalie mécanique. **C9, citations** : ${crib.constats.citations.length} citations de section relevées. Ils portent sur des liens et des décisions ; je propose de les conclure dans un rapport séparé, après les sens, ou avec les contrôles globaux, selon l'arbitrage.`);
P(`- **Les ${crib.result.nonCandidats} sens non candidats** : le criblage n'y a détecté aucun écart ; ils ne sont pas examinés.`);
P('- **Volet 3, G1 à G7** : non ouvert.');
P('- **L\'application des 180 corrections** : hors périmètre.');
P();
P('### 7.5 Risques');
P();
for (const l of [
  '**Prendre un candidat pour un écart.** Les règles comparatives désignent des sens qui diffèrent de leurs voisins ; la différence est souvent justifiée par la fiche. Au lot 1, 14 sens sur 19 étaient conformes.',
  '**Imposer une symétrie.** La doctrine des lots est constante : chaque fiche décide pour elle-même ; deux sens de même traduction peuvent porter légitimement deux catégories.',
  '**Séparer des comparables.** Le bloc B est regroupé par catégorie pour l\'éviter ; mais une famille peut s\'étendre sur plusieurs livraisons ou plusieurs blocs. Chaque fiche citera ses comparables, déjà arbitrés ou à venir, et un verdict pourra être assorti d\'une réserve « à rapprocher de ».',
  '**Rouvrir en silence une décision validée.** Un écart ne modifie rien : il propose une correction, numérotée, qui se fera par une décision nouvelle et une réouverture journalisée, sur autorisation.',
  '**Le volume.** 377 sens, soit plus que les 278 nuances du lot 2, avec des questions plus ouvertes. Le découpage vise des livraisons courtes et homogènes ; il faudra sans doute ajuster la taille après la première.',
  '**Les dépendances normatives** (§7.3) : un bloc au moins est bloqué par un préalable ; d\'autres examens pourront buter sur une notion que les normes ne définissent pas. Ces cas seront signalés, non tranchés.',
  '**La reproductibilité** : le résultat du criblage et ses scripts sont dans `a2-05-travail/`, hors dépôt, comme le plan de provenance.'
]) P(`- ${l}`);
P();
P('## 8. Contrôles de couverture et de non-duplication');
P();
P('Calculés par `a2-05-travail/perimetre-v1-lot3.mjs`, qui s\'arrête au premier écart.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P('| Le criblage compte 443 candidats distincts | oui |');
P(`| Les 147 arbitrages du volet 2 portent sur 144 sens ; 61 sont candidats, et ce sont exactement les candidats marqués « volet 2 » | oui |`);
P(`| Les 19 sens du lot 1 sont distincts ; 5 sont des candidats hors volet 2, et ce sont ceux que le bilan (§8.3) retire | oui : ${cinq.map((s) => `\`${s}\``).join(', ')} |`);
P(`| 443 − 61 − 5 | ${RESTE.length} sens, dans ${ENTREES.length} ENTRY |`);
P('| Aucun des 377 n\'est un sens du volet 2 ni du lot 1 | oui |');
P('| Chaque candidat existe dans l\'état publié, avec la traduction principale relevée par le criblage | oui, pour les 377 |');
P(`| Chaque candidat est dans un bloc, et un seul | oui : ${['A', 'B', 'C', 'D', 'E', 'F'].map((k) => `${k} ${parBloc[k].length}`).join(' + ')} = ${RESTE.length} |`);
P(`| Chaque candidat est dans une livraison, et une seule | oui : ${LIV.length} livraisons, somme ${LIV.reduce((a, l) => a + l.sens.length, 0)}, ${livDe.size} identifiants distincts |`);
P(`| ENTRY dont les sens sont dans des livraisons différentes | ${entreesPartagees.length}${entreesPartagees.length ? ` : ${entreesPartagees.map(([e, s]) => `${RESTE.find((x) => entreeDe(x.id) === e).mot} (${[...s].join(', ')})`).join(' ; ')} ; ce sont des sens distincts d'un même mot, rangés chacun selon son bloc ou sa catégorie ; chaque fiche citera les autres sens de l'ENTRY` : ''} |`);
P('| Les 180 corrections retenues sont lues dans la liste consolidée ; les 278 verdicts de provenance dans le bilan arbitré | oui : 180 lignes ; 278 nuances |');
P();
P('## 9. Ordre de traitement proposé');
P();
P('Chaque livraison après l\'arbitrage de la précédente, comme pour le lot 2.');
P();
for (const l of [
  `**A, les \`concept_abstrait\`** (${LIV.filter((l2) => l2.bloc === 'A').length} livraisons, ${parBloc.A.length} sens) : population imposée, question unique et bien bornée par A2-ST ; c'est le meilleur terrain pour fixer la méthode et les verdicts.`,
  `**B, les catégories et types posés** (${LIV.filter((l2) => l2.bloc === 'B').length} livraisons, ${parBloc.B.length} sens) : le plus gros bloc, sans dépendance normative ; il profite de la méthode fixée en A.`,
  `**C, tags, dimensions, justifications datées** (${LIV.filter((l2) => l2.bloc === 'C').length} livraisons, ${parBloc.C.length} sens) : critères déjà arbitrés (lot 02, lot 16).`,
  `**D, fonctions et \`null\` portés par une fonction** (${LIV.filter((l2) => l2.bloc === 'D').length} livraisons, ${parBloc.D.length} sens) : application d'A7 et d'A9 ; à mener une fois les blocs sans fonction stabilisés.`,
  `**E, points réservés** (${LIV.filter((l2) => l2.bloc === 'E').length} livraisons, ${parBloc.E.length} sens) : chaque motif appelle un arbitrage propre ; certains touchent le registre.`,
  `**F, interrogatifs** (${LIV.filter((l2) => l2.bloc === 'F').length} livraisons, ${parBloc.F.length} sens) : **en dernier, et seulement après l'addendum E5.**`
]) P(`1. ${l}`);
P();
P('**Variante** : commencer par une seule livraison pilote (A1), puis arrêter le découpage définitif au vu de ce qu\'elle apprend, comme la tranche 1 du lot 2 l\'avait fait pour le tri de provenance.');
P();
P('## 10. Méthode proposée, et questions à arbitrer');
P();
P('**Méthode, reprise du lot 1** : pour chaque sens, la fiche source entière et son exemple ; l\'état publié (catégorie, type, fonctions, dimensions, tags, relations) ; toutes les décisions de journal de l\'ENTRY ; la ou les règles du criblage, avec leur détail ; les comparables de la famille ; les normes applicables (A2-ST, registre des catégories, A2-LING, A2-DIM, A5, A6, A7, A9, critère des tags) ; un verdict motivé, **conforme** ou **écart**, avec une réserve le cas échéant ; pour un écart, une correction nommée, non appliquée. Aucun sens, aucune catégorie, aucun type ni aucune fonction ajouté par connaissance externe : la fiche source décide.');
P();
P(`1. **Le périmètre** : les ${RESTE.length} candidats restants, dans ${ENTREES.length} ENTRY, sans ajout ni retrait, sont-ils acceptés comme lot 3 du volet 1 ?`);
P(`2. **Les blocs** : la règle d'affectation du §4 (un bloc par question directrice, ${['A', 'B', 'C', 'D', 'E', 'F'].map((k) => `${k} ${parBloc[k].length}`).join(', ')}) est-elle retenue ?`);
P(`3. **Les livraisons** : ${LIV.length} livraisons de ${MAX} sens en règle générale (14 au plus) ; cette taille convient-elle, ou faut-il la réduire pour les premières ?`);
P('4. **L\'ordre** : A, B, C, D, E, F ; ou la variante avec une livraison pilote ?');
P('5. **E5** : le chantier normatif sur `interrogatif` est-il à ouvrir maintenant, en parallèle, par un préalable distinct, pour que le bloc F ne reste pas bloqué ?');
P('6. **Les verdicts** : « conforme » et « écart », comme au lot 1 ; faut-il un troisième verdict pour un point qui dépend d\'une norme manquante (« suspendu à un préalable normatif ») ?');
P('7. **La numérotation des corrections** : à la suite de V1-5 (V1-6, V1-7…), puisqu\'il s\'agit du volet 1, ou une série propre au lot 3 ?');
P('8. **C6 et C9** : à conclure dans un rapport séparé après les sens, ou à renvoyer aux contrôles globaux ?');
P('9. **L\'audit de A1 seule** est-il autorisé, chaque livraison suivant l\'arbitrage de la précédente ?');
if (/ $/m.test(md)) throw new Error('rapport : espace en fin de ligne');
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md'), md);
console.log(`lot 3 : ${RESTE.length} candidats, ${ENTREES.length} ENTRY ; blocs : ${JSON.stringify(Object.fromEntries(Object.entries(parBloc).map(([k, l]) => [k, l.length])))} ; livraisons : ${LIV.length} (${LIV.map((l) => `${l.nom}:${l.sens.length}`).join(' ')}) ; ENTRY partagées : ${entreesPartagees.length} ; même ENTRY qu'un sens des 147 : ${v147.length} ; qu'un sens du lot 1 : ${memeEntreeL1.length} ; corrections directes : ${cS.length} ; sens ou ENTRY : ${cE.length} ; provenance : ${pv.length} (écart : ${pvE.length}) ; lignes : ${md.split('\n').length}`);
