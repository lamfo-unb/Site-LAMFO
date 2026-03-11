import { notFound } from 'next/navigation';
import { findMemberBySlug } from '@/lib/members';
import { Mail, Linkedin, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MemberDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await findMemberBySlug(slug);

  if (!result) {
    notFound();
  }

  const { member, category } = result;

  const categoryDisplayNames: Record<string, string> = {
    coordinators: 'Coordenação',
    professors: 'Professores Colaboradores',
    current_students: 'Estudantes Atuais',
    alumni: 'Egressos'
  };

  const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top bar */}
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/members"
              className="group inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              Voltar para Membros
            </Link>
            <span className="px-3 py-1.5 bg-[var(--navy-50)] text-[var(--navy-600)] text-xs font-semibold font-[family-name:var(--font-outfit)] rounded-full">
              {categoryDisplayNames[category]}
            </span>
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10">
        <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
          {/* Header */}
          <div className="bg-[var(--navy-900)] px-8 py-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--navy-500)]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white font-bold font-[family-name:var(--font-outfit)] text-xl tracking-wide border border-white/10">
                {initials}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold font-[family-name:var(--font-outfit)] mb-1.5">{member.name}</h1>
                <p className="text-[var(--green-400)] font-medium mb-1">{member.role}</p>
                {member.department && (
                  <p className="text-[var(--navy-200)] text-sm">{member.department}</p>
                )}
                {member.program && (
                  <p className="text-[var(--navy-200)] text-sm">{member.program}</p>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-lg font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-3 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[var(--navy-500)] rounded-full" />
                    Sobre
                  </h2>
                  <p className="text-[var(--muted)] leading-relaxed">{member.bio}</p>
                </div>

                {member.research_area && (
                  <div>
                    <h3 className="text-base font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[var(--green-500)] rounded-full" />
                      Área de Pesquisa
                    </h3>
                    <p className="text-[var(--muted)]">{member.research_area}</p>
                  </div>
                )}

                {member.thesis_title && (
                  <div>
                    <h3 className="text-base font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[var(--navy-400)] rounded-full" />
                      Tese/Dissertação
                    </h3>
                    <p className="text-[var(--muted)] italic">{member.thesis_title}</p>
                  </div>
                )}

                {member.current_position && (
                  <div>
                    <h3 className="text-base font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-2 flex items-center gap-2">
                      <span className="w-1 h-4 bg-[var(--green-400)] rounded-full" />
                      Posição Atual
                    </h3>
                    <p className="text-[var(--muted)] font-medium">{member.current_position}</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-[var(--surface-subtle)] rounded-xl p-6 border border-[var(--border)]">
                  <h3 className="text-sm font-bold font-[family-name:var(--font-outfit)] uppercase tracking-wider text-[var(--muted)] mb-4">
                    Contato
                  </h3>

                  <div className="space-y-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[var(--border)] hover:border-[var(--navy-200)] transition-colors duration-200"
                    >
                      <Mail className="h-4 w-4 text-[var(--navy-500)]" />
                      <span className="text-sm text-[var(--foreground)] truncate">{member.email}</span>
                    </a>

                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[var(--border)] hover:border-[var(--navy-200)] transition-colors duration-200"
                      >
                        <Linkedin className="h-4 w-4 text-[var(--navy-500)]" />
                        <span className="text-sm text-[var(--foreground)]">LinkedIn</span>
                      </a>
                    )}

                    {member.lattes && (
                      <a
                        href={member.lattes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[var(--border)] hover:border-[var(--navy-200)] transition-colors duration-200"
                      >
                        <ExternalLink className="h-4 w-4 text-[var(--navy-500)]" />
                        <span className="text-sm text-[var(--foreground)]">Currículo Lattes</span>
                      </a>
                    )}
                  </div>

                  {member.graduation_year && (
                    <div className="mt-6 pt-4 border-t border-[var(--border)] text-center">
                      <p className="text-xs uppercase tracking-wider text-[var(--muted)] mb-1">Formatura</p>
                      <p className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-[var(--navy-500)]">
                        {member.graduation_year}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

