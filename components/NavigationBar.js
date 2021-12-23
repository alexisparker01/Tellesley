import React, { useState, Component } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


function NavigationBar(props) {

   const [state, setState] = useState ({ 
      feedIcon: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
      profileIcon: 'https://cdn-icons-png.flaticon.com/512/64/64572.png',
   })

   return (
      <View style = {styles.container}>

         <TouchableOpacity onPress= {() => props.navigation.navigate('Feed')}>
         <Image 
         style={styles.pictures}
         source={{
            uri: state.feedIcon,
         }}
         />
         </TouchableOpacity>

         <TouchableOpacity onPress= {() => props.navigation.navigate('Profile')}>
         <Image 
         style={styles.pictures}
         source={{
            uri: state.profileIcon,
         }}
         />
         </TouchableOpacity>

      </View>

      )
   }
export default NavigationBar;


const styles = StyleSheet.create({
   
   container: {
      flexDirection:'row',
       alignItems:'center',
        height: 75,
        marginBottom: -7,
        backgroundColor: "white",
        display: 'flex'
   },
   pictures: {
    height: 30,
     width: 30,
     padding: 10,
     marginLeft: 80,
     resizeMode: 'cover', 
     borderRadius: 400/2,
   }, 
})
