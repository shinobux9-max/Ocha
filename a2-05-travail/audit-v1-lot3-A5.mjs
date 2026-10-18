// A2-05 · volet 1 · lot 3 · livraison A5 : onze sens de type `concept_abstrait` du lot 13 (les vacances d'été, dix dates du mois). Lecture seule sur les données.
// Usage : node audit-v1-lot3-A5.mjs <racine du dépôt>   (réécrit docs/rapports/etape2-A2-05-volet1-lot3-A5.md)
import { produire } from './lot3-commun.mjs';

// L'arbitrage se renseigne ici, après la relecture : { date, texte: [...] }
const ARBITRAGE = { date: '2026-10-13', texte: [
  "Arbitrage du 2026-10-13 (ChatGPT, par délégation ; relayé par l'utilisateur).",
  '',
  "**Les onze verdicts « conforme » sont retenus : 11 conformes, 0 écart, 0 suspendu, aucune correction.** **V1-6 reste libre** ; les 180 corrections dans 161 ENTRY restent retenues et non appliquées. La proposition est conservée ci-dessous, telle qu'elle a été livrée.",
  '',
  '| Point | Arbitrage |',
  '|---|---|',
  "| **夏休み** | `concept_abstrait`, `temps › moments_periodes` au niveau 2 et aucune fonction sont conservés : « la fiche définit une période, même si un ancien exemple dit que les vacances commencent. D0845 justifie le refus de catégories plus étroites ». |",
  "| **Les dix dates du mois** | `concept_abstrait` et `temps › calendrier › dates` sont conservés : « les fiches distinguent expressément la date de la durée ; les sens de durée ne sont pas rouverts ». |",
  "| **七日, 二日, 十日 et 四日** | « conforme » est maintenu malgré l'absence d'exemple illustrant la date. Le constat documentaire est conservé, « sans créer d'exemple ». |",
  "| **二十日** | La réserve sur l'ancien exemple relatif à はたち（二十歳） est conservée, « sans modifier la source ni ouvrir de nouveau chantier ». |",
  '',
  "**Lot 3 : 47 sens arbitrés sur 377 ; 330 restent**, dont 22 du bloc A et les 17 du bloc F, suspendu. **Suite** : l'audit d'A6 est autorisé, seul ; A7 ne commence pas avant l'arbitrage d'A6. Le bloc F, HP-1 à HP-4 et G1 à G7 ne sont pas ouverts."
] };

const TYPE_DATE = (ord, card) => "**Type, examiné à part (A2-ST).** Sur cette fiche, ce sens désigne un jour du mois, repéré par son rang (« le " + ord + " jour d'un mois »). Ce n'est ni une entité ni un lieu. Ce n'est pas une occurrence : la fiche ne décrit aucun fait qui survient. Ce n'est ni un état ni une propriété, rien n'y étant attribué à une entité. Ce n'est pas une `quantite_valeur` : la fiche sépare elle-même la durée (« une durée de " + card + " jours », une quantité de temps, que porte l'autre sens de l'ENTRY) du jour du mois, qui est une position dans le calendrier et non une grandeur. A2-ST n'a aucun type de date ni de repère temporel ; reste un concept non matériel de repérage dans le calendrier, que `concept_abstrait` décrit. `null` (A6) supposerait qu'aucun type terminal ne décrive le sens, ce qui n'est pas le cas.";
const CAT_DATE = " **Catégorie, examinée à part (A2-L3).** `temps › calendrier › dates` est une sous-catégorie nommée (« Calendrier → Dates ») ; la fiche désigne bien un jour du mois. `temps › duree`, que porte l'autre sens de l'ENTRY, ne convient pas à celui-ci.";
const SANS = (d, preuve) => " **Fonction, examinée à part (A7).** Aucune. " + d + " refuse `deictique` : « une date du calendrier, repérée dans le mois et non par rapport au moment de l'énonciation ». La fiche le confirme : " + preuve + ".";
const SANS_EXEMPLE = "**Aucun exemple n'emploie la date** : celui de la fiche et les trois anciens emploient tous la durée. Le sens est attesté par la nuance et par la traduction secondaire seulement ; la fiche le documente en toutes lettres, et je le signale comme constat, sans en faire un écart. ";
const COMMUN = (d) => d + " motive le type et la catégorie par rapprochement (« comme les repères temporels des lots 0 et 12 ») ; le motif tiré de la fiche est donné ci-dessus. L'autre sens de l'ENTRY (la durée, `quantite_valeur`) est hors des 377 et n'est pas jugé ici. La nuance de l'ENTRY n'a pas été signalée par le criblage de provenance (lot 2, clos, non rouvert).";
const date = (cite, ord, card, dSens, dFonc, preuve, avant = '') => ({ v: 'conforme', motive: [dSens],
  m: "La fiche dit : « " + cite + " ». " + dSens + " (validée) en tire deux sens : la durée (hors de cette livraison) et ce sens-ci, la date. " + TYPE_DATE(ord, card) + CAT_DATE + SANS(dFonc, preuve),
  r: avant + COMMUN(dSens) });

