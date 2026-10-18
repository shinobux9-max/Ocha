// A2-05 · volet 1 · lot 2 (provenance) · tranche 6, livraison 6d (lot 11, どちら et le choix : 7 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t6-6d.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6d.md
import { produire } from './provenance-commun.mjs';

const MOTS = ['どちら', 'どっち', 'どの', 'どれ'];
const KOSOA = ['こちら', 'そちら', 'あちら', 'あっち', 'あの', 'こっち', 'こんな', 'そっち'];

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_343_s1: { v: 'sourcé', o: "Nuance de la fiche : « Pronom interrogatif familier de la série Do désignant un choix entre deux directions ou deux éléments (version plus informelle de dono hō ou dochira) ».", m: "Faux positif présumé, rapproché par le romaji : **le rapprochement est juste**. どちら transcrit en kana le romaji dochira de la fiche, pour un mot qui s'écrit en kana ; la fiche dit elle-même que どっち en est la version plus informelle (critère 2, par la fiche examinée ; transcription recevable, lot 01). Même cas qu'あっち, en 6c. Le reste de la nuance est français et suit la fiche (« deux directions ou deux éléments »)." },
  v_396_s1: { v: 'écart', f: 'construit', o: "Exemple de la fiche : « コーヒー と こうちゃ と 、 どちら が すき です か 。 » ; anciens exemples : « リンゴ と バナナ、どちら が 好き ですか », « 右 と 左、どちら に 曲がりますか ». コーヒーと紅茶とどちらがいいですか : aucune. Deux éléments diffèrent de l'exemple : **la graphie 紅茶**, que la fiche n'écrit pas (elle a こうちゃ, en kana ; 紅茶 n'est dans aucun de ses textes), et **le prédicat いい**, là où la fiche a すき (aucun texte de la fiche n'a どちらがいい ; la suite n'est écrite nulle part dans les sources).", m: "La construction A と B と、どちらが… est celle de l'exemple ; **deux de ses éléments sont changés** : une graphie en kanji que la fiche n'atteste pas (critère de graphie ; 紅茶 était déjà un écart au lot 02) et le prédicat (すき → いい), ce qui n'est pas une normalisation (5a).", k: "`nuance` (sens 1) : « Pour choisir entre deux : コーヒーとこうちゃと、どちらがすきですか. », la forme de l'exemple de la fiche." },
  v_396_s2: { v: 'écart', f: 'renvoi', o: "お国はどちらですか : ancien exemple de la fiche, « お国 は どちら ですか。「フランス です」 ». どこ : **absent de la fiche de どちら** (ni en kana, ni en romaji), de ses anciens exemples et de ses décisions (D0681 à D0685) ; la nuance dit « désigner une direction polie », et ne nomme comme formes dont どちら est la forme polie que dore どれ et docchi どっち.", m: "**お国はどちらですか est sourcé** : c'est la suite même d'un ancien exemple de cette fiche (critère 1). Ce n'est pas le cas de 国 (V2-109), où la même question était absente de la fiche de 国 : la provenance se juge fiche par fiche. **« Forme polie de どこ » n'a pas d'appui** dans la fiche examinée ni dans une décision (critère 2).", k: "`nuance` (sens 2) : « Forme polie : お国はどちらですか, d'où venez-vous ? », sans le renvoi à どこ." },
  v_396_s3: { v: 'écart', f: 'construit', o: "どちら様ですか : aucune. La fiche dit que le mot sert à « demander l'origine / l'identité de quelqu'un de façon respectueuse » et donne « Qui (poli) » parmi ses traductions, sans exemple de cet emploi ; どちら様 n'est écrit nulle part dans les sources figées.", m: "Le sens est documenté par la nuance de la fiche (D0684) ; **son illustration est construite**, avec un suffixe honorifique (様) que la fiche ne donne pas (critères 1 et 3).", k: "`nuance` (sens 3) : « Pour demander l'identité de quelqu'un de façon respectueuse. », d'après la fiche, sans exemple japonais." },
  v_396: { v: 'écart', f: 'renvoi', o: "どっち, どれ : nuance de la fiche, « forme polie de dore どれ ou docchi どっち », en romaji et en kana. どこ : absent de la fiche, de ses anciens exemples et de ses décisions.", m: "**どっち et どれ sont sourcés** : la fiche les écrit et dit que どちら en est la forme polie. **どこ ne l'est pas** : aucun texte de la fiche ne le nomme, et aucune décision ne l'assume (critère 2). Le tri avait signalé la seule chaîne どこ.", k: "`nuance` (ENTRY) : « Forme polie ; plus familier : どっち, どれ. », sans どこ." },
  v_398_s1: { v: 'écart', f: 'construit', o: "Exemple de la fiche : « どの ほん が あなた の です か 。 » ; ancien exemple : « どの 本 が あなた の ですか » ; nuance : « se plaçant devant un nom ». どの本ですか : aucune ; la suite n'est écrite nulle part dans les sources.", m: "どの + 本 est attesté, avec cette graphie, par l'ancien exemple. **どの本ですか n'est pas une réduction de cet exemple** : en retirant があなたの, on change le prédicat de la phrase (« quel livre est le vôtre ? » devient « quel livre est-ce ? ») ; ce n'est pas la suppression d'un complément qui laisserait la construction intacte (6a, troisième précision ; そっち sens 2, en 6c).", k: "`nuance` (sens 1) : « Toujours devant un nom : どの本, quel livre ? », la suite de l'ancien exemple, sans ですか.", r: "Si l'arbitrage préfère une phrase entière, l'ancien exemple se cite tel quel : « どの本があなたのですか, quel livre est le vôtre ? »." },
  v_399_s1: { v: 'écart', f: 'renvoi', o: "どちら, どっち : **absents de la fiche de どれ** (ni en kana, ni en romaji), de ses anciens exemples et de ses décisions (D0641, D0642). La nuance de la fiche dit seulement « parmi un groupe de trois objets ou plus ». C'est la fiche de どちら qui nomme どれ, dans l'autre sens.", m: "« Parmi trois éléments ou plus » suit la fiche. **Le renvoi à どちら et à どっち n'a pas d'appui** dans la fiche examinée ni dans une décision ; l'attestation par la fiche de どちら, sans décision, ne suffit pas (critère 2). L'opposition « entre deux » n'est pas dite par la fiche de どれ.", k: "`nuance` (sens 1) : « Parmi trois éléments ou plus. », sans le renvoi à どちら ni à どっち." }
};

