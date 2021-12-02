import React from 'react';
import { SafeAreaView, ScrollView, View} from 'react-native';
import { Appbar, Button, TextInput} from 'react-native-paper';
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

export const SignUpScreen = () => {

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

        return (
            <SafeAreaView>
                <ScrollView>
                <Appbar>
                        <Appbar.BackAction />
                        <Appbar.Content title = "Sign Up" />
                    </Appbar>
                    <View>
                        <TextInput label = "First Name"/>
                        <TextInput label = "Last Name" />
                        <TextInput label = "Username" />
                        <TextInput label = "Email" />
                        <TextInput label = "Password" 
                                    secureTextEntry = {true} 
                                    right = {<TextInput.Icon 
                                    name = "eye-off-outline"/>}/>
                        <TextInput label = "Confirm Password" secureTextEntry = {true} right = {<TextInput.Icon name = "eye-off-outline"/>}/>
                        <TextInput label = "description" />
                        <Button mode = "contained" onPress={() => signUpUserEmailPassword()} > Sign Up </Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
}
