'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  label?: string;
}

export default function DeleteButton({ onDelete, label = 'Excluir' }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
    } catch {
      alert('Erro ao excluir. Tente novamente.');
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Excluindo...' : 'Confirmar'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
      title={label}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
