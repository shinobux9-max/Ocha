// A2-05 · volet 1 · lot 2 (provenance) · tranche 3, lot 02 (22 nuances), en proposition.
// Lecture seule sur les données. Usage : node audit-v1-lot2-t3-lot02.mjs <racine>
//   écrit docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot02.md
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
const r01 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t2-lot01.md'), 'utf8');
const pT3 = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-tranche3-perimetre.md'), 'utf8');
// Les furigana des fiches sont rendus entre crochets (皿[さら]) : la provenance d'une graphie en dépend.
const st = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>([^<]*)<\/rt><\/ruby>/g, '$1[$2]').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const fusion = new Map();
const champs = new Map();
for (const l of lots) for (const [id, en] of Object.entries(l.entries)) { const c = en.retire?.merged_into; if (c) fusion.set(c, [...(fusion.get(c) ?? []), id]); if (en.fields) champs.set(id, en.fields); }
const court = (s) => s.replace(" (nuance d'ENTRY)", '');
const RETIREE = '`nuance` (ENTRY) : retirée (aucune nuance publiée), faute de contenu sourcé à conserver.';

// v : 'sourcé' | 'assumé' | 'écart' ; f : famille d'écart ; o : origine recherchée ; m : justification ; k : correction proposée (écart) ; r : réserve
const F = {
  v_66: { v: 'assumé', o: "La fiche de 飲む traduit « Prendre (un médicament) » et décrit l'action « d'avaler un médicament », sans exemple japonais de cet emploi. D0189 : « 薬を飲む garde le même sens japonais (avaler, ingérer) ; « prendre » n'est que la traduction française imposée par la collocation : repris dans la nuance ». La collocation est écrite dans l'exemple de la fiche de 薬 (`n5_v_59`) : « 食後 に 、この 薬 を 飲みます ».", m: "La chaîne n'est pas dans la fiche examinée, mais **une décision validée en assume l'origine, et ce fondement se vérifie dans les sources figées** : la fiche de 飲む atteste l'emploi, celle de 薬 écrit la collocation (forme du dictionnaire de son exemple). C'est ce qui distingue ce cas de D0321, D0081 et D0083, dont le fondement n'est dans aucune source.", r: "**Premier emploi du verdict « assumé »** (défini au périmètre du lot 2, §6). Si l'arbitrage exige que la chaîne soit dans la fiche examinée elle-même, l'unité est un écart, et la correction serait : « S'emploie aussi pour un médicament (l'avaler). »" },
  v_84: { v: 'écart', f: 'construit', o: "弁当 : la fiche décrit le mot comme « souvent avec le préfixe honorifique お (o) » ; D0169 : « 弁当 n'est pas ajouté comme autre graphie [...] Mentionné dans la nuance ». 駅弁 : aucune.", m: "**弁当 est sourcé** : c'est le mot de la fiche sans le préfixe que la fiche elle-même isole (même raisonnement que 達 dans 友達, arbitré sourcé), et D0169 l'assume. **駅弁 est un composé ajouté** par connaissance extérieure : ni la fiche ni ses exemples ne l'ont.", k: "`nuance` (ENTRY) : « Forme polie et courante ; 弁当 sans お existe aussi, surtout à l'écrit et dans les composés. »" },
  v_85: { v: 'écart', f: 'renvoi', o: "Aucune. La fiche dit « par défaut le thé vert japonais » ; elle ne cite pas 紅茶. D0179 et D0180 portent sur l'extension « thé », non sur le thé noir.", m: "Renvoi à une autre ENTRY publiée que la fiche ne cite pas (critère 2).", k: "`nuance` (ENTRY) : « Désigne d'abord le thé vert japonais. »" },
  v_86: { v: 'écart', f: 'renvoi', o: "La fiche dit « spécifiquement le saké japonais traditionnel », sans écrire 日本酒. D0185 assume le saké dans la nuance, non ce mot.", m: "Le sens est attesté ; le mot 日本酒 est ajouté (critère 2). D0185 fonde « le saké », non « 日本酒 ».", k: "`nuance` (ENTRY) : « Désigne aussi, plus précisément, le saké. »" },
  v_88_s2: { v: 'sourcé', o: "朝ご飯 et 晩ご飯 : nuance de la fiche (« un repas complet comme 朝ご飯[あさごはん] [...] 晩ご飯[ばんごはん] »). ご飯を食べる : exemple « 毎日 おいしい ご飯 を 食べます » et ancien exemple « ご飯 を 茶碗 に 盛って 食べます ».", m: "朝ご飯 et 晩ご飯 sont écrits par la fiche (critère 2). ご飯を食べる est l'exemple de la fiche, privé de おいしい (retrait d'un mot, critère 1).", r: "L'exemple de la fiche ne dit pas s'il s'agit du riz ou du repas : l'attribution au sens 2 relève du découpage, hors périmètre." },
  v_88: { v: 'écart', f: 'renvoi', o: "Aucune. La fiche ne parle pas du riz cru et n'écrit pas 米 ; le caractère est absent de tous ses textes.", m: "Mot ajouté par connaissance extérieure (critère 2).", k: "`nuance` (ENTRY) : « Terme poli et courant. »" },
  v_90: { v: 'écart', f: 'graphie', o: "La fiche écrit « 鶏肉[とりにく] toriniku » : 鶏 n'y apparaît que dans 鶏肉, lu とり. Ni にわとり ni « le poulet vivant » ne sont dans la fiche.", m: "Le mot にわとり est ajouté, et la graphie 鶏 lui est attribuée alors que la fiche ne l'emploie que pour とり dans 鶏肉. Une graphie n'est sourcée que si la fiche l'atteste **pour le mot concerné**. La nuance n'a pas d'autre contenu.", k: RETIREE },
  v_93: { v: 'assumé', o: "La fiche de カップ dit « une tasse avec ou sans anse » et ne cite pas コップ. D0204 : « « Gobelet » brouille la distinction avec コップ (récipient sans anse) [...] le mug est repris dans la nuance ». La fiche de コップ (`n5_v_230`) dit « un verre à boire, un gobelet ou une tasse sans anse ».", m: "Le renvoi à コップ est assumé par une décision validée, **dont le fondement se vérifie dans la fiche de コップ**, qui décrit le récipient sans anse. Critère 2, par la décision.", r: "**À lire avec コップ.** Le texte français publié (« Récipient à anse ») restreint la fiche de カップ (« avec ou sans anse ») ; il est hors périmètre et signalé pour mémoire. Si l'arbitrage exige le renvoi dans la fiche examinée, l'unité est un écart, et la correction serait : « Tasse, mug. »" },
  v_95: { v: 'écart', f: 'renvoi', o: "喫茶店 : aucune. カフェ : ancien exemple « カフェ で 友達 と 一緒 に コーヒー を 飲みながら 話しました ».", m: "**喫茶店 est un renvoi que la fiche ne fait pas** (critère 2) ; D0182 ne dit rien de la nuance. **カフェ est écrit dans un ancien exemple de la fiche**, comme le lieu où l'on boit le café.", k: "`nuance` (ENTRY) : « La boisson ; l'établissement se dit カフェ. »", r: "La fiche montre カフェ dans un exemple, sans dire que c'est « l'établissement » du café. Si l'arbitrage tient que cela ne suffit pas, la correction serait : « La boisson. »" },
  v_98: { v: 'écart', f: 'renvoi', o: "Aucune. 料理屋 n'est ni dans la fiche ni dans le vocabulaire publié ; la fiche ne parle pas du restaurant japonais traditionnel.", m: "Mot ajouté par connaissance extérieure (critère 2).", k: "`nuance` (ENTRY) : « Plutôt un restaurant à l'occidentale. »", r: "Le texte français conservé (« à l'occidentale ») n'est pas dans la fiche non plus ; il est hors périmètre." },
  v_104_s1: { v: 'sourcé', o: "Nuance de la fiche : « S'associe souvent au verbe する (suru) faire la cuisine » ; D0176 : « suru_compatible : 料理する ».", m: "La formation 料理する est celle que la fiche décrit, avec する écrit ; D0176 l'établit (doctrine `suru_compatible` : la source établit la formation Nする). Aucune forme reconstituée." },
  v_111: { v: 'écart', f: 'forme', o: "お箸 : aucune dans les sources ; D0207 (tags) cite « お箸おつけしますか », « お箸をください », sans fondement dans la fiche. 橋 : aucune ; la fiche parle de l'accent de hashi, sans nommer d'homophone.", m: "**お箸 est une forme honorifique que la fiche n'écrit pas** (critère 3) ; D0207, décision sur les lieux, ne la fonde pas dans les sources. **橋 est un homophone que la fiche ne cite pas** (critère 2). Le précédent du bloc 1 bis (V2-29 : la graphie 箸 retirée de la nuance de 橋, dont la fiche nommait les baguettes sans les écrire) va dans le même sens ; ici, la fiche ne nomme même pas le pont. La nuance n'a pas d'autre contenu.", k: RETIREE },
  v_120: { v: 'écart', f: 'construit', o: "Aucune. La fiche ne contient ni 飲み物は ni la situation du restaurant.", m: "Exemple construit (critère 1). La nuance n'a pas d'autre contenu.", k: RETIREE },
  v_121: { v: 'sourcé', o: "Nuance de la fiche : « attention à ne pas le confondre avec 雨[あめ] - la pluie ».", m: "L'homophone 雨 est écrit par la fiche, avec sa lecture et son sens : renvoi appuyé (critère 2), identité du mot établie. Le précédent de 雨 (V2-22, 飴 retiré de sa nuance) ne s'y oppose pas : la fiche de 雨 ne citait pas 飴, celle de 飴 cite 雨." },
  v_211: { v: 'écart', f: 'decision', o: "Aucune dans les sources : 包丁 n'est ni dans la fiche ni dans le vocabulaire publié. D0214 : « Le premier est repris dans la nuance ; le second relève de 包丁 » (la traduction « Lame de cuisine »).", m: "Le renvoi à 包丁 est assumé par une décision validée **dont le fondement n'est dans aucune source** : même situation que D0321, D0081 et D0083 (critère 2). D0214 n'est pas réécrite.", k: "`nuance` (ENTRY) : « Couteau de table. »" },
  v_225: { v: 'sourcé', o: "La fiche dit « Nom précédé du préfixe honorifique お (o-) » et écrit お皿[さら] ; D0202 : « 皿 n'est pas ajouté comme autre graphie [...] Mentionné dans la nuance ».", m: "皿 (さら) est le mot de la fiche sans le préfixe que la fiche isole, avec la lecture que ses furigana donnent ; D0202 l'assume. Même raisonnement que 弁当 et que 達 (友達).", r: "Le relevé des caractères isolés avait noté 皿 et お : ils sont tous deux écrits par la fiche." },
  v_230: { v: 'assumé', o: "La fiche de コップ ne cite pas カップ. D0206 : « Pas équivalent : la tasse se dit カップ ». La fiche de カップ (`n5_v_93`) traduit « Tasse ; Gobelet ; Mug ».", m: "Le renvoi à カップ est assumé par une décision validée, **dont le fondement se vérifie dans la fiche de カップ** (« Tasse »). Critère 2, par la décision. Lu avec カップ : les deux renvois se fondent chacun sur la fiche de l'autre.", r: "Si l'arbitrage exige le renvoi dans la fiche examinée, l'unité est un écart, et la correction serait : « Récipient sans anse. », d'après la fiche." },
  v_427_s2: { v: 'écart', f: 'construit', o: "Aucune. La fiche parle « familièrement [d']une situation délicate (« c'est mal barré / c'est problématique ») », sans exemple japonais. D0196 cite まずいことになった, sans fondement dans les sources.", m: "Exemple construit (critère 1). Le sens est attesté, l'expression ne l'est pas ; D0196 la nomme pour fonder le découpage, non pour la sourcer.", k: "`nuance` (sens 2) : « Se dit d'une situation qui tourne mal. »", r: "Ce sens fait partie des 147 du volet 2 (L) : non rouvert." },
  v_427: { v: 'écart', f: 'renvoi', o: "Aucune. La fiche ne cite pas おいしくない et ne parle pas d'un registre plus poli.", m: "Forme ajoutée par connaissance extérieure (critère 2).", k: "`nuance` (ENTRY) : « Familier pour le goût. »" },
  v_464_s2: { v: 'écart', f: 'construit', o: "Aucune pour 子供に甘い et 考えが甘い : la fiche décrit « une attitude trop clémente, indulgente ou naïve », sans exemple japonais. D0190 cite 子供に甘い, D0193 考えが甘い (« repris dans la nuance du sens 2 »), sans fondement dans les sources.", m: "Les deux expressions sont construites (critère 1) ; les décisions qui les nomment en fondent le sens, non la chaîne japonaise.", k: "`nuance` (sens 2) : « Être indulgent envers quelqu'un ; avoir une vue trop optimiste. »", r: "Ce sens fait partie des 147 du volet 2 (L) : non rouvert. Le français conservé reprend celui de la nuance publiée, sans les exemples." },
  v_481: { v: 'écart', f: 'decision', o: "しょっぱい : aucune. つらい : aucune ; la fiche traduit « Pénible (sens ancien) » sans donner cette lecture. D0195 (correction) : « « pénible » est le sens de つらい, autre lecture du même kanji ».", m: "**しょっぱい est un mot ajouté** (critère 2). **つらい est assumé par une décision validée** (D0195), mais la lecture つらい n'est dans aucune source : fondement non vérifiable, même situation que D0081. D0195 n'est pas réécrite ; le retrait de « pénible » qu'elle décide n'est pas en cause, seule la chaîne japonaise de la nuance l'est.", k: "`nuance` (ENTRY) : « Se dit aussi d'un plat trop salé dans certaines régions. »", r: "« dans certaines régions » vient de D0194 (« emploi régional »), non de la fiche (« excessivement salée ») : texte français, hors périmètre." },
  v_677: { v: 'écart', f: 'graphie', o: "おゆ : la fiche écrit « l'eau chaude oyu » (traductions et nuance), en romaji. お湯 : aucune. お水 : aucune ; seule D0205 (コップ, tags) la cite (« on demande l'eau (お水) »), sans fondement dans les sources.", m: "**おゆ est recevable** : transcription en kana d'un romaji attesté (V2-53, V2-55). **La graphie お湯 ne l'est pas** : un kanji absent des sources. **お水 est une forme honorifique** que la fiche n'écrit pas (critère 3), et la décision d'une autre ENTRY qui la cite n'en donne pas de fondement.", k: "`nuance` (ENTRY) : « L'eau froide ou à température ambiante ; l'eau chaude se dit おゆ. »", r: "Le tri avait reconnu おゆ par le romaji, mais non お湯 : la contre-vérification sépare ici le mot attesté (oyu) de sa graphie en kanji." }
};

