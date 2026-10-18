// A2-05 · volet 1 · lot 2 · tranche 1 : provenance des particules et des chaînes japonaises des nuances (34 unités).
// Lecture seule sur les données. Usage : node audit-v1-lot2-t1.mjs <racine>   (écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance.md)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const tri = read('a2-05-travail/provenance/tri.json');
const prov = read('a2-05-travail/provenance/resultat.json');
const vocab = read('data/n5/vocab.json');
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const ex = read('reconstruction/a2-04/sources/exemples.json');
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-\d+\.json$/.test(f)).sort().map((f) => read(`reconstruction/a2-04/lots/${f}`));
const audit = readFileSync(join(root, 'docs/rapports/etape2-A2-05-audit-null.md'), 'utf8');
const st = (s) => String(s ?? '').replace(/<rt>[^<]*<\/rt>/g, '').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }

// v : 'sourcé' | 'écart' ; o : origine exacte recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve ou preuve insuffisante
const F = {
  v_53: { v: 'sourcé', o: 'Exemple de la fiche : « 毎日 駅 まで 歩きます ».', m: 'La chaîne est l\'exemple de la fiche, ramené à la forme du dictionnaire (歩きます → 歩く) et privé de 毎日. Aucun mot nouveau. Critère 1.' },
  v_63: { v: 'sourcé', o: 'Exemple de la fiche : « 次 の 駅 で 電車 を 降ります ».', m: 'Forme du dictionnaire de l\'exemple de la fiche (降ります → 降りる), réduit à 電車を. Aucun mot nouveau. Critère 1.' },
  v_152: { v: 'sourcé', o: 'Nuance de la fiche : le kanji « se lit \'ku\' à la forme d\'origine, \'ki\' à la forme polie, et \'ko\' à la forme négative ».', m: 'La nuance publiée illustre les trois lectures que la fiche énumère ; 来る et 来ます sont dans la fiche, et 来ない est la forme négative qu\'elle nomme. Flexion grammaticale régulière, appelée par la fiche elle-même. Critère 3.', r: '**Preuve partielle** : la fiche nomme « la forme négative » et sa lecture, mais n\'écrit pas la forme 来ない, et aucun de ses exemples ne porte la terminaison ない. La chaîne est déduite, non recopiée. Si l\'arbitrage exige la forme écrite, la correction serait : « … selon la forme (d\'origine, polie, négative). »' },
  v_157: { v: 'écart', o: 'Aucune. La fiche dit « circuler pour un véhicule » et traduit « Rouler (pour un véhicule) », sans exemple japonais ; ses exemples avec 電車 montrent une personne qui court pour attraper un train.', m: 'L\'emploi est attesté en français par la fiche, mais l\'exemple japonais 電車が走る n\'est dans aucune source et aucune décision ne l\'assume (D0343 et D0344 renvoient seulement « à la nuance »). Exemple construit.', k: '`nuance` (ENTRY) : « Se dit aussi d\'un véhicule qui roule. Verbe du groupe u malgré sa terminaison en -iru. »' },
  v_159: { v: 'écart', o: 'Aucune dans les sources. D0321 (abandon) écrit : « le second n\'est pas équivalent (路面電車) ».', m: 'La fiche donne « Tramway » comme traduction de 電車 et ne contient pas 路面電車. La décision D0321 cite ce mot, mais son fondement n\'est pas vérifiable dans les sources : elle écarte une traduction de la fiche au nom d\'un mot que la fiche ne donne pas. Critère 2 : ni la fiche, ni une décision au fondement vérifiable.', k: '`nuance` (ENTRY) : « Littéralement « véhicule électrique » : le train de banlieue ou de ligne classique. »', r: 'L\'abandon de la traduction « Tramway » par D0321 n\'est pas rouvert ici : seul le mot japonais de la nuance est en cause. Il est signalé pour mémoire.' },
  v_213: { v: 'écart', o: '部屋に入る : exemple de la fiche (« 部屋 に 入ります »). お風呂に入る : aucune ; la fiche traduit « Entrer (dans un bain) » sans japonais. 入っている : aucune dans les sources ; D0340 l\'introduit (« Être dedans (入っている) est l\'état qui résulte d\'être entré »). 箱に何が入っていますか : aucune.', m: 'Quatre chaînes, quatre situations. 部屋に入る est sourcée (critère 1). お風呂に入る n\'a pour appui qu\'une traduction française : le japonais est ajouté. 入っている est assumée par D0340, dont le fondement se vérifie en partie (la fiche traduit « Contenir ») ; la forme elle-même est une construction que la fiche n\'écrit pas (critère 3 : construction enrichie, non simple flexion). 箱に何が入っていますか est un exemple construit, sans source ni décision.', k: '`nuance` (ENTRY) : « Avec に : 部屋に入る, entrer dans la pièce. Se dit aussi d\'entrer dans un bain, et de ce qui est contenu dans quelque chose. »', r: 'Si l\'arbitrage tient 入っている pour assumée par D0340, la correction la garde : « … 入っている : être dedans. »' },
  v_240: { v: 'écart', o: 'Aucune. Un ancien exemple de la fiche nomme le policier 警察官, non お巡りさん.', m: 'Renvoi à une autre ENTRY publiée, que la fiche ne cite pas et qu\'aucune décision n\'assume. Critère 2.', k: '`nuance` (ENTRY) : « Le petit poste de police de quartier japonais, où l\'on demande aussi son chemin. »' },
  v_242: { v: 'écart', o: 'Aucune. D0311 dit seulement : « Terme voisin ; la précision est reprise dans la nuance » (à propos de « Médiathèque »).', m: 'Renvoi à une autre ENTRY publiée (本棚) que la fiche ne cite pas ; D0311 ne le fonde pas. Critère 2.', k: '`nuance` (ENTRY) : « La bibliothèque publique ou universitaire. »' },
  v_557: { v: 'sourcé', o: 'Ancien exemple de la fiche : « ここで 電車 が 止まります ».', m: 'Forme du dictionnaire de cet exemple (止まります → 止まる), privé de ここで. Aucun mot nouveau. Critère 1.' },
  v_563: { v: 'écart', o: '橋を渡る : exemple de la fiche (« はし を 渡ります »), reconnu par le tri. 道を渡る : aucune ; un ancien exemple dit « 道路 を 渡りましょう ».', m: 'La fiche atteste 道路 (la route), non 道 : le mot est changé. Ce n\'est pas une normalisation morphologique, c\'est un élément lexical différent. Critère 1 non rempli.', k: '`nuance` (ENTRY) : « Avec を : 橋を渡る, traverser le pont. » Variante sourcée : ajouter « 道路を渡る, traverser la route », forme du dictionnaire de l\'ancien exemple.', r: '**Cas limite** : 道 et 道路 sont voisins, et la nuance de la fiche parle d\'« une rue ». Je propose l\'écart parce que le mot écrit n\'est pas celui de la source.' },
  v_565: { v: 'sourcé', o: 'Exemple de la fiche : « とうきょう えき に 着きました » ; ancien exemple : « 東京 駅 に 着きます ».', m: 'Forme du dictionnaire de l\'exemple (着きます → 着く). 東京駅 est réduit à 駅 ; la nuance de la fiche dit « une gare ». Aucun mot nouveau. Critère 1.', r: 'La réduction de 東京駅 à 駅 retire un mot, sans en ajouter.' },
  v_642_s1: { v: 'sourcé', o: '部屋を出る : nuance de la fiche, en romaji (« heya o deru sortir de la pièce »), reconnue par le tri. 駅を出る : ancien exemple « 電車 が 駅 を 出ました ».', m: 'Forme du dictionnaire de l\'ancien exemple (出ました → 出る), réduit à 駅を. Aucun mot nouveau. Critère 1.', r: 'La traduction française jointe (« sortir de la gare ») diffère de celle de la source (« le train a quitté la gare ») ; le texte français est hors périmètre.' },
  v_644: { v: 'écart', o: 'Aucune. La fiche dit : « Ne s\'applique pas aux billets de banque ou aux billets d\'avion, qui utilisent des termes empruntés en katakana », sans donner ces termes.', m: 'Les deux mots japonais sont ajoutés. お札 n\'est d\'ailleurs pas un mot en katakana, alors que la fiche annonce des termes en katakana : la nuance publiée s\'écarte de la fiche au lieu de la reprendre. Aucune décision ne les assume (D0331 : « Redondant »).', k: '`nuance` (ENTRY) : « Billet de train, de métro ou de bus ; ne se dit ni d\'un billet de banque ni d\'un billet d\'avion. »' },
  v_705: { v: 'écart', o: 'Aucune. La fiche a « 道 を あるいて います », « 道 が 混んでいて », « この 道 をまっすぐ 行く », « 道 が 暗い ».', m: 'Ni 道を渡る ni 道に迷う ne sont dans la fiche ; 迷う n\'y figure pas. Exemples construits, sans décision qui les assume.', k: '`nuance` (ENTRY) : « Tout chemin où l\'on circule, à pied ou en véhicule. »' },
  v_80_s2: { v: 'sourcé', o: 'Ancien exemple de la fiche : « 眼鏡 が 曇って、よく 見えなく なりました ».', m: 'Forme du dictionnaire de cet exemple (曇って → 曇る) ; めがね est 眼鏡 écrit en kana. Aucun mot nouveau. Critère 1.', r: 'La nuance écrit en kana (めがね) le mot que l\'ancien exemple écrit en kanji (眼鏡) ; D0465 l\'écrit déjà ainsi. C\'est un changement d\'écriture, non de mot.' },
  v_128: { v: 'écart', o: 'Aucune. La fiche ne donne que la lecture かわ et aucun nom propre.', m: 'La lecture がわ et le nom 隅田川 sont ajoutés par connaissance extérieure : aucune lecture ni aucun exemple de la fiche ne les porte, et aucune décision ne les assume (D0484, D0485).', k: '`nuance` (ENTRY) : « Tout cours d\'eau. »' },
  v_253: { v: 'sourcé', o: 'Exemple de la fiche : « 山 に 登ります ».', m: 'Forme du dictionnaire de l\'exemple (登ります → 登る). Aucun mot nouveau. Critère 1.' },
  v_254_s2: { v: 'écart', o: 'Aucune. La fiche dit « le bois en tant que matériau », sans exemple de cet emploi ; ses exemples portent tous sur l\'arbre.', m: 'Le sens est attesté ; l\'exemple japonais 木の机 ne l\'est pas, et 机 n\'est pas dans la fiche. Exemple construit, sans décision (D0490).', k: '`nuance` (sens 2) : « Le bois en tant que matériau. »' },
  v_256: { v: 'écart', o: 'Aucune pour cette construction. La fiche a « 海 で およぎます » et « 海 へ 泳ぎ に 行きます ».', m: '海に行く n\'est pas la forme du dictionnaire d\'un exemple : la particule (へ → に) et la construction (泳ぎに行く → 行く) sont changées. Critère 1 non rempli.', k: '`nuance` (ENTRY) : « 海で泳ぐ : nager dans la mer. », forme du dictionnaire de l\'exemple de la fiche.', r: 'D0486 dit que « Bord de mer » est « repris dans la nuance » ; la traduction française reste hors périmètre.' },
  v_260: { v: 'écart', o: 'Exemple de la fiche : « きょう の 空 は とても あおいです ».', m: 'Les mots sont ceux de la fiche, mais la particule est changée (は → が) : ce n\'est pas une normalisation morphologique. La chaîne publiée n\'est pas vérifiable telle quelle dans la source.', k: '`nuance` (ENTRY) : « 空は青い : le ciel est bleu. », réduction de l\'exemple de la fiche, particule conservée.', r: '**Preuve insuffisante plutôt qu\'erreur** : aucun mot n\'est ajouté. Si l\'arbitrage admet le changement de particule comme une normalisation, l\'unité est sourcée.' },
  v_265_s1: { v: 'écart', o: 'La fiche a « この みず は とても 冷たい です », « 水 が とても 冷たい です », « 冷たい お茶 », « 冷たい アイスクリーム ».', m: 'Les deux mots sont dans la fiche, mais jamais dans cette construction : 冷たい y qualifie お茶 et アイスクリーム, et 水 y est sujet. 冷たい水 est une recombinaison, non la forme du dictionnaire d\'un exemple.', k: '`nuance` (sens 1) : « 冷たいお茶 : du thé froid. L\'air froid se dit 寒い. », l\'ancien exemple tel quel.', r: '**Preuve insuffisante plutôt qu\'erreur** : aucun mot n\'est étranger à la fiche. 寒い est cité par la fiche (sourcé).' },
  v_265_s2: { v: 'écart', o: 'Aucune. La fiche ne donne pour ce sens que la traduction « Insensible (figuré) ».', m: 'Aucun exemple de la fiche ne porte ce sens ; 冷たい人 est construit, sans décision qui l\'assume (D0480 à D0482).', k: '`nuance` (sens 2) : « Emploi figuré. » Cette correction s\'ajoute à V1-5 (lot 1), qui porte sur les traductions du même sens.' },
  v_266_s1: { v: 'écart', o: 'Nuance 風が吹く : exemple de la fiche (« かぜ が つよく 吹いて います ») et ancien exemple (« 風 が 強く 吹いて いました »). Particule が : absente du champ des particules de la fiche (を seul) ; présente dans ses exemples ; D0471 l\'écrit entre parenthèses, sans en dire l\'origine.', m: '**La nuance est sourcée** : forme du dictionnaire de l\'exemple (吹いています → 吹く), privé de l\'adverbe ; critère 1. **La particule ne l\'est pas** : elle n\'est attestée que par des exemples, et la règle des lots est qu\'aucune particule n\'est tirée d\'un exemple (lot 18) ; la fiche dit seulement « transitif ou intransitif ». Même cas que 出る, sens 3, arbitré au lot 1.', k: '`particles` (sens 1) : `["が"]` → `[]`. La nuance est conservée.', r: 'À la différence de 出る, sens 3, la particule est ici dans l\'exemple même de la fiche. Si l\'arbitrage juge que cela suffit, l\'unité est sourcée en entier.' },
  v_267: { v: 'écart', o: 'Aucune dans la fiche de 夏. (夏休み apparaît dans un ancien exemple de la fiche de 川, non dans celle-ci.)', m: 'Renvoi à une autre ENTRY publiée, que la fiche ne cite pas et qu\'aucune décision n\'assume (D0457). Critère 2.', k: '`nuance` (ENTRY) : « La saison la plus chaude. »' },
  v_269: { v: 'écart', o: 'Exemple de la fiche : « きょう は 天気 が とても いい です ».', m: 'La fiche atteste 天気がいい ; la chaîne publiée change la construction (いい天気) et ajoute ですね. Ce n\'est pas la forme du dictionnaire d\'un exemple.', k: '`nuance` (ENTRY) : « Les conditions atmosphériques ; seul, il désigne souvent le beau temps : 天気がいい, il fait beau. »', r: '**Preuve insuffisante plutôt qu\'erreur** : les deux mots sont ceux de la fiche.' },
  v_272: { v: 'écart', o: 'Aucune. La fiche cite 晴れる (sourcé) et ne donne aucun contraire.', m: 'くもり est un renvoi à une autre ENTRY publiée que la fiche ne cite pas ; critère 2. **雨, donné dans la même phrase, est dans le même cas** : le criblage ne l\'a pas relevé parce qu\'il ignore les chaînes d\'un seul caractère.', k: '`nuance` (ENTRY) : « Forme nominale de 晴れる. »' },
  v_273: { v: 'écart', o: 'Ancien exemple : « 明日 は 天気 が 晴れて、温かい 一日 に なる でしょう ».', m: 'La chaîne publiée recompose cet exemple (晴れて…なるでしょう → 晴れるでしょう) : ce n\'est pas une normalisation d\'une forme, mais une phrase nouvelle.', k: '`nuance` (ENTRY) : « Le ciel se dégage, les nuages se dissipent. »' },
  v_274: { v: 'écart', o: 'Aucune. La fiche cite 熱い (sourcé) et ne donne aucun contraire.', m: 'Renvoi à une autre ENTRY publiée (寒い) que la fiche ne cite pas ; aucune décision (D0474). Critère 2.', k: '`nuance` (ENTRY) : « La chaleur de l\'air, du temps ; un objet chaud se dit 熱い (même lecture). »' },
  v_279: { v: 'écart', o: 'Aucune. La fiche ne cite pas 降りる. (雨が降る est l\'exemple de la fiche, sourcé.)', m: 'Renvoi à une autre ENTRY publiée que la fiche ne cite pas ; aucune décision (D0470). Critère 2.', k: '`nuance` (ENTRY) : « Avec が : 雨が降る, il pleut. »' },
  v_280: { v: 'écart', o: '雨が降る : anciens exemples « 雨 が 降ってきた », « 雨 が 降っていて ». 飴 : aucune.', m: '**雨が降る est sourcée** : forme du dictionnaire des anciens exemples ; critère 1. Les trois onomatopées sont dans la fiche. **L\'homophone 飴 ne l\'est pas** : la fiche ne le cite pas. Le criblage ne l\'a pas relevé (un seul caractère) ; l\'examen de la nuance entière le fait apparaître.', k: '`nuance` (ENTRY) : « 雨が降る : il pleut. L\'intensité se dit par des onomatopées : ぽつぽつ, しとしと, ザーザー. »', r: 'L\'écart tient à un élément que le criblage n\'avait pas signalé. Si l\'arbitrage borne l\'unité aux seules chaînes signalées, elle est sourcée.' },
  v_282: { v: 'écart', o: '風が吹く : ancien exemple « 春 の 温かい 風 が 吹き ». 風邪 : aucune ; la fiche écrit « Les romajis associés sont (kaze) », pour 風.', m: '**風が吹く est sourcée** : forme du dictionnaire de l\'ancien exemple ; critère 1. **L\'homophone 風邪 ne l\'est pas** : renvoi à une autre ENTRY publiée que la fiche ne cite pas ; critère 2. **Le tri l\'avait écarté à tort** : le « kaze » de la fiche, lecture de 風, a été pris pour une citation de 風邪, qui se lit de même.', k: '`nuance` (ENTRY) : « 風が吹く : le vent souffle. »', r: 'Ce faux « faux positif » montre une limite du tri : la reconnaissance du romaji ne distingue pas deux homophones.' },
  v_543: { v: 'sourcé', o: 'Anciens exemples : « 桜 の 花 が 咲きます », « いつ 花 が 咲きます か ».', m: 'Forme du dictionnaire de ces exemples (咲きます → 咲く). Aucun mot nouveau. Critère 1. La particule が est celle de la fiche.' },
  v_648: { v: 'écart', o: 'いっぴき, にひき, さんびき : nuance de la fiche, en romaji (« ippiki, nihiki, sanbiki »), reconnues par le tri. ろっぴき, はっぴき, じゅっぴき : aucune.', m: 'La fiche donne trois lectures « par exemple » ; la nuance publiée en ajoute trois, qui ne sont dans aucune source. Aucune décision ne les assume (D0503 : « Repris dans la nuance »). Lectures ajoutées par connaissance extérieure.', k: '`nuance` (ENTRY) : « Pour compter chiens, chats, poissons, insectes. La lecture change selon le nombre : いっぴき, にひき, さんびき. »', r: 'Le verdict `type-nul` de ce sens (L, volet 2) n\'est pas rouvert.' },
  v_704_s1: { v: 'sourcé', o: 'Nuance de la fiche : « Souvent utilisé avec la particule ni ou no. »', m: 'Le champ des particules de la fiche ne porte que に, mais sa nuance nomme expressément の. La particule n\'est pas tirée d\'un exemple : elle est donnée par la description. Sourcée.' }
};

