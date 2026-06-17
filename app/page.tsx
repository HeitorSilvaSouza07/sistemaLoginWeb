import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-lg shadow-2xl p-12 w-full max-w-md text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Bem-vindo</h1>
          <p className="text-gray-600 mb-8">Faça login ou crie uma conta</p>
          <div className="flex flex-col gap-4">
            <a href="/cadastro" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">Criar Conta</a>
            <a href="/login" className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">Entrar</a>
          </div>
        </div>
      </main>
    </div>
  );
}
