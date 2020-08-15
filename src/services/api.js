import axios from 'axios'

const api = axios.create({
    baseURL: 'https://betheherodjango.herokuapp.com/',
    timeout: 5000,
})
api.interceptors.response.use(
  response => {
    return response
  },
  error => {

    if (
      error.request._hasError === true &&
      error.request._response.includes('connect')
    ) {
      Alert.alert(
        'Aviso',
        'Não foi possível conectar aos nossos servidores, sem conexão a internet',
        [ { text: 'OK' } ],
        { cancelable: false },
      )
    }

    if (error.response.status === 401) {
      const requestConfig = error.config

      deleteUser().then(() => {
        navigate('AuthLoading', {})
      })

      return axios(requestConfig)
    }

    return Promise.reject(error)
  },
)

export default api;
