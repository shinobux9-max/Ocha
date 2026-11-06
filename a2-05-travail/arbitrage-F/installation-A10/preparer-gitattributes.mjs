// A2-05 : préparation, sans application, de la règle `.gitattributes` propre à A10 (option 2 arbitrée). N'écrit que dans proposition/ ; `.gitattributes` n'est pas modifié.
// Une ligne, à sa place dans la liste triée : après `/docs/conception/00-sommaire.md`, avant la règle d'A9. La version relue ne s'appelle pas `.gitattributes`, pour ne jamais agir sur son dossier.
// Usage : node a2-05-travail/arbitrage-F/installation-A10/preparer-gitattributes.mjs <racine du dépôt>. Refus si la version existe déjà. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { diffBrut } from '../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-F/installation-A10/', PR = OUT + 'proposition/', GA = '.gitattributes', NOM = 'gitattributes-propose.txt', V = PR + NOM, DIFF = PR + 'diffs/' + NOM + '.diff';
const DEPART = 'da81234cda245291b3c2f3976e15754127c8723752053f4fa4aa03a649de9773', REGLE = '/docs/conception/addendum-A10-interrogatif.md text eol=crlf', SUIVANTE = '/docs/conception/addendum-A9-fonctions-linguistiques.md text eol=crlf', PRECEDENTE = '/docs/conception/00-sommaire.md text eol=crlf';
const sha = (b) => createHash('sha256').update(b).digest('hex'); const lignes = [];
const ok = (b, l, d) => { const m = (b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : ''); console.log(m); lignes.push(m); if (!b) { console.log('ARRÊT avant écriture'); process.exit(1); } };

ok(!existsSync(join(root, V)) && !existsSync(join(root, DIFF)), 'P1 version et diff absents, préparation jamais lancée');
const o = readFileSync(join(root, GA)); const t = o.toString('utf8'); ok(sha(o) === DEPART, 'P2 empreinte de départ', DEPART);
ok(!t.includes('\r') && t.endsWith('\n'), 'P3 `.gitattributes` en LF');
ok(!/addendum-a1\d/i.test(t), 'P4 aucune règle A10');
const L = t.split('\n'); const i = L.indexOf(SUIVANTE); ok(i > 0 && L[i - 1] === PRECEDENTE && L.filter((l) => l === SUIVANTE).length === 1, 'P5 ancre unique, juste après le sommaire');
const n = [...L.slice(0, i), REGLE, ...L.slice(i)].join('\n');
ok(n.split('\n').length === L.length + 1 && n.replace(REGLE + '\n', '') === t, 'V1 une seule ligne ajoutée');
const av = L.filter((l) => /^\/docs\/conception\//.test(l)); const ap = n.split('\n').filter((l) => /^\/docs\/conception\//.test(l)); ok(ap.length === av.length + 1 && JSON.stringify([...ap].sort()) === JSON.stringify(ap), 'V2 liste de `docs/conception` toujours triée');
ok(n.indexOf('/docs/** -text') < n.indexOf(REGLE), 'V3 règle après `/docs/** -text`, donc prioritaire');
writeFileSync(join(root, V), n); const r = diffBrut(root, GA, V); ok(r.status === 1 && !r.stdout.includes('\r'), 'V4 diff ciblé, sans CR'); writeFileSync(join(root, DIFF), r.stdout);
const ajouts = r.stdout.split('\n').filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l)); ok(ajouts.length === 1 && ajouts[0] === '+' + REGLE, 'V5 diff : `+` de la seule règle', ajouts[0]);
lignes.push('', '| Fichier | Départ | Proposé | Diff |', '|---|---|---|---|', '| `.gitattributes` | `' + DEPART + '` | `' + sha(Buffer.from(n, 'utf8')) + '` | `' + sha(r.stdout) + '` |');
writeFileSync(join(root, OUT, 'sortie-preparation-gitattributes.txt'), lignes.join('\n') + '\n'); console.log(lignes.slice(-1)[0]); console.log('préparation de la règle conforme');
