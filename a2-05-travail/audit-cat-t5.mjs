// A2-05 · volet 2 · categorie-nulle, cinquième tranche (18 cas, « aucune catégorie ne nomme la notion »).
// Lecture seule sur les données ; les verdicts sont dans audit-cat-t5.json.
// Usage : node audit-cat-t5.mjs <racine du dépôt> <rapport.md à compléter>
// Relançable : une « Tranche 6 » déjà présente dans le rapport est remplacée.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [root, outFile] = process.argv.slice(2);
const here = dirname(fileURLToPath(import.meta.url));
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const vocab = read('data/n5/vocab.json');
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const journal = read('reconstruction/a2-04/journal.json');
const known = read('reconstruction/a2-04/avertissements-connus.json');
const V = JSON.parse(readFileSync(join(here, 'audit-cat-t5.json'), 'utf8'));
const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/<\/?[A-Za-z]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fnOf = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse];

const N = {
  A5: 'A5, §2 : `category: null` est permis « lorsqu\'aucune catégorie sémantique primaire suffisamment pertinente n\'existe » ; pour un sens lexical plein, « ce n\'est jamais une valeur par défaut ni un fourre-tout ».',
  AFF: 'Vérification de l\'affirmation d\'absence : l\'arbre d\'A2-L3-v1 (§5) a été relu en entier pour ce sens (A2-L3-v1, §2 et §7, règle 7).',
  G10: 'A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».',
  L3r5: 'A2-L3-v1, §7, règle 5 : « un objet fonctionnel spécialisé suit son domaine fonctionnel, pas une racine "Objets" ».',
  L3r6: 'A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».',
  ST4: 'A2-ST-v1, §5, règles 4 et 5 : « la fonction ou le domaine spécialisé détermine `category` ; la nature de l\'entité détermine `semantic_type` » ; « un objet spécialisé reste Objet / artefact même si sa catégorie est Santé, Alimentation, Technologie ».',
  STca: 'A2-ST-v1, §3 : « Concept abstrait : concept non matériel qui ne relève pas plus précisément d\'un autre Semantic Type. Ce type ne doit jamais devenir une catégorie de secours. »',
  LOT19: 'Doctrine du lot 19 : une catégorie ne s\'impose pas quand la fiche déborde son domaine.',
  L3temps: 'A2-L3-v1, §5, Temps : « Unités temporelles » ; « Moments & périodes » ; « Calendrier → Jours ; Mois ; Années ; Dates » ; « Chronologie → Avant / après ; Début / fin ; Succession » ; « Durée » ; « Fréquence → Fréquent ; Occasionnel ; Rare » ; « Relations temporelles ».',
  L3tabac: 'A2-L3-v1, §5 : « Consommation alimentaire » (Alimentation & cuisine) ; « Accessoires domestiques » (Habitat & vie domestique) ; « Produits agricoles » (Agriculture & élevage) ; « Produits manufacturés » (Production & industrie) ; « Matières naturelles ; Matériaux organiques ; Matériaux manufacturés » (Matières & matériaux).',
  L3voy: 'A2-L3-v1, §5 : « Préparation du voyage » (Voyage & tourisme) ; « Utilisation des transports » (Transport & mobilité) ; « Sacs & contenants personnels → Sacs ; Sacs à dos ; Portefeuilles » (Habillement & accessoires personnels) ; « Communication → Transmission » (Communication & langage).',
  L3etat: 'A2-L3-v1, §5, Être humain : « États & besoins physiques → Sommeil & repos ; Faim & soif ; Fatigue & énergie physique ; Confort & inconfort » ; « Psychologie & esprit → Pensée ; Mémoire ; Attention ; Préférences ; États psychologiques ».',
  L3loisir: 'A2-L3-v1, §5, Loisirs & jeux : « Loisirs » ; « Activités récréatives → Collection ; Promenade de loisir ; Passe-temps ».',
  L3soc: 'A2-L3-v1, §5, Relations sociales : « Interactions sociales » ; « Amitié & relations interpersonnelles » ; « Groupes & appartenance sociale ».',
  L3cycle: 'A2-L3-v1, §5, Être humain : « Cycle de vie → Naissance ; Enfance ; Âge adulte ; Vieillissement ; Mort ».',
  L3son: 'A2-L3-v1, §5 : « Sens & perception → Vue ; Ouïe ; … » (Être humain) ; « Parole & conversation → Parler ; … » (Communication & langage) ; « Musique → Chant ; … » (Arts & création) ; « Animaux » (Monde naturel).',
  DIMreal: 'A2-DIM-v1, §2 et §3 : « Réalité & statut épistémique → Réel ↔ Fictif ; Vrai ↔ Faux ; Évidence ↔ Non-évidence » ; « vérité ≠ réalité ≠ certitude ≠ exactitude ≠ précision ».',
  A9_21: 'A9, §2.1 : un emploi d\'adresse d\'un mot lexical, ou un emploi seulement mentionné en nuance, reste en nuance, sans sens ni fonction.',
  A9_34q: 'A9, §3.4 : le `quantificateur` « quantifie un référent désigné par un autre mot […] en en donnant l\'étendue : beaucoup, peu, un peu, tout ».',
  Q4: 'Périmètre du volet 2, Q4 : si L peut être établi indépendamment d\'une fonction non définie, le cas est classé normalement, et le chantier normatif de la fonction est référencé à part.'
};
const norm = (k) => {
  if (!k.startsWith('@')) return k;
  if (!N[k.slice(1)]) throw new Error(`norme inconnue : ${k}`);
  return N[k.slice(1)];
};

