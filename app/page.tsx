"use client";

import React, { useState } from 'react';

// Tipagem para os agendamentos (CRUD)
interface Agendamento {
  id: number;
  cliente: string;
  servico: string;
  data: string;
  status: 'Pendente' | 'Confirmado' | 'Pago';
}

export default function Home() {
  // Estados para o CRUD de Agendamentos
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([
    { id: 1, cliente: 'Maria Silva', servico: 'Massagem Relaxante', data: '2026-11-10 14:00', status: 'Confirmado' },
    { id: 2, cliente: 'João Santos', servico: 'Limpeza de Pele', data: '2026-11-11 10:00', status: 'Pendente' }
  ]);

  const [novoCliente, setNovoCliente] = useState('');
  const [novoServico, setNovoServico] = useState('Massagem Relaxante');
  const [novaData, setNovaData] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // Estados para o Modal de Pagamento Pix
  const [modalPixAberto, setModalPixAberto] = useState(false);
  const [pagamentoConcluido, setPagamentoConcluido] = useState(false);

  // Funções do CRUD
  const adicionarOuEditarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoCliente || !novaData) return;

    if (editandoId !== null) {
      // Atualizar registo existente
      setAgendamentos(agendamentos.map(item => 
        item.id === editandoId ? { ...item, cliente: novoCliente, servico: novoServico, data: novaData } : item
      ));
      setEditandoId(null);
    } else {
      // Criar novo registo
      const novo: Agendamento = {
        id: Date.now(),
        cliente: novoCliente,
        servico: novoServico,
        data: novaData,
        status: 'Pendente'
      };
      setAgendamentos([...agendamentos, novo]);
    }

    setNovoCliente('');
    setNovaData('');
  };

  const iniciarEdicao = (item: Agendamento) => {
    setEditandoId(item.id);
    setNovoCliente(item.cliente);
    setNovoServico(item.servico);
    setNovaData(item.data);
  };

  const excluirAgendamento = (id: number) => {
    setAgendamentos(agendamentos.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-rose-50 text-gray-800 font-sans">
      {/* Cabeçalho */}
      <header className="bg-white shadow-sm p-6 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-rose-600 tracking-tight">
          SPA Ana Paula
        </h1>
        <nav className="hidden md:flex gap-6 font-medium text-gray-600">
          <a href="#inicio" className="hover:text-rose-500 transition-colors">Início</a>
          <a href="#servicos" className="hover:text-rose-500 transition-colors">Serviços</a>
          <a href="#painel" className="hover:text-rose-500 transition-colors font-semibold text-rose-600">Painel CRUD</a>
          <a href="#pagamento" className="hover:text-rose-500 transition-colors">Pagamento Pix</a>
        </nav>
      </header>

      <main>
        {/* Seção Principal (Hero) */}
        <section id="inicio" className="py-20 px-6 text-center bg-white">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Renove seu Corpo e Alma
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Oferecemos tratamentos estéticos e relaxantes com tecnologia de ponta e profissionais qualificados para o seu bem-estar completo.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a 
              href="https://wa.me/5581900000000?text=Olá! Gostaria de agendar uma consulta no SPA Ana Paula." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-all hover:scale-105 inline-block"
            >
              Agendar via WhatsApp
            </a>
            <a 
              href="#painel"
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md transition-all hover:scale-105 inline-block"
            >
              Gerenciar Sistema (CRUD)
            </a>
          </div>
        </section>

        {/* Seção de Serviços */}
        <section id="servicos" className="py-16 px-6 max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nossos Serviços
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">💆‍♀️</div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Massagem Relaxante</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Alivie a tensão muscular e o estresse com técnicas exclusivas de relaxamento profundo.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✨</div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Limpeza de Pele</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Tratamento facial revitalizante para remover impurezas e iluminar a pele.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">🔬</div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Estética Avançada</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Procedimentos de alta tecnologia voltados para resultados duradouros e seguros.</p>
            </div>
          </div>
        </section>

        {/* Painel CRUD Funcional */}
        <section id="painel" className="py-16 px-6 max-w-5xl mx-auto bg-white rounded-3xl shadow-sm my-10 border border-gray-100">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Painel de Gestão (CRUD de Agendamentos)
          </h3>

          {/* Formulário de Cadastro / Edição */}
          <form onSubmit={adicionarOuEditarAgendamento} className="bg-rose-50/50 p-6 rounded-2xl mb-10 grid md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Nome do Cliente</label>
              <input 
                type="text" 
                value={novoCliente} 
                onChange={(e) => setNovoCliente(e.target.value)} 
                placeholder="Ex: Ana Souza" 
                required
                className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Serviço</label>
              <select 
                value={novoServico} 
                onChange={(e) => setNovoServico(e.target.value)}
                className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500"
              >
                <option value="Massagem Relaxante">Massagem Relaxante</option>
                <option value="Limpeza de Pele">Limpeza de Pele</option>
                <option value="Estética Avançada">Estética Avançada</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Data e Hora</label>
              <input 
                type="datetime-local" 
                value={novaData} 
                onChange={(e) => setNovaData(e.target.value)} 
                required
                className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold p-3 rounded-xl text-sm shadow-md transition-all"
              >
                {editandoId !== null ? 'Atualizar Registo' : 'Adicionar Agendamento'}
              </button>
            </div>
          </form>

          {/* Tabela de Registos */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Serviço</th>
                  <th className="p-4">Data/Hora</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {agendamentos.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="p-4 font-medium text-gray-900">{item.cliente}</td>
                    <td className="p-4 text-gray-600">{item.servico}</td>
                    <td className="p-4 text-gray-600">{item.data}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-center space-x-2">
                      <button 
                        onClick={() => iniciarEdicao(item)}
                        className="text-blue-600 hover:underline font-medium text-xs bg-blue-50 px-3 py-1 rounded-lg"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => excluirAgendamento(item.id)}
                        className="text-red-600 hover:underline font-medium text-xs bg-red-50 px-3 py-1 rounded-lg"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
                {agendamentos.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400">Nenhum agendamento registado no sistema.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Seção de Pagamento via Pix */}
        <section id="pagamento" className="py-16 px-6 max-w-4xl mx-auto text-center">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Pagamento Instantâneo via Pix</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Simule o pagamento rápido e seguro dos seus tratamentos estéticos diretamente pelo sistema.
            </p>
            <button 
              onClick={() => { setModalPixAberto(true); setPagamentoConcluido(false); }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-md transition-all hover:scale-105"
            >
              Gerar QR Code Pix
            </button>
          </div>
        </section>
      </main>

      {/* Modal do Pix */}
      {modalPixAberto && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-3xl max-w-md w-full text-center relative shadow-2xl">
            <button 
              onClick={() => setModalPixAberto(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
            >
              ✕
            </button>

            <h4 className="text-2xl font-bold text-gray-800 mb-2">Escaneie o QR Code Pix</h4>
            <p className="text-sm text-gray-500 mb-6">Valor: <strong className="text-gray-800">R$ 150,00</strong></p>

            {!pagamentoConcluido ? (
              <>
                <div className="bg-gray-100 p-6 rounded-2xl mb-6 inline-block border border-gray-200">
                  {/* Simulação visual de QR Code */}
                  <div className="w-48 h-48 bg-gray-900 mx-auto rounded-xl flex items-center justify-center text-white text-xs font-mono p-4 text-center">
                    [QR CODE PIX DINÂMICO SPA ANA PAULA]
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-6 font-mono break-all bg-gray-50 p-2 rounded-lg">
                  00020126580014br.gov.bcb.pix...
                </p>
                <button 
                  onClick={() => setPagamentoConcluido(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-md"
                >
                  Simular Pagamento Aprovado
                </button>
              </>
            ) : (
              <div className="py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                  ✓
                </div>
                <h5 className="text-xl font-bold text-green-700 mb-2">Pagamento Aprovado com Sucesso!</h5>
                <p className="text-sm text-gray-500 mb-6">Obrigado. O seu recibo foi gerado e enviado ao sistema.</p>
                <button 
                  onClick={() => setModalPixAberto(false)}
                  className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-2.5 rounded-xl text-sm"
                >
                  Fechar Janela
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Rodapé */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-12">
        <p>&copy; {new Date().getFullYear()} SPA Ana Paula. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}