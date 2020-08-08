import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Logon from './Pages/Logon'
import AuthLogon from './Pages/Logon/authLoading'
import Incidents from './Pages/Incidents';
import Details from './Pages/Details';

export default function Routes() {

    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}} >
                <AppStack.Screen name="Logon" component={Logon} />
                <AppStack.Screen name="AuthLogon" component={AuthLogon} />
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Details" component={Details} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
