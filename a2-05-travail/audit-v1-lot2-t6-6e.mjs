// A2-05 · volet 1 · lot 2 (provenance) · tranche 6, livraison 6e (lot 11, autres interrogatifs et pronoms : 11 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t6-6e.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6e.md
import { produire } from './provenance-commun.mjs';

const MOTS = ['いかが', 'どう', 'なぜ', 'どなた', '誰', '誰か', 'いくつ', 'あなた', '皆', '私', '自分'];

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_390_s1: { v: 'écart', f: 'construit', o: "どう : nuance de la fiche, « équivalent formel de dō どう », en romaji et en kana. いかがですか : exemple de la fiche, « きょう の ちょうし は いかが です か 。 », et anciens exemples « 明日 の 天気 は 如何 ですか », « この 料理 の 味 は 如何 ですか ». お茶はいかがですか : aucune ; la fiche dit que le mot sert à « demander l'état, l'avis ou la manière de faire de quelqu'un », non à proposer ; 茶 n'est dans aucun de ses textes ; お茶はいかが n'est écrit nulle part dans les sources figées.", m: "**« Forme polie de どう » est sourcé** : la fiche écrit どう et dit que いかが en est l'équivalent formel. **いかがですか est sourcé** : c'est le prédicat de l'exemple et des anciens exemples, privé de son thème, la construction いかが + ですか restant intacte (6a, troisième précision). **お茶はいかがですか est construit**, et l'emploi qu'il illustre (« pour proposer ») n'est pas documenté par la fiche (critère 1).", k: "`nuance` (sens 1) : « Forme polie de どう : いかがですか, comment allez-vous ?, qu'en pensez-vous ? », sans la phrase sur la proposition ni お茶はいかがですか." },
  v_393_s1: { v: 'écart', f: 'renvoi', o: "どうですか : exemple de la fiche, « この りょうり は どう です か 。 », et anciens exemples « 明日 の 天気 は どう ですか », « この 料理 の 味 は どう ですか ». いかが : **absent de la fiche de どう** (ni en kana, ni en romaji), de ses anciens exemples et de ses décisions (D0705 à D0707). C'est la fiche d'いかが qui écrit le lien, dans l'autre sens.", m: "**どうですか est sourcé** : prédicat des exemples, privé de son thème (6a, troisième précision). **Le renvoi à いかが n'a pas d'appui** dans la fiche examinée ni dans une décision ; l'attestation réciproque ne suffit pas (critère 2). Même asymétrie documentaire qu'en 6c et en 6d : いかが renvoie à どう (sourcé), どう ne renvoie pas à いかが.", k: "`nuance` (sens 1) : « La manière, l'état, l'avis : どうですか, comment est-ce ?, qu'en pensez-vous ? », sans le renvoi à いかが." },
  v_397_s1: { v: 'sourcé', o: "Nuance de la fiche : « Pronom interrogatif honorifique / poli (équivalent respectueux de dare 誰[だれ]) ».", m: "La fiche écrit 誰, en kanji avec sa lecture, et dit que どなた en est l'équivalent respectueux (critère 2, par la fiche examinée ; graphie attestée). Unité relevée par le seul caractère 誰 : c'est ici le mot que la fiche écrit." },
  v_400_s1: { v: 'sourcé', o: "Nuance de la fiche : « d'un usage un peu plus formel ou littéraire que doushite ».", m: "Faux positif présumé, rapproché par le romaji : **le rapprochement est juste**. どうして transcrit en kana le romaji doushite de la fiche, pour un mot qui s'écrit en kana ; la comparaison de registre est celle de la fiche (transcription recevable, lot 01)." },
  v_402_s1: { v: 'sourcé', o: "Nuance de la fiche : « équivalent standard et courant de donata ».", m: "Faux positif présumé, rapproché par le romaji : **le rapprochement est juste**. どなた transcrit en kana le romaji donata de la fiche, pour un mot qui s'écrit en kana ; la fiche pose elle-même l'équivalence (critère 2, par la fiche examinée). Le couple est ici attesté des deux côtés : la fiche de どなた écrit 誰, celle de 誰 nomme donata." },
  v_581_s1: { v: 'sourcé', o: "Nuance de la fiche : « on lui préfère généralement le nom de la personne suivi d'un suffixe comme san » ; « très courant de la part d'un conjoint pour s'adresser à son partenaire ».", m: "Faux positif présumé, rapproché par le romaji : **le rapprochement est juste pour le suffixe**. さん transcrit en kana le romaji san de la fiche, qui le nomme comme suffixe (transcription recevable, lot 01). Le rapprochement mécanique du tri avec 三 (さん) est un homophone sans rapport avec la nuance. Le reste est français et suit la fiche." },
  v_585_s1: { v: 'écart', f: 'construit', o: "〜つ : la nuance de la fiche dit « avec le compteur par défaut » ; un ancien exemple l'écrit : « 「この りんご は いくつ で すか」「3 つ で 300 円 です」 ». おいくつですか : aucune ; la fiche dit que le mot sert aussi à « demander l'âge de quelqu'un (particulièrement d'un enfant) », sans exemple de cette forme ; おいくつ n'est écrit nulle part dans les sources figées.", m: "**Le compteur 〜つ est sourcé** : la fiche le décrit et son ancien exemple l'écrit. **おいくつですか est construit**, avec un préfixe honorifique que la fiche ne donne pas (critères 1 et 3). L'emploi pour l'âge est attesté par la nuance : l'information française est conservée.", k: "`nuance` (sens 1) : « Pour un nombre d'objets, avec le compteur général 〜つ ; aussi pour demander l'âge. », sans おいくつですか." },
  v_606_s1: { v: 'écart', f: 'graphie', o: "みんな : nuance de la fiche, « S'écrit très fréquemment en hiragana (みんな) ». 皆さん : **la fiche de 皆 n'écrit pas cette graphie** ; un de ses anciens exemples a le mot en kana, dans une adresse à un groupe : « 「みなさん、こんにちは」 ». La graphie 皆さん est celle de la fiche de 皆さん (`n5_v_687`). D0732 (décision de `category`) cite 皆さん comme comparable, sans rien dire du renvoi.", m: "Faux positif présumé, rapproché par la lecture : **le défaut du tri se vérifie en partie**. Le mot みなさん est bien dans la fiche, employé pour s'adresser à un groupe ; **sa graphie en kanji ne l'est pas** : une graphie n'est sourcée que si la fiche l'atteste pour le mot (下 et つくえ, V2-114 ; 脱ぐ et くつ, V2-79). Écart de graphie seulement : insuffisance de provenance, non erreur.", k: "`nuance` (sens 1) : « Souvent écrit みんな. Plus respectueux, pour s'adresser à un groupe : みなさん. », la graphie de l'ancien exemple de la fiche.", r: "La correction retenue au volet 2 pour ce sens (n° 4 : `category`) porte sur un autre champ ; elle n'est ni rouverte ni touchée. « Plus respectueux » est du texte français, hors périmètre ; la fiche de 皆 ne le dit pas, celle de 皆さん le dit." },
  v_688_s1: { v: 'écart', f: 'construit', o: "わたくし : absent de la fiche, de ses anciens exemples, de ses décisions, et **de toutes les sources figées**. 私の本 : aucune ; l'emploi avec の est dans un ancien exemple de la fiche, avec un autre nom : « 私 の 名前 は アンナ です » ; 本 n'est dans aucun de ses textes. D0726 : « Emploi avec の, repris dans la nuance. »", m: "**わたくし est un mot ajouté** : ni la fiche ni aucune source ne le donne. **私の本 change le complément** de la construction attestée (名前 → 本), ce qui n'est pas une normalisation (5a) ; la fiche ne décrit pas la construction avec の comme telle, la précision de 5b et de 6a ne s'applique donc pas. « Neutre et poli, pour tous » suit la fiche.", k: "`nuance` (sens 1) : « Neutre et poli, pour tous. Possessif : 私の名前, mon nom. », la forme de l'ancien exemple, sans わたくし." },
  v_691_s1: { v: 'écart', f: 'construit', o: "自分でやります : aucune sous cette forme. La fiche a 自分で avec d'autres verbes ou d'autres formes : « 自分 で りょうり を し ます » (exemple), « 自分 の こと は 自分 で やって ください », « 自分 の 力 で 全部 やりました », « 自分 で よく 考えます » (anciens exemples). 自分でやります n'est écrit nulle part dans les sources.", m: "La construction 自分で + やる est attestée par l'ancien exemple « 自分 で やって ください ». **La forme publiée, やります, n'est écrite par aucun texte de la fiche** : une forme conjuguée n'est pas sourcée d'office (critère 3 ; いい et よくない, V2-31 ; 知る et 知っていない, lot 06). La forme du dictionnaire, elle, est admise (critère 1).", k: "`nuance` (sens 1) : « Sa propre personne ; s'emploie aussi pour « moi, je » : 自分でやる, le faire soi-même. », la forme du dictionnaire de l'ancien exemple.", r: "**Cas à confirmer.** L'écart ne tient qu'à la forme conjuguée : やります est la forme polie régulière d'un verbe que la fiche emploie avec 自分で. Si l'arbitrage la tient pour une flexion régulière vérifiable, l'unité est sourcée et aucune correction n'est nécessaire. Le verdict du volet 2 sur ce sens (`categorie-nulle`) n'est pas rouvert." },
  v_700_s1: { v: 'sourcé', o: "Nuance de la fiche : « composé du pronom interrogatif dare (qui) et de la particule interrogative/indéfinie ka » ; le mot de la fiche est 誰か, lu だれか. 誰かいますか : ancien exemple « 教室 の 中 に 誰か います か ».", m: "誰 et か sont les deux éléments du mot tel que la fiche l'écrit, et qu'elle nomme en romaji (dare, ka). 誰かいますか est la suite de l'ancien exemple, privée de son complément de lieu (critère 1 ; 6a, troisième précision). Unité relevée par les seuls caractères 誰 et か." }
};

