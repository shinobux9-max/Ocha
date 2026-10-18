// A2-05 · volet 2 · tranche 1 : rapport d'audit des 27 type-nul. Lecture seule sur les données.
// Usage : node audit-type-nul.mjs <racine du dépôt> <sortie.md>
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [root, outFile] = process.argv.slice(2);
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const journal = read('reconstruction/a2-04/journal.json');
const known = read('reconstruction/a2-04/avertissements-connus.json');
const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fnOf = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse];

// ---------- normes, citées une fois ----------
const N = {
  A6: 'A6, §2 : « `semantic_type: null` est permis lorsqu\'aucun type sémantique terminal existant ne décrit correctement la nature du sens » ; « ce n\'est jamais une échappatoire ».',
  A6corps: 'A6, §1 : お腹, « une partie du corps : `organisme_vivant` désigne l\'être vivant, pas une partie de lui », est l\'un des trois cas qui fondent l\'addendum.',
  A6kilo: 'A6, §1 : « キロ au sens "kilogramme" » et « キロ au sens "kilomètre" » sont deux des trois cas qui fondent l\'addendum ; « la mesure non plus : une unité, un instrument, une propriété mesurable ou une opération de mesure ne sont "pas automatiquement" des `quantite_valeur` ».',
  STorg: 'A2-ST-v1, §3, Organisme vivant : « un être vivant non traité comme personne humaine : animal, plante ou autre organisme ».',
  STobj: 'A2-ST-v1, §3, Objet / artefact : « objet matériel individualisable, en particulier lorsqu\'il est fabriqué, utilisé ou structuré par une fonction ».',
  STpers: 'A2-ST-v1, §3, Personne : « un individu humain désigné en tant qu\'individu, rôle, profession, relation ou statut ».',
  STlieu: 'A2-ST-v1, §3, Lieu : « espace ou emplacement conceptualisé comme lieu ».',
  STprop: 'A2-ST-v1, §3, Propriété : « caractéristique attribuable à une entité, indépendamment du fait qu\'elle soit permanente ou variable ».',
  STqv: 'A2-ST-v1, §3, Quantité / valeur : « valeur quantitative, quantité ou grandeur conceptualisée abstraitement » ; « unité, instrument, propriété mesurable et opération de mesure ne sont pas automatiquement de ce type ».',
  STabs: 'A2-ST-v1, §3, Concept abstrait : « ce type ne doit jamais devenir une catégorie de secours ».',
  ST4part: 'A2-ST-v1, §4 : « partie / totalité » n\'est pas un type sémantique ; A2-REL-v1.1 porte `part_of` / `has_part`.',
  ST4mes: 'A2-ST-v1, §4 : la « mesure » n\'est pas un type sémantique.',
  ST4mod: 'A2-ST-v1, §4 : « possibilité / impossibilité » et « nécessité » ne sont pas des types sémantiques ; A2-DIM-v1, §2, range la probabilité parmi les dimensions (modalité conceptuelle).',
  ST4fn: 'A2-ST-v1, §4 : les « fonctions grammaticales, discursives ou pragmatiques » ne sont pas des types sémantiques.',
  G13: 'A2-GLOBAL-v1, §13 : le crash-test final n\'a révélé le besoin d\'aucun nouveau type sémantique ; §15 : une anomalie est d\'abord un cas de données ou de frontière.',
  A9_42: 'A9, §4.2 : « un sens dont le contenu est le rôle fonctionnel lui-même n\'a en général aucun type terminal applicable : `semantic_type: null`, justifié par une décision `type-nul` (A6), comme 何, 大変 "très" et また, sens 2 ».',
  A9_31: 'A9, §3.1 : `connecteur`, « fonction pragmatique d\'un SENSE dont le rôle est de relier l\'énoncé qu\'il introduit à un énoncé ou à une situation qui précède, en marquant entre eux une relation (opposition, succession, addition, conséquence) ».',
  A9_5: 'A9, §5 : « réservation pour l\'audit A2-05 […] au minimum また, sens 2 "Aussi, de plus" (D1381, refusée faute de définition, qui relèverait de `connecteur`) ».',
  A9_21: 'A9, §2.1 : une fonction est attribuée « lorsque le rôle qu\'elle décrit fait partie intégrante du sens tel qu\'il est modélisé, et que la fiche source l\'atteste ».',
  A9_43: 'A9, §4.3 : « une modalité conceptuelle reste une dimension (`probabilite` pour たぶん), non une fonction `modalite`, qui n\'est pas définie ».',
  LING3: 'A2-LING-v1, §3 : le compteur est une propriété linguistique de l\'ENTRY ; §5 : « compteur ≠ quantificateur ».'
};

