# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.7-C · Audit du champ `counter`

**Date** : 2026-10-03
**Nature** : audit de conception ciblé. **Aucune donnée n'est modifiée** : ni lot, ni décision du
journal, ni registre.
**Déclencheur** : en préparant le lot 06, j'avais relevé que des entrées validées avaient « un
compteur documenté par leur source » mais `counter: null`, et je l'avais présenté comme une
possible omission. Cet audit montre que **cette lecture était fausse**.

---

## 1. Conclusion

**`counter: null` est correct pour toutes les entrées déjà validées, et pour 本, 辞書, 鉛筆 et 字 au
lot 06.** Aucune reprise des lots 0 à 05 n'est nécessaire, et la validation du lot 06 peut se faire
telle quelle.

Ce que les sources documentent est une **autre relation** :
- elles disent **avec quel compteur on compte un nom** (« un livre se compte avec 冊 ») ;
- le champ `counter` porte au contraire la propriété d'une ENTRY **qui est elle-même un compteur**
  (« 匹 sert à compter les petits animaux »).

Cette relation n'est représentée nulle part dans le modèle actuel. Ce n'est pas une omission dans
les lots, mais une question de conception distincte (section 5).

## 2. Ce que disent les textes

**A2-LING-v1** (§3, « Compteur ») :
- `compteur` est l'une des **propriétés linguistiques de l'ENTRY**, avec l'écriture et le suffixe ;
- ses exemples sont des mots qui *sont* des compteurs : 匹 (certains animaux), 枚 (objets plats),
  本 (objets longs), 冊 (livres), 個 (unités), 回 (occurrences) ;
- « le compteur peut conserver une information de compatibilité » : `counter_for: small_animals` ;
- cette compatibilité ne devient pas une catégorie sémantique, et compteur ≠ quantificateur.

**schema-A2-01** (§6, et I6) :
- `linguistic.counter` vaut `null` ou `{ counter_for: [<registre>] }`, avec au moins une valeur ;
- I6 vérifie que `counter_for` est non vide et dans son registre.

**`counters.json`** (A2-02) : 6 compatibilités (`small_animals`, `flat_objects`, `long_objects`,
`books_volumes`, `generic_units`, `occurrences`). Ce sont les **valeurs possibles de
`counter_for`**, c'est-à-dire ce qu'un compteur sert à compter. Ce ne sont pas des compteurs
japonais.

**L'arbitrage d'A2-02** (consigné dans la conversation de la tâche 3.x) :
- garder explicitement la chaîne « propriété `counter` → compatibilité `counter_for` →
  identifiant de `counters.json` » ;
- **au N5, 匹 est le seul suffixe de comptage autonome qui nécessite `counter_for`** ;
- ne pas transformer 一つ, 一人 ou 二十歳 en compteurs par détection structurelle.

## 3. Les deux relations, à ne pas confondre

| | « Cette ENTRY **est** un compteur » | « Ce nom **se compte avec** tel compteur » |
|---|---|---|
| Exemple | 匹 compte les petits animaux | 本 « livre » se compte avec 冊 |
| Représentation actuelle | `linguistic.counter = { counter_for: ["small_animals"] }` | **aucune** : ni champ, ni relation d'A2-REL |
| Porteur | l'ENTRY du compteur | le nom compté |
| Ce que les 43 sources documentent | — | **oui, c'est ce cas** |

## 4. Les cas représentatifs

| Cas | Analyse |
|---|---|
| **匹** (`n5_v_648`) | Seule entrée de la source qui est un compteur (« compteur pour petits animaux »). Pas encore traitée : son lot lui donnera `counter: { counter_for: ["small_animals"] }`, comme A2-02 l'a prévu. |
| **本** (`n5_v_134`, lot 06) | Les deux directions dans un seul mot. L'ENTRY 本 est le nom « livre » : `counter: null` est correct, et le livre **se compte avec** 冊. 本 est aussi un compteur des objets longs (〜本), mais c'est une **autre unité**, absente de la source, qui relève du chantier sur les affixes (comme 〜方). |
| **冊** | N'existe pas comme entrée dans la source. Il n'apparaît que dans les nuances de 本 et de 辞書, comme compteur avec lequel on les compte. |
| **辞書** (lot 06) | Nom compté avec 冊 (« on utilise le compteur des livres : 冊 »). `counter: null` correct. |
| **鉛筆** (lot 06) | Nom compté avec 本 (鉛筆を1本). `counter: null` correct : 鉛筆 n'est pas un compteur. |
| **字** (lot 06) | La source cite 文字 ou « le compteur général ». Nom compté, `counter: null` correct. |
| **人** (`n5_v_633`, lot 01) | Comme 本 : l'ENTRY validée est le nom « personne » (ひと) ; le compteur 〜人 (にん) est une autre unité, absente de la source. |
| **時計** (lot 05) | Faux positif de ma détection : la source parle de l'étymologie (« mesurer, compter »), pas d'un compteur. |

