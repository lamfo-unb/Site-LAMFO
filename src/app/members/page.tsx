import { Mail, Linkedin, ExternalLink, GraduationCap, Users } from 'lucide-react';
import { loadMembersData, type Member } from '@/lib/members';

function MemberCard({ member, showThesis = false }: { member: Member; showThesis?: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
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
              <MemberCard key={index} member={member} />
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
              <MemberCard key={index} member={member} />
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
              <MemberCard key={index} member={member} />
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
              <MemberCard key={index} member={member} showThesis={true} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
