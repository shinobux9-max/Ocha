// A2-05 · volet 1 · lot 2 (provenance) : périmètre proposé de la tranche 6 (lots 10 et 11). Lecture seule ; ne juge aucune nuance.
// Lit le plan calculé par perimetre-v1-lot2-t2.mjs (provenance/plan-tranches.json, champ « toutes »).
// Usage : node perimetre-v1-lot2-t6.mjs <racine>   (écrit docs/rapports/etape2-A2-05-volet1-lot2-tranche6-perimetre.md)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2];
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const plan = read('a2-05-travail/provenance/plan-tranches.json');
const crib = read('a2-05-travail/criblage/resultat.json').candidats;
const vocab = read('data/n5/vocab.json');
const journal = read('reconstruction/a2-04/journal.json');
const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => /^lot-\d+\.json$/.test(f)).sort().map((f) => read(`reconstruction/a2-04/lots/${f}`));
const titre = Object.fromEntries(lots.map((l) => [l.lot.slice(4), l.title]));
const r5c = readFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-provenance-t5-5c.md'), 'utf8');
const bilan = readFileSync(join(root, 'docs/rapports/etape2-A2-05-bilan-volet2.md'), 'utf8');
const compte = (l, k) => Object.fromEntries(Object.entries(l.reduce((a, x) => ({ ...a, [k(x)]: (a[k(x)] ?? 0) + 1 }), {})).sort());
const court = (s) => s.replace(" (nuance d'ENTRY)", '');

// Contrôles d'entrée : la tranche 5 est close ; le plan arbitré est inchangé ; la liste des corrections compte 124 lignes
if (!r5c.includes('**arbitré le 2026-10-12**') || !r5c.includes('**La tranche 5 est close.**')) throw new Error('tranche 5 non close');
const toutes = plan.toutes;
if (toutes.length !== 278) throw new Error(`plan : ${toutes.length} au lieu de 278`);
const FAITES = ['1 bis', '2', '3', '4', '5'];
const lues = toutes.filter((u) => FAITES.includes(u.tranche));
if (lues.length !== 148) throw new Error(`lues : ${lues.length} au lieu de 148 (10 + 43 + 36 + 30 + 29)`);
const reste = toutes.filter((u) => !FAITES.includes(u.tranche));
if (reste.length !== 130) throw new Error(`reste : ${reste.length} au lieu de 130`);
const T6 = toutes.filter((u) => u.tranche === '6');
if (T6.some((u) => !['10', '11'].includes(u.lotN)) || reste.some((u) => ['10', '11'].includes(u.lotN) && u.tranche !== '6')) throw new Error('tranche 6 : lots 10 et 11 exactement');
if (new Set(T6.map((u) => u.sens)).size !== T6.length) throw new Error('doublon');
const CORR = [...bilan.matchAll(/^\| (V[12]-\d+|\d+) \| `((?:hj_)?v_\d+)(_s\d+)?`/gm)].map((m) => ({ n: m[1], entree: m[2], unite: m[2] + (m[3] ?? '') }));
if (CORR.length !== 124 || new Set(CORR.map((c) => c.n)).size !== 124) throw new Error(`corrections : ${CORR.length} lignes au lieu de 124`);
const nEntreesCorr = new Set(CORR.map((c) => c.entree)).size;
if (nEntreesCorr !== 112) throw new Error(`ENTRY corrigées : ${nEntreesCorr} au lieu de 112`);
const ordre = { 'à examiner': 0, 'faux positif à contre-vérifier': 1, 'un caractère seulement': 2 };
T6.sort((a, b) => a.lot.localeCompare(b.lot) || ordre[a.statut] - ordre[b.statut] || Number(a.entree.slice(2)) - Number(b.entree.slice(2)) || a.sens.localeCompare(b.sens));
const parTranche = Object.entries(compte(reste, (u) => u.tranche));
const n10 = T6.filter((u) => u.lotN === '10').length, n11 = T6.filter((u) => u.lotN === '11').length;
const sensDe = (u) => (u.niveau === 'sens' ? vocab.find((e) => e.id === u.entree)?.senses.find((s) => s.id === court(u.sens))?.meaning.primary : null);
for (const u of T6) if (u.niveau === 'sens' && !sensDe(u)) throw new Error(`sens introuvable dans l'état publié : ${u.sens}`);
for (const u of T6) if (!vocab.some((e) => e.id === u.entree)) throw new Error(`ENTRY absente de l'état publié : ${u.entree}`);
// Lot d'origine : toutes les décisions de journal de ces ENTRY sont des lots 10 et 11
const ENTREES = [...new Set(T6.map((u) => u.entree))];
const decT6 = journal.filter((d) => ENTREES.includes(String(d.entry).replace('n5_', '')));
const lotsDec = [...new Set(decT6.map((d) => d.lot))].sort();
if (JSON.stringify(lotsDec) !== JSON.stringify(['lot-10', 'lot-11'])) throw new Error(`décisions d'autres lots : ${lotsDec}`);
for (const u of T6) if (!lots.find((l) => l.lot === `lot-${u.lotN}`).entries[`n5_${u.entree}`]) throw new Error(`ENTRY hors de son lot : ${u.entree}`);

