import React, { useEffect, useState } from 'react';
import ProcedimentoService from '../services/procedimentoServices';
import { Link } from 'react-router-dom';
import procedimentoService from '../services/procedimentoServices';

function ProcedimentosPage() {
  const [procedimentos, setProcedimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProcedimentos() {
      try {
        const token = localStorage.getItem("authToken")
        const response = await procedimentoService.getAll(token);
        
        setLoading(true)
        setProcedimentos(response);
        setError(null)
      }catch(err){
        setError(err.message || 'Erro ao buscar procedimentos.')
        console.error(err)
      }finally {
        setLoading(false)
      }
    }

    fetchProcedimentos();
  }, [])

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
      <h1 className="text-3xl font-bold mb-4">Lista de Procedimentos</h1>
      
      {/* TODO: Adicionar um botão de "Novo Cliente" aqui */}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempo Estimado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {procedimentos.map((procedimento) => (
              // Lembre-se da 'key' única para cada item da lista
              <tr key={procedimento.id}> 
                <td className="px-6 py-4 font-medium text-gray-900">{procedimento.nome}</td>
                <td className="px-6 py-4 text-gray-700">{procedimento.valor}</td>
                <td className="px-6 py-4 text-gray-700">{procedimento.tempo_estimado}</td>
                <td className="px-6 py-4 text-right">
                  {/* O Link do React Router para a página de detalhes */}
                  <Link 
                    to={`/procedimentos/${procedimento.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Ver Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProcedimentosPage;