import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import procedimentoService from '../services/procedimentoServices'; 

function ProcedimentosPage() {
  const [procedimentos, setProcedimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProcedimentos() {
      setLoading(true); 
      setError(null);

      try {
        const token = localStorage.getItem("authToken");
        const response = await procedimentoService.getAll(token);
        
        setProcedimentos(response); 
      } catch(err) {
        setError(err.message || 'Erro ao buscar procedimentos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProcedimentos();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Carregando procedimentos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lista de Procedimentos</h1>
        
        <Link 
          to="/procedimentos/cadastrar" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-200"
        >
          Cadastrar Procedimento
        </Link>
      </div>

      {/* O container da tabela com sombra e bordas arredondadas */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto"> 
        {/* overflow-x-auto garante que a tabela seja rolável em telas pequenas */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor (R$)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempo Estimado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            
            {/* --- SE NÃO HOUVER PROCEDIMENTOS --- */}
            {procedimentos.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  Nenhum procedimento cadastrado ainda.
                </td>
              </tr>
            ) : (
              procedimentos.map((procedimento) => (
                // Efeito de hover na linha
                <tr key={procedimento.id} className="hover:bg-gray-50 transition duration-150"> 
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{procedimento.nome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{procedimento.valor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{procedimento.tempo_estimado}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{procedimento.descricao}</td>
                  
                  {/* --- BOTÕES DE AÇÃO ESTILIZADOS --- */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Container Flex para alinhar os botões com espaçamento */}
                    <div className="flex justify-end items-center gap-3">

                      {/* --- Botão EDITAR (Amarelo) --- */}
                      <Link 
                        to={`/procedimentos/editar/${procedimento.id}`}
                        className="py-1 px-3 rounded-md text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 shadow-sm transition duration-150"
                      >
                        Editar
                      </Link>

                      {/* --- Botão EXCLUIR (Vermelho) --- */}
                      <button 
                        onClick={() => {/* TODO: Lógica de exclusão */}}
                        className="py-1 px-3 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 shadow-sm transition duration-150"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProcedimentosPage;