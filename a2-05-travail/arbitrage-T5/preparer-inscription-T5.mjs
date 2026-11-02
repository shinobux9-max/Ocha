// A2-05 · volet 1 · lot 3 : préparation de l'inscription de l'arbitrage de T5 (décision du 2026-10-25), EN PROPOSITION : aucun fichier concerné
// n'est modifié (rapport de T5, configuration, bilan du volet 2, documents de pilotage, manifeste, contrôles en service).
// Usage : node a2-05-travail/arbitrage-T5/preparer-inscription-T5.mjs <racine du dépôt>
// (1) Préconditions sur le dépôt réel : rapport de T5 = proposition relue ; configuration sans ARBITRAGE ; §8.95 absent ; 36 empreintes ; fragments.
// (2) Dans un clone git jetable recouvert de l'arbre de travail, l'état de la livraison étant reconstitué (rapport de T5 absent) : régénération du
// rapport par le module v2 avec la constante ARBITRAGE ; le résultat doit être exactement la proposition relue, à deux différences près (ligne de
// statut ; §0 inséré avant le §1). Puis §8.95 du bilan (arbitrage et réserve normative) et deux fragments chiffrés d'ETAT-ACTUEL.md et ROADMAP.md.
// (3) Étape A (inscription seule) et étape B (ajout simulé du rapport au manifeste, 37 entrées) : couverture, comptes de sync-stable, manifeste,
// contrôle du bilan du pilote, recalcul de T5 en service et proposé, relais, aperçu ; résultats relevés. (4) Propositions et différences écrites
// dans arbitrage-T5/inscription/ (refus si le dossier existe). (5) Dépôt réel inchangé. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, unlinkSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T5/inscription';
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T5.md', CFG = 'a2-05-travail/audit-v1-lot3-T5.mjs', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const MAN = 'a2-05-travail/empreintes-rapports-arbitres.json', ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md';
const PREC = 'a2-05-travail/arbitrage-T5/proposition-recalcul-T5-perimetre-arbitre.mjs';
const RAP_SHA = 'd9361ba48ca54ed6eaaf5a320d440ea003db312bfa8821b3843879f4e29e4de1';
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex'); const shaT = (t) => createHash('sha256').update(t).digest('hex');
let ko = 0; const ok = (b, l, d) => { if (!b) ko++; console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); };
const constat = (l, d) => console.log('constat  ' + l + (d ? ' : ' + d : ''));
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const TEMOINS = [RAP, CFG, BIL, MAN, ETAT, ROAD, 'a2-05-travail/controle-bilan-pilote.mjs', 'a2-05-travail/recalcul-T5-perimetre.mjs', 'a2-05-travail/registre-tranches.json', 'data/n5/vocab.json', 'reconstruction/a2-04/journal.json'];
const avant = Object.fromEntries(TEMOINS.map((p) => [p, sha(join(root, p))]));
if (existsSync(join(root, OUT))) arret(OUT + ' existe déjà');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const LFs = (t) => t.replace(/\r\n/g, '\n');

// Fragments chiffrés, hors du bloc généré, à l'identique dans ETAT-ACTUEL.md et ROADMAP.md (texte normalisé en LF)
const FRAGMENTS = [
  ['(B6 à B8). **252\n  candidats arbitrés sur 377 ; 125 restent**', '(B6 à B8). **274\n  candidats arbitrés sur 377 ; 103 restent**'],
  ['Les 125 candidats restants du lot 3, dont les 17 du bloc F', 'Les 103 candidats restants du lot 3, dont les 17 du bloc F'],
];

