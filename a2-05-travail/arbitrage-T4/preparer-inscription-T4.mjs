// A2-05 : préparation de l'inscription de l'arbitrage de T4 (décision du 2026-10-24), EN PROPOSITION : rien n'est écrit dans le dépôt.
// Usage : node a2-05-travail/arbitrage-T4/preparer-inscription-T4.mjs <racine du dépôt> <dossier de sortie, hors du dépôt>
// Dans une copie temporaire de l'arbre : (1) le rapport de T4 est régénéré par le module v2 avec la constante ARBITRAGE ci-dessous, l'état de la
// livraison étant reconstitué (rapport présent, en proposition ; manifeste à 34 entrées, celui de la livraison) ; le résultat doit être exactement la proposition
// relue, à deux différences près : la ligne de statut et le §0 inséré avant le §1 ; (2) le §8.91 (tableau V1-15 à V1-21) est ajouté au bilan du
// volet 2 et les rubriques chiffrées d'ETAT-ACTUEL.md et de ROADMAP.md sont remises aux valeurs attendues ; (3) les outils réels recalculent les
// comptes (couverture, calculerEtat, verifierCoherence, manifeste, contrôle du bilan du pilote, aperçu de synchronisation). Le dépôt réel doit être
// inchangé (empreintes avant et après). Les aperçus sont écrits dans le dossier de sortie. Code 1 au premier écart.
// Révision du 2026-10-24 (numérotation, lecture B) : V1-22 et V1-23 réservés (tableau « réservé » du §8.91, hors des corrections retenues) ;
// dans la copie, sync-stable.mjs est remplacé par sa proposition (arbitrage-T4/proposition-sync-stable.mjs), essayée en non-régression sur
// l'état présent (E0), puis sur l'inscription simulée (V1-24), et soumise à des sabotages (S1 à S9).
import { readFileSync, writeFileSync, mkdtempSync, cpSync, rmSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const [R0, O0] = process.argv.slice(2); if (!R0 || !O0) throw new Error('arguments attendus : racine du dépôt, dossier de sortie');
const root = resolve(R0), out = resolve(O0); if (out.startsWith(root)) throw new Error('le dossier de sortie doit être hors du dépôt'); mkdirSync(out, { recursive: true });
const RAP = 'docs/rapports/etape2-A2-05-volet1-lot3-T4.md', MAN = 'a2-05-travail/empreintes-rapports-arbitres.json', BIL = 'docs/rapports/etape2-A2-05-bilan-volet2.md';
const PROPOSITION = '2e3fcff61bef5d6f0e6d6bb8e4c7e15e564146c55ecf5eb444d24b7a19957448'; // rapport livré et relu
const MANIFESTE = 'e18df7ec75ef'; // manifeste à 34 entrées, celui de la livraison (préfixe)
const sha = (b) => createHash('sha256').update(b).digest('hex');
let ko = 0; const ctl = (ok, l, d) => { if (!ok) ko++; console.log((ok ? 'conforme ' : 'ÉCART    ') + l + ' : ' + d); };
const LFs = (t) => t.replace(/\r\n/g, '\n');

// ---- Les modifications exactes proposées -------------------------------------------------------------------------------------------------
const ARBITRAGE = { date: '2026-10-24', texte: [
  "Arbitrage du 2026-10-24 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Après relecture intégrale des 35 sens, l'arbitrage recommandé diffère de la proposition initiale. **Retenir 28 conformités et 7 écarts.** »",
  '',
  "**28 conformes, 7 écarts, aucun suspendu**, contre 26 conformes et 9 écarts proposés : deux écarts proposés ne sont pas retenus (お風呂, ベッド). La proposition est conservée ci-dessous, telle qu'elle a été livrée ; ses verdicts du §1 et ses fiches d'examen ne sont pas modifiés.",
  '',
  '| Point | Arbitrage |',
  '|---|---|',
  "| **Écarts retenus (7)** | 果物, 鍵, お茶, お酒, 紅茶, 飲み物, 水 : **V1-15 à V1-21 retenues**, telles que proposées (retraits de tags de lieu), non appliquées aux données. Les tags `lieu_restaurant` de お茶, 紅茶 et 水 sont conservés. |",
  "| **お風呂 (`v_208_s1`)** | **Écart proposé non retenu ; V1-22 non retenue, identifiant réservé.** Conforme, avec réserve documentaire : `lieu_hotel` conservé. D0258, décision d'une autre ENTRY (ふろ), mentionne explicitement l'emploi hôtelier de お風呂 ; elle n'est ni réattribuée à お風呂 ni comptée parmi ses décisions applicables. Le tag reste hérité : sa pertinence n'est pas présentée comme démontrée par la fiche. |",
  "| **ベッド (`v_212_s1`)** | **Écart proposé non retenu ; V1-23 non retenue, identifiant réservé.** Conforme, avec réserve documentaire : `lieu_hotel` conservé. D0254, décision d'une autre ENTRY (エレベーター), présente ベッド comme vocabulaire du service hôtelier ; elle n'est ni réattribuée à ベッド ni comptée parmi ses décisions applicables. Le tag reste hérité : sa pertinence n'est pas présentée comme démontrée par la fiche. |",
  "| **Autres conformités (26)** | Retenues telles que proposées, avec leurs réserves (dont les tags fondés sur une décision validée de l'ENTRY : ご飯 sens 1, 料理 sens 2, パン, 牛乳, 飴, エレベーター). Points sans correction confirmés : カレー (D0171 maintenue), 部屋, お手洗い (aucun ajout de tag), トイレ, 電車. |",
  "| **Numérotation** | **V1-22 et V1-23 sont définitivement réservés** aux deux propositions non retenues de T4 (décision du 2026-10-24) : ils ne deviennent pas des corrections retenues et ne seront jamais réattribués ; le prochain identifiant disponible est **V1-24**. |",
  "| **Limites** | Aucun audit transversal des tags ; aucune doctrine nouvelle. |",
  '',
  "**Liste globale : V1-15 à V1-21 s'ajoutent (bilan du volet 2, §8.91), non appliquées ; V1-22 et V1-23 n'y sont pas inscrites, et figurent au tableau des identifiants réservés du même §8.91.** Comptes attendus par l'arbitrage, calculés par les outils et non imposés à la main : 252 sens arbitrés sur 377, 125 restants ; bloc B, 148 sur 148 ; 196 corrections dans 172 ENTRY ; prochain identifiant disponible : V1-24.",
] };
const S891 = `### 8.91 Volet 1, lot 3 : T4 arbitrée, 28 conformes et 7 écarts ; V1-15 à V1-21 retenues ; V1-22 et V1-23 non retenues (2026-10-24)

Arbitrage du 2026-10-24 (ChatGPT, par délégation ; relayé par l'utilisateur) : « Après relecture intégrale des 35 sens, l'arbitrage recommandé diffère de la proposition initiale. **Retenir 28 conformités et 7 écarts.** » ; « Retenir V1-15 à V1-21, conformément aux retraits proposés dans le rapport T4, sans les appliquer aux données. » ; « **お風呂 : ne pas retenir V1-22.** » ; « **ベッド : ne pas retenir V1-23.** » Détail dans \`docs/rapports/etape2-A2-05-volet1-lot3-T4.md\` (§0, inscrit par le module v2 ; proposition relue \`2e3fcff61bef…\` conservée à l'identique hors du statut et du §0).

**T4 : 28 conformes, 7 écarts, aucun suspendu**, contre 26 conformes et 9 écarts proposés ; la différence est documentée au §0, la proposition n'est pas modifiée. **Écarts retenus** : les retraits de tags de lieu de 果物, 鍵, お茶, お酒, 紅茶, 飲み物 et 水 ; les tags \`lieu_restaurant\` de お茶, 紅茶 et 水 sont conservés. **お風呂 et ベッド** : écarts proposés non retenus ; \`lieu_hotel\` conservé avec réserve documentaire, en citant D0258 (ふろ) et D0254 (エレベーター), décisions d'autres ENTRY, ni réattribuées ni comptées ; les deux tags restent hérités, leur pertinence n'étant pas démontrée par les fiches. **Les 26 autres conformités** sont retenues avec leurs réserves ; points sans correction confirmés : カレー, 部屋, お手洗い, トイレ, 電車. Aucun audit transversal des tags, aucune doctrine nouvelle.

| N° | Sens | Mot | Lot | Écart | Champ | Avant | Après |
|---|---|---|---|---|---|---|---|
| V1-15 | \`v_87\` | 果物 « Fruit » | 00 | tag de lieu | \`tags\` (ENTRY) | \`["lieu_konbini"]\` | \`[]\` |
| V1-16 | \`v_226\` | 鍵 « Clé » | 00 | tag de lieu | \`tags\` (ENTRY) | \`["lieu_hotel"]\` | \`[]\` ; nuance du sens conservée |
| V1-17 | \`v_85\` | お茶 « Thé » | 02 | tag de lieu | \`tags\` (ENTRY) | \`["lieu_konbini", "lieu_restaurant"]\` | \`["lieu_restaurant"]\` |
| V1-18 | \`v_86\` | お酒 « Alcool » | 02 | tag de lieu | \`tags\` (ENTRY) | \`["lieu_konbini", "lieu_restaurant"]\` | \`[]\` |
| V1-19 | \`v_112\` | 紅茶 « Thé noir » | 02 | tag de lieu | \`tags\` (ENTRY) | \`["lieu_konbini", "lieu_restaurant"]\` | \`["lieu_restaurant"]\` |
| V1-20 | \`v_120\` | 飲み物 « Boisson » | 02 | tag de lieu | \`tags\` (ENTRY) | \`["lieu_konbini", "lieu_restaurant"]\` | \`[]\` |
| V1-21 | \`v_677\` | 水 « Eau » | 02 | tag de lieu | \`tags\` (ENTRY) | \`["lieu_konbini", "lieu_restaurant"]\` | \`["lieu_restaurant"]\` |

**V1-22 et V1-23**, proposées pour お風呂 et ベッド, ne sont pas retenues : elles ne sont ni inscrites à la liste ci-dessus ni appliquées. **Numérotation** (décision du 2026-10-24) : « **Je retiens la lecture B : V1-22 et V1-23 sont définitivement réservés aux propositions non retenues de T4. Le prochain identifiant disponible doit être V1-24.** » Les deux identifiants sont inscrits au tableau des réservations ci-dessous, hors de la liste des corrections retenues : \`sync-stable.mjs\` les lit pour calculer le prochain identifiant, sans les compter comme corrections, et refuse toute correction retenue qui reprendrait l'un d'eux.

| Réservation | Identifiant | Rapport | Sens | Statut |
|---|---|---|---|---|
| réservé | V1-22 | \`docs/rapports/etape2-A2-05-volet1-lot3-T4.md\` | \`v_208_s1\` (お風呂) | correction proposée, non retenue (arbitrage du 2026-10-24) ; jamais réattribué |
| réservé | V1-23 | \`docs/rapports/etape2-A2-05-volet1-lot3-T4.md\` | \`v_212_s1\` (ベッド) | correction proposée, non retenue (arbitrage du 2026-10-24) ; jamais réattribué |

**Décomptes calculés par les outils**, non saisis à la main : **252 sens arbitrés sur 377, 125 restants ; bloc B : 148 sur 148 ; 196 corrections dans 172 ENTRY, non appliquées ; prochain identifiant disponible : V1-24.** Aucune correction lexicale n'est appliquée ; aucun \`git add\`, commit ni push.`;
const RUBRIQUES = [ // [avant, après], dans ETAT-ACTUEL.md et ROADMAP.md, chacun présent une fois
  ["(B6 à B8). **217\n  candidats arbitrés sur 377 ; 160 restent**", "(B6 à B8). **252\n  candidats arbitrés sur 377 ; 125 restent**"],
  ['**189 corrections, dans 169 ENTRY**', '**196 corrections, dans 172 ENTRY**'],
  ['V1-13 et V1-14 (lot 3, T3 : catégorie de ボタン, sens 2 ; traduction secondaire de テープ, sens 2), V2-1 à', 'V1-13 et V1-14 (lot 3, T3 : catégorie de ボタン, sens 2 ; traduction secondaire de テープ, sens 2), V1-15 à V1-21 (lot 3, T4 : retraits de tags de lieu de 果物, 鍵, お茶, お酒, 紅茶, 飲み物 et 水 ; V1-22 et V1-23, propositions non retenues de T4, réservés, jamais réattribués ; prochain identifiant V1-24), V2-1 à'],
  ['Les 160 candidats restants du lot 3, dont les 17 du bloc F', 'Les 125 candidats restants du lot 3, dont les 17 du bloc F'],
];

// ---- Préconditions sur le dépôt réel -----------------------------------------------------------------------------------------------------
const TEMOINS = [RAP, MAN, BIL, 'ETAT-ACTUEL.md', 'ROADMAP.md', 'a2-05-travail/audit-v1-lot3-T4.mjs', 'a2-05-travail/controle-bilan-pilote.mjs', 'a2-05-travail/registre-tranches.json', 'data/n5/vocab.json', 'data/vocab-hors-jlpt.json', 'reconstruction/a2-04/journal.json'];
const avant = Object.fromEntries(TEMOINS.map((p) => [p, sha(readFileSync(join(root, p)))]));
const P = readFileSync(join(root, RAP), 'utf8');
ctl(avant[RAP] === PROPOSITION && /^\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/m.test(P), 'P1 rapport de T4 = proposition relue, au statut de proposition', avant[RAP].slice(0, 12) + '…');
const man = JSON.parse(readFileSync(join(root, MAN), 'utf8'));
ctl(avant[MAN].startsWith(MANIFESTE) && Object.keys(man.empreintes).length === 34 && !Object.hasOwn(man.empreintes, RAP), 'P2 manifeste de la livraison : 34 entrées, rapport de T4 absent', avant[MAN].slice(0, 12) + '…');
const bil = LFs(readFileSync(join(root, BIL), 'utf8'));
ctl(!/^### 8\.91 /m.test(bil) && /^### 8\.90 /m.test(bil) && !/^\| V1-(1[5-9]|2[0-9]) \|/m.test(bil), 'P3 bilan : §8.91 absent, §8.90 présent, aucune ligne V1-15 et au-delà', 'conforme');
const src = readFileSync(join(root, 'a2-05-travail/audit-v1-lot3-T4.mjs'), 'utf8');
ctl(!/const ARBITRAGE/.test(src) && (src.match(/^  F,$/gm) ?? []).length === 1, 'P4 configuration de T4 sans arbitrage, point d\'insertion unique', 'conforme');
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) { const t = LFs(readFileSync(join(root, p), 'utf8')); ctl(RUBRIQUES.every(([a, b]) => t.split(a).length === 2 && !t.includes(b)), 'P5 ' + p + ' : quatre fragments présents une fois, remplacements absents', 'conforme'); }
if (ko) { console.log(ko + ' écart(s) de précondition : arrêt'); process.exit(1); }

// ---- Copie temporaire : état de la livraison, puis inscription simulée ------------------------------------------------------------------
const tmp = mkdtempSync(join(tmpdir(), 'ocha-arb-t4-')); const C = join(tmp, 'arbre');
for (const d of ['data', 'docs', 'reconstruction', 'tools', 'a2-05-travail', 'src']) if (existsSync(join(root, d))) cpSync(join(root, d), join(C, d), { recursive: true });
for (const f of ['ETAT-ACTUEL.md', 'ROADMAP.md', 'package.json']) if (existsSync(join(root, f))) cpSync(join(root, f), join(C, f));
const cfg = src.replace("import { produire } from './lot3-commun-v2.mjs';\n", "import { produire } from './lot3-commun-v2.mjs';\n\nconst ARBITRAGE = " + JSON.stringify(ARBITRAGE, null, 2) + ';\n').replace(/^  F,$/m, '  F, arbitrage: ARBITRAGE,');
// Module de synchronisation proposé, substitué dans la copie seulement ; non-régression sur l'état présent (aucune réservation) : toutes les
// valeurs calculées sont celles du module en service, et la liste des réservations est vide.
cpSync(join(root, 'a2-05-travail/arbitrage-T4/proposition-sync-stable.mjs'), join(C, 'a2-05-travail/sync-stable.mjs'));
const { calculerEtat, verifierCoherence, Refus } = await import(pathToFileURL(join(C, 'a2-05-travail/sync-stable.mjs')).href);
// E0 (corrigé le 2026-10-24, après l'application du module) : la référence est la version de départ sauvegardée (f566510836aa…), exécutée dans
// la copie à côté de ses modules voisins ; champs historiques communs comparés, le champ nouveau « reserves » exclu des deux côtés ; le module
// installé dans le dépôt réel doit rendre, en outre, « reserves: [] » pour l'état présent.
const DEP = 'a2-05-travail/arbitrage-T4/depart/sync-stable.mjs';
ctl(sha(readFileSync(join(root, DEP))) === 'f566510836aa933b91c3bd40266a1d8bc0c32ec8cf73bac6f701948fe0d06b23', 'E0a version de départ sauvegardée : empreinte f566510836aa…', sha(readFileSync(join(root, DEP))).slice(0, 12) + '…');
cpSync(join(root, DEP), join(C, 'a2-05-travail/sync-stable-depart.mjs'));
const depart = (await import(pathToFileURL(join(C, 'a2-05-travail/sync-stable-depart.mjs')).href)).calculerEtat(C);
const installe = (await import(pathToFileURL(join(root, 'a2-05-travail/sync-stable.mjs')).href)).calculerEtat(root);
const sans = ({ reserves, ...x }) => x;
const v0 = calculerEtat(C); const r0 = v0.reserves;
ctl(JSON.stringify(sans(installe)) === JSON.stringify(sans(depart)) && JSON.stringify(sans(v0)) === JSON.stringify(sans(depart)) && !('reserves' in depart), 'E0 état présent : module installé (dépôt réel) et module de la copie = version de départ, champs historiques communs', installe.arbitres + '/377, ' + installe.proposes + ' proposés ; ' + installe.corrections + ' dans ' + installe.entry + ' ; ' + installe.libre + ' ; ' + installe.empreintes + ' empreintes');
ctl(Array.isArray(installe.reserves) && installe.reserves.length === 0 && Array.isArray(r0) && r0.length === 0, 'E0c module installé : reserves: [] pour l\'état présent', JSON.stringify(installe.reserves));
// Compatibilité historique : relevé indépendant des rapports arbitrés du dépôt réel ; aucun ne déclare de réservation à ce jour
const arb = readdirSync(join(root, 'docs/rapports')).filter((x) => x.startsWith('etape2-A2-05-') && x.endsWith('.md')).filter((x) => /^\*\*Statut\*\* : \*\*arbitré le /m.test(readFileSync(join(root, 'docs/rapports', x), 'utf8')));
const decl = arb.filter((x) => /V[12]-\d+ non retenue, identifiant réservé/.test(readFileSync(join(root, 'docs/rapports', x), 'utf8')));
ctl(arb.length > 0 && decl.length === 0, 'E0b rapports arbitrés actuels : aucune réservation déclarée (rapports historiques compatibles)', arb.length + ' rapports arbitrés lus ; déclarations : ' + decl.length);
writeFileSync(join(C, 'a2-05-travail/audit-v1-lot3-T4.mjs'), cfg); writeFileSync(join(out, 'audit-v1-lot3-T4.avec-arbitrage.mjs'), cfg);
// État de la livraison : le rapport y était présent, en proposition (régénéré une fois sur sa première version) ; son §6 compte donc ses
// propres 35 sens comme proposés (« 217 arbitrés, 35 proposés, 125 restants »). Il est laissé en place dans la copie, et le module l'écrase.
const g = spawnSync(process.execPath, [join(C, 'a2-05-travail/audit-v1-lot3-T4.mjs'), C], { encoding: 'utf8' });
ctl(g.status === 0, 'E1 régénération du rapport avec ARBITRAGE (mode bloquant), dans la copie', 'code ' + g.status + (g.status ? ' : ' + (g.stderr.split('\n').find((x) => /Error/.test(x)) ?? '') : ''));
const G = readFileSync(join(C, RAP), 'utf8'); writeFileSync(join(out, 'rapport-T4-arbitre-apercu.md'), G);
const lp = P.split('\n'), lg = G.split('\n'); const iS = lp.findIndex((l) => l.startsWith('**Statut** : ')), i1 = lp.indexOf('## 1. Résultat proposé'), j0 = lg.indexOf('## 0. Arbitrage'), j1 = lg.indexOf('## 1. Résultat proposé');
const statut = "**Statut** : **arbitré le 2026-10-24** (§0). La proposition est conservée telle qu'elle a été livrée.";
const E = [...lp.slice(0, iS), statut, ...lp.slice(iS + 1, i1), ...lg.slice(j0, j1), ...lp.slice(i1)].join('\n');
ctl(iS > 0 && i1 > 0 && j0 > 0 && E === G, 'E2 rapport régénéré = proposition relue, hors de la ligne de statut et du §0 inséré', (j1 - j0) + ' lignes de §0 ; ' + sha(G).slice(0, 12) + '…');
ctl(/^\*\*Statut\*\* : \*\*arbitré le 2026-10-24\*\*/m.test(G) && G.includes('**35 sens examinés : 26 conformes, 9 écart'), 'E3 statut arbitré ; verdicts proposés du §1 inchangés (26 et 9)', 'conforme');
// Inscription simulée de la liste et des rubriques
writeFileSync(join(C, BIL), bil.replace(/\n*$/, '\n') + '\n' + S891 + '\n');
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) { const b = readFileSync(join(C, p), 'utf8'); const crlf = b.includes('\r\n'); let t = LFs(b); for (const [a, z] of RUBRIQUES) t = t.replace(a, () => z); writeFileSync(join(C, p), crlf ? t.replace(/\n/g, '\r\n') : t); }
const v = calculerEtat(C);
ctl(v.arbitres === 252 && v.proposes === 0 && v.restants === 125 && v.blocBArbitres === 148, 'E4 couverture calculée : 252 arbitrés, 0 proposé, 125 restants ; bloc B 148/148', v.arbitres + ', ' + v.proposes + ', ' + v.restants + ' ; ' + v.blocBArbitres + '/' + v.blocB);
ctl(v.corrections === 196 && v.entry === 172, 'E5 corrections calculées : 196 dans 172 ENTRY', v.corrections + ' dans ' + v.entry);
ctl(v.libre === 'V1-24' && JSON.stringify(v.reserves) === '["V1-22","V1-23"]', 'E6 prochain identifiant calculé : V1-24 ; V1-22 et V1-23 réservés, non comptés', v.libre + ' ; réservés : ' + v.reserves.join(', '));
// Identifiants historiques préservés : relevé indépendant des lignes de corrections du §8 (V1-1 à V1-21, chacun une fois, aucun réservé parmi eux)
const bilC = LFs(readFileSync(join(C, BIL), 'utf8')); const s8 = bilC.slice(bilC.search(/^## 8\. /m));
const ret = [...s8.matchAll(/^\| (V1-\d+) \| (?:[a-z]+ \| )?`(?:hj_)?v_\d+/gm)].map((x) => x[1]); const uniq = [...new Set(ret)];
ctl(uniq.length === 21 && uniq.every((x, i) => x === 'V1-' + (i + 1)) && !uniq.some((x) => ['V1-22', 'V1-23'].includes(x)), 'E6b identifiants retenus : V1-1 à V1-21, dans l\'ordre, sans V1-22 ni V1-23', uniq.length + ' identifiants distincts ; ' + uniq[0] + ' … ' + uniq.at(-1));
// Sabotages de la réservation, chacun sur l'état simulé, puis restauré
const sab = (lib, fichier, muter, attendu) => {
  const f = join(C, fichier), b0 = readFileSync(f); writeFileSync(f, muter(LFs(b0.toString('utf8'))));
  let res, refus = null; try { res = calculerEtat(C); } catch (e) { if (!(e instanceof Refus)) throw e; refus = e.message; }
  writeFileSync(f, b0); const ok = attendu(res, refus);
  ctl(ok, lib, refus ? 'refus : ' + refus : res.corrections + ' dans ' + res.entry + ' ; ' + res.libre + ' ; réservés : ' + res.reserves.join(', '));
};
const ligne = (n, e) => '| ' + n + ' | `' + e + '` | (sabotage) | 00 | tag de lieu | `tags` (ENTRY) | `["x"]` | `[]` |';
const ajout = (l) => (t) => t.replace(/\n*$/, '\n') + '\n' + l + '\n';
sab('S1 correction retenue V1-22 ajoutée : réattribution refusée', BIL, ajout(ligne('V1-22', 'v_208')), (r, e) => /réservé porté par une correction retenue : V1-22/.test(e ?? ''));
sab('S2 correction retenue V1-23 ajoutée : réattribution refusée', BIL, ajout(ligne('V1-23', 'v_1')), (r, e) => /réservé porté par une correction retenue : V1-23/.test(e ?? ''));
sab('S3 réservation de V1-22 dupliquée : refusée', BIL, ajout('| réservé | V1-22 | `docs/rapports/etape2-A2-05-volet1-lot3-T4.md` | `v_208_s1` | doublon |'), (r, e) => /réservé deux fois : V1-22/.test(e ?? ''));
sab('S4 réservation d\'un identifiant jamais proposé (V1-30) : refusée', BIL, ajout('| réservé | V1-30 | `docs/rapports/etape2-A2-05-volet1-lot3-T4.md` | `v_1_s1` | sans proposition |'), (r, e) => /V1-30 : non proposé/.test(e ?? ''));
sab('S5 réservation vers un rapport inexistant : refusée', BIL, ajout('| réservé | V1-31 | `docs/rapports/inexistant.md` | `v_1_s1` | rapport absent |'), (r, e) => /V1-31 : rapport introuvable/.test(e ?? ''));
sab('S6 tableau des réservations retiré en entier : réservation manquante refusée (confrontation au §0 de T4)', BIL, (t) => t.split('\n').filter((l) => !l.startsWith('| réservé |')).join('\n'), (r, e) => /réservation manquante : V1-22/.test(e ?? ''));
sab('S7 proposition V1-22 effacée du rapport de T4 : réservation refusée (traçabilité)', RAP, (t) => t.replace('**Correction proposée (V1-22)**', '**Correction (V1-22)**'), (r, e) => /V1-22 : non proposé/.test(e ?? ''));
sab('S8 correction future V1-24 retenue : acceptée, 197 corrections, prochain V1-25', BIL, ajout(ligne('V1-24', 'v_1')), (r) => r && r.corrections === 197 && r.libre === 'V1-25' && r.reserves.length === 2);
sab('S9 réservation mal formée (« reserve » sans accent) : refusée', BIL, (t) => t.replace(/^\| réservé \|/m, '| reserve |'), (r, e) => /ligne de réservation mal formée/.test(e ?? ''));
sab('S9b réservation mal formée (identifiant sans rapport) : refusée', BIL, ajout('| réservé | V1-40 | sans rapport |'), (r, e) => /ligne de réservation mal formée/.test(e ?? ''));
// Sabotages de la confrontation §0 / tableau / corrections retenues (sécurisation S6), plusieurs fichiers à la fois, puis restaurés
const sabM = (lib, muts, attendu) => {
  const sauv = muts.map(([fichier]) => [join(C, fichier), readFileSync(join(C, fichier))]);
  for (const [fichier, muter] of muts) writeFileSync(join(C, fichier), muter(LFs(readFileSync(join(C, fichier), 'utf8'))));
  let res, refus = null; try { res = calculerEtat(C); } catch (e) { refus = (e instanceof Refus ? '' : '[' + e.name + '] ') + e.message; }
  for (const [f, b0] of sauv) writeFileSync(f, b0);
  ctl(attendu(res, refus), lib, refus ? 'refus : ' + refus : res.corrections + ' dans ' + res.entry + ' ; ' + res.libre + ' ; réservés : ' + res.reserves.join(', '));
};
const dans0 = (t, f) => { const i0 = t.indexOf('\n## 0. Arbitrage\n'), i1 = t.indexOf('\n## 1. ', i0); return t.slice(0, i0) + f(t.slice(i0, i1)) + t.slice(i1); };
sabM('S11 une seule réservation supprimée (V1-23) : réservation manquante refusée', [[BIL, (t) => t.split('\n').filter((l) => !l.startsWith('| réservé | V1-23 |')).join('\n')]], (r, e) => /réservation manquante : V1-23/.test(e ?? ''));
sabM('S12 réservation injustifiée (V1-29, proposée hors du §0 mais non déclarée réservée) : refusée', [[RAP, (t) => t.replace(/\n*$/, '\n') + '\n- **Correction proposée (V1-29)** : (sabotage)\n'], [BIL, ajout('| réservé | V1-29 | `docs/rapports/etape2-A2-05-volet1-lot3-T4.md` | `v_1_s1` | injustifiée |')]], (r, e) => /réservation non déclarée au §0 de son rapport : V1-29/.test(e ?? ''));
sabM('S13 statut « non retenue, identifiant réservé » de V1-23 modifié dans le §0 : refusé', [[RAP, (t) => dans0(t, (s0) => s0.replace('V1-23 non retenue, identifiant réservé', 'V1-23 retenue'))]], (r, e) => /réservation non déclarée au §0 de son rapport : V1-23/.test(e ?? ''));
sabM('S14 le §0 déclare réservée une correction retenue (V1-21) : refusé', [[RAP, (t) => dans0(t, (s0) => s0.replace('| **Limites** |', '| **Sabotage** | V1-21 non retenue, identifiant réservé. |\n| **Limites** |'))]], (r, e) => /réservation manquante : V1-21/.test(e ?? ''));
sabM('S15 un second rapport arbitré, hors du manifeste (bilan du pilote), déclare V1-22 réservé : refusé', [['docs/rapports/etape2-A2-05-volet1-lot3-bilan-pilote.md', (t) => dans0(t, (s0) => s0.replace(/\n*$/, '\nV1-22 non retenue, identifiant réservé.\n'))]], (r, e) => /^identifiant déclaré réservé par deux rapports : V1-22/.test(e ?? ''));
sabM('S15b la même déclaration dans un rapport protégé (T3) : arrêtée d\'abord par le manifeste', [['docs/rapports/etape2-A2-05-volet1-lot3-T3.md', (t) => dans0(t, (s0) => s0.replace(/\n*$/, '\nV1-22 non retenue, identifiant réservé.\n'))]], (r, e) => /^\[Error\] empreinte modifiée : docs\/rapports\/etape2-A2-05-volet1-lot3-T3\.md/.test(e ?? ''));
const vr = calculerEtat(C);
ctl(vr.libre === 'V1-24' && vr.corrections === 196 && vr.entry === 172, 'S10 témoin final, après restauration : V1-24, 196 dans 172 ENTRY', vr.libre + ' ; ' + vr.corrections + ' dans ' + vr.entry);
for (const p of ['ETAT-ACTUEL.md', 'ROADMAP.md']) { let ok = true, m = 'cohérent'; try { verifierCoherence(readFileSync(join(C, p), 'utf8'), v); } catch (e) { ok = false; m = e.message; } ctl(ok, 'E7 ' + p + ' : rubriques chiffrées cohérentes avec les valeurs calculées', m); }
const run = (args) => spawnSync(process.execPath, args, { encoding: 'utf8', cwd: C });
const em = run([join(C, 'a2-05-travail/empreintes-lot3.mjs'), C]); writeFileSync(join(out, 'empreintes-copie.txt'), em.stdout + em.stderr);
console.log('constat  E8 manifeste dans la copie : code ' + em.status + ' ; ' + (em.stdout + em.stderr).trim().split('\n').slice(-2).join(' | '));
const cp = run([join(C, 'a2-05-travail/controle-bilan-pilote.mjs'), C]); writeFileSync(join(out, 'controle-pilote-copie.txt'), cp.stdout + cp.stderr);
console.log('constat  E9 contrôle du bilan du pilote dans la copie : code ' + cp.status + ' ; ' + (cp.stdout.match(/^ÉCART.*$/gm) ?? ['aucun écart']).join(' | ') + ' ; ' + cp.stdout.trim().split('\n').pop());
const sy = run([join(C, 'a2-05-travail/sync-stable.mjs'), C, '--apercu']);
console.log('constat  E10 aperçu de synchronisation dans la copie : code ' + sy.status + ' ; ' + (sy.stdout + sy.stderr).trim());
if (existsSync(join(C, 'a2-05-travail/sync-stable-apercu.md'))) writeFileSync(join(out, 'sync-apercu-copie.md'), readFileSync(join(C, 'a2-05-travail/sync-stable-apercu.md')));
for (const [p, n] of [[BIL, 'bilan'], ['ETAT-ACTUEL.md', 'etat'], ['ROADMAP.md', 'roadmap']]) writeFileSync(join(out, n + '-copie.md'), readFileSync(join(C, p)));
rmSync(tmp, { recursive: true, force: true });
// ---- Dépôt réel inchangé ------------------------------------------------------------------------------------------------------------------
const apres = TEMOINS.filter((p) => sha(readFileSync(join(root, p))) !== avant[p]);
ctl(apres.length === 0, 'E11 dépôt réel inchangé (' + TEMOINS.length + ' fichiers témoins)', apres.length ? 'modifiés : ' + apres.join(', ') : 'aucune modification');
console.log(ko ? ko + ' écart(s)' : 'préparation conforme');
process.exit(ko ? 1 : 0);
