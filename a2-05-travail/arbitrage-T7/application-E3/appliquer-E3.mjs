// A2-05 · volet 1 · lot 3 : application de l'état E3 de la consolidation de T7 (autorisation du 2026-10-30 : « J'accepte E2 et autorise
// exclusivement E3 : l'ajout du périmètre accepté T7 comme 40e entrée du manifeste. »). Dérivé de application-E2/appliquer-E2.mjs et de
// preparation-E3/preparer-E3.mjs. Une seule écriture : empreintes-lot3.mjs --ajouter, lancé une fois sur le dépôt réel. Ni synchronisation
// (E4 : aperçu seulement), ni consignation. (1) Préconditions, sans écriture : 39 empreintes conformes, dans leur ordre et à leurs valeurs ;
// périmètre accepté et proposition sauvegardée intacts ; recalcul de T7 installé ; relais 29 sur 30 (C9a) ; préparation d'E3 relue intacte ;
// aucune modification depuis E2 hors des sorties prévues ; index vide. (2) Prévisualisation dans un clone jetable : seul le périmètre de T7,
// en 40e position, un seul bloc d'ajout ; le manifeste prévu ne diffère de la prévisualisation relue que par la date, celle du jour.
// (3) Sauvegarde du manifeste de départ ; ajout unique ; manifeste écrit identique à la prévisualisation du jour. (4) Contrôles après E3.
// (5) Aperçu E4 sur le dépôt réel, sans application. Arrêt au premier écart, sans réparation ; chemins masqués.
// Usage : node a2-05-travail/arbitrage-T7/application-E3/appliquer-E3.mjs <racine du dépôt>
import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync, copyFileSync, cpSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const root = resolve(process.argv[2] ?? ''); if (!process.argv[2]) throw new Error('argument attendu : racine du dépôt');
const W = 'a2-05-travail/', T7 = W + 'arbitrage-T7/', OUT = T7 + 'application-E3/', PREP = T7 + 'preparation-E3/', APERCU = W + 'sync-stable-apercu.md', DEP = OUT + 'depart/';
const REC = W + 'recalcul-T7-perimetre.mjs', REC_SHA1 = 'c8877283e3864a7e9c9f542a08e74b189aef3c6f4b9e9bfc0abf01e7b75eb91c';
const MAN = W + 'empreintes-rapports-arbitres.json', MAN_SHA = 'eb6599cb5f1a01ec609f5481477853f4def1430c2d5b858c18d7fc00b0a806a2';
const PER = 'docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md', PER_SHA = 'a93a75cc4da86efeeea667aa357dcd457ac7583311d7fad6ce3a0a68f4cf77dc';
const PROP = T7 + 'proposition-T7-perimetre.md', PROP_SHA = '046c68e4c9822ec3c84db47167f7e31d3ec84ae18b5b7f216029e309206bdd45';
const K39 = '4b46ca6736e6ba5256098a0bf6aba5d690f221ea631715f2931aa42b69eacf1f', MARQUEUR = '7a79b16e4641f93f', MARQUEUR4 = '32631bf599ee77a2', PLAN4 = 'd57d97c1e89f746e';
const DATE_PREVUE = '2026-10-30';
// Préparation d'E3 relue (export E2) : manifeste prévisualisé, diff, aperçu prévu
const PREVU = PREP + 'manifeste-prevu.json', PREVU_SHA = 'f5b5be5c3418ebd7f85973a3c43ea9f821c7081aee1685937b4dd62db8cb02d1';
const PREP_SHA = { [PREVU]: PREVU_SHA, [PREP + 'manifeste-39-40.diff']: 'd343d856690a1a45a2e2e4f04dc75cac87bc8729d1fd857019d40dd9b4423103',
  [PREP + 'apercu-prevu-E3.md']: '726eb5d7d434ed1072f0d45882334654776075ef1d7c0300b70e5396ef88b6e0', [PREP + 'preparer-E3.mjs']: '1fc08d39d3d30ad947ebd06707fa03c8f57771544b55af99fb4bf640f0821edf' };
