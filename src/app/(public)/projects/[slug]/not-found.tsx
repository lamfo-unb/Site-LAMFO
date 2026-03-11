import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full text-center px-4">
        <div className="mb-8">
          <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Projeto não encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            O projeto que você está procurando não existe ou foi removido.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Search className="h-4 w-4 mr-2" />
            Ver todos os projetos
          </Link>
          
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
