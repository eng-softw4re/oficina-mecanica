import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ordemService from '../services/ordemServices';

function OrdensPage() {
  const [ordens, setOrdens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrdens() {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");
        const response = await ordemService.getAll(token);
        setOrdens(response);

      } catch(err) {
        setError(err.message || 'Erro ao buscar Ordens de Serviços.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrdens();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Carregando Ordens de Serviços...</p>
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
      <h1 className="text-3xl font-bold mb-4">Lista de Ordens de Serviços</h1>
      
      {/* TODO: Adicionar um botão de "Novo Cliente" aqui */}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veículo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ordens.map((ordem) => (
              // Lembre-se da 'key' única para cada item da lista
              <tr key={ordem.id}> 
                <td className="px-6 py-4 text-gray-700">{ordem.veiculo}</td>
                <td className="px-6 py-4 text-gray-700">{ordem.data}</td>
                <td className="px-6 py-4 text-right">
                  {/* O Link do React Router para a página de detalhes */}
                  <Link 
                    to={`/ordem-de-servicos/${ordem.id}`}
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

export default OrdensPage;