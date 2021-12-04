import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import {Provider as PaperProvider, TextInput } from 'react-native-paper';
import { loginStyle, signUpStyle } from './components/loginStyle';
import {EditProfile} from './components/editProfile';
import { LoginScreen } from './components/login';
import { SignUpScreen } from './components/signUpScreen';
import {Feed} from './components/Feed/FeedMain';
import {newPostButton} from './components/Feed/newPostButton';

export default function App() {
  return (
    /* <View style={loginStyle.content}>
        <Text style={loginStyle.appTitle}> Tellesley </Text> 
        <Text style = {loginStyle.littleText}> Log in with your Wellesley email to access Tellesley  </Text>
        <LoginScreen/> 
    </View>  */

    // This is for testing purposes.
    // The lines above are the real code
    <View>
      <Feed/>
    </View>
  );
}

