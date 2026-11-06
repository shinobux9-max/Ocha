// A2-05 · bloc F · recherche d'omissions, temps 3, groupe E, livraison E2 (adjectifs, T2-nuls) : rédige le rapport de relecture (proposition), en deux
// groupes de lecture (a adjectifs en i, b adjectifs en na, selon la classe de l'ENTRY), à partir des faits du dossier (perimetre-E.json) et de l'analyse
// écrite à la main (analyse-E2.json), et le recueil des 31 fiches sources complètes. Lecture seule sur les données, sources, journal et lots.
// Contrôles : une analyse par sens de E2, et aucune autre ; champs présents ; conclusion parmi les trois d'A10 ; groupe de lecture conforme à la classe ;
// décisions citées existantes et propres à l'ENTRY ; toutes les décisions de journal de chaque ENTRY citées ; corrections citées exactes et complètes ;
// verdict du volet 2 cité exact (contre l'audit des null) ; aucun sens commun au lot 3 ; frontières demandées (classe et valeur nulle en R3 pour chaque
// sens ; information demandée et information désignée pour いい, まずい, 暇 et 大丈夫 ; marques grammaticales pour les énoncés en ね et les questions en か ;
// sens qui nomme une question pour 易しい ; registre poli pour 悪い et 大丈夫 ; dimensions pour 便利, 大切, 易しい ; sens 1 pour la question de まずい) ;
// porteurs cités effectivement porteurs d'`interrogatif` ; relevé des phrases en forme de question identique au relevé calculé, chacune citée dans l'analyse
// de son ENTRY ; mentions de 質問 et mots interrogatifs exacts. Transposé de rediger-rapport-E1.mjs. N'écrit que deux fichiers neufs (refus d'écraser).
// Usage : node a2-05-travail/omissions-temps3/rediger-rapport-E2.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', RAP = O + 'rapport-relecture-E2.md', FIC = O + 'fiches-E2.md';
for (const f of [RAP, FIC]) if (existsSync(join(root, f))) throw new Error(f + ' existe déjà');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n'); const json = (p) => JSON.parse(txt(p));
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; };
const arret = () => { if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); } };

