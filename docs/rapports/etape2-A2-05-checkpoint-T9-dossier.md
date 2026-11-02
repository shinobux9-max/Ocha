# Étape 2 · A2-05 — dossier de checkpoint Git, après T9

**Date** : 2026-11-02
**Statut** : **proposition, en lecture seule. Rien n'est indexé, committé ni poussé.** Écrit par `a2-05-travail/arbitrage-F/checkpoint/dossier-checkpoint.mjs`. Le `git add` et le commit de la simulation n'ont lieu que dans des clones temporaires, supprimés ensuite. Le dossier, les listes et les contrôles sont un **instantané** : ils se régénèrent juste avant tout commit.

**Autorisation** : « Régénérer ensuite le dossier de checkpoint avec la nouvelle sélection et les deux corrections du préparateur. » ; « Ne pas encore appliquer la consignation ni effectuer de `git add`, commit ou push. »

## 1. État réel

| Élément | Valeur |
|---|---|
| Branche | `ocha-v2` |
| HEAD | `78031638c0f81dca1b167e3f57f5a891767fc4cb` |
| `origin/ocha-v2` (référence locale) | `78031638c0f81dca1b167e3f57f5a891767fc4cb` |
| Distant réel (`git ls-remote`) | `78031638c0f81dca1b167e3f57f5a891767fc4cb` |
| Index | vide |
| Fichiers suivis modifiés | 13 |
| Fichiers suivis supprimés | 0 |
| Fichiers non suivis | 1895, 2049,1 Mo |
| `.gitignore` | ne couvre ni `a2-05-travail/`, ni `chatgpt-relecture/`, ni les archives |

**L'indexation doit se faire par liste explicite**, jamais par `git add .` ni `git add -A`.

## 2. Fichiers suivis modifiés, tous inclus

| Fichier | + | − |
|---|---|---|
| `CLAUDE.md` | 2 | 2 |
| `ETAT-ACTUEL.md` | 112 | 44 |
| `ROADMAP.md` | 21 | 13 |
| `a2-05-travail/INVENTAIRE-SCRIPTS.md` | 209 | 0 |
| `a2-05-travail/couverture-lot3.mjs` | 24 | 4 |
| `a2-05-travail/empreintes-lot3.mjs` | 45 | 2 |
| `a2-05-travail/empreintes-rapports-arbitres.json` | 125 | 2 |
| `a2-05-travail/lot3-commun-v2.mjs` | 8 | 2 |
| `a2-05-travail/perimetre-v2.mjs` | 63 | 9 |
| `docs/rapports/etape2-A2-05-bilan-volet2.md` | 715 | 0 |
| `docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md` | 13 | 5 |
| `docs/relecture/note-relais.md` | 2 | 0 |
| `docs/relecture/reprise-A2-05.md` | 55 | 627 |

## 3. Fichiers non suivis proposés

**338 fichiers, 8,5 Mo.** Total du commit : **351 fichiers**. Liste exacte : `a2-05-travail/arbitrage-F/checkpoint/chemins-inclus.txt`.

| Groupe | Fichiers | Taille |
|---|---|---|
| `a2-05-travail/ (racine)` | 38 | 0,8 Mo |
| `a2-05-travail/arbitrage-F/` | 25 | 0,3 Mo |
| `a2-05-travail/arbitrage-T2/` | 3 | 0,1 Mo |
| `a2-05-travail/arbitrage-T3/` | 4 | 0,2 Mo |
| `a2-05-travail/arbitrage-T4/` | 15 | 0,4 Mo |
| `a2-05-travail/arbitrage-T5/` | 19 | 0,4 Mo |
| `a2-05-travail/arbitrage-T6/` | 48 | 1,1 Mo |
| `a2-05-travail/arbitrage-T7/` | 28 | 0,7 Mo |
| `a2-05-travail/arbitrage-T8/` | 31 | 0,5 Mo |
| `a2-05-travail/arbitrage-T9/` | 32 | 0,7 Mo |
| `a2-05-travail/correction-c9a/` | 6 | 0,1 Mo |
| `a2-05-travail/correction-comparables/` | 7 | 0,1 Mo |
| `a2-05-travail/correction-couverture/` | 6 | 0,0 Mo |
| `a2-05-travail/correction-hj/` | 7 | 0,1 Mo |
| `a2-05-travail/correction-res/` | 15 | 0,2 Mo |
| `a2-05-travail/versions-finales/` | 16 | 1,0 Mo |
| `docs/rapports/` | 38 | 1,9 Mo |

