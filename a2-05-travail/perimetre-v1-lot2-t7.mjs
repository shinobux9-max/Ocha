// A2-05 · volet 1 · lot 2 (provenance) : périmètre proposé de la tranche 7 (lots 12, 15 et 18). Lecture seule ; ne juge aucune nuance.
// Lit le plan arbitré (provenance/plan-tranches.json, champ « toutes ») ; n'ouvre aucune fiche source.
// Usage : node perimetre-v1-lot2-t7.mjs <racine>   (écrit docs/rapports/etape2-A2-05-volet1-lot2-tranche7-perimetre.md)
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const plan = read('a2-05-travail/provenance/plan-tranches.json');
const crib = read('a2-05-travail/criblage/resultat.json').candidats;
const vocab = read('data/n5/vocab.json');
const journal = read('reconstruction/a2-04/journal.json');
const LOTS = ['12', '15', '18'];
const titre = Object.fromEntries(LOTS.map((n) => [n, read(`reconstruction/a2-04/lots/lot-${n}.json`).title]));
const lotDe = Object.fromEntries(LOTS.map((n) => [n, read(`reconstruction/a2-04/lots/lot-${n}.json`)]));
const r6e = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t6-6e.md'), 'utf8');
const bilan = readFileSync(join(root, 'docs/rapports/etape2-A2-05-bilan-volet2.md'), 'utf8');
const compte = (l, k) => Object.fromEntries(Object.entries(l.reduce((a, x) => ({ ...a, [k(x)]: (a[k(x)] ?? 0) + 1 }), {})).sort());
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// Contrôles d'entrée : la tranche 6 est close ; le plan arbitré est inchangé ; la liste des corrections compte 159 lignes
if (!r6e.includes('**arbitré le 2026-10-12**') || !r6e.includes('**La tranche 6 est close.**')) throw new Error('tranche 6 non close');
const toutes = plan.toutes;
if (toutes.length !== 278 || new Set(toutes.map((u) => u.sens)).size !== 278) throw new Error('plan : 278 nuances distinctes attendues');
const FAITES = ['1 bis', '2', '3', '4', '5', '6'];
const lues = toutes.filter((u) => FAITES.includes(u.tranche));
if (lues.length !== 195) throw new Error(`lues : ${lues.length} au lieu de 195 (10 + 43 + 36 + 30 + 29 + 47)`);
const reste = toutes.filter((u) => !FAITES.includes(u.tranche));
if (reste.length !== 83 || reste.some((u) => !['7', '8'].includes(u.tranche))) throw new Error(`reste : ${reste.length} au lieu de 83, tranches 7 et 8`);
const T7 = toutes.filter((u) => u.tranche === '7');
const T8 = toutes.filter((u) => u.tranche === '8');
if (T7.length !== 39 || T8.length !== 44) throw new Error(`tranches : ${T7.length} et ${T8.length}`);
if (T7.some((u) => !LOTS.includes(u.lotN)) || reste.some((u) => LOTS.includes(u.lotN) && u.tranche !== '7')) throw new Error('tranche 7 : lots 12, 15 et 18 exactement');
if (new Set(T7.map((u) => u.sens)).size !== T7.length) throw new Error('doublon');
const ENTREES = [...new Set(T7.map((u) => u.entree))];
const communes = ENTREES.filter((e) => T8.some((u) => u.entree === e));
if (communes.length || T7.some((u) => T8.some((x) => x.sens === u.sens))) throw new Error('recouvrement avec la tranche 8');
if (T8.some((u) => LOTS.includes(u.lotN))) throw new Error('la tranche 8 touche un lot de la tranche 7');
const CORR = [...bilan.matchAll(/^\| (V[12]-\d+|\d+) \| `((?:hj_)?v_\d+)(_s\d+)?`/gm)].map((m) => ({ n: m[1], entree: m[2], unite: m[2] + (m[3] ?? '') }));
if (CORR.length !== 159 || new Set(CORR.map((c) => c.n)).size !== 159) throw new Error(`corrections : ${CORR.length} lignes au lieu de 159`);
const nEntreesCorr = new Set(CORR.map((c) => c.entree)).size;
if (nEntreesCorr !== 140) throw new Error(`ENTRY corrigées : ${nEntreesCorr} au lieu de 140`);
const sensDe = (u) => (u.niveau === 'sens' ? vocab.find((e) => e.id === u.entree)?.senses.find((s) => s.id === court(u.sens))?.meaning.primary : null);
for (const u of T7) {
  if (!vocab.some((e) => e.id === u.entree)) throw new Error(`ENTRY absente de l'état publié : ${u.entree}`);
  if (u.niveau === 'sens' && !sensDe(u)) throw new Error(`sens introuvable dans l'état publié : ${u.sens}`);
  if (!lotDe[u.lotN].entries[`n5_${u.entree}`]) throw new Error(`ENTRY hors de son lot : ${u.entree}`);
}

