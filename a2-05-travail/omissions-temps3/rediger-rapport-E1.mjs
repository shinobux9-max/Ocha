// A2-05 · bloc F · recherche d'omissions, temps 3, groupe E, livraison E1 (noms, T2-nuls) : rédige le rapport de relecture (proposition), en quatre
// groupes de lecture (a parties du corps, b personnes, c unités et compteur, d objets, notions et autres), à partir des faits du dossier (perimetre-E.json)
// et de l'analyse écrite à la main (analyse-E1.json), et le recueil des 39 fiches sources complètes. Lecture seule sur les données, sources, journal et lots.
// Contrôles : une analyse par sens de E1, et aucune autre ; champs présents ; conclusion parmi les trois d'A10 ; groupe de lecture constant par ENTRY ;
// décisions citées existantes et propres à l'ENTRY ; toutes les décisions de journal de chaque ENTRY citées ; corrections citées exactes et complètes ;
// verdict du volet 2 cité exact (contre l'audit des null) ; aucun sens commun au lot 3 ; frontières demandées (classe et valeur nulle en R3 pour chaque
// sens ; information désignée pour les noms de personne ; registre poli pour 方 et 皆さん ; sens qui nomme une question là où 質問 figure ; indéfinis pour
// お腹 et 物 ; marques grammaticales pour l'alternative indirecte de 表 ; sens 1 pour 時間 et 意味) ; porteurs cités effectivement porteurs d'`interrogatif` ;
// relevé des phrases en forme de question identique au relevé calculé, chacune citée dans l'analyse de son ENTRY ; mentions de 質問 exactes.
// N'écrit que deux fichiers neufs (refus d'écraser).
// Usage : node a2-05-travail/omissions-temps3/rediger-rapport-E1.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', RAP = O + 'rapport-relecture-E1.md', FIC = O + 'fiches-E1.md';
for (const f of [RAP, FIC]) if (existsSync(join(root, f))) throw new Error(f + ' existe déjà');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n'); const json = (p) => JSON.parse(txt(p));
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; };
const arret = () => { if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); } };

const PE = O + 'perimetre-E.json', PE_SHA = '0f4682d8b00a2d3befb2581a0f74cbc0bfe3eacb9a5f8a2e3a578f032c0539b5';
ok(sha(PE) === PE_SHA, 'dossier factuel du périmètre E accepté, à son empreinte', PE_SHA.slice(0, 16));
arret();
const P = json(PE), AN = json(O + 'analyse-E1.json');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const src = [...json('reconstruction/a2-04/sources/vocab.json'), ...json('reconstruction/a2-04/sources/vocab-hors-jlpt.json')];
const ex = json('reconstruction/a2-04/sources/exemples.json').vocab ?? {}; const J = json('reconstruction/a2-04/journal.json');
const AUDIT = txt('docs/rapports/etape2-A2-05-audit-null.md').split('\n');
const CONCL = ['ne relève pas de la fonction', 'relève de la fonction', 'à arbitrer'];
const GRP = { a: 'parties du corps et faculté', b: 'personnes', c: 'unités de mesure et compteur', d: 'objets, notions et autres' };
const GE = { a: ['v_44', 'v_46', 'v_48', 'v_51', 'v_54', 'v_57', 'v_58', 'v_60', 'v_61', 'v_65', 'v_67', 'v_603', 'v_690', 'v_716'], b: ['v_633', 'v_657', 'v_667', 'v_686', 'v_687', 'v_627'],
  c: ['v_321', 'v_363', 'v_364', 'v_366', 'v_611', 'v_648'], d: ['v_287', 'v_513', 'v_646', 'v_653', 'v_671', 'v_675', 'v_684', 'v_685', 'v_694', 'v_696', 'v_713'] };
