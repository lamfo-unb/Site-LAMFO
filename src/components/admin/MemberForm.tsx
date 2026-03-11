'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiCargo, ApiMember } from '@/lib/api-types';

interface MemberFormProps {
  cargos: ApiCargo[];
  member?: ApiMember;
}

export default function MemberForm({ cargos, member }: MemberFormProps) {
  const router = useRouter();
  const isEditing = !!member;

  const [form, setForm] = useState({
    name: member?.name || '',
    email: member?.email || '',
    password: '',
    role: member?.role || 'INTERNAL',
    category: member?.category || 'CURRENT_STUDENT',
    cargoId: member?.cargoId || (cargos[0]?.id || ''),
    department: member?.department || '',
    description: member?.description || '',
    image: member?.image || '',
    linkedin: member?.linkedin || '',
    lattes: member?.lattes || '',
    program: member?.program || '',
    researchArea: member?.researchArea || '',
    graduationYear: member?.graduationYear || '',
    currentPosition: member?.currentPosition || '',
    thesisTitle: member?.thesisTitle || '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const body: Record<string, unknown> = { ...form };
    // Remove empty optional strings
    Object.keys(body).forEach((key) => {
      if (body[key] === '') delete body[key];
    });
    // Keep required fields
    body.name = form.name;
    body.email = form.email;
    body.role = form.role;
    body.category = form.category;
    body.cargoId = form.cargoId;

    if (!isEditing && !form.password) {
      setError('Senha é obrigatória para novo membro');
      setLoading(false);
      return;
    }
    if (!form.password) delete body.password;

    try {
      const url = isEditing ? `/api/admin/members/${member!.id}` : '/api/admin/members';
      const res = await fetch(url, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Erro ao salvar membro');
      }

      router.push('/admin/members');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200 mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
          <input name="name" value={form.name} onChange={handleChange} required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Senha {isEditing ? '(deixe vazio para manter)' : '*'}
          </label>
          <input name="password" type="password" value={form.password} onChange={handleChange}
            minLength={6}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
          <select name="role" value={form.role} onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]">
            <option value="ADMIN">Admin</option>
            <option value="INTERNAL">Interno</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
          <select name="category" value={form.category} onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]">
            <option value="COORDINATOR">Coordenador</option>
            <option value="PROFESSOR">Professor</option>
            <option value="CURRENT_STUDENT">Estudante Atual</option>
            <option value="ALUMNI">Egresso</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cargo *</label>
          <select name="cargoId" value={form.cargoId} onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]">
            {cargos.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
          <input name="department" value={form.department} onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Programa</label>
          <input name="program" value={form.program} onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Área de Pesquisa</label>
          <input name="researchArea" value={form.researchArea} onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Formatura</label>
          <input name="graduationYear" value={form.graduationYear} onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Posição Atual</label>
          <input name="currentPosition" value={form.currentPosition} onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tese/Dissertação</label>
          <input name="thesisTitle" value={form.thesisTitle} onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input name="linkedin" value={form.linkedin} onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lattes</label>
          <input name="lattes" value={form.lattes} onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição/Bio</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button type="submit" disabled={loading}
          className="px-6 py-2.5 bg-[var(--navy-600)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--navy-700)] disabled:opacity-50 transition-colors">
          {loading ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Criar Membro'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  );
}
