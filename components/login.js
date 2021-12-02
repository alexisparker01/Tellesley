import React from 'react';
import { SafeAreaView, View, TextInput} from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { loginStyle } from './loginStyle';
import { initializeApp } from "firebase/app";
import { // access to authentication features:
         getAuth, 
         // for email/password authentication: 
         createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification,
         // for logging out:
         signOut
  } from "firebase/auth";

  
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

function emailOf(user) {
    if (user) {
      return user.email;
    } else {
      return null;
    }
  }
  

export const LoginScreen = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const [loggedInUser, setLoggedInUser] = React.useState(null);
  
    function signUpUserEmailPassword() {
      console.log('called signUpUserEmailPassword');
      if (auth.currentUser) {
        signOut(auth); // sign out auth's current user (who is not loggedInUser, 
                       // or else we wouldn't be here
      }
      if (!email.includes('@wellesley.edu')) {
        setErrorMsg('Not a valid email address');
        return;
      }

      // Invoke Firebase authentication API for Email/Password sign up 
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(`signUpUserEmailPassword: sign up for email ${email} succeeded (but email still needs verification).`);
  
          // Clear email/password inputs
          const savedEmail = email; // Save for email verification
          setEmail('');
          setPassword('');
  
          // Note: could store userCredential here if wanted it later ...
          // console.log(`createUserWithEmailAndPassword: setCredential`);
          // setCredential(userCredential);
  
          // Send verication email
        })
        .catch((error) => {
          console.log(`signUpUserEmailPassword: sign up failed for email ${email}`);
          const errorMessage = error.message;
          // const errorCode = error.code; // Could use this, too.
          console.log(`createUserWithEmailAndPassword: ${errorMessage}`);
          setErrorMsg(`createUserWithEmailAndPassword: ${errorMessage}`);
        });
    }
  
    function signInUserEmailPassword() {
      console.log('called signInUserEmailPassword');
      console.log(`signInUserEmailPassword: emailOf(currentUser)0=${emailOf(auth.currentUser)}`); 
      console.log(`signInUserEmailPassword: emailOf(loggedInUser)0=${emailOf(loggedInUser)}`); 
      // Invoke Firebase authentication API for Email/Password sign in 
      // Use Email/Password for authentication 
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(`signInUserEmailPassword succeeded for email ${email}; have userCredential for emailOf(auth.currentUser)=${emailOf(auth.currentUser)} (but may not be verified)`); 
          console.log(`signInUserEmailPassword: emailOf(currentUser)1=${emailOf(auth.currentUser)}`); 
          console.log(`signInUserEmailPassword: emailOf(loggedInUser)1=${emailOf(loggedInUser)}`); 
  
          // Clear email/password inputs 
          setEmail('');
          setPassword('');
  
          // Note: could store userCredential here if wanted it later ...
          // console.log(`createUserWithEmailAndPassword: setCredential`);
          // setCredential(userCredential);
      
          })
        .catch((error) => {
          console.log(`signUpUserEmailPassword: sign in failed for email ${email}`);
          const errorMessage = error.message;
          // const errorCode = error.code; // Could use this, too.
          console.log(`signInUserEmailPassword: ${errorMessage}`);
          setErrorMsg(`signInUserEmailPassword: ${errorMessage}`);
        });
    }
  
    function logOut() {
      console.log('logOut'); 
      console.log(`logOut: emailOf(auth.currentUser)=${emailOf(auth.currentUser)}`);
      console.log(`logOut: emailOf(loggedInUser)=${emailOf(loggedInUser)}`);
      console.log(`logOut: setLoggedInUser(null)`);
      setLoggedInUser(null);
      console.log('logOut: signOut(auth)');
      signOut(auth); // Will eventually set auth.currentUser to null     
    }
  

    return (
        <SafeAreaView style = {loginStyle.content}>
            <View style = {loginStyle.view}>
                <Card>
                    <Card.Content>
                        <TextInput placeholder="Email" 
                                    keyboardType="email-address" 
                                    value = {email}
                                    style = {loginStyle.textFields}
                                    onChangeText={ textVal => setEmail(textVal)}></TextInput>
                        <TextInput placeholder= "Password" 
                                    secureTextEntry = {true} 
                                    style = {loginStyle.textFields}
                                    value={password} 
                                    onChangeText={ textVal => setPassword(textVal)}></TextInput>
                        <Button mode = "contained" style = {loginStyle.loginButtons} onPress={() => signInUserEmailPassword()}> Log in </Button>
                        <Text style = {loginStyle.accentText}> don't have an account? </Text>
                        <Button> Sign up </Button>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}