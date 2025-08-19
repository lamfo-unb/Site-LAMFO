import { loadProjectsData } from "@/lib/projects";
import ProjectsClient from "./projects-client";

export default function ProjectsPage() {
  const projectsData = loadProjectsData();

  return <ProjectsClient projectsData={projectsData} />;
}
