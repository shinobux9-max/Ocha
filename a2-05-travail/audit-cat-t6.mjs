// A2-05 · volet 2 · categorie-nulle, sixième et dernière tranche (11 cas, « autre formulation »),
// et contrôle de clôture du volet 2 (147 avertissements).
// Lecture seule sur les données ; les verdicts sont dans audit-cat-t6.json.
// Usage : node audit-cat-t6.mjs <racine du dépôt> <rapport.md à compléter>
// Relançable : une « Tranche 7 » déjà présente dans le rapport est remplacée.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [root, outFile] = process.argv.slice(2);
const here = dirname(fileURLToPath(import.meta.url));
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const journal = read('reconstruction/a2-04/journal.json');
const known = read('reconstruction/a2-04/avertissements-connus.json');
const V = JSON.parse(readFileSync(join(here, 'audit-cat-t6.json'), 'utf8'));
const ARBITRE = process.argv.includes('--arbitre');
const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/<\/?[A-Za-z]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fnOf = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse];
const senseOf = (id) => { const e = vocab.find((x) => x.senses.some((s) => s.id === id)); return { e, s: e.senses.find((x) => x.id === id) }; };

const N = {
  A5: 'A5, §2 : `category: null` est permis « lorsqu\'aucune catégorie sémantique primaire suffisamment pertinente n\'existe » ; pour un sens lexical plein, « ce n\'est jamais une valeur par défaut ni un fourre-tout ».',
  AFF: 'Fondement vérifié sur la fiche : l\'arbre d\'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7) ; la formule de la raison n\'est pas tenue pour une preuve.',
  G10: 'A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».',
  L3r1: 'A2-L3-v1, §7, règle 1 : « concept ≠ contexte d\'usage ».',
  L3r5: 'A2-L3-v1, §7, règle 5 : « un objet fonctionnel spécialisé suit son domaine fonctionnel, pas une racine "Objets" ».',
  L3r6: 'A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».',
  L3jeux: 'A2-L3-v1, §5 : « Loisirs ; Jeux ; … Activités récréatives » (Loisirs & jeux) ; « Pratique sportive ; Disciplines sportives » (Sports).',
  L3vue: 'A2-L3-v1, §5, Être humain : « Sens & perception → Vue ; Ouïe ; Odorat ; Goût ; Toucher & sensations » ; « Apparence & présentation personnelle → Apparence physique ; Coiffure & pilosité ; Présentation personnelle ».',
  L3cap: 'A2-L3-v1, §5, Être humain : « Capacités & aptitudes → Aptitude ; Habileté ; Incapacité ».',
  L3conf: 'A2-L3-v1, §5, Relations sociales : « Amitié & relations interpersonnelles → Amitié ; Connaissance ; Voisinage ; Conflit ; Réconciliation ».',
  L3tot: 'A2-L3-v1, §5, Nombres & quantification : « Totalité & partie → Totalité ; Partie ; Majorité / minorité ; Reste » ; « Proportions → Fraction ; Pourcentage ; Rapport ».',
  L3fin: 'A2-L3-v1, §5 : « Chronologie → Avant / après ; Début / fin ; Succession » (Temps) ; « Fabrication → Assemblage ; Usinage ; Fabrication » (Production & industrie).',
  STca: 'A2-ST-v1, §3 : « Concept abstrait : concept non matériel qui ne relève pas plus précisément d\'un autre Semantic Type. Ce type ne doit jamais devenir une catégorie de secours. »',
  ST4b: 'A2-ST-v1, §4 : identité / différence, possibilité, nécessité et mesure « ne doivent pas être ajoutés à `semantic_type` simplement pour classifier un mot difficile ».',
  STres: 'A2-ST-v1, §3 : « Résultat : entité ou état conceptualisé principalement comme l\'aboutissement d\'une action, d\'un processus ou d\'un événement » ; « Événement : occurrence conceptualisée comme quelque chose qui survient » ; « État : condition dans laquelle se trouve momentanément ou contextuellement une entité ».',
  DIM16: 'Doctrine du lot 16 : un axe d\'A2-DIM est employé lorsqu\'il décrit directement le sens, et seulement alors.',
  DIM5b: 'A2-DIM-v1, §5 : « réussite/échec » et « accomplissement » sont des familles « non promues à ce stade ».',
  DIMmod: 'A2-DIM-v1, §2 et §3 : « Modalité conceptuelle → Possibilité ↔ Impossibilité ; Nécessité ↔ Facultativité ; Probabilité ; Certitude ↔ Incertitude » ; « modalité conceptuelle ≠ modalité grammaticale ».',
  A9_36: 'A9, §3.6 : l\'`intensifieur` modifie le degré d\'une propriété exprimée par un autre mot, « sans désigner lui-même la propriété, l\'état ou l\'action modifiés ».',
  Q4: 'Périmètre du volet 2, Q4 : si L peut être établi indépendamment d\'une fonction non définie, le cas est classé normalement, et le chantier normatif de la fonction est référencé à part.'
};
const G44 = (el) => `A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « ${el} » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».`;
const norm = (k) => {
  if (!k.startsWith('@')) return k;
  if (k.startsWith('@G44:')) return G44(k.slice(5));
  if (!N[k.slice(1)]) throw new Error(`norme inconnue : ${k}`);
  return N[k.slice(1)];
};

