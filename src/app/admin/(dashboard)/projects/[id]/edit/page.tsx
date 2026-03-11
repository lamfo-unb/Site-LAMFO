import { fetchMembers, fetchProject } from '@/lib/api-client';
import ProjectForm from '@/components/admin/ProjectForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const [project, members] = await Promise.all([
      fetchProject(id),
      fetchMembers(),
    ]);

    return (
      <div>
        <div className="mb-6">
          <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-gray-900">Editar Projeto</h1>
        </div>
        <ProjectForm members={members} project={project} />
      </div>
    );
  } catch {
    notFound();
  }
}
