"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Users, FolderOpen, Phone, Calculator } from "lucide-react";
import { Transition } from "@headlessui/react";

const navigation = [
  { name: 'Membros', href: '/members', icon: Users },
  { name: 'Projetos', href: '/projects', icon: FolderOpen },
  { name: 'Contrate-nos', href: '/budget', icon: Calculator },
  { name: 'Contato', href: '/contacts', icon: Phone },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
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
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[var(--border)]'
        : 'bg-white border-b border-transparent'
    }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-8" aria-label="Navegacao principal">
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-200">
            <span className="sr-only">LAMFO - Pagina inicial</span>
            <Image
              src="/logo.png"
              alt="Logo LAMFO"
              width={120}
              height={48}
              priority
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-[var(--foreground)] hover:bg-[var(--surface-subtle)] transition-colors duration-200"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Abrir menu</span>
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-x-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isBudgetButton = item.href === '/budget';

            if (isBudgetButton) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 ml-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-[family-name:var(--font-outfit)] bg-[var(--green-500)] text-white hover:bg-[var(--green-600)] transition-colors duration-200 shadow-sm"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{item.name}</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                  isActivePage(item.href)
                    ? 'text-[var(--navy-600)] bg-[var(--navy-50)]'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]'
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
          <div
            className="fixed inset-0 z-50 bg-[var(--navy-900)]/30 backdrop-blur-sm"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

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
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <Link href="/" onClick={closeMobileMenu}>
                  <Image src="/logo.png" alt="Logo LAMFO" width={100} height={40} className="h-9 w-auto" />
                </Link>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="rounded-lg p-2.5 text-[var(--muted)] hover:bg-[var(--surface-subtle)] transition-colors duration-200"
                >
                  <span className="sr-only">Fechar menu</span>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-10 flow-root">
                <div className="space-y-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isBudgetButton = item.href === '/budget';

                    if (isBudgetButton) {
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-3 px-4 py-3.5 text-base font-semibold font-[family-name:var(--font-outfit)] rounded-lg bg-[var(--green-500)] text-white hover:bg-[var(--green-600)] transition-colors duration-200"
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center gap-3 px-4 py-3.5 text-base font-medium rounded-lg transition-colors duration-200 ${
                          isActivePage(item.href)
                            ? 'text-[var(--navy-600)] bg-[var(--navy-50)]'
                            : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]'
                        }`}
                        aria-current={isActivePage(item.href) ? 'page' : undefined}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-10 pt-8 border-t border-[var(--border)]">
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    <span className="font-semibold text-[var(--foreground)]">LAMFO</span>
                    <br />
                    Laboratório de Aprendizagem de Máquinas em Finanças e Organizações
                  </p>
                  <p className="text-xs text-[var(--muted)] mt-2">Universidade de Brasília</p>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </header>
  );
}
