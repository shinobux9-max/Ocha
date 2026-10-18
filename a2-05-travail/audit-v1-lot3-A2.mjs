// A2-05 · volet 1 · lot 3 · livraison A2 : neuf sens de type `concept_abstrait` du lot 12 (repères temporels). Lecture seule sur les données.
// Usage : node audit-v1-lot3-A2.mjs <racine du dépôt>   (réécrit docs/rapports/etape2-A2-05-volet1-lot3-A2.md)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
if (!root) throw new Error('argument attendu : racine du dépôt');
const txt = (p) => readFileSync(join(root, p), 'utf8');
const read = (p) => JSON.parse(txt(p));
const LF = String.fromCharCode(10);
const vocab = [...read('data/n5/vocab.json'), ...read('data/vocab-hors-jlpt.json')];
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const anciens = read('reconstruction/a2-04/sources/exemples.json');
const journal = read('reconstruction/a2-04/journal.json');
const crib = read('a2-05-travail/criblage/resultat.json');
const bilanV2 = txt('docs/rapports/etape2-A2-05-bilan-volet2.md');
const bilanProv = txt('docs/rapports/etape2-A2-05-volet1-lot2-provenance-bilan.md');
const perimetre = txt('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md');
if (!/^\*\*Statut\*\* : \*\*arbitré le 2026-10-12/m.test(perimetre)) throw new Error('le périmètre du lot 3 ne porte pas son arbitrage');
if (!/^\*\*Statut\*\* : \*\*arbitré le /m.test(txt('docs/rapports/etape2-A2-05-volet1-lot3-A1.md'))) throw new Error('A1 ne porte pas son arbitrage : A2 ne peut pas être livrée');

