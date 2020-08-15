import React, { useEffect } from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';

export default function AuthLoadingScreen(props) {

  useEffect(() => {
    async function handleUserNextScreen() {
      const userToken = await AsyncStorage.getItem('@ListApp:acessToken');
    
      props.navigation.navigate(userToken ? 'Incidents' : 'Logon');
    }

    handleUserNextScreen();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}
