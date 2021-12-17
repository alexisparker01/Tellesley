import React, {useState, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, View, TextInput, DismissKeyboard, TouchableOpacity, StyleSheet, Picker} from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import {getFirestore, collection, doc, addDoc, setDoc,query, where, getDocs
} from "firebase/firestore";
import StateContext from './StateContext.js';


export const MakePost = ({navigation}) => {

const loggedInProps = useContext(StateContext);

const [isComposingMessage, setIsComposingMessage] = React.useState(false);
const [post, setTextInputValue] = React.useState('');
const categories = ['Classes', 'Events', 'FAQ', 'Life', 'Free&ForSale'];
const [category,setCategory] = React.useState(categories);
const [selectedCategory, setSelectedCategory] = React.useState('Classes');

//do we even need this firestore const??
const [usingFirestore, setUsingFirestore] = useState(true);

function postMessage() {

  const now = new Date();
  const newMessage = {
    user: loggedInProps.email, 
    date: now, 
    timestamp: now.getTime(), // millsecond timestamp
    category: category, 
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
        'user': message.user, 
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

      <View style = {styles.container}>
      <SafeAreaView style = {styles.container}>
            <TextInput multiline = {true} 
                      numberOfLines = {20} 
                      editable style = {styles.textInputArea} 
                      maxLength={100} 
                      placeholder={"Dear Tellesley..."} 
                      value = {post}
                      onChangeText={text => setTextInputValue(text)}
            />
              <Picker
                style={styles.pickerStyles}
                mode='dropdown'
                selectedValue= {category}
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
                {categories.map(clr => <Picker.Item key={clr} label={clr} value={clr}/>)}
              </Picker>
                <Button mode = "contained" 
                       style = {styles.buttons} 
                      onPress= {postMessage}> Post </Button>
                <Button mode = "contained" style = {styles.subuttons} onPress={() => cancelButton()}> Cancel </Button>
      </SafeAreaView>
    </View>
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
    marginLeft: '40%',
    width: '20%',
    padding: 5,
 },
 subuttons: {
  backgroundColor: "#919191",
  color:'#000000',
  marginLeft: '40%',
  width: '20%',
  padding: 5,
},
  textInputArea: {
    textAlign: 'left',
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