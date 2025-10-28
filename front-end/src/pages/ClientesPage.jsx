import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import clienteService from '../services/clienteServices';
import { Link } from 'react-router-dom';

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClientes() {
      try {
        setLoading(true)
        const data = await clienteService.getAll();

        setClientes(data);
        setError(null)
      }catch(err){
        setError(err.message || 'Erro ao buscar clientes.')
        console.error(err)
      }finally {
        setLoading(false)
      }
    }

    fetchClientes();
  }, [])

  if (loading) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Carregando clientes...</p>
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
      <h1 className="text-3xl font-bold mb-4">Lista de Clientes</h1>
      
      {/* TODO: Adicionar um botão de "Novo Cliente" aqui */}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientes.map((cliente) => (
              // Lembre-se da 'key' única para cada item da lista
              <tr key={cliente.id_pessoa}> 
                <td className="px-6 py-4 whitespace-nowrap">{cliente.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap">{cliente.cpf}</td>
                <td className="px-6 py-4 whitespace-nowrap">{cliente.telefone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {/* O Link do React Router para a página de detalhes */}
                  <Link 
                    to={`/clientes/${cliente.id_pessoa}`}
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

export default ClientesPage;