const MOTIF = { A: 'A-renvoi : la chaîne est le mot, une graphie ou une lecture d\'une autre ENTRY publiée, que les fiches ne citent pas', C: 'C-forme de l\'entrée : le mot de l\'ENTRY avec お ou ご, ou une terminaison en kana', D: 'D-exemple construit : une suite de mots absente des fiches', E: 'E-autre mot : un mot japonais absent des fiches et du vocabulaire publié', 'B-romaji': 'faux positif présumé, rapproché par le romaji de la fiche', 'B-transcription': 'faux positif présumé, rapproché par une autre écriture (kana, kanji, furigana)', S1: 'jamais signalée par le criblage ; relevée par une chaîne d\'un seul caractère' };
const QUESTION = { A: 'la fiche cite-t-elle ce mot, et sous cette graphie ; sinon, une décision validée l\'assume-t-elle avec un fondement vérifiable ?', C: 'la fiche écrit-elle cette forme (honorifique, conjuguée, composée) ?', D: 'la suite est-elle un exemple de la fiche, à la forme du dictionnaire, sans mot, particule ni construction changés, et sous les graphies que la fiche atteste ?', E: 'la fiche, ou une décision au fondement vérifiable, donne-t-elle ce mot ?', 'B-romaji': 'le mot de la fiche est-il le même mot, et sa graphie publiée est-elle attestée, ou seulement sa lecture ?', 'B-transcription': 'la correspondance repose-t-elle sur la graphie du mot, ou sur sa seule lecture (homophone possible) ?', S1: 'le caractère est-il un mot que la fiche écrit, ou seulement un élément d\'un mot plus long ?' };
const chainesTexte = (u) => {
  const c = u.chaines.filter((k) => !k.classe.startsWith('B')).map((k) => k.chaine);
  const b = u.chaines.filter((k) => k.classe.startsWith('B')).map((k) => `${k.chaine}${u.parLecture.includes(k.chaine) ? ' (par la lecture)' : ' (par la graphie)'}`);
  const s = u.uns.map((k) => `${k.c}${k.absent ? ' (absent des fiches)' : ''}`);
  return [c.length ? c.join(' ; ') : null, b.length ? `écartées : ${b.join(' ; ')}` : null, s.length ? `un caractère : ${s.join(' ; ')}` : null].filter(Boolean).join(' — ') || '—';
};
const nom = (u) => `${u.mot}${u.niveau === 'sens' ? ` (sens ${court(u.sens).split('_s').pop()})` : ''}`;
const unites = (l) => l.map((u) => `\`${court(u.sens)}\` ${u.mot}`).join(' ; ');

