import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteService from '../services/clienteServices';
import styles from './ClientePage.module.css';

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
  <div className={styles.background}>
    <div className={styles.container}>
     

      <div className="bg-white rounded-2xl shadow-xl border-l-8 border-[#B35A27] p-8">
        <div className={styles.voltar}>
          <Link
            to="/clientes"
            // className={}
          >
            &larr;
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-[#133B4F] mb-6 border-b-2 border-[#D8C6AF] pb-2">
          {cliente.data.nome}
        </h1>

        <div className={styles.informacoes_cliente}>
          <div className={styles.filho_info_cliente}>
            <span className="">CPF:</span>
            <span>{cliente.data.cpf}</span>
          </div>

          <div className={styles.filho_info_cliente}>
            <span className="">Telefone:</span>
            <span>{cliente.data.telefone || 'Não informado'}</span>
          </div>

          <div className={styles.filho_info_cliente}>
            <span className="">Data de Nascimento:</span>
            <span>{cliente.data.data_nascimento || 'Não informada'}</span>
          </div>
        </div>

        {cliente.data.endereco ? (
          <div className={styles.endereco_container}>
            <h2 className={styles.endereco}>
              Endereço
            </h2>
           <div className={styles.endereco_informacoes}>
              <div>Rua: <span>{cliente.data.endereco.rua}</span></div>
              <div>Número: <span>{cliente.data.endereco.numero}</span></div>
              <div>Bairro: <span>{cliente.data.endereco.bairro}</span></div>
              <div>Cidade: <span>{cliente.data.endereco.cidade}</span></div>
           </div>
          </div>
        ) : (
          <p className="text-[#9BAEC8] italic">Endereço não cadastrado.</p>
        )}
        <div className={styles.botoes}>
          <button className={styles.botao}>Editar</button>
          <button className={styles.botao}>Excluir</button>
          <button className={styles.botao}>Veículos</button>
        </div>
      </div>
    </div>
  </div>
);

}

export default ClienteDetailPage;