## 4. Fichiers exclus

**1557 fichiers, 2040,6 Mo.** Liste exacte : `chemins-exclus.txt`. La règle reprend celle du checkpoint du 2026-10-18 : les 117 fichiers d'`a2-05-travail/` suivis à `HEAD` ne comprennent ni note, ni sauvegarde, ni trace.

| Classe | Fichiers | Taille | Règle |
|---|---|---|---|
| relectures | 239 | 1835,1 Mo | `chatgpt-relecture/` : exports, 1,6 Go, jamais committés |
| archives | 4 | 105,6 Mo | `*.zip` : artefacts de transfert, jamais committés |
| notes | 315 | 34,9 Mo | notes d'export et leurs en-têtes : reproduites dans les exports |
| aperçu | 4 | 0,0 Mo | `sync-stable-apercu.md` : se régénère à chaque aperçu |
| sauvegardes | 182 | 26,5 Mo | `**/depart/` : sauvegardes de départ de chaque opération |
| traces | 525 | 8,1 Mo | sorties, diffs et aperçus de chaque opération |
| versions | 288 | 30,2 Mo | versions proposées et documents de travail dans les sous-dossiers d'`arbitrage-*/`, hors scripts |

**Exception, établie par la simulation** : `a2-05-travail/versions-finales/` est inclus en entier, `depart/` et diffs compris : le relais en service les lit, et il s'arrête en erreur sans eux. La règle du 2026-10-18 seule aurait donné un commit dont le relais ne fonctionne pas sur une restauration.

**Ce que l'exclusion coûte** : les sauvegardes de départ, les traces et les notes de T1 à T9 restent sur ce poste seulement. Elles ne servent à aucun contrôle en service (§5), et l'essentiel figure dans les exports transmis. Variante non recommandée : les inclure, soit environ 99,8 Mo de plus.

## 5. Contrôles de non-régression

| Contrôle | Résultat |
|---|---|
| HEAD, référence locale et distant réel identiques | conforme : 78031638c0f8… |
| index vide | conforme |
| aucun fichier suivi supprimé | conforme |
| aucun fichier inclus dans `data/`, `reconstruction/`, `tools/`, `tests/`, `docs/conception/` ou l'application | conforme |
| aucune archive ni export parmi les inclus | conforme |
| aucun motif de secret dans les fichiers inclus | conforme |
| aucun fichier inclus de plus de 2 Mo | conforme |
| recalculs de T2 à T4, hors du suivi : mêmes écarts que sur le dépôt réel, aucune aggravation | conforme : T2 code 1, 2 écart(s) ; T3 code 1, 1 écart(s) ; T4 code 1, 3 écart(s) |
| inclus seuls, avant commit : tous les contrôles à 0, aucun ne dépend d'un fichier exclu | conforme : 9 contrôles ; 30 conformes sur 30 |
| suite de tests, inclus seuls | conforme : tests 510 pass 510 fail 0 |
| blobs : seuls les inclus changent, aucune renormalisation, trace `.diff` suivie non touchée | conforme : 13 modifiés, 338 ajoutés, 0 autre |
| simulation : `git add` par liste explicite et commit, dans le clone temporaire seulement | conforme : 351 files changed, 51209 insertions(+), 710 deletions(-) |
| le commit ne réécrit aucun fichier de travail : octets identiques | conforme : 351 fichiers |
| après le commit simulé, arbre propre sur le clone | conforme |
| après le commit simulé : contrôles à 0, relais normal à 30 sur 30, sans valeur de clôture | conforme : 30 conformes sur 30 ;  |
| restauration `core.autocrlf=true` : clone complet, arbre propre | conforme : 1180 fichiers suivis |
| restauration `core.autocrlf=true` : toutes les empreintes concordent | conforme : 45 sur 45 |
| restauration `core.autocrlf=true` : couverture, empreintes, pilote et recalculs de T5 à T9 à 0 | conforme : 8 contrôles |
| restauration `core.autocrlf=true` : relais 30 sur 30, sans aucun écart de fins de ligne | conforme : 30 conformes sur 30 ;  |
| restauration `core.autocrlf=true` : suite de tests | conforme : tests 510 pass 510 fail 0 |
| restauration `core.autocrlf=true` : dans `a2-05-travail/`, `docs/`, `reconstruction/`, `data/` et les documents de tête, seuls les écarts résiduels connus | conforme : 1 fichier(s) : a2-05-travail/proposition-CLAUDE-md-section5.diff |
| restauration `core.autocrlf=false` : clone complet, arbre propre | conforme : 1180 fichiers suivis |
| restauration `core.autocrlf=false` : toutes les empreintes concordent | conforme : 45 sur 45 |
| restauration `core.autocrlf=false` : couverture, empreintes, pilote et recalculs de T5 à T9 à 0 | conforme : 8 contrôles |
| restauration `core.autocrlf=false` : relais 30 sur 30, sans aucun écart de fins de ligne | conforme : 30 conformes sur 30 ;  |
| restauration `core.autocrlf=false` : suite de tests | conforme : tests 510 pass 510 fail 0 |
| restauration `core.autocrlf=false` : dans `a2-05-travail/`, `docs/`, `reconstruction/`, `data/` et les documents de tête, seuls les écarts résiduels connus | conforme : 1 fichier(s) : a2-05-travail/proposition-CLAUDE-md-section5.diff |
| après le push simulé : relais 30 sur 30, sans valeur de clôture | conforme |
| dépôt réel : HEAD inchangé, index vide | conforme |

