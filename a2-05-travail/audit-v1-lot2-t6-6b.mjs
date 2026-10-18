// A2-05 · volet 1 · lot 2 (provenance) · tranche 6, livraison 6b (lot 10, directions, distance et repères : 9 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t6-6b.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6b.md
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
const r6a = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6a.md'), 'utf8');
const rT6 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-tranche6-perimetre.md'), 'utf8');
const bilan = readFileSync(join(root, 'docs/rapports/etape2-A2-05-bilan-volet2.md'), 'utf8');
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_347_s1: { v: 'écart', f: 'construit', o: "この先, ペンの先 : aucune. La fiche n'emploie le mot que dans 先に : exemple « 先 に しつれい します », anciens exemples « 先 に メニュー を 決めておきましょう », « お先 に 失礼 します », « 先 に 重要 な もの から 片付けます ». Sa nuance nomme, en français, « l'avant » et « l'extrémité d'une chose », sans expression japonaise. **Dans toutes les sources figées, ni この先 ni ペンの先 n'est écrit** (la suite この先 ne s'y rencontre que dans この先生, un autre mot). D0624 : « tous ses emplois documentés sont ceux d'un nom (先に, この先, l'extrémité) ».", m: "Le sens lui-même est documenté par la nuance de la fiche (D0623) ; **ses deux illustrations sont construites** : aucun texte de la fiche ne donne un emploi spatial de 先 (critère 1). D0624 range この先 parmi les « emplois documentés » : ce n'est pas le cas, ni dans la fiche ni ailleurs dans les sources ; la décision n'est pas réécrite, mais elle ne source pas l'expression.", k: "`nuance` (sens 1) : « L'avant ; l'extrémité d'une chose. », d'après la fiche, sans exemple japonais." },
  v_348_s2: { v: 'écart', f: 'construit', o: "三年前 : aucune ; la fiche n'a aucun emploi d'une durée suivie de 前 (dans les sources, seul un ancien exemple de 習う écrit « 一年 前 から »). 食べる前に : aucune ; la construction verbe + 前に est dans un ancien exemple de la fiche, avec un autre verbe : « 映画 が 始まる 前 に、ポップコーン と お茶 を 買いました ». La nuance dit seulement « un moment antérieur dans le temps ».", m: "**三年前 est construit** (critère 1). **食べる前に change le verbe** de la construction attestée (始まる → 食べる) : remplacer un complément n'est pas une normalisation (5a ; 聞く sens 2, V2-104). La précision de 5b et de 6a ne s'applique pas : la description de la fiche ne nomme pas la construction, elle n'en autorise donc aucune variante.", k: "`nuance` (sens 2) : « 映画が始まる前に : avant que le film ne commence. », la forme de l'ancien exemple." },
  v_349: { v: 'écart', f: 'construit', o: "北口 : absent de la fiche, de ses anciens exemples, et **de toutes les sources figées**. D0619 (décision de `tags`) : « les noms de sorties (東口, 西口, 南口, 北口) montrent qu'un point cardinal qualifie une sortie ». Les sources n'attestent que 東口 et 西口, dans un ancien exemple de 東 et un de 西.", m: "Mot composé que la fiche ne donne pas (critère 1). D0619 le nomme pour écarter un tag de lieu, non pour l'attester, et son fondement n'est vérifiable que pour deux des quatre sorties, dont aucune n'est celle-ci : ni sourcé, ni assumé.", k: "`nuance` (ENTRY) : « Exemple : 北の方, vers le nord. », la forme de l'ancien exemple « 日本 の 北 の 方 に ある 北海道 ».", r: "La nuance publiée ne contient que cet exemple. Si l'arbitrage préfère ne rien substituer, la correction serait le retrait pur de la nuance (aucune nuance publiée), comme pour 人 (V2-48)." },
  v_350: { v: 'écart', f: 'construit', o: "南口 : absent de la fiche, de ses anciens exemples, et **de toutes les sources figées**. D0617 (décision de `tags`) : même formule que D0619, « les noms de sorties (東口, 西口, 南口, 北口) ». Les sources n'attestent que 東口 et 西口.", m: "Même cas que 北 : mot composé que la fiche ne donne pas (critère 1) ; D0617 le nomme pour écarter un tag, sans fondement vérifiable pour cette sortie.", k: "`nuance` (ENTRY) : « Exemple : 南の方, vers le sud. », la forme de l'ancien exemple « 寒い 地域 から 南 の 方 へ 移動 する 鳥 ».", r: "Même alternative que pour 北 : le retrait pur de la nuance." },
  v_358: { v: 'écart', f: 'decision', o: "角を右に曲がる : ancien exemple de la fiche, « つき の 角 を 右 に 曲がると、郵便局 が あります » (« En tournant à droite au coin suivant ») ; exemple : « その 角 を ひだり に まがって ください ». 次 : **la fiche de 角 n'écrit pas 次** ; son ancien exemple écrit つき, en kana ; 次の角 n'est écrit, dans les sources, que par un ancien exemple de 曲がる (« 次 の 角 を 右 に 曲がって ください »). つの, « corne » : absents de la fiche et de toutes les sources figées (つの n'y apparaît que dans いつの間にか et 四つの). D0621 : « aucun sens n'est repris de 角 lu つの ».", m: "**角を右に曲がる est sourcé** : forme du dictionnaire de l'ancien exemple (critère 1). **次の ne l'est pas pour cette fiche** : elle écrit つき, vraisemblable coquille pour つぎ que la traduction « suivant » laisse deviner, mais qu'aucune décision n'a corrigée ni journalisée ; une graphie n'est sourcée que si la fiche l'atteste, et l'attestation par la fiche de 曲がる, sans décision, ne suffit pas. **La phrase sur 角 lu つの ne l'est pas non plus** : D0621, qui la fonde, n'a aucun appui dans les sources (même cas que 表 lu ひょう, V2-115).", k: "`nuance` (ENTRY) : « L'angle de deux rues ou le coin d'un bâtiment : 角を右に曲がる, tourner à droite au coin. », sans 次の ni la phrase sur 角 lu つの.", r: "La coquille つき de la source (dans les anciens exemples de 角 et de 右) est signalée, non corrigée : les sources figées restent intactes. Garder « 次の » demanderait une décision nouvelle et journalisée, hors de ce contrôle." },
  v_360: { v: 'écart', f: 'construit', o: "駅に近い : aucune. La fiche construit la proximité avec から : exemple « えき から わたし の いえ は 近い です », ancien exemple « わたしの 家 は 駅 から 近い ので ». La particule に n'y accompagne jamais 近い.", m: "**La particule est changée** (から → に) : ce n'est pas une normalisation (5a ; テレビ, V2-102). Insuffisance de provenance, non démonstration d'incorrection : la fiche atteste 駅から近い, non 駅に近い.", k: "`nuance` (ENTRY) : « Une distance courte, dans l'espace ou dans le temps : 駅から近い, près de la gare. », la construction de l'ancien exemple." },
  v_362: { v: 'écart', f: 'construit', o: "駅から遠い : aucune. La fiche a « ここ から とうきょう は 遠い です » (exemple) et « ここ から とても 遠い ので » (ancien exemple) ; 駅 n'est dans aucun de ses textes.", m: "La construction から + 遠い est attestée ; **le complément est changé** (ここ → 駅) : ce n'est pas une normalisation (5a ; 聞く sens 2, V2-104). La fiche ne décrit pas la construction : la précision de 5b ne s'applique pas.", k: "`nuance` (ENTRY) : « Une grande distance, dans l'espace ou dans le temps : ここから遠い. », la forme de l'ancien exemple, privé de とても." },
  v_704_s1: { v: 'sourcé', o: "Exemple de la fiche : « えき の 近く に カフェ が あり ます » ; anciens exemples : « 駅 の 近く で 友達 と 待ち合わせを します », « 家 の 近く に 便利 な スーパー が あります » ; nuance : « Souvent utilisé avec la particule ni ou no ».", m: "Faux positif présumé, rapproché par la lecture えき : **ici le rapprochement est juste**. 駅の近くに est la suite de l'exemple de la fiche (critère 1), et la graphie 駅 est attestée pour ce mot par un ancien exemple de la même fiche (critère de graphie ; même cas que 友達, pour 遊ぶ, en 5c). Les particules の et に sont celles que la nuance nomme. La particule の de ce sens a été contrôlée à la tranche 1 (sourcée) ; ce verdict porte sur la nuance." },
  v_704_s2: { v: 'écart', f: 'construit', o: "近く結婚します : aucune. La fiche ne donne aucun exemple de l'emploi temporel : sa nuance dit « ou temporelle (« bientôt ») », son exemple et ses trois anciens exemples sont tous spatiaux (駅の近く, 家の近く, 公園の近く). 結婚 n'est dans aucun de ses textes.", m: "Le sens est documenté par la nuance de la fiche (D0598) ; **son illustration est construite** (critère 1).", k: "`nuance` (sens 2) : « La proximité dans le temps : bientôt. », d'après la fiche, sans exemple japonais." }
};

