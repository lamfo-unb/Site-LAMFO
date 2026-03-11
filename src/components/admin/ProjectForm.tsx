'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiMember, ApiProject } from '@/lib/api-types';
import { X } from 'lucide-react';

interface ProjectFormProps {
  members: ApiMember[];
  project?: ApiProject;
}

export default function ProjectForm({ members, project }: ProjectFormProps) {
  const router = useRouter();
  const isEditing = !!project;

  const [form, setForm] = useState({
    title: project?.title || '',
    description: project?.description || '',
    status: project?.status || 'ACTIVE',
    researchArea: project?.researchArea || '',
    yearStarted: project?.yearStarted || '',
    yearEnded: project?.yearEnded || '',
    abstract: project?.abstract || '',
    summary: project?.summary || '',
    githubUrl: project?.githubUrl || '',
    paperUrl: project?.paperUrl || '',
  });

  const [technologies, setTechnologies] = useState<string[]>(project?.technologies || []);
  const [techInput, setTechInput] = useState('');
  const [tags, setTags] = useState<string[]>(project?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    project?.participants.map((p) => p.memberId) || []
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addItem = (list: string[], setList: (l: string[]) => void, input: string, setInput: (s: string) => void) => {
    const trimmed = input.trim();
    if (trimmed && !list.includes(trimmed)) {
      setList([...list, trimmed]);
    }
    setInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const body: Record<string, unknown> = { ...form, technologies, tags, participantIds: selectedParticipants };
    // Remove empty optional strings
    Object.keys(body).forEach((key) => {
      if (body[key] === '') delete body[key];
    });
    body.title = form.title;
    body.description = form.description;
    body.status = form.status;

    try {
      const url = isEditing ? `/api/admin/projects/${project!.id}` : '/api/admin/projects';
      const res = await fetch(url, {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Erro ao salvar projeto');
      }

      router.push('/admin/projects');
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
          <input name="title" value={form.title} onChange={handleChange} required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]">
              <option value="ACTIVE">Ativo</option>
              <option value="COMPLETED">Concluído</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Área de Pesquisa</label>
            <input name="researchArea" value={form.researchArea} onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Início</label>
            <input name="yearStarted" value={form.yearStarted} onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Término</label>
            <input name="yearEnded" value={form.yearEnded} onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tecnologias</label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {technologies.map((t) => (
              <span key={t} className="flex items-center gap-1 px-2 py-1 bg-[var(--navy-50)] text-[var(--navy-700)] text-xs rounded-lg">
                {t}
                <button type="button" onClick={() => setTechnologies(technologies.filter((x) => x !== t))}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addItem(technologies, setTechnologies, techInput, setTechInput); } }}
              placeholder="Adicionar tecnologia..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
            <input name="githubUrl" value={form.githubUrl} onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paper URL</label>
            <input name="paperUrl" value={form.paperUrl} onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resumo (Abstract)</label>
          <textarea name="abstract" value={form.abstract} onChange={handleChange} rows={3}
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
                <span className="text-xs text-gray-400">({m.cargo?.name})</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button type="submit" disabled={loading}
          className="px-6 py-2.5 bg-[var(--navy-600)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--navy-700)] disabled:opacity-50 transition-colors">
          {loading ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Criar Projeto'}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  );
}
