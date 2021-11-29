

import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'

// Need to make sign up button disappear when you click on login and vice-versa
// Need to make submit button appear after clicking on either button

class EditProfile extends Component {
   state = {
      username: '',
      firstname: '',
      lastname: '',
      bio: '',
      profilePicture: '',

   }
 
   handleUsername = (input) => {
       this.setState({username: input });
   }

   handleFirstname = (input) => {
      this.setState({firstname: input });
  }

  handleLastname = (input) => {
   this.setState({lastname: input });
}

  handleBio = (input) => {
   this.setState({bio: input });
}

handleProfilePicture = (input) => {
   this.setState({profilePicture: input });
}

   render() {
      return (
         <View style = {styles.container}>

<Image
  source={{ uri: 'app_icon' }}
  style={{ width: 40, height: 40 }}
/>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Username"
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleUsername}
               />
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "First Name"
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleFirstname}
               />

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Last Name"
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleLastname}
               />

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Bio"
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleBio}
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
export default EditProfile

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