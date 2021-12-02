import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

class ViewProfile extends Component {
   state = {
      username: 'alexisparker', 
      firstname: 'alexis',
      lastname: 'parker',
      bio: 'wellesley 2023',
      profilePicture: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
   }


goBack = () => {
   // go back to wherever you came from
}



   render() {
      return (
    
         <ScrollView style = {styles.container}>



        <Text style = {styles.username}>{this.state.username}</Text>

<View style = {{flexDirection:'row', alignItems:'center'}}>
           <Image 
        style={styles.profilePicture}
        source={{
          uri: this.state.profilePicture,
        }}
      />

          




            <Text style = {styles.names}>{this.state.firstname + " " + this.state.lastname}</Text>
    
            <Text style = {styles.bio}>{this.state.bio} </Text>
       
     </View> 

      
           
            </ScrollView>
   
        
   
      )
   }
}
export default ViewProfile





const styles = StyleSheet.create({
   container: {
      paddingTop: 23,
      backgroundColor: 'white',
      margin: 5,
   },

   username: {
     marginLeft: 15,
     padding: 10,
     fontSize: 24,
     fontWeight: 'bold',
     color: 'black',
   },
    profilePicture: {
     height: 100,
     width: 100,
     padding: 30,
     marginTop: 10,
     marginLeft: 20,
     resizeMode: 'cover', 
     borderRadius: 400/2,
   },


   names:{
      marginLeft: 10,
      padding: 10,
   },

   bio: {
      margin: 30,
      height: 100,
      width: 300,
      color: 'black',

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

  
   inputLabels:{
      marginLeft: 40,
      color: 'black',

   },
   hidden: {
      opacity: 0, height: 0
   },
   title: {
      fontFamily: 'Helvetica',
      fontSize: 30,
      color: 'black',
      marginLeft: 130,
      padding: 15,
   },
})