const F = {
  v_268_s1: { v: 'conforme',
    m: "La fiche dit : « désignant la période des vacances scolaires ou professionnelles estivales ». **Type, examiné à part (A2-ST).** Sur cette fiche, ce qui est désigné est une période de l'année : celle où, en été, l'on ne travaille ou n'étudie pas. Ce n'est ni une entité ni un lieu. Ce n'est pas une `action` : aucun agent n'y accomplit rien. Le type voisin le plus proche est `evenement` (« occurrence conceptualisée comme quelque chose qui survient ») : un ancien exemple dit que les vacances « commencent » (夏休み が 始まる). Mais la fiche les nomme « la période », et tous ses autres emplois en font le cadre où autre chose a lieu : on voyage pendant elles (夏休み に), on veut lire pendant elles (夏休み の 間 に), on en profite pour aller chez ses grands-parents. Une période commence, comme une saison commence, sans être pour autant un fait qui survient. Ce n'est ni un état ni une propriété, rien n'y étant attribué à une entité. Ce n'est pas une `quantite_valeur` : la fiche cite un compteur de durée (日間), mais elle désigne la période, non sa longueur. A2-ST n'a aucun type de période ; reste un concept non matériel de repérage dans le temps, que `concept_abstrait` décrit. `null` (A6) supposerait qu'aucun type terminal ne décrive le sens, ce qui n'est pas le cas. **Catégorie, examinée à part (A2-L3).** `temps › moments_periodes`, arrêtée au niveau 2. Aucune des quatre sous-catégories nommées (« Parties de la journée ; Présent ; Passé ; Futur ») ne décrit une période de vacances : s'arrêter au niveau 2 est exact. D0845 écarte « Vie scolaire & universitaire → Vacances scolaires » et « Conditions de travail → Congés » comme trop étroites chacune, la fiche disant « scolaires ou professionnelles » : je le confirme sur la fiche. Son exemple (un voyage) ne tranche pas entre les deux ; un seul ancien exemple parle d'étudiants, aucun du travail. **Fonction, examinée à part (A7).** Aucune. D0846 refuse `deictique` : « une période de l'année en général, sans repérage par rapport au moment de l'énonciation ». La fiche le confirme : aucun de ses exemples ne rapporte ces vacances à une année particulière.",
    r: "D0845 motive le type et la catégorie par rapprochement (« même catégorie et même type que 休み », « comme les saisons du lot 07 ») : les saisons sont arbitrées (A1, R2), 休み ne l'est pas (livraison A6) ; le verdict proposé repose sur la fiche, non sur ces comparables. **La frontière avec `evenement` est plus mince que pour une saison**, des vacances étant instituées et non un découpage naturel de l'année : je la porte à l'arbitrage (§5). L'ancien rangement de la fiche était `meteo_saisons / saisons` ; la catégorie publiée est celle des saisons, non une catégorie de météo. La traduction secondaire « Congés estivaux » a été écartée comme redondante (D0847), hors des champs examinés. La fiche mentionne des compteurs (回, 日間), sans effet sur `counter`, réservé aux ENTRY qui sont elles-mêmes des compteurs. La nuance de la fiche n'est pas publiée (ni nuance d'ENTRY ni nuance de sens), ce qui n'est pas un champ examiné ici." },
  v_292_s2: date("désignant soit une durée de sept jours, soit le septième jour d'un mois", 'septième', 'sept', 'D0862', 'D0863', "elle dit « le septième jour d'un mois », sans le rapporter à un mois particulier",
    SANS_EXEMPLE + "La fiche écrit « lecture traditionnelle (kokuji/wago) » ; la nuance publiée dit « lecture japonaise traditionnelle », sans reprendre « kokuji » : hors des champs examinés, non rejugé. "),
  v_293_s1: date("désignant soit le troisième jour d'un mois, soit une durée de trois jours", 'troisième', 'trois', 'D0867', 'D0868', "dans l'ancien exemple « 今月 の 三日 に », c'est 今月 qui porte le repérage par rapport au présent, non 三日",
    "Seule fiche du paradigme à donner la date en premier (D0867) : l'ordre publié des sens suit la fiche. Son exemple emploie pourtant la durée (« trois jours de repos ») ; la date est attestée par la nuance, par la traduction principale et par un ancien exemple. "),
  v_294_s2: date("désignant soit une durée de neuf jours, soit le neuvième jour d'un mois", 'neuvième', 'neuf', 'D0872', 'D0873', "un ancien exemple dit « 毎月 九日 », le 9 de chaque mois, une habitude",
    "L'exemple de la fiche emploie la durée ; la date est attestée par la nuance, par la traduction secondaire et par un ancien exemple. "),
  v_295_s2: date("désignant soit une durée de vingt jours, soit le vingtième jour d'un mois", 'vingtième', 'vingt', 'D0877', 'D0878', "son exemple dit « 来月 の 二十日 に », où c'est 来月 qui porte le repérage par rapport au présent, non 二十日 ; un ancien exemple dit « 毎月 二十日 », le 20 de chaque mois",
    "Seule fiche des dix dont l'exemple emploie la date. **Le troisième ancien exemple porte sur はたち（二十歳）, « vingt ans », et non sur 二十日** : il n'atteste ni la date ni la durée. Constat sur une source figée, hors des champs examinés ; je ne propose rien et ne le compte pas comme écart. "),
  v_296_s2: date("désignant soit une durée de deux jours, soit le deuxième jour d'un mois", 'deuxième', 'deux', 'D0882', 'D0883', "elle dit « le deuxième jour d'un mois », sans le rapporter à un mois particulier", SANS_EXEMPLE),
  v_297_s2: date("désignant soit une durée de cinq jours, soit le cinquième jour d'un mois", 'cinquième', 'cinq', 'D0887', 'D0888', "un ancien exemple dit « 毎月 五日 », le 5 de chaque mois, une habitude",
    "L'exemple de la fiche emploie la durée ; la date est attestée par la nuance, par la traduction secondaire et par un ancien exemple. "),
  v_307_s2: date("désignant soit une durée de huit jours, soit le huitième jour d'un mois", 'huitième', 'huit', 'D0892', 'D0893', "un ancien exemple dit « 毎月 八日 », le 8 de chaque mois, une habitude",
    "L'exemple de la fiche emploie la durée ; la date est attestée par la nuance, par la traduction secondaire et par un ancien exemple. "),
  v_308_s2: date("désignant soit une durée de six jours, soit le sixième jour d'un mois", 'sixième', 'six', 'D0897', 'D0898', "un ancien exemple dit « 毎月 六日 », le 6 de chaque mois, une habitude",
    "L'exemple de la fiche emploie la durée ; la date est attestée par la nuance, par la traduction secondaire et par un ancien exemple. "),
  v_309_s2: date("désignant soit une durée de dix jours, soit le dixième jour d'un mois", 'dixième', 'dix', 'D0902', 'D0903', "elle dit « le dixième jour d'un mois », sans le rapporter à un mois particulier", SANS_EXEMPLE),
  v_313_s2: date("désignant soit une durée de quatre jours, soit le quatrième jour d'un mois", 'quatrième', 'quatre', 'D0911', 'D0912', "elle dit « le quatrième jour d'un mois », sans le rapporter à un mois particulier", SANS_EXEMPLE)
};

