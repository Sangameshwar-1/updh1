import { Link } from 'react-router-dom';
import { ExhibitGrid } from '../components/ExhibitGrid';
import { exhibits, exhibitsFor } from '../data/exhibits';
import { zones } from '../data/zones';

export default function Gallery() {
  const curated = exhibitsFor('gallery');
  const everything = zones.flatMap((z) => z.areas).flatMap((a) => exhibits[a.slug] ?? []);
  const items = curated.length > 0 ? curated : everything;

  return (
    <div className="wrap">
      <article className="gallery">
        <header className="area-header" data-reveal>
          <Link to="/" className="back-link">
            ← All zones
          </Link>
          <p className="eyebrow">Every zone</p>
          <h1>Gallery</h1>
          <p className="lead">
            {items.length} objects from across the exhibition. Select any image to open
            it full screen, then click again to zoom.
          </p>
        </header>
        <ExhibitGrid items={items} />
      </article>
    </div>
  );
}
