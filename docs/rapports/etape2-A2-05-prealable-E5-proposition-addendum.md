# Étape 2 · A2-05 · Préalable normatif E5 — proposition d'addendum : définition opérationnelle de la fonction `interrogatif`

**Date** : 2026-10-12
**Statut** : **PROPOSITION, non validée, non normative.** Ce texte n'est pas un addendum : il n'est pas rangé dans `docs/conception/`, ne porte aucun numéro définitif et ne s'applique à rien. **Aucune donnée, aucun registre, aucune décision historique, ni A2-LING, ni A7, ni A9 ne sont modifiés.** Aucun des 17 sens n'est jugé ici. **Le bloc F du lot 3 reste suspendu** jusqu'à la validation explicite d'un addendum.

**Version** : **révision 2, du 2026-10-12**, après une première relecture (ChatGPT, par délégation ; relayée par l'utilisateur). La relecture a accepté le fond « comme base de rédaction », en précisant que « l'addendum n'est pas encore validé ni normatif ». Elle a confirmé la définition avec « notamment » et la liste indicative, les deux frontières ajoutées (sens qui nomme une question ; marques grammaticales), et les points déjà présents. **Une correction a été demandée avant toute validation normative : renforcer la méthode de recherche des omissions.** Cette révision y répond (partie I, §8), précise la frontière des marques grammaticales (§4, point 5), inscrit l'examen des 17 décisions `type-nul` selon A6 (§7) et rend compte du contrôle d'unicité du numéro A10 (partie II, §3). **Elle est fournie pour une relecture normative distincte ; elle ne demande pas la validation.**

**Révision 3, du 2026-10-12**, après la relecture de la révision 2 : celle-ci est « acceptée comme texte prêt à être soumis à un arbitrage normatif distinct, mais elle n'est pas encore adoptée ». La définition avec « notamment », les frontières, l'attribution sens par sens, le cumul, l'indépendance du type et de la catégorie et le §8 en trois temps sont confirmés. **Trois précisions demandées sont portées ici, sans autre changement** : le compte rendu de la recherche dit que les sens non relevés par les filtres ne sont pas des sens vérifiés conformes, conserve l'identifiant et les filtres d'origine de chaque candidat, et déduplique (§8) ; la séquence d'application est fixée (§7) ; une omission découverte n'est pas ajoutée d'office aux 377 candidats du lot 3 (§7, §8). **Le texte n'est ni adopté, ni normatif, ni déplacé dans `docs/conception/`.** Toute adoption devra préciser explicitement le numéro, l'emplacement et le statut normatif, après vérification d'unicité.

**Autorisation** : arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Autorisation de préparer une proposition d'addendum distinct consacrée à `interrogatif`, sans la présenter comme normative ou validée. […] Ne modifier ni A7 ni A9. Ne modifier aucun registre, aucune donnée ni aucune décision historique. […] L'addendum devra être relu et explicitement validé avant toute application. »

**Base** : le dossier préparatoire `etape2-A2-05-prealable-E5-interrogatif.md`, accepté comme base de travail ; l'orientation recommandée par l'arbitrage, mise ici à l'épreuve des références.

**Comment lire ce document** : la partie I est le texte proposé, rédigé sur le modèle d'A7 et d'A9, tel qu'il pourrait devenir un addendum s'il était validé. La partie II dit ce que la mise à l'épreuve a montré, et les points que je ne peux pas trancher. **Numéro pressenti : A10**, à confirmer ; le fichier serait `docs/conception/addendum-A10-interrogatif.md`.

---

# Partie I — Texte proposé

## Addendum A10 (proposé) · Définition opérationnelle de la fonction `interrogatif`

**Objet** : fixer la règle selon laquelle Ocha attribue la fonction linguistique `interrogatif` à un sens. `A2-LING-v1` fixe l'existence de la fonction (famille GRAMMATICAL, identifiant `interrogatif`), mais ne la définit pas.

**Ce que cet addendum ne fait pas** :
- il ne modifie pas `A2-LING-v1` : ni l'arbre des fonctions, ni l'identifiant, ni la famille ;
- il ne modifie ni A7 ni A9 : il reprend, pour `interrogatif`, des règles que ces addenda énoncent pour leurs propres fonctions, sans changer leur texte ni leur portée ;
- il ne modifie aucun registre et ne crée aucune fonction, aucune sous-fonction, aucune classe ;
- il ne définit aucune autre fonction d'A2-LING ;
- il ne prend aucune décision lexicale et ne rouvre aucune entrée validée.

C'est une convention d'application propre à Ocha, comme A5, A6, A7 et A9.

### 1. Constat

Aucune définition normative d'`interrogatif` n'existe : ni dans `A2-LING-v1` (§4, simple libellé ; §5, aucune frontière), ni dans `A2-GLOBAL-v1` (§8.3), ni dans le registre `linguistic-functions.json`. A7 (§3, point 3) la nomme pour borner `deictique` ; A9 (§1, §6) constate qu'elle a été « appliquée avant le lot 20 sur un sens implicite » à 17 sens, et la laisse hors de son champ.

Ces 17 sens (15 ENTRY, lots 00, 05 et 11) portent la fonction sans qu'aucune décision de journal ne la pose. C'est la seule fonction sans définition qui soit employée dans les données publiées. Le périmètre de la cohérence rétroactive d'A2-05 (§4) en a fait un point non documenté (E5), à résoudre par un addendum avant la clôture de l'étape 2.

### 2. Définition

> **`interrogatif`** — fonction grammaticale d'un SENSE dont le rôle est de **demander une information non spécifiée** : notamment l'identité, la chose, le lieu, le moment, la manière, la cause, la quantité ou le choix.

L'information est « non spécifiée » en ce que le mot en tient la place dans l'énoncé et appelle une réponse qui la fournit. Ce que l'on demande (une personne, un lieu, un prix, un avis) se dit **dans le sens et dans la nuance** ; ce n'est pas une sous-fonction.

### 3. Principes d'attribution

1. **Le sens modélisé décide.** La fonction est attribuée à un SENSE lorsque demander une information **fait partie intégrante du sens tel qu'il est modélisé**, et que **la fiche source l'atteste**. Un emploi seulement mentionné en nuance, ou une traduction contextuelle en forme de question, ne suffit pas.
2. **Jamais par la classe ni par la série.** La fonction ne s'attribue ni par la classe grammaticale (un `pronom`, un `adverbe` ou un `determinant` n'est pas interrogatif du fait de sa classe), ni par l'appartenance à une série morphologique (la série en ど, la série ko-so-a-do). Réciproquement, la fonction ne décide pas de la classe.
3. **Sens par sens.** Chaque SENSE porte ses propres fonctions : les sens d'une même ENTRY sont examinés séparément.
4. **Chaque attribution est justifiée** par la décision qui la pose, et cette décision cite le présent addendum au lieu de poser elle-même une définition.

