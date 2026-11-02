// A2-05 · volet 1 · lot 3 : tests de résistance des trois contrôles adaptés à la 38e entrée (contrôle du bilan du pilote, recalculs de T5 et de
// T6), sur copie temporaire. Rien n'est écrit dans le dépôt.
// Usage : node a2-05-travail/arbitrage-T6/controles/sabotages-controles-T6.mjs <racine du dépôt> <dossier des trois contrôles> [--renfort]
// L'état E3 est construit dans un clone git jetable (--shared, --no-checkout) recouvert de l'arbre de travail : les trois contrôles du dossier
// donné sont installés, puis la 38e entrée est ajoutée par l'outil réel (empreintes-lot3.mjs --ajouter). Témoin sain avant et après ; chaque
// sabotage part de l'état E3 restauré, vérifie qu'il modifie réellement les données, lance les trois contrôles et compare l'ensemble des
// contrôles qui le détectent (code non nul) à l'ensemble attendu. Les sorties complètes de chaque contrôle sont imprimées.
// --renfort : attentes de la variante renforcée (sabotage S4 détecté aussi par le contrôle du bilan du pilote et le recalcul de T6).
// --finale : attentes de la variante renforcée ; en plus, le contrôle du bilan du pilote ne doit jamais s'arrêter par exception (écart explicite).
// S15 et S16 (documents de T5 attendus supprimés) ont été ajoutés le 2026-10-27 avec la version finale.
import { readFileSync, writeFileSync, existsSync, mkdtempSync, cpSync, readdirSync, rmSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); const dossier = resolve(process.argv[3] ?? '');
if (!process.argv[2] || !process.argv[3]) throw new Error('arguments attendus : racine du dépôt, dossier des trois contrôles');
const finale = process.argv.includes('--finale'); const renfort = finale || process.argv.includes('--renfort');
const W = 'a2-05-travail/', MAN = W + 'empreintes-rapports-arbitres.json';
const CTL = { cbp: W + 'controle-bilan-pilote.mjs', rec5: W + 'recalcul-T5-perimetre.mjs', rec6: W + 'recalcul-T6-perimetre.mjs' };
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
const P6 = R + 'T6-perimetre.md', P5 = R + 'T5-perimetre.md', T5R = R + 'T5.md', T1R = R + 'T1.md', PROP6 = W + 'arbitrage-T6/proposition-T6-perimetre.md';
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const empreintes = Object.fromEntries(Object.entries(CTL).map(([k, p]) => [k, sha(join(dossier, p.split('/').pop()))]));
const PROPT5 = W + 'arbitrage-T5/proposition-T5.md';
console.log('contrôles installés : ' + Object.entries(empreintes).map(([k, h]) => k + ' ' + h.slice(0, 12) + '…').join(', ') + (finale ? ' (attentes de la version finale)' : renfort ? ' (attentes de la variante renforcée)' : ''));

// État E3 dans un clone jetable
const tmp = mkdtempSync(join(tmpdir(), 'ocha-sabotages-t6-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
if (cl.status !== 0) throw new Error('clone : code ' + cl.status);
for (const p of Object.values(CTL)) cpSync(join(dossier, p.split('/').pop()), join(C, p));
// Le chemin du clone temporaire est masqué dans les sorties (« <clone> »), sous ses deux écritures
const masquer = (t) => t.split(C).join('<clone>').split(C.replace(/\\/g, '/')).join('<clone>');
const run = (s, ...a) => { const r = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: masquer(((r.stdout ?? '') + (r.stderr ?? '')).trim()) }; };
const aj = run(W + 'empreintes-lot3.mjs', '--ajouter'); const man3 = JSON.parse(readFileSync(join(C, MAN), 'utf8'));
if (aj.code !== 0 || Object.keys(man3.empreintes).length !== 38 || Object.keys(man3.empreintes)[37] !== P6) throw new Error('état E3 non atteint : ' + aj.out);
console.log('état E3 : ' + aj.out + ' ; 38 entrées, 38e = ' + P6);
const SAUVE = [MAN, P6, P5, T5R, T1R, PROP6, PROPT5]; const etat3 = Object.fromEntries(SAUVE.map((p) => [p, readFileSync(join(C, p))]));
const restaurer = () => { for (const [p, b] of Object.entries(etat3)) writeFileSync(join(C, p), b); };
const lireMan = () => JSON.parse(readFileSync(join(C, MAN), 'utf8'));
const ecrireMan = (m) => writeFileSync(join(C, MAN), JSON.stringify(m, null, 1) + '\n');
const rehacher = (m, p) => { m.empreintes[p] = sha(join(C, p)); return m; };
const reordonner = (m, ordre) => { const e = {}; for (const k of ordre) e[k] = m.empreintes[k]; m.empreintes = e; return m; };
const remplacerDans = (p, avant, apres) => { const t = readFileSync(join(C, p), 'utf8'); if (t.split(avant).length !== 2) throw new Error(p + ' : motif non unique ou absent : ' + avant.slice(0, 60)); writeFileSync(join(C, p), t.replace(avant, () => apres)); };

let echecs = 0; let n = 0;
const cas = (nom, attendus, saboter) => {
  restaurer(); const avant = Object.fromEntries(SAUVE.map((p) => [p, existsSync(join(C, p)) ? sha(join(C, p)) : null]));
  if (saboter) saboter();
  const apres = Object.fromEntries(SAUVE.map((p) => [p, existsSync(join(C, p)) ? sha(join(C, p)) : null]));
  const touches = SAUVE.filter((p) => avant[p] !== apres[p]);
  const res = Object.fromEntries(Object.entries(CTL).map(([k, p]) => [k, run(p)]));
  const detectes = Object.keys(CTL).filter((k) => res[k].code !== 0);
  const exceptionCbp = /^(Error|\w*Error):/m.test(res.cbp.out);
  const ok = (saboter ? touches.length > 0 : true) && JSON.stringify(detectes) === JSON.stringify(attendus) && !(finale && exceptionCbp);
  if (!ok) echecs++;
  console.log('\n' + (ok ? 'conforme ' : 'ÉCHEC    ') + (++n) + '. ' + nom + ' : ' + (saboter ? 'données modifiées : ' + (touches.join(', ') || 'AUCUNE') : 'témoin') + ' ; détecté par : ' + (detectes.join(', ') || 'aucun') + ' ; attendu : ' + (attendus.join(', ') || 'aucun'));
  for (const [k, r] of Object.entries(res)) {
    const lignes = r.out.split('\n'); const exc = lignes.find((l) => /^(Error|\w*Error):/.test(l));
    console.log('   ' + k + ' (code ' + r.code + ')' + (exc ? ' par exception : ' + exc.slice(0, 160) : '') + ' :');
    for (const l of lignes.filter((l) => /^ÉCART/.test(l))) console.log('      ' + l.slice(0, 260));
    console.log('      ' + (lignes.filter((l) => !/^\s+at /.test(l)).pop() ?? '').slice(0, 200));
  }
};
const P = ['cbp', 'rec5', 'rec6'];
cas('témoin sain (avant)', [], null);
cas('S1 périmètre de T6 absent du manifeste (entrée retirée)', ['cbp', 'rec6'], () => { const m = lireMan(); delete m.empreintes[P6]; ecrireMan(m); });
cas('S2 périmètre de T6 modifié après acceptation (corps, une ligne du §6), manifeste inchangé', P, () => remplacerDans(P6, '**Taille et découpe** : 22 sens, 13 ENTRY', '**Taille et découpe** : 22 sens, 14 ENTRY'));
cas('S3 §0 du périmètre de T6 modifié, manifeste inchangé', P, () => remplacerDans(P6, '(5) ne pas élargir l\'audit à T8, T9 ou au bloc F.', '(5) ne pas élargir l\'audit à T8 ou au bloc F.'));
cas('S4 §0 modifié et manifeste réaligné sur le fichier modifié', renfort ? ['cbp', 'rec6'] : [], () => { remplacerDans(P6, '(5) ne pas élargir l\'audit à T8, T9 ou au bloc F.', '(5) ne pas élargir l\'audit à T8 ou au bloc F.'); ecrireMan(rehacher(lireMan(), P6)); });
cas('S5 corps du périmètre modifié et manifeste réaligné sur le fichier modifié', ['cbp', 'rec6'], () => { remplacerDans(P6, '**Taille et découpe** : 22 sens, 13 ENTRY', '**Taille et découpe** : 22 sens, 14 ENTRY'); ecrireMan(rehacher(lireMan(), P6)); });
cas('S6 corps initial altéré dans la proposition sauvegardée', ['cbp', 'rec6'], () => remplacerDans(PROP6, '**Taille et découpe** : 22 sens, 13 ENTRY', '**Taille et découpe** : 22 sens, 14 ENTRY'));
cas('S7 empreinte du rapport de T5 altérée dans le manifeste', P, () => { const m = lireMan(); m.empreintes[T5R] = '0'.repeat(64); ecrireMan(m); });
cas('S8 document plus ancien altéré (rapport arbitré de T1), manifeste inchangé', P, () => writeFileSync(join(C, T1R), Buffer.concat([readFileSync(join(C, T1R)), Buffer.from('\n')])));
cas('S9 entrée fictive supplémentaire (39e), fichier existant, empreinte exacte', ['cbp', 'rec6'], () => { const m = lireMan(); m.empreintes['docs/rapports/etape2-A2-05-bilan-volet2.md'] = sha(join(C, 'docs/rapports/etape2-A2-05-bilan-volet2.md')); ecrireMan(m); });
cas('S10 entrée fictive supplémentaire (39e), fichier inexistant', P, () => { const m = lireMan(); m.empreintes['docs/rapports/fictif.md'] = '0'.repeat(64); ecrireMan(m); });
cas('S11 disparition du rapport de T5 (fichier supprimé)', P, () => unlinkSync(join(C, T5R)));
cas('S12 rapport de T5 retiré du manifeste', P, () => { const m = lireMan(); delete m.empreintes[T5R]; ecrireMan(m); });
cas('S13 régression de position : périmètre et rapport de T5 permutés (36e et 37e)', ['cbp', 'rec5'], () => { const m = lireMan(); const k = Object.keys(m.empreintes); [k[35], k[36]] = [k[36], k[35]]; ecrireMan(reordonner(m, k)); });
cas('S14 régression de position : documents de T5 déplacés après le périmètre de T6', P, () => { const m = lireMan(); const k = Object.keys(m.empreintes).filter((x) => x !== P5 && x !== T5R); ecrireMan(reordonner(m, [...k, P5, T5R])); });
cas('S15 disparition du périmètre accepté de T5 (fichier supprimé)', P, () => unlinkSync(join(C, P5)));
cas('S16 disparition de la proposition sauvegardée du rapport de T5 (fichier supprimé)', ['cbp'], () => unlinkSync(join(C, PROPT5)));
cas('témoin sain (après)', [], null);
rmSync(tmp, { recursive: true, force: true });
console.log('\n' + (echecs ? echecs + ' cas non conformes aux attentes' : n + ' cas conformes aux attentes'));
process.exit(echecs ? 1 : 0);
