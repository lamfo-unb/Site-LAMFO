import { loadProjectsData } from "@/lib/projects";
import ProjectsClient from "./projects-client";

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projectsData = await loadProjectsData();

  return <ProjectsClient projectsData={projectsData} />;
}
