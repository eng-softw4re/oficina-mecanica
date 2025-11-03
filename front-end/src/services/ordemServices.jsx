import api from "./api";

const ordemService = {
  getAll: async (token) => {
    const response = await api.get('ordem-de-servicos', {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data;
  },

  getOrdem: async (token, id) => {
    const response = await api.get(`ordem-de-servicos/${id}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data;
  },
  getOrdensPorVeiculo: async (token, veiculoId) => {
    const response = await api.get(`ordem-de-servicos/?veiculo=${veiculoId}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data;
  }
};

export default ordemService;
