import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, View, TextInput, TouchableOpacity, Keyboard, DismissKeyboard, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { makePostStyle } from './LoginStyle';

export const MakePost = ({navigation}) => {

  // State for chat channels and messages
  const [selectedMessages, setSelectedMessages] = React.useState([]);
  const [textInputValue, setTextInputValue] = useState('');
  const [isComposingMessage, setIsComposingMessage] = useState(false);

  function addTimestamp(message) {
    // Add millisecond timestamp field to message 
    return {...message, timestamp:message.date.getTime()}
  }

  function composeMessage() {
    setIsComposingMessage(true);
  }

  function cancelMessage() {
    setIsComposingMessage(false);
  }

  function postMessage() {
    console.log(`postMessage; usingFirestore=${usingFirestore}`);
    const now = new Date();
    const newMessage = {
      'author': loggedInUser.email, 
      'date': now, 
      'timestamp': now.getTime(), // millsecond timestamp
      'channel': selectedChannel, 
      'content': textInputValue, 
    }
    if (usingFirestore) {
      firebasePostMessage(newMessage);
    } else {
      setLocalMessageDB([...localMessageDB, newMessage]);
      setIsComposingMessage(false);
    }
    setTextInputValue('');
  }

  /***************************************************************************
   DEBUGGING
   ***************************************************************************/

  function debug() {
    const debugObj = {
      channels: channels, 
      selectedChannel, selectedChannel, 
      selectedMessages: selectedMessages, 
    }
    alert(formatJSON(debugObj));
  }

  function debugButton(bool) {
    if (bool) {
      return (
        <TouchableOpacity style={makePostStyle.button}
           onPress={debug}>
          <Text style={makePostStyle.buttonText}>Debug</Text>
        </TouchableOpacity> 
      ); 
    } else {
      return false;
    }
  }                                                                                      



  /***************************************************************************
   RENDERING CHAT CHANNELS AND MESSAGES
   ***************************************************************************/

 function formatDateTime(date) {
   return `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString('en-US')}`; 
 }
       return (
          <DismissKeyboard>
          <ScrollView style = {styles.container}>

               <TouchableOpacity
                style = {styles.cancelButton}
                onPress = {
                   () => this.goBack()
                }>
                 <Text style = {styles.text}> Cancel </Text>
             </TouchableOpacity>
             <Text style ={styles.title}>Make Post</Text>

             <TextInput editable maxLength={40} value={content} onChangeText={text => onChangeText(text)}/>

             <Text style = {styles.text}>{username}</Text>
             <Text style = {styles.text}>{firstname}</Text>
             <Text style = {styles.text}>{lastname}</Text>
       
             <TouchableOpacity
                style = {editProfileStyle.button}
                onPress = {
                   () => this.post()
                }>
                <Text style = {styles.text}> Post </Text>
             </TouchableOpacity>
             </ScrollView>
             </DismissKeyboard>
    
       )
}

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
   