const FAM = { A: 'A · L\'action la plus générale', B: 'B · Appréciations et propriétés', C: 'C · Notions générales de type `concept_abstrait`', D: 'D · L\'objet générique', E: 'E · Cas singuliers' };
const PERIMETRE = ['v_181_s1', 'v_424_s1', 'v_458_s1', 'v_506_s2', 'v_511_s1', 'v_521_s1', 'v_523_s2', 'v_605_s1', 'v_608_s1', 'v_664_s2', 'v_684_s1'];
const BUCKETS = [/personne g[ée]n[ée]rique/i, /propri[ée]t[ée] (physique )?g[ée]n[ée]rale/i, /[ée]valuation/i, /action g[ée]n[ée]rale/i, /[ée]tat g[ée]n[ée]ral/i, /[ée]v[ée]nement g[ée]n[ée]ral|processus g[ée]n[ée]ral|ph[ée]nom[èe]ne physique g[ée]n[ée]ral/i, /plusieurs domaines|d[ée]borde|aussi sur|autant que|couvre/i, /aucune cat[ée]gorie|ne nomme|n'a pas de cat[ée]gorie|ne range nulle part/i];
const ids = Object.keys(V);
const same = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
if (!same(ids, PERIMETRE)) throw new Error('les fiches ne sont pas exactement le périmètre validé');
const decOf = (id, kind = 'categorie-nulle', champ = 'category') => {
  const { e } = senseOf(id);
  return journal.filter((x) => x.entry === `n5_v_${e.id.slice(2)}` && x.kind === kind && x.field === `sens ${Number(id.split('_s')[1])} · ${champ}`);
};
const cases = ids.map((id) => {
  const { e, s } = senseOf(id);
  const ds = decOf(id);
  if (!known.some((w) => w.code === 'categorie-nulle' && w.where.endsWith(` ${id}`))) throw new Error(`pas un categorie-nulle : ${id}`);
  if (ds.length !== 1 || ds[0].status !== 'validated') throw new Error(`décision introuvable, multiple ou non validée : ${id}`);
  if (BUCKETS.some((re) => re.test(ds[0].reason))) throw new Error(`formule d'une famille déjà traitée : ${id}`);
  if (s.category !== null) throw new Error(`catégorie non nulle : ${id}`);
  if (!FAM[V[id].f] || !V[id].b) throw new Error(`groupe ou fondement manquant : ${id}`);
  const srcId = `n5_v_${e.id.slice(2)}`;
  return { id, e, s, num: Number(id.split('_s')[1]), srcId, f: sources.get(srcId), d: ds[0], v: V[id] };
});
const tot = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, cases.filter((c) => c.v.v === k).length]));
if (cases.length !== 11 || new Set(ids).size !== 11 || tot.L + tot.F + tot.C + tot.N !== 11) throw new Error('11 cas attendus');
for (const c of cases) if ((c.v.v === 'C' || c.v.v === 'F') !== Boolean(c.v.k)) throw new Error(`correction incohérente avec le verdict : ${c.id}`);

// ── état du rapport avant cette tranche ────────────────────────────────────
const MARK = '\n---\n\n# Tranche 7 ·';
let md = readFileSync(outFile, 'utf8');
if (md.includes(MARK)) md = md.slice(0, md.indexOf(MARK));
md = md.replace(/\n+$/, '\n');
const RE = /^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm;
const [avantT2, ...apres] = md.split('\n# Tranche 2 ·');
const fichesType = [...avantT2.matchAll(RE)].map((m) => ({ id: m[1], v: m[2], code: 'type-nul' }));
const fichesCat = [...apres.join('\n# Tranche 2 ·').matchAll(RE)].map((m) => ({ id: m[1], v: m[2], code: 'categorie-nulle' }));
const dejaCat = new Set(fichesCat.map((f) => f.id));
if (ids.some((id) => dejaCat.has(id))) throw new Error('fiche déjà présente');
const allCat = known.filter((w) => w.code === 'categorie-nulle').map((w) => w.where.split(' · ')[2]);
const restants = allCat.filter((id) => !dejaCat.has(id));

