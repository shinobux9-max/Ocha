// A2-05 · volet 1 · lot 2 (provenance) · bloc 1 bis : complément des lots 04 et 07 (10 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-1bis.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-1bis.md
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
const rapportT1 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance.md'), 'utf8');
const st = (s) => String(s ?? '').replace(/<rt>[^<]*<\/rt>/g, '').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// v : 'sourcé' | 'écart' ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_270: { v: 'écart', o: '冷たい : nuance de la fiche (« à ne pas confondre avec 冷たい (tsumetai) »). 暑い : aucune. Le tri l\'avait écarté parce que あつい figure dans un ancien exemple de la fiche, mais ce あつい est 熱い (« 熱い お茶 »), non 暑い.', m: '**冷たい est sourcé** : la fiche le cite, avec sa lecture (critère 2). **Le contraire 暑い ne l\'est pas** : la fiche ne nomme aucun contraire, et le seul あつい de ses textes est l\'homophone 熱い. Renvoi non appuyé par la fiche (critère 2). C\'est le défaut d\'homophonie du tri, en kana, que l\'arbitrage a retenu.', k: '`nuance` (ENTRY) : « Le froid de l\'air ; un objet froid se dit 冷たい. »', r: 'Même situation que 暑い en tranche 1 (V2-20 retire le contraire 寒い) ; les deux corrections se répondent sans dépendre l\'une de l\'autre.' },
  v_277: { v: 'écart', o: '猫舌 : nuance de la fiche (« 猫舌 (nekojita), littéralement une \'langue de chat\' »). 暑い : aucune. Le tri l\'avait écarté par la lecture あつい, qui est celle du mot même de la fiche, 熱い.', m: '**猫舌 est sourcé** : la fiche l\'écrit et l\'explique. **暑い ne l\'est pas** : la fiche ne cite ni 暑い ni la chaleur de l\'air ; la lecture あつい de ses textes est celle de 熱い. Renvoi non appuyé (critère 2), écarté par le tri sur un homophone.', k: '`nuance` (ENTRY) : « Un objet, un liquide, un aliment. 猫舌 : qui ne supporte pas ce qui est trop chaud. »', r: 'La mention française « (même lecture) » disparaît avec le renvoi ; le texte français est hors périmètre, mais il ne peut subsister sans le mot qu\'il qualifie.' },
  v_154: { v: 'écart', o: 'La fiche dit : « plus formel que le mot en katakana クルマ (kuruma) ». Le seul 車 de ses textes est le composant du mot, lu しゃ (« 車 (sha, véhicule/roue) »), et le 車 de 自動車.', m: 'La fiche atteste le mot de la conversation, mais sous la graphie クルマ ; elle n\'écrit jamais 車 comme mot (lu くるま). Le relevé mécanique a trouvé 車 à l\'intérieur de 自動車 et dans l\'analyse du composé, ce qui ne prouve rien. Choisir la graphie en kanji d\'un mot que la fiche écrit en katakana, c\'est reconstituer une graphie par connaissance extérieure, comme 来ない pour 来る (V2-25).', k: '`nuance` (ENTRY) : « Terme formel ; dans la conversation : クルマ. », la graphie de la fiche.', r: '**Preuve insuffisante plutôt qu\'erreur** : le mot est bien celui de la fiche (kuruma), seule sa graphie diffère. Si l\'arbitrage tient un changement d\'écriture pour une simple transcription, comme めがね pour 眼鏡 (曇る, sourcé en tranche 1), l\'unité est sourcée. La différence avec 曇る : là, la graphie publiée (kana) suit la lecture que la fiche donne ; ici, elle ajoute un kanji que la fiche n\'emploie pas pour ce mot.' },
  v_249: { v: 'sourcé', o: 'Nuance de la fiche : « une ville (souvent de taille moyenne ou petite par rapport à 市 - shi) ».', m: 'Le mot 市 est écrit dans la nuance de la fiche, avec sa lecture, et dans la même opposition de taille. Ce n\'est pas un caractère retrouvé dans un mot plus long : c\'est le mot cité. Critère 2.' },
  v_674: { v: 'écart', o: 'La fiche dit : « à ne pas confondre avec l\'accentuation de hashi signifiant « baguettes » ou « bord » ». Elle n\'écrit 箸 nulle part.', m: 'L\'homophone est attesté par la fiche, en romaji et par son sens ; la graphie 箸 ne l\'est pas. Le kanji est reconstitué par connaissance extérieure, ce que l\'arbitrage de 来る exclut. Ce n\'est pas un renvoi sans appui : c\'est une graphie ajoutée.', k: '`nuance` (ENTRY) : « Ne pas confondre avec l\'homophone « baguettes », d\'accentuation différente. », sans graphie japonaise ajoutée.', r: 'Le caractère isolé 箸 est absent de tous les textes de la fiche. Écrire « hashi » en romaji, comme la fiche, serait une autre correction possible ; je propose la plus sobre.' },
  v_257: { v: 'sourcé', o: 'Nuance de la fiche : « Compteur spécifique : 匹 (hiki). »', m: 'Le compteur est écrit dans la nuance de la fiche. Critère 2 : la fiche cite l\'ENTRY 匹.' },
  v_258: { v: 'sourcé', o: 'Nuance de la fiche : « Compteur spécifique : 匹 (hiki). »', m: 'Même cas que 犬 : le compteur est écrit dans la nuance de la fiche. Critère 2.' },
  v_261: { v: 'écart', o: 'Aucune. La fiche ne parle ni de 鼻, ni du nez, ni d\'un homophone ; sa nuance porte sur les compteurs (本, 輪).', m: 'L\'homophone 鼻 et la remarque sur l\'accentuation sont ajoutés par connaissance extérieure ; aucune décision ne les assume (D0492 porte sur la traduction « Floraison »). Contenu ajouté.', k: '`nuance` (ENTRY) : retirée (aucune nuance publiée), faute de contenu sourcé à conserver.', r: 'La correction ne reprend pas les compteurs de la fiche (本, 輪) : ce serait écrire un contenu nouveau, que ce contrôle n\'a pas à décider. Une ENTRY sans aucune nuance publiée est courante (125 ENTRY sur 684).' },
  v_262: { v: 'sourcé', o: 'Nuance de la fiche : « Compteur spécifique : 羽 (wa). »', m: 'Le compteur est écrit dans la nuance de la fiche. Critère 2.' },
  v_271: { v: 'sourcé', o: 'Nuance de la fiche : « caractérisée par l\'éclosion des fleurs de cerisier (桜 - sakura) » ; ancien exemple : « 美しい 桜 の 花 が 咲き誇ります ».', m: 'Le mot 桜 est écrit dans la nuance de la fiche, avec sa lecture. Critère 2.' }
};

// Exhaustivité : exactement le bloc 1 bis du périmètre arbitré
const bloc = plan.complement1bis;
const unites = bloc.map((u) => court(u.sens));
if (bloc.length !== 10 || Object.keys(F).length !== 10 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`bloc : ${unites} / fiches : ${Object.keys(F)}`);
for (const [id, f] of Object.entries(F)) if ((f.v === 'écart') !== Boolean(f.k)) throw new Error(`correction incohérente : ${id}`);
if (bloc.some((u) => !['04', '07'].includes(u.lotN))) throw new Error('hors lots 04 et 07');
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
const dejaT1 = [...rapportT1.matchAll(/^### `(v_[\w]+)` · /gm)].map((m) => m[1]);
if (unites.some((u) => dejaT1.includes(u))) throw new Error('unité déjà lue en tranche 1');
const DERNIER_V2 = Math.max(...[...rapportT1.matchAll(/^\| V2-(\d+) \|/gm)].map((m) => Number(m[1])));
if (DERNIER_V2 !== 25) throw new Error(`dernier numéro V2 : ${DERNIER_V2}`);

const src = unites.filter((c) => F[c].v === 'sourcé'), ec = unites.filter((c) => F[c].v === 'écart');
const NUM = new Map(ec.map((c, i) => [c, DERNIER_V2 + i + 1]));
const motDe = (u) => vocab.find((e) => e.id === u.match(/^v_\d+/)[0]).word;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : bloc 1 bis, complément des lots 04 et 07');
P();
P('**Date** : 2026-10-10');
P('**Statut** : **arbitré le 2026-10-10** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **5 sourcés, 5 écarts**, les dix verdicts proposés confirmés, les corrections V2-26 à V2-30 retenues sans modification (§B0). La proposition est conservée telle quelle aux §B1 à §B5.');
P();
P('## B0. Arbitrage du 2026-10-10');
P();
P('- **Sourcés, confirmés** : `v_249` 町, `v_257` 犬, `v_258` 猫, `v_262` 鳥, `v_271` 春.');
P('- **V2-26 寒い** : écart confirmé ; retirer 暑い, conserver 冷たい.');
P('- **V2-27 熱い** : écart confirmé ; retirer 暑い, conserver 猫舌.');
P('- **V2-28 自動車** : écart confirmé ; conserver la graphie de la source クルマ, et non 車.');
P('- **V2-29 橋** : écart confirmé ; retirer la graphie 箸, non attestée ; conserver la mention de l\'homophone « baguettes », sans graphie ajoutée.');
P('- **V2-30 花** : écart confirmé ; retirer la nuance publiée, non sourcée, sans en créer une nouvelle à partir des compteurs de la fiche.');
P('- **Les 83 rapprochements mécaniques présumés sourcés restent soumis à une contre-vérification individuelle**, qui distingue l\'identité du mot de la simple identité de lecture.');
P('- V2-26 à V2-30 rejoignent la liste consolidée, à part des dix modifications du volet 2, de V1-1 à V1-5 et de V2-1 à V2-25 : **45 corrections retenues, aucune appliquée**.');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre arbitré le 2026-10-10 (ChatGPT, par délégation) : 10 nuances, livrées à part de la tranche 2, avec leurs propres contrôles de complétude (`etape2-A2-05-volet1-lot2-tranche2-perimetre.md`, §0 et §3). Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict de la tranche 1 ni du volet 2 n\'est rouvert. **Le texte français des nuances est hors périmètre.**');
P();
P('## B1. Résultat proposé');
P();
P('| Verdict proposé | Nuances | Détail |');
P('|---|---|---|');
P(`| **sourcé** | ${src.length} | ${src.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **écart** (E2) | ${ec.length} | ${ec.map((c) => `\`${c}\` ${motDe(c)}`).join(' ; ')} |`);
P(`| **Total** | ${unites.length} | |`);
P();
P('Aucune nuance n\'est « assumée » par une décision : les décisions de ces ENTRY ne disent rien de l\'origine de leur nuance.');
P();
P('**Ce que le bloc montre sur les deux défauts du tri** :');
P();
P('- **Les deux faux positifs présumés sont de vrais écarts, par homophonie en kana** : 寒い et 熱い renvoient à 暑い, que le tri croyait retrouver parce que leurs fiches écrivent あつい ; ce あつい est chaque fois 熱い. La contre-vérification des 83 était donc nécessaire.');
P('- **Sur les huit nuances relevées par un caractère isolé, cinq sont sourcées et trois ne le sont pas.** Les cinq sourcées (町, 犬, 猫, 鳥, 春) citent un mot que la fiche écrit en toutes lettres (市, 匹, 羽, 桜). 橋 et 花 ajoutent un homophone que la fiche n\'écrit pas (箸) ou ne mentionne pas (鼻). 自動車 écrit en kanji un mot que la fiche écrit en katakana (クルマ). **Le relevé n\'a servi qu\'au repérage** : la présence de 車 dans un texte de la fiche était trompeuse, celle de 匹 ne l\'était pas.');
P();
P('| Famille | Nuances | Ce qui est en cause |');
P('|---|---|---|');
P('| **Renvoi non appuyé**, écarté par le tri sur un homophone | 寒い, 熱い | 暑い, que la fiche ne cite pas |');
P('| **Graphie reconstituée** : mot attesté, graphie absente | 自動車 (車 pour クルマ), 橋 (箸 pour « hashi, baguettes ») | une graphie japonaise que la fiche n\'écrit pas, comme 来ない (V2-25) |');
P('| **Contenu ajouté** | 花 | un homophone (鼻) dont la fiche ne dit rien |');
P();
P('## B2. Critères appliqués');
P();
P('Les critères arbitrés le 2026-10-08, et les précédents de la tranche 1, sans changement : forme du dictionnaire d\'un exemple de la fiche (critère 1) ; renvoi appuyé par la fiche examinée ou par une décision au fondement vérifiable (critère 2) ; forme honorifique ou conjuguée, cas par cas, et **aucune graphie reconstituée** quand la fiche nomme un mot sans l\'écrire (critère 3, 来る). La règle de détection des caractères isolés n\'a servi qu\'au repérage.');
P();
P('## B3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}) ; elles ne rejoindront la liste globale qu'après arbitrage, à part des dix du volet 2, de V1-1 à V1-5 et de V2-1 à V2-25. Toutes reprennent le texte de la fiche, sans élément japonais ajouté.`);
P();
P('| # | Unité | Mot | Lot | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${motDe(c)} | ${bloc.find((u) => court(u.sens) === c).lotN} | ${F[c].k} |`);
P();
P('## B4. Les 10 fiches de provenance');
P();
for (const u of bloc) {
  const id = court(u.sens); const f = F[id]; const eid = u.entree; const sid = `n5_${eid}`;
  P(`### \`${id}\` · ${u.mot} · nuance d'ENTRY — **${f.v}**`);
  P();
  for (const x of [sid, ...(fusion.get(sid) ?? [])]) {
    const fi = sources.get(x);
    P(`- **Fiche source** (\`${x}\`${x !== sid ? ', fusionnée' : ''}, ${fi.type}) : traductions « ${[fi.meanings.primary, ...(fi.meanings.secondary ?? [])].join(' ; ')} » ; particules ${(fi.particles ?? []).join(', ') || 'aucune'}. Nuance : « ${st(fi.nuance)} » Exemple : « ${st(fi.example?.japanese)} » — « ${st(fi.example?.french)} »`);
    for (const q of ex.vocab?.[x] ?? []) P(`  - Ancien exemple : « ${st(q.japanese)} » — « ${st(q.french ?? q.translation)} »`);
  }
  P(`- **Publié** : nuance de l'ENTRY : « ${champs.get(sid)?.nuance} ».`);
  P(`- **Décisions de l'ENTRY** : ${decisionsDe(sid).map((d) => `${d.id.replace('A2-04-', '')} (${d.kind}, \`${d.field}\`) : « ${d.reason} »`).join(' ; ') || 'aucune'}.`);
  P(`- **Repérage** : ${u.statut} ; ${u.chaines.length ? `chaînes écartées par le tri : ${u.chaines.map((c) => `${c.chaine}${u.parLecture.includes(c.chaine) ? ' (par la lecture)' : ''}`).join(' ; ')}` : 'aucune chaîne signalée par le criblage'}${u.uns.length ? ` ; caractère isolé : ${u.uns.map((k) => k.c).join(', ')}` : ''}.`);
  P(`- **Origine recherchée** : ${f.o}`);
  P(`- **Verdict proposé** : **${f.v}**.`);
  P(`- **Verdict arbitré (2026-10-10)** : **${f.v}**, confirmé${f.k ? ` ; correction V2-${NUM.get(id)} retenue sans modification, non appliquée` : ''}.`);
  P(`- **Justification** : ${f.m}`);
  if (f.k) P(`- **Correction proposée, non appliquée (V2-${NUM.get(id)})** : ${f.k}`);
  if (f.r) P(`- **Réserve** : ${f.r}`);
  P();
}
P('## B5. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-1bis.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches sont exactement le bloc 1 bis du périmètre arbitré | oui : ${unites.length} nuances distinctes, ${new Set(bloc.map((u) => u.entree)).size} ENTRY, lots 04 (${bloc.filter((u) => u.lotN === '04').length}) et 07 (${bloc.filter((u) => u.lotN === '07').length}) |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').length} faux positifs présumés, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} nuances relevées par un caractère isolé |`);
P('| Aucune nuance déjà lue en tranche 1 | oui |');
P(`| Verdicts proposés | ${src.length} sourcés, ${ec.length} écarts ; total ${unites.length} |`);
P(`| Verdicts arbitrés (2026-10-10) | ${src.length} sourcés, ${ec.length} écarts ; les ${unites.length} confirmés |`);
P(`| Un écart a une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}, à la suite de V2-25 |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé |`);
P('| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : 寒い, 熱い et 春 restent candidats pour leurs propres relevés |');
P('| Corrections retenues | avant l\'arbitrage : 10 + 5 + 25 ; après : **10 + 5 + 30 = 45**, aucune appliquée |');
P(`| **Décompte du chantier** | 278 nuances restaient à lire ; **${unites.length} sont contrôlées dans ce bloc** ; **${278 - unites.length} restent** : tranche 2, 43 (lot 00 : 9, lot 01 : 34) ; tranches 3 à 8, 225. Les 2 nuances hors JLPT restent comptées à part. |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-1bis.md'), md);
console.log(`bloc 1 bis : ${src.length} sourcés, ${ec.length} écarts ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} ; reste ${278 - unites.length}`);
