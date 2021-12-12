import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//most of the below lines are only here for testing purposes
import { loginStyle, signUpStyle } from './components/loginStyle';
import {EditProfile} from './components/editProfile';
import { LoginScreen } from './components/login'; 
import { SignUpScreen } from './components/signUpScreen';
import {Feed} from './components/FeedMain';
import {MakePost} from './components/MakePost';
import NavigationBar from './components/NavigationBar';
import ViewProfile from './components/ViewProfile';
import StateContext from './components/StateContext.js';

const Stack = createNativeStackNavigator();

export default function App(props) {

  //const [email, setEmail] = React.useState('');
  //const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('km1@wellesley.edu');
  const [password, setPassword] = React.useState('kateamacv');
  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const logOutUser = username => (setloggedInUser(null));
  const [FName, setFName] = React.useState('Kate');
  const [LName, setLName] = React.useState('MacVicar');
  const loggedInProps = {loggedInUser,logOutUser, email,password, FName, LName, 
    setEmail, setPassword, setLoggedInUser, setFName, setLName }

  return (
    <StateContext.Provider value={loggedInProps}>
      <NavigationContainer style={loginStyle.content}>
        <Stack.Navigator initialRouteName = "Log In">
          <Stack.Screen name="Tellesley" component={LoginScreen}/> 
          <Stack.Screen name="Feed" component={Feed}/>
          <Stack.Screen name="Sign Up" component={SignUpScreen}/>  
          <Stack.Screen name="New Post" component={MakePost}/>
          <Stack.Screen name="Profile" component={ViewProfile}/>
        </Stack.Navigator>
      </NavigationContainer> 
    </StateContext.Provider>
  );
}
