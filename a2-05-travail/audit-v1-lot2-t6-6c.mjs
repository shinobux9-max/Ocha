// A2-05 · volet 1 · lot 2 (provenance) · tranche 6, livraison 6c (lot 11, séries こ, そ, あ : 10 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t6-6c.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6c.md
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
const r6b = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6b.md'), 'utf8');
const rT6 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-tranche6-perimetre.md'), 'utf8');
const bilan = readFileSync(join(root, 'docs/rapports/etape2-A2-05-bilan-volet2.md'), 'utf8');
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_339_s1: { v: 'écart', f: 'renvoi', o: "こちらへどうぞ : exemple de la fiche, « こちら へ どうぞ 。 ». こっち : **absent de la fiche de こちら** (ni en kana, ni en romaji), de ses anciens exemples et de ses décisions (D0667 à D0672). C'est la fiche de こっち (`n5_v_409`) qui écrit le lien, dans l'autre sens : « variante de kochira こちら ». La fiche de こちら ne dit « forme polie » que pour désigner sa propre personne (sens 2), non pour la direction.", m: "**こちらへどうぞ est sourcé** : c'est l'exemple même de la fiche (critère 1). **« Forme polie de こっち » n'a pas d'appui** dans la fiche examinée ni dans une décision : l'attestation réciproque par la fiche de こっち, sans décision, ne suffit pas (critère 2 ; doctrine de お手洗い / トイレ, V2-76, et de 横 / 縦, V2-112).", k: "`nuance` (sens 1) : « こちらへどうぞ : par ici, je vous prie. », sans le renvoi à こっち." },
  v_339_s2: { v: 'écart', f: 'construit', o: "こちらこそ, こちらは田中です : aucune. La fiche dit que le mot sert « de forme polie pour désigner sa propre personne » et donne « Voici (poli) » parmi ses traductions, sans exemple de cet emploi ; ses exemples sont こちらへどうぞ, こちらの席に, こちらに置いてください, こちらから連絡します. **Dans toutes les sources figées, ni こちらこそ ni こちらは n'est écrit** ; 田中 n'apparaît que dans les fiches de 先生 et de 奥さん et dans des anciens exemples de 元気 et de 奥さん. D0671 : « Traduction d'un emploi de présentation (こちらは〜です), reprise dans la nuance du sens 2 ».", m: "Le sens est documenté par la nuance de la fiche (D0670) ; **ses deux illustrations sont construites** (critère 1). D0671 nomme la construction こちらは〜です pour justifier l'abandon d'une traduction : elle ne la source pas, et les sources ne l'attestent pas.", k: "`nuance` (sens 2) : « Forme polie pour désigner sa propre personne. », d'après la fiche, sans exemple japonais.", r: "L'ancien exemple « こちら から 連絡 します » relève peut-être de ce sens, mais la fiche le traduit par « depuis ici » : je ne le propose pas comme illustration, ce serait interpréter la source." },
  v_340_s1: { v: 'écart', f: 'renvoi', o: "そっち : **absent de la fiche de そちら** (ni en kana, ni en romaji), de ses anciens exemples et de ses décisions (D0673 à D0677). C'est la fiche de そっち (`n5_v_414`) qui écrit le lien, dans l'autre sens : « variante familière de sochira そちら ». Le reste de la nuance est français, et suit la fiche : « indiquant une direction ou un endroit situé près de la personne à qui l'on s'adresse ».", m: "**Le renvoi à そっち n'a pas d'appui** dans la fiche examinée ni dans une décision ; l'attestation réciproque ne suffit pas (critère 2). Même cas que こちら sens 1.", k: "`nuance` (sens 1) : « Une direction ou un endroit proche de l'interlocuteur. », sans le renvoi à そっち." },
  v_404_s1: { v: 'écart', f: 'renvoi', o: "あそこ : nuance de la fiche, « forme honorifique d'asoko », en romaji. あっち : **absent de la fiche d'あちら**, de ses anciens exemples et de ses décisions (D0678 à D0680). C'est la fiche d'あっち (`n5_v_405`) qui écrit le lien, dans l'autre sens : « variante familière d'achira ».", m: "**あそこ est recevable** : transcription en kana d'un romaji que la fiche atteste, pour un mot qui s'écrit en kana (lot 01 ; aucune graphie en kanji n'est ajoutée). Le faux positif présumé du tri est, sur ce point, juste. **Le renvoi à あっち n'a pas d'appui** dans la fiche examinée ni dans une décision (critère 2).", k: "`nuance` (sens 1) : « Forme polie d'あそこ. », sans le renvoi à あっち." },
  v_404_s2: { v: 'écart', f: 'construit', o: "あちらは田中さんです : aucune. La fiche dit que le mot « sert aussi à désigner poliment une personne », sans exemple de cet emploi ; ses exemples sont tous de lieu (うけつけ は あちら です, お手洗い は あちら に ございます, あちら の 席 に). Dans les sources, あちらは n'est écrit nulle part.", m: "Le sens est documenté par la nuance de la fiche (D0680) ; **son illustration est construite** (critère 1).", k: "`nuance` (sens 2) : « Désigne poliment une personne. », d'après la fiche, sans exemple japonais." },
  v_405_s1: { v: 'sourcé', o: "Nuance de la fiche : « Pronom démonstratif de lieu ou de direction familier et décontracté (variante familière d'achira) ».", m: "Faux positif présumé, rapproché par le romaji : **le rapprochement est juste**. あちら transcrit en kana le romaji achira de la fiche, pour un mot qui s'écrit en kana ; la fiche dit elle-même qu'あっち en est la variante familière (critère 2, par la fiche examinée ; transcription recevable, lot 01)." },
  v_406_s1: { v: 'écart', f: 'construit', o: "あの本 : aucune. La fiche dit que le mot « précède obligatoirement un nom », et l'emploie devant くるま (exemple), 人, 建物 et 木 (anciens exemples) ; 本 n'est dans aucun de ses textes. Dans les sources, あの本 n'est écrit que par un ancien exemple de 売る.", m: "La construction あの + nom est décrite par la fiche ; **le nom choisi ne vient pas d'elle** : la précision de 6a demande que la construction autorisée se combine à des éléments documentés par la même fiche, ce qui n'est pas le cas de 本. Complément changé (5a) ; une attestation dans la fiche de 売る, sans décision, ne suffit pas.", k: "`nuance` (sens 1) : « Toujours devant un nom : あの人. Désigne ce qui est éloigné des deux interlocuteurs. », la forme de l'ancien exemple « あの 人 は 私 の 先生 です »." },
  v_409_s2: { v: 'écart', f: 'construit', o: "こっちの話 : aucune. La fiche dit que le mot « peut aussi désigner le locuteur ou son camp », sans exemple de cet emploi ; ses exemples sont こっちへ来てください, こっちに来てください, こっちの方が味が良いです, こっちに置いてあります. 話 n'est dans aucun de ses textes ; こっちの話 n'est écrit nulle part dans les sources.", m: "Le sens est documenté par la nuance de la fiche (D0688) ; **son illustration est construite** (critère 1).", k: "`nuance` (sens 2) : « Peut désigner le locuteur ou son camp. », d'après la fiche, sans exemple japonais." },
  v_412_s1: { v: 'écart', f: 'construit', o: "こんな本 : aucune. La fiche dit que le mot « précède un nom », et l'emploie devant りょうり (exemple : « こんな りょうり は はじめて です »), puis, dans ses anciens exemples, devant 美味しい 料理, 大切 な もの et 高い カメラ ; 本 n'est dans aucun de ses textes, et こんな本 nulle part dans les sources.", m: "Même cas qu'あの : la construction est décrite par la fiche, **le nom choisi ne vient pas d'elle** (5a ; précision de 6a non remplie). La fiche offre une forme attestée : こんな + りょうり, dans son exemple, et la graphie 料理 de ce mot dans un de ses anciens exemples.", k: "`nuance` (sens 1) : « Toujours devant un nom : こんな料理, ce genre de plat ; ce qui ressemble à ce qui est proche du locuteur. », la forme de l'exemple de la fiche, avec la graphie de son ancien exemple.", r: "L'exemple écrit りょうり en kana ; la graphie 料理 vient de l'ancien exemple « こんな 美味しい 料理 », où un adjectif sépare les deux mots. Si l'arbitrage veut la suite exacte, la correction s'écrirait こんなりょうり." },
  v_414_s2: { v: 'écart', f: 'construit', o: "そっちはどう : aucune. L'exemple de la fiche est « そっち の てんき は どう です か 。 » (« Quel temps fait-il chez vous / par là-bas ? ») ; ses anciens exemples sont そっちには何がありますか, そっちに置いてください, そっちの方が静かです. La nuance dit « ou le camp de ce dernier ».", m: "**La construction est changée** : dans l'exemple, そっち détermine てんき, qui est le thème de la question ; dans la publication, そっち devient lui-même le thème, et です か disparaît. Ce n'est pas un retrait de complément qui laisserait la construction intacte (5a ; 6a, troisième précision) : c'est une autre phrase.", k: "`nuance` (sens 2) : « そっちのてんきはどうですか : quel temps fait-il chez vous ? », la forme de l'exemple de la fiche.", r: "Si l'arbitrage juge que cet exemple illustre mal « toi, ton camp », l'alternative est le texte français de la fiche, sans exemple : « Désigne aussi le camp de l'interlocuteur. »" }
};

