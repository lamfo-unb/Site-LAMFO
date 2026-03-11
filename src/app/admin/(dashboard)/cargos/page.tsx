import { fetchCargos } from '@/lib/api-client';
import CargosClient from './cargos-client';

export const dynamic = 'force-dynamic';

export default async function CargosPage() {
  const cargos = await fetchCargos();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-gray-900">
          Cargos
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Gerencie os cargos de exibição dos membros
        </p>
      </div>

      <CargosClient initialCargos={cargos} />
    </div>
  );
}
