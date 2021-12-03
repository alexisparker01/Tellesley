import React from 'react';
import { SafeAreaView, View, TextInput} from 'react-native';
import { Card, Button, Text } from 'react-native-paper';
import { loginStyle } from './LoginStyle';
 
export const LoginScreen = () => {
    return (
        <SafeAreaView style = {loginStyle.content}>
            <View style = {loginStyle.view}>
                <Card>
                    <Card.Content>
                        <TextInput placeholder="Email" keyboardType="email-address" style = {loginStyle.textFields}></TextInput>
                        <TextInput placeholder= "Password" secureTextEntry = {true} style = {loginStyle.textFields}></TextInput>
                        <Button mode = "contained" style = {loginStyle.loginButtons}> Log in </Button>
                        <Text style = {loginStyle.accentText}> don't have an account? </Text>
                        <Button> Sign up </Button>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    )
}