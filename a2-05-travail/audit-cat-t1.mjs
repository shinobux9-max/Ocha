// A2-05 · volet 2 · categorie-nulle, tranche 1 (26 cas). Lecture seule sur les données.
// Usage : node audit-cat-t1.mjs <racine du dépôt> <rapport.md à compléter>
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [root, outFile] = process.argv.slice(2);
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const vocab = read('data/n5/vocab.json');
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const journal = read('reconstruction/a2-04/journal.json');
const known = read('reconstruction/a2-04/avertissements-connus.json');
const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fnOf = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse];

const N = {
  A5: 'A5, §2 : `category: null` est permis « lorsqu\'aucune catégorie sémantique primaire suffisamment pertinente n\'existe » ; pour un sens lexical plein, « ce n\'est jamais une valeur par défaut ni un fourre-tout ».',
  A5fn: 'A5, §2 : « pour une unité principalement grammaticale ou pragmatique, une fonction linguistique le justifie directement ».',
  L3_2: 'A2-L3-v1, §2 : « lorsqu\'aucune catégorie suffisamment caractéristique n\'existe, l\'absence de catégorie est préférable à une classification artificielle ».',
  G44: (el) => `A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « ${el} » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».`,
  G10: 'A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».',
  G11: 'A2-GLOBAL-v1, §11 : « préférer `category: null` à une catégorie artificielle ».',
  L3r6: 'A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».',
  DIM5: 'A2-DIM-v1, §5 : « existence/absence » et « transformation/modification » sont des familles « non promues à ce stade » ; elles ne sont pas non plus des catégories.',
  A9_41: 'A9, §4.1 : « un sens qui porte une fonction et n\'a pas de domaine thématique a `category: null` ; la fonction le justifie (A5) ».',
  A9_34: 'A9, §3.4 : « un mot qui prédique la quantité […] ou qui désigne une quantité n\'est pas un quantificateur ».',
  A9_33: 'A9, §3.3 : « la politesse n\'est pas le registre : une marque de registre poli ou formel (forme polie d\'un mot, pronom de respect, interrogatif poli) ne suffit pas à attribuer la fonction ».',
  L3tot: 'A2-L3-v1, §5, Nombres & quantification : « Totalité & partie → Totalité ; Partie ; Majorité / minorité ; Reste » ; Relations sociales : « Groupes & appartenance sociale → Membres ; Groupes ; Communautés ; Appartenance ».'
};
const PG = N.G44('personne générique');
const cmpPers = 'Dans la même famille source, 女の子 « Fille » et 男の子 « Garçon » sont en être humain › cycle de vie › enfance, 大人 « Adulte » en âge adulte, 子供 « Enfant » en enfance : chacun de ces mots dit un âge de la vie. Les autres noms de personnes sans précision (人, 方, 女, 男, 誰か, 自分) sont sans catégorie.';