const POSITION = ['隣', 'そば', '上', '中', '下', '外', '後ろ', '横', '縦', '表'];
const MOTS = ['先', '前', '北', '南', '角', '近い', '遠い', '近く'];
const bloc = plan.toutes.filter((u) => u.tranche === '6' && u.lotN === '10' && !POSITION.includes(u.mot));
const unites = bloc.map((u) => court(u.sens));
if (!r6a.includes('**arbitré le 2026-10-12**') || !r6a.includes('V2-110 à V2-115 retenues')) throw new Error('6a non arbitrée');
if (!rT6.includes('**périmètre arbitré le 2026-10-12**') || !rT6.includes('6b (9)')) throw new Error('périmètre de la tranche 6 non arbitré');
if (bloc.length !== 9 || Object.keys(F).length !== 9 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`6b : manquantes ${unites.filter((u) => !F[u])} ; en trop ${Object.keys(F).filter((k) => !unites.includes(k))}`);
if (new Set(bloc.map((u) => u.mot)).size !== MOTS.length || MOTS.some((m) => !bloc.some((u) => u.mot === m))) throw new Error('6b : les huit mots attendus');
for (const [id, f] of Object.entries(F)) if (!['sourcé', 'assumé', 'écart'].includes(f.v) || (f.v === 'écart') !== Boolean(f.k) || (f.v === 'écart') !== Boolean(f.f)) throw new Error(`verdict, correction ou famille incohérents : ${id}`);
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
// Le bilan porte les 130 corrections retenues après 6a ; une fois 6b arbitrée, il portera aussi ses propres lignes : la proposition se recalcule sur les 130 d'avant.
const DERNIER_V2 = 115;
const CORR_TOUT = [...bilan.matchAll(/^\| (V[12]-\d+|\d+) \| `((?:hj_)?v_\d+)(_s\d+)?`/gm)].map((m) => ({ n: m[1], entree: m[2] }));
const CORR = CORR_TOUT.filter((c) => !(c.n.startsWith('V2-') && Number(c.n.slice(3)) > DERNIER_V2));
if (CORR.length !== 130 || new Set(CORR.map((c) => c.n)).size !== 130) throw new Error(`corrections : ${CORR.length} lignes au lieu de 130`);
if (Math.max(...CORR.filter((c) => c.n.startsWith('V2-')).map((c) => Number(c.n.slice(3)))) !== DERNIER_V2) throw new Error('dernier numéro V2');
const ENTREES_AVANT = new Set(CORR.map((c) => c.entree)).size;
if (ENTREES_AVANT !== 117) throw new Error(`ENTRY corrigées : ${ENTREES_AVANT} au lieu de 117`);
const faites = plan.toutes.filter((u) => u.tranche === '6' && u.lotN === '10' && POSITION.includes(u.mot));
const reste = plan.toutes.filter((u) => ['6', '7', '8'].includes(u.tranche) && !bloc.includes(u) && !faites.includes(u));
const RESTE_AVANT = 120;
if (faites.length !== 10 || RESTE_AVANT - unites.length !== reste.length) throw new Error(`décompte : ${RESTE_AVANT - unites.length} contre ${reste.length} au plan`);
const resteT6 = reste.filter((u) => u.tranche === '6').length;

