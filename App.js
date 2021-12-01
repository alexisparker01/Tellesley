import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import Login from './components/loginSignupView';
import EditProfile from './components/editProfile';
import { LoginScreen } from './components/newLogin';
import {Provider as PaperProvider, TextInput } from 'react-native-paper';
import { loginStyle } from './components/loginStyle';

export default function App() {
  return (
    <View style={loginStyle.content}>
      <Text style={loginStyle.appTitle}>
        Tellesley
      </Text> 
      <LoginScreen/>
    </View>
  );
}

