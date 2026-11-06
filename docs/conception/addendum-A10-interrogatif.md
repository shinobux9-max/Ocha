# Ocha — Document de conception v1

## Addendum A10 · Définition opérationnelle de la fonction `interrogatif`

**Statut** : 🔒 validé le 2026-11-03 (préalable E5 d'A2-05), addendum de conception normatif et autonome, distinct d'`A2-LING-v1` et d'A9 ; validation autorisée par ChatGPT, sur délégation de l'utilisateur.

**Origine** : préalable normatif E5 du périmètre de la cohérence rétroactive d'A2-05 (rapports `docs/rapports/etape2-A2-05-prealable-E5-interrogatif.md` et `docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md`). Cet addendum reprend la partie I de la révision 4 de ce dernier ; sa partie II, mise à l'épreuve, reste dans le rapport. Il n'ajoute aucune décision qui n'y soit pas.

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
4. **Chaque attribution nouvelle, chaque retrait et chaque modification sont justifiés par leur propre décision explicite**, et cette décision cite le présent addendum au lieu de poser elle-même une définition. **Une attribution existante et inchangée peut être justifiée par un verdict individuel arbitré, traçable dans le rapport d'audit** : elle n'exige alors pas de décision nouvelle.

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
| Les 17 sens qui portent déjà la fonction | **contrôlés un par un contre cette définition**, dans le bloc F du lot 3 du volet 1 d'A2-05 ; aucun n'est tenu pour conforme ou fautif du seul fait de cet addendum ; une attribution maintenue et inchangée est justifiée par son verdict individuel arbitré, traçable dans le rapport d'audit (§3, point 4) |
| Les 17 décisions `type-nul` de ces sens | **examinées selon A6 lors du bloc F**, sens par sens : la fonction interrogative ne suffit pas à elle seule à justifier `semantic_type: null` (§5, point 2) ; **aucun écart n'est présumé** |
| Sens publiés qui ne portent pas la fonction | **recherche d'omissions**, selon la méthode du §8 ; un sens trouvé est signalé, jamais corrigé d'office, et **n'est pas ajouté d'office aux 377 candidats du lot 3** |
| **Séquence** | 1. adoption explicite de cet addendum (numéro, emplacement et statut normatif précisés, après vérification d'unicité) ; 2. préparation et validation d'un **périmètre opérationnel de contrôle** ; 3. examen des 17 sens connus et recherche d'omissions, **coordonnés mais comptabilisés séparément**. Ni la recherche d'omissions ni l'examen du bloc F ne commencent avant l'adoption et l'accord sur ce périmètre |
| Décisions historiques | **aucune n'est réécrite** ; une correction éventuelle se fait par une décision nouvelle, journalisée, avec une réouverture explicite, sur autorisations distinctes |
| Autres fonctions sans définition (`negation`, `pluralisation`, `modalite`, `aspect`, `temps`, `alternative`) | la doctrine du lot 20 reste en vigueur : aucune n'est posée sans définition normative |
| Registre, validateur lexical, outils, tests | **aucun changement** : `interrogatif` est déjà une valeur du registre, contrôlée par I13 |
| A7, A9 | **inchangés** ; A9, §6, décrit l'état antérieur à l'adoption de cet addendum, sans que le texte d'A9 soit modifié |

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

### Décisions de cet addendum

| Point | Décision |
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
| Justification | décision explicite pour une attribution nouvelle, un retrait ou une modification ; verdict individuel arbitré, traçable dans le rapport d'audit, pour une attribution existante et inchangée |
| A9, §6 | décrit l'état antérieur à l'adoption, A9 restant inchangé |
| Recherche des omissions | recherche textuelle large, recherche structurée complémentaire, relecture individuelle ; un filtre ne vaut jamais preuve ; un sens non relevé n'est pas un sens vérifié conforme ; identifiants et filtres d'origine conservés, résultats dédupliqués ; compte rendu de la couverture, des décisions existantes et des limites |
| Séquence | adoption explicite ; périmètre opérationnel validé ; puis contrôle des 17 sens et recherche d'omissions, coordonnés et comptabilisés séparément |
| Omissions découvertes | signalées ; non ajoutées d'office aux 377 candidats du lot 3 |
