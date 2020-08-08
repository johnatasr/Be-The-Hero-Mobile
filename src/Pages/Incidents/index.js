import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, AsyncStorage, ActivityIndicator  } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import IncidentService from '../../services/incidentsServices';
import logoImg from '../../assets/logo.png';

import styles from './styles';

const incidentService =  new IncidentService();

export default function Incidents() {

    const navigation = useNavigation();

    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false); 
    const [ incidents, setIncidents ] = useState([]);
    const [ secondListIncidents, setSecondListIncidents ] = useState([]);
    const [ searchField, setSearchField ] = useState(null)
    const [ originalTotal, setOriginalTotal ] = useState('')
    const [ total, setTotal ] = useState('0');
    const [ msg, setMsg ] = useState('');
    const [ alert, setAlert ] = useState(false);


    async function handelLogout() {
        await AsyncStorage.removeItem('@ListApp:acessToken');
        navigation.navigate('Logon');
        setIncidents([])
    }

    async function searchIncidents() {
        try {
            setLoading(true)

            const response = await incidentService.searchIncidents(searchField)
            
            setSecondListIncidents(incidents)
            setIncidents(response.data.incidents)
            setOriginalTotal(total)
            setTotal(response.data.total)
            setLoading(false);
        }
        catch (error){
            setMsg('Erro ao carregar incidentes!');
        }
        
    }
    
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

   
    const showAlert = () => {
        setAlert(true)
    };
     
    const hideAlert = () => {
        setAlert(false)
    };

    function handleSearch (title) {
        if (title == '' || title == undefined) {
            setSearchField('')
            loadIncidents()
        } else {
            setSearchField(title)
        }
    }

    function handleDetails(incident) {
        setIncidents(secondListIncidents)
        setSecondListIncidents([])
        setTotal(originalTotal)
        setSearchField('')
        navigation.navigate('Details', { incident });
    }

    return(
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={showAlert}> 
                    <Feather name="power" size={30} color="#E02041" />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.descriptions}>Escolha um dos casos abaixo e salve o dia.</Text>
            
            <View style={styles.divSearch}>
                <TextInput
                    style={{ height: 40,
                            width: '85%', 
                            borderColor: "#E02041", 
                            borderWidth: 1, 
                            padding: 10,
                            marginRight: 15,
                            marginTop: 20, 
                            borderRadius: 8,
                            backgroundColor: '#fff'}}
                    onChangeText={value => handleSearch(value)}
                    value={searchField}
                    placeholder="Pesquise aqui algum incidente ..."
                />
                <TouchableOpacity
                    style={styles.detailsButton, { marginTop: 25 }}
                    onPress={() => searchIncidents(searchField)}> 
                    <Feather name="search" size={27} color="#E02041" />
                </TouchableOpacity>
            </View>

            <Text style={styles.msgErro}>{msg}</Text>

            <AwesomeAlert
                show={alert}
                showProgress={false}
                title="Deseja sair ?"
                message="Ou você pode continuar ajudando mais :)"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não, quero ajudar mais"
                confirmText="Sim, desejo sair"
                confirmButtonColor="#E02041"
                onCancelPressed={() => hideAlert()}
                onConfirmPressed={() => handelLogout()}
            />

            { loading ? 
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <ActivityIndicator size="large" color="#E02041" />
                </View>
                : <View></View>   
            }
            

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
                           R$ {incident.value}
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