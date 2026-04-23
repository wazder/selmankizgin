export const BASE: string = import.meta.env.BASE_URL.replace(/\/$/, '');
export const asset = (path: string): string =>
  /^https?:\/\//.test(path) ? path : `${BASE}${path.startsWith('/') ? path : '/' + path}`;
