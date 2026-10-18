// A2-05 · volet 2 · categorie-nulle, deuxième tranche (29 cas, famille « propriété générale »).
// Lecture seule sur les données ; les verdicts sont dans audit-cat-t2.json.
// Usage : node audit-cat-t2.mjs <racine du dépôt> <rapport.md à compléter>
// Relançable : une « Tranche 3 » déjà présente dans le rapport est remplacée.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [root, outFile] = process.argv.slice(2);
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const vocab = read('data/n5/vocab.json');
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const journal = read('reconstruction/a2-04/journal.json');
const known = read('reconstruction/a2-04/avertissements-connus.json');
const V = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'audit-cat-t2.json'), 'utf8'));
const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fnOf = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse];

const N = {
  A5: 'A5, §2 : `category: null` est permis « lorsqu\'aucune catégorie sémantique primaire suffisamment pertinente n\'existe » ; pour un sens lexical plein, « ce n\'est jamais une valeur par défaut ni un fourre-tout ».',
  L3_2: 'A2-L3-v1, §2 : « lorsqu\'aucune catégorie suffisamment caractéristique n\'existe, l\'absence de catégorie est préférable à une classification artificielle ».',
  L3_2b: 'A2-L3-v1, §2 : la catégorie « n\'est déterminée ni par sa classe grammaticale, ni par son contexte d\'utilisation habituel, ni par sa forme physique, ni par les domaines auxquels il peut être associé ».',
  G10: 'A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».',
  G11_8: 'A2-GLOBAL-v1, §11 : « préférer `category: null` à une catégorie artificielle » ; « ne jamais créer une nouvelle catégorie, dimension ou relation uniquement pour sauver un cas isolé ».',
  L3r1: 'A2-L3-v1, §7, règle 1 : « concept ≠ contexte d\'usage ».',
  L3r6: 'A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».',
  L3_8: 'A2-L3-v1, §8 : « Urgences & protection civile : non promu dans ce snapshot ».',
  L3dim: 'A2-L3-v1, §5 : « Dimensions → Longueur ; Largeur ; Hauteur ; Profondeur ; Taille » (Espace & propriétés spatiales) ; « Propriétés des matériaux » (Matières & matériaux) ; « Physique → Mécanique ; Électricité & magnétisme ; Thermique ; Optique ; Énergie physique » (Sciences).',
  L3mat: 'A2-L3-v1, §5, Matières & matériaux : « Matières naturelles ; Métaux ; Minéraux ; Matériaux organiques ; Matériaux manufacturés ; Propriétés des matériaux ».',
  L3cap: 'A2-L3-v1, §5, Être humain : « Capacités & aptitudes → Aptitude ; Habileté ; Incapacité » ; « États & besoins physiques → Sommeil & repos ; Faim & soif ; Fatigue & énergie physique ; Confort & inconfort ».',
  L3psy: 'A2-L3-v1, §5, Être humain : « Psychologie & esprit → Pensée ; Mémoire ; Attention ; Préférences ; États psychologiques » ; « Émotions & sentiments → Joie & plaisir ; Tristesse ; Peur & inquiétude ; Colère ; Affection ; Surprise & réactions émotionnelles ».',
  DIM3: 'A2-DIM-v1, §3 : « les propriétés physiques ne sont pas regroupées dans une dimension universelle unique ».',
  DIM4: 'A2-DIM-v1, §4 : identité, différence, similarité et comparaison sont « reportées vers `relations` ».',
  DIM16: 'Doctrine du lot 16 : un axe d\'A2-DIM est employé lorsqu\'il décrit directement le sens, et seulement alors.',
  LOT19: 'Doctrine du lot 19 : une catégorie ne s\'impose pas quand la fiche déborde son domaine.',
  A9_21: 'A9, §2.1 : « l\'emploi d\'adresse d\'un mot lexical (le refus pour 嫌, l\'excuse pour 悪い, l\'avertissement pour 危ない, la réplique pour 違う, la prise de congé pour また) reste en nuance, sans sens ni fonction ».',
  A9_34q: 'A9, §3.4 : le `quantificateur` « quantifie un référent désigné par un autre mot […] en en donnant l\'étendue : beaucoup, peu, un peu, tout ».',
  A9_35: 'A9, §3.5, frontière 1 : « l\'identité et la similitude ne sont pas des comparaisons de degré » ; « même », « différent », « semblable » relèvent du sens.',
  A9_36: 'A9, §3.6 : l\'`intensifieur` modifie le degré d\'une propriété exprimée par un autre mot, « sans désigner lui-même la propriété, l\'état ou l\'action modifiés ».'
};
const G44 = (el) => `A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « ${el} » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».`;
const norm = (k) => {
  if (!k.startsWith('@')) return k;
  if (k.startsWith('@G44:')) return G44(k.slice(5));
  if (!N[k.slice(1)]) throw new Error(`norme inconnue : ${k}`);
  return N[k.slice(1)];
};

