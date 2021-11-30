import React from 'react';
import { SafeAreaView, TextInput, Button } from 'react-native';
//import { Card } from 'react-native-paper';
 
export const LoginScreen = () => {
    return (
        <SafeAreaView> 
            <body>
            <h1>Tellesley</h1>
            <p>
                <TextInput label="Email" keyboardType="email-address"></TextInput>
                <TextInput label = "Password" secureTextEntry = {true} ></TextInput>
                <Button mode = "contained">Login</Button>
                <Button mode = "contained">Register</Button>
            </p>
            </body>
        </SafeAreaView>

    )
}