import { videoUrl, videoPoster } from '../lib/cloudinary';

type Props = {
  publicId: string;
  title: string;
  className?: string;
};

/** Archival recordings: always postered, never autoplaying with sound. */
export function CloudinaryVideo({ publicId, title, className }: Props) {
  return (
    <video
      className={className}
      controls
      preload="none"
      playsInline
      poster={videoPoster(publicId)}
      title={title}
    >
      <source src={`${videoUrl(publicId)}.webm`} type="video/webm" />
      <source src={`${videoUrl(publicId)}.mp4`} type="video/mp4" />
      Your browser cannot play this recording.
    </video>
  );
}
