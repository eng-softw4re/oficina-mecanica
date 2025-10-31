import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteService from '../services/clienteServices';
// Esta importação está correta
import styles from './DetalhesPage.module.css'; 

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

  return (
    <div className={styles.container}>      
      <Link to="/clientes" className={styles.backButton}>
        <span className={styles.backIcon}>&larr;</span> Voltar para Clientes
      </Link>

      <div>
        <div className={styles.voltar}>
          <Link
            to="/clientes"
          >
            &larr;
          </Link>
        </div>
        <h1>
          {cliente.nome}
        </h1>
      </div>

      {/* Seção de Informações Pessoais */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Informações Pessoais</h2>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>CPF:</span>
          {cliente.cpf}
        </div>

        {cliente.endereco ? (
          <div className={styles.endereco_container}>
            <h2 className={styles.endereco}>
              Endereço
            </h2>
           <div className={styles.endereco_informacoes}>
              <div>Rua: <span>{cliente.endereco.rua}</span></div>
              <div>Número: <span>{cliente.endereco.numero}</span></div>
              <div>Bairro: <span>{cliente.endereco.bairro}</span></div>
              <div>Cidade: <span>{cliente.endereco.cidade}</span></div>
           </div>
          </div>
        ) : (
          <p>Endereço não cadastrado.</p>
        )}
        <div className={styles.botoes}>
          <button className={styles.botao}>Editar</button>
          <button className={styles.botao}>Excluir</button>
          <button className={styles.botao}>Veículos</button>
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