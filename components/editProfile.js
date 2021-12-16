import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import NavigationBar from './NavigationBar.js';
import StateContext from './StateContext.js';


// Need to make sign up button disappear when you click on login and vice-versa
// Need to make submit button appear after clicking on either button

/*
const DismissKeyboard = ({children}) => (
<TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
   {children}
</TouchableWithoutFeedback>
);
*/

export const EditProfile = ({navigation}) => {{
   const loggedInProps = useContext(StateContext);
   const [state, setState] = useState ({
      bio: 'Wellesley College 2024',
      profilePicture: 'https://th.bing.com/th/id/OIP.vIq_QWTLmuEoct13lW83UwHaHa?pid=ImgDet&rs=1',
      currentUser: true,
  })

 
  function handleFirstnameChange(input) {
   loggedInProps.setFName(input);
  }

  function handleLastnameChange(input) {
   loggedInProps.setLName(input);
}

function handleBioChange(input) {
   loggedInProps.setBio(input);
}

function handleProfilePictureChange(input) {
   //this.setState({profilePicture: input });
}

function uploadProfilePicture() {
  //alert("upload picture");
}

function goBack() {
   navigation.navigate('Profile');
}

function handleSubmit() {
   handleFirstnameChange;
   handleBioChange;
   handleLastnameChange;
   navigation.navigate('Profile');
}

 
      return (

         <ScrollView style = {styles.container}>


        

<TouchableOpacity
               style = {styles.cancelButton}
               onPress = {
                  () => goBack()
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
            <Text style = {styles.inputLabels}>First Name: </Text> 
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = {loggedInProps.FName}
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {handleFirstnameChange}
               />
</View>



<View style = {{flexDirection:'row', alignItems:'center'}}>
<Text style = {styles.inputLabels}>Last Name: </Text> 
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = {loggedInProps.LName}
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {handleLastnameChange}
               />
</View>
<View style = {{flexDirection:'row', alignItems:'center'}}>

<Text style = {styles.inputLabels}>Bio: </Text> 
            <TextInput style = {styles.inputBio}
               underlineColorAndroid = "transparent"
               placeholder = {loggedInProps.bio}
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText = {handleBioChange}
               />
</View>
      
            <TouchableOpacity
               style = {styles.button}
               onPress = {
                  () => handleSubmit()
               }>
               <Text style = {styles.text}> Save Changes </Text>
            </TouchableOpacity>
            <NavigationBar navigation = {navigation} />
            </ScrollView>

       
        
   
 
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
