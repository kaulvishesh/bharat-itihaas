#!/usr/bin/env python3
"""Atlas of India command-line tool (standard library only).

Usage examples (run from anywhere):
  python atlas_cli.py eras
  python atlas_cli.py era 400            # by index (0..) or nearest year (negative = BCE)
  python atlas_cli.py search nalanda
  python atlas_cli.py trace 25.61 85.14  # which realm covered a point in each era
  python atlas_cli.py person akbar
  python atlas_cli.py render 4 -o gupta.svg [--lang hi]

Needs data/atlas.json and geojson/*.geojson (generate with `node scripts/export_data.js` and
`node scripts/export_geojson.js`). Boundaries are approximate and for illustration only.
"""
import argparse
import json
import math
import os
import sys

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
BOX = (59.0, 98.0, 5.0, 38.0)  # lon0, lon1, lat0, lat1


def load():
    with open(os.path.join(ROOT, 'data', 'atlas.json'), encoding='utf-8') as fh:
        data = json.load(fh)
    with open(os.path.join(ROOT, 'geojson', 'index.json'), encoding='utf-8') as fh:
        index = json.load(fh)
    return data, index


def load_geo(index, i):
    with open(os.path.join(ROOT, 'geojson', index[i]['file']), encoding='utf-8') as fh:
        return json.load(fh)


def pick(o, key, lang):
    return o.get(key + 'Hi') if lang == 'hi' and o.get(key + 'Hi') else o.get(key)


def find_era(data, token):
    eras = data['eras']
    try:
        n = int(token)
    except ValueError:
        sys.exit('era must be an integer index or year')
    if 0 <= n < len(eras) and abs(n) < 100:
        return eras[n]
    return min(eras, key=lambda e: abs(e['year'] - n))


def ring_contains(ring, lon, lat):
    inside = False
    j = len(ring) - 1
    for i in range(len(ring)):
        xi, yi = ring[i]
        xj, yj = ring[j]
        if (yi > lat) != (yj > lat) and lon < (xj - xi) * (lat - yi) / (yj - yi) + xi:
            inside = not inside
        j = i
    return inside


def feature_contains(feature, lon, lat):
    for poly in feature['geometry']['coordinates']:
        if ring_contains(poly[0], lon, lat) and not any(ring_contains(h, lon, lat) for h in poly[1:]):
            return True
    return False


def haversine(a, b):
    r = 6371.0
    p1, p2 = math.radians(a[0]), math.radians(b[0])
    dl, dp = math.radians(b[1] - a[1]), p2 - p1
    h = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(h))


def cmd_eras(args, data, index):
    for e in data['eras']:
        print('%2d  %-9s  %s' % (e['index'], e['yearLabel'], pick(e, 'name', args.lang)))


def cmd_era(args, data, index):
    e = find_era(data, args.era)
    geo = load_geo(index, e['index'])
    print('%s — %s' % (pick(e, 'yearLabel', args.lang), pick(e, 'name', args.lang)))
    print(pick(e, 'tag', args.lang))
    if e.get('story'):
        print('\n' + pick(e, 'story', args.lang))
    print('\nRealms:')
    for f in geo['features']:
        print('  -', (f['properties'].get('nameHi') if args.lang == 'hi' else f['properties']['name']))
    print('\nEvents:')
    for v in e['events']:
        print('  %s  %s (%s)' % (pick(v, 'label', args.lang), pick(v, 'title', args.lang), pick(v, 'place', args.lang)))
    print('\nPlaces:', ', '.join(pick(p, 'n', args.lang) for p in e['places']))


def cmd_search(args, data, index):
    toks = [t.lower() for t in args.query]
    hits = []

    def add(kind, era, name, *hay):
        h = ' '.join(str(x or '') for x in hay).lower()
        if all(t in h for t in toks):
            hits.append((kind, era['yearLabel'], name))

    for e in data['eras']:
        add('era', e, e['name'], e['name'], e.get('nameHi'), e['yearLabel'])
        for p in e['places']:
            add('place', e, p['n'], p['n'], p.get('nHi'), p.get('note'))
        for v in e['events']:
            add('event', e, v['title'], v['title'], v['text'], v['place'], v.get('titleHi'))
    for r_era, routes in data['routes'].items():
        for r in routes:
            h = ' '.join([r['n'], r.get('nHi') or '', r['note']]).lower()
            if all(t in h for t in toks):
                hits.append(('journey', r_era, r['n']))
    for p in data['people']:
        h = ' '.join([p['name'], p.get('nameHi') or '', p['bio']]).lower()
        if all(t in h for t in toks):
            hits.append(('person', p['yearsLabel'], p['name'] + ' [' + p['id'] + ']'))
    for kind, when, name in hits[:40]:
        print('%-8s %-12s %s' % (kind, when, name))
    if not hits:
        print('no matches')


