// A2-05 : essai du rapprochement des corrections par le module commun v2, sur des fiches d'examen TEMPORAIRES (correction hors JLPT).
// Usage : node a2-05-travail/correction-hj/essai-fiche-temporaire.mjs <racine du dépôt>
// Le module exige une livraison entière et, pour chaque sens, un champ `v` pris dans sa liste : les fiches sont des MARQUEURS TECHNIQUES
// (`v: 'suspendu'`, motivation « essai technique, sans lecture ni valeur lexicale »), en mode signalement ; aucune fiche source n'est lue
// pour juger. Les rapports produits vont dans un dossier temporaire, lu puis supprimé ; rien n'est écrit dans le dépôt.
// Compare le module corrigé (a2-05-travail/) et le module de départ (correction-hj/depart/) sur B12 (レジ袋, v_718) et C4 (ポイントカード, v_719).
import { readFileSync, mkdtempSync, cpSync, rmSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const root = resolve(process.argv[2]); const W = join(root, 'a2-05-travail');
const sha = (f) => createHash('sha256').update(readFileSync(f)).digest('hex');
const man = JSON.parse(readFileSync(join(W, 'empreintes-rapports-arbitres.json'), 'utf8')).empreintes;
const sha27 = Object.fromEntries(Object.keys(man).map((p) => [p, sha(join(root, p))]));
const tmp = mkdtempSync(join(tmpdir(), 'ocha-fiche-'));
const res = []; const ok = (id, nom, cond, detail) => res.push({ id, nom, ok: !!cond, detail });
try {
  // module de départ, dans une copie temporaire de a2-05-travail/ et tools/ (ses imports relatifs)
  const ref = join(tmp, 'depart'); cpSync(W, join(ref, 'a2-05-travail'), { recursive: true }); cpSync(join(root, 'tools'), join(ref, 'tools'), { recursive: true });
  for (const m of ['lot3-commun-v2.mjs', 'perimetre-v2.mjs']) cpSync(join(W, 'correction-hj', 'depart', m), join(ref, 'a2-05-travail', m));
  const Mc = await import(pathToFileURL(join(W, 'lot3-commun-v2.mjs')).href), Md = await import(pathToFileURL(join(ref, 'a2-05-travail', 'lot3-commun-v2.mjs')).href);
  const cov = (await import(pathToFileURL(join(W, 'couverture-lot3.mjs')).href)).couverture(root);
  const MARQUEUR = { v: 'suspendu', m: 'ESSAI TECHNIQUE DU RAPPROCHEMENT DES CORRECTIONS : marqueur temporaire, sans lecture de la fiche ni valeur lexicale.', r: '' };
  const ligneDe = (texte, id) => { const i = texte.indexOf('#### `' + id + '` '); if (i < 0) return null; const j = texte.indexOf('\n#### ', i + 5); const bloc = texte.slice(i, j > 0 ? j : undefined); return (bloc.match(/^- \*\*Déjà arbitré sur cette ENTRY, non rouvert\*\* : .*$/m) ?? [null])[0]; };
  const essai = (M, liv, suf) => { const IDS = cov.sens.filter((s) => s.livraison === liv).map((s) => s.id); const F = Object.fromEntries(IDS.map((id) => [id, { ...MARQUEUR }])); const sortie = join(tmp, liv + '-' + suf + '.md');
    // éléments de rédaction du rapport : neutres et vides (aucun contenu lexical)
    const neutre = { titre: 'essai technique', emploi: () => '', methode: '', axesNote: '', comparables: () => [], points: () => [], question: '', questions: [], suivante: '' };
    M.produire({ root, nom: liv, livraisons: [liv], IDS, F, date: 'essai', autorisation: 'essai technique', arbitrage: null, signalement: true, sortie, ...neutre }); return readFileSync(sortie, 'utf8'); };
  for (const [liv, id, attendu] of [['B12', 'v_718_s1', 'V2-84'], ['C4', 'v_719_s1', null]]) {
    const lc = ligneDe(essai(Mc, liv, 'corrige'), id), ld = ligneDe(essai(Md, liv, 'depart'), id);
    const corrC = (lc?.match(/corrections retenues, non appliquées : (.*)$/) ?? [])[1] ?? '?', corrD = (ld?.match(/corrections retenues, non appliquées : (.*)$/) ?? [])[1] ?? '?';
    if (attendu) ok('F-' + liv, 'fiche temporaire de ' + id + ' (' + liv + ') : ' + attendu + ' retrouvée par le module corrigé, absente avec le module de départ', corrC.includes(attendu) && !corrD.includes(attendu), 'corrigé : « ' + corrC + ' » ; départ : « ' + corrD + ' »');
    else ok('F-' + liv, 'fiche temporaire de ' + id + ' (' + liv + ') : aucune correction indue', corrC === corrD && !/V[12]-\d+/.test(corrC), 'corrigé : « ' + corrC + ' » ; départ : « ' + corrD + ' »');
  }
} finally { rmSync(tmp, { recursive: true, force: true }); }
const modifies = Object.entries(sha27).filter(([p, h]) => sha(join(root, p)) !== h).map(([p]) => p);
ok('F-0', 'dossier temporaire supprimé ; 27 rapports arbitrés inchangés', !existsSync(tmp) && !modifies.length, (existsSync(tmp) ? 'dossier présent' : 'dossier supprimé') + ' ; ' + (modifies.join(', ') || '27 inchangés'));
for (const r of res) console.log((r.ok ? 'conforme ' : 'ÉCART    ') + r.id.padEnd(6) + ' ' + r.nom + ' : ' + r.detail);
const n = res.filter((r) => !r.ok).length; console.log('\n' + (res.length - n) + ' conformes sur ' + res.length); process.exitCode = n ? 1 : 0;
