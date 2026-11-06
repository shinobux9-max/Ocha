// A2-05 · bloc F · recherche d'omissions, temps 3, groupe E, livraison E3 (verbes, T2-nuls) : rédige le rapport de relecture (proposition), en quatre
// groupes de lecture (a lot 18, b lot 19, c lot 20, d autres lots, selon le lot de la fiche de l'ENTRY), à partir des faits du dossier (perimetre-E.json) et de
// l'analyse écrite à la main (analyse-E3.json), et le recueil des 45 fiches sources complètes. Lecture seule sur les données, sources, journal et lots.
// Contrôles : une analyse par sens de E3, et aucune autre ; champs présents ; conclusion parmi les trois d'A10 ; groupe de lecture conforme au lot de la fiche ;
// décisions citées existantes et propres à l'ENTRY ; toutes les décisions de journal de chaque ENTRY citées ; corrections citées exactes et complètes ;
// verdict du volet 2 cité exact (contre l'audit des null) ; aucun sens commun au lot 3 ; frontières demandées (classe et valeur nulle en R3 pour chaque sens ;
// demandes de permission, questions fermées et ouvertes : information demandée et information désignée, marques grammaticales ; sens qui nomme une question
// pour 違う ; emploi de réplique pour 違う ; dimensions pour 違う et 要る ; la question de 無くす pour する) ; limites dites pour les sens qu'aucune phrase
// n'illustre ; décisions qui parlent des fonctions confrontées ; porteurs cités effectivement porteurs d'`interrogatif` ; relevé des phrases en forme de
// question identique au relevé calculé, chacune citée dans l'analyse de son ENTRY ; mentions de 質問, de どうぞ, de 〜てもいい et mots interrogatifs exacts.
// Transposé de rediger-rapport-E2.mjs. N'écrit que deux fichiers neufs (refus d'écraser).
// Usage : node a2-05-travail/omissions-temps3/rediger-rapport-E3.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const O = 'a2-05-travail/omissions-temps3/', RAP = O + 'rapport-relecture-E3.md', FIC = O + 'fiches-E3.md';
for (const f of [RAP, FIC]) if (existsSync(join(root, f))) throw new Error(f + ' existe déjà');
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n'); const json = (p) => JSON.parse(txt(p));
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
let ko = 0; const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; };
const arret = () => { if (ko) { console.log('ARRÊT : rien n\'est écrit'); process.exit(1); } };

