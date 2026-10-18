// A2-05 · volet 2 · categorie-nulle, quatrième tranche (14 cas, « action générale », seconde partie).
// Lecture seule sur les données ; les verdicts sont dans audit-cat-t4.json.
// Usage : node audit-cat-t4.mjs <racine du dépôt> <rapport.md à compléter>
// Relançable : une « Tranche 5 » déjà présente dans le rapport est remplacée.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [root, outFile] = process.argv.slice(2);
const here = dirname(fileURLToPath(import.meta.url));
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const vocab = read('data/n5/vocab.json');
const sources = new Map(read('reconstruction/a2-04/sources/vocab.json').map((e) => [e.id, e]));
const journal = read('reconstruction/a2-04/journal.json');
const known = read('reconstruction/a2-04/avertissements-connus.json');
const V = JSON.parse(readFileSync(join(here, 'audit-cat-t4.json'), 'utf8'));
const strip = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/<\/?[A-Za-z]+>/g, '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fnOf = (s) => [...s.linguistic_functions.grammatical, ...s.linguistic_functions.pragmatic_discourse];

const N = {
  A5: 'A5, §2 : `category: null` est permis « lorsqu\'aucune catégorie sémantique primaire suffisamment pertinente n\'existe » ; pour un sens lexical plein, « ce n\'est jamais une valeur par défaut ni un fourre-tout ».',
  ARB: 'Arbitrage du 2026-10-08 : la formule « action générale » n\'est pas une preuve ; le `null` est vérifié sur la fiche, par l\'absence de toute catégorie qui décrive le sens (A2-L3-v1, §2 et §7, règle 7).',
  L3_2: 'A2-L3-v1, §2 : « lorsqu\'aucune catégorie suffisamment caractéristique n\'existe, l\'absence de catégorie est préférable à une classification artificielle ».',
  G10: 'A2-GLOBAL-v1, §10 : « un mot lexical plein ne doit pas être placé en `null` simplement parce que son classement est difficile ».',
  L3r1: 'A2-L3-v1, §7, règle 1 : « concept ≠ contexte d\'usage ».',
  L3r6: 'A2-L3-v1, §7, règle 6 : « la polysémie est traitée au niveau du SENSE ».',
  LOT19: 'Doctrine du lot 19 : une catégorie ne s\'impose pas quand la fiche déborde son domaine.',
  L3eco: 'A2-L3-v1, §5, Économie & commerce : « Achat & vente → Achat ; Vente ; Commande ; Échange commercial » ; « Transactions & paiement → Paiement ; Facturation ; Dette ; Crédit » ; « Banque & finance → Banque ; Comptes ; Épargne ; Prêt ; Investissement ».',
  L3soc: 'A2-L3-v1, §5, Relations sociales : « Interactions sociales » ; A9, §3.3 : cette catégorie « désigne des concepts d\'interaction (rencontrer, demander) ».',
  L3grp: 'A2-L3-v1, §5, Relations sociales : « Groupes & appartenance sociale → Membres ; Groupes ; Communautés ; Appartenance » ; « Interactions sociales ».',
  L3corps: 'A2-L3-v1, §5, Être humain : « Corps → Tête & visage ; Membres ; Tronc ; Organes ; Caractéristiques corporelles » ; « États & besoins physiques → Sommeil & repos ; Faim & soif ; Fatigue & énergie physique ; Confort & inconfort ».',
  L3pos: 'A2-L3-v1, §5, Espace & propriétés spatiales : « Position & localisation → Intérieur / extérieur ; Dessus / dessous ; Devant / derrière ; Centre / périphérie » ; « Mouvement & déplacement → Aller / venir ; Avancer / reculer ; Monter / descendre ».',
  L3temps: 'A2-L3-v1, §5, Temps : « Unités temporelles » ; « Moments & périodes » ; « Calendrier » ; « Chronologie » ; « Durée » ; « Fréquence » ; « Relations temporelles ».',
  L3mus: 'A2-L3-v1, §5, Arts & création : « Musique → Chant ; Instruments ; Composition ; Interprétation ».',
  L3conso: 'A2-L3-v1, §5 : « Consommation alimentaire » (Alimentation & cuisine) ; « Symptômes & douleur → Douleur ; Fièvre ; Symptômes respiratoires ; Troubles fonctionnels » (Santé & médecine).',
  L3tech: 'A2-L3-v1, §5 : « Écriture → Écrire ; Systèmes d\'écriture ; Orthographe » (Communication & langage) ; « Machines & systèmes techniques » (Technologie) ; « Publication & diffusion » (Médias).',
  L3conge: 'A2-L3-v1, §5 : « Conditions de travail → Horaires ; Congés ; Environnement professionnel » (Travail & vie professionnelle) ; « Vie scolaire & universitaire → Classe ; Devoirs ; Vacances scolaires » (Éducation & apprentissage).'
};
const G44 = (el) => `A2-GLOBAL-v1, §4.4, et A2-L3-v1, §6 : « ${el} » figure parmi les éléments hors de la hiérarchie thématique, qui « ne doivent pas être recréés automatiquement comme Level 1/2/3 ».`;
const norm = (k) => {
  if (!k.startsWith('@')) return k;
  if (k.startsWith('@G44:')) return G44(k.slice(5));
  if (!N[k.slice(1)]) throw new Error(`norme inconnue : ${k}`);
  return N[k.slice(1)];
};

