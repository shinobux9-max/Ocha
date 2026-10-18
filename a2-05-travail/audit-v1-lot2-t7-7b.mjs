// A2-05 · volet 1 · lot 2 (provenance) · tranche 7, livraison 7b (lot 15, couleurs : 9 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t7-7b.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t7-7b.md
import { produire } from './provenance-commun.mjs';

const MOTS = ['色', '白', '白い', '赤い', '黄色', '黒', '黒い', '緑', '茶色'];

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_475: { v: 'assumé', o: "茶色, 黄色 : **absents de la fiche de 色**, de son exemple et de ses anciens exemples. Nuance de la fiche : « désignant la couleur en général, ou utilisé en suffixe/composé pour qualifier les différentes teintes », sans exemple de composé. D1026 (décision, `suffix`) : « Les composés présents dans les sources, 茶色 et 黄色, sont des entrées à part entière. L'emploi en composé est décrit en nuance. » Les fiches de 茶色 (`n5_v_693`) et de 黄色 (`n5_v_490`) existent ; leurs nuances disent ces mots composés avec « couleur » (« composé des kanjis signifiant « thé » et « couleur » » ; « composé de ki (jaune/or) et iro (couleur) »).", m: "« S'emploie aussi en composé pour nommer une teinte » suit la nuance de la fiche. **Les deux composés cités ne sont pas dans la fiche examinée, mais une décision validée les assume, et son fondement se vérifie** : D1026 nomme 茶色 et 黄色 comme les composés présents dans les sources et dit expressément que l'emploi en composé est décrit en nuance ; les deux fiches existent et décrivent chacune le mot comme un composé de 色. Critère 2, par la décision. À la différence de D0808 (晩, 7a), la décision porte ici sur la nuance elle-même.", r: "D1026 est une décision sur le champ `suffix` ; elle dit que l'emploi en composé est décrit en nuance et nomme les deux composés, sans dire mot pour mot qu'ils y sont cités. Si l'arbitrage juge cela insuffisant, l'unité est un écart, et la correction serait : « S'emploie aussi en composé pour nommer une teinte. »" },
  v_466: { v: 'sourcé', o: "Nuance de la fiche : « désignant la couleur blanche en tant que substantif (par opposition à kuro, le noir) ». 黒, en kanji avec sa lecture : ancien exemple de la fiche, « 黒[くろ] と 白[しろ] の 写真 です » — « C'est une photo en noir et blanc. »", m: "La fiche pose elle-même l'opposition au noir, qu'elle nomme en romaji (kuro), et son ancien exemple écrit 黒 avec la lecture くろ, à côté de 白 : **la graphie est attestée par la fiche examinée** (même cas que 昼 et 夜, 7a). Unité relevée par le seul caractère 黒." },
  v_467: { v: 'sourcé', o: "Nuance de la fiche : « forme adjectivale dérivée du nom shiro ». Le mot de la fiche est 白い, écrit 白[しろ]い : le kanji 白 y porte la lecture しろ.", m: "La fiche dit que l'adjectif dérive du nom shiro, et elle écrit ce radical 白, lu しろ, dans le mot lui-même : 白 est un élément du mot tel que la fiche l'écrit, et qu'elle nomme en romaji (même cas que 誰か, 6e : 誰 et か). Aucun kanji étranger à la fiche n'est ajouté. « Adjectif correspondant au nom » suit la fiche. Unité relevée par le seul caractère 白.", r: "Le renvoi est vérifié dans ce seul sens, sur la fiche de 白い ; la nuance publiée de 白 ne renvoie pas à 白い, et rien n'est déduit par symétrie." },
  v_480: { v: 'sourcé', o: "Nuance de la fiche : « forme adjectivale dérivée du nom aka ». Le mot de la fiche est 赤い, écrit 赤[あか]い : le kanji 赤 y porte la lecture あか.", m: "La fiche dit que l'adjectif dérive du nom aka, et elle écrit ce radical 赤, lu あか, dans le mot lui-même : 赤 est un élément du mot tel que la fiche l'écrit, et qu'elle nomme en romaji (même cas que 誰か, 6e). Aucun kanji étranger à la fiche n'est ajouté. Unité relevée par le seul caractère 赤.", r: "L'ENTRY 赤 (`v_479`) n'a aucune nuance publiée : il n'y a pas de renvoi réciproque à contrôler." },
  v_490: { v: 'sourcé', o: "Nuance de la fiche : « composé de ki (jaune/or) et iro (couleur) ». Le mot de la fiche est 黄色, écrit 黄[き]色[いろ] : chaque kanji y porte sa lecture.", m: "La fiche décompose elle-même le mot en ses deux éléments, qu'elle nomme en romaji avec leur sens, et elle écrit 黄, lu き, et 色, lu いろ, dans le mot : les deux kanji et leurs gloses viennent de la fiche (même cas que 誰か, 6e). Unité relevée par les seuls caractères 黄 et 色." },
  v_492: { v: 'sourcé', o: "Nuance de la fiche : « désignant la couleur noire en tant que substantif (par opposition à shiro, le blanc) ». 白, en kanji avec sa lecture : ancien exemple de la fiche, « 白[しろ] と 黒[くろ] の 猫 が います » — « Il y a un chat blanc et noir. »", m: "La fiche pose elle-même l'opposition au blanc, qu'elle nomme en romaji (shiro), et son ancien exemple écrit 白 avec la lecture しろ, à côté de 黒 : **la graphie est attestée par la fiche examinée**. Le couple 白 / 黒 est ici attesté des deux côtés, chacun vérifié sur sa propre fiche. Unité relevée par le seul caractère 白." },
  v_493: { v: 'sourcé', o: "Nuance de la fiche : « forme adjectivale dérivée du nom kuro ». Le mot de la fiche est 黒い, écrit 黒[くろ]い : le kanji 黒 y porte la lecture くろ.", m: "La fiche dit que l'adjectif dérive du nom kuro, et elle écrit ce radical 黒, lu くろ, dans le mot lui-même : 黒 est un élément du mot tel que la fiche l'écrit, et qu'elle nomme en romaji (même cas que 誰か, 6e). Aucun kanji étranger à la fiche n'est ajouté. Unité relevée par le seul caractère 黒.", r: "Le renvoi est vérifié dans ce seul sens, sur la fiche de 黒い ; la nuance publiée de 黒 ne renvoie pas à 黒い." },
  v_473: { v: 'écart', f: 'graphie', o: "の : nuance de la fiche, « souvent associé à la particule no pour devenir un adjectif qualificatif, ex. midori no iro » ; ancien exemple « 庭 に 緑 の 木 が あります » — « Il y a des arbres verts dans le jardin. » 緑の色 : la fiche donne cet exemple **en romaji seulement** (midori no iro) ; **le kanji 色 n'est écrit dans aucun texte de la fiche de 緑**, et 緑の色 n'est écrit dans aucune source figée. Aucune décision de l'ENTRY (D1041, D1042) ne le cite.", m: "Faux positif présumé, rapproché par le romaji : **le défaut du tri se vérifie en partie**. « Souvent suivi de の pour qualifier un nom » est sourcé : la fiche le dit, et la particule s'écrit en kana. L'exemple est bien celui de la fiche, midori no iro ; **mais la transcription d'un romaji ne permet pas d'ajouter un kanji** (lot 01), et une graphie n'est sourcée que si la fiche l'atteste (午前, V2-145 ; 昼, V2-147) : 緑 est le mot de la fiche, の une particule, 色 un kanji qu'elle n'écrit pas. Écart de graphie seulement : insuffisance de provenance, non erreur.", k: "`nuance` (ENTRY) : « Souvent suivi de の pour qualifier un nom : 緑の木, des arbres verts. », la suite de l'ancien exemple de la fiche et sa traduction.", r: "**Cas à confirmer.** Deux corrections sont possibles sans rien ajouter à la fiche : reprendre l'ancien exemple qu'elle écrit en japonais, 緑の木 (proposé) ; ou transcrire son exemple en kana, sans kanji : « … : 緑のいろ. » La seconde garde l'exemple de la fiche, mais écrit en kana un mot que sa propre fiche écrit 色. Si l'arbitrage tient 色 pour la graphie évidente de iro, l'unité est sourcée et aucune correction n'est nécessaire. Le sens 2 de 緑, candidat du volet 1, n'est pas examiné ici." },
  v_693: { v: 'sourcé', o: "Nuance de la fiche : « Nom / adjectif en -no composé des kanjis signifiant « thé » et « couleur », désignant la couleur marron ou brune (littéralement « couleur de thé ») ». の devant un nom : ancien exemple « 茶色 の ジャケット を 着て ». D1043 : « Glose littérale du composé (茶, thé ; 色, couleur), et non une traduction : reprise en nuance. »", m: "Le seul élément japonais de la nuance publiée est la particule の : la fiche décrit le mot comme un « adjectif en -no », et son ancien exemple l'emploie avec の devant un nom. « Littéralement « couleur de thé » » est la glose de la fiche, que D1043 dit reprise en nuance. Unité relevée par le seul caractère の." }
};

