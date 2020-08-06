import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import IncidentService from '../../services/incidentsServices';
import logoImg from '../../assets/logo.png';

import styles from './styles';

const incidentService =  new IncidentService();

export default function Incidents() {

    const navigation = useNavigation();

    const [ page, setPage ] = useState('1');
    const [ loading, setLoading ] = useState(false); 
    const [ incidents, setIncidents ] = useState([]);
    const [ total, setTotal ] = useState('0');
    const [ msg, setMsg ] = useState('');
    
    async function loadIncidents() {
        try {
            if (loading){
                return;
            } 

            if (total > 0 && incidents.length === total){
                return;
            }

            setLoading(true);
            const response = await incidentService.getAllIncidents(page)
            
            setIncidents([...incidents, ...response.data.incidents]);
            setTotal(response.data.total);
            setPage(page + 1);
            setLoading(false);
        }
        catch (error){
            setMsg('Erro ao carregar incidentes!');
        }
    }

    useEffect(() => {
        loadIncidents();
    }, [])

    function handleDetails(incident) {
        navigation.navigate('Details', { incident });
    }

    return(
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.descriptions}>Escolha um dos casos abaixo e salve o dia.</Text>
            
            <Text style={styles.msgErro}>{msg}</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.3}
                renderItem={({ item : incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.ong.name}</Text>

                        <Text style={styles.incidentProperty}>Caso:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>
                           {incident.value}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => {handleDetails(incident)}}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />         
        </View>
    );
} 


// {Intl.NumberFormat('pt-BR', { 
//     style: 'currency', 
//     currency: 'BRL'}).format(incident.value)}