// F garde les propositions du 2026-10-08, telles qu'elles ont été relues. L'arbitrage du 2026-10-10 (ChatGPT, par délégation,
// relayé et accepté par l'utilisateur) confirme 33 verdicts et reclasse v_152 ; ARB porte le verdict arbitré quand il diffère.
const DATE_ARB = '2026-10-10';
const ARB = {
  v_152: { v: 'écart', k: '`nuance` (ENTRY) : « Mouvement vers le locuteur. Verbe irrégulier : le kanji se lit く, き ou こ selon la forme (d\'origine, polie, négative). » Les trois lectures attestées sont conservées ; les formes écrites sont remplacées par les désignations de la fiche.', a: 'La fiche nomme la forme négative et sa lecture, mais n\'écrit pas la forme 来ない, et aucun de ses exemples ne la porte. La graphie complète ne se reconstitue pas par connaissance grammaticale extérieure. Écart de provenance (contenu ajouté : forme absente des sources).' }
};
// Motifs de l'arbitrage pour les verdicts confirmés qui portaient une question explicite.
const MOTIF = {
  v_256: 'Écart de reformulation confirmé : la particule et la construction sont changées.',
  v_260: 'Écart de reformulation confirmé : un changement de particule n\'est pas une normalisation.', v_265_s1: 'Écart de reformulation confirmé : recombinaison de mots de la fiche, non forme d\'un exemple.',
  v_269: 'Écart de reformulation confirmé : construction changée, ですね ajouté.', v_266_s1: 'Écart confirmé : aucune particule n\'est tirée d\'un exemple, même celui de la fiche.',
  v_272: 'Écart confirmé : renvoi non sourcé, 雨 compris (chaîne d\'un caractère).', v_280: 'Écart confirmé : l\'unité porte sur la nuance entière, 飴 compris.',
  v_282: 'Écart confirmé : renvoi non sourcé (風邪).', v_240: 'Écart confirmé : renvoi non sourcé.', v_242: 'Écart confirmé : renvoi non sourcé.', v_267: 'Écart confirmé : renvoi non sourcé.',
  v_274: 'Écart confirmé : renvoi non sourcé.', v_279: 'Écart confirmé : renvoi non sourcé.', v_159: 'Écart confirmé : renvoi non sourcé ; D0321 n\'en donne pas un fondement vérifiable.',
  v_213: 'Écart confirmé. L\'arbitrage ne se prononce pas sur la réserve (入っている assumée par D0340) : la correction de base est inscrite, la variante restait ouverte. Second arbitrage du même jour (périmètre de la tranche 2) : variante écartée, correction de base conservée ; 入っている n\'est pas réintroduit sans preuve supplémentaire de provenance.',
  v_563: 'Écart de reformulation confirmé : 道路 n\'est pas 道. L\'arbitrage ne se prononce pas sur la variante (ajout de 道路を渡る) : la correction de base est inscrite, la variante restait ouverte. Second arbitrage du même jour : variante écartée, correction de base conservée ; 道路を渡る n\'est pas ajouté à la nuance dans le cadre de cette correction.'
};
// Variantes de correction proposées le 2026-10-08 ; non tranchées par le premier arbitrage, écartées par le second (même jour).
const VARIANTE = { v_213: 'garder « 入っている : être dedans. » (si D0340 est tenue pour l\'assumer)', v_563: 'ajouter « 道路を渡る, traverser la route », forme du dictionnaire de l\'ancien exemple' };
// Erratum du 2026-10-10, sans réécrire la justification relue.
const ERRATUM = { v_282: 'La justification dit que 風邪 a été écarté par le romaji. Le tri l\'a en réalité rangé en B-transcription : 風邪 se lit かぜ, et かぜ est écrit en kana dans l\'exemple de la fiche de 風. La confusion d\'homophones vient de la comparaison des lectures, qui sert aux deux classes B. Le verdict n\'en est pas changé ; la nuance avait été lue en entier pour 風が吹く.' };
const verdict = (u) => ARB[u]?.v ?? F[u].v;
// Texte retenu quand la correction proposée portait aussi sa variante (V2-6) : la variante est écartée, la base seule est retenue.
const KRET = { v_563: '`nuance` (ENTRY) : « Avec を : 橋を渡る, traverser le pont. »' };
const correction = (u) => KRET[u] ?? ARB[u]?.k ?? F[u].k;
const vari = (u) => (!VARIANTE[u] ? '' : correction(u).includes('Variante') ? ' *Variante écartée au second arbitrage.*' : ` *Variante écartée au second arbitrage : ${VARIANTE[u]}.*`);

