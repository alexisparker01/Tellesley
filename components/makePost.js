import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { makePostStyle } from './LoginStyle';



export const MakePost = () => {

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
      <SafeAreaView style = {makePostStyle.content}> 
                  <View style = {makePostStyle.view}>
        <TextInput
          multiline
          numberOfLines={10}
          placeholder="What's on your mind?"
          style={makePostStyle.textInputArea}
          value={textInputValue} 
          onChangeText={(value) => setTextInputValue(value)}
        />
        <View style={makePostStyle.buttonHolder}>
          <TouchableOpacity style={makePostStyle.composeButton}
            onPress={cancelMessage}>
            <Text style={makePostStyle.composeButtonText}>Cancel</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={makePostStyle.composeButton}
             onPress={postMessage}>
            <Text style={makePostStyle.composeButtonText}>Post</Text>
          </TouchableOpacity> 
        </View>
      </View>
      
      </SafeAreaView>
    );
}

