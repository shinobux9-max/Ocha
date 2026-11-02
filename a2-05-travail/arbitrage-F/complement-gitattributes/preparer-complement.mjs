// A2-05 : préparation de la règle complémentaire `/REGLES-CONSTRUCTION.md -text`, EN PROPOSITION : le `.gitattributes` réel n'est pas modifié.
// Vérifie le chemin et les octets ; écrit la version proposée et son diff ; mesure sur clones jetables l'effet de la règle sous core.autocrlf=true et false.
// Usage : node a2-05-travail/arbitrage-F/complement-gitattributes/preparer-complement.mjs <racine du dépôt>
// Refus si diffs/ existe. Code 1 au premier écart constaté en fin de lecture.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, copyFileSync, rmSync, utimesSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { diffBrut } from '../moteur-application.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-F/complement-gitattributes/', GA = '.gitattributes', RC = 'REGLES-CONSTRUCTION.md', LEGACY = 'docs/legacy/REGLES-CONSTRUCTION.md', V = 'gitattributes-propose.txt';
const GA_SHA = '8efbae1ef267cd5047dd7008b83cfbb7260b8329370009dd540daf5a4023e000', RC_SHA = 'de46103a472864662424613ba2028d5bed6ecfb7ce16ff95e2a37edd4530f509', RC_BLOB = '39f100a1c6246f9b475cd519f92b9ad8a9b75255';
const ANCRE = '/ROADMAP.md text eol=crlf\n', REGLE = '/REGLES-CONSTRUCTION.md -text\n';
const sha = (b) => createHash('sha256').update(b).digest('hex');
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
let ko = 0; const lignes = []; const dire = (l) => { console.log(l); lignes.push(l); }; const ok = (b, l, d) => { if (!b) ko++; dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
if (existsSync(join(root, OUT, 'diffs'))) { console.log('ARRÊT : ' + OUT + 'diffs existe déjà'); process.exit(1); }

// Chemin et octets
const octets = readFileSync(join(root, RC)); const ga = readFileSync(join(root, GA), 'utf8');
ok(sha(Buffer.from(ga, 'utf8')) === GA_SHA && !ga.includes('\r'), 'P1 `.gitattributes` de départ, en LF', GA_SHA.slice(0, 12) + '…');
ok(ga.split(ANCRE).length === 2 && !ga.includes(REGLE), 'P2 ancre unique, règle absente');
ok(git('ls-files', '--error-unmatch', '--', RC).status === 0 && git('ls-files', '--', RC).stdout.trim() === RC, 'P3 chemin suivi, casse exacte, à la racine', RC);
ok(sha(octets) === RC_SHA && !octets.includes(13), 'P4 octets du fichier : empreinte connue, aucun CR', octets.length + ' octets ; ' + RC_SHA.slice(0, 12) + '…');
ok(git('hash-object', '--no-filters', '--', RC).stdout.trim() === RC_BLOB && git('rev-parse', 'HEAD:' + RC).stdout.trim() === RC_BLOB, 'P5 octets du fichier = blob de `HEAD`, sans filtre', RC_BLOB.slice(0, 12) + '…');
ok(!Object.keys(JSON.parse(readFileSync(join(root, 'a2-05-travail/empreintes-rapports-arbitres.json'), 'utf8')).empreintes).includes(RC), 'P6 fichier hors du manifeste');
dire('constat  attributs actuels : ' + (git('check-attr', 'text', 'eol', '--', RC).stdout.trim().replace(/\n/g, ' ; ')));
const propose = ga.replace(ANCRE, () => ANCRE + REGLE);

// Mesures : un clone jetable par cas, le fichier seul copié, comme sur le dépôt réel
const mesurer = (val, avecRegle) => {
  const tmp = mkdtempSync(join(tmpdir(), 'ocha-complement-')); const C = join(tmp, 'c'); const g = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', '-c', 'core.safecrlf=false', ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 });
  spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', '-c', 'core.autocrlf=' + val, root, C], { encoding: 'utf8' }); g('read-tree', 'HEAD');
  copyFileSync(join(root, RC), join(C, RC)); g('update-index', '-q', '--refresh', '--', RC); writeFileSync(join(C, GA), avecRegle ? propose : ga);
  const attr = g('check-attr', 'text', '--', RC).stdout.trim().split(': ').pop(); const blob = g('hash-object', '--path=' + RC, RC).stdout.trim();
  const d = new Date(); utimesSync(join(C, RC), d, d); const touche = g('status', '--porcelain', '--', RC).stdout.trim();
  writeFileSync(join(C, RC), octets.toString('utf8').replace(/\n/g, '\r\n')); const crlf = g('status', '--porcelain', '--', RC).stdout.trim(), num = g('diff', '--numstat', '--', RC).stdout.trim().split('\t').slice(0, 2).join(' / ');
  const leg = g('check-attr', 'text', 'eol', '--', LEGACY).stdout.trim().split('\n').map((l) => l.split(': ').pop()).join(', ');
  rmSync(tmp, { recursive: true, force: true });
  return { val, avecRegle, attr, blobInchange: blob === RC_BLOB, touche: touche || 'rien', crlf: crlf || 'rien', num: num || '0 / 0', leg };
};
const M = ['true', 'false'].flatMap((v) => [mesurer(v, false), mesurer(v, true)]);
for (const m of M) dire('constat  autocrlf=' + m.val + ', ' + (m.avecRegle ? 'avec' : 'sans') + ' la règle : attribut text=' + m.attr + ' ; blob calculé inchangé : ' + m.blobInchange + ' ; horodatage changé → ' + m.touche + ' ; fichier réenregistré en CRLF → ' + m.crlf + ' (' + m.num + ') ; legacy : ' + m.leg);
ok(M.filter((m) => m.avecRegle).every((m) => m.attr === 'unset' && m.blobInchange && m.touche === 'rien'), 'M1 avec la règle, dans les deux configurations : attribut posé, blob inchangé, aucun faux « modifié »');
ok(M.every((m) => m.leg === 'set, crlf'), 'M2 `docs/legacy/REGLES-CONSTRUCTION.md` garde ses attributs : la règle ancrée ne le capture pas');

// Sorties
if (!ko) {
  const d = join(root, OUT); mkdirSync(join(d, 'diffs'), { recursive: true }); writeFileSync(join(d, V), propose);
  const r = diffBrut(root, GA, OUT + V); writeFileSync(join(d, 'diffs', 'gitattributes.diff'), r.stdout);
  writeFileSync(join(d, 'mesures.json'), JSON.stringify(M, null, 1) + '\n');
  dire('proposé ' + sha(Buffer.from(propose, 'utf8')) + ' ; diff ' + sha(r.stdout));
}
ok(!git('diff', '--cached', '--name-only').stdout.trim() && sha(readFileSync(join(root, GA))) === GA_SHA, 'dépôt réel : index vide, `.gitattributes` inchangé');
dire(ko ? ko + ' écart(s) ; aucune proposition écrite' : 'préparation conforme');
if (!ko) writeFileSync(join(root, OUT, 'sortie-preparation.txt'), lignes.join('\n') + '\n');
process.exit(ko ? 1 : 0);
