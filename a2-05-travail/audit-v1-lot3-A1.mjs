// A2-05 · volet 1 · lot 3 · livraison pilote A1 : dix sens de type `concept_abstrait` (lots 06, 07 et 10). Lecture seule sur les données.
// Usage : node audit-v1-lot3-A1.mjs <racine du dépôt>   (réécrit docs/rapports/etape2-A2-05-volet1-lot3-A1.md)
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

const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/<\/?[A-Za-z]+>/g, '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const tous = vocab.flatMap((e) => e.senses.map((s) => ({ e, s })));
const candidats = new Map(crib.candidats.map((c) => [c.id, c]));
const LOT1 = ['v_221_s1', 'v_455_s2', 'v_504_s1', 'v_628_s1', 'v_663_s3'];

// L'arbitrage se renseigne ici, après la relecture : { date, texte: [...] }
const ARBITRAGE = { date: '2026-10-12', texte: [
  "Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur).",
  '',
  "**Les dix verdicts « conforme » sont retenus : 10 conformes, 0 écart, 0 suspendu, sans correction.** Les dix sens conservent `concept_abstrait` : 英語, 言葉 (sens 2), 冬, 夏, 春, 秋, 北, 南, 東 et 西. **V1-6 reste disponible** ; le bilan global reste à 180 corrections retenues dans 161 ENTRY, toutes non appliquées. La proposition et ses trois réserves sont conservées ci-dessous, telles qu'elles ont été livrées.",
  '',
  '| Réserve | Arbitrage |',
  '|---|---|',
  "| **R1 · langues** | `concept_abstrait` confirmé pour 英語 et 言葉 (sens 2) : « la distinction entre langue comme système et mot comme contenu est pertinente ». ひらがな et 漢字 sont inscrits comme comparables nécessitant une vérification documentaire distincte, **sans verdict ni ajout au périmètre des 377**. |",
  "| **R2 · saisons** | `concept_abstrait` confirmé pour les quatre saisons. Le raisonnement « période désignée comme découpage de l'année, sans type terminal plus précis dans A2-ST » **peut servir de base** aux autres sens temporels du bloc A, **mais chaque fiche doit être examinée intégralement : aucun verdict automatique** sur les autres sens temporels. |",
  "| **R3 · points cardinaux** | `concept_abstrait` confirmé pour 北, 南, 東 et 西, conformément à D0620. 右 et 左 sont inscrits comme comparables à vérifier séparément : **leur type `lieu` n'est ni validé ni infirmé par cet arbitrage** ; ils ne sont pas ajoutés aux 377 candidats sans accord distinct. |",
  '',
  "**Contrôles différés** : ひらがな, 漢字, 右 et 左 sont consignés dans une liste distincte de vérifications hors périmètre (bilan du volet 2, §8.35) ; leur cadre de contrôle sera proposé ultérieurement, sans examen lexical individuel non autorisé.",
  '',
  "**Suite** : A2 est autorisée, seule ; A3 ne commence pas avant l'arbitrage d'A2. G1 à G7 ne sont pas ouverts. **Lot 3 après A1 : 10 sens arbitrés sur 377 ; restent 367**, dont 59 du bloc A et 17 du bloc F, suspendu à E5."
] };

const IDS = ['v_136_s1', 'v_138_s2', 'v_264_s1', 'v_267_s1', 'v_271_s1', 'v_278_s1', 'v_349_s1', 'v_350_s1', 'v_355_s1', 'v_357_s1'];

const LANGUE = "Passé en revue contre les seize types d'A2-ST : une langue n'est ni une entité (personne, organisme, objet, matière, lieu, organisation, groupe), ni une occurrence, ni une condition attribuée à une entité. Dans ABSTRACT, ce n'est pas une quantité ; et `information_contenu` désigne un « contenu informationnel, données ou information représentable/transmissible indépendamment de son support matériel » : la langue est le système dans lequel un contenu s'exprime, non ce contenu.";
const SAISON = "Passé en revue contre les seize types d'A2-ST : une saison n'est ni une entité ni un lieu. Ce n'est pas une occurrence : la fiche ne la présente pas comme un fait qui survient ou comme un déroulement, mais comme une division de l'année que l'on caractérise. Ce n'est ni un état ni une propriété : dans les exemples, le froid ou la chaleur sont dits de la saison, qui en est le support et non la caractéristique. Ce n'est pas une `quantite_valeur` : la fiche ne mesure aucune durée. A2-ST n'a aucun type de période ; reste un concept non matériel de découpage du temps, que `concept_abstrait` décrit (« concept non matériel qui ne relève pas plus précisément d'un autre Semantic Type »). `null` (A6) aurait supposé qu'aucun type terminal ne décrive le sens, ce qui n'est pas le cas. **Catégorie** : `temps › moments_periodes`, arrêtée au niveau 2 ; les sous-catégories nommées par A2-L3 sont « Parties de la journée ; Présent ; Passé ; Futur », aucune ne convient, et le mot « saison » n'apparaît nulle part dans A2-L3 : D0460 dit vrai, et aucune sous-catégorie n'est inventée.";
const CARDINAL = "La fiche dit « nom de direction désignant le point cardinal » : elle ne nomme ni un endroit ni une chose. Dans son exemple, le point cardinal situe un lieu par rapport à un autre ; dans les anciens exemples, il donne une direction ou une orientation (に向かって, に向いて, の方, selon les fiches). `lieu` (« espace ou emplacement conceptualisé comme lieu ») n'est donc pas attesté par la fiche : le point cardinal repère, il ne nomme pas un emplacement. Ce n'est ni un objet, ni une occurrence, ni une condition attribuée à une entité, ni une quantité, ni un contenu. A2-ST, §4, range « orientation » parmi ce qui n'est pas un type : cela interdit de créer un type d'orientation ; A2-REL-v1.1 précise que les concepts d'orientation « peuvent continuer à être représentés par les domaines, dimensions, sens lexicaux ou autres couches appropriées ». Ici, l'orientation est portée par la catégorie (`direction_orientation › directions_cardinales`, sous-catégorie nommée par A2-L3), et le type dit seulement la nature de ce qui est désigné : un concept non matériel. D0620, qui écarte expressément `lieu` et l'objet, tient.";

const F = {
  v_136_s1: { v: 'conforme',
    m: "La fiche dit : « nom désignant la langue anglaise ». " + LANGUE + " Les exemples la présentent comme une matière que l'on étudie (un cours d'anglais, étudier l'anglais) et comme un moyen de s'exprimer (parler anglais, demander son chemin en anglais), jamais comme un message. `concept_abstrait` décrit ce sens ; ce n'est pas un type de secours, chaque autre type étant écarté pour une raison tirée de la fiche. **Catégorie** : `communication_langage › langues › langues` est la sous-catégorie nommée par A2-L3 (« Langues → Langues ; Traduction ; Interprétation ») ; elle décrit le sens.",
    r: "Aucune décision de journal ne motive ce type : la seule décision de l'ENTRY est un abandon de traduction (D0438). Le type a été posé au lot 06 sans raison écrite ; il est contrôlé ici directement contre A2-ST. Voir aussi la réserve R1 (§5) sur les systèmes d'écriture." },
  v_138_s2: { v: 'conforme',
    m: "La fiche dit : « un mot, une expression, la parole ou le langage en général », et donne « Langue » en traduction secondaire. D0436 (validée) en tire deux sens : « une unité ou ce qui est dit », et « un système de langue ». " + LANGUE + " Les deux sens de l'ENTRY portent des types différents parce qu'ils désignent des choses différentes (A2-ST, §5, règles 1 et 3) : le sens 1, « Mot », est un contenu (`information_contenu`) ; le sens 2 est le système. `concept_abstrait` décrit ce sens. **Catégorie** : la même que 英語, pour la même raison.",
    r: "Ce sens n'est attesté que par la traduction secondaire « Langue » et par les mots « le langage en général » ; l'exemple de la fiche illustre le sens 1, et l'ancien exemple qui dit その外国の言葉 est traduit « les mots de cette langue étrangère ». C'est la fragilité du découpage lui-même (D0436, validée), qui n'est pas l'objet de l'axe C3 et que je ne rouvre pas. La nuance de ce sens porte déjà une correction retenue (V2-90, provenance), non appliquée et sans effet sur le type. D0436 nomme le système de langue sans nommer le type." },
  v_264_s1: { v: 'conforme',
    m: "La fiche dit : « nom désignant la saison de l'hiver, la plus froide de l'année ». " + SAISON,
    r: "Voir la réserve R2 (§5) : la raison de D0460 procède par analogie, et le même raisonnement vaut pour les autres sens de `temps › moments_periodes`, non examinés ici." },
  v_267_s1: { v: 'conforme',
    m: "La fiche dit : « nom désignant la saison estivale, la plus chaude de l'année ». " + SAISON,
    r: "Voir la réserve R2 (§5). La nuance de l'ENTRY porte déjà une correction retenue (V2-16, provenance), non appliquée et sans effet sur le type." },
  v_271_s1: { v: 'conforme',
    m: "La fiche dit : « nom désignant la saison du printemps, caractérisée par l'éclosion des fleurs de cerisier ». " + SAISON + " C'est sur cette ENTRY qu'est inscrite D0460, qui vaut pour les quatre saisons.",
    r: "Voir la réserve R2 (§5)." },
  v_278_s1: { v: 'conforme',
    m: "La fiche dit : « nom désignant la saison de l'automne, caractérisée par le jaunissement et la chute des feuilles ». " + SAISON,
    r: "Voir la réserve R2 (§5)." },
  v_349_s1: { v: 'conforme',
    m: CARDINAL,
    r: "Voir la réserve R3 (§5) : 右 et 左, dans la même catégorie de niveau 2, sont publiés `lieu`. La nuance de l'ENTRY porte déjà une correction retenue (V2-118, provenance), non appliquée et sans effet sur le type." },
  v_350_s1: { v: 'conforme',
    m: CARDINAL,
    r: "Voir la réserve R3 (§5). La nuance de l'ENTRY porte déjà une correction retenue (V2-119, provenance), non appliquée et sans effet sur le type." },
  v_355_s1: { v: 'conforme',
    m: CARDINAL + " C'est sur cette ENTRY qu'est inscrite D0620, qui vaut pour les quatre points cardinaux.",
    r: "Voir la réserve R3 (§5)." },
  v_357_s1: { v: 'conforme',
    m: CARDINAL,
    r: "Voir la réserve R3 (§5)." }
};

