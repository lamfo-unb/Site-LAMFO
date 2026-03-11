import { cookies } from 'next/headers';
import { AuthUser } from './api-types';

const COOKIE_NAME = 'lamfo_token';

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || null;
}

export function decodeJwtPayload(token: string): AuthUser | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      name: payload.name,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = await getToken();
  if (!token) return null;
  return decodeJwtPayload(token);
}
