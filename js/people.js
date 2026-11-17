/*
 * Person chronicles: where notable people lived and travelled (Indian leg only).
 * Dates are traditional/approximate for the ancient figures. Routes are schematic.
 * focus = year used to choose the matching era map. Years negative = BCE.
 */
(function () {
  'use strict';
  window.ATLAS_PEOPLE = [
    {
      id: 'buddha', color: '#c2410c', from: -563, to: -483, focus: -500,
      name: 'Gautama Buddha', nameHi: 'गौतम बुद्ध', yearsLabel: 'c. 563–483 BCE (traditional)', yearsLabelHi: 'लगभग 563–483 ई.पू. (परंपरागत)',
      role: 'Founder of Buddhism', roleHi: 'बौद्ध धर्म के संस्थापक',
      bio: 'Born a Shakya prince at Lumbini, he left home at 29, attained enlightenment at Bodh Gaya, taught for about 45 years across the Gangetic plain, and died at Kushinagar. Some scholars date his life about a century later.',
      bioHi: 'लुम्बिनी में शाक्य राजकुमार के रूप में जन्मे, 29 वर्ष की आयु में गृहत्याग किया, बोधगया में ज्ञान पाया, लगभग 45 वर्ष गंगा के मैदान में उपदेश दिए और कुशीनगर में महापरिनिर्वाण पाया। कुछ विद्वान उनका काल लगभग एक सदी बाद मानते हैं।',
      stops: [
        { l: 'birth', lHi: 'जन्म', n: 'Lumbini', nHi: 'लुम्बिनी', ll: [27.47, 83.28], note: 'Born here (Ashoka later raised a pillar).', noteHi: 'यहाँ जन्म (अशोक ने बाद में स्तंभ खड़ा किया)।' },
        { l: 'enlightenment', lHi: 'ज्ञान-प्राप्ति', n: 'Bodh Gaya', nHi: 'बोधगया', ll: [24.695, 84.991], note: 'Attained enlightenment under the Bodhi tree.', noteHi: 'बोधिवृक्ष के नीचे ज्ञान की प्राप्ति।' },
        { l: 'first sermon', lHi: 'प्रथम उपदेश', n: 'Sarnath', nHi: 'सारनाथ', ll: [25.38, 83.02], note: 'Set the wheel of Dhamma in motion.', noteHi: 'धर्मचक्र-प्रवर्तन।' },
        { l: 'Magadha', lHi: 'मगध', n: 'Rajagriha', nHi: 'राजगृह', ll: [24.99, 85.42], note: 'Patronage of King Bimbisara.', noteHi: 'राजा बिम्बिसार का संरक्षण।' },
        { l: 'Kosala', lHi: 'कोसल', n: 'Shravasti', nHi: 'श्रावस्ती', ll: [27.51, 82.05], note: 'Spent many rainy seasons at Jetavana.', noteHi: 'जेतवन में कई वर्षावास बिताए।' },
        { l: 'Vajji', lHi: 'वज्जि', n: 'Vaishali', nHi: 'वैशाली', ll: [25.99, 85.13], note: 'Ordained women into the sangha.', noteHi: 'संघ में स्त्रियों की प्रव्रज्या।' },
        { l: 'death', lHi: 'महापरिनिर्वाण', n: 'Kushinagar', nHi: 'कुशीनगर', ll: [26.74, 83.89], note: 'Passed into parinirvana.', noteHi: 'महापरिनिर्वाण।' }
      ]
    },
    {
      id: 'ashoka', color: '#b45309', from: -304, to: -232, focus: -250,
      name: 'Ashoka', nameHi: 'अशोक', yearsLabel: 'c. 304–232 BCE', yearsLabelHi: 'लगभग 304–232 ई.पू.',
      role: 'Maurya emperor', roleHi: 'मौर्य सम्राट',
      bio: 'As a prince he governed Ujjain and Taxila. After the bloody Kalinga War (c. 261 BCE) he embraced Dhamma and had edicts carved across the empire, from Kandahar to Karnataka.',
      bioHi: 'राजकुमार के रूप में उसने उज्जैन और तक्षशिला का शासन सँभाला। रक्तरंजित कलिंग युद्ध (लगभग 261 ई.पू.) के बाद उसने धम्म अपनाया और कंधार से कर्नाटक तक साम्राज्य भर में अभिलेख खुदवाए।',
      stops: [
        { l: 'prince', lHi: 'राजकुमार', n: 'Pataliputra', nHi: 'पाटलिपुत्र', ll: [25.61, 85.14], note: 'Born into the Maurya court.', noteHi: 'मौर्य दरबार में जन्म।' },
        { l: 'viceroy', lHi: 'उपराज', n: 'Taxila', nHi: 'तक्षशिला', ll: [33.75, 72.83], note: 'Sent to quell unrest in the north-west.', noteHi: 'उत्तर-पश्चिम की अशांति शांत करने भेजा गया।' },
        { l: 'viceroy', lHi: 'उपराज', n: 'Ujjain', nHi: 'उज्जैन', ll: [23.18, 75.78], note: 'Governed the western province.', noteHi: 'पश्चिमी प्रांत का शासन।' },
        { l: 'c. 261 BCE', lHi: 'लगभग 261 ई.पू.', n: 'Kalinga (Dhauli)', nHi: 'कलिंग (धौली)', ll: [20.19, 85.84], note: 'The war that changed him.', noteHi: 'वह युद्ध जिसने उसे बदल दिया।' },
        { l: 'pilgrimage', lHi: 'तीर्थयात्रा', n: 'Bodh Gaya', nHi: 'बोधगया', ll: [24.695, 84.991], note: 'Traditionally visited the Bodhi tree.', noteHi: 'परंपरानुसार बोधिवृक्ष के दर्शन।' },
        { l: 'pilgrimage', lHi: 'तीर्थयात्रा', n: 'Lumbini', nHi: 'लुम्बिनी', ll: [27.47, 83.28], note: 'Pillar inscription records his visit in the 20th regnal year.', noteHi: 'स्तंभ-लेख में 20वें राज्य-वर्ष की यात्रा दर्ज है।' }
      ]
    },
    {
      id: 'xuanzang', color: '#7c3aed', from: 602, to: 664, focus: 640,
      name: 'Xuanzang', nameHi: 'ह्वेनसांग', yearsLabel: '602–664', yearsLabelHi: '602–664',
      role: 'Chinese Buddhist pilgrim and translator', roleHi: 'चीनी बौद्ध तीर्थयात्री और अनुवादक',
      bio: 'Travelled from Chang\'an to India (629–645), studied at Nalanda under Silabhadra, toured the subcontinent and returned with 657 Buddhist texts. His Records of the Western Regions is a prime source for 7th-century India.',
      bioHi: 'चांगआन से भारत आए (629–645), नालंदा में शीलभद्र के अधीन अध्ययन किया, उपमहाद्वीप का भ्रमण किया और 657 बौद्ध ग्रंथ लेकर लौटे। उनका "पश्चिमी देशों का वृत्तांत" 7वीं सदी के भारत का प्रमुख स्रोत है।',
      stops: [
        { l: 'enters India', lHi: 'भारत प्रवेश', n: 'Kashmir', nHi: 'कश्मीर', ll: [34.08, 74.8], note: 'Studied here for two years.', noteHi: 'यहाँ दो वर्ष अध्ययन।' },
        { l: 'Harsha\'s realm', lHi: 'हर्ष का राज्य', n: 'Kannauj', nHi: 'कन्नौज', ll: [27.05, 79.92], note: 'Attended Harsha\'s grand assembly.', noteHi: 'हर्ष की भव्य सभा में सम्मिलित।' },
        { l: 'Buddha sites', lHi: 'बुद्ध-स्थल', n: 'Sarnath', nHi: 'सारनाथ', ll: [25.38, 83.02], note: 'Visited the first-sermon site.', noteHi: 'प्रथम उपदेश-स्थल के दर्शन।' },
        { l: 'five years', lHi: 'पाँच वर्ष', n: 'Nalanda', nHi: 'नालंदा', ll: [25.136, 85.444], note: 'Studied Yogacara under Silabhadra.', noteHi: 'शीलभद्र से योगाचार का अध्ययन।' },
        { l: 'south', lHi: 'दक्षिण', n: 'Kanchipuram', nHi: 'कांचीपुरम', ll: [12.83, 79.7], note: 'Visited the Pallava capital.', noteHi: 'पल्लव राजधानी की यात्रा।' },
        { l: 'return', lHi: 'वापसी', n: 'Valabhi', nHi: 'वल्लभी', ll: [21.88, 71.89], note: 'Western India, then on to Sindh.', noteHi: 'पश्चिमी भारत, फिर सिंध की ओर।' }
      ]
    },
    {
      id: 'shankara', color: '#0f766e', from: 788, to: 820, focus: 800,
      name: 'Adi Shankara', nameHi: 'आदि शंकराचार्य', yearsLabel: 'traditionally 788–820', yearsLabelHi: 'परंपरानुसार 788–820',
      role: 'Philosopher of Advaita Vedanta', roleHi: 'अद्वैत वेदांत के दार्शनिक',
      bio: 'Traditional accounts say he walked from Kerala across India debating scholars, wrote commentaries on the Upanishads, Gita and Brahma Sutras, and founded four mathas. Scholars debate the dates and details.',
      bioHi: 'परंपरा के अनुसार वे केरल से पूरे भारत में पैदल चले, विद्वानों से शास्त्रार्थ किया, उपनिषद, गीता और ब्रह्मसूत्र पर भाष्य लिखे और चार मठ स्थापित किए। तिथियों और विवरणों पर विद्वानों में मतभेद है।',
      stops: [
        { l: 'birth', lHi: 'जन्म', n: 'Kalady', nHi: 'कालड़ी', ll: [10.17, 76.44], note: 'Traditional birthplace on the Periyar.', noteHi: 'पेरियार तट पर परंपरागत जन्मस्थली।' },
        { l: 'south math', lHi: 'दक्षिणी मठ', n: 'Sringeri', nHi: 'शृंगेरी', ll: [13.42, 75.25], note: 'Sharada Peetham.', noteHi: 'शारदा पीठम।' },
        { l: 'west math', lHi: 'पश्चिमी मठ', n: 'Dwarka', nHi: 'द्वारका', ll: [22.24, 68.97], note: 'Dwaraka Peetham.', noteHi: 'द्वारका पीठम।' },
        { l: 'east math', lHi: 'पूर्वी मठ', n: 'Puri', nHi: 'पुरी', ll: [19.8, 85.83], note: 'Govardhana Peetham.', noteHi: 'गोवर्धन पीठम।' },
        { l: 'north math', lHi: 'उत्तरी मठ', n: 'Jyotirmath', nHi: 'ज्योतिर्मठ', ll: [30.55, 79.56], note: 'Jyotir Peetham in the Himalaya.', noteHi: 'हिमालय में ज्योतिष्पीठ।' },
        { l: 'death (tradition)', lHi: 'देहावसान (परंपरा)', n: 'Kedarnath', nHi: 'केदारनाथ', ll: [30.735, 79.067], note: 'Traditionally where he attained samadhi.', noteHi: 'परंपरानुसार यहाँ समाधि ली।' }
      ]
    },
    {
      id: 'nanak', color: '#ca8a04', from: 1469, to: 1539, focus: 1526,
      name: 'Guru Nanak', nameHi: 'गुरु नानक', yearsLabel: '1469–1539', yearsLabelHi: '1469–1539',
      role: 'Founder of Sikhism', roleHi: 'सिख धर्म के संस्थापक',
      bio: 'Born at Talwandi, he worked at Sultanpur Lodhi, then undertook long journeys (udasis) across India and beyond preaching one God and equality, before settling at Kartarpur.',
      bioHi: 'तलवंडी में जन्मे, सुल्तानपुर लोधी में कार्य किया, फिर एक ईश्वर और समानता का संदेश देते हुए भारत और उसके बाहर लंबी यात्राएँ (उदासियाँ) कीं, और अंत में करतारपुर में बस गए।',
      stops: [
        { l: 'birth', lHi: 'जन्म', n: 'Nankana Sahib', nHi: 'ननकाना साहिब', ll: [31.45, 73.71], note: 'Born at Talwandi.', noteHi: 'तलवंडी में जन्म।' },
        { l: 'early life', lHi: 'आरंभिक जीवन', n: 'Sultanpur Lodhi', nHi: 'सुल्तानपुर लोधी', ll: [31.21, 75.19], note: 'Worked as a storekeeper; the Bein river episode.', noteHi: 'भंडारी का कार्य; बेईं नदी की घटना।' },
        { l: 'udasis', lHi: 'उदासियाँ', n: 'Haridwar', nHi: 'हरिद्वार', ll: [29.95, 78.16], note: 'Questioned ritual practices on the Ganga.', noteHi: 'गंगा-तट पर कर्मकांड पर प्रश्न।' },
        { l: 'udasis', lHi: 'उदासियाँ', n: 'Varanasi', nHi: 'वाराणसी', ll: [25.32, 83.0], note: 'Dialogue with scholars.', noteHi: 'विद्वानों से संवाद।' },
        { l: 'udasis', lHi: 'उदासियाँ', n: 'Puri', nHi: 'पुरी', ll: [19.8, 85.83], note: 'Composed the Arti at Jagannath, per tradition.', noteHi: 'परंपरा में जगन्नाथ में आरती की रचना।' },
        { l: 'udasis', lHi: 'उदासियाँ', n: 'Rameswaram', nHi: 'रामेश्वरम', ll: [9.29, 79.31], note: 'The southern journey.', noteHi: 'दक्षिण की यात्रा।' },
        { l: 'death', lHi: 'देहावसान', n: 'Kartarpur', nHi: 'करतारपुर', ll: [32.09, 75.01], note: 'Settled and farmed; died 1539.', noteHi: 'बस गए, खेती की; 1539 में देहावसान।' }
      ]
    },
    {
      id: 'akbar', color: '#b91c1c', from: 1542, to: 1605, focus: 1526,
      name: 'Akbar', nameHi: 'अकबर', yearsLabel: '1542–1605', yearsLabelHi: '1542–1605',
      role: 'Mughal emperor', roleHi: 'मुग़ल सम्राट',
      bio: 'Born in exile at Umarkot, crowned at 13, he expanded the empire from Kabul to Bengal and the Deccan, built Fatehpur Sikri, and pursued religious dialogue and administrative reform.',
      bioHi: 'निर्वासन में उमरकोट में जन्मे, 13 वर्ष की आयु में राज्याभिषेक हुआ; काबुल से बंगाल और दक्कन तक साम्राज्य बढ़ाया, फ़तेहपुर सीकरी बनवाई, और धार्मिक संवाद व प्रशासनिक सुधार किए।',
      stops: [
        { l: 'birth 1542', lHi: 'जन्म 1542', n: 'Umarkot', nHi: 'उमरकोट', ll: [25.36, 69.74], note: 'Born during his father Humayun\'s exile.', noteHi: 'पिता हुमायूँ के निर्वासन के दौरान जन्म।' },
        { l: '1556', lHi: '1556', n: 'Kalanaur', nHi: 'कलानौर', ll: [32.0, 75.15], note: 'Enthroned at age 13.', noteHi: '13 वर्ष की आयु में राज्यारोहण।' },
        { l: '1556', lHi: '1556', n: 'Panipat', nHi: 'पानीपत', ll: [29.39, 76.97], note: 'Second Battle of Panipat.', noteHi: 'पानीपत का द्वितीय युद्ध।' },
        { l: '1568', lHi: '1568', n: 'Chittorgarh', nHi: 'चित्तौड़गढ़', ll: [24.88, 74.64], note: 'Siege of the Mewar fortress.', noteHi: 'मेवाड़ के किले की घेराबंदी।' },
        { l: '1571–85', lHi: '1571–85', n: 'Fatehpur Sikri', nHi: 'फ़तेहपुर सीकरी', ll: [27.09, 77.66], note: 'Capital; Ibadat Khana debates.', noteHi: 'राजधानी; इबादतख़ाने की चर्चाएँ।' },
        { l: '1585–98', lHi: '1585–98', n: 'Lahore', nHi: 'लाहौर', ll: [31.55, 74.34], note: 'Capital during the north-west campaigns.', noteHi: 'उत्तर-पश्चिम अभियानों के दौरान राजधानी।' },
        { l: '1601', lHi: '1601', n: 'Asirgarh', nHi: 'असीरगढ़', ll: [21.47, 76.29], note: 'His last major conquest in the Deccan.', noteHi: 'दक्कन में उसकी अंतिम बड़ी विजय।' },
        { l: 'death 1605', lHi: 'देहावसान 1605', n: 'Agra', nHi: 'आगरा', ll: [27.18, 78.02], note: 'Buried at Sikandra.', noteHi: 'सिकंदरा में दफ़न।' }
      ]
    },
    {
      id: 'shivaji', color: '#15803d', from: 1630, to: 1680, focus: 1700,
      name: 'Shivaji', nameHi: 'शिवाजी', yearsLabel: '1630–1680', yearsLabelHi: '1630–1680',
      role: 'Founder of the Maratha kingdom', roleHi: 'मराठा राज्य के संस्थापक',
      bio: 'Born at Shivneri, he took Torna in 1646, built a hill-fort kingdom against Bijapur and the Mughals, escaped from Agra in 1666, and was crowned Chhatrapati at Raigad in 1674.',
      bioHi: 'शिवनेरी में जन्मे, 1646 में तोरणा पर अधिकार किया, बीजापुर और मुग़लों के विरुद्ध पहाड़ी-दुर्गों का राज्य बनाया, 1666 में आगरा से निकल भागे और 1674 में रायगढ़ में छत्रपति बने।',
      stops: [
        { l: 'birth', lHi: 'जन्म', n: 'Shivneri', nHi: 'शिवनेरी', ll: [19.2, 73.86], note: 'Born in the fort.', noteHi: 'किले में जन्म।' },
        { l: '1646', lHi: '1646', n: 'Torna', nHi: 'तोरणा', ll: [18.28, 73.62], note: 'First fort captured.', noteHi: 'पहला जीता गया किला।' },
        { l: '1659', lHi: '1659', n: 'Pratapgad', nHi: 'प्रतापगढ़', ll: [17.93, 73.58], note: 'Confrontation with Afzal Khan.', noteHi: 'अफ़ज़ल ख़ान से मुठभेड़।' },
        { l: '1664', lHi: '1664', n: 'Surat', nHi: 'सूरत', ll: [21.17, 72.83], note: 'Raid on the Mughal port.', noteHi: 'मुग़ल बंदरगाह पर छापा।' },
        { l: '1666', lHi: '1666', n: 'Agra', nHi: 'आगरा', ll: [27.18, 78.02], note: 'Detained at the Mughal court; escaped.', noteHi: 'मुग़ल दरबार में नज़रबंद; भाग निकले।' },
        { l: '1674', lHi: '1674', n: 'Raigad', nHi: 'रायगढ़', ll: [18.234, 73.44], note: 'Crowned Chhatrapati.', noteHi: 'छत्रपति का राज्याभिषेक।' },
        { l: '1677', lHi: '1677', n: 'Gingee', nHi: 'जिंजी', ll: [12.25, 79.42], note: 'Southern campaign.', noteHi: 'दक्षिणी अभियान।' }
      ]
    },
    {
      id: 'gandhi', color: '#2563eb', from: 1869, to: 1948, focus: 1900,
      name: 'Mohandas K. Gandhi', nameHi: 'मोहनदास क. गांधी', yearsLabel: '1869–1948', yearsLabelHi: '1869–1948',
      role: 'Leader of the Indian independence movement', roleHi: 'भारतीय स्वतंत्रता आंदोलन के नेता',
      bio: 'Born at Porbandar, he returned from South Africa in 1915, led satyagrahas at Champaran and Ahmedabad, the Salt March of 1930, and the Quit India movement; he was assassinated in Delhi in 1948.',
      bioHi: 'पोरबंदर में जन्मे, 1915 में दक्षिण अफ़्रीका से लौटे, चंपारण और अहमदाबाद के सत्याग्रह, 1930 की नमक यात्रा और भारत छोड़ो आंदोलन का नेतृत्व किया; 1948 में दिल्ली में उनकी हत्या हुई।',
      stops: [
        { l: 'birth 1869', lHi: 'जन्म 1869', n: 'Porbandar', nHi: 'पोरबंदर', ll: [21.64, 69.61], note: 'Born on the Kathiawar coast.', noteHi: 'काठियावाड़ तट पर जन्म।' },
        { l: '1917', lHi: '1917', n: 'Champaran', nHi: 'चंपारण', ll: [26.65, 84.9], note: 'First satyagraha in India, for indigo farmers.', noteHi: 'नील किसानों के लिए भारत का पहला सत्याग्रह।' },
        { l: '1917', lHi: '1917', n: 'Sabarmati Ashram', nHi: 'साबरमती आश्रम', ll: [23.06, 72.58], note: 'Base for two decades.', noteHi: 'दो दशकों तक केंद्र।' },
        { l: '1930', lHi: '1930', n: 'Dandi', nHi: 'दांडी', ll: [20.88, 72.81], note: 'Salt March ends at the sea.', noteHi: 'नमक यात्रा समुद्र-तट पर समाप्त।' },
        { l: '1936', lHi: '1936', n: 'Sevagram (Wardha)', nHi: 'सेवाग्राम (वर्धा)', ll: [20.74, 78.6], note: 'Settled in a village ashram.', noteHi: 'ग्राम-आश्रम में बसे।' },
        { l: '1946', lHi: '1946', n: 'Noakhali', nHi: 'नोआखाली', ll: [22.83, 91.1], note: 'Walked through riot-hit villages.', noteHi: 'दंगा-पीड़ित गाँवों में पदयात्रा।' },
        { l: 'death 1948', lHi: 'देहावसान 1948', n: 'Delhi (Birla House)', nHi: 'दिल्ली (बिड़ला हाउस)', ll: [28.6, 77.22], note: 'Assassinated on 30 January 1948.', noteHi: '30 जनवरी 1948 को हत्या।' }
      ]
    }
  ];
})();
