import { notFound } from 'next/navigation';
import { loadMembersData, findMemberBySlug } from '@/lib/members';
import { generateSlug } from '@/lib/utils';
import { Mail, Linkedin, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MemberDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const result = findMemberBySlug(slug);
  
  if (!result) {
    notFound();
  }

  const { member, category } = result;

  // Get category display name
  const categoryDisplayNames: Record<string, string> = {
    coordinators: 'Coordenação',
    professors: 'Professores Colaboradores',
    current_students: 'Estudantes Atuais',
    alumni: 'Egressos'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/members"
                className="group inline-flex items-center text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium"
              >
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Voltar para Membros
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                {categoryDisplayNames[category]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Member Profile */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl shadow-blue-500/10 overflow-hidden border border-white/20">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-8 py-12">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
            
            <div className="relative flex items-start space-x-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-3xl tracking-wider">
                    {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                </div>
              </div>
              <div className="flex-1 text-white">
                <h1 className="text-4xl font-bold mb-3 tracking-tight">{member.name}</h1>
                <p className="text-xl text-blue-100 mb-3 font-medium">{member.role}</p>
                {member.department && (
                  <p className="text-blue-200/90 mb-2 text-lg">{member.department}</p>
                )}
                {member.program && (
                  <p className="text-blue-200/90 text-lg">{member.program}</p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-8">
                <div className="group">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></span>
                    Sobre
                  </h2>
                  <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                    <p className="text-gray-700 leading-relaxed text-lg">{member.bio}</p>
                  </div>
                </div>

                {member.research_area && (
                  <div className="group">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full mr-3"></span>
                      Área de Pesquisa
                    </h3>
                    <div className="bg-emerald-50/50 rounded-xl p-6 border border-emerald-100">
                      <p className="text-gray-700 text-lg">{member.research_area}</p>
                    </div>
                  </div>
                )}

                {member.thesis_title && (
                  <div className="group">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full mr-3"></span>
                      Tese/Dissertação
                    </h3>
                    <div className="bg-purple-50/50 rounded-xl p-6 border border-purple-100">
                      <p className="text-gray-700 text-lg italic">{member.thesis_title}</p>
                    </div>
                  </div>
                )}

                {member.current_position && (
                  <div className="group">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full mr-3"></span>
                      Posição Atual
                    </h3>
                    <div className="bg-amber-50/50 rounded-xl p-6 border border-amber-100">
                      <p className="text-gray-700 text-lg font-medium">{member.current_position}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-8 border border-gray-100 shadow-lg shadow-gray-500/5">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Contato
                  </h3>
                  
                  <div className="space-y-5">
                    <div className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/60 transition-all duration-300">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-300">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium text-sm break-all"
                      >
                        {member.email}
                      </a>
                    </div>

                    {member.linkedin && (
                      <div className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/60 transition-all duration-300">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-300">
                            <Linkedin className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                        >
                          LinkedIn
                        </a>
                      </div>
                    )}

                    {member.lattes && (
                      <div className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/60 transition-all duration-300">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-300">
                            <ExternalLink className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <a
                          href={member.lattes}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium"
                        >
                          Currículo Lattes
                        </a>
                      </div>
                    )}
                  </div>

                  {member.graduation_year && (
                    <div className="mt-8 pt-6 border-t border-gray-200/50">
                      <div className="text-center">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wider">Formatura</h4>
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-lg">
                          {member.graduation_year}
                        </div>
                      </div>
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

// Generate static params for all members
export async function generateStaticParams() {
  const membersData = loadMembersData();
  const allMembers = [
    ...membersData.coordinators.member,
    ...membersData.professors.member,
    ...membersData.current_students.member,
    ...membersData.alumni.member,
  ];

  return allMembers.map((member) => ({
    slug: generateSlug(member.name),
  }));
}