const PE = O + 'perimetre-E.json', PE_SHA = '0f4682d8b00a2d3befb2581a0f74cbc0bfe3eacb9a5f8a2e3a578f032c0539b5';
ok(sha(PE) === PE_SHA, 'dossier factuel du périmètre E accepté, à son empreinte', PE_SHA.slice(0, 16));
arret();
const P = json(PE), AN = json(O + 'analyse-E2.json');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const src = [...json('reconstruction/a2-04/sources/vocab.json'), ...json('reconstruction/a2-04/sources/vocab-hors-jlpt.json')];
const ex = json('reconstruction/a2-04/sources/exemples.json').vocab ?? {}; const J = json('reconstruction/a2-04/journal.json');
const AUDIT = txt('docs/rapports/etape2-A2-05-audit-null.md').split('\n');
const CONCL = ['ne relève pas de la fonction', 'relève de la fonction', 'à arbitrer'];
const GRP = { a: 'adjectifs en i (`adjectif_i`)', b: 'adjectifs en na (`adjectif_na`)' };
const CLS = { a: 'adjectif_i', b: 'adjectif_na' };
const grpDe = (classe) => Object.keys(CLS).find((g) => CLS[g] === classe);
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const court = (d) => d.replace('A2-04-', '');
const porteurs = new Set(pub.filter((e) => e.senses.some((s) => fns(s).includes('interrogatif'))).map((e) => e.id));
const ENT = P.entrees.filter((e) => e.classe === 'adjectif_i' || e.classe === 'adjectif_na');
const SP = ENT.flatMap((e) => e.sensPublies.filter((s) => s.candidatE).map((s) => ({ ...s, entry: e.entry, classe: e.classe })));
const ids = SP.map((s) => s.id);
ok(ENT.length === 27 && SP.length === 30, 'livraison E2 : 30 sens dans 27 ENTRY de classe `adjectif_i` ou `adjectif_na`', ENT.length + ' ENTRY, ' + SP.length + ' sens');
ok(ENT.filter((e) => e.classe === 'adjectif_i').length === 15 && SP.filter((s) => s.classe === 'adjectif_i').length === 17, 'adjectifs en i : 15 ENTRY, 17 sens ; adjectifs en na : 12 ENTRY, 13 sens');
ok(JSON.stringify(Object.keys(AN).sort()) === JSON.stringify([...ids].sort()), 'une analyse par sens de E2, et aucune autre', Object.keys(AN).length + ' analyses');
arret();
const verdictsAudit = (id) => AUDIT.filter((l) => l.startsWith('#### `' + id + '`')).map((l) => (l.match(/— \*\*([LFCN])\*\*$/) ?? [])[1]);
const V2TXT = (v) => v.length === 2 ? 'Volet 2 : verdicts ' + v.join(' et ') : 'Volet 2 : verdict ' + v[0];
let nDec = 0, nCorr = 0;
for (const e of ENT) {
  const E = pub.find((x) => x.id === e.entry);
  const sensE = e.sensPublies.filter((s) => s.candidatE).map((s) => s.id); const texteE = sensE.map((i) => Object.values(AN[i]).join(' ')).join(' ');
  for (const d of e.decisions) { nDec++; if (!new RegExp('\\b' + court(d.id) + '\\b').test(texteE)) ok(false, e.entry + ' : décision de journal de l\'ENTRY non citée', court(d.id)); }
  for (const sp of e.sensPublies.filter((s) => s.candidatE)) {
    const id = sp.id; const a = AN[id] ?? {}; const S = E.senses.find((x) => x.id === id);
    const manque = ['groupe', 'indice', 'r1', 'r2', 'r3', 'r4', 'r5', 'conclusion', 'motif'].filter((k) => !String(a[k] ?? '').trim());
    if (manque.length) ok(false, id + ' : champs manquants', manque.join(', '));
    if (!CONCL.includes(a.conclusion)) ok(false, id + ' : conclusion hors des trois d\'A10', a.conclusion);
    if (a.groupe !== grpDe(e.classe)) ok(false, id + ' : groupe de lecture non conforme à la classe de son ENTRY', a.groupe + ' / ' + grpDe(e.classe));
    if (fns(S).length) ok(false, id + ' : le sens porte une fonction publiée, hors du thème T2-nuls', fns(S).join());
    const texte = Object.values(a).join(' ');
    for (const d of texte.match(/\bD\d{4}\b/g) ?? []) if (!J.some((x) => x.id === 'A2-04-' + d)) ok(false, id + ' : décision citée inexistante', d);
    for (const d of texte.match(/\bD\d{4}\b/g) ?? []) if (!e.decisions.some((x) => court(x.id) === d)) ok(false, id + ' : décision citée étrangère à l\'ENTRY', d);
    if (sp.lot3 || !/hors des 377/.test(a.r5) || /lot 3 \([A-FT]\d+/.test(texte)) ok(false, id + ' : lot 3 : le sens n\'est pas commun aux 377, et le R5 doit le dire', String(sp.lot3));
    for (const c of texte.match(/\bV[12]-\d+\b/g) ?? []) if (!e.corrections.some((x) => x.startsWith(c + ' '))) ok(false, id + ' : correction citée étrangère à l\'ENTRY', c);
    for (const m of texte.matchAll(/volet 2, modification (\d+)/g)) if (!e.corrections.some((x) => x.startsWith('volet 2, modification ' + m[1] + ' '))) ok(false, id + ' : modification du volet 2 citée étrangère à l\'ENTRY', m[1]);
    for (const m of texte.matchAll(/porteur `(v_\d+)`/g)) if (!porteurs.has(m[1])) ok(false, id + ' : porteur cité sans la fonction', m[1]);
    const va = verdictsAudit(id);
    if (JSON.stringify(va) !== JSON.stringify(sp.volet2)) ok(false, id + ' : verdict du volet 2 du dossier différent de l\'audit des null', va.join() + ' / ' + sp.volet2.join());
    if (!a.r5.includes(V2TXT(sp.volet2) + ' ')) ok(false, id + ' : verdict du volet 2 non cité exactement en R5', V2TXT(sp.volet2));
    if (!/§3, point 2/.test(a.r3) || !/§5, points? [12]/.test(a.r3)) ok(false, id + ' : frontière de la classe et de la valeur nulle (A10, §3, point 2 ; §5) non examinée en R3');
  }
  for (const c of e.corrections) { nCorr++; const cid = c.split(' (')[0]; if (!texteE.includes(cid)) ok(false, e.entry + ' : correction retenue non citée', cid); }
}
ok(nDec === 84, 'les 84 décisions de journal des 27 ENTRY, chacune citée', nDec + ' décisions');
ok(nCorr === 10, 'les 10 corrections retenues des 7 ENTRY, chacune citée', nCorr + ' corrections');
const v2 = SP.map((s) => s.volet2.join('+')); ok(v2.every((x) => x === 'L'), 'verdicts du volet 2 : L 30', 'L ' + v2.filter((x) => x === 'L').length);
const nul = (k) => SP.filter((s) => s.nul === k).length;
ok(nul('catégorie') === 30, 'valeurs nulles : catégorie 30 (aucun type nul)', 'catégorie ' + nul('catégorie'));
for (const id of ['v_420_s1', 'v_427_s2', 'v_457_s1', 'v_512_s1']) ok(/Information demandée et information désignée \(§2\)/.test(AN[id].r3), id + ' : contenu de la question et porteur ; frontière de l\'information demandée et de l\'information désignée (A10, §2) examinée en R3');
for (const id of ['v_420_s1', 'v_457_s1', 'v_495_s2', 'v_512_s1', 'v_609_s1']) ok(/§4, point 5/.test(AN[id].r3), id + ' : énoncé en ね ou question en か ; marques grammaticales (A10, §4, point 5) examinées en R3');
ok(/§4, point 4/.test(AN.v_456_s1.r3), 'v_456_s1 : 質問 dans la fiche, frontière du sens qui nomme une question (A10, §4, point 4) examinée en R3');
for (const id of ['v_452_s1', 'v_512_s1']) ok(/§4, point 3/.test(AN[id].r3), id + ' : emploi d\'adresse ; frontière du registre poli (A10, §4, point 3) examinée en R3');
for (const id of ['v_432_s1', 'v_442_s1', 'v_456_s1']) ok(/§5, point 3/.test(AN[id].r3), id + ' : dimension publiée ; A10, §5, point 3 examiné en R3');
ok(/sens 1/.test(AN.v_427_s2.r2) && /§3, point 3/.test(AN.v_427_s2.r3), 'まずい : la question de la fiche rattachée au sens 1, non candidat ; sens par sens (A10, §3, point 3)');
ok(/E3/.test(AN.v_420_s1.r3) && /てもいいですか/.test(AN.v_420_s1.r3), 'いい : les demandes de permission, absentes de ses fiches, renvoyées à E3');
ok(/D1113/.test(AN.v_434_s1.r5) && /D1424/.test(AN.v_421_s1.r5) && /D0074/.test(AN.v_495_s2.r5) && /intensifieur/.test(AN.v_495_s2.r4), 'décisions qui parlent des fonctions (D1113, D1424, D0074) confrontées ; intensifieur du sens 1 de 大変 examiné en R4');

// Relevé des phrases des sources relues
const nu = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/<rt>[^<]*<\/rt>/g, '').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const plat = (s) => s.replace(/[\s「」。]/g, '');
const phrases = (fid) => { const s = src.find((x) => x.id === fid); return [['exemple', s.example], ...(ex[fid] ?? []).map((x, i) => ['ancien exemple ' + (i + 1), x])].map(([o, x]) => ({ fid, o, j: nu(x.japanese), f: nu(x.french), brut: x.japanese })); };
const toutes = ENT.flatMap((e) => e.fiches.flatMap((f) => phrases(f.id).map((p) => ({ ...p, mot: e.mot, entry: e.entry }))));
const Q = [
  ['n5_v_420', 'exemple', 'いい', 'énoncé en ね, traduit « n\'est-ce pas ? » : assertion soumise à l\'accord ; 良い, épithète de てんき', 'ね'],
  ['n5_v_420', 'ancien exemple 2', 'いい', 'énoncé en ね, souhait (〜といい) soumis à l\'accord ; いい, épithète et prédicat', 'ね'],
  ['n5_v_420', 'ancien exemple 3', 'いい', 'どう (porteur `v_393`), question ouverte ; 良かった, dans la réponse', 'ouverte'],
  ['n5_v_583', 'exemple', 'いい (fiche fusionnée)', 'énoncé en ね, traduit « n\'est-ce pas ? » ; 良い, épithète de てんき', 'ね'],
  ['n5_v_583', 'ancien exemple 1', 'いい (fiche fusionnée)', 'énoncé en ね, traduit « n\'est-ce pas ? » ; いい, épithète de 天気', 'ね'],
  ['n5_v_583', 'ancien exemple 2', 'いい (fiche fusionnée)', 'どう (porteur `v_393`), question ouverte ; いい, dans la réponse', 'ouverte'],
  ['n5_v_427', 'ancien exemple 3', 'まずい (sens 1, non candidat)', 'どう (porteur `v_393`), question ouverte ; まずい, dans la réponse', 'ouverte'],
  ['n5_v_457', 'ancien exemple 1', '暇', 'question fermée, marquée par か ; 暇, contenu soumis à confirmation', 'fermée'],
  ['n5_v_508', 'ancien exemple 3', '大変 (fiche fusionnée, sens 2)', 'énoncé en ね, traduit « n\'est-ce pas ? » ; たいへん, prédicat', 'ね'],
  ['n5_v_512', 'ancien exemple 1', '大丈夫', 'question de vérification, marquée par か ; 大丈夫, contenu vérifié, repris dans la réponse', 'fermée'],
  ['n5_v_512', 'ancien exemple 3', '大丈夫', 'question fermée sur 終わります, marquée par か ; 大丈夫, dans la réponse', 'fermée'],
  ['n5_v_609', 'exemple', '立派 (sens 1)', 'énoncé en ね, traduit « n\'est-ce pas ? » ; 立派, prédicat', 'ね'],
];
const calcule = toutes.filter((p) => /[?？]/.test(p.f)).map((p) => p.fid + ' · ' + p.o);
const releve = Q.map(([f, o]) => f + ' · ' + o);
ok(JSON.stringify([...calcule].sort()) === JSON.stringify([...releve].sort()), 'relevé des phrases traduites par une question identique au relevé calculé : 12 phrases', calcule.length + ' phrases');
for (const [fid, o] of Q) { const p = toutes.find((x) => x.fid === fid && x.o === o); const tE = ENT.find((e) => e.entry === p.entry).sensPublies.filter((s) => s.candidatE).map((s) => AN[s.id].r2).join(' '); if (!plat(tE).includes(plat(p.j))) ok(false, 'relevé : phrase non citée dans le R2 de son ENTRY', fid + ' · ' + o); }
for (const [, , , porte] of Q) for (const m of porte.matchAll(/porteur `(v_\d+)`/g)) if (!porteurs.has(m[1])) ok(false, 'relevé : porteur cité sans la fonction', m[1]);
const forme = (k) => Q.filter((q) => q[4] === k).length; ok(forme('ね') === 6 && forme('ouverte') === 3 && forme('fermée') === 3, 'formes : 6 énoncés en ね, 3 questions ouvertes en どう, 3 questions fermées en か');
const sitsu = toutes.filter((p) => /質問/.test(p.j)).map((p) => p.fid + ' · ' + p.o).sort();
ok(JSON.stringify(sitsu) === JSON.stringify(['n5_v_456 · ancien exemple 2']), '質問 nommé dans une phrase : 易しい, ancien exemple 2', sitsu.length + ' phrase(s)');
const interrog = toutes.filter((p) => /どう|何|だれ|誰|どこ|いつ(?!も)|いくら|どの|どれ|どちら|なぜ|どうして|いかが|いくつ/.test(p.j)).map((p) => p.fid + ' · ' + p.o).sort();
ok(JSON.stringify(interrog) === JSON.stringify(['n5_v_420 · ancien exemple 3', 'n5_v_427 · ancien exemple 3', 'n5_v_583 · ancien exemple 2']), 'mots interrogatifs dans les phrases : どう seul, dans trois questions ouvertes', interrog.join(', '));
const rtNu = toutes.filter((p) => /<rt>/.test(String(p.brut).replace(/<ruby>[^<]*<rt>[^<]*<\/rt><\/ruby>/g, '')));
ok(rtNu.length === 1 && rtNu[0].fid === 'n5_v_451' && /<\/gem>/.test(rtNu[0].brut), 'furigana hors balise ruby : une phrase, 強い ancien exemple 3, balise `</gem>` (observation hors périmètre)', rtNu.map((p) => p.fid + ' · ' + p.o).join(', '));
const nAE = ENT.reduce((n, e) => n + e.fiches.reduce((m, f) => m + (ex[f.id] ?? []).length, 0), 0); const nFi = ENT.reduce((n, e) => n + e.fiches.length, 0);
ok(nFi === 31 && nAE === 93 && toutes.length === 124, 'sources : 31 fiches, 93 anciens exemples, 124 phrases', nFi + ' fiches, ' + nAE + ' anciens exemples, ' + toutes.length + ' phrases');
const nonCand = ENT.flatMap((e) => e.sensPublies.filter((s) => !s.candidatE).map((s) => ({ ...s, mot: e.mot })));
ok(nonCand.length === 9 && ENT.flatMap((e) => e.decisions).filter((d) => d.fonctions).map((d) => court(d.id)).sort().join() === 'D0074,D1113,D1424', 'neuf sens non candidats ; trois décisions qui portent sur les fonctions ou en parlent (D0074, D1113, D1424)');
ok(!ko, 'analyses complètes, conclusions admises, groupes conformes ; décisions, corrections, verdicts du volet 2 et porteurs cités exacts et complets ; frontières demandées examinées ; relevés exacts');
arret();

