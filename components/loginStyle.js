import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import React, { Component } from 'react'

export const loginStyle = StyleSheet.create({
        button: {
           backgroundColor: "rgb(8,58,129)",
           width: "30%",

        },
        submitButtonText:{
           color: 'white'
        },
    content: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirections: "row",
        backgroundColor: "rgb(6,12,51)",
    },
    textFields: {
        margin: 5,
        height: 30,
        borderColor: '#rgb(207, 208, 210)',
        borderWidth: 1
    },
    view: {
        width: "70%"
    },
    appTitle: {
        margin: 24,
       fontSize: 50,
       fontFamily: "Times New Roman",
       textAlign: 'center',
       color: "white",
     }
})

//what Alexis originally had in App.js
/* const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    appTitle: {
       margin: 24,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
    }
  }); */