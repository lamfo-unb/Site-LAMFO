import { NextRequest } from 'next/server';
import { proxyToApi } from '@/lib/api-proxy';

export async function GET(request: NextRequest) {
  return proxyToApi(request, '/projects', 'GET');
}

export async function POST(request: NextRequest) {
  return proxyToApi(request, '/projects', 'POST');
}
