import React, { useState } from 'react'
import { Image } from 'react-native'
import { StatusBar, ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import axios from 'axios'

import ImagemLogo from '../../assets/logo_login.png'

import {
  Container,
  Title,
  TextInformation,
  Error,
  Form,
  Input,
  Button,
  ButtonText,
  Logo
} from './styles'

export default function Logon({ navigation }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  function backToLogon() {
      navigation.navigate('Logon');
  }

  async function handleRegister(e){
    e.preventDefault();

    if ( (email == '' || email == undefined || email == null ) || ( username == '' || username == undefined || username == null ) 
        || ( password1 == '' || password1 == undefined ) || ( password2 == '' || password2 == '')) {
        setErrorMessage('Campos não podem estar vazios')      
    }
    else if ( password1 != password2 ) {
        setErrorMessage('Senhas devem ser iguais') 
    } else {

        setLoading(true)
        const dataUserCreation = {
            "email": email,
            "username": username,
            "password": password1
        }
       
        try {          
            let createUserResponse = await axios.post('https://betheherodjango.herokuapp.com/core/user/create/', dataUserCreation)

            setErrorMessage('')
        
            if ( createUserResponse.data != null || createUserResponse.data != undefined || 
                createUserResponse.status == 200 || createUserResponse.status == 201) {
                setLoading(false)
                navigation.navigate('Logon')                 
            }
            else {
                setErrorMessage('Usuário não cadastrado')
            }
         
        } catch (err) {
            setErrorMessage('Algo não ocorreu como esperado ...')
        }      
    }       
};

  return (
    <Container>
      <StatusBar barStyle="light-content" />

      <Logo>
        <Image source={ImagemLogo} />
      </Logo>
         
     
      <Title>Cadastro</Title>
      <TextInformation>
        Para continuar, preencha os campos abaixo
      </TextInformation>

      {!!errorMessage && <Error>{errorMessage}</Error>}
      

      <Form>
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu usuário"
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          value={username}
          onChangeText={username => setUsername(username)}
        />

        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu e-mail"
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          value={email}
          onChangeText={email => setEmail(email)}
        />

        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite sua senha"
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          secureTextEntry={true}
          value={password1}
          onChangeText={password1 => setPassword1(password1)}
        />

        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Confirme sua senha"
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          secureTextEntry={true}
          value={password2}
          onChangeText={password2 => setPassword2(password2)}
        />


        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                style={{ marginLeft: 5, marginTop: 9, flexDirection: 'row', marginRight: 18 }}
                onPress={() => backToLogon()}>
                <Feather style={{ marginLeft: 10,  }} name="arrow-left" size={50} color="#E02041" />
            </TouchableOpacity>
            <Button onPress={handleRegister} style={{ marginRight: 10, width: 180 }}>
            {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <ButtonText>Cadastrar</ButtonText>
            )}
            </Button>
        </View>
        
      </Form>
    </Container>
  )
}

