import { NextRequest } from 'next/server';
import { proxyToApi } from '@/lib/api-proxy';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyToApi(request, `/projects/${id}`, 'PATCH');
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyToApi(request, `/projects/${id}`, 'DELETE');
}
