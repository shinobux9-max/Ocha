// A2-05 · bloc F : essai des filtres de recherche d'omissions (omissions.mjs) sur une population SYNTHÉTIQUE, jamais sur les données réelles ; puis, sur copie
// jetable, refus de la ligne de commande sans `--execution-autorisee`. Chaque cas attend la liste exacte des filtres qui le relèvent, ou aucun.
// Usage : node a2-05-travail/perimetre-F-operationnel/essayer-filtres.mjs <racine du dépôt>. Code 0 si tout est conforme.
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { relever, FILTRES } from './omissions.mjs';
import { cloner } from '../arbitrage-F/essai-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };

// Population synthétique : ENTRY publiées, fiches sources, fusions, journal
const S = (id, primary, o = {}) => ({ id, meaning: { primary, alternatives: o.alts ?? [] }, category: o.cat === undefined ? { level_1: 'x' } : o.cat, semantic_type: o.type === undefined ? 'objet' : o.type, linguistic_functions: { grammatical: o.g ?? [], pragmatic_discourse: o.p ?? [] }, nuance: o.nuance ?? null });
const E = (id, word, cls, senses, o = {}) => ({ id, level: o.level ?? 'N5', word, writings: o.writings ?? [], readings: [{ kana: o.kana ?? word }], linguistic: { grammatical_class: cls }, nuance: o.nuance ?? null, senses });
const F = (id, primary, o = {}) => ({ id, type: o.type ?? 'nom', meanings: { primary, secondary: o.sec ?? [] }, nuance: o.nuance ?? '', category: o.category ?? 'vie', subcategory: o.sub ?? 'objets', example: { french: o.ex ?? '' } });
const vocab = [
  E('v_1', '何', 'pronom', [S('v_1_s1', 'Quoi', { g: ['interrogatif'], cat: null, type: null })], { kana: 'なに' }),
  E('v_19', 'いつ', 'pronom', [S('v_19_s1', 'Quand', { g: ['interrogatif'], type: null })]),
  E('v_2', '何か', 'nom', [S('v_2_s1', 'Quelque chose')], { kana: 'なにか' }),
  E('v_3', '時間', 'nom', [S('v_3_s1', 'Durée', { alts: ['Combien de temps'] })]),
  E('v_4', '値段', 'nom', [S('v_4_s1', 'Prix')]),
  E('v_5', '国', 'nom', [S('v_5_s1', 'Pays', { nuance: "D'où venez-vous ?" })]),
  E('v_6', '本', 'nom', [S('v_6_s1', 'Livre')]),
  E('v_7', 'とても', 'adverbe', [S('v_7_s1', 'Très')]),
  E('v_8', 'もの', 'nom', [S('v_8_s1', 'Chose', { cat: null, type: null })]),
  E('v_9', 'ここ', 'nom', [S('v_9_s1', 'Ici', { cat: null, g: ['deictique'] })]),
  E('v_10', '道', 'nom', [S('v_10_s1', 'Chemin')]),
  E('v_11', '町', 'nom', [S('v_11_s1', 'Ville')]),
  E('v_13', '時', 'nom', [S('v_13_s1', 'Lorsque', { alts: ['Quiche', 'Presque', 'Quelques'] })]),
  E('v_14', '色', 'nom', [S('v_14_s1', 'Quel', { nuance: 'Une question ?' })]),
  E('v_15', '別に', 'nom', [S('v_15_s1', "Qu'importe")]),
  E('v_16', '訳', 'nom', [S('v_16_s1', 'Raison'), S('v_16_s2', 'Pourquoi pas')]),
  E('v_17', '問', 'nom', [S('v_17_s1', 'Énigme')]),
  E('v_18', 'いつも', 'nom', [S('v_18_s1', 'Toujours')]),
  E('v_718', 'レジ袋', 'nom', [S('v_718_s1', 'Sac de caisse')], { level: 'hors_jlpt' }),
  E('v_21', 'どう', 'adverbe', [S('v_21_s1', 'Comment', { g: ['interrogatif'], cat: null, type: null })]),
  E('v_20', '動物', 'nom', [S('v_20_s1', 'Animal')], { kana: 'どうぶつ' }),
  E('v_22', 'どうぞ', 'nom', [S('v_22_s1', 'Je vous en prie')]),
];
const sources = [
  F('n5_v_1', 'Quoi'), F('n5_v_19', 'Quand'), F('n5_v_2', 'Quelque chose'), F('n5_v_3', 'Durée'), F('n5_v_4', 'Prix', { nuance: 'On **demande** le prix.' }), F('n5_v_5', 'Pays'),
  F('n5_v_6', 'Livre', { ex: 'Qui est-ce ? Quel livre ?' }), F('n5_v_7', 'Très'), F('n5_v_8', 'Chose'), F('n5_v_9', 'Ici'), F('n5_v_10', 'Chemin'), F('n5_v_11', 'Ville'),
  F('n5_v_12', 'Bourg', { nuance: 'Emploi <ruby>interrogatif<rt>x</rt></ruby> rare.' }), F('n5_v_13', 'Lorsque'), F('n5_v_14', 'Couleur'), F('n5_v_15', 'Peu importe'), F('n5_v_16', 'Raison'),
  F('n5_v_17', 'Énigme', { category: 'questions', sub: 'interrogatifs' }), F('n5_v_18', 'Toujours'), F('n5_v_21', 'Comment'), F('n5_v_20', 'Animal'), F('n5_v_22', 'Je vous en prie'), F('hj_v_1', 'Sac', { nuance: 'Le caissier demande si on en veut un.' }),
];
const journal = [{ id: 'A2-04-D9001', entry: 'n5_v_10', field: 'grammatical_class', kind: 'decision', reason: 'Une question de classe.', before: null, after: null }, { id: 'A2-04-D9002', entry: 'n5_v_6', field: 'tags', kind: 'decision', reason: 'Lieu.', before: null, after: null }];
const D = { vocab, sources, fusions: { n5_v_11: ['n5_v_12'] }, journal };

