import type { Area, ExternalLink, Zone } from './types';

const area = (
  zoneId: string,
  slug: string,
  title: string,
  section: string,
  blurb: string,
  externalLinks: ExternalLink[] = [],
): Area => ({
  slug,
  title,
  section,
  blurb,
  folder: `museum/${zoneId}/${slug}`,
  route: `/${zoneId}/${slug}`,
  externalLinks,
});

export const EXHIBITION_TITLE = 'From Stone to Smartphone';
export const EXHIBITION_SUBTITLE = 'How Information Has Travelled Across India';

export const zones: Zone[] = [
  {
    id: 'zone-1',
    title: 'Early Communication',
    blurb: 'Speech, carved stone, and messages carried by hand.',
    areas: [
      area(
        'zone-1',
        'ashokan-edicts',
        'Ashokan Edicts',
        'Before the Written Message',
        'Stone made a message public, fixed and long-lasting. It was the ruler who chose what was written.',
        [
          {
            title: 'Edicts of Ashoka — Comprehensive Overview',
            url: 'https://en.wikipedia.org/wiki/Edicts_of_Ashoka',
            source: 'Wikipedia',
            description:
              'In-depth documentation of the 33 inscriptions carved on pillars, boulders, and cave walls across the subcontinent by Emperor Ashoka.',
          },
          {
            title: 'Archaeological Survey of India — Ashokan Monuments',
            url: 'https://asi.nic.in/',
            source: 'Archaeological Survey of India',
            description:
              'Official conservation records, monument protection surveys, and epigraphical reports of Ashokan edict sites.',
          },
          {
            title: 'British Museum — Ashokan Inscriptions & Epigraphy',
            url: 'https://www.britishmuseum.org/collection/term/BIOG14828',
            source: 'British Museum',
            description:
              'Scholarly collection notes analyzing the decipherment of the Brahmi and Kharosthi scripts on Mauryan stone columns.',
          },
        ],
      ),
      area(
        'zone-1',
        'indus-seals',
        'Indus Seals',
        'Before the Written Message',
        'Symbols scholars have not been able to decipher. We do not claim a meaning.',
        [
          {
            title: 'Indus Script & Harappan Seals',
            url: 'https://en.wikipedia.org/wiki/Indus_script',
            source: 'Wikipedia',
            description:
              'Analysis of the corpus of Indus symbols, seal manufacture techniques, and scholarly attempts at decipherment.',
          },
          {
            title: 'Harappa.com — Ancient Indus Seals & Inscriptions Archive',
            url: 'https://www.harappa.com/category/slide-subject/seals',
            source: 'Harappa.com',
            description:
              'Over 4,000 photographic slides and detailed archaeological field reports documenting steatite seals and impressions.',
          },
          {
            title: 'National Museum New Delhi — Harappan Gallery',
            url: 'https://nationalmuseumindia.gov.in/',
            source: 'National Museum of India',
            description:
              'The premier national collection of Indus Valley civilization artifacts, including famous stamp seals, terracotta tablets, and pottery.',
          },
        ],
      ),
      area(
        'zone-1',
        'oral-traditions',
        'Oral Traditions',
        'Before the Written Message',
        'Knowledge kept alive by telling it aloud and remembering it.',
        [
          {
            title: 'Oral Tradition in Indian Culture',
            url: 'https://en.wikipedia.org/wiki/Oral_tradition',
            source: 'Wikipedia',
            description:
              'How human knowledge, epics, laws, and cultural values were memorized, preserved, and recited verbatim across millennia.',
          },
          {
            title: 'UNESCO — Masterpiece of the Oral and Intangible Heritage',
            url: 'https://ich.unesco.org/en/RL/tradition-of-vedic-chanting-00062',
            source: 'UNESCO',
            description:
              'UNESCO recognition of the Tradition of Vedic Chanting as an intangible cultural heritage preserved without textual drift.',
          },
          {
            title: 'Sahapedia — Performance & Storytelling Heritage',
            url: 'https://www.sahapedia.org/',
            source: 'Sahapedia',
            description:
              'Open online multimedia encyclopedia exploring Indian oral folklore, Burrakatha, Chitrakathi scroll narration, and living traditions.',
          },
        ],
      ),
      area(
        'zone-1',
        'postal-history',
        'Postal History',
        'Messages on the Move',
        'Runners, relay posts and dak routes. Every message still depended on a person carrying it.',
        [
          {
            title: 'Postal History of India — Mauryan Couriers to India Post',
            url: 'https://en.wikipedia.org/wiki/Postal_history_of_India',
            source: 'Wikipedia',
            description:
              'From Sher Shah Suri’s post stations and the imperial Dak runners to the 1854 postage stamp and modern courier networks.',
          },
          {
            title: 'India Post — National Postal Heritage',
            url: 'https://www.indiapost.gov.in/',
            source: 'India Post',
            description:
              'Official history and operational chronicles of the world’s largest postal network with over 155,000 post offices.',
          },
          {
            title: 'National Philatelic Museum New Delhi',
            url: 'https://www.indiapost.gov.in/VAS/Pages/Content/NationalPhilatelicMuseum.aspx',
            source: 'Philatelic Museum',
            description:
              'Rare stamp issues, Scinde Dawk postal markers, historical mail-runner equipment, and post route cartography.',
          },
        ],
      ),
    ],
  },
  {
    id: 'zone-2',
    title: 'Print and Electric Signals',
    blurb: 'The same words copied a thousand times, then words that outran the messenger.',
    areas: [
      area(
        'zone-2',
        'printing',
        'Printing',
        'One Message, Many Readers',
        'The first printing press in India was set up in Goa in 1556.',
        [
          {
            title: 'Printing in India — History & Evolution',
            url: 'https://en.wikipedia.org/wiki/Printing_in_India',
            source: 'Wikipedia',
            description:
              'The introduction of moveable metal type in Goa in 1556, early regional language presses in Tranquebar and Serampore, and literary dissemination.',
          },
          {
            title: 'Encyclopaedia Britannica — The Printing Press',
            url: 'https://www.britannica.com/technology/printing-press',
            source: 'Encyclopaedia Britannica',
            description:
              'Technical and cultural history of printing presses from Gutenberg’s screw press to steam-powered cylinder machines.',
          },
          {
            title: 'National Library of India — Early Printed Imprints',
            url: 'https://www.nationallibrary.gov.in/',
            source: 'National Library of India',
            description:
              'Repository of early 16th to 19th-century publications, vernacular translations, and typographical records.',
          },
        ],
      ),
      area(
        'zone-2',
        'newspapers',
        'Newspapers',
        'One Message, Many Readers',
        "Hicky's Bengal Gazette began publication in Calcutta in 1780.",
        [
          {
            title: "Hicky's Bengal Gazette — India's First Newspaper",
            url: 'https://en.wikipedia.org/wiki/Hicky%27s_Bengal_Gazette',
            source: 'Wikipedia',
            description:
              'The pioneering two-sheet English weekly launched by James Augustus Hicky on 29 January 1780 in Calcutta.',
          },
          {
            title: 'Press Council of India — History of the Free Press',
            url: 'https://presscouncil.nic.in/',
            source: 'Press Council of India',
            description:
              'The evolutionary history of Indian newsprint journalism, freedom of expression, and editorial independence.',
          },
          {
            title: 'British Library — Early South Asian Newspapers',
            url: 'https://www.bl.uk/collection-guides/early-indian-newspapers',
            source: 'British Library',
            description:
              'Digital archive containing microfilms and scans of 18th-century newspapers and early provincial gazettes.',
          },
        ],
      ),
      area(
        'zone-2',
        'telegraph',
        'Telegraph',
        'Signals Across Distance',
        'Telegraph service began in India in 1851. For the first time a message could outrun a person.',
        [
          {
            title: 'Telegraphy in India — 1850 to 2013',
            url: 'https://en.wikipedia.org/wiki/Telegraphy_in_India',
            source: 'Wikipedia',
            description:
              'William O’Shaughnessy’s trial wire from Calcutta to Diamond Harbour in 1850, military telegraphs, Morse code, and the final telegram in 2013.',
          },
          {
            title: 'Science Museum Group — Electric Telegraph Innovation',
            url: 'https://collection.sciencemuseumgroup.org.uk/objects/co40487/cooke-and-wheatstone-five-needle-telegraph-electric-telegraph',
            source: 'Science Museum',
            description:
              'Historical artifacts illustrating needle telegraphs, sounders, and the principles of electrical signal transmission.',
          },
          {
            title: 'BSNL — Indian Telecom Heritage Archives',
            url: 'https://www.bsnl.co.in/',
            source: 'BSNL Heritage',
            description:
              'Retrospective chronicles of the telegraph lines that spanned British and post-independence India over 163 years.',
          },
        ],
      ),
      area(
        'zone-2',
        'telephone',
        'Telephone',
        'Signals Across Distance',
        'Telephone exchanges began in Indian cities in 1882, carrying a live human voice.',
        [
          {
            title: 'Telecommunications in India — Voice & Networks',
            url: 'https://en.wikipedia.org/wiki/Telecommunications_in_India',
            source: 'Wikipedia',
            description:
              'The Oriental Telephone Company establishing exchanges in Bombay, Calcutta, and Madras in 1882, rotary dialing, and trunk lines.',
          },
          {
            title: 'Department of Telecommunications (DoT) — National Timeline',
            url: 'https://dot.gov.in/',
            source: 'Ministry of Communications',
            description:
              'Government chronicles detailing the expansion of rural telephony, STD/ISD public call offices, and digital switching.',
          },
          {
            title: 'Museum of Communication — Historic Telephony Collections',
            url: 'https://www.museumofcommunication.org/',
            source: 'Museum of Communication',
            description:
              'Interactive exhibits displaying manual plugboards, electromagnetic relays, and vintage magneto hand-crank phones.',
          },
        ],
      ),
    ],
  },
  {
    id: 'zone-3',
    title: 'Mass and Digital Communication',
    blurb: 'One voice reaching millions, then everyone able to send at once.',
    areas: [
      area(
        'zone-3',
        'radio',
        'Radio',
        'Broadcasting to Large Audiences',
        'Radio broadcasting began in India in the 1920s, reaching people who could not read.',
        [
          {
            title: 'All India Radio (Akashvani) — Historical Growth',
            url: 'https://en.wikipedia.org/wiki/All_India_Radio',
            source: 'Wikipedia',
            description:
              'From the 1923 Radio Club of Bombay to the creation of AIR in 1936 by Lionel Fielden and the largest radio network in the world.',
          },
          {
            title: 'Prasar Bharati — Akashvani Sound Archives',
            url: 'https://prasarbharati.gov.in/air-history/',
            source: 'Prasar Bharati',
            description:
              'Historic audio recordings, Jawaharlal Nehru’s Tryst with Destiny, Mahatma Gandhi’s sole radio address, and cultural broadcasts.',
          },
          {
            title: 'Radio Heritage Foundation — Early Asian Radio Chronology',
            url: 'https://www.radioheritage.com/',
            source: 'Radio Heritage Foundation',
            description:
              'Technical and social history of mediumwave and shortwave broadcasting throughout 20th-century India.',
          },
        ],
      ),
      area(
        'zone-3',
        'television',
        'Television',
        'Broadcasting to Large Audiences',
        'Experimental television broadcasting began in India in 1959.',
        [
          {
            title: 'Doordarshan — Public Service Television in India',
            url: 'https://en.wikipedia.org/wiki/Doordarshan',
            source: 'Wikipedia',
            description:
              '1959 Delhi experimental broadcasts, Krishi Darshan (1967), the 1975 SITE satellite project, and the introduction of color TV in 1982.',
          },
          {
            title: 'Prasar Bharati — Evolution of Doordarshan',
            url: 'https://prasarbharati.gov.in/doordarshan/',
            source: 'Prasar Bharati',
            description:
              'Official history of DD National, community viewing sets in rural villages, and milestone programming like Ramayan and Mahabharat.',
          },
          {
            title: 'NFDC — National Film & Broadcast Archives',
            url: 'https://www.nfdcindia.com/',
            source: 'National Film Development Corporation',
            description:
              'Preservation of early Indian television master recordings, documentaries, and audiovisual cultural treasures.',
          },
        ],
      ),
      area(
        'zone-3',
        'satellites',
        'Satellites',
        'Broadcasting to Large Audiences',
        "India's INSAT series began in the 1980s, carrying signals across very large areas.",
        [
          {
            title: 'INSAT — Indian National Satellite System',
            url: 'https://en.wikipedia.org/wiki/Indian_National_Satellite_System',
            source: 'Wikipedia',
            description:
              'Joint ISRO-DoT multipurpose geostationary satellites combining telecommunications, TV broadcasting, search and rescue, and meteorology.',
          },
          {
            title: 'ISRO Official — Communication Satellites Archive',
            url: 'https://www.isro.gov.in/INSAT_Series.html',
            source: 'ISRO',
            description:
              'Technical mission profiles of INSAT-1, INSAT-2, GSAT series, transponder payloads, and launch vehicle integration.',
          },
          {
            title: 'Space Applications Centre (SAC) — Societal Missions',
            url: 'https://www.sac.gov.in/',
            source: 'Space Applications Centre',
            description:
              'How ISRO satellites connected remote hospitals with telemedicine and brought satellite distance education (EDUSAT) to rural classrooms.',
          },
        ],
      ),
      area(
        'zone-3',
        'digital-networks',
        'Digital Networks',
        "Networks in Everyone's Hands",
        'Public internet service began in India in 1995. Speed, however, is not truth.',
        [
          {
            title: 'Internet in India — 1995 to the Digital Era',
            url: 'https://en.wikipedia.org/wiki/Internet_in_India',
            source: 'Wikipedia',
            description:
              'VSNL launching public dial-up internet on 15 August 1995, optical fiber networks, 4G/5G mobile penetration, and UPI.',
          },
          {
            title: 'Wikipedia — Neutral Point of View Policy',
            url: 'https://en.wikipedia.org/wiki/Wikipedia:Neutral_point_of_view',
            source: 'Wikipedia',
            description:
              'Wikipedia’s fundamental editorial standard: representing all significant viewpoints fairly, proportionately, and without bias.',
          },
          {
            title: 'Internet Archive (Wayback Machine)',
            url: 'https://archive.org/',
            source: 'Internet Archive',
            description:
              'Global non-profit digital library preserving billions of historical web captures, digital books, and multimedia records.',
          },
        ],
      ),
    ],
  },
  {
    id: 'zone-4',
    title: 'Interactive Activities',
    blurb: 'Four activities. Decode, crack, judge and predict.',
    areas: [
      area(
        'zone-4',
        'activities',
        'Activities',
        'Interactive Activities',
        'Try the symbols, the code, the sources and the 2050 wall.',
        [
          {
            title: 'Media Literacy — Evaluating Information Veracity',
            url: 'https://en.wikipedia.org/wiki/Media_literacy',
            source: 'Wikipedia',
            description:
              'Core competencies for accessing, critically analyzing, and creating messages across print, broadcast, and digital networks.',
          },
          {
            title: 'UNESCO — Media and Information Literacy (MIL)',
            url: 'https://www.unesco.org/en/communication-information/media-information-literacy',
            source: 'UNESCO',
            description:
              'Global educational guidelines empowering citizens to discern fact from disinformation in online feeds.',
          },
          {
            title: 'International Fact-Checking Network (IFCN)',
            url: 'https://www.poynter.org/ifcn/',
            source: 'Poynter Institute',
            description:
              'The worldwide alliance of verified fact-checkers committed to nonpartisanship, transparency of sources, and corrections.',
          },
        ],
      ),
    ],
  },
];