const grpDe = (entry) => Object.keys(GE).find((g) => GE[g].includes(entry));
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const court = (d) => d.replace('A2-04-', '');
const porteurs = new Set(pub.filter((e) => e.senses.some((s) => fns(s).includes('interrogatif'))).map((e) => e.id));
const ENT = P.entrees.filter((e) => e.classe === 'nom');
const SP = ENT.flatMap((e) => e.sensPublies.filter((s) => s.candidatE).map((s) => ({ ...s, entry: e.entry })));
const ids = SP.map((s) => s.id);
ok(ENT.length === 37 && SP.length === 39, 'livraison E1 : 39 sens dans 37 ENTRY de classe `nom`', ENT.length + ' ENTRY, ' + SP.length + ' sens');
ok(ENT.every((e) => grpDe(e.entry)) && Object.values(GE).flat().length === 37, 'chaque ENTRY dans un seul groupe de lecture');
ok(JSON.stringify(Object.keys(AN).sort()) === JSON.stringify([...ids].sort()), 'une analyse par sens de E1, et aucune autre', Object.keys(AN).length + ' analyses');
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
    if (a.groupe !== grpDe(e.entry)) ok(false, id + ' : groupe de lecture non conforme à son ENTRY', a.groupe + ' / ' + grpDe(e.entry));
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
ok(nDec === 101, 'les 101 décisions de journal des 37 ENTRY, chacune citée', nDec + ' décisions');
ok(nCorr === 22, 'les 22 corrections retenues des 18 ENTRY, chacune citée', nCorr + ' corrections');
const v2 = SP.map((s) => s.volet2.join('+')); const v2c = (k) => v2.filter((x) => x === k).length;
ok(v2c('L') === 33 && v2c('C') === 5 && v2c('L+L') === 1, 'verdicts du volet 2 : L 33, C 5, L deux fois 1 (声)', 'L ' + v2c('L') + ', C ' + v2c('C') + ', L+L ' + v2c('L+L'));
const nul = (k) => SP.filter((s) => s.nul === k).length;
ok(nul('type') === 24 && nul('catégorie') === 14 && nul('catégorie et type') === 1, 'valeurs nulles : type 24, catégorie 14, les deux 1', 'type ' + nul('type') + ', catégorie ' + nul('catégorie') + ', les deux ' + nul('catégorie et type'));
const PERS = ['v_633_s1', 'v_657_s1', 'v_667_s1', 'v_686_s1', 'v_687_s1', 'v_627_s2'];
for (const id of PERS) ok(/Information désignée et information demandée \(§2\)/.test(AN[id].r3), id + ' : nom de personne, frontière de l\'information désignée et de l\'information demandée (A10, §2) examinée en R3');
for (const id of ['v_667_s1', 'v_687_s1']) ok(/§4, point 3/.test(AN[id].r3), id + ' : frontière du registre poli (A10, §4, point 3) examinée en R3');
for (const id of ['v_513_s2', 'v_653_s1', 'v_675_s1', 'v_687_s1']) ok(/§4, point 4/.test(AN[id].r3), id + ' : 質問 dans la fiche, frontière du sens qui nomme une question (A10, §4, point 4) examinée en R3');
for (const id of ['v_44_s1', 'v_684_s1']) ok(/§4, point 1/.test(AN[id].r3), id + ' : frontière des indéfinis (A10, §4, point 1) examinée en R3');
ok(/§4, point 5/.test(AN.v_696_s1.r3) && /indirecte/.test(AN.v_696_s1.r2), '表 : alternative indirecte relevée en R2, marques grammaticales (A10, §4, point 5) en R3');
for (const id of ['v_513_s2', 'v_321_s2']) ok(/sens 1/.test(AN[id].r2) && /§3, point 3/.test(AN[id].r3), id + ' : phrases en forme de question rattachées au sens 1, non candidat ; sens par sens (A10, §3, point 3)');
ok(/D0406/.test(AN.v_694_s1.r5) && /もらえますか/.test(AN.v_694_s1.r5), '荷物 : la requête citée par D0406 relevée en R5');