const compte = Object.fromEntries(CONCL.map((c) => [c, ids.filter((i) => AN[i].conclusion === c).length]));
const parG = Object.fromEntries(Object.keys(GRP).map((g) => [g, ids.filter((i) => AN[i].groupe === g)]));
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const decR = (id) => '« ' + J.find((x) => x.id === id).reason + ' »';
const sensDe = (id) => { const sp = SP.find((s) => s.id === id); return pub.find((x) => x.id === sp.entry).senses.find((x) => x.id === id); };
const deuxCand = ENT.filter((e) => e.sensPublies.filter((s) => s.candidatE).length > 1);
const L = ['# Étape 2 · A2-05 · bloc F · recherche d\'omissions d\'`interrogatif`, temps 3 — relecture du groupe E, livraison E2 (adjectifs)', '',
  '**Date** : 2026-11-05', '**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; aucune omission n\'est appliquée. E3 n\'est pas commencée.', '',
  '**Autorisation** (relayée) : « J\'autorise maintenant l\'ouverture de la relecture lexicale E2, strictement limitée aux 30 sens adjectivaux dans 27 ENTRY du périmètre E déjà accepté. Applique la méthode R1 à R5 selon A10. Pour chaque sens, lis intégralement la fiche source, ses traductions, nuances et exemples, les anciens exemples, l\'ENTRY publiée et les décisions historiques applicables. Examine particulièrement les 12 phrases en forme de question et les emplois de いい et 大丈夫 dans les questions de vérification, sans confondre le contenu de la question avec le porteur intrinsèque de la fonction interrogative. Les arbitrages précédents du volet 2 restent inchangés. Les valeurs nulles de catégorie ou de type ne constituent pas à elles seules une preuve de la fonction. Produis un rapport E2 en proposition, avec une analyse R1 à R5 et une conclusion motivée pour chacun des 30 sens. […] Ne commence pas E3. »', '',
  '**Base** :', '- addendum A10 (§2 définition ; §3 principes ; §4 frontières ; §5 rapports avec la catégorie, le type et les dimensions ; §6 cumul ; §8 temps 3) ;', '- périmètre du groupe E accepté le 2026-11-05 (QE-1 à QE-4), inscrit (`docs/rapports/etape2-A2-05-omissions-interrogatif-E-perimetre.md`, §0) ;', '- arbitrage de la livraison E1, inscrit (`docs/rapports/etape2-A2-05-omissions-interrogatif-E1.md`, §0), dont la distinction entre fonction interrogative, information désignée et information demandée ;', '- arbitrage du groupe D, point 3 : « la présence du mot relu dans une question ne prouve pas qu\'il porte la fonction » ;', '- dossier factuel `perimetre-E.json` (SHA-256 `' + PE_SHA.slice(0, 16) + '…`).', '',
  'Les 31 fiches sources complètes, leurs 93 anciens exemples, les 27 ENTRY publiées et leurs 84 décisions de journal sont recueillis dans `fiches-E2.md`. Les analyses individuelles sont dans `analyse-E2.json`, et rendues en entier aux sections 4 et 5.', '',
  '## 1. Synthèse', '',
  '| Conclusion | a | b | Total |', '|---|---|---|---|',
  ...CONCL.map((c) => '| ' + c + ' | ' + Object.keys(GRP).map((g) => parG[g].filter((i) => AN[i].conclusion === c).length).join(' | ') + ' | ' + compte[c] + ' |'),
  '| **Total** | **' + parG.a.length + '** | **' + parG.b.length + '** | **30** |', '',
  'Les deux groupes de lecture suivent la classe de l\'ENTRY (a ' + GRP.a + ', b ' + GRP.b + '), pour faciliter la lecture ; ils n\'ont aucune valeur de décision, et la classe ne décide pas de la fonction (A10, §3, point 2).', '',
  '**Aucune omission n\'est signalée dans la livraison E2.** Les 30 sens ne sont relevés que par une valeur nulle (`T2-nuls`) : tous sont sans catégorie, aucun n\'est sans type. Un `null` de catégorie est une absence justifiée (A5) ; il ne dit rien de la fonction (A10, §5, point 1 ; §8, temps 2). Aucune fiche ne décrit un emploi qui demande une information : les sens attribuent une propriété, une appréciation ou un état.', '',
  '**Douze phrases ont une traduction en forme de question** (§2.1). Aucune ne fait du mot relu le porteur de l\'interrogation : six sont des énoncés en ね, traduits « n\'est-ce pas ? », qui soumettent une assertion à l\'accord de l\'interlocuteur ; trois sont des questions ouvertes, où どう tient la place de l\'appréciation demandée et où l\'adjectif est dans la réponse ; trois sont des questions fermées en か, où l\'adjectif est le contenu soumis à confirmation, ou la réponse. La distinction entre le contenu de la question et le porteur de la fonction est au §3.2, notamment pour いい et 大丈夫.', '',
  '| N° | Groupe | SENSE | Mot | Traduction publiée | Valeur nulle | Volet 2 | Conclusion | Motif |', '|---|---|---|---|---|---|---|---|---|',
  ...SP.map((sp, i) => { const E = pub.find((x) => x.id === sp.entry); const S = sensDe(sp.id); return '| ' + (i + 1) + ' | ' + AN[sp.id].groupe + ' | `' + sp.id + '` | ' + E.word + ' | ' + cell(S.meaning.primary) + ' | ' + sp.nul + ' | ' + sp.volet2.join(', ') + ' | ' + AN[sp.id].conclusion + ' | ' + cell(AN[sp.id].motif) + ' |'; }), '',
  '## 2. Les phrases des sources relues', '',
  '### 2.1 Phrases en forme de question', '',
  'Relevé complet, vérifié par le script : toute phrase des 31 fiches dont la traduction est une question (12). Aucune interrogation indirecte n\'y figure. Une question d\'exemple n\'atteste pas la fonction du mot illustré (A10, §3, point 1 ; §8, temps 1 ; arbitrage du groupe D, point 3) ; elle est lue en entier, et le rapport dit ce qui porte l\'interrogation, la place qu\'y tient le mot relu et le sens qu\'elle illustre.', '',
  '| N° | Fiche | Mot (sens illustré) | Phrase | Traduction de la source | Forme | Ce qui porte l\'interrogation ; place du mot relu |', '|---|---|---|---|---|---|---|',
  ...Q.map(([fid, o, mot, porte, fo], i) => { const p = toutes.find((x) => x.fid === fid && x.o === o); return '| ' + (i + 1) + ' | `' + fid + '`, ' + o + ' | ' + mot + ' | ' + cell(p.j) + ' | ' + cell(p.f) + ' | ' + { 'ね': 'énoncé en ね', ouverte: 'question ouverte', 'fermée': 'question fermée' }[fo] + ' | ' + cell(porte) + ' |'; }), '',
  'Une de ces phrases illustre un sens qui n\'est pas candidat (まずい, sens 1, le goût) : elle est lue pour l\'ENTRY, et rapportée au sens relu (§3.3). Deux exemples identiques (きょうは良いてんきですね) figurent dans les deux fiches fusionnées de いい ; ils sont comptés deux fois, comme dans le dossier.', '',
  '### 2.2 Autres mentions et rencontres de surface', '',
  '- **Mots interrogatifs** : le script n\'en trouve qu\'un dans les ' + toutes.length + ' phrases, どう (porteur `v_393`), dans les trois questions ouvertes du §2.1. いつも (賑やか, 静か) n\'est pas いつ.',
  '- **質問 nommé** dans une phrase : 易しい, ancien exemple 2 (その質問は易しいので、すぐ答えられました). 質問 nomme une question sans interroger (A10, §4, point 4), et 易しい en est l\'attribut.',
  '- **Requêtes et défenses en 〜てください, 〜ないでください** (弱い, 易しい, 大切, 汚い, 危ない) : elles demandent une action, non une information (A10, §2).',
  '- **Énoncés en ね sans traduction en question** : 立派, ancien exemple 3 (「きれいなうちですね」「ええ、とても立派ですね」), et いい, ancien exemple 3 de `n5_v_583` (明日また いい日になるといいですね, « Ce serait bien… ») ; même analyse que les énoncés en ね du §2.1.',
  '- **Emploi d\'avertissement** : 危ない, ancien exemple 2 (「あぶない！」), une exclamation, gardée en nuance par D1113.',
  '- **Demandes de permission** (〜てもいいですか) : aucune dans les fiches de いい ; le périmètre les a relevées dans des fiches de verbes, relues en E3.', '',
  '## 3. Frontières, cohérence et points signalés', '',
  '### 3.1 Frontières examinées', '',
  '| Frontière | Où elle s\'applique | Résultat |', '|---|---|---|',
  '| **Classe et valeur nulle** (A10, §3, point 2 ; §5, points 1 et 2) | les 30 sens | les classes `adjectif_i` et `adjectif_na` et l\'absence de catégorie ne décident jamais ; aucun sens n\'est sans type |',
  '| **Information demandée et information désignée** (§2) | いい, まずい (questions ouvertes) ; 暇, 大丈夫 (questions fermées) | §3.2 |',
  '| **Marques grammaticales** (§4, point 5) | ね (いい, 大変, 立派) ; か (暇, 大丈夫, et les questions en どう) | hors du périmètre d\'A10 ; ce sont elles qui marquent la question fermée ou la demande d\'accord, et la traduction « n\'est-ce pas ? » rend ね |',
  '| **Sens qui nomme une question** (§4, point 4) | 質問, dans la fiche de 易しい | 質問 nomme une question ; 易しい la qualifie |',
  '| **Registre poli et emplois d\'adresse** (§4, point 3, par analogie) | l\'excuse de 悪い ; l\'emploi de 大丈夫 pour rassurer ; l\'avertissement de 危ない | se disent en nuance ; ils s\'adressent à l\'interlocuteur sans lui demander une information |',
  '| **Indéfini** (§4, point 1) | いろいろ | sans objet : いろいろ n\'est pas formé sur un mot interrogatif, et désigne une pluralité de choses |',
  '| **Dimensions** (§5, point 3) | 便利 (D1110), 大切 (D1103), 易しい (D1092) | une dimension caractérise le sens et ne remplace aucune fonction |',
  '| **Cumul** (§6) | 大変, dont le sens 1 non candidat porte `intensifieur` ; les 30 sens, sans fonction publiée | `interrogatif` n\'étant établi pour aucun sens, aucun cumul ne se pose |', '',
  '### 3.2 Le contenu de la question et le porteur de la fonction', '',
  'A10, §2, définit la fonction par un rôle : le mot **tient la place** de l\'information non spécifiée et **appelle une réponse** qui la fournit. Une phrase peut être une question sans qu\'aucun mot n\'y tienne la place d\'un inconnu : c\'est le cas de la question fermée, où l\'inconnu est seulement la vérité de ce qui est dit. Les douze phrases se rangent en trois cas :', '',
  '| Cas | Phrases | Ce qui est inconnu | Ce qui interroge | Place de l\'adjectif relu |', '|---|---|---|---|---|',
  '| **Question ouverte** | いい (deux), まずい | une appréciation | どう (porteur `v_393`), qui tient la place de l\'appréciation | dans la réponse : il fournit l\'information demandée (élément de la réponse) |',
  '| **Question fermée, de vérification** | 暇, 大丈夫 (deux) | la vérité d\'un énoncé entièrement spécifié (oui ou non) | か, marque grammaticale, hors d\'A10 | contenu de la question (暇, 大丈夫ですか), ou réponse (大丈夫, à 終わりますか) |',
  '| **Énoncé en ね, traduit « n\'est-ce pas ? »** | いい (quatre), 大変, 立派 | rien : l\'énoncé est une assertion soumise à l\'accord | ね, marque grammaticale, hors d\'A10 | prédicat ou épithète de l\'assertion |', '',
  '**大丈夫 dans « 体は大丈夫ですか ».** C\'est la frontière la plus proche de la fonction dans E2, et celle que l\'autorisation demande d\'examiner. La phrase demande bien quelque chose, la confirmation que tout va bien ; mais ce qu\'elle demande n\'est tenu par aucun mot : l\'énoncé « votre santé va bien » est complet, et か le soumet à l\'interlocuteur. 大丈夫 est le **contenu** de la question, ce sur quoi porte la vérification ; il n\'en est pas le **porteur**. La réponse le montre : un interrogatif est remplacé dans la réponse par l\'information qu\'il demandait (どう → いい) ; ici la réponse reprend 大丈夫 lui-même (はい、大丈夫です), qui n\'était pas en suspens. Le même mot, dans la même fiche, sert à rassurer (「しんぱいしないで、大丈夫です。」) et à répondre (ancien exemple 3) : c\'est le même sens, « tout est en ordre », que la question met en doute.', '',
  '**いい.** Ses fiches ne contiennent aucune question de vérification en いいですか ; ses six phrases en forme de question sont quatre énoncés en ね et deux questions ouvertes en どう. Dans les questions ouvertes, いい est exactement ce que la question attend : l\'appréciation que どう laisse en suspens. Il est l\'information fournie, non la place de l\'information. Les emplois de いい dans les demandes de permission (〜てもいいですか), où いい serait le contenu soumis à l\'accord, ne figurent que dans des fiches de verbes, relues en E3.', '',
  '**暇.** « あなたは明日暇ですか » se lit comme « 大丈夫ですか » : question fermée, 暇 contenu de la question, か porteur de l\'interrogation.', '',
  '### 3.3 Sens relus et sens non candidats d\'une même ENTRY', '',
  'Chaque sens est relu pour lui-même (A10, §3, point 3). Trois ENTRY ont deux sens candidats : ' + deuxCand.map((e) => '**' + e.mot + '** (' + e.sensPublies.filter((s) => s.candidatE).map((s) => '`' + s.id + '`').join(', ') + ')').join(' ; ') + ' ; leurs décisions communes sont citées sous le sens 1. Neuf ENTRY ont un sens qui n\'est pas candidat, et qui n\'est donc pas relu ici :', '',
  ...nonCand.map((s) => '- `' + s.id + '` ' + s.mot + ' « ' + s.traduction + ' »' + (s.fonctions?.length ? ' : il porte `' + s.fonctions.join('`, `') + '` et n\'est relevé par aucun filtre.' : ' : il a une catégorie et un type, et aucun filtre ne l\'a relevé.')), '',
  'Les phrases de la fiche qui les illustrent sont lues pour l\'ENTRY, et rapportées au sens relu : c\'est le cas de la question de まずい (le goût). **Ces neuf sens ne sont pas, de ce fait, vérifiés conformes** (A10, §8, compte rendu) : la relecture ne leur donne aucune conclusion.', '',
  '### 3.4 Points signalés, sans contradiction avec A10', '',
  '1. **Trois décisions parlent des fonctions.** D1113 (危ない) garde l\'avertissement en nuance, sans sens ni fonction pragmatique ; D1424 (いろいろ) refuse toute fonction sans définition normative, avant A9 ; D0074 (大変) laisse nul le type du sens 1, emploi intensifieur (A6). Aucune n\'attribue ni ne refuse `interrogatif`, et aucune ne traite de la question ; elles s\'accordent avec A10. Aucune n\'est réécrite.',
  '2. **D1100 (悪い)** note que la traduction de la source dit « formule polie » et sa nuance « familièrement » pour l\'excuse, et suit la nuance. Ce constat ne touche pas la fonction.',
  '3. **Le périmètre annonçait, pour いい et 大丈夫, des emplois de vérification** (proposition, §5, point 4). Pour 大丈夫, la relecture en trouve une (ancien exemple 1) ; pour いい, aucune : ses fiches n\'ont que des énoncés en ね et des questions en どう. La conclusion n\'en dépend pas.',
  '4. **Aucune décision ne contredit la définition d\'A10.** Les 84 décisions de E2 portent sur le découpage, les fusions, les catégories nulles, les dimensions, les traductions et les nuances ; aucune n\'emploie le vocabulaire de la question.', '',
  '## 4 et 5. Relecture, sens par sens, en deux groupes', '',
  'Pour chaque sens sont donnés :', '- les filtres d\'origine, conservés depuis la mesure ;', '- l\'indice qui l\'a fait relever ;', '- l\'état publié, avec le verdict du volet 2, cité et non rouvert ;', '- puis R1 à R5, selon la grille acceptée (QE-3).', '',
  'Toutes les décisions de journal de l\'ENTRY sont citées en entier sous l\'ENTRY, et confrontées en R5.', ''];
