import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Projetos de Pesquisa | LAMFO",
  description: "Conheça os projetos de pesquisa desenvolvidos pelo LAMFO, abrangendo desde machine learning em finanças até análise de redes financeiras.",
  keywords: ["LAMFO", "projetos", "pesquisa", "machine learning", "finanças", "UnB"],
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