// Décisions de type inscrites sur une ENTRY et valant pour d'autres (« Vaut pour … »)
const PARTAGEE = { v_264_s1: 'D0460', v_267_s1: 'D0460', v_278_s1: 'D0460', v_349_s1: 'D0620', v_350_s1: 'D0620', v_357_s1: 'D0620' };
const raison = (n) => { const d = journal.find((x) => x.id === 'A2-04-' + n); if (!d || d.status !== 'validated' || !/Vaut pour/.test(d.reason)) throw new Error(n + ' : décision partagée introuvable'); return d.reason; };

// --- Relevés et contrôles
const fiches = IDS.map((id) => {
  const eid = id.replace(/_s\d+$/, ''); const sid = 'n5_' + eid;
  const e = vocab.find((x) => x.id === eid); const s = e?.senses.find((x) => x.id === id); const src = sources.get(sid); const c = candidats.get(id);
  if (!e || !s || !src || !c) throw new Error(id + ' : sens, fiche source ou candidat introuvable');
  if (c.dans147.length) throw new Error(id + ' : sens des 147, hors du lot 3');
  if (LOT1.includes(id)) throw new Error(id + ' : sens du lot 1');
  if (s.semantic_type !== 'concept_abstrait') throw new Error(id + ' : type publié inattendu');
  if (!F[id]) throw new Error(id + ' : fiche d\'examen absente');
  const regles = c.regles.map((g) => g.regle);
  const corr = bilanV2.split(LF).filter((l) => /^\| (V[12]-\d+|\d+) \|/.test(l) && l.includes('`' + eid)).map((l) => l.split('|')[1].trim() + ' (' + l.split('|')[2].trim() + ', ' + l.split('|')[5].trim() + ')');
  const prov = bilanProv.split(LF).filter((l) => /^\| \d+ \|/.test(l) && l.includes('`' + eid)).map((l) => { const k = l.split('|').map((x) => x.trim()); return k[3] + ' : ' + k[7] + ' (' + k[2] + ')'; });
  const dec = journal.filter((d) => d.entry === sid);
  if (dec.some((d) => d.status !== 'validated')) throw new Error(id + ' : décision non validée');
  return { id, eid, sid, e, s, src, c, regles, corr, prov, dec, ex: anciens.vocab?.[sid] ?? [] };
});
if (new Set(fiches.map((f) => f.id)).size !== 10) throw new Error('dix sens distincts attendus');
const axes = [...new Set(fiches.flatMap((f) => f.c.regles.map((g) => g.axe)))];
const reglesVues = [...new Set(fiches.flatMap((f) => f.regles))];
// La ligne A1 du périmètre arbitré doit nommer ces dix sens, et eux seuls
const ligneA1 = perimetre.split(LF).filter((l) => /^\| \d+ \| A1 \|/.test(l));
const idsA1 = ligneA1.map((l) => l.split('|')[3].trim().replace(/`/g, ''));
if (idsA1.length !== 10 || IDS.some((id) => !idsA1.includes(id))) throw new Error('A1 : les dix sens ne sont pas ceux du périmètre arbitré');
const nConf = fiches.filter((f) => F[f.id].v === 'conforme').length; const nEcart = fiches.filter((f) => F[f.id].v === 'écart').length;
if (nConf + nEcart !== 10) throw new Error('verdict inattendu');
const nonAbstraits = tous.filter(({ s }) => s.semantic_type === 'concept_abstrait').length;

const fonctions = (s) => { const f = [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])]; return f.length ? f.map((x) => '`' + x + '`').join(', ') : 'aucune'; };
const comparables = (titre, filtre, note) => {
  const L = tous.filter(filtre);
  return ['**' + titre + '** (' + L.length + ' sens publiés) :', '', '| Sens | Mot | Traduction | Catégorie | Type | Candidat des 377 | Dans A1 |', '|---|---|---|---|---|---|---|',
    ...L.map(({ e, s }) => { const c = candidats.get(s.id); const dans = c && !c.dans147.length && !LOT1.includes(s.id); return '| `' + s.id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | `' + cat(s.category) + '` | `' + s.semantic_type + '` | ' + (dans ? 'oui' : c ? 'non (arbitré ailleurs)' : 'non') + ' | ' + (IDS.includes(s.id) ? '**oui**' : '—') + ' |'; }), '', note, ''];
};
const mp = tous.filter(({ s }) => s.category?.level_2 === 'moments_periodes');
const mpTypes = [...new Set(mp.map(({ s }) => s.semantic_type))];
const tps = tous.filter(({ s }) => s.semantic_type === 'concept_abstrait' && s.category?.level_1 === 'temps').length;