### 4. Frontières

1. **Les indéfinis.** Un sens formé sur un mot interrogatif, mais qui **n'interroge pas**, ne porte pas la fonction : il désigne un référent indéterminé, il ne demande rien. Exemple : 誰か « quelqu'un » (D0724). Il en va de même d'un emploi concessif ou généralisant (« quel que soit… », « peu importe combien… ») : s'il est documenté par une fiche, il se décrit comme un autre sens ou en nuance, selon les règles ordinaires du découpage, et ne reçoit pas la fonction de ce seul fait.
2. **`deictique`** (A7, §3, point 3, inchangé). Un sens qui interroge sans renvoyer à un référent situé n'est pas déictique. Les deux fonctions décrivent des rôles différents : repérer un référent par la situation d'énonciation, demander une information.
3. **Le registre poli.** Un interrogatif de registre poli ou respectueux ne reçoit pas `politesse` de ce seul fait (A9, §3.3, frontière 1, inchangé) : le registre se dit dans la nuance.
4. **Nommer une question n'est pas interroger.** Un sens qui **désigne** l'acte de demander ou une question (聞く « demander », 質問 « question ») est un sens lexical : il a sa catégorie et son type, et ne porte pas la fonction. C'est la même logique qu'A2-LING (§5) pour le domaine Communication.
5. **Les marques grammaticales de l'interrogation** (particules, constructions) relèvent d'autres règles de l'application. **Elles sont hors du périmètre de cet addendum, qui porte sur le vocabulaire** : il ne les définit pas, ne les classe pas et ne s'applique pas aux données de grammaire.