// Découpage proposé : cinq livraisons, par sous-thème, à l'intérieur de chaque lot
const POSITION = ['隣', 'そば', '上', '中', '下', '外', '後ろ', '横', '縦', '表'];
const KOSOA = ['こちら', 'そちら', 'あちら', 'あっち', 'あの', 'こっち', 'こんな', 'そっち'];
const CHOIX = ['どちら', 'どっち', 'どの', 'どれ'];
const L = {
  '6a': T6.filter((u) => u.lotN === '10' && POSITION.includes(u.mot)),
  '6b': T6.filter((u) => u.lotN === '10' && !POSITION.includes(u.mot)),
  '6c': T6.filter((u) => u.lotN === '11' && KOSOA.includes(u.mot)),
  '6d': T6.filter((u) => u.lotN === '11' && CHOIX.includes(u.mot)),
  '6e': T6.filter((u) => u.lotN === '11' && !KOSOA.includes(u.mot) && !CHOIX.includes(u.mot))
};
const TITRE = {
  '6a': 'lot 10, **positions relatives**',
  '6b': 'lot 10, **directions, distance et repères**',
  '6c': 'lot 11, **séries こ, そ, あ** (démonstratifs)',
  '6d': 'lot 11, **どちら et le choix**',
  '6e': 'lot 11, **autres interrogatifs et pronoms de personne**'
};
const tailles = Object.fromEntries(Object.entries(L).map(([k, l]) => [k, l.length]));
if (JSON.stringify(tailles) !== JSON.stringify({ '6a': 10, '6b': 9, '6c': 10, '6d': 7, '6e': 11 })) throw new Error(`découpage : ${JSON.stringify(tailles)}`);
const reunis = Object.values(L).flat();
if (reunis.length !== T6.length || new Set(reunis.map((u) => u.sens)).size !== T6.length) throw new Error('livraisons : réunion ou disjonction');
if (L['6a'].length + L['6b'].length !== n10 || L['6c'].length + L['6d'].length + L['6e'].length !== n11) throw new Error('livraisons : lots');
const livraisonDe = new Map(Object.entries(L).flatMap(([k, l]) => l.map((u) => [u.entree, k])));
// une ENTRY n'est pas partagée entre deux livraisons
for (const [k, l] of Object.entries(L)) for (const u of l) if (livraisonDe.get(u.entree) !== k) throw new Error(`ENTRY partagée entre livraisons : ${u.entree}`);

