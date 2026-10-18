// A2-05 · volet 1 · lot 2 (provenance) · tranche 5, livraison 5a (lot 08, écrit, téléphone et médias : 9 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t5-5a.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5a.md
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
const r06 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot06.md'), 'utf8');
const pT5 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-tranche5-perimetre.md'), 'utf8');
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_52: { v: 'écart', f: 'construit', o: "手紙を書く : exemple de la fiche « 友達 に 手紙 を 書きます » ; ancien exemple « 家族 に 手紙 を 書きました ». 手紙を出す : aucune ; les anciens exemples ont « 手紙 が 届きました » et « ポスト に 入れます ».", m: "**手紙を書く est sourcé** : forme du dictionnaire de l'exemple, privé de 友達に (critère 1). **手紙を出す est construit** : ni la fiche ni ses exemples ne l'ont.", k: "`nuance` (ENTRY) : « Une lettre écrite à la main ; 手紙を書く. »" },
  v_164_s1: { v: 'écart', f: 'construit', o: "Exemple de la fiche : « 母 に 電話 を かけます » ; ancien exemple : « 実家 の 両親 に 電話 を かけます ».", m: "**電話をかける est sourcé** : l'exemple, privé de 母に (critère 1). **友達に電話をかける change un mot** de l'exemple (母 → 友達) : critère 1 non rempli, comme 道路 → 道 (渡る, tranche 1). L'exemple de la fiche donne la forme sourcée.", k: "`nuance` (sens 1) : « 電話をかける : téléphoner ; 母に電話をかける. », la forme de l'exemple de la fiche." },
  v_164_s2: { v: 'écart', f: 'construit', o: "La fiche traduit « Mettre (des lunettes) » et parle de « l'installation de lunettes sur le visage », sans exemple japonais ; めがね n'est dans aucun de ses textes. D0520 fonde le sens, non une expression.", m: "Expression construite (critère 1) : le sens est attesté, la chaîne japonaise ne l'est pas. めがね est écrit par une autre fiche (曇る, tranche 1), sans relation avec celle-ci.", k: "`nuance` (sens 2) : « Mettre ses lunettes. »" },
  v_164_s3: { v: 'écart', f: 'construit', o: "La fiche traduit « Accrocher », sans exemple de cet emploi ; ses anciens exemples ont 鍵をかける et 腰をかける, qui ne sont pas « accrocher ». 壁 et 絵 ne sont dans aucun de ses textes.", m: "Expression construite (critère 1). Ce sens fait partie des 147 du volet 2 (L, `categorie-nulle`, D0521) : le contrôle ne porte que sur la nuance, et ce verdict n'est pas rouvert.", k: "`nuance` (sens 3) : « Accrocher un tableau au mur. », le texte français, sans l'exemple japonais." },
  v_168: { v: 'sourcé', o: "Ancien exemple : « 家族 と 一緒 に 写真 を たくさん 撮りました » ; exemple : « きょう 撮った 写真 を 友達 に 見せます ».", m: "写真を撮る est la forme du dictionnaire de l'ancien exemple, privé de たくさん (retrait d'un mot, critère 1)." },
  v_173: { v: 'écart', f: 'construit', o: "電話番号 : exemple de la fiche « あなたの 電話 番号 を 教えて ください ». 部屋の番号 : aucune ; la nuance de la fiche dit en français « le numéro de chambre », sans japonais.", m: "**電話番号 est sourcé** (exemple et anciens exemples). **部屋の番号 est construit** à partir d'une mention française (critère 1).", k: "`nuance` (ENTRY) : « 電話番号 : numéro de téléphone. »" },
  v_178_s2: { v: 'sourcé', o: "Ancien exemple : « 会社 に 電話 を かけました » ; D0519 : « L'appel se dit ici 電話をかける ».", m: "電話をかける est la forme du dictionnaire de l'ancien exemple, privé de 会社に (critère 1) ; D0519 le cite aussi." },
  v_203: { v: 'écart', f: 'construit', o: "Exemple de la fiche : « まいにち 夜 に テレビ で ニュース を 見ます » ; anciens exemples : « テレビ で 夜 の ニュース を 見ます ». テレビを見る : aucune.", m: "テレビを見る **change la particule** de la construction attestée (テレビで…を見る → テレビを見る) : ce n'est pas une normalisation (critère 1), comme 空は → 空が (tranche 1).", k: "`nuance` (ENTRY) : « テレビでニュースを見る : regarder les informations à la télévision. », la forme de l'exemple de la fiche.", r: "**Preuve insuffisante plutôt qu'erreur** : aucun mot n'est étranger à la fiche ; seule la construction change." },
  v_697: { v: 'sourcé', o: "Ancien exemple : « 新しい 写真 を 友達 に 見せました » ; exemple : « 写真 を ともだち に 見せます » ; particules de la fiche : を, に.", m: "写真を友達に見せる est la forme du dictionnaire de l'ancien exemple, privé de 新しい (critère 1) ; に est une particule de la fiche." }
};

