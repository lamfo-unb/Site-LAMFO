import Link from 'next/link';
import { fetchMembers } from '@/lib/api-client';
import { Plus } from 'lucide-react';
import MembersTable from './members-table';

export const dynamic = 'force-dynamic';

export default async function MembersPage() {
  const members = await fetchMembers();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-gray-900">Membros</h1>
          <p className="text-sm text-gray-500 mt-1">{members.length} membros cadastrados</p>
        </div>
        <Link
          href="/admin/members/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--navy-600)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--navy-700)] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Novo Membro
        </Link>
      </div>

      <MembersTable members={members} />
    </div>
  );
}
