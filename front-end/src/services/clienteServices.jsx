import api from "./api";

const clienteService = {
  getAll: async (token) => {
    const response = await api.get('clientes/', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    return response.data
  },
  getCliente: async (token, id) => {
    const response = await api.get(`clientes/${id}/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })

    return response;
  },
  /**
   * Cria um novo cliente.
   * @param {string} token - O token de autenticação.
   * @param {object} data - Os dados do formulário (incluindo o objeto 'endereco').
   */
  create: async (token, data) => {
    const response = await api.post('clientes/', data, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data;
  }
}

export default clienteService;