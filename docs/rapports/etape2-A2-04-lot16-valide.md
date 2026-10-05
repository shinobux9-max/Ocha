# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 16 « Préférences, appréciations et états de la personne » · validation

**Date** : 2026-10-05
**Nature** : validation atomique du lot 16, sur l'arbitrage explicite de l'utilisateur : les
dix-huit choix du §4 de la proposition révisée sont retenus tels que proposés. Rien n'est commité à
la rédaction de ce rapport.

**À lire avec** : `docs/rapports/etape2-A2-04-lot16-proposition.md` (la proposition, sa révision,
les alternatives écartées) et `reconstruction/a2-04/rapports/lot-16.md` (rapport généré).

---

## 1. La bascule

**Statuts seulement** : `proposed` → `validated`, pour les 21 entrées du lot et pour ses 51
décisions de journal (D1076 à D1126).

Contrôle d'identité, fait sur les fichiers relus depuis le disque :
- `lot-16.json` : 21 lignes changées, toutes `"status": "proposed"` → `"validated"` ; le contenu
  hors statut est identique ;
- `journal.json` : 51 lignes changées, toutes des statuts, de D1076 à D1126 ; le contenu hors statut
  des 1 126 décisions est identique ; les 1 075 décisions des lots 0 à 15 ne sont pas touchées ;
- le lot cite exactement ses 51 décisions ; aucune valeur, aucune raison n'a été modifiée lors de la
  bascule.

Le journal entier est validé : 1 126 décisions, D0001 à D1126, sans trou. Aucune proposition n'est
en cours.

## 2. Les choix arbitrés

1. **好き** : « Aimer » en traduction principale, attestée par l'exemple de la fiche ; « Aimé » et
   « Préféré » gardées. La classe japonaise n'est pas touchée.
2. **Types** : préférences en `propriete` (好き, 大好き, 嫌い, 嫌), désir en `etat` (欲しい), selon les
   définitions d'A2-ST.
3. **欲しい** : psychologie › états psychologiques.
4. **嫌** : un seul sens ; le refus est conservé en nuance. Classe `adjectif_na`.
5. **楽しい** : « Joyeux » et « Gai » abandonnés ; la fiche décrit ce qui procure du plaisir.
6. **つまらない** : un seul sens ; la formule de modestie est conservée en nuance.
7. **下手** : dans « habileté », comme 上手.
8. **易しい et 難しい** : sans catégorie, avec la dimension facilité / difficulté, comme 大変.
9. **悪い** : un seul sens ; l'excuse est conservée en nuance, « familièrement » étant retenu contre
   « formule polie ».
10. **大切** : un seul sens, avec la dimension d'importance.
11. **立派** : deux sens (une chose impressionnante ; une personne admirable). Classe `adjectif_na`.
12. **便利** : dimension d'utilité ; **有名 et 危ない** : aucune dimension.
13. **危ない** : un seul sens ; « Attention ! » est conservé en nuance.
14. **Douze catégories nulles** (A5) : 易しい, 難しい, 悪い, 大切, 立派 (deux sens), 便利, 有名,
    危ない, 暇, 忙しい, 大丈夫.
15. **元気** : états et besoins physiques › fatigue et énergie physique, en `etat`.
16. **暇** : « Libre » en tête, « Temps libre » gardé.
17. **Traductions non développées** (元気 « joyeux » ; 大丈夫 « en sécurité », « correct ») :
    signalées en nuance, hors des sens.
18. **Fiches « adjectif en na (et nom) »** (好き, 元気, 暇) : classe mécanique, rien n'est ajouté ;
    le point reste ouvert.

**Les principes appliqués, arbitrés avec le périmètre** :
- un axe existant d'A2-DIM est employé lorsqu'il décrit directement le sens, et seulement alors ;
- une traduction française naturelle est retenue lorsque la fiche l'atteste ; la classe grammaticale
  japonaise reste dite.

**Ce ne sont pas des règles générales.** Chaque sens suit sa fiche, exemple compris ; aucune
symétrie n'est imposée entre deux entrées.

## 3. Assemblage réel

`node tools/reconstruction/run.mjs assemble`, sortie sans erreur :

| ENTRY | Retraits | Écartées | Problèmes de décision | Erreurs lexicales | Attente |
|---|---|---|---|---|---|
| **551** | **31** | **137** | 0 | 0 | 0 |

- Les 137 entrées écartées sont toutes « non décidées ».
- **Avertissements** : 66, soit 12 de plus qu'avant le lot, tous des `categorie-nulle` justifiées au
  journal.
- **Le lot** : 21 entrées, 22 sens (seule 立派 en a deux) ; aucune fusion, aucun ajout, aucun tag,
  aucune lecture décidée, aucune particule décidée, aucune relation, aucune fonction linguistique.
- **Dimensions** : quatre sens du lot en portent une ; le corpus en compte sept.

## 4. Tests et contrôles

- **Tests** : 450 réussis, 0 échec, 0 sauté. L'essai à blanc en mémoire est retiré : il est devenu
  l'état réel. Le test d'état du lot est adapté à un lot clos et vérifie les choix arbitrés, dont
  les traductions exactes des 21 entrées ; le test de l'espace de travail réel attend 551 / 31 /
  137, 66 avertissements et aucune proposition en cours ; le journal entier est attendu validé, de
  D0001 à D1126.
- **Sabotages** : 19 sur 19 attrapés, chacun vérifié comme modifiant réellement son fichier, puis
  rétabli à l'octet près : une entrée ou une décision du lot remise en `proposed` ; une décision
  d'un lot clos rouverte ; pour 好き, la particule が ajoutée, la nuance remise selon la fiche
  fautive, la traduction principale remise à « Aimé » ; une classe changée (立派) ou décidée à tort
  (元気) ; une dimension retirée, ajoutée sans raison ou inversée ; une catégorie nulle sans
  justification ; un second sens créé pour « Attention ! » ; l'homophone ajouté à 易しい ; une
  fonction pragmatique ajoutée ; la catégorie ou le type de 欲しい changés ; une décision du lot
  supprimée ; le second sens de 立派 retiré.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste ; `node --check` sur le fichier de tests modifié.

## 5. Ce qui reste ouvert

- **« Adjectif en na (et nom) »** : les fiches de 好き, 元気 et 暇 le disent ; le schéma ne porte
  qu'une classe par ENTRY.
- **Emplois d'adresse** (refus de 嫌, excuse de 悪い, avertissement de 危ない, exclamation de 痛い) :
  conservés en nuance. Les fonctions pragmatiques d'A2-LING n'ont pas de définition normative ; à
  reprendre si elles en reçoivent une.
- **Catégories nulles** : le lot en ajoute douze. À recouper à l'audit A2-05 avec leurs
  justifications, comme les précédentes.
- **Voisins hors périmètre**, toujours non décidés : les 17 adjectifs des choses et des lieux (dont
  暗い et 丈夫), 同じ et いろいろ, et les réserves antérieures (多い, 少ない, 早い).

## 6. Suite

Choix du thème du lot 17 parmi les 137 entrées restantes, puis composition de son périmètre par
identifiants. Aucune décision avant la validation d'un périmètre.
