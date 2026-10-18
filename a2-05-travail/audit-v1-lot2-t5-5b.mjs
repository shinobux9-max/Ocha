// A2-05 · volet 1 · lot 2 (provenance) · tranche 5, livraison 5b (lot 08, parole et échange : 9 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t5-5b.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5b.md
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
const r5a = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5a.md'), 'utf8');
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_169_s1: { v: 'sourcé', o: "名前を呼ぶ : ancien exemple « 学生 の 名前 を 呼びました ». 友達を呼ぶ : exemple de la fiche « 部屋 の 中 から 友達 を 呼びます ».", m: "Les deux chaînes sont la forme du dictionnaire d'un exemple de la fiche, privé d'un complément (学生の ; 部屋の中から) : retrait de mots, construction intacte (critère 1). La particule を est celle de la fiche.", r: "La traduction française jointe (« inviter des amis ») est hors périmètre." },
  v_169_s2: { v: 'écart', f: 'construit', o: "Aucune. La fiche dit « ou de le nommer », sans construction japonaise. D0513 cite 〜と呼ぶ pour fonder le découpage (« donner un nom (〜と呼ぶ) »), sans fondement dans les sources.", m: "Construction nommée par une décision de découpage, non attestée par la fiche (critère 1) : comme D0196 (まずい) et D0442 (字), arbitrés au lot 02 et au lot 06.", k: "`nuance` (sens 2) : « Nommer, donner un nom. », d'après la fiche." },
  v_174: { v: 'sourcé', o: "Ancien exemple : « 先生 から の 質問 に、はっきりと 答えて ください » ; exemple : « 先生 の 質問 に 日本語 で 答えます » ; particule に de la fiche.", m: "質問に答える est la forme du dictionnaire de l'ancien exemple, privé de はっきりと (critère 1) ; la particule est celle de la fiche." },
  v_175_s1: { v: 'sourcé', o: "Exemple de la fiche : « 毎日 朝 ラジオ の 音楽 を 聞きます ».", m: "音楽を聞く est la forme du dictionnaire de l'exemple, privé de ラジオの (critère 1)." },
  v_175_s2: { v: 'écart', f: 'construit', o: "La nuance de la fiche dit « cette personne doit toujours être suivie de la particule に » ; ancien exemple : « 交番 の おまわりさん に 道 を 聞きました ». 先生に聞く : aucune ; 先生 n'apparaît que dans « 先生 の 話 を 聞いて », une autre construction (écouter).", m: "La règle est sourcée ; **l'exemple 先生に聞く change le complément** de la construction attestée (おまわりさんに → 先生に) : ce n'est pas une normalisation (arbitrage de 5a).", k: "`nuance` (sens 2) : « La personne à qui l'on demande est suivie de に : おまわりさんに道を聞く. », la forme de l'ancien exemple." },
  v_176: { v: 'écart', f: 'construit', o: "ゆう : nuance de la fiche (« il est très fréquemment prononcé 'yuu' »). 〜と言う : ancien exemple « 友達 に「ありがとう」と 言ったら ». 田中と言います : aucune ; la fiche ne parle pas de se présenter. D0504 : « « Nommer » (〜と言う) est un emploi repris dans la nuance ».", m: "**ゆう est recevable**, transcription en kana d'un romaji attesté. **La construction と言う est attestée** par l'ancien exemple, et D0504 assume l'emploi « nommer ». **田中と言います est construit** (critère 1), et l'emploi « s'appeler, se nommer » qui l'accompagne ne vient ni de la fiche ni de D0504.", k: "`nuance` (ENTRY) : « 〜と言う : nommer. À l'oral, souvent prononcé ゆう. », la construction de l'ancien exemple et l'emploi assumé par D0504." },
  v_177: { v: 'sourcé', o: "Exemple de la fiche : « ともだち と 日本語 で 話します » ; nuance : « Pour indiquer la langue parlée [...], on utilise la particule を (wo) ou で (de) juste avant le verbe ».", m: "日本語で話す est l'exemple de la fiche, à la forme du dictionnaire (critère 1). 日本語を話す applique au même mot la seconde particule **que la fiche nomme elle-même** pour la langue parlée : la particule n'est pas tirée d'un exemple ni changée sans appui, elle est donnée par la description (comme の pour 近く, tranche 1).", r: "**Cas à confirmer** : l'arbitrage de 5a tient qu'un changement de particule n'est pas une normalisation ; ici, la fiche nomme expressément l'alternance を / で. Si l'arbitrage exige l'expression écrite, l'unité est un écart, et la correction serait : « S'exprimer oralement, converser ; parler une langue : 日本語で話す. »" },
  v_699_s2: { v: 'écart', f: 'construit', o: "Aucune. La fiche parle d'« une histoire racontée (comme un conte ou un récit) » ; ses exemples ont 長い話, その話, 先生の話.", m: "Exemple construit (critère 1) : 昔 n'est dans aucun texte de la fiche.", k: "`nuance` (sens 2) : « Une histoire racontée, un récit. », d'après la fiche." },
  v_699: { v: 'assumé', o: "La fiche de 話 dit « Nom dérivé du verbe hanasu (parler) », en romaji. D0507 : « la source décrit 話 comme un nom dérivé du verbe 話す ». La fiche de 話す (`n5_v_177`) existe et écrit 話す.", m: "Faux positif présumé, rapproché par le romaji : la graphie 話す n'est pas écrite par la fiche de 話, mais **D0507 assume ce renvoi, et son fondement se vérifie** (la fiche de 話 nomme le verbe hanasu ; celle de 話す l'écrit). Critère 2, par la décision ; même cas que クラス / 教室.", r: "Si l'arbitrage exige la graphie dans la fiche examinée, l'unité est un écart, et la correction serait : « Nom correspondant au verbe はなす. », transcription du romaji de la fiche." }
};

