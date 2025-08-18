"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, Info, Users, FolderOpen } from "lucide-react";
import { Transition } from "@headlessui/react";

const navigation = [
  { name: 'Chatbot', href: '/chat', icon: MessageCircle },
  { name: 'Membros', href: '/members', icon: Users },
  { name: 'Informações sobre o PSEL', href: '#', icon: Info },
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
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Navegação principal">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <span className="sr-only">LAMFO - Página inicial</span>
            <Image
              src="/logo.png"
              alt="Logo LAMFO"
              width={100}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Abrir menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 text-sm font-semibold transition-colors px-3 py-2 rounded-md ${
                  isActivePage(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-900 hover:text-blue-600 hover:bg-gray-50'
                }`}
                aria-current={isActivePage(item.href) ? 'page' : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.name}</span>
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
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 shadow-xl ring-1 ring-gray-900/10"
            >
              <div className="flex items-center justify-between">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center">
                  <Image
                    src="/logo.png"
                    alt="Logo LAMFO"
                    width={80}
                    height={32}
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span className="sr-only">Fechar menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="mt-8 flow-root">
                <div className="space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center space-x-3 px-4 py-3 text-base font-semibold rounded-md transition-colors ${
                          isActivePage(item.href)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-900 hover:bg-gray-50'
                        }`}
                        aria-current={isActivePage(item.href) ? 'page' : undefined}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
                
                {/* Footer info no menu mobile */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    Laboratório de Aprendizagem de Máquinas<br />em Finanças e Organizações
                  </p>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </header>
  );
}