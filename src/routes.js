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
{/* <AppStack.Screen name="Logon" component={Logon} /> */}


// import { createSwitchNavigator, createAppContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'

// import Welcome from './pages/Welcome'
// import Home from './pages/Home'
// import AuthLoadingScreen from './pages/AuthLoadingScreen'

// const StackNavigator = createStackNavigator(
//   {
//     Home,
//   },
//   {
//     initialRouteName: 'Home',
//     defaultNavigationOptions: {
//       headerTintColor: '#000',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },
//     },
//   },
// );

// const StackNavigatorContainer = createAppContainer(StackNavigator);

// const AuthStack = createStackNavigator(
//   {
//     SignIn: Welcome,
//     App: StackNavigatorContainer,
//     // SignUp: RegisterUser
//   },
//   {
//     initialRouteName: 'SignIn',
//     headerMode: 'none',
//     header: null,
//   },
// );

// const RootStack = createSwitchNavigator(
//   {
//     AuthLoading: AuthLoadingScreen,
//     Auth: AuthStack,
//     App: StackNavigatorContainer,
//     // Auth: AuthStack
//   },
//   {
//     initialRouteName: 'AuthLoading',
//   },
// );

// const RootStackContainer = createAppContainer(RootStack);

// export default RootStackContainer;