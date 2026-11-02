// A2-05 · volet 1 · lot 3 : préparation de la consignation complémentaire de la synchronisation à 38 empreintes (plan c8f22606c3c690bb,
// appliqué le 2026-10-28), EN PROPOSITION : aucun document réel n'est modifié. Autorisée le 2026-10-28 : préparation seulement.
// Usage : node a2-05-travail/arbitrage-T6/consignation-sync-38/preparer-consignation-sync-38.mjs <racine du dépôt>
// (1) Versions proposées, par remplacements ciblés (chaque ancre présente exactement une fois) : ETAT-ACTUEL.md et ROADMAP.md (mention
// « synchronisation du bloc d'état restant à effectuer » de la rubrique d'état courant et « Prochaine action », à l'identique) ; journal
// (ETAT-ACTUEL.md seul, une ligne nouvelle à la fin ; la ligne du 2026-10-28 déjà écrite n'est pas modifiée) ; bilan du volet 2 (§8.99 ajouté à la
// fin ; §8.98 et texte antérieur inchangés) ; inventaire des scripts (trois lignes après celle de preparer-formalisation-38.mjs). Aucune ligne des
// blocs a2-05:etat. Fins de ligne conservées.
// (2) Écriture dans arbitrage-T6/consignation-sync-38/ (refus si les versions existent), avec les différences exactes (document réel → proposé).
// (3) Essai dans un clone git jetable recouvert de l'arbre de travail : contrôles ; aperçu de synchronisation vide ; blocs identiques ;
// git diff --check. (4) Dépôt réel inchangé. Code 1 au premier écart.
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, cpSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const OUT = 'a2-05-travail/arbitrage-T6/consignation-sync-38', PLAN = 'c8f22606c3c690bb';
const ETAT = 'ETAT-ACTUEL.md', ROAD = 'ROADMAP.md', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md', INV = 'a2-05-travail/INVENTAIRE-SCRIPTS.md';
const DOCS = [ETAT, ROAD, BIL, INV];
const shaF = (p) => createHash('sha256').update(readFileSync(p)).digest('hex'); const shaT = (t) => createHash('sha256').update(t).digest('hex');
const ok = (b, l, d) => { console.log((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) { console.log('\narrêt au premier écart'); process.exit(1); } };
const arret = (m) => { console.log('ARRÊT : ' + m); process.exit(1); };
const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT + '/') continue;
  if (statSync(join(root, p)).isDirectory()) marcher(p); else h[p] = shaF(join(root, p)); } }; marcher(''); return h; };
const reel0 = instantane();
if (DOCS.some((p) => existsSync(join(root, OUT, p.split('/').pop())))) arret(OUT + ' : versions proposées déjà écrites');
const lire = (p) => readFileSync(join(root, p), 'utf8');
const remplacer = (t, doc, ancre, nouveau) => { const n = t.split(ancre).length - 1; if (n !== 1) arret(doc + ' : ancre présente ' + n + ' fois : ' + ancre.slice(0, 80) + '…'); return t.replace(ancre, () => nouveau); };

