// A2-05 · volet 1 · lot 3 : périmètre opérationnel de la livraison B6 (`espace_proprietes_spatiales`).
// Lecture seule ; n'ouvre aucune fiche source ; ne juge aucun sens et ne décide rien.
// Usage : node perimetre-v1-lot3-B6.mjs <racine du dépôt>   (écrit docs/rapports/etape2-A2-05-volet1-lot3-B6-perimetre.md)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// L'arbitrage se renseigne ici, après la relecture : { date, texte: [...] }
const ARBITRAGE = { date: '2026-10-16', texte: [
  "Arbitrage du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur).",
  '',
  "**Le périmètre opérationnel de B6 est accepté, sans ajout ni retrait : neuf sens** (`v_53_s1` 歩く, `v_63_s1` 降りる, `v_150_s1` 出かける, `v_152_s1` 来る, `v_156_s1` 行く, `v_157_s1` 走る, `v_160_s1` 飛ぶ, `v_188_s1` 高い sens 1, `v_213_s1` 入る). L'axe C1, les règles C1-g et C1-h, les trois comparables nommés, les 32 sens des mêmes catégories de niveau 2 et les risques documentés sont retenus. La proposition est conservée ci-dessous, telle qu'elle a été livrée.",
  '',
  "**Audit autorisé : B6 seule.** Pour chacun des neuf sens : lire intégralement la fiche source et toutes les décisions validées de l'ENTRY ; vérifier séparément la catégorie, le `semantic_type`, les fonctions linguistiques, les dimensions, les tags, les relations et les particules ; motiver chaque verdict, conformité comprise ; examiner particulièrement les différences entre niveaux 2 et 3 des catégories spatiales ; ne pas déduire une catégorie nulle de la seule comparaison avec 座る, 立つ et 出る (sens 2) ; ne rien ajouter par connaissance externe ; ne pas anticiper les verdicts de B7, B8 ou E2, ni rouvrir 高い (sens 2) ; préserver les décisions et corrections de provenance antérieures.",
  '',
  "**Restent fermés** : B7, B8, QC-1, QC-2, HP-1 à HP-4, G1 à G7, le bloc F, E5, le balayage global des relations et l'application des 183 corrections. Les décomptes restent à 113 sur 377 et 44 sur 148 tant que les verdicts de B6 ne sont pas arbitrés."
] };

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const LF = String.fromCharCode(10);
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, LF);
const read = (p) => JSON.parse(txt(p));
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
const DATE = '2026-10-16';
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
const ARB = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'B1', 'B2', 'B3', 'B4', 'B5'];
for (const l of ARB) if (!arbitre(R + l + '.md')) throw new Error(l + ' ne porte pas son arbitrage');
if (!txt(R + 'blocA-bilan.md').includes('le bloc A est clos documentairement')) throw new Error('le bloc A n\'est pas clos');
const L = 'B6';
const etat = (id) => { const l = livraison.get(id); if (l) return ARB.includes(l) ? l + ' (arbitrée)' : l === L ? '**' + L + '**' : l + ' (non arbitrée)'; if (les147.has(id)) return 'volet 2 (147, arbitré)'; return 'hors des 377 et des 147'; };
const regleDef = new Map([...perimetre.matchAll(/^\| (C\d+-[a-z0]) \| ([^|]+) \| \d+ \|$/gm)].map((m) => [m[1], m[2].trim()]));
const arbitres = lignes.filter((x) => ARB.includes(x.l)).length;
if (arbitres !== 113) throw new Error('113 sens arbitrés attendus, lus ' + arbitres);
const blocB = lignes.filter((x) => x.l[0] === 'B'); const blocBArb = blocB.filter((x) => ARB.includes(x.l)).length;
if (blocB.length !== 148 || blocBArb !== 44) throw new Error('bloc B : 148 sens dont 44 arbitrés attendus');

