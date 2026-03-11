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
    if ((e.target as HTMLElement).closest('a')) return;
    router.push(`/members/${memberSlug}`);
  };

  const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div
      className="group bg-white rounded-xl border border-[var(--border)] hover:border-[var(--navy-200)] hover:shadow-lg hover:shadow-[var(--navy-500)]/5 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-lg bg-[var(--navy-500)] flex items-center justify-center text-white font-bold font-[family-name:var(--font-outfit)] text-sm tracking-wide">
              {initials}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-0.5 group-hover:text-[var(--navy-600)] transition-colors duration-200">
              {member.name}
            </h3>
            <p className="text-sm font-medium text-[var(--green-600)] mb-1.5">{member.role}</p>

            {member.department && (
              <p className="text-xs text-[var(--muted)] mb-1">{member.department}</p>
            )}
            {member.program && (
              <p className="text-xs text-[var(--muted)] mb-1">{member.program}</p>
            )}
            {member.research_area && (
              <p className="text-xs text-[var(--muted)] mb-1">
                <span className="font-medium">Área:</span> {member.research_area}
              </p>
            )}
            {member.graduation_year && (
              <p className="text-xs text-[var(--muted)] mb-1">
                <span className="font-medium">Formatura:</span> {member.graduation_year}
              </p>
            )}
            {member.current_position && (
              <p className="text-xs text-[var(--muted)] mb-1">
                <span className="font-medium">Posição atual:</span> {member.current_position}
              </p>
            )}
            {showThesis && member.thesis_title && (
              <p className="text-xs text-[var(--muted)] mb-1 italic">
                {member.thesis_title}
              </p>
            )}

            <p className="text-sm text-[var(--muted)] mt-2 line-clamp-2 leading-relaxed">{member.bio}</p>

            <div className="flex gap-2 mt-3">
              <a
                href={`mailto:${member.email}`}
                className="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--navy-50)] hover:text-[var(--navy-500)] transition-colors duration-200"
                title="Email"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--navy-50)] hover:text-[var(--navy-500)] transition-colors duration-200"
                  title="LinkedIn"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              )}
              {member.lattes && (
                <a
                  href={member.lattes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[var(--surface-subtle)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--navy-50)] hover:text-[var(--navy-500)] transition-colors duration-200"
                  title="Currículo Lattes"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
