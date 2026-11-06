// A2-05 : essai, sur copie jetable, de la mise en service coordonnée de la version figée 2 du relais et du contrôle adapté ; jamais sur le dépôt réel.
// Refus avant écriture, exécution nominale, seconde exécution refusée ; puis, sur la copie mise en service : témoins, sabotages et falsifications
// cohérentes (version figée 2, son manifeste et le relais en service changés ensemble : seuls C4 et Q7 peuvent alors les voir), commit simulé.
// Usage : node a2-05-travail/versions-finales-2/application/essayer.mjs <racine du dépôt>
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { essayer, espace } from '../../arbitrage-F/essai-refus-clone.mjs';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', V1 = W + 'versions-finales/', V2 = W + 'versions-finales-2/', A = V2 + 'application/', REL = 'docs/relecture/reprise-A2-05.md', CTRL = W + 'controle-relais-allege.mjs';
const A10 = 'docs/conception/addendum-A10-interrogatif.md', SOM = 'docs/conception/00-sommaire.md', ETAT = 'ETAT-ACTUEL.md', MAN2 = V2 + 'manifeste.json';
const sha = (b) => createHash('sha256').update(b).digest('hex');
const remplace = (a, b) => (o) => Buffer.from(o.toString('utf8').replace(a, () => b), 'utf8');
const LIGNE18 = "**Proposé, non adopté** : aucun addendum. **Adopté** : l'addendum A10 sur `interrogatif`, issu de la proposition E5, validé et installé le 2026-11-03 (`docs/conception/addendum-A10-interrogatif.md`).";
const rapport = Object.keys(JSON.parse(readFileSync(resolve(root, W + 'empreintes-rapports-arbitres.json'), 'utf8')).empreintes)[0];

essayer({
  root, SCR: A + 'appliquer.mjs', A, fin: /mise en service de la version figée 2 du relais et du contrôle adapté conforme/, cibles: [REL, CTRL],
  scenario: ({ altere, refus, f, g, ok, lancer, premier }) => {
    writeFileSync(f(W + 'zz-index.txt'), 'x\n'); g('add', '-f', W + 'zz-index.txt'); refus('R1 index non vide', /P2 index vide/); g('rm', '--cached', '--quiet', W + 'zz-index.txt'); rmSync(f(W + 'zz-index.txt'));
    mkdirSync(f(A + 'depart')); const r2 = lancer(); ok(r2.code === 1 && /P3 sauvegarde/.test(premier(r2)), 'R2 sauvegarde déjà présente', premier(r2)); rmSync(f(A + 'depart'), { recursive: true });
    altere('R3 `CLAUDE.md` modifié', 'CLAUDE.md', espace, /P4 préservé : CLAUDE/);
    altere('R4 A10 modifié', A10, espace, /P4 préservé : docs\/conception\/addendum-A10/);
    altere('R5 `ETAT-ACTUEL.md` modifié (consignation)', ETAT, espace, /P4 préservé : ETAT/);
    altere('R6 donnée modifiée', 'data/n5/vocab.json', espace, /P6 données/);
    altere('R7 rapport protégé modifié', rapport, espace, /P7 manifeste des rapports/);
    altere('R8 version finale 2 modifiée', V2 + REL, espace, /P8 .*versions-finales-2\/docs/);
    altere('R9 manifeste 2 modifié', MAN2, espace, /P8 .*versions-finales-2\/manifeste/);
    altere('R10 générateur 2 modifié', V2 + 'generer.mjs', espace, /P8 .*generer/);
    altere('R11 diff relu du relais modifié', V2 + 'diffs/docs__relecture__reprise-A2-05.md.diff', espace, /P8 .*diffs\/docs__/);
    altere('R12 contrôle proposé modifié', V2 + 'proposition/controle-relais-allege.mjs', espace, /P8 .*proposition\/controle/);
    altere('R13 diff relu du contrôle modifié', V2 + 'proposition/diffs/controle-relais-allege.mjs.diff', espace, /P8 .*proposition\/diffs/);
    altere('R14 manifeste 1 modifié (ancienne preuve)', V1 + 'manifeste.json', espace, /P8 .*versions-finales\/manifeste/);
    altere('R15 version finale 1 modifiée (ancienne preuve)', V1 + REL, espace, /P8 .*versions-finales\/docs/);
    altere('R16 relais en service modifié', REL, espace, /P10 .*reprise/);
    altere('R17 contrôle installé modifié', CTRL, espace, /P10 .*controle-relais/);
  },
  apres: ({ cl, f, ok, g }) => {
    const relais = (...o) => { const r = cl.lancer(CTRL, '--apres-application', ...o); const L = r.out.split('\n'); return { fin: L.at(-1), ids: L.map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join(), q7: (L.find((l) => / Q7 /.test(l)) ?? '').trim() }; };
    const attend = (nom, ids, o = []) => { const r = relais(...o); ok(r.ids === ids, nom + ' : écarts ' + (ids || 'aucun'), r.fin + ' ; écarts : ' + (r.ids || 'aucun') + ' ; ' + r.q7); };
    const sabote = (nom, p, fn, ids) => { const o = readFileSync(f(p)); const m = fn(o); if (m.equals(o)) ok(false, nom, 'sabotage sans effet'); writeFileSync(f(p), m); attend(nom, ids); writeFileSync(f(p), o); };
    // Falsification cohérente : version finale 2, relais en service et empreinte finale du manifeste 2 changés ensemble ; la chaîne d'empreintes reste valide
    const forge = (nom, a, b, ids) => { const fin2 = readFileSync(f(V2 + REL)), live = readFileSync(f(REL)), man2 = readFileSync(f(MAN2)); const t = fin2.toString('utf8'); if (t.split(a).length !== 2) { ok(false, nom, 'ancre absente'); return; } const n = Buffer.from(t.replace(a, () => b), 'utf8');
      const m = JSON.parse(man2.toString('utf8')); m.documents[REL].final_sha256 = sha(n); writeFileSync(f(V2 + REL), n); writeFileSync(f(REL), n); writeFileSync(f(MAN2), JSON.stringify(m, null, 1) + '\n'); attend(nom, ids); writeFileSync(f(V2 + REL), fin2); writeFileSync(f(REL), live); writeFileSync(f(MAN2), man2); };
    const q = relais(); ok(q.ids === 'C9b' && /juste Q7 E5 est-il normatif \? → oui/.test(q.q7), 'T1 témoin : contrôle adapté, relais 2 en service : C9b seul ; Q7 « oui », juste', q.fin + ' ; ' + q.q7);
    const adapte = readFileSync(f(CTRL)); writeFileSync(f(CTRL), readFileSync(f(A + 'depart/' + CTRL))); attend('T2 contrôle installé avec le relais 2 (révision non coordonnée)', 'C10a,C9b,C9c'); writeFileSync(f(CTRL), adapte);
    sabote('S1 relais en service : ligne 18 revenue à l\'ancien texte', REL, remplace(LIGNE18, "**Proposé, non adopté** : l'addendum E5."), 'C10a,C9b,C9c');
    forge('S2 falsification cohérente : ligne 18 revenue à « Proposé, non adopté : l\'addendum E5 »', LIGNE18, "**Proposé, non adopté** : l'addendum E5.", 'C4,C8,C9b');
    forge('S3 falsification cohérente : « ni adoptée ni normative » rétabli ligne 29', 'document historique : seul A10, adopté le 2026-11-03, fait foi', '**ni adoptée ni normative**', 'C4,C8,C9b');
    forge('S4 falsification cohérente : date d\'adoption fausse dans le relais', LIGNE18, LIGNE18.replace('2026-11-03', '2000-01-01'), 'C4,C9b');
    forge('S5 falsification cohérente : E5 rétabli parmi les chantiers fermés', 'le bloc F (A10 adopté', 'le bloc F et E5 (A10 adopté', 'C4,C9b');
    forge('S6 falsification cohérente : A10 retiré des addenda validés', '`addendum-A10-…`', '`addendum-A9-…`', 'C4,C9b');
    const a10 = readFileSync(f(A10)); rmSync(f(A10)); attend('S7 A10 absent (le relais 2 cite son chemin : C2a et C11c le voient aussi)', 'C11c,C2a,C4,C5e,C6,C8,C9b'); writeFileSync(f(A10), a10);
    sabote('S8 statut d\'A10 non validé', A10, remplace('🔒 validé le 2026-11-03', '🔒 proposé le 2026-11-03'), 'C4,C5e,C8,C9b');
    sabote('S9 manifeste 1 modifié (ancienne preuve)', V1 + 'manifeste.json', espace, 'C10a,C10b,C9b');
    sabote('S10 version finale 1 modifiée (ancienne preuve)', V1 + REL, espace, 'C10a,C10b,C9b');
    sabote('S11 candidat 1 modifié (ancienne preuve)', W + 'reprise-A2-05-allegee-candidat.md', espace, 'C10b,C9b');
    sabote('S12 date d\'adoption fausse dans « Étape en cours »', ETAT, remplace('**Addendum A10 adopté et installé le 2026-11-03**', '**Addendum A10 adopté et installé le 2000-01-01**'), 'C5e,C9b');
    g('add', '--', A10, SOM, CTRL, '.gitattributes', 'docs/rapports/etape2-A2-05-bilan-volet2.md', ETAT, 'ROADMAP.md', REL); const c = g('commit', '--quiet', '--no-verify', '-m', 'essai'); ok(c.status === 0, 'A1 commit simulé de huit fichiers, dans la copie seulement', 'code ' + c.status);
    const dc = g('diff', '--check', 'HEAD~1', 'HEAD'); ok(dc.status === 0 && !dc.stdout.trim(), 'A2 `git diff --check` du commit simulé, sans filtre de chemin', 'code ' + dc.status);
    attend('A3 après commit simulé : relais normal, 30 sur 30', '');
    attend('A4 après commit simulé : `--strict`, C5a seul', 'C5a', ['--strict']);
  },
});
