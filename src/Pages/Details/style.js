import { StyleSheet } from 'react-native';
import React from 'react';
import Constants from 'expo-constants';


export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,   
    },

    header: {
        flexDirection:  'row',
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
        marginTop: 20
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
    },
 
    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
    },

    heroTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#13131a',
        lineHeight: 30
    },

    heroDescription: {
        fontSize: 15,
        color: '#737380',
        marginTop: 16
    },

    actions: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'    
    },

    action: {
        backgroundColor: "#E02041",
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',     
    },

    actionText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },

    inputDoar: {
        padding: 10,
        marginTop: 10
    },

    botaoDoar: {
        textAlign: 'center',
        marginLeft: 140
    },

    textDoar: {
        marginLeft: 40,
        fontSize: 30
    },

    errorMsgDoar: {
        marginLeft: 40,
        fontSize: 15,
        color: "#E02041"
    }

});
  