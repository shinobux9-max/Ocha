// A2-05 · volet 1 · lot 2 (provenance) · tranche 7, livraison 7d (lot 15, étendue et épaisseur : 6 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t7-7d.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t7-7d.md
import { produire } from './provenance-commun.mjs';

const MOTS = ['広い', '狭い', '太い', '細い', '厚い', '薄い'];

// Les six cas ont la même structure ; chacun est établi sur sa propre fiche (textes cités dans « o »).
const regle = "**la transcription d'un romaji ne permet pas d'ajouter un kanji** (lot 01 ; 緑, V2-148), une graphie n'est sourcée que si la fiche l'atteste, et **aucune exception n'autorise les kanji d'un contraire au seul motif qu'il possède une autre fiche source** (arbitrage de 7c : 大きい, 小さい, 重い, V2-149 à V2-151)";

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_448: { v: 'écart', f: 'graphie', o: "Nuance de la fiche : « qualifiant une grande superficie, une pièce spacieuse ou un espace étendu (antonyme de semai) ». 狭い : la fiche nomme son contraire **en romaji seulement** ; **le kanji 狭 n'est écrit dans aucun texte de la fiche de 広い** (nuance, exemple, anciens exemples), et le mot n'y est pas non plus en kana. Aucune décision de l'ENTRY (D1054, D1055) ne le cite.", m: `Faux positif présumé, rapproché par le romaji : **le défaut du tri se vérifie en partie**. Le renvoi au contraire est celui de la fiche, qui nomme semai ; « une grande superficie, une pièce spacieuse, un espace étendu » suit la fiche. Mais ${regle}. Aucune décision n'assume la graphie (à la différence de 短い, D1053). Écart de graphie seulement : insuffisance de provenance, non erreur.`, k: "`nuance` (ENTRY) : « Une grande superficie, une pièce spacieuse, un espace étendu. Contraire : せまい. », le contraire que la fiche nomme, transcrit en kana." },
  v_463: { v: 'écart', f: 'graphie', o: "Nuance de la fiche : « qualifiant une superficie restreinte, un passage étroit ou une pièce exiguë (antonyme de hiroi) ». 広い : la fiche nomme son contraire **en romaji seulement** ; **le kanji 広 n'est écrit dans aucun texte de la fiche de 狭い**, et le mot n'y est pas non plus en kana. Aucune décision de l'ENTRY (D1056, D1057) ne le cite.", m: `Faux positif présumé, rapproché par le romaji : **le défaut du tri se vérifie en partie**. Vérifié sur la fiche de 狭い, sans rien déduire de celle de 広い : le renvoi au contraire est celui de la fiche, qui nomme hiroi ; « une superficie restreinte, un passage étroit, une pièce exiguë » suit la fiche. Mais ${regle}. Aucune décision n'assume la graphie. Écart de graphie seulement.`, k: "`nuance` (ENTRY) : « Une superficie restreinte, un passage étroit, une pièce exiguë. Contraire : ひろい. », le contraire que la fiche nomme, transcrit en kana." },
  v_443: { v: 'écart', f: 'graphie', o: "Nuance de la fiche : « qualifiant un objet de forme allongée ou cylindrique qui a une forte circonférence (comme un tronc d'arbre, une jambe ou une corde), par opposition à mince (hosoi) ». 細い : la fiche nomme son contraire **en romaji seulement** ; **le kanji 細 n'est écrit dans aucun texte de la fiche de 太い**, et le mot n'y est pas non plus en kana. Aucune décision de l'ENTRY (D1058, D1059) ne le cite.", m: `Faux positif présumé, rapproché par le romaji : **le défaut du tri se vérifie en partie**. Le renvoi au contraire est celui de la fiche, qui nomme hosoi ; le tronc d'arbre, la jambe et la corde sont ceux de sa nuance. Mais ${regle}. Aucune décision n'assume la graphie. Écart de graphie seulement.`, k: "`nuance` (ENTRY) : « Un objet allongé ou cylindrique de forte circonférence : un tronc d'arbre, une jambe, une corde. Contraire : ほそい. », le contraire que la fiche nomme, transcrit en kana." },
  v_469: { v: 'écart', f: 'graphie', o: "Nuance de la fiche : « qualifiant un objet de forme allongée ou un membre qui a une faible circonférence ou épaisseur (antonyme de futoi) ». このみちは細いです : exemple de la fiche, « この みち は 細[ほそ]い です 。 » — « Ce chemin est étroit / fin. » ; D1061 le cite : « l'exemple de la fiche l'atteste pour un chemin (このみちは細いです […]) ». 太い : la fiche nomme son contraire **en romaji seulement** ; **le kanji 太 n'est écrit dans aucun texte de la fiche de 細い**, et le mot n'y est pas non plus en kana. Aucune décision de l'ENTRY (D1060, D1061) ne cite 太い.", m: `Faux positif présumé, rapproché par le romaji : **le défaut du tri se vérifie en partie**. **このみちは細いです est sourcé** : c'est l'exemple de la fiche, entier, dans sa graphie (みち en kana). Vérifié sur la fiche de 細い, sans rien déduire de celle de 太い : le renvoi au contraire est celui de la fiche, qui nomme futoi. Mais ${regle}. Aucune décision n'assume la graphie. Écart de graphie seulement.`, k: "`nuance` (ENTRY) : « Un objet allongé ou un membre de faible circonférence ou épaisseur ; aussi un chemin étroit (このみちは細いです). Contraire : ふとい. », le contraire que la fiche nomme, transcrit en kana ; le reste est inchangé." },
  v_435: { v: 'écart', f: 'graphie', o: "Nuance de la fiche : « qualifiant l'épaisseur d'un objet plat ou volumineux (comme un livre, un manteau ou une planche), par opposition à mince (usui) ». Traduction secondaire : « Chaleureux (pour l'accueil) » ; D1064 : « Signalé en nuance comme traduction de la source non développée ». 薄い : la fiche nomme son contraire **en romaji seulement** ; **le kanji 薄 n'est écrit dans aucun texte de la fiche de 厚い**, et le mot n'y est pas non plus en kana. Aucune décision de l'ENTRY (D1062 à D1064) ne le cite.", m: `Faux positif présumé, rapproché par le romaji : **le défaut du tri se vérifie en partie**. Le renvoi au contraire est celui de la fiche, qui nomme usui ; le livre, le manteau et la planche sont ceux de sa nuance ; « chaleureux (pour l'accueil) » est signalé selon D1064. Mais ${regle}. Aucune décision n'assume la graphie. Écart de graphie seulement.`, k: "`nuance` (ENTRY) : « L'épaisseur d'un objet plat ou volumineux : un livre, un manteau, une planche. Contraire : うすい. La source donne aussi la traduction « chaleureux (pour l'accueil) », sans la développer. », le contraire que la fiche nomme, transcrit en kana ; le reste est inchangé." },
  v_477_s1: { v: 'écart', f: 'graphie', o: "Nuance de la fiche : « qualifiant un objet plat de faible épaisseur (comme une feuille de papier), un liquide dilué, ou une couleur claire et peu intense (antonyme de atsui) ». 厚い : la fiche nomme son contraire **en romaji seulement** ; **le kanji 厚 n'est écrit dans aucun texte de la fiche de 薄い**, et le mot n'y est pas non plus en kana. Aucune décision de l'ENTRY (D1065 à D1067) ne le cite.", m: `Faux positif présumé, rapproché par le romaji : **le défaut du tri se vérifie en partie**. Vérifié sur la fiche de 薄い, sans rien déduire de celle de 厚い : le renvoi au contraire est celui de la fiche, qui nomme atsui ; « un objet plat de faible épaisseur : une feuille de papier » suit la fiche. Mais ${regle}. Aucune décision n'assume la graphie. Écart de graphie seulement.`, k: "`nuance` (sens 1) : « Un objet plat de faible épaisseur : une feuille de papier. Contraire : あつい. », le contraire que la fiche nomme, transcrit en kana.", r: "Deux remarques, sans effet sur le verdict. (1) La fiche place « antonyme de atsui » après l'énumération de ses trois emplois ; la nuance publiée le rattache au sens 1, l'épaisseur : ce rattachement relève de D1065, non rouverte. (2) atsui est aussi le romaji d'autres mots des sources (暑い, 熱い ; voir 寒い et 熱い, V2-26 et V2-27) : la fiche ne dit pas lequel, et la transcription en kana ne tranche pas plus qu'elle. Les sens 2 et 3 de 薄い, candidats du volet 1, ne sont pas examinés ici." }
};

