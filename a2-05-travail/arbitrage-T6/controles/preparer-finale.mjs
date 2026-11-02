// A2-05 · volet 1 · lot 3 : version finale proposée des trois contrôles adaptés à la 38e entrée, EN PROPOSITION. Rien n'est installé.
// Part de la variante renforcée retenue par l'arbitrage du 2026-10-27 (arbitrage-T6/controles/renfort/, empreintes vérifiées) et n'y ajoute
// qu'une chose, dans le contrôle du bilan du pilote : lorsqu'un des quatre documents de T5 attendus manque (périmètre accepté, rapport arbitré,
// leurs propositions sauvegardées), un écart explicite est produit au lieu d'une exception, et les contrôles de T5 qui en dépendent passent en
// écart. Documents présents : comportement inchangé. Les recalculs de T5 et de T6 sont repris de la variante renforcée, sans changement.
// Usage : node a2-05-travail/arbitrage-T6/controles/preparer-finale.mjs <racine du dépôt>   (écrit arbitrage-T6/controles/finale/ ; refus s'il existe)
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const SRC = 'a2-05-travail/arbitrage-T6/controles/renfort', OUT = 'a2-05-travail/arbitrage-T6/controles/finale';
const RENFORT = { 'controle-bilan-pilote.mjs': '984f31f4c9f7', 'recalcul-T5-perimetre.mjs': '44b49ef9b658', 'recalcul-T6-perimetre.mjs': '614f6b64b71e' };
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
if (existsSync(join(root, OUT))) throw new Error(OUT + ' existe déjà');
for (const [n, h] of Object.entries(RENFORT)) if (!sha(join(root, SRC, n)).startsWith(h)) throw new Error(n + ' : variante renforcée modifiée');
const remplacer = (t, ancre, nouveau) => { if (t.split(ancre).length !== 2) throw new Error('ancre absente ou multiple : ' + ancre.slice(0, 90)); return t.replace(ancre, () => nouveau); };

let cbp = readFileSync(join(root, SRC, 'controle-bilan-pilote.mjs'), 'utf8');
cbp = remplacer(cbp, "// toujours la condition du pilote.\n// Code 1 au premier écart.\n",
  "// toujours la condition du pilote. Si un des quatre documents de T5 attendus manque (périmètre accepté, rapport arbitré, leurs propositions\n// sauvegardées), un écart explicite le dit et les contrôles de T5 qui en dépendent sont en écart, sans exception. Code 1 au premier écart.\n");
cbp = remplacer(cbp, "// 38e entrée (38 empreintes), préparée le 2026-10-27, appliquée seulement sur autorisation distincte.\n",
  "// 38e entrée (38 empreintes), avec l'empreinte fixée du périmètre accepté de T6 et l'écart explicite pour un document de T5 manquant, préparée\n// le 2026-10-27, appliquée seulement sur autorisation distincte.\n");
const A_SHA = "const sha = (p) => createHash('sha256').update(brut(p)).digest('hex');\n";
cbp = remplacer(cbp, A_SHA, A_SHA + [
  "// Documents de T5 attendus : leur absence est relevée ici, puis signalée par un écart explicite (section de T5) au lieu d'une exception",
  "const T5_ATTENDUS = [R + 'T5-perimetre.md', 'a2-05-travail/arbitrage-T5/proposition-T5-perimetre.md', R + 'T5.md', 'a2-05-travail/arbitrage-T5/proposition-T5.md'];",
  "const absents5 = T5_ATTENDUS.filter((p) => !existsSync(join(root, p))); const lire5 = (p) => (absents5.includes(p) ? '' : txt(p));",
  '',
].join('\n'));
cbp = remplacer(cbp, "const inscrit = (doc, prop, empreinte, statut, n0) => {\n",
  "const inscrit = (doc, prop, empreinte, statut, n0) => {\n  const manque = [doc, prop].filter((p) => absents5.includes(p)); if (manque.length) return { ok: false, detail: 'document absent : ' + manque.join(', ') };\n");
cbp = remplacer(cbp, "const P5 = R + 'T5-perimetre.md', p5 = txt(P5), PROP5 = 'a2-05-travail/arbitrage-T5/proposition-T5-perimetre.md', prop5 = txt(PROP5);\n",
  "ctl(!absents5.length, 'T5 : documents attendus présents (périmètre accepté, rapport arbitré et leurs propositions sauvegardées)', absents5.length ? 'absents : ' + absents5.join(', ') : T5_ATTENDUS.length + ' présents');\n" +
  "const P5 = R + 'T5-perimetre.md', p5 = lire5(P5), PROP5 = 'a2-05-travail/arbitrage-T5/proposition-T5-perimetre.md', prop5 = lire5(PROP5);\n");
cbp = remplacer(cbp, "ctl(man[P5] === sha(P5), 'T5 : périmètre accepté protégé au manifeste, empreinte identique', man[P5] ? sha(P5).slice(0, 12) + '…' : 'absent du manifeste');\n",
  "ctl(!absents5.includes(P5) && man[P5] === sha(P5), 'T5 : périmètre accepté protégé au manifeste, empreinte identique', absents5.includes(P5) ? 'fichier absent' : man[P5] ? sha(P5).slice(0, 12) + '…' : 'absent du manifeste');\n");
cbp = remplacer(cbp, "const T5R = R + 'T5.md', t5r = txt(T5R), PROPT5 = 'a2-05-travail/arbitrage-T5/proposition-T5.md';\n",
  "const T5R = R + 'T5.md', t5r = lire5(T5R), PROPT5 = 'a2-05-travail/arbitrage-T5/proposition-T5.md';\n");
cbp = remplacer(cbp, "ctl(man[T5R] === sha(T5R), 'T5 : rapport arbitré protégé au manifeste, empreinte identique', man[T5R] ? sha(T5R).slice(0, 12) + '…' : 'absent du manifeste');\n",
  "ctl(!absents5.includes(T5R) && man[T5R] === sha(T5R), 'T5 : rapport arbitré protégé au manifeste, empreinte identique', absents5.includes(T5R) ? 'fichier absent' : man[T5R] ? sha(T5R).slice(0, 12) + '…' : 'absent du manifeste');\n");

mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
writeFileSync(join(root, OUT, 'controle-bilan-pilote.mjs'), cbp);
for (const n of ['recalcul-T5-perimetre.mjs', 'recalcul-T6-perimetre.mjs']) copyFileSync(join(root, SRC, n), join(root, OUT, n));
const diff = (a, b) => spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', a, b], { cwd: root, encoding: 'utf8' });
for (const n of Object.keys(RENFORT)) {
  const c = spawnSync(process.execPath, ['--check', join(root, OUT, n)], { encoding: 'utf8' });
  const enService = diff('a2-05-travail/' + n, OUT + '/' + n); writeFileSync(join(root, OUT, 'diffs', n + '.en-service.diff'), enService.stdout);
  const depuisRenfort = diff(SRC + '/' + n, OUT + '/' + n); writeFileSync(join(root, OUT, 'diffs', n + '.depuis-renfort.diff'), depuisRenfort.stdout);
  const compte = (d) => { const l = d.split('\n'); return '+' + l.filter((x) => x.startsWith('+') && !x.startsWith('+++')).length + ' / -' + l.filter((x) => x.startsWith('-') && !x.startsWith('---')).length; };
  console.log(n + ' : node --check code ' + c.status + ' ; ' + sha(join(root, OUT, n)).slice(0, 12) + '… ; diff avec le script en service ' + compte(enService.stdout) + ' ; diff avec la variante renforcée ' + compte(depuisRenfort.stdout));
}
