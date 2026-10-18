// A2-05 · volet 1 · lot 2 (provenance) · tranche 4, lot 06 (18 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t4-lot06.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot06.md
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
const r05 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot05.md'), 'utf8');
// Les furigana des fiches sont rendus entre crochets (冊[さつ]) : la provenance d'une graphie en dépend.
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_32: { v: 'écart', f: 'renvoi', o: "Aucune dans la fiche de 学生, qui ne cite pas 生徒. D0418 (« Repris dans la nuance ») porte sur une traduction abandonnée, sans nommer 生徒.", m: "Renvoi à une autre ENTRY publiée (生徒) que la fiche ne cite pas, et qu'aucune décision n'assume (critère 2). Le mot apparaît dans la fiche de 教室, sans relation avec 学生 : comme pour お手洗い, une attestation dans une autre fiche ne suffit pas.", k: "`nuance` (ENTRY) : « Le plus souvent un étudiant du secondaire ou de l'université. »" },
  v_123: { v: 'assumé', o: "La fiche de クラス ne cite pas 教室. D0414 : « Non documenté par la nuance de la source ; la salle se dit 教室 » (abandon de la traduction « Salle de classe »). La fiche de 教室 (`n5_v_133`) dit : « désignant la salle de cours physique où se déroulent les leçons ».", m: "Le renvoi à 教室 est assumé par une décision validée, **dont le fondement se vérifie dans la fiche de 教室**. Critère 2, par la décision ; même cas que カップ / コップ (lot 02) et テーブル / 机 (lot 03).", r: "À lire avec 教室, dont le renvoi inverse n'est porté par aucune décision (écart). Si l'arbitrage exige le renvoi dans la fiche examinée, l'unité est un écart, et la correction serait : « Le groupe d'élèves ou de participants à un cours. »" },
  v_131: { v: 'écart', f: 'construit', o: "Aucune. La fiche a « 午後 の 授業 が 始まります », « この先生の授業は », « 日本語の授業では » ; elle n'a pas 授業に出る. D0415 porte sur une traduction, non sur la nuance.", m: "Exemple construit (critère 1). La même chaîne a été retirée de la nuance de 出る, sens 2 (V1-2, lot 1), pour la même raison.", k: "`nuance` (ENTRY) : « Le cours donné par un enseignant. »" },
  v_132_s2: { v: 'sourcé', o: "Ancien exemple : « 親切 な 人 が 駅 まで の 道 を 教えてくれました ».", m: "道を教える est la forme du dictionnaire de l'ancien exemple, privé de 駅までの et de l'auxiliaire くれる (retrait de mots, critère 1)." },
  v_133: { v: 'écart', f: 'renvoi', o: "La fiche de 教室 ne cite pas クラス, et aucune décision de l'ENTRY n'en parle (D0412 : « Redondant »). La fiche de クラス (`n5_v_123`) décrit « une classe d'élèves ou un groupe de cours ».", m: "Renvoi que la fiche examinée ne fait pas et **qu'aucune décision n'assume** : l'attestation dans la fiche de クラス ne suffit pas à elle seule (arbitrage de お手洗い, lot 03). Le renvoi inverse, クラス → 教室, est assumé par D0414.", k: "`nuance` (ENTRY) : « La salle physique où ont lieu les cours. »" },
  v_134: { v: 'sourcé', o: "Nuance de la fiche : « Pour compter des livres, on doit utiliser le suffixe spécifique 冊[さつ] (satsu) » ; « Ce mot sert lui-même de suffixe de comptage (compteur) pour les objets longs et cylindriques ».", m: "冊 est écrit par la fiche, avec sa lecture ; l'emploi de 本 comme compteur des objets longs est décrit par la fiche, et D0448 le renvoie au registre des compteurs. La notation 〜本 désigne ce compteur sans ajouter de mot." },
  v_135: { v: 'écart', f: 'forme', o: "知っている et 知らない : nuance de la fiche (« on utilise TOUJOURS la forme continue 知っている[しっている] », « on revient à la forme simple 知らない[しらない] »). 知っていない : aucune.", m: "**知っている et 知らない sont sourcés** (critère 2). **知っていない ne l'est pas** : la fiche n'écrit pas cette forme, que la nuance publiée cite comme contre-exemple. Une forme conjuguée que la fiche n'écrit pas ne se reconstitue pas (来ない, V2-25 ; よくない, V2-31).", k: "`nuance` (ENTRY) : « À l'affirmatif, toujours 知っている ; au négatif, 知らない. »" },
  v_136: { v: 'sourcé', o: "Nuance de la fiche : « le suffixe universel 語[ご] (go) qui signifie 'langue' [...] comme フランス語[ふらんすご] (le français) ou 日本語[にほんご] (le japonais) ».", m: "語, フランス語 et 日本語 sont écrits par la fiche, avec leurs lectures (critère 2). Le relevé du caractère isolé n'a servi qu'au repérage." },
  v_138_s1: { v: 'écart', f: 'construit', o: "Aucune. La fiche a « 新しい 言葉 », « 外国 の 言葉 », « 優しい 言葉 を かけて » ; elle n'a pas 先生の言葉.", m: "Exemple construit (critère 1). Le sens (« la parole ») est attesté par la fiche ; l'expression ne l'est pas.", k: "`nuance` (sens 1) : « Les paroles, ce qui est dit. »" },
  v_138_s2: { v: 'écart', f: 'construit', o: "Ancien exemple : « その 外国 の 言葉 は むずかしくて ». 日本の言葉 : aucune.", m: "La chaîne publiée change un mot de la construction attestée (外国 → 日本) : critère 1 non rempli, comme 道路 → 道 (渡る, tranche 1). L'ancien exemple donne, lui, une forme sourcée.", k: "`nuance` (sens 2) : « 外国の言葉 : une langue étrangère. », la forme de l'ancien exemple." },
  v_170_s2: { v: 'écart', f: 'construit', o: "Aucune. La fiche décrit « le style d'écriture ou la calligraphie d'une personne », sans exemple japonais de cet emploi. D0442 cite 字が上手, sans fondement dans les sources.", m: "Expression construite (critère 1) ; D0442 la nomme pour fonder le découpage, non pour la sourcer (comme D0196, まずい, au lot 02).", k: "`nuance` (sens 2) : « Le style d'écriture d'une personne. »" },
  v_513_s2: { v: 'écart', f: 'construit', o: "Aucune. La fiche décrit « l'intention / l'utilité derrière une action », sans exemple japonais. D0444 cite 意味がない, sans fondement dans les sources.", m: "Expression construite (critère 1) ; D0444 la nomme pour fonder le découpage, non pour la sourcer.", k: "`nuance` (sens 2) : « L'utilité, la raison d'être d'une action. », d'après la fiche.", r: "Ce sens fait partie des 147 du volet 2 (L, `categorie-nulle`) : non rouvert." },
  v_538: { v: 'sourcé', o: "Ancien exemple : « 日本語 が 少し 分かります » ; exemple : « にほんご が すこし 分かります » ; particule が de la fiche.", m: "日本語が分かる est la forme du dictionnaire de l'ancien exemple, privé de 少し (critère 1) ; la particule est celle de la fiche." },
  v_553: { v: 'écart', f: 'construit', o: "名前を忘れる : aucune ; la fiche a 鍵を, 約束を, 宿題を忘れる. 傘を忘れる : l'exemple a « かさ を 忘れました », en kana ; aucun texte de la fiche n'écrit 傘.", m: "**名前を忘れる est construit** (critère 1). **傘を忘れる** reprend l'exemple, mais avec une graphie (傘) que la fiche n'atteste pas pour ce mot (critère confirmé au lot 00).", k: "`nuance` (ENTRY) : « Un fait comme un objet : 宿題を忘れる, oublier ses devoirs ; かさを忘れる, oublier son parapluie. », les formes de l'ancien exemple et de l'exemple." },
  v_556: { v: 'écart', f: 'decision', o: "Aucune dans les sources : la fiche traduit « Tracer (des caractères, un dessin) » sans écrire 描く, et 描く n'est pas dans le vocabulaire publié. D0450 (correction) : « « Tracer un dessin » est le sens de 描く, même lecture (かく) mais autre graphie et autre sens ».", m: "Le mot 描く est assumé par une décision validée **dont le fondement n'est dans aucune source** : même situation que D0195 (つらい, 辛い) et D0214 (包丁). D0450 n'est pas réécrite ; le retrait du sens « dessin » qu'elle décide n'est pas en cause, seule la chaîne japonaise de la nuance l'est.", k: "`nuance` (ENTRY) : « Écrire des lettres, des caractères, un texte. »" },
  v_570: { v: 'sourcé', o: "Nuance de la fiche : « Nom (et verbe suru - groupe suru) » ; exemples : « 練習 を します », « たくさん 練習 しました ». D0423 : « suru_compatible documenté par la source ».", m: "La formation 練習する est celle que la fiche décrit et que ses exemples emploient ; D0423 l'établit. Aucune forme reconstituée." },
  v_647: { v: 'écart', f: 'renvoi', o: "勉強する : nuance de la fiche (« S'emploie très fréquemment avec le verbe suru (勉強する) ») ; D0421. 習う : aucune ; la fiche ne le cite pas, et aucune décision de l'ENTRY n'en parle (D0421, D0422).", m: "**勉強する est sourcé.** **習う est un renvoi** à une autre ENTRY publiée que la fiche ne fait pas et qu'aucune décision n'assume (critère 2).", k: "`nuance` (ENTRY) : « 勉強する : étudier ; l'étude en général. »", r: "« plutôt que l'apprentissage auprès d'un maître » accompagne le renvoi à 習う ; il disparaît avec lui." },
  v_666: { v: 'écart', f: 'decision', o: "La fiche dit : « Nom composé des kanjis signifiant « écriture / phrase » et « chapitre / composition » », avec les furigana 文[ぶん]章[しょう] ; elle n'emploie jamais 文 comme mot. D0443 : « « Phrase » se dit 文, « composition écrite » 作文 ».", m: "La fiche donne le sens du kanji 文 dans le composé, non un mot 文 « phrase ». La nuance publiée, après D0443, en fait un mot. **Le fondement de D0443 ne se vérifie qu'à moitié** (le sens du kanji, non l'emploi comme mot), comme D0340 (入っている) en tranche 1 : écart. D0443 n'est pas réécrite.", k: "`nuance` (ENTRY) : « Un texte rédigé, un passage suivi. »", r: "**Cas discutable** : 達 (友達) a été arbitré sourcé parce que la fiche décrivait le rôle de l'élément dans le mot ; ici, la fiche décrit le sens d'un kanji, et la nuance en tire l'emploi d'un mot autonome. Si l'arbitrage tient que cela suffit, avec D0443, l'unité est **assumée**." }
};