// (a) Rubrique d'état courant et « Prochaine action », à l'identique dans ETAT-ACTUEL.md et ROADMAP.md
const A_RUB = '**synchronisation du bloc d\'état restant à effectuer** : aperçu présenté, non appliqué (marqueur et 37 → 38 empreintes dans les deux blocs) ; audit des 22 sens non autorisé (bilan du volet 2, §8.98)';
const N_RUB = '**formalisation appliquée le 2026-10-28**, sur autorisation (neuf remplacements ciblés relus ; originaux sauvegardés dans `a2-05-travail/arbitrage-T6/formalisation-38/application/depart/`) ; **bloc d\'état synchronisé à 38 empreintes le 2026-10-28**, sur autorisation (plan `' + PLAN + '`, aperçu relancé identique à l\'aperçu relu ; marqueur `06eb4c04f71bb5c6` → `dea26959920c491d` et « 37 » → « 38 rapports arbitrés identiques » dans les deux blocs ; aperçu suivant vide ; relais 30 sur 30) : **les 38 empreintes sont désormais synchronisées** ; audit des 22 sens non autorisé (bilan du volet 2, §8.98 et §8.99)';
const A_PA = '- **Prochaine action.** La synchronisation du bloc d\'état (37 → 38 empreintes ; plan à confirmer par un aperçu sur le dépôt réel au moment de l\'autorisation), sur autorisation distincte ; puis l\'audit individuel des 22 sens de T6, sur autorisation distincte,';
const N_PA = '- **Prochaine action.** L\'audit individuel des 22 sens de T6, sur autorisation distincte,';
const rubriques = (t, doc) => remplacer(remplacer(t, doc, A_RUB, N_RUB), doc, A_PA, N_PA);

// (b) Journal d'ETAT-ACTUEL.md : une ligne nouvelle après la dernière ligne du tableau, qui reste inchangée
const J1 = '| 2026-10-28 | 2 · A2-05 | **Formalisation de T6 appliquée, puis bloc d\'état synchronisé à 38 empreintes**, chacune sur autorisation distincte. **Formalisation** : préconditions conformes (versions proposées et diffs relus à leurs empreintes ; diffs régénérés identiques octet pour octet aux diffs relus ; ajouts absents ; neuf ancres uniques, chacune à sa place) ; originaux sauvegardés (`a2-05-travail/arbitrage-T6/formalisation-38/application/depart/`) ; quatre documents identiques octet pour octet à leurs versions relues (rubriques à l\'identique, ligne de journal précédente, §8.98, inventaire) ; blocs `a2-05:etat` préservés ; relais 30 sur 30 ; nouvel aperçu, plan `' + PLAN + '`, présenté, non appliqué. **Synchronisation** : aperçu relancé sur le dépôt réel, identique octet pour octet à l\'aperçu relu (`58ea3c7a…`) ; huit lignes, dans les seuls blocs `a2-05:etat` : marqueur `06eb4c04f71bb5c6` → `dea26959920c491d`, « 37 » → « 38 rapports arbitrés identiques » ; `ETAT-ACTUEL.md` et `ROADMAP.md` sauvegardés (`a2-05-travail/arbitrage-T6/synchronisation-38/depart/`) ; `--appliquer --plan ' + PLAN + '` une fois, code 0 ; seules les deux lignes prévues changent dans chaque document ; aperçu suivant vide ; blocs identiques ; relais 30 sur 30 ; 38 empreintes ; contrôle du bilan du pilote 42 sur 42 ; recalcul de T5 16 sur 16 ; recalcul de T6 24 sur 24 ; zones protégées inchangées. La ligne précédente, qui décrit l\'état avant la synchronisation, n\'est pas modifiée. Audit des 22 sens non autorisé. Bilan du volet 2, §8.99. **274/377 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-24 libre ; 38 empreintes ; bloc d\'état synchronisé.** | non committé |';
const journal = (t) => { const eol = t.includes('\r\n') ? '\r\n' : '\n'; const L = t.split(eol); let k = L.length - 1; while (k >= 0 && L[k] === '') k--; if (!/^\| 2026-10-28 \| 2 · A2-05 \| \*\*Trois contrôles adaptés à la 38e entrée installés\*\*/.test(L[k])) arret(ETAT + ' : dernière ligne du journal inattendue'); L.splice(k + 1, 0, J1); return L.join(eol); };

