import { ApiCargo, ApiMember, ApiProject, ApiWorkshop } from './api-types';

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}/api${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}

// ========== Cargos ==========
export async function fetchCargos(): Promise<ApiCargo[]> {
  return apiFetch<ApiCargo[]>('/cargos');
}

export async function createCargo(token: string, data: { name: string }): Promise<ApiCargo> {
  return apiFetch<ApiCargo>('/cargos', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function updateCargo(token: string, id: string, data: { name: string }): Promise<ApiCargo> {
  return apiFetch<ApiCargo>(`/cargos/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deleteCargo(token: string, id: string): Promise<void> {
  await apiFetch(`/cargos/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}

// ========== Members ==========
export async function fetchMembers(params?: { category?: string }): Promise<ApiMember[]> {
  const query = params?.category ? `?category=${params.category}` : '';
  return apiFetch<ApiMember[]>(`/members${query}`);
}

export async function fetchMember(id: string): Promise<ApiMember> {
  return apiFetch<ApiMember>(`/members/${id}`);
}

export async function createMember(token: string, data: Record<string, unknown>): Promise<ApiMember> {
  return apiFetch<ApiMember>('/members', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function updateMember(token: string, id: string, data: Record<string, unknown>): Promise<ApiMember> {
  return apiFetch<ApiMember>(`/members/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deleteMember(token: string, id: string): Promise<void> {
  await apiFetch(`/members/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}

// ========== Projects ==========
export async function fetchProjects(params?: { status?: string; search?: string }): Promise<ApiProject[]> {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.set('status', params.status);
  if (params?.search) searchParams.set('search', params.search);
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return apiFetch<ApiProject[]>(`/projects${query}`);
}

export async function fetchProject(id: string): Promise<ApiProject> {
  return apiFetch<ApiProject>(`/projects/${id}`);
}

export async function createProject(token: string, data: Record<string, unknown>): Promise<ApiProject> {
  return apiFetch<ApiProject>('/projects', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function updateProject(token: string, id: string, data: Record<string, unknown>): Promise<ApiProject> {
  return apiFetch<ApiProject>(`/projects/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deleteProject(token: string, id: string): Promise<void> {
  await apiFetch(`/projects/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}

// ========== Workshops ==========
export async function fetchWorkshops(token: string): Promise<ApiWorkshop[]> {
  return apiFetch<ApiWorkshop[]>('/workshops', {
    headers: authHeaders(token),
  });
}

export async function fetchWorkshop(token: string, id: string): Promise<ApiWorkshop> {
  return apiFetch<ApiWorkshop>(`/workshops/${id}`, {
    headers: authHeaders(token),
  });
}

export async function createWorkshop(token: string, data: Record<string, unknown>): Promise<ApiWorkshop> {
  return apiFetch<ApiWorkshop>('/workshops', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function updateWorkshop(token: string, id: string, data: Record<string, unknown>): Promise<ApiWorkshop> {
  return apiFetch<ApiWorkshop>(`/workshops/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
}

export async function deleteWorkshop(token: string, id: string): Promise<void> {
  await apiFetch(`/workshops/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}

// ========== Auth ==========
export async function loginApi(email: string, password: string): Promise<{ access_token: string }> {
  return apiFetch<{ access_token: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    next: { revalidate: 0 },
  });
}