// État E1 : documents appliqués le 2026-10-29 (hors périmètre et proposition, contrôlés à part)
const E1 = {
  [W + 'perimetre-T7.mjs']: '61fbb8a35286e66cd7dfdf68543187a75e321e3aaf1fcdcc5d658d8796b6c818',
  'ETAT-ACTUEL.md': '51e410b7eaf1e5c5d950adcea8938d9f88c0ce75e8061cb158fca0b43a786737',
  'ROADMAP.md': '0497e58a0cefdc67521b4ad3a03df0c5dc1f9a5dc3eb0471bca60ead736bae06',
  'docs/rapports/etape2-A2-05-bilan-volet2.md': 'ee6f63e4afebf19d16d77f0dd30bfae883ef255d83d4afec6e1fda3f8279b3b9',
  [W + 'INVENTAIRE-SCRIPTS.md']: '1ee4d3950f6013946e275f255ed527f7565ddd897789d207a3e58b114dfc5724',
};
// Fichiers suivis modifiés attendus (état depuis le checkpoint B) ; fichiers écrits après E2, prévus
const SUIVIS = ['CLAUDE.md', 'ETAT-ACTUEL.md', 'ROADMAP.md', W + 'INVENTAIRE-SCRIPTS.md', W + 'couverture-lot3.mjs', W + 'empreintes-lot3.mjs', MAN, W + 'lot3-commun-v2.mjs',
  W + 'perimetre-v2.mjs', 'docs/rapports/etape2-A2-05-bilan-volet2.md', 'docs/relecture/note-relais.md', 'docs/relecture/reprise-A2-05.md'];
const E2_FIN = T7 + 'application-E2/sorties/application.txt';
const apresE2 = (p) => p.startsWith(PREP) || p === W + 'note-export-lot3-T7-E2.md' || p === APERCU;
const tmp = mkdtempSync(join(tmpdir(), 'ocha-application-e3-t7-')); const C = join(tmp, 'arbre');
const masquer = (l) => [[root, '<racine>'], [C, '<clone>'], [tmpdir(), '<temp>']].reduce((t, [p, n]) => [p, p.replace(/\\/g, '\\\\'), p.replace(/\\/g, '/'), p.replace(/\\/g, '/').replace(/ /g, '%20')].reduce((u, v) => u.split(v).join(n), t), l);
const log = []; const dire = (l) => { l = masquer(l); console.log(l); log.push(l); };
const fin = (code) => { rmSync(tmp, { recursive: true, force: true }); mkdirSync(join(root, OUT, 'sorties'), { recursive: true }); writeFileSync(join(root, OUT, 'sorties', 'application.txt'), log.join('\n') + '\n'); process.exit(code); };
const ok = (c, quoi, detail) => { dire((c ? 'conforme ' : 'ÉCART    ') + quoi + (detail ? ' : ' + detail : '')); if (!c) { dire('\narrêt au premier écart, sans réparation'); fin(1); } };
process.on('uncaughtException', (e) => { dire('EXCEPTION ' + masquer(String(e?.message ?? e)).slice(0, 200)); ok(false, 'interruption'); });
const shaB = (b) => createHash('sha256').update(b).digest('hex'); const shaR = (base, p) => shaB(readFileSync(join(base, p))); const sha = (p) => shaR(root, p);
const lire = (p) => readFileSync(join(root, p), 'utf8');
const lancer = (base, s, ...a) => { const r = spawnSync(process.execPath, [join(base, s), base, ...a], { cwd: base, encoding: 'utf8', maxBuffer: 1 << 28 }); return { code: r.status, out: ((r.stdout ?? '') + (r.stderr ?? '')).trim() }; };
const ecarts = (r) => r.out.split('\n').filter((l) => /^(ÉCART|\s*FAUX)/.test(l)).map((l) => l.trim());
const montrer = (nom, r) => { dire('   ' + nom + ' (code ' + r.code + ') : ' + (r.out.split('\n').filter((l) => !/^\s+at /.test(l)).pop() ?? '')); for (const e of ecarts(r)) dire('      ' + e.slice(0, 260)); };
const conformes = (r) => r.out.split('\n').filter((l) => l.startsWith('conforme ')).length;
const q = (r, n) => (r.out.match(new RegExp('^\\s+juste Q' + n + ' .*→ (.*)$', 'm')) ?? [])[1];
const gitDiff = (a, b) => spawnSync('git', ['-c', 'core.autocrlf=false', 'diff', '--no-index', '--no-color', '--', a, b], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }).stdout;
const mtimes = {}; const instantane = () => { const h = {}; const marcher = (d) => { for (const e of readdirSync(join(root, d))) { const p = d ? d + '/' + e : e;
  if (!d && ['.git', 'node_modules', 'chatgpt-relecture'].includes(e)) continue; if (p.endsWith('.zip') || p + '/' === OUT) continue;
  const s = statSync(join(root, p)); if (s.isDirectory()) marcher(p); else { h[p] = sha(p); mtimes[p] = s.mtimeMs; } } }; marcher(''); return h; };
