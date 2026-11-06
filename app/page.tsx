import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-rose-50 text-gray-800 font-sans">
      {/* Cabeçalho */}
      <header className="bg-white shadow-sm p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-rose-600 tracking-tight">
          SPA Ana Paula
        </h1>
        <nav className="hidden md:flex gap-6 font-medium text-gray-600">
          <a href="#servicos" className="hover:text-rose-500 transition-colors">Serviços</a>
          <a href="#sobre" className="hover:text-rose-500 transition-colors">Sobre Nós</a>
          <a href="#contato" className="hover:text-rose-500 transition-colors">Contato</a>
        </nav>
      </header>

      <main>
        {/* Seção Principal (Hero) */}
        <section className="py-24 px-6 text-center bg-white">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Renove seu Corpo e Alma
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Oferecemos tratamentos estéticos e relaxantes com tecnologia de ponta e profissionais qualificados para o seu bem-estar completo.
          </p>
          <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-all hover:scale-105">
            Agendar Consulta
          </button>
        </section>

        {/* Seção de Serviços */}
        <section id="servicos" className="py-20 px-6 max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nossos Serviços
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Cartão de Serviço 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                💆‍♀️
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Massagem Relaxante</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Alivie a tensão muscular e o estresse do dia a dia com nossas técnicas exclusivas de relaxamento profundo.
              </p>
            </div>

            {/* Cartão de Serviço 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                ✨
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Limpeza de Pele</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tratamento facial revitalizante para remover impurezas, promovendo uma pele hidratada e iluminada.
              </p>
            </div>

            {/* Cartão de Serviço 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                🔬
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Estética Avançada</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Procedimentos de alta tecnologia voltados para resultados estéticos duradouros e seguros.
              </p>
            </div>

          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-10">
        <p>&copy; {new Date().getFullYear()} SPA Ana Paula. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}