// A2-05 · bloc F : essai du script de mesure de couverture (mesurer-couverture.mjs), SANS jamais lancer un filtre sur les données réelles.
// (A) Fonctions pures sur une population SYNTHÉTIQUE : mesure, provenance, décomptes, rapport ; sabotages des contrôles de cohérence.
// (B) Copie jetable : la ligne de commande refuse sans `--execution-autorisee` ; toutes les autres invocations portent la garde d'essai
//     (OCHA_MESURE_GARDE_ESSAI=1 : arrêt après les préconditions, aucun filtre) ; refus avant tout filtre ; garde atteinte sur l'état réel copié.
// (C) Copie jetable : exécution nominale par import, avec données synthétiques injectées (préconditions réelles, filtres sur le seul synthétique),
//     écriture du seul dossier de mesure, seconde exécution refusée. Dépôt réel inchangé ; puis exemples synthétiques écrits dans traces/.
// Usage : node a2-05-travail/arbitrage-F/mesure-couverture/essayer-mesure.mjs <racine du dépôt>. Code 0 si tout est conforme.
import { readFileSync, writeFileSync, rmSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { cloner, EXCLUS } from '../essai-clone.mjs';
import { mesurer, controlerMesure, rediger, PHRASE, SORTIE } from './mesurer-couverture.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const I = 'a2-05-travail/arbitrage-F/mesure-couverture/', SCR = I + 'mesurer-couverture.mjs';
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const sha = (b) => createHash('sha256').update(b).digest('hex');

// --- Population synthétique (jamais les données réelles)
const S = (id, primary, o = {}) => ({ id, meaning: { primary, alternatives: o.alts ?? [] }, category: o.cat === undefined ? { level_1: 'x' } : o.cat, semantic_type: o.type === undefined ? 'objet' : o.type, linguistic_functions: { grammatical: o.g ?? [], pragmatic_discourse: [] }, nuance: o.nuance ?? null });
const E = (id, word, cls, senses, o = {}) => ({ id, level: 'N5', word, writings: [], readings: [{ kana: o.kana ?? word }], linguistic: { grammatical_class: cls }, nuance: null, senses });
const F = (id, primary, o = {}) => ({ id, type: 'nom', meanings: { primary, secondary: [] }, nuance: o.nuance ?? '', category: o.category ?? 'vie', subcategory: o.sub ?? 'objets', example: { french: o.ex ?? '' } });
const synth = () => ({
  vocab: [
    E('v_1', '何', 'pronom', [S('v_1_s1', 'Quoi', { g: ['interrogatif'], cat: null, type: null })], { kana: 'なに' }),
    E('v_5', '誰', 'pronom', [S('v_5_s1', 'Qui', { g: ['interrogatif'], type: null })], { kana: 'だれ' }),
    E('v_700', '誰か', 'nom', [S('v_700_s1', "Quelqu'un")], { kana: 'だれか' }),
    E('v_10', '本', 'nom', [S('v_10_s1', 'Livre')]),
    E('v_12', 'それでも', 'conjonction', [S('v_12_s1', 'Quand même')]),
    E('v_13', '答え', 'nom', [S('v_13_s1', 'Réponse')]),
    E('v_14', 'ゆっくり', 'adverbe', [S('v_14_s1', 'Lentement')]),
    E('v_15', 'もの', 'nom', [S('v_15_s1', 'Chose', { cat: null })]),
    E('v_16', 'ね', 'particule', [S('v_16_s1', 'Hein', { nuance: 'Particule finale ?' })]),
    E('v_17', '家', 'nom', [S('v_17_s1', 'Maison'), S('v_17_s2', "Où l'on vit")]),
  ],
  sources: [F('n5_v_1', 'Quoi'), F('n5_v_5', 'Qui'), F('n5_v_700', "Quelqu'un", { ex: 'Qui est là ?' }), F('n5_v_10', 'Livre', { ex: 'Quel livre ?' }), F('n5_v_12', 'Quand même'), F('n5_v_13', 'Réponse', { category: 'questions', sub: 'reponses' }),
    F('n5_v_14', 'Lentement'), F('n5_v_90', 'Doucement', { nuance: 'Se dit en réponse à une question.' }), F('n5_v_15', 'Chose'), F('n5_v_16', 'Hein'), F('n5_v_17', 'Maison')],
  fusions: { n5_v_14: ['n5_v_90'] },
  journal: [{ id: 'A2-04-D0724', status: 'validated', entry: 'n5_v_700', field: 'sens 1 · category', kind: 'categorie-nulle', before: null, after: null, reason: "Personne indéterminée ; pas de fonction interrogative (synthétique)." },
    { id: 'A2-04-D0001', status: 'validated', entry: 'n5_v_10', field: 'tags', kind: 'decision', before: null, after: null, reason: 'Objet courant (synthétique).' }],
});
const ATT_S = { population: 9, porteurs: 2, n5: 9, horsJlpt: 0, entry: 8 };
const ATTENDU = { v_700_s1: ['T2-serie', 'T2-journal'], v_12_s1: ['T1-mots'], v_13_s1: ['X1'], v_14_s1: ['T1-radicaux', 'T2-classe'], v_15_s1: ['T2-nuls'], v_16_s1: ['T1-point'], v_17_s2: ['T1-mots'] };

console.log('--- A · fonctions pures, population synthétique');
const m = mesurer(synth(), { date: '2026-11-03', origine: 'synthétiques', head: '0'.repeat(40) });
ok(!controlerMesure(m, ATT_S).length, 'A1 contrôles de cohérence M1 à M8 conformes', controlerMesure(m, ATT_S).join(' | ') || 'aucun écart');
ok(JSON.stringify(Object.fromEntries(m.candidats.map((c) => [c.id, c.filtres]))) === JSON.stringify(ATTENDU), 'A2 candidats et filtres d\'origine exacts, dans l\'ordre du relevé', m.candidats.map((c) => c.id + ' ' + c.filtres.join('+')).join(' ; '));
const c = m.couverture;
ok(c.releves === 7 && c.parTemps1 === 4 && c.seulementTemps2 === 2 && c.seulementX1 === 1 && c.relevesSansX1 === 6 && c.nonReleves === 2 && c.relus === 0 && c.moduleSeulementTemps2 === 3, 'A3 couverture : 7 relevés (4 temps 1, 2 seul temps 2, 1 seul X1), 6 sans X1, 2 non relevés, 0 relu ; le « seul temps 2 » du module (3) inclut le seul X1', JSON.stringify({ r: c.releves, t1: c.parTemps1, t2: c.seulementTemps2, x1: c.seulementX1, nr: c.nonReleves }));
ok(JSON.stringify(c.parFiltre) === JSON.stringify({ 'T1-radicaux': 1, 'T1-point': 1, 'T1-mots': 2, 'T2-classe': 1, 'T2-nuls': 1, 'T2-serie': 1, 'T2-journal': 1, X1: 1 }) && c.seulParFiltre['T1-mots'] === 2 && c.seulParFiltre['T2-serie'] === 0, 'A4 décompte par filtre et par filtre seul (doublons comptés une fois au total)', JSON.stringify(c.parFiltre));
const v700 = m.candidats.find((x) => x.id === 'v_700_s1'), v14 = m.candidats.find((x) => x.id === 'v_14_s1');
ok(JSON.stringify(v700?.decisionsJournal) === '["A2-04-D0724"]' && m.candidats.filter((x) => x.decisionsJournal.length).length === 1 && JSON.stringify(v14?.fichesFusionnees) === '["n5_v_90"]' && v14?.source === 'n5_v_14', 'A5 provenance : décision de journal citée pour T2-journal ; fiche fusionnée et fiche source indiquées');
ok(m.decisionsExistantes.length === 1 && m.decisionsExistantes[0].sens === 'v_700_s1' && m.decisionsExistantes[0].releve && m.decisionsExistantes[0].filtres.join() === 'T2-serie,T2-journal', 'A6 D0724 citée, sens relevé, avec ses filtres');
ok(m.population.sens === 9 && m.population.entry === 8 && m.population.porteursExclus === 2 && m.population.sensAvecFichesFusionnees === 1 && !m.candidats.some((x) => /^v_(1|5)_/.test(x.id)), 'A7 population : 9 sens, 8 ENTRY, 2 porteurs exclus, 1 sens avec fiche fusionnée ; aucun porteur candidat');
const rap = rediger(m);
ok(rap.includes(PHRASE) && rap.includes('| **Relus** | **0** |') && rap.includes('ESSAI : données synthétiques, sans valeur de mesure') && Object.keys(ATTENDU).every((id) => rap.includes('`' + id + '`')), 'A8 rapport : phrase obligatoire, relus 0, marqué « essai », tous les candidats');
ok(!/^\|.*(relève de la fonction|omission signalée|conforme)/m.test(rap) && !rap.includes('`v_10_s1`') && !rap.includes('`v_17_s1`') && /\*\*D0724\*\* \(`v_700_s1`, validated\)/.test(rap) && rap.includes('| Données lues | injectées par l\'essai'), 'A9 rapport : aucune conclusion dans les tableaux, sens non relevés absents de la liste, D0724 citée, provenance « injectées »');
ok(/^## 4\. Couverture/m.test(rap) && /^## 5\. Candidats/m.test(rap) && /^## 7\. Limites/m.test(rap) && rap.indexOf('## 4.') < rap.indexOf('## 8. Suite') && /temps 3 ne commence qu'après cet arbitrage/.test(rap), 'A10 rapport : couverture, candidats, limites, suite ; temps 3 subordonné à l\'arbitrage de la charge');

console.log('--- A · sabotages des contrôles de cohérence (chacun doit être détecté)');
const sab = (nom, fn, re, att = ATT_S) => { const x = structuredClone(m); fn(x); const e = controlerMesure(x, att); ok(e.some((l) => re.test(l)), nom, e.join(' | ') || 'non détecté'); };
sab('S1 candidat en double', (x) => x.candidats.push({ ...x.candidats[0], rang: x.candidats.length + 1 }), /^M3 candidat en double/);
sab('S2 porteur parmi les candidats', (x) => { x.candidats[0].id = 'v_1_s1'; }, /^M4/);
sab('S3 décompte d\'un filtre faussé', (x) => { x.couverture.parFiltre['T1-mots'] = 3; }, /^M5/);
sab('S4 non relevés faussés', (x) => { x.couverture.nonReleves = 1; }, /^M6 arithmétique/);
sab('S5 filtre inconnu', (x) => { x.candidats[1].filtres = ['T3-autre']; }, /^M3 filtres/);
sab('S6 filtres hors d\'ordre', (x) => { x.candidats[0].filtres = ['T2-journal', 'T2-serie']; }, /^M3 filtres/);
sab('S7 T2-journal sans décision citée', (x) => { x.candidats[0].decisionsJournal = []; }, /^M7/);
sab('S8 relevé non déterministe', (x) => { x._controle.deterministe = false; }, /^M1/);
sab('S9 population différente de l\'attendu', () => {}, /^M2/, { ...ATT_S, population: 807 });
sab('S10 relus non nul', (x) => { x.couverture.relus = 1; }, /^M6 arithmétique/);
sab('S11 rangs non continus', (x) => { x.candidats[2].rang = 9; }, /^M8/);

// --- B et C · copie jetable
const instantane = (r) => { const h = {}; const w = (d) => { for (const e of readdirSync(join(r, d))) { const p = d ? d + '/' + e : e; if (!d && EXCLUS.includes(e)) continue; if (p.endsWith('.zip') || p === 'a2-05-travail/sync-stable-apercu.md') continue; if (statSync(join(r, p)).isDirectory()) w(p); else h[p] = sha(readFileSync(join(r, p))); } }; w(''); return h; };
const ecarts = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const reel0 = instantane(root); const cl = cloner(root); const C = cl.C, f = cl.f;
const g = (...a) => spawnSync('git', ['-c', 'user.name=essai', '-c', 'user.email=essai', ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 });
let exemple = null;
try {
  ok(!ecarts(reel0, instantane(C)).length, 'B0 copie jetable identique au dépôt réel', Object.keys(reel0).length + ' fichiers');
  const modifies = (r) => spawnSync('git', ['-c', 'core.quotepath=false', 'diff', '--name-only'], { cwd: r, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout.trim().split('\n').filter(Boolean);
  const reels = modifies(root); const artefacts = modifies(C).filter((p) => !reels.includes(p));
  ok(artefacts.every((p) => readFileSync(f(p)).equals(readFileSync(join(root, p)))), 'B0 artefacts du clone (attributs) : octets identiques au dépôt réel, neutralisés dans l\'index du clone', artefacts.join(', ') || 'aucun');
  if (artefacts.length) g('update-index', '--assume-unchanged', '--', ...artefacts);
  const cli = (args, garde = true) => { const x = spawnSync(process.execPath, [f(SCR), C, ...args], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28, env: { ...process.env, OCHA_MESURE_GARDE_ESSAI: garde ? '1' : '' } }); return { code: x.status, out: ((x.stdout ?? '') + (x.stderr ?? '')).trim() }; };
  const premier = (r) => (r.out.split('\n').find((l) => /^ÉCART/.test(l)) ?? r.out.slice(0, 140)).slice(0, 160);

  console.log('--- B · refus (garde d\'essai sur toute invocation munie de l\'autorisation : aucun filtre ne peut être lancé)');
  { const av = instantane(C); const r = cli([], false); ok(r.code === 2 && /^refus : la mesure de couverture n'est pas autorisée/.test(r.out) && !ecarts(av, instantane(C)).length, 'B1 sans `--execution-autorisee` (et sans garde) : refus, code 2, rien n\'est écrit', 'code ' + r.code); }
  const refus = (nom, re, prep, rest) => { prep(); const av = instantane(C); const r = cli(['--execution-autorisee']); const ch = ecarts(av, instantane(C)); rest();
    ok(r.code === 1 && re.test(premier(r)) && /ARRÊT : rien n'est écrit, aucun filtre lancé/.test(r.out) && !/^--- Mesure/m.test(r.out) && !ch.length && !existsSync(f(SORTIE)), nom, premier(r) + ' ; modifiés : ' + (ch.join(', ') || 'aucun')); };
  const altere = (nom, p, re) => { const o = readFileSync(f(p)); refus(nom, re, () => writeFileSync(f(p), Buffer.concat([o, Buffer.from(' ')])), () => writeFileSync(f(p), o)); };
  refus('B2 HEAD déplacé par un commit', /P1 HEAD/, () => g('commit', '--quiet', '--allow-empty', '--no-verify', '-m', 'essai'), () => g('reset', '--quiet', '--soft', 'HEAD~1'));
  refus('B3 index non vide', /P2 index vide/, () => { writeFileSync(f('zz-index.txt'), 'x\n'); g('add', '-f', 'zz-index.txt'); }, () => { g('rm', '--cached', '--quiet', 'zz-index.txt'); rmSync(f('zz-index.txt')); });
  refus('B4 dossier de mesure déjà présent (mesure déjà effectuée)', /P3 dossier de mesure absent/, () => mkdirSync(f(SORTIE)), () => rmSync(f(SORTIE), { recursive: true }));
  altere('B5 module de filtrage modifié', 'a2-05-travail/perimetre-F-operationnel/omissions.mjs', /P4 module de filtrage/);
  altere('B6 essai des filtres modifié', 'a2-05-travail/perimetre-F-operationnel/essayer-filtres.mjs', /P4 essai des filtres/);
  altere('B7 donnée modifiée (data/n5/vocab.json)', 'data/n5/vocab.json', /P6 /);
  altere('B8 journal modifié', 'reconstruction/a2-04/journal.json', /P6 /);
  refus('B9 fichier non suivi dans tools/', /P6 /, () => writeFileSync(f('tools/zz-essai.mjs'), '// essai\n'), () => rmSync(f('tools/zz-essai.mjs')));
  altere('B10 rapport F modifié d\'un octet', 'docs/rapports/etape2-A2-05-volet1-lot3-F.md', /P7 empreintes/);
  refus('B11 sortie de filtrage dans perimetre-F-operationnel/', /P7 (contrôle du périmètre|relais)/, () => mkdirSync(f('a2-05-travail/perimetre-F-operationnel/sorties')), () => rmSync(f('a2-05-travail/perimetre-F-operationnel/sorties'), { recursive: true }));
  { const av = instantane(C); const r = cli(['--execution-autorisee']); const n = (r.out.match(/^conforme/gm) ?? []).length;
    ok(r.code === 3 && /garde d'essai : préconditions conformes ; aucun filtre lancé/.test(r.out) && !/^ÉCART/m.test(r.out) && !/^--- Mesure/m.test(r.out) && !ecarts(av, instantane(C)).length && !existsSync(f(SORTIE)), 'B12 état réel copié : toutes les préconditions conformes, garde atteinte, aucun filtre, rien d\'écrit', 'code ' + r.code + ' ; ' + n + ' préconditions conformes');
    console.log(r.out.split('\n').filter((l) => /^(conforme|ÉCART) P/.test(l)).map((l) => '   ' + l.slice(0, 200)).join('\n')); }
  const src = readFileSync(f(SCR), 'utf8').split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
  ok(/process\.exit\(executer\(resolve\(a\[0\]\), \{ garde: process\.env\.OCHA_MESURE_GARDE_ESSAI === '1' \}\)\.code\)/.test(src) && (src.match(/executer\(/g) ?? []).length === 2, 'B13 ligne de commande : aucune donnée injectable (données réelles seules), garde seulement');

  console.log('--- C · exécution nominale sur la copie, données synthétiques injectées par import');
  const mod = await import(pathToFileURL(f(SCR)).href);
  const D = synth(); ok(D && D.vocab.length === 10 && !D.vocab.some((e) => e.id === 'v_2'), 'C0 données injectées : la population synthétique (10 ENTRY), non les données réelles');
  const av = instantane(C); const L = []; const r = mod.executer(C, { donnees: D, origine: 'synthétiques', attendus: ATT_S, date: '2026-11-03', log: (l) => L.push(l) });
  console.log(L.filter((l) => /^(ÉCART|ARRÊT|conforme [MC]|mesure de couverture)/.test(l)).map((l) => '   ' + l.slice(0, 200)).join('\n'));
  const ch = ecarts(av, instantane(C));
  ok(r.code === 0 && L.filter((l) => /^conforme/.test(l)).length >= 20 && !L.some((l) => /^ÉCART/.test(l)), 'C1 exécution nominale : préconditions réelles, mesure synthétique, contrôles après écriture, code 0', L.filter((l) => /^conforme/.test(l)).length + ' vérifications conformes');
  ok(JSON.stringify(ch) === JSON.stringify([SORTIE + 'mesure.json', SORTIE + 'rapport-mesure.md']), 'C2 seuls les deux fichiers du dossier de mesure sont écrits', ch.join(', '));
  const J = JSON.parse(readFileSync(f(SORTIE + 'mesure.json'), 'utf8')); const R = readFileSync(f(SORTIE + 'rapport-mesure.md'), 'utf8');
  ok(J.origine === 'synthétiques' && J.lus === null && J.couverture.releves === 7 && J.candidats.length === 7 && !('_controle' in J) && J.candidats.every((x) => x.filtres.length && x.id && x.entry) && R === rediger({ ...J, _controle: null }), 'C3 mesure.json : origine, provenance, 7 candidats avec filtres ; rapport identique à sa rédaction depuis mesure.json');
  exemple = { json: readFileSync(f(SORTIE + 'mesure.json')), rapport: readFileSync(f(SORTIE + 'rapport-mesure.md')) };
  { const etat = instantane(C); const L2 = []; const r2 = mod.executer(C, { donnees: synth(), origine: 'synthétiques', attendus: ATT_S, log: (l) => L2.push(l) }); ok(r2.code === 1 && L2.some((l) => /^ÉCART\s+P3/.test(l)) && !ecarts(etat, instantane(C)).length, 'C4 seconde exécution refusée (P3), sans modification'); }
  { const r3 = cli(['--execution-autorisee']); ok(r3.code === 1 && /P3/.test(premier(r3)), 'C5 ligne de commande après mesure : refus (P3)', premier(r3)); }
} finally { cl.nettoyer(); }
const chR = ecarts(reel0, instantane(root)); ok(!chR.length, 'dépôt réel inchangé par l\'essai', chR.join(', ') || Object.keys(reel0).length + ' fichiers');
ok(!spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).stdout.trim(), 'index réel vide');
if (exemple && !ko) { mkdirSync(join(root, I + 'traces'), { recursive: true }); writeFileSync(join(root, I + 'traces/exemple-rapport-synthetique.md'), exemple.rapport); writeFileSync(join(root, I + 'traces/exemple-mesure-synthetique.json'), exemple.json); console.log('exemples synthétiques écrits dans ' + I + 'traces/ (après la vérification du dépôt réel)'); }
console.log(ko ? '\nessai NON conforme : ' + ko + ' écart(s)' : '\nessai conforme'); process.exit(ko ? 1 : 0);
