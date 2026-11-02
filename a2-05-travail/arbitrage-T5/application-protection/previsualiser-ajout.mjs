// Prévisualisation, en mémoire, de `empreintes-lot3.mjs --ajouter` : même calcul que l'outil, rien n'est écrit dans le dépôt.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
const root = resolve(process.argv[2]), out = process.argv[3];
const E = await import(pathToFileURL(join(root, 'a2-05-travail/empreintes-lot3.mjs')).href);
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
const brut = readFileSync(join(root, E.MANIFESTE), 'utf8'); const m = JSON.parse(brut);
console.log('format actuel = JSON.stringify(m, null, 1) : ' + (JSON.stringify(m, null, 1) + '\n' === brut));
const cles = Object.keys(m.empreintes); const diff = cles.filter((p) => sha(p) !== m.empreintes[p]);
console.log('empreintes existantes : ' + cles.length + ' ; différentes : ' + (diff.join(', ') || 'aucune'));
const { nouveaux } = E.verifierEmpreintes(root); console.log('rapports arbitrés hors du manifeste : ' + JSON.stringify(nouveaux));
const avant = new Set(cles); console.log('anomalies du manifeste existant : ' + JSON.stringify(E.anomaliesTranches(root, m, avant, brut)));
for (const p of nouveaux) m.empreintes[p] = sha(p);
m.ajouts = [...(m.ajouts ?? []), { date: new Date().toISOString().slice(0, 10), chemins: nouveaux }];
console.log('anomalies après ajout simulé : ' + JSON.stringify(E.anomaliesTranches(root, m, avant, null)));
console.log('ajouts : ' + m.ajouts.map((a) => a.date + ' [' + a.chemins.length + ']').join(', '));
writeFileSync(out, JSON.stringify(m, null, 1) + '\n'); console.log('aperçu écrit hors dépôt : ' + out);
