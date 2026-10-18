// A2-05 · volet 1 · lot 2 (provenance) · tranche 2, lot 00 (9 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t2-lot00.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot00.md
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
const r1bis = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-1bis.md'), 'utf8');
// Les furigana des fiches sont rendus entre crochets (姉[あね]) : la provenance d'une graphie en dépend.
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// v : 'sourcé' | 'écart' ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_226_s1: { v: 'sourcé', o: 'Exemple de la fiche `n5_v_226` : « 部屋 の かぎ を かけます » ; ancien exemple de `n5_v_238` : « ドア の 鍵 が かかって いる ». La nuance de `n5_v_226` dit : « s\'écrivant parfois en kanji 鍵[かぎ] (kagi) ».', m: 'Forme du dictionnaire de l\'exemple de la fiche (かけます → かける), réduit à かぎを (critère 1). La graphie 鍵 n\'est pas reconstituée : la fiche l\'écrit elle-même pour ce mot, la fiche fusionnée `n5_v_238` a 鍵 pour mot, et D0062 en fait la forme usuelle. **Identité du mot, et non seulement de la lecture.**', r: 'À la différence de 自動車 (V2-28), où la fiche n\'écrit jamais 車 pour le mot de la conversation, la fiche de かぎ écrit 鍵 pour ce mot même.' },
  v_420: { v: 'écart', o: 'よい et 良い : lecture et mot de la fiche (« いい / よい », « Sa forme de dictionnaire formelle est yoi »). よかった : ancien exemple « とても 良[よ]かったです ». よくない : aucune. La fiche dit seulement que いい et よい « partagent les mêmes formes conjuguées en yoi- ».', m: '**よい, 良い et よかった sont sourcés** : よかった est la graphie 良かった de l\'ancien exemple, avec ses furigana, ramenée à la forme simple (critère 1). **よくない ne l\'est pas** : aucune fiche ni aucun exemple n\'écrit cette forme ; elle est reconstituée par la grammaire, comme 来ない (V2-25). D0037 assume la description de la lecture よい dans la nuance, non cette forme.', k: '`nuance` (ENTRY) : « Forme écrite ou soutenue : よい (良い). Les formes conjuguées viennent de よい : よかった. »', r: 'La correction garde よかった, attesté ; elle ne remplace pas よくない par une désignation (« négative »), la fiche n\'en nommant aucune.' },
  v_555_s1: { v: 'sourcé', o: 'Ancien exemple de `n5_v_555` : « 次 の 角 を 右 に 曲がって ください » ; exemple de `n5_v_672` : « つぎ の かど を みぎ に 曲ります » ; particules de la fiche : を, に.', m: 'Les deux chaînes sont la forme du dictionnaire du même exemple, privé chaque fois d\'un de ses compléments (角を右に曲がって → 角を曲がる, 右に曲がる). Le retrait de mots est admis par le critère 1 ; aucun mot, aucune particule ni aucune construction ne change. Les particules sont celles de la fiche.' },
  v_564: { v: 'écart', o: 'Nuance de la fiche : « à ne pas confondre avec le verbe intransitif nakunaru なくなる qui signifie « disparaître » ou « décéder » ». La fiche écrit ce mot en kana ; aucune fiche ni aucun exemple n\'écrit 無くなる.', m: 'Le renvoi à l\'intransitif est appuyé par la fiche (critère 2), mais la graphie 無くなる ne l\'est pas : elle est reconstituée par analogie avec 無くす. Même cas que 自動車 (V2-28, クルマ et non 車) : le mot est attesté, sa graphie publiée ne l\'est pas.', k: '`nuance` (ENTRY) : « Transitif (を) ; ne pas confondre avec l\'intransitif なくなる (disparaître, être perdu). », la graphie de la fiche.', r: '**Preuve insuffisante plutôt qu\'erreur** : le mot est celui de la fiche, seule sa graphie diffère. Le texte français (« être perdu », là où la fiche dit « décéder ») est hors périmètre.' },
  v_17: { v: 'sourcé', o: 'Nuance de la fiche `n5_v_17` : « on utilise 姉[あね] (ane) ».', m: 'Le mot 姉 est écrit dans la fiche, avec sa lecture en furigana et en romaji : la graphie et la lecture publiées (姉, あね) sont toutes deux celles de la fiche. Identité du mot établie, non simple identité de lecture. Critère 2.' },
  v_18: { v: 'sourcé', o: 'Nuance de `n5_v_18` : « le terme neutre 母[はは] (haha) » ; nuance de `n5_v_592` : « le terme humble haha (母) ».', m: 'Le mot 母 est écrit dans les deux fiches, avec sa lecture. Identité du mot établie. Critère 2.' },
  v_19: { v: 'sourcé', o: 'Nuance de `n5_v_19` : « on emploie le terme 父[ちち] (chichi) » ; nuance de `n5_v_590` : « le terme neutre chichi (父) ».', m: 'Le mot 父 est écrit dans les deux fiches, avec sa lecture. Identité du mot établie. Critère 2.' },
  v_44_s1: { v: 'sourcé', o: 'Nuance de `n5_v_44` : « avoir faim (おなかがすいた, onakagasuita) ou avoir mal au ventre (おなかが痛い, onakaga itai) » ; exemple de `n5_v_45` : « お腹 が 痛い です » ; ancien exemple de `n5_v_45` : « お腹 が 空いた ».', m: 'Les deux expressions sont celles de la nuance de la fiche, écrites avec la graphie お腹 que la fiche fusionnée `n5_v_45` emploie pour le même mot (et que D0057 fait forme usuelle) ; お腹が痛い est mot pour mot dans l\'exemple de `n5_v_45`. Aucun mot ajouté. Critère 1.', r: 'お腹がすいた mêle la graphie お腹 (fiche `n5_v_45`) et すいた en kana (fiche `n5_v_44`) ; l\'ancien exemple de `n5_v_45` écrit 空いた. C\'est un choix d\'écriture entre deux formes attestées du même mot, non une graphie reconstituée.' },
  v_68_s1: { v: 'sourcé', o: 'Nuance de `n5_v_68` : « par opposition à 着[き]る (kiru) pour le haut ».', m: 'Le mot 着る est écrit dans la fiche, avec sa lecture : la graphie et la lecture publiées (着る, きる) sont celles de la fiche, et l\'opposition haut / bas du corps est la sienne. Critère 2.' }
};

