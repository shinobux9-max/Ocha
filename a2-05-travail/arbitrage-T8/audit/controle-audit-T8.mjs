// A2-05 · T8 : contrôle indépendant de l'audit des 16 sens, en proposition. N'importe aucun module v2 ; lecture seule ; n'écrit rien.
// Usage : node controle-audit-T8.mjs <racine du dépôt> [--sabotages]. Code 0 si tout est conforme (et, avec --sabotages, si chaque sabotage est détecté).
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? '.');
const txt = (p) => readFileSync(join(root, p), 'utf8'); const json = (p) => JSON.parse(txt(p));
const RAPPORT = 'docs/rapports/etape2-A2-05-volet1-lot3-T8.md', PERIMETRE = 'docs/rapports/etape2-A2-05-volet1-lot3-T8-perimetre.md';
const NON_ATTESTEES = ['v_502_s2 : Ne… plus'];
const ATTF = { v_471_s1: 'intensifieur', v_471_s2: 'politesse', v_497_s1: 'quantificateur', v_498_s1: 'intensifieur', v_509_s1: 'quantificateur', v_509_s2: 'intensifieur', v_515_s1: 'intensifieur', v_517_s1: 'comparatif', v_520_s1: 'quantificateur', v_607_s1: 'comparatif,intensifieur', v_639_s1: 'quantificateur' };
const base = (s) => String(s ?? '').replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1').replace(/<\/?[a-z]+>/gi, '').replace(/\*+/g, '').replace(/\s+/g, ' ').trim();
const forme = (s) => base(s).toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/\s+/g, ' ').trim();
const cat = (c) => (c ? [c.level_1, c.level_2, c.level_3].filter(Boolean).join(' › ') : 'null');
const fns = (s) => [...(s.linguistic_functions?.grammatical ?? []), ...(s.linguistic_functions?.pragmatic_discourse ?? [])];
const lignes = (t, a, b) => { const i = t.indexOf(a); return t.slice(i, t.indexOf(b, i)).split(/\r?\n/).filter((l) => /^\| \d+ \| `v_/.test(l)).map((l) => l.split('|').map((x) => x.trim())); };

function controler({ rapport, perimetre, vocab, sources, anciens, journal, lots }) {
  const R = []; const ok = (c, nom, d) => R.push({ c: !!c, nom, d: d ?? '' });
  const src = new Map(sources.map((s) => [s.id, s])); const sens = new Map(); for (const e of vocab) for (const s of e.senses) sens.set(s.id, { e, s });
  const per = lignes(perimetre, '## 2. Les 16 sens', '## 3.').map((k) => k[2].replaceAll('`', ''));
  const rows = lignes(rapport, '## 1. Résultat proposé', '**Tri').map((k) => ({ id: k[2].replaceAll('`', ''), mot: k[3], trad: k[4], cat: k[6].replaceAll('`', ''), type: k[7].replaceAll('`', ''), fonc: k[8].replaceAll('`', ''), v: k[10].replaceAll('*', ''), corr: k[11] }));
  ok(rows.length === 16 && new Set(rows.map((r) => r.id)).size === 16 && per.every((id, i) => rows[i]?.id === id), '16 lignes distinctes, mêmes sens et même ordre que le périmètre accepté', String(rows.length));
  ok(/\*\*Statut\*\* : \*\*proposition, non arbitrée\.\*\*/.test(rapport) && !/^## 0\. Arbitrage/m.test(rapport), 'statut : proposition ; aucun §0');
  const faux = rows.filter((r) => { const x = sens.get(r.id); if (!x) return true; return x.e.word !== r.mot || x.s.meaning.primary !== r.trad || cat(x.s.category) !== r.cat || String(x.s.semantic_type) !== r.type || (fns(x.s).join(', ') || 'aucune') !== r.fonc; });
  ok(!faux.length, '§1 égal aux données publiées', faux.map((r) => r.id).join(', '));
  ok(rows.every((r) => r.v === 'conforme' && r.corr === '—'), '16 conformes, aucun écart, aucun suspendu, aucune correction');
  const ec = rows.filter((r) => !!ATTF[r.id] !== (fns(sens.get(r.id)?.s ?? {}).length > 0) || (ATTF[r.id] && fns(sens.get(r.id).s).join() !== ATTF[r.id]));
  ok(!ec.length, 'D5 sans fonction ; D8 : fonctions du relevé', ec.map((r) => r.id).join(', '));
  const abs = []; for (const r of rows) { const x = sens.get(r.id); const so = src.get('n5_' + x?.e.id); if (!so) { abs.push(r.id + ' : fiche absente'); continue; } const f = [so.meanings.primary, ...(so.meanings.secondary ?? [])].map(forme); for (const t of [x.s.meaning.primary, ...(x.s.meaning.alternatives ?? [])]) if (!f.includes(forme(t))) abs.push(r.id + ' : ' + t); }
  ok(abs.sort().join('|') === NON_ATTESTEES.join('|'), 'traductions absentes des traductions des fiches : « Ne… plus » seule, reprise de la nuance', abs.join(' ; '));
  ok(/ne\.\.\. plus/.test(base(src.get('n5_v_502')?.nuance)), '« ne... plus » présent dans la nuance de la fiche de もう');
  const ex = (id) => [src.get(id)?.example, ...(anciens[id] ?? [])].filter(Boolean).map((q) => ({ j: base(q.japanese), f: base(q.french ?? q.translation) }));
  const am = ex('n5_v_515'); ok(am.length === 4 && am.filter((q) => /tellement de /.test(q.f)).length === 3, 'あまり : trois exemples sur quatre traduits par une quantité', String(am.filter((q) => /tellement de /.test(q.f)).length));
  const su = ex('n5_v_518'); ok(su.length === 4 && /Il est venu/.test(su[0].f) && su.slice(1).every((q) => !/est venu/.test(q.f)), 'すぐに : exemple de la fiche au passé, trois anciens tournés vers le présent');
  const ids = [...new Set(rows.map((r) => 'n5_v_' + r.id.match(/^v_(\d+)/)[1]))]; const dec = journal.filter((x) => ids.includes(x.entry));
  ok(ids.length === 14 && dec.length === 56 && dec.every((x) => x.status === 'validated') && dec.filter((x) => x.kind === 'type-nul').length === 11, '14 ENTRY ; 56 décisions validées, dont 11 type-nul', String(dec.length));
  ok(ids.every((id) => lots.some((l) => l.entries?.[id]?.status === 'validated')), 'les 14 ENTRY validées dans leur lot');
  ok(!/\bV1-2[5-9]\b/.test(rapport.replace(/V1-25 (reste libre|non attribué)/g, '')), 'aucun identifiant attribué au-delà de V1-24');
  return R;
}
const sb = json('reconstruction/a2-04/sources/vocab.json'), eb = json('reconstruction/a2-04/sources/exemples.json');
const D = { rapport: txt(RAPPORT), perimetre: txt(PERIMETRE), vocab: json('data/n5/vocab.json'), sources: Array.isArray(sb) ? sb : (sb.vocab ?? sb.items), anciens: eb.vocab ?? eb, journal: json('reconstruction/a2-04/journal.json'), lots: readdirSync(join(root, 'reconstruction/a2-04/lots')).filter((f) => f.endsWith('.json')).map((f) => json('reconstruction/a2-04/lots/' + f)) };
const R = controler(D);
const git = (...a) => execFileSync('git', ['-c', 'core.quotepath=false', ...a], { cwd: root, encoding: 'utf8' });
const sous = git('status', '--porcelain', '--', 'data', 'reconstruction', 'tests', 'tools', 'docs/conception').trim();
R.push({ c: !sous, nom: 'data/, reconstruction/, tests/, tools/, docs/conception/ sans modification', d: sous }); R.push({ c: !git('diff', '--cached', '--name-only').trim(), nom: 'index vide' });
const man = json('a2-05-travail/empreintes-rapports-arbitres.json').empreintes; const diff = Object.entries(man).filter(([p, h]) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex') !== h).map(([p]) => p);
R.push({ c: Object.keys(man).length === 42 && !diff.length, nom: '42 empreintes recalculées, identiques', d: diff.join(', ') }); R.push({ c: !Object.hasOwn(man, RAPPORT), nom: 'rapport d\'audit de T8 hors du manifeste' });
for (const r of R) console.log((r.c ? 'conforme  ' : 'ÉCART     ') + r.nom + (r.d && !r.c ? ' — ' + r.d : ''));
const ko = R.filter((r) => !r.c).length; console.log('\n' + (R.length - ko) + ' conformes sur ' + R.length);
let sok = true;
if (process.argv.includes('--sabotages')) {
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const S = {
    'verdict changé': (d) => { d.rapport = d.rapport.replace('| **conforme** | — |', '| **écart** | — |'); },
    'sens retiré du §1': (d) => { d.rapport = d.rapport.split(/\r?\n/).filter((l) => !l.includes('`v_639_s1` | 全部 | Tout | D8')).join('\n'); },
    'fonction ajoutée en D5': (d) => { d.vocab.find((e) => e.id === 'v_494').senses[0].linguistic_functions.grammatical.push('quantificateur'); },
    'cumul de もっと retiré': (d) => { d.vocab.find((e) => e.id === 'v_607').senses[0].linguistic_functions.pragmatic_discourse = []; },
    'catégorie altérée': (d) => { d.vocab.find((e) => e.id === 'v_639').senses[0].category = null; },
    'traduction nouvelle': (d) => { d.vocab.find((e) => e.id === 'v_498').senses[0].meaning.alternatives.push('Fort'); },
    'exemple de あまり altéré': (d) => { d.anciens.n5_v_515[1].french = 'Autre.'; },
    'exemple de すぐに altéré': (d) => { d.sources.find((s) => s.id === 'n5_v_518').example.french = 'Autre.'; },
    'décision dévalidée': (d) => { d.journal.find((x) => x.id === 'A2-04-D1553').status = 'proposed'; },
    'type-nul changé': (d) => { d.journal.find((x) => x.id === 'A2-04-D1542').kind = 'decision'; },
    'statut arbitré': (d) => { d.rapport = d.rapport.replace('**Statut** : **proposition, non arbitrée.**', '**Statut** : **arbitré.**'); },
  };
  let n = 0; for (const [nom, f] of Object.entries(S)) { const d = clone(D); f(d); const e = controler(d).filter((r) => !r.c); if (e.length) n++; console.log((e.length ? 'détecté   ' : 'NON VU    ') + nom + (e.length ? ' — ' + e[0].nom : '')); }
  const tem = !controler(clone(D)).some((r) => !r.c); console.log('témoin sain : ' + (tem ? 'conforme' : 'ÉCART')); console.log(n + ' sabotages détectés sur ' + Object.keys(S).length); sok = tem && n === Object.keys(S).length;
}
process.exit(ko || !sok ? 1 : 0);
