import json, sys, os

def bbox(geom):
    pts = []
    def walk(c):
        if isinstance(c[0], (int, float)):
            pts.append(c)
        else:
            for x in c: walk(x)
    walk(geom['coordinates'])
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    return min(xs), min(ys), max(xs), max(ys)

d = sys.argv[1]
for y in sys.argv[2:]:
    j = json.load(open(os.path.join(d, 'world_%s.geojson' % y), encoding='utf-8'))
    print('==', y, len(j['features']))
    for f in j['features']:
        g = f.get('geometry')
        if not g: continue
        x0, y0, x1, y1 = bbox(g)
        # overlaps South Asia box
        if x1 > 60 and x0 < 98 and y1 > 5 and y0 < 38:
            p = f['properties']
            print('  %-32s | %-22s | %s' % (p.get('NAME'), p.get('SUBJECTO'), [round(v) for v in (x0, y0, x1, y1)]))
