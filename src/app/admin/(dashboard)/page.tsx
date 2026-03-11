import { fetchMembers, fetchProjects } from '@/lib/api-client';
import { getCurrentUser, getToken } from '@/lib/auth';
import { fetchWorkshops } from '@/lib/api-client';
import { Users, FolderOpen, Wrench, Briefcase } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  const token = await getToken();

  const [members, projects] = await Promise.all([
    fetchMembers(),
    fetchProjects(),
  ]);

  let workshopCount = 0;
  if (token) {
    try {
      const workshops = await fetchWorkshops(token);
      workshopCount = workshops.length;
    } catch {
      workshopCount = 0;
    }
  }

  const stats = [
    { label: 'Membros', value: members.length, icon: Users, href: '/admin/members', color: 'bg-blue-50 text-blue-600' },
    { label: 'Projetos', value: projects.length, icon: FolderOpen, href: '/admin/projects', color: 'bg-green-50 text-green-600' },
    { label: 'Oficinas', value: workshopCount, icon: Wrench, href: '/admin/workshops', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Bem-vindo, {user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <a
              key={stat.label}
              href={stat.href}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-[family-name:var(--font-outfit)] text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
