import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, View, TextInput, DismissKeyboard, TouchableOpacity} from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { initializeApp } from "firebase/app";
import { loginStyle } from './loginStyle';
import { getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { makePostStyle } from './loginStyle';

export const MakePost = ({navigation}) => {
// State for chat channels and messages
//const [selectedMessages, setSelectedMessages] = React.useState([]);
//const [textInputValue, setTextInputValue] = useState('');
const [isComposingMessage, setIsComposingMessage] = React.useState(false);
const [post, setTextInputValue] = React.useState('');

function postMessage() {
  console.log(`postMessage; usingFirestore=${usingFirestore}`);
  const now = new Date();
  const newMessage = {
    author: loggedInUser.email, 
    date: now, 
    timestamp: now.getTime(), // millsecond timestamp
    channel: selectedChannel, 
    content: textInputValue, 
  }
  if (usingFirestore) {
    firebasePostMessage(newMessage);
  } else {
    setLocalMessageDB([...localMessageDB, newMessage]);
    setIsComposingMessage(false);
  }
  setTextInputValue('');
}

function cancelButton() {
  navigation.navigate('Feed');
}

     return (

      <View style = {loginStyle.content}>
      <SafeAreaView style = {loginStyle.content}>
          <View style = {loginStyle.view}>
              <Card>
                  <Card.Content>
                  <TextInput editable style = {makePostStyle.textInputArea} maxLength={100} placeholder={"Dear Tellesley..."} onChangeText={text => setTextInputValue(text)}/>
                      <Button mode = "contained" 
                              style = {loginStyle.buttons} 
                              onPress={() => postMessage()}> Post </Button>
                      <Button mode = "contained" style = {loginStyle.subuttons} onPress={() => cancelButton()}> Cancel </Button>

                  </Card.Content>
              </Card>
          </View>
      </SafeAreaView>
    </View>
/*       <View style = {makePostStyle.content}>
      <SafeAreaView style = {makePostStyle.content}>
        <DismissKeyboard>

             <TouchableOpacity
              style = {makePostStyle.button}
              onPress = {
                 () => navigation.navigate('Profile')
              }>
               <Text style = {makePostStyle.text}> Cancel </Text>
           </TouchableOpacity>

           <Text style ={makePostStyle.title}> Make Post</Text>

           <TextInput editable maxLength={40} placeholder={"what's on your mind?"} onChangeText={text => onChangeText(text)}/>

             <Text style = {styles.text}>{username}</Text>
           <Text style = {styles.text}>{firstname}</Text>
           <Text style = {styles.text}>{lastname}</Text> }
     
           <TouchableOpacity
              style = {makePostStyle.button}
              >
              <Text style = {makePostStyle.text}> Post </Text>
           </TouchableOpacity>

           </DismissKeyboard>
  </SafeAreaView>
  </View> */
     )
}