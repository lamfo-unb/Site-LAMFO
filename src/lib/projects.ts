import * as TOML from '@iarna/toml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { createSlug } from './utils';

export interface Project {
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

// Server-side only function
export function loadProjectsData(): ProjectsData {
  const projectsPath = join(process.cwd(), 'data', 'projects.toml');
  const fileContent = readFileSync(projectsPath, 'utf-8');
  const parsedData = TOML.parse(fileContent) as any;
  
  // Create a clean object without symbols
  const cleanData: ProjectsData = {
    projects: parsedData.projects.map((project: any) => ({
      name: project.name,
      description: project.description,
      research_area: project.research_area,
      status: project.status,
      year_started: project.year_started,
      year_ended: project.year_ended,
      participants: [...project.participants],
      technologies: [...project.technologies],
      github_url: project.github_url,
      paper_url: project.paper_url,
      abstract: project.abstract,
    })),
    research_areas: {
      areas: [...parsedData.research_areas.areas],
    },
  };
  
  return cleanData;
}

// Server-side only function
export function getProjectBySlug(slug: string): Project | null {
  const { projects } = loadProjectsData();
  const project = projects.find(p => createSlug(p.name) === slug);
  return project || null;
}