const SEL = lignes.filter((x) => x.l === L);
if (SEL.length !== 9 || new Set(SEL.map((x) => x.id.replace(/_s\d+$/, ''))).size !== 9) throw new Error(L + ' : 9 sens dans 9 ENTRY attendus');
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
P.push('# Étape 2 · A2-05 · Volet 1 · Lot 3 — périmètre opérationnel de la livraison B6 : espace et propriétés spatiales', '');
P.push('**Date** : ' + DATE);
P.push(ARBITRAGE ? "**Statut** : **périmètre accepté le " + ARBITRAGE.date + " (§0).** La proposition est conservée telle qu'elle a été livrée." : "**Statut** : **proposition de périmètre opérationnel, non arbitrée.** Écrit par `a2-05-travail/perimetre-v1-lot3-B6.mjs`, à partir du périmètre arbitré du lot 3, du résultat du criblage, de l'état publié, du journal et des listes du bilan du volet 2. **Aucune fiche source n'est ouverte, aucun sens n'est jugé, aucune décision lexicale n'est prise.** Le périmètre global des 377 candidats et le découpage du lot 3 ne sont pas modifiés. Aucune donnée publiée, aucune fiche source, aucun lot, aucun journal, aucun registre, aucun outil du dépôt, aucun test ni aucun snapshot n'est modifié.");
P.push('', "**Autorisation** : arbitrage de B5, du 2026-10-16 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Prochaine action autorisée : préparer uniquement le périmètre opérationnel de B6. Fournir les identifiants des sens restants retenus pour B6, leur thème, les axes et règles du criblage, les comparables, les décisions antérieures pertinentes, les chevauchements éventuels et les risques spécifiques. Ne procéder à aucun audit individuel de B6 avant acceptation explicite de son périmètre. »", '');
if (ARBITRAGE) P.push('## 0. Arbitrage', '', ...ARBITRAGE.texte, '');
P.push('## 1. Où se place B6', '');
P.push("**Lot 3 : " + arbitres + " sens arbitrés sur 377 ; " + (377 - arbitres) + " restent.** Le bloc A (69 sens) est clos documentairement ; B1 (12 sens), B2 (8 sens), B3 (7 sens), B4 (9 sens) et B5 (8 sens) sont arbitrées. **Bloc B : " + blocBArb + " sens arbitrés sur " + blocB.length + ", " + (blocB.length - blocBArb) + " restent**, dans les livraisons B6 à B16. B6 porte un seul domaine du découpage accepté : `espace_proprietes_spatiales`.", '');
P.push('## 2. Les neuf sens de B6', '');
P.push("**Thème** : l'espace : le mouvement et le déplacement (歩く, 走る, 飛ぶ ; 降りる ; 来る, 行く), l'entrée et la sortie (入る, 出かける), la dimension (高い sens 1). **Neuf sens, neuf ENTRY**, des lots " + [...new Set(fiches.map((f) => String(f.c.lot).padStart(2, '0')))].sort().join(', ') + " ; ce sont exactement les lignes B6 du périmètre arbitré (contrôle du script).", '');
P.push("| N° | Sens | Mot | Traduction | Classe | Lot | Catégorie publiée | Type publié | Fonctions | Tags de l'ENTRY | Règles du criblage |", '|---|---|---|---|---|---|---|---|---|---|---|');
fiches.forEach((f, i) => P.push('| ' + (i + 1) + ' | `' + f.id + '` | ' + f.e.word + ' | ' + f.s.meaning.primary + ' | ' + f.e.linguistic.grammatical_class + ' | ' + String(f.c.lot).padStart(2, '0') + ' | `' + cat(f.s.category) + '` | `' + f.s.semantic_type + '` | ' + fonctions(f.s) + ' | ' + (f.e.tags?.length ? f.e.tags.join(', ') : 'aucun') + ' | ' + f.c.regles.map((g) => g.regle).join(', ') + ' |'));
P.push('', '## 3. Axes et règles à vérifier', '');
P.push("**Axes concernés** : " + axes.join(', ') + ". **" + regles.length + " règles** désignent ces neuf sens ; aucun n'est désigné par un autre axe de C1 à C10, ni par un point réservé (contrôle du script, sur le résultat du criblage). L'examen relira néanmoins, pour chacun, la catégorie, le type, les fonctions, les dimensions, les tags, les relations et les particules.", '', '| Règle | Détection (résumé du périmètre du lot 3, §2) | Sens de B6 désignés |', '|---|---|---|');
for (const g of regles) P.push('| ' + g + ' | ' + regleDef.get(g) + ' | ' + fiches.filter((f) => f.c.regles.some((y) => y.regle === g)).map((f) => f.e.word + (f.e.senses.length > 1 ? ' (s' + f.id.slice(-1) + ')' : '')).join(', ') + ' |');
P.push('', '**Ce que chaque règle a relevé, sens par sens** (texte du criblage, sans jugement) :', '');
for (const f of fiches) P.push('- **`' + f.id + '` ' + f.e.word + '** : ' + f.c.regles.map((g) => '`' + g.regle + '` — ' + g.detail).join(' ; ') + '.');
P.push('', "**Une règle du criblage désigne un rapprochement ; elle ne dit pas qu'il y a un écart.** Comme en B1 à B5 : une coïncidence de traduction ne prouve pas une identité de sens, et une « famille source » est un rangement de l'ancienne application, non une norme.", '');
P.push('## 4. Comparables', '');
P.push("**Un comparable sert de contrôle, non de source** : aucun verdict n'en sera déduit, et les comparables ne sont pas arbitrés par l'examen de B6.", '');
P.push('**4.1 Les sens que les règles nomment** (' + cites.size + ') :', '', '| Sens | Mot | Traduction | Catégorie publiée | Type publié | Nommé à propos de | État |', '|---|---|---|---|---|---|---|');
for (const [id, par] of cites) { const { e, s } = tous.get(id); P.push('| `' + id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | `' + cat(s.category) + '` | `' + s.semantic_type + '` | ' + [...par].join(', ') + ' | ' + etat(id) + ' |'); }
P.push('', '**4.2 Les sens publiés des mêmes catégories de niveau 2** (' + memes.length + ', les neuf de B6 compris) :', '', '| Sens | Mot | Traduction | Classe | Catégorie publiée | Type publié | État |', '|---|---|---|---|---|---|---|');
for (const { e, s } of memes) P.push('| `' + s.id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | ' + e.linguistic.grammatical_class + ' | `' + cat(s.category) + '` | `' + s.semantic_type + '` | ' + etat(s.id) + ' |');
P.push('', '## 5. Décisions antérieures', '');
P.push("Toutes les décisions de journal des neuf ENTRY, validées ; elles seront lues en entier à l'examen. **Aucune n'est rouverte par ce périmètre.**", '', '| ENTRY | Mot | Décisions (identifiant, nature, champ) |', '|---|---|---|');
for (const f of fiches) P.push('| `' + f.e.id + '` | ' + f.e.word + ' | ' + (f.dec.length ? f.dec.map((d) => d.id.replace('A2-04-', '') + ' (' + d.kind + ', ' + d.field + ')').join(' ; ') : '**aucune**') + ' |');
P.push('', '**Déjà arbitré sur ces ENTRY, non rouvert** :', '', '| Sens | Mot | Provenance des nuances (lot 2, clos) | Corrections retenues, non appliquées, sur l\'ENTRY |', '|---|---|---|---|');
for (const f of fiches) { const k = corr(f.e.id); P.push('| `' + f.id + '` | ' + f.e.word + ' | ' + f.cells[11] + ' | ' + (k.length ? k.join(', ') : '—') + ' |'); }
P.push('', '## 6. Risques de chevauchement', '');
P.push("**6.1 Avec d'autres livraisons du lot 3.** " + autresLiv.length + " sens d'autres livraisons sont dans les mêmes catégories que B6 ou nommés par ses règles. Ils seront lus comme comparables, **sans être jugés** : ceux des livraisons arbitrées ne sont pas rejugés, les autres le seront dans leur propre livraison.", '', '| Sens | Mot | Traduction | Catégorie publiée | Livraison |', '|---|---|---|---|---|');
for (const id of autresLiv) { const { e, s } = tous.get(id); P.push('| `' + id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | `' + cat(s.category) + '` | ' + etat(id) + ' |'); }
P.push('', "**Risques spécifiques.** (1) **B7 et B8 portent la suite des verbes de l'espace** (登る, 上げる sens 2, 入れる, 出す sens 1, 帰る, 止まる ; 着く, 出る sens 1, et 縦) : ce sont les comparables les plus proches, non arbitrés ; aucun de leurs verdicts n'est anticipé, et aucune symétrie n'est imposée (entre 入る et 入れる, 出かける et 出る, 行く, 来る, 帰る et 着く). (2) **Le niveau de catégorie** : 歩く, 走る et 飛ぶ sont publiés au niveau 2 (`mouvement_deplacement`), 来る et 行く au niveau 3 (`aller_venir`), 降りる au niveau 3 (`monter_descendre`) ; l'examen dira, pour chacun, si une sous-catégorie d'A2-L3 le nomme, sans chercher une catégorie plus fine pour elle-même. 止まる (B7) porte `evenement` parmi des `action` : il n'est pas jugé ici. (3) **Les contraires et les paires** : 高い (sens 1) et 低い (E2), que la fiche de 高い nomme ; 行く et 来る ; 入る et 出る : **aucune relation n'est publiée entre ces sens** (contrôle fait sur l'état publié), et le balayage des relations n'est pas ouvert. (4) **高い** : son sens 2 (« Cher ») a été arbitré en B4, avec le constat sur la relation absente avec 安い ; il n'est pas rouvert. Les adjectifs de dimension d'E2 (厚い, 太い, 広い, 狭い, 短い, 細い, 薄い sens 1, 長い, 大きな) sont lus comme comparables, sans être jugés.", '');
P.push("**6.2 Avec les autres sens des mêmes ENTRY.** Ils restent hors du périmètre, quel que soit leur état :", '', '| Sens de B6 | Autre sens | Traduction | Catégorie | Type | État |', '|---|---|---|---|---|---|');
for (const { f, y } of autresSens) P.push('| `' + f.id + '` ' + f.e.word + ' | `' + y.id + '` | ' + y.meaning.primary + ' | `' + cat(y.category) + '` | `' + y.semantic_type + '` | ' + etat(y.id) + ' |');
P.push('', "**6.3 Avec les corrections déjà retenues.** " + (corrSel.length ? corrSel.length + " correction" + (corrSel.length > 1 ? 's' : '') + " de provenance porte" + (corrSel.length > 1 ? 'nt' : '') + " sur ces ENTRY (" + corrSel.join(', ') + " ; §5). Elles visent des nuances ; elles ne seront ni rouvertes ni appliquées, et un constat qui les toucherait serait signalé sans correction nouvelle." : "Aucune correction retenue ne porte sur ces ENTRY."), '');
P.push("**6.4 Avec les vérifications hors périmètre, QC-1 et QC-2, le bloc F et les décisions antérieures.** Aucun des neuf sens ni aucun comparable n'est concerné par HP-1 à HP-4 (ひらがな, 漢字, 右, 左 ; contrôle du script : " + hp + " parmi les comparables ; 右 et 左 sont dans `direction_orientation`, autre catégorie de niveau 2), ni par QC-1 (la photographie) ni par QC-2 (la lumière d'un lieu). **Le bloc F n'est touché par aucun comparable** (contrôle du script). Aucun des neuf sens ne porte de fonction. **Décisions antérieures** : **出かける n'a aucune décision de journal** : son examen reposera sur la fiche seule ; 降りる porte des décisions de tags et de graphie (D0347, D0348), 飛ぶ une correction de sens (D0354), 走る, 飛ぶ et 入る des décisions de sens (D0343, D0353, D0340), 高い les décisions de tags et de sens partagées avec son sens 2 (D0377, D0378) ; toutes seront lues, aucune n'est rouverte. **Règle C1-h** : elle rapproche huit verbes de mouvement de 座る, 立つ et 出る (sens 2, « Assister à »), sans catégorie, arbitrés au volet 2 ; une famille source n'est pas une norme.", '');
P.push('## 7. Limites', '');
for (const l of ["**Neuf sens, et eux seuls.** Aucun autre sens n'est jugé, même comparable, même de la même ENTRY.", "**La fiche source décide.** Chaque fiche sera lue en entier, avec toutes les décisions de l'ENTRY ; rien n'est ajouté par connaissance externe.", "**Aucune symétrie n'est imposée** entre comparables ; une divergence n'est un écart que si une norme la tranche.", "**Une catégorie n'est pas cherchée pour réduire un compte** ; `category: null` (A5) et `semantic_type: null` (A6) restent légitimes.", "**Rien n'est appliqué** ; une correction proposée ne serait retenue que par l'arbitrage.", "**Ne sont pas ouverts** : l'examen lexical de B6 avant l'acceptation de ce périmètre ; les autres livraisons ; le bloc F et la recherche d'omissions (E5 ni adopté ni appliqué) ; HP-1 à HP-4 ; QC-1 et QC-2 ; G1 à G7 ; le balayage des relations."]) P.push('- ' + l);
P.push('', '## 8. Questions', '');
for (const [i, q] of ["Le périmètre de B6 (les neuf sens du §2) est-il confirmé, sans ajout ni retrait ?", "Les axes (§3), les comparables (§4) et les risques de chevauchement (§6) conviennent-ils ?", "L'autorisation d'examiner **B6, seule**."].entries()) P.push((i + 1) + '. ' + q);
const t = P.join(LF) + LF; if (/ +$/m.test(t)) throw new Error('espace en fin de ligne');
writeFileSync(join(root, R + 'B6-perimetre.md'), t);
console.log('B6 : ' + fiches.length + ' sens ; règles : ' + regles.join(', ') + ' ; axes : ' + axes.join(', ') + ' ; nommés par les règles : ' + cites.size + ' ; mêmes catégories : ' + memes.length + ' ; autres livraisons concernées : ' + autresLiv.length + ' ; autres sens des ENTRY : ' + autresSens.length + ' ; corrections sur ces ENTRY : ' + corrSel.length + ' ; HP dans les comparables : ' + hp + ' ; bloc F parmi les comparables : ' + blocF.join() + ' ; lot 3 : ' + arbitres + ' arbitrés ; bloc B : ' + blocBArb + '/' + blocB.length);
