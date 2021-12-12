import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, View, ImageBackground, DismissKeyboard, TouchableOpacity, StyleSheet, Picker} from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { initializeApp } from "firebase/app";
import { loginStyle } from './loginStyle';
import { getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";

export const Map = ({navigation}) => {
// State for chat channels and messages
//const [selectedMessages, setSelectedMessages] = React.useState([]);
//const [textInputValue, setTextInputValue] = useState('');
const categories = ['Classes', 'Events', 'FAQ', 'Life', 'Free&ForSale'];
const [selectedCategory, setSelectedCategory] = React.useState('Classes');
const image = { uri: "http://web.wellesley.edu/map/Wellesley_Printable.pdf" };

     return (

      <View style = {styles.container}>
      <SafeAreaView style = {styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
              <Picker
                style={styles.pickerStyles}
                mode='dropdown'
                selectedValue= 'Select Category'
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
                {categories.map(clr => <Picker.Item key={clr} label={clr} value={clr}/>)}
              </Picker>
              </ImageBackground>
      </SafeAreaView>
    </View>
     )
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    flex: 1,
    justifyContent: 'center',
  },
  buttons: {
    backgroundColor: "rgb(8,58,129)",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: '40%',
    width: '20%',
    padding: 5,
 },
 image: {
  height: 100,
 },
 subuttons: {
  backgroundColor: "#919191",
  color:'#000000',
  marginLeft: '40%',
  width: '20%',
  padding: 5,

},
  textInputArea: {
    textAlign: 'Left',
    backgroundColor: "white",
    fontSize: 17,
    borderWidth: 1,
    borderColor: "#9E9E9E",
  },
  titleText: {
    textAlign: 'center',
    fontSize: 40,
    color:'#5d5d5d',
    fontFamily: 'Times New Roman'
  },
  pickerStyles:{
    width:'37%',
    marginTop: 5,
    marginLeft: '30%',
    backgroundColor:'white',
    },
})