const FAM = {
  A: 'A · Prêter, emprunter, rendre, remettre, donner',
  B: 'B · Postures et attente',
  C: 'C · Souffler, aspirer, photocopier',
  D: 'D · S\'absenter, assister, apparaître'
};
const PERIMETRE = ['v_266_s2', 'v_526_s1', 'v_533_s1', 'v_542_s2', 'v_551_s1', 'v_552_s1', 'v_562_s1', 'v_568_s1', 'v_575_s1', 'v_578_s1', 'v_608_s2', 'v_635_s2', 'v_642_s2', 'v_642_s3'];
const ids = Object.keys(V);
const same = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
if (!same(ids, PERIMETRE)) throw new Error('les fiches ne sont pas exactement le périmètre validé');
const decOf = (id) => {
  const e = vocab.find((x) => x.senses.some((s) => s.id === id));
  return journal.filter((x) => x.entry === `n5_v_${e.id.slice(2)}` && x.kind === 'categorie-nulle' && x.field === `sens ${Number(id.split('_s')[1])} · category`);
};
const cases = ids.map((id) => {
  const e = vocab.find((x) => x.senses.some((s) => s.id === id));
  const s = e.senses.find((x) => x.id === id);
  const ds = decOf(id);
  if (!known.some((w) => w.code === 'categorie-nulle' && w.where.endsWith(` ${id}`))) throw new Error(`pas un categorie-nulle : ${id}`);
  if (ds.length !== 1) throw new Error(`décision introuvable ou multiple : ${id}`);
  if (ds[0].status !== 'validated') throw new Error(`décision non validée : ${id}`);
  if (!/action g[ée]n[ée]rale/i.test(ds[0].reason)) throw new Error(`hors famille « action générale » : ${id}`);
  if (s.category !== null) throw new Error(`catégorie non nulle : ${id}`);
  if (!FAM[V[id].f] || !V[id].b) throw new Error(`groupe ou fondement manquant : ${id}`);
  const srcId = `n5_v_${e.id.slice(2)}`;
  return { id, e, s, num: Number(id.split('_s')[1]), srcId, f: sources.get(srcId), d: ds[0], v: V[id] };
});
const tot = Object.fromEntries(['L', 'F', 'C', 'N'].map((k) => [k, cases.filter((c) => c.v.v === k).length]));
if (cases.length !== 14 || new Set(ids).size !== 14 || tot.L + tot.F + tot.C + tot.N !== 14) throw new Error('14 cas attendus');
for (const c of cases) if ((c.v.v === 'C' || c.v.v === 'F') !== Boolean(c.v.k)) throw new Error(`correction incohérente avec le verdict : ${c.id}`);