**Recalculs de T2 à T4** : ils sont en écart sur le dépôt réel, avant tout commit : ils décrivent l'état d'avant l'arbitrage de leur tranche et ne sont plus suivis. Le relais, les recalculs de T5 à T9 et le pilote sont les contrôles en service.

**Après un commit, deux contrôles de trace décrivent un état passé** : `arbitrage-F/controle-perimetre-F.mjs` exige `HEAD` à `7803163`, et `arbitrage-T9/audit/controle-audit-T9.mjs` l'état d'avant l'arbitrage. Ce ne sont pas des contrôles en service.

## 6. Modifications de blobs

**Le commit simulé ne change que les fichiers de la liste** : 13 blobs modifiés, 338 ajoutés, aucun autre (`git diff --cached --no-renames --name-status`). **Aucune renormalisation** : aucun fichier suivi hors de la liste n'obtient un nouveau blob, ni la trace `.diff` suivie, ni `js/features/oral.js`.

**Fins de ligne des 351 fichiers de la liste, dans l'index du clone** :

| Index, travail, attribut | Fichiers |
|---|---|
| `i/lf w/crlf attr/text eol=crlf` | 8 |
| `i/lf w/lf attr/` | 1 |
| `i/lf w/lf attr/-text` | 341 |
| `i/mixed w/mixed attr/-text` | 1 |

## 7. Restauration depuis le commit simulé

Deux clones jetables, depuis le commit simulé, `.gitattributes` compris, sous une valeur explicite de `core.autocrlf`. La référence de comparaison est l'état de travail. Ce poste a `core.autocrlf=true` par défaut.

| Restauration | Empreintes | Relais | Tests | Octets différents | dans les zones protégées | hors zones | Arbre propre |
|---|---|---|---|---|---|---|---|
| `core.autocrlf=true` | 45 sur 45 | 30 conformes sur 30 () | tests 510 pass 510 fail 0 | 333 sur 1180 | 1 | 332 | oui |
| `core.autocrlf=false` | 45 sur 45 | 30 conformes sur 30 () | tests 510 pass 510 fail 0 | 29 sur 1180 | 1 | 28 | oui |

**Le relais normal rend 30 sur 30 dans les deux cas ; cela ne prouve pas une clôture** (§9). Le défaut de fins de ligne est levé.

**Écarts résiduels, `core.autocrlf=true`, hors zones** :

