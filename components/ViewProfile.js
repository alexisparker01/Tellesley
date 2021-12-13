import React, { useState, useContext, Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import NavigationBar from './NavigationBar';
import StateContext from './StateContext.js';
 
export const ViewProfile = ({navigation}) => {{

   const loggedInProps = useContext(StateContext);
   const [state, setState] = useState ({
      bio: 'Wellesley College 2023',
      profilePicture: 'https://th.bing.com/th/id/OIP.vIq_QWTLmuEoct13lW83UwHaHa?pid=ImgDet&rs=1',
      currentUser: true,
   })


      return (
    
      <ScrollView style = {styles.container}>
         <View style = {styles.header}> 
            <Text style = {styles.username}>{loggedInProps.FName}</Text>
            <Image 
                  style={styles.profilePicture}
                  source={{
                  uri: state.profilePicture,
                  }}
            />
            <Text style = {styles.text}>{loggedInProps.FName + " " + loggedInProps.LName} </Text>
            <Text style = {styles.text}>{loggedInProps.bio} </Text>
            <TouchableOpacity
               style = {styles.buttons}
               onPress = {
                  () =>  navigation.navigate('EditProfile')
            }>
            <Text style = {styles.buttonText}> Edit Profile </Text>
            </TouchableOpacity>
            <View style = {styles.footer}>
            <Text style = {styles.username}> Posts </Text>
            </View> 
         </View>
         <NavigationBar navigation = {navigation} />
      </ScrollView>
   
      )
         }
      }
export default ViewProfile


const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      fontFamily: "Time New Roman",
   },
   header: {
      flex: 1,
      height: "100%",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(233,233,233)',
    },
    footer: {
      flex: 4, 
      marginTop: 10,
      height: "100%",
      width: "90%",
      borderTopLeftRadius: 1000, 
      borderTopRightRadius: 1000, 
      paddingVertical: 50, 
      paddingHorizontal: 30,
      alignItems: 'center',
      backgroundColor: 'white'
    },
   buttons: {
      backgroundColor: "rgb(8,58,129)",
      marginTop: 25,
      marginBottom: 15,
      padding: 5,
      borderTopLeftRadius: 5, 
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
   },
   username: {
     padding: 10,
     fontSize: 24,
     fontWeight: 'bold',
     color: '#343535',
   },
    profilePicture: {
     height: 120,
     width: 120,
     padding: 30,
     marginTop: 10,
     resizeMode: 'cover', 
     borderRadius: 400/2,
   },

   postsBox: {
     borderColor: 'black',
     border: 10,
     width: 100,
     height: 100,
   },

   text:{
      padding: 4,
      textAlign: 'center',
      fontSize: 18,
      color: '#343535'
   },
   
   buttonText: {
      color: "white",
      fontSize: 15
   },

 buttonFollow: {
      backgroundColor: '#1DA1F2',
      padding: 10,
      margin: 15,
      height: 40,
   },
})