// Relevé des phrases des sources relues
const nu = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/<rt>[^<]*<\/rt>/g, '').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const plat = (s) => s.replace(/[\s「」。]/g, '');
const phrases = (fid) => { const s = src.find((x) => x.id === fid); return [['exemple', s.example], ...(ex[fid] ?? []).map((x, i) => ['ancien exemple ' + (i + 1), x])].map(([o, x]) => ({ fid, o, j: nu(x.japanese), f: nu(x.french), brut: x.japanese })); };
const toutes = ENT.flatMap((e) => e.fiches.flatMap((f) => phrases(f.id).map((p) => ({ ...p, mot: e.mot, entry: e.entry }))));
const Q = [
  ['n5_v_321', 'ancien exemple 1', '時間 (sens 1)', 'invitation marquée par ませんか ; 時間 est dans la condition'],
  ['n5_v_321', 'ancien exemple 2', '時間 (sens 1)', 'どのくらい, où figure どの (porteur `v_398`) ; 時間 nomme la dimension demandée'],
  ['n5_v_513', 'ancien exemple 2', '意味 (sens 1)', 'どういう, où figure どう (porteur `v_393`) ; 意味 nomme le genre d\'information demandée ; 質問 nomme une question'],
  ['n5_v_611', 'ancien exemple 3', 'グラム', 'いくら (porteur `v_179`) ; グラム, dans la réponse'],
  ['n5_v_627', 'ancien exemple 2', '一人 (sens 2)', '誰 (porteur `v_402`) ; 一人, dans la réponse'],
  ['n5_v_633', 'exemple', '人', 'どなた (porteur `v_397`) ; 人, thème montré par あの'],
  ['n5_v_633', 'ancien exemple 1', '人', 'どなた (porteur `v_397`) ; 人, thème montré par あの'],
  ['n5_v_648', 'ancien exemple 2', '匹', '何 (porteur `v_401`), dans 何匹 ; 匹 donne l\'unité du nombre demandé'],
  ['n5_v_657', 'ancien exemple 1', '女', 'どなた (porteur `v_397`) ; 女 qualifie la personne montrée'],
  ['n5_v_667', 'exemple', '方', 'どなた (porteur `v_397`) ; 方, thème montré par あの'],
  ['n5_v_667', 'ancien exemple 1', '方', 'どなた (porteur `v_397`) ; 方, thème montré par あの'],
  ['n5_v_671', 'ancien exemple 2', '時計', '何 (porteur `v_401`), dans 何時 ; 時計, sujet'],
  ['n5_v_686', 'exemple', '男', 'だれ (誰, porteur `v_402`) ; 男 qualifie la personne montrée'],
  ['n5_v_687', 'ancien exemple 2', '皆さん', 'question fermée, marquée par か ; 皆さん interpelle ; 質問 nomme les questions'],
  ['n5_v_696', 'ancien exemple 3', '表', 'interrogation indirecte, alternative marquée par か … か ; 表 et 裏 en sont les issues nommées'],
];
const calcule = toutes.filter((p) => /[?？]/.test(p.f)).map((p) => p.fid + ' · ' + p.o);
const releve = Q.filter(([f]) => f !== 'n5_v_696').map(([f, o]) => f + ' · ' + o);
ok(JSON.stringify([...calcule].sort()) === JSON.stringify([...releve].sort()), 'relevé des phrases traduites par une question identique au relevé calculé', calcule.length + ' phrases');
const p696 = toutes.find((p) => p.fid === 'n5_v_696' && p.o === 'ancien exemple 3'); ok(/出る か 裏 が 出る か/.test(p696?.j ?? ''), '表 : interrogation indirecte (表が出るか裏が出るか) présente dans l\'ancien exemple 3');
for (const [fid, o] of Q) { const p = toutes.find((x) => x.fid === fid && x.o === o); const tE = ENT.find((e) => e.entry === p.entry).sensPublies.filter((s) => s.candidatE).map((s) => AN[s.id].r2).join(' '); if (!plat(tE).includes(plat(p.j))) ok(false, 'relevé : phrase non citée dans le R2 de son ENTRY', fid + ' · ' + o); }
for (const [, , , porte] of Q) for (const m of porte.matchAll(/porteur `(v_\d+)`/g)) if (!porteurs.has(m[1])) ok(false, 'relevé : porteur cité sans la fonction', m[1]);
const sitsu = toutes.filter((p) => /質問/.test(p.j)).map((p) => p.fid + ' · ' + p.o).sort();
ok(JSON.stringify(sitsu) === JSON.stringify(['n5_v_513 · ancien exemple 2', 'n5_v_653 · ancien exemple 2', 'n5_v_675 · ancien exemple 3', 'n5_v_687 · ancien exemple 2']), '質問 nommé dans quatre phrases : 意味, 声, 次, 皆さん', sitsu.length + ' phrases');
const rtNu = toutes.filter((p) => /<rt>/.test(p.brut.replace(/<ruby>[^<]*<rt>[^<]*<\/rt><\/ruby>/g, '')));
ok(rtNu.length === 14, 'furigana hors balise ruby : 14 phrases (observation hors périmètre)', rtNu.length + ' phrases');
const nAE = ENT.reduce((n, e) => n + e.fiches.reduce((m, f) => m + (ex[f.id] ?? []).length, 0), 0); const nFi = ENT.reduce((n, e) => n + e.fiches.length, 0);
ok(nFi === 39 && nAE === 117, 'sources : 39 fiches, 117 anciens exemples', nFi + ' fiches, ' + nAE + ' anciens exemples');
const nuance667 = pub.find((x) => x.id === 'v_667').nuance ?? ''; ok(/どの方/.test(nuance667), '方 : la nuance publiée cite どの方 (relevé au §2.2)');
ok(!ko, 'analyses complètes, conclusions admises, groupes conformes ; décisions, corrections, verdicts du volet 2 et porteurs cités exacts et complets ; frontières demandées examinées ; relevés exacts');
arret();

