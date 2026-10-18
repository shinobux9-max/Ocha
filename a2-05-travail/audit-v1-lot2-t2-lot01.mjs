// A2-05 · volet 1 · lot 2 (provenance) · tranche 2, lot 01 (34 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t2-lot01.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot01.md
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const plan = read('a2-05-travail/provenance/plan-tranches.json');
const vocab = read('data/n5/vocab.json');
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const ex = read('reconstruction/a2-04/sources/exemples.json');
const journal = read('reconstruction/a2-04/journal.json');
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-\d+\.json$/.test(f)).sort().map((f) => read(`reconstruction/a2-04/lots/${f}`));
const audit = readFileSync(join(root, 'docs/rapports/etape2-A2-05-audit-null.md'), 'utf8');
const r00 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot00.md'), 'utf8');
// Les furigana des fiches sont rendus entre crochets (兄[あに]) : la provenance d'une graphie en dépend.
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');
const RETIREE = '`nuance` (ENTRY) : retirée (aucune nuance publiée), faute de contenu sourcé à conserver.';

// v : 'sourcé' | 'écart' ; f : famille ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_15: { v: 'écart', f: 'renvoi', o: "Nuance de la fiche : « Le terme officiel et plus formel est 警察官[けいさつかん] (keisatsukan) ». Ni 交番 ni 警官 ne figurent dans la fiche ni dans ses exemples.", m: "Deux renvois à des ENTRY publiées que la fiche ne cite pas (critère 2) : 交番, et 警官, qui n'est pas le 警察官 de la fiche (un autre mot). La tranche 1 a retiré, symétriquement, お巡りさん de la nuance de 交番 (V2-4).", k: "`nuance` (ENTRY) : « Terme familier et bienveillant, avec さん : le policier de quartier. Terme officiel, plus formel : 警察官. », le mot que la fiche donne." },
  v_20: { v: 'écart', f: 'forme', o: "Aucune. La fiche ne parle d'aucune forme honorifique ; ses exemples n'ont que 両親.", m: "ご両親 est une forme honorifique que la fiche n'écrit pas : le critère 3 ne la tient pas pour sourcée d'office, et rien ne l'atteste ici.", k: "`nuance` (ENTRY) : « Les deux parents ensemble ; terme un peu formel, pour ses parents comme pour ceux d'autrui. »" },
  v_24: { v: 'écart', f: 'decision', o: "Aucune dans les sources : la fiche ne connaît que 叔母 (traductions « Sœur cadette des parents / Épouse de l'oncle cadet ») et おばさん. D0081 (arbitrage du lot 01) assume l'information : « 叔 / 伯 marque la position (cadet ou aîné) [...] l'information est gardée dans la nuance » ; D0082 : « Information reprise dans la nuance (sens de 叔) ».", m: "Le renvoi à 伯母 est assumé par une décision validée, mais **son fondement n'est vérifiable qu'à moitié** : la fiche établit que 叔 marque le cadet ; rien n'y dit que 伯 marque l'aîné, ni n'écrit 伯母. Même situation que D0321 (路面電車, 電車) en tranche 1, arbitrée en écart : une décision qui cite un mot absent des sources ne suffit pas (critère 2).", k: "`nuance` (ENTRY) : « Terme neutre ou humble. Écrit 叔母 pour la sœur cadette d'un parent ou l'épouse d'un oncle cadet. »", r: "**Le cas le plus discutable du lot** : l'information a été arbitrée au lot 01 (D0081), et n'est pas une erreur. Si l'arbitrage tient D0081 pour un fondement suffisant, l'unité est **assumée**. D0081 et D0082 ne sont pas réécrites : une correction se ferait par une décision nouvelle." },
  v_25: { v: 'écart', f: 'decision', o: "Aucune dans les sources : la fiche ne connaît que 叔父 (« Frère cadet des parents / Époux de la tante cadette ») et 叔父さん. D0083 assume 伯父 « pour la même raison que 伯母 » ; D0084 : « Information reprise dans la nuance (sens de 叔) ».", m: "Même cas que 叔母 : décision validée, fondement vérifiable à moitié (le cadet seul est dans la fiche). Critère 2.", k: "`nuance` (ENTRY) : « Terme neutre ou humble. Écrit 叔父 pour le frère cadet d'un parent ou l'époux d'une tante cadette. »", r: "Comme pour 叔母 : assumée si l'arbitrage tient D0083 pour un fondement suffisant. Les deux verdicts doivent aller ensemble." },
  v_27: { v: 'écart', f: 'renvoi', o: "Aucune. La fiche ne cite pas 外人 ; elle ne dit rien d'une forme abrégée ni d'une connotation.", m: "Mot ajouté par connaissance extérieure. La nuance n'a pas d'autre contenu : retirer 外人 la vide.", k: RETIREE },
  v_31: { v: 'écart', f: 'forme', o: "Aucune. La fiche oppose 子供 à 大人 (otona) ; elle ne cite pas お子さん.", m: "Forme honorifique que la fiche n'écrit pas (critère 3). La nuance n'a pas d'autre contenu.", k: RETIREE, r: "La correction ne reprend pas l'opposition à 大人 que la fiche donne : ce serait écrire une nuance nouvelle." },
  v_35: { v: 'écart', f: 'forme', o: "Aucune. La fiche ne distingue pas sa famille de celle d'autrui et n'écrit pas ご家族.", m: "Forme honorifique que la fiche n'écrit pas (critère 3) ; l'opposition « sa propre famille / celle d'autrui » n'existe que pour l'introduire.", k: RETIREE },
  v_46: { v: 'écart', f: 'construit', o: "体にいい : l'ancien exemple a « 体 に 良[よ]い 野菜 » (よい, et non いい). 体が弱い : aucune. D0105 : « « Santé » est reprise dans la nuance (体にいい) ».", m: "**体が弱い est construit** : ni la fiche ni ses exemples ne l'ont. **体にいい** est assumé par D0105, mais la source écrit 体に良い, lu よい : la forme publiée change le mot écrit (いい pour 良い), comme 道 pour 道路 (渡る, tranche 1).", k: "`nuance` (ENTRY) : « 体に良い : bon pour la santé. », la forme de l'ancien exemple.", r: "La correction suit D0105 (la santé dans la nuance) avec la forme écrite de la source." },
  v_47: { v: 'écart', f: 'forme', o: "Aucune. La fiche oppose 医者 à 先生 (sensei), employé pour s'adresser au médecin ; elle n'écrit pas お医者さん.", m: "Forme honorifique que la fiche n'écrit pas (critère 3). La nuance n'a pas d'autre contenu.", k: RETIREE, r: "La correction ne reprend pas l'emploi de 先生 que la fiche décrit : ce serait écrire une nuance nouvelle." },
  v_48: { v: 'écart', f: 'construit', o: "Nuance de la fiche : « par extension, une ouverture, une entrée ou une issue (comme 改札口 (kaisatsuguchi)) ». 瓶の口 : aucune ; 瓶 n'est dans aucun texte de la fiche. D0120 assume « Ouverture » dans la nuance, non l'exemple.", m: "L'emploi est attesté ; l'exemple japonais 瓶の口 est construit (critère 1 non rempli).", k: "`nuance` (ENTRY) : « Désigne aussi l'ouverture d'un objet. »" },
  v_51: { v: 'sourcé', o: "Exemple de la fiche : « 食事 の 前 に 、手 を 洗います ».", m: "Forme du dictionnaire de l'exemple (洗います → 洗う), réduit à 手を. Critère 1." },
  v_54: { v: 'sourcé', o: "Exemple de la fiche : « 毎朝 、歯 を 磨きます ».", m: "Forme du dictionnaire de l'exemple (磨きます → 磨く). Critère 1." },
  v_55: { v: 'écart', f: 'construit', o: "病気になる : ancien exemple « 病気 に なりやすい です ». 病気です : aucune ; la fiche a 病気 の とき, 病気 で 入院, 病気 を 予防.", m: "**病気になる est sourcé** : la chaîne est dans l'ancien exemple, privée de l'auxiliaire やすい (retrait d'un mot, critère 1). **病気です n'est écrit nulle part** : construction ajoutée, comme いい天気ですね (天気, tranche 1).", k: "`nuance` (ENTRY) : « 病気になる : tomber malade. »", r: "**Preuve insuffisante plutôt qu'erreur** pour 病気です : aucun mot n'est étranger à la fiche, seule la construction l'est." },
  v_56: { v: 'sourcé', o: "Ancien exemple : « 今日 は 病院 に 行きます ».", m: "Forme du dictionnaire de l'ancien exemple (行きます → 行く), réduit à 病院に. Critère 1." },
  v_57: { v: 'écart', f: 'construit', o: "Aucune pour 目がいい et 目が悪い : la fiche a 目 が 痛い, 目 が 疲れた, 目 が 綺麗. D0114 : « « Vue » et « regard » sont des emplois du même mot (目がいい) [...] repris dans la nuance ».", m: "Les deux expressions sont construites. D0114 assume que la vue figure dans la nuance, et le fait avec 目がいい ; mais la source n'a pas cette expression : son fondement ne se vérifie que pour le sens (traductions « Vue ; Regard »), non pour l'exemple.", k: "`nuance` (ENTRY) : « Désigne aussi la vue. », d'après les traductions de la fiche et D0114, sans exemple japonais.", r: "Le texte français de la correction est tiré des traductions de la fiche, pour que l'information assumée par D0114 subsiste." },
  v_58: { v: 'écart', f: 'construit', o: "Aucune pour 耳がいい et 耳が遠い : la fiche a 耳 に イヤホン, 耳 に 入れなかった, 耳 まで. D0116 : « « Ouïe » est un emploi du même mot (耳がいい) : repris dans la nuance ».", m: "Même cas que 目 : expressions construites ; D0116 n'en fonde que le sens (traduction « Ouïe »).", k: "`nuance` (ENTRY) : « Désigne aussi l'ouïe. », d'après la traduction de la fiche et D0116, sans exemple japonais." },
  v_59: { v: 'sourcé', o: "Exemple de la fiche : « 食後 に 、この 薬 を 飲みます ».", m: "Forme du dictionnaire de l'exemple (飲みます → 飲む), réduit à 薬を. Critère 1. Le commentaire français est hors périmètre." },
  v_65_s2: { v: 'écart', f: 'construit', o: "頭を使う : ancien exemple « よく 頭 を 使います ». 頭がいい : aucune ; la fiche parle de « l'intelligence et la matière grise », sans cette expression.", m: "**頭を使う est sourcé** (critère 1). **頭がいい est construit** : le sens est attesté, l'expression ne l'est pas.", k: "`nuance` (sens 2) : « 頭を使う : réfléchir. »", r: "Ce sens porte aussi la modification n° 2 du volet 2 (`semantic_type` : `null` → `propriete`) : autre champ, les deux s'ajoutent sans se toucher." },
  v_283: { v: 'sourcé', o: "Exemple de la fiche : « 風邪 を ひいて 、学校 を やすみました » ; nuance : « homophone de 風 kaze signifiant le vent ».", m: "風邪をひく est la forme du dictionnaire de l'exemple (ひいて → ひく), critère 1. **風 est écrit par la fiche**, avec son sens : le renvoi est appuyé (critère 2), et l'identité du mot (風, le vent) est établie, non seulement la lecture." },
  v_603: { v: 'écart', f: 'graphie', o: "髪を切る : exemple de la fiche « 髪 を 切ります ». 紙 et 神 : la fiche dit « l'homophone kami qui signifie « papier » ou « dieu » », sans écrire ces kanji.", m: "**髪を切る est sourcé** (critère 1). **Les graphies 紙 et 神 ne le sont pas** : la fiche atteste les homophones par leur sens et leur lecture, non par leur graphie. Même cas que 橋 (箸, V2-29).", k: "`nuance` (ENTRY) : « 髪を切る : se faire couper les cheveux. Ne pas confondre avec les homophones « papier » et « dieu ». »", r: "Les trois anciens exemples rangés sous `n5_v_603` portent sur はし (les baguettes), non sur 髪 : ils ne prouvent rien ici. Signalé pour mémoire ; les sources figées ne sont pas touchées." },
  v_633: { v: 'écart', f: 'renvoi', o: "Aucune. La fiche ne cite ni 方 ni かた ; elle parle du suffixe de nationalité (日本人).", m: "Renvoi à une autre ENTRY publiée que la fiche ne cite pas (critère 2). La nuance n'a pas d'autre contenu.", k: RETIREE },
  v_657: { v: 'écart', f: 'renvoi', o: "女の人 : nuance de la fiche (« onna no hito pour une femme adulte ») et ancien exemple « あの 女 の 人 は ». 女性 : aucune. D0095 cite 女性 pour écarter un emploi (« Emploi de formulaire (女性 sur les documents) ; non repris »).", m: "**女の人 est sourcé** (critère 1). **女性 ne l'est pas** : la fiche ne le cite pas, et D0095, qui le nomme pour écarter une traduction, n'en donne aucun fondement dans les sources.", k: "`nuance` (ENTRY) : « Terme direct, un peu brusque pour désigner quelqu'un ; plus poli : 女の人. »" },
  v_660: { v: 'écart', f: 'renvoi', o: "Aucune. La fiche ne parle que de sa propre épouse ; elle ne cite pas 奥さん.", m: "Renvoi à une autre ENTRY publiée que la fiche ne cite pas (critère 2).", k: "`nuance` (ENTRY) : « Terme humble pour sa propre épouse, face à un tiers. »" },
  v_667: { v: 'écart', f: 'renvoi', o: "あの方 : nuance de la fiche (« ano kata cette personne-là ») et exemple « あの 方 は どなた です か ». どの方 : aucune. 人 : aucun texte de la fiche ne l'écrit.", m: "**あの方 est sourcé** (critère 1). **どの方 est construit**, et **人 est un renvoi que la fiche ne fait pas** (critère 2) : elle dit « une personne avec respect », sans nommer le terme neutre.", k: "`nuance` (ENTRY) : « Terme respectueux pour désigner une personne : あの方 (cette personne). »" },
  v_686: { v: 'écart', f: 'renvoi', o: "男の人 : nuance de la fiche (« otoko no hito pour un homme adulte ») et ancien exemple « 男 の 人 が ジョギング ». 男性 : aucune. D0093 cite 男性 pour écarter « Sexe masculin » (« emploi de formulaire (男性), non repris »).", m: "Même cas que 女 : **男の人 est sourcé**, **男性 ne l'est pas** (D0093 ne le fonde pas dans les sources).", k: "`nuance` (ENTRY) : « Terme direct, un peu brusque pour désigner quelqu'un ; plus poli : 男の人. »" },
  v_687: { v: 'écart', f: 'construit', o: "皆さん、こんにちは : aucune ; la fiche a « 皆さん 、 おはよう ござい ます » et « 皆さん、質問 は あります か ». 皆 (みんな) : la fiche dit « formé à partir du mot minna (tous) » ; elle écrit 皆 seulement dans 皆[みな]さん, lu みな.", m: "**皆さん、こんにちは est construit** : la salutation est changée. **皆 (みんな) associe une graphie et une lecture que la fiche n'associe pas** : elle donne minna en romaji, et le kanji 皆 lu みな. Le mot minna est attesté ; sa graphie 皆 ne l'est pas pour ce mot.", k: "`nuance` (ENTRY) : « Forme respectueuse pour s'adresser à un groupe : 皆さん、おはようございます. Plus neutre : みんな. », la salutation de l'exemple et le mot de la fiche en kana.", r: "みんな transcrit en kana le romaji de la fiche, comme les lectures de 匹 (V2-24) et de 来る (V2-25), retenues. Le SENSE `v_687_s1` porte la modification n° 5 du volet 2 (`category`) : autre champ." },
  v_716: { v: 'écart', f: 'construit', o: "変な顔をする : aucune ; l'ancien exemple a « みんな で 明るい 顔 を します ». 顔色 : aucune. D0112 : « La « mine » est l'expression du même visage [...] reprise dans la nuance ».", m: "**変な顔をする change un mot** de la construction attestée (明るい → 変な) : critère 1 non rempli. **顔色 est un mot ajouté** ; D0112 assume la mine, non ce mot.", k: "`nuance` (ENTRY) : « Désigne aussi l'expression du visage (la mine). », d'après la nuance de la fiche et D0112." },
  v_16: { v: 'sourcé', o: "Nuance de la fiche : « on utilise plutôt 兄[あに] (ani) ».", m: "Faux positif présumé, contre-vérifié : 兄 est écrit dans la fiche avec sa lecture. **Identité du mot** (graphie et lecture), non simple identité de lecture. Critère 2." },
  v_42: { v: 'écart', f: 'graphie', o: "Nuance de la fiche : « par opposition au terme familier 巡査an ou au plus courant omawarisan ». お巡りさん n'est écrit dans aucun texte de la fiche.", m: "Faux positif présumé, **rapproché par le romaji** : le mot omawarisan est bien attesté (identité du mot), **sa graphie お巡りさん ne l'est pas** dans cette fiche. Une graphie n'est sourcée que si la fiche l'atteste pour ce mot (critère confirmé au lot 00).", k: "`nuance` (ENTRY) : « Terme neutre, plus formel. Dans la conversation courante : おまわりさん. », le romaji de la fiche transcrit en kana.", r: "Comme pour みんな (皆さん), la transcription en kana d'un romaji de la fiche suit les précédents de 匹 et de 来る. Si l'arbitrage préfère ne garder aucun japonais, « le terme plus courant omawarisan » serait l'autre forme." },
  v_61: { v: 'sourcé', o: "Nuance de la fiche : « Équivalent soutenu ou médical de 体[からだ] (karada) ».", m: "Faux positif présumé, contre-vérifié : 体 et からだ sont écrits ensemble dans la fiche. Identité du mot établie. Critère 2." },
  v_465: { v: 'sourcé', o: "頭が痛い : ancien exemple « 頭 が 痛くて、仕事 が できません » (et l'exemple « あたま が 痛い です »). 痛い！ : la nuance de la fiche décrit l'emploi « comme interjection [...] (« Aïe ! ») » ; D0139 : « Emploi exclamatif repris dans la nuance ».", m: "Faux positif présumé, que le tri avait rapproché **par la lecture** (あたま de l'exemple) : la contre-vérification trouve **la graphie 頭 dans l'ancien exemple**, forme du dictionnaire de 痛くて (critère 1). 痛い！ est le mot de l'ENTRY dans l'emploi que la fiche décrit et que D0139 assume." },
  v_656: { v: 'écart', f: 'graphie', o: "Nuance de la fiche : « on utilise plutôt des termes comme kanai (かない) ou tsuma (つま) ». Les graphies 家内 et 妻 ne sont dans aucun texte de la fiche.", m: "Faux positif présumé : le tri avait retrouvé かない par la lecture. **Les mots sont attestés, en kana ; leurs graphies en kanji ne le sont pas dans cette fiche.** 家内 est par ailleurs une ENTRY publiée, mais le critère est l'attestation par la fiche examinée (lot 00 ; 無くなる, V2-32).", k: "`nuance` (ENTRY) : « Terme respectueux pour l'épouse d'autrui ; sert aussi à s'adresser à une femme mariée. Pour sa propre épouse : かない ou つま. », les graphies de la fiche.", r: "Cas exactement parallèle à 無くす (なくなる) : la fiche écrit le mot en kana, la nuance le publie en kanji." },
  v_690_s1: { v: 'sourcé', o: "Anciens exemples : « 父 は 背 が 高くて » (furigana mal formés dans la source, « 高たかくて ») et « 弟 は 背 が 低いです ».", m: "Faux positif présumé, que le tri avait rapproché par la lecture : la contre-vérification trouve **les deux expressions écrites en kanji** dans les anciens exemples, à la forme du dictionnaire (高くて → 高い ; 低いです → 低い). Critère 1. La nuance de la fiche nomme aussi « se ga takai »." },
  v_23: { v: 'sourcé', o: "Nuance de la fiche : « Le suffixe -tachi indique le pluriel mais est ici figé dans le mot » ; mot de la fiche : 友達.", m: "Le caractère 達 n'est pas un mot ajouté : c'est l'élément du mot 友達, que la fiche écrit, et que la fiche elle-même identifie comme le suffixe du pluriel. La nuance publiée désigne cet élément sous la graphie que le mot de la fiche lui donne. Aucune graphie n'est reconstituée.", r: "**Cas discutable** : la fiche nomme le suffixe en romaji (-tachi), non sous la forme 達 isolée. Si l'arbitrage tient qu'un élément ne peut être cité isolément que si la fiche l'isole, l'unité est un écart, et la correction serait : « Désigne un ou plusieurs amis : le suffixe marque à l'origine le pluriel, mais 友達 s'emploie aussi pour un seul ami. »" }
};

