// A2-05 · volet 1 · lot 2 (provenance) · tranche 6, livraison 6a (lot 10, positions relatives : 10 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t6-6a.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6a.md
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
const r5c = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5c.md'), 'utf8');
const rT6 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-tranche6-perimetre.md'), 'utf8');
const bilan = readFileSync(join(root, 'docs/rapports/etape2-A2-05-bilan-volet2.md'), 'utf8');
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_43: { v: 'sourcé', o: "隣の人 : ancien exemple « 隣 の 人 と おしゃべり を しない で ください ». 隣の席 : ancien exemple « 私 の 隣 の 席 に 座りました ». 隣の家 : aucun texte de la fiche n'écrit cette suite ; l'exemple et un ancien exemple ont l'ordre inverse, « 私 の 家 の 隣 に » ; la nuance de la fiche dit « souvent utilisé avec la particule の (no) pour qualifier un objet, une personne ou un lieu » ; la fiche donne « Maison d'à côté » parmi ses traductions. D0592 : « le voisin et la maison d'à côté en sont des emplois avec の, repris dans la nuance », sans écrire d'expression japonaise.", m: "**隣の人 et 隣の席 sont sourcés** : ce sont les suites mêmes des anciens exemples, privées de leur contexte (critère 1). **隣の家 est proposé sourcé, par la précision arbitrée en 5b** : la description de la fiche autorise expressément la construction 隣 + の + nom pour qualifier un lieu, la fiche nomme elle-même « Maison d'à côté » comme traduction, et le mot 家 y est écrit sous cette graphie. Le mot et la construction sont ceux de la fiche ; aucun élément n'est tiré d'une connaissance extérieure. C'est le cas de 泳ぐ (プールで泳ぐ), non celui de 聞く sens 2 (先生に聞く), où le complément ne venait d'aucun texte de la fiche.", r: "**Cas à confirmer.** L'ordre attesté par les exemples est 家の隣, non 隣の家 ; D0592 ne source rien par elle-même (une décision qui fonde un découpage ne source pas une expression). Si l'arbitrage exige la suite écrite dans la fiche, l'unité est un écart, et la correction serait : « L'emplacement immédiatement voisin : 隣の人, le voisin ; 隣の席, la place d'à côté. »" },
  v_341: { v: 'écart', f: 'homophone', o: "駅のそば : ancien exemple « 駅 の そば に 便利な スーパー が オープン しました ». 蕎麦 : absent de la fiche (qui ne donne que la graphie 側, dans sa nuance), de ses anciens exemples, et **de toutes les sources figées** : aucune fiche ni aucun ancien exemple n'écrit 蕎麦, ni ne parle de nouilles ; le romaji soba n'apparaît que dans la fiche de そば. D0595 : « Rien n'est repris de l'homophone 蕎麦. »", m: "**駅のそば est sourcé** (ancien exemple, critère 1). **L'homophone 蕎麦 ne l'est pas** : la fiche ne signale aucun homophone, et D0595, qui le nomme, n'a aucun fondement vérifiable dans les sources figées. Ce n'est donc pas un « assumé » : à la différence de 弾く (5c), où la fiche de 引く portait l'emploi confondu, aucune fiche ne documente ici le second mot. Même famille que 紙 (髪, 神 : V2-75) et 花 (鼻 : V2-30).", k: "`nuance` (ENTRY) : « Tout près de quelqu'un ou de quelque chose : 駅のそば. », sans la mention de l'homophone." },
  v_345: { v: 'sourcé', o: "Ancien exemple : « 机 の 上 に 大切 な 書類 と ペン が 置いて あります » ; exemple de la fiche : « つくえ の 上 に ほん が あります » ; nuance : « souvent utilisé avec la particule no pour marquer la localisation ».", m: "机の上に est la suite même de l'ancien exemple, avec sa graphie 机 (critère 1) ; la particule の est nommée par la nuance, に figure dans l'exemple et l'ancien exemple. Unité relevée par les seuls caractères の et に : ce sont les particules de la construction citée, non des mots isolés." },
  v_346: { v: 'écart', f: 'decision', o: "箱の中に : ancien exemple « 箱 の 中 に は かわいい おもちゃ や ぬいぐるみ が 入っています ». ちゅう, じゅう, 〜中 suffixe : absents de la fiche de 中, qui ne donne que la lecture なか. D0581 : « Aucun sens n'est repris du suffixe 〜中. », sans lecture. Dans les sources figées, 中 lu ちゅう ou じゅう n'apparaît que dans les anciens exemples d'autres fiches, après un nom : 授業中[ちゅう] (隣), 午前 中[ちゅう] (午前), 一日 中[じゅう] (一日, 昨日), 世界中[せかいじゅう] (学校, 自動車, 旅行, 映画) ; **aucune fiche ne décrit un suffixe 〜中**.", m: "**箱の中に est sourcé** (ancien exemple, privé de は ; critère 1). **La phrase sur le suffixe ne l'est pas** : ni les deux lectures ni la qualité de suffixe ne sont dans la fiche examinée ; D0581 nomme le suffixe sans donner ses lectures, et son fondement n'est vérifiable qu'en partie : les sources attestent des emplois de 中 lu ちゅう ou じゅう derrière un nom, non que 〜中 soit « un suffixe, une autre unité ». Fondement partiel, comme 文章 (D0443, V2-96) : écart.", k: "`nuance` (ENTRY) : « Avec の et に : 箱の中に, dans la boîte. », sans la phrase sur 〜中.", r: "**Cas discutable.** Les lectures ちゅう et じゅう de 中 sont bien attestées dans des anciens exemples d'autres fiches, et D0581 est une décision validée qui mentionne le suffixe : l'arbitrage peut y voir un « assumé ». Le rapprochement du tri avec 十 (じゅう) est un homophone sans rapport avec la nuance." },
  v_352: { v: 'sourcé', o: "外で遊ぶ : ancien exemple « 子供 たち は 外 で 元気 よく 遊んでいます ». 中 : la nuance de la fiche dit « par opposition à l'intérieur d'un bâtiment ou d'un lieu clos » ; ancien exemple « 部屋 の 中[なか] が 暑かった ので、ちょっと 外 の 空気 を 吸い に 出ました ».", m: "外で遊ぶ est la forme du dictionnaire de l'ancien exemple, privé de 元気よく, la particule で intacte (critère 1) ; で est aussi la particule que la nuance nomme. Le renvoi à 中 est appuyé par la fiche examinée : elle énonce l'opposition à l'intérieur, et son ancien exemple écrit 中, lu なか, pour l'intérieur (critère 2)." },
  v_354: { v: 'sourcé', o: "Ancien exemple : « 家 の 後ろ に は、緑 が たくさん ある 静かな 山 が あります » ; nuance : « souvent utilisé avec la particule no pour marquer la localisation ».", m: "家の後ろ est la suite même de l'ancien exemple (critère 1) ; の est la particule que la nuance nomme. Unité relevée par le seul caractère の." },
  v_356: { v: 'écart', f: 'renvoi', o: "横に置く : ancien exemple « ベッド の 横 に 小さな テーブル を 置いて、スマホ や グラス を 置いています ». 縦 : absent de la fiche de 横 (ni 縦, ni tate), de ses anciens exemples et de ses décisions (D0589 à D0591) ; la fiche donne « Horizontal » parmi ses traductions, sans nommer de contraire. Seule la fiche de 縦 (`n5_v_597`) écrit l'opposition, dans l'autre sens.", m: "**横に置く est sourcé** : forme du dictionnaire de l'ancien exemple, privé de ベッドの et de l'objet 小さなテーブルを, la particule に et le verbe 置く intacts (critère 1). **Le renvoi à 縦 n'a pas d'appui** dans la fiche examinée ni dans une décision : l'attestation par la fiche de 縦, sans décision, ne suffit pas (critère 2 ; doctrine de お手洗い / トイレ, V2-76, et de 教室, V2-87). L'information « sens horizontal » est attestée par la fiche (« côté horizontal », traduction « Horizontal ») et par D0589 : elle est conservée.", k: "`nuance` (ENTRY) : « L'espace juste à côté ou le flanc : 横に置く ; aussi le sens horizontal. », sans le renvoi à 縦.", r: "横に置く retire de l'exemple le complément d'objet de 置く : je le tiens pour un retrait de mots, la construction 横に + 置く restant celle de l'exemple. Si l'arbitrage y voit une construction changée, la partie sourcée serait « ベッドの横に », suite même de l'exemple de la fiche." },
  v_597: { v: 'écart', f: 'construit', o: "横 : nuance de la fiche, « par opposition à yoko (横) qui désigne l'horizontale ou la largeur ». 縦に書く : aucune ; la fiche a « この かみ は 縦 が ながい です », et ses anciens exemples « テーブル の たて は 1メートル です », « 紙 の たて と 横 の 長さ を 測ります », « この 部屋 の たて の 広さ » ; le verbe 書く n'y figure pas, ni la construction 縦に.", m: "**Le contraire 横 est sourcé** : la fiche l'écrit et l'explique. **縦に書く est construit** : ni le verbe ni la construction avec に ne sont dans un texte de la fiche (critère 1).", k: "`nuance` (ENTRY) : « La dimension de haut en bas, ou le sens de la longueur ; contraire : 横 (l'horizontale, la largeur). », sans 縦に書く." },
  v_630: { v: 'écart', f: 'graphie', o: "Nuance de la fiche : « généralement suivi de la particule de lieu ni (下に) » ; exemple : « ねこ は つくえ の 下 に い ます ». **La fiche de 下 n'écrit jamais 机** : son exemple a つくえ en kana, et ses anciens exemples ont テーブル, ベッド et 木 (« テーブル の 下 に います », « ベッド の 下 を 掃除 して ください », « この 木 の 下 で »). La graphie 机 est celle de la fiche de 机 (`n5_v_145`) et d'un ancien exemple de 上.", m: "Faux positif présumé, rapproché par la lecture つくえ : **le défaut du tri se vérifie**. La construction つくえの下に est sourcée (exemple de la fiche) ; **la graphie 机 ne l'est pas pour cette fiche**, qui écrit le mot en kana : une graphie n'est sourcée que si la fiche l'atteste (critère confirmé au lot 00 ; 脱ぐ, くつ pour 靴 : V2-79 ; スリッパ, げんかん pour 玄関 : V2-80). L'écart est de graphie seulement : c'est une insuffisance de provenance, non une erreur.", k: "`nuance` (ENTRY) : « Avec に : つくえの下に, sous le bureau. », la graphie de l'exemple de la fiche." },
  v_696: { v: 'écart', f: 'decision', o: "裏 : la nuance de la fiche dit « par opposition à ura pour l'envers ou le verso » ; anciens exemples « シャツ の 表 と 裏[うら] を », « コイン の 表 が 出る か 裏[うら] が 出る か ». ひょう, « tableau » : absents de la fiche, de ses anciens exemples, et de toutes les fiches des sources figées ; dans les anciens exemples, ひょう n'apparaît que dans des composés (目標, 氷点下, 表紙[ひょうし]). D0603 : « Aucun sens n'est repris de 表 lu ひょう (tableau). »", m: "**Le contraire 裏 est sourcé** : la fiche le nomme (ura) et ses anciens exemples l'écrivent, sous cette graphie, dans l'opposition même. **La phrase sur 表 lu ひょう ne l'est pas** : la fiche ne signale ni autre lecture ni autre mot, et D0603, qui les nomme, n'a aucun fondement vérifiable dans les sources figées. Décision au fondement absent des sources, comme D0214 (ナイフ) et D0195 (辛い), arbitrées au lot 02.", k: "`nuance` (ENTRY) : « Le côté visible, la face avant, le recto, l'extérieur d'un bâtiment ; contraire : 裏 (l'envers). », sans la phrase sur 表 lu ひょう.", r: "La correction retenue au volet 2 pour `v_696_s1` (n° 3 : `semantic_type` → `lieu`) porte sur un autre champ ; elle n'est ni rouverte ni touchée." }
};

