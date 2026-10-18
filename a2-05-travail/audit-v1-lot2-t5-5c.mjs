// A2-05 · volet 1 · lot 2 (provenance) · tranche 5, livraison 5c (lot 09, loisirs et voyages : 11 nuances), arbitrée le 2026-10-12.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t5-5c.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5c.md
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
const r5b = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5b.md'), 'utf8');
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_26: { v: 'écart', f: 'renvoi', o: "外国に行く : ancien exemple « 私 は 一度 も 外国 に 行った こと が ありません » (et l'exemple de la fiche : 外国 へ 旅行 に 行きたい). 外国人 : aucune dans la fiche de 外国 ; aucune décision de l'ENTRY ne le cite (D0571 ne porte que sur un tag). Le mot n'est écrit que par la fiche de 外国人 (`n5_v_27`), qui ne renvoie pas à 外国.", m: "**外国に行く est sourcé** : forme du dictionnaire de l'ancien exemple, privé de 一度も, construction に行く intacte (critère 1). **Le renvoi à 外国人 n'a pas d'appui** dans la fiche examinée ni dans une décision : une attestation dans une autre fiche, sans décision, ne suffit pas (critère 2, doctrine お手洗い / トイレ). La nuance de 外国人 est elle-même retirée par V2-37, sans renvoi à 外国.", k: "`nuance` (ENTRY) : « Tout pays autre que le Japon : 外国に行く, aller à l'étranger. », sans le renvoi à 外国人." },
  v_192: { v: 'assumé', o: "ギター : ancien exemple « ギター を 弾き ながら ». ピアノ : exemple de la fiche. 吹く, 叩く : nuance de la fiche, en kanji avec furigana. 引く : absent de la fiche de 弾く ; D0545 : « aucun sens n'est repris de l'homophone 引く » ; D1210 (lot 18) : la fiche de 引く (`n5_v_130`, lecture ひく) attribue à 引く « jouer d'un instrument à cordes ou du piano », emploi de 弾く, de même lecture.", m: "Faux positif présumé, rapproché par la lecture ひく. ギター, ピアノ, 吹く et 叩く sont **sourcés**. La graphie 引く n'est pas dans la fiche de 弾く, mais **D0545 et D1210 assument le renvoi à l'homophone, et leur fondement se vérifie** dans les sources figées : les deux fiches ont la lecture ひく, et la fiche de 引く porte l'emploi musical par confusion. Critère 2, par la décision ; même cas que 話 (D0507).", r: "Si l'arbitrage exige la graphie dans la fiche examinée, l'unité est un écart, et la correction serait : « Seulement pour les cordes et les claviers (ギター, ピアノ) ; les instruments à vent se jouent avec 吹く, les percussions avec 叩く. »" },
  v_193: { v: 'écart', f: 'construit', o: "散歩する : fiche fusionnée `n5_v_194` (散歩する) ; D0557. 公園を散歩する : exemple de la fiche fusionnée « 公園 を 散歩します ». 犬の散歩 : aucune ; seul l'ancien exemple « 犬 と 一緒 に 近所 を 散歩 して います » a 犬, dans une autre construction (と一緒に).", m: "散歩する et 公園を散歩する sont **sourcés** (fiche fusionnée, forme du dictionnaire, critère 1). **犬の散歩 est construit** : la construction N の散歩 n'est dans aucun texte de la fiche ni de sa fiche fusionnée ; tirer 犬の散歩 de 犬と一緒に…散歩して change la construction (critère 1, arbitrage de 5a).", k: "`nuance` (ENTRY) : « 散歩する : se promener ; 公園を散歩する, se promener dans le parc. », sans 犬の散歩." },
  v_196: { v: 'sourcé', o: "映画館 : nuance de la fiche (« le mot 映画館 (eigakan) »). 映画を見る : exemple de la fiche « 友達 と 映画 を 見ます ».", m: "映画館 est écrit par la fiche ; 映画を見る est la forme du dictionnaire de l'exemple, privé de 友達と (critère 1), avec la graphie 見る de l'exemple (un ancien exemple écrit 観ました)." },
  v_197: { v: 'sourcé', o: "Nuance de la fiche : « très souvent précédé de son nom associé 歌 (uta - chanson) avec la particule を » ; ancien exemple « 大きな 声 で 歌 を 歌う の が 好き です ».", m: "歌を歌う est dans l'ancien exemple, à la forme du dictionnaire, privé de 大きな声で (critère 1), et la fiche décrit la construction. Le caractère isolé 歌 est celui du nom que la fiche écrit." },
  v_198: { v: 'sourcé', o: "Nuance de la fiche : « Le lieu où l'on nage (comme une piscine ou la mer) se marque généralement avec la particule で » ; exemple « うみ で 泳ぎます » ; anciens exemples « 近く の 市民 プール へ 行って […] 泳ぎました » et « プール で 上手 に 泳げる よう に なる ».", m: "La règle (で pour le lieu) est énoncée par la fiche, qui nomme la piscine comme lieu ; プール et プールで sont dans les anciens exemples. プールで泳ぐ conserve le mot, la particule et la construction attestés : c'est l'application d'une construction **que la description de la fiche autorise expressément** (précision de 5b, 話す), non un complément changé.", r: "L'ancien exemple a プールで… 泳げる (forme potentielle) ; la forme 泳ぐ de la publication est celle de l'entrée, non tirée d'une conjugaison. Si l'arbitrage exige un exemple de la fiche, l'unité est un écart, et la correction serait : « Le lieu se marque avec で : 海で泳ぐ. » (exemple うみで泳ぎます, graphie 海 des anciens exemples)." },
  v_199: { v: 'sourcé', o: "Nuance de la fiche : « la personne concernée doit être suivie de la particule と » ; exemple « ともだち と こうえん で 遊びます » ; ancien exemple « 友達 の 家 で ゲーム をして 遊ぶ ».", m: "友達と遊ぶ est la forme du dictionnaire de l'exemple, privé de しゅうまつに et こうえんで (critère 1) ; la particule と est celle de la fiche ; la graphie 友達 est attestée pour le mot par un ancien exemple de la même fiche." },
  v_243: { v: 'écart', f: 'construit', o: "Nuance de la fiche : « la région natale d'une personne » ; exemple « わたし の 国 へ かえります ». 国に帰る : la particule に et la graphie 帰る ne sont dans aucun texte de la fiche ; D0568 cite 国に帰る pour fonder le regroupement en un seul sens. お国はどちらですか : aucune ; la fiche n'a ni お国 ni cette question.", m: "**国に帰る change la particule** de la construction attestée (国へかえる) et ajoute un kanji que la fiche n'écrit pas (帰る) : ce n'est pas une normalisation (critère 1, arbitrage de 5a ; une graphie n'est sourcée que si la fiche l'atteste). D0568 nomme l'expression pour fonder un découpage, ce qui ne la source pas (comme D0196, D0442, D0513). **お国はどちらですか est construit**, et sa forme honorifique (お国) n'est pas sourcée d'office (critère 3).", k: "`nuance` (ENTRY) : « Désigne aussi le pays ou la région d'origine de quelqu'un : 国へかえる, rentrer dans son pays. », la forme de l'exemple, sans お国はどちらですか." },
  v_676: { v: 'sourcé', o: "Nuance de la fiche : « l'expression *uta o utau* » ; anciens exemples « 歌 を 歌って います », « 歌 を 上手 に 歌いました ».", m: "Faux positif confirmé, rapproché par le romaji : 歌を歌う est la forme du dictionnaire d'un ancien exemple de la fiche (critère 1), et la fiche nomme l'expression." },
  v_689: { v: 'sourcé', o: "Nuance de la fiche : « On l'associe fréquemment au verbe *kaku* (dessiner ou peindre) » ; exemple « きれい な 絵 を かき ます » ; anciens exemples « 綺麗 な 絵 を 描きました », « 絵 を 描いて います ».", m: "絵を描く est la forme du dictionnaire des anciens exemples, avec leur graphie 描く (critère 1) ; かく transcrit le romaji kaku de la fiche, que son exemple écrit en kana (recevable). La graphie 描く est attestée pour cette construction par la fiche de 絵, à la différence de V2-95 (勉強), où l'ajout n'avait pas d'appui." },
  v_707: { v: 'sourcé', o: "Exemple de la fiche : « うみ で 釣り を し ます » ; ancien exemple « 海 へ 釣り に 行きました » ; D0554 : « les constructions qu'elle documente effectivement, 釣りをする et 釣りに行く ».", m: "釣りをする et 釣りに行く sont les formes du dictionnaire de l'exemple et de l'ancien exemple, privés de leurs compléments de lieu (critère 1)." }
};

