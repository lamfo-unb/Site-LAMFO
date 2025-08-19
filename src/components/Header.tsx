"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, Users, FolderOpen, Phone, Calculator } from "lucide-react";
import { Transition } from "@headlessui/react";

const navigation = [
  { name: 'Chatbot', href: '/chat', icon: MessageCircle },
  { name: 'Membros', href: '/members', icon: Users },
  { name: 'Projetos', href: '/projects', icon: FolderOpen },
  { name: 'Contrate-nos', href: '/budget', icon: Calculator },
  { name: 'Contato', href: '/contacts', icon: Phone },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o menu mobile quando a rota muda
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Fecha o menu mobile com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Previne scroll do body quando menu está aberto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const isActivePage = (href: string) => pathname === href;

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Navegação principal">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-all duration-200 group">
            <span className="sr-only">LAMFO - Página inicial</span>
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Logo LAMFO"
                width={100}
                height={40}
                priority
                className="h-12 w-auto transition-all duration-200 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 rounded-lg transition-all duration-200"></div>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="relative -m-2.5 inline-flex items-center justify-center rounded-xl p-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-200 group"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Abrir menu</span>
            <Menu className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-200"></div>
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-2 items-center">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isBudgetButton = item.href === '/budget';
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center space-x-2 text-sm font-semibold transition-all duration-200 px-4 py-3 rounded-xl ${
                  isBudgetButton
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 border border-blue-600'
                    : isActivePage(item.href)
                    ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 shadow-sm'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 border border-transparent hover:border-blue-200/30 hover:shadow-sm'
                }`}
                aria-current={isActivePage(item.href) ? 'page' : undefined}
              >
                <Icon className={`h-4 w-4 transition-all duration-200 ${
                  isBudgetButton ? 'group-hover:scale-110' : 'group-hover:scale-105'
                }`} aria-hidden="true" />
                <span className="transition-all duration-200">{item.name}</span>
                {!isBudgetButton && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-200 -z-10"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu */}
      <Transition
        show={mobileMenuOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/25"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          
          {/* Menu Panel */}
          <Transition
            show={mobileMenuOpen}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
          >
            <div
              id="mobile-menu"
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white/95 backdrop-blur-sm px-6 py-6 shadow-2xl ring-1 ring-gray-900/10"
            >
              <div className="flex items-center justify-between">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center group">
                  <div className="relative">
                    <Image
                      src="/logo.png"
                      alt="Logo LAMFO"
                      width={80}
                      height={32}
                      className="h-10 w-auto transition-all duration-200 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 rounded-lg transition-all duration-200"></div>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="relative -m-2.5 rounded-xl p-3 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-600 transition-all duration-200 group"
                >
                  <span className="sr-only">Fechar menu</span>
                  <X className="h-6 w-6 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-90" aria-hidden="true" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-pink-600/0 group-hover:from-red-600/5 group-hover:to-pink-600/5 transition-all duration-200"></div>
                </button>
              </div>
              
              <div className="mt-10 flow-root">
                <div className="space-y-3">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isBudgetButton = item.href === '/budget';
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`group relative flex items-center space-x-4 px-5 py-4 text-base font-semibold rounded-xl transition-all duration-200 ${
                          isBudgetButton
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                            : isActivePage(item.href)
                            ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 shadow-sm'
                            : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-purple-50/80 hover:text-blue-600 border border-transparent hover:border-blue-200/30 hover:shadow-sm'
                        }`}
                        aria-current={isActivePage(item.href) ? 'page' : undefined}
                      >
                        <Icon className={`h-6 w-6 transition-all duration-200 ${
                          isBudgetButton ? 'group-hover:scale-110' : 'group-hover:scale-105'
                        }`} aria-hidden="true" />
                        <span className="transition-all duration-200">{item.name}</span>
                        {!isBudgetButton && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-200 -z-10"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
                
                {/* Footer info no menu mobile */}
                <div className="mt-10 pt-8 border-t border-gradient-to-r from-gray-200 via-blue-200 to-purple-200">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200/30">
                    <p className="text-sm text-gray-600 text-center font-medium leading-relaxed">
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                        Laboratório de Aprendizagem de Máquinas
                      </span>
                      <br />
                      <span className="text-gray-500">em Finanças e Organizações</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </header>
  );
}