// A2-05 · bloc F : assemble la note d'export de la préparation de la première mesure de couverture. Lecture seule hors de la note ; refuse d'écraser une note
// existante. En-tête ; script ; modèle de rapport rempli sur données synthétiques et mesure synthétique ; sortie de l'essai ; source de l'essai ; omissions.mjs.
// Usage : node a2-05-travail/arbitrage-F/mesure-couverture/assembler-note.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const I = 'a2-05-travail/arbitrage-F/mesure-couverture/', SORTIE = 'a2-05-travail/note-export-lot3-F-mesure-couverture.md';
if (existsSync(join(root, SORTIE))) throw new Error(SORTIE + ' existe déjà');
const brut = (p) => readFileSync(join(root, p)); const txt = (p) => brut(p).toString('utf8').replace(/\r\n/g, '\n').trimEnd();
const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');
const clot = (t, lang) => { const f = '`'.repeat(Math.max(3, ...[...t.matchAll(/`{3,}/g)].map((x) => x[0].length + 1))); return f + lang + '\n' + t + '\n' + f; };
const MOD = 'a2-05-travail/perimetre-F-operationnel/omissions.mjs';
if (sha(MOD) !== '2b89abd92699e0dffb480c2224f0a66595ddc2fb6d114df68ea781c9b400ac8d') throw new Error('omissions.mjs modifié');
if (!/\nessai conforme$/.test(txt(I + 'traces/sortie-essai-mesure.txt'))) throw new Error('sortie de l\'essai non conforme');
const titre = (p, s = '') => '### `' + p + '` — SHA-256 `' + sha(p) + '`' + s;
const doc = [txt(I + 'note-export-entete.md'), '',
  '# Partie 1 · Script d\'exécution encadrée (non lancé sur les données réelles)', '', titre(I + 'mesurer-couverture.mjs'), '', clot(txt(I + 'mesurer-couverture.mjs'), 'js'), '',
  '# Partie 2 · Modèle de rapport, rempli sur données synthétiques (sans valeur de mesure)', '', 'Écrit par `mesurer-couverture.mjs` sur la copie jetable, à partir des seules données synthétiques injectées par l\'essai ; recopié tel quel.', '',
  titre(I + 'traces/exemple-rapport-synthetique.md'), '', clot(txt(I + 'traces/exemple-rapport-synthetique.md'), 'markdown'), '',
  titre(I + 'traces/exemple-mesure-synthetique.json'), '', clot(txt(I + 'traces/exemple-mesure-synthetique.json'), 'json'), '',
  '# Partie 3 · Sortie complète de l\'essai (code 0)', '', titre(I + 'traces/sortie-essai-mesure.txt'), '', clot(txt(I + 'traces/sortie-essai-mesure.txt'), 'text'), '',
  '# Partie 4 · Source de l\'essai', '', titre(I + 'essayer-mesure.mjs'), '', clot(txt(I + 'essayer-mesure.mjs'), 'js'), '',
  '# Partie 5 · Module de filtrage, inchangé (référence)', '', titre(MOD, ' — non modifié'), '', clot(txt(MOD), 'js'), ''];
writeFileSync(join(root, SORTIE), doc.join('\n') + '\n', 'utf8');
console.log(SORTIE + ' : ' + Buffer.byteLength(doc.join('\n')) + ' octets');