const POSITION = ['隣', 'そば', '上', '中', '下', '外', '後ろ', '横', '縦', '表'];
const bloc = plan.toutes.filter((u) => u.tranche === '6' && u.lotN === '10' && POSITION.includes(u.mot));
const unites = bloc.map((u) => court(u.sens));
if (!r5c.includes('**arbitré le 2026-10-12**') || !r5c.includes('**La tranche 5 est close.**')) throw new Error('tranche 5 non close');
if (!rT6.includes('**périmètre arbitré le 2026-10-12**') || !rT6.includes('6a (10)')) throw new Error('périmètre de la tranche 6 non arbitré');
if (bloc.length !== 10 || Object.keys(F).length !== 10 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`6a : manquantes ${unites.filter((u) => !F[u])} ; en trop ${Object.keys(F).filter((k) => !unites.includes(k))}`);
if (bloc.some((u) => u.niveau !== 'entree')) throw new Error('6a : une unité n\'est pas une nuance d\'ENTRY');
if (new Set(bloc.map((u) => u.mot)).size !== 10 || POSITION.some((m) => !bloc.some((u) => u.mot === m))) throw new Error('6a : les dix mots attendus');
for (const [id, f] of Object.entries(F)) if (!['sourcé', 'assumé', 'écart'].includes(f.v) || (f.v === 'écart') !== Boolean(f.k) || (f.v === 'écart') !== Boolean(f.f)) throw new Error(`verdict, correction ou famille incohérents : ${id}`);
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
// Depuis l'arbitrage de 6a, le bilan porte aussi V2-110 à V2-115 : la proposition se recalcule sur les 124 lignes d'avant.
const CORR_TOUT = [...bilan.matchAll(/^\| (V[12]-\d+|\d+) \| `((?:hj_)?v_\d+)(_s\d+)?`/gm)].map((m) => ({ n: m[1], entree: m[2] }));
const CORR = CORR_TOUT.filter((c) => !(c.n.startsWith('V2-') && Number(c.n.slice(3)) > 109));
if (CORR.length !== 124 || new Set(CORR.map((c) => c.n)).size !== 124) throw new Error(`corrections : ${CORR.length} lignes au lieu de 124`);
if (CORR_TOUT.length < 124 || new Set(CORR_TOUT.map((c) => c.n)).size !== CORR_TOUT.length) throw new Error(`bilan : ${CORR_TOUT.length} lignes de correction`);
const DERNIER_V2 = Math.max(...CORR.filter((c) => c.n.startsWith('V2-')).map((c) => Number(c.n.slice(3))));
if (DERNIER_V2 !== 109) throw new Error(`dernier numéro V2 : ${DERNIER_V2}`);
const reste = plan.toutes.filter((u) => ['6', '7', '8'].includes(u.tranche) && !bloc.includes(u));
const RESTE_AVANT = 130;
if (RESTE_AVANT - unites.length !== reste.length) throw new Error(`décompte : ${RESTE_AVANT - unites.length} contre ${reste.length} au plan`);
const resteT6 = reste.filter((u) => u.tranche === '6').length;

