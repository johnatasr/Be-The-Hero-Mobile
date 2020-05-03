import api from '../services/api'

export default class IncidentsService{

    constructor(){}

    async getIncidents(id, page) {
        const data = await api.get(`api/incidents/listIncidents/`, { 
            params: {
                page: page,
                id: id
            }});      
        return data
    }
    // getCustomersByURL(link){
    //     const url = `${API_URL}${link}`;
    //     return axios.get(url).then(response => response.data);
    // }

    async deleteIncident(id, ong){
        const tess = 1 ;
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