const corps = (specifique) => ({
  famille: 'corps',
  normes: [N.A6, N.A6corps, N.STorg, N.STobj, N.ST4part],
  comparables: 'Les autres noms de parties du corps publiés (annexe, famille A) sont tous sans type ; aucun ne porte un type qui conviendrait ici. 背, sens 1 « Taille », de la même ENTRY ou de la même catégorie, est une `propriete` : c\'est une caractéristique du corps, non une de ses parties.',
  verdict: 'L',
  motivation: specifique
});
const unite = (specifique, extra = '') => ({
  famille: 'unite',
  normes: [N.A6, N.A6kilo, N.STqv, N.ST4mes],
  comparables: `Les autres unités publiées (キロ, キログラム, グラム, メートル, 時間 sens 2) sont toutes sans type. Les sens qui désignent une quantité déterminée portent \`quantite_valeur\` : 半 « Moitié » et « Et demie (heure) » (D0906 : « une quantité, non une unité »), 半分, 一人, 二人, les nombres.${extra}`,
  verdict: 'L',
  motivation: specifique
});

const V = {
  v_44_s1: corps('La fiche décrit « le ventre ou l\'estomac » et son exemple un ventre plein : une partie du corps, et rien d\'autre. C\'est le cas même qu\'A6 cite. Aucune des seize définitions ne décrit une partie : ce n\'est ni un être vivant, ni un objet individualisable. La raison de D0070 tient ; elle écrit « l\'être vivant » là où le snapshot dit « non traité comme personne humaine », sans changer la conclusion.'),
  v_46_s1: { ...corps('La fiche décrit « le corps humain dans sa globalité », forme physique, santé, enveloppe corporelle. Ce n\'est pas une partie : A6 ne cite pas ce cas. Lecture des définitions une à une : ce n\'est pas une personne (un individu désigné comme tel), ni un organisme vivant (un être vivant, animal ou plante), ni un objet individualisable ; le corps est ce dont une personne est faite, non un être distinct d\'elle. Aucun type terminal ne le décrit. La raison de D0104 tient.'), comparables: '身体 « Corps », de même sens et de registre soutenu, est sans type. Les noms de parties du corps sont sans type. Aucun sens publié ne désigne un corps avec un type. 体 et 身体 sont les deux seuls cas de la famille qui ne sont pas des parties.', reserve: 'C\'est, avec 身体, le verdict le moins directement couvert par A6 : à confirmer en priorité à la relecture.' },
  v_48_s1: corps('La fiche décrit « la partie du visage (la bouche) » ; l\'exemple dit « on ouvre la bouche ». L\'emploi pour une ouverture est gardé en nuance (D0120) et n\'est pas le sens audité. Une partie du visage : aucun type terminal ne la décrit. La raison de D0121 tient.'),
  v_51_s1: corps('La fiche décrit « la main humaine, la patte d\'un animal » ; l\'exemple dit « je me lave les mains ». Un seul sens est retenu, la main (D0126). Une partie du corps : aucun type terminal ne la décrit. La raison de D0127 tient.'),
  v_54_s1: corps('La fiche décrit « une dent humaine ou animale » ; l\'exemple dit « je me brosse les dents ». Une dent est une partie du corps, non un objet individualisable ni un être vivant. La raison de D0123 tient.'),
  v_57_s1: corps('La fiche décrit « l\'organe de la vision (l\'œil ou les yeux) » ; l\'exemple dit « j\'ai mal à l\'œil ». La vue et le regard sont gardés en nuance (D0114). Un organe : aucun type terminal ne le décrit. La raison de D0115 tient.'),
  v_58_s1: corps('La fiche décrit « l\'organe de l\'audition (l\'oreille) ou la capacité d\'entendre » ; l\'exemple porte sur l\'organe (des écouteurs dans les oreilles). L\'ouïe est gardée en nuance (D0116). Un organe : aucun type terminal ne le décrit. La raison de D0117 tient.'),
  v_60_s1: corps('La fiche décrit « le pied ou la jambe humaine, ou par extension la patte d\'un animal » ; l\'exemple dit « j\'ai mal aux pieds ». Un seul concept, le membre inférieur (D0129). Une partie du corps : aucun type terminal ne la décrit. La raison de D0130 tient.'),
  v_61_s1: { ...corps('La fiche ne dit qu\'une chose : « équivalent soutenu ou médical de 体 ». L\'exemple dit « je fais bouger mon corps ». Le sens est le corps humain entier, comme 体, lu ici pour lui-même : ni personne, ni organisme vivant au sens du snapshot, ni objet. L\'alternative publiée « Organisme » est un synonyme français de « corps » ; elle ne fait pas du sens un être vivant au sens d\'A2-ST. La raison de D0106 renvoie à celle de 体 et tient avec elle.'), comparables: '体 « Corps » est sans type. Les noms de parties du corps sont sans type. Aucun sens publié ne désigne un corps avec un type.', reserve: 'Même réserve que pour 体 : à confirmer en priorité à la relecture.' },
  v_65_s1: corps('La fiche dit que le mot « désigne la tête » ; l\'exemple dit « j\'ai mal à la tête ». Le sens 1 est la partie anatomique, distincte du sens 2 (D0108). Aucun type terminal ne la décrit. La raison de D0109 tient.'),
  v_65_s2: {
    famille: 'autre',
    normes: [N.A6, N.STprop, N.STabs],
    comparables: '力 « Force » (lot 20, D1361), dont la fiche couvre « la force physique […] ou les compétences intellectuelles », porte `propriete` : « une caractéristique que l\'on attribue à une personne ou à un animal ». 背, sens 1 « Taille », caractéristique du corps, porte `propriete`. Aucun autre nom publié ne désigne une faculté mentale.',
    verdict: 'C',
    motivation: 'La fiche décrit, « dans un autre sens, l\'intelligence et la matière grise » ; la nuance publiée donne 頭がいい (être intelligent) et 頭を使う (réfléchir). L\'intelligence, ou la faculté de penser, est une caractéristique que l\'on attribue à une personne : c\'est la définition de `propriete`. D0110 écarte ce type par une simple affirmation (« ni propriété »), sans dire pourquoi. Depuis, le lot 20 a typé 力 en `propriete` pour une capacité de même nature. Un type terminal existant décrit donc le sens, et un sens comparable le porte : les conditions de L ne sont pas réunies.',
    correction: '`semantic_type` : `null` → `propriete`. L\'avertissement `type-nul` cesserait. Aucune autre couche n\'est touchée.',
    reserve: 'Proposition moins assurée que pour 表 : la traduction principale « Esprit » peut se lire comme le siège de la pensée plutôt que comme une capacité. Si l\'arbitrage juge que le sens désigne l\'esprit lui-même, le `null` se maintiendrait et le cas serait reclassé L.'
  },
  v_67_s1: corps('La fiche décrit « l\'organe de l\'odorat et de la respiration situé sur le visage » ; l\'exemple dit « le nez me coule ». Un organe : aucun type terminal ne le décrit. La raison de D0119 tient.'),
  v_321_s2: unite('La fiche dit : « Compteur spécifique : 時間 (jikan) pour les heures ». Le sens 2 est l\'heure comme unité de durée, distincte du sens 1 (le temps, la durée). L\'exemple illustre le sens 1 ; le sens 2 vient du texte de la fiche. Une unité n\'est pas une quantité déterminée. La raison de D0926 tient.', ' Dans la même catégorie complète, 半 « Et demie (heure) » est une `quantite_valeur` : une demi-heure est une quantité, l\'heure est l\'unité.'),
  v_363_s1: unite('La fiche dit que キロ désigne « soit un kilogramme, soit un kilomètre » ; l\'exemple (« 2 kilos de pommes ») illustre ce sens. C\'est le cas même qu\'A6 cite. Une unité de masse : aucun type terminal ne la décrit. La raison de D0071 tient.'),
  v_363_s2: unite('La fiche dit que キロ désigne « soit un kilogramme, soit un kilomètre ». Le sens 2 est l\'unité de distance ; l\'exemple illustre le sens 1. C\'est le second cas qu\'A6 cite. La raison de D0072 tient. La catégorie de ce sens (espace › distance et proximité), qui diffère de celle de メートル, est un point réservé du volet 1 et n\'est pas jugée ici.'),
  v_364_s1: unite('La fiche dit : « l\'unité de mesure de masse (le kilogramme) » ; l\'exemple dit « mon poids est de 74 kilogrammes ». Le nombre porte la quantité, le mot nomme l\'unité. La raison de D0954 tient.'),
  v_366_s1: unite('La fiche dit : « l\'unité de mesure de longueur (le mètre) » ; l\'exemple dit « il y a 100 mètres d\'ici à la gare ». Le nombre porte la quantité, le mot nomme l\'unité. La raison de D0957 tient. Sa catégorie est un point réservé du volet 1 et n\'est pas jugée ici.'),
  v_500_s2: {
    famille: 'autre',
    normes: [N.A9_42, N.A9_31, N.A9_21, N.A9_5, N.ST4fn],
    comparables: 'Les sens publiés dont le contenu est un rôle de liaison portent `connecteur` et sont sans type : しかし, でも, それから, そうして, では, それでは, じゃあ, じゃ (lot 23). また, sens 2, est le seul sens de liaison publié sans fonction : il a été décidé au lot 21, avant A9.',
    verdict: 'F',
    motivation: 'La fiche dit que また sert aussi « à lier des arguments ("de plus") » ; le sens 2 publié, « Aussi, de plus », est ce rôle même, et sa nuance le dit : « pour lier des arguments, ajouter un élément à ce qui précède ». L\'exemple de la fiche illustre le sens 1 ; le sens 2 repose sur le texte de la fiche et sur deux de ses quatre traductions. Le `null` lui-même est juste : A9 (§4.2) cite ce sens comme exemple d\'un contenu qui est un rôle fonctionnel, sans type applicable, et D1403 tient. Mais le SENSE est incomplet : D1381 a refusé `connecteur` « faute de définition normative ». A9 la définit depuis, pour une relation d\'addition entre énoncés, et réserve expressément ce cas à A2-05. La fonction est définie, intégrale au sens modélisé et attestée par la fiche.',
    correction: '`linguistic_functions.pragmatic_discourse` : `[]` → `["connecteur"]` ; `semantic_type` reste `null`. Les deux avertissements de ce sens (`type-nul` et `categorie-nulle`) cesseraient d\'être émis, le `null` étant alors porté par une fonction. La raison de D1381 est périmée ; D1403 reste valable.',
    reserve: 'Ce sens porte aussi un avertissement `categorie-nulle`, qui sera audité avec les 120 : son verdict ne peut pas être fixé ici, mais il dépend de la même correction.'
  },
  v_521_s1: {
    famille: 'autre',
    normes: [N.A6, N.ST4mod, N.A9_43, N.STprop, N.STabs],
    comparables: 'ちょうど « Exactement » et 大体 « À peu près » sont des `propriete` : ils qualifient une mesure ou une quantité, donc une entité. いつも, よく « Souvent », 時々 sont des `concept_abstrait` ; ils sont candidats au volet 1 (C3) et ne valent pas précédent ici. たぶん est le seul adverbe publié qui exprime la probabilité d\'un fait.',
    verdict: 'L',
    motivation: 'La fiche décrit « une probabilité ou une supposition de l\'ordre de 70 à 80 % de chance qu\'un fait se produise ou soit vrai » ; l\'exemple dit « demain, il pleuvra peut-être ». Le mot ne désigne ni une entité, ni une occurrence ; il n\'attribue pas une caractéristique à une entité, mais qualifie la vraisemblance d\'un fait : ce n\'est pas une `propriete`. A2-ST exclut les notions modales des types, et le sens est porté par la dimension `probabilite`, ce qu\'A9 (§4.3) confirme nommément. `concept_abstrait` ne serait ici qu\'un type de secours. La raison de D1433 tient. Le verdict est établi sans recours à la fonction `modalite`, qui n\'est pas définie.',
    chantier: 'Pour mémoire, sans effet sur ce verdict : la fonction `modalite` n\'a pas de définition normative (chantier normatif des fonctions d\'A2-LING non définies).'
  },
  v_603_s1: corps('La fiche décrit « les cheveux de la tête » ; l\'exemple dit « je me coupe les cheveux ». Les cheveux font partie du corps ; ce n\'est ni une matière considérée comme masse, ni un objet. La raison de D0124 tient. La catégorie (apparence › coiffure et pilosité) n\'est pas l\'objet de ce cas.'),
  v_611_s1: unite('La fiche dit que le mot est « utilisé pour exprimer le poids ou la masse » ; l\'exemple dit « 200 grammes de viande ». Le nombre porte la quantité, le mot nomme l\'unité. La raison de D1008 tient.'),
  v_648_s1: {
    famille: 'unite',
    normes: [N.A6, N.LING3, N.ST4fn, N.STqv],
    comparables: '匹 est la seule ENTRY publiée qui soit elle-même un compteur (`counter`). 一人 et 二人, formés avec un compteur, sont des `quantite_valeur` : ils désignent une quantité déterminée de personnes. Les unités de mesure sont sans type.',
    verdict: 'L',
    motivation: 'La fiche décrit un « compteur numérique spécial utilisé pour compter les petits animaux » ; dans l\'exemple (« deux chats »), le nombre porte la quantité et 匹 la classe de ce qui est compté. Le sens ne désigne ni une entité, ni une quantité : son contenu est un rôle du système de comptage, que le modèle porte par la propriété `counter` de l\'ENTRY. Le fondement direct du `null` est le statut de compteur, qu\'A2-LING (§3) fait porter par l\'ENTRY, et l\'absence de tout type terminal approprié : A2-ST (§4) exclut les fonctions grammaticales des types sémantiques. La raison de D0502 l\'établissait par analogie avec les unités de mesure ; cette analogie n\'est pas le fondement retenu (arbitrage du 2026-10-08), et elle ne contredit pas la conclusion.'
  },
  v_653_s1: {
    famille: 'autre',
    normes: [N.A6, N.G13, N.STobj, 'A2-ST-v1, §3, Événement : « occurrence conceptualisée comme quelque chose qui survient » ; Résultat : « entité ou état conceptualisé principalement comme l\'aboutissement d\'une action, d\'un processus ou d\'un événement » ; Information / contenu : « contenu informationnel […] représentable ou transmissible indépendamment de son support ».'],
    comparables: '歌 « Chanson » et 音楽 « Musique » sont des `information_contenu` : une œuvre, un art, non un son. 風 « Vent » est un `processus`, un déplacement d\'air. Aucun sens publié ne désigne un son : la comparaison ne fournit aucun type.',
    verdict: 'L',
    motivation: 'La fiche décrit « la voix humaine lorsqu\'on parle ou que l\'on chante, ainsi que le cri émis par un animal » ; l\'exemple dit « il parle d\'une voix forte ». Lecture des définitions : la voix n\'est pas un objet matériel ni une substance ; ce n\'est pas un contenu transmissible ; dans l\'exemple, elle n\'est pas quelque chose qui survient, mais ce avec quoi l\'on parle, ce qui écarte `evenement` et `action` ; la fiche ne la présente pas comme l\'aboutissement d\'un acte, ce qui écarte `resultat`. Aucun type terminal ne décrit un son émis par un être vivant. La raison de D1365 tient par ses propres motifs ; son rapprochement avec les parties du corps est une analogie, non un fondement.',
    reserve: 'Aucun snapshot ne traite des sons. Le verdict repose sur la seule lecture des définitions : à confirmer à la relecture. La catégorie nulle du même sens sera auditée avec les 120.'
  },
  v_690_s2: corps('La fiche dit que le mot « peut aussi désigner le dos au sens anatomique ». L\'exemple illustre le sens 1 (la taille) ; le sens 2 repose sur le texte de la fiche. Une partie du corps : aucun type terminal ne la décrit. La raison de D0132 tient.'),
  v_696_s1: {
    famille: 'autre',
    normes: [N.A6, N.STlieu, N.ST4part],
    comparables: 'Dans la même famille source (`position_direction / position`), décidés au même lot 10, les noms de position sont des `lieu` : 上 « Dessus », dont la fiche dit « la partie supérieure, le dessus d\'un objet ou la position au-dessus » ; 横 « Côté », « le flanc ou le côté horizontal d\'un objet ou d\'une personne » ; 下 « Dessous » ; 中 « Intérieur » ; 外 « Extérieur » ; 前 ; 後ろ ; 角 « Coin ». 表 est le seul nom de position publié sans type.',
    verdict: 'C',
    motivation: 'La fiche décrit « le côté visible, la face avant, le recto d\'une feuille ou l\'extérieur d\'un bâtiment » ; l\'exemple dit « j\'écris mon nom sur le recto de la feuille », où 表 est l\'emplacement où l\'on écrit. D0604 retient que « la face d\'une chose en est une partie » et qu\'une partie n\'est pas un type. Mais 上 et 横, dont les fiches parlent tout autant de « la partie supérieure » et du « flanc » d\'un objet, sont typés `lieu` : un emplacement conceptualisé comme lieu. Le même type convient à 表, et des sens comparables le portent. Le `type-nul` de 表 a été validé à l\'arbitrage du lot 10 ; il n\'en reste pas moins contredit par le traitement des sens voisins du même lot.',
    correction: '`semantic_type` : `null` → `lieu`. L\'avertissement `type-nul` cesserait. Aucune autre couche n\'est touchée.',
    reserve: 'Si l\'arbitrage jugeait au contraire qu\'un côté d\'une chose n\'est pas un lieu, c\'est le type de 上 et de 横 qui serait en cause, au volet 1 ; dans les deux cas, le traitement actuel n\'est pas cohérent.'
  },
  v_713_s1: {
    famille: 'autre',
    normes: [N.A6, N.STabs, 'A2-ST-v1, §3, Substance / matière : « matière, matériau ou substance considérée comme masse/composition » ; Processus : « évolution, déroulement ou transformation conceptualisé dans sa progression ».'],
    comparables: '風 « Vent » est un `processus` ; 雨 et 雪 sont des `substance_matiere` ; 天気 est un `etat`. Le sens 2 de la même ENTRY, « Lumière », est un `objet_artefact` (l\'éclairage que l\'on allume). 力 « Force » est une `propriete`. Aucun sens publié ne désigne une forme d\'énergie.',
    verdict: 'L',
    motivation: 'La fiche dit que le mot désigne « à la fois l\'énergie électrique et l\'éclairage d\'une pièce » ; le sens 1 est l\'énergie, l\'exemple illustre le sens 2. L\'électricité n\'est pas une matière considérée comme masse, ni un objet ; la fiche ne la présente pas comme un déroulement ; c\'est une réalité physique, non une abstraction, de sorte que `concept_abstrait` ne serait qu\'un type de secours. Aucun type terminal ne la décrit. La raison de D0275 tient.'
  },
  v_716_s1: corps('La fiche décrit « le visage humain ou l\'expression faciale (la mine) » ; l\'exemple dit « je me lave le visage ». La mine est gardée en nuance (D0112). Une partie du corps : aucun type terminal ne la décrit. La raison de D0113 tient.')
};

