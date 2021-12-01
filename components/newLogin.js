import React from 'react';
import { SafeAreaView, TextInput, Button } from 'react-native';
import { Card } from 'react-native-paper';
 
export const LoginScreen = () => {
    return (
        <SafeAreaView> 
            <Card>
            <Card.Title title = "Tellesley"></Card.Title>
            <Card.Content>
                <TextInput placeholder="Email" keyboardType="email-address"></TextInput>
                <TextInput placeholder= "Password" secureTextEntry = {true} ></TextInput>
                <Button>Login</Button>
                <Button>Register</Button>
            </Card.Content>
            </Card>
        </SafeAreaView>

    )
}