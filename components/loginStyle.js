import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import React, { Component } from 'react'

export const loginStyle = StyleSheet.create({
        loginButtons: {
           backgroundColor: "rgb(8,58,129)",
           marginBottom: 15,
           marginTop: 0,
           marginLeft: 0,
           marginRight: 0,
           padding: 5,
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
        marginBottom: 15,
        height: 30,
        borderColor: 'rgb(207, 208, 210)',
        borderWidth: 1
    },
    view: {
       width: "180%",
    },
    appTitle: {
        margin: 24,
       fontSize: 50,
       fontFamily: "Times New Roman",
       textAlign: 'center',
       color: "white",
     },
     littleText:  {
         color: "white",
         fontFamily: "Times New Roman",
         fontSize: 20,
     },
     accentText: {
         color: 'rgb(6,12,51)',
         textAlign: 'center'
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