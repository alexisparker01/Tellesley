import React, {useState, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, View, TextInput, Keyboard, DismissKeyboard, TouchableOpacity, StyleSheet, Picker, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card, Button, Text } from 'react-native-paper';
import {getFirestore, collection, doc, addDoc, setDoc,query, where, getDocs
} from "firebase/firestore";
import StateContext from './StateContext.js';


export const MakePost = ({navigation}) => {

const loggedInProps = useContext(StateContext);


const [post, setTextInputValue] = React.useState('');
const [category,setCategory] = React.useState(loggedInProps.categories);
const [selectedCategory, setSelectedCategory] = React.useState('Classes');


function postMessage() {
console.log('post message: loggedInProps.loggedInUser.email', loggedInProps.loggedInUser.email);
  const now = new Date();
  const newMessage = {
    user: loggedInProps.loggedInUser.email, 
    date: now, 
    timestamp: now.getTime(), // millsecond timestamp
    category: selectedCategory, 
    post: post, 
  }
    firebasePostMessage(newMessage)
    setTextInputValue('');
    navigation.navigate('Feed')
}

function cancelButton() {
  navigation.navigate('Feed');
}

async function firebasePostMessage(msg) {
  console.log('firebase post message', JSON.stringify(msg));
  // Add a new document in collection "messages"
  const timestampString = msg.timestamp.toString();
  await setDoc(doc(loggedInProps.db, "messages", timestampString), 
      {
        'timestamp': msg.timestamp, 
        'user': msg.user, 
        'category': msg.category, 
        'post': msg.post, 
      }
    );
}

async function populateFirestoreDB(messages) {

  // Returns a promise to add message to firestore
  async function addMessageToDB(message) {
    const timestamp = message.date.getTime(); // millsecond timestamp
    const timestampString = timestamp.toString();

    // Add a new document in collection "messages"
    return setDoc(doc(loggedInProps.db, "messages", timestampString), 
      {
        'timestamp': timestamp, 
        'user': loggedInProps.email, 
        'category': message.category, 
        'post': message.post, 
      }
    );
  }

  // Peform one await for all the promises. 
  await Promise.all(
    messages.map( addMessageToDB ) 
  );

}

     return (

      <KeyboardAwareScrollView contentContainerStyle = {styles.container}
                                resetScrollToCoords = {{x: 0, Y:0}}
                                scrollEnabled = {false}
      >
      <SafeAreaView style = {styles.container}>
            <TextInput multiline = "true"
                      onPress = {Keyboard.dismiss}
                      editable style = {styles.textInputArea} 
                      maxLength={100} 
                      placeholder={"Dear Tellesley..."} 
                      value = {post}
                      onChangeText={text => setTextInputValue(text)}
            />

              <Picker
                style={styles.pickerStyles}
                mode='dropdown'
                selectedValue= {selectedCategory}
                onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}>
                {loggedInProps.categories.map(cat => <Picker.Item key={cat} label={cat} value={cat}/>)}
              </Picker>
                <Button mode = "contained" 
                       style = {styles.buttons} 
                      onPress= {postMessage}> <Text style = {styles.buttonText}>Post</Text></Button>
                <Button mode = "contained" style = {styles.subuttons} onPress={() => cancelButton()}> <Text style = {styles.buttonText}>Cancel </Text> </Button>
      </SafeAreaView>
    </KeyboardAwareScrollView>
     )
}

const styles = StyleSheet.create({
  container: {
    height: '50%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttons: {
    backgroundColor: "rgb(8,58,129)",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: '35%',
    width: '30%',
    padding: 5,
 },
 buttonText: {
  color: 'white',
 },
 subuttons: {
  backgroundColor: "#919191",
  color:'#000000',
  marginLeft: '35%',
  width: '30%',
  padding: 5,
},
  textInputArea: {
    textAlign: 'left',
    backgroundColor: "white",
    fontSize: 17,
    borderWidth: 1,
    borderColor: "#9E9E9E",
    height:"40%",
  },
  titleText: {
    textAlign: 'center',
    fontSize: 40,
    color:'#5d5d5d',
  },
  pickerStyles:{
    width:'37%',
    marginTop: 5,
    marginLeft: '30%',
    backgroundColor:'white',
    },
})