// ── contrôle de clôture : les 147 avertissements ───────────────────────────
// Verdicts arbitrés avant cette tranche : tout ce qui n'est pas listé ici est L.
const NON_L = { 'type-nul': { v_65_s2: 'C', v_696_s1: 'C', v_500_s2: 'F' }, 'categorie-nulle': { v_500_s2: 'F', v_606_s1: 'C', v_687_s1: 'C', v_528_s1: 'C', v_671_s1: 'C', v_287_s1: 'C', v_500_s1: 'C', v_503_s1: 'C' } };
const anterieures = [...fichesType, ...fichesCat];
const ecarts = anterieures.filter((f) => f.v !== (NON_L[f.code][f.id] ?? 'L'));
const toutes = [...anterieures, ...cases.map((c) => ({ id: c.id, v: c.v.v, code: 'categorie-nulle' }))];
const cle = (f) => `${f.code} · ${f.id}`;
const inventaire = known.filter((w) => w.code === 'categorie-nulle' || w.code === 'type-nul').map((w) => `${w.code} · ${w.where.split(' · ')[2]}`);
const clesFiches = toutes.map(cle);
const doublons = clesFiches.filter((k, i) => clesFiches.indexOf(k) !== i);
const sansFiche = inventaire.filter((k) => !clesFiches.includes(k));
const enTrop = clesFiches.filter((k) => !inventaire.includes(k));
const cumul = (l, k) => l.filter((f) => f.v === k).length;
const cloture = {
  inventaireTotal: known.length, autres: known.filter((w) => w.code !== 'categorie-nulle' && w.code !== 'type-nul').map((w) => w.code),
  categorieNulle: inventaire.filter((k) => k.startsWith('categorie')).length, typeNul: inventaire.filter((k) => k.startsWith('type')).length,
  fiches: toutes.length, fichesCat: toutes.filter((f) => f.code === 'categorie-nulle').length, fichesType: toutes.filter((f) => f.code === 'type-nul').length,
  doublons: doublons.length, sansFiche: sansFiche.length, enTrop: enTrop.length, ecartsAnterieurs: ecarts.length,
  avant: { L: cumul(anterieures, 'L'), F: cumul(anterieures, 'F'), C: cumul(anterieures, 'C'), N: cumul(anterieures, 'N') },
  total: { L: cumul(toutes, 'L'), F: cumul(toutes, 'F'), C: cumul(toutes, 'C'), N: cumul(toutes, 'N') },
  sensDistincts: new Set(toutes.map((f) => f.id)).size
};
if (cloture.inventaireTotal !== 148 || cloture.categorieNulle !== 120 || cloture.typeNul !== 27 || cloture.fiches !== 147 || cloture.fichesCat !== 120 || cloture.fichesType !== 27
  || cloture.doublons || cloture.sansFiche || cloture.enTrop || cloture.ecartsAnterieurs || restants.length !== 11 || !same(restants, PERIMETRE)
  || cloture.avant.L !== 125 || cloture.avant.F !== 2 || cloture.avant.C !== 9 || cloture.avant.N !== 0
  || cloture.total.L + cloture.total.F + cloture.total.C + cloture.total.N !== 147 || cloture.sensDistincts !== 144) throw new Error(`contrôle de clôture : ${JSON.stringify(cloture)}`);

