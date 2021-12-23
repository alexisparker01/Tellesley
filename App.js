import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//most of the below lines are only here for testing purposes
import { loginStyle} from './components/loginStyle.js';
import {EditProfile} from './components/editProfile.js';
import { LoginScreen } from './components/login.js'; 
import { SignUpScreen } from './components/signUpScreen.js';
import {Feed} from './components/FeedMain.js';
import {MakePost} from './components/makePost.js';
import NavigationBar from './components/NavigationBar.js';
import ViewProfile from './components/ViewProfile.js';
import StateContext from './components/StateContext.js';
import {Map} from './components/Map';
import { getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getFirestore, 
   collection, doc, addDoc, setDoc,
  query, where, getDocs
} from "firebase/firestore";

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
  const [email, setEmail] = React.useState('km1@wellesley.edu');
  const [password, setPassword] = React.useState('kateamacv');
  const [password2, setpassword2] = useState('kateamacv');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [FName, setFName] = React.useState('Kate');
  const [LName, setLName] = React.useState('MacVicar');
  const [bio, setBio] = React.useState('Wellesley 2023');

  const [loggedInUser, setLoggedInUser] = React.useState(null);
  const [loggedInUserFName, setLoggedInUserFName] = React.useState('');
  
  const logOutUser = username => (setloggedInUser(null));

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const categories = ['All','Classes', 'Events', 'FAQ', 'Life', 'Free&ForSale'];

  const loggedInProps = {loggedInUser,logOutUser, loggedInUserFName, setLoggedInUserFName, email ,password, password2, confirmPassword, FName, LName, bio,
    setEmail, setPassword, setpassword2, setConfirmPassword, setLoggedInUser, setFName, setLName, setBio, 
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
          <Stack.Screen name="Map" component={Map}/>
      
        </Stack.Navigator>
      </NavigationContainer> 
    </StateContext.Provider>
  );
}