// (c) Bilan du volet 2 : §8.99, ajouté à la fin, après §8.98, qui n'est pas modifié (aucune ligne de tableau)
const S899 = [
  '### 8.99 Volet 1, lot 3 : formalisation de T6 appliquée ; bloc d\'état synchronisé à 38 empreintes (2026-10-28)',
  '',
  'Décisions (ChatGPT, par délégation ; relayées par l\'utilisateur), chacune distincte : « **J\'accepte la 38e empreinte et j\'autorise la formalisation** » (ordre retenu : la formalisation, puis la synchronisation, sur autorisation distincte ; nouvel aperçu seulement) ; puis « **J\'accepte la formalisation appliquée et j\'autorise exclusivement la synchronisation du plan `' + PLAN + '`.** » ; la préparation de la présente consignation, sans application.',
  '',
  '**Formalisation (2026-10-28)** (`a2-05-travail/arbitrage-T6/formalisation-38/appliquer-formalisation-38.mjs`, lancé une fois, code 0) : préconditions conformes avant toute écriture (versions proposées et diffs relus à leurs empreintes ; diffs régénérés, document réel → version proposée, identiques octet pour octet aux diffs relus ; ajouts absents ; neuf ancres uniques, chacune à sa place ; 38 empreintes ; relais 30 sur 30) ; originaux sauvegardés dans `a2-05-travail/arbitrage-T6/formalisation-38/application/depart/` ; hunks relus appliqués par remplacements ciblés ; `ETAT-ACTUEL.md`, `ROADMAP.md`, le présent bilan (§8.98) et l\'inventaire des scripts identiques octet pour octet à leurs versions relues. Contrôles : blocs `a2-05:etat` intacts ; rubriques communes identiques ; bilan antérieur préfixe exact ; relais 30 sur 30 ; 38 empreintes ; contrôle du bilan du pilote, recalculs de T5 et de T6 conformes ; 274/377 ; 196 corrections dans 172 ENTRY, V1-24 libre ; seuls les quatre documents changés ; index vide ; `git diff --check` code 0. Nouvel aperçu présenté, non appliqué : plan `' + PLAN + '`, huit lignes (marqueur et 37 → 38), contenu identique à celui de l\'aperçu `d69f8b1a134f37c2` hors de la ligne de l\'empreinte du plan (`a2-05-travail/arbitrage-T6/formalisation-38/application/sorties/apercu-apres-formalisation.md`, `58ea3c7a…`).',
  '',
  '**Synchronisation (2026-10-28)** (`a2-05-travail/arbitrage-T6/synchronisation-38/appliquer-synchronisation-38.mjs`, essayé d\'abord sur une copie jetable, puis lancé une fois sur le dépôt réel, code 0) : aperçu relancé sur le dépôt réel, plan `' + PLAN + '`, identique octet pour octet à l\'aperçu relu (`58ea3c7a37cbadbcea8e408f6c6790bb5570d966aa0fd862eaf538224977e247`) ; huit lignes, dans les seuls blocs `a2-05:etat` : marqueur `06eb4c04f71bb5c6` → `dea26959920c491d` et « 37 rapports arbitrés identiques » → « 38 », aucun autre chiffre ; 38 empreintes et relais 30 sur 30 avant l\'application ; `ETAT-ACTUEL.md` et `ROADMAP.md` sauvegardés dans `a2-05-travail/arbitrage-T6/synchronisation-38/depart/` ; `node a2-05-travail/sync-stable.mjs . --appliquer --plan ' + PLAN + '` une fois, code 0. Après : seules les deux lignes prévues changent dans chaque document (`ETAT-ACTUEL.md`, lignes 23 et 27 ; `ROADMAP.md`, lignes 614 et 618), fins de ligne conservées ; blocs générés identiques entre les deux documents ; aperçu suivant vide ; relais `--apres-application` 30 sur 30 ; 38 empreintes conformes ; contrôle du bilan du pilote 42 sur 42 ; recalcul de T5 16 sur 16 ; recalcul de T6 24 sur 24 ; 274/377, 103 restants ; 196 corrections dans 172 ENTRY, aucune appliquée ; V1-22 et V1-23 réservés, V1-24 libre ; arbre de travail comparé fichier par fichier, seuls les deux documents de pilotage et l\'aperçu changés (zones protégées, normes, données, registre et manifeste inchangés) ; index vide ; `git diff --check` code 0. Sortie : `a2-05-travail/arbitrage-T6/synchronisation-38/sorties/synchronisation.txt`, avec les aperçus d\'avant et d\'après l\'application.',
  '',
  '**Portée** : le §8.98 et la ligne du journal du 2026-10-28 qui le résume décrivent l\'état à la date de leur rédaction (synchronisation restant à effectuer, bloc d\'état non synchronisé) ; ils ne sont pas modifiés. Le présent paragraphe consigne la suite ; la rubrique d\'état courant et la « Prochaine action » d\'`ETAT-ACTUEL.md` et de `ROADMAP.md` sont actualisées à l\'identique.',
  '',
  'Audit des 22 sens de T6 non autorisé ; registre des tranches non modifié. Décomptes : 274/377, 103 restants ; bloc B 148/148 ; 196 corrections dans 172 ENTRY, non appliquées ; V1-22 et V1-23 réservés, V1-24 libre ; 38 empreintes ; bloc d\'état synchronisé. Aucun `git add`, commit ni push.',
];
const bilan = (t) => { if (!/^### 8\.98 /m.test(t) || /^### 8\.99 /m.test(t)) arret(BIL + ' : §8.98 absent ou §8.99 déjà présent'); const eol = t.includes('\r\n') ? '\r\n' : '\n'; return t.replace(/(\r?\n)+$/, '') + eol + eol + S899.join(eol) + eol; };

// (d) Inventaire des scripts : trois lignes après celle de preparer-formalisation-38.mjs
const A_INV = '| `arbitrage-T6/formalisation-38/preparer-formalisation-38.mjs` |';
const LIGNES_INV = [
  "| `arbitrage-T6/formalisation-38/appliquer-formalisation-38.mjs` | application de la formalisation de T6 : préconditions (empreintes, diffs régénérés = diffs relus, ajouts absents, ancres uniques à leur place), sauvegarde, hunks relus appliqués par remplacements ciblés, résultat égal à la version relue, contrôles, aperçu de synchronisation non appliqué | `ETAT-ACTUEL.md`, `ROADMAP.md`, bilan du volet 2 (§8.98), cet inventaire ; `arbitrage-T6/formalisation-38/application/depart/`, `…/sorties/` | lancé une fois le 2026-10-28, code 0 |",
  "| `arbitrage-T6/synchronisation-38/appliquer-synchronisation-38.mjs` | synchronisation du bloc d'état à 38 empreintes : aperçu relancé (plan `c8f22606c3c690bb`, aperçu identique au relu, huit lignes), sauvegarde, `sync-stable.mjs --appliquer` une fois, contrôles (deux lignes changées par document, aperçu suivant vide, blocs identiques, relais, manifeste, contrôles, couverture, identifiants, arbre de travail) | `ETAT-ACTUEL.md`, `ROADMAP.md` (blocs `a2-05:etat`) ; `arbitrage-T6/synchronisation-38/depart/`, `…/sorties/` | essayé sur une copie jetable, puis lancé une fois sur le dépôt réel le 2026-10-28, code 0 |",
  "| `arbitrage-T6/consignation-sync-38/preparer-consignation-sync-38.mjs` | préparation de la consignation complémentaire de la synchronisation, sans application : versions proposées d'`ETAT-ACTUEL.md`, de `ROADMAP.md`, du bilan du volet 2 (§8.99) et de cet inventaire, par remplacements ciblés ; essai dans un clone git jetable ; dépôt réel inchangé | `arbitrage-T6/consignation-sync-38/` (versions proposées et différences) | lancé le 2026-10-28 |",
];
const inventaire = (t) => {
  if (/appliquer-formalisation-38|synchronisation-38|consignation-sync-38/.test(t)) arret(INV + ' : lignes déjà présentes');
  if (LIGNES_INV.some((l) => l.split('|').length !== 6)) arret('ligne de tableau à quatre colonnes attendue');
  const eol = t.includes('\r\n') ? '\r\n' : '\n'; const L = t.split(eol); const k = L.findIndex((l) => l.startsWith(A_INV));
  if (k < 0 || L.filter((l) => l.startsWith(A_INV)).length !== 1) arret(INV + ' : ancre de la ligne de preparer-formalisation-38.mjs absente ou multiple');
  L.splice(k + 1, 0, ...LIGNES_INV); return L.join(eol);
};
const consigner = (docs) => ({ [ETAT]: journal(rubriques(docs[ETAT], ETAT)), [ROAD]: rubriques(docs[ROAD], ROAD), [BIL]: bilan(docs[BIL]), [INV]: inventaire(docs[INV]) });

// (1)-(2) Versions proposées et différences
const reel = Object.fromEntries(DOCS.map((p) => [p, lire(p)])); const prop = consigner(reel);
mkdirSync(join(root, OUT, 'diffs'), { recursive: true });
const bloc = (t) => { const s = t.replace(/\r/g, ''); return s.slice(s.indexOf('<!-- a2-05:etat:debut'), s.indexOf('<!-- a2-05:etat:fin -->') + 24); };
for (const p of DOCS) {
  const nom = p.split('/').pop(); writeFileSync(join(root, OUT, nom), prop[p]);
  const d = spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', p, OUT + '/' + nom], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
  writeFileSync(join(root, OUT, 'diffs', nom + '.diff'), d.stdout);
  const n = (c) => d.stdout.split('\n').filter((l) => l.startsWith(c) && !l.startsWith(c + c + c + ' ')).length;
  ok(d.status === 1 && prop[p].includes('\r\n') === reel[p].includes('\r\n'), 'proposé : ' + p, '+' + n('+') + ' / -' + n('-') + ' lignes ; fins de ligne ' + (reel[p].includes('\r\n') ? 'CRLF' : 'LF') + ' conservées ; ' + shaT(prop[p]).slice(0, 12) + '…');
}
ok([ETAT, ROAD].every((p) => bloc(prop[p]) === bloc(reel[p]) && bloc(prop[p]).includes('empreinte=dea26959920c491d ')), 'blocs a2-05:etat non touchés par la consignation (marqueur dea26959920c491d)');
const pa = (t) => (t.match(/^- \*\*Prochaine action\.\*\*[^\r\n]*/m) ?? [''])[0];
ok(pa(prop[ETAT]) === pa(prop[ROAD]) && pa(prop[ETAT]).startsWith(N_PA) && !/synchronisation/.test(pa(prop[ETAT])), '« Prochaine action » identique dans les deux documents proposés ; la synchronisation n\'y figure plus');
const seg = (t) => t.slice(t.indexOf('- **Terminé et arbitré.**'), t.indexOf('- **Prochaine action.**')).replace(/\r/g, '');
ok(seg(prop[ETAT]) === seg(prop[ROAD]), 'rubriques « Terminé et arbitré » à « Reste à faire » identiques dans les deux documents proposés');
ok([ETAT, ROAD].every((p) => !seg(prop[p]).includes('restant à effectuer')), 'rubrique d\'état courant : plus de mention « restant à effectuer »');
ok(prop[ETAT].replace(/\r/g, '').startsWith(reel[ETAT].replace(/\r/g, '').replace(A_RUB, N_RUB).replace(A_PA, N_PA).replace(/\n+$/, '')), 'journal : lignes existantes inchangées (la ligne du 2026-10-28 déjà écrite comprise) ; une ligne ajoutée à la fin');
ok(!S899.some((l) => /^\| /.test(l)), '§8.99 : aucune ligne de tableau (comptage des corrections et des réservations inchangé)');
ok(prop[BIL].startsWith(reel[BIL].replace(/(\r?\n)+$/, '')), 'bilan : texte existant préfixe exact (§8.98 et antérieurs inchangés)');

// (3) Essai dans un clone git jetable
const lancer = (C, s, ...a) => { const r = spawnSync(process.execPath, [join(C, s), C, ...a], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const tmp = mkdtempSync(join(tmpdir(), 'ocha-consignation-sync-38-'));
const C = join(tmp, 'essai'); const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0, 'clone jetable', 'code ' + cl.status);
for (const p of DOCS) writeFileSync(join(C, p), prop[p]);
const r = { rel: lancer(C, 'a2-05-travail/controle-relais-allege.mjs', '--apres-application'), emp: lancer(C, 'a2-05-travail/empreintes-lot3.mjs'), cbp: lancer(C, 'a2-05-travail/controle-bilan-pilote.mjs'), rec5: lancer(C, 'a2-05-travail/recalcul-T5-perimetre.mjs'), rec6: lancer(C, 'a2-05-travail/recalcul-T6-perimetre.mjs'), cov: lancer(C, 'a2-05-travail/couverture-lot3.mjs') };
for (const [k, v] of Object.entries(r)) { console.log('   essai ' + k + ' (code ' + v.code + ') : ' + v.out.split('\n').pop()); for (const l of v.out.split('\n').filter((x) => /^(ÉCART|\s*FAUX)/.test(x))) console.log('      ' + l.trim().slice(0, 240)); }
const q = (n) => (r.rel.out.match(new RegExp('^\\s+juste Q' + n + ' .*→ (.*)$', 'm')) ?? [])[1];
const conformes = (v) => v.out.split('\n').filter((l) => l.startsWith('conforme ')).length;
ok(r.rel.code === 0 && r.rel.out.split('\n').pop() === '30 conformes sur 30', 'essai : relais --apres-application 30 sur 30');
ok(r.emp.code === 0 && r.emp.out === 'empreintes : 38 rapports contrôlés, identiques', 'essai : 38 empreintes conformes');
ok(r.cbp.code === 0 && conformes(r.cbp) === 42 && r.rec5.code === 0 && conformes(r.rec5) === 16 && r.rec6.code === 0 && conformes(r.rec6) === 24, 'essai : contrôle du bilan du pilote 42/42 ; recalculs de T5 16/16 et de T6 24/24');
ok(r.cov.code === 0 && /^couverture : 274 arbitrés, 0 proposés, 103 restants, sur 377/.test(r.cov.out) && q(4) === '196/172/0' && q(5) === 'V1-24' && q(11) === '38', 'essai : 274/377 ; 196 dans 172 ENTRY, aucune appliquée ; V1-24 libre ; 38 rapports protégés');
const ap = lancer(C, 'a2-05-travail/sync-stable.mjs', '--apercu'); const texte = readFileSync(join(C, 'a2-05-travail/sync-stable-apercu.md'), 'utf8');
const lignes = texte.split('\n').filter((l) => /^[-+]/.test(l) && !/^(--- a\/|\+\+\+ b\/)/.test(l));
ok(ap.code === 0 && lignes.length === 0, 'essai : aperçu de synchronisation vide après la consignation (blocs toujours à jour)', ap.out.split('\n').pop());
const chk = spawnSync('git', ['diff', '--check'], { cwd: C, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'essai : git diff --check (commande de référence)', 'code ' + chk.status);
rmSync(tmp, { recursive: true, force: true });

// (4) Dépôt réel inchangé
const reel1 = instantane(); const ch = [...new Set([...Object.keys(reel0), ...Object.keys(reel1)])].filter((p) => reel0[p] !== reel1[p]);
ok(ch.length === 0, 'dépôt réel inchangé (arbre de travail entier, hors dossier de la consignation)', ch.join(', ') || Object.keys(reel1).length + ' fichiers identiques');
console.log('\npréparation conforme');