const FAM = {
  A: 'A · Jugements généraux, d\'une chose ou d\'une situation',
  B: 'B · Propriétés que porte un axe d\'A2-DIM',
  C: 'C · Poids, force et résistance',
  D: 'D · Animation et calme d\'un lieu',
  E: 'E · Conduite et caractère d\'une personne',
  F: 'F · Aspect, identité, diversité, raison d\'être'
};
const ids = Object.keys(V);
const cases = ids.map((id) => {
  const e = vocab.find((x) => x.senses.some((s) => s.id === id));
  const s = e.senses.find((x) => x.id === id);
  const num = Number(id.split('_s')[1]);
  const srcId = `n5_v_${e.id.slice(2)}`;
  const ds = journal.filter((x) => x.entry === srcId && x.kind === 'categorie-nulle' && x.field === `sens ${num} · category`);
  if (!known.some((w) => w.code === 'categorie-nulle' && w.where.endsWith(` ${id}`))) throw new Error(`pas un categorie-nulle : ${id}`);
  if (ds.length !== 1) throw new Error(`décision introuvable ou multiple : ${id}`);
  if (s.category !== null) throw new Error(`catégorie non nulle : ${id}`);
  if (!FAM[V[id].f]) throw new Error(`groupe inconnu : ${id}`);
  return { id, e, s, num, srcId, f: sources.get(srcId), d: ds[0], v: V[id] };
});
const tot = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, cases.filter((c) => c.v.v === k).length]));
if (cases.length !== 29 || new Set(ids).size !== 29 || tot.L + tot.F + tot.C + tot.N !== 29) throw new Error('29 cas attendus');
for (const c of cases) if ((c.v.v === 'C' || c.v.v === 'F') !== Boolean(c.v.k)) throw new Error(`correction incohérente avec le verdict : ${c.id}`);