const P = [];
P.push("# Étape 2 · A2-05 · Volet 1 · Lot 3 — livraison pilote A1 : dix sens de type `concept_abstrait`", '');
P.push('**Date** : 2026-10-12');
P.push(ARBITRAGE
  ? '**Statut** : **arbitré le ' + ARBITRAGE.date + '** (§0). La proposition est conservée telle qu\'elle a été livrée.'
  : "**Statut** : **proposition, non arbitrée.** Les verdicts ci-dessous sont proposés ; aucun n'est acquis. Écrit par `a2-05-travail/audit-v1-lot3-A1.mjs`, en lecture seule sur les données : aucune donnée publiée, aucune fiche source, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n'est modifié ; aucune décision historique n'est réécrite. **A2 n'est pas commencé ; G1 à G7 ne sont pas ouverts ; aucune des 180 corrections retenues n'est appliquée.**");
P.push('', "**Autorisation** : arbitrage du périmètre du lot 3, du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Réaliser uniquement l'audit des dix sens suivants […]. Examiner leur type `concept_abstrait` au regard d'A2-ST et des comparables, ainsi que tous leurs autres axes C1 à C10 éventuels. »", '');
if (ARBITRAGE) P.push('## 0. Arbitrage', '', ...ARBITRAGE.texte, '');
P.push('## 1. Résultat proposé', '');
P.push('| N° | Sens | Mot | Traduction | Lot | Catégorie publiée | Type publié | Règles du criblage | Verdict proposé | Correction |', '|---|---|---|---|---|---|---|---|---|---|');
fiches.forEach((f, i) => P.push('| ' + (i + 1) + ' | `' + f.id + '` | ' + f.e.word + ' | ' + f.s.meaning.primary + ' | ' + String(f.c.lot).padStart(2, '0') + ' | `' + cat(f.s.category) + '` | `' + f.s.semantic_type + '` | ' + f.regles.join(', ') + ' | **' + F[f.id].v + '** | — |'));
P.push('', '**Dix sens examinés : ' + nConf + ' conformes, ' + nEcart + ' écart, aucun sens suspendu.** **Aucune correction n\'est proposée** : le numéro V1-6 reste libre, et la liste globale reste à 180 corrections dans 161 ENTRY, toutes non appliquées.', '');
P.push("**Ce que ce résultat veut dire, et ce qu'il ne veut pas dire.** « Conforme » dit que le type publié est décrit par la définition d'A2-ST quand on le confronte à la fiche entière, et que les types voisins sont écartés pour une raison tirée de la fiche. Il ne dit pas que le type était motivé à l'origine (deux des dix sens n'ont aucune décision de type), ni que les sens comparables sont eux-mêmes conformes. **Trois réserves sont portées à l'arbitrage (§5)** ; la troisième signale un traitement différent de 右 et 左, hors du périmètre.", '');
P.push('## 2. Méthode', '');
P.push("Pour chacun des dix sens : la fiche source entière (traductions, particules, nuance, exemple) et ses anciens exemples ; l'état publié de l'ENTRY et du sens ; toutes les décisions de journal de l'ENTRY ; toutes les règles du criblage qui désignent le sens ; les corrections déjà retenues sur l'ENTRY et le verdict de provenance de ses nuances (lot 2, clos, non rouvert) ; les sens publiés de la même catégorie, comme comparables ; les normes : A2-ST-v1 (§3, définitions ; §4, ce qui n'est pas un type ; §5, règles d'utilisation), A2-L3-v1 (sous-catégories nommées), A6 (`semantic_type: null`), A2-REL-v1.1 (retrait d'`oriented_toward`).", '');
P.push("**Axes signalés** : les dix sens ne sont désignés que par la règle " + reglesVues.map((r) => '`' + r + '`').join(', ') + " (axe " + axes.join(', ') + ") : population imposée, « type `concept_abstrait`, examen individuel » (arbitrage R2 du criblage). **Aucun n'est désigné par un autre axe** (C1, C2, C4, C5, C7, C8, C10, point réservé) : contrôle fait par le script sur le résultat du criblage. J'ai néanmoins relu, pour chacun, la catégorie, les dimensions, les fonctions, les tags et les relations publiés ; ce relevé figure dans chaque fiche.", '');
P.push("**Question posée à chaque sens** : le type `concept_abstrait` décrit-il ce sens, ou n'est-il qu'un type de secours (A2-ST, §3 : « ce type ne doit jamais devenir une catégorie de secours » ; §5, règle 8) ? Un type est tenu pour décrit quand chaque autre type terminal est écarté pour une raison que la fiche donne, et que `null` (A6) ne s'impose pas.", '');
P.push("**Limites** : un comparable sert de contrôle, non de source, et n'impose aucune symétrie ; je ne juge aucun sens hors des dix ; je n'ajoute aucun sens, aucune lecture ni aucune connaissance extérieure aux fiches.", '');
P.push('## 3. Comparables', '');
P.push(...comparables('`communication_langage › langues`, et les systèmes d\'écriture', ({ s }) => s.category?.level_1 === 'communication_langage' && (s.category.level_2 === 'langues' || s.category.level_3 === 'systemes_d_ecriture' || s.id === 'v_138_s1'),
  "英語 et 言葉 (sens 2) sont les deux seuls `concept_abstrait` de la catégorie de premier niveau `communication_langage`. Les systèmes d'écriture (ひらがな, 漢字) et 字 « Caractère » sont `information_contenu` ; aucune décision de journal ne motive ces types (réserve R1)."));
