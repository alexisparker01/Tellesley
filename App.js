import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import {Provider as PaperProvider, TextInput } from 'react-native-paper';
import { loginStyle, signUpStyle } from './components/LoginStyle';
import {EditProfile} from './components/EditProfile';
import { LoginScreen } from './components/Login';
import { SignUpScreen } from './components/SignUpScreen';
import { ViewProfile } from './components/ViewProfile'
import { NavigationBar } from './components/NavigationBar';

export default function App() {
  return (
/*   <View style={loginStyle.content}>
        <Text style={loginStyle.appTitle}>
  <View>
    {/*}
<Text style={loginStyle.appTitle}>
          Tellesley
        </Text> 
        <Text style = {loginStyle.littleText}>
          Log in with your Wellesley email to access Tellesley 
        </Text>
          {/* <LoginScreen/> */
        /* <EditProfile/> */ 
/*       </View> 
       */ 

      <View>
    <NavigationBar />
      </View>
      
  );
}

