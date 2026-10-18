// A2-05 · volet 1 · lot 3 : périmètre opérationnel de la livraison B9 (`etre_humain`, première partie).
// Lecture seule ; n'ouvre aucune fiche source ; ne juge aucun sens et ne décide rien.
// Usage : node perimetre-v1-lot3-B9.mjs <racine du dépôt>   (écrit docs/rapports/etape2-A2-05-volet1-lot3-B9-perimetre.md)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// L'arbitrage se renseigne ici, après la relecture : { date, texte: [...] }
const ARBITRAGE = { date: '2026-10-18', texte: [
  "Arbitrage du 2026-10-18 (ChatGPT, par délégation ; relayé par l'utilisateur).",
  '',
  "**Le périmètre opérationnel de B9 est accepté, sans ajout ni retrait : dix sens dans neuf ENTRY** (`v_8_s1` 温かい, `v_9_s1` 疲れる, `v_10_s1` 面白い, `v_11_s2` おじいさん, `v_13_s2` おばあさん, `v_28_s1` 大人, `v_31_s1` 子供, `v_39_s1` 男の子, `v_49_s1` et `v_49_s2` 寝る). Les trois groupes, l'axe C1, les règles C1-a, C1-b, C1-f et C1-h et les comparables recensés sont retenus. La proposition est conservée ci-dessous, telle qu'elle a été livrée.",
  '',
  "**Audit autorisé : B9 seule.** Pour chacun des dix sens : lire intégralement sa fiche source, traductions, nuances, exemples et anciens exemples ; consulter les décisions validées applicables à son ENTRY ; contrôler séparément catégorie, niveau, `semantic_type`, fonctions linguistiques, dimensions, tags, relations, particules et `counter` ; motiver chaque verdict, y compris les conformités ; n'ajouter aucun sens, lecture, graphie ou emploi par connaissance externe ; ne pas arbitrer les comparables.",
  '',
  "**Vigilances particulières** : préserver la distinction entre les sens d'âge et de parenté ; examiner séparément les deux sens de 寝る, sans rouvrir D1243 ; préserver la fusion 温かい / 暖かい ; justifier `processus` pour 疲れる selon D1250 ; ne pas rouvrir la correction de lecture D0830 de 大人 ; maintenir les décisions antérieures et la correction V2-38 de 子供, non appliquée.",
  '',
  "L'audit est livré **en proposition**, selon la procédure actuelle ; B10 n'est pas préparée. **Restent fermés** : QC-1, QC-2, HP-1 à HP-4, G1 à G7, le bloc F, E5, le balayage des relations et l'application des corrections. Les décomptes restent à 138 sur 377, 69 sur 148 et 185 corrections dans 165 ENTRY jusqu'à l'arbitrage de B9."
] };

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const LF = String.fromCharCode(10);
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, LF);
const read = (p) => JSON.parse(txt(p));
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
const DATE = '2026-10-18';
const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
const tous = new Map(vocab.flatMap((e) => e.senses.map((s) => [s.id, { e, s }])));
const candidats = new Map(read('a2-05-travail/criblage/resultat.json').candidats.map((c) => [c.id, c]));
const journal = read('reconstruction/a2-04/journal.json');
const perimetre = txt(R + 'perimetre.md');
const bilanV2 = txt('docs/rapports/etape2-A2-05-bilan-volet2.md');
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fonctions = (s) => { const f = [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])]; return f.length ? f.map((y) => '`' + y + '`').join(', ') : 'aucune'; };
const lignes = [...perimetre.matchAll(/^\| \d+ \| ([A-F]\d+) \| `((?:hj_)?v_\d+_s\d+)` \|.*$/gm)].map((m) => ({ l: m[1], id: m[2], cells: m[0].split('|').map((x) => x.trim()) }));
if (lignes.length !== 377 || new Set(lignes.map((x) => x.id)).size !== 377) throw new Error('périmètre : 377 candidats distincts attendus');
const livraison = new Map(lignes.map((x) => [x.id, x.l]));
const fiches147 = [...txt('docs/rapports/etape2-A2-05-audit-null.md').matchAll(/^#### `((?:hj_)?v_\d+_s\d+)` /gm)].map((m) => m[1]);
const les147 = new Set(fiches147); if (fiches147.length !== 147) throw new Error('les 147 : ' + fiches147.length + ' fiches lues');
const arbitre = (p) => /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt(p));
const ARB = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'];
for (const l of ARB) if (!arbitre(R + l + '.md')) throw new Error(l + ' ne porte pas son arbitrage');
if (!txt(R + 'blocA-bilan.md').includes('le bloc A est clos documentairement')) throw new Error('le bloc A n\'est pas clos');
const L = 'B9';
const etat = (id) => { const l = livraison.get(id); if (l) return ARB.includes(l) ? l + ' (arbitrée)' : l === L ? '**' + L + '**' : l + ' (non arbitrée)'; if (les147.has(id)) return 'volet 2 (147, arbitré)'; return 'hors des 377 et des 147'; };
const regleDef = new Map([...perimetre.matchAll(/^\| (C\d+-[a-z0]) \| ([^|]+) \| \d+ \|$/gm)].map((m) => [m[1], m[2].trim()]));
const arbitres = lignes.filter((x) => ARB.includes(x.l)).length;
if (arbitres !== 138) throw new Error('138 sens arbitrés attendus, lus ' + arbitres);
const blocB = lignes.filter((x) => x.l[0] === 'B'); const blocBArb = blocB.filter((x) => ARB.includes(x.l)).length;
if (blocB.length !== 148 || blocBArb !== 69) throw new Error('bloc B : 148 sens dont 69 arbitrés attendus');

const SEL = lignes.filter((x) => x.l === L);
if (SEL.length !== 10 || new Set(SEL.map((x) => x.id.replace(/_s\d+$/, ''))).size !== 9) throw new Error(L + ' : 10 sens dans 9 ENTRY attendus');
const fiches = SEL.map((x) => { const t = tous.get(x.id); const c = candidats.get(x.id); if (!t || !c || les147.has(x.id)) throw new Error(x.id + ' : hors des données, hors du criblage, ou dans les 147'); return { ...x, ...t, c, dec: journal.filter((d) => d.entry === 'n5_' + t.e.id) }; });
for (const f of fiches) if (f.dec.some((d) => d.status !== 'validated')) throw new Error(f.id + ' : décision non validée');
const regles = [...new Set(fiches.flatMap((f) => f.c.regles.map((g) => g.regle)))].sort();
for (const g of regles) if (!regleDef.has(g)) throw new Error('règle ' + g + ' : définition introuvable');
const axes = [...new Set(fiches.flatMap((f) => f.c.regles.map((g) => g.axe)))].sort();
const cites = new Map(); for (const f of fiches) for (const g of f.c.regles) for (const m of g.detail.matchAll(/(?:hj_)?v_\d+_s\d+/g)) if (m[0] !== f.id && tous.has(m[0])) { if (!cites.has(m[0])) cites.set(m[0], new Set()); cites.get(m[0]).add(f.e.word); }
const cle = (s) => s.category.level_1 + ' › ' + s.category.level_2;
const cles = [...new Set(fiches.map((f) => cle(f.s)))];
const memes = [...tous.values()].filter(({ s }) => s.category && cles.includes(cle(s)));
const autresLiv = [...new Set([...memes.map(({ s }) => s.id), ...cites.keys()])].filter((id) => livraison.has(id) && livraison.get(id) !== L);
const autresSens = fiches.flatMap((f) => f.e.senses.filter((y) => y !== f.s).map((y) => ({ f, y })));
const corr = (eid) => bilanV2.split(LF).filter((l) => /^\| V[12]-\d+ \|/.test(l) && (l.includes('`' + eid + '`') || l.includes('`' + eid + '_'))).map((l) => l.split('|')[1].trim());
const corrSel = [...new Set(fiches.flatMap((f) => corr(f.e.id)))];
// Vérifications hors périmètre (ひらがな, 漢字, 右, 左) : aucune ne doit être parmi les comparables ; bloc F : les comparables qui en relèvent
const hp = memes.filter(({ e }) => ['ひらがな', '漢字', '右', '左'].includes(e.word)).length;
const blocF = autresLiv.filter((id) => livraison.get(id)[0] === 'F');
for (const id of blocF) if (!fonctions(tous.get(id).s).includes('`interrogatif`')) throw new Error(id + ' : sens du bloc F sans `interrogatif`');
if (blocF.length) throw new Error('bloc F parmi les comparables : ' + blocF.join());

const P = [];
P.push('# Étape 2 · A2-05 · Volet 1 · Lot 3 — périmètre opérationnel de la livraison B9 : être humain (première partie)', '');
P.push('**Date** : ' + DATE);
P.push(ARBITRAGE ? "**Statut** : **périmètre accepté le " + ARBITRAGE.date + " (§0).** La proposition est conservée telle qu'elle a été livrée." : "**Statut** : **proposition de périmètre opérationnel, non arbitrée.** Écrit par `a2-05-travail/perimetre-v1-lot3-B9.mjs`, à partir du périmètre arbitré du lot 3, du résultat du criblage, de l'état publié, du journal et des listes du bilan du volet 2. **Aucune fiche source n'est ouverte, aucun sens n'est jugé, aucune décision lexicale n'est prise.** Le périmètre global des 377 candidats et le découpage du lot 3 ne sont pas modifiés. Aucune donnée publiée, aucune fiche source, aucun lot, aucun journal, aucun registre, aucun outil du dépôt, aucun test ni aucun snapshot n'est modifié.");
P.push('', "**Autorisation** : arbitrage de B8, du 2026-10-18 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Prochaine action autorisée : préparer uniquement le périmètre opérationnel de B9. Présenter les sens encore disponibles, leur thème et leur regroupement, les axes et règles du criblage, les comparables, les décisions antérieures et les risques spécifiques. Ne réaliser aucun audit lexical B9 ni aucune décision sur ses sens avant acceptation explicite du périmètre. »", '');
if (ARBITRAGE) P.push('## 0. Arbitrage', '', ...ARBITRAGE.texte, '');
P.push('## 1. Où se place B9', '');
P.push("**Lot 3 : " + arbitres + " sens arbitrés sur 377 ; " + (377 - arbitres) + " restent.** Le bloc A (69 sens) est clos documentairement ; B1 (12 sens), B2 (8 sens), B3 (7 sens), B4 (9 sens), B5 (8 sens), B6 (9 sens), B7 (9 sens) et B8 (7 sens) sont arbitrées. **Bloc B : " + blocBArb + " sens arbitrés sur " + blocB.length + ", " + (blocB.length - blocBArb) + " restent**, dans les livraisons B9 à B16. B9 ouvre le domaine `etre_humain`, que B10 et B11 poursuivent ; l'examen de `espace_proprietes_spatiales` dans le bloc B est terminé (B6 à B8, arbitrées).", '');
P.push('## 2. Les dix sens de B9', '');
P.push("**Thème et regroupement** : l'être humain, première partie, en trois groupes : les âges de la vie et les personnes (おじいさん sens 2, おばあさん sens 2, 大人, 子供 sens 1, 男の子) ; les états et besoins physiques et les sensations (疲れる, 寝る sens 1 et sens 2, 温かい) ; l'esprit (面白い). **Dix sens, neuf ENTRY** (寝る porte deux sens de B9), des lots " + [...new Set(fiches.map((f) => String(f.c.lot).padStart(2, '0')))].sort().join(', ') + " ; ce sont exactement les lignes B9 du périmètre arbitré (contrôle du script).", '');
P.push("| N° | Sens | Mot | Traduction | Classe | Lot | Catégorie publiée | Type publié | Fonctions | Tags de l'ENTRY | Règles du criblage |", '|---|---|---|---|---|---|---|---|---|---|---|');
fiches.forEach((f, i) => P.push('| ' + (i + 1) + ' | `' + f.id + '` | ' + f.e.word + ' | ' + f.s.meaning.primary + ' | ' + f.e.linguistic.grammatical_class + ' | ' + String(f.c.lot).padStart(2, '0') + ' | `' + cat(f.s.category) + '` | `' + f.s.semantic_type + '` | ' + fonctions(f.s) + ' | ' + (f.e.tags?.length ? f.e.tags.join(', ') : 'aucun') + ' | ' + f.c.regles.map((g) => g.regle).join(', ') + ' |'));
P.push('', '## 3. Axes et règles à vérifier', '');
P.push("**Axes concernés** : " + axes.join(', ') + ". **" + regles.length + " règles** désignent ces dix sens ; aucun n'est désigné par un autre axe de C1 à C10, ni par un point réservé (contrôle du script, sur le résultat du criblage). L'examen relira néanmoins, pour chacun, la catégorie, le type, les fonctions, les dimensions, les tags, les relations et les particules.", '', '| Règle | Détection (résumé du périmètre du lot 3, §2) | Sens de B9 désignés |', '|---|---|---|');
for (const g of regles) P.push('| ' + g + ' | ' + regleDef.get(g) + ' | ' + fiches.filter((f) => f.c.regles.some((y) => y.regle === g)).map((f) => f.e.word + (f.e.senses.length > 1 ? ' (s' + f.id.slice(-1) + ')' : '')).join(', ') + ' |');
P.push('', '**Ce que chaque règle a relevé, sens par sens** (texte du criblage, sans jugement) :', '');
for (const f of fiches) P.push('- **`' + f.id + '` ' + f.e.word + '** : ' + f.c.regles.map((g) => '`' + g.regle + '` — ' + g.detail).join(' ; ') + '.');
P.push('', "**Une règle du criblage désigne un rapprochement ; elle ne dit pas qu'il y a un écart.** Comme en B1 à B8 : une coïncidence de traduction ne prouve pas une identité de sens, et une « famille source » est un rangement de l'ancienne application, non une norme.", '');
P.push('## 4. Comparables', '');
P.push("**Un comparable sert de contrôle, non de source** : aucun verdict n'en sera déduit, et les comparables ne sont pas arbitrés par l'examen de B9.", '');
P.push('**4.1 Les sens que les règles nomment** (' + cites.size + ') :', '', '| Sens | Mot | Traduction | Catégorie publiée | Type publié | Nommé à propos de | État |', '|---|---|---|---|---|---|---|');
for (const [id, par] of cites) { const { e, s } = tous.get(id); P.push('| `' + id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | `' + cat(s.category) + '` | `' + s.semantic_type + '` | ' + [...par].join(', ') + ' | ' + etat(id) + ' |'); }
P.push('', '**4.2 Les sens publiés des mêmes catégories de niveau 2** (' + memes.length + ', les dix de B9 compris) :', '', '| Sens | Mot | Traduction | Classe | Catégorie publiée | Type publié | État |', '|---|---|---|---|---|---|---|');
for (const { e, s } of memes) P.push('| `' + s.id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | ' + e.linguistic.grammatical_class + ' | `' + cat(s.category) + '` | `' + s.semantic_type + '` | ' + etat(s.id) + ' |');
P.push('', '## 5. Décisions antérieures', '');
P.push("Toutes les décisions de journal des neuf ENTRY, validées ; elles seront lues en entier à l'examen. **Aucune n'est rouverte par ce périmètre.**", '', '| ENTRY | Mot | Décisions (identifiant, nature, champ) |', '|---|---|---|');
for (const f of fiches.filter((x, i) => fiches.findIndex((y) => y.e.id === x.e.id) === i)) P.push('| `' + f.e.id + '` | ' + f.e.word + ' | ' + (f.dec.length ? f.dec.map((d) => d.id.replace('A2-04-', '') + ' (' + d.kind + ', ' + d.field + ')').join(' ; ') : '**aucune**') + ' |');
P.push('', '**Déjà arbitré sur ces ENTRY, non rouvert** :', '', '| Sens | Mot | Provenance des nuances (lot 2, clos) | Corrections retenues, non appliquées, sur l\'ENTRY |', '|---|---|---|---|');
for (const f of fiches) { const k = corr(f.e.id); P.push('| `' + f.id + '` | ' + f.e.word + ' | ' + f.cells[11] + ' | ' + (k.length ? k.join(', ') : '—') + ' |'); }
P.push('', '## 6. Risques de chevauchement', '');
P.push("**6.1 Avec d'autres livraisons du lot 3.** " + autresLiv.length + " sens d'autres livraisons sont dans les mêmes catégories que B9 ou nommés par ses règles. Ils seront lus comme comparables, **sans être jugés** : ceux des livraisons arbitrées ne sont pas rejugés, les autres le seront dans leur propre livraison.", '', '| Sens | Mot | Traduction | Catégorie publiée | Livraison |', '|---|---|---|---|---|');
for (const id of autresLiv) { const { e, s } = tous.get(id); P.push('| `' + id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | `' + cat(s.category) + '` | ' + etat(id) + ' |'); }
P.push('', "**Risques spécifiques.** (1) **温かい (sens 1)** : la règle C1-a relève la même traduction principale « Chaud » pour 暑い (« Chaud (temps) », `monde_naturel › meteo`, B14) et 熱い (« Chaud (au toucher) », même catégorie, B10) ; une coïncidence de traduction ne prouve pas une identité de sens. L'ENTRY résulte de la fusion de 暖かい dans 温かい, validée au lot 17 (D1127, D1128 sur l'ENTRY retirée ; D1159, graphie 暖かい ; D1160, deux sens, un par fiche ; D1161, catégorie du sens 1 « comme 熱い et 冷たい ») : **la fusion n'est pas rouverte**, et le sens 2 (« Doux », météo, hors des 377) n'est pas examiné. 熱い, 冷たい (B10), 温い (B11) et 暑い (B14) ne sont pas anticipés. (2) **おじいさん (sens 2), おばあさん (sens 2) et 子供 (sens 1)** : la règle C1-b relève qu'ils sont dans `etre_humain` alors que leur famille source « personnes_famille / famille » est surtout en `relations_sociales` (23 sur 28) ; leurs ENTRY ont chacune un sens de parenté, en `relations_sociales`, et un sens d'âge (D0075, D0076, D0088 : « le lien de parenté, et un homme âgé quelconque », « une personne jeune […] et un descendant ») ; une famille source n'est pas une norme ; les sens de parenté ne sont pas examinés, 子供 sens 2 (D1) n'est pas anticipé, et la correction de provenance V2-38 (nuance de l'ENTRY de 子供) n'est pas rouverte. (3) **大人 et 男の子** : la règle C1-f relève des catégories (`age_adulte`, `enfance`) dont la moitié des sens est déjà candidate ; おじさん et おばさん, sens 2 (D1), et 女の子 (B11) ne sont pas anticipés ; la lecture de 大人 a été corrigée en 5.13-C (D0830, addendum A8, liste fermée) : **les lectures ne relèvent pas de cet examen** et D0830 n'est pas rouverte. (4) **寝る, deux sens dans la même livraison** : « Dormir » (`etat`) et « Se coucher » (`action`), tous deux en `sommeil_repos` ; D1243 les distingue sur la fiche entière, selon l'arbitrage du lot 19 (« Dormir » n'est pas rabattu sur un état résultant ; « Dormir » est un `etat`) ; l'examen ne rouvrira pas ce découpage ; la règle C1-h rapproche le sens 2 de 磨く « Brosser », sans catégorie (volet 2, arbitré) : aucune catégorie nulle n'en est déduite ; 起きる (deux sens) et 休む (B11) ne sont pas anticipés. (5) **疲れる** : `processus`, choix arbitré au lot 19 (D1250 : « Être fatigué » est l'état qui en résulte, conservé en nuance) ; la règle C1-f le rapproche de 元気 (B10), non anticipé. (6) **面白い (sens 1)** : D0007 distingue « ce qui captive l'esprit » et « ce qui divertit » ; le sens 2 (« Amusant », `emotions_sentiments`, hors des 377) n'est pas examiné ; つまらない (B10), de la même catégorie, n'est pas anticipé. (7) **Les comparables du même domaine** : B10 et B11 portent la suite d'`etre_humain` ; leurs sens, et ceux de D1, D4 et E1 dans les mêmes catégories, sont lus comme comparables, **sans être jugés** ; aucun n'appartient au bloc F.", '');
P.push("**6.2 Avec les autres sens des mêmes ENTRY.** Ils restent hors du périmètre, quel que soit leur état :", '', '| Sens de B9 | Autre sens | Traduction | Catégorie | Type | État |', '|---|---|---|---|---|---|');
for (const { f, y } of autresSens) P.push('| `' + f.id + '` ' + f.e.word + ' | `' + y.id + '` | ' + y.meaning.primary + ' | `' + cat(y.category) + '` | `' + y.semantic_type + '` | ' + etat(y.id) + ' |');
{ const prov = corrSel.filter((k) => k.startsWith('V2')), v1 = corrSel.filter((k) => k.startsWith('V1')); const parts = []; if (prov.length) parts.push(prov.length + " de provenance (" + prov.join(', ') + "), qui vise" + (prov.length > 1 ? 'nt' : '') + " des nuances d'ENTRY"); if (v1.length) parts.push(v1.length + " du volet 1 (" + v1.join(', ') + ")"); P.push('', "**6.3 Avec les corrections déjà retenues.** " + (corrSel.length ? corrSel.length + " correction" + (corrSel.length > 1 ? 's' : '') + " retenue" + (corrSel.length > 1 ? 's' : '') + ", non appliquée" + (corrSel.length > 1 ? 's' : '') + ", porte" + (corrSel.length > 1 ? 'nt' : '') + " sur ces ENTRY (§5) : " + parts.join(' ; ') + ". " + (corrSel.length > 1 ? 'Elles ne seront ni rouvertes ni appliquées' : 'Elle ne sera ni rouverte ni appliquée') + ", et un constat qui " + (corrSel.length > 1 ? 'les' : 'la') + " toucherait serait signalé sans correction nouvelle." : "Aucune correction retenue ne porte sur ces ENTRY."), ''); }
P.push("**6.4 Avec les vérifications hors périmètre, QC-1 et QC-2, le bloc F et les décisions antérieures.** Aucun des dix sens ni aucun comparable n'est concerné par HP-1 à HP-4 (ひらがな, 漢字, 右, 左 ; contrôle du script : " + hp + " parmi les comparables), ni par QC-1 (la photographie) ni par QC-2 (la lumière d'un lieu). **Aucun comparable ne relève du bloc F** (contrôle du script). Aucun des dix sens ne porte de fonction. **Décisions antérieures** : 温かい porte des décisions de graphie, de sens et de catégorie issues de la fusion du lot 17 (D1159 à D1162) ; 寝る une décision de sens (D1243) ; 疲れる, 面白い, おじいさん, おばあさん et 子供 une décision de sens chacun (D1250, D0007, D0075, D0076, D0088) ; 大人 un abandon et une correction de lecture (D0089, D0830) ; 男の子 un abandon (D0090) ; toutes seront lues, aucune n'est rouverte. **Corrections déjà retenues** : V2-38 (子供, §6.3). **Règles C1-a, C1-b et C1-f** : elles désignent des sens par une coïncidence de traduction, la composition d'une famille source ou d'une catégorie, non par un défaut constaté ; **règle C1-h** : elle rapproche 寝る (sens 2) d'un sens sans catégorie arbitré au volet 2, sans qu'aucune catégorie nulle en soit déduite.", '');
P.push('## 7. Limites', '');
for (const l of ["**Dix sens, et eux seuls.** Aucun autre sens n'est jugé, même comparable, même de la même ENTRY.", "**La fiche source décide.** Chaque fiche sera lue en entier, avec toutes les décisions de l'ENTRY ; rien n'est ajouté par connaissance externe.", "**Aucune symétrie n'est imposée** entre comparables ; une divergence n'est un écart que si une norme la tranche.", "**Une catégorie n'est pas cherchée pour réduire un compte** ; `category: null` (A5) et `semantic_type: null` (A6) restent légitimes.", "**Rien n'est appliqué** ; une correction proposée ne serait retenue que par l'arbitrage.", "**Ne sont pas ouverts** : l'examen lexical de B9 avant l'acceptation de ce périmètre ; les autres livraisons ; le bloc F et la recherche d'omissions (E5 ni adopté ni appliqué) ; HP-1 à HP-4 ; QC-1 et QC-2 ; G1 à G7 ; le balayage des relations."]) P.push('- ' + l);
P.push('', '## 8. Questions', '');
for (const [i, q] of ["Le périmètre de B9 (les dix sens du §2) est-il confirmé, sans ajout ni retrait ?", "Les axes (§3), les comparables (§4) et les risques de chevauchement (§6) conviennent-ils ?", "L'autorisation d'examiner **B9, seule**."].entries()) P.push((i + 1) + '. ' + q);
const t = P.join(LF) + LF; if (/ +$/m.test(t)) throw new Error('espace en fin de ligne');
writeFileSync(join(root, R + 'B9-perimetre.md'), t);
console.log('B9 : ' + fiches.length + ' sens ; règles : ' + regles.join(', ') + ' ; axes : ' + axes.join(', ') + ' ; nommés par les règles : ' + cites.size + ' ; mêmes catégories : ' + memes.length + ' ; autres livraisons concernées : ' + autresLiv.length + ' ; autres sens des ENTRY : ' + autresSens.length + ' ; corrections sur ces ENTRY : ' + corrSel.length + ' ; HP dans les comparables : ' + hp + ' ; bloc F parmi les comparables : ' + blocF.join() + ' ; lot 3 : ' + arbitres + ' arbitrés ; bloc B : ' + blocBArb + '/' + blocB.length);