P.push(...comparables('`temps › moments_periodes`, sens sans sous-catégorie', ({ s }) => s.category?.level_2 === 'moments_periodes' && !s.category.level_3,
  "Les " + mp.length + " sens publiés de `temps › moments_periodes`, tous niveaux confondus, portent le type " + mpTypes.map((t) => '`' + t + '`').join(', ') + " : aucun autre type n'y est employé. Sur les " + nonAbstraits + " sens publiés de type `concept_abstrait`, " + tps + " sont dans la catégorie `temps` (réserve R2). 夏休み et 休み ont été rangés au lot 13 « comme les saisons du lot 07 » (D0845)."));
P.push(...comparables('`espace_proprietes_spatiales`, noms', ({ e, s }) => s.category?.level_1 === 'espace_proprietes_spatiales' && e.linguistic.grammatical_class === 'nom',
  "Les noms de position du lot 10 sont `lieu` (上, 下, 中, 外, 前, 後ろ, 横, 角…) ; les quatre points cardinaux sont les seuls noms d'espace de type `concept_abstrait`. **右 et 左, dans la même catégorie de niveau 2 que les points cardinaux, sont `lieu`**, et ne sont pas candidats (réserve R3). 表 est publié sans type ; le rapport d'audit du volet 2 porte pour lui le verdict C (`null` → `lieu`), non appliqué."));
