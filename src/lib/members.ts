import * as TOML from '@iarna/toml';
import { readFileSync } from 'fs';
import { join } from 'path';

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

export function loadMembersData(): MembersData {
  const membersPath = join(process.cwd(), 'data', 'members.toml');
  const fileContent = readFileSync(membersPath, 'utf-8');
  const parsedData = TOML.parse(fileContent) as unknown as MembersData;
  
  return parsedData;
}