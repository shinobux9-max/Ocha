// A2-05 · volet 1 · lot 3 : essais de l'outillage v2 (en proposition). Lecture seule sur les données et les rapports arbitrés.
// 1. Non-régression : les configurations de B6 à B9 sont chargées sans exécuter leurs scripts (copie temporaire où l'import du module v1
//    est remplacé par un capteur), puis passées au module v2, qui écrit dans un dossier temporaire ; verdicts, catégories, types,
//    fonctions, corrections et R4 sont comparés aux rapports arbitrés et aux valeurs arbitrées.
// 2. Correspondance canonique : toutes les ENTRY publiées ont une entrée source ; v_718 et v_719 résolues.
// 3. Sabotages, dans des copies temporaires : doublon, omission, sens inconnu (registre) ; rapport modifié (manifeste) ; écriture sur un
//    rapport arbitré (module v2). Chacun doit être refusé.
// 4. Contrôles des motivations, en mode signalement, sur les fiches d'examen de B6 à B9.
// Usage : node essais-outillage-v2.mjs <racine du dépôt>   (écrit docs/rapports/etape2-A2-05-outillage-essais.md)
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, copyFileSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { produire, correspondance } from './lot3-commun-v2.mjs';
import { produirePerimetre } from './perimetre-v2.mjs';
import { couverture } from './couverture-lot3.mjs';
import { verifierEmpreintes, MANIFESTE } from './empreintes-lot3.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const ici = dirname(fileURLToPath(import.meta.url));
const LF = String.fromCharCode(10);
const R = 'docs/rapports/etape2-A2-05-volet1-lot3-';
const txt = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, LF);
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const tmp = mkdtempSync(join(tmpdir(), 'ocha-essais-v2-'));
const echecs = []; const sabotagesPre = [];
const ok = (c, msg) => { if (!c) echecs.push(msg); return c; };
const refuse = (f, attendu) => { try { f(); return 'NON REFUSÉ'; } catch (e) { return attendu.test(e.message) ? 'refusé : ' + e.message.slice(0, 140) : 'refusé pour une autre raison : ' + e.message.slice(0, 140); } };

// État de départ : empreintes et couverture
const emp0 = verifierEmpreintes(root); const cov0 = couverture(root);
const hashesAvant = Object.fromEntries(Object.keys(JSON.parse(txt(MANIFESTE)).empreintes).map((p) => [p, sha(join(root, p))]));

// 1. Non-régression B6 à B9
writeFileSync(join(tmp, 'capteur.mjs'), 'export function produire(cfg) { globalThis.__cfgCapture = cfg; }' + LF);
const R4_ARBITRE = { B6: 9, B7: 7, B8: 6, B9: 6 };
const R4_SOURCE = { B6: '§0 de B6 (« R4 à 9 sur 9 »)', B7: 'proposition retenue par l\'arbitrage de B7 (7 des 9)', B8: '§0 de B8 (« valeur arbitrée : 6 sens sur 7 »)', B9: '§0 de B9 (« R4 à 6 sur 10 »)' };
const nonreg = []; const cfgs = {};
for (const L of ['B6', 'B7', 'B8', 'B9']) {
  const srcScript = readFileSync(join(ici, 'audit-v1-lot3-' + L + '.mjs'), 'utf8');
  const imp = "import { produire } from './lot3-commun.mjs';";
  if (srcScript.split(imp).length !== 2) throw new Error(L + ' : import du module v1 introuvable');
  const copie = join(tmp, 'audit-' + L + '.mjs');
  writeFileSync(copie, srcScript.split(imp).join("import { produire } from '" + pathToFileURL(join(tmp, 'capteur.mjs')).href + "';"));
  globalThis.__cfgCapture = null;
  await import(pathToFileURL(copie).href);
  const cfg = globalThis.__cfgCapture; if (!cfg) throw new Error(L + ' : configuration non capturée');
  const res = produire({ ...cfg, root, nom: L, livraisons: [L], nonreg: true, signalement: true, sortie: join(tmp, L + '-v2.md'), arbitrage: null });
  cfgs[L] = cfg;
  // Tableau du §1 du rapport arbitré
  const arb = new Map([...txt(R + L + '.md').matchAll(/^\| \d+ \| `((?:hj_)?v_\d+_s\d+)` \| [^|]+ \| [^|]+ \| [^|]+ \| `([^`]+)` \| `([^`]+)` \| ([^|]+) \| [^|]+ \| \*\*([^*]+)\*\* \| ([^|]+) \|$/gm)].map((m) => [m[1], { categorie: m[2], type: m[3], fonctions: m[4].trim() === 'aucune' ? '' : m[4].trim().replace(/`/g, '').replace(/, /g, ','), verdict: m[5], correction: m[6].trim() }]));
  ok(arb.size === res.N, L + ' : ' + arb.size + ' lignes lues dans le rapport arbitré, ' + res.N + ' sens');
  const diffs = [];
  for (const f of res.fiches) { const a = arb.get(f.id); if (!a) { diffs.push(f.id + ' absent'); continue; } for (const k of ['verdict', 'categorie', 'type', 'fonctions', 'correction']) if (a[k] !== f[k]) diffs.push(f.id + ' ' + k + ' : ' + a[k] + ' / ' + f[k]); }
  ok(!diffs.length, L + ' : différences ' + diffs.join(' ; '));
  ok(res.sansDecType === R4_ARBITRE[L], L + ' : R4 ' + res.sansDecType + ', valeur arbitrée ' + R4_ARBITRE[L]);
  nonreg.push({ L, N: res.N, diffs, r4: res.sansDecType, manques: res.manques, mentions: res.fiches.filter((f) => f.mentions.length).map((f) => f.id + ' (' + f.mentions.join(', ') + ')'), citations: res.fiches.reduce((n, f) => n + f.citationsControlees, 0), attributions: res.fiches.flatMap((f) => f.attributions.map((a) => ({ id: f.id, a }))), tri: res.fiches.filter((f) => f.tri === 'complexe').map((f) => f.id) });
}

// 1 bis. Non-régression du générateur de périmètres sur les périmètres arbitrés de B8 et B9 (valeurs lues dans ces périmètres)
const nonregPer = [];
for (const L of ['B8', 'B9']) {
  const arbP = txt(R + L + '-perimetre.md');
  const lit = (re) => { const m = arbP.match(re); if (!m) throw new Error(L + ' : valeur introuvable dans le périmètre arbitré (' + re + ')'); return +m[1]; };
  const attendu = { cites: lit(/^\*\*4\.1 Les sens que les règles nomment\*\* \((\d+)\)/m), memes: lit(/^\*\*4\.2 [^(]*\((\d+),/m), autresLiv: lit(/^\*\*6\.1 Avec d'autres livraisons du lot 3\.\*\* (\d+) sens/m) };
  const decArb = new Map([...arbP.matchAll(/^\| `((?:hj_)?v_\d+)` \| [^|]+ \| ([^|]+) \|$/gm)].map((m) => [m[1], [...m[2].matchAll(/D\d{4}/g)].map((x) => x[0])]));
  const res = produirePerimetre({ root, nom: L, livraisons: [L], date: '2026-10-18', autorisation: 'essai de non-régression', nonreg: true, sortie: join(tmp, L + '-perimetre-v2.md') });
  const diffs = [];
  for (const k of ['cites', 'memes', 'autresLiv']) if (res[k] !== attendu[k]) diffs.push(k + ' : ' + attendu[k] + ' / ' + res[k]);
  for (const [eid, ds] of decArb) if (JSON.stringify(ds) !== JSON.stringify(res.decisions[eid] ?? null)) diffs.push('décisions de ' + eid + ' : ' + ds.join(',') + ' / ' + (res.decisions[eid] ?? []).join(','));
  if (decArb.size !== Object.keys(res.decisions).length) diffs.push('ENTRY : ' + decArb.size + ' / ' + Object.keys(res.decisions).length);
  ok(!diffs.length, 'périmètre ' + L + ' : différences ' + diffs.join(' ; '));
  nonregPer.push({ L, attendu, res, diffs });
}
sabotagesPre.push(['générateur de périmètres : écriture demandée sur le périmètre arbitré de B9', refuse(() => produirePerimetre({ root, nom: 'B9', livraisons: ['B9'], date: '2026-10-18', autorisation: 'essai', nonreg: true }), /protégé par le manifeste/)]);
sabotagesPre.push(['générateur de périmètres : tranche de sens déjà arbitrés hors du mode de non-régression', refuse(() => produirePerimetre({ root, nom: 'B9', livraisons: ['B9'], date: '2026-10-18', autorisation: 'essai', sortie: join(tmp, 'y.md') }), /hors des sens restants/)]);

// 2. Correspondance canonique
const { canon } = correspondance(root);
const publies = [...JSON.parse(txt('data/n5/vocab.json')), ...JSON.parse(txt('data/vocab-hors-jlpt.json'))].map((e) => e.id);
const sansSource = publies.filter((id) => !canon.has(id));
ok(!sansSource.length, 'ENTRY publiées sans entrée source canonique : ' + sansSource.join(', '));
ok(canon.get('v_718') === 'hj_v_1' && canon.get('v_719') === 'hj_v_2', 'v_718 et v_719 mal résolues');

// 3. Sabotages, dans des copies temporaires de docs/rapports (rapports du lot 3) et du manifeste
const copieRacine = (nomCopie) => {
  const r = join(tmp, nomCopie); mkdirSync(join(r, 'docs/rapports'), { recursive: true }); mkdirSync(join(r, 'a2-05-travail'), { recursive: true });
  for (const f of readdirSync(join(root, 'docs/rapports')).filter((f) => f.startsWith('etape2-A2-05-volet1-lot3-'))) copyFileSync(join(root, 'docs/rapports', f), join(r, 'docs/rapports', f));
  copyFileSync(join(root, MANIFESTE), join(r, MANIFESTE)); return r;
};
const sabotages = [...sabotagesPre];
{ const r = copieRacine('doublon'); const b9 = readFileSync(join(r, R + 'B9.md'), 'utf8'); const t = b9.match(/^#### `v_8_s1` .*$/m)[0]; const b8 = join(r, R + 'B8.md'); writeFileSync(b8, readFileSync(b8, 'utf8') + LF + t + LF);
  sabotages.push(['registre : un sens de B9 ajouté au rapport de B8', refuse(() => couverture(r), /plusieurs rapports/)]); }
{ const r = copieRacine('omission'); const p = join(r, R + 'B9.md'); writeFileSync(p, readFileSync(p, 'utf8').replace(/^#### `v_8_s1` /m, '#### `v_8_sX` '));
  sabotages.push(['registre : un titre de fiche supprimé du rapport de B9', refuse(() => couverture(r), /absents du rapport|absent du découpage/)]); }
{ const r = copieRacine('inconnu'); const p = join(r, R + 'B9.md'); writeFileSync(p, readFileSync(p, 'utf8') + LF + '#### `v_99999_s1` · essai' + LF);
  sabotages.push(['registre : un sens inconnu du découpage', refuse(() => couverture(r), /absent du découpage/)]); }
{ const r = copieRacine('empreinte'); const p = join(r, R + 'B6.md'); writeFileSync(p, readFileSync(p, 'utf8').replace('**Date**', '**Date** '));
  sabotages.push(['manifeste : un espace ajouté au rapport arbitré de B6', refuse(() => verifierEmpreintes(r), /empreinte modifiée/)]); }
{ const srcScript = readFileSync(join(ici, 'audit-v1-lot3-B9.mjs'), 'utf8'); const copie = join(tmp, 'audit-B9-protection.mjs');
  writeFileSync(copie, srcScript.split("import { produire } from './lot3-commun.mjs';").join("import { produire } from '" + pathToFileURL(join(tmp, 'capteur.mjs')).href + "';"));
  globalThis.__cfgCapture = null; await import(pathToFileURL(copie).href + '?p'); const cfg = globalThis.__cfgCapture;
  sabotages.push(['module v2 : écriture demandée sur le rapport arbitré de B9', refuse(() => produire({ ...cfg, root, nom: 'B9', livraisons: ['B9'], nonreg: true }), /protégé par le manifeste/)]);
  sabotages.push(['module v2 : livraison B9 traitée hors du mode de non-régression (sens déjà arbitrés)', refuse(() => produire({ ...cfg, root, nom: 'B9', livraisons: ['B9'], sortie: join(tmp, 'x.md') }), /déjà arbitré/)]); }
// Séparation des niveaux : sans option, le mode strict bloque un manque (B6 : counter) ; une attribution à vérifier ne bloque pas (B9)
sabotages.push(['module v2, mode par défaut (bloquant) : fiches de B6 sans `counter`', refuse(() => produire({ ...cfgs.B6, root, nom: 'B6', livraisons: ['B6'], nonreg: true, sortie: join(tmp, 'b6s.md'), arbitrage: null }), /contrôles des motivations/)]);
{ let r; try { produire({ ...cfgs.B9, root, nom: 'B9', livraisons: ['B9'], nonreg: true, sortie: join(tmp, 'b9s.md'), arbitrage: null }); r = 'non bloqué (attendu)'; } catch (e) { r = 'BLOQUÉ : ' + e.message.slice(0, 120); }
  ok(r === 'non bloqué (attendu)', 'B9 en mode bloquant : ' + r); sabotages.push(['module v2, mode par défaut (bloquant) : B9, deux attributions à vérifier, aucun manque', r]); }
for (const [n, r] of sabotages) if (n.includes('aucun manque')) continue; else ok(r.startsWith('refusé : '), 'sabotage non refusé comme attendu : ' + n + ' → ' + r);

// État d'arrivée : aucun rapport arbitré modifié
const emp1 = verifierEmpreintes(root); const cov1 = couverture(root);
const modifies = Object.entries(hashesAvant).filter(([p, h]) => sha(join(root, p)) !== h).map(([p]) => p);
ok(!modifies.length, 'rapports arbitrés modifiés par les essais : ' + modifies.join(', '));
ok(JSON.stringify(cov0.totaux) === JSON.stringify(cov1.totaux), 'couverture modifiée par les essais');

// Rapport
const P = [];
P.push('# Étape 2 · A2-05 · Volet 1 · Lot 3 — essais de l\'outillage v2 (proposition)', '');
P.push('**Date** : 2026-10-18');
P.push("**Statut** : **résultats d'essais, sans adoption.** Écrit par `a2-05-travail/essais-outillage-v2.mjs`. Les rapports arbitrés ne sont ni régénérés ni modifiés (empreintes contrôlées avant et après) ; toutes les sorties du module v2 sont écrites dans un dossier temporaire du système, supprimé à la fin ; les scripts des livraisons arbitrées ne sont pas exécutés (leurs configurations sont lues dans une copie temporaire où le module v1 est remplacé par un capteur).", '');
P.push('**Résultat d\'ensemble** : ' + (echecs.length ? '**' + echecs.length + ' échec(s)** : ' + echecs.join(' ; ') : '**tous les essais sont conformes à l\'attendu.**'), '');
P.push('## 1. Non-régression sur B6 à B9', '');
P.push('Pour chaque sens : verdict, catégorie, type, fonctions et correction produits par le module v2, comparés au tableau du §1 du rapport arbitré ; R4 comparé à la valeur arbitrée.', '', '| Livraison | Sens | Différences | R4 v2 | R4 arbitré (source) | Citations contrôlées | Mentions listées, non comptées | Cas complexes (tri) |', '|---|---|---|---|---|---|---|---|');
for (const x of nonreg) P.push('| ' + x.L + ' | ' + x.N + ' | ' + (x.diffs.length ? x.diffs.join(' ; ') : 'aucune') + ' | ' + x.r4 + ' | ' + R4_ARBITRE[x.L] + ' (' + R4_SOURCE[x.L] + ') | ' + x.citations + ' | ' + (x.mentions.length ? x.mentions.join(' ; ') : '—') + ' | ' + (x.tri.length ? x.tri.join(', ') : '—') + ' |');
P.push('', "**B8** : le module v1 affichait 5 sur 7, la valeur arbitrée est 6 sur 7 ; le module v2 donne **" + nonreg.find((x) => x.L === 'B8').r4 + "**, D1425 étant listée pour lecture et non comptée.", '');
P.push('## 1 bis. Non-régression du générateur de périmètres (B8, B9)', '', 'Valeurs lues dans les périmètres arbitrés, comparées à celles du générateur v2, écrit dans un dossier temporaire.', '', '| Périmètre | Sens nommés par les règles | Sens des mêmes catégories | Autres livraisons | Décisions par ENTRY | Risques détectés | Différences |', '|---|---|---|---|---|---|---|');
for (const x of nonregPer) P.push('| ' + x.L + ' | ' + x.attendu.cites + ' / ' + x.res.cites + ' | ' + x.attendu.memes + ' / ' + x.res.memes + ' | ' + x.attendu.autresLiv + ' / ' + x.res.autresLiv + ' | ' + Object.keys(x.res.decisions).length + ' ENTRY comparées | ' + x.res.risques + ' | ' + (x.diffs.length ? x.diffs.join(' ; ') : 'aucune') + ' |');
P.push('', "**Différence voulue, hors comparaison** : les « autres sens des mêmes ENTRY » ne comptent plus les sens de la même tranche (pour B9, les deux sens de 寝る se citaient l'un l'autre).", '');
P.push('## 2. Correspondance canonique', '', '- ENTRY publiées : ' + publies.length + ' ; avec une entrée source canonique : ' + (publies.length - sansSource.length) + ' ; sans : ' + (sansSource.length ? sansSource.join(', ') : 'aucune') + '.', '- `v_718` → `' + canon.get('v_718') + '` ; `v_719` → `' + canon.get('v_719') + '` (table de l\'assemblage, entrées validées non retirées, correspondance unique exigée).', '');
P.push('## 3. Sabotages', '', '| Sabotage (dans une copie temporaire) | Résultat |', '|---|---|');
for (const [n, r] of sabotages) P.push('| ' + n + ' | ' + r.replace(/\|/g, '/') + ' |');
P.push('', '## 4. Contrôles des motivations, en mode signalement', '');
P.push("Les fiches d'examen de B6 à B9 ont été écrites avant ces contrôles ; leurs manques ne sont pas des écarts et n'appellent aucune reprise : ils montrent ce que le mode strict exigerait des tranches futures.", '');
for (const x of nonreg) { P.push('**' + x.L + '** : ' + x.manques.length + ' manque(s), ' + x.attributions.length + ' attribution(s) à vérifier' + (x.manques.length + x.attributions.length ? ' :' : '.'), ''); for (const m of x.manques) P.push('- `' + m.id + '` : ' + m.m); for (const a of x.attributions) P.push('- `' + a.id + '` : ' + a.a + ' (attribution à vérifier, non comptée comme manque)'); if (x.manques.length + x.attributions.length) P.push(''); }
P.push('## 5. État avant et après', '', '| Contrôle | Avant | Après |', '|---|---|---|');
P.push('| Manifeste d\'empreintes | ' + emp0.controles + ' rapports identiques | ' + emp1.controles + ' rapports identiques |');
P.push('| Couverture | ' + cov0.totaux.arbitres + ' arbitrés, ' + cov0.totaux.restants + ' restants | ' + cov1.totaux.arbitres + ' arbitrés, ' + cov1.totaux.restants + ' restants |');
P.push('| Rapports arbitrés modifiés | — | ' + (modifies.length ? modifies.join(', ') : 'aucun') + ' |', '');
writeFileSync(join(root, 'docs/rapports/etape2-A2-05-outillage-essais.md'), P.join(LF) + LF);
rmSync(tmp, { recursive: true, force: true });
console.log('essais : ' + (echecs.length ? echecs.length + ' échec(s) : ' + echecs.join(' | ') : 'tous conformes') + ' ; R4 v2 : ' + nonreg.map((x) => x.L + '=' + x.r4).join(', ') + ' ; manques signalés : ' + nonreg.map((x) => x.L + '=' + x.manques.length).join(', '));
if (echecs.length) process.exitCode = 1;
