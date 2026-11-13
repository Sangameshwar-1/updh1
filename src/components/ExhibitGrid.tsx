import { useState } from 'react';
import { CloudinaryImage } from './CloudinaryImage';
import { Lightbox } from './Lightbox';
import type { Exhibit } from '../data/types';

export function ExhibitGrid({ items }: { items: Exhibit[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (items.length === 0) {
    return <p className="empty">No exhibits have been published in this area yet.</p>;
  }

  const current = open !== null ? items[open] : undefined;

  return (
    <>
      <ul className="exhibit-grid">
        {items.map((e, i) => (
          <li key={e.id}>
            <figure>
              <button
                className="exhibit-button"
                onClick={() => setOpen(i)}
                aria-label={`View ${e.title} full screen`}
              >
                <CloudinaryImage
                  publicId={e.publicId}
                  alt={e.alt}
                  aspect={e.aspect ?? '4:3'}
                  crop={e.crop ?? 'limit'}
                  sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              </button>
              <figcaption>
                <span className="exhibit-title">{e.title}</span>
                <span className="exhibit-period">{e.period}</span>
                <p className="exhibit-caption">{e.caption}</p>
                <cite>{e.credit}</cite>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {open !== null && current && (
        <Lightbox
          publicId={current.publicId}
          alt={current.alt}
          caption={`${current.title}, ${current.period}. ${current.credit}`}
          onClose={() => setOpen(null)}
          onPrev={open > 0 ? () => setOpen(open - 1) : undefined}
          onNext={open < items.length - 1 ? () => setOpen(open + 1) : undefined}
        />
      )}
    </>
  );
}
