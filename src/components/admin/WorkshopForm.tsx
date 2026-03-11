'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiMember, ApiWorkshop } from '@/lib/api-types';

interface WorkshopFormProps {
  members: ApiMember[];
  workshop?: ApiWorkshop;
}

export default function WorkshopForm({ members, workshop }: WorkshopFormProps) {
  const router = useRouter();
  const isEditing = !!workshop;

  const [form, setForm] = useState({
    theme: workshop?.theme || '',
    description: workshop?.description || '',
    date: workshop?.date ? new Date(workshop.date).toISOString().slice(0, 16) : '',
  });

  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    workshop?.participants.map((p) => p.memberId) || []
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const body: Record<string, unknown> = {
      theme: form.theme,
      date: form.date ? new Date(form.date).toISOString() : undefined,
      participantIds: selectedParticipants,
    };
    if (form.description) body.description = form.description;

    try {
      const url = isEditing ? `/api/admin/workshops/${workshop!.id}` : '/api/admin/workshops';
      const res = await fetch(url, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Erro ao salvar oficina');
      }

      router.push('/admin/workshops');
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
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200 mb-6">{error}</div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tema *</label>
          <input name="theme" value={form.theme} onChange={handleChange} required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora *</label>
          <input name="date" type="datetime-local" value={form.date} onChange={handleChange} required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Participantes</label>
          <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-2 space-y-1">
            {members.map((m) => (
              <label key={m.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedParticipants.includes(m.id)}
                  onChange={(e) => {
                    setSelectedParticipants(
                      e.target.checked
                        ? [...selectedParticipants, m.id]
                        : selectedParticipants.filter((id) => id !== m.id)
                    );
                  }}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">{m.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button type="submit" disabled={loading}
          className="px-6 py-2.5 bg-[var(--navy-600)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--navy-700)] disabled:opacity-50 transition-colors">
          {loading ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Criar Oficina'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  );
}
