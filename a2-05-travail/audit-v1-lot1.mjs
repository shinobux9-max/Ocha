// A2-05 · volet 1 · lot 1 : points de contrôle transversaux T1 à T8 (19 SENSE). Lecture seule sur les données.
// Usage : node audit-v1-lot1.mjs <racine du dépôt>   (réécrit docs/rapports/etape2-A2-05-coherence-retroactive.md)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const vocab = read('data/n5/vocab.json');
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const prov = read('a2-05-travail/provenance/resultat.json');
const crib = read('a2-05-travail/criblage/resultat.json');
const audit = readFileSync(join(root, 'docs/rapports/etape2-A2-05-audit-null.md'), 'utf8');
const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/<\/?[A-Za-z]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');

// v : 'conforme' ou 'écart' ; k : modification proposée (écart seulement) ; b : relevés du criblage traités (option b)
const F = [
  { t: 'T1', id: 'v_455_s2', q: 'La catégorie « états psychologiques » décrit-elle ce sens ?', v: 'conforme',
    m: 'La fiche dit que l\'adjectif qualifie, « par extension le caractère enjoué et positif d\'une personne » ; l\'exemple illustre le sens 1. La fiche fusionnée de 明い dit « une personnalité enjouée, optimiste et souriante », et un ancien exemple « c\'est quelqu\'un de toujours joyeux ». « Enjoué » et « positif » décrivent une disposition d\'humeur, ce que la personne ressent et montre habituellement : c\'est bien un état psychologique, tenu pour durable. La fiche est ici plus précise que celle de 冷たい, arbitré L parce qu\'elle ne décrivait pas assez précisément un tel état. La catégorie convient ; « Émotions › Joie & plaisir » décrirait une joie du moment, non un caractère.',
    b: 'C1-g (seul sens de sa famille source « luminosité » rangé sous l\'être humain) : conséquence normale de la polysémie, le sens 1 décrivant un lieu et celui-ci une personne ; aucun écart.' },
  { t: 'T1', id: 'v_4_s2', q: 'La catégorie « états psychologiques » décrit-elle ce sens ?', v: 'conforme',
    m: 'La fiche dit que l\'adjectif qualifie aussi « la noirceur d\'une personnalité », et sa traduction donne « Triste (personnalité, ambiance) » ; l\'exemple illustre le sens 1. Elle rattache l\'obscurité à la tristesse et à la mélancolie : une disposition d\'humeur, comme pour 明るい, dont ce sens est le pendant. La catégorie convient. « Émotions › Tristesse » existe, mais décrirait la tristesse éprouvée à un moment ; la fiche parle d\'une personnalité.',
    r: 'La traduction de la source, « Triste (personnalité, ambiance) », et la nuance publiée (« une personnalité ou une ambiance ; se dit aussi d\'un avenir incertain ») débordent la personne : une ambiance ou un avenir n\'ont pas d\'état psychologique. La personnalité reste le premier référent que la fiche nomme, et je tiens la catégorie pour conforme ; si l\'arbitrage appliquait ici la doctrine du lot 19 (une catégorie ne s\'impose pas quand la fiche déborde son domaine), le cas deviendrait un écart, vers `category: null`. Aucun ancien exemple n\'illustre ce sens.' },
  { t: 'T1', id: 'v_1_s2', q: 'La catégorie « états psychologiques » décrit-elle ce sens ?', v: 'conforme',
    m: 'La fiche dit que l\'adjectif décrit aussi « une personnalité franche, souriante et pleine de vitalité » ; l\'exemple illustre le sens 1. Deux des trois termes disent une disposition d\'humeur (souriante, pleine de vitalité) ; « franche » dit une conduite. La catégorie décrit donc l\'essentiel du sens, moins nettement que pour 明るい et 暗い. Aucune autre catégorie ne le décrit mieux, et le retirer ferait d\'un sens lexical plein un `null` par difficulté de classement (A2-GLOBAL, §10).',
    r: 'C\'est le plus fragile des trois : si l\'arbitrage tient que « franche » fait de ce sens un jugement de conduite, comme 清い ou まっすぐ, il deviendrait un écart, à corriger vers `category: null`. Je ne le propose pas.' },
  { t: 'T2', id: 'v_221_s1', q: 'La catégorie « entretien domestique › nettoyage » décrit-elle une fiche qui nomme plusieurs domaines ?', v: 'écart',
    m: 'La fiche décrit « l\'action de laver des objets, des vêtements ou des aliments avec de l\'eau » ; l\'exemple dit « je lave les assiettes après le repas », et ses trois anciens exemples portent sur des assiettes et des tasses, sur une chemise, et sur les mains (« je me lave toujours les mains avec du savon »). La nuance publiée de l\'ENTRY le dit elle-même : « les mains, la vaisselle, les légumes ». La fiche couvre donc quatre domaines d\'A2-L3 : le nettoyage (vaisselle), la lessive (chemise), la toilette corporelle (mains) et les aliments. « Entretien domestique › nettoyage » n\'en nomme qu\'un : c\'est un contexte d\'emploi, non le concept (A2-L3, §7, règle 1), qui est « laver à l\'eau », quelle que soit la chose lavée. C\'est exactement le cas de 磨く, arbitré L au volet 2 parce qu\'« aucun domaine ne couvre les deux » (D1238), et la doctrine du lot 19 : une catégorie ne s\'impose pas quand la fiche déborde son domaine. La catégorie date du lot 03, avant ces arbitrages ; aucune décision de journal ne la motive (la seule décision de l\'ENTRY, D0291, est un abandon de traductions). Deux fiches de même structure sont traitées différemment : application incohérente entre lots.',
    code: 'E3', k: '`category` : `habitat_vie_domestique › entretien_domestique › nettoyage` → `null` (A5), motif : action générale, la fiche couvrant la vaisselle, le linge, les mains et les aliments. **Effet : un avertissement `categorie-nulle` de plus**, à inscrire à l\'inventaire avec cette justification. Le type `action` n\'est pas touché.',
    b: 'C1-b (la famille source « vie quotidienne » est surtout rangée sous l\'être humain) : aucune catégorie de l\'être humain ne convient mieux, les mains n\'étant qu\'un des emplois ; ce relevé ne fonde pas un autre classement. C1-h (catégorisé alors que 磨く ne l\'est pas) : **fondé**, c\'est l\'écart retenu ci-dessus.',
    r: 'Issue contraire, à l\'arbitrage : garder la catégorie, en tenant que « Nettoyage » nomme l\'action de laver elle-même et que l\'exemple principal de la fiche (la vaisselle) en est le cœur. Elle laisserait 洗う et 磨く traités différemment, et il faudrait alors le motiver par les fiches. Le niveau 2 seul (`entretien_domestique`) couvrirait la vaisselle et le linge, non les mains ni les aliments.' },
  { t: 'T3', id: 'v_628_s1', q: 'La catégorie « interactions sociales » décrit-elle ce sens, sans symétrie imposée avec 一人 ?', v: 'conforme',
    m: 'La fiche décrit « l\'action de faire quelque chose ensemble ou d\'être accompagné » ; l\'exemple dit « je vais à la gare ensemble avec un ami ». Faire une chose avec quelqu\'un est une interaction entre personnes : la catégorie décrit le sens, et la fiche comme l\'exemple ne portent que sur des personnes (D1415). Lu pour lui-même, ce sens est conforme. 一人 « Seul », arbitré L, n\'y change rien : l\'absence de compagnie n\'est pas une interaction, la compagnie en est une. La divergence relevée au volet 2 est donc une différence justifiée par les fiches, non une incohérence.',
    b: 'C7-c (« ensemble », fonction `quantificateur` non examinée avant A9) : le mot ne donne l\'étendue d\'aucun référent ; il dit une manière d\'être avec quelqu\'un ; aucune fonction.' },
  { t: 'T4', id: 'v_663_s3', q: 'La catégorie « totalité et partie › reste » tient-elle pour un sens attesté par une seule traduction ?', v: 'conforme',
    m: 'Ce sens n\'est attesté que par la traduction « Le reste » ; la nuance et l\'exemple de la fiche portent sur le temps. Le lot 13 l\'a gardé comme troisième référent (révision 5.14b, D0951 et D0953), en tirant la catégorie « du seul libellé, sans information extérieure ». La question posée ici n\'est pas le découpage, qui a été arbitré, mais la catégorie : pour un sens « Le reste », A2-L3 a une catégorie qui porte ce nom, et aucune autre ne le décrit. Elle convient, autant que le sens est établi. La différence avec 他, arbitré L, tient aux fiches : celle de 他 décrit l\'altérité, et « Le reste » n\'y est qu\'une traduction parmi d\'autres.',
    b: 'C3-0 (`concept_abstrait`, examen imposé) : le reste d\'un tout n\'est ni une entité désignée, ni une quantité chiffrée ; `quantite_valeur`, que portent 半 et 半分, dirait une grandeur ; le type est tenable, sans être un type de secours, mais la fiche ne donne rien pour le vérifier davantage. C1-g (seul sens de sa famille source « temps » rangé sous les nombres) : conséquence de la polysémie ; aucun écart.',
    r: 'La catégorie et le type reposent sur un seul mot de la fiche. C\'est la fragilité du sens lui-même, que D0953 disait déjà ; elle n\'appelle aucune correction de catégorie.' },
  { t: 'T5', id: 'v_642_s2', q: 'Une décision explicite autorisait-elle la particule に et les nuances publiées ?', v: 'écart',
    m: 'Recherche faite dans le journal entier et dans le rapport du lot 04. **Pour la particule** : une décision existe, D0337 (validée), qui écrit « prendre part à quelque chose (に, documenté par 出ます) ». Vérification faite sur les sources figées, la fiche de 出ます donne pour particules を et から, et ni sa nuance, ni son exemple, ni ses anciens exemples ne montrent に pour ce à quoi l\'on assiste (に n\'y marque que l\'heure) ; tous ses exemples disent « sortir de » : la provenance que la décision affirme ne se retrouve pas. **Pour la nuance** (« 授業に出る », « 会議に出る ») : aucune décision ne l\'autorise ; D0338 ne fait que citer « (cours, réunion) » ; ces deux exemples ne sont dans aucune source. Les deux éléments ont été ajoutés au lot 04, avant que les lots ne fixent qu\'aucune particule n\'est tirée d\'un exemple (lot 18) et que rien n\'est ajouté par connaissance extérieure. Le sens lui-même est attesté (« participer à un événement », « Assister à »).',
    code: 'E2', k: '`particles` : `["に"]` → `[]` ; `nuance` : remplacée par ce que dit la fiche, « Participer à un événement. ». Le sens, sa traduction, son type et son `category: null` (L) ne sont pas touchés.',
    r: 'Autre issue possible, à l\'arbitrage : tenir ces éléments pour utiles à l\'apprenant et les régulariser par une décision nouvelle qui en assume l\'origine. Ce serait une exception à « la fiche source décide », et elle vaudrait alors pour les cas semblables que le criblage relève.' },
  { t: 'T5', id: 'v_642_s3', q: 'Une décision explicite autorisait-elle la particule が et la nuance publiée ?', v: 'écart',
    m: '**Pour la particule** : D0337 écrit « apparaître (が) », sans dire d\'où elle vient ; les fiches de 出る et de 出ます donnent を et から, et aucun exemple ne montre が avec ce verbe au sens d\'apparaître. **Pour la nuance** (« 月が出る : la lune apparaît ») : aucune décision ne l\'autorise, et cet exemple n\'est dans aucune source. Le sens est attesté par la traduction « Apparaître » et par « se manifester ».',
    code: 'E2', k: '`particles` : `["が"]` → `[]` ; `nuance` : remplacée par ce que dit la fiche, « Se manifester. ». Le sens, son type `evenement` et son `category: null` (L) ne sont pas touchés.',
    r: 'Même autre issue que pour le sens 2. Le sens 1 de la même ENTRY porte lui aussi deux exemples de nuance absents des sources (relevé du criblage) : il est hors du périmètre, sans verdict.' },
  { t: 'T5', id: 'v_266_s2', q: 'Une décision explicite autorisait-elle la nuance publiée ?', v: 'écart',
    m: 'La particule を de ce sens est celle de la fiche. **Pour la nuance** (« 笛を吹く : jouer de la flûte ») : aucune décision ne l\'autorise ; D0471 à D0473 n\'en parlent pas, et la flûte n\'est dans aucune source ; la fiche dit seulement « jouer d\'un instrument à vent », et un ancien exemple parle de souffler sur une soupe. L\'exemple a été ajouté au lot 07.',
    code: 'E2', k: '`nuance` : remplacée par ce que dit la fiche, « Souffler de l\'air ; jouer d\'un instrument à vent. ». Le sens, sa particule et son `category: null` (L) ne sont pas touchés.',
    r: 'Même autre issue que pour 出る. Le sens 1 de la même ENTRY porte la particule が, absente de la fiche, et une nuance absente des sources (relevés du criblage) : il est hors du périmètre, sans verdict.' },
  { t: 'T6', id: 'v_425_s1', q: 'Le type `concept_abstrait` décrit-il ce sens ?', v: 'conforme',
    m: 'La fiche décrit « une progression lente ou un changement qui s\'effectue étape par étape au fil du temps ». Contrôlé seul contre A2-ST : le sens ne désigne ni une entité, ni une occurrence ; `propriete` suppose une caractéristique « attribuable à une entité », et la fiche attribue la progressivité au changement lui-même, non à ce qui change ni à un agent. `concept_abstrait` (« concept non matériel qui ne relève pas plus précisément d\'un autre type ») est tenable et n\'est pas ici un type de secours.',
    r: 'ゆっくり et よく, sens 2, sont `propriete` : leurs fiches rapportent la manière à celui qui agit ou à l\'action faite. Les types diffèrent parce que les fiches diffèrent ; aucun type commun n\'est imposé.' },
  { t: 'T6', id: 'v_504_s1', q: 'Le type `propriete` décrit-il ce sens ?', v: 'conforme',
    m: 'La fiche décrit « un déplacement à faible vitesse » ; l\'exemple dit « marchez lentement ». La vitesse est une caractéristique attribuable à ce qui se déplace : c\'est la définition de `propriete`, et c\'est le type de 遅い « Lent » et de 速い « Rapide ». Conforme.',
    b: 'C1-h (catégorisé en `espace › vitesse` alors que le sens 2 ne l\'est pas) : écart justifié ; la fiche distingue expressément la vitesse d\'un déplacement et le fait d\'agir sans se presser, et le sens 2 est arbitré L. La catégorie « Vitesse » nomme exactement ce sens.' },
  { t: 'T6', id: 'v_504_s2', q: 'Le type `propriete` décrit-il ce sens ?', v: 'conforme',
    m: 'La fiche décrit « le fait d\'agir sans se presser, de se détendre et de prendre son temps ». La manière est ici rapportée à celui qui agit : c\'est une caractéristique de sa façon de faire, attribuable à une entité. `propriete` est tenable (D1404 : « une caractéristique de la manière d\'agir »). Le verdict L de ce sens n\'est pas rouvert.' },
  { t: 'T6', id: 'v_506_s2', q: 'Le type `propriete` décrit-il ce sens ?', v: 'conforme',
    m: 'La fiche décrit « la réussite d\'une action faite de manière approfondie ou satisfaisante ». Le sens dit la qualité de ce qui est fait : une caractéristique attribuée à l\'action et, par elle, à son auteur. `propriete` est tenable, comme pour いい « Bon », dont la fiche dit ce sens issu. Le verdict L de ce sens n\'est pas rouvert.' },
  { t: 'T7', id: 'v_461_s2', q: 'La traduction principale « Grossier (langage) » rend-elle le sens de la fiche ?', v: 'conforme',
    m: 'La traduction est celle de la source, mot pour mot. La nuance de la fiche ajoute « ou une action malhonnête », que la nuance publiée reprend. La traduction principale est donc fidèle à la fiche ; elle n\'en dit qu\'une partie, parce que la source elle-même ne traduit que cette partie.',
    r: '« Malhonnête » n\'est attesté que par la nuance. L\'ajouter en autre traduction serait possible (principe du lot 16 : une traduction naturelle lorsque la fiche l\'atteste) ; je ne le propose pas d\'office.' },
  { t: 'T7', id: 'v_539_s2', q: 'La traduction principale « Raccrocher (un téléphone) » rend-elle le sens de la fiche ?', v: 'conforme',
    m: 'Les deux traductions publiées, « Raccrocher (un téléphone) » et « Éteindre (un contact) », sont celles de la source ; la nuance dit « couper une connexion / un appel ». La traduction principale est fidèle ; l\'ordre retenu (D1197) met l\'appel en premier, alors que la source place « Éteindre (un contact) » avant.',
    r: 'L\'ordre des deux traductions est un choix du lot 18, non une infidélité. L\'asymétrie avec かける, sens 1, reste documentée.' },
  { t: 'T7', id: 'v_608_s2', q: 'La traduction principale « Donner (à des plantes, des animaux) » rend-elle le sens de la fiche ?', v: 'conforme',
    m: 'La traduction est celle de la source, mot pour mot. La nuance de la fiche ajoute « quelqu\'un de inférieur », que la nuance publiée reprend. Fidèle.' },
  { t: 'T7', id: 'v_265_s2', q: 'La traduction principale « Froid (attitude) » rend-elle le sens de la fiche ?', v: 'écart',
    m: 'La source donne pour ce sens une seule traduction : « Insensible (figuré) ». Aucune des deux traductions publiées n\'est dans la fiche : « Froid (attitude) » est construit sur la traduction du sens 1, et « Distant » remplace « Insensible » (D0482 : « insensible est rendu par distant »). Le mot que la fiche atteste a donc disparu des traductions, au profit d\'un mot qu\'elle ne contient pas. C\'est contraire à la doctrine des lots (« la fiche source décide » ; une traduction naturelle seulement « lorsque la fiche l\'atteste »), fixée après le lot 07.',
    code: 'E2', k: '`meaning.primary` : « Froid (attitude) » → « Insensible (figuré) », directement attestée ; `meaning.alternatives` : `["Distant"]` → `[]`. **Correction arbitrée, plus complète que la proposition initiale** (qui gardait la traduction principale et remplaçait seulement « Distant » par « Insensible »). `category: null` (L), `semantic_type: propriete` et le découpage déjà arbitré sont conservés.',
    r: 'La nuance publiée de ce sens (« 冷たい人 ») est, elle aussi, absente des sources : relevé du criblage, hors de la question posée, sans verdict.' },
  { t: 'T7', id: 'v_664_s2', q: 'La traduction principale « Partie » rend-elle le sens de la fiche ?', v: 'conforme',
    m: 'La traduction est celle de la source ; la nuance dit « un point/une partie spécifique d\'une chose ou d\'une situation », que la nuance publiée reprend. Fidèle.',
    r: '« Point », premier mot de la nuance, n\'est pas une traduction de la source. Il pourrait être ajouté en autre traduction ; je ne le propose pas d\'office.' },
  { t: 'T8', id: 'v_510_s1', q: 'L\'axe réel / fictif décrit-il aussi directement le sens ?', v: 'conforme',
    m: 'La fiche décrit « ce qui est réel, authentique ou vrai » ; l\'exemple dit « est-ce vrai ? », et un ancien exemple « il n\'a pas dit la vérité ». L\'axe réel / fictif d\'A2-DIM oppose ce qui existe à ce qui est imaginé ; « réel » est ici pris au sens d\'« authentique », par opposition au faux et au mensonge, ce que montrent les exemples. L\'axe vrai / faux décrit directement le sens ; l\'axe réel / fictif n\'en serait qu\'un voisin. Aucune dimension n\'est ajoutée par proximité. Le verdict L de ce sens n\'est pas rouvert.' }
];

