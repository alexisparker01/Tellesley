

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
 
   handleUsernameChange = (input) => {
       this.setState({username: input });
   }

   handleFirstnameChange = (input) => {
      this.setState({firstname: input });
  }

  handleLastnameChange = (input) => {
   this.setState({lastname: input });
}

  handleBioChange = (input) => {
   this.setState({bio: input });
}

handleProfilePictureChange = (input) => {
   this.setState({profilePicture: input });
}

handleSubmit() {
   this.handleFirstnameChange;
   this.handleBioChange;
   this.handleLastnameChange;
   this.handleUsernameChange;
}

   render() {
      return (
         <View style = {styles.container}>
            <h2>Edit Profile</h2>

<Image
  source={{ uri: 'app_icon' }}
  style={{ width: 40, height: 40 }}
/>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = {this.state.username}
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleUsernameChange}
               />
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = {this.state.firstname}
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleFirstnameChange}
               />

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = {this.state.lastname}
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleLastnameChange}
               />

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = {this.state.bio}
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleBioChange}
               />

      
            <TouchableOpacity
               style = {styles.button}
               onPress = {
                  () => this.handleSubmit()
               }>
               <Text style = {styles.submitButtonText}> Save Changes </Text>
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