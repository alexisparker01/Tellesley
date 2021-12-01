import React from 'react';
import { SafeAreaView, View, TextInput, Button } from 'react-native';
import { Card } from 'react-native-paper';
import { loginStyle } from './loginStyle';
 
export const LoginScreen = () => {
    return (
        <SafeAreaView style = {loginStyle.content}>
            <View style = {loginStyle.view}>
                <Card>
                    {/* <Card.Title title = "Tellesley" titleStyle = {loginStyle.cardTitle}></Card.Title> */}
                    <Card.Content>
                        <TextInput placeholder="Email" keyboardType="email-address" style = {loginStyle.textFields}></TextInput>
                        <TextInput placeholder= "Password" secureTextEntry = {true} style = {loginStyle.textFields}></TextInput>
                    </Card.Content>
                </Card>
            </View>
            <Button title = "Login"></Button>
             <Button title = "Sign up"></Button>
        </SafeAreaView>
    )
}