produire({
  root: process.argv[2], code: '6e', lettre: 'AA', script: 'audit-v1-lot2-t6-6e.mjs',
  titre: 'tranche 6, livraison 6e (lot 11, autres interrogatifs et pronoms)',
  sortie: 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6e.md',
  selection: (u) => u.tranche === '6' && u.lotN === '11' && MOTS.includes(u.mot),
  attendu: { n: 11, mots: MOTS },
  F,
  FAM: { construit: 'Exemple construit, mot ajouté, ou construction attestée dont un élément est changé (critère 1)', renvoi: 'Renvoi sans appui dans la fiche ni dans une décision (critère 2)', graphie: 'Graphie non attestée par la fiche pour le mot' },
  prealables: [
    { fichier: 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6d.md', marques: ['**arbitré le 2026-10-12**', 'V2-133 à V2-138 retenues'], message: '6d non arbitrée' },
    { fichier: 'docs/rapports/etape2-A2-05-volet1-lot2-tranche6-perimetre.md', marques: ['**périmètre arbitré le 2026-10-12**', '6e (11)'], message: 'périmètre de la tranche 6 non arbitré' }
  ],
  dernierV2: 138, corrAvant: 153, entreesAvant: 135,
  dejaFaites: (u) => u.tranche === '6' && (u.lotN === '10' || (u.lotN === '11' && !MOTS.includes(u.mot))),
  faitesAttendu: 36, resteAvant: 94,
  textes: {
    lot: 'lot-11.json',
    statut: "Périmètre de la tranche 6 arbitré le 2026-10-12 (ChatGPT, par délégation), en cinq livraisons ; 6a, 6b, 6c et 6d sont arbitrées ; ce rapport porte sur les **11 nuances de la livraison 6e**, la dernière de la tranche. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n'est modifié ; aucune correction n'est appliquée ; aucun verdict antérieur n'est rouvert. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.",
    montre: [
      "**Les renvois que la fiche écrit elle-même sont sourcés** : いかが vers どう, どなた vers 誰 (en kanji), 誰 vers donata, なぜ vers doushite, あなた vers le suffixe san. Les trois derniers sont en romaji dans la fiche : leur transcription en kana est recevable, les mots s'écrivant en kana. Quatre des cinq faux positifs présumés de la tranche sont ici confirmés justes.",
      "**Le seul renvoi sans appui est celui de どう vers いかが** : la fiche de どう ne nomme pas sa forme polie. Même asymétrie documentaire qu'en 6c et en 6d ; pour 誰 et どなた, au contraire, le lien est attesté des deux côtés.",
      "**Trois formules de politesse ou de registre sont ajoutées** : お茶はいかがですか, おいくつですか, わたくし. Aucune n'est écrite dans les sources figées.",
      "**Deux exemples changent un élément d'une construction attestée** : 私の本 (pour 私の名前), 自分でやります (forme polie, là où la fiche a やって ください et やりました).",
      "**皆さん est un écart de graphie** : la fiche de 皆 a le mot en kana, みなさん, dans un ancien exemple.",
      "**Aucune décision historique n'est en cause** : D0726 (私) et D0732 (皆) nomment un emploi ou un comparable sans fonder l'élément publié ; elles ne sont pas réécrites."
    ],
    criteres: "Ceux des livraisons précédentes, sans changement : forme du dictionnaire et retrait de mots non essentiels admis si la construction attestée reste intacte, complément, prédicat ou particule changés non admis (5a) ; une construction expressément autorisée par une fiche, combinée à des éléments documentés par cette même fiche, peut être sourcée (5b, 6a) ; une réduction d'exemple peut supprimer un complément sans modifier la construction essentielle (6a) ; renvoi appuyé par la fiche examinée ou par une décision au fondement vérifiable (critère 2), une attestation dans une autre fiche, sans décision, ne suffisant pas, cette asymétrie restant documentaire (6c, 6d) ; formes honorifiques et conjuguées non sourcées d'office (critère 3) ; transcription en kana d'un romaji attesté recevable, sans ajout de kanji (lot 01) ; graphie sourcée seulement si la fiche l'atteste pour le mot ; classement **sourcé / assumé / écart** ; information française attestée préservée dans les corrections.",
    corrections: "**Aucune correction n'ajoute de contenu étranger à la fiche** : chacune retire un élément, ou le remplace par la forme que la fiche écrit.",
    fiches: '',
    croiseIntro: "Faites par script, en lecture seule, sur `sources/vocab.json` et `sources/exemples.json`, furigana et balises retirés.",
    croiseEntete: ['Élément publié', 'Résultat'],
    croise: [
      ['いかが, dans la fiche de どう', "absent (kana et romaji) ; aucune décision de l'ENTRY ne le cite"],
      ["どう, dans la fiche d'いかが", 'en kana et en romaji, dans la nuance : « équivalent formel de dō どう »'],
      ['お茶はいかが ; 茶, dans la fiche d\'いかが', 'aucune occurrence'],
      ['誰, dans la fiche de どなた', 'en kanji, avec sa lecture, dans la nuance'],
      ['どなた, dans la fiche de 誰 ; どうして, dans la fiche de なぜ ; さん, dans la fiche d\'あなた', 'en romaji, dans la nuance de chacune (donata, doushite, san)'],
      ['おいくつ', 'aucune occurrence dans toutes les fiches et tous les anciens exemples'],
      ['〜つ, dans la fiche de いくつ', 'un ancien exemple : « 3 つ で 300 円 です »'],
      ['皆さん', 'la fiche et les anciens exemples de 皆さん seulement ; dans la fiche de 皆 : みなさん, en kana, un ancien exemple'],
      ['わたくし', 'aucune occurrence'],
      ['私の本', 'aucune occurrence ; 私の名前 : un ancien exemple de 私'],
      ['自分でやります ; 自分でやる', 'aucune occurrence ; 自分でやって : un ancien exemple de 自分'],
      ['誰かいます', 'un ancien exemple de 誰か']
    ],
    ligne1: (x) => `oui : ${x.unites.length} nuances distinctes, toutes des nuances de sens, dans ${new Set(x.bloc.map((u) => u.entree)).size} ENTRY du lot 11 ; **avec 6c et 6d, le lot 11 est entièrement contrôlé (10 + 7 + 11 = 28), et la tranche 6 aussi (19 + 28 = 47)**`,
    candidats: (x) => `377, inchangé : ${x.cand.length} sens de 6e restent candidats (${x.cand.map((s) => `\`${s}\``).join(', ')}) ; **leurs fonctions, leurs types et leurs catégories ne sont pas examinés ici**`,
    reste: (x) => `tranche 6, ${x.parTranche['6']} ; tranche 7, ${x.parTranche['7']} ; tranche 8, ${x.parTranche['8']}`
  },
  arbitrage: {
    date: '2026-10-12',
    statut: "**arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l'utilisateur) : **5 sourcés, 0 assumé, 6 écarts**, les onze verdicts confirmés, V2-139 à V2-144 retenues sans modification. **La tranche 6 est close.** La proposition est conservée telle quelle ci-dessous.",
    section: [
      "**Sourcés, confirmés** : どなた, 誰, なぜ, あなた et 誰か, conformément aux justifications des fiches.",
      "**自分 (V2-144) : écart confirmé.** La fiche atteste 自分で avec le verbe やる dans d'autres formes, mais pas 自分でやります ; 自分でやる, forme du dictionnaire admise par les critères antérieurs, est retenue. **La flexion régulière ne suffit pas à rendre automatiquement sourcée une expression nouvelle.**",
      "**皆 (V2-142)** : 皆さん est remplacé par みなさん, graphie attestée dans l'ancien exemple de cette ENTRY. La correction de catégorie du volet 2 (n° 4) est préservée séparément. **À noter, sans rouvrir maintenant l'audit du français** : « plus respectueux » n'est pas explicité par la fiche de 皆.",
      "**いかが (V2-139)** : いかがですか et le rapport avec どう sont conservés ; お茶はいかがですか est retiré, ainsi que l'emploi « pour proposer », non documenté.",
      "**どう (V2-140)** : どうですか est conservé ; le renvoi à いかが est retiré. L'asymétrie est documentaire, non linguistique.",
      "**いくつ (V2-141)** : le compteur 〜つ et l'emploi pour l'âge sont conservés ; おいくつですか est retiré.",
      "**私 (V2-143)** : わたくし est supprimé ; 私の名前, attesté dans la fiche, est repris.",
      "**Liste globale unique : 159 corrections (10 + 5 + 144), dans 140 ENTRY, toutes non appliquées.**",
      "**Clôture documentaire de la tranche 6 : 47 nuances, 12 sourcées, 0 assumée, 35 écarts** (6a : 4, 0, 6 ; 6b : 1, 0, 8 ; 6c : 1, 0, 9 ; 6d : 1, 0, 6 ; 6e : 5, 0, 6) ; lot 10 : 19 nuances, 5 sourcées, 14 écarts ; lot 11 : 28 nuances, 7 sourcées, 21 écarts ; 35 corrections retenues, V2-110 à V2-144, dans 30 ENTRY. **Restent 83 nuances de provenance** : tranche 7, 39 ; tranche 8, 44.",
      "**Inchangés** : les 377 candidats C1 à C10, les 147 arbitrages du volet 2 et les décisions historiques. Aucune donnée publiée, fiche source, journal historique, registre, outil ni snapshot n'est modifié."
    ],
    verdict: (id, f, num) => `**${f.v}**, confirmé${f.k ? ` ; correction V2-${num} retenue, non appliquée` : ''}${id === 'v_691_s1' ? ' ; la flexion régulière n\'est pas admise comme source' : ''}.`,
    ligne: (x) => `5 sourcés, 0 assumé, 6 écarts ; les 11 confirmés ; **V2-139 à V2-144 retenues : 159 corrections, dans ${x.entreesApres} ENTRY, aucune appliquée** ; **tranche 6 close : 47 nuances, 12 sourcées, 0 assumée, 35 écarts**`
  }
});