produire({
  root: process.argv[2], code: '6d', lettre: 'Z', script: 'audit-v1-lot2-t6-6d.mjs',
  titre: 'tranche 6, livraison 6d (lot 11, どちら et le choix)',
  sortie: 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6d.md',
  selection: (u) => u.tranche === '6' && u.lotN === '11' && MOTS.includes(u.mot),
  attendu: { n: 7, mots: MOTS },
  F,
  FAM: { construit: 'Exemple construit, ou construction attestée dont un élément est changé (critère 1)', renvoi: 'Renvoi sans appui dans la fiche ni dans une décision (critère 2)' },
  prealables: [
    { fichier: 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6c.md', marques: ['**arbitré le 2026-10-12**', 'V2-132 retenue sous sa forme de repli'], message: '6c non arbitrée' },
    { fichier: 'docs/rapports/etape2-A2-05-volet1-lot2-tranche6-perimetre.md', marques: ['**périmètre arbitré le 2026-10-12**', '6d (7)'], message: 'périmètre de la tranche 6 non arbitré' }
  ],
  dernierV2: 132, corrAvant: 147, entreesAvant: 132,
  dejaFaites: (u) => u.tranche === '6' && (u.lotN === '10' || (u.lotN === '11' && KOSOA.includes(u.mot))),
  faitesAttendu: 29, resteAvant: 101,
  textes: {
    lot: 'lot-11.json',
    statut: "Périmètre de la tranche 6 arbitré le 2026-10-12 (ChatGPT, par délégation), en cinq livraisons ; 6a, 6b et 6c sont arbitrées ; ce rapport porte sur les **7 nuances de la livraison 6d** ; 6e ne sera commencée qu'après l'arbitrage de celle-ci. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n'est modifié ; aucune correction n'est appliquée ; aucun verdict antérieur n'est rouvert. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.",
    montre: [
      "**Les renvois suivent, là encore, ce que chaque fiche écrit.** La fiche de どちら nomme どれ et どっち (« forme polie de dore どれ ou docchi どっち ») : ces deux renvois sont sourcés. Elle ne nomme pas どこ : c'est l'écart de la nuance d'ENTRY et du sens 2. La fiche de どっち nomme dochira : sourcé. La fiche de どれ ne nomme ni どちら ni どっち : écart. Comme en 6c, cette asymétrie est documentaire, non une règle linguistique.",
      "**お国はどちらですか est sourcé ici**, alors que la même question était un écart pour 国 (V2-109) : elle est écrite par un ancien exemple de la fiche de どちら, non par celle de 国. La provenance se juge fiche par fiche.",
      "**Deux exemples reprennent celui de la fiche en le modifiant** : コーヒーと紅茶とどちらがいいですか change une graphie (紅茶, pour こうちゃ) et le prédicat (いい, pour すき) ; どの本ですか retire de l'exemple le prédicat lui-même. La correction revient chaque fois à la forme de la fiche.",
      "**どちら様ですか est construit** : la fiche décrit le sens (« demander l'identité de quelqu'un de façon respectueuse ») sans en donner d'exemple, et どちら様 n'est écrit nulle part dans les sources.",
      "**Aucune décision historique n'est en cause** dans cette livraison : aucune décision des quatre ENTRY ne cite どこ, 紅茶 ni どちら様."
    ],
    criteres: "Ceux des livraisons précédentes, sans changement : forme du dictionnaire et retrait de mots non essentiels admis si la construction attestée reste intacte, complément, prédicat ou particule changés non admis (5a) ; une construction expressément autorisée par une fiche, combinée à des éléments documentés par cette même fiche, peut être sourcée (5b, 6a) ; une réduction d'exemple peut supprimer un complément sans modifier la construction essentielle (6a) ; renvoi appuyé par la fiche examinée ou par une décision au fondement vérifiable (critère 2), une attestation dans une autre fiche, sans décision, ne suffisant pas, cette asymétrie restant documentaire (6c) ; forme honorifique non sourcée d'office (critère 3) ; transcription en kana d'un romaji attesté recevable, sans ajout de kanji (lot 01) ; graphie sourcée seulement si la fiche l'atteste pour le mot ; classement **sourcé / assumé / écart** ; information française attestée préservée dans les corrections.",
    corrections: "**Aucune correction n'ajoute de contenu étranger à la fiche** : chacune retire un renvoi, ou remplace l'exemple par la forme que la fiche écrit, ou, à défaut, par le texte français de sa nuance.",
    fiches: "La fiche de どちら est donnée quatre fois, une par unité (trois sens et la nuance d'ENTRY).",
    croiseIntro: "Faites par script, en lecture seule, sur `sources/vocab.json` et `sources/exemples.json`, furigana et balises retirés.",
    croiseEntete: ['Élément publié', 'Résultat'],
    croise: [
      ['どこ, dans la fiche de どちら', "absent (kana et romaji) ; aucune décision de l'ENTRY ne le cite"],
      ['どれ et どっち, dans la fiche de どちら', 'en kana et en romaji, dans la nuance : « forme polie de dore どれ ou docchi どっち »'],
      ['どちら, dans la fiche de どっち', 'en romaji, dans la nuance : « version plus informelle de dono hō ou dochira »'],
      ['どちら et どっち, dans la fiche de どれ', "absents (kana et romaji) ; aucune décision de l'ENTRY ne les cite"],
      ['紅茶, dans la fiche de どちら', "absent ; l'exemple écrit こうちゃ"],
      ['コーヒーと紅茶 ; どちらがいい', 'aucune occurrence dans toutes les fiches et tous les anciens exemples'],
      ['どちらがすき / どちらが好き', "l'exemple de la fiche de どちら (kana) ; anciens exemples de どちら et de 好き (kanji)"],
      ['お国はどちら', 'un ancien exemple de どちら, et lui seul'],
      ['どちら様', 'aucune occurrence'],
      ['どの本ですか', "aucune occurrence ; どの本が : un ancien exemple de どの ; どのほんが : l'exemple de la fiche"]
    ],
    ligne1: (x) => `oui : ${x.unites.length} nuances distinctes, dans ${new Set(x.bloc.map((u) => u.entree)).size} ENTRY du lot 11 (どちら, どっち, どの, どれ) ; ${x.bloc.filter((u) => u.niveau === 'entree').length} nuance d'ENTRY (どちら) et ${x.bloc.filter((u) => u.niveau === 'sens').length} nuances de sens ; 6e (11) n'est pas lue`,
    candidats: (x) => `377, inchangé : les ${x.cand.length} sens de 6d restent tous candidats (unités interrogatives sans type, et sans catégorie pour cinq d'entre elles) ; **leurs fonctions, leurs types et leurs catégories ne sont pas examinés ici**, ni le chantier normatif de \`interrogatif\``,
    reste: (x) => `tranche 6, ${x.parTranche['6']} (6e : 11) ; tranche 7, ${x.parTranche['7']} ; tranche 8, ${x.parTranche['8']}`
  },
  arbitrage: {
    date: '2026-10-12',
    statut: "**arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l'utilisateur) : **1 sourcé, 0 assumé, 6 écarts**, les sept verdicts confirmés, V2-133 à V2-138 retenues sans modification. La proposition est conservée telle quelle ci-dessous.",
    section: [
      "**どっち : sourcé, confirmé.** La fiche atteste dochira comme forme moins familière ; sa transcription en どちら est recevable selon le précédent du lot 01.",
      "**どちら sens 1 (V2-133)** : l'exemple de la fiche est conservé, avec こうちゃ et すき, sans introduire 紅茶 ni いい.",
      "**どちら sens 2 (V2-134)** : le renvoi non sourcé à どこ est retiré ; お国はどちらですか est conservé, attesté par un ancien exemple de cette fiche. **V2-109, pour 国, est maintenue séparément.**",
      "**どちら sens 3 (V2-135)** : l'explication française de l'emploi respectueux est conservée, sans construire どちら様ですか.",
      "**どちら, nuance d'ENTRY (V2-136)** : どっち et どれ, explicitement nommés dans sa fiche, sont conservés ; どこ est retiré.",
      "**どの (V2-137)** : « Toujours devant un nom : どの本, quel livre ? » est retenu, plutôt que l'exemple entier : どの本 est attesté, どの本ですか ne l'est pas. Le repli n'est pas employé.",
      "**どれ (V2-138)** : seul « Parmi trois éléments ou plus. » est conservé ; les renvois à どちら et à どっち ne sont pas sourcés par sa fiche.",
      "**Ces renvois asymétriques relèvent exclusivement de la provenance documentaire ; ils ne constituent pas une nouvelle règle linguistique.**",
      "**Liste globale unique : 153 corrections (10 + 5 + 138), dans 135 ENTRY, toutes non appliquées.** **Restent 94 nuances du plan** : 11 pour 6e, 39 pour la tranche 7, 44 pour la tranche 8.",
      "**Inchangés** : les 377 candidats C1 à C10 et les 147 arbitrages du volet 2. Aucune fiche source ni décision historique n'est modifiée."
    ],
    verdict: (id, f, num) => `**${f.v}**, confirmé${f.k ? ` ; correction V2-${num} retenue, non appliquée` : ''}${id === 'v_398_s1' ? ' ; le repli de la réserve n\'est pas employé' : ''}.`,
    ligne: (x) => `1 sourcé, 0 assumé, 6 écarts ; les 7 confirmés ; **V2-133 à V2-138 retenues : 153 corrections, dans ${x.entreesApres} ENTRY, aucune appliquée**`
  }
});
