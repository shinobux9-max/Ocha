// A2-05 · volet 1 · lot 2 (provenance) · tranche 8, livraison 8f (lot 24, degré, rang et approximation : 5 nuances), en proposition.
// Dernière livraison du contrôle de provenance. Lecture seule sur les données. Usage : node audit-v1-lot2-t8-8f.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t8-8f.md
import { produire } from './provenance-commun.mjs';

const MOTS = ['結構', '一番', '大体'];
const QUANTITE = ['多い', '少ない', '大勢', 'たくさん', '全部', '少し'];
// Même cas que les cinq exemples de 8e, arbitré le 2026-10-12 : transcription fidèle de la lecture que donnent les furigana de la fiche.
const kana = (kanji, lecture) => `**L'exemple publié est celui de la fiche, mot pour mot, à une différence près : le mot vedette y est écrit en kana (${lecture}), là où la fiche l'écrit ${kanji} avec les furigana ${lecture}.** Sa graphie n'est donc pas identique à celle de l'exemple source ; elle est exactement la lecture de cet exemple, furigana substitués (comparaison par script : identique au point final près). Tous les mots, toutes les particules et toutes les formes de la phrase sont conservés. **C'est une transcription fidèle d'une lecture attestée par la fiche, non une graphie ajoutée depuis une autre fiche** : le cas des cinq exemples de 8e, arbitrés « sourcé »`;

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_471_s1: { v: 'sourcé', o: "Nuance de la fiche : « exprimant qu'une quantité ou un degré est tout à fait satisfaisant, ou utilisé comme formule de politesse pour décliner une offre (« c'est bon, merci ») ». Lecture de la fiche : けっこう. このえいがはけっこうおもしろいです : l'exemple de la fiche est écrit « この えいが は 結[けっ]構[こう] おもしろい です 。 » — « Ce film est assez intéressant. » D1547 : « « une quantité ou un degré tout à fait satisfaisant », que l'exemple illustre (ce film est assez intéressant) ».", m: `Faux positif présumé, rapproché par une autre écriture. « Un degré tout à fait satisfaisant » reprend les mots de la fiche. ${kana('結構', 'けっこう')}.`, r: "Je n'étends pas l'arbitrage de 8e à une règle : je constate que cet exemple présente exactement la même configuration, vérifiée sur la fiche de 結構, et je propose le même verdict. Le sens 1, candidat du volet 1, et les fonctions de l'addendum A9 ne sont pas examinés." },
  v_471: { v: 'sourcé', o: "Nuance de la fiche : « Adverbe (et adjectif en na) exprimant qu'une quantité ou un degré est tout à fait satisfaisant ». な n'est écrit en kana dans aucun texte de la fiche. D1547 : « Classe adverbe mécanique ; « et adjectif en na » dit en nuance. »", m: "La nuance publiée ne contient qu'un élément japonais, **な**, qui transcrit en kana le romaji na de la fiche, où il désigne la marque des adjectifs « en na » ; aucun kanji n'est ajouté (même cas que 同じ, 8c, et たくさん, 8e, arbitrés « sourcé »). « La fiche le dit aussi adjectif en な » cite la fiche, et D1547 dit cette mention conservée en nuance. Unité relevée par le seul caractère な, que le tri notait absent des fiches : il l'est en kana, non en romaji.", r: "Les deux sens, candidats du volet 1, ne sont pas examinés ; la nuance du sens 2 n'est pas au plan." },
  v_517_s1: { v: 'sourcé', o: "Nuance de la fiche : « servant à marquer le superlatif absolu (« le plus... » de tous) ou à désigner la première position ». Lecture de la fiche : いちばん. にほんごのなかでなにがいちばんすきですか : l'exemple de la fiche est écrit « にほんご の なかで なに が 一[いち]番[ばん] すき です か 。 » — « Qu'est-ce que vous aimez le plus en japonais ? » **Les trois anciens exemples de la fiche écrivent le mot en kana, いちばん** (« 春 が いちばん 好き です », « いちばん 大きい 動物 », « いちばん 日本語 が 上手 な 人 »). D1555 cite « いちばんすき ».", m: `Faux positif présumé, rapproché par une autre écriture. « Le superlatif absolu, « le plus… » de tous » reprend les mots de la fiche. ${kana('一番', 'いちばん')}. **Ici, la graphie en kana du mot est en outre écrite par la fiche elle-même**, dans ses trois anciens exemples : la provenance est plus directe encore que pour les exemples de 8e.`, r: "Le sens 1, candidat du volet 1, et les fonctions de l'addendum A9 ne sont pas examinés. La nuance d'ENTRY de 一番 et celle de son sens 2 ne sont pas au plan." },
  v_546_s1: { v: 'sourcé', o: "Nuance de la fiche : « indiquant une approximation ou une règle générale sans entrer dans les détails précis (très proche de taitei, mais s'emploie aussi pour signifier « grosso modo / à peu près ») ». Lecture de la fiche : だいたい. しごとはだいたいおわりました : l'exemple de la fiche est écrit « しごと は 大[だい]体[たい] おわり まし た 。 » — « Le travail est à peu près terminé. » D1564 : « « une approximation », « grosso modo, à peu près », que l'exemple illustre (le travail est à peu près terminé) ».", m: `Faux positif présumé, rapproché par une autre écriture. « Une approximation, grosso modo, sans entrer dans les détails » reprend les mots de la fiche. ${kana('大体', 'だいたい')}.`, r: "La forme verbale publiée, おわりました, est celle de l'exemple, en kana comme dans la fiche : aucune graphie n'est construite (un ancien exemple de la fiche écrit 終わりました ; il n'est pas repris). Le sens 1, candidat du volet 1, n'est pas examiné." },
  v_546: { v: 'sourcé', o: "Nuance de la fiche : « Adverbe (et nom) indiquant une approximation ou une règle générale sans entrer dans les détails précis (très proche de taitei […]) ». Traduction secondaire : « Presque (la plupart du temps) ». たいてい n'est écrit en kana dans aucun texte de la fiche. La fiche de たいてい (`n5_v_519`) a pour mot たいてい, en kana ; c'est la seule fiche de cette lecture. D1564 : « très proche de たいてい (lot 21) […] ; « et nom » dit en nuance ». D1565 : « « presque » […]. Elle est signalée en nuance. »", m: "Faux positif présumé, rapproché par le romaji : **le rapprochement est juste**. **たいてい** transcrit en kana, fidèlement, le romaji taitei de la fiche, pour un mot que sa propre fiche écrit en kana ; aucun kanji n'est ajouté (transcription recevable, lot 01 ; おととし, 7a ; きれい, 8b ; ちょっと, 8e). « Très proche de », « nom » et « presque (la plupart du temps) » reprennent les mots de la fiche ; la nuance publiée dit elle-même que le rapprochement est « selon la fiche », et ici la fiche le dit bien. « Presque » est signalé selon D1565.", r: "Aucune relation ne lie 大体 et たいてい dans l'état publié : rien de structuré n'est en cause. Les deux sens, candidats du volet 1, ne sont pas examinés." }
};