const differents = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((p) => a[p] !== b[p]).sort();
const lignesPM = (t) => t.split('\n').filter((l) => /^[-+]/.test(l) && !/^(--- a\/|\+\+\+ b\/)/.test(l));
const bloc = (t) => { const s = t.replace(/\r/g, ''); return s.slice(s.indexOf('<!-- a2-05:etat:debut'), s.indexOf('<!-- a2-05:etat:fin -->') + 24); };
const index = () => spawnSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' });
const initial = instantane();

dire('# Préconditions (aucune écriture)');
const m0 = JSON.parse(lire(MAN)); const c0 = Object.keys(m0.empreintes);
ok(sha(MAN) === MAN_SHA, 'manifeste à son empreinte complète', MAN_SHA);
ok(c0.length === 39 && shaB(c0.join('\n')) === K39 && !c0.includes(PER), '39 entrées dans leur ordre (liste fixée par son empreinte) ; périmètre de T7 absent', K39.slice(0, 12) + '…');
const emp0 = lancer(root, W + 'empreintes-lot3.mjs');
ok(emp0.code === 0 && emp0.out === 'empreintes : 39 rapports contrôlés, identiques ; rapports arbitrés hors du manifeste : ' + PER, '39 empreintes recalculées, toutes conformes à leurs valeurs ; seul le périmètre accepté de T7 hors du manifeste', emp0.out);
ok(sha(PER) === PER_SHA, PER + ' : périmètre accepté intact, à son empreinte complète', PER_SHA);
ok(sha(PROP) === PROP_SHA, PROP + ' : proposition originale sauvegardée intacte', PROP_SHA);
ok(sha(REC) === REC_SHA1, REC + ' : recalcul de T7 installé (E2)', REC_SHA1);
for (const [p, h] of Object.entries(E1)) ok(sha(p) === h, p + ' : inchangé depuis E1', h.slice(0, 12) + '…');
const t = Object.fromEntries(['ETAT-ACTUEL.md', 'ROADMAP.md'].map((p) => [p, lire(p)]));
ok(Object.values(t).every((x) => bloc(x).includes('empreinte=' + MARQUEUR + ' ')) && bloc(t['ETAT-ACTUEL.md']) === bloc(t['ROADMAP.md']), 'blocs a2-05:etat identiques, au marqueur ' + MARQUEUR);
for (const [p, h] of Object.entries(PREP_SHA)) ok(sha(p) === h, p + ' : préparation relue intacte', h.slice(0, 12) + '…');
const rel0 = lancer(root, W + 'controle-relais-allege.mjs', '--apres-application'); const ec0 = ecarts(rel0).map((l) => (l.match(/^ÉCART\s+(C\w+)/) ?? [])[1]);
ok(rel0.out.split('\n').pop() === '29 conformes sur 30' && JSON.stringify(ec0) === '["C9a"]', 'relais 29 sur 30 avant E3, C9a seul');
const r70 = lancer(root, REC); const e70 = ecarts(r70);
ok(r70.code === 1 && conformes(r70) === 25 && e70.length === 1 && e70[0].endsWith(': 39 entrées ; 39 premières 4b46ca6736e6… ; périmètre de T7 : hors du manifeste ; différentes : aucune'), 'recalcul de T7 avant E3 : 25 conformes, un seul écart (40e entrée manquante)');
const st = spawnSync('git', ['-c', 'core.quotepath=false', 'status', '--porcelain', '--untracked-files=no'], { cwd: root, encoding: 'utf8' });
const suivis = st.stdout.split('\n').filter(Boolean).map((l) => l.slice(3)).sort();
ok(st.status === 0 && JSON.stringify(suivis) === JSON.stringify([...SUIVIS].sort()) && st.stdout.split('\n').filter(Boolean).every((l) => l.startsWith(' M ')), 'fichiers suivis : les douze modifications attendues, aucune autre, aucune indexée', suivis.length + ' fichiers');
const limite = statSync(join(root, E2_FIN)).mtimeMs; const tardifs = Object.keys(initial).filter((p) => mtimes[p] > limite && !p.startsWith(T7 + 'application-E2/'));
ok(tardifs.every(apresE2), 'aucune modification depuis la fin d\'E2 hors des sorties prévues (préparation d\'E3, note d\'export E2, aperçu régénéré)', tardifs.length + ' fichier(s) : ' + tardifs.join(', '));
const idx0 = index(); ok(idx0.status === 0 && idx0.stdout.trim() === '', 'index vide avant l\'écriture');
const ch0 = differents(initial, instantane()); ok(ch0.every((p) => p === APERCU) && sha(MAN) === MAN_SHA, 'préconditions sans écriture', ch0.join(', ') || 'aucun fichier changé');

