import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { loginStyle, editProfileStyle, signUpStyle } from './loginStyle';

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
            <View style = {editProfileStyle.container}>
            <Text style = {loginStyle.pageTitle}>Edit Profile</Text>

            <Image
            source={{ uri: 'app_icon' }}
            style={{ width: 40, height: 40 }}
            />
            <TextInput style = {editProfileStyle.input}
               underlineColorAndroid = "transparent"
               placeholder = {this.state.username}
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleUsernameChange}
               />
            
            <TextInput style = {editProfileStyle.input}
               underlineColorAndroid = "transparent"
               placeholder = {this.state.firstname}
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleFirstnameChange}
               />

            <TextInput style = {editProfileStyle.input}
               underlineColorAndroid = "transparent"
               placeholder = {this.state.lastname}
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleLastnameChange}
               />

            <TextInput style = {editProfileStyle.input}
               underlineColorAndroid = "transparent"
               placeholder = {this.state.bio}
               placeholderTextColor = "#002776"
               autoCapitalize = "none"
               onChangeText = {this.handleBioChange}
               />

      
            <TouchableOpacity
               style = {editProfileStyle.button}
               onPress = {
                  () => this.handleSubmit()
               }>
               <Text style = {editProfileStyle.submitButtonText}> Save Changes </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default EditProfile

