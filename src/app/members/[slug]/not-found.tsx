import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Membro não encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            O membro que você está procurando não existe ou foi removido.
          </p>
          <Link
            href="/members"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Membros
          </Link>
        </div>
      </div>
    </div>
  );
}
