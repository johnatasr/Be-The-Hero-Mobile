import React,  { useRef, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Linking } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize'
import IncidentServices from '../../services/incidentsServices'
import logoImg from '../../assets/logo.png';

import styles from './style'

const incidentsServices = new IncidentServices();

export default function Details() { 

    const [ valor, setValor ] = useState('');
    const [ alert, setAlert ] = useState(false);
    const [ msgError, setMsgError ] = useState('');
    const modalizeRef = useRef(null);
    const navigation = useNavigation();
    const route = useRoute();

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const incident = route.params.incident;
    const message = `Olá ${incident.ong.name}, estou entrando em contato pois gostaria de ajudar no caso da "${incident.title}" com o valor de 
       R$${incident.value}`;

    function navigateBack() {
        navigation.goBack();
    }

    
    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.ong.whatsapp}&text=${message}`)
    }

    const showAlert = () => {
        setAlert(true)
    };
     
    const hideAlert = () => {
        setAlert(false)
    };


    async function handleDoacao (value, id) {

        if ( value == 0 || value == '' ){
            setMsgError('Valor inválido, tente denovo ...')
            return
        }

        let payload = {
            'value': value,
            'idIncident': id
        }

        let response = await incidentsServices.sendValueIncident(payload)
        
        if ( response.status == 200 ) {
            modalizeRef.current.close();
            // Send whats message
            // sendWhatsApp()
            setValor('')
            setAlert(false)
        } else {
            setMsgError('Algo não ocorreu conforme o esperado ... ')
        }

    }

    return(
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={26} color="#E02041" />
                </TouchableOpacity>
            </View> 


            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>
                    {incident.ong.name} de {incident.ong.city}/{incident.ong.uf}
                </Text>

                <Text style={styles.incidentProperty}>Caso:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>
                    R${incident.value}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                
                <Text style={styles.heroDescription}>Doe agora um valor simbólico ou outro valor</Text>
            
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={() => showAlert()}>
                        <Text style={styles.actionText}>R$ 15,00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={onOpen}>
                        <Text style={styles.actionText}>Outro Valor</Text>
                    </TouchableOpacity>
                </View>        
            </View>

            <AwesomeAlert
                show={alert}
                showProgress={false}
                title="Vamos doar ?"
                message="Você irá fazer uma doação de R$ 15,00 reais"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="Não desejo doar"
                confirmText="Sim, desejo fazer isso"
                confirmButtonColor="#E02041"
                onCancelPressed={() => hideAlert()}
                onConfirmPressed={() => handleDoacao(15, incident.id)}
            />

            <Modalize
                ref={modalizeRef}
                snapPoint={300}>
                <View>
                    <View style={styles.inputDoar}>
                        <Text style={styles.textDoar}>Você estará ajudando nessa causa, obrigado !</Text>
                        <Text style={styles.errorMsgDoar}>{msgError}</Text>
                        <TextInput
                            style={{ height: 40, 
                                    borderColor: "#E02041", 
                                    borderWidth: 1, 
                                    padding: 10,
                                    marginLeft: 50,
                                    marginRight: 50,
                                    marginTop: 20, 
                                    borderRadius: 8}}
                            onChangeText={value => setValor(value)}
                            value={valor}
                            placeholder="Digite aqui o valor: R$"
                            keyboardType={'numeric'}
                        />
                    </View>
                    <View style={styles.botaoDoar}>
                        <TouchableOpacity style={styles.action} onPress={() => handleDoacao(valor, incident.id)}>
                            <Text style={styles.actionText}>Doar</Text>
                        </TouchableOpacity>
                    </View>
                                  
                </View>            
            </Modalize>

        </View>
    );
} 