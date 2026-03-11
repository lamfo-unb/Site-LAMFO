'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { ApiWorkshop } from '@/lib/api-types';

export default function WorkshopsTable({ workshops }: { workshops: ApiWorkshop[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/workshops/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      alert('Erro ao excluir oficina');
    }
    setDeletingId(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tema</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Data</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Participantes</th>
            <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {workshops.map((workshop) => (
            <tr key={workshop.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{workshop.theme}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{formatDate(workshop.date)}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{workshop.participants.length}</td>
              <td className="px-4 py-3 text-right">
                {deletingId === workshop.id ? (
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleDelete(workshop.id)}
                      className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700">Confirmar</button>
                    <button onClick={() => setDeletingId(null)}
                      className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancelar</button>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/workshops/${workshop.id}/edit`}
                      className="p-1.5 text-gray-400 hover:text-[var(--navy-600)] hover:bg-[var(--navy-50)] rounded-lg transition-colors">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button onClick={() => setDeletingId(workshop.id)}
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
      {workshops.length === 0 && (
        <div className="px-4 py-8 text-center text-sm text-gray-500">Nenhuma oficina cadastrada</div>
      )}
    </div>
  );
}
