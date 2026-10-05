# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 15 « Couleurs, formes, dimensions et poids » · validation

**Date** : 2026-10-05
**Nature** : validation atomique du lot 15, sur l'arbitrage explicite de l'utilisateur : les
dix-sept choix du §4 de la proposition révisée sont retenus tels que proposés. Rien n'est commité à
la rédaction de ce rapport.

**À lire avec** : `docs/rapports/etape2-A2-04-lot15-proposition.md` (la proposition, ses deux
révisions, les alternatives écartées) et `reconstruction/a2-04/rapports/lot-15.md` (rapport généré).

---

## 1. La bascule

**Statuts seulement** : `proposed` → `validated`, pour les 29 entrées du lot et pour ses 50
décisions de journal (D1026 à D1075).

Contrôle d'identité, fait sur les fichiers relus depuis le disque :
- `lot-15.json` : 29 lignes changées, toutes `"status": "proposed"` → `"validated"` ; le contenu
  hors statut est identique ;
- `journal.json` : 50 lignes changées, toutes des statuts, de D1026 à D1075 ; le contenu hors statut
  des 1 075 décisions est identique ; les 1 025 décisions des lots 0 à 14 ne sont pas touchées ;
- le lot cite exactement ses 50 décisions ; aucune valeur, aucune raison n'a été modifiée lors de la
  bascule.

Le journal entier est validé : 1 075 décisions, D0001 à D1075, sans trou. Aucune proposition n'est
en cours.

## 2. Les choix arbitrés

1. **大きな et 小さな** : classe `determinant`, sans groupe, chacune décidée sur sa fiche (« adjectif
   adnominal »), comme この (lot 11).
2. **Noms de couleur** : type `propriete`, comme les adjectifs.
3. **青** : deux sens, le bleu et le vert « par extension » (feux de circulation, verdure).
4. **青い** : deux sens, le bleu et le vert de certains contextes (fruits non mûrs, légumes
   feuillus) ; aucune portée figurée (« immature ») n'est ajoutée.
5. **緑** : deux sens, la couleur et la verdure ; la verdure en `groupe_collectif`, dans monde
   naturel › végétation.
6. **黒い** : « Sombre » gardé comme autre traduction du sens unique.
7. **色** : `suffix: false` ; l'emploi en composé est dit en nuance. 半 reste la seule ENTRY à porter
   `suffix`.
8. **Traductions figurées non développées** (大きな « important », 小さな « modeste », 厚い
   « chaleureux ») : signalées en nuance, hors des sens.
9. **長い et 短い** : un seul sens, la durée conservée en nuance.
10. **低い** : un seul sens ; l'emploi de prix, attesté par la traduction et par l'exemple de la
    fiche, est conservé en nuance. Aucune symétrie n'est imposée avec 高い.
11. **薄い** : trois sens (épaisseur, couleur pâle, goût léger).
12. **Catégorie au niveau 2** (espace › dimensions) pour 広い, 狭い, 太い, 細い, 厚い et 薄い.
13. **Le poids** (重い, 軽い) : catégorie nulle (A5).
14. **重い « grave »** : catégorie nulle ; **軽い « bénin »** : santé › maladies et troubles.
15. **Les nuances rédigées** reprennent les fiches ; aucune n'ajoute un emploi.
16. **細い** : « Étroit », attesté par l'exemple de la fiche, gardé comme autre traduction.
17. **大きな** : un seul sens, classé en taille ; l'emploi pour une voix, attesté par l'exemple
    (大きなこえ), est conservé en nuance.

**Ce ne sont pas des règles générales.** Chaque sens suit sa fiche, exemple compris. Les extensions
de 低い, 長い, 短い et 大きな restent dans un sens unique par arbitrage sur ces fiches ; cela ne fixe
ni seuil sur la valeur des exemples, ni symétrie entre deux entrées.

## 3. Assemblage réel

`node tools/reconstruction/run.mjs assemble`, sortie sans erreur :

| ENTRY | Retraits | Écartées | Problèmes de décision | Erreurs lexicales | Attente |
|---|---|---|---|---|---|
| **530** | **31** | **158** | 0 | 0 | 0 |

- Les 158 entrées écartées sont toutes « non décidées ».
- **Avertissements** : 54, soit 3 de plus qu'avant le lot, tous justifiés au journal : trois
  `categorie-nulle` (重い, sens 1 et 2 ; 軽い, sens 1).
- **Le lot** : 29 entrées, 36 sens (5 entrées à deux sens, 薄い à trois) ; aucune fusion, aucun
  ajout, aucun tag, aucune lecture décidée, aucune relation, aucune fonction linguistique.

## 4. Tests et contrôles

- **Tests** : 449 réussis, 0 échec, 0 sauté. L'essai à blanc en mémoire est retiré : il est devenu
  l'état réel. Le test d'état du lot est adapté à un lot clos et vérifie les choix arbitrés ; le
  test de l'espace de travail réel attend 530 / 31 / 158, 54 avertissements et aucune proposition
  en cours ; le journal entier est attendu validé, de D0001 à D1075.
- **Sabotages** : 15 sur 15 attrapés, chacun vérifié comme modifiant réellement son fichier, puis
  rétabli à l'octet près : une entrée ou une décision du lot remise en `proposed` ; 小さな remise en
  `adjectif_na` ; catégorie nulle sans justification ; emploi de prix retiré de 低い ; lecture
  décidée pour une entrée mécanique ; relation de dérivation ajoutée ; décision d'un lot clos
  rouverte ; verdure remise en `organisme_vivant` ; `suffix: true` pour 色 ; emploi de voix retiré
  de 大きな ; second sens de durée pour 長い ; décision du lot supprimée du journal ; sens de goût
  retiré de 薄い ; portée figurée ajoutée à 青い.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste ; `node --check` sur le fichier de tests modifié.

## 5. Ce qui reste ouvert

- **Extensions conservées en nuance** (低い et le prix, 長い et 短い et la durée, 大きな et la voix) :
  arbitrées en sens unique ; à réexaminer à l'audit A2-05 si une incohérence apparaît entre lots.
- **Catégorie du poids** : le registre des catégories n'en a pas ; 重い et 軽い sont validés sans
  catégorie (A5). Le dire dans le modèle demanderait une décision sur le registre.
- **Catégories au niveau 2** : superficie, circonférence et épaisseur n'ont pas de sous-catégorie
  dans espace › dimensions.
- **Affixes** : 色 est validée sans `suffix` ; la représentation des affixes reste un point ouvert.
- **Voisins hors périmètre**, toujours non décidés : 暗い, 古い, 新しい, 若い, 強い, 弱い, 丈夫, 速い,
  遅い, 早い, 弱く, et le lot réservé « quantité et degré ».

## 6. Suite

Choix du thème du lot 16 parmi les 158 entrées restantes, puis composition de son périmètre par
identifiants. Aucune décision avant la validation d'un périmètre.
