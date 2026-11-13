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
                  crop={e.crop ?? 'fit'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </button>
              <figcaption>
                <strong>{e.title}</strong>, {e.period}. {e.caption}{' '}
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
