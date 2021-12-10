import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, View, TextInput, DismissKeyboard, TouchableOpacity, StyleSheet, Picker} from 'react-native';
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

      <View style = {styles.container}>
      <SafeAreaView style = {styles.container}>
            <TextInput multiline = {true} numberOfLines = {20} editable style = {styles.textInputArea} maxLength={100} placeholder={"Dear Tellesley..."} onChangeText={text => setTextInputValue(text)}/>
{/*               <Picker
                style={styles.pickerStyles}
                mode='dropdown'
                selectedValue= 'Select Category'
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
                {categories.map(clr => <Picker.Item key={clr} label={clr} value={clr}/>)}
              </Picker> */}
                <Button mode = "contained" 
                       style = {styles.buttons} 
                      onPress={() => postMessage()}> Post </Button>
                <Button mode = "contained" style = {styles.subuttons} onPress={() => cancelButton()}> Cancel </Button>
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
    width:'60%',
    backgroundColor:'white',
    },
});