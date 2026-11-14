import type { Aspect, Crop } from '../lib/cloudinary';

export type ExternalLink = {
  title: string;
  url: string;
  source: string;
  description?: string;
};

export type Exhibit = {
  id: string;
  /** Full Cloudinary public ID, e.g. museum/zone-2/telegraph/morse-key-1890 */
  publicId: string;
  title: string;
  /** Described for a screen reader, not a repeat of the title. */
  alt: string;
  caption: string;
  /** Collection or photographer, as required by the lender. */
  credit: string;
  /** Display text, e.g. "c. 1890". */
  period: string;
  aspect?: Aspect;
  crop?: Crop;
};

export type Area = {
  slug: string;
  title: string;
  /** The exhibition section this area sits in, e.g. "Signals Across Distance". */
  section: string;
  blurb: string;
  /** Cloudinary folder. The route is derived from it, so the two cannot drift. */
  folder: string;
  route: string;
  externalLinks?: ExternalLink[];
};

export type Zone = {
  id: string;
  title: string;
  blurb: string;
  areas: Area[];
};
