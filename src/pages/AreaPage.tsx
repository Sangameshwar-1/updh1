import { ExhibitGrid } from '../components/ExhibitGrid';
import { exhibitsFor } from '../data/exhibits';
import type { Area } from '../data/types';

export default function AreaPage({ area }: { area: Area }) {
  const items = exhibitsFor(area.slug);

  return (
    <article className="area">
      <header className="area-header">
        <p className="section-name">{area.section}</p>
        <h1>{area.title}</h1>
        <p className="lead">{area.blurb}</p>
        <p className="folder-note">
          Media folder <code>{area.folder}</code>
        </p>
      </header>
      <ExhibitGrid items={items} />
    </article>
  );
}
