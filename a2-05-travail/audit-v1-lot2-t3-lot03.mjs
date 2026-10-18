// A2-05 · volet 1 · lot 2 (provenance) · tranche 3, lot 03 (14 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t3-lot03.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot03.md
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
const r02 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot02.md'), 'utf8');
// Les furigana des fiches sont rendus entre crochets (戸[と]) : la provenance d'une graphie en dépend.
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_33: { v: 'sourcé', o: "Nuance de la fiche : « peut aussi se lire 家[うち] (uchi) dans un contexte plus familier pour dire 'chez soi' ». D0223 : « La lecture うち, documentée par la nuance de la source, n'est PAS ajoutée à readings [...] Elle reste mentionnée dans la nuance ».", m: "Faux positif présumé, contre-vérifié : la lecture うち est écrite par la fiche, en furigana du même kanji 家 et en romaji ; **identité du mot établie**, non simple identité de lecture. D0223 en assume aussi la mention." },
  v_34: { v: 'écart', f: 'construit', o: "家 (いえ) : nuance de la fiche (« par opposition au bâtiment physique 家[いえ] (ie, maison) »). 家庭料理 : aucune ; l'ancien exemple a « 家庭 の 料理 は いつも 美味しい です ».", m: "**家 (いえ) est sourcé** (critère 2). **家庭料理 ne l'est pas** : la source écrit 家庭の料理 ; le composé publié retire la particule の, ce qui change la construction (critère 1 non rempli, comme 空は → 空が en tranche 1).", k: "`nuance` (ENTRY) : « Le foyer, la vie de famille à la maison, par opposition au bâtiment 家 (いえ) : 家庭の料理, la cuisine familiale. », la forme de l'ancien exemple.", r: "**Preuve insuffisante plutôt qu'erreur** : aucun mot n'est étranger à la fiche, seule la construction l'est." },
  v_96: { v: 'assumé', o: "La fiche de テーブル ne cite pas 机 ; elle traduit « Bureau » parmi ses traductions. D0271 : « Le premier est repris dans la nuance ; le second relève de 机 ». La fiche de 机 (`n5_v_145`) dit : « 机[つくえ] (tsukue) sert à étudier ou travailler, tandis que テーブル[てーぶる] (tēburu) sert plutôt pour les repas ».", m: "Le renvoi à 机 est assumé par une décision validée, **dont le fondement se vérifie dans la fiche de 机**, qui fait elle-même la distinction publiée. Critère 2, par la décision ; même cas que カップ / コップ (lot 02).", r: "Si l'arbitrage exige le renvoi dans la fiche examinée, l'unité est un écart, et la correction serait : « Table de repas ou de salon. »" },
  v_208_s1: { v: 'sourcé', o: "Exemple de la fiche : « 夜 お風呂 に 入ります » ; anciens exemples : « お風呂 に ゆっくり 入りたい ».", m: "お風呂に入る est la forme du dictionnaire de l'exemple de la fiche, privé de 夜 (critère 1). La remarque sur 入る reprend D0256 (« dans お風呂に入る, l'action vient de 入る »)." },
  v_208: { v: 'sourcé', o: "La fiche dit « Nom précédé du préfixe honorifique お (o-) » et écrit お風呂[ふろ]. D0261 : « お風呂 et ふろ restent deux ENTRY (arbitrage du lot 03) ».", m: "ふろ et 風呂 sont le mot de la fiche sans le préfixe qu'elle isole, avec la lecture que ses furigana donnent (même raisonnement que 皿 et 弁当, lot 02) ; la séparation en deux ENTRY est celle de D0261." },
  v_209_s1: { v: 'écart', f: 'construit', o: "La fiche de ふろ a « ふろ に 入りましょう » et « ふろ に 入って » ; elle n'écrit pas お風呂. La nuance publiée de ce sens est celle de お風呂 (sens 1), recopiée.", m: "La chaîne お風呂に入る n'est pas dans la fiche de ふろ : elle change le mot (ふろ → お風呂) d'un exemple que la fiche donne sous la forme ふろに入る (critère 1 non rempli, comme 道路 → 道 en tranche 1). La même chaîne est sourcée pour お風呂, sur sa propre fiche.", k: "`nuance` (sens 1) : « Le bain japonais : la baignoire d'eau chaude où l'on se plonge après s'être lavé, et par extension la pièce. ふろに入る : prendre un bain (l'action est portée par 入る). », la forme de l'exemple de la fiche.", r: "Le texte français, identique à celui de お風呂, est hors périmètre." },
  v_209: { v: 'assumé', o: "La fiche de ふろ dit « Variante sans le préfixe honorifique de 風呂 (furo) » ; elle n'écrit pas お風呂. D0261 : « お風呂 et ふろ restent deux ENTRY (arbitrage du lot 03) : comme pour お皿 / 皿, la présence de お change la forme lexicale ». La fiche de お風呂 (`n5_v_208`) existe et décrit le mot avec son préfixe.", m: "Le renvoi à お風呂 est assumé par une décision validée, **dont le fondement se vérifie dans la fiche de お風呂** et dans celle de ふろ, qui se dit elle-même « variante sans le préfixe honorifique ».", r: "Si l'arbitrage exige le renvoi dans la fiche examinée, l'unité est un écart, et la correction serait : « Forme sans le préfixe honorifique, plus neutre ou familière. »" },
  v_210: { v: 'sourcé', o: "Nuance de la fiche : « par opposition à la porte traditionnelle japonaise 戸[と] (to) ou 襖[ふすま] (fusuma) ».", m: "Le mot 戸 est écrit par la fiche, avec sa lecture et le sens de l'opposition (critère 2). Le caractère isolé n'a servi qu'au repérage." },
  v_229: { v: 'écart', f: 'renvoi', o: "Aucune. La fiche dit « désignant historiquement le papier de soie ou le papier multi-usage (mouchoir ou papier toilette) » ; elle n'écrit ni トイレットペーパー ni ティッシュ.", m: "Deux mots ajoutés par connaissance extérieure (critère 2).", k: "`nuance` (ENTRY) : « Terme un peu vieilli. »", r: "« Un peu vieilli » s'appuie sur « historiquement » dans la fiche ; texte français, hors périmètre." },
  v_237: { v: 'écart', f: 'construit', o: "1枚の紙 : aucune ; la fiche donne le compteur 枚, sans cette expression. 髪 et 神 : aucune ; la fiche ne parle d'aucun homophone, et ces caractères sont absents de ses textes.", m: "**1枚の紙 est construit** (critère 1). **髪 et 神 sont des homophones ajoutés** (critère 2) : la fiche de 紙 ne les nomme pas, ni par l'écriture ni par le sens. Le lot 01 a retiré, symétriquement, 紙 et 神 de la nuance de 髪 (V2-47), dont la fiche nommait les homophones sans les écrire.", k: "`nuance` (ENTRY) : « Le papier, ou une feuille. »" },
  v_507: { v: 'sourcé', o: "Traduction secondaire de la fiche : « Logement en immeuble (souvent de type léger/modeste par rapport au manshon ou mansion) ».", m: "Le mot マンション est attesté par la fiche en romaji (manshon), dans l'opposition même que la nuance publiée reprend ; la nuance l'écrit en katakana. **Transcription d'un romaji attesté**, recevable (V2-53, V2-55) ; aucune graphie en kanji n'est ajoutée.", r: "Le tri l'avait classé « autre mot » parce que le romaji est dans une traduction, non dans la nuance de la fiche. Le texte français (« plus solide et cossu ») est hors périmètre." },
  v_589: { v: 'écart', f: 'renvoi', o: "La fiche de お手洗い ne cite pas トイレ, et aucune décision de l'ENTRY n'en parle (D0265, D0266). La fiche de トイレ (`n5_v_617`) dit : « un peu plus familier que otearai (お手洗い) ».", m: "Renvoi que la fiche examinée ne fait pas, et **qu'aucune décision n'assume** : le verdict « assumé » suppose une décision validée qui identifie l'origine. La relation est attestée dans l'autre sens, par la fiche de トイレ.", k: "`nuance` (ENTRY) : « Terme poli, sûr dans toutes les situations ; littéralement « se laver les mains ». »", r: "**Cas à trancher** : la provenance existe dans les sources (fiche de トイレ), mais sans décision qui la porte vers cette nuance. Si l'arbitrage admet qu'une attestation réciproque dans la fiche de l'ENTRY citée suffit, l'unité est sourcée." },
  v_708: { v: 'écart', f: 'renvoi', o: "ドア : la fiche écrit « par opposition à la porte coulissante intérieure (doa ou fusuma) », en romaji. 戸 : aucune ; le caractère est absent de tous les textes de la fiche.", m: "Faux positif présumé, rapproché par le romaji : **ドア est recevable**, transcription en katakana d'un romaji attesté (V2-53, V2-55). **戸 ne l'est pas** : la fiche de 門 ne le cite pas (critère 2). La fiche de ドア, elle, écrit 戸 (sourcé pour ドア) : chaque nuance se juge sur sa fiche.", k: "`nuance` (ENTRY) : « Grande porte extérieure : l'entrée d'une propriété, d'une école, d'un temple ; la porte d'une maison se dit ドア. »", r: "La fiche oppose 門 à une porte « coulissante intérieure (doa ou fusuma) », la nuance publiée à « la porte d'une maison » : texte français, hors périmètre, signalé pour mémoire." },
  v_713_s2: { v: 'sourcé', o: "Exemple de la fiche : « へや の 電気 を つけます » ; ancien exemple : « 部屋 を 出る 時 に、電気 を 消します ».", m: "Les deux chaînes sont la forme du dictionnaire de l'exemple et de l'ancien exemple, réduits à 電気を (critère 1). D0274 cite 電気をつける pour fonder le sens, que la fiche atteste aussi (« l'éclairage d'une pièce (que l'on allume ou éteint) »)." }
};

