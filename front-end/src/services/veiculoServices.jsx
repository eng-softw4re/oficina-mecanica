import api from "./api";

const veiculoService = {
  getAll: async (token) => {
    const response = await api.get('veiculos', {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data;
  },

  getVeiculosPorCliente: async (token, cliente) => {
    const response = await api.get(`veiculos/?cliente=${cliente}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data;
  },

  getVeiculo: async (token, id) => {
    const response = await api.get(`veiculos/${id}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data; 
  }
};

export default veiculoService;