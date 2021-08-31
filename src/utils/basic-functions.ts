// Add small functions you use as utils here

export function cleanUrl(path = '', cleanParams = false): string {
  if (!path) return '';
  if (cleanParams) path = path?.split('?')[0];
  if (path === '/') return '/';
  return path.replace(/\/$/, '').replace(/^\//, '') || '';
}
