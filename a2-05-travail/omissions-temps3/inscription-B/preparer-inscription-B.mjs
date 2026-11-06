// A2-05 · recherche d'omissions d'`interrogatif` : préparation de l'inscription documentaire de l'arbitrage du groupe B, EN PROPOSITION. Rien n'est appliqué.
// (1) Préconditions sur le dépôt réel (état d'arrivée de l'inscription A). (2) Versions proposées, en mémoire : ETAT-ACTUEL.md et ROADMAP.md (remplacements ciblés
// à ancre unique), bilan (§8.123 ajouté à la fin) ; deux documents neufs dans docs/rapports/ : périmètre de B accepté, rapport de B arbitré (statut et §0 ajoutés ;
// texte livré conservé). (3) Clone jetable : état final simulé ; relais (C9b seul), contrôles, tests ; sabotages. (4) Écriture dans proposition/ seulement si aucun écart.
// Usage : node a2-05-travail/omissions-temps3/inscription-B/preparer-inscription-B.mjs <racine du dépôt>. Code 1 au premier écart, rien n'est écrit.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', O = W + 'omissions-temps3/', I = O + 'inscription-B/', PROP = I + 'proposition/';
const { cloner, controler } = await import(pathToFileURL(join(root, W + 'arbitrage-F/essai-clone.mjs')));
const { diffBrut } = await import(pathToFileURL(join(root, W + 'arbitrage-F/moteur-application.mjs')));
const { ajouterLigneJournal } = await import(pathToFileURL(join(root, W + 'sync-stable.mjs')));
const CLOTURE = '39cce138f12c50d32675cc4acff5237883eec0b1', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const CIBLES = ['ETAT-ACTUEL.md', 'ROADMAP.md', BIL];
const RN = 'docs/rapports/etape2-A2-05-omissions-interrogatif-', NP = RN + 'B-perimetre.md', NR = RN + 'B.md', NOUVEAUX = [NP, NR];
const INSCRITS_A = { [RN + 'mesure.md']: '03d5198e9df16ca92fac46c57fde70d9fc4bc9f841b95541fbe3560ed9d19ab1', [RN + 'A-perimetre.md']: 'dedd75d90a5cfe8cfc64f72ec00274f49262d1a8290211b51844a1ff208e9afd', [RN + 'A.md']: 'e5e168e3c4cacf8ee8b77b8978965ec3cda7ef5a81acebb3089653d6d50c2b6b' };
// Départ : état d'arrivée de l'inscription A (proposition A, manifeste f3b82a78…, appliquée sur autorisation)
const DEPART = { 'ETAT-ACTUEL.md': '765e786d462d65858ed75d737c5b6348b6d68411d6bcc15bbf821aa5f51bf0bc', 'ROADMAP.md': '8295a6ccf60d9795f9bed3309d3fd39e46508b28bd5a6f3e7a4f3ec11ac258b0', [BIL]: '15c248f9cff5bd3691626582e903d607a058506c679966bb01903f630ddb58c0' };
const SOURCES = { [O + 'proposition-perimetre-B.md']: 'b61bd5d891603a4dfb2c3a748768dc744ccac0212e51fb079a1516ab9a2ec195', [O + 'perimetre-B.json']: '20f8745f9e729f830248d8a1eec76db51ce62e84e1e1bc511bb43d551943cdcd',
  [O + 'dossier-B.md']: 'faf2460cfb17f7d9e05376fee7adbcdc91f4ff523b679307e979dc1a95318f1f', [O + 'rapport-relecture-B.md']: '38eca05a3c998be46427f8c2e832bca7f3b744fd1fbaeac3385c07fa0b0fac3d',
  [O + 'analyse-B.json']: 'ea7692cdc12be7a184087966daaef81020d86f7a4fd6b84af64bc527c1dc1f4c', [O + 'fiches-B.md']: 'd25e8fe7603e482cc30166f61be0eb42f31e4562a18311916eb1681db946f93f', [O + 'decoupage.json']: '56da6952d14259325eefee43cbfe0f2bb7cc6a5060a85e72f2df6c1ad97acc46' };