// Exhaustivité : exactement le lot 06 de la tranche 4 du périmètre arbitré
const bloc = plan.toutes.filter((u) => u.tranche === '4' && u.lotN === '06');
const unites = bloc.map((u) => court(u.sens));
if (!r05.includes('**arbitré le 2026-10-10**')) throw new Error('lot 05 non arbitré');
if (bloc.length !== 18 || Object.keys(F).length !== 18 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`lot 06 : manquantes ${unites.filter((u) => !F[u])} ; en trop ${Object.keys(F).filter((k) => !unites.includes(k))}`);
for (const [id, f] of Object.entries(F)) if (!['sourcé', 'assumé', 'écart'].includes(f.v) || (f.v === 'écart') !== Boolean(f.k) || (f.v === 'écart') !== Boolean(f.f)) throw new Error(`verdict, correction ou famille incohérents : ${id}`);
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
const DERNIER_V2 = Math.max(...[...r05.matchAll(/^\| V2-(\d+) \|/gm)].map((m) => Number(m[1])));
if (DERNIER_V2 !== 84) throw new Error(`dernier numéro V2 : ${DERNIER_V2}`);

const src = unites.filter((c) => F[c].v === 'sourcé'), ass = unites.filter((c) => F[c].v === 'assumé'), ec = unites.filter((c) => F[c].v === 'écart');
const NUM = new Map(ec.map((c, i) => [c, DERNIER_V2 + i + 1]));
const motDe = (c) => bloc.find((u) => court(u.sens) === c).mot;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
const RESTE_AVANT = 177;
const FAM = { renvoi: 'Renvoi non appuyé par la fiche ni par une décision (critère 2)', forme: 'Forme conjuguée que la fiche n\'écrit pas (critère 3)', construit: 'Exemple construit ou construction changée (critère 1)', decision: 'Mot assumé par une décision au fondement absent ou partiel' };
const parFam = (k) => ec.filter((c) => F[c].f === k);
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : tranche 4, lot 06');
P();
P('**Date** : 2026-10-10');
P('**Statut** : **arbitré le 2026-10-10** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **5 sourcés, 1 assumé, 12 écarts**, les 18 verdicts proposés confirmés, V2-85 à V2-96 retenues sans modification de fond (§R0). **La tranche 4 est close.** La proposition est conservée telle quelle aux §R1 à §R5.');
P();
P('## R0. Arbitrage du 2026-10-10');
P();
P('- **クラス / 教室** : クラス **assumé**, confirmé (D0414 justifie le renvoi à 教室, dont la fiche établit le fondement) ; 教室 **écart**, confirmé (aucune décision de cette ENTRY n\'assume le renvoi inverse à クラス) ; V2-87 confirmée, sans modifier la doctrine déjà appliquée à お手洗い / トイレ.');
P('- **文章 / 文** : écart V2-96 confirmé ; la fiche de 文章 décrit le sens du kanji 文 dans le composé, sans l\'attester comme mot autonome ; D0443 n\'a donc qu\'un fondement partiel. Nuance retenue : « Un texte rédigé, un passage suivi. » **D0443 reste intacte** ; le nouvel arbitrage de provenance est documenté séparément, ici.');
P('- **Autres corrections confirmées (V2-85 à V2-95)** : 知る (知っていない retiré, 知っている et 知らない conservés) ; 授業 (授業に出る retiré) ; 言葉 (先生の言葉 supprimé, 外国の言葉 repris) ; 字 sens 2 et 意味 sens 2 (exemples construits retirés, sans rouvrir le découpage ni les verdicts antérieurs) ; 忘れる (宿題を忘れる et かさを忘れる, sous les graphies attestées) ; 書く (描く retiré, non sourcé malgré D0450) ; 学生 et 勉強 (renvois insuffisamment justifiés retirés). Les cinq sourcés sont confirmés.');
P('- **Clôture de la tranche 4 du plan** : lot 05 (12 : 6 sourcés, 0 assumé, 6 écarts) + lot 06 (18 : 5, 1, 12) = **30 nuances, 11 sourcées, 1 assumée, 18 écarts**. **Hors JLPT, à part, déjà arbitrées** : 2 nuances, 1 sourcée, 1 écart.');
P('- **Liste globale unique : 111 corrections (10 + 5 + 96), toutes non appliquées. Restent 159 nuances du plan**, dans les tranches 5 à 8 ; 377 candidats et 147 arbitrages du volet 2 inchangés.');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre de la tranche 4 arbitré le 2026-10-10 (ChatGPT, par délégation), livré par lot : ce rapport porte sur les **18 nuances du lot 06** (« École, apprentissage, langue et écrit ») ; le lot 05 et les deux nuances hors JLPT sont arbitrés. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict antérieur n\'est rouvert. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.');
P();
P('## R1. Résultat proposé');
P();
P('| Verdict proposé | Nuances | Détail |');
P('|---|---|---|');
P(`| **sourcé** | ${src.length} | ${src.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **assumé** | ${ass.length} | ${ass.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **écart** (E2) | ${ec.length} | ${ec.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **Total** | ${unites.length} | |`);
P();
P('| Famille d\'écart | Nuances |');
P('|---|---|');
for (const k of Object.keys(FAM)) if (parFam(k).length) P(`| ${FAM[k]} | ${parFam(k).map((c) => motDe(c)).join(', ')} (${parFam(k).length}) |`);
P();
P('**Ce que le lot montre** :');
P();
P('- **La doctrine de お手洗い (lot 03) partage une paire** : クラス est **assumé** (D0414 renvoie à 教室, dont la fiche décrit la salle) ; 教室 est un **écart** (son renvoi à クラス n\'est porté par aucune décision, et la fiche de クラス ne suffit pas à elle seule). 学生 (生徒) et 勉強 (習う) sont dans le même cas que 教室.');
P('- **Les décisions qui nomment une expression pour fonder un découpage ne la sourcent pas** (arbitrage du lot 02) : D0442 (字が上手), D0444 (意味がない).');
P('- **Les décisions dont le fondement n\'est pas dans les sources n\'assument pas** : D0450 (描く), comme D0195 et D0214 ; D0443 (文) ne se vérifie qu\'à moitié, comme D0340.');
P('- **Les formes que la fiche n\'écrit pas** : 知っていない (contre-exemple construit), comme 来ない et よくない ; la graphie 傘, que la fiche de 忘れる n\'écrit pas (かさ).');
P('- **Aucune nuance n\'est retirée en entier.**');
P();
P('## R2. Critères appliqués');
P();
P('Ceux des lots précédents, sans changement, dont le classement **sourcé / assumé / écart** (lot 02) et la doctrine de お手洗い (lot 03 : une attestation dans la fiche d\'une autre ENTRY ne suffit pas sans décision qui l\'assume) ; forme du dictionnaire d\'un exemple, retrait de mots compris (critère 1) ; renvoi appuyé (critère 2) ; forme conjuguée ou honorifique non sourcée d\'office (critère 3) ; graphie attestée pour le mot ; transcription en kana d\'un romaji attesté recevable, sans ajout de kanji ; information française attestée préservée.');
P();
P('## R3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}) ; elles ne rejoindront la liste globale unique qu'après arbitrage, à part des 99 déjà retenues.`);
P();
P('| # | Unité | Mot | Famille | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${motDe(c)} | ${F[c].f} | ${F[c].k} |`);
P();
P(`## R4. Les ${unites.length} fiches de provenance`);
P();
P('Les furigana des fiches sont rendus entre crochets : 冊[さつ].');
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
P('## R5. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t4-lot06.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches sont exactement le lot 06 de la tranche 4 arbitrée | oui : ${unites.length} nuances distinctes, ${new Set(bloc.map((u) => u.entree)).size} ENTRY |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').length} faux positifs présumés, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} à caractère isolé seulement |`);
P(`| Verdicts proposés | ${src.length} sourcés, ${ass.length} assumé, ${ec.length} écarts ; total ${unites.length} |`);
P(`| Un écart a une famille et une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}, à la suite de V2-84 |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé ; ${bloc.filter((u) => u.dans147.length).length} nuance sur un sens des 147, non rouvert |`);
P(`| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : ${bloc.filter((u) => u.candidats377.length).length} nuances portent sur un candidat, qui le reste |`);
P(`| Verdicts arbitrés (2026-10-10) | ${src.length} sourcés, ${ass.length} assumé, ${ec.length} écarts ; les ${unites.length} confirmés |`);
P('| Corrections retenues | avant l\'arbitrage : 99 ; après : **111 (10 + 5 + 96)**, aucune appliquée |');
P('| **Tranche 4, clôture** | lot 05 12 (6 sourcés, 0 assumé, 6 écarts) + lot 06 18 (5, 1, 12) = **30 nuances du plan, 11 sourcées, 1 assumée, 18 écarts**, toutes arbitrées ; hors JLPT, à part : 2 (1 sourcée, 1 écart) ; corrections V2-78 à V2-96 |');
P(`| **Décompte du chantier** | ${RESTE_AVANT} nuances du plan restaient à lire ; **${unites.length} sont contrôlées dans ce lot ; ${RESTE_AVANT - unites.length} restent**, toutes dans les tranches 5 à 8. **La tranche 4 serait close** avec l'arbitrage de ce lot (lot 05 : 12 ; lot 06 : 18 ; et les 2 hors JLPT, comptées à part, arbitrées). |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t4-lot06.md'), md);
console.log(`lot 06 : ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} ; reste ${RESTE_AVANT - unites.length}`);
