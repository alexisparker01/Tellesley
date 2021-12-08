import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, View, TextInput} from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { initializeApp } from "firebase/app";
import { loginStyle } from './loginStyle';
import { getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { MakePost } from './makePost';
  
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
  

export const LoginScreen = ({navigation}) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMsg] = React.useState('');
    const [loggedInUser, setLoggedInUser] = React.useState(null);

    function signInUserEmailPassword() {
      setErrorMsg('');

      if (!email.includes('@wellesley.edu')) {
        setErrorMsg('Please use a Wellesley College email address.');
        return;
      }
      
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

          // Only log in auth.currentUser if their email is verified
          checkEmailVerification();
  
          // Clear email/password inputs 
          setEmail('');
          setPassword('');
          })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage === "Firebase: Error (auth/user-not-found).") {
            setErrorMsg('User not found.')
            setEmail('');
            setPassword('');
          }
          if (errorMessage === "Firebase: Error (auth/wrong-password).") {
            setErrorMsg('Wrong password.')
            setEmail('');
            setPassword('');
          }
         //setErrorMsg(`signInUserEmailPassword: ${errorMessage}`);
        });
    }
  
    function checkEmailVerification() {
      if (auth.currentUser) {
        
        if (auth.currentUser.emailVerified) {
          
          setLoggedInUser(auth.currentUser);
          navigation.navigate('Feed');
          
          setErrorMsg('')
        } else {
          
          setErrorMsg(`Please verify ${auth.currentUser.email} by clicking the link sent.`)
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
                        <Button mode = "contained" 
                                style = {loginStyle.buttons} 
                                onPress={() => signInUserEmailPassword()}> Log in </Button>
                        <Text style = {loginStyle.accentText}> don't have an account? </Text>
                        <Button mode = "contained" style = {loginStyle.subuttons} onPress={() => navigation.navigate('Sign Up')}> Sign up </Button>

                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
      </View>
    )
}