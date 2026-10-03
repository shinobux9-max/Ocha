# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.6 · Lot 05 « achats, vêtements et objets personnels » (proposition)

**Date** : 2026-10-03
**Statut** : **PROPOSITION**. Les 37 entrées et les 55 décisions de journal du lot sont `proposed`
(D0355 à D0409). Les lots 0 à 04 et leurs 354 décisions validées sont intacts.
**À relire** : `reconstruction/a2-04/rapports/lot-05.md`, rapport généré entrée par entrée.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **423 tests, tous verts** (422 avant, 1 nouveau : le lot 05 est entièrement proposé) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 200 ENTRY, 30 retraits, 0 problème : les propositions respectent la frontière |

**Essai à blanc** (lot 05 et journal supposés validés, en mémoire) :

| Mesure | Résultat |
|---|---|
| ENTRY | **237** (200 + 37 ; aucune fusion dans ce lot) |
| Identifiants retirés | **30** (inchangé) |
| Problèmes / erreurs / attente | **0 / 0 / 0** |
| Avertissements | inchangés : `type-nul` × 18, `categorie-nulle` × 14, `kanji-inconnu` × 1 |
| `vocab-hors-jlpt.json` | ses **deux premières ENTRY** : `v_718` レジ袋 et `v_719` ポイントカード, `level: hors_jlpt` |

## 2. いくら : `pronom`, confirmé par la source

L'arbitrage de départ est confirmé (D0372). La source décrit いくら comme un « mot interrogatif
invariable utilisé exclusivement pour s'informer sur une valeur financière ou un montant ». L'emploi
いくら…ても n'y est pas documenté : il ne fonde ni une autre classe ni un autre sens.

| Champ | Valeur |
|---|---|
| `grammatical_class` / `group` | `pronom` / `null` (exception de classe, décidée) |
| Sens | un seul : « Combien » (autre traduction : « Quel prix »), catégorie commerce › prix |
| Fonction | `interrogatif` |
| `semantic_type` | `null`, justifié (D0373), comme 何 au lot 0 ; pas d'avertissement, puisque la fonction l'explique |

## 3. Les deux mots hors JLPT

Même modèle ENTRY → SENSE, mêmes registres, même exigence de journalisation que le N5. Leur
candidat `lieu_konbini` vient du champ `places` de la source. Il est **gardé** : le caissier
propose le sac (レジ袋はご利用ですか) et demande la carte (ポイントカードはお持ちですか), ce qui est le
vocabulaire d'action propre au konbini.

## 4. Polysémies, jugées à partir des sources

| Entrée | Proposition | Ce que dit la source |
|---|---|---|
| **高い** | **deux sens** : haut / cher (D0378) | « adjectif en -i possédant deux sens » : deux dimensions, deux contraires (低い, 安い) |
| **ボタン** | **deux sens** : de vêtement / d'appareil (D0393) | « à la fois un bouton de fermeture sur un vêtement et un bouton d'appareil » : deux référents, deux domaines |
| **時計** | un sens, « horloge » (autres traductions : « montre », « pendule ») (D0403) | « aussi bien une montre portée au poignet qu'une horloge murale » : un seul objet, une largeur référentielle |
| **荷物** | un sens, « bagage » (autres traductions : « colis », « paquet ») (D0407) | « les bagages de voyage, les paquets ou les colis postaux » : la chose qu'on porte ou fait transporter |
| **傘** | un sens, « parapluie » (autre traduction : « ombrelle ») | parapluie ou ombrelle ; l'ombrelle précise est 日傘, dans la nuance |
| **お金** | un sens, « argent » | « monnaie » (小銭) et « fonds » (資金) ne sont pas équivalents : abandonnés |

## 5. Autres décisions

- **買い物** :
  - `suru_compatible: true`, **documenté par la source** (« Nom / verbe suru », 買い物する) et non
    enrichi (D0367) ;
  - furigana corrigés (D0366) : ceux de la source omettaient い.
- **眼鏡** : graphies めがね et メガネ, documentées par la nuance de la source (D0397).
- **Deux catégories faute de mieux**, le registre n'ayant pas de catégorie propre :
  - 時計, rangé avec les unités de l'heure (D0404) ;
  - 荷物, avec l'utilisation des transports (D0408).

  À confirmer.

## 6. Tags de lieu : le konbini

- **Gardés** : レジ袋 et ポイントカード, pour ce que le caissier propose ou demande.
- **Écartés** : les 9 mots du commerce en général (店, デパート, 買う, 売る, 買い物, お金, いくら,
  安い, 高い). On les emploie au konbini comme dans tout magasin.
- **スリッパ**, `lieu_hotel` **écarté**. La source le décrit porté « chez soi, dans les écoles, les
  hôpitaux ou certains bureaux » ; les chaussons fournis par un hôtel ne rendent pas le mot propre au
  service hôtelier. Le cas est le même que エレベーター.
- **傘**, `lieu_hotel` écarté ; **八百屋**, `lieu_gare` écarté.
- **荷物**, `lieu_hotel` **ajouté** hors des candidats : faire garder ses bagages à l'arrivée ou au
  départ (荷物を預かってもらえますか) fait partie du scénario hôtelier. C'est le seul ajout du lot, à
  confirmer avec le critère.

| Entrée | Candidats hérités | Décision | Écart |
|---|---|---|---|
| いくら | konbini | — | − konbini |
| お金 | konbini | — | − konbini |
| デパート | konbini | — | − konbini |
| 売る | konbini | — | − konbini |
| 安い | konbini | — | − konbini |
| 店 | konbini | — | − konbini |
| 買う | konbini | — | − konbini |
| 高い | konbini | — | − konbini |
| 傘 | hotel | — | − hotel |
| スリッパ | hotel | — | − hotel |
| 八百屋 | gare | — | − gare |
| 荷物 | — | hotel | + hotel |
| 買い物 | konbini | — | − konbini |
| レジ袋 | konbini | konbini | = |
| ポイントカード | konbini | konbini | = |


Légende : `+` ajouté hors des candidats, `−` candidat écarté, `=` décision identique aux candidats.
Les entrées sans candidat ni tag n'y figurent pas.

## 7. Journal du lot

55 décisions proposées, de D0355 à D0409 :
- 22 décisions : tags, découpages, sens uniques, classe de いくら, `suru_compatible` de 買い物,
  graphies, deux catégories ;
- 31 abandons ;
- 1 correction (furigana de 買い物) ;
- 1 `type-nul` (いくら).

## 8. Ce que j'attends

Ton arbitrage, en particulier sur :
- いくら (`pronom`, fonction `interrogatif`, type nul) ;
- 高い et ボタン à deux sens ; 時計, 荷物, 傘 et お金 à un sens ;
- les catégories de 時計 et de 荷物 ;
- les tags (konbini, スリッパ sans `lieu_hotel`, 荷物 avec `lieu_hotel`).
