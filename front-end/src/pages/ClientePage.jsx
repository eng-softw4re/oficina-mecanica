import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteService from '../services/clienteServices';
import veiculoService from '../services/veiculoServices';
import styles from './DetalhesPage.module.css'; 

function ClienteDetailPage() {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cliente, setCliente] = useState(null); 
  const [veiculos, setVeiculos] = useState([]);
  const [loadingVeiculos, setLoadingVeiculos] = useState(true);


  useEffect(() => {
    async function fetchCliente() { 
      try {
        const token = localStorage.getItem("authToken");
        const response = await clienteService.getCliente(token, id);
        setCliente(response.data); 
        setError(null);
      } catch(err) {
        setError(err.message || 'Erro ao buscar cliente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCliente();
  }, [id]);

  useEffect(() => {
    async function fetchVeiculos() {
      setLoadingVeiculos(true);
      try {
        const token = localStorage.getItem("authToken");
        const response = await veiculoService.getVeiculosPorCliente(token, id);
        setVeiculos(response);
      } catch (err) {
        console.error("Erro ao buscar veículos:", err);
      } finally {
        setLoadingVeiculos(false);
      }
    }
    
    fetchVeiculos();
  }, [id]);

  if (loading) {
    return (
      <div>
        <p>Carregando clientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Erro: {error}</p>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: 'center' }}>Cliente não encontrado.</p>
      </div>
    );
  }

  console.log(cliente)

  const renderTabelaVeiculos = () => {
    if (loadingVeiculos) {
      return <p className="text-gray-500 text-center py-4">Carregando veículos...</p>;
    }
    
    return (
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
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
                  <td className="px-6 py-4 whitespace-nowrap font-mono">{veiculo.cor}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono">{veiculo.placa}</td>
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
    );
  };

  return (
    <div className={styles.container}>      
      <Link to="/clientes" className={styles.backButton}>
        <span className={styles.backIcon}>&larr;</span> Voltar para Clientes
      </Link>

      <h1 className={styles.header}>
        {cliente.nome}
      </h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>CPF: {cliente.cpf} </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Data de nascimento: {cliente.data_nascimento} </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Telefone: {cliente.telefone} </span>
        </div>

    </div>

      {cliente.endereco ? (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Endereço</h2>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Rua: {cliente.endereco.rua}</span> 
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Número: {cliente.endereco.numero}</span> 
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Bairro: {cliente.endereco.bairro}</span> 
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Cidade: {cliente.endereco.cidade}</span>  
          </div>
        </div>
      ) : (
        <p style={{ fontStyle: 'italic', color: '#888' }}>Endereço não cadastrado.</p>
      )}
      <div className={styles.buttonsContainer}>
        <button className={`${styles.button} ${styles.edit}`}>Editar</button>
        <button className={`${styles.button} ${styles.exclude}`}>Excluir</button>
      </div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className={styles.sectionTitle}>Veículos do Cliente</h2>
          {/*
          <Link 
            to={`/veiculos/cadastrar?cliente_id=${id}`} // Botão para add novo veículo
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded shadow-lg text-sm"
          >
            Adicionar Veículo
          </Link>
          */}
        </div>
        {renderTabelaVeiculos()}
      </div>
    </div>
  );
}

export default ClienteDetailPage;