const bloc = plan.toutes.filter((u) => u.tranche === '5' && u.lotN === '09');
const unites = bloc.map((u) => court(u.sens));
if (!r5b.includes('**arbitré le 2026-10-10**')) throw new Error('5b non arbitrée');
if (bloc.length !== 11 || Object.keys(F).length !== 11 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`5c : manquantes ${unites.filter((u) => !F[u])} ; en trop ${Object.keys(F).filter((k) => !unites.includes(k))}`);
for (const [id, f] of Object.entries(F)) if (!['sourcé', 'assumé', 'écart'].includes(f.v) || (f.v === 'écart') !== Boolean(f.k) || (f.v === 'écart') !== Boolean(f.f)) throw new Error(`verdict, correction ou famille incohérents : ${id}`);
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
const DERNIER_V2 = Math.max(...[...r5b.matchAll(/^\| V2-(\d+) \|/gm)].map((m) => Number(m[1])));
if (DERNIER_V2 !== 106) throw new Error(`dernier numéro V2 : ${DERNIER_V2}`);
const reste = plan.toutes.filter((u) => ['6', '7', '8'].includes(u.tranche));

const src = unites.filter((c) => F[c].v === 'sourcé'), ass = unites.filter((c) => F[c].v === 'assumé'), ec = unites.filter((c) => F[c].v === 'écart');
const NUM = new Map(ec.map((c, i) => [c, DERNIER_V2 + i + 1]));
const motDe = (c) => bloc.find((u) => court(u.sens) === c).mot;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
const RESTE_AVANT = 141;
if (RESTE_AVANT - unites.length !== reste.length) throw new Error(`décompte : ${RESTE_AVANT - unites.length} contre ${reste.length} au plan`);
const FAM = { construit: 'Exemple construit, complément ou particule changés (critère 1)', renvoi: 'Renvoi sans appui dans la fiche ni dans une décision (critère 2)' };
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : tranche 5, livraison 5c (lot 09, loisirs et voyages)');
P();
P('**Date** : 2026-10-10');
P('**Statut** : **arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **7 sourcés, 1 assumé, 3 écarts**, les onze verdicts confirmés, V2-107 à V2-109 retenues sans modification. **La tranche 5 est close.** La proposition est conservée telle quelle ci-dessous.');
P();
P('## U0. Arbitrage du 2026-10-12');
P();
P('- **Sourcés, confirmés** : 映画, 歌う, 泳ぐ, 遊ぶ, 歌, 絵, 釣り (nuances d\'ENTRY).');
P('- **泳ぐ, sourcé confirmé** : la fiche documente explicitement le marquage du lieu avec で, notamment pour une piscine ; le mot プール et sa construction avec で figurent dans les anciens exemples. **プールで泳ぐ est conservé ; la correction de repli (海で泳ぐ) n\'est pas employée.**');
P('- **弾く, assumé confirmé** : D0545 et D1210 établissent explicitement la distinction avec l\'homophone 引く, et le fondement est vérifiable dans les sources figées. **Le renvoi est conservé ; la correction de repli n\'est pas employée.** Le candidat sémantique `v_192_s1` reste ouvert dans les 377 candidats C1 à C10.');
P('- **Écarts confirmés** : V2-107 外国 (renvoi non sourcé à 外国人 retiré ; 外国に行く conservé) ; V2-108 散歩 (犬の散歩 retiré, la construction n\'étant pas attestée ; 散歩する et 公園を散歩する conservés) ; V2-109 国 (**国へかえる conservé**, fondé sur l\'exemple source, avec la particule へ et le verbe en kana ; 国に帰る et お国はどちらですか, absents de la source, ne sont pas conservés ; **la correction de repli réduite au français seul n\'est pas employée**).');
P('- **Liste globale unique : 124 corrections (10 + 5 + 109), dans 112 ENTRY, toutes non appliquées.**');
P('- **Clôture documentaire de la tranche 5 : 29 nuances, 14 sourcées, 2 assumées, 13 écarts** (5a : 3, 0, 6 ; 5b : 4, 1, 4 ; 5c : 7, 1, 3). **Restent 130 nuances du plan** : tranche 6, 47 ; tranche 7, 39 ; tranche 8, 44.');
P('- **Inchangés** : les 377 candidats C1 à C10 et les 147 arbitrages du volet 2. **Aucune décision historique n\'est réécrite** (D0545, D0568 et D1210 restent intactes).');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre de la tranche 5 arbitré le 2026-10-10 (ChatGPT, par délégation), en trois livraisons ; ce rapport porte sur les **11 nuances de la livraison 5c**, la dernière de la tranche ; 5a et 5b sont arbitrées. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict antérieur n\'est rouvert. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.');
P();
P('## U1. Résultat proposé');
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
P('- **Les éléments japonais du lot 09 viennent surtout des anciens exemples**, à la forme du dictionnaire et privés de compléments non essentiels : 外国に行く, 歌を歌う, 絵を描く, 釣りに行く, 友達と遊ぶ.');
P('- **Les écarts sont ponctuels, et chaque fois la nuance garde une partie sourcée** : un renvoi sans appui (外国人, pour 外国), une construction tirée d\'une autre (犬の散歩), une particule changée et un kanji ajouté (国に帰る, pour 国へかえる de la fiche), une question honorifique construite (お国はどちらですか).');
P('- **弾く est assumé** : le renvoi à l\'homophone 引く est porté par D0545 et D1210, et la fiche de 引く se vérifie (lecture ひく, emploi musical attribué par confusion).');
P('- **泳ぐ applique la précision de 5b** : la fiche énonce elle-même que le lieu (« comme une piscine ») se marque avec で ; プールで est dans un ancien exemple.');
P();
P('## U2. Critères appliqués');
P();
P('Ceux des livraisons précédentes : forme du dictionnaire et retrait de mots non essentiels admis si la construction attestée reste intacte, mais remplacer un complément ou changer une particule n\'est pas une normalisation (5a) ; **une variante expressément autorisée par la description de la fiche peut être sourcée si elle conserve le mot et la construction** (5b, précision propre au contrôle de provenance) ; renvoi appuyé par la fiche ou par une décision au fondement vérifiable (critère 2), une attestation dans une autre fiche, sans décision, ne suffisant pas ; forme honorifique non sourcée d\'office (critère 3) ; graphie sourcée seulement si la fiche l\'atteste pour le mot ; une décision qui nomme une expression pour fonder un découpage ne la source pas ; classement **sourcé / assumé / écart**.');
P();
P('## U3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}) ; elles ne rejoindront la liste globale unique qu'après arbitrage, à part des 121 déjà retenues. Aucune ENTRY de 5c n'est visée par une correction déjà retenue.`);
P();
P('| # | Unité | Mot | Famille | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${motDe(c)} | ${F[c].f} | ${F[c].k} |`);
P();
P(`## U4. Les ${unites.length} fiches de provenance`);
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
  P(`- **Verdict arbitré (2026-10-12)** : **${f.v}**, confirmé${f.k ? ` ; correction V2-${NUM.get(id)} retenue, non appliquée` : ''}${f.v !== 'écart' && f.r ? ' ; la correction de repli de la réserve n\'est pas employée' : ''}.`);
  P(`- **Justification** : ${f.m}`);
  if (f.k) P(`- **Correction proposée, non appliquée (V2-${NUM.get(id)})** : ${f.k}`);
  if (f.r) P(`- **Réserve** : ${f.r}`);
  P();
}
P('## U5. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t5-5c.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches sont exactement la livraison 5c du périmètre arbitré | oui : ${unites.length} nuances distinctes, ${new Set(bloc.map((u) => u.entree)).size} ENTRY, toutes du lot 09 |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').length} faux positifs présumés, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} à caractère isolé seulement |`);
P(`| Verdicts proposés | ${src.length} sourcés, ${ass.length} assumé, ${ec.length} écarts ; total ${unites.length} |`);
P(`| Un écart a une famille et une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}, à la suite de V2-${DERNIER_V2} |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé |`);
const cand = bloc.filter((u) => u.candidats377.length);
P(`| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : ${cand.map((u) => `${u.mot} (${u.candidats377.join(', ')})`).join(', ') || 'aucune'} ${cand.length === 1 ? 'reste candidat' : 'restent candidats'} |`);
P('| Verdicts arbitrés (2026-10-12) | 7 sourcés, 1 assumé, 3 écarts ; les 11 confirmés |');
P('| Corrections retenues | avant l\'arbitrage : 121 ; après : **124 (10 + 5 + 109)**, dans 112 ENTRY, aucune appliquée |');
P('| **Clôture de la tranche 5** | **close le 2026-10-12** : les 29 nuances de la tranche (5a : 9 ; 5b : 9 ; 5c : 11) sont toutes arbitrées : 14 sourcées, 2 assumées, 13 écarts |');
P(`| **Décompte du chantier** | ${RESTE_AVANT} nuances du plan restaient à lire ; **${unites.length} sont contrôlées dans cette livraison ; ${RESTE_AVANT - unites.length} restent**, toutes dans les tranches 6 à 8 (recompte du plan : ${reste.length}). |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5c.md'), md);
console.log(`5c : ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} ; reste ${RESTE_AVANT - unites.length} (plan : ${reste.length})`);
