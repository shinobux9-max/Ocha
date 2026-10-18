# Étape 2 · A2-05 · Volet 1 · Lot 3 — étude d'évolution de la méthode des livraisons

**Date** : 2026-10-18
**Statut** : **étude, sans décision.** Demandée par l'arbitrage de B9 du 2026-10-18 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Avant toute décision sur cette évolution, nous souhaitons ton analyse technique et méthodologique. » **Aucun script existant, aucune règle et aucun découpage opérationnel n'est modifié ; aucun périmètre de B10 n'est préparé ; aucun audit lexical n'est fait.** Seul un inventaire documentaire, en lecture seule, a été établi pour éclairer l'étude (`docs/rapports/etape2-A2-05-volet1-lot3-inventaire-restants.md`, écrit par `a2-05-travail/inventaire-v1-lot3-restants.mjs`, nouveau script).

## 1. Ce que l'on mesure aujourd'hui

**Avancement.** Lot 3 : 148 sens arbitrés sur 377 ; **229 restent, dans 205 ENTRY et 24 livraisons** du découpage arbitré le 2026-10-12 (bloc B : 69 ; C : 35 ; D : 84 ; E : 24 ; F : 17, suspendu à E5). **Hors du bloc F, 212 sens sont examinables.**

**Coût d'un cycle actuel.** Depuis B2, chaque livraison passe par deux cycles : un périmètre opérationnel, puis l'audit. Pour B6 à B9 (35 sens), cela a fait **8 cycles**, et chacun a demandé :

- un script propre (périmètre ou audit) et son rapport ;
- un script de synchronisation écrit pour l'occasion (`tourNN.mjs`), qui patche cinq documents (`ETAT-ACTUEL.md`, `ROADMAP.md`, le bilan du volet 2, le relais de reprise, l'inventaire des scripts) sur des ancres textuelles longues et changeantes ;
- une note d'export, un export `01` à `10` et une archive.

**Volumes mesurés :**