const src = unites.filter((c) => F[c].v === 'sourcé'), ass = unites.filter((c) => F[c].v === 'assumé'), ec = unites.filter((c) => F[c].v === 'écart');
const NUM = new Map(ec.map((c, i) => [c, DERNIER_V2 + i + 1]));
const de = (c) => bloc.find((u) => court(u.sens) === c);
const nomDe = (c) => `${de(c).mot}${de(c).niveau === 'sens' ? ` (sens ${c.split('_s').pop()})` : ''}`;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
const dejaCorr = [...new Set(ec.map((c) => de(c).entree))].filter((e) => CORR.some((x) => x.entree === e));
const entreesApres = new Set([...CORR.map((c) => c.entree), ...ec.map((c) => de(c).entree)]).size;
const FAM = { construit: 'Exemple construit, complément ou particule changés (critère 1)', decision: 'Graphie non attestée par la fiche, et information portée par une décision au fondement absent des sources' };
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : tranche 6, livraison 6b (lot 10, directions, distance et repères)');
P();
P('**Date** : 2026-10-12');
P('**Statut** : **arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **1 sourcé, 0 assumé, 8 écarts**, les neuf verdicts confirmés, V2-116 à V2-123 retenues sans modification. La proposition est conservée telle quelle ci-dessous.');
P();
P('## X0. Arbitrage du 2026-10-12');
P();
P('- **Sourcé, confirmé** : 近く sens 1 : 駅の近くに est attesté par la fiche et ses anciens exemples.');
P('- **北 et 南 (V2-118, V2-119)** : les composés non sourcés 北口 et 南口 sont remplacés par les expressions attestées 北の方 et 南の方 ; **les nuances ne sont pas supprimées entièrement**.');
P('- **角 (V2-120)** : 角を右に曲がる conservé ; 次の retiré, ainsi que la mention de 角 lu つの. **La coquille présumée `つき` des fiches sources n\'est pas corrigée silencieusement** : elle est signalée, sans être transformée en donnée validée.');
P('- **先 sens 1 (V2-116)** : la nuance française « L\'avant ; l\'extrémité d\'une chose. » est conservée, sans exemple japonais construit. **近く sens 2 (V2-123)** : « La proximité dans le temps : bientôt. » est conservée, sans exemple japonais construit.');
P('- **Autres corrections confirmées** : V2-117, 前 sens 2 : reprendre 映画が始まる前に ; V2-121, 近い : reprendre 駅から近い, sans substituer に à から ; V2-122, 遠い : reprendre ここから遠い, sans introduire 駅.');
P('- **Les décisions historiques D0624, D0619, D0617 et D0621 ne sont pas réécrites** ; les faiblesses de leur fondement restent documentées (fiches ci-dessous et §X5).');
P('- **Liste globale unique : 138 corrections (10 + 5 + 123), dans 125 ENTRY, toutes non appliquées.** **Restent 111 nuances du plan** : 28 dans la tranche 6 (6c : 10 ; 6d : 7 ; 6e : 11), 83 dans les tranches 7 (39) et 8 (44).');
P('- **Inchangés** : les 377 candidats C1 à C10 et les 147 arbitrages du volet 2. Aucune fiche source, aucun journal historique, aucun snapshot ni aucune donnée publiée n\'est modifié.');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre de la tranche 6 arbitré le 2026-10-12 (ChatGPT, par délégation), en cinq livraisons ; 6a est arbitrée ; ce rapport porte sur les **9 nuances de la livraison 6b** ; 6c ne sera commencée qu\'après l\'arbitrage de celle-ci. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict antérieur n\'est rouvert. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.');
P();
P('## X1. Résultat proposé');
P();
P('| Verdict proposé | Nuances | Détail |');
P('|---|---|---|');
P(`| **sourcé** | ${src.length} | ${src.map((c) => `\`${c}\` ${nomDe(c)}`).join(' ; ') || '—'} |`);
P(`| **assumé** | ${ass.length} | ${ass.map((c) => `\`${c}\` ${nomDe(c)}`).join(' ; ') || '—'} |`);
P(`| **écart** (E2) | ${ec.length} | ${ec.map((c) => `\`${c}\` ${nomDe(c)}`).join(' ; ')} |`);
P(`| **Total** | ${unites.length} | |`);
P();
P('**Ce que la livraison montre** :');
P();
P('- **Huit nuances sur neuf illustrent le mot par une expression que la fiche ne donne pas.** À la différence de 6a, où les locutions venaient des anciens exemples, celles de 6b sont presque toutes construites : un mot composé (北口, 南口), une expression libre (この先, ペンの先, 三年前, 近く結婚します), ou une construction attestée dont un élément est changé : le verbe (食べる前に, pour 映画が始まる前に), le complément (駅から遠い, pour ここから遠い), la particule (駅に近い, pour 駅から近い).');
P('- **Les sens ne sont pas en cause** : les deux sens de 先, de 前 et de 近く sont documentés par les nuances des fiches (D0623, D0585, D0598). Ce sont leurs exemples qui manquent de source. Pour deux d\'entre eux (先 sens 1, 近く sens 2), la fiche n\'offre aucun exemple de l\'emploi : la correction ne garde que le texte français attesté.');
P('- **Chaque fois qu\'une forme attestée existe, la correction la reprend** : 映画が始まる前に, 北の方, 南の方, 角を右に曲がる, 駅から近い, ここから遠い.');
P('- **Des décisions historiques nomment un élément sans fondement dans les sources** : D0624 (この先, donné comme « emploi documenté »), D0619 et D0617 (北口, 南口 : seuls 東口 et 西口 sont attestés), D0621 (角 lu つの). Aucune n\'est réécrite.');
P('- **Une coquille de la source est relevée, non corrigée** : la fiche de 角 écrit つき là où la traduction dit « suivant » ; la publication a écrit 次の, que la fiche n\'atteste pas.');
P('- **Le seul sourcé est le faux positif présumé** : 駅の近くに (近く sens 1), suite de l\'exemple de la fiche, dont un ancien exemple écrit 駅.');
P();
P('## X2. Critères appliqués');
P();
P('Ceux des livraisons précédentes, sans changement : forme du dictionnaire et retrait de mots non essentiels admis si la construction attestée reste intacte, complément ou particule changés non admis (5a) ; une variante expressément autorisée par la description de la fiche, combinée à des éléments que cette fiche documente, peut être sourcée (5b, 6a) : **aucune des fiches de 6b ne décrit la construction en cause, la précision ne s\'y applique donc pas** ; une réduction d\'exemple peut supprimer un complément sans modifier la construction essentielle (6a) ; graphie sourcée seulement si la fiche l\'atteste pour le mot ; une attestation dans une autre fiche, sans décision, ne suffit pas ; une décision qui nomme une expression ou un autre mot ne les source pas par elle-même ; classement **sourcé / assumé / écart** ; information française attestée préservée dans les corrections.');
P();
P('## X3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}) ; elles ne rejoindront la liste globale unique qu'après arbitrage, à part des 130 déjà retenues. ${dejaCorr.length ? `ENTRY de 6b portant déjà une correction retenue : ${dejaCorr.join(', ')}.` : 'Aucune ENTRY de 6b n\'est visée par une correction déjà retenue.'} **Aucune correction n'ajoute de contenu étranger à la fiche** : chacune remplace l'exemple par une forme que la fiche écrit, ou, à défaut, par le texte français de sa nuance.`);
P();
P('| # | Unité | Mot | Famille | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${nomDe(c)} | ${F[c].f} | ${F[c].k} |`);
P();
P(`## X4. Les ${unites.length} fiches de provenance`);
P();
P('Les furigana des fiches sont rendus entre crochets. Chaque fiche source est donnée en entier : traductions, particules, nuance, exemple, anciens exemples ; puis l\'état publié et toutes les décisions de journal de l\'ENTRY. La fiche de 近く est donnée deux fois, une par sens.');
P();
let verifLot = 0;
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
  const duLot = champs.get(sid);
  if (s) { const ls = duLot?.senses?.[Number(id.split('_s').pop()) - 1]; if (!ls || ls.meaning.primary !== s.meaning.primary) throw new Error(`sens absent du lot, ou d'un autre rang : ${id}`); if (ls.nuance !== s.nuance) throw new Error(`nuance du sens différente de celle du lot : ${id}`); verifLot += 1; } else { if (e.nuance !== duLot?.nuance) throw new Error(`nuance publiée différente de celle du lot : ${id}`); verifLot += 1; }
  P(`- **Publié** : ${s ? `nuance du sens : « ${s.nuance} » ; particules du sens : ${(s.particles ?? []).join(', ') || 'aucune'} ; nuance de l'ENTRY : ${e.nuance ? `« ${e.nuance} »` : 'aucune'} ; autres sens : ${e.senses.filter((x) => x.id !== id).map((x) => `\`${x.id}\` « ${x.meaning.primary} »`).join(' ; ') || 'aucun'}` : `nuance de l'ENTRY : « ${e.nuance} » ; sens : ${e.senses.map((x) => `\`${x.id}\` « ${x.meaning.primary} »`).join(' ; ')}`}.`);
  P(`- **Décisions de l'ENTRY** : ${decisionsDe(sid).map((d) => `${d.id.replace('A2-04-', '')} (${d.kind}, \`${d.field}\`) : « ${d.reason} »`).join(' ; ') || 'aucune'}.`);
  P(`- **Repérage** : ${u.statut} ; ${u.chaines.length ? `chaînes : ${u.chaines.map((c) => `${c.chaine} (${c.classe.startsWith('B') ? `écartée par le tri, ${u.parLecture.includes(c.chaine) ? 'par la lecture' : 'par la graphie'}` : 'signalée'})`).join(' ; ')}` : 'aucune chaîne signalée'}${u.uns.length ? ` ; caractère isolé : ${u.uns.map((k) => k.c).join(', ')}` : ''}.`);
  P(`- **Origine recherchée** : ${f.o}`);
  P(`- **Verdict proposé** : **${f.v}**${f.f ? ` (${FAM[f.f].toLowerCase()})` : ''}.`);
  P(`- **Verdict arbitré (2026-10-12)** : **${f.v}**, confirmé${f.k ? ` ; correction V2-${NUM.get(id)} retenue, non appliquée` : ''}${['v_349', 'v_350'].includes(id) ? ' ; l\'alternative du retrait pur n\'est pas retenue' : ''}.`);
  P(`- **Justification** : ${f.m}`);
  if (f.k) P(`- **Correction proposée, non appliquée (V2-${NUM.get(id)})** : ${f.k}`);
  if (f.r) P(`- **Réserve** : ${f.r}`);
  P();
}
if (verifLot !== unites.length) throw new Error('comparaison au lot incomplète');
P('## X5. Recherches croisées dans les sources figées');
P();
P('Faites par script, en lecture seule, sur `sources/vocab.json` et `sources/exemples.json`, furigana et balises retirés ; elles fondent les verdicts qui dépendent d\'un élément absent de la fiche examinée.');
P();
P('| Élément publié | Résultat dans toutes les fiches et tous les anciens exemples |');
P('|---|---|');
P('| この先 | aucune occurrence du mot ; la suite de caractères ne se rencontre que dans この先生 (ancien exemple de 授業) |');
P('| ペンの先 | aucune occurrence |');
P('| 三年前 | aucune occurrence ; une durée suivie de 前 : seulement « 一年 前 から », ancien exemple de 習う |');
P('| 食べる前 | aucune occurrence |');
P('| 北口, 南口 | aucune occurrence ; 東口 : un ancien exemple de 東 ; 西口 : un ancien exemple de 西 |');
P('| 次の角 | un ancien exemple de 曲がる ; les anciens exemples de 角 et de 右 écrivent つき の 角 |');
P('| 角 lu つの, « corne » | aucune occurrence ; つの n\'apparaît que dans いつの間にか et 四つの |');
P('| 駅に近い | aucune occurrence ; 駅から近い : anciens exemples de 近い et de 家 |');
P('| 駅から遠い | aucune occurrence |');
P('| 近く結婚 | aucune occurrence |');
P();
P('## X6. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t6-6b.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches sont exactement la livraison 6b du périmètre arbitré | oui : ${unites.length} nuances distinctes, ${new Set(bloc.map((u) => u.entree)).size} ENTRY, toutes du lot 10 ; ${bloc.filter((u) => u.niveau === 'entree').length} nuances d'ENTRY (北, 南, 角, 近い, 遠い) et ${bloc.filter((u) => u.niveau === 'sens').length} nuances de sens (先 sens 1, 前 sens 2, 近く sens 1 et sens 2) ; avec 6a, le lot 10 est entièrement contrôlé (10 + 9 = 19) ; 6c (10) n'est pas lue |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').length} faux positif présumé, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} à caractère isolé seulement |`);
P('| La nuance publiée est celle du lot validé | oui, pour les neuf (comparaison de `data/n5/vocab.json` et de `lot-10.json`, au niveau de l\'ENTRY ou du sens) |');
P(`| Verdicts proposés | ${src.length} sourcé, ${ass.length} assumé, ${ec.length} écarts ; total ${unites.length} |`);
P(`| Un écart a une famille et une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}, à la suite de V2-${DERNIER_V2} |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé |`);
const cand = [...new Set(bloc.flatMap((u) => u.candidats377))];
P(`| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : ${cand.length} sens de 6b restent candidats (${cand.map((c) => `\`${c}\``).join(', ')}), dont les quatre du point réservé de la deixis temporelle (先 sens 1, 前 sens 2, 近く sens 1 et sens 2), **non ouvert** |`);
P(`| Sens des 147 | ${bloc.filter((u) => u.dans147.length).map((u) => `${u.mot} (${u.dans147.join(', ')})`).join(', ') || 'aucun'} |`);
P(`| Corrections retenues | 130 (10 + 5 + 115), dans ${ENTREES_AVANT} ENTRY, 130 lignes recomptées dans le bilan, inchangées, aucune appliquée ; si les ${ec.length} propositions étaient retenues : ${130 + ec.length} corrections, dans ${entreesApres} ENTRY |`);
P(`| Verdicts arbitrés (2026-10-12) | 1 sourcé, 0 assumé, 8 écarts ; les 9 confirmés ; **V2-116 à V2-123 retenues : ${130 + ec.length} corrections, dans ${entreesApres} ENTRY, aucune appliquée** |`);
P(`| **Décompte du chantier** | ${RESTE_AVANT} nuances du plan restaient à lire ; **${unites.length} sont contrôlées dans cette livraison ; ${RESTE_AVANT - unites.length} resteraient après son arbitrage** : tranche 6, ${resteT6} (6c : 10 ; 6d : 7 ; 6e : 11) ; tranche 7, 39 ; tranche 8, 44 (recompte du plan : ${reste.length}). |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6b.md'), md);
console.log(`6b : ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} ; ENTRY après : ${entreesApres} ; reste ${RESTE_AVANT - unites.length} (plan : ${reste.length} ; tranche 6 : ${resteT6})`);
