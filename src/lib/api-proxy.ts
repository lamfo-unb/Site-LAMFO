import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function proxyToApi(
  request: NextRequest,
  path: string,
  method: string = 'GET'
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('lamfo_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const fetchOptions: RequestInit = { method, headers };

  if (method !== 'GET' && method !== 'DELETE') {
    try {
      const body = await request.json();
      fetchOptions.body = JSON.stringify(body);
    } catch {
      // No body
    }
  }

  try {
    const res = await fetch(`${API_URL}/api${path}`, fetchOptions);
    const data = await res.json().catch(() => ({}));

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Erro ao conectar com a API' }, { status: 502 });
  }
}
