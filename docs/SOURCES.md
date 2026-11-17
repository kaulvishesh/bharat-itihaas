# Sources, AI use and corrections

How this atlas was made, how it was checked, and where you can verify it. (Also on the site: [sources.html](https://kaulvishesh.github.io/bharat-itihaas/sources.html).)

## How it was made

This atlas was built with Claude Code, an AI coding assistant from Anthropic, directed and tested by the project’s author. The code, the era summaries, the event descriptions, the place notes and the Hindi text were written with AI assistance, from the model’s general knowledge, not copied from particular books. The English narration is synthetic speech and the ambient music is synthesised in the browser.

It has not been reviewed by a professional historian. AI-written history can contain errors, oversimplifications and gaps, and the atlas is a simplified overview of 2,500 years, not a scholarly work. Please treat it as a starting point and check anything that matters against the references below.

## How it was checked

Every event on the map links, in its popup, to the Wikipedia article about that event, fetched live. The table below lists the article behind each of the 75 events so you can compare the atlas text with it. Wikipedia is a starting point, not a final authority; for scholarship, use the reference works further down.

A script (`scripts/check_facts.js`) compares every year and figure in each event with the text of its Wikipedia article. On 17 November 2026 it checked 75 events; 65 had every number present in the article, and 10 were flagged for a person to look at. Of the 10 flagged: one was a broken link to the wrong Wikipedia article title (fixed); three dates were adjusted or marked as traditional to match the article (the Achaemenid conquest of the Indus valley, the First Buddhist Council, Aditya I’s conquest of Tondaimandalam); one description was corrected (the Treaty of Salbai restored the position after the Treaty of Purandar, 1776, not “the status quo of 1775”); and five approximate or traditional dates that the article does not state were left as labelled approximations (Mahinda in Sri Lanka, the Iron Pillar of Delhi, Pulakeshin II and Harsha, Xuanzang at Nalanda, Vikramashila). The 65 that passed only mean each number appears somewhere in the article: this check looks at years and figures, not at wording, emphasis or omissions.

This kind of check cannot judge wording, emphasis or what is left out, so it is no substitute for a historian’s review. If you find a mistake, please [open a correction](https://github.com/kaulvishesh/bharat-itihaas/issues/new?template=data-error.yml) with a source: it will be fixed.

## Data and images

| Layer | Source |
|---|---|
| Historical boundaries | Simplified from the [historical-basemaps](https://github.com/aourednik/historical-basemaps) dataset (Aourednik), then relabelled and edited by hand. Schematic: not surveyed or authoritative. |
| Present-day India (1960 and 2010 eras) | Natural Earth, “India point of view” (public domain), applied by `scripts/apply_india_claim.js`. An approximation, not the Survey of India’s official map. |
| Coastline | Natural Earth 50m land (public domain). |
| Routes, rivers, roads, canals and dams | Schematic polylines through known waypoints, drawn by this project. Not surveyed. |
| Event and place summaries (popups) | Wikipedia, fetched live when you open a popup, with the article’s own licence (CC BY-SA 4.0). |
| Photographs in popups | Wikimedia Commons, through the Wikipedia article’s lead image, fetched live. Each photo keeps its own licence and author, shown on its Commons page. The atlas stores no photographs. |
| Illustrations on the map (landmarks, pictograms, engraved plates) | Original vector drawings generated as code (`js/landmarks.js`, `js/icons.js`) with AI assistance. They are stylised and illustrative, not reconstructions or copies of any artwork or photograph. |
| Hillshade, Relief and Satellite | USGS (SRTM, GMTED2010) and NOAA (ETOPO1) elevation via AWS Terrain Tiles; NASA Blue Marble imagery. Public domain / NASA open data. |
| Narration and music | English narration: Kokoro-82M text-to-speech (Apache-2.0), generated speech. Music: synthesised live in the browser, no recordings. |

Every dataset and its licence is listed in [NOTICE.md](../NOTICE.md).

## Reference works to verify against

These are standard, widely held works for the periods the atlas covers. **The atlas text was not drafted from them**; they are where a reader can check it. No page numbers are claimed.

### General histories

- Romila Thapar, *Early India: From the Origins to AD 1300* (Allen Lane / University of California Press, 2002)
- Upinder Singh, *A History of Ancient and Early Medieval India: From the Stone Age to the 12th Century* (Pearson Education, 2008)
- Burton Stein, *A History of India* (Blackwell, 1998; 2nd ed., ed. David Arnold, Wiley-Blackwell, 2010)
- Catherine B. Asher and Cynthia Talbot, *India Before Europe* (Cambridge University Press, 2006)

### South India and the Deccan

- K. A. Nilakanta Sastri, *A History of South India: From Prehistoric Times to the Fall of Vijayanagar* (Oxford University Press, 1955)
- Richard M. Eaton, *A Social History of the Deccan, 1300–1761: Eight Indian Lives* (Cambridge University Press, 2005)

### Inscriptions and primary texts

- D. C. Sircar, *Select Inscriptions Bearing on Indian History and Civilization* (University of Calcutta, 1942; 2nd ed. 1965)

### Mughal and early modern India

- Irfan Habib, *An Atlas of the Mughal Empire* (Oxford University Press, Delhi, 1982)
- Catherine B. Asher and Cynthia Talbot, *India Before Europe* (Cambridge University Press, 2006)
- Richard M. Eaton, *A Social History of the Deccan, 1300–1761: Eight Indian Lives* (Cambridge University Press, 2005)

### Colonial India and the freedom movement

- Barbara D. Metcalf and Thomas R. Metcalf, *A Concise History of Modern India* (Cambridge University Press, 2002; 3rd ed. 2012)
- Bipan Chandra et al., *India’s Struggle for Independence* (Penguin Books India, 1989)

### India since 1947

- Ramachandra Guha, *India After Gandhi: The History of the World’s Largest Democracy* (Ecco / Picador India, 2007)

### Kashmir and the 1990 exodus

- Sumantra Bose, *Kashmir: Roots of Conflict, Paths to Peace* (Harvard University Press, 2003)
- Alexander Evans, “A Departure from History: Kashmiri Pandits, 1990–2001”, *Contemporary South Asia* 11(1), 2002
- Rahul Pandita, *Our Moon Has Blood Clots: The Exodus of the Kashmiri Pandits* (Random House India, 2013), a Kashmiri Pandit’s account

### Historical atlases

- Joseph E. Schwartzberg (ed.), *A Historical Atlas of South Asia* (University of Chicago Press, 1978; 2nd impression 1992)
- Irfan Habib, *An Atlas of the Mughal Empire* (Oxford University Press, Delhi, 1982)

### Primary texts the events draw on

- Ashokan edicts, as edited and translated in Romila Thapar, *Asoka and the Decline of the Mauryas* (Oxford University Press, 1961), and in Sircar (above)
- Xuanzang (Hiuen Tsiang), *Si-Yu-Ki: Buddhist Records of the Western World*, trans. Samuel Beal (1884)
- Al-Biruni, *Alberuni’s India*, trans. Edward C. Sachau (1888)
- Ibn Battuta, *The Travels of Ibn Battuta*, trans. H. A. R. Gibb (Hakluyt Society, 1958–2000)
- Babur, *The Baburnama*, trans. Wheeler M. Thackston (Modern Library, 2002)

## Every event, with the article behind it

75 events in 19 eras.

### 500 BCE · The Mahajanapadas

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| c. 528 BCE | Buddha attains enlightenment | [Bodhi Tree](https://en.wikipedia.org/wiki/Bodhi_Tree) | Thapar, Singh, Sircar |
| c. 518–513 BCE | Achaemenid Persians take the Indus valley | [Hindush](https://en.wikipedia.org/wiki/Hindush) | Thapar, Singh, Sircar |
| c. 483 BCE (traditional) | First Buddhist Council | [First Buddhist council](https://en.wikipedia.org/wiki/First_Buddhist_council) | Thapar, Singh, Sircar |
| c. 5th–4th c. BCE | Panini codifies Sanskrit | [Pāṇini](https://en.wikipedia.org/wiki/P%C4%81%E1%B9%87ini) | Thapar, Singh, Sircar |

### 300 BCE · Rise of the Mauryas

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| 326 BCE | Battle of the Hydaspes | [Battle of the Hydaspes](https://en.wikipedia.org/wiki/Battle_of_the_Hydaspes) | Thapar, Singh, Sircar |
| c. 321 BCE | Chandragupta founds the Maurya dynasty | [Chandragupta Maurya](https://en.wikipedia.org/wiki/Chandragupta_Maurya) | Thapar, Singh, Sircar |
| c. 305 BCE | Treaty with Seleucus Nicator | [Seleucid–Mauryan war](https://en.wikipedia.org/wiki/Seleucid%E2%80%93Mauryan_war) | Thapar, Singh, Sircar |

### 250 BCE · Maurya Empire under Ashoka

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| c. 261 BCE | The Kalinga War | [Kalinga War](https://en.wikipedia.org/wiki/Kalinga_War) | Thapar, Singh, Sircar |
| c. 250 BCE | Ashokan pillars and the Lion Capital | [Lion Capital of Ashoka](https://en.wikipedia.org/wiki/Lion_Capital_of_Ashoka) | Thapar, Singh, Sircar |
| c. 250 BCE | Mahinda takes Buddhism to Sri Lanka | [Mahinda (Buddhist monk)](https://en.wikipedia.org/wiki/Mahinda_(Buddhist_monk)) | Thapar, Singh, Sircar |

### 100 CE · Kushans, Satavahanas & the Roman trade

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| c. 50 | The Periplus describes Indian ports | [Periplus of the Erythraean Sea](https://en.wikipedia.org/wiki/Periplus_of_the_Erythraean_Sea) | Thapar, Singh, Sircar |
| c. 127 | Kanishka's reign begins | [Kanishka](https://en.wikipedia.org/wiki/Kanishka) | Thapar, Singh, Sircar |
| c. 130 | Gautamiputra Satakarni defeats the Shakas | [Gautamiputra Satakarni](https://en.wikipedia.org/wiki/Gautamiputra_Satakarni) | Thapar, Singh, Sircar |
| c. 150 | Junagadh inscription of Rudradaman | [Junagadh rock inscription of Rudradaman](https://en.wikipedia.org/wiki/Junagadh_rock_inscription_of_Rudradaman) | Thapar, Singh, Sircar |

### 400 CE · Gupta Empire

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| c. 400 | The Iron Pillar of Delhi | [Iron pillar of Delhi](https://en.wikipedia.org/wiki/Iron_pillar_of_Delhi) | Thapar, Singh, Sircar |
| c. 399–412 | Fa-Xian travels across India | [Faxian](https://en.wikipedia.org/wiki/Faxian) | Thapar, Singh, Sircar |
| c. 427 | Nalanda mahavihara founded | [Nalanda](https://en.wikipedia.org/wiki/Nalanda) | Thapar, Singh, Sircar |
| 499 | Aryabhata writes the Aryabhatiya | [Aryabhatiya](https://en.wikipedia.org/wiki/Aryabhatiya) | Thapar, Singh, Sircar |

### 500 CE · After the Guptas: Hunas & new kingdoms

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| c. 510 | Hunas under Toramana in central India | [Toramana](https://en.wikipedia.org/wiki/Toramana) | Thapar, Singh, Sircar |
| c. 505 | Varahamihira's Panchasiddhantika | [Pancha-Siddhantika](https://en.wikipedia.org/wiki/Pancha-Siddhantika) | Thapar, Singh, Sircar |
| c. 528 | Yashodharman defeats Mihirakula | [Yashodharman](https://en.wikipedia.org/wiki/Yashodharman) | Thapar, Singh, Sircar |
| c. 543 | Chalukya power founded at Vatapi | [Pulakeshin I](https://en.wikipedia.org/wiki/Pulakeshin_I) | Thapar, Singh, Sircar |

### 640 CE · Harsha, Chalukyas & Pallavas

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| c. 618–634 | Pulakeshin II halts Harsha | [Pulakeshin II](https://en.wikipedia.org/wiki/Pulakeshin_II) | Thapar, Singh, Nilakanta Sastri |
| c. 637–642 | Xuanzang studies at Nalanda | [Xuanzang](https://en.wikipedia.org/wiki/Xuanzang) | Thapar, Singh, Nilakanta Sastri |
| 642 | Pallavas sack Vatapi | [Narasimhavarman I](https://en.wikipedia.org/wiki/Narasimhavarman_I) | Thapar, Singh, Nilakanta Sastri |
| 7th c. | Rock-cut Mahabalipuram | [Group of Monuments at Mahabalipuram](https://en.wikipedia.org/wiki/Group_of_Monuments_at_Mahabalipuram) | Thapar, Singh, Nilakanta Sastri |

### 800 CE · The Tripartite Struggle

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| 711–712 | Arab conquest of Sindh | [Umayyad campaigns in India](https://en.wikipedia.org/wiki/Umayyad_campaigns_in_India) | Thapar, Singh, Nilakanta Sastri |
| c. 756–773 | Kailasa Temple at Ellora | [Kailasa temple, Ellora](https://en.wikipedia.org/wiki/Kailasa_temple,_Ellora) | Thapar, Singh, Nilakanta Sastri |
| c. 788–820 | Adi Shankara | [Adi Shankara](https://en.wikipedia.org/wiki/Adi_Shankara) | Thapar, Singh, Nilakanta Sastri |
| c. 800 | Vikramashila founded | [Vikramashila](https://en.wikipedia.org/wiki/Vikramashila) | Thapar, Singh, Nilakanta Sastri |

### 900 CE · Pratihara zenith & the Chola revival

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| c. 850 | Vijayalaya takes Thanjavur | [Vijayalaya Chola](https://en.wikipedia.org/wiki/Vijayalaya_Chola) | Thapar, Singh, Nilakanta Sastri |
| c. 897 | Aditya I defeats the Pallavas | [Aditya I](https://en.wikipedia.org/wiki/Aditya_I) | Thapar, Singh, Nilakanta Sastri |
| c. 915 | Al-Masudi visits India's west coast | [Al-Masudi](https://en.wikipedia.org/wiki/Al-Masudi) | Thapar, Singh, Nilakanta Sastri |
| c. 916 | Indra III sacks Kannauj | [Indra III](https://en.wikipedia.org/wiki/Indra_III) | Thapar, Singh, Nilakanta Sastri |

### 1030 CE · Chola Empire at its peak

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| 1010 | Brihadisvara Temple completed | [Brihadisvara Temple, Thanjavur](https://en.wikipedia.org/wiki/Brihadisvara_Temple,_Thanjavur) | Thapar, Singh, Nilakanta Sastri |
| 1025 | Gangaikonda Cholapuram founded | [Gangaikonda Cholapuram](https://en.wikipedia.org/wiki/Gangaikonda_Cholapuram) | Thapar, Singh, Nilakanta Sastri |
| 1025–26 | Mahmud of Ghazni raids Somnath | [Somnath temple](https://en.wikipedia.org/wiki/Somnath_temple) | Thapar, Singh, Nilakanta Sastri |
| c. 1030 | Al-Biruni writes on India | [Al-Biruni](https://en.wikipedia.org/wiki/Al-Biruni) | Thapar, Singh, Nilakanta Sastri |

### 1206 CE · Founding of the Delhi Sultanate

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| 1192 | Second Battle of Tarain | [Second Battle of Tarain](https://en.wikipedia.org/wiki/Second_Battle_of_Tarain) | Asher & Talbot, Eaton, Stein |
| c. 1199 | Qutb Minar begun | [Qutb Minar](https://en.wikipedia.org/wiki/Qutb_Minar) | Asher & Talbot, Eaton, Stein |
| c. 1200 | Nalanda sacked | [Bakhtiyar Khalji](https://en.wikipedia.org/wiki/Bakhtiyar_Khalji) | Asher & Talbot, Eaton, Stein |
| 1206 | Delhi Sultanate established | [Delhi Sultanate](https://en.wikipedia.org/wiki/Delhi_Sultanate) | Asher & Talbot, Eaton, Stein |

### 1335 CE · Tughlaqs & the birth of Vijayanagara

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| 1327 | Capital moved to Daulatabad | [Muhammad bin Tughluq](https://en.wikipedia.org/wiki/Muhammad_bin_Tughluq) | Asher & Talbot, Eaton, Stein |
| 1334 | Ibn Battuta reaches Delhi | [Ibn Battuta](https://en.wikipedia.org/wiki/Ibn_Battuta) | Asher & Talbot, Eaton, Stein |
| 1336 | Vijayanagara founded | [Vijayanagara Empire](https://en.wikipedia.org/wiki/Vijayanagara_Empire) | Asher & Talbot, Eaton, Stein |
| 1347 | Bahmani Sultanate breaks away | [Bahmani Sultanate](https://en.wikipedia.org/wiki/Bahmani_Sultanate) | Asher & Talbot, Eaton, Stein |

### 1526 CE · Vijayanagara, Deccan Sultanates & the dawn of the Mughals

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| 1498 | Vasco da Gama reaches Calicut | [Vasco da Gama](https://en.wikipedia.org/wiki/Vasco_da_Gama) | Asher & Talbot, Eaton, Stein |
| 1510 | Portuguese capture Goa | [Afonso de Albuquerque](https://en.wikipedia.org/wiki/Afonso_de_Albuquerque) | Asher & Talbot, Eaton, Stein |
| 1526 | First Battle of Panipat | [First Battle of Panipat](https://en.wikipedia.org/wiki/First_Battle_of_Panipat) | Asher & Talbot, Eaton, Stein |
| 1527 | Battle of Khanwa | [Battle of Khanwa](https://en.wikipedia.org/wiki/Battle_of_Khanwa) | Asher & Talbot, Eaton, Stein |

### 1650 CE · Shah Jahan's empire & the Deccan sultanates

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| 1639 | Fort St George founded at Madras | [Fort St. George, Chennai](https://en.wikipedia.org/wiki/Fort_St._George,_Chennai) | Habib, Asher & Talbot, Stein |
| 1646 | Shivaji captures Torna | [Torna Fort](https://en.wikipedia.org/wiki/Torna_Fort) | Habib, Asher & Talbot, Stein |
| 1648 | Red Fort completed at Shahjahanabad | [Red Fort](https://en.wikipedia.org/wiki/Red_Fort) | Habib, Asher & Talbot, Stein |
| 1658 | War of succession: Battle of Samugarh | [Battle of Samugarh](https://en.wikipedia.org/wiki/Battle_of_Samugarh) | Habib, Asher & Talbot, Stein |

### 1700 CE · Mughal Empire at its largest

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| 1653 | Taj Mahal completed | [Taj Mahal](https://en.wikipedia.org/wiki/Taj_Mahal) | Habib, Asher & Talbot, Stein |
| 1674 | Shivaji crowned Chhatrapati | [Shivaji](https://en.wikipedia.org/wiki/Shivaji) | Habib, Asher & Talbot, Stein |
| 1690 | Calcutta founded | [Job Charnock](https://en.wikipedia.org/wiki/Job_Charnock) | Habib, Asher & Talbot, Stein |
| 1699 | Khalsa founded | [Khalsa](https://en.wikipedia.org/wiki/Khalsa) | Habib, Asher & Talbot, Stein |

### 1783 CE · Marathas, Mysore & the Company

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| 1757 | Battle of Plassey | [Battle of Plassey](https://en.wikipedia.org/wiki/Battle_of_Plassey) | Metcalf & Metcalf, Chandra et al., Guha |
| 1761 | Third Battle of Panipat | [Third Battle of Panipat](https://en.wikipedia.org/wiki/Third_Battle_of_Panipat) | Metcalf & Metcalf, Chandra et al., Guha |
| 1765 | Company obtains the diwani of Bengal | [Treaty of Allahabad](https://en.wikipedia.org/wiki/Treaty_of_Allahabad) | Metcalf & Metcalf, Chandra et al., Guha |
| 1782 | Treaty of Salbai | [Treaty of Salbai](https://en.wikipedia.org/wiki/Treaty_of_Salbai) | Metcalf & Metcalf, Chandra et al., Guha |

### 1900 CE · British Raj

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| 1857 | The Rebellion of 1857 | [Indian Rebellion of 1857](https://en.wikipedia.org/wiki/Indian_Rebellion_of_1857) | Metcalf & Metcalf, Chandra et al., Guha |
| 1885 | Indian National Congress founded | [Indian National Congress](https://en.wikipedia.org/wiki/Indian_National_Congress) | Metcalf & Metcalf, Chandra et al., Guha |
| 1853 | First railway | [History of rail transport in India](https://en.wikipedia.org/wiki/History_of_rail_transport_in_India) | Metcalf & Metcalf, Chandra et al., Guha |
| 1911 | Capital moves to Delhi | [Delhi Durbar](https://en.wikipedia.org/wiki/Delhi_Durbar) | Metcalf & Metcalf, Chandra et al., Guha |

### 1950 CE · Independence & the Republic

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| 15 Aug 1947 | Independence and Partition | [Partition of India](https://en.wikipedia.org/wiki/Partition_of_India) | Metcalf & Metcalf, Chandra et al., Guha |
| 1948 | Hyderabad integrated | [Operation Polo](https://en.wikipedia.org/wiki/Operation_Polo) | Metcalf & Metcalf, Chandra et al., Guha |
| 26 Jan 1950 | The Constitution comes into force | [Constitution of India](https://en.wikipedia.org/wiki/Constitution_of_India) | Metcalf & Metcalf, Chandra et al., Guha |
| 1956 | States Reorganisation | [States Reorganisation Act, 1956](https://en.wikipedia.org/wiki/States_Reorganisation_Act,_1956) | Metcalf & Metcalf, Chandra et al., Guha |

### Today · South Asia today

| Date | Event | Wikipedia article | Where to check |
|---|---|---|---|
| 1971 | Bangladesh Liberation War | [Bangladesh Liberation War](https://en.wikipedia.org/wiki/Bangladesh_Liberation_War) | Guha, Metcalf & Metcalf |
| 1989–90 | Exodus of Kashmiri Pandits | [Exodus of Kashmiri Hindus](https://en.wikipedia.org/wiki/Exodus_of_Kashmiri_Hindus) | Bose, Evans, Pandita |
| 1991 | Economic liberalisation | [Economic liberalisation in India](https://en.wikipedia.org/wiki/Economic_liberalisation_in_India) | Guha, Metcalf & Metcalf |
| 2000 | Three new states formed | [Uttarakhand](https://en.wikipedia.org/wiki/Uttarakhand) | Guha, Metcalf & Metcalf |
| 2014 | Telangana formed | [Andhra Pradesh Reorganisation Act, 2014](https://en.wikipedia.org/wiki/Andhra_Pradesh_Reorganisation_Act,_2014) | Guha, Metcalf & Metcalf |

## Corrections

Found a mistake, or want a source cited more precisely? [Open a correction](https://github.com/kaulvishesh/bharat-itihaas/issues/new?template=data-error.yml) (English or Hindi) and, if you can, name a source. Corrections are made in the open on GitHub.