- `.claude/agents/impeccable-asset-producer.md`
- `.claude/agents/impeccable-documenter.md`
- `.claude/agents/impeccable-finish-reviewer.md`
- `.claude/agents/impeccable-manual-edit-applier.md`
- `.claude/skills/banner-design/SKILL.md`
- `.claude/skills/banner-design/references/banner-sizes-and-styles.md`
- `.claude/skills/brand/SKILL.md`
- `.claude/skills/brand/references/approval-checklist.md`
- `.claude/skills/brand/references/asset-organization.md`
- `.claude/skills/brand/references/brand-guideline-template.md`
- `.claude/skills/brand/references/color-palette-management.md`
- `.claude/skills/brand/references/consistency-checklist.md`
- `.claude/skills/brand/references/logo-usage-rules.md`
- `.claude/skills/brand/references/messaging-framework.md`
- `.claude/skills/brand/references/typography-specifications.md`
- `.claude/skills/brand/references/update.md`
- `.claude/skills/brand/references/visual-identity.md`
- `.claude/skills/brand/references/voice-framework.md`
- `.claude/skills/brand/scripts/extract-colors.cjs`
- `.claude/skills/brand/scripts/inject-brand-context.cjs`
- `.claude/skills/brand/scripts/sync-brand-to-tokens.cjs`
- `.claude/skills/brand/scripts/tests/test_sync_brand_to_tokens.py`
- `.claude/skills/brand/scripts/validate-asset.cjs`
- `.claude/skills/brand/templates/brand-guidelines-starter.md`
- `.claude/skills/design-system/SKILL.md`
- `.claude/skills/design-system/data/slide-backgrounds.csv`
- `.claude/skills/design-system/data/slide-charts.csv`
- `.claude/skills/design-system/data/slide-color-logic.csv`
- `.claude/skills/design-system/data/slide-copy.csv`
- `.claude/skills/design-system/data/slide-layout-logic.csv`
- `.claude/skills/design-system/data/slide-layouts.csv`
- `.claude/skills/design-system/data/slide-strategies.csv`
- `.claude/skills/design-system/data/slide-typography.csv`
- `.claude/skills/design-system/references/component-specs.md`
- `.claude/skills/design-system/references/component-tokens.md`
- `.claude/skills/design-system/references/primitive-tokens.md`
- `.claude/skills/design-system/references/semantic-tokens.md`
- `.claude/skills/design-system/references/states-and-variants.md`
- `.claude/skills/design-system/references/tailwind-integration.md`
- `.claude/skills/design-system/references/token-architecture.md`
- `.claude/skills/design-system/scripts/embed-tokens.cjs`
- `.claude/skills/design-system/scripts/fetch-background.py`
- `.claude/skills/design-system/scripts/generate-slide.py`
- `.claude/skills/design-system/scripts/generate-tokens.cjs`
- `.claude/skills/design-system/scripts/html-token-validator.py`
- `.claude/skills/design-system/scripts/search-slides.py`
- `.claude/skills/design-system/scripts/slide-token-validator.py`
- `.claude/skills/design-system/scripts/slide_search_core.py`
- `.claude/skills/design-system/scripts/tests/test_validate_tokens.py`
- `.claude/skills/design-system/scripts/validate-tokens.cjs`
- `.claude/skills/design-system/templates/design-tokens-starter.json`
- `.claude/skills/design/SKILL.md`
- `.claude/skills/design/data/cip/deliverables.csv`
- `.claude/skills/design/data/cip/industries.csv`
- `.claude/skills/design/data/cip/mockup-contexts.csv`
- `.claude/skills/design/data/cip/styles.csv`
- `.claude/skills/design/data/icon/styles.csv`
- `.claude/skills/design/data/logo/colors.csv`
- `.claude/skills/design/data/logo/industries.csv`
- `.claude/skills/design/data/logo/styles.csv`
- `.claude/skills/design/references/banner-sizes-and-styles.md`
- `.claude/skills/design/references/cip-deliverable-guide.md`
- `.claude/skills/design/references/cip-design.md`
- `.claude/skills/design/references/cip-prompt-engineering.md`
- `.claude/skills/design/references/cip-style-guide.md`
- `.claude/skills/design/references/design-routing.md`
- `.claude/skills/design/references/icon-design.md`
- `.claude/skills/design/references/logo-color-psychology.md`
- `.claude/skills/design/references/logo-design.md`
- `.claude/skills/design/references/logo-prompt-engineering.md`
- `.claude/skills/design/references/logo-style-guide.md`
- `.claude/skills/design/references/slides-copywriting-formulas.md`
- `.claude/skills/design/references/slides-create.md`
- `.claude/skills/design/references/slides-html-template.md`
- `.claude/skills/design/references/slides-layout-patterns.md`
- `.claude/skills/design/references/slides-strategies.md`
- `.claude/skills/design/references/slides.md`
- `.claude/skills/design/references/social-photos-design.md`
- `.claude/skills/design/scripts/cip/core.py`
- `.claude/skills/design/scripts/cip/generate.py`
- `.claude/skills/design/scripts/cip/render-html.py`
- `.claude/skills/design/scripts/cip/search.py`
- `.claude/skills/design/scripts/icon/generate.py`
- `.claude/skills/design/scripts/logo/core.py`
- `.claude/skills/design/scripts/logo/generate.py`
- `.claude/skills/design/scripts/logo/search.py`
- `.claude/skills/impeccable/SKILL.md`
- `.claude/skills/impeccable/reference/adapt.md`
- `.claude/skills/impeccable/reference/adapt.native.md`
- `.claude/skills/impeccable/reference/android.md`
- `.claude/skills/impeccable/reference/animate.md`
- `.claude/skills/impeccable/reference/audit.md`
- `.claude/skills/impeccable/reference/audit.native.md`
- `.claude/skills/impeccable/reference/bolder.md`
- `.claude/skills/impeccable/reference/clarify.md`
- `.claude/skills/impeccable/reference/colorize.md`
- `.claude/skills/impeccable/reference/craft-floor.md`
- `.claude/skills/impeccable/reference/craft.md`
- `.claude/skills/impeccable/reference/critique.md`
- `.claude/skills/impeccable/reference/degraded/asset-producer.md`
- `.claude/skills/impeccable/reference/degraded/documenter.md`
- `.claude/skills/impeccable/reference/degraded/finish-reviewer.md`
- `.claude/skills/impeccable/reference/degraded/manual-edit-applier.md`
- `.claude/skills/impeccable/reference/delight.md`
- `.claude/skills/impeccable/reference/distill.md`
- `.claude/skills/impeccable/reference/doctor.md`
- `.claude/skills/impeccable/reference/document.md`
- `.claude/skills/impeccable/reference/extract.md`
- `.claude/skills/impeccable/reference/harden.md`
- `.claude/skills/impeccable/reference/hooks.md`
- `.claude/skills/impeccable/reference/init.md`
- `.claude/skills/impeccable/reference/ios.md`
- `.claude/skills/impeccable/reference/layout.md`
- `.claude/skills/impeccable/reference/live-setup.md`
- `.claude/skills/impeccable/reference/live.md`
- `.claude/skills/impeccable/reference/new-work.md`
- `.claude/skills/impeccable/reference/onboard.md`
- `.claude/skills/impeccable/reference/operate.md`
- `.claude/skills/impeccable/reference/optimize.md`
- `.claude/skills/impeccable/reference/overdrive.md`
- `.claude/skills/impeccable/reference/polish.md`
- `.claude/skills/impeccable/reference/quieter.md`
- `.claude/skills/impeccable/reference/routing.md`
- `.claude/skills/impeccable/reference/shape.md`
- `.claude/skills/impeccable/reference/typeset.md`
- `.claude/skills/impeccable/reference/visualize.md`
- `.claude/skills/impeccable/scripts/VERSION`
- `.claude/skills/impeccable/scripts/command-metadata.json`
- `.claude/skills/impeccable/scripts/data/font-index-failures.json`
- `.claude/skills/impeccable/scripts/impeccable`
- `.claude/skills/impeccable/scripts/impeccable.cmd`
- `.claude/skills/impeccable/scripts/live-browser-dom.js`
- `.claude/skills/impeccable/scripts/live-browser-ignores.js`
- `.claude/skills/impeccable/scripts/live-browser-session.js`
- `.claude/skills/impeccable/scripts/live-browser.js`
- `.claude/skills/impeccable/scripts/modern-screenshot.umd.js`
- `.claude/skills/slides/SKILL.md`
- `.claude/skills/slides/references/copywriting-formulas.md`
- `.claude/skills/slides/references/create.md`
- `.claude/skills/slides/references/html-template.md`
- `.claude/skills/slides/references/layout-patterns.md`
- `.claude/skills/slides/references/slide-strategies.md`
- `.claude/skills/ui-styling/LICENSE.txt`
- `.claude/skills/ui-styling/SKILL.md`
- `.claude/skills/ui-styling/references/canvas-design-system.md`
- `.claude/skills/ui-styling/references/shadcn-accessibility.md`
- `.claude/skills/ui-styling/references/shadcn-components.md`
- `.claude/skills/ui-styling/references/shadcn-theming.md`
- `.claude/skills/ui-styling/references/tailwind-customization.md`
- `.claude/skills/ui-styling/references/tailwind-responsive.md`
- `.claude/skills/ui-styling/references/tailwind-utilities.md`
- `.claude/skills/ui-styling/scripts/requirements.txt`
- `.claude/skills/ui-styling/scripts/shadcn_add.py`
- `.claude/skills/ui-styling/scripts/tailwind_config_gen.py`
- `.claude/skills/ui-styling/scripts/tests/requirements.txt`
- `.claude/skills/ui-styling/scripts/tests/test_shadcn_add.py`
- `.claude/skills/ui-styling/scripts/tests/test_tailwind_config_gen.py`
- `.claude/skills/ui-ux-pro-max/SKILL.md`
- `.claude/skills/ui-ux-pro-max/data/app-interface.csv`
- `.claude/skills/ui-ux-pro-max/data/catalog-summary.json`
- `.claude/skills/ui-ux-pro-max/data/charts.csv`
- `.claude/skills/ui-ux-pro-max/data/colors.csv`
- `.claude/skills/ui-ux-pro-max/data/data-provenance.json`
- `.claude/skills/ui-ux-pro-max/data/google-font-licenses.json`
- `.claude/skills/ui-ux-pro-max/data/google-fonts.csv`
- `.claude/skills/ui-ux-pro-max/data/icons.csv`
- `.claude/skills/ui-ux-pro-max/data/landing.csv`
- `.claude/skills/ui-ux-pro-max/data/motion.csv`
- `.claude/skills/ui-ux-pro-max/data/phosphor-icons-upstream.json`
- `.claude/skills/ui-ux-pro-max/data/products.csv`
- `.claude/skills/ui-ux-pro-max/data/react-performance.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/angular.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/astro.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/avalonia.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/flutter.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/html-tailwind.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/javafx.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/jetpack-compose.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/laravel.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/nextjs.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/nuxt-ui.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/nuxtjs.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/react-native.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/react.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/shadcn.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/svelte.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/swiftui.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/threejs.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/uno.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/uwp.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/vue.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/winui.csv`
- `.claude/skills/ui-ux-pro-max/data/stacks/wpf.csv`
- `.claude/skills/ui-ux-pro-max/data/styles.csv`
- `.claude/skills/ui-ux-pro-max/data/typography.csv`
- `.claude/skills/ui-ux-pro-max/data/ui-reasoning.csv`
- `.claude/skills/ui-ux-pro-max/data/ux-guidelines.csv`
- `.claude/skills/ui-ux-pro-max/scripts/core.py`
- `.claude/skills/ui-ux-pro-max/scripts/design_system.py`
- `.claude/skills/ui-ux-pro-max/scripts/reasoning_contract.py`
- `.claude/skills/ui-ux-pro-max/scripts/search.py`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/google-api.json`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/google-catalog.json`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/google-existing.csv`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/google-metadata.json`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/google-overrides.json`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/icons-curated.csv`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/phosphor-core.json`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/phosphor-package.json`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/phosphor-react-exports.json`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/catalogs/phosphor-react-package.json`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/relevance-baseline.json`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/relevance-cases.json`
- `.claude/skills/ui-ux-pro-max/scripts/tests/fixtures/relevance-thresholds.json`
- `.claude/skills/ui-ux-pro-max/scripts/tests/test_catalog_refresh.py`
- `.claude/skills/ui-ux-pro-max/scripts/tests/test_core.py`
- `.claude/skills/ui-ux-pro-max/scripts/tests/test_core_data_quality.py`
- `.claude/skills/ui-ux-pro-max/scripts/tests/test_data_contracts.py`
- `.claude/skills/ui-ux-pro-max/scripts/tests/test_design_system_mode.py`
- `.claude/skills/ui-ux-pro-max/scripts/tests/test_native_desktop_stack_freshness.py`
- `.claude/skills/ui-ux-pro-max/scripts/tests/test_relevance_evaluator.py`
- `.claude/skills/ui-ux-pro-max/scripts/tests/test_style_taxonomy.py`
- `.claude/skills/ui-ux-pro-max/scripts/tests/test_text_layout_resilience.py`
- `.claude/skills/ui-ux-pro-max/scripts/tests/test_web_stack_freshness.py`
- `.claude/skills/ui-ux-pro-max/scripts/validate_data.py`
- `.gitattributes`
- `js/core/constants.js`
- `js/core/data-loader.js`
- `js/core/state.js`
- `js/features/free-training.js`
- `js/features/oral.js`
- `js/features/strokes.js`
- `js/learning/exercises.js`
- `js/learning/learning-path.js`
- `js/learning/srs.js`
- `js/ui/mixed-review.js`
- `js/ui/modals.js`
- `js/ui/niveaux-screens.js`
- `manifest.json`
- `monolithe kanji.css`
- `monolithe kanji.js`
- `package.json`
- `src/config.js`
- `src/content/catalog.js`
- `src/content/errors.js`
- `src/content/index.js`
- `src/content/kana.js`
- `src/learning/budget.js`
- `src/learning/dates.js`
- `src/learning/effects.js`
- `src/learning/events.js`
- `src/learning/index.js`
- `src/learning/journal.js`
- `src/learning/record.js`
- `src/learning/srs.js`
- `src/learning/state.js`
- `src/learning/weakness.js`
- `src/store/contract.js`
- `src/store/indexeddb.js`
- `src/store/memory.js`
- `src/store/schema.js`
- `sw.js`
- `tests/browser/serve.mjs`
- `tests/browser/store-contract.html`
- `tests/browser/store-contract.js`
- `tests/config.test.js`
- `tests/content/catalog.test.js`
- `tests/content/fixtures/kana-legacy.json`
- `tests/content/integration.test.js`
- `tests/content/kana.test.js`
- `tests/content/purity.test.js`
- `tests/helpers/content-data.mjs`
- `tests/learning/budget.test.js`
- `tests/learning/dates.test.js`
- `tests/learning/e2e.test.js`
- `tests/learning/effects-knowledge.test.js`
- `tests/learning/effects.test.js`
- `tests/learning/events.test.js`
- `tests/learning/journal.test.js`
- `tests/learning/record.test.js`
- `tests/learning/replay.js`
- `tests/learning/srs.test.js`
- `tests/learning/state.test.js`
- `tests/learning/surface.test.js`
- `tests/learning/weakness.test.js`
- `tests/learning/write-failure.test.js`
- `tests/lexicon/adapter.test.js`
- `tests/lexicon/coverage.test.js`
- `tests/lexicon/entry.test.js`
- `tests/lexicon/fixtures/minimal-lexicon.mjs`
- `tests/lexicon/index.test.js`
- `tests/lexicon/purity.test.js`
- `tests/lexicon/references.test.js`
- `tests/lexicon/registries.test.js`
- `tests/lexicon/schema.test.js`
- `tests/lexicon/sense.test.js`
- `tests/reconstruction/assemble.test.js`
- `tests/reconstruction/helpers.mjs`
- `tests/reconstruction/lot-26.test.js`
- `tests/reconstruction/mechanical.test.js`
- `tests/reconstruction/publication.test.js`
- `tests/reconstruction/rules.test.js`
- `tests/registries/audit.test.js`
- `tests/registries/decisions.test.js`
- `tests/registries/transcription.test.js`
- `tests/store/contract-cases.js`
- `tests/store/contract.test.js`
- `tests/store/indexeddb.test.js`
- `tests/store/memory.test.js`
- `tests/store/schema.test.js`
- `tests/tools/check-layers.test.js`
- `tests/tools/export-relecture.test.js`
- `tests/tools/identifiers.test.js`
- `tests/tools/validate-data.test.js`
- `tools/check-layers.mjs`
- `tools/export-relecture.mjs`
- `tools/lexicon-adapter.mjs`
- `tools/lexicon/entry.mjs`
- `tools/lexicon/index.mjs`
- `tools/lexicon/references.mjs`
- `tools/lexicon/registries.mjs`
- `tools/lexicon/schema.mjs`
- `tools/lexicon/sense.mjs`
- `tools/reconstruction/assemble.mjs`
- `tools/reconstruction/decisions.mjs`
- `tools/reconstruction/mechanical.mjs`
- `tools/reconstruction/publish.mjs`
- `tools/reconstruction/report.mjs`
- `tools/reconstruction/rules.mjs`
- `tools/reconstruction/run.mjs`
- `tools/reconstruction/sources.mjs`
- `tools/validate-data.mjs`

