import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
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

