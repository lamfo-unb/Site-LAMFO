"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Instagram,
  Globe,
  ArrowUpRight
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/lamfo-unb", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/lamfo", icon: Linkedin },
    { name: "Instagram", href: "https://www.instagram.com/lamfounb/", icon: Instagram },
    { name: "Site Institucional", href: "https://lamfo.unb.br", icon: Globe },
  ];

  const quickLinks = [
    { name: "Membros", href: "/members" },
    { name: "Projetos", href: "/projects" },
    { name: "Contrate-nos", href: "/budget" },
    { name: "Contato", href: "/contacts" },
  ];

  return (
    <footer className="bg-[var(--navy-900)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.png"
                alt="Logo LAMFO"
                width={120}
                height={48}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-[var(--navy-200)] text-sm leading-relaxed mb-6">
              Think tank da Universidade de Brasília dedicado ao avanço da teoria de IA
              e promoção do uso ético da inteligência artificial na sociedade.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-[var(--navy-200)] hover:bg-white/15 hover:text-white transition-all duration-200"
                    aria-label={link.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Rapidos */}
          <div>
            <h3 className="text-sm font-semibold font-[family-name:var(--font-outfit)] uppercase tracking-wider text-[var(--navy-300)] mb-4">
              Navegação
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--navy-200)] hover:text-white transition-colors duration-200 text-sm flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold font-[family-name:var(--font-outfit)] uppercase tracking-wider text-[var(--navy-300)] mb-4">
              Contato
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[var(--navy-400)] mt-1 flex-shrink-0" />
                <div className="text-sm text-[var(--navy-200)] leading-relaxed">
                  <p>Universidade de Brasília (UnB)</p>
                  <p>Faculdade de Economia, Administração e Contabilidade (FACE)</p>
                  <p>Campus Darcy Ribeiro - Asa Norte, Brasília-DF</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[var(--navy-400)] flex-shrink-0" />
                <a
                  href="mailto:lamfo@unb.br"
                  className="text-sm text-[var(--navy-200)] hover:text-white transition-colors duration-200"
                >
                  lamfo@unb.br
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[var(--navy-400)] flex-shrink-0" />
                <span className="text-sm text-[var(--navy-200)]">+55 (61) 3107-0755</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-5 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[var(--navy-400)]">
              &copy; {currentYear} LAMFO &mdash; Universidade de Brasília. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
