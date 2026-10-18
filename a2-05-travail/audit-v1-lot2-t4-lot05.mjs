// A2-05 · volet 1 · lot 2 (provenance) · tranche 4, lot 05 (12 nuances) et les 2 nuances hors JLPT, comptées à part ; en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t4-lot05.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot05.md
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const plan = read('a2-05-travail/provenance/plan-tranches.json');
const vocab = read('data/n5/vocab.json');
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const hjSources = new Map(read('reconstruction/a2-04/sources/vocab-hors-jlpt.json').map((e) => [e.id, e]));
const ex = read('reconstruction/a2-04/sources/exemples.json');
const journal = read('reconstruction/a2-04/journal.json');
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-\d+\.json$/.test(f)).sort().map((f) => read(`reconstruction/a2-04/lots/${f}`));
const audit = readFileSync(join(root, 'docs/rapports/etape2-A2-05-audit-null.md'), 'utf8');
const r03 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot03.md'), 'utf8');
const pT4 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-tranche4-perimetre.md'), 'utf8');
// Les furigana des fiches sont rendus entre crochets (履[は]く) : la provenance d'une graphie en dépend.
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_71: { v: 'sourcé', o: "Nuance de la fiche : « on emploie le verbe 履[は]く (haku, mettre/porter) ». Ancien exemple : « ロング スカート を 穿[は]いて よかった です ».", m: "履く et はく sont écrits par la fiche (graphie, furigana, romaji). スカートをはく est la forme du dictionnaire de l'ancien exemple, privé de ロング (critère 1), le verbe écrit en kana : l'exemple l'écrit 穿く, la fiche 履く, et le kana est la lecture que les deux donnent. Aucun mot n'est ajouté.", r: "Deux kanji pour le même verbe dans la fiche (履く dans la nuance, 穿く dans l'ancien exemple) : la nuance publiée écrit le verbe en kana et cite 履く, celui de la nuance de la fiche." },
  v_72: { v: 'sourcé', o: "Nuance de la fiche : « le mot d'origine anglaise パンツ (pantsu) - pants soit aussi utilisé, ce dernier désignant parfois les sous-vêtements » ; « On utilise le verbe 履[は]く (haku) » ; exemple : « 黒い ズボン を はいています ».", m: "Faux positif présumé, contre-vérifié : はく est le verbe que la fiche écrit (履[は]く) et que son exemple emploie en kana ; **identité du mot établie**. パンツ et la remarque sur les sous-vêtements sont dans la fiche (critère 2)." },
  v_74_s2: { v: 'sourcé', o: "Ancien exemple : « この エレベーター の ボタン を 押して ください ».", m: "ボタンを押す est la forme du dictionnaire de l'ancien exemple, privé de この エレベーター の (critère 1)." },
  v_180: { v: 'sourcé', o: "Nuance de la fiche : « Nom composé du kanji de l'or ou du métal 金[かね] (kane), auquel on ajoute le préfixe de politesse お » ; « il est extrêmement rare de retirer ce préfixe ».", m: "金 est écrit par la fiche, avec sa lecture, comme le mot sans le préfixe qu'elle isole (même raisonnement que 皿 et 弁当). Le relevé du caractère isolé n'a servi qu'au repérage.", r: "« surtout dans les composés » n'est pas dans la fiche (« extrêmement rare de retirer ce préfixe ») : texte français, hors périmètre." },
  v_234: { v: 'écart', f: 'renvoi', o: "Aucune. La fiche traduit « Parapluie ; Ombrelle » ; elle n'écrit pas 日傘.", m: "Le sens est attesté par la traduction ; le mot 日傘 est ajouté par connaissance extérieure (critère 2).", k: "`nuance` (ENTRY) : « Contre la pluie ou le soleil. »" },
  v_566: { v: 'sourcé', o: "Nuance de la fiche : « par opposition à haku 履く pour le bas ».", m: "Faux positif présumé, rapproché par le romaji : la contre-vérification trouve **le verbe écrit 履く dans la fiche**, avec son romaji haku ; はく en est la lecture. Identité du mot établie (critère 2)." },
  v_572: { v: 'écart', f: 'graphie', o: "Exemple de la fiche : « へや の なか で くつ を 脱ぎます » ; ancien exemple : « くつ を 脱いで ください ». La fiche écrit くつ en kana ; aucun de ses textes n'écrit 靴.", m: "L'expression est celle de l'exemple, à la forme du dictionnaire (critère 1), mais **la graphie 靴 n'est pas attestée pour ce mot par la fiche** : elle écrit くつ. Une graphie n'est sourcée que si la fiche l'atteste pour le mot (lot 00 ; 無くなる, V2-32).", k: "`nuance` (ENTRY) : « Pour les vêtements comme pour les chaussures et les chaussettes : くつを脱ぐ. », la graphie de la fiche." },
  v_614: { v: 'écart', f: 'graphie', o: "Exemple de la fiche : « げんかん で スリッパ に はきかえます ». La fiche écrit げんかん en kana ; aucun de ses textes n'écrit 玄関.", m: "Faux positif présumé, que le tri avait rapproché **par la lecture** (げんかん) : le mot est attesté, **sa graphie 玄関 ne l'est pas dans cette fiche**. Même cas que くつ (脱ぐ).", k: "`nuance` (ENTRY) : « Chaussures d'intérieur, portées après avoir retiré ses chaussures au げんかん. », la graphie de la fiche.", r: "La contre-vérification des faux positifs le montre à nouveau : la lecture est attestée, la graphie publiée ne l'est pas." },
  v_618: { v: 'écart', f: 'renvoi', o: "Aucune. La fiche ne cite pas ティッシュ et ne parle pas du mouchoir en papier.", m: "Mot ajouté par connaissance extérieure (critère 2). Le même mot a été retiré de la nuance de ちり紙 (V2-74).", k: "`nuance` (ENTRY) : « Petit carré de tissu pour s'essuyer les mains. »" },
  v_671: { v: 'écart', f: 'decision', o: "Aucune dans les sources : la fiche traduit « Réveil » sans écrire 目覚まし時計. D0405 : « Se dit 目覚まし時計 ; repris dans la nuance » (abandon de la traduction « Réveil »).", m: "Le mot est assumé par une décision validée **dont le fondement n'est dans aucune source** : ni la fiche ni le vocabulaire publié n'ont 目覚まし時計. Même situation que D0214 (包丁) et D0081 (伯母) : écart (critère 2). D0405 n'est pas réécrite.", k: "`nuance` (ENTRY) : « Tout instrument qui donne l'heure : la montre au poignet comme l'horloge murale. »", r: "Ce sens porte la modification n° 7 du volet 2 (`category` : `null` → `temps`) : autre champ, les deux s'ajoutent sans se toucher ; le verdict du volet 2 n'est pas rouvert." },
  v_679: { v: 'écart', f: 'graphie', o: "Nuance de la fiche : « par opposition aux vêtements traditionnels japonais (wafuku ou kimono) », en romaji. Ni 和服 ni 着物 ne sont écrits par la fiche.", m: "Les deux mots sont attestés en romaji ; **leurs graphies en kanji ne le sont pas**. La transcription en kana d'un romaji attesté est recevable ; elle ne permet pas d'ajouter un kanji (lot 01).", k: "`nuance` (ENTRY) : « Par opposition aux vêtements traditionnels japonais (わふく, きもの). », le romaji de la fiche transcrit en kana." },
  v_701: { v: 'sourcé', o: "買い物する : nuance de la fiche (« S'emploie très fréquemment avec le verbe suru (買い物する) ») ; D0367. 買い物に行く : ancien exemple « スーパー へ 夕食 の 買い物 に 行きます » ; exemple « スーパー へ 買物 に いきます ».", m: "買い物する est écrit par la fiche (D0367 le fonde). 買い物に行く est la forme du dictionnaire de l'ancien exemple, privé de スーパーへ 夕食の (critère 1)." }
};
// Les deux nuances hors JLPT : mêmes critères, sur leurs fiches propres ; aucune décision n'existe pour elles.
const H = {
  hj_v_1: { v: 'écart', f: 'construit', o: "Nuance de la fiche : « Sac proposé à la caisse, payant au Japon depuis 2020 : le caissier demande presque toujours si on en veut un. », sans japonais. Exemple : « レジ袋、お願いします。 ». La fiche n'a pas d'anciens exemples.", m: "La phrase レジ袋はご利用ですか est **construite** : ni la nuance ni l'exemple de la fiche ne la contiennent ; l'exemple donne la réponse du client, non la question du caissier (critère 1). Le texte français de la nuance est celui de la fiche.", k: "`nuance` (ENTRY) : « Payant au Japon depuis 2020 : le caissier demande presque toujours si l'on en veut un. », le texte de la fiche, sans la phrase japonaise construite." },
  hj_v_2: { v: 'sourcé', o: "Nuance de la fiche : « Le caissier demande souvent 「ポイントカードはお持ちですか」 : on répond simplement いいえ ou on la montre. »", m: "ポイントカードはお持ちですか et いいえ sont écrits mot pour mot dans la nuance de la fiche (critère 2) ; seuls les crochets japonais sont retirés. Aucun mot ajouté." }
};

