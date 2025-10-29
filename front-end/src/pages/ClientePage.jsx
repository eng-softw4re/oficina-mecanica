import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteService from '../services/clienteServices';

function ClienteDetailPage() {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    async function fetchClientes() {
      try {
        const token = localStorage.getItem("authToken")
        const response = await clienteService.getCliente(token, id);
        console.log(response)
        setLoading(true)
        setCliente(response);
        setError(null)
      }catch(err){
        setError(err.message || 'Erro ao buscar cliente.')
        console.error(err)
      }finally {
        setLoading(false)
      }
    }
    fetchClientes();
  }, [id])

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
    <div className="container mx-auto p-6 max-w-2xl">
      <Link 
        to="/clientes" 
        className="mb-6 inline-block text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
      >
        &larr; Voltar para a lista de clientes
      </Link>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{cliente.data.nome}</h1>
        
        <div className="space-y-3 mb-6">
          <p>
            <span className="font-semibold text-gray-600">CPF:</span> 
            <span className="ml-2 text-gray-800">{cliente.data.cpf}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Telefone:</span> 
            <span className="ml-2 text-gray-800">{cliente.data.telefone || 'Não informado'}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Data de Nascimento:</span> 
            <span className="ml-2 text-gray-800">{cliente.data.data_nascimento || 'Não informada'}</span>
          </p>
        </div>

        {cliente.data.endereco ? (
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Endereço</h2>
            <p className="text-gray-800">
              {cliente.data.endereco.rua}, {cliente.data.endereco.numero}
            </p>
            <p className="text-gray-600">
              {cliente.data.endereco.bairro}, {cliente.data.endereco.cidade}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 italic">Endereço não cadastrado.</p>
        )}
      </div>
    </div>
  );
}

export default ClienteDetailPage;