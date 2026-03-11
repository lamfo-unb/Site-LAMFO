import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Users,
  ExternalLink,
  Github,
  FileText,
  Tag,
  CheckCircle,
  Circle,
  AlertCircle
} from "lucide-react";
import { getProjectBySlug } from "@/lib/projects";

export const dynamic = 'force-dynamic';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Projeto não encontrado | LAMFO" };
  }

  return {
    title: `${project.name} | LAMFO`,
    description: project.description,
    keywords: ["LAMFO", "projeto", project.research_area, ...project.technologies, "UnB", "pesquisa"],
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ativo': return <Circle className="h-4 w-4 text-[var(--green-500)]" />;
      case 'Concluído': return <CheckCircle className="h-4 w-4 text-[var(--navy-500)]" />;
      case 'Em Planejamento': return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default: return <Circle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-[var(--green-50)] text-[var(--green-700)] border-[var(--green-200)]';
      case 'Concluído': return 'bg-[var(--navy-50)] text-[var(--navy-600)] border-[var(--navy-200)]';
      case 'Em Planejamento': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        {/* Back */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Voltar para projetos
          </Link>
        </div>

        {/* Project Header */}
        <div className="bg-white rounded-xl border border-[var(--border)] p-8 mb-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-4">
              {project.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5">
                {getStatusIcon(project.status)}
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusStyle(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <span className="text-sm text-[var(--muted)] flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" />
                {project.research_area}
              </span>
            </div>

            <p className="text-[var(--muted)] leading-relaxed">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--foreground)] text-white rounded-lg hover:bg-[var(--foreground)]/90 transition-colors text-sm font-medium"
              >
                <Github className="h-4 w-4" />
                GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {project.paper_url && (
              <a
                href={project.paper_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--navy-500)] text-white rounded-lg hover:bg-[var(--navy-600)] transition-colors text-sm font-medium"
              >
                <FileText className="h-4 w-4" />
                Publicação
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Abstract */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h2 className="text-base font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-[var(--navy-500)] rounded-full" />
                Resumo do Projeto
              </h2>
              <p className="text-[var(--muted)] leading-relaxed">{project.abstract}</p>
            </div>

            {/* Technologies */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h2 className="text-base font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-[var(--green-500)] rounded-full" />
                Tecnologias
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-[var(--navy-50)] text-[var(--navy-600)] rounded-lg text-sm font-medium border border-[var(--navy-100)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Participants */}
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h2 className="text-base font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-[var(--navy-400)] rounded-full" />
                Participantes
              </h2>
              <div className="space-y-2">
                {project.participants.map((participant, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-subtle)]">
                    <div className="h-7 w-7 bg-[var(--navy-500)] rounded-lg flex items-center justify-center">
                      <Users className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[var(--foreground)]">{participant}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-sm font-bold font-[family-name:var(--font-outfit)] uppercase tracking-wider text-[var(--muted)] mb-4">
                Detalhes
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-[var(--muted)] mb-1">Status</p>
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(project.status)}
                    <span className="text-sm text-[var(--foreground)]">{project.status}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-[var(--muted)] mb-1">Área de Pesquisa</p>
                  <p className="text-sm text-[var(--foreground)]">{project.research_area}</p>
                </div>

                <div>
                  <p className="text-xs font-medium text-[var(--muted)] mb-1">Período</p>
                  <div className="flex items-center gap-1.5 text-sm text-[var(--foreground)]">
                    <Calendar className="h-3.5 w-3.5 text-[var(--muted)]" />
                    {project.year_started}
                    {project.year_ended && ` - ${project.year_ended}`}
                    {!project.year_ended && project.status === 'Ativo' && ' - Em andamento'}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-[var(--muted)] mb-1">Participantes</p>
                  <div className="flex items-center gap-1.5 text-sm text-[var(--foreground)]">
                    <Users className="h-3.5 w-3.5 text-[var(--muted)]" />
                    {project.participants.length} pessoa(s)
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-sm font-bold font-[family-name:var(--font-outfit)] uppercase tracking-wider text-[var(--muted)] mb-4">
                Links
              </h3>

              <div className="space-y-2">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-subtle)] hover:bg-[var(--navy-50)] transition-colors duration-200"
                  >
                    <Github className="h-4 w-4 text-[var(--muted)]" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--foreground)]">GitHub</p>
                      <p className="text-xs text-[var(--muted)]">Código fonte</p>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-[var(--muted)]" />
                  </a>
                )}

                {project.paper_url && (
                  <a
                    href={project.paper_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface-subtle)] hover:bg-[var(--navy-50)] transition-colors duration-200"
                  >
                    <FileText className="h-4 w-4 text-[var(--muted)]" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--foreground)]">Publicação</p>
                      <p className="text-xs text-[var(--muted)]">Artigo científico</p>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-[var(--muted)]" />
                  </a>
                )}

                <Link
                  href="/projects"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[var(--navy-50)] hover:bg-[var(--navy-100)] transition-colors duration-200"
                >
                  <Tag className="h-4 w-4 text-[var(--navy-500)]" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--navy-700)]">Todos os Projetos</p>
                    <p className="text-xs text-[var(--navy-500)]">Ver outros projetos</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
