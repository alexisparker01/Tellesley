import React, {Component} from 'react';
import { SafeAreaView, ScrollView, View} from 'react-native';
import { loginStyle, signUpStyle } from './LoginStyle';
import { Appbar, Button, TextInput} from 'react-native-paper';
import { initializeApp } from "firebase/app"; 
import {getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        sendEmailVerification,
        signOut} from "firebase/auth";

  
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

export const SignUpScreen = ({navigation}) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, confirmPassword] = React.useState('');
    const [FName, setFName] = React.useState('');
    const [LName, setLName] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const [loggedInUser, setLoggedInUser] = React.useState(null);

/*     useEffect(() => {
      // Anything in here is fired on component mount.
      console.log('Component did mount');
      console.log(`on mount: emailOf(auth.currentUser)=${emailOf(auth.currentUser)}`);
      console.log(`on mount: emailOf(loggedInUser)=${emailOf(loggedInUser)}`);
      checkEmailVerification();
      return () => {
        // Anything in here is fired on component unmount.
        console.log('Component did unmount');
        console.log(`on unmount: emailOf(auth.currentUser)=${emailOf(auth.currentUser)}`);
        console.log(`on unmount: emailOf(loggedInUser)=${emailOf(loggedInUser)}`);
      }
    }, [])

  // Clear error message when email is updated to be nonempty
  useEffect(
    () => { if (email != '') setErrorMsg(''); },
    [email]
  ); 
   */
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
      if (password!==password2) {
          setErrorMsg('Passwords do not match');
          return;
      }
      if (password.length < 6) {
        setErrorMsg('Password too short');
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
      sendEmailVerification(auth.currentUser)
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
                            onChangeText={ textVal => setFName(textVal)} value={FName}/>
                <TextInput label = "Last Name" 
                            onChangeText={ textVal => setLName(textVal)} value={LName}/>
                <TextInput label = "Email" 
                            onChangeText={ textVal => setEmail(textVal)} value={email}/>
                <TextInput label = "Password" 
                            right = {<TextInput.Icon 
                            name = "eye-off-outline"/>}
                            onChangeText={ textVal => setPassword(textVal)} 
                            value={password}/>
               <TextInput label = "Confirm Password" 
                          right = {<TextInput.Icon 
                          name = "eye-off-outline"/>}
                          value={password2} onChangeText={ textVal => confirmPassword(textVal)} />
                <Button mode = "contained" 
                        style = {loginStyle.buttons} onPress={() => signUpUserEmailPassword()}> Sign Up </Button>
                        {errorMsg && (
                      <p className="error"> {errorMsg} </p>
                            )}
              </View>
            </View>
        )
}
//eye thing doesn't work anymore?