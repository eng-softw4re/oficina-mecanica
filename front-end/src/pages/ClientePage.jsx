import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteService from '../services/clienteServices';
// Esta importação está correta
import styles from './ClientePage.module.css'; 

function ClienteDetailPage() {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Note: Seu serviço parece retornar { data: {...} }
  const [cliente, setCliente] = useState(null); 

  useEffect(() => {
    async function fetchCliente() { // Renomeado para singular
      try {
        const token = localStorage.getItem("authToken");
        // Não defina 'loading' como true aqui dentro, só no início
        const response = await clienteService.getCliente(token, id);
        console.log(response);
        setCliente(response.data); // Assumindo que os dados estão em response.data
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

  if (loading) {
    // Vamos usar o 'container' para centralizar o loading
    return (
      <div className={styles.container}>
        <p style={{ textAlign: 'center' }}>Carregando cliente...</p>
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
  if (!cliente) {
    return (
      <div className={styles.container}>
        <p style={{ textAlign: 'center' }}>Cliente não encontrado.</p>
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
      <Link to="/clientes" className={styles.backButton}>
        <span className={styles.backIcon}>&larr;</span> Voltar para Clientes
      </Link>

      <h1 className={styles.header}>
        {cliente.nome}
      </h1>

      {/* Seção de Informações Pessoais */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>CPF:</span>
          {cliente.cpf}
        </div>

        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Telefone:</span>
          {cliente.telefone || 'Não informado'}
        </div>

        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Data de Nascimento:</span>
          {cliente.data_nascimento || 'Não informada'}
        </div>
      </div>

      {/* Seção de Endereço */}
      {cliente.endereco ? (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Endereço</h2>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Rua:</span> {cliente.endereco.rua}, {cliente.endereco.numero}
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Bairro:</span> {cliente.endereco.bairro}
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Cidade:</span> {cliente.endereco.cidade}
          </div>
        </div>
      ) : (
        <p style={{ fontStyle: 'italic', color: '#888' }}>Endereço não cadastrado.</p>
      )}

      {/* Botões de Ação */}
      <div className={styles.buttonsContainer}>
        <button className={`${styles.button} ${styles.edit}`}>Editar</button>
        <button className={`${styles.button} ${styles.exclude}`}>Excluir</button>
        <button className={`${styles.button} ${styles.vehicles}`}>Veículos</button>
      </div>
    </div>
  );
}

export default ClienteDetailPage;