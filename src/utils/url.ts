export const BASE: string = import.meta.env.BASE_URL.replace(/\/$/, '');
export const asset = (path: string): string => `${BASE}${path.startsWith('/') ? path : '/' + path}`;
