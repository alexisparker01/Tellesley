import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import Login from './components/loginSignupView';
import EditProfile from './components/editProfile';
import { LoginScreen } from './components/newLogin';
import {Provider as PaperProvider, TextInput } from 'react-native-paper';

export default function App() {
  return (
/*     <View style={styles.container}>
        <Text style={styles.appTitle}>
        Tellesley
      </Text>
      <Login/>
      <EditProfile/>
      <LoginScreen />
    </View> */
    <PaperProvider>
      <LoginScreen />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appTitle: {
     margin: 24,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