const ATTENDU = {
  v_2_s1: ['T2-serie'], v_3_s1: ['T1-mots'], v_4_s1: ['T1-radicaux'], v_5_s1: ['T1-point'], v_7_s1: ['T2-classe'], v_8_s1: ['T2-nuls'], v_10_s1: ['T2-journal'], v_11_s1: ['T1-radicaux'],
  v_14_s1: ['T1-radicaux', 'T1-point', 'T1-mots'], v_15_s1: ['T1-mots'], v_16_s2: ['T1-mots'], v_18_s1: ['T2-serie'], v_718_s1: ['T1-radicaux'], v_22_s1: ['T2-serie'],
};
const POURQUOI = {
  v_2_s1: 'composé de 何 (série), « Quelque » non pris pour « quel »', v_3_s1: 'mot interrogatif dans une alternative publiée', v_4_s1: 'radical dans la nuance de la fiche, en gras',
  v_5_s1: '« ? » dans la nuance publiée ; « où » hors d\'une traduction ne compte pas', v_7_s1: 'classe `adverbe` seule', v_8_s1: 'catégorie et type nuls, sans fonction', v_10_s1: 'décision de journal',
  v_11_s1: 'fiche retirée par fusion vers l\'ENTRY, balises ruby retirées', v_14_s1: 'trois filtres, un seul candidat', v_15_s1: 'forme élidée « qu\' »', v_16_s2: 'sens par sens : s1 non relevé', v_18_s1: 'composé de いつ',
  v_718_s1: 'fiche hors JLPT trouvée par `HJ_IDS`', v_22_s1: 'graphie formée sur どう',
};
const r = relever(D); const vus = Object.fromEntries(r.candidats.map((c) => [c.id, c.filtres]));
for (const [id, f] of Object.entries(ATTENDU)) ok(JSON.stringify(vus[id]) === JSON.stringify(f), 'relevé ' + id + ' (' + POURQUOI[id] + ')', (vus[id] ?? ['aucun']).join(', '));
const NEG = { v_1_s1: 'porteur, hors population', v_19_s1: 'porteur, hors population', v_6_s1: 'question seulement dans l\'exemple', v_9_s1: 'nul mais porteur d\'une fonction', v_13_s1: '« Lorsque », « Quiche », « Presque », « Quelques »', v_16_s1: 'autre sens de la même ENTRY', v_17_s1: 'catégorie source « questions » : X1 seulement, désactivé', v_21_s1: 'porteur, hors population', v_20_s1: 'lecture どうぶつ : seules les graphies du candidat sont comparées' };
for (const [id, l] of Object.entries(NEG)) ok(!vus[id], 'non relevé ' + id + ' (' + l + ')', (vus[id] ?? []).join(', '));
ok(Object.keys(vus).length === Object.keys(ATTENDU).length, 'aucun autre candidat', Object.keys(vus).join(', '));
ok(r.population === 20 && r.porteurs === 3 && r.releves === 14 && r.nonReleves === 6 && r.parTemps1 === 8 && r.seulementTemps2 === 6, 'couverture : population 20, porteurs à part, 14 relevés (8 par le temps 1, 6 par le seul temps 2), 6 non relevés', JSON.stringify({ p: r.population, r: r.releves, t1: r.parTemps1, t2: r.seulementTemps2, n: r.nonReleves }));
ok(JSON.stringify(r.parFiltre) === JSON.stringify({ 'T1-radicaux': 4, 'T1-point': 2, 'T1-mots': 4, 'T2-classe': 1, 'T2-nuls': 1, 'T2-serie': 3, 'T2-journal': 1 }), 'décompte par filtre, doublons comptés dans chaque filtre et une seule fois au total', JSON.stringify(r.parFiltre));
const x = relever(D, { avecX1: true }); ok(JSON.stringify(x.candidats.find((c) => c.id === 'v_17_s1')?.filtres) === '["X1"]' && x.releves === 15, 'X1 sur option : v_17_s1 relevé par X1 seul');
ok(FILTRES.map(([id]) => id).join() === 'T1-radicaux,T1-point,T1-mots,T2-classe,T2-nuls,T2-serie,T2-journal,X1', 'filtres : 3 du temps 1, 4 du temps 2, X1 proposé hors A10');

// Copie jetable : la ligne de commande refuse sans autorisation et n'écrit rien
const statut = (cwd) => spawnSync('git', ['status', '--porcelain', '--untracked-files=all'], { cwd, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout;
const reel0 = statut(root); const cl = cloner(root);
try {
  const avant = statut(cl.C); const q = cl.lancer('a2-05-travail/perimetre-F-operationnel/omissions.mjs');
  ok(q.code === 2 && /^refus : la recherche d'omissions n'est pas autorisée ; aucun filtre exécuté/.test(q.out), 'copie : ligne de commande refusée sans `--execution-autorisee`', 'code ' + q.code);
  ok(statut(cl.C) === avant, 'copie : aucun fichier écrit par le refus');
} finally { cl.nettoyer(); }
ok(statut(root) === reel0, 'dépôt réel inchangé par l\'essai');
console.log(ko ? '\nessai NON conforme : ' + ko + ' écart(s)' : '\nessai conforme'); process.exit(ko ? 1 : 0);
