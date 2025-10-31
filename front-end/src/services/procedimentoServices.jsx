import api from "./api";

const procedimentoService = {
  getAll: async (token) => {
    const response = await api.get('procedimentos', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    return response.data
  },
  getProcedimento: async (token, id) => {
    const response = await api.get(`procedimentos/${id}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })

    return response;
  }
}

export default procedimentoService;