import Carousel from "@/components/Carousel";
import Link from "next/link";
import Image from "next/image";
import {
  Brain,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Target,
  Lightbulb,
  Database,
  Search,
  Handshake,
  Wrench,
  Award
} from "lucide-react";

export default function Home() {
  const pillars = [
    {
      icon: Search,
      title: "LAMFO Pesquisa",
      description: "Estudos avançados em ciência de dados, combinando pesquisa científica de ponta com aplicações práticas. Publicações de alto impacto reconhecidas na academia.",
      accent: "var(--navy-500)",
      accentBg: "var(--navy-50)",
    },
    {
      icon: Handshake,
      title: "LAMFO Impacto",
      description: "Interação com a sociedade por meio da disseminação de conhecimento em ciência de dados e aplicações de IA em diversos campos.",
      accent: "var(--green-500)",
      accentBg: "var(--green-50)",
    },
    {
      icon: Wrench,
      title: "LAMFO Soluções",
      description: "Projetos de inovação para organizações públicas e privadas. Credenciado pela UnB para Prestação de Serviços Técnicos Especializados (PSTE).",
      accent: "var(--navy-600)",
      accentBg: "var(--navy-50)",
    },
  ];

  const features = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Pesquisa avançada em algoritmos de aprendizagem de máquina aplicados ao setor financeiro"
    },
    {
      icon: TrendingUp,
      title: "Análise Financeira",
      description: "Modelos preditivos para mercados financeiros e gestão de riscos"
    },
    {
      icon: Database,
      title: "Big Data",
      description: "Processamento e análise de grandes volumes de dados financeiros e organizacionais"
    },
    {
      icon: Target,
      title: "Soluções Práticas",
      description: "Aplicação de conhecimento acadêmico em problemas reais do mercado"
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
      description: "Algoritmos de IA para análise preditiva em mercados financeiros.",
      icon: Brain
    },
    {
      title: "Análise de Risco",
      description: "Modelos para identificação e quantificação de riscos financeiros.",
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <div className="relative">
        <Carousel />
      </div>

      {/* About Section */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold font-[family-name:var(--font-outfit)] uppercase tracking-widest text-[var(--green-500)] mb-3">
                  Sobre o laboratório
                </p>
                <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] leading-tight">
                  Avançando a teoria de IA para a{" "}
                  <span className="text-gradient-navy">sociedade</span>
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-[var(--muted)] leading-relaxed">
                  O LAMFO opera como um think tank focado no avanço da teoria de IA e na
                  promoção do uso ético da inteligência artificial na sociedade. Vinculado à
                  Universidade de Brasília, o laboratório conduz pesquisas e projetos que
                  exploram tanto o avanço teórico quanto as aplicações práticas de IA.
                </p>
                <p className="text-base text-[var(--muted)] leading-relaxed">
                  Recentemente credenciado como Living Lab pelo PCTec/UnB, o LAMFO também
                  recebeu o Prêmio de Melhor Artigo na Divisão de Finanças do EnANPAD 2024.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--green-50)] border border-[var(--green-200)]">
                  <Award className="h-4 w-4 text-[var(--green-600)]" />
                  <span className="text-xs font-semibold text-[var(--green-700)]">Melhor Artigo EnANPAD 2024</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--navy-50)] border border-[var(--navy-200)]">
                  <Lightbulb className="h-4 w-4 text-[var(--navy-600)]" />
                  <span className="text-xs font-semibold text-[var(--navy-700)]">Living Lab PCTec/UnB</span>
                </div>
              </div>

              <Link
                href="/members"
                className="group inline-flex items-center gap-2 bg-[var(--navy-500)] text-white px-6 py-3 rounded-lg hover:bg-[var(--navy-600)] transition-colors duration-200 font-semibold font-[family-name:var(--font-outfit)] text-sm"
              >
                Conheça Nossa Equipe
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>

            {/* Three Pillars */}
            <div className="space-y-4">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-xl p-6 border border-[var(--border)] hover:border-[var(--navy-200)] hover:shadow-lg hover:shadow-[var(--navy-500)]/5 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: pillar.accentBg }}
                      >
                        <Icon className="h-5 w-5" style={{ color: pillar.accent }} />
                      </div>
                      <div>
                        <h3 className="font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-1.5">
                          {pillar.title}
                        </h3>
                        <p className="text-sm text-[var(--muted)] leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[var(--surface-subtle)] relative">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold font-[family-name:var(--font-outfit)] uppercase tracking-widest text-[var(--green-500)] mb-3">
              Competências
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-4">
              Áreas de Expertise
            </h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Pesquisas de ponta que conectam tecnologia, finanças e organizações
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-6 border border-[var(--border)] hover:border-[var(--navy-200)] hover:shadow-lg hover:shadow-[var(--navy-500)]/5 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-[var(--navy-50)] flex items-center justify-center mb-5 group-hover:bg-[var(--navy-500)] transition-colors duration-300">
                    <Icon className="h-5 w-5 text-[var(--navy-500)] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[var(--navy-900)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--navy-500)]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--green-500)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold font-[family-name:var(--font-outfit)] uppercase tracking-widest text-[var(--green-400)] mb-3">
              Nosso impacto
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)]">
              LAMFO em Números
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                  <div className="text-5xl md:text-6xl font-bold font-[family-name:var(--font-outfit)] text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm font-medium text-[var(--navy-200)]">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold font-[family-name:var(--font-outfit)] uppercase tracking-widest text-[var(--green-500)] mb-3">
              Colaboração
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)]">
              Parceiros Institucionais
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="bg-[var(--surface-subtle)] rounded-xl p-10 border border-[var(--border)]">
              <Image
                src="/partners/mctic.png"
                alt="Ministério da Ciência, Tecnologia e Inovações"
                width={280}
                height={100}
                className="max-h-24 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-24 bg-[var(--surface-subtle)] relative">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold font-[family-name:var(--font-outfit)] uppercase tracking-widest text-[var(--green-500)] mb-3">
              Fronteiras do conhecimento
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)]">
              Áreas de Pesquisa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-8 border border-[var(--border)] hover:border-[var(--green-200)] hover:shadow-lg hover:shadow-[var(--green-500)]/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[var(--green-50)] flex items-center justify-center mb-6 group-hover:bg-[var(--green-500)] transition-colors duration-300">
                    <Icon className="h-6 w-6 text-[var(--green-500)] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-3">
                    {area.title}
                  </h3>
                  <p className="text-[var(--muted)] leading-relaxed">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--navy-900)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--navy-500)]/15 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8 relative">
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-6">
            Junte-se ao LAMFO
          </h2>
          <p className="text-lg text-[var(--navy-200)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Interessado em parcerias, oportunidades de pesquisa ou em contratar nossos
            serviços especializados? Explore as possibilidades.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/budget"
              className="group inline-flex items-center justify-center gap-2 bg-[var(--green-500)] text-white px-7 py-3.5 rounded-lg hover:bg-[var(--green-600)] transition-colors duration-200 font-semibold font-[family-name:var(--font-outfit)]"
            >
              Orce Seu Projeto
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>

            <Link
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-lg hover:bg-white/10 transition-colors duration-200 font-semibold font-[family-name:var(--font-outfit)]"
            >
              Fale Conosco
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-lg hover:bg-white/10 transition-colors duration-200 font-semibold font-[family-name:var(--font-outfit)]"
            >
              <BookOpen className="h-4 w-4" />
              Ver Projetos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