// Découpage proposé : cinq livraisons, par lot puis par sous-thème
const COULEURS = ['色', '白', '白い', '赤い', '黄色', '黒', '黒い', '緑', '茶色'];
const TAILLE = ['大きい', '大きな', '小さい', '小さな', '短い', '低い', '重い'];
const L = {
  '7a': T7.filter((u) => u.lotN === '12'),
  '7b': T7.filter((u) => u.lotN === '15' && COULEURS.includes(u.mot)),
  '7c': T7.filter((u) => u.lotN === '15' && TAILLE.includes(u.mot)),
  '7d': T7.filter((u) => u.lotN === '15' && !COULEURS.includes(u.mot) && !TAILLE.includes(u.mot)),
  '7e': T7.filter((u) => u.lotN === '18')
};
const TITRE = {
  '7a': 'lot 12, **temps relatif et moments de la journée**',
  '7b': 'lot 15, **couleurs**',
  '7c': 'lot 15, **taille, longueur, hauteur et poids**',
  '7d': 'lot 15, **étendue et épaisseur** (trois couples de contraires)',
  '7e': 'lot 18, **actions sur les objets**'
};
const tailles = Object.fromEntries(Object.entries(L).map(([k, l]) => [k, l.length]));
if (JSON.stringify(tailles) !== JSON.stringify({ '7a': 9, '7b': 9, '7c': 7, '7d': 6, '7e': 8 })) throw new Error(`découpage : ${JSON.stringify(tailles)}`);
const reunis = Object.values(L).flat();
if (reunis.length !== T7.length || new Set(reunis.map((u) => u.sens)).size !== T7.length) throw new Error('livraisons : réunion ou disjonction');
const livraisonDe = new Map(Object.entries(L).flatMap(([k, l]) => l.map((u) => [u.entree, k])));
for (const [k, l] of Object.entries(L)) for (const u of l) if (livraisonDe.get(u.entree) !== k) throw new Error(`ENTRY partagée entre livraisons : ${u.entree}`);
const parNumero = (a, b) => Number(a.entree.slice(2)) - Number(b.entree.slice(2)) || a.sens.localeCompare(b.sens);
const TABLE = Object.values(L).flatMap((l) => [...l].sort(parNumero));

const MOTIF = { A: 'A-renvoi : la chaîne est le mot, une graphie ou une lecture d\'une autre ENTRY publiée, que les fiches ne citent pas', D: 'D-exemple construit : une suite de mots absente des fiches', 'B-romaji': 'faux positif présumé, rapproché par le romaji de la fiche', 'B-transcription': 'faux positif présumé, rapproché par une autre écriture (kana, kanji, furigana)', S1: 'jamais signalée par le criblage ; relevée par une chaîne d\'un seul caractère' };
const QUESTION = { A: 'la fiche cite-t-elle ce mot, et sous cette graphie ; sinon, une décision validée l\'assume-t-elle avec un fondement vérifiable ?', D: 'la suite est-elle un exemple de la fiche, à la forme du dictionnaire, sans mot, particule ni construction changés, et sous les graphies que la fiche atteste ?', 'B-romaji': 'le mot de la fiche est-il le même mot, et sa graphie publiée est-elle attestée, ou seulement sa lecture ?', 'B-transcription': 'la correspondance repose-t-elle sur la graphie du mot, ou sur sa seule lecture (homophone possible) ?', S1: 'le caractère est-il un mot que la fiche écrit, ou seulement un élément d\'un mot plus long ?' };
const chainesTexte = (u) => {
  const c = u.chaines.filter((k) => !k.classe.startsWith('B')).map((k) => k.chaine);
  const b = u.chaines.filter((k) => k.classe.startsWith('B')).map((k) => `${k.chaine}${u.parLecture.includes(k.chaine) ? ' (par la lecture)' : ' (par la graphie)'}`);
  const s = u.uns.map((k) => `${k.c}${k.absent ? ' (absent des fiches)' : ''}`);
  return [c.length ? c.join(' ; ') : null, b.length ? `écartées : ${b.join(' ; ')}` : null, s.length ? `un caractère : ${s.join(' ; ')}` : null].filter(Boolean).join(' — ') || '—';
};
const nom = (u) => `${u.mot}${u.niveau === 'sens' ? ` (sens ${court(u.sens).split('_s').pop()})` : ''}`;
const unites = (l) => l.map((u) => `\`${court(u.sens)}\` ${u.mot}`).join(' ; ');
const parLot = (n) => T7.filter((u) => u.lotN === n);