const V = {
  // ---- A · personne générique ----
  v_633_s1: { f: 'A', n: [N.A5, PG, N.G10], c: cmpPers, v: 'L', m: 'La fiche décrit « un être humain ou une personne en général » ; l\'exemple dit « qui est cette personne ? ». C\'est la personne générique elle-même, que l\'architecture place hors de la hiérarchie thématique. Aucune catégorie ne la nomme, et la fiche ne lui donne ni âge, ni rôle, ni lien. La raison de D0096 tient, et sa citation d\'A2-GLOBAL §4.4 est exacte.' },
  v_657_s1: { f: 'A', n: [N.A5, PG, N.G10], c: cmpPers, v: 'L', m: 'La fiche décrit « le genre féminin ou une personne de sexe féminin » ; l\'exemple dit « cette femme est professeur ». A2-L3 n\'a aucune catégorie du sexe ou du genre, et la fiche ne dit aucun âge : « cycle de vie », qui porte 女の子, ne convient pas. Une personne désignée sans domaine : la raison de D0094 tient.' },
  v_686_s1: { f: 'A', n: [N.A5, PG, N.G10], c: cmpPers, v: 'L', m: 'La fiche décrit « le genre masculin ou une personne de sexe masculin » ; l\'exemple dit « qui est cet homme ? ». Aucune catégorie du sexe ou du genre n\'existe ; « Garçon », que la source donne en traduction, n\'est pas le sens retenu et 男の子 le porte. La raison de D0092 tient.' },
  v_667_s1: { f: 'A', n: [N.A5, PG, N.A9_33], c: cmpPers, v: 'L', m: 'La fiche décrit un « nom / suffixe poli désignant une personne avec respect » ; l\'exemple dit « qui est cette personne ? ». Le sens retenu est la personne, dite avec respect ; le suffixe de manière n\'est pas modélisé ici. Le respect est un registre : A9 exclut d\'en faire une fonction `politesse`, et il ne crée aucun domaine. La raison de D0097 tient.' },
  v_700_s1: { f: 'A', n: [N.A5, PG], c: cmpPers, v: 'L', m: 'La fiche décrit un « pronom indéfini […] désignant une personne indéterminée » ; l\'exemple dit « il y a quelqu\'un dans la classe ». Une personne quelconque, sans domaine. D0724 écarte `interrogatif` et `deictique` par une lecture de la fiche qui tient : le mot n\'interroge pas et ne repère rien dans la situation. Sa citation d\'A2-GLOBAL §4.4 est exacte.' },
  v_691_s1: { f: 'A', n: [N.A5, PG], c: cmpPers, v: 'L', m: 'La fiche décrit un « pronom réfléchi […] utilisé pour désigner sa propre personne » ; l\'exemple dit « je fais la cuisine par moi-même ». Le sens désigne la personne dont on parle, sans domaine thématique. D0730 a examiné `deictique` au regard d\'A7 et l\'a écarté, la référence venant de la syntaxe ; cette lecture tient. Aucune autre fonction définie ne s\'applique.' },
  v_606_s1: {
    f: 'A', n: [N.A5, PG, N.L3tot, N.A9_34], v: 'C',
    c: '大勢 « Beaucoup de monde » (lot 24, D1517), « utilisé exclusivement pour désigner une grande foule ou un nombre élevé de personnes », est en nombres et quantification › quantité › grande quantité, type `groupe_collectif` : « la catégorie grande quantité porte l\'aspect quantitatif ». 全部 « Tout », de la même famille source que 皆 (`adverbes_expressions / quantite`), est en totalité et partie › totalité. 皆さん est sans catégorie.',
    m: 'La fiche décrit un « pronom / adverbe désignant l\'ensemble d\'un groupe de personnes » ; l\'exemple dit « tout le monde a mangé ensemble ». Le sens n\'est pas une personne quelconque : c\'est la totalité d\'un groupe. Le lot 24 a arbitré, pour 大勢, qu\'un mot désignant des personnes par leur nombre porte la catégorie de quantité, le type disant qu\'il s\'agit de personnes. Le même raisonnement vaut ici pour la totalité, que le registre nomme. La raison de D0732 (lot 11) étend « personne générique » à un ensemble, ce que ni A2-L3 ni A2-GLOBAL ne disent, et elle est antérieure à cet arbitrage.',
    k: '`category` : `null` → `nombres_quantification › totalite_partie › totalite`. L\'avertissement `categorie-nulle` cesserait. Le type `groupe_collectif` n\'est pas touché ; aucune fonction n\'est proposée (le mot désigne, A9 §3.4).',
    r: 'Si l\'arbitrage tient au contraire qu\'un mot qui désigne des personnes reste une « personne générique », le `null` se maintient et le cas est reclassé L ; c\'est alors la catégorie de 大勢 qui serait à examiner au volet 1. Dans les deux cas, 皆 et 大勢 ne sont pas traités de la même façon aujourd\'hui.'
  },
  v_687_s1: {
    f: 'A', n: [N.A5, PG, N.L3tot, N.A9_33], v: 'C',
    c: '皆 « Tout le monde », dont 皆さん est la forme honorifique, et 大勢 « Beaucoup de monde » (nombres et quantification › quantité › grande quantité, `groupe_collectif`).',
    m: 'La fiche décrit une expression « formée à partir du mot minna (tous) suivi du suffixe honorifique -san, utilisée pour s\'adresser poliment à un groupe de personnes » ; l\'exemple dit « bonjour à tout le monde ! ». Le sens est le même ensemble que 皆, dit avec respect : la totalité des personnes à qui l\'on s\'adresse. Le respect est un registre, non une fonction (A9, §3.3), et ne change pas le domaine. Ce qui vaut pour 皆 vaut ici, sur la lecture de cette fiche : la totalité est nommée par le registre, et 大勢 est traité par la quantité. D0103 (lot 01) parle d\'un « ensemble de personnes quelconque », ce que la fiche ne dit pas : elle parle de tous.',
    k: '`category` : `null` → `nombres_quantification › totalite_partie › totalite`. L\'avertissement `categorie-nulle` cesserait. Aucune fonction n\'est proposée.',
    r: 'Même réserve que pour 皆. L\'emploi d\'adresse (« Mesdames et messieurs ») est une alternative publiée ; s\'il était jugé central, la totalité décrirait moins bien le sens.'
  },
  // ---- B · état général ----
  v_361_s1: { f: 'B', n: [N.A5, N.G44('identité / différence'), N.G10], c: '同じ « Même » (`v_438_s1`) est sans catégorie, pour l\'identité. Aucun sens publié ne range la différence dans un domaine.', v: 'L', m: 'La fiche décrit un verbe « exprimant la différence entre deux éléments » ; l\'exemple se traduit « non, c\'est différent ». La différence est nommée par l\'architecture parmi les éléments hors hiérarchie : l\'absence de catégorie est sa réponse, non une difficulté de classement. D1325 parle d\'« état général », formule qui n\'est pas dans la liste ; le fondement exact est « identité / différence ». La conclusion tient.', r: 'Le document historique `02_Ocha_Stress_Test_N5_N2.md` (§7) disait que 違う ne devait pas « tomber en NULL ». Il n\'est pas normatif, et le snapshot final range l\'identité et la différence hors de la hiérarchie : il ne fonde aucun écart.' },
  v_361_s2: { f: 'B', n: [N.A5, N.G44('validité / adéquation'), N.G11], c: 'ちょうど « Exactement », qui porte le pôle opposé du même axe (`exactitude`), est sans catégorie. Aucun sens publié ne range l\'erreur dans un domaine.', v: 'L', m: 'La fiche dit que le verbe signifie aussi « qu\'une information est erronée » ; l\'exemple se traduit aussi « ce n\'est pas exact ». L\'inexactitude n\'a pas de domaine : A2-DIM la porte par un axe, que ce sens a reçu (D1368), et la validité est hors hiérarchie. « Communication » décrirait le fait de parler, non le caractère erroné de ce qui est dit. La raison de D1326 tient par sa conclusion.' },
  v_512_s1: { f: 'B', n: [N.A5, N.L3_2, N.G10], c: '元気 « En forme » est en être humain › états et besoins physiques › fatigue et énergie physique : sa fiche ne parle que de la personne (« énergie vitale, bonne santé, dynamisme »). 大丈夫 n\'a pas de voisin de même portée.', v: 'L', m: 'La fiche décrit que « tout est en ordre, qu\'il n\'y a pas lieu de s\'inquiéter », « ou pour rassurer quelqu\'un » ; l\'exemple dit « ne t\'inquiète pas, ça va ». La fiche ne limite pas le mot à la santé ni à la personne : il vaut d\'une situation autant que de quelqu\'un. La catégorie de 元気 serait trop étroite. L\'emploi pour rassurer reste en nuance (doctrine du lot 16, reprise par A9 §2.1). La raison de D1125 tient.' },
  v_516_s1: { f: 'B', n: [N.A5, N.L3_2, N.DIM5], c: '居る « Y avoir (êtres vivants) » est sans catégorie. Les noms de position (上, 中, 外) sont en espace › position et localisation : ils disent où, non qu\'une chose existe.', v: 'L', m: 'La fiche décrit « l\'existence, la présence […] de choses inanimées » ; l\'exemple dit « il y a un livre sur le bureau ». Aucune catégorie d\'A2-L3 ne nomme l\'existence ; A2-DIM l\'a examinée comme famille et ne l\'a pas promue. « Position et localisation » décrit des positions relatives, non le fait d\'exister ou d\'être présent. La raison de D1303 tient.' },
  v_516_s2: { f: 'B', n: [N.A5, N.L3_2, N.G44('inclusion / appartenance')], c: '持つ, sens 2 « Posséder », est sans catégorie. Aucun sens publié ne range la possession dans un domaine ; l\'économie ne nomme que l\'argent, le prix, l\'achat et la vente.', v: 'L', m: 'La fiche décrit aussi « la possession de choses inanimées » ; l\'exemple illustre le sens 1, et ce sens repose sur le texte de la fiche. Avoir quelque chose n\'est pas un domaine thématique : A2-L3 n\'a pas de catégorie de la possession, et l\'appartenance est hors hiérarchie. La raison de D1304 tient.' },
  v_548_s1: { f: 'B', n: [N.A5, N.L3_2, N.DIM5], c: 'ある, sens 1 « Y avoir », est sans catégorie pour la même notion appliquée aux choses.', v: 'L', m: 'La fiche décrit « l\'existence ou la présence d\'êtres animés (humains et animaux) » ; l\'exemple dit « il y a un enfant dans la pièce ». Que le sujet soit vivant ne donne pas de domaine : le sens est l\'existence, non l\'être vivant. Aucune catégorie ne la nomme. La raison de D1307 tient.' },
  v_573_s1: { f: 'B', n: [N.A5, N.G44('possibilité / nécessité')], c: 'Aucun autre sens publié n\'exprime la nécessité. « États et besoins physiques » nomme le sommeil, la faim, la fatigue : des besoins du corps, non le besoin d\'un objet.', v: 'L', m: 'La fiche décrit « la nécessité ou le besoin de quelque chose » ; l\'exemple dit « j\'ai besoin d\'un nouvel ordinateur ». La nécessité est nommée parmi les éléments hors hiérarchie, et A2-DIM la porte par un axe, que ce sens a reçu (D1366). D1313 parle d\'« état général » ; le fondement exact est « possibilité / nécessité ». La conclusion tient.' },
  v_665_s2: { f: 'B', n: [N.A5, N.L3_2, N.G44('inclusion / appartenance')], c: 'ある, sens 2 « Posséder », est sans catégorie. Le sens 1 de la même ENTRY, « Tenir », est lui aussi sans catégorie (audité à part).', v: 'L', m: 'La fiche décrit, « par extension », le fait « de posséder un objet ou un sentiment » ; l\'exemple illustre le sens 1. Un objet et un sentiment relèvent de domaines différents : aucune catégorie ne couvre ce que l\'on possède, et la possession elle-même n\'en a pas. La raison de D1311 tient.' },
  // ---- C · événement, processus ----
  v_524_s1: { f: 'C', n: [N.A5, N.L3_2, N.DIM5], c: '変える « Changer » (transitif) est sans catégorie. Aucun sens publié ne range le changement dans un domaine.', v: 'L', m: 'La fiche décrit « un changement d\'état, de condition, de statut ou de temps » ; l\'exemple dit « je vais devenir médecin ». La fiche énumère elle-même quatre domaines : aucun ne décrit le sens. A2-DIM a examiné la transformation comme famille et ne l\'a pas promue. La raison de D1321 tient. Le verdict ne dépend pas de la fonction `aspect`, non définie.' },
  v_560_s1: { f: 'C', n: [N.A5, N.L3_2], c: '消す « Éteindre » et 付ける « Allumer » (transitifs) sont sans catégorie. 電気, sens 2 « Lumière », est en habitat › équipements domestiques : c\'est l\'éclairage, un objet.', v: 'L', m: 'La fiche décrit « une lumière, un feu ou une source d\'énergie » qui « s\'éteint de lui-même » ; l\'exemple dit « la lumière de la pièce s\'est éteinte ». L\'exemple porte sur un éclairage, mais la fiche couvre aussi le feu et toute source d\'énergie : la catégorie de l\'éclairage domestique serait trop étroite. La raison de D1185 tient.' },
  v_560_s2: { f: 'C', n: [N.A5, N.L3_2], c: '出る, sens 3 « Apparaître », son contraire, est sans catégorie. « Sens et perception › vue » nomme la perception, non le fait de cesser d\'être visible.', v: 'L', m: 'La fiche dit aussi « qu\'une chose / personne disparaît de la vue » ; l\'exemple illustre le sens 1. Disparaître n\'est pas percevoir : la catégorie de la vue décrirait celui qui regarde, non ce qui disparaît. Aucun domaine ne nomme l\'apparition ni la disparition. La raison de D1186 tient.' },
  v_579_s1: { f: 'C', n: [N.A5, N.L3_2, N.G44('transitif / intransitif')], c: '閉める « Fermer » (transitif) et 開く « S\'ouvrir » sont sans catégorie. ドア, 戸, 窓 sont en environnement construit › éléments architecturaux › portes et fenêtres : ce sont les objets.', v: 'L', m: 'La fiche décrit « une porte, une fenêtre ou un magasin » qui « se ferme de lui-même ou est fermé » ; l\'exemple dit « la porte s\'est fermée ». Le magasin qui ferme sort du domaine des portes et fenêtres : ranger le verbe avec ces objets ferait du contexte d\'usage un domaine, ce qu\'A2-L3 écarte (§7, règle 1). La raison de D1178 tient.' },
  v_710_s1: { f: 'C', n: [N.A5, N.L3_2, N.G44('transitif / intransitif')], c: '開ける « Ouvrir » (transitif) et 閉まる « Se fermer » sont sans catégorie.', v: 'L', m: 'La fiche décrit « une porte, une fenêtre, un magasin ou un contenant qui s\'ouvre » ; l\'exemple dit « la porte s\'ouvre ». D1169 l\'écrit : « portes et fenêtres » ne couvrirait ni le magasin ni le contenant. Aucun domaine ne nomme l\'ouverture. La raison tient.' },
  v_80_s2: { f: 'C', n: [N.A5, N.L3_2, N.L3r6], c: 'Le sens 1 de la même ENTRY, « Se couvrir (le ciel) », est en monde naturel › météo › nuages. Aucun autre sens publié ne décrit la buée.', v: 'L', m: 'La fiche dit que le verbe désigne aussi, « par extension », le fait « qu\'une surface vitrée ou des lunettes s\'embuent » ; l\'exemple illustre le sens 1. La buée sur une vitre n\'est pas un phénomène du ciel : la catégorie météo du sens 1 ne s\'étend pas à ce sens, et aucun domaine ne nomme ce phénomène. La raison de D0466 tient.' },
  // ---- D · fiche qui déborde un domaine ----
  v_163_s1: { f: 'D', n: [N.A5, N.L3_2, N.L3r6, N.G11], c: 'する, sens 2 « Coûter (pour un prix) », est en économie et commerce › prix et valeur économique › prix : sa fiche ne parle que d\'« un montant financier ». 高い est scindé en « Haut » et « Cher ». かかる garde un sens unique pour le temps et l\'argent.', v: 'L', m: 'La fiche décrit « l\'exigence ou la consommation d\'une ressource », « une notion de durée temporelle ou un montant financier » ; l\'exemple porte sur le temps (« il faut une heure »). Le sens publié réunit les deux ressources : la durée relèverait du temps, le coût de l\'économie, et ni l\'une ni l\'autre catégorie ne décrit le sens entier. Une catégorie ne s\'impose pas quand la fiche déborde son domaine (doctrine du lot 19). La raison de D1344 tient.', r: 'Ce `null` découle du choix de garder un seul sens (D1343). Si le sens était scindé comme celui de 高い, chaque moitié aurait une catégorie. Le découpage n\'est pas l\'objet de cet audit ; je le signale au volet 1.' },
  v_496_s1: { f: 'D', n: [N.A5, N.G44('validité / adéquation'), N.G11], c: '違う, sens 2 « Être incorrect », porte le pôle opposé du même axe et est sans catégorie. 大体 « À peu près » est en nombres et quantification › approximation quantitative : sa fiche ne parle que de quantité.', v: 'L', m: 'La fiche décrit « une mesure, une heure, une quantité ou une coïncidence » qui « correspond parfaitement » ; l\'exemple dit « il est exactement dix heures ». Quatre domaines sont nommés par la fiche même : aucun ne décrit le sens, que porte la dimension `exactitude` (D1561). La raison de D1562 tient.' },
  v_675_s1: { f: 'D', n: [N.A5, N.L3_2, N.G11], c: '先, sens 2 « D\'abord », est en temps › chronologie › avant / après ; 初めて est en temps › chronologie › succession : leurs fiches ne parlent que du temps. 次 est le seul de ces mots dont la fiche nomme aussi l\'ordre et l\'espace.', v: 'L', m: 'La fiche décrit « ce qui vient immédiatement après dans l\'ordre, le temps ou l\'espace » ; l\'exemple dit « je descends à la prochaine gare », une succession dans une ligne, non dans le temps. La catégorie « succession » appartient au temps : elle ne décrirait qu\'un des trois domaines que la fiche nomme. La raison de D1351, arbitrée au lot 20, tient.' },
  // ---- E · また, sens 2 ----
  v_500_s2: {
    f: 'E', n: [N.A5fn, N.A9_41, 'A2-LING-v1, §5 : « fonction discursive ≠ domaine Communication ».'], v: 'F',
    c: 'Les sens de liaison publiés (しかし, でも, それから, そうして, では, それでは, じゃあ, じゃ) sont sans catégorie et portent `connecteur` : leur `null` ne produit aucun avertissement.',
    m: 'La fiche dit que また sert « à lier des arguments ("de plus") ». Le `category: null` est juste : une fonction discursive ne fait pas un domaine. Mais il n\'est aujourd\'hui justifié que par une décision `categorie-nulle` (D1380), parce que la fonction manquait. Avec `connecteur`, retenu à l\'arbitrage de la tranche des `type-nul`, la fonction justifie directement l\'absence de catégorie (A5, §2 ; A9, §4.1), comme pour les autres sens de liaison.',
    k: 'La même que pour le `type-nul` de ce sens, déjà retenue : `linguistic_functions.pragmatic_discourse` : `[]` → `["connecteur"]`. `category` reste `null`. Une seule correction pour les deux avertissements.'
  }
};