const sha = (b) => createHash('sha256').update(b).digest('hex'); const shaF = (r, p) => sha(readFileSync(join(r, p)));
const lire = (p) => readFileSync(join(root, p), 'utf8');
const git = (...a) => spawnSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 });
const trace = []; let ko = 0;
const dire = (l) => { const m = l.split(root).join('<racine>'); console.log(m); trace.push(m); };
const ok = (b, l, d) => { dire((b ? 'conforme ' : 'ÉCART    ') + l + (d ? ' : ' + d : '')); if (!b) ko++; return b; };
const arret = () => { if (ko) { dire('ARRÊT : ' + ko + ' écart(s), rien n\'est écrit'); process.exit(1); } };
const LFs = (t) => t.replace(/\r\n/g, '\n'); const eolDe = (t) => (t.includes('\r\n') ? '\r\n' : '\n'); const avecEol = (t, e) => (e === '\r\n' ? t.replace(/\n/g, '\r\n') : t);
const remplacer = (nom, t, a, b) => { const n = t.split(a).length - 1; ok(n === 1 && !t.includes(b), 'ancre unique, remplacement absent : ' + nom, n + ' occurrence(s)'); return t.replace(a, () => b); };

// --- 1. Préconditions
dire('--- Préconditions sur le dépôt réel');
ok(git('rev-parse', 'HEAD').stdout.trim() === CLOTURE, 'HEAD à 39cce13');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'index vide');
ok(!existsSync(join(root, PROP)), 'dossier de proposition absent');
for (const p of CIBLES) ok(shaF(root, p) === DEPART[p], 'empreinte de départ (arrivée de l\'inscription A) : ' + p, shaF(root, p).slice(0, 16));
for (const [p, h] of Object.entries(INSCRITS_A)) ok(existsSync(join(root, p)) && shaF(root, p) === h, 'document inscrit avec A, inchangé : ' + p, h.slice(0, 16));
for (const [p, h] of Object.entries(SOURCES)) ok(shaF(root, p) === h, 'source relue et arbitrée, inchangée : ' + p, h.slice(0, 16));
for (const p of NOUVEAUX) ok(!existsSync(join(root, p)), 'document neuf absent : ' + p);
ok(lire(BIL).includes('### 8.122 ') && !lire(BIL).includes('### 8.123 '), 'bilan : §8.122 présent, sans §8.123');
arret();

