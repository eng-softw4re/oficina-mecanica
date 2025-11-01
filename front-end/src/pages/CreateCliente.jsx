import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './FormCreate.module.css';
import clienteService from '../services/clienteServices';

function ClienteCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    data_nascimento: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
    }
  });

  // 4. Crie 'handlers' para atualizar o estado
  
  // Atualiza os campos normais (nome, cpf, etc)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Atualiza os campos dentro do objeto 'endereco'
  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [name]: value
      }
    }));
  };

  // 5. Crie a função de 'submit'
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("authToken");
      // Nós vamos criar essa função 'create' no próximo passo
      await clienteService.create(token, formData);
      
      // Sucesso! Redireciona para a lista de clientes
      navigate('/clientes');

    } catch (err) {
      console.error("Erro ao cadastrar cliente:", err);
      setError("Falha ao cadastrar cliente. Verifique os campos e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formHeader}>Cadastrar Novo Cliente</h1>

      <form onSubmit={handleSubmit}>
        
        {/* --- Seção de Informações Pessoais --- */}
        <div className={styles.formSection}>
          <h2 className={styles.formSectionTitle}>Informações Pessoais</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="nome" className={styles.formLabel}>Nome Completo</label>
            <input 
              type="text" 
              id="nome" 
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={styles.formInput} 
              required 
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="cpf" className={styles.formLabel}>CPF</label>
              <input 
                type="text" 
                id="cpf" 
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className={styles.formInput} 
                required 
              />
            </div>
            <div className={styles.formGroup}>
            <label htmlFor="telefone" className={styles.formLabel}>Telefone</label>
            <input 
              type="tel" 
              id="telefone" 
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className={styles.formInput} 
            />
          </div>
            <div className={styles.formGroup}>
              <label htmlFor="data_nascimento" className={styles.formLabel}>Data de Nascimento</label>
              <input 
                type="date" 
                id="data_nascimento" 
                name="data_nascimento"
                value={formData.data_nascimento}
                onChange={handleChange}
                className={styles.formInput} 
                required 
              />
            </div>
          </div>
        </div>

        {/* --- Seção de Endereço --- */}
        <div className={styles.formSection}>
          <h2 className={styles.formSectionTitle}>Endereço</h2>

          <div className={styles.formRow}>
            <div className={styles.formGroup} style={{ gridColumn: 'span 2 / span 2' }}> {/* Ocupa 2 colunas */}
              <label htmlFor="rua" className={styles.formLabel}>Rua</label>
              <input 
                type="text" 
                id="rua" 
                name="rua"
                value={formData.endereco.rua}
                onChange={handleEnderecoChange}
                className={styles.formInput} 
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="numero" className={styles.formLabel}>Número</label>
              <input 
                type="text" 
                id="numero" 
                name="numero"
                value={formData.endereco.numero}
                onChange={handleEnderecoChange}
                className={styles.formInput} 
              />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="bairro" className={styles.formLabel}>Bairro</label>
              <input 
                type="text" 
                id="bairro" 
                name="bairro"
                value={formData.endereco.bairro}
                onChange={handleEnderecoChange}
                className={styles.formInput} 
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cidade" className={styles.formLabel}>Cidade</label>
              <input 
                type="text" 
                id="cidade" 
                name="cidade"
                value={formData.endereco.cidade}
                onChange={handleEnderecoChange}
                className={styles.formInput} 
              />
            </div>
          </div>
        </div>
        
        {/* --- Mensagem de Erro --- */}
        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
            {error}
          </p>
        )}

        {/* --- Botões de Ação --- */}
        <div className={styles.formActions}>
          <Link to="/clientes" className={styles.cancelButton}>
            Cancelar
          </Link>
          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Salvar Cliente'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default ClienteCreatePage;