// Exhaustivité : exactement le lot 02 de la tranche 3 du périmètre arbitré
const bloc = plan.toutes.filter((u) => u.tranche === '3' && u.lotN === '02');
const unites = bloc.map((u) => court(u.sens));
if (!pT3.includes('**périmètre arbitré le 2026-10-10**')) throw new Error('périmètre de la tranche 3 non arbitré');
if (bloc.length !== 22 || Object.keys(F).length !== 22 || unites.some((u) => !F[u]) || Object.keys(F).some((k) => !unites.includes(k))) throw new Error(`lot 02 : manquantes ${unites.filter((u) => !F[u])} ; en trop ${Object.keys(F).filter((k) => !unites.includes(k))}`);
if (plan.toutes.filter((u) => u.tranche === '3' && u.lotN === '03').length !== 14) throw new Error('lot 03 : 14 attendues');
for (const [id, f] of Object.entries(F)) if (!['sourcé', 'assumé', 'écart'].includes(f.v) || (f.v === 'écart') !== Boolean(f.k) || (f.v === 'écart') !== Boolean(f.f)) throw new Error(`verdict, correction ou famille incohérents : ${id}`);
const v2 = [...audit.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const tot2 = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, v2.filter((m) => m[2] === k).length]));
if (v2.length !== 147 || tot2.L !== 136 || tot2.F !== 2 || tot2.C !== 9) throw new Error('volet 2 modifié');
const DERNIER_V2 = Math.max(...[...r01.matchAll(/^\| V2-(\d+) \|/gm)].map((m) => Number(m[1])));
if (DERNIER_V2 !== 56) throw new Error(`dernier numéro V2 : ${DERNIER_V2}`);

const src = unites.filter((c) => F[c].v === 'sourcé'), ass = unites.filter((c) => F[c].v === 'assumé'), ec = unites.filter((c) => F[c].v === 'écart');
const NUM = new Map(ec.map((c, i) => [c, DERNIER_V2 + i + 1]));
const motDe = (c) => bloc.find((u) => court(u.sens) === c).mot;
const decisionsDe = (sid) => journal.filter((d) => d.entry === sid);
const RESTE_AVANT = 225;
const FAM = { renvoi: 'Renvoi ou mot non appuyé par la fiche (critère 2)', forme: 'Forme honorifique que la fiche n\'écrit pas (critère 3)', construit: 'Exemple construit ou composé ajouté (critère 1)', graphie: 'Graphie non attestée pour le mot', decision: 'Renvoi assumé par une décision au fondement absent des sources' };
const parFam = (k) => ec.filter((c) => F[c].f === k);
let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — provenance : tranche 3, lot 02');
P();
P('**Date** : 2026-10-10');
P('**Statut** : **arbitré le 2026-10-10** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **4 sourcés, 3 assumés, 15 écarts**, les 22 verdicts proposés confirmés, V2-57 à V2-71 retenues sans modification (§N0). La proposition est conservée telle quelle aux §N1 à §N5.');
P();
P('## N0. Arbitrage du 2026-10-10');
P();
P('- **Classement de provenance confirmé pour ce chantier** (il ne modifie pas les normes A2) : **sourcé**, information attestée par la fiche examinée ou par une normalisation déjà admise ; **assumé**, information introduite par une décision validée qui en identifie l\'origine, cette origine étant vérifiable dans les sources figées ; **écart**, information dont la provenance n\'est pas établie, même si une décision historique la mentionne.');
P('- **Les trois assumés sont confirmés** : 飲む (D0189, collocation 薬を飲む fondée sur la fiche de 薬) ; カップ (D0204, renvoi à コップ fondé sur la fiche de コップ) ; コップ (D0206, renvoi à カップ fondé sur la fiche de カップ). **Les écarts de ナイフ et de 辛い sont conservés** : D0214 et D0195 n\'apportent pas de fondement source suffisant.');
P('- **料理 sens 1** : sourcé, la formation 料理する étant explicitement établie. **コーヒー (V2-62)** : 喫茶店 retiré, カフェ conservé (ancien exemple). **まずい et 甘い sens 2 (V2-67, V2-69)** : exemples japonais construits retirés, sans rouvrir les sens ni leurs verdicts antérieurs. **水 (V2-71)** : おゆ conservé ; ni お湯 ni お水 sans appui source. Les autres corrections V2-57 à V2-71 sont confirmées, y compris les trois retraits complets de nuance.');
P('- **Réserve de fidélité sémantique, hors périmètre** : la nuance de カップ réduit le récipient à une tasse « à anse », alors que sa fiche décrit une tasse avec ou sans anse. **Elle n\'est pas corrigée ici.**');
P('- **Liste globale : 86 corrections (10 + 5 + 71), toutes non appliquées. Restent 203 nuances** (lot 03 : 14 ; tranches 4 à 8 : 189), plus les 2 hors JLPT suivies à part ; 377 candidats et 147 arbitrages du volet 2 inchangés.');
P();
P('**Statut d\'origine (proposition)** : *proposition, non arbitrée.* Périmètre de la tranche 3 arbitré le 2026-10-10 (ChatGPT, par délégation) : 36 nuances, livrées par lot ; ce rapport porte sur les **22 nuances du lot 02** (« Alimentation, boissons, repas et table ») ; le lot 03 (14) suivra son arbitrage. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n\'est modifié ; aucune correction n\'est appliquée ; aucun verdict antérieur n\'est rouvert ; les verdicts de catégorie et de type du volet 2 ne le sont pas. **Le texte français des nuances est hors périmètre**, sauf là où une correction doit en garder une partie.');
P();
P('## N1. Résultat proposé');
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
P('- **Le verdict « assumé » apparaît pour la première fois** (défini au périmètre du lot 2, §6 : une décision de journal dit l\'origine, et cette origine se vérifie). Trois nuances : 飲む (D0189 ; la collocation 薬を飲む est écrite dans l\'exemple de la fiche de 薬) ; カップ et コップ (D0204 et D0206 ; chaque renvoi se fonde sur la fiche de l\'autre mot). **La ligne de partage** : une décision dont le fondement se vérifie dans les sources figées assume ; une décision dont le fondement n\'est dans aucune source n\'assume pas (D0321, D0081, D0083 ; ici D0214 pour 包丁, D0195 pour つらい).');
P('- **Les décisions qui nomment une expression pour fonder un découpage ne la sourcent pas** : D0196 (まずいことになった), D0190 et D0193 (子供に甘い, 考えが甘い) établissent un sens attesté par la fiche ; la chaîne japonaise, elle, ne l\'est pas.');
P('- **Le mot sans son préfixe** est sourcé quand la fiche isole elle-même le préfixe (弁当, 皿), comme 達 dans 友達 ; un composé ajouté (駅弁) ne l\'est pas.');
P(`- **${ec.filter((c) => F[c].k === RETIREE).length} nuances seraient retirées** (${ec.filter((c) => F[c].k === RETIREE).map(motDe).join(', ')}) : leur seul contenu est l'élément non sourcé.`);
P('- **Comparables tenus ensemble** : カップ et コップ (assumés tous deux) ; 箸 / 橋 (écart des deux côtés : la fiche de 橋 nommait les baguettes sans écrire 箸, celle de 箸 ne nomme pas le pont) ; 飴 / 雨 (sourcé ici : la fiche de 飴 écrit 雨, alors que celle de 雨 ne citait pas 飴).');
P();
P('## N2. Critères appliqués');
P();
P('Les critères arbitrés le 2026-10-08 et les précédents de la tranche 1, du bloc 1 bis et de la tranche 2, sans changement : forme du dictionnaire d\'un exemple de la fiche, retrait de mots compris (critère 1) ; renvoi appuyé par la fiche examinée ou par une décision validée **au fondement vérifiable** (critère 2) ; forme honorifique non sourcée d\'office (critère 3) ; graphie attestée pour le mot par la fiche ou sa fiche fusionnée, jamais déduite par analogie ; transcription en kana d\'un romaji attesté recevable, sans permettre l\'ajout d\'un kanji ; information française attestée préservée quand un exemple construit est retiré. **Verdict « assumé »** : la décision validée dit l\'origine de l\'élément, et cette origine se vérifie dans les sources figées (fiche examinée ou fiche d\'une autre ENTRY que la décision cite).');
P();
P('## N3. Corrections proposées');
P();
P(`**Aucune n'est exécutée.** Elles prennent la suite des numéros V2 (V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}) ; elles ne rejoindront la liste consolidée qu'après arbitrage, à part des 71 déjà retenues. Les unités assumées ou sourcées n'ont pas de correction.`);
P();
P('| # | Unité | Mot | Famille | Correction proposée |');
P('|---|---|---|---|---|');
for (const c of ec) P(`| V2-${NUM.get(c)} | \`${c}\` | ${motDe(c)} | ${F[c].f} | ${F[c].k} |`);
P();
P(`## N4. Les ${unites.length} fiches de provenance`);
P();
P('Les furigana des fiches sont rendus entre crochets : 皿[さら].');
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
P('## N5. Complétude et décompte');
P();
P('Calculé par `a2-05-travail/audit-v1-lot2-t3-lot02.mjs`, qui écrit ce rapport et s\'arrête au premier écart de contrôle.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P(`| Les fiches sont exactement le lot 02 de la tranche 3 arbitrée | oui : ${unites.length} nuances distinctes, ${new Set(bloc.map((u) => u.entree)).size} ENTRY ; le lot 03 (14) n'est pas lu |`);
P(`| Composition | ${bloc.filter((u) => u.statut === 'à examiner').length} à examiner, ${bloc.filter((u) => u.statut === 'faux positif à contre-vérifier').length} faux positifs présumés, ${bloc.filter((u) => u.statut === 'un caractère seulement').length} à caractère isolé seulement |`);
P(`| Verdicts proposés | ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; total ${unites.length} |`);
P(`| Un écart a une famille et une correction proposée, et seulement lui | oui : V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length}, à la suite de V2-56 |`);
P(`| Volet 2 recompté | 147 fiches : L ${tot2.L}, F ${tot2.F}, C ${tot2.C}, N ${tot2.N} ; inchangé ; ${bloc.filter((u) => u.dans147.length).length} nuances portent sur un sens des 147, non rouvert |`);
P(`| Candidats du volet 1 (axes C1 à C10) | 377, inchangé : ${bloc.filter((u) => u.candidats377.length).length} nuances portent sur un candidat, qui le reste |`);
P(`| Verdicts arbitrés (2026-10-10) | ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; les ${unites.length} confirmés |`);
P('| Corrections retenues | avant l\'arbitrage : 71 ; après : **86 (10 + 5 + 71)**, aucune appliquée |');
P(`| **Décompte du chantier** | ${RESTE_AVANT} nuances restaient à lire ; **${unites.length} sont contrôlées dans ce lot** ; **${RESTE_AVANT - unites.length} restent** : tranche 3, lot 03, 14 ; tranches 4 à 8, 189. Les 2 nuances hors JLPT restent comptées à part. |`);
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t3-lot02.md'), md);
console.log(`lot 02 : ${src.length} sourcés, ${ass.length} assumés, ${ec.length} écarts ; V2-${DERNIER_V2 + 1} à V2-${DERNIER_V2 + ec.length} ; reste ${RESTE_AVANT - unites.length}`);
