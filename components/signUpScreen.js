import React, {Component, useState, useContext} from 'react';
import { View } from 'react-native';
import { loginStyle, signUpStyle } from './LoginStyle';
import { Button, TextInput} from 'react-native-paper';
import { initializeApp } from "firebase/app"; 
import {getAuth, onAuthStateChanged,
        createUserWithEmailAndPassword,
        sendEmailVerification,
        signOut} from "firebase/auth";
import StateContext from './StateContext.js';


export const SignUpScreen = ({navigation}) => {

  const loggedInProps = useContext(StateContext);

  const [errorMsg, setErrorMsg] = useState('');

    function signUpUserEmailPassword() {
      console.log('called signUpUserEmailPassword');
      if (loggedInProps.auth.currentUser) {
        signOut(loggedInProps.auth); // sign out auth's current user (who is not loggedInUser, 
                       // or else we wouldn't be here
      }
      if (!loggedInProps.email.includes('@wellesley.edu')) {
        setErrorMsg('Not a valid email address');
        return;
      }
      if (loggedInProps.password!==password2) {
          setErrorMsg('Passwords do not match');
          return;
      }
      if (loggedInProps.password.length < 6) {
        setErrorMsg('Password too short');
        return;
      }

     // Invoke Firebase authentication API for Email/Password sign up 
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      // Clear email/password inputs
      const savedEmail = loggedInProps.email; // Save for email verification
      loggedInProps.setEmail('');
      loggedInProps.setPassword('');
      loggedInProps.confirmPassword('');
      sendEmailVerification(loggedInProps.auth.currentUser)
      .then(() => {
          setErrorMsg(`A verification email has been sent to ${savedEmail}. You will not be able to sign in until this email is verified.`); 
          // Email verification sent!
          // ...
        });
    })
    .catch((error) => {
      setErrorMsg('Sign in failed. Try again.');
    });
  }


        return (
          <View>
             <View>
                <TextInput label = "First Name" 
                            style = {signUpStyle.TextInputStyle}
                            activeUnderlineColor = 'rgb(6,12,51)'
                            onChangeText={ textVal => loggedInProps.setFName(textVal)} value={loggedInProps.FName}/>
                <TextInput label = "Last Name" 
                            onChangeText={ textVal => loggedInProps.setLName(textVal)} 
                            activeUnderlineColor = 'rgb(6,12,51)'
                            value={loggedInProps.LName}
                            style = {signUpStyle.TextInputStyle}/>
                <TextInput label = "Email" 
                            onChangeText={ textVal => loggedInProps.setEmail(textVal)} 
                            activeUnderlineColor = 'rgb(6,12,51)'
                            value={loggedInProps.email}
                            style = {signUpStyle.TextInputStyle}/>
                <TextInput label = "Password" 
                            right = {<TextInput.Icon 
                            name = "eye-off-outline"/>}
                            activeUnderlineColor = 'rgb(6,12,51)'
                            onChangeText={ textVal => loggedInProps.setPassword(textVal)} 
                            value={loggedInProps.password}
                            style = {signUpStyle.TextInputStyle}/>
               <TextInput label = "Confirm Password" 
                          right = {<TextInput.Icon 
                          name = "eye-off-outline"/>}
                          activeUnderlineColor = 'rgb(6,12,51)'
                          value={loggedInProps.password2} onChangeText={ textVal => loggedInProps.confirmPassword(textVal)} 
                          style = {signUpStyle.TextInputStyle}/>
                <Button mode = "contained" 
                        style = {loginStyle.buttons} onPress={() => signUpUserEmailPassword()}> Sign Up </Button>
                        {errorMsg && (
                      <p className="error"> {errorMsg} </p>
                            )}
              </View>
            </View>
        )
}