**Écarts résiduels, `core.autocrlf=false`, hors zones** :

- `.gitignore`
- `css/base.css`
- `css/components.css`
- `css/grammar.css`
- `css/kanji.css`
- `css/layout.css`
- `css/learning.css`
- `css/quiz.css`
- `css/review.css`
- `css/vocab.css`
- `exemples.json`
- `hanzi-writer.js`
- `index.html`
- `js/app.js`
- `js/core/navigation.js`
- `js/core/storage.js`
- `js/features/grammar.js`
- `js/features/kana.js`
- `js/features/kanji.js`
- `js/features/oral.js`
- `js/features/vocabulary.js`
- `js/learning/weakness.js`
- `js/ui/cards.js`
- `js/ui/common.js`
- `js/ui/dashboard.js`
- `js/ui/kanji-review.js`
- `quiz-overrides.json`
- `tests/reconstruction/workspace.test.js`

**Dans les zones** : un seul fichier, `a2-05-travail/proposition-CLAUDE-md-section5.diff`, dans les deux configurations (ci-dessous). `REGLES-CONSTRUCTION.md` revient à l'identique depuis la règle complémentaire. Hors zones, ce sont des fichiers que le `.gitattributes` ne couvre pas, à dessein : le code, les styles et les fichiers de l'application restent gouvernés par `core.autocrlf`, comme avant. `.gitattributes` lui-même, en LF sur le disque, revient en CRLF sous `true`, sans effet mesuré : arbre propre, 45 empreintes sur 45.

