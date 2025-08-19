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
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <Carousel />

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Sobre o LAMFO
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                O Laboratório de Aprendizagem de Máquinas em Finanças e Organizações é um 
                centro de pesquisa da Universidade de Brasília dedicado ao desenvolvimento 
                de soluções inovadoras que combinam machine learning e análise quantitativa 
                para o setor financeiro.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Além da pesquisa acadêmica, o LAMFO oferece serviços de consultoria e 
                pesquisa aplicada para o setor público e privado, transformando conhecimento 
                científico em soluções práticas para organizações e empresas.
              </p>
              <Link
                href="/members"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Conheça Nossa Equipe
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <Lightbulb className="h-12 w-12 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
                <p className="text-blue-100 leading-relaxed">
                  Ser reconhecido como um centro de excelência em pesquisa aplicada, 
                  formando profissionais capacitados para os desafios do futuro das 
                  finanças e organizações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Áreas de Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              LAMFO em Números
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Nosso impacto na pesquisa e formação acadêmica
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Parceiros Institucionais
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trabalhamos em parceria com instituições de excelência para promover 
              a pesquisa e inovação em machine learning e finanças
            </p>
          </div>
          
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center">
              <Image
                src="/partners/mctic.png"
                alt="Ministério da Ciência, Tecnologia e Inovações"
                width={250}
                height={100}
                className="max-h-24 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Áreas de Pesquisa
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Exploramos fronteiras do conhecimento em áreas estratégicas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-200"
                >
                  <div className="bg-white rounded-xl p-4 w-fit mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Junte-se ao LAMFO
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Interessado em fazer parte do nosso laboratório? Explore as oportunidades 
            de pesquisa e desenvolvimento disponíveis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/budget"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Orce Seu Projeto
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-semibold"
            >
              Fale Conosco
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-semibold"
            >
              Ver Projetos
              <BookOpen className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