const LISTE = ['v_455_s2', 'v_4_s2', 'v_1_s2', 'v_221_s1', 'v_628_s1', 'v_663_s3', 'v_642_s2', 'v_642_s3', 'v_266_s2', 'v_425_s1', 'v_504_s1', 'v_504_s2', 'v_506_s2', 'v_461_s2', 'v_539_s2', 'v_608_s2', 'v_265_s2', 'v_664_s2', 'v_510_s1'];
const OPTION_B = ['v_455_s2', 'v_221_s1', 'v_628_s1', 'v_663_s3', 'v_504_s1'];
const MODS_V2 = ['v_500_s2', 'v_65_s2', 'v_696_s1', 'v_606_s1', 'v_687_s1', 'v_528_s1', 'v_671_s1', 'v_287_s1', 'v_500_s1', 'v_503_s1'];
const ids = F.map((f) => f.id);
if (JSON.stringify(ids) !== JSON.stringify(LISTE) || new Set(ids).size !== 19) throw new Error('les fiches ne sont pas exactement la liste fermée');
for (const f of F) { if ((f.v === 'écart') !== Boolean(f.k)) throw new Error(`modification incohérente : ${f.id}`); if (OPTION_B.includes(f.id) !== Boolean(f.b)) throw new Error(`option (b) : ${f.id}`); }
if (ids.some((id) => MODS_V2.includes(id))) throw new Error('double comptage avec les modifications du volet 2');
// verdicts du volet 2 : inchangés, recomptés
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9 || tot2.N !== 0) throw new Error(`volet 2 : ${JSON.stringify(tot2)}`);
const dejaV2 = ids.filter((id) => v2.some((m) => m[1] === id));
if (dejaV2.length !== 12 || dejaV2.some((id) => v2.find((m) => m[1] === id)[2] !== 'L')) throw new Error('12 sens L attendus au volet 2');
const candidats = crib.candidats.filter((c) => !v2.some((m) => m[1] === c.id));
const retires = candidats.filter((c) => OPTION_B.includes(c.id));
if (candidats.length !== 382 || retires.length !== 5) throw new Error(`candidats : ${candidats.length}, ${retires.length}`);

