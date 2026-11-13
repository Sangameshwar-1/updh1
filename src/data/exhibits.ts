import type { Exhibit } from './types';

/**
 * Exhibit records transcribed from the Phase 4 label copy. Curators edit this
 * file; no component anywhere writes a public ID of its own.
 *
 * publicId is derived from the folder, so a record and its Cloudinary asset
 * cannot drift apart. Upload each image as <folder>/<id>.
 */
type Record_ = Omit<Exhibit, 'publicId'>;

const inFolder = (folder: string, records: Record_[]): Exhibit[] =>
  records.map((r) => ({ ...r, publicId: `${folder}/${r.id}` }));

export const exhibits: Record<string, Exhibit[]> = {
  'ashokan-edicts': inFolder('museum/zone-1/ashokan-edicts', [
    {
      id: 'ashokan-edict',
      title: 'Ashokan Edict',
      alt: 'A printed photograph of an inscribed stone pillar',
      caption:
        'Ashoka had messages carved on rocks and pillars so that many people could see them. Stone preserved the words, but only some people could read them.',
      credit: 'Printed image, reproduced for this exhibition',
      period: 'Around 3rd century BCE (original)',
    },
  ]),

  'indus-seals': inFolder('museum/zone-1/indus-seals', [
    {
      id: 'indus-seal',
      title: 'Indus Seal',
      alt: 'A clay copy of a small stamp seal with symbols',
      caption:
        'Nobody has yet been able to read the Indus script. We do not know what these symbols say, so we do not claim a meaning.',
      credit: 'Handmade clay replica by the ChronoScribes team, 2026',
      period: 'c. 2600 to 1900 BCE (original)',
    },
  ]),

  'oral-traditions': inFolder('museum/zone-1/oral-traditions', [
    {
      id: 'oral-tradition',
      title: 'Oral Tradition',
      alt: 'An image of people sharing a story or message by speaking',
      caption:
        'Before writing, and long after it, communities kept stories, songs and knowledge alive by telling them aloud and remembering them.',
      credit: 'Printed image, reproduced for this exhibition',
      period: 'A living tradition across many centuries',
    },
  ]),

  'postal-history': inFolder('museum/zone-1/postal-history', [
    {
      id: 'palm-leaf-manuscript',
      title: 'Palm-Leaf Style Manuscript',
      alt: 'Text written by hand on dried leaf',
      caption:
        'Texts were copied by hand, one copy at a time. Each copy took skill and time, and small changes could creep in.',
      credit: 'Replica made by the ChronoScribes team, 2026',
      period: 'The practice of writing on palm leaf is many centuries old',
    },
    {
      id: 'dak-route-map',
      title: 'Dak Route Map',
      alt: 'A map showing postal and courier routes',
      caption:
        'Runners and relay posts carried orders and letters along set routes. Places far from a route received news later or not at all.',
      credit: 'Map reproduced for this exhibition, 2026',
      period: '19th century routes',
    },
    {
      id: 'stamps',
      title: 'Stamps',
      alt: 'Postage stamps, old and recent, laid out in a grid',
      caption:
        'A stamp shows that the sender has paid for a letter to travel. It also shows what images a country chose to put on its mail.',
      credit: 'Collected by the ChronoScribes team',
      period: 'Various years',
    },
    {
      id: 'sample-letter-and-envelope',
      title: 'Sample Letter and Envelope',
      alt: 'A handwritten letter beside its envelope',
      caption:
        'A personal letter could take days or weeks to arrive. Writing, waiting and replying shaped how people kept in touch.',
      credit: 'Prepared for this exhibition, 2026',
      period: '2026',
    },
  ]),

  printing: inFolder('museum/zone-2/printing', [
    {
      id: 'handwritten-and-printed-samples',
      title: 'Handwritten and Printed Text Samples',
      alt: 'The same sentence shown twice, once written by hand and once printed',
      caption:
        'Printing made many identical copies easy. Handwriting varies from one copy to the next. Compare the two.',
      credit: 'Made by the ChronoScribes team, 2026',
      period: 'First printing press in India, Goa, 1556',
    },
  ]),

  newspapers: inFolder('museum/zone-2/newspapers', [
    {
      id: 'hickys-bengal-gazette',
      title: "Hicky's Bengal Gazette",
      alt: 'A printed copy of an early newspaper front page from Calcutta',
      caption:
        'Newspapers let many readers see the same news at once. Only people who could read that language and reach a copy could join in.',
      credit: 'Printout, reproduced for this exhibition',
      period: '1780',
    },
  ]),

  telegraph: inFolder('museum/zone-2/telegraph', [
    {
      id: 'telegraph-diagram',
      title: 'Telegraph Diagram',
      alt: 'A diagram of how a telegraph sends signals along a wire',
      caption:
        'A telegraph operator tapped out coded signals that travelled instantly along wires. It was fast, but it only worked between connected stations.',
      credit: 'Diagram reproduced for this exhibition, 2026',
      period: 'Service began in India in 1851',
    },
    {
      id: 'morse-code-chart',
      title: 'Morse Code Chart',
      alt: 'A chart showing each letter of the alphabet as dots and dashes',
      caption:
        'Morse code turned words into short and long signals so they could travel by wire. You can try it in Crack the Code.',
      credit: 'Reproduced for this exhibition',
      period: '19th century system',
    },
  ]),

  telephone: inFolder('museum/zone-2/telephone', [
    {
      id: 'landline-telephone',
      title: 'Telephone',
      alt: 'An old landline telephone with a rotary dial and handset',
      caption:
        'The telephone carried a live voice. Exchanges connected callers, but a home needed a line, and many homes did not have one.',
      credit: 'Landline model lent for this exhibition',
      period: 'Exchanges began in Indian cities in 1882',
    },
  ]),

  radio: inFolder('museum/zone-3/radio', [
    {
      id: 'radio-model',
      title: 'Radio Model',
      alt: 'A cardboard model of a vintage radio set',
      caption:
        'Radio let one broadcaster speak to many homes at once, including people who could not read.',
      credit: 'Cardboard model made by the ChronoScribes team, 2026',
      period: 'Broadcasting began in India in the 1920s',
    },
  ]),

  television: inFolder('museum/zone-3/television', [
    {
      id: 'television-model',
      title: 'Television Model',
      alt: 'A cardboard model of an early television set',
      caption:
        'Television added moving pictures. Like radio, it mostly sent information one way, from broadcaster to viewer.',
      credit: 'Cardboard model made by the ChronoScribes team, 2026',
      period: 'Experimental television in India began in 1959',
    },
  ]),

  satellites: inFolder('museum/zone-3/satellites', [
    {
      id: 'insat-satellite',
      title: 'INSAT Satellite',
      alt: 'A folded paper model of an Indian communication satellite',
      caption:
        'Satellites help send signals across very large areas, including places that are hard to reach by wire.',
      credit: 'Papercraft model made by the ChronoScribes team, 2026',
      period: 'The INSAT series began in the 1980s',
    },
  ]),

  'digital-networks': inFolder('museum/zone-3/digital-networks', [
    {
      id: 'phone-and-laptop',
      title: 'Phone and Laptop',
      alt: 'A smartphone and a laptop, devices that connect to digital networks',
      caption:
        'These devices can send a message across the world in seconds. They also need data, power and skills that not everyone has equal access to.',
      credit: 'Everyday devices, shown for this exhibition',
      period: 'Public internet service began in India in 1995',
    },
    {
      id: 'network-diagram',
      title: 'Network Diagram',
      alt: 'A diagram showing how devices link through a network',
      caption:
        'Information is broken into small packets that travel through connected networks and are put back together at the other end.',
      credit: 'Diagram reproduced for this exhibition, 2026',
      period: '2026',
    },
    {
      id: 'digital-information-examples',
      title: 'Digital Information Examples',
      alt: 'Printed screenshots of messages, websites and social media posts',
      caption:
        'Anyone can post online. Check who wrote it, when, and whether other reliable sources agree.',
      credit: 'Screenshots taken for this exhibition, 2026',
      period: '2026',
    },
  ]),

  activities: inFolder('museum/zone-4/activities', [
    {
      id: 'decode-the-symbol',
      title: 'Decode the Symbol',
      alt: 'An activity table with the Ashokan edict image, the Indus seal replica and clue cards',
      caption:
        'Look at the Ashokan edict and the Indus seal. Use the clue card to discuss: why would someone carve or stamp a message? Nobody can yet read the Indus script, so we only discuss, we do not translate.',
      credit: 'Team ChronoScribes, 2026',
      period: 'Activity 1',
    },
    {
      id: 'crack-the-code',
      title: 'Crack the Code',
      alt: 'Word cards and a Morse code chart laid out on an activity table',
      caption:
        'Pick a word card (HELP, INDIA or HISTORY). Use the Morse chart to turn it into dots and dashes. Swap with a friend and decode theirs.',
      credit: 'Team ChronoScribes, 2026',
      period: 'Activity 2',
    },
    {
      id: 'which-source-would-you-trust',
      title: 'Which Source Would You Trust?',
      alt: 'Four cards showing the same news from a newspaper, a broadcast, a website and a social media forward',
      caption:
        'You receive the same news from a newspaper, a broadcast, a website and a social media forward. Which would you check first? Look for the source, the date, the evidence and confirmation from other reliable sources.',
      credit: 'Team ChronoScribes, 2026',
      period: 'Activity 3',
    },
    {
      id: 'future-of-communication-wall',
      title: 'Future of Communication Wall',
      alt: "A wall covered in visitors' sticky-note predictions",
      caption:
        'How will people in India communicate in 2050? Write your answer on a sticky note and add it to the wall. Think about who will have access and who might not.',
      credit: 'Team ChronoScribes, 2026',
      period: 'Activity 4',
    },
  ]),

  about: inFolder('museum/about/team', [
    {
      id: 'akula-harsha-vardhan',
      title: 'Akula Harsha Vardhan',
      alt: 'Portrait of Akula Harsha Vardhan',
      caption: 'Team ChronoScribes',
      credit: 'UPDH Course Project',
      period: '2026',
    },
    {
      id: 'santhosh',
      title: 'Santhosh',
      alt: 'Portrait of Santhosh',
      caption: 'Team ChronoScribes',
      credit: 'UPDH Course Project',
      period: '2026',
    },
    {
      id: 'bhanu-prakash',
      title: 'Bhanu Prakash',
      alt: 'Portrait of Bhanu Prakash',
      caption: 'Team ChronoScribes',
      credit: 'UPDH Course Project',
      period: '2026',
    },
    {
      id: 'nikhil-mohan-chowdary',
      title: 'Nikhil Mohan Chowdary',
      alt: 'Portrait of Nikhil Mohan Chowdary',
      caption: 'Team ChronoScribes',
      credit: 'UPDH Course Project',
      period: '2026',
    },
    {
      id: 'sangameshwar',
      title: 'Sangameshwar',
      alt: 'Portrait of Sangameshwar',
      caption: 'Team ChronoScribes',
      credit: 'UPDH Course Project',
      period: '2026',
    },
  ]),

  gallery: [],
};

export function exhibitsFor(slug: string): Exhibit[] {
  return exhibits[slug] ?? [];
}
