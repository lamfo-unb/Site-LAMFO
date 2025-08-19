import * as TOML from '@iarna/toml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { generateSlug } from './utils';

export interface Member {
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

interface TomlMembersData {
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

// Server-side only function
export function loadMembersData(): MembersData {
  const membersPath = join(process.cwd(), 'data', 'members.toml');
  const fileContent = readFileSync(membersPath, 'utf-8');
  const parsedData = TOML.parse(fileContent) as unknown as TomlMembersData;
  
  // Create a clean object without symbols
  const cleanData: MembersData = {
    coordinators: {
      member: parsedData.coordinators.member.map((member: Member) => ({
        name: member.name,
        role: member.role,
        department: member.department,
        program: member.program,
        research_area: member.research_area,
        graduation_year: member.graduation_year,
        current_position: member.current_position,
        thesis_title: member.thesis_title,
        bio: member.bio,
        email: member.email,
        image: member.image,
        linkedin: member.linkedin,
        lattes: member.lattes,
      })),
    },
    professors: {
      member: parsedData.professors.member.map((member: Member) => ({
        name: member.name,
        role: member.role,
        department: member.department,
        program: member.program,
        research_area: member.research_area,
        graduation_year: member.graduation_year,
        current_position: member.current_position,
        thesis_title: member.thesis_title,
        bio: member.bio,
        email: member.email,
        image: member.image,
        linkedin: member.linkedin,
        lattes: member.lattes,
      })),
    },
    current_students: {
      member: parsedData.current_students.member.map((member: Member) => ({
        name: member.name,
        role: member.role,
        department: member.department,
        program: member.program,
        research_area: member.research_area,
        graduation_year: member.graduation_year,
        current_position: member.current_position,
        thesis_title: member.thesis_title,
        bio: member.bio,
        email: member.email,
        image: member.image,
        linkedin: member.linkedin,
        lattes: member.lattes,
      })),
    },
    alumni: {
      member: parsedData.alumni.member.map((member: Member) => ({
        name: member.name,
        role: member.role,
        department: member.department,
        program: member.program,
        research_area: member.research_area,
        graduation_year: member.graduation_year,
        current_position: member.current_position,
        thesis_title: member.thesis_title,
        bio: member.bio,
        email: member.email,
        image: member.image,
        linkedin: member.linkedin,
        lattes: member.lattes,
      })),
    },
    research_areas: {
      areas: [...parsedData.research_areas.areas],
    },
  };
  
  return cleanData;
}

// Helper function to find member by slug
export function findMemberBySlug(slug: string): { member: Member; category: string } | null {
  const membersData = loadMembersData();
  
  // Search in all categories
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