const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/[a-z]+>/g, '$1').replace(/<\/?[A-Za-z]+>/g, '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const tous = vocab.flatMap((e) => e.senses.map((s) => ({ e, s })));
const candidats = new Map(crib.candidats.map((c) => [c.id, c]));
const livraison = new Map([...perimetre.matchAll(/^\| \d+ \| ([A-F]\d+) \| `((?:hj_)?v_\d+_s\d+)` \|/gm)].map((m) => [m[2], m[1]]));
if (livraison.size !== 377) throw new Error('périmètre : 377 candidats attendus, lus ' + livraison.size);

// L'arbitrage se renseigne ici, après la relecture : { date, texte: [...] }
const ARBITRAGE = { date: '2026-10-12', texte: [
  "Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur).",
  '',
  "**Les neuf verdicts « conforme » sont retenus : 9 conformes, 0 écart, 0 suspendu, aucune correction.** Les neuf sens conservent `concept_abstrait`, leurs catégories et leurs fonctions existantes. **V1-6 reste libre** ; le bilan global demeure à 180 corrections dans 161 ENTRY, toutes non appliquées. La proposition et ses réserves sont conservées ci-dessous, telles qu'elles ont été livrées.",
  '',
  '| Point | Arbitrage |',
  '|---|---|',
  "| **今** | « la fiche désigne l'instant présent et non une période étendue ; le type `concept_abstrait` reste pertinent selon A2-ST ». |",
  "| **R4** | l'absence de décision historique sur les types et les catégories « reste un constat documentaire, pas un écart à corriger ». |",
  "| **R5** | `temps › moments_periodes › parties_de_la_journee` est conservée pour 今晩 et 今朝 : « la catégorie décrit une partie de journée ; `deictique` porte le repérage par rapport au présent ». **Précédent noté pour l'examen de 昨夜 en A3, sans préjuger son verdict.** |",
  '',
  "**Lot 3 : 19 sens arbitrés sur 377 ; 358 restent**, dont 50 du bloc A et les 17 du bloc F, suspendus. **Suite** : A3 est autorisée, seule ; A4 ne commence pas avant l'arbitrage d'A3. Les conclusions d'A1 et d'A2 servent de références de comparaison, jamais de verdicts automatiques."
] };

const IDS = ['v_284_s1', 'v_286_s1', 'v_290_s1', 'v_298_s1', 'v_299_s1', 'v_300_s1', 'v_301_s1', 'v_302_s1', 'v_303_s1'];

// Ce que la revue des types donne pour un jour, un mois, une année ou une partie de journée désignés comme tels
const REVUE = (quoi, exemples) => "Passé en revue contre A2-ST, sur cette fiche : " + quoi + " n'est ni une entité ni un lieu. Ce n'est pas une occurrence : la fiche ne décrit aucun fait qui survient ; dans ses exemples, " + exemples + ". Ce n'est ni un état ni une propriété, rien n'y étant attribué à une entité. Ce n'est pas une `quantite_valeur` : la fiche ne mesure aucune durée, elle désigne une portion du temps. A2-ST n'a aucun type de période ou de moment ; reste un concept non matériel de repérage dans le temps, que `concept_abstrait` décrit. `null` (A6) supposerait qu'aucun type terminal ne décrive le sens, ce qui n'est pas le cas.";
const DEIXIS = (d, quoi) => " **Fonction** : `deictique`, posée par " + d + " selon A7 (axe du temps) ; la fiche repère en effet " + quoi + " par rapport au moment où l'on parle. La fonction ne décide pas du type : le sens désigne une portion du temps, et garde le type qui la décrit.";

const F = {
  v_284_s1: { v: 'conforme',
    m: "La fiche dit : « nom temporel désignant le jour suivant demain ». " + REVUE('un jour désigné comme tel', "c'est le jour où l'on regarde un film, où a lieu l'examen, dont on prévoit la météo") + " **Catégorie** : `temps › moments_periodes › futur`, sous-catégorie nommée par A2-L3 ; le jour désigné est à venir." + DEIXIS('D0749', 'ce jour'),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie. Voir la réserve R4 (§5)." },
  v_286_s1: { v: 'conforme',
    m: "La fiche dit : « désignant l'année suivant l'année prochaine ». La traduction publiée, « Dans deux ans », a la forme d'un complément de temps, mais la fiche désigne l'année elle-même, et la classe est `nom`. " + REVUE('une année désignée comme telle', "c'est l'année où l'on obtient son diplôme, où l'on entre à l'université, où l'on se marie") + " « Deux ans » n'y est pas une durée mesurée : la fiche parle d'« un cran d'éloignement supplémentaire », c'est-à-dire d'un rang dans la suite des années. **Catégorie** : `temps › moments_periodes › futur` ; l'année désignée est à venir." + DEIXIS('D0793', 'cette année'),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie. Voir la réserve R4 (§5)." },
  v_290_s1: { v: 'conforme',
    m: "La fiche dit : « nom temporel désignant le jour précédant hier ». " + REVUE('un jour désigné comme tel', "c'est le jour où l'on a acheté une voiture, où l'on est allé au cinéma, dont on rappelle la nuit froide") + " La traduction secondaire « Il y a deux jours », qui aurait la forme d'une durée, a été écartée comme redondante (D0755) ; le sens publié désigne le jour. **Catégorie** : `temps › moments_periodes › passe` ; le jour désigné est passé." + DEIXIS('D0753', 'ce jour'),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie. Voir la réserve R4 (§5)." },
  v_298_s1: { v: 'conforme',
    m: "La fiche dit : « nom temporel désignant le moment présent ou l'instant actuel ». **L'hypothèse de R2 ne se transpose pas mot pour mot** : 今 ne désigne pas une période du calendrier, mais un moment. Examiné pour lui-même : un moment n'est ni une entité ni un lieu ; ce n'est pas une occurrence, la fiche ne décrivant aucun fait qui survient (dans ses exemples, c'est le moment où l'on fait quelque chose, où l'on est occupé, que l'on oppose à « autrefois ») ; ce n'est pas un état : la fiche ne décrit pas la condition d'une entité, elle nomme l'instant ; ce n'est pas une quantité. Reste un concept non matériel de repérage dans le temps, que `concept_abstrait` décrit ; `null` (A6) ne s'impose pas. **Catégorie** : `temps › moments_periodes › present`, sous-catégorie nommée par A2-L3 : c'est le sens même de la fiche." + DEIXIS('D0736', 'ce moment'),
    r: "C'est le sens de la livraison où le raisonnement de R2 s'applique le moins directement : le verdict repose sur la fiche de 今, non sur une analogie avec les saisons. Les exemples emploient tous 今 comme complément de temps (« maintenant ») ; la fiche le dit « nom », et la classe publiée la suit. Aucune décision de journal ne porte sur le type ni sur la catégorie." },
  v_299_s1: { v: 'conforme',
    m: "La fiche dit : « désignant l'année en cours ». " + REVUE('une année désignée comme telle', "c'est l'année où l'on lit beaucoup, où l'on prévoit un nouveau travail, dont on rappelle l'été") + " **Catégorie** : `temps › moments_periodes › present` ; l'année désignée est celle où l'on parle." + DEIXIS('D0784', 'cette année'),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie. La lecture a été corrigée par D0840 (A8), sans rapport avec les champs examinés. Voir la réserve R4 (§5)." },
  v_300_s1: { v: 'conforme',
    m: "La fiche dit : « nom temporel désignant le jour actuel ». " + REVUE('un jour désigné comme tel', "c'est le jour où il fait beau, où l'on a une réunion, pour lequel on n'a pas encore choisi son repas") + " **Catégorie** : `temps › moments_periodes › present` ; le jour désigné est celui où l'on parle." + DEIXIS('D0738', 'ce jour'),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie. Voir la réserve R4 (§5)." },
  v_301_s1: { v: 'conforme',
    m: "La fiche dit : « désignant la soirée ou la nuit du jour présent ». " + REVUE('une partie de journée désignée comme telle', "c'est le soir où l'on dîne, où il fait froid, où l'on voit les étoiles") + " **Catégorie** : `temps › moments_periodes › parties_de_la_journee`, sous-catégorie nommée par A2-L3 (« Parties de la journée ») : la fiche désigne bien une partie de la journée." + DEIXIS('D0760', 'cette soirée'),
    r: "Voir la réserve R5 (§5) : ce sens relèverait aussi de « Présent » ; la sous-catégorie retenue est celle de la partie de la journée, sans décision écrite. Aucune décision de journal ne porte sur le type." },
  v_302_s1: { v: 'conforme',
    m: "La fiche dit : « désignant le mois en cours ». " + REVUE('un mois désigné comme tel', "c'est le mois où l'on commence un travail, où l'on est très pris, à la fin duquel on part en voyage") + " **Catégorie** : `temps › moments_periodes › present` ; le mois désigné est celui où l'on parle." + DEIXIS('D0775', 'ce mois'),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie. Voir la réserve R4 (§5)." },
  v_303_s1: { v: 'conforme',
    m: "La fiche dit : « désignant la matinée du jour présent ». " + REVUE('une partie de journée désignée comme telle', "c'est le matin où l'on s'est levé tôt, où il faisait beau, où une lettre est arrivée") + " **Catégorie** : `temps › moments_periodes › parties_de_la_journee` : la fiche désigne bien une partie de la journée." + DEIXIS('D0757', 'cette matinée'),
    r: "Voir la réserve R5 (§5), comme pour 今晩. La lecture a été corrigée par D0841 (A8), sans rapport avec les champs examinés. Aucune décision de journal ne porte sur le type." }
};

// --- Relevés et contrôles
const fiches = IDS.map((id) => {
  const eid = id.replace(/_s\d+$/, ''); const sid = 'n5_' + eid;
  const e = vocab.find((x) => x.id === eid); const s = e?.senses.find((x) => x.id === id); const src = sources.get(sid); const c = candidats.get(id);
  if (!e || !s || !src || !c) throw new Error(id + ' : sens, fiche source ou candidat introuvable');
  if (c.dans147.length) throw new Error(id + ' : sens des 147, hors du lot 3');
  if (livraison.get(id) !== 'A2') throw new Error(id + ' : hors de la livraison A2 du périmètre arbitré');
  if (s.semantic_type !== 'concept_abstrait') throw new Error(id + ' : type publié inattendu');
  if (!F[id]) throw new Error(id + ' : fiche d\'examen absente');
  const regles = c.regles.map((g) => g.regle);
  const corr = bilanV2.split(LF).filter((l) => /^\| (V[12]-\d+|\d+) \|/.test(l) && l.includes('`' + eid)).map((l) => l.split('|')[1].trim() + ' (' + l.split('|')[2].trim() + ', ' + l.split('|')[5].trim() + ')');
  const prov = bilanProv.split(LF).filter((l) => /^\| \d+ \|/.test(l) && l.includes('`' + eid)).map((l) => { const k = l.split('|').map((x) => x.trim()); return k[3] + ' : ' + k[7] + ' (' + k[2] + ')'; });
  const dec = journal.filter((d) => d.entry === sid);
  if (dec.some((d) => d.status !== 'validated')) throw new Error(id + ' : décision non validée');
  const decType = dec.filter((d) => /semantic_type|category/.test(d.field));
  const ailleurs = journal.filter((d) => d.entry !== sid && d.reason.includes(e.word) && /concept_abstrait|semantic_type/.test(d.reason + ' ' + d.field));
  const fonc = [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
  const decFonc = dec.filter((d) => /linguistic_functions/.test(d.field));
  if (fonc.join() !== 'deictique' || decFonc.length !== 1 || !/A7/.test(decFonc[0].reason)) throw new Error(id + ' : fonction ou décision de fonction inattendue');
  return { id, eid, sid, e, s, src, c, regles, corr, prov, dec, decType, ailleurs, fonc, ex: anciens.vocab?.[sid] ?? [] };
});
const idsA2 = [...livraison].filter(([, l]) => l === 'A2').map(([id]) => id);
if (idsA2.length !== IDS.length || idsA2.some((id) => !IDS.includes(id))) throw new Error('A2 : les sens ne sont pas ceux du périmètre arbitré');
const axes = [...new Set(fiches.flatMap((f) => f.c.regles.map((g) => g.axe)))];
const reglesVues = [...new Set(fiches.flatMap((f) => f.regles))];
const nConf = fiches.filter((f) => F[f.id].v === 'conforme').length; const nEcart = fiches.filter((f) => F[f.id].v === 'écart').length;
if (nConf + nEcart !== fiches.length) throw new Error('verdict inattendu');
const sansDecType = fiches.filter((f) => !f.decType.length && !f.ailleurs.length).length;
const mp = tous.filter(({ s }) => s.category?.level_2 === 'moments_periodes');
const blocA = [...livraison].filter(([, l]) => /^A\d/.test(l)).length;
const fonctions = (s) => { const f = [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])]; return f.length ? f.map((x) => '`' + x + '`').join(', ') : 'aucune'; };

const P = [];
P.push("# Étape 2 · A2-05 · Volet 1 · Lot 3 — livraison A2 : neuf repères temporels de type `concept_abstrait` (lot 12)", '');
P.push('**Date** : 2026-10-12');
P.push(ARBITRAGE
  ? '**Statut** : **arbitré le ' + ARBITRAGE.date + '** (§0). La proposition est conservée telle qu\'elle a été livrée.'
  : "**Statut** : **proposition, non arbitrée.** Les verdicts ci-dessous sont proposés ; aucun n'est acquis. Écrit par `a2-05-travail/audit-v1-lot3-A2.mjs`, en lecture seule sur les données : aucune donnée publiée, aucune fiche source, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n'est modifié ; aucune décision historique n'est réécrite. **A3 n'est pas commencé ; G1 à G7 ne sont pas ouverts ; aucune des 180 corrections retenues n'est appliquée.**");
P.push('', "**Autorisation** : arbitrage d'A1, du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Autorisation d'auditer A2 seule, conformément au périmètre déjà arbitré. Lire intégralement chaque fiche de ses candidats, consulter A2-ST et toutes les décisions applicables, et contrôler tous les axes du criblage signalés pour chaque sens. Appliquer l'orientation R2 comme hypothèse de travail, non comme verdict collectif. »", '');
if (ARBITRAGE) P.push('## 0. Arbitrage', '', ...ARBITRAGE.texte, '');
P.push('## 1. Résultat proposé', '');
P.push('| N° | Sens | Mot | Traduction | Lot | Catégorie publiée | Type publié | Fonction publiée | Règles du criblage | Verdict proposé | Correction |', '|---|---|---|---|---|---|---|---|---|---|---|');
fiches.forEach((f, i) => P.push('| ' + (i + 1) + ' | `' + f.id + '` | ' + f.e.word + ' | ' + f.s.meaning.primary + ' | ' + String(f.c.lot).padStart(2, '0') + ' | `' + cat(f.s.category) + '` | `' + f.s.semantic_type + '` | ' + fonctions(f.s) + ' | ' + f.regles.join(', ') + ' | **' + F[f.id].v + '** | — |'));
P.push('', '**Neuf sens examinés : ' + nConf + ' conformes, ' + nEcart + ' écart, aucun sens suspendu.** **Aucune correction n\'est proposée** : V1-6 reste libre, et la liste globale reste à 180 corrections dans 161 ENTRY, toutes non appliquées.', '');
P.push("**Comment l'hypothèse R2 a été employée.** L'arbitrage d'A1 permet de partir de « période désignée comme découpage du temps, sans type terminal plus précis dans A2-ST », à condition d'examiner chaque fiche en entier. Pour huit sens, la fiche désigne bien une portion du temps (un jour, un mois, une année, une partie de journée) : l'hypothèse s'y vérifie, fiche par fiche. **Pour 今, elle ne se transpose pas telle quelle** (un moment, non une période) : le verdict y est motivé à part. Aucun verdict n'est tiré de la seule appartenance à la catégorie `temps`.", '');
P.push('## 2. Méthode', '');
P.push("Pour chacun des neuf sens : la fiche source entière et ses anciens exemples ; l'état publié de l'ENTRY et du sens ; toutes les décisions de journal de l'ENTRY ; toutes les règles du criblage qui désignent le sens ; les corrections déjà retenues et le verdict de provenance des nuances (lot 2, clos, non rouvert) ; les autres sens publiés de `temps › moments_periodes`, comme comparables ; les normes : A2-ST-v1 (§3, §4, §5), A2-L3-v1 (« Moments & périodes → Parties de la journée ; Présent ; Passé ; Futur »), A6, A7 (définition de `deictique`, axe du temps), A9 (§4.2, pour ce qu'il dit du rapport entre fonction et type).", '');
P.push("**Axes signalés** : les neuf sens ne sont désignés que par la règle " + reglesVues.map((r) => '`' + r + '`').join(', ') + " (axe " + axes.join(', ') + "). **Aucun n'est désigné par l'axe C7**, alors que tous portent `deictique` : le lot 12 est postérieur à A7, et chaque fonction y est posée par une décision qui le cite. J'ai néanmoins relu la fonction, la catégorie, les dimensions, les tags et les relations de chacun.", '');
P.push("**Fonction et type** : A7 ne dit rien du type. A9 (§4.2) énonce, pour ses six fonctions, qu'« un sens qui porte une fonction **et** désigne une entité, une occurrence, une condition ou une abstraction garde le type qui la décrit ». `deictique` n'est pas une des six ; je ne cite ce passage que comme principe voisin, et le type est motivé ici par la fiche seule.", '');
P.push("**Limites** : un comparable sert de contrôle, non de source ; je ne juge aucun sens hors des neuf ; rien n'est ajouté aux fiches.", '');
P.push('## 3. Comparables : les ' + mp.length + ' sens publiés de `temps › moments_periodes`', '');
P.push('| Sens | Mot | Traduction | Sous-catégorie | Type | Fonctions | Lot | Livraison du lot 3 |', '|---|---|---|---|---|---|---|---|');
for (const { e, s } of mp) P.push('| `' + s.id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | ' + (s.category.level_3 ? '`' + s.category.level_3 + '`' : '—') + ' | `' + s.semantic_type + '` | ' + fonctions(s) + ' | ' + String(candidats.get(s.id)?.lot ?? '?').padStart(2, '0') + ' | ' + (IDS.includes(s.id) ? '**A2**' : livraison.get(s.id) ?? 'hors des 377') + ' |');
P.push('', "Tous portent `concept_abstrait`. Les repères rapportés au moment où l'on parle portent `deictique` ; les parties de la journée prises en général (朝, 昼, 晩, 夜, 午前, 午後, 夕方) ne le portent pas, chacune par une décision qui cite A7 (D0798 à D0816). **Les trois parties de journée repérées par rapport au jour où l'on parle (今晩, 今朝, 昨夜) sont rangées sous `parties_de_la_journee`**, non sous `present` ou `passe` (réserve R5). 昨夜 est dans A3 : je ne le juge pas.", '');
P.push('## 4. Les neuf fiches d\'examen', '');
for (const f of fiches) {
  const X = F[f.id]; const s = f.s; const src = f.src;
  P.push('#### `' + f.id + '` · ' + f.e.word + ' (' + src.reading + ') · « ' + s.meaning.primary + ' » — proposé : **' + X.v + '**', '');
  P.push('- **Question** : le type `concept_abstrait` décrit-il ce sens ?');
  P.push('- **Règles du criblage** : ' + f.c.regles.map((g) => '`' + g.regle + '` (' + g.detail + ')').join(' ; ') + '. Aucun autre axe.');
  P.push('- **Fiche source** (`' + f.sid + '`, ' + src.type + ' ; ancien rangement `' + src.category + ' / ' + src.subcategory + '`) : traductions « ' + [src.meanings.primary, ...(src.meanings.secondary ?? [])].join(' ; ') + ' » ; particules ' + (src.particles?.length ? src.particles.join(', ') : 'aucune') + '. Nuance : « ' + strip(src.nuance) + ' » Exemple : « ' + strip(src.example?.japanese) + ' » — « ' + strip(src.example?.french) + ' »');
  P.push('- **Anciens exemples** (' + f.ex.length + ') : ' + (f.ex.length ? f.ex.map((q) => '« ' + strip(q.japanese) + ' » — « ' + strip(q.french ?? q.translation) + ' »').join(' ; ') : 'aucun') + '.');
  P.push('- **État publié** : sens ' + (f.e.senses.indexOf(s) + 1) + ' sur ' + f.e.senses.length + ' ; traduction « ' + s.meaning.primary + ' »' + (s.meaning.alternatives?.length ? ' (' + s.meaning.alternatives.join(', ') + ')' : '') + ' ; catégorie `' + cat(s.category) + '` ; type `' + s.semantic_type + '` ; dimensions ' + (s.dimensions?.length ? JSON.stringify(s.dimensions) : 'aucune') + ' ; fonctions ' + fonctions(s) + ' ; relations ' + (s.relations?.length ? s.relations.length : 'aucune') + ' ; particules ' + (s.particles?.length ? s.particles.join(', ') : 'aucune') + ' ; tags de l\'ENTRY ' + (f.e.tags?.length ? f.e.tags.join(', ') : 'aucun') + ' ; classe `' + f.e.linguistic.grammatical_class + '`.');
  P.push('- **Décisions de journal de l\'ENTRY** (' + f.dec.length + ', toutes validées) : ' + f.dec.map((d) => d.id.replace('A2-04-', '') + ' (lot ' + d.lot.slice(-2) + ', ' + d.kind + ', ' + d.field + ') : « ' + d.reason + ' »').join(' ; ') + (f.decType.length || f.ailleurs.length ? '' : ' **Aucune ne porte sur le type ni sur la catégorie, et aucune décision de type du journal ne nomme ce mot** (recherche faite par le script).'));
  P.push('- **Déjà arbitré sur cette ENTRY, non rouvert** : provenance des nuances (lot 2) : ' + (f.prov.length ? f.prov.join(' ; ') : 'aucune ligne dans le plan des 278') + ' ; corrections retenues, non appliquées : ' + (f.corr.length ? f.corr.join(' ; ') : 'aucune') + '.');
  P.push('- **Verdict proposé** : **' + X.v + '**.');
  P.push('- **Motivation** : ' + X.m);
  P.push('- **Réserve** : ' + X.r, '');
}
P.push('## 5. Réserves et points portés à l\'arbitrage', '');
P.push("**R4 · Aucun de ces types n'a de raison écrite.** " + sansDecType + " des " + fiches.length + " sens n'ont aucune décision de journal sur le type ni sur la catégorie, ni sur leur ENTRY ni ailleurs : le lot 12 a posé `concept_abstrait` et la sous-catégorie sans les motiver. Les seules raisons du lot 12 qui nomment le type sont celles des mots de fréquence (« même traitement que 毎年 et 毎月 (lot 0) : […] concept_abstrait »), qui ne concernent pas ces neuf sens. Les valeurs sont contrôlées ici directement contre A2-ST et A2-L3 ; **je ne propose pas d'écart pour une absence de raison**, le périmètre de la cohérence rétroactive ne qualifiant d'écart qu'une valeur contraire à la norme ou une raison périmée. Je le signale parce que la même situation se retrouvera dans A3 et A4.", '');
P.push("**R5 · 今晩 et 今朝 : deux sous-catégories possibles.** « La soirée du jour présent » est à la fois une partie de la journée et un moment du présent ; A2-L3 nomme les deux (« Parties de la journée » ; « Présent »), et le schéma ne porte qu'une sous-catégorie. Les données publiées retiennent `parties_de_la_journee` pour 今晩, 今朝 et 昨夜, de façon constante, sans décision écrite. Aucune norme ne dit laquelle prévaut ; la sous-catégorie retenue décrit le sens, et le repérage par rapport au présent est porté par la fonction `deictique`. **Je propose « conforme »**, et je signale le choix : s'il fallait au contraire `present`, ce serait un écart pour les deux sens, et la question se poserait pour 昨夜 (A3).", '');
P.push("**今 (point particulier, dit dans sa fiche)** : c'est le seul des neuf sens pour lequel l'hypothèse de R2 ne s'applique pas telle quelle. Le verdict est motivé sur la fiche.", '');
P.push("**Autres constats, sans effet sur les verdicts** : aucun des neuf sens ne porte de dimension, de relation, de particule ni de tag ; les décisions de tags (D0735, D0737, D0748, D0752, D0756, D0759, D0774, D0783, D0792) écartent `lieu_hotel` par le critère du lot 02, et aucune règle C8 ne les désigne ; l'ancien exemple de 今年 porte une coquille de traduction (« c'est année »), dans une source figée que je ne touche pas et qui n'est pas publiée dans les champs examinés.", '');
P.push("**Sur le plan des livraisons** : aucun ajustement n'est proposé.", '');
P.push('## 6. Contrôles de couverture', '');
P.push('| Contrôle | Résultat |', '|---|---|');
P.push('| Les sens de la livraison A2 du périmètre arbitré sont examinés, et eux seuls | ' + fiches.length + ' fiches, ' + new Set(fiches.map((f) => f.id)).size + ' identifiants distincts, identiques aux lignes A2 du périmètre |');
P.push('| Chaque sens est un candidat du criblage, hors des 147 | ' + fiches.length + ' sur ' + fiches.length + ' |');
P.push('| ENTRY concernées | ' + new Set(fiches.map((f) => f.eid)).size + ' |');
P.push('| Type publié de chaque sens | `concept_abstrait`, ' + fiches.length + ' sur ' + fiches.length + ' |');
P.push('| Fonction publiée de chaque sens | `deictique` seule, posée par une décision qui cite A7 : ' + fiches.length + ' sur ' + fiches.length + ' |');
P.push('| Règles du criblage relevées | ' + reglesVues.join(', ') + ' seulement ; axes : ' + axes.join(', ') + ' |');
P.push('| Décisions de journal lues | ' + fiches.reduce((n, f) => n + f.dec.length, 0) + ', toutes validées, aucune modifiée |');
P.push('| Verdicts proposés | ' + nConf + ' conformes, ' + nEcart + ' écart, 0 suspendu |');
P.push('| Corrections proposées | 0 ; V1-6 non attribué ; 180 corrections dans 161 ENTRY, inchangées et non appliquées |');
P.push('| Lot 3 : arbitrés à ce jour | 10 sens (A1) sur 377 |');
P.push('| Lot 3 après A2, **si la proposition est arbitrée** | ' + (10 + fiches.length) + ' sens sur 377 ; restent ' + (377 - 10 - fiches.length) + ', dont ' + (blocA - 10 - fiches.length) + ' du bloc A (livraisons A3 à A7) et 17 du bloc F, suspendu à E5 |');
P.push('', '## 7. Questions à l\'arbitrage', '');
P.push("1. Les neuf verdicts « conforme » sont-ils retenus ?", "2. **今** : le verdict, motivé sans l'hypothèse de R2, est-il retenu ?", "3. **R5** : la sous-catégorie `parties_de_la_journee` est-elle maintenue pour 今晩 et 今朝 ?", "4. **R4** : l'absence de raison écrite pour le type et la catégorie reste-t-elle un simple constat, comme je le propose ?", "5. L'autorisation d'examiner **A3**, seule.", '');
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot3-A2.md'), P.join(LF) + LF);
console.log('A2 : ' + fiches.length + ' sens, ' + new Set(fiches.map((f) => f.eid)).size + ' ENTRY ; ' + nConf + ' conformes, ' + nEcart + ' écart, 0 suspendu ; aucune correction ; règles : ' + reglesVues.join(', ') + ' ; sans décision de type ni de catégorie : ' + sansDecType + ' ; bloc A : ' + blocA + ' ; moments_periodes : ' + mp.length);
