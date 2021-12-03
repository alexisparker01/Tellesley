import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

class NavigationBar extends Component {
   state = {
      mapIcon: 'https://cdn-icons-png.flaticon.com/512/149/149442.png', 
      feedIcon: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
      profileIcon: 'https://cdn-icons.flaticon.com/png/512/1144/premium/1144760.png?token=exp=1638490784~hmac=b835b7356f4d2d578798e433831c4aa7',

   }


goToMap = () => {
   // go to map screen
}

goToFeed = () => {
   // go to feed screen
}

goToProfile = () => {
   // go to profile
}

   render() {
      return (
    



<View style = {styles.container}>
       
           <Image 
        style={styles.pictures}
        source={{
          uri: this.state.mapIcon,
        }}
      />
          <Image 
        style={styles.pictures}
        source={{
          uri: this.state.feedIcon,
        }}
      />
          <Image 
        style={styles.pictures}
        source={{
          uri: this.state.profileIcon,
        }}
      />

      

      
  
       
     </View>
        
   
      )
   }
}
export default NavigationBar


const styles = StyleSheet.create({
   
   container: {
 flexDirection:'row',
       alignItems:'center',
        width: 500,
        height: 75,
        marginLeft: -10,
        marginBottom: -7,
        backgroundColor: "#F5F5F5",
   },

   pictures: {

    height: 30,
     width: 30,
     padding: 10,
     marginLeft: 80,
     resizeMode: 'cover', 
     borderRadius: 400/2,

   }
})
