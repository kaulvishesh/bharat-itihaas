"""Build india-atlas/js/geo.js from historical-basemaps GeoJSON snapshots.

Usage: python -I scripts/build_geo.py <raw_dir> <out_js>
Data: aourednik/historical-basemaps (GPL-3.0). Boundaries are approximations.
"""
import json, os, sys

RAW, OUT = sys.argv[1], sys.argv[2]
TOL = 0.035      # Douglas-Peucker tolerance in degrees (~4 km)
MIN_AREA = 0.02  # drop slivers smaller than this (deg^2) unless it is all there is

# (source NAME, source bbox [x0,y0,x1,y1] or None, English, Hindi, colour)
# "manual" polities carry hand-drawn [lat,lon] rings and are flagged approximate.
S = {}

S['bc500'] = ('bc500', [
    ('Magadha', None, 'Magadha', 'मगध', '#c2410c'),
    ('Hindu kingdoms', [67, 19, 89, 33], 'Mahajanapadas & janapadas (north India)', 'महाजनपद और जनपद (उत्तर भारत)', '#15803d'),
    ('Iron Age megalith cultures', None, 'Megalithic Iron Age cultures (Deccan & south)', 'महापाषाणीय लौह-युगीन संस्कृतियाँ (दक्कन और दक्षिण)', '#7c3aed'),
    ('Achaemenid Empire', None, 'Achaemenid Empire (Gandhara & Hindush satrapies)', 'हखामनी साम्राज्य (गांधार व हिन्दुश)', '#64748b'),
    ('Simhala', None, 'Sinhala (Sri Lanka)', 'सिंहल (श्रीलंका)', '#0f766e'),
])
S['bc300'] = ('bc300', [
    ('Mauryan Empire', None, 'Maurya Empire (Chandragupta)', 'मौर्य साम्राज्य (चंद्रगुप्त)', '#b45309'),
    ('Seleucid Kingdom', None, 'Seleucid Kingdom', 'सेल्यूकस साम्राज्य', '#64748b'),
    ('Hindu kingdoms and republics', None, 'Kingdoms & gana-republics (Deccan, Kalinga, Andhra)', 'राज्य और गणराज्य (दक्कन, कलिंग, आंध्र)', '#15803d'),
    ('Hindu kingdoms', [74, 8, 80, 14], 'Tamilakam (Chera, Chola, Pandya)', 'तमिलकम (चेर, चोल, पांड्य)', '#0f766e'),
    ('Simhala', None, 'Sinhala (Sri Lanka)', 'सिंहल (श्रीलंका)', '#0369a1'),
])
S['bc200'] = ('bc200', [
    ('Mauryan Empire', None, 'Maurya Empire (Ashoka)', 'मौर्य साम्राज्य (अशोक)', '#b45309'),
    ('Iron Age chieftainships', None, 'Tamilakam (Chera, Chola, Pandya)', 'तमिलकम (चेर, चोल, पांड्य)', '#0f766e'),
    ('Bactria', None, 'Greco-Bactrian Kingdom', 'यूनानी-बैक्ट्रियाई राज्य', '#64748b'),
    ('Simhala', None, 'Sinhala (Sri Lanka)', 'सिंहल (श्रीलंका)', '#0369a1'),
])
S['400'] = ('400', [
    ('Gupta Empire', None, 'Gupta Empire', 'गुप्त साम्राज्य', '#b45309'),
    ('Satavahanihara', None, 'Deccan kingdoms (Vakataka region)', 'दक्कन के राज्य (वाकाटक क्षेत्र)', '#0369a1'),
    ('Hindu kingdoms', [75, 8, 80, 14], 'Tamil kingdoms (Pallava, Chola, Pandya, Chera)', 'तमिल राज्य (पल्लव, चोल, पांड्य, चेर)', '#0f766e'),
    ('Suren Kingdom', None, 'Indo-Parthian / Suren Kingdom', 'इंडो-पार्थियन / सुरेन राज्य', '#7c3aed'),
    ('Simhala', None, 'Sinhala (Sri Lanka)', 'सिंहल (श्रीलंका)', '#be185d'),
])
S['600'] = ('600', [
    ('Kanauj', None, "Harsha's kingdom (Kanyakubja)", 'हर्ष का राज्य (कन्नौज)', '#b45309'),
    ('Chalukyas', None, 'Chalukyas of Badami', 'बादामी के चालुक्य', '#0369a1'),
    ('Pallavas', None, 'Pallavas', 'पल्लव', '#be185d'),
    ('Shaskanka', None, 'Gauda (Shashanka)', 'गौड़ (शशांक)', '#7c3aed'),
    ('Kamarupa', None, 'Kamarupa', 'कामरूप', '#6d28d9'),
    ('Chauhans', None, 'Chauhans', 'चौहान', '#a16207'),
    ('Hindu kingdoms', [66, 17, 85, 37], 'Other north & central Indian kingdoms', 'उत्तर व मध्य भारत के अन्य राज्य', '#15803d'),
    ('Hindu kingdoms', [75, 8, 80, 14], 'Pandyas, Cholas & Cheras', 'पांड्य, चोल और चेर', '#0f766e'),
    ('Simhala', None, 'Sinhala (Sri Lanka)', 'सिंहल (श्रीलंका)', '#0891b2'),
])
S['800'] = ('800', [
    ('Gurjara Pratihara', None, 'Gurjara-Pratiharas', 'गुर्जर-प्रतिहार', '#15803d'),
    ('Palas', None, 'Palas', 'पाल', '#7c3aed'),
    ('Rashtrakuta state', None, 'Rashtrakutas', 'राष्ट्रकूट', '#b45309'),
    ('Pallava state', None, 'Pallavas', 'पल्लव', '#be185d'),
    ('Pandya state', None, 'Pandyas', 'पांड्य', '#0f766e'),
    ('Vallabhi', None, 'Maitrakas of Valabhi', 'वल्लभी के मैत्रक', '#0369a1'),
    ('Chauhans', None, 'Chauhans', 'चौहान', '#a16207'),
    ('Hindu states', [68, 23, 79, 33], 'Sindh & Punjab states', 'सिंध और पंजाब के राज्य', '#6d28d9'),
    ('Hindu states', [79, 13, 85, 23], 'Eastern Deccan states', 'पूर्वी दक्कन के राज्य', '#0891b2'),
    ('Sinhalese kingdoms', None, 'Sinhalese kingdoms', 'सिंहली राज्य', '#0369a1'),
])
S['1000'] = ('1000', [
    ('Chola Empire', None, 'Chola Empire', 'चोल साम्राज्य', '#b45309'),
    ('Chalukya Empire', None, 'Western Chalukyas', 'पश्चिमी चालुक्य', '#0369a1'),
    ('Palas', None, 'Palas', 'पाल', '#7c3aed'),
    ('Pratiharas', None, 'Pratiharas', 'प्रतिहार', '#15803d'),
    ('Rajput kingdoms', None, 'Rajput kingdoms', 'राजपूत राज्य', '#a16207'),
    ('Chauhans', None, 'Chauhans', 'चौहान', '#ca8a04'),
    ('Kalinga', None, 'Eastern Gangas (Kalinga)', 'पूर्वी गंग (कलिंग)', '#0f766e'),
    ('Orissa', None, 'Odisha', 'ओडिशा', '#0891b2'),
    ('Senas', None, 'Senas', 'सेन', '#be185d'),
    ('Ghaznavid Emirate', None, 'Ghaznavid Emirate', 'ग़ज़नवी अमीरात', '#b91c1c'),
])
S['1200'] = ('1200', [
    ('Sultanate of Delhi', None, 'Delhi Sultanate (from 1206)', 'दिल्ली सल्तनत (1206 से)', '#b45309'),
    ('Rajput kingdoms', None, 'Rajput & other kingdoms', 'राजपूत और अन्य राज्य', '#15803d'),
    ('Chola Empire', None, 'Cholas (late)', 'चोल (उत्तरकालीन)', '#0f766e'),
    ('Nepal', None, 'Nepal', 'नेपाल', '#7c3aed'),
    ('Kamarupa', None, 'Kamarupa / Assam', 'कामरूप / असम', '#6d28d9'),
    ('Ghaznavid Emirate', None, 'Ghaznavids (remnant)', 'ग़ज़नवी (अवशेष)', '#b91c1c'),
])
S['1300'] = ('1300', [
    ('Sultanate of Delhi', None, 'Delhi Sultanate', 'दिल्ली सल्तनत', '#b45309'),
    ('minor Hindu kingdoms', None, 'Hoysala, Kakatiya & Rajput kingdoms', 'होयसल, काकतीय और राजपूत राज्य', '#15803d'),
    ('Orissa', None, 'Odisha (Eastern Gangas)', 'ओडिशा (पूर्वी गंग)', '#0891b2'),
    ('Pandya state', None, 'Pandyas', 'पांड्य', '#0f766e'),
    ('Chola Empire', None, 'Chola remnants', 'चोल अवशेष', '#be185d'),
    ('Kashmir and Ladakh', None, 'Kashmir & Ladakh', 'कश्मीर और लद्दाख', '#7c3aed'),
    ('Sinhalese kingdom', None, 'Sinhalese kingdom', 'सिंहली राज्य', '#0369a1'),
    ('manual:vijayanagara0', None, 'Vijayanagara core (founded 1336, approx.)', 'विजयनगर का केंद्र (स्थापना 1336, अनुमानित)', '#be185d'),
])
S['1530'] = ('1530', [
    ('Mughal Empire', None, 'Mughal Empire (new)', 'मुग़ल साम्राज्य (नवोदित)', '#b45309'),
    ('Vijayanagara', None, 'Vijayanagara Empire', 'विजयनगर साम्राज्य', '#be185d'),
    ('Rajputana', None, 'Rajput kingdoms', 'राजपूत राज्य', '#15803d'),
    ('Bengal', None, 'Bengal Sultanate', 'बंगाल सल्तनत', '#7c3aed'),
    ('Orissa', None, 'Gajapati Odisha', 'गजपति ओडिशा', '#0f766e'),
    ('Bijapur', None, 'Bijapur', 'बीजापुर', '#0369a1'),
    ('Ahmadnagar', None, 'Ahmadnagar', 'अहमदनगर', '#0891b2'),
    ('Golkonda', None, 'Golkonda', 'गोलकुंडा', '#a16207'),
    ('Bidar', None, 'Bidar', 'बीदर', '#9d174d'),
    ('Islamic and Hindu states', [60, 17, 94, 34], 'Gujarat, Malwa, Kashmir, Sindh & other states', 'गुजरात, मालवा, कश्मीर, सिंध व अन्य राज्य', '#64748b'),
    ('Saylan', None, 'Sri Lanka (Kotte & Kandy)', 'श्रीलंका (कोट्टे और कैंडी)', '#ca8a04'),
])
S['1700'] = ('1700', [
    ('Mughal Empire', None, 'Mughal Empire', 'मुग़ल साम्राज्य', '#b45309'),
    ('Hindu kingdoms', [75, 8, 80, 14], 'Southern kingdoms (Nayakas, Travancore…)', 'दक्षिणी राज्य (नायक, त्रावणकोर…)', '#0f766e'),
    ('Kandy', None, 'Kandy', 'कैंडी', '#0369a1'),
    ('Bhutan', None, 'Bhutan', 'भूटान', '#7c3aed'),
    ('Arakan (Indian princely state)', None, 'Arakan', 'अराकान', '#6d28d9'),
    ('manual:maratha', None, 'Maratha heartland (approx.)', 'मराठा क्षेत्र (अनुमानित)', '#15803d'),
])
S['1783'] = ('1783', [
    ('Maratha Confederacy', None, 'Maratha Confederacy', 'मराठा संघ', '#15803d'),
    ('Mahratta states', None, 'Scindia & Holkar states (Maratha)', 'सिंधिया और होल्कर (मराठा)', '#65a30d'),
    ('Mysore', None, 'Mysore (Hyder Ali / Tipu)', 'मैसूर (हैदर अली / टीपू)', '#be185d'),
    ('Golconda', None, 'Hyderabad (Nizam)', 'हैदराबाद (निज़ाम)', '#0369a1'),
    ('Carnatic', None, 'Carnatic (Nawab of Arcot)', 'कर्नाटक (अर्कोट का नवाब)', '#0891b2'),
    ('Bengal', None, 'Bengal (East India Company)', 'बंगाल (ईस्ट इंडिया कंपनी)', '#b91c1c'),
    ('India', [80, 16, 85, 21], 'Northern Circars (Company)', 'उत्तरी सरकार (कंपनी)', '#dc2626'),
    ('Madras', None, 'Madras (Company)', 'मद्रास (कंपनी)', '#ef4444'),
    ('Oudh', None, 'Awadh (Oudh)', 'अवध', '#7c3aed'),
    ('Lahore', None, 'Sikh Misls (Lahore)', 'सिख मिसलें (लाहौर)', '#ca8a04'),
    ('Multan', None, 'Multan', 'मुल्तान', '#a16207'),
    ('Sind', None, 'Sindh (Talpurs)', 'सिंध (तालपुर)', '#6d28d9'),
    ('Afghanistan', None, 'Durrani Empire', 'दुर्रानी साम्राज्य', '#64748b'),
    ('Nepal', None, 'Nepal', 'नेपाल', '#9333ea'),
    ('Assam', None, 'Ahom Assam', 'अहोम असम', '#0d9488'),
    ('Travancore', None, 'Travancore', 'त्रावणकोर', '#0f766e'),
    ('Cochin', None, 'Cochin', 'कोचीन', '#14b8a6'),
    ('Malabar', None, 'Malabar', 'मालाबार', '#2dd4bf'),
    ('Goa', None, 'Goa (Portuguese)', 'गोवा (पुर्तगाली)', '#f97316'),
    ('Kandy', None, 'Kandy', 'कैंडी', '#0369a1'),
])
S['1900'] = ('1900', [
    ('British Raj', None, 'British India & Princely States', 'ब्रिटिश भारत और रियासतें', '#b91c1c'),
    ('Nepal', None, 'Nepal', 'नेपाल', '#9333ea'),
    ('Bhutan', None, 'Bhutan', 'भूटान', '#7c3aed'),
    ('Afghanistan', None, 'Afghanistan', 'अफ़ग़ानिस्तान', '#64748b'),
    ('Ceylon', None, 'Ceylon (British)', 'सीलोन (ब्रिटिश)', '#0369a1'),
])
S['1960'] = ('1960', [
    ('India', None, 'Republic of India', 'भारत गणराज्य', '#15803d'),
    ('Pakistan', None, 'Pakistan (West & East)', 'पाकिस्तान (पश्चिमी व पूर्वी)', '#166534'),
    ('Nepal', None, 'Nepal', 'नेपाल', '#9333ea'),
    ('Bhutan', None, 'Bhutan', 'भूटान', '#7c3aed'),
    ('Sri Lanka', None, 'Ceylon (Sri Lanka)', 'सीलोन (श्रीलंका)', '#0369a1'),
    ('Afghanistan', None, 'Afghanistan', 'अफ़ग़ानिस्तान', '#64748b'),
])
S['2010'] = ('2010', [
    ('India', None, 'India', 'भारत', '#15803d'),
    ('Pakistan', None, 'Pakistan', 'पाकिस्तान', '#166534'),
    ('Bangladesh', None, 'Bangladesh', 'बांग्लादेश', '#0d9488'),
    ('Nepal', None, 'Nepal', 'नेपाल', '#9333ea'),
    ('Bhutan', None, 'Bhutan', 'भूटान', '#7c3aed'),
    ('Sri Lanka', None, 'Sri Lanka', 'श्रीलंका', '#0369a1'),
    ('Afghanistan', None, 'Afghanistan', 'अफ़ग़ानिस्तान', '#64748b'),
])

S['100'] = ('100', [
    ('Suren Kingdom', None, 'Kushan Empire (Indus & Gandhara)', 'कुषाण साम्राज्य (सिंधु व गांधार)', '#b45309'),
    ('Kushan Empire', None, 'Kushan heartland (Bactria)', 'कुषाण केंद्र (बैक्ट्रिया)', '#92400e'),
    ('Saka Kingdom', None, 'Western Satraps (Shakas)', 'पश्चिमी क्षत्रप (शक)', '#0369a1'),
    ('Satavahanihara', None, 'Satavahanas', 'सातवाहन', '#15803d'),
    ('Hindu kingdoms', [75, 21, 94, 34], 'Gangetic kingdoms (Mitras, Panchalas & others)', 'गांगेय राज्य (मित्र, पांचाल व अन्य)', '#7c3aed'),
    ('Kalinga', None, 'Kalinga (Mahameghavahana)', 'कलिंग (महामेघवाहन)', '#be185d'),
    ('Hindu kingdoms', [75, 8, 80, 14], 'Tamilakam (Chera, Chola, Pandya)', 'तमिलकम (चेर, चोल, पांड्य)', '#0f766e'),
    ('Simhala', None, 'Sinhala (Sri Lanka)', 'सिंहल (श्रीलंका)', '#0891b2'),
])
S['500'] = ('500', [
    ('Gupta Empire', None, 'Gupta Empire (declining)', 'गुप्त साम्राज्य (क्षीण)', '#b45309'),
    ('Vakataka', None, 'Vakatakas', 'वाकाटक', '#0369a1'),
    ('Kadambas', None, 'Kadambas', 'कदंब', '#15803d'),
    ('Western Gangas', None, 'Western Gangas', 'पश्चिमी गंग', '#65a30d'),
    ('Vishnu-Kundins', None, 'Vishnukundins', 'विष्णुकुंडिन', '#a16207'),
    ('Pallavas', None, 'Pallavas', 'पल्लव', '#be185d'),
    ('Pandyas', None, 'Pandyas', 'पांड्य', '#0f766e'),
    ('Cheras', None, 'Cheras', 'चेर', '#14b8a6'),
    ('Cholas', None, 'Cholas (early)', 'चोल (प्रारंभिक)', '#0891b2'),
    ('Kushan Principalities', None, 'Kushan remnants & Hun frontier', 'कुषाण अवशेष और हूण सीमा', '#7c3aed'),
    ('Simhala', None, 'Sinhala (Sri Lanka)', 'सिंहल (श्रीलंका)', '#0369a1'),
])
S['900'] = ('900', [
    ('Gurjara Pratihara', None, 'Gurjara-Pratiharas', 'गुर्जर-प्रतिहार', '#15803d'),
    ('Palas', None, 'Palas', 'पाल', '#7c3aed'),
    ('Rashtrakuta', None, 'Rashtrakutas', 'राष्ट्रकूट', '#b45309'),
    ('Cholas', None, 'Cholas (resurgent at Thanjavur)', 'चोल (तंजावुर में पुनरुत्थान)', '#0891b2'),
    ('Pallava', None, 'Pallavas (late)', 'पल्लव (उत्तरकालीन)', '#be185d'),
    ('Pandya state', None, 'Pandyas', 'पांड्य', '#0f766e'),
    ('Vengi', None, 'Eastern Chalukyas (Vengi)', 'पूर्वी चालुक्य (वेंगी)', '#0369a1'),
    ('Somvamsis', None, 'Somavamshis', 'सोमवंशी', '#a16207'),
    ('Hindu Shahis', None, 'Hindu Shahis', 'हिन्दू शाही', '#6d28d9'),
    ('Multan', None, 'Multan emirate', 'मुल्तान अमीरात', '#b91c1c'),
    ('Sindh', None, 'Arab Sindh', 'अरब सिंध', '#dc2626'),
    ('Chauhans', None, 'Chauhans', 'चौहान', '#ca8a04'),
    ('Lambakannas', None, 'Sri Lanka (Anuradhapura)', 'श्रीलंका (अनुराधापुर)', '#0ea5e9'),
    ('manual:c900_chandella', None, 'Chandellas & Kalachuris (approx.)', 'चंदेल और कलचुरि (अनुमानित)', '#a16207'),
    ('manual:c900_malwa', None, 'Malwa — Paramara feudatories (approx.)', 'मालवा — परमार सामंत (अनुमानित)', '#65a30d'),
    ('manual:c900_gondwana', None, 'Gondwana chiefdoms (approx.)', 'गोंडवाना सरदारियाँ (अनुमानित)', '#0f766e'),
    ('manual:c900_kashmir', None, 'Kashmir — Utpalas (approx.)', 'कश्मीर — उत्पल (अनुमानित)', '#be185d'),
    ('manual:c900_nepal', None, 'Nepal valley kingdoms (approx.)', 'नेपाल घाटी के राज्य (अनुमानित)', '#9333ea'),
    ('manual:c900_orissa', None, 'Eastern coast — Gangas & Telugu chiefs (approx.)', 'पूर्वी तट — गंग और तेलुगु सरदार (अनुमानित)', '#0891b2'),
])
S['1650'] = ('1650', [
    ('Mughal Empire', None, 'Mughal Empire (Shah Jahan)', 'मुग़ल साम्राज्य (शाहजहाँ)', '#b45309'),
    ('Vijayanagara', None, 'Vijayanagara remnants & Nayakas', 'विजयनगर अवशेष और नायक', '#be185d'),
    ('Bijapur', None, 'Bijapur', 'बीजापुर', '#0369a1'),
    ('Golkonda', None, 'Golkonda', 'गोलकुंडा', '#a16207'),
    ('Ahmadnagar', None, 'Ahmadnagar (Nizam Shahi, fading)', 'अहमदनगर (निज़ामशाही, क्षीण)', '#0891b2'),
    ('Bidar', None, 'Bidar', 'बीदर', '#9d174d'),
    ('Islamic and Hindu states', [77, 17, 87, 24], 'Gondwana & Odisha states', 'गोंडवाना और ओडिशा के राज्य', '#15803d'),
    ('Nepal', None, 'Nepal', 'नेपाल', '#9333ea'),
    ('Bhutan', None, 'Bhutan', 'भूटान', '#7c3aed'),
    ('Kandy', None, 'Kandy', 'कैंडी', '#0ea5e9'),
    ('Arakan', None, 'Arakan', 'अराकान', '#6d28d9'),
])

# Hand-drawn, flagged approximate in the UI. [lat, lon]
MANUAL = {
    'c900_chandella': [[[[26.0,79.3],[25.8,81.8],[24.6,83.4],[23.0,82.3],[23.0,79.2],[24.3,78.1]]]],
    'c900_malwa': [[[[24.9,74.4],[24.7,77.2],[23.2,77.8],[22.0,75.8],[22.6,74.0]]]],
    'c900_gondwana': [[[[22.9,79.2],[22.7,82.4],[21.2,83.6],[19.6,82.2],[19.5,79.6],[21.0,78.6]]]],
    'c900_kashmir': [[[[35.0,73.8],[35.2,76.6],[33.6,77.2],[32.8,75.4],[33.6,73.9]]]],
    'c900_nepal': [[[[28.3,81.0],[28.8,83.6],[28.1,86.4],[27.2,86.2],[27.1,83.2],[27.6,81.2]]]],
    'c900_orissa': [[[[20.6,84.8],[20.3,86.6],[18.4,84.6],[17.4,82.8],[18.4,82.2],[19.8,83.4]]]],
    'vijayanagara0': [[[[15.9,75.5],[15.8,77.3],[14.2,77.5],[13.7,76.2],[14.4,75.1]]]],
    'maratha': [[[[21.0,73.5],[20.2,75.8],[18.6,76.4],[16.8,76.0],[15.6,74.4],[16.5,73.6],[18.0,73.2],[19.6,72.9],[20.6,73.1]]]]
}


def walk_bbox(coords, acc):
    if isinstance(coords[0], (int, float)):
        acc.append(coords)
    else:
        for c in coords:
            walk_bbox(c, acc)


def bbox_of(g):
    pts = []
    walk_bbox(g['coordinates'], pts)
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    return [min(xs), min(ys), max(xs), max(ys)]


def bbox_match(a, b, tol=1.6):
    return all(abs(x - y) <= tol for x, y in zip(a, b))


def dp(points, tol):
    if len(points) < 4:
        return points
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        a, b = stack.pop()
        ax, ay = points[a]; bx, by = points[b]
        dx, dy = bx - ax, by - ay
        den = dx * dx + dy * dy
        best, idx = -1.0, -1
        for i in range(a + 1, b):
            px, py = points[i]
            if den == 0:
                d = ((px - ax) ** 2 + (py - ay) ** 2) ** 0.5
            else:
                t = max(0, min(1, ((px - ax) * dx + (py - ay) * dy) / den))
                d = ((px - (ax + t * dx)) ** 2 + (py - (ay + t * dy)) ** 2) ** 0.5
            if d > best:
                best, idx = d, i
        if best > tol:
            keep[idx] = True
            stack.append((a, idx)); stack.append((idx, b))
    return [p for p, k in zip(points, keep) if k]


def area(ring):
    s = 0.0
    for i in range(len(ring) - 1):
        s += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1]
    return abs(s) / 2


MIN_LON = 42.0  # drop everything far west of the subcontinent (e.g. Persian/Seleucid ranges to Egypt)


def clip_west(ring, min_lon=MIN_LON):
    """Sutherland-Hodgman clip of a closed [lon, lat] ring against lon >= min_lon."""
    pts = ring[:-1] if ring and ring[0] == ring[-1] else ring
    out = []
    for i in range(len(pts)):
        cur, prev = pts[i], pts[i - 1]
        cin, pin = cur[0] >= min_lon, prev[0] >= min_lon
        if cin != pin:
            t = (min_lon - prev[0]) / (cur[0] - prev[0])
            out.append([min_lon, prev[1] + t * (cur[1] - prev[1])])
        if cin:
            out.append(cur)
    if len(out) < 3:
        return []
    out.append(out[0])
    return out


def conv_poly(rings, keep_small):
    out = []
    rings = [clip_west(r) for r in rings]
    if not rings[0]:
        return None
    rings = [rings[0]] + [r for r in rings[1:] if r]
    for i, r in enumerate(rings):
        a = area(r)
        if i == 0:
            if a < MIN_AREA and not keep_small:
                return None
        elif a < MIN_AREA * 2:
            continue
        s = dp(r, TOL)
        if len(s) < 4:
            if i == 0:
                return None
            continue
        out.append([[round(y, 2), round(x, 2)] for x, y in s])  # -> [lat, lon]
    return out or None