P.push('## 4. Les dix fiches d\'examen', '');
for (const f of fiches) {
  const X = F[f.id]; const s = f.s; const src = f.src;
  P.push('#### `' + f.id + '` · ' + f.e.word + ' (' + src.reading + ') · « ' + s.meaning.primary + ' » — proposé : **' + X.v + '**', '');
  P.push('- **Question** : le type `concept_abstrait` décrit-il ce sens ?');
  P.push('- **Règles du criblage** : ' + f.c.regles.map((g) => '`' + g.regle + '` (' + g.detail + ')').join(' ; ') + '. Aucun autre axe.');
  P.push('- **Fiche source** (`' + f.sid + '`, ' + src.type + ' ; ancien rangement `' + src.category + ' / ' + src.subcategory + '`) : traductions « ' + [src.meanings.primary, ...(src.meanings.secondary ?? [])].join(' ; ') + ' » ; particules ' + (src.particles?.length ? src.particles.join(', ') : 'aucune') + '. Nuance : « ' + strip(src.nuance) + ' » Exemple : « ' + strip(src.example?.japanese) + ' » — « ' + strip(src.example?.french) + ' »');
  P.push('- **Anciens exemples** (' + f.ex.length + ') : ' + (f.ex.length ? f.ex.map((q) => '« ' + strip(q.japanese) + ' » — « ' + strip(q.french ?? q.translation) + ' »').join(' ; ') : 'aucun') + '.');
  P.push('- **État publié** : sens ' + (f.e.senses.indexOf(s) + 1) + ' sur ' + f.e.senses.length + ' ; traduction « ' + s.meaning.primary + ' »' + (s.meaning.alternatives?.length ? ' (' + s.meaning.alternatives.join(', ') + ')' : '') + ' ; catégorie `' + cat(s.category) + '` ; type `' + s.semantic_type + '` ; dimensions ' + (s.dimensions?.length ? JSON.stringify(s.dimensions) : 'aucune') + ' ; fonctions ' + fonctions(s) + ' ; relations ' + (s.relations?.length ? s.relations.length : 'aucune') + ' ; particules ' + (s.particles?.length ? s.particles.join(', ') : 'aucune') + ' ; tags de l\'ENTRY ' + (f.e.tags?.length ? f.e.tags.join(', ') : 'aucun') + ' ; classe `' + f.e.linguistic.grammatical_class + '`.' + (f.e.senses.length > 1 ? ' Autres sens : ' + f.e.senses.filter((x) => x !== s).map((x) => '« ' + x.meaning.primary + ' » (`' + cat(x.category) + '`, `' + x.semantic_type + '`)').join(' ; ') + '.' : ''));
  P.push('- **Décisions de journal de l\'ENTRY** (' + f.dec.length + ', toutes validées) : ' + f.dec.map((d) => d.id.replace('A2-04-', '') + ' (lot ' + d.lot.slice(-2) + ', ' + d.kind + ', ' + d.field + ') : « ' + d.reason + ' »').join(' ; ') + (f.dec.some((d) => /semantic_type/.test(d.field) || /concept_abstrait/.test(d.reason)) ? '' : PARTAGEE[f.id] ? ' Aucune ne porte sur le type ; **la décision de type est ' + PARTAGEE[f.id] + ', inscrite sur une autre ENTRY et valant expressément pour celle-ci** : « ' + raison(PARTAGEE[f.id]) + ' »' : (() => { const ailleurs = journal.filter((d) => d.entry !== f.sid && d.reason.includes(f.e.word) && /concept_abstrait|semantic_type/.test(d.reason + ' ' + d.field)); if (ailleurs.length) throw new Error(f.id + ' : décision de type ailleurs, ' + ailleurs.map((d) => d.id).join(', ')); return ' **Aucune décision de cette ENTRY ne porte sur le type, et aucune décision de type du journal ne nomme ce mot** (recherche faite par le script).'; })()));
  P.push('- **Déjà arbitré sur cette ENTRY, non rouvert** : provenance des nuances (lot 2) : ' + (f.prov.length ? f.prov.join(' ; ') : 'aucune ligne dans le plan des 278') + ' ; corrections retenues, non appliquées : ' + (f.corr.length ? f.corr.join(' ; ') : 'aucune') + '.');
  P.push('- **Verdict proposé** : **' + X.v + '**.');
  P.push('- **Motivation** : ' + X.m);
  P.push('- **Réserve** : ' + X.r, '');
}
P.push('## 5. Réserves et points portés à l\'arbitrage', '');
P.push("**R1 · Langues et systèmes d'écriture.** Deux des dix types (英語, 言葉 sens 2) n'ont aucune raison journalisée. Dans la même catégorie de premier niveau, ひらがな et 漢字 (`systemes_d_ecriture`) sont publiés `information_contenu`, eux aussi sans décision de type. Une langue et un système d'écriture sont l'un et l'autre des systèmes ; les fiches de ひらがな et de 漢字 ne sont pas dans les dix et je ne les ai pas jugées : elles peuvent désigner des signes, qui sont un contenu. **Je signale la différence sans la qualifier.** Ces deux sens ne sont pas candidats des 377 : ils ne seront examinés par aucune livraison du plan.", '');
P.push("**R2 · Les saisons, et la concentration du type dans la catégorie `temps`.** La raison de D0460 justifie le type par analogie (« comme les repérages temporels du lot 0 »), non par la définition d'A2-ST ; contrôlée directement contre A2-ST, la valeur tient, et je ne propose pas d'écart de justification, la raison n'invoquant aucune règle remplacée (axe C10 non signalé par le criblage). **Mais " + tps + " des " + nonAbstraits + " `concept_abstrait` publiés sont des sens de temps**, et tous les sens de `moments_periodes` portent ce type : le raisonnement tenu ici pour les quatre saisons (« A2-ST n'a aucun type de période ; un découpage du temps est un concept non matériel ») sera celui de la plupart des livraisons A2 à A7. **Si l'arbitrage le refuse, il vaut mieux le dire maintenant** : l'issue contraire serait `semantic_type: null` (A6) pour les repères temporels, en tenant que `concept_abstrait` y sert de type de secours. Je ne la propose pas : A6 demande qu'aucun type terminal ne décrive le sens, et une période désignée par un nom est bien un concept non matériel.", '');
P.push("**R3 · Les points cardinaux, et 右 et 左.** C'est le point le plus fragile de la livraison. 右 « Droite » et 左 « Gauche » (`direction_orientation › gauche_droite`) sont publiés `lieu` ; les quatre points cardinaux (`direction_orientation › directions_cardinales`) sont `concept_abstrait`. Leurs fiches ne disent pas la même chose : celles de 右 et 左 disent « nom de position ou de direction désignant le côté droit [gauche] par rapport à un point de repère » ; celles des points cardinaux disent seulement « nom de direction désignant le point cardinal ». La différence de type peut donc se fonder sur les fiches (un côté est un emplacement ; un point cardinal ne l'est pas), mais **aucune décision de journal ne motive le type de 右 et de 左** (leurs seules décisions, D0610 et D0611, portent sur le tag `lieu_gare`), et D0620 ne s'y compare pas. 右 et 左 ne sont ni candidats des 377, ni dans les 147 : **je ne les juge pas, et le périmètre arbitré interdit de les ajouter**. Deux issues contraires existent pour les points cardinaux, que je ne propose pas : `lieu`, par symétrie avec 右 et 左 (ce serait imposer une symétrie que les fiches ne portent pas, et contredire D0620) ; `null` (A6), en tenant qu'« orientation » n'est pas un type (A2-ST, §4), comme D0604 l'avait fait pour 表 avec « partie » (raisonnement que le rapport d'audit du volet 2 n'a pas suivi, son verdict pour 表 étant `lieu`). **Question à l'arbitrage** : le type de 右 et de 左 doit-il être examiné, et dans quel cadre, puisqu'ils sont hors du lot 3 ?", '');
P.push("**Autres constats, sans effet sur les verdicts** : aucun des dix sens ne porte de dimension, de fonction, de relation, de particule ni de tag, et aucune règle du criblage n'en réclame ; les fiches des quatre saisons mentionnent des compteurs (回, 季), sans effet sur `counter`, réservé aux ENTRY qui sont elles-mêmes des compteurs ; l'axe C6 (relations) n'est pas examiné ici et relève du rapport séparé de conclusion du criblage. Les corrections de nuance déjà retenues sur quatre de ces ENTRY (V2-16, V2-90, V2-118, V2-119) ne portent sur aucun champ examiné ici.", '');
P.push("**Sur le plan des livraisons** : aucun ajustement n'est proposé. Le pilote réunit trois questions sans rapport (langues, saisons, points cardinaux), parce que le bloc A est découpé par lot ; cela n'a pas gêné l'examen, chaque question tenant en quelques sens.", '');
P.push('## 6. Contrôles de couverture', '');
P.push('| Contrôle | Résultat |', '|---|---|');
P.push('| Les dix sens autorisés sont examinés, et eux seuls | ' + fiches.length + ' fiches, ' + new Set(fiches.map((f) => f.id)).size + ' identifiants distincts, identiques à la ligne A1 du périmètre arbitré |');
P.push('| Chaque sens est un candidat du criblage, hors des 147 et hors du lot 1 | 10 sur 10 |');
P.push('| ENTRY concernées | ' + new Set(fiches.map((f) => f.eid)).size + ' |');
P.push('| Type publié de chaque sens | `concept_abstrait`, 10 sur 10 |');
P.push('| Règles du criblage relevées | ' + reglesVues.join(', ') + ' seulement ; axes : ' + axes.join(', ') + ' |');
P.push('| Décisions de journal lues | ' + fiches.reduce((n, f) => n + f.dec.length, 0) + ', toutes validées, aucune modifiée |');
P.push('| Verdicts proposés | ' + nConf + ' conformes, ' + nEcart + ' écart, 0 suspendu |');
P.push('| Corrections proposées | 0 ; V1-6 non attribué ; 180 corrections dans 161 ENTRY, inchangées et non appliquées |');
P.push('| Lot 3 après A1, **si la proposition est arbitrée** | 10 sens sur 377 ; restent 367, dont 59 du bloc A (livraisons A2 à A7) et 17 du bloc F, suspendu à E5 |');
P.push('', "**Tant qu'A1 n'est pas arbitrée, aucun des 377 candidats n'est arbitré.**", '');
P.push('## 7. Questions à l\'arbitrage', '');
P.push("1. Les dix verdicts « conforme » sont-ils retenus ?", "2. **R2** : le raisonnement tenu pour les saisons (pas de type de période dans A2-ST ; un découpage du temps est un `concept_abstrait`) est-il accepté comme base d'examen des autres sens de temps du bloc A, chacun restant jugé sur sa fiche ?", "3. **R3** : le type `concept_abstrait` des points cardinaux est-il maintenu ? Le type de 右 et de 左, hors du lot 3, doit-il être examiné, et dans quel cadre ?", "4. **R1** : la différence entre langues (`concept_abstrait`) et systèmes d'écriture (`information_contenu`), hors du lot 3, appelle-t-elle un examen ?", "5. L'autorisation d'examiner **A2**, seule.", '');
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot3-A1.md'), P.join(LF) + LF);
console.log('A1 : ' + fiches.length + ' sens, ' + new Set(fiches.map((f) => f.eid)).size + ' ENTRY ; ' + nConf + ' conformes, ' + nEcart + ' écart, 0 suspendu ; aucune correction ; règles : ' + reglesVues.join(', ') + ' ; concept_abstrait publiés : ' + nonAbstraits + ', dont temps : ' + tps + ' ; moments_periodes : ' + mp.length + ' sens, types : ' + mpTypes.join(', '));