// Exhaustivité : exactement le lot 01 de la tranche 2 du périmètre arbitré
const bloc = plan.tranche2.filter((u) => u.lotN === '01');
const unites = bloc.map((u) => court(u.sens));
if (bloc.length !== 34 || Object.keys(F).length !== 34 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`lot 01 : manquantes ${unites.filter((u) => !F[u])} ; en trop ${Object.keys(F).filter((k) => !unites.includes(k))}`);
for (const [id, f] of Object.entries(F)) if ((f.v === 'écart') !== Boolean(f.k) || (f.v === 'écart') !== Boolean(f.f)) throw new Error(`correction ou famille incohérente : ${id}`);
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
if (!r00.includes('**arbitré le 2026-10-10**')) throw new Error('lot 00 non arbitré');
const DERNIER_V2 = Math.max(...[...r00.matchAll(/^\| V2-(\d+) \|/gm)].map((m) => Number(m[1])));
if (DERNIER_V2 !== 32) throw new Error(`dernier numéro V2 : ${DERNIER_V2}`);

const src = unites.filter((c) => F[c].v === 'sourcé'), ec = unites.filter((c) => F[c].v === 'écart');
const NUM = new Map(ec.map((c, i) => [c, DERNIER_V2 + i + 1]));
const motDe = (c) => bloc.find((u) => court(u.sens) === c).mot;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
const fp = bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').map((u) => court(u.sens));
const RESTE_AVANT = 259;
const FAM = { renvoi: 'Renvoi non appuyé par la fiche (critère 2)', forme: 'Forme honorifique que la fiche n\'écrit pas (critère 3)', construit: 'Exemple construit ou construction changée (critère 1)', graphie: 'Mot attesté, graphie non attestée pour ce mot', decision: 'Renvoi assumé par une décision au fondement vérifiable à moitié' };
const parFam = (k) => ec.filter((c) => F[c].f === k);
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : tranche 2, lot 01');
P();
P('**Date** : 2026-10-10');
P('**Statut** : **arbitré le 2026-10-10** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **10 sourcés, 24 écarts**, les 34 verdicts proposés confirmés, V2-33 à V2-56 retenues sans modification de leur contenu (§M0). **La tranche 2 est close.** La proposition est conservée telle quelle aux §M1 à §M5.');
P();
P('## M0. Arbitrage du 2026-10-10');
P();
P('- **叔母 et 叔父 : écarts V2-35 et V2-36 confirmés.** D0081 et D0083 avaient validé les références à 伯母 et 伯父, mais leur fondement n\'est pas entièrement vérifiable dans les fiches sources. **Les décisions historiques et leurs justifications sont conservées, sans réécriture** ; la nouvelle décision de provenance est celle-ci, et les corrections de base proposées sont retenues. Quand les corrections seront exécutées, ce changement sera porté par une décision nouvelle, à la fin du journal.');
P('- **友達 : sourcé, confirmé.** Le caractère 達 appartient au mot 友達, écrit par la fiche, et le rôle du suffixe y est explicitement décrit : ce n\'est ni un mot nouveau ni une graphie déduite par analogie.');
P('- **Transcriptions en kana : V2-53 (みんな, 皆さん) et V2-55 (おまわりさん, 警官) confirmées**, comme transcriptions en kana de romajis explicitement attestés dans les fiches. **Cela n\'autorise pas à ajouter des graphies en kanji absentes des sources.**');
P('- **Les autres corrections V2-33 à V2-56 sont confirmées**, y compris les cinq retraits complets de nuance (外国人, 子供, 家族, 医者, 人). **Les informations françaises réellement attestées sont préservées** quand les exemples japonais construits sont supprimés, notamment pour 目 (la vue), 耳 (l\'ouïe) et 顔 (la mine).');
P('- **Liste globale : 71 corrections (10 + 5 + 56), toutes non appliquées.** **Restent 225 nuances**, dans les tranches 3 à 8, plus les 2 nuances hors JLPT suivies à part. 377 candidats des axes C1 à C10 et 147 arbitrages du volet 2 inchangés.');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre de la tranche 2 arbitré le 2026-10-10 (ChatGPT, par délégation), livré par lot d\'origine : ce rapport porte sur les **34 nuances du lot 01** (« Personnes, famille, corps et santé ») ; le lot 00 est arbitré. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict antérieur n\'est rouvert. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.');
P();
P('## M1. Résultat proposé');
P();
P('| Verdict proposé | Nuances | Détail |');
P('|---|---|---|');
P(`| **sourcé** | ${src.length} | ${src.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **écart** (E2) | ${ec.length} | ${ec.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **Total** | ${unites.length} | |`);
P();
P('| Famille d\'écart | Nuances |');
P('|---|---|');
for (const k of Object.keys(FAM)) P(`| ${FAM[k]} | ${parFam(k).map((c) => motDe(c)).join(', ')} (${parFam(k).length}) |`);
P();
P('**Ce que le lot montre** :');
P();
P(`- **Le lot 01 est le plus chargé à ce jour** : ${ec.length} nuances sur ${unites.length} portent au moins un élément japonais non sourcé. Le motif dominant est attendu pour des termes de parenté et d'adresse : un terme respectueux ou neutre « qui répond » au mot, ajouté par connaissance extérieure (ご両親, お子さん, ご家族, お医者さん ; 方, 奥さん, 女性, 男性, 外人).`);
P(`- **Les ${fp.length} faux positifs présumés se partagent** : ${fp.filter((c) => F[c].v === 'sourcé').length} sont sourcés, avec identité du mot vérifiée (${fp.filter((c) => F[c].v === 'sourcé').map(motDe).join(', ')}) ; **${fp.filter((c) => F[c].v === 'écart').length} sont des écarts de graphie** (${fp.filter((c) => F[c].v === 'écart').map(motDe).join(', ')}) : mots attestés en romaji ou en kana, publiés sous une graphie que la fiche n'écrit pas. La seule nuance relevée par un caractère isolé (友達, 達) est proposée sourcée, avec réserve.`);
P('- **Quatre décisions validées citent un mot absent des sources** : D0081 et D0083 (伯母, 伯父), D0095 et D0093 (女性, 男性, cités pour écarter une traduction). D0105, D0114, D0116 et D0112 assument un emploi dans la nuance ; cet emploi est attesté par les traductions de la fiche, non par l\'exemple japonais publié. **Aucune n\'est réécrite.** Les corrections gardent l\'information que ces décisions assument quand la fiche la fonde (la santé, la vue, l\'ouïe, la mine), sans l\'exemple japonais construit.');
P(`- **Cinq nuances seraient retirées** (${ec.filter((c) => F[c].k === RETIREE).map(motDe).join(', ')}) : leur seul contenu est l'élément non sourcé.`);
P();
P('## M2. Critères appliqués');
P();
P('Les critères arbitrés le 2026-10-08, et les précédents de la tranche 1, du bloc 1 bis et du lot 00, sans changement : forme du dictionnaire d\'un exemple de la fiche, retrait de mots compris (critère 1) ; renvoi appuyé par la fiche examinée ou par une décision validée **au fondement vérifiable** (critère 2 ; précédent : D0321) ; forme honorifique ou conjuguée non sourcée d\'office (critère 3) ; **une graphie n\'est sourcée que si la fiche, ou sa fiche fusionnée, l\'atteste pour le mot concerné** (critère confirmé au lot 00) ; **la transcription en kana d\'un romaji de la fiche** suit les précédents retenus de 匹 (V2-24) et de 来る (V2-25). Les rapprochements du tri et les caractères isolés n\'ont servi qu\'au repérage.');
P();
P('## M3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}) ; elles ne rejoindront la liste consolidée qu'après arbitrage, à part des 47 déjà retenues.`);
P();
P('| # | Unité | Mot | Famille | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${motDe(c)} | ${F[c].f} | ${F[c].k} |`);
P();
P(`## M4. Les ${unites.length} fiches de provenance`);
P();
P('Les furigana des fiches sont rendus entre crochets : 兄[あに].');
P();
for (const u of bloc) {
  const id = court(u.sens); const f = F[id]; const sid = `n5_${u.entree}`;
  const e = vocab.find((x) => x.id === u.entree); const s = u.niveau === 'sens' ? e.senses.find((x) => x.id === id) : null;
  P(`### \`${id}\` · ${u.mot}${s ? ` · « ${s.meaning.primary} »` : ' · nuance d\'ENTRY'} — **${f.v}**`);
  P();
  for (const x of [sid, ...(fusion.get(sid) ?? [])]) {
    const fi = sources.get(x);
    P(`- **Fiche source** (\`${x}\`${x !== sid ? ', fusionnée' : ''}, ${fi.type}) : mot ${fi.word} (${fi.reading}) ; traductions « ${[fi.meanings.primary, ...(fi.meanings.secondary ?? [])].join(' ; ')} » ; particules ${(fi.particles ?? []).join(', ') || 'aucune'}. Nuance : « ${st(fi.nuance)} » Exemple : « ${st(fi.example?.japanese)} » — « ${st(fi.example?.french)} »`);
    for (const q of ex.vocab?.[x] ?? []) P(`  - Ancien exemple : « ${st(q.japanese)} » — « ${st(q.french ?? q.translation)} »`);
  }
  P(`- **Publié** : ${s ? `nuance du sens : « ${s.nuance} » ; particules du sens : ${(s.particles ?? []).join(', ') || 'aucune'}` : `nuance de l'ENTRY : « ${champs.get(sid)?.nuance} »`}.`);
  P(`- **Décisions de l'ENTRY** : ${decisionsDe(sid).map((d) => `${d.id.replace('A2-04-', '')} (${d.kind}, \`${d.field}\`) : « ${d.reason} »`).join(' ; ') || 'aucune'}.`);
  P(`- **Repérage** : ${u.statut} ; ${u.chaines.length ? `chaînes : ${u.chaines.map((c) => `${c.chaine} (${c.classe.startsWith('B') ? `écartée par le tri, ${u.parLecture.includes(c.chaine) ? 'par la lecture' : 'par la graphie'}` : 'signalée'})`).join(' ; ')}` : 'aucune chaîne signalée'}${u.uns.length ? ` ; caractère isolé : ${u.uns.map((k) => k.c).join(', ')}` : ''}.`);
  P(`- **Origine recherchée** : ${f.o}`);
  P(`- **Verdict proposé** : **${f.v}**${f.f ? ` (${FAM[f.f].toLowerCase()})` : ''}.`);
  P(`- **Verdict arbitré (2026-10-10)** : **${f.v}**, confirmé${f.k ? ` ; correction V2-${NUM.get(id)} retenue sans modification, non appliquée` : ''}.`);
  P(`- **Justification** : ${f.m}`);
  if (f.k) P(`- **Correction proposée, non appliquée (V2-${NUM.get(id)})** : ${f.k}`);
  if (f.r) P(`- **Réserve** : ${f.r}`);
  P();
}
P('## M5. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t2-lot01.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches sont exactement le lot 01 de la tranche 2 arbitrée | oui : ${unites.length} nuances distinctes, ${new Set(bloc.map((u) => u.entree)).size} ENTRY |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${fp.length} faux positifs présumés, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} à caractère isolé seulement |`);
P(`| Verdicts proposés | ${src.length} sourcés, ${ec.length} écarts ; total ${unites.length} |`);
P(`| Un écart a une famille et une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}, à la suite de V2-32 |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé ; ${bloc.filter((u) => u.dans147.length).length} nuances portent sur un sens des 147, non rouvert |`);
P(`| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : ${bloc.filter((u) => u.candidats377.length).map((u) => u.mot).join(', ')} restent candidats pour leurs propres relevés |`);
P(`| Verdicts arbitrés (2026-10-10) | ${src.length} sourcés, ${ec.length} écarts ; les ${unites.length} confirmés |`);
P('| Corrections retenues | avant l\'arbitrage : 47 ; après : **71 (10 + 5 + 56)**, aucune appliquée |');
P('| **Tranche 2, clôture** | bloc 1 bis 10 (5 sourcés, 5 écarts) + lot 00 9 (7, 2) + lot 01 34 (10, 24) = **53 nuances, 22 sourcées, 31 écarts**, toutes arbitrées ; corrections V2-26 à V2-56 |');
P(`| **Décompte du chantier** | ${RESTE_AVANT} nuances restaient à lire après le lot 00 ; **${unites.length} sont contrôlées dans ce lot** ; **${RESTE_AVANT - unites.length} restent**, toutes dans les tranches 3 à 8. **La tranche 2 serait close** avec l'arbitrage de ce lot (bloc 1 bis : 10 ; lot 00 : 9 ; lot 01 : 34). Les 2 nuances hors JLPT restent comptées à part. |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot01.md'), md);
console.log(`lot 01 : ${src.length} sourcés, ${ec.length} écarts ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} ; reste ${RESTE_AVANT - unites.length}`);
