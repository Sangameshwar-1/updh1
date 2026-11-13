import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash, timingSafeEqual } from 'node:crypto';

const FOLDER = /^museum\/[a-z0-9-]+(\/[a-z0-9-]+)?$/;
const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
const MAX_BYTES = 20 * 1024 * 1024;

function isAuthorisedCurator(req: VercelRequest): boolean {
  const expected = process.env.UPLOAD_ACCESS_TOKEN;
  if (!expected) return false;

  const header = req.headers.authorization ?? '';
  const presented = header.startsWith('Bearer ') ? header.slice(7) : '';

  const a = Buffer.from(presented);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Reject anonymous callers before doing any work.
  if (!isAuthorisedCurator(req)) {
    return res.status(401).json({ error: 'Unauthorised' });
  }

  const secret = process.env.CLOUDINARY_API_SECRET;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  if (!secret || !apiKey) {
    return res.status(500).json({ error: 'Upload is not configured' });
  }

  const { folder, contentType, bytes } = (req.body ?? {}) as {
    folder?: string;
    contentType?: string;
    bytes?: number;
  };

  if (!folder || !FOLDER.test(folder)) {
    return res.status(400).json({ error: 'Unknown folder' });
  }
  if (!contentType || !TYPES.includes(contentType)) {
    return res.status(400).json({ error: 'Unsupported file type' });
  }
  if (typeof bytes !== 'number' || bytes <= 0 || bytes > MAX_BYTES) {
    return res.status(400).json({ error: 'File too large' });
  }

  // Cloudinary signs the parameters sorted alphabetically, joined with &,
  // with the secret appended. Here: folder, then timestamp.
  const timestamp = Math.round(Date.now() / 1000);
  const toSign = `folder=${folder}&timestamp=${timestamp}${secret}`;

  return res.status(200).json({
    signature: createHash('sha1').update(toSign).digest('hex'),
    timestamp,
    folder,
    apiKey,
  });
}
