import api from "./api";

const insumoService = {
  getAll: async (token) => {
    const response = await api.get('insumos', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    return response.data
  },
  getInsumo: async (token, id) => {
    const response = await api.get(`insumos/${id}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })

    return response;
  }
}

export default insumoService;