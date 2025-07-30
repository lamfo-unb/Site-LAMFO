"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Text, X } from "lucide-react";
import { Transition } from "@headlessui/react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/">
            <span className="sr-only">LAMFO</span>
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={40}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Abra o menu</span>
            <Text />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="/chat" className="text-sm font-semibold text-gray-900">Chatbot</Link>
          <Link href="#" className="text-sm font-semibold text-gray-900">Informações sobre o PSEL</Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Transition
        show={mobileMenuOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-full"
      >
        <div className="lg:hidden fixed inset-0 z-10 bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 overflow-y-auto">
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <X />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="space-y-2">
              <Link href="#" className="block px-4 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>PSEL</Link>
            </div>
          </div>
        </div>
      </Transition>
    </header>
  );
}