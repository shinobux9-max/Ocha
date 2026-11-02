// A2-05 · T7 : contrôle indépendant de l'audit des 24 sens, en proposition. N'importe aucun module v2 ; lecture seule ; n'écrit rien.
// Usage : node controle-audit-T7.mjs <racine du dépôt> [--sabotages]
// Code de sortie : 0 si tout est conforme (et, avec --sabotages, si chaque sabotage est détecté) ; 1 sinon.
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? '.');
const txt = (p) => readFileSync(join(root, p), 'utf8');
const json = (p) => JSON.parse(txt(p));
const RAPPORT = 'docs/rapports/etape2-A2-05-volet1-lot3-T7.md';
const PERIMETRE = 'docs/rapports/etape2-A2-05-volet1-lot3-T7-perimetre.md';
const A9 = ['connecteur', 'discours', 'politesse', 'quantificateur', 'comparatif', 'intensifieur'];
const NON_ATTESTEES = ['v_14_s2 : Madame', 'v_427_s1 : Pas bon'];

const base = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/<\/?[a-z]+>/gi, '').replace(/\*+/g, '').replace(/\s+/g, ' ').trim();
const forme = (s) => base(s).toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/^(de l'|de |l')/, '').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fonctions = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const lignes = (t, titre, fin) => { const a = t.indexOf(titre); const b = t.indexOf(fin, a); return t.slice(a, b).split(/\r?\n/).filter((l) => /^\| \d+ \| `v_/.test(l)).map((l) => l.split('|').map((x) => x.trim())); };

/** Tous les contrôles portant sur des valeurs : ils reçoivent leurs données, pour que les sabotages s'y appliquent. */
function controler({ rapport, perimetre, vocab, sources, anciens, journal, lots }) {
  const R = []; const ok = (c, nom, detail) => R.push({ c: !!c, nom, detail: detail ?? '' });
  const parSrc = new Map(sources.map((s) => [s.id, s]));
  const perim = lignes(perimetre, '## 2. Les 24 sens', '## 3.').map((k) => k[2].replaceAll('`', ''));
  const rows = lignes(rapport, '## 1. Résultat proposé', '**Tri').map((k) => ({ id: k[2].replaceAll('`', ''), mot: k[3], trad: k[4], cat: k[6].replaceAll('`', ''), type: k[7].replaceAll('`', ''), fonc: k[8].replaceAll('`', ''), verdict: k[10].replaceAll('*', ''), corr: k[11] }));
  ok(rows.length === 24 && new Set(rows.map((r) => r.id)).size === 24, '24 lignes distinctes au §1', String(rows.length));
  ok(perim.length === 24 && perim.every((id, i) => rows[i]?.id === id), 'mêmes sens, même ordre que le périmètre accepté, §2');
  ok(/\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/.test(rapport) && !/^## 0\. Arbitrage/m.test(rapport), 'statut : proposition ; aucun §0');
  const sens = new Map(); for (const e of vocab) for (const s of e.senses) sens.set(s.id, { e, s });
  const faux = rows.filter((r) => { const x = sens.get(r.id); if (!x) return true; const f = fonctions(x.s); return x.e.word !== r.mot || x.s.meaning.primary !== r.trad || cat(x.s.category) !== r.cat || x.s.semantic_type !== r.type || (f.join(', ') || 'aucune') !== r.fonc; });
  ok(!faux.length, 'mot, traduction, catégorie, type et fonctions du §1 égaux aux données publiées', faux.map((r) => r.id).join(', '));
  const n = (v) => rows.filter((r) => r.verdict === v).length;
  ok(n('conforme') === 22 && n('écart') === 1 && n('suspendu') === 1, 'verdicts : 22 conformes, 1 écart, 1 suspendu', n('conforme') + ', ' + n('écart') + ', ' + n('suspendu'));
  ok(rows.find((r) => r.verdict === 'écart')?.id === 'v_427_s1' && rows.find((r) => r.verdict === 'suspendu')?.id === 'v_419_s1', 'écart : まずい, sens 1 ; suspendu : 向こう');
  const corr = rows.filter((r) => r.corr !== '—');
  ok(corr.length === 1 && corr[0].id === 'v_427_s1' && corr[0].corr === 'V1-24', 'une seule correction proposée, V1-24, sur l\'écart');
  const avecA9 = rows.filter((r) => fonctions(sens.get(r.id)?.s ?? {}).some((f) => A9.includes(f)));
  ok(!avecA9.length, 'aucun des 24 sens ne porte de fonction d\'A9', avecA9.map((r) => r.id).join(', '));
  const deic = rows.filter((r) => fonctions(sens.get(r.id)?.s ?? {}).includes('deictique')).map((r) => r.id).sort().join(',');
  ok(deic === 'v_359_s1,v_663_s1', '`deictique` sur 近々 et 後, sens 1, seulement', deic);
  // Les traductions, recomptées une à une contre la fiche, parenthèses et article initial neutralisés
  const absentes = [];
  for (const r of rows) {
    const x = sens.get(r.id); const src = parSrc.get('n5_' + x?.e.id);
    if (!src) { absentes.push(r.id + ' : fiche absente'); continue; }
    const f = [src.meanings.primary, ...(src.meanings.secondary ?? [])].map(forme);
    for (const t of [x.s.meaning.primary, ...(x.s.meaning.alternatives ?? [])]) if (!f.includes(forme(t))) absentes.push(r.id + ' : ' + t);
  }
  ok(absentes.sort().join('|') === NON_ATTESTEES.join('|'), 'traductions publiées absentes des fiches : exactement « Madame » et « Pas bon »', absentes.join(' ; '));
  const d = (id) => journal.find((x) => x.id === 'A2-04-' + id);
  ok(JSON.stringify(d('D0078')?.after ?? '').includes('Madame'), '« Madame » est posée par la valeur « après » de D0078');
  ok(!journal.filter((x) => x.entry === 'n5_v_427').some((x) => JSON.stringify([x.before, x.after, x.reason]).includes('Pas bon')), '« Pas bon » : aucune décision de l\'ENTRY ne la pose ni ne la cite');
  // Les exemples, recomptés
  const exemples = (id) => [parSrc.get(id)?.example?.japanese, ...(anciens[id] ?? []).map((q) => q.japanese)].map(base).filter(Boolean);
  const exA = exemples('n5_v_663'); ok(exA.length === 4 && exA.every((x) => /(の|た)\s*後/.test(x)), '後 : quatre exemples, tous avec un repère nommé', String(exA.length));
  const exM = exemples('n5_v_419'); ok(exM.length === 4 && exM.every((x) => /の\s*向こう/.test(x)), '向こう : quatre exemples, tous X の 向こう', String(exM.length));
  const exC = exemples('n5_v_359'); ok(exC.length === 4 && exC.every((x) => x.startsWith('近々')), '近々 : quatre exemples, le mot en tête de phrase, sans repère nommé', String(exC.length));
  const nMai = [329, 332, 330, 331, 333, 334].flatMap((k) => exemples('n5_v_' + k)).filter((x) => /毎.\s*の/.test(x)).length;
  ok(nMai === 7, 'tours 毎X の + nom dans les exemples : 7', String(nMai));
  // Les décisions
  const ent = new Set(rows.map((r) => 'n5_v_' + r.id.match(/^v_(\d+)/)[1]));
  const dec = journal.filter((x) => ent.has(x.entry));
  ok(ent.size === 24, '24 ENTRY distinctes');
  ok(dec.length === 43 && dec.every((x) => x.status === 'validated'), '43 décisions sur ces ENTRY, toutes validées', String(dec.length));
  const pasValide = [...ent].filter((id) => !lots.some((l) => l.entries?.[id]?.status === 'validated'));
  ok(!pasValide.length, 'chacune des 24 ENTRY validée dans son lot', pasValide.join(', '));
  ok(!/\bV1-2[5-9]\b/.test(rapport), 'aucun identifiant au-delà de V1-24 dans le rapport');
  return R;
}

const lots = readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => json('reconstruction/a2-04/lots/' + f));
const sourcesBrutes = json('reconstruction/a2-04/sources/vocab.json');
const exemplesBruts = json('reconstruction/a2-04/sources/exemples.json');
const D = { rapport: txt(RAPPORT), perimetre: txt(PERIMETRE), vocab: json('data/n5/vocab.json'), sources: Array.isArray(sourcesBrutes) ? sourcesBrutes : (sourcesBrutes.vocab ?? sourcesBrutes.items), anciens: exemplesBruts.vocab ?? exemplesBruts, journal: json('reconstruction/a2-04/journal.json'), lots };

const R = controler(D);
// Contrôles du dépôt : données, normes, manifeste
const git = (...a) => execFileSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8' });
const sous = git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').trim();
R.push({ c: !sous, nom: 'data/, reconstruction/, tests/, tools/, docs/conception/ sans modification', detail: sous });
R.push({ c: !git('diff', '--cached', '--name-only').trim(), nom: 'index vide' });
const manifeste = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes;
const differents = Object.entries(manifeste).filter(([p, v]) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex') !== (typeof v === 'string' ? v : v.sha256)).map(([p]) => p);
R.push({ c: Object.keys(manifeste).length === 40 && !differents.length, nom: '40 empreintes recalculées, identiques', detail: Object.keys(manifeste).length + ' ; ' + differents.join(', ') });
R.push({ c: !Object.hasOwn(manifeste, RAPPORT), nom: 'rapport de T7 hors du manifeste' });

for (const r of R) console.log((r.c ? 'conforme  ' : 'ÉCART     ') + r.nom + (r.detail && !r.c ? ' — ' + r.detail : ''));
const ecarts = R.filter((r) => !r.c).length;
console.log('\n' + (R.length - ecarts) + ' conformes sur ' + R.length);

let saboteOk = true;
if (process.argv.includes('--sabotages')) {
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const S = {
    'verdict changé au §1': (d) => { d.rapport = d.rapport.replace('| **écart** | V1-24 |', '| **conforme** | — |'); },
    'un sens retiré du §1': (d) => { d.rapport = d.rapport.split(/\r?\n/).filter((l) => !l.includes('`v_429_s1` | 上手 | Doué | D4')).join('\n'); },
    'catégorie altérée dans les données': (d) => { d.vocab.find((e) => e.id === 'v_329').senses[0].category.level_3 = 'rare'; },
    'fonction d\'A9 ajoutée dans les données': (d) => { d.vocab.find((e) => e.id === 'v_631').senses[0].linguistic_functions.grammatical.push('quantificateur'); },
    '`deictique` retiré de 近々': (d) => { d.vocab.find((e) => e.id === 'v_359').senses[0].linguistic_functions.grammatical = []; },
    'traduction nouvelle publiée': (d) => { d.vocab.find((e) => e.id === 'v_185').senses[0].meaning.alternatives.push('Abordable'); },
    '« Pas bon » attestée par la fiche': (d) => { d.sources.find((s) => s.id === 'n5_v_427').meanings.secondary.push('Pas bon'); },
    '« Madame » retirée de D0078': (d) => { d.journal.find((x) => x.id === 'A2-04-D0078').after = ['S1 Tante']; },
    'décision citant « Pas bon »': (d) => { d.journal.find((x) => x.id === 'A2-04-D0198').reason += ' Pas bon.'; },
    'exemple de 後 sans repère': (d) => { d.anciens.n5_v_663[0].japanese = '朝 に 後 で 飲みます'.replace('に 後', 'に、 後'); },
    'exemple de 向こう sans repère': (d) => { d.anciens.n5_v_419[0].japanese = '向こう に あります'; },
    'tour 毎X の retiré': (d) => { d.anciens.n5_v_333[1].japanese = '毎朝 通勤 します'; },
    'décision dévalidée': (d) => { d.journal.find((x) => x.id === 'A2-04-D0952').status = 'proposed'; },
    'statut arbitré au rapport': (d) => { d.rapport = d.rapport.replace('**Statut** : **proposition, non arbitrée.**', '**Statut** : **arbitré.**'); },
  };
  let detectes = 0;
  for (const [nom, f] of Object.entries(S)) { const d = clone(D); f(d); const e = controler(d).filter((r) => !r.c); if (e.length) detectes++; console.log((e.length ? 'détecté   ' : 'NON VU    ') + nom + (e.length ? ' — ' + e[0].nom : '')); }
  const temoin = controler(clone(D)).filter((r) => !r.c).length === 0;
  console.log('témoin sain : ' + (temoin ? 'conforme' : 'ÉCART'));
  console.log(detectes + ' sabotages détectés sur ' + Object.keys(S).length);
  saboteOk = temoin && detectes === Object.keys(S).length;
}
process.exit(ecarts || !saboteOk ? 1 : 0);
