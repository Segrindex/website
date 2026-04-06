const SECRET = import.meta.env.VITE_ACCESS_SECRET || '';

export function generateAccessToken(expiryHours = 168): string {
  const exp = Date.now() + expiryHours * 60 * 60 * 1000;
  return btoa(`${SECRET}|${exp}`);
}

export function validateToken(token: string): boolean {
  try {
    const decoded = atob(token);
    const [secret, expStr] = decoded.split('|');
    if (secret !== SECRET) return false;
    const exp = parseInt(expStr, 10);
    return !isNaN(exp) && Date.now() < exp;
  } catch {
    return false;
  }
}

export function buildAccessLink(token: string): string {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('access', token);
  return url.toString();
}

const SESSION_KEY = 'segri_access_granted';

export function checkSessionAccess(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function grantSessionAccess(): void {
  sessionStorage.setItem(SESSION_KEY, 'true');
}