produire({
  root: process.argv[2], code: '7d', lettre: 'AE', script: 'audit-v1-lot2-t7-7d.mjs',
  titre: 'tranche 7, livraison 7d (lot 15, étendue et épaisseur)',
  sortie: 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t7-7d.md',
  selection: (u) => u.tranche === '7' && u.lotN === '15' && MOTS.includes(u.mot),
  attendu: { n: 6, mots: MOTS },
  F,
  FAM: { graphie: 'Graphie non attestée par la fiche' },
  prealables: [
    { fichier: 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t7-7c.md', marques: ['**arbitré le 2026-10-12**', 'V2-152'], message: '7c non arbitrée' },
    { fichier: 'docs/rapports/etape2-A2-05-volet1-lot2-tranche7-perimetre.md', marques: ['**périmètre arbitré le 2026-10-12**', '7d (6)'], message: 'périmètre de la tranche 7 non arbitré' }
  ],
  dernierV2: 152, corrAvant: 167, entreesAvant: 148,
  dejaFaites: (u) => u.tranche === '6' || (u.tranche === '7' && (u.lotN === '12' || (u.lotN === '15' && !MOTS.includes(u.mot)))),
  faitesAttendu: 72, resteAvant: 58,
  textes: {
    lot: 'lot-15.json',
    statut: "Périmètre de la tranche 7 arbitré le 2026-10-12 (ChatGPT, par délégation), en cinq livraisons ; 7a, 7b et 7c sont arbitrées ; ce rapport porte sur les **6 nuances de la livraison 7d**. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n'est modifié ; aucune correction n'est appliquée ; aucun verdict antérieur n'est rouvert. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie. Les sens, les catégories et les sous-catégories absentes d'espace › dimensions ne sont pas examinés.",
    montre: [
      "**Les six nuances sont des écarts de graphie, pour la même raison, établie six fois** : chaque fiche nomme le contraire de son mot **en romaji seulement** (semai, hiroi, hosoi, futoi, usui, atsui) ; le kanji publié (狭, 広, 細, 太, 薄, 厚) n'est écrit dans aucun de ses textes, et aucune décision de l'ENTRY ne cite le mot.",
      "**Les six faux positifs présumés recouvraient donc tous cet écart** : le tri avait reconnu le bon mot par son romaji ; il ne vérifiait pas la graphie.",
      "**Aucune symétrie n'a été présumée, et aucune graphie n'est importée d'une autre fiche** : dans chacun des trois couples (広い / 狭い, 太い / 細い, 厚い / 薄い), aucune des deux fiches n'écrit le kanji de l'autre.",
      "**Tout le reste est sourcé** : les descriptions françaises suivent les nuances des fiches ; このみちは細いです est l'exemple entier de la fiche de 細い ; les traductions non développées sont signalées selon les décisions du lot 15.",
      "**C'est l'application directe de l'arbitrage de 7c** (V2-149 à V2-151) : même cas, même correction, la transcription en kana du contraire que la fiche nomme. Aucun cas nouveau n'est soumis.",
      "**Aucune décision historique n'est en cause** : D1061, D1064 et D1065 sont citées telles quelles ; aucune n'est réécrite."
    ],
    criteres: "Ceux des livraisons précédentes, sans changement : renvoi **sourcé** s'il est documenté dans la fiche examinée, **assumé** s'il est explicitement assumé par une décision validée dont le fondement se vérifie, **écart** sinon, une attestation dans une autre fiche, sans décision, ne suffisant pas (critère 2 ; 6c, 6d) ; ni une relation structurée ni une citation incidente n'y suffisent (arbitrages du 2026-10-12 ; aucune ENTRY de 7d ne porte de relation) ; transcription en kana d'un romaji attesté recevable, **sans ajout de kanji** (lot 01 ; V2-148) ; **aucune exception n'autorise les kanji d'un contraire au seul motif qu'il possède une autre fiche source** (arbitrage de 7c) ; **le retrait d'un mot qui porte une information de l'exemple source n'est pas une simple réduction** (arbitrage de 7c : 低い et あまり, V2-152 ; sans objet ici, le seul exemple publié étant celui de la fiche, entier) ; graphie sourcée seulement si la fiche l'atteste ; la provenance se juge fiche par fiche, **sans symétrie présumée entre deux contraires** ; classement **sourcé / assumé / écart** ; information française attestée préservée dans les corrections. **Aucun sens, aucune lecture, aucune graphie ni aucune construction n'est ajouté par connaissance externe.**",
    corrections: "**Aucune correction n'ajoute de contenu étranger à la fiche** : chacune garde le renvoi que la fiche fait, et l'écrit en kana, sans le kanji qu'elle ne donne pas ; le reste de chaque nuance est inchangé.",
    fiches: '',
    croiseIntro: "Faites par script, en lecture seule, sur `sources/vocab.json` et `sources/exemples.json` (nuance, exemple et anciens exemples de chaque fiche examinée), furigana, balises et espaces retirés ; et sur `journal.json` pour les décisions de chaque ENTRY.",
    croiseEntete: ['Élément publié', 'Résultat'],
    croise: [
      ['狭 ; せま, dans la fiche de 広い', 'aucune occurrence ; la nuance a semai, en romaji ; aucune décision de l\'ENTRY ne cite 狭い'],
      ['広 ; ひろ, dans la fiche de 狭い', 'aucune occurrence ; la nuance a hiroi, en romaji ; aucune décision de l\'ENTRY ne cite 広い'],
      ['細 ; ほそ, dans la fiche de 太い', 'aucune occurrence ; la nuance a hosoi, en romaji ; aucune décision de l\'ENTRY ne cite 細い'],
      ['太 ; ふと, dans la fiche de 細い', 'aucune occurrence ; la nuance a futoi, en romaji ; aucune décision de l\'ENTRY ne cite 太い'],
      ['このみちは細いです', "l'exemple de 細い, entier"],
      ['薄 ; うす, dans la fiche de 厚い', 'aucune occurrence ; la nuance a usui, en romaji ; aucune décision de l\'ENTRY ne cite 薄い'],
      ['厚 ; あつ, dans la fiche de 薄い', 'aucune occurrence ; la nuance a atsui, en romaji ; aucune décision de l\'ENTRY ne cite 厚い']
    ],
    ligne1: (x) => `oui : ${x.unites.length} nuances distinctes (${x.bloc.filter((u) => u.niveau === 'entree').length} nuances d'ENTRY, ${x.bloc.filter((u) => u.niveau === 'sens').length} nuance de sens), dans ${new Set(x.bloc.map((u) => u.entree)).size} ENTRY du lot 15 ; **avec 7b et 7c, le lot 15 est entièrement contrôlé (9 + 7 + 6 = 22)**`,
    candidats: (x) => `377, inchangé : ${x.cand.length} sens de 7d restent candidats (${x.cand.map((s) => `\`${s}\``).join(', ')}) ; **ils ne sont pas examinés ici**`,
    reste: (x) => `tranche 7, ${x.parTranche['7']} (7e : 8) ; tranche 8, ${x.parTranche['8']}`
  },
  arbitrage: {
    date: '2026-10-12',
    statut: "**arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l'utilisateur) : **0 sourcé, 0 assumé, 6 écarts**, les six verdicts confirmés, V2-153 à V2-158 retenues sans modification. **Le lot 15 est entièrement arbitré sur son périmètre de provenance : 22 nuances.** La proposition est conservée telle quelle ci-dessous.",
    section: [
      "**V2-153 — 広い** : 狭い est remplacé par せまい.",
      "**V2-154 — 狭い** : 広い est remplacé par ひろい.",
      "**V2-155 — 太い** : 細い est remplacé par ほそい.",
      "**V2-156 — 細い** : 太い est remplacé par ふとい ; このみちは細いです est conservé.",
      "**V2-157 — 厚い** : 薄い est remplacé par うすい ; la mention de la traduction source « chaleureux (pour l'accueil) » est conservée, conformément à D1064.",
      "**V2-158 — 薄い, sens 1** : 厚い est remplacé par あつい. **Aucune graphie kanji non attestée par cette fiche n'est choisie : la graphie de atsui n'est pas établie par la fiche de 薄い.** Le verdict ne rouvre ni D1065 ni les sens 2 et 3.",
      "**Dans les six cas, le reste de la nuance est conservé intégralement.**",
      "**La transcription en kana est admise parce que les romaji concernés sont explicitement attestés. Aucune exception n'est créée qui permettrait d'importer les kanji d'une autre ENTRY.**",
      "**Liste globale unique : 173 corrections (10 + 5 + 158), dans 154 ENTRY, toutes non appliquées.** **Restent 52 nuances de provenance** : 7e, 8 ; tranche 8, 44.",
      "**Lot 15 entièrement arbitré sur son périmètre de provenance : 22 nuances** (7b : 9 ; 7c : 7 ; 7d : 6) : 9 sourcées, 2 assumées, 11 écarts ; 11 corrections, V2-148 à V2-158, dans 11 ENTRY.",
      "**Inchangés** : les 377 candidats C1 à C10, les 147 arbitrages du volet 2 et les décisions historiques. Aucune donnée publiée, fiche source, journal historique, registre, outil ni snapshot n'est modifié.",
      "**Suite** : l'audit de 7e (lot 18, actions sur les objets, huit nuances) est autorisé ; les renvois des couples 閉める / 閉まる, 消す / 消える et 並べる / 並ぶ y sont examinés avec le texte exact des décisions du lot 26 ; une relation structurée validée ne suffit pas, à elle seule, à rendre « assumé » un renvoi absent de la fiche ; la tranche 8 n'est pas commencée."
    ],
    verdict: (id, f, num) => `**${f.v}**, confirmé ; correction V2-${num} retenue, non appliquée ; le reste de la nuance est conservé intégralement${id === 'v_477_s1' ? ' ; la graphie de atsui n\'est pas établie par la fiche ; D1065 et les sens 2 et 3 ne sont pas rouverts' : ''}.`,
    ligne: (x) => `0 sourcé, 0 assumé, 6 écarts ; les 6 confirmés ; **V2-153 à V2-158 retenues : 173 corrections, dans ${x.entreesApres} ENTRY, aucune appliquée** ; **lot 15 entièrement arbitré : 22 nuances**`
  }
});