// ── liste consolidée des modifications retenues ou proposées ───────────────
const registre = JSON.stringify(read('data/registries/categories.json'));
const MODS = [
  { id: 'v_500_s2', cl: 'F', champ: 'linguistic_functions.pragmatic_discourse', de: '[]', vers: '["connecteur"]', cesse: ['type-nul', 'categorie-nulle'], tr: 'tranches 1 et 2' },
  { id: 'v_65_s2', cl: 'C', champ: 'semantic_type', de: 'null', vers: 'propriete', cesse: ['type-nul'], tr: 'tranche 1' },
  { id: 'v_696_s1', cl: 'C', champ: 'semantic_type', de: 'null', vers: 'lieu', cesse: ['type-nul'], tr: 'tranche 1' },
  { id: 'v_606_s1', cl: 'C', champ: 'category', de: 'null', vers: 'nombres_quantification › totalite_partie › totalite', cesse: ['categorie-nulle'], tr: 'tranche 2' },
  { id: 'v_687_s1', cl: 'C', champ: 'category', de: 'null', vers: 'nombres_quantification › totalite_partie › totalite', cesse: ['categorie-nulle'], tr: 'tranche 2' },
  { id: 'v_528_s1', cl: 'C', champ: 'category', de: 'null', vers: 'espace_proprietes_spatiales › position_localisation', cesse: ['categorie-nulle'], tr: 'tranche 4' },
  { id: 'v_671_s1', cl: 'C', champ: 'category', de: 'null', vers: 'temps', cesse: ['categorie-nulle'], tr: 'tranche 6' },
  { id: 'v_287_s1', cl: 'C', champ: 'category', de: 'null', vers: 'temps › calendrier', cesse: ['categorie-nulle'], tr: 'tranche 6' },
  { id: 'v_500_s1', cl: 'C', champ: 'category', de: 'null', vers: 'temps › chronologie › succession', cesse: ['categorie-nulle'], tr: 'tranche 6' },
  { id: 'v_503_s1', cl: 'C', champ: 'category', de: 'null', vers: 'temps › chronologie › succession', cesse: ['categorie-nulle'], tr: 'tranche 6' }
];
for (const m of MODS) {
  const { s } = senseOf(m.id);
  if (m.champ === 'category') { if (s.category !== null) throw new Error(`déjà catégorisé : ${m.id}`); for (const seg of m.vers.split(' › ')) if (!registre.includes(`"id":"${seg}"`)) throw new Error(`catégorie absente du registre : ${seg}`); }
  if (m.champ === 'semantic_type' && s.semantic_type !== null) throw new Error(`déjà typé : ${m.id}`);
  for (const code of m.cesse) { const f = toutes.find((x) => x.id === m.id && x.code === code); if (!f || f.v !== m.cl) throw new Error(`modification sans verdict ${m.cl} : ${m.id} ${code}`); }
}
const nonL = toutes.filter((f) => f.v !== 'L');
const couverts = MODS.flatMap((m) => m.cesse.map((c) => `${c} · ${m.id}`));
if (!same(nonL.map(cle), couverts)) throw new Error('les verdicts F et C ne correspondent pas à la liste des modifications');
const lotDe = (id) => { const { e } = senseOf(id); return journal.find((x) => x.entry === `n5_v_${e.id.slice(2)}` && /categorie-nulle|type-nul/.test(x.kind)).lot.replace('lot-', ''); };
const entrees = new Set(MODS.map((m) => senseOf(m.id).e.id));
const lots = [...new Set(MODS.map((m) => lotDe(m.id)))].sort();
const cesseCat = couverts.filter((k) => k.startsWith('categorie')).length;
const cesseType = couverts.filter((k) => k.startsWith('type')).length;

const P = (t = '') => { md += `${t}\n`; };
const list = (l) => l.map((c) => `\`${c.id}\` ${c.e.word}`).join(' ; ') || '—';
P();
P('---');
P();
P('# Tranche 7 · `categorie-nulle`, sixième et dernière tranche : 11 cas, et clôture du volet 2');
P();
if (ARBITRE) P('**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation), validée telle que proposée : L = 11, F = 0, C = 0, N = 0. 他 « Autre » est confirmé L (l\'altérité, hors hiérarchie ; « Le reste » ne suffit pas à imposer la catégorie de 後, sens 3) ; 出来る, sens 2, est confirmé L (`semantic_type: resultat`, rare mais conforme à la définition normative) ; たぶん est confirmé L (dimension `probabilite` maintenue, `type-nul` non rouvert) ; する et やる sont confirmés L, ainsi que les sept autres. **Le volet 2 est entièrement arbitré : 147 cas sur 147, L = 136, F = 2, C = 9, N = 0.** Dix modifications de SENSE sont retenues, **toutes non appliquées**. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n\'est modifié ; aucune décision historique n\'est réécrite.');
else P('**Statut** : **proposition, non arbitrée.** Périmètre validé le 2026-10-08 (ChatGPT, par délégation) : la famille « autre formulation », 11 SENSE, les derniers `categorie-nulle`. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n\'est modifié ; aucune correction n\'est appliquée ; aucune décision historique n\'est réécrite.');
P('**Avec cette tranche, les 147 avertissements de l\'inventaire ont chacun leur fiche d\'audit** : le contrôle de clôture est en T7.8.');
P();
P('## T7.1 Résultat de la tranche');
P();
P('| Classement | Cas | Sens |');
P('|---|---|---|');
for (const k of ['L', 'F', 'C', 'N']) P(`| **${k}** | ${tot[k]} | ${list(cases.filter((c) => c.v.v === k))} |`);
P('| **Total** | 11 | L + F + C + N = 11 |');
P();
P(ARBITRE
  ? `**Bilan définitif des verdicts du volet 2** : 27 \`type-nul\` (L = 24, F = 1, C = 2) et 120 \`categorie-nulle\` (L = ${101 + tot.L}, F = 1, C = 7), soit **147 cas arbitrés sur 147 : L = ${125 + tot.L}, F = 2, C = 9, N = 0**.`
  : `**Cumul du volet 2 à ce stade** : 136 cas arbitrés (L = 125, F = 2, C = 9, N = 0) et 11 proposés (L = ${tot.L}, F = ${tot.F}, C = ${tot.C}, N = ${tot.N}), soit **147 cas sur 147**.`);
