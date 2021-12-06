import React, { useEffect } from 'react';
import { SafeAreaView, View, TextInput} from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { loginStyle } from './loginStyle';

const makePost = () => {
    post = {
       username: '', 
       firstname: '',
       lastname: '',
       makeAnonymous: false,
    }

    const [content, onChangeText] = React.useState("What's on your mind?");
  
    makeAnonymousToggle = () => {
        this.setState({username: input });
    }

    post = () => {
         //save post
    }
 
 goBack = () => {
    // go back to feed
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

