import api from "./api";

const clienteService = {
  getAll: async (token) => {
    const response = await api.get('clientes', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    return response.data
  },
  getCliente: async (token, id) => {
    const response = await api.get(`clientes/${id}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })

    return response;
  }
}

export default clienteService;