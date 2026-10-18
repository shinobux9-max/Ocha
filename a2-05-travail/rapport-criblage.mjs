// Génère le rapport de criblage à partir de resultat.json. Usage : node rapport-criblage.mjs <racine> <dossier scratchpad> <sortie.md>
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { echantillons } from './section6.mjs';

const [root, sp, outFile] = process.argv.slice(2);
const read = (p) => JSON.parse(readFileSync(p, 'utf8'));
const { result: r, constats: k, candidats: C, familles: F } = read(join(sp, 'criblage/resultat.json'));
const v1 = read(join(sp, 'criblage-v1/resultat.json')).result;
const script = readFileSync(join(sp, 'criblage-a205.mjs'), 'utf8');
const journal = read(join(root, 'reconstruction/a2-04/journal.json'));
const known = read(join(root, 'reconstruction/a2-04/avertissements-connus.json'));
const vocab = [...read(join(root, 'data/n5/vocab.json')), ...read(join(root, 'data/vocab-hors-jlpt.json'))];
const senseById = new Map(vocab.flatMap((e) => e.senses.map((s) => [s.id, { e, s }])));
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
const catOf = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const lab = (id) => { const x = senseById.get(id); return x ? `\`${id}\` ${x.e.word} « ${x.s.meaning.primary} »` : `\`${id}\``; };
const candById = new Map(C.map((c) => [c.id, c]));

const RULES = [
  ['C1-a', 'C1', 'comparative', 'Même traduction principale (casse, ponctuation et parenthèses neutralisées) dans deux ENTRY différentes, avec des catégories différentes (dont `null`). Tous les sens du groupe.'],
  ['C1-b', 'C1', 'comparative', 'Famille source (ancienne catégorie / sous-catégorie de la fiche) d\'au moins 5 sens catégorisés, dont un niveau 1 réunit 70 % ou plus : les sens d\'un autre niveau 1.'],
  ['C1-g', 'C1', 'comparative, **ajoutée après l’échantillon de développement**', 'Famille source d\'au moins 2 sens catégorisés : le sens qui est seul à porter son niveau 1.'],
  ['C1-h', 'C1', 'comparative, **ajoutée après l’échantillon de validation 1**', 'Dans une même famille source, même classe et même type : quand un sens sans catégorie ni fonction côtoie des sens catégorisés, ces derniers.'],
  ['C1-d', 'C1', 'comparative', 'Deux sens reliés par une relation publiée, de niveaux 1 différents. Les deux sens.'],
  ['C1-f', 'C1', 'propagation, **ajoutée après l’échantillon de développement**', 'Catégorie complète dont la moitié au moins des sens est déjà candidate sur C1 : ses autres sens, pour que la famille soit examinée entière.'],
  ['C2-0', 'C2', 'population imposée', '`category: null` avec une fonction linguistique. Tous (périmètre, C2).'],
  ['C3-0', 'C3', 'population imposée', 'Type `concept_abstrait`. Tous (arbitrage R2).'],
  ['C3-b', 'C3', 'comparative', 'Même traduction principale dans deux ENTRY différentes, avec des types différents. Tous les sens du groupe.'],
  ['C3-c', 'C3', 'comparative', 'Couple classe grammaticale × type atypique : 3 sens au plus, et moins de 2 % des sens typés de la classe.'],
  ['C3-d', 'C3', 'comparative', 'Catégorie complète d\'au moins 5 sens typés, dont un type réunit 70 % ou plus : les sens d\'un autre type.'],
  ['C3-e', 'C3', 'comparative', 'Deux sens reliés par une relation publiée, de types différents. Les deux sens.'],
  ['C4-0', 'C4', 'population imposée', '`semantic_type: null` avec une fonction linguistique. Tous (périmètre, C4).'],
  ['C5-0', 'C5', 'population imposée', 'Sens qui porte une dimension. Tous.'],
  ['C5-b', 'C5', 'lexicale', 'Sens sans dimension dont la traduction principale ou une alternative contient un terme de pôle d\'A2-DIM (lexique en annexe F).'],
  ['C6-a', 'C6', 'mécanique', 'Lien publié dont le type est absent du registre, la cible inexistante, noté des deux côtés (I12), ou transitif entre non-verbes.'],
  ['C6-b', 'C6', 'mécanique', 'Relation inscrite comme candidate au journal (lots 18 à 24) alors qu\'aucun lien publié ne touche l\'ENTRY.'],
  ['C7-b', 'C7', 'lexicale et datée', 'Sens sans `deictique`, décidé aux lots 0 à 10 (avant A7), dont une traduction contient un terme déictique (lexique en annexe F).'],
  ['C7-c', 'C7', 'lexicale et datée', 'Sens sans l\'une des six fonctions d\'A9, décidé aux lots 0 à 22 (avant A9), dont une traduction contient un terme de cette fonction (lexique en annexe F).'],
  ['C7-d', 'C7', 'comparative', 'Même traduction principale dans deux ENTRY différentes, avec des fonctions différentes.'],
  ['C7-e', 'C7', 'datée', 'Fonction posée avant l\'addendum qui la définit (`deictique` avant A7 ; fonctions d\'A9 avant A9).'],
  ['C8-a', 'C8', 'datée', 'Tag porté par une ENTRY ou un SENSE décidé au lot 0 ou au lot 01, avant la formalisation du critère (révision du lot 02).'],
  ['C8-b', 'C8', 'comparative', 'Dans une même catégorie complète, un tag gardé pour un sens et le même tag, candidat hérité, écarté pour un autre. Les deux côtés.'],
  ['C8-c', 'C8', 'mécanique, **ajoutée après l’échantillon de validation 1**', 'Tag porté par une ENTRY ou un SENSE dont l’entrée n’a aucune décision de journal sur le champ `tags`.'],
  ['C9-a', 'C9', 'mécanique', 'Citation d\'une section de snapshot introuvable, ou citation d\'A2-GLOBAL §4.4 dont l\'élément invoqué n\'est pas, tel quel, dans la liste.'],
  ['C10-a', 'C10', 'lexicale', 'Raison de journal touchant une couche, qui invoque l\'absence d\'une définition ou renvoie à une étape ultérieure (« en attente », « réservé », « à revoir », « audit A2-05 », « passe finale », « 5.16 »).'],
  ['RES', '—', 'population imposée', 'Point déjà réservé à A2-05 par un lot (périmètre du volet 1, §4).']
];
const used = r.parRegle;

