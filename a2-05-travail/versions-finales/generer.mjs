// A2-05 : versions finales proposées des quatre documents de l'étape 3 (relais allégé), et leurs différences exactes.
// Usage : node a2-05-travail/versions-finales/generer.mjs <racine du dépôt>
// N'écrit QUE dans a2-05-travail/versions-finales/ : les quatre documents réels ne sont ni lus en écriture ni modifiés.
// Sorties : <chemin réel> sous versions-finales/ (version finale), diffs/<nom>.diff (différence exacte), manifeste.json
// (empreinte SHA-256 de l'état de départ et de l'état final de chaque document, pour le contrôle d'avant application).
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { ajouterSectionBilan } from '../sync-stable.mjs';

const root = process.argv[2]; if (!root) throw new Error('argument attendu : racine du dépôt');
const OUT = join(root, 'a2-05-travail/versions-finales');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const sha = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const eol = (t) => (t.includes('\r\n') ? '\r\n' : '\n');
const enFins = (t, e) => (e === '\r\n' ? t.replace(/\r?\n/g, '\r\n') : t);
const refus = (m) => { throw new Error('refus : ' + m); };

const versions = {};
// 1. Relais : contenu du candidat, sa première ligne (commentaire « CANDIDAT ») retirée ; fins de ligne du relais en service
{
  const p = 'docs/relecture/reprise-A2-05.md', avant = lire(p);
  const cand = lire('a2-05-travail/reprise-A2-05-allegee-candidat.md').replace(/\r\n/g, '\n');
  if (!cand.startsWith('<!-- CANDIDAT, NON EN SERVICE')) refus('première ligne du candidat inattendue');
  versions[p] = { avant, apres: enFins(cand.slice(cand.indexOf('\n') + 1), eol(avant)) };
}
// 2. CLAUDE.md : remplacement ciblé de la seule mention d'état du §5
{
  const p = 'CLAUDE.md', avant = lire(p), e = eol(avant);
  const a = '`ocha-v2` et `origin/ocha-v2` sont à `558f150`' + e + '  (checkpoint documentaire du 2026-10-12, committé et poussé)';
  const b = '`ocha-v2` et `origin/ocha-v2` sont à `7803163`' + e + '  (checkpoint B du 2026-10-18, committé et poussé)';
  if (avant.split(a).length !== 2) refus('CLAUDE.md : occurrence non unique');
  versions[p] = { avant, apres: avant.replace(a, () => b) };
}
// 3. note-relais.md : gel par un paragraphe ajouté en tête ; le reste inchangé
{
  const p = 'docs/relecture/note-relais.md', avant = lire(p), e = eol(avant);
  const gel = "**Note gelée** (décision D6, arbitrage du 2026-10-20) : elle n'est plus mise à jour depuis le 2026-10-12 et ne décrit plus l'état du projet ; son historique est conservé tel quel ci-dessous. Le relais de reprise en service est `docs/relecture/reprise-A2-05.md` ; chaque export d'A2-05 porte sa propre note (`--note`). `tools/export-relecture.mjs` reprend encore cette note par défaut quand `--note` est omis : ne pas l'omettre.";
  if (avant.includes('**Note gelée**')) refus('note-relais.md déjà gelée');
  versions[p] = { avant, apres: gel + e + e + avant };
}
// 4. Bilan du volet 2 : sous-section §8.66 ajoutée à la fin, par la fonction contrôlée de sync-stable.mjs
{
  const p = 'docs/rapports/etape2-A2-05-bilan-volet2.md', avant = lire(p);
  const corps = lire('a2-05-travail/versions-finales/bilan-8-66-corps.md').replace(/\r\n/g, '\n').replace(/\s+$/, '');
  versions[p] = { avant, apres: ajouterSectionBilan(avant, 66, 'Arbitrage du relais allégé ; doctrines du volet 2 consolidées (2026-10-20)', corps) };
}

// Les formulations du §8.66 doivent être celles du §6 de l'ancien relais, mot pour mot
const ancien = spawnSync('git', ['show', '78031638:docs/relecture/reprise-A2-05.md'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout.replace(/\r\n/g, '\n');
const s6 = ancien.slice(ancien.indexOf('## 6. Arbitrages de fond'), ancien.indexOf('## 6 bis.'));
const citations = [...lire('a2-05-travail/versions-finales/bilan-8-66-corps.md').matchAll(/^\d\. « (.+?) » — Provenance/gm)].map((m) => m[1]);
const absentes = citations.filter((q) => !s6.includes(q));
if (citations.length !== 7 || absentes.length) refus('formulations du §8.66 non retrouvées mot pour mot dans le §6 de l\'ancien relais : ' + absentes.join(' | '));

// Écriture des versions finales, des différences et du manifeste (dans versions-finales/ seulement)
const manifeste = { genere_par: 'a2-05-travail/versions-finales/generer.mjs', date: '2026-10-20', statut: 'proposition, non appliquée', documents: {} };
const d = mkdtempSync(join(tmpdir(), 'vf-'));
try {
  for (const [p, { avant, apres }] of Object.entries(versions)) {
    mkdirSync(dirname(join(OUT, p)), { recursive: true }); writeFileSync(join(OUT, p), apres);
    writeFileSync(join(d, 'a'), avant.replace(/\r\n/g, '\n')); writeFileSync(join(d, 'b'), apres.replace(/\r\n/g, '\n'));
    const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U2', 'a', 'b'], { cwd: d, encoding: 'utf8', maxBuffer: 1 << 28 });
    if (r.status !== 1) refus(p + ' : git diff code ' + r.status);
    const diff = r.stdout.replace(/^diff --git a\/a b\/b\n(?:index [^\n]*\n)?--- a\/a\n\+\+\+ b\/b\n/, '--- a/' + p + '\n+++ b/' + p + '\n');
    const nom = p.replace(/\//g, '__') + '.diff'; mkdirSync(join(OUT, 'diffs'), { recursive: true }); writeFileSync(join(OUT, 'diffs', nom), diff);
    const plus = diff.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++')).length, moins = diff.split('\n').filter((l) => l.startsWith('-') && !l.startsWith('---')).length;
    manifeste.documents[p] = { depart_sha256: sha(avant), final_sha256: sha(apres), octets_depart: Buffer.byteLength(avant), octets_final: Buffer.byteLength(apres), fins_de_ligne: eol(avant) === '\r\n' ? 'CRLF' : 'LF', lignes_ajoutees: plus, lignes_retirees: moins, diff: 'a2-05-travail/versions-finales/diffs/' + nom };
    console.log(p.padEnd(46) + ' +' + plus + ' -' + moins + '  ' + Buffer.byteLength(avant) + ' → ' + Buffer.byteLength(apres) + ' octets');
  }
} finally { rmSync(d, { recursive: true, force: true }); }
writeFileSync(join(OUT, 'manifeste.json'), JSON.stringify(manifeste, null, 1) + '\n');
console.log('formulations du §8.66 retrouvées mot pour mot : ' + citations.length + ' sur 7 ; manifeste écrit');