const ARBITRES = ['v_642_s2', 'v_642_s3', 'v_266_s2'];
const reste = tri.releves.filter((r) => !r.classe.startsWith('B') && !ARBITRES.includes(r.sens));
const court = (s) => s.replace(" (nuance d'ENTRY)", '');
const T1 = reste.filter((r) => ['lot-04', 'lot-07'].includes(r.lot));
const partRest = prov.particules.filter((q) => !ARBITRES.includes(q.sens));
const unites = [...new Set([...T1.map((r) => court(r.sens)), ...partRest.map((q) => q.sens)])];
const cles = Object.keys(F);
if (unites.length !== 34 || cles.length !== 34 || unites.some((u) => !F[u]) || cles.some((c) => !unites.includes(c))) throw new Error(`unités : ${unites.length}, fiches : ${cles.length}, manquantes : ${unites.filter((u) => !F[u])}, en trop : ${cles.filter((c) => !unites.includes(c))}`);
for (const [id, f] of Object.entries(F)) if ((f.v === 'écart') !== Boolean(f.k)) throw new Error(`correction incohérente : ${id}`);
for (const id of cles) if ((verdict(id) === 'écart') !== Boolean(correction(id))) throw new Error(`correction arbitrée incohérente : ${id}`);
if (Object.keys(ARB).some((id) => !F[id]) || Object.keys(MOTIF).some((id) => !F[id] || ARB[id])) throw new Error('arbitrage hors des 34 unités');
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
const MODS_V2 = ['v_500_s2', 'v_65_s2', 'v_696_s1', 'v_606_s1', 'v_687_s1', 'v_528_s1', 'v_671_s1', 'v_287_s1', 'v_500_s1', 'v_503_s1'];
const ECARTS_LOT1 = ['v_221_s1', 'v_642_s2', 'v_642_s3', 'v_266_s2', 'v_265_s2'];

