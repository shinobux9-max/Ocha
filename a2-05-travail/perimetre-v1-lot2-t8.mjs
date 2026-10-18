// A2-05 · volet 1 · lot 2 (provenance) : périmètre proposé de la tranche 8, la dernière (lots 13, 14, 16, 17, 19 à 24). Lecture seule ; ne juge aucune nuance.
// Lit le plan arbitré (provenance/plan-tranches.json, champ « toutes ») ; n'ouvre aucune fiche source.
// Usage : node perimetre-v1-lot2-t8.mjs <racine>   (écrit docs/rapports/etape2-A2-05-volet1-lot2-tranche8-perimetre.md)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const plan = read('a2-05-travail/provenance/plan-tranches.json');
const crib = read('a2-05-travail/criblage/resultat.json').candidats;
const vocab = read('data/n5/vocab.json');
const journal = read('reconstruction/a2-04/journal.json');
const LOTS = ['13', '14', '16', '17', '19', '20', '21', '22', '23', '24'];
const lotDe = Object.fromEntries(LOTS.map((n) => [n, read(`reconstruction/a2-04/lots/lot-${n}.json`)]));
const titre = Object.fromEntries(LOTS.map((n) => [n, lotDe[n].title]));
const tousLots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-\d+\.json$/.test(f)).sort().map((f) => read(`reconstruction/a2-04/lots/${f}`));
const r7e = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t7-7e.md'), 'utf8');
const bilan = readFileSync(join(root, 'docs/rapports/etape2-A2-05-bilan-volet2.md'), 'utf8');
const compte = (l, k) => Object.fromEntries(Object.entries(l.reduce((a, x) => ({ ...a, [k(x)]: (a[k(x)] ?? 0) + 1 }), {})).sort());
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// Contrôles d'entrée : la tranche 7 est close ; le plan arbitré est inchangé ; la liste des corrections compte 173 lignes
if (!r7e.includes('**arbitré le 2026-10-12**') || !r7e.includes('**La tranche 7 est close.**')) throw new Error('tranche 7 non close');
const toutes = plan.toutes;
if (toutes.length !== 278 || new Set(toutes.map((u) => u.sens)).size !== 278) throw new Error('plan : 278 nuances distinctes attendues');
const FAITES = ['1 bis', '2', '3', '4', '5', '6', '7'];
const lues = toutes.filter((u) => FAITES.includes(u.tranche));
if (lues.length !== 234) throw new Error(`lues : ${lues.length} au lieu de 234 (10 + 43 + 36 + 30 + 29 + 47 + 39)`);
const parTrancheLue = compte(lues, (u) => u.tranche);
if (JSON.stringify(parTrancheLue) !== JSON.stringify({ '1 bis': 10, 2: 43, 3: 36, 4: 30, 5: 29, 6: 47, 7: 39 })) throw new Error(`tranches lues : ${JSON.stringify(parTrancheLue)}`);
const T8 = toutes.filter((u) => !FAITES.includes(u.tranche));
if (T8.length !== 44 || T8.some((u) => u.tranche !== '8')) throw new Error(`reste : ${T8.length} au lieu de 44, toutes en tranche 8`);
if (lues.length + T8.length !== toutes.length) throw new Error('somme');
if (new Set(T8.map((u) => u.sens)).size !== T8.length) throw new Error('doublon');
if (T8.some((u) => !LOTS.includes(u.lotN)) || LOTS.some((n) => !T8.some((u) => u.lotN === n))) throw new Error('tranche 8 : lots attendus');
if (lues.some((u) => T8.some((x) => x.sens === u.sens))) throw new Error('nuance commune avec une tranche arbitrée');
const ENTREES = [...new Set(T8.map((u) => u.entree))];
const entreesDejaVues = ENTREES.filter((e) => lues.some((u) => u.entree === e));
const CORR = [...bilan.matchAll(/^\| (V[12]-\d+|\d+) \| `((?:hj_)?v_\d+)(_s\d+)?`/gm)].map((m) => ({ n: m[1], entree: m[2], unite: m[2] + (m[3] ?? '') }));
if (CORR.length !== 173 || new Set(CORR.map((c) => c.n)).size !== 173) throw new Error(`corrections : ${CORR.length} lignes au lieu de 173`);
const nEntreesCorr = new Set(CORR.map((c) => c.entree)).size;
if (nEntreesCorr !== 154) throw new Error(`ENTRY corrigées : ${nEntreesCorr} au lieu de 154`);
const sensDe = (u) => (u.niveau === 'sens' ? vocab.find((e) => e.id === u.entree)?.senses.find((s) => s.id === court(u.sens))?.meaning.primary : null);
for (const u of T8) {
  if (!vocab.some((e) => e.id === u.entree)) throw new Error(`ENTRY absente de l'état publié : ${u.entree}`);
  if (u.niveau === 'sens' && !sensDe(u)) throw new Error(`sens introuvable dans l'état publié : ${u.sens}`);
  if (!lotDe[u.lotN].entries[`n5_${u.entree}`]) throw new Error(`ENTRY hors de son lot : ${u.entree}`);
}

// Découpage proposé : six livraisons, par lot ou par groupe de petits lots voisins
const QUANTITE = ['多い', '少ない', '大勢', 'たくさん', '全部', '少し'];
const L = {
  '8a': T8.filter((u) => ['13', '14', '16'].includes(u.lotN)),
  '8b': T8.filter((u) => u.lotN === '17' || (u.lotN === '21' && u.mot === '早い')),
  '8c': T8.filter((u) => u.lotN === '19' || (u.lotN === '21' && u.mot !== '早い') || ['22', '23'].includes(u.lotN)),
  '8d': T8.filter((u) => u.lotN === '20'),
  '8e': T8.filter((u) => u.lotN === '24' && QUANTITE.includes(u.mot)),
  '8f': T8.filter((u) => u.lotN === '24' && !QUANTITE.includes(u.mot))
};
const TITRE = {
  '8a': 'lots 13, 14 et 16, **calendrier, nombres, préférences et aptitudes**',
  '8b': 'lot 17 et 早い (lot 21), **états et propriétés descriptives**',
  '8c': 'lot 19, また (lot 21), lots 22 et 23, **vie quotidienne ; répétition, identité et liaison**',
  '8d': 'lot 20, **existence, possession, action et déroulement**',
  '8e': 'lot 24, **quantité**',
  '8f': 'lot 24, **degré, rang et approximation**'
};
const tailles = Object.fromEntries(Object.entries(L).map(([k, l]) => [k, l.length]));
if (JSON.stringify(tailles) !== JSON.stringify({ '8a': 7, '8b': 7, '8c': 9, '8d': 9, '8e': 7, '8f': 5 })) throw new Error(`découpage : ${JSON.stringify(tailles)}`);
const reunis = Object.values(L).flat();
if (reunis.length !== T8.length || new Set(reunis.map((u) => u.sens)).size !== T8.length) throw new Error('livraisons : réunion ou disjonction');
const livraisonDe = new Map(Object.entries(L).flatMap(([k, l]) => l.map((u) => [u.entree, k])));
for (const [k, l] of Object.entries(L)) for (const u of l) if (livraisonDe.get(u.entree) !== k) throw new Error(`ENTRY partagée entre livraisons : ${u.entree}`);
const parNumero = (a, b) => Number(a.lotN) - Number(b.lotN) || Number(a.entree.slice(2)) - Number(b.entree.slice(2)) || a.sens.localeCompare(b.sens);
const TABLE = Object.values(L).flatMap((l) => [...l].sort(parNumero));

const MOTIF = { A: 'A-renvoi : la chaîne est le mot, une graphie ou une lecture d\'une autre ENTRY publiée, que les fiches ne citent pas', D: 'D-exemple construit : une suite de mots absente des fiches', 'B-romaji': 'faux positif présumé, rapproché par le romaji de la fiche', 'B-transcription': 'faux positif présumé, rapproché par une autre écriture (kana, kanji, furigana)', S1: 'jamais signalée par le criblage ; relevée par une chaîne d\'un seul caractère' };
const QUESTION = { A: 'la fiche cite-t-elle ce mot, et sous cette graphie ; sinon, une décision validée l\'assume-t-elle expressément, avec un fondement vérifiable ?', D: 'la suite est-elle un exemple de la fiche, sans mot, particule ni construction changés, et sous les graphies que la fiche atteste ?', 'B-romaji': 'le mot que la fiche nomme en romaji est-il publié sous une graphie qu\'elle écrit, ou avec un kanji qu\'elle ne donne pas (arbitrages de 7b, 7c et 7d) ?', 'B-transcription': 'la suite publiée est-elle exactement celle de la fiche, sans mot retiré qui porte une information (arbitrage de 7c), et la correspondance repose-t-elle sur la graphie ou sur la seule lecture ?', S1: 'le caractère est-il un mot ou une particule que la fiche écrit, ou seulement un élément d\'un mot plus long ?' };
const chainesTexte = (u) => {
  const c = u.chaines.filter((k) => !k.classe.startsWith('B')).map((k) => k.chaine);
  const b = u.chaines.filter((k) => k.classe.startsWith('B')).map((k) => `${k.chaine}${u.parLecture.includes(k.chaine) ? ' (par la lecture)' : ' (par la graphie)'}`);
  const s = u.uns.map((k) => `${k.c}${k.absent ? ' (absent des fiches)' : ''}`);
  return [c.length ? c.join(' ; ') : null, b.length ? `écartées : ${b.join(' ; ')}` : null, s.length ? `un caractère : ${s.join(' ; ')}` : null].filter(Boolean).join(' — ') || '—';
};
const nom = (u) => `${u.mot}${u.niveau === 'sens' ? ` (sens ${court(u.sens).split('_s').pop()})` : ''}`;
const unites = (l) => l.map((u) => `\`${court(u.sens)}\` ${u.mot}`).join(' ; ');
const parLot = (n) => T8.filter((u) => u.lotN === n);
const motDe = (e) => T8.find((u) => u.entree === e).mot;