dire('\n# Prévisualisation de l\'ajout (clone jetable)');
const cl = spawnSync('git', ['clone', '--quiet', '--shared', '--no-checkout', root, C], { encoding: 'utf8' }); spawnSync('git', ['read-tree', 'HEAD'], { cwd: C });
for (const e of readdirSync(root)) if (!['.git', 'node_modules', 'chatgpt-relecture'].includes(e) && !e.endsWith('.zip')) cpSync(join(root, e), join(C, e), { recursive: true });
ok(cl.status === 0 && shaR(C, MAN) === MAN_SHA && shaR(C, REC) === REC_SHA1, 'clone jetable recouvert de l\'arbre de travail (état E2)', 'code ' + cl.status);
const ajC = lancer(C, W + 'empreintes-lot3.mjs', '--ajouter');
ok(ajC.code === 0 && ajC.out === 'manifeste : 1 rapport(s) ajouté(s) : ' + PER, 'prévisualisation : seul le périmètre accepté de T7 serait ajouté', ajC.out);
const brut = readFileSync(join(C, MAN), 'utf8'); const m1 = JSON.parse(brut); const c1 = Object.keys(m1.empreintes); const jour = m1.ajouts.at(-1).date;
ok(c1.length === 40 && c0.every((p, i) => c1[i] === p && m1.empreintes[p] === m0.empreintes[p]) && c1[39] === PER && m1.empreintes[PER] === PER_SHA, 'prévisualisation : 40 entrées ; les 39 précédentes inchangées, en valeur et en ordre ; 40e = périmètre accepté de T7', PER_SHA.slice(0, 12) + '…');
ok(m1.ajouts.length === m0.ajouts.length + 1 && JSON.stringify(m1.ajouts.slice(0, -1)) === JSON.stringify(m0.ajouts) && JSON.stringify(m1.ajouts.at(-1).chemins) === JSON.stringify([PER]), 'prévisualisation : un seul bloc nouveau dans « ajouts », historique inchangé');
for (const k of ['genere_par', 'etabli_le', 'note']) ok(m1[k] === m0[k], 'prévisualisation : champ « ' + k + ' » inchangé');
const aujourdhui = new Date().toISOString().slice(0, 10);
ok(jour === aujourdhui, 'date de l\'ajout = jour de l\'exécution réelle', jour);
const prevu = lire(PREVU); const motif = (d) => '"date": "' + d + '",\n   "chemins": [\n    "' + PER;
ok(prevu.split(motif(DATE_PREVUE)).length === 2 && brut === prevu.replace(motif(DATE_PREVUE), motif(jour)), 'prévisualisation du jour = manifeste prévu relu (f5b5be5c…)' + (jour === DATE_PREVUE ? ', octet pour octet' : ', à la date près'), jour === DATE_PREVUE ? 'identique' : 'seule différence : ' + DATE_PREVUE + ' → ' + jour);
const brutSha = shaB(brut);

dire('\n# Sauvegarde du manifeste de départ');
ok(!existsSync(join(root, DEP)), DEP + ' absent (aucune sauvegarde antérieure écrasée)');
mkdirSync(join(root, DEP), { recursive: true }); copyFileSync(join(root, MAN), join(root, DEP + 'empreintes-rapports-arbitres.json'));
ok(sha(DEP + 'empreintes-rapports-arbitres.json') === MAN_SHA, 'sauvegarde ' + DEP + 'empreintes-rapports-arbitres.json', MAN_SHA.slice(0, 12) + '…');

