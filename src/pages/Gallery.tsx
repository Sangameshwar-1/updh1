import { ExhibitGrid } from '../components/ExhibitGrid';
import { exhibits, exhibitsFor } from '../data/exhibits';
import { zones } from '../data/zones';

export default function Gallery() {
  const curated = exhibitsFor('gallery');
  const everything = zones.flatMap((z) => z.areas).flatMap((a) => exhibits[a.slug] ?? []);
  const items = curated.length > 0 ? curated : everything;

  return (
    <article className="gallery">
      <header className="area-header">
        <h1>Gallery</h1>
        <p className="lead">
          Highlights from every zone. Select any image to open it full screen.
        </p>
      </header>
      <ExhibitGrid items={items} />
    </article>
  );
}