const compte = Object.fromEntries(CONCL.map((c) => [c, ids.filter((i) => AN[i].conclusion === c).length]));
const parG = Object.fromEntries(Object.keys(GRP).map((g) => [g, ids.filter((i) => AN[i].groupe === g)]));
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const decR = (id) => '« ' + J.find((x) => x.id === id).reason + ' »';
const sensDe = (id) => { const sp = SP.find((s) => s.id === id); return pub.find((x) => x.id === sp.entry).senses.find((x) => x.id === id); };
const nonCand = ENT.flatMap((e) => e.sensPublies.filter((s) => !s.candidatE).map((s) => ({ ...s, mot: e.mot })));
const deuxCand = ENT.filter((e) => e.sensPublies.filter((s) => s.candidatE).length > 1);
const LETTRES = { 4: 'Quatre', 5: 'Cinq', 6: 'Six', 7: 'Sept' };
ok(nonCand.length === 5 && ENT.flatMap((e) => e.decisions).filter((d) => d.fonctions).map((d) => court(d.id)).sort().join() === 'D0404,D0500,D0849,D0927,D0928,D1350', 'cinq sens non candidats ; six décisions qui portent sur les fonctions ou en parlent (§3.4)');
arret();
const L = ['# Étape 2 · A2-05 · bloc F · recherche d\'omissions d\'`interrogatif`, temps 3 — relecture du groupe E, livraison E1 (noms)', '',
  '**Date** : 2026-11-05', '**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; aucune omission n\'est appliquée. E2 et E3 ne sont pas commencées.', '',
  '**Autorisation** (relayée) : « QE-5 : OUI. J\'autorise l\'ouverture de la relecture lexicale de E1, strictement limitée aux 39 sens nominaux dans 37 ENTRY du périmètre E déjà accepté. Applique la méthode R1 à R5 selon A10. Pour chaque sens, examine la fiche source intégralement, ses traductions, nuances et exemples, les anciens exemples, l\'ENTRY publiée et les décisions historiques applicables. Accorde une attention particulière aux 14 phrases en forme de question, aux noms de personne présents dans « Qui est… ? », à 意味 et aux frontières entre information demandée, information désignée et fonction interrogative. Les décisions antérieures du volet 2 restent inchangées. Les valeurs nulles de catégorie ou de type ne constituent pas, à elles seules, une preuve de la fonction. Produis un rapport unique E1, en proposition, avec une analyse individuelle et une conclusion motivée par sens. […] Ne commence pas E2 ni E3. Ne prépare pas encore de correction lexicale. »', '',
  '**Base** :', '- addendum A10 (§2 définition ; §3 principes ; §4 frontières ; §5 rapports avec la catégorie et le type ; §6 cumul ; §8 temps 3) ;', '- périmètre du groupe E accepté le 2026-11-05 (QE-1 à QE-4 ; QE-5, ouverture de E1), `proposition-perimetre-E.md` ;', '- arbitrage du groupe D, point 3 : « la présence du mot relu dans une question ne prouve pas qu\'il porte la fonction » ;', '- dossier factuel `perimetre-E.json` (SHA-256 `' + PE_SHA.slice(0, 16) + '…`).', '',
  'Les 39 fiches sources complètes, leurs 117 anciens exemples, les 37 ENTRY publiées et leurs 101 décisions de journal sont recueillis dans `fiches-E1.md`. Les analyses individuelles sont dans `analyse-E1.json`, et rendues en entier aux sections 4 à 7.', '',
  '## 1. Synthèse', '',
  '| Conclusion | a | b | c | d | Total |', '|---|---|---|---|---|---|',
  ...CONCL.map((c) => '| ' + c + ' | ' + Object.keys(GRP).map((g) => parG[g].filter((i) => AN[i].conclusion === c).length).join(' | ') + ' | ' + compte[c] + ' |'),
  '| **Total** | **' + parG.a.length + '** | **' + parG.b.length + '** | **' + parG.c.length + '** | **' + parG.d.length + '** | **39** |', '',
  'Les groupes de lecture (a ' + GRP.a + ', b ' + GRP.b + ', c ' + GRP.c + ', d ' + GRP.d + ') rangent les ENTRY par ce que désignent leurs sens, pour faciliter la lecture ; ils n\'ont aucune valeur de décision, et aucune ENTRY n\'est partagée entre deux groupes.', '',
  '**Aucune omission n\'est signalée dans la livraison E1.** Les 39 sens ne sont relevés que par une valeur nulle (`T2-nuls`) : ' + nul('type') + ' sans type, ' + nul('catégorie') + ' sans catégorie, ' + nul('catégorie et type') + ' sans l\'un ni l\'autre (声). Un `null` est une absence justifiée de catégorie ou de type ; il ne dit rien de la fonction (A10, §5, points 1 et 2 ; §8, temps 2). Aucune fiche ne décrit un emploi qui demande une information : les sens désignent une partie du corps, une personne, une unité, un objet ou une notion.', '',
  '**Quinze phrases sont relevées dans les sources** (§2) : quatorze ont une traduction en forme de question, et une contient une interrogation indirecte. Dans chacune, l\'information demandée est tenue par un mot qui porte déjà la fonction (どなた, だれ ou 誰, 何, いくら, どの, どう), ou la question est marquée par une construction (か, ませんか, か … か). Le mot relu y est le thème, le sujet, le destinataire, l\'unité, la dimension ou un élément de la réponse ; il ne tient jamais la place de l\'information non spécifiée.', '',
  '| N° | Groupe | SENSE | Mot | Traduction publiée | Valeur nulle | Volet 2 | Conclusion | Motif |', '|---|---|---|---|---|---|---|---|---|',
  ...SP.map((sp, i) => { const E = pub.find((x) => x.id === sp.entry); const S = sensDe(sp.id); return '| ' + (i + 1) + ' | ' + AN[sp.id].groupe + ' | `' + sp.id + '` | ' + E.word + ' | ' + cell(S.meaning.primary) + ' | ' + sp.nul + ' | ' + sp.volet2.join(', ') + ' | ' + AN[sp.id].conclusion + ' | ' + cell(AN[sp.id].motif) + ' |'; }), '',
  '## 2. Les phrases des sources relues', '',
  '### 2.1 Phrases en forme de question', '',
  'Relevé complet, vérifié par le script : toute phrase des 39 fiches dont la traduction est une question (14), et l\'interrogation indirecte d\'un ancien exemple de 表 (1). Une question d\'exemple n\'atteste pas la fonction du mot illustré (A10, §3, point 1 ; §8, temps 1 ; arbitrage du groupe D, point 3) ; elle est lue en entier, et le rapport dit ce qui porte l\'interrogation, et le sens qu\'elle illustre.', '',
  '| N° | Fiche | Mot (sens illustré) | Phrase | Traduction de la source | Ce qui porte l\'interrogation ; place du mot relu |', '|---|---|---|---|---|---|',
  ...Q.map(([fid, o, mot, porte], i) => { const p = toutes.find((x) => x.fid === fid && x.o === o); return '| ' + (i + 1) + ' | `' + fid + '`, ' + o + ' | ' + mot + ' | ' + cell(p.j) + ' | ' + cell(p.f) + ' | ' + cell(porte) + ' |'; }), '',
  'Trois de ces phrases illustrent un sens qui n\'est pas candidat (時間 et 意味, sens 1) : elles sont lues pour l\'ENTRY, et rapportées au sens relu (§3.3).', '',
  '### 2.2 Autres mentions de la question', '',
  '- **質問 nommé** dans quatre phrases : 意味, ancien exemple 2 (aussi au §2.1) ; 声, ancien exemple 2 (先生の質問に大きい声で答えました) ; 次, ancien exemple 3 (質問がある方は、次にどうぞ) ; 皆さん, ancien exemple 2 (aussi au §2.1). 質問 nomme une question sans interroger (A10, §4, point 4) ; ce n\'est jamais le mot relu.',
  '- **何か**, dans l\'ancien exemple 3 de `n5_v_44` (お腹) : un indéfini, qui n\'interroge pas (A10, §4, point 1).',
  '- **D0406** (荷物) cite une requête en forme de question, « 荷物を預かってもらえますか », pour justifier le tag `lieu_hotel` ; 荷物 en est l\'objet (§3.4).',
  '- **La nuance publiée de 方** cite « どの方 (quelle personne) » : la question y est tenue par どの (porteur `v_398`) ; la correction retenue V2-51, non appliquée, retirerait cette mention (§3.4).',
  '- **Rencontres de surface**, sans mot interrogatif : いつも (物, ancien exemple 2) n\'est pas いつ, どうぞ (次, ancien exemple 3) n\'est pas どう.', '',
  '## 3. Frontières, cohérence et points signalés', '',
  '### 3.1 Frontières examinées', '',
  '| Frontière | Où elle s\'applique | Résultat |', '|---|---|---|',
  '| **Classe et valeur nulle** (A10, §3, point 2 ; §5, points 1 et 2) | les 39 sens | la classe `nom` et l\'absence de catégorie ou de type ne décident jamais ; les corrections retenues qui rempliraient un `null` (cinq sens au verdict C) n\'en décident pas davantage |',
  '| **Information désignée et information demandée** (§2) | les noms de personne (人, 女, 方, 男, 皆さん, 一人 sens 2) ; 意味, 時間, 匹, グラム, 時計, 表 | §3.2 |',
  '| **Registre poli** (§4, point 3) | 方 ; 皆さん | le respect et l\'adresse polie se disent en nuance ; ils ne font pas un interrogatif |',
  '| **Sens qui nomme une question** (§4, point 4) | 質問, dans les fiches de 意味, 声, 次 et 皆さん | 質問 nomme une question sans interroger ; aucun sens relu ne nomme d\'ailleurs une question |',
  '| **Indéfini** (§4, point 1) | 何か (お腹) ; le nom générique 物 | 何か n\'interroge pas et ne concerne pas le mot relu ; 物 désigne une chose déterminée par son complément |',
  '| **`deictique`** (§4, point 2) | 時間 (D0927, D0928) ; 次 (D1350) ; あの, dans les questions sur 人 et 方 | sans objet pour les sens relus ; c\'est あの qui montre la personne |',
  '| **Marques grammaticales** (§4, point 5) | か, ませんか, もらえますか, か … か | hors du périmètre d\'A10 ; elles portent la question fermée, l\'invitation, la requête ou l\'alternative indirecte |',
  '| **Cumul** (§6) | les 39 sens, sans fonction publiée | `interrogatif` n\'étant établi pour aucun sens, aucun cumul ne se pose ; les fonctions d\'A9 ne sont pas examinées |', '',
  '### 3.2 Information demandée, information désignée et fonction interrogative', '',
  'A10, §2, définit la fonction par un rôle : le mot **tient la place** de l\'information non spécifiée et **appelle une réponse** qui la fournit. Ce que l\'on demande (une identité, une quantité, une signification) se dit dans le sens et la nuance de l\'interrogatif ; ce n\'est pas une fonction du nom qui l\'exprime. Dans les quinze phrases du §2.1, il faut distinguer la place qu\'y tient chaque mot :', '',
  '| Place | Ce qu\'elle est | Mots relus de E1 | Ce qui tient l\'inconnu |', '|---|---|---|---|',
  '| **Fonction interrogative** | le mot qui tient la place de l\'inconnu et appelle la réponse | aucun | どなた, だれ ou 誰, 何, いくら, どの (どのくらい), どう (どういう) |',
  '| **Information désignée : le référent** | ce sur quoi porte la question, spécifié dans l\'énoncé | 人, 方 (montrés par あの) ; 女, 男 (qualifiant la personne montrée) ; 時計 (sujet) ; 皆さん (destinataires) ; 表 et 裏 (issues nommées) | la question porte sur eux, elle ne les demande pas |',
  '| **Information désignée : le genre de ce qui est demandé** | le nom de la dimension ou de l\'unité de la réponse attendue | 意味 (une signification) ; 時間 (une durée) ; 匹 (un nombre d\'animaux) | どういう, どのくらい, 何 |',
  '| **Élément de la réponse** | ce qui fournit l\'information demandée | グラム (50グラム) ; 一人 (« je suis seul ») | いくら, 誰, dans la question |', '',
  '**Les noms de personne dans « Qui est… ? »** (人, 方, 女, 男). La personne est spécifiée : montrée par あの, et parfois qualifiée (女の人, 男のひと). Ce qui est inconnu, c\'est son identité, et どなた ou だれ en tient la place. Le nom ne demande rien : il dit sur qui l\'on demande. Sans どなた, la phrase ne serait plus une question ; avec un autre nom à la place de 人, elle le resterait. Les trois fiches dont l\'exemple principal est cette question (人, 方, 男) n\'en disent pas davantage : leur nuance décrit une personne, non une demande.', '',
  '**意味.** Dans « その質問はどういう意味ですか », 意味 nomme exactement ce qui est demandé : une signification. C\'est la frontière la plus proche de la fonction dans E1, et elle n\'est pas franchie : nommer l\'information recherchée n\'est pas en tenir la place, comme nommer une question n\'est pas interroger (§4, point 4, appliqué par analogie, sans extension de son texte). L\'inconnu est tenu par どういう. Par ailleurs, la phrase illustre le sens 1 (« Sens ; Signification »), qui n\'est pas candidat ; le sens relu, `v_513_s2` « Intérêt ; Utilité », n\'est illustré par aucune phrase de la fiche.', '',
  '### 3.3 Sens relus et sens non candidats d\'une même ENTRY', '',
  'Chaque sens est relu pour lui-même (A10, §3, point 3). Deux ENTRY ont deux sens candidats : ' + deuxCand.map((e) => '**' + e.mot + '** (' + e.sensPublies.filter((s) => s.candidatE).map((s) => '`' + s.id + '`').join(', ') + ')').join(' ; ') + ' ; leurs décisions sont citées sous le sens qu\'elles concernent. ' + LETTRES[nonCand.length] + ' ENTRY ont un sens qui n\'est pas candidat, et qui n\'est donc pas relu ici :', '',
  ...nonCand.map((s) => '- `' + s.id + '` ' + s.mot + ' « ' + s.traduction + ' » : il a une catégorie et un type, et aucun filtre ne l\'a relevé.'), '',
  'Les phrases de la fiche qui les illustrent sont lues pour l\'ENTRY, et rapportées au sens relu : c\'est le cas des deux questions de 時間 et de celle de 意味. **Ces ' + LETTRES[nonCand.length].toLowerCase() + ' sens ne sont pas, de ce fait, vérifiés conformes** (A10, §8, compte rendu) : la relecture ne leur donne aucune conclusion.', '',
  '### 3.4 Points signalés, sans contradiction avec A10', '',
  '1. **D0406 (荷物)** justifie le tag `lieu_hotel` par le scénario « 荷物を預かってもらえますか ». La décision cite une requête en forme de question ; elle ne parle pas de la fonction, et 荷物 y est l\'objet de la demande. Le périmètre accepté disait qu\'aucune des 339 décisions de E n\'emploie le vocabulaire de la question : c\'est exact pour les radicaux recherchés (« interrog », « question », « demand »), et la citation n\'y change rien. Aucune décision n\'est réécrite.',
  '2. **D1350 (次)** refuse toute fonction sans définition normative, au lot 20, avant A10. `interrogatif` n\'étant pas établi pour 次, la décision s\'accorde avec la définition d\'aujourd\'hui ; ce constat ne la réécrit pas.',
  '3. **D0404 (時計) et D0849 (カレンダー)** parlent d\'une « proximité fonctionnelle » pour écarter une catégorie ; il s\'agit de l\'usage de l\'objet, non d\'une fonction linguistique. Le périmètre les a relevées parmi les décisions qui portent sur les fonctions ou en parlent parce que son filtre retient le mot « fonction » dans la raison ; elles ne touchent pas `interrogatif`.',
  '4. **方** : la nuance publiée cite どの方 (quelle personne), où どの porte la question ; la correction retenue V2-51, arbitrée au volet 2 et non appliquée, retirerait cette mention. Ni l\'état publié ni la correction ne touchent la fonction de 方.',
  '5. **Aucune décision ne contredit la définition d\'A10.** Six des 101 décisions de E1 portent sur les fonctions ou en parlent : D0927 et D0928 (時間, pas de `deictique`), D1350 (次, aucune fonction), D0500 (匹, aucune fonction « compteur »), D0404 et D0849 (point 3). Aucune n\'attribue ni ne refuse `interrogatif`, et aucune ne traite de la question ; seule D0406 en cite une, comme scénario (point 1).', '',
  '## 4 à 7. Relecture, sens par sens, en quatre groupes', '',
  'Pour chaque sens sont donnés :', '- les filtres d\'origine, conservés depuis la mesure ;', '- l\'indice qui l\'a fait relever ;', '- l\'état publié, avec le verdict du volet 2, cité et non rouvert ;', '- puis R1 à R5, selon la grille acceptée (QE-3).', '',
  'Toutes les décisions de journal de l\'ENTRY sont citées en entier sous l\'ENTRY, et confrontées en R5.', ''];
const NUM = { a: 4, b: 5, c: 6, d: 7 };
for (const g of Object.keys(GRP)) {
  L.push('## ' + NUM[g] + '. Groupe ' + g + ' — ' + GRP[g] + ' (' + parG[g].length + ' sens)', '');
  for (const e of ENT.filter((x) => grpDe(x.entry) === g)) {
    const E = pub.find((x) => x.id === e.entry);
    L.push('### ' + E.word + ' (' + (E.readings?.[0]?.kana ?? '') + ') — `' + e.entry + '`, classe `' + e.classe + '`', '',
      '- **Fiche source** : ' + e.fiches.map((fi) => '`' + fi.id + '` (' + fi.lot + ', ' + fi.anciensExemples + ' anciens exemples)').join(' ; ') + (e.fiches.length > 1 ? ' — fiche fusionnée comprise' : '') + '.',
      '- **Sens publiés** : ' + e.sensPublies.map((s) => '`' + s.id + '` « ' + s.traduction + ' »' + (s.candidatE ? '' : ' (non candidat)')).join(' ; ') + '.',
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
L.push('## 8. Décomptes séparés', '',
  '- **Livraison E1** : 39 sens relus (a ' + parG.a.length + ', b ' + parG.b.length + ', c ' + parG.c.length + ', d ' + parG.d.length + ') dans 37 ENTRY ; ' + compte[CONCL[0]] + ' « ne relève pas de la fonction », ' + compte[CONCL[1]] + ' « relève de la fonction », ' + compte[CONCL[2]] + ' « à arbitrer ».',
  '- **Volet 2** : les 39 verdicts sont cités, non rouverts : L 33, C 5, L deux fois 1 (声). Ils portent sur la catégorie ou le type, jamais sur la fonction.',
  '- **Lot 3** : aucun sens de E1 n\'est commun aux 377 ; aucun verdict n\'est cité.',
  '- **Recherche d\'omissions** : après les groupes A à D et la livraison E1, 152 sens relus sur 234 candidats (A 39, B 18, C 3, D 53, E1 39) ; 82 restent, dans les livraisons E2 (30) et E3 (52), non commencées. 573 sens n\'ont été relevés par aucun filtre ; ils n\'ont pas été relus et ne sont pas, de ce fait, vérifiés conformes. Ces décomptes ne s\'additionnent ni aux 377 ni au contrôle des 17 porteurs.', '',
  '## 9. Observations hors périmètre', '',
  'Relevées à la lecture, sans verdict ni correction ; aucune ne touche une conclusion. Les anomalies déjà journalisées (D0118 « Flur », D1012 furigana de 一人) ou déjà signalées (anciens exemples de 髪 rangés sous `n5_v_603`, lot 2 du volet 1) ne sont pas répétées.',
  '- 一人, ancien exemple 2 : « いいえ、一人です » répond par いいえ à une question ouverte (誰がいますか).',
  '- カレンダー, exemple : « よえい », forme altérée (sa traduction dit « mes projets »).',
  '- 表, ancien exemple 3 : la traduction associe 表 à « pile », là où la fiche et le sens publié disent « face ».',
  '- 耳, ancien exemple 2 : « l\'oreillette » dans la traduction (« prêté l\'oreille »).',
  '- 匹, ancien exemple 1 : « Jeélève » dans la traduction.',
  '- グラム, nuance de la fiche : « le poid ».',
  '- **Furigana hors balise ruby** (`<rt>` sans `<ruby>`) dans ' + rtNu.length + ' phrases : ' + rtListe.join(', ') + '. Le rapport et le recueil les citent sans les corriger ; dans les tableaux, ces furigana sont omis à l\'affichage, le recueil les garde tels quels.', '',
  '## 10. Ce qui n\'est pas fait', '',
  '- Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; les 204 corrections restent non appliquées, dont les 22 qui concernent E1. Aucune correction lexicale n\'est préparée.',
  '- E2 et E3 ne sont pas commencées.',
  '- Les verdicts du volet 2 ne sont pas rouverts ; la catégorie et le type des 39 sens ne sont pas réexaminés ; les fonctions d\'A9 ne sont pas examinées.',
  '- Les ' + LETTRES[nonCand.length].toLowerCase() + ' sens non candidats des ENTRY relues ne sont pas relus (§3.3).', '',
  '## 11. Décisions attendues', '',
  '1. Arbitrer les 39 conclusions proposées (toutes « ne relève pas de la fonction »), par groupe ou dans leur ensemble.',
  '2. Confirmer, ou non, les lectures du rapport : les quinze phrases du §2.1 ; la distinction entre information demandée, information désignée et fonction interrogative (§3.2), pour les noms de personne et pour 意味 ; les points signalés (§3.4).',
  '3. Décider, séparément, de la suite (QE-4) : la préparation de l\'inscription documentaire de l\'arbitrage de E1, puis l\'ouverture de E2.', '');
writeFileSync(join(root, RAP), L.join('\n'));

// Recueil des 39 fiches complètes
const LUS = ['reconstruction/a2-04/sources/vocab.json', 'reconstruction/a2-04/sources/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/exemples.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', 'reconstruction/a2-04/journal.json'];
const F = ['# Groupe E, livraison E1 — les 39 fiches sources complètes, leurs anciens exemples, les 37 ENTRY publiées et leurs décisions', '',
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
ok(nf === 39 && nx === 117 && nd === 101, 'recueil : 39 fiches sources complètes, 117 anciens exemples, 101 décisions', nf + ' fiches, ' + nx + ' anciens exemples, ' + nd + ' décisions');
console.log('écrits : ' + RAP + ', ' + FIC); console.log('rédaction conforme ; ' + JSON.stringify(compte));