def polys_from(geom, keep_small):
    polys = geom['coordinates'] if geom['type'] == 'MultiPolygon' else [geom['coordinates']]
    res = []
    for p in polys:
        c = conv_poly(p, keep_small)
        if c:
            res.append(c)
    return res


result = {}
for key, (snap, specs) in S.items():
    j = json.load(open(os.path.join(RAW, 'world_%s.geojson' % snap), encoding='utf-8'))
    feats = [f for f in j['features'] if f.get('geometry') and f['geometry']['type'] in ('Polygon', 'MultiPolygon')]
    items = []
    for name, bb, en, hi, col in specs:
        if name.startswith('manual:'):
            items.append({'name': en, 'nameHi': hi, 'color': col, 'approx': True, 'polys': MANUAL[name[7:]]})
            continue
        polys = []
        for f in feats:
            if f['properties'].get('NAME') != name:
                continue
            fb = bbox_of(f['geometry'])
            if bb and not bbox_match(fb, bb):
                continue
            polys += polys_from(f['geometry'], keep_small=True)
        if not polys:
            print('WARNING: no geometry for', key, name, bb)
            continue
        items.append({'name': en, 'nameHi': hi, 'color': col, 'polys': polys})
    result[key] = {'snapshot': snap, 'polities': items}
    print(key, snap, len(items), 'polities')

with open(OUT, 'w', encoding='utf-8') as fh:
    fh.write('/* Generated by scripts/build_geo.py from aourednik/historical-basemaps (GPL-3.0). Approximate boundaries. */\n')
    fh.write('window.ATLAS_GEO = ')
    json.dump(result, fh, ensure_ascii=False, separators=(',', ':'))
    fh.write(';\n')
print('wrote', OUT, os.path.getsize(OUT), 'bytes')
