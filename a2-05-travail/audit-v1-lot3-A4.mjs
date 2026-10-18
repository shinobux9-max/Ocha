// A2-05 · volet 1 · lot 3 · livraison A4 : huit sens de type `concept_abstrait` du lot 12 (parties de la journée, repères du futur). Lecture seule sur les données.
// Usage : node audit-v1-lot3-A4.mjs <racine du dépôt>   (réécrit docs/rapports/etape2-A2-05-volet1-lot3-A4.md)
import { produire } from './lot3-commun.mjs';

// L'arbitrage se renseigne ici, après la relecture : { date, texte: [...] }
const ARBITRAGE = { date: '2026-10-13', texte: [
  "Arbitrage du 2026-10-13 (ChatGPT, par délégation ; relayé par l'utilisateur).",
  '',
  "**Les huit verdicts « conforme » sont retenus : 8 conformes, 0 écart, 0 suspendu, aucune correction.** Les huit sens sont confirmés : 晩, 朝, 来年, 来月, 来週, 夕方, 午後 et 昼 (sens 1). **V1-6 reste libre** ; les 180 corrections dans 161 ENTRY restent retenues et non appliquées. La proposition est conservée ci-dessous, telle qu'elle a été livrée.",
  '',
  '| Point | Arbitrage |',
  '|---|---|',
  "| **昼, sens 1** | Le découpage de D0800 est conservé : « le sens réunit la période diurne et son milieu ». Le type `concept_abstrait` et la catégorie `parties_de_la_journee` sont « justifiés pour les champs examinés ». La réserve sur la traduction principale est conservée, « sans rouvrir le découpage ni les traductions ». |",
  "| **午後** | Le constat « nom / adverbe temporel » dans la fiche, contre `nom` publié, est conservé. Il n'est pas un écart dans l'audit C3-0, et la classe n'est pas modifiée. |",
  '| **R4** | conservé comme constat documentaire. |',
  '',
  "**Lot 3 : 36 sens arbitrés sur 377 ; 341 restent**, dont 33 du bloc A et les 17 du bloc F, suspendu. **Suite** : l'audit d'A5 est autorisé, seul ; A6 ne commence pas avant l'arbitrage d'A5. Les arbitrages d'A1 à A4 servent de comparables, jamais de verdicts automatiques. Le bloc F et la recherche d'omissions ne sont pas ouverts ; HP-1 à HP-4 et G1 à G7 non plus."
] };

const REVUE = (quoi, exemples) => "**Type, examiné à part (A2-ST).** Sur cette fiche, " + quoi + " n'est ni une entité ni un lieu. Ce n'est pas une occurrence : la fiche ne décrit aucun fait qui survient ; dans ses exemples, " + exemples + ". Ce n'est ni un état ni une propriété, rien n'y étant attribué à une entité. Ce n'est pas une `quantite_valeur` : la fiche ne mesure aucune durée, elle désigne une portion du temps. A2-ST n'a aucun type de période ; reste un concept non matériel de repérage dans le temps, que `concept_abstrait` décrit. `null` (A6) supposerait qu'aucun type terminal ne décrive le sens, ce qui n'est pas le cas.";
const PARTIE = " **Catégorie, examinée à part (A2-L3).** `temps › moments_periodes › parties_de_la_journee` est une sous-catégorie nommée (« Parties de la journée ») ; la fiche désigne bien une portion de la journée.";
const FUTUR = (quoi) => " **Catégorie, examinée à part (A2-L3).** `temps › moments_periodes › futur` est une sous-catégorie nommée (« Futur ») ; " + quoi + " est à venir par rapport au moment où l'on parle.";
const DEIXIS = (d, quoi) => " **Fonction, examinée à part (A7).** `deictique`, posée par " + d + ". La définition d'A7 demande que le repérage dépende directement du moment d'énonciation : la fiche repère " + quoi + ". La fonction est décrite par la fiche ; elle ne décide pas du type.";
const SANS = (d, mot, preuve) => " **Fonction, examinée à part (A7).** Aucune. " + d + " refuse `deictique` : « " + mot + " désigne une partie de la journée en général, sans repérage par rapport au moment de l'énonciation ». La fiche le confirme : " + preuve + ".";

