import { createSlug } from './utils';
import { fetchProjects } from './api-client';
import { ApiProject } from './api-types';

export interface Project {
  id: string;
  name: string;
  description: string;
  research_area: string;
  status: 'Ativo' | 'Concluído' | 'Em Planejamento';
  year_started: string;
  year_ended?: string;
  participants: string[];
  technologies: string[];
  github_url?: string;
  paper_url?: string;
  abstract: string;
}

export interface ProjectsData {
  projects: Project[];
  research_areas: {
    areas: string[];
  };
}

function mapStatus(status: string): 'Ativo' | 'Concluído' | 'Em Planejamento' {
  switch (status) {
    case 'ACTIVE': return 'Ativo';
    case 'COMPLETED': return 'Concluído';
    default: return 'Ativo';
  }
}

function apiProjectToProject(p: ApiProject): Project {
  return {
    id: p.id,
    name: p.title,
    description: p.description,
    research_area: p.researchArea || '',
    status: mapStatus(p.status),
    year_started: p.yearStarted || (p.date ? new Date(p.date).getFullYear().toString() : ''),
    year_ended: p.yearEnded || undefined,
    participants: p.participants.map((part) => part.member.name),
    technologies: p.technologies.length > 0 ? p.technologies : p.tags,
    github_url: p.githubUrl || p.links?.github || undefined,
    paper_url: p.paperUrl || p.links?.paper || undefined,
    abstract: p.abstract || p.summary || '',
  };
}

export async function loadProjectsData(): Promise<ProjectsData> {
  const apiProjects = await fetchProjects();
  const projects = apiProjects.map(apiProjectToProject);

  const allAreas = projects
    .map((p) => p.research_area)
    .filter((a) => !!a);
  const uniqueAreas = [...new Set(allAreas)];

  return {
    projects,
    research_areas: { areas: uniqueAreas },
  };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { projects } = await loadProjectsData();
  const project = projects.find(p => createSlug(p.name) === slug);
  return project || null;
}
