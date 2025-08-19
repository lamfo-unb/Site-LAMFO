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
  Filter,
  ChevronRight,
  Tag
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

  const clearFilters = () => {
    setStatusFilter('');
    setAreaFilter('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Projetos de Pesquisa
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça os projetos de pesquisa desenvolvidos pelo LAMFO, 
            abrangendo desde machine learning em finanças até análise de redes financeiras.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome, descrição ou abstract..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos os status</option>
                <option value="Ativo">Ativo</option>
                <option value="Concluído">Concluído</option>
                <option value="Em Planejamento">Em Planejamento</option>
              </select>
            </div>

            {/* Research Area Filter */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                Área de Pesquisa
              </label>
              <select
                id="area"
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas as áreas</option>
                {research_areas.areas.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(statusFilter || areaFilter || searchTerm) && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredProjects.length} de {projects.length} projetos
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.name}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        <Tag className="h-3 w-3 inline mr-1" />
                        {project.research_area}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Meta Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {project.year_started}
                      {project.year_ended && ` - ${project.year_ended}`}
                      {!project.year_ended && project.status === 'Ativo' && ' - Em andamento'}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{project.participants.length} participante(s)</span>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{project.technologies.length - 4} mais
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Ver repositório no GitHub"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.paper_url && (
                      <a
                        href={project.paper_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title="Ver publicação"
                      >
                        <FileText className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/projects/${createSlug(project.name)}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Ver detalhes
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar os filtros ou termos de busca.
            </p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