const MOTS = ['こちら', 'そちら', 'あちら', 'あっち', 'あの', 'こっち', 'こんな', 'そっち'];
const bloc = plan.toutes.filter((u) => u.tranche === '6' && u.lotN === '11' && MOTS.includes(u.mot));
const unites = bloc.map((u) => court(u.sens));
if (!r6b.includes('**arbitré le 2026-10-12**') || !r6b.includes('V2-116 à V2-123 retenues')) throw new Error('6b non arbitrée');
if (!rT6.includes('**périmètre arbitré le 2026-10-12**') || !rT6.includes('6c (10)')) throw new Error('périmètre de la tranche 6 non arbitré');
if (bloc.length !== 10 || Object.keys(F).length !== 10 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`6c : manquantes ${unites.filter((u) => !F[u])} ; en trop ${Object.keys(F).filter((k) => !unites.includes(k))}`);
if (new Set(bloc.map((u) => u.mot)).size !== MOTS.length || MOTS.some((m) => !bloc.some((u) => u.mot === m))) throw new Error('6c : les huit mots attendus');
if (bloc.some((u) => u.niveau !== 'sens')) throw new Error('6c : une unité n\'est pas une nuance de sens');
for (const [id, f] of Object.entries(F)) if (!['sourcé', 'assumé', 'écart'].includes(f.v) || (f.v === 'écart') !== Boolean(f.k) || (f.v === 'écart') !== Boolean(f.f)) throw new Error(`verdict, correction ou famille incohérents : ${id}`);
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
// Le bilan porte les 138 corrections retenues après 6b ; une fois 6c arbitrée, il portera aussi ses propres lignes : la proposition se recalcule sur les 138 d'avant.
const DERNIER_V2 = 123;
const AVANT = 138;
const CORR_TOUT = [...bilan.matchAll(/^\| (V[12]-\d+|\d+) \| `((?:hj_)?v_\d+)(_s\d+)?`/gm)].map((m) => ({ n: m[1], entree: m[2] }));
const CORR = CORR_TOUT.filter((c) => !(c.n.startsWith('V2-') && Number(c.n.slice(3)) > DERNIER_V2));
if (CORR.length !== AVANT || new Set(CORR.map((c) => c.n)).size !== AVANT) throw new Error(`corrections : ${CORR.length} lignes au lieu de ${AVANT}`);
if (Math.max(...CORR.filter((c) => c.n.startsWith('V2-')).map((c) => Number(c.n.slice(3)))) !== DERNIER_V2) throw new Error('dernier numéro V2');
const ENTREES_AVANT = new Set(CORR.map((c) => c.entree)).size;
if (ENTREES_AVANT !== 125) throw new Error(`ENTRY corrigées : ${ENTREES_AVANT} au lieu de 125`);
const faites = plan.toutes.filter((u) => u.tranche === '6' && u.lotN === '10');
const reste = plan.toutes.filter((u) => ['6', '7', '8'].includes(u.tranche) && !bloc.includes(u) && !faites.includes(u));
const RESTE_AVANT = 111;
if (faites.length !== 19 || RESTE_AVANT - unites.length !== reste.length) throw new Error(`décompte : ${RESTE_AVANT - unites.length} contre ${reste.length} au plan`);
const resteT6 = reste.filter((u) => u.tranche === '6').length;

