# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.7 · Lot 06 « école, apprentissage, langue et écrit » (proposition)

**Date** : 2026-10-03
**Statut** : **PROPOSITION**. Les 37 entrées et les 46 décisions de journal du lot sont `proposed`
(D0410 à D0455). Les lots 0 à 05 et leurs 409 décisions validées sont intacts.
**À relire** : `reconstruction/a2-04/rapports/lot-06.md`, rapport généré entrée par entrée.

---

## 1. Résultat

| Vérification | Résultat |
|---|---|
| `npm test` | **426 tests, tous verts** (423 avant ; 3 nouveaux : la liste fermée des formes usuelles, son effet mécanique, le lot 06 entièrement proposé) |
| `node tools/validate-data.mjs` | 0 erreur, 8 avertissements (inchangés) |
| `node tools/check-layers.mjs` | aucune violation |
| `run.mjs verify` | sources conformes |
| Assemblage réel | 237 ENTRY, 30 retraits, 0 problème : les propositions respectent la frontière |

**Essai à blanc** (lot 06 et journal supposés validés, en mémoire) :

| Mesure | Attendu | Obtenu |
|---|---|---|
| ENTRY | 274 (237 + 37) | **274** |
| Identifiants retirés | 30 | **30** (aucune fusion) |
| Problèmes / erreurs / attente | 0 / 0 / 0 | **0 / 0 / 0** |
| Avertissements | — | `categorie-nulle` × 17 (1 nouveau : 意味 « intérêt »), `type-nul` × 18, `kanji-inconnu` × 1 |

## 2. 平仮名 → ひらがな : une exception humaine, sans règle générale

**Le problème.** `word` n'était décidable que pour le survivant d'une fusion, ou pour une graphie
fautive connue. 平仮名 n'est ni l'un ni l'autre.

**La solution.** Une **seconde liste fermée**, `USUAL_FORM_IDS` (`tools/reconstruction/rules.mjs`),
qui contient la seule entrée `n5_v_604`. Elle est distincte des graphies fautives
(`WORD_EXCEPTION_IDS`), car 平仮名 est une graphie correcte, simplement moins usuelle.
- **Effet** : pour cette entrée seule, la forme et les lectures deviennent des champs à décider.
- **Ce qui ne change pas** : la règle mécanique générale. Aucune autre entrée n'est concernée, et
  rien ne fait passer automatiquement une graphie kana en forme usuelle.

**Tests et sabotages.**
- Un test exige que la liste ne contienne que `n5_v_604`.
- Un autre vérifie que 平仮名 a sa forme et ses lectures en exception, et que 漢字 garde sa forme
  mécanique.
- Deux sabotages sont attrapés : vider la liste, ou y glisser une autre entrée.

**Résultat.**
- `word: ひらがな`, lecture ひらがな ;
- `writings: 平仮名`, avec ses furigana ;
- décision D0440, qui précise qu'il s'agit d'une exception propre à cette ENTRY.

## 3. Sens et propriétés, à partir des sources

| Entrée | Proposition | Ce que dit la source |
|---|---|---|
| **先生** | **deux sens** : professeur / titre de respect (médecin, auteur, maître) (D0416) | « titre honorifique… pour s'adresser à un professeur, un docteur, un auteur ou un maître » ; même modèle que les termes d'adresse du lot 01 |
| **教える** | **deux sens** : enseigner / indiquer (D0429) | « transmettre un savoir… ou indiquer une information ou un chemin » |
| **言葉** | **deux sens** : mot (paroles) / langue (D0436) | « un mot, une expression, la parole ou le langage en général » |
| **字** | **deux sens** : caractère / écriture d'une personne (D0442) | « le style d'écriture ou la calligraphie d'une personne » (字が上手) |
| **意味** | **deux sens** : sens d'un mot / intérêt, utilité (D0444) | « l'intention / l'utilité derrière une action » (意味がない) ; sens 2 en `categorie-nulle` (D0445) |
| **クラス** | un sens, groupe d'élèves (D0413) | la source décrit « une classe d'élèves ou un groupe de cours », pas une salle (教室) |
| **分かる** | un sens, comprendre (D0432) | « savoir, connaître » relèvent de 知る |
| **忘れる** | un sens, oublier (D0434) | oublier une information ou « omettre d'emporter un objet » est le même concept, en japonais comme en français |
| **本** | un sens, livre (D0448) | son emploi comme compteur (〜本), documenté par la source, relève du registre des compteurs |
| **書く** | un sens, écrire ; **correction** (D0450) | « tracer un dessin » est le sens de 描く, même lecture, autre graphie : comme 飛ぶ / 跳ぶ |

**`suru_compatible`, uniquement d'après la source** :
- **勉強** : `true` (« Nom / verbe suru », D0421) ;
- **練習** : `true` (« verbe suru », D0423) ;
- **作文** : `false`, la source le décrivant comme « Nom » seulement (D0426).

## 4. Deux types sémantiques à confirmer

**英語** et **言葉 « langue »** reçoivent `concept_abstrait`. Une langue est un système non
matériel, et aucun type plus précis n'existe : ni `information_contenu`, qui vise un contenu
transmis, ni un autre type.

A2-ST interdit d'utiliser `concept_abstrait` comme secours. Je pense que ce n'en est pas un ici,
mais c'est à ton jugement. L'alternative est `semantic_type: null` avec une justification
`type-nul` (A6).

## 5. Un point transversal : les compteurs

En préparant ce lot, j'ai relevé que **45 entrées déjà validées** (lots 0 à 05) ont un compteur
documenté par leur source, et que **toutes ont `counter: null`**. Je n'avais jamais renseigné ce
champ humain.

Le registre des compteurs (A2-02) ne définit que 6 classes de compatibilité :
- **couvertes** : 本 (objets longs), 枚 (objets plats), 冊 (livres), 個 et つ (unités génériques),
  回 (occurrences) ;
- **sans classe** : 台, 軒, 箇所, 杯, 脚, 基, 棟, pourtant fréquents dans les sources.

Comme pour les lectures en katakana, **je ne le tranche pas dans un lot**. Le lot 06 garde
`counter: null` (本, 辞書, 鉛筆, 字 documentent pourtant un compteur), par cohérence avec les
lots validés. La question est consignée comme point ouvert transversal dans `ETAT-ACTUEL.md` et
`ROADMAP.md`, à trancher globalement :
- faut-il renseigner `counter` à partir des sources ?
- que faire des compteurs sans classe dans le registre ?
- quand rattraper les 45 entrées validées : en 5.16 ou à l'audit A2-05 ?

## 6. Journal du lot

46 décisions proposées, de D0410 à D0455 :
- 13 décisions : découpages, sens uniques, `suru_compatible`, la forme usuelle de 平仮名, le
  compteur de 本 ;
- 31 abandons ;
- 1 correction (書く / 描く) ;
- 1 `categorie-nulle` (意味 « intérêt »).

## 7. Ce que j'attends

Ton arbitrage, en particulier sur :
- les cinq entrées à deux sens (先生, 教える, 言葉, 字, 意味) ;
- `concept_abstrait` pour les langues ;
- la liste fermée `USUAL_FORM_IDS`, comme mise en œuvre de ton arbitrage sur 平仮名 ;
- la question transversale des compteurs.
