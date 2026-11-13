import { useState } from 'react';
import {
  imageUrl,
  imageSrcSet,
  aspectRatioStyle,
  type Aspect,
  type Crop,
} from '../lib/cloudinary';

type Props = {
  publicId: string;
  alt: string;
  aspect?: Aspect;
  crop?: Crop;
  /** Set only on the one image visible before any scrolling. */
  priority?: boolean;
  sizes?: string;
  className?: string;
  onClick?: () => void;
};

export function CloudinaryImage({
  publicId,
  alt,
  aspect = '4:3',
  crop = 'limit',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className,
  onClick,
}: Props) {
  const [failed, setFailed] = useState(false);

  // react-dom 18 does not know the camelCase `fetchPriority` prop and warns on
  // it, though @types/react accepts it. The all-lowercase attribute passes
  // straight through to the DOM instead.
  const priorityAttr: Record<string, string> = priority ? { fetchpriority: 'high' } : {};

  if (failed) {
    return (
      <div
        className={['media-fallback', className].filter(Boolean).join(' ')}
        style={{ aspectRatio: aspectRatioStyle(aspect) }}
        role="img"
        aria-label={alt}
      >
        <span>Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl(publicId, 1024, aspect, crop)}
      srcSet={imageSrcSet(publicId, aspect, crop)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...priorityAttr}
      onError={() => setFailed(true)}
      onClick={onClick}
      className={className}
      style={{
        aspectRatio: aspectRatioStyle(aspect),
        // c_limit may return an image narrower than its declared box, so letterbox
        // it rather than stretching the exhibit out of proportion.
        objectFit: crop === 'limit' ? 'contain' : 'cover',
      }}
    />
  );
}
