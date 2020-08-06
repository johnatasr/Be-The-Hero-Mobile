import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize'
// import * as MailComposer from 'expo-mail-composer';
import logoImg from '../../assets/logo.png';

import styles from './style'

export default function Details() { 

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

    function sendMail() {
        // MailComposer.composeAsync({
        //     subject: `Herói do caso: ${incident.title}`,
        //     recipients: [incident.ong.email],
        //     body: message
        // })
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.ong.whatsapp}&text=${message}`)
    }


    function handleDoacao () {
        
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
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>R$ 15,00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={onOpen}>
                        <Text style={styles.actionText}>Outro Valor</Text>
                    </TouchableOpacity>
                </View>        
            </View>

            <Modalize
                ref={modalizeRef}
                snapPoint={100}>
                <View>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                    />
                    <TouchableOpacity style={styles.action} onPress={}>
                        <Text style={styles.actionText}>Doar</Text>
                    </TouchableOpacity>
                
                </View>            
            </Modalize>

        </View>
    );
} 