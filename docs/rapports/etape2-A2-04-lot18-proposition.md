# Ocha v2 — Rapport de l'étape 2 · A2-04 · lot 18 « Actions sur les objets » · proposition

**Date** : 2026-10-06
**Nature** : livraison pour relecture. **Tout est `proposed`** : les 23 entrées du lot et ses 73
décisions de journal. Rien n'est validé, rien n'est commité.

**Version** : révisée le 2026-10-06 après l'arbitrage des vingt choix (§8). Le texte ci-dessous
décrit la proposition révisée ; le tableau du §5 reste celui qui a été relu.

**État** : les vingt choix du §5 sont **arbitrés** (par ChatGPT, sur délégation de l'utilisateur, qui l'approuve) : dix-sept retenus tels que
proposés, trois révisés (§8). Le lot est **validé** depuis le 2026-10-06
(`docs/rapports/etape2-A2-04-lot18-valide.md`). Ce rapport reste la proposition telle qu'elle a
été relue : les mentions « proposed » et l'essai à blanc y décrivent l'état d'avant la validation.

**À lire avec** : `reconstruction/a2-04/rapports/lot-18.md` (rapport généré, entrée par entrée) et
`docs/rapports/etape2-A2-04-lot18-perimetre.md` (périmètre arbitré, §8).

**Méthode** : chaque fiche a été lue en entier, traductions, nuance **et exemple**. Aucun sens,
aucune lecture, aucune graphie, aucune particule n'est ajouté par connaissance externe.

---

## 1. Ce qui est livré