| Élément | Mesure |
|---|---|
| Rapport d'audit | 62 à 75 Ko pour 7 à 10 sens, soit **environ 7 Ko par sens** |
| Motivations écrites à la main (script d'audit) | 25 à 37 Ko par livraison, soit **environ 3,5 Ko par sens** |
| Fiche source et anciens exemples | médiane 1,6 k caractères, maximum 2,2 k : **la lecture des fiches n'est pas le goulet** |
| `05-relais.md` | 364 Ko, dont **environ 250 Ko pour le relais de reprise, recopié en entier à chaque export** |
| `10-diff-et-controles.md` | **26 Mo**, en hausse d'environ 0,4 Mo par cycle : l'outil recopie en entier les 293 fichiers non suivis accumulés depuis le dernier commit (`558f150`, 2026-10-12) |
| Archive de transfert | environ 6 Mo |

**Erreurs survenues dans ce mode de travail**, toutes signalées :

- un décompte tapé à la main et faux dans une note (« 71 sur 148 » au lieu de 69) ;
- une date héritée par dérivation (périmètre de B7 daté du 2026-10-16) ;
- une phrase inexacte corrigée avant livraison (types des paires `transitive_of`) ;
- un faux rapprochement du module (後, D1425), qui a faussé l'affichage R4 de B8.

Aucune ne venait de la lecture des fiches. **Toutes venaient du texte répétitif ou d'un calcul fait hors des données.**

## 2. Réponses aux sept questions

### 2.1 Les scripts actuels peuvent-ils traiter 25 à 30 sens par livraison sans perte de fiabilité ?

**Techniquement, oui pour la génération ; non sans deux corrections préalables.**

**Ce qui tient à l'échelle.** Le module commun `lot3-commun.mjs` n'a aucune limite de taille. Ses contrôles sont indépendants du nombre de sens :
- l'identité avec les lignes du périmètre arbitré ;
- la validation de toutes les décisions lues ;
- l'appartenance de chaque numéro de décision cité à l'ENTRY ;
- le contrôle des décisions qui motivent le type ;
- la recherche des corrections retenues par identifiant entier ;
- l'exclusion des 147 sens du volet 2.

**Ce qui casserait ou se dégraderait, en l'état :**

1. **Les deux ENTRY hors JLPT arrêteraient le module.** レジ袋 (`v_718`, en B12) et ポイントカード (`v_719`, en C4) sont publiées sous `v_…`, mais leur fiche et leur lot portent `hj_v_1` et `hj_v_2`. Le module cherche la fiche sous `n5_` suivi de l'identifiant publié. Ce n'est pas une question de taille : **B12 et C4 ne pourraient pas être livrées sans une correction**, quelle que soit la méthode.
2. **Le faux rapprochement par sous-chaîne s'aggraverait.** La recherche des « décisions de type d'autres ENTRY qui nomment le mot » compare des chaînes. Pour 後 (un caractère), elle a trouvé D1425, qui ne parle que du sens 3. B14 compte 紙, 木 et 風, tous d'un seul caractère : le décompte R4 risque d'y être faux plusieurs fois.
3. **Les tableaux répètent une ENTRY qui porte deux sens de la livraison.** Le défaut a été corrigé dans le script de périmètre de B9, pas dans le module.
4. **Les nombres des notes et des documents de pilotage sont tapés à la main.** L'erreur « 71 » le montre ; plus une livraison est grande, plus ces nombres sont nombreux.

**Le vrai goulet n'est pas technique.** C'est la qualité des motivations écrites à la main, et la capacité de relecture humaine. Le module ne contrôle pas que chaque motivation traite chaque champ, ni que chaque citation « La fiche dit » figure dans la fiche.

### 2.2 Peut-on préparer un périmètre global des 229 sens, en sous-lots cohérents, sans anticiper les verdicts ?

**Ce périmètre global existe déjà.** Le périmètre du lot 3, arbitré le 2026-10-12, affecte chacun des 377 sens à un bloc et une livraison, avec des contrôles de couverture et de non-duplication. Les scripts de périmètre ne lisent aucune fiche pour la juger : ils n'anticipent rien.

**Ce qu'il faut ajouter n'est pas un nouveau découpage, mais un regroupement des livraisons existantes en tranches**, sans déplacer aucun sens. L'ordre des blocs du §9 du périmètre du lot 3 est conservé. Proposition, à arbitrer :

| Tranche | Livraisons regroupées | Sens | Question directrice | Remarques |
|---|---|---|---|---|
| T1 | B10, B11, B12 | 24 | catégories et types (être humain, fin ; habillement) | contient `v_718` (hors JLPT) |
| T2 | B13, B14 | 21 | catégories et types (habitat ; matières, médias, nature) | mots d'un caractère (faux rapprochements) |
| T3 | B15, B16 | 24 | catégories et types (domaines divers) | hétérogène par les domaines, homogène par la question |
| T4 | C1 à C4 | 35 | tags, dimensions, justifications datées | questions étroites ; contient `v_719` ; peut être coupée en 18 et 17 |
| T5 | D2, D3 | 22 | démonstratifs et pronoms (A7) | homogène |
| T6 | D6, D7 | 22 | liaison et formules (A9) | homogène |
| T7 | D1, D4 | 24 | fonctions et `null` (divers) | |
| T8 | D5, D8 | 16 | fréquence, quantité, degré (A9) | |
| T9 | E1, E2, E3 | 24 | points réservés | motifs hétérogènes ; à couper si l'arbitrage le préfère |
| — | F1, F2 | 17 | interrogatifs | **suspendu à E5, hors plan** |

**Soit 212 sens en 9 tranches, de 16 à 35 sens (moyenne 23,6).** Le **périmètre opérationnel** de chaque tranche ne ferait plus l'objet d'un cycle à part. Il serait généré dans le rapport de la tranche, en tête : règles, comparables, décisions antérieures, risques. Son contenu ne dépend que des données et du découpage arbitré, jamais des fiches.

### 2.3 Quels contrôles renforcer contre les omissions, les doublons, les faux rapprochements et les régressions ?

| Risque | Contrôle à ajouter ou à durcir |
|---|---|
| **Omission** | **Un registre de couverture des 377**, calculé à chaque exécution à partir des rapports : statut de chaque sens (arbitré, proposé, restant). Le script s'arrête si un sens est absent ou présent dans deux rapports. |
| **Champ non examiné** | Une vérification de chaque motivation, qui doit nommer la catégorie, le type, les fonctions, les dimensions, les tags, les relations, les particules et `counter`, ainsi que **chaque règle du criblage** qui désigne le sens ; un manque arrête le script. |
| **Citation infidèle** | Chaque passage entre guillemets annoncé par « La fiche dit » doit se retrouver, normalisé, dans la fiche source ; chaque citation de décision dans sa raison. |
| **Faux rapprochement** | Remplacer la recherche par sous-chaîne par une recherche sur l'identifiant d'ENTRY et le numéro de sens ; ce que l'on ne peut pas résoudre est **listé pour lecture humaine, jamais compté**. |
| **Identifiants hors JLPT** | Résolution par la table d'identifiants qu'emploie l'assemblage (A4), et non par `n5_` suivi de l'identifiant publié. |
| **Doublon d'ENTRY dans les tableaux** | Dédoublonnage par ENTRY partout où une ligne représente une ENTRY. |
| **Régression des rapports arbitrés** | Un manifeste d'empreintes (SHA-256) des rapports arbitrés A1 à B9, contrôlé à chaque exécution. Aujourd'hui, seuls A4 à A7 et B2 sont comparés, à des copies d'un dossier temporaire de session. Les scripts des livraisons arbitrées ne seraient plus jamais relancés. |
| **Nombre faux dans une note** | Tous les nombres des notes et des documents de pilotage seraient calculés par script, aucun tapé à la main. |
| **Liste des corrections** | Le recalcul actuel (185 corrections dans 165 ENTRY) est conservé, avant et après chaque inscription. |

### 2.4 Comment réduire les opérations documentaires répétitives sans affaiblir la traçabilité ?

1. **Un cycle par tranche, au lieu de deux par livraison.** L'export de la tranche N porterait à la fois la formalisation de l'arbitrage de la tranche N − 1 et la proposition de la tranche N, périmètre compris. On passerait d'environ 42 cycles (21 livraisons hors F, deux cycles chacune) à environ 9 ou 10.
2. **Une synchronisation stable, non réécrite à chaque fois.** Un seul script, piloté par un petit registre des tranches (identifiant, sens, statut, verdicts, corrections), régénérerait :
   - les nombres des cinq rubriques communes à `ETAT-ACTUEL.md` et `ROADMAP.md`, entre deux marqueurs ;
   - une ligne de journal par tranche ;
   - une sous-section du bilan par tranche ;
   - une puce courte du relais.

   Les scripts `tourNN.mjs` disparaîtraient, avec leurs ancres fragiles. La traçabilité resterait entière : rapports immuables, §0 d'arbitrage, journal, bilan.
3. **Un relais de reprise allégé.** Il compte aujourd'hui une puce d'environ 2 Ko par cycle, et chaque export le recopie en entier (250 Ko). Il faudrait n'y garder que l'état courant et renvoyer au bilan pour l'historique ; l'export joindrait la différence, non le fichier entier.
4. **Un `10-diff` lisible.** Ses 26 Mo viennent de l'absence de commit depuis le 2026-10-12. **Un commit de checkpoint documentaire**, sur autorisation distincte, au moment de la transition puis après chaque deux ou trois tranches, ramènerait ce fichier à la taille du travail en cours. Il protégerait aussi six jours de travail non committé. Sans commit, une option de l'outil d'export limitant les fichiers recopiés serait une modification d'un outil du dépôt, donc à autoriser.

### 2.5 Peut-on distinguer cas simples et cas complexes sans réduire le contrôle individuel ?

**Oui, par un tri déclaré en tête de chaque rapport.** Tous les sens gardent leur fiche d'examen complète. Le tri sert l'ordre de lecture, non le contrôle.

- **Cas simple** : catégorie et type nommés par A2-L3 et A2-ST, et établis par la fiche ou par une décision, sans question normative ni divergence à porter à l'arbitrage.
- **Cas complexe** : lecture normative (A7, A9, A2-DIM, A5, A6), divergence avec des comparables, fiche ambiguë, sens sans exemple propre, correction proposée, ou règle du criblage non soldée par une décision.

Le classement suit des critères écrits avant la rédaction, et le script affiche à côté les indicateurs mesurés (règles, fonctions, décisions, autres sens de l'ENTRY). Le relecteur lit d'abord les cas complexes. Il peut contrôler les cas simples par sondage, ou tous. Une seule règle : **tout point porté à l'arbitrage rend le cas complexe.**

**Risque** : l'étiquette « simple » peut endormir la vigilance. Parade : le tri ne dispense d'aucun champ, et un relecteur qui conteste un « simple » le fait passer en complexe, sans autre formalité.

### 2.6 Quelle taille de livraison ?

**Recommandation : 20 à 25 sens par tranche, homogènes par la question directrice, et jusqu'à 35 quand la question est étroite (bloc C).**

- **Volume** : environ 7 Ko de rapport par sens, soit 150 à 180 Ko pour 25 sens ; avec un relais allégé, `05-relais.md` resterait sous 400 Ko. Au-delà de 30 sens dans les blocs D et E, le rapport dépasserait 200 Ko, et les lectures normatives s'accumuleraient.
- **Arbitrage** : B6 à B9 ont porté 1 à 3 lectures pour 7 à 10 sens. À 25 sens, il faut en attendre 4 à 8 par tranche. C'est encore arbitrable en un message. À 50, une contestation sur un point retarderait tout le reste.
- **Un périmètre unique de 212 sens livré d'un coup : déconseillé.** Il ne serait pas relisible, et une erreur systématique toucherait tout. Le regroupement en tranches garde le périmètre global sans ce risque.
- **Les blocs D et E** (fonctions, points réservés) gagneraient à rester près de 20 ; le bloc C pourrait aller à 35.

### 2.7 Quelles modifications faudrait-il, et avec quels risques ?

| Modification | Nature | Risque | Parade |
|---|---|---|---|
| **Module commun, version 2** (`lot3-commun-v2.mjs`, nouveau fichier) : identifiants hors JLPT, recherche sans sous-chaîne, vérifications de motivation, tri simple ou complexe, section « périmètre opérationnel », dédoublonnage par ENTRY | nouveau script ; la version 1 reste gelée | des rapports v1 et v2 de forme différente | v1 n'est jamais relancé ; un essai de non-régression montre que la v2 retrouve, pour B6 à B9, les mêmes verdicts, catégories, types et décomptes R4 (6 sur 7 pour B8, valeur arbitrée) |
| **Registre de couverture et manifeste d'empreintes** | nouveaux fichiers dans `a2-05-travail/` | aucun sur les données | calculés, jamais saisis |
| **Synchronisation stable** (un seul script et un registre des tranches, marqueurs dans les rubriques) | nouveau script ; les marqueurs ajoutés une fois dans `ETAT-ACTUEL.md` et `ROADMAP.md` | une première insertion de marqueurs dans les documents de pilotage | une proposition dédiée, relue avant toute exécution |
| **Relais de reprise allégé** | réécriture documentaire | perte d'historique | l'historique reste dans le bilan et le journal ; l'ancien relais est conservé dans git au checkpoint |
| **Option de l'outil d'export** (limiter les fichiers recopiés) | **outil du dépôt** (`tools/`) | toucher un outil testé | autorisation distincte, test ajouté ; inutile si un commit de checkpoint est autorisé |
| **Commit de checkpoint documentaire** | git | aucun sur les données | autorisations distinctes de commit et de push, comme le 2026-10-12 |

**Risques transversaux** :
- **la fatigue de relecture**, contre laquelle jouent le tri et la taille de 20 à 25 sens ;
- **la propagation d'une erreur systématique**, par un texte commun réutilisé à tort, que les vérifications automatiques et la citation obligatoire de la fiche limitent ;
- **l'arbitrage partiel**, qui ne retiendrait qu'une partie d'une tranche : le module connaît déjà le verdict « suspendu », et un sens suspendu reste proposé, sans bloquer les autres.

## 3. Recommandation et fonctionnement proposé

**Passer à des tranches de 20 à 25 sens (35 pour le bloc C), un cycle par tranche, après une étape d'outillage relue, et sans toucher au découpage arbitré du lot 3.**

1. **Étape 0, aujourd'hui** : cette étude. L'arbitrage de la méthode décide de la taille, du regroupement (tableau du §2.2 ou autre) et de l'ordre.
2. **Étape 1, outillage, sans audit lexical.** Une proposition livrée et relue :
   - le module v2 ;
   - les vérifications ;
   - le registre de couverture et le manifeste d'empreintes ;
   - le script de synchronisation stable ;
   - le relais allégé ;
   - l'essai de non-régression sur B6 à B9.

   Si l'arbitrage l'autorise, un commit de checkpoint documentaire, avant ou après cet outillage.
3. **Étape 2, tranche pilote T1** (B10, B11, B12 : 24 sens, dont le cas hors JLPT `v_718`). Le rapport contient : le périmètre opérationnel généré, le tri simple ou complexe, les 24 fiches complètes, les points portés à l'arbitrage et les contrôles. L'export porte aussi la formalisation de l'arbitrage précédent.
4. **Étape 3, bilan du pilote.** On mesure la taille, le nombre de lectures portées à l'arbitrage, les erreurs relevées et le temps de relecture, puis on confirme ou on ajuste la taille.
5. **Étape 4, généralisation** : T2 à T9, un cycle chacune ; un checkpoint git après chaque deux ou trois tranches, sur autorisation. Le bloc F reste hors plan jusqu'à E5.

**Alternative minimale**, si l'on préfère ne pas outiller : grouper deux ou trois livraisons existantes par cycle et fusionner périmètre et audit, avec les scripts actuels. **Elle exige quand même de corriger la résolution des identifiants hors JLPT avant B12 et C4.** Elle laisse en place les faux rapprochements, les nombres tapés à la main et le volume des exports. **Je ne la recommande pas** au-delà de T1.

**Ce que la recommandation conserve, point par point** :

| Exigence | Comment elle est tenue |
|---|---|
| lecture intégrale de chaque fiche | inchangée ; vérification des citations |
| contrôle individuel de chaque champ | inchangé ; vérification des motivations |
| décisions antérieures et normes | inchangé ; numéros de décision contrôlés, comme aujourd'hui |
| verdicts motivés individuellement | inchangé |
| séparation proposition, arbitrage, application | inchangée : §0, rapports immuables, liste des corrections |
| traçabilité des corrections | recalcul conservé |
| couverture sans oubli ni doublon | renforcée par le registre des 377 |
| chantiers fermés, données, git | inchangés ; tout commit sur autorisation distincte |

## 4. Questions à l'arbitrage

1. La taille (20 à 25 sens, 35 pour le bloc C) et le regroupement en neuf tranches du §2.2 sont-ils retenus, ou un autre ?
2. L'étape d'outillage (module v2, vérifications, registre de couverture, synchronisation stable, relais allégé, essai de non-régression) est-elle autorisée comme proposition, avant toute nouvelle livraison lexicale ?
3. Un commit de checkpoint documentaire est-il envisagé, et à quel moment (autorisations distinctes de commit et de push) ?
4. La tranche pilote T1 (B10 à B12, 24 sens) convient-elle ?
