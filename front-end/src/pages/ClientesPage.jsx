import React, { useEffect, useState } from 'react';
import clienteService from '../services/clienteServices';
import { Link } from 'react-router-dom';
import styles from './ClientesPage.module.css'

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const token = localStorage.getItem("authToken")
        const response = await clienteService.getAll(token);
        
        setLoading(true)
        setClientes(response);
        setError(null)
      }catch(err){
        setError(err.message || 'Erro ao buscar clientes.')
        console.error(err)
      }finally {
        setLoading(false)
      }
    }

    fetchClientes();
  }, [])

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
    <div className={styles.container}>
      <h1 className="text-3xl font-bold mb-4">Lista de Clientes</h1>
      
      {/* TODO: Adicionar um botão de "Novo Cliente" aqui */}

      <div className={styles.sub_container}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              // Lembre-se da 'key' única para cada item da lista
              <tr key={cliente.id}> 
                <td>{cliente.nome}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.telefone}</td>
                <td>
                  {/* O Link do React Router para a página de detalhes */}
                  <Link 
                    to={`/clientes/${cliente.id}`}
                  >
                    Ver Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientesPage;