/* Roads, canals and dams that appear in specific periods (schematic). `from`/`to` are years (negative = BCE). */
(function () {
  'use strict';
  window.ATLAS_WORKS = [
    {
      kind: 'road', n: 'Uttarapatha (Northern Road)', nHi: 'उत्तरापथ', from: -300, to: 1500,
      note: 'The great trunk road from Taxila down the Ganga plain to Pataliputra and the Bengal coast, described by Megasthenes and used by Maurya armies and traders.',
      noteHi: 'तक्षशिला से गंगा के मैदान होते हुए पाटलिपुत्र और बंगाल तट तक का महामार्ग, जिसका वर्णन मेगस्थनीज़ ने किया और जिसे मौर्य सेनाएँ व व्यापारी प्रयोग करते थे।',
      pts: [[33.75,72.83],[31.55,74.34],[29.39,76.97],[28.61,77.21],[27.49,77.67],[27.05,79.92],[25.43,81.84],[25.32,83.0],[25.61,85.14],[22.28,87.92]]
    },
    {
      kind: 'road', n: 'Dakshinapatha (Southern Road)', nHi: 'दक्षिणापथ', from: -300, to: 1200,
      note: 'The trade road from the Ganga plain through Ujjain and the Narmada crossing to the Deccan and the far south.',
      noteHi: 'गंगा के मैदान से उज्जैन और नर्मदा-पार होते हुए दक्कन व सुदूर दक्षिण तक का व्यापार-मार्ग।',
      pts: [[25.35,81.39],[23.54,77.77],[23.18,75.78],[22.18,75.6],[19.48,75.38],[17.38,78.4],[15.92,75.68],[12.83,79.7]]
    },
    {
      kind: 'road', n: 'Grand Trunk Road (Sadak-e-Azam)', nHi: 'ग्रांड ट्रंक रोड (सड़क-ए-आज़म)', from: 1600,
      note: 'Rebuilt and extended by Sher Shah Suri (1540–45) with sarais and trees, then maintained by the Mughals and the British, from Sonargaon to Peshawar.',
      noteHi: 'शेरशाह सूरी (1540–45) ने सराय और वृक्षों सहित इसे दोबारा बनवाया और बढ़ाया, फिर मुग़लों व अंग्रेज़ों ने बनाए रखा; सोनारगाँव से पेशावर तक।',
      pts: [[23.65,90.6],[22.57,88.36],[25.61,85.14],[25.32,83.0],[25.43,81.84],[27.05,79.92],[28.61,77.21],[29.39,76.97],[30.9,75.85],[31.55,74.34],[33.99,71.57]]
    },
    {
      kind: 'canal', n: 'Western Yamuna Canal', nHi: 'पश्चिमी यमुना नहर', from: 1400,
      note: 'First dug by Firoz Shah Tughlaq (c. 1355) to bring Yamuna water to Hissar; later restored by the Mughals and British.',
      noteHi: 'फ़िरोज़ शाह तुग़लक़ (लगभग 1355) ने हिसार तक यमुना का जल पहुँचाने के लिए खुदवाई; बाद में मुग़लों और अंग्रेज़ों ने पुनर्निर्माण किया।',
      pts: [[30.3,77.3],[29.69,76.99],[29.15,75.72]]
    },
    {
      kind: 'canal', n: 'Upper Ganges Canal', nHi: 'ऊपरी गंगा नहर', from: 1854,
      note: 'Opened in 1854 under Proby Cautley: one of the largest irrigation works of its day, from Haridwar to Kanpur.',
      noteHi: 'प्रॉबी कॉटले के अधीन 1854 में खुली: अपने समय की सबसे बड़ी सिंचाई परियोजनाओं में से एक, हरिद्वार से कानपुर तक।',
      pts: [[29.95,78.16],[29.85,77.89],[28.98,77.7],[27.9,78.1],[26.45,80.35]]
    },
    {
      kind: 'canal', n: 'Indira Gandhi Canal', nHi: 'इंदिरा गांधी नहर', from: 1958,
      note: 'Begun in 1958 to carry Beas–Sutlej water into the Thar desert (about 650 km).',
      noteHi: '1958 में ब्यास–सतलुज का जल थार मरुस्थल तक पहुँचाने के लिए आरंभ (लगभग 650 किमी)।',
      pts: [[31.15,74.97],[29.58,74.32],[29.32,73.9],[28.0,73.3],[26.9,70.9]]
    },
    {
      kind: 'dam', n: 'Kallanai (Grand Anicut)', nHi: 'कल्लणै (ग्रैंड एनीकट)', from: 150, ll: [10.83, 78.82],
      note: 'A massive stone-and-clay weir on the Kaveri, traditionally credited to Karikala Chola (c. 2nd century); still in use after about 1,900 years.',
      noteHi: 'कावेरी पर पत्थर-मिट्टी का विशाल बाँध, परंपरानुसार करिकाल चोल (लगभग दूसरी सदी) का; लगभग 1,900 वर्ष बाद भी उपयोग में।'
    },
    {
      kind: 'dam', n: 'Sudarshana Lake', nHi: 'सुदर्शन झील', from: -300, to: 500, ll: [21.52, 70.47],
      note: 'A Maurya-era reservoir at Girnar, repaired under Rudradaman (c. 150 CE) and Skandagupta (c. 456 CE); its inscriptions record the works.',
      noteHi: 'गिरनार में मौर्यकालीन जलाशय, जिसकी मरम्मत रुद्रदामन (लगभग 150 ई.) और स्कंदगुप्त (लगभग 456 ई.) ने कराई; अभिलेखों में इसका उल्लेख है।'
    },
    {
      kind: 'dam', n: 'Bhakra–Nangal Dam', nHi: 'भाखड़ा–नांगल बाँध', from: 1957, ll: [31.41, 76.43],
      note: 'Completed in 1963 on the Sutlej: among the highest gravity dams in the world, called a "temple of resurgent India".',
      noteHi: '1963 में सतलुज पर पूर्ण: विश्व के सबसे ऊँचे गुरुत्व बाँधों में से एक, जिसे "नवोदित भारत का मंदिर" कहा गया।'
    },
    {
      kind: 'dam', n: 'Hirakud Dam', nHi: 'हीराकुद बाँध', from: 1957, ll: [21.52, 83.87],
      note: 'Completed in 1957 on the Mahanadi; one of the longest earthen dams in the world.',
      noteHi: '1957 में महानदी पर पूर्ण; विश्व के सबसे लंबे मिट्टी के बाँधों में से एक।'
    }
  ];
})();