// preuves d'exhaustivité, calculées et non recopiées
const MARK = '\n---\n\n# Tranche 5 ·';
let md = readFileSync(outFile, 'utf8');
if (md.includes(MARK)) md = md.slice(0, md.indexOf(MARK));
md = md.replace(/\n+$/, '\n');
const allCat = known.filter((w) => w.code === 'categorie-nulle').map((w) => w.where.split(' · ')[2]);
const [avantT2, ...apres] = md.split('\n# Tranche 2 ·');
const fichesCat = [...apres.join('\n# Tranche 2 ·').matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const fichesType = [...avantT2.matchAll(/^#### `(v_\d+_s\d+)` .* — \*\*([LFCN])\*\*/gm)];
const dejaCat = new Set(fichesCat.map((m) => m[1]));
const repris = ids.filter((id) => dejaCat.has(id));
if (repris.length) throw new Error(`déjà audités : ${repris.join(', ')}`);
const famille = allCat.filter((id) => !dejaCat.has(id) && /action g[ée]n[ée]rale/i.test(decOf(id)[0].reason));
const familleTotale = allCat.filter((id) => { const r = decOf(id)[0].reason; return /action g[ée]n[ée]rale/i.test(r) && !/personne g[ée]n[ée]rique|propri[ée]t[ée] (physique )?g[ée]n[ée]rale|[ée]valuation/i.test(r); });
const cumul = (k) => [...fichesCat, ...fichesType].filter((m) => m[2] === k).length;
const preuves = {
  inventaire: allCat.length, dejaCat: dejaCat.size, dejaType: fichesType.length, familleRestante: famille.length, identique: same(PERIMETRE, famille),
  familleTotale: familleTotale.length, reste: allCat.length - dejaCat.size - 14, cumulAvant: { L: cumul('L'), F: cumul('F'), C: cumul('C'), N: cumul('N') }
};
if (preuves.inventaire !== 120 || preuves.dejaCat !== 77 || preuves.dejaType !== 27 || preuves.familleRestante !== 14 || !preuves.identique || preuves.familleTotale !== 36 || preuves.reste !== 29
  || preuves.cumulAvant.L !== 97 || preuves.cumulAvant.F !== 2 || preuves.cumulAvant.C !== 5 || preuves.cumulAvant.N !== 0) throw new Error(`preuves d'exhaustivité : ${JSON.stringify(preuves)}`);

const P = (t = '') => { md += `${t}\n`; };
const list = (l) => l.map((c) => `\`${c.id}\` ${c.e.word}`).join(' ; ') || '—';
P();
P('---');
P();
P('# Tranche 5 · `categorie-nulle`, quatrième tranche : 14 cas');
P();
P('**Statut** : **tranche arbitrée le 2026-10-08** (ChatGPT, par délégation), validée telle que proposée : L = 14, F = 0, C = 0, N = 0. 渡す, sens 1, est confirmé L (la distinction avec 上げる reste documentée) ; 出る, sens 3, est confirmé L (type `evenement` cohérent, justification historique imprécise, non réécrite) ; 座る et 立つ sont confirmés L, en l\'absence de catégorie des postures ; les dix autres L sont confirmés. **La famille « action générale » est entièrement arbitrée : 36 cas** (35 L, 1 C). Le contrôle de provenance des informations publiées non retrouvées dans les fiches sources est ajouté au suivi transversal du volet 1 (T5.5). Périmètre validé le même jour : « action générale », seconde partie, 14 SENSE. Aucune donnée, aucun lot, aucun journal, aucun registre, aucun snapshot et aucun inventaire n\'est modifié ; aucune correction n\'est appliquée ; aucune décision historique n\'est réécrite.');
P('**Reste à faire après cette tranche** : 29 `categorie-nulle` (« aucune catégorie ne nomme la notion » 18 ; « autre formulation » 11) ; aucun n\'est commencé.');
P();
P('## T5.1 Résultat de la tranche');
P();
P('| Classement | Cas | Sens |');
P('|---|---|---|');
for (const k of ['L', 'F', 'C', 'N']) P(`| **${k}** | ${tot[k]} | ${list(cases.filter((c) => c.v.v === k))} |`);
P('| **Total** | 14 | L + F + C + N = 14 |');
P();
if (tot.L !== 14) throw new Error('arbitrage : 14 L attendus');
P(`**Cumul arbitré du volet 2** : 27 \`type-nul\` (L = 24, F = 1, C = 2), 77 \`categorie-nulle\` (L = 73, F = 1, C = 3) et ces 14 \`categorie-nulle\` (L = ${tot.L}), soit **118 cas arbitrés sur 147 : L = ${97 + tot.L}, F = 2, C = 5, N = 0**.`);
P();
P('- **Aucune modification** n\'est retenue dans cette tranche. La liste des corrections du volet 2 reste à six modifications de SENSE, toutes non appliquées.');
P('- **Aucun N.**');
P(`- **${cases.filter((c) => c.v.r).length} fiches portent une réserve, conservée** : ${list(cases.filter((c) => c.v.r))} (T5.5).`);
P('- **Les cinq chevauchements avec le volet 1 sont traités dans les fiches** (T5.4).');
P();
P('## T5.2 Composition et méthode');
P();
P('La tranche réunit les 14 sens restants de la famille « action générale » : dix du lot 19, deux du lot 04, un du lot 07, un du lot 20.');
P();
P('Pour chaque cas, individuellement : fiche source entière (traductions, nuance, exemple), et pour 出る la fiche de 出ます qui y a été fusionnée ; sens publié, nuance publiée et autres sens de l\'ENTRY ; décision `categorie-nulle` et décisions voisines, celles du lot 26 comprises ; A5, A2-L3-v1 (§2, §5 à §7), A2-GLOBAL-v1 (§4.3, §4.4, §10, §11) et A9 selon le cas ; sens comparables publiés, dans la tranche et hors d\'elle. L\'arbre des catégories d\'A2-L3 (§5) a été relu pour chaque sens.');
P();
P('**Comparables externes lus sans être audités** : 吸う, sens 1 « Fumer », et たばこ (famille « aucune catégorie ») ; やる, sens 1 « Faire », et する (famille « autre formulation ») ; 上げる et 起きる (catégorisés, hors des 147). **Aucun ne reçoit de verdict ici.**');
P();
P('## T5.3 La formule n\'est pas la preuve');
P();
P('Conformément à l\'arbitrage du 2026-10-08, **aucun `null` de cette tranche n\'est fondé sur la formule « action générale »**. Chaque fiche d\'audit donne le fondement tiré de la fiche source et de l\'arbre d\'A2-L3 :');
P();
P('| Sens | Fondement du `null`, vérifié sur la fiche |');
P('|---|---|');
for (const c of cases) P(`| \`${c.id}\` ${c.e.word} « ${c.s.meaning.primary} » | ${c.v.b} |`);
P();
P('Trois sortes de fondement apparaissent : une fiche qui **réunit deux domaines** dans un sens unique (借りる, 貸す, 返す, 吹く, 吸う, 休む, やる) ; une notion qu\'**aucune catégorie ne nomme** (les postures, l\'attente, la remise d\'un objet, la reproduction d\'un document, l\'apparition) ; une fiche **trop peu précise** pour fonder une catégorie (出る, sens 2 ; コピーする). Seuls 渡す et 待つ relèvent de l\'« action générique » au sens strict d\'A2-L3 §6 ; pour 出る, sens 3, la formule est inapplicable (T5.4).');
P();
P('## T5.4 Points examinés à la demande de l\'arbitrage');
P();
P('**出る, sens 3 : « action générale » et `evenement`.** Le sens est publié avec le type `evenement`, et sa raison (D0339, lot 04) dit « action générale ». C\'est la raison qui est inexacte, non la donnée : ce qui apparaît survient, et 消える « Disparaître », son contraire, confirmé L à la tranche 2, porte le même type. Le `null` tient par l\'absence de toute catégorie de l\'apparition, non par l\'« action générique ». Aucune modification n\'est proposée ; la décision n\'est pas réécrite.');
P();
P('**座る et 立つ : les deux fondements des raisons.** D1245 et D1247 invoquent « aucune catégorie du registre ne nomme les postures » et « action générale ». Le premier fondement est vérifié et exact (ni « Corps », ni « États & besoins physiques », ni l\'espace ne nomment une posture) ; le second n\'ajoute rien. La différence avec 並ぶ, sens 1 (C retenu), tient aux fiches : celle de 並ぶ décrit une disposition en ligne, un emplacement relatif ; celles-ci une attitude du corps.');
P();
P('**Les cinq chevauchements avec le volet 1** (un cas n\'est audité qu\'une fois) :');
P();
P('| Sens | Relevé du criblage | Ce qu\'il en reste |');
P('|---|---|---|');
P('| 借りる, 貸す | C10-a : la raison renvoie la relation à la passe finale | soldé : `reciprocal_with` est publiée depuis le lot 26 (D1581), notée une fois, sur 借りる |');
P('| 渡す, sens 1 | C10-a : même renvoi | soldé : la relation publiée (D1583) part du sens 2 « Faire traverser », non de ce sens |');
P('| 立つ | C1-a : « Se lever » traduit aussi 起きる, sens 2, catégorisé | deux référents (une chaise ; le lit et le sommeil) ; l\'écart est justifié |');
P('| やる, sens 2 | C1-a : « Donner » traduit aussi 上げる, sens 1, catégorisé | le destinataire diffère (un inférieur, un animal, une plante) ; l\'écart est justifié |');
P('| やる, sens 2 | C1-d : sens reliés par `similar_to`, catégories de niveaux 1 différents | `similar_to` dit une ressemblance, non une identité de domaine ; aucun écart |');
P();
P('**Aucun verdict n\'est donné aux autres candidats du volet 1** que ces relevés nomment (起きる, 上げる).');
P();
P('**Dépendances internes.** Cinq raisons renvoient à un autre sens de la tranche (借りる, 渡す et 返す à 貸す ; 立つ à 座る ; 吸う à 吹く). Chaque fiche a été lue pour elle-même : aucun verdict ne repose sur le renvoi.');
P();
P('## T5.5 Réserves, divergences et modifications');
P();
P('### Modifications proposées');
P();
P('**Aucune.**');
P();
P('### Divergences relevées (2), sans verdict sur les comparables');
P();
P('1. **渡す, sens 1, et 上げる, sens 1, dans le même lot.** « Donner » (上げる) est en relations sociales › interactions sociales ; « Remettre », dont une autre traduction publiée est « Donner en main propre », est sans catégorie, comme 貸す, 借りる et 返す. Les fiches justifient la différence (un don situé dans les relations entre personnes ; un geste). **Arbitrage : L confirmé** ; la distinction reste documentée.');
P('2. **吹く, sens 2, et 弾く.** « Jouer (d\'un instrument à cordes ou à clavier) » est en musique › instruments, et sa fiche renvoie à 吹く pour les instruments à vent ; 吹く réunit cet emploi et « souffler de l\'air » dans un sens sans catégorie.');
P();
P('### Constat documentaire, hors de l\'objet de l\'audit (pour le volet 1)');
P();
P('Pour trois sens de deux ENTRY décidées dans les premiers lots (出る, lot 04 ; 吹く, lot 07), la donnée publiée porte des éléments que **ni les fiches sources ni les anciens exemples ne contiennent** : la particule に et la nuance « 授業に出る », « 会議に出る » (出る, sens 2) ; la particule が et la nuance « 月が出る » (出る, sens 3) ; la nuance « 笛を吹く » (吹く, sens 2). La doctrine dit que la fiche source décide. Les verdicts de cette tranche ne s\'appuient sur aucun de ces éléments. **Je ne propose rien ici.**');
P();
P('**Arbitrage du 2026-10-08** : ce constat est **ajouté au suivi transversal du volet 1**, comme contrôle de provenance des informations publiées non retrouvées dans les fiches sources (`v_642_s2` : particule に et nuances ; `v_642_s3` : particule が et nuance ; `v_266_s2` : nuance). Il reste à rechercher, ultérieurement, si des décisions explicites autorisaient ces éléments. **Aucun verdict ni aucune correction n\'est pris à ce stade.**');
P();
P('### Réserves, fiche par fiche');
P();
for (const c of cases.filter((x) => x.v.r)) P(`- \`${c.id}\` ${c.e.word} « ${c.s.meaning.primary} » (**${c.v.v}**) : ${c.v.r}`);
P();
P('## T5.6 Les 14 fiches d\'audit');
P();
for (const fam of Object.keys(FAM)) {
  const l = cases.filter((x) => x.v.f === fam);
  P(`### ${FAM[fam]} (${l.length} cas)`);
  P();
  for (const c of l) {
    const { e, s, f, d, v } = c;
    P(`#### \`${c.id}\` · ${e.word} (${e.readings.find((r) => r.default)?.kana}) · « ${s.meaning.primary} » — **${v.v}**`);
    P();
    P(`- **Fiche source** (\`${c.srcId}\`, ${f.type}) : traductions « ${[f.meanings.primary, ...(f.meanings.secondary ?? [])].join(' ; ')} ». Nuance : « ${strip(f.nuance)} » Exemple : « ${strip(f.example?.japanese)} » — « ${strip(f.example?.french)} »`);
    P(`- **État publié** : sens ${c.num} sur ${e.senses.length} ; traduction « ${s.meaning.primary} »${s.meaning.alternatives?.length ? ` (${s.meaning.alternatives.join(', ')})` : ''} ; catégorie \`null\` ; type \`${s.semantic_type}\` ; dimensions ${s.dimensions.length ? s.dimensions.map((x) => `\`${x.axis}:${x.pole}\``).join(', ') : 'aucune'} ; fonctions ${fnOf(s).length ? fnOf(s).join(', ') : 'aucune'} ; relations ${s.relations?.length ? s.relations.map((x) => `\`${x.type}\` → \`${x.target}\``).join(', ') : 'aucune'} ; classe \`${e.linguistic.grammatical_class}\`.${e.senses.length > 1 ? ` Autres sens : ${e.senses.filter((x) => x.id !== c.id).map((x) => `« ${x.meaning.primary} » (\`${cat(x.category)}\`, \`${x.semantic_type}\`)`).join(' ; ')}.` : ''}`);
    P(`- **Justification historique** : ${d.id.replace('A2-04-', '')} (lot ${d.lot.replace('lot-', '')}) : « ${strip(d.reason)} »`);
    P(`- **Fondement vérifié** : ${v.b}.`);
    P(`- **Normes appliquées** : ${v.n.map(norm).join(' ')}`);
    P(`- **Comparables examinés** : ${v.c}`);
    P(`- **Verdict** : **${v.v}**.`);
    P(`- **Motivation** : ${v.m}`);
    if (v.k) P(`- **Modification proposée** : ${v.k}`);
    if (v.r) P(`- **Réserve** : ${v.r}`);
    P();
  }
}
P('## T5.7 Complétude : contrôles reproductibles');
P();
P('Calculés par `a2-05-travail/audit-cat-t4.mjs`, qui écrit cette tranche, sur l\'inventaire (`avertissements-connus.json`), le journal, l\'état publié et le rapport lui-même. Le script s\'arrête si l\'un d\'eux échoue. Commande : `node a2-05-travail/audit-cat-t4.mjs . docs/rapports/etape2-A2-05-audit-null.md`.');
P();
P('| Contrôle | Résultat |');
P('|---|---|');
P('| Les 14 identifiants des fiches sont exactement ceux du périmètre validé | oui, 14 distincts |');
P(`| Chacun porte un avertissement \`categorie-nulle\` de l\'inventaire (${preuves.inventaire} au total) | oui |`);
P('| Chacun a exactement une décision de journal `categorie-nulle`, `validated`, sur ce sens | oui |');
P('| Chaque raison emploie la formule « action générale » | oui |');
P('| Chaque sens a bien `category: null` dans les données publiées | oui |');
P(`| Aucun ne figure parmi les ${preuves.dejaCat} \`categorie-nulle\` déjà arbitrés du rapport | oui |`);
P(`| Les 14 sont exactement le reste de la famille « action générale » | oui ; famille entière : ${preuves.familleTotale} = 22 + 14 |`);
P('| Chaque fiche porte un fondement vérifié, distinct de la formule | oui, 14 |');
P(`| Verdicts de la tranche | L = ${tot.L}, F = ${tot.F}, C = ${tot.C}, N = ${tot.N} ; total 14 |`);
P('| Un verdict C ou F a une modification proposée, et seulement lui | oui |');
P(`| Cumul arbitré avant cette tranche, recompté sur les fiches du rapport | ${preuves.dejaType + preuves.dejaCat} fiches : L = ${preuves.cumulAvant.L}, F = ${preuves.cumulAvant.F}, C = ${preuves.cumulAvant.C}, N = ${preuves.cumulAvant.N} |`);
P(`| Fiches au rapport après cette tranche | ${preuves.dejaType} \`type-nul\` + ${preuves.dejaCat} + 14 \`categorie-nulle\` = ${preuves.dejaType + preuves.dejaCat + 14} sur 147 |`);
P(`| \`categorie-nulle\` restant après cette tranche | ${preuves.reste} (18 et 11) |`);
writeFileSync(outFile, md);
console.log(`tranche 5 écrite : L=${tot.L} F=${tot.F} C=${tot.C} N=${tot.N} ; réserves ${cases.filter((c) => c.v.r).length} ; preuves ${JSON.stringify(preuves)} ; ${md.split('\n').length} lignes`);
