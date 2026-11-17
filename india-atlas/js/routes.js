/*
 * Journeys, campaigns and trade routes per era (keyed by era `geo` key).
 * Paths are schematic polylines through known waypoints [lat, lon] — not surveyed routes.
 * Each: id, n/nHi (name), note/noteHi, color, pts, label (optional English/Hindi via lbl/lblHi per waypoint index).
 */
(function () {
  'use strict';
  window.ATLAS_ROUTES = {
    bc300: [{
      id: 'alexander', color: '#b91c1c', n: "Alexander's Indian campaign (327–325 BCE)", nHi: 'सिकंदर का भारतीय अभियान (327–325 ई.पू.)',
      note: 'From Taxila to the Hydaspes, then down the Indus to the sea; his army refused to go further east after the Beas.',
      noteHi: 'तक्षशिला से झेलम तक, फिर सिंधु के सहारे समुद्र तक; ब्यास के बाद उसकी सेना ने और पूर्व बढ़ने से इनकार कर दिया।',
      pts: [[33.75,72.83],[32.93,73.73],[31.45,74.0],[31.4,75.0],[30.2,71.47],[27.7,68.85],[24.85,68.3],[25.4,64.0],[26.0,62.0]]
    }],
    bc200: [{
      id: 'mahinda', color: '#15803d', n: "Mahinda's Dhamma mission (traditional)", nHi: 'महिंद का धम्म-प्रचार (परंपरागत)',
      note: 'Traditionally from Pataliputra via Vidisha and the Tamil coast to King Devanampiya Tissa at Anuradhapura. The route is schematic.',
      noteHi: 'परंपरा के अनुसार पाटलिपुत्र से विदिशा और तमिल तट होते हुए अनुराधापुरम में राजा देवानांपिय तिस्स तक। मार्ग योजनात्मक है।',
      pts: [[25.61,85.14],[23.54,77.77],[17.4,78.4],[10.8,79.9],[9.6,80.1],[8.35,80.39]]
    }],
    '400': [{
      id: 'faxian', color: '#7c3aed', n: "Faxian's pilgrimage (c. 399–412)", nHi: 'फ़ाह्यान की तीर्थयात्रा (लगभग 399–412)',
      note: 'The Chinese monk enters via Gandhara, visits Mathura, Kannauj, the Buddha sites and Pataliputra, then sails from Tamralipti to Sri Lanka.',
      noteHi: 'चीनी भिक्षु गांधार से आता है, मथुरा, कन्नौज, बुद्ध-स्थलों और पाटलिपुत्र जाता है, फिर ताम्रलिप्ति से श्रीलंका की ओर समुद्र-यात्रा करता है।',
      pts: [[33.75,72.83],[31.55,74.34],[27.49,77.67],[27.05,79.92],[27.51,82.05],[27.55,83.05],[26.8,82.2],[25.38,83.02],[25.61,85.14],[22.28,87.92]]
    }],
    '600': [{
      id: 'xuanzang', color: '#7c3aed', n: "Xuanzang's travels in India (629–645)", nHi: 'ह्वेनसांग की भारत यात्रा (629–645)',
      note: 'From Kashmir across the plains to Nalanda, then a long loop through Bengal, Odisha and the south to Kanchi, and back via Gujarat and Sindh.',
      noteHi: 'कश्मीर से मैदानों होते हुए नालंदा, फिर बंगाल, ओडिशा और दक्षिण होकर कांची तक का लंबा चक्कर, और गुजरात व सिंध से वापसी।',
      pts: [[34.08,74.8],[31.3,75.6],[27.49,77.67],[27.05,79.92],[27.51,82.05],[27.47,83.28],[25.38,83.02],[25.14,85.44],[25.0,88.4],[20.19,85.84],[16.5,80.6],[12.83,79.7],[15.92,75.68],[21.17,72.83],[21.88,71.89],[26.0,68.5]]
    }],
    '800': [{
      id: 'shankara', color: '#c2410c', n: "Adi Shankara's journeys (traditional)", nHi: 'आदि शंकराचार्य की यात्राएँ (परंपरागत)',
      note: 'Tradition holds that he travelled from Kalady and founded mathas at Sringeri, Dwarka, Puri and Jyotirmath.',
      noteHi: 'परंपरा है कि कालड़ी से चलकर उन्होंने शृंगेरी, द्वारका, पुरी और ज्योतिर्मठ में मठ स्थापित किए।',
      pts: [[10.17,76.44],[13.42,75.25],[22.24,68.97],[19.8,85.83],[30.55,79.56]]
    }],
    '1000': [
      {
        id: 'ganga', color: '#b45309', n: "Rajendra Chola's Ganga expedition (c. 1021–25)", nHi: 'राजेन्द्र चोल का गंगा अभियान (लगभग 1021–25)',
        note: 'The Chola army marches north through Kalinga and Odisha to the Ganga in Bengal.',
        noteHi: 'चोल सेना कलिंग और ओडिशा से होकर उत्तर में बंगाल की गंगा तक बढ़ती है।',
        pts: [[11.2,79.45],[16.5,80.6],[19.3,84.8],[21.5,86.9],[23.5,87.5],[24.8,88.0]]
      },
      {
        id: 'somnath', color: '#b91c1c', n: "Mahmud's raid on Somnath (1025–26)", nHi: 'महमूद का सोमनाथ पर आक्रमण (1025–26)',
        note: 'From Ghazni through Multan and the Thar desert to the Saurashtra coast.',
        noteHi: 'ग़ज़नी से मुल्तान और थार रेगिस्तान होते हुए सौराष्ट्र तट तक।',
        pts: [[33.55,68.42],[30.2,71.47],[26.45,74.64],[23.85,72.1],[20.89,70.4]]
      },
      {
        id: 'srivijaya', color: '#0369a1', n: 'Chola naval expedition to Srivijaya (1025)', nHi: 'श्रीविजय पर चोल नौसैनिक अभियान (1025)',
        note: 'Across the Bay of Bengal from Nagapattinam to Kedah and Srivijaya.', noteHi: 'बंगाल की खाड़ी पार नागपट्टिनम से केदा और श्रीविजय तक।',
        pts: [[10.77,79.84],[8.0,88.0],[6.1,100.4]]
      }
    ],
    '1200': [{
      id: 'bakhtiyar', color: '#b91c1c', n: "Bakhtiyar Khalji's raids (c. 1200)", nHi: 'बख़्तियार ख़िलजी के हमले (लगभग 1200)',
      note: 'From Awadh into Bihar and on to Lakhnauti in Bengal.', noteHi: 'अवध से बिहार और आगे बंगाल के लखनौती तक।',
      pts: [[26.85,80.95],[25.6,83.0],[25.14,85.44],[24.87,88.13]]
    }],
    '1300': [
      {
        id: 'battuta', color: '#0369a1', n: "Ibn Battuta in India (1333–1342)", nHi: 'इब्न बतूता भारत में (1333–1342)',
        note: 'Enters via Sindh, serves the Tughlaq court in Delhi, then travels through Gujarat and the Konkan to Calicut.',
        noteHi: 'सिंध से आता है, दिल्ली के तुग़लक़ दरबार में सेवा करता है, फिर गुजरात और कोंकण होकर कालीकट पहुँचता है।',
        pts: [[30.2,71.47],[28.61,77.21],[22.31,72.62],[15.5,73.83],[11.25,75.78]]
      },
      {
        id: 'daulatabad', color: '#b45309', n: 'Forced march to Daulatabad (1327)', nHi: 'दौलताबाद की ओर बलात् कूच (1327)',
        note: 'Delhi\'s population ordered south along the Deccan road to the new capital.',
        noteHi: 'दिल्ली की आबादी को नई राजधानी की ओर दक्कन के मार्ग से दक्षिण जाने का आदेश।',
        pts: [[28.61,77.21],[26.2,78.2],[23.2,77.4],[21.1,76.0],[19.94,75.21]]
      }
    ],
    '1530': [{
      id: 'babur', color: '#b45309', n: "Babur's march to Hindustan (1525–26)", nHi: 'बाबर का हिंदुस्तान की ओर कूच (1525–26)',
      note: 'From Kabul through the Khyber to Lahore, and on to the plains of Panipat and Agra.', noteHi: 'काबुल से ख़ैबर होकर लाहौर, फिर पानीपत के मैदान और आगरा तक।',
      pts: [[34.52,69.18],[34.0,71.57],[31.55,74.34],[29.39,76.97],[27.18,78.02]]
    }],
    '1700': [{
      id: 'deccan', color: '#b45309', n: "Aurangzeb's Deccan campaigns (1681–1707)", nHi: 'औरंगज़ेब के दक्कन अभियान (1681–1707)',
      note: 'A 26-year war: Aurangabad, the fall of Bijapur (1686) and Golconda (1687), then the long Maratha pursuit ending at Ahmednagar.',
      noteHi: '26 वर्ष का युद्ध: औरंगाबाद, बीजापुर (1686) और गोलकुंडा (1687) का पतन, फिर मराठों का लंबा पीछा जो अहमदनगर में समाप्त हुआ।',
      pts: [[28.61,77.21],[23.2,77.4],[21.0,76.2],[19.88,75.34],[16.83,75.71],[17.38,78.4],[18.23,73.44],[19.09,74.74]]
    }],
    '1783': [
      {
        id: 'plassey', color: '#b91c1c', n: "Clive's march to Plassey (1757)", nHi: 'क्लाइव का प्लासी की ओर कूच (1757)',
        note: 'From Calcutta through Chandernagore to the mango grove at Plassey.', noteHi: 'कलकत्ता से चंदननगर होते हुए प्लासी के आम के बाग तक।',
        pts: [[22.57,88.36],[22.87,88.37],[23.5,88.3],[23.8,88.25]]
      },
      {
        id: 'panipat', color: '#15803d', n: 'Maratha march to Panipat (1760–61)', nHi: 'मराठों का पानीपत की ओर कूच (1760–61)',
        note: 'Sadashivrao Bhau\'s army from Pune via Gwalior and Delhi to the plain of Panipat.', noteHi: 'सदाशिवराव भाऊ की सेना पुणे से ग्वालियर और दिल्ली होकर पानीपत के मैदान तक।',
        pts: [[18.52,73.86],[21.2,75.5],[26.22,78.18],[28.61,77.21],[29.39,76.97]]
      }
    ],
    '1900': [{
      id: 'dandi', color: '#15803d', n: "Dandi (Salt) March (1930)", nHi: 'दांडी (नमक) यात्रा (1930)',
      note: 'Gandhi and 78 followers walk about 385 km from Sabarmati to Dandi in 24 days to break the salt law.',
      noteHi: 'गांधी और 78 अनुयायी नमक कानून तोड़ने के लिए साबरमती से दांडी तक लगभग 385 किमी, 24 दिन में पैदल चलते हैं।',
      pts: [[23.06,72.58],[22.7,72.6],[22.3,72.85],[21.5,72.9],[20.88,72.81]]
    }],
    '1960': [{
      id: 'partition', color: '#b91c1c', n: 'Partition migration (1947)', nHi: 'विभाजन का पलायन (1947)',
      note: 'One of the largest mass migrations in history: millions crossed the new Punjab border in both directions, here the Lahore–Amritsar–Delhi corridor.',
      noteHi: 'इतिहास के सबसे बड़े सामूहिक पलायनों में से एक: लाखों लोगों ने नई पंजाब सीमा दोनों दिशाओं में पार की; यहाँ लाहौर–अमृतसर–दिल्ली गलियारा।',
      pts: [[31.55,74.34],[31.63,74.87],[30.9,75.85],[29.39,76.97],[28.61,77.21]]
    }],
    '2010': [{
      id: 'gq', color: '#0f766e', n: 'Golden Quadrilateral highway (2001–2012)', nHi: 'स्वर्णिम चतुर्भुज राजमार्ग (2001–2012)',
      note: 'About 5,800 km of highways linking Delhi, Mumbai, Chennai and Kolkata.', noteHi: 'दिल्ली, मुंबई, चेन्नई और कोलकाता को जोड़ने वाले लगभग 5,800 किमी राजमार्ग।',
      pts: [[28.61,77.21],[26.9,75.8],[23.0,72.6],[19.08,72.88],[18.52,73.86],[12.97,77.59],[13.08,80.27],[17.7,83.3],[20.3,85.8],[22.57,88.36],[25.6,85.1],[26.85,80.95],[28.61,77.21]]
    }]
  };
})();