const F = {
  v_322_s1: { v: 'conforme',
    m: "La fiche dit : « nom temporel désignant la fin de la journée ou le début de la soirée ». " + REVUE('une partie de journée désignée comme telle', "c'est le moment où l'on étudie chaque soir, où le père travaille tard, où la ville devient calme") + PARTIE + SANS('D0807', '晩', "son exemple et un ancien exemple disent « chaque soir » (毎晩), une habitude ; dans un autre, c'est 今晩 qui porte le repérage, non 晩"),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie (constat, selon l'arbitrage de R4). La fiche mentionne un compteur (回), sans effet sur `counter`, réservé aux ENTRY qui sont elles-mêmes des compteurs." },
  v_324_s1: { v: 'conforme',
    m: "La fiche dit : « nom temporel désignant la première partie de la journée, du lever du soleil jusqu'à midi ». " + REVUE('une partie de journée désignée comme telle', "c'est le moment où l'on boit du café chaque matin, où l'on se promène, où il faisait froid") + PARTIE + SANS('D0798', '朝', "son exemple et un ancien exemple disent « chaque matin » (毎朝) ; dans l'ancien exemple « 今日の朝 », c'est 今日 qui porte le repérage, non 朝"),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie (constat). La fiche mentionne un compteur (回), sans effet sur `counter`." },
  v_326_s1: { v: 'conforme',
    m: "La fiche dit : « désignant l'année suivant l'année en cours ». " + REVUE('une année désignée comme telle', "c'est l'année où l'on voyagera au Japon, où l'on ira y étudier, que l'on oppose à 今年") + FUTUR("l'année désignée") + DEIXIS('D0790', "l'année par rapport à « l'année en cours », donc au moment où l'on parle"),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie (constat)." },
  v_327_s1: { v: 'conforme',
    m: "La fiche dit : « désignant le mois suivant le mois en cours ». " + REVUE('un mois désigné comme tel', "c'est le mois où l'on achètera une voiture, où un projet commence, où l'on part en voyage d'affaires") + FUTUR('le mois désigné') + DEIXIS('D0781', "le mois par rapport au « mois en cours », donc au moment où l'on parle"),
    r: "La traduction secondaire « le mois suivant », qui pourrait se repérer par rapport à un autre mois, a été écartée comme redondante (D0782) ; pour 明日, « le jour suivant » avait été écarté comme non équivalent (D0743, arbitré en A3). Les deux motifs diffèrent, mais le résultat est le même : le sens publié ne garde que le repérage par rapport au présent. Je le signale sans en faire un écart, la traduction étant hors des champs examinés. Aucune décision de journal ne porte sur le type ni sur la catégorie (constat).",
    ext: ['D0743'] },
  v_328_s1: { v: 'conforme',
    m: "La fiche dit : « désignant la semaine suivant la semaine en cours ». " + REVUE('une semaine désignée comme telle', "c'est la semaine où l'on va à Tokyo, où une réunion a lieu mercredi, où l'on a cours tous les jours") + FUTUR('la semaine désignée') + DEIXIS('D0772', "la semaine par rapport à la « semaine en cours », donc au moment où l'on parle"),
    r: "Même remarque que pour 来月 sur la traduction secondaire « la semaine suivante », écartée comme redondante (D0773). Aucune décision de journal ne porte sur le type ni sur la catégorie (constat)." },
  v_439_s1: { v: 'conforme',
    m: "La fiche dit : « désignant la période de la journée où le jour commence à baisser, entre l'après-midi et la nuit tombante ». " + REVUE('une partie de journée désignée comme telle', "c'est le moment où il a plu, où l'on se promène, où il fait plus frais") + PARTIE + SANS('D0804', '夕方', "elle ne rapporte cette période à aucun jour particulier ; ses exemples l'emploient pour une habitude (se promener) comme pour un jour donné (il a plu)"),
    r: "L'ancien rangement de la fiche était `temps_calendrier / temps`, non `moments_journee` comme les autres parties de journée ; la catégorie publiée est la même que la leur, et c'est la fiche (« la période de la journée ») qui la fonde. La lecture a été corrigée par D0844 (A8), sans rapport avec les champs examinés. Aucune décision de journal ne porte sur le type ni sur la catégorie (constat)." },
  v_649_s1: { v: 'conforme',
    m: "La fiche dit : « désignant la période de la journée située entre midi et minuit ». " + REVUE('une partie de journée désignée comme telle', "c'est la période où a lieu une réunion, pour laquelle on annonce de la pluie, où se tient un cours ; l'exemple et un ancien exemple l'emploient devant une heure (午後 2 時, 午後 1 時)") + " L'emploi devant une heure ne change pas la nature de ce qui est désigné : la tranche de la journée où tombe cette heure (même constat que pour 午前, arbitré en A3, sans que le verdict en soit tiré)." + PARTIE + SANS('D0816', '午後', "elle ne rapporte cette période à aucun jour particulier, et l'oppose à 午前 comme une moitié de la journée à l'autre"),
    r: "La fiche dit « nom / adverbe temporel » ; la classe publiée est `nom`, le schéma ne portant qu'une classe, et aucune règle du criblage ne désigne la classe de ce mot. Je le signale comme constat, voisin du point ouvert des fiches à double classe. La nuance de l'ENTRY porte déjà une correction retenue (V2-146, provenance), non appliquée et sans effet sur les champs examinés. Aucune décision de journal ne porte sur le type ni sur la catégorie (constat)." },
  v_670_s1: { v: 'conforme',
    m: "La fiche dit : « désignant la période diurne (par opposition à la nuit yoru), le milieu de la journée (midi), ou par extension le repas du midi ». D0800 (validée) en tire deux sens : ce sens-ci, « une période du jour » qui réunit la période diurne et son milieu, et le repas (sens 2, `evenement`, hors de cette livraison). " + REVUE('la période du jour, ou son milieu,', "c'est le moment où il fait très chaud, la période où l'on travaille, opposée à la nuit où l'on étudie") + " Midi, pris comme le milieu de la journée, est un moment plutôt qu'une période : comme pour 今 (arbitré en A2), c'est encore un concept non matériel de repérage dans le temps, et la fiche le présente comme le milieu de cette période, non comme un fait." + PARTIE + " La période diurne est une moitié de la journée, son milieu un moment de celle-ci : la sous-catégorie couvre les deux." + SANS('D0801', '昼', "elle oppose le jour à la nuit en général, et un ancien exemple dit « je travaille pendant la journée, et j'étudie le soir », une habitude"),
    r: "Ce sens réunit une période (le jour, par opposition à la nuit) et un moment (midi) ; la traduction principale publiée est « Midi », avec « Journée » en alternative. C'est le découpage de D0800, validé, qui n'est pas l'objet de l'axe C3 et que je ne rouvre pas ; le type et la catégorie tiennent pour l'un comme pour l'autre. Le sens 2 de l'ENTRY porte une correction retenue (V2-147, provenance), non appliquée, sans rapport avec ce sens. Aucune décision ne porte sur le champ du type ni sur celui de la catégorie de ce sens (constat)." }
};

produire({
  root: process.argv[2], livraison: 'A4', deja: ['A1', 'A2', 'A3'], date: '2026-10-12', suivante: 'A5', suivantes: 'livraisons A5 à A7',
  titre: 'huit repères temporels de type `concept_abstrait` (lot 12, fin)',
  autorisation: "arbitrage d'A3, du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) : « J'autorise l'audit d'A4 uniquement, dans le périmètre déjà accepté. Lire chaque fiche entière, exemples et décisions compris. Contrôler individuellement type, catégorie, fonction et tous les axes de criblage applicables. Utiliser les arbitrages A1 à A3 comme comparables, jamais comme verdicts automatiques. »",
  IDS: ['v_322_s1', 'v_324_s1', 'v_326_s1', 'v_327_s1', 'v_328_s1', 'v_439_s1', 'v_649_s1', 'v_670_s1'], F,
  typeAttendu: 'concept_abstrait', controleDeixis: true, arbitrage: ARBITRAGE,
  question: "le type `concept_abstrait` décrit-il ce sens (A2-ST) ? La catégorie (A2-L3) et la fonction (A7), examinées séparément, le décrivent-elles ?",
  emploi: (c) => "**Comment les arbitrages d'A1 à A3 ont été employés.** Comme comparables seulement. Dans chaque fiche, le type, la catégorie et la fonction sont examinés séparément, chacun sur la fiche et contre sa norme. " + c.avecFonction + " sens portent `deictique` (来年, 来月, 来週) ; " + (c.N - c.avecFonction) + " ne la portent pas (les cinq parties de journée prises en général) : dans les huit cas, la fiche et la décision qui cite A7 concordent. **Cette livraison termine les sens du lot 12 dans le bloc A.**",
  methode: "Pour chacun des huit sens : la fiche source entière (traductions, particules, nuance, exemple) et ses anciens exemples ; l'état publié de l'ENTRY et du sens ; toutes les décisions de journal de l'ENTRY ; toutes les règles du criblage qui désignent le sens ; les corrections déjà retenues et le verdict de provenance des nuances (lot 2, clos, non rouvert) ; les autres sens publiés de `temps › moments_periodes`, comme comparables ; les normes : A2-ST-v1 (§3, §4, §5) pour le type, A2-L3-v1 (« Moments & périodes → Parties de la journée ; Présent ; Passé ; Futur ») pour la catégorie, A7 (définition et axe du temps) pour la fonction, A6 pour l'hypothèse d'un type nul.",
  axesNote: "Aucun n'est désigné par l'axe C7 : le lot 12 est postérieur à A7, et chaque fonction y est posée ou refusée par une décision qui le cite. J'ai néanmoins relu la fonction, la catégorie, les dimensions, les tags et les relations de chacun.",
  comparables: (c) => {
    const mp = c.tous.filter(({ s }) => s.category?.level_2 === 'moments_periodes');
    const L = ['## 3. Comparables : les ' + mp.length + ' sens publiés de `temps › moments_periodes`', '', '| Sens | Mot | Traduction | Sous-catégorie | Type | Fonctions | Lot | Livraison du lot 3 |', '|---|---|---|---|---|---|---|---|'];
    for (const { e, s } of mp) { const l = c.livraison.get(s.id); L.push('| `' + s.id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | ' + (s.category.level_3 ? '`' + s.category.level_3 + '`' : '—') + ' | `' + s.semantic_type + '` | ' + c.fonctions(s) + ' | ' + String(c.candidats.get(s.id)?.lot ?? '?').padStart(2, '0') + ' | ' + (c.IDS.includes(s.id) ? '**' + c.L + '**' : l ? l + (c.deja.includes(l) ? ' (arbitrée)' : '') : 'hors des 377') + ' |'); }
    const pj = mp.filter(({ s }) => s.category.level_3 === 'parties_de_la_journee');
    L.push('', "Les " + pj.length + " sens de `parties_de_la_journee` portent tous `concept_abstrait`. Ceux qui sont repérés par rapport au jour où l'on parle (今晩, 今朝, 昨夜, arbitrés) portent `deictique` ; les parties de journée prises en général ne la portent pas (午前 et 夜, arbitrés en A3 ; 晩, 朝, 夕方, 午後 et 昼, de cette livraison). Les trois repères du futur de cette livraison (来年, 来月, 来週) ont le même rangement que 明日, あさって et さ来年, arbitrés. **Ces rapprochements contrôlent la cohérence ; aucun verdict n'en est déduit.**", '');
    return L;
  },
  points: (c) => [
    "**昼, sens 1.** Le sens réunit la période diurne et son milieu (midi), selon D0800. Le type et la catégorie tiennent pour l'un comme pour l'autre ; je propose « conforme », et je signale que la traduction principale (« Midi ») ne nomme que le moment, la période étant en alternative (« Journée »). Le découpage et les traductions sont hors de l'axe examiné.",
    "**午後.** La fiche dit « nom / adverbe temporel », la classe publiée est `nom`. Constat, sans écart proposé : aucune règle du criblage ne désigne la classe, et le schéma ne porte qu'une classe.",
    "**Absence de raison écrite** : " + c.sansDecType + " des " + c.N + " sens n'ont aucune décision de journal sur le champ du type ni sur celui de la catégorie. Conformément à l'arbitrage de R4, c'est un constat documentaire, non un écart.",
    "**Autres constats, sans effet sur les verdicts** : aucun des huit sens ne porte de dimension, de relation, de particule ni de tag ; les décisions de tags (" + c.fiches.flatMap((f) => f.dec.filter((d) => d.field === 'tags').map((d) => d.id.replace('A2-04-', ''))).join(', ') + ") écartent `lieu_hotel` par le critère du lot 02, et aucune règle C8 ne désigne ces sens.",
    "**Sur le plan des livraisons** : aucun ajustement n'est proposé."
  ],
  questions: [
    "Les huit verdicts « conforme » sont-ils retenus ?",
    "**昼, sens 1** : le verdict est-il retenu pour un sens qui réunit une période et son milieu ?",
    "**午後** : la double classe de la fiche reste-t-elle un simple constat ?",
    "L'autorisation d'examiner **A5**, seule."
  ]
});
