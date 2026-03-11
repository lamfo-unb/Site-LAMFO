'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Wrench,
  Briefcase,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  userRole: 'ADMIN' | 'INTERNAL';
}

const allNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'INTERNAL'] },
  { href: '/admin/members', label: 'Membros', icon: Users, roles: ['ADMIN'] },
  { href: '/admin/projects', label: 'Projetos', icon: FolderOpen, roles: ['ADMIN'] },
  { href: '/admin/workshops', label: 'Oficinas', icon: Wrench, roles: ['ADMIN', 'INTERNAL'] },
  { href: '/admin/cargos', label: 'Cargos', icon: Briefcase, roles: ['ADMIN'] },
];

export default function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();

  const navItems = allNavItems.filter((item) => item.roles.includes(userRole));

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[var(--navy-900)] text-white flex flex-col z-30">
      <div className="p-5 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="text-lg font-bold font-[family-name:var(--font-outfit)]">LAMFO</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200 mb-1"
        >
          Ver site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-red-300 hover:bg-white/10 transition-colors duration-200"
        >
          <LogOut className="h-4.5 w-4.5" />
          Sair
        </button>
      </div>
    </aside>
  );
}