const get = (id) => { const e = vocab.find((x) => x.senses.some((s) => s.id === id)); return { e, s: e.senses.find((x) => x.id === id), f: sources.get(`n5_v_${e.id.slice(2)}`) }; };
const conf = F.filter((f) => f.v === 'conforme'), ec = F.filter((f) => f.v === 'écart');
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Cohérence rétroactive — examen individuel');
P();
P('Ce rapport est le rapport du volet 1. Il est livré par lots. Les verdicts suivent le périmètre de cohérence (§5) : **conforme**, ou **écart**, avec son code (E1 contradiction avec une norme finale ; E2 justification devenue obsolète ; E3 application incohérente entre lots ; E4 compréhension incomplète de l\'architecture ; E5 point non documenté).');
P();
P('---');
P();
P('# Lot 1 · Points de contrôle transversaux T1 à T8 : 19 SENSE');
P();
P('**Date** : 2026-10-08');
P('**Statut** : **arbitré le 2026-10-08 (ChatGPT, par délégation) : 14 conformes, 5 écarts.** Les 19 verdicts proposés sont confirmés ; la correction de 冷たい, sens 2, est retenue sous une forme plus complète que la proposition. Les réserves documentées sont conservées, notamment pour 暗い, 爽やか et 後, sens 3. **Doctrine de provenance arbitrée** : aucune exception générale n\'autorise un contenu non sourcé au motif qu\'il serait linguistiquement correct ; le criblage T5 est un inventaire de signalements, non d\'erreurs ; les cas hors des 19 restent sans verdict, à trier puis à soumettre à un périmètre distinct. Périmètre accepté définitivement le 2026-10-08 (ChatGPT, par délégation) : 19 SENSE dans 17 ENTRY, avec l\'**option (b)** pour cinq sens jamais audités, dont les autres relevés du criblage sont traités ici. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n\'est modifié ; aucune correction n\'est appliquée ; aucune décision historique n\'est réécrite. **Le bilan du volet 2 est inchangé : 147 sur 147, L 136, F 2, C 9, N 0 ; ses dix modifications restent non appliquées.**');
P();
P('## L1.1 Résultat du lot');
P();
P('| Verdict | Sens | Détail |');
P('|---|---|---|');
P(`| **conforme** | ${conf.length} | ${conf.map((f) => `\`${f.id}\` ${get(f.id).e.word}`).join(' ; ')} |`);
P(`| **écart** | ${ec.length} | ${ec.map((f) => `\`${f.id}\` ${get(f.id).e.word} (${f.code})`).join(' ; ')} |`);
P('| **Total** | 19 | |');
P();
P('| Point | Question | Conclusion proposée |');
P('|---|---|---|');
P('| T1 | « états psychologiques » pour le caractère (明るい, 暗い, 爽やか) | conforme pour les trois : leurs fiches décrivent une disposition d\'humeur ; 爽やか est le plus fragile |');
P('| T2 | « nettoyage » pour 洗う | **un écart** : la fiche et ses exemples couvrent la vaisselle, le linge, les mains et les aliments, comme 磨く, arbitré L |');
P('| T3 | « interactions sociales » pour 一緒 | conforme, lu pour lui-même ; aucune symétrie avec 一人 |');
P('| T4 | « reste » pour 後, sens 3 | conforme, autant que le sens est établi |');
P('| T5 | provenance (出る sens 2 et 3, 吹く sens 2) | **trois écarts** : particules et nuances absentes des sources ; la seule décision qui en parle (D0337) affirme une provenance qui ne se retrouve pas |');
P('| T6 | type des quatre adverbes | conformes, chacun pour lui-même ; aucun type commun imposé |');
P('| T7 | fidélité des traductions principales | quatre conformes ; **un écart** : 冷たい, sens 2 |');
P('| T8 | axe réel / fictif pour 本当 | conforme : l\'axe vrai / faux décrit seul le sens directement |');
P();
P('## L1.2 Méthode');
P();
P('Pour chacun des 19 sens : fiche source entière (traductions, nuance, exemple, anciens exemples) ; état publié ; décisions de journal de l\'ENTRY ; normes (A2-L3, A2-ST, A2-DIM, A2-GLOBAL, A9, doctrines des lots) ; comparables arbitrés au volet 2, cités sans être rouverts. **Les douze sens déjà arbitrés L au volet 2 ne sont examinés que sur la question transversale ; les sept jamais audités le sont sur leur question, et cinq d\'entre eux aussi sur leurs autres relevés du criblage (option b).** Aucun sens, aucune lecture et aucune graphie n\'est créé par connaissance extérieure aux fiches.');
P();
P('## L1.3 Corrections retenues par ce lot, distinctes des dix modifications du volet 2');
P();
P('**Retenues à l\'arbitrage ; aucune n\'est exécutée.** Elles rejoignent la liste globale des corrections, à côté des dix du volet 2 et sans s\'y confondre ; elles ne font cesser aucun avertissement et ne changent aucun verdict du volet 2. **L\'une d\'elles (洗う) ajouterait un avertissement `categorie-nulle`** : l\'inventaire passerait, toutes corrections faites, de 112 à 113 `categorie-nulle`.');
P();
P('| # | SENSE | Mot | Code | Modification proposée |');
P('|---|---|---|---|---|');
ec.forEach((f, i) => P(`| V1-${i + 1} | \`${f.id}\` | ${get(f.id).e.word} « ${get(f.id).s.meaning.primary} » | ${f.code} | ${f.k.split('. ')[0]}. |`));
P();
P('Ces cinq corrections touchent cinq SENSE, dans quatre ENTRY (洗う, 出る, 吹く, 冷たい), des lots 03, 04 et 07. **Aucune ne recoupe les dix modifications du volet 2** (contrôlé par script) : celles-ci restent dix, et la liste proposée par le volet 1 en est tenue séparée.');
P();
P('## L1.4 Criblage de provenance (T5) : résultats, séparés des 19 audits');
P();
P('Criblage **factuel et exhaustif**, en lecture seule, par `a2-05-travail/criblage-provenance.mjs` ; sortie détaillée dans `a2-05-travail/provenance/resultat.json`. Il constate et compte ; **il ne juge rien, et tout cas hors des 19 reste hors périmètre, sans verdict**.');
P();
P(`**Population** : ${prov.resume.sens} sens dans ${prov.resume.entrees} ENTRY des lots (les deux ENTRY hors JLPT, sans fiche dans les sources figées, sont exclues) ; les ${prov.fusionsLues} fiches fusionnées sont lues avec l\'ENTRY qui les a reçues.`);
P();
P('**Relevé P · particules d\'un sens absentes des particules des fiches sources** : ' + prov.particules.length + ' sens.');
P();
P('| SENSE | Mot | Lot | Particule publiée, absente de la fiche | Particules de la fiche | Dans le périmètre ? |');
P('|---|---|---|---|---|---|');
for (const x of prov.particules) P(`| \`${x.sens}\` | ${x.mot} | ${x.lot.replace('lot-', '')} | ${x.particules.join(', ')} | ${x.source.join(', ') || 'aucune'} | ${ids.includes(x.sens) ? 'oui (T5)' : '**non**, sans verdict'} |`);
P();
P(`**Relevé N · mots japonais d\'une nuance absents des fiches sources et des anciens exemples** : ${prov.nuances.length} relevés (nuance de sens ou d\'ENTRY).`);
P();
P('| Lot | ' + Object.keys(prov.resume.nuancesParLot).map((l) => l.replace('lot-', '')).join(' | ') + ' |');
P('|---|' + Object.keys(prov.resume.nuancesParLot).map(() => '---').join('|') + '|');
P('| Relevés | ' + Object.values(prov.resume.nuancesParLot).join(' | ') + ' |');
P();
P('**Ce chiffre est un plafond brut, non un compte d\'anomalies.** Le script compare des chaînes : il relève aussi un mot écrit en kana dans la fiche et en kanji dans la nuance, une forme conjuguée, ou le nom d\'une autre ENTRY que la fiche cite en romaji (par exemple する et 上げる dans la nuance de やる, ou きれい dans celle de 汚い). Il faudra trier ces relevés avant d\'en lire aucun. Leur répartition est nette : ils se concentrent dans les premiers lots (lots 00 à 11), et deviennent rares à partir du lot 12.');
P();
const dansEntrees = prov.nuances.filter((x) => ids.some((i) => x.sens.startsWith(`${i.replace(/_s\d+$/, '')}_s`) || x.sens.startsWith(`${i.replace(/_s\d+$/, '')} `)));
P(`**Dans les 17 ENTRY du périmètre**, le relevé N touche : ${dansEntrees.map((x) => `\`${x.sens}\` (${x.absents.join(', ')})`).join(' ; ')}. Seuls \`v_642_s2\`, \`v_642_s3\` et \`v_266_s2\` sont examinés (T5) ; les autres sont cités pour mémoire, sans verdict.`);
P();
P('**Ce que le criblage permet de dire** : les trois sens de T5 ne sont pas isolés. Quatre particules et un grand nombre d\'exemples de nuance, surtout dans les lots 00 à 11, ne se retrouvent pas tels quels dans les sources. **La réponse donnée à T5 vaudra donc précédent** : corriger, ou régulariser par une décision qui assume l\'origine de ces éléments. Le périmètre d\'un examen de ces relevés serait à arbitrer à part.');
P();
P('## L1.5 Les 19 fiches d\'examen');
P();
let courant = '';
for (const f of F) {
  const { e, s, f: src } = get(f.id);
  if (f.t !== courant) { courant = f.t; P(`### ${f.t}`); P(); }
  P(`#### \`${f.id}\` · ${e.word} (${e.readings.find((r) => r.default)?.kana}) · « ${s.meaning.primary} » — **${f.v}${f.code ? ` (${f.code})` : ''}**`);
  P();
  P(`- **Question** : ${f.q}`);
  P(`- **Fiche source** (\`n5_v_${e.id.slice(2)}\`, ${src.type}) : traductions « ${[src.meanings.primary, ...(src.meanings.secondary ?? [])].join(' ; ')} » ; particules ${(src.particles ?? []).join(', ') || 'aucune'}. Nuance : « ${strip(src.nuance)} » Exemple : « ${strip(src.example?.japanese)} » — « ${strip(src.example?.french)} »`);
  P(`- **État publié** : sens ${f.id.split('_s')[1]} sur ${e.senses.length} ; traduction « ${s.meaning.primary} »${s.meaning.alternatives?.length ? ` (${s.meaning.alternatives.join(', ')})` : ''} ; catégorie \`${cat(s.category)}\` ; type \`${s.semantic_type}\` ; dimensions ${s.dimensions.length ? s.dimensions.map((x) => `\`${x.axis}:${x.pole}\``).join(', ') : 'aucune'} ; particules ${(s.particles ?? []).join(', ') || 'aucune'} ; nuance du sens : ${s.nuance ? `« ${s.nuance} »` : 'aucune'}.`);
  P(`- **État d'audit antérieur** : ${dejaV2.includes(f.id) ? 'volet 2, `categorie-nulle` : **L**, non rouvert' : 'jamais audité'}.`);
  P(`- **Verdict arbitré** : **${f.v}${f.code ? ` (${f.code})` : ''}**.`);
  P(`- **Motivation** : ${f.m}`);
  if (f.b) P(`- **Autres relevés du criblage (option b)** : ${f.b}`);
  if (f.k) P(`- **Modification retenue, non appliquée** : ${f.k}`);
  if (f.r) P(`- **Réserve** : ${f.r}`);
  P();
}
P('## L1.6 Complétude et absence de double comptage');
P();
P('Calculés par `a2-05-travail/audit-v1-lot1.mjs`, qui écrit ce rapport et s\'arrête au premier écart. Commande : `node a2-05-travail/audit-v1-lot1.mjs .`');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P('| Les fiches sont exactement la liste fermée du périmètre, dans son ordre | oui, 19 identifiants distincts |');
P(`| Verdicts du lot | ${conf.length} conformes, ${ec.length} écarts ; total 19 |`);
P('| Un écart a une modification proposée, et seulement lui | oui |');
P(`| Sens déjà arbitrés au volet 2 | ${dejaV2.length}, tous L, non rouverts |`);
P(`| Volet 2 recompté sur son rapport | ${v2.length} fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé |`);
P('| Sens du lot visés par l\'une des dix modifications du volet 2 | 0 : aucun double comptage |');
P('| Les cinq sens de l\'option (b) portent leurs autres relevés du criblage, et seulement eux | oui |');
P(`| Candidats du volet 1 restant à examiner | ${candidats.length} avant ce lot ; **${candidats.length - retires.length} une fois ces cinq audits validés** (${retires.map((c) => c.id).join(', ')}) ; les deux autres sens jamais audités (暗い, 爽やか) n\'étaient pas candidats au criblage |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-coherence-retroactive.md'), md);
console.log(`lot 1 écrit : ${conf.length} conformes, ${ec.length} écarts ; volet 2 ${JSON.stringify(tot2)} ; candidats ${candidats.length} -> ${candidats.length - retires.length} ; ${md.split('\n').length} lignes`);
