

import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

// Need to make sign up button disappear when you click on login and vice-versa
// Need to make submit button appear after clicking on either button

class Login extends Component {
   state = {
      email: '',
      password: '',
      hidden: false
   }
 
   handleEmail = (text) => {

    this.setState({ email: text })
   }

   handlePassword = (text) => {
      this.setState({ password: text })
   }

   handleSubmit = () => {
       alert("Your email is: " + this.state.email + "\n and your password is: " + this.state.password);
   }


   render() {
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = " Email"
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}
               />
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = " Password"
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}
               />

            <TouchableOpacity
               style = {styles.button}
               onPress = {
                  () => this.handleSubmit()
               }>
               <Text style = {styles.submitButtonText}> Login </Text>
            </TouchableOpacity>

            <TouchableOpacity
               style = {styles.button}
               onPress = {
                  () => this.handleSubmit()
               }>
               <Text style = {styles.submitButtonText}> Sign Up </Text>
            </TouchableOpacity>
            
         </View>
      )
   }
}
export default Login

const styles = StyleSheet.create({
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
   }
})