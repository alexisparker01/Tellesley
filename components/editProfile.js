import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';


// Need to make sign up button disappear when you click on login and vice-versa
// Need to make submit button appear after clicking on either button

const DismissKeyboard = ({children}) => (
<TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
   {children}
</TouchableWithoutFeedback>
);


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

uploadProfilePicture = () => {
  alert("upload picture");
}

goBack = () => {
   // go back to profile
}

handleSubmit() {
   this.handleFirstnameChange;
   this.handleBioChange;
   this.handleLastnameChange;
   this.handleUsernameChange;
   alert("Your new username is: ", this.state.username);
}

   render() {
      return (
         <DismissKeyboard>
         <ScrollView style = {styles.container}>






        

<TouchableOpacity
               style = {styles.cancelButton}
               onPress = {
                  () => this.goBack()
               }>
                <Text style = {styles.text}> Cancel </Text>
            </TouchableOpacity>
            <Text style ={styles.title}>Edit Profile</Text>

            <Image 
        style={styles.profilePicture}
        source={{
          uri: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
        }}
      />

<View style = {{flexDirection:'row', alignItems:'center'}}>
<Text style = {styles.inputLabels}>Username: </Text> 
<TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = {this.state.username}
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.handleUsernameChange}
               />
            </View>


            <View style = {{flexDirection:'row', alignItems:'center'}}>
            <Text style = {styles.inputLabels}>First Name: </Text> 
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = {this.state.firstname}
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.handleFirstnameChange}
               />
</View>



<View style = {{flexDirection:'row', alignItems:'center'}}>
<Text style = {styles.inputLabels}>Last Name: </Text> 
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = {this.state.lastname}
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.handleLastnameChange}
               />
</View>
<View style = {{flexDirection:'row', alignItems:'center'}}>

<Text style = {styles.inputLabels}>Bio: </Text> 
            <TextInput style = {styles.inputBio}
               underlineColorAndroid = "transparent"
               placeholder = {this.state.bio}
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {this.handleBioChange}
               />
</View>
      
            <TouchableOpacity
               style = {styles.button}
               onPress = {
                  () => this.handleSubmit()
               }>
               <Text style = {styles.text}> Save Changes </Text>
            </TouchableOpacity>
            </ScrollView>
            </DismissKeyboard>
        
   
      )
   }
}
export default EditProfile





const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
      backgroundColor: 'white',
   },
   input: {
      margin: 15,
      height: 40,
      color: 'black',
      borderColor: 'black',
      borderWidth: 1,
      width: 200,
      backgroundColor: 'white',
      
      
   },
   inputBio: {
      margin: 15,
      height: 100,
      width: 300,
      color: 'black',
      backgroundColor: 'white',
      borderColor: "black",
      borderWidth: 1
   },
   button: {
      backgroundColor: '#002776',
      padding: 10,
      margin: 15,
      height: 40,
   },
   cancelButton: {
      margin: 10,
      width: 80,
      padding: 10,
      height: 40,
      backgroundColor: '#002776',
   },

   text:{
      color: 'white'
   },
  
   inputLabels:{
      marginLeft: 40,
      color: 'black',

   },
   hidden: {
      opacity: 0, height: 0
   },
   profilePicture: {
     height: 150,
     width: 150,
     padding: 30,
     marginLeft: 150,
     resizeMode: 'cover', 
     borderRadius: 400/2,
   },
   title: {
      fontFamily: 'Helvetica',
      fontSize: 30,
      color: 'black',
      marginLeft: 130,
      padding: 15,
   },
})