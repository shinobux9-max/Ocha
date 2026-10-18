// A2-05 · volet 1 · lot 3 · livraison A3 : neuf sens de type `concept_abstrait` du lot 12 (repères temporels, suite). Lecture seule sur les données.
// Usage : node audit-v1-lot3-A3.mjs <racine du dépôt>   (réécrit docs/rapports/etape2-A2-05-volet1-lot3-A3.md)
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
const arbitre = (p) => /^\*\*Statut\*\* : \*\*arbitré le /m.test(txt(p));
if (!arbitre('docs/rapports/etape2-A2-05-volet1-lot3-perimetre.md')) throw new Error('le périmètre du lot 3 ne porte pas son arbitrage');
for (const l of ['A1', 'A2']) if (!arbitre('docs/rapports/etape2-A2-05-volet1-lot3-' + l + '.md')) throw new Error(l + ' ne porte pas son arbitrage : A3 ne peut pas être livrée');

const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/[a-z]+>/g, '$1').replace(/<\/?[A-Za-z]+>/g, '').replace(/\*\*/g, '').replace(/\*/g, '').replace(/_/g, '').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const tous = vocab.flatMap((e) => e.senses.map((s) => ({ e, s })));
const candidats = new Map(crib.candidats.map((c) => [c.id, c]));
const livraison = new Map([...perimetre.matchAll(/^\| \d+ \| ([A-F]\d+) \| `((?:hj_)?v_\d+_s\d+)` \|/gm)].map((m) => [m[2], m[1]]));
if (livraison.size !== 377) throw new Error('périmètre : 377 candidats attendus, lus ' + livraison.size);
const DEJA = ['A1', 'A2'];

// L'arbitrage se renseigne ici, après la relecture : { date, texte: [...] }
const ARBITRAGE = { date: '2026-10-12', texte: [
  "Arbitrage du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur).",
  '',
  "**Les neuf verdicts « conforme » sont retenus : 9 conformes, 0 écart, 0 suspendu, aucune correction.** Les neuf sens conservent leurs types, catégories et fonctions publiés : 今週, 先月, 先週, 午前, 去年, 夜, 明日, 昨夜 et 昨日. **V1-6 reste libre** ; les 180 corrections dans 161 ENTRY restent retenues et non appliquées. La proposition est conservée ci-dessous, telle qu'elle a été livrée.",
  '',
  '| Point | Arbitrage |',
  '|---|---|',
  "| **昨夜** | `parties_de_la_journee` et `deictique` sont conservées : « la catégorie décrit la partie de journée ; la fonction décrit le repérage par rapport au moment de l'énonciation. Les deux sont justifiés séparément par la fiche ». |",
  "| **去年** | `deictique` confirmée : « les traductions et les exemples établissent le repérage temporel, même si la nuance isolée serait insuffisante ». |",
  "| **R4** | conservé comme constat d'absence de décision historique sur les types et les catégories, sans en faire un écart. |",
  '',
  "**Lot 3 : 28 sens arbitrés sur 377 ; 349 restent**, dont 41 du bloc A et les 17 du bloc F, suspendu. **Suite** : A4 est autorisée, seule ; A5 ne commence pas avant l'arbitrage d'A4. Les arbitrages d'A1 à A3 servent de comparables, jamais de verdicts automatiques."
] };

const IDS = ['v_304_s1', 'v_305_s1', 'v_306_s1', 'v_310_s1', 'v_312_s1', 'v_315_s1', 'v_318_s1', 'v_319_s1', 'v_320_s1'];

const REVUE = (quoi, exemples) => "Passé en revue contre A2-ST, sur cette fiche : " + quoi + " n'est ni une entité ni un lieu. Ce n'est pas une occurrence : la fiche ne décrit aucun fait qui survient ; dans ses exemples, " + exemples + ". Ce n'est ni un état ni une propriété, rien n'y étant attribué à une entité. Ce n'est pas une `quantite_valeur` : la fiche ne mesure aucune durée, elle désigne une portion du temps. A2-ST n'a aucun type de période ; reste un concept non matériel de repérage dans le temps, que `concept_abstrait` décrit. `null` (A6) supposerait qu'aucun type terminal ne décrive le sens, ce qui n'est pas le cas.";
const DEIXIS = (d, quoi) => " **Fonction, examinée à part** : `deictique`, posée par " + d + " selon A7 (axe du temps). La définition d'A7 demande que le repérage dépende directement du moment d'énonciation : la fiche repère " + quoi + ". La fonction est donc décrite par la fiche ; elle ne décide pas du type.";
const SANS = (d, mot) => " **Fonction, examinée à part** : aucune. " + d + " refuse `deictique` en citant A7 : « " + mot + " désigne une partie de la journée en général, sans repérage par rapport au moment de l'énonciation ». La fiche le confirme : elle ne rapporte cette partie de journée à aucun jour particulier, et ses exemples l'emploient pour une habitude comme pour un jour donné.";

const F = {
  v_304_s1: { v: 'conforme',
    m: "La fiche dit : « désignant la semaine en cours ». " + REVUE('une semaine désignée comme telle', "c'est la semaine où l'on est occupé, où une réunion est prévue, où il pleut souvent") + " **Catégorie** : `temps › moments_periodes › present`, sous-catégorie nommée par A2-L3 ; la semaine désignée est celle où l'on parle." + DEIXIS('D0766', "la semaine par rapport au moment où l'on parle (« en cours »)"),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie (constat, selon l'arbitrage de R4)." },
  v_305_s1: { v: 'conforme',
    m: "La fiche dit : « désignant le mois qui vient de s'écouler ». " + REVUE('un mois désigné comme tel', "c'est le mois où l'on a acheté une voiture, commencé un travail, beaucoup voyagé") + " **Catégorie** : `temps › moments_periodes › passe` ; le mois désigné est passé." + DEIXIS('D0778', "le mois par rapport au moment où l'on parle (« qui vient de s'écouler »)"),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie (constat)." },
  v_306_s1: { v: 'conforme',
    m: "La fiche dit : « désignant la semaine qui vient de s'écouler ». " + REVUE('une semaine désignée comme telle', "c'est la semaine où l'on est allé à Tokyo, dont on rappelle le week-end, où un projet a commencé") + " **Catégorie** : `temps › moments_periodes › passe` ; la semaine désignée est passée." + DEIXIS('D0769', "la semaine par rapport au moment où l'on parle (« qui vient de s'écouler »)"),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie (constat)." },
  v_310_s1: { v: 'conforme',
    m: "La fiche dit : « désignant la période de la matinée précédant midi ». " + REVUE('une partie de journée désignée comme telle', "c'est la période où l'on travaille, où l'on fait le ménage, où il pleuvait ; un ancien exemple l'emploie devant une heure (午前 10 時)") + " L'emploi devant une heure ne change pas la nature de ce qui est désigné : la tranche de la journée où tombe cette heure. **Catégorie** : `temps › moments_periodes › parties_de_la_journee`, sous-catégorie nommée par A2-L3 ; c'est ce que la fiche décrit." + SANS('D0813', '午前'),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie (constat). La nuance de l'ENTRY porte déjà une correction retenue (V2-145, provenance), non appliquée et sans effet sur les champs examinés." },
  v_312_s1: { v: 'conforme',
    m: "La fiche dit : « désignant l'année précédente ». " + REVUE('une année désignée comme telle', "c'est l'année où l'on est allé au Japon, où l'on a obtenu son diplôme, que l'on compare à cette année") + " **Catégorie** : `temps › moments_periodes › passe` ; l'année désignée est passée." + DEIXIS('D0787', "l'année par rapport à celle où l'on parle ; un ancien exemple l'oppose à 今年"),
    r: "« L'année précédente », pris seul, pourrait se repérer par rapport à une autre année que celle de l'énonciation ; les traductions (« l'année dernière », « l'année passée ») et tous les exemples la rapportent au moment où l'on parle, et D0787 le dit. Je ne retiens pas d'écart. Aucune décision de journal ne porte sur le type ni sur la catégorie (constat)." },
  v_315_s1: { v: 'conforme',
    m: "La fiche dit : « désignant la période de la nuit ou de la soirée (après le coucher du soleil) ». " + REVUE('une partie de journée désignée comme telle', "c'est la période où l'on étudie chez soi, où la ville devient calme, où il fait sombre") + " **Catégorie** : `temps › moments_periodes › parties_de_la_journee` ; c'est ce que la fiche décrit." + SANS('D0810', '夜'),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie (constat)." },
  v_318_s1: { v: 'conforme',
    m: "La fiche dit : « nom temporel désignant le jour venant après aujourd'hui ». " + REVUE('un jour désigné comme tel', "c'est le jour où l'on fait des courses, où l'on part en voyage d'affaires, dont on annonce la météo") + " **Catégorie** : `temps › moments_periodes › futur` ; le jour désigné est à venir." + DEIXIS('D0741', "le jour par rapport à « aujourd'hui » ; D0743 a écarté la traduction « le jour suivant », qui se repère par rapport à un autre jour"),
    r: "Aucune décision de journal ne porte sur le type ni sur la catégorie (constat)." },
  v_319_s1: { v: 'conforme',
    m: "La fiche dit : « désignant la soirée ou la nuit d'hier ». " + REVUE('une partie de journée désignée comme telle', "c'est le soir où l'on a regardé la télévision, travaillé tard, où il a plu") + " **Catégorie, examinée à part** : `temps › moments_periodes › parties_de_la_journee`. La fiche désigne une soirée ou une nuit : c'est une partie de journée, et la sous-catégorie nommée par A2-L3 la décrit. Elle est aussi passée ; le schéma ne porte qu'une sous-catégorie, et aucune norme ne dit que « Passé » prévaudrait. La sous-catégorie publiée décrit le sens par elle-même, sans que j'aie besoin du précédent de 今晩 et de 今朝 ; ce précédent (arbitrage d'A2, R5) va dans le même sens." + DEIXIS('D0763', "la soirée par rapport à « hier », donc au jour où l'on parle ; deux anciens exemples l'opposent à 今朝") + " Catégorie et fonction disent deux choses différentes, chacune attestée par la fiche : quelle portion de la journée, et repérée par rapport à quel jour.",
    r: "Le rangement est le même que celui de 今晩 et de 今朝 ; s'il fallait `passe` pour 昨夜, il aurait fallu `present` pour eux, ce que l'arbitrage d'A2 n'a pas retenu. La lecture a été corrigée par D0842 (A8) et deux graphies ajoutées par D0764, sans rapport avec les champs examinés. Aucune décision de journal ne porte sur le type ni sur la catégorie (constat)." },
  v_320_s1: { v: 'conforme',
    m: "La fiche dit : « nom temporel désignant le jour précédant immédiatement aujourd'hui ». " + REVUE('un jour désigné comme tel', "c'est le jour où l'on a rencontré un ami, où il a plu, où l'on a acheté un livre") + " **Catégorie** : `temps › moments_periodes › passe` ; le jour désigné est passé." + DEIXIS('D0745', "le jour par rapport à « aujourd'hui » ; D0747 a écarté la traduction « la veille », qui se repère par rapport à un autre jour"),
    r: "La lecture a été corrigée par D0746 (A8), sans rapport avec les champs examinés. Aucune décision de journal ne porte sur le type ni sur la catégorie (constat)." }
};

// --- Relevés et contrôles
const fiches = IDS.map((id) => {
  const eid = id.replace(/_s\d+$/, ''); const sid = 'n5_' + eid;
  const e = vocab.find((x) => x.id === eid); const s = e?.senses.find((x) => x.id === id); const src = sources.get(sid); const c = candidats.get(id);
  if (!e || !s || !src || !c) throw new Error(id + ' : sens, fiche source ou candidat introuvable');
  if (c.dans147.length) throw new Error(id + ' : sens des 147, hors du lot 3');
  if (livraison.get(id) !== 'A3') throw new Error(id + ' : hors de la livraison A3 du périmètre arbitré');
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
  if (decFonc.length !== 1 || !/A7/.test(decFonc[0].reason)) throw new Error(id + ' : une décision de fonction citant A7 attendue');
  const refuse = /^Pas de fonction deictique/.test(decFonc[0].reason);
  if ((refuse && fonc.length) || (!refuse && fonc.join() !== 'deictique')) throw new Error(id + ' : fonction publiée contraire à sa décision');
  // Chaque numéro de décision cité dans la fiche d'examen doit appartenir à l'ENTRY
  for (const n of (F[id].m + F[id].r).match(/D\d{4}/g) ?? []) if (!dec.some((d) => d.id === 'A2-04-' + n)) throw new Error(id + ' : ' + n + ' cité, absent des décisions de l\'ENTRY');
  return { id, eid, sid, e, s, src, c, regles, corr, prov, dec, decType, ailleurs, fonc, refuse, ex: anciens.vocab?.[sid] ?? [] };
});
const idsA3 = [...livraison].filter(([, l]) => l === 'A3').map(([id]) => id);
if (idsA3.length !== IDS.length || idsA3.some((id) => !IDS.includes(id))) throw new Error('A3 : les sens ne sont pas ceux du périmètre arbitré');
const axes = [...new Set(fiches.flatMap((f) => f.c.regles.map((g) => g.axe)))];
const reglesVues = [...new Set(fiches.flatMap((f) => f.regles))];
const nConf = fiches.filter((f) => F[f.id].v === 'conforme').length; const nEcart = fiches.filter((f) => F[f.id].v === 'écart').length;
if (nConf + nEcart !== fiches.length) throw new Error('verdict inattendu');
const sansDecType = fiches.filter((f) => !f.decType.length && !f.ailleurs.length).length;
const avecDeixis = fiches.filter((f) => f.fonc.length).length;
const mp = tous.filter(({ s }) => s.category?.level_2 === 'moments_periodes');
const blocA = [...livraison].filter(([, l]) => /^A\d/.test(l)).length;
const dejaArb = [...livraison].filter(([, l]) => DEJA.includes(l)).length;
const fonctions = (s) => { const f = [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])]; return f.length ? f.map((x) => '`' + x + '`').join(', ') : 'aucune'; };

const P = [];
P.push("# Étape 2 · A2-05 · Volet 1 · Lot 3 — livraison A3 : neuf repères temporels de type `concept_abstrait` (lot 12, suite)", '');
P.push('**Date** : 2026-10-12');
P.push(ARBITRAGE
  ? '**Statut** : **arbitré le ' + ARBITRAGE.date + '** (§0). La proposition est conservée telle qu\'elle a été livrée.'
  : "**Statut** : **proposition, non arbitrée.** Les verdicts ci-dessous sont proposés ; aucun n'est acquis. Écrit par `a2-05-travail/audit-v1-lot3-A3.mjs`, en lecture seule sur les données : aucune donnée publiée, aucune fiche source, aucun lot, aucun journal, aucun registre, aucun outil ni aucun snapshot n'est modifié ; aucune décision historique n'est réécrite. **A4 n'est pas commencé ; le bloc F, les vérifications HP-1 à HP-4 et G1 à G7 ne sont pas ouverts ; aucune des 180 corrections retenues n'est appliquée.**");
P.push('', "**Autorisation** : arbitrage d'A2, du 2026-10-12 (ChatGPT, par délégation ; relayé par l'utilisateur) : « L'audit d'A3 seule est autorisé, conformément au périmètre déjà arbitré. […] Appliquer les conclusions d'A1 et d'A2 comme références de comparaison, jamais comme verdicts automatiques. Examiner particulièrement 昨夜 au regard de R5 : `parties_de_la_journee` et `deictique` doivent être évalués séparément. »", '');
if (ARBITRAGE) P.push('## 0. Arbitrage', '', ...ARBITRAGE.texte, '');
P.push('## 1. Résultat proposé', '');
P.push('| N° | Sens | Mot | Traduction | Lot | Catégorie publiée | Type publié | Fonction publiée | Règles du criblage | Verdict proposé | Correction |', '|---|---|---|---|---|---|---|---|---|---|---|');
fiches.forEach((f, i) => P.push('| ' + (i + 1) + ' | `' + f.id + '` | ' + f.e.word + ' | ' + f.s.meaning.primary + ' | ' + String(f.c.lot).padStart(2, '0') + ' | `' + cat(f.s.category) + '` | `' + f.s.semantic_type + '` | ' + fonctions(f.s) + ' | ' + f.regles.join(', ') + ' | **' + F[f.id].v + '** | — |'));
P.push('', '**Neuf sens examinés : ' + nConf + ' conformes, ' + nEcart + ' écart, aucun sens suspendu.** **Aucune correction n\'est proposée** : V1-6 reste libre, et la liste globale reste à 180 corrections dans 161 ENTRY, toutes non appliquées.', '');
P.push("**Comment les conclusions d'A1 et d'A2 ont été employées.** Comme références de comparaison seulement. Pour chacun des neuf sens, la fiche désigne une portion du temps (une semaine, un mois, une année, un jour, une partie de journée) : le type est motivé sur la fiche. **Type, catégorie et fonction sont examinés séparément dans chaque fiche.** " + avecDeixis + " sens portent `deictique`, " + (fiches.length - avecDeixis) + " ne la portent pas (午前, 夜) : dans les deux cas, la fiche et la décision qui cite A7 concordent.", '');
P.push('## 2. Méthode', '');
P.push("Pour chacun des neuf sens : la fiche source entière (traductions, particules, nuance, exemple) et ses anciens exemples ; l'état publié de l'ENTRY et du sens ; toutes les décisions de journal de l'ENTRY ; toutes les règles du criblage qui désignent le sens ; les corrections déjà retenues et le verdict de provenance des nuances (lot 2, clos, non rouvert) ; les autres sens publiés de `temps › moments_periodes`, comme comparables ; les normes : A2-ST-v1 (§3, §4, §5) pour le type, A2-L3-v1 (« Moments & périodes → Parties de la journée ; Présent ; Passé ; Futur ») pour la catégorie, A7 (définition et axe du temps) pour la fonction, A6 pour l'hypothèse d'un type nul.", '');
P.push("**Axes signalés** : les neuf sens ne sont désignés que par la règle " + reglesVues.map((r) => '`' + r + '`').join(', ') + " (axe " + axes.join(', ') + "). Aucun n'est désigné par l'axe C7 : le lot 12 est postérieur à A7, et chaque fonction y est posée ou refusée par une décision qui le cite. J'ai néanmoins relu la fonction, la catégorie, les dimensions, les tags et les relations de chacun.", '');
P.push("**Limites** : un comparable sert de contrôle, non de source ; je ne juge aucun sens hors des neuf ; rien n'est ajouté aux fiches.", '');
P.push('## 3. Comparables : les ' + mp.length + ' sens publiés de `temps › moments_periodes`', '');
P.push('| Sens | Mot | Traduction | Sous-catégorie | Type | Fonctions | Lot | Livraison du lot 3 |', '|---|---|---|---|---|---|---|---|');
for (const { e, s } of mp) { const l = livraison.get(s.id); P.push('| `' + s.id + '` | ' + e.word + ' | ' + s.meaning.primary + ' | ' + (s.category.level_3 ? '`' + s.category.level_3 + '`' : '—') + ' | `' + s.semantic_type + '` | ' + fonctions(s) + ' | ' + String(candidats.get(s.id)?.lot ?? '?').padStart(2, '0') + ' | ' + (IDS.includes(s.id) ? '**A3**' : l ? l + (DEJA.includes(l) ? ' (arbitrée)' : '') : 'hors des 377') + ' |'); }
P.push('', "Les trois parties de journée repérées par rapport au jour où l'on parle (今晩, 今朝, 昨夜) sont rangées sous `parties_de_la_journee` et portent `deictique` ; les parties de journée prises en général (dont 午前 et 夜, de cette livraison) sont dans la même sous-catégorie, sans la fonction. **La sous-catégorie dit de quelle portion de la journée il s'agit ; la fonction dit si elle est repérée par rapport au moment où l'on parle.**", '');
P.push('## 4. Les neuf fiches d\'examen', '');
for (const f of fiches) {
  const X = F[f.id]; const s = f.s; const src = f.src;
  P.push('#### `' + f.id + '` · ' + f.e.word + ' (' + src.reading + ') · « ' + s.meaning.primary + ' » — proposé : **' + X.v + '**', '');
  P.push('- **Questions** : le type `concept_abstrait` décrit-il ce sens ? La catégorie et la fonction publiées, examinées séparément, le décrivent-elles ?');
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
P.push('## 5. Points portés à l\'arbitrage', '');
P.push("**昨夜, au regard de R5.** Évalués séparément : la sous-catégorie `parties_de_la_journee` décrit ce que la fiche désigne (« la soirée ou la nuit ») ; la fonction `deictique` décrit le repérage (« d'hier »), conformément à A7 ; le type décrit la nature de ce qui est désigné. Les trois tiennent chacun sur la fiche. Le rangement est le même que celui de 今晩 et de 今朝, mais le verdict n'en est pas déduit.", '');
P.push("**去年.** Les mots de la fiche (« l'année précédente ») ne suffiraient pas, seuls, à établir la deixis ; les traductions et les exemples l'établissent. Je propose « conforme », et je signale que la raison de D0787 (« l'année qui précède celle de l'énonciation ») dit plus que la nuance de la fiche prise isolément.", '');
P.push("**Absence de raison écrite** : " + sansDecType + " des " + fiches.length + " sens n'ont aucune décision de journal sur le type ni sur la catégorie. Conformément à l'arbitrage de R4, c'est un constat documentaire, non un écart.", '');
P.push("**Autres constats, sans effet sur les verdicts** : aucun des neuf sens ne porte de dimension, de relation, de particule ni de tag ; les décisions de tags (" + fiches.flatMap((f) => f.dec.filter((d) => d.field === 'tags').map((d) => d.id.replace('A2-04-', ''))).join(', ') + ") écartent `lieu_hotel` par le critère du lot 02, et aucune règle C8 ne désigne ces sens. La fiche de 午前 décompose le mot avec « 御 (préfixe honorifique) », alors que le mot s'écrit 午 : c'est une incohérence interne de la fiche, dans une source figée que je ne touche pas, sans effet sur les champs examinés.", '');
P.push("**Sur le plan des livraisons** : aucun ajustement n'est proposé.", '');
P.push('## 6. Contrôles de couverture', '');
P.push('| Contrôle | Résultat |', '|---|---|');
P.push('| Les sens de la livraison A3 du périmètre arbitré sont examinés, et eux seuls | ' + fiches.length + ' fiches, ' + new Set(fiches.map((f) => f.id)).size + ' identifiants distincts, identiques aux lignes A3 du périmètre |');
P.push('| Chaque sens est un candidat du criblage, hors des 147 | ' + fiches.length + ' sur ' + fiches.length + ' |');
P.push('| ENTRY concernées | ' + new Set(fiches.map((f) => f.eid)).size + ' |');
P.push('| Type publié de chaque sens | `concept_abstrait`, ' + fiches.length + ' sur ' + fiches.length + ' |');
P.push('| Fonction publiée, confrontée à sa décision | ' + avecDeixis + ' sens avec `deictique` (décision qui la pose, citant A7) ; ' + (fiches.length - avecDeixis) + ' sans fonction (décision qui la refuse, citant A7) ; aucune discordance |');
P.push('| Numéros de décision cités dans les motivations | tous appartiennent à l\'ENTRY concernée (contrôle du script) |');
P.push('| Règles du criblage relevées | ' + reglesVues.join(', ') + ' seulement ; axes : ' + axes.join(', ') + ' |');
P.push('| Décisions de journal lues | ' + fiches.reduce((n, f) => n + f.dec.length, 0) + ', toutes validées, aucune modifiée |');
P.push('| Verdicts proposés | ' + nConf + ' conformes, ' + nEcart + ' écart, 0 suspendu |');
P.push('| Corrections proposées | 0 ; V1-6 non attribué ; 180 corrections dans 161 ENTRY, inchangées et non appliquées |');
P.push('| Lot 3 : arbitrés à ce jour | ' + dejaArb + ' sens (A1, A2) sur 377 |');
P.push('| Lot 3 après A3, **si la proposition est arbitrée** | ' + (dejaArb + fiches.length) + ' sens sur 377 ; restent ' + (377 - dejaArb - fiches.length) + ', dont ' + (blocA - dejaArb - fiches.length) + ' du bloc A (livraisons A4 à A7) et 17 du bloc F, suspendu à E5 |');
P.push('', '## 7. Questions à l\'arbitrage', '');
P.push("1. Les neuf verdicts « conforme » sont-ils retenus ?", "2. **昨夜** : la catégorie `parties_de_la_journee` et la fonction `deictique`, évaluées séparément, sont-elles toutes deux maintenues ?", "3. **去年** : le verdict est-il retenu, la deixis étant établie par les traductions et les exemples plus que par la nuance ?", "4. L'autorisation d'examiner **A4**, seule.", '');
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot3-A3.md'), P.join(LF) + LF);
console.log('A3 : ' + fiches.length + ' sens, ' + new Set(fiches.map((f) => f.eid)).size + ' ENTRY ; ' + nConf + ' conformes, ' + nEcart + ' écart, 0 suspendu ; aucune correction ; règles : ' + reglesVues.join(', ') + ' ; deictique : ' + avecDeixis + ' ; sans décision de type ni de catégorie : ' + sansDecType + ' ; déjà arbitrés : ' + dejaArb + ' ; bloc A : ' + blocA);
