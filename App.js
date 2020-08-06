import React from 'react';
// import { View, Text } from 'react-native'
import Routes from './src/routes';


export default function App() {
  return (
    <>
      <Routes/>      
    </>
    
  );
};




// import React, { Component } from 'react'

// import RootStackContainer from './routes'
// import { ThemeProvider } from 'styled-components'
// import { globalStyles } from './styles'

// import './config/ReactotronConfig'
// import { setTopLevelNavigator } from './utils'

// export default class App extends Component {
//   render() {
//     return (
//       <ThemeProvider theme={globalStyles}>
//         <RootStackContainer  
//           ref={navigatorRef => {
//             setTopLevelNavigator(navigatorRef)
//           }}
//         />
//       </ThemeProvider>
//     );
//   }
// }