P();
P(`- **${cases.filter((c) => c.v.k).length ? 'Des modifications sont proposées' : 'Aucune modification n\'est proposée'}** dans cette tranche. La liste des corrections du volet 2 reste à dix modifications de SENSE, toutes non appliquées (T7.8).`);
P('- **Aucun N**, dans cette tranche comme dans tout le volet.');
P(`- **${cases.filter((c) => c.v.r).length} fiches portent une réserve** : ${list(cases.filter((c) => c.v.r))} (T7.5). Une seule nomme le classement que le cas prendrait si l\'arbitrage en décidait autrement : 他 (C possible, « Reste »).`);
P('- **Les huit chevauchements avec le volet 1 sont traités dans les fiches** (T7.4), types, dimensions et fonctions vérifiés indépendamment.');
P();
P('## T7.2 Composition et méthode');
P();
P('La tranche réunit les 11 derniers `categorie-nulle`. C\'est une famille résiduelle : ses raisons n\'emploient aucune des formules des familles déjà traitées. Elle n\'a donc pas d\'unité, et **l\'audit a commencé, pour chaque sens, par identifier le fondement réel du `null`**, au lieu de reprendre la justification historique.');
P();
P('Pour chaque cas, individuellement : fiche source entière (traductions, nuance, exemple, anciens exemples) ; sens publié, nuance publiée et autres sens de l\'ENTRY ; décision `categorie-nulle` et décisions voisines, celles du lot 26 comprises ; A5, A2-L3-v1 (§2, §5 à §7), A2-GLOBAL-v1 (§4.3, §4.4, §10, §11), A2-ST-v1, A2-DIM-v1 et A9 selon le cas ; sens comparables publiés, dans la tranche et hors d\'elle.');
P();
P('**Comparables lus sans être audités** (catégorisés, hors des 147) : 上げる, 遊ぶ, スポーツ, 上手, かわいい, うるさい sens 1, 終わる, 始まる, 後 sens 3, 半, 半分, 全部, 所 sens 1, 出来る sens 1, 問題 sens 2. **Aucun ne reçoit de verdict ici.**');
P();
P('## T7.3 Le fondement réel de chaque `null`');
P();
P('| Sens | Formule de la raison historique | Fondement réel, vérifié sur la fiche |');
P('|---|---|---|');
const FORMULE = { v_181_s1: '« action la plus générale »', v_608_s1: '« action la plus générale […] comme する »', v_424_s1: '« appréciation esthétique générale »', v_458_s1: '« caractéristique générale »', v_506_s2: '« aucun domaine thématique propre, comme […] いい »', v_511_s1: '« notion générale »', v_605_s1: '« notion générale »', v_664_s2: '« notion générale »', v_684_s1: '« nom générique »', v_521_s1: '« une estimation du locuteur, sans domaine thématique »', v_523_s2: '« résultat général »' };
for (const c of cases) P(`| \`${c.id}\` ${c.e.word} « ${c.s.meaning.primary} » | ${FORMULE[c.id]} | ${c.v.b} |`);
P();
P('**Ce que le tableau montre.** Huit de ces onze sens relèvent d\'un élément que l\'architecture nomme elle-même hors hiérarchie (A2-L3 §6) : l\'action générique (する, やる), la propriété générale (きれい, 有名, よく), l\'objet générique (物), l\'identité et la différence (他), la possibilité et la nécessité (たぶん). Pour ceux-là, la raison historique disait juste, avec d\'autres mots. Les trois autres (問題, 所, 出来る) tiennent par l\'absence de toute catégorie décrivant le sens ; « notion générale » et « résultat général » ne sont pas des éléments de la liste, et n\'ont pas servi de preuve.');
P();
P('## T7.4 Points examinés à la demande de l\'arbitrage');
P();
P('**出来る, sens 2 : le type `resultat`.** Il ne se trouve sur aucun autre des 145 sens de verbes publiés (C3-c). Vérifié contre A2-ST : « entité ou état conceptualisé principalement comme l\'aboutissement d\'une action, d\'un processus ou d\'un événement ». « Être achevé, prêt » y répond exactement, mieux qu\'`evenement` (rien ne survient) ou qu\'`etat` (qui ne dirait pas l\'aboutissement). Le couple est rare, non fautif ; il vient d\'un choix arbitré au lot 20. Aucun changement n\'est proposé.');
P();
P('**たぶん : la dimension `probabilite`.** A2-DIM a un axe « Probabilité », à pôle unique, dans la modalité conceptuelle ; la fiche dit « une probabilité ou une supposition ». L\'axe décrit directement le sens, et il est le seul à le faire. Le `type-nul` de ce sens, arbitré L, n\'est pas rouvert. La fonction `modalite` reste sans définition normative ; le verdict n\'en dépend pas.');
P();
P('**する et やる : la cohérence.** Les deux sens « Faire » ont le même type (`action`), la même absence de catégorie et le même fondement (l\'action générique) ; ils sont reliés par `equivalent_to`, notée une fois, sur する. Ce qui les distingue, le registre familier de やる et son emploi pour une activité ou un jeu, est en nuance. Aucun écart.');
P();
P('**Les huit chevauchements avec le volet 1.**');
P();
P('| Sens | Relevé du criblage | Ce qu\'il en reste |');
P('|---|---|---|');
P('| する, やる sens 1 | C10-a : la raison renvoie la relation à la passe finale | soldé : `equivalent_to` (D1585) et `similar_to` (D1587) sont publiées |');
P('| よく, sens 2 | C7-c : « bien », fonction `intensifieur` non examinée | le mot désigne lui-même la qualité de l\'action ; aucune fonction |');
P('| 問題, sens 1 | C3-0 : `concept_abstrait` | type propre : ni information, ni état, ni événement |');
P('| 他 | C3-0 : `concept_abstrait` | tenable : le type dit la nature abstraite du référent, non la relation |');
P('| 他 | C10-a : D1428 refuse `alternative` faute de définition | fonction toujours non définie ; le verdict n\'en dépend pas (Q4) |');
P('| 所, sens 2 | C3-0 : `concept_abstrait` | type propre : un point d\'une chose n\'est plus un `lieu` |');
P('| たぶん | C5-0 : dimension `probabilite` posée | l\'axe décrit directement le sens |');
P('| たぶん | C10-a : D1434 refuse `modalite` faute de définition | fonction toujours non définie ; le verdict n\'en dépend pas (Q4) |');
P('| 出来る, sens 2 | C3-c : verbe de type `resultat` | conforme à la définition d\'A2-ST ; rare, non fautif |');
P();
P('**Aucun verdict n\'est donné aux sens hors tranche.**');
P();
P('## T7.5 Réserves, divergences et modifications');
P();
P('### Modifications proposées');
P();
P(cases.some((c) => c.v.k) ? cases.filter((c) => c.v.k).map((c) => `- \`${c.id}\` ${c.e.word} : ${c.v.k}`).join('\n') : '**Aucune.**');
P();
P('### Divergences relevées (2), sans verdict sur les comparables');
P();
P('1. **他 et 後, sens 3.** « Le reste » porte la catégorie totalité et partie › reste comme sens de 後, et n\'est qu\'une traduction, sans catégorie, pour 他. Proposé L pour 他 : sa fiche dit l\'altérité, non la part d\'un tout.');
P('2. **Le type des adverbes de manière** (déjà au suivi transversal) : よく sens 2 et ゆっくり sont `propriete`, だんだん `concept_abstrait`.');
P();
P('### Réserves, fiche par fiche');
P();
for (const c of cases.filter((x) => x.v.r)) P(`- \`${c.id}\` ${c.e.word} « ${c.s.meaning.primary} » (**${c.v.v}**) : ${c.v.r}`);
P();
P('## T7.6 Les 11 fiches d\'audit');
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
    P(`- **État publié** : sens ${c.num} sur ${e.senses.length} ; traduction « ${s.meaning.primary} »${s.meaning.alternatives?.length ? ` (${s.meaning.alternatives.join(', ')})` : ''} ; catégorie \`null\` ; type \`${s.semantic_type}\` ; dimensions ${s.dimensions.length ? s.dimensions.map((x) => `\`${x.axis}:${x.pole}\``).join(', ') : 'aucune'} ; fonctions ${fnOf(s).length ? fnOf(s).join(', ') : 'aucune'} ; relations ${s.relations?.length ? s.relations.map((x) => `\`${x.type}\` → \`${x.target}\``).join(', ') : 'aucune'} ; classe \`${e.linguistic.grammatical_class}\`.${e.senses.length > 1 ? ` Autres sens : ${e.senses.filter((x) => x.id !== c.id).map((x) => `« ${x.meaning.primary} » (\`${cat(x.category)}\`, \`${x.semantic_type}\`)`).join(' ; ')}.` : ''}`);
    P(`- **Justification historique** : ${d.id.replace('A2-04-', '')} (lot ${d.lot.replace('lot-', '')}) : « ${strip(d.reason)} »`);
    P(`- **Fondement réel** : ${v.b}.`);
    P(`- **Normes appliquées** : ${v.n.map(norm).join(' ')}`);
    P(`- **Comparables examinés** : ${v.c}`);
    P(`- **Verdict${ARBITRE ? '' : ' proposé'}** : **${v.v}**.`);
    P(`- **Motivation** : ${v.m}`);
    if (v.k) P(`- **Modification proposée** : ${v.k}`);
    if (v.r) P(`- **Réserve** : ${v.r}`);
    P();
  }
}
P('## T7.7 Complétude de la tranche : contrôles reproductibles');
P();
P('Calculés par `a2-05-travail/audit-cat-t6.mjs`, qui écrit cette tranche et le contrôle de clôture. Le script s\'arrête si l\'un d\'eux échoue. Commande : `node a2-05-travail/audit-cat-t6.mjs . docs/rapports/etape2-A2-05-audit-null.md`.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P('| Les 11 identifiants des fiches sont exactement ceux du périmètre validé | oui, 11 distincts |');
P('| Chacun porte un avertissement `categorie-nulle` de l\'inventaire | oui |');
P('| Chacun a exactement une décision de journal `categorie-nulle`, `validated`, sur ce sens | oui |');
P('| Aucune raison ne contient une formule des familles déjà traitées | oui |');
P('| Chaque sens a bien `category: null` dans les données publiées | oui |');
P(`| Aucun ne figure parmi les ${dejaCat.size} \`categorie-nulle\` déjà arbitrés ; les 11 sont exactement les restants | oui |`);
P('| Chaque fiche porte un fondement réel, distinct de la formule historique | oui, 11 |');
P(`| Verdicts de la tranche | L = ${tot.L}, F = ${tot.F}, C = ${tot.C}, N = ${tot.N} ; total 11 |`);
P('| Un verdict C ou F a une modification proposée, et seulement lui | oui |');
P();
P('## T7.8 Contrôle de clôture du volet 2');
P();
P('Calculé par le même script, sur `reconstruction/a2-04/avertissements-connus.json` et sur les fiches de ce rapport (titres de niveau 4 portant un identifiant de SENSE et un verdict). **Aucune donnée n\'est lue pour être modifiée.**');
P();
P('### 1. Une fiche, et une seule, par avertissement');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Avertissements de l\'inventaire | ${cloture.inventaireTotal} : ${cloture.categorieNulle} \`categorie-nulle\`, ${cloture.typeNul} \`type-nul\`, et ${cloture.autres.length} autre (\`${cloture.autres.join('`, `')}\`, hors du volet 2) |`);
P(`| Fiches d\'audit au rapport | ${cloture.fiches} : ${cloture.fichesCat} \`categorie-nulle\`, ${cloture.fichesType} \`type-nul\` |`);
P(`| Avertissements sans fiche | ${cloture.sansFiche} |`);
P(`| Fiches sans avertissement dans l\'inventaire (aucun avertissement supplémentaire) | ${cloture.enTrop} |`);
P(`| Couples \`{ code, SENSE }\` portant deux fiches | ${cloture.doublons} |`);
P(`| SENSE distincts concernés | ${cloture.sensDistincts} (trois portent les deux avertissements : \`v_500_s2\`, \`v_521_s1\`, \`v_653_s1\`) |`);
P();
P('### 2. Un verdict unique par fiche, et la somme');
P();
P('| | L | F | C | N | Total |');
P('|---|---|---|---|---|---|');
const ligne = (nom, l) => P(`| ${nom} | ${cumul(l, 'L')} | ${cumul(l, 'F')} | ${cumul(l, 'C')} | ${cumul(l, 'N')} | ${l.length} |`);
ligne('27 `type-nul`', toutes.filter((f) => f.code === 'type-nul'));
ligne('120 `categorie-nulle`', toutes.filter((f) => f.code === 'categorie-nulle'));
ligne('**Volet 2**', toutes);
P();
P(`Chaque fiche porte un verdict et un seul, dans son titre. **L + F + C + N = ${cloture.total.L} + ${cloture.total.F} + ${cloture.total.C} + ${cloture.total.N} = ${toutes.length}.** ${ARBITRE ? '' : 'Les 11 verdicts de cette tranche sont des propositions : le total devient définitif à leur arbitrage. '}**N = 0** : aucun cas n\'a requis de chantier normatif.`);
P();
P('### 3. Les verdicts antérieurement arbitrés sont conservés');
P();
P(`Les ${anterieures.length} fiches des tranches 1 à 6 ont été recomptées et comparées, une à une, à la table des verdicts arbitrés que porte le script (les onze fiches non L, toutes les autres L) : **${cloture.ecartsAnterieurs} écart**. Cumul retrouvé : L = ${cloture.avant.L}, F = ${cloture.avant.F}, C = ${cloture.avant.C}, N = ${cloture.avant.N}. Le texte du rapport antérieur à cette tranche n\'est pas touché par le script, qui ne fait qu\'ajouter.`);
P();
P('### 4. Liste consolidée des modifications retenues');
P();
P('| # | SENSE | Mot | Lot | Classement | Champ | De | Vers | Avertissements qui cesseraient | Arbitrée à la |');
P('|---|---|---|---|---|---|---|---|---|---|');
MODS.forEach((m, i) => { const { e, s } = senseOf(m.id); P(`| ${i + 1} | \`${m.id}\` | ${e.word} « ${s.meaning.primary} » | ${lotDe(m.id)} | ${m.cl} | \`${m.champ}\` | \`${m.de}\` | \`${m.vers}\` | ${m.cesse.map((c) => `\`${c}\``).join(' et ')} | ${m.tr} |`); });
P();
P('**Avertissements corrigés et SENSE modifiés ne sont pas le même compte :**');
P();
P('| Mesure | Nombre |');
P('|---|---|');
P(`| Verdicts F ou C (un par avertissement) | ${nonL.length} : ${cumul(toutes, 'F')} F et ${cumul(toutes, 'C')} C |`);
P(`| **Avertissements qui cesseraient** | **${couverts.length}** : ${cesseCat} \`categorie-nulle\` et ${cesseType} \`type-nul\` |`);
P(`| **SENSE réellement modifiés** | **${MODS.length}** (\`v_500_s2\` porte deux avertissements pour une seule modification) |`);
P(`| ENTRY à rouvrir | ${entrees.size} (また porte deux modifications, une par sens) |`);
P(`| Lots d\'origine concernés | ${lots.length} : ${lots.join(', ')} |`);
P(`| Avertissements \`categorie-nulle\` et \`type-nul\` qui resteraient émis | ${147 - couverts.length} : ${120 - cesseCat} \`categorie-nulle\` et ${27 - cesseType} \`type-nul\`, tous classés L |`);
P();
P('Les deux F sont le même SENSE (`v_500_s2`) : la fonction `connecteur` y justifie directement l\'absence de catégorie et de type, et les deux avertissements cesseraient sans que les `null` changent. Chaque catégorie proposée existe dans `data/registries/categories.json` ; chaque champ visé est bien `null` ou vide dans les données publiées. **Aucune de ces modifications n\'est appliquée** : ni lot, ni journal, ni donnée, ni inventaire n\'est touché, et aucune décision historique n\'est réécrite.');
writeFileSync(outFile, md);
console.log(`tranche 7 écrite : L=${tot.L} F=${tot.F} C=${tot.C} N=${tot.N} ; réserves ${cases.filter((c) => c.v.r).length} ; ${md.split('\n').length} lignes`);
console.log(`clôture ${JSON.stringify(cloture)}`);
console.log(`modifications : ${MODS.length} SENSE, ${couverts.length} avertissements (${cesseCat} categorie-nulle, ${cesseType} type-nul), ${entrees.size} ENTRY, lots ${lots.join(',')}`);
