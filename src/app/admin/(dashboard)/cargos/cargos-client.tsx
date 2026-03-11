'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { ApiCargo } from '@/lib/api-types';

interface CargosClientProps {
  initialCargos: ApiCargo[];
}

export default function CargosClient({ initialCargos }: CargosClientProps) {
  const router = useRouter();
  const [cargos, setCargos] = useState(initialCargos);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const getToken = async () => {
    const res = await fetch('/api/auth/me');
    if (!res.ok) {
      window.location.href = '/admin/login';
      return null;
    }
    const cookieHeader = document.cookie;
    const match = cookieHeader.match(/lamfo_token=([^;]+)/);
    return match?.[1] || null;
  };

  const apiCall = async (url: string, options: RequestInit) => {
    const res = await fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || 'Erro na operação');
    }
    return res.json();
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setError('');
    try {
      const cargo = await apiCall('/api/admin/cargos', {
        method: 'POST',
        body: JSON.stringify({ name: newName.trim() }),
      });
      setCargos([...cargos, cargo]);
      setNewName('');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao criar cargo');
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editingName.trim()) return;
    setError('');
    try {
      const cargo = await apiCall(`/api/admin/cargos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name: editingName.trim() }),
      });
      setCargos(cargos.map((c) => (c.id === id ? cargo : c)));
      setEditingId(null);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar cargo');
    }
  };

  const handleDelete = async (id: string) => {
    setError('');
    try {
      await apiCall(`/api/admin/cargos/${id}`, { method: 'DELETE' });
      setCargos(cargos.filter((c) => c.id !== id));
      setDeletingId(null);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir cargo');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 border-b border-red-200">
          {error}
        </div>
      )}

      {/* Add new */}
      <div className="p-4 border-b border-gray-100 flex gap-3">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          placeholder="Nome do novo cargo..."
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-400)]"
        />
        <button
          onClick={handleCreate}
          disabled={!newName.trim()}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--navy-600)] text-white text-sm font-medium rounded-lg hover:bg-[var(--navy-700)] disabled:opacity-50 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Adicionar
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100">
        {cargos.map((cargo) => (
          <div key={cargo.id} className="px-4 py-3 flex items-center gap-3">
            {editingId === cargo.id ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUpdate(cargo.id)}
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20"
                  autoFocus
                />
                <button
                  onClick={() => handleUpdate(cargo.id)}
                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : deletingId === cargo.id ? (
              <>
                <span className="flex-1 text-sm text-gray-900">{cargo.name}</span>
                <span className="text-xs text-red-600 mr-2">Confirmar exclusão?</span>
                <button
                  onClick={() => handleDelete(cargo.id)}
                  className="px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Excluir
                </button>
                <button
                  onClick={() => setDeletingId(null)}
                  className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-sm text-gray-900">{cargo.name}</span>
                <button
                  onClick={() => { setEditingId(cargo.id); setEditingName(cargo.name); }}
                  className="p-1.5 text-gray-400 hover:text-[var(--navy-600)] hover:bg-[var(--navy-50)] rounded-lg transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeletingId(cargo.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        ))}

        {cargos.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-gray-500">
            Nenhum cargo cadastrado
          </div>
        )}
      </div>
    </div>
  );
}
