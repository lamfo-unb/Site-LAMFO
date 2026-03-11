import { fetchMembers } from '@/lib/api-client';
import WorkshopForm from '@/components/admin/WorkshopForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function NewWorkshopPage() {
  const members = await fetchMembers();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/workshops" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-gray-900">Nova Oficina</h1>
      </div>
      <WorkshopForm members={members} />
    </div>
  );
}