let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — périmètre proposé de la tranche 8 du contrôle de provenance');
P();
P('**Date** : 2026-10-12');
P('**Statut** : **périmètre arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **44 nuances dans 40 ENTRY, sans ajout ni retrait** ; **six livraisons** : 8a (7), 8b (7), 8c (9), 8d (9), 8e (7), 8f (5) ; le partage du lot 21 entre 8b et 8c est accepté, sans partage d\'ENTRY. Les contrôles de couverture sont conservés : 278 nuances au plan, 234 déjà arbitrées, 44 restantes, aucune duplication. **Critères : ceux déjà arbitrés, sans nouvelle exception**, et qui ne constituent pas de nouvelles règles normatives : une graphie kanji n\'est pas importée d\'une autre fiche lorsque la fiche examinée ne nomme le mot qu\'en romaji ; une transcription en kana reste fidèle au romaji effectivement attesté ; une réduction d\'exemple ne retire pas une information sémantiquement importante ; une décision qui assume expressément un élément de nuance se distingue d\'une citation incidente ; une décision historique dont le fondement est inexact est signalée, non corrigée silencieusement ; **un champ structuré validé, notamment `suru_compatible: true`, ne fonde pas à lui seul un élément de nuance**, pas plus qu\'une relation structurée. **Audit de provenance autorisé pour 8a seule** ; chaque livraison suivante attend l\'arbitrage de la précédente. Les 377 candidats C1 à C10 et les 147 arbitrages du volet 2 ne sont pas rouverts ; les 173 corrections retenues restent non appliquées. À la clôture de la tranche 8, un bilan exhaustif des 278 nuances et des corrections retenues sera préparé, sans application automatique. La proposition est conservée telle quelle ci-dessous.');
P();
P('**Statut d\'origine (proposition)** : *proposition de périmètre, non arbitrée. Aucun examen lexical de la tranche 8 n\'est commencé, et aucun verdict n\'y est pris : aucune nuance n\'a été lue en vue d\'un verdict.* Calculé par `a2-05-travail/perimetre-v1-lot2-t8.mjs`, en lecture seule, sur le plan arbitré (`provenance/plan-tranches.json`) ; rien n\'est modifié dans les données, le journal, les registres, les outils ni les snapshots. Les chaînes citées ci-dessous sont celles que le criblage et le tri ont relevées mécaniquement ; **aucune fiche source n\'a été ouverte pour ce rapport**. Les « cas à risque » du §5 sont des relevés de structure (classes du tri, décisions, relations, fusions, corrections déjà retenues), non des jugements sur les nuances. **La tranche 8 est la dernière du contrôle de provenance.**');
P();
P('## 1. Point de départ');
P();
P(`**La tranche 7 est close** (arbitrage de 7e du 2026-10-12 ; lots 12, 15 et 18 : 39 nuances, 18 sourcées, 7 assumées, 14 écarts). Avec le bloc 1 bis et les tranches 2 à 6, **${lues.length} des 278 nuances du plan sont arbitrées ; restent ${T8.length}, toutes dans la tranche 8**. **173 corrections retenues (10 + 5 + 158), dans 154 ENTRY, aucune appliquée** ; 377 candidats des axes C1 à C10 et 147 arbitrages du volet 2 inchangés.`);
P();
P('## 2. Composition, thèmes et taille');
P();
const st8 = compte(T8, (u) => u.statut);
P(`**La tranche 8 est celle du plan arbitré : toutes les nuances restantes du plan, et elles seules.** Elles viennent de dix lots : ${LOTS.map((n) => `lot ${n}, « ${titre[n]} » (${parLot(n).length} nuance${parLot(n).length > 1 ? 's' : ''}, ${new Set(parLot(n).map((u) => u.entree)).size} ENTRY)`).join(' ; ')}. **Thèmes** : des adjectifs d'appréciation et d'état, avec leurs contraires ; des verbes d'existence, d'action et de vie quotidienne ; des mots de quantité et de degré ; quelques mots de calendrier, de nombre et de liaison.`);
P();
P(`**Taille : ${T8.length} nuances, dans ${ENTREES.length} ENTRY** : ${st8['à examiner'] ?? 0} à examiner, ${st8['faux positif à contre-vérifier'] ?? 0} faux positifs présumés à contre-vérifier, ${st8['un caractère seulement'] ?? 0} relevées par un caractère isolé seulement ; ${T8.filter((u) => u.niveau === 'entree').length} nuances d'ENTRY, ${T8.filter((u) => u.niveau === 'sens').length} nuances de sens. **Aucune nuance n'est classée « à examiner » par le tri** : toutes sont des faux positifs présumés ou des relevés d'un seul caractère. Les tranches 7b à 7d ont montré que ce classement ne vaut pas verdict : un faux positif présumé « par le romaji » recouvre souvent un écart de graphie.`);
P();
P('| # | Livraison | Unité | Mot | Sens (traduction principale publiée) | Lot | Statut | Classe | Chaînes (signalées — écartées par le tri — d\'un caractère) | Sens candidats du volet 1 (restent candidats) | Sens des 147 (verdict non rouvert) | Renvois relevés (tranche de l\'ENTRY citée) |');
P('|---|---|---|---|---|---|---|---|---|---|---|---|');
TABLE.forEach((u, i) => P(`| ${i + 1} | ${livraisonDe.get(u.entree)} | \`${court(u.sens)}\`${u.niveau === 'entree' ? ' (nuance d\'ENTRY)' : ''} | ${u.mot} | ${u.niveau === 'sens' ? `« ${sensDe(u)} »` : '—'} | ${u.lotN} | ${u.statut} | ${u.motif} | ${chainesTexte(u)} | ${u.candidats377.map((c) => `\`${c}\``).join(', ') || '—'} | ${u.dans147.map((c) => `\`${c}\``).join(', ') || '—'} | ${u.renvois.map((r) => `${r.mot} (${r.tranche})`).join(' ; ') || '—'} |`));
P();
P('Dans la dernière colonne, la tranche entre parenthèses est celle du lot de l\'ENTRY citée ; cette ENTRY peut n\'avoir elle-même aucune nuance au plan (§4).');
P();
P('## 3. Classes de détection');
P();
P('La classe d\'une nuance est celle de sa chaîne la plus lourde (tri factuel du lot 2) ; elle **oriente la lecture et ne préjuge d\'aucun verdict**. Chaque nuance sera lue en entier, chaînes d\'un caractère comprises, sur ses fiches entières (fiches fusionnées, exemples, anciens exemples, décisions).');
P();
P('| Classe | Définition | Nuances | Question à poser à la fiche |');
P('|---|---|---|---|');
const cl = compte(T8, (u) => u.motif);
for (const k of ['A', 'D', 'B-romaji', 'B-transcription', 'S1']) if (cl[k]) P(`| ${k} | ${MOTIF[k]} | ${cl[k]} : ${TABLE.filter((u) => u.motif === k).map(nom).join(', ')} | ${QUESTION[k]} |`);
if (Object.keys(cl).some((k) => !MOTIF[k])) throw new Error(`classe inattendue : ${Object.keys(cl)}`);
P();
const mixtes = T8.filter((u) => new Set(u.chaines.map((k) => k.classe)).size > 1);
P(`**Nuances à chaînes de classes différentes** : ${mixtes.map((u) => `${nom(u)} (${u.chaines.map((k) => `${k.chaine} : ${k.classe}`).join(' ; ')})`).join(' ; ') || 'aucune'}.`);
P();
const abs = T8.filter((u) => u.uns.some((k) => k.absent));
P(`**Chaînes d'un caractère relevées** : ${T8.filter((u) => u.uns.length).length} nuances en portent ; ${abs.length} ${abs.length > 1 ? 'ont' : 'a'} un caractère absent de tous les textes des fiches${abs.length ? ` (${abs.map((u) => `${u.mot} : ${u.uns.filter((k) => k.absent).map((k) => k.c).join('')}`).join(' ; ')})` : ''}. Le relevé sert au seul repérage : un caractère isolé n'est jamais une preuve.`);
P();
P('**Bilan des tranches précédentes sur les faux positifs présumés, pour mémoire et sans présomption** : à la tranche 6, six sur huit étaient justes ; à la tranche 7, sur vingt, huit étaient sourcés (去年, 明日, 大きな, 小さな, 開く, 閉める, 取る, 並べる), deux assumés (短い, 引く) et dix recouvraient un écart de graphie (緑, 大きい, 小さい, 重い, 広い, 狭い, 太い, 細い, 厚い, 薄い).');
{
  // Contrôle de cette phrase sur le plan : vingt faux positifs présumés en tranche 7
  const fp7 = toutes.filter((u) => u.tranche === '7' && u.statut === 'faux positif à contre-vérifier').map((u) => u.mot);
  const cites = ['去年', '明日', '大きな', '小さな', '開く', '閉める', '取る', '並べる', '短い', '引く', '緑', '大きい', '小さい', '重い', '広い', '狭い', '太い', '細い', '厚い', '薄い'];
  if (fp7.length !== 20 || cites.some((m) => !fp7.includes(m)) || fp7.some((m) => !cites.includes(m))) throw new Error(`faux positifs de la tranche 7 : ${fp7.join(',')}`);
}
P();
P('## 4. Chevauchements avec des éléments déjà arbitrés');
P();
const avec377 = T8.filter((u) => u.candidats377.length);
const avec147 = T8.filter((u) => u.dans147.length);
const c377 = [...new Set(T8.flatMap((u) => u.candidats377))];
for (const id of c377) if (!crib.some((c) => c.id === id)) throw new Error(`candidat absent du criblage : ${id}`);
const regles = compte(c377.flatMap((id) => crib.find((c) => c.id === id).regles.map((g) => g.regle)), (x) => x);
const motDuSens = (id) => vocab.find((e) => id.startsWith(`${e.id}_s`))?.word;
P(`- **Candidats du volet 1 (axes C1 à C10)** : ${avec377.length} nuances sur ${T8.length} portent sur un sens candidat ou sur une ENTRY qui en a un (**${c377.length} sens distincts sur 377**) : ${LOTS.filter((n) => parLot(n).some((u) => u.candidats377.length)).map((n) => `lot ${n}, ${parLot(n).filter((u) => u.candidats377.length).length} nuances sur ${parLot(n).length}`).join(' ; ')}. Règles du criblage en cause, par nombre de sens : ${Object.entries(regles).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} (${n})`).join(', ')}. Ils restent candidats ; **le décompte reste 377**, et le contrôle ne porte que sur le champ \`nuance\`.`);
P(`- **Sens des 147 arbitrages du volet 2** : ${avec147.length} nuances (${unites(avec147)}) ; leurs verdicts ne sont pas rouverts.`);
const dejaCorr = ENTREES.map((e) => ({ mot: motDe(e), c: CORR.filter((c) => c.entree === e) })).filter((x) => x.c.length);
P(`- **Corrections déjà retenues sur les mêmes ENTRY** (recherche dans les 173 lignes de la liste globale) : ${dejaCorr.map((x) => `${x.mot} (${x.c.map((c) => `${/^\d+$/.test(c.n) ? `volet 2, n° ${c.n}` : c.n}, \`${c.unite}\``).join(' ; ')})`).join(' ; ') || 'aucune'}. Elles portent sur d'autres champs ou d'autres unités ; aucune n'est rouverte.`);
P(`- **ENTRY de la tranche 8 ayant déjà une nuance arbitrée dans une tranche antérieure** : ${entreesDejaVues.map((e) => `${motDe(e)} (${lues.filter((u) => u.entree === e).map((u) => `\`${court(u.sens)}\`, tranche ${u.tranche}`).join(' ; ')})`).join(' ; ') || 'aucune'}.`);
const versArb = T8.flatMap((u) => u.renvois.filter((r) => ['1, arbitrée', ...FAITES].includes(r.tranche)).map((r) => `${u.mot} → ${r.mot} (${r.tranche})`));
P(`- **Renvois vers des ENTRY des tranches déjà arbitrées** (précédents cités, non rouverts) : ${[...new Set(versArb)].join(' ; ') || 'aucun'}.`);
const interne = T8.flatMap((u) => u.renvois.filter((r) => r.tranche === '8').map((r) => ({ de: u, vers: r })));
const memeLiv = interne.filter((x) => livraisonDe.get(x.vers.id) === livraisonDe.get(x.de.entree));
const autreLiv = interne.filter((x) => livraisonDe.has(x.vers.id) && livraisonDe.get(x.vers.id) !== livraisonDe.get(x.de.entree));
const horsUnites = interne.filter((x) => !livraisonDe.has(x.vers.id));
const fl = (l) => [...new Set(l.map((x) => `${x.de.mot} → ${x.vers.mot}`))].join(' ; ') || 'aucun';
P(`- **Renvois à l'intérieur des lots de la tranche 8** : vers une ENTRY de la même livraison : ${fl(memeLiv)} ; vers une ENTRY d'une autre livraison : ${[...new Set(autreLiv.map((x) => `${x.de.mot} (${livraisonDe.get(x.de.entree)}) → ${x.vers.mot} (${livraisonDe.get(x.vers.id)})`))].join(' ; ') || 'aucun'} ; vers une ENTRY de ces lots qui n'a aucune nuance au plan (sa fiche sera lue pour le renvoi, sans verdict sur elle) : ${fl(horsUnites)}.`);
P();
P('## 5. Cas de provenance à risque, relevés sans verdict');
P();
P('Ces relevés sont tirés des classes du tri, du journal, des relations publiées, des lots et des listes arbitrées ; ils signalent où un précédent s\'appliquera ou devra être précisé. **Aucun ne préjuge du verdict d\'une nuance, et aucune fiche source n\'a été ouverte pour les établir.**');
P();
const romajiVersEntree = T8.filter((u) => u.motif === 'B-romaji' && u.renvois.length);
P(`1. **Un mot que la fiche ne nommerait qu'en romaji** (${T8.filter((u) => u.motif === 'B-romaji').length} nuances de classe B-romaji, dont ${romajiVersEntree.length} renvoient à une autre ENTRY : ${romajiVersEntree.map((u) => `${nom(u)} → ${u.renvois.map((r) => r.mot).join(', ')}`).join(' ; ')}). C'est la configuration des contraires de 7c et de 7d. Les règles arbitrées s'appliquent telles quelles : la transcription en kana d'un romaji attesté est recevable, sans ajout de kanji ; **aucune exception ne permet d'importer les kanji d'une autre ENTRY** ; les éléments d'un mot que la fiche écrit elle-même sont sourcés. Chaque fiche sera lue pour elle-même : la chaîne publiée est parfois déjà en kana (はやい, きれい, ちょっと, たいてい, じゃあ, する, ある), parfois en kanji (上手, 易しい, 古い, 弱い, 強い, 賑やか, 居る, 上げる, 多い), ce que le tri ne distingue pas.`);
const longues = T8.filter((u) => u.chaines.some((k) => k.classe === 'B-transcription' && [...k.chaine].length >= 8));
P(`2. **Exemples publiés que le tri a retrouvés par transcription** (${longues.length} nuances : ${longues.map(nom).join(', ')}). La phrase publiée a été rapprochée d'un exemple de la fiche sous une autre écriture. Le contrôle vérifiera qu'elle est **exactement** celle de la fiche : mêmes mots, mêmes particules, même forme, mêmes graphies ; **le retrait d'un mot qui porte une information de l'exemple source n'est pas une simple réduction** (arbitrage de 7c : 低い et あまり, V2-152).`);
const aux = T8.filter((u) => u.chaines.some((k) => ['ている', 'する', '結婚する'].includes(k.chaine)));
P(`3. **Constructions avec un auxiliaire ou avec する** (${aux.map((u) => `${nom(u)} : ${u.chaines.map((k) => k.chaine).join(', ')}`).join(' ; ')}). Une forme conjuguée ou composée n'est pas sourcée d'office (critère 3 ; 自分 et やります, V2-144). Pour 結婚 et 生活, le lot 19 a validé \`suru_compatible: true\` : comme pour une relation structurée, **un champ structuré validé ne vaut pas, à lui seul, fondement d'un élément de nuance** ; les décisions seront lues dans leur texte exact.`);
const rel = ENTREES.flatMap((e) => vocab.find((x) => x.id === e).senses.flatMap((s) => (s.relations ?? []).map((r) => ({ mot: motDe(e), de: s.id, type: r.type, cible: r.target, motCible: motDuSens(r.target) }))));
const cibles = vocab.flatMap((e) => e.senses.flatMap((s) => (s.relations ?? []).filter((r) => ENTREES.some((x) => r.target.startsWith(`${x}_s`))).map((r) => ({ mot: e.word ?? e.id, de: s.id, type: r.type, cible: r.target, motCible: motDuSens(r.target) }))));
const decDe = (e) => journal.filter((d) => d.entry === `n5_${e}`);
const horsLot = ENTREES.map((e) => ({ mot: motDe(e), lotN: T8.find((u) => u.entree === e).lotN, lots: [...new Set(decDe(e).map((d) => d.lot))].sort() })).filter((x) => x.lots.some((l) => l !== `lot-${x.lotN}`));
P(`4. **Relations publiées et ENTRY rouvertes à la passe finale** (lot 26). Relations portées par une ENTRY de la tranche : ${rel.map((r) => `${r.mot} \`${r.de}\` \`${r.type}\` ${r.motCible} \`${r.cible}\``).join(' ; ') || 'aucune'}. Relations d'une autre ENTRY visant un sens de la tranche : ${cibles.map((r) => `${r.motCible} \`${r.cible}\` ← \`${r.type}\` \`${r.de}\``).join(' ; ') || 'aucune'}. ENTRY de la tranche ayant des décisions d'un autre lot que le leur : ${horsLot.map((x) => `${x.mot} (${x.lots.join(', ')})`).join(' ; ') || 'aucune'}. **Une relation structurée validée ne suffit pas, à elle seule, à rendre « assumé » un renvoi absent de la fiche** (arbitrages du 2026-10-12, 7e) ; les décisions du lot 26 seront citées dans leur texte exact.`);
const fusions = ENTREES.map((e) => ({ mot: motDe(e), abs: tousLots.flatMap((l) => Object.entries(l.entries).filter(([, en]) => en.retire?.merged_into === `n5_${e}`).map(([id]) => id)) })).filter((x) => x.abs.length);
P(`5. **Fiches fusionnées** : ${fusions.map((x) => `${x.mot} (absorbe ${x.abs.map((a) => `\`${a}\``).join(', ')})`).join(' ; ') || 'aucune'}. Une ENTRY qui a absorbé une autre fiche est jugée sur ses deux fiches (graphie attestée « par la fiche ou sa fiche fusionnée »).`);
const doubles = ENTREES.filter((e) => T8.filter((u) => u.entree === e).length > 1);
P(`6. **ENTRY à plusieurs nuances au plan** : ${doubles.map((e) => `${motDe(e)} (${T8.filter((u) => u.entree === e).map((u) => `\`${court(u.sens)}\``).join(', ')})`).join(' ; ') || 'aucune'}. Elles sont tenues dans une même livraison ; chaque nuance reçoit son verdict.`);
P('7. **Décisions qui assument un renvoi** : les précédents « assumé » de la tranche 7 (晩, 色, 短い ; 消す et 並ぶ avec réserve) ne se généralisent pas à toute citation incidente d\'un autre mot, et ne créent aucune règle normative. Pour chaque renvoi de la tranche 8 que la fiche ne nommerait pas, les décisions de l\'ENTRY seront lues dans leur texte exact, et ce qu\'elles affirment de la fiche sera vérifié sur la fiche.');
P('8. **Homophones et lectures** : le tri rapproche 早い de 速い, 遅い de はやい (deux ENTRY : 早い et 速い), ゼロ de れい et de 零, 一月 de いちがつ. Une nuance qui cite une lecture ou un homophone sera vérifiée contre la fiche ; les lectures publiées et les furigana ne sont pas dans le périmètre.');
P('9. **Hors périmètre, à ne pas ouvrir** : les fonctions de l\'addendum A9, appliquées aux lots 23 et 24, la deixis, les classes (同じ en `determinant`, 全部 en `adverbe`), les sens et les catégories, tous relevant des axes C1 à C10 ou d\'arbitrages clos.');
P();
P('## 6. Découpage proposé');
P();
P(`**Six livraisons de ${Math.min(...Object.values(tailles))} à ${Math.max(...Object.values(tailles))} nuances**, de la taille de celles de la tranche 7 (6 à 9). Les dix lots sont de tailles très inégales (de 1 à 12 nuances) : les petits lots voisins sont réunis par thème, le lot 24 est coupé en deux par sous-thème. Aucune ENTRY n'est partagée entre deux livraisons.`);
P();
P('| Livraison | Contenu | Nuances | ENTRY |');
P('|---|---|---|---|');
for (const [k, l] of Object.entries(L)) P(`| ${k} | ${TITRE[k]} : ${[...l].sort(parNumero).map(nom).join(', ')} | ${l.length} | ${new Set(l.map((u) => u.entree)).size} |`);
P(`| **Total** | | **${T8.length}** | **${ENTREES.length}** |`);
P();
P(`**Deux choix de regroupement à valider** : (a) 早い, du lot 21, est placé avec le lot 17 en 8b, parce que 遅い y renvoie à はやい et que 早い renvoie à 速い ; (b) また, l'autre nuance du lot 21, est placé en 8c avec les lots 22 et 23. Le lot 21 est donc partagé entre deux livraisons, sans qu'aucune ENTRY le soit. **Options** : (1) cinq livraisons, en réunissant 8e et 8f (${L['8e'].length + L['8f'].length} nuances, tout le lot 24) ; (2) garder le lot 21 entier en 8c (8b : ${L['8b'].length - 1} ; 8c : ${L['8c'].length + 1}). **Je propose les six livraisons du tableau.**`);
P();
P('**Ordre proposé** : 8a, 8b, 8c, 8d, 8e, 8f ; chaque livraison après l\'arbitrage de la précédente.');
P();
P('## 7. Critères reproductibles de complétude');
P();
P('Calculés par `a2-05-travail/perimetre-v1-lot2-t8.mjs`, qui s\'arrête au premier écart :');
P();
P(`1. **Point de départ** : le plan compte 278 nuances distinctes ; ${lues.length} sont arbitrées (bloc 1 bis 10, tranche 2 43, tranche 3 36, tranche 4 30, tranche 5 29, tranche 6 47, tranche 7 39), chaque décompte vérifié sur le plan ; il en reste ${T8.length}, toutes en tranche 8. Le rapport de 7e porte l'arbitrage du 2026-10-12 et la clôture de la tranche 7.`);
P(`2. **Aucune nuance oubliée** : ${lues.length} + ${T8.length} = ${toutes.length} ; la tranche 8 est exactement le complément des tranches arbitrées dans le plan. **Aucune comptée deux fois** : ${T8.length} identifiants distincts, et aucun n'appartient à une tranche arbitrée. Chaque ENTRY et chaque SENSE existe dans l'état publié ; chaque ENTRY est dans le fichier de son lot.`);
P(`3. **Livraisons** : ${Object.entries(tailles).map(([k, n]) => `${k} (${n})`).join(' + ')} = ${T8.length}, disjointes, leur réunion égale à la tranche ; aucune ENTRY n'est partagée entre deux livraisons.`);
P(`4. **Par lot** : ${LOTS.map((n) => `${n} : ${parLot(n).length}`).join(' ; ')} ; somme ${LOTS.reduce((a, n) => a + parLot(n).length, 0)}.`);
P('5. **Après la tranche 8** : il ne resterait aucune nuance du plan ; le contrôle de provenance du lot 2 serait entièrement arbitré (278 sur 278).');
P(`6. **Décomptes inchangés** : volet 2, 147 arbitrages (L 136, F 2, C 9, N 0) ; 377 candidats (les ${c377.length} de la tranche sont tous retrouvés dans le résultat du criblage) ; **173 corrections retenues** (173 lignes distinctes recomptées dans le bilan, ${nEntreesCorr} ENTRY), aucune appliquée.`);
P();
P('## 8. Limites et questions à arbitrer');
P();
P('Hors périmètre : le texte français des nuances (sauf à préserver l\'information attestée dans une correction) ; les axes C1 à C10 ; les fonctions de l\'addendum A9 ; les lectures et les furigana ; les relations elles-mêmes ; les champs autres que `nuance` ; toute correction. **L\'audit de la tranche 8 ne commence qu\'après la validation explicite de ce périmètre.**');
P();
P(`1. Le périmètre de la tranche 8 (${T8.length} nuances de dix lots, dans ${ENTREES.length} ENTRY, sans ajout ni retrait) est-il accepté ?`);
P(`2. Le découpage en six livraisons (${Object.entries(tailles).map(([k, n]) => `${k} : ${n}`).join(' ; ')}) est-il retenu, avec le partage du lot 21 entre 8b et 8c, ou l'une des deux options ?`);
P('3. Les règles arbitrées à la tranche 7 s\'appliquent-elles sans changement à la tranche 8 (§5, points 1 à 4 et 7), en particulier : un champ structuré validé (`suru_compatible`, une relation) ne fonde pas à lui seul un élément de nuance ?');
P('4. L\'audit de 8a seule est-il autorisé, chaque livraison suivant l\'arbitrage de la précédente ?');
if (/ $/m.test(md)) throw new Error('rapport : espace en fin de ligne');
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-tranche8-perimetre.md'), md);
console.log(`tranche 8 : ${T8.length} (${JSON.stringify(st8)}) ; lots : ${LOTS.map((n) => `${n} : ${parLot(n).length}`).join(' ; ')} ; livraisons : ${JSON.stringify(tailles)} ; ENTRY : ${ENTREES.length} ; niveaux : ${T8.filter((u) => u.niveau === 'entree').length} ENTRY, ${T8.filter((u) => u.niveau === 'sens').length} sens ; classes : ${JSON.stringify(cl)} ; 377 : ${avec377.length} nuances, ${c377.length} sens ; 147 : ${avec147.length} ; déjà corrigées : ${dejaCorr.length} ; relations : ${rel.length} portées, ${cibles.length} visant ; rouvertes : ${horsLot.length} ; fusions : ${fusions.length} ; arbitrées : ${lues.length}`);
