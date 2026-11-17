/*
 * Atlas of India — era content. Boundaries live in geo.js (generated, see scripts/build_geo.py).
 * Coordinates are [lat, lon]. Boundaries are approximate; dates marked "c." are traditional/approximate.
 * `geo` = key into ATLAS_GEO. `year` = the headline year shown for the era (negative = BCE).
 */
(function () {
  'use strict';

  const ERAS = [
    {
      geo: 'bc500', year: -500, yearLabel: '500 BCE', yearLabelHi: '500 ई.पू.',
      name: 'The Mahajanapadas', nameHi: 'महाजनपद',
      tag: 'Sixteen great realms across the Gangetic plains; Magadha begins its rise.',
      tagHi: 'गंगा के मैदानों में सोलह महान राज्य; मगध का उदय शुरू होता है।',
      story: 'The second urbanisation of India: iron tools, rice cultivation and trade created walled cities along the Ganga. Monarchies (Magadha, Kosala, Avanti) competed with oligarchic gana-sanghas such as the Vajjis and Shakyas. In the north-west, Gandhara and Hindush fell under the Achaemenid Persians. Shramana movements — Buddhism and Jainism — arose in this world.',
      rulers: ['Bimbisara of Magadha (c. 544–492 BCE)', 'Ajatashatru (c. 492–460 BCE)', 'Prasenajit of Kosala', 'Darius I of Persia (Indus satrapy, c. 518 BCE)'],
      places: [
        { n: 'Rajagriha', ll: [24.99, 85.42], k: 'capital', note: 'First capital of Magadha' },
        { n: 'Shravasti', ll: [27.51, 82.05], k: 'capital', note: 'Capital of Kosala; Buddha spent many rainy seasons here' },
        { n: 'Varanasi', ll: [25.32, 83.01], k: 'city', note: 'Capital of Kashi; one of the oldest continually inhabited cities' },
        { n: 'Kaushambi', ll: [25.35, 81.39], k: 'capital', note: 'Capital of Vatsa' },
        { n: 'Vaishali', ll: [25.99, 85.13], k: 'capital', note: 'Seat of the Vajjika (Licchavi) confederacy' },
        { n: 'Ujjain', ll: [23.18, 75.78], k: 'capital', note: 'Capital of Avanti' },
        { n: 'Hastinapura', ll: [29.16, 78.02], k: 'city', note: 'Kuru-region city of Mahabharata tradition' },
        { n: 'Taxila', ll: [33.75, 72.83], k: 'city', note: 'Gandharan centre of learning and trade' }
      ],
      events: [
        { year: -528, label: 'c. 528 BCE', title: 'Buddha attains enlightenment', text: 'Siddhartha Gautama attains enlightenment under the Bodhi tree at Bodh Gaya (traditional date), founding Buddhism.', place: 'Bodh Gaya', ll: [24.695, 84.991], clue: 'A fig tree here is where a prince from the Shakya clan is said to have become the Buddha.' },
        { year: -518, label: 'c. 518 BCE', title: 'Achaemenid Persians take the Indus valley', text: 'Darius I incorporates Gandhara and the Indus region (Hindush) into the Persian Empire, opening a route for Aramaic-derived scripts.', place: 'Gandhara', ll: [34.0, 71.6], clue: 'A north-western region on the Kabul river that became a Persian satrapy around 518 BCE.' },
        { year: -483, label: 'c. 483 BCE', title: 'First Buddhist Council', text: 'Held at Rajagriha, the Magadhan capital, soon after the Buddha\'s passing, to recite the teachings.', place: 'Rajagriha (Rajgir)', ll: [24.99, 85.42], clue: 'Hill-ringed capital of Bimbisara, where monks gathered to recite the Buddha\'s teachings.' },
        { year: -400, label: 'c. 5th–4th c. BCE', title: 'Panini codifies Sanskrit', text: 'The grammarian Panini, from the Gandhara region, composes the Ashtadhyayi, among the most influential grammars ever written.', place: 'Shalatura (near Attock)', ll: [33.9, 72.3], clue: 'A grammarian from this north-western region wrote nearly 4,000 sutras defining Sanskrit.' }
      ]
    },
    {
      geo: 'bc300', year: -300, yearLabel: '300 BCE', yearLabelHi: '300 ई.पू.',
      name: 'Rise of the Mauryas', nameHi: 'मौर्यों का उदय',
      tag: 'Chandragupta unites the Ganga plain, then faces — and bargains with — Seleucus.',
      tagHi: 'चंद्रगुप्त गंगा के मैदान को एक करता है, फिर सेल्यूकस से संधि करता है।',
      story: 'After Alexander\'s brief incursion (326 BCE), Chandragupta Maurya overthrew the Nandas and absorbed the Indus region. His agreement with Seleucus I Nicator c. 305 BCE traded eastern satrapies for 500 war elephants. Megasthenes, the Seleucid envoy, left an account of Pataliputra, a city with a timber palisade of 570 towers.',
      rulers: ['Chandragupta Maurya (c. 321–297 BCE)', 'Kautilya / Chanakya (adviser)', 'Seleucus I Nicator', 'Bindusara (c. 297–273 BCE)'],
      places: [
        { n: 'Pataliputra', ll: [25.61, 85.14], k: 'capital', note: 'Maurya capital on the Ganga and Son' },
        { n: 'Taxila', ll: [33.75, 72.83], k: 'city', note: 'Provincial capital of the north-west' },
        { n: 'Ujjain', ll: [23.18, 75.78], k: 'city', note: 'Western viceroyalty' },
        { n: 'Tosali', ll: [20.19, 85.84], k: 'city', note: 'Kalinga region (conquered later by Ashoka)' }
      ],
      events: [
        { year: -326, label: '326 BCE', title: 'Battle of the Hydaspes', text: 'Alexander defeats Porus on the Jhelum; his troops later refuse to march further east.', place: 'Jhelum (Hydaspes)', ll: [32.93, 73.73], clue: 'Alexander defeated Porus on the banks of this Punjab river in 326 BCE.' },
        { year: -321, label: 'c. 321 BCE', title: 'Chandragupta founds the Maurya dynasty', text: 'With the counsel of Kautilya (Chanakya), Chandragupta overthrows the Nandas and takes Pataliputra.', place: 'Pataliputra', ll: [25.61, 85.14], clue: 'Capital on the Ganges that Greek envoy Megasthenes described as one of the greatest cities of its age.' },
        { year: -305, label: 'c. 305 BCE', title: 'Treaty with Seleucus Nicator', text: 'Chandragupta secures lands west of the Indus in exchange for 500 elephants; the two courts exchange envoys.', place: 'Paropamisadae (Hindu Kush)', ll: [34.5, 69.2], clue: 'A mountain frontier region where an Indian emperor and a Macedonian-Greek king drew a boundary c. 305 BCE.' }
      ]
    },
    {
      geo: 'bc200', year: -250, yearLabel: '250 BCE', yearLabelHi: '250 ई.पू.',
      name: 'Maurya Empire under Ashoka', nameHi: 'अशोक के अधीन मौर्य साम्राज्य',
      tag: 'The first empire to unite most of the subcontinent — and its turn to dhamma.',
      tagHi: 'उपमहाद्वीप के अधिकांश भाग को एक करने वाला पहला साम्राज्य — और धम्म की ओर मोड़।',
      story: 'Ashoka\'s edicts, carved in Prakrit (Brahmi), Greek, Aramaic and Kharosthi, are the oldest decipherable royal inscriptions of India. After Kalinga he preached dhamma — ethics, tolerance and welfare — and sent missions as far as Sri Lanka and the Hellenistic world. The map shows the extent as the data source depicts it for c. 200 BCE.',
      rulers: ['Ashoka (c. 268–232 BCE)', 'Devanampiya Tissa of Sri Lanka', 'Diodotus I (Greco-Bactria, c. 250 BCE)'],
      places: [
        { n: 'Pataliputra', ll: [25.61, 85.14], k: 'capital', note: 'Imperial capital' },
        { n: 'Sarnath', ll: [25.38, 83.02], k: 'site', note: 'Lion Capital; first sermon of the Buddha' },
        { n: 'Sanchi', ll: [23.48, 77.74], k: 'site', note: 'Great Stupa begun under Ashoka' },
        { n: 'Lumbini', ll: [27.47, 83.28], k: 'site', note: 'Buddha\'s birthplace, marked by an Ashokan pillar' },
        { n: 'Girnar', ll: [21.53, 70.49], k: 'site', note: 'Major rock edicts' },
        { n: 'Kandahar', ll: [31.61, 65.71], k: 'site', note: 'Greek-Aramaic edicts' }
      ],
      events: [
        { year: -261, label: 'c. 261 BCE', title: 'The Kalinga War', text: 'Ashoka\'s conquest of Kalinga brings enormous bloodshed; remorse leads him toward dhamma and non-violence.', place: 'Dhauli (Kalinga)', ll: [20.19, 85.84], clue: 'Rock edicts near this eastern hill record the emperor\'s remorse after a brutal war.' },
        { year: -250, label: 'c. 250 BCE', title: 'Ashokan pillars and the Lion Capital', text: 'Polished sandstone pillars carry Ashoka\'s edicts. The Sarnath lion capital later becomes India\'s national emblem.', place: 'Sarnath', ll: [25.38, 83.02], clue: 'Site of the Buddha\'s first sermon; its four-lion capital is now on every Indian banknote.' },
        { year: -250, label: 'c. 250 BCE', title: 'Mahinda takes Buddhism to Sri Lanka', text: 'Ashoka\'s son (or brother, in some accounts) Mahinda carries the Dhamma to King Devanampiya Tissa.', place: 'Anuradhapura', ll: [8.35, 80.39], clue: 'A Sri Lankan capital where a missionary sent by an Indian emperor was received around 250 BCE.' }
      ]
    },
    {
      geo: '100', year: 100, yearLabel: '100 CE', yearLabelHi: '100 ई.',
      name: 'Kushans, Satavahanas & the Roman trade', nameHi: 'कुषाण, सातवाहन और रोमन व्यापार',
      tag: 'Silk Road kings in the north, a Deccan empire in the middle, monsoon trade in the south.',
      tagHi: 'उत्तर में रेशम-मार्ग के राजा, मध्य में दक्कन का साम्राज्य, दक्षिण में मानसूनी व्यापार।',
      story: 'The Kushans, a Central Asian people, ruled from Bactria to Mathura and linked India to the Silk Road and Rome; Gandharan and Mathura art produced the first images of the Buddha. The Satavahanas dominated the Deccan, while the Shaka Western Satraps held Gujarat and Malwa. In the south, Tamil Sangam kingdoms traded pepper, pearls and cotton with Rome through Muziris and Arikamedu; the Periplus (c. 50 CE) describes these ports.',
      rulers: ['Kanishka I (Kushan; reign dated c. 127–150 in some chronologies)', 'Gautamiputra Satakarni (Satavahana, c. 106–130)', 'Rudradaman I (Western Satrap, c. 130–150)', 'Karikala Chola (traditional, Sangam period)'],
      places: [
        { n: 'Purushapura (Peshawar)', ll: [34.01, 71.58], k: 'capital', note: 'Kushan capital; Kanishka\'s great stupa' },
        { n: 'Mathura', ll: [27.49, 77.67], k: 'capital', note: 'Second Kushan capital; famed school of sculpture' },
        { n: 'Pratishthana (Paithan)', ll: [19.48, 75.38], k: 'capital', note: 'Satavahana capital on the Godavari' },
        { n: 'Amaravati', ll: [16.57, 80.36], k: 'site', note: 'Great stupa with marble reliefs' },
        { n: 'Ujjain', ll: [23.18, 75.78], k: 'city', note: 'Western Satrap capital' },
        { n: 'Muziris', ll: [10.2, 76.18], k: 'port', note: 'Pepper port trading with Rome' },
        { n: 'Arikamedu', ll: [11.9, 79.82], k: 'port', note: 'Roman-period trading port near Pondicherry' }
      ],
      events: [
        { year: 50, label: 'c. 50', title: 'The Periplus describes Indian ports', text: 'An anonymous Greek merchant\'s guide to the Red Sea and Indian Ocean lists Barygaza, Muziris and other ports and what each traded.', place: 'Muziris', ll: [10.2, 76.18], clue: 'A Kerala pepper port is named in a Greek sailing guide of about 50 CE.' },
        { year: 127, label: 'c. 127', title: 'Kanishka\'s reign begins', text: 'The Kushan emperor patronises Buddhism and Gandharan art; the exact date of his accession is still debated by historians.', place: 'Purushapura (Peshawar)', ll: [34.01, 71.58], clue: 'A Kushan capital in the Peshawar valley where a giant stupa once stood.' },
        { year: 130, label: 'c. 130', title: 'Gautamiputra Satakarni defeats the Shakas', text: 'The Satavahana king claims, in a Nasik inscription, to have crushed the Western Satraps and restored the Satavahana name.', place: 'Nashik', ll: [19.99, 73.79], clue: 'A Godavari-source city whose caves carry a Satavahana victory inscription.' },
        { year: 150, label: 'c. 150', title: 'Junagadh inscription of Rudradaman', text: 'One of the earliest long Sanskrit inscriptions records repairs to the Sudarshana lake after a flood.', place: 'Junagadh (Girnar)', ll: [21.52, 70.47], clue: 'A Gujarat rock that carries Ashoka\'s edicts and a later long Sanskrit inscription about a reservoir.' }
      ]
    },
    {
      geo: '400', year: 400, yearLabel: '400 CE', yearLabelHi: '400 ई.',
      name: 'Gupta Empire', nameHi: 'गुप्त साम्राज्य',
      tag: 'A "Golden Age" of science, literature, art and mathematics.',
      tagHi: 'विज्ञान, साहित्य, कला और गणित का "स्वर्ण युग"।',
      story: 'Gupta coins show kings as warriors, musicians and horse-sacrificers. Sanskrit became the court language of poetry and drama (Kalidasa). Mathematics and astronomy — decimal place value, zero as a number, the sine function — matured, and later transmitted to the Islamic world and Europe. Beyond the core, many neighbours were tributaries rather than provinces, so boundaries here are soft.',
      rulers: ['Samudragupta (c. 335–375)', 'Chandragupta II "Vikramaditya" (c. 375–415)', 'Kumaragupta I (c. 415–455)', 'Skandagupta (c. 455–467)'],
      places: [
        { n: 'Pataliputra', ll: [25.61, 85.14], k: 'capital', note: 'Imperial capital' },
        { n: 'Ujjain', ll: [23.18, 75.78], k: 'city', note: 'Second capital under Chandragupta II' },
        { n: 'Ayodhya', ll: [26.8, 82.2], k: 'city', note: 'Gupta-era political centre' },
        { n: 'Nalanda', ll: [25.136, 85.444], k: 'site', note: 'Monastic university founded c. 427' },
        { n: 'Udayagiri (Vidisha)', ll: [23.54, 77.77], k: 'site', note: 'Rock-cut caves and the Varaha relief' },
        { n: 'Ajanta', ll: [20.55, 75.7], k: 'site', note: 'Cave paintings (Vakataka patronage, late 5th c.)' }
      ],
      events: [
        { year: 400, label: 'c. 400', title: 'The Iron Pillar of Delhi', text: 'A rust-resistant wrought-iron pillar, dated by its inscription to the time of Chandragupta II, still stands today.', place: 'Mehrauli, Delhi', ll: [28.52, 77.18], clue: 'A 7-tonne iron pillar here has barely rusted in about 1,600 years.' },
        { year: 405, label: 'c. 399–412', title: 'Fa-Xian travels across India', text: 'The Chinese monk Faxian spends years in Gupta lands collecting Buddhist texts and describes a prosperous, peaceful kingdom.', place: 'Mathura', ll: [27.49, 77.67], clue: 'City on the Yamuna, a major Buddhist and Hindu centre, visited by a Chinese pilgrim around 400.' },
        { year: 427, label: 'c. 427', title: 'Nalanda mahavihara founded', text: 'Kumaragupta I is traditionally credited with founding the monastic university of Nalanda, which later drew students from across Asia.', place: 'Nalanda', ll: [25.136, 85.444], clue: 'A great monastic university in Bihar that at its peak taught thousands of students from across Asia.' },
        { year: 499, label: '499', title: 'Aryabhata writes the Aryabhatiya', text: 'The astronomer-mathematician, working at Kusumapura (Pataliputra), gives rules for place-value arithmetic, sine tables and a rotating Earth.', place: 'Pataliputra', ll: [25.61, 85.14], clue: 'An astronomer working in this Ganges capital proposed that the Earth rotates, in 499.' }
      ]
    },
    {
      geo: '500', year: 500, yearLabel: '500 CE', yearLabelHi: '500 ई.',
      name: 'After the Guptas: Hunas & new kingdoms', nameHi: 'गुप्तों के बाद: हूण और नए राज्य',
      tag: 'Hun invasions break Gupta power; the Deccan and south fragment into rising dynasties.',
      tagHi: 'हूण आक्रमण गुप्त सत्ता तोड़ते हैं; दक्कन और दक्षिण उभरते राजवंशों में बँट जाते हैं।',
      story: 'Around 500 the Huna chiefs Toramana and Mihirakula swept into north-west and central India, shattering Gupta authority; Yashodharman of Malwa claimed victory over Mihirakula c. 528. In the Deccan the Vakatakas patronised the Ajanta murals before collapsing, while Kadambas, Western Gangas and Pallavas consolidated the south and the Chalukyas of Badami were about to rise (c. 543). Astronomy flourished at Ujjain under Varahamihira.',
      rulers: ['Toramana (Huna, c. 490–515)', 'Mihirakula (Huna, c. 515–540)', 'Yashodharman of Malwa (c. 530)', 'Buddhagupta (Gupta, c. 477–497)', 'Harishena (Vakataka, c. 475–500)'],
      places: [
        { n: 'Sakala (Sialkot)', ll: [32.5, 74.53], k: 'capital', note: 'Huna capital of Mihirakula' },
        { n: 'Gwalior', ll: [26.22, 78.17], k: 'site', note: 'Inscription of Mihirakula\'s reign' },
        { n: 'Mandsaur (Dashapura)', ll: [24.07, 75.07], k: 'site', note: 'Yashodharman\'s victory pillar' },
        { n: 'Ajanta', ll: [20.55, 75.7], k: 'site', note: 'Vakataka-era cave paintings' },
        { n: 'Banavasi', ll: [14.53, 74.88], k: 'capital', note: 'Kadamba capital' },
        { n: 'Kanchipuram', ll: [12.83, 79.7], k: 'capital', note: 'Pallava capital' },
        { n: 'Talakad', ll: [12.18, 77.03], k: 'capital', note: 'Western Ganga capital' }
      ],
      events: [
        { year: 510, label: 'c. 510', title: 'Hunas under Toramana in central India', text: 'The Eran boar inscription of the Huna chief Toramana attests Huna rule over parts of Malwa after the Gupta decline.', place: 'Eran', ll: [24.1, 78.15], clue: 'A Madhya Pradesh site whose giant stone boar carries an inscription of a Huna chief.' },
        { year: 505, label: 'c. 505', title: 'Varahamihira\'s Panchasiddhantika', text: 'The astronomer at Ujjain summarises five older astronomical systems, including Greek-influenced ones.', place: 'Ujjain', ll: [23.18, 75.78], clue: 'A Malwa city with an ancient prime meridian where an astronomer summarised five systems around 505.' },
        { year: 528, label: 'c. 528', title: 'Yashodharman defeats Mihirakula', text: 'The Mandsaur pillar inscription records that Yashodharman humbled Mihirakula, ending the Huna threat in central India.', place: 'Mandsaur', ll: [24.07, 75.07], clue: 'A Malwa town with a victory pillar over the Hun king Mihirakula.' },
        { year: 543, label: 'c. 543', title: 'Chalukya power founded at Vatapi', text: 'Pulakeshin I fortifies Vatapi (Badami), beginning the Chalukya dynasty that will dominate the Deccan.', place: 'Badami (Vatapi)', ll: [15.92, 75.68], clue: 'A Karnataka town between red sandstone cliffs became the capital of the Chalukyas in the 540s.' }
      ]
    },
    {
      geo: '600', year: 640, yearLabel: '640 CE', yearLabelHi: '640 ई.',
      name: 'Harsha, Chalukyas & Pallavas', nameHi: 'हर्ष, चालुक्य और पल्लव',
      tag: 'A north Indian empire under Harsha, balanced by powerful southern kingdoms.',
      tagHi: 'हर्ष के अधीन उत्तर भारत का साम्राज्य, और शक्तिशाली दक्षिणी राज्य।',
      story: 'India after the Guptas was a field of regional powers. Harsha of Kanyakubja ruled the Ganga–Yamuna heartland; the Chalukyas of Badami and the Pallavas of Kanchi fought for the Deccan and the south-east. Temples began to be built in stone: rock-cut at Mahabalipuram, structural at Aihole and Pattadakal. Xuanzang\'s memoir is the best surviving eyewitness account.',
      rulers: ['Harshavardhana (606–647)', 'Pulakeshin II (c. 610–642)', 'Narasimhavarman I Pallava (c. 630–668)', 'Shashanka of Gauda (c. 600–625)', 'Bhaskaravarman of Kamarupa'],
      places: [
        { n: 'Kannauj', ll: [27.05, 79.92], k: 'capital', note: 'Harsha\'s capital (Kanyakubja)' },
        { n: 'Badami', ll: [15.92, 75.68], k: 'capital', note: 'Chalukya capital (Vatapi)' },
        { n: 'Kanchipuram', ll: [12.83, 79.7], k: 'capital', note: 'Pallava capital' },
        { n: 'Nalanda', ll: [25.136, 85.444], k: 'site', note: 'Xuanzang studied here' },
        { n: 'Aihole', ll: [16.02, 75.88], k: 'site', note: 'Early experiments in temple architecture' },
        { n: 'Madurai', ll: [9.93, 78.12], k: 'city', note: 'Pandya capital' }
      ],
      events: [
        { year: 630, label: 'c. 618–634', title: 'Pulakeshin II halts Harsha', text: 'The Chalukya king stops Harsha\'s southward advance at the Narmada river, fixing the north–south frontier.', place: 'Narmada frontier', ll: [21.9, 75.6], clue: 'A river in central India marked the southern limit of Harsha\'s empire.' },
        { year: 637, label: 'c. 637–642', title: 'Xuanzang studies at Nalanda', text: 'The Chinese pilgrim spends years in India, and his Records of the Western Regions become a key source for the period.', place: 'Nalanda', ll: [25.136, 85.444], clue: 'A Chinese monk studied at this Bihar university for about five years under Silabhadra.' },
        { year: 642, label: '642', title: 'Pallavas sack Vatapi', text: 'Narasimhavarman I defeats and kills Pulakeshin II and takes the Chalukya capital.', place: 'Badami (Vatapi)', ll: [15.92, 75.68], clue: 'A cave-temple town in Karnataka whose Chalukya king was killed by a Pallava army in 642.' },
        { year: 640, label: '7th c.', title: 'Rock-cut Mahabalipuram', text: 'Pallava kings carve monolithic rathas and reliefs on the Coromandel coast; the Shore Temple follows in the 8th century.', place: 'Mahabalipuram', ll: [12.617, 80.192], clue: 'A Coromandel Coast port town famed for rock-cut chariots and a giant relief of the descent of the Ganga.' }
      ]
    },
    {
      geo: '800', year: 800, yearLabel: '800 CE', yearLabelHi: '800 ई.',
      name: 'The Tripartite Struggle', nameHi: 'त्रिपक्षीय संघर्ष',
      tag: 'Pratiharas, Palas and Rashtrakutas fight for the prize of Kannauj.',
      tagHi: 'कन्नौज के लिए प्रतिहारों, पालों और राष्ट्रकूटों का संघर्ष।',
      story: 'For two centuries three dynasties contested Kannauj, the symbolic capital of north India. Pratiharas held the west and Rajasthan, Palas the Bengal–Bihar east, and Rashtrakutas the Deccan. Meanwhile Arabs held Sindh (from 711), and southern kingdoms — Pallavas and Pandyas — rivalled each other; the Cholas would soon overtake both. Monasteries like Vikramashila and Somapura flourished under Pala patronage.',
      rulers: ['Nagabhata II Pratihara (c. 800–833)', 'Dharmapala Pala (c. 770–810)', 'Govinda III Rashtrakuta (793–814)', 'Amoghavarsha (814–878)'],
      places: [
        { n: 'Kannauj', ll: [27.05, 79.92], k: 'capital', note: 'The disputed imperial prize' },
        { n: 'Manyakheta', ll: [17.2, 77.15], k: 'capital', note: 'Rashtrakuta capital (Malkhed)' },
        { n: 'Vikramashila', ll: [25.32, 87.28], k: 'site', note: 'Pala-era monastic university' },
        { n: 'Ellora', ll: [20.03, 75.18], k: 'site', note: 'Kailasa temple, carved from one rock' },
        { n: 'Kanchipuram', ll: [12.83, 79.7], k: 'city', note: 'Pallava capital' },
        { n: 'Kalady', ll: [10.17, 76.44], k: 'site', note: 'Birthplace of Adi Shankara (traditionally 788 CE)' }
      ],
      events: [
        { year: 711, label: '711–712', title: 'Arab conquest of Sindh', text: 'Muhammad bin Qasim defeats Raja Dahir; Sindh becomes the easternmost province of the Umayyad Caliphate.', place: 'Debal / Sindh', ll: [24.85, 67.0], clue: 'In 711 an Arab army under a teenage general crossed into the lower Indus delta.' },
        { year: 765, label: 'c. 756–773', title: 'Kailasa Temple at Ellora', text: 'Rashtrakuta king Krishna I begins a monolithic temple carved top-down from a basalt cliff.', place: 'Ellora', ll: [20.026, 75.179], clue: 'A 30-metre-wide temple here was carved from a single rock, from the top down, in the 8th century.' },
        { year: 788, label: 'c. 788–820', title: 'Adi Shankara', text: 'The philosopher of Advaita Vedanta is traditionally placed here; he is said to have founded four mathas across India.', place: 'Kalady, Kerala', ll: [10.17, 76.44], clue: 'A Kerala village on the Periyar is the traditional birthplace of a philosopher who founded four monastic centres.' },
        { year: 800, label: 'c. 800', title: 'Vikramashila founded', text: 'Dharmapala of the Pala dynasty founds a monastic university that rivals Nalanda.', place: 'Vikramashila', ll: [25.32, 87.28], clue: 'A Pala king founded this Ganges-bank monastic university around 800.' }
      ]
    },
    {
      geo: '900', year: 900, yearLabel: '900 CE', yearLabelHi: '900 ई.',
      name: 'Pratihara zenith & the Chola revival', nameHi: 'प्रतिहार शिखर और चोल पुनरुत्थान',
      tag: 'Kannauj\'s empire at its widest as a new power rises in the Kaveri delta.',
      tagHi: 'कन्नौज का साम्राज्य अपने चरम पर, जबकि कावेरी डेल्टा में नई शक्ति उभरती है।',
      story: 'Mihira Bhoja and Mahendrapala made the Pratiharas the dominant north Indian power, a barrier against Arab expansion beyond Sindh and Multan. The Rashtrakutas still ruled the Deccan; in 916 Indra III even sacked Kannauj. In the south the Pallava–Pandya contest ended when Vijayalaya\'s heirs, Aditya I and Parantaka I, laid the foundations of Chola imperial power. The Hindu Shahis guarded the north-west.',
      rulers: ['Mihira Bhoja Pratihara (836–885)', 'Mahendrapala I (c. 885–910)', 'Krishna II Rashtrakuta (878–914)', 'Aditya I Chola (c. 871–907)', 'Indra III Rashtrakuta (914–929)'],
      places: [
        { n: 'Kannauj', ll: [27.05, 79.92], k: 'capital', note: 'Pratihara imperial capital' },
        { n: 'Manyakheta', ll: [17.2, 77.15], k: 'capital', note: 'Rashtrakuta capital' },
        { n: 'Thanjavur', ll: [10.783, 79.131], k: 'capital', note: 'Taken by Vijayalaya Chola, c. 850' },
        { n: 'Multan', ll: [30.2, 71.47], k: 'city', note: 'Arab emirate and sun-temple city' },
        { n: 'Mansura', ll: [26.07, 68.79], k: 'city', note: 'Arab capital of Sindh' },
        { n: 'Gwalior', ll: [26.22, 78.17], k: 'site', note: 'Bhoja\'s Gwalior prashasti' },
        { n: 'Vengi (Pedavegi)', ll: [16.7, 81.1], k: 'capital', note: 'Eastern Chalukya capital' }
      ],
      events: [
        { year: 850, label: 'c. 850', title: 'Vijayalaya takes Thanjavur', text: 'A Chola chief captures Thanjavur from the Mutharaiyars, founding the dynasty\'s imperial line.', place: 'Thanjavur', ll: [10.783, 79.131], clue: 'A Kaveri-delta city seized around 850 became the heart of a resurgent empire.' },
        { year: 903, label: 'c. 903', title: 'Aditya I defeats the Pallavas', text: 'Chola king Aditya I defeats Aparajita Pallava, ending the Pallava dynasty and taking Tondaimandalam.', place: 'Tirupurambiyam', ll: [10.96, 79.38], clue: 'A village near Kumbakonam gave its name to the battle that ended the Pallavas.' },
        { year: 915, label: 'c. 915', title: 'Al-Masudi visits India\'s west coast', text: 'The Baghdad-born historian travels through Sindh, Gujarat and the Konkan and records the kingdoms of the Balhara (Rashtrakuta) and the Pratiharas.', place: 'Khambhat (Cambay)', ll: [22.31, 72.62], clue: 'A Gujarat port on a gulf of the same name was visited by an Arab historian about 915.' },
        { year: 916, label: 'c. 916', title: 'Indra III sacks Kannauj', text: 'The Rashtrakuta king raids the Pratihara capital, weakening the empire that had resisted the Arabs for two centuries.', place: 'Kannauj', ll: [27.05, 79.92], clue: 'The Pratihara capital on the Ganga was plundered by a Deccan king in 916.' }
      ]
    },
    {
      geo: '1000', year: 1030, yearLabel: '1030 CE', yearLabelHi: '1030 ई.',
      name: 'Chola Empire at its peak', nameHi: 'चोल साम्राज्य का शिखर',
      tag: 'A maritime power projecting from Tamil country to Bengal and Southeast Asia.',
      tagHi: 'तमिल देश से बंगाल और दक्षिण-पूर्व एशिया तक फैली समुद्री शक्ति।',
      story: 'The Cholas controlled the Kaveri delta, annexed northern Sri Lanka and in 1025 raided Srivijaya across the Bay of Bengal. In the north, Mahmud of Ghazni raided repeatedly (17 times by tradition) from Ghazni, annexing Punjab. Chola bronzes, Tamil literature and temple-centred economies defined an era; village assemblies recorded in the Uttaramerur inscriptions show elected local administration.',
      rulers: ['Rajaraja I (985–1014)', 'Rajendra I (1014–1044)', 'Mahmud of Ghazni (998–1030)', 'Bhima I Solanki (c. 1022–1064)', 'Mahipala I Pala (c. 995–1043)'],
      places: [
        { n: 'Thanjavur', ll: [10.783, 79.131], k: 'capital', note: 'Chola capital; Brihadisvara temple' },
        { n: 'Gangaikonda Cholapuram', ll: [11.206, 79.449], k: 'capital', note: 'New capital, c. 1025' },
        { n: 'Kalyani', ll: [17.87, 76.95], k: 'capital', note: 'Western Chalukya capital' },
        { n: 'Somnath', ll: [20.888, 70.401], k: 'site', note: 'Raided 1025–26' },
        { n: 'Khajuraho', ll: [24.85, 79.92], k: 'site', note: 'Chandela temples (c. 950–1050)' },
        { n: 'Lahore', ll: [31.55, 74.34], k: 'city', note: 'Ghaznavid provincial seat after c. 1030' }
      ],
      events: [
        { year: 1010, label: '1010', title: 'Brihadisvara Temple completed', text: 'Rajaraja I\'s great Shiva temple, topped by a 66 m granite vimana, is consecrated in the Chola capital.', place: 'Thanjavur', ll: [10.783, 79.131], clue: 'Chola capital whose temple tower, built of granite, rises roughly 66 metres.' },
        { year: 1025, label: '1025', title: 'Gangaikonda Cholapuram founded', text: 'Rajendra I founds a new capital to commemorate his victorious march to the Ganga, and sends a naval expedition against Srivijaya.', place: 'Gangaikonda Cholapuram', ll: [11.206, 79.449], clue: 'A capital named for "the Chola who conquered the Ganga", built after a campaign to Bengal.' },
        { year: 1026, label: '1025–26', title: 'Mahmud of Ghazni raids Somnath', text: 'The Ghaznavid ruler sacks the wealthy Shiva temple on the Gujarat coast.', place: 'Somnath', ll: [20.888, 70.401], clue: 'A wealthy Shiva temple on the Saurashtra coast, sacked by an Afghan ruler in the 11th century.' },
        { year: 1030, label: 'c. 1030', title: 'Al-Biruni writes on India', text: 'The scholar, who accompanied Mahmud\'s campaigns, composes the Kitab al-Hind — a remarkable study of Indian science, religion and customs.', place: 'Punjab (Ghaznavid India)', ll: [32.2, 74.2], clue: 'A Persian-language scholar wrote a detailed ethnography of India after living in the Punjab around 1030.' }
      ]
    },
    {
      geo: '1200', year: 1206, yearLabel: '1206 CE', yearLabelHi: '1206 ई.',
      name: 'Founding of the Delhi Sultanate', nameHi: 'दिल्ली सल्तनत की स्थापना',
      tag: 'Ghurid conquests give birth to a sultanate that will rule north India for 320 years.',
      tagHi: 'ग़ोरी विजयें एक सल्तनत को जन्म देती हैं जो 320 वर्ष उत्तर भारत पर शासन करेगी।',
      story: 'After Muhammad of Ghor defeated Prithviraj Chauhan at the Second Battle of Tarain (1192), his general Qutb-ud-din Aibak ruled Delhi. On Muhammad\'s death in 1206, Aibak became the first sultan of the "Mamluk" (slave) dynasty. Bakhtiyar Khalji\'s raids into Bihar and Bengal (c. 1200) ended Pala–Sena power, and Nalanda and Vikramashila declined. Meanwhile the Cholas were fading, and Hoysalas and Kakatiyas were rising in the south.',
      rulers: ['Qutb-ud-din Aibak (1206–1210)', 'Iltutmish (1211–1236)', 'Muhammad of Ghor (d. 1206)', 'Prithviraj III Chauhan (1178–1192)', 'Kulottunga III Chola (1178–1218)'],
      places: [
        { n: 'Delhi (Lal Kot / Mehrauli)', ll: [28.52, 77.18], k: 'capital', note: 'Sultanate capital; Qutb Minar begun c. 1199' },
        { n: 'Tarain (Taraori)', ll: [29.78, 76.93], k: 'site', note: 'Battles of 1191 and 1192' },
        { n: 'Lakhnauti', ll: [24.87, 88.13], k: 'city', note: 'Bengal base of Bakhtiyar Khalji' },
        { n: 'Warangal', ll: [17.97, 79.6], k: 'capital', note: 'Kakatiya capital' },
        { n: 'Dwarasamudra (Halebidu)', ll: [13.21, 75.99], k: 'capital', note: 'Hoysala capital' },
        { n: 'Nalanda', ll: [25.136, 85.444], k: 'site', note: 'Sacked c. 1200' }
      ],
      events: [
        { year: 1192, label: '1192', title: 'Second Battle of Tarain', text: 'Muhammad of Ghor defeats Prithviraj Chauhan, opening the Gangetic plain to Turkic rule.', place: 'Tarain (Taraori)', ll: [29.78, 76.93], clue: 'A battlefield in Haryana fought twice, in 1191 and 1192, with opposite outcomes.' },
        { year: 1199, label: 'c. 1199', title: 'Qutb Minar begun', text: 'Aibak begins the red-sandstone victory tower; it is finished by Iltutmish and later sultans.', place: 'Mehrauli, Delhi', ll: [28.5245, 77.1855], clue: 'A 73-metre minaret of red sandstone south of Delhi, begun around 1199.' },
        { year: 1200, label: 'c. 1200', title: 'Nalanda sacked', text: 'Bakhtiyar Khalji\'s forces ravage the monastic centres of Bihar; Nalanda\'s decline follows.', place: 'Nalanda', ll: [25.136, 85.444], clue: 'A great Buddhist university in Bihar was destroyed in the wars of the late 12th century.' },
        { year: 1206, label: '1206', title: 'Delhi Sultanate established', text: 'Qutb-ud-din Aibak becomes the first sultan of Delhi after Muhammad of Ghor\'s death.', place: 'Lahore / Delhi', ll: [31.55, 74.34], clue: 'Aibak was crowned in this Punjab city in 1206 before the capital moved to Delhi.' }
      ]
    },
    {
      geo: '1300', year: 1335, yearLabel: '1335 CE', yearLabelHi: '1335 ई.',
      name: 'Tughlaqs & the birth of Vijayanagara', nameHi: 'तुग़लक़ और विजयनगर का जन्म',
      tag: 'Delhi\'s greatest extent — just before the south breaks away.',
      tagHi: 'दिल्ली का सबसे बड़ा विस्तार — दक्षिण के अलग होने से ठीक पहले।',
      story: 'Under Muhammad bin Tughlaq the sultanate reached from Sindh to Bengal to the Deccan, but overextension — token currency, the Daulatabad shift, revolts — unravelled it within a generation. In 1336 the brothers Harihara and Bukka founded Vijayanagara on the Tungabhadra; in 1347 the Bahmani Sultanate broke away in the Deccan. The base map is the 1300 snapshot from the data source (Delhi\'s earlier outline); the dashed pink area is a hand-drawn sketch of Vijayanagara\'s core, and the Bahmanis (1347) are not yet shown.',
      rulers: ['Muhammad bin Tughlaq (1325–1351)', 'Harihara I & Bukka I (Vijayanagara, from 1336)', 'Ibn Battuta (visitor, 1333–1347)', 'Hasan Gangu (Bahmani founder, 1347)'],
      places: [
        { n: 'Delhi', ll: [28.61, 77.21], k: 'capital', note: 'Tughlaq capital' },
        { n: 'Daulatabad', ll: [19.943, 75.213], k: 'capital', note: 'Second capital, 1327–1334' },
        { n: 'Hampi (Vijayanagara)', ll: [15.335, 76.462], k: 'capital', note: 'Founded 1336' },
        { n: 'Madurai', ll: [9.93, 78.12], k: 'city', note: 'Madurai Sultanate (1335–1378)' },
        { n: 'Gaur / Lakhnauti', ll: [24.87, 88.13], k: 'city', note: 'Bengal provincial capital' },
        { n: 'Warangal', ll: [17.97, 79.6], k: 'city', note: 'Kakatiya capital, fell 1323' }
      ],
      events: [
        { year: 1327, label: '1327', title: 'Capital moved to Daulatabad', text: 'Muhammad bin Tughlaq shifts the capital south from Delhi in a famously ill-fated experiment.', place: 'Daulatabad (Devagiri)', ll: [19.943, 75.213], clue: 'A Deccan hill-fortress briefly made capital of the sultanate, then abandoned.' },
        { year: 1334, label: '1334', title: 'Ibn Battuta reaches Delhi', text: 'The Moroccan traveller arrives and later serves as a qadi at the Tughlaq court.', place: 'Delhi', ll: [28.61, 77.21], clue: 'A Moroccan traveller served as a judge in this city, whose sultan was famously ambitious.' },
        { year: 1336, label: '1336', title: 'Vijayanagara founded', text: 'Brothers Harihara and Bukka found the kingdom on the Tungabhadra; its capital grows into one of the world\'s largest cities.', place: 'Hampi (Vijayanagara)', ll: [15.335, 76.462], clue: 'Boulder-strewn ruins on the Tungabhadra mark what was once among the largest cities in the world.' },
        { year: 1347, label: '1347', title: 'Bahmani Sultanate breaks away', text: 'Hasan Gangu declares independence in the Deccan, founding the Bahmani Sultanate with its capital at Gulbarga.', place: 'Gulbarga', ll: [17.33, 76.83], clue: 'A Karnataka city became the first capital of the Deccan\'s Bahmani Sultanate in 1347.' }
      ]
    },
    {
      geo: '1530', year: 1526, yearLabel: '1526 CE', yearLabelHi: '1526 ई.',
      name: 'Vijayanagara, Deccan Sultanates & the dawn of the Mughals', nameHi: 'विजयनगर, दक्कनी सल्तनतें और मुग़लों का उदय',
      tag: 'Regional powers flourish as Babur enters from the north-west.',
      tagHi: 'बाबर के उत्तर-पश्चिम से आने पर क्षेत्रीय शक्तियाँ फलती-फूलती हैं।',
      story: 'Krishnadevaraya\'s Vijayanagara controlled the south, while five successor states of the Bahmani Sultanate — Bijapur, Ahmadnagar, Golkonda, Bidar, Berar — dominated the Deccan. In the north, Babur used cannon and matchlocks to defeat Ibrahim Lodi at Panipat (1526), then Rana Sanga at Khanwa (1527). Europeans arrived by sea: the Portuguese took Goa in 1510. Maps here follow the 1530 snapshot of the data source.',
      rulers: ['Krishnadevaraya (1509–1529)', 'Babur (1526–1530)', 'Rana Sanga of Mewar (1509–1528)', 'Alauddin Husain Shah of Bengal (1494–1519)', 'Afonso de Albuquerque (Portuguese viceroy)'],
      places: [
        { n: 'Hampi (Vijayanagara)', ll: [15.335, 76.462], k: 'capital', note: 'Imperial capital' },
        { n: 'Agra', ll: [27.18, 78.02], k: 'capital', note: 'Lodi and later Mughal capital' },
        { n: 'Panipat', ll: [29.39, 76.97], k: 'site', note: 'Battle of 1526' },
        { n: 'Bijapur', ll: [16.83, 75.71], k: 'capital', note: 'Adil Shahi capital' },
        { n: 'Golconda', ll: [17.38, 78.4], k: 'capital', note: 'Qutb Shahi fortress capital' },
        { n: 'Goa', ll: [15.5, 73.83], k: 'port', note: 'Portuguese since 1510' },
        { n: 'Chittorgarh', ll: [24.88, 74.64], k: 'site', note: 'Mewar fortress' }
      ],
      events: [
        { year: 1498, label: '1498', title: 'Vasco da Gama reaches Calicut', text: 'The first direct sea route from Europe to India opens the era of European maritime trade.', place: 'Calicut (Kozhikode)', ll: [11.25, 75.78], clue: 'A Malabar coast port where a Portuguese fleet landed after sailing round Africa.' },
        { year: 1510, label: '1510', title: 'Portuguese capture Goa', text: 'Afonso de Albuquerque seizes Goa from Bijapur, creating a Portuguese base that lasts until 1961.', place: 'Goa', ll: [15.5, 73.83], clue: 'A west-coast port seized in 1510 that stayed under European rule for 450 years.' },
        { year: 1526, label: '1526', title: 'First Battle of Panipat', text: 'Babur defeats Ibrahim Lodi using field artillery and founds the Mughal Empire.', place: 'Panipat', ll: [29.39, 76.97], clue: 'A plain north of Delhi where three decisive battles were fought, the first in 1526.' },
        { year: 1527, label: '1527', title: 'Battle of Khanwa', text: 'Babur defeats the Rajput confederacy led by Rana Sanga, securing Mughal control of north India.', place: 'Khanwa', ll: [27.04, 77.08], clue: 'A small village near Fatehpur Sikri saw the Rajputs and Babur decide north India\'s future in 1527.' }
      ]
    },
    {
      geo: '1650', year: 1650, yearLabel: '1650 CE', yearLabelHi: '1650 ई.',
      name: 'Shah Jahan\'s empire & the Deccan sultanates', nameHi: 'शाहजहाँ का साम्राज्य और दक्कन की सल्तनतें',
      tag: 'Mughal splendour at its peak; Bijapur and Golkonda survive, and the Company arrives in Madras.',
      tagHi: 'मुग़ल वैभव अपने शिखर पर; बीजापुर और गोलकुंडा टिके हैं, और कंपनी मद्रास में आ चुकी है।',
      story: 'Shah Jahan\'s reign (1628–58) is the high point of Mughal architecture: the Taj Mahal, the Red Fort of Shahjahanabad and the Peacock Throne. In the Deccan he absorbed Ahmadnagar (1636) and forced Bijapur and Golkonda into tributary status, while the Vijayanagara remnants fragmented into Nayaka kingdoms at Madurai, Thanjavur and Gingee. Europeans built coastal footholds, and in the Western Ghats the young Shivaji began capturing forts.',
      rulers: ['Shah Jahan (1628–1658)', 'Muhammad Adil Shah (Bijapur, 1627–56)', 'Abdullah Qutb Shah (Golkonda, 1626–72)', 'Tirumala Nayak (Madurai, 1623–59)', 'Dara Shikoh & Aurangzeb (princes)'],
      places: [
        { n: 'Shahjahanabad (Delhi)', ll: [28.656, 77.241], k: 'capital', note: 'New Mughal capital with the Red Fort (1639–48)' },
        { n: 'Agra', ll: [27.175, 78.042], k: 'city', note: 'Taj Mahal under completion' },
        { n: 'Lahore', ll: [31.55, 74.34], k: 'city', note: 'Shalimar Gardens and the royal fort' },
        { n: 'Bijapur', ll: [16.83, 75.71], k: 'capital', note: 'Adil Shahi capital; Gol Gumbaz' },
        { n: 'Golconda', ll: [17.38, 78.4], k: 'capital', note: 'Qutb Shahi fortress and diamond market' },
        { n: 'Madurai', ll: [9.93, 78.12], k: 'capital', note: 'Nayaka capital; Meenakshi temple halls' },
        { n: 'Madras (Fort St George)', ll: [13.08, 80.29], k: 'port', note: 'English Company base from 1639' }
      ],
      events: [
        { year: 1639, label: '1639', title: 'Fort St George founded at Madras', text: 'The English East India Company obtains land from a Nayaka ruler on the Coromandel coast and builds a fortified factory.', place: 'Madras (Chennai)', ll: [13.08, 80.29], clue: 'A Coromandel coast settlement in 1639 would become the capital of a presidency.' },
        { year: 1646, label: '1646', title: 'Shivaji captures Torna', text: 'The 16-year-old Shivaji takes the Bijapur fort of Torna, the first step in building a Maratha hill-fort kingdom.', place: 'Torna', ll: [18.28, 73.62], clue: 'A Sahyadri hill fort near Pune where a teenager made his first conquest in 1646.' },
        { year: 1648, label: '1648', title: 'Red Fort completed at Shahjahanabad', text: 'After nine years of work, Shah Jahan inaugurates his palace-fortress and new capital on the Yamuna.', place: 'Delhi (Red Fort)', ll: [28.656, 77.241], clue: 'A red sandstone palace-fort completed in 1648 now hosts a prime-ministerial flag-hoisting each year.' },
        { year: 1658, label: '1658', title: 'War of succession: Battle of Samugarh', text: 'Aurangzeb defeats Dara Shikoh near Agra and seizes the throne, imprisoning Shah Jahan.', place: 'Samugarh', ll: [27.15, 78.12], clue: 'A plain near Agra where brothers fought for the Mughal throne in 1658.' }
      ]
    },
    {
      geo: '1700', year: 1700, yearLabel: '1700 CE', yearLabelHi: '1700 ई.',
      name: 'Mughal Empire at its largest', nameHi: 'मुग़ल साम्राज्य का सबसे बड़ा विस्तार',
      tag: 'Aurangzeb\'s empire stretches over almost the whole subcontinent — while the Marathas contest it.',
      tagHi: 'औरंगज़ेब का साम्राज्य लगभग पूरे उपमहाद्वीप पर — जबकि मराठे चुनौती देते हैं।',
      story: 'Around 1700 the Mughals ruled an estimated quarter of the world\'s manufacturing output, but their 25-year Deccan war drained the treasury. Maratha guerrilla warfare, Rajput and Sikh revolts, and the rise of regional governors prepared the empire\'s fragmentation. The dashed green area marks the Maratha heartland and is only a rough sketch; its edges were fluid.',
      rulers: ['Shah Jahan (1628–1658)', 'Aurangzeb (1658–1707)', 'Shivaji (1674–1680)', 'Guru Gobind Singh (Sikh, 1675–1708)', 'Rajaram & Tarabai (Maratha)'],
      places: [
        { n: 'Delhi (Shahjahanabad)', ll: [28.656, 77.241], k: 'capital', note: 'Mughal capital; Red Fort' },
        { n: 'Agra', ll: [27.175, 78.042], k: 'city', note: 'Taj Mahal' },
        { n: 'Aurangabad', ll: [19.88, 75.34], k: 'city', note: 'Aurangzeb\'s Deccan base' },
        { n: 'Raigad', ll: [18.234, 73.44], k: 'capital', note: 'Maratha capital' },
        { n: 'Madras', ll: [13.08, 80.27], k: 'port', note: 'English Fort St George (1639)' },
        { n: 'Calcutta', ll: [22.57, 88.36], k: 'port', note: 'Founded 1690' },
        { n: 'Surat', ll: [21.17, 72.83], k: 'port', note: 'Premier Mughal port' }
      ],
      events: [
        { year: 1653, label: '1653', title: 'Taj Mahal completed', text: 'Shah Jahan\'s white-marble mausoleum for Mumtaz Mahal, built over about two decades on the Yamuna.', place: 'Agra', ll: [27.175, 78.042], clue: 'A white-marble mausoleum on the Yamuna river, finished around 1653.' },
        { year: 1674, label: '1674', title: 'Shivaji crowned Chhatrapati', text: 'Shivaji is crowned at his fortress capital, formalising an independent Maratha kingdom.', place: 'Raigad Fort', ll: [18.234, 73.44], clue: 'A Sahyadri hill-fort where a Maratha ruler was crowned in 1674.' },
        { year: 1690, label: '1690', title: 'Calcutta founded', text: 'The English East India Company establishes a trading post at Sutanuti on the Hooghly, which grows into Calcutta.', place: 'Kolkata (Calcutta)', ll: [22.57, 88.36], clue: 'A trading post on the Hooghly in 1690 grew into the capital of British India.' },
        { year: 1699, label: '1699', title: 'Khalsa founded', text: 'Guru Gobind Singh founds the Khalsa order at Anandpur Sahib on Baisakhi.', place: 'Anandpur Sahib', ll: [31.23, 76.5], clue: 'A Punjab town in the Shivalik foothills where the Sikh Khalsa was founded in 1699.' }
      ]
    },
    {
      geo: '1783', year: 1783, yearLabel: '1783 CE', yearLabelHi: '1783 ई.',
      name: 'Marathas, Mysore & the Company', nameHi: 'मराठे, मैसूर और कंपनी',
      tag: 'Mughal power fragments; successor states and the East India Company compete.',
      tagHi: 'मुग़ल सत्ता बिखरती है; उत्तराधिकारी राज्य और ईस्ट इंडिया कंपनी प्रतिस्पर्धा करते हैं।',
      story: 'After Nader Shah\'s sack of Delhi (1739) and Plassey (1757), power moved to regional rulers. The Marathas dominated central India until Panipat (1761) checked them in the north; Hyder Ali and Tipu Sultan built a militarised state in Mysore; the Nizam, Nawab of Awadh and Sikh misls ruled the rest. The Company acquired Bengal\'s diwani in 1765. The Treaty of Salbai (1782) ended the first Anglo-Maratha war.',
      rulers: ['Mahadji Scindia & Nana Phadnavis (Maratha)', 'Hyder Ali (d. 1782) / Tipu Sultan', 'Warren Hastings (Governor-General)', 'Nizam Ali Khan (Hyderabad)', 'Ranjit Singh (born 1780)'],
      places: [
        { n: 'Pune', ll: [18.52, 73.86], k: 'capital', note: 'Peshwa capital' },
        { n: 'Srirangapatna', ll: [12.42, 76.69], k: 'capital', note: 'Mysore capital' },
        { n: 'Hyderabad', ll: [17.385, 78.487], k: 'capital', note: 'Nizam\'s capital' },
        { n: 'Calcutta', ll: [22.57, 88.36], k: 'capital', note: 'Company\'s seat, Fort William' },
        { n: 'Lucknow', ll: [26.85, 80.95], k: 'capital', note: 'Awadh capital' },
        { n: 'Lahore', ll: [31.55, 74.34], k: 'city', note: 'Sikh misl region' },
        { n: 'Delhi', ll: [28.61, 77.21], k: 'city', note: 'Nominal Mughal capital' }
      ],
      events: [
        { year: 1757, label: '1757', title: 'Battle of Plassey', text: 'Robert Clive defeats Siraj ud-Daulah, the Nawab of Bengal, laying the foundation for Company rule.', place: 'Plassey (Palashi)', ll: [23.8, 88.25], clue: 'A mango grove in Bengal where a short 1757 battle changed the subcontinent\'s history.' },
        { year: 1761, label: '1761', title: 'Third Battle of Panipat', text: 'Ahmad Shah Durrani defeats the Maratha army, halting Maratha expansion in the north.', place: 'Panipat', ll: [29.39, 76.97], clue: 'The same northern plain as Babur\'s 1526 victory hosted a huge clash in 1761.' },
        { year: 1765, label: '1765', title: 'Company obtains the diwani of Bengal', text: 'After Buxar, the Mughal emperor grants the East India Company the right to collect revenue in Bengal, Bihar and Orissa.', place: 'Allahabad', ll: [25.43, 81.84], clue: 'A confluence city where in 1765 the Mughal emperor handed over the revenues of a rich province.' },
        { year: 1782, label: '1782', title: 'Treaty of Salbai', text: 'Ends the First Anglo-Maratha War, recognising Maratha power and the status quo of 1775.', place: 'Salbai', ll: [26.06, 78.2], clue: 'A village near Gwalior gave its name to a treaty that ended a war in 1782.' }
      ]
    },
    {
      geo: '1900', year: 1900, yearLabel: '1900 CE', yearLabelHi: '1900 ई.',
      name: 'British Raj', nameHi: 'ब्रिटिश राज',
      tag: 'The subcontinent under crown rule, directly or through princely states.',
      tagHi: 'ताज के अधीन उपमहाद्वीप — सीधे या रियासतों के माध्यम से।',
      story: 'After 1858 the Crown ruled about three-fifths of the subcontinent directly and the rest, around 560 princely states, indirectly through "paramountcy". Railways, telegraphs and the Indian Civil Service unified administration but also served extraction; famines (1876–78, 1896–97, 1899–1900) killed millions. Meanwhile an English-educated middle class founded the Indian National Congress (1885) and reform movements flourished.',
      rulers: ['Queen Victoria (Empress of India, 1876–1901)', 'Lord Curzon (Viceroy, 1899–1905)', 'Swami Vivekananda (1863–1902)', 'Dadabhai Naoroji'],
      places: [
        { n: 'Calcutta', ll: [22.57, 88.36], k: 'capital', note: 'Capital of British India until 1911' },
        { n: 'Bombay', ll: [18.97, 72.82], k: 'port', note: 'Commercial capital' },
        { n: 'Madras', ll: [13.08, 80.27], k: 'port', note: 'Presidency capital' },
        { n: 'Simla', ll: [31.1, 77.17], k: 'city', note: 'Summer capital' },
        { n: 'Delhi', ll: [28.61, 77.21], k: 'city', note: 'Capital from 1911' },
        { n: 'Lahore', ll: [31.55, 74.34], k: 'city', note: 'Punjab capital' }
      ],
      events: [
        { year: 1857, label: '1857', title: 'The Rebellion of 1857', text: 'A rising that begins among sepoys at Meerut spreads across north and central India; afterwards the Crown takes over from the Company.', place: 'Meerut', ll: [28.98, 77.71], clue: 'A cantonment town near Delhi where sepoys rose against their officers in May 1857.' },
        { year: 1885, label: '1885', title: 'Indian National Congress founded', text: 'The first session is held in Bombay, beginning organised nationalist politics.', place: 'Bombay (Mumbai)', ll: [18.97, 72.82], clue: 'A west-coast port city hosted the first session of the Congress in 1885.' },
        { year: 1853, label: '1853', title: 'First railway', text: 'The first passenger train in India runs from Bombay to Thane over 34 km.', place: 'Bori Bunder, Bombay', ll: [18.94, 72.836], clue: 'A 34-km passenger line opened in 1853 from this bustling Bombay terminus.' },
        { year: 1911, label: '1911', title: 'Capital moves to Delhi', text: 'George V announces at the Delhi Durbar that the imperial capital will shift from Calcutta.', place: 'Delhi', ll: [28.61, 77.21], clue: 'In 1911 the British moved their capital here from Calcutta.' }
      ]
    },
    {
      geo: '1960', year: 1950, yearLabel: '1950 CE', yearLabelHi: '1950 ई.',
      name: 'Independence & the Republic', nameHi: 'स्वतंत्रता और गणराज्य',
      tag: 'Independence in 1947, Partition, integration of princely states, and a new Constitution.',
      tagHi: '1947 में स्वतंत्रता, विभाजन, रियासतों का एकीकरण और नया संविधान।',
      story: 'Partition displaced an estimated 10–20 million people and killed perhaps one to two million. Sardar Patel and V. P. Menon persuaded or pressed over 560 princely states to accede; Junagadh, Hyderabad and Kashmir were contested. The Constitution (adopted 26 Nov 1949, in force 26 Jan 1950) created a federal parliamentary republic; the States Reorganisation Act (1956) redrew states on linguistic lines. The map follows the 1960 snapshot of the data source.',
      rulers: ['Jawaharlal Nehru (PM, 1947–1964)', 'Rajendra Prasad (President, 1950–1962)', 'B. R. Ambedkar (Constitution drafting)', 'Sardar Vallabhbhai Patel (Home Minister)', 'Liaquat Ali Khan / Muhammad Ali Jinnah (Pakistan)'],
      places: [
        { n: 'New Delhi', ll: [28.614, 77.209], k: 'capital', note: 'Capital of the Republic' },
        { n: 'Karachi', ll: [24.86, 67.01], k: 'capital', note: 'First capital of Pakistan' },
        { n: 'Dhaka', ll: [23.81, 90.41], k: 'city', note: 'East Pakistan' },
        { n: 'Chandigarh', ll: [30.74, 76.79], k: 'capital', note: 'Planned by Le Corbusier from 1951' },
        { n: 'Hyderabad', ll: [17.385, 78.487], k: 'city', note: 'Integrated 1948' },
        { n: 'Srinagar', ll: [34.08, 74.8], k: 'city', note: 'Jammu & Kashmir' }
      ],
      events: [
        { year: 1947, label: '15 Aug 1947', title: 'Independence and Partition', text: 'British rule ends; the subcontinent is partitioned into India and Pakistan amid mass migration and violence.', place: 'New Delhi', ll: [28.614, 77.209], clue: 'On the night of 14–15 August 1947 a "tryst with destiny" speech was given in this capital.' },
        { year: 1948, label: '1948', title: 'Hyderabad integrated', text: 'Operation Polo brings the Nizam\'s state into the Indian Union.', place: 'Hyderabad', ll: [17.385, 78.487], clue: 'The largest princely state, ruled by a Nizam, joined India in 1948.' },
        { year: 1950, label: '26 Jan 1950', title: 'The Constitution comes into force', text: 'India becomes a sovereign democratic republic; 26 January is celebrated as Republic Day.', place: 'New Delhi', ll: [28.614, 77.209], clue: 'A grand parade down Kartavya Path commemorates the 1950 constitution each year.' },
        { year: 1956, label: '1956', title: 'States Reorganisation', text: 'Indian states are redrawn on linguistic lines after the Andhra agitation and the States Reorganisation Commission.', place: 'Hyderabad / Telangana region', ll: [17.9, 79.0], clue: 'The Potti Sriramulu fast in 1952–53 led to the first linguistic state, Andhra, and then a nationwide reorganisation.' }
      ]
    },
    {
      geo: '2010', year: 2010, yearLabel: 'Today', yearLabelHi: 'आज',
      name: 'South Asia today', nameHi: 'आज का दक्षिण एशिया',
      tag: 'Seven decades on: India, Pakistan, Bangladesh and their neighbours.',
      tagHi: 'सात दशक बाद: भारत, पाकिस्तान, बांग्लादेश और उनके पड़ोसी।',
      story: 'Bangladesh emerged in 1971 after a war of liberation. India liberalised its economy in 1991, and since then services and technology have grown rapidly; the country has also seen new states created (Chhattisgarh, Jharkhand, Uttarakhand in 2000; Telangana in 2014). Several land and maritime boundaries, notably in Kashmir and along the Himalayan frontier, remain disputed or undemarcated; this map takes no position on them.',
      rulers: ['Constitution of India (1950)', 'Parliamentary democracy with a federal structure', '28 states and 8 union territories (2020)'],
      places: [
        { n: 'New Delhi', ll: [28.614, 77.209], k: 'capital', note: 'Capital of India' },
        { n: 'Islamabad', ll: [33.68, 73.05], k: 'capital', note: 'Capital of Pakistan' },
        { n: 'Dhaka', ll: [23.81, 90.41], k: 'capital', note: 'Capital of Bangladesh' },
        { n: 'Mumbai', ll: [19.08, 72.88], k: 'city', note: 'Financial capital' },
        { n: 'Bengaluru', ll: [12.97, 77.59], k: 'city', note: 'Technology hub' },
        { n: 'Kathmandu', ll: [27.7, 85.32], k: 'capital', note: 'Capital of Nepal' }
      ],
      events: [
        { year: 1971, label: '1971', title: 'Bangladesh Liberation War', text: 'East Pakistan secedes after a nine-month war; Bangladesh is born.', place: 'Dhaka', ll: [23.81, 90.41], clue: 'A delta capital became the seat of a new nation on 16 December 1971.' },
        { year: 1991, label: '1991', title: 'Economic liberalisation', text: 'A balance-of-payments crisis triggers reforms that dismantle most of the "licence raj".', place: 'New Delhi', ll: [28.614, 77.209], clue: 'In this capital the 1991 budget began a wave of economic liberalisation.' },
        { year: 2000, label: '2000', title: 'Three new states formed', text: 'Chhattisgarh, Jharkhand and Uttarakhand are carved out of Madhya Pradesh, Bihar and Uttar Pradesh.', place: 'Dehradun (Uttarakhand)', ll: [30.32, 78.03], clue: 'A Himalayan-foothill city became the interim capital of a new state in 2000.' },
        { year: 2014, label: '2014', title: 'Telangana formed', text: 'India\'s 29th state is carved out of Andhra Pradesh, with Hyderabad as the shared capital for ten years.', place: 'Hyderabad', ll: [17.385, 78.487], clue: 'A city that is the capital of the newest (2014) state is known for both its historic Nizam heritage and a tech boom.' }
      ]
    }
  ];

  window.ATLAS_DATA = { ERAS: ERAS };
})();
