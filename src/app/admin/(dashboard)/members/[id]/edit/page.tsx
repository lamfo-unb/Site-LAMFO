import { fetchCargos, fetchMember } from '@/lib/api-client';
import MemberForm from '@/components/admin/MemberForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMemberPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const [member, cargos] = await Promise.all([
      fetchMember(id),
      fetchCargos(),
    ]);

    return (
      <div>
        <div className="mb-6">
          <Link href="/admin/members" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-gray-900">Editar Membro</h1>
        </div>
        <MemberForm cargos={cargos} member={member} />
      </div>
    );
  } catch {
    notFound();
  }
}
