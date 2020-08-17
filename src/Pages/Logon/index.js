import React, { useState } from 'react'
import { Image, Text } from 'react-native'
import { StatusBar, ActivityIndicator, AsyncStorage, TouchableOpacity } from 'react-native'

import axios from 'axios'

import { Feather } from '@expo/vector-icons';
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
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  async function saveAuth(acessToken, refreshToken) {
    await AsyncStorage.setItem('@ListApp:acessToken', JSON.stringify(acessToken))
    await AsyncStorage.setItem('@ListApp:refreshToken', JSON.stringify(refreshToken))
  }

  function createUser() {
    navigation.navigate('Register')
  }

  async function signIn() {
    if (username.length === 0) return

    setLoading(true)

    try {

      const credentials = {
        username: username,
        password: password
      }
      
      const response = await axios.post('https://betheherodjango.herokuapp.com/core/token/obtain/', credentials , {
        headers: {
            'Content-Type': 'application/json'
        }})
        

      const acessToken = response.data.access
      const refreshToken = response.data.refresh

      saveAuth(acessToken, refreshToken)

      navigation.navigate('AuthLogon')
      setLoading(false)
        
    } catch (err) {
      setLoading(false)
      setErrorMessage('Não foi possível fazer login')
      
    }
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" />

      <Logo>
        <Image source={ImagemLogo} />
      </Logo>
         
     
      <Title>Bem-vindo</Title>
      <TextInformation>
        Para continuar, precisamos que você informe seu usuário
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
          placeholder="Digite sua senha"
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          secureTextEntry={true}
          value={password}
          onChangeText={password => setPassword(password)}
        />

        <Button onPress={signIn}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <ButtonText>Prosseguir</ButtonText>
          )}
        </Button>

        <TouchableOpacity
            style={{ marginLeft: 80, marginTop: 30, flexDirection: 'row' }}
            onPress={() => createUser()}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Não tenho cadastro</Text>
            <Feather style={{ marginLeft: 10,  }} name="arrow-right" size={30} color="#E02041" />
        </TouchableOpacity>
      </Form>
    </Container>
  )
}

