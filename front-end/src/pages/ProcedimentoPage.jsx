import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import procedimentoService from '../services/procedimentoServices';
// Esta importação está correta
import styles from './DetalhesPage.module.css'; 

function ProcedimentoDetailPage() {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Note: Seu serviço parece retornar { data: {...} }
  const [procedimento, setProcedimento] = useState(null); 

  useEffect(() => {
    async function fetchProcedimento() { // Renomeado para singular
      try {
        const token = localStorage.getItem("authToken");
        // Não defina 'loading' como true aqui dentro, só no início
        const response = await procedimentoService.getProcedimento(token, id);
        console.log(response);
        setProcedimento(response.data); // Assumindo que os dados estão em response.data
        setError(null);
      } catch(err) {
        setError(err.message || 'Erro ao buscar procedimento.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProcedimento();
  }, [id]);

  if (loading) {
    // Vamos usar o 'container' para centralizar o loading
    return (
      <div className={styles.container}>
        <p style={{ textAlign: 'center' }}>Carregando procedimento...</p>
      </div>
    );
  }

  if (error) {
    // E o 'container' para centralizar o erro
    return (
      <div className={styles.container}>
        <p style={{ textAlign: 'center', color: 'red' }}>Erro: {error}</p>
      </div>
    );
  }

  // Se o cliente não for encontrado após o loading
  if (!procedimento) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: 'center' }}>Procedimento não encontrado.</p>
      </div>
    );
  }

  // === ESTE É O JSX CORRIGIDO ===
  // (Ele usa as classes do CSS que fizemos antes)
  return (
    // Removi o 'styles.background', pois o 'home-content' do App.jsx
    // já faz o espaçamento e o 'styles.container' é a caixa branca.
    <div className={styles.container}>
      
      {/* Botão de voltar */}
      <Link to="/procedimentos" className={styles.backButton}>
        <span className={styles.backIcon}>&larr;</span> Voltar para Procedimentos
      </Link>

      <h1 className={styles.header}>
        {procedimento.nome}
      </h1>

      {/* Seção de Informações Pessoais */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Detalhamento:</h2>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>ID:</span>
          {procedimento.id}
        </div>

        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Valor:</span>
          {procedimento.valor}
        </div>

        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Tempo Estimado:</span>
          {procedimento.tempo_estimado}
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Descrição:</span>
          {procedimento.descricao}
        </div>
      </div>

      {/* Botões de Ação */}
      <div className={styles.buttonsContainer}>
        <button className={`${styles.button} ${styles.edit}`}>Editar</button>
        <button className={`${styles.button} ${styles.exclude}`}>Excluir</button>
      </div>
    </div>
  );
}

export default ProcedimentoDetailPage;