'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { ApiProject } from '@/lib/api-types';

const statusLabels: Record<string, string> = {
  ACTIVE: 'Ativo',
  COMPLETED: 'Concluído',
};

export default function ProjectsTable({ projects }: { projects: ApiProject[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      alert('Erro ao excluir projeto');
    }
    setDeletingId(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Título</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Participantes</th>
            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {projects.map((project) => (
            <tr key={project.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{project.title}</td>
              <td className="px-4 py-3">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  project.status === 'ACTIVE'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-blue-50 text-blue-700'
                }`}>
                  {statusLabels[project.status] || project.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {project.participants.length} participante(s)
              </td>
              <td className="px-4 py-3 text-right">
                {deletingId === project.id ? (
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleDelete(project.id)}
                      className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700">Confirmar</button>
                    <button onClick={() => setDeletingId(null)}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancelar</button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/projects/${project.id}/edit`}
                      className="p-1.5 text-gray-400 hover:text-[var(--navy-600)] hover:bg-[var(--navy-50)] rounded-lg transition-colors">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button onClick={() => setDeletingId(project.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {projects.length === 0 && (
        <div className="px-4 py-8 text-center text-sm text-gray-500">Nenhum projeto cadastrado</div>
      )}
    </div>
  );
}
