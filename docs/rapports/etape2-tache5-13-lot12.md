# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.13 · Lot 12 « temps relatif, moments de la journée et fréquence » (proposition)

**Date** : 2026-10-03
**Statut** : **PROPOSITION**. Les 31 entrées et les 92 décisions de journal du lot sont `proposed`
(D0735 à D0826). Les lots 0 à 11 et leurs 734 décisions validées sont intacts.
**À relire** : `reconstruction/a2-04/rapports/lot-12.md`, rapport généré entrée par entrée.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| Contrôle des identifiants | **31 distincts**, tous présents dans la source, aucun déjà décidé ; 243 restantes après le lot |
| `npm test` | **434 tests, tous verts** (433 avant, 1 nouveau : le lot 12 est entièrement proposé) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 414 ENTRY, 31 retraits, 0 problème : les propositions respectent la frontière |

**Essai à blanc** (lot 12 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 445 (414 + 31) | **445** |
| Identifiants retirés | 31 | **31** (aucune fusion) |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Entrées restantes après le lot | 243 | **243** |
| Avertissements | — | **aucun nouveau** (`categorie-nulle` × 24, `type-nul` × 20, `kanji-inconnu` × 1) |

## 2. L'axe temporel d'A7, sens par sens

**Être un mot temporel ne suffit pas.** Chaque attribution, et chaque refus, est une décision
motivée qui cite A7.

| Résultat | Nombre | Entrées | Raison |
|---|---|---|---|
| **`deictique`** | 20 | 今, 今日, 明日, 昨日, あさって, 一昨日, 今朝, 今晩, 昨夜, 今週, 先週, 来週, 今月, 先月, 来月, 今年, 去年, 来年, さ来年, 近々 | le référent est repéré par rapport au **moment de l'énonciation** |
| **pas de fonction** | 7 | 朝, 昼, 夕方, 晩, 夜, 午前, 午後 | une partie de la journée **en général**, sans repérage par rapport au moment de la parole |
| **pas de fonction** | 4 | 毎日, 毎朝, 毎晩, 毎週 | une **récurrence**, même traitement que 毎年 et 毎月 (lot 0) |

**Aucune correction rétroactive.** おととし (lot 0) et 近く « prochainement » (lot 10) restent sans
`deictique`, comme convenu. L'écart avec 一昨日 ou さ来年 est la conséquence attendue de la
réservation d'A7 pour A2-05. Le nouveau test d'état ne vérifie que le lot 12 et n'impose rien aux
lots clos.

## 3. Lectures et graphies : la fiche décide

- **明日** : la fiche mentionne あす « dans un registre plus formel ». Elle reste **dans la nuance**,
  sans être ajoutée aux lectures (D0742), comme うち pour 家 au lot 03.
- **昨日** : furigana corrigés (D0746). La source posait toute la lecture sur 昨, rien sur 日 ; c'est
  une lecture spéciale, portée par les deux kanji ensemble.
- **Graphies documentées par les fiches**, et aucune autre :
  - 明後日 pour あさって (D0750) ;
  - おととい pour 一昨日 (D0754) ;
  - ゆうべ et 夕べ pour 昨夜 (D0764).

## 4. Sens

| Entrée | Proposition | Ce que dit la fiche |
|---|---|---|
| **昼** | **deux sens** : midi, journée (période) / déjeuner (repas) (D0800) | « la période diurne…, le milieu de la journée (midi), **ou par extension** le repas du midi ». La journée et midi restent un seul sens ; le repas est un autre référent et un autre type (`evenement`), comme le sens « repas » de ご飯 (lot 02). |
| **晩** | un sens, soir | « la fin de la journée ou le début de la soirée » ; « nuit » relève de 夜 |
| **夜** | un sens, nuit | « la période après le coucher du soleil » |
| les autres | un sens chacun | traductions d'un même référent ; les gloses qui changent de repère (« le jour suivant », « la veille », « le surlendemain ») sont abandonnées, car elles ne se repèrent pas sur le moment de la parole |

**Catégories et types**, d'après les précédents validés :
- **catégories** : temps › moments et périodes › présent, passé, futur (selon le cas) ou parties de
  la journée ; temps › fréquence › fréquent pour les mots en 毎 ;
- **type** : `concept_abstrait` partout, sauf le sens « repas » de 昼 (`evenement`).

## 5. Tags : les 31 candidats `lieu_hotel` rejetés un par un

Chacun par sa propre décision. Le seuil est élevé, comme demandé. Un mot de temps peut servir à
l'hôtel (今晩泊まれますか, チェックアウトは午前十時), mais cette possibilité d'emploi ne le rend pas
caractéristique du contexte hôtelier. Le lot ne porte aucun tag.

## 6. Journal du lot

92 décisions proposées, de D0735 à D0826 :
- 67 décisions : 31 rejets de tags, 20 attributions de `deictique`, 11 refus motivés, 3 graphies,
  1 lecture non ajoutée, 1 découpage ;
- 24 abandons ;
- 1 correction (furigana de 昨日).

## 7. Ce que j'attends

Ton arbitrage, en particulier sur :
- la frontière d'A7 telle qu'appliquée (20 déictiques, 11 non) ;
- **昼** à deux sens ;
- les 31 rejets de `lieu_hotel`.