const NUM = { a: 4, b: 5 };
for (const g of Object.keys(GRP)) {
  L.push('## ' + NUM[g] + '. Groupe ' + g + ' — ' + GRP[g] + ' (' + parG[g].length + ' sens)', '');
  for (const e of ENT.filter((x) => grpDe(x.classe) === g)) {
    const E = pub.find((x) => x.id === e.entry);
    L.push('### ' + E.word + ' (' + (E.readings?.[0]?.kana ?? '') + ') — `' + e.entry + '`, classe `' + e.classe + '`', '',
      '- **Fiche source** : ' + e.fiches.map((fi) => '`' + fi.id + '` (' + fi.lot + ', ' + fi.anciensExemples + ' anciens exemples)').join(' ; ') + (e.fiches.length > 1 ? ' — fiche fusionnée comprise' : '') + '.',
      '- **Sens publiés** : ' + e.sensPublies.map((s) => '`' + s.id + '` « ' + s.traduction + ' »' + (s.candidatE ? '' : ' (non candidat)')).join(' ; ') + '.',
      '- **Nuance de l\'ENTRY** : ' + (E.nuance ? '« ' + E.nuance + ' »' : 'aucune') + '.',
      '- **Décisions de journal de l\'ENTRY** (' + e.decisions.length + ', toutes `validated`) :', ...e.decisions.map((d) => '  - **' + court(d.id) + '** (' + d.champ + ', ' + d.nature + ') : ' + decR(d.id)),
      '- **Corrections retenues, non appliquées** : ' + (e.corrections.join(' ; ') || 'aucune') + '.', '');
    for (const sp of e.sensPublies.filter((s) => s.candidatE)) {
      const s = P.sens.find((x) => x.id === sp.id); const a = AN[sp.id]; const S = E.senses.find((x) => x.id === sp.id);
      L.push('#### `' + sp.id + '` · « ' + S.meaning.primary + ' » — proposé : **' + a.conclusion + '**', '',
        '- **Filtres d\'origine** : ' + s.filtres.map((x) => '`' + x + '`').join(', ') + '.',
        '- **Indice relevé** : ' + a.indice,
        '- **État publié** :', '  - traductions « ' + [S.meaning.primary, ...(S.meaning.alternatives ?? [])].join(' ; ') + ' » ;', '  - catégorie `' + cat(S.category) + '` ; type `' + S.semantic_type + '` ;', '  - fonctions ' + (fns(S).map((x) => '`' + x + '`').join(', ') || 'aucune') + ' ;', '  - nuance du sens : ' + (S.nuance ? '« ' + S.nuance + ' »' : 'aucune') + ' ;', '  - volet 2 : verdict ' + sp.volet2.join(', ') + ' (cité, non rouvert) ; lot 3 : hors des 377.',
        '- **R1** (rôle de demander une information non spécifiée) : ' + a.r1, '- **R2** (attestation par la fiche) : ' + a.r2, '- **R3** (frontières) : ' + a.r3, '- **R4** (cumul) : ' + a.r4, '- **R5** (décisions existantes) : ' + a.r5,
        '- **Conclusion proposée** : **' + a.conclusion + '**. **Motif** : ' + a.motif, '');
    }
  }
}
const rtListe = rtNu.map((p) => p.mot + ' (`' + p.fid + '`, ' + p.o + ')');
L.push('## 6. Décomptes séparés', '',
  '- **Livraison E2** : 30 sens relus (a ' + parG.a.length + ', b ' + parG.b.length + ') dans 27 ENTRY ; ' + compte[CONCL[0]] + ' « ne relève pas de la fonction », ' + compte[CONCL[1]] + ' « relève de la fonction », ' + compte[CONCL[2]] + ' « à arbitrer ».',
  '- **Volet 2** : les 30 verdicts sont cités, non rouverts : L 30. Ils portent sur la catégorie, jamais sur la fonction.',
  '- **Lot 3** : aucun sens de E2 n\'est commun aux 377 ; aucun verdict n\'est cité.',
  '- **Recherche d\'omissions** : après les groupes A à D et les livraisons E1 et E2, 182 sens relus sur 234 candidats (A 39, B 18, C 3, D 53, E1 39, E2 30) ; 52 restent, dans la livraison E3, non commencée. 573 sens n\'ont été relevés par aucun filtre ; ils n\'ont pas été relus et ne sont pas, de ce fait, vérifiés conformes. Ces décomptes ne s\'additionnent ni aux 377 ni au contrôle des 17 porteurs.', '',
  '## 7. Observations hors périmètre', '',
  'Relevées à la lecture, sans verdict ni correction ; aucune ne touche une conclusion. Les anomalies déjà journalisées (D0191, coquille « LaXiste » de 甘い ; D1158, としばこ de 静か) ne sont pas répétées.',
  '- 強い, ancien exemple 3 : le furigana de 欲 est ほしい, suivi de い (`欲<rt>ほしい</rt>い`, soit ほしいい) ; et, après 負, une balise fermante `</gem>` au lieu de `</ruby>` (seul cas de furigana hors balise ruby, ci-dessous).',
  '- きれい (`n5_v_472`), ancien exemple 3 : « 片けて », pour 片付けて ; exemple : « Les fleurs sont jolis ».',
  '- 忙しい, ancien exemple 3 : « Mère travaille occupée », traduction maladroite.',
  '- 立派, ancien exemple 2 : « un magnifique médecin (un médecin remarquable) » ; la traduction applique le sens 1 à une personne, la parenthèse rend le sens 2.',
  '- 大切, ancien exemple 3 : « un ami important (cher) ».',
  '- **Furigana hors balise ruby** (`<rt>` sans `<ruby>`) : ' + (rtNu.length ? rtNu.length + (rtNu.length > 1 ? ' phrases : ' : ' phrase : ') + rtListe.join(', ') + '.' : 'aucune phrase des 31 fiches.'), '',
  '## 8. Ce qui n\'est pas fait', '',
  '- Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; les 204 corrections restent non appliquées, dont les 10 qui concernent E2. Aucune correction lexicale n\'est préparée.',
  '- E3 n\'est pas commencée.',
  '- Les verdicts du volet 2 ne sont pas rouverts ; la catégorie et le type des 30 sens ne sont pas réexaminés ; les fonctions d\'A9 ne sont pas examinées.',
  '- Les neuf sens non candidats des ENTRY relues ne sont pas relus (§3.3).', '',
  '## 9. Décisions attendues', '',
  '1. Arbitrer les 30 conclusions proposées (toutes « ne relève pas de la fonction »), par groupe ou dans leur ensemble.',
  '2. Confirmer, ou non, les lectures du rapport : les douze phrases du §2.1 ; la distinction entre le contenu de la question et le porteur de la fonction (§3.2), notamment pour いい et 大丈夫 ; les points signalés (§3.4).',
  '3. Décider, séparément, de la suite (QE-4) : la préparation de l\'inscription documentaire de l\'arbitrage de E2, puis l\'ouverture de E3.', '');
writeFileSync(join(root, RAP), L.join('\n'));

// Recueil des 31 fiches complètes
const LUS = ['reconstruction/a2-04/sources/vocab.json', 'reconstruction/a2-04/sources/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/exemples.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', 'reconstruction/a2-04/journal.json'];
const F = ['# Groupe E, livraison E2 — les 31 fiches sources complètes, leurs anciens exemples, les 27 ENTRY publiées et leurs décisions', '',
  'Recopiés tels quels, sans retouche, dans l\'ordre du périmètre :', '- fiches de `reconstruction/a2-04/sources/vocab.json` (sources figées) ;', '- anciens exemples de `reconstruction/a2-04/sources/exemples.json` (clé `vocab`) ;', '- ENTRY de `data/n5/vocab.json` ;', '- décisions de journal de chaque ENTRY, de `reconstruction/a2-04/journal.json`, en entier.', '',
  'Empreintes des fichiers lus :', ...LUS.map((p) => '- `' + p + '` `' + sha(p).slice(0, 16) + '`'), ''];
let nf = 0, nx = 0, nd = 0;
for (const e of ENT) {
  F.push('## ' + e.mot + ' — `' + e.entry + '`', '');
  for (const f of e.fiches) { const s = src.find((x) => x.id === f.id); nf++; const xs = ex[f.id] ?? []; nx += xs.length;
    F.push('### Fiche source `' + f.id + '`', '', '```json', JSON.stringify(s, null, 1), '```', '', '### Anciens exemples de `' + f.id + '` (' + xs.length + ')', '', xs.length ? '```json\n' + JSON.stringify(xs, null, 1) + '\n```' : 'Aucun.', ''); }
  F.push('### ENTRY publiée `' + e.entry + '`', '', '```json', JSON.stringify(pub.find((x) => x.id === e.entry), null, 1), '```', '');
  const ds = e.decisions.map((d) => J.find((x) => x.id === d.id)); nd += ds.length;
  F.push('### Décisions de journal de `' + e.entry + '` (' + ds.length + ')', '', '```json', JSON.stringify(ds, null, 1), '```', '');
}
writeFileSync(join(root, FIC), F.join('\n'));
ok(nf === 31 && nx === 93 && nd === 84, 'recueil : 31 fiches sources complètes, 93 anciens exemples, 84 décisions', nf + ' fiches, ' + nx + ' anciens exemples, ' + nd + ' décisions');
console.log('écrits : ' + RAP + ', ' + FIC); console.log('rédaction conforme ; ' + JSON.stringify(compte));
