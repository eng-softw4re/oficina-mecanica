import api from "./api";

const clienteService = {
  getAll: async (token) => {
    const response = await api.get('clientes', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    return response.data
  }
}

export default clienteService;