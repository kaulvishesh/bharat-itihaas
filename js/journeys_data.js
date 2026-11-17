/*
 * Journey scripts: pure data (no DOM), so the narration build (scripts/make_narration.js) reads exactly what the player shows.
 * Each scene is an existing event (looked up by title, so places and years always match the atlas) or a whole-era view.
 *   B(event title, title, titleHi, text, textHi, {z, view})   E(era index, title, titleHi, text, textHi, {view, label, y})
 */
(function () {
  'use strict';
  const B = (ev, t, th, p, ph, o) => Object.assign({ ev, t, th, p, ph }, o || {});   // scene on an event
  const E = (era, t, th, p, ph, o) => Object.assign({ era, t, th, p, ph }, o || {}); // scene on a whole era
  const J = (id, icon, rng, rngHi, t, th, d, dh, beats) => ({ id, icon, rng, rngHi, t, th, d, dh, beats });

  window.ATLAS_JOURNEY_DATA = [
    J('maurya', 'stupa', '500 → 250 BCE', '500 → 250 ई.पू.', 'The Emperor Who Wept', 'वह सम्राट जो रोया',
      'From sixteen rival realms to Ashoka’s change of heart.', 'सोलह प्रतिद्वंद्वी राज्यों से अशोक के हृदय-परिवर्तन तक।', [
        E(0, 'Sixteen realms along the Ganga', 'गंगा किनारे सोलह राज्य',
          'Iron ploughs and river trade raise walled cities. Kingdoms and republics jostle for the Gangetic plain, and Magadha, in the east, begins to pull ahead.',
          'लोहे के हल और नदी-व्यापार से गढ़वाले नगर उभरते हैं। राज्य और गणराज्य गंगा के मैदान के लिए होड़ करते हैं, और पूर्व में मगध आगे निकलने लगता है।', { view: [25.5, 82.5, 5.6] }),
        B('Buddha attains enlightenment', 'A prince under a fig tree', 'अंजीर के पेड़ तले एक राजकुमार',
          'At Bodh Gaya, Siddhartha Gautama is said to find enlightenment. His teaching of the middle path will travel along the same roads as the merchants.',
          'बोधगया में सिद्धार्थ गौतम को बोध प्राप्त हुआ माना जाता है। मध्यम मार्ग की उनकी शिक्षा व्यापारियों के उन्हीं रास्तों पर आगे बढ़ेगी।'),
        B('Battle of the Hydaspes', 'A conqueror from the west', 'पश्चिम से आया विजेता',
          'In 326 BCE Alexander defeats King Porus on the Jhelum, then turns back when his weary army refuses to march further. He leaves a power vacuum behind him.',
          '326 ई.पू. में सिकंदर झेलम पर राजा पोरस को हराता है, फिर थकी सेना के आगे बढ़ने से मना करने पर लौट जाता है। पीछे सत्ता का शून्य रह जाता है।', { z: 6.4 }),
        B('Chandragupta founds the Maurya dynasty', 'A throne taken in the vacuum', 'ख़ाली जगह में हथियाया सिंहासन',
          'Guided, tradition says, by the strategist Chanakya, Chandragupta overthrows the Nandas and builds a realm that reaches from the Indus to Bengal.',
          'परंपरा के अनुसार रणनीतिकार चाणक्य के मार्गदर्शन में चंद्रगुप्त नंदों को उखाड़ फेंकता है और सिंधु से बंगाल तक फैला राज्य खड़ा करता है।', { z: 5.8 }),
        B('The Kalinga War', 'One war too many', 'एक युद्ध जो बहुत भारी पड़ा',
          'Around 261 BCE Ashoka conquers Kalinga. By his own edict, about a hundred thousand die. Horrified, he vows to rule by dhamma, not by the sword.',
          'लगभग 261 ई.पू. अशोक कलिंग जीतता है। उसके अपने शिलालेख के अनुसार क़रीब एक लाख लोग मारे जाते हैं। व्यथित होकर वह तलवार नहीं, धम्म से शासन करने का संकल्प लेता है।', { z: 6.4 }),
        B('Ashokan pillars and the Lion Capital', 'Edicts in stone', 'पत्थर पर लिखे आदेश',
          'Polished sandstone pillars carry his message of compassion from Afghanistan to Karnataka. The lion capital from Sarnath still stands on India’s emblem today.',
          'चमकदार बलुआ पत्थर के स्तंभ उसकी करुणा का संदेश अफ़ग़ानिस्तान से कर्नाटक तक ले जाते हैं। सारनाथ का सिंह-शीर्ष आज भी भारत के राजचिह्न पर है।', { z: 5.2 }),
        B('Mahinda takes Buddhism to Sri Lanka', 'Peace travels by sea', 'शांति समुद्र पार जाती है',
          'Tradition says Ashoka’s son Mahinda sails to Sri Lanka and wins its king to the Buddha’s teaching. From the island it will later travel on to Southeast Asia.',
          'परंपरा के अनुसार अशोक का पुत्र महिंद श्रीलंका जाकर वहाँ के राजा को बुद्ध की शिक्षा से जोड़ता है। द्वीप से यह शिक्षा आगे दक्षिण-पूर्व एशिया तक पहुँचेगी।', { z: 6 })
      ]),
    J('travellers', 'walker', '50 → 1498 CE', '50 → 1498 ई.', 'Eyes on India', 'भारत पर नज़र',
      'Merchants, monks and scholars who wrote India down, from Rome to Calicut.', 'वे व्यापारी, भिक्षु और विद्वान जिन्होंने भारत को लिखा — रोम से कालीकट तक।', [
        B('The Periplus describes Indian ports', 'Rome comes for pepper', 'रोम आता है काली मिर्च के लिए',
          'Greek-speaking merchants ride the monsoon winds to Muziris and Barygaza. Roman gold flows east for pepper, pearls and Indian cotton.',
          'यूनानीभाषी व्यापारी मानसूनी हवाओं पर सवार होकर मुज़िरिस और बरीगाज़ा पहुँचते हैं। काली मिर्च, मोती और भारतीय सूती कपड़े के लिए रोमन सोना पूरब आता है।', { z: 5.6 }),
        B('Fa-Xian travels across India', 'A monk on foot', 'पैदल चलता एक भिक्षु',
          'Faxian walks from China across deserts and mountains in search of Buddhist texts. He spends years in Gupta India and records a calm, orderly land.',
          'फ़ाह्यान बौद्ध ग्रंथों की खोज में चीन से रेगिस्तान और पहाड़ पार करके पैदल आता है। वह वर्षों गुप्तकालीन भारत में रहता है और उसे शांत, व्यवस्थित भूमि बताता है।', { z: 5.4 }),
        B('Xuanzang studies at Nalanda', 'The great university', 'महान विश्वविद्यालय',
          'Xuanzang studies at Nalanda, one of the great centres of learning of its age. He returns to China with 657 manuscripts and a priceless account of seventh-century India.',
          'ह्वेनसांग अपने युग के महान शिक्षा-केंद्रों में से एक नालंदा में पढ़ता है। वह 657 पांडुलिपियों और सातवीं सदी के भारत के अमूल्य वर्णन के साथ चीन लौटता है।', { z: 6.2 }),
        B('Al-Biruni writes on India', 'A scholar learns Sanskrit', 'संस्कृत सीखता एक विद्वान',
          'Al-Biruni, from Central Asia, studies Sanskrit and Indian science with local scholars. His Kitab al-Hind remains a model of fair, curious writing about another culture.',
          'मध्य एशिया का अल-बीरूनी स्थानीय विद्वानों के साथ संस्कृत और भारतीय विज्ञान पढ़ता है। उसकी ‘किताब-उल-हिंद’ किसी दूसरी संस्कृति पर निष्पक्ष, जिज्ञासु लेखन का आदर्श बनी हुई है।', { z: 5.8 }),
        B('Ibn Battuta reaches Delhi', 'A judge from Morocco', 'मोरक्को का एक क़ाज़ी',
          'Ibn Battuta arrives in Delhi in 1334 and is made a judge by Sultan Muhammad bin Tughluq. Years later he sails on, and writes it all down.',
          '1334 में इब्न बतूता दिल्ली पहुँचता है और सुल्तान मुहम्मद बिन तुग़लक़ उसे क़ाज़ी बनाता है। वर्षों बाद वह जहाज़ से आगे बढ़ता है, और सब कुछ लिख डालता है।', { z: 5.8 }),
        B('Vasco da Gama reaches Calicut', 'The sea road opens', 'समुद्री राह खुलती है',
          'In 1498 Vasco da Gama anchors off Calicut after sailing round Africa. The old Indian Ocean trade is about to meet European guns and ambition.',
          '1498 में अफ़्रीका का चक्कर लगाकर वास्को द गामा कालीकट के तट पर लंगर डालता है। हिंद महासागर का पुराना व्यापार अब यूरोपीय तोपों और महत्वाकांक्षा से टकराने वाला है।', { z: 6.4 })
      ]),
    J('chola', 'temple', '850 → 1030 CE', '850 → 1030 ई.', 'The Tamil Sea Empire', 'तमिल सागर-साम्राज्य',
      'How a small river-delta chiefdom came to rule the Bay of Bengal.', 'कावेरी डेल्टा का एक छोटा सरदार बंगाल की खाड़ी का स्वामी कैसे बना।', [
        B('Vijayalaya takes Thanjavur', 'A chieftain seizes a delta', 'एक सरदार, एक डेल्टा',
          'Around 850, Vijayalaya Chola takes Thanjavur from local rivals. It is a modest start in the rich Kaveri delta, and the seed of an empire.',
          'लगभग 850 में विजयालय चोल स्थानीय प्रतिद्वंद्वियों से तंजावुर छीन लेता है। उपजाऊ कावेरी डेल्टा में यह छोटी-सी शुरुआत एक साम्राज्य का बीज बनती है।', { z: 7 }),
        B('Aditya I defeats the Pallavas', 'The old order falls', 'पुरानी सत्ता का अंत',
          'His son Aditya I defeats the last Pallava king around 903. The Cholas inherit the northern Tamil country, with its ports, wealth and temples.',
          'उसका पुत्र आदित्य प्रथम लगभग 903 में अंतिम पल्लव राजा को हराता है। चोलों को उत्तरी तमिल प्रदेश, उसके बंदरगाह, संपदा और मंदिर मिल जाते हैं।', { z: 6.8 }),
        B('Brihadisvara Temple completed', 'A temple like a mountain', 'पर्वत जैसा मंदिर',
          'In 1010 Rajaraja I completes the Brihadisvara temple at Thanjavur. Its granite tower rises over sixty metres, crowned by a single massive capstone.',
          '1010 में राजराज प्रथम तंजावुर में बृहदीश्वर मंदिर पूरा करता है। इसकी ग्रेनाइट की मीनार साठ मीटर से ऊँची है, जिसके शिखर पर एक विशाल पत्थर रखा है।', { z: 7.4 }),
        E(9, 'The Bay of Bengal, a Chola lake', 'बंगाल की खाड़ी, चोलों की झील',
          'Around 1025 Rajendra’s fleet crosses the bay to strike Srivijaya, the sea power of Sumatra and Malaya, securing Chola control of the lanes to China.',
          'लगभग 1025 में राजेंद्र का बेड़ा खाड़ी पार कर सुमात्रा-मलय की समुद्री शक्ति श्रीविजय पर प्रहार करता है और चीन तक के समुद्री मार्गों पर चोल नियंत्रण पक्का करता है।', { view: [10, 93, 4.3], label: 'c. 1025', labelHi: 'लगभग 1025', y: 1025 }),
        B('Gangaikonda Cholapuram founded', 'The city of the Ganga-conqueror', 'गंगा-विजेता का नगर',
          'After his march to the Ganga, Rajendra founds Gangaikonda Cholapuram, “the city of the Chola who took the Ganga”, and brings the river’s water to its great tank.',
          'गंगा तक कूच के बाद राजेंद्र ‘गंगा जीतने वाले चोल का नगर’ गंगैकोंड चोलपुरम बसाता है और गंगाजल को उसके विशाल जलाशय तक लाता है।', { z: 7.4 })
      ]),
    J('sultans', 'mosque', '1192 → 1700 CE', '1192 → 1700 ई.', 'Sultans, Shahs & Emperors', 'सुल्तान, शाह और बादशाह',
      'Five centuries of Delhi’s rise, from Tarain to the Taj.', 'दिल्ली के उत्थान की पाँच सदियाँ, तराइन से ताज तक।', [
        B('Second Battle of Tarain', 'A plain decides an age', 'एक मैदान, एक युग का फ़ैसला',
          'In 1192 Muhammad of Ghor defeats Prithviraj Chauhan at Tarain, a year after losing to him on the same field. The Gangetic plain lies open.',
          '1192 में मुहम्मद ग़ोरी तराइन में पृथ्वीराज चौहान को हराता है, उसी मैदान पर एक साल पहले हारने के बाद। गंगा का मैदान खुल जाता है।', { z: 6.4 }),
        B('Qutb Minar begun', 'A tower to announce a sultanate', 'सल्तनत की घोषणा करती मीनार',
          'Qutb ud-Din Aibak begins the Qutb Minar in 1199, a soaring tower of red sandstone. It marks the birth of the Delhi Sultanate and of a new architecture.',
          'क़ुतुबुद्दीन ऐबक 1199 में लाल बलुआ पत्थर की ऊँची क़ुतुब मीनार बनवाना शुरू करता है। यह दिल्ली सल्तनत और एक नई स्थापत्य शैली के जन्म का प्रतीक है।', { z: 7.4 }),
        B('Capital moved to Daulatabad', 'A capital on the march', 'चल पड़ी एक राजधानी',
          'In 1327 Muhammad bin Tughluq orders Delhi’s elite south to Daulatabad, some 1,100 km away, to rule the whole subcontinent. The plan fails and the court returns.',
          '1327 में मुहम्मद बिन तुग़लक़ पूरे उपमहाद्वीप पर शासन के लिए दिल्ली के अभिजनों को लगभग 1,100 किमी दूर दौलताबाद जाने का आदेश देता है। योजना विफल होती है और दरबार लौट आता है।', { z: 5.3 }),
        B('First Battle of Panipat', 'Gunpowder changes everything', 'बारूद सब कुछ बदल देता है',
          'In 1526 Babur, outnumbered, breaks Ibrahim Lodi’s army at Panipat with field guns and matchlocks. The Mughal Empire begins within a few hours.',
          '1526 में संख्या में कम बाबर पानीपत में तोपों और बंदूकों से इब्राहीम लोदी की सेना को तोड़ देता है। मुग़ल साम्राज्य की शुरुआत कुछ ही घंटों में हो जाती है।', { z: 6.6 }),
        B('Taj Mahal completed', 'A tomb of white marble', 'श्वेत संगमरमर का मक़बरा',
          'Shah Jahan finishes the Taj Mahal in 1653 for his wife Mumtaz Mahal. Some twenty thousand artisans, it is said, raised the finest monument of Mughal art.',
          'शाहजहाँ 1653 में अपनी पत्नी मुमताज़ महल के लिए ताजमहल पूरा करवाता है। कहा जाता है कि क़रीब बीस हज़ार कारीगरों ने मुग़ल कला का यह श्रेष्ठतम स्मारक खड़ा किया।', { z: 7.4 }),
        E(14, 'The widest empire', 'सबसे विशाल साम्राज्य',
          'By 1700 Mughal rule reaches from Kabul to Bengal and deep into the Deccan. Stretched this wide, it is already beginning to strain.',
          '1700 तक मुग़ल शासन काबुल से बंगाल और गहरे दक्कन तक फैल जाता है। इतना फैलने के बाद अब उस पर बोझ पड़ने लगा है।', { view: 'home' })
      ]),
    J('freedom', 'banner', '1757 → 1950 CE', '1757 → 1950 ई.', 'The Road to Independence', 'आज़ादी की राह',
      'From Plassey to the Constitution: how a company became a raj, and a nation took its place.', 'प्लासी से संविधान तक: एक कंपनी कैसे राज बनी और एक राष्ट्र ने उसकी जगह ली।', [
        B('Battle of Plassey', 'A betrayal in a mango grove', 'आम के बाग़ में विश्वासघात',
          'In 1757 Robert Clive routs the Nawab of Bengal at Plassey, helped by the treachery of Mir Jafar. A trading company now holds a province.',
          '1757 में मीर जाफ़र के विश्वासघात की मदद से रॉबर्ट क्लाइव प्लासी में बंगाल के नवाब को हरा देता है। एक व्यापारिक कंपनी अब एक प्रांत की मालिक है।', { z: 6.6 }),
        B('Company obtains the diwani of Bengal', 'The right to collect', 'कर वसूलने का अधिकार',
          'In 1765 the Mughal emperor grants the Company the diwani of Bengal, Bihar and Orissa: the power to collect taxes. Trade turns into rule.',
          '1765 में मुग़ल बादशाह कंपनी को बंगाल, बिहार और उड़ीसा की दीवानी देता है: कर वसूलने की शक्ति। व्यापार शासन में बदल जाता है।', { z: 5.6 }),
        B('The Rebellion of 1857', 'The great rising', 'महान विद्रोह',
          'In 1857 sepoys at Meerut revolt and rulers, soldiers and villagers join across the north. The rising is crushed by 1858, but the Crown takes over from the Company.',
          '1857 में मेरठ के सिपाही बग़ावत करते हैं और उत्तर भर में शासक, सैनिक व ग्रामीण जुड़ जाते हैं। 1858 तक विद्रोह दब जाता है, पर शासन कंपनी से ताज के हाथ में चला जाता है।', { z: 5.8 }),
        B('Indian National Congress founded', 'A nation finds a voice', 'एक राष्ट्र को मिली आवाज़',
          'In December 1885, seventy-two delegates meet in Bombay and found the Indian National Congress. It begins as a petitioning body and grows into a mass movement.',
          'दिसंबर 1885 में बंबई में बहत्तर प्रतिनिधि मिलकर भारतीय राष्ट्रीय कांग्रेस की स्थापना करते हैं। यह याचिका देने वाली संस्था से जन-आंदोलन बनती है।', { z: 6.2 }),
        B('Independence and Partition', 'Freedom, and a line', 'आज़ादी और एक लकीर',
          'On 15 August 1947 India and Pakistan become independent. Partition draws a line through Punjab and Bengal, and some fifteen million people are uprooted.',
          '15 अगस्त 1947 को भारत और पाकिस्तान आज़ाद होते हैं। बँटवारे की लकीर पंजाब और बंगाल से गुज़रती है, और क़रीब डेढ़ करोड़ लोग उजड़ जाते हैं।', { view: 'home' }),
        B('The Constitution comes into force', 'A republic is born', 'गणराज्य का जन्म',
          'On 26 January 1950 the Constitution comes into force and India becomes a sovereign republic, with every adult given the vote from its very first election.',
          '26 जनवरी 1950 को संविधान लागू होता है और भारत संप्रभु गणराज्य बनता है, जहाँ पहले ही चुनाव से हर वयस्क को मताधिकार है।', { z: 6.2 })
      ])
  ];
})();
