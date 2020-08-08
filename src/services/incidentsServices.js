import api from '../services/api'
import { AsyncStorage } from 'react-native';

export default class IncidentsService{
    constructor(){

    }
        
    async getAllIncidents(page) {
        const token = await AsyncStorage.getItem('@ListApp:acessToken');
        const JWTString = 'JWT ' + token
        const header =  {
            Authorization: JWTString.replace(/[\\"]/g, ''),
        }
        const data = await api.get(`api/incidents/allIncidents/`, { 
            params: {
                page: page,
            },
            headers: header
        });      
        return data
    }

    
    async sendValueIncident(payload){
        const token = await AsyncStorage.getItem('@ListApp:acessToken');
        const JWTString = 'JWT ' + token
        const header =  {
            Authorization: JWTString.replace(/[\\"]/g, ''),
        }
        const data = await api.post(`api/incidents/sendValueIncident/`, payload , {
            headers: header
          });      
        return data
    }
   
    async searchIncidents(title) {
        const token = await AsyncStorage.getItem('@ListApp:acessToken');
        const JWTString = 'JWT ' + token
        const header =  {
            Authorization: JWTString.replace(/[\\"]/g, ''),
        }
        const data = await api.get(`api/incidents/searchIncidents/`, { 
            params: {
                title: title,
            },
            headers: header
        });      
        return data
    }
}