const PE = O + 'perimetre-E.json', PE_SHA = '0f4682d8b00a2d3befb2581a0f74cbc0bfe3eacb9a5f8a2e3a578f032c0539b5';
ok(sha(PE) === PE_SHA, 'dossier factuel du périmètre E accepté, à son empreinte', PE_SHA.slice(0, 16));
arret();
const P = json(PE), AN = json(O + 'analyse-E3.json');
const pub = [...json('data/n5/vocab.json'), ...json('data/vocab-hors-jlpt.json')];
const src = [...json('reconstruction/a2-04/sources/vocab.json'), ...json('reconstruction/a2-04/sources/vocab-hors-jlpt.json')];
const ex = json('reconstruction/a2-04/sources/exemples.json').vocab ?? {}; const J = json('reconstruction/a2-04/journal.json');
const AUDIT = txt('docs/rapports/etape2-A2-05-audit-null.md').split('\n');
const CONCL = ['ne relève pas de la fonction', 'relève de la fonction', 'à arbitrer'];
const GRP = { a: 'fiches du lot 18, actions sur les objets', b: 'fiches du lot 19, vie quotidienne, travail et échanges', c: 'fiches du lot 20, existence, possession, action et déroulement', d: 'fiches des autres lots, 00, 04, 07 et 08' };
const grpDe = (e) => ({ 'lot-18': 'a', 'lot-19': 'b', 'lot-20': 'c' })[e.fiches[0].lot] ?? 'd';
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const court = (d) => d.replace('A2-04-', '');
const porteurs = new Set(pub.filter((e) => e.senses.some((s) => fns(s).includes('interrogatif'))).map((e) => e.id));
const ENT = P.entrees.filter((e) => e.classe === 'verbe');
const SP = ENT.flatMap((e) => e.sensPublies.filter((s) => s.candidatE).map((s) => ({ ...s, entry: e.entry, classe: e.classe, g: grpDe(e) })));
const ids = SP.map((s) => s.id);
ok(ENT.length === 43 && SP.length === 52, 'livraison E3 : 52 sens dans 43 ENTRY de classe `verbe`', ENT.length + ' ENTRY, ' + SP.length + ' sens');
const nG = (g) => [ENT.filter((e) => grpDe(e) === g).length, SP.filter((s) => s.g === g).length].join('/');
ok(nG('a') === '19/23' && nG('b') === '10/10' && nG('c') === '9/13' && nG('d') === '5/6', 'groupes de lecture : a 19 ENTRY et 23 sens ; b 10 et 10 ; c 9 et 13 ; d 5 et 6', ['a', 'b', 'c', 'd'].map(nG).join(', '));
ok(JSON.stringify(Object.keys(AN).sort()) === JSON.stringify([...ids].sort()), 'une analyse par sens de E3, et aucune autre', Object.keys(AN).length + ' analyses');
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
    if (a.groupe !== grpDe(e)) ok(false, id + ' : groupe de lecture non conforme au lot de la fiche de son ENTRY', a.groupe + ' / ' + grpDe(e));
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
ok(nDec === 154, 'les 154 décisions de journal des 43 ENTRY, chacune citée', nDec + ' décisions');
ok(nCorr === 11, 'les 11 corrections retenues des 7 ENTRY, chacune citée', nCorr + ' corrections');
const v2 = SP.map((s) => s.volet2.join('+')); ok(v2.filter((x) => x === 'L').length === 51 && v2.filter((x) => x === 'C').length === 1 && SP.find((s) => s.volet2[0] === 'C').id === 'v_528_s1', 'verdicts du volet 2 : L 51, C 1 (並ぶ, sens 1)', 'L ' + v2.filter((x) => x === 'L').length + ', C ' + v2.filter((x) => x === 'C').length);
const nul = (k) => SP.filter((s) => s.nul === k).length;
ok(nul('catégorie') === 52, 'valeurs nulles : catégorie 52 (aucun type nul)', 'catégorie ' + nul('catégorie'));
const PERM = ['v_526_s1', 'v_533_s1', 'v_576_s1', 'v_580_s1', 'v_637_s1'], FERM = ['v_608_s1', 'v_665_s2'], OUV = { v_564_s1: 'v_393', v_573_s1: 'v_179' };
for (const id of [...PERM, ...FERM, ...Object.keys(OUV)]) ok(/Information demandée et information désignée \(§2\)/.test(AN[id].r3) && /§4, point 5/.test(AN[id].r3), id + ' : phrase en forme de question ; information demandée et information désignée (A10, §2) et marques grammaticales (§4, point 5) examinées en R3');
for (const id of PERM) ok(/てもいいですか/.test(AN[id].r2) && /`v_420`, relu en E2/.test(AN[id].r2) && /contenu de la question, non son porteur/.test(AN[id].r2), id + ' : demande de permission ; le verbe nomme l\'action soumise à l\'accord, いい relu en E2, contenu et porteur distingués en R2');
for (const id of FERM) ok(/question fermée/.test(AN[id].r2) && /contenu de la question, non son porteur/.test(AN[id].r2), id + ' : question fermée en か ; contenu et porteur distingués en R2');
for (const [id, p] of Object.entries(OUV)) ok(AN[id].r2.includes('porteur `' + p + '`'), id + ' : question ouverte ; porteur cité (`' + p + '`)');
ok(/§4, point 4/.test(AN.v_361_s1.r3), 'v_361_s1 : 質問 dans la fiche, frontière du sens qui nomme une question (A10, §4, point 4) examinée en R3');
ok(/§4, point 3/.test(AN.v_361_s2.r3) && /D1327/.test(AN.v_361_s2.r3), 'v_361_s2 : emploi de réplique ; frontière des emplois d\'adresse (A10, §4, point 3) examinée en R3, avec D1327');
for (const id of ['v_361_s2', 'v_573_s1']) ok(/§5, point 3/.test(AN[id].r3), id + ' : dimension publiée ; A10, §5, point 3 examiné en R3');
ok(/どうすればいいですか/.test(AN.v_181_s1.r2) && /どう y tient la place/.test(AN.v_181_s1.r2), 'する : la question des fiches de 無くす, où figure する, lue en R2 sans en tirer la fonction');
const LIM = ['v_50_s2', 'v_164_s3', 'v_522_s2', 'v_539_s2', 'v_541_s2', 'v_608_s2', 'v_642_s2', 'v_642_s3'];
const limites = ids.filter((i) => /Limite :/.test(AN[i].r2)).sort();
ok(JSON.stringify(limites) === JSON.stringify([...LIM].sort()), 'limites dites en R2 pour les huit sens qu\'aucune phrase n\'illustre', limites.join(', '));
const FN = ENT.flatMap((e) => e.decisions).filter((d) => d.fonctions).map((d) => court(d.id)).sort().join();
ok(FN === 'D1184,D1305,D1319,D1323,D1327', 'cinq décisions marquées par le dossier comme parlant des fonctions (D1184, D1305, D1319, D1323, D1327)', FN);
ok(/faux positif/.test(AN.v_560_s1.r5) && /D1305/.test(AN.v_516_s1.r5) && /D1319/.test(AN.v_523_s2.r5) && /D1323/.test(AN.v_524_s1.r5) && /D1327/.test(AN.v_361_s2.r5), 'décisions qui parlent des fonctions confrontées en R5 ; D1184, faux positif du filtre, dite comme telle');