const src = unites.filter((c) => F[c].v === 'sourcé'), ass = unites.filter((c) => F[c].v === 'assumé'), ec = unites.filter((c) => F[c].v === 'écart');
const NUM = new Map(ec.map((c, i) => [c, DERNIER_V2 + i + 1]));
const motDe = (c) => bloc.find((u) => court(u.sens) === c).mot;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
const dejaCorr = ec.filter((c) => CORR.some((x) => x.entree === c));
const entreesApres = new Set([...CORR.map((c) => c.entree), ...ec]).size;
const FAM = { construit: 'Exemple construit (critère 1)', renvoi: 'Renvoi sans appui dans la fiche ni dans une décision (critère 2)', homophone: 'Homophone ajouté, absent des sources figées', decision: 'Information portée par une décision au fondement absent ou partiel dans les sources', graphie: 'Graphie non attestée par la fiche pour le mot' };
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : tranche 6, livraison 6a (lot 10, positions relatives)');
P();
P('**Date** : 2026-10-12');
P('**Statut** : **arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **4 sourcés, 0 assumé, 6 écarts**, les dix verdicts confirmés, V2-110 à V2-115 retenues sans modification. La proposition est conservée telle quelle ci-dessous.');
P();
P('## W0. Arbitrage du 2026-10-12');
P();
P('- **Sourcés, confirmés** : 隣, 上, 外, 後ろ (nuances d\'ENTRY). **隣, y compris 隣の家** : la fiche documente expressément la construction 隣 + の + nom de lieu, donne « Maison d\'à côté » parmi ses traductions et écrit 家 ; la combinaison est recevable sans exiger un exemple mot pour mot. 上 : 机の上に, ancien exemple. 外 : 外で遊ぶ et le renvoi à 中, appuyés par la fiche. 後ろ : 家の後ろ, ancien exemple.');
P('- **Écarts confirmés** : V2-110 そば (蕎麦 retiré, non attesté par les sources figées ; 駅のそば conservé) ; V2-111 中 (la phrase sur 〜中 lu ちゅう ou じゅう retirée : les anciens exemples d\'autres fiches attestent des lectures, non entièrement l\'affirmation grammaticale publiée ; D0581 reste une décision historique au fondement partiel) ; V2-112 横 (横に置く conservé, réduction admissible de l\'ancien exemple ; renvoi à 縦 retiré, absent de la fiche et des décisions de l\'ENTRY) ; V2-113 縦 (縦に書く retiré, construit ; le contraire 横 conservé, expressément attesté) ; V2-114 下 (机 remplacé par つくえ, graphie de l\'exemple source) ; V2-115 表 (la mention de 表 lu ひょう retirée, absente des sources ; 裏 conservé, attesté).');
P('- **Les corrections de repli proposées pour 隣 et pour 横 ne sont pas employées.**');
P('- **Précisions méthodologiques**, propres au contrôle de provenance, sans nouvelle règle normative : (1) une construction expressément autorisée par une fiche, combinée à des éléments documentés par cette même fiche, peut être sourcée, conformément au précédent de 話す ; (2) une simple attestation d\'une lecture dans d\'autres exemples ne suffit pas à établir une catégorie grammaticale ou une unité lexicale autonome ; (3) une réduction d\'exemple peut supprimer un complément sans modifier la construction essentielle attestée.');
P('- **Liste globale unique : 130 corrections (10 + 5 + 115), dans 117 ENTRY, toutes non appliquées.** **Restent 120 nuances du plan** : 37 dans la tranche 6 (6b : 9 ; 6c : 10 ; 6d : 7 ; 6e : 11), 83 dans les tranches 7 (39) et 8 (44).');
P('- **Inchangés** : les 377 candidats C1 à C10 et les 147 arbitrages du volet 2. **D0595, D0581, D0603 et les autres décisions historiques ne sont pas réécrites.**');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre de la tranche 6 arbitré le 2026-10-12 (ChatGPT, par délégation), en cinq livraisons ; ce rapport porte sur les **10 nuances de la livraison 6a** ; 6b ne sera commencée qu\'après l\'arbitrage de celle-ci. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict antérieur n\'est rouvert. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.');
P();
P('## W1. Résultat proposé');
P();
P('| Verdict proposé | Nuances | Détail |');
P('|---|---|---|');
P(`| **sourcé** | ${src.length} | ${src.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **assumé** | ${ass.length} | ${ass.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ') || '—'} |`);
P(`| **écart** (E2) | ${ec.length} | ${ec.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **Total** | ${unites.length} | |`);
P();
P('**Ce que la livraison montre** :');
P();
P('- **Les locutions de position viennent des anciens exemples**, telles quelles ou à la forme du dictionnaire : 隣の人, 隣の席, 駅のそば, 机の上に, 箱の中に, 外で遊ぶ, 家の後ろ, 横に置く. Aucune n\'est en cause, à une graphie près (机, pour 下).');
P('- **Les écarts viennent presque tous d\'une phrase ajoutée à la locution** : un homophone (蕎麦, pour そば), un autre mot écrit du même kanji (〜中 lu ちゅう ou じゅう ; 表 lu ひょう), un contraire (縦, pour 横). Trois de ces ajouts reprennent une décision de journal (D0595, D0581, D0603) qui écartait un sens en nommant l\'autre mot ; **aucune des trois n\'a de fondement complet dans les sources figées** : 蕎麦 et 表 lu ひょう n\'y figurent nulle part, et le suffixe 〜中 n\'y est décrit par aucune fiche.');
P('- **Le couple 横 / 縦 n\'est pas symétrique** : la fiche de 縦 écrit et explique son contraire 横 (sourcé) ; la fiche de 横 ne nomme pas 縦 (écart). C\'est la doctrine arbitrée pour お手洗い et トイレ.');
P('- **下 confirme le défaut du tri** : 机の下に avait été écarté comme faux positif par la lecture つくえ ; la fiche de 下 n\'écrit le mot qu\'en kana. La même locution est sourcée pour 上, dont un ancien exemple écrit 机.');
P('- **Aucun « assumé »** dans cette livraison : aucune décision n\'y introduit un élément dont l\'origine se vérifie entièrement dans les sources.');
P('- **Deux cas à confirmer** : 隣 (隣の家, proposé sourcé par la précision de 5b) et 中 (proposé écart, fondement partiel).');
P();
P('## W2. Critères appliqués');
P();
P('Ceux des livraisons précédentes, sans changement : forme du dictionnaire et retrait de mots non essentiels admis si la construction attestée reste intacte, complément ou particule changés non admis (5a) ; **une variante expressément autorisée par la description de la fiche peut être sourcée si elle conserve le mot et la construction** (5b, précision propre au contrôle de provenance) ; renvoi appuyé par la fiche examinée ou par une décision au fondement vérifiable (critère 2), une attestation dans une autre fiche, sans décision, ne suffisant pas ; graphie sourcée seulement si la fiche l\'atteste pour le mot ; une décision qui nomme une expression ou un autre mot ne les source pas par elle-même ; classement **sourcé / assumé / écart** ; information française attestée préservée dans les corrections.');
P();
P('## W3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}) ; elles ne rejoindront la liste globale unique qu'après arbitrage, à part des 124 déjà retenues. ${dejaCorr.length ? `Une ENTRY de 6a porte déjà une correction retenue, sur un autre champ : ${dejaCorr.map((c) => `${motDe(c)} (${CORR.filter((x) => x.entree === c).map((x) => (/^\d+$/.test(x.n) ? `volet 2, n° ${x.n}` : x.n)).join(', ')})`).join(' ; ')}.` : 'Aucune ENTRY de 6a n\'est visée par une correction déjà retenue.'} **Chaque correction retire un élément et conserve tout le reste de la nuance ; aucune n'ajoute de contenu** (pour 下, une graphie est remplacée par celle de la fiche).`);
P();
P('| # | Unité | Mot | Famille | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${motDe(c)} | ${F[c].f} | ${F[c].k} |`);
P();
P(`## W4. Les ${unites.length} fiches de provenance`);
P();
P('Les furigana des fiches sont rendus entre crochets. Chaque fiche source est donnée en entier : traductions, particules, nuance, exemple, anciens exemples ; puis l\'état publié et toutes les décisions de journal de l\'ENTRY.');
P();
for (const u of bloc) {
  const id = court(u.sens); const f = F[id]; const sid = `n5_${u.entree}`;
  const e = vocab.find((x) => x.id === u.entree);
  P(`### \`${id}\` · ${u.mot} · nuance d'ENTRY — **${f.v}**`);
  P();
  for (const x of [sid, ...(fusion.get(sid) ?? [])]) {
    const fi = sources.get(x);
    P(`- **Fiche source** (\`${x}\`${x !== sid ? ', fusionnée' : ''}, ${fi.type}) : mot ${fi.word} (${fi.reading}) ; traductions « ${[fi.meanings.primary, ...(fi.meanings.secondary ?? [])].join(' ; ')} » ; particules ${(fi.particles ?? []).join(', ') || 'aucune'}. Nuance : « ${st(fi.nuance)} » Exemple : « ${st(fi.example?.japanese)} » — « ${st(fi.example?.french)} »`);
    for (const q of ex.vocab?.[x] ?? []) P(`  - Ancien exemple : « ${st(q.japanese)} » — « ${st(q.french ?? q.translation)} »`);
  }
  if (e.nuance !== champs.get(sid)?.nuance) throw new Error(`nuance publiée différente de celle du lot : ${id}`);
  P(`- **Publié** : nuance de l'ENTRY : « ${e.nuance} » ; sens : ${e.senses.map((s) => `\`${s.id}\` « ${s.meaning.primary} »${s.particles?.length ? ` (particules : ${s.particles.join(', ')})` : ''}`).join(' ; ')}.`);
  P(`- **Décisions de l'ENTRY** : ${decisionsDe(sid).map((d) => `${d.id.replace('A2-04-', '')} (${d.kind}, \`${d.field}\`) : « ${d.reason} »`).join(' ; ') || 'aucune'}.`);
  P(`- **Repérage** : ${u.statut} ; ${u.chaines.length ? `chaînes : ${u.chaines.map((c) => `${c.chaine} (${c.classe.startsWith('B') ? `écartée par le tri, ${u.parLecture.includes(c.chaine) ? 'par la lecture' : 'par la graphie'}` : 'signalée'})`).join(' ; ')}` : 'aucune chaîne signalée'}${u.uns.length ? ` ; caractère isolé : ${u.uns.map((k) => k.c).join(', ')}` : ''}.`);
  P(`- **Origine recherchée** : ${f.o}`);
  P(`- **Verdict proposé** : **${f.v}**${f.f ? ` (${FAM[f.f].toLowerCase()})` : ''}.`);
  P(`- **Verdict arbitré (2026-10-12)** : **${f.v}**, confirmé${f.k ? ` ; correction V2-${NUM.get(id)} retenue, non appliquée` : ''}${['v_43', 'v_356'].includes(id) ? ' ; la correction de repli de la réserve n\'est pas employée' : ''}.`);
  P(`- **Justification** : ${f.m}`);
  if (f.k) P(`- **Correction proposée, non appliquée (V2-${NUM.get(id)})** : ${f.k}`);
  if (f.r) P(`- **Réserve** : ${f.r}`);
  P();
}
P('## W5. Recherches croisées dans les sources figées');
P();
P('Faites par script, en lecture seule, sur `sources/vocab.json`, `sources/vocab-hors-jlpt.json` et `sources/exemples.json` ; elles fondent les verdicts qui dépendent d\'un autre mot.');
P();
P('| Élément publié | Recherché | Résultat |');
P('|---|---|---|');
P('| 蕎麦 (そば) | la graphie, le mot « nouilles », le romaji soba, dans toutes les fiches et tous les anciens exemples | aucune occurrence de 蕎麦 ni de « nouilles » ; soba n\'apparaît que dans la fiche de そば |');
P('| 表 lu ひょう, « tableau » | la lecture ひょう, le mot « tableau », le romaji hyou, dans toutes les fiches ; ひょう dans les anciens exemples | aucune fiche ; cinq anciens exemples, tous dans des composés : 目標 (trois), 氷点下, 表紙 |');
P('| 〜中 lu ちゅう ou じゅう | une fiche de mot 中 autre que なか ; les furigana ちゅう et じゅう portés par 中 dans les anciens exemples | aucune fiche ; ちゅう : 授業中 (隣), 午前 中 (午前) ; じゅう : 一日 中 (一日, 昨日), et les composés 一日中, 世界中 |');
P('| 縦, dans la fiche de 横 | 縦 et tate dans la fiche, ses anciens exemples, ses décisions | aucune occurrence |');
P('| 机, dans la fiche de 下 | 机 dans la fiche et ses anciens exemples | aucune occurrence ; つくえ en kana dans l\'exemple |');
P('| 机, dans la fiche de 上 | idem | absent de la fiche, présent dans un ancien exemple (机 の 上 に) |');
P();
P('## W6. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t6-6a.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches sont exactement la livraison 6a du périmètre arbitré | oui : ${unites.length} nuances distinctes, ${new Set(bloc.map((u) => u.entree)).size} ENTRY, toutes du lot 10, toutes des nuances d'ENTRY ; les dix mots sont 隣, そば, 上, 中, 外, 後ろ, 横, 縦, 下, 表 ; 6b (9) n'est pas lue |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').length} faux positif présumé, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} à caractère isolé seulement |`);
P('| La nuance publiée est celle du lot validé | oui, pour les dix (comparaison de `data/n5/vocab.json` et de `lot-10.json`) |');
P(`| Verdicts proposés | ${src.length} sourcés, ${ass.length} assumé, ${ec.length} écarts ; total ${unites.length} |`);
P(`| Un écart a une famille et une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}, à la suite de V2-${DERNIER_V2} |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé |`);
const cand = bloc.filter((u) => u.candidats377.length);
P(`| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : ${cand.map((u) => `${u.mot} (${u.candidats377.join(', ')})`).join(', ') || 'aucun sens de 6a'} ${cand.length === 1 ? 'reste candidat' : 'restent candidats'} |`);
P(`| Sens des 147 | ${bloc.filter((u) => u.dans147.length).map((u) => `${u.mot} (${u.dans147.join(', ')})`).join(', ') || 'aucun'} : verdict et correction du volet 2 non rouverts |`);
P(`| Corrections retenues | 124 (10 + 5 + 109), 124 lignes recomptées dans le bilan, inchangées, aucune appliquée ; si les ${ec.length} propositions étaient retenues : ${124 + ec.length} corrections, dans ${entreesApres} ENTRY |`);
P(`| Verdicts arbitrés (2026-10-12) | 4 sourcés, 0 assumé, 6 écarts ; les 10 confirmés ; **V2-110 à V2-115 retenues : ${124 + ec.length} corrections, dans ${entreesApres} ENTRY, aucune appliquée** |`);
P(`| **Décompte du chantier** | ${RESTE_AVANT} nuances du plan restaient à lire ; **${unites.length} sont contrôlées dans cette livraison ; ${RESTE_AVANT - unites.length} resteraient après son arbitrage** : tranche 6, ${resteT6} (6b : 9 ; 6c : 10 ; 6d : 7 ; 6e : 11) ; tranche 7, 39 ; tranche 8, 44 (recompte du plan : ${reste.length}). |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6a.md'), md);
console.log(`6a : ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} ; ENTRY après : ${entreesApres} ; reste ${RESTE_AVANT - unites.length} (plan : ${reste.length} ; tranche 6 : ${resteT6})`);