let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — périmètre proposé de la tranche 7 du contrôle de provenance');
P();
P('**Date** : 2026-10-12');
P('**Statut** : **périmètre arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **39 nuances des lots 12, 15 et 18, dans 38 ENTRY, sans ajout ni retrait** ; **cinq livraisons** : 7a (9), 7b (9), 7c (7), 7d (6), 7e (8). **Audit de provenance autorisé pour 7a seule** ; chaque livraison suivante attend l\'arbitrage de la précédente. **Question de principe du §5, point 1, tranchée** : une relation structurée validée (`transitive_of`) ne rend pas automatiquement « assumé » le renvoi présent dans une nuance ; *sourcé* : renvoi documenté dans la fiche examinée ; *assumé* : renvoi pédagogique explicitement assumé par une décision validée, avec son fondement ; *écart* : renvoi absent de la fiche, lorsque seule la relation structurée est validée et que l\'extension à la nuance n\'est pas explicitement assumée. Pour 7e, les décisions exactes du lot 26 des trois couples seront consultées, sans les modifier et sans présumer d\'un verdict avant la lecture des fiches. Les contrôles de couverture sont conservés : la tranche 8 contient séparément les 44 dernières nuances. Les 377 candidats C1 à C10 et les 147 arbitrages du volet 2 ne sont pas rouverts ; les 159 corrections retenues restent non appliquées. À la clôture de la tranche 7, seul le périmètre de la tranche 8 sera préparé. La proposition est conservée telle quelle ci-dessous.');
P();
P('**Statut d\'origine (proposition)** : *proposition de périmètre, non arbitrée. Aucun audit lexical de la tranche 7 n\'est commencé, et aucun arbitrage n\'y est pris : aucune nuance n\'a été lue en vue d\'un verdict.* Calculé par `a2-05-travail/perimetre-v1-lot2-t7.mjs`, en lecture seule, sur le plan arbitré (`provenance/plan-tranches.json`) ; rien n\'est modifié dans les données, le journal, les registres, les outils ni les snapshots. Les chaînes citées ci-dessous sont celles que le criblage et le tri ont relevées mécaniquement ; **aucune fiche source n\'a été ouverte pour ce rapport**. Les « cas à risque » du §5 sont des relevés de structure (décisions, relations, corrections déjà retenues), non des jugements sur les nuances.');
P();
P('## 1. Point de départ');
P();
P(`**La tranche 6 est close** (arbitrage de 6e du 2026-10-12 ; lots 10 et 11 : 47 nuances, 12 sourcées, 0 assumée, 35 écarts). Avec le bloc 1 bis et les tranches 2 à 5, **${lues.length} des 278 nuances du plan sont arbitrées ; restent ${reste.length}** : tranche 7, ${T7.length} ; tranche 8, ${T8.length}. **159 corrections retenues (10 + 5 + 144), dans 140 ENTRY, aucune appliquée** ; 377 candidats des axes C1 à C10 et 147 arbitrages du volet 2 inchangés.`);
P();
P('## 2. Composition, thèmes et taille');
P();
const st7 = compte(T7, (u) => u.statut);
P(`**La tranche 7 est celle du plan arbitré : toutes les nuances restantes des lots 12, 15 et 18, et elles seules.** ${LOTS.map((n) => `Lot ${n} : « ${titre[n]} » (${parLot(n).length} nuances, ${new Set(parLot(n).map((u) => u.entree)).size} ENTRY)`).join(' ; ')}. **Trois thèmes** : le temps relatif et les moments de la journée ; les couleurs et les dimensions ; des verbes d'action sur les objets.`);
P();
P(`**Taille : ${T7.length} nuances, dans ${ENTREES.length} ENTRY** : ${st7['à examiner'] ?? 0} à examiner, ${st7['faux positif à contre-vérifier'] ?? 0} faux positifs présumés à contre-vérifier, ${st7['un caractère seulement'] ?? 0} relevées par un caractère isolé seulement ; ${T7.filter((u) => u.niveau === 'entree').length} nuances d'ENTRY, ${T7.filter((u) => u.niveau === 'sens').length} nuances de sens. **La composition diffère des tranches précédentes** : les nuances « à examiner » y sont minoritaires ; plus de la moitié sont des faux positifs présumés, presque tous des renvois d'un adjectif à son contraire.`);
P();
P('| # | Livraison | Unité | Mot | Sens (traduction principale publiée) | Lot | Statut | Classe | Chaînes (signalées — écartées par le tri — d\'un caractère) | Sens candidats du volet 1 (restent candidats) | Sens des 147 (verdict non rouvert) | Renvois relevés (tranche de l\'ENTRY citée) |');
P('|---|---|---|---|---|---|---|---|---|---|---|---|');
TABLE.forEach((u, i) => P(`| ${i + 1} | ${livraisonDe.get(u.entree)} | \`${court(u.sens)}\`${u.niveau === 'entree' ? ' (nuance d\'ENTRY)' : ''} | ${u.mot} | ${u.niveau === 'sens' ? `« ${sensDe(u)} »` : '—'} | ${u.lotN} | ${u.statut} | ${u.motif} | ${chainesTexte(u)} | ${u.candidats377.map((c) => `\`${c}\``).join(', ') || '—'} | ${u.dans147.map((c) => `\`${c}\``).join(', ') || '—'} | ${u.renvois.map((r) => `${r.mot} (${r.tranche})`).join(' ; ') || '—'} |`));
P();
P('## 3. Classes de détection');
P();
P('La classe d\'une nuance est celle de sa chaîne la plus lourde (tri factuel du lot 2) ; elle **oriente la lecture et ne préjuge d\'aucun verdict**. Chaque nuance sera lue en entier, chaînes d\'un caractère comprises, sur ses fiches entières (fiches fusionnées, exemples, anciens exemples, décisions).');
P();
P('| Classe | Définition | Nuances | Question à poser à la fiche |');
P('|---|---|---|---|');
const cl = compte(T7, (u) => u.motif);
for (const k of ['A', 'D', 'B-romaji', 'B-transcription', 'S1']) if (cl[k]) P(`| ${k} | ${MOTIF[k]} | ${cl[k]} : ${TABLE.filter((u) => u.motif === k).map(nom).join(', ')} | ${QUESTION[k]} |`);
if (Object.keys(cl).some((k) => !MOTIF[k])) throw new Error(`classe inattendue : ${Object.keys(cl)}`);
P();
const mixtes = T7.filter((u) => new Set(u.chaines.map((k) => k.classe)).size > 1);
P(`**Nuances à chaînes de classes différentes** : ${mixtes.map((u) => `${nom(u)} (${u.chaines.map((k) => `${k.chaine} : ${k.classe}`).join(' ; ')})`).join(' ; ') || 'aucune'}.`);
P();
const abs = T7.filter((u) => u.uns.some((k) => k.absent));
P(`**Chaînes d'un caractère relevées** : ${T7.filter((u) => u.uns.length).length} nuances en portent ; ${abs.length} ${abs.length > 1 ? 'ont' : 'a'} un caractère absent de tous les textes des fiches${abs.length ? ` (${abs.map((u) => `${u.mot} : ${u.uns.filter((k) => k.absent).map((k) => k.c).join('')}`).join(' ; ')})` : ''}. Le relevé sert au seul repérage : un caractère isolé n'est jamais une preuve.`);
P();
P(`**Faux positifs présumés (${st7['faux positif à contre-vérifier'] ?? 0})** : chacun est contre-vérifié individuellement, l'identité du mot se distinguant de la simple identité de lecture. Bilan des tranches précédentes sur ce point, pour mémoire et sans présomption : à la tranche 6, six des huit étaient justes, deux recouvraient un écart de graphie.`);
P();
P('## 4. Chevauchements avec des éléments déjà arbitrés');
P();
const avec377 = T7.filter((u) => u.candidats377.length);
const avec147 = T7.filter((u) => u.dans147.length);
const c377 = [...new Set(T7.flatMap((u) => u.candidats377))];
for (const id of c377) if (!crib.some((c) => c.id === id)) throw new Error(`candidat absent du criblage : ${id}`);
const regles = compte(c377.flatMap((id) => crib.find((c) => c.id === id).regles.map((g) => g.regle)), (x) => x);
const motDuSens = (id) => vocab.find((e) => id.startsWith(`${e.id}_s`))?.word;
// Points réservés (RES) : regroupés par leur libellé exact dans le criblage, sans interprétation
const resPar = {};
for (const id of c377) for (const g of crib.find((c) => c.id === id).regles) if (g.regle === 'RES') (resPar[g.detail] ??= []).push(id);
const resTexte = Object.entries(resPar).map(([d, ids]) => `« ${d} » (${ids.map((id) => `\`${id}\` ${motDuSens(id)}`).join(', ')})`).join(' ; ');
const c30 = c377.filter((id) => crib.find((c) => c.id === id).regles.some((g) => g.regle === 'C3-0'));
P(`- **Candidats du volet 1 (axes C1 à C10)** : ${avec377.length} nuances sur ${T7.length} portent sur un sens candidat ou sur une ENTRY qui en a un (**${c377.length} sens distincts sur 377**) : ${LOTS.map((n) => `lot ${n}, ${parLot(n).filter((u) => u.candidats377.length).length} nuances sur ${parLot(n).length}`).join(' ; ')}. Règles du criblage en cause, par nombre de sens : ${Object.entries(regles).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} (${n})`).join(', ')} ; C3-0 est l'examen individuel imposé au type \`concept_abstrait\` (${c30.length} sens, dont les huit sens du lot 12) ; RES désigne des points réservés à A2-05, ici : ${resTexte}. Ils restent candidats ; **le décompte reste 377**, et le contrôle ne porte que sur le champ \`nuance\`.`);
P(`- **Sens des 147 arbitrages du volet 2** : ${avec147.length} nuances (${unites(avec147)}) ; leurs verdicts ne sont pas rouverts.`);
const dejaCorr = ENTREES.map((e) => ({ mot: T7.find((u) => u.entree === e).mot, c: CORR.filter((c) => c.entree === e) })).filter((x) => x.c.length);
P(`- **Corrections déjà retenues sur les mêmes ENTRY** (recherche dans les 159 lignes de la liste globale) : ${dejaCorr.map((x) => `${x.mot} (${x.c.map((c) => `${/^\d+$/.test(c.n) ? `volet 2, n° ${c.n}` : c.n}, \`${c.unite}\``).join(' ; ')})`).join(' ; ') || 'aucune'}.`);
const versArb = T7.flatMap((u) => u.renvois.filter((r) => ['1, arbitrée', ...FAITES].includes(r.tranche)).map((r) => `${u.mot} → ${r.mot} (${r.tranche})`));
P(`- **Renvois vers des ENTRY des tranches déjà arbitrées** (précédents cités, non rouverts) : ${[...new Set(versArb)].join(' ; ') || 'aucun'}.`);
const interne = T7.flatMap((u) => u.renvois.filter((r) => r.tranche === '7').map((r) => ({ de: u, vers: r })));
const memeLiv = interne.filter((x) => livraisonDe.get(x.vers.id) === livraisonDe.get(x.de.entree));
const autreLiv = interne.filter((x) => livraisonDe.has(x.vers.id) && livraisonDe.get(x.vers.id) !== livraisonDe.get(x.de.entree));
const horsUnites = interne.filter((x) => !livraisonDe.has(x.vers.id));
const fl = (l) => [...new Set(l.map((x) => `${x.de.mot} → ${x.vers.mot}`))].join(' ; ') || 'aucun';
P(`- **Renvois à l'intérieur des lots 12, 15 et 18** : dans la même livraison : ${fl(memeLiv)} ; d'une livraison à l'autre : ${[...new Set(autreLiv.map((x) => `${x.de.mot} (${livraisonDe.get(x.de.entree)}) → ${x.vers.mot} (${livraisonDe.get(x.vers.id)})`))].join(' ; ') || 'aucun'} ; vers une ENTRY de ces lots qui n'a aucune nuance au plan (sa fiche sera lue pour le renvoi, sans verdict sur elle) : ${fl(horsUnites)}.`);
const plusTard = T7.flatMap((u) => u.renvois.filter((r) => r.tranche === '8').map((r) => `${u.mot} → ${r.mot}`));
P(`- **Renvois vers la tranche 8** : ${[...new Set(plusTard)].join(' ; ') || 'aucun'}. Aucune ENTRY et aucun sens n'est commun aux tranches 7 et 8.`);
P();
P('## 5. Cas à risque, relevés sans verdict');
P();
P('Ces relevés sont tirés du journal, des relations publiées et des listes arbitrées ; ils signalent où un précédent s\'appliquera ou devra être précisé. **Aucun ne préjuge du verdict d\'une nuance.**');
P();
const decDe = (e) => journal.filter((d) => d.entry === `n5_${e}`);
const horsLot = ENTREES.map((e) => ({ e, mot: T7.find((u) => u.entree === e).mot, lotN: T7.find((u) => u.entree === e).lotN, lots: [...new Set(decDe(e).map((d) => d.lot))].sort() })).filter((x) => x.lots.some((l) => l !== `lot-${x.lotN}`));
const rel = ENTREES.flatMap((e) => vocab.find((x) => x.id === e).senses.flatMap((s) => (s.relations ?? []).map((r) => ({ mot: T7.find((u) => u.entree === e).mot, de: s.id, type: r.type, cible: r.target, motCible: motDuSens(r.target) }))));
P(`1. **Relations publiées entre ENTRY que les nuances rapprochent** (lot 18). ${rel.length} relation${rel.length > 1 ? 's sont portées' : ' est portée'} par une ENTRY de la tranche : ${rel.map((r) => `${r.mot} \`${r.de}\` \`${r.type}\` ${r.motCible} \`${r.cible}\``).join(' ; ') || 'aucune'}. Elles ont été décidées et validées à la passe finale (lot 26). ENTRY de la tranche ayant des décisions d'un autre lot que le leur : ${horsLot.map((x) => `${x.mot} (${x.lots.join(', ')})`).join(' ; ') || 'aucune'}. **Question de principe à trancher avant l'audit de 7e** : une décision de relation validée entre deux ENTRY (par exemple \`transitive_of\`) suffit-elle à rendre « assumé » le renvoi d'une nuance à son partenaire, quand la fiche examinée ne le nomme pas ? Les précédents de 6a à 6e portent sur des renvois qu'aucune décision n'assumait ; ce cas est nouveau.`);
P('2. **Homophones déjà arbitrés** (lot 18). Le tri rapproche 取る de 撮る et 引く de 弾く. Le journal porte, pour ces deux verbes, des décisions qui écartent une confusion de la source ; 弾く a été arbitré « assumé » en 5c pour son renvoi à 引く (D0545, D1210). Le contrôle de 引く et de 取る regardera le renvoi dans l\'autre sens, sur leurs propres fiches et leurs propres décisions ; le verdict de 5c n\'est pas rouvert.');
P(`3. **Sens du volet 2 et correction déjà retenue** (lot 18). ${avec147.filter((u) => u.lotN === '18').length} des ${parLot('18').length} nuances du lot 18 portent sur une ENTRY dont un sens a été arbitré au volet 2 ; 並ぶ porte la correction n° 6 du volet 2, sur \`category\`. Le contrôle ne touche que \`nuance\`.`);
P(`4. **Couples de contraires** (lot 15). ${parLot('15').filter((u) => u.statut === 'faux positif à contre-vérifier').length} nuances du lot 15 sont des faux positifs présumés, où le tri a retrouvé dans la fiche, par le romaji, le nom du contraire. Les tranches 6c à 6e ont montré qu'un renvoi peut être écrit par une fiche et pas par l'autre : **chaque membre d'un couple sera vérifié sur sa propre fiche**, sans symétrie présumée. Les couples sont tenus dans une même livraison.`);
P('5. **Adjectif et nom de couleur, adjectif en い et forme en な** (lot 15). Les renvois 白 / 白い, 黒 / 黒い, 赤 / 赤い, 大きい / 大きな, 小さい / 小さな relient deux ENTRY distinctes d\'un même radical. 赤, cité par 赤い, n\'a aucune nuance au plan. 大きな et 小さな sont classés `determinant` par des décisions du lot 15 ; le contrôle ne porte pas sur la classe.');
P(`6. **Le temps relatif** (lot 12). Les ${parLot('12').length} nuances du lot 12 portent toutes sur un sens candidat du volet 1 (type \`concept_abstrait\`, examen individuel imposé ; un sens de 昼 par d'autres règles). L'audit rétroactif de la deixis temporelle, réservé par l'addendum A7, relève des axes C1 à C10 : **il n'est pas ouvert ici**. Le lot 12 a connu une révision de lectures (5.13b : 近々 → ちかじか, entre autres) : le contrôle ne porte pas sur les lectures ni sur les furigana, mais une nuance qui cite une lecture sera vérifiée contre la fiche, non contre la lecture publiée. Le tri rapproche 去年 d'おととし et 昼 de 昼ご飯, deux ENTRY de la tranche 2, déjà arbitrée.`);
P('7. **Renvoi vers des ENTRY de la tranche 4** (lot 15). 低い est rapproché de 安い et de 高い, deux ENTRY de la tranche 4, déjà arbitrée ; l\'arbitrage du lot 15 avait conservé « 低い et le prix » en nuance, sur la foi d\'un exemple de la fiche (doctrine « la fiche entière décide, exemple compris »). Le contrôle vérifiera la forme publiée de cet exemple contre la fiche, sans rouvrir cet arbitrage.');
P();
P('## 6. Découpage proposé');
P();
P(`**Cinq livraisons de ${Math.min(...Object.values(tailles))} à ${Math.max(...Object.values(tailles))} nuances**, comme pour la tranche 6 (7 à 11). Chaque lot est gardé entier ou coupé par sous-thème ; aucune ENTRY n'est partagée entre deux livraisons ; les couples de contraires et les paires de verbes sont dans la même livraison.`);
P();
P('| Livraison | Contenu | Nuances | ENTRY |');
P('|---|---|---|---|');
for (const [k, l] of Object.entries(L)) P(`| ${k} | ${TITRE[k]} : ${[...l].sort(parNumero).map(nom).join(', ')} | ${l.length} | ${new Set(l.map((u) => u.entree)).size} |`);
P(`| **Total** | | **${T7.length}** | **${ENTREES.length}** |`);
P();
P(`**Options** : (1) quatre livraisons, en réunissant 7c et 7d (${L['7c'].length + L['7d'].length} nuances : toutes les dimensions) ; (2) trois livraisons par lot (${LOTS.map((n) => parLot(n).length).join(', ')}), le lot 15 dépassant alors nettement la taille des livraisons précédentes. **Je propose cinq livraisons.** L'option (1) est défendable : les treize nuances de dimensions sont presque toutes des renvois courts à un contraire.`);
P();
P('**Ordre proposé** : 7a, 7b, 7c, 7d, 7e ; chaque livraison après l\'arbitrage de la précédente. Placer 7e en dernier laisse le temps de trancher la question de principe du §5, point 1.');
P();
P('## 7. Critères reproductibles de complétude');
P();
P('Calculés par `a2-05-travail/perimetre-v1-lot2-t7.mjs`, qui s\'arrête au premier écart :');
P();
P(`1. **Point de départ** : le plan compte 278 nuances distinctes ; ${lues.length} sont arbitrées (bloc 1 bis 10, tranche 2 43, tranche 3 36, tranche 4 30, tranche 5 29, tranche 6 47) ; il en reste ${reste.length}, toutes dans les tranches 7 et 8. Le rapport de 6e porte l'arbitrage du 2026-10-12 et la clôture de la tranche 6.`);
P(`2. **Ni omission** : la tranche 7 contient toutes les nuances restantes des lots 12, 15 et 18 (${T7.length}), et aucune nuance restante de ces lots n'est ailleurs. **Ni doublon** : ${T7.length} identifiants distincts. Chaque ENTRY et chaque SENSE existe dans l'état publié ; chaque ENTRY est dans le fichier de son lot.`);
P(`3. **Aucun recouvrement avec la tranche 8** : ${T8.length} nuances, aucun identifiant commun, aucune ENTRY commune, et la tranche 8 ne touche aucun des lots 12, 15 et 18 ; ${T7.length} + ${T8.length} = ${reste.length}.`);
P(`4. **Livraisons** : ${Object.entries(tailles).map(([k, n]) => `${k} (${n})`).join(' + ')} = ${T7.length}, disjointes ; 7a est exactement le lot 12 ; 7b, 7c et 7d exactement le lot 15 (${parLot('15').length}) ; 7e exactement le lot 18 ; aucune ENTRY n'est partagée entre deux livraisons.`);
P(`5. **Après la tranche 7** : il resterait ${T8.length} nuances du plan, la tranche 8.`);
P(`6. **Décomptes inchangés** : volet 2, 147 arbitrages (L 136, F 2, C 9, N 0) ; 377 candidats (les ${c377.length} de la tranche sont tous retrouvés dans le résultat du criblage) ; **159 corrections retenues** (159 lignes distinctes recomptées dans le bilan, ${nEntreesCorr} ENTRY), aucune appliquée.`);
P();
P('## 8. Limites et questions à arbitrer');
P();
P('Hors périmètre : le texte français des nuances (sauf à préserver l\'information attestée dans une correction) ; les axes C1 à C10, dont la deixis temporelle ; les lectures et les furigana ; les relations elles-mêmes ; les champs autres que `nuance` ; toute correction. **L\'audit de la tranche 7 ne commence qu\'après la validation explicite de ce périmètre.**');
P();
P(`1. Le périmètre de la tranche 7 (${T7.length} nuances des lots 12, 15 et 18, dans ${ENTREES.length} ENTRY, sans ajout ni retrait) est-il accepté ?`);
P(`2. Le découpage en cinq livraisons (${Object.entries(tailles).map(([k, n]) => `${k} : ${n}`).join(' ; ')}) est-il retenu, ou l'une des deux options ?`);
P('3. **Question de principe (§5, point 1)** : une relation validée entre deux ENTRY suffit-elle à fonder comme « assumé » le renvoi d\'une nuance à son partenaire, quand la fiche examinée ne le nomme pas ? La réponse peut attendre la livraison 7e, mais elle doit précéder son audit.');
P('4. L\'audit de 7a seule est-il autorisé, chaque livraison suivant l\'arbitrage de la précédente ?');
if (/ $/m.test(md)) throw new Error('rapport : espace en fin de ligne');
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-tranche7-perimetre.md'), md);
console.log(`tranche 7 : ${T7.length} (${JSON.stringify(st7)}) ; lots : ${LOTS.map((n) => `${n} : ${parLot(n).length}`).join(' ; ')} ; livraisons : ${JSON.stringify(tailles)} ; ENTRY : ${ENTREES.length} ; classes : ${JSON.stringify(cl)} ; 377 : ${avec377.length} nuances, ${c377.length} sens ; 147 : ${avec147.length} ; tranche 8 : ${T8.length}`);
