import Link from 'next/link';
import { getToken } from '@/lib/auth';
import { fetchWorkshops } from '@/lib/api-client';
import { Plus } from 'lucide-react';
import WorkshopsTable from './workshops-table';

export const dynamic = 'force-dynamic';

export default async function WorkshopsAdminPage() {
  const token = await getToken();
  let workshops: Awaited<ReturnType<typeof fetchWorkshops>> = [];

  if (token) {
    try {
      workshops = await fetchWorkshops(token);
    } catch {
      workshops = [];
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-gray-900">Oficinas</h1>
          <p className="text-sm text-gray-500 mt-1">{workshops.length} oficinas cadastradas</p>
        </div>
        <Link
          href="/admin/workshops/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--navy-600)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--navy-700)] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nova Oficina
        </Link>
      </div>

      <WorkshopsTable workshops={workshops} />
    </div>
  );
}