const ORAL = ['呼ぶ', '答える', '聞く', '言う', '話す', '話'];
const bloc = plan.toutes.filter((u) => u.tranche === '5' && u.lotN === '08' && ORAL.includes(u.mot));
const unites = bloc.map((u) => court(u.sens));
if (!r5a.includes('**arbitré le 2026-10-10**')) throw new Error('5a non arbitrée');
if (bloc.length !== 9 || Object.keys(F).length !== 9 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`5b : manquantes ${unites.filter((u) => !F[u])} ; en trop ${Object.keys(F).filter((k) => !unites.includes(k))}`);
for (const [id, f] of Object.entries(F)) if (!['sourcé', 'assumé', 'écart'].includes(f.v) || (f.v === 'écart') !== Boolean(f.k) || (f.v === 'écart') !== Boolean(f.f)) throw new Error(`verdict, correction ou famille incohérents : ${id}`);
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
const DERNIER_V2 = Math.max(...[...r5a.matchAll(/^\| V2-(\d+) \|/gm)].map((m) => Number(m[1])));
if (DERNIER_V2 !== 102) throw new Error(`dernier numéro V2 : ${DERNIER_V2}`);

const src = unites.filter((c) => F[c].v === 'sourcé'), ass = unites.filter((c) => F[c].v === 'assumé'), ec = unites.filter((c) => F[c].v === 'écart');
const NUM = new Map(ec.map((c, i) => [c, DERNIER_V2 + i + 1]));
const motDe = (c) => bloc.find((u) => court(u.sens) === c).mot;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
const RESTE_AVANT = 150;
const FAM = { construit: 'Exemple construit ou complément changé (critère 1)' };
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : tranche 5, livraison 5b (lot 08, parole et échange)');
P();
P('**Date** : 2026-10-10');
P('**Statut** : **arbitré le 2026-10-10** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **4 sourcés, 1 assumé, 4 écarts**, les neuf verdicts confirmés, V2-103 à V2-106 retenues sans modification. La proposition est conservée telle quelle ci-dessous.');
P();
P('## T0. Arbitrage du 2026-10-10');
P();
P('- **Sourcés, confirmés** : 呼ぶ sens 1, 答える, 聞く sens 1, 話す (nuance d\'ENTRY). **Assumé, confirmé** : 話 (nuance d\'ENTRY), D0507 assumant le renvoi à 話す avec un fondement vérifiable dans les fiches.');
P('- **Écarts confirmés** : V2-103 呼ぶ sens 2 (〜と呼ぶ retiré ; « Nommer, donner un nom. ») ; V2-104 聞く sens 2 (おまわりさんに道を聞く, attesté, au lieu de 先生に聞く) ; V2-105 言う (田中と言います et la présentation personnelle non sourcée retirés ; 〜と言う et ゆう conservés) ; V2-106 話 sens 2 (昔の話 retiré ; « Une histoire racontée, un récit. »).');
P('- **Précision méthodologique (話す)** : 日本語を話す et 日本語で話す sont **sourcés** ; la fiche donne 日本語で話します et documente l\'alternance を / で. La règle de 5a demeure : remplacer arbitrairement une particule n\'est pas une normalisation ; mais **une variante expressément autorisée par la description de la fiche peut être sourcée lorsqu\'elle conserve le mot et la construction concernés**. Cette précision est propre au contrôle de provenance ; elle n\'élargit pas les normes A2 et n\'autorise aucune variante inférée de connaissances externes.');
P('- **Liste globale unique : 121 corrections (10 + 5 + 106), toutes non appliquées. Restent 141 nuances du plan** (5c : 11 ; tranches 6 à 8 : 130).');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre de la tranche 5 arbitré le 2026-10-10 (ChatGPT, par délégation), en trois livraisons ; ce rapport porte sur les **9 nuances de la livraison 5b** ; 5a est arbitrée ; 5c suivra l\'arbitrage de celle-ci. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict antérieur n\'est rouvert. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.');
P();
P('## T1. Résultat proposé');
P();
P('| Verdict proposé | Nuances | Détail |');
P('|---|---|---|');
P(`| **sourcé** | ${src.length} | ${src.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **assumé** | ${ass.length} | ${ass.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **écart** (E2) | ${ec.length} | ${ec.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **Total** | ${unites.length} | |`);
P();
P('**Ce que la livraison montre** :');
P();
P('- **Les écarts sont tous du critère 1**, dans la formulation arbitrée en 5a : un complément changé (先生に聞く pour おまわりさんに道を聞く), un exemple construit (田中と言います, 昔の話), une construction que seule une décision de découpage nomme (〜と呼ぶ, D0513).');
P('- **話す pose une question nouvelle, à confirmer** : la fiche nomme elle-même l\'alternance を / で pour la langue parlée ; 日本語を話す n\'est pas une particule changée sans appui, mais l\'application d\'une règle que la fiche énonce (proposé sourcé, comme の pour 近く).');
P('- **話 (nuance d\'ENTRY) est assumé** : D0507 renvoie au verbe 話す, que la fiche de 話 nomme en romaji (hanasu) et que la fiche de 話す écrit.');
P('- **ゆう (言う)** : transcription en kana du romaji « yuu » de la fiche, recevable.');
P();
P('## T2. Critères appliqués');
P();
P('Ceux des livraisons précédentes, dont la **précision arbitrée en 5a** : la forme du dictionnaire et le retrait de mots non essentiels sont admis lorsque la construction attestée reste intacte ; remplacer un complément ou changer une particule n\'est pas une simple normalisation. Et : renvoi appuyé par la fiche ou par une décision au fondement vérifiable (critère 2) ; transcription en kana d\'un romaji attesté recevable ; une décision qui nomme une expression pour fonder un découpage ne la source pas ; classement **sourcé / assumé / écart**.');
P();
P('## T3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}) ; elles ne rejoindront la liste globale unique qu'après arbitrage, à part des 117 déjà retenues.`);
P();
P('| # | Unité | Mot | Famille | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${motDe(c)} | ${F[c].f} | ${F[c].k} |`);
P();
P(`## T4. Les ${unites.length} fiches de provenance`);
P();
P('Les furigana des fiches sont rendus entre crochets.');
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
  P(`- **Verdict arbitré (2026-10-10)** : **${f.v}**, confirmé${f.k ? ` ; correction V2-${NUM.get(id)} retenue, non appliquée` : ''}.`);
  P(`- **Justification** : ${f.m}`);
  if (f.k) P(`- **Correction proposée, non appliquée (V2-${NUM.get(id)})** : ${f.k}`);
  if (f.r) P(`- **Réserve** : ${f.r}`);
  P();
}
P('## T5. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t5-5b.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches sont exactement la livraison 5b du périmètre arbitré | oui : ${unites.length} nuances distinctes, ${new Set(bloc.map((u) => u.entree)).size} ENTRY, toutes du lot 08 ; 5c (11) n'est pas lue |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').length} faux positif présumé, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} à caractère isolé seulement |`);
P(`| Verdicts proposés | ${src.length} sourcés, ${ass.length} assumé, ${ec.length} écarts ; total ${unites.length} |`);
P(`| Un écart a une famille et une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}, à la suite de V2-102 |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé |`);
P(`| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : ${bloc.filter((u) => u.candidats377.length).map((u) => `${u.mot} (${court(u.sens)})`).join(', ') || 'aucune'} restent candidats |`);
P('| Verdicts arbitrés (2026-10-10) | 4 sourcés, 1 assumé, 4 écarts ; les 9 confirmés |');
P('| Corrections retenues | avant l\'arbitrage : 117 ; après : **121 (10 + 5 + 106)**, aucune appliquée |');
P(`| **Décompte du chantier** | ${RESTE_AVANT} nuances du plan restaient à lire ; **${unites.length} sont contrôlées dans cette livraison ; ${RESTE_AVANT - unites.length} restent** : tranche 5, 5c (11) ; tranches 6 à 8, 130. |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5b.md'), md);
console.log(`5b : ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} ; reste ${RESTE_AVANT - unites.length}`);