// Exhaustivité : exactement le lot 00 de la tranche 2 du périmètre arbitré
const bloc = plan.tranche2.filter((u) => u.lotN === '00');
const unites = bloc.map((u) => court(u.sens));
if (bloc.length !== 9 || Object.keys(F).length !== 9 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`lot 00 : ${unites} / fiches : ${Object.keys(F)}`);
for (const [id, f] of Object.entries(F)) if ((f.v === 'écart') !== Boolean(f.k)) throw new Error(`correction incohérente : ${id}`);
if (plan.tranche2.length !== 43 || plan.tranche2.filter((u) => u.lotN === '01').length !== 34) throw new Error('tranche 2 : 43 nuances, dont 34 du lot 01, attendues');
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
if (!r1bis.includes('**arbitré le 2026-10-10**')) throw new Error('bloc 1 bis non arbitré');
const DERNIER_V2 = Math.max(...[...r1bis.matchAll(/^\| V2-(\d+) \|/gm)].map((m) => Number(m[1])));
if (DERNIER_V2 !== 30) throw new Error(`dernier numéro V2 : ${DERNIER_V2}`);

const src = unites.filter((c) => F[c].v === 'sourcé'), ec = unites.filter((c) => F[c].v === 'écart');
const NUM = new Map(ec.map((c, i) => [c, DERNIER_V2 + i + 1]));
const motDe = (c) => bloc.find((u) => court(u.sens) === c).mot;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
const RESTE_AVANT = 268;
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : tranche 2, lot 00');
P();
P('**Date** : 2026-10-10');
P('**Statut** : **arbitré le 2026-10-10** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **7 sourcés, 2 écarts**, les neuf verdicts proposés confirmés, V2-31 et V2-32 retenues sans modification (§L0). La proposition est conservée telle quelle aux §L1 à §L5.');
P();
P('## L0. Arbitrage du 2026-10-10');
P();
P('- **Sourcés, confirmés** : `v_226_s1` 鍵, `v_555_s1` 曲がる, `v_17` お姉さん, `v_18` お母さん, `v_19` お父さん, `v_44_s1` お腹, `v_68_s1` 履く.');
P('- **V2-31 `v_420` いい** : écart confirmé ; retirer よくない, absent des sources ; conserver よい (良い) et よかった, attestés dans les fiches et les anciens exemples.');
P('- **V2-32 `v_564` 無くす** : écart confirmé ; remplacer 無くなる par なくなる, graphie employée par la fiche source.');
P('- **Critère confirmé** : une graphie n\'est sourcée que si la fiche, ou sa fiche fusionnée, l\'atteste pour le mot concerné. Une graphie déduite par analogie, même plausible, n\'est pas sourcée dans ce chantier.');
P('- **Liste consolidée : 47 corrections (10 + 5 + 32), aucune appliquée. Restent 259 nuances** (lot 01 : 34 ; tranches 3 à 8 : 225), plus les 2 hors JLPT, comptées à part.');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre de la tranche 2 arbitré le 2026-10-10 (ChatGPT, par délégation), livré par lot d\'origine : ce rapport porte sur les **9 nuances du lot 00** (« Identité : doublons candidats, formes et lectures avec « / » ») ; le lot 01 (34 nuances) fera l\'objet d\'une livraison distincte. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict antérieur n\'est rouvert. **Le texte français des nuances est hors périmètre.**');
P();
P('## L1. Résultat proposé');
P();
P('| Verdict proposé | Nuances | Détail |');
P('|---|---|---|');
P(`| **sourcé** | ${src.length} | ${src.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **écart** (E2) | ${ec.length} | ${ec.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **Total** | ${unites.length} | |`);
P();
P('Aucune nuance n\'est « assumée » en entier par une décision ; D0037 assume la description de la lecture よい dans la nuance de いい, sans plus.');
P();
P('**Ce que le lot montre** :');
P();
P('- **Les cinq faux positifs présumés sont sourcés, et pour une raison vérifiée** : le mot écrit dans la nuance (姉, 母, 父, 着る, お腹がすいた) est écrit dans la fiche **sous la même graphie**, furigana compris. La contre-vérification distingue ici l\'identité du mot de la simple identité de lecture : aucun ne repose sur la seule lecture.');
P('- **Deux écarts, tous deux de forme** : une forme conjuguée que la fiche n\'écrit pas (よくない, comme 来ない en V2-25) et une graphie en kanji d\'un mot que la fiche écrit en kana (無くなる pour なくなる, comme 車 pour クルマ en V2-28).');
P('- **Ce qui sépare 鍵 et お腹 (sourcés) de 無くなる (écart)** : pour 鍵 et お腹, la fiche ou sa fiche fusionnée écrit elle-même cette graphie pour ce mot ; pour 無くなる, aucune fiche ne l\'écrit.');
P();
P('## L2. Critères appliqués');
P();
P('Les critères arbitrés le 2026-10-08 et les précédents de la tranche 1 et du bloc 1 bis, sans changement : forme du dictionnaire d\'un exemple de la fiche, retrait de mots compris (critère 1) ; renvoi appuyé par la fiche examinée ou par une décision au fondement vérifiable (critère 2) ; **aucune forme ni graphie reconstituée** quand la fiche nomme un mot sans l\'écrire sous cette forme (critère 3 ; 来る, 自動車, 橋). Les rapprochements du tri et les caractères isolés n\'ont servi qu\'au repérage.');
P();
P('## L3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}) ; elles ne rejoindront la liste consolidée qu'après arbitrage, à part des 45 déjà retenues.`);
P();
P('| # | Unité | Mot | Lot | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${motDe(c)} | 00 | ${F[c].k} |`);
P();
P('## L4. Les 9 fiches de provenance');
P();
P('Les furigana des fiches sont rendus entre crochets : 姉[あね].');
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
  P(`- **Verdict proposé** : **${f.v}**.`);
  P(`- **Verdict arbitré (2026-10-10)** : **${f.v}**, confirmé${f.k ? ` ; correction V2-${NUM.get(id)} retenue sans modification, non appliquée` : ''}.`);
  P(`- **Justification** : ${f.m}`);
  if (f.k) P(`- **Correction proposée, non appliquée (V2-${NUM.get(id)})** : ${f.k}`);
  if (f.r) P(`- **Réserve** : ${f.r}`);
  P();
}
P('## L5. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t2-lot00.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches sont exactement le lot 00 de la tranche 2 arbitrée | oui : ${unites.length} nuances distinctes, ${new Set(bloc.map((u) => u.entree)).size} ENTRY |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').length} faux positifs présumés, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} à caractère isolé seulement |`);
P(`| Verdicts proposés | ${src.length} sourcés, ${ec.length} écarts ; total ${unites.length} |`);
P(`| Un écart a une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}, à la suite de V2-30 |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé ; いい, 無くす et お腹 portent un sens des 147, non rouvert |`);
P('| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : 鍵 et 履く restent candidats pour leurs propres relevés |');
P(`| Verdicts arbitrés (2026-10-10) | ${src.length} sourcés, ${ec.length} écarts ; les ${unites.length} confirmés |`);
P('| Corrections retenues | avant l\'arbitrage : 45 ; après : **47 (10 + 5 + 32)**, aucune appliquée |');
P(`| **Décompte du chantier** | ${RESTE_AVANT} nuances restaient à lire après le bloc 1 bis ; **${unites.length} sont contrôlées dans ce lot** ; **${RESTE_AVANT - unites.length} restent** : tranche 2, lot 01, 34 ; tranches 3 à 8, 225. Les 2 nuances hors JLPT restent comptées à part. |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot00.md'), md);
console.log(`lot 00 : ${src.length} sourcés, ${ec.length} écarts ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} ; reste ${RESTE_AVANT - unites.length}`);
