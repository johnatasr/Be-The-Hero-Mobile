import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.0.47:8000',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
})

export default api;