// Relevé des phrases des sources relues
const nu = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/<rt>[^<]*<\/rt>/g, '').replace(/<[^>]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const plat = (s) => s.replace(/[\s「」。、]/g, '');
const phrases = (fid) => { const s = src.find((x) => x.id === fid); return [['exemple', s.example], ...(ex[fid] ?? []).map((x, i) => ['ancien exemple ' + (i + 1), x])].map(([o, x]) => ({ fid, o, j: nu(x.japanese), f: nu(x.french), brut: x.japanese })); };
const toutes = ENT.flatMap((e) => e.fiches.flatMap((f) => phrases(f.id).map((p) => ({ ...p, mot: e.mot, entry: e.entry }))));
const Q = [
  ['n5_v_526', 'ancien exemple 3', 'コピーする', 'demande de permission en 〜てもいいですか ; いい (`v_420`, relu en E2) évalue l\'action, か la soumet à l\'accord ; コピーする nomme l\'action, contenu de la demande ; la réponse (はい、どうぞ) accorde', 'permission'],
  ['n5_v_533', 'ancien exemple 3', '借りる', 'demande de permission en 〜てもいいですか ; 借りる nomme l\'action, contenu de la demande ; la réponse (はい、どうぞ) accorde', 'permission'],
  ['n5_v_564', 'ancien exemple 3', '無くす', 'どう (porteur `v_393`) tient la place de la conduite à tenir ; 無くす, dans la subordonnée en 〜たら, pose la circonstance', 'ouverte'],
  ['n5_v_601', 'ancien exemple 3', '無くす (fiche fusionnée)', 'どう (porteur `v_393`) tient la place de la conduite à tenir ; なくす, dans la subordonnée en 〜たら, pose la circonstance', 'ouverte'],
  ['n5_v_573', 'ancien exemple 2', '要る', 'いくら (porteur `v_179`) tient la place du montant ; 要る, prédicat, nomme le besoin, donné', 'ouverte'],
  ['n5_v_576', 'ancien exemple 3', '貼る', 'demande de permission en 〜てもいいですか ; 貼る nomme l\'action, contenu de la demande', 'permission'],
  ['n5_v_580', 'ancien exemple 3', '開ける', 'demande de permission en 〜てもいいですか ; 開ける nomme l\'action, contenu de la demande', 'permission'],
  ['n5_v_608', 'ancien exemple 2', 'やる (sens 1)', 'question fermée, marquée par か ; やる, contenu soumis à confirmation, repris dans la réponse', 'fermée'],
  ['n5_v_637', 'ancien exemple 1', '使う', 'demande de permission en 〜てもいいですか ; 使う nomme l\'action, contenu de la demande', 'permission'],
  ['n5_v_665', 'ancien exemple 3', '持つ (sens 2)', 'question fermée, marquée par か ; 持つ, contenu soumis à confirmation (« possèdes-tu »)', 'fermée'],
];
const calcule = toutes.filter((p) => /[?？]/.test(p.f)).map((p) => p.fid + ' · ' + p.o);
const releve = Q.map(([f, o]) => f + ' · ' + o);
ok(JSON.stringify([...calcule].sort()) === JSON.stringify([...releve].sort()), 'relevé des phrases traduites par une question identique au relevé calculé : 10 phrases', calcule.length + ' phrases');
for (const [fid, o] of Q) { const p = toutes.find((x) => x.fid === fid && x.o === o); const tE = ENT.find((e) => e.entry === p.entry).sensPublies.filter((s) => s.candidatE).map((s) => AN[s.id].r2).join(' '); if (!plat(tE).includes(plat(p.j))) ok(false, 'relevé : phrase non citée dans le R2 de son ENTRY', fid + ' · ' + o); }
for (const [, , , porte] of Q) for (const m of porte.matchAll(/porteur `(v_\d+)`/g)) if (!porteurs.has(m[1])) ok(false, 'relevé : porteur cité sans la fonction', m[1]);
const forme = (k) => Q.filter((q) => q[4] === k).length; ok(forme('permission') === 5 && forme('ouverte') === 3 && forme('fermée') === 2, 'formes : 5 demandes de permission en 〜てもいいですか, 3 questions ouvertes (どう, いくら), 2 questions fermées en か');
const liste = (re) => toutes.filter((p) => re.test(p.j)).map((p) => p.fid + ' · ' + p.o).sort();
const egal = (a, b) => JSON.stringify(a) === JSON.stringify([...b].sort());
ok(egal(liste(/て\s*も\s*いい/),Q.filter((q) => q[4] === 'permission').map(([f, o]) => f + ' · ' + o)), '〜てもいい : les cinq demandes de permission, et elles seules');
ok(egal(liste(/質問/), ['n5_v_361 · ancien exemple 1']), '質問 nommé dans une phrase : 違う, ancien exemple 1', liste(/質問/).join(', '));
ok(egal(liste(/どうぞ/), ['n5_v_526 · ancien exemple 3', 'n5_v_533 · ancien exemple 3', 'n5_v_551 · ancien exemple 1']), 'どうぞ, formule d\'invitation ou d\'accord, non interrogatif : trois phrases', liste(/どうぞ/).join(', '));
const interrog = liste(/どう(?!ぞ)|何|だれ|誰|どこ|いつ(?!も)|いくら|どの|どれ|どちら|どっち|なぜ|どうして|いかが|いくつ|どなた/);
ok(egal(interrog, ['n5_v_564 · ancien exemple 3', 'n5_v_573 · ancien exemple 2', 'n5_v_601 · ancien exemple 3']), 'mots interrogatifs dans les phrases : どう (deux fois) et いくら, dans les trois questions ouvertes', interrog.join(', '));
const rtNu = toutes.filter((p) => /<rt>/.test(String(p.brut).replace(/<ruby>[^<]*<rt>[^<]*<\/rt><\/ruby>/g, '')));
const autresBalises = toutes.filter((p) => [...String(p.brut).matchAll(/<\/?([a-zA-Z]+)/g)].some((m) => !['ruby', 'rt'].includes(m[1])));
ok(!rtNu.length && !autresBalises.length, 'furigana hors balise ruby et balises étrangères : aucune phrase des 45 fiches', rtNu.length + ' / ' + autresBalises.length);
const latin = liste(/[a-zA-Z]/);
ok(egal(latin, ['n5_v_516 · ancien exemple 3', 'n5_v_709 · exemple']), 'caractères latins dans le japonais : ある, ancien exemple 3 (« or ») ; 閉める, exemple (D1182)', latin.join(', '));
const nAE = ENT.reduce((n, e) => n + e.fiches.reduce((m, f) => m + (ex[f.id] ?? []).length, 0), 0); const nFi = ENT.reduce((n, e) => n + e.fiches.length, 0);
ok(nFi === 45 && nAE === 135 && toutes.length === 180, 'sources : 45 fiches, 135 anciens exemples, 180 phrases', nFi + ' fiches, ' + nAE + ' anciens exemples, ' + toutes.length + ' phrases');
const nonCand = ENT.flatMap((e) => e.sensPublies.filter((s) => !s.candidatE).map((s) => ({ ...s, mot: e.mot, entry: e.entry })));
const nEntNC = new Set(nonCand.map((s) => s.entry)).size;
ok(nonCand.length === 16 && nEntNC === 14 && nonCand.every((s) => !s.fonctions.length && s.nul === 'aucun'), 'seize sens non candidats dans 14 ENTRY, tous catégorisés et typés, sans fonction publiée', nonCand.length + ' sens, ' + nEntNC + ' ENTRY');
ok(!ko, 'analyses complètes, conclusions admises, groupes conformes ; décisions, corrections, verdicts du volet 2 et porteurs cités exacts et complets ; frontières demandées examinées ; limites dites ; relevés exacts');
arret();

const compte = Object.fromEntries(CONCL.map((c) => [c, ids.filter((i) => AN[i].conclusion === c).length]));
const parG = Object.fromEntries(Object.keys(GRP).map((g) => [g, ids.filter((i) => AN[i].groupe === g)]));
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const decR = (id) => '« ' + J.find((x) => x.id === id).reason + ' »';
const sensDe = (id) => { const sp = SP.find((s) => s.id === id); return pub.find((x) => x.id === sp.entry).senses.find((x) => x.id === id); };
const deuxCand = ENT.filter((e) => e.sensPublies.filter((s) => s.candidatE).length > 1);
const L = ['# Étape 2 · A2-05 · bloc F · recherche d\'omissions d\'`interrogatif`, temps 3 — relecture du groupe E, livraison E3 (verbes)', '',
  '**Date** : 2026-11-05', '**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; aucune omission n\'est appliquée. L\'inscription de E3 et le bilan de clôture de la recherche d\'omissions ne sont pas préparés.', '',
  '**Autorisation** (relayée) : « J\'autorise maintenant l\'ouverture de la relecture lexicale E3, dernière livraison du groupe E, strictement limitée aux 52 sens verbaux dans 43 ENTRY du périmètre déjà accepté. Applique la méthode R1 à R5 selon A10. Pour chaque sens, lis intégralement la fiche source, ses traductions, nuances et exemples, les anciens exemples, l\'ENTRY publiée et les décisions historiques applicables. Examine particulièrement les dix phrases en forme de question, les demandes de permission en 〜てもいいですか, les questions fermées en か et la distinction entre un verbe désignant une action et le porteur intrinsèque d\'une interrogation. Ne présume d\'aucun verdict. Si une fiche ne fournit pas une preuve suffisante, indique les limites et propose la conclusion adaptée. Produis un rapport E3 en proposition, avec une analyse R1 à R5 et une conclusion motivée pour chacun des 52 sens. […] Après l\'arbitrage éventuel de E3, prépare uniquement sur autorisation distincte son inscription documentaire et le bilan de clôture de la recherche d\'omissions. Ne considère pas l\'étape 2 entière comme terminée. »', '',
  '**Base** :', '- addendum A10 (§2 définition ; §3 principes ; §4 frontières ; §5 rapports avec la catégorie, le type et les dimensions ; §6 cumul ; §8 temps 3) ;', '- périmètre du groupe E accepté le 2026-11-05 (QE-1 à QE-4), inscrit (`docs/rapports/etape2-A2-05-omissions-interrogatif-E-perimetre.md`, §0) ;', '- arbitrages des livraisons E1 et E2, inscrits (`docs/rapports/etape2-A2-05-omissions-interrogatif-E1.md` et `…-E2.md`, §0), dont la distinction entre le contenu de la question et le porteur de la fonction ; E2 renvoyait à E3 les demandes de permission en 〜てもいいですか ;', '- arbitrage du groupe D, point 3 : « la présence du mot relu dans une question ne prouve pas qu\'il porte la fonction » ;', '- dossier factuel `perimetre-E.json` (SHA-256 `' + PE_SHA.slice(0, 16) + '…`).', '',
  'Les 45 fiches sources complètes, leurs 135 anciens exemples, les 43 ENTRY publiées et leurs 154 décisions de journal sont recueillis dans `fiches-E3.md`. Les analyses individuelles sont dans `analyse-E3.json`, et rendues en entier aux sections 4 à 7.', '',
  '## 1. Synthèse', '',
  '| Conclusion | a | b | c | d | Total |', '|---|---|---|---|---|---|',
  ...CONCL.map((c) => '| ' + c + ' | ' + Object.keys(GRP).map((g) => parG[g].filter((i) => AN[i].conclusion === c).length).join(' | ') + ' | ' + compte[c] + ' |'),
  '| **Total** | **' + parG.a.length + '** | **' + parG.b.length + '** | **' + parG.c.length + '** | **' + parG.d.length + '** | **52** |', '',
  'Les quatre groupes de lecture suivent le lot de la fiche de l\'ENTRY (a : ' + GRP.a + ' ; b : ' + GRP.b + ' ; c : ' + GRP.c + ' ; d : ' + GRP.d + '), pour faciliter la lecture et la confrontation aux décisions de chaque lot ; ils n\'ont aucune valeur de décision. La classe `verbe` ne décide pas de la fonction (A10, §3, point 2).', '',
  '**Aucune omission n\'est signalée dans la livraison E3.** Les 52 sens ne sont relevés que par une valeur nulle (`T2-nuls`) : tous sont sans catégorie, aucun n\'est sans type. Un `null` de catégorie est une absence justifiée (A5) ; il ne dit rien de la fonction (A10, §5, point 1 ; §8, temps 2). Aucune fiche ne décrit un emploi qui demande une information : les sens décrivent des actions, des événements, des processus, des états et un résultat.', '',
  '**Dix phrases ont une traduction en forme de question** (§2.1). Aucune ne fait du verbe relu le porteur de l\'interrogation : cinq sont des demandes de permission en 〜てもいいですか, où le verbe nomme l\'action soumise à l\'accord ; deux sont des questions fermées en か, où le verbe est le contenu soumis à confirmation ; trois sont des questions ouvertes, où どう ou いくら tient la place de l\'inconnu, et où le verbe pose la circonstance (無くす) ou nomme la relation donnée (要る). La distinction entre un verbe qui désigne une action et le porteur de l\'interrogation est au §3.2.', '',
  '**Huit sens ne sont illustrés par aucune phrase** de leur fiche (§3.4, point 2). Leur conclusion repose sur la description de la fiche, qui établit une action ou un événement ; l\'absence de phrase limite l\'attestation de leurs emplois, non la conclusion : rien, dans la fiche, n\'en fait une demande d\'information, et A10 n\'attribue la fonction que sur attestation (§3, point 1).', '',
  '| N° | Groupe | SENSE | Mot | Traduction publiée | Type | Volet 2 | Conclusion | Motif |', '|---|---|---|---|---|---|---|---|---|',
  ...SP.map((sp, i) => { const E = pub.find((x) => x.id === sp.entry); const S = sensDe(sp.id); return '| ' + (i + 1) + ' | ' + AN[sp.id].groupe + ' | `' + sp.id + '` | ' + E.word + ' | ' + cell(S.meaning.primary) + ' | `' + S.semantic_type + '` | ' + sp.volet2.join(', ') + ' | ' + AN[sp.id].conclusion + ' | ' + cell(AN[sp.id].motif) + ' |'; }), '',
  '## 2. Les phrases des sources relues', '',
  '### 2.1 Phrases en forme de question', '',
  'Relevé complet, vérifié par le script : toute phrase des 45 fiches dont la traduction est une question (10). Aucune interrogation indirecte n\'y figure. Une question d\'exemple n\'atteste pas la fonction du mot illustré (A10, §3, point 1 : « une traduction contextuelle en forme de question ne suffit pas » ; §8, temps 1 ; arbitrage du groupe D, point 3) ; elle est lue en entier, et le rapport dit ce qui porte l\'interrogation, la place qu\'y tient le verbe relu et le sens qu\'elle illustre.', '',
  '| N° | Fiche | Mot (sens illustré) | Phrase | Traduction de la source | Forme | Ce qui porte l\'interrogation ; place du verbe relu |', '|---|---|---|---|---|---|---|',
  ...Q.map(([fid, o, mot, porte, fo], i) => { const p = toutes.find((x) => x.fid === fid && x.o === o); return '| ' + (i + 1) + ' | `' + fid + '`, ' + o + ' | ' + mot + ' | ' + cell(p.j) + ' | ' + cell(p.f) + ' | ' + { permission: 'demande de permission', ouverte: 'question ouverte', 'fermée': 'question fermée' }[fo] + ' | ' + cell(porte) + ' |'; }), '',
  'Deux de ces phrases, presque identiques, figurent dans les deux fiches fusionnées de 無くす ; elles sont comptées deux fois, comme dans le dossier.', '',
  '### 2.2 Autres mentions et rencontres de surface', '',
  '- **Mots interrogatifs** : le script n\'en trouve que deux dans les ' + toutes.length + ' phrases, どう (porteur `v_393`, deux fois) et いくら (porteur `v_179`), dans les trois questions ouvertes du §2.1.',
  '- **どうぞ** (コピーする, 借りる, 座る) n\'est pas どう : c\'est une formule qui invite ou qui accorde (はい、どうぞ ; どうぞ椅子に座ってください).',
  '- **質問 nommé** dans une phrase : 違う, ancien exemple 1 (その質問の答えは、さっきのとちょっと違います). 質問 nomme une question sans interroger (A10, §4, point 4), et 違う compare deux réponses.',
  '- **Répliques** : 違う, exemple et ancien exemple 2 (いいえ、それは違います) répondent pour corriger ; l\'emploi est gardé en nuance par D1327. Les acquiescements (はい、わかりました ; ありがとう) répondent, sans demander.',
  '- **Requêtes, invitations, défenses et ordres** : 〜てください (押す, 引く, 付ける, 切る, 取る, 変える, 消す, 磨く, 開ける, 閉める, コピーする, 座る, 待つ, 渡す, 立つ, 貸す, 持つ), 〜ましょう (付ける, 消す, かける, やる), 〜ないでください (出る), 起きなさい rapporté (立つ). Ils demandent une action, ou de s\'en abstenir, non une information (A10, §2).',
  '- **Recherche d\'information décrite** : 引く, sens 2, non candidat (辞典で…言葉を引いて、意味を調べます), et 使う, ancien exemple 2 (辞書を使って漢字を調べます). Chercher une information est une action que le verbe désigne, en assertion ; aucun mot n\'y tient la place d\'une information dans une question.',
  '- **する dans une question** : la question ouverte des deux fiches de 無くす (どうすればいいですか) contient する ; どう y interroge, する nomme l\'action. La phrase est rapportée à 無くす et lue pour する en R2, sans en tirer la fonction.',
  '- **Caractères latins dans le japonais** : ある, ancien exemple 3 (« (or 車があります) ») ; 閉める, exemple (« 1sutekina mado o », déjà signalé par D1182). Aucun furigana hors balise ruby ni balise étrangère dans les ' + toutes.length + ' phrases.', '',
  '## 3. Frontières, cohérence et points signalés', '',
  '### 3.1 Frontières examinées', '',
  '| Frontière | Où elle s\'applique | Résultat |', '|---|---|---|',
  '| **Classe et valeur nulle** (A10, §3, point 2 ; §5, points 1 et 2) | les 52 sens | la classe `verbe` et l\'absence de catégorie ne décident jamais ; aucun sens n\'est sans type ; le verdict C de 並ぶ (sens 1) porte sur la catégorie, non sur la fonction |',
  '| **Information demandée et information désignée** (§2) | les cinq demandes de permission ; やる, 持つ (questions fermées) ; 無くす, 要る (questions ouvertes) ; les requêtes en 〜てください | §3.2 |',
  '| **Marques grammaticales** (§4, point 5) | 〜てもいいですか (て, も, か) ; か des questions fermées et ouvertes ; たら (無くす) | hors du périmètre d\'A10 ; ce sont elles qui font la demande de permission ou la question fermée |',
  '| **Sens qui nomme une question** (§4, point 4) | 質問, dans la fiche de 違う ; 聞く « demander », exemple d\'A10, absent de E3 | 質問 nomme une question ; 違う compare deux réponses. Aucun verbe de E3 ne désigne l\'acte de demander |',
  '| **Registre poli et emplois d\'adresse** (§4, point 3, par analogie) | la réplique de 違う (D1327) ; すみません en tête de demande ; le registre familier de やる | se disent en nuance ; ils s\'adressent à l\'interlocuteur sans lui demander une information |',
  '| **Dimensions** (§5, point 3) | 違う, sens 2 (D1368) ; 要る (D1366) ; 出来る, sens 1, non candidat (D1367) | une dimension caractérise le sens et ne remplace aucune fonction |',
  '| **Cumul** (§6) | les 52 sens, sans fonction publiée | `interrogatif` n\'étant établi pour aucun sens, aucun cumul ne se pose |', '',
  '### 3.2 Un verbe qui désigne une action, et le porteur de l\'interrogation', '',
  'A10, §2, définit la fonction par un rôle : le mot **tient la place** de l\'information non spécifiée et **appelle une réponse** qui la fournit. Un verbe désigne une action, un événement ou un état ; dans une question, il en est le **contenu** : ce sur quoi porte la demande. Il n\'en devient pas le porteur, même quand la question porte sur lui. Les dix phrases se rangent en trois cas :', '',
  '| Cas | Phrases | Ce qui est inconnu | Ce qui interroge | Place du verbe relu |', '|---|---|---|---|---|',
  '| **Demande de permission en 〜てもいいですか** | コピーする, 借りる, 貼る, 開ける, 使う | l\'accord de l\'interlocuteur | la construction 〜てもいいですか : て, も et か, marques grammaticales hors d\'A10, et いい (`v_420`), qui évalue l\'action | il nomme l\'action, entièrement spécifiée, dont on demande la permission ; la réponse accorde (はい、どうぞ), elle ne remplit aucune place |',
  '| **Question fermée en か** | やる, 持つ | la vérité d\'un énoncé entièrement spécifié (oui ou non) | か, marque grammaticale, hors d\'A10 | contenu soumis à confirmation ; la réponse le reprend (はい、もうやりました) |',
  '| **Question ouverte** | 無くす (deux), 要る | une conduite à tenir ; un montant | どう (porteur `v_393`) ; いくら (porteur `v_179`) | 無くす pose la circonstance (〜たら) ; 要る nomme la relation de besoin, donnée, et serait repris dans la réponse |', '',
  '**Le critère de la réponse.** Un interrogatif est remplacé, dans la réponse, par l\'information qu\'il demandait (いくら → un montant ; どう → une conduite). Aucun des verbes relus ne l\'est : la réponse les reprend (やりました ; 持っています), les suppose (要ります), ou accorde ce qu\'ils nomment (どうぞ). C\'est la même lecture que pour 大丈夫 en E2.', '',
  '**Demander une permission n\'est pas demander une information.** La demande en 〜てもいいですか a la forme d\'une question fermée : elle attend un accord, que la réponse donne (はい、どうぞ) ou refuse. Son contenu, l\'action proposée, est entièrement spécifié par le verbe et ses compléments. A10 ne la vise donc par aucun de ses mots ; la construction elle-même relève des marques grammaticales, hors de son périmètre (§4, point 5).', '',
  '**いい dans la demande de permission.** La relecture de E2 avait renvoyé à E3 ces emplois, absents des fiches de いい. Dans les cinq phrases, いい évalue l\'action proposée (« c\'est bien si… ») et l\'énoncé est soumis à l\'accord par か ; いい est le contenu de l\'évaluation demandée, non une place d\'information inconnue. La conclusion arbitrée de いい (`v_420_s1`, E2) n\'en est pas touchée, et n\'est pas rouverte : ces phrases ne figurent pas dans ses fiches, et un sens se décide sur sa propre fiche (A10, §3, points 1 et 3).', '',
  '**Nommer l\'acte de demander.** A10, §4, point 4, cite 聞く « demander » : un verbe qui désigne l\'acte de poser une question est un sens lexical, sans la fonction. Aucun verbe de E3 ne désigne cet acte. Les deux verbes qui en approchent désignent une recherche d\'information sans interlocuteur (引く, sens 2, non candidat ; 調べる, dans une phrase de 使う) : ils sont, a fortiori, du côté du sens lexical.', '',
  '### 3.3 Sens relus et sens non candidats d\'une même ENTRY', '',
  'Chaque sens est relu pour lui-même (A10, §3, point 3). ' + deuxCand.length + ' ENTRY ont deux sens candidats : ' + deuxCand.map((e) => '**' + e.mot + '** (' + e.sensPublies.filter((s) => s.candidatE).map((s) => '`' + s.id + '`').join(', ') + ')').join(' ; ') + ' ; leurs décisions communes sont citées sous le premier. ' + nEntNC + ' ENTRY ont ' + nonCand.length + ' sens qui ne sont pas candidats, et qui ne sont donc pas relus ici :', '',
  ...nonCand.map((s) => '- `' + s.id + '` ' + s.mot + ' « ' + s.traduction + ' » : catégorie `' + s.categorie + '`, type `' + s.type + '`' + (s.lot3 ? ' ; audité au lot 3 (' + s.lot3 + ')' : '') + '.'), '',
  'Les phrases de la fiche qui les illustrent sont lues pour l\'ENTRY, et rapportées au sens qu\'elles illustrent : c\'est le cas de la recherche dans un dictionnaire (引く, sens 2). **Ces ' + nonCand.length + ' sens ne sont pas, de ce fait, vérifiés conformes** (A10, §8, compte rendu) : la relecture ne leur donne aucune conclusion.', '',
  '### 3.4 Points signalés, sans contradiction avec A10', '',
  '1. **Quatre décisions parlent des fonctions, et une cinquième est marquée à tort.** D1305 (ある) ne pose aucune fonction pour l\'existence ; D1319 (出来る, sens 1, non candidat) ne pose pas `modalite` ; D1323 (なる) ne pose pas d\'aspect ; les trois faute de définition normative, au lot 20, avant A9 et A10. D1327 (違う) garde la réplique en nuance, sans sens ni fonction. Aucune n\'attribue ni ne refuse `interrogatif`, et aucune ne traite de la question ; elles s\'accordent avec A10. **D1184** (消える) est marquée par le dossier comme parlant des fonctions : c\'est un faux positif du filtre (`/fonction/`, qui reconnaît « fonctionner ») ; elle découpe deux sens et ne traite d\'aucune fonction. Aucune n\'est réécrite, et le dossier n\'est pas corrigé.',
  '2. **Huit sens ne sont illustrés par aucune phrase** : ' + LIM.map((i) => '`' + i + '`').join(', ') + '. Leur fiche les documente par une traduction et par sa nuance (pour 出る, sens 2, par la seule fiche fusionnée de 出ます). La limite est dite en R2. La conclusion « ne relève pas de la fonction » est la conclusion adaptée : la description établit une action ou un événement, et A10 n\'attribue la fonction que lorsque la fiche atteste le rôle de demander (§3, point 1) ; « à arbitrer » ne se justifierait que si la fiche laissait ouverte une lecture interrogative, ce qui n\'est le cas pour aucun d\'eux.',
  '3. **Deux illustrations indirectes ou incertaines** : ある, sens 2 (la possession n\'est illustrée que par une parenthèse, « (or 車があります) ») ; 出来る, sens 2 (l\'ancien exemple 2 se traduit par la possibilité). Elles sont dites en R2 ; la conclusion n\'en dépend pas.',
  '4. **Le relevé confirme le périmètre** (proposition, §5, point 2) : demandes de permission pour コピーする, 借りる, 貼る, 開ける, 使う ; questions fermées pour やる et 持つ ; いくら pour 要る ; どう pour 無くす. Aucune autre phrase n\'a la forme d\'une question.',
  '5. **Aucune décision ne contredit la définition d\'A10.** Les 154 décisions de E3 portent sur le découpage, les fusions, les catégories nulles, les types, les dimensions, les furigana, les relations de la passe finale, les traductions et les nuances ; aucune n\'emploie le vocabulaire de la question.', '',
  '## 4 à 7. Relecture, sens par sens, en quatre groupes', '',
  'Pour chaque sens sont donnés :', '- les filtres d\'origine, conservés depuis la mesure ;', '- l\'indice qui l\'a fait relever ;', '- l\'état publié, avec le verdict du volet 2, cité et non rouvert ;', '- puis R1 à R5, selon la grille acceptée (QE-3).', '',
  'Toutes les décisions de journal de l\'ENTRY sont citées en entier sous l\'ENTRY, et confrontées en R5.', ''];
const NUM = { a: 4, b: 5, c: 6, d: 7 };
for (const g of Object.keys(GRP)) {
  L.push('## ' + NUM[g] + '. Groupe ' + g + ' — ' + GRP[g] + ' (' + parG[g].length + ' sens)', '');
  for (const e of ENT.filter((x) => grpDe(x) === g)) {
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
        '- **État publié** :', '  - traductions « ' + [S.meaning.primary, ...(S.meaning.alternatives ?? [])].join(' ; ') + ' » ;', '  - catégorie `' + cat(S.category) + '` ; type `' + S.semantic_type + '` ;', '  - dimensions ' + ((S.dimensions ?? []).map((x) => '`' + x.axis + '` (' + x.pole + ')').join(', ') || 'aucune') + ' ; fonctions ' + (fns(S).map((x) => '`' + x + '`').join(', ') || 'aucune') + ' ;', '  - nuance du sens : ' + (S.nuance ? '« ' + S.nuance + ' »' : 'aucune') + ' ;', '  - volet 2 : verdict ' + sp.volet2.join(', ') + ' (cité, non rouvert) ; lot 3 : hors des 377.',
        '- **R1** (rôle de demander une information non spécifiée) : ' + a.r1, '- **R2** (attestation par la fiche) : ' + a.r2, '- **R3** (frontières) : ' + a.r3, '- **R4** (cumul) : ' + a.r4, '- **R5** (décisions existantes) : ' + a.r5,
        '- **Conclusion proposée** : **' + a.conclusion + '**. **Motif** : ' + a.motif, '');
    }
  }
}
L.push('## 8. Décomptes séparés', '',
  '- **Livraison E3** : 52 sens relus (a ' + parG.a.length + ', b ' + parG.b.length + ', c ' + parG.c.length + ', d ' + parG.d.length + ') dans 43 ENTRY ; ' + compte[CONCL[0]] + ' « ne relève pas de la fonction », ' + compte[CONCL[1]] + ' « relève de la fonction », ' + compte[CONCL[2]] + ' « à arbitrer ».',
  '- **Volet 2** : les 52 verdicts sont cités, non rouverts : L 51, C 1 (並ぶ, sens 1). Ils portent sur la catégorie, jamais sur la fonction.',
  '- **Lot 3** : aucun sens de E3 n\'est commun aux 377 ; aucun verdict n\'est cité.',
  '- **Recherche d\'omissions**, si E3 est arbitrée telle quelle : 234 sens relus sur 234 candidats (A 39, B 18, C 3, D 53, E1 39, E2 30, E3 52), aucune omission retenue. 573 sens n\'ont été relevés par aucun filtre ; ils n\'ont pas été relus et ne sont pas, de ce fait, vérifiés conformes. Ces décomptes ne s\'additionnent ni aux 377 ni au contrôle des 17 porteurs.', '',
  '## 9. Observations hors périmètre', '',
  'Relevées à la lecture, sans verdict ni correction ; aucune ne touche une conclusion. Les anomalies déjà journalisées (D1234, balise de 作る ; D1262, しるし de コピーする ; D1314, ぱソコン de 要る ; D1315, 出きる de 出来る ; D1182, texte parasite de 閉める ; D1201 et D1210, confusions de 取る et 引く) ne sont pas répétées.',
  '- かける, anciens exemples 2 et 3 : 鍵をかける (fermer à clé) et 腰をかける (s\'asseoir), deux emplois que l\'ENTRY ne modélise pas (D0520 garde les trois sens que la source décrit) ; aucune phrase n\'illustre « Accrocher ».',
  '- 出ます (`n5_v_537`), exemple : « Je **sers** (quitte) de la maison », pour « sors » ; ancien exemple 2 : 電車を出ます (または: 降ります).',
  '- 消す, ancien exemple 3 : « 消て » dans le japonais, pour 消して (romaji keshite).',
  '- 曇る, ancien exemple 3 : romaji « mienakuりました » ; 変える, ancien exemple 2 : romaji « kaamashita » ; 待つ, ancien exemple 3 : romaji « machi-doushiiku » ; 死ぬ, ancien exemple 3 : romaji « kowaranakute », pour こわがらなくても.',
  '- 吹く, ancien exemple 1 : « un vent **frais** », la mise en relief portant sur l\'adjectif, non sur le verbe.',
  '- 返す, nuance de la fiche : « rendre l\'monnaie » ; ancien exemple 3 : « (または: 忘れました) », identique au texte.',
  '- 差す, catégorie de la fiche « cactions_generiques » ; 曇る, catégorie de la fiche « vetements » pour un verbe météorologique (champs hérités, sans effet sur les données).', '',
  '## 10. Ce qui n\'est pas fait', '',
  '- Aucune donnée, norme, décision historique ni correction retenue n\'est modifiée ; les 204 corrections restent non appliquées, dont les 11 qui concernent E3. Aucune correction lexicale n\'est préparée.',
  '- Les verdicts du volet 2 ne sont pas rouverts ; la catégorie et le type des 52 sens ne sont pas réexaminés ; les fonctions d\'A9 ne sont pas examinées.',
  '- Les ' + nonCand.length + ' sens non candidats des ENTRY relues ne sont pas relus (§3.3) ; les 573 sens non relevés ne le sont pas.',
  '- L\'inscription documentaire de E3 et le bilan de clôture de la recherche d\'omissions ne sont pas préparés. L\'étape 2 n\'est pas terminée : le volet 3 (contrôles globaux G1 à G7) n\'est pas commencé, et les corrections retenues ne sont pas appliquées.', '',
  '## 11. Décisions attendues', '',
  '1. Arbitrer les 52 conclusions proposées (toutes « ne relève pas de la fonction »), par groupe ou dans leur ensemble.',
  '2. Confirmer, ou non, les lectures du rapport : les dix phrases du §2.1 ; la distinction entre un verbe qui désigne une action et le porteur de l\'interrogation (§3.2), notamment pour les demandes de permission et pour いい ; les limites des huit sens sans illustration (§3.4, point 2) ; les points signalés (§3.4).',
  '3. Décider, séparément, de la suite (QE-4) : sur autorisation distincte, la préparation de l\'inscription documentaire de l\'arbitrage de E3 et du bilan de clôture de la recherche d\'omissions.', '');
writeFileSync(join(root, RAP), L.join('\n'));

// Recueil des 45 fiches complètes
const LUS = ['reconstruction/a2-04/sources/vocab.json', 'reconstruction/a2-04/sources/vocab-hors-jlpt.json', 'reconstruction/a2-04/sources/exemples.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', 'reconstruction/a2-04/journal.json'];
const F = ['# Groupe E, livraison E3 — les 45 fiches sources complètes, leurs anciens exemples, les 43 ENTRY publiées et leurs décisions', '',
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
ok(nf === 45 && nx === 135 && nd === 154, 'recueil : 45 fiches sources complètes, 135 anciens exemples, 154 décisions', nf + ' fiches, ' + nx + ' anciens exemples, ' + nd + ' décisions');
console.log('écrits : ' + RAP + ', ' + FIC); console.log('rédaction conforme ; ' + JSON.stringify(compte));
