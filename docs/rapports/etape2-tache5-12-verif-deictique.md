# Ocha v2 — Rapport de l'étape 2 · A2-04 · 5.12 · Vérification de la fonction `deictique`

**Date** : 2026-10-03
**Nature** : vérification de contrat. **Aucune donnée ni aucun statut n'est modifié** : les 104
décisions du lot 11 restent `proposed`.
**Questions** :
1. Une définition normative de `deictique` existe-t-elle ailleurs que dans le libellé du registre ?
2. Sinon, quel mécanisme de gouvernance permet de la fixer ?
3. La définition candidate admet-elle 私 et あなた, et exclut-elle 自分 ?

---

## 1. Aucune définition normative n'existe

J'ai cherché « déictique » et « deictique » dans tous les textes de conception :

| Texte | Ce qu'on y trouve |
|---|---|
| `A2-LING-v1` §4 (snapshot du Project et copie du dépôt) | le seul libellé, dans l'arbre `LINGUISTIC_FUNCTIONS › GRAMMATICAL` ; la section dit seulement « Ces familles constituent la structure V1. Aucun sous-niveau supplémentaire n'est officialisé » |
| `A2-LING-v1` §5 (frontières) | rien sur `deictique` ; §5 traite compteur / quantificateur, modalité, temps, discours, politesse |
| `A2-GLOBAL-v1` | le même arbre, recopié (ligne 433), sans définition |
| registre `linguistic-functions.json` | `{ "id": "deictique", "label": "déictique" }` : aucun champ de définition |
| `schema-A2-01.md`, addenda A2 à A6, décisions A2 (`Ocha_Decisions_…`) | aucune mention |

**Ce n'est pas propre à `deictique`** : aucune des 14 fonctions d'A2-LING n'a de définition
normative. Trois ont déjà été appliquées dans des lots validés, sur un sens implicite jamais
écrit : `interrogatif` (何, いくら), `intensifieur` (大変), et `deictique` pour la première fois au
lot 11.

## 2. Le niveau de décision requis

**Les textes qui encadrent la question** :

- **`REGLES-CONSTRUCTION.md`** (ligne 33) : « **Les parties de conception sont verrouillées.** Elles
  ne se modifient pas en passant. Toute évolution passe par un **addendum** explicite, validé avant
  d'être codé. » La liste de contrôle (ligne 239) exige qu'« aucun fichier de conception verrouillé
  n'ait été modifié, sauf addendum explicitement… ».
- **`A2-LING-v1` §9** : « Toute modification ultérieure doit être explicitée dans une nouvelle
  version. »
- **`A2-GLOBAL-v1` §14** : « Les snapshots A2 ne doivent pas être modifiés silencieusement. Toute
  **évolution structurelle** doit produire une nouvelle version documentée. »
- **Les précédents A5 et A6** (validés le 2026-10-02) : deux addenda au schéma Ocha qui **précisent
  l'application** d'A2 sans modifier les snapshots. A6 le dit en toutes lettres : « Le snapshot A2
  n'est pas modifié : seul le schéma Ocha l'est. »

**Ce que cela implique pour une définition de `deictique`** :

| Niveau | Convient-il ? |
|---|---|
| Simple arbitrage A2-04 (journal) | **Non.** La définition conditionne 18 décisions du lot 11, des lots futurs (tout le vocabulaire du temps) et peut-être des données déjà validées (section 4). Ce serait une règle de conception introduite sans texte, ce que REGLES-CONSTRUCTION interdit. |
| Nouvelle version d'A2-LING (v1.1) | **Possible, mais pas exigée.** Définir une valeur existante n'ajoute ni fonction, ni famille, ni sous-niveau : ce n'est pas une évolution structurelle au sens d'A2-GLOBAL §14. |
| **Addendum de conception Ocha (A7)**, sur le modèle d'A5 et A6 | **Recommandé.** Il fixe explicitement, et non silencieusement, la définition opérationnelle utilisée par Ocha, sans toucher au snapshot A2-LING, qui reste la liste de référence. |

