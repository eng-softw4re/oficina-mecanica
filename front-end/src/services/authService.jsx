import api from './api'

const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post('login/', {
        username: username,
        password: password
      });

      return response;
    }catch(error) {
      throw error.response || new Error('Erro de autenticação')
    }
  }

  // posso criar uma função de logout no back-end para invalidar o token;
}

export default authService;