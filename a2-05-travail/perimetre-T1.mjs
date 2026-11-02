// A2-05 · volet 1 · lot 3 : périmètre opérationnel de la tranche T1 (B10, B11, B12), en proposition (étape 5 du plan de transition).
// Configuration seule : le périmètre est produit par perimetre-v2.mjs (générateur v2, non modifié), qui ne juge aucun sens et refuse
// d'écrire sur un rapport arbitré. Les risques manuels ne contiennent ni verdict ni correction nouvelle : ils nomment des frontières.
// Usage : node a2-05-travail/perimetre-T1.mjs <racine du dépôt> [--sortie <chemin>]   (défaut : docs/rapports/etape2-A2-05-volet1-lot3-T1-perimetre.md)
import { resolve } from 'node:path';
import { produirePerimetre } from './perimetre-v2.mjs';

const args = process.argv.slice(2); const root = resolve(args[0] ?? ''); if (!args[0]) throw new Error('argument attendu : racine du dépôt');
const i = args.indexOf('--sortie'); const sortie = i >= 0 ? args[i + 1] : undefined;
// L'arbitrage du périmètre se renseigne ici, après la relecture ; la proposition est conservée telle qu'elle a été livrée
const ARBITRAGE = { date: '2026-10-20', texte: [
  "Arbitrage du 2026-10-20 (ChatGPT, par délégation ; relayé par l'utilisateur) : « J'accepte le périmètre opérationnel T1, constitué des 24 sens dans 22 ENTRY des livraisons B10, B11 et B12, sans ajout ni retrait. Le regroupement thématique, les neuf règles de criblage, les comparables et les risques documentés sont acceptés. »",
  '',
  "**Les 9 corrections déjà retenues**, dont V2-84 pour レジ袋, sont correctement recensées ; elles ne sont **ni rouvertes ni appliquées**. Le défaut de rapprochement hors JLPT et sa correction sont tracés dans `etape2-A2-05-correction-hj-proposition.md`.",
  '',
  "**Audit autorisé** : l'audit individuel de T1 seule, sur les 24 sens acceptés, livré en une seule livraison, en proposition ; aucun verdict n'est arbitré avant la relecture. Vigilances : レジ袋 (`v_718` / `hj_v_1`, V2-84, aucune décision inventée) ; 浴びる et 起きる (deux sens examinés séparément) ; 年 (faux rapprochements) ; 冷たい, 熱い et 温い (sans symétrie imposée) ; 聞く, 休む, 差す et かける (autres sens arbitrés non rouverts) ; tags de せっけん et レジ袋 ; catégories de niveau 2 ou 3 selon les référents et les frontières d'A2-L3.",
] };
const res = produirePerimetre({
  root, nom: 'T1', livraisons: ['B10', 'B11', 'B12'], date: '2026-10-20', sortie, arbitrage: ARBITRAGE,
  autorisation: "arbitrage du 2026-10-20 (ChatGPT, par délégation ; relayé par l'utilisateur), après la clôture de l'étape 4 : « J'autorise la génération du périmètre opérationnel de T1, en proposition uniquement. » Aucune fiche n'est lue pour rendre un verdict ; aucune correction nouvelle ; aucun audit des 24 sens ; aucun comparable arbitré. Le périmètre doit recevoir une acceptation explicite avant tout audit individuel.",
  risquesManuels: [
    "**Regroupement thématique** (découpage arbitré du 2026-10-12, §5) : **B10** et **B11**, `etre_humain` (perception, hygiène, cycle de vie, états et besoins physiques, émotions, esprit) ; **B12**, `habillement_accessoires_personnels` (vêtements, accessoires, sacs). Le regroupement en tranche ne déplace aucun sens et ne fusionne aucune livraison : chaque sens reste examiné dans sa livraison d'origine.",
    "**Comptages de l'essai à blanc du contrôle final (étape 4)** : 24 sens, 22 ENTRY, 9 règles, 27 comparables nommés, 82 sens de même catégorie, 18 d'autres livraisons, 0 du bloc F, 6 risques détectés. Ils servent de référence de contrôle pour ce périmètre ; ils ne préjugent d'aucun verdict. Le compte de **8 corrections retenues** de cet essai précède la correction du rapprochement hors JLPT : le générateur corrigé en trouve **9**, V2-84 comprise (§6.1), égales au recalcul indépendant (`docs/rapports/etape2-A2-05-correction-hj-proposition.md`, qui garde la trace du défaut et de sa résolution).",
    "**レジ袋 (`v_718`, hors JLPT, source canonique `hj_v_1`) : aucune décision de journal.** L'ENTRY est validée au lot 05 avec une liste de décisions vide (`journal: []`) ; le §5 l'affiche « aucune ». C'est l'état des données, constaté sans jugement : l'examen ne disposera d'aucune raison journalisée pour ses champs, et ne pourra s'appuyer que sur la fiche source et l'état publié.",
    "**Corrections retenues** (§6.1) : elles sont citées pour lecture ; elles ne sont **ni rouvertes, ni appliquées, ni étendues** ; aucune correction nouvelle n'est proposée par ce périmètre.",
    "**Frontières avec les chantiers fermés** : QC-1 (photographie ordinaire : 撮る, 写真, フィルム) et QC-2 (éclairage d'un lieu : 暗い et 明るい, sens 1) restent fermées, et aucun de leurs mots n'est un sens de T1 ; HP-1 à HP-4 (ひらがな, 漢字, 右, 左) restent hors périmètre (contrôle du §7) ; le bloc F et E5 restent suspendus (contrôle du §7) ; G1 à G7 (volet 3) ne sont pas ouverts ; le balayage global des relations n'est pas ouvert, et les relations publiées des sens de T1 (§6.1, si elles existent) ne sont pas rouvertes.",
    "**Comparables** (§4) : listés pour lecture, ils ne sont pas arbitrés par ce périmètre ; un comparable d'une autre livraison, arbitrée ou non, n'est ni rouvert ni examiné ; aucun verdict ne se fonde sur une analogie de traduction ou de famille.",
  ],
});
console.log(JSON.stringify(res));
