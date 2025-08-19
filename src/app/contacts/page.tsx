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
  Globe,
  ExternalLink,
  MessageCircle,
  Users,
  Navigation,
  Car
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contato | LAMFO",
  description: "Entre em contato com o Laboratório de Aprendizagem de Máquinas em Finanças e Organizações da UnB. Informações de contato, endereço e localização.",
  keywords: [
    "LAMFO contato",
    "UnB contato", 
    "laboratório contato",
    "endereço LAMFO",
    "telefone LAMFO",
    "email LAMFO",
    "Universidade de Brasília"
  ],
};

export default function ContactsPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "E-mail Principal",
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
    {
      icon: MessageCircle,
      title: "Chat Online",
      content: "Assistente Virtual",
      description: "Disponível 24/7 para informações básicas",
      action: "/chat",
      actionText: "Iniciar Chat"
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/lamfo-unb",
      icon: Github,
      description: "Repositórios e códigos open source",
      color: "bg-gray-900 hover:bg-gray-800"
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/lamfo-unb",
      icon: Linkedin,
      description: "Rede profissional e atualizações",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      name: "Site Institucional",
      href: "https://lamfo.unb.br",
      icon: Globe,
      description: "Portal oficial do laboratório",
      color: "bg-green-600 hover:bg-green-700"
    }
  ];

  const locationDetails = [
    {
      icon: Building,
      title: "Faculdade",
      content: "Faculdade de Economia, Administração e Contabilidade (FACE)"
    },
    {
      icon: MapPin,
      title: "Campus",
      content: "Campus Darcy Ribeiro - Asa Norte"
    },
    {
      icon: Navigation,
      title: "Coordenadas",
      content: "15°45'S, 47°52'W"
    },
    {
      icon: Car,
      title: "Estacionamento",
      content: "Disponível no campus (gratuito para visitantes)"
    }
  ];

  const officeHours = [
    { day: "Segunda a Sexta", hours: "8:00 - 18:00" },
    { day: "Sábado", hours: "8:00 - 12:00" },
    { day: "Domingo", hours: "Fechado" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Estamos prontos para responder suas dúvidas, discutir parcerias 
              e explorar oportunidades de colaboração em pesquisa.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        {/* Contact Methods */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Nos Encontrar
            </h2>
            <p className="text-xl text-gray-600">
              Escolha a forma mais conveniente para entrar em contato
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const isExternal = method.action.startsWith('http') || method.action.startsWith('mailto') || method.action.startsWith('tel');
              
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="bg-blue-100 rounded-lg p-4 w-fit mb-6">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {method.title}
                  </h3>
                  
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {method.content}
                  </p>
                  
                  <p className="text-gray-600 mb-6">
                    {method.description}
                  </p>
                  
                  {isExternal ? (
                    <a
                      href={method.action}
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      {method.actionText}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={method.action}
                      className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      {method.actionText}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Address and Location */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Address Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Nossa Localização
              </h2>
              
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Endereço Completo
                    </h3>
                    <address className="text-gray-700 not-italic leading-relaxed">
                      Universidade de Brasília (UnB)<br />
                      Faculdade de Economia, Administração e Contabilidade (FACE)<br />
                      Campus Darcy Ribeiro - Asa Norte<br />
                      Brasília, DF - CEP: 70910-900<br />
                      Brasil
                    </address>
                  </div>
                </div>

                <div className="space-y-4">
                  {locationDetails.map((detail, index) => {
                    const Icon = detail.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-gray-400" />
                        <div>
                          <span className="font-medium text-gray-900">{detail.title}:</span>
                          <span className="text-gray-700 ml-2">{detail.content}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-green-100 rounded-lg p-3">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Horário de Funcionamento
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{schedule.day}</span>
                      <span className="text-gray-900">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Nota:</strong> Recomendamos agendar uma visita previamente 
                    entrando em contato conosco por e-mail ou telefone.
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Como Chegar
              </h3>
              
              <InteractiveMap />

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Transporte Público</h4>
                <p className="text-blue-800 text-sm leading-relaxed">
                  O campus é bem servido por transporte público. As linhas de ônibus 
                  que atendem a UnB incluem várias rotas do sistema de transporte do DF. 
                  A estação de metrô mais próxima é a Estação Central (Linha Verde).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Redes Sociais
            </h2>
            <p className="text-xl text-gray-600">
              Siga-nos para acompanhar novidades, pesquisas e eventos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group-hover:scale-105">
                    <div className={`${social.color} rounded-lg p-4 w-fit mb-6 transition-colors`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {social.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {social.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 font-semibold">
                      Visitar
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Colaborar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Seja para parcerias acadêmicas, industriais ou oportunidades de pesquisa, 
            estamos sempre abertos ao diálogo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chat"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-flex items-center justify-center"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Conversar Agora
            </Link>
            
            <a
              href="mailto:lamfo@unb.br"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold inline-flex items-center justify-center"
            >
              <Mail className="mr-2 h-5 w-5" />
              Enviar E-mail
            </a>
            
            <Link
              href="/members"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold inline-flex items-center justify-center"
            >
              <Users className="mr-2 h-5 w-5" />
              Nossa Equipe
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
