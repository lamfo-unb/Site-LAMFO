// components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-3 py-3 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="cursor-pointer"
          />
        </Link>
        <nav className="space-x-4">
          <Link href="https://bit.ly/444Xv76" className="text-gray-700 hover:text-black font-bold">Formulário Processo Seletivo</Link>
        </nav>
      </div>
    </header>
  );
}