dire('\n# E3 : ajout unique (empreintes-lot3.mjs --ajouter, dépôt réel)');
const aj = lancer(root, W + 'empreintes-lot3.mjs', '--ajouter');
ok(aj.code === 0 && aj.out === 'manifeste : 1 rapport(s) ajouté(s) : ' + PER, 'ajout : seul le périmètre accepté de T7', aj.out);
ok(lire(MAN) === brut, 'manifeste écrit identique octet pour octet à la prévisualisation du jour', brutSha);
const m2 = JSON.parse(lire(MAN)); const c2 = Object.keys(m2.empreintes);
ok(c2.length === 40 && shaB(c2.slice(0, 39).join('\n')) === K39 && c0.every((p) => m2.empreintes[p] === m0.empreintes[p]) && c2[39] === PER && m2.empreintes[PER] === PER_SHA, '40 entrées ; les 39 précédentes intactes, en valeur et en ordre ; 40e = périmètre accepté de T7');
mkdirSync(join(root, OUT, 'diffs-reels'), { recursive: true }); mkdirSync(join(root, OUT, 'sorties'), { recursive: true });
const dreel = gitDiff(DEP + 'empreintes-rapports-arbitres.json', MAN); writeFileSync(join(root, OUT, 'diffs-reels', 'empreintes-rapports-arbitres.json.diff'), dreel);
const pm = lignesPM(dreel); ok(pm.filter((l) => l[0] === '-').length === 1 && pm.filter((l) => l[0] === '+').length === 8, 'diff réel du manifeste : +8 / -1', shaB(dreel).slice(0, 12) + '…');
const dprep = lire(PREP + 'manifeste-39-40.diff'); const corps = (d) => d.slice(d.indexOf('\n@@') + 1);
ok(corps(dreel) === corps(dprep).replace('"date": "' + DATE_PREVUE + '"', '"date": "' + jour + '"'), 'diff réel = diff prévisualisé relu' + (jour === DATE_PREVUE ? ', hunks identiques' : ', à la date près'));
writeFileSync(join(root, OUT, 'ordre-des-empreintes.md'), '# Ordre des empreintes du manifeste après E3\n\n| n° | rapport | empreinte |\n|---|---|---|\n' + c2.map((p, i) => '| ' + (i + 1) + ' | `' + p + '` | `' + m2.empreintes[p] + '` |').join('\n') + '\n');

