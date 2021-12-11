import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import NavigationBar from './NavigationBar';


class ViewProfile extends Component {
   state = {
      username: 'wendywellesley', 
      firstname: 'Wendy',
      lastname: 'Wellesley',
      bio: 'Wellesley College 2024',
      profilePicture: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
      currentUser: true,
   }

   render() {
      return (
    
      <ScrollView style = {styles.container}>
        <Text style = {styles.username}>{this.state.username}</Text>
         <View style = {{flexDirection:'row', alignItems:'center', marginBottom: 30}}>
           <Image 
            style={styles.profilePicture}
            source={{
            uri: this.state.profilePicture,
            }}
            />
         <Text style = {styles.names}>{this.state.firstname + " " + this.state.lastname + "\n\n" + this.state.bio}</Text>
         </View> 
    
         <TouchableOpacity
               style = {styles.buttonEditProfile}
               onPress = {
                  () => this.goToEditProfile()
               }>
               <Text style = {styles.text}> Edit Profile </Text>
         </TouchableOpacity>
         <View style = {styles.postsBox}></View>
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
      fontFamily: "Helvetica",
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

   postsBox: {

     borderColor: 'black',
     border: 10,
     width: 100,
     height: 100,
    

   },

   names:{
      marginLeft: 10,
      padding: 10,
      fontSize: 15,
   },
   
   buttonEditProfile: {
      backgroundColor: "#1DA1F2",
      borderColor: '#F5F5F5',
      border: 10,
      padding: 10,
      margin: 1,
      height: 40,
   },

 buttonFollow: {
      backgroundColor: '#1DA1F2',
      padding: 10,
      margin: 15,
      height: 40,
   },
   text: {
     color: 'black',
     textAlign: 'center',
   }
})
