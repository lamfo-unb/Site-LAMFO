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
  AlertCircle,
  FolderOpen
} from "lucide-react";
import { getProjectBySlug, loadProjectsData } from "@/lib/projects";
import { createSlug } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: "Projeto não encontrado | LAMFO",
      description: "O projeto solicitado não foi encontrado.",
    };
  }

  return {
    title: `${project.name} | LAMFO`,
    description: project.description,
    keywords: [
      "LAMFO", 
      "projeto", 
      project.research_area,
      ...project.technologies,
      "UnB",
      "pesquisa"
    ],
  };
}

export async function generateStaticParams() {
  const { projects } = loadProjectsData();
  
  return projects.map((project) => ({
    slug: createSlug(project.name),
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ativo':
        return <Circle className="h-5 w-5 text-green-600" />;
      case 'Concluído':
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'Em Planejamento':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Concluído':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Em Planejamento':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para projetos
          </Link>
        </div>

        {/* Project Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {project.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(project.status)}
                  <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Tag className="h-4 w-4 mr-2" />
                  <span>{project.research_area}</span>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                <Github className="h-4 w-4 mr-2" />
                Ver no GitHub
                <ExternalLink className="h-3 w-3 ml-2" />
              </a>
            )}
            
            {project.paper_url && (
              <a
                href={project.paper_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FileText className="h-4 w-4 mr-2" />
                Ver Publicação
                <ExternalLink className="h-3 w-3 ml-2" />
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Abstract */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Resumo do Projeto
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {project.abstract}
              </p>
            </div>

            {/* Technologies */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Tecnologias Utilizadas
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md text-sm font-medium border border-blue-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Participants */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Participantes
              </h2>
              <div className="space-y-2">
                {project.participants.map((participant, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-md"
                  >
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-gray-900 font-medium">
                      {participant}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Detalhes do Projeto
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(project.status)}
                    <span className="text-gray-900">{project.status}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Área de Pesquisa
                  </label>
                  <p className="text-gray-900">{project.research_area}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Período
                  </label>
                  <div className="flex items-center text-gray-900">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {project.year_started}
                      {project.year_ended && ` - ${project.year_ended}`}
                      {!project.year_ended && project.status === 'Ativo' && ' - Em andamento'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Participantes
                  </label>
                  <div className="flex items-center text-gray-900">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{project.participants.length} pessoa(s)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Links Relacionados
              </h3>
              
              <div className="space-y-3">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors group"
                  >
                    <Github className="h-5 w-5 text-gray-600 mr-3 group-hover:text-gray-900" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        Repositório GitHub
                      </div>
                      <div className="text-xs text-gray-500">
                        Código fonte do projeto
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </a>
                )}

                {project.paper_url && (
                  <a
                    href={project.paper_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors group"
                  >
                    <FileText className="h-5 w-5 text-gray-600 mr-3 group-hover:text-gray-900" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        Publicação Científica
                      </div>
                      <div className="text-xs text-gray-500">
                        Artigo ou paper relacionado
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </a>
                )}

                <Link
                  href="/projects"
                  className="flex items-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors group"
                >
                  <Tag className="h-5 w-5 text-blue-600 mr-3" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-blue-900">
                      Todos os Projetos
                    </div>
                    <div className="text-xs text-blue-600">
                      Ver outros projetos do LAMFO
                    </div>
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