produire({
  root: process.argv[2], code: '7b', lettre: 'AC', script: 'audit-v1-lot2-t7-7b.mjs',
  titre: 'tranche 7, livraison 7b (lot 15, couleurs)',
  sortie: 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t7-7b.md',
  selection: (u) => u.tranche === '7' && u.lotN === '15' && MOTS.includes(u.mot),
  attendu: { n: 9, mots: MOTS },
  F,
  FAM: { graphie: 'Graphie non attestée par la fiche' },
  prealables: [
    { fichier: 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t7-7a.md', marques: ['**arbitré le 2026-10-12**', 'V2-145 à V2-147 retenues'], message: '7a non arbitrée' },
    { fichier: 'docs/rapports/etape2-A2-05-volet1-lot2-tranche7-perimetre.md', marques: ['**périmètre arbitré le 2026-10-12**', '7b (9)'], message: 'périmètre de la tranche 7 non arbitré' }
  ],
  dernierV2: 147, corrAvant: 162, entreesAvant: 143,
  dejaFaites: (u) => u.tranche === '6' || (u.tranche === '7' && u.lotN === '12'),
  faitesAttendu: 56, resteAvant: 74,
  textes: {
    lot: 'lot-15.json',
    statut: "Périmètre de la tranche 7 arbitré le 2026-10-12 (ChatGPT, par délégation), en cinq livraisons ; 7a est arbitrée ; ce rapport porte sur les **9 nuances de la livraison 7b**. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n'est modifié ; aucune correction n'est appliquée ; aucun verdict antérieur n'est rouvert. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie. Les classes, les types et les catégories des mots de couleur ne sont pas examinés.",
    montre: [
      "**Sept nuances sont sourcées par la fiche examinée.** Les trois adjectifs (白い, 赤い, 黒い) renvoient au nom dont leur fiche dit qu'ils dérivent, et dont le kanji est le radical du mot que la fiche écrit ; 黄色 est décomposé par sa fiche en ses deux éléments ; 茶色 est décrit par sa fiche comme un « adjectif en -no ».",
      "**Le couple 白 / 黒 est attesté des deux côtés, chacun sur sa propre fiche** : chaque fiche pose l'opposition dans sa nuance, en romaji, et écrit l'autre mot en kanji dans un ancien exemple. Aucune symétrie n'a été présumée.",
      "**Les renvois d'un adjectif à son nom ne sont vérifiés que dans ce sens** : les nuances publiées de 白 et de 黒 ne renvoient pas à leur adjectif, et 赤 n'a aucune nuance.",
      "**Un renvoi n'a d'appui que dans une décision** : 色 cite 茶色 et 黄色, que sa fiche n'écrit pas ; D1026 les nomme et dit que l'emploi en composé est décrit en nuance. Proposé « assumé ».",
      "**Un écart de graphie** : 緑の色 transcrit l'exemple en romaji de la fiche (midori no iro) en y ajoutant le kanji 色, que la fiche de 緑 n'écrit nulle part. Le faux positif présumé de la livraison recouvrait cet écart.",
      "**Aucune décision historique n'est en cause** : D1026 et D1043 sont citées telles quelles ; aucune n'est réécrite."
    ],
    criteres: "Ceux des livraisons précédentes, sans changement : forme du dictionnaire et retrait de mots non essentiels admis si la construction attestée reste intacte, complément, prédicat ou particule changés non admis (5a) ; une réduction d'exemple peut supprimer un complément sans modifier la construction essentielle (6a) ; renvoi **sourcé** s'il est documenté dans la fiche examinée, **assumé** s'il est explicitement assumé par une décision validée dont le fondement se vérifie, **écart** sinon, une attestation dans une autre fiche, sans décision, ne suffisant pas (critère 2 ; 6c, 6d ; arbitrage du 2026-10-12 : une relation structurée ou une citation incidente n'y suffit pas ; aucune ENTRY de 7b ne porte de relation) ; les éléments d'un mot tel que la fiche l'écrit, et qu'elle nomme, sont sourcés (誰か, 6e) ; transcription en kana d'un romaji attesté recevable, sans ajout de kanji (lot 01) ; graphie sourcée seulement si la fiche l'atteste ; la provenance se juge fiche par fiche, **sans symétrie présumée entre un nom de couleur et son adjectif, ni entre deux contraires** ; classement **sourcé / assumé / écart** ; information française attestée préservée dans les corrections. **Aucun sens, aucune lecture, aucune graphie ni aucune construction n'est ajouté par connaissance externe.**",
    corrections: "**La correction n'ajoute aucun contenu étranger à la fiche** : elle remplace l'exemple par la forme que la fiche écrit.",
    fiches: '',
    croiseIntro: "Faites par script, en lecture seule, sur `sources/vocab.json`, `sources/vocab-hors-jlpt.json` et `sources/exemples.json` (4 321 textes : mots, nuances, exemples, anciens exemples), furigana, balises et espaces retirés.",
    croiseEntete: ['Élément publié', 'Résultat'],
    croise: [
      ['茶色 ; 黄色, dans la fiche de 色', 'aucune occurrence ; D1026 les nomme'],
      ['黒, dans la fiche de 白', 'un ancien exemple : « 黒と白の写真です » ; la nuance le nomme en romaji (kuro)'],
      ['白, dans la fiche de 黒', 'un ancien exemple : « 白と黒の猫がいます » ; la nuance le nomme en romaji (shiro)'],
      ['白, dans la fiche de 白い ; 赤, dans celle de 赤い ; 黒, dans celle de 黒い', 'le radical du mot, avec sa lecture (しろ, あか, くろ) ; la nuance nomme le nom en romaji (shiro, aka, kuro)'],
      ['黄 ; 色, dans la fiche de 黄色', 'les deux kanji du mot, avec leur lecture (き, いろ) ; la nuance les nomme en romaji (ki, iro)'],
      ['緑の色', 'aucune occurrence'],
      ['緑のいろ', 'aucune occurrence'],
      ['色, dans la fiche de 緑', 'aucune occurrence (nuance, exemple, anciens exemples) ; la nuance a iro, en romaji'],
      ['緑の', 'un ancien exemple de 緑 : « 庭に緑の木があります »'],
      ['茶色の', 'un ancien exemple de 茶色 : « 茶色のジャケットを着て… »']
    ],
    ligne1: (x) => `oui : ${x.unites.length} nuances distinctes, toutes des nuances d'ENTRY, dans ${new Set(x.bloc.map((u) => u.entree)).size} ENTRY du lot 15 ; les 13 autres nuances du lot 15 sont celles de 7c (7) et de 7d (6)`,
    candidats: (x) => `377, inchangé : ${x.cand.length} sens d'une ENTRY de 7b reste candidat (${x.cand.map((s) => `\`${s}\``).join(', ')}) ; **il n'est pas examiné ici**`,
    reste: (x) => `tranche 7, ${x.parTranche['7']} (7c : 7 ; 7d : 6 ; 7e : 8) ; tranche 8, ${x.parTranche['8']}`
  },
  arbitrage: {
    date: '2026-10-12',
    statut: "**arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l'utilisateur) : **7 sourcés, 1 assumé, 1 écart**, les neuf verdicts confirmés, V2-148 retenue sans modification. La proposition est conservée telle quelle ci-dessous.",
    section: [
      "**緑 (V2-148) : écart de graphie confirmé.** La fiche écrit midori no iro en romaji, mais n'atteste pas le kanji 色. Est retenue : « Souvent suivi de の pour qualifier un nom : 緑の木, des arbres verts. », qui provient de l'ancien exemple de cette fiche. **La correction de repli 緑のいろ n'est pas employée.**",
      "**色 : « assumé », confirmé.** D1026 cite expressément 茶色 et 黄色, indique leur statut de composés présents dans les sources et précise que l'emploi en composé est décrit en nuance ; le fondement est vérifiable dans les fiches concernées. **Cette décision n'est pas à généraliser à toute mention incidente d'un autre mot.**",
      "**白い, 赤い, 黒い : « sourcé », confirmé.** Chaque fiche décrit la dérivation depuis le nom en romaji et écrit le radical correspondant en kanji dans l'adjectif ; aucune graphie extérieure à la fiche n'est ajoutée.",
      "**白 et 黒 : sourcés, confirmés indépendamment**, chacun à partir de sa propre fiche et de ses anciens exemples.",
      "**黄色 et 茶色 : sourcés, confirmés**, respectivement pour la décomposition du composé et pour l'emploi avec の.",
      "**Liste globale unique : 163 corrections (10 + 5 + 148), dans 144 ENTRY, toutes non appliquées.** **Restent 65 nuances de provenance** : tranche 7, 21 ; tranche 8, 44.",
      "**Rédaction** : les deux maladresses relevées à la livraison (« V2-148 à V2-148 », « les 1 propositions ») sont corrigées dans ce rapport, sur l'accord du relecteur ; les rapports antérieurs générés par le même module (6d, 6e, 7a) ont été régénérés et trouvés identiques octet pour octet ; aucun résultat d'audit n'est changé.",
      "**Inchangés** : les 377 candidats C1 à C10, les 147 arbitrages du volet 2 et les décisions historiques. Aucune donnée publiée, fiche source, journal historique, registre, outil ni snapshot n'est modifié.",
      "**Suite** : l'audit de 7c (lot 15, taille, longueur, hauteur et poids, sept nuances) est autorisé ; les renvois entre adjectifs contraires y sont vérifiés individuellement, sans présumer de leur symétrie ; 7d n'est pas commencée avant l'arbitrage de 7c."
    ],
    verdict: (id, f, num) => `**${f.v}**, confirmé${f.k ? ` ; correction V2-${num} retenue, non appliquée ; la variante 緑のいろ n'est pas employée` : ''}${id === 'v_475' ? ' ; la correction de repli de la réserve n\'est pas employée ; décision non généralisable à toute mention incidente' : ''}.`,
    ligne: (x) => `7 sourcés, 1 assumé, 1 écart ; les 9 confirmés ; **V2-148 retenue : 163 corrections, dans ${x.entreesApres} ENTRY, aucune appliquée**`
  }
});