// Exhaustivité
const bloc = plan.toutes.filter((u) => u.tranche === '4' && u.lotN === '05');
const unites = bloc.map((u) => court(u.sens));
if (!pT4.includes('**périmètre arbitré le 2026-10-10**')) throw new Error('périmètre de la tranche 4 non arbitré');
if (!r03.includes('**La tranche 3 est close.**')) throw new Error('tranche 3 non close');
if (bloc.length !== 12 || Object.keys(F).length !== 12 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`lot 05 : manquantes ${unites.filter((u) => !F[u])} ; en trop ${Object.keys(F).filter((k) => !unites.includes(k))}`);
if (plan.toutes.filter((u) => u.tranche === '4' && u.lotN === '06').length !== 18) throw new Error('lot 06 : 18 attendues');
const hjIds = lots.flatMap((l) => Object.keys(l.entries).filter((id) => id.startsWith('hj_') && l.entries[id].fields?.senses));
if (JSON.stringify(hjIds.sort()) !== JSON.stringify(Object.keys(H).sort())) throw new Error(`hors JLPT : ${hjIds}`);
if (journal.some((d) => d.entry?.startsWith('hj_') || JSON.stringify(d).includes('"hj_v_'))) throw new Error('une décision cite une ENTRY hors JLPT');
for (const [id, f] of [...Object.entries(F), ...Object.entries(H)]) if (!['sourcé', 'assumé', 'écart'].includes(f.v) || (f.v === 'écart') !== Boolean(f.k) || (f.v === 'écart') !== Boolean(f.f)) throw new Error(`verdict, correction ou famille incohérents : ${id}`);
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
const DERNIER_V2 = Math.max(...[...r03.matchAll(/^\| V2-(\d+) \|/gm)].map((m) => Number(m[1])));
if (DERNIER_V2 !== 77) throw new Error(`dernier numéro V2 : ${DERNIER_V2}`);

const par = (O, v) => Object.keys(O).filter((c) => O[c].v === v);
const src = unites.filter((c) => F[c].v === 'sourcé'), ass = unites.filter((c) => F[c].v === 'assumé'), ec = unites.filter((c) => F[c].v === 'écart');
const hec = par(H, 'écart'), hsrc = par(H, 'sourcé');
const NUM = new Map([...ec, ...hec].map((c, i) => [c, DERNIER_V2 + i + 1]));
const motDe = (c) => bloc.find((u) => court(u.sens) === c)?.mot ?? hjSources.get(c)?.word;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
const RESTE_AVANT = 189;
const FAM = { renvoi: 'Renvoi ou mot non appuyé par la fiche (critère 2)', graphie: 'Graphie non attestée pour le mot', decision: 'Mot assumé par une décision au fondement absent des sources', construit: 'Exemple ou phrase construits (critère 1)' };
let md = '';
const P = (t = '') => { md += `${t}\n`; };
const ficheP = (fi, x, principal) => P(`- **Fiche source** (\`${x}\`${principal ? '' : ', fusionnée'}, ${fi.type}${fi.level ? `, niveau \`${fi.level}\`` : ''}) : mot ${fi.word} (${fi.reading}) ; traductions « ${[fi.meanings.primary, ...(fi.meanings.secondary ?? [])].join(' ; ')} » ; particules ${(fi.particles ?? []).join(', ') || 'aucune'}. Nuance : « ${st(fi.nuance)} » Exemple : « ${st(fi.example?.japanese)} » — « ${st(fi.example?.french)} »`);
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : tranche 4, lot 05, et les deux nuances hors JLPT');
P();
P('**Date** : 2026-10-10');
P('**Statut** : **arbitré le 2026-10-10** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **lot 05 : 6 sourcés, 0 assumé, 6 écarts ; hors JLPT, comptées à part : 1 sourcé, 1 écart** ; les quatorze verdicts proposés confirmés, V2-78 à V2-84 retenues sans modification de fond (§Q0). La proposition est conservée telle quelle aux §Q1 à §Q6.');
P();
P('## Q0. Arbitrage du 2026-10-10');
P();
P('- **Sourcés, confirmés** : スカート, ズボン, ボタン sens 2, お金, 着る, 買い物.');
P('- **Écarts confirmés** : V2-78 傘 (日傘 retiré) ; V2-79 脱ぐ (靴 remplacé par くつ) ; V2-80 スリッパ (玄関 remplacé par げんかん) ; V2-81 ハンカチ (ティッシュ retiré) ; V2-82 時計 (目覚まし時計 retiré, non fondé par les sources malgré D0405) ; V2-83 洋服 (和服 et 着物 remplacés par わふく et きもの, transcriptions en kana des romajis attestés).');
P('- **時計** : l\'arbitrage du volet 2 sur sa catégorie est conservé intégralement ; les deux corrections sont complémentaires, sans réouverture du verdict antérieur.');
P('- **Hors JLPT** : `hj_v_2` ポイントカード **sourcé**, aucune correction ; `hj_v_1` レジ袋 **écart confirmé**, V2-84 retenue (レジ袋はご利用ですか, expression construite, retirée). **Aucune décision historique n\'est inventée pour ces ENTRY.**');
P('- **Consolidation** : **V2-84 rejoint la liste globale unique des corrections**, avec l\'identification explicite de son origine `hors_jlpt`. **Deux comptabilités distinctes** sont tenues : les nuances du plan initial de provenance, et les nuances hors JLPT, contrôlées à part.');
P('- **Liste globale : 99 corrections (10 + 5 + 84), toutes non appliquées. Restent 177 nuances du plan** (lot 06 : 18 ; tranches 5 à 8 : 159) ; **les 2 nuances hors JLPT sont arbitrées** ; 377 candidats et bilan du volet 2 inchangés.');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre de la tranche 4 arbitré le 2026-10-10 (ChatGPT, par délégation) : ce rapport porte sur les **12 nuances du lot 05** (« Achats, vêtements et objets personnels ») **et, comptées à part, sur les 2 nuances hors JLPT** (`hj_v_1`, `hj_v_2`), contrôlées sur leurs propres fiches ; le lot 06 (18) suivra son arbitrage. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict antérieur n\'est rouvert, notamment celui de 時計 au volet 2. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.');
P();
P('## Q1. Résultat proposé');
P();
P('**Lot 05 (dans le plan des 278)** :');
P();
P('| Verdict proposé | Nuances | Détail |');
P('|---|---|---|');
P(`| **sourcé** | ${src.length} | ${src.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **assumé** | ${ass.length} | ${ass.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ') || '—'} |`);
P(`| **écart** (E2) | ${ec.length} | ${ec.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **Total** | ${unites.length} | |`);
P();
P('**Hors JLPT (comptées à part, hors des 684 et des 278)** :');
P();
P('| Verdict proposé | Nuances | Détail |');
P('|---|---|---|');
P(`| **sourcé** | ${hsrc.length} | ${hsrc.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **écart** (E2) | ${hec.length} | ${hec.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P('| **Total** | 2 | |');
P();
P('| Famille d\'écart | Nuances |');
P('|---|---|');
for (const k of Object.keys(FAM)) { const l = [...ec.filter((c) => F[c].f === k), ...hec.filter((c) => H[c].f === k)]; if (l.length) P(`| ${FAM[k]} | ${l.map(motDe).join(', ')} (${l.length}) |`); }
P();
P('**Ce que le lot montre** :');
P();
P('- **Le critère de graphie pèse le plus** : trois écarts (脱ぐ, スリッパ, 洋服) portent sur un mot attesté par la fiche, en kana ou en romaji, et publié dans une graphie en kanji qu\'elle n\'écrit pas (靴, 玄関, 和服 / 着物). La correction reprend la graphie de la fiche, ou la transcription en kana de son romaji.');
P('- **Les trois faux positifs présumés** se partagent : ズボン et 着る sont sourcés (le verbe 履く est écrit par leurs fiches, et はく en est la lecture) ; スリッパ est un écart de graphie (げんかん attesté, 玄関 non).');
P('- **時計** : D0405 nomme 目覚まし時計 sans fondement dans les sources ; écart, comme D0214 (包丁). Sa modification du volet 2 (`category`) n\'est pas touchée.');
P('- **Aucun « assumé »** dans ce lot : aucune décision n\'y fonde un élément japonais sur une source vérifiable.');
P('- **Hors JLPT** : la fiche de ポイントカード écrit elle-même la question du caissier et la réponse いいえ (sourcé) ; celle de レジ袋 ne donne que la réponse du client, et la question publiée est construite (écart). **Ces deux ENTRY n\'ont aucune décision de journal** : aucune ne leur est attribuée.');
P();
P('## Q2. Critères appliqués');
P();
P('Ceux des tranches 2 et 3, sans changement : le classement **sourcé / assumé / écart** (lot 02, confirmé au lot 03) ; forme du dictionnaire d\'un exemple de la fiche, retrait de mots compris (critère 1) ; renvoi appuyé par la fiche examinée ou par une décision validée au fondement vérifiable (critère 2) ; forme honorifique non sourcée d\'office (critère 3) ; graphie attestée pour le mot par la fiche ou sa fiche fusionnée, jamais déduite par analogie ; transcription en kana d\'un romaji attesté recevable, sans ajout de kanji ; une attestation dans la fiche d\'une autre ENTRY ne suffit pas sans décision (お手洗い). **Pour les deux ENTRY hors JLPT**, les mêmes critères, sur leur fiche de `sources/vocab-hors-jlpt.json` ; elles n\'ont ni fiche fusionnée, ni ancien exemple, ni décision.');
P();
P('## Q3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length + hec.length}) ; la correction hors JLPT est numérotée à la suite, dans un tableau distinct. Elles ne rejoindront la liste consolidée qu'après arbitrage, à part des 92 déjà retenues.`);
P();
P('| # | Unité | Mot | Famille | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${motDe(c)} | ${F[c].f} | ${F[c].k} |`);
P();
P('**Hors JLPT** :');
P();
P('| # | Unité | Mot | Famille | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of hec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${motDe(c)} | ${H[c].f} | ${H[c].k} |`);
P();
P(`## Q4. Les ${unites.length} fiches de provenance du lot 05`);
P();
P('Les furigana des fiches sont rendus entre crochets : 履[は]く.');
P();
for (const u of bloc) {
  const id = court(u.sens); const f = F[id]; const sid = `n5_${u.entree}`;
  const e = vocab.find((x) => x.id === u.entree); const s = u.niveau === 'sens' ? e.senses.find((x) => x.id === id) : null;
  P(`### \`${id}\` · ${u.mot}${s ? ` · « ${s.meaning.primary} »` : ' · nuance d\'ENTRY'} — **${f.v}**`);
  P();
  for (const x of [sid, ...(fusion.get(sid) ?? [])]) { ficheP(sources.get(x), x, x === sid); for (const q of ex.vocab?.[x] ?? []) P(`  - Ancien exemple : « ${st(q.japanese)} » — « ${st(q.french ?? q.translation)} »`); }
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
P('## Q5. Les 2 fiches de provenance hors JLPT (comptées à part)');
P();
for (const id of Object.keys(H)) {
  const f = H[id]; const fi = hjSources.get(id); const en = lots.flatMap((l) => (l.entries[id] ? [l.entries[id]] : []))[0];
  P(`### \`${id}\` · ${fi.word} · nuance d'ENTRY — **${f.v}**`);
  P();
  ficheP(fi, id, true);
  P('  - Anciens exemples : aucun (`sources/exemples.json` n\'en a pas pour cette fiche).');
  P(`- **Publié** : nuance de l'ENTRY : « ${en.fields.nuance} ».`);
  P('- **Décisions de l\'ENTRY** : aucune (le champ `journal` est vide ; aucune décision ne cite cette ENTRY).');
  P(`- **Origine recherchée** : ${f.o}`);
  P(`- **Verdict proposé** : **${f.v}**${f.f ? ` (${FAM[f.f].toLowerCase()})` : ''}.`);
  P(`- **Verdict arbitré (2026-10-10)** : **${f.v}**, confirmé${f.k ? ` ; correction V2-${NUM.get(id)} retenue dans la liste globale unique, origine \`hors_jlpt\`, non appliquée` : ''}.`);
  P(`- **Justification** : ${f.m}`);
  if (f.k) P(`- **Correction proposée, non appliquée (V2-${NUM.get(id)})** : ${f.k}`);
  P();
}
P('## Q6. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t4-lot05.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches du plan sont exactement le lot 05 de la tranche 4 arbitrée | oui : ${unites.length} nuances distinctes, ${new Set(bloc.map((u) => u.entree)).size} ENTRY ; le lot 06 (18) n'est pas lu |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').length} faux positifs présumés, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} à caractère isolé seulement |`);
P(`| Verdicts proposés, lot 05 | ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; total ${unites.length} |`);
P(`| **Hors JLPT, comptées à part** | exactement \`hj_v_1\` et \`hj_v_2\`, décidées au lot 05, fiches dans \`vocab-hors-jlpt.json\`, aucune décision ; ${hsrc.length} sourcée, ${hec.length} écart |`);
P(`| Un écart a une famille et une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} (lot 05) et V2-${DERNIER_V2 + ec.length + 1} (hors JLPT), à la suite de V2-77 |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé ; 時計 (sens des 147) non rouvert |`);
P(`| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : ${bloc.filter((u) => u.candidats377.length).map((u) => u.mot).join(', ') || 'aucune'} restent candidats pour leurs propres relevés |`);
P(`| Verdicts arbitrés (2026-10-10) | lot 05 : ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; hors JLPT : ${hsrc.length} sourcé, ${hec.length} écart ; les 14 confirmés |`);
P('| Corrections retenues | avant l\'arbitrage : 92 ; après : **99 (10 + 5 + 84)**, dont V2-84 d\'origine `hors_jlpt`, aucune appliquée |');
P(`| **Décompte du chantier** | ${RESTE_AVANT} nuances du plan restaient à lire ; **${unites.length} sont contrôlées dans ce lot ; ${RESTE_AVANT - unites.length} restent** : tranche 4, lot 06, 18 ; tranches 5 à 8, 159. **Les 2 nuances hors JLPT sont contrôlées** : il n'en reste plus. |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot05.md'), md);
console.log(`lot 05 : ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; hj : ${hsrc.length} sourcé, ${hec.length} écart ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length + hec.length} ; reste ${RESTE_AVANT - unites.length}`);
