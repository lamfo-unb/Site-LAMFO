import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from '@/components/admin/Sidebar';

export const metadata = {
  title: 'Admin | LAMFO',
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userRole={user.role} />
      <div className="ml-60">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div />
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{user.email}</span>
            <span className="text-xs bg-[var(--navy-100)] text-[var(--navy-700)] px-2 py-1 rounded-full font-semibold">
              {user.role}
            </span>
          </div>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
