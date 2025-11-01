import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import veiculoService from '../services/veiculoServices';
import styles from './DetalhesPage.module.css'; 

function ProcedimentoDetailPage() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  
  const [veiculo, setVeiculo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVeiculo() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        const response = await veiculoService.getVeiculo(token, id);
        console.log("Resposta da API para getVeiculo:", response);
        setVeiculo(response); 
      } catch(err) {
        setError(err.message || 'Erro ao buscar dados do veículo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchVeiculo();
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
        <p style={{ textAlign: 'center', color: 'red' }}>Erro: {error}</p>
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

  return (
    <div className={styles.container}>
      
      {/* Botão Voltar (usando o <button> original com o estilo do css module) */}
      <button 
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
        <span className={styles.backIcon}>&larr;</span> Voltar
      </button>

      {/* Título com Marca e Modelo */}
      <h1 className={styles.header}>
        {veiculo.marca} {veiculo.modelo}
      </h1>

      {/* Seção de Detalhes do Veículo */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Informações do Veículo</h2>
        
        {/* Use o padrão 'infoItem' / 'infoLabel' do seu outro componente */}
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Placa:</span> {veiculo.placa}
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Cor:</span> {veiculo.cor}
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Tipo:</span> {veiculo.tipo}
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Marca:</span> {veiculo.marca}
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Modelo:</span> {veiculo.modelo}
        </div>
        {/* Adicione outros campos aqui... */}

      </div>
      
      {/* Seção de Botões de Ação */}
      <div className={styles.buttonsContainer}>
        <Link 
          to={`/veiculos/editar/${id}`} // Rota para a futura página de edição
          className={`${styles.button} ${styles.edit}`}
        >
          Editar
        </Link>
        
        <button 
          onClick={() => {/* TODO: Lógica para excluir o VEÍCULO */}}
          className={`${styles.button} ${styles.exclude}`}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default ProcedimentoDetailPage;
