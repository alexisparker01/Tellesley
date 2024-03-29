import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//most of the below lines are only here for testing purposes
import { loginStyle} from './components/loginStyle.js';
import {EditProfile} from './components/EditProfile.js';
import { LoginScreen } from './components/LoginScreen.js'; 
import { SignUpScreen } from './components/SignUpScreen.js';
import {Feed} from './components/Feed.js';
import {MakePost} from './components/MakePost.js';
import ViewProfile from './components/ViewProfile.js';
import StateContext from './components/StateContext.js';
import { getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";

const Stack = createNativeStackNavigator();

export default function App(props) {

  const firebaseConfig = {
    apiKey: "AIzaSyDzOBepKDW9x_3RYmXF1tIEj-hHJAcZ2lk",
    authDomain: "tellesley.firebaseapp.com",
    projectId: "tellesley",
    storageBucket: "tellesley.appspot.com",
    messagingSenderId: "827430407291",
    appId: "1:827430407291:web:de6ab2a30cfe7dca42e6de",
    measurementId: "G-18020KJETB"
  };

  //const [email, setEmail] = React.useState('');
  //const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [FName, setFName] = React.useState('');
  const [LName, setLName] = React.useState('');
  const [bio, setBio] = React.useState('');

  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const logOutUser = username => (setLoggedInUser(null));

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const categories = ['All','Classes', 'Events', 'FAQ', 'Life', 'Free&ForSale'];

  const loggedInProps = {loggedInUser,logOutUser, email ,password, FName, LName, bio,
    setEmail, setPassword, setLoggedInUser, setFName, setLName, setBio, 
    firebaseApp, auth, db, firebaseConfig, categories }




  return (
    <StateContext.Provider value={loggedInProps}>
      <NavigationContainer style={loginStyle.content}>
        <Stack.Navigator initialRouteName = "Log In">
          <Stack.Screen name="Tellesley" component={LoginScreen}/> 
          <Stack.Screen name="Feed" component={Feed}/>
          <Stack.Screen name="Sign Up" component={SignUpScreen}/>  
          <Stack.Screen name="New Post" component={MakePost}/>
          <Stack.Screen name="Profile" component={ViewProfile}/>
          <Stack.Screen name="EditProfile" component={EditProfile}/>
      
        </Stack.Navigator>
      </NavigationContainer> 
    </StateContext.Provider>
  );
}