export const standaloneAreas: Area[] = [
  {
    slug: 'about',
    title: 'About',
    section: 'About',
    blurb: 'Team ChronoScribes, UPDH Course Project.',
    folder: 'museum/about/team',
    route: '/about',
    externalLinks: [
      {
        title: 'Digital Humanities — Intersection of Tech and Culture',
        url: 'https://en.wikipedia.org/wiki/Digital_humanities',
        source: 'Wikipedia',
        description:
          'Methodologies bridging digital tools, computational analysis, and historical inquiry in modern academic curricula.',
      },
      {
        title: 'Creative Commons — Sharing Culture and Knowledge',
        url: 'https://creativecommons.org/',
        source: 'Creative Commons',
        description:
          'Global licensing frameworks empowering open access to historical artifacts, educational content, and cultural heritage.',
      },
    ],
  },
  {
    slug: 'gallery',
    title: 'Gallery',
    section: 'Gallery',
    blurb: 'Highlights from every zone, in full screen.',
    folder: 'museum/gallery',
    route: '/gallery',
    externalLinks: [
      {
        title: 'Wikimedia Commons — Indian Cultural Heritage',
        url: 'https://commons.wikimedia.org/wiki/Category:Cultural_heritage_monuments_in_India',
        source: 'Wikimedia Commons',
        description:
          'Freely licensed database of photographs, diagrams, and historical scans of archaeological and museum collections across India.',
      },
      {
        title: 'Google Arts & Culture — Wonders of India',
        url: 'https://artsandculture.google.com/project/cultural-india',
        source: 'Google Arts & Culture',
        description:
          'High-resolution virtual tours, gigapixel artifact scans, and curated exhibitions with India’s leading cultural institutions.',
      },
    ],
  },
];

export const allAreas: Area[] = [...zones.flatMap((z) => z.areas), ...standaloneAreas];

export function findArea(route: string): Area | undefined {
  return allAreas.find((a) => a.route === route);
}

export const HOME_FOLDER = 'museum/home';
