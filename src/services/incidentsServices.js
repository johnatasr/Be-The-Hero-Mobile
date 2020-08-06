import api from '../services/api'
import { AsyncStorage } from 'react-native';

export default class IncidentsService{
    constructor(){

    }
    
    async getTokenHeader() {
        const token = await AsyncStorage.getItem('@ListApp:acessToken');
        const JWTString = 'JWT ' + token
        console.log(JWTString)
        const contentType = 'application/json'
        const header =  {
            Authorization: JWTString.replace(/[\\"]/g, ''),
        }
        return header
    }

    async getIncidents(id, page) {
        const header = await getTokenHeader();
        const data = await api.get(`api/incidents/listIncidents/`, { 
            params: {
                page: page,
                id: id
            }, 
            headers: header
            });      
        return data
    }
    
    async getAllIncidents(page) {
        const token = await AsyncStorage.getItem('@ListApp:acessToken');
        const JWTString = 'JWT ' + token
        const header =  {
            Authorization: JWTString.replace(/[\\"]/g, ''),
        }
        console.log(header)
        const data = await api.get(`api/incidents/allIncidents/`, { 
            params: {
                page: page,
            },
            headers: header
        });      

        console.log(data)
        return data
    }

    async deleteIncident(id, ong){
        await api.delete('api/incidents/delete_incident/', { 
            params: {
                ong: ong,
                id: id
            }});   
    }
    
    async createIncidente(payload){
        const url = `api/incidents/createIncident/`;
        api.post(url, payload);
    }
    // updateCustomer(customer){
    //     const url = `${API_URL}/api/customers/${customer.pk}`;
    //     return axios.put(url,customer);
    // }
}