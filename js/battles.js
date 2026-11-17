/*
 * Battles and wars tied to events (matched by event title). Each draws a very small war on the map:
 * two tiny opposing armies in their colours, with the winner's banner raised and the loser's banner down.
 * a = first side, b = second side, w = index of the winner (0 = a, 1 = b).
 */
(function () {
  'use strict';
  const B = (ev, a, b, w, note, noteHi) => ({ ev, a, b, w, note, noteHi });
  const S = (n, nHi, c) => ({ n, nHi, c });
  window.ATLAS_BATTLES = [
    B('Battle of the Hydaspes', S('Alexander\'s Macedonians', 'सिकंदर की यूनानी सेना', '#b45309'), S('Porus (Paurava)', 'पोरस (पौरव)', '#7c3aed'), 0, 'Alexander wins a hard-fought battle but reinstates Porus as his ally.', 'सिकंदर कठिन युद्ध जीतता है पर पोरस को अपना सहयोगी बनाकर बहाल करता है।'),
    B('The Kalinga War', S('Mauryas (Ashoka)', 'मौर्य (अशोक)', '#b45309'), S('Kalinga', 'कलिंग', '#be185d'), 0, 'A decisive Maurya victory at enormous human cost — the turning point of Ashoka\'s reign.', 'भारी जनहानि के साथ निर्णायक मौर्य विजय — अशोक के शासन का मोड़।'),
    B('Gautamiputra Satakarni defeats the Shakas', S('Satavahanas', 'सातवाहन', '#15803d'), S('Western Satraps', 'पश्चिमी क्षत्रप', '#0369a1'), 0, 'The Satavahana king recovers lost territory from the Shaka satraps.', 'सातवाहन राजा शक क्षत्रपों से खोया क्षेत्र वापस लेता है।'),
    B('Yashodharman defeats Mihirakula', S('Yashodharman of Malwa', 'मालवा का यशोधर्मन', '#15803d'), S('Hunas (Mihirakula)', 'हूण (मिहिरकुल)', '#7c3aed'), 0, 'The Huna advance in central India is broken.', 'मध्य भारत में हूणों का बढ़ाव रुकता है।'),
    B('Pulakeshin II halts Harsha', S('Chalukyas (Pulakeshin II)', 'चालुक्य (पुलकेशिन द्वितीय)', '#0369a1'), S('Harsha\'s kingdom', 'हर्ष का राज्य', '#b45309'), 0, 'Harsha\'s southward drive is stopped on the Narmada.', 'नर्मदा पर हर्ष का दक्षिण की ओर बढ़ना रुकता है।'),
    B('Pallavas sack Vatapi', S('Pallavas (Narasimhavarman I)', 'पल्लव (नरसिंहवर्मन प्रथम)', '#be185d'), S('Chalukyas', 'चालुक्य', '#0369a1'), 0, 'The Chalukya capital falls and Pulakeshin II is killed.', 'चालुक्य राजधानी गिरती है और पुलकेशिन द्वितीय मारा जाता है।'),
    B('Arab conquest of Sindh', S('Umayyad Caliphate', 'उमय्यद ख़िलाफ़त', '#b91c1c'), S('Raja Dahir of Sindh', 'सिंध के राजा दाहिर', '#6d28d9'), 0, 'Muhammad bin Qasim defeats Dahir; Sindh becomes a province of the Caliphate.', 'मुहम्मद बिन क़ासिम दाहिर को हराता है; सिंध ख़िलाफ़त का प्रांत बनता है।'),
    B('Aditya I defeats the Pallavas', S('Cholas (Aditya I)', 'चोल (आदित्य प्रथम)', '#0891b2'), S('Pallavas', 'पल्लव', '#be185d'), 0, 'The Pallava dynasty ends; the Cholas take Tondaimandalam.', 'पल्लव वंश समाप्त; चोल तोंडैमंडलम ले लेते हैं।'),
    B('Indra III sacks Kannauj', S('Rashtrakutas (Indra III)', 'राष्ट्रकूट (इंद्र तृतीय)', '#b45309'), S('Pratiharas', 'प्रतिहार', '#15803d'), 0, 'A Deccan raid plunders the Pratihara capital.', 'दक्कन का आक्रमण प्रतिहार राजधानी को लूटता है।'),
    B('Mahmud of Ghazni raids Somnath', S('Ghaznavids (Mahmud)', 'ग़ज़नवी (महमूद)', '#b91c1c'), S('Defenders of Somnath', 'सोमनाथ के रक्षक', '#15803d'), 0, 'The temple is sacked and its wealth carried off to Ghazni.', 'मंदिर लूटा जाता है और उसकी संपत्ति ग़ज़नी ले जाई जाती है।'),
    B('Second Battle of Tarain', S('Ghurids (Muhammad of Ghor)', 'ग़ोरी (मुहम्मद ग़ोरी)', '#b91c1c'), S('Chauhans (Prithviraj III)', 'चौहान (पृथ्वीराज तृतीय)', '#ca8a04'), 0, 'Prithviraj, victor in 1191, is defeated and the Gangetic plain opens to Turkic rule.', '1191 के विजेता पृथ्वीराज हारते हैं और गंगा का मैदान तुर्क शासन के लिए खुल जाता है।'),
    B('Shivaji captures Torna', S('Marathas (Shivaji)', 'मराठा (शिवाजी)', '#15803d'), S('Bijapur Sultanate', 'बीजापुर सल्तनत', '#0369a1'), 0, 'The first fort of the future Maratha kingdom.', 'भावी मराठा राज्य का पहला किला।'),
    B('First Battle of Panipat', S('Mughals (Babur)', 'मुग़ल (बाबर)', '#b45309'), S('Lodi Sultanate', 'लोदी सल्तनत', '#7c3aed'), 0, 'Artillery and matchlocks defeat Ibrahim Lodi; the Mughal Empire begins.', 'तोपें और बंदूकें इब्राहीम लोदी को हराती हैं; मुग़ल साम्राज्य आरंभ।'),
    B('Battle of Khanwa', S('Mughals (Babur)', 'मुग़ल (बाबर)', '#b45309'), S('Rajput confederacy (Rana Sanga)', 'राजपूत संघ (राणा सांगा)', '#15803d'), 0, 'Babur defeats the Rajput alliance and secures north India.', 'बाबर राजपूत गठबंधन को हराकर उत्तर भारत सुरक्षित करता है।'),
    B('War of succession: Battle of Samugarh', S('Aurangzeb', 'औरंगज़ेब', '#b45309'), S('Dara Shikoh', 'दारा शिकोह', '#7c3aed'), 0, 'Aurangzeb wins the throne and imprisons Shah Jahan.', 'औरंगज़ेब गद्दी जीतता है और शाहजहाँ को क़ैद करता है।'),
    B('Battle of Plassey', S('East India Company (Clive)', 'ईस्ट इंडिया कंपनी (क्लाइव)', '#b91c1c'), S('Nawab of Bengal', 'बंगाल का नवाब', '#7c3aed'), 0, 'Betrayal within the Nawab\'s ranks hands Bengal to the Company.', 'नवाब की सेना में विश्वासघात बंगाल कंपनी को सौंप देता है।'),
    B('Third Battle of Panipat', S('Durrani Afghans', 'दुर्रानी अफ़ग़ान', '#64748b'), S('Marathas', 'मराठा', '#15803d'), 0, 'Ahmad Shah Durrani crushes the Maratha army; their northern expansion halts.', 'अहमद शाह दुर्रानी मराठा सेना को कुचलता है; उत्तर में उनका विस्तार रुकता है।'),
    B('The Rebellion of 1857', S('British (Crown & Company)', 'ब्रिटिश (ताज व कंपनी)', '#b91c1c'), S('Rebel sepoys & rulers', 'विद्रोही सिपाही व शासक', '#15803d'), 0, 'The rising is suppressed by 1858; the Crown takes over from the Company.', '1858 तक विद्रोह दबता है; ताज कंपनी से शासन ले लेता है।'),
    B('Bangladesh Liberation War', S('Mukti Bahini & India', 'मुक्ति वाहिनी और भारत', '#0d9488'), S('Pakistan army', 'पाकिस्तानी सेना', '#166534'), 0, 'Pakistan surrenders in Dhaka on 16 December 1971; Bangladesh is born.', '16 दिसंबर 1971 को ढाका में पाकिस्तान आत्मसमर्पण करता है; बांग्लादेश का जन्म।')
  ];
})();
