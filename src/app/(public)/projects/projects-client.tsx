"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ProjectsData } from "@/lib/projects";
import { createSlug } from "@/lib/utils";
import {
  Calendar,
  Users,
  Github,
  FileText,
  Search,
  ChevronRight,
  Tag,
  X
} from "lucide-react";

interface ProjectsClientProps {
  projectsData: ProjectsData;
}

export default function ProjectsClient({ projectsData }: ProjectsClientProps) {
  const { projects, research_areas } = projectsData;
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [areaFilter, setAreaFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesStatus = !statusFilter || project.status === statusFilter;
      const matchesArea = !areaFilter || project.research_area === areaFilter;
      const matchesSearch = !searchTerm ||
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.abstract.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesArea && matchesSearch;
    });
  }, [projects, statusFilter, areaFilter, searchTerm]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Ativo':
        return 'bg-[var(--green-50)] text-[var(--green-700)] border-[var(--green-200)]';
      case 'Concluído':
        return 'bg-[var(--navy-50)] text-[var(--navy-600)] border-[var(--navy-200)]';
      case 'Em Planejamento':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const hasFilters = statusFilter || areaFilter || searchTerm;

  const clearFilters = () => {
    setStatusFilter('');
    setAreaFilter('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold font-[family-name:var(--font-outfit)] uppercase tracking-widest text-[var(--green-500)] mb-3">
              Pesquisa e inovação
            </p>
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-4">
              Projetos de Pesquisa
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed">
              Conheça os projetos desenvolvidos pelo LAMFO, abrangendo machine learning
              em finanças, análise de redes e muito mais.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-[var(--border)] p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar projetos..."
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-[var(--border)] rounded-lg bg-[var(--surface-subtle)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-300)] transition-all duration-200"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-[var(--border)] rounded-lg bg-[var(--surface-subtle)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-300)] transition-all duration-200"
            >
              <option value="">Todos os status</option>
              <option value="Ativo">Ativo</option>
              <option value="Concluído">Concluído</option>
              <option value="Em Planejamento">Em Planejamento</option>
            </select>

            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-[var(--border)] rounded-lg bg-[var(--surface-subtle)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--navy-500)]/20 focus:border-[var(--navy-300)] transition-all duration-200"
            >
              <option value="">Todas as áreas</option>
              {research_areas.areas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-[var(--muted)]">
                {filteredProjects.length} de {projects.length} projetos
              </span>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1 text-xs font-medium text-[var(--navy-500)] hover:text-[var(--navy-700)] transition-colors"
              >
                <X className="h-3 w-3" />
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.name}
              className="group bg-white rounded-xl border border-[var(--border)] hover:border-[var(--navy-200)] hover:shadow-lg hover:shadow-[var(--navy-500)]/5 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-2 group-hover:text-[var(--navy-600)] transition-colors duration-200">
                      {project.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${getStatusStyle(project.status)}`}>
                        {project.status}
                      </span>
                      <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {project.research_area}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[var(--muted)] mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-[var(--muted)] mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {project.year_started}
                    {project.year_ended && ` - ${project.year_ended}`}
                    {!project.year_ended && project.status === 'Ativo' && ' - atual'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {project.participants.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs bg-[var(--surface-subtle)] text-[var(--muted)] rounded-md border border-[var(--border)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 text-xs text-[var(--muted)]">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--navy-50)] hover:text-[var(--navy-500)] transition-colors duration-200"
                        title="GitHub"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.paper_url && (
                      <a
                        href={project.paper_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--navy-50)] hover:text-[var(--navy-500)] transition-colors duration-200"
                        title="Publicação"
                      >
                        <FileText className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${createSlug(project.name)}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--navy-500)] hover:text-[var(--navy-700)] transition-colors duration-200"
                  >
                    Ver detalhes
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Search className="h-10 w-10 text-[var(--border)] mx-auto mb-4" />
            <h3 className="text-lg font-semibold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-[var(--muted)] mb-4">
              Tente ajustar os filtros ou termos de busca.
            </p>
            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-[var(--navy-500)] hover:text-[var(--navy-700)] transition-colors"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