// ---------- collecte des faits ----------
const ids = known.filter((w) => w.code === 'type-nul').map((w) => w.where.split(' · ')[2]).sort((a, b) => Number(a.split('_')[1]) - Number(b.split('_')[1]) || a.localeCompare(b));
const cases = ids.map((id) => {
  const e = vocab.find((x) => x.senses.some((s) => s.id === id));
  const s = e.senses.find((x) => x.id === id);
  const num = Number(id.split('_s')[1]);
  const srcId = `n5_v_${e.id.slice(2)}`;
  const f = sources.get(srcId);
  const d = journal.find((x) => x.entry === srcId && x.kind === 'type-nul' && x.field === `sens ${num} · semantic_type`);
  const lot = d.lot.replace('lot-', '');
  if (!V[id]) throw new Error(`verdict manquant : ${id}`);
  return { id, e, s, num, srcId, f, d, lot, v: V[id], autres: known.filter((w) => w.where.endsWith(` ${id}`) && w.code !== 'type-nul').map((w) => w.code) };
});
if (cases.length !== 27) throw new Error(`27 cas attendus, ${cases.length} trouvés`);
const count = (k) => cases.filter((c) => c.v.verdict === k).length;
const tot = { L: count('L'), F: count('F'), C: count('C'), N: count('N') };
if (tot.L + tot.F + tot.C + tot.N !== 27) throw new Error('total différent de 27');

