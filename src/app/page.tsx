import Carousel from "@/components/Carousel";
import Link from "next/link";
import Image from "next/image";
import { 
  Brain, 
  TrendingUp, 
  BookOpen, 
  ChevronRight,
  Target,
  Lightbulb,
  Database
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Pesquisa avançada em algoritmos de aprendizagem de máquina aplicados ao setor financeiro"
    },
    {
      icon: TrendingUp,
      title: "Análise Financeira",
      description: "Desenvolvimento de modelos preditivos para mercados financeiros e gestão de riscos"
    },
    {
      icon: Database,
      title: "Big Data",
      description: "Processamento e análise de grandes volumes de dados financeiros e organizacionais"
    },
    {
      icon: Target,
      title: "Soluções Práticas",
      description: "Aplicação de conhecimento acadêmico em problemas reais do mercado financeiro"
    }
  ];

  const stats = [
    { number: "15+", label: "Projetos Ativos" },
    { number: "50+", label: "Membros" },
    { number: "100+", label: "Publicações" },
    { number: "10+", label: "Anos de Pesquisa" }
  ];

  const researchAreas = [
    {
      title: "Finanças Quantitativas",
      description: "Modelagem matemática e estatística para precificação de ativos e gestão de portfólios.",
      icon: TrendingUp
    },
    {
      title: "Inteligência Artificial",
      description: "Desenvolvimento de algoritmos de IA para análise preditiva em mercados financeiros.",
      icon: Brain
    },
    {
      title: "Análise de Risco",
      description: "Criação de modelos para identificação e quantificação de riscos financeiros.",
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section with Carousel */}
      <div className="relative">
        <Carousel />
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none"></div>
      </div>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Sobre o <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">LAMFO</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8"></div>
              </div>
              
              <div className="space-y-6">
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                  O Laboratório de Aprendizagem de Máquinas em Finanças e Organizações é um 
                  centro de pesquisa da Universidade de Brasília dedicado ao desenvolvimento 
                  de soluções inovadoras que combinam machine learning e análise quantitativa 
                  para o setor financeiro.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Além da pesquisa acadêmica, o LAMFO oferece serviços de consultoria e 
                  pesquisa aplicada para o setor público e privado, transformando conhecimento 
                  científico em soluções práticas para organizações e empresas.
                </p>
              </div>
              
              <Link
                href="/members"
                className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transform"
              >
                Conheça Nossa Equipe
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-10 text-white shadow-2xl shadow-blue-500/20 transform hover:scale-105 transition-transform duration-500">
                <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Lightbulb className="h-10 w-10 text-yellow-300" />
                </div>
                <h3 className="text-3xl font-bold mb-6 mt-4">Nossa Visão</h3>
                <p className="text-blue-100 leading-relaxed text-lg">
                  Ser reconhecido como um centro de excelência em pesquisa aplicada, 
                  formando profissionais capacitados para os desafios do futuro das 
                  finanças e organizações.
                </p>
                {/* Decorative elements */}
                <div className="absolute bottom-4 left-4 w-3 h-3 bg-yellow-300 rounded-full opacity-60"></div>
                <div className="absolute bottom-8 left-8 w-2 h-2 bg-blue-300 rounded-full opacity-40"></div>
                <div className="absolute top-4 left-4 w-2 h-2 bg-purple-300 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Áreas de <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Desenvolvemos pesquisas de ponta em diversas áreas que conectam 
              tecnologia e finanças
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  {/* Decorative gradient line */}
                  <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-4 transition-all duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              LAMFO em <span className="text-yellow-300">Números</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Nosso impacto na pesquisa e formação acadêmica
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105">
                  <div className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-b from-white to-blue-100 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-blue-100 font-semibold text-lg">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Partners */}
      <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Parceiros <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Institucionais</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Trabalhamos em parceria com instituições de excelência para promover 
              a pesquisa e inovação em machine learning e finanças
            </p>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="bg-white rounded-3xl p-12 shadow-2xl shadow-gray-500/10 border border-gray-100 hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-500 transform hover:scale-105">
              <Image
                src="/partners/mctic.png"
                alt="Ministério da Ciência, Tecnologia e Inovações"
                width={300}
                height={120}
                className="max-h-32 w-auto object-contain filter hover:brightness-110 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50/50 relative">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Áreas de <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Pesquisa</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Exploramos fronteiras do conhecimento em áreas estratégicas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-gray-50/80 rounded-3xl p-10 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-500 border border-gray-200 hover:border-violet-200 transform hover:-translate-y-3"
                >
                  <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 w-fit mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-violet-500/25">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-violet-600 transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {area.description}
                  </p>
                  {/* Decorative gradient line */}
                  <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full mt-6 transition-all duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center px-4 lg:px-8 relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Junte-se ao <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">LAMFO</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Interessado em fazer parte do nosso laboratório? Explore as oportunidades 
            de pesquisa e desenvolvimento disponíveis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/budget"
              className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-10 py-5 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 font-semibold text-lg shadow-2xl shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transform hover:scale-105"
            >
              Orce Seu Projeto
              <ChevronRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              href="/chat"
              className="group inline-flex items-center border-2 border-white/30 text-white px-10 py-5 rounded-xl hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-lg backdrop-blur-sm hover:shadow-xl transform hover:scale-105"
            >
              Fale Conosco
              <ChevronRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              href="/projects"
              className="group inline-flex items-center border-2 border-purple-400/50 text-white px-10 py-5 rounded-xl hover:bg-purple-600 hover:border-purple-600 transition-all duration-300 font-semibold text-lg backdrop-blur-sm hover:shadow-xl transform hover:scale-105"
            >
              Ver Projetos
              <BookOpen className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
