import { Link } from 'react-router-dom';
import { ExhibitGrid } from '../components/ExhibitGrid';
import { ExternalLinksSection } from '../components/ExternalLinksSection';
import { exhibitsFor } from '../data/exhibits';
import type { Area } from '../data/types';
// Holds .tt-promo as well as the activity's own styles; Zone 4 is the only
// place either is used.
import '../styles/truth-test.css';

export default function AreaPage({ area }: { area: Area }) {
  const items = exhibitsFor(area.slug);

  return (
    <div className="wrap">
      <article className="area">
        <header className="area-header" data-reveal>
          <Link to="/" className="back-link">
            ← All zones
          </Link>
          <p className="eyebrow">{area.section}</p>
          <h1>{area.title}</h1>
          <p className="lead">{area.blurb}</p>
          <p className="folder-note">
            Media folder <code>{area.folder}</code>
          </p>
        </header>

        {/* Three of the Zone 4 activities happen at a table. This one happens on
            a screen, so it gets a door rather than a label. */}
        {area.slug === 'activities' && (
          <Link to="/zone-4/truth-test" className="tt-promo" data-reveal>
            <span className="eyebrow">Activity 3 · On screen</span>
            <strong>The Truth Test — can you trust this post?</strong>
            <span className="tt-promo-body">
              Ten items from a feed: forwards, a satellite photograph, a headline, a government
              notice. Decide what each one is before you are told. Eight are documented cases with
              published fact-checks; two are demonstrations, and they say so.
            </span>
            <span className="tt-promo-go">Start the challenge →</span>
          </Link>
        )}

        <ExhibitGrid items={items} />

        {area.externalLinks && area.externalLinks.length > 0 && (
          <ExternalLinksSection
            links={area.externalLinks}
            title={`${area.title} — Reference Archives`}
            eyebrow="Further Exploration"
            description="Explore authentic historical records, scholarly encyclopedias, and museum archives related to this exhibit."
          />
        )}
      </article>
    </div>
  );
}
