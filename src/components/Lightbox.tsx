import { useEffect, useState } from 'react';
import { zoomUrl } from '../lib/cloudinary';

type Props = {
  publicId: string;
  alt: string;
  caption?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

export function Lightbox({ publicId, alt, caption, onClose, onPrev, onNext }: Props) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'ArrowRight') onNext?.();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close viewer">
        &times;
      </button>

      {onPrev && (
        <button
          className="lightbox-prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
        >
          &#8249;
        </button>
      )}

      {onNext && (
        <button
          className="lightbox-next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
        >
          &#8250;
        </button>
      )}

      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        {/* Requested only once the viewer opens, never preloaded behind a thumbnail. */}
        <img
          src={zoomUrl(publicId)}
          alt={alt}
          className={zoomed ? 'lightbox-img is-zoomed' : 'lightbox-img'}
          onClick={() => setZoomed((z) => !z)}
        />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </div>
  );
}