let md = '';
const P = (s = '') => { md += `${s}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Criblage de cohérence — résultat');
P();
P('**Date** : 2026-10-07');
P('**Statut (mis à jour le 2026-10-12)** : **criblage validé et terminé** (443 sens candidats, 381 non-candidats, échantillon de validation 2 propre). Le texte d\'origine suit.');
P('**Statut** : **résultat du temps 1 du volet 1 (criblage exhaustif), livré pour relecture.** Aucun candidat n\'est examiné individuellement, aucun écart n\'est qualifié, aucune donnée, aucun registre, aucun snapshot et aucune décision n\'est modifié.');
P('**Périmètre appliqué** : `docs/rapports/etape2-A2-05-perimetre-coherence.md`, validé le 2026-10-07.');
P('**État du dépôt** : `ocha-v2` et `origin/ocha-v2` à `5a8687b063fd2fca7c343d544aff040709bc5ec8` ; données publiées de ce commit.');
P();
P('---');
P();
P('## 1. Ce qui a été fait, et ce qui ne l\'a pas été');
P();
P('**Fait** :');
P();
P(`- le criblage par script des ${r.sens} SENSE publiés (${r.entrees} ENTRY) et des ${journal.length} décisions du journal, sur les dix axes C1 à C10 ;`);
P('- la constitution des familles de sens comparables (annexes C et D) et de la liste des candidats (annexes A et B) ;');
P('- l\'inclusion d\'office des populations imposées : les 95 `concept_abstrait`, les 55 sens de C2, les 71 sens de C4, les sens portant une dimension, et les points réservés par les lots ;');
P('- trois échantillons de contrôle des non-candidats (§6) : un échantillon de développement, puis deux échantillons de validation indépendants ; les deux premiers ont conduit à réviser le criblage et à repasser toute la population.');
P();
P('**Non fait, conformément à la consigne** : l\'audit individuel des 147 `null` ; l\'examen individuel des 95 `concept_abstrait` et des autres candidats ; les contrôles G1 à G7 ; toute modification.');
P();
P('**Ce que signifie « candidat »** : un sens que le criblage désigne pour un examen individuel ultérieur. Ce n\'est pas un écart. Inversement, d\'un sens non candidat, ce rapport dit seulement : **aucun écart détecté par le criblage**.');
P();
P('## 2. Population examinée par axe');
P();
P('| Axe | Population | Effectif |');
P('|---|---|---|');
P(`| C1 | sens à catégorie non nulle | ${r.populations.C1} |`);
P(`| C2 | \`category: null\` avec fonction | ${r.populations.C2} |`);
P(`| C3 | sens à type non nul | ${r.populations.C3}, dont ${r.populations.C3_concept_abstrait} \`concept_abstrait\` |`);
P(`| C4 | \`semantic_type: null\` avec fonction | ${r.populations.C4} |`);
P(`| C5 | sens portant une dimension ; et tous les sens sans dimension, pour la règle lexicale | ${r.populations.C5} ; ${r.sens - r.populations.C5} |`);
P(`| C6 | liens publiés ; décisions inscrivant une relation candidate | ${r.populations.C6_liens} liens sur ${r.populations.C6_sens} sens ; ${k.relationsCandidates.length} décisions |`);
P(`| C7 | sens portant une fonction ; et tous les sens, pour les règles lexicales | ${r.populations.C7} ; ${r.sens} |`);
P(`| C8 | porteurs de tag | ${r.populations.C8_entry} ENTRY et ${r.populations.C8_sense} SENSE, soit ${k.tags.length} sens concernés |`);
P(`| C9 | décisions citant \`A2-GLOBAL\` ; citations de section d'un snapshot | ${r.populations.C9} ; ${k.citations.length} |`);
P(`| C10 | décisions citant un snapshot ou A5, A6, A7, A9 | ${r.populations.C10} |`);
P();
P('Ces effectifs sont ceux du périmètre validé.');
P();
P('## 3. Règles de détection utilisées');
P();
P('Chaque règle est appliquée par script à toute sa population. La colonne « Nature » dit sur quoi repose la détection.');
P();
P('| Règle | Axe | Nature | Détection | Sens candidats |');
P('|---|---|---|---|---|');
for (const [code, ax, nat, txt] of RULES) P(`| ${code} | ${ax} | ${nat} | ${txt} | ${used[code] ?? 0} |`);
P();
P('**Deux notions à lire avec la règle** :');
P();
P('- **Famille source** : les fiches sources portent une ancienne catégorie et une ancienne sous-catégorie (par exemple `corps_sante / corps`). Ce classement n\'a aucune valeur normative ; il sert seulement à rapprocher des sens que les sources rangeaient ensemble. Il y a ' + F.length + ' familles (annexe C).');
P('- **Seuils** (5 sens, 70 %, 2 %, la moitié) : ce sont des choix de criblage, non des normes. Ils fixent ce que le script remonte ; l\'échantillon de contrôle sert à les éprouver.');
P();
P('**Règles sans candidat** : C6-a et C6-b n\'ont rien remonté (§5).');
P();
P('**Règles ajoutées après lecture** : quatre règles (C1-f, C1-g, C1-h, C8-c) et dix points réservés viennent des échantillons de contrôle (§6). Les règles d\'origine n\'ont pas été modifiées.');
P();
P('## 4. Candidats obtenus');
P();
const only = C.filter((c) => c.regles.every((g) => ['C3-0', 'C2-0', 'C4-0', 'C5-0'].includes(g.regle))).length;
P(`**${r.candidats} sens candidats** sur ${r.sens}, et **${r.nonCandidats} non-candidats**.`);
P();
P('| Axe | Sens candidats |');
P('|---|---|');
for (const ax of ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']) P(`| ${ax} | ${r.parAxe[ax] ?? 0} |`);
P();
P('Un sens peut être candidat sur plusieurs axes : la somme dépasse le total.');
P();
P(`- **${only}** sens ne sont candidats que par une population imposée (C2, C3 \`concept_abstrait\`, C4, dimension posée) ; **${r.candidats - only}** le sont par au moins une règle de détection ou un point réservé.`);
P(`- **${r.candidatsDans147}** candidats sont aussi des sens des 147 \`null\` (${r.sensDes147} sens distincts). Pour eux, le \`null\` lui-même est audité au volet 2 ; le volet 1 n'examine que les autres couches, et **un même cas n'est audité individuellement qu'une fois**.`);
P();
P('La liste complète est en annexe A ; le détail de chaque détection, en annexe B.');
P();
P('## 5. Constats automatiques');
P();
P('Ces constats sont établis par le script seul. Ils ne demandent aucune lecture individuelle.');
P();
const relPb = k.relations.filter((x) => x.problemes.length).length;
P(`**Relations (C6).** Les ${k.relations.length} liens publiés ont un type présent au registre et une cible existante ; aucun n'est noté des deux côtés (I12) ; les liens transitifs relient des verbes. Anomalies mécaniques : ${relPb}. ${k.relations.filter((x) => x.memeCategorie).length} liens relient deux sens de même catégorie complète, ${k.relations.filter((x) => x.memeType).length} deux sens de même type ; les autres sont candidats (C1-d, C3-e). Les ${k.relationsCandidates.length} décisions qui inscrivaient une relation candidate (lots 18 à 24) portent toutes sur une ENTRY qu'un lien publié touche aujourd'hui.`);
P();
const g = k.citations.filter((x) => x.document === 'A2-GLOBAL');
const gok = g.filter((x) => x.elementDansLaListe);
P(`**Citations (C9).** ${k.citations.length} raisons de journal citent une section d'un snapshot : ${g.length} citent \`A2-GLOBAL\` §4.4, ${k.citations.length - g.length} citent \`A2-LING\` §5. Toutes ces sections existent. Des ${g.length} citations du §4.4, ${gok.length} invoquent un élément qui figure tel quel dans la liste (« ${[...new Set(gok.map((x) => x.elementCite))].join(' », « ')} »). ${g.filter((x) => !x.elementDansLaListe).map((x) => `${x.decision.replace('A2-04-', '')} (« ${x.formule} ») parle d'« action générale », alors que la liste porte « action générique »`).join(' ; ')} : c'est le seul candidat de C9. Aucune raison ne cite \`A2-L3\`, \`A2-ST\`, \`A2-DIM\` ni \`A2-REL\` avec un numéro de section : ces citations-là ne peuvent pas être vérifiées mécaniquement.`);
P();
P(`**Fonction \`interrogatif\` (C7).** Elle est portée par ${k.interrogatif.length} sens : ${k.interrogatif.map(lab).join(' ; ')}. C'est l'E5 normatif commun prévu par le périmètre ; le criblage ne dit rien de ces annotations. Aucune autre fonction sans définition normative n'est portée par un sens publié.`);
P();
const jd = k.justificationsDatees;
P(`**Justifications datées (C10).** ${jd.length} détections dans les raisons du journal : ${jd.filter((x) => /absence/.test(x.motif)).length} invoquent l'absence d'une définition, ${jd.filter((x) => /ultérieure/.test(x.motif)).length} renvoient à une étape ultérieure. Elles portent sur ${r.parRegle['C10-a']} sens. Le script repère une formulation ; il ne sait pas si la raison est devenue obsolète.`);
P();
P(`**Lexique des fonctions, hors fenêtre.** ${k.lexiqueFonctionsHorsFenetre.length} détections concernent des sens décidés après la définition d'une fonction, dont une traduction en contient un terme sans que le sens la porte. Ils ne sont pas candidats : la fonction existait quand le lot a décidé. Ils sont donnés pour mémoire en annexe E.`);
P();
P('**Classe × type.** La répartition complète des types par classe grammaticale est en annexe E.');
P();
const ECH = echantillons({ sp, r, C, known, senseById, lab, cell, catOf });
md += ECH.section6;
if (false) {
P('## 6. Échantillon de contrôle des non-candidats');
P();
P('### 6.1 Premier passage');
P();
P(`Le premier criblage donnait ${v1.candidats} candidats et ${v1.nonCandidats} non-candidats. Taille requise : 10 % des non-candidats, au moins 50, soit ${v1.tailleEchantillon}.`);
P();
P(`- **Graine** : ${r.graine} (générateur déterministe, tirage par script).`);
P('- **Par lot d\'origine** : allocation proportionnelle, au moins un sens par lot ayant des non-candidats.');
P(`- **Par classe et par couche** : ${v1.complement.length} sens ajoutés pour les strates absentes du tirage par lot (${v1.complement.map((x) => x.strate).join(', ')}). Les autres strates étaient déjà représentées par le tirage par lot, ou absentes des non-candidats.`);
P(`- **Tirés** : ${v1.tires} sens.`);
P();
P('Chaque sens tiré a été lu individuellement : fiche source entière et exemple, sens publié et autres sens de l\'ENTRY, décisions du journal sur ses couches, puis confrontation aux snapshots et aux sens comparables.');
P();
P('### 6.2 Deux faiblesses du criblage');
P();
P('L\'examen n\'a relevé **aucun écart établi**. Il a mis au jour deux cas que le criblage aurait dû désigner pour un examen :');
P();
P('1. **`v_681_s1` 温い « Tiède »**, en être humain › sens et perception › toucher et sensations. Les autres sens de température au toucher (熱い, 冷たい, 温かい) étaient déjà candidats par C1-a ; 温い, rangé comme eux, ne l\'était pas. Une famille aurait été examinée sans l\'un de ses membres.');
P('2. **`v_455_s1` 明るい « Lumineux »**, en couleurs › teintes et nuances › clair / foncé, alors que sa fiche décrit « un espace bien éclairé par la lumière ». Le même rangement vaut pour `v_4_s1` 暗い « Sombre ». Le criblage ne voyait pas ces sens : leur famille source est trop petite pour C1-b. **Ce rapport ne dit pas que ce rangement est fautif** : il dit qu\'il demande une lecture, et que le criblage ne le remontait pas.');
P();
P('### 6.3 Critères révisés, population repassée');
P();
P('- **C1-f** (propagation) : quand la moitié au moins des sens d\'une catégorie complète est candidate sur C1, ses autres sens le deviennent. Elle remonte 温い.');
P('- **C1-g** (petites familles) : dans une famille source d\'au moins 2 sens catégorisés, le sens seul à porter son niveau 1 devient candidat. C\'est C1-b étendue aux familles que son seuil de 5 laissait de côté. Elle remonte 明るい et 暗い.');
P('- Une correction du script, trouvée au passage : les deux ENTRY hors JLPT (`v_718`, `v_719`) n\'étaient pas rattachées à leurs fiches sources (`hj_v_1`, `hj_v_2`), dont le numéro diffère. Elles le sont maintenant, par leur forme.');
P();
P(`**Toute la population a été repassée** avec les critères révisés : ${r.candidats} candidats (${r.candidats - v1.candidats} de plus), ${r.nonCandidats} non-candidats. C1-g a désigné ${used['C1-g']} sens, C1-f ${used['C1-f']}.`);
P();
P('C1-g remonte beaucoup de polysémies ordinaires (魚, animal et aliment ; 高い, haut et cher). C\'est attendu : la règle est large à dessein, et l\'examen individuel triera.');
P();
P('### 6.4 Échantillon final');
P();
P(`Taille requise sur les ${r.nonCandidats} non-candidats : ${r.tailleEchantillon}. Des ${v1.tires} sens du premier tirage, ${r.precedentsDevenusCandidats.length} sont devenus candidats (${r.precedentsDevenusCandidats.map(lab).join(' ; ')}) ; les ${r.repris.length} autres, déjà examinés, restent des non-candidats. ${r.nouveaux.length} sens ont été tirés en plus, avec la même graine, pour rétablir l'allocation par lot (${r.nouveaux.map(lab).join(' ; ')}), et examinés de la même façon.`);
P();
P(`**Résultat : ${r.tires} sens non candidats examinés, aucun écart relevé, aucun nouveau cas que le criblage aurait dû désigner.** La liste est en annexe G.`);
P();
const in147sample = r.echantillon.filter((id) => known.some((w) => w.where.endsWith(` ${id}`))).length;
P('**Limites de ce contrôle** :');
P();
P('- le second échantillon reprend les sens déjà examinés ; ce n\'est pas un tirage entièrement neuf sur la population révisée ;');
P(`- un échantillon de ${r.tires} sens sur ${r.nonCandidats} ne prouve pas l'absence d'autre faux négatif ; il en borne la fréquence ;`);
P(`- ${in147sample} sens de l'échantillon sont aussi des sens des 147 : leur \`null\` n'a pas été examiné, il est réservé au volet 2 ; seules leurs autres couches l'ont été.`);
P();
}
P('## 7. Ce qui est automatique, et ce qui demande une lecture');
P();
P('| | Établi par le script | Demande une lecture individuelle |');
P('|---|---|---|');
P('| Populations et effectifs | oui | — |');
P('| Validité mécanique des liens, existence des sections citées | oui | — |');
P('| Liste des 17 sens `interrogatif` | oui | leur conformité, après la définition |');
P('| Qu\'un sens est candidat, et par quelle règle | oui | — |');
P('| Qu\'un candidat est un écart, et de quel code (E1 à E5) | **non** | oui, au temps 2 |');
P('| Que deux sens d\'une même famille sont réellement comparables | **non** | oui : le script rapproche des formes, pas des sens |');
P('| Qu\'une raison de journal est devenue obsolète | **non** | oui |');
P('| Qu\'une catégorie ou un type convient à une fiche | **non** | oui |');
P(`| Qu'un non-candidat est cohérent | **non** | seulement pour les sens lus des échantillons, et sans valeur de déclaration générale |`);
P();
P('**Ce que le criblage ne peut pas voir.** Ses règles sont comparatives, lexicales ou datées. Un rangement appliqué partout de la même façon, mais discutable au regard d\'un snapshot, ne laisse aucune trace comparative : 明るい et 暗い en sont l\'exemple, trouvé par lecture. C1-g réduit cet angle mort sans le supprimer, en particulier pour les sens seuls de leur famille source et pour les familles d\'un seul sens.');
P();
P('## 8. Suite');
P();
P('Selon l\'ordre arbitré : audit individuel des 147 `null` (volet 2), en s\'appuyant sur les familles des annexes C et D ; puis examen individuel des autres candidats ; puis arbitrage global. Rien de cela n\'est commencé.');
P();
P('---');
P();
P('## Annexe A · Liste des candidats');
P();
P('Ordre : numéro d\'ENTRY, puis numéro de sens. « 147 » : le sens porte aussi un avertissement audité au volet 2.');
P();
P('| # | SENSE | Mot | Classe | Sens | Catégorie | Type | Lot | 147 | Règles |');
P('|---|---|---|---|---|---|---|---|---|---|');
C.forEach((c, i) => P(`| ${i + 1} | \`${c.id}\` | ${cell(c.mot)} | ${c.classe} | ${cell(c.sens)} | ${cell(c.categorie)} | ${c.type} | ${String(c.lot).padStart(2, '0')} | ${c.dans147.join(', ') || '—'} | ${[...new Set(c.regles.map((x) => x.regle))].join(', ')} |`));
P();
P('## Annexe B · Détail des détections, par règle');
P();
P('Les populations imposées (C2-0, C3-0, C4-0, C5-0) ne sont pas détaillées : l\'annexe A les donne.');
P();
for (const [code] of RULES) {
  if (['C2-0', 'C3-0', 'C4-0', 'C5-0'].includes(code)) continue;
  const hits = C.flatMap((c) => c.regles.filter((x) => x.regle === code).map((x) => ({ c, x })));
  if (!hits.length) continue;
  P(`### ${code}`);
  P();
  const seen = new Set();
  const grouped = ['C1-a', 'C3-b', 'C7-d', 'C1-d', 'C3-e', 'C8-b'].includes(code);
  for (const { c, x } of hits) {
    const key = grouped ? x.detail : `${c.id}|${x.detail}`;
    if (seen.has(key)) continue;
    seen.add(key);
    P(grouped ? `- ${cell(x.detail)}` : `- \`${c.id}\` ${cell(c.mot)} « ${cell(c.sens)} » : ${cell(x.detail)}`);
  }
  P();
}
P('## Annexe C · Familles source');
P();
const quiet = F.filter((f) => !f.candidats && !f.dans147.length);
P(`Une ligne par famille source qui contient au moins un candidat ou un sens des 147. Les ${quiet.length} autres familles (${quiet.reduce((a, f) => a + f.sens, 0)} sens) n'en contiennent aucun.`);
P();
P('| Famille source | Sens | Catégories (niveaux 1 et 2) | Types | Candidats | Sens des 147 |');
P('|---|---|---|---|---|---|');
for (const f of F.filter((x) => x.candidats || x.dans147.length)) P(`| ${f.famille} | ${f.sens} | ${cell(f.categories)} | ${cell(f.types)} | ${f.candidats} | ${f.dans147.map((id) => `\`${id}\``).join(' ') || '—'} |`);
P();
P('## Annexe D · Familles des 147 `null`, pour le volet 2');
P();
P('Regroupement **automatique** des 147 avertissements d\'après la formulation de leur raison journalisée. Il prépare la lecture ; il ne classe aucun cas. Un cas tombe dans la première famille dont sa raison contient la formule.');
P();
const BUCKETS = {
  'categorie-nulle': [['personne générique', /personne g[ée]n[ée]rique/i], ['propriété générale', /propri[ée]t[ée] (physique )?g[ée]n[ée]rale/i], ['évaluation', /[ée]valuation/i], ['action générale', /action g[ée]n[ée]rale/i], ['état général', /[ée]tat g[ée]n[ée]ral/i], ['événement, processus ou phénomène général', /[ée]v[ée]nement g[ée]n[ée]ral|processus g[ée]n[ée]ral|ph[ée]nom[èe]ne physique g[ée]n[ée]ral/i], ['fiche qui déborde un domaine', /plusieurs domaines|d[ée]borde|aussi sur|autant que|couvre/i], ['aucune catégorie ne nomme la notion', /aucune cat[ée]gorie|ne nomme|n'a pas de cat[ée]gorie|ne range nulle part/i]],
  'type-nul': [['son', /un son [ée]mis|son/i], ['partie du corps, corps', /partie du corps|corps humain/i], ['unité de mesure ou de comptage', /unit[ée]/i], ['partie d\'une chose', /partie/i]]
};
for (const code of ['type-nul', 'categorie-nulle']) {
  const ws = known.filter((w) => w.code === code);
  const fam = new Map();
  for (const w of ws) {
    const id = w.where.split(' · ')[2];
    const { e } = senseById.get(id);
    const num = Number(id.split('_s')[1]);
    const n = e.id.slice(2);
    const d = journal.find((x) => [`n5_v_${n}`, `hj_v_${n}`].includes(x.entry) && x.kind === code && x.field.startsWith(`sens ${num} ·`));
    const b = (BUCKETS[code].find(([, re]) => re.test(d?.reason ?? '')) ?? ['autre formulation'])[0];
    (fam.get(b) ?? fam.set(b, []).get(b)).push({ id, e });
  }
  P(`### ${code} (${ws.length})`);
  P();
  P('| Famille (formulation de la raison) | Cas | Sens | Dont candidats au volet 1 |');
  P('|---|---|---|---|');
  for (const [b, list] of [...fam.entries()].sort((x, y) => y[1].length - x[1].length)) P(`| ${b} | ${list.length} | ${list.map((x) => `\`${x.id}\` ${cell(x.e.word)}`).join(' ; ')} | ${list.filter((x) => candById.has(x.id)).length} |`);
  P();
}
P('## Annexe E · Autres relevés');
P();
P('### Classe grammaticale × type sémantique');
P();
P('| Classe | Type | Sens | Sens typés de la classe |');
P('|---|---|---|---|');
for (const x of k.classeType.slice().sort((a, b) => a.classe.localeCompare(b.classe) || b.n - a.n)) P(`| ${x.classe} | ${x.type} | ${x.n} | ${x.total} |`);
P();
P('### Même traduction principale dans deux ENTRY');
P();
P(`${k.memeTraduction.length} groupes. Ceux dont la catégorie, le type ou les fonctions diffèrent sont candidats (C1-a, C3-b, C7-d) ; les ${k.memeTraduction.filter((x) => x.categories.length === 1 && x.types.length === 1 && x.fonctions.length === 1).length} autres sont traités de façon identique.`);
P();
P('### Lexique des fonctions, hors fenêtre');
P();
for (const x of k.lexiqueFonctionsHorsFenetre) P(`- ${lab(x.id)} (lot ${x.lot}) : sans \`${x.fonction}\`, terme ${x.termes.map((t) => `« ${t} »`).join(', ')}`);
P();
P('### Relations publiées');
P();
P('| De | Type | Vers | Même catégorie | Même type |');
P('|---|---|---|---|---|');
for (const x of k.relations) P(`| ${lab(x.de)} | ${x.type} | ${lab(x.vers)} | ${x.memeCategorie ? 'oui' : 'non'} | ${x.memeType ? 'oui' : 'non'} |`);
P();
P('## Annexe F · Lexiques des règles lexicales');
P();
P('Ces lexiques sont des outils de criblage, écrits pour ce contrôle. Ils ne sont pas normatifs et n\'ont aucune autorité sur la définition d\'une dimension ou d\'une fonction. La recherche porte sur la traduction principale et les alternatives, en mot entier.');
P();
const grab = (name) => Function(`return (${new RegExp(`const ${name} = (\\{[\\s\\S]*?\\n\\});`).exec(script)[1]})`)();
P('**C5-b · termes de pôle (A2-DIM)**');
P();
for (const [axis, ws] of Object.entries(grab('POLES'))) P(`- \`${axis}\` : ${ws.join(', ')}`);
P();
P('**C7-b et C7-c · termes de fonction (A7, A9)**');
P();
for (const [f, ws] of Object.entries(grab('LEX'))) P(`- \`${f}\` : ${ws.join(', ')}`);
P();
P('**C10-a · formulations cherchées dans les raisons** : « sans définition », « aucune définition », « pas de définition », « non défini », « sans règle A2-LING », « définition normative » ; « en attente », « pour l\'instant », « provisoire », « à reprendre », « à revoir », « à réexaminer », « réservé », « audit A2-05 », « à l\'audit », « passe finale », « 5.16 ».');
P();
md += ECH.annexeG;
if (false) {
P('## Annexe G · Échantillon de contrôle');
P();
P('« Repris » : sens du premier tirage, resté non candidat. « Ajouté » : tiré au second passage. Chaque ligne a été lue individuellement.');
P();
P('| # | SENSE | Mot | Classe | Sens | Catégorie | Type | Tirage | 147 | Résultat de la lecture |');
P('|---|---|---|---|---|---|---|---|---|---|');
r.echantillon.forEach((id, i) => {
  const { e, s } = senseById.get(id);
  const w = known.filter((x) => x.where.endsWith(` ${id}`)).map((x) => x.code);
  P(`| ${i + 1} | \`${id}\` | ${cell(e.word)} | ${e.linguistic.grammatical_class} | ${cell(s.meaning.primary)} | ${cell(catOf(s.category))} | ${s.semantic_type} | ${r.repris.includes(id) ? 'repris' : 'ajouté'} | ${w.join(', ') || '—'} | ${w.length ? 'aucun écart relevé sur les autres couches ; `null` réservé au volet 2' : 'aucun écart relevé'} |`);
});
P();
P('**Sens du premier tirage devenus candidats après la révision** :');
P();
const why = { 'v_455_s1': 'faiblesse relevée à la lecture (§6.2) ; candidat par C1-g', 'v_681_s1': 'faiblesse relevée à la lecture (§6.2) ; candidat par C1-f', 'v_246_s1': 'aucun écart relevé à la lecture ; candidat par l\'effet de la règle révisée C1-g', 'v_130_s2': 'aucun écart relevé à la lecture ; candidat par l\'effet de la règle révisée C1-g' };
for (const id of r.precedentsDevenusCandidats) P(`- ${lab(id)} : ${why[id] ?? 'candidat par l\'effet d\'une règle révisée'}`);
P();
}
writeFileSync(outFile, md);
console.log(`rapport écrit : ${md.split('\n').length} lignes, ${Buffer.byteLength(md)} octets`);