def cmd_trace(args, data, index):
    lat, lon = args.lat, args.lon
    names = set()
    for e in data['eras']:
        geo = load_geo(index, e['index'])
        realms = [f['properties']['name'] for f in geo['features'] if feature_contains(f, lon, lat)]
        names.update(realms)
        near = min(e['places'], key=lambda p: haversine((lat, lon), p['ll']))
        d = haversine((lat, lon), near['ll'])
        tag = '  (near %s, %.0f km)' % (near['n'], d) if d < 80 else ''
        print('%-9s %s%s' % (e['yearLabel'], ', '.join(realms) if realms else '—', tag))
    print('\n%d distinct realms across %d snapshots (approximate boundaries).' % (len(names), len(data['eras'])))


def cmd_person(args, data, index):
    p = next((x for x in data['people'] if x['id'] == args.id), None)
    if not p:
        sys.exit('unknown id; choose from: ' + ', '.join(x['id'] for x in data['people']))
    print('%s — %s, %s' % (pick(p, 'name', args.lang), pick(p, 'yearsLabel', args.lang), pick(p, 'role', args.lang)))
    print(pick(p, 'bio', args.lang))
    for i, s in enumerate(p['stops'], 1):
        print('  %d. %-24s %-16s %s' % (i, pick(s, 'n', args.lang), pick(s, 'l', args.lang), pick(s, 'note', args.lang)))


def project(lat, lon, w, h):
    lon0, lon1, lat0, lat1 = BOX
    return (round((lon - lon0) / (lon1 - lon0) * w, 1), round((lat1 - lat) / (lat1 - lat0) * h, 1))


def esc(s):
    return str(s).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')


def cmd_render(args, data, index):
    e = find_era(data, args.era)
    geo = load_geo(index, e['index'])
    w = args.width
    h = round(w * (BOX[3] - BOX[2]) / (BOX[1] - BOX[0]))
    out = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" width="%d" height="%d">' % (w, h, w, h),
           '<rect width="%d" height="%d" fill="#dbe7ea"/>' % (w, h)]
    for f in geo['features']:
        pr = f['properties']
        d = ''
        for poly in f['geometry']['coordinates']:
            for ring in poly:
                d += 'M' + 'L'.join('%s,%s' % project(c[1], c[0], w, h) for c in ring) + 'Z'
        dash = ' stroke-dasharray="6 4"' if pr.get('approx') else ''
        label = pr.get('nameHi') if args.lang == 'hi' and pr.get('nameHi') else pr['name']
        out.append('<path d="%s" fill="%s" fill-opacity="%s" fill-rule="evenodd" stroke="%s" stroke-width="1.4"%s><title>%s</title></path>'
                   % (d, pr['color'], 0.15 if pr.get('approx') else 0.45, pr['color'], dash, esc(label)))
    for p in e['places']:
        x, y = project(p['ll'][0], p['ll'][1], w, h)
        out.append('<circle cx="%s" cy="%s" r="3.2" fill="#2a1f14" stroke="#fff"/>' % (x, y))
        out.append('<text x="%s" y="%s" font-size="9" font-family="sans-serif" fill="#2a1f14" stroke="#fff" stroke-width="2.2" paint-order="stroke">%s</text>' % (x + 5, y + 3, esc(pick(p, 'n', args.lang))))
    out.append('<text x="10" y="%d" font-size="12" font-family="Georgia,serif" fill="#3b2a18">%s — %s</text>' % (h - 10, esc(pick(e, 'yearLabel', args.lang)), esc(pick(e, 'name', args.lang))))
    out.append('</svg>')
    with open(args.out, 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(out))
    print('wrote', args.out)


def main():
    ap = argparse.ArgumentParser(description='Atlas of India CLI (approximate, illustrative boundaries).')
    ap.add_argument('--lang', choices=['en', 'hi'], default='en')
    sub = ap.add_subparsers(dest='cmd', required=True)
    sub.add_parser('eras').set_defaults(fn=cmd_eras)
    s = sub.add_parser('era'); s.add_argument('era'); s.set_defaults(fn=cmd_era)
    s = sub.add_parser('search'); s.add_argument('query', nargs='+'); s.set_defaults(fn=cmd_search)
    s = sub.add_parser('trace'); s.add_argument('lat', type=float); s.add_argument('lon', type=float); s.set_defaults(fn=cmd_trace)
    s = sub.add_parser('person'); s.add_argument('id'); s.set_defaults(fn=cmd_person)
    s = sub.add_parser('render'); s.add_argument('era'); s.add_argument('-o', '--out', default='era.svg'); s.add_argument('--width', type=int, default=900); s.set_defaults(fn=cmd_render)
    args = ap.parse_args()
    data, index = load()
    args.fn(args, data, index)


if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    main()
