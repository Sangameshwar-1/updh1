import type { Area, Zone } from './types';

const area = (
  zoneId: string,
  slug: string,
  title: string,
  section: string,
  blurb: string,
): Area => ({
  slug,
  title,
  section,
  blurb,
  folder: `museum/${zoneId}/${slug}`,
  route: `/${zoneId}/${slug}`,
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
      ),
      area(
        'zone-1',
        'indus-seals',
        'Indus Seals',
        'Before the Written Message',
        'Symbols scholars have not been able to decipher. We do not claim a meaning.',
      ),
      area(
        'zone-1',
        'oral-traditions',
        'Oral Traditions',
        'Before the Written Message',
        'Knowledge kept alive by telling it aloud and remembering it.',
      ),
      area(
        'zone-1',
        'postal-history',
        'Postal History',
        'Messages on the Move',
        'Runners, relay posts and dak routes. Every message still depended on a person carrying it.',
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
      ),
      area(
        'zone-2',
        'newspapers',
        'Newspapers',
        'One Message, Many Readers',
        "Hicky's Bengal Gazette began publication in Calcutta in 1780.",
      ),
      area(
        'zone-2',
        'telegraph',
        'Telegraph',
        'Signals Across Distance',
        'Telegraph service began in India in 1851. For the first time a message could outrun a person.',
      ),
      area(
        'zone-2',
        'telephone',
        'Telephone',
        'Signals Across Distance',
        'Telephone exchanges began in Indian cities in 1882, carrying a live human voice.',
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
      ),
      area(
        'zone-3',
        'television',
        'Television',
        'Broadcasting to Large Audiences',
        'Experimental television broadcasting began in India in 1959.',
      ),
      area(
        'zone-3',
        'satellites',
        'Satellites',
        'Broadcasting to Large Audiences',
        "India's INSAT series began in the 1980s, carrying signals across very large areas.",
      ),
      area(
        'zone-3',
        'digital-networks',
        'Digital Networks',
        "Networks in Everyone's Hands",
        'Public internet service began in India in 1995. Speed, however, is not truth.',
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
  },
  {
    slug: 'gallery',
    title: 'Gallery',
    section: 'Gallery',
    blurb: 'Highlights from every zone, in full screen.',
    folder: 'museum/gallery',
    route: '/gallery',
  },
];

export const allAreas: Area[] = [...zones.flatMap((z) => z.areas), ...standaloneAreas];

export function findArea(route: string): Area | undefined {
  return allAreas.find((a) => a.route === route);
}

export const HOME_FOLDER = 'museum/home';
