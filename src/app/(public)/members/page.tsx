import { GraduationCap, Users, Crown } from 'lucide-react';
import { loadMembersData } from '@/lib/members';
import MemberCardClient from './MemberCardClient';

const sectionConfig = [
  { key: 'coordinators', title: 'Coordenação', icon: Crown, cols: 'lg:grid-cols-2' },
  { key: 'professors', title: 'Professores Colaboradores', icon: GraduationCap, cols: 'lg:grid-cols-2' },
  { key: 'current_students', title: 'Estudantes Atuais', icon: Users, cols: 'lg:grid-cols-2 xl:grid-cols-3' },
  { key: 'alumni', title: 'Egressos', icon: GraduationCap, cols: 'lg:grid-cols-2' },
] as const;

export const dynamic = 'force-dynamic';

export default async function MembersPage() {
  const membersData = await loadMembersData();

  const getMembersForSection = (key: string) => {
    switch (key) {
      case 'coordinators': return membersData.coordinators.member;
      case 'professors': return membersData.professors.member;
      case 'current_students': return membersData.current_students.member;
      case 'alumni': return membersData.alumni.member;
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <div className="bg-white border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold font-[family-name:var(--font-outfit)] uppercase tracking-widest text-[var(--green-500)] mb-3">
              Nossa equipe
            </p>
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-4">
              Membros do LAMFO
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed">
              Conheça nossa equipe de pesquisadores, professores e estudantes dedicados
              ao avanço da aprendizagem de máquina em finanças e organizações.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {sectionConfig.map(({ key, title, icon: Icon, cols }) => {
          const members = getMembersForSection(key);
          if (members.length === 0) return null;

          return (
            <section key={key} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[var(--navy-50)] flex items-center justify-center">
                  <Icon className="h-4.5 w-4.5 text-[var(--navy-500)]" />
                </div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)]">
                  {title}
                </h2>
                <span className="text-sm text-[var(--muted)] bg-[var(--surface-subtle)] px-2.5 py-0.5 rounded-full">
                  {members.length}
                </span>
              </div>
              <div className={`grid grid-cols-1 ${cols} gap-4`}>
                {members.map((member, index) => (
                  <MemberCardClient key={index} member={member} showThesis={key === 'alumni'} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
