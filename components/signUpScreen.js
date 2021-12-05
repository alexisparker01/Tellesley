import React from 'react';
import { SafeAreaView, ScrollView, View} from 'react-native';
import { loginStyle, signUpStyle } from './LoginStyle';
import { Appbar, Button, TextInput} from 'react-native-paper';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut} from "firebase/auth";

  
  const firebaseConfig = {
    apiKey: "AIzaSyDzOBepKDW9x_3RYmXF1tIEj-hHJAcZ2lk",
    authDomain: "tellesley.firebaseapp.com",
    projectId: "tellesley",
    storageBucket: "tellesley.appspot.com",
    messagingSenderId: "827430407291",
    appId: "1:827430407291:web:de6ab2a30cfe7dca42e6de",
    measurementId: "G-18020KJETB"
  };
  

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export const SignUpScreen = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, confirmPassword] = React.useState('');
    const [FName, setFName] = React.useState('');
    const [LName, setLName] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
  
    function signUpUserEmailPassword() {
      console.log('called signUpUserEmailPassword');
      if (auth.currentUser) {
        signOut(auth); // sign out auth's current user (who is not loggedInUser, 
                       // or else we wouldn't be here
      }
      if (!email.includes('@wellesley.edu')) {
        setErrorMessage('You must use a Wellesley College email to sign up for Tellesley.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.')
        return;
      }
      if (password!==password2) {
        setErrorMessage('Passwords do not match.');
        return;
      }

     // Invoke Firebase authentication API for Email/Password sign up 
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      // Clear email/password inputs
      const savedEmail = email; // Save for email verification
      setEmail('');
      setPassword('');
      confirmPassword('');
      setErrorMessage('')
      sendEmailVerification(auth.currentUser)
      .then(() => {

        setErrorMessage('Success! A verification email has been sent. Please verify before logging in.')
          // Email verification sent!
          // ...
        });
    })
    .catch((error) => {
      console.log(`signUpUserEmailPassword: sign up failed for email ${email}`);
      setErrorMessage('Signup failed. Try again.');
    });
  }

        return (
            //<SafeAreaView style = {signUpStyle.content}>
                <View>
                <Appbar style = {loginStyle.buttons}>
                        <Appbar.BackAction />
                        <Appbar.Content title = "Sign Up" />
                        
                </Appbar>
                    <View>
                        <TextInput label = "First Name" 
                                    onChangeText={ textVal => setFName(textVal)} value={FName}/>
                        <TextInput label = "Last Name" 
                                    onChangeText={ textVal => setLName(textVal)} value={LName}/>
                        <TextInput label = "Email" 
                                    onChangeText={ textVal => setEmail(textVal)} value={email}/>
                        <TextInput label = "Password" 
                                    right = {<TextInput.Icon 
                                    name = "eye-off-outline"/>}
                                    onChangeText={ textVal => setPassword(textVal)} 
                                    secureTextEntry={true}
                                    value={password}/>
                        <TextInput label = "Confirm Password" 
                                    right = {<TextInput.Icon 
                                    name = "eye-off-outline"/>}
                                    value={password2} 
                                    secureTextEntry={true}
                                    onChangeText={ textVal => confirmPassword(textVal)} />
                        <Button mode = "contained" 
                                style = {loginStyle.buttons} onPress={() => signUpUserEmailPassword()}> Sign Up </Button>
                        {errorMessage && (
                      <p className="error"> {errorMessage} </p>
                            )}
                    </View>
                </View>
           // </SafeAreaView>
        )
}
//eye thing doesn't work anymore?