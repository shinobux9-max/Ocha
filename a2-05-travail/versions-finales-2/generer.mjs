// A2-05 : versions figées 2 du relais de reprise, après l'adoption d'A10. PROPOSITION : n'écrit que dans a2-05-travail/versions-finales-2/.
// La version 1 (a2-05-travail/versions-finales/) n'est ni lue en écriture ni modifiée ; ce manifeste cite l'empreinte du sien, pour que toute réécriture de la v1 se voie.
// Départ : le relais en service, copié tel quel (version finale 1, à sa ligne « Git » près). Final : cinq remplacements ciblés, chacun d'occurrence unique.
// Le statut d'E5 est tiré de `docs/conception/` (A10 présent, au sommaire, validé à une date), jamais d'un argument.
// Usage : node a2-05-travail/versions-finales-2/generer.mjs <racine du dépôt>
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const V2 = 'a2-05-travail/versions-finales-2', OUT = join(root, V2), REL = 'docs/relecture/reprise-A2-05.md', MAN1 = 'a2-05-travail/versions-finales/manifeste.json', A10 = 'docs/conception/addendum-A10-interrogatif.md';
const lire = (p) => readFileSync(join(root, p), 'utf8');
const sha = (s) => createHash('sha256').update(s).digest('hex');
const refus = (m) => { throw new Error('refus : ' + m); };

if (existsSync(join(OUT, 'manifeste.json'))) refus('versions figées 2 déjà générées');
const date = (lire(A10).match(/^\*\*Statut\*\* : 🔒 validé le (\d{4}-\d{2}-\d{2}) /m) ?? [])[1];
if (!date || !/^\| A10 \| `addendum-A10-interrogatif\.md` \|/m.test(lire('docs/conception/00-sommaire.md'))) refus('A10 absent, non validé ou absent du sommaire');
const avant = lire(REL); if (avant.includes('\r')) refus('relais en service : fins de ligne LF attendues');
const man1 = JSON.parse(lire(MAN1)).documents[REL];
const fin1 = lire('a2-05-travail/versions-finales/' + REL);
if (sha(fin1) !== man1.final_sha256) refus('version finale 1 non conforme à son manifeste');
const l0 = avant.split('\n'), l1 = fin1.split('\n'), d = l0.map((x, i) => (x !== l1[i] ? i : -1)).filter((i) => i >= 0);
if (l0.length !== l1.length || d.length > 1 || (d.length === 1 && !l1[d[0]].startsWith('- **Git** :'))) refus('relais en service : il doit être la version finale 1, à sa seule ligne « Git » près');

const R = [
  ['**Rédigé** : 2026-10-20 (arbitrage des décisions D1 à D6).',
    "**Rédigé** : 2026-10-20 (arbitrage des décisions D1 à D6) ; **révisé** pour l'adoption d'A10 (versions figées 2 : `a2-05-travail/versions-finales-2/manifeste.json`)."],
  ['**Proposé, non adopté** : l\'addendum E5.',
    '**Proposé, non adopté** : aucun addendum. **Adopté** : l\'addendum A10 sur `interrogatif`, issu de la proposition E5, validé et installé le ' + date + ' (`docs/conception/addendum-A10-interrogatif.md`).'],
  ['`docs/conception/addendum-A1-…` à `addendum-A9-…` ; le plus souvent en cause : A5 (`category: null`), A6 (`semantic_type: null`), A7 (`deictique`), A9 (fonctions)',
    '`docs/conception/addendum-A1-…` à `addendum-A10-…` ; le plus souvent en cause : A5 (`category: null`), A6 (`semantic_type: null`), A7 (`deictique`), A9 (fonctions), A10 (`interrogatif`, bloc F)'],
  ["; la proposition d'addendum E5 sur `interrogatif` (`docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md`), **ni adoptée ni normative** ; ce relais",
    "; la proposition d'addendum E5 sur `interrogatif` (`docs/rapports/etape2-A2-05-prealable-E5-proposition-addendum.md`), document historique : seul A10, adopté le " + date + ', fait foi ; ce relais'],
  ['le bloc F et E5, le balayage global des relations',
    "le bloc F (A10 adopté ; ni examen ni recherche d'omissions avant l'accord sur un périmètre opérationnel), le balayage global des relations"],
];
let apres = avant;
for (const [a, b] of R) { if (apres.split(a).length !== 2) refus('ancre non unique ou absente : ' + a.slice(0, 60)); apres = apres.replace(a, () => b); }
if (/ni adoptée ni normative/.test(apres)) refus('formule ancienne restante');

const t = mkdtempSync(join(tmpdir(), 'vf2-'));
let diff;
try {
  writeFileSync(join(t, 'a'), avant); writeFileSync(join(t, 'b'), apres);
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U2', 'a', 'b'], { cwd: t, encoding: 'utf8', maxBuffer: 1 << 28 });
  if (r.status !== 1) refus('git diff code ' + r.status);
  diff = r.stdout.replace(/^diff --git a\/a b\/b\n(?:index [^\n]*\n)?--- a\/a\n\+\+\+ b\/b\n/, '--- a/' + REL + '\n+++ b/' + REL + '\n');
} finally { rmSync(t, { recursive: true, force: true }); }
const nom = REL.replace(/\//g, '__') + '.diff';
for (const [p, x] of [['depart/' + REL, avant], [REL, apres], ['diffs/' + nom, diff]]) { mkdirSync(dirname(join(OUT, p)), { recursive: true }); writeFileSync(join(OUT, p), x); }
const plus = diff.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++')).length, moins = diff.split('\n').filter((l) => l.startsWith('-') && !l.startsWith('---')).length;
const manifeste = { genere_par: V2 + '/generer.mjs', version: 2, statut: 'proposition, non appliquée', motif: 'adoption d\'A10 le ' + date,
  precede: { manifeste: MAN1, sha256: sha(readFileSync(join(root, MAN1))) },
  documents: { [REL]: { depart_sha256: sha(avant), final_sha256: sha(apres), octets_depart: Buffer.byteLength(avant), octets_final: Buffer.byteLength(apres), fins_de_ligne: 'LF', lignes_ajoutees: plus, lignes_retirees: moins, diff: V2 + '/diffs/' + nom } } };
writeFileSync(join(OUT, 'manifeste.json'), JSON.stringify(manifeste, null, 1) + '\n');
console.log(REL + ' +' + plus + ' -' + moins + ' ; ' + Buffer.byteLength(avant) + ' → ' + Buffer.byteLength(apres) + ' octets ; A10 du ' + date + ' ; manifeste écrit');