const FAM = { A: 'A · Personnes désignées sans domaine (8 cas)', B: 'B · États (8 cas)', C: 'C · Événements et processus (6 cas)', D: 'D · Fiches qui débordent un domaine (3 cas)', E: 'E · また, sens 2 (1 cas)' };
const ids = Object.keys(V);
const cases = ids.map((id) => {
  const e = vocab.find((x) => x.senses.some((s) => s.id === id));
  const s = e.senses.find((x) => x.id === id);
  const num = Number(id.split('_s')[1]);
  const srcId = `n5_v_${e.id.slice(2)}`;
  const d = journal.find((x) => x.entry === srcId && x.kind === 'categorie-nulle' && x.field === `sens ${num} · category`);
  if (!known.some((w) => w.code === 'categorie-nulle' && w.where.endsWith(` ${id}`))) throw new Error(`pas un categorie-nulle : ${id}`);
  if (!d) throw new Error(`décision introuvable : ${id}`);
  return { id, e, s, num, srcId, f: sources.get(srcId), d, v: V[id] };
});
const tot = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, cases.filter((c) => c.v.v === k).length]));
if (cases.length !== 26 || tot.L + tot.F + tot.C + tot.N !== 26) throw new Error('26 cas attendus');

let md = readFileSync(outFile, 'utf8').replace(/\n+$/, '\n');
const P = (t = '') => { md += `${t}\n`; };
P();
P('---');
P();
P('# Tranche 2 · `categorie-nulle`, première tranche : 26 cas');
P();
P('**Statut** : **proposition, non arbitrée.** Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n\'est modifié.');
P('**Reste à faire** : 94 `categorie-nulle`, en tranches suivantes.');
P();
P('## T2.1 Résultat de la tranche');
P();
P('| Classement | Cas | Sens |');
P('|---|---|---|');
for (const k of ['L', 'F', 'C', 'N']) P(`| **${k}** | ${tot[k]} | ${cases.filter((c) => c.v.v === k).map((c) => `\`${c.id}\` ${c.e.word}`).join(' ; ') || '—'} |`);
P('| **Total** | 26 | L + F + C + N = 26 |');
P();
P('**Cumul du volet 2 à ce stade** : 27 `type-nul` arbitrés (L = 24, F = 1, C = 2, N = 0) et 26 `categorie-nulle` proposés, soit 53 cas sur 147.');
P();
P('- **Deux corrections nouvelles sont proposées** (皆 et 皆さん) ; la troisième (また, sens 2) est la correction déjà retenue. Aucune n\'est faite.');
P('- **Aucun N.**');
P(`- **${cases.filter((c) => c.v.r).length} fiches portent une réserve** : ${cases.filter((c) => c.v.r).map((c) => `\`${c.id}\` ${c.e.word}`).join(' ; ')}.`);
P();
P('## T2.2 Composition et méthode');
P();
P('La tranche réunit quatre familles du criblage (rapport de criblage, annexe D), prises en entier : « personne générique » (8), « état général » (8), « événement, processus ou phénomène général » (6), « fiche qui déborde un domaine » (3) ; et le `categorie-nulle` de また, sens 2, demandé à part.');
P();
P('Pour chaque cas, individuellement : fiche source entière et exemple ; sens publié et autres sens de l\'ENTRY ; décision `categorie-nulle` et décisions voisines ; A5, A2-L3-v1 (§2, §5 à §7) et A2-GLOBAL-v1 (§4.4, §10, §11), A2-DIM-v1 et A9 selon le cas ; sens comparables publiés. L\'arbre des catégories d\'A2-L3 (§5) a été relu pour chaque sens, à la recherche d\'une catégorie qui le décrirait.');
P();
P('## T2.3 Ce que la lecture par famille fait apparaître');
P();
P('**La formule de la raison n\'est pas toujours le bon fondement.** La liste des éléments hors hiérarchie (A2-L3 §6, A2-GLOBAL §4.4) nomme la « personne générique », l\'« action générique », la « propriété générale », et des notions comme « identité / différence » ou « possibilité / nécessité ». Elle ne contient ni « état général » ni « événement général », que treize raisons de cette tranche emploient. Pour ces treize cas, le `null` a donc été vérifié autrement, sens par sens :');
P();
P('- par un élément de la liste que la raison ne nommait pas : la différence (違う, sens 1), la validité (違う, sens 2), la nécessité (要る) ;');
P('- ou par l\'absence de toute catégorie qui décrive le sens, après relecture de l\'arbre d\'A2-L3 : l\'existence, la possession, le changement, l\'ouverture.');
P();
P('Dans les treize cas la conclusion tient ; c\'est sa formulation qui est imprécise. Je le signale sans en faire un écart : aucune donnée n\'est en cause.');
P();
P('**« Personne générique » a été étendue à des ensembles.** Six des huit cas désignent une personne sans domaine, et sont L. Les deux autres, 皆 et 皆さん, désignent tous les membres d\'un groupe. Le lot 24 a rangé 大勢, « un nombre élevé de personnes », dans la quantité : je propose le même traitement par la totalité, que le registre nomme. C\'est la seule divergence entre lots trouvée dans cette tranche.');
P();
P('**Une fiche qui nomme elle-même plusieurs domaines** (かかる, ちょうど, 次, mais aussi なる et 大丈夫) fonde un `null` plus solidement qu\'une formule générale : la fiche dit pourquoi aucun domaine ne suffit.');
P();
P('## T2.4 Corrections proposées');
P();
P('| Sens | Classement | Correction proposée | Statut |');
P('|---|---|---|---|');
for (const c of cases.filter((x) => x.v.k)) P(`| \`${c.id}\` ${c.e.word} « ${c.s.meaning.primary} » | ${c.v.v} | ${c.v.k.split('. ')[0]}. | ${c.id === 'v_500_s2' ? 'déjà retenue (arbitrage de la tranche 1)' : 'nouvelle, à arbitrer'} |`);
P();
P('## T2.5 Les 26 fiches d\'audit');
P();
for (const fam of Object.keys(FAM)) {
  P(`### ${FAM[fam]}`);
  P();
  for (const c of cases.filter((x) => x.v.f === fam)) {
    const { e, s, f, d, v } = c;
    P(`#### \`${c.id}\` · ${e.word} (${e.readings.find((r) => r.default)?.kana}) · « ${s.meaning.primary} » — **${v.v}**`);
    P();
    P(`- **Fiche source** (\`${c.srcId}\`, ${f.type}) : traductions « ${[f.meanings.primary, ...(f.meanings.secondary ?? [])].join(' ; ')} ». Nuance : « ${strip(f.nuance)} » Exemple : « ${strip(f.example?.japanese)} » — « ${strip(f.example?.french)} »`);
    P(`- **État publié** : sens ${c.num} sur ${e.senses.length} ; traduction « ${s.meaning.primary} »${s.meaning.alternatives?.length ? ` (${s.meaning.alternatives.join(', ')})` : ''} ; catégorie \`null\` ; type \`${s.semantic_type}\` ; dimensions ${s.dimensions.length ? s.dimensions.map((x) => `\`${x.axis}:${x.pole}\``).join(', ') : 'aucune'} ; fonctions ${fnOf(s).length ? fnOf(s).join(', ') : 'aucune'} ; classe \`${e.linguistic.grammatical_class}\`.${e.senses.length > 1 ? ` Autres sens : ${e.senses.filter((x) => x.id !== c.id).map((x) => `« ${x.meaning.primary} » (\`${cat(x.category)}\`, \`${x.semantic_type}\`)`).join(' ; ')}.` : ''}`);
    P(`- **Justification historique** : ${d.id.replace('A2-04-', '')} (lot ${d.lot.replace('lot-', '')}) : « ${strip(d.reason)} »`);
    P(`- **Normes appliquées** : ${v.n.join(' ')}`);
    P(`- **Comparables examinés** : ${v.c}`);
    P(`- **Verdict proposé** : **${v.v}**.`);
    P(`- **Motivation** : ${v.m}`);
    if (v.k) P(`- **Correction proposée** : ${v.k}`);
    if (v.r) P(`- **Réserve** : ${v.r}`);
    P();
  }
}
P('## T2.6 Complétude');
P();
P(`Contrôle par script : les 26 sens de cette tranche portent chacun un avertissement \`categorie-nulle\` de l'inventaire et ont chacun une décision de journal de cette nature. L = ${tot.L}, F = ${tot.F}, C = ${tot.C}, N = ${tot.N} ; total 26.`);
writeFileSync(outFile, md);
console.log(`tranche ajoutée : L=${tot.L} F=${tot.F} C=${tot.C} N=${tot.N} ; ${md.split('\n').length} lignes`);