// Exhaustivité : exactement le lot 03 de la tranche 3 du périmètre arbitré
const bloc = plan.toutes.filter((u) => u.tranche === '3' && u.lotN === '03');
const unites = bloc.map((u) => court(u.sens));
if (!r02.includes('**arbitré le 2026-10-10**')) throw new Error('lot 02 non arbitré');
if (bloc.length !== 14 || Object.keys(F).length !== 14 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`lot 03 : manquantes ${unites.filter((u) => !F[u])} ; en trop ${Object.keys(F).filter((k) => !unites.includes(k))}`);
for (const [id, f] of Object.entries(F)) if (!['sourcé', 'assumé', 'écart'].includes(f.v) || (f.v === 'écart') !== Boolean(f.k) || (f.v === 'écart') !== Boolean(f.f)) throw new Error(`verdict, correction ou famille incohérents : ${id}`);
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
const DERNIER_V2 = Math.max(...[...r02.matchAll(/^\| V2-(\d+) \|/gm)].map((m) => Number(m[1])));
if (DERNIER_V2 !== 71) throw new Error(`dernier numéro V2 : ${DERNIER_V2}`);

const src = unites.filter((c) => F[c].v === 'sourcé'), ass = unites.filter((c) => F[c].v === 'assumé'), ec = unites.filter((c) => F[c].v === 'écart');
const NUM = new Map(ec.map((c, i) => [c, DERNIER_V2 + i + 1]));
const motDe = (c) => bloc.find((u) => court(u.sens) === c).mot;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
const s1 = bloc.filter((u) => u.statut === 'un caractère seulement');
const fp = bloc.filter((u) => u.statut === 'faux positif à contre-vérifier');
const RESTE_AVANT = 203;
const FAM = { renvoi: 'Renvoi ou mot non appuyé par la fiche (critère 2)', construit: 'Exemple construit ou construction changée (critère 1)' };
const parFam = (k) => ec.filter((c) => F[c].f === k);
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : tranche 3, lot 03');
P();
P('**Date** : 2026-10-10');
P('**Statut** : **arbitré le 2026-10-10** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **6 sourcés, 2 assumés, 6 écarts**, les 14 verdicts proposés confirmés, V2-72 à V2-77 retenues sans modification (§O0). **La tranche 3 est close.** La proposition est conservée telle quelle aux §O1 à §O5.');
P();
P('## O0. Arbitrage du 2026-10-10');
P();
P('- **Sourcés, confirmés** : 家, お風呂 sens 1, お風呂 (ENTRY), ドア, アパート, 電気 sens 2. **Assumés, confirmés** : テーブル (D0271, fondée sur la fiche de 机) ; ふろ (ENTRY, D0261, fondée sur la fiche de お風呂).');
P('- **Écarts confirmés** : V2-72 家庭 (家庭の料理, attesté par l\'ancien exemple, et non 家庭料理) ; V2-73 ふろ sens 1 (ふろに入る, attesté par la fiche, et non お風呂に入る) ; V2-74 ちり紙 (renvois à トイレットペーパー et ティッシュ retirés) ; V2-75 紙 (1枚の紙 retiré, et les homophones 髪 et 神, absents de sa fiche) ; V2-76 お手洗い (renvoi à トイレ retiré) ; V2-77 門 (戸 retiré ; ドア conservé, transcription recevable du romaji doa).');
P('- **お手洗い** : la fiche de トイレ cite bien お手洗い, mais **cette attestation réciproque ne suffit pas, à elle seule, à sourcer le renvoi dans la fiche de お手洗い**, et aucune décision de cette ENTRY n\'assume ce transfert. « Assumé » exige une décision validée au fondement vérifiable ; « sourcé », une attestation dans la fiche examinée ou une normalisation admise. Écart V2-76 confirmé, sans modifier cette doctrine documentaire ni les normes A2.');
P('- **Clôture de la tranche 3** : lot 02 (22 : 4 sourcés, 3 assumés, 15 écarts) + lot 03 (14 : 6, 2, 6) = **36 nuances examinées, 10 sourcées, 5 assumées, 21 écarts**.');
P('- **Liste globale : 92 corrections (10 + 5 + 77), toutes non appliquées. Restent 189 nuances**, dans les tranches 4 à 8, plus les 2 nuances hors JLPT suivies à part ; 377 candidats et 147 arbitrages du volet 2 inchangés.');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre de la tranche 3 arbitré le 2026-10-10 (ChatGPT, par délégation), livré par lot : ce rapport porte sur les **14 nuances du lot 03** (« Maison, habitat et vie domestique ») ; le lot 02 est arbitré. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict antérieur n\'est rouvert. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.');
P();
P('## O1. Résultat proposé');
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
P('- **Le classement arbitré au lot 02 s\'applique sans changement.** Deux nuances sont **assumées** : テーブル (D0271, fondée sur la fiche de 机, qui fait elle-même la distinction publiée) et ふろ (D0261, fondée sur la fiche de お風呂). お手洗い ne l\'est pas : la fiche de トイレ cite お手洗い, mais **aucune décision ne porte ce renvoi** ; c\'est le seul cas où la provenance existe dans les sources sans décision qui l\'assume.');
P('- **Les transcriptions de romajis attestés** (arbitrées au lot 01) rendent sourcé マンション (アパート) et recevable ドア (門) ; elles ne rendent pas recevable 戸 dans la nuance de 門, que sa fiche ne nomme pas.');
P('- **Les paires se jugent fiche par fiche** : お風呂に入る est sourcé pour お風呂 et un écart pour ふろ, dont la fiche écrit ふろに入る ; 戸 est sourcé pour ドア et un écart pour 門 ; 紙 et 髪 retirent chacun les homophones que leur fiche n\'écrit pas.');
P(`- **Les ${fp.length} faux positifs présumés** se partagent : ${fp.map((u) => `${u.mot} (${F[court(u.sens)].v})`).join(', ')} ; 門 est un écart pour une autre de ses chaînes (戸), sa chaîne écartée (ドア) étant recevable. **Les ${s1.length} nuances relevées par un caractère isolé seulement** (${s1.map((u) => `${u.mot}, ${F[court(u.sens)].v}`).join(' ; ')}) ne sont pas des écarts : le relevé n'a servi qu'au repérage.`);
P('- **Aucune nuance n\'est retirée en entier.**');
P();
P('## O2. Critères appliqués');
P();
P('Ceux du lot 02, sans changement, dont le **classement de provenance arbitré** : **sourcé**, attesté par la fiche examinée ou par une normalisation admise ; **assumé**, introduit par une décision validée qui en identifie l\'origine, vérifiable dans les sources figées ; **écart**, provenance non établie, même si une décision historique la mentionne. Et les précédents : forme du dictionnaire d\'un exemple, retrait de mots compris (critère 1) ; renvoi appuyé (critère 2) ; forme honorifique non sourcée d\'office (critère 3) ; graphie attestée pour le mot ; transcription en kana d\'un romaji attesté recevable, sans ajout de kanji ; information française attestée préservée.');
P();
P('## O3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}) ; elles ne rejoindront la liste consolidée qu'après arbitrage, à part des 86 déjà retenues.`);
P();
P('| # | Unité | Mot | Famille | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${motDe(c)} | ${F[c].f} | ${F[c].k} |`);
P();
P(`## O4. Les ${unites.length} fiches de provenance`);
P();
P('Les furigana des fiches sont rendus entre crochets : 戸[と].');
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
P('## O5. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t3-lot03.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches sont exactement le lot 03 de la tranche 3 arbitrée | oui : ${unites.length} nuances distinctes, ${new Set(bloc.map((u) => u.entree)).size} ENTRY |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${fp.length} faux positifs présumés, ${s1.length} à caractère isolé seulement |`);
P(`| Verdicts proposés | ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; total ${unites.length} |`);
P(`| Un écart a une famille et une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}, à la suite de V2-71 |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé ; ${bloc.filter((u) => u.dans147.length).length} nuance sur un sens des 147 |`);
P(`| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : ${bloc.filter((u) => u.candidats377.length).length} nuances portent sur un candidat, qui le reste |`);
P(`| Verdicts arbitrés (2026-10-10) | ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; les ${unites.length} confirmés |`);
P('| Corrections retenues | avant l\'arbitrage : 86 ; après : **92 (10 + 5 + 77)**, aucune appliquée |');
P('| **Tranche 3, clôture** | lot 02 22 (4 sourcés, 3 assumés, 15 écarts) + lot 03 14 (6, 2, 6) = **36 nuances, 10 sourcées, 5 assumées, 21 écarts**, toutes arbitrées ; corrections V2-57 à V2-77 |');
P(`| **Décompte du chantier** | ${RESTE_AVANT} nuances restaient à lire ; **${unites.length} sont contrôlées dans ce lot** ; **${RESTE_AVANT - unites.length} restent**, toutes dans les tranches 4 à 8. **La tranche 3 serait close** avec l'arbitrage de ce lot (lot 02 : 22 ; lot 03 : 14). Les 2 nuances hors JLPT restent comptées à part. |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot03.md'), md);
console.log(`lot 03 : ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} ; reste ${RESTE_AVANT - unites.length}`);