Si tu préfères une nouvelle version d'A2-LING, la définition y serait intégrée, et l'addendum
deviendrait inutile.

## 3. La définition candidate, mise à l'épreuve

**Définition candidate** : « un SENSE est `deictique` lorsque l'identification de son référent
dépend de la situation d'énonciation, notamment du locuteur, de l'interlocuteur ou de leur repérage
spatial ».

| Cas | Résultat | Raison |
|---|---|---|
| **私** | **admis** | son référent est le locuteur, quel qu'il soit |
| **あなた** | **admis** | son référent est l'interlocuteur |
| séries こ, そ, あ | admis | repérage spatial par rapport au locuteur et à l'interlocuteur |
| **自分**, emploi réfléchi | **exclu** | son référent est le sujet de la phrase (彼は自分を…), identifié par la syntaxe, non par la situation |
| 誰か, 皆 | exclus | référent indéterminé, ou ensemble défini par le contexte, pas par la situation de parole |
| série en ど | exclue | elle interroge, sans renvoyer à un référent situé |
| emploi anaphorique (それ, その, そこ « dont on vient de parler ») | non couvert | le référent est identifié par le discours, pas par la situation ; ces sens restent déictiques par leur emploi situationnel |

**Une limite à connaître pour 自分.** Sa fiche documente aussi un emploi pour « je / mon propre ».
Cet emploi renvoie au locuteur : la définition l'admettrait. Je propose un seul sens, réfléchi,
avec cet emploi dans la nuance, et sans fonction. Si l'addendum retient la définition telle quelle,
il faudra confirmer que c'est le sens dominant (réfléchi) qui détermine la fonction.

## 4. Une conséquence hors du lot 11 : la deixis temporelle

Le mot « **notamment** » laisse la liste ouverte. Or la deixis classique comprend aussi le
**temps** : un référent repéré par rapport au moment de la parole (今日, 明日, 去年…). La définition
doit trancher explicitement ce point, car il touche **des données déjà validées** :

| Lot (validé) | Sens | Repéré par rapport au moment de la parole ? | Fonction actuelle |
|---|---|---|---|
| lot 0 | おととし « il y a deux ans » | **oui** (l'année d'avant l'an dernier, à partir de maintenant) | aucune |
| lot 10 | 近く, sens 2 « prochainement » | **oui** (bientôt, à partir de maintenant) | aucune |
| lot 10 | 前, sens 2 « avant (dans le temps) » | seulement dans certains emplois (三年前, il y a trois ans) ; pas dans 食べる前に | aucune |

S'y ajouteraient, dans le futur lot du temps, 今, 今日, 明日, 昨日, 今年, 去年, 来年…

**Deux voies, à choisir dans l'addendum** :
- **(a) Deixis de personne et d'espace seulement.** Aucun effet rétroactif. Le lot 11 se valide tel
  quel. La deixis temporelle est exclue explicitement, et sera traitée, si besoin, par une autre
  voie.
- **(b) Deixis temporelle incluse.** おととし et 近く « prochainement » devront recevoir `deictique`
  (révision de données validées, à faire tout de suite ou à l'audit A2-05), et tout le futur lot du
  temps en dépendra.

## 5. Ce que je propose

1. **Un addendum A7**, « Définition opérationnelle de la fonction `deictique` », sur le modèle d'A5
   et A6, qui fixe :
   - la définition (la candidate, avec un choix explicite sur la deixis temporelle) ;
   - le traitement des emplois anaphoriques (non couverts) ;
   - le cas des sens à double emploi, comme 自分 : c'est le sens dominant qui détermine la fonction.
2. **Ensuite**, une 5.12b purement documentaire : les 18 décisions de fonction du lot 11 citent
   A7, au lieu de poser elles-mêmes la définition. Les données ne changent pas.
3. **En option**, l'addendum peut consigner aussi les sens déjà appliqués d'`interrogatif` et
   d'`intensifieur`, pour que les trois fonctions utilisées jusqu'ici aient une définition écrite.
   Ce n'est pas nécessaire pour valider le lot 11.

**Aucune donnée n'est modifiée par ce rapport.**