let md = '';
const P = (t = '') => { md += `${t}\n`; };
P('# Étape 2 · A2-05 · Volet 1 · Lot 2 — périmètre proposé de la tranche 6 du contrôle de provenance');
P();
P('**Date** : 2026-10-12');
P('**Statut** : **périmètre arbitré le 2026-10-12** (ChatGPT, par délégation ; relayé par l\'utilisateur) : **47 nuances des lots 10 et 11, dans 41 ENTRY, sans ajout ni retrait** ; **cinq livraisons** : 6a (10), 6b (9), 6c (10), 6d (7), 6e (11). **Audit documentaire autorisé pour 6a seule** ; chaque livraison suivante attend l\'arbitrage de la précédente. Les 377 candidats C1 à C10 et les 147 arbitrages du volet 2 ne sont pas rouverts ; la tranche reste strictement limitée à la provenance des nuances. **Ordre fixé par le même arbitrage** : un checkpoint Git documentaire est préparé et relu avant l\'audit de 6a. La proposition est conservée telle quelle ci-dessous.');
P();
P('**Statut d\'origine (proposition)** : *proposition de périmètre, non arbitrée. Aucun audit lexical de la tranche 6 n\'est commencé : aucune nuance n\'a été lue en vue d\'un verdict.* Calculé par `a2-05-travail/perimetre-v1-lot2-t6.mjs`, en lecture seule, sur le plan arbitré (`provenance/plan-tranches.json`) ; rien n\'est modifié dans les données, le journal, les registres, les outils ni les snapshots. Les chaînes citées ci-dessous sont celles que le criblage et le tri ont relevées mécaniquement ; aucune fiche source n\'a été ouverte pour ce rapport.');
P();
P('## 1. Point de départ');
P();
P(`**La tranche 5 est close** (arbitrage de 5c du 2026-10-12 ; lots 08 et 09 : 29 nuances, 14 sourcées, 2 assumées, 13 écarts). Avec le bloc 1 bis et les tranches 2 à 4, **${lues.length} des 278 nuances du plan sont arbitrées ; restent ${reste.length}**, réparties par le plan arbitré : ${parTranche.map(([t, n]) => `tranche ${t} : ${n}`).join(' ; ')}. **124 corrections retenues (10 + 5 + 109), dans 112 ENTRY, aucune appliquée** ; 377 candidats des axes C1 à C10 et 147 arbitrages du volet 2 inchangés. Plus aucune nuance hors JLPT n'est à contrôler.`);
P();
P('## 2. Composition, thème et taille');
P();
const st6 = compte(T6, (u) => u.statut);
P(`**La tranche 6 est celle du plan arbitré : toutes les nuances restantes des lots 10 et 11, et elles seules.** Lot 10 : « ${titre['10']} » ; lot 11 : « ${titre['11']} ». **Thème** : les mots de repérage, dans l'espace (noms de position, directions, distance) et dans l'énonciation (démonstratifs, interrogatifs, pronoms). Ce sont des mots courts et fonctionnels : le lot 10 est surtout signalé par de brèves locutions (classe D), le lot 11 par des renvois d'un mot de série à l'autre (こちら et こっち, どちら et どこ, 誰 et どなた ; classes A et B) et par des formules.`);
P();
P(`**Taille : ${T6.length} nuances, dans ${ENTREES.length} ENTRY** : ${st6['à examiner'] ?? 0} à examiner, ${st6['faux positif à contre-vérifier'] ?? 0} faux positifs présumés à contre-vérifier, ${st6['un caractère seulement'] ?? 0} relevées par un caractère isolé seulement ; ${T6.filter((u) => u.niveau === 'entree').length} nuances d'ENTRY, ${T6.filter((u) => u.niveau === 'sens').length} nuances de sens. Par lot : 10 : ${n10} (${new Set(T6.filter((u) => u.lotN === '10').map((u) => u.entree)).size} ENTRY) ; 11 : ${n11} (${new Set(T6.filter((u) => u.lotN === '11').map((u) => u.entree)).size} ENTRY). **Aucune particule** ne reste à contrôler.`);
P();
P(`**Lot d'origine** : chaque ENTRY figure dans le fichier du lot indiqué, et les ${decT6.length} décisions de journal de ces ${ENTREES.length} ENTRY sont toutes des lots 10 et 11 : aucune n'a été rouverte ni décidée ailleurs.`);
P();
P('| # | Livraison | Unité | Mot | Sens (traduction principale publiée) | Lot | Statut | Classe | Chaînes (signalées — écartées par le tri — d\'un caractère) | Sens candidats du volet 1 (restent candidats) | Sens des 147 (verdict non rouvert) | Renvois relevés (tranche de l\'ENTRY citée) |');
P('|---|---|---|---|---|---|---|---|---|---|---|---|');
const parNumero = (a, b) => Number(a.entree.slice(2)) - Number(b.entree.slice(2)) || a.sens.localeCompare(b.sens);
const TABLE = Object.values(L).flatMap((l) => [...l].sort(parNumero)); // par livraison, puis par numéro d'ENTRY
if (TABLE.length !== T6.length) throw new Error('tableau incomplet');
TABLE.forEach((u, i) => P(`| ${i + 1} | ${livraisonDe.get(u.entree)} | \`${court(u.sens)}\`${u.niveau === 'entree' ? ' (nuance d\'ENTRY)' : ''} | ${u.mot} | ${u.niveau === 'sens' ? `« ${sensDe(u)} »` : '—'} | ${u.lotN} | ${u.statut} | ${u.motif} | ${chainesTexte(u)} | ${u.candidats377.map((c) => `\`${c}\``).join(', ') || '—'} | ${u.dans147.map((c) => `\`${c}\``).join(', ') || '—'} | ${u.renvois.map((r) => `${r.mot} (${r.tranche})`).join(' ; ') || '—'} |`));
P();
P('## 3. Classes de détection');
P();
P('La classe d\'une nuance est celle de sa chaîne la plus lourde (tri factuel du lot 2) ; elle **oriente la lecture et ne préjuge d\'aucun verdict**. Chaque nuance sera lue en entier, chaînes d\'un caractère comprises, sur ses fiches entières (fiches fusionnées, exemples, anciens exemples, décisions).');
P();
P('| Classe | Définition | Nuances | Question à poser à la fiche |');
P('|---|---|---|---|');
const cl = compte(T6, (u) => u.motif);
for (const k of ['A', 'C', 'D', 'E', 'B-romaji', 'B-transcription', 'S1']) if (cl[k]) P(`| ${k} | ${MOTIF[k]} | ${cl[k]} : ${T6.filter((u) => u.motif === k).map(nom).join(', ')} | ${QUESTION[k]} |`);
P();
const mixtes = T6.filter((u) => new Set(u.chaines.map((k) => k.classe)).size > 1);
P(`**Nuances à chaînes de classes différentes** (la classe la plus lourde figure au tableau ; toutes les chaînes seront contrôlées) : ${mixtes.map((u) => `${nom(u)} (${u.chaines.map((k) => `${k.chaine} : ${k.classe}`).join(' ; ')})`).join(' ; ') || 'aucune'}.`);
P();
const abs = T6.filter((u) => u.uns.some((k) => k.absent));
P(`**Chaînes d'un caractère relevées** : ${T6.filter((u) => u.uns.length).length} nuances en portent ; ${abs.length} ${abs.length > 1 ? 'ont' : 'a'} un caractère absent de tous les textes des fiches${abs.length ? ` (${abs.map((u) => `${u.mot} : ${u.uns.filter((k) => k.absent).map((k) => k.c).join('')}`).join(' ; ')})` : ''}. Le relevé sert au seul repérage : un caractère isolé n'est jamais une preuve.`);
P();
const faux = T6.filter((u) => u.statut === 'faux positif à contre-vérifier');
P(`**Faux positifs présumés (${faux.length})** : ${faux.map((u) => `${nom(u)} (${u.chaines.filter((k) => k.classe.startsWith('B')).map((k) => k.chaine).join(', ')})`).join(' ; ')}. Chacun est contre-vérifié individuellement : l'identité du mot se distingue de la simple identité de lecture (défaut du tri retenu à l'arbitrage du 2026-10-10).`);
P();
P('## 4. Chevauchements, dépendances et comparables');
P();
const avec377 = T6.filter((u) => u.candidats377.length);
const avec147 = T6.filter((u) => u.dans147.length);
const c377 = [...new Set(T6.flatMap((u) => u.candidats377))];
for (const id of c377) if (!crib.some((c) => c.id === id)) throw new Error(`candidat absent du criblage : ${id}`);
const regles = compte(c377.flatMap((id) => crib.find((c) => c.id === id).regles.map((g) => g.regle)), (x) => x);
const res = c377.filter((id) => crib.find((c) => c.id === id).regles.some((g) => g.regle === 'RES'));
const motDuSens = (id) => vocab.find((e) => id.startsWith(`${e.id}_s`))?.word;
const par377 = (n) => T6.filter((u) => u.lotN === n && u.candidats377.length);
P(`- **Candidats du volet 1 (axes C1 à C10)** : ${avec377.length} nuances sur ${T6.length} portent sur un sens candidat ou sur une ENTRY qui en a un (**${c377.length} sens distincts sur 377**) : lot 10, ${par377('10').length} nuances (${unites(par377('10'))}) ; lot 11, ${par377('11').length} nuances sur ${n11} (toutes sauf ${unites(T6.filter((u) => u.lotN === '11' && !u.candidats377.length))}). Ils restent candidats pour leurs propres relevés ; **le décompte reste 377**. Le chevauchement est bien plus fort que dans les tranches précédentes (6 sens à la tranche 5). Règles du criblage en cause, par nombre de sens : ${Object.entries(regles).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} (${n})`).join(', ')} ; C4-0 et C2-0 sont les populations imposées « \`semantic_type: null\` avec une fonction linguistique » et « \`category: null\` avec une fonction linguistique » ; RES est le point réservé de la deixis temporelle (${res.map((id) => `\`${id}\` ${motDuSens(id)}`).join(', ')}). **Le contrôle ne porte que sur le champ \`nuance\`** : il n'ouvre ni l'examen de ces fonctions, ni le chantier normatif de \`interrogatif\`, ni le point réservé de la deixis temporelle.`);
P(`- **Sens des 147 du volet 2** : ${avec147.length} nuances (${unites(avec147)}) ; leurs verdicts ne sont pas rouverts : le contrôle ne porte que sur \`nuance\`.`);
const dejaCorr = ENTREES.map((e) => ({ mot: T6.find((u) => u.entree === e).mot, c: CORR.filter((c) => c.entree === e) })).filter((x) => x.c.length);
if (dejaCorr.some((x) => x.c.some((c) => !/^\d+$/.test(c.n)))) throw new Error('une correction V1 ou V2 vise une ENTRY de la tranche : texte du rapport à revoir');
P(`- **Corrections déjà retenues sur les mêmes ENTRY** (recherche dans les 124 lignes de la liste globale) : ${dejaCorr.map((x) => `${x.mot} (${x.c.map((c) => `volet 2, n° ${c.n}, \`${c.unite}\``).join(' ; ')})`).join(' ; ') || 'aucune'} ; elles visent \`semantic_type\` et \`category\`, non \`nuance\`. Aucune correction V1 ni V2 ne vise une ENTRY de la tranche.`);
const versArb = T6.flatMap((u) => u.renvois.filter((r) => ['1, arbitrée', ...FAITES].includes(r.tranche)).map((r) => `${u.mot} → ${r.mot} (${r.tranche})`));
P(`- **Renvois vers des ENTRY des lots déjà traités** (lecture croisée, précédents cités, non rouverts) : ${[...new Set(versArb)].join(' ; ') || 'aucun'}.`);
const interne = T6.flatMap((u) => u.renvois.filter((r) => r.tranche === '6').map((r) => ({ de: u, vers: r })));
const memeLiv = interne.filter((x) => livraisonDe.get(x.vers.id) === livraisonDe.get(x.de.entree));
const autreLiv = interne.filter((x) => livraisonDe.has(x.vers.id) && livraisonDe.get(x.vers.id) !== livraisonDe.get(x.de.entree));
const horsUnites = interne.filter((x) => !livraisonDe.has(x.vers.id));
const fl = (l) => [...new Set(l.map((x) => `${x.de.mot} → ${x.vers.mot}`))].join(' ; ') || 'aucun';
P(`- **Renvois à l'intérieur des lots 10 et 11** : dans la même livraison : ${fl(memeLiv)} ; d'une livraison à l'autre : ${[...new Set(autreLiv.map((x) => `${x.de.mot} (${livraisonDe.get(x.de.entree)}) → ${x.vers.mot} (${livraisonDe.get(x.vers.id)})`))].join(' ; ') || 'aucun'} ; vers une ENTRY des lots 10 et 11 qui n'a aucune nuance au plan (sa fiche sera lue pour le renvoi, sans verdict sur elle) : ${fl(horsUnites)}.`);
const plusTard = T6.flatMap((u) => u.renvois.filter((r) => !['1, arbitrée', ...FAITES, '6'].includes(r.tranche)).map((r) => `${u.mot} → ${r.mot} (${r.tranche})`));
P(`- **Rapprochements du tri vers les tranches suivantes** : ${[...new Set(plusTard)].join(' ; ') || 'aucun'}. Ce sont des rapprochements mécaniques par la lecture, à contre-vérifier comme tels ; ils ne préjugent pas que la nuance renvoie à ces ENTRY.`);
P('- **`v_704_s1` 近く figure déjà à la tranche 1, pour un autre élément** : la tranche 1 a contrôlé sa **particule** の (sourcée, arbitrée le 2026-10-10) ; le plan range ici sa **nuance**, faux positif présumé. Il n\'y a ni double compte ni réouverture : les 278 nuances du plan ne comprennent pas les particules.');
P('- **Comparables utiles déjà arbitrés** (cités pour la cohérence, non rouverts) : お手洗い / トイレ (V2-76) et クラス / 教室 (D0414 ; V2-87) : un renvoi d\'un mot à son voisin n\'est sourcé que par la fiche examinée, et assumé que par une décision au fondement vérifiable, l\'attestation réciproque ne suffisant pas (comparables pour les renvois entre こちら et こっち, どちら et どこ, どう et いかが, 誰 et どなた) ; 国 (V2-109 : お国はどちらですか, question honorifique construite) et les formes honorifiques des lots 01 et 02 (critère 3), pour les chaînes おいくつですか, どちら様ですか, お茶はいかがですか ; 皆さん (V2-53 : みんな, transcription en kana recevable), que le tri rapproche de 皆 ; 方 (V2-51 : あの方) ; 話す (5b) et 泳ぐ (5c) : variante expressément autorisée par la description de la fiche ; 橋 et 花 (bloc 1 bis), 弾く (5c) : traitement d\'un homophone ; 来る (V2-25) et いい (V2-31) : forme que la fiche nomme sans l\'écrire.');
P('- **Précédents applicables, sans changement** : critères 1 à 3 ; graphie attestée pour le mot, jamais déduite par analogie (lot 00) ; transcription en kana d\'un romaji attesté recevable, sans ajout de kanji (lot 01) ; classement **sourcé / assumé / écart** (lot 02) ; une attestation dans la fiche d\'une autre ENTRY ne suffit pas sans décision (lot 03) ; une décision qui nomme une expression pour fonder un découpage ne la source pas (lots 02 et 06) ; forme du dictionnaire et retrait de mots non essentiels admis, complément ou particule changés non admis (5a) ; variante expressément autorisée par la description de la fiche (5b) ; information française attestée préservée.');
P();
P('## 5. Découpage proposé');
P();
P(`**Cinq livraisons de ${Math.min(...Object.values(tailles))} à ${Math.max(...Object.values(tailles))} nuances, pour que chaque fiche soit lue en entier** (les livraisons de la tranche 5 en comptaient 9, 9 et 11). Chaque lot est coupé par sous-thème ; aucune ENTRY n'est partagée entre deux livraisons.`);
P();
P('| Livraison | Contenu | Nuances | ENTRY |');
P('|---|---|---|---|');
for (const [k, l] of Object.entries(L)) P(`| ${k} | ${TITRE[k]} : ${l.map(nom).join(', ')} | ${l.length} | ${new Set(l.map((u) => u.entree)).size} |`);
P(`| **Total** | | **${T6.length}** | **${ENTREES.length}** |`);
P();
P('**Raisons du découpage** (d\'après les seuls relevés du tri) :');
P();
P('- **6a** réunit les noms de position, dont les couples que le tri rapproche (中 et 外, 横 et 縦) et les trois nuances de classe E (そば, 中, 表) ;');
P('- **6b** réunit les points cardinaux et l\'angle (北, 南, 角), la distance (近い, 遠い, les deux sens de 近く) et les deux sens signalés de 先 et de 前 ;');
P('- **6c** tient ensemble les séries こ, そ, あ, dont les formes en ちら sont rapprochées de leurs formes en っち (こちら et こっち, そちら et そっち, あちら et あっち) ;');
P('- **6d** tient ensemble les quatre nuances de どちら (trois sens et l\'ENTRY) et les mots dont le tri les rapproche (どっち, どれ), avec どの ;');
P('- **6e** réunit les autres interrogatifs (いかが et どう, なぜ, いくつ), les trois mots 誰, どなた et 誰か, et les pronoms (私, あなた, 自分, 皆).');
P();
P(`**Options** : (1) quatre livraisons, en réunissant 6d et 6e (${L['6d'].length + L['6e'].length} nuances : tous les interrogatifs et les pronoms) ; (2) deux livraisons par lot (${n10} et ${n11}), comme pour les tranches 3 et 4. **Je propose cinq livraisons** : le lot 11 compte ${n11} nuances presque toutes candidates du volet 1, aux renvois croisés serrés, et une livraison de ${n11} ne permettrait pas de lire chaque fiche en entier.`);
P();
P('**Ordre proposé** : 6a, 6b, 6c, 6d, 6e ; chaque livraison après l\'arbitrage de la précédente, sans nouvelle décision de périmètre.');
P();
P('## 6. Critères reproductibles de complétude');
P();
P('Calculés par `a2-05-travail/perimetre-v1-lot2-t6.mjs`, qui s\'arrête au premier écart :');
P();
P(`1. **Point de départ** : le plan compte 278 nuances ; ${lues.length} sont arbitrées (bloc 1 bis 10, tranche 2 43, tranche 3 36, tranche 4 30, tranche 5 29) ; il en reste ${reste.length}. Le rapport de 5c porte l'arbitrage du 2026-10-12 et la clôture de la tranche 5.`);
P(`2. **Tranche 6** : ${T6.length} identifiants distincts ; ce sont exactement les nuances restantes des lots 10 et 11, et aucune nuance restante de ces lots n'est hors de la tranche ; chaque ENTRY et chaque SENSE existe dans l'état publié ; chaque ENTRY est dans le fichier de son lot, et toutes ses décisions de journal sont des lots 10 et 11.`);
P(`3. **Livraisons** : ${Object.entries(tailles).map(([k, n]) => `${k} (${n})`).join(' + ')} = ${T6.length}, disjointes ; 6a et 6b forment exactement le lot 10 (${n10}) ; 6c, 6d et 6e exactement le lot 11 (${n11}) ; aucune ENTRY n'est partagée entre deux livraisons.`);
P(`4. **Après la tranche 6** : il resterait ${reste.length - T6.length} nuances du plan (${parTranche.filter(([t]) => t !== '6').map(([t, n]) => `tranche ${t} : ${n}`).join(' ; ')}).`);
P(`5. **Décomptes inchangés** : volet 2, 147 sur 147 (L 136, F 2, C 9, N 0) ; 377 candidats (les ${c377.length} de la tranche sont tous retrouvés dans le résultat du criblage) ; **124 corrections retenues** (124 lignes distinctes recomptées dans la liste globale du bilan : 10 + 5 + 109 ; ${nEntreesCorr} ENTRY), aucune appliquée ; hors JLPT : 2, arbitrées.`);
P();
P('## 7. Limites et questions à arbitrer');
P();
P('Hors périmètre : le texte français des nuances (sauf à préserver l\'information attestée dans une correction) ; les axes C1 à C10, dont les fonctions linguistiques des démonstratifs et des interrogatifs ; les champs autres que `nuance` ; toute correction. **L\'audit de la tranche 6 ne commence qu\'après la validation explicite de ce périmètre.**');
P();
P(`1. Le périmètre de la tranche 6 (${T6.length} nuances des lots 10 et 11, dans ${ENTREES.length} ENTRY, sans ajout ni retrait) est-il accepté ?`);
P(`2. Le découpage en cinq livraisons (${Object.entries(tailles).map(([k, n]) => `${k} : ${n}`).join(' ; ')}) est-il retenu, ou l'une des deux options ?`);
P('3. L\'audit de 6a seule est-il autorisé, chaque livraison suivant l\'arbitrage de la précédente ?');
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-volet1-lot2-tranche6-perimetre.md'), md);
console.log(`tranche 6 : ${T6.length} (${JSON.stringify(st6)}) ; 10 : ${n10} ; 11 : ${n11} ; livraisons : ${JSON.stringify(tailles)} ; ENTRY : ${ENTREES.length} ; classes : ${JSON.stringify(cl)} ; 377 : ${avec377.length} nuances, ${c377.length} sens ; 147 : ${avec147.length} ; reste après : ${reste.length - T6.length}`);