const SANS_EX = ['v_292_s2', 'v_296_s2', 'v_309_s2', 'v_313_s2'];

produire({
  root: process.argv[2], livraison: 'A5', deja: ['A1', 'A2', 'A3', 'A4'], date: '2026-10-13', suivante: 'A6', suivantes: 'livraisons A6 et A7',
  titre: "les vacances d'été et dix dates du mois, de type `concept_abstrait` (lot 13)",
  autorisation: "arbitrage d'A4, du 2026-10-13 (ChatGPT, par délégation ; relayé par l'utilisateur) : « L'audit d'A5 seule est autorisé, conformément au périmètre du lot 3 déjà arbitré. Lire chaque fiche intégralement, avec traductions, nuances, exemples anciens et décisions applicables. Contrôler chaque sens sur tous ses axes de criblage, son type, sa catégorie, ses fonctions et les autres champs pertinents. Utiliser les arbitrages A1 à A4 comme comparables, jamais comme verdicts automatiques. Livrer A5 en proposition. Ne pas commencer A6 avant son arbitrage. »",
  IDS: ['v_268_s1', 'v_292_s2', 'v_293_s1', 'v_294_s2', 'v_295_s2', 'v_296_s2', 'v_297_s2', 'v_307_s2', 'v_308_s2', 'v_309_s2', 'v_313_s2'], F,
  typeAttendu: 'concept_abstrait', controleDeixis: true, arbitrage: ARBITRAGE,
  question: "le type `concept_abstrait` décrit-il ce sens (A2-ST) ? La catégorie (A2-L3) et l'absence de fonction (A7), examinées séparément, le décrivent-elles ?",
  emploi: (c) => "**Comment les arbitrages d'A1 à A4 ont été employés.** Comme comparables seulement. Dans chaque fiche, le type, la catégorie et la fonction sont examinés séparément, chacun sur la fiche et contre sa norme. Aucun des " + c.N + " sens ne porte de fonction ; dans les " + c.N + " cas, la fiche et la décision qui cite A7 concordent. **Ce que cette livraison a de propre** : dix des onze sens sont le sens « date » d'une ENTRY à deux sens, dont l'autre (la durée, `quantite_valeur`) est hors des 377 ; c'est la fiche elle-même qui sépare les deux, et le type est examiné sur cette séparation, non sur l'analogie avec les repères d'A2 à A4. **Les dix dates ont été lues une à une** : leurs fiches suivent le même patron, mais leurs exemples diffèrent, et quatre d'entre elles n'ont aucun exemple de la date (§5).",
  methode: "Pour chacun des onze sens : la fiche source entière (traductions, particules, nuance, exemple) et ses anciens exemples ; l'état publié de l'ENTRY et de tous ses sens ; toutes les décisions de journal de l'ENTRY ; toutes les règles du criblage qui désignent le sens ; les corrections déjà retenues et le verdict de provenance des nuances (lot 2, clos, non rouvert) ; les autres sens publiés de `temps › calendrier` et de `temps › moments_periodes` sans sous-catégorie, comme comparables ; les normes : A2-ST-v1 (§3, §4, §5) pour le type, A2-L3-v1 (« Calendrier → Jours ; Mois ; Années ; Dates » ; « Moments & périodes → Parties de la journée ; Présent ; Passé ; Futur » ; « Durée ») pour la catégorie, A7 (définition et axe du temps) pour la fonction, A6 pour l'hypothèse d'un type nul.",
  axesNote: "Aucun n'est désigné par l'axe C7 : le lot 13 est postérieur à A7, et chaque absence de fonction y est posée par une décision qui le cite. J'ai néanmoins relu la fonction, la catégorie, les dimensions, les tags, les relations, la classe et `counter` de chacun.",
  comparables: (c) => {
    const cal = c.tous.filter(({ s }) => s.category?.level_1 === 'temps' && (s.category.level_2 === 'calendrier' || (s.category.level_2 === 'moments_periodes' && !s.category.level_3)));
    const L = ['## 3. Comparables : les ' + cal.length + ' sens publiés de `temps › calendrier` et de `temps › moments_periodes` sans sous-catégorie', '', '| Sens | Mot | Traduction | Catégorie | Type | Fonctions | Lot | Livraison du lot 3 |', '|---|---|---|---|---|---|---|---|'];
    for (const { e, s } of cal) { const l = c.livraison.get(s.id); L.push('| `' + s.id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | `' + c.cat(s.category) + '` | `' + s.semantic_type + '` | ' + c.fonctions(s) + ' | ' + String(c.candidats.get(s.id)?.lot ?? '?').padStart(2, '0') + ' | ' + (c.IDS.includes(s.id) ? '**' + c.L + '**' : l ? l + (c.deja.includes(l) ? ' (arbitrée)' : ' (non arbitrée)') : 'hors des 377') + ' |'); }
    const durees = c.fiches.filter((f) => f.e.senses.length > 1).map((f) => f.e.senses.find((x) => x !== f.s));
    if (durees.some((x) => x.semantic_type !== 'quantite_valeur' || c.cat(x.category) !== 'temps › duree' || c.livraison.has(x.id))) throw new Error('un sens de durée inattendu');
    const dates = cal.filter(({ s }) => s.category.level_3 === 'dates');
    L.push('', "Les " + dates.length + " sens de `temps › calendrier › dates` portent tous `concept_abstrait`, sans fonction : les dix de cette livraison et 誕生日 (A6, non arbitrée). Les " + durees.length + " autres sens des dix ENTRY de dates (« Sept jours », « Trois jours »…) portent tous `temps › duree` et `quantite_valeur`, et sont hors des 377 : ils ne sont pas jugés ici. Les quatre saisons (arbitrées en A1) et 休み (A6, non arbitrée) ont le rangement de 夏休み. **Ces rapprochements contrôlent la cohérence ; aucun verdict n'en est déduit**, et un comparable non arbitré ne vaut pas référence.", '');
    return L;
  },
  points: (c) => {
    const sansEx = c.fiches.filter((f) => SANS_EX.includes(f.id));
    // Contrôle : ces fiches n'ont réellement aucun exemple où le mot est précédé de 月 の ou de 毎月, et les autres en ont un
    const plat = (q) => String(q ?? '').replace(/<rt>[^<]*<\/rt>/g, '').replace(/<[^>]+>/g, '').replace(/[*\s]/g, '');
    for (const f of c.fiches.filter((x) => x.e.senses.length > 1)) {
      const aDate = [f.src.example?.japanese, ...f.ex.map((q) => q.japanese)].some((q) => new RegExp('(毎月|月の)' + f.e.word).test(plat(q)));
      if (aDate === SANS_EX.includes(f.id)) throw new Error(f.id + ' : relevé des exemples de date contredit par les sources');
    }
    return [
      "**夏休み : la frontière avec `evenement`.** Je propose « conforme » : la fiche nomme « la période », et ses emplois en font le cadre où autre chose a lieu. Un ancien exemple dit pourtant que les vacances « commencent ». R2 (A1) a retenu pour les saisons « période désignée comme découpage de l'année » ; des vacances sont une période instituée, non un découpage de l'année : le raisonnement d'A1 sert de base, il ne s'applique pas tel quel. L'arbitrage dira si la distinction tient.",
      "**夏休み : la catégorie arrêtée au niveau 2.** Aucune sous-catégorie de `moments_periodes` ne nomme une période de vacances ; « Vacances scolaires » et « Congés » existent ailleurs dans A2-L3, et D0845 les écarte parce que la fiche couvre l'école et le travail. Je propose de le conserver ; 休み, décidée de la même façon (D0947), relève d'A6 et n'est pas jugée ici.",
      "**Quatre dates sans exemple de la date** (" + sansEx.map((f) => f.e.word).join(', ') + ") : ni l'exemple de la fiche ni les anciens exemples n'emploient le jour du mois (relevé contrôlé par le script). Le sens est documenté par la nuance et par la traduction secondaire ; la doctrine « la fiche source décide » le fonde. Constat, sans écart proposé : l'axe C3 porte sur le type, et l'absence d'exemple ne le touche pas.",
      "**二十日 : un ancien exemple hors sujet.** Le troisième ancien exemple porte sur はたち（二十歳）, « vingt ans ». C'est une source figée, non publiée dans le sens examiné ; je ne propose aucune correction et ne l'ajoute à aucune liste. Je le signale pour que l'arbitrage décide s'il doit être consigné quelque part.",
      "**Raison écrite** : " + (c.N - c.sansDecType) + " des " + c.N + " sens ont une décision de journal qui motive leur type et leur catégorie (D0845 pour 夏休み ; la décision `senses` de chacune des dix dates). Le constat R4 ne s'applique donc à aucun sens de cette livraison. Ces décisions motivent par rapprochement (« comme les saisons », « comme les repères temporels des lots 0 et 12 ») ; le motif tiré de chaque fiche est donné dans la fiche d'examen.",
      "**Autres constats, sans effet sur les verdicts** : aucun des onze sens ne porte de dimension, de relation, de particule ni de tag ; les décisions de tags (" + c.fiches.flatMap((f) => f.dec.filter((d) => d.field === 'tags').map((d) => d.id.replace('A2-04-', ''))).join(', ') + ") écartent `lieu_hotel` par le critère du lot 02, et aucune règle C8 ne désigne ces sens ; la classe `nom` des dix dates est motivée par une décision propre ; `counter` est `null` partout.",
      "**Sur le plan des livraisons** : aucun ajustement n'est proposé."
    ];
  },
  questions: [
    "Les onze verdicts « conforme » sont-ils retenus ?",
    "**夏休み** : `concept_abstrait` est-il retenu contre `evenement`, et la catégorie reste-t-elle au niveau 2 ?",
    "**Les quatre dates sans exemple de la date** (七日, 二日, 十日, 四日) : le constat reste-t-il sans suite ?",
    "**二十日** : l'ancien exemple sur はたち doit-il être consigné, et où ?",
    "L'autorisation d'examiner **A6**, seule."
  ]
});
