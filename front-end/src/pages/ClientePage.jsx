import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteService from '../services/clienteServices';
import styles from './DetalhesPage.module.css'; 

function ClienteDetailPage() {
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cliente, setCliente] = useState(null); 

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
        <button className={`${styles.button} ${styles.vehicles}`}>Veículos</button>
      </div>
    </div>
  );
}

export default ClienteDetailPage;