// --- 2. Versions proposées, en mémoire
dire('--- Versions proposées, en mémoire');
const V = {}; const eol = Object.fromEntries(CIBLES.map((p) => [p, eolDe(lire(p))]));
const AVANT_1 = (t) => t.search(/^## 1\. /m);
const insererZero = (nom, t, statutAvant, statutApres, zero) => { let u = remplacer(nom + ', statut', t, statutAvant, statutApres); const i = AVANT_1(u); ok(i > 0 && !/^## 0\. /m.test(u), nom + ' : §0 inséré avant le §1'); return u.slice(0, i) + zero.join('\n') + '\n\n' + u.slice(i); };
// 2.1 Périmètre de B accepté
V[NP] = insererZero('périmètre B', LFs(lire(O + 'proposition-perimetre-B.md')),
  "**Statut** : **proposition, non arbitrée.** Aucun sens du groupe B n'est relu, aucun verdict lexical n'est pris, aucune donnée n'est modifiée.",
  "**Statut** : **périmètre accepté le 2026-11-04 (§0).** La proposition est conservée telle qu'elle a été livrée ; aucune donnée n'est modifiée.",
  ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-04 (ChatGPT, par délégation ; relayé par l\'utilisateur) : « QB-1 : OUI — périmètre B accepté, 18 sens dans 15 ENTRY, thème T2-journal. » « QB-2 : OUI — méthode R1 à R5 et trois conclusions possibles, dans un seul rapport. » « QB-3 : OUI — les huit sens déjà présents dans le lot 3 sont réexaminés uniquement sur la fonction interrogative, sans rouvrir leurs anciens arbitrages. » « QB-4 : OUI — les décisions D0637, D0672 et D0677 sont confrontées à A10 en R5, sans réécriture. Toute discordance sera signalée séparément. » L\'ouverture de la relecture (QB-5) a été autorisée distinctement, après l\'application de l\'inscription du groupe A : « J\'autorise maintenant, distinctement, l\'ouverture de la relecture lexicale du groupe B, strictement limitée aux 18 sens dans 15 ENTRY du périmètre déjà accepté. »', '',
    '**Effets.** Le périmètre du groupe B (18 sens, 15 ENTRY, thème T2-journal) et sa méthode sont acceptés. Les annexes citées sont dans le dossier de travail `' + O + '` : `dossier-B.md` (SHA-256 `' + SOURCES[O + 'dossier-B.md'] + '`) et `perimetre-B.json` (SHA-256 `' + SOURCES[O + 'perimetre-B.json'] + '`). Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée.']);
// 2.2 Rapport de B arbitré
V[NR] = insererZero('rapport B', LFs(lire(O + 'rapport-relecture-B.md')),
  "**Statut** : **proposition, non arbitrée.** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est appliquée.",
  "**Statut** : **arbitré le 2026-11-04 (§0).** Aucune donnée, norme, décision historique ni correction retenue n'est modifiée ; aucune omission n'est retenue.",
  ['## 0. Arbitrage', '',
    'Arbitrage du 2026-11-04 (ChatGPT, par délégation, après avis favorable ; relayé par l\'utilisateur) : « 1. Les 18 sens sont confirmés « ne relève pas de la fonction interrogatif ». » « 2. Aucune omission n\'est retenue et aucun sens ne reste à arbitrer dans le groupe B. » « 3. QB-4 : aucune discordance normative retenue pour D0637, D0672 et D0677. La formulation ambiguë est conservée comme observation de rédaction, sans modification des décisions historiques. » « 4. Les anomalies des anciens exemples sont conservées comme observations hors périmètre, sans correction à ce stade. » « 5. Les anciens verdicts du lot 3 et les 204 corrections retenues restent inchangés. »', '',
    '**Effets.** 18 sens arbitrés « ne relève pas de la fonction » ; aucune omission retenue, aucune décision nouvelle, aucune donnée modifiée. D0637, D0672 et D0677 ne sont ni réécrites ni rouvertes ; la formule « démonstratif ou interrogatif d\'usage général » reste une observation de rédaction (§3). Les observations hors périmètre (§5 : 締める, スプーン, こちら, かかる) sont conservées sans correction. La recherche d\'omissions compte 57 sens relus sur 234 candidats (A 39, B 18) ; 177 restent, dans les groupes C à E ; ce décompte reste séparé des 377 sens du lot 3 et du contrôle des 17 porteurs. Le recueil des 15 fiches sources est dans `' + O + 'fiches-B.md` (SHA-256 `' + SOURCES[O + 'fiches-B.md'] + '`) ; l\'analyse, dans `' + O + 'analyse-B.json` (SHA-256 `' + SOURCES[O + 'analyse-B.json'] + '`). Le texte qui suit est la proposition, conservée telle qu\'elle a été livrée.']);
// 2.3 Bilan : §8.123, à la fin
{
  const t = LFs(lire(BIL)); ok(t.endsWith('\n') && !t.endsWith('\n\n'), 'bilan : fin de fichier attendue');
  const P = ['### 8.123 Recherche d\'omissions d\'`interrogatif` (A10, §8) : groupe B arbitré (2026-11-04)', '',
    '**Périmètre.** 18 sens dans 15 ENTRY, thème T2-journal (une décision de journal de l\'ENTRY emploie le vocabulaire de la question) ; accepté le 2026-11-04 avec sa méthode, les huit sens communs au lot 3 examinés sur la seule fonction, D0637, D0672 et D0677 confrontées à A10 sans réécriture (`docs/rapports/etape2-A2-05-omissions-interrogatif-B-perimetre.md`, §0).', '',
    '**Groupe B arbitré le 2026-11-04** (`docs/rapports/etape2-A2-05-omissions-interrogatif-B.md`, §0) : 18 sens relus sur leur fiche entière, leurs anciens exemples, leur ENTRY publiée et toutes leurs décisions, selon la grille R1 à R5 ; **18 « ne relève pas de la fonction », aucune omission retenue, aucun sens à arbitrer**. Les dix-sept décisions relevées par le filtre emploient « demander » ou « question » au sens courant ; aucune ne vaut preuve. **QB-4** : aucune discordance normative retenue pour D0637, D0672 et D0677 ; la formule « démonstratif ou interrogatif d\'usage général » est conservée comme observation de rédaction, sans modification des décisions historiques. Les verdicts du lot 3 (huit sens communs) et les 204 corrections retenues restent inchangés. Quatre observations hors périmètre (anciens exemples de 締める, スプーン, こちら et かかる) sont conservées sans correction.', '',
    '**Décomptes séparés.** Recherche d\'omissions : 57 relus sur 234 candidats (A 39, B 18) ; 177 restent (groupes C à E) ; 573 non relevés, non relus. Ces décomptes ne s\'additionnent ni aux 377 sens du lot 3 ni au contrôle des 17 porteurs.', '',
    '**Non modifiés.** Données lexicales, normes, lots, journal, registre des tranches, relais, `sync-stable.mjs`, manifeste d\'empreintes (47 entrées) ; aucune correction appliquée. Les deux documents neufs de `docs/rapports/` ne sont pas protégés au manifeste d\'empreintes, comme les trois inscrits avec le groupe A (limite documentaire suivie séparément). Aucun `git add`, commit ni push.', ''];
  V[BIL] = t + '\n' + P.join('\n');
}
// 2.4 Pilotage : mêmes remplacements dans ETAT-ACTUEL.md et ROADMAP.md
const Q = [
  ['**groupe A arbitré le\n  2026-11-04** (39 sens, aucune omission retenue) ; 195 candidats restent, dans les groupes B à E ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122).',
    '**groupes A et B arbitrés le\n  2026-11-04** (57 sens : A 39, B 18 ; aucune omission retenue) ; 177 candidats restent, dans les groupes C à E ;\n  elle est comptabilisée à part, hors des 377 (bilan du volet 2, §8.122 et §8.123).'],
  ['La décision sur le périmètre du groupe B de la recherche d\'omissions d\'A10 (18 sens, 15 ENTRY ; groupe A arbitré, `docs/rapports/etape2-A2-05-omissions-interrogatif-A.md`, §0), puis, sur autorisation distincte, sa relecture ; puis les groupes C à E, chacun sur autorisation distincte ; la recherche reste distincte des 377.',
    'La décision sur le périmètre du groupe C de la recherche d\'omissions d\'A10 (3 sens, 2 ENTRY ; groupe B arbitré, `docs/rapports/etape2-A2-05-omissions-interrogatif-B.md`, §0), puis, sur autorisation distincte, sa relecture ; puis les groupes D et E, chacun sur autorisation distincte ; la recherche reste distincte des 377.'],
];
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) {
  let t = LFs(lire(p));
  for (const [k, [a, b]] of Q.entries()) t = remplacer(p + ', Q' + (k + 1), t, a, b);
  if (p === 'ROADMAP.md') {
    ok(t.includes('**Dernière mise à jour :** 2026-11-04 ('), 'ROADMAP.md : date déjà au 2026-11-04, inchangée');
    t = remplacer(p + ', en-tête', t, 'recherche d\'omissions d\'`interrogatif` ouverte, groupe A arbitré le 2026-11-04 ;', 'recherche d\'omissions d\'`interrogatif` ouverte, groupes A et B arbitrés le 2026-11-04 ;');
  } else {
    const L = '| 2026-11-04 | 2 · A2-05 | **Recherche d\'omissions d\'A10 : groupe B relu et arbitré** (18 sens, 15 ENTRY, thème T2-journal : 18 « ne relève pas de la fonction », aucune omission retenue, aucun à arbitrer) ; périmètre et méthode acceptés ; QB-4 : aucune discordance normative pour D0637, D0672 et D0677, formule conservée comme observation de rédaction ; décisions historiques, verdicts du lot 3 et corrections retenues inchangés ; quatre observations hors périmètre conservées ; 57 relus sur 234, 177 restent (C à E) ; deux documents neufs dans `docs/rapports/` ; §8.123. **377/377 ; 204 corrections dans 177 ENTRY, non appliquées ; V1-32 libre ; 47 empreintes.** | non committé |';
    const t2 = LFs(ajouterLigneJournal(t, L)); ok(t2 !== t && t2.split(L).length === 2 && t2.trimEnd().endsWith(L), 'ETAT-ACTUEL.md : une ligne de journal ajoutée à la fin du journal'); t = t2;
  }
  V[p] = t;
}
for (const p of CIBLES) V[p] = avecEol(V[p], eol[p]);
arret();

// --- 3. Clone : état final simulé
dire('--- Clone jetable : état final simulé');
const cl = cloner(root); const TOUS = [...CIBLES, ...NOUVEAUX];
const relais = (...o) => { const r = cl.lancer(W + 'controle-relais-allege.mjs', '--apres-application', ...o); const L = r.out.split('\n'); return { code: r.code, fin: L.at(-1), L, ids: L.map((l) => (l.match(/^\s*ÉCART\s+(\S+)/) ?? [])[1]).filter(Boolean).sort().join() }; };
try {
  for (const p of TOUS) cl.ecrire(p, V[p]);
  const ap = cl.lancer(W + 'sync-stable.mjs', '--apercu'); const vide = !readFileSync(cl.f(W + 'sync-stable-apercu.md'), 'utf8').split('\n').some((l) => /^[+-](?![+-])/.test(l));
  ok(ap.code === 0 && vide, 'aperçu de synchronisation vide : le bloc a2-05:etat ne change pas', ap.out.split('\n').pop().slice(0, 100));
  controler(cl, 'état final', ok, { tests: true, chemins: TOUS, attendus: ['C9b'] });
  const r = relais(); ok(r.L.some((l) => /^conforme\s+C8 /.test(l)) && r.L.some((l) => /^conforme\s+C5f /.test(l)) && r.L.some((l) => /^conforme\s+C9a /.test(l)), 'C5f (prochaine action identique), C8 (reprise simulée) et C9a conformes');
  const emp = cl.lancer(W + 'empreintes-lot3.mjs'); ok(emp.code === 0 && emp.out === 'empreintes : 47 rapports contrôlés, identiques', 'empreintes : 47 identiques ; les documents neufs ne sont pas des rapports du lot 3', emp.out);
  const cpo = cl.lancer(W + 'perimetre-F-operationnel/controle-perimetre-operationnel.mjs'); ok(cpo.code === 0 && cpo.out.trim().endsWith('29 conformes sur 29'), 'contrôle du périmètre opérationnel : 29 sur 29');
  const st = spawnSync(process.execPath, ['--input-type=module', '-e', "import {calculerEtat} from './a2-05-travail/sync-stable.mjs'; const v=calculerEtat('.'); console.log(JSON.stringify({arbitres:v.arbitres,restants:v.restants,corrections:v.corrections,entry:v.entry,libre:v.libre,reserves:v.reserves,empreintes:v.empreintes}))"], { cwd: cl.C, encoding: 'utf8' });
  ok(st.stdout.trim() === '{"arbitres":377,"restants":0,"corrections":204,"entry":177,"libre":"V1-32","reserves":["V1-22","V1-23"],"empreintes":47}', 'état calculé inchangé : 377/377 ; 204 corrections dans 177 ENTRY ; V1-32 ; réservés V1-22, V1-23 ; 47 empreintes', st.stdout.trim() || st.stderr.trim().slice(0, 200));
  for (const p of NOUVEAUX) { const t = readFileSync(cl.f(p), 'utf8'); ok(!t.includes('\r') && /^## 0\. /m.test(t) && t.split(/^## 0\. /m).length === 2, 'document neuf : LF, un seul §0 : ' + p); }
  for (const [p, h] of Object.entries(INSCRITS_A)) ok(shaF(cl.C, p) === h, 'clone : document inscrit avec A, inchangé : ' + p);
  dire('--- Sabotages (chacun rétabli aussitôt)');
  const sabote = (nom, p, fn, attendu) => { const o = readFileSync(cl.f(p)); const m = Buffer.from(fn(o.toString('utf8'))); if (m.equals(o)) { ok(false, nom, 'sabotage sans effet'); return; } writeFileSync(cl.f(p), m); try { const x = relais(); ok(x.ids.split(',').includes(attendu), nom, 'écarts : ' + x.ids); } finally { writeFileSync(cl.f(p), o); } };
  sabote('S1 prochaine action différente dans ROADMAP.md : C5f', 'ROADMAP.md', (t) => t.replace('puis les groupes D et E, chacun', 'puis le groupe D, chacun'), 'C5f');
  sabote('S2 renvoi .md retiré de la prochaine action d\'ETAT-ACTUEL.md : C5f', 'ETAT-ACTUEL.md', (t) => t.replace('`docs/rapports/etape2-A2-05-omissions-interrogatif-B.md`, §0', 'rapport du groupe B, §0'), 'C5f');
  const tem = relais(); ok(tem.ids === 'C9b' && tem.fin === '29 conformes sur 30', 'témoin après sabotages : 29 sur 30, C9b seul', tem.fin);
  for (const p of TOUS) ok(shaF(cl.C, p) === sha(Buffer.from(V[p])), 'clone : version finale intacte : ' + p);
} finally { cl.nettoyer(); }
arret();

// --- 4. Écriture de la proposition
dire('--- Écriture de la proposition');
const M = {}; const table = ['| Fichier | Départ | Proposé | Lignes |', '|---|---|---|---|'];
for (const p of TOUS) { mkdirSync(dirname(join(root, PROP + p)), { recursive: true }); writeFileSync(join(root, PROP + p), V[p]); }
mkdirSync(join(root, PROP + 'diffs'), { recursive: true });
for (const p of CIBLES) {
  const d = diffBrut(root, p, PROP + p); ok(d.status === 1, 'diff produit : ' + p);
  writeFileSync(join(root, PROP + 'diffs/' + p.replaceAll('/', '__') + '.diff'), d.stdout);
  const plus = d.stdout.split('\n').filter((l) => /^\+(?!\+\+)/.test(l)).length, moins = d.stdout.split('\n').filter((l) => /^-(?!--)/.test(l)).length;
  M[p] = { depart: shaF(root, p), propose: shaF(root, PROP + p), diff: sha(d.stdout) };
  table.push('| `' + p + '` | `' + M[p].depart.slice(0, 16) + '…` | `' + M[p].propose.slice(0, 16) + '…` | +' + plus + ' / −' + moins + ' |');
}
for (const p of NOUVEAUX) { M[p] = { depart: null, propose: shaF(root, PROP + p) }; table.push('| `' + p + '` (neuf) | — | `' + M[p].propose.slice(0, 16) + '…` | ' + V[p].split('\n').length + ' lignes |'); }
writeFileSync(join(root, PROP + 'manifeste.json'), JSON.stringify(M, null, 1) + '\n');
writeFileSync(join(root, PROP + 'table-diffs.md'), table.join('\n') + '\n');
ok(!git('diff', '--cached', '--name-only').stdout.trim(), 'index réel toujours vide');
ok(CIBLES.every((p) => shaF(root, p) === DEPART[p]) && NOUVEAUX.every((p) => !existsSync(join(root, p))), 'dépôt réel : fichiers visés inchangés, documents neufs absents');
dire('manifeste de la proposition : ' + shaF(root, PROP + 'manifeste.json'));
writeFileSync(join(root, I + 'sortie-preparation.txt'), trace.join('\n') + '\n' + (ko ? 'préparation NON conforme' : 'préparation conforme') + '\n');
console.log(ko ? 'préparation NON conforme' : 'préparation conforme'); process.exit(ko ? 1 : 0);