const src0 = cles.filter((c) => F[c].v === 'sourcé'), ec0 = cles.filter((c) => F[c].v === 'écart');
const src = cles.filter((c) => verdict(c) === 'sourcé'), ec = cles.filter((c) => verdict(c) === 'écart');
if (src0.length !== 10 || ec0.length !== 24 || src.length !== 9 || ec.length !== 25) throw new Error(`verdicts : proposés ${src0.length}/${ec0.length}, arbitrés ${src.length}/${ec.length}`);
// Numéros stables : V2-1 à V2-24 gardent l'ordre de la proposition ; une correction née de l'arbitrage prend le numéro suivant.
const NUM = new Map(ec0.map((c, i) => [c, i + 1]));
for (const c of ec.filter((x) => !NUM.has(x))) NUM.set(c, NUM.size + 1);
const parNum = [...ec].sort((a, b) => NUM.get(a) - NUM.get(b));
const mot = (u) => vocab.find((e) => e.id === u.match(/^v_\d+/)[0]).word;
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance des particules et des exemples de nuance');
P();
P('Ce rapport est livré par tranches. Le périmètre et le tri factuel sont dans `etape2-A2-05-volet1-lot2-perimetre.md`.');
P();
P('---');
P();
P('# Tranche 1 · lots 04 et 07, et les deux particules restantes : 34 unités');
P();
P('**Date** : 2026-10-08');
P(`**Statut** : **arbitrée le ${DATE_ARB}** (ChatGPT, par délégation ; arbitrage relayé et accepté par l'utilisateur) : **${src.length} sourcés, ${ec.length} écarts**. Proposition du 2026-10-08 : ${src0.length} sourcés, ${ec0.length} écarts ; elle est conservée ci-dessous, fiche par fiche. Périmètre accepté le 2026-10-08 (ChatGPT, par délégation) : 34 unités distinctes dans 33 ENTRY. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n'est modifié ; **aucune correction n'est appliquée** ; aucun verdict du volet 2 n'est rouvert. **Le texte français des nuances est hors périmètre.**`);
P();
P(`## P1.0 Arbitrage du ${DATE_ARB}`);
P();
P(`- **${cles.length - Object.keys(ARB).length} verdicts confirmés** : les ${ec0.length} écarts proposés et ${src0.length - Object.keys(ARB).length} des ${src0.length} verdicts « sourcé ».`);
P('- **Un reclassement : `v_152` 来る, sourcé → écart.** La fiche nomme la forme négative et sa lecture, mais n\'écrit pas la graphie complète 来ない. Cette graphie ne se reconstitue pas par connaissance grammaticale extérieure. La correction conserve les lectures attestées (く, き, こ) et remplace les exemples de formes par les désignations de la fiche : « d\'origine, polie, négative ». Elle prend le numéro **V2-25** ; les numéros V2-1 à V2-24 de la proposition ne changent pas.');
P('- **Les cinq écarts de reformulation sont conservés** : 渡る, 海, 空, 冷たい sens 1 et 天気. Un mot voisin, une particule ou une construction changés ne sont pas une normalisation au sens du critère 1.');
P('- **L\'écart sur la particule が de 吹く, sens 1, est conservé** : aucune particule n\'est tirée d\'un exemple, même de celui de la fiche.');
P('- **Les écarts sur les renvois non sourcés sont conservés**, y compris les éléments que le criblage n\'avait pas signalés et que la lecture entière de la nuance a fait apparaître (雨 dans la nuance de 晴れ, 飴 dans celle de 雨).');
P('- **Les corrections de cette tranche (V2-1 à V2-25) restent distinctes** des dix modifications du volet 2 et des cinq corrections du lot 1 (V1-1 à V1-5). Aucune n\'est appliquée.');
P(`- **Deux variantes de correction, proposées en option le 2026-10-08, n'étaient pas tranchées par cet arbitrage** : ${Object.entries(VARIANTE).map(([u, t]) => `${mot(u)} (V2-${NUM.get(u)}) : ${t}`).join(' ; ')}. **Second arbitrage du même jour (relecture du périmètre de la tranche 2) : les deux variantes sont écartées, les corrections de base sont conservées** ; 入っている n'est pas réintroduit sans preuve supplémentaire de provenance, 道路を渡る n'est pas ajouté. Ces choix ne rouvrent aucun des 25 verdicts.`);
P('- **Deux défauts du tri sont retenus** (§P1.5) : une correspondance par la lecture peut confondre deux homophones ; les chaînes japonaises d\'un seul caractère ne sont pas détectées. Ils ne permettent de déclarer ni faux ni vrais les autres signalements écartés.');
P();
P('## P1.1 Résultat');
P();
P(`| Verdict arbitré (${DATE_ARB}) | Unités | Détail |`);
P('|---|---|---|');
P(`| **sourcé** | ${src.length} | ${src.map((c) => `\`${c}\` ${mot(c)}`).join(' ; ')} |`);
P(`| **écart** (E2) | ${ec.length} | ${ec.map((c) => `\`${c}\` ${mot(c)}`).join(' ; ')} |`);
P('| **Total** | 34 | |');
P();
P(`Proposition du 2026-10-08, pour l'historique : ${src0.length} sourcés, ${ec0.length} écarts ; \`v_152\` 来る était proposé sourcé, avec une réserve de preuve partielle.`);
P();
P('Aucune unité n\'est « assumée » en entier par une décision de journal : les décisions des lots 04 et 07 ne disent presque jamais d\'où vient un exemple de nuance. Deux décisions citent une chaîne (D0321 pour 路面電車, D0340 pour 入っている) ; seule la seconde a un fondement en partie vérifiable.');
P();
P('**Les écarts ne sont pas tous de même force.** Quatre familles, présentées à l\'arbitrage séparément ; l\'arbitrage y ajoute 来る, dans la première :');
P();
P('| Famille | Unités | Ce qui est en cause |');
P('|---|---|---|');
P('| **Contenu ajouté** : mot, lecture, forme ou exemple absent des sources | 走る, 電車, 入る, 切符, 道, 川, 木 sens 2, 冷たい sens 2, 晴れる, 匹 ; **来る** (ajouté à l\'arbitrage) | exemples construits, lectures et mots apportés par connaissance extérieure ; pour 来る, la graphie 来ない reconstituée par la grammaire |');
P('| **Renvoi non appuyé** (critère 2) | 交番, 図書館, 夏, 晴れ, 暑い, 降る, 雨 (飴), 風 (風邪) | une autre ENTRY publiée, ou un homophone, que la fiche ne cite pas |');
P('| **Reformulation proche de la source** : preuve insuffisante plutôt qu\'erreur | 渡る, 海, 空, 冷たい sens 1, 天気 | les mots sont ceux de la fiche, mais un mot voisin, une particule ou la construction sont changés |');
P('| **Particule tirée d\'un exemple** | 吹く sens 1 | が, absente du champ et de la description de la fiche |');
P();
P('## P1.2 Critères appliqués (arbitrés le 2026-10-08)');
P();
P('1. **Forme du dictionnaire d\'un exemple de la fiche** : admise quand la correspondance est vérifiable et qu\'aucun élément lexical ou sémantique n\'est ajouté ; elle n\'autorise pas un exemple construit librement. J\'ai tenu pour normalisation le passage d\'une forme conjuguée à la forme du dictionnaire et le retrait de mots ; non le changement d\'un mot, d\'une particule ou de la construction.');
P('2. **Renvoi à une autre ENTRY publiée** : il doit être appuyé par la fiche examinée, ou par une décision validée au fondement vérifiable ; l\'existence du mot dans le corpus ne suffit pas.');
P('3. **Formes honorifiques et conjuguées** : une flexion régulière vérifiable est distinguée d\'une construction conventionnelle ou enrichie, cas par cas, sans connaissance extérieure.');
P();
P('Ces critères sont des critères de relecture ; ils ne modifient aucun snapshot ni addendum.');
P();
P('## P1.3 Corrections retenues par cette tranche');
P();
P(`**Retenues à l'arbitrage du ${DATE_ARB} ; aucune n'est exécutée.** Elles sont distinctes des dix modifications du volet 2 et des cinq corrections du lot 1 (V1-1 à V1-5) ; une seule porte sur un SENSE déjà visé (冷たい, sens 2 : V1-5 corrige ses traductions, celle-ci sa nuance). Toutes reprennent le texte de la fiche, sans exemple japonais ajouté. V2-1 à V2-24 sont les corrections proposées le 2026-10-08, inchangées ; V2-25 naît de l'arbitrage.`);
P();
P('| # | Unité | Mot | Lot | Correction retenue | Origine |');
P('|---|---|---|---|---|---|');
parNum.forEach((c) => P(`| V2-${NUM.get(c)} | \`${c}\` | ${mot(c)} | ${(T1.find((r) => court(r.sens) === c)?.lot ?? 'lot-10').slice(4)} | ${correction(c)}${vari(c)} | ${ARB[c] ? `arbitrage du ${DATE_ARB}` : 'proposition du 2026-10-08'} |`));
P();
P('## P1.4 Les 34 fiches de provenance');
P();
for (const u of unites) {
  const f = F[u]; const eid = u.match(/^v_\d+/)[0]; const sid = `n5_${eid}`;
  const e = vocab.find((x) => x.id === eid); const s = u.includes('_s') ? e.senses.find((x) => x.id === u) : null;
  const rel = T1.find((r) => court(r.sens) === u); const pp = prov.particules.find((q) => q.sens === u);
  const nuEntree = champs.get(sid)?.nuance ?? e.nuance ?? null;
  P(`### \`${u}\` · ${e.word}${s ? ` · « ${s.meaning.primary} »` : ' · nuance d\'ENTRY'} — **${verdict(u)}**${ARB[u] ? ` (proposé ${f.v})` : ''}`);
  P();
  for (const id of [sid, ...(fusion.get(sid) ?? [])]) {
    const fi = sources.get(id);
    P(`- **Fiche source** (\`${id}\`${id !== sid ? ', fusionnée' : ''}, ${fi.type}) : traductions « ${[fi.meanings.primary, ...(fi.meanings.secondary ?? [])].join(' ; ')} » ; particules ${(fi.particles ?? []).join(', ') || 'aucune'}. Nuance : « ${st(fi.nuance)} » Exemple : « ${st(fi.example?.japanese)} » — « ${st(fi.example?.french)} »`);
    for (const q of ex.vocab?.[id] ?? []) P(`  - Ancien exemple : « ${st(q.japanese)} » — « ${st(q.french ?? q.translation)} »`);
  }
  P(`- **Publié** : ${s ? `nuance du sens : ${s.nuance ? `« ${s.nuance} »` : 'aucune'} ; particules du sens : ${(s.particles ?? []).join(', ') || 'aucune'}` : `nuance de l'ENTRY : ${nuEntree ? `« ${nuEntree} »` : 'aucune'}`}.`);
  P(`- **Élément contrôlé** : ${[rel ? `chaînes signalées : ${rel.chaines.filter((c) => !c.classe.startsWith('B')).map((c) => c.chaine).join(' ; ')}` : null, pp ? `particule ${pp.particules.join(', ')}` : null].filter(Boolean).join(' ; ')}.`);
  P(`- **Origine recherchée** : ${f.o}`);
  P(`- **Verdict proposé (2026-10-08)** : **${f.v}**.`);
  P(`- **Justification** : ${f.m}`);
  if (f.k) P(`- **Correction proposée${ARB[u] ? '' : ` (V2-${NUM.get(u)})`}** : ${f.k}`);
  if (f.r) P(`- **Réserve** : ${f.r}`);
  if (ERRATUM[u]) P(`- **Erratum (${DATE_ARB})** : ${ERRATUM[u]}`);
  P(`- **Verdict arbitré (${DATE_ARB})** : **${verdict(u)}**, ${ARB[u] ? `**reclassé**. ${ARB[u].a}` : `confirmé.${MOTIF[u] ? ` ${MOTIF[u]}` : ''}`}`);
  if (verdict(u) === 'écart') P(`- **Correction retenue, non appliquée (V2-${NUM.get(u)})** : ${correction(u)}${vari(u)}`);
  P();
}
P('## P1.5 Ce que la tranche apprend sur le tri');
P();
P('- **Le tri écarte parfois à tort.** 風邪, dans la nuance de 風, avait été rangé parmi les faux positifs parce que la fiche écrit « kaze » pour 風. La reconnaissance du romaji ne distingue pas deux homophones : les 50 nuances écartées à ce titre mériteraient un contrôle rapide avant la fin du chantier.');
P('- **Le criblage ignore les chaînes d\'un seul caractère.** 雨 (dans la nuance de 晴れ) et 飴 (dans celle de 雨) n\'avaient pas été relevés. Ils sont apparus parce que la nuance a été lue en entier.');
P('- **Sur 33 nuances lues, 23 portent au moins un élément japonais non sourcé.** Ce taux vaut pour les lots 04 et 07 ; il ne préjuge pas des autres lots.');
P();
P(`**Après l'arbitrage du ${DATE_ARB}.** Les deux défauts sont retenus ; ils ne permettent de déclarer ni faux ni vrais les autres signalements. Avec 来る, **24 nuances sur 33** portent au moins un élément japonais non sourcé. **Erratum sur le premier point** : 風邪 n'a pas été écarté par le romaji, mais par la comparaison des lectures en kana (classe B-transcription) : 風邪 se lit かぜ, et l'exemple de la fiche de 風 écrit かぜ en kana. Le défaut d'homophonie tient donc à toute correspondance établie par une lecture, romaji (50 nuances) ou kana (une partie des 33 nuances B-transcription). Le contrôle de ces faux positifs et des chaînes d'un seul caractère est proposé avec le périmètre de la tranche 2 (\`etape2-A2-05-volet1-lot2-tranche2-perimetre.md\`).`);
P();
P('## P1.6 Complétude');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t1.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P('| Les fiches sont exactement les unités du périmètre accepté | oui : 34 unités distinctes, 33 ENTRY |');
P(`| Composition | ${T1.length} nuances des lots 04 et 07, et 2 particules (吹く sens 1, déjà comptée pour sa nuance ; 近く sens 1, lot 10) |`);
P(`| Verdicts proposés (2026-10-08) | ${src0.length} sourcés, ${ec0.length} écarts ; total 34 |`);
P(`| Verdicts arbitrés (${DATE_ARB}) | ${src.length} sourcés, ${ec.length} écarts ; total 34 ; ${cles.length - Object.keys(ARB).length} confirmés, ${Object.keys(ARB).length} reclassé |`);
P(`| Un écart arbitré a une correction retenue, et seulement lui | oui : V2-1 à V2-${NUM.size}, numéros distincts, V2-1 à V2-24 inchangés |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé |`);
P(`| Unités portant sur un sens visé par une modification du volet 2 | ${unites.filter((u) => MODS_V2.includes(u)).length} |`);
P(`| Unités portant sur un sens visé par une correction du lot 1 | ${unites.filter((u) => ECARTS_LOT1.includes(u)).length} (冷たい, sens 2 : champs différents) |`);
P(`| **Chantier de provenance** | ${reste.length} nuances restaient à examiner après le tri ; **${T1.length} sont contrôlées dans cette tranche** ; **${reste.length - T1.length} restent**, dans six tranches. Les 2 particules restantes sont toutes deux contrôlées. |`);
P('| Candidats du volet 1 (axes C1 à C10) | **377, inchangé** : un sens contrôlé ici pour sa provenance reste candidat pour ses propres relevés |');
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance.md'), md);
console.log(`tranche 1 écrite : ${src.length} sourcés, ${ec.length} écarts ; reste ${reste.length - T1.length} nuances ; ${md.split('\n').length} lignes`);