const FAM = {
  A: 'A · Le tabac',
  B: 'B · Objets que la raison écarte d\'un domaine voisin',
  C: 'C · États d\'une personne',
  D: 'D · Répétition et progression',
  E: 'E · Manière et caractère',
  F: 'F · Cas singuliers'
};
const PERIMETRE = ['v_144_s1', 'v_287_s1', 'v_425_s1', 'v_457_s1', 'v_500_s1', 'v_503_s1', 'v_504_s2', 'v_510_s1', 'v_525_s2', 'v_542_s1', 'v_558_s1', 'v_598_s1', 'v_598_s2', 'v_627_s2', 'v_653_s1', 'v_671_s1', 'v_685_s1', 'v_694_s1'];
const BUCKETS = [/personne g[ée]n[ée]rique/i, /propri[ée]t[ée] (physique )?g[ée]n[ée]rale/i, /[ée]valuation/i, /action g[ée]n[ée]rale/i, /[ée]tat g[ée]n[ée]ral/i, /[ée]v[ée]nement g[ée]n[ée]ral|processus g[ée]n[ée]ral|ph[ée]nom[èe]ne physique g[ée]n[ée]ral/i, /plusieurs domaines|d[ée]borde|aussi sur|autant que|couvre/i, /aucune cat[ée]gorie|ne nomme|n'a pas de cat[ée]gorie|ne range nulle part/i];
const ids = Object.keys(V);
const same = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
if (!same(ids, PERIMETRE)) throw new Error('les fiches ne sont pas exactement le périmètre validé');
const decOf = (id) => {
  const e = vocab.find((x) => x.senses.some((s) => s.id === id));
  return journal.filter((x) => x.entry === `n5_v_${e.id.slice(2)}` && x.kind === 'categorie-nulle' && x.field === `sens ${Number(id.split('_s')[1])} · category`);
};
const bucket = (id) => BUCKETS.findIndex((re) => re.test(decOf(id)[0].reason));
const cases = ids.map((id) => {
  const e = vocab.find((x) => x.senses.some((s) => s.id === id));
  const s = e.senses.find((x) => x.id === id);
  const ds = decOf(id);
  if (!known.some((w) => w.code === 'categorie-nulle' && w.where.endsWith(` ${id}`))) throw new Error(`pas un categorie-nulle : ${id}`);
  if (ds.length !== 1) throw new Error(`décision introuvable ou multiple : ${id}`);
  if (ds[0].status !== 'validated') throw new Error(`décision non validée : ${id}`);
  if (bucket(id) !== 7) throw new Error(`hors famille : ${id}`);
  if (s.category !== null) throw new Error(`catégorie non nulle : ${id}`);
  if (!FAM[V[id].f] || !V[id].b) throw new Error(`groupe ou fondement manquant : ${id}`);
  const srcId = `n5_v_${e.id.slice(2)}`;
  return { id, e, s, num: Number(id.split('_s')[1]), srcId, f: sources.get(srcId), d: ds[0], v: V[id] };
});
const tot = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, cases.filter((c) => c.v.v === k).length]));
if (cases.length !== 18 || new Set(ids).size !== 18 || tot.L + tot.F + tot.C + tot.N !== 18) throw new Error('18 cas attendus');
for (const c of cases) if ((c.v.v === 'C' || c.v.v === 'F') !== Boolean(c.v.k)) throw new Error(`correction incohérente avec le verdict : ${c.id}`);
// toute catégorie proposée doit exister dans le registre
const registre = JSON.stringify(read('data/registries/categories.json'));
for (const c of cases.filter((x) => x.v.k)) {
  const chemin = c.v.k.match(/→ `([^`]+)`/)[1].split(' › ');
  for (const seg of chemin) if (!registre.includes(`"id":"${seg}"`)) throw new Error(`catégorie absente du registre : ${seg} (${c.id})`);
}

// preuves d'exhaustivité, calculées et non recopiées
const MARK = '\n---\n\n# Tranche 6 ·';
let md = readFileSync(outFile, 'utf8');
if (md.includes(MARK)) md = md.slice(0, md.indexOf(MARK));
md = md.replace(/\n+$/, '\n');
const allCat = known.filter((w) => w.code === 'categorie-nulle').map((w) => w.where.split(' · ')[2]);
const [avantT2, ...apres] = md.split('\n# Tranche 2 ·');
const fichesCat = [...apres.join('\n# Tranche 2 ·').matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const fichesType = [...avantT2.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const dejaCat = new Set(fichesCat.map((m) => m[1]));
const repris = ids.filter((id) => dejaCat.has(id));
if (repris.length) throw new Error(`déjà audités : ${repris.join(', ')}`);
const restants = allCat.filter((id) => !dejaCat.has(id));
const famille = restants.filter((id) => bucket(id) === 7);
const cumul = (k) => [...fichesCat, ...fichesType].filter((m) => m[2] === k).length;
const preuves = {
  inventaire: allCat.length, dejaCat: dejaCat.size, dejaType: fichesType.length, restants: restants.length, famille: famille.length, identique: same(PERIMETRE, famille),
  reste: restants.length - 18, autreFormulation: restants.filter((id) => bucket(id) === -1).length, cumulAvant: { L: cumul('L'), F: cumul('F'), C: cumul('C'), N: cumul('N') },
  objets: vocab.flatMap((e) => e.senses).filter((s) => s.semantic_type === 'objet_artefact').length,
  objetsSansCategorie: vocab.flatMap((e) => e.senses).filter((s) => s.semantic_type === 'objet_artefact' && !s.category).length
};
if (preuves.inventaire !== 120 || preuves.dejaCat !== 91 || preuves.dejaType !== 27 || preuves.restants !== 29 || preuves.famille !== 18 || !preuves.identique || preuves.reste !== 11 || preuves.autreFormulation !== 11
  || preuves.cumulAvant.L !== 111 || preuves.cumulAvant.F !== 2 || preuves.cumulAvant.C !== 5 || preuves.cumulAvant.N !== 0 || preuves.objets !== 89 || preuves.objetsSansCategorie !== 5) throw new Error(`preuves d'exhaustivité : ${JSON.stringify(preuves)}`);

const P = (t = '') => { md += `${t}\n`; };
const list = (l) => l.map((c) => `\`${c.id}\` ${c.e.word}`).join(' ; ') || '—';
const mods = cases.filter((c) => c.v.k);
P();
P('---');
P();
P('# Tranche 6 · `categorie-nulle`, cinquième tranche : 18 cas');
P();
P('**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation) : L = 14, F = 0, C = 4, N = 0. Les 13 L proposés sont confirmés, ainsi que quatre des cinq C : 時計 (`temps`, niveau 1), カレンダー (`temps › calendrier`), また sens 1 et もう一度 (`temps › chronologie › succession`), les autres champs restant inchangés. Le cinquième C proposé, 一人 sens 2 « Seul », est **reclassé L** et garde `category: null` : la fiche décrit l\'absence de compagnie et non une interaction sociale, et la catégorie de 一緒 ne suffit pas à imposer une symétrie ; la divergence avec 一緒 est conservée comme contrôle transversal du volet 1, sans verdict sur ce comparable. Les quatre modifications retenues rejoignent la liste des corrections du volet 2 ; **aucune n\'est appliquée**, et les justifications historiques ne sont pas réécrites. Périmètre validé le même jour : la famille « aucune catégorie ne nomme la notion », 18 SENSE. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n\'est modifié ; aucune correction n\'est appliquée ; aucune décision historique n\'est réécrite.');
P('**Reste à faire après cette tranche** : 11 `categorie-nulle` (« autre formulation ») ; aucun n\'est commencé.');
P();
P('## T6.1 Résultat de la tranche');
P();
P('| Classement | Cas | Sens |');
P('|---|---|---|');
for (const k of ['L', 'F', 'C', 'N']) P(`| **${k}** | ${tot[k]} | ${list(cases.filter((c) => c.v.v === k))} |`);
P('| **Total** | 18 | L + F + C + N = 18 |');
P();
if (tot.L !== 14 || tot.C !== 4) throw new Error('arbitrage : 14 L et 4 C attendus');
P(`**Cumul arbitré du volet 2** : 27 \`type-nul\` (L = 24, F = 1, C = 2), 91 \`categorie-nulle\` (L = 87, F = 1, C = 3) et ces 18 \`categorie-nulle\` (L = ${tot.L}, C = ${tot.C}), soit **136 cas arbitrés sur 147 : L = ${111 + tot.L}, F = 2, C = ${5 + tot.C}, N = 0**.`);
P();
P(`- **${mods.length} modifications sont retenues** (${list(mods)}) ; aucune n\'est appliquée. La liste des corrections du volet 2 compte désormais dix modifications de SENSE (T6.5).`);
P('- **Aucun N.**');
P(`- **${cases.filter((c) => c.v.r).length} fiches portent une réserve ou une note d\'arbitrage** : ${list(cases.filter((c) => c.v.r))} (T6.5).`);
P('- **Les six chevauchements avec le volet 1 sont traités dans les fiches** (T6.4), type sémantique compris pour les cinq `concept_abstrait`.');
P();
P('## T6.2 Composition et méthode');
P();
P('La tranche est la famille « aucune catégorie ne nomme la notion », prise en entier : 18 sens, cinq classes grammaticales, huit valeurs de `semantic_type` (dont `null`). Ce qui les réunit est l\'affirmation de leur raison : le registre n\'aurait aucune catégorie pour la notion. **L\'audit a consisté à vérifier cette affirmation, sens par sens**, en relisant l\'arbre d\'A2-L3 (§5) en entier et en cherchant, dans les données publiées, comment des sens comparables sont rangés.');
P();
P('Pour chaque cas, individuellement : fiche source entière (traductions, nuance, exemple, anciens exemples) ; sens publié, nuance publiée et autres sens de l\'ENTRY ; décision `categorie-nulle` et décisions voisines ; arbitrages des lots (révision 5.6b, choix des lots 19 à 22) ; A5, A2-L3-v1 (§2, §5 à §7), A2-GLOBAL-v1 (§4.3, §4.4, §10, §11), A2-ST-v1, A2-DIM-v1 et A9 selon le cas ; sens comparables publiés, dans la tranche et hors d\'elle.');
P();
P('**Comparables lus sans être audités** : dans la dernière famille, 物 « Chose », 問題 « Problème », 他 « Autre », よく sens 2 « Bien » ; hors des 147, 初めて, 一緒, 休み, 夏休み, 生まれる, 灰皿, マッチ, ペン, 鉛筆, ノート, 辞書, 切符, 切手, 地図, かばん, 元気, 遊ぶ, 鳴く. **Aucun ne reçoit de verdict ici.**');
P();
P('## T6.3 L\'affirmation d\'absence, vérifiée cas par cas');
P();
P('| Sens | Résultat de la vérification | Verdict |');
P('|---|---|---|');
for (const c of cases) P(`| \`${c.id}\` ${c.e.word} « ${c.s.meaning.primary} » | ${c.v.b} | **${c.v.v}** |`);
P();
P('**Trois situations.**');
P();
P(`1. **L\'affirmation est exacte** : l\'arbre ne nomme pas la notion, ou aucun de ses domaines ne décrit le sens entier (le tabac, l\'occupation et la disponibilité, la manière d\'agir, le jugement moral, la vérité, le mode de vie, la progression ; la voix et le bagage, dont les fiches réunissent plusieurs domaines).`);
P('2. **La formule est inexacte, la conclusion tient** : pour 死ぬ, l\'arbre nomme la mort (« Cycle de vie › Mort ») ; le `null` vient du débordement de la fiche, non d\'une absence.');
P('3. **L\'affirmation n\'est pas confirmée** : une catégorie décrit le sens, et des sens comparables publiés la portent. C\'est le cas des deux objets du temps et des deux mots de la répétition (C retenus). Pour « Seul », que l\'audit proposait d\'y joindre, l\'arbitrage maintient l\'affirmation : l\'absence de compagnie n\'est pas une interaction sociale.');
P();
P('## T6.4 Points examinés à la demande de l\'arbitrage');
P();
P('**Les cinq `concept_abstrait` (C3-0), type vérifié indépendamment de la catégorie, sans en faire un type de secours.**');
P();
P('| Sens | Type publié | Ce que la vérification établit |');
P('|---|---|---|');
P('| 本当 « Vérité » | `concept_abstrait` | type propre : un concept non matériel, ni information, ni quantité, ni propriété d\'une entité |');
P('| 生活 « Mode de vie » | `concept_abstrait` | type propre : ni une activité, ni l\'état d\'une personne à un moment |');
P('| また, sens 1 « À nouveau » | `concept_abstrait` | cohérent avec les adverbes de temps publiés, la catégorie `temps › chronologie › succession` étant retenue |');
P('| もう一度 « Encore une fois » | `concept_abstrait` | même constat que pour また, sens 1 |');
P('| だんだん « Graduellement » | `concept_abstrait` | tenable : ni entité, ni occurrence, ni caractéristique d\'une entité ; écart signalé avec ゆっくり (`propriete`), sans proposition |');
P();
P('Aucun changement de type n\'est proposé.');
P();
P('**Les autres chevauchements avec le volet 1.**');
P();
P('| Sens | Relevé du criblage | Ce qu\'il en reste |');
P('|---|---|---|');
P('| だんだん | C7-c : « peu » dans « Peu à peu », fonction `quantificateur` non examinée | fausse alerte : le mot ne donne l\'étendue d\'aucun référent |');
P('| だんだん | C10-a : D1400 refuse `aspect` faute de définition | `aspect` n\'a toujours pas de définition normative ; le verdict n\'en dépend pas (Q4) |');
P('| 一人, sens 2 | C7-c : « tout » dans « Tout seul » | fausse alerte : un adverbe du français dans une traduction |');
P('| 本当 | C5-0 : dimension `vrai_faux:vrai` posée | l\'axe décrit directement le sens ; réserve sur « réel » |');
P();
P('**声 : un seul avertissement examiné.** Le `type-nul` de ce sens est arbitré L (tranche 1) et n\'est pas rouvert. La fiche `categorie-nulle` conclut L : la fiche source réunit la voix qui parle, la voix qui chante et le cri d\'un animal.');
P();
P('**Aucun verdict n\'est donné aux sens hors tranche**, y compris quand une fiche relève un écart avec eux (初めて, 一緒, 休み, ペン, 切符, ゆっくり sens 1, 明るい, 暗い, 爽やか).');
P();
P('## T6.5 Réserves, divergences et modifications proposées');
P();
P(`### Modifications retenues (${mods.length}), non appliquées`);
P();
P('| Sens | Classement | Modification retenue | Comparable publié qui la fonde | Statut |');
P('|---|---|---|---|---|');
const FONDE = { v_671_s1: 'ペン, 鉛筆, ノート (écrire) ; 切符 (utilisation des transports) ; A2-L3 §7, règle 5', v_287_s1: 'les mêmes ; « Calendrier » est le nom du domaine', v_500_s1: '初めて « Pour la première fois », même lot 21', v_503_s1: '初めて « Pour la première fois », même lot 21' };
for (const c of mods) P(`| \`${c.id}\` ${c.e.word} « ${c.s.meaning.primary} » | ${c.v.v} | ${c.v.k.split('. ')[0]}. | ${FONDE[c.id] ?? '—'} | retenue à l\'arbitrage du 2026-10-08 ; non appliquée |`);
P();
P('**Non retenue** : `v_627_s2` 一人 « Seul », `category` : `null` → `relations_sociales › interactions_sociales`. Le cas est classé L et garde `category: null`.');
P();
P('Les trois questions posées à l\'arbitrage ont reçu leur réponse : **un objet spécialisé suit le domaine qu\'il sert** (時計, カレンダー) ; **« une fois de plus » est, comme « la première fois », une place dans une suite d\'occurrences** (また sens 1, もう一度) ; **la catégorie d\'un pôle ne s\'impose pas à l\'autre par symétrie** (一人, sens 2, face à 一緒).');
P();
P('La liste des corrections du volet 2 compte désormais **dix modifications de SENSE, toutes non appliquées** :');
P();
P('| # | SENSE | Classement | Modification retenue |');
P('|---|---|---|---|');
P('| 1 | `v_500_s2` また « Aussi » | F | `linguistic_functions.pragmatic_discourse` : `[]` → `["connecteur"]` (une modification, deux avertissements) |');
P('| 2 | `v_65_s2` 頭 « Esprit » | C | `semantic_type` : `null` → `propriete` |');
P('| 3 | `v_696_s1` 表 « Face » | C | `semantic_type` : `null` → `lieu` |');
P('| 4 | `v_606_s1` 皆 « Tout le monde » | C | `category` : `null` → `nombres_quantification › totalite_partie › totalite` |');
P('| 5 | `v_687_s1` 皆さん « Tout le monde » | C | `category` : `null` → `nombres_quantification › totalite_partie › totalite` |');
P('| 6 | `v_528_s1` 並ぶ « Faire la queue » | C | `category` : `null` → `espace_proprietes_spatiales › position_localisation` |');
P('| 7 | `v_671_s1` 時計 « Horloge » | C | `category` : `null` → `temps` (niveau 1) |');
P('| 8 | `v_287_s1` カレンダー « Calendrier » | C | `category` : `null` → `temps › calendrier` |');
P('| 9 | `v_500_s1` また « À nouveau » | C | `category` : `null` → `temps › chronologie › succession` |');
P('| 10 | `v_503_s1` もう一度 « Encore une fois » | C | `category` : `null` → `temps › chronologie › succession` |');
P();
P('Onze avertissements cesseraient (また, sens 2, en porte deux). また porte deux modifications, une par sens. **Rien n\'est exécuté** ; aucune décision historique n\'est réécrite.');
P();
P('### Divergences relevées (4), sans verdict sur les comparables');
P();
P('1. **Objets rangés ou non dans le domaine qu\'ils servent** : ペン, 鉛筆, ノート, 辞書, 切符, 切手, 地図 d\'un côté ; 時計 et カレンダー de l\'autre. **Résolue** par les deux C retenus.');
P('2. **一緒 (lot 22) et 一人, sens 2 (lot 14)** : « être accompagné » est en interactions sociales, « être sans compagnie » sans catégorie. **Conservée** comme contrôle transversal du volet 1, sans verdict sur 一緒.');
P('3. **初めて et les mots de la répétition, dans le même lot 21** : la première occurrence est en succession ; « une fois de plus » et « à nouveau » étaient sans catégorie. **Résolue** par les deux C retenus.');
P('4. **Le type des adverbes de manière** : だんだん `concept_abstrait` (lot 21), ゆっくり `propriete` (lot 22). Aucune proposition ; **conservée** pour le volet 1.');
P();
P('**Points transversaux conservés** : 死ぬ (formule inexacte, doctrine commune avec 力) ; 声 (`type-nul` arbitré L, non rouvert) ; だんだん / ゆっくり (type) ; 本当 (« réel » et l\'axe réel / fictif) ; まっすぐ (formule de D1411 et caractère d\'une personne).');
P();
P('### Réserves, fiche par fiche');
P();
for (const c of cases.filter((x) => x.v.r)) P(`- \`${c.id}\` ${c.e.word} « ${c.s.meaning.primary} » (**${c.v.v}**) : ${c.v.r}`);
P();
P('## T6.6 Les 18 fiches d\'audit');
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
    P(`- **Vérification de l'affirmation** : ${v.b}.`);
    P(`- **Normes appliquées** : ${v.n.map(norm).join(' ')}`);
    P(`- **Comparables examinés** : ${v.c}`);
    P(`- **Verdict${c.id === 'v_627_s2' ? ' arbitré (proposé : C)' : ''}** : **${v.v}**.`);
    P(`- **Motivation** : ${v.m}`);
    if (v.k) P(`- **Modification retenue, non appliquée** : ${v.k}`);
    if (v.r) P(`- **Réserve** : ${v.r}`);
    P();
  }
}
P('## T6.7 Complétude : contrôles reproductibles');
P();
P('Calculés par `a2-05-travail/audit-cat-t5.mjs`, qui écrit cette tranche, sur l\'inventaire (`avertissements-connus.json`), le journal, l\'état publié, le registre des catégories et le rapport lui-même. Le script s\'arrête si l\'un d\'eux échoue. Commande : `node a2-05-travail/audit-cat-t5.mjs . docs/rapports/etape2-A2-05-audit-null.md`.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P('| Les 18 identifiants des fiches sont exactement ceux du périmètre validé | oui, 18 distincts |');
P(`| Chacun porte un avertissement \`categorie-nulle\` de l\'inventaire (${preuves.inventaire} au total) | oui |`);
P('| Chacun a exactement une décision de journal `categorie-nulle`, `validated`, sur ce sens | oui |');
P('| Chaque raison contient la formule de la famille, et aucune formule d\'une famille déjà traitée | oui |');
P('| Chaque sens a bien `category: null` dans les données publiées | oui |');
P(`| Aucun ne figure parmi les ${preuves.dejaCat} \`categorie-nulle\` déjà arbitrés du rapport | oui |`);
P(`| Les 18 sont exactement les cas restants de cette famille | oui ; ${preuves.restants} restants = ${preuves.famille} + ${preuves.autreFormulation} « autre formulation » |`);
P('| Chaque fiche porte le résultat de la vérification de l\'affirmation d\'absence | oui, 18 |');
P('| Chaque catégorie proposée existe dans `data/registries/categories.json` | oui |');
P(`| Verdicts de la tranche | L = ${tot.L}, F = ${tot.F}, C = ${tot.C}, N = ${tot.N} ; total 18 |`);
P('| Un verdict C ou F a une modification proposée, et seulement lui | oui |');
P(`| Sens publiés de type \`objet_artefact\` ; sans catégorie | ${preuves.objets} ; ${preuves.objetsSansCategorie} |`);
P(`| Cumul arbitré avant cette tranche, recompté sur les fiches du rapport | ${preuves.dejaType + preuves.dejaCat} fiches : L = ${preuves.cumulAvant.L}, F = ${preuves.cumulAvant.F}, C = ${preuves.cumulAvant.C}, N = ${preuves.cumulAvant.N} |`);
P(`| Fiches au rapport après cette tranche | ${preuves.dejaType} \`type-nul\` + ${preuves.dejaCat} + 18 \`categorie-nulle\` = ${preuves.dejaType + preuves.dejaCat + 18} sur 147 |`);
P(`| \`categorie-nulle\` restant après cette tranche | ${preuves.reste} (« autre formulation ») |`);
writeFileSync(outFile, md);
console.log(`tranche 6 écrite : L=${tot.L} F=${tot.F} C=${tot.C} N=${tot.N} ; réserves ${cases.filter((c) => c.v.r).length} ; ${md.split('\n').length} lignes`);
console.log(`preuves ${JSON.stringify(preuves)}`);
