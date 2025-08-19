'use client';

import { Mail, Linkedin, ExternalLink } from 'lucide-react';
import { type Member } from '@/lib/members';
import { generateSlug } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface MemberCardClientProps {
  member: Member;
  showThesis?: boolean;
}

export default function MemberCardClient({ member, showThesis = false }: MemberCardClientProps) {
  const memberSlug = generateSlug(member.name);
  const router = useRouter();
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on contact links
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    router.push(`/members/${memberSlug}`);
  };
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
                {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {member.name}
            </h3>
            <p className="text-blue-600 font-medium mb-1">{member.role}</p>
            {member.department && (
              <p className="text-sm text-gray-600 mb-2">{member.department}</p>
            )}
            {member.program && (
              <p className="text-sm text-gray-600 mb-2">{member.program}</p>
            )}
            {member.research_area && (
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Área de pesquisa:</span> {member.research_area}
              </p>
            )}
            {member.graduation_year && (
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Formatura:</span> {member.graduation_year}
              </p>
            )}
            {member.current_position && (
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Posição atual:</span> {member.current_position}
              </p>
            )}
            {showThesis && member.thesis_title && (
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Tese/Dissertação:</span> {member.thesis_title}
              </p>
            )}
            <p className="text-sm text-gray-700 mb-3">{member.bio}</p>
            
            <div className="flex space-x-3">
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                title="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {member.lattes && (
                <a
                  href={member.lattes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                  title="Currículo Lattes"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