const FAM = { corps: 'A · Le corps et ses parties', unite: 'B · Unités de mesure et de comptage', autre: 'C · Cas singuliers' };
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 2 · Audit des `null`');
P();
P('Ce rapport est le rapport unique du volet 2. Il est livré par tranches : tranche 1, les 27 `type-nul` (arbitrée) ; tranche 2, les `categorie-nulle`, eux-mêmes livrés en plusieurs tranches de relecture.');
P();
P('# Tranche 1 · les 27 `type-nul`');
P();
P('**Date** : 2026-10-08');
P('**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation) : les 27 verdicts sont confirmés, L = 24, F = 1, C = 2, N = 0 ; 体, 身体 et 声 sont confirmés L, non N ; les trois corrections sont retenues et rejoignent la future liste fermée des corrections du volet 2 ; **aucune n\'est faite**. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire d\'avertissements n\'est modifié.');
P('**Périmètre appliqué** : `docs/rapports/etape2-A2-05-perimetre.md`, validé le 2026-10-07 (§5, méthode ; §6, critères ; ordre de revue : les 27 `type-nul` d\'abord).');
P('**Suite** : les 120 `categorie-nulle`, en tranche 2 ci-dessous.');
P('**État du dépôt** : `ocha-v2` et `origin/ocha-v2` à `5a8687b063fd2fca7c343d544aff040709bc5ec8`.');
P();
P('---');
P();
P('## 1. Résultat de la tranche');
P();
P('| Classement | Cas | Sens |');
P('|---|---|---|');
for (const k of ['L', 'F', 'C', 'N']) P(`| **${k}** | ${tot[k]} | ${cases.filter((c) => c.v.verdict === k).map((c) => `\`${c.id}\` ${c.e.word}`).join(' ; ') || '—'} |`);
P(`| **Total** | ${tot.L + tot.F + tot.C + tot.N} | L + F + C + N = 27 |`);
P();
P('- **L** : `null` légitime. **F** : fonction linguistique ou information manquante. **C** : type à corriger. **N** : point non documenté, statut provisoire.');
P('- **Trois corrections sont proposées**, une F et deux C (§4). Elles ne sont pas faites.');
P('- **Aucun N** : dans les 27 cas, les snapshots et les addenda ont permis de décider.');
P(`- **${cases.filter((c) => c.v.reserve).length} verdicts portent une réserve explicite**, à examiner en priorité à la relecture : ${cases.filter((c) => c.v.reserve).map((c) => `\`${c.id}\` ${c.e.word}`).join(' ; ')}.`);
P();
P('## 2. Méthode suivie');
P();
P('Pour chacun des 27 cas, individuellement et dans cet ordre :');
P();
P('1. lecture de la fiche source entière, exemple compris ;');
P('2. lecture du SENSE publié, des autres sens de l\'ENTRY et de sa nuance ;');
P('3. lecture de la décision `type-nul` et des autres décisions de l\'entrée ;');
P('4. confrontation aux seize définitions de frontière d\'A2-ST-v1 (§3), à ce qui n\'est pas un type sémantique (§4), à A6, et, selon le cas, à A9, A2-LING, A2-DIM et A2-GLOBAL (§13, §15) ;');
P('5. comparaison aux sens publiés comparables : même catégorie, même famille source, même raison invoquée ;');
P('6. classement.');
P();
P('La présentation est regroupée par familles pour que les comparaisons se voient. **Chaque verdict a été rendu sur la lecture du cas lui-même** : la motivation de chaque fiche cite ce que dit sa propre fiche source et son propre exemple.');
P();
P('**Ce que l\'audit ne fait pas.** Il ne juge que le `semantic_type: null`. La catégorie de ces sens, leurs autres couches et les sens voisins relèvent du volet 1 ; quand la lecture en a croisé un, il est signalé sans être tranché.');
P();
P('## 3. Ce que la lecture par famille fait apparaître');
P();
P('### 3.1 Le corps et ses parties (14 cas)');
P();
P('A6 a été écrit à partir d\'une partie du corps (お腹) : la légitimité du `null` pour une partie du corps est posée par l\'addendum lui-même, non par une lecture des lots. La vérification a porté sur deux points.');
P();
P('- **Chaque sens est-il bien une partie du corps ?** Douze le sont, d\'après leur fiche et leur exemple. Deux ne le sont pas : 体 et 身体 désignent le corps entier. Pour eux, A6 ne dit rien ; le verdict L repose sur la lecture des définitions, et porte une réserve.');
P('- **Un type terminal a-t-il été oublié ?** Les décisions du lot 01 n\'écartent expressément que `organisme_vivant`. La définition d\'`objet_artefact` (« objet matériel individualisable ») a été relue pour chaque cas : une partie du corps n\'est pas individualisable comme un objet, et aucun sens rangé dans l’être humain ou le monde naturel ne porte ce type.');
P();
P('Un point dépasse l\'audit : onze décisions du lot 01 écrivent qu\'`organisme_vivant` « désigne un être vivant non humain », ce qui est la définition du snapshot ; D0070 (lot 0) écrit « l\'être vivant ». La différence est de rédaction et ne change aucun verdict.');
P();
P('### 3.2 Unités de mesure et de comptage (7 cas)');
P();
P('A6 a aussi été écrit à partir de キロ, dans ses deux sens. Pour les autres unités, chaque fiche a été relue : chacune nomme une unité (« l\'unité de mesure de masse », « de longueur », « pour les heures »), et dans chaque exemple c\'est le nombre qui porte la quantité.');
P();
P('Le corpus applique partout la même frontière : une **quantité déterminée** est une `quantite_valeur` (les nombres, 半, 半分, 一人, 二人), une **unité** est sans type. D0906 (lot 13) l\'écrit en toutes lettres pour 半. Aucun traitement divergent n\'a été trouvé.');
P();
P('匹 est à part : c\'est un compteur, non une unité de mesure. Son `null` est légitime, mais son fondement le plus direct est A2-LING, non l\'exclusion de la mesure que sa décision invoque.');
P();
P('### 3.3 Cas singuliers (6 cas)');
P();
P('C\'est ici que se trouvent les trois corrections proposées et les verdicts les moins assurés. Chaque cas est seul de son espèce : aucune lecture de famille ne peut le porter.');
P();
P('## 4. Corrections proposées');
P();
P('Aucune n\'est faite. Chacune demande un arbitrage, puis la procédure du périmètre (§7) : liste fermée, lot 27 comme véhicule, réouverture de l\'ENTRY dans son lot d\'origine, décisions nouvelles à la fin du journal, validation atomique, publication.');
P();
P('| Sens | Classement | Correction proposée | Effet sur les avertissements |');
P('|---|---|---|---|');
for (const c of cases.filter((x) => x.v.correction)) P(`| \`${c.id}\` ${c.e.word} « ${c.s.meaning.primary} » | ${c.v.verdict} | ${c.v.correction.split('. ')[0]}. | ${c.id === 'v_500_s2' ? '`type-nul` et `categorie-nulle` de ce sens cesseraient' : '`type-nul` cesserait'} |`);
P();
P('**Conséquence pour l\'inventaire** : si les trois corrections étaient retenues et validées, quatre lignes de `avertissements-connus.json` disparaîtraient (trois `type-nul`, un `categorie-nulle`). L\'inventaire devrait alors être resynchronisé par une commande déterministe, jamais à la main (périmètre, §7).');
P();
P('## 5. Les 27 fiches d\'audit');
P();
for (const fam of ['corps', 'unite', 'autre']) {
  P(`### ${FAM[fam]}`);
  P();
  for (const c of cases.filter((x) => x.v.famille === fam)) {
    const { e, s, f, d, v } = c;
    P(`#### \`${c.id}\` · ${e.word} (${e.readings.find((r) => r.default)?.kana}) · « ${s.meaning.primary} » — **${v.verdict}**`);
    P();
    P(`- **Fiche source** (\`${c.srcId}\`, ${f.type}) : traductions « ${[f.meanings.primary, ...(f.meanings.secondary ?? [])].join(' ; ')} ». Nuance : « ${strip(f.nuance)} » Exemple : « ${strip(f.example?.japanese)} » — « ${strip(f.example?.french)} »`);
    P(`- **État publié** : sens ${c.num} sur ${e.senses.length} ; traduction « ${s.meaning.primary} »${s.meaning.alternatives?.length ? ` (${s.meaning.alternatives.join(', ')})` : ''} ; catégorie \`${cat(s.category)}\` ; type \`null\` ; dimensions ${s.dimensions.length ? s.dimensions.map((x) => `\`${x.axis}:${x.pole}\``).join(', ') : 'aucune'} ; fonctions ${fnOf(s).length ? fnOf(s).join(', ') : 'aucune'} ; classe \`${e.linguistic.grammatical_class}\`${e.linguistic.counter ? ' ; `counter` renseigné' : ''}.${e.senses.length > 1 ? ` Autres sens : ${e.senses.filter((x) => x.id !== c.id).map((x) => `« ${x.meaning.primary} » (\`${cat(x.category)}\`, \`${x.semantic_type}\`)`).join(' ; ')}.` : ''}${c.autres.length ? ` Ce sens porte aussi l'avertissement \`${c.autres.join(', ')}\`, audité à part.` : ''}`);
    P(`- **Justification historique** : ${d.id.replace('A2-04-', '')} (lot ${c.lot}) : « ${strip(d.reason)} »`);
    P(`- **Normes appliquées** : ${v.normes.join(' ')}`);
    P(`- **Comparables examinés** : ${v.comparables}`);
    P(`- **Verdict proposé** : **${v.verdict}**.`);
    P(`- **Motivation** : ${v.motivation}`);
    if (v.correction) P(`- **Correction proposée** : ${v.correction}`);
    if (v.chantier) P(`- **Chantier normatif** : ${v.chantier}`);
    if (v.reserve) P(`- **Réserve** : ${v.reserve}`);
    P();
  }
}
P('## 6. Complétude');
P();
P(`Contrôle par script contre \`avertissements-connus.json\` : les 27 couples \`{ type-nul, sens }\` de l'inventaire figurent chacun une fois dans ce rapport, aucun n'est ajouté. L = ${tot.L}, F = ${tot.F}, C = ${tot.C}, N = ${tot.N} ; total ${tot.L + tot.F + tot.C + tot.N}.`);
P();
P('## Annexe · Sens comparables relevés');
P();
const all = vocab.flatMap((e) => e.senses.map((s) => ({ e, s })));
const lst = (title, pred) => { P(`**${title}**`); P(); P('| SENSE | Mot | Sens | Catégorie | Type |'); P('|---|---|---|---|---|'); for (const { e, s } of all.filter(pred)) P(`| \`${s.id}\` | ${e.word} | ${s.meaning.primary} | ${cat(s.category)} | ${s.semantic_type} |`); P(); };
lst('Famille A · être humain › corps, et apparence', ({ s }) => /^etre_humain › (corps|apparence)/.test(cat(s.category)));
lst('Famille B · unités, compteurs et quantités voisines', ({ e, s }) => ['キロ', 'キログラム', 'グラム', 'メートル', '時間', '匹', '半', '半分', '一人', '二人'].includes(e.word));
lst('Noms de position de la famille source de 表', ({ e }) => sources.get(`n5_v_${e.id.slice(2)}`)?.subcategory === 'position' && sources.get(`n5_v_${e.id.slice(2)}`)?.category === 'position_direction');
lst('Sens sans type et sans fonction (les 27)', ({ s }) => s.semantic_type === null && !fnOf(s).length);
lst('Sens de liaison portant `connecteur`', ({ s }) => fnOf(s).includes('connecteur'));
lst('Adverbes typés', ({ e, s }) => e.linguistic.grammatical_class === 'adverbe' && s.semantic_type !== null);
lst('Autres comparables cités', ({ e }) => ['力', '風', '雨', '雪', '天気', '歌', '音楽', '電気'].includes(e.word));
writeFileSync(outFile, md);
console.log(`rapport écrit : ${md.split('\n').length} lignes ; L=${tot.L} F=${tot.F} C=${tot.C} N=${tot.N}`);