dire('\n# Contrôles après E3');
const A = { emp: lancer(root, W + 'empreintes-lot3.mjs'), rec7: lancer(root, REC), rec5: lancer(root, W + 'recalcul-T5-perimetre.mjs'), rec6: lancer(root, W + 'recalcul-T6-perimetre.mjs'), cbp: lancer(root, W + 'controle-bilan-pilote.mjs'), rel: lancer(root, W + 'controle-relais-allege.mjs', '--apres-application'), cov: lancer(root, W + 'couverture-lot3.mjs') };
for (const [k, r] of Object.entries(A)) montrer('après ' + k, r);
writeFileSync(join(root, OUT, 'sorties', 'recalcul-T7-apres-E3.txt'), masquer(A.rec7.out) + '\n');
ok(A.emp.code === 0 && A.emp.out === 'empreintes : 40 rapports contrôlés, identiques', 'manifeste : 40 empreintes conformes ; aucun rapport arbitré hors du manifeste', A.emp.out);
ok(A.rec7.code === 0 && !ecarts(A.rec7).length && conformes(A.rec7) === 26, 'recalcul de T7 : 26/26');
ok(A.rec7.out.includes('conforme manifeste : au moins 40 empreintes recalculées, toutes identiques ; les 39 premières entrées dans leur ordre ; périmètre accepté de T7 protégé (40e entrée) : 40 entrées ; 39 premières 4b46ca6736e6… ; périmètre de T7 : 40e entrée ; différentes : aucune'), 'recalcul de T7 : 40 entrées, 39 premières dans leur ordre, périmètre de T7 en 40e');
ok(A.rec5.code === 0 && !ecarts(A.rec5).length && conformes(A.rec5) === 17, 'recalcul de T5 : 17/17');
ok(A.rec6.code === 0 && !ecarts(A.rec6).length && conformes(A.rec6) === 27, 'recalcul de T6 : 27/27');
ok(A.cbp.code === 0 && !ecarts(A.cbp).length && conformes(A.cbp) === 46, 'contrôle du bilan du pilote : 46/46');
ok(A.rel.code === 0 && A.rel.out.split('\n').pop() === '30 conformes sur 30' && !ecarts(A.rel).length, 'relais --apres-application : 30 sur 30');
ok(A.cov.code === 0 && /^couverture : 296 arbitrés, 0 proposés, 81 restants, sur 377/.test(A.cov.out) && q(A.rel, 2) === '296/377', 'couverture 296/377, 81 restants');
ok(q(A.rel, 4) === '196/172/0' && q(A.rel, 5) === 'V1-24', 'corrections 196 dans 172 ENTRY, aucune appliquée ; V1-24 libre');
const ch1 = differents(initial, instantane());
ok(ch1.includes(MAN) && ch1.every((p) => [MAN, APERCU].includes(p)), 'arbre de travail : seul le manifeste change (plus l\'aperçu régénéré) ; aucun script, rapport protégé, norme, donnée, registre', ch1.join(', '));
const idx = index(); ok(idx.status === 0 && idx.stdout.trim() === '', 'index vide');
const chk = spawnSync('git', ['diff', '--check'], { cwd: root, encoding: 'utf8', maxBuffer: 1 << 28 }); ok(chk.status === 0, 'git diff --check (commande de référence)', 'code ' + chk.status);

dire('\n# E4 : aperçu seulement (dépôt réel, aucune application)');
const ap = lancer(root, W + 'sync-stable.mjs', '--apercu'); const texte = lire(APERCU); writeFileSync(join(root, OUT, 'sorties', 'apercu-E4.md'), masquer(texte));
const plan = (ap.out.match(/plan ([0-9a-f]{16})/) ?? [])[1]; const pm4 = lignesPM(texte);
ok(ap.code === 0 && plan === PLAN4, 'plan de synchronisation', plan);
ok(pm4.length === 8 && pm4.filter((l) => l.startsWith('-<!--')).length === 2 && pm4.filter((l) => l.startsWith('-<!--')).every((l) => l.includes('empreinte=' + MARQUEUR + ' ')) && pm4.filter((l) => l.startsWith('+<!--')).length === 2 && pm4.filter((l) => l.startsWith('+<!--')).every((l) => l.includes('empreinte=' + MARQUEUR4 + ' ')), 'marqueur des deux blocs : ' + MARQUEUR + ' → ' + MARQUEUR4);
ok(pm4.filter((l) => /^-- \*\*Contrôles\*\* : .*manifeste d'empreintes, 39 rapports arbitrés identiques\.$/.test(l)).length === 2 && pm4.filter((l) => /^\+- \*\*Contrôles\*\* : .*manifeste d'empreintes, 40 rapports arbitrés identiques\.$/.test(l)).length === 2, 'ligne « Contrôles » des deux blocs : 39 → 40 empreintes ; aucune autre ligne changée');
ok(texte.includes('296 sens arbitrés sur 377 ; 81 restent') && ['ETAT-ACTUEL.md', 'ROADMAP.md'].every((p) => bloc(lire(p)).includes('296 sens arbitrés sur 377 ; 81 restent') && bloc(lire(p)).includes('196')), 'chiffres inchangés dans les blocs : 296/377, 81 restants, 196 corrections');
ok(texte === lire(PREP + 'apercu-prevu-E3.md'), 'aperçu E4 identique octet pour octet à l\'aperçu prévu relu', '726eb5d7d434…');
const ch2 = differents(initial, instantane()); ok(ch2.every((p) => [MAN, APERCU].includes(p)) && E1['ETAT-ACTUEL.md'] === sha('ETAT-ACTUEL.md') && E1['ROADMAP.md'] === sha('ROADMAP.md'), 'E4 non appliqué : ETAT-ACTUEL.md et ROADMAP.md inchangés');
dire('\nE3 appliqué : contrôles conformes ; aperçu E4 établi, non appliqué');
fin(0);