### 5. Rapports avec les autres couches

1. **Catégorie (A2-L3, A5).** La fonction ne remplace pas une catégorie, n'en crée pas et n'en interdit pas. Un sens interrogatif reçoit une catégorie lorsqu'un domaine thématique décrit ce sur quoi il interroge, selon les règles ordinaires ; sinon `category: null`. La question se pose sens par sens.
2. **Type sémantique (A2-ST, A6).** La fonction **ne décide pas** du type, et **ne justifie pas par elle-même** `semantic_type: null`. A6 s'applique : `null` est permis lorsqu'aucun type terminal ne décrit correctement la nature du sens, par une décision justifiée, sens par sens. `concept_abstrait` ne sert pas de type de secours.
3. **Dimensions, relations, classes.** Une dimension caractérise un sens ; une relation relie deux sens du lexique ; la classe est une propriété de l'ENTRY. Aucune ne remplace la fonction, et la fonction n'en remplace aucune.

### 6. Cumul

Un SENSE peut porter `interrogatif` avec une autre fonction **lorsque chaque fonction décrit un rôle distinct, intégral au sens modélisé, et attesté par la fiche**. Chaque fonction est alors justifiée séparément. **On ne scinde jamais un sens uniquement pour éviter un cumul.** Si la fiche établit réellement deux emplois distincts, le découpage en deux sens suit les règles ordinaires (« un SENSE n'est pas une traduction »).

### 7. Application et effets

| Où | Effet |
|---|---|
| Les 17 sens qui portent déjà la fonction | **contrôlés un par un contre cette définition**, dans le bloc F du lot 3 du volet 1 d'A2-05 ; aucun n'est tenu pour conforme ou fautif du seul fait de cet addendum |
| Les 17 décisions `type-nul` de ces sens | **examinées selon A6 lors du bloc F**, sens par sens : la fonction interrogative ne suffit pas à elle seule à justifier `semantic_type: null` (§5, point 2) ; **aucun écart n'est présumé** |
| Sens publiés qui ne portent pas la fonction | **recherche d'omissions**, selon la méthode du §8 ; un sens trouvé est signalé, jamais corrigé d'office, et **n'est pas ajouté d'office aux 377 candidats du lot 3** |
| **Séquence** | 1. adoption explicite de cet addendum (numéro, emplacement et statut normatif précisés, après vérification d'unicité) ; 2. préparation et validation d'un **périmètre opérationnel de contrôle** ; 3. examen des 17 sens connus et recherche d'omissions, **coordonnés mais comptabilisés séparément**. Ni la recherche d'omissions ni l'examen du bloc F ne commencent avant l'adoption et l'accord sur ce périmètre |
| Décisions historiques | **aucune n'est réécrite** ; une correction éventuelle se fait par une décision nouvelle, journalisée, avec une réouverture explicite, sur autorisations distinctes |
| Autres fonctions sans définition (`negation`, `pluralisation`, `modalite`, `aspect`, `temps`, `alternative`) | la doctrine du lot 20 reste en vigueur : aucune n'est posée sans définition normative |
| Registre, validateur lexical, outils, tests | **aucun changement** : `interrogatif` est déjà une valeur du registre, contrôlée par I13 |
| A7, A9 | **inchangés** |

### 8. Recherche des omissions

Après la validation de cet addendum, les sens publiés qui ne portent pas `interrogatif` sont recherchés en trois temps. **Un filtre de recherche ne vaut jamais preuve d'attribution** : il désigne des fiches à relire, rien de plus ; seule la relecture individuelle (temps 3) conclut.

**Population** : tous les SENSE publiés du vocabulaire (N5 et hors JLPT) qui ne portent pas la fonction, avec la fiche source de leur ENTRY et les fiches des ENTRY retirées par fusion vers elle. Les données de grammaire sont hors de la population (§4, point 5).

**Temps 1 — recherche textuelle large.** Dans le type, les traductions (principale et secondaires) et la nuance de chaque fiche source, ainsi que dans la traduction, les alternatives et les nuances publiées :
- le vocabulaire de la question : les radicaux « interrog », « question », « demand » ;
- un point d'interrogation dans une traduction ou une nuance ;
- un mot interrogatif français en traduction : qui, que, quoi, quel et ses formes, lequel et ses formes, où, quand, comment, pourquoi, combien.

Les phrases d'exemple ne sont pas filtrées : une question dans un exemple n'indique rien sur le mot illustré. Elles sont en revanche lues en entier au temps 3.

**Temps 2 — recherche structurée, complémentaire**, sur les sens que le temps 1 n'a pas relevés :
- les sens des ENTRY de classe `pronom`, `determinant` ou `adverbe` ;
- les sens sans catégorie ou sans type qui ne portent aucune fonction ;
- les ENTRY formées sur le mot d'une des ENTRY qui portent la fonction (par exemple un composé de 何, de 誰, de いつ, de いくら ou d'un mot de la série en ど) ;
- les ENTRY dont une décision de journal emploie le vocabulaire de la question.

Ces critères désignent des fiches à relire ; aucun n'est un critère d'attribution (§3, point 2 : jamais par la classe ni par la série).

**Temps 3 — relecture individuelle.** Chaque sens relevé par le temps 1 ou le temps 2 est relu sur sa fiche entière (traductions, nuance, exemple, anciens exemples) et sur les décisions de son ENTRY, puis reçoit l'une de trois conclusions motivées par la définition et les frontières : « ne relève pas de la fonction », « relève de la fonction » (omission signalée), ou « à arbitrer ». Une omission signalée ne modifie rien : elle est portée à l'arbitrage, et une correction éventuelle suit la voie ordinaire (§7).

**Compte rendu obligatoire** :
- **la couverture** : le nombre de sens de la population, le nombre relevé par chaque filtre, le nombre relu, le nombre non relevé par aucun filtre. **Un sens que les filtres n'ont pas relevé n'est pas un sens vérifié conforme** : il n'a pas été relu, et le compte rendu le dit en ces termes ;
- **la traçabilité** : chaque candidat garde son identifiant de SENSE et la liste des filtres qui l'ont relevé, du relevé jusqu'à la conclusion ;
- **les doublons** : les résultats sont dédupliqués ; un sens relevé par plusieurs filtres est compté une fois, et tous ses filtres d'origine restent indiqués ;
- **deux décomptes séparés** : le contrôle des 17 sens qui portent déjà la fonction, et la recherche d'omissions, ne sont jamais additionnés ;
- **les décisions déjà existantes** : lorsqu'une décision de journal a déjà attribué ou refusé la fonction (D0724 pour 誰か), elle est citée ; la relecture dit si elle s'accorde avec la définition, sans la réécrire ;
- **les limites** : ce que les filtres ne peuvent pas voir (une fiche qui décrirait un emploi interrogatif sans aucune des marques recherchées, hors des classes et des séries du temps 2), et ce qui est hors de la population.

La recherche est livrée en proposition, comme toute livraison d'A2-05 ; elle ne commence pas avant l'adoption de cet addendum et l'accord sur le périmètre opérationnel de contrôle (§7, séquence). Une omission signalée reste hors des 377 candidats du lot 3, sauf décision distincte.

### Décisions de cet addendum (proposées)

| Point | Décision proposée |
|---|---|
| Niveau de gouvernance | addendum de conception Ocha, distinct, et non nouvelle version d'A2-LING ni complément d'A9 |
| Définition | fonction d'un sens dont le rôle est de demander une information non spécifiée |
| Attribution | par sens, sur preuve de la fiche ; jamais par la classe ni par la série morphologique |
| Indéfinis | hors de la fonction (誰か) |
| `deictique` | frontière d'A7 reprise, sans la modifier |
| Registre poli | ne fonde pas `politesse` (A9), se dit en nuance |
| Sens qui nomme une question | sens lexical, sans la fonction |
| Type et catégorie | indépendants de la fonction ; A5 et A6 s'appliquent sens par sens |
| Cumul | permis sous conditions ; jamais de scission pour l'éviter |
| Marques grammaticales de l'interrogation | hors du périmètre de l'addendum, qui porte sur le vocabulaire |
| Données validées | contrôle des 17 sens et examen de leurs 17 décisions `type-nul` selon A6, au bloc F ; aucun écart présumé |
| Recherche des omissions | recherche textuelle large, recherche structurée complémentaire, relecture individuelle ; un filtre ne vaut jamais preuve ; un sens non relevé n'est pas un sens vérifié conforme ; identifiants et filtres d'origine conservés, résultats dédupliqués ; compte rendu de la couverture, des décisions existantes et des limites |
| Séquence | adoption explicite ; périmètre opérationnel validé ; puis contrôle des 17 sens et recherche d'omissions, coordonnés et comptabilisés séparément |
| Omissions découvertes | signalées ; non ajoutées d'office aux 377 candidats du lot 3 |

---

# Partie II — Mise à l'épreuve, et points à arbitrer

## 1. L'orientation recommandée, confrontée aux références

Orientation de l'arbitrage : « La fonction `interrogatif` caractérise un sens dont le rôle grammatical est de demander une information non spécifiée : identité, chose, lieu, moment, manière, cause, quantité ou choix. »

| Référence | Résultat |
|---|---|
| A2-LING §4, registre | compatible : famille GRAMMATICAL, identifiant inchangé |
| A7, §3, point 3 (« un sens qui interroge sans renvoyer à un référent situé […] relève d'`interrogatif` ») | compatible : « interroger » y est le critère ; la frontière est reprise telle quelle |
| A9, §2.1 et §2.2 (le sens modélisé décide ; jamais par la classe ni par la série) | l'orientation ne les contient pas ; l'arbitrage demande de les préciser : repris au §3, sans modifier A9 |
| A9, §3.3, frontière 1 (interrogatif poli) | compatible ; repris au §4, point 3 |
| D0724 (誰か : « pas de fonction interrogative (誰か n'interroge pas) ») | compatible ; devient la frontière des indéfinis |
| A6 ; axe C4 du périmètre (« la fonction ne justifie pas le `null` par elle-même ») | l'orientation est muette ; repris au §5, point 2 |

**Je n'ai trouvé aucune référence que l'orientation contredise.**

## 2. Un point où la liste de l'orientation est trop courte

La liste « identité, chose, lieu, moment, manière, cause, quantité ou choix » ne nomme pas tout ce que les fiches des 17 sens disent demander. Relevé fait sur les fiches, **sans juger aucun sens** :

| Ce que la fiche dit demander | Dans la liste ? | Fiches |
|---|---|---|
| l'identité d'une personne | oui | 誰, どなた, どちら |
| une chose | oui | 何 |
| un emplacement, une direction | oui (lieu) | どこ, どちら |
| le moment | oui | いつ |
| la manière de faire | oui | どう, いかが |
| **l'état d'une chose, l'avis de quelqu'un** | **non** | どう (« l'état d'une chose, ou pour solliciter l'avis de quelqu'un »), いかが (« l'état, l'avis ») |
| la cause, la raison | oui | どうして, なぜ |
| une quantité, un âge | oui (quantité) | いくつ |
| **un prix, un montant** | à préciser : une quantité ? | いくら (« une valeur financière ou un montant à payer ») |
| un choix entre deux ou plusieurs éléments | oui | どれ, どの, どっち, どちら |

**Conséquence** : une liste fermée laisserait hors de la lettre de la définition ce que les fiches de どう et de いかが décrivent. **Le texte proposé écrit donc « notamment »** devant la liste, qui devient indicative. C'est un écart par rapport à la formulation de l'arbitrage ; je le signale au lieu de le faire en silence. Autres possibilités : garder une liste fermée et y ajouter « l'état ou l'avis » ; ou supprimer la liste et garder la seule première proposition.

## 3. État des points après la première relecture

| Point | Première version | Relecture du 2026-10-12 | Dans cette révision |
|---|---|---|---|
| Liste des informations demandées | « notamment », liste indicative | **conservée** : « elle doit couvrir les différents types d'informations demandées sans constituer une liste fermée » | inchangé (partie I, §2) |
| Sens qui nomme une question ou l'acte de demander | frontière ajoutée, à confirmer | **conservée** : il « n'est pas interrogatif de ce seul fait » | inchangé (§4, point 4) |
| Marques grammaticales de l'interrogation | frontière ajoutée, à confirmer | **conservée**, à préciser : elles « relèvent d'autres règles de l'application » et sont « hors du périmètre de cet addendum sur le vocabulaire » | **précisé** (§4, point 5) |
| Preuve par fiche, attribution sens par sens ; indéfinis ; `deictique` ; `politesse` ; type et catégorie ; cumul | présents | **conservés** | inchangés (§3 à §6) |
| Recherche des omissions | un relevé sur quelques marques, proposé en une phrase | **correction demandée** : recherche textuelle large, recherche structurée complémentaire, relecture individuelle ; les filtres ne valent jamais preuve ; documenter la couverture, les doublons, les décisions existantes et les limites | **réécrit** (§8, nouveau) |
| Les 17 décisions `type-nul` | signalées comme un effet à connaître | à examiner selon A6 au bloc F ; la fonction ne suffit pas à elle seule ; aucun écart présumé | **inscrit** (§7 ; table des décisions) |
| Numéro | A10 pressenti | conservé comme pressenti, avec contrôle d'unicité avant adoption | contrôle fait, ci-dessous |

**Contrôle d'unicité du numéro A10** (fait le 2026-10-12, à refaire avant toute adoption) : `docs/conception/` contient les addenda A1 à A9 et aucun fichier A10 ; ni `CLAUDE.md`, ni `ROADMAP.md`, ni `REGLES-CONSTRUCTION.md`, ni les outils, ni les tests n'emploient ce numéro. **Une seule mention existe** : `ETAT-ACTUEL.md` rapporte, pour l'arbitrage du préalable sur など (2026-10-07), « aucune classe, aucun addendum A10 ». Le numéro y avait donc été envisagé pour un addendum sur une classe « particule », qui n'a pas été écrit. Il est libre ; je signale cette mention pour qu'elle ne prête pas à confusion.

**Après la relecture de la révision 2** : le §8 est confirmé ; la séquence est fixée (§7) ; le moment de la recherche est donc tranché : après l'adoption et le périmètre opérationnel, coordonnée avec le contrôle des 17 sens, comptée à part. **Ce qui reste à décider par l'arbitrage normatif distinct** : l'adoption elle-même, avec le numéro (A10 pressenti), l'emplacement et le statut. Les marques du temps 1 et les critères du temps 2 n'ont pas été essayés sur les données : le périmètre opérationnel de contrôle sera l'occasion de les éprouver.

## 4. Ce que cette proposition ne fait pas

Elle ne valide rien et ne s'applique à rien. Elle ne juge aucun des 17 sens ; le tableau du §2 de la partie II relève ce que disent les fiches, il ne dit pas si la fonction est bien posée. Elle ne modifie ni A2-LING, ni A7, ni A9, ni aucun registre, ni aucune donnée, ni aucune décision. Elle ne lance aucune recherche d'omissions : la méthode du §8 est décrite, non exécutée. Elle n'est pas rangée dans `docs/conception/` et n'est pas déclarée validée.