produire({
  root: process.argv[2], code: '8f', lettre: 'AL', script: 'audit-v1-lot2-t8-8f.mjs',
  titre: 'tranche 8, livraison 8f (lot 24 : degré, rang et approximation)',
  sortie: 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t8-8f.md',
  selection: (u) => u.tranche === '8' && u.lotN === '24' && MOTS.includes(u.mot),
  attendu: { n: 5, mots: MOTS },
  F,
  FAM: {},
  prealables: [
    { fichier: 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t8-8e.md', marques: ['**arbitré le 2026-10-12**', 'V2-165 retenue'], message: '8e non arbitrée' },
    { fichier: 'docs/rapports/etape2-A2-05-volet1-lot2-tranche8-perimetre.md', marques: ['**périmètre arbitré le 2026-10-12**', '8f (5)'], message: 'périmètre de la tranche 8 non arbitré' }
  ],
  dernierV2: 165, corrAvant: 180, entreesAvant: 161,
  dejaFaites: (u) => ['6', '7'].includes(u.tranche) || (u.tranche === '8' && (u.lotN !== '24' || QUANTITE.includes(u.mot))),
  faitesAttendu: 125, resteAvant: 5,
  textes: {
    lot: 'lot-24.json',
    statut: "Périmètre de la tranche 8 arbitré le 2026-10-12 (ChatGPT, par délégation), en six livraisons ; 8a à 8e sont arbitrées ; ce rapport porte sur les **5 nuances de la livraison 8f, la dernière du contrôle de provenance**. **La tranche 8 n'est pas déclarée close : elle ne le sera qu'à l'arbitrage de cette livraison.** Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n'est modifié ; aucune correction n'est appliquée ; aucun verdict antérieur n'est rouvert ; aucune décision historique n'est réécrite. **Le texte français des nuances est hors périmètre.** Les classes, les sens, les catégories et les fonctions de l'addendum A9 ne sont pas examinés.",
    montre: [
      "**Les cinq nuances sont proposées « sourcé » ; aucune correction n'est proposée.**",
      "**Trois exemples sont publiés avec le mot vedette en kana** (けっこう, いちばん, だいたい), là où la fiche l'écrit en kanji avec furigana (結構, 一番, 大体). Comparaison par script : dans la graphie de la fiche, les trois diffèrent ; dans la lecture de ses furigana, les trois sont identiques au point final près. **C'est la configuration des cinq exemples de 8e, arbitrée « sourcé » comme transcription fidèle d'une lecture attestée** ; je l'ai vérifiée sur chacune des trois fiches, sans l'étendre en règle.",
      "**Pour 一番, la fiche écrit elle-même le mot en kana** dans ses trois anciens exemples (いちばん) : la graphie publiée y est directement attestée.",
      "**Deux renvois en kana transcrivent un romaji de la fiche, sans kanji** : な (na), dans la nuance d'ENTRY de 結構 ; たいてい (taitei), dans celle de 大体, mot que sa propre fiche écrit en kana.",
      "**Aucune forme n'est construite, aucun mot n'est retiré** : les phrases publiées conservent tous les mots, particules et formes des exemples des fiches.",
      "**Aucune relation ni aucun champ structuré n'est en cause** : aucune ENTRY de 8f ne porte de relation, et aucune relation ne les vise.",
      "**Aucune décision historique n'est en cause** : ce que D1547, D1555, D1564 et D1565 affirment de la fiche a été vérifié sur la fiche, et se vérifie.",
      "**Avec cette livraison, les 278 nuances du plan auront toutes reçu une proposition** ; la clôture de la tranche 8 et le bilan exhaustif attendent l'arbitrage."
    ],
    criteres: "Ceux déjà arbitrés, sans nouvelle exception, et qui ne constituent pas de nouvelles règles normatives : forme du dictionnaire et retrait de mots non essentiels admis si la construction attestée reste intacte, une réduction d'exemple ne retirant pas une information sémantiquement importante (sans objet ici : aucun exemple n'est réduit) ; formes et constructions non sourcées d'office, même grammaticalement plausibles ; renvoi **sourcé** s'il est documenté dans la fiche examinée, **assumé** s'il est explicitement assumé par une décision validée dont le fondement se vérifie, **écart** sinon ; une décision qui assume expressément un élément de nuance se distingue d'une citation incidente ; ni une relation structurée ni un champ structuré validé ne fondent à eux seuls un élément de nuance ; une graphie kanji n'est pas importée d'une autre fiche lorsque la fiche examinée ne nomme le mot qu'en romaji ; une transcription en kana reste fidèle au romaji effectivement attesté ; **un exemple dont le mot vedette est publié en kana, exactement selon les furigana de la même fiche, tous les mots, particules et formes conservés, est une transcription fidèle d'une lecture attestée, sans que les deux graphies soient dites identiques** (arbitrage de 8e, consigné pour ses cinq exemples, sans règle normative générale) ; la provenance se juge fiche par fiche ; classement **sourcé / assumé / écart**. **Aucun sens, aucune lecture, aucune graphie ni aucune construction n'est ajouté par connaissance externe.**",
    corrections: '',
    fiches: '',
    croiseIntro: "Faites par script, en lecture seule, sur `sources/vocab.json` et `sources/exemples.json` (nuance, exemple et anciens exemples de chaque fiche examinée), balises et espaces retirés ; chaque exemple est comparé deux fois, dans la graphie de la fiche (texte de base des furigana) et dans sa lecture (furigana substitués) ; sur `journal.json` et `data/n5/vocab.json` pour les décisions et les relations.",
    croiseEntete: ['Élément publié', 'Résultat'],
    croise: [
      ['このえいがはけっこうおもしろいです', "graphie de la fiche de 結構 : このえいがは結構おもしろいです (différent) ; lecture de ses furigana : identique au point final près"],
      ['な, dans la fiche de 結構', 'en romaji, dans la nuance : « adjectif en na » ; aucune occurrence en kana'],
      ['にほんごのなかでなにがいちばんすきですか', "graphie de la fiche de 一番 : にほんごのなかでなにが一番すきですか (différent) ; lecture de ses furigana : identique au point final près"],
      ['いちばん, dans la fiche de 一番', 'en kana, dans ses trois anciens exemples ; 一番 : son exemple'],
      ['しごとはだいたいおわりました', "graphie de la fiche de 大体 : しごとは大体おわりました (différent) ; lecture de ses furigana : identique au point final près"],
      ['たいてい, dans la fiche de 大体', 'en romaji, dans la nuance (taitei) ; aucune occurrence en kana ni en kanji ; la fiche de たいてい écrit le mot en kana'],
      ['たいてい, comme lecture d\'une fiche', 'une seule fiche : たいてい (`n5_v_519`)'],
      ['Relations publiées portées par une ENTRY de 8f, ou la visant', 'aucune']
    ],
    ligne1: (x) => `oui : ${x.unites.length} nuances distinctes (${x.bloc.filter((u) => u.niveau === 'entree').length} nuances d'ENTRY, ${x.bloc.filter((u) => u.niveau === 'sens').length} nuances de sens), dans ${new Set(x.bloc.map((u) => u.entree)).size} ENTRY du lot 24 ; **avec 8e, le lot 24 est entièrement contrôlé (7 + 5 = 12), et les 44 nuances de la tranche 8 aussi (7 + 7 + 9 + 9 + 7 + 5)**`,
    candidats: (x) => `377, inchangé : ${x.cand.length} sens d'ENTRY de 8f restent candidats (${x.cand.map((s) => `\`${s}\``).join(', ')}) ; **ils ne sont pas examinés ici**`,
    reste: (x) => `aucune nuance du plan ne resterait à lire (tranche 8 : ${x.parTranche['8']}) ; **la clôture de la tranche 8 n'est pas déclarée ici**`
  },
  arbitrage: {
    date: '2026-10-12',
    statut: "**arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l'utilisateur) : **5 sourcés, 0 assumé, 0 écart**, les cinq verdicts confirmés, **aucune correction supplémentaire**. **La tranche 8 est close.** La proposition est conservée telle quelle ci-dessous.",
    section: [
      "**Les cinq unités sont confirmées sourcées** : `v_471_s1` 結構, `v_471` 結構, `v_517_s1` 一番, `v_546_s1` 大体, `v_546` 大体.",
      "**Les trois exemples utilisant けっこう, いちばん et だいたい sont acceptés comme transcriptions fidèles des furigana de leurs fiches respectives**, selon le raisonnement déjà retenu pour 8e. **Ils ne sont pas graphiquement identiques aux exemples sources.** Le constat est individuel et ne crée aucune règle normative générale.",
      "**一番** : la graphie いちばん figure également dans trois anciens exemples de sa propre fiche.",
      "**Les renvois な et たいてい** sont documentés par les indications en romaji de leurs fiches.",
      "**Liste globale unique, inchangée : 180 corrections (10 + 5 + 165), dans 161 ENTRY, toutes non appliquées.** Aucune correction ne naît de 8f.",
      "**Clôture documentaire de la tranche 8 : ses 44 nuances sont toutes arbitrées**, 32 sourcées, 5 assumées, 7 écarts (8a : 5, 0, 2 ; 8b : 2, 3, 2 ; 8c : 9, 0, 0 ; 8d : 5, 2, 2 ; 8e : 6, 0, 1 ; 8f : 5, 0, 0) ; 7 corrections retenues, V2-159 à V2-165, dans 7 ENTRY.",
      "**Les 278 nuances de provenance du plan sont maintenant arbitrées, sous réserve de la vérification exhaustive du bilan** ; il ne reste aucune nuance de provenance à examiner.",
      "**Inchangés** : les 377 candidats C1 à C10, les 147 arbitrages du volet 2 et les décisions historiques. Aucune donnée publiée, fiche source, journal historique, registre, outil ni snapshot n'est modifié.",
      "**Suite** : un bilan documentaire exhaustif des 278 nuances est préparé en proposition ; aucune correction n'est appliquée automatiquement, et aucun nouveau chantier lexical n'est commencé sans accord sur son périmètre."
    ],
    verdict: (id, f) => `**${f.v}**, confirmé${['v_471_s1', 'v_517_s1', 'v_546_s1'].includes(id) ? ' ; l\'exemple, qui n\'est pas graphiquement identique à l\'exemple source, est accepté comme transcription fidèle des furigana de la fiche ; constat individuel, sans règle normative générale' : ''}${id === 'v_517_s1' ? ' ; la graphie いちばん figure aussi dans trois anciens exemples de la fiche' : ''}${['v_471', 'v_546'].includes(id) ? ' ; le renvoi est documenté par l\'indication en romaji de la fiche' : ''}.`,
    ligne: () => "5 sourcés, 0 assumé, 0 écart ; les 5 confirmés ; aucune correction : **180 corrections, dans 161 ENTRY, aucune appliquée** ; **tranche 8 close : 44 nuances, 32 sourcées, 5 assumées, 7 écarts** ; **278 nuances du plan arbitrées**"
  }
});