### Fichiers à fins de ligne mixtes

**Ils restent inchangés, conformément à la décision.** Mesure :

| Fichier | Attributs | Travail | Blob du commit | Restauré, `true` | Restauré, `false` |
|---|---|---|---|---|---|
| `a2-05-travail/proposition-CLAUDE-md-section5.diff` | text=unset, eol=unspecified | 44 CRLF, 3 LF | 0 CRLF, 47 LF | 0 CRLF, 47 LF | 0 CRLF, 47 LF |
| `a2-05-travail/correction-res/regeneration/sortie-preparation.txt` | text=unset, eol=unspecified | 1 CRLF, 46 LF | 1 CRLF, 46 LF | 1 CRLF, 46 LF | 1 CRLF, 46 LF |
| `js/features/oral.js` | text=unspecified, eol=unspecified | 14 CRLF, 170 LF | 0 CRLF, 184 LF | 184 CRLF, 0 LF | 0 CRLF, 184 LF |

**Risque connu, non traité** : sous `-text`, Git compare les octets dès que l'horodatage d'un fichier change. Horodatage de `proposition-CLAUDE-md-section5.diff` changé sur le clone, sans toucher au contenu : `git status` rend « M a2-05-travail/proposition-CLAUDE-md-section5.diff ». Le blob reste correct ; l'effet est un faux « modifié » à ne pas indexer. C'est une raison de plus d'indexer **par liste explicite**.

## 8. Message de commit proposé

`Docs: checkpoint A2-05, lot 3 jusqu'a T9 close, revision 4 d'E5, bloc F prepare, gitattributes cible, alternative Git installee, aucune correction appliquee`

**Une seule ligne**, sans accent, comme les commits précédents. Indexation : `git add --pathspec-from-file=<liste régénérée>`, jamais `git add .` ni `git add -A`.

## 9. Référence de commit

**L'alternative est installée.** Un relais normal à 30 sur 30 n'est jamais la preuve d'une clôture Git. Le checkpoint n'est complet qu'après ces six états : 1. commit N ; 2. push ; 3. `cloture-checkpoint.mjs --declarer` ; 4. commit de clôture ; 5. second push ; 6. `cloture-checkpoint.mjs --verifier`, qui lance le relais en `--strict`. **`CLAUDE.md`, ligne 128, n'est pas modifiée.**

## 10. Ordre recommandé

1. Accord de commit, sur cette liste. 2. Accord de push, distinct. 3. Déclaration, commit de clôture et second push, chacun sur autorisation. 4. `--verifier`. **Le tout avant toute installation normative.**

