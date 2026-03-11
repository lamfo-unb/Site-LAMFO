import { NextRequest, NextResponse } from 'next/server';
import { loginApi } from '@/lib/api-client';
import { decodeJwtPayload } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const result = await loginApi(email, password);
    const user = decodeJwtPayload(result.access_token);

    const response = NextResponse.json({ user });

    response.cookies.set('lamfo_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Credenciais inválidas' },
      { status: 401 }
    );
  }
}