const src = unites.filter((c) => F[c].v === 'sourcé'), ass = unites.filter((c) => F[c].v === 'assumé'), ec = unites.filter((c) => F[c].v === 'écart');
const NUM = new Map(ec.map((c, i) => [c, DERNIER_V2 + i + 1]));
const de = (c) => bloc.find((u) => court(u.sens) === c);
const nomDe = (c) => `${de(c).mot} (sens ${c.split('_s').pop()})`;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
const dejaCorr = [...new Set(ec.map((c) => de(c).entree))].filter((e) => CORR.some((x) => x.entree === e));
const entreesApres = new Set([...CORR.map((c) => c.entree), ...ec.map((c) => de(c).entree)]).size;
const FAM = { construit: 'Exemple construit, ou construction attestée dont un élément est changé (critère 1)', renvoi: 'Renvoi sans appui dans la fiche ni dans une décision (critère 2)' };
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : tranche 6, livraison 6c (lot 11, séries こ, そ, あ)');
P();
P('**Date** : 2026-10-12');
P('**Statut** : **arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **1 sourcé, 0 assumé, 9 écarts**, les dix verdicts confirmés ; V2-124 à V2-131 retenues sans modification ; **V2-132 retenue sous sa forme de repli**. La proposition est conservée telle quelle ci-dessous.');
P();
P('## Y0. Arbitrage du 2026-10-12');
P();
P('- **Sourcé, confirmé** : あっち sens 1. **Écarts confirmés** : les neuf autres.');
P('- **V2-132, そっち sens 2 : correction de repli retenue, à la place de la correction proposée.** Texte arbitré : « Désigne aussi le camp de l\'interlocuteur. » L\'exemple そっちのてんきはどうですか est attesté, mais il illustre surtout la proximité spatiale avec l\'interlocuteur ; il n\'est pas suffisamment représentatif du sens « Toi, ton camp » et **n\'est pas utilisé comme illustration de ce sens**. La proposition d\'origine (reprendre l\'exemple de la fiche) reste lisible au §Y3 et dans la fiche, comme proposition non retenue.');
P('- **Renvois entre formes** : les renvois des formes polies こちら, そちら et あちら vers leurs variantes familières sont des écarts de provenance ; les renvois inverses, documentés dans les fiches familières, restent sourcés. **Cette asymétrie est documentaire : elle n\'est pas une règle linguistique.**');
P('- **V2-131, こんな** : こんな料理 est conservé, la construction et la graphie 料理 étant attestées dans la fiche de こんな ; le repli こんなりょうり n\'est pas employé.');
P('- **Sens « personne » de こちら, あちら et こっち** (V2-125, V2-128, V2-130) : les formulations françaises sourcées sont conservées, sans exemple japonais construit. **あの (V2-129)** : あの人 conservé, attesté dans son ancien exemple.');
P('- **D0671 et les autres décisions historiques ne sont pas réécrites.**');
P('- **Liste globale unique : 147 corrections (10 + 5 + 132), dans 132 ENTRY, toutes non appliquées.** **Restent 101 nuances du plan** : 18 dans la tranche 6 (6d : 7 ; 6e : 11), 83 dans les tranches 7 (39) et 8 (44).');
P('- **Inchangés, non rouverts** : les 377 candidats C1 à C10 et les 147 arbitrages du volet 2 (sans rapport avec le total de 147 corrections).');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre de la tranche 6 arbitré le 2026-10-12 (ChatGPT, par délégation), en cinq livraisons ; 6a et 6b sont arbitrées ; ce rapport porte sur les **10 nuances de la livraison 6c** ; 6d ne sera commencée qu\'après l\'arbitrage de celle-ci. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict antérieur n\'est rouvert. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.');
P();
P('## Y1. Résultat proposé');
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
P('- **Les renvois entre forme polie et forme familière ne sont attestés que dans un sens.** Les fiches des formes familières nomment leur forme polie : こっち « variante de kochira こちら », そっち « variante familière de sochira そちら », あっち « variante familière d\'achira ». Les fiches des formes polies ne nomment pas leur forme familière. La publication a écrit le lien des deux côtés : il est **sourcé pour あっち**, qui renvoie à あちら, et **en écart pour こちら, そちら et あちら**, qui renvoient à こっち, そっち et あっち. C\'est l\'asymétrie déjà arbitrée pour お手洗い et トイレ, et pour 横 et 縦.');
P('- **あそこ, pour あちら, est recevable** : la fiche dit « forme honorifique d\'asoko », et le mot s\'écrit en kana.');
P('- **Les sens « personne » n\'ont aucun exemple dans les fiches** : こちら sens 2, あちら sens 2, こっち sens 2. Les nuances les décrivent ; leurs illustrations publiées (こちらこそ, こちらは田中です, あちらは田中さんです, こっちの話) sont construites, et aucune n\'est écrite ailleurs dans les sources. La correction ne garde que le texte français de la fiche.');
P('- **Deux déterminants sont illustrés par un nom que la fiche n\'emploie pas** : あの本, こんな本. La fiche décrit bien la construction (« précède un nom »), mais 本 n\'est dans aucun de ses textes : la précision arbitrée en 6a ne s\'applique pas. Une forme attestée existe chaque fois (あの人, こんな + りょうり).');
P('- **そっちはどう n\'est pas une réduction de l\'exemple** そっちのてんきはどうですか : la construction change.');
P('- **Aucune décision historique n\'est en cause**, sauf D0671, qui nomme こちらは〜です pour écarter une traduction : elle n\'est pas réécrite.');
P();
P('## Y2. Critères appliqués');
P();
P('Ceux des livraisons précédentes, sans changement : forme du dictionnaire et retrait de mots non essentiels admis si la construction attestée reste intacte, complément ou particule changés non admis (5a) ; une construction expressément autorisée par une fiche, **combinée à des éléments documentés par cette même fiche**, peut être sourcée (5b, 6a) ; une réduction d\'exemple peut supprimer un complément sans modifier la construction essentielle (6a) ; renvoi appuyé par la fiche examinée ou par une décision au fondement vérifiable (critère 2), une attestation dans une autre fiche, sans décision, ne suffisant pas ; transcription en kana d\'un romaji attesté recevable, sans ajout de kanji (lot 01) ; graphie sourcée seulement si la fiche l\'atteste pour le mot ; une décision qui nomme une expression ne la source pas par elle-même ; classement **sourcé / assumé / écart** ; information française attestée préservée dans les corrections.');
P();
P('## Y3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}) ; elles ne rejoindront la liste globale unique qu'après arbitrage, à part des ${AVANT} déjà retenues. ${dejaCorr.length ? `ENTRY de 6c portant déjà une correction retenue : ${dejaCorr.join(', ')}.` : 'Aucune ENTRY de 6c n\'est visée par une correction déjà retenue.'} **Aucune correction n'ajoute de contenu étranger à la fiche** : chacune retire un renvoi, ou remplace l'exemple par une forme que la fiche écrit, ou, à défaut, par le texte français de sa nuance.`);
P();
P('| # | Unité | Mot | Famille | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${nomDe(c)} | ${F[c].f} | ${F[c].k} |`);
P();
P(`## Y4. Les ${unites.length} fiches de provenance`);
P();
P('Les furigana des fiches sont rendus entre crochets. Chaque fiche source est donnée en entier : traductions, particules, nuance, exemple, anciens exemples ; puis l\'état publié et toutes les décisions de journal de l\'ENTRY. Les fiches de こちら et d\'あちら sont données deux fois, une par sens.');
P();
let verifLot = 0;
for (const u of bloc) {
  const id = court(u.sens); const f = F[id]; const sid = `n5_${u.entree}`;
  const e = vocab.find((x) => x.id === u.entree); const s = e.senses.find((x) => x.id === id);
  P(`### \`${id}\` · ${u.mot} · « ${s.meaning.primary} » — **${f.v}**`);
  P();
  for (const x of [sid, ...(fusion.get(sid) ?? [])]) {
    const fi = sources.get(x);
    P(`- **Fiche source** (\`${x}\`${x !== sid ? ', fusionnée' : ''}, ${fi.type}) : mot ${fi.word} (${fi.reading}) ; traductions « ${[fi.meanings.primary, ...(fi.meanings.secondary ?? [])].join(' ; ')} » ; particules ${(fi.particles ?? []).join(', ') || 'aucune'}. Nuance : « ${st(fi.nuance)} » Exemple : « ${st(fi.example?.japanese)} » — « ${st(fi.example?.french)} »`);
    for (const q of ex.vocab?.[x] ?? []) P(`  - Ancien exemple : « ${st(q.japanese)} » — « ${st(q.french ?? q.translation)} »`);
  }
  const ls = champs.get(sid)?.senses?.[Number(id.split('_s').pop()) - 1];
  if (!ls || ls.meaning.primary !== s.meaning.primary) throw new Error(`sens absent du lot, ou d'un autre rang : ${id}`);
  if (ls.nuance !== s.nuance) throw new Error(`nuance du sens différente de celle du lot : ${id}`);
  verifLot += 1;
  P(`- **Publié** : nuance du sens : « ${s.nuance} » ; particules du sens : ${(s.particles ?? []).join(', ') || 'aucune'} ; nuance de l'ENTRY : ${e.nuance ? `« ${e.nuance} »` : 'aucune'} ; autres sens : ${e.senses.filter((x) => x.id !== id).map((x) => `\`${x.id}\` « ${x.meaning.primary} », nuance « ${x.nuance ?? '—'} »`).join(' ; ') || 'aucun'}.`);
  P(`- **Décisions de l'ENTRY** : ${decisionsDe(sid).map((d) => `${d.id.replace('A2-04-', '')} (${d.kind}, \`${d.field}\`) : « ${d.reason} »`).join(' ; ') || 'aucune'}.`);
  P(`- **Repérage** : ${u.statut} ; ${u.chaines.length ? `chaînes : ${u.chaines.map((c) => `${c.chaine} (${c.classe.startsWith('B') ? `écartée par le tri, ${u.parLecture.includes(c.chaine) ? 'par la lecture' : 'par la graphie'}` : 'signalée'})`).join(' ; ')}` : 'aucune chaîne signalée'}${u.uns.length ? ` ; caractère isolé : ${u.uns.map((k) => k.c).join(', ')}` : ''}.`);
  P(`- **Origine recherchée** : ${f.o}`);
  P(`- **Verdict proposé** : **${f.v}**${f.f ? ` (${FAM[f.f].toLowerCase()})` : ''}.`);
  P(`- **Verdict arbitré (2026-10-12)** : **${f.v}**, confirmé${id === 'v_414_s2' ? ` ; **correction V2-${NUM.get(id)} retenue sous sa forme de repli**, non appliquée : \`nuance\` (sens 2) : « Désigne aussi le camp de l'interlocuteur. » ; l'exemple de la fiche n'est pas retenu comme illustration de ce sens` : (f.k ? ` ; correction V2-${NUM.get(id)} retenue, non appliquée` : '')}${id === 'v_412_s1' ? ' ; le repli こんなりょうり n\'est pas employé' : ''}.`);
  P(`- **Justification** : ${f.m}`);
  if (f.k) P(`- **Correction proposée, non appliquée (V2-${NUM.get(id)})** : ${f.k}`);
  if (f.r) P(`- **Réserve** : ${f.r}`);
  P();
}
if (verifLot !== unites.length) throw new Error('comparaison au lot incomplète');
P('## Y5. Recherches croisées dans les sources figées');
P();
P('Faites par script, en lecture seule, sur `sources/vocab.json` et `sources/exemples.json`, furigana et balises retirés.');
P();
P('| Élément publié | Résultat |');
P('|---|---|');
P('| こっち, dans la fiche de こちら | absent (kana et romaji) ; aucune décision de l\'ENTRY ne le cite |');
P('| そっち, dans la fiche de そちら | absent (kana et romaji) ; aucune décision de l\'ENTRY ne le cite |');
P('| あっち, dans la fiche d\'あちら | absent (kana et romaji) ; aucune décision de l\'ENTRY ne le cite |');
P('| あそこ, dans la fiche d\'あちら | en romaji, dans la nuance : « forme honorifique d\'asoko » |');
P('| あちら, dans la fiche d\'あっち | en romaji, dans la nuance : « variante familière d\'achira » |');
P('| こちら, dans la fiche de こっち ; そちら, dans la fiche de そっち | en kana, dans la nuance de chacune |');
P('| こちらこそ ; こちらは ; あちらは | aucune occurrence dans toutes les fiches et tous les anciens exemples |');
P('| 田中 | fiches de 先生 et de 奥さん ; anciens exemples de 元気 et de 奥さん ; jamais avec こちら ni あちら |');
P('| こっちの話 ; こんな本 ; そっちはどう | aucune occurrence |');
P('| あの本 | un ancien exemple de 売る ; absent de la fiche d\'あの |');
P('| こんな + りょうり | l\'exemple de la fiche de こんな (en kana) ; 料理 en kanji dans un de ses anciens exemples |');
P();
P('## Y6. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t6-6c.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches sont exactement la livraison 6c du périmètre arbitré | oui : ${unites.length} nuances distinctes, toutes des nuances de sens, dans ${new Set(bloc.map((u) => u.entree)).size} ENTRY du lot 11 (こちら, そちら, あちら, あっち, あの, こっち, こんな, そっち) ; 6d (7) et 6e (11) ne sont pas lues |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').length} faux positif présumé, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} à caractère isolé seulement |`);
P('| La nuance publiée est celle du lot validé | oui, pour les dix (comparaison de `data/n5/vocab.json` et de `lot-11.json`, sens par sens, par rang, traduction principale vérifiée) |');
P(`| Verdicts proposés | ${src.length} sourcé, ${ass.length} assumé, ${ec.length} écarts ; total ${unites.length} |`);
P(`| Un écart a une famille et une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}, à la suite de V2-${DERNIER_V2} |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé |`);
const cand = [...new Set(bloc.flatMap((u) => u.candidats377))];
P(`| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : les ${cand.length} sens de 6c restent tous candidats (populations imposées des \`null\` avec fonction linguistique) ; **leurs fonctions, leurs types et leurs catégories ne sont pas examinés ici** |`);
P(`| Sens des 147 | ${bloc.filter((u) => u.dans147.length).map((u) => `${u.mot} (${u.dans147.join(', ')})`).join(', ') || 'aucun'} |`);
P(`| Corrections retenues | ${AVANT} (10 + 5 + 123), dans ${ENTREES_AVANT} ENTRY, ${AVANT} lignes recomptées dans le bilan, inchangées, aucune appliquée ; si les ${ec.length} propositions étaient retenues : ${AVANT + ec.length} corrections, dans ${entreesApres} ENTRY |`);
P(`| Verdicts arbitrés (2026-10-12) | 1 sourcé, 0 assumé, 9 écarts ; les 10 confirmés ; V2-124 à V2-131 retenues sans modification, **V2-132 retenue sous sa forme de repli** : ${AVANT + ec.length} corrections, dans ${entreesApres} ENTRY, aucune appliquée |`);
P(`| **Décompte du chantier** | ${RESTE_AVANT} nuances du plan restaient à lire ; **${unites.length} sont contrôlées dans cette livraison ; ${RESTE_AVANT - unites.length} resteraient après son arbitrage** : tranche 6, ${resteT6} (6d : 7 ; 6e : 11) ; tranche 7, 39 ; tranche 8, 44 (recompte du plan : ${reste.length}). |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6c.md'), md);
console.log(`6c : ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} ; ENTRY après : ${entreesApres} ; reste ${RESTE_AVANT - unites.length} (plan : ${reste.length} ; tranche 6 : ${resteT6})`);
