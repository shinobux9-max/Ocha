# Documents historiques de la conception d'A2

**Ces documents retracent la conception d'A2 mais ne sont pas normatifs ; en cas de contradiction,
les snapshots versionnés, les addenda validés et les documents de conception actuels font foi.**

**Statut** : ces documents servent uniquement à la traçabilité de la conception. **Aucune règle
actuelle ne doit être reconstruite à partir d'eux seuls.**

Les seules références applicables sont :

- les snapshots d'A2, dans `docs/conception/a2/` (`A2-GLOBAL-v1`, `A2-L3-v1`, `A2-ST-v1`,
  `A2-DIM-v1`, `A2-REL-v1.1`, `A2-LING-v1`) ;
- les addenda validés et les documents de conception actuels, dans `docs/conception/` ;
- les registres actuels, dans `data/registries/`.

Pour les tags, la référence est `docs/conception/registre-des-tags.md`, qui applique la décision D2
de `docs/conception/addendum-A2-liaison.md`.

---

## Documents historiques

Copies déposées telles quelles, sous leur nom d'origine. La date est celle du fichier déposé.

| Fichier | Rôle | Date | SHA-256 |
|---|---|---|---|
| `02_Ocha_Stress_Test_N5_N2.md` | Synthèse des enseignements du stress-test mené sur environ 5 000 mots N5 à N2. Ce n'est pas un relevé cas par cas : il ne liste ni les mots testés ni les verdicts. | 2026-10-01 | `0be242283072cd149bd00c423dd2160d8263559467235e16afe686907135cf13` |
| `03_Ocha_Reprise_Audit.md` | Note de passation, écrite pour reprendre l'audit dans une nouvelle conversation. Sa question centrale est le nombre final de domaines de premier niveau (32, 33 ou 34), alors resté ouvert. | 2026-10-01 | `de9e966e20189bdc828627d349a2d0a5b341671737b861df7f3181ed3ee6198c` |
| `Ocha_Decisions_A2_Unite_Apprentissage_Tags.md` | Cahier de questions sur deux décisions à prendre : l'unité d'apprentissage (`ENTRY` ou `SENSE`) et le statut des tags. Il donne des « points de départ proposés », pas des décisions. | 2026-10-01 | `96b9e75aa397d357906ef8bfaf55847c3e66f246e2a1edd612a4a425a050e91f` |

Les décisions finales correspondantes sont ailleurs :

- le nombre de domaines et les candidats non promus : `A2-L3-v1` (§4, §8) et `A2-GLOBAL-v1`
  (§4.2, §4.5) ;
- l'unité d'apprentissage et les tags : décisions D1 et D2 de
  `docs/conception/addendum-A2-liaison.md`, puis `docs/conception/registre-des-tags.md`.

## Archive brute, hors du dépôt

`Conversation semantique.txt` est la conversation d'origine de la première phase de conception,
jusqu'au stress-test N5 à N2. Elle s'arrête avant la rédaction des snapshots et contient plusieurs
versions successives de l'architecture.

**Elle n'est pas dans le dépôt** : elle n'a pas été relue intégralement, et sa publication n'est pas
autorisée à ce jour. Les trois documents ci-dessus suffisent, pour le moment, à documenter le
cheminement.

| Fichier | Taille | Date | SHA-256 de la copie vérifiée |
|---|---|---|---|
| `Conversation semantique.txt` | 35 797 lignes, environ 940 Ko | 2026-10-01 | `73d87ddaa68ff01ff76b50bdb0644fb1fdbc111fdcdb0231d03c33b81c983e1f` |

Si elle est consultée, c'est seulement pour retrouver le contexte d'une décision lorsque les
documents synthétiques ne suffisent pas. Elle ne prime jamais sur un snapshot, un addendum validé ou
une décision documentée.

`03_Ocha_Reprise_Audit.md` la désigne sous un ancien nom, `Conversation semantique(2).txt`, avec un
compte approximatif d'environ 35 798 lignes ; la copie vérifiée en contient 35 797.

## Document référencé, non déposé

`03_Ocha_Reprise_Audit.md` cite aussi `01_Ocha_Etat_et_Architecture.md`. Ce fichier n'est pas dans
le dépôt à ce jour. Une copie historique de 144 lignes existe hors du dépôt ; si elle est fournie,
sa place est dans ce dossier, au même statut que les autres documents historiques.
