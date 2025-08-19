import { GraduationCap, Users } from 'lucide-react';
import { loadMembersData } from '@/lib/members';
import MemberCardClient from './MemberCardClient';

export default function MembersPage() {
  const membersData = loadMembersData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Membros do LAMFO
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça nossa equipe de pesquisadores, professores e estudantes dedicados 
              ao avanço da aprendizagem de máquina em finanças e organizações.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Coordinators */}
        <section className="mb-12">
          <div className="flex items-center mb-8">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Coordenação</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {membersData.coordinators.member.map((member, index) => (
              <MemberCardClient key={index} member={member} />
            ))}
          </div>
        </section>

        {/* Professors */}
        <section className="mb-12">
          <div className="flex items-center mb-8">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Professores Colaboradores</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {membersData.professors.member.map((member, index) => (
              <MemberCardClient key={index} member={member} />
            ))}
          </div>
        </section>

        {/* Current Students */}
        <section className="mb-12">
          <div className="flex items-center mb-8">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Estudantes Atuais</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {membersData.current_students.member.map((member, index) => (
              <MemberCardClient key={index} member={member} />
            ))}
          </div>
        </section>

        {/* Alumni */}
        <section className="mb-12">
          <div className="flex items-center mb-8">
            <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Egressos</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {membersData.alumni.member.map((member, index) => (
              <MemberCardClient key={index} member={member} showThesis={true} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
