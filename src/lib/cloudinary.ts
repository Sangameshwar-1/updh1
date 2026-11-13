const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const IMAGE_BASE = `https://res.cloudinary.com/${CLOUD}/image/upload`;
const VIDEO_BASE = `https://res.cloudinary.com/${CLOUD}/video/upload`;

export const WIDTHS = [390, 768, 1024, 1440, 1920];

export type Aspect = '16:9' | '3:2' | '4:3' | '1:1';
export type Crop = 'fit' | 'fill' | 'face';

const cropToken: Record<Crop, string> = {
  fit: 'c_fit',
  fill: 'c_fill,g_auto',
  face: 'c_fill,g_face',
};

export function imageUrl(publicId: string, width: number, aspect: Aspect, crop: Crop = 'fit') {
  const t = ['f_auto', 'q_auto', `w_${width}`, `ar_${aspect}`, cropToken[crop]];
  return `${IMAGE_BASE}/${t.join(',')}/${publicId}`;
}

export function imageSrcSet(publicId: string, aspect: Aspect, crop: Crop = 'fit') {
  return WIDTHS.map((w) => `${imageUrl(publicId, w, aspect, crop)} ${w}w`).join(', ');
}

/** Full-screen viewer. c_limit never upscales past the master file. */
export function zoomUrl(publicId: string) {
  return `${IMAGE_BASE}/f_auto,q_auto,c_limit,w_2400/${publicId}`;
}

export function videoUrl(publicId: string) {
  return `${VIDEO_BASE}/f_auto,q_auto/${publicId}`;
}

/** so_2 pulls the frame at two seconds, which usually clears a title card. */
export function videoPoster(publicId: string) {
  return `${VIDEO_BASE}/so_2,f_auto,q_auto,w_1280/${publicId}.jpg`;
}

export function aspectRatioStyle(aspect: Aspect) {
  return aspect.replace(':', ' / ');
}