Dans la source, aucune entrée n'est un compteur en dehors de 匹 : ni 冊, ni 枚, ni 個, ni 回, ni 台.

## 5. Les 43 cas, selon ce que la source documente

Je les avais annoncés comme 45 ; le compte exact est **44** (3 au lot 0, 1 au lot 01, 5 au lot 02,
17 au lot 03, 15 au lot 04, 3 au lot 05), dont un faux positif (時計) : **43 cas réels**, tous des
noms comptés. Les 6 classes de `counters.json` n'ont d'ailleurs pas vocation à les qualifier :
elles décrivent ce qu'un compteur compte. Je les rapproche seulement pour mesurer l'étendue de la
question.

| Ce que la source cite | Nombre | Entrées |
|---|---|---|
| Un compteur rapprochable d'une classe du registre | 14 | 本 : かぎ, ナイフ, スプーン, フォーク, 傘 ; 枚 : お皿, ドア, 戸, 窓, 紙 ; 個 ou つ : せっけん, 箱, 財布 ; 回 : お風呂 |
| Deux compteurs, l'un rapprochable, l'autre non | 11 | 風邪 (回 ou 度) ; ちり紙 (巻 ou 枚) ; ポスト et 本棚 (個 ou 台) ; 庭, 出口, 玄関, 公園, 交差点, 町, 村 (箇所 ou つ) |
| Seulement des compteurs sans équivalent dans le registre | 18 | 台 : 机, タクシー, バス, 地下鉄, 車, 電車, 飛行機 ; 軒 ou 箇所 : 交番, 図書館, 大使館, 銀行 ; 棟 ou 軒 : 建物 ; 日 : くもり ; 杯 : コップ ; 基 : エレベーター ; 脚 : いす ; 台 ou 床 : ベッド ; 間 : 部屋 |

Dans les 43 cas, l'ENTRY est un nom compté, pas un compteur : **`counter: null` est correct**.

## 6. Ce que cela change, et ce qui reste à décider

**Rien à reprendre dans les lots 0 à 05 :**
- aucune décision ni aucune donnée ne change ;
- l'information « se compte avec » n'est pas perdue : les sources sont des copies figées,
  vérifiées par leur manifeste SHA-256 (`reconstruction/a2-04/sources/`), et une passe ultérieure
  pourra l'en extraire si on décide de la représenter.

**Le lot 06 peut être validé tel quel.** La nuance de 本 dit déjà « se compte avec 冊 », sous forme
de texte libre.

**Questions de conception, à arbitrer sans urgence** (aucune ne bloque A2-04) :
1. Ocha doit-il représenter « ce nom se compte avec tel compteur » ? L'information a une vraie
   valeur pédagogique (les compteurs sont un thème du N5), mais elle peut aussi vivre dans les
   leçons de grammaire sur les compteurs plutôt que dans le lexique.
2. Si oui, sous quelle forme ?
   - **(a)** une propriété du nom compté, par un addendum au schéma ;
   - **(b)** une relation vers l'ENTRY du compteur, ce qui suppose que les compteurs existent comme
     entrées (aujourd'hui, seulement 匹) et une extension d'A2-REL ;
   - **(c)** les leçons de grammaire seulement.
3. Le registre ne couvre pas 台, 軒, 箇所, 杯, 脚, 基, 棟 ni 日. Cela ne compte que si l'option (a)
   réutilise les classes.
4. Les emplois de compteur de 本 (〜本) et de 人 (〜人) sont des unités distinctes, à traiter avec
   le chantier sur les affixes.

## 7. Correction de ma présentation précédente

Dans le rapport du lot 06 et dans `ETAT-ACTUEL.md` et `ROADMAP.md`, j'avais écrit que 45 entrées
validées avaient un compteur documenté « mais `counter: null` », et je l'avais présenté comme un
rattrapage à prévoir. C'était une confusion entre les deux relations de la section 3, et le compte
était faux (44, dont 43 réels). Les deux fichiers de gouvernance sont corrigés dans cette archive.
Le rapport du lot 06 reste tel quel, puisque c'est l'audit qui le corrige.
