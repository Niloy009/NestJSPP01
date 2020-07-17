import { randomBytes } from 'crypto';

export function slugify(text: string, isUnique = false) {
  const random = randomBytes(4).toString('hex');
  const slug = text
    .toLowerCase()
    .split(' ')
    .join('-');
  return isUnique ? `${slug}-${random}` : slug;
}
