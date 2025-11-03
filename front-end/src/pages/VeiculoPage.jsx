import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import veiculoService from '../services/veiculoServices';
import ordemService from '../services/ordemServices';
import styles from './DetalhesPage.module.css';

function formatDate(isoString) {
  if (!isoString) return "N/A";
  
  // 1. Pega apenas a parte da data (antes do "T")
  const datePart = isoString.split('T')[0];
  
  // 2. Separa ano, mês e dia
  const parts = datePart.split('-'); // ["2025", "10", "31"]
  
  if (parts.length !== 3) return isoString; // Retorna original se o formato for inesperado
  
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  
  // 3. Remonta no formato brasileiro
  return `${day}/${month}/${year}`;
}


function VeiculoPage() {
  const { id } = useParams();
  const navigate = useNavigate(); 
  
  const [veiculo, setVeiculo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ordens, setOrdens] = useState([]);
  const [loadingOrdens, setLoadingOrdens] = useState(true);
  const [errorOrdens, setErrorOrdens] = useState(null); 

  useEffect(() => {
    async function fetchVeiculo() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        const response = await veiculoService.getVeiculo(token, id);
        setVeiculo(response);
      } catch(err) {
        setError(err.message || 'Erro ao buscar dados do veículo.');
        console.error("Erro detalhado ao buscar veiculo:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchVeiculo();
  }, [id]);

  useEffect(() => {
    async function fetchOrdens() {
      setLoadingOrdens(true);
      setErrorOrdens(null);
      try {
        const token = localStorage.getItem("authToken");
        const response = await ordemService.getOrdensPorVeiculo(token, id);
        setOrdens(response);
      } catch (err) {
        console.error("Erro ao buscar ordens de serviço:", err);
        setErrorOrdens("Falha ao carregar o histórico de O.S.");
      } finally {
        setLoadingOrdens(false);
      }
    }
    
    if (id) {
      fetchOrdens();
    }
  }, [id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: 'center' }}>Carregando dados do veículo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
      </div>
    );
  }

  if (!veiculo) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: 'center' }}>Veículo não encontrado.</p>
      </div>
    );
  }

  const renderTabelaOrdens = () => {
    if (loadingOrdens) {
      return <p style={{ textAlign: 'center', color: '#666' }}>Carregando histórico de ordens...</p>;
    }
    
    if (errorOrdens) {
      return <p style={{ textAlign: 'center', color: 'red' }}>{errorOrdens}</p>;
    }

    
    return (
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Ajuste os nomes dos campos se forem diferentes */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total (R$)</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ordens.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  Nenhuma Ordem de Serviço encontrada para este veículo.
                </td>
              </tr>
            ) : (
              ordens.map((ordem) => (
                <tr key={ordem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(ordem.data)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">true</td>
                  <td className="px-6 py-4 whitespace-nowrap">{ordem.valor_total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Link 
                      to={`/ordens-de-servico/${ordem.id}`} // Link para detalhes DA O.S.
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
      
      {/* Botão Voltar */}
      <button 
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        <span className={styles.backIcon}>&larr;</span> Voltar
      </button>

      {/* Título do Veículo */}
      <h1 className={styles.header}>
        {veiculo.marca} {veiculo.modelo}
      </h1>

      {/* Seção de Detalhes do Veículo (Existente) */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Informações do Veículo</h2>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Placa: {veiculo.placa} </span> 
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Cor: {veiculo.cor}</span> 
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Tipo: {veiculo.tipo}</span> 
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Marca: {veiculo.marca}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Modelo: {veiculo.modelo}</span>
        </div>
      </div>

      {/* Botões de Ação do Veículo (Existentes) */}
      <div className={styles.buttonsContainer}>
        <Link 
          to={`/veiculos/editar/${id}`} 
          className={`${styles.button} ${styles.edit}`}
        >
          Editar Veículo
        </Link>
        
        <button 
          onClick={() => {/* TODO: Lógica para excluir o VEÍCULO */}}
          className={`${styles.button} ${styles.exclude}`}
        >
          Excluir Veículo
        </button>
      </div>

      {/* --- 5. NOVA SEÇÃO DE ORDENS DE SERVIÇO --- */}
      <div className={styles.section}>
        {/* Cabeçalho da nova seção com botão de cadastrar */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={styles.sectionTitle}>Ordens de Serviço do Veículo</h2>
          <Link 
            to={`/ordens-de-servico/cadastrar?veiculo_id=${id}`} 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded shadow-lg text-sm"
          >
          </Link>
        </div>
        
        {/* Chamando a função que renderiza a tabela de O.S. */}
        {renderTabelaOrdens()}
      </div>
    </div>
  );
}

export default VeiculoPage;

