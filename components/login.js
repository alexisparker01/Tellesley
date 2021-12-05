import React, { useEffect } from 'react';
import { SafeAreaView, View, TextInput} from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { loginStyle } from './LoginStyle';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";

  
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
  

export const LoginScreen = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [loggedInUser, setLoggedInUser] = React.useState(null);

    useEffect(() => {
      checkEmailVerification();
      return () => {
        console.log('useEffect reached.')
      }
    }, [])
  useEffect(
    () => { if (email != '') setErrorMessage(''); },
    [email]
  ); 
  
    function signInUserEmailPassword() {
      // Invoke Firebase authentication API for Email/Password sign in 
      // Use Email/Password for authentication 
      if (auth.currentUser) {
        signOut(auth); // sign out auth's current user (who is not loggedInUser, 
                       // or else we wouldn't be here
      }

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Clear email/password inputs 
          setEmail('');
          setPassword('');
          setErrorMessage('Success logging in');
          checkEmailVerification();
          // Note: could store userCredential here if wanted it later ...
          // console.log(`createUserWithEmailAndPassword: setCredential`);
          // setCredential(userCredential);
      
          })
        .catch((error) => {
          console.log(`signUpUserEmailPassword: sign in failed for email ${email}`);
          const errorMessage = error.message;
          setErrorMessage('Login failed. Try again.');
        });
    }

    function checkEmailVerification() {
      if (auth.currentUser) {
        if (auth.currentUser.emailVerified) {
          setLoggedInUser(auth.currentUser);
          setErrorMessage('Succes - email verified')
        } else {
          setErrorMessage(`${auth.currentUser.email} has not been verified. Please check your inbox for a verification email.`)
        }
      }
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
                                    {errorMessage && (
                      <p className="error"> {errorMessage} </p>
                            )}
                        <Button mode = "contained" style = {loginStyle.buttons} onPress={() => signInUserEmailPassword()}> Log in </Button>
                        <Text style = {loginStyle.accentText}> don't have an account? </Text>
                        <Button> Sign up </Button>

                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}