// (1) Préconditions
const man0 = JSON.parse(lire(MAN)).empreintes;
ok(avant[RAP] === RAP_SHA && /^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/m.test(lire(RAP)) && !lire(RAP).includes('## 0. Arbitrage'), 'P1 rapport de T5 = proposition relue, au statut de proposition, sans §0', avant[RAP].slice(0, 12) + '…');
ok(/^const ARBITRAGE = null;$/m.test(lire(CFG)), 'P2 configuration : ARBITRAGE non renseigné');
ok(!/^### 8\.95 /m.test(lire(BIL)) && /^### 8\.94 /m.test(lire(BIL)), 'P3 bilan : §8.94 présent, §8.95 absent');
ok(Object.keys(man0).length === 36 && Object.entries(man0).every(([p, h]) => sha(join(root, p)) === h) && !Object.hasOwn(man0, RAP), 'P4 manifeste : 36 empreintes identiques ; rapport de T5 absent');
for (const p of [ETAT, ROAD]) { const t = LFs(lire(p)); ok(FRAGMENTS.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P5 ' + p + ' : deux fragments présents une fois, remplacements absents'); }

// (2a) Configuration proposée : seule la constante ARBITRAGE change
const ARBITRAGE = `const ARBITRAGE = {
  "date": "2026-10-25",
  "texte": [
    "Arbitrage du 2026-10-25 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Après relecture des 22 fiches d'audit et des quatre points soumis à l'arbitrage, je retiens la recommandation suivante : **22 conformités, aucun écart, aucune nouvelle correction lexicale.** »",
    "",
    "**22 conformes, aucun écart, aucun suspendu**, comme proposé. La proposition est conservée ci-dessous, telle qu'elle a été livrée ; ses verdicts du §1 et ses fiches d'examen ne sont pas modifiés.",
    "",
    "| Point | Arbitrage |",
    "|---|---|",
    "| **Verdicts (22)** | Retenus tels que proposés : catégories, types existants, \`deictique\`, absence de dimensions, de tags et de relations, particules documentées (私) et \`counter\` confirmés ; les valeurs \`category: null\` et \`semantic_type: null\` confirmées individuellement, selon les décisions antérieures applicables. |",
    "| **Réserve normative (point 1)** | Les décisions \`type-nul\` D0668 (こちら, sens 2), D0679 (あちら, sens 2), D0687 (こっち, sens 2) et D0691 (そっち, sens 2) sont **conservées, sans modification**. Leur type \`null\` **n'est pas présenté comme positivement confirmé par A9** : ces quatre sens désignent une personne ou un groupe, et A9 (§4.2), validé après le lot 11, veut qu'un sens qui porte une fonction et désigne une entité garde le type qui la décrit ; la tension entre ces décisions et A9, §4.2, est documentée, non résolue. Cette réserve n'est ni une correction V1 nouvelle, ni une autorisation de rouvrir les décisions antérieures. |",
    "| **Sens de lieu (point 2)** | ここ, そこ, あそこ : types \`null\` confirmés selon D0643, D0646 et D0649 ; D0644 (catégorie de ここ) n'est pas rouverte. |",
    "| **あそこ et あちら (point 3)** | Catégories distinctes confirmées : \`position_localisation\` pour あそこ, \`direction_orientation › orientation\` pour あちら, sens 1. |",
    "| **\`politesse\` (point 4)** | Non ajoutée aux sens simplement polis, ni à 私 et あなた (A9, §3.3, frontière 1). |",
    "| **Limites** | Aucune règle générale nouvelle n'est déduite de T5. |",
    "",
    "**Liste globale inchangée : aucune correction nouvelle ; 196 corrections dans 172 ENTRY, non appliquées ; V1-24 reste libre.** Comptes attendus par l'arbitrage, calculés par les outils et non imposés à la main : 274 sens arbitrés sur 377, 103 restants ; bloc B, 148 sur 148."
  ]
};`;
const cfgProp = lire(CFG).replace(/^const ARBITRAGE = null;$/m, () => ARBITRAGE);

// (2b) §8.95 du bilan (aucune ligne de tableau : le comptage des corrections et des réservations ne la lit pas)
const S895 = [
  '### 8.95 Volet 1, lot 3 : T5 arbitrée, 22 conformes, aucun écart ; réserve normative sur quatre types nuls (2026-10-25)',
  '',
  'Arbitrage du 2026-10-25 (ChatGPT, par délégation ; relayé par l\'utilisateur) : « Après relecture des 22 fiches d\'audit et des quatre points soumis à l\'arbitrage, je retiens la recommandation suivante : **22 conformités, aucun écart, aucune nouvelle correction lexicale.** » Détail dans `docs/rapports/etape2-A2-05-volet1-lot3-T5.md` (§0, inscrit par le module v2 ; proposition relue `d9361ba48ca5…` conservée à l\'identique hors du statut et du §0).',
  '',
  '**T5 : 22 conformes, aucun écart, aucun suspendu**, comme proposé. Confirmés : les catégories (`position_localisation` pour ここ, そこ, あそこ ; `direction_orientation › orientation` pour les six sens de direction ; `null` pour les treize autres, selon A5 et A2-GLOBAL, §4.4 et §10) ; les types existants (`personne` pour 私 et あなた ; `null` pour vingt sens, chacun selon sa décision `type-nul` du lot 11) ; `deictique` (A7) ; l\'absence de dimensions, de tags et de relations ; les particules de 私 ; `counter`. `politesse` n\'est pas ajoutée aux sens simplement polis (A9, §3.3). Les catégories distinctes d\'あそこ et d\'あちら, sens 1, sont confirmées. Aucune règle générale n\'est déduite de T5.',
  '',
  '**Réserve normative** (arbitrage, §2) : les décisions `type-nul` D0668 (こちら, sens 2), D0679 (あちら, sens 2), D0687 (こっち, sens 2) et D0691 (そっち, sens 2) sont **conservées, sans modification**. Leur type `null` **n\'est pas présenté comme positivement confirmé par A9** : ces quatre sens désignent une personne ou un groupe, et A9 (§4.2), validé le 2026-10-06, après le lot 11, veut qu\'un sens qui porte une fonction et désigne une entité garde le type qui la décrit, comme 私 et あなた (`personne`). La tension entre ces décisions et A9, §4.2, est documentée, non résolue. Cette réserve n\'est ni une correction V1 nouvelle, ni une autorisation de rouvrir les décisions antérieures.',
  '',
  '**Décomptes calculés par les outils**, non saisis à la main : **274 sens arbitrés sur 377, 103 restants ; bloc B : 148 sur 148 ; 196 corrections dans 172 ENTRY, non appliquées ; prochain identifiant disponible : V1-24.** Aucune correction lexicale n\'est appliquée ; aucun `git add`, commit ni push.',
];
const bilanProp = (() => { const t = lire(BIL); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S895.join(eol) + eol; })();
ok(!S895.some((l) => /^\| /.test(l)), '§8.95 : aucune ligne de tableau');
const pilote = (p) => { const b = lire(p); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of FRAGMENTS) t = t.replace(a, () => z); return crlf ? t.replace(/\n/g, '\r\n') : t; };
const prop = { [ETAT]: pilote(ETAT), [ROAD]: pilote(ROAD), [BIL]: bilanProp };

// (3) Clone jetable, état de la livraison reconstitué (rapport de T5 absent), régénération avec ARBITRAGE
const tmp = mkdtempSync(join(tmpdir(), 'ocha-inscription-t5-')); const C = join(tmp, 'arbre');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
const lancer = (s, ...a) => { const r = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecartsDe = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim().slice(0, 220));
unlinkSync(join(C, RAP)); writeFileSync(join(C, CFG), cfgProp);
const g = lancer(CFG); const rapProp = existsSync(join(C, RAP)) ? readFileSync(join(C, RAP), 'utf8') : '';
const L0 = lire(RAP).split('\n'), L1 = rapProp.split('\n'); const i0 = L1.indexOf('## 0. Arbitrage'), i1 = L1.indexOf('## 1. Résultat proposé');
const sans0 = [...L1.slice(0, i0), ...L1.slice(i1)]; const st = L0.findIndex((l) => l.startsWith('**Statut** : '));
const memes = sans0.length === L0.length && sans0.every((l, k) => k === st ? /^\*\*Statut\*\* : \*\*arbitré le 2026-10-25\*\* \(§0\)\./.test(l) : l === L0[k]);
ok(g.code === 0 && i0 > 0 && i1 > i0 && memes, 'E1 rapport régénéré avec ARBITRAGE (état de la livraison) : seuls changent la ligne de statut et le §0 inséré', 'génération code ' + g.code + (g.out ? ' (' + g.out.slice(0, 120) + ')' : '') + ' ; §0 : ' + (i1 - i0) + ' lignes ; ' + shaT(rapProp).slice(0, 12) + '…');
ok((rapProp.match(/^#### `v_\d+_s\d+` · .* — proposé : \*\*conforme\*\*$/gm) ?? []).length === 22 && /\*\*22 sens examinés : 22 conformes, 0 écart, aucun sens suspendu\.\*\*/.test(rapProp), 'E2 §1 et 22 fiches d\'examen d\'origine conservés (22 conformes)');
for (const p of [ETAT, ROAD, BIL]) writeFileSync(join(C, p), prop[p]);
cpSync(join(root, PREC), join(C, PREC));
const etape = (nom) => {
  const r = { cov: lancer('a2-05-travail/couverture-lot3.mjs'), emp: lancer('a2-05-travail/empreintes-lot3.mjs'), cbp: lancer('a2-05-travail/controle-bilan-pilote.mjs'), recS: lancer('a2-05-travail/recalcul-T5-perimetre.mjs'), recP: lancer(PREC), rel: lancer('a2-05-travail/controle-relais-allege.mjs', '--apres-application'), ap: lancer('a2-05-travail/sync-stable.mjs', '--apercu') };
  r.apercu = readFileSync(join(C, 'a2-05-travail/sync-stable-apercu.md'), 'utf8'); r.hunks = (r.apercu.match(/^@@/gm) ?? []).length;
  for (const [k, v] of Object.entries(r)) if (v?.out !== undefined) console.log('   ' + nom + ' ' + k + ' (code ' + v.code + ') : ' + v.out.split('\n').pop().slice(0, 170) + (ecartsDe(v).length ? ' | ' + ecartsDe(v).join(' | ') : ''));
  return r;
};
const A = etape('A');
ok(A.cov.code === 0 && /274 arbitrés, 0 proposés, 103 restants, sur 377 ; bloc B : 148\/148/.test(A.cov.out), 'A1 couverture après inscription : 274 arbitrés, 0 proposé, 103 restants ; bloc B 148/148', A.cov.out.slice(0, 80));
const plus = A.apercu.split('\n').filter((l) => l.startsWith('+') && !l.startsWith('+++'));
ok(plus.some((l) => /274 sens arbitrés sur 377 ; 103 restent \(0 proposés\)/.test(l)) && !plus.some((l) => /Corrections retenues/.test(l)), 'A2 comptes de sync-stable (bloc proposé, non appliqué) : 274/377, 103 restent, 0 proposé ; ligne des corrections inchangée (196 dans 172 ENTRY, V1-24)', plus.filter((l) => /Lot 3|Corrections|Contrôles/.test(l)).map((l) => l.slice(0, 120)).join(' | '));
ok(A.emp.code === 0 && A.emp.out.endsWith('hors du manifeste : ' + RAP), 'A3 manifeste à 36 ; rapport arbitré de T5 signalé hors du manifeste', A.emp.out);
ok(A.cbp.code === 0, 'A4 contrôle du bilan du pilote conforme (il ne porte pas sur le rapport de T5)', A.cbp.out.split('\n').pop());
constat('A5 recalcul de T5 en service', 'code ' + A.recS.code + ' ; ' + (ecartsDe(A.recS).join(' ; ') || 'aucun écart'));
ok(A.recP.code === 1 && ecartsDe(A.recP).length === 1 && /manifeste : 37/.test(ecartsDe(A.recP)[0]), 'A6 recalcul proposé : seul écart, la 37e empreinte absente', ecartsDe(A.recP).join(' ; '));
constat('A7 relais', A.rel.out.split('\n').pop() + ' ; ' + (ecartsDe(A.rel).join(' ; ') || 'aucun écart'));
// Étape B : ajout simulé du rapport arbitré au manifeste (outil réel, dans le clone)
const aj = lancer('a2-05-travail/empreintes-lot3.mjs', '--ajouter'); const manB = readFileSync(join(C, MAN), 'utf8'); const mB = JSON.parse(manB); const cles = Object.keys(mB.empreintes);
ok(aj.code === 0 && cles.length === 37 && cles[36] === RAP && Object.entries(man0).every(([p, h]) => mB.empreintes[p] === h), 'B1 ajout simulé : seul le rapport arbitré de T5 (37 entrées, les 36 précédentes inchangées)', aj.out);
const B = etape('B');
ok(B.recP.code === 0, 'B2 recalcul proposé conforme à 37 entrées', B.recP.out.split('\n').pop());
constat('B3 contrôle du bilan du pilote', 'code ' + B.cbp.code + ' ; ' + (ecartsDe(B.cbp).join(' ; ') || 'aucun écart'));
constat('B4 relais', B.rel.out.split('\n').pop() + ' ; ' + (ecartsDe(B.rel).join(' ; ') || 'aucun écart'));
constat('B5 aperçu de synchronisation', B.hunks + ' hunk(s) ; ' + B.ap.out);
rmSync(tmp, { recursive: true, force: true });

// (4) Écriture des propositions et des différences
mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
const sorties = [[RAP, 'etape2-A2-05-volet1-lot3-T5.md', rapProp], [CFG, 'audit-v1-lot3-T5.mjs', cfgProp], [BIL, 'etape2-A2-05-bilan-volet2.md', prop[BIL]], [ETAT, 'ETAT-ACTUEL.md', prop[ETAT]], [ROAD, 'ROADMAP.md', prop[ROAD]], [MAN, 'empreintes-rapports-arbitres-simule.json', manB], ['a2-05-travail/recalcul-T5-perimetre.mjs', 'proposition-recalcul-T5-perimetre-arbitre.mjs', lire(PREC)]];
for (const [p, nom, t] of sorties) {
  writeFileSync(join(root, OUT, nom), t);
  const d = spawnSync('git', ['diff', '--no-index', '--no-color', '--', p, OUT + '/' + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  writeFileSync(join(root, OUT, 'diffs', nom + '.diff'), d.stdout);
  const n = (c) => d.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c)).length;
  ok(d.status === 1, 'proposé : ' + p, '+' + n('+') + ' / -' + n('-') + ' lignes ; ' + shaT(t).slice(0, 12) + '…');
}
writeFileSync(join(root, OUT, 'apercu-etape-A.md'), A.apercu); writeFileSync(join(root, OUT, 'apercu-etape-B.md'), B.apercu);

// (5) Dépôt réel inchangé
const ch = TEMOINS.filter((p) => sha(join(root, p)) !== avant[p]);
ok(ch.length === 0, 'dépôt réel inchangé (' + TEMOINS.length + ' fichiers témoins)', ch.join(', ') || 'aucune modification');
console.log(ko ? ko + ' écart(s)' : 'préparation conforme');
process.exit(ko ? 1 : 0);