| Objet | État |
|---|---|
| `reconstruction/a2-04/lots/lot-18.json` | nouveau : 23 entrées, toutes `proposed`, aucun ajout, aucun retrait |
| `reconstruction/a2-04/journal.json` | 73 décisions `proposed`, D1168 à D1240, ajoutées à la fin (D1240 à la révision) ; les 1 167 décisions validées sont identiques |
| `reconstruction/a2-04/rapports/lot-18.md` | rapport généré |
| `tests/reconstruction/workspace.test.js` | trois tests adaptés (espace de travail réel, lot 17 dans l'assemblage réel, journal), deux tests ajoutés |
| Autres lots, règles, validateur, registres, sources figées | inchangés |

**Sens** : 34, pour 23 entrées. Dix entrées ont plusieurs sens (neuf en ont deux, 出す en a trois) ;
treize en ont un seul.

| Nature | Champ | Nombre |
|---|---|---|
| `decision` | sens | 16 |
| `abandon` | sens (traductions écartées) | 15 |
| `categorie-nulle` | catégorie d'un sens (A5) | 23 |
| `decision` | catégorie d'un sens | 5 |
| `decision` | relations (paires candidates à 5.16) | 8 |
| `correction` | lecture | 2 |
| `decision` | nuance (verbe nommé en romaji : mention non reprise pour 開く, gardée pour 変える) | 2 |
| `abandon` | nuance (exemple fautif) | 1 |
| `correction` | nuance (kanji fautif) | 1 |

Aucune forme usuelle, aucune classe, aucune graphie, aucun tag, aucune relation, aucune dimension
ni aucune fonction linguistique n'est décidé. Les 23 entrées gardent leur classe mécanique, `verbe`.

## 2. L'arbitrage du périmètre, tel qu'il est appliqué

1. **Périmètre** : les 23 identifiants arbitrés, dans l'ordre du rapport de périmètre ; un test le
   contrôle.
2. **Relations** : `relations: []` pour les 34 sens. Les quatre paires sont inscrites au journal,
   **une décision par membre**, sur le champ `relations` (nature `decision`, avant `null`, après
   `[]`) ; chacune nomme la paire, l'autre membre, son rôle (transitif ou intransitif) et l'audit de
   5.16. Ces huit décisions sont la liste des candidates.

   | Paire | Intransitif | Transitif |
   |---|---|---|
   | 開く / 開ける | D1171 | D1175 |
   | 閉まる / 閉める | D1179 | D1183 |
   | 消える / 消す | D1187 | D1192 |
   | 並ぶ / 並べる | D1228 | D1231 |

   Le correspondant que nomme chaque fiche est dit **en nuance** (« Ouvrir quelque chose se dit
   開ける »), sans relation. 変える nomme un intransitif, « kawaru », qui n'est pas une entrée des
   sources : aucune paire, la mention reste en nuance (D1233).
3. **取る, « prendre une photo »** : D1201, `abandon` sur les sens, raison « Confusion de la source,
   écartée ». Aucun sens photographique. Nuance : « Prendre une photo s'écrit 撮る, de même
   lecture : c'est un autre mot. »
4. **引く, « jouer d'un instrument »** : D1210, même forme. Aucun sens musical. Nuance : « Jouer d'un
   instrument à cordes ou du piano s'écrit 弾く, de même lecture : c'est un autre mot. »

撮る (lot 08) et 弾く (lot 09) ne sont pas touchées : elles restent validées, et leurs nuances
renvoyaient déjà à 取る et à 引く.

## 3. Résultats

| État | ENTRY | Retraits | Écartées | Problèmes | Erreurs lexicales | Attente |
|---|---|---|---|---|---|---|
| Avant la proposition (commit `2387d20`) | 567 | 32 | 120 | 0 | 0 | 0 |
| **Réel**, proposition en cours | **567** | 32 | 120 (97 non décidées, 23 propositions) | 0 | 0 | 0 |
| **Essai à blanc**, tout supposé validé, en mémoire | **590** | **32** | **97** | 0 | 0 | 0 |

- **L'état réel ne change pas** tant que rien n'est validé : les 23 propositions restent hors de
  l'assemblage.
- **Essai à blanc** : 590 = 567 + 23. Les 23 ENTRY sont des verbes, sans relation ; chaque forme
  n'existe qu'une fois (取る et 撮る, 引く et 弾く, 閉める et 締める restent des ENTRY distinctes).
- **Avertissements à l'essai à blanc** : 98, soit 23 de plus, tous des `categorie-nulle` justifiées
  au journal.
- **Tests** : 466 réussis, 0 échec (464 avant ; deux tests ajoutés : l'état du lot 18 proposé,
  l'essai à blanc).
- **Sabotages** : 36 joués après la révision (les 26 de la livraison, rejoués, et 10 sur les trois
  points révisés), tous attrapés, chacun vérifié comme modifiant réellement son fichier,
  puis rétabli à l'octet près (empreintes contrôlées). Entrée ou décision validée sans
  autorisation ; relation posée contre l'arbitrage ; sens photographique ou musical recréé ; renvoi
  vers 撮る ou 弾く retiré ; paire candidate effacée du journal ; lecture remise aux furigana
  fautifs, ou retirée ; particule absente de la fiche ; particules d'un sens unique ; catégorie
  nulle sans justification ; traduction abandonnée remise, ou perdue sans décision ; kanji fautif
  et texte parasite repris en nuance ; décision d'un lot clos rouverte ; 撮る rouverte ; décision
  supprimée ; type ou catégorie changés ; entrée ajoutée ou retirée du périmètre ; sens retiré ;
  date changée.
- `check-layers` sans violation ; `validate-data` : 0 erreur, 8 avertissements connus ; sources
  conformes au manifeste.

## 4. Les choix lexicaux, groupe par groupe

Notation : **traduction principale** | autres traductions ; catégorie ; type ; particules décidées
(entrées à plusieurs sens seulement, les autres reprennent celles de la fiche).

### A. Ouvrir, fermer, allumer, éteindre (6)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 開く | **S'ouvrir** (« être ouvert » en nuance) | aucune | evenement |
| 開ける | **Ouvrir** | aucune | action |
| 閉まる | **Se fermer** (« être fermé » en nuance) | aucune | evenement |
| 閉める | **Fermer** | aucune | action |
| 消える | 1. **S'éteindre** (が) · 2. **Disparaître** \| S'effacer (が) | aucune | evenement |
| 消す | 1. **Éteindre** (を) · 2. **Effacer** (を) | aucune · communication › écriture | action |

- **開く et 閉まる** (D1168, D1177, révisées) : un seul sens, `evenement`. « Être ouvert » et « Être
  fermé » ne sont ni d'autres traductions ni un second sens : un événement et l'état qui en résulte
  ne sont pas deux traductions équivalentes. La nuance dit : « Désigne aussi l'état qui en résulte :
  être ouvert. »
- **« hiraku »** (D1170, révisée) : la fiche de 開く le nomme sans sens, sans kana et sans
  distinction exploitable ; la mention n'est pas reprise en nuance, et aucune lecture n'est ajoutée.
- **Lecture de 閉まる** (D1176) : la source donne des furigana sur 閉る (しま sur le kanji). Lecture
  et romaji de la fiche repris ; し sur 閉, ま en okurigana, comme dans les trois anciens exemples de
  la fiche et dans la fiche de 閉める.
- **閉める** : l'exemple de la source commence par du texte parasite (« 1sutekina mado o ») ; il
  n'est repris nulle part (D1182).
- **消える et 消す** : chaque fiche décide pour elle-même. Le second sens de 消える est « disparaître
  de la vue », celui de 消す « effacer des notes écrites » ; aucune symétrie n'est imposée.
- **Écartées** : « Déverrouiller » (non développée, signalée en nuance), « Déballer » (plus
  étroite), la glose de 閉める, « Faire disparaître » (non développée, signalée en nuance).

### B. Manipuler (9)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 付ける | 1. **Allumer** (を) · 2. **Fixer** \| Attacher (を) | aucune | action |
| 切る | 1. **Couper** \| Trancher (を) · 2. **Raccrocher (un téléphone)** \| Éteindre (un contact) (を) | aucune | action |
| 取る | 1. **Prendre** \| Saisir (を) · 2. **Obtenir** (を) | aucune | action |
| 貼る | **Coller** \| Afficher | aucune | action |
| 使う | **Utiliser** \| Se servir de \| Employer (un objet ou une langue) | aucune | action |
| 押す | **Pousser** \| Appuyer sur (un bouton) \| Tamponner | aucune | action |
| 引く | 1. **Tirer** (を) · 2. **Chercher (dans un dictionnaire)** (を) | aucune · communication › langues | action |
| 締める | **Serrer** \| Attacher \| Nouer (une cravate, une ceinture) | habillement › accessoires vestimentaires | action |
| 差す | 1. **Ouvrir (un parapluie)** (を) · 2. **Pointer** (を) | habillement › accessoires vestimentaires · aucune | action |

- **押す** : un seul sens. La fiche réunit trois objets (un objet, un bouton, un tampon) pour un
  même geste ; l'exemple (le bouton) est conservé en nuance.
- **締める** (D1240, ajoutée à la révision) : « Serrer » en traduction principale, devant
  « Attacher », que la source donne en premier. La fiche définit l'action comme « serrer, nouer ou
  attacher », son exemple dit « je noue (serre) ma cravate », et « Serrer » distingue mieux 締める
  de 付ける (« Fixer | Attacher »). Seul l'ordre change.
- **締める** : la nuance de la source écrit ネクタイを閉める, avec le kanji de l'homophone qu'elle
  demande de ne pas confondre ; la nuance reprend l'exemple de la fiche, avec 締める (D1215).
- **差す** : « Lever (une main, un parasol) » réunit les deux emplois ; écartée, ses deux moitiés
  étant dites dans les sens.
- **Écartées** : « Appliquer », « Tracer (une ligne) », « Verser (des gouttes) » (non développées,
  signalées en nuance) ; la glose de 貼る ; les deux confusions arbitrées.

### C. Placer et déplacer (6)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 置く | **Poser** \| Placer \| Mettre | espace › position et localisation | action |
| 入れる | **Mettre dans** \| Insérer \| Faire entrer | espace › entrée et sortie › entrer, sortir | action |
| 出す | 1. **Sortir** \| Mettre dehors (を) · 2. **Envoyer (du courrier)** (を) · 3. **Présenter** (を) | entrer, sortir · communication › transmission · aucune | action |
| 並ぶ | 1. **Faire la queue** \| Se mettre en rang (に) · 2. **Être aligné** (aucune particule) | aucune · espace › position et localisation | action · etat |
| 並べる | **Aligner** \| Disposer \| Mettre en rang | espace › position et localisation | action |
| 変える | **Changer** \| Modifier \| Transformer \| Remplacer | aucune | action |

- **入れる** : « Mettre dans » passe en traduction principale, devant « Insérer » : la source la
  donne et son exemple l'atteste (principe arbitré au lot 16).
- **出す** : trois sens, comme 出る (lot 04). L'exemple porte sur la lettre.
- **並ぶ** : une action de personnes, un état de choses, comme les deux sens de 曲がる (lot 0).
- **Écartées** : « Laisser (quelque part) », « Préparer (du thé, du café) », « Exposer » (non
  développées, signalées en nuance).

### D. Fabriquer et entretenir (2)

| Entrée | Sens | Catégorie | Type |
|---|---|---|---|
| 作る | 1. **Fabriquer** \| Créer \| Produire (を) · 2. **Préparer (un repas)** (を) | aucune · alimentation › cuisine et préparation | action |
| 磨く | **Brosser** \| Polir \| Frotter | aucune | action |

- **Lecture de 作る** (D1234) : balise fermante cassée dans les furigana de la source ; contenu
  repris tel quel, comme pour 一人 (D1012).
- **磨く** : un seul sens, un geste et deux objets typiques (les dents, les chaussures). Un ancien
  exemple de contexte parle de perfectionner une compétence : il est en lecture seule, la fiche ne
  décrit pas cet emploi, et il n'établit aucun sens.

## 5. Choix à arbitrer

**Arbitrés le 2026-10-06** (§8). Le tableau ci-dessous est celui qui a été relu : ses lignes 1, 9
et 19 décrivent la proposition d'avant la révision.

| N° | Choix proposé | Alternative |
|---|---|---|
| 1 | 開く et 閉まる : un seul sens, `evenement` ; « Être ouvert », « Être fermé » en autres traductions | un second sens de type `etat` |
| 2 | 消える : deux sens (s'éteindre ; disparaître), `evenement` | un seul sens, la disparition en nuance |
| 3 | 消す : deux sens (éteindre ; effacer) ; « effacer » dans communication › écriture, niveau 2 | un seul sens ; ou « effacer » sans catégorie |
| 4 | 付ける : deux sens (allumer ; fixer) | un seul sens |
| 5 | 切る : deux sens (couper ; raccrocher, couper une connexion), le second sans catégorie | un seul sens ; ou communication › contact pour le second |
| 6 | 取る : deux sens (prendre ; obtenir) | un seul sens, « obtenir » en nuance |
| 7 | 押す : un seul sens, trois objets en nuance | un second sens pour le tampon |
| 8 | 引く : deux sens (tirer ; chercher dans un dictionnaire) ; le second dans communication › langues, comme 辞書 | un seul sens ; ou éducation › apprentissage |
| 9 | 締める : « Attacher » en traduction principale (ordre de la source) ; habillement › accessoires vestimentaires | « Nouer » ou « Serrer » en principale |
| 10 | 差す : deux sens (ouvrir un parapluie ; pointer) ; le premier dans la catégorie de 傘 | un seul sens |
| 11 | 置く, 並べる et « être aligné » de 並ぶ : espace › position et localisation, niveau 2 | aucune catégorie (A5) |
| 12 | 入れる : « Mettre dans » en principale ; catégorie de 入る (entrer, sortir) | « Insérer » en principale |
| 13 | 出す : trois sens (sortir ; envoyer du courrier ; présenter un document) | deux sens, le document en nuance |
| 14 | 並ぶ : deux sens, `action` puis `etat` ; に pour le premier, aucune particule pour le second | un seul sens |
| 15 | 作る : deux sens (fabriquer, créer ; préparer un repas) | un seul sens, la cuisine en nuance |
| 16 | 磨く : un seul sens, sans catégorie | deux sens (dents, hygiène ; objets, entretien) |
| 17 | Huit traductions non développées par leur fiche, signalées en nuance sans devenir un sens : déverrouiller, faire disparaître, appliquer, tracer (une ligne), verser (des gouttes), laisser (quelque part), préparer (du thé, du café), exposer | les abandonner sans les signaler |
| 18 | 23 sens sans catégorie (A5) : actions et événements généraux | une catégorie pour certains, à nommer |
| 19 | Verbes nommés en romaji seulement par les fiches (« hiraku » pour 開く, « kawaru » pour 変える) : mention gardée en nuance, aucune lecture ni entrée ajoutée | retirer la mention |
| 20 | Deux lectures corrigées (閉まる, 作る) ; particules décidées prises dans la fiche seulement (で de l'exemple de 引く et に de celui de 出す non ajoutées) | — |

## 6. Cohérence avec les lots validés

- **Types** : `evenement` suit 止まる (lot 04) et le sens « apparaître » de 出る ; `action` puis
  `etat` pour 並ぶ suit 曲がる (lot 0).
- **Catégories nulles** : même motif que 無くす, かける « accrocher », 吹く « souffler de l'air »,
  出る « assister à » (« action générale, sans domaine thématique propre »).
- **Catégories reprises d'un mot voisin** : 傘 (lot 05) pour 差す, 辞書 (lot 06) pour 引く, 手紙 et
  切手 (lot 08) pour 出す, 料理 (lot 02) pour 作る, 入る (lot 04) pour 入れる et 出す.
- **Traductions non développées signalées en nuance** : comme 厚い (lot 15) et 温い (lot 17).
- **Un emploi avec un objet ne produit pas automatiquement un sens** (lot 14) : 押す, 磨く, 締める.
- **Aucune décision validée n'est modifiée.** D0545 (弾く) notait déjà qu'aucun sens n'était repris
  de l'homophone 引く.

## 7. Suite

1. Vérification ciblée des trois corrections du §8, et de l'absence de mouvement ailleurs.
2. Validation atomique, sur autorisation explicite ; puis commit, sur un accord distinct. Aucun push
   n'est fait.

## 8. Arbitrage des vingt choix et révision du 2026-10-06

**Arbitrage de ChatGPT, sur délégation de l'utilisateur, qui l'approuve**, après relecture de la proposition, des 23 fiches, des 23 entrées et
des 72 décisions d'origine.

| Choix | Arbitrage |
|---|---|
| 1 · 開く, 閉まる | **révisé en partie** : un seul sens `evenement`, pas de second sens `etat` ; « Être ouvert » et « Être fermé » sortent des autres traductions et passent en nuance |
| 2 à 8 · 消える, 消す, 付ける, 切る, 取る, 押す, 引く | retenus |
| 9 · 締める | **révisé** : « Serrer » en traduction principale ; un seul sens, catégorie et type conservés |
| 10 à 16 · 差す, catégories de position, 入れる, 出す, 並ぶ, 作る, 磨く | retenus |
| 17 · huit traductions non développées, en nuance | retenu |
| 18 · 23 catégories nulles | retenu, aucune catégorie supplémentaire |
| 19 · « hiraku », « kawaru » | **révisé en partie** : « kawaru » conservé en nuance pour 変える ; « hiraku » retiré de la nuance de 開く |
| 20 · lectures et particules | retenu ; ni で pour 引く ni に pour 出す |

Les arbitrages du périmètre sont inchangés : aucune relation, huit décisions de paires candidates à
5.16, aucun sens photographique pour 取る, aucun sens musical pour 引く.

**La révision, sur ces trois points seulement** :

| Point | Entrée | Avant | Après | Journal |
|---|---|---|---|---|
| 1 | 開く | S'ouvrir \| Être ouvert | S'ouvrir ; nuance : « Désigne aussi l'état qui en résulte : être ouvert. » | D1168 réécrite à sa place |
| 1 | 閉まる | Se fermer \| Être fermé | Se fermer ; nuance : « Désigne aussi l'état qui en résulte : être fermé. » | D1177 réécrite à sa place |
| 2 | 締める | Attacher \| Serrer \| Nouer (…) | Serrer \| Attacher \| Nouer (…) | **D1240, nouvelle, à la fin du journal** |
| 3 | 開く | nuance citant « hiraku » | mention retirée | D1170 réécrite à sa place |

**Ce qui n'a pas bougé**, contrôlé par script au moment de l'écriture :

- 20 entrées sur 23 sont identiques ; seules 開く, 閉まる et 締める changent, et restent `proposed` ;
- 69 des 72 décisions d'origine sont identiques ; pour D1168, D1170 et D1177, l'identifiant, le
  statut, la date, le lot, l'entrée, le champ, la nature et le champ « avant » sont inchangés :
  seuls « après » et la raison sont réécrits ;
- les 1 167 décisions validées sont identiques ; aucun autre lot n'est touché ;
- le nombre de sens (34), les types, les catégories, les particules, les lectures et les relations
  sont inchangés.

**Contrôles après révision** : état réel 567 ENTRY, 32 retraits, 120 entrées écartées ; essai à
blanc 590, 32, 97, sans problème ni erreur, 98 avertissements ; 466 tests réussis ; 36 sabotages
attrapés. Le test d'état vérifie les trois points : l'état résultant en nuance et hors des
traductions, « hiraku » absent de toute nuance et « kawaru » présent dans celle de 変える,
« Serrer » en tête, D1240 à la fin et citée par 締める.

## 9. Diff complet de la révision

Comparaison ligne à ligne entre la proposition relue (copies gardées hors dépôt au moment de la
révision) et l'état actuel, avec une ligne de contexte. **C'est toute la révision** : aucune autre
ligne des deux fichiers n'a changé.

### `reconstruction/a2-04/lots/lot-18.json` (開く, 閉まる, 締める)

```diff
@@ -17,3 +17,3 @@
         "counter": null,
-        "nuance": "Intransitif : une porte, une fenêtre, un magasin ou un contenant s'ouvre, de lui-même ou par une action. ドアが開きます (la porte s'ouvre). Ouvrir quelque chose se dit 開ける. La source le distingue aussi du verbe « hiraku », sans le développer.",
+        "nuance": "Intransitif : une porte, une fenêtre, un magasin ou un contenant s'ouvre, de lui-même ou par une action. ドアが開きます (la porte s'ouvre). Désigne aussi l'état qui en résulte : être ouvert. Ouvrir quelque chose se dit 開ける.",
         "tags": [],
@@ -23,5 +23,3 @@
               "primary": "S'ouvrir",
-              "alternatives": [
-                "Être ouvert"
-              ]
+              "alternatives": []
             },
@@ -85,3 +83,3 @@
         "counter": null,
-        "nuance": "Intransitif : une porte, une fenêtre ou un magasin se ferme, de lui-même, ou est fermé. ドアが閉まりました (la porte s'est fermée). Fermer quelque chose se dit 閉める.",
+        "nuance": "Intransitif : une porte, une fenêtre ou un magasin se ferme, de lui-même. ドアが閉まりました (la porte s'est fermée). Désigne aussi l'état qui en résulte : être fermé. Fermer quelque chose se dit 閉める.",
         "tags": [],
@@ -91,5 +89,3 @@
               "primary": "Se fermer",
-              "alternatives": [
-                "Être fermé"
-              ]
+              "alternatives": []
             },
@@ -600,3 +596,4 @@
         "A2-04-D1214",
-        "A2-04-D1215"
+        "A2-04-D1215",
+        "A2-04-D1240"
       ],
@@ -612,5 +609,5 @@
             "meaning": {
-              "primary": "Attacher",
+              "primary": "Serrer",
               "alternatives": [
-                "Serrer",
+                "Attacher",
                 "Nouer (une cravate, une ceinture)"
```

### `reconstruction/a2-04/journal.json` (D1168, D1170, D1177 réécrites ; D1240 ajoutée)

```diff
@@ -16483,4 +16483,4 @@
     ],
-    "after": "un seul sens",
-    "reason": "Un seul sens : la fiche décrit un seul fait (ce qui « s'ouvre de lui-même ou par une action ») ; « Être ouvert », l'état qui en résulte, est gardé comme autre traduction. Type evenement, comme 止まる (lot 04) : un changement qui survient, sans agent exprimé (particule が). Alternative laissée à l'arbitrage : le type etat pour « être ouvert », ce qui ferait deux sens."
+    "after": "un seul sens ; « Être ouvert » en nuance",
+    "reason": "Un seul sens, de type evenement (arbitrage des choix du lot 18) : la fiche décrit un seul fait (ce qui « s'ouvre de lui-même ou par une action »), un changement qui survient, sans agent exprimé (particule が), comme 止まる (lot 04). « Être ouvert » n'est pas une autre traduction de « S'ouvrir » : un événement et l'état qui en résulte ne sont pas deux traductions équivalentes. Il n'est ni gardé dans le sens ni érigé en second sens de type etat ; il est conservé en nuance, comme l'état résultant de 入る (lot 04)."
   },
@@ -16507,4 +16507,4 @@
     "before": "mention de la source : « à ne pas confondre avec le verbe transitif akeru ou le verbe hiraku »",
-    "after": "aucune lecture ajoutée",
-    "reason": "La fiche nomme « hiraku » en romaji seulement, sans graphie, sans lecture en kana et sans sens : aucune lecture ひらく n'est ajoutée à l'ENTRY (la fiche source décide). La mise en garde est conservée en nuance, telle que la source la donne."
+    "after": "mention non reprise ; aucune lecture ajoutée",
+    "reason": "La fiche nomme « hiraku » en romaji seulement, sans graphie, sans lecture en kana, sans sens et sans distinction exploitable : aucune lecture ひらく n'est ajoutée à l'ENTRY (la fiche source décide), et la mention n'est pas reprise dans la nuance (arbitrage des choix du lot 18) : un nom romanisé que les données ne permettent pas d'expliquer n'aide pas un débutant. La mise en garde contre le transitif (akeru) est conservée, sous la forme du renvoi à 開ける. La mention de « kawaru » par la fiche de 変える, qui explique un contraste, est traitée à part (D1233) et conservée."
   },
@@ -16598,4 +16598,4 @@
     ],
-    "after": "un seul sens",
-    "reason": "Un seul sens, examiné sur sa propre fiche avec le même critère que 開く : la fiche décrit ce qui « se ferme de lui-même ou est fermé » ; « Être fermé » est gardé comme autre traduction. Type evenement, comme 止まる (lot 04). Alternative laissée à l'arbitrage : le type etat pour « être fermé », ce qui ferait deux sens."
+    "after": "un seul sens ; « Être fermé » en nuance",
+    "reason": "Un seul sens, de type evenement (arbitrage des choix du lot 18), examiné sur sa propre fiche avec le même critère que 開く : la fiche décrit ce qui « se ferme de lui-même ou est fermé », comme 止まる (lot 04). « Être fermé » n'est pas une autre traduction de « Se fermer » : un événement et l'état qui en résulte ne sont pas deux traductions équivalentes. Il n'est ni gardé dans le sens ni érigé en second sens de type etat ; il est conservé en nuance."
   },
@@ -17462,2 +17462,18 @@
     "reason": "Une glose, non une traduction : ses deux objets sont repris en nuance."
+  },
+  {
+    "id": "A2-04-D1240",
+    "status": "proposed",
+    "date": "2026-10-06",
+    "lot": "lot-18",
+    "entry": "n5_v_82",
+    "field": "senses",
+    "kind": "decision",
+    "before": [
+      "Attacher",
+      "Serrer",
+      "Nouer (une cravate, une ceinture)"
+    ],
+    "after": "un seul sens ; « Serrer » en traduction principale",
+    "reason": "« Serrer » passe en traduction principale, devant « Attacher » et « Nouer (une cravate, une ceinture) », qui restent d'autres traductions (arbitrage des choix du lot 18). La source donne « Attacher » en premier ; sa nuance définit l'action comme « serrer, nouer ou attacher », et son exemple traduit ネクタイを締めます par « je noue (serre) ma cravate » : « Serrer » est attesté par la fiche. Pour un débutant, il distingue mieux 締める de 付ける, dont le second sens porte « Fixer | Attacher » dans ce lot. Aucune traduction n'est ajoutée ni retirée : seul l'ordre change. Un seul sens, comme le dit D1214."
   }
```
