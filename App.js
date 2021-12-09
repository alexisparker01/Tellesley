import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet} from 'react-native';
import {Provider as PaperProvider, TextInput } from 'react-native-paper';
//most of the below lines are only here for testing purposes
import { loginStyle, signUpStyle } from './components/loginStyle';
import {EditProfile} from './components/editProfile';
import { LoginScreen } from './components/login';
import { SignUpScreen } from './components/signUpScreen';
import {Feed} from './components/FeedMain';
import {MakePost} from './components/MakePost';
import NavigationBar from './components/NavigationBar';
import ViewProfile from './components/ViewProfile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
/*     <NavigationContainer style={loginStyle.content}>
      <Stack.Navigator initialRouteName = "Log In">
        <Stack.Screen name="Tellesley" component={LoginScreen}/> 
        <Stack.Screen name="Feed" component={Feed}/>
        <Stack.Screen name="Sign Up" component={SignUpScreen}/>  
        <Stack.Screen name="New Post" component={MakePost}/>
        <Stack.Screen name="Profile" component={ViewProfile}/>
      </Stack.Navigator>
    </NavigationContainer>  */
     <View>
      <Feed/>
    </View> 
  );
}
