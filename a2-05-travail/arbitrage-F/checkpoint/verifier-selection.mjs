// A2-05 : vérification de la sélection de checkpoint, EN LECTURE SEULE sur git : identité des scripts rétablis, absence d'artefacts, exhaustivité et disjonction des listes.
// Usage : node a2-05-travail/arbitrage-F/checkpoint/verifier-selection.mjs <racine du dépôt>
// Compare chemins-inclus.txt à la liste acceptée, figée dans chemins-inclus-344.txt ; tout chemin nouveau y est nommé. Écrit selection-27-scripts.txt et sortie-verification-selection.txt. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-F/checkpoint/', INV = 'a2-05-travail/INVENTAIRE-SCRIPTS.md';
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); }; const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const L = (t) => t.split('\n').map((x) => x.trim()).filter(Boolean);
const lire = (p) => L(readFileSync(join(root, p), 'utf8'));
const git = (...a) => L(spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 30 }).stdout ?? '');
const inclus = lire(OUT + 'chemins-inclus.txt'), exclus = lire(OUT + 'chemins-exclus.txt'), accepte = lire(OUT + 'chemins-inclus-344.txt');

// Identité des scripts rétablis : ceux que l'ancienne règle excluait à tort
const ANCIENNE = /^a2-05-travail\/arbitrage-[^/]+\/.+\/(?![^/]*\.mjs$)/;
const retablis = accepte.filter((p) => ANCIENNE.test(p)); const texteInv = readFileSync(join(root, INV), 'utf8');
const inscrit = (p) => texteInv.includes('`' + p.replace('a2-05-travail/', '') + '`');
ok(accepte.length === 344, 'liste acceptée : 344 fichiers', accepte.length + '');
ok(retablis.length === 27 && retablis.every((p) => p.endsWith('.mjs')), '27 chemins rétablis, tous des scripts `.mjs`', retablis.length + '');
ok(retablis.every((p) => !/\/(depart|sorties?|diffs|diffs-reels|apercu-B2)\//.test(p)), 'aucun script rétabli dans une sauvegarde ou une trace');
const nonInscrits = retablis.filter((p) => !inscrit(p)); dire('constat  inscrits à l\'inventaire : ' + (retablis.length - nonInscrits.length) + ' sur ' + retablis.length + ' ; non inscrits : ' + (nonInscrits.join(', ') || 'aucun'));
writeFileSync(join(root, OUT, 'selection-27-scripts.txt'), retablis.map((p) => p + (inscrit(p) ? '' : '\tnon inscrit')).join('\n') + '\n');

// Aucun artefact parmi les inclus
const ARTEFACTS = /(^|\/)(depart|sorties?|diffs|diffs-reels|apercu-B2)\/|\.zip$|^chatgpt-relecture\/|(^|\/)note-export[^/]*$|(^|\/)sync-stable-apercu\.md$|\.(tmp|bak|orig|log)$|~$/;
const trouves = inclus.filter((p) => ARTEFACTS.test(p) && !p.startsWith('a2-05-travail/versions-finales/')); ok(!trouves.length, 'aucune sauvegarde, trace, archive, note ou fichier temporaire parmi les inclus, hors `versions-finales/`, exception en service', trouves.slice(0, 5).join(', ') || inclus.length + ' fichiers');
const ext = new Map(); for (const p of inclus) { const e = p.includes('.') ? p.slice(p.lastIndexOf('.')) : '(sans)'; ext.set(e, (ext.get(e) ?? 0) + 1); } dire('constat  extensions des inclus : ' + [...ext].sort().map(([e, n]) => e + ' ' + n).join(', '));
const scripts = exclus.filter((p) => p.endsWith('.mjs') && !p.includes('/depart/')); ok(!scripts.length, 'aucun script exclu, hors sauvegardes de départ', scripts.join(', ') || (exclus.filter((p) => p.endsWith('.mjs')).length + ' scripts de sauvegarde'));

// Exhaustivité et disjonction
const modifies = git('diff', '--name-only'), nonSuivis = git('ls-files', '--others', '--exclude-standard'); const univers = new Set([...modifies, ...nonSuivis]), I = new Set(inclus), E = new Set(exclus);
const hors = [...I, ...E].filter((p) => !univers.has(p)), oublies = [...univers].filter((p) => !I.has(p) && !E.has(p)), double = inclus.filter((p) => E.has(p));
ok(!double.length, 'listes disjointes', double.join(', ') || inclus.length + ' + ' + exclus.length);
ok(!hors.length && !oublies.length, 'listes exhaustives : suivis modifiés et non suivis, chacun dans une liste et une seule', (hors.concat(oublies).slice(0, 8).join(', ')) || univers.size + ' chemins');
ok(modifies.every((p) => I.has(p)), 'tous les fichiers suivis modifiés sont inclus', modifies.length + '');
ok(!git('diff', '--cached', '--name-only').length, 'index vide');
ok(inclus.every((p) => existsSync(join(root, p))), 'tous les inclus existent');

// Écart à la liste acceptée
const A = new Set(accepte); const ajoutes = inclus.filter((p) => !A.has(p)), retires = accepte.filter((p) => !I.has(p));
dire('constat  depuis la liste acceptée : ' + ajoutes.length + ' ajouté(s), ' + retires.length + ' retiré(s)'); for (const p of ajoutes) dire('   + ' + p); for (const p of retires) dire('   - ' + p);
ok(ajoutes.every((p) => /\.mjs$|^docs\/rapports\//.test(p)), 'tout ajout est un script ou un rapport');
dire(ko ? ko + ' écart(s)' : 'sélection conforme');
writeFileSync(join(root, OUT, 'sortie-verification-selection.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
