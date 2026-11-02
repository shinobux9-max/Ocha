// A2-05 : essais de la correction proposée du rapprochement hors JLPT (proposition, NON appliquée).
// Usage : node a2-05-travail/correction-hj/essais-correction-hj.mjs <racine du dépôt>
// Travaille sur une COPIE TEMPORAIRE de l'arbre (data, docs, reconstruction, tools, a2-05-travail) où les deux modules proposés
// remplacent les modules v2 ; n'écrit rien dans le dépôt ; toute sortie d'outil va dans le dossier temporaire.
// Code de sortie : 0 si tous les essais sont conformes, 1 sinon.
import { readFileSync, mkdtempSync, cpSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const W = join(root, 'a2-05-travail'), PROP = join(W, 'correction-hj', 'proposition');
const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
const res = []; const ok = (id, nom, cond, detail = '') => res.push({ id, nom, ok: !!cond, detail });
const MODS = ['perimetre-v2.mjs', 'lot3-commun-v2.mjs'];
const shaReels = Object.fromEntries(MODS.map((m) => [m, sha(join(W, m))]));
const man = JSON.parse(readFileSync(join(W, 'empreintes-rapports-arbitres.json'), 'utf8')).empreintes;
const sha27 = Object.fromEntries(Object.keys(man).map((p) => [p, sha(join(root, p))]));
const T1P = 'docs/rapports/etape2-A2-05-volet1-lot3-T1-perimetre.md'; const shaT1 = sha(join(root, T1P));

// Copie temporaire, modules proposés substitués
const tmp = mkdtempSync(join(tmpdir(), 'ocha-hj-')); const copie = join(tmp, 'arbre');
for (const d of ['data', 'docs', 'reconstruction', 'tools', 'a2-05-travail']) cpSync(join(root, d), join(copie, d), { recursive: true });
for (const m of MODS) cpSync(join(PROP, m), join(copie, 'a2-05-travail', m));
const Pc = await import(pathToFileURL(join(copie, 'a2-05-travail', 'lot3-commun-v2.mjs')).href);
const Pp = await import(pathToFileURL(join(copie, 'a2-05-travail', 'perimetre-v2.mjs')).href);
// Générateur de référence, pour comparaison : par défaut les modules réels ; avec --reference <dossier>, les modules de ce dossier
// (après application, la sauvegarde de départ correction-hj/depart/ : sinon la version corrigée serait comparée à elle-même)
const iRef = process.argv.indexOf('--reference'); let Ap, REF = 'modules réels de a2-05-travail/';
if (iRef >= 0) {
  const dossier = process.argv[iRef + 1]; const ref = join(tmp, 'reference');
  cpSync(join(copie, 'a2-05-travail'), join(ref, 'a2-05-travail'), { recursive: true }); cpSync(join(copie, 'tools'), join(ref, 'tools'), { recursive: true });
  for (const m of MODS) cpSync(join(dossier, m), join(ref, 'a2-05-travail', m));
  Ap = await import(pathToFileURL(join(ref, 'a2-05-travail', 'perimetre-v2.mjs')).href); REF = 'modules de ' + dossier.split(/[\\/]/).slice(-2).join('/') + '/ (sha256 ' + MODS.map((m) => m + ' ' + sha(join(dossier, m)).slice(0, 12) + '…').join(', ') + ')';
} else Ap = await import(pathToFileURL(join(W, 'perimetre-v2.mjs')).href);
console.log('Référence de comparaison : ' + REF);
const lire = (p) => readFileSync(join(copie, p), 'utf8').replace(/\r\n/g, '\n');

// E1 à E4 · résolution canonique et fonction identifiantsCites
const { canon } = Pc.correspondance(copie);
const vocab = [...JSON.parse(lire('data/n5/vocab.json')), ...JSON.parse(lire('data/vocab-hors-jlpt.json'))];
ok('E1', 'résolution canonique : v_718 → hj_v_1, v_719 → hj_v_2', canon.get('v_718') === 'hj_v_1' && canon.get('v_719') === 'hj_v_2', 'v_718 → ' + canon.get('v_718') + ' ; v_719 → ' + canon.get('v_719'));
const listes = vocab.map((e) => ({ id: e.id, l: Pc.identifiantsCites(e.id, canon.get(e.id)) }));
const hj = listes.filter((x) => x.l.length > 1), n5 = listes.filter((x) => x.l.length === 1);
ok('E2', 'identifiants N5 ordinaires : un seul identifiant cherché, identique à l\'identifiant publié', n5.length === vocab.length - 2 && n5.every((x) => x.l[0] === x.id), n5.length + ' ENTRY N5');
ok('E3', 'identifiants hors JLPT : identifiant publié puis identifiant source, sans doublon', hj.length === 2 && JSON.stringify(hj.map((x) => x.l)) === JSON.stringify([['v_718', 'hj_v_1'], ['v_719', 'hj_v_2']]), hj.map((x) => x.l.join(' + ')).join(' ; '));
ok('E4', 'aucun doublon dans aucune liste', listes.every((x) => new Set(x.l).size === x.l.length), listes.length + ' listes');

// E5 à E8 · recalcul indépendant des corrections retenues par ENTRY (extraction des identifiants cités, inverse de la correspondance)
const bilan = lire('docs/rapports/etape2-A2-05-bilan-volet2.md').replace(/^## 7\. [\s\S]*?(?=^## 8\. )/m, '');
const inverse = new Map([...canon].map(([pub, src]) => [src.replace(/^n5_/, ''), pub]));
const parEntry = new Map();
for (const l of bilan.split('\n').filter((x) => /^\| V[12]-\d+ \|/.test(x))) {
  const v = l.split('|')[1].trim();
  for (const m of l.matchAll(/`((?:hj_)?v_\d+)(?:_s\d+)?`/g)) { const pub = inverse.get(m[1]); if (!pub) continue; if (!parEntry.has(pub)) parEntry.set(pub, new Set()); parEntry.get(pub).add(v); }
}
const reg = JSON.parse(lire('a2-05-travail/registre-tranches.json')).tranches;
const cov = (await import(pathToFileURL(join(copie, 'a2-05-travail', 'couverture-lot3.mjs')).href)).couverture(copie);
const lignes = [], refusees = []; let tousEgaux = true, seulsHj = true, T1 = null, T4hj = null;
for (const t of reg) {
  const eids = [...new Set(cov.sens.filter((s) => t.livraisons.includes(s.livraison)).map((s) => s.id.replace(/_s\d+$/, '')))];
  const attendu = [...new Set(eids.flatMap((e) => [...(parEntry.get(e) ?? [])]))].sort();
  // Une tranche que le générateur refuse (fait antérieur à la correction) est consignée : les deux générateurs doivent la refuser à l'identique
  const essai = (G, suf) => { try { return { r: G.produirePerimetre({ root: copie, nom: t.id, livraisons: t.livraisons, date: 'essai', autorisation: 'essai', sortie: join(tmp, t.id + suf) }) }; } catch (e) { return { err: e.message }; } };
  const xp = essai(Pp, '-propose.md'), xa = essai(Ap, '-actuel.md');
  if (xp.err || xa.err) { const meme = xp.err === xa.err; refusees.push(t.id); if (!meme) tousEgaux = false; lignes.push(t.id + ' : génération refusée par les deux générateurs' + (meme ? ', à l\'identique' : ', DIFFÉREMMENT') + ' (« ' + (xp.err ?? '—') + ' » / « ' + (xa.err ?? '—') + ' ») ; recalcul indépendant : ' + attendu.length + ' correction(s)' + (attendu.length ? ' (' + attendu.join(', ') + ')' : '')); continue; }
  const pr = xp.r, ac = xa.r;
  const p = [...pr.corrections].sort(), a = [...ac.corrections].sort();
  const egal = JSON.stringify(p) === JSON.stringify(attendu); tousEgaux &&= egal && new Set(pr.corrections).size === pr.corrections.length;
  const ajout = p.filter((x) => !a.includes(x)), retrait = a.filter((x) => !p.includes(x));
  const aHj = eids.some((e) => canon.get(e)?.startsWith('hj_')); if (!aHj && (ajout.length || retrait.length)) seulsHj = false;
  if (t.id === 'T1') T1 = { p, attendu, ajout }; if (eids.includes('v_719')) T4hj = { tranche: t.id, v719: [...(parEntry.get('v_719') ?? [])], p };
  lignes.push(t.id + ' : ' + p.length + ' (recalcul indépendant ' + attendu.length + ', ' + (egal ? 'identique' : 'DIFFÉRENT') + ') ; actuel ' + a.length + (ajout.length ? ' ; ajoutées : ' + ajout.join(', ') : '') + (retrait.length ? ' ; RETIRÉES : ' + retrait.join(', ') : ''));
}
ok('E5', 'corrections par tranche : générateur proposé = recalcul indépendant, sans doublon (T1 à T9 et F ; une tranche refusée doit l\'être à l\'identique par les deux générateurs)', tousEgaux && !refusees.includes('T1'), (reg.length - refusees.length) + ' tranches comparées' + (refusees.length ? ' ; refusées à l\'identique par les deux générateurs, hors comparaison : ' + refusees.join(', ') : ''));
ok('E6', 'T1 : 9 corrections, V2-84 comprise ; seule V2-84 s\'ajoute', T1 && T1.p.length === 9 && T1.p.includes('V2-84') && JSON.stringify(T1.ajout) === '["V2-84"]', T1 ? T1.p.join(', ') : '?');
ok('E7', 'ポイントカード (v_719) : corrections pertinentes contrôlées', T4hj && T4hj.v719.length === 0, T4hj ? T4hj.tranche + ' ; corrections citées sous v_719 ou hj_v_2 : ' + (T4hj.v719.join(', ') || 'aucune') : '?');
ok('E8', 'aucune différence entre générateurs actuel et proposé pour les tranches sans ENTRY hors JLPT', seulsHj, 'T2, T3, T5 à T9, F');

// E9 · non-régression du module v2 et du générateur : essais B6 à B9 relancés sur la copie (modules proposés)
const RE = 'docs/rapports/etape2-A2-05-outillage-essais.md';
const ess = spawnSync('node', [join(copie, 'a2-05-travail', 'essais-outillage-v2.mjs'), copie], { encoding: 'utf8', maxBuffer: 1 << 28 });
const essIdem = readFileSync(join(copie, RE), 'utf8') === readFileSync(join(root, RE), 'utf8');
ok('E9', 'non-régression B6 à B9 (essais-outillage-v2.mjs avec les modules proposés)', ess.status === 0 && essIdem, 'code ' + ess.status + ' ; rapport d\'essais ' + (essIdem ? 'identique' : 'DIFFÉRENT'));

// E10 · non-régression du périmètre de T1 : régénéré avec le générateur proposé ; seule la ligne des corrections du §6.1 change
const g = spawnSync('node', [join(copie, 'a2-05-travail', 'perimetre-T1.mjs'), copie], { encoding: 'utf8' });
const avant = readFileSync(join(root, T1P), 'utf8').split('\n'), apres = readFileSync(join(copie, T1P), 'utf8').split('\n');
const diffL = avant.map((l, i) => (l !== apres[i] ? i + 1 : 0)).filter(Boolean);
const L = diffL[0] - 1, CR = '- **Corrections retenues sur ces ENTRY**';
ok('E10', 'périmètre de T1 régénéré : seule la ligne des corrections retenues (§6.1) change, et V2-84 s\'y ajoute', g.status === 0 && avant.length === apres.length && diffL.length === 1 && avant[L].startsWith(CR) && apres[L].startsWith(CR) && !avant[L].includes('V2-84') && apres[L].includes('V2-84'),
  'code ' + g.status + ' ; lignes différentes : ' + diffL.join(', ') + (diffL.length === 1 ? ' — avant : « ' + avant[L] + ' » ; après : « ' + apres[L] + ' »' : ''));

// E11 · innocuité
const modifies = Object.entries(sha27).filter(([p, h]) => sha(join(root, p)) !== h).map(([p]) => p);
ok('E11', 'modules réels, 27 rapports arbitrés et périmètre de T1 du dépôt inchangés', MODS.every((m) => sha(join(W, m)) === shaReels[m]) && !modifies.length && sha(join(root, T1P)) === shaT1, (modifies.join(', ') || '27 inchangés') + ' ; modules réels et périmètre de T1 inchangés');

for (const r of res) console.log((r.ok ? 'conforme ' : 'ÉCART    ') + r.id.padEnd(4) + ' ' + r.nom + ' : ' + r.detail);
console.log('\nCorrections par tranche :'); for (const l of lignes) console.log('  ' + l);
console.log('\nDossier temporaire : ' + tmp + ' (copie de l\'arbre et sorties des générateurs ; hors dépôt ; existe : ' + existsSync(tmp) + ')');
const n = res.filter((r) => !r.ok).length; console.log('\n' + (res.length - n) + ' conformes sur ' + res.length); process.exitCode = n ? 1 : 0;