// aucune fiche des tranches arbitrées n'est reprise
const MARK = '\n---\n\n# Tranche 3 ·';
let md = readFileSync(outFile, 'utf8');
if (md.includes(MARK)) md = md.slice(0, md.indexOf(MARK));
md = md.replace(/\n+$/, '\n');
const deja = new Set([...md.matchAll(/^#### `(v_\d+_s\d+)` /gm)].map((m) => m[1]));
const typeNul = new Set(known.filter((w) => w.code === 'type-nul').map((w) => w.where.split(' · ')[2]));
const repris = ids.filter((id) => deja.has(id) && !typeNul.has(id));
if (repris.length) throw new Error(`déjà audités : ${repris.join(', ')}`);

const P = (t = '') => { md += `${t}\n`; };
const list = (l) => l.map((c) => `\`${c.id}\` ${c.e.word}`).join(' ; ') || '—';
P();
P('---');
P();
P('# Tranche 3 · `categorie-nulle`, deuxième tranche : 29 cas');
P();
P('**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation) : L = 29, F = 0, C = 0, N = 0. Les 28 L proposés sont confirmés ; le seul C proposé, 冷たい sens 2, est **reclassé L** (la fiche ne décrit pas assez précisément un état psychologique), son `category: null` étant maintenu. Les réserves de 丈夫, 力 et 意味 sont arbitrées L ; les autres réserves documentaires sont conservées. **Cette tranche ne retient aucune correction.** Périmètre validé le même jour : les 29 `categorie-nulle` de la famille automatique « propriété générale ». Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n\'est modifié.');
P('**Reste à faire après cette tranche** : 65 `categorie-nulle` (« action générale » 36, « aucune catégorie ne nomme la notion » 18, « autre formulation » 11) ; aucun n\'est commencé.');
P();
P('## T3.1 Résultat de la tranche');
P();
P('| Classement | Cas | Sens |');
P('|---|---|---|');
for (const k of ['L', 'F', 'C', 'N']) P(`| **${k}** | ${tot[k]} | ${list(cases.filter((c) => c.v.v === k))} |`);
P('| **Total** | 29 | L + F + C + N = 29 |');
P();
if (tot.L !== 29) throw new Error('arbitrage : 29 L attendus');
P(`**Cumul arbitré du volet 2** : 27 \`type-nul\` (L = 24, F = 1, C = 2, N = 0), 26 \`categorie-nulle\` (L = 23, F = 1, C = 2, N = 0) et ces 29 \`categorie-nulle\` (L = ${tot.L}, F = ${tot.F}, C = ${tot.C}, N = ${tot.N}), soit **82 cas arbitrés sur 147 : L = ${47 + tot.L}, F = 2, C = 4, N = 0**.`);
P();
P('- **Aucune correction** n\'est retenue dans cette tranche. La liste des corrections du volet 2 reste à cinq modifications de SENSE, dont aucune n\'est exécutée.');
P('- **Aucun N.**');
P(`- **${cases.filter((c) => c.v.r).length} fiches portent une réserve ou une note d\'arbitrage** : ${list(cases.filter((c) => c.v.r))}.`);
P('- **Un point de contrôle transversal est renvoyé au volet 1**, sans verdict : le traitement du caractère d\'une personne (明るい, 暗い, 爽やか, sens 2, catégorisés ; 冷たい, sens 2, et まっすぐ, sens 2, sans catégorie).');
P();
P('## T3.2 Composition et méthode');
P();
P('La tranche est la famille « propriété générale » du criblage, prise en entier : les 29 sens dont la raison journalisée emploie cette formule (ou « propriété physique générale »). **Elle est définie par une formulation, non par le type `propriete`** : les comparaisons n\'ont donc pas été limitées à la tranche. Les cinq sens de type `propriete` rangés dans d\'autres familles (`v_424_s1` きれい, `v_458_s1` 有名, `v_506_s2` よく, `v_504_s2` ゆっくり, `v_525_s2` まっすぐ) ont été consultés comme comparables, fiche et décision lues ; **ils ne reçoivent aucun verdict ici**.');
P();
P('Pour chaque cas, individuellement : fiche source entière et exemple ; sens publié, nuance publiée et autres sens de l\'ENTRY ; décision `categorie-nulle` et décisions voisines ; A5, A2-L3-v1 (§2, §5 à §8), A2-GLOBAL-v1 (§4.3, §4.4, §10, §11), A2-DIM-v1 et A9 selon le cas ; sens comparables publiés. L\'arbre des catégories d\'A2-L3 (§5) a été relu pour chaque sens, à la recherche d\'une catégorie qui le décrirait. Les fiches sont regroupées pour la lecture ; chaque verdict est motivé sur la fiche du cas.');
P();
P('**Un cas n\'est audité qu\'une fois.** Quatorze de ces sens étaient aussi candidats au criblage du volet 1 (fonction non examinée avant A9, dimension possible, même traduction dans deux ENTRY, point réservé). Chaque fiche traite ces relevés et dit ce qu\'il en reste.');
P();
P('## T3.3 Ce que la lecture fait apparaître');
P();
P('**La formule est ici le bon fondement, sauf pour quatre sens.** « Propriété générale » figure dans la liste des éléments hors hiérarchie (A2-L3 §6, A2-GLOBAL §4.4), à la différence d\'« état général » ou d\'« événement général » (tranche précédente). Pour vingt-cinq sens, la fiche décrit bien une propriété qu\'aucun domaine ne borne. Quatre reposent sur un autre fondement, que la fiche d\'audit nomme : l\'identité, élément distinct de la même liste (同じ) ; l\'absence du poids dans l\'arbre (軽い et 重い, sens 1) ; une fiche qui déborde par ses propres termes la catégorie la plus proche (力).');
P();
P('**Le caractère d\'une personne n\'est pas traité partout de la même façon.** C\'est la seule divergence entre lots trouvée dans cette tranche. Trois sens publiés qui décrivent le tempérament d\'une personne portent la catégorie être humain › psychologie et esprit › états psychologiques : 明るい « Enjoué » (lot 0), 暗い « Triste » et 爽やか « Vif » (lot 17, dont les décisions disent « le caractère d\'une personne »). À l\'inverse, la raison de まっすぐ « Honnête » (lot 22, D1411 ; hors tranche, sans verdict ici) dit que « le registre n\'a pas de catégorie pour la personnalité ou le caractère ». Six sens de cette tranche qualifient une personne. Lus un par un, cinq jugent une conduite ou une valeur morale (甘い, うるさい, 汚い, 清い et 立派, sens 2) : la fiche ne dit pas ce que la personne éprouve, et ils sont L. Le sixième, 冷たい « Froid (attitude) », repose sur la seule traduction « Insensible (figuré) » : la proposition était C, par rapprochement avec les trois sens catégorisés ; **l\'arbitrage l\'a classé L**, la fiche ne décrivant pas assez précisément un état psychologique. **Le problème de cohérence demeure et devient un point de contrôle transversal du volet 1** : 明るい, 暗い et 爽やか (sens 2) d\'un côté, 冷たい (sens 2) et まっすぐ « Honnête » de l\'autre. Aucun verdict n\'est pris sur ces comparables.');
P();
P('**Deux catégories ont été examinées que les lots n\'avaient pas discutées** : « Propriétés des matériaux » pour 丈夫 « Solide », et « Capacités & aptitudes » pour 力 « Force ». Elles sont écartées toutes deux, sur la fiche ; l\'arbitrage confirme L.');
P();
P('**Les relevés du criblage sont réglés dans les fiches.**');
P();
P('- Fonctions refusées avant A9 faute de définition (いろいろ, 同じ) ou jamais examinées (いい, 強い) : A9 définit depuis `quantificateur`, `comparatif` et `intensifieur`, et aucune ne s\'applique ; les conclusions d\'origine tiennent, par un motif désormais normatif.');
P('- Emplois d\'adresse réservés au lot 16 (悪い, 危ない) : A9, §2.1, les nomme et les laisse en nuance.');
P('- Dimensions possibles (いろいろ, 重い sens 2, いい) : aucun axe ne décrit directement le sens. Pour 意味, sens 2, la question de l\'axe utilité a été posée à l\'arbitrage, qui confirme L sans dimension.');
P('- Même traduction dans deux ENTRY (軽い / 薄い, 悪い / まずい, いい / じゃ) : les référents diffèrent ; aucun écart.');
P();
P('**Le point ouvert du lot 15 sur « la catégorie du poids »** reçoit une réponse pour le `null` : aucune catégorie existante ne convient, et le `null` est légitime. Je ne propose aucune catégorie nouvelle.');
P();
P('## T3.4 Corrections');
P();
P('**Aucune.** La correction proposée pour `v_265_s2` 冷たい (`category` : `null` → `etre_humain › psychologie_esprit › etats_psychologiques`) **n\'est pas retenue** : le cas est classé L et garde `category: null`. La liste des corrections du volet 2 reste à cinq modifications de SENSE (また sens 2, 頭 sens 2, 表, 皆, 皆さん). **Rien n\'est exécuté.**');
P();
P('**Points signalés, hors de l\'objet de cet audit** : la traduction principale de 汚い, sens 2, « Grossier (langage) », ne nomme que la moitié du sens ; la traduction publiée de 冷たい, sens 2, « Distant », s\'écarte de « Insensible ».');
P();
P('## T3.5 Les 29 fiches d\'audit');
P();
for (const fam of Object.keys(FAM)) {
  const l = cases.filter((x) => x.v.f === fam);
  P(`### ${FAM[fam]} (${l.length} cas)`);
  P();
  for (const c of l) {
    const { e, s, f, d, v } = c;
    P(`#### \`${c.id}\` · ${e.word} (${e.readings.find((r) => r.default)?.kana}) · « ${s.meaning.primary} » — **${v.v}**`);
    P();
    P(`- **Fiche source** (\`${c.srcId}\`, ${f.type}) : traductions « ${[f.meanings.primary, ...(f.meanings.secondary ?? [])].join(' ; ')} ». Nuance : « ${strip(f.nuance)} » Exemple : « ${strip(f.example?.japanese)} » — « ${strip(f.example?.french)} »`);
    P(`- **État publié** : sens ${c.num} sur ${e.senses.length} ; traduction « ${s.meaning.primary} »${s.meaning.alternatives?.length ? ` (${s.meaning.alternatives.join(', ')})` : ''} ; catégorie \`null\` ; type \`${s.semantic_type}\` ; dimensions ${s.dimensions.length ? s.dimensions.map((x) => `\`${x.axis}:${x.pole}\``).join(', ') : 'aucune'} ; fonctions ${fnOf(s).length ? fnOf(s).join(', ') : 'aucune'} ; classe \`${e.linguistic.grammatical_class}\`.${e.senses.length > 1 ? ` Autres sens : ${e.senses.filter((x) => x.id !== c.id).map((x) => `« ${x.meaning.primary} » (\`${cat(x.category)}\`, \`${x.semantic_type}\`)`).join(' ; ')}.` : ''}`);
    P(`- **Justification historique** : ${d.id.replace('A2-04-', '')} (lot ${d.lot.replace('lot-', '')}) : « ${strip(d.reason)} »`);
    P(`- **Normes appliquées** : ${v.n.map(norm).join(' ')}`);
    P(`- **Comparables examinés** : ${v.c}`);
    P(`- **Verdict${c.id === 'v_265_s2' ? ' arbitré (proposé : C)' : ''}** : **${v.v}**.`);
    P(`- **Motivation** : ${v.m}`);
    if (v.k) P(`- **Correction proposée** : ${v.k}`);
    if (v.r) P(`- **Réserve** : ${v.r}`);
    P();
  }
}
P('## T3.6 Complétude');
P();
P(`Contrôle par script : les 29 sens de cette tranche portent chacun un avertissement \`categorie-nulle\` de l'inventaire, ont chacun exactement une décision de journal de cette nature, et aucun ne figure dans les 26 \`categorie-nulle\` déjà arbitrés. L = ${tot.L}, F = ${tot.F}, C = ${tot.C}, N = ${tot.N} ; total 29. Avec les tranches précédentes : 82 fiches arbitrées sur 147.`);
writeFileSync(outFile, md);
console.log(`tranche 3 écrite : L=${tot.L} F=${tot.F} C=${tot.C} N=${tot.N} ; réserves ${cases.filter((c) => c.v.r).length} ; ${md.split('\n').length} lignes`);
