import { Metadata } from "next";
import Link from "next/link";
import InteractiveMap from "@/components/InteractiveMap";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Building,
  Github,
  Linkedin,
  Instagram,
  Globe,
  ArrowUpRight,
  Users,
  Navigation,
  Car
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contato | LAMFO",
  description: "Entre em contato com o Laboratório de Aprendizagem de Máquinas em Finanças e Organizações da UnB.",
};

export default function ContactsPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "E-mail",
      content: "lamfo@unb.br",
      description: "Para dúvidas gerais e parcerias",
      action: "mailto:lamfo@unb.br",
      actionText: "Enviar E-mail"
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "+55 (61) 3107-0755",
      description: "Horário comercial: 8h às 18h",
      action: "tel:+556131070755",
      actionText: "Ligar"
    },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/lamfo-unb", icon: Github, description: "Repositórios open source" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/lamfo", icon: Linkedin, description: "Rede profissional" },
    { name: "Instagram", href: "https://www.instagram.com/lamfounb/", icon: Instagram, description: "Novidades e eventos" },
    { name: "Site Institucional", href: "https://lamfo.unb.br", icon: Globe, description: "Portal oficial" },
  ];

  const locationDetails = [
    { icon: Building, title: "Faculdade", content: "FACE - Economia, Administração e Contabilidade" },
    { icon: MapPin, title: "Campus", content: "Campus Darcy Ribeiro - Asa Norte" },
    { icon: Navigation, title: "Coordenadas", content: "15°45'S, 47°52'W" },
    { icon: Car, title: "Estacionamento", content: "Disponível no campus (gratuito)" },
  ];

  const officeHours = [
    { day: "Segunda a Sexta", hours: "8:00 - 18:00" },
    { day: "Sábado", hours: "8:00 - 12:00" },
    { day: "Domingo", hours: "Fechado" }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <div className="bg-[var(--navy-900)] text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold font-[family-name:var(--font-outfit)] uppercase tracking-widest text-[var(--green-400)] mb-3">
              Fale conosco
            </p>
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-outfit)] mb-4">
              Entre em Contato
            </h1>
            <p className="text-lg text-[var(--navy-200)] leading-relaxed">
              Estamos prontos para responder suas dúvidas, discutir parcerias
              e explorar oportunidades de colaboração em pesquisa.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Contact Methods */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const isExternal = method.action.startsWith('http') || method.action.startsWith('mailto') || method.action.startsWith('tel');

              return (
                <div key={index} className="bg-white rounded-xl p-6 border border-[var(--border)] hover:border-[var(--navy-200)] hover:shadow-lg hover:shadow-[var(--navy-500)]/5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[var(--navy-50)] flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-[var(--navy-500)]" />
                  </div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-1">
                    {method.title}
                  </h3>
                  <p className="text-base font-medium text-[var(--foreground)] mb-1">{method.content}</p>
                  <p className="text-sm text-[var(--muted)] mb-5">{method.description}</p>

                  {isExternal ? (
                    <a
                      href={method.action}
                      className="inline-flex items-center gap-2 bg-[var(--navy-500)] text-white px-5 py-2.5 rounded-lg hover:bg-[var(--navy-600)] transition-colors text-sm font-semibold font-[family-name:var(--font-outfit)]"
                    >
                      {method.actionText}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={method.action}
                      className="inline-flex items-center gap-2 bg-[var(--navy-500)] text-white px-5 py-2.5 rounded-lg hover:bg-[var(--navy-600)] transition-colors text-sm font-semibold font-[family-name:var(--font-outfit)]"
                    >
                      {method.actionText}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Location */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-6">
                Nossa Localização
              </h2>

              <div className="bg-white rounded-xl border border-[var(--border)] p-6 mb-6">
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-[var(--navy-50)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4.5 w-4.5 text-[var(--navy-500)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-1">Endereço</h3>
                    <address className="text-sm text-[var(--muted)] not-italic leading-relaxed">
                      Universidade de Brasília (UnB)<br />
                      Faculdade de Economia, Administração e Contabilidade (FACE)<br />
                      Campus Darcy Ribeiro - Asa Norte<br />
                      Brasília, DF - CEP: 70910-900
                    </address>
                  </div>
                </div>

                <div className="space-y-3">
                  {locationDetails.map((detail, index) => {
                    const Icon = detail.icon;
                    return (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Icon className="h-4 w-4 text-[var(--muted)]" />
                        <span className="font-medium text-[var(--foreground)]">{detail.title}:</span>
                        <span className="text-[var(--muted)]">{detail.content}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[var(--border)] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[var(--green-50)] flex items-center justify-center">
                    <Clock className="h-4.5 w-4.5 text-[var(--green-600)]" />
                  </div>
                  <h3 className="font-semibold font-[family-name:var(--font-outfit)] text-[var(--foreground)]">Horário de Funcionamento</h3>
                </div>
                <div className="space-y-2">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-[var(--muted)]">{schedule.day}</span>
                      <span className="font-medium text-[var(--foreground)]">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-800">
                    <strong>Nota:</strong> Recomendamos agendar uma visita previamente por e-mail ou telefone.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-4">
                Como Chegar
              </h3>
              <InteractiveMap />
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-[var(--foreground)] mb-6 text-center">
            Redes Sociais
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl p-5 border border-[var(--border)] hover:border-[var(--navy-200)] hover:shadow-lg hover:shadow-[var(--navy-500)]/5 transition-all duration-300 text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--navy-50)] flex items-center justify-center mx-auto mb-3 group-hover:bg-[var(--navy-500)] transition-colors duration-300">
                    <Icon className="h-5 w-5 text-[var(--navy-500)] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-semibold font-[family-name:var(--font-outfit)] text-[var(--foreground)] text-sm mb-1">
                    {social.name}
                  </h3>
                  <p className="text-xs text-[var(--muted)]">{social.description}</p>
                </a>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--navy-900)] rounded-2xl p-10 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-10" />
          <div className="relative">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-outfit)] mb-4">
              Pronto para Colaborar?
            </h2>
            <p className="text-[var(--navy-200)] mb-8 max-w-2xl mx-auto">
              Seja para parcerias acadêmicas, industriais ou oportunidades de pesquisa,
              estamos sempre abertos ao diálogo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:lamfo@unb.br"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold font-[family-name:var(--font-outfit)] text-sm"
              >
                <Mail className="h-4 w-4" />
                Enviar E-mail
              </a>
              <Link
                href="/members"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold font-[family-name:var(--font-outfit)] text-sm"
              >
                <Users className="h-4 w-4" />
                Nossa Equipe
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
