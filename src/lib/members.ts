import { generateSlug } from './utils';
import { fetchMembers } from './api-client';
import { ApiMember } from './api-types';

export interface Member {
  id: string;
  name: string;
  role: string;
  department?: string;
  program?: string;
  research_area?: string;
  graduation_year?: string;
  current_position?: string;
  thesis_title?: string;
  bio: string;
  email: string;
  image: string;
  linkedin?: string;
  lattes?: string;
}

export interface MembersData {
  coordinators: {
    member: Member[];
  };
  professors: {
    member: Member[];
  };
  current_students: {
    member: Member[];
  };
  alumni: {
    member: Member[];
  };
  research_areas: {
    areas: string[];
  };
}

function apiMemberToMember(m: ApiMember): Member {
  return {
    id: m.id,
    name: m.name,
    role: m.cargo?.name || '',
    department: m.department || undefined,
    program: m.program || undefined,
    research_area: m.researchArea || undefined,
    graduation_year: m.graduationYear || undefined,
    current_position: m.currentPosition || undefined,
    thesis_title: m.thesisTitle || undefined,
    bio: m.description || '',
    email: m.email,
    image: m.image || '',
    linkedin: m.linkedin || undefined,
    lattes: m.lattes || undefined,
  };
}

export async function loadMembersData(): Promise<MembersData> {
  const apiMembers = await fetchMembers();

  const coordinators = apiMembers
    .filter((m) => m.category === 'COORDINATOR')
    .map(apiMemberToMember);
  const professors = apiMembers
    .filter((m) => m.category === 'PROFESSOR')
    .map(apiMemberToMember);
  const current_students = apiMembers
    .filter((m) => m.category === 'CURRENT_STUDENT')
    .map(apiMemberToMember);
  const alumni = apiMembers
    .filter((m) => m.category === 'ALUMNI')
    .map(apiMemberToMember);

  const allAreas = apiMembers
    .map((m) => m.researchArea)
    .filter((a): a is string => !!a);
  const uniqueAreas = [...new Set(allAreas)];

  return {
    coordinators: { member: coordinators },
    professors: { member: professors },
    current_students: { member: current_students },
    alumni: { member: alumni },
    research_areas: { areas: uniqueAreas },
  };
}

export async function findMemberBySlug(slug: string): Promise<{ member: Member; category: string } | null> {
  const membersData = await loadMembersData();

  const categories = [
    { name: 'coordinators', members: membersData.coordinators.member },
    { name: 'professors', members: membersData.professors.member },
    { name: 'current_students', members: membersData.current_students.member },
    { name: 'alumni', members: membersData.alumni.member },
  ];

  for (const category of categories) {
    const member = category.members.find(m => generateSlug(m.name) === slug);
    if (member) {
      return { member, category: category.name };
    }
  }

  return null;
}
