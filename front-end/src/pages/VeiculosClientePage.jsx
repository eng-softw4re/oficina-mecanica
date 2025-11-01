import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import veiculoService from '../services/veiculoServise';

function VeiculosClientePage() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // O hook useParams() pega o ':id' que definimos na rota
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVeiculos() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        // Chama a nova função do serviço, passando o token e o ID do cliente
        const response = await veiculoService.getVeiculosPorCliente(token, id);
        
        setVeiculos(response); 
      } catch(err) {
        setError(err.message || 'Erro ao buscar veículos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchVeiculos();
  }, [id]); // Rode o efeito se o 'id' mudar

  if (loading) {
    return <div className="p-4 text-center"><p className="text-gray-500">Carregando veículos...</p></div>;
  }

  if (error) {
    return <div className="p-4 text-center"><p className="text-red-500">Erro: {error}</p></div>;
  }

  return (
    <div className="container mx-auto p-4">
      
      <div className="flex justify-between items-center mb-6">
        {/* TODO: Você pode querer buscar o nome do cliente e mostrar aqui */}
        <h1 className="text-3xl font-bold">Veículos do Cliente</h1>
        {/*
        <Link 
          to={`/veiculos/cadastrar?cliente_id=${id}`} // Link para cadastrar um novo veículo PARA ESSE CLIENTE
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg"
        >
          Cadastrar Veículo
        </Link>
        */}
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Ajuste os cabeçalhos para os campos do seu modelo 'Veiculo' */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marca</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modelo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Placa</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {veiculos.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  Nenhum veículo cadastrado para este cliente.
                </td>
              </tr>
            ) : (
              veiculos.map((veiculo) => (
                <tr key={veiculo.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{veiculo.marca}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{veiculo.modelo}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono">{veiculo.tipo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{veiculo.cor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{veiculo.placa}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Link 
                      to={`/veiculos/${veiculo.id}`} // Link para detalhes DO VEÍCULO
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Ver Detalhes
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate(-1)} // Botão para voltar para a página anterior (detalhes do cliente)
        className="mt-6 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow-lg"
      >
        Voltar
      </button>
    </div>
  );
}

export default VeiculosClientePage;