const ORAL = ['呼ぶ', '答える', '聞く', '言う', '話す', '話'];
const bloc = plan.toutes.filter((u) => u.tranche === '5' && u.lotN === '08' && !ORAL.includes(u.mot));
const unites = bloc.map((u) => court(u.sens));
if (!pT5.includes('**périmètre arbitré le 2026-10-10**')) throw new Error('périmètre de la tranche 5 non arbitré');
if (bloc.length !== 9 || Object.keys(F).length !== 9 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`5a : manquantes ${unites.filter((u) => !F[u])} ; en trop ${Object.keys(F).filter((k) => !unites.includes(k))}`);
for (const [id, f] of Object.entries(F)) if (!['sourcé', 'assumé', 'écart'].includes(f.v) || (f.v === 'écart') !== Boolean(f.k) || (f.v === 'écart') !== Boolean(f.f)) throw new Error(`verdict, correction ou famille incohérents : ${id}`);
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
const DERNIER_V2 = Math.max(...[...r06.matchAll(/^\| V2-(\d+) \|/gm)].map((m) => Number(m[1])));
if (DERNIER_V2 !== 96) throw new Error(`dernier numéro V2 : ${DERNIER_V2}`);

const src = unites.filter((c) => F[c].v === 'sourcé'), ass = unites.filter((c) => F[c].v === 'assumé'), ec = unites.filter((c) => F[c].v === 'écart');
const NUM = new Map(ec.map((c, i) => [c, DERNIER_V2 + i + 1]));
const motDe = (c) => bloc.find((u) => court(u.sens) === c).mot;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
const RESTE_AVANT = 159;
const FAM = { construit: 'Exemple construit, mot ou particule changés (critère 1)' };
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : tranche 5, livraison 5a (lot 08, écrit, téléphone et médias)');
P();
P('**Date** : 2026-10-10');
P('**Statut** : **arbitré le 2026-10-10** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **3 sourcés, 0 assumé, 6 écarts**, les neuf verdicts confirmés, V2-97 à V2-102 retenues sans modification. La proposition est conservée telle quelle ci-dessous.');
P();
P('## S0. Arbitrage du 2026-10-10');
P();
P('- **Sourcés, confirmés** : `v_168` 写真, `v_178_s2` 電話 sens 2, `v_697` 見せる.');
P('- **Écarts confirmés** : V2-97 手紙 (手紙を書く conservé, 手紙を出す retiré) ; V2-98 かける sens 1 (母に電話をかける, conforme à l\'exemple, au lieu de 友達に電話をかける) ; V2-99 かける sens 2 (めがねをかける retiré ; « Mettre ses lunettes. ») ; V2-100 かける sens 3 (壁に絵をかける retiré ; « Accrocher un tableau au mur. ») ; V2-101 番号 (部屋の番号 retiré, 電話番号 conservé) ; V2-102 テレビ (テレビでニュースを見る, attesté, au lieu de テレビを見る).');
P('- **Précisions méthodologiques** : la forme du dictionnaire et le retrait de mots non essentiels sont admis lorsque la construction attestée reste intacte ; **remplacer un complément ou changer une particule n\'est pas une simple normalisation**. Pour テレビ, la réserve est conservée : **insuffisance de provenance, non démonstration d\'incorrection linguistique**. Le contrôle de かける sens 3 ne porte que sur sa nuance ; son arbitrage du volet 2 reste inchangé.');
P('- **Liste globale unique : 117 corrections (10 + 5 + 102), toutes non appliquées. Restent 150 nuances du plan** (5b : 9 ; 5c : 11 ; tranches 6 à 8 : 130).');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre de la tranche 5 arbitré le 2026-10-10 (ChatGPT, par délégation), en trois livraisons ; ce rapport porte sur les **9 nuances de la livraison 5a**. 5b et 5c suivront l\'arbitrage de celle-ci. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict antérieur n\'est rouvert, notamment celui de かける sens 3 au volet 2. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.');
P();
P('## S1. Résultat proposé');
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
P('- **Tous les écarts relèvent du critère 1** : l\'expression publiée n\'est pas l\'exemple de la fiche ramené à la forme du dictionnaire. Trois en sont proches (un mot changé : 友達 pour 母 ; une particule changée : テレビを pour テレビで ; un exemple construit à côté d\'un exemple sourcé : 手紙を出す, 部屋の番号) ; deux sont entièrement construits, pour des sens que la fiche atteste sans exemple (かける sens 2 et 3).');
P('- **Les corrections gardent la forme sourcée quand la fiche en donne une** (母に電話をかける, テレビでニュースを見る, 手紙を書く, 電話番号) et le seul texte français quand elle n\'en donne pas (かける sens 2 et 3).');
P('- **Aucun « assumé »** : D0519 cite 電話をかける, mais la chaîne est déjà dans un ancien exemple (sourcé) ; D0520 fonde les sens de かける, non leurs expressions.');
P();
P('## S2. Critères appliqués');
P();
P('Ceux des tranches précédentes, sans changement : forme du dictionnaire d\'un exemple de la fiche, retrait de mots compris, **sans mot, particule ni construction changés** (critère 1) ; une expression grammaticalement correcte n\'est pas sourcée pour autant ; graphie attestée pour le mot ; renvoi appuyé par la fiche ou par une décision au fondement vérifiable (critère 2) ; classement **sourcé / assumé / écart**, sans modifier les normes A2.');
P();
P('## S3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}) ; elles ne rejoindront la liste globale unique qu'après arbitrage, à part des 111 déjà retenues.`);
P();
P('| # | Unité | Mot | Famille | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${motDe(c)} | ${F[c].f} | ${F[c].k} |`);
P();
P(`## S4. Les ${unites.length} fiches de provenance`);
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
P('## S5. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t5-5a.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches sont exactement la livraison 5a du périmètre arbitré | oui : ${unites.length} nuances distinctes, ${new Set(bloc.map((u) => u.entree)).size} ENTRY, toutes du lot 08 ; 5b (9) et 5c (11) ne sont pas lues |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').length} faux positif, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} à caractère isolé seulement |`);
P(`| Verdicts proposés | ${src.length} sourcés, ${ass.length} assumé, ${ec.length} écarts ; total ${unites.length} |`);
P(`| Un écart a une famille et une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}, à la suite de V2-96 |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé ; かける sens 3 non rouvert |`);
P(`| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : ${bloc.filter((u) => u.candidats377.length).map((u) => `${u.mot} (${court(u.sens)})`).join(', ') || 'aucune'} restent candidats |`);
P('| Verdicts arbitrés (2026-10-10) | 3 sourcés, 0 assumé, 6 écarts ; les 9 confirmés |');
P('| Corrections retenues | avant l\'arbitrage : 111 ; après : **117 (10 + 5 + 102)**, aucune appliquée |');
P(`| **Décompte du chantier** | ${RESTE_AVANT} nuances du plan restaient à lire ; **${unites.length} sont contrôlées dans cette livraison ; ${RESTE_AVANT - unites.length} restent** : tranche 5, 5b (9) et 5c (11) ; tranches 6 à 8, 130. |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5a.md'), md);
console.log(`5a : ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} ; reste ${RESTE_AVANT - unites.length}`);
