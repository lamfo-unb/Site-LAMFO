"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Mail, 
  Phone, 
  ExternalLink,
  Github,
  Linkedin,
  Globe
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/lamfo-unb",
      icon: Github,
      external: true
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/lamfo-unb",
      icon: Linkedin,
      external: true
    },
    {
      name: "Site Institucional",
      href: "https://lamfo.unb.br",
      icon: Globe,
      external: true
    }
  ];

  const quickLinks = [
    { name: "Chatbot", href: "/chat" },
    { name: "Membros", href: "/members" },
    { name: "Projetos", href: "/projects" },
    { name: "Processo Seletivo", href: "#" }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: "Endereço",
      content: [
        "Universidade de Brasília (UnB)",
        "Faculdade de Economia, Administração e Contabilidade (FACE)",
        "Campus Darcy Ribeiro - Asa Norte",
        "Brasília, DF - CEP: 70910-900"
      ]
    },
    {
      icon: Mail,
      label: "E-mail",
      content: ["lamfo@unb.br"],
      link: "mailto:lamfo@unb.br"
    },
    {
      icon: Phone,
      label: "Telefone",
      content: ["+55 (61) 3107-0755"]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.png"
                alt="Logo LAMFO"
                width={120}
                height={48}
                className="h-12 w-auto filter brightness-0 invert"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Laboratório de Aprendizagem de Máquinas em Finanças e Organizações da 
              Universidade de Brasília, focado em pesquisa e desenvolvimento em 
              machine learning aplicado ao setor financeiro.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-800"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span>{link.name}</span>
                    {link.href.startsWith('#') && (
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium text-sm mb-1">{info.label}</p>
                      {info.link ? (
                        <Link
                          href={info.link}
                          className="text-gray-300 hover:text-white transition-colors text-sm"
                        >
                          {info.content[0]}
                        </Link>
                      ) : (
                        <div className="space-y-1">
                          {info.content.map((line, lineIndex) => (
                            <p key={lineIndex} className="text-gray-300 text-sm">
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>© {currentYear} LAMFO - Laboratório de Aprendizagem de Máquinas em Finanças e Organizações</p>
              <p className="mt-1">Universidade de Brasília. Todos os direitos reservados.</p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
