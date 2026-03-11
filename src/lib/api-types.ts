export interface ApiCargo {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiMember {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'INTERNAL';
  category: 'COORDINATOR' | 'PROFESSOR' | 'CURRENT_STUDENT' | 'ALUMNI';
  cargoId: string;
  cargo: ApiCargo;
  department?: string;
  description?: string;
  image?: string;
  linkedin?: string;
  lattes?: string;
  program?: string;
  researchArea?: string;
  graduationYear?: string;
  currentPosition?: string;
  thesisTitle?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiProjectParticipant {
  memberId: string;
  projectId: string;
  member: {
    id: string;
    name: string;
    email: string;
    category: string;
    department?: string;
    image?: string;
  };
}

export interface ApiProject {
  id: string;
  title: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED';
  tags: string[];
  date?: string;
  links?: Record<string, string>;
  summary?: string;
  researchArea?: string;
  yearStarted?: string;
  yearEnded?: string;
  technologies: string[];
  githubUrl?: string;
  paperUrl?: string;
  abstract?: string;
  participants: ApiProjectParticipant[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiWorkshopParticipant {
  memberId: string;
  workshopId: string;
  member: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ApiWorkshop {
  id: string;
  theme: string;
  description?: string;
  date: string;
  participants: ApiWorkshopParticipant[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: 'ADMIN' | 'INTERNAL';
  name?: string;
}
