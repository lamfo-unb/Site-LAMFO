import { fetchMembers } from '@/lib/api-client';
import { getToken } from '@/lib/auth';
import { fetchWorkshop } from '@/lib/api-client';
import WorkshopForm from '@/components/admin/WorkshopForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditWorkshopPage({ params }: PageProps) {
  const { id } = await params;
  const token = await getToken();

  if (!token) {
    notFound();
  }

  try {
    const [workshop, members] = await Promise.all([
      fetchWorkshop(token, id),
      fetchMembers(),
    ]);

    return (
      <div>
        <div className="mb-6">
          <Link href="/admin/workshops" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-gray-900">Editar Oficina</h1>
        </div>
        <WorkshopForm members={members} workshop={workshop} />
      </div>
    );
  } catch {
    notFound();
  }
}
