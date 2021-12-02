
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import React, { Component } from 'react'

//////////////////////////////////////////////////////////////////////////////////////////
//LOG IN PAGE STYLES
export const loginStyle = StyleSheet.create({
        buttons: {
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

//////////////////////////////////////////////////////////////////////////////////////////
//SIGN UP PAGE STYLES
/* export const signUpStyle = StyleSheet.create({
  content: {
      padding: 15,
      paddingTop: 2,
  }, 
  icon: {
      color: 'white',
  }
})  */

//////////////////////////////////////////////////////////////////////////////////////////
//EDIT PROFILE STYLES
export const editProfileStyle = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  input: {
     margin: 15,
     height: 40,
     borderColor: '#002776',
     borderWidth: 1
  },
  button: {
     backgroundColor: '#002776',
     padding: 10,
     margin: 15,
     height: 40,
  },
  submitButtonText:{
     color: 'white'
  },
  
  hidden: {
     opacity: 0, height: 0
  },
  pageTitle: {
    margin: 24,
   fontSize: 50,
   fontFamily: "Times New Roman",
   textAlign: 'center',
   color: "rgb(8,58,129)",
 },
})