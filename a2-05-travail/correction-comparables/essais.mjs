// A2-05 : essais du correctif proposé des comparables (générateur de périmètres ; proposition, NON appliquée).
// Usage : node a2-05-travail/correction-comparables/essais.mjs <racine du dépôt> [--apercu]
// Copie temporaire de l'arbre, générateur proposé substitué, générateur actuel gardé à côté pour comparaison ; n'écrit rien dans le dépôt,
// sauf, avec --apercu, le périmètre de T2 tel que l'écrirait le générateur corrigé (correction-comparables/apercu/), pour lecture seule.
// Code 0 si tous les essais sont conformes. Ne lance aucun audit ; T9 et F ne sont pas générés (chantiers fermés).
// Mode --apres-application (correctif appliqué le 2026-10-22) : le générateur testé est le générateur réel ; la référence indépendante est la
// sauvegarde de départ (correction-comparables/depart/) ; E0 (identités), E10 (19 sens du lot 1), E11 (corrections affichées retrouvées dans
// le bilan) et E12 (refus réel d'écrire sur les périmètres de T2 et de T1, dépôt inchangé) s'ajoutent ; --apercu est sans effet.
import { readFileSync, writeFileSync, mkdtempSync, cpSync, mkdirSync, readdirSync, statSync, rmSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail'), CC = join(W, 'correction-comparables');
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-', LOT1 = 'docs/rapports/etape2-A2-05-coherence-retroactive.md', BILAN = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
const arbre = (d) => readdirSync(d).flatMap((x) => { const p = join(d, x); return statSync(p).isDirectory() ? arbre(p) : [p]; });
const empreinteArbre = (dirs) => createHash('sha256').update(dirs.flatMap((d) => arbre(join(root, d))).sort().map((p) => relative(root, p) + ':' + sha(p)).join('\n')).digest('hex');
const PROTEGES = ['data', 'reconstruction', 'tests', 'tools', 'docs/conception'];
const avant = { arbre: empreinteArbre(PROTEGES), fichiers: Object.fromEntries(['a2-05-travail/perimetre-v2.mjs', 'a2-05-travail/empreintes-rapports-arbitres.json', 'a2-05-travail/registre-tranches.json', 'a2-05-travail/criblage/resultat.json', LOT1, BILAN, R + 'T2-perimetre.md'].map((p) => [p, sha(join(root, p))])) };
const res = []; const ok = (id, nom, cond, detail = '') => res.push({ id, nom, ok: !!cond, detail });
const APRES = process.argv.includes('--apres-application');
if (APRES) {
  const man = JSON.parse(readFileSync(join(CC, 'manifeste.json'), 'utf8')).modules['perimetre-v2.mjs'], doc = JSON.parse(readFileSync(join(W, 'correction-hj', 'manifeste.json'), 'utf8')).modules['perimetre-v2.mjs'].final_sha256;
  const hR = sha(join(W, 'perimetre-v2.mjs')), hP = sha(join(CC, 'proposition', 'perimetre-v2.mjs')), hD = sha(join(CC, 'depart', 'perimetre-v2.mjs'));
  ok('E0', 'générateur réel = version proposée relue ; sauvegarde de départ = état de départ documenté (correction-hj)', hR === man.final_sha256 && hP === man.final_sha256 && hD === man.depart_sha256 && hD === doc && hR !== hD, 'réel ' + hR.slice(0, 12) + '… ; proposé ' + hP.slice(0, 12) + '… ; départ ' + hD.slice(0, 12) + '… (documenté ' + doc.slice(0, 12) + '…)');
}

const tmp = mkdtempSync(join(tmpdir(), 'ocha-cc-')); const copie = join(tmp, 'arbre'); const out = join(tmp, 'sorties'); mkdirSync(out);
for (const d of ['data', 'docs', 'reconstruction', 'tools', 'a2-05-travail']) cpSync(join(root, d), join(copie, d), { recursive: true });
cpSync(APRES ? join(CC, 'depart', 'perimetre-v2.mjs') : join(W, 'perimetre-v2.mjs'), join(copie, 'a2-05-travail', 'perimetre-v2-actuel.mjs'));
if (!APRES) cpSync(join(CC, 'proposition', 'perimetre-v2.mjs'), join(copie, 'a2-05-travail', 'perimetre-v2.mjs'));
// Configuration de T2 liée au générateur de référence : le dépôt réel avant application, la sauvegarde de départ après
const T2A = APRES ? join(copie, 'a2-05-travail', 'perimetre-T2-actuel.mjs') : join(W, 'perimetre-T2.mjs');
if (APRES) writeFileSync(T2A, readFileSync(join(W, 'perimetre-T2.mjs'), 'utf8').replace("from './perimetre-v2.mjs';", "from './perimetre-v2-actuel.mjs';"));
const imp = (p) => import(pathToFileURL(p).href);
const A = await imp(join(copie, 'a2-05-travail', 'perimetre-v2-actuel.mjs')), P = await imp(join(copie, 'a2-05-travail', 'perimetre-v2.mjs'));
const lire = (p) => readFileSync(join(copie, p), 'utf8'); const ecrire = (p, t) => writeFileSync(join(copie, p), t);
const avecTexte = (p, f, g) => { const t0 = lire(p); ecrire(p, f(t0)); try { return g(); } finally { ecrire(p, t0); } };
const essai = (g) => { try { return { r: g() }; } catch (e) { return { err: e.message }; } };

// Normalisation : ce que le correctif ajoute ou remplace est retiré, pour comparer le reste octet pour octet
const normProp = (t) => {
  const l = t.split('\n'); const o = [];
  for (let i = 0; i < l.length; i++) {
    if (l[i].startsWith('**4.3 Corrections retenues')) { o.pop(); i++; while ((l[i + 1] ?? '').startsWith('|')) i++; continue; } // ligne vide d'avant, titre, ligne vide, tableau
    if (l[i].startsWith('- **Relevés du criblage dont une valeur est déjà corrigée**')) continue;
    if (l[i].startsWith('| Sens du lot 1 du volet 1') || l[i].startsWith('| Corrections retenues lues dans le bilan')) continue;
    o.push(l[i].replace(/ ; volet 1, lot 1 \((?:conforme|écart \(E\d\)), arbitré\)/g, '').replace(/volet 1, lot 1 \((?:conforme|écart \(E\d\)), arbitré\)/g, 'hors des 377 et des 147'));
  }
  return o.join('\n');
};
const normAct = (t) => t.split('\n').filter((x) => !x.startsWith('- **Rapprochements du criblage fondés sur une valeur que la liste globale corrige déjà**')).join('\n');
const champs = ['nom', 'sens', 'entry', 'regles', 'cites', 'memes', 'autresLiv', 'autresSens', 'corrections', 'blocF', 'decisions'];
const memesComptes = (a, b) => champs.filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
const lot1Ids = [...lire(LOT1).matchAll(/^#### `((?:hj_)?v_\d+_s\d+)` /gm)].map((m) => m[1]);
const libellesLot1 = (t) => [...t.matchAll(/^\| `((?:hj_)?v_\d+_s\d+)` \|.*volet 1, lot 1 \(/gm)].map((m) => m[1]);

// E1 à E6 · T2 : même configuration que perimetre-T2.mjs (lancée dans la copie, avec le générateur actuel puis proposé)
const lancerT2 = (gen, sortie) => { const s = spawnSync('node', [gen === 'actuel' ? T2A : join(copie, 'a2-05-travail', 'perimetre-T2.mjs'), copie, '--sortie', sortie], { encoding: 'utf8' }); return { code: s.status, json: s.status === 0 ? JSON.parse(s.stdout) : null, err: s.stderr.slice(0, 300) }; };
const ta = lancerT2('actuel', join(out, 'T2-actuel.md')), tp = lancerT2('propose', join(out, 'T2-propose.md'));
const T2a = readFileSync(join(out, 'T2-actuel.md'), 'utf8'), T2p = readFileSync(join(out, 'T2-propose.md'), 'utf8');
ok('E1', 'T2 : générations conformes ; le générateur actuel reproduit le périmètre accepté octet pour octet', ta.code === 0 && tp.code === 0 && T2a === readFileSync(join(root, R + 'T2-perimetre.md'), 'utf8'), 'codes ' + ta.code + ' / ' + tp.code + (tp.err ? ' ; ' + tp.err : ''));
ok('E2', 'T2 : 21 sens, 21 ENTRY, règles, comparables, décisions et les 7 corrections des ENTRY de T2 inchangés', tp.json && !memesComptes(ta.json, tp.json).length && tp.json.sens === 21 && tp.json.entry === 21 && tp.json.corrections.join() === 'V2-74,V2-75,V2-10,V2-26,V2-20,V2-23,V2-148', tp.json ? 'différences : ' + (memesComptes(ta.json, tp.json).join(', ') || 'aucune') + ' ; corrections : ' + tp.json.corrections.join(', ') : '');
const L1 = Object.fromEntries(tp.json?.lot1Comparables ?? []);
ok('E3', 'T2 : 洗う, 冷たい sens 2 et 汚い sens 2 reconnus comme sens du lot 1, avec leur verdict arbitré', JSON.stringify(Object.keys(L1).sort()) === JSON.stringify(['v_221_s1', 'v_265_s2', 'v_461_s2']) && L1.v_221_s1 === 'volet 1, lot 1 (écart (E3), arbitré)' && L1.v_265_s2 === 'volet 2 (147, arbitré) ; volet 1, lot 1 (écart (E2), arbitré)' && L1.v_461_s2 === 'volet 2 (147, arbitré) ; volet 1, lot 1 (conforme, arbitré)', JSON.stringify(L1));
const CK = tp.json?.correctionsComparables ?? []; const cDe = (id, n) => CK.find((c) => c[0] === id && c[1] === n);
const v11 = cDe('v_221_s1', 'V1-1'), v15 = cDe('v_265_s2', 'V1-5'), m7 = cDe('v_671_s1', 'modification n°7 du volet 2');
ok('E4', 'T2 : V1-1 et V1-5 (et la modification n°7) visibles sur les comparables, valeur publiée et valeur retenue distinguées, provenance exacte', v11 && v11[2] === '§8.1' && v11[3] === '`habitat_vie_domestique › entretien_domestique › nettoyage`' && v11[4].startsWith('`null` (A5)') && v15 && v15[2] === '§8.1' && v15[3].startsWith('« Froid (attitude) »') && v15[4].startsWith('« Insensible (figuré) »') && m7 && m7[2] === '§2' && m7[3] === '`null`',
  [v11, v15, m7].map((c) => c ? c[0] + ' ' + c[1] + ' ' + c[2] + ' : ' + c[3].slice(0, 60) + ' → ' + c[4].slice(0, 60) : 'absente').join(' | ') + ' ; ' + CK.length + ' corrections sur les comparables');
const TO = tp.json?.touches ?? []; const a = (s) => TO.some((x) => x.startsWith(s));
ok('E5', 'T2 : relevés touchés signalés sans être recalculés (掃除 C1-f par 洗う ; 寒い C1-a et C1-h, 暑い C1-h par 冷たい sens 2 ; 灰皿 C1-h par 時計)',
  a('掃除 `C1-f` : 洗う (`v_221_s1`, V1-1, `category`, **champ du critère**, membre de la catégorie') && TO.some((x) => x.startsWith('寒い `C1-a` : 冷たい (`v_265_s2`, V1-5') && x.includes('**champ du critère**')) && TO.some((x) => x.startsWith('寒い `C1-h` : 冷たい (`v_265_s2`, V1-5') && x.includes('autre champ que le critère')) && a('暑い `C1-h` : 冷たい (`v_265_s2`, V1-5') && a('灰皿 `C1-h` : 時計 (`v_671_s1`, modification n°7 du volet 2, `category`, **champ du critère**') && normProp(T2p).includes('`C1-f` — catégorie « habitat_vie_domestique › entretien_domestique › nettoyage » : 3 sens sur 4 déjà candidats'),
  TO.length + ' relevés : ' + TO.join(' | '));
ok('E6', 'T2 : hors des ajouts du correctif (§4.3, relevés touchés, deux lignes du §7, libellés du lot 1, relevé antérieur remplacé), texte identique octet pour octet au générateur actuel', normProp(T2p) === normAct(T2a) && libellesLot1(T2p).every((id) => lot1Ids.includes(id)), 'lignes étiquetées « lot 1 » : ' + libellesLot1(T2p).join(', '));

// E7 · non-régression sur les autres tranches et livraisons (T9 et F exclus) : comptes identiques, texte identique hors ajouts
const cas = [['T1', ['B10', 'B11', 'B12'], true], ['B8', ['B8'], true], ['B9', ['B9'], true], ['T3', ['B15', 'B16']], ['T4', ['C1', 'C2', 'C3', 'C4']], ['T5', ['D2', 'D3']], ['T6', ['D6', 'D7']], ['T7', ['D1', 'D4']], ['T8', ['D5', 'D8']]];
const nr = cas.map(([nom, livraisons, nonreg]) => {
  const cfg = (s) => ({ root: copie, nom, livraisons, date: '2026-10-21', sortie: join(out, nom + '-' + s + '.md'), autorisation: 'essai de non-régression', nonreg, risquesManuels: [] });
  const x = essai(() => A.produirePerimetre(cfg('a'))), y = essai(() => P.produirePerimetre(cfg('p')));
  if (x.err || y.err) return { nom, ok: false, d: nom + ' : erreur : ' + (x.err ?? y.err) };
  const ta2 = readFileSync(join(out, nom + '-a.md'), 'utf8'), tp2 = readFileSync(join(out, nom + '-p.md'), 'utf8');
  const diff = memesComptes(x.r, y.r); const texte = normProp(tp2) === normAct(ta2);
  return { nom, ok: !diff.length && texte && libellesLot1(tp2).every((id) => lot1Ids.includes(id)), d: nom + ' : ' + (diff.length ? 'comptes différents (' + diff.join(', ') + ')' : 'comptes identiques') + ', texte ' + (texte ? 'identique hors ajouts' : 'DIFFÉRENT') + ' ; lot 1 parmi les comparables : ' + (y.r.lot1Comparables.map((c) => c[0]).join(', ') || 'aucun') + ' ; corrections sur les comparables : ' + y.r.correctionsComparables.length + ' ; relevés touchés : ' + y.r.touches.length, lot1: y.r.lot1Comparables, corr: y.r.correctionsComparables };
});
ok('E7', 'non-régression : T1, B8, B9 (mode de non-régression), T3 à T8', nr.every((x) => x.ok), nr.map((x) => x.d).join(' | '));

// E8 · protection : le générateur proposé refuse d'écrire sur un périmètre accepté hors du manifeste ; l'actuel l'écrase (copie, restaurée)
const accepte = R + 'T2-perimetre.md'; const t2acc = lire(accepte);
const g1 = spawnSync('node', [join(copie, 'a2-05-travail', 'perimetre-T2.mjs'), copie], { encoding: 'utf8' });
const g0 = spawnSync('node', [T2A, copie], { encoding: 'utf8' }); ecrire(accepte, t2acc);
ok('E8', 'protection du périmètre accepté (hors du manifeste) : refus du générateur proposé ; le générateur actuel, lui, réécrit le fichier', g1.status !== 0 && /périmètre accepté, il ne se régénère pas/.test(g1.stderr) && g0.status === 0, 'proposé : code ' + g1.status + ' ; actuel : code ' + g0.status + ' (copie restaurée)');

// Sabotages, chacun annulé aussitôt (copie temporaire)
const genP = () => P.produirePerimetre({ root: copie, nom: 'T2', livraisons: ['B13', 'B14'], date: '2026-10-21', sortie: join(out, 'S.md'), autorisation: 'sabotage', risquesManuels: [] });
const sab = [
  ['S1', 'une fiche du lot 1 retirée → refus (19 attendues)', LOT1, (t) => t.replace(/^#### `v_221_s1` .*$/m, '#### retirée'), /lot 1 : 18 fiches lues/],
  ['S2', 'rapport du lot 1 sans arbitrage → refus', LOT1, (t) => t.replace(/^\*\*Statut\*\* : \*\*arbitré le /m, '**Statut** : **proposé le '), /lot 1 : rapport non arbitré/],
  ['S3', 'une des dix modifications du volet 2 retirée → refus', BILAN, (t) => t.replace(/^\| 7 \| `v_671_s1` .*\n/m, ''), /dix modifications/],
  ['S4', 'numéro de correction en double → refus', BILAN, (t) => t.replace(/^(\| V1-1 \|.*)$/m, '$1\n$1'), /en double/],
].map(([id, nom, p, f, re]) => { const x = avecTexte(p, f, () => essai(genP)); return { id, nom, ok: !!x.err && re.test(x.err), d: x.err ? x.err.slice(0, 120) : 'NON REFUSÉ' }; });
// S5, S6 : sabotages que la génération accepte, mais que les contrôles E4 et E3 détectent
const s5 = avecTexte(BILAN, (t) => t.replace(/^\| V1-1 \|.*\n/m, ''), () => essai(genP));
sab.push({ id: 'S5', nom: 'ligne V1-1 retirée du bilan → V1-1 absente des comparables, détectée par E4', ok: !s5.err && !s5.r.correctionsComparables.some((c) => c[1] === 'V1-1'), d: s5.err ?? 'V1-1 ' + (s5.r.correctionsComparables.some((c) => c[1] === 'V1-1') ? 'présente' : 'absente : E4 échouerait') });
const s6 = avecTexte(LOT1, (t) => t.replace(/(^#### `v_221_s1` .* — )\*\*écart \(E3\)\*\*$/m, '$1**conforme**'), () => essai(genP));
sab.push({ id: 'S6', nom: 'verdict de 洗う altéré dans le rapport du lot 1 → libellé changé, détecté par E3', ok: !s6.err && Object.fromEntries(s6.r.lot1Comparables).v_221_s1 === 'volet 1, lot 1 (conforme, arbitré)', d: s6.err ?? 'libellé : ' + Object.fromEntries(s6.r.lot1Comparables).v_221_s1 });
for (const s of sab) ok(s.id, 'sabotage : ' + s.nom, s.ok, s.d);
const temoin = essai(genP); ok('S0', 'témoin sain après les sabotages : génération conforme, mêmes comptes que E2', !temoin.err && !memesComptes(tp.json, temoin.r).filter((k) => k !== 'nom').length, temoin.err ?? 'conforme');

if (APRES) {
  // E10 · les 19 sens du lot 1, relus indépendamment (14 conformes, 5 écarts) ; chaque étiquette affichée (T2 et E7) porte le verdict du rapport
  const v1 = new Map([...lire(LOT1).matchAll(/^#### `((?:hj_)?v_\d+_s\d+)` · [^\n]* — \*\*([^*]+)\*\*$/gm)].map((m) => [m[1], m[2]]));
  const nC = [...v1.values()].filter((x) => x === 'conforme').length, nE = [...v1.values()].filter((x) => /^écart \(E\d\)$/.test(x)).length;
  const vus = [...(tp.json?.lot1Comparables ?? []), ...nr.flatMap((x) => x.lot1 ?? [])];
  const faux = vus.filter(([id, et]) => !v1.has(id) || !et.endsWith('volet 1, lot 1 (' + v1.get(id) + ', arbitré)'));
  ok('E10', 'lot 1 : 19 sens (14 conformes, 5 écarts) ; toutes les étiquettes affichées conformes au verdict arbitré', v1.size === 19 && nC === 14 && nE === 5 && vus.length > 0 && !faux.length, v1.size + ' sens, ' + nC + ' conformes, ' + nE + ' écarts ; ' + vus.length + ' étiquettes vérifiées (' + [...new Set(vus.map((x) => x[0]))].join(', ') + ')' + (faux.length ? ' ; FAUSSES : ' + faux.map((x) => x[0]).join(', ') : ''));
  // E11 · chaque correction affichée au §4.3 (T2 et E7) retrouvée dans le bilan, lu indépendamment : numéro, section, valeur retenue
  const lignes = []; let sec = '';
  for (const l of lire(BILAN).replace(/\r\n/g, '\n').split('\n')) { const h = l.match(/^#{2,3} (\d+(?:\.\d+)*)\.? /); if (h) { sec = '§' + h[1]; continue; } if (l.startsWith('| ')) lignes.push({ sec, l, n: l.split('|')[1].trim() }); }
  const aff = [...(tp.json?.correctionsComparables ?? []), ...nr.flatMap((x) => x.corr ?? [])];
  const introuvables = aff.filter(([, n, s, pub, ret]) => { const num = (n.match(/^modification n°(\d+) du volet 2$/) ?? [])[1] ?? n; return !lignes.some((x) => x.n === num && x.sec === s && x.l.includes(ret) && (pub === '(non relevée)' || !/^V1-|^modification/.test(n) || x.l.includes(pub))); });
  ok('E11', 'corrections affichées sur les comparables : chacune retrouvée dans le bilan (numéro, section, valeur retenue ; valeur publiée pour V1-n et modifications)', aff.length > 0 && !introuvables.length, aff.length + ' affichages, ' + new Set(aff.map((x) => x[1])).size + ' corrections distinctes' + (introuvables.length ? ' ; INTROUVABLES : ' + introuvables.map((x) => x[0] + ' ' + x[1]).join(', ') : ''));
  // E12 · dépôt réel : le générateur appliqué refuse d'écrire sur le périmètre accepté de T2 (hors du manifeste) et sur celui de T1 (manifeste)
  const perT2 = join(root, R + 'T2-perimetre.md'), perT1 = join(root, R + 'T1-perimetre.md'); const o2 = readFileSync(perT2), o1 = readFileSync(perT1); const h2 = sha(perT2), h1 = sha(perT1);
  const r2 = spawnSync('node', [join(W, 'perimetre-T2.mjs'), root], { encoding: 'utf8' });
  const { produirePerimetre } = await imp(join(W, 'perimetre-v2.mjs')); const r1 = essai(() => produirePerimetre({ root, nom: 'T1', livraisons: ['B10', 'B11', 'B12'], date: '2026-10-22', autorisation: 'essai de protection', risquesManuels: [] }));
  const ch2 = sha(perT2) !== h2, ch1 = sha(perT1) !== h1; if (ch2) writeFileSync(perT2, o2); if (ch1) writeFileSync(perT1, o1);
  ok('E12', 'dépôt réel : refus d\'écrire sur le périmètre accepté de T2 (hors du manifeste) et sur le périmètre arbitré de T1 (manifeste) ; fichiers inchangés', r2.status !== 0 && /périmètre accepté, il ne se régénère pas/.test(r2.stderr) && !!r1.err && /protégé par le manifeste/.test(r1.err) && !ch2 && !ch1,
    'T2 : code ' + r2.status + ', ' + (ch2 ? 'MODIFIÉ, restauré' : 'empreinte inchangée ' + h2.slice(0, 12) + '…') + ' ; T1 : ' + (r1.err ? 'refus' : 'NON REFUSÉ') + ', ' + (ch1 ? 'MODIFIÉ, restauré' : 'empreinte inchangée ' + h1.slice(0, 12) + '…'));
}

// E9 · rien n'a changé dans le dépôt (zones protégées, générateur réel, manifeste, registre des tranches, criblage, lot 1, bilan, périmètre accepté)
const apres = { arbre: empreinteArbre(PROTEGES), fichiers: Object.fromEntries(Object.keys(avant.fichiers).map((p) => [p, sha(join(root, p))])) };
ok('E9', 'dépôt inchangé par les essais (data, reconstruction, tests, tools, docs/conception ; générateur réel ; manifeste ; registre ; criblage ; lot 1 ; bilan ; périmètre accepté de T2)', JSON.stringify(avant) === JSON.stringify(apres), Object.keys(avant.fichiers).length + ' fichiers et 5 arbres comparés');

if (process.argv.includes('--apercu') && !APRES) { mkdirSync(join(CC, 'apercu'), { recursive: true }); writeFileSync(join(CC, 'apercu', 'T2-perimetre-corrige.md'), T2p); console.log('aperçu écrit : a2-05-travail/correction-comparables/apercu/T2-perimetre-corrige.md'); }
rmSync(tmp, { recursive: true, force: true });
for (const r of res) console.log((r.ok ? 'conforme ' : 'ÉCART    ') + r.id.padEnd(3) + ' ' + r.nom + (r.detail ? ' : ' + r.detail : ''));
const n = res.filter((r) => r.ok).length; console.log(n + ' conformes sur ' + res.length); process.exit(n === res.length ? 0 : 1);
