import React, { useEffect, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, View, TextInput} from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { initializeApp } from "firebase/app";
import {
  getFirestore, 
  collection, doc, addDoc, setDoc,
  query, where, getDocs, getDoc
} from "firebase/firestore";
import { loginStyle } from './loginStyle.js';
import { getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import StateContext from './StateContext.js';


  const firebaseConfig = {
    apiKey: "AIzaSyDzOBepKDW9x_3RYmXF1tIEj-hHJAcZ2lk",
    authDomain: "tellesley.firebaseapp.com",
    projectId: "tellesley",
    storageBucket: "tellesley.appspot.com",
    messagingSenderId: "827430407291",
    appId: "1:827430407291:web:de6ab2a30cfe7dca42e6de",
    measurementId: "G-18020KJETB"
  };
  

export const LoginScreen = ({navigation}) => {

  const loggedInProps = useContext(StateContext);
  const [errorMsg, setErrorMsg] = useState('');

    function signInUserEmailPassword() {
      setErrorMsg('');
      if (!loggedInProps.email.includes('@wellesley.edu')) {
        setErrorMsg('Please use a Wellesley College email address.');
        return;
      }
      
      signInWithEmailAndPassword(loggedInProps.auth, loggedInProps.email, loggedInProps.password)
        .then((userCredential) => {
          checkEmailVerification();
         loggedInProps.setEmail('');
         loggedInProps.setPassword('');
          })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage === "Firebase: Error (auth/user-not-found).") {
            setErrorMsg('User not found.')
            loggedInProps.setEmail('');
            loggedInProps.setPassword('');
          }
          else if (errorMessage === "Firebase: Error (auth/wrong-password).") {
            setErrorMsg('Wrong password.')
            loggedInProps.setEmail('');
            loggedInProps.setPassword('');
          }
          else {setErrorMsg(errorMessage)}
        });

    }
  
    function checkEmailVerification() {
      if (loggedInProps.auth.currentUser) {
        if (loggedInProps.auth.currentUser.emailVerified) {
          loggedInProps.setLoggedInUser(loggedInProps.auth.currentUser);
          navigation.navigate('Feed');
          setErrorMsg('')
        } else {
          setErrorMsg(`Please verify ${loggedInProps.auth.currentUser.email} by clicking the link sent.`)
        }
      }
    }


    return (
      <View style = {loginStyle.content}>
        <SafeAreaView style = {loginStyle.content}>
            <View style = {loginStyle.view}>
                <Card>
                    <Card.Content>
                        <TextInput placeholder="Email" 
                                    keyboardType="email-address" 
                                    value = {loggedInProps.email}
                                    style = {loginStyle.textFields}
                                    onChangeText={ textVal => loggedInProps.setEmail(textVal)}></TextInput>

                        <TextInput placeholder= "Password" 
                                    secureTextEntry = {true} 
                                    style = {loginStyle.textFields}
                                    value={loggedInProps.password} 
                                    onChangeText={ textVal => loggedInProps.setPassword(textVal)}></TextInput>

                                    <Text style = {loginStyle.accentText}> {errorMsg} </Text>                                    
                        <Button mode = "contained" 
                                style = {loginStyle.buttons} 
                                onPress={() => signInUserEmailPassword()}> <Text style = {loginStyle.buttonText}>Log in </Text></Button>
                        <Text style = {loginStyle.accentText}> Don't have an account? </Text>
                        <Button mode = "contained" style = {loginStyle.subuttons} onPress={() => navigation.navigate('Sign Up')}> <Text style = {loginStyle.buttonText}>Sign up</Text> </Button>

                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
      </View>
    )
}