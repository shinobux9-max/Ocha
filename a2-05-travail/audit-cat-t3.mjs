// A2-05 · volet 2 · categorie-nulle, troisième tranche (22 cas, « action générale », première partie).
// Lecture seule sur les données ; les verdicts sont dans audit-cat-t3.json.
// Usage : node audit-cat-t3.mjs <racine du dépôt> <rapport.md à compléter>
// Relançable : une « Tranche 4 » déjà présente dans le rapport est remplacée.
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
const V = JSON.parse(readFileSync(join(here, 'audit-cat-t3.json'), 'utf8'));
const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/(?:rt|getKey)><\/(?:ruby|getKey)>/g, '$1').replace(/<\/?[A-Za-z]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fnOf = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse];

const N = {
  A5: 'A5, §2 : `category: null` est permis « lorsqu\'aucune catégorie sémantique primaire suffisamment pertinente n\'existe » ; pour un sens lexical plein, « ce n\'est jamais une valeur par défaut ni un fourre-tout ».',
  GEN: 'Lecture de la formule « action générale » : T4.3 ; le `null` est vérifié sur la fiche, par l\'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7).',
  G10: 'A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».',
  L3r1: 'A2-L3-v1, §7, règle 1 : « concept ≠ contexte d\'usage ».',
  L3r6: 'A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».',
  L3pos: 'A2-L3-v1, §5, Espace & propriétés spatiales : « Position & localisation → Intérieur / extérieur ; Dessus / dessous ; Devant / derrière ; Centre / périphérie » ; « Mouvement & déplacement → Aller / venir ; Avancer / reculer ; Monter / descendre » ; « Entrée & sortie → Entrer / sortir ».',
  L3com: 'A2-L3-v1, §5, Communication & langage : « Communication → Transmission ; Échange ; Contact ».',
  L3cuis: 'A2-L3-v1, §5, Alimentation & cuisine : « Cuisine & préparation → Découpe ; Mélange & préparation ; Cuisson ; Assaisonnement ».',
  L3net: 'A2-L3-v1, §5 : « Entretien domestique → Nettoyage ; Lessive ; Gestion des déchets » (Habitat & vie domestique) ; « Hygiène & soins personnels → Toilette corporelle ; Soins des cheveux ; Soins bucco-dentaires ; Soins esthétiques » (Être humain).',
  L3porte: 'A2-L3-v1, §5 : « Éléments architecturaux → Murs ; Toits ; Portes & fenêtres ; Escaliers ; Étages » (Environnement construit) ; « Rangement » (Habitat & vie domestique).',
  L3equip: 'A2-L3-v1, §5 : « Équipements domestiques → Électroménager ; Chauffage & climatisation ; Équipements fonctionnels » (Habitat & vie domestique) ; « Appareils électroniques » (Technologie) ; « Télévision » (Médias).',
  L3prod: 'A2-L3-v1, §5 : « Fabrication → Assemblage ; Usinage ; Fabrication » (Production & industrie) ; « Création artistique » (Arts & création).',
  L3eval: 'A2-L3-v1, §5 : « Évaluation scolaire → Examens ; Notes ; Réussite / échec scolaire » (Éducation & apprentissage) ; « Administration publique → Administrations ; Services administratifs ; Documents administratifs » (Politique & institutions publiques).',
  DIM5: 'A2-DIM-v1, §5 : « transformation/modification » est une famille « non promue à ce stade » ; elle n\'est pas non plus une catégorie.',
  LOT19: 'Doctrine du lot 19 : une catégorie ne s\'impose pas quand la fiche déborde son domaine.',
  A9_31: 'A9, §3.1 : le `connecteur` relie « l\'énoncé qu\'il introduit à un énoncé ou à une situation qui précède » ; A9, §2.2 : une fonction ne s\'attribue jamais par la classe, ni, a fortiori, par un mot de la traduction.'
};
const G44 = (el) => `A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « ${el} » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».`;
const norm = (k) => {
  if (!k.startsWith('@')) return k;
  if (k.startsWith('@G44:')) return G44(k.slice(5));
  if (!N[k.slice(1)]) throw new Error(`norme inconnue : ${k}`);
  return N[k.slice(1)];
};

const FAM = {
  A: 'A · Gestes de la main sur un objet',
  B: 'B · Fixer, coller, couper, frotter',
  C: 'C · Ouvrir, fermer, allumer, éteindre',
  D: 'D · Actions sans objet typique',
  E: 'E · Obtenir, soumettre, se mettre en rang'
};
const PERIMETRE = ['v_50_s2', 'v_79_s1', 'v_130_s1', 'v_522_s1', 'v_522_s2', 'v_528_s1', 'v_532_s1', 'v_536_s3', 'v_539_s1', 'v_539_s2', 'v_541_s1', 'v_541_s2', 'v_545_s1', 'v_561_s1', 'v_567_s1', 'v_576_s1', 'v_580_s1', 'v_637_s1', 'v_709_s1', 'v_164_s3', 'v_665_s1', 'v_564_s1'];
const PARTIE2 = ['v_533_s1', 'v_575_s1', 'v_562_s1', 'v_578_s1', 'v_551_s1', 'v_568_s1', 'v_526_s1', 'v_542_s2', 'v_552_s1', 'v_635_s2', 'v_642_s2', 'v_642_s3', 'v_266_s2', 'v_608_s2'];
const ids = Object.keys(V);
const same = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
if (!same(ids, PERIMETRE)) throw new Error('les fiches ne sont pas exactement le périmètre validé');
const cases = ids.map((id) => {
  const e = vocab.find((x) => x.senses.some((s) => s.id === id));
  const s = e.senses.find((x) => x.id === id);
  const num = Number(id.split('_s')[1]);
  const srcId = `n5_v_${e.id.slice(2)}`;
  const ds = journal.filter((x) => x.entry === srcId && x.kind === 'categorie-nulle' && x.field === `sens ${num} · category`);
  if (!known.some((w) => w.code === 'categorie-nulle' && w.where.endsWith(` ${id}`))) throw new Error(`pas un categorie-nulle : ${id}`);
  if (ds.length !== 1) throw new Error(`décision introuvable ou multiple : ${id}`);
  if (ds[0].status !== 'validated') throw new Error(`décision non validée : ${id}`);
  if (!/action g[ée]n[ée]rale/i.test(ds[0].reason)) throw new Error(`hors famille « action générale » : ${id}`);
  if (s.category !== null) throw new Error(`catégorie non nulle : ${id}`);
  if (!FAM[V[id].f]) throw new Error(`groupe inconnu : ${id}`);
  return { id, e, s, num, srcId, f: sources.get(srcId), d: ds[0], v: V[id] };
});
const tot = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, cases.filter((c) => c.v.v === k).length]));
if (cases.length !== 22 || new Set(ids).size !== 22 || tot.L + tot.F + tot.C + tot.N !== 22) throw new Error('22 cas attendus');
for (const c of cases) if ((c.v.v === 'C' || c.v.v === 'F') !== Boolean(c.v.k)) throw new Error(`correction incohérente avec le verdict : ${c.id}`);

// preuves d'exhaustivité, calculées et non recopiées
const MARK = '\n---\n\n# Tranche 4 ·';
let md = readFileSync(outFile, 'utf8');
if (md.includes(MARK)) md = md.slice(0, md.indexOf(MARK));
md = md.replace(/\n+$/, '\n');
const allCat = known.filter((w) => w.code === 'categorie-nulle').map((w) => w.where.split(' · ')[2]);
const typeNul = new Set(known.filter((w) => w.code === 'type-nul').map((w) => w.where.split(' · ')[2]));
const [avantT2, ...apres] = md.split('\n# Tranche 2 ·');
const dejaCat = new Set([...apres.join('\n# Tranche 2 ·').matchAll(/^#### `(v_\d+_s\d+)` /gm)].map((m) => m[1]));
const dejaType = new Set([...avantT2.matchAll(/^#### `(v_\d+_s\d+)` /gm)].map((m) => m[1]));
const repris = ids.filter((id) => dejaCat.has(id));
if (repris.length) throw new Error(`déjà audités : ${repris.join(', ')}`);
const famille = allCat.filter((id) => {
  const e = vocab.find((x) => x.senses.some((s) => s.id === id));
  const d = journal.find((x) => x.entry === `n5_v_${e.id.slice(2)}` && x.kind === 'categorie-nulle' && x.field === `sens ${Number(id.split('_s')[1])} · category`);
  return !dejaCat.has(id) && /action g[ée]n[ée]rale/i.test(d.reason) && !/personne g[ée]n[ée]rique|propri[ée]t[ée] (physique )?g[ée]n[ée]rale|[ée]valuation/i.test(d.reason);
});
const preuves = {
  inventaire: allCat.length, typeNul: typeNul.size, dejaCat: dejaCat.size, dejaType: dejaType.size,
  famille: famille.length, disjoints: PERIMETRE.every((x) => !PARTIE2.includes(x)), reunion: same([...PERIMETRE, ...PARTIE2], famille),
  lot18: cases.filter((c) => c.d.lot === 'lot-18').length, reste: allCat.length - dejaCat.size - 22
};
if (preuves.inventaire !== 120 || preuves.dejaCat !== 55 || preuves.dejaType !== 27 || preuves.famille !== 36 || !preuves.disjoints || !preuves.reunion || preuves.lot18 !== 19 || preuves.reste !== 43) throw new Error(`preuves d'exhaustivité : ${JSON.stringify(preuves)}`);

const P = (t = '') => { md += `${t}\n`; };
const list = (l) => l.map((c) => `\`${c.id}\` ${c.e.word}`).join(' ; ') || '—';
const byId = (id) => cases.find((c) => c.id === id);
P();
P('---');
P();
P('# Tranche 4 · `categorie-nulle`, troisième tranche : 22 cas');
P();
P('**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation), validée telle que proposée : L = 21, F = 0, C = 1, N = 0. 並ぶ, sens 1, est **confirmé C** (`semantic_type: action` conservé) ; 出す, sens 3, est confirmé L ; les 20 autres L sont confirmés. La correspondance de substance entre « action générale » et « action générique » est acceptée **pour les cas justifiés individuellement**, sans devenir une présomption pour les tranches suivantes. La modification retenue rejoint la liste des corrections du volet 2 ; **elle n\'est pas appliquée**. Périmètre validé le même jour : « action générale », première partie, 22 SENSE (les 19 du lot 18, et かける sens 3, 持つ sens 1, 無くす). Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n\'est modifié ; aucune décision historique n\'est réécrite.');
P('**Reste à faire après cette tranche** : 43 `categorie-nulle` (« action générale », seconde partie, 14 ; « aucune catégorie ne nomme la notion » 18 ; « autre formulation » 11) ; aucun n\'est commencé.');
P();
P('## T4.1 Résultat de la tranche');
P();
P('| Classement | Cas | Sens |');
P('|---|---|---|');
for (const k of ['L', 'F', 'C', 'N']) P(`| **${k}** | ${tot[k]} | ${list(cases.filter((c) => c.v.v === k))} |`);
P('| **Total** | 22 | L + F + C + N = 22 |');
P();
if (tot.L !== 21 || tot.C !== 1) throw new Error('arbitrage : 21 L et 1 C attendus');
P(`**Cumul arbitré du volet 2** : 27 \`type-nul\` (L = 24, F = 1, C = 2), 55 \`categorie-nulle\` (L = 52, F = 1, C = 2) et ces 22 \`categorie-nulle\` (L = ${tot.L}, C = ${tot.C}), soit **104 cas arbitrés sur 147 : L = ${76 + tot.L}, F = 2, C = ${4 + tot.C}, N = 0**.`);
P();
P(`- **Une modification est retenue** (${list(cases.filter((c) => c.v.k))}) ; elle n\'est pas appliquée. La liste des corrections du volet 2 compte désormais six modifications de SENSE (T4.5).`);
P('- **Aucun N.**');
P(`- **${cases.filter((c) => c.v.r).length} fiches portent une réserve** : ${list(cases.filter((c) => c.v.r))} (T4.5).`);
P('- **Les sept chevauchements avec le volet 1 sont traités dans les fiches** (T4.4).');
P();
P('## T4.2 Composition et méthode');
P();
P('La tranche réunit les 19 sens de la famille « action générale » décidés au lot 18 « Actions sur les objets », et trois sens d\'autres lots que leurs raisons ou leur famille source y rattachent : `v_164_s3` かける « Accrocher » (lot 08), `v_665_s1` 持つ « Tenir » (lot 20), `v_564_s1` 無くす « Perdre (un objet) » (lot 0). Les 14 autres sens de la famille sont réservés à la tranche suivante et **ne sont pas audités ici** ; quand une fiche les cite, c\'est comme comparables, sans verdict.');
P();
P('Pour chaque cas, individuellement : fiche source entière (traductions, nuance, exemple) ; sens publié, nuance publiée et autres sens de l\'ENTRY ; décision `categorie-nulle` et décisions voisines, celles du lot 26 comprises ; A5, A2-L3-v1 (§2, §5 à §7), A2-GLOBAL-v1 (§4.3, §4.4, §10, §11), A2-DIM-v1 et A9 selon le cas ; sens comparables publiés, **dans la tranche et hors d\'elle**. L\'arbre des catégories d\'A2-L3 (§5) a été relu pour chaque sens, et les catégories des 145 sens de verbes publiés (90 en portent une) ont été relevées pour situer chaque cas. Les fiches sont regroupées pour la lecture ; chaque verdict est motivé sur la fiche du cas.');
P();
P('## T4.3 « Action générale » et « action générique »');
P();
P('**Le constat.** Les 22 raisons de la tranche, comme les 36 de la famille, disent « action générale ». La liste des éléments hors hiérarchie (A2-L3 §6, A2-GLOBAL §4.4) dit **« action générique »**, à côté d\'« objet / artefact générique », de « personne générique » et de « lieu générique » ; elle ne dit « générale » que pour la propriété. Les deux formules n\'ont pas la même lettre. Une seule raison cite la norme à l\'appui de la formule : D0069 (無くす), que le criblage avait relevée (C9-a).');
P();
P('**La lecture proposée.**');
P();
P('1. Ce que la norme écarte, c\'est la création d\'une racine « Actions » : ces éléments « ne doivent pas être recréés automatiquement comme Level 1/2/3 ». Une action qu\'aucun domaine thématique ne borne n\'a donc pas de catégorie, par décision de l\'architecture et non par manque.');
P('2. « Action générale, sans domaine thématique propre » désigne cela. La formule des raisons se lit donc au sens d\'« action générique » : la correspondance tient **dans la substance**, pas dans la lettre.');
P('3. **Elle ne dispense de rien.** Une action n\'est pas générique parce qu\'elle est une action : le registre range des verbes d\'action dès que leur fiche décrit un domaine. 洗う « Laver » est en entretien domestique, 置く « Poser » et 並べる « Aligner » en position et localisation, 上げる « Lever » en mouvement, 入れる « Mettre dans » en entrée et sortie, 締める « Serrer » en accessoires vestimentaires, 作る « Préparer (un repas) » en cuisine. La formule ne fonde donc pas le `null` à elle seule : chaque cas a été vérifié sur sa fiche, par l\'absence de toute catégorie qui décrive le sens (A2-L3 §2 ; §7, règle 7 ; A2-GLOBAL §10 et §11).');
P();
P(`**Le résultat, sens par sens.** La correspondance tient pour ${tot.L} sens : la fiche décrit un geste ou une action qu\'aucun domaine ne borne, ou nomme elle-même plusieurs domaines. Elle ne tient pas pour 並ぶ, sens 1, où une catégorie publiée pour ses comparables décrit le sens (proposé C). Pour D0069, la citation du §4.4 est inexacte dans la lettre et la conclusion est juste : rien n\'est à corriger dans les données, et une décision validée ne se réécrit pas.`);
P();
P('**Arbitrage du 2026-10-08.** La correspondance de substance entre « action générale » et « action générique » est **acceptée pour les cas justifiés individuellement**. **Elle n\'est pas une présomption automatique pour les tranches suivantes** : les 14 sens restants de la famille, qui emploient la même formule, seront vérifiés un par un sur leur fiche, sans que la formule vaille justification.');
P();
P('## T4.4 Ce que la lecture fait apparaître');
P();
P('**Une ligne de partage entre les verbes d\'action catégorisés et les autres.** Dans les données publiées, un verbe d\'action sur un objet porte une catégorie quand sa fiche décrit **où va l\'objet** (置く, 並べる, 入れる, 出す « Sortir », 上げる « Lever ») ou **sur quel objet typique** il s\'exerce (締める, 着る, 洗う). Il n\'en porte pas quand elle décrit **une manière d\'agir sur un objet quelconque** : saisir, tenir, pousser, tirer, fixer, accrocher, coller, couper, ouvrir, fermer. Les fiches de cette tranche sont de la seconde sorte, à une exception près (並ぶ, sens 1). La ligne est cohérente ; elle n\'était écrite nulle part.');
P();
P('**Les verdicts sont cohérents avec les intransitifs déjà arbitrés.** 開ける, 閉める et 消す sont reliés par `transitive_of` à 開く, 閉まる et 消える, confirmés L à la tranche 2 pour la même étendue (porte, magasin, contenant ; lumière, feu). Les fiches des transitifs ont été lues pour elles-mêmes ; elles conduisent au même résultat. 持つ, sens 1, est cohérent avec son sens 2 « Posséder » (L).');
P();
P('**Les sept chevauchements avec le volet 1** (un cas n\'est audité qu\'une fois) :');
P();
P('| Sens | Relevé du criblage | Ce qu\'il en reste |');
P('|---|---|---|');
P('| 取る, sens 1 | C1-a, C3-b : « Prendre » dans cinq ENTRY, catégories et types différents | cinq mots, cinq référents ; seul le français les réunit ; aucun écart |');
P('| 開ける | C1-a : « Ouvrir » aussi pour 差す, sens 1 (un parapluie) | autre mot, autre référent ; aucun écart |');
P('| 開ける, 閉める, 消す | C3-e : type `action`, quand l\'intransitif relié est `evenement` | différence attendue entre un transitif et son intransitif ; aucun écart |');
P('| 開ける, 閉める, 消す, 並ぶ | C10-a : la raison renvoie la relation à la passe finale | soldé : les relations sont publiées depuis le lot 26 (D1573, D1575, D1577, D1579) |');
P('| 使う | C7-c : « ou » dans une traduction, fonction `connecteur` non examinée | fausse alerte : une conjonction du français dans une glose ; aucune fonction |');
P('| 無くす | C9-a : D0069 cite le §4.4 pour un élément qui n\'y est pas tel quel | citation inexacte dans la lettre, conclusion juste (T4.3) |');
P();
P('Ces relevés sont réglés pour les sens de la tranche. **Aucun verdict n\'est donné aux autres candidats du volet 1** que ces relevés nomment (乗る, 撮る, 浴びる, 差す sens 1, les intransitifs) ni aux comparables hors tranche (洗う, 置く, 並べる, 見せる).');
P();
P('## T4.5 Réserves, divergences et modification proposée');
P();
P('### Modification retenue (1), non appliquée');
P();
P('| Sens | Classement | Modification retenue | Statut |');
P('|---|---|---|---|');
for (const c of cases.filter((x) => x.v.k)) P(`| \`${c.id}\` ${c.e.word} « ${c.s.meaning.primary} » | ${c.v.v} | ${c.v.k.split('. ')[0]}. | retenue à l\'arbitrage du 2026-10-08 ; non appliquée |`);
P();
P('Elle rejoint la liste des corrections du volet 2, qui compte désormais **six modifications de SENSE, toutes non appliquées** :');
P();
P('| # | SENSE | Classement | Modification retenue |');
P('|---|---|---|---|');
P('| 1 | `v_500_s2` また « Aussi » | F | `linguistic_functions.pragmatic_discourse` : `[]` → `["connecteur"]` (une modification, deux avertissements) |');
P('| 2 | `v_65_s2` 頭 « Esprit » | C | `semantic_type` : `null` → `propriete` |');
P('| 3 | `v_696_s1` 表 « Face » | C | `semantic_type` : `null` → `lieu` |');
P('| 4 | `v_606_s1` 皆 « Tout le monde » | C | `category` : `null` → `nombres_quantification › totalite_partie › totalite` |');
P('| 5 | `v_687_s1` 皆さん « Tout le monde » | C | `category` : `null` → `nombres_quantification › totalite_partie › totalite` |');
P('| 6 | `v_528_s1` 並ぶ « Faire la queue » | C | `category` : `null` → `espace_proprietes_spatiales › position_localisation` ; `semantic_type: action` conservé |');
P();
P('Sept avertissements cesseraient. **Rien n\'est exécuté** ; aucune décision historique n\'est modifiée.');
P();
P('### Divergences relevées (3)');
P();
P('1. **並ぶ, sens 1, et ses voisins du même lot.** « Aligner / Mettre en rang » (並べる), « Être aligné » (並ぶ, sens 2) et « Poser » (置く) sont en position et localisation ; « Faire la queue / Se mettre en rang » (並ぶ, sens 1) est sans catégorie. C\'est le fondement du C proposé.');
P('2. **磨く et 洗う, entre deux lots.** 洗う (lot 03) est en entretien domestique › nettoyage, bien que sa fiche couvre des objets, des vêtements et des aliments ; 磨く (lot 18) est sans catégorie parce que la sienne couvre les dents et les chaussures. Le `null` de 磨く est maintenu (L). **Aucun verdict n\'est pris sur 洗う**, qui n\'est pas dans les 147 : point pour l\'examen des autres candidats du volet 1.');
P('3. **切る, sens 2, et かける, sens 1.** « Passer (un appel) » est en communication › contact ; « Raccrocher (un téléphone) » est sans catégorie. La fiche de 切る justifie la différence (elle joint une connexion et un contact que l\'on éteint), mais la traduction principale publiée ne montre que l\'appel.');
P();
P('### Réserves, fiche par fiche');
P();
for (const c of cases.filter((x) => x.v.r)) P(`- \`${c.id}\` ${c.e.word} « ${c.s.meaning.primary} » (**${c.v.v}**) : ${c.v.r}`);
P();
P('**Après arbitrage** : les questions posées pour 並ぶ, sens 1, et pour 出す, sens 3, sont tranchées (C et L). **Restent conservées** les réserves sur 磨く / 洗う (point pour le volet 1, sans verdict sur 洗う), sur la traduction partielle de 切る, sens 2, et sur la citation de D0069.');
P();
P('## T4.6 Les 22 fiches d\'audit');
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
    P(`- **Normes appliquées** : ${v.n.map(norm).join(' ')}`);
    P(`- **Comparables examinés** : ${v.c}`);
    P(`- **Verdict** : **${v.v}**.`);
    P(`- **Motivation** : ${v.m}`);
    if (v.k) P(`- **Modification retenue, non appliquée** : ${v.k}`);
    if (v.r) P(`- **Réserve** : ${v.r}`);
    P();
  }
}
P('## T4.7 Complétude : contrôles d\'exhaustivité');
P();
P('Calculés par le script qui écrit cette tranche, sur l\'inventaire, le journal, l\'état publié et le rapport lui-même ; le script s\'arrête si l\'un d\'eux échoue.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les 22 identifiants des fiches sont exactement ceux du périmètre validé | oui, 22 distincts |`);
P(`| Chacun porte un avertissement \`categorie-nulle\` de l\'inventaire (${preuves.inventaire} au total) | oui |`);
P('| Chacun a exactement une décision de journal `categorie-nulle`, `validated`, sur ce sens | oui |');
P('| Chaque raison emploie la formule « action générale » | oui |');
P('| Chaque sens a bien `category: null` dans les données publiées | oui |');
P(`| Aucun ne figure parmi les ${preuves.dejaCat} \`categorie-nulle\` déjà arbitrés du rapport | oui |`);
P(`| Composition : sens décidés au lot 18 | ${preuves.lot18} ; plus かける (lot 08), 持つ (lot 20), 無くす (lot 0) |`);
P(`| Les 22 et les 14 de la seconde partie sont disjoints, et leur réunion est la famille « action générale » restante | oui, ${preuves.famille} |`);
P(`| Verdicts | L = ${tot.L}, F = ${tot.F}, C = ${tot.C}, N = ${tot.N} ; total 22 |`);
P('| Un verdict C ou F a une modification proposée, et seulement lui | oui |');
P(`| Fiches au rapport | ${preuves.dejaType} \`type-nul\` + ${preuves.dejaCat} + 22 \`categorie-nulle\` = ${preuves.dejaType + preuves.dejaCat + 22} sur 147 |`);
P(`| \`categorie-nulle\` restant après cette tranche | ${preuves.reste} (14, 18, 11) |`);
writeFileSync(outFile, md);
console.log(`tranche 4 écrite : L=${tot.L} F=${tot.F} C=${tot.C} N=${tot.N} ; réserves ${cases.filter((c) => c.v.r).length} ; preuves ${JSON.stringify(preuves)} ; ${md.split('\n').length} lignes`);
