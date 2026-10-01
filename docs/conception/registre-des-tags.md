# Ocha — Registre des tags : critères et procédure

**Statut** : 🔒 validé le 2026-10-02 (A2-02 · 3.4).

**Objet** : dire ce qu'est un tag dans Ocha v2, quand on peut en créer un et comment. Le registre
lui-même est `data/registries/tags.json`. Ce document applique la décision D2 de l'addendum A2
(`addendum-A2-liaison.md`, §3) et le principe anti-prolifération d'`A2-GLOBAL-v1` (§12).

---

## 1. Ce qu'est un tag

Un tag est une **appartenance transversale** utile à Ocha : il sert à sélectionner et à filtrer
(bibliothèque, Explorer). Ce n'est pas une couche sémantique d'A2. En v1, le moteur guidé ne lit
pas les tags.

- **Porteurs** : une ENTRY (le tag vaut pour tous ses sens), un SENSE (pour ce sens seulement),
  une expression. Jamais la grammaire, une activité, un kanji ni un kana.
- **Plats** : aucune hiérarchie entre tags.
- **Contrôlés** : un tag n'existe que s'il figure dans le registre.

## 2. Structure

```json
{ "id": "lieu_konbini", "label": "Utile au konbini",
  "description": "…", "kind": "lieu" }
```

| Champ | Rôle |
|---|---|
| `id` | identifiant ASCII stable, jamais réattribué ; ne commence ni par `v_` ni par `g_` |
| `label` | libellé montré à l'utilisateur |
| `description` | l'usage du tag : à quoi il sert, et non ce que les mots « sont » |
| `kind` | la nature du tag ; seule valeur en v1 : `lieu` |

**La nature se lit dans `kind`, jamais dans l'identifiant.** Le préfixe `lieu_` ne sert qu'à la
lisibilité. C'est `kind: "lieu"` qui permet au validateur d'appliquer « pas de tag de lieu sur une
expression » (une expression utilise `places`). Un lieu désigne ses tags explicitement dans
`lieux.json` (`vocab_tags`, à la publication d'A2-04), jamais par une convention de nom.

Aucun champ de cycle de vie (`retired`, `active`…) n'existe : il sera défini au premier retrait
réel. Une nouvelle valeur de `kind` demande une décision explicite.

## 3. Critères de création

Un tag n'est créé que si les quatre conditions sont réunies :

1. **Récurrence dans le corpus** : il regroupe plusieurs entrées ou sens réels, pas un cas isolé.
2. **Frontière nette** : on sait dire, pour un mot donné, s'il porte le tag ou non.
3. **Utilité réelle** : un écran ou une sélection en a besoin.
4. **Aucun doublon avec un champ dédié** : un tag ne répète jamais une information déjà portée
   par la catégorie, le type sémantique, les dimensions, les relations, les fonctions
   linguistiques, le niveau, `place` / `places`, le registre de langue ou les dossiers de
   l'utilisateur. Il ne sert jamais à contourner `category: null` ni à ranger des cas difficiles.

## 4. Procédure

1. **Proposition** : identifiant, libellé, description, `kind`, et justification au regard des
   quatre critères, avec des entrées réelles qui le porteraient.
2. **Relecture** et décision, consignée dans `ETAT-ACTUEL.md` (décisions complémentaires).
3. **Inscription** dans `data/registries/tags.json` ; `node tools/validate-data.mjs` sans erreur.

## 5. Tags de la v1

| Identifiant | Libellé | Remplace |
|---|---|---|
| `lieu_konbini` | Utile au konbini | `vocab_categories` du lieu `konbini` |
| `lieu_gare` | Utile à la gare | `vocab_categories` du lieu `gare` |
| `lieu_restaurant` | Utile au restaurant | `vocab_categories` du lieu `restaurant` |
| `lieu_hotel` | Utile à l'hôtel | `vocab_categories` du lieu `hotel` |

Le remplacement a lieu à la publication d'A2-04 : `lieux.json` et